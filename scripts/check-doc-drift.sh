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

BOARD=journal/ops/tasks.md
PHASE=journal/ops/phase.md

# 1 — phase.md's next: versus the board's selected card.
#     The lifecycle engine resolves board-first, so a hand-written phase.md next: is silently
#     discarded when they disagree. It disagreed on 2026-07-26 and nothing said so.
printf '1. phase.md next: vs board NEXT\n'
if [ -f "$BOARD" ] && [ -f "$PHASE" ]; then
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
  MISSING=""
  for role in $(sed -n "s/.*name: '\([a-z]*\)'.*/\1/p" "$RUNNER"); do
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
printf '3. retired milestones described as active\n'
if [ -f "$BOARD" ]; then
  RETIRED=$(sed -n 's/.*<!-- removed: \([A-Z][A-Z0-9]*\)-.*/\1/p' "$BOARD" | sort -u)
  if [ -z "$RETIRED" ]; then
    note "no retired cards recorded on this board"
  else
    for node in $RETIRED; do
      for doc in README.md PROGRESS.md docs/architecture.md ROADMAP.md; do
        [ -f "$doc" ] || continue
        HIT=$(grep -n "$node" "$doc" 2>/dev/null | grep -i "active" || true)
        [ -n "$HIT" ] && fail "$doc calls retired milestone $node active: $HIT"
      done
    done
    note "checked retired: $(printf '%s ' $RETIRED)"
  fi
fi

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
