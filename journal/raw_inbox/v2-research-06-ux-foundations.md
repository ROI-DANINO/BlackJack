# V2 Research 06 — UX Foundations

> Prepare UI contracts and user journeys now; defer visual polish and game-feel work.

## Primary UX objective

A beginner should always be able to answer:

1. What am I trying to learn?
2. What table rules are active?
3. What decision is available now?
4. Was my decision correct, independent of the result?
5. Why?
6. What should I practice next?

## Core journeys

### First session

- concise product framing: training, not gambling advice
- choose “learn from the beginning” or “practice strategy”
- introduce the active training table through a compact rule card
- first decision within a short time
- explicit decision/outcome separation after the first variance example

### Guided drill

- objective and progress are visible but secondary
- cards and legal actions dominate
- chart can be opened without leaving the hand
- feedback explains one thing at a time
- continue flow preserves the engine's actual hand evolution

### Transfer practice

- reduced coaching
- optional table/rules reminder
- delayed review
- replay of key decision states
- grouped weaknesses, not a wall of logs

### Ruleset comparison

- baseline and changed table shown side by side
- highlight only changed rules
- show strategy deltas rather than two giant charts first
- practice changed cells, then mixed-table recognition

## Required UI states

- loading/initializing WASM
- bridge unavailable or version mismatch
- lesson intro
- awaiting decision
- action processing
- immediate feedback
- delayed-feedback continuation
- hand resolved
- session recap
- unsupported strategy profile
- invalid/incompatible content
- local history/export success/failure

These states should be explicit in the learning controller rather than inferred from scattered component booleans.

## Ruleset presentation

Use a persistent but compact table badge. Expand it into a rule card containing:

- decks
- H17/S17 in plain language
- blackjack payout
- DAS
- surrender
- hole-card/peek protocol when relevant

Do not expose internal ids as primary copy. The rules card should include a “why this matters” layer only when the learner reaches variation literacy.

## Feedback hierarchy

1. **Decision verdict:** correct / not recommended / illegal attempt.
2. **Outcome verdict:** win/loss/push/blackjack, visually separate.
3. **Reason:** one concise sentence.
4. **Ruleset note:** only when the active rule changes the answer.
5. **Explore:** expanded explanation or chart cell.

Avoid green celebration tied primarily to money won. A lucky wrong decision must not receive the same celebration as a correct decision.

## Table/chart UX

- chart must clearly distinguish hard, soft, and pairs
- current row/column can be highlighted
- notation fallbacks must be explained in context
- allow chart-open practice without shame; track assistance transparently
- gradually fade assistance instead of abruptly removing it
- chart view should retain the active ruleset label

## Accessibility foundations

- keyboard-operable actions and predictable focus
- screen-reader card names and hand totals
- never rely on suit color or feedback color alone
- reduced-motion mode
- adequate touch targets and mobile portrait layout
- feedback remains available until dismissed/continued
- logical RTL support for Hebrew without reversing card/order semantics incorrectly

## Responsive architecture

Design component responsibilities before styling:

- `TableSurface`
- `HandView`
- `ActionBar`
- `RuleBadge/RuleCard`
- `StrategyReference`
- `DecisionFeedback`
- `SessionReview`

Components render view models; they do not evaluate strategy or legality.

## User research plan

Test with 5–8 beginners for the first slice:

- think-aloud classification of hard/soft/pair
- locating a chart cell
- noticing the active rules badge
- interpreting correct-decision/lost-hand feedback
- continuing a multi-step hand
- understanding one H17/S17 comparison

Measure comprehension and error types, not visual preference alone.

## Responsible design

- keep bankroll and learning score visually distinct
- no loss-chasing messages
- no claims of guaranteed profit
- no streak based on winning hands
- avoid casino dark patterns and artificial urgency
- allow session stop points without punishment

## Deferred visual work

- final brand system
- casino ambience and advanced animation
- chips/economy polish
- rank/league surfaces
- social comparison
