# QA Ledger

> Coverage state + findings register. Process: `docs/specs/qa-playtest-process.md`.
> Before scoping any QA run, read this file; "already tested?" is answered by diffing an
> area's files since its **Last-passed commit**, never by memory. After every run, update
> both tables. Run reports live in `journal/qa/runs/`.

## Coverage areas

Verdicts: `PASS` / `FAIL` / `never-run`. Deep-test an area when its files changed since the
recorded commit (or it has never run); smoke-test otherwise.

| Area | Watched files | Last run | Last-passed commit | Verdict | Notes |
|------|---------------|----------|--------------------|---------|-------|
| Engine rules & math | `crates/` | 2026-07-15-strategy-profile-foundation | 84953ed | PASS | **Deep-tested.** `cargo fmt --all -- --check`, `cargo clippy -p blackjack-core -- -D warnings`, and `cargo test -p blackjack-core` all passed (80 tests). Exact canonical H17/S17 resolution, altered-ruleset rejection, both source charts, and JSON compatibility verdicts are covered. The earlier 92-test report was corrected after a fresh `cargo test -p blackjack-core -- --list` recount on 2026-07-15; the PASS verdict is unchanged. |
| UI/wire fidelity (display ↔ engine ↔ JSONL) | `web/src/`, `crates/` wire types | 2026-07-15-strategy-profile-foundation (re-certification) | d162352 | PASS | **Deep-tested.** Final code commit `d162352` adds positive S17 real-WASM coverage. Focused `learn/engine.test.ts` + `learn/controller.test.ts` passed 34 tests; full `npm test` passed 217. Compatibility lifecycle covers compatible H17/S17 → renderable, mismatch/unsupported → pre-render fatal, and profile-less Basics. `qa:rules` passed 90 re-derived rounds / 514 assertions / 0 violations. |
| Betting & payout math (bankroll, 3:2, push, split/double stakes) | `web/src/`, `crates/` | 2026-07-15-strategy-profile-foundation (smoke) | 8952828 | PASS | **Smoke-tested; not advanced.** `qa:rules` re-derived H17, payout multipliers, split/double scaling, and bankroll chains for 90 rounds with 0 discrepancies, but this profile slice did not deep-test this entire watched area; its last-passed commit remains `8952828`. |
| Round & state flow (turns, buttons, reset, reshuffle) | `web/src/` | 2026-07-15-strategy-profile-foundation (smoke) | 8952828 | PASS | **Smoke-tested; not advanced.** `qa:flow` passed: 273 snapshots, 1166 assertions, 29 split-turn snapshots, 1 reshuffle, 0 violations, but this profile slice did not deep-test this entire watched area; its last-passed commit remains `8952828`. |
| Blackjack Basics learning system | `web/src/learn/`, `web/src/app/{Learn,Lesson,useLesson}.tsx`, `web/src/breakit-hook.ts`, `web/qa/learn/` | 2026-07-15-strategy-profile-foundation (re-certification) | d162352 | PASS | **Deep-tested.** Final code commit `d162352` adds positive S17 profile-gate tests. Focused real-WASM engine/controller lifecycle passed 34 tests; profile-less curriculum remains playable. `qa:learn` passed 9/9 units, six arranged + one live checkpoint hands, 28 assertions, 0 violations. Report `runs/2026-07-15-learn/`. |
| Player experience & clarity | `web/src/` | 2026-07-12-blackjack-basics-feature-qa | 8952828 | PASS | PX pass over all nine Blackjack Basics units: concept order builds on declared prerequisites, one concept per screen, wrong answer → teaching retry, action/outcome kept separate (feedback says "a strong total can still lose"), live complete-round checkpoint grades comprehension, all nine directly selectable + replay + Return-to-units, functional a11y (h1/h2, buttons, role=status/alert). QA-014 V3 polish reservation remains; QA-016 (prereqs shown as raw skill ids) logged non-blocking. |
| Robustness (rapid input, illegal actions, refresh, long grind) | `web/src/` | 2026-07-15-strategy-profile-foundation (smoke) | 8952828 | PASS | **Smoke-tested; not advanced.** `qa:breakit` passed all 12 attacks with 0 failed invariants and the dev hook absent from the production build, but this profile slice did not deep-test this entire watched area; its last-passed commit remains `8952828`. QA-008/QA-012 remain non-blocking backlog. |
| Product readiness (V1 gate) | whole build | 2026-07-10-v1-remediation-retest | 30ec927 | GO (for V2) | 6-item remediation list all verified 2026-07-10 → V1 gate cleared, V2 Basic Strategy unblocked. Still not external-playtest-ready (QA-006/008/010–014 backlog; styling V3). See `runs/2026-07-09-v1-milestone/product-review.md` |
| QA script suite (`web/qa/`: rules+flow+breakit+learn) | `web/qa/`, `web/src/` | 2026-07-15-strategy-profile-foundation (re-certification) | d162352 | PASS | Re-run after final code commit `d162352`: `npm --prefix web run qa` passed rules → flow → breakit → learn; each role checked WASM freshness before its production preview. Commands ran from documentation-only descendant `6df126f`; `d162352..6df126f` changes no `web/` or `crates/` code. Reports in `runs/2026-07-15-{rules,flow,breakit,learn}/`. |
| Agent workflow & handoff | `AGENTS.md`, `journal/ops/tasks.md`, `/home/roking/.codex/skills/codex-{start,next,end}/` | 2026-07-15-agent-kanban | `66de1a6`; GREEN reports `98a5d4726bb765b1da17dca86ef7b3d092bf77732e56ea0d18176212193d8306`, `d9392f826b4fb8bb736880da5299883a4a81585baf417ad8955a45dba477304b`, `8ae82f78a14ae2f26dbdeaef99ee73c92d72fddb568076ff1f03a1d3356b9a3e`, `d7ac3daa752e079ca1c440fc0d75513727ba28596c943b257f8996616df270e4`, `8c4b4028b4ece39c711c4f676d2a687dba7d0bea84be167b3a3fb4d1435b1485`, `146e55593526e13aa494fde3dc2359afb4f57dea54176d870524a547152ba46b` | PASS | **Deep-tested.** Marked and legacy lifecycles, all invariants/refusals/transitions, and the three personal skills passed. Real `$codex-start` stayed read-only with no drift. See [run report](runs/2026-07-15-agent-kanban/report.md). |

