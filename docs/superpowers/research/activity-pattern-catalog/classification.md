# Classification — substantive vs cosmetic

> Applied 2026-07-27 by an independent agent that neither collected nor verified any of this, over
> all 32 qualifying pattern rows in `run/U1|U2|U3/audit.md`. It was told explicitly not to
> re-verify, not to rank on usefulness to the product, and not to invent a composite score.
>
> **This file was nearly lost.** The classification was returned as rows rather than written to disk,
> and existed only in a conversation for several hours. It is the layer that makes the catalog
> usable rather than merely banked, so it is recorded here in full.

## The axis, and why it is the catalog's main output

The research produced one finding that governs how everything else in this archive should be read:

> **Changing the input widget buys little. Changing what is asked buys a lot.**

Three pieces of evidence, all inside `run/`:

- Identical key-feature examination items scored **73.3% vs 73.5%** between a long-menu and a
  free-text answer format, **p = 0.93**. *(Read the limit: long-menu is itself generate-then-confirm,
  so this compares two production formats. It licenses "menu vs typing buys nothing" — nothing
  wider.)*
- In construct-matched pairs, **written short answer tracks multiple-choice at r = 0.81**, while
  **other open-ended formats diverge at r = 0.51**. *This is the load-bearing evidence, not the null.*
- Stated outright by one source: *"not the answer format itself, but the stimulus set by the question
  (e.g. integration of the question into a medical context) influences the results."*

**The operative test**, as the classifier framed it: strip the pattern to what it changes relative to
*"present a state, pick one of N actions."* If the same question over the same stimulus could be
posed to the same effect with a selection widget, it is **cosmetic**. A finer error signal, a
different input channel, or reduced generation load are measurement or entry changes — not question
changes.

## The table

| ID | Short name | Call | Evidence standing | Provenance (as written) |
|---|---|---|---|---|
| U1-1 | Whole-policy range painting (169 cells) | substantive | Product judgement | vendor-self-description |
| U1-2 | Pastcasting behind an information cut-off | substantive | Product judgement | vendor-self-description |
| U1-3 | Two-bound interval elicitation, hit-rate scored | substantive | Product judgement | vendor-self-description |
| U1-4 | Open-ended information gathering before hypothesis | substantive | Product judgement | vendor-self-description |
| U1-5 | LOFT uninterrupted run, judgement deferred to debrief | substantive | Evidence-backed | independent |
| U1-6 | Post-hoc graded decision-quality session review | substantive | Product judgement | vendor-self-description |
| U1-7 | Key-features critical-step-only case, write-in half | **conditional** | Product judgement | independent |
| U1-8 | SPOT interruptible single-objective segment drill | substantive | Evidence-backed | independent |
| U1-9 | LOE event-set scoring, criteria fixed in advance | substantive | Evidence-backed | independent |
| U2-1 | Free-typed transcription of an audio stimulus | **cosmetic** | Product judgement | vendor-self-description |
| U2-2 | Spoken production scored by speech recognition | **cosmetic** | Product judgement | vendor-self-description |
| U2-3 | Stroke tracing on a touch surface | **cosmetic** | Product judgement | vendor-self-description / **Assumption** |
| U2-4 | Continuous placement on a number line | **cosmetic** | Product judgement | vendor-self-description |
| U2-5 | Free-form sketch before formal representation | substantive | Product judgement | vendor-self-description |
| U2-6 | Construct-an-object-to-hit-a-target | substantive | Product judgement | vendor-self-description |
| U2-7 | Multi-item categorisation (card sort) | **cosmetic** | Product judgement | vendor-self-description |
| U2-8 | Semantically graded symbolic / numeric entry | **cosmetic** | Product judgement | vendor-self-description |
| U2-9 | Typed free recall + learner self-rating | **cosmetic** | Product judgement | vendor-self-description |
| U2-10 | Author an artifact judged by a test suite | substantive | Product judgement | vendor-self-description |
| U2-11 | Continuous timed stream, per-element statistics | **conditional** | Product judgement | vendor-self-description |
| U2-12 | Real-time performance on an external instrument | substantive | Product judgement | **compensated-third-party** |
| U2-13 | Simulation-configuration puzzle | substantive | Product judgement | vendor-self-description / **Assumption** |
| U2-14 | Free-composition typed answer to an open prompt | substantive | Product judgement | vendor-self-description |
| U3-1 | Unaided free recall ("write down everything") | substantive | Evidence-backed | independent |
| U3-2 | Short-answer test with a lesson-wide word bank | **cosmetic** | Evidence-backed | independent |
| U3-3 | Guidance-faded worked example / completion problem | substantive | Evidence-backed | independent |
| U3-4 | Contrasting-cases invention task | substantive | Evidence-backed | independent |
| U3-5 | Dynamic assessment with an embedded learning resource | substantive | Evidence-backed | independent |
| U3-6 | Construct-a-concept-map, learner-created phrases | substantive † | Evidence-backed | independent |
| U3-7 | Fragment-assembly ordering (Parsons-style) | **cosmetic** | Evidence-backed | independent |
| U3-8 | Continuous probability estimate, proper scoring rule | substantive | Evidence-backed | independent |
| U3-9 | Convergent-cue generation (one answer, six cues) | substantive | Product judgement | independent |

