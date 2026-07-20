# C4 Editorial Report — pass C4-ED (2026-07-20)

> Editor: Claude (Opus 4.8) — EDITORIAL CORRECTOR role, `.claude/agents/audit-editor.md`
> Target: `C4-chesscom-khan/dossier.md` | Instruction set: `verification/V4c-chesscom-khan-remediated.md`
> **Append-only lifted for this pass.** Edits applied in place; superseded text struck through
> (`~~…~~`) and dated, never deleted. All finding IDs and section structure preserved.
> **No collection performed. No source added. No WebFetch issued** — every correction was made from
> text already quoted verbatim inside V4, V4b or V4c, so no re-read of a cited source was needed.

## Why this pass existed

Three corrections recorded in V4/V4b were never applied to the dossier itself; V4c confirmed the same
defect pattern that had just been confirmed on C2. A correction living only in a verification record is
not a correction — a synthesiser reading the dossier still gets the wrong claim. This pass discharges
that editorial debt in place, plus V4c's five minor defects D1–D5.

## Summary

| | Count |
|---|---|
| Findings changed | **4** (F10, F11, F12, F13) |
| Findings examined and deliberately left unchanged | **9** (F1–F9) |
| Non-finding sections changed | 7 |
| Corrections running **against** the dossier (downgrades / strikes) | 5 |
| Corrections running **in the dossier's favour** (upgrades / over-corrections reversed) | 4 |
| Sources added | **0** |
| Verdicts reopened | **0** — F13 remains VERIFIED, C4 remains SUFFICIENT |

---

## 1. The three recorded-but-unapplied corrections — ALL NOW APPLIED

### 1a. The superseded `[corrected by C4-FP]` coverage-gap bullet — RE-STATED IN PLACE
**Was:** the bullet reported the independent Khan Academy evidence as merely *existent*, with its
correction ("that evidence is *mixed*") sitting ~160 lines downstream in an appended C4-RT section. A
reader who read the Coverage-gaps section and stopped got the incomplete picture.
**Now:** the full re-statement is applied **at the bullet itself** — independent evidence is **mixed**,
itemised across F10 (positive, cluster-RCT, g = 0.32, with attrition and baseline non-equivalence),
F11 (positive but correlational, **author-independent only**), F12 (positive, n = 3, nonconcurrent
design), F13 (**null**, only equal-time active-control comparison). Direction-of-movement paragraph
carried in place. The original text is struck, not deleted, and the C4-RT appended section is retained
as the record of origin with its status updated. Downstream readers no longer need to reach the
appended section.
**Two qualifiers carried with it, per V4c:**
- the aggregate "every positive independent finding compares KA against less of it or none of it" is
  **asserted but not established for F10** — F10's comparison condition is nowhere characterised in
  this dossier. Holds outright for F11/F12; F7/F8 are not independent so fall outside its scope.
