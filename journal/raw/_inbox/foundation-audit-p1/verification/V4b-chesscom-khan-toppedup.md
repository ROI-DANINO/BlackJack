# Verification Record: C4b — Chess.com and Khan Academy learning models (focused-pass top-up)

> Verifier: Claude (Opus 4.8) — V4b, independent of the collector, of V4, and of the top-up
> collector (C4-FP)  |  Date: 2026-07-19
> Contract: exists + supports + strength-honest. VERIFIED requires an exact supporting location.
> Every source is INDEPENDENTLY located by the verifier — the collector's summary is not trusted.
>
> **Scope per V-card C4b.** PART 1 covers **F10–F12 only** (the three findings added under
> `## Findings added by focused pass (C4-FP, 2026-07-19)`), plus the one permitted in-place edit to
> the coverage-gap bullet. F1–F9 were fully verified by V4; that pass stands and was not redone.
> PART 2 re-judges sufficiency of the **whole enlarged dossier (F1–F12)**.

**Method note.** Every source was obtained by me, by route rather than by summary. Both RUME
conference PDFs (ED583985, ED583986) and the SRI 2014 report PDF were downloaded with `curl` and
converted with `pdftotext`, then grepped and read locally — never trusted from a fetch summary, per
this program's known PDF-extraction hazard. Local extractions: ED583985 = 3,516 words / 8pp;
ED583986 = 6,052 words / 13pp; SRI 2014 = 36,239 words / 82pp (the collector reported 36,189 —
consistent, differing only by extraction flags). The IES award record was fetched via WebFetch. The
Patil & Juanico record was fetched from PubMed **and from PMC**, where the full text proved to be
freely available (see F12). Note: this session's WebSearch budget was exhausted before my
sufficiency sweep, so Part 2 probes were run via direct WebFetch/`curl` against named targets and
against the reference lists of sources already in hand — a narrower instrument than free search,
declared here so the weight of my SUFFICIENT/INSUFFICIENT call can be judged accordingly.

**The specific risk this card asked me to test** — that a correction of an *understatement* swung
too far the other way — **is real and is present**, in two places: F11's independence claim and
F12's quality-tier warrant. Both are recorded as strength downgrades below. The correction did not
fabricate anything; it overshot on characterisation, twice, in the same direction (toward
independence and strength).

