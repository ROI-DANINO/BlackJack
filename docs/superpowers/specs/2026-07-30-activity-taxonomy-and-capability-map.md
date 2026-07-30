# Activity Taxonomy and Capability Map — LDB-03

> **Status: draft for approval.** Gate: user-approval. ROADMAP Phase 4 deliverables 3 (activity
> taxonomy) and 4 (which activity measures which capability).
>
> **Inputs.** `2026-07-22-product-design-inputs.md` §4 (the six activity-evidence requirements);
> the 18 approved outcomes of `2026-07-30-learning-outcomes-and-skill-graph.md` (LDB-01); the 32
> patterns of the LDB-02 catalog, read at `run/U1|U2|U3/audit.md` rather than from summary.
>
> **What this decides.** The closed list of activity families, what each may and may not measure, the
> contracts that bind every family, and an adopt-or-reject verdict with a reason for all 32 patterns.
> It does **not** decide mastery thresholds (LDB-04), session size or mix (LDB-06), or the
> interaction contract and WCAG target (LDB-07).

---

## 0. Three families already exist, and that is the starting point

The approved activity evidence set of 2026-07-16 (`journal/decisions.md:30`) admitted **three
deterministic activity families** — Multiple Choice, Assemble Blocks, Engine-Backed Hand — with 41
`ALR-*` requirements attached. This document does not replace them. It keeps all three, demotes one,
and adds four, because the 18 approved outcomes include capabilities no existing family can measure:
a calibrated numeric estimate, a deferred session-level verdict, a whole policy, and free production.

**The demotion matters most.** Multiple Choice currently governs **100% of shipped mastery evidence**
(`validate.ts:65-66`), and `A-10` rates that assumption *"Very low — likely to be retired rather than
validated"*, since none of the three sources cited for it addresses format validity (`K-U4-003`).
§4.1 and the LDB-01 outcomes settle it: recognition may not be the sole evidence for any outcome that
is a decision.

---

## 1. The taxonomy — seven families

| # | Family | The learner… | May measure | May **not** measure |
|---|---|---|---|---|
| **F1** | **Recognition check** *(existing: Multiple Choice)* | selects from a bounded option set | outcomes whose real task is itself recognition | any decision outcome, as sole evidence |
| **F2** | **Ordered assembly** *(existing: Assemble Blocks)* | arranges an **over-supplied** pool into a sequence, leaving distractors unused | sequence knowledge, where enumerating the orderings as options would *supply* arrangements the learner must produce — the two admission conditions in §4 | any ordering an option set could pose to the same effect; any pool that supplies rather than over-supplies; any behavioural outcome, as primary evidence |
| **F3** | **Engine-backed hand** *(existing)* | plays dealt state to resolution through the engine | decision outcomes, procedural transfer | distributional concepts without a prediction |
| **F4** | **Free production** *(new)* | produces the answer with no option set — names, enumerates, or writes a rule | recall breadth, abstraction across cells | anything requiring graded natural language |
| **F5** | **Calibrated estimate** *(new)* | states a probability or interval under a proper scoring rule | calibration, distributional literacy | correctness on any single estimate |
| **F6** | **Deferred-verdict session** *(new)* | plays an uninterrupted run; judgement arrives only at a debrief | decision/outcome separation, session-level behaviour | anything needing immediate correction |
| **F7** | **Whole-policy production** *(new)* | produces a complete policy over a space that is never presented cell by cell | whether a policy is held, as distinct from cells recalled | individual cell recall |

**F7 exists because decomposition destroys the measurement.** The catalog is explicit: presenting the
cells supplies the recall, so a policy test decomposed into per-cell items is no longer a policy test.
F7 is the only family that can measure `B3` as *policy* rather than as accumulated recognition.

**F5 exists because no other family can be scored on calibration.** Every other family scores an
attempt right or wrong; calibration is a property of a *series* of estimates and is meaningless on one.

---

## 2. Cross-cutting contracts

These bind every family. A family is not a licence to skip them.

