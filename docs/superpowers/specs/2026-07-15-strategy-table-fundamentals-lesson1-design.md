# Strategy Table Fundamentals — First Lesson Objective and Sequence

## Status

Approved design (2026-07-15). This is the **STF-01** output: the first learner-visible objective
and ordered sequence for the **Strategy Table Fundamentals** subject, the second V2 learning
subject after **Blackjack Foundations**. It is deliberately scoped to the *first lesson's* shape —
objective, ordered steps, exclusions, and success evidence — and does **not** own the full feature
design (STF-05), the content/state surface (STF-02), or the engine-owned grading boundary (STF-03).
Those cards consume this one; the "Downstream deltas" section names what this shape hands them.

The four design choices below were reviewed by a Fable 5 subagent wearing two hats — a professional
blackjack teacher and a learning-games instructional designer — which verified the example cells
against `crates/blackjack-core/src/strategy.rs` and the prior-subject wording against
`web/src/learn/content/blackjack-basics.ts`. All four choices were endorsed architecturally; this
document incorporates the review's one blocker (adaptive checkpoint grading) and its cheap,
high-value refinements.

## Product Outcome

A learner who has finished Blackjack Foundations (they can read a hand, use an Ace as 1 or 11,
recognize a pair, and use every action) can, after this lesson, **classify any hand and look up the
correct move for a hard total on the Basic Strategy table** — finding the right row and column and
reading the cell — and can **recognize a soft hand or a pair and route it to the correct section**.
They do not yet act on the table under live pressure; that is the adjacent application lesson.

## Scope

This lesson owns:

- the single learner-visible objective;
- the ordered step sequence and the interaction type of each step;
- what is explicitly excluded from lesson one;
- what counts as success evidence.

This lesson defers (to the named cards):

- the serializable content/state contract for the lesson (STF-02);
- the Rust-owned grading/lookup boundary and its parity proof (STF-03);
- the Foundations "hit a stiff 16" wording reconciliation (STF-04);
- the full subject design and its QA boundary, including where the application lesson sits (STF-05).

## Learner-Visible Objective

> **Use the Basic Strategy table to look up the correct move for any *hard total* — and recognize
> when a hand is soft or a pair so you send it to the right section.**

The objective is a **lookup** skill, not yet an execution skill. It is deliberately narrowed to
"hard total" (rather than "any hand") because deep soft-total and pair *cell* navigation is later
work; overpromising "any hand" and then covering only hard totals reads as dishonest once the
learner meets an uncovered soft hand.

## Ordered Sequence

Mechanics-first, one concept per screen, authored against the existing step vocabulary
(`Explain` / `Question` / `Hand` / `Recap`) with engine-derived answer rules where possible. The
Basic Strategy table is **visible throughout** — this is open-book procedure training; hiding the
table would test memorization, which is not the objective.

1. **Why a table — the Hit-16 reveal** *(explain)*. Open with a callback to Foundations: "Earlier
   you hit a stiff 16 to learn the Hit button. Here's what we didn't tell you: whether you *should*
   hit it depends entirely on the dealer's card. That's what the table is for." This both motivates
   the table and pre-empts the contradiction with the earlier lesson (see Cross-Lesson Continuity).

2. **Classify: pair → soft → hard** *(explain + one question each)*. Teach the three hand shapes
   **in precedence order** so ambiguous hands resolve deterministically: check *pair* first, then
   *soft*, then *hard*. This is what makes A-A resolve to the pair section rather than "soft 12."
   Use the precise definition **soft = "an Ace currently counted as 11,"** never "a hand containing
   an Ace" (A-6-10 is hard 17). One question each for a hard, a soft, and a pair hand, using the
   engine-derived softness and pair-recognition rules so the learner can route *any* hand.

3. **Find the row** *(explain + question)*. Rows are your hand's total. Question: "10-4-2 — which
   row?"

4. **Find the column** *(explain + question)*. Columns are the dealer's upcard. Question: "Dealer
   shows a King — which column?" — this explicitly teaches that **10, J, Q, K all map to the
   10-column**, a common novice stumbling point that the rest of the sequence would otherwise never
   cover.

5. **Read the cell — the 16 contrast** *(explain + two questions)*. Teach the cell letters
   (H / S / D / P). Worked example: **hard 16 vs dealer 6 = Stand; hard 16 vs dealer 10 = Hit** —
   same hand, opposite answers, which is the canonical justification for the table's existence. Add
   one gentler second contrast read (e.g. 13 vs 6 / 13 vs 7) so the learner encodes the *procedure*,
   not one memorized answer. Example cells are **derived from the oracle**, never hand-written
   strategy constants (see Verification).

6. **Route soft & pairs** *(explain + recognition questions)*. A soft hand or a pair uses its own
   section the same row/column way; deep navigation within those sections is a later lesson. This
   step is not inert: its routing skill is assessed at the checkpoint below.

7. **Checkpoint — live hand, adaptive grading** *(hand)*. A real hand is dealt from an honest shoe
   (no rigged card flow). The learner is graded on the **read**, adaptively by engine-derived hand
   class:
   - **hard total** → grade the full cell read;
   - **soft or pair** → grade the **routing** read ("which section / which row?"), the skill step 6
     taught;
   - **natural blackjack** → celebrate, ungraded, and redeal.

   The hand then plays out; the outcome is **shown but not graded**, and is immediately followed by
   an explicit framing line: *"Your read was correct. The hand lost. Those are two different facts —
   the table wins over thousands of hands."* Multi-decision hands **grade every read**. After a
   correct read, the learner may press the action button themselves (ungraded) to feel the motion of
   applying the table.

