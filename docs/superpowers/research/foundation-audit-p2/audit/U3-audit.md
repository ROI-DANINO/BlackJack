# Audit — Unit U3

> Unit under audit: `docs/superpowers/specs/2026-07-16-adaptive-ai-learning-architecture-design.md`
> (617 lines, zero inline citations).
> Examiner: audit-examiner (Opus 4.8). Date: 2026-07-21. Run: `foundation-audit-p2`.
> Status: EXAMINER RECORD — not self-verified. Every `Remove`/`Replace` requires an independent
> `DEFECT-REAL: YES/NO`. This record assigns **no** `Remove` and **no** `Replace`.
>
> **Correction to this header block — in-record, not silently erased.** A header dated
> **2026-07-21** stood here asserting that `C-U3-001` … `C-U3-005` had been landed, each marked in
> place. **That assertion was false at the moment it was written.** The pass that wrote it was
> interrupted before it landed a single correction; the file contained **zero** `LANDED C-U3-`
> markers of any kind. It is corrected here rather than deleted, in the manner of
> `journal/decisions.md` R24/R26, because a *claim* of landing that outruns the landing is the same
> defect this program was founded on — corrections recorded but never carried into the record — and
> a later reader or gate could have taken that header as evidence that the work existed.
>
> **Corrections actually landed 2026-07-22** by the landing editor from `verification/V-U3.md`:
> `C-U3-001` … `C-U3-005`, all remedy mode `editorial`. Marker convention used here: a
> `<!-- LANDED C-U3-NNN (V-U3, editorial): ... -->` comment sits on **its own line immediately below**
> the affected row or paragraph — never inside a table row and never between `|` delimiters, which
> would break the verdict-row grammar. Erroneous original wording is kept visible (quoted inside the
> marker) rather than back-filled.
> **No verdict was changed by the landing pass**; all 13 stand as the examiner assigned them and as
> the verifier upheld them. Landing record: `landing/L-U3.md`.
>
> Root cause shared by all five: this audit reopened
> `docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md` at `:40`, `:43`,
> `:46`, `:147`, `:221-222` but never read that file's Session/Progression Requirements block at
> `:283-329` (ALR-026–ALR-034), which holds one-to-one antecedent rules for several audited claims.

Verdict legend: Preserve / Relabel / Revise / Replace / Remove

## Evidence read before retrieval (G7)

Phase 1 dossiers consulted, in this order, before any judgement was formed:

- `docs/superpowers/research/foundation-audit-p1/dossiers/C1-knowledge-tracing.md` (read: head
  statement, sufficiency statement, F1–F17, coverage gaps)
- `docs/superpowers/research/foundation-audit-p1/dossiers/C5-anki-spaced-repetition.md` (read: scope,
  F1–F4, candidate conflicts, coverage gaps)
- `docs/superpowers/research/foundation-audit-p1/dossiers/C2-its-actr-procedural.md` (read: finding
  index F1–F14, spacing/interval findings F9–F11)
- `docs/superpowers/research/foundation-audit-p1/dossiers/C4-chesscom-khan.md` (read: F3–F7 — the
  mastery-ladder analogue; consulted because it is the only *product* mastery-state evidence held)
- `docs/superpowers/research/foundation-audit-p1/dossiers/C3-deliberate-practice.md:60-75` (read for
  the feedback-timing definitional position named in the dispatch)

Project baseline also reopened (already named by the unit or the dispatch): `docs/specs/learning-mastery-and-scoring.md:133`;
`docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md:40-46,143-147`;
`docs/imports/v2-research-2026-07-11/course-bundle/how-to-teach.md:105`.

No `WebSearch` was used. No `WebFetch` was needed: every source relied on is held in-repo.

## The drift anchor — `research-calibrated` at `:285` and `:412`

Both occurrences confirmed present. **No research is named at either site, and no research is named
anywhere in the 617 lines** — the document contains zero inline citations, zero source names, zero
DOIs/URLs to research, and no bibliography. Positive enumeration, not absence-as-proof: the only
research-shaped references in the document are the five *forward* research gates at `:461-505`
(`Initial learning-product and activity research`, `Browser persistence admission`, `Local AI adapter
admission`, `Wider curriculum-data research`, `Public hosting and scale research`). Each of these
names work **to be done**, not a finding held. The two sites differ in whether a forward gate
plausibly covers them, which is why they receive separately-reasoned verdicts.

