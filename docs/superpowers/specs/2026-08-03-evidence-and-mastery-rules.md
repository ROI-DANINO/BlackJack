# Per-Activity Evidence and Mastery Rules — LDB-04

> **Status: DRAFT FOR APPROVAL — not approved.** On `main`, `LDB-04` sits in `Ready` at
> `Evidence: pending`. Nothing in this document may be cited as settled, implemented in code, or
> quoted by another document as a decision until the owner approves it at the `user-approval` gate.
>
> ROADMAP Phase 4 deliverable 5. **Phase 4 designs and builds nothing** — this document produces no
> code and authorises none.
>
> **Card:** `LDB-04` — *Decide the per-activity evidence and mastery rules.*
> **Source:** `docs/superpowers/specs/2026-07-22-product-design-inputs.md` §3.
> **Consumes:** `2026-08-01-learning-outcomes-and-skill-graph.md` + `.json` (18 Skills, four Condition
> axes); `2026-08-01-activity-taxonomy-and-skill-mapping.md` + `.json` (six Activity types, the
> parameters this card owns); `2026-07-23-graded-decision-practice-design.md` §2b (the five owner
> product constraints); `web/src/progress/types.ts` (the durable schema); `web/src/learn/controller.ts`
> and `validate.ts` (the shipped model).
> **Answers, adopts nothing from:** `docs/imports/2026-08-02-pr11-salvage/` — see §14.

---

## 0. What this document decides, and what it does not

**It decides:** what counts as mastery evidence; how mastery is computed from it; what the Condition
of evidence must be for evidence to count; how resource consultation and assistance are recorded and
treated; whether mastery decays; whether it gates progression; the values of the five (in fact six)
LDB-03 parameters this card owns; and the disposition of the two Phase 2 audit verdicts whose locus
is code.

**It does not decide:** session entry, size, stopping, mix, or trajectory (`LDB-06`); any widget,
control, rendering, or WCAG target (`LDB-07`); the chips-and-XP economy (`LDB-05`); which Activity
types phase 5 actually builds (`LDB-08`).

**Where this document names a number, that number is invented.** The phrase "research-calibrated" is
not available in this repository (`A-07`). Two numbers appear in this design and both are filed.

---

## 0.1 Binding product constraints

These five are **owner constraints of 2026-07-23**, recorded at
`2026-07-23-graded-decision-practice-design.md` §2b as *"product judgement, not evidence-backed"*.
They bind every ruling below.

1. The learning path must not be steep. Confusion is a failure of the design, not of the learner.
2. **It must not be frustrating.**
3. **It is a game. It has to be fun.** Not a quiz with a card table drawn behind it.
4. This activity assumes table literacy — practice, not first exposure.
5. **Mastery means deciding correctly *without* the table.** Table-open is assisted; table-closed is
   independent.

**Why this section exists.** The word `fun` appears **zero** times in
`2026-08-01-learning-outcomes-and-skill-graph.md`, **zero** times in
`2026-08-01-activity-taxonomy-and-skill-mapping.md`, and **zero** times in
`2026-07-22-product-design-inputs.md` — the document `ROADMAP.md` names as *what Phase 4 may assume*.
Searched 2026-08-02 across those three files for `fun`, `enjoy`, `delight`, `playful`, `boring`,
`tedious`, `frustrat*`, `motivat*`, `engag*`; the two live hits in the repository are
`2026-07-23-graded-decision-practice-design.md:69` and `journal/decisions.md:182`, both quoted above
or below. The constraints were approved and structurally invisible to every LDB card. This document
is where they re-enter phase 4. `[Evidence-backed — enumerated search, files and terms named]`

`journal/decisions.md:182`: *"Playability and learnability are co-equal priorities that feed each
other — fun comes from competence at a genuinely hard game, and competence is what the learning
delivers."*

---

## Problem Statement

**From the learner's perspective.** I am trying to learn to play blackjack correctly. The app tells
me I have "completed" a lesson the moment I answer each of its required questions correctly once. It
has never watched me play a hand. It cannot tell the difference between me knowing what to do and me
having guessed right one time, months ago, with the strategy table open in front of me. So when it
says I have learned something, I have no reason to believe it — and neither does it.

**From the owner's perspective.** The product's founding ruling is *measure play, not quiz scores*.
The shipped mastery model is one line (`web/src/learn/controller.ts:360-362`) that keys on `stepId`,
discards the skill-grained evidence the record already carries, and can only ever be satisfied by a
`question` step (`web/src/learn/validate.ts:65-66`). **100% of shipped mastery evidence is declarative
multiple choice, and a played hand can never satisfy completion.**
`2026-07-22-product-design-inputs.md` §3 constraint 1 is explicit: *a mastery model that cannot ingest
played-hand evidence is disqualified.* Every downstream decision — the economy, session composition,
what phase 5 instruments — waits on what replaces it. `[Evidence-backed — all four code loci reopened
first-hand 2026-08-02]`

---

## Solution

Mastery becomes a claim about **recent, independent, first-swing decision behaviour on real dealt
hands** — and the whole model is one sentence with two numbers in it:

> **A Skill is mastered when 8 of the last 10 table-closed presentations of it were correct on first
> response**, with at least one **organic** presentation if the Skill includes Classification.

Around that sentence sit five supporting rules, each of which exists to stop a specific way the claim
could become false or unkind:

- Only evidence from an Activity type that is **primary** for the Skill enters the window.
- Consulting a resource is **offered explicitly**, recorded, and keeps that presentation out of the
  window — so looking something up is never punished, only uncounted.
