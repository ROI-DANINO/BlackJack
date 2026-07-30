# Per-Activity Evidence and Mastery Rules — LDB-04

> **Status: APPROVED 2026-07-30** (owner, gate `user-approval`). ROADMAP Phase 4 deliverable 5, now
> closed.
>
> **What approval binds.** The weight table and the 3.0 threshold are the mastery computation until
> `A-07a` is settled on this product's own data — not defaults to be quietly re-tuned. The
> at-least-one-unassisted clause is structural and may not be relaxed into a weight. Confidence enters
> no mastery calculation, ever (`A-17`, contract C-E). Mastery recommends and does not lock, and
> reversing that would make `A-01` load-bearing at runtime, which LDB-01 declined to do in prose.
>
> **Two constants the owner was told are the weakest part, and approved anyway:** the weights and the
> 3.0 threshold are invented, defended only by `A-07a`; and F1's 0.5 ceiling for `C1` is a
> single-sentence judgement. Both are the first things to revisit when real attempt data exists.
>
> **Inputs.** `2026-07-22-product-design-inputs.md` §3 (mastery constraints); LDB-01's 18 outcomes;
> LDB-03's seven families and six contracts; `web/src/progress/types.ts` (the durable schema);
> `web/src/learn/controller.ts` (the shipped model). Owner decisions of 2026-07-30 recorded inline.
>
> **What this decides.** What counts as evidence, how mastery is computed from it, how assistance is
> weighted, whether mastery decays, whether it gates progression, and how the shipped
> assistance mislabel is repaired. It does **not** decide session size or mix (LDB-06), the
> interaction contract or WCAG target (LDB-07), or the economy (LDB-05).

---

## 0. The finding that shapes everything below

**The durable schema was built for a real mastery model. The reducer throws its evidence away.**

`web/src/progress/types.ts` already carries every field this design needs, and says so in its own
comments: `evidence.skillId` is the FK into `Subject.skills`; `assistance`; `tableVisibility`
(`'open' | 'hidden' | 'not-applicable'` — the fading rungs, already a field); `mode` with the explicit
note that *"diagnostic is STORED but excluded from mastery — by the reducer, not the store"*;
`occurredAt` annotated *"Recency/spacing input"*; `attemptOrdinal` and `presentationId` to separate a
first response from its retries; `difficultyBand`; and `cachedMastery` tagged with `reducerVersion` so
a model change invalidates the cache rather than silently persisting.

`AttemptKind` already includes `'classification'`, which serves LDB-03's contract C-A natively.

Against that, the shipped model is `controller.ts:360-362`:

```ts
private computeCompleted(attempts: AttemptRecord[]): boolean {
  return this.unit.requiredChecks.every((id) => attempts.some((a) => a.stepId === id && a.correct === true));
}
```

It keys on **`stepId`** and ignores `outcomeId` — which is already a validated FK into
`Subject.skills` (`validate.ts:51-55`, `:70-75`). So skill-grained evidence exists in the record today
and the mastery computation discards it.

**Consequence for scope: this deliverable is a reducer, not a migration.** No durable field needs
adding. One union needs widening — see §6.2.

---

## 1. The mastery model

**Mastery of a skill is accumulated evidence weight reaching a threshold, with at least one item of
unassisted evidence, not decayed past its review horizon.**

Three clauses, each doing distinct work:

1. **Weight, not count.** A count cannot express "assisted counts, unassisted counts more" (owner
   decision). A weighted sum can, and it lets a played hand and a recognition item carry different
   value without either being excluded.
2. **At least one unassisted item, as a structural gate, not a number.** This is what stops a learner
   accumulating mastery entirely from hinted attempts. It is a *shape* requirement and therefore not a
   threshold — it needs no register row, because there is no constant to calibrate.
3. **Not decayed** — §3.

### 1.1 The weight table

| Evidence condition | Weight |
|---|---|
| Correct, `assistance: 'none'`, `tableVisibility: 'hidden'` | **1.0** |
| Correct, `assistance: 'none'`, `tableVisibility: 'open'` | **0.5** |
| Correct, `assistance: 'retry'` | **0.35** |
| Correct, `assistance: 'instruction'` (once real instruction exists — §6) | **0.15** |
| Incorrect, ungraded, or abandoned | **0** |

