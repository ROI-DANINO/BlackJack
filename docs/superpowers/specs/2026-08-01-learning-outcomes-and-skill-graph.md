# Learning Outcomes and the Skill Graph — LDB-01

> **Status: APPROVED 2026-08-01** (owner, `LDB-01` user-approval gate). Authoritative for what is
> taught and what must precede what.
>
> Discharges `ROADMAP.md` §Phase 4 deliverables **1** (skill graph and prerequisites) and **2**
> (learning outcomes, including probability, EV and variance).
>
> **The graph itself is data**, not prose: `docs/superpowers/specs/2026-08-01-skill-graph.json`.
> This document states what was decided and why; the JSON is the artifact phase 5 consumes. That
> split is deliberate — see §7.

**Binding input:** `docs/superpowers/specs/2026-07-22-product-design-inputs.md`. Its §0 states what
may not be leaned on. **Vocabulary:** `CONTEXT.md` is authoritative for every term used here.

---

## 0. What this document decides, and what it does not

**Decides:** the Skills, their Learning outcomes, the prerequisite edges between them, the Condition
axes evidence is recorded against, and the two bridge decisions that had no other owner (whether EV
is taught explicitly; whether a simplified false heuristic is adopted as a scaffold).

**Does not decide, and must not be read as deciding:**

- **Activity formats.** LDB-03. `FOR-LDB-03.md:49-52` binds this document directly: *"nothing in that
  unit evidences that changing the format alone changes what a learner learns."* No Learning outcome
  below names a widget, and none is justified by a format measuring it better.
- **Thresholds, counts, intervals, durations.** LDB-04 and LDB-06. Every one inherits `A-07`.
- **Whether anything is gated or locked.** LDB-04 and LDB-06. A prerequisite here is a comprehension
  claim, never a lock (§3).
- **Session mechanism for rare-event exposure.** LDB-06, including the contradiction the bridge
  carries between its §4.6 and §7.

---

## 1. The model

Seven terms, each defined in `CONTEXT.md` and used strictly. The three that changed something:

**A Skill is the graph node.** Not "capability", not "outcome", not "learning target" — the shipped
durable schema had already begun this rename (`web/src/progress/types.ts:79`: *"Today's `outcomeId`,
renamed"*), and this document finishes it.

**A Condition of evidence is not a Skill.** Four axes — **support**, **scope**, **ruleset**, **pace**
— record how a Skill was exercised. This is where most of the old 7-stage hierarchy went (§4).

**A Decision situation is not a dealt hand.** The situation is the player hand shape, the dealer
upcard, and the ruleset; the dealt hand is one *provenance* of a situation. Splitting them is what
lets an activity pose a situation without dealing while keeping the Cell derivable (§6).

---

## 2. Learning outcomes — the form, and the test

Every Learning outcome takes one form:

> **Given** ⟨a class of Decision situation or stimulus⟩
> **the learner** ⟨observable act⟩
> **judged by** ⟨grading authority⟩
> **classification included:** ⟨yes / no⟩

**The ship test** — and it is the whole content of "observable":

> **A Learning outcome that cannot name a grading authority other than `none` is not observable, and
> does not ship.**

This is not a new field. `web/src/progress/types.ts:99-101` already ships
`gradedBy.authority: 'engine' | 'oracle' | 'catalog' | 'none'`. The test costs nothing to apply and
cannot be argued around: *"understands variance"* names no authority and is rejected mechanically.

**The classification flag exists because bridge §4.3 is otherwise unenforceable.** *"If an activity
tells the learner 'this is a soft total,' it is not measuring the skill."* Declaring per-outcome
whether Classification is part of it turns that from a slogan into a per-Skill property LDB-03 must
respect. *(Evidence-backed — the separation of classification from action selection is P2 Bottom line
A.2: discrimination errors 46% vs 10%; 72% vs 38%, d=1.05.)*

**Conditions are deliberately absent from the form.** Including them would spawn four outcomes per
Skill. An outcome states the behaviour; LDB-04 decides which conditions it must be shown under.

---

## 3. Prerequisites mean comprehension, not order

**An edge asserts: the later Skill's Learning outcome cannot be stated or attempted without the
earlier one.** It does not assert teaching order, and it locks nothing.

This is a narrowing, and it is the point. `AGENTS.md` already names the failure on the kanban —
*"Never encode priority as a dependency"* — and the same defect in a skill graph would smuggle
untested pedagogy in as structure. `K-U7-003` and `K-U7-007` record that this project has **no
citation for any of its orderings**. Under this definition those orderings are simply not edges;
they are sequencing choices LDB-06 makes, and a register row covers any that get asserted.

**Consequence, stated so it is not mistaken for an omission:** the graph is thinner than a curriculum
designer would expect. "Hard totals before soft totals" is not an edge. `hit` and `stand` have **no
prerequisites at all**, because "takes the Hit action" is stateable without anything else. That is
honest, not incomplete.

**One edge is Evidence-backed**, and only one: `classify-hand → strategy-action`. Every other edge is
**Product judgement**. No edge is an Assumption, so no edge takes a register row.

---

## 4. The 7-stage hierarchy is split, not adopted

`A-01` names the 7-stage order (game literacy → … → automaticity) as an Assumption and says it is
*"Decided at `LDB-01`."* This document decides it by observing that the list contains two different
kinds of thing:

| Stages | What they actually name | Disposition |
|---|---|---|
| 1–3 — game / rule / chart literacy | **content** | absorbed into the existing Subject partition |
| 4–7 — decision recall, procedural transfer, ruleset transfer, automaticity | **conditions of performance** | become the four Condition axes |

Stages 4–7 are each "the same Skill under a harder condition": support removed, scope widened to a
full hand, a novel ruleset, time pressure. None is a thing a learner knows.

**This was already half-true in shipped code.** `progress/types.ts:86-91` records `interaction`,
`difficultyBand`, `assistance` and `tableVisibility` per attempt, and the approved slice design calls
`tableOpen` *"the assistance that matters, and it is the project's mastery axis."* That is stage 4,
already living as a condition.

**Axis ordering.** Only **support** is asserted as primary, and that is an owner decision
(2026-07-23), not a new bet. **Scope, ruleset and pace are unordered** — LDB-06 orders them against
data. Asserting a four-step progression would have manufactured three Assumptions with nothing behind
them. `A-02` (accuracy before pace) is **inherited, not newly asserted**.

**The axis set is open.** Card counting is expected to add a fifth (count visible / hidden). Naming
it open now means a later axis is an extension rather than a schema break. *(Product judgement.)*

**Subject is the sole content partition.** *(Product judgement — `K-U7-008`; "which subjects precede
which" is §B in the P2 taxonomy, free to change with a label, and takes **no register row**.)*
"Game / rule / chart literacy" survive as prose in a Subject's goal, not as structure.

---

## 5. What is taught — and the two bridge decisions

### 5.1 Probability, EV and variance ship only where they change a decision

`ROADMAP.md:110` requires outcomes for probability, EV and variance. This document discharges that by
**decision behaviour rather than by topic coverage**, and builds **no fourth Subject**.

The reason is the strongest evidence the bridge holds. §1.7 `[VERIFIED]` — which the bridge itself
calls *"the single most important line in this document for scoping"* — is that 198 students taught
probability theory **using gambling examples** showed superior odds calculation and resistance to
gambling fallacies six months later, and **no change in actual gambling behaviour**. A standalone
maths Subject is that study's arm that did not work.

**But experience alone is not sufficient either.** §1.2 `[VERIFIED]`: this product teaches by dealing
hands, and experience-taught learners **systematically underweight rare events**. Something must
describe the tail. Under this decision that something is **not a lesson unit** — it is a debrief after
a shoe, a prediction captured before one, and frequency framing in feedback copy. Results and stakes,
not a teaching surface.

Two Skills carry it, both in Subject B: **`variance-expectation`** (predict-then-reveal, judged by
catalog) and **`adherence-under-loss`** (judged by oracle). The second is the decision variance
actually changes — not which action is chosen, but whether correct play survives a losing streak.

**This requires a `ROADMAP.md:110` amendment**, recorded in `journal/decisions.md`.

### 5.2 EV is not taught explicitly `[Product judgement, provisional on P-2 / A-14]`

**No Skill.** EV appears only as rationale in feedback copy — "this play wins more over many hands" —
which is legitimate under §5.1 because it justifies a decision rather than being a topic.

Grounds, all three independent of each other:

- Basic strategy **is** the EV-maximising policy, precomputed. Verified: every legal-action set the
  engine can produce is a subset of `{Hit, Stand, Double, Split}` (`rules.rs:72-116`), and the oracle
  maps every chart cell into that set with legality fallbacks (`strategy.rs:162-179, 235-261`).
- §2.2 is **evidenced absence** — no study measuring whether EV instruction improves in-game
  decisions. Further collection is **not authorised**.
- §1.8's on-domain source contends that inferring EV from subjective probability may be *"both
  uncommon and non-normative"* even in blackjack.

**Reopening condition, recorded because it is a config flag and not a law:** insurance is the one
in-scope decision the strategy table does not cover. It is currently removed from the decision space
by `insurance_auto_decline: true` (`types.rs:73`, `rules.rs:25,29-34`, `session.rs:101-104`,
`web/src/learn/engine.ts:30`) — the learner never faces it. **If insurance is ever surfaced as
teachable, this decision reopens**, because the table has no row for it. The bridge is silent on
insurance entirely.

**Consequence: `P-2` is declared out of the phase-5 subset.** Not undiscovered — deliberate. `A-14`
goes dormant: no product surface depends on it, and it cannot be *closed*, because choosing not to
teach something is not a measurement.

### 5.3 The false heuristic is an explanatory frame, never a policy `[Product judgement, provisional on P-4 / A-16]`

§1.8 records that casino players use *"assume the next card is a ten"*, that it is easier to learn
than optimal strategy, and that its use is associated with better expected returns. The bridge calls
adopting it *"a genuine design option, not a concession."*

**It is adopted as an explanation and refused as a policy.** It may explain why the dealer busts on a
6 and why standing on stiff hands works. It never issues a recommended action and is never a grading
authority.

Two grounds, both established first-hand against the source rather than inherited:

1. **It inverts more than half the stiff-hand decision space.** Against the shipped table, the
   heuristic implies Stand where the table says Hit on **27 of 50 hard-12–16 cells**, identical under
   H17 and S17 — including **hard 16 vs dealer 10**, which the approved slice design singles out as
   *"the most counterintuitive call in basic strategy and the one most players get wrong."* Verified:
   both hard tables carry `"SSSSSHHHHH"` at the 16 row (`strategy.rs:33`, `:74`).
2. **Teaching it as policy needs a second grading authority.** Bridge §5 makes basic-strategy
   correctness a deterministic oracle, and the approved slice states *"no TypeScript fallback for a
   strategy answer, ever."* A policy the oracle punishes across half the decision space is not
   shippable without breaking that.

**Recorded defect in the evidence, not acted on here.** Bridge §1.8 says the heuristic is associated
with better returns *"than unaided play"*, and the header says *"outperforms nothing-at-all."* The
archive holds **only the publisher abstract** (verified first-hand, twice, at abstract level; the full
text is nowhere in the repo). The abstract names **no comparator**. §1.8 also omits the Q4-tier and
abstract-only pairing its own dossier mandates, while sitting under a banner reading *"Evidence-backed
and independently verified."* `P3-evidence-catalog.md:236` reproduces the same phrase, so correcting
one alone re-creates the drift.

**That correction is filed as separate work and is deliberately not applied here** — a Revise gets an
independent re-check before landing, and *"a correction pass reading reviewer records without
reopening the source"* is this repo's named inherited-error class. The decision above does not depend
on it: both grounds are structural.

**Consequence: `P-4` is declared out of the phase-5 subset**, and `A-16`'s validation method is
rewritten, because `P-4` as written requires an arm that *plays* the heuristic and no such arm will
be built.

### 5.4 The phase-5 playtest subset

**`P-1`, `P-3`, `P-5`.** `P-2` and `P-4` are excluded by §5.2 and §5.3.

`LDB-08` must record this as a **deliberate exclusion**, not inherit it as coverage. The standing
graded-decision-practice candidate happens to cover exactly this subset. **That convergence is not
confirmation** — `LDB-02` already ruled that one author's judgement converging on a pre-existing plan
is not independent support, and the same caution applies to this document. `LDB-08` confirms the
slice against the finished blueprint or replaces it.

---

## 6. Cells are derived, not authored

An approved decision of 2026-07-17 left curriculum owing a cell grammar: the port *"fixes the opaque
`cellId` field and its stability contract while **curriculum owns the grammar**, and no real write
happens until the catalog assigns stable injective cell ids."* That obligation has blocked writes
since.

**It is discharged by dissolving it.** A Cell is a pure function of a Decision situation — player hand
shape, dealer upcard, ruleset profile. Everything that function needs is already persisted
(`progress/types.ts:99-103`). So the Cell is **derived by construction and stored as a cache**;
injectivity follows from the encoding rather than from a curriculum promise. There is no grammar to
invent.

**Why store it at all rather than derive on read:** an exported attempt log stays readable without a
WASM oracle in the loop, which is what `AGENTS.md`'s preference for serializable boundaries asks for.

**A boundary that must be stated or the cell grammar will be misread as a licence.** A `cellId` on an
attempt says where evidence came from. It is **not** a licence to drill cells as items:
`classification.md:128-130` holds that decomposing a whole-policy response into per-cell items
*"destroys the measurement, because presenting the cells supplies the recall."*

**Undealt situations.** An activity may pose a Decision situation without dealing. It may **not**
render cards that did not come from a shoe — if cards are shown, they were dealt. A shape-named prompt
("soft 18 vs 9") supplies the Classification for free and may therefore only serve Skills whose
Learning outcome has `classificationIncluded: false`. *(Product judgement, derived from bridge §4.3
and `AGENTS.md`'s card-origin traceability constraint.)*

---

## 7. Why the graph is data

The deliverable is this document **plus** `2026-08-01-skill-graph.json`.

`AGENTS.md`'s evidence discipline states that *"corrections do not execute themselves"* — three
research phases produced corrections that landed in audit records and never reached the documents
they concerned, and **14 survived a pass built to certify they had all landed**. A prose skill graph
plus a hand-transcription step in phase 5 is that failure mode, pre-installed.

Writing it as data is not building: no UI, no behaviour, no engine change. It also makes both of this
card's approval criteria **fields** — `evidenceLabel` on every edge, `judgedBy` on every outcome — so
a script can check them rather than a reviewer reading for them.

---

## 8. The shipped 16 Skills

`web/src/learn/content/blackjack-basics.ts:14-29` declares 16. **Twelve survive**, restated.

- **Four compounds lose their "explain" half** — `hit`, `stand`, `double`, `split` were all *"Explain
  and use X."* Two acts, no single grading authority. The "use" half is kept. This is §1.7 applied,
  and `A-10` already rates multiple choice *"very low — likely to be retired rather than validated."*
- **`complete-round` is demoted to a Condition** (`scope: full-hand`). It was stage 5, procedural
  transfer, wearing a Skill costume.
- **`goal` is dropped as a Skill** — a knowledge claim whose only possible authority is `catalog`. It
  survives as framing prose in a Subject goal.
- **`round-flow` and `split-hands` are dropped** — *"Follow…"* names no observable act. Both are
  absorbed by `scope: full-hand`.

**Ids are kept wherever the referent survives**, because they are already on shipped attempt records
and re-keying costs a `schemaVersion` migration for no gain.

**Subject B has only five Skills and Subject C only one.** That is the model working, not an
oversight: most of what the old spine listed for those subjects — chart-open / faded / hidden
practice, full-hand transfer, noticing a rule change — turned out to be **Conditions**, not content.

**This will look like regression on a progress screen** — Subject A ends with fewer Skills than it has
today. It is not.

---

## 9. Register delta

**Net new rows: zero.** A design card that adds no assumptions is unusual and is stated here so it can
be checked rather than assumed.

| Row | Change |
|---|---|
| `A-01` | **Substantially dissolved.** The 7-stage order is no longer asserted; stages 1–3 are absorbed into Subject, 4–7 become Condition axes. What remains is `A-02`. |
| `A-02` | **Inherited, not newly asserted.** Pace is an axis; no ordering against it is claimed here. |
| `A-14` | **Dormant** — no product surface depends on it. Reopening condition recorded (§5.2). |
| `A-16` | **Validation method rewritten** — `P-4` as written requires a heuristic-policy arm that will not be built. |
| `A-07` | Inherited by `variance-expectation`'s scoring band, which is unset here. |

---

## 10. Schema deltas owed to phase 5

Specified here, executed there. None is applied by this document.

1. **Split `AttemptEngineContext`** into a Decision situation (always present on a strategy attempt)
   and a dealt-hand provenance (present only when cards were dealt). Today a null `engine` loses the
   situation along with the provenance.
2. **`cellId` becomes derived-by-construction**, cached. Encoding to be fixed in phase 5.
3. **Finish the `outcomeId` → `skillId` rename** across `Unit.outcomes`, `QuestionStep.outcomeId`,
   `HandStep.outcomeId`, `RecapStep.capabilities`, `AttemptRecord.outcomeId`, and `validate.ts`.
4. **Remove the four retired Skills** from `blackjack-basics.ts` and re-point the `Unit.prerequisites`
   and `Unit.outcomes` arrays that name them.
5. **Retire the recap capability copy pattern** — `K-U6-009` records that *"You can explain and use
   Hit"* asserts learner capability and is never conditioned on evidence.

---

## 11. Approval criteria — checkable

From the `LDB-01` card, with how each is verified:

| Criterion | Check |
|---|---|
| Every outcome is an observable decision behaviour | every `skills[].outcome.judgedBy` in the JSON is `engine`, `oracle` or `catalog`; none is `none` |
| Every edge carries an evidence label | every `prerequisites[].evidenceLabel` is present |
| Every assumption has a register row | net new assumptions: zero (§9) |
| `A-01` is no longer "Decided at LDB-01" | §4, and the register edit |
