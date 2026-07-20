# Verification Record: W3b — C2-EC3 (third C2 editorial correction pass) — re-verification of the W3 repair

> Verifier: Claude (Opus 4.8, 1M) — fresh instance; not the collector (C2), not C2-FP, not V2/V2b/V2c,
> not C2-EC / C2-EC2 / C2-EC3, and not the W3 verifier.
> Date: 2026-07-20
> Scope: **one repair only** — W3-1, W3-2, W3-3 as specified in `verification/W3-C2-EC2-final.md` §7.
> No collection. No scope expansion. C2 sufficiency not reopened.

## VERDICT: **PASS**

All three specified changes are applied, correct, and complete. Nothing outside them moved. The
manufactured defect introduced by C2-EC2 is reverted, the record of it is preserved rather than
erased, and the wrongly-impugned verifier is vindicated in both the dossier and the filed report
whose calibration claim depended on the false finding.

**C2 as a whole now PASSES the final wave.** C2 remains **SUFFICIENT at 15/15**.

---

## 1. Method and independence

I re-retrieved the primary source myself and extracted it myself. **No page-image read was used at
any point** — that is the exact route that produced the error under repair.

- `curl -sL` on the URL recorded at `dossier.md:225`
  (`https://dukespace.lib.duke.edu/server/api/core/bitstreams/f123780d-7d60-48c2-928d-8a4c402366b0/content`)
  → **147,055 bytes**, `PDF document, version 1.6`. Byte size matches what both V2c and W3 report.
- Extracted **twice**: `pdftotext` (flat) and `pdftotext -layout`.

*(Recorded for the next retriever: the shortened form `dukespace.lib.duke.edu/bitstreams/<uuid>/content`
— as it appears abbreviated in the W3 record's §1 — returns a **311,799-byte HTML landing page**, not
the PDF. The working path is the full `/server/api/core/bitstreams/<uuid>/content` recorded in the
dossier. This is a URL-form note only; it casts no doubt on W3, which reports the correct byte size
and therefore plainly had the real PDF.)*

**Tool disclosure.** Shell used for source retrieval, text extraction, and `grep`/`sed` over the
extracted text and the audit files only. **No `git` command of any kind was run.** No build, test, or
install command was run. **No dossier or report was edited.** Nothing was written outside
`journal/raw/_inbox/foundation-audit-p1/verification/`.

---

## 2. W3-1 — verbatim wording restored — **VERIFIED**

### 2a. Independent confirmation of the printed wording

Three routes, all from my own extraction:

**Route 1 — flat extraction, Results p.976** (`flat.txt` lines 1393–1394), showing the line break:

```
comparison groups. We reset the effect size to ⫺ 0.66, its next
nearest neighbor among the unadjusted overall effect sizes. Among
```

**Route 2 — `-layout` extraction, same passage, same column, continuous** (`lay.txt` lines 510–511):

```
comparison groups. We reset the effect size to ⫺ 0.66, its next
nearest neighbor among the unadjusted overall effect sizes. Among
```

Same wording under a layout-preserving extraction in a single column → **not a column-fusion
artifact of either extractor.**

**Route 3 — Table 1, footnote d**, a physically separate location (`flat.txt` lines 1293–1294):

> "d The original effect size extracted from this study was ⫺1.57. It was detected as an outlier in
> Grubbs (1950) tests. In the analyses, we reset the value to ⫺0.66, **its next nearest neighbor**
> among unadjusted overall effect sizes."

**The printed text reads "its next nearest neighbor." V2c was right. C2-EC2 was wrong. W3 was right.**

### 2b. The both/only usage distinction — independently confirmed

Every occurrence of the phrase in the paper, from my extraction:

| Location | Wording | Quantity |
|---|---|---|
| Results p.976 (k=26 reset, −0.66) | "its **next** nearest neighbor" | effect size |
| Results p.976 (k=44 reset, −1.03) | "its **next** nearest neighbor" | effect size |
| Table 1 footnote d (−0.66) | "its **next** nearest neighbor" | effect size |
| Results p.976 | "we reset the outlier sample sizes to their **nearest neighbors**" | sample size |
| Table 1 footnote a | "for which the **nearest neighbor** is 799" | sample size |

"Next nearest neighbor" is used for **both** effect-size resets; the bare "nearest neighbor" appears
**only** for sample-size resets. C2-EC2's secondary claim was the exact inverse of the paper's usage,
as W3 found. ✅

### 2c. The dossier now matches