8. **Recap** *(recap)*. State the capabilities earned.

## Why Adaptive Checkpoint Grading

An honest 6-deck deal produces a pair, a two-card soft hand, or a natural blackjack a meaningful
fraction of the time (roughly one first-hand in five is not a plain hard total), and the product
constitution forbids rigging the deal. A hard-only checkpoint would therefore hit a substantial
share of learners with an out-of-scope hand *on their first graded item* — grading a full cell read
on a dealt 8-8 is an invalid, unfair assessment. Adaptive grading by hand class keeps the shoe
honest, keeps every graded item fair, and converts the "unlucky" deals into reinforcement of the
routing skill from step 6. It fits the engine-derived answer-rule architecture: the branch is on a
value the engine already knows.

## Cross-Lesson Continuity — the Hit-16 moment (STF-04, approved)

Blackjack Foundations' Hit unit says "This hand is a stiff total. Choose Hit to take one more card"
— a *mechanics* instruction (try the button), not a strategy claim, consistent with the subject's
"mechanics-first literacy, no strategy language" charter. But the contradiction is sharper than the
wording alone suggests: **all three arranged `OPENINGS.stiffHands` examples are Basic-Strategy STAND
hands** — 16 vs dealer 6, 15 vs dealer 5, 16 vs dealer 4 — so the learner physically clicks Hit on
16-vs-6, the single most iconic Stand cell in the game.

**Approved reconciliation (Path A — disclaim + deliberate callback):**

- **Keep the dealt hands unchanged.** 16-vs-6 is not a bug to hide; it is the exact hand this
  lesson's step-5 worked example teaches as a Stand, so the two subjects reference the *same* hand
  as one continuous arc.
- **Edit exactly one string** — the `HIT_AND_STAND` unit's `hit-hand` step `intro` in
  `web/src/learn/content/blackjack-basics.ts` — from
  *"This hand is a stiff total. Choose Hit to take one more card."* to:
  > "This hand is a stiff total — hard to feel safe with. For now, just use the Hit button to take
  > one more card and see what it does. Whether hitting is actually the right move here depends on
  > the dealer's card — that's what you'll learn in Strategy Table Fundamentals."
- The `hit-hand` `teach` line ("Hit adds one more card to your hand") stays — it is already pure
  mechanics. No shared opening data, engine, or other unit changes.

This preserves the Hit unit's mechanics goal, disclaims strategy at the moment it could mislead, and
forward-references this subject, which step 1's reveal builds on ("Earlier you hit a stiff 16 to
learn the button — here's what the dealer's card changes").

**Deferred write:** STF-04 is a read/research card; it owns the *approved wording and placement*
recorded here. The one-string edit is applied when this lesson is built (or as a small linked fix
card), not by STF-04 itself.

## Exclusions (Non-Goals for Lesson One)

- **Deep soft-total and pair *cell* navigation** — recognition and routing only.
- **Live decision-quality grading** — being graded on *obeying* the table in a live hand, and
  obeying it under emotional pressure, is the adjacent application lesson. STF-05 must sequence that
  lesson **adjacent and unskippable**: a read-only skill decays if the chance to apply it is several
  lessons away, which would turn a sound deferral into a mistake.
- **H17-vs-S17 profile differences** — the lesson uses the active ruleset's table silently; profile
  nuance is advanced content.
- **No-table recall and timed / realistic pace** — later mastery work.

## Success Evidence

- The learner answers the classify (×3, precedence-correct) → row → column → read (×2 contrast)
  questions correctly, engine-derived where possible.
- The checkpoint read matches the correct grade for its hand class — the cell move for a hard total,
  the section/row routing for a soft hand or pair.
- Example and checkpoint cells are validated against the oracle (extend `web/src/learn/validate.ts`
  with an example-cell-vs-oracle check); no strategy value is hand-written prose.
- Scoped learning and Player-Experience QA for the lesson are defined later, in STF-05.

## Downstream Deltas

- **STF-02 (content/state surface):** must express, per checkpoint hand, the engine-derived hand
  class and the expected read for that class, so the adaptive grade can be authored as data.
- **STF-03 (grading boundary):** must return, for *any* hand, its **classification / routing** and,
  for a hard total, the **cell move** — slightly broader than a hard-only cell lookup. The oracle is
  not yet exposed over the bridge (the bridge currently has only `check_strategy_compatibility`), so
  exposing this lookup is net-new wire surface and carries the WASM-freshness / native↔built-WASM
  parity obligation from T1.
- **STF-04 (Hit-16 reconciliation):** owns the Foundations forward-reference wording that step 1's
  reveal builds on.
- **STF-05 (feature design):** must place the live-application lesson adjacent to this one and
  unskippable, per the deferral condition above.

## Verification

- Example and checkpoint strategy values are proven against the Rust oracle, not asserted in prose —
  the modeled ruleset has no surrender, so "hard 16 vs 9/10/A = Hit" is correct today but would
  change if surrender entered a ruleset; deriving from the oracle keeps the content self-correcting.
- The classification-precedence and soft-definition claims are the two most error-prone content
  points; their questions must be engine-derived so a wrong content edit fails a test, not a learner.

## Next Design Boundary

STF-02 (content/state surface) and STF-03 (grading boundary) design against this objective and
sequence; STF-04 reconciles the Foundations wording; STF-05 synthesizes all of them into the full
Strategy Table Fundamentals feature design and its QA boundary.