The Phase 1 archive, collected 2026-07-19/20 (three to four days *after* this document was authored
on 2026-07-16), contains **no mastery-threshold constant and no retention-interval constant** usable
as a calibration target. Positively enumerated: C1 records no threshold value anywhere; C4:120 records
Khan Academy's 70%/100% accuracy thresholds as *another product's* observed configuration, not as a
calibration of ours; C5 records interval *theory* (C5:76-78) with its own domain caveat.

| Claim ID | Verdict | Claim | Citation |
|----|----|----|----|
| K-U3-001 | Revise | `:285` — "Exact values are research-calibrated configuration rather than fixed architectural assumptions." | Basis: INFERENCE. No research named at site or in document; the sentence's own governing gates exist forward-only at `:470-472` ("session structure, scaffolding, hints, skill tests, review, mistakes, pacing") and `:487-491` ("latency, token usage, caching ... fallback thresholds"). **Strongest basis, added by the landing pass (C-U3-005):** the project's own same-day approved baseline states the opposite about exactly these values — `docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md:287` (ALR-027 limitation, verbatim): "numeric values require calibration and may vary by accessibility/interaction mode; the research does not establish universal minutes." Overstatement is narrow and named below. Bucket after audit: **Assumption**. |
<!-- LANDED C-U3-005 (V-U3, editorial): added the strongest in-hand basis for this Revise — ALR-027's limitation at ...product-activity-research.md:287 — which the audit held but never read. Verdict unchanged. -->
<!-- LANDED C-U3-001 (V-U3, editorial): see the K-U3-001 bullet below; the record's dating argument ("no research existed when this was written (2026-07-16)") is narrowed there to the supportable form. -->

| K-U3-002 | Revise | `:412` — "Thresholds and retention intervals are versioned, research-calibrated curriculum/reducer policy." | Basis: INFERENCE. No research named at site or in document. **Corrected asymmetry (C-U3-002):** it is true of the *words* that no gate uses "thresholds" or "retention intervals" — the curriculum gate at `:495-498` enumerates "the complete skill graph, prerequisites, misconceptions, examples, evidence policies, sources, ruleset dependencies, and fields consumed by the proven factories/planner" — but the gate credited to K-U3-001 enumerates at `:470-472` (verbatim) "session structure, scaffolding, hints, skill tests, review, mistakes, pacing, activity variation, accessibility, retrieval practice, spacing, interleaving, worked examples, cognitive load, feedback timing, mastery learning, and adaptive assessment," in which "review", "spacing" and "mastery learning" cover retention intervals and mastery thresholds at the *same* level of generality at which "pacing" was credited as covering session values. The separation from K-U3-001 therefore rests on grounds (b) and (c) below, **not** on ground (a) as originally written. **Strongest basis, added by the landing pass (C-U3-005):** `...product-activity-research.md:317` (ALR-032 limitation, verbatim): "counts, diversity rules, recency, and retention intervals remain provisional until observed blackjack data supports them." Also in hand: `...product-activity-research.md:33` (DUO-006 limitation): "Language-item recall and engagement do not establish blackjack mastery thresholds or a general learner model." Bucket after audit: **Assumption**. |
<!-- LANDED C-U3-002 (V-U3, editorial): the record read "Unlike K-U3-001, **no forward gate in this document names thresholds or retention intervals**" and rested ground (a) on that asymmetry; corrected against :470-472 ("review", "spacing", "mastery learning"). Revise survives on grounds (b) and (c). Verdict unchanged. -->
<!-- LANDED C-U3-005 (V-U3, editorial): added ALR-032:317 and DUO-006:33 as the strongest in-hand bases for this Revise. Verdict unchanged. -->

