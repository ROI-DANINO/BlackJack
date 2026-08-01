<!-- agent-kanban:v2 -->
> Format + policy: /home/roking/Desktop/Projects/workspace/docs/specs/2026-07-16-agent-sdlc-kanban-design.md — written via scripts/kanban.ts only.
>
> Migrated from `agent-kanban:v1` on 2026-07-18 (White Lotus initiation, step 4). The last v1
> board is archived verbatim at `journal/ops/archive/tasks-2026-07-18T2217.md`, which also holds
> the fields v2 drops (`Mode`, `Owner`, `Workspace`, `Done when`).
>
> Card IDs were re-issued in dependency order. Mapping to the v1 IDs that older sessions, plans,
> and `.wl/sdd/` still cite by name:
>   AL-01 -> AL-01 · AL-R1 -> AL-02 · AL-R2 -> AL-03 · AL-D1 -> AL-04 · AL-B1 -> AL-05
> AL-06 is new on this board — the foundation-audit Phase 1 thread, previously tracked only in
> `journal/ops/phase.md`'s `next:` queue.

## Milestones

### GD — Graded Decision Practice [active]
- Roadmap: step 2
- Plan: docs/superpowers/plans/2026-07-23-graded-decision-practice.md
## Ready
### GD-11 — Run feature QA and record the ledger
- Type: qa
- Milestone: GD
- Intent: closes the feature the way AGENTS.md requires — a scoped, ledger-driven playtest before anything is called done.
- Depends on: GD-08, GD-09, GD-10
- Source: docs/superpowers/plans/2026-07-23-graded-decision-practice.md §Task 11
- Outcome: `web/qa/practice/run.ts` drives real Chromium via Playwright through a full hand, an oracle-`null` re-deal, a storage-failure path, and a reload proving an attempt persisted across sessions; `npm run qa:practice -w web` is wired in `web/package.json`. `journal/qa/ledger.md` gains the practice area with its last-passed commit and a findings-register entry, and the run report lands in `journal/qa/runs/2026-07-23-practice/`. Scoping is ledger-driven: deep-test the new practice area, smoke-test the proven ones (free play, rules, flow).
- Next: Read `journal/qa/ledger.md` to scope the run, then create `web/qa/practice/run.ts` following `web/qa/learn/run.ts` (plan Task 11 step 1).
- Load: docs/superpowers/plans/2026-07-23-graded-decision-practice.md §Task 11, journal/qa/ledger.md, docs/specs/qa-playtest-process.md, web/qa/learn/run.ts
- Gate: feature-qa
- Evidence: pending
- Updated: 2026-07-25T20:06:27.770Z
### GD-10 — Measure the production bundle delta
- Type: chore
- Milestone: GD
- Intent: pays the conditional debt on the `idb` admission now that a real consumer finally imports it.
- Depends on: GD-09
- Source: docs/superpowers/plans/2026-07-23-graded-decision-practice.md §Task 10
- Outcome: `web/scripts/measure-bundle-delta.sh` measures production JS bytes against the pre-`idb` baseline and `docs/specs/stack-boundaries.md` records the result and a pass/reverse verdict. Measured AFTER the surface ships, because only then does anything actually import `idb` — measuring earlier tree-shakes to zero and makes the check decorative. A material unacceptable delta reverses the choice to native IndexedDB, which is an owner call, so this card carries a user-approval gate.
- Next: Create `web/scripts/measure-bundle-delta.sh` (plan Task 10 step 1) and run it.
- Load: docs/superpowers/plans/2026-07-23-graded-decision-practice.md §Task 10, docs/specs/stack-boundaries.md
- Gate: user-approval
- Evidence: pending
- Updated: 2026-07-25T20:06:27.515Z
### GD-09 — Ship the practice surface
- Type: build
- Milestone: GD
- Intent: gives the learner the activity itself, while keeping the UI thin enough that it decides nothing.
- Depends on: GD-07
- Source: docs/superpowers/plans/2026-07-23-graded-decision-practice.md §Task 9
- Outcome: `web/src/app/Practice.tsx` renders `PracticeState` and dispatches; `App.tsx` gains the `practice` mode in its `Mode` union, nav, and render. The classification question comes first and no strategy answer leaks before reveal. A copy guard asserts the product constraint from design §2b: a correct decision that lost reads as variance, never as the learner's mistake. The existing `web/src/learn/` prototype is not modified — not one line.
- Next: Create `web/src/app/Practice.test.tsx` (plan Task 9 step 1) and confirm the failure.
- Load: docs/superpowers/plans/2026-07-23-graded-decision-practice.md §Task 9, web/src/app/App.tsx, docs/superpowers/specs/2026-07-23-graded-decision-practice-design.md
- Gate: code-review
- Evidence: pending
- Updated: 2026-07-25T20:06:27.236Z
### GD-08 — Assert the exclusion boundary
- Type: build
- Milestone: GD
- Intent: turns the slice's two core product commitments into mechanism, because a reviewer could approve the controller and still reject these.
- Depends on: GD-06, GD-07
- Source: docs/superpowers/plans/2026-07-23-graded-decision-practice.md §Task 8
- Outcome: `web/src/practice/boundary.test.ts` checks the practice modules structurally over source text, in the precedent of `web/src/progress/boundary.test.ts`: no progress calculation may read `engine.outcomes` (hand result) or `confidence`, and `attempt.ts` derives disposition only from chosen vs oracle. Asserted by test, not by convention.
- Next: Create `web/src/practice/boundary.test.ts` (plan Task 8 step 1) and confirm it fails before the guards hold.
- Load: docs/superpowers/plans/2026-07-23-graded-decision-practice.md §Task 8, web/src/progress/boundary.test.ts
- Gate: code-review
- Evidence: pending
- Updated: 2026-07-25T20:06:26.951Z
### GD-07 — Build the practice controller
- Type: build
- Milestone: GD
- Intent: keeps the activity's rules in plain TypeScript so React can render the loop without owning any of it.
- Depends on: GD-03, GD-05, GD-06
- Source: docs/superpowers/plans/2026-07-23-graded-decision-practice.md §Task 7
- Outcome: `web/src/practice/controller.ts` exports `PracticeController` with `getState`, `subscribe`, `start`, `classify`, `decide`, `rateConfidence`, `next`, over the phases idle/classify/decide/confidence/reveal/resolved/fatal. The loop asks for classification first and records confidence BEFORE revealing the grade; an oracle `null` is the re-deal signal; if the oracle does not answer, nothing is graded — there is no TypeScript fallback for a strategy answer. Attempts are written through the existing `ProgressStore` port.
- Next: Create `web/src/practice/controller.test.ts` with the loop-order tests (plan Task 7 step 1) and confirm the failure.
- Load: docs/superpowers/plans/2026-07-23-graded-decision-practice.md §Task 7, web/src/bridge/core-client.ts, web/src/progress/store.ts
- Gate: code-review
- Evidence: pending
- Updated: 2026-07-25T20:06:26.692Z
### GD-06 — Build the attempt builder
- Type: build
- Milestone: GD
- Intent: turns one completed decision into a durable record whose shape is testable without running a state machine.
- Depends on: GD-04, GD-05
- Source: docs/superpowers/plans/2026-07-23-graded-decision-practice.md §Task 6
- Outcome: `web/src/practice/attempt.ts` exports `buildDecisionAttempt` and `buildClassificationAttempt`, each returning a `ProgressAttemptDraft`. Disposition is derived from chosen-vs-oracle only — never from the hand result — and `assistance` is `'none'` throughout this slice because none is delivered. `tableVisibility` is recorded from day one.
- Next: Create `web/src/practice/attempt.test.ts` (plan Task 6 step 1) and confirm the failure.
- Load: docs/superpowers/plans/2026-07-23-graded-decision-practice.md §Task 6, web/src/progress/store.ts, web/src/progress/types.ts
- Gate: code-review
- Evidence: pending
- Updated: 2026-07-25T20:06:26.427Z
### GD-05 — Build the confusable-hand pool
- Type: build
- Milestone: GD
- Intent: chooses what the learner practises by confusability rather than by teaching label, so the activity trains discrimination instead of recall.
- Depends on: GD-01
- Source: docs/superpowers/plans/2026-07-23-graded-decision-practice.md §Task 5
- Outcome: `web/src/practice/pool.ts` exports `PRACTICE_POOL: PracticeOpening[]` and `CLASSIFICATION_CHOICES`. Openings carry id, skillId, classification (hard/soft/pair) and `cards` in the `[player-first, dealer-up, player-second]` order `learn/situations.ts` documents. Data only, mirroring that module's deliberate no-functions rule, so the pool survives a JSON round trip deep-equal — proven by test. Three hands that are all "16" with three different right answers.
- Next: Create `web/src/practice/pool.test.ts` (plan Task 5 step 1) and confirm the failure before authoring the pool.
- Load: docs/superpowers/plans/2026-07-23-graded-decision-practice.md §Task 5, web/src/learn/situations.ts
- Gate: code-review
- Evidence: pending
- Updated: 2026-07-25T20:06:26.155Z
### GD-04 — Add confidence to the durable record
- Type: build
- Milestone: GD
- Intent: records how sure the learner felt at decision time as evidence, while making it structurally impossible for that feeling to score them.
- Depends on: GD-01
- Source: docs/superpowers/plans/2026-07-23-graded-decision-practice.md §Task 4
- Outcome: `ProgressAttempt.confidence: number | null` exists as a top-level field — not nested inside the opaque `response`, so P-5 is answerable without parsing activity-owned JSON. It is captured before any result is revealed and is stored only: never an input to mastery, progression, or any accuracy figure. The change is free now (`schemaVersion` 1, zero persisted learners, no consumer), and the existing contract, canonical, and boundary suites stay green.
- Next: Append the `expectTypeOf` test to `web/src/progress/types.test.ts` (plan Task 4 step 1) and confirm the missing-property failure.
- Load: docs/superpowers/plans/2026-07-23-graded-decision-practice.md §Task 4, web/src/progress/types.ts
- Gate: code-review
- Evidence: pending
- Updated: 2026-07-25T20:06:25.877Z
### GD-03 — Carry strategy_action across the wire contract
- Type: build
- Milestone: GD
- Intent: gives the browser one validated door to the oracle, so no grading path can ever bypass the engine.
- Depends on: GD-02
- Source: docs/superpowers/plans/2026-07-23-graded-decision-practice.md §Task 3
- Outcome: `bridge/types.ts` carries the command and response variants, `bridge/validate.ts` accepts `strategy_action` and rejects any action the engine could never emit, and `CoreClient.strategyAction(session): Action | null` exists. Envelope tests cover a named action, the `null` no-decision signal, and a rejected `surrender`; web tests and `tsc --noEmit` stay clean.
- Next: Append the `strategy_action` envelope tests to `web/src/bridge/validate.test.ts` (plan Task 3 step 1) and confirm the failure.
- Load: docs/superpowers/plans/2026-07-23-graded-decision-practice.md §Task 3, web/src/bridge/types.ts, web/src/bridge/validate.ts, web/src/bridge/core-client.ts
- Gate: code-review
- Evidence: pending
- Updated: 2026-07-25T20:06:25.605Z
### GD-02 — Expose the strategy oracle over the wire
- Type: build
- Milestone: GD
- Intent: makes the verified basic-strategy oracle reachable from the browser at all — today it is called by nothing but its own tests.
- Depends on: GD-01
- Source: docs/superpowers/plans/2026-07-23-graded-decision-practice.md §Task 2
- Outcome: `CoreCommand::StrategyAction { session }` and `CoreResponse::StrategyAction(Option<Action>)` exist in `boundary.rs` and serialise over `dispatch_json` as `{"type":"strategy_action","data":"hit"|...|null}`. TypeScript sends only the session — Rust derives hand, upcard, ruleset, and legal actions from it, following the `current_legal_actions` precedent. Three boundary tests cover hard 16 vs ten (Hit), a natural (None, the re-deal signal), and the JSON shape; cargo fmt and clippy stay clean.
- Next: Append the three failing tests to `crates/blackjack-core/tests/strategy_tests.rs` (plan Task 2 step 1) and confirm the compile failure.
- Load: docs/superpowers/plans/2026-07-23-graded-decision-practice.md §Task 2, crates/blackjack-core/src/boundary.rs, crates/blackjack-core/tests/strategy_tests.rs
- Gate: code-review
- Evidence: pending
- Updated: 2026-07-25T20:06:25.323Z
### GD-01 — Fix the WASM freshness guard
- Type: fix
- Milestone: GD
- Intent: closes a guard that is broken by omission, so no later task in this slice can ship a stale engine silently.
- Depends on: none
- Source: docs/superpowers/plans/2026-07-23-graded-decision-practice.md §Task 1
- Outcome: `web/scripts/check-wasm-fresh.sh` watches `Cargo.lock` and `web/scripts/build-wasm.sh` in addition to the crate sources, and `web/scripts/check-wasm-fresh.test.sh` proves it — the guard fails when either file is newer than the wasm artifact. PROGRESS has recorded this gap missing two slices; it goes first so every later task is guarded by it.
- Next: Write `web/scripts/check-wasm-fresh.test.sh` (plan Task 1 step 1) and run it to confirm the guard passes despite a touched `Cargo.lock`.
- Load: docs/superpowers/plans/2026-07-23-graded-decision-practice.md §Task 1, web/scripts/check-wasm-fresh.sh
- Gate: code-review
- Evidence: pending
- Updated: 2026-07-25T20:06:25.046Z


## Active


## Verification

## Done





## Blocked
