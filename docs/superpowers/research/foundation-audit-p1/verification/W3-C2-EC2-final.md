# Verification Record: W3 — C2-EC2 (second C2 editorial correction pass) — final pre-gate wave

> Verifier: Claude (Opus 4.8, 1M) — fresh instance; not the collector (C2), not C2-FP, not V2/V2b/V2c,
> not C2-EC, not C2-EC2.
> Date: 2026-07-20
> Scope: **one pass only** — `remediation/C2-editorial-report-2.md`. C2 sufficiency (SUFFICIENT, 15/15)
> not reopened. No collection. No scope expansion.

## VERDICT: **FAIL**

One **material** defect, and it is of the exact class this program exists to catch: **C2-EC2 wrote a
non-verbatim quote into the dossier inside a block marked verbatim, and appended a note asserting —
falsely — that the correct wording is wrong.** It did so while overruling a verifier (V2c) whose
quote was character-exact.

Everything else in the pass is sound, and R1 — the substantive correction — is fully verified and
landed in all four claimed sites. The verdict is FAIL on the one defect, not on the pass as a whole.
Remedy is a bounded, zero-citation revert (see §7).

---

## 1. Method and independence

I retrieved the primary source myself from the URL the dossier records
(`dukespace.lib.duke.edu/.../f123780d-7d60-48c2-928d-8a4c402366b0/content`), obtaining the same
147,055-byte PDF V2c reports, and extracted it **twice** — `pdftotext` flattened and `pdftotext
-layout` — so that a two-column fusion in one extraction would be caught by the other. Every number
and quote below is from my own extraction. Nothing is carried from V2c or from either editorial
report.

**Tool disclosure.** Shell used for source retrieval and text extraction only (`curl`, `pdftotext`,
`grep`, `sed`, and `python3` for two weighted means). **No `git` command of any kind was run.** No
build, test, or install command was run. The dossier was **not** edited. Nothing was written outside
`journal/raw/_inbox/foundation-audit-p1/verification/`.

---

## 2. Q1 + Q2 — R1: does it match the source, and did it land?

### R1 substance — **VERIFIED, character- and digit-exact.**

Table 3 (p.980), my `-layout` extraction, lines 865–867:

```
Report type                              .69   .407              1.98    .160
  Peer-reviewed journal      6    ⫺.04   [⫺.17, .08]     .23    [⫺.11, .57]
  Nonjournal                11     .02   [⫺.04, .07]    ⫺.03    [⫺.15, .09]
```

Every figure C2-EC2 claims is exact: Qb .69 p=.407 fixed, 1.98 p=.160 random; peer-reviewed k=6
fixed −.04 [−.17, .08], random .23 [−.11, .57]; nonjournal k=11, .02 and −.03. ✅

Body corroboration at p.981 is **verbatim**, confirmed at flat-extraction line 2605–2609: *"For
adjusted overall effect sizes, the average effect size in peer-reviewed journals was not different
from that of nonjournal reports under a fixed-effect model, Qb(1) = 0.69, p = .407, nor was the case
under a random-effect model, Qb(1) = 1.98, p = .160."* ✅

*(One immaterial note: the printed sentence reads "For **adjusted overall** effect sizes"; the
dossier and report render "For adjusted effect sizes." One dropped word, no meaning change,
sub-threshold — recorded for completeness only, not for action.)*

`k=17` vs `k=26` — **verified** at flat line 1363: *"The third data set consisted of 17 adjusted
overall effect sizes from 17 independent samples."* ✅

Table 2 unadjusted re-read (layout lines 651–653): `Report type 24.45*** .000 / 10.03** .002`;
peer-reviewed k=10 `.28 [.18, .37]` / `.30 [.17, .43]`; nonjournal k=16 `.02 [−.02, .05]` /
`−.01 [−.15, .13]`. **Exact**, as C2-EC2 claims. ✅

### R1 propagation — **all four sites verified present in the dossier text.**

I checked the dossier body, not the report's claim.

| # | Site | Dossier line | Landed? | Honest? |
|---|---|---|---|---|
| 1 | Forward pointer, head of `## Findings` | 69–79 | ✅ The instruction *"Do not quote an effect size from this section without it"* is struck (`~~…~~`) and replaced with a scope-limited instruction | ✅ |
| 2 | F12 headline | 210 | ✅ scope-qualified inline | ✅ |
| 3 | F12 extraction block | 238–252 | ✅ full Table 3 table + body quote + explicit does/does-not block | ✅ |
| 4 | Conflict entry #27 | 377 | ✅ `[SCOPE ADDED by C2-EC2, per V2c R1 …]` with the Table 3 figures and *"must not be read as cross-analysis robustness"* | ✅ |