| K-U3-003 | Preserve | `:140` — "AI output is advisory input to validated learning contracts. It never writes learner state directly." | Internally consistent with the unit's own Authority Boundaries table (`:135` "`New`, `Learning`, `Needs practice`, `Mastered`, `Review due` \| Versioned deterministic mastery reducer"; `:136` "Unit completion, prerequisite gates, skip-test verdicts \| Deterministic progression policy") and non-goal `:67` ("let AI decide blackjack facts, correct answers, grades, mastery, progression, or unlocks"). Values commitment, not falsifiable by playtest. Bucket: **Product judgement**, correctly labelled. |
| K-U3-004 | Preserve | `:176-177` — "A pure, deterministic, versioned reducer from attempt evidence to skill states and compact evidence summaries. The same input history and reducer policy must produce the same output." | Supported by `C1-knowledge-tracing.md:162-167`: "No source in this collection reports or evaluates a **true solo-learner, zero-population, fixed-item-bank deployment** of BKT, PFA, or DKT — the exact configuration this product needs ... it should be made on product reasoning ... and labelled a Product judgement / Assumption". A deterministic rule-based reducer is precisely the path C1 leaves open. Product precedent: `C4-chesscom-khan.md:113` — Khan Academy's "five-level deterministic mastery ladder ... defined by fixed accuracy thresholds ... not a probabilistic ability estimate". Bucket: **Product judgement** informed by evidence. |
| K-U3-005 | Preserve | `:405-407` — "The reducer considers evidence count and diversity, correctness, assistance, repeated misconceptions, recency, difficulty, activity type, and whether evidence came from guided practice, review, mastery check, or skip test." | The "difficulty" input was checked specifically against C1's population requirement (`C1-knowledge-tracing.md:250`, Pelánek: "the system needs at least 100 students to get good estimates of item difficulty"). U3 does **not** fit difficulty from responses: it sources it from the catalog at `:228` ("prerequisite skills and difficulty bands"), i.e. expert-set. That is the exact path C1 endorses at `:162-167` ("using literature-typical or expert-set default parameters instead of population-fit ones"). **Consistent with the archive.** Bucket: **Product judgement**. |
| K-U3-006 | Preserve | `:409` — "One mistake cannot establish a stable weakness. Mastery requires repeated independent evidence across the evidence types declared by the skill policy." | Nearest documented analogue agrees in direction: `C4-chesscom-khan.md:140` — "If you answer both questions incorrectly, you'll level down in that skill." / "If you answer 1 question correctly and 1 question incorrectly, your level in that skill remains the same." Caution against trusting single-point estimates: `C1-knowledge-tracing.md:337` ("we must take the assertions of our student model about the student's knowledge with a large grain of salt"). The claim states **no count**, so no held evidence contradicts it. Bucket: **Product judgement**. |
| K-U3-007 | Relabel | `:410-411` — "A mastered skill becomes `Review due` rather than losing its historical mastery when retention evidence ages or later mistakes accumulate." | Stated as reducer mechanism; its retention-decay half rests on a literature the project's own archive marks as a **settled coverage gap** for this domain: `C5-anki-spaced-repetition.md:341-352` — "no study located in this pass tests spaced repetition on a genuine procedural decision rule of the blackjack-basic-strategy shape ... Transfer from the declarative-recall evidence base to a blackjack-style decision rule is **untested**, not merely under-studied at the margins". The only documented product analogue takes the opposite branch and has no time decay at all: `C4-chesscom-khan.md:141` — "No time-based decay (mastery does not passively fade merely by the passage of time in this documentation) — loss is tied only to answering challenge questions incorrectly." That is a *different choice*, not a contradiction. Relabel from implied-mechanism to **Assumption** (falsifiable by playtest). |
| K-U3-008 | Preserve | `:287-292` — "A session ends when:" / "its evidence target is satisfied;" / "its time bound is reached;" / "its activity bound is reached; or" / "the learner stops." | **Basis corrected (C-U3-003).** The record originally stated "Checked positively for an available research basis and found none that applies." That absence-claim is false: the project baseline holds a derived rule directly on point at `docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md:289-291`, verbatim: "**ALR-028 — End a session when its evidence target is satisfied, either bound is reached, or the learner stops.**" / "Evidence: **INFERENCE:** adaptive stopping tradeoffs in `SCI-008`; **PROJECT CONSTRAINT:** approved session end conditions." The audit cited SCI-008's limitation at `:46` ("Psychometric simulation rather than a learning activity; assumes calibrated item information unavailable in the first proof.") but missed that the project had already derived this exact stopping rule from it. Corrected basis: the unit's stopping rule has a one-to-one approved-baseline antecedent, itself labelled INFERENCE from SCI-008 plus a project constraint. Bucket: **Product judgement** with a baseline antecedent, correctly labelled. Survivor; verdict unchanged. |
<!-- LANDED C-U3-003 (V-U3, editorial): replaced the false absence-claim "found none that applies" with the ALR-028 antecedent at ...product-activity-research.md:289-291. Preserve unchanged. -->

