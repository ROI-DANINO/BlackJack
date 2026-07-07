# V1 Simulation Foundations — Implementation Plan

> Plan for the active V1 spec. Keep this current while V1 is active; future phases stay in ROADMAP.md.

## Goal
Ship the Free Play skeleton: one human player vs dealer, complete rounds, real seeded shoe,
cut card / penetration, legal actions, outcomes, and replayable logs.

## Sequence
1. Done: lock the V1 default ruleset and matching Basic Strategy source.
2. Build the core model: card, deck, shoe, ruleset, table, seat, dealer, round.
3. Add seeded Fisher-Yates shuffle and shoe penetration handling.
4. Implement initial deal, player hit/stand, dealer play, outcome resolution, discard, and next round.
5. Add round/session logs with seed, ruleset, shoe, card IDs, actions, outcomes, and penetration state.
6. Put a simple Free Play UI on top of the engine.

## Locked Ruleset Summary
- 6-deck shoe game.
- Dealer hits soft 17.
- Dealer peeks for blackjack.
- Blackjack pays 3:2.
- Double on any first two cards.
- Double after split allowed.
- Split to 4 hands; resplit non-aces; no resplit aces; split aces receive one card.
- No surrender.
- Insurance offered on dealer ace, default training advice is decline.
- Default penetration is 75%, configurable.

## Engine Shape
- Card/deck identity: stable `cardId` and `deckId`.
- Shoe state: ordered shuffled sequence, current cursor, cut-card/penetration state, discard.
- Table state: ruleset, shoe, dealer, seats, current round.
- Ruleset: central source for legal actions, dealer behavior, payout, split/double/surrender/insurance availability.
- Log: append round/session events in enough detail to replay or debug a hand.

## Round Flow
1. Start round.
2. Apply burn behavior if the selected table mode uses it.
3. Deal initial cards in correct order.
4. Check natural blackjacks.
5. Run player actions from the legal-action set.
6. Run dealer action from the ruleset.
7. Resolve outcomes.
8. Move cards to discard.
9. Append the round log.
10. Check whether the next round may start or the shoe must reshuffle.

## V1 Guardrails
- Deal only from the ordered shoe.
- Keep card and deck origins traceable.
- Keep rules in the ruleset object, not scattered through UI code.
- Skip CSM/ASM, simulated players, learning paths, and casino polish.

## First Check
Add one runnable engine check that creates a seeded 6-deck shoe, plays at least one complete
round, verifies cards are unique by origin, and confirms the log can identify every dealt card.
