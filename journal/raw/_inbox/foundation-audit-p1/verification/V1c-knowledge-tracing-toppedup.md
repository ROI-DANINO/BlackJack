# Verification Record: C1c — Knowledge Tracing focused-pass additions (F11–F21)

> Verifier: Claude (Opus 4.8) — DIFFERENT instance from the collector (Sonnet 5), from verifier V1,
> and from the sufficiency reviewer V1b  |  Date: 2026-07-19
> Contract: exists + supports + strength-honest. VERIFIED requires an exact supporting location.
> Every source is INDEPENDENTLY located by the verifier — the collector's summary is not trusted.
>
> **Scope (per vcard-C1c):** PART 1 covers **F11–F21 only** (12 citations across 11 findings; F21
> carries two sources). F1–F10 were verified by V1 (13/13 VERIFIED, 0 UNVERIFIABLE, 0 dropped) and
> are **not** re-verified here; that pass stands. PART 2 re-judges sufficiency of the **whole
> enlarged dossier (F1–F21)**.

## Method (independence statement)

I did not rely on the collector's quotes, locations, or on any fetch-tool summary of a PDF body. For
all ten machine-readable sources I **downloaded the file myself with `curl` and extracted text with
`pdftotext`**, normalized ligatures/hyphenation/line-wrapping, and string-matched every claimed quote
against the extracted text on disk. Reported matches below are verbatim string hits in a local file,
not a model's report of what a page says — the hazard the shared brief names (a fetch pass emitting
quotes while claiming it could not extract text) is structurally excluded.

For the two abstract-only sources (F16, F17) I deliberately used **different retrieval routes than
the collector's**: F16 via NCBI E-utilities `efetch` (the collector used the PubMed HTML page), F17
via the Semantic Scholar Graph API (the collector used the University of Groningen portal). Both
returned the claimed text verbatim, from a route the collector did not use.

All venue/volume/page/DOI metadata was checked against **Crossref** and the **arXiv API**,
independently of the publisher pages the dossier links.

Local evidence artifacts (scratch, not committed): `khajah.pdf`, `wilson.pdf`, `xiong.pdf`,
`beckchang.pdf`, `doroudi.pdf`, `baker.pdf`, `pelanek2017.pdf`, `cen.pdf`, `schroeders.pdf`,
`linacre.html` + `.txt`/`.norm` extractions.

