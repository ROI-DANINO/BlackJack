# Progress

> What is done / in progress *now*, and open questions.

## Done
- Product vision, roadmap draft, V1 simulation draft, learning notes, and research brief were folded into tracked owned docs.
- Original pre-init notes are tracked and indexed under `docs/imports/initial-product-notes/`.
- V1 ruleset locked: 6-deck H17 DAS no-surrender peek, 3:2 blackjack, 75% default penetration.
- Rust free-play simulator core built via subagent-driven TDD (Tasks 1–6): rules, deterministic shoe, scoring, session/split engine, JSON boundary + CLI.
- Final whole-branch review remediated: dealer no longer draws after all hands are terminal (bust/natural); shoe-reshuffle recovery command preserving bankroll/logs; custom-ruleset validation at session creation; `RoundLog` carries the full ruleset so any hand is reproducible from its log alone. 45 tests green (fmt + clippy clean).
- `blackjack` extracted from the Projects spine into its own standalone git repo (history preserved); spine now gitignores it.
- **TS UI bridge shipped**: browser-playable Free Play runs the Rust core in-browser via client-side WASM. New `web/` (Vite+React+TS); strict React → GameController → CoreTransport → WASM → Rust; hand-authored wire types golden-fixture guarded; async LogSink → JSONL history to `data/history/`. Built via subagent-driven-development (9 tasks) with Fable pre-build/plan/whole-branch reviews; merged to main locally; 46 Rust + 17 web tests green.
- **V1 Free Play skeleton COMPLETE**: auto-reshuffle at the shoe boundary (Free Play crosses shoes) + per-hand notes (attach-on-Deal, harness `note` on the round JSONL line). rd-verify (opus) + craft gate (sonnet) both PASS; merged to main (through 3a3bd6b); 46 Rust + 19 web tests green. V1 exit criteria met.
- **V1 Free Play polish scoped and shipped**: any two 10-value cards can split through the shared core legal-action rule; the table shows per-hand win/loss/push/blackjack outcomes after resolution; dealer-ace insurance auto-decline is visible instead of silent.
- **V1 QA gate cleared**: the targeted browser re-test verified QA-001/003/004/005/007/009; the ledger records GO for V2.
- **Basic Strategy oracle shipped and feature-QA passed**: the V1-ruleset oracle is Rust-owned, ruleset-keyed, and covered across the verified source chart.
- **First V2 guided-drill prototype shipped, feature-QA passed, and was later retired cleanly**:
  "Get to Know Blackjack" proved the engine-backed lesson loop before Blackjack Foundations replaced
  it; `qa:learn` now owns learning-path QA.
- **Blackjack Foundations shipped and feature-QA passed** (`964efa1`): nine complete-beginner units,
  deterministic engine-backed lesson flow, typed content-as-data, functional Learn UI, and ledger-
  driven browser QA.
- **Strategy Profile Foundation shipped and feature-QA passed** (`5bbc0b4`): verified H17/S17
  strategy profiles, engine-owned full-ruleset compatibility, a guarded Rust/TypeScript wire contract,
  and lesson lifecycle enforcement. Latest close evidence: 80 Rust tests, 217 web tests, and full QA
  pack PASS.
- **AL-05 / cycle-1 ProgressStore foundation shipped, feature-QA passed, and whole-cycle-reviewed**
  (`4a197b6`): provider-neutral port + versioned learner envelope, canonical serializer with
  exhaustiveness tripwires, 14-gate contract suite (fake honestly 12/14; idb adapter **28/28 in
  real Chromium + Firefox** with mutex-free two-page races), store-clearing revision-checked reset,
  three-tier byte measurement (~807–816 B/attempt), and a durable QA ledger record. Closed under a
  user-directed whole-cycle Fable review: wl-verify CONFORMS, wl-judge PASS. No UI consumer and no
  learner data written — by design; cycle 2+ wires the producer.
- **Strategy Table Fundamentals lesson-one direction approved, then intentionally paused**: its
  mechanics-first sequence and the Hit-on-16 continuity wording are recorded; the remaining content,
  grading-boundary, and feature-design work resumes after the adaptive mechanics proof establishes
  the contracts it should consume.
- **Adaptive-learning umbrella approved**: stable versioned curriculum plus bounded dynamic sessions,
  deterministic grading/mastery/progression authority, browser-local anonymous learner state, and a
  checkpoint-hybrid/on-demand coach model. The work is split into independent research and
  implementation plans rather than one coupled mega-plan.