**Threshold: 3.0.** With the clause-2 gate, the cheapest mastery is three hidden-table unassisted
correct attempts, and no amount of assisted work alone reaches it.

**Both the table and the threshold are one register entry, not six.** Per the owner's instruction that
overlapping assumptions share instruments rather than each minting a row: the weights are not
independently validatable — moving any one of them changes what the threshold means, so they are a
single calibration target. Filed as a sub-row under **`A-07`**, which already directs that "each
specific constant chosen at `LDB-04`/`LDB-06` inherits this row; add a sub-row when a number is
actually written."

### 1.2 What is excluded from mastery entirely

- **`mode: 'diagnostic'`** attempts — stored, never folded. The schema comment already assigns this to
  the reducer; this document is the reducer that honours it.
- **Confidence, and any learner self-rating.** `A-17` and LDB-03's contract C-E. Confidence appears in
  no expression above and must appear in no implementation. §1.5 of the bridge: brief practice
  significantly raised confidence on an outcome participants could not influence.
- **Retries within one presentation, beyond their weight.** `presentationId` groups them;
  `attemptOrdinal > 1` is a retry and carries the assisted weight, not a fresh unassisted item.

---

## 2. A played hand can satisfy mastery — which is the point

The bridge's disqualifying constraint is that a mastery model unable to ingest played-hand evidence is
disqualified, because the ruling is *measure play, not quiz scores* (§1.7: 198 students taught
probability showed superior odds calculation at six months and **no change in gambling behaviour**).

Under §1, a played hand qualifies whenever it produces a graded attempt against a skill. Nothing in
the weight table privileges `interaction: 'multiple-choice'`; an `'engine-hand'` attempt at hidden
table visibility is the **highest**-weighted evidence there is. `validate.ts:65-66`'s restriction of
required checks to `question` steps is therefore retired rather than corrected — see §6.1.

### 2.1 Which families produce mastery evidence, and for which outcomes

Read against LDB-03 §3. A family may only produce mastery evidence for an outcome it is mapped to
there; this table adds what *kind* of evidence it yields.

| Family | Yields | Ceiling |
|---|---|---|
| **F1** Recognition check | Mastery evidence for `C1` only | Never above 0.5 — a bounded option set is never hidden-table unassisted in the sense clause 1 means |
| **F2** Ordered assembly | **Supporting only.** Contributes weight to `A4`, can never be `A4`'s sole evidence | 0.5 |
| **F3** Engine-backed hand | Full mastery evidence for every decision outcome it is mapped to | 1.0 |
| **F4** Free production | Full mastery evidence | 1.0 |
| **F5** Calibrated estimate | **Calibration score over a series, not per-attempt weight** — see §2.2 | n/a |
| **F6** Deferred-verdict session | Full mastery evidence, released at debrief | 1.0 |
| **F7** Whole-policy production | Full mastery evidence for `B3`/`C2` as *policy* | 1.0 |

**F2's ceiling is not a preference.** LDB-03 demoted F2 to supporting on `A4` because `A4` is
behavioural and F2 measures declarative sequence knowledge. Letting F2 alone confer mastery of `A4`
would reintroduce exactly the knowledge-for-behaviour substitution LDB-01's admissibility test forbids.

### 2.2 F5 is the exception, and it has to be

Calibration is a property of a **series**, so F5 cannot emit per-attempt weight without destroying what
it measures — LDB-03 §1 states F5 "may not measure correctness on any single estimate." `P1`'s mastery
is therefore a **calibration score over a minimum series length**, evaluated as one unit, not a sum of
weighted attempts.

Minimum series length and the calibration bar are constants and share `A-07`'s sub-row with §1.1, for
the same reason: they are not independently validatable against a threshold they define.

---

## 3. Mastery decays (owner decision, 2026-07-30)

A mastered skill becomes **`Review due`** when its most recent qualifying evidence is older than a
review horizon. It **never loses its history** — the transition is a state change on a derived value,
and raw attempts remain the sole durable truth.

