# Get to Know Blackjack — First Guided Drill Subject

## Status

**Superseded by** [`2026-07-11-blackjack-basics-learning-foundation-design.md`](2026-07-11-blackjack-basics-learning-foundation-design.md)
(Task 9, 2026-07-12): the guided-drill prototype was retired and replaced by the Blackjack Basics
learning foundation (`<Learn>` navigator + `<Lesson>` renderer). Retained for historical context.

Approved design, reshaped 2026-07-10 after review of the original product notes and the V2 roadmap.
This defines the first foundations subject as **2–3 short micro-units**, taught through **targeted
situations that resolve on the real engine** — not fixed outcomes. It is not a Basic Strategy
lesson, not oracle-graded, and not a general curriculum system.

## Outcome

Give a new player a short, enjoyable orientation to blackjack's vocabulary, hand flow, and stakes
before teaching the Basic Strategy table. The learner comes to understand totals, blackjack,
win/loss/push, Hit, Stand, Double, and Split through real hands they play — not lectures or rigged
demonstrations.

It does not teach how to choose the best strategy action. The existing Rust-owned strategy oracle
stays reserved for the later Strategy Table Fundamentals subject, where the learner has been taught
the decision tool it implements. No oracle recommendation, table, grading, score, rank, or
persistence appears in this subject.

## Micro-unit structure

The subject is split into short units, each finishable in one sitting (a "short learning loop"):

1. **Reading the table** — hand totals; why 21 is strong; what an initial two-card natural
   blackjack is and that it pays 3:2, distinct from later reaching 21.
2. **Hit, Stand, and the stakes** — what Hit and Stand change; that a bust ends a hand immediately;
   that win, loss, and push are decided by comparing the resolved hands.
3. **Double and Split** — Double doubles the wager for exactly one card, then stands; Split turns a
   pair into two independently played and settled hands.

Each unit declares its own title, concise goal, its short list of guided situations, its live-tail
range, and its prompt/feedback copy. Unit count and situation count are set by the lesson, not by a
generic curriculum rule. Run state and the recap are in memory only.

## Teaching mechanism: targeted situations, real resolution

Lessons **target the decision context, then let the engine resolve the hand for real** — matching
the V2 roadmap rule that lessons "must resolve through the same blackjack hand/rules machinery
rather than fixed outcomes."

- **Situation setup.** Each guided situation arranges a chosen **opening** (for example, a pair to
  demonstrate Split, an eleven to demonstrate Double, an Ace + ten to show a natural blackjack, a
  stiff sixteen to feel bust risk) on top of a **real, correctly-composed, seed-shuffled six-deck
  shoe** via a dedicated engine command. Only the arranged opening is controlled; every card the
  hand draws after it comes from the genuinely shuffled remainder of a true six-deck shoe, so shoe
  composition stays honest (this matters for later counting) and the outcome is unscripted.
- **Provenance.** Arranged opening cards are marked as arranged-origin so a guided situation is
  never presented as a random casino deal; the shuffled remainder keeps normal shoe origins. The
  existing simulator remains the authority for legal actions, draws, dealer play, and settlement.
- **Card variety.** The specific cards forming a situation vary across repetitions (seed-driven), so
  practice never degrades into the same fixed hand — following the product note "generate situations
  … with changing actual cards," not "always deal the exact same hand."

### Outcomes are taught honestly, not rigged

Win, loss, push, and "a strong total can still lose" are **outcomes, not openings**, and are never
forced. They are explained in short copy and **named reactively when they occur** during live play
and the situations' real resolutions. A concept the learner does not happen to hit in a short
session is still covered by copy; the game does not stage a fixed result to guarantee it. (If a
future revision wants a guaranteed illustration of a rare outcome, it must be a clearly-labeled
worked-example replay, explicitly not presented as live practice — deferred, not in this subject.)

## Live tail and the "Got it" control

