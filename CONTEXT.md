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
