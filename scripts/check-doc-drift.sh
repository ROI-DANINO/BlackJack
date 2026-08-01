#!/usr/bin/env bash
# check-doc-drift.sh — read-only tripwires for documents disagreeing about state.
#
# Every check here exists because that exact pair has already drifted apart once, silently,
# and was found by a human happening to reread the right two files. None of these is a style
# rule; each is a fact one document asserts and another contradicts.
#
# Read-only: no writes, no git mutation, no network. Exits 1 if any check fires.
# Run it before republishing an authority document, and at any /wl-end.
#
# Deliberately NOT a hard gate on any other tool's read path — a filesystem gate wired into
# the board's parser bricked every verb once (FT1-09). This is a standalone check.

set -uo pipefail
cd "$(dirname "$0")/.." || exit 2

FAIL=0
note() { printf '  %s\n' "$1"; }
fail() { printf 'DRIFT: %s\n' "$1"; FAIL=1; }

BOARD=journal/tasks.md
PHASE=journal/phase.md

# 1 — phase.md's next: versus the board's selected card.
#     The lifecycle engine resolves board-first, so a hand-written phase.md next: is silently
#     discarded when they disagree. It disagreed on 2026-07-26 and nothing said so.
printf '1. phase.md next: vs board NEXT\n'
if [ -f "$BOARD" ] && [ -f "$PHASE" ]; then
  # A broken board must alarm, not skip. Without this, a parse failure or a missing runtime
  # yields an empty selection and the check reports "nothing to compare" — absence as proof.
  if ! node scripts/kanban.ts validate "$BOARD" "$PHASE" >/dev/null 2>&1; then
    fail "the board does not validate; every board-dependent check below is unreliable."
    note "run: node scripts/kanban.ts validate $BOARD $PHASE"
  fi
  BOARD_NEXT=$(node scripts/kanban.ts next "$BOARD" "$PHASE" 2>/dev/null | sed -n 's/^NEXT: //p')
  PHASE_NEXT=$(sed -n 's/^next: //p' "$PHASE")
  if [ -z "$BOARD_NEXT" ]; then
    note "board selects nothing (no active node or no eligible card) — nothing to compare"
  elif [ -z "$PHASE_NEXT" ]; then
    note "phase.md has no next: — board wins by default"
  else
    CARD_ID=${BOARD_NEXT%% *}
    if printf '%s' "$PHASE_NEXT" | grep -qF "$CARD_ID"; then
      note "agree on $CARD_ID"
    else
      fail "board selects '$BOARD_NEXT' but phase.md next: does not mention $CARD_ID."
      note "phase.md says: $PHASE_NEXT"
      note "The engine resolves board-first, so phase.md's text will not be reported."
    fi
  fi
else
  note "no board or no phase file — skipped"
fi

# 2 — the QA process doc must enumerate every role the runner actually runs.
#     This list has fallen behind the runner twice, once per role added.
printf '2. QA Tier-1 enumeration vs web/qa/run-all.ts\n'
QADOC=docs/specs/qa-playtest-process.md
RUNNER=web/qa/run-all.ts
if [ -f "$QADOC" ] && [ -f "$RUNNER" ]; then
  ROLES=$(sed -n "s/.*name: '\([a-z]*\)'.*/\1/p" "$RUNNER")
  MISSING=""
  if [ -z "$ROLES" ]; then
    # Zero roles extracted means the parse broke, not that the runner runs nothing.
    # Without this guard the loop body never runs and the check prints a pass it never earned.
    fail "extracted zero roles from $RUNNER — the parser is stale, so this check proved nothing."
  fi
  for role in $ROLES; do
    grep -q "qa:$role" "$QADOC" || MISSING="$MISSING qa:$role"
  done
  if [ -n "$MISSING" ]; then
    fail "$RUNNER runs roles the QA process doc does not name:$MISSING"
  else
    note "all runner roles are named in the process doc"
  fi
else
  note "runner or QA doc missing — skipped"
fi

