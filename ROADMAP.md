# Roadmap

> Destination, phases, milestones, exit criteria.
> Structure: versions -> milestones -> phases -> tasks. Only the active phase gets detailed tasks.
> QA gates: every feature ships with a scoped feature QA; every milestone below closes with a
> milestone QA pack run before the next phase starts (`docs/specs/qa-playtest-process.md`).

## Destination
An approachable blackjack training game with accurate shoe simulation, Free Play, Basic Strategy mastery, card counting practice, and later casino-like cognitive load.

The product is a training app with gameplay, not a gambling app or an academic simulator.
Free Play deals from the real shoe; learning layers can add hints, feedback, and reports
around the hand, but they should not rig card flow for lessons.

## V1 — Simulation Foundations
- [x] Free Play skeleton — exit criteria MET (2026-07-09): one player plays complete rounds vs a dealer from a seeded 6-deck shoe with cut card / penetration, legal actions, outcomes, logs, and shoe continuity (auto-reshuffle). Playable in-browser via WASM with JSONL history + per-hand notes. (Open: verify the split-legality question surfaced in playtest.)
- [ ] V1 milestone QA — exit criteria: full milestone QA pack run against the browser build (rules & payout fidelity, state/round flow, player experience, edge/breaker, product review); all blocker findings fixed and verified; product verdict and coverage recorded in `journal/qa/ledger.md`. This gates the move to V2.

Scope:
- Web app foundation with mobile-responsive thinking.
- One active player vs dealer in the UI; engine stays table-shaped for more seats later.
- Real shoe creation from multiple decks, stable card/deck IDs, seeded shuffle, cut card / penetration, and round/session logs.
- A configured modern-classic casino ruleset; no rules scattered through UI code.
- Hit/stand first, then double/split/surrender only where the locked V1 ruleset requires them.

Non-goals:
- Full learning path, card counting lessons, simulated players, leaderboards, daily challenges, polished casino visuals, real-money/chips-first gameplay, and CSM/ASM simulation.

## V2 — Learning Foundations
- [ ] Basic Strategy path — exit criteria: assisted drills, mastery tracking, hints, and feedback sit on top of the real simulation.

Learning starts with Basic Strategy execution:
- use the table correctly;
- play without the table and without time pressure;
- play without the table at realistic pace.

Drills should be rule-based scenario generation, not fixed scripted hands. Teach hard
hands, soft hands, pairs, double, surrender, and dealer-upcard logic in chunks, then mix
them according to mastery.

## V3 — UX and Game Experience
- [ ] Training game polish — exit criteria: mobile-friendly table UI, onboarding, progression, and session feedback feel like a game rather than a simulator.

Likely scope:
- Better table UI, onboarding, progression, rank/mastery presentation, game-feel polish, and clearer Free Play hints/reports.

## Later
Add topics incrementally:

- Running count mastery.
- True count.
- Multi-seat tables.
- Simulated players.
- Casino pace.
- Bet sizing / unit sizing.
- Count deviations.
- Advanced counting systems.
- Table rules variations.
- CSM/ASM and machine-buffer table variants.
- Leaderboards.
- Daily challenges.
- Shared daily shoe / daily drill.

Each major topic should get its own research, spec, and implementation plan when it becomes active.