**C-A — Classification gate (§4.3), and it is recorded separately.** **Scope, stated in §4.3's own
terms: wherever the real task requires classification.** Where it applies, the activity must capture
the learner's classification *before* offering the action, and must never display the class. An
activity that says "this is a soft total" is not measuring the skill. This is what makes `A2` and `B1`
measurable inside F3 rather than needing a family of their own — a standalone classification exercise
would be recognition, which §4.1 forbids for a decision outcome. The §3 map is authoritative on which
rows carry C-A; an earlier draft said "any activity measuring a decision outcome", which was wider
than §4.3 and wider than the map it was meant to describe.

**The capture is recorded as its own attempt datum, under its own outcome id, scorable and gateable
independently of the action taken on the same hand.** A gate that captured the classification and then
folded it into one right-or-wrong verdict on the hand would satisfy the wording of §4.3 while
producing no separable measurement.

**Evidence level, corrected.** An earlier draft justified this clause by presenting *"classification
should be measured separately from action selection"* as a finding of the corpus. **§1.1 contains no
measurement prescription.** What §1.1 supports is that interleaving improves *discrimination between
kinds of problems* and strengthens the kind→strategy association — which licenses never handing the
learner the classification, and nothing about how to score it. The separate-scoring step is
`A-24`, an **Assumption** at "Medium on the requirement, unknown on the step", and LDB-01 §3 drew
exactly this line one card earlier. **This clause is the operationalisation of `A-24` and carries its
label**, not the evidence's.

Two consequences follow, and both are requirements:

1. A learner who classifies correctly and then plays the wrong action must be distinguishable in the
   record from one who misclassified and played consistently with their error. **The derivation rule,
   stated because the requirement is otherwise satisfiable-but-unspecified:** class + total + upcard
   determines a chart cell, so the action is scored **twice** — against the true class, and against
   the class the learner asserted. Consistency-with-own-error is the second score passing while the
   first fails.
2. Mastery of a classification outcome may be computed from classification data alone, without a
   correct action on the same hand.

**C-B — Prediction gate (§4.4).** No distributional display renders until a prediction is recorded.
Applies to F3, F5 and F6 alike.

*Provenance stated honestly:* §4.4's usual citation is §1.4, which `§0` of the bridge marks
`[DEFECTIVE-SOURCE]` and which was **not reopened here**. C-B is carried as an approved product
requirement, labelled **Product judgement**, not as an evidence-backed finding.

*The empirical half, separated out and registered.* An earlier draft asserted alongside the rule that
"a simulation that does not first capture a prediction is decoration." That is not a design rule but a
falsifiable proposition about what teaches — and its only warrant is the `[DEFECTIVE-SOURCE]` §1.4
this contract has just disclosed it did not reopen. It matters more than its one sentence, because C-B
carries `P2` entirely, gates F3/F5/F6, is the sole surviving form of `U2-5`, and is the only condition
under which `U2-13` is admitted. It is now registered as **`A-29`** with a named validation method,
and the requirement above stands without it.

**C-C — No jeopardy verdict, which is narrower than "grade nothing".** The debrief issues no
pass/fail verdict. It does **not** follow that nothing is scored — a score may exist without being
surfaced as jeopardy. This is the corrected reading: the aviation guide the catalog draws on asserts
no-jeopardy training in one chapter, denies the concept in another, and ships a graded per-individual
assessment form with a signature line. What survives is the narrow rule only.

**C-D — Assistance honesty (§4.5).** An activity records an assistance level only when that
assistance was actually delivered. **This contract is violated in shipped code today**:
`controller.ts:123` labels a second bare retry `'instruction'` when no instruction exists and no hint
ladder is built (`K-U6-005`, outstanding). LDB-04 owns the fix; no family here may add a second
instance.

**C-E — No learner self-rating as a mastery signal.** Never, in any family. Kornell & Bjork: 78% of
learners performed better under spaced practice and 78% rated massed practice as good or better. **The
learner does not know what worked.** This is the sole reason `U2-9` is rejected below despite being
otherwise buildable.

