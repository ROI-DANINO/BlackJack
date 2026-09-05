# Playful Learning Direction

> Status: owner-approved direction from the September 5 conversation; recorded as Product judgement. Activity effectiveness remains untested. This is the current product-design delta, not a claim that the full course has been designed.

## 1. Product and delivery

Teach blackjack and statistical thinking through an attractive, playful learning path connected to an accurate blackjack table. Duolingo and Brilliant are experience references, not evidence that any proposed activity works.

The first experience should make a beginner want to spend about ten minutes playing and learning, gaining an orientation to the rules and basic actions. Ten minutes is a product target, not a mastery threshold or a proven retention result. A-36 records the validation.

Three horizons replace the old delivery ordering:

1. **First experience:** test one activity, then assemble a coherent beginner opening with learning and table play. Include enough visual quality to test the intended experience. The ace prototype alone does not meet this horizon.
2. **Core learning product:** expand blackjack and probability, expected value and variance learning; integrate progression, chip economy and suitable challenges as their consumers are built.
3. **Expansion:** counting, casino-like cognitive load and other advanced material. Existing mobile, accounts and multiplayer aspirations remain future, need-activated capabilities.

Only the current phase gets executable board tasks. Do not pre-author the entire curriculum to start building. Existing engine correctness, storage integrity, accessible feedback and scoped QA obligations survive.

## 2. Learning and motivation

Statistical understanding is an educational goal in its own right. It is not restricted to improving the next blackjack decision. Explicit expected-value instruction is allowed; its exact units and placement are not yet designed. The previous no-maths/no-EV exclusion is superseded.

Activities may introduce, explore, practise or assess a concept inside ordinary lessons. They are not restricted to Challenge warm-ups. Completion, understanding and playing skill are distinct claims; they need not become three visible meters. Completion of a puzzle is not automatically evidence of mastery.

Keep three product experiences distinct:

| Experience | Chips and progression |
|---|---|
| Learning path and learning Practice | No chip cost to learn. Sincere completion earns a base chip reward; performance can add a bonus. Amounts and repeat-reward rules need later calibration, not invented constants here. |
| Free Play | Honest ordered-shoe play with persistent chips that can be won or lost. Chips can run out; learning replenishes them. |
| Practice table | Always available, temporary session chips, honest rules and settlement. No effect on Wallet, XP, Player score, Mastery or Recommender. In-session hints and feedback are allowed. |

The practice table is distinct from existing capital-P learning Practice. Learning rewards must not require winning a random hand. Decision quality and hand outcome remain separate facts. Money does not buy chips.

An end-of-unit challenge should fit the learning outcome: a prediction or explanation can assess a statistical concept; dealt decisions can assess play. The old universal warm-up plus dealt-hands Proving run is a retained candidate for strategy assessment, not a universal course contract.

The chip economy's educational appeal is a hypothesis (A-37). Test interest in the lesson itself separately from willingness to do it to earn table access.

## 3. First build candidate: Build the Hand

Product judgement: start with a small ace-value activity prototype. This tests an interaction, not the ten-minute experience or the whole progression system. No wallet, rating, mastery reducer, accounts or recommender integration is required for this isolated prototype. Their engineering obligations return when those components are implemented.

Learning outcome: identify when an ace contributes 11 or 1 in a hand. The first prototype covers one ace; multiple aces and unavoidable busts remain content needed before claiming full coverage.

| Moment | Player action | Feedback |
|---|---|---|
| Reach 18 | With an ace fixed, choose one of 5, 7, 9 | Show the resulting total; 7 produces 11 + 7 = 18. Other choices remain retryable. |
| Reach 18 another way | With an ace fixed, choose exactly two of 4, 8, 9 | 9 and 8 produce 1 + 9 + 8 = 18. Show the ace changing value when the hand requires it. Selection order must not change the result. |
| Transfer to a dealt hand | Identify the total of ace, 6, 8 without a live calculation | Total 15; reveal the calculation after the response. This is a new item, not proof of durable learning. |

Card selection is a puzzle action, not a blackjack action. At the table cards are dealt and ace totals are automatic. Totals remain engine-owned: inspect the existing API before implementation and expose a narrow engine calculation only if needed; do not duplicate blackjack rules in React.

Show feedback through text and arithmetic as well as animation/color. Permit revising choices. Do not use a timer or an invented pass percentage as a prototype success criterion.

Observe a beginner without directing each click: can they understand the task, explain the ace change, answer a new hand, and do they want another activity? Record confusion, guessing, voluntary continuation and answers separately. An agent can check rules and usability faults; human enjoyment needs human observation. A-38 owns this untested candidate.

## 4. Supersession map

This document replaces only the named decisions below. Historical approvals and research remain records; they are not silently revalidated or erased. Other engineering and evidence constraints retain their scope.

| Previous surface | Replacement |
|---|---|
| Product vision execution-first/casino-training destination | Sections 1–2: beginner-friendly blackjack and statistical learning; counting is expansion. |
| LDB-01 §5 and skill-graph JSON no-maths/no-EV exclusion | Section 2. JSON remains a previous-design snapshot, not the complete new curriculum or next-build input. |
| LDB-03/LDB-09 taxonomy and JSON as exhaustive product formats | Section 2 permits discovery activities in lessons; keep the old mappings as assessment-design candidates. No new complete taxonomy is claimed. |
| LDB-06 session shapes, LDB-11 universal Challenge proof and blueprint §13 warm-up-only restriction | Section 2: flexible teaching activities and outcome-matched assessment. Old strategy session shapes remain candidates. |
| LDB-05 economy and LDB-07 navigation | Section 2 adds isolated Practice table and establishes base completion reward plus performance bonus. Detailed tuning and a final navigation design are not claimed. |
| Blueprint §7 phase-5 bundle, §14 mandatory eight-Unit replacement, §12 first-task window tests | Section 1 delivery order and section 3 prototype. Retain the nine shipped units as reusable material. Window tests remain owed before implementing that window; they do not precede an isolated interaction prototype. |
| July 23 graded-decision-practice build plan | Retained component proposal, not the next executable plan. Re-scope it if selected later. |
| Existing P-1/P-3/P-5 instrumentation as the next-build exit | Section 3 formative playtest, followed by a whole-opening evaluation. Retained research questions do not require building the old bundle first. |

## 5. Stop condition for this documentation pass

The current reading path must identify the direction, what exists, the next build candidate, the superseded scope, and untested assumptions. Active board and milestone pointers must agree. Older design JSON must identify its snapshot status. Do not add a new research program, delete source archives or claim to have redesigned all units.

Next: implement and test the bounded prototype using a scoped implementation plan after inspecting the engine/UI seam. Building the full course, persistence/economy integration and shipping the prototype are not part of this documentation pass.
