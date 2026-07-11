# V2 Learning Foundation and Blackjack Basics

## Status

Approved design. This replaces the current `Get to Know Blackjack` drill content and its rigid
lesson flow with the first durable version of the V2 learning system. It keeps the trustworthy
engine and arranged-shoe work, but treats the existing three-unit curriculum and presentation as a
prototype rather than a constraint.

This design covers the reusable learning runtime and its first subject, **Blackjack Basics**.
Strategy Table Fundamentals follows in a separate design cycle after this feature passes scoped
feature QA.

## Product Outcome

A complete beginner can finish Blackjack Basics and then play a full Free Play hand without
instructional help. They understand the goal, cards, totals, table information, round flow,
actions, wagers, and results. They do not yet know which legal action is strategically correct;
that begins with Strategy Table Fundamentals.

The product remains a training game rather than a gambling product. It teaches execution through
short interactions and real blackjack mechanics, and it does not celebrate money won or imply that
one hand's outcome proves a decision good or bad.

## V2 Foundation Principle

V1 supplies trustworthy blackjack mechanics. V2 supplies a trustworthy learning runtime and
curriculum. V3 will make that experience visually delightful.

Deferring visual polish does not permit disposable implementation. V2 quality means:

- engine-owned blackjack truth;
- reusable, explicit learning contracts;
- deterministic state transitions;
- meaningful attempt and completion evidence;
- curriculum validation;
- recoverable errors;
- strong unit, integration, and browser QA.

The V2 UI may remain plain, but the mechanics and boundaries must be durable enough for Blackjack
Basics, Strategy Table Fundamentals, and later prerequisite testing.

## Learner and Completion Boundary

Blackjack Basics assumes no prior knowledge. The learner may not know the goal of blackjack, card
values, dealer behavior, Hit, or Stand.

Completing the subject means the learner can:

- explain that the goal is to beat the dealer without going over 21;
- read number, face, and Ace values and determine a hand total;
- recognize a bust;
- follow the opening deal, player turn, dealer turn, and settlement;
- understand the dealer upcard, hidden card, and forced play;
- explain and use Hit, Stand, Double, and Split;
- recognize win, loss, push, natural blackjack, and ordinary 21;
- follow the wager consequences of outcomes, Double, and Split;
- complete a full engine-backed hand without instructional help.

It does not mean the learner can choose the Basic Strategy action, recall a strategy table, play
without assistance at speed, or demonstrate long-term mastery.

## Curriculum

Blackjack Basics contains nine short units. Each should take roughly two to four minutes, focus on
one small skill, and declare explicit prerequisites, learning outcomes, and completion evidence.

### 1. Meet Blackjack

Teach the goal: beat the dealer without going over 21. Introduce number-card and face-card values.
Do not introduce strategy, wagers, or the full round flow yet.

### 2. Read Your Hand

Teach adding card values, an Ace counting as 11 or 1 as needed, and recognizing a bust.

### 3. How a Round Works

Show the opening deal, dealer upcard and hidden card, player turn, dealer turn, and settlement.
Explain that the dealer follows fixed rules rather than making choices.

### 4. Hit and Stand

Teach exactly what Hit and Stand change. The learner deliberately uses both actions in focused
examples. The unit teaches operation, not which action is strategically best.

### 5. Win, Lose, or Push

Teach outcomes from completed hands: player bust, dealer bust, higher total, and tied total.
Connect each result to what happens to the original wager.

### 6. Blackjack Is Special

Distinguish a two-card natural blackjack from reaching 21 later and introduce the 3:2 payout.

### 7. Double

Teach that Double adds an equal wager, deals exactly one more card, and then stands. Let the
learner follow the resulting wager and outcome without implying that every demonstrated Double is
a strategy recommendation.

### 8. Split

Teach when Split is legally available and how one pair becomes two independently played and
settled hands with separate wagers.

### 9. Play a Complete Round

Use real engine hands with minimal assistance. Check that the learner can read the table, use the
available actions, and understand the result. Do not grade the chosen action against Basic
Strategy.

## Lesson Rhythm

Each unit uses the smallest useful subset of this shared rhythm:

1. **Goal** — one sentence describing what the learner will be able to do.
2. **See** — one or two focused examples.
3. **Try** — a small interaction with immediate feedback.
4. **Use** — apply the concept in an engine-backed hand when that serves the lesson.
5. **Check** — one or two unseen examples without hints.
6. **Recap** — state the skill the learner demonstrated.

The rhythm is a reusable controller capability, not a requirement to pad every unit with six
screens. A unit omits steps that do not serve its outcome.

## Interaction Set

Build only the interaction mechanics Blackjack Basics needs:

- choose a card's value;
- choose or identify a hand total;
- identify visible dealer information;
- identify or advance through round stages;
- predict bust, win, loss, push, blackjack, or ordinary 21;
- identify what Hit, Stand, Double, or Split does;
- perform an action in an arranged engine-backed hand;
- play a complete engine-backed hand;
- review feedback and a capability-based recap.