| K-U3-009 | Preserve | `:294-295` — "Open evidence goals stay `in progress` and inform the next session, which may use different activities and a small amount of prerequisite or spaced review." | Consistent with, and weaker than, what C5 supports: `C5-anki-spaced-repetition.md:54-57` ("spaced presentations improved final-test performance by 9%, compared with massed presentations ... Only 12 of 271 comparisons ... showed no effect or a negative effect from spacing") read together with the mandatory counterweight `C5-anki-spaced-repetition.md:96-101` ("simple motor tasks d = 0.97, moderate-complexity cognitive tasks d = 0.42, complex tasks d = 0.11 and d = 0.07 ... 'The strong distribution of practice effects previously reported appears to be limited to relatively simple tasks.'"). The hedge "a small amount" does not exceed the moderated effect. Survivor. |
| K-U3-010 | Preserve | `:314` — "4. Select canonical immediate feedback." (step 4 of "Each response") | Encodes a feedback-timing rule; logged against the live conflict (see Conflicts below) rather than resolved. **Preserved** because the unit scopes itself at `:4-5` — "Scope: umbrella architecture and decomposition for the first local, single-learner proof" — so fixing one timing mode for the first proof does not assert the global product policy that `docs/specs/learning-mastery-and-scoring.md:133` reserves ("Immediate and delayed feedback are training configurations, not one global product mode."). A counter-reading exists and is recorded for the verifier: a reader who lifts `:314` out of the scope line would read it as global. That risk is a landing-phase wording concern, not a defect in the claim as written under its own scope. |
| K-U3-011 | Preserve | `:392` — "Assisted success is useful practice but not independent mastery proof." | Internally coherent with the unit's own unassisted skip-test requirement at `:425` ("It uses fixed unassisted evidence requirements for every gated skill") and with the baseline's assistance-evidence constraint at `docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md:221-222` (ALR-017: "the attempt retains pre-action state, assistance, submitted action, and resulting engine state"). No held evidence contradicts it. Bucket: **Product judgement**, correctly labelled. Survivor. |
| K-U3-012 | Preserve | `:424-425` — "A learner may challenge a unit through a deterministic skill test. It uses fixed unassisted evidence requirements for every gated skill." | Authority is consistent with `:136` ("Unit completion, prerequisite gates, skip-test verdicts \| Deterministic progression policy"). The word "fixed" names a requirement class, not a value — **no number is stated anywhere in the unit**, so there is nothing for the archive to contradict. Bucket: **Product judgement**. Survivor; deliberately not escalated despite its adjacency to K-U3-002. |
| K-U3-013 | Preserve | `:420-422` — "Units are `Locked`, `Available`, `In progress`, `Completed`, or `Review due`. Essential prerequisites are strict gates. Guided progression may continue with nonessential unfinished practice." | Prerequisite gating (family 5). **Basis corrected (C-U3-004).** The record originally read "Checked against C1 and C2 for any finding on gate strictness; none found — this is a genuine `COVERAGE GAP` in the held archive." That check was scoped to two P1 dossiers only, and the `COVERAGE GAP` label was asserted over an unenumerated portion of a source already held — the absence-as-proof failure mode. `docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md:319-321` is a one-to-one antecedent, verbatim: "**ALR-033 — Gate only essential prerequisites while showing simple learner states backed by richer internal evidence.**" / "Evidence: **PUBLISHED/INFERENCE:** `BRI-001`, `SCI-006`; **PROJECT CONSTRAINT:** approved progression and state vocabulary." Its own limitation at `:323` is retained here as the honest residue: "mastery research does not identify which blackjack prerequisites are essential; curriculum design owns that decision." So the essential/nonessential *split* has a baseline antecedent; which prerequisites are essential remains a values/curriculum commitment. Bucket: **Product judgement**, correctly labelled. Survivor; verdict unchanged. |
<!-- LANDED C-U3-004 (V-U3, editorial): withdrew the `COVERAGE GAP` absence-claim (checked against C1/C2 only) and substituted the ALR-033 antecedent at ...product-activity-research.md:319-321, with its :323 limitation retained. Preserve unchanged. -->