- **Abandoned** presentations are recorded and excluded, never counted as failures.
- The window is the **truth**; the **displayed** state ratchets and never falls below its high-water
  mark, moving to `Review due` rather than back to unmastered. Every other consumer — the recommender
  above all — reads the live window.
- Mastery **locks nothing**, and both the rule and the running count are shown to the learner.

There is no weight table, no per-family ceiling, no decay constant, and no structural
"at-least-one-unassisted" clause. Each was considered and each proved unnecessary once the pool was
defined correctly. **Two constants exist in the entire model.**

---

## User Stories

**The learner**

1. As a learner, I want the app to only claim I have mastered something after watching me decide it
   correctly several times without the strategy table, so that the claim means something.
2. As a learner, I want a played hand to count as evidence, so that the thing I actually do in the
   game is the thing that measures me.
3. As a learner, I want to know in advance exactly what I have to do to master a Skill, so that I am
   never confused about what the app wants from me.
4. As a learner, I want to see how far along I am toward that bar, so that progress feels visible
   rather than opaque.
5. As a learner, I want to look up the strategy table when I am unsure without being punished for it,
   so that consulting a resource feels like learning rather than cheating.
6. As a learner, I want the "show me" option to be offered on screen, so that I do not have to
   discover by accident that consulting has consequences for what counts.
7. As a learner, I want guessing to be a worse strategy than admitting I do not know, so that the
   app's incentives point at learning.
8. As a learner, I want to keep a mastery I have already earned even if I later play badly, so that
   the app does not take back something it gave me.
9. As a learner, I want to be told when a Skill is worth revisiting rather than being told I have
   lost it, so that returning feels like an invitation rather than a demotion.
10. As a learner, I want my mastery to survive a long absence, so that coming back after a month is
    not a punishment.
11. As a learner, I want a retry after a wrong answer to still teach me, so that being wrong is not a
    dead end.
12. As a learner, I want my second attempt not to overwrite the record of my first, so that the app
    measures what I knew rather than what I converged on.
13. As a learner, I want to close the app mid-hand without it counting against me, so that stopping
    is never costly.
14. As a learner, I want to enter any lesson whenever I like, so that the app recommends rather than
    locks.
15. As a learner, I want to be able to finish a lesson by playing hands in it, so that a hand-based
    lesson is completable the way it is taught.
16. As a learner, I want finishing a lesson and mastering a Skill to be different things, so that
    doing the work is acknowledged even before I am good at it.
17. As a learner, I want to earn chips by completing lessons, so that the economy rewards effort I
    control rather than luck I do not.
18. As a learner, I want to meet a hard 16 arise naturally at least once before the app says I have
    mastered deciding it, so that I have had to notice it and not merely respond to it.
19. As a learner, I want drilled, arranged hands to still count as practice, so that rare situations
    are reachable without waiting for the shoe.
20. As a learner, I want activities that are not graded toward anything, so that not every
    interaction is an exam.
21. As a learner, I want to predict how often something will happen and then watch it play out, so
    that I find out for myself that I underestimate the tail.
22. As a learner, I want my prediction to be scored against reality without a pass mark attached, so
    that the confrontation teaches without a grade.
23. As a learner, I want the app never to ask me how confident I feel and then treat my answer as
    evidence, so that feeling good about a Skill is never mistaken for having it.
24. As a learner, I want the app to be honest about when it actually helped me, so that its record of
    my independence is true.
25. As a learner, I want the app to recommend what to practise next based on what I am currently weak
    at, so that its suggestions track reality rather than a badge.

**The owner / designer**

26. As the owner, I want every number this design ships to carry a register row with a named
    validation method, so that no invented constant is later quoted as research.
27. As the owner, I want the number of invented constants minimised, so that there is less to be
    wrong about.
28. As the owner, I want each ruling labelled Evidence-backed, Product judgement, or Assumption, so
    that what is free to change is visible.
29. As the owner, I want every divergence from an approved spec surfaced rather than silently
    applied, so that the record stays trustworthy.
30. As the owner, I want the mastery model to be a pure function over stored attempts, so that it can
    be re-run, re-versioned and tested without a browser.
31. As the owner, I want the first telemetry question this model owes to be computable from data the
    app already stores, so that answering it needs no new instrument.
32. As the owner, I want LDB-05, LDB-06 and LDB-07 to receive explicit handoffs, so that the next
    cards inherit obligations rather than discover them.
33. As the owner, I want this document to answer the PR #11 draft rather than adopt it, so that a
    branch-approved decision does not enter `main` through the side door.

---

## Implementation Decisions

Twelve rulings. Each carries its evidence label.

### D1. Mastery attaches to a Skill; the bar names a required Condition, and only support sets it

One mastery state per **Skill** — not one per Skill × Condition-vector cell, and not a scalar in
which the Condition is priced as a discount.

`2026-08-01-learning-outcomes-and-skill-graph.md:78-79` assigns this question here: *"Conditions are
deliberately absent from the form… An outcome states the behaviour; LDB-04 decides which conditions it
must be shown under."* This document answers: **`support: table-closed`, and support only.**

`scope`, `ruleset` and `pace` are recorded per attempt and remain **unordered**, exactly as LDB-01
left them for LDB-06. Asserting an ordering here would manufacture Assumptions with nothing behind
them.

Table-open work is real practice and may be **displayed** as progress. It cannot be spent on the bar.

`[Product judgement]` — resting on the owner decision of 2026-07-23 that `tableOpen` is the project's
mastery axis, restated as binding constraint 5, and on LDB-01 §4's treatment of stages 4–7 as
Conditions of performance.