Each unit ends with a short **live tail**: a fresh normally shuffled six-deck shoe, an explicit
"Now let's play a real shoe" transition, and the unit's remaining five-to-ten decisions of real,
unscripted play. Feedback reinforces the unit's vocabulary and names outcomes as they happen; it
never grades the decision. The five-to-ten range is a **maximum, not a quota** — an explicit "Got
it" control lets the learner end the tail at any time and jump to the recap.

## Feedback and tone

Feedback is concise, upbeat, and factual:

- Name the action or situation before the learner acts, then narrate its immediate consequence.
- After settlement, name the result and the stake change in plain language.
- Distinguish a natural blackjack from later reaching 21, and a push from a win or loss.
- For Double and Split, make the extra wager and the independently settled hands visible.
- Acknowledge that a single result is only one hand and does not prove a decision right or wrong.

No strategy recommendation, table, right/wrong assessment, exact percentages, charts, or
expected-value claims. Precise probability teaching requires its own research and design cycle.

## Architecture and recorded state

The Rust engine owns rules, shoe composition, ordered card flow, legal actions, dealer play, and
outcomes. The browser UI orchestrates lesson presentation and records what was shown; it never
embeds blackjack rules or manufactures an outcome. Situation openings are selected in thin TypeScript
scenario definitions and handed to the engine as an exact ordered prefix; the engine builds the real
shoe and resolves the hand.

For every guided or live decision, retain in-memory run data sufficient for the recap and QA:

- phase (`situation` or `live`), unit and topic, visible player/dealer context, and legal actions;
- selected action(s) and whether the decision was a guided situation or live-tail choice;
- final outcome, wager change, and feedback message shown;
- arranged-prefix provenance for guided situations and the shuffled-shoe identity for the live tail.

## Safeguards

- Render only legal actions and prevent duplicate submission while a hand is resolving.
- If a round has no player decision (for example an initial natural blackjack), explain the outcome
  and continue without inventing an action.
- If a situation cannot be set up (for example the arranged opening is unavailable in the shoe
  composition), offer a recoverable retry. Never silently substitute cards or a scenario.

## Verification and feature QA

- Unit-test the arranged-prefix engine command: prefix cards appear first in order with
  arranged-origin provenance, the shoe stays a correctly-composed six-deck, the shuffled remainder
  carries normal shoe origins, and an unavailable prefix card is rejected.
- Unit-test situation setup for each teaching topic (pair→split available, eleven→double available,
  Ace+ten→natural blackjack, stiff→bust risk), legal-action filtering, the natural-blackjack versus
  later-21 distinction, and reactive win/loss/push feedback.
- Test the explicit transition to the fresh live shoe, the in-memory recap, duplicate-submit
  protection, recoverable situation-setup failure, and the "Got it" early exit.
- Extend relevant browser QA coverage for the new lesson states. Do not weaken proven Free Play
  rule, flow, history, or robustness checks.
- Before feature QA, follow the ledger-driven scoping process in
  `docs/specs/qa-playtest-process.md`: read `journal/qa/ledger.md`, deep-test changed drill
  surfaces, smoke-test proven areas, and record the run and findings in the ledger.
- Because this changes `web/src/app/`, scoped feature QA includes the Player Experience judgment
  pass in addition to the deterministic checks.

## Non-goals

- Showing or teaching the Basic Strategy table, or grading a strategy choice.
- Fixed/rigged outcomes, oracle-driven hints, delayed-feedback assessment, score-based feedback,
  mastery thresholds, or persistence.
- A general constraint/category library for Basic Strategy drills (hard 12–16 vs 2–6, soft totals,
  etc.). This subject builds only the arranged-prefix mechanism and the few openings it consumes;
  the broader category library belongs to the Strategy Table Fundamentals subject.
- AI-generated coaching, exact probability lessons, card counting, or general curriculum
  infrastructure.
- Altering Free Play's normal shoe flow; it remains a future checkpoint/practice surface.
