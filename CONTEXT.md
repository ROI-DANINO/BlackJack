# Blackjack Trainer — Domain Language

The canonical vocabulary for this project. A glossary and nothing else: no design decisions, no
implementation detail, no rationale. Decisions live in `journal/decisions.md`; designs live in
`docs/superpowers/specs/`.

Terms land here the moment a naming collision is resolved, so the resolution is visible to every
later card, document, and identifier rather than to one design doc.

## Learning model

**Skill**:
A single trainable thing the learner can do. The node type of the skill graph.
_Avoid_: Capability, outcome (as a noun for the node), learning target

**Learning outcome**:
The sentence stated about one Skill, phrased as an observable decision behaviour — what the learner
does, given what. Exactly one per Skill.
_Avoid_: Objective, competency, can-do statement

**Prerequisite**:
A comprehension dependency between Skills: the later Skill's Learning outcome cannot be stated or
attempted without the earlier one. Never a claim about teaching order, and never a lock.
_Avoid_: Dependency, gate, unlock, blocker

**Subject**:
The sole content partition of Skills — a named body of curriculum a learner works through. Subjects
do not overlap as containers, but a Skill may be exercised from more than one.
_Avoid_: Cluster, module, course, topic, area

**Grading authority**:
What decides whether a response was correct: the engine (rules, totals, outcomes), the strategy
oracle (basic-strategy correctness), or the catalog (authored answers). Never a model.
_Avoid_: Grader, judge, marker, validator

**Condition of evidence**:
The circumstances a Skill was exercised under, on four axes — support, scope, ruleset, and pace.
Recorded per attempt; never a Skill in its own right.
_Avoid_: Stage, level, rung, tier, learning target

**Activity type**:
One way of asking, individuated by what is **shown**, what must be **produced**, and what is
**withheld**. It declares the Skills it measures, its Grading authority, and which provenance modes
it may use. Feedback timing, scoring rule, and Condition settings are *parameters* on a type, never
new types; the widget is not part of it at all.
_Avoid_: Exercise, question type, activity pattern, format, drill

**Ungraded Activity type**:
An Activity type that produces **no mastery evidence at all** and is admitted anyway, because it is
good to play. It declares `rehearses` in place of the Skills it measures, grades nothing, and never
reaches a Mastery bar. Five exist: `hand-sort`, `estimate-and-check`, `procedure-order`,
`principle-name`, `rule-battery`. Its attempts are still **recorded** — an activity that records
nothing could not be instrumented, and `A-18` requires instrumenting it.
_Avoid_: Free play, filler, warm-up, mini-game, unscored activity

**Rehearses**:
The Skills an Ungraded Activity type gives practice at **without producing evidence for**. It is the
price of admission for a type that grades nothing, and it is deliberately **not** coverage: a Skill
named only in a `rehearses` list is still uncovered, and still reports as a gap against `LDB-01`.
_Avoid_: Covers, measures, targets, supports, practises (as a coverage claim)

**Totals disclosure**:
Whether the blackjack table prints the hand total for the player, or the player keeps it themselves.
With totals hidden, the eight `state-report` Skills are exercised **in play** rather than by a
question afterwards; the engine adjudicates identically either way. **Not** the same thing as
Table visibility — see the collisions note.
_Avoid_: Table visibility, hint level, assist mode, hard mode

**In-situ capture**:
Evidence produced **inside** a live hand rather than by a separate question about one — the way
`classify-hand` is graded within `deal-and-decide`. `state-report` evidence is captured this way when
totals are hidden. The standalone question survives as the first-exposure form.
_Avoid_: Inline quiz, embedded question, interstitial

**Supplied pool**:
Elements the prompt puts on screen for the learner to work from. **Cosmetic** when it discloses any
part of what is being measured; **substantive** when the measured target is not in it. The four
legal actions are not a supplied pool — a real table enumerates them too.
_Avoid_: Word bank, tile bank, option set, choices

**Provenance mode**:
Where an Activity type's Decision situations come from: `organic` (met in natural shoe order),
`arranged` (a composition-honest opening chosen via `create_prefix_shoe`), or `posed` (stated
directly, no cards). Read off card ids, never stored separately.
_Avoid_: Source, origin, generation mode

**Mastery**:
The claim that a learner can perform a Skill's Learning outcome unaided, computed from recent
evidence. Never a permanent property, never a lock.
_Avoid_: Completion, proficiency, level

