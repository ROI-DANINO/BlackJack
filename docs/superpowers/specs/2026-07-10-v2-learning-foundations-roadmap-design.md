# V2 Learning Foundations Roadmap

## Status

Roadmap decision only. This is not an implementation plan. Every V2 research or build feature
gets its own brainstorm, design, plan, implementation, and scoped feature QA when active.

## Product Outcome

V2 makes the product begin to feel like a blackjack-learning game. It teaches a new player to
understand the current table's actions and use its matching Basic Strategy table during play.
It does not try to complete Basic Strategy memorization, card counting, or a general learning
platform.

## V2 Subjects

1. **Blackjack Foundations**
   - Teach hit and stand first, then double and split.
   - Use short guided simulations with concise explanations and immediate feedback by default.
   - In immediate mode, an action is selected and checked before it commits to the hand, so the
     learner can change it. A delayed-feedback mode remains available for later assessment.

2. **Strategy Table Fundamentals**
   - Teach that the strategy table is a decision tool, then hand classification and table
     navigation.
   - The complete table is available under player-controlled tabs; lessons and feedback show
     only the relevant row or category.
   - Finish with table-open guided practice and checkpoints. No-table or timed tests are later
     mastery content.

Subjects unlock in a fixed recommended order. Completed units remain replayable. Passing a
checkpoint unlocks the next unit automatically; a checkpoint can use a real Free Play session
to let an experienced player advance.

## Engineering Boundaries

- Build one ruleset-matched, engine-owned strategy oracle before teaching features. It must be
  the single source for table rendering, drill grading, hints, and later Free Play review.
- Free Play keeps its ordered real shoe. Lessons may target decisions, but must resolve through
  the same blackjack hand/rules machinery rather than fixed outcomes.
- The Free Play page may expose the strategy table early. Its helper is player-controlled:
  no help, requested hint, immediate check, or after-hand feedback. Decisions are recorded in
  every mode; a session review is optional when play ends.
- Persist progress only when a progression/scoring feature requires it, using a small versioned
  browser-local record. Do not add accounts, a backend, or a database without a new requirement.
- Keep curriculum definitions explicit for these two subjects. Do not build generic course,
  XP, rank, or achievement infrastructure yet.

## Build Sequence

1. Research and lock the exact source chart, provenance, precedence, and edge cases.
2. Encode and exhaustively test the strategy oracle.
3. Ship one excellent guided drill loop.
4. Add concise feedback and targeted repetition.
5. Add persisted diagnosis and checkpoints when the loop needs progression.
6. After V2, expand Basic Strategy mastery gradually: hard totals, hard doubles, soft totals,
   pairs/splits, then mixed review.
7. After V2, add no-table and paced practice.
8. Add active Free Play coaching and deeper session review only after the teaching loop proves
   useful.

## Research Gates

- Before the oracle: verify the locked 6-deck H17, DAS, no-surrender, peek, 3:2 chart; preserve
  source provenance; settle action precedence and special contexts.
- Before feedback/content expansion: research learning sequence and explanations that are short,
  accurate, and useful rather than ornamental.
- Before pacing/mastery policy: use observed drill data; do not invent thresholds or scoring
  formulas in advance.
- Before card counting: separately research Hi-Lo teaching, count measurement, and multi-seat
  card-flow load.

## Non-goals

- Full Basic Strategy recall/memorization.
- No-table or timed assessments.
- Card counting, simulated players, and casino pace.
- Server accounts, cross-device sync, ranks, XP, leaderboards, or daily challenges.