Use simple semantic controls. A button-based selection is sufficient; draggable cards, animation,
and custom visual treatments are not required.

## Feedback Rules

- Correct answers receive concise confirmation and the reason.
- Incorrect answers identify the specific misconception and allow an immediate retry.
- New concepts use immediate feedback. Delayed assessment remains future work.
- Operational exercises judge whether the learner understands what an action does, not whether it
  is the Basic Strategy choice.
- Learning correctness and hand outcome are always separate. A learner can follow an instruction
  and lose the hand; the loss does not make the learning response incorrect.
- A single result never proves an action strategically good or bad.
- Recaps state demonstrated capabilities rather than listing only hand outcomes.

The current five-to-ten-hand random live tail is not a default lesson phase. Random play often
fails to surface the concept being taught. Use a real hand only where it reinforces the unit, and
reserve broader transfer for the complete-round checkpoint.

## Curriculum Model

The browser owns explicit, typed curriculum data with this conceptual hierarchy:

```text
Subject -> Unit -> ordered LessonStep
             |-> prerequisite skill IDs
             |-> learning outcome IDs
             `-> completion evidence requirements
```

Stable IDs are required for subjects, units, steps, skills, and attempts. Lesson definitions may
contain prompts, choices, explanatory copy, example cards, and arranged-situation requirements.
They must not contain React components or reimplement blackjack rules.

Each subject declares a small skill catalog. Units reference those skill IDs as prerequisites and
outcomes; checks reference the outcome they measure. A unit is complete once every required check
has received a correct unassisted response in the current run. Retries are allowed and remain in
the attempt record, so completion is not a claim of durable mastery or first-try accuracy.

Validate curriculum definitions before they can be treated as shippable content. Validation must
at least reject duplicate IDs, missing prerequisite/outcome references, empty units, invalid step
ordering, unsupported step types, and completion requirements that no step can satisfy.

This is not a general course-authoring platform. Keep the contracts small, serializable, and
grounded in the two known V2 subjects.

## Lesson Controller

A UI-independent lesson controller replaces the current `DrillController`'s fixed
`situation -> live_intro -> live -> recap` assumptions. It owns:

- selected subject and unit;
- current step and step state;
- answers, retries, and assistance used;
- immediate feedback;
- engine-backed situation setup and actions;
- attempt evidence and unit completion;
- recap state and transitions.

The controller advances through the ordered steps declared by a unit. Step behavior is exhaustive:
an unsupported step must fail clearly rather than render nothing. Duplicate submissions remain
blocked while work is in flight.

The controller records raw in-memory attempts rather than inferring persistent mastery. Each
attempt should identify the subject, unit, step, learning outcome or skill, interaction type,
prompt context, submitted response or action, correctness where applicable, assistance used,
engine context where applicable, and feedback shown.

## Engine Boundary

Rust remains authoritative for all rule-dependent facts:

- hand scoring and soft/hard state;
- natural blackjack and bust state;
- legal actions;
- dealer behavior;
- wager changes and settlement;
- ordered-shoe construction;
- arranged-card provenance;
- later, Basic Strategy recommendations.

The browser may author the question and candidate choices, but it must not independently decide a
rule-dependent answer. Add a small serializable engine query that accepts example cards and returns
the total, soft/hard state, and bust state. Natural-blackjack status, legal actions, dealer play,
and settlement continue to come from a real engine session, where hand origin and round context
are available. Do not expand browser-owned blackjack calculations. Existing arranged openings
continue through `start_session_with_prefix`, a composition-correct shuffled shoe, and the normal
round machinery.

Static teaching definitions such as vocabulary, the stated goal, and round-stage ordering may use
typed curriculum answer keys when they require no runtime calculation. Integration tests must tie
those definitions to observed engine behavior. Do not add a Rust teaching-content API merely to
store prose or static labels; use Rust where rules computation, correctness, or performance
benefits, and never duplicate its scoring, legality, wager, outcome, or dealer-play algorithms in
TypeScript.

Every engine-backed teaching hand must preserve the existing safeguards:

- the arranged opening is visibly traceable as arranged-origin;
- the remainder is a real shuffled shoe with correct composition;
- legal actions come from the engine;
- draws, dealer play, and settlement resolve normally;
- an impossible prefix is rejected rather than silently substituted.

## React Presentation

React is a thin functional surface over controller state. Provide the smallest reusable views for:

- explanation/example;
- choice or prediction;
- card/hand interaction;
- engine-backed hand;
- feedback;
- recap.

Reuse existing card, hand, table, and button components where practical. The Learn entry screen
must render the real subject/unit hierarchy rather than bypassing the subject and reading a flat
unit list. Basic navigation includes the unit list, current lesson, Continue or Retry, recap, and
return to units.

For this feature, the unit list shows every unit in recommended order and allows replay or direct
selection. Prerequisites are curriculum metadata but are not enforced yet. Locking, skipping, and
testing skipped prerequisites arrive together in the future progression feature; V2 must not
pretend to enforce them without persistence or a skip-test path.

Clear labels, readable state, keyboard-operable semantic controls, and visible errors are
functional requirements. Course-map art, animations, custom illustrations, reward celebrations,
advanced responsive polish, coach/pet presentation, and a broader design system are V3 work.

## Runtime Data Flow

Normal learning steps follow:

```text
choose unit
  -> load step
  -> render interaction
  -> submit answer or action
  -> validate through curriculum or engine
  -> record attempt evidence
  -> show feedback
  -> continue or retry
