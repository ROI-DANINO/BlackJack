# C2 — Second Editorial Correction Pass (C2-EC2) — Report

> Corrector: Claude (Opus 4.8, 1M) — editorial role, **not** the verifier | Date: 2026-07-20
> Instruction set: `verification/V2c-its-actr-procedural-remediated.md`, corrections R1–R4
> **Zero new sources. Zero new citations. Dossier still 15/15.**
> **Not self-verified.** A separate agent instance should re-check every claim changed here.
> This file is new; `C2-editorial-report.md` (the first pass) is left intact as a historical record.

## Scope and limits observed

- **No collection.** C2 stands at 15/15 and V2c judged it SUFFICIENT; sufficiency was not reopened.
- **Evans et al. (2018)** — V2c ruled it not load-bearing. Not pursued.
- **Retrieval practice (Q4)** — V2c converted it to a synthesis-time check on C5. Not pursued.
- **No `git` command of any kind was run.** This role has no Bash tool at all, so the boundary is
  structural rather than promised.
- Nothing was written outside `journal/raw/_inbox/foundation-audit-p1/`.

## Method — how the two material corrections were re-derived

Both R1 and R2 were **independently re-derived from the primary source**, not adopted from V2c.

`WebFetch` on the DukeSpace OA bitstream the dossier already records returned the PDF as binary and
the fetch model declined to transcribe it — correctly, since guessing at compressed PDF streams is
exactly the paraphrase-as-quote hazard this audit exists to catch. The fetch tool saved the PDF
locally, and I read the relevant **pages as images** (`Read` with a page range), which renders the
typeset tables directly. This is a first-party read of the printed page, not a summarisation layer.

Pages read: **7–8** (Results, incl. the Grubbs paragraph, pp.976–977) and **9–12** (Table 2 p.978,
Table 2 continued p.979, **Table 3 p.980**, and the Report-type body paragraph p.981).

Both of V2c's material claims check out against the printed tables, with one wording discrepancy in
V2c itself (recorded below).

## Corrections applied

### R1 — `Report type` does not replicate in the adjusted analysis — **APPLIED (material)**

**Independently confirmed.** Table 3 (p.980), read from the typeset page:

| Report type | k | Fixed g | Fixed CI | Fixed Qb | Random g | Random CI | Random Qb |
|---|---|---|---|---|---|---|---|
| Peer-reviewed journal | 6 | **–.04** | [–.17, .08] | **.69, p = .407** | .23 | [–.11, .57] | **1.98, p = .160** |
| Nonjournal | 11 | .02 | [–.04, .07] | | –.03 | [–.15, .09] | |

Corroborated by the authors' own body text, p.981, verbatim: *"For adjusted effect sizes, the average
effect size in peer-reviewed journals was not different from that of nonjournal reports under a
fixed-effect model, Qb(1) = 0.69, p = .407, nor was the case under a random-effect model,
Qb(1) = 1.98, p = .160."* Also confirmed from p.976: the adjusted data set is *"17 adjusted overall
effect sizes from 17 independent samples"* — so k=17 vs. the unadjusted k=26. Table 2's unadjusted
figures (24.45\*\*\*/.000 fixed, 10.03\*\*/.002 random; .28/.02 fixed, .30/–.01 random) were re-read on
p.978 and are exact as the dossier had them.

**Four edits landed**, because the claim had propagated to four places:
1. **Forward pointer** at head of `## Findings` — the instruction *"Do not quote an effect size from
   this section without it"* struck and replaced. This was the material defect: a reader-facing
   instruction resting on a result that does not replicate.
2. **F12 headline** — scope-qualified.
3. **F12 extraction block** — full Table 3 block added verbatim, with an explicit
   *what-this-does-and-does-not-support* statement. Per the brief, the finding is **not deleted**: the
   moderator remains robust across both models in the unadjusted analysis and remains the best-supported
   moderator in Table 2.