**Why not a weight.** The branch draft priced `tableVisibility: 'open'` at 0.5 against `'hidden'` at
1.0, both at `assistance: 'none'`, with a threshold of 3.0 and a structural clause requiring at least
one *unassisted* item. Six correct table-**open** attempts at `assistance: 'none'` sum to 3.0 and each
independently satisfies that clause, because "unassisted" there names the `assistance` field, which is
orthogonal to `tableVisibility`. **That model permits full mastery of `strategy-action` with the
strategy table open throughout** — the precise outcome constraint 5 exists to prevent.

### D2. The bar is a window proportion, and the display ratchets

Mastery is **k of the last n** table-closed presentations. Not a count, and not a weighted sum.

A count ("N correct, ever") is the shipped defect at a slower speed: a learner who is right three
times and then wrong twenty remains mastered permanently. A measurement must be losable.

**But the displayed state does not fall.** Once a learner has crossed the bar, the shown state never
returns below its high-water mark; it moves to **`Review due`** when the live window drops. This is
constraint 2 applied directly — the model stays honest, and the product does not take back something
it granted.

> **The ratchet governs display only. Every other consumer — the recommender above all — reads the
> live window.**

That sentence is load-bearing. A sliding window with a ratcheting display is mathematically a
best-streak-ever measure; a persistent learner eventually clears any fixed bar by luck. Because the
recommender reads the live value, a lucky streak grants the badge and does **not** stop the app
recommending that Skill. The badge is motivational; the window is operational.

`[Product judgement]` — the window shape, the ratchet, and the split between displayed and live state.

### D3. The unit is the presentation, scored by its first response

The window is over **presentations**, each scored by its **first response**. `presentationId` groups
retries of one presentation; `attemptOrdinal: 1` is the first response.

Retries still happen and are still recorded — they are pedagogically the point — but they do not
rewrite the presentation's verdict. The first swing is the only unassisted one.

This removes the last reason for a weight table, including the branch draft's `'instruction'` row,
which that draft itself described as *"reserved for a level that will exist only when a hint ladder
does."*

`[Product judgement]`, resting on `[Evidence-backed]` schema annotations: `progress/types.ts:72-73`
already documents `presentationId` as grouping retries of one presentation and `attemptOrdinal` as
distinguishing first response from retry.

### D4. Consulting a resource is offered explicitly and keeps a presentation out of the window

Support is a property of what the learner **consumed**, not of what the session was **configured** as.
A presentation in which the learner opened the strategy table is not table-closed evidence.

**This must be an offered, labelled action** — a *"I'm not sure — show me"* control — not a silent
reclassification. Constraint 1 requires it: a learner whose progress stalls for an invisible reason is
confused, and confusion is a design failure.

**The guessing incentive, and why no rule is needed to fix it.** If consulting is uncounted and
guessing may land as a hit, a naive model pays better for guessing than for looking something up —
backwards for a product whose thesis is *read the table, then internalise it*. A demanding bar
disciplines this without a rule: at 8 of 10, guessing destroys the window while "show me" costs
nothing, so the honest option is also the better play. **This is a derived reason for a high bar and
is recorded as such.**

`[Product judgement]` — the ruling. The incentive analysis is arithmetic, not evidence.

### D5. Abandoned presentations are recorded and excluded

`AttemptDisposition` carries `{status: 'abandoned'}` as a real domain value (ALR-022). An abandoned
presentation is stored and does not enter the window. It is **not** counted as a failure — abandonment
far more often means a session ended than that a learner failed.

The obvious objection is gaming: bail on every hard hand and never record a miss. The window answers
it structurally — bailing records no hit either, so the window never fills and mastery never arrives.
A count model would have needed a patch here.

`[Product judgement]`

### D6. Only `primaryFor` evidence enters the window

Evidence from an Activity type that is **secondary** for a Skill is recorded, informs what to
recommend next, and never reaches the bar.

Two of the six Activity types are `primaryFor: []` — **`policy-paint`** and **`rule-contrast`**. Under
this ruling they produce **no mastery evidence at all**, and that is stated as a result rather than
left as a gap. They are teaching and diagnostic instruments.

**This is required by an already-approved ruling, not chosen here.** LDB-03 §4.1, approved
individually at the gate on 2026-08-01: *"strategy-action, legal-fallback and adherence-under-loss are
all `classificationIncluded:true`… so they must show cards, and those cards must have come from a
shoe. All three are unmeasurable without dealt hands."* `policy-paint` is `provenance: ["posed"]`.
Counting secondary evidence would overturn that ruling.

Note `rule-contrast` **does** show dealt cards and is still secondary, because what it asks the
learner to produce is which rule differs, not an action. Secondary is about what was produced, not
about whether cards were present.

**Against constraint 3:** not everything the learner does needs to feed a progress meter. An app in
which every interaction is graded is a quiz with a card table drawn behind it. LDB-03 already built
room for this — `rule-contrast` carries `verdictSurfaced: false`. This ruling makes it structural.

`[Evidence-backed]` on the derivation from LDB-03 §4.1; `[Product judgement]` on extending it to all
secondary evidence.

### D7. At least one organic presentation for Skills that include Classification — `A-23`

For any Skill with `classificationIncluded: true`, the window must contain **at least one** `organic`
presentation. `arranged` evidence is otherwise unrestricted, and is unrestricted entirely for the
thirteen Skills where `classificationIncluded` is false.

**Why it keys on that field.** `A-23`'s worry, verbatim: *"a learner drilled on arranged hard-16s has
produced the correct action many times **without ever having to notice a hard 16 arise**."* Having to
notice is the **Classification** step. So the risk lands exactly on the five Skills flagged
`classificationIncluded: true` — `classify-hand`, `strategy-action`, `legal-fallback`,
`adherence-under-loss`, `natural-blackjack` — and is irrelevant to the rest. `card-values` on an
arranged card is the same evidence as on an organic one.