```

Engine-backed hand steps follow:

```text
arrange opening on a real shoe
  -> deal through the engine
  -> obtain legal actions
  -> apply learner action
  -> resolve through normal blackjack rules
  -> record learning response separately from hand outcome
  -> explain the relevant consequence
```

All progress and attempt data remain in memory for this feature.

## Future Unit Skipping

The future vision allows a learner to select a later unit and prove the skipped prerequisites with
a short test. Do not implement unit skipping, prerequisite tests, persistence, or mastery policy in
this feature.

Design for that future by giving every unit explicit prerequisite skill IDs, outcome IDs, and
check evidence. A later skip-test feature can select assessment items for the prerequisite skills
without scraping lesson copy or duplicating curriculum truth.

## Error Handling

- Invalid curriculum data fails deterministic validation and never ships silently.
- A recoverable arranged-hand setup or action error keeps the learner in context and offers Retry.
- A malformed engine response or transport failure stops the lesson with a clear fatal error.
- An impossible arranged opening is never replaced with different cards.
- Repeated submissions cannot create duplicate actions or attempt records.
- A hand that resolves without a player decision still advances with a factual explanation.
- Returning to the unit list discards only the current in-memory run after an explicit navigation
  action; there is no hidden persisted state.

## Migration From the Prototype

1. Define the subject, unit, step, skill, outcome, prerequisite, and attempt-evidence contracts.
2. Add curriculum validation and deterministic tests.
3. Add the smallest engine query needed for rule-owned teaching facts.
4. Build the reusable lesson controller and plain React step renderers.
5. Author the nine Blackjack Basics units.
6. Replace the flat Learn screen and the rigid drill flow.
7. Migrate useful arranged-hand, provenance, feedback, and browser-QA coverage.
8. Remove obsolete drill code only after the replacement covers its important guarantees.

Free Play remains behaviorally unchanged throughout the migration.

## Verification and Feature QA

### Engine

- Test any new teaching/query boundary across number, face, and Ace values; hard and soft totals;
  busts; natural blackjack; and ordinary 21.
- Retain arranged-prefix composition, ordering, provenance, and rejection tests.
- Assert that teaching hands use normal legal-action and settlement machinery.

### Curriculum and controller

- Validate all curriculum IDs, references, outcomes, prerequisites, and completion evidence.
- Test every step transition, correct and incorrect response, retry, assistance record, completion
  check, recap, and return navigation.
- Test recoverable and fatal failures, no-decision hands, and duplicate-submit protection.
- Assert that every unit's checks produce evidence for its declared learning outcomes.

### UI and browser

- Test each reusable renderer and its semantic controls.
- Run every Blackjack Basics unit through browser QA.
- Verify engine provenance for arranged hands and normal provenance for unarranged play.
- Verify that learning correctness is not inferred from hand outcome.
- Verify the complete-round checkpoint and the subject/unit navigation.

Before scoping the feature run, read `journal/qa/ledger.md` and follow
`docs/specs/qa-playtest-process.md`. Deep-test changed Learn surfaces, smoke-test proven Free Play
and engine areas, record the run and findings in the ledger, and include the required Player
Experience pass. The Player Experience verdict judges comprehension and mechanical usability;
visual polish is not a feature gate for V2.

## Non-goals

- Basic Strategy table teaching or strategy grading.
- Strategy Table Fundamentals implementation in the same feature.
- Persistent progress, accounts, backend storage, or cross-device sync.
- Unit skipping or prerequisite-test generation.
- Mastery thresholds, ratings, ranks, XP, lives, achievements, or adaptive repetition.
- A universal lesson plugin framework or visual course-authoring tool.
- AI-generated curriculum or coaching.
- Delayed-feedback assessment, no-table testing, or timed practice.
- V3 visual polish: course maps, animation, illustration, celebration, coach/pet UI, or a broad
  design system.

## Next Design Boundary

After Blackjack Basics passes its scoped feature QA, Strategy Table Fundamentals gets its own
brainstorm, design, plan, implementation, and QA cycle. It should reuse the subject/unit model,
lesson controller, attempt evidence, feedback flow, engine adapter, navigation, and QA harness.
It adds only the new capabilities its design proves necessary, such as hand classification,
table navigation, and oracle-backed table-open decisions.