**Four of four. No three-of-four gap.** The site that mattered most — the reader-facing instruction —
is the one that was actually fixed rather than cosmetically annotated.

### Is the corrected text honest in both directions? **Yes.**

Dossier line 248 states both sides explicitly: it **does** support report type as the best-evidenced
Table 2 moderator and the sharpest within-source account of the F1–F3 vs F12–F13 divergence; it does
**not** support publication venue tracking effect size as a general finding. It further records that
the adjusted analysis is the one controlling for pretest differences and rests on k=17 vs k=26, *"so
the non-replication is not by itself proof the Table 2 result is spurious — but a reader has no basis
for treating report type as established across specifications, and this dossier previously gave them
one."* This is exactly the neither-overstate-nor-delete disposition the brief required. **Sound.**

---

## 3. R2 — verified against the source, and the defect is here

### R2 substance — **VERIFIED.**

Results, p.976, flat lines 1384–1395, my extraction:

> "We conducted Grubbs (1950) tests to look for statistical outliers before calculating the average
> effect sizes. The Grubbs tests showed that, among the unadjusted overall effect sizes (k = 26), one
> effect size (g = −1.57) appeared to be an outlier (i.e., Plano, Ramey, & Achilles, 2007). We found
> that the Plano et al. (2007) study provided information for both an adjusted (adjusted by pretest
> scores, g = −0.48) and an unadjusted effect size (g = −1.57). Clearly then, the unadjusted effect
> size was strongly impacted by the preexisting differences between the treatment and comparison
> groups. We reset the effect size to −0.66, its next nearest neighbor among the unadjusted overall
> effect sizes."

The −0.66-is-a-substitute claim ✅; the authors' own attribution to *"the preexisting differences
between the treatment and comparison groups"* ✅ verbatim; the direction (**against** pessimism) ✅
correctly identified and correctly applied — dossier line 284 rewrites the "weight this finding
should carry" block to say the pessimistic reading is now reduced on **four** grounds rather than
three. Applied at full strength, in the under-applied direction. **Sound.**

### ⛔ THE MATERIAL DEFECT — C2-EC2's "correction to the verifier" is itself wrong, and it corrupted the dossier

C2-EC2 reports that V2c **misquoted** the reset as *"its **next** nearest neighbor"* when the printed
text supposedly reads *"its nearest neighbor"* — and that "next nearest neighbor" is the paper's
wording for a *different* reset (−1.57 → −1.03 in the k=44 dataset).

**This is false. V2c was right. I confirmed it on three independent routes.**

1. **Flat extraction, Results p.976** (line 1393): `We reset the effect size to ⫺ 0.66, its next` /
   `nearest neighbor among the unadjusted overall effect sizes.`
2. **`-layout` extraction, same passage** (lines 510–511), same column, continuous, identical wording
   — so this is not a column-fusion artifact.
3. **Table 1, footnote d** (line 1293), a physically separate location in the paper:
   *"The original effect size extracted from this study was −1.57. It was detected as an outlier in
   Grubbs (1950) tests. In the analyses, we reset the value to −0.66, **its next nearest neighbor**
   among unadjusted overall effect sizes."*

C2-EC2's secondary claim also fails: the paper uses "next nearest neighbor" for **both** effect-size
resets (−0.66 and −1.03). The bare phrase "nearest neighbor" appears in this paper only for the
*sample-size* resets (*"we reset the outlier sample sizes to their nearest neighbors"*; Table 1's
*"the nearest neighbor is 799"*) — a different quantity entirely. The distinction C2-EC2 asserts is
the reverse of the paper's actual usage.

**Consequences, and why this is material rather than pedantic:**

- **Dossier line 267 now carries a corrupted quote inside a block introduced by "Verbatim:"** — it
  prints *"its nearest neighbor"* in bold, which the source does not say. The dossier was made
  *less* accurate by a pass whose stated purpose was accuracy.
- **Dossier line 274 asserts a falsehood about the primary source** — *"The printed text reads 'its
  nearest neighbor' for the −0.66 reset"* — and attributes an error to a verifier who committed none.
  A future reader consulting the dossier is affirmatively misdirected about what the paper says.
