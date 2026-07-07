# V1 Simulation Foundations — Draft Spec

> Status: draft. Scope: the first technical foundation for Free Play. This should guide Codex without locking every implementation detail.

## V1 product goal

Build an initial Free Play experience: one player can play real blackjack hands against a dealer using a real shoe and a modern-classic casino ruleset.

## Core technical principle

Do not build a random-card blackjack toy.

The engine must model blackjack through explicit card state:

- decks;
- shoe;
- shuffled order;
- dealt cards;
- burn cards;
- discard;
- cut card / penetration;
- round logs.

## Suggested default V1 ruleset

Temporary default until research is completed:

```yaml
table_type: shoe_game
decks: 6
shuffle: seeded_fisher_yates
penetration: configurable
csm: false
asm: false
blackjack_payout: research_tbd
dealer_soft_17: research_tbd # likely H17 for modern low/mid-stakes casino realism, verify
double_rules: research_tbd
split_rules: research_tbd
surrender: research_tbd
insurance: probably supported eventually, but not central to V1 training
```

The product can expose one default ruleset in V1, but the engine should still use an internal ruleset object/config. Do not hardcode rules all over the codebase.

## Shoe and card identity

Each deck gets a stable ID inside the shoe.

Each card should be traceable:

```ts
type Card = {
  cardId: string;
  deckId: string;
  rank: 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';
  suit: 'clubs' | 'diamonds' | 'hearts' | 'spades';
};
```

The shoe should be an ordered sequence after shuffle. Deal from the sequence. Do not randomly generate a card at deal time.

## Shuffle

V1 recommendation:

- use seeded Fisher-Yates;
- keep seed for replay/debug;
- hide shuffle behind a strategy/interface so future physical/casino shuffle models can be added.

Suggested concept:

```ts
interface ShuffleStrategy {
  shuffle(cards: Card[], seed: string, config?: unknown): ShuffledShoe;
}
```

Future strategies may include riffle/strip/cut simulation or machine-style variants, but do not implement those in first milestone.

## Cut card / penetration

V1 should include cut card / penetration.

Required behavior:

- create shoe;
- shuffle shoe;
- place penetration threshold or cut-card index;
- deal hands until threshold reached;
- finish current round if required;
- reshuffle / create new shoe for next round.

Penetration percentage should be configurable.

## Table structure

Even though V1 UI starts with one player vs dealer, the engine should not assume only one seat.

Suggested model:

```ts
type TableState = {
  ruleset: Ruleset;
  shoe: ShoeState;
  dealer: DealerState;
  seats: SeatState[];
  round: RoundState | null;
};
```

In V1:

```ts
activeHumanSeats = 1;
simulatedPlayers = 0;
```

Future:

- more seats;
- simulated players;
- table difficulty;
- multi-hand count load.

## Round flow

V1 should support a clean, logged round flow:

1. Start round.
2. Optional burn behavior according to ruleset/table mode.
3. Deal initial cards in correct order.
4. Check blackjack conditions.
5. Player turn.
6. Dealer turn.
7. Resolve outcomes.
8. Move cards to discard.
9. Append full round log.
10. Check cut card / penetration.

## Actions

V1 minimum:

- hit;
- stand.

V1 likely required soon:

- double;
- split;
- surrender if selected ruleset includes it.

The ruleset should determine which actions are legal at any given moment.

## Logging and replay

The engine should produce a round/session log useful for debugging and later learning analytics.

Log should include:

- seed;
- ruleset ID/config;
- deck count;
- penetration;
- shuffled shoe ID / shoe number;
- card IDs dealt and order;
- player actions;
- dealer actions;
- final hands;
- outcome;
- cards moved to discard;
- cut card reached or not.

## Future-proofing for machine variants

Do not implement CSM/ASM in V1, but avoid a design that makes them impossible.

Future card lifecycle may require zones such as:

```text
undealt_shoe
in_play
burned
discard_tray
shuffle_machine_buffer
removed_until_reshuffle
```

V1 can use a simpler lifecycle, but code should avoid assumptions that every discarded card is either permanently out until reshuffle or instantly available again.

## First build milestone candidate

Free Play Skeleton:

- create a 6-deck shoe;
- shuffle with seed;
- place cut card / penetration threshold;
- play one complete round player vs dealer;
- support legal hit/stand at minimum;
- dealer completes hand according to rules;
- resolve result;
- log every card and action;
- allow starting next round from same shoe until penetration threshold.