| # | Claim | Source (id / title / URL·DOI) | Indep. located? | Exists | Supports | Strength honest | State | Supporting location (VERIFIED only) | Quality tier | Notes / downgrade |
|---|---|---|---|---|---|---|---|---|---|---|
| F11 | Extended BKT (forgetting, student ability, skill discovery) reaches performance indistinguishable from DKT | Khajah, Lindsey & Mozer, *How Deep is Knowledge Tracing?*, EDM 2016 · arXiv:1604.02416v2 | yes — PDF downloaded + extracted; arXiv API metadata | ✅ | ✅ | ✅ | **VERIFIED** | **Abstract** for "when BKT is extended to allow it more flexibility in modeling statistical regularities…BKT achieves a level of performance indistinguishable from that of DKT" and "may be a domain that does not require 'depth'". **Results/discussion §** ("To summarize the comparison of BKT and DKT…") for the decomposition: "31.6% of difference in performance reported in [22] appears to be due to the use of a biased procedure for computing the AUC…Another 50.6% of the difference in performance reported vanishes if BKT is augmented to allow for forgetting." | Q3 — upheld | All quotes verbatim. **Minor quote-fidelity note:** the source prints "**BTK**" (a typo) where the dossier's exact-quote field prints "BKT". Silent correction; meaning unaffected. Collector's location "Abstract; discussion decomposing the gap" is correct but imprecise — the two quote blocks live in two different places, recorded above. |
| F12 | Bayesian/hierarchical IRT extensions matched or outperformed DKT on all datasets at tractable granularity, and were cheaper to train | Wilson, Karklin, Han & Ekanadham, *Back to the Basics: Bayesian extensions of IRT outperform neural networks for proficiency estimation*, EDM 2016 · arXiv:1604.02336v2 | yes — PDF downloaded + extracted; arXiv API confirms comment "Educational Data Mining 2016" | ✅ | ✅ | ⚠️ **honest, but two material non-disclosures** | **VERIFIED** | **Abstract**: "We find that IRT-based methods consistently matched or outperformed DKT across all data sets at the finest level of content granularity that was tractable for them to be trained on." **§6 CONCLUSION**: "Our results indicate that simple IRT-based models equal or outperform DKT on a variety of data sets… In our experience, structured models were easier to train and required less parameter tuning than DKT. Moreover, the computational demands of DKT hampered our ability to fully explore the parameter space…" | Q3 — upheld | Both locations exactly as proposed. **Two things the dossier does not record and synthesis must carry:** (1) the paper's own byline reads "**Knewton, Inc.**" for three of four authors (Wilson, Karklin, Ekanadham; Han is CMU) — a commercial adaptive-learning vendor. V1's Correction C5 flagged the identical undisclosed affiliation for F9; here it matters *more*, because F12 is a competitive benchmark result, not a neutral framing claim. (2) One of the three datasets is **Knewton's own proprietary data** — the dossier's "all three datasets tested" implies three independently checkable datasets; one is not reproducible by anyone outside the vendor. Citation holds; framing needs both notes. |
| F13 | Independent replication: DKT's edge over PFA did not hold once ASSISTments duplicated rows were corrected | Xiong, Zhao, Van Inwegen & Beck, *Going Deeper with Deep Knowledge Tracing*, EDM 2016, 544–550 · educationaldatamining.org/EDM2016/proceedings/paper_133.pdf | yes — PDF downloaded + extracted | ✅ | ✅ | ✅ | **VERIFIED** | **Abstract**: "We determine that the DKT findings don't hold an overall edge when compared to the PFA model, when applied to properly prepared datasets that are limited to main (i.e. nonscaffolding) questions." **§4.1.1**: "we counted there are 123,778 rows of duplications out of 525,535 in the data set (23.6%)." **§6 DISCUSSION AND CONTRIBUTION**: "Contrary to our expectation, the DKT algorithm did not achieve overwhelmingly better performance when compared to PFA model on ASSISTments data sets when they are properly prepared." | Q3 — upheld | All verbatim (source prints "nonscaffolding"; dossier prints "non-scaffolding" — hyphenation only). **The dossier's KDD caveat is verified verbatim and is accurate**: §6 states "DKT appears to perform much better on KDD dataset, but we believe this is due to PFA model undermined by inaccurate item difficulty estimation." Locations as proposed: correct. |
| F14 | BKT identifiability problem: an infinite family of parameter sets fits equally well; more data does not fix it; informative priors required | Beck & Chang, *Identifiability: A Fundamental Problem of Student Modeling*, UM 2007, LNCS 4511, 137–146 · DOI 10.1007/978-3-540-73078-1_17 | yes — PDF downloaded + extracted; Crossref confirms venue/pages/authors | ✅ | ✅ | ✅ | **VERIFIED** | **Abstract**: "observed student performance corresponds to an infinite family of possible model parameter estimates, all of which make identical predictions about student performance. However, these parameter estimates make different claims, some of which are clearly incorrect, about the student's unobservable internal knowledge." + "an approach using Dirichlet priors to bias model search that results in a statistically reliable improvement in predictive accuracy (AUC of 0.620 ± 0.002 vs. 0.614 ± 0.002)". **§6 Conclusions** for the "large grain of salt" / "acquiring additional training data is not a solution" / "We need to encode prior beliefs…performance data are not enough" block. | Q3 — upheld | All verbatim. **One location refinement:** the AUC figures the collector puts in its *tier rationale* are in the **Abstract**, not only in the results body — I record the Abstract as their location. Tier rationale is sound. |
| F15 | BKT is formally identifiable under mild conditions; the real problem is "semantic model degeneracy" from model misspecification, not insufficient data | Doroudi & Brunskill, *The Misidentified Identifiability Problem of Bayesian Knowledge Tracing*, EDM 2017 · files.eric.ed.gov/fulltext/ED596611.pdf | yes — PDF downloaded + extracted; EDM 2017 confirmed from the PDF's own running heads ("Proceedings of the 10th International Conference on Educational Data Mining", pp. 143–145) | ✅ | ✅ | ✅ | **VERIFIED** | **Abstract/§1** for "we show that BKT is actually an identifiable model, under mild conditions on the parameters that should always be satisfied in practical settings" and "no additional criteria beyond predictive accuracy are needed…". **§4 degeneracy simulation discussion** for "not only can alternative models of student learning lead to fitting (near) degenerate parameters, but varying the number of observations can lead to different forms of degeneracy!…not the result of not having enough data (students) to fit the models well, but rather the result of the mismatch between the true form of student learning and the model we are using…". | Q3 — upheld | **Quote-fidelity note:** the source reads "the model we are using **the** fit student learning" (typo in the original); the dossier's exact-quote field prints "**to** fit". A second silent typo correction (cf. F11). Harmless individually, but see Corrections V1c-A. **"EDM 2017 Best Paper nominee"** (in the tier rationale) is **not stated anywhere in the PDF** and I could not confirm it independently within one re-check pass — it is decoration on a tier rationale, not a claim, so the citation is unaffected; recorded as unconfirmed. |
| F16 | Explanatory-IRT cold-start method estimating a new learner's ability from background covariates substantially reduced ability-estimation error | Park, Joo, Cornillie, van der Maas & Van den Noortgate, *An explanatory item response theory method for alleviating the cold-start problem in adaptive learning environments*, Behavior Research Methods 51(2):895–909 (2019) · DOI 10.3758/s13428-018-1166-9 | yes — abstract retrieved via **NCBI E-utilities efetch** (a different route than the collector's PubMed HTML page); Crossref confirms authors/venue/volume/pages | ✅ | ✅ | ❌ → **narrowed** | **VERIFIED (claim narrowed)** | **Abstract**, penultimate sentences: "we propose making the ERS more efficient by using an explanatory item response theory modeling to estimate students' ability levels on the basis of their background information and past trajectories of learning. A simulation study was conducted under various conditions, and the results showed that the proposed approach substantially reduces ability estimation errors." | Q3 — upheld | Quote verbatim. **Two overreaches in the finding's own headline, both beyond abstract-only access — see Corrections V1c-B.** (i) The headline enumerates covariates "(age, gender, learning disability, past trajectory)"; the abstract says only "background information and past trajectories of learning" — the enumeration is not in the text the collector could access. (ii) The headline attributes the error reduction to "**both** a simulation study **and** an illustration on real platform data"; the abstract attaches "substantially reduces ability estimation errors" **only to the simulation**, and describes the real-data part merely as "We illustrate the approach using real data from a popular learning platform" — no result is claimed for it. Narrowed accordingly; the narrowed claim re-verifies. |
| F17 | At ~100M trials / ~140k learners, item-side ("what") priors generally outperformed learner-side ("who") priors for cold-start estimates; both beat defaults | van der Velde, Sense, Borst & van Rijn, *Large-scale evaluation of cold-start mitigation in adaptive fact learning*, UMUAI 34:1467–1491 (2024) · DOI 10.1007/s11257-024-09401-5 | yes — abstract retrieved via **Semantic Scholar Graph API** (a different route than the collector's Groningen portal); Crossref confirms authors/venue/volume/pages | ✅ | ✅ | ✅ | **VERIFIED** | **Abstract**: "In a simulation study conducted on a large educational data set from an adaptive fact learning system (about 100 million trials from almost 140 thousand learners), we predicted individual learning parameters from response data… We found that predictions based on the difficulty of the fact ('what') generally outperformed predictions based on the ability of the learner ('who'), though both contributed to better model estimates." | Q3 — upheld | Verbatim. The collector's caveat — that this is a simulation follow-up extending "a previous smaller-scale laboratory-based experiment", not itself a field experiment — is **confirmed verbatim in the abstract** and is honest. Location as proposed: correct. |
| F18 | Primary psychometric account of what IRT estimates: a latent continuous ability θ via each item's characteristic curve P(θ); origins in Lawley (1943), Lord, Rasch | Baker, F.B., *The Basics of Item Response Theory* (2nd ed., 2001), ERIC Clearinghouse on Assessment and Evaluation · ime.unicamp.br/~cnaber/Baker_Book.pdf | yes — PDF downloaded + extracted | ✅ | ✅ | ✅ | **VERIFIED** | **Acknowledgments** (p. i): "D.N. Lawley of the University of Edinburgh published a paper in 1943… This paper marks the beginning of item response theory as a measurement theory. The work of Dr. F.M. Lord… In the late 1960s, Dr. B.D. Wright… recognized the importance of the measurement work by the Danish mathematician Georg Rasch." **Chapter 1, "The Item Characteristic Curve"** (p. 5 ff.): "A primary goal of educational and psychological measurement is the determination of how much of such a latent trait a person possesses… the generic term 'ability' is used within item response theory to refer to such latent traits" and "At each ability level, there will be a certain probability that an examinee with that ability will give a correct answer to the item. This probability will be denoted by P(θ)." | Q4 — upheld | All verbatim; both proposed locations confirmed exactly, including the chapter title. Publisher/edition/ISBN confirmed on the title verso ("Published by the ERIC Clearinghouse on Assessment and Evaluation, Copyright © 2001… ISBN 1-886047-03-0"). Q4 correct under the rubric (authoritative standard reference, not a novel study). |
| F19 | Pelánek (2017) UMUAI overview is a distinct, previously-uncited work from the Pelánek (2016) C&E Elo paper the dossier's F8 actually meant | Pelánek, R., *Bayesian knowledge tracing, logistic models, and beyond: an overview of learner modeling techniques*, UMUAI 27(3–5):313–350 (2017) · DOI 10.1007/s11257-017-9193-2 | yes — author preprint PDF downloaded + extracted; **Crossref independently confirms** title/venue/vol 27/issue 3-5/pages 313–350 | ✅ | ✅ | ✅ | **VERIFIED** | **Abstract**: "Learner modeling is a basis of personalized, adaptive learning. The research literature provides a wide range of modeling approaches, but it does not provide guidance for choosing a model suitable for a particular situation. We provide a systematic and up-to-date overview…focusing in particular on the widely used Bayesian knowledge tracing and logistic models." **§4.3.1** (BKT data breakdown): "– Local domain data: not used in the basic model; extensions of BKT contain such parameters as item difficulties (Pardos and Heffernan, 2011)." **§4.3.2** confirmed as the parallel PFA breakdown. | Q4 — upheld | All verbatim; both proposed locations confirmed. **Note on the artifact:** the author's hosted PDF is an *accepted preprint* whose running heads read "Title Suppressed Due to Excessive Length" and which carries no volume/page numbers — the 27(3–5):313–350 metadata is **not** verifiable from the PDF and was confirmed by me via Crossref instead. The finding's central claim (this is a different paper from F8's Pelánek 2016) is correct: different title, venue, year, and DOI. |
| F20 | LFA — PFA's direct statistical parent — is a semi-automated method combining a logistic model, expert judgment, and combinatorial search over difficulty factors | Cen, Koedinger & Junker, *Learning Factors Analysis – A General Method for Cognitive Model Evaluation and Improvement*, ITS 2006, LNCS 4053, 164–175 · DOI 10.1007/11774303_17 | yes — PDF downloaded + extracted; Crossref confirms authors/venue/pages/year | ✅ | ✅ | ✅ | **VERIFIED** | **Abstract / §1 Introduction**: "A cognitive model is a set of production rules or skills encoded in intelligent tutors to model how students solve problems… In this paper we propose a semi-automated method for improving a cognitive model called Learning Factors Analysis that combines a statistical model, human expertise and a combinatorial search. We use this method to evaluate an existing cognitive model and to generate and evaluate alternative models." | Q3 — upheld | Verbatim; location as proposed: correct. The Geometry Cognitive Tutor domain noted in the caveat is confirmed in the paper. Closes the one-author-hop landmark gap V1b named, as claimed. |
| F21a | No single fixed IRT sample-size threshold; ~100 respondents can suffice for simpler models with priors, while guessing/slipping or latent-class mixtures may need >2,000 | Schroeders & Gnambs, *Sample-Size Planning in Item-Response Theory: A Tutorial*, AMPPS 8(1) (2025) · DOI 10.1177/25152459251314798 | yes — PDF downloaded + extracted; Crossref confirms title/venue/vol/issue/year | ✅ | ✅ | ❌ → **tier downgraded** | **VERIFIED at Q4, not Q2** | **§"Simulation-Based Sample-Size Determination for IRT Analyses"**: "simulation studies examining the minimum required sample size for IRT analyses have consistently shown that these are context-dependent. For instance, some studies have suggested that IRT can yield accurate parameter estimates with as few as 100 respondents if prior information is incorporated into the estimation (König et al., 2020; Sheng, 2013)… In contrast, other studies have indicated that for IRT models including guessing or slipping parameters (Cuhadar, 2022) or those representing mixtures of multiple latent classes… even sample sizes of 2,000 may be insufficient." | **Q4 (downgraded from claimed Q2)** | Quote verbatim; location exactly as proposed. **TIER DOWNGRADE — see Corrections V1c-C.** Under this rubric Q2 is a *primary controlled experiment / RCT*. The cited passage is a **narrative summary of other authors' simulation studies inside a tutorial article** — every quantitative figure in it is attributed to a third party (König, Sheng, Cuhadar, Kutscher, Sen & Cohen). That is Q4 (authoritative narrative review / synthesis). Peer review does not make a literature summary a controlled experiment. The claim itself is unaffected. |
| F21b | Practitioner corroboration of the low end for plain Rasch: ~50 well-targeted examinees conservative, 30 enough for pilots, at ±1 logit / 99% confidence | Linacre, J.M., *Sample Size and Item Calibration Stability*, Rasch Measurement Transactions 7(4):328 (1994) · rasch.org/rmt/rmt74m.htm | yes — HTML retrieved by `curl` and read in full | ✅ | ✅ | ❌ → **tier downgraded + edition corrected** | **VERIFIED at Q4, with the citation's date/edition corrected** | Live page, main argument preceding the stability table: "What, then, is the sample size needed to have 99% confidence that no item calibration is more than 1 logit away from its stable value? A two-tailed 99% confidence interval is ±2.6 S.E. wide… This gives a minimum sample in the range 4*(2.6)² < N < 9*(2.6)², i.e, 27 < N < 61, depending on targeting. Thus, a sample of 50 well-targeted examinees is conservative for obtaining useful, stable estimates. 30 examinees is enough for well-designed pilot studies." Table row "± 1 logit / 99% / 27–61 / 50" confirmed. | **Q4 (downgraded from claimed "Q3-and-informal")** | Quotes verbatim; the dossier's ±1-logit-at-99% framing is accurate. **Two corrections — see V1c-D.** (1) **Tier:** Q3 is an *observational/correlational primary study*. This column reports no study of its own — it derives its numbers analytically from standard-error algebra and states them as guidance. That is Q4 (normative guideline), and the venue's informality is a separate matter from tier. (2) **Edition/date:** the page I read is **not** the 1994 print column — it cites **Kruyen (2012)** and "Confirmed by **Azizan et al. (2020)**", so it has been materially revised at least twice since 1994. The quoted sentences are on the *current* page; that they appeared in RMT 7(4):328 in 1994 is **not established**. Cite as "rasch.org, current revision, descended from Linacre 1994, RMT 7:4 p.328", not as a clean 1994 source. |

