# V1 Simulation Foundations — Design Spec

> Status: design. Scope: the first technical foundation for Free Play.

## Problem
Build an initial Free Play experience where one player can play complete blackjack rounds against a dealer using a real shoe, not random card generation.

V1 product goal: the user can play initial Free Play with one player vs dealer, using a
real shoe, seeded shuffle, cut card / penetration, and a modern-classic casino ruleset.

## Decisions
- Model cards, decks, shoes, shuffled order, dealt cards, burns, discard, cut card / penetration, and round logs explicitly.
- Start with one human seat in the UI, but keep the engine table-shaped so more seats can be added later.
- Use a ruleset object/config; do not scatter blackjack rules through the codebase.
- Use seeded Fisher-Yates for V1 replay/debug; defer physical shuffle and machine models.
- Free Play must not manipulate cards for lessons; cards come from the actual ordered shoe.

## Locked V1 Ruleset
V1 uses one explicit ruleset so the simulator, Basic Strategy source, and logs agree.

```yaml
id: v1-modern-classic-h17-6d
table_type: shoe_game
decks: 6
shuffle: seeded_fisher_yates
penetration:
  default_percent: 75
  configurable: true
csm: false
asm: false
dealer_peek: true
blackjack_payout: "3:2"
dealer_soft_17: hit
double_rules:
  allowed_totals: any_first_two_cards
  after_split: true
split_rules:
  max_hands: 4
  resplit_non_aces: true
  resplit_aces: false
  split_aces_receive_one_card: true
surrender: false
insurance:
  offered_when_dealer_ace: true
  default_training_advice: decline
```

Decision rationale:
- Six-deck H17 DAS no-surrender peek has a directly generated Basic Strategy table in BlackjackInfo.
- H17 is a common training baseline for modern casino play; Blackjack Apprenticeship explicitly says its chart is based on the more common H17 game.
- 3:2 blackjack stays the serious training default; 6:5 is intentionally excluded unless a future table-selection lesson teaches bad games.
- Late surrender stays out of V1 because the selected Basic Strategy source is no-surrender and V1 should not add a second chart before the core simulator works.
- Insurance is represented as an available table event but the V1 default advice is to decline; it is not part of the first Basic Strategy engine beyond logging the offer/decline path.
- Default penetration is 75%, with the value configurable for later training and simulation comparisons.

Research anchors:
- Wizard of Odds — rule variations and expected-return effects: https://wizardofodds.com/games/blackjack/rule-variations/
- BlackjackInfo — generated Basic Strategy for 6 decks, H17, DAS, no surrender, peek: https://www.blackjackinfo.com/blackjack-basic-strategy-engine/
- Blackjack Apprenticeship — H17 chart philosophy, order of operations, and training framing: https://www.blackjackapprenticeship.com/blackjack-strategy-charts/
- Blackjack Apprenticeship — deck penetration framing: https://www.blackjackapprenticeship.com/how-much-does-penetration-really-matter/
- Wizard of Odds — CSM/cut-card distinction: https://wizardofodds.com/games/blackjack/cut-card-effect/

Basic Strategy source for V1: BlackjackInfo, generated with 6 decks, H17, DAS,
No Surrender, Peek. Blackjack Apprenticeship remains the teaching/order-of-operations
reference, not the machine-readable source.

Decision order for a Basic Strategy engine should be explicit where relevant:
surrender, split, double, then hit/stand.

## Card Model
Each deck gets a stable ID inside the shoe. Each card should be traceable enough to
answer where it came from and when it was dealt.

```ts
type Card = {
  cardId: string;
  deckId: string;
  rank: 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';
  suit: 'clubs' | 'diamonds' | 'hearts' | 'spades';
};
```

The shuffled shoe is an ordered sequence. Dealing consumes from that sequence; no
random card generation at deal time.

## Shuffle
V1 uses seeded Fisher-Yates:

- keep the seed for replay/debug;
- shuffle once into an ordered shoe sequence;
- hide shuffle behind a strategy/interface so future physical/casino shuffle models can be added.

Suggested concept:

```ts
interface ShuffleStrategy {
  shuffle(cards: Card[], seed: string, config?: unknown): ShuffledShoe;
}
```

Future strategies may include riffle/strip/cut simulation or machine-style variants, but
do not implement those in the first milestone.

## Cut Card / Penetration
V1 includes cut card / penetration.

Required behavior:

- create shoe;
- shuffle shoe;
- place penetration threshold or cut-card index;
- deal hands until threshold reached;
- finish current round if required;
- reshuffle / create new shoe for next round.

Penetration percentage should be configurable.

## Table Shape
V1 UI has one active human seat and no simulated players, but the engine should carry
table state as a table, not as a single-hand shortcut.

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

## Round Flow
V1 should support a clean, logged round flow:

1. Start round.
2. Apply burn behavior if the ruleset/table mode uses it.
3. Deal initial cards in correct order.
4. Check blackjack conditions.
5. Run player turns with legal actions from the ruleset.
6. Run dealer turn.
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

The ruleset determines which actions are legal at any given moment.

## Log Shape
Round/session logs should include seed, ruleset ID/config, deck count, penetration,
shoe number, dealt card IDs in order, player actions, dealer actions, final hands,
outcome, discard movement, and whether the cut card was reached.

## Future Machine Variants
Do not implement CSM/ASM in V1. Avoid a lifecycle model that assumes all discarded
cards are always out until reshuffle or instantly available again.

Future zones may include:

```text
undealt_shoe
in_play
burned
discard_tray
shuffle_machine_buffer
removed_until_reshuffle
```

## Acceptance Criteria
<!-- wl:criteria -->
- **Earth** — Shoe/card identity is stable and replayable: every dealt card has a deck/card origin and comes from the shuffled shoe order.
- **Water** — Round logs include enough seed, ruleset, action, card, and outcome data to reproduce or debug a hand.
- **Fire** — V1 ships Free Play foundations, not a dry simulator or a polished learning path.
- **Air** — Advanced shuffle models, CSM/ASM, multi-seat UI, and learning systems stay out of V1 unless the active plan explicitly pulls them in.
<!-- /wl:criteria -->

## First Build Milestone
- Create a 6-deck shoe.
- Shuffle with a seed.
- Place cut card / penetration threshold.
- Play one complete round, player vs dealer.
- Support legal hit/stand at minimum.
- Dealer completes hand according to rules.
- Resolve result.
- Log every card and action.
- Allow starting the next round from the same shoe until penetration threshold.

## Open Questions
- What exact card lifecycle model best leaves room for future CSM/ASM variants?
- How should the BlackjackInfo chart be encoded into the first machine-readable Basic Strategy table?