**Initial horizon: 14 days.** Filed as a sub-row under **`A-06`**, not as a new row, per the owner's
instruction on overlapping assumptions.

**Two things stated honestly.** `A-06` sits at **Low** confidence: spacing transfer to a
blackjack-shaped decision rule is a *settled* coverage gap with four independent confirmations that no
such study exists, and the only product analogue has **no time-based decay at all**. And its named
validation method is production telemetry over returning learners, which this product does not yet
have.

**The owner's amendment, applied:** decay need not wait on a dedicated returning-learner study — it can
draw evidence from adjacent fields already recorded. `occurredAt` is annotated in the schema as a
recency/spacing input; `attemptOrdinal` and per-skill error recurrence give a re-failure signal. If
learners who cross the horizon re-fail at a materially higher rate than those inside it, the horizon is
doing work; if not, it is decoration. **That comparison is computable from `ProgressAttempt` alone**,
needs no new instrument, and is recorded as `A-06`'s cheaper first test.

---

## 4. Gating: recommend, do not lock

**Mastery drives a strong recommendation for what to do next. It locks nothing.** Any unit stays
enterable, which is also what ships today (`Learn.tsx` opens any unit directly).

**Label: Product judgement.** Required to be exactly that — `P1-gate-summary` §6/§10 rules that the
mastery-model choice is entered as a labelled Product judgement or Assumption *"not as an
Evidence-backed decision."*

**The decisive reason is internal.** Hard gating would make **`A-01` load-bearing at runtime** — the
7-stage prerequisite order, **Low** confidence, where no source evaluates a prerequisite ordering for
blackjack or any comparable situation→action domain. LDB-01 deliberately declined to assert that order
as graph edges. Encoding it as a lock would be a *stronger* commitment than the one we just refused to
make in prose, and it is the wrong direction to be surprised in: locking later is easy, unlocking after
learners have hit walls is not.

**What the outside literature contributes, at its honest level.** A meta-analysis of 108 controlled
evaluations reports positive effects of mastery learning programs on examination performance, and the
same body reports that **self-paced mastery programs often reduce completion rates**; separately, that
learners with high prior knowledge benefit from autonomy while less-prepared learners are overwhelmed
by choice, with "autonomy with structure" — controlled pacing inside segmented units — offered as the
synthesis. That is consonant with recommend-don't-lock.

> **Access, stated precisely.** Kulik, Kulik & Bangert-Drowns (1990), *Review of Educational Research*
> 60(2) 265-299, **was not opened.** Five retrieval routes were attempted, including two open-access
> university PDFs, and all failed at the proxy with `CONNECT tunnel failed, response 403` — an
> **environment network-policy block, not a paywall and not an unretrievable source.** The
> characterisations above are search-result summaries, so under this repo's first rule they are
> **leads, not evidence**, and this section rests on the internal `A-01` argument instead.
> *Reopening condition: any environment whose policy permits those hosts. This is a named, reachable
> gap — not an evidenced absence.*

**Also not re-imported:** Khan Academy's shipped mastery gating is not evidence that gating works. `F11`
of this project's own P1 catalog records the SRI report as *"an implementation study, explicitly not an
effectiveness evaluation,"* correlational with mixed significance, and independent *"by authorship
only: commissioned by the Gates Foundation — Khan Academy's own major funder."*

---

## 5. Provisional on playtest, and what that means concretely

This design is provisional on **`P-1`** (can decision/outcome separation be trained at all) and **`P-5`**
(does confidence rise faster than skill).

`P-5` has a specific consequence the weight table does not express: this model deliberately records **no
confidence signal**, so the divergence `P-5` measures must be instrumented **outside** mastery — a
paired self-report series alongside measured accuracy, never folded into the computation. `A-17`'s
validation method already names that shape. Contract C-E forbids the fold; this notes where the
measurement lives instead.

---

## 6. Repairing the assistance mislabel

### 6.1 `K-U6-003` — retired, not corrected

`validate.ts:65-66` restricts required checks to `question` steps, which is why "a played hand can never
satisfy completion." §2 replaces the rule rather than annotating it: **required evidence is declared per
skill, and any family mapped to that skill in LDB-03 §3 may satisfy it.** The Relabel is discharged by
removal of the thing it labelled.