### The two Revise verdicts — the specific overstatement in each

Both are stated here so the correction can be landed without re-deriving it, and **without proposing
any replacement value** (out of scope, two phases away).

- **K-U3-001 (`:285`).** The overstatement is the present-tense participle. "are research-calibrated
  configuration" asserts a property the values already hold; none is named at the site.
  **Dating argument corrected (C-U3-001).** This bullet originally read "no research existed when
  this was written (2026-07-16)". That is false as a claim about a source, and is contradicted by a
  file this audit itself reopened: `docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md:3`
  reads verbatim "Status: approved 2026-07-16; all six bounded recommendations were accepted." — an
  approved research register whose source rows carry retrieval dates of 2026-07-16, i.e. the same day
  this unit was authored (`:3`, verbatim: "Status: conversational design approved 2026-07-16;
  written-spec review pending."). Both dates were checked in the documents themselves during landing;
  **intra-day ordering is unresolved and cannot be inferred**. The supportable and chronologically
  stronger form of the argument is in-unit: `:596` schedules `AL-R1 — research learning products and
  initial activity mechanics` as a *future* board card, so the unit itself positions its
  learning-product research as work not yet done. Separately preserved as accurate: the P1 archive
  (2026-07-19/20) postdates this unit and so cannot have calibrated it — that narrower claim stands.
  **Strongest basis (C-U3-005):** `...product-activity-research.md:287` (ALR-027 limitation,
  verbatim) — "numeric values require calibration and may vary by accessibility/interaction mode; the
  research does not establish universal minutes." A sentence saying the values *are* calibrated,
  against a same-day approved baseline saying the research *does not establish* them, overstates its
  basis. What the basis *does* support is the sentence's
  own contrast clause — these are configuration, not architecture — plus a forward gate at `:470-472`
  and `:487-491` that plausibly covers session pacing and model-call/token bounds. Honest wording
  direction: state the values as configuration **to be calibrated by** the named gates, not as
  already calibrated. Mitigation recorded in the unit's favour: no number is actually printed at
  `:285`, so nothing false is asserted about any specific value.
<!-- LANDED C-U3-001 (V-U3, editorial): removed the false generalisation "no research existed when this was written (2026-07-16)"; replaced with the same-day approved-baseline status line, an explicit "intra-day ordering unresolved", and the in-unit AL-R1 forward-card argument at :596. Verdict unchanged. -->
<!-- LANDED C-U3-005 (V-U3, editorial): added ALR-027:287 as this Revise's strongest in-hand basis. Verdict unchanged. -->
- **K-U3-002 (`:412`).** Same participle, weaker basis, and this is the more consequential of the
  two because it governs the reducer. Three independent grounds, each held in-repo:
  (a) **corrected by C-U3-002 and no longer load-bearing.** As originally written — "no gate in this
  document names thresholds or retention intervals (`:495-498` enumerates its own scope and they are
  not in it)" — this is true only of the *words*. The gate credited to K-U3-001 enumerates at
  `:470-472` (verbatim) "session structure, scaffolding, hints, skill tests, review, mistakes,
  pacing, activity variation, accessibility, retrieval practice, spacing, interleaving, worked
  examples, cognitive load, feedback timing, mastery learning, and adaptive assessment," where
  "review", "spacing" and "mastery learning" cover retention intervals and mastery thresholds at the
  same level of generality at which "pacing" was credited for `:285`. Ground (a) does **not** carry
  the asymmetry between the two verdicts; the `Revise` survives on (b) and (c);
  (b) the archive collected afterwards contains no threshold constant to calibrate against, and
  `C5-anki-spaced-repetition.md:341-352` records the decision-rule transfer question as **untested**,
  a settled coverage gap;
  (c) the project's own baseline already warns against exactly this move —
  `docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md:40` (SCI-002
  limitation): "optimal intervals depend on retention target and **cannot be copied into product
  configuration**."
  Honest wording direction: thresholds and retention intervals are versioned policy whose values are
  **assumptions pending calibration**. Explicitly **not** assigned `Remove`: nothing contradicts the
  values (there are none printed), and an unsupported-but-defensible design is classified, not deleted.
<!-- LANDED C-U3-002 (V-U3, editorial): ground (a) rewritten in place, original wording quoted, and marked as no longer carrying the asymmetry. Verdict unchanged. -->
<!-- LANDED C-U3-005 (V-U3, editorial): added ALR-032:317 (and DUO-006:33 in the verdict row) as this Revise's strongest in-hand basis. Verdict unchanged. -->

## Citation state rows

U3 contains **zero** inline citations, so it supplies no citation IDs to judge. The rows below cover
the external anchors this audit rested its verdicts on, all read directly in-repo this session.

| Citation ID | Verdict it supports | Unit | State |
|----|----|----|----|
| C1-F8 (Pelánek 2016/2017, `C1-knowledge-tracing.md:244-252`) | K-U3-005 | U3 | VERIFIED |
| C1-sufficiency (`C1-knowledge-tracing.md:162-167`) | K-U3-004, K-U3-005 | U3 | VERIFIED |
| C4-F4 (Khan mastery levels, `C4-chesscom-khan.md:113-121`) | K-U3-004 | U3 | VERIFIED |
| C4-F6 (Khan Mastery Challenges, `C4-chesscom-khan.md:133-141`) | K-U3-006, K-U3-007 | U3 | VERIFIED |
| C5-F1 (Cepeda 2006, `C5-anki-spaced-repetition.md:41-63`) | K-U3-009 | U3 | VERIFIED |
| C5-F3 (Donovan & Radosevich 1999, `C5-anki-spaced-repetition.md:84-106`) | K-U3-009 | U3 | VERIFIED |
| C5-gap (decision-rule transfer, `C5-anki-spaced-repetition.md:341-352`) | K-U3-002, K-U3-007 | U3 | VERIFIED |
| SCI-002 limitation (`...product-activity-research.md:40`) | K-U3-002 | U3 | VERIFIED |
| SCI-008 limitation (`...product-activity-research.md:46`) | K-U3-008 | U3 | VERIFIED |

**Bases added by the 2026-07-22 landing pass, not yet verifier-stated.** Landing `C-U3-001`…`C-U3-005`
made four further in-repo anchors load-bearing: ALR-027 limitation (`...product-activity-research.md:287`,
K-U3-001), ALR-028 (`:289-291`, K-U3-008), ALR-032 limitation (`:317`, K-U3-002), ALR-033 (`:319-321`
with its limitation at `:323`, K-U3-013), plus DUO-006 limitation (`:33`, K-U3-002) and the gate text
at U3 `:470-472` / the forward card at U3 `:596`. Each was reopened and read verbatim by this landing
pass in the source file, and each was independently reopened by the verifier (`verification/V-U3.md`).
No citation **state** is assigned to them here: state assignment is the verifier's, not the editor's.

No `Preserve` or `Revise` above rests on an `UNVERIFIED` or `UNVERIFIABLE` citation.

## Conflicts logged (recorded, not resolved)

- **Feedback timing, three-way.** U3 `:314` ("4. Select canonical immediate feedback.") encodes an
  unconditional immediate-feedback step in the per-response runtime flow. It sits against:
  (i) `docs/imports/v2-research-2026-07-11/course-bundle/how-to-teach.md:105` — "Immediate correction
  is where misconceptions actually get fixed."; (ii) baseline `SCI-005` (Brummer et al. 2024,
  `...product-activity-research.md:43`), whose recorded limitation is that the included studies "do
  not support one universal timing rule", and whose derived rule ALR-005 states at `:147` "no cited
  evidence supports one timing policy for every learner, skill, or activity"; (iii) the *definitional*
  third position at `C3-deliberate-practice.md:68` — "The subjects should receive immediate
  informative feedback and knowledge of results of their performance" (Ericsson et al. 1993, p. 367),
  where immediacy is part of the *definition* of deliberate practice rather than an empirical
  comparison. **Not resolved here.** Also noted: `docs/specs/learning-mastery-and-scoring.md:133`
  holds the project's standing position ("Immediate and delayed feedback are training configurations,
  not one global product mode"), which U3's `:4-5` first-proof scope keeps U3 from contradicting.