`dossier.md:267`, inside the block introduced by `Verbatim:`, now reads: *"We reset the effect size to
–0.66, **its next nearest neighbor** among the unadjusted overall effect sizes."* **A block marked
verbatim is verbatim again.** ✅

*(Non-actionable, recorded for completeness: the dossier renders the paper's `⫽`/`⫺` typography as
`=`/en-dash and prints `–0.66` where the flat extraction shows a spurious space in `⫺ 0.66` — an
extractor artifact, since footnote d yields `⫺0.66` unspaced. This is the dossier's consistent
transcription convention throughout, not a deviation introduced by this pass. **No action.**)*

---

## 3. W3-2 — false note struck and superseded — **VERIFIED**

`dossier.md:274` — the C2-EC2 quote-accuracy note is **struck (`~~…~~`), not deleted.** The erroneous
text remains legible and traceable. ✅

`dossier.md:276` carries the `⛔ SUPERSEDED` block, marked
`[withdrawn by C2-EC3, 2026-07-20, per W3-1/W3-2]`. Against the five things the brief required it to
record:

| Required | Present | Evidence |
|---|---|---|
| It was a manufactured defect | ✅ | "the struck note above was a MANUFACTURED DEFECT" |
| V2c's quotation was correct; a verifier was wrongly impugned | ✅ | "wrongly impugned a verifier who committed no error. **V2c's quotation was correct.**" |
| The three routes | ✅ | flat p.976; `-layout` same passage/column/continuous "so not a column-fusion artifact"; Table 1 footnote d, "a physically separate location," quoted |
| The both/only usage distinction | ✅ | "'next nearest neighbor' for both effect-size resets (–0.66 and –1.03)… reserves the bare 'nearest neighbor' for the sample-size resets," with both sample-size instances cited |
| Root cause with **scoped** lesson | ✅ | line 278: two-column break `…its next` / `nearest neighbor…`, page-image read dropped the line-final word, then overruled a `pdftotext` quote. Explicitly: "adequate for R1's tabular figures — all exact… failed only on running prose across a line break. The finding is therefore about *scope*, not prohibition" |

The scoping is right on the merits, not merely present: the image route did in fact get every tabular
figure exact (W3 re-derived all of them), and failed only on prose crossing a line break. Banning the
route would have over-generalised from one failure — itself a manufactured finding. The operative
rule as written — a page-image read *must not be used to overturn a text-extracted quote* — is the
correct narrow one. ✅

---

## 4. W3-3 — report-2 annotated, not rewritten — **VERIFIED**

`remediation/C2-editorial-report-2.md` is 223 lines. The **body occupies lines 1–181 and is intact**;
the correction notice is **appended** at lines 182–223 under a horizontal rule.

Critically, **the withdrawn material is still present in the body, unaltered**:
- line 91 — the §R2 paragraph "**One quote-accuracy correction to V2c itself.**" — still there.
- line 160 — the §Calibration line "**One correction was made *to the verifier***" — still there.

Both are withdrawn *by the appended notice*, not by excision. All original section headings survive
in order (Scope and limits / Method / Corrections applied / Correction to the first pass's reasoning
on departure 1 / Claims examined and deliberately LEFT UNCHANGED / Calibration statement / Residual
issues). **The audit trail that caught this error is preserved.** Had it been rewritten, the evidence
of the fourth manufactured defect would have been destroyed. ✅

The notice itself (lines 182–223) withdraws **both** required items and correctly identifies the
dependency: the calibration line "was load-bearing for that self-assessment; with it withdrawn, no
correction was made to the verifier by this pass." It also records the scoped root cause, points to
the dossier remediation, and lists what is explicitly unaffected. ✅

The annotate-don't-rewrite ruling is consistent with C2-EC2's own correct handling of R4 and with the
orchestrator's C4 collection-report precedent. ✅

---

## 5. Confirming nothing else moved — **VERIFIED**

`C2-EC3` appears in exactly **three** files: the dossier, report-2, and its own report-3. Within the
dossier it appears **once**, at line 276 — the W3-2 block. The line-267 restoration is a revert to the
pre-C2-EC2 wording (explained by the adjacent 276 block) and line 278 is contiguous with it under the
same marker. **No other edit marker was introduced anywhere.**

I re-located every W3-verified item in the dossier and found each intact (line numbers shifted by the
W3-2 insertion, content unchanged):