| # | Claim | Source (id / title / URL·DOI) | Indep. located? | Exists | Supports | Strength honest | State | Supporting location (VERIFIED only) | Quality tier | Notes / downgrade |
|---|---|---|---|---|---|---|---|---|---|---|
| F10 | Independent federally funded multi-site cluster-RCT of Khan Academy's Algebra Basics Mission in CA community college algebra: Hedges g = 0.32, 95% CI 0.14–0.50, first of two cohorts; authors flag baseline non-equivalence and 68% instructor attrition | (a) IES Award Record R305A140340, "Khan Academy Resources for Maximizing Mathematics Achievement: A Postsecondary Mathematics Efficacy Study" (PI Steve Schneider, Co-PI Shandy Hauk; WestEd) https://ies.ed.gov/use-work/awards/khan-academy-resources-maximizing-mathematics-achievement-postsecondary-mathematics-efficacy-study ; (b) Hauk, Matlen & Thomas (2017), RUME 20 Proceedings, pp.638–645, https://files.eric.ed.gov/fulltext/ED583985.pdf ; (c) Hauk & Matlen (2017), RUME 20 Proceedings, pp.360–372, https://files.eric.ed.gov/fulltext/ED583986.pdf | Yes — award page fetched; both PDFs downloaded and extracted locally | ✓ | ✓ | ✓ | **VERIFIED** | (c) p.367, fixed-effects results: "Controlling for students' pretest EAP scores, we found that using this particular WATS platform corresponded to a 0.35 increase in students' post-test EAP scores. This difference is considered a statistically significant positive effect (p < .05). The Hedges g value for this effect is 0.32" — verbatim; CI sentence, same page: "The 95% confidence interval around the effect estimate was 0.14 - 0.50, which is large, but spans an exclusively positive range." — verbatim. Raw-score model, p.367: "impact of WATS was estimated to result, on average, in a 2.57 point increase in student raw score. This was a statistically significant positive effect (p = 0.04, SE = 1.18, Hedges g = 0.32)." — verbatim. Percentile passage, p.367: "an effect size of .32 would correspond to an approximate 11 percentile point increase in scores... would perform at the 61st percentile in the normed sample" — verbatim. Sample, p.363: "Initial enrollment in the study included 89 instructors across 38 college sites. Attrition of instructors from initial enrollment to the end of the spring efficacy data semester was significant (68%). For this report, we analyzed the data from 510 students of 29 instructors across 18 colleges." Table 2 confirms 29/510/18 (Control 17/328/13; Treatment 12/182/11). Baseline non-equivalence, pp.365–366: "the difference between student pre-test EAP scores was substantive across conditions (g = 0.30). The EAP pretest difference for students is large enough that the analytic sample might be considered non-equivalent at baseline on this variable" + WWC threshold sentence ("differences of Hedges g > .25 are considered not amenable to statistical correction"). Second-cohort statement, p.367: "we are repeating the study with a second cohort of instructors and their students in the 2016-17 school year. Pooling the results of these two studies will help to determine the extent to which the findings replicate." (b) p.641 carries the parallel short-paper result and CI. Award page (a) confirms verbatim: PI Schneider, Co-PI Hauk, WestEd, award R305A140340, $2,197,416, 07/01/2014–06/30/2017, sample 588 students / 34 instructors / 20 colleges, intervention "Khan Academy's Algebra Basics Mission". | **Q2 — confirmed correct** | **No downgrade. This finding is handled well and, if anything, conservatively.** Every figure, quote, sample count and validity threat verified verbatim; the cohort limitation is stated accurately and is *not* minimised — the dossier's "first-of-two-years cohort only… explicitly labeled 'early results' and 'preliminary'" is exactly what both papers say. Both author-flagged threats are represented at full source strength (attrition named as 68% and "significant"; baseline non-equivalence given with g = 0.30 and the WWC-threshold consequence). **Independence independently confirmed and it holds:** all three bylines are WestEd only (Hauk, Matlen, Thomas), no Khan Academy staff; funding acknowledgement in both papers reads "This project is supported by a grant from the U.S. Department of Education, Institute of Education Sciences (IES-R305A-140340)". Neither paper carries a COI statement at all — so the dossier's "(where checked)" hedge is *honest* for F10 rather than evasive. **Treatment-naming caveat confirmed and correct:** I grepped both PDFs; "Khan Academy" appears only as a comparator example (e.g. ED583986 p.—: "a system such as ALEKS or the 'mastery challenge' approach now used in the online Khan Academy Mission structure"), never as the named treatment, which both papers call only "the particular WATS investigated in our study". The identification rests on grant number R305A140340 matching the award record whose intervention field names Khan Academy's Algebra Basics Mission — a sound chain, and the dossier flags the gap rather than papering over it. **Minor supporting-location note:** the dossier attributes the 0.14–0.50 interval to *Hedges g*. The long paper (c) says "around the effect estimate"; it is the **short paper (b), p.641** that attributes it to g explicitly — "The 95% confidence interval of the Hedges g value is .14 - .50." The dossier's attribution is correct but is supported by (b)'s wording, not (c)'s, which is the quote it prints. |
| F11 | SRI 2014 KA report is an implementation study, not an effectiveness evaluation; authors state no RCT was attempted; findings correlational, mixed significance | Murphy, R., Gallagher, L., Krumm, A., Mislevy, J., & Hafter, A. (2014). *Research on the Use of Khan Academy in Schools*. Menlo Park, CA: SRI Education. https://s3.amazonaws.com/KA-share/impact/khan-academy-implementation-report-2014-04-15.pdf | Yes — PDF downloaded and extracted locally (36,239 words) | ✓ | ✓ | **✗ → ✓ after downgrade** | **VERIFIED (downgraded)** | Design disclaimer, p.iv: "Because of the early-stage, emergent nature of both Khan Academy as a school resource and of schools' personalized learning implementation practices, SRI conducted an implementation study rather than an evaluation of Khan Academy's impact. An experimental test of an intervention's impact (a randomized control trial) would have required a clearly specified treatment, including a protocol for its enactment. Because neither the Khan Academy resources and tools nor the way in which they were used in classrooms was stable across the various study sites and across the 24 months of this work, it was too soon to attempt a rigorous evaluation of the impacts of using Khan Academy." — **verbatim, in full**. Non-causal disclaimer, same section: "these analyses are correlational and do not constitute definitive evidence with respect to Khan Academy impacts." — verbatim. Test-score association, p.37: "A positive association was found between more Khan Academy use and progress and improvements in student test scores." — verbatim; 8th-grade qualifier, p.37: "a strong trend in eighth grade in the same direction. Note, however, that that trend was not statistically significant" — verbatim. Attitudinal finding, p.38: "A positive association was found between more Khan Academy use and progress and improvements in three of the four self-reported nonachievement outcomes – math anxiety, math self-concept, and academic efficacy." — verbatim; p.39: "Although these findings linking Khan Academy use and better than expected nonachievement outcomes are encouraging, they are correlational in nature rather than proof of causal impact." — verbatim. Scope, p.2: "nine sites in California". | **Q3 — confirmed correct** | **The Q3 tier and the non-causal framing are correct, adequate, and well handled — nothing in the finding reads as causal, and the disclaimer the card asked me to confirm exists exactly as quoted.** The downgrade is entirely on **independence**. (1) **The funder question the pass declared "not checked" is answered inside the very PDF the pass says it downloaded and read in full.** p.iii: "In 2010 Khan Academy received major funding from the Bill & Melinda Gates Foundation and Google to build out its organization and create additional content." — and the next paragraph: "the Bill & Melinda Gates Foundation contracted with SRI International to study the implementation of Khan Academy". So the study's funder is, on the report's own first page, Khan Academy's own major funder, and it commissioned this study of its own grantee. Leaving this "unresolved rather than asserted either way" is therefore **not honest-gap-naming; it is a search failure inside a source already in hand**, and it resolves against independence, not for it. (2) Two further KA-relationship disclosures the dossier does not surface, both in the same PDF: Acknowledgments, p.ii — "we would like to acknowledge the contributions of the leadership and staff at Khan Academy and their valuable insights and collaboration throughout this study"; and p.9 — "The research team selected the study sites in collaboration with Khan Academy". Site selection by the sponsor's grantee is a material design-independence fact. (3) **Quote-accuracy defect:** the dossier presents `"multiple plausible explanations for any of the reported associations"` inside quotation marks. That sentence is not in the report. The actual text (p.38) is "Multiple explanations for these associations are plausible in addition to the possibility of a causal link between Khan Academy use and better than predicted test performance." Substance is unaffected; the quotation mark is not earned. **Downgraded claim:** *F11 is independent of Khan Academy **by authorship only** — SRI International, no KA staff on the byline. It is **not** independent by funder (commissioned by the Bill & Melinda Gates Foundation, a major Khan Academy funder from 2010, per the report itself) and not fully independent by design (KA collaborated on site selection; KA staff worked closely with the research team, both per the report itself).* The weakened claim is fully supported and re-verified. |
| F12 | Patil & Juanico (2024), independent single-subject study at Univ. of Kansas (n=3), found Khan Academy effective for all three participants | Patil, P. A., & Juanico, J. F. (2024). "The Effectiveness of Khan Academy in Teaching Elementary Math." *Behavior Analysis in Practice*, 18(4), 991–1004. DOI 10.1007/s40617-024-00982-6. https://pubmed.ncbi.nlm.nih.gov/41523820/ ; **free full text: https://pmc.ncbi.nlm.nih.gov/articles/PMC12779882/** | Yes — PubMed record fetched, **and full text obtained free from PMC** (12,142 words, read locally) | ✓ | ✓ | **✗ → ✓ after downgrade** | **VERIFIED (downgraded)** | PubMed record confirms verbatim: *Behav Anal Pract* 2024 Sep 18;18(4):991-1004; both authors "Department of Applied Behavioral Science, University of Kansas, Lawrence, KS 66045 USA"; PMID 41523820; PMCID PMC12779882. Abstract, verbatim: "Evaluating online educational platforms requires studying the design, development, and implementation of the learning environment as well as the learning materials, learners, and learning process to facilitate improvements in teaching and skill acquisition." / "Participants completed worksheets prior to and following Khan Academy to determine its effectiveness in teaching targeted math skills. Results indicated that Khan Academy was effective for all three participants." Competing interests, Declarations section: "The authors have no relevant financial or nonfinancial interests to disclose." — verbatim. n = 3 confirmed; results detail, full text: "All three participants acquired and mastered the targeted math skill following exposure to one (Ariana) or three (Aaron and Cindy) Khan Academy sessions." | **Q2 retained (single-case experimental), but its stated warrant is struck** | **STRENGTH DOWNGRADE — the dossier's justification for the Q2 tier is contradicted by the source.** The dossier tiers F12 Q2 on the ground that "multiple-baseline designs stagger intervention onset across participants/behaviors **specifically to control for history/maturation confounds**, which is a genuine experimental logic." The study is a **nonconcurrent** multiple baseline design, and its authors say the opposite about exactly that property: "First, we used a nonconcurrent multiple baseline design for practical reasons. Although there is some debate related to the internal validity of this design (e.g., Slocum et al., 2022), our results should be interpreted with caution as this design **is limited in functional control due to its inability to identify history and maturation effects**… Thus, researchers should evaluate Khan Academy using designs (e.g., concurrent multiple baseline design, multiple probe design, consecutive controlled case series) that will give more confidence that exposure to Khan Academy is responsible for changes in responding." The tier itself (Q2, single-case experimental — the independent variable is manipulated against a steady-state baseline) survives; the **reason given for it does not**, and it was asserted about a design feature the dossier could not have read, since the word "multiple baseline" appears nowhere in the abstract it says it worked from. Downgraded claim: *a nonconcurrent multiple-baseline single-case experiment (n=3) whose own authors state it lacks functional control over history and maturation effects and call for concurrent designs before attributing change to Khan Academy.* Re-verified as stated. **Access-claim correction (in the dossier's favour, but it is still a miss):** the dossier records "abstract-level access" after Springer and ResearchGate failed. The full text is **free at PMC**, and the PubMed page the collector says it read directly displays both "Free PMC article" and "PMCID: PMC12779882". Two of the dossier's own open items dissolve on that full text: **n=3 is confirmed**, and the funding question resolves **clean** — Declarations: "The authors did not receive support from any organization for the submitted work and declare they have no financial interests." **F12's independence is therefore the strongest of the three and is now confirmed on funding as well as authorship and COI.** |

