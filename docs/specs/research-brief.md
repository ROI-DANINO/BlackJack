# Research Brief — Blackjack Training Game

> Status: active research context. Verify details during the relevant spec before locking behavior.

## Why Research Is Needed
Do not rely only on model memory for blackjack rules, tables, or casino machine behavior.

The project should begin with a small number of foundational research checks, then do
additional research per feature.

## Initial Research Findings
### Basic Strategy Depends On Ruleset
Basic Strategy is not one universal table. It changes according to deck count, H17/S17,
double rules, surrender, DAS, and other table rules.

Research anchors:

- Wizard of Odds — rule variations and expected return effects.
- Blackjack Apprenticeship — strategy charts and learning order.
- BlackjackInfo — basic strategy engine for generating charts by ruleset.

### Modern Casino Default Hypothesis
V1 locks a 6-deck shoe game with H17, DAS, no surrender, dealer peek, 3:2 blackjack,
and 75% default penetration.

Avoid 6:5 payout as a serious training default unless intentionally teaching bad tables or
table selection.

### CSM vs ASM vs Shoe Matters
A shoe game supports classic counting because dealt cards remain out until the next shuffle.

A Continuous Shuffling Machine can return used cards to the mix repeatedly, which greatly
reduces or destroys classic card-counting value.

An Automatic Shuffling Machine can simply shuffle a separate shoe/deck set while another is
in play. This is different from a CSM.

The engine should not assume only two simplistic states: normal shoe or instant full CSM.
Future table modes may require buffer or delayed-return card lifecycle modeling.

## Research Tasks Before Locking V1 Ruleset
1. Done: find a credible default "modern classic casino blackjack" ruleset for V1:
   - decks;
   - H17 or S17;
   - blackjack payout;
   - DAS;
   - resplit rules;
   - surrender;
   - penetration range.

2. Done: select the matching Basic Strategy source:
   - source must match V1 ruleset;
   - encode decisions into machine-readable format;
   - include order of operations: surrender -> split -> double -> hit/stand where relevant.

3. Still later: clarify casino machine types:
   - shoe game;
   - ASM;
   - CSM;
   - delayed return / buffer behavior if credible information exists.

## Source Anchors
- Wizard of Odds — Blackjack Rule Variations: https://wizardofodds.com/games/blackjack/rule-variations/
- Blackjack Apprenticeship — Strategy Charts: https://www.blackjackapprenticeship.com/blackjack-strategy-charts/
- BlackjackInfo — Basic Strategy Engine: https://www.blackjackinfo.com/blackjack-basic-strategy-engine/
- Blackjack Apprenticeship — Continuous Shuffle Machines: https://www.blackjackapprenticeship.com/continuous-shuffle-machines/
- Diaconis, Fulman, Holmes — Analysis of casino shelf shuffling machines: https://arxiv.org/abs/1107.2961

## Open Questions
- How should the BlackjackInfo chart be encoded into the first machine-readable Basic Strategy table?
- What exact card lifecycle model will support future CSM/ASM variants cleanly?