- The pass invoked this in its own calibration statement as *"one correction was made **to the
  verifier**"* — i.e. the false finding is load-bearing for its self-assessment of balance.

Against the program's calibration warning, this is a **manufactured defect**: a corrector rewarded
for finding problems found one in a source that did not contain it. It is the fourth such catch in
this program.

### Route assessment — the extraction route does **not** support the confidence claimed

C2-EC2 read typeset pages **as images** after `WebFetch` returned binary and the fetch model
correctly declined to transcribe. Declining to transcribe was right. But the image route is what
produced this error: in the printed two-column layout the phrase breaks across a line as
`…its next` / `nearest neighbor…`, and the pass dropped the line-final "next" — precisely the failure
mode a page-image read is prone to and that `pdftotext` is not. The pass then used that artifact to
**overrule** a verifier who had used local text extraction.

**Finding: for character-exactness claims, a page-image read is a weaker evidentiary route than local
`pdftotext`, and must not be used to overturn a text-extracted quote.** V2c's own assessment — that
local extraction *strengthens* confidence — is upheld and now has a demonstrated instance behind it.
Note the asymmetry: the image route was entirely adequate for R1's **tabular figures** (all exact),
and failed only on **running prose across a line break**. The route should be scoped accordingly, not
banned.

---

## 4. Departure-1 reasoning — **VERIFIED SOUND**

| Claim | Check | Result |
|---|---|---|
| C2-EC tested Biesinger+Plano | (3566×0.22 + 779×−0.66)/4345 | **+0.0622** ✅ positive, wrong sign — as reported |
| V2b's actual pairing was Plano+Smith | (779×−0.66 + 445×−0.07)/1224 | **−0.4455** ✅ within .026 of the printed −.42 — as reported |
| Table 1 rows underlying both | layout lines 333/399/408 | ✅ Biesinger n=3,566 Low Quasi Journal 0.22/0.13; Plano n=779 Low Quasi Nonjournal −0.66/−0.48; Smith n=445 Low **True experimental** Nonjournal **[unadjusted blank]** /−0.07 |
| Conclusion survives: paper never states k=2 composition | full-text search | ✅ p.978 names the three low-achiever studies (line 1554) but nowhere states which two compose the unadjusted k=2 cell |

Both faulty strands are struck in the dossier (lines 277–278) with the conclusion retained on the
narrower ground. **The arithmetic is right, the wrong-pairing diagnosis is right, and the conclusion
survives for a sound reason rather than by inertia.** This is the strongest part of the pass: it
corrects its own predecessor's reasoning while *declining* to claim the conclusion changed.

---

## 5. R3, R4, and Q3 (unrelated change)

**R3 — APPLIED, correct.** The unevidenced "online-first-vs-final rounding" causal clause is struck
in **both** places (dossier lines 111 and 375) and replaced with "cause not established; magnitude
de minimis." The Ma-rounding withdrawal itself is unaffected and stands. ✅