## Resolution log (every citation that was UNVERIFIED at any point)

UNVERIFIED is transient. Every row here MUST end terminal — VERIFIED or UNVERIFIABLE or dropped.

| # | Which point failed (exists / supports / strength) | Move taken (re-check · downgrade · drop) | Terminal state | Note |
|---|---|---|---|---|
| F16 | **strength** — the finding's headline attributes the error-reduction result to the real-data illustration as well as the simulation, and enumerates specific covariates (age, gender, learning disability) absent from the only text the collector could access | **(b) downgrade** — narrow the claim to what the abstract supports: error reduction demonstrated **in the simulation study**; covariates described only as "background information and past trajectories of learning"; the real-data component is an *illustration* with no reported error result | **VERIFIED (narrowed)** | Re-verified the weakened claim against the E-utilities abstract text: it holds verbatim. Full text is paywalled and was not opened by the collector or by me — this remains an **abstract-scope citation**. |
| F21a | **strength (tier)** — claimed Q2 (primary controlled experiment) for what is a narrative summary of third-party simulation studies | **(b) downgrade** to Q4 | **VERIFIED at Q4** | Re-verified: every number in the cited passage is attributed to another author's study. The claim stands; only the tier moves. |
| F21b | **strength (tier + provenance)** — claimed Q3 (observational primary study) for an analytic guideline column; and cited to a 1994 print issue whose current web text contains 2012 and 2020 references | **(b) downgrade** tier to Q4 **and** correct the edition attribution to the current rasch.org revision | **VERIFIED at Q4, edition corrected** | Re-verified the weakened/corrected claim: the quoted sentences are verbatim on the page as it now stands, and the ±1 logit / 99% context is exactly as the dossier describes. What cannot be verified is the 1994 provenance of that specific wording. |
| F15 | **exists (metadata)** — "EDM 2017 Best Paper nominee" appears nowhere in the source PDF | **(a) re-check** — searched the PDF in full and attempted independent confirmation (Semantic Scholar API returned HTTP 429 rate-limit) | **VERIFIED; the nominee label recorded as unconfirmed** | The *citation* and every quoted passage are verified, and EDM 2017 venue is confirmed from the PDF's own running heads. The award label sits in a tier rationale, supports no claim, and is simply flagged rather than carried as fact. |

