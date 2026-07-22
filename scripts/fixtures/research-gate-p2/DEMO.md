# P2 gate-check demonstration (Task 0, Step 1c-gate)

This is the D7-floor demonstration required before any Phase 2 audit dispatch: each bespoke
record/register-parsing gate check must be shown to produce its stated verdict on a real fixture
before it is trusted at gate time. A check whose verdict was never observed is asserted, not
proven.

## What is demonstrated here

The **record/register-parsing** checks a static fixture can exercise — Task G steps **1-pre**,
**1-pre-b**, **1a**, **1b**, **1d**, **1e** — run by
[`run-p2-gate-checks.sh`](./run-p2-gate-checks.sh) against each fixture below. The check logic in
that script is the plan's own bash (`docs/superpowers/plans/2026-07-20-adaptive-learning-foundation-audit-phase2.md`,
lines 1140-1147, 1162-1167, 1181-1186, 1199-1201, 1234-1240, 1251-1254), with one stated
adaptation: the plan's literal `for n in 1 2 3 4 5 6 7 8` loop is parameterized to the fixture's
own unit list (every fixture here uses a single unit, U1) — a static fixture demonstrates the
mechanism on the units it actually declares, not the full eight-unit run. The check semantics
(positive enumeration, exact row/cell scoping, current-vs-superseded record scoping) are
unchanged.

**Scoped out, honestly** (no expressible input in a static fixture — see the plan, lines 728-736):
gate step 2 (working-tree `git diff`/`git status`), gate step 3 (integrity-manifest hashing), and
check 1c (dispatch-ledger read). None is a record-parsing grep, so none is demonstrated here.

`scripts/research-gate.ts` / `scripts/fixtures/research-gate/` is the reference shape these
checks are modelled on (positive enumeration, terminal-signal-line discipline, adversarial
fixtures) — it is never invoked for P2 and cannot parse the P2 record layout.

## The proven matrix

Run 2026-07-21, `node --version` v26.4.0, from the repo root:

```
for f in empty clean violating retry verdict-legend citation-unverifiable unanswered-remove escaped-pipe; do
  bash scripts/fixtures/research-gate-p2/run-p2-gate-checks.sh "scripts/fixtures/research-gate-p2/$f" 1
done
```

| Fixture | Required verdict | Observed | Attributed check |
|---|---|---|---|
| `empty` — no records | **FAIL** | FAIL | 1-pre (all three records MISSING) and 1-pre-b (UNASSESSED) |
| `clean` — all records present and resolved | **PASS** | PASS | all six pass |
| `violating` — one raised correction with no `LANDED` confirmation | **FAIL** | FAIL | 1a (`C-U1-001` raised in `verification/V-U1.md`, no `LV-U1.md` exists) |
| `retry` — a superseded `NOT-LANDED` (`LV-U1-r1.md`) + a later `LANDED` (`LV-U1.md`) | **PASS** | PASS | all six pass — 1a/1b correctly read only the current `LV-U1.md`, not the archived `-r1` |
| `verdict-legend` — a `Preserve/…/Remove` legend, no unit assessed | **FAIL (1-pre-b)** | FAIL | 1-pre-b only (1-pre passes: the record is non-empty) |
| `citation-unverifiable` — a `Preserve` row over an `UNVERIFIABLE` citation | **FAIL (1e)** | FAIL | 1e only |
| `unanswered-remove` — a `Remove`-verdict row with no matching `DEFECT-REAL` answer | **FAIL (1d)** | FAIL | 1d only |
| `escaped-pipe` — a `\|`-escaped description cell in a conforming row | **PASS** | PASS | all six pass — the escaped pipe inside the claim cell does not break 1-pre-b's row match |

All eight rows match the required matrix exactly. No check needed to be weakened to reach this
result.

## Raw output, per fixture

### `empty` — GATE: FAIL (exit 3)
```
1-pre: FAIL
  MISSING audit/U1-audit.md
  MISSING verification/V-U1.md
  MISSING registers/citation-state-register.md
1-pre-b: FAIL
  UNASSESSED audit/U1-audit.md
1a: pass
1b: pass
1d: pass
1e: pass
GATE: FAIL (scripts/fixtures/research-gate-p2/empty, unit(s): 1)
```

### `clean` — GATE: PASS (exit 0)
```
1-pre: pass
1-pre-b: pass
1a: pass
1b: pass
1d: pass
1e: pass
GATE: PASS (scripts/fixtures/research-gate-p2/clean, unit(s): 1)
```

### `violating` — GATE: FAIL (exit 3)
```
1-pre: pass
1-pre-b: pass
1a: FAIL
  1d0
  < C-U1-001
1b: pass
1d: pass
1e: pass
GATE: FAIL (scripts/fixtures/research-gate-p2/violating, unit(s): 1)
```

### `retry` — GATE: PASS (exit 0)
```
1-pre: pass
1-pre-b: pass
1a: pass
1b: pass
1d: pass
1e: pass
GATE: PASS (scripts/fixtures/research-gate-p2/retry, unit(s): 1)
```

### `verdict-legend` — GATE: FAIL (exit 3)
```
1-pre: pass
1-pre-b: FAIL
  UNASSESSED audit/U1-audit.md
1a: pass
1b: pass
1d: pass
1e: pass
GATE: FAIL (scripts/fixtures/research-gate-p2/verdict-legend, unit(s): 1)
```

### `citation-unverifiable` — GATE: FAIL (exit 3)
```
1-pre: pass
1-pre-b: pass
1a: pass
1b: pass
1d: pass
1e: FAIL
  8:| CIT-004 | Preserve | U1 | UNVERIFIABLE |
GATE: FAIL (scripts/fixtures/research-gate-p2/citation-unverifiable, unit(s): 1)
```

### `unanswered-remove` — GATE: FAIL (exit 3)
```
1-pre: pass
1-pre-b: pass
1a: pass
1b: pass
1d: FAIL
  K-U1-001
1e: pass
GATE: FAIL (scripts/fixtures/research-gate-p2/unanswered-remove, unit(s): 1)
```

### `escaped-pipe` — GATE: PASS (exit 0)
```
1-pre: pass
1-pre-b: pass
1a: pass
1b: pass
1d: pass
1e: pass
GATE: PASS (scripts/fixtures/research-gate-p2/escaped-pipe, unit(s): 1)
```

## Role lint (Task 0 Step 1c)

```
$ node scripts/research-roles-lint.ts
research-roles-lint: 50 checks over 5 roles in .claude/agents
PASS: role contract satisfied
```

Green over all five roles: `audit-collector`, `audit-editor`, `audit-verifier`, `audit-auditor`,
`audit-examiner`.
