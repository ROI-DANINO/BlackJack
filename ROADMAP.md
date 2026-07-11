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
- [x] Free Play skeleton — exit criteria MET (2026-07-09): one player plays complete rounds vs a dealer from a seeded 6-deck shoe with cut card / penetration, legal actions, outcomes, logs, and shoe continuity (auto-reshuffle). Playable in-browser via WASM with JSONL history + per-hand notes.
- [x] V1 milestone QA — exit criteria MET (2026-07-10): full milestone QA plus targeted remediation re-test; all six V1-gating findings verified and product verdict is GO for V2 in `journal/qa/ledger.md`.

Scope:
- Web app foundation with mobile-responsive thinking.
- One active player vs dealer in the UI; engine stays table-shaped for more seats later.
- Real shoe creation from multiple decks, stable card/deck IDs, seeded shuffle, cut card / penetration, and round/session logs.
- A configured modern-classic casino ruleset; no rules scattered through UI code.
- Hit/stand first, then double/split/surrender only where the locked V1 ruleset requires them.

Non-goals:
- Full learning path, card counting lessons, simulated players, leaderboards, daily challenges, polished casino visuals, real-money/chips-first gameplay, and CSM/ASM simulation.

## V2 — Learning Foundations
- [ ] Learning foundations — exit criteria: a new player can learn the current table's legal
  actions, navigate the matching Basic Strategy table, and use it in guided practice with
  immediate or delayed feedback that keeps decision quality separate from hand outcome.

V2 ships two ordered, replayable subjects:
- **Blackjack Foundations** — teaches hit/stand first, then double and split, using short
  guided simulations with concise explanations.
- **Strategy Table Fundamentals** — teaches hand classification and table navigation, then
  table-open guided practice and checkpoints. The table remains user-toggleable; no-table
  testing and realistic pace are later mastery work.

Build the learning loop in this order: verify and encode one ruleset-matched strategy source;
ship one guided drill loop; add brief feedback and targeted repetition; add persisted progress
and checkpoints only when that progression needs them; then expand strategy content gradually.
Free Play remains an honest ordered shoe. Its table can appear early, but active coaching and
session reviews come after the teaching loop is proven. Drills may target decisions, but must
run them through the same hand/rules machinery rather than use fixed scripted outcomes.

Non-goals: full Basic Strategy memorization, no-table/timed assessments, card counting,
accounts/backend, rank/XP systems, and generic course-platform abstractions. Each V2 feature
gets its own research or design cycle when it becomes active.

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
- Table-rule literacy and ruleset-matched strategy deltas.
- CSM/ASM and machine-buffer table variants.
- Leaderboards.
- Daily challenges.
- Shared daily shoe / daily drill.

Each major topic should get its own research, spec, and implementation plan when it becomes active.
