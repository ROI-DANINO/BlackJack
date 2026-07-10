# QA Script Suite — one script per scriptable agent role

> Design spec. Status: approved for build 2026-07-10. Source of truth for the `web/qa/` script
> suite and the script-first milestone-QA model until superseded.

## Why

The 2026-07-09 V1 milestone QA ran five agents. Post-mortem of their reports
(`journal/qa/runs/2026-07-09-v1-milestone/`) showed **three of the four playtest agents spent
most of their budget re-deriving the same mechanical invariants and re-writing verifier scripts
from scratch** — H17 dealer play, payout multipliers, bankroll conservation, split-eligibility,
stuck-state hunts, races — then wrapped it in ~700 lines of prose. That work is deterministic and
belongs in scripts. Only two things needed intelligence: the **player-experience feel** and the
**go/no-go synthesis**.

## Model: script-first, one script per scriptable pack agent

The pack in `docs/specs/qa-playtest-process.md` maps 1:1 to scripts where the work is mechanical:

| Pack agent | Becomes | Runs |
|---|---|---|
| 1. Rules & Payout Fidelity | **`qa:rules` script** | every milestone (gate) |
| 2. State & Round Flow | **`qa:flow` script** | every milestone (gate) |
| 4. Edge Case / Breaker | **`qa:breakit`** (already built) | every milestone (gate) |
| 3. Player Experience | **stays an AGENT** (subjective) | only when `web/src/app/` changed |
| 5. Product Review | **stays synthesis** (parent session, or one cheap agent) | every milestone |

Tier 1 (scripts, deterministic, gate the phase boundary, ~free): `cargo test -p blackjack-core`
+ wasm-freshness guard + `npm test` + `npm run qa` (rules + flow + breakit).
Tier 2 (one judgment agent): Player Experience, fed Tier-1 results so it never re-derives
mechanics.
Tier 3 (synthesis, inline): read Tier-1 output + PX report → gate verdict + ledger update.

## Structure — `web/qa/` suite with a shared lib

Restructure the just-shipped `web/breakit/` into a sibling of the new runners, sharing plumbing:

```
web/qa/
  lib/
    server.ts      # preview lifecycle: wasm-fresh gate, build instrumented bundle (VITE_BREAKIT=1),
                   #   vite preview, prod-hook-absence check. NOTE: WEB_ROOT path resolution changes
                   #   depth (was web/breakit/ → '..'; now web/qa/lib/ → '../../').
    browser.ts     # chromium launch (bundled, explicit executablePath — NO MCP), contexts, recorder
    jsonl.ts       # parse exported JSONL → header + rounds; shared parsing helpers
    invariants.ts  # PURE shared invariant checks: history integrity (no dup round_index, monotonic,
                   #   one header/session, session_id consistency), money conservation, card
                   #   conservation, seed match/distinctness/determinism, console-clean, no-crash,
                   #   stuck-UI. Lifted from breakit oracle.ts.
    driver.ts      # shared play over window.__breakit: deal/act/newSession/downloadText/getState/
                   #   setNote; a basic-strategy-ish heuristic; a situation-coverage tracker.
    report.ts      # role-parameterized report writer → runs/<date>-<role>/report.{md,json}
    types.ts       # shared shapes (LogLine re-export, ConsoleMessage, Invariant, RoleReport)
  breakit/         # Edge/Breaker role — existing attacks + oracle + oracle.test.ts, now importing lib
    run.ts · attacks/* · oracle.ts · oracle.test.ts        → npm run qa:breakit
  rules/           # Rules & Payout Fidelity role
    run.ts · checks.ts · checks.test.ts                    → npm run qa:rules
  flow/            # State & Round Flow role
    run.ts · checks.ts · checks.test.ts                    → npm run qa:flow
  run-all.ts       # run rules + flow + breakit sequentially, aggregate verdict, non-zero on any fail
                                                            → npm run qa
```

Boundary intent: `lib/` is role-agnostic (no attack/flow/rules specifics leak in); each runner owns
only its role's checks. breakit's behavior must be **unchanged** after the move.

### `qa:rules` (agent 1, scripted)

Drive a scripted basic-strategy-ish session (via `window.__breakit`) until the **situation
checklist** is each observed ≥2×: soft hands, player natural, dealer natural, player & dealer bust,
push, same-rank split, mixed ten-value split, double, double-after-split, dealer-ace (insurance
auto-decline note), shoe-boundary reshuffle. Unreachable items → explicit coverage-gap in the
report, not ground out (deterministic shoe may not deal split aces — that's expected).

Per round, cross-check three sources: on-screen totals/outcome/bankroll-delta ↔ the round's JSONL
line ↔ an **independent re-derivation**:
- dealer H17 correctness (hits hard <17 and soft 17; stands hard 17+ / soft 18+; no draw after bust),
- payout multiplier correctness (win 1×, loss −1×, push 0, blackjack 1.5×; double/split stake scaling),
- split-eligibility rule (Split offered iff same-rank pair OR two 10-value ranks), both directions,
- bankroll chain (`bankroll_before + delta == bankroll_after`) across the session.
Emit a coverage report + assert zero violations; non-zero exit on any.

### `qa:flow` (agent 2, scripted)

Walk every transition (pre-session → deal → player turn(s) → dealer → resolution → next round;
multi-hand after split). Assert: control surface exactly matches legal actions at each state
(Double vanishes after Hit; nothing actionable post-resolution; Split iff eligible); no stuck state
across all snapshots; no stale cards/outcome/notice/note leaks into the next round; shoe-boundary
reshuffle notice appears once and clears; `active_hand_index` is actually rendered during a split
(the QA-004 check — negative-assert it's absent on single-hand/resolved rounds). Non-zero on any.

### Each script

Writes `journal/qa/runs/<date>-<role>/report.{md,json}`; non-zero exit on any failure; never
mutates `journal/qa/ledger.md` (findings are triaged into QA-NNN by hand). Pure check functions
are unit-tested (vitest) against known good/bad fixtures — including deliberately-broken fixtures
that MUST fail — so no script can silently go no-op-green.

## Testing the suite itself

Each role's `checks.ts` pure functions get `checks.test.ts` with good/bad fixtures (a known H17
violation, a wrong payout, a mis-offered split, a stuck-state snapshot, a leaked-state transition
must each FAIL). breakit's existing `oracle.test.ts` continues to pass after the lib move.

## Process-doc changes (done by parent session, not the build agent)

Rewrite `docs/specs/qa-playtest-process.md` to mark each pack agent `[SCRIPT]` or `[AGENT]`, and
codify the run order: Tier-1 scripts (`npm run qa` + engine/wasm/unit tests) gate the boundary;
the Player Experience agent runs only when `web/src/app/` changed; Product Review synthesizes.
Add a ledger coverage-area note per script role.

## Out of scope (V1 of the suite)

- Replacing the Player Experience agent (subjective; stays an agent).
- CI wiring (non-zero exits make it CI-ready; adding a workflow is deferred).
- Kitchen-sink attacks (network/resource/clock) — breakit V1 out-of-scope list still holds.
