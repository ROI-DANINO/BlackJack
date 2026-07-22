#!/usr/bin/env bash
# Runs the P2 record/register-parsing gate checks — Task G steps 1-pre, 1-pre-b, 1a, 1b, 1d, 1e —
# against ONE fixture directory. This is the Task 0 Step 1c-gate demonstration: each check must be
# shown to produce its stated verdict on a real fixture before any audit dispatch happens.
#
# The check logic in each block below is the plan's own bash, copied close to verbatim from
# docs/superpowers/plans/2026-07-20-adaptive-learning-foundation-audit-phase2.md:
#   1-pre    lines 1140-1147      1a   lines 1181-1186
#   1-pre-b  lines 1162-1167      1b   lines 1199-1201
#   1d       lines 1234-1240      1e   lines 1251-1254
#
# ONE adaptation, stated plainly: the plan's 1-pre/1-pre-b loop over the full run's eight units
# ("for n in 1 2 3 4 5 6 7 8"). A static fixture demonstrates the mechanism on whatever units it
# actually declares, not the full run — so the unit list is a parameter here ($2), not a literal
# "1 2 3 4 5 6 7 8". The check semantics (positive enumeration, exact row/cell scoping, no
# absence-of-a-token grep) are unchanged.
#
# Scoped OUT, honestly (see the plan, lines 728-736 and the Step-1 brief): gate step 2
# (working-tree git diff/status), step 3 (integrity-manifest hashing), and check 1c (dispatch
# ledger read). None has an expressible input in a static record fixture, so none is implemented
# here.
#
# Usage: run-p2-gate-checks.sh <fixture-dir> [unit-list]
#   unit-list defaults to "1" — every fixture in this suite uses a single unit, U1.
set -uo pipefail

FIXTURE_DIR="$1"
UNITS="${2:-1}"

if [ ! -d "$FIXTURE_DIR" ]; then
  echo "GATE: FAIL — fixture dir missing: $FIXTURE_DIR"
  exit 3
fi
cd "$FIXTURE_DIR" || { echo "GATE: FAIL — cannot cd into $FIXTURE_DIR"; exit 3; }

overall_fail=0

# --- 1-pre: the records exist at all (criterion 1, presence half) ---
pre_out=$({ for n in $UNITS; do
    for f in "audit/U$n-audit.md" "verification/V-U$n.md"; do
      [ -s "$f" ] || echo "MISSING $f"
    done
  done
  [ -s registers/citation-state-register.md ] || echo "MISSING registers/citation-state-register.md"
} | grep .)
if [ -n "$pre_out" ]; then
  echo "1-pre: FAIL"
  echo "$pre_out" | sed 's/^/  /'
  overall_fail=1
else
  echo "1-pre: pass"
fi

# --- 1-pre-b: each in-scope audit record carries at least one real verdict row ---
preb_out=$(for n in $UNITS; do
  grep -qE "^\| *K-U$n-[0-9]{3} *\| *(Preserve|Relabel|Revise|Replace|Remove) *\|" "audit/U$n-audit.md" 2>/dev/null \
    || echo "UNASSESSED audit/U$n-audit.md"
done | grep .)
if [ -n "$preb_out" ]; then
  echo "1-pre-b: FAIL"
  echo "$preb_out" | sed 's/^/  /'
  overall_fail=1
else
  echo "1-pre-b: pass"
fi

# --- 1a: every raised correction has a LANDED confirmation ---
a_out=$(diff \
  <(grep -rhoE --include='V-U[1-8].md' 'C-U[0-9]+-[0-9]{3}' verification/ 2>/dev/null | sort -u) \
  <(grep -rhoE --include='LV-U[1-8].md' 'C-U[0-9]+-[0-9]{3}[^|]*\| *LANDED' verification/ 2>/dev/null \
    | grep -oE 'C-U[0-9]+-[0-9]{3}' | sort -u))
if [ -n "$a_out" ]; then
  echo "1a: FAIL"
  echo "$a_out" | sed 's/^/  /'
  overall_fail=1
else
  echo "1a: pass"
fi

# --- 1b: no correction rests in a failed verdict (current confirmation only) ---
b_out=$(grep -rnE --include='LV-U[1-8].md' 'C-U[0-9]+-[0-9]{3}[^|]*\| *(NOT-LANDED|ALTERED)' verification/ 2>/dev/null)
if [ -n "$b_out" ]; then
  echo "1b: FAIL"
  echo "$b_out" | sed 's/^/  /'
  overall_fail=1
else
  echo "1b: pass"
fi

# --- 1d: every Remove/Replace was answered DEFECT-REAL ---
d_out=$(comm -23 \
  <(grep -rhoE 'K-U[0-9]+-[0-9]{3}[^|]*\| *(Remove|Replace)' audit/ 2>/dev/null \
    | grep -oE 'K-U[0-9]+-[0-9]{3}' | sort -u) \
  <(grep -rhoE 'K-U[0-9]+-[0-9]{3}[^|]*\| *DEFECT-REAL' verification/ 2>/dev/null \
    | grep -oE 'K-U[0-9]+-[0-9]{3}' | sort -u) | grep .)
if [ -n "$d_out" ]; then
  echo "1d: FAIL"
  echo "$d_out" | sed 's/^/  /'
  overall_fail=1
else
  echo "1d: pass"
fi

# --- 1e: no UNVERIFIED/UNVERIFIABLE citation under a Preserve/Revise ---
e_out=$(grep -nE '^\|[^|]*\| *(Preserve|Revise) *\|[^|]*\| *(UNVERIFIED|UNVERIFIABLE) *\|' \
  registers/citation-state-register.md 2>/dev/null)
if [ -n "$e_out" ]; then
  echo "1e: FAIL"
  echo "$e_out" | sed 's/^/  /'
  overall_fail=1
else
  echo "1e: pass"
fi

if [ "$overall_fail" -eq 0 ]; then
  echo "GATE: PASS ($FIXTURE_DIR, unit(s): $UNITS)"
  exit 0
else
  echo "GATE: FAIL ($FIXTURE_DIR, unit(s): $UNITS)"
  exit 3
fi
