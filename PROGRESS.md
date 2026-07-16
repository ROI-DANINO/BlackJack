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

## In progress
- **Browser-local progress storage research is next**: AL-R2 will write an independent plan, compare
  mechanisms against the durable `ProgressStore` consumer, and require explicit migration,
  determinism, failure, and exit evidence before any implementation or admission decision.
- **Boundary hardening remains queued for the next Core wire change**: extend the WASM
  freshness guard to `Cargo.lock`/`build-wasm.sh` and add real native↔built-WASM parity evidence;
  the adaptive mechanics proof must not create a speculative Core wire change merely to absorb it.

## Open questions
- Which browser-local storage mechanism best fits the durable `ProgressStore` consumer and its
  migration/failure requirements?
- What provider-neutral local AI boundary can meet the approved authority, validation, privacy,
  token, latency, and deterministic-fallback constraints?
- Should a later ruleset support player-taken insurance, or should V1/V2 keep training auto-decline?
- What exact card lifecycle model will support future CSM/ASM variants cleanly?
