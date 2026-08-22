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
PHASE=journal/milestone.md

# 1 — milestone.md's next: versus the board's selected card.
#     The lifecycle engine resolves board-first, so a hand-written milestone.md next: is silently
#     discarded when they disagree. It disagreed on 2026-07-26 and nothing said so.
printf '1. milestone.md next: vs board NEXT\n'
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
    note "milestone.md has no next: — board wins by default"
  else
    CARD_ID=${BOARD_NEXT%% *}
    if printf '%s' "$PHASE_NEXT" | grep -qF "$CARD_ID"; then
      note "agree on $CARD_ID"
    else
      fail "board selects '$BOARD_NEXT' but milestone.md next: does not mention $CARD_ID."
      note "milestone.md says: $PHASE_NEXT"
      note "The engine resolves board-first, so milestone.md's text will not be reported."
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
  case "$(basename "$frag")" in tasks-*|docs-map-*|phase-*|milestone-*) continue ;; esac
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

# 5 — exactly one plan may claim to be in progress, and milestone.md must point at it.
#     A plan left marked "in progress" after completion makes a literal follower re-execute it.
printf '5. in-progress plan vs milestone.md plan:\n'
INPROG=$(grep -ln '^> Status: \*\*in progress' docs/superpowers/plans/*.md 2>/dev/null || true)
COUNT=$(printf '%s' "$INPROG" | grep -c . || true)
PHASE_PLAN=$(sed -n 's/^plan: \([^ #]*\).*/\1/p' "$PHASE" 2>/dev/null)
if [ "$COUNT" -eq 0 ]; then
  note "no plan claims to be in progress"
elif [ "$COUNT" -gt 1 ]; then
  fail "more than one plan claims to be in progress: $(printf '%s ' $INPROG)"
elif [ "$INPROG" != "$PHASE_PLAN" ]; then
  fail "plan '$INPROG' says in progress but milestone.md points at '$PHASE_PLAN'"
else
  note "agree on $INPROG"
fi

# 6 — more than one live kanban board.
#     PR #11 relocated the board to journal/ops/tasks.md, a path neither the spine engine nor
#     kanban.ts resolves. Nothing broke loudly; instead the execution authority FORKED, and
#     LDB-04 reached Done on one board while still sitting in Ready on the other. AGENTS.md
#     already forbade the move in prose, and the move happened anyway — hence a mechanism.
#
#     Enumerated POSITIVELY: list every tracked file whose FIRST LINE is the v2 marker, then
#     partition. kanban.ts:275 uses exactly that first-line test, so this check and the tool
#     agree on what counts as a board — a grep for the marker anywhere would instead match
#     AGENTS.md, this repo's docs, and kanban.ts's own source. Snapshots under journal/archive/
#     are legitimate copies written by /end's archive-before-mutate step.
#
#     Stated limit, rather than a silent one: only TRACKED files are scanned. An untracked
#     second board would go unseen — but it also cannot become a shared authority, which is
#     the failure this guards.
printf '6. exactly one live kanban board\n'
MARKED=""
for f in $(git ls-files -- '*.md' 2>/dev/null); do
  [ -f "$f" ] || continue
  [ "$(head -1 "$f")" = "<!-- agent-kanban:v2 -->" ] && MARKED="$MARKED $f"
done
LIVE=""
ARCH=0
for f in $MARKED; do
  case "$f" in
    journal/archive/*) ARCH=$((ARCH + 1)) ;;
    *) LIVE="$LIVE $f" ;;
  esac
done
LIVE_TRIM=$(echo $LIVE)
LIVE_COUNT=$(printf '%s' "$LIVE_TRIM" | wc -w | tr -d ' ')
if [ "$LIVE_COUNT" -eq 0 ]; then
  fail "no live agent-kanban:v2 board found; expected $BOARD"
  note "every board-dependent check above is unreliable without it"
elif [ "$LIVE_COUNT" -gt 1 ]; then
  fail "more than one live kanban board: $LIVE_TRIM"
  note "a second board forks the execution authority and the two then disagree in silence (PR #11)"
elif [ "$LIVE_TRIM" != "$BOARD" ]; then
  fail "the live board is '$LIVE_TRIM', expected '$BOARD'"
  note "kanban.ts and the spine engine both resolve $BOARD as a fixed path; moving it breaks one of them"
else
  note "one live board ($BOARD), plus $ARCH archived snapshot(s)"
fi

# 7 — an evidence-index page must not assert a correction is unapplied once the archive says it landed.
#     This pair has drifted TWICE, both times against the same commit pair: 96b0f05 banked the index
#     at 04:01 on 2026-07-26 and 6da7e9f landed the corrections at 04:18. The Phase 1 half was caught
#     on 2026-08-15; the pass that caught it repeated the error in its own item 3 for the Phase 3 half,
#     which stood until 2026-08-17 (LDB-10). A rule did not fire on the pass that wrote it, so this is
#     a mechanism instead. Keys on correction IDs and verification-record names, which are stable
#     tokens, not on prose.
printf '7. evidence-index unapplied-claims vs archive landing markers\n'
IDXDIR=docs/superpowers/research/evidence-index
ARCHDIRS=docs/superpowers/research
UNAPPLIED_RE='never applied|not (yet )?applied|unapplied|outstanding work item'
if [ ! -d "$IDXDIR" ]; then
  fail "no evidence-index directory at $IDXDIR; this check cannot run and must not pass silently"
else
  IDX_PAGES=$(find "$IDXDIR" -name '*.md' | sort)
  IDX_COUNT=$(printf '%s\n' "$IDX_PAGES" | grep -c . )
  if [ "$IDX_COUNT" -eq 0 ]; then
    fail "no .md pages under $IDXDIR; an empty scan is not a clean scan"
  else
    MARKERS=$(grep -rhoE 'LANDED C-[A-Za-z0-9]+-[0-9]+[^]]*' "$ARCHDIRS" 2>/dev/null | sort -u)
    MARKER_COUNT=$(printf '%s\n' "$MARKERS" | grep -c . )
    LIVE_CLAIMS=0
    CONTRADICTIONS=0
    for f in $IDX_PAGES; do
      # A claim is live only if it survives removal of ~~struck~~ spans; superseded text is history.
      while IFS= read -r hit; do
        [ -z "$hit" ] && continue
        ln=${hit%%:*}
        txt=${hit#*:}
        stripped=$(printf '%s' "$txt" | sed 's/~~[^~]*~~//g')
        printf '%s' "$stripped" | grep -qEi "$UNAPPLIED_RE" || continue
        LIVE_CLAIMS=$((LIVE_CLAIMS + 1))
        TOKENS=$(printf '%s' "$stripped" | grep -oE '(C-[A-Za-z0-9]+-[0-9]+|V-[A-Za-z0-9]+(-[A-Za-z0-9]+)*)' | sort -u)
        for tok in $TOKENS; do
          if printf '%s\n' "$MARKERS" | grep -qF "$tok"; then
            fail "$f:$ln asserts an unapplied correction but the archive carries a LANDED marker naming $tok."
            note "line: $(printf '%s' "$stripped" | cut -c1-140)"
            note "the archive wins; fix the index page, not this check"
            CONTRADICTIONS=$((CONTRADICTIONS + 1))
          fi
        done
      done <<EOF
$(grep -nEi "$UNAPPLIED_RE" "$f" 2>/dev/null)
EOF
    done
    note "scanned $IDX_COUNT index page(s); archive landing markers found: $MARKER_COUNT"
    note "live unapplied-claims (struck text excluded): $LIVE_CLAIMS; contradicted by the archive: $CONTRADICTIONS"
    note "limit, stated: a claim naming no correction ID and no V- record cannot be cross-checked here"
  fi
fi

# 8 — an evidence-index page must not attribute a tag to the bridge that the bridge no longer carries.
#     Check 7's sibling, and it exists because check 7 could not see this. On 2026-08-17 the LDB-10
#     gate lifted bridge §1.4 and §1.6 from [DEFECTIVE-SOURCE] to [VERIFIED]; the same pass updated
#     the catalog's §1.8 row in place and left §1.4 and §1.6 printing the old tag, so one table held
#     one current row and two stale ones. Check 7 keys on unapplied-claim prose plus a correction ID
#     and a stale tag carries neither, so it passed clean over both. The exposure is real rather than
#     cosmetic: a Phase 4 card reads the catalog *instead of* the bridge, and the tag rule at
#     BRIDGE:81 says anything not [VERIFIED] "must not be leaned on". LDB-06 D11 was labelled down
#     on exactly that reading. The bridge is the authority; the index quotes it.
printf '8. evidence-index attributed bridge tags vs the bridge itself\n'
BRIDGE=docs/superpowers/specs/2026-07-22-product-design-inputs.md
BT='`'
TAGS_RE='VERIFIED|UNVERIFIED|DEFECTIVE-SOURCE'
if [ ! -f "$BRIDGE" ]; then
  fail "no bridge at $BRIDGE; this check cannot run and must not pass silently"
elif [ ! -d "$IDXDIR" ]; then
  fail "no evidence-index directory at $IDXDIR; this check cannot run and must not pass silently"
else
  # sec -> tag, read off the bridge's own section headings: ### N.N <title> `[TAG]`
  BRIDGE_MAP=$(sed -nE "s/^### ([0-9]+\.[0-9]+) .*${BT}\[(${TAGS_RE})\]${BT}.*$/\1 \2/p" "$BRIDGE")
  BRIDGE_MAP_COUNT=$(printf '%s\n' "$BRIDGE_MAP" | grep -c .)
  if [ "$BRIDGE_MAP_COUNT" -eq 0 ]; then
    fail "parsed zero tagged sections out of $BRIDGE; an empty map cannot certify any index page"
    note "the heading shape this check reads is: ### N.N <title> ${BT}[TAG]${BT}"
  else
    ATTRIBUTED=0
    MISMATCHED=0
    for f in $IDX_PAGES; do
      [ "$f" = "$BRIDGE" ] && continue
      while IFS= read -r hit; do
        [ -z "$hit" ] && continue
        ln=${hit%%:*}
        txt=${hit#*:}
        # Only the tag column counts: **`[TAG]`**. A §2-style status word ("OPEN") is not a tag.
        tag=$(printf '%s' "$txt" | grep -oE "\*\*${BT}\[(${TAGS_RE})" | head -1 | grep -oE "${TAGS_RE}")
        [ -z "$tag" ] && continue
        sec=$(printf '%s' "$txt" | sed -E 's/^\| \*\*([0-9]+\.[0-9]+)\*\*.*/\1/')
        ATTRIBUTED=$((ATTRIBUTED + 1))
        actual=$(printf '%s\n' "$BRIDGE_MAP" | sed -n "s/^${sec} //p")
        if [ -z "$actual" ]; then
          fail "$f:$ln attributes ${BT}[$tag]${BT} to bridge §$sec, which carries no tagged heading in $BRIDGE."
          note "the bridge wins; fix the index page, not this check"
          MISMATCHED=$((MISMATCHED + 1))
        elif [ "$actual" != "$tag" ]; then
          fail "$f:$ln says bridge §$sec is ${BT}[$tag]${BT}; the bridge says ${BT}[$actual]${BT}."
          note "the bridge wins; fix the index page, not this check"
          MISMATCHED=$((MISMATCHED + 1))
        fi
      done <<EOF
$(grep -nE '^\| \*\*[0-9]+\.[0-9]+\*\*' "$f" 2>/dev/null)
EOF
    done
    note "bridge sections carrying a tag: $BRIDGE_MAP_COUNT ($(printf '%s\n' "$BRIDGE_MAP" | awk '{printf "%s ", $1}'))"
    note "index rows attributing a tag: $ATTRIBUTED; disagreeing with the bridge: $MISMATCHED"
    note "limit, stated: an index page that paraphrases a tag instead of printing [TAG] is not read here"
  fi
fi

# 9 — every A-NN cited anywhere, cross-checked against the register.
#     THE DIRECTION MATTERS. The outward check — walk the register's rows and confirm each is
#     owned — can only fail when a row exists, so it passes silently on a missing one. That is
#     the defect AGENTS.md names, and it shipped: LDB-06 D7 declared A-07e and A-07f filed, an
#     examiner reported them absent on 2026-08-15, and the 2026-08-17 gate recorded criterion 2
#     as "PASS with a caveat" and approved anyway. This check runs INWARD instead.
printf '9. cited A-NN identifiers vs the assumption register\n'
REG=docs/superpowers/specs/assumption-register.md
if [ -f "$REG" ]; then
  ROWS=$(grep -oE '^\| `?A-[0-9]+[a-z]?`? \|' "$REG" | grep -oE 'A-[0-9]+[a-z]?' | sort -u)
  CITED=$(grep -rhoE '\bA-[0-9]{2}[a-z]?\b' docs/superpowers/specs/*.md ROADMAP.md 2>/dev/null | sort -u)
  ROW_N=$(printf '%s\n' "$ROWS" | grep -c . || true)
  CITED_N=$(printf '%s\n' "$CITED" | grep -c . || true)
  # Deliberate non-rows, each recorded in the register's own closing note as drafted-then-dropped.
  KNOWN='A-07d A-25'
  MISSING=0
  for id in $CITED; do
    printf '%s\n' "$ROWS" | grep -qx "$id" && continue
    if printf '%s' "$KNOWN" | grep -qw "$id"; then continue; fi
    fail "$id is cited in a spec or ROADMAP.md but has no row in $REG."
    note "add the row, or record it in the register's closing note as deliberately never filed"
    MISSING=$((MISSING + 1))
  done
  note "register rows: $ROW_N; distinct A-NN cited: $CITED_N; cited without a row: $MISSING"
  note "known non-rows, excluded by name: $KNOWN (recorded in the register as never filed)"
  note "limit, stated: this reads identifiers, not whether a row's content matches its citation"
else
  fail "no $REG — the inward cross-check cannot run, and silence here would be absence-as-proof."
fi

# 10 — line anchors that have gone stale because the cited content MOVED.
#     The documented failure: the bridge cited 2026-08-08-session-composition.md:801-805, which
#     was correct at 63c35a4 and stale by the end of the same day as the spec grew ~120 lines.
#     Checks 1-8 passed clean over it. A range check would ALSO have passed — the file still had
#     800+ lines — so this compares the cited line's TEXT at the citing document's last commit
#     against the target today, and reports only when that text has moved elsewhere in the file.
#     An edit in place is not anchor drift and is counted separately, not failed.
printf '10. line anchors vs where the cited text actually sits\n'
SPECDIR=docs/superpowers/specs
A_TOTAL=0; A_CHECKED=0; A_UNRES=0; A_MOVED=0; A_EDITED=0; A_HIST=0; A_NEW=0
for D in $SPECDIR/*.md ROADMAP.md; do
  [ -f "$D" ] || continue
  DC=$(git log -1 --format=%H -- "$D" 2>/dev/null)
  [ -z "$DC" ] && continue
  while IFS= read -r hit; do
    [ -z "$hit" ] && continue
    dln=${hit%%:*}; cite=${hit#*:}
    A_TOTAL=$((A_TOTAL + 1))
    ctx=$(sed -n "${dln}p" "$D")
    # A quoted historical anchor is not a live citation. The repo's own repair for a stale
    # anchor is to quote it and re-cite by decision, and that quote must not re-fire forever.
    if printf '%s' "$ctx" | grep -qiE -- 'previously read|cited by decision|superseded|was correct when written|stale by|re-anchored'; then
      A_HIST=$((A_HIST + 1)); continue
    fi
    # An anchor written in an uncommitted edit has no baseline to compare against, and
    # comparing it to the OLD target would flag every fresh anchor repair as drift. If this
    # exact citing line is absent from the committed document, the anchor is new — skip it.
    if ! git show "$DC:$D" 2>/dev/null | grep -qxF -- "$ctx"; then
      A_NEW=$((A_NEW + 1)); continue
    fi
    path=${cite%%:*}; start=${cite##*:}; start=${start%%-*}
    T=""
    if [ -f "$path" ]; then T="$path"; elif [ -f "$SPECDIR/$path" ]; then T="$SPECDIR/$path"; fi
    if [ -z "$T" ] || [ "$T" = "$D" ]; then A_UNRES=$((A_UNRES + 1)); continue; fi
    old=$(git show "$DC:$T" 2>/dev/null | sed -n "${start}p")
    if [ -z "$old" ]; then A_UNRES=$((A_UNRES + 1)); continue; fi
    new=$(sed -n "${start}p" "$T" 2>/dev/null)
    A_CHECKED=$((A_CHECKED + 1))
    [ "$old" = "$new" ] && continue
    at=$(grep -nxF -- "$old" "$T" 2>/dev/null | head -1 | cut -d: -f1)
    if [ -n "$at" ]; then
      A_MOVED=$((A_MOVED + 1))
      fail "$D:$dln cites $T:$start, but that text now sits at $T:$at."
      note "re-cite by decision rather than by line, or update the anchor to :$at"
    else
      A_EDITED=$((A_EDITED + 1))
    fi
  done <<EOF
$(grep -nohE '[A-Za-z0-9_./-]+\.(md|ts|js|rs|json|sh):[0-9]+' "$D" 2>/dev/null)
EOF
done
note "anchors seen: $A_TOTAL; compared against history: $A_CHECKED; MOVED: $A_MOVED"
note "quoted historical anchors skipped: $A_HIST; cited text edited in place (not drift): $A_EDITED"
note "not comparable: $A_UNRES — path did not resolve, or the target had no such line at that commit"
note "new since the citing document's last commit (no baseline): $A_NEW"
note "limit, stated: a NEW anchor is unverifiable here by construction — it is read on the next run, once committed"
note "limit, stated: for a RANGE (:N-M) only the start line N is tracked; N moving is not proof that what the range pointed at moved with it"
note "limit, stated: it reports that text MOVED, never that a citation was correct to begin with — a wrong anchor written correctly-shaped passes"

printf '\n'
if [ "$FAIL" -eq 0 ]; then
  printf 'No document drift detected across 10 checks.\n'
else
  printf 'Document drift detected. Each pair above has drifted before; fix the document, not the check.\n'
fi
exit "$FAIL"
