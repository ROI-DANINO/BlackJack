# V1 Simulation Foundations — Implementation Plan

> Plan for the active V1 spec. Keep this current while V1 is active; future phases stay in ROADMAP.md.

## Goal
Ship the Free Play skeleton: one human player vs dealer, complete rounds, real seeded shoe,
cut card / penetration, legal actions, outcomes, and replayable logs.

## Sequence
1. Lock the V1 default ruleset and matching Basic Strategy source.
2. Build the core model: card, deck, shoe, ruleset, table, seat, dealer, round.
3. Add seeded Fisher-Yates shuffle and shoe penetration handling.
4. Implement initial deal, player hit/stand, dealer play, outcome resolution, discard, and next round.
5. Add round/session logs with seed, ruleset, shoe, card IDs, actions, outcomes, and penetration state.
6. Put a simple Free Play UI on top of the engine.

## V1 Guardrails
- Deal only from the ordered shoe.
- Keep card and deck origins traceable.
- Keep rules in the ruleset object, not scattered through UI code.
- Skip CSM/ASM, simulated players, learning paths, and casino polish.

## First Check
Add one runnable engine check that creates a seeded 6-deck shoe, plays at least one complete
round, verifies cards are unique by origin, and confirms the log can identify every dealt card.
