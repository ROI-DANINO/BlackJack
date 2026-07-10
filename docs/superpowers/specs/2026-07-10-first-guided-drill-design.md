# V2 First Guided Drill — Get to Know Blackjack

## Status

Approved design decision. This defines one focused foundations lesson; it is not an implementation
plan, a Basic Strategy lesson, or a general curriculum system.

## Outcome

Give a new player a short, enjoyable introduction to blackjack's vocabulary, hand flow, and
stakes before teaching the Basic Strategy table. The lesson makes clear what totals, blackjack,
win/loss/push, Hit, Stand, Double, and Split mean through real resolved hands.

It does not claim to teach how to choose the best strategy action. The existing Rust-owned
strategy oracle remains reserved for the later Strategy Table Fundamentals lesson, where the
learner has been taught the decision tool it implements.

## Unit Definition

Keep unit definitions small and explicit. This first unit declares its title, concise learning
goal, staged warm-up scenarios, its live-practice decision range (normally five to ten decisions),
and the prompt and outcome-feedback copy for each scenario. Warm-up count is set by the lesson,
not by a generic curriculum rule.

Run state and the recap are in memory only. Do not add saved progress, scores, ranks, unlocks, or
mastery thresholds.

## Two-Phase Session

### Interactive warm-ups

Warm-ups are short staged demonstrations: first tell the learner what an action or outcome means,
then ask them to make the demonstrated legal action and resolve the real hand. They are not
passive slides and they are not strategy questions graded right or wrong.

The first unit includes the warm-ups needed to explain:

1. Hand totals, an ordinary 21, and an initial two-card natural blackjack.
2. Hit and Stand, including that a bust and a dealer comparison are different ways a hand can end.
3. Win, loss, and push: the dealer's final hand and the wager determine the result.
4. Double: the wager doubles, exactly one card follows, and the hand then stands.
5. Split: a pair becomes two independently played and settled hands.

Choose staged results to include wins, losses, pushes, and at least one result that separates a
strong-looking total from a winning outcome. This teaches the stakes without implying that one
hand establishes a strategy rule.

Each scenario uses an explicitly arranged **ordered lesson shoe**: the exact card sequence the
scenario needs, supplied in dealing order and consumed strictly in order by the engine. Cards are
marked as lesson-origin (`deck_id: "lesson"`, traceable `card_id`s) so their provenance is
auditable and never presented as a random casino deal. The shoe is arranged once — not shuffled —
through a dedicated engine command; the existing simulator remains the authority for legal
actions, card draws, dealer play, and settlement. The author supplies enough trailing cards to
cover every dealer draw the scripted line can reach. Deck count is not fixed for a lesson shoe: it
carries only the cards the scenario scripts.

### Live practice

After the warm-ups, the UI explicitly says live practice is beginning (for example, “Now let's
play a real shoe”). It starts a fresh normally shuffled six-deck shoe and uses its ordered card
flow for the unit's remaining five to ten decisions. The learner plays every action that is legal
in the current hand; feedback reinforces the relevant vocabulary and outcome rather than grading
the decision. The five-to-ten range is a maximum, not a quota: an explicit “Got it” control lets
the learner end live practice at any time and jump straight to the recap.

The oracle stays out of this first unit entirely — no recommendation, even quietly, during live
practice. Oracle-assisted live practice belongs to the later Strategy Table Fundamentals unit,
where the learner has been taught the decision tool the oracle implements.

## Feedback and Tone

Feedback is concise, upbeat, and factual:

- Define the action before it is demonstrated, then narrate its immediate consequence.
- After settlement, name the result and the stake change in plain language.
- Distinguish a natural blackjack from later reaching 21, and a push from a win or loss.
- For Double and Split, make the extra wager and independently settled hands visible.
- Acknowledge that a single result is only one hand; do not present it as proof of a better
  strategy choice.

The first version contains no strategy recommendation, table, right/wrong decision assessment,
exact percentages, charts, or expected-value claims. Exact probability teaching requires a
dedicated research and design cycle.

## Architecture and Recorded State

The Rust engine owns rules, ordered card flow, legal actions, dealer play, and outcomes. The
browser UI orchestrates lesson presentation and records what was shown; it never embeds blackjack
rules or manufactures an outcome.

For every demonstrated or live decision, retain in-memory run data sufficient for the recap and
QA:

- phase (`warm_up` or `live`), lesson topic, visible player/dealer context, and legal actions;
- selected action and whether it was a guided demonstration or live-practice choice;
- final outcome, wager change, and feedback message shown;
- traceable shoe/card provenance for staged scenarios and the shuffled shoe identity for live
  practice.

## Safeguards

- Render only legal actions and prevent duplicate submission while a hand is resolving.
- If a round has no player decision, such as an initial natural blackjack, explain the outcome and
  continue without inventing an action.
- A scenario-initialization failure must offer a recoverable retry. It must never silently replace
  cards or a scenario.

## Verification and Feature QA

- Unit-test staged and live shoe provenance, legal-action filtering, the natural-blackjack versus
  later-21 distinction, Double's stake/one-card behavior, Split's two-hand settlement, and
  win/loss/push feedback.
- Test the explicit transition to the fresh live shoe, the in-memory recap, duplicate-submit
  protection, and recoverable scenario failures.
- Extend relevant browser QA coverage for the new lesson states. Do not weaken proven Free Play
  rule, flow, history, or robustness checks.
- Before feature QA, follow the ledger-driven scoping process in
  `docs/specs/qa-playtest-process.md`: read `journal/qa/ledger.md`, deep-test changed drill
  surfaces, smoke-test proven areas, and record the run and findings in the ledger.
- Because this changes `web/src/app/`, scoped feature QA includes the Player Experience judgment
  pass in addition to the deterministic checks.

## Non-goals

- Showing or teaching the Basic Strategy table, or grading a strategy choice.
- Oracle-driven hints, delayed-feedback assessment, score-based feedback, mastery thresholds, or
  persistence.
- AI-generated coaching, exact probability lessons, card counting, or general curriculum
  infrastructure.
- Altering Free Play's normal shoe flow; it remains a future checkpoint/practice surface.
