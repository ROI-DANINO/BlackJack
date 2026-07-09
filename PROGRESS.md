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

## In progress
- V1 Simulation Foundations: core + UI bridge shipped. Next is a small Free Play UI cycle — a per-hand notes input (saved as a harness `note` on the round JSONL line) and wiring `reshuffle()` so Free Play crosses the shoe boundary (closes an accepted craft-minor: reshuffle is unwired in the UI today).

## Open questions
- How should the BlackjackInfo chart be encoded into the first machine-readable Basic Strategy table?
- What exact card lifecycle model will support future CSM/ASM variants cleanly?
