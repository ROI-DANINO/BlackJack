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

## In progress
- Phase boundary: V1 Free Play skeleton and scoped polish are complete. Decide whether to move to V2 Basic Strategy now.

## Open questions
- How should the BlackjackInfo chart be encoded into the first machine-readable Basic Strategy table?
- Should a later ruleset support player-taken insurance, or should V1/V2 keep training auto-decline?
- What exact card lifecycle model will support future CSM/ASM variants cleanly?
