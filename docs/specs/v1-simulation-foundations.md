# V1 Simulation Foundations — Design Spec

> Status: design. Scope: the first technical foundation for Free Play.

## Problem
Build an initial Free Play experience where one player can play complete blackjack rounds against a dealer using a real shoe, not random card generation.

## Decisions
- Model cards, decks, shoes, shuffled order, dealt cards, burns, discard, cut card / penetration, and round logs explicitly.
- Start with one human seat in the UI, but keep the engine table-shaped so more seats can be added later.
- Use a ruleset object/config; do not scatter blackjack rules through the codebase.
- Use seeded Fisher-Yates for V1 replay/debug; defer physical shuffle and machine models.
- Free Play must not manipulate cards for lessons; cards come from the actual ordered shoe.

## V1 Ruleset To Verify
Temporary default until research is completed:

```yaml
table_type: shoe_game
decks: 6
shuffle: seeded_fisher_yates
penetration: configurable
csm: false
asm: false
blackjack_payout: research_tbd
dealer_soft_17: research_tbd
double_rules: research_tbd
split_rules: research_tbd
surrender: research_tbd
insurance: later_or_optional
```

Working research hypothesis: V1 should probably use a 6-deck shoe game with H17, DAS,
no surrender, 3:2 blackjack, no CSM, and configurable penetration. Avoid 6:5 as the
training default unless the feature is explicitly about bad table selection.

Research anchors:
- Wizard of Odds — rule variations and expected-return effects.
- Blackjack Apprenticeship — strategy charts and learning order.
- BlackjackInfo — Basic Strategy engine for matching a chart to the locked ruleset.
- Diaconis/Fulman/Holmes — casino shelf shuffling machine analysis, for later machine realism.

Before locking Basic Strategy, confirm the chart matches deck count, H17/S17,
double rules, DAS, surrender, split/resplit rules, and blackjack payout.

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
- What exact V1 ruleset should be chosen?
- What penetration percentage should V1 use by default?
- Should surrender be included in V1?
- How should insurance be represented?
- What exact card lifecycle model best leaves room for future CSM/ASM variants?
- What source should produce the first machine-readable Basic Strategy table?
