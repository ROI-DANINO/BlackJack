# C2 — Editorial Correction Pass (C2-EC) — Report

> Corrector: Claude (Opus 4.8, 1M) — editorial role, **not** the verifier | Date: 2026-07-20
> **Zero new sources collected. Zero new citations. Dossier still 15/15.**
> **Not self-verified.** A separate agent instance re-checks every claim changed here.

## Method

No WebSearch was used (the dispatch granted it and instructed non-use; instruction honoured). No new
source was located. Every source touched is one the dossier already cites, re-read from the URL the
dossier itself records.

Sources re-read in full from primary PDF, text-extracted locally:
1. Steenbergen-Hu & Cooper (2013) — DukeSpace OA bitstream (F12)
2. WWC Cognitive Tutor intervention report, June 2016 — ies.ed.gov (F13)
3. Anderson (1982) — gwern.net mirror (F4, F5)

Every quote below was re-derived by C2-EC from these extractions, **not** copied from V2/V2b. Where
V2/V2b's reading and mine diverge, mine is stated and the divergence flagged.

**Tool note, disclosed for the integrity manifest:** the dispatch's absolute prohibitions were git
(any subcommand), edits outside `journal/raw/_inbox/foundation-audit-p1/`, and build/test/install
commands. **No git command of any kind was run.** Shell use was confined to `curl` (fetching the three
already-cited PDFs into the session scratchpad), `pdftotext`, and read-only text search over those
extractions. Nothing was written outside the audit inbox. The `audit-editor` role card describes a
no-Bash variant that could not be loaded this session; I used shell for source extraction only,
because `pdftotext` on a locally-held PDF is a materially more reliable route to a verbatim quote than
a summarising fetch — which is the exact hazard class this audit exists to catch. Flagging it so the
verifier can weigh it rather than discover it.

## The finding that reframes this pass

**The corrections the brief listed as "already applied — preserve, do not undo" were not in the
dossier.** All of them lived only in `V2-its-actr-procedural.md` and `V2b-its-actr-procedural-toppedup.md`.
Both verification records were written *after* the dossier's last edit, and nothing propagated back.

This is precisely the failure mode the brief itself names: *"a defect recorded only in a verification
record is still a defect in the dossier."* The dossier a downstream synthesiser would have read still
said "three-stage account," still reported g=.10 from the wrong column, still carried the ellipsis that
reverses Anderson's meaning, still said k=3 for the −.42, and still presented the fMRI study as
Anderson's own test of the declarative→procedural transition. Landing those is therefore treated as in
scope, not as duplicated work.

## Register rows (returned as text — registers NOT written to, per dispatch)

**Conflict register — no new rows.** V2b's #27 (report type) and C2-FP's #19 already cover the two
conflicts this pass touches. C2-EC's contribution is landing #27's substance *in the dossier*, plus
one corroborating strand for it (WWC vendor-authorship, below), which strengthens #27 without needing
a separate row.

**Row proposed for withdrawal:**

| Register | Row | Action | Reason |
|---|---|---|---|
| conflict-register.md | (dossier-local "Rounding/reporting inconsistency", Ma et al. abstract vs. Table 1) | **WITHDRAW** — never promote to a register row | Adjudicated by V2 as a column-reading error, confirmed by C2-EC. Abstract's .05 agrees exactly with Table 1 random-effects. Residual .42/.35 vs .44/.36 is online-first-vs-final rounding. |

**Source-lead register — one row proposed (already identified by V2b, restated for completeness):**

| Source | Status | Note |
|---|---|---|
| Qin, Sohn, Anderson, Stenger, Fissell, Goode & Carter (2003), *PNAS* 100, 4951–4956, DOI 10.1073/pnas.0431053100 | Paywall lead (`is_oa: false`) | True primary behind F15's fMRI result. F15 is a first-party secondary route to it. |

## Findings CHANGED (13)