**This became load-bearing because of D2.** A window makes rare Skills slow to fill organically
(`natural-blackjack` arises on roughly 4.8% of hands), so `arranged` provenance is the mechanism that
makes them reachable at all. That is the scenario `A-23` describes.

**It leaves LDB-06 free.** Engineered exposure still teaches, still practises, and still fills most of
a window — it simply cannot be the only thing a learner ever met. That is an answer *in terms of what
evidence a session must yield*, which is the form LDB-06's card asks for.

**Strictness is one, deliberately.** Anything higher is a number with nothing behind it. `A-23`'s own
validation method — an arranged-only arm against a mixed arm, tested on organic play, scoring
classification errors separately — is what would justify raising it, and is recorded as the reopening
condition.

`[Product judgement]` on the ruling; the field mapping is `[Evidence-backed]` against
`2026-08-01-skill-graph.json` and `A-23`'s own wording.

### D8. Mastery does not decay with time — `A-06`

`Review due` is triggered by the **window falling**, never by the calendar. **No review horizon is
set, and `A-06` takes no sub-row.**

**The distinction that decides it:** *"is this Skill mastered"* and *"what should the learner practise
next"* are different computations. Mastery is a claim about capability; a claim does not expire
because nobody asked lately. Staleness belongs to the **recommender**, and `occurredAt` is already
annotated in the schema as *"Recency/spacing input"* — exactly that job. A wrong recency ordering
costs an odd suggestion; a wrongly revoked mastery costs constraint 2.

**The asymmetry of being wrong.** If this ruling is wrong, recovery is total: `occurredAt` is stored
on every attempt, so decay can be added later and applied *retroactively to all history*, with no
migration and no lost data. If the opposite ruling were wrong, the code is easy to change but the
number will by then have been quoted across documents as though it meant something — this
repository's most-documented failure pattern.

**Why no research was commissioned.** `A-06` sits at **Low**, and the repository already ran this
search: `docs/superpowers/research/foundation-audit-p1/dossiers/C5-anki-spaced-repetition.md` is a
19-source dossier whose load-bearing question Q4 is *"Does spaced repetition apply to a decision-rule
skill?"*, carried through three verification passes. `V5c:376` rules: *"Treating every adjacent source
a collection surfaces as a new insufficiency is an infinite regress. The test is whether additional
searching is unlikely to materially change the conclusions — and after **four independent failed
searches for the decision-rule study**… it is not."* A further search would be the fifth.
`[Evidence-backed — dossier and verification record reopened first-hand 2026-08-03]`

**Reopening condition, carried forward from the branch draft and worth keeping.** If learners who
cross some gap re-fail at a materially higher rate than those inside it, time decay is doing work.
**That comparison is computable from `ProgressAttempt` alone and needs no new instrument.** `A-06`
gains this trigger in place of a horizon.

**Known limitation, named rather than papered over:** a returning learner's window is composed of old
attempts, so the model will claim mastery on stale evidence until enough new play refills it. The
mitigation is free — the recommender surfaces the stale Skill, the learner plays it, the window
updates.

`[Product judgement]`

### D9. Mastery locks nothing

Mastery drives a strong recommendation. It gates no unit, no activity, and no content.

Three independent grounds, each `[Evidence-backed]` at its source:

- **The glossary forbids it.** `CONTEXT.md`, *Prerequisite*: *"A comprehension dependency between
  Skills… Never a claim about teaching order, and never a lock."*
- **`A-01` is withdrawn, not merely weak** — *"WITHDRAWN, not validated… No seven-step prerequisite
  ordering is asserted by any live document."* Gating would resurrect a retracted assertion.
- **It is what already ships.** `web/src/app/Learn.tsx:1-4`: *"Every unit is directly selectable…
  Prerequisites are shown as non-interactive metadata only — nothing is locked."*

**Boundary, stated so LDB-05 does not misread this.** *Nothing is locked by mastery* is not *nothing
is ever gated*. The economy premise — chips *"earned by completing lessons and units"* and spent only
in Free Play, `journal/decisions.md:182` — is a gate, and a legitimate one. It is an **economy** gate
owned by LDB-05, not a mastery gate.

### D10. The criteria are published — rule and count both

