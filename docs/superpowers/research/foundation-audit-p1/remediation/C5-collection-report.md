# C5 — Sufficiency top-up collection report (C5-REM)

> Collector: Claude (Opus 4.8) · 2026-07-20 · **UNTRUSTED until independently verified.**
> Authority: program amendment 5 (sufficiency top-ups exempt from the initial 15-source cap).
> Scope: the 4-source gap specified in `verification/V5b-anki-spaced-repetition-toppedup.md` §3.
> Output: `C5-anki-spaced-repetition/dossier.md`, **append-only** (plus one disclosed front-matter
> count line). **No register was written by this pass** — rows are returned in the response text.

## Result

**4 citations added — F16, F17, F18, F19 — matching V5b's scope one-for-one.** No fifth source. Card
total 19 (initial 15 + top-up 4), exactly as V5b predicted.

| # | Source | Tier | What it closes |
|---|---|---|---|
| F16 | Czyż, Wójcik, Solarská & Kiper (2024), *Scientific Reports* 14:15974 · 10.1038/s41598-024-65753-3 | Q1 | CI matched pair, **pro-CI side** (lead #24) |
| F17 | Ammar, Trabelsi, Boujelbane, Salem, Boukhris, Glenn, Zmijewski, Jahrami, Chtourou & Schöllhorn (2024), *Educational Psychology Review* 36(2), art. 57 · 10.1007/s10648-024-09892-z | Q1 | CI matched pair, **critical side** (lead #25) |
| F18 | Latimier, Peyre & Ramus (2021), *Educational Psychology Review* 33, 959–987 · 10.1007/s10648-020-09572-8 | Q1 | Landmark spacing review 1 of 2 |
| F19 | Carpenter, Cepeda, Rohrer, Kang & Pashler (2012), *Educational Psychology Review* 24, 369–378 · 10.1007/s10648-012-9205-z | **Q4** | Landmark spacing review 2 of 2 |

**Both sources V5b recorded as "could not be read" were read in full this pass** — F18 via the
authors' self-archived copy on Ramus's LSCP page, F19 via an author-community mirror. Neither is
cited from abstract alone.

## The result that was not manufactured

**The sub-Q4 coverage gap is RECONFIRMED, not closed.** No study testing spaced repetition on a
blackjack-shaped situation→action decision rule was found. This is the **third** independent
confirmation of the same absence (V5, V5b, this pass). Searches run this session: spaced retrieval
practice × "decision rule"/"if-then rule" application training retention; spacing effect ×
"situation-action"/"conditional rule"/"strategy table" decision-skill retention × blackjack basic
strategy. Nearest hits were a radiology-education spaced-learning/interleaving review,
medical-resident repeated testing, and blackjack strategy-chart material with no training-methodology
content. **No study was invented to fill the gap.**

The four new sources **bound** the gap more tightly rather than closing it:

- **F19** — the review whose stated remit *is* the generalization question — concedes the
  simple-verbal base rate in its authors' own words, then lists the exceptions: grammar rules,
  spelling, reading, biology, an abstract maths task, coordinated motor skills. **Not one is a taught,
  fixed situation→action rule applied under time pressure and hidden information.** The gap now
  stands *after engaging* the field's own generalization review, which is a materially stronger
  position than arguing it from Cepeda 2006's inclusion criterion alone. That was V5b's specific
  complaint and it is now answered.
- **F18** excludes perceptual and motor learning **by inclusion criterion** — verbatim: "we focus on
  semantic and verbal stimuli learning (including mathematics problems). Thus, studies on perceptual
  and motor learning were excluded." It therefore cannot be stretched across the gap.
- **F16/F17** show the tradition that *does* own situation→action practice scheduling is
  motor-domain and in open dispute — with F16's own **applied-setting subgroup non-significant**.

## Findings the audit should not miss

1. **Conflict #10 survives F18 intact — it is not resolved in either direction.** V5b hoped the 2021
   meta-analysis would be the modern check on F3's complexity moderation. It is not, and citing it as
   such would be an error: its scope is verbal/semantic only, so it never overlaps F3's motor/complex
   corpus. Its non-significant *stimulus-type* moderator is a **within-verbal** null, and the authors
   explicitly refuse the null-as-absence reading ("we should not conclude that there is no
   relationship... With low power, we should not conclude..."). Anyone reading that moderator as
   cross-domain generality would be committing exactly the inversion this program keeps catching.

2. **F18's headline g = 0.74 is the publication-bias-corrected figure, not the raw pooled estimate.**
   Raw: g = 1.01 (95% CI [0.68, 1.34]). Corrected by trim-and-fill: g = 0.74 (95% CI [0.55, 0.91]).
   The abstract states only the corrected one. Both are random-effects/RVE. Cite with the model named.

3. **F16 reports two different overall effect sizes from two different models** — SMD = 0.63 (three-
   level mixed model) and SMD = 0.71 (random-effects with averaged within-study SMDs). Both are
   random-effects family; they are not interchangeable. This is the direct analogue of the Phase 1
   fixed-vs-random defect and is flagged in the dossier.

4. **F17 must not be quoted half-way.** Its retention result is a **two-step** sentence: a significant
   difference favouring high CI in "Δ post-retention" (p = 0.001) that the authors then state "was not
   large enough (ES = − 0.35) to produce an overall greater long-term gain" (ES = − 0.13, p = 0.18).
   Quoting only the first clause reverses the paper's conclusion.

5. **F19 is tiered Q4, not Q1**, despite "Review" in the title and ~474 citations. It reviews and
   interprets primary findings; it does not pool them. Tiering it Q1 would import unearned strength —
   the same non-obvious call V5b credited the previous pass for making on F14.

6. **V5b's missing cross-reference is now supplied** (synthesis, no new citation): F12's authors' own
   "multiple grain sizes... dependencies... and transfer effects" caveat is direct support for the
   sub-Q4 gap, and the two are now connected in the dossier — carrying V5b's nuance that the authors
   mean *inter-item* transfer and are describing modelling difficulty, not predicting failure.

## Register corrections found (these are errors in the existing registers)

- **Source-lead row #24 mis-attributes its paper.** It reads "Kim, et al. (2024)". The authors are
  **Czyż, S.H., Wójcik, A.M., Solarská, P., & Kiper, P.** V5b carried "Kim et al." forward from the
  register while simultaneously noting a *"Comment on Czyż et al. (2024)"* — the same paper under two
  names. DOI, venue, 54 studies and 2,068 participants in row #24 are otherwise correct.
- **Source-lead row #25 lists no authors.** Now established: **Ammar et al., EPR 36(2), art. 57.** Its
  substantive summary ("~37 of 183 pooled outcomes (20%)") is confirmed **verbatim correct**.

## Tooling hazards (two real; neither silently absorbed)

1. **A fetch-summariser fabricated a venue.** F17 retrieved through the text-proxy route returned
   *"Educational Research Review, 39, 100537"* — wrong journal, volume and article number for a
   `10.1007/s10648` DOI — plus a **7-author** list. Rejected; masthead re-established from the
   **Crossref API**, which returned *Educational Psychology Review* 36(2) art. 57 and a **10-author**
   list, independently matched by a second bibliographic mirror. Accepted uncritically this would have
   produced a fabricated-looking citation.
2. **A PDF mirror returned undecodable content while still yielding a plausible header.**
   `andymatuschak.org`'s Carpenter (2012) copy gave compressed stream data with no extractable body.
   **Abandoned, not partially quoted**; F19 comes entirely from the `pdf.retrievalpractice.org` copy.
   Also: F18's host is http-only and refused https (ECONNREFUSED), and both Springer targets returned
   IdP redirects — the text-proxy route resolved all three.
3. **Extraction path is weaker than V5b's.** This pass used WebFetch, not local `curl` + `pdftotext`
   with `grep -F` quote matching. That is a **reason for closer verifier scrutiny of F16–F19, not
   less.** Where two routes were run against the same source (F16), the figures matched across both.

## Compliance

- **No git command was run, in any form.** No build, test, or install command was run. Bash was used
  only to read repository files (`grep`/`tail` on the registers).
- Writes confined to `journal/raw/_inbox/foundation-audit-p1/`: the C5 dossier and this report.
- **Append-only** to the dossier, with **one disclosed exception**: the front-matter citation-count
  line, which stated "no further citations may be added," was updated to reflect the amendment-5
  reopening and the separable 15/4/19 counts. No finding, quote, tier, bucket, caveat, coverage gap
  or prior correction was altered. This mirrors the bookkeeping edit V5b accepted from C5-FP.
- No register was written to. No self-verification is claimed.