## Verification of the one permitted in-place edit (the coverage-gap bullet)

The rewritten bullet asserts the three new sources "are genuinely independent of Khan Academy by
authorship and (where checked) by disclosed conflict of interest." Tested per source:

| Source | Independent by authorship? | COI / funding checked? | Verdict on the bullet's confidence |
|---|---|---|---|
| F10 (WestEd/IES) | **Yes** — Hauk, Matlen, Thomas, all WestEd; no KA staff. Federal IES grant R305A140340. | No COI statement exists in either paper; funding acknowledgement verified as US Dept. of Education / IES. | **Warranted.** The "(where checked)" hedge is honest here — there was nothing to check. |
| F11 (SRI 2014) | **Yes, but only by authorship.** | **Not checked — and the answer was in the pass's own downloaded PDF, pointing against independence** (Gates funded Khan Academy from 2010 and commissioned this study; KA co-selected sites and collaborated throughout). | **Overstated.** This is the correction overshooting. |
| F12 (Patil & Juanico) | **Yes** — both Univ. of Kansas, Applied Behavioral Science. | COI checked and clean; funding now also confirmed clean via the free PMC full text. | **Warranted, and understated** — independence is stronger than the bullet claims. |

**Net:** the bullet is correct that the original coverage-gap claim was a false negative and that
independent evidence exists — that correction stands and is well earned. Its blanket confidence is
**warranted for two of three sources and overstated for F11**, where the pass named as an open
question something its own source answers. Recommended restatement (a verification result, not an
edit I have made): *independent of Khan Academy by authorship in all three cases; independent by
funding in F10 and F12; **F11 is author-independent only — it was commissioned by Khan Academy's own
major funder and Khan Academy collaborated on its site selection**.*