## Findings register

IDs `QA-NNN`, stable forever. Status: `open` → `fixed` → `verified`, or `wontfix` (+reason).
Only `verified` closes a finding; `fixed` items get a targeted re-test in the next run.

| ID | Found in run | Area | Severity | Summary | Status |
|----|--------------|------|----------|---------|--------|
| QA-001 | 2026-07-09-v1-milestone | build pipeline | major | WASM artifact (gitignored) is not rebuilt/verified when `crates/` changes; stale engine served silently — green suites don't prove the browser build | **verified** (2026-07-10) — touch lib.rs → `npm test` aborts with stale-wasm message; `build:wasm` heals, 41/41 pass |
| QA-002 | 2026-07-09-v1-milestone | UI/wire fidelity | blocker | Mixed-rank ten-value pairs never offered Split (7/7) — root cause: stale WASM (QA-001); engine correct; Split verified 4/4 after rebuild + sane split round logged | **verified** (closed 2026-07-09) |
| QA-003 | 2026-07-09-v1-milestone | robustness | blocker | Same-tick double-click on Deal/Download writes a duplicate round line to history JSONL (`game.ts` `writePending` nulls `pendingLine` after the awaited write; reproduced 3 ways) | **verified** (2026-07-10) — no dupes across 13 rounds / 3 downloads incl. double-click Download; Deal now self-guards (deals too fast to double-click). Caveat: same-tick Deal race unreachable by manual input — verified via download-behavior + tests |
| QA-004 | 2026-07-09-v1-milestone | round & state flow | major | No indication of which hand is active during a split; `active_hand_index` on the wire but never rendered | **verified** (2026-07-10) — active-hand marker renders and advances correctly on a split |
| QA-005 | 2026-07-09-v1-milestone | player experience | major | No hand totals displayed (player or dealer) — every decision requires mental math | **verified** (2026-07-10) — totals shown; soft `x/y`, blackjack `21`, dealer `(X + ?)` then full reveal |
| QA-006 | 2026-07-09-v1-milestone | player experience | major | Bet amount not shown pre-deal and not changeable; only visible via outcome deltas | open — backlog (display cheap now; controls V2/V3) |
| QA-007 | 2026-07-09-v1-milestone | robustness | major | Bankroll below flat bet → dead end: Deal rejected, no reset/new-session control; only escape is refresh | **verified** (2026-07-10) — New session always present; flushes prior buffered round under the OLD session_id before the new header (JSONL confirmed) |
| QA-008 | 2026-07-09-v1-milestone | robustness | major | Refresh silently wipes the session — no warning, no autosave | open — backlog (`beforeunload` confirm is cheap) |
| QA-009 | 2026-07-09-v1-milestone | product | decision | Fixed seed `'free-play'` (`Table.tsx:29`): every session deals the byte-identical shoe | **verified** (2026-07-10) — seed renders `fp-…`, changes per session; JSONL `session_header.seed` matches the on-screen VALUE (not just the label) |
| QA-010 | 2026-07-09-v1-milestone | player experience | minor | "Insurance auto-declined" note gives no amount/explanation | open — backlog |
| QA-011 | 2026-07-09-v1-milestone | player experience | minor | Bust vs lose-to-dealer render identically ("Loss (−$X)"), no bust flag | open — backlog |
| QA-012 | 2026-07-09-v1-milestone | robustness | minor | Rejected-click error text lingers in the status line until next successful action | open — backlog |
| QA-013 | 2026-07-09-v1-milestone | player experience | minor | Note field strips newlines (single-line input) and visually crowds the Download button | open — backlog |
| QA-014 | 2026-07-09-v1-milestone | player experience | note | Unstyled UI reads as a debug harness — explicitly V3 scope, recorded so it isn't re-reported | open — V3 |
| QA-015 | 2026-07-11-player-experience | player experience | minor | Drill Split feedback screen kept showing `← playing` after the split round had resolved, making the Continue state look like an active turn | **verified** (2026-07-11) — `Drill.tsx` now gates active marker on `player_turn`; regression in `Drill.test.tsx`; final `npm run qa` passed |
| QA-016 | 2026-07-12-blackjack-basics-feature-qa | player experience | minor | Unit list renders prerequisites as raw skill ids (`Learn.tsx`: `unit.prerequisites.join(', ')` → e.g. "builds on: goal, hand-total") instead of the friendly `SKILLS` titles ("Explain the goal of blackjack", "Read a hand total") that already exist. Decipherable but slightly techy for a complete beginner. | open — backlog (non-blocking; friendly-title lookup is cheap, deferred to avoid scope creep) |
| QA-017 | 2026-07-12-final-branch-review | UI/wire fidelity | note | `web/src/learn/feedback.ts` re-derives DISPLAY hand totals in TS via pre-existing `app/totals.ts` to render prose ("your 17 beat the dealer's 16"). Display-only, NOT a grade — win/loss/push + deltas still come from the engine outcome, same display path Free Play uses; `handTotal` ace logic matches the engine `score_ranks`. Surfaced (not introduced) by the drill→learn `feedback.ts` relocation. | open — backlog (closes when `best_total` moves onto the wire; retires `totals.ts` — existing V2 TODO) |