**R4 — NOT APPLIED, and this was the right call.** R4 is a defect in `C2-editorial-report.md`'s
summary table, not in the dossier; V2c says so and I confirm the dossier body prints publisher fields
precisely and never claims Ritter et al. (2007) was published by Carnegie Learning. Overwriting a
filed report would destroy the audit trail that lets a later verifier see what each pass actually
believed at the time. Writing the correction into report 2 as an explicit annotation preserves both
the record and the fix. **This is consistent with the orchestrator's parallel ruling on the C4
collection report (annotate, don't rewrite), and I endorse it as the general rule.** ✅

**Q3 — unrelated text or conclusions changed?** No. Every C2-EC2 edit I located in the dossier
carries a `[C2-EC2, per V2c Rn]` marker, uses strikethrough rather than deletion, and falls within
R1/R2/R3 or the departure-1 adjudication V2c explicitly requested. No finding outside that scope was
touched; no tier, bucket, or citation count moved. The dossier remains 15/15 with zero new sources.
✅

---

## 6. Spot-check of the six "left unchanged as accurate" items

I re-derived these from my own extraction rather than accepting the account. **All exact.**

| Item | My extraction | Result |
|---|---|---|
| Table 2 report-type figures (.28/.30/.02/−.01; Qb 24.45/10.03) | layout 651–653 | ✅ exact |
| F12 low-achiever Table 2 (−.42 [−.55,−.28] k=2 fixed; −.23 [−1.08, .63] random) | layout 620 | ✅ exact, incl. k=2 and the zero-crossing random CI |
| F12 low-achiever Table 3 (−.18 [−.32,−.05] k=3; −.16 [−.49, .18]) | layout 832 | ✅ exact |
| `Sample size (further analysis)` — Qb fixed 5.94, p=.015; **Qb random 0.74, p=.389** | layout 632–634 | ✅ exact; `<200 k=9 .27 [.09,.45] / .21 [−.14,.56]`; `Over 200 k=17 .04 [.01,.08] / .05 [−.08,.17]` |
| Table 1 low-achiever rows (all three) | layout 333/399/408 | ✅ exact, incl. Smith's blank unadjusted cell and True-experimental design |
| Trim-and-fill framing ("slightly") | flat, §Examining Publication Bias | ✅ the authors' own word is "slightly"; the restrained framing is correct |

**The claim that every figure re-read was accurate is TRUE.** The pass's self-report on this point is
honest. Its one failure is on running prose, not on any figure.

---

## 7. Corrections required (returned; I did not edit the dossier)

| ID | Severity | Required action |
|---|---|---|
| **W3-1** | **Material** | **Dossier line 267** — restore the verbatim quote to the printed wording: *"We reset the effect size to −0.66, **its next nearest neighbor** among the unadjusted overall effect sizes."* The current text misquotes a block marked verbatim. |
| **W3-2** | **Material** | **Dossier line 274** — strike the C2-EC2 quote-accuracy note in full. Its assertion about the printed text is false, and it wrongly impugns V2c. If a note is retained, it should record the opposite: the paper uses "next nearest neighbor" for **both** effect-size resets (−0.66 and −1.03), and reserves the bare "nearest neighbor" for the *sample-size* resets. |
| **W3-3** | Cosmetic | `C2-editorial-report-2.md` §R2 and §Calibration — annotate (do not rewrite; same historical-record rule the pass correctly applied to R4) that the claimed "correction to the verifier" is withdrawn as unfounded, and that its calibration statement's "one correction was made to the verifier" no longer holds. |
| **W3-4** | Sub-threshold, no action | R1's body quote drops "overall" from "For adjusted overall effect sizes." Meaning unchanged. Fixable in any future pass alongside V2c's noted F2/F11 de-minimis deviations. |

**This is a zero-citation, zero-collection editorial revert touching two dossier lines.** It does not
reopen sufficiency and does not disturb R1, R3, R4, or the departure-1 adjudication, all of which
stand.

## 8. Register rows (returned as text — registers NOT written to)

| Type | Row |
|---|---|
| Conflict register | **No new row.** V2c's recommendation to **amend #27** rather than open a new row is correct and remains outstanding — C2-EC2 landed the scope text in the dossier but the register write is still the orchestrator's. |
| Source-lead register | **No new rows.** No new source was retrieved; I re-read one already in hand. |

## 9. Verifier summary

- **Verdict on C2-EC2: FAIL** — one material defect (W3-1/W3-2), remediable by a two-line revert.
- **R1: fully sound.** Figures exact against Table 3, body p.981, and Table 2; k=17/k=26 confirmed;
  **landed in all four claimed sites**; the corrected text honestly states both what the moderator
  does and does not support, neither overstating nor deleting.
- **R2: substance sound and correctly applied against pessimism.** Its appended "correction to the
  verifier" is **manufactured** and corrupted a verbatim quote in the dossier.
- **Departure-1: sound.** Both weighted means reproduce (+0.0622 and −0.4455); the wrong-pairing
  diagnosis is correct; the conclusion survives because the paper genuinely never states the k=2
  composition, which I confirmed by full-text search.
- **R3 applied correctly in both locations. R4 correctly NOT applied** — annotating rather than
  rewriting a filed report is the right rule and matches the C4 precedent.
- **Six "unchanged as accurate" items: all six spot-checked, all exact.** That self-report is honest.
- **Route finding:** page-image reading is adequate for typeset **tables** and unreliable for
  **running prose across line breaks**; it must not be used to overturn a `pdftotext`-derived quote.
- **No unrelated text, conclusion, tier, bucket, or count was changed. Dossier remains 15/15.**
- **C2 sufficiency: not reopened. Remains SUFFICIENT per V2c** — W3-1/W3-2 are Axis-1 precision
  defects, not evidence-engagement gaps.
- **No `git` command was run by this verifier. The dossier was not edited.**