`criteriaPublishedInAdvance: true`. The learner is told the rule (*"8 of your last 10 with the table
closed"*) **and** shown the live count.

Constraint 1 requires the rule: a bar with an invisible mechanism about which hands count is a slot
machine. Publishing the rule and then withholding the number that instantiates it would be citing
legibility for one and opacity for the other.

The objection — that a running count is exam-like or invites stalling — depends on progress being
**losable**, which D2's ratchet removes above the bar; and reaching the bar and stopping is not gaming
but succeeding. Whether a count reads as a grade or as a row of lit pips is a **rendering** question,
and LDB-03 put the widget outside the Activity type. **LDB-04 rules on what is knowable; LDB-07 rules
on how it is rendered.** Withholding the number to control how it feels would be this card
pre-empting that one by suppressing information.

**Handed to LDB-07:** *the pre-mastery indicator can move backwards; the post-mastery state cannot.*
Below the bar the count genuinely falls (7/10, two wrong, 5/10). The ratchet protects the state, not
the progress bar. That asymmetry needs designing, not discovering in phase 6.

`[Product judgement]`

### D11. Parameter values

The six LDB-03 parameters owned by this card. **The board's `FROM LDB-03` handoff names five; there
are six** — `space` is omitted there. See §12.

| Parameter | Type | Value | Note |
|---|---|---|---|
| `scoringGranularity` | `deal-and-decide` | **`binary`** | Confirmation; the range holds one value. The EV-graded form is foreclosed — LDB-01 gives EV no Skill and the oracle returns an action, not a number. |
| `criteriaPublishedInAdvance` | `deal-and-decide` | **`true`** | D10. "Criteria" means the rule *and* the live count. |
| `assistanceRecording` | `deal-and-decide`, `state-report` | **`resources-consulted`** | Confirmation, made load-bearing by D4. Scope limit in §11. |
| `supportFading` | `deal-and-decide` | **binary — `table-open \| table-closed`** | Divergence; see §12. The `"faded"` rung is reassigned to LDB-06. |
| `scoringRule` | `predict-then-reveal` | **`signed-error-against-catalog`, no bar** | D12. |
| `space` | `policy-paint` | **declined — reassigned to LDB-07** | Divergence; see §12. |

**On `supportFading`.** *Fading is a property of a session's trajectory; support is a property of a
presentation.* At the instant of any single decision the table was either in front of the learner or
it was not; there is no third thing it could have been. A learner in a session that withdraws the
table after ten hands produces attempts that are individually `table-open`, then individually
`table-closed`. The fade is real and visible in the **sequence**. It is not a value a single attempt
can carry. `A-04` is **not spent** — this asserts no rungs.

### D12. `predict-then-reveal` scores a signed error and carries no bar

`variance-expectation` gets **no mastery bar in v1**. Predictions are captured before the shoe they
concern, scored against the catalog value, and the **signed** error is stored and surfaced at reveal.

`scoringRule: signed-error-against-catalog`. **The parameter gets a real value, and that value
contains no number.**

Three grounds:

- **The pedagogy does not need a bar.** The mechanism bridge §1.2 `[VERIFIED]` describes — that
  experience-taught learners systematically underweight rare events — fires at the **confrontation**:
  predict 2, watch 7 happen. That works at every reveal, threshold or no threshold.
- **A bar would be prohibitively slow.** LDB-03 carries a hard constraint from its own source:
  *"single items are near-useless — the signal must aggregate across many predictions before any
  threshold is read off it."* One prediction per shoe means ten complete shoes for one Skill's window.
  Against constraint 2 that is the worst ratio in the model.
- **It is the least decision-behaviour-like Skill in the graph** — `posed`, no dealt cards,
  `judgedBy: catalog` — in a project whose founding ruling is *measure play, not quiz scores*.

**A symmetric band was rejected** because it discards **direction**, and direction is the entire
target: over- and under-estimating by the same margin are pedagogically opposite and a band scores
them identically.

**LDB-03's 18/18 coverage guarantee is untouched.** Its rule is that every Skill names an Activity
type that *could produce primary evidence*; `predict-then-reveal` still does. Having no mastery bar is
a different claim from having no evidence.

**Reopening condition:** once enough signed errors exist, whether learners systematically under-predict
is computable from stored data with no new instrument. If the bias is real and moves with practice, a
bar becomes worth defining, with its band read off the data rather than invented.

`[Product judgement]`

### D13. The two numbers — `k = 8`, `n = 10`

**A Skill is mastered at 8 of the last 10.**

- **80% is far above any guessing rate**, so D4's incentive holds: guessing destroys the window while
  "show me" costs nothing.
- **It fills at a tolerable rate even for rare Skills.** `natural-blackjack` at ~4.8% needs roughly
  200 hands for ten presentations — a few sessions, not a wall.
- **It is legible, and D10 made legibility a requirement.** *"8 of your last 10 with the table
  closed"* is a sentence a learner holds; *"16 of your last 20"* is a specification. This is a
  **design** reason rather than a statistical one and is labelled as such.

**The honest cost, stated rather than buried.** Ten decisions is a thin sample of a 169-cell strategy
table, and this model deliberately makes no claim of cell coverage — LDB-01: *"do not design a cell
grammar; a `cellId` records where evidence came from and is not a licence to drill cells as items."*

`[Assumption]` — one pooled sub-row under `A-07`; see §10.

### D14. `K-U6-003` — landed in corrected form, not retired

`web/src/learn/validate.ts:65-66` rejects any required check that is not a `question` step, which is
why *"a played hand can never satisfy completion."*

**Completion and mastery are separated, and both survive.**

> **Completion** means *"you did the steps."* **Mastery** means *"you can do it."* Two claims, two
> computations.

They must stay separate because **completion is the economy's trigger** — chips are *"earned by
completing lessons and units"* (`journal/decisions.md:182`). Retiring completion inside a mastery
ruling would delete LDB-05's central mechanic as a side effect.

The branch draft retired `K-U6-003` on the reasoning that its §2 replaced the rule outright. **That
reasoning assumed completion and mastery are the same thing**, and does not transfer to this model.

With them separated, the rule is simply wrong on its own terms: a hand-based lesson must be
completable by *playing the hand*. **Required checks widen from `question` steps to any gradable
step.** The Relabel lands; what changes is its significance.

`[Evidence-backed]` on the defect; `[Product judgement]` on the disposition.

### D15. `K-U6-005` — both loci fixed, and the rename taken

Under D3 assistance carries no weight in the bar, but **truthful recording became more load-bearing,
not less**: under D4, whether a resource was consulted decides whether a presentation is table-closed
at all. A false label corrupts the bar directly.

- **`controller.ts:218`** — `assistance: graded ? 'instruction' : 'none'` marks a *graded hand step*
  as instruction-assisted. This is not a taxonomy question but a plain defect: being graded has
  nothing to do with being assisted. **The value is `'none'`.** Recorded because the audit verdict
  names only `:123`, and a reader checking that line alone would conclude the contract was honoured.
- **`controller.ts:123`** — `this.assistance = this.assistance === 'none' ? 'retry' : 'instruction'`
  labels a bare second retry as instruction when no instruction is delivered and no hint ladder
  exists. **Rename the union's third value to `'retry-2'`** in both `learn/types.ts` and
  `progress/types.ts`, and reserve `'instruction'` for a level that exists only once a hint ladder
  does. Re-introducing it later is additive.

**Why the rename is free today and expensive tomorrow —** verified first-hand 2026-08-03, not
inherited:

- **Nothing has ever been persisted.** No `appendAttempt` or `commitSessionSummary` call site exists
  anywhere outside `web/src/progress/`.
- **The module's only importer outside its own directory is `web/qa/progress/harness.ts`**, a QA
  harness (six import lines, `:42-52`).
- `journal/decisions.md:33`: *"No learner data is written until a real consumer exists."* The
  additive-only rule protects **persisted** records; there are none.
- `cachedMastery` carries `reducerVersion`, so cached state computed under an old union is invalidated
  rather than reinterpreted.

`[Evidence-backed]` on all four verification points.

---

## Testing Decisions

**What makes a good test here.** Assert external behaviour only — attempts in, mastery states out.
Never assert on intermediate structure, iteration order, or how a state was reached. Every ruling
above is expressible as a claim about the boundary, and any ruling that cannot be tested at the
boundary is a sign the ruling is about implementation rather than about mastery.

**One new seam: the mastery reducer.** A **pure function** from `ProgressAttempt[]` (plus a config
carrying `k` and `n`) to mastery states per Skill. No UI, no controller, no store, no browser, no
clock.

**Its slot is already reserved by the durable schema** — this is not a new concept being introduced:
`CachedMastery.reducerVersion` is pinned so a model change invalidates the cache, and
`progress/types.ts:85` already states that diagnostic attempts are *"excluded from mastery — by the
reducer, not the store."* The design named this seam before anything filled it.

**Prior art.** Co-located `.test.ts` under vitest, following `web/src/progress/contract.test.ts`,
`canonical.test.ts`, `types.test.ts` and `boundary.test.ts`. Fixture attempts come from the existing
`web/src/progress/fixtures.ts`, already used by the QA harness.

**What the reducer's tests must cover** — one group per ruling, so that coverage is checkable rather
than asserted: the window bound (D2); the ratchet and `Review due`, including that the live value and
the displayed value can disagree (D2); first-response scoring, with a retry that does not rewrite a
verdict (D3); a consulted presentation excluded (D4); an abandoned presentation excluded and not
counted as a miss (D5); secondary evidence excluded (D6); the organic minimum applying to exactly the
five `classificationIncluded: true` Skills and to no others (D7); no state change from the passage of
time alone (D8); diagnostic-mode attempts excluded (schema contract); and **confidence appearing in no
input the reducer accepts** (constraint C-E, `A-17`).

**Two existing seams modified — no new ones.**

- `web/src/learn/validate.ts`, with `validate.test.ts` already present — the required-check widening
  (D14).
- `web/src/learn/controller.ts`, with `controller.test.ts` already present — the two assistance fixes
  and the union rename (D15).

**Not a seam.** Rendering — the pip row, the `Review due` treatment, the "show me" control — is
LDB-07's, and is tested wherever that card decides. This document deliberately owns no widget.

---

## Out of Scope

- **Session entry, size, stopping, mix, segmentation, pace, feedback timing, rule-card availability,
  reveal mode, region, and the `"faded"` session trajectory** — all `LDB-06`.
- **Every widget, control, layout, rendering and WCAG target**, including how a count is displayed,
  how `Review due` looks, how the "show me" control is presented, and `policy-paint`'s `space` —
  `LDB-07`.
- **The chips-and-XP economy**, `E-1`–`E-7`, and whether a won hand returns chips — `LDB-05`. This
  document supplies the instrument (`adherence-under-loss` is primary in `deal-and-decide`) and rules
  nothing about the economy.
- **Which Activity types phase 5 builds, and the phase-5 instrumentation subset** — `LDB-08`.
- **Any code change.** Phase 4 designs and builds nothing. D14 and D15 describe dispositions, not
  authorised edits.
- **`K-U6-009`** — the recap copy asserting learner capability unconditioned on evidence.
  `web/src/learn/content/blackjack-basics.ts:290` reads `text: 'You can explain and use Hit.'`
  (reopened first-hand 2026-08-03), and **QA-019** in `journal/qa/ledger.md` records the pattern
  running to **16 assertions across all 9 recap steps** — `:81-82`, `:159-161`, `:216-217`,
  `:290-291`, `:356-357`, `:422`, `:485`, `:548-549`, `:603` — where the Phase 2 verdict names only
  `:290`.

  **This document owns the principle; it does not fix the defect.** QA-019's own disposition is that
  the honest fix conditions recap copy on the mastery computation — *claim a capability only where
  evidence supports it* — which needs this card's reducer to exist first. D1–D13 supply exactly the
  computation that fix requires. The copy change itself is phase-5 work with no legal card in the
  active milestone, and stays open in the ledger rather than being silently absorbed here.
- **Card counting**, and the fifth Condition axis LDB-01 expects it to add.
- **Per-cell mastery.** Explicitly refused; LDB-01 forbids a cell grammar.

---

## Further Notes

### 10. Register delta

**One sub-row. Zero new top-level rows.**

| Filed under | Covers | Validation |
|---|---|---|
| **`A-07`** sub-row | `k = 8` and `n = 10`, as **one** calibration target | Production telemetry on this product's own attempt data. **Named first test:** do learners who clear 8/10 then fail on organic play? Computable from stored `ProgressAttempt` records; no new instrument. |

The two constants are pooled rather than split because **moving `n` changes what `k` means** — they
are not independently validatable, which is the same pooling ground the owner has already accepted.

**Rows this leans on without spending:**

- **`A-06`** — no sub-row. Gains a **reopening trigger** in place of a horizon (D8).
- **`A-04`** — unspent. D11 asserts no rungs; the ladder is reassigned to LDB-06.
- **`A-23`** — answered structurally by D7, no constant. Gains a sharpened reopening condition.
- **`A-21`** — unspent; `space` is declined (D11).
- **`A-17`** — confirmed excluded. Confidence appears in no clause of this model, and D12 removed the
  one calibration-shaped mechanism that could have carried a self-rating.
- **`A-10`** — **retired, as its own row predicted** (*"Very low — likely to be retired rather than
  validated"*). No decision Skill's primary evidence is multiple choice any more: `deal-and-decide`
  is `primaryFor` all eight decision Skills, and under D6 is the only route to those bars. Its
  `shown` field is *"a Decision situation as dealt cards plus the dealer upcard, under a named
  ruleset"* and its `provenance` is `["organic","arranged"]` — so it cannot be posed, and it cannot
  be satisfied without dealt cards.
- **`A-01`** — not made load-bearing (D9). **`A-02`** — pace stays unordered.
- **`A-13`** / `P-1`, **`A-20`**, **`A-22`** — untouched.

### 11. Owed schema delta

The branch draft concluded *"this deliverable is a reducer, not a migration — no durable field needs
adding."* **That was true of its model and is not quite true of this one.** D4's "show me" must be
recorded, and `ProgressAttempt` has **no `resourcesConsulted` field** — checked first-hand.

**For the bar, no schema change is needed.** `tableVisibility: 'open'` records it: if the learner
opened the table mid-decision, that attempt's `tableVisibility` is `'open'`, which is semantically
exact under D4's ruling that support is a property of what was consumed. **The reducer-not-migration
finding survives.**

But it is narrower than LDB-03's parameter name promises. `assistanceRecording: 'resources-consulted'`
says *which* resources — plural; `tableVisibility` covers the strategy table only. **The full record
is a schema delta owed to whichever card first makes the rule card a mid-session resource, which is
LDB-06's `ruleCardAvailable: 'shown-mid-session'`.** Recorded as an owed delta rather than left to be
discovered.

### 12. Divergences from approved specs, surfaced not applied

Five. Each requires the owner's assent at the gate; none is treated as settled by this document.

0. **The card's `FROM LDB-01` handoff says mastery is "per Skill × Condition-vector, not per Skill."
   D1 rules one mastery state per Skill, with the bar naming a required Condition.** These are not
   the same. The handoff is a paraphrase written onto the board; LDB-01's own spec text says
   something narrower — *"An outcome states the behaviour; **LDB-04 decides which conditions it must
   be shown under**"* (`2026-08-01-learning-outcomes-and-skill-graph.md:78-79`) — which assigns the
   question here rather than mandating a per-cell matrix.

   D1 is offered as the answer to that assignment: the Condition is carried by the **bar** (support
   must be `table-closed`) rather than by a matrix of states. The alternative reading — a distinct
   mastery state per cell of Skill × support × scope × ruleset × pace — is 18 Skills × 16 cells, of
   which nearly all would stay permanently empty, and it would require ordering the three axes LDB-01
   deliberately left unordered. **If the handoff is read as mandating that matrix, D1 needs the
   owner's assent to depart from it.**

1. **`supportFading` has three values where the axis it realises has two.**
   `2026-08-01-activity-taxonomy.json` declares `["table-open","table-closed","faded"]` annotated
   *"realises the existing support Condition axis"*; `2026-08-01-skill-graph.json` declares
   `support: ["table-open","table-closed"]`. A parameter cannot realise a two-valued axis with three
   values. `"faded"` traces to `A-04`'s sourced ladder *table open → hidden → hidden at pace*, whose
   third rung LDB-01 dissolved by making **pace its own axis**. **Ruled binary; the fade reassigned to
   LDB-06.**
2. **`space`'s owner moves from LDB-04 to LDB-07.** Under D6 it has no evidence consequence, and its
   JSON rationale (*"withheld… is the setting that satisfies `classificationIncluded:true`"*) is void,
   because §4.1 requires dealt cards and `policy-paint` is `posed` either way.
3. **The board's `FROM LDB-03` handoff on `LDB-04` names five parameters; six carry
   `owner: LDB-04`.** `space` is missing from the card text.
4. **A stale citation, already corrected 2026-08-03.** `A-15`, `A-23` and the LDB-03 spec cited
   `P2-verdict-catalog.md:170` for the 46-vs-10 discrimination figure. That was accurate at `96b0f05`
   (2026-07-26) and was invalidated by `96dad04` (2026-08-02), which edited the file and moved the
   figure to **line 198** without updating its citers. Corrected in all three; `journal/tasks.md`
   left as process history, since the LDB-03 gate record was accurate when written.
   `scripts/check-doc-drift.sh`: 6/6 green after the fix.

### 13. Handed forward

**To `LDB-05`:** *nothing is locked by mastery* is not *nothing is ever gated* — the chips gate is
yours and is untouched (D9). `adherence-under-loss` is primary in `deal-and-decide`, so `E-1` has a
named instrument. Completion survives as your trigger (D14).

**To `LDB-06`:** the `"faded"` session trajectory — when, within a session, the table goes away (D11);
the `resourcesConsulted` schema delta owed by `ruleCardAvailable: 'shown-mid-session'` (§11); D7's
organic minimum, which constrains the engineered-versus-organic contradiction LDB-06 already owes, in
terms of evidence rather than of engine capability; and the fact that engineered exposure remains
fully available for practice.

**To `LDB-07`:** `policy-paint`'s `space` (D11); how a published count is rendered without reading as
a grade (D10); the "show me" control (D4); and **the asymmetry — the pre-mastery indicator can move
backwards while the post-mastery state cannot** (D10).

**To phase 5:** the reducer is the seam; `k` and `n` are its config, not constants baked into it, so
the `A-07` telemetry check can be run against re-parameterised replays of the same stored attempts.

### 14. What the PR #11 salvage contributed, and what it did not

`docs/imports/2026-08-02-pr11-salvage/2026-07-30-evidence-and-mastery-rules.md` was read as an argued
position and **adopted nowhere**. Its body carries *"Status: APPROVED 2026-07-30"*, which is a fact
about a branch and not about this repository.

**It is written in a retired vocabulary.** It cites *"LDB-03's seven families and six contracts"* —
F1–F7 — and Skill ids `C1`, `A4`, `B3`, `C2`, `P1`. The LDB-03 approved on `main` on 2026-08-01 has
**six Activity types** and eighteen kebab-case Skill ids. Its central artifact, a weight table with
per-family ceilings, has no referent here.

**What it got right and this document keeps:**

- Every code claim it makes. `controller.ts:360-362`, `:123`, `:218` and `validate.ts:65-66` were all
  reopened first-hand and all hold.
- Its structural finding that the durable schema already carries the needed fields, so this is a
  reducer rather than a migration — carried, with the one qualification in §11.
- Its `K-U6-005` safety argument (nothing persisted, one QA-harness importer) — re-verified
  independently rather than inherited, and adopted in D15.
- `A-06`'s cheaper first test — the re-failure comparison — which survives as D8's reopening trigger
  and is the single most useful idea in the draft.

**What this document answers rather than adopts:**

- Its weight table, which permits table-open mastery (D1).
- Its 3.0 threshold and five weights, replaced by two constants.
- Its `A-06` 14-day horizon, replaced by no horizon and a named trigger (D8).
- Its F5 exception with two constants, replaced by a scoring rule containing no number (D12).
- Its retirement of `K-U6-003`, which rested on completion and mastery being the same thing (D14).

**And it names its own defect, which this document takes seriously.** `findings.md` §1 records LDB-06
§6 registering two constants without ever stating a value while its self-check passed anyway, *"because
it only checked that every number present had a register row, never that every registered constant had
a number."* That is this project's **absence-as-proof** family in a new location. §15's check runs in
both directions.

### 15. Approval criteria — checkable

The card's three tests, enumerated positively. Nothing below is satisfied by the absence of a
counter-example.

1. **A played hand can satisfy mastery.** `deal-and-decide` is `primaryFor` all eight decision Skills
   (`hit`, `stand`, `double`, `split`, `classify-hand`, `strategy-action`, `legal-fallback`,
   `adherence-under-loss`) and under D6 is the **only** route to those bars. Its `shown` field is
   *"a Decision situation as dealt cards plus the dealer upcard"* and its `provenance` is
   `["organic","arranged"]`, so it cannot be posed — reaching those bars requires dealt cards.
   Multiple choice cannot reach them at all. D14 removes the rule that made a played hand incapable
   of satisfying completion. *(The taxonomy declares no `interaction` field on an Activity type —
   the widget is deliberately outside it — so this criterion is checked against `shown` and
   `provenance`, not against `InteractionMode`.)*
2. **No threshold is stated without a register row.** Exactly two numbers appear in this design —
   `k = 8` and `n = 10` — filed as one pooled `A-07` sub-row with a named validation method (§10).
   **Checked in both directions:** every number written here has a row, **and** every constant this
   document registers has a number. D8, D11 and D12 each retire a constant the branch draft left
   unvalued rather than inheriting it.
3. **Confidence appears in no mastery calculation.** Searched this document for confidence as an
   input: it appears only in exclusions. No clause of D1–D13 accepts a learner self-rating, and D12
   removed the one calibration-shaped mechanism that could have carried one. `A-17`'s `P-5`
   measurement lives outside mastery, as a paired self-report series alongside measured accuracy,
   never folded in — contract C-E forbids the fold.

**Additionally checkable at the gate:** the six parameters in D11 each carry a value or an explicit
declination; the four divergences in §12 are each stated rather than applied; and the glossary terms
in §16 are landed **at approval**, not before.

### 16. Vocabulary owed to `CONTEXT.md` — to land at approval, not before

Four terms crystallised in this design and are absent from the glossary. **They are deliberately not
written yet.** Nothing here is approved, and writing rulings into an authority document ahead of its
gate is the PR #11 failure exactly — a decision adopted by side effect rather than at a gate. On
approval, add:

- **Mastery** — the claim that a learner can perform a Skill's Learning outcome unaided, computed from
  recent evidence. Never a permanent property, never a lock. *Avoid:* completion, proficiency, level.
- **Presentation** — one posing of one item to the learner, together with every response to it. The
  unit the mastery window counts. *Avoid:* attempt (when the presentation is meant), question, item.
- **Review due** — the state of a Skill whose mastery was reached and whose recent evidence no longer
  meets the bar. A prompt to return, never a demotion. *Avoid:* expired, lapsed, decayed, lost.
- **Completion** — that a learner performed the required steps of a unit. Distinct from Mastery: it
  records work done, not capability shown, and it is the economy's trigger. *Avoid:* mastery, done,
  passed.