**Coverage gaps carried forward:** split aces never dealt (deterministic shoe); 3–4-way
resplits; double/split bankroll boundary observed in source only; multi-tab races untried.

**Remediation-branch backlog (final whole-branch review, 2026-07-09 — none block merge):**
targeted re-test should verify the seed VALUE renders (jsdom test only checks the label) and
click-hammer New session in the real browser; `writePending`'s claim-before-await must be
revisited when V2 adds a truly async sink (a suspending write could let `downloadLog` export
without the in-flight round); Deal+New-session same-tick interleave can write a round line
after the new header (correct session_id, wrong file position); wasm freshness guard doesn't
watch `Cargo.lock`/`build-wasm.sh`; `Table.tsx` duplicates the startSession handler (extract
`startFresh()` when bet controls arrive); HandView `hideFrom=0` shows no total; totals tests
lack A,2,4 soft and A,A,9 soft-21 cases; no negative active-marker assertions (single-hand /
resolved rounds).

## Run log

| Date | Run | Type | Commit | Report dir | Outcome |
|------|-----|------|--------|------------|---------|
| 2026-07-09 | v1-milestone | milestone QA (first run, all deep) | 6121a51 (+WASM rebuild) | `runs/2026-07-09-v1-milestone/` | 14 findings (2 blockers: QA-002 verified-closed, QA-003 open); verdict: remediate 6 items, then V2 |
| 2026-07-10 | v1-remediation-retest | targeted feature-QA re-test (manual, Roi playing) | 30ec927 | — | 6 remediated findings (QA-001/003/004/005/007/009) re-tested against running build → all **verified**; V1 gate cleared for V2. QA-003 caveat: same-tick Deal race unreachable by manual input |
| 2026-07-10 | qa-suite | Tier-1 script suite (first run of qa:rules + qa:flow; qa:breakit restructured) | c5aff12 | `runs/2026-07-10-{rules,flow,breakit}/` | All PASS: rules 90 rounds/12-of-12 situations/0 violations, flow 273 snapshots/0 violations, breakit 12/12. No new findings. Replaces mechanical pack agents 1/2/4 with deterministic scripts |
| 2026-07-10 | strategy-oracle | scoped feature QA (engine) | bdda2f0 | `runs/2026-07-10-strategy-oracle/` | PASS: new oracle deep-tested across 320 chart cells and fallback/boundary cases; existing core engine suite smoke-tested (63 tests); no findings. |
| 2026-07-11 | get-to-know-blackjack | scoped feature QA (guided drill + ledger) | 44606e2 | `runs/2026-07-11-{rules,flow,breakit,drill,player-experience}/` | PASS-with-reservations: cargo core suite passed; `npm test` 144/144; full `npm run qa` passed all four roles. PX found QA-015, fixed+verified; Hit-on-16 accepted as orientation copy, not strategy advice. |
| 2026-07-12 | blackjack-basics-feature-qa | scoped feature QA (milestone-adjacent: Blackjack Basics learning system) | 8952828 | `runs/2026-07-12-{rules,flow,breakit,learn}/` | PASS. Gates from fresh state: `cargo fmt --all -- --check` (after resolving pre-existing blackjack-core-only fmt drift), `cargo test -p blackjack-core` 62 pass, `cargo clippy … -D warnings` clean, `npm test` 205/205, `npm run build` clean w/ fresh WASM, `npm run qa` all four roles PASS (rules 90 rounds/514 asserts, flow 273 snaps/1166 asserts, breakit 12/12, learn 9/9 units/28 asserts, 0 violations across all). PX pass cleared all nine units. New finding QA-016 (minor, backlog, not fixed). No product-blocking findings. |
| 2026-07-15 | strategy-profile-foundation | scoped feature QA | d162352 | `runs/2026-07-15-strategy-profile-foundation/` | PASS. Re-certified final code `d162352` (commands ran from docs-only descendant `6df126f`): focused real-WASM engine/controller suite 34 tests, full web suite 217 tests, and full `npm run qa` all passed. Deep: engine, UI/wire, Blackjack Basics. Smoke-only payout, flow, and robustness retain `8952828`; PX skipped because `web/src/app/` did not change. Every QA role's WASM freshness guard passed; no rebuild was needed. No new findings. |
| 2026-07-15 | agent-kanban | scoped feature QA (agent workflow & handoff) | 66de1a6 | `runs/2026-07-15-agent-kanban/` | PASS. Marked/legacy lifecycles, nine invariant cases, duplicate mutation refusals, four legal transitions, all three skill validators, and real read-only start passed. Product smoke: 80 Rust, 217 web, and all four QA roles passed. No new findings. |
