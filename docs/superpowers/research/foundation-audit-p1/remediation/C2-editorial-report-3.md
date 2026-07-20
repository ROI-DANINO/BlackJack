# C2 — Third Editorial Correction Pass (C2-EC3) — Report

> Corrector: Claude (Opus 4.8, 1M) — editorial role, **not** the verifier | Date: 2026-07-20
> Instruction set: `verification/W3-C2-EC2-final.md`, corrections **W3-1, W3-2, W3-3**
> **Zero new sources. Zero new citations. Zero collection. Dossier still 15/15.**
> **Not self-verified.** A separate agent instance should re-check every change recorded here.
> `C2-editorial-report-2.md` was **annotated, not rewritten**; `C2-editorial-report.md` untouched.

## Why this pass exists

The final pre-gate verification wave (W3) found that C2-EC2 **manufactured a defect**: it asserted
that the prior verifier (V2c) had misquoted the Steenbergen-Hu & Cooper reset sentence, and "fixed"
the dossier accordingly. **V2c was right and C2-EC2 was wrong.** The dossier was left carrying a
corrupted quote inside a block introduced by `Verbatim:`, plus a note asserting a falsehood about the
primary source and impugning a verifier who committed no error.

This is a **bounded, zero-citation editorial revert**. Exactly three changes were applied. Nothing
else in C2-EC2 was reopened.

## Scope and limits observed

- **No collection.** No `WebSearch` (this role has none). **No WebFetch was needed** — W3's three
  independent extraction routes are recorded verbatim in the verification record, and the correction
  is a revert to a wording W3 established, not a new determination.
- **No `git` command of any kind was run.** This role has no Bash tool at all, so the boundary is
  structural rather than promised. No build, test, or install command was run.
- Nothing was written outside `journal/raw/_inbox/foundation-audit-p1/`. No product code, spec, plan,
  charter, roadmap, task board, or register was touched.
- **C2 sufficiency not reopened.** Remains **SUFFICIENT, 15/15**. No tier, bucket, finding ID, or
  citation count moved. **No new findings added.**

## The established facts

The printed text (Steenbergen-Hu & Cooper, Results, p.976) reads:

> "We reset the effect size to −0.66, **its next nearest neighbor** among the unadjusted overall
> effect sizes."

Established by W3 on three independent routes:

1. `pdftotext` **flat** extraction, Results p.976.
2. `pdftotext -layout` extraction of the **same passage, same column, continuous** — so the wording is
   not a column-fusion artifact of either extraction.
3. **Table 1, footnote d** — a **physically separate location** in the paper: *"…we reset the value to
   −0.66, its next nearest neighbor among unadjusted overall effect sizes."*

C2-EC2's secondary claim is the **reverse of the paper's usage**: "next nearest neighbor" is the
paper's wording for **both** effect-size resets (−0.66 and −1.03); the bare "nearest neighbor" appears
only for the **sample-size** resets.

## Corrections applied — exactly three

### W3-1 — restore the verbatim wording — **APPLIED (material)**

`C2-its-actr-procedural/dossier.md`, the `Verbatim:` Grubbs block in the F12 Table 1 extraction note
(was line 267). The quote now reads **"its next nearest neighbor"**, matching the printed text. A block
marked verbatim is once again verbatim. ✅

### W3-2 — strike the false quote-accuracy note — **APPLIED (material)**

Same file, the C2-EC2 quote-accuracy parenthetical (was line 274). Per the brief and this program's
standing practice, it is **struck (`~~…~~`), not deleted**, so the error remains traceable, and is
immediately followed by a `⛔ SUPERSEDED` block recording plainly:

- the struck note was a **manufactured defect**;
- **V2c's quotation was correct** — a verifier was wrongly impugned, and the record now says so;
- the three independent routes on which W3 established the printed wording;
- that the paper uses "next nearest neighbor" for **both** effect-size resets and reserves the bare
  "nearest neighbor" for the **sample-size** resets — the inverse of what C2-EC2 asserted;
- the **root cause**, and its correct scope: in the printed two-column layout the phrase breaks as
  `…its next` / `nearest neighbor…`, and a **page-image read dropped the line-final word**, which was
  then used to overrule a `pdftotext`-derived quote. That route was **entirely adequate for R1's
  tabular figures — all exact** — and failed only on **running prose across a line break**.
  **The lesson is to scope the route, not ban it.** ✅

