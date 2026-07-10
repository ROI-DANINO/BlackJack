# V2 First Guided Drill

## Status

Approved design decision. This defines one focused, oracle-powered learning loop; it is not an
implementation plan or a general curriculum system.

## Outcome

Give a new blackjack learner a short, enjoyable guided drill that teaches decision quality before
strategy-table use. It covers every legal current action when the scenario allows it, provides
reversible immediate feedback, and makes clear that a correct choice can still lose a hand.

The drill introduces no persistence, scoring threshold, AI coaching, strategy-table UI, generic
course infrastructure, or claimed exact odds.

## Unit Definition

Keep unit definitions small and explicit. Each unit declares:

- its title and concise learning goal;
- the staged warm-up scenarios needed for that lesson (zero or more, never a fixed quota);
- its live-practice decision range, normally from five to ten decisions;
- the prompt and outcome-feedback copy associated with the lesson.

The range and scenarios are chosen for the unit's teaching goal, not selected by a hidden score
or an unvalidated mastery formula. Unit progress and recap data are in memory only.

## Two-Phase Session

### Warm-up examples

Warm-up examples are transparently staged, traceable lesson scenarios. They deliberately include
the situations a lesson needs, including where useful both a correct decision that loses and an
incorrect decision that wins. Their purpose is to establish concepts and make the difference
between decision quality and a single outcome concrete.

Each scenario uses a full, ruleset-compatible six-deck lesson shoe with card origins retained.
Its reproducible shuffle seed and target position are chosen when authoring the scenario; the shoe
is still shuffled once and dealt in order. This is a declared drill setup, not presented as a
random casino deal. The existing simulator remains the authority for legal actions, card draws,
dealer play, and settlement.

### Live practice

After the warm-up, the UI explicitly says that live practice is beginning (for example, “Now
let's play a real shoe”). It starts a fresh normally shuffled six-deck shoe and uses its ordered
card flow for the remaining decisions. Feedback remains available, but cards and results are not
scripted. This phase may end within the unit's declared five-to-ten-decision range.

## Decision Loop

1. Deal a player decision through the simulator and render the player hand, dealer upcard, legal
   actions, and brief prompt. Do not render the strategy table.
2. The learner selects an action. Ask the Rust-owned Basic Strategy oracle to assess it before
   committing it to the hand.
3. For a recommended action, allow the action to proceed and resolve the hand through the normal
   engine flow.
4. For a non-recommended action, show one concise explanation and offer both choices:
   - **Change my action** returns to the current legal actions without changing the hand.
   - **Play my choice anyway** commits the original action, resolves the real hand, and gives the
     after-hand explanation.
5. Finish with a plain, in-memory recap of the decisions and lessons shown. Do not award points,
   ranks, unlocks, or saved progress.

The “play anyway” option is always learner-controlled and available after every incorrect answer;
the first feature does not change feedback mode from a score or other inferred understanding.

## Outcome Teaching

Decision quality and hand outcome are separate facts. After resolution, feedback leads with the
decision assessment and then names the result:

- A correct decision that loses is framed as a good long-run choice with an unlucky one-hand
  outcome (for example, “Smart play, rough cards”).
- A non-recommended decision that wins is framed as a lucky result that does not make the action
  the better habit.

The tone should be concise, upbeat, and clear. The first version teaches the qualitative idea of
long-run advantage only; it must not present unsourced percentages, charts, or exact
expected-value claims. Exact statistical teaching requires a dedicated research and design cycle.

## Architecture and Recorded State

The Rust engine owns rules, card flow, legal actions, dealer play, outcomes, and the Basic
Strategy oracle. The browser UI orchestrates drill presentation and records what was displayed;
it never embeds strategy rules or manufactures an alternative outcome.

For every decision, retain in-memory run data sufficient for the recap and QA:

- phase (`warm_up` or `live`), visible player/dealer context, and legal actions;
- selected action, oracle recommendation, and whether the learner revised or played it anyway;
- final outcome and the feedback message shown;
- traceable shoe/card provenance for staged scenarios and the shuffled shoe identity for live
  practice.

## Safeguards

- Render only legal actions and prevent duplicate submission while feedback or resolution is
  underway.
- If the oracle has no recommendation, such as an initial natural blackjack, explain that there
  is no strategy choice and let the engine resolve the hand.
- A scenario-initialization failure must offer a recoverable retry. It must never silently replace
  the cards or scenario.

## Verification and Feature QA

- Unit-test staged and live shoe provenance, legal-action filtering, oracle grading, and
  revise-versus-play-anyway behavior.
- Test outcome framing for both correct-loss and incorrect-win hands, as well as the explicit
  transition to the fresh live shoe and the in-memory recap.
- Extend relevant browser QA coverage for the new decision/feedback states.
- Before feature QA, follow the ledger-driven scoping process in
  `docs/specs/qa-playtest-process.md`: read `journal/qa/ledger.md`, deep-test changed drill
  surfaces, smoke-test proven areas, and record the run and findings in the ledger.
- Because this changes `web/src/app/`, the scoped feature QA includes the Player Experience
  judgment pass in addition to the required deterministic checks.

## Non-goals

- Showing or teaching the Basic Strategy table.
- Delayed-feedback assessment mode, score-based feedback switching, mastery thresholds, or
  persistence.
- AI-generated coaching, exact probability lessons, card counting, or general curriculum
  infrastructure.
- Altering Free Play's normal shoe flow; it remains a future checkpoint/practice surface.