**C-F — Pool composition is declared (§4.2).** Added 2026-07-30: an earlier draft of this document
discharged five of the bridge's six §4 requirements and **decided §4.2 by silence** — neither imposing
it nor handing it forward, while §6's own "handed forward so silence is not read as a ruling" list
omitted it. §4.2 is the mixed-by-default ruling that resolved `CFL-007` (*block to introduce,
interleave to practise*), and it carries a declaration obligation: a blocked pool is permitted **only**
for first exposure to a category and **must be declared as such**.

Split by altitude, so neither half is orphaned again:

- **This card's half, binding now.** Any activity that draws its items from a pool declares that
  pool's composition — mixed, or blocked-for-first-exposure — as activity metadata. An activity that
  does not declare it is not eligible, on the same footing as `ALR-024`'s other eligibility checks.
- **`LDB-06`'s half, handed forward by name.** The pool *policy* — what is mixed with what, when a
  category graduates from first exposure, and session-level mix — belongs to session composition.
  LDB-06's card already carries the mixed-by-default ruling and the bridge contradiction it must
  resolve; this contract supplies the per-activity declaration its policy will read.

Provisional on `P-3` / `A-15`: the CFL-007 ruling is explicitly labelled a bet on untested domain
transfer, so the declaration is what makes the bet measurable rather than assumed.

---

## 3. The capability map

Every one of LDB-01's 18 outcomes, and the family that measures it. **Bold** = primary evidence.

| Outcome | Family | Contracts | Note |
|---|---|---|---|
| `A1` pursue the dealer, not 21 | **F3** | C-A | Only the discriminating case counts — low total vs weak upcard. |
| `A2` read a hand before acting | **F3** (via C-A), F4 | C-A | The classification capture *is* the measurement. |
| `A3` read what the dealer shows and hides | **F3** | C-B | *Not F2:* the forced draw sequence is not a permutation — its length is data-dependent on the unseen hole card, so there is no fixed element set to arrange. Its approved form is predict-before-reveal. |
| `A4` legal action through a full round | **F3**, F2 *(supporting)* | C-F | F2 isolates the order-of-play dimension F3 confounds with action legality. **Supporting, not primary:** A4's approved form is behavioural — play a round to resolution — and F2 measures declarative sequence knowledge, which LDB-01's admissibility test forbids standing for a behavioural outcome. Step list and the shipped-instance reconciliation in §4. |
| `A5` settle a round before it settles itself | **F3** | C-B | Prediction before payout renders. |
| `B1` classify before lookup | **F3** (via C-A) | C-A | *Not F2:* B1 is not a sequencing task — its response is a classification per hand under an order the curriculum fixes and prints, so F2 is inapplicable regardless of count. The C-A datum is the measurement. |
| `B2` charted action, chart open | **F3** | C-A | |
| `B3` charted action, chart withdrawn | **F3**, **F7**, F4 | C-A | F3 measures cells; F7 measures whether a policy is held. F4 carries the chart-withdrawn recall-breadth forms adopted from `U3-1` and `U3-9`. |
| `B4` fall back when the action is illegal | **F3** | C-A | |
| `B5` full evolving hand at charted correctness | **F3** | C-A | |
| `B6` judge the decision, not the result | **F6** | C-C | Behavioural only — the attitudinal version measures nothing (§1.3). |
| `C1` identify the active ruleset | **F1** | — | The one legitimate sole use of recognition: the real task *is* recognition. |
| `C2` change the answer when the rule changes | **F3** (paired rulesets), F7 | C-A | Scored on delta cells only. |
| `C3` adapt to a mid-session rule change | **F6** | C-C | Unprompted application; registered `A-25`. |
| `P1` calibrated estimate, not a right answer | **F5** | C-B | Scored over a series, never one estimate. |
| `P2` commit a prediction before the distribution | **C-B itself** | C-B | A contract rather than a family — it gates F3/F5/F6. |
| `P3` read an EV statement without deciding by it | **F1** (interpretation half), **F3** (in-play half) | C-A | **Two halves, and an earlier draft measured only one.** The interpretation half — state which play loses less — is recognition-shaped and F1 serves it. The approved outcome also says *"in play, still choose the charted action"*, which is a decision behaviour: measured on B2/B3 hands as a **non-deviation condition**, in F3. `D-1` rules EV is never a decision *rule*; that is not the same as P3 having no decision component, and this document does **not** amend LDB-01's ruling that `C1` is the only recognition-admissible outcome. F5 is dropped: it may not score correctness on a single estimate, which is what P3's comparative judgement requires. |
| `P4` keep playing correctly through a losing run | **F6** | C-C, §4.6 | The losing run is engineered, not awaited. Registered `A-26`. |