4. **Candidate-conflicts entry (#27)** — scope added; V2c's recommendation to amend #27 rather than
   open a new row is recorded (register write left to the orchestrator).

**Honest statement of what the non-replication does and does not mean**, recorded in the dossier: the
adjusted analysis is the one controlling for pretest differences and rests on a smaller,
differently-composed sample, so non-replication is not itself proof the Table 2 result is spurious —
but nothing in this dossier entitled a reader to treat the moderator as robust *simpliciter*, and the
dossier previously told them to.

**The pattern, recorded plainly in the dossier as instructed.** C2-EC faulted V2b for reporting
`Sample size` as robust while omitting the specification where it fails, then reproduced that exact
omission on the moderator it elevated to the headline. It is recorded in the dossier's head note as a
recurring *class* of reading error — not a directional bias, since the two instances cut opposite ways
— with the standing implication that any single-specification moderator claim in this card is
incomplete until both models **and** both the adjusted and unadjusted analyses have been checked.

### R2 — Plano's –0.66 is a Grubbs-winsorized substitute for –1.57 — **APPLIED (moderate)**

**Independently confirmed**, Results p.976, read from the typeset page. Applied in two places: a
warning flag on the Plano row of the Table 1 extraction, and a full block giving the verbatim Grubbs
paragraph with three consequences.

**Applied in the direction it actually cuts — against pessimism**, per the calibration instruction:
the most negative low-achiever data point in the card is (a) an imputed nearest-neighbour substitute
rather than a measured value and (b) attributed *by the authors themselves* to baseline
non-equivalence — *"strongly impacted by the preexisting differences between the treatment and
comparison groups."* The F12 "weight this finding should carry" block now records that the pessimistic
reading has been reduced on **four** independent grounds rather than three.

**One quote-accuracy correction to V2c itself.** V2c renders the reset sentence as *"We reset the
effect size to −0.66, **its next nearest neighbor**."* The printed text reads *"its nearest
neighbor."* "Next nearest neighbor" is the paper's wording for a **different** reset — the same Plano
–1.57 reset to **–1.03** in the k=44 all-unadjusted dataset, two sentences later. Immaterial to R2's
substance; corrected in the dossier and flagged here because this program's standard for text marked
verbatim is character-exact, and V2c is otherwise exceptionally careful.

### R3 — "online-first-vs-final rounding" is unevidenced — **APPLIED (cosmetic)**

Causal clause struck in **both** places it appeared (the F3 corrected note and the withdrawn
Ma-rounding conflict bullet — the first pass had written it twice). Replaced with "cause not
established; magnitude de minimis." The withdrawal itself is unaffected and stands.

### R4 — Ritter et al. (2007) publisher — **RECORDED, NOT APPLIED, deliberately**

R4 is a defect in `C2-editorial-report.md`, **not** in the dossier — V2c says so explicitly and I
confirmed it: the dossier body prints the publisher fields precisely and never claims Ritter et al.
was published by Carnegie Learning. The brief instructs that the first report is a historical record
not to be overwritten. So the correction is recorded here rather than edited into it:

> **Correction to C2-editorial-report.md, "Findings CHANGED" table, F13 row.** It reads "Wolfson et
> al. 2008 and Ritter et al. 2007, **published by Carnegie Learning**, the Cognitive Tutor vendor."
> Ritter et al. (2007) was published by **IOS Press**. The *authorship* claim holds for both studies
> (Ritter is Carnegie Learning's own scientist); the *publisher* claim holds for **Wolfson only**.
> The underlying vendor-authorship finding is unaffected, and V2c independently confirmed the 5/5
> pattern.

## Correction to the first pass's reasoning on departure 1 — **APPLIED**

V2c upheld C2-EC's **conclusion** (the –.42 composition is an open question, not an asserted fact)
while finding it reached partly for the wrong reason. Both faults are now struck in the dossier with
the conclusion retained:

1. *"Smith has no unadjusted ES printed, so it cannot be one of the k=2"* — **invalid inference.** A
   blank *printed* cell is not evidence of exclusion from the *analysed* set.
2. *"no straightforward inverse-variance weighting of those two yields –.42"* — **C2-EC tested the
   wrong pairing.** It tested Biesinger+Plano (which gives **+0.062**, wrong sign) and reported that
   failure as refuting V2b's claim, which concerned **Plano+Smith**. That pairing does compute:
   n-weighting (–0.66, n=779) with (–0.07, n=445) gives **–0.4455**, within .026 of the printed –.42.
   I re-did this arithmetic myself.

Net effect: the recorded status is unchanged (open question), on narrower and more defensible grounds
— the paper simply never states the cell's composition, which remains true. V2b's conclusion is
probably right; what fails is that its evidence rests on a value the table does not print. The k=2
fact itself is verified from Table 2 and untouched.

## Claims examined and deliberately LEFT UNCHANGED

Per the calibration instruction — accurate-as-written is a legitimate finding.

| Item | Why unchanged |
|---|---|
| **Table 2 report-type figures** (.28/.30/.02/–.01; Qb 24.45/10.03) | Re-read from p.978. **Exact.** The unadjusted finding is accurate as written; only its scope was missing. |
| **F12 low-achiever Table 2/Table 3 figures** (–.42 [–.55,–.28] k=2 fixed; –.23 [–1.08,.63] random; –.18 [–.32,–.05] k=3; –.16 [–.49,.18]) | All four re-read on pp.978/980. **Exact, including both k values and both zero-crossing CIs.** |
| **Trim-and-fill block** | Re-read p.977. Accurate, and the first pass's "honest reading" framing (the authors' own word is "slightly") is correctly restrained. Left alone. |
| **`Sample size` moderator block** | Re-read pp.978–979. Qb fixed 5.94, p=.015; **Qb random 0.74, p=.389** — exact. The first pass's handling is correct and is the thing R1's defect should have been measured against. |
| **F13 WWC ratings, vendor-authorship block, F1/F3/F4/F5/F7/F8/F10/F14/F15, coverage gaps, retraction amendment** | Outside R1–R4; all 13 re-verified by V2c against primary sources with zero drops. Not re-opened. |
| **F2, F6, F9, F11** | V2c independently re-verified all four as accurate. The two de-minimis quote deviations V2c noted (F2's dropped leading "However,"; F11's "rather than blocked practice" for "rather than by blocked practice") are **not fixed here** — V2c explicitly rated neither material nor action-requiring, and neither changes meaning. Flagged for any future pass that wants character-exactness. |

## Calibration statement

Movement in both directions, and the two material corrections point opposite ways:

- **R1 reduces** the weight of the dossier's headline finding — the correction costs this pass's
  predecessor its best result and removes a reader-facing instruction.
- **R2 reduces pessimism** — it further deflates the card's most striking negative result, which is
  the direction the standing brief warns is under-applied. It was applied at full strength, including
  a rewrite of the "weight this finding should carry" block to say so explicitly.
- **R3/R4 are cosmetic** and were not inflated.
- **One correction was made *to the verifier*** (V2c's "next nearest neighbor" misquote), and one
  correction was **declined as out-of-scope-by-design** (R4 belongs to a historical record).
- **Six items were examined and left alone as accurate**, including every number I re-read from the
  primary that the first pass had gotten right — which was all of them except the missing Table 3.

The honest summary: the first C2 editorial pass was good work with one real hole in it, and the hole
was in the finding it was proudest of. That is worth stating plainly, because it is the second time
in two passes that the same reading error has appeared, and the corrector who named it was not immune
to it.

## Residual issues NOT actioned (orchestrator's call)

1. **Conflict register #27** needs amending to carry report type's corrected weight. V2c recommends
   amend-not-new-row; I agree. **Registers were not written to** — returned as text, per dispatch.
2. **F2/F11 de-minimis quote deviations** — sub-threshold, listed above for completeness.
3. **Evans et al. (2018)** and **retrieval practice/Q4** — closed by V2c as not-load-bearing and
   not-C2's-gap respectively. Not reopened.
4. **Gate summary §4** — V2c's finding that "all applied" is false for C2 stands and is a program-level
   item, not a dossier item. Not actioned here.

---

## ⛔ CORRECTION NOTICE — appended 2026-07-20 by C2-EC3, per verification record `W3-C2-EC2-final.md`

> **This notice annotates; it does not rewrite.** The body above is preserved verbatim as a historical
> record of what this pass claimed at the time — that is what makes the error traceable. Same ruling
> the pass itself correctly applied to R4, and the same ruling the orchestrator applied to the C4
> collection report.

**Withdrawn: the "one quote-accuracy correction to V2c itself" in §R2 (the paragraph beginning "One
quote-accuracy correction to V2c itself").** It is **unfounded**. **V2c's quotation was correct.**

The printed text of Steenbergen-Hu & Cooper reads **"We reset the effect size to −0.66, its next
nearest neighbor among the unadjusted overall effect sizes"** (Results, p.976). W3 established this on
three independent routes: `pdftotext` flat extraction; `pdftotext -layout` extraction of the same
passage, same column, continuous (so not a column-fusion artifact); and **Table 1 footnote d**, a
physically separate location, which also reads "its next nearest neighbor." The secondary claim — that
"next nearest neighbor" belongs to a *different* reset — is the **reverse** of the paper's usage: the
paper uses "next nearest neighbor" for **both** effect-size resets (−0.66 and −1.03) and reserves the
bare "nearest neighbor" for the **sample-size** resets.

**Consequently withdrawn from §Calibration statement:** the line *"**One correction was made to the
verifier** (V2c's 'next nearest neighbor' misquote)"* **no longer holds** and must not be counted as
evidence of this pass's bidirectional balance. It was load-bearing for that self-assessment; with it
withdrawn, no correction was made to the verifier by this pass.

**Root cause and its correct scope.** This pass read the typeset pages **as images**. In the printed
two-column layout the phrase breaks across lines as `…its next` / `nearest neighbor…`, and the read
dropped the line-final word — then used that artifact to **overrule** a `pdftotext`-derived quote. The
route was **adequate for R1's tabular figures, all of which W3 confirmed exact**, and failed only on
**running prose across a line break**. **The lesson is to scope the route, not to ban it:** page-image
reads are fine for typeset tables, are the weaker evidentiary route for character-exact claims in
running prose, and must not be used to overturn a text-extracted quote.

**Remediation landed in the dossier** (`C2-its-actr-procedural/dossier.md`): the `Verbatim:` block was
restored to the printed wording (W3-1), and the false quote-accuracy note was struck and marked
superseded, with the manufactured-defect finding and V2c's vindication recorded in place (W3-2).

**Not affected — explicitly unchanged and still standing:** R1 in full (verified character- and
digit-exact, landed at all four propagation sites); R2's substance (verified, and correctly applied at
full strength against pessimism); R3 (landed in both places); R4's deliberate non-application
(correct); the departure-1 adjudication (both weighted means reproduce); and all six
"left unchanged as accurate" items (independently re-derived, all exact). **C2 remains SUFFICIENT at
15/15**; sufficiency was not reopened.