- **Mastery revocability.** U3 `:410-411` makes mastery monotonic (decays to `Review due`, never
  lost). `C4-chesscom-khan.md:140-141` documents the only held product analogue doing the opposite on
  the demotion axis ("you'll level down in that skill") while having **no** time-based decay at all —
  i.e. the two systems differ on *both* axes, in opposite directions. Recorded as a divergence from
  the analogue, not as a contradiction of a finding.

## Coverage gaps (bounded gap specs; collection is a verifier's call, not mine)

- **G-U3-a.** No held source states a mastery-decision threshold (evidence count, accuracy fraction,
  or confidence level) for a single-learner, zero-population, fixed-item-bank trainer. Bound: one
  targeted pass for *mastery-criterion* values as configured in deployed deterministic mastery
  systems (not fitted models). Blocks nothing; it is what K-U3-002 would need to move off `Assumption`.
- **G-U3-b.** No held source supports a retention/review interval for a procedural decision rule of
  the blackjack-basic-strategy shape. This gap is **already settled as untested** at
  `C5-anki-spaced-repetition.md:341-352` — "We looked hard and it isn't there" is the result. Do not
  re-run C5's search; only a new-domain search would change it.

## Calibration — what "good" looks like

Held to the `journal/decisions.md` R20/R24/R25/R26/R27 bar: every verdict above points at a doc path
plus a line anchor, and quotes verbatim. Two self-corrections are kept visible in-record rather than
quietly applied, in the manner of R24 and R26:

1. K-U3-010 (`:314`) was initially drafted as a `Revise` on the ground that the step hardcodes one
   feedback timing against `learning-mastery-and-scoring.md:133`. Re-reading the unit's own scope
   line at `:4-5` showed the step is already scoped to the first local proof. **That draft verdict
   was wrong and is recorded as wrong**; the verdict is `Preserve`, with the conflict logged.
2. The dispatch's warning about an earlier agent reporting only `:412` was checked directly: **both**
   `:285` and `:412` are present, and they were given separately-reasoned bases (K-U3-001 vs
   K-U3-002) rather than one shared verdict, because the forward-gate coverage differs between them.

## Non-material notes

Un-numbered, no verdict, no landing loop. Each was read and deliberately left alone as engineering
detail with no pedagogical content. Inflating any of these into a verdict row would itself be a defect.

- Component naming and the ASCII architecture diagram (`:144-156`, `:158-207`) — plumbing.
- `ProgressStore` port operations, migration/recovery, export/reset (`:167-172`, `:521-526`).
- `UsageRecorder` field list (`:204-207`) — telemetry surface, not a learning rule.
- Idempotency, cancellation, stale-response handling, one-active-request rule (`:327-328`, `:509-514`).
- Staged Security and Privacy in full (`:429-459`) — real constraints, but outside the eight
  load-bearing decision families.
- Kanban and Phase Integration in full (`:578-609`), including card IDs `AL-01`/`AL-R1`/`AL-R2`/`AL-R3`
  — board mechanics.
- Artifact and Plan Topology (`:70-125`) — plan decomposition, not pedagogy.
- Staged Convergence and Exit Conditions (`:562-576`) — migration sequencing.
- Verification and Evaluation test lists (`:528-560`) — with one note kept here deliberately: `:534-535`
  ("Reducer state transitions and invariants, including that AI cannot alter mastery and one mistake
  cannot create a stable weakness") restates K-U3-003 and K-U3-006 as test obligations; it adds no
  new claim, so it gets no second verdict.
- Status line `:3` ("written-spec review pending") — document hygiene.
- Learner-key pseudonymity prose (`:256-260`) — already governed by decision R25; out of U3's families.
- `Design Outcome` (`:611-617`) — summary prose restating claims audited above.