| ID | Change | Direction |
|---|---|---|
| **F1** | Tier Q4 → **Q5** (author's own slides = first-party self-report per rubric). Numeric hedge **relaxed** — d-values are printed in VanLehn's own slide 37 table with effect counts (165/28/26/10), not uncorroborated web search. Locations sharpened to slides 37 and 41. Added what the citation *cannot* support (methods, inclusion criteria, CIs). Noted the "plateau *above* step-level" phrasing is ambiguous vs. VanLehn's own wording. | **Upgrade** + tier fix |
| **F3** | Small-group g = **.05** (random-effects), not .10 — the .10 was read from Table 1's fixed-effect column. Both blocks now recorded. Substantive claim unaffected. | Correction |
| **F4** | Heading "three-stage" → **two-stage**. Anderson's abstract says "two major stages"; knowledge compilation is the *transition*, not a third stage; three-stage is **Fitts (1964)**. Re-verified verbatim from the primary. The finding's own quote already contradicted its own headline. | Correction |
| **F5** | **Material framing reversal.** Restored the clause the inherited ellipsis removed: the power law is distinguished "by its **surface contradiction to ACT's** multiple stage, multiple mechanism view" — Anderson introduces it as a *problem to explain away*, not ACT's signature. Access-downgrade **removed** (primary read directly, p.397); strength downgraded instead. Location moved to Anderson (1982) p.397. | Correction (+ access upgrade) |
| **F7** | "All datasets are RT paradigms" → **nearly all**; a footnoted games-won/lost analysis exists. Added that the PDF is the "In Press" manuscript, so page refs are manuscript pages. | Minor correction |
| **F8** | Collector's flagged uncertainty **resolved in its favour** — exponentials *were* compared (piecewise exponentials explained 90.43% of variance, slightly worse than PPLs). Caveat relaxed. | **Upgrade** |
| **F10** | Access-downgrade **removed**; **Q1 stands undiminished** — the PDF downloads first try from the collector's own URL, both quantities verbatim. Added the missed **verbal-recall-tasks** scope caveat (transfer-relevant; = Conflict #10). | **Upgrade** + added caveat |
| **F12** | **Largest change.** Headline rewritten around the **`Report type` moderator** (peer-reviewed g = .28 fixed/.30 random vs. nonjournal .02/−.01; Qb 24.45 p=.000 fixed, 10.03 p=.002 random) — robust under *both* models, extracted from the same table the collector quoted. Plus: **k = 2 not 3** for the −.42; random-effects point estimates added (−.23 [−1.08, .63] unadjusted; −.16 [−.49, .18] adjusted — **both cross zero**); `Sample size` moderator added *with* its random-effects failure; trim-and-fill publication-bias result added *at its true modest size*; all three constituent low-achiever studies with n, design and both ES columns; location corrected to Table 2 / Table 3 / Table 1 as distinct locations. | Correction + major extraction |
| **F13** | **WWC domain ratings extracted** — all three: algebra **mixed effects** (medium-to-large, +4 avg, −7 to +19, 5 studies, 12,182 students); general mathematics **no discernible effects**; Geometry **potentially negative effects**. Plus the strongest new item in this pass: **both positive studies in the algebra set are vendor-authored** (Wolfson et al. 2008 and Ritter et al. 2007, published by Carnegie Learning, the Cognitive Tutor vendor) while all three indeterminate studies are independent — study-level corroboration of F12's report-type moderator from a different source and method. Counter-weights recorded. | Extraction |
| **F14** | "Anderson **explicitly** abandoned it" is **Taatgen & Lee's characterisation** (citing Anderson & Lebiere 1998), not Anderson's own words. Anderson et al. (2004) calls production compilation "basically a combination of composition and proceduralization… for ACT*" — so **supersession-by-refinement**, not contradiction. Substance stands; the word is now attributed. | Minor correction |
| **F15** | **Material, two axes.** Provenance: fMRI study is **Qin et al. (2003)**, *PNAS* 100, 4951–4956 — Anderson et al. restate it; the caudate panel is "unpublished data from the Qin et al. (2003) study." Access field corrected to disclose a first-party secondary route, matching the standard the dossier applies to F1/F6. Mechanism: the 650→334 ms speedup is attributed **by the paper** to **base-level *declarative* learning** ("Base-level learning is the sole factor producing the speed up") — it is **not** a measure of the declarative→procedural transition. Neural leg flagged as anomalous-and-unexplained by Anderson himself. Tier **Q3 → Q4**. What survives (GT-ASP model comparison) stated explicitly. | Correction |
| **Coverage gap 3 / retraction** | "**Two** direct empirical tests" → **one**. The retraction itself over-corrected. Retraction body **preserved** — its core is sound and its execution auditable. | Correction |
| **Candidate conflicts** | Ma-rounding conflict **withdrawn** (column-reading error). **Report-type conflict added** to the dossier so #27's substance lives in the dossier, not only in a verification record. | Correction + addition |

**Structural (not a finding):** added a **forward pointer** at the head of `## Findings` warning that
F1–F3 are contested by F12–F13, with the report-type moderator named. V2b flagged that F12 pointed
back at F1–F3 but F1–F3 carried no forward pointer, so the dossier did not read even-handedly in
document order.

## Findings EXAMINED and deliberately LEFT UNCHANGED (4)

| ID | Why unchanged |
|---|---|
| **F2** | Kulik & Fletcher (2016). Both quoted sentences confirmed verbatim by V2; citation metadata exact; the abstract-level access limit is disclosed honestly and the Q1/access-downgrade pairing is correct. The caveat that "conventional levels" is a mixed comparator is accurate and appropriately hedged. **Accurate as written.** |
| **F6** | Newell & Rosenbloom (1981) via Heathcote. All three quotes confirmed verbatim inside Heathcote by V2; the access account (chapter not opened; quoted through a secondary) is truthful and the access-downgrade is adequate. The one thing I added is the manuscript-pagination note, recorded under F7 and applying to both. **Accurate as written.** |
| **F9** | Pavlik & Anderson (2008). V2 calls it the cleanest citation in the dossier — every number, the n=60, the 180-item count and the abstract quote verbatim. Its caveat is notably *self-critical* in the right direction (flags that item-difficulty priors come from population data, so a zero-prior solo deployment is untested). **Accurate as written; no pessimism to reverse and no overstatement to cut.** |
| **F11** | Rohrer, Dedrick & Burgess (2014). Abstract verbatim including "(72 % vs. 38 %, d = 1.05)"; design is a counterbalanced crossover and the collector's description is fair; the transfer caveat (grade-7 math ≠ adult strategy-game skill) is honestly stated. **Accurate as written.** |

Also examined and left standing: the **narrower residual coverage gap** ("no generalizable count of how
many repetitions compilation typically requires"). I checked both F14 and F15 for a domain-general
repetition count and neither reports one — Taatgen & Lee fit a single simulated ATC task, Anderson et
al. report a single artificial-algebra task. The gap is **real, not face-saving**, and preserving it
was correct. Likewise the two domain-transfer coverage gaps (no card-game/gambling-adjacent evidence;
no solo zero-population fixed-item-bank deployment) are accurate and were not touched.

## Where I depart from V2b (3) — flagged for the verifier

The brief instructed me to preserve prior corrections. These three are places where the prior
correction was itself inaccurate or incomplete, and the calibration note explicitly authorises
reversing an over-correction. All three are marked `[C2-EC departs from V2b]` in the dossier.

1. **The k=2 arithmetic reconstruction does not verify.** V2b wrote that "an n-weighted fixed-effect
   combination of exactly those two [Plano −0.66 and Smith −0.07] reproduces ≈ −0.44," concluding the
   −.42 "is essentially one quasi-experiment." I could not reproduce this. **Smith has no unadjusted
   effect size printed in Table 1**, so it cannot be one of the k=2 in the *unadjusted* analysis. The
   two printed unadjusted low-achiever values are Biesinger (**+0.22**, n=3,566) and Plano (**−0.66**,
   n=779), and no straightforward inverse-variance weighting of those yields −.42. **The paper does not
   state which two effect sizes compose the k=2 cell.** The *k=2 fact* is verified from Table 2 and
   stands; the *inference about composition* is recorded in the dossier as an open question rather than
   asserted. The conclusion V2b drew is still directionally supportable on other grounds (the only
   true-experimental low-achiever study reports adjusted g = −0.07; the largest sample reports a
   *positive* +0.22) — but not by that arithmetic.

2. **V2b's WWC remedy was incomplete, in the optimistic direction.** V2b asked only that the algebra
   domain's "mixed effects, with a medium to large extent of evidence" be added, arguing a reader
   "would reasonably infer the independent reviewer found the product ineffective. It did not." True of
   the algebra domain only. The same report also rates one domain **no discernible effects** and one
   **potentially negative effects**. Adding the algebra rating alone would have swung the record too far
   the other way. All three are now recorded.

3. **V2b's `Sample size` framing understated a model split.** V2b wrote "Sample size runs the same way
   (< 200: g = .27; > 200: g = .04)" alongside report type. Directionally true, but sample size
   **fails the random-effects specification** (Qb = 0.74, p = .389) with heavily overlapping random CIs
   (.21 vs .05), whereas report type clears both. Recorded as corroborating colour, not a second robust
   moderator — otherwise the dossier would have acquired a *new* overstatement while fixing an old one.

## Calibration statement

Both directions moved, which is the honest outcome and was not engineered:

- **Three upgrades** where the collector was more pessimistic than the evidence warranted (F1 numerics,
  F8 uncertainty, F10 access) — carried forward from V2, which had never landed them, plus F5's
  access-downgrade removed.
- **One over-correction reversed** (the Ma-rounding "conflict," withdrawn as a column-reading artifact)
  and **three prior corrections themselves corrected** (the three departures above), two of which cut
  *against* the pessimistic reading.
- **Four findings examined and deliberately left alone** as accurate — F2, F6, F9, F11.
- The pessimistic corrections that *did* stand (F12, F15) stood because they were re-derived from the
  primary text, not because they confirmed an expectation.

The single largest substantive addition — the `Report type` moderator — is not a pessimistic finding
about ITS. It is a finding about **which ITS numbers to trust**, and it happens to be the best-evidenced
thing in the card: the only moderator besides ITS duration that survives a random-effects specification,
independently corroborated at study level by the WWC's vendor-authorship pattern. That convergence is
the most decision-relevant result C2 now carries.

## Residual issues NOT fixed by this pass (for the orchestrator, not actioned)

1. **Evans et al. (2018), *Psychological Review* 125(4), 592–605** — would date-stamp the Q3 curve-shape
   dispute past 2015. Declared out of scope by V2 and V2b, requires **collection**, and the dossier is
   at the 15-citation hard cap. Not actioned; escalation is the orchestrator's call, not mine.
2. **Retrieval-practice / testing-effect tradition (Q4)** — absent, scoped out pending a check of C3/C5.
   Requires collection. Not actioned.
3. **Qin et al. (2003)** — the true primary behind F15 is paywalled. F15's claims are now correctly
   scoped to what the first-party restatement supports, so this is a lead, not a defect.

None of these blocked the editorial remedy. **The C2 insufficiency V2b identified — that the remedy
costs zero new citations because the evidence was already in hand and never extracted — is now
remedied in the dossier itself.**