| Item | Status | Located at |
|---|---|---|
| R1 site 1 — forward-pointer instruction struck + scope-limited replacement | ✅ intact | 69 |
| R1 site 2 — F12 headline scope-qualified `[headline scope-corrected by C2-EC2, per V2c R1]` | ✅ intact | 210 |
| R1 site 3 — F12 extraction block (Table 3 figures + body quote + does/does-not) | ✅ intact | 238–256 region |
| R1 site 4 — conflict entry #27 `[SCOPE ADDED by C2-EC2, per V2c R1 …]` incl. "must not be read as cross-analysis robustness" | ✅ intact | 381 |
| R2 substance — "reduced on **four** independent grounds" | ✅ intact | 288 |
| R3 — "cause not established; magnitude de minimis" | ✅ intact | **both** 111 and 379 |
| R4 — non-application (report-1 untouched) | ✅ intact | `C2-editorial-report.md` bears no C2-EC3 marker |
| Departure-1 adjudication — both faulty strands struck, conclusion retained on narrower ground | ✅ intact | 280–282 |
| Six "unchanged as accurate" items | ✅ untouched | not reopened |
| Sufficiency / count | ✅ **SUFFICIENT, 15/15** | 10, 28, 31, 406 |

**No tier, bucket, finding ID, or citation count moved. Zero new sources, zero new citations.** ✅

---

## 6. Assessment of the declined fourth edit — **DECLINING WAS CORRECT**

C2-EC3 examined and deliberately left alone the prose phrase at `dossier.md:271`, consequence #2:
*"The value that does enter the pooled unadjusted analysis is an **imputed nearest-neighbour**, chosen
for outlier control, not measured."*

On the merits, not merely on scope:

1. **It is not a quotation.** It sits in a numbered prose bullet, outside the `Verbatim:` block, with
   no quotation marks and no attribution to the authors' wording. The verbatim-exactness standard
   does not reach it. (It even uses British "-neighbour", signalling dossier prose rather than
   transcription.)
2. **Its meaning is correct.** −0.66 *is* an imputation drawn from a neighbouring value under Grubbs
   outlier control. Whether the paper calls that neighbour the "next nearest" or the "nearest" one
   does not change the claim being made — that the analysed value is substituted rather than measured.
   There is no error here to fix.
3. **It was outside the three specified changes**, and this repair exists precisely because a prior
   pass exceeded its warrant.

Points 1 and 2 are the load-bearing ones: had the phrase been *wrong*, scope alone would not have
justified leaving it, and I would have raised it. It is not wrong. Point 3 then makes restraint not
just permissible but correct. **Editing it would have been a fourth change in a three-change repair,
made against text containing no defect — the exact pattern under remediation.** The declination is
endorsed.

---

## 7. Corrections required

**None.** No correction is required of C2-EC3.

Two items remain outstanding from prior waves and are **unchanged by this pass** — the orchestrator's
call, not defects in C2-EC3:

1. **Conflict register #27** — V2c's amend-not-new-row recommendation. Dossier text landed; the
   register write is still the orchestrator's. Registers were correctly not written to.
2. **W3-4** (R1 body quote drops "overall" from "For adjusted overall effect sizes") and V2c's F2/F11
   de-minimis quote deviations — rated sub-threshold by W3, correctly unactioned, flagged for any
   future character-exactness sweep.

## 8. Register rows (returned as text — registers NOT written to)

| Type | Row |
|---|---|
| Conflict register | **No new row.** #27 amendment remains outstanding with the orchestrator. |
| Source-lead register | **No new rows.** No new source retrieved; I re-read one already in hand. |

## 9. Verifier summary

- **Verdict on C2-EC3: PASS.** Three specified changes, three applied correctly, no fourth change.
- **W3-1 confirmed independently by my own `curl` + `pdftotext` on all three routes** — flat p.976,
  `-layout` same column continuous, and Table 1 footnote d. The printed text reads **"its next
  nearest neighbor."** The both/only usage distinction is confirmed exactly as W3 stated it.
- **W3-2 struck, not deleted**, with all five required elements recorded and the lesson correctly
  scoped to the route rather than banning it.
- **W3-3 appended, not rewritten** — report-2's body is intact at lines 1–181, including both
  withdrawn passages, so the trail that caught this error survives.
- **Declining the fourth edit was right on the merits**: non-verbatim prose, correct meaning, no
  defect to fix, and outside warrant.
- **Nothing else moved.** R1 (all four sites), R2 substance, R3 (both locations), R4 non-application,
  departure-1, and the six unchanged-as-accurate items are all intact.
- **C2 sufficiency: SUFFICIENT, 15/15.** Not reopened, not disturbed.
- **C2 as a whole PASSES the final verification wave. No open items block the Phase 1 gate from C2.**
- **No `git` command was run by this verifier. No dossier or report was edited.**