**Coverage holds in both directions.** All 18 outcomes have a family. Every family has at least one
outcome. F1's total scope is `C1` and a supporting role on `P3` — both non-decision — which is what
discharges the card's clause that no decision capability is measured only by recognition.

---

## 4. The word-bank / Parsons ruling

**The inconsistency.** U2 rejected word-bank tile assembly. U3 admitted Parsons-style fragment
assembly as a qualifying pattern. These are the same interaction — a supplied pool, one target
arrangement — and each unit is defensible alone. FOR-LDB-03 requires this be ruled once, in writing.

**Ruling: two admission conditions. A supplied-pool activity is F2 only if it meets both.** Both are
**this document's own test, authored here** — see the attribution note below, which corrects an
earlier draft that presented the test as an excavation of the classifier's reasoning.

> **Condition 1 — the option-set form must not pose the same question to the same effect.** It fails
> to when enumerating the candidate orderings would **supply** arrangements the learner would
> otherwise have to produce. *(Product judgement — a criterion for admitting activities, not a
> finding.)*
>
> **Condition 2 — the pool must over-supply.** It must contain distractors that have to be left
> unused, so that using it requires *rejection* and not merely arrangement. *(Empirical half
> registered as `A-28`.)*
>
> Fail either, and the activity is cosmetic and rejected.

**Condition 1 is a supply test, and an earlier draft got this wrong in a way worth recording.** That
draft made it a *cardinality* test: three elements is six permutations, which an option set can hold,
so cosmetic; six is 720, which none can, so substantive. Three objections, all of which land:

1. **It drops the classifier's actual criterion.** The operative test is whether the question could be
   posed *"to the same effect"* with a selection widget. Feasibility-of-rendering is a cardinality
   property; effect-equivalence is a measurement property. They are different tests.
2. **Cardinality contradicts this document's own governing logic.** §1 rests F7 on supply —
   "presenting the cells supplies the recall" — and condition 2 on supply. An option set over six
   orderings *supplies the six candidate orderings*. By this document's own criterion elsewhere, that
   is **not** the same question to the same effect, so the worked example refuted itself.
3. **The threshold was undefined and applied asymmetrically** — numerically to reject `B1` at six
   permutations, qualitatively to admit `A4` with no count stated anywhere.

Element count is therefore an **illustration, not the criterion**. A long ordering usually fails
condition 1 because enumerating it would supply arrangements; a short one usually passes because it
would not. Rule on supply per instance.

**Why condition 2 is what makes a pool safe.** It is stated in U3-7's own description — *"some of
which may be distractors that must be left unused."* A pool holding exactly the answer **supplies**
it. A pool that over-supplies forces the learner to reject, and **rejection is discrimination**
(`A-28`) — a claim this document infers rather than holds, and labels here at the point of assertion
rather than in a footnote. `A-28` records the gap precisely: §1.1's discrimination is between *kinds of
problem* (is this a soft 16 or a pair of 8s), pool rejection is between *correct and incorrect
procedural steps*, and **no held source connects the two**.

**Attribution, corrected.** An earlier draft claimed condition 1 was "the real content of the cosmetic
call" and that U3-7 "is cosmetic in the short-sequence instances the classifier judged." Both are
false about the source. The classifier's recorded ground for treating word-bank and Parsons as one
interaction is *"a supplied pool, one target arrangement"* — **supply and arrangement; length is named
nowhere**, and the U3-7 row records no fragment count. Attributing a length reading to reasoning that
does not carry it is the error class this repo's evidence discipline names first, and it is corrected
rather than softened.