## Kills (citations dropped — the claim lost this support)

**None.** All 12 citations survived. This was not a rubber stamp: ten of the twelve sources were
downloaded and string-matched by me on disk, and the two abstract-only sources were re-retrieved
through routes the collector did not use. **Every claimed quote was found in its source.** I found
**no fabricated, hallucinated, or drifted quotation anywhere in F11–F21** — a genuinely clean result
on the program's core risk, and consistent with what V1 found for F1–F10.

What I did find is four strength/tier corrections (F16, F21a, F21b, and F12's non-disclosures), two
silent typo-corrections inside "exact quote" fields, one unconfirmable award label, and one citation
whose edition attribution is wrong. All are recorded above and below rather than as kills, because in
each case the *citation* holds and it is the *framing around it* that needed correcting.

## Quarantine (UNVERIFIABLE — could not be reached at all)

**None.** Every source resolved. Noted for the record but **not** quarantined: the **bodies** of
Park et al. (2019) (F16) and van der Velde et al. (2024) (F17) remain unread by anyone in this
program — both are paywalled. Both were reached and their abstracts independently re-retrieved, so
neither is UNVERIFIABLE; they are **abstract-scope citations**, and synthesis must not treat them as
full-text-verified. This matters more than usual here, because F16 and F17 are the entire
pro-feasibility half of Bundle B's mandated balance (see Part 2).

## Corrections the synthesis must carry

- **V1c-A — a quote-fidelity pattern, minor but worth naming.** Twice (F11, F15) the collector
  silently corrected a typo present in the source while presenting the text in an "exact quote"
  field ("BTK"→"BKT"; "using **the** fit"→"using **to** fit"). Neither changes meaning and neither
  is a drift in the dangerous direction. But V1 found only *truncations* in F1–F10; this pass
  introduces *character-level edits*. An exact-quote field should be exact, typos included, with
  `[sic]` if needed. No claim is affected.
- **V1c-B — F16's headline overstates what the collector could see.** The finding claims error
  reduction "in both a simulation study and an illustration on real platform data" and names
  covariates (age, gender, learning disability) that do not appear in the abstract. Access was
  abstract-only. Synthesis must state: *the simulation showed substantially reduced ability-estimation
  error; the real-data component is an unquantified illustration; the covariate set is not
  characterized in the accessible text.*
- **V1c-C — F21a's Q2 is wrong; it is Q4.** A peer-reviewed tutorial that summarizes other people's
  simulation studies is a narrative synthesis, not a primary controlled experiment. This matters
  because F21 is the citation that re-grounds the "~100 students" figure that V1's Correction C4
  downgraded to expert judgement. After this correction, **the measured psychometric floor V1b hoped
  for is still not in the dossier**: what F21a supplies is a Q4 review *reporting* other studies'
  figures, not a measured bound read from a study. The situation is improved (the figures are now
  traceable to named simulation studies — König et al. 2020, Sheng 2013, Cuhadar 2022) but the
  primary sources themselves were not collected.
- **V1c-D — F21b is misattributed to a 1994 print column.** The rasch.org page cites Kruyen (2012)
  and Azizan et al. (2020). It is a living document, not the 1994 article, and must not be cited as
  a 1994 source. Tier is Q4, not Q3.
- **V1c-E — F12's authorship and data are not neutral, and the dossier does not say so.** Three of
  four authors are **Knewton, Inc.** employees, and one of the three datasets is Knewton's own
  proprietary data. V1's Correction C5 already flagged the identical undisclosed Knewton affiliation
  on F9 (Ekanadham & Karklin). The same vendor now supplies **two** of this dossier's findings, one
  of which is a competitive benchmark asserting that the vendor's preferred model family beats the
  rival approach. The result is peer-reviewed at EDM 2016 and independently echoed by F11 and F13, so
  it does not fall — but a synthesis that stacks F9 and F12 as two independent sources would be
  double-counting one vendor.
- **V1c-F — F13's KDD caveat is verified and should be given more weight than it currently gets.**
  Xiong et al. §4.3 reports that on the KDD data "many such pairs are only attempted by **1 student**
  and the difficulty values of these items are either 1.0 or 0.0, leading to both overfitting and
  data leakage". This is a *measured* instance of item-difficulty estimation failing when per-item
  response counts approach one — i.e. direct empirical evidence on the load-bearing Q4 question,
  cutting **against** solo-learner feasibility, sitting inside a citation the dossier collected for a
  different purpose. It is stronger and more on-point than anything Bundle B collected on that side,
  and synthesis should pull it forward.

## Conflicts surfaced during verification

**No new conflicts.** I independently confirmed both sides of the two conflicts the focused pass
registered (**register rows #7 and #8**): every quote attributed to Piech, Gervet, Khajah, Wilson,
Beck & Chang, and Doroudi & Brunskill in those rows is verbatim in the source. Both rows are fairly
stated and correctly marked open. No duplicate row was added.

One corroboration worth recording without a new row: **Wilson et al. §5 independently reproduces both
F11's and F13's mechanisms** — "we were able to reproduce the performance reported in [16] when
applying our RNN implementation on the raw data set (with duplicates left in)", and it cites the
AUC-computation issue too. Three of the four Bundle A/B papers therefore converge on the same
explanation of Piech et al.'s margin from independent directions. This strengthens register row #7
rather than conflicting with it.

## Dossier sufficiency (SECOND AXIS — judged independently of citation states)

> A dossier is sufficiently researched only when additional searching is unlikely to materially
> change its conclusions. An all-VERIFIED dossier can still be INSUFFICIENT. A COVERAGE GAP the
> collector found and named is thoroughness, not insufficiency.

**Verdict: INSUFFICIENT** — narrowly, and for one specific reason: **the pass closed Bundles A and C
convincingly, and did not answer Bundle B's actual question.**

This verdict is *not* a re-run of V1b's. Three of V1b's four gaps are genuinely, verifiably closed.
The remaining gap is smaller, sharper, and sits precisely on the one question this card exists to
answer.

Coverage assessed against: major evidence traditions · landmark sources · opposing positions ·
every required sub-question in the card's scope.

- **Traditions/landmarks/positions now present (F1–F21).** BKT primary (Corbett & Anderson) and its
  25-year systematic review; PFA primary and its parent LFA (F20, closing V1b's M4 landmark gap);
  DKT primary; the multi-dataset independent comparison (Gervet); **the full DKT-skeptical 2016 EDM
  cohort — Khajah, Wilson, Xiong (F11–F13), closing M1 completely and from three independent
  angles**; the identifiability/degeneracy dispute in both directions (F14/F15, closing the
  anti-feasibility half of M2); **primary psychometric IRT on its own terms (Baker, F18) and the
  field's standard learner-modeling overview (Pelánek 2017 UMUAI, F19), closing M4**; IRT sample-size
  literature (F21). This is a substantially stronger evidence base than the 9-citation original.
- **Required sub-questions answered: 3.5 of 4.** Q1 (what each model estimates) — answered, and now
  with a primary IRT source rather than second-hand framing. Q2 (predictive validity) — answered and
  materially *changed* by the top-up: the model ordering the original implied is now contested from
  three independent directions. Q3 (data requirements) — improved from a rule of thumb to a
  traceable range, though see V1c-C. **Q4 (does any of them fit a solo trainer against a fixed item
  bank) — still not answered, and Bundle B was the bundle assigned to answer it.**

### Searches run to test for what is NOT there

Sufficiency cannot be judged from inside the dossier. Four searches aimed at what the *enlarged*
dossier does not contain, each verified to return real, locatable literature (I confirmed the
existence and metadata of every source named below via arXiv API or Crossref — none is a
search-summary artifact):

1. `SlimStampen adaptive fact learning individual rate of forgetting stable trait Sense van Rijn
   per-learner estimation` — testing V1b's **M3**, the one gap with no bundle assigned to it.
2. `"Alleviating the Cold Start Problem in Adaptive Learning using Data-Driven Difficulty Estimates"
   Computational Brain Behavior` — testing whether a Bundle-B paper **V1b named by title** was
   collected.
3. `estimating item difficulty without response data LLM expert ratings item features cold start
   knowledge tracing 2025 2026` — testing Bundle B's literal assigned question.
4. `Yudelson Koedinger Gordon individualized Bayesian knowledge tracing per-student parameters 2013`
   — testing V1b's named per-student-parameter landmark.

All four returned substantial, directly on-topic literature the enlarged dossier does not cite.

### If INSUFFICIENT (all three required)

**1. What important evidence appears missing**

- **The response-free / item-feature item-difficulty estimation literature — Bundle B's literal
  question, and nothing collected under Bundle B addresses it.** Bundle B was assigned: *"can item
  difficulty be set from item features / expert priors / defaults instead of a response population,
  and how much accuracy is lost?"* Neither pro-feasibility citation answers this. **F16 does not
  estimate item difficulty at all** — it estimates *learner ability* from background covariates, a
  materially different problem; the card's brief explicitly names this pattern ("a citation that
  appears to support feasibility but whose source addresses a materially different problem") as a
  strength-honesty failure rather than a caveat. **F17 does** address the item side, but its
  item-side priors are derived from 140,000 learners. So the evidence for the pro-feasibility side of
  the balance is, on the actual question, **empty**. Meanwhile the literature that answers it
  directly exists and is easy to locate: *Response-free item difficulty modelling for multiple-choice
  items with fine-tuned transformers* (arXiv:2605.16991 — verified) and *Estimating Item Difficulty
  with Large Language Models as Experts* (arXiv:2605.18562 — verified; its abstract states the
  problem in this product's exact terms: "for newly created tasks, response data are typically
  unavailable… LLM-based estimates exhibited moderate to strong positive correlations with empirical
  item difficulties").
- **Two Bundle-B papers V1b named by title, not collected:** van der Velde, Sense, Borst & van Rijn
  (2021), *Alleviating the Cold Start Problem in Adaptive Learning using Data-Driven Difficulty
  Estimates*, Computational Brain & Behavior 4:231–249 (DOI 10.1007/s42113-021-00101-6 — verified via
  Crossref), which tests difficulty prediction "for individual facts and the set of facts as a
  whole"; and *Evolutionary Features for Mitigating Cold Starts in Logistic Knowledge Tracing*
  (EDM 2025), the PFA-family cold-start paper.
- **M3 — the single-learner adaptive-practice tradition — was never assigned a bundle and was never
  collected.** V1b named four gaps; the bounded fix specified three bundles (A→M1, B→M2, C→M4). M3
  fell through the gap, and the dossier's focused-pass header nonetheless claims it "fills exactly
  the four gaps named". It does not. The SlimStampen/MemoryLab ACT-R tradition estimates a
  **per-learner, per-item rate of forgetting online from that learner's own responses**, in a
  deployed system, with peer-reviewed evidence that an individual's forgetting rate is a stable trait
  (van Rijn et al. 2009; Sense et al. 2016, *An Individual's Rate of Forgetting Is Stable Over Time
  but Differs Across Materials*). **The sharpest form of the miss: F17's four authors — van der
  Velde, Sense, Borst, van Rijn — ARE that research group.** The pass reached the group and collected
  their 140,000-learner population study while leaving uncollected the population-free per-learner
  estimator that is the system's core mechanism. That is the same failure shape V1b diagnosed for M1
  ("reached these authors' framing statement and did not reach their empirical result"), recurring in
  the same dossier, on the load-bearing question.
- **Yudelson, Koedinger & Gordon (2013), *Individualized Bayesian Knowledge Tracing Models*, AIED
  2013, LNCS 7926:171–180** — named in V1b as a landmark, listed as optional in Bundle C, not
  collected. Its finding ("student-specific parameters lead to a tangible improvement when predicting
  the data of unseen students") is the closest thing in the BKT family to a solo-learner story.

**2. Why the omission could materially affect the findings**

The dossier's Sufficiency Statement rests on one universal claim — *"every single source found …
calibrates its parameters from a population of many learners"* — and converts it into a
classification: the product's proposed path (literature-typical or expert-set default parameters) is
labelled **Product judgement / Assumption**, explicitly *not* Evidence-backed. Every gap above bears
on exactly that sentence and that label:

- The response-free difficulty literature is, by construction, a family of estimators that produce
  item difficulties **with no response population at all**. If those results hold up, the product's
  path moves from **Assumption → Evidence-backed (with a measured accuracy cost)**. That is a change
  in the classification of the single decision this card exists to inform — the same materiality test
  V1b applied, still unmet.
- The SlimStampen tradition is a **deployed counterexample to the universal claim as written**. It
  does not merely narrow the gap; it falsifies the sentence's "every single source" quantifier, which
  is the strongest sentence in the dossier. And because F17 was drawn *from that very group*, the
  dossier now cites the population-scale paper from a research programme whose defining contribution
  is population-free per-learner estimation — a reader would reasonably conclude the tradition had
  been checked and found to require a population. It was not checked.
- Direction matters and cuts both ways, so this is not a request for encouraging evidence only: the
  strongest *anti*-feasibility datum in the whole dossier is currently an unremarked aside inside
  F13 (Correction V1c-F: items attempted by ~1 student yield degenerate 1.0/0.0 difficulties causing
  overfitting and leakage). A pass that collects the response-free literature must be read against
  that finding, which is precisely the balance Bundle B was created to produce and did not.

**3. Exact scope of the one focused collection pass**

**4–6 citations, one bundle, no re-collection of anything in F1–F21. Do not re-open Q1, Q2, or Q3 —
Bundles A and C closed them. Target Q4 only.**

- **(a) Population-free item-difficulty estimation (2–3):** *Response-free item difficulty modelling…*
  (arXiv:2605.16991) and/or *Estimating Item Difficulty with LLMs as Experts* (arXiv:2605.18562), plus
  van der Velde et al. (2021) CBB 4:231–249. Question: **how accurate is an item difficulty obtained
  with zero response data, and how much accuracy is lost versus a population-calibrated one?** Record
  the measured correlation/error, not the framing.
- **(b) The single-learner estimator tradition (2–3), the M3 gap that was never assigned:** Sense et
  al. (2016) on rate-of-forgetting as a stable individual trait; van Rijn et al. on the SlimStampen
  online per-learner estimator; optionally Yudelson et al. (2013) individualized BKT. Question: **is
  there a deployed, peer-reviewed estimator that fits its parameters from one learner's own responses
  with no population fit — and if so, what does it require in exchange (response-time signals, a
  fixed item set, a specific memory model)?**

Expected effect: the dossier's "every single source" sentence is either corrected or confirmed
against the family most likely to falsify it, and Q4's product path is classified on evidence rather
than by default. **PARTIAL may well survive this pass — but a PARTIAL that has actually tested its
own strongest claim is worth something the current one is not.**

### What I did NOT count against the dossier

- Its three original named coverage gaps, and the three further gaps the focused pass named — including
  its own honest admission that Bundle B's pro-feasibility citations "address new-learner cold start
  against an existing population, not a true zero-population case". **Naming that is diligence, and I
  have not counted it as insufficiency.** What I count is that the pass named the shortfall and then
  reported the balance requirement as **met** in its self-QA, when the searches above show the
  literature that would have met it was reachable in one query.
- The 21-citation overrun. Recorded as a process matter per my card; not mine to resolve. Note only
  that my recommended pass is 4–6 more, and that is a real cost a decision-maker should weigh
  against closing Q4.
- Anything in V1's or V1b's records. Both stand; V1's Correction C6 and V1b's M2 are what let me
  locate the exact seam where the remaining gap sits.
- The absence of strategy-game/card-game domain evidence. Named honestly in both the original and the
  focused pass, and I found nothing to suggest it exists.

## Verifier summary

- VERIFIED: **12 of 12** citations checked (F11–F21; F21 counted as two sources)  |  UNVERIFIABLE: **0**  |  DROPPED: **0**
- **UNVERIFIED remaining: 0**
- **Dossier sufficiency (F1–F21): INSUFFICIENT** — Bundles A and C closed; **Bundle B's assigned
  question (item difficulty without a response population) is unanswered**, and V1b's M3
  (single-learner adaptive practice) was never assigned to a bundle and never collected.
- Strength/tier downgraded: **F16** (claim narrowed — error reduction is simulation-only; covariate
  list not in the accessible text), **F21a** (Q2 → **Q4**; a tutorial's narrative summary of others'
  simulations is not a primary controlled experiment), **F21b** (Q3 → **Q4**, plus edition corrected
  — the page is a living rasch.org revision citing 2012 and 2020 work, not the 1994 RMT column). All
  other tiers upheld: F11–F15, F17, F20 at Q3; F18, F19 at Q4.
- Supporting location differed from the collector's proposal: **F11** (the two quote blocks sit in
  two different places, not one "Abstract; discussion"), **F14** (the AUC figures are in the
  Abstract). All other locations confirmed exactly as proposed — including F12's §6, F18's
  Acknowledgments + Chapter 1, F19's §4.3.1, and F21a's named section.
- Quote fidelity: **no fabricated, hallucinated, or drifted quotation found in F11–F21.** Two silent
  typo-corrections inside exact-quote fields (F11 "BTK"→"BKT"; F15 "using the fit"→"using to fit");
  neither changes meaning.
- Non-disclosures for synthesis: **F12** — three of four authors are Knewton, Inc.; one of three
  datasets is that vendor's proprietary data; the same vendor also supplies F9 (see V1's C5). Do not
  count F9 and F12 as two independent sources.