- **Adaptive learning product/activity research approved** (`58acefb`): 24 registered sources,
  12 compared teaching patterns, 10 learning-science/accessibility evidence areas, 8 public
  technical boundaries, and 41 traceable requirements for multiple choice, assemble blocks,
  engine-backed hands, sessions, mastery/progression, and accessibility. The user approved all six
  bounded recommendations; numeric calibration and psychometric adaptive testing remain deferred.
- **Browser-local progress storage admitted**: the equal research harness recorded 210 correctness
  and failure cells across Chromium, Firefox, and WebKit; native IndexedDB, `idb`, and Dexie each
  passed 42/42. The user approved `idb` 8.0.3 and the versioning, atomicity, recovery, export, and
  privacy constraints. Performance timing remains an explicit non-blocking coverage gap; no
  production adapter has been implemented yet.

- **AL-D1 complete — the cycle-1 `ProgressStore` design and its 11-task TDD plan are approved**
  (2026-07-17). A seven-cluster research sweep re-scoped the card from an end-to-end write/reload
  slice to the design's cycle-1 foundation: the port, the versioned envelope and attempt record, and
  a provider-neutral contract suite proven headless against fixtures. The card had run one cycle
  ahead of its own source design, and today's `AttemptRecord` cannot support the admitted idempotent
  revision-checked checkpoints — no id, timestamp, schema version, or learner key, so two identical
  wrong answers on one step are byte-identical. Five docs repairs landed with it: the identity ADR
  (never previously written down, though required before any durable write), the conditional `idb`
  bundle-check obligation propagated into the owned docs, identity wording corrected in three docs,
  two dropped learning-integrity QA gates restored, and a stale worktree pointer fixed.

## In progress
- **AL-B1 — build the cycle-1 foundation.** 11 tasks, TDD, no visible product change by design.
  Two traps are already defused in the plan: the bundle probe runs *before* the adapter (nothing
  imports `idb` in cycle 1, so a naive diff would tree-shake to zero and make the conditional
  admission decorative), and the 14 gates are host-neutral **data** rather than `it()` blocks,
  because neither Vitest environment has IndexedDB and `fake-indexeddb` was rejected — it would
  prove the multi-tab gate against a simulation, and that gate is the entire evidence for the
  approved `appendAttempt` deviation.
- **Skill-grained evidence already exists and is misnamed** (verified 2026-07-17):
  `AttemptRecord.outcomeId` is a validated foreign key into `Subject.skills` — `validate.ts:51-55`
  requires every `unit.outcomes` entry to be a known skill id, `:70-75` requires every question
  step's `outcomeId` to be in `unit.outcomes` — over a real 16-skill taxonomy. Mastery has a usable
  key today. The name collides with `engine.outcomes: HandOutcome[]` (win/loss/push) one field away
  in the same record, so the durable projection should rename rather than re-derive.
- **The first real write/reload consumer moves to the adaptive-mechanics proof**, where the design
  places persistence integration and where the per-cell strategy-chart grammar gets named.
- **Boundary hardening — the freshness half is unblocked and should stop waiting.**
  `web/scripts/check-wasm-fresh.sh:12` watches only `crates/blackjack-core/src` and its `Cargo.toml`,
  so the root `Cargo.lock` and `web/scripts/build-wasm.sh` are invisible to it — a one-line `find`
  fix with zero wire dependency. It has now failed to ride a Core wire slice twice, and nothing on
  the remaining V2 path is guaranteed to be wire-changing. Only the native↔built-WASM parity half
  genuinely needs a build-and-compare harness and a carrier.

## Open questions
- What is a "session" — its identity, boundary, and lifecycle? `learning-mastery-and-scoring.md:114`
  requires mastery evidence to span sessions, but no owned doc defines one, and attempts cannot be
  attributed without it.
- What bounds the raw attempt log? The owned instruction is to keep raw attempts, with no stated cap;
  retention appears only under the unfired external-beta telemetry trigger, so there is no authority
  to import one.
- Should the attempt record pin the strategy-profile version? Lessons already gate on
  `unit.profileId`, but no owned doc pins it into evidence — so evidence collected under a future
  S17 profile would be indistinguishable from H17 evidence.
- Was dropping the "production" rung — the learner names the play before seeing options — from the
  exercise ladder in `learning-mastery-and-scoring.md:85-95` intentional? The fold added two rungs
  and dropped that one without a recorded reason.
- Which existing learner action becomes the first durable write/reload consumer? Deferred to the
  adaptive-mechanics proof rather than answered by AL-D1.
- What provider-neutral local AI boundary can meet the approved authority, validation, privacy,
  token, latency, and deterministic-fallback constraints?
- Should a later ruleset support player-taken insurance, or should V1/V2 keep training auto-decline?
- What exact card lifecycle model will support future CSM/ASM variants cleanly?