## Confirmation that the append was otherwise clean (F1–F9 unaltered)

Checked, not assumed. All four defects V4 recorded in F1–F9 are **still present verbatim** in the
current dossier — the strongest available evidence that nothing was silently repaired:

- F1 source (b) still renders the paraphrase "…as your chess games (blitz, rapid, etc.)" under
  "exact quotes" (V4's quote-accuracy correction);
- F5 still lists source (b) as "same source as F4" (V4 established that page contains no points text);
- F7 still carries the placeholder "[Title on effects of Khan Academy usage on math performance]";
- F9 still cites "Sala, G., **Foley, J.P.**, & Gobet, F. (2017)" (V4's authorship correction).

Every F1–F9 claim line, quote, provenance, bucket, tier and caveat matches V4's rendering of them.
The one substantive pre-existing edit is the declared coverage-gap bullet, and the sentence V4 quoted
from the original bullet ("Every efficacy finding on this card therefore carries at least a partial
first-party relationship…") is correspondingly gone — consistent with the declared single edit.

**Two trivial exceptions to "no other section above was altered", recorded for completeness, neither
invalidating anything:** (i) the header citation-count line (dossier ll.6–7) was updated to
"+3 via focused pass C4-FP… total 12/15" — a necessary bookkeeping edit, but it is a second edit to
pre-existing text and the pass's own note claims the bullet was "the sole edit"; (ii) two pre-existing
lines are now stale as a consequence and were correctly left untouched — "Overflow leads: None — 9
citations collected" and the self-QA checkbox "Citation count is within the depth budget (9…)".

## Resolution log (every citation that was UNVERIFIED at any point)

| # | Which point failed (exists / supports / strength) | Move taken (re-check · downgrade · drop) | Terminal state | Note |
|---|---|---|---|---|
| F11 | **strength** — "genuinely independent of Khan Academy" and an open-question framing on the funder relationship, both contradicted by the report's own pp.ii–iii and p.9 | **(b) downgrade** — narrowed to author-independence only; funder relationship and KA design collaboration stated as established fact rather than open question; re-verified the weakened claim | **VERIFIED (downgraded)** | The Q3 tier and non-causal handling needed no change and are correct. Downstream effect: the enlarged dossier's independent evidence base is one source weaker than it reads. |
| F12 | **supports + strength** — the Q2 warrant asserts a confound-control property the authors explicitly disclaim for their (nonconcurrent) variant, and was asserted from an abstract that never names the design | **(b) downgrade** — struck the confound-control rationale, retained Q2 as single-case experimental, attached the authors' own limitation; re-verified | **VERIFIED (downgraded)** | Resolved by obtaining the free PMC full text the pass did not try — which also *strengthened* F12's independence (funding statement clean) and confirmed n=3. |

## Kills (citations dropped — the claim lost this support)
- **None.** No citation failed terminally. Recorded plainly rather than as a clean sweep: the three
  added citations are all real, all reachable, and every numeric figure and quoted passage I checked
  traced to genuine text. F10 in particular is handled to a high standard — its limitations are
  reported at full source strength, which is precisely the discipline a correction pass is most at
  risk of relaxing. The two defects found are **characterisation overshoot on independence (F11) and
  on tier warrant (F12)** — not invention, and not, in the end, a fabricated correction.

## Quarantine (UNVERIFIABLE — could not be reached at all)
- **None.** All four sources behind F10–F12 were reached and read independently, plus the PMC full
  text the pass reported as unobtainable. Recorded for future passes: **Patil & Juanico is free at
  PMC12779882** — do not stop at Springer/ResearchGate; and both RUME PDFs are open at
  `files.eric.ed.gov/fulltext/ED583985.pdf` and `.../ED583986.pdf`.

## Conflicts surfaced during verification
- **None rising to the conflict register.** The null result I surfaced in Part 2 (Kelly & Rutherford
  2017) is not in genuine tension with F10–F12 — different population (US grade 7 vs community-college
  adults vs grades 5–8), different dose (4 weeks vs a semester vs two years), different comparison
  (KA vs other supplemental enrichment, rather than KA-added vs not). It is an **opposing position for
  sufficiency purposes**, which is a different thing from an evidence conflict, and it belongs in this
  record and the source-lead register rather than the conflict register. This is the same reasoning
  the dossier itself correctly applied to F7 vs F8, and I concur with it there. No row appended to
  `registers/conflict-register.md`.
- One row appended to `registers/source-lead-register.md` (**#27**) carrying Kelly & Rutherford (2017).
  (Numbered after #26, which another verifier appended in parallel while this pass was running.)

## Dossier sufficiency (SECOND AXIS — judged independently of citation states)

> A dossier is sufficiently researched only when additional searching is unlikely to materially
> change its conclusions. An all-VERIFIED dossier can still be INSUFFICIENT. A COVERAGE GAP the
> collector found and named is thoroughness, not insufficiency.

**Verdict: INSUFFICIENT** — narrowly, on one specific and consequential omission.

Coverage assessed against: major evidence traditions · landmark sources · opposing positions ·
every required sub-question in the card's scope.

- **Traditions/landmarks/positions now present:** everything V4 credited (Chess.com's dual rating
  pathways F1–F3; Khan Academy's full public mastery mechanics F4–F6; the KA-affiliated efficacy
  literature F7–F8 with relationships disclosed; the chess-transfer null F9, honestly out-of-scope),
  **plus** the three classes V4 named as missing: an independent federally funded cluster-RCT (F10),
  the landmark independent SRI evaluation (F11), and the single-case behaviour-analysis tradition
  (F12). The named gap is genuinely closed.
- **Required sub-questions answered:** **Q3 has moved from "answered only half" to "answered, but
  only on one side of the ledger."** Q1, Q2, Q4 remain answered as V4 found them. Q5 is unaffected by
  this pass and its PARTIAL/does-not-move-the-needle statement still holds — I checked, and none of
  F10–F12 bears on the Elo-vs-IRT/knowledge-tracing seeding question at all; they are outcome studies,
  not measurement-model studies. The dossier says this itself and is right to.
- **Searches run to test for what is NOT there** (WebSearch budget was exhausted, so these were
  direct fetches against named targets and reference-list mining, which I flag as a narrower
  instrument than free search):
  1. **What Works Clearinghouse product/intervention-report search for "Khan Academy"** — fetched
     `ies.ed.gov/ncee/wwc/Search/Products?searchtext=Khan%20Academy`; **no WWC intervention report,
     single-study review, or product review for Khan Academy exists.** This is a real negative and it
     supports the dossier: there is no clearinghouse verdict it failed to cite.
  2. **Reference-list mining of the pass's own F12 full text** (PMC12779882) for independent KA
     efficacy studies — this is what surfaced the omission below, along with Weeraratne & Chin (2018),
     Light & Pierson (2014), and Vidergor & Ben-Amram (2020).
  3. **Direct retrieval and full-text read of Kelly & Rutherford (2017)** via DOI 10.19173/irrodl.v18i4.2984
     and the IRRODL galley PDF, to establish its design, independence and result direction first-hand
     rather than from a citation.
  4. **IES award record re-fetch** to test the pass's honest sub-gap about the pooled two-cohort
     result — the award page reports the final 588/34/20 sample but states outcomes only as
     "inclusion of Khan Academy as part of the instructional materials correlated to increases in
     students' post-test scores", **with no pooled effect size**. The pass's sub-gap is therefore
     honest and I do not penalise it.
  5. **Full-text sweep of the SRI PDF** for funder/sponsor/collaboration disclosures, aimed at the
     open item the pass declined to resolve (this is what produced the F11 downgrade above).

**What survives scrutiny.** I re-examined the three coverage gaps V4 found honest and concur — they
are real absences, searched for and reported, and I do not re-penalise them. The two **new** gaps the
pass surfaced split: the **pooled-cohort gap is honest** (confirmed above at the IES award page), but
the **Gates-funder gap is not a gap at all** — it is answered on p.iii of a PDF the pass had open, and
I have treated that as a Part 1 strength defect rather than double-counting it here.

### If INSUFFICIENT (all three required)

1. **What important evidence appears missing.**
   **Kelly, D. P., & Rutherford, T. (2017). "Khan Academy as Supplemental Instruction: A Controlled
   Study of a Computer-Based Mathematics Intervention." *International Review of Research in Open and
   Distributed Learning*, 18(4), 70–77. DOI 10.19173/irrodl.v18i4.2984** — open access; PDF galley at
   `https://www.irrodl.org/index.php/irrodl/article/download/2984/4199`. Authors are **NC State
   University**, no Khan Academy affiliation. Post-test-only control-group **quasi**-experimental design
   (the paper's own words: "A post-test only control-group quasi-experimental design was chosen"),
   grade 7, 4 weeks, treatment vs two control groups (math-enrichment and ELA-enrichment). Result,
   abstract, verbatim: **"In both cases, we found no statistically significant differences in student
   test scores."** Body: treatment M = 73.75 vs control M = 72.22, MD = 1.53, **p = .596**; KA vs
   traditional supplemental math **t(60) = −1.009, p = .842**; combined math supplement vs ELA
   supplement **t(112) = .649, p = .259**. Conclusion, verbatim: "This study did not find associations
   between use of Khan Academy as supplemental instruction and higher math test scores." I obtained
   and read this full text myself; the quotes above are from the galley PDF, not from a citation.
   *(Two lesser leads from the same reference-list sweep, named but **not** verified by me and
   therefore not asserted: Weeraratne & Chin (2018), a group-design study, and Vidergor & Ben-Amram
   (2020), *Computers & Education* 157:103985, which is a perceptions study and probably out of scope.)*

2. **Why the omission could materially affect the findings.**
   The enlarged dossier's independent Khan Academy evidence base is **uniformly positive** — F10
   positive (g = 0.32), F11 positive associations, F12 "effective for all three participants" — and
   the corrected coverage-gap bullet now instructs downstream synthesis that independent evidence
   "exists" without qualifying its direction. Kelly & Rutherford is the **only independent controlled
   study of Khan Academy as a supplemental intervention** I located, and it is **null on the outcome
   measure**. Its absence is exactly the shape of failure this card warned about: a pass correcting an
   *understatement* collected the three positive sources it was handed and stopped, so the correction
   now overshoots in aggregate as well as per-source. **The conclusion that moves:** "independent
   efficacy evidence for Khan Academy exists" is true but incomplete; the accurate statement is
   "independent efficacy evidence exists and is **mixed** — positive in a semester-long community-college
   cluster-RCT, positive-correlational in a two-year implementation study whose funder also funds Khan
   Academy, positive in an n=3 single-case study, and **null in a short-duration controlled study
   against active supplemental-instruction controls**." Direction: it moves confidence in
   Khan-Academy-style mastery progression as an *externally validated* design **down** from where the
   corrected bullet leaves it — which matters, because external validation of that design is precisely
   what this program is mining Khan Academy for. It also adds the one thing the dossier's efficacy
   section otherwise lacks entirely: a comparison against an **active control** (other supplemental
   instruction) rather than against no-treatment, which is the harder and more product-relevant question.

3. **Exact scope of the one focused collection pass.**
   **Very small — one citation, roughly half a page. Do not re-run the card. Do not re-touch F1–F9, and
   do not re-touch F10 or F12's substance** (F10 is sound; F12 needs only the tier-warrant correction
   recorded above, which is a verification result, not a re-collection). Collect **Kelly & Rutherford
   (2017)** as F13 from the open galley PDF, recording: independent NC State authorship; **quasi-experimental,
   post-test-only, non-random assignment** (tier **Q3**, not Q2 — do not let "controlled study" in the
   title imply randomisation); n ≈ 114 across groups; 4-week duration; the three null comparisons with
   their exact p-values; and the paper's own limitations, including that **the lead author was the
   teacher delivering the intervention** ("The lead author was originally hired in the school discussed
   in this study as a technology education teacher"), which is a design-independence caveat cutting the
   other way and must be carried. Then **re-state the corrected coverage-gap bullet a second time** so
   it reports the independent evidence as *mixed* rather than merely *existent*, and **apply the two
   strength downgrades in this record** (F11 author-independence-only with the Gates/KA funder and
   site-selection facts stated; F12's Q2 warrant replaced with the authors' own nonconcurrent-design
   limitation). No Chess.com re-collection is warranted — that side's gaps remain genuine.

## Verifier summary
- VERIFIED: **3**  |  UNVERIFIABLE: **0**  |  DROPPED: **0**
- **UNVERIFIED remaining: 0** (required — a record with any citation left UNVERIFIED is incomplete)
- **Dossier sufficiency: INSUFFICIENT** (one bounded citation; scope above)
- **Claims the collector overstated (strength downgraded):**
  - **F11** — "genuinely independent of Khan Academy" → **author-independent only**. The report itself
    (p.iii) states Gates gave Khan Academy "major funding" in 2010 and then "contracted with SRI
    International to study the implementation of Khan Academy"; KA also co-selected sites (p.9) and is
    thanked for "collaboration throughout this study" (p.ii). The pass declared this an unresolved open
    question while holding the PDF that resolves it.
  - **F12** — the Q2 warrant ("multiple-baseline designs… specifically to control for history/maturation
    confounds") is contradicted by the authors, who say their **nonconcurrent** design "is limited in
    functional control due to its inability to identify history and maturation effects." Tier Q2 retained
    as single-case experimental; the stated reason struck.
- **Claims the collector *under*-stated (corrections in the dossier's favour):**
  - **F12** — full text is **free at PMC12779882**, not abstract-only; it confirms n=3 and closes the
    pass's own funding open item cleanly ("The authors did not receive support from any organization for
    the submitted work"). F12 is the most independent of the three sources, not the weakest on that axis.
  - **F10** — no downgrade of any kind; its cohort limitation and both author-flagged validity threats
    are represented at full source strength.
- **Supporting locations differing from the collector's proposal:** **F10** — the 0.14–0.50 interval is
  attributed to *Hedges g* explicitly only in the **short paper (b), p.641**; the long-paper sentence the
  dossier actually quotes says "around the effect estimate". **F11** — the "multiple plausible
  explanations" phrase is presented as a quotation but is a paraphrase; the report's wording (p.38) is
  "Multiple explanations for these associations are plausible in addition to the possibility of a causal
  link…". **F12** — the design and funding statements are in the **PMC full text**, not the PubMed
  abstract the dossier cites as its supporting location.