# 3 — no retired milestone may still be called "active" in an authority document.
#     README and architecture.md both called a retired build slice active on the day it was
#     retired, which is the design-vs-build confusion the restructure exists to prevent.
printf '3. closed milestones described as active\n'
# Match on the milestone's PROSE NAME, not its ID. The drift this check exists for read
# "Graded Decision Practice is the active learning slice" — the ID "GD" appears nowhere in it,
# so an ID-based grep passes on the exact text that motivated the check. Closed-node archive
# fragments carry the prose name in their heading, which is where it comes from.
CLOSED=0
for frag in journal/archive/*.md; do
  [ -f "$frag" ] || continue
  case "$(basename "$frag")" in tasks-*|docs-map-*|phase-*) continue ;; esac
  TITLE=$(sed -n '1s/^### [A-Z0-9-]* — \(.*\) \[.*/\1/p' "$frag")
  [ -z "$TITLE" ] && continue
  CLOSED=$((CLOSED + 1))
  for doc in README.md PROGRESS.md docs/architecture.md ROADMAP.md; do
    [ -f "$doc" ] || continue
    # Paragraph resolution, not line resolution. These documents are hard-wrapped, and the
    # drift this check exists for split "Graded Decision Practice is the" / "active learning
    # slice" across two lines — invisible to any line-based grep.
    HIT=$(awk 'BEGIN{RS=""} {gsub(/\n/," "); print}' "$doc" 2>/dev/null \
          | grep -i "$TITLE" \
          | grep -oiE ".{0,40}(is the active|active (learning )?slice|next product step|currently building).{0,40}" \
          | head -1 || true)
    [ -n "$HIT" ] && fail "$doc presents closed milestone \"$TITLE\" as current: …$HIT…"
  done
done
[ "$CLOSED" -eq 0 ] && note "no closed milestone fragments found" || note "checked $CLOSED closed milestone(s) by prose name"

# 4 — a test count asserted in ROADMAP must match the tree.
#     An inflated count was corrected once in the QA ledger and then reappeared in ROADMAP,
#     written from a report rather than a count.
printf '4. asserted Rust test count vs the tree\n'
if [ -f ROADMAP.md ] && [ -d crates ]; then
  REAL=$(grep -rn '#\[test\]' crates 2>/dev/null | wc -l | tr -d ' ')
  CLAIMED=$(grep -oE '[~]?[0-9]+ Rust tests' ROADMAP.md | grep -oE '[0-9]+' | head -1)
  if [ -z "$CLAIMED" ]; then
    note "ROADMAP asserts no Rust test count"
  elif [ "$CLAIMED" = "$REAL" ]; then
    note "agree at $REAL"
  else
    fail "ROADMAP claims $CLAIMED Rust tests; the tree has $REAL."
  fi
fi

# 5 — exactly one plan may claim to be in progress, and phase.md must point at it.
#     A plan left marked "in progress" after completion makes a literal follower re-execute it.
printf '5. in-progress plan vs phase.md plan:\n'
INPROG=$(grep -ln '^> Status: \*\*in progress' docs/superpowers/plans/*.md 2>/dev/null || true)
COUNT=$(printf '%s' "$INPROG" | grep -c . || true)
PHASE_PLAN=$(sed -n 's/^plan: \([^ #]*\).*/\1/p' "$PHASE" 2>/dev/null)
if [ "$COUNT" -eq 0 ]; then
  note "no plan claims to be in progress"
elif [ "$COUNT" -gt 1 ]; then
  fail "more than one plan claims to be in progress: $(printf '%s ' $INPROG)"
elif [ "$INPROG" != "$PHASE_PLAN" ]; then
  fail "plan '$INPROG' says in progress but phase.md points at '$PHASE_PLAN'"
else
  note "agree on $INPROG"
fi

printf '\n'
if [ "$FAIL" -eq 0 ]; then
  printf 'No document drift detected across 5 checks.\n'
else
  printf 'Document drift detected. Each pair above has drifted before; fix the document, not the check.\n'
fi
exit "$FAIL"
