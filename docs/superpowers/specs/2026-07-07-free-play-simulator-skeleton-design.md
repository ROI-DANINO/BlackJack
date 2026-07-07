# Free Play Simulator Skeleton Design

Date: 2026-07-07
Status: approved for planning

## Goal

Build the V1 Free Play skeleton around a simulator-first blackjack engine. The UI is only a
thin way to drive the engine; the engine must be usable and testable without the UI.

## Scope

V1 includes one human player against the dealer, a real seeded 6-deck shoe, penetration,
complete round flow, legal actions, betting, bankroll settlement, and replayable logs.

V1 skips lessons, Basic Strategy advice, multi-seat play, surrender, insurance decisions,
side bets, table polish, and replay UI.

## Architecture

- `cards/shoe`: card IDs, deck IDs, seeded Fisher-Yates shuffle, cursor, discard, and
  penetration state.
- `ruleset`: one source for legal actions, payout rules, split/double rules, dealer peek,
  and dealer soft-17 behavior.
- `round`: initial deal, player hand turns, split/double flow, dealer turn, hand resolution,
  discard movement, and round completion.
- `session`: seed, ruleset, shoe, bankroll, current bet defaults, current round, and logs.
- `log`: session/round events with enough card, action, bet, outcome, and bankroll detail
  to debug or replay a hand.
- `ui`: render engine state and dispatch legal actions; no rules live in UI code.

## Ruleset Options

The default V1 ruleset remains `v1-modern-classic-h17-6d`: 6 decks, dealer hits soft 17,
dealer peek, blackjack pays 3:2, double on any first two cards, double after split, split to
4 hands, resplit non-aces, no resplit aces, split aces receive one card, no surrender, and
75% default penetration.

The engine must also support dealer standing on soft 17 through a ruleset field such as
`dealerSoft17: "hit" | "stand"`. H17 stays the default; S17 is a supported option.

Insurance is represented as an offer event when the dealer shows an ace, but V1 auto-declines
it and logs that decision.

## Betting

At session start, the user chooses a starting bankroll and default chip size. Before each
round, the user places an initial bet.

Resolution rules:

- Losing hand subtracts the hand wager.
- Push returns the wager with no bankroll delta.
- Normal win pays 1:1.
- Natural blackjack pays 3:2.
- Split creates a second hand with a matching wager.
- Double adds one initial-bet unit to that hand and then receives one card.

Logs include bankroll before and after each round, wager per hand, payout reason, and final
round delta.

## Flow

1. Start a session with seed, ruleset, bankroll, and default bet.
2. Create and shuffle one 6-deck shoe; set the penetration threshold.
3. Start a round only when the bankroll can cover the initial bet.
4. Deal from the ordered shoe only.
5. If dealer shows an ace, log an insurance offer and V1 auto-decline.
6. Ask the ruleset for legal actions.
7. Apply player actions: `hit`, `stand`, `double`, and `split`.
8. Run dealer play using the ruleset's soft-17 behavior.
9. Resolve every hand, update bankroll, discard cards, append logs, and check penetration.

## Errors

The engine returns explicit errors for invalid actions, insufficient bankroll, acting
after a round is complete, and attempting to start a round when the shoe must reshuffle.

## First Check

Add one runnable engine check that starts a seeded session, plays at least one complete round,
verifies every dealt card has a unique deck/card origin from the shoe, confirms the log names
every dealt card, and checks that the bankroll delta matches the resolved outcomes.
