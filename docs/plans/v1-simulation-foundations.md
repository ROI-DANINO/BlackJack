# V1 Simulation Foundations — Implementation Plan

> Plan for the active V1 spec. Keep this current while V1 is active; future phases stay in ROADMAP.md.

## Goal
Ship the Free Play skeleton around a simulator-first engine: one human player vs dealer,
complete rounds, real seeded shoe, cut card / penetration, legal actions, betting/bankroll
settlement, outcomes, and replayable logs.

## Sequence
1. Done: lock the V1 default ruleset and matching Basic Strategy source.
2. Build the core model: card, deck, shoe, ruleset, session, table, seat, dealer, round, hand, bet.
3. Add seeded Fisher-Yates shuffle and shoe penetration handling.
4. Implement initial deal, legal actions, hit, stand, double, split, dealer play, outcome
   resolution, discard, bankroll settlement, and next round.
5. Add round/session logs with seed, ruleset, shoe, card IDs, actions, bets, outcomes,
   bankroll deltas, and penetration state.
6. Put a simple Free Play UI on top of the engine.

## Locked Ruleset Summary
- 6-deck shoe game.
- Dealer hits soft 17.
- Dealer standing on soft 17 is a supported ruleset option; H17 remains the V1 default.
- Dealer peeks for blackjack.
- Blackjack pays 3:2.
- Double on any first two cards.
- Double after split allowed.
- Split to 4 hands; resplit non-aces; no resplit aces; split aces receive one card.
- No surrender.
- Insurance offered on dealer ace, default training advice is decline.
- Default penetration is 75%, configurable.
- Session betting uses a starting bankroll, default chip size, initial round bet, split
  matching wager, double added wager, 1:1 wins, pushes, losses, and 3:2 blackjack payout.

## Engine Shape
- Card/deck identity: stable `cardId` and `deckId`.
- Shoe state: ordered shuffled sequence, current cursor, cut-card/penetration state, discard.
- Table state: ruleset, shoe, dealer, seats, current round.
- Ruleset: central source for legal actions, dealer behavior, payout, split/double/surrender/insurance availability.
- Session/betting state: bankroll, default bet/chip, per-hand wager, and bankroll delta.
- Log: append round/session events in enough detail to replay or debug a hand.

## Round Flow
1. Start round.
2. Apply burn behavior if the selected table mode uses it.
3. Deal initial cards in correct order.
4. Check natural blackjacks.
5. Log and auto-decline insurance if dealer shows an ace.
6. Run player actions from the legal-action set, including hit, stand, double, and split.
7. Run dealer action from the ruleset, using H17 or S17 behavior.
8. Resolve outcomes and settle bankroll per hand.
9. Move cards to discard.
10. Append the round log.
11. Check whether the next round may start or the shoe must reshuffle.

## V1 Guardrails
- Deal only from the ordered shoe.
- Keep card and deck origins traceable.
- Keep rules in the ruleset object, not scattered through UI code.
- Keep betting math in the engine, not scattered through UI code.
- Skip CSM/ASM, simulated players, learning paths, and casino polish.

## First Check
Add one runnable engine check that creates a seeded 6-deck shoe, plays at least one complete
round, verifies cards are unique by origin, confirms the log can identify every dealt card,
and checks that bankroll movement matches the resolved hand outcomes.
