# V1 Simulation Foundations — Design Spec

> Status: design. Scope: the first technical foundation for Free Play.

## Problem
Build an initial Free Play experience where one player can play complete blackjack rounds against a dealer using a real shoe, not random card generation.

## Decisions
- Model cards, decks, shoes, shuffled order, dealt cards, burns, discard, cut card / penetration, and round logs explicitly.
- Start with one human seat in the UI, but keep the engine table-shaped so more seats can be added later.
- Use a ruleset object/config; do not scatter blackjack rules through the codebase.
- Use seeded Fisher-Yates for V1 replay/debug; defer physical shuffle and machine models.

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