† substantive as a task, but its own differentiating clause is a widget contrast — see *Hard calls*.

**Counts: 21 substantive · 9 cosmetic · 2 conditional.** By unit: U1 8/0/1 · U2 6/7/1 · U3 7/2/0.

## The conditionals, and what decides them

**U1-7** — *substantive* if what gets built is the key-features **case structure**: only the 2–5
critical decision points of an evolving case are asked at all, partial credit aggregated to one case
score. *Cosmetic* if only the response widget changes over unchanged stems.
**Determinant: is the item set reduced to critical steps, or merely re-entered?**

**U2-11** — *substantive* if the feed advances on a clock the learner does not control. *Cosmetic* if
the same discrete items simply carry a timer.
**Determinant: does the stream advance independently of the response?** Note the source is
self-paced; external pacing appears only in the proposed blackjack analogue, not in the evidence.

## Why the cosmetic group is 28% and not the predicted 50%

It is **concentrated, not diluted**: 7 of U2's 14 rows — exactly the predicted half — inside the one
unit whose search was defined by input modality. U1 selected on decision structure ("incomplete
information, a correct choice can still lose") and U3 on measurement literature, so neither could
produce many widget-only rows. **A global 50% would have been an artefact.**

The classifier ran a calibration check on itself, found 28%, and re-examined every substantive call
adversarially before returning — specifically U1-6, U2-4, U2-5, U2-7, U3-1 and U3-9. Two survived
only on narrow grounds and are flagged below. It did not spare U3-2 and U3-7 — the catalog's two
best-evidenced rows — from being downgraded.

## The number that matters: six rows, not thirty-two

**Evidence standing does not track the axis.** The two most rigorously evidenced rows in the whole
catalog, U3-2 and U3-7, are both **cosmetic**. All 14 U2 rows are Product judgement and vendor-
authored bar one.

**The independent, Evidence-backed, substantive base of this catalog is six rows, all in U3:**

> **U3-1 · U3-3 · U3-4 · U3-5 · U3-6 · U3-8**

U1's three Evidence-backed substantive rows — U1-5, U1-8, U1-9 — all rest on the **same single
document**, which that unit's own preamble records as a compilation one step from primaries it does
not hold.

A consumer treating all 32 rows as equally supported will be wrong about 26 of them.

## Strongest substantive cases

- **U3-5 (dynamic assessment with an embedded resource)** — the source states the format measured
  something no other instrument in the study could see: *"The two forms of instruction would have
  looked the same had we not included the resource item from which students could learn."* A question
  that only exists in this format.
- **U3-4 (contrasting-cases invention)** — its value is demonstrably orthogonal to answer
  correctness: *"the students in the inventing condition did not generate a correct standardizing
  procedure during instruction, yet they were more prepared to learn the procedure."* If scoring the
  answer is the wrong signal, no selection widget asks the same question.
- **U1-4 (open-ended information gathering)** — the learner chooses what to find out before
  committing, and the search is scored on seven dimensions separately from the final answer, so a
  right answer reached by a poor search is distinguishable from a right answer reached by a good one.
- **U1-1 (whole-policy painting)** and its shipped twin **U2-10 (rule vs. test battery)** — the
  response object is a complete policy over an unpresented space. Decomposing it into per-cell items
  destroys the measurement, because presenting the cells supplies the recall.

## Hard calls, recorded rather than smoothed

- **U3-6** is the hardest. As a *task* it is substantive — the response object is a proposition
  network. But its own differentiating clause (created vs selected linking phrases) is precisely a
  widget contrast, and the source shows the freer widget performing **worse** against the external
  criterion (r = .243 n.s. vs .551 p<.05; interrater 0.81 vs 0.92). **The row is substantive for a
  reason other than the one its title advertises, and its title advertises a change the evidence
  says cost something.**
- **U1-6** — deferral of judgement and a session-level assessed unit are substantive markers, but
  the learner's input is unchanged. Substantive on the assessment axis, silent on the prompt axis.
- **U3-9** — the multi-cue stimulus is the substantive change, not the typing. But the source
  measures later *memory*, not abstraction, and its authors call the experiment "contrived."
  Weakest-evidenced substantive row in the catalog (N = 20, one experiment, no replication).
- **U2-2** — a channel swap over an unchanged target. A response deadline would make it substantive
  via external pacing, but the deadline is separable from the microphone.

## Five things a downstream consumer would be misled by

1. **The p = 0.93 null cannot carry a production-versus-multiple-choice claim.** Its comparator is
   itself a generate-then-search format. The load-bearing evidence is **r = 0.81, k = 52**. And the
   *same* source cuts the other way on a different metric — item discrimination **0.32 write-in vs
   0.18 select-from-list**. Quoting only the null quotes half of one unit's evidence.
2. **U2 rejected word-bank tile assembly; U3 admitted Parsons fragment assembly.** These are the same
   interaction — a supplied pool, one target arrangement. Both units are right in isolation and
   contradict each other when read together. **A reader merging the tables inherits an inconsistent
   boundary.**
3. **U2-9 proposes a learner self-rating widget that U3's own evidence contradicts.** Kornell &
   Bjork: 78% performed better spaced, and 78% rated massing as good or better. U3 files this as the
   strongest available caution against any in-app "how well did that go?" widget as a mastery
   signal — while U2-9 proposes exactly that widget. Both are already in hand; no collection needed.
4. **Three rows' blackjack-analogue columns are substantive while the sourced pattern is not** —
   U2-3 (source: trace a *displayed* glyph → analogue: draw on a *blank* grid), U2-11 (self-paced
   source → externally paced analogue), U2-13 (source: solve a puzzle → analogue: a demonstration).
   **Classifying from the analogue column over-rates all three.**
5. **Provenance tokens are not comparable across units.** `independent` in U1 and U3 was assigned
   under a two-value scheme and **was never compensation-checked**; U2 alone carries
   `compensated-third-party`. Separately, U1-7's cell reads `independent` while U1's own preamble
   records that its *primary* is self-describing and only the corroborating source is independent.

## Two rows owe an Assumption Register entry

**U2-3** and **U2-13** carry `Assumption` as their capability label. Under this repo's evidence
discipline that obliges a row in `docs/superpowers/specs/assumption-register.md` with a named
validation method. Neither is substantive-vs-cosmetic relevant, but both would otherwise travel as
unlabelled caveats.