### 6.2 `K-U6-005` — rename now, because now is the only cheap moment

The label is false: `controller.ts:123` sets `'instruction'` on a second bare retry when no instruction
is delivered and **no hint ladder exists**. Owner decision: **rename**, do not annotate.

**Why this is safe today and expensive tomorrow —** verified, not assumed:

- The two `Assistance` types are **deliberately decoupled**. `progress/types.ts:35` mirrors
  `learn/types.ts:40` *by value, not by import*, with the stated reason that coupling "would tie
  progress storage to lesson-authoring churn."
- **Nothing has ever been persisted.** The only importer of `progress/` outside its own directory is
  `web/qa/progress/harness.ts`, a QA harness, and a search of `web/src` returns **zero**
  `appendAttempt` / `commitSessionSummary` calls. `journal/decisions.md:33`: *"No learner data is
  written until a real consumer exists."*
- `journal/decisions.md:34`'s additive-only rule protects **persisted** records. There are none. The
  moment this design's reducer ships and the first attempt writes, a rename becomes a migration.

**The change:** `Assistance` becomes `'none' | 'retry' | 'retry-2'` in both files, and the weight table's
`'instruction'` row is reserved for a level that will exist only when a hint ladder does. `cachedMastery`
carries `reducerVersion`, so any cached state computed under the old union is invalidated rather than
reinterpreted.

**A second instance, not named by `K-U6-005`.** `controller.ts:218` sets
`assistance: graded ? 'instruction' : 'none'` — marking a *graded hand step* as instruction-assisted,
which is the same false claim at a different locus. Both are fixed; recorded here because the audit
verdict names only `:123` and a reader checking that line alone would conclude the contract was honoured.

### 6.3 `K-U6-009` — out of scope, and said so

The recap copy at `blackjack-basics.ts:290` asserts learner capability unconditioned on evidence. It is a
copy fix with **no owner card**, it is not this deliverable's subject, and it is left explicitly open
rather than silently absorbed.

---

## 7. Assumption Register changes

Per the owner's instruction that overlapping assumptions share instruments rather than each minting a
row, this deliverable adds **two sub-rows and no new top-level rows**, despite writing several constants:

| Filed under | Covers | Validation |
|---|---|---|
| **`A-07`** sub-row | The §1.1 weight table **and** its 3.0 threshold **and** F5's minimum series length and calibration bar — one calibration target, since none is independently validatable against a threshold it helps define | production telemetry on this product's own attempt data |
| **`A-06`** sub-row | The 14-day review horizon | production telemetry, with the cheaper first test named in §3 — re-failure rate inside versus outside the horizon, computable from `ProgressAttempt` alone |

**Rows this leans on without spending:** `A-10` (multiple choice as mastery evidence — retired here
rather than validated, which is what its own row predicted), `A-17` (confidence), `A-04` (the fading
rungs — `tableVisibility` is the field, the *rungs* remain LDB-07's), `A-01` (not made load-bearing by
§4), `A-13`/`A-15`.

---

## 8. Approvability self-check

**1. A played hand can satisfy mastery.** §2: an `'engine-hand'` attempt at hidden table visibility is
the highest-weighted evidence in the model, and §6.1 retires the rule that made it impossible. No
clause anywhere privileges `'multiple-choice'`.

**2. No threshold is stated without a register row.** Constants written: the five weights, the 3.0
threshold, F5's series length and calibration bar, and the 14-day horizon. All are covered by the two
sub-rows in §7 — deliberately pooled rather than split, per the owner's instruction, with the pooling
reason stated (mutual non-independence) rather than asserted.

**3. Confidence appears in no mastery calculation.** §1.2 excludes it explicitly; §5 states where the
`P-5` measurement lives instead so the exclusion does not read as an omission. A search of this document
for confidence as an input returns only its exclusions.

**Handed forward:** the fading *rungs* stay `A-04`/LDB-07; `K-U6-009` stays open with no owner; session
size and mix are LDB-06's, and this model is deliberately silent on them; `InteractionMode` needs
widening for LDB-03's four new families, which is additive and belongs to whichever card first writes an
attempt.