- the null carries a modest **efficiency** reading the dossier quoted but never weighted ("no worse
  than more traditional forms of supplemental instruction", p.76; the paper's own resource-efficiency
  framing, p.74). Now weighted. *(Runs in the dossier's favour.)*

### 1b. F11 — INDEPENDENCE DOWNGRADE — APPLIED
**Was:** F11 read as "genuinely independent", "Gates Foundation–funded rather than
Khan-Academy-funded", with the funder question logged as an open item "left unresolved rather than
asserted either way" — and separately logged as a coverage gap.
**Now:** applied as a prominent downgrade block at the head of F11, with the two struck phrases marked
inline. F11 is **author-independent only**. Stated as established fact, not open question:
- p.iii — "In 2010 Khan Academy received major funding from the Bill & Melinda Gates Foundation and
  Google…" / "the Bill & Melinda Gates Foundation contracted with SRI International to study the
  implementation of Khan Academy." **Khan Academy's own major funder commissioned this study of its
  own grantee.**
- p.9 — "The research team selected the study sites in collaboration with Khan Academy."
- p.ii — Acknowledgments thank KA leadership and staff for "collaboration throughout this study".

The "unresolved" note is struck with the reason named plainly: **this was never an open question —
the answer was on p.iii of a PDF the pass had already downloaded and read in full. That is a search
failure inside a source already in hand, not honest gap-naming**, and it resolves *against*
independence. The matching C4-FP coverage-gap bullet is struck as **CLOSED — not a coverage gap**.
Q3 tier and non-causal framing untouched (V4b confirmed both correct).

**Additional unapplied V4b item found and fixed while in F11: a paraphrase presented as a quotation.**
The dossier renders `"multiple plausible explanations for any of the reported associations"` in
quotation marks. That sentence is not in the report; the actual p.38 wording is "Multiple explanations
for these associations are plausible in addition to the possibility of a causal link…". Substance
unaffected, quotation marks not earned. Flagged at the head of F11 and marked inline. This is the
exact defect class the program has repeatedly caught.

### 1c. F12 — TIER-WARRANT STRIKE — APPLIED
**Was:** Q2 justified on the ground that "multiple-baseline designs stagger intervention onset…
**specifically to control for history/maturation confounds**."
**Now:** that rationale is struck at the tier field itself. The study is a **nonconcurrent** multiple
baseline design and its authors state the opposite about exactly that property: the design "**is
limited in functional control due to its inability to identify history and maturation effects**", with
a call for concurrent designs before attributing change to Khan Academy. Also noted: the warrant was
asserted about a design feature the pass could not have read — "multiple baseline" appears nowhere in
the abstract it says it worked from. **Q2 retained** (single-case experimental: IV manipulated against
a steady-state baseline); only the reason is replaced.

---

## 2. V4c defects D1–D5 — ALL APPLIED

| ID | Location | Direction | Applied |
|---|---|---|---|
| **D1** | F13, funding/independence bullet 2 | against | "The back page (p.77) carries only the Athabasca University logo and the CC BY licence mark" is **false** — p.77 carries the **tail of the reference list** (nine entries, named) under the running head. Struck and corrected. **The load-bearing claim is unaffected** and independently reconfirmed: an eight-page sweep for funding/acknowledgment/COI terms returns zero substantive hits. Article structure recorded. |
| **D2** | F13, internal-inconsistency item (ii) | against | "the paper never states its tail convention" is inaccurate — **Table 2's own note states it**: "significant at the 0.05 level (2-tailed)" (p.75). Corrected to the defensible version: no convention is stated **for the t-tests**. |
| **D3** | F13, same item | against | The blanket "the reported p-values are not conventional two-tailed values" **over-generalises**. Corrected to the sharper, accurate version: **the paper mixes conventions** — `p = .596` and all four correlation p-values (.0009/.0095/.4231/<.0001) **are** conventional two-tailed; the defect is confined to the **two t-tests**, which report **upper-tail one-tailed** values, *t*(60) = −1.009 at *p* = .842 being one-tailed *in the direction opposite to its own effect*. Null conclusion confirmed unchanged (two-tailed values .3170 / .5177 / .5964). |
| **D4** | F13, "Outcome measure sensitivity" | **PESSIMISTIC — corrected in the dossier's favour** | See below. |
| **D5** | header, l.216, l.233, l.370 | against | Source counts. See §3. |

### D4 in full — the pessimistic defect, corrected in the dossier's favour
This is the one defect that ran *against* the source in the dossier's disfavour, and it is corrected
rather than preserved because pessimism feels safer.

**Struck:** "a low-ceiling, low-sensitivity measure… This is a real threat to detecting any effect and
the paper does not discuss it."

Both halves are unsupported by the source:
1. **"Low-ceiling" is contradicted by the paper's own reported data.** Group means 70.08–73.78%, SDs
   10.60–17.66, and the paper reports scores "normally distributed (assessed by Shapiro-Wilk's test)"
   with homogeneity of variances (Levene's, p = .949) (p.74). A genuine ceiling produces pileup near
   the maximum and negative skew; ~72% with confirmed normality is the opposite.
2. **"the paper does not discuss it" understates a paper whose entire design rationale was escaping a
   ceiling effect.** The prior measure (class grades) was "heavily skewed with a high number of
   students with course grades at or above 100%", and "**Due to the potential ceiling effects of the
   previously-used measure**, the lead author designed a study with the explicit intent of
   investigating the association… [with] an assessment that would result in more normally distributed
   scores" (p.72). The paper engaged the ceiling question directly and, on its own diagnostics, solved
   it.

**Replacement wording now in the dossier:** *a 21-item instrument built from below-grade-level content
and given to an above-average sample is coarse and off-target in difficulty, which limits sensitivity
to small differences (one item ≈ 4.8 percentage points); the paper selected it specifically to escape a
ceiling effect in its prior measure and reports that it produced normally distributed scores, but never
examines the replacement instrument's own sensitivity.* The factual core — 21 items, grade-six content,
above-average sample — was accurate and is retained.

---

## 3. Header and source counts (D5) — CORRECTED

Three mutually inconsistent statements existed; all three are now reconciled to one figure.

| Location | Was | Now |
|---|---|---|
| Header ll.6–7 | "9 … total 12/15" (stale) | **13 findings / 15 distinct sources**; "13/15" under the header's own findings-based convention |
| l.233 (C4-RT note) | "13 findings / 5 distinct sources added since the original 9" → implies **14** | struck; corrected, with the reason (omits F13's own source from its own tally) |
| l.370 (running total) | "13 findings / **9** distinct sources" → the original F1–F9 count carried forward as if it were the running total | struck; corrected, with the full per-pass enumeration table reproduced |
| l.216 (pre-existing C4-FP error) | "drawing on **4** distinct sources" while enumerating 3 + 1 + 1 = 5 | corrected to **5**, noted as predating the C4-RT pass |

**Per-pass enumeration now printed in the dossier:** original F1–F9 = 9 findings / 9 sources; C4-FP
F10–F12 = 3 findings / 5 sources; C4-RT F13 = 1 finding / 1 source. **Total 13 / 15.**

**Recorded plainly, as instructed:** on a distinct-source count the dossier now sits at **exactly the
hard cap of 15**. No further collection is available on C4 without raising the cap. This is stated in
three places (header, Overflow-leads, final running-total block) and is consistent with — and
reinforces — V4c's SUFFICIENT verdict and its ruling that *"No new collection is warranted on C4."*

---

## 4. Additional corrections applied in the dossier's FAVOUR

Beyond D4, three items were recorded as under-claims and are now applied. Upgrades are legitimate
findings and were not suppressed.

1. **F12 access + funding (V4b, unapplied).** The dossier recorded "abstract-level access" after
   Springer and ResearchGate failed. **The full text is FREE at PMC12779882** — and the PubMed page
   the pass says it read directly displays both "Free PMC article" and the PMCID. On that full text
   the pass's own open funding item **resolves clean**: "The authors did not receive support from any
   organization for the submitted work and declare they have no financial interests"; n = 3 confirmed.
   **F12's independence is the strongest of the three C4-FP sources — confirmed on authorship, COI
   *and* funding — not the weakest on that axis.** Both stale statements struck and corrected.
2. **F13 bias-direction argument — strengthened (V4c).** The dossier rested the argument on the lead
   author's advocacy alone. The sentence immediately following records that he had **already run an
   earlier comparison in the same setting that also returned a null** (p.72). An advocate who found a
   null, built a better instrument to test it again, and reported a null a second time is a materially
   harder pattern to explain as motivated reasoning than advocacy alone. Applied.
3. **F13 internal inconsistency (i) — firmer than stated (V4c).** Table 1 reconciles **exactly with
   itself** (weighted total 71.89 = printed Total 71.89), while the weighted combined control is 71.21,
   not the narrative's 72.22. **The tables are internally coherent; the narrative figures are the
   outliers** — which localises the error rather than leaving it ambiguous. Table-derived MD would be
   1.97 rather than 1.53; still null, still small, still in the treatment's favour. Applied.

**One caveat added rather than a correction (V4c):** F13's teacher/condition confound argument is
probabilistic, not airtight — the lead author was a technology-education teacher, not the students'
math teacher, so a residual scenario survives in which he was simply a weaker math instructor, which
would bias *against* treatment and partly manufacture the null. The paper reports no instructor-quality
measure. Carried as a one-line residual, per V4c's explicit "as a caveat, not as a correction."

---

## 5. Additional unapplied correction found and fixed

**F10 — supporting-location precision (V4b, recorded and never applied).** The 0.14–0.50 interval is
attributed to *Hedges g* explicitly only in the **short paper (b), p.641**; the long-paper sentence the
dossier actually quotes says "around the effect estimate". Corrected at the supporting-location field.
**Explicitly noted in place: V4b applied NO downgrade of any kind to F10** — its cohort limitation and
both author-flagged validity threats are represented at full source strength. This is a citation-
precision fix and must not be read as a weakening of F10.

---

## 6. Examined and deliberately LEFT UNCHANGED

Per the calibration instruction — claims accurate as written are left alone and said so.

| Finding | Verdict | Why left unchanged |
|---|---|---|
| **F1** | Accurate | "Glicko-style" correctly not upgraded to a named algorithm; the caveat naming that limit is already present and honest. V4 found it clean. |
| **F2** | Accurate | The crowd-calibration quote is verbatim and the caveat correctly separates the one-time 17-billion re-rating event from routine new-puzzle seeding. This is the card's most sufficiency-relevant fact and it is stated at exactly its evidence strength. |
| **F3** | Accurate | Glicko/RD framing and the peer-pool-vs-item-pool distinction are correct and correctly kept distinct from F1/F2. |
| **F4–F6** | Accurate | Khan Academy mastery mechanics; Q5 tier correct for product documentation; the "no rating, no confidence interval, no item-difficulty parameter" reading is supported by the quoted definitions. |
| **F7** | Accurate | Non-independence ("in partnership with") is disclosed, not smoothed; the abstract-vs-blog-gloss distinction on the elementary/middle split is explicitly flagged as first-party gloss; ITT correctly labelled. |
| **F8** | Accurate | COI disclosed in detail, Q3 correctly assigned *despite* PNAS publication, and the "should not be cited at the strength of independent replication" warning is present. |
| **F9** | Accurate | Explicitly flagged out-of-product-scope rather than silently presented as Chess.com evidence; V4 found this honest and I concur. |
| **F13 headline, tier, quotes, statistics, page attributions** | Accurate | V4c independently re-verified all eleven page attributions, all five named quotes, all seven statistics and every design particular — all correct. **Q3 was correctly taken over the more flattering Q2.** Not reopened; V4c ruled F13 **VERIFIED**. |
| **Sufficiency statement (Q5)** | Verdict unchanged | Scope note added only (it refers to F7/F8 and predates F10–F13). Its verdict is unaffected: F10–F13 are outcome studies, none evaluates the mastery ladder as a measurement instrument. V4b and V4c both confirm. |
| **Three Chess.com-side coverage gaps** | Accurate | V4 and V4b both found them honest; V4c declined to re-penalise. Genuine absences in the literature, not search failures. |
| **Candidate-conflict sections** | Accurate | V4c concurs that F13's null is an *opposing position*, not an *evidence conflict* — different population, dose and comparison. No conflict-register row. |
| **Böhmer et al. (2014) lead** | Accurate | Correctly carried as an unretrieved lead and **not asserted**; V4c independently confirmed it exists in F13's reference list as described and that F13's characterisation of its confound is verbatim-supported. |

---

## 7. Noted but NOT edited

**D1's false back-page claim is repeated in `remediation/C4-collection-report.md`.** I corrected it in
the dossier — the artefact downstream synthesis reads — but left the collection report intact, on the
view that a pass's own record is a historical document and amending another pass's record is outside an
editorial mandate scoped to the dossier. Flagged here for the orchestrator to rule on.

## 8. Boundaries observed

- **No collection.** Zero sources added. V4c: *"No new collection is warranted on C4."* Honoured.
- **No WebFetch issued.** Every corrected claim was already quoted verbatim inside V4/V4b/V4c, so no
  re-read of a cited source was required to word any correction accurately.
- **F13 not re-litigated** — remains VERIFIED. **C4 sufficiency not reopened** — remains SUFFICIENT.
- No file outside `journal/raw/_inbox/foundation-audit-p1/` was read or written.
- Shared registers **not** appended to; rows returned in the response text instead.
- I do not mark my own corrections verified. A separate instance should re-check them.