**What follows for U3-7's sourced form.** It **already satisfies condition 2** — the distractors are
in the audit row verbatim. Condition 1 is **indeterminate** for it, because nobody holds a fragment
count. So these conditions do **not** ratify the catalog's cosmetic call on the sourced row; the
earlier draft's claim that the call "stands unchallenged" asserted an agreement it never established.
**The honest scope: this ruling constrains future instances built here. It neither confirms nor
overturns the classifier's call on the sourced pattern.**

**Applied, including against two of this document's own earlier mappings:**

- **Admitted** — order of play and resolution sequence under `A4`. The orderable step list, stated
  because an earlier draft asserted "enough elements" without one: *opening deal → player turn →
  dealer reveal → dealer draws to the rule → settlement → per-split-hand settlement in order*. Six
  steps, and the pool over-supplies with rejects such as a mis-placed hole-card reveal or the player
  acting after the dealer completes. **Reconciliation this document owes:** the same content ships
  today as a **two-option** question over four elements (`blackjack-basics.ts:199-210`,
  `round-order-check`). That instance is **cosmetic by condition 1** — two options supply both
  candidate arrangements — and it is evidence that the F2 form must be built with the fuller step list
  and an over-supplied pool, or not built at all. It is not evidence that the outcome is unreachable.
- **Rejected — `B1`, on a corrected ground.** `B1` is **not a sequencing task at all**: its approved
  response is *"produce the classification"* of a dealt hand, under an order the curriculum fixes and
  prints. The learner never arranges pair/soft/hard, so F2 is inapplicable regardless of count — and
  any assembly form would fail condition 2 anyway, since the single admissible answer is printed in
  the outcome definition. The permutation argument was invented to score a task that has no
  permutation response space.
- **Rejected — `A3`, on its load-bearing half only.** The dealer's draw sequence is **not a
  permutation**: its length is data-dependent on the unseen hole card, so there is no fixed element set
  to arrange, and `A3`'s approved form is predict-before-reveal (C-B). **Struck:** the earlier claim
  that its "content is the soft-17 condition, which is a decision." LDB-01 calls that sequence
  **forced** — the H17/S17 branch is the *dealer's* rule, not a learner decision — and the only shipped
  `dealer-info` evidence is about hole-card visibility, not soft 17.
- **Rejected** — any strategy-cell recall over a supplied pool, which fails condition 2: the pool
  supplies exactly the recall `B3` measures. This is where a word bank does its damage.

**Both units remain right in their own scope.** Word-bank assembly fails both conditions — a single
term, not an ordering, and the pool supplies it — so U2 was correct to reject it. Parsons-style
assembly can meet both, so U3 was correct to admit it as a pattern. What this document adds is a test
for instances, not a verdict on their rows.

**One provenance note this family owes — completed 2026-07-30 by opening the underlying record, which
an earlier draft of this section cited without opening.**

`ALR-007`–`012`, the six requirements attached to Assemble Blocks, **carry only an abstention** and
were assessed by nobody. That much is accurate, and the phrase is this project's own — it appears at
`P2-verdict-catalog.md:231` and `P2-unlanded-and-lost.md:189`. What the earlier draft omitted is the
part that changes what the abstention means.

`foundation-audit-p2/verification/V-U4.md:157-186`, under the heading *"Ruling on the ALR-007–ALR-012
abstention"*, rules it **"Partially legitimate; the stated rationale is wrong and must be
corrected."** The U4 audit abstained on all six on the ground that their evidence leans on `SCI-004`
and `SCI-009`; checked against the unit, that ground holds for **only two** — `ALR-007` and
`ALR-011`, which the verifier calls *"correct proportional restraint"*. The other four (`ALR-008`,
`ALR-009`, `ALR-010`, `ALR-012`) cite `DUO-004`, `TECH-001`, `TECH-002`, `STD-001` and `STD-002`, all
re-opened in that same pass, and so **were assessable from sources already in hand**. Correction
`C-U4-003` landed that finding; as `P2-unlanded-and-lost.md:189` puts it, *"the landing corrected the
reason for abstaining; it assessed nothing."*