### W3-3 — annotate (do not rewrite) `C2-editorial-report-2.md` — **APPLIED (cosmetic)**

`remediation/C2-editorial-report-2.md`: the report body is **preserved verbatim**; a
`⛔ CORRECTION NOTICE` is **appended** at the end. Same ruling C2-EC2 itself correctly applied to R4,
and the same ruling the orchestrator applied to the C4 collection report — a filed report is a
historical record of what a pass believed at the time, and preserving it is what makes the error
traceable. The notice withdraws:

- the §R2 paragraph "One quote-accuracy correction to V2c itself" — **unfounded**; and
- the §Calibration line **"One correction was made *to the verifier*"** — the calibration claim that
  **rested on it**, and which was load-bearing for that pass's self-assessment of bidirectional
  balance. With it withdrawn, **that pass made no correction to the verifier.**

The notice also records the root cause with its correct scope, points to the dossier remediation, and
lists explicitly what is **not** affected. ✅

## Examined and deliberately LEFT UNCHANGED

Per the calibration instruction — accurate-as-written is a legitimate finding, and this pass exists
because an agent invented a defect. **No fourth change was made.**

| Item | Why unchanged |
|---|---|
| **R1** (all substance + all four propagation sites) | W3 verified character- and digit-exact against Table 3 p.980, body p.981, and Table 2; k=17/k=26 confirmed; **four of four sites landed**, including the reader-facing forward pointer. Not reopened. |
| **R2 substance** and its application | W3 verified; correctly identified as cutting **against** pessimism and applied at full strength (four grounds, not three). Only the appended verifier-correction was defective. |
| **R3** | Applied correctly in **both** locations (dossier lines ~111 and ~375). Not reopened. |
| **R4** — recorded, not applied | W3 endorsed the non-application as the **right rule** (annotate, don't rewrite). Not reopened. |
| **Departure-1 adjudication** | W3 reproduced both weighted means (+0.0622 and −0.4455) and confirmed by full-text search that the paper never states the k=2 composition. Sound. Not reopened. |
| **All six "left unchanged as accurate" items** | W3 independently re-derived every one from its own extraction; **all exact**. Not reopened. |
| **Dossier consequence #2, "an imputed nearest-neighbour"** (prose, near the corrected block) | Author's-prose paraphrase in a **non-verbatim** bullet, not a quotation; meaning correct; **outside the three specified changes.** Deliberately left alone rather than expanded into a fourth edit. |
| **W3-4** (R1 body quote drops "overall" from "For adjusted overall effect sizes") | W3 rated it **sub-threshold, no action**, meaning unchanged. Not actioned here; flagged for any future character-exactness sweep alongside V2c's F2/F11 de-minimis deviations. |

## Calibration statement

This pass had **one direction only**, and it is the honest one: it **removes** a finding rather than
adding one. A prior corrector, rewarded for finding problems, found one that did not exist and made
the dossier *less* accurate in the name of accuracy. The remedy is a revert plus an explicit record
that the verifier was right — including in the filed report whose calibration claim depended on the
false finding.

- **No new defect was asserted.** Nothing was "found" beyond the three corrections W3 specified.
- **No fourth change was made.** One adjacent item (prose paraphrase, above) was examined and
  deliberately left alone, precisely because expanding scope is the failure mode this pass corrects.
- **The route finding was recorded as scoped, not as a ban** — page-image reads remain adequate for
  typeset tables and are demonstrably weaker for running prose across line breaks. Over-generalising
  from one failure would be its own manufactured finding.

## Residual issues NOT actioned (orchestrator's call)

1. **Conflict register #27** — V2c's amend-not-new-row recommendation remains outstanding; the scope
   text landed in the dossier, the register write is still the orchestrator's. **Registers were not
   written to.**
2. **W3-4** and the **F2/F11 de-minimis quote deviations** — sub-threshold, unactioned by design.
3. **Gate summary §4** — program-level, not a dossier item. Not actioned here.

## Files changed

| File | Change |
|---|---|
| `C2-its-actr-procedural/dossier.md` | W3-1 (verbatim wording restored) + W3-2 (false note struck, superseded block added) |
| `remediation/C2-editorial-report-2.md` | W3-3 — correction notice **appended**; body preserved verbatim |
| `remediation/C2-editorial-report-3.md` | this report (new) |
