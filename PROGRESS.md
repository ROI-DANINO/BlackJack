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
  and lesson lifecycle enforcement. Latest close evidence: 92 Rust tests, 217 web tests, and full QA
  pack PASS.

## In progress
- **Strategy Table Fundamentals design**: define the first learner-visible lesson—hand classification
  and table navigation—and the smallest engine-owned grading API it needs, without making the first
  experience memorization-first.

## Open questions
- What should the first Strategy Table Fundamentals lesson teach first: hand classification, row/column lookup, or table-open practice?
- How should the product distinguish the Blackjack Foundations "try Hit to feel bust risk" moment from later Basic Strategy recommendations?
- Should a later ruleset support player-taken insurance, or should V1/V2 keep training auto-decline?
- What exact card lifecycle model will support future CSM/ASM variants cleanly?