**What that means here, and it is not what the earlier draft implied.** The abstention is a recorded
gap in the *audit's coverage* — four of the six were assessable and simply were not assessed — rather
than a finding that the requirements are weak. It is therefore **not** a reason to narrow F2, and this
document does not use it as one. F2's narrowing rests solely on the two admission conditions above,
which are this document's own reasoning and descend from none of the six. Condition 2's empirical half
— that an over-supplied pool measures discrimination rather than arrangement — is registered as
`A-28`.

---

## 5. Disposition of all 32 patterns

Every pattern adopted with a reason or rejected with one. Classified **from the sourced pattern**,
never from the candidate-capability column — three rows over-rate there and are marked ⚠.

### Adopted — 15

| ID | Family | Reason |
|---|---|---|
| U1-1 | F7 | The only pattern testing whether a *policy* is held. Decomposing it destroys the measurement. Highest-value larger build. |
| U1-2 | F5 | Probability behind an information cut-off, scored against the engine's value and never against what the shoe did — decision/outcome separation in estimate form. |
| U1-3 | F5 | Two-bound interval, hit-rate scored over a series. Pairs with U3-8 or is not worth building alone. |
| U1-4 | F3 + C-D | Scores *what the learner consults* before acting, separately from the answer. This is the honest form of assistance-as-recorded-input, and the direct antidote to `K-U6-005`'s flag-shaped mislabel. |
| U1-5 | F6 | Evidence-backed, independent. The deferral mechanism F6 is built on. |
| U1-6 | F6 | **Binary form only.** Deferred correct/not-correct is Now-tier. The catalogued EV-graded form is rejected — see below. |
| U1-7 | F4 | **Case-structure form only** (reduced to 2–5 critical decision points). The widget-only form is cosmetic by its own conditional determinant. |
| U1-8 | F3 | Part-task drill with a *fixed* reset point — repositioning, not re-dealing. Sits under F6, not beside it. |
| U1-9 | F6 | Episode-level scoring with criteria fixed in advance. The missing granularity between per-hand and per-session. |
| U3-1 | F4 | Unaided recall breadth over a region ("name every hand you would double against a 6"). One of the six. |
| U3-3 | F3 + C-D | Guidance-faded worked example. The *principle* is evidence-backed; the **rungs stay unspecified here** — they are `A-04`, and LDB-04/LDB-07 own them. |
| U3-4 | F4 | Contrasting-cases invention. Its value is demonstrably orthogonal to answer correctness, so no selection widget asks the same question. **Do not grade the invented rule** — that is the point of the pattern. |
| U3-5 | F6 | Mid-session resource applied unprompted; the sourced form saw what no other instrument could. Blackjack extension registered `A-25`. |
| U3-8 | F5 | Continuous estimate under a proper scoring rule. One of the six. |
| U3-9 | F4 | Convergent-cue abstraction — "these five hands take the same action". Derivable entirely from the oracle. |

**Two adopted with a build condition, not a design one:** `U2-6` (inverse chart cell — give the
answer, find the ruleset change that produces it) is adopted into **F7** as a cheap policy probe.
`U2-14` (free composition, "explain the play") is adopted into **F4 ungraded only** — graded, it
needs language understanding this project has no reason to build.

### Not adopted, or adopted only conditionally — 16 rows, each with its own reason

Eleven are outright rejections; five are the split, conditional and deferred dispositions reconciled
beneath the table. They sit here because this is where a reader looks for them.