**Presentation**:
One posing of one item to the learner, together with every response to it. The unit the mastery
window counts.
_Avoid_: Attempt (when the presentation is meant), question, item

**Review due**:
The state of a Skill whose Mastery was reached and whose recent evidence no longer meets the bar. A
prompt to return, never a demotion.
_Avoid_: Expired, lapsed, decayed, lost

**Completion**:
That a learner performed the required steps of a unit. Distinct from Mastery: it records work done,
not capability shown, and it is the economy's trigger.
_Avoid_: Mastery, done, passed

## Economy

**Chips**:
The product's only currency. Earned by winning at the table or by learning; spent only on table time;
never bought with money. A balance advances the learner on no axis.
_Avoid_: Coins, credits, currency, money

**Wallet**:
A learner's persistent chip balance, surviving rounds, sessions, and logouts. Distinct from a Table
stack.
_Avoid_: Bankroll, balance, account

**Table stack**:
The chips a learner has brought to one Free Play session, session-scoped and settled by real play.
The engine's `bankroll` field is this, not the Wallet.
_Avoid_: Bankroll (when the Wallet is meant), buy-in (when the stack is meant), pot

**Buy-in**:
The transfer of chips from the Wallet to a Table stack on sitting down. Its reverse is cash-out,
which returns the whole remaining stack.
_Avoid_: Entry fee, stake, ante

**Table tier**:
A stakes band: a minimum bet, a minimum buy-in, and a maximum buy-in. Gated by the Wallet alone.
Distinct from table character, which is gated by mastery alone and never by chips. The strategy chart
is identical at every tier, so a tier is not a difficulty level.
_Avoid_: Table level, table rank, high roller (as a mechanic name)

**XP**:
The monotonic effort ledger. Records work done, never falls, and gates nothing. Distinct from Player
score, which moves in both directions.
_Avoid_: Points, score, rating

**Player score**:
The learner's rating: internal, two-directional, fitted per learner, moving with decision quality and
never with hand outcome. Drives difficulty only.
_Avoid_: XP, level, mastery, rank (when the number is meant rather than its display)

**Free Play**:
The honest casino simulator: real rules, real settlement, a real Table stack.
_Avoid_: Casino mode (when the product surface is meant), sandbox, practice

**Practice**:
The always-available learning mode over already-covered material, which pays into the Wallet. Named
to keep "free" meaning only "no chips required to enter". _(Proposed; the naming call against "Free
Learn" travels to `LDB-07`.)_
_Avoid_: Free learn, free play, drill, grind

## Strategy decisions

**Decision situation**:
What a strategy decision is made about: the player's hand shape, the dealer's upcard, and the active
ruleset. Present on every strategy attempt, whether or not cards were dealt.
_Avoid_: Scenario, position, hand (when the situation is meant)

**Classification**:
Naming what kind of hand a Decision situation is — pair, soft, or hard — before any strategy lookup.
A step the learner performs, never one the prompt performs for them.
_Avoid_: Hand type, categorisation, identification

**Cell**:
One entry of the strategy table — the correct action for one Decision situation. Derived from the
situation, never authored.
_Avoid_: Item, question, drill

**Dealt-hand provenance**:
The seed and card ids proving a Decision situation came from a real ordered shoe. Present only when
cards were dealt; its absence means the situation was posed directly, never that it is untraceable.
_Avoid_: Engine context (when only the situation is meant)

## Notes on collisions this resolves

- In shipped code, `Skill`, `outcomeId`, and `capabilities` all refer to the same referent.
  `web/src/progress/types.ts:79` had already begun the rename to `skillId`; the remaining
  `outcomeId` and `capabilities` identifiers are the same concept under retired names.
- "Outcome" is doubly loaded: `HandOutcome` in the engine means the result of a hand (win/loss/push)
  and is unrelated to a Learning outcome. The engine's meaning keeps the bare word; the learning
  side always says **Learning outcome** in full.
- **"Table" is doubly loaded, and the schema uses both senses.** `ProgressAttempt.tableVisibility`
  (`web/src/progress/types.ts:32`) and `supportFading`'s `table-open` / `table-closed` mean the
  **strategy table** — the chart — because the `support` Condition axis is defined that way
  (*"tableOpen is the project's mastery axis"*, `2026-08-01-skill-graph.json:8`). **Totals
  disclosure** means the **blackjack table**. They are different Conditions and neither field may be
  reused for the other. Recorded at `LDB-09` D6, where reusing `tableVisibility` would have been
  free, convenient and wrong.