| ID | Reason for rejection |
|---|---|
| U1-6 *(EV-graded form)* | **`D-1` forbids it and the machinery does not exist.** LDB-01 ruled EV is interpretive literacy, never a grading axis; independently, `strategy.rs` is a lookup returning an action and a crate-wide search for `expected_value\|expectimax\|monte-carlo` returns zero matches. Two independent grounds. |
| U2-1 | Cosmetic — typing a sentence in place of selecting it. Channel swap over an unchanged question. |
| U2-2 | Cosmetic — a microphone in place of a keyboard. The response deadline that *would* make it substantive is separable from the channel, and belongs to automaticity, which is out of LDB-01 scope. |
| U2-3 ⚠ | Cosmetic **as sourced** — tracing a *displayed* glyph. The blank-grid analogue over-rates it, is registered `A-21`, and is in any case already covered on its own merits by U1-1 in F7. |
| U2-4 | Cosmetic — a continuous widget over an unchanged question. Where continuous elicitation genuinely matters, F5 does it under a scoring rule. |
| U2-5 | *Adopted in part* — the sketch-before-reveal shape survives **as C-B**, which is where its value lives. Rejected as a standalone family: a drawing surface with an undecided grading story is a widget, not a measurement. |
| U2-7 | Cosmetic — card-sort over an unchanged classification question. C-A already requires classification, unsupplied, at the point of decision. |
| U2-8 | Cosmetic — semantic parsing of an entry whose question is unchanged. |
| U2-9 | **C-E.** Proposes learner self-rating as the signal, which U3's own evidence contradicts (78/78). Rejected on the contract, not on buildability. |
| U2-10 | Adopted **in principle** into F7, **deferred in build**: it needs a rule language and a parser, the largest single build in the catalog. F7 is opened by U1-1 and U2-6 instead. Recorded as deferred rather than rejected outright. |
| U2-11 ⚠ | Out of scope — running-count material, and LDB-01 scoped counting out. Also over-rates: the source is self-paced; external pacing appears only in the analogue. |
| U2-12 | Out of scope — external pacing is the automaticity rung, stage 7, explicitly later work. |
| U2-13 ⚠ | Admitted **only under C-B**. Over-rates as sourced (the source solves a puzzle; the analogue merely demonstrates), and `A-22` records that the teaching claim is unevidenced while the mechanic is free. The prediction gate is required by §4.4; that a sandbox without one *teaches nothing* is the empirical claim registered at `A-29`, not an established finding. |
| U3-2 | Cosmetic, and the word-bank half of §4's ruling — it fails **both** admission conditions: the response is a single term rather than an ordering, and the pool supplies the recall the outcome measures. |
| U3-6 | Rejected on its own evidence — the freer widget performed **worse** against the external criterion (r = .243 n.s. vs .551 p<.05; interrater 0.81 vs 0.92). Also the largest build of the substantive set. Lowest priority; not adopted. |
| U3-7 | **Conditionally admitted**, and the Parsons half of §4's ruling. Its *sourced* form already satisfies condition 2 (the distractors are in the audit row verbatim) and is **indeterminate on condition 1**, because no fragment count is held — so this document neither confirms nor overturns the classifier's cosmetic call on it. Admitted for instances built here where both conditions hold: order of play and resolution under `A4`, with an over-supplied pool. Never for strategy recall, which fails condition 2. |

**Counted, and the counts were recounted from the rendered tables rather than asserted from
drafting.** All 32 patterns appear above; a search of this section returns 32 distinct ids. They
disposition as:

- **17 adopted** — the 15 in the table, plus `U2-6` and `U2-14` in the prose beneath it. One of the
  17, `U1-6`, is adopted **in its binary form only**.
- **11 rejected outright** — `U2-1`, `U2-2`, `U2-3`, `U2-4`, `U2-7`, `U2-8`, `U2-9`, `U2-11`,
  `U2-12`, `U3-2`, `U3-6`.
- **4 dispositioned other than adopt/reject**, stated rather than rounded to the nearest column:
  `U2-5` is split — its shape survives as contract C-B, its standalone form is rejected; `U2-13` is
  **conditionally admitted**, valid only under C-B; `U3-7` is **conditionally admitted**, valid only
  where §4's two conditions both hold; `U2-10` is **deferred on build cost**, not rejected on merit,
  and returns when F7 justifies a rule language.

17 + 11 + 4 = 32. `U1-6` and `U2-5` are the two patterns appearing in both columns, and both splits
are stated above rather than resolved silently in favour of the adopted half.

*Reconciling the rejected table's row count, which is 16 and not 11:* it carries the 11 outright
rejections plus the five rows that are not outright rejections — `U1-6`'s EV-graded form, `U2-5`'s
standalone form, `U2-10`'s build deferral, and the conditional admissions of `U2-13` and `U3-7`. They
sit in that table because that is where a reader looks for them, not because they were rejected on
merit. `U2-11` and `U2-12`
both return if and when counting enters scope — recorded here so the deferral is visible.

**Three defects deliberately not inherited.** `U1-5`, `U1-8` and `U1-9` are **Evidence-backed** and
**independent**, discounted only because all three rest on a single compilation — citing "vendor
self-description" as their reason would be a false reason, and none is used above. Classification was
done from the sourced pattern throughout, with the three over-rating rows marked ⚠. And no adoption
above rests on "this format measures X better" without support — where that rationale would have been
needed, a register row was written instead (`A-24`, `A-25`, `A-26`).

---

## 6. Approvability self-check

**1. Every activity maps to at least one capability.** Seven families, read off §3's table rather than
recalled: F1→`C1`,`P3`; F2→`A4`; F3→`A1`,`A2`,`A3`,`A4`,`A5`,`B1`–`B5`,`C2`,`P3`; F4→`A2`,`B3`;
F5→`P1`; F6→`B6`,`C3`,`P4`; F7→`B3`,`C2`. No family is unmapped. Taking the union the other way, all
18 outcomes are named — `A1`–`A5`, `B1`–`B6`, `C1`–`C3`, `P1`–`P4` — **with one stated exception rather
than a silent one: `P2` is carried by contract C-B and by no family at all.** "All 18 have a family" is
therefore the wrong sentence; 17 have a family and `P2` has a contract, which §3's row says in those
terms.

**Two families map to a single outcome each, and neither is retained on coverage grounds.** F5 (`P1`)
is retained because calibration is a property of a series and no other family can score it. F2 (`A4`)
is retained on a **product judgement**: an engine-backed hand confounds "knows the order of play" with
"picked a legal action", and no other family isolates the first. Both would be deletable without
breaking coverage — `A4` keeps F3 — so the honest claim is isolation value, not necessity.

**2. No capability that is a decision is measured only by recognition.** Walked row by row against
LDB-01's ruling that every outcome but `C1` is a decision: **F1 appears on exactly two rows.** `C1`,
the approved recognition carve-out where the real task is display-reading; and `P3`, where it shares
primary billing with **F3** — F1 for the interpretation half, F3 for the approved in-play
non-deviation clause. No decision outcome is measured by recognition alone. The shipped state — 100%
of mastery evidence being multiple-choice — is explicitly disqualified rather than left standing.

*Corrected from an earlier draft, which asserted "every decision outcome names F3, F6 or F7 as
primary".* That was false three times: `P1`'s primary is **F5**, `P2` names **no family**, and `P3`'s
primaries are **F1 and F3**. The clause the card actually requires is the one above, and it holds; the
stronger sentence was never needed and was not true.

**3. Every LDB-02 pattern is adopted with a reason or rejected with one.** All 32 appear in §5, which
enumerates them as 17 adopted, 11 rejected outright and 4 dispositioned otherwise. Each reason is
specific to that pattern — no pattern is rejected by category alone.

**Open items handed forward, so silence is not read as a ruling:**

- **§4.2's pool *policy* → `LDB-06`**, named explicitly. Contract C-F binds the per-activity
  declaration; the policy that reads it is session composition's. An earlier draft discharged five of
  the bridge's six §4 requirements and left this one out of both the contracts and this list.
- **Requirement sets for F4–F7 → `LDB-07`.** The three inherited families carry 41 `ALR-*`
  requirements between them; the four new families ship with none. LDB-07 owns the interaction
  contract and is the natural author. Recorded because four families with no requirement set is a gap,
  not a design choice.
- The fading rungs (`A-04`) go to LDB-04/LDB-07 unspecified; `K-U6-005`'s code fix is LDB-04's;
  `U2-10` is deferred on build cost, not rejected; counting-dependent patterns return only if counting
  enters scope.

No numeric threshold, count or duration appears anywhere above — `A-07` would require a row for each,
and none belongs to this card.
