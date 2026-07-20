# Verification Record: C1 — Knowledge Tracing (BKT, DKT, PFA)

> Verifier: Claude (Opus 4.8) — DIFFERENT instance from the collector (Sonnet 5)  |  Date: 2026-07-19
> Contract: exists + supports + strength-honest. VERIFIED requires an exact supporting location.
> Every source is INDEPENDENTLY located by the verifier — the collector's summary is not trusted.

## Method (independence statement)

I did not rely on the collector's quotes, locations, or any fetch-tool summarization of a PDF body.
For all seven machine-readable sources I **downloaded the PDF myself with `curl` and extracted text
with `pdftotext`**, then string-matched each claimed quote against the extracted text (with
ligature/hyphenation normalization). Quote matches below are verbatim string hits in a file on disk,
not a model's report of what a page says. This was chosen specifically to neutralize the hazard the
collector reported (a fetch pass emitting quotes while claiming it could not extract text).

For the two Springer-paywalled sources I retrieved the abstracts two independent ways — direct
`curl` of the article page (parsing the server-rendered `dc.description` meta tag and the `Abstract`
section) and a separate WebFetch pass — and they agreed. DOI/venue/volume/pages were checked against
**Crossref** and **Semantic Scholar** APIs independently of Springer's own page.

Local evidence artifacts (scratch, not committed): `corbett.pdf`, `pavlik2009.pdf`, `piech.pdf`,
`gervet2020.pdf`, `pelanek.pdf`, `tskirt.pdf`, `settles.pdf`, `kt_survey.pdf` + `.txt` extractions.

| # | Claim | Source (id / title / URL·DOI) | Indep. located? | Exists | Supports | Strength honest | State | Supporting location (VERIFIED only) | Quality tier | Notes / downgrade |
|---|---|---|---|---|---|---|---|---|---|---|
| F1 | BKT estimates a binary latent per-skill mastery state via a 2-state HMM, updated per response | Corbett & Anderson, *Knowledge tracing: Modeling the acquisition of procedural knowledge*, UMUAI 4:253–278, DOI 10.1007/BF01099821 | yes — Crossref + Springer abstract via curl; full-text scan located at CMU ACT-R but **not readable** | ✅ | ⚠️ **partial** | ⚠️ **narrowed** | **VERIFIED (attribution narrowed)** | Abstract, sentences 5–7: "the tutor also maintains an estimate of the probability that the student has learned each of the rules in the ideal model, in a process called *knowledge tracing*. The tutor presents an individualized sequence of exercises … until the student has 'mastered' each rule." + final sentence "Currently the model is quite successful in predicting test performance." | Q3 (primary study) | Quote is verbatim. **But the abstract nowhere states "binary latent", "2-state", "Hidden Markov Model", or the 4 parameters.** The primary supports only the *per-rule probability-of-learned, updated as the student works* half. The structural half rests entirely on the two secondaries (both verified in full, below). Collector's tier note "Q3 … downgraded from Q4" is incoherent under this rubric — Q4 is a *type*, not a rung above Q3. Corrected to plain Q3. |
| F1a | BKT structure: binary latent + binary observed variables | Abdelrahman, Wang & Nunes, *Knowledge Tracing: A Survey*, arXiv:2201.06953v1 [cs.CY], 8 Jan 2022 | yes — PDF downloaded + extracted | ✅ | ✅ | ✅ | **VERIFIED** | §"Standard BKT Model": "There are two types of variables in the standard BKT model: (1) the Binary latent variables which represent the knowledge states of a given student … and, (2) the Binary observed variables which represent how students attempt questions" | Q4 (technical survey) | Confirms the structural half of F1. |
| F1b | BKT = 2-state Markov model, 4 parameters L0/T/G/S | Pavlik, Cen & Koedinger (2009), as F2 | yes — PDF downloaded + extracted | ✅ | ✅ | ✅ | **VERIFIED** | §"2. Performance Factors Analysis compared to Knowledge Tracing": "KT is based on a 2 state Markov model with 4 parameters controlling the probability of these 2 states, learned or unlearned. The 4 parameters, L0, T, G, and S…" | Q3 | Confirms the structural half of F1. |
| F2 | PFA predicts correctness from prior success/failure counts; no hidden latent state | Pavlik, Cen & Koedinger, *Performance Factors Analysis — A New Alternative to Knowledge Tracing*, AIED 2009 · https://files.eric.ed.gov/fulltext/ED506305.pdf | yes — PDF downloaded + extracted | ✅ | ✅ | ✅ | **VERIFIED** | §"1. Performance Factors Analysis", text around Eqs 1–2: "LFA's standard form is shown in Equation 1, where m is a logit value representing the accumulated learning for student i…"; and "This model is an elaboration of the Rasch item response model which has an equivalent form to Equation 1 with γ set to 0 **and only a single β value**." | Q3 | Both quotes verbatim. Collector's quote **truncates** the Rasch sentence, dropping "and only a single β value" — harmless, does not change meaning. Location as proposed: correct. |
| F3 | DKT estimates correctness from an RNN/LSTM hidden state not guaranteed interpretable as mastery | Piech et al., *Deep Knowledge Tracing*, NeurIPS 28 (2015), 505–513 · http://papers.neurips.cc/paper/5654-deep-knowledge-tracing.pdf | yes — PDF downloaded + extracted | ✅ | ✅ | ✅ | **VERIFIED** | Abstract: "The RNN family of models have important advantages over previous methods in that they do not require the explicit encoding of human domain knowledge, and can capture more complex representations of student knowledge. Using neural networks results in substantial improvements in prediction performance…" | Q3 | Verbatim. Caveat honest: the paper frames its contribution as *prediction performance*, and does not validate the hidden state as a mastery estimate. |
| F4 | Across 9 ITS datasets: logistic-regression family wins small/moderate; DKT wins large/temporal; BKT lags | Gervet, Schneider, Koedinger & Mitchell, *When is Deep Learning the Best Approach to Knowledge Tracing?*, JEDM 12(3):31–54 (2020) | yes — PDF downloaded + extracted | ✅ | ✅ | ✅ | **VERIFIED** | Abstract: "Logistic regression – with the right set of features – leads on datasets of moderate size or containing a very large number of interactions per student, whereas Deep Knowledge Tracing leads on datasets of large size or where precise temporal information matters most. Markov process methods, like Bayesian Knowledge Tracing, lag behind other approaches." + §3 "Datasets" ("…most importantly, on the number of learners that attempt each item and KC") + Table 2 | Q3 | Headline claim fully verified, verb "lag behind" preserved unupgraded. Page range **31–54 confirmed exactly** from running heads. Learner range **182–29,018 confirmed exactly** from Table 2 (spanish 182 … assist12 29,018). **Caveat is factually wrong — see Corrections C3.** |
| F5 | DKT AUC 0.85 vs 0.68 standard BKT (Khan, n=47,495); 0.86 vs 0.69 best-prior (Assistments, n=15,931) | Piech et al. (2015), as F3 | yes — PDF downloaded + extracted | ✅ | ✅ | ✅ | **VERIFIED** | §6 "Results", ¶1: "On the Khan dataset using an LSTM neural network model led to an AUC of 0.85 which was a notable improvement over the performance of a standard BKT (AUC = 0.68)… On the Assistments dataset DKT produced a 25% gain over the previous best reported result (AUC = 0.86 and 0.69 respectively)." n values confirmed in Table 1 (Khan 47,495; Assistments 15,931). | Q3 (self-report) | Numbers are real and mean what the finding says. The collector correctly distinguishes "standard BKT" (Khan) from "best-prior" (Assistments) — that distinction is the paper's own. **But an internal inconsistency in Piech et al. surfaced — see Conflict #2.** |
| F6 | On 4 ITS datasets PFA beat BKT on LL, BIC, r, A' in all four | Pavlik, Cen & Koedinger (2009), as F2 | yes — PDF downloaded + extracted | ✅ | ✅ | ✅ | **VERIFIED** | §"2.1. Model Comparison Results", immediately preceding Table 3: "Table 3 shows the results of the comparison for several fit statistics. While the differences are not large, the PFA model has better LL, BIC, r and A'." | Q3 | Verbatim. Collector preserved "the differences are not large" and flagged proponent authorship. Honest. |
| F7 | Field validates BKT predominantly on next-answer prediction, rarely against post-test mastery ground truth | Šarić-Grgić, Grubišić & Gašpar, *Twenty-five years of Bayesian knowledge tracing: a systematic review*, UMUAI 34:1127–1173 (2024), DOI 10.1007/s11257-023-09389-4 | yes — Crossref + Semantic Scholar + Springer abstract via curl **and** WebFetch (agreeing) | ✅ | ✅ | ✅ | **VERIFIED** | Abstract: "the study reveals two types of evaluation approaches found in the literature, including the prediction of student answers and the ability to estimate knowledge mastery." + "…only a few studies further investigated the systems' estimations of knowledge mastery by correlating it to knowledge on post-tests." | **Q1 — upheld** | Both quotes verbatim in the abstract. PRISMA confirmed in the abstract text ("by using the PRISMA guidelines"); Semantic Scholar `publicationTypes` = `["JournalArticle","Review"]`. See Corrections C1 for the Q1-on-an-unread-body question and C2 for a scope narrowing. Collector omitted vol/pages — supplied here (34:1127–1173). |
| F8-i | IRT assumes constant skill; Elo designed to track changing skill | Pelánek, *Applications of the Elo rating system in adaptive educational systems*, Computers & Education (2016), DOI 10.1016/j.compedu.2016.03.017 | yes — PDF downloaded + extracted | ✅ | ✅ | ✅ | **VERIFIED — location corrected** | **§2** (Elo-vs-IRT comparison), NOT §5.2: "Basic IRT models assume that a student's skill is constant (such models are typically used in testing and it is assumed that there is no change of the skill during a test), whereas the Elo rating system is designed to track changing skill levels." | Q4 | Quote is verbatim — **but it lives in §2, not the §5.2 the collector pointed to.** §5.2 contains a *different, similar* sentence ("Basic item response theory models assume a constant skill."). The collector conflated two sentences from two sections. Both exist; the location field was wrong. |
| F8-ii | BKT/PFA "may require calibration on large samples using nontrivial parameter estimation" | Pelánek (2016), as above | yes | ✅ | ✅ | ✅ | **VERIFIED** | §1 Introduction: "All these models, however, are not easy to use: they may require calibration on large samples using nontrivial parameter estimation **or are hard to use in an online educational system.**" | Q4 | Verbatim; location as proposed: correct. Collector truncates the trailing clause — harmless. |
| F8-iii | Elo "needs at least 100 students to get good estimates of item difficulty" | Pelánek (2016), as above | yes | ✅ | ✅ | ❌ → **downgraded** | **VERIFIED at Q4, not Q2/Q3** | **§5.1 "When is the Elo Rating System Applicable?"** — the phrase occurs **exactly once in the paper**: "Of course, to be able to learn from data, it needs to have enough data available. As our analysis and previous experience shows, the system needs at least 100 students to get good estimates of item difficulty." | **Q4 (downgraded from claimed Q2/Q3)** | **STRENGTH DOWNGRADE — load-bearing. See Corrections C4.** |
| F9 | IRT models ability+difficulty but not learning; BKT models learning but not student/content diversity | Ekanadham & Karklin, *T-SKIRT: Online Estimation of Student Proficiency in an Adaptive Learning System*, arXiv:1702.04282 [cs.AI], 14 Feb 2017 | yes — PDF downloaded + extracted; arXiv metadata via API/abs page | ✅ | ✅ | ✅ | **VERIFIED** | §1 Introduction: "Bayesian Knowledge Tracing (BKT) is a framework that explicitly models student learning (Corbett & Anderson, 1994) but it accounts for diversity in neither students nor content. On the other hand, Item Response Theory (IRT) is a framework for modeling responses by estimating both student and content properties (Rasch, 1960; Lord, 1980), but it does not account for student learning." | **Q4 — upheld but generous** | Verbatim, and it is indeed intro framing, not a tested result — the collector's caveat is accurate. Venue: the PDF's own footer reads "Proceedings of the 31st International Conference on Machine Learning, Lille, France, 2015. JMLR: W&CP volume 37", which corroborates ICML-2015/Lille; **"workshop track" is not stated anywhere in the PDF** and is the collector's inference. (The footer's "31st" is an author template error — ICML 2015 Lille was the 32nd; JMLR W&CP v37 is ICML 2015.) See Corrections C5 for the tier judgement and an undisclosed affiliation note. |
| F10 | Duolingo HLR: fit on 12.9M traces, field-tested on ~1M students — closest solo-learner/fixed-bank analogue, still needed population scale | Settles & Meeder, *A Trainable Spaced Repetition Model for Language Learning*, ACL 2016, 1848–1858 · https://research.duolingo.com/papers/settles.acl16.pdf | yes — PDF downloaded + extracted | ✅ | ✅ | ✅ | **VERIFIED** | §4.1 "Historical Log Data Evaluation": "We collected two weeks of Duolingo log data, containing 12.9 million student-word lesson and practice session traces"; and §4.2: "The experiment lasted six weeks and involved just under 1 million students." | Q2 | Both quotes verbatim; locations as proposed: correct. Q2 justified — §4.2 is a genuine six-week randomized field A/B on retention, not log re-fitting. **Out-of-scope caveat is honest and prominent** (bolded in the dossier, flagged in the collector self-QA, and it does not feed the three-model comparison). |

## Resolution log (every citation that was UNVERIFIED at any point)

UNVERIFIED is transient. Every row here MUST end terminal — VERIFIED or UNVERIFIABLE or dropped.

| # | Which point failed (exists / supports / strength) | Move taken (re-check · downgrade · drop) | Terminal state | Note |
|---|---|---|---|---|
| F1 | **supports** — the abstract does not state the 2-state-HMM / binary-latent structure that the claim asserts | **(b) downgrade** — narrow the primary's attribution to the mastery-probability half; re-verify the structural half against the two secondaries, both read in full | **VERIFIED (narrowed)** | Re-verified: F1a (Abdelrahman survey) and F1b (Pavlik §2) each carry the structural claim verbatim. The composite claim stands; the *attribution* changes. |
| F1 | **exists** — one re-check pass attempted on the full body | **(a) re-check** — located the official full-text scan at `act-r.psy.cmu.edu/.../893CorbettAnderson1995.pdf` (Anderson's own lab, HTTP 200, 26pp) | **VERIFIED via abstract only; body remains unread** | `pdffonts` reports **no embedded fonts** and `pdftotext` yields **zero characters** — it is an image-only scan, and no OCR tool (tesseract/ocrmypdf) is available in this environment. **I therefore did not read the body either, and do not claim to have.** The collector's "abstract only" limitation is real and survives my pass. Not UNVERIFIABLE: the source was reached and the abstract independently read. |
| F8-iii | **strength** — figure attributed by the collector to "the paper's own simulation experiment", rating Q2/Q3 | **(b) downgrade** to what the source actually supports: an author guideline in the Discussion section | **VERIFIED at Q4** | Re-verified the weakened claim: the sentence exists verbatim, in §5.1, sourced by its own wording to "our analysis **and previous experience**". No experiment in the paper reports a measured 100-student threshold. |
| F8-i | **supports (location)** — proposed §5.2 does not contain the quoted sentence | **(a) re-check** — full-text scan for the string | **VERIFIED at §2** | Quote is real and verbatim; only the section pointer was wrong. |

## Kills (citations dropped — the claim lost this support)

**None.** Every citation survived. This was not a rubber stamp: all seven machine-readable sources
were downloaded and string-matched by me, and every claimed quote was found verbatim in a file on
disk. The dossier's quote fidelity is genuinely high — I found no fabricated, drifted, or
hallucinated quotation anywhere in it. What I did find is one real strength downgrade, two wrong
supporting locations, one factually wrong caveat, one undisclosed material passage, and one new
conflict — recorded below rather than as kills, because in each case the *citation* holds and it is
the *framing around it* that needed correction.

## Quarantine (UNVERIFIABLE — could not be reached at all)

**None.** Every source resolved. Note for the register's benefit but *not* quarantined: the
**bodies** of Corbett & Anderson (1994) and Šarić-Grgić et al. (2024) remain unread by anyone in this
program — both are paywalled, and the one free C&A scan is image-only with no OCR available here.
Both were reached and their abstracts independently read, so neither is UNVERIFIABLE; they are
**abstract-scope citations**, and synthesis must not treat them as full-text-verified.

## Corrections the synthesis must carry

- **C1 — F7's Q1 is upheld, but scope it.** The brief asked whether a Q1 tier on an unread body is
  honest. It is: the rubric makes tier a *type* judgement orthogonal to verification ("A high tier
  NEVER implies VERIFIED"), and the source is genuinely a PRISMA systematic review (confirmed in the
  abstract text and in Semantic Scholar's `publicationTypes`). Crucially, **the specific claim F7
  makes is stated in the abstract itself**, so it does not depend on the unread body. Q1 stands for
  this claim. It would *not* stand for any claim requiring the review's counts, criteria, or study
  table — none of which anyone has read.
- **C2 — F7 scope narrowing.** The review's subject is **BKT model *enhancements*** (vanilla vs.
  enhanced variants), not "the field's validation practice" at large. F7's phrasing "the field
  predominantly validates BKT…" generalizes slightly beyond that. Within tolerance for a 25-year BKT
  review, but synthesis should say "the BKT-enhancement literature", not "the field".
- **C3 — F4's caveat misstates the domain inventory (factual error).** The dossier says the domains
  are "K-12/college math, programming, and one Chinese middle-school math tutor (squirrel)". Gervet
  §3's actual nine datasets are: assist09/12/15/17, algebra05, bridge06, squirrel (all math),
  **spanish** — "middle-school students practicing spanish exercises (Lindsey et al. 2014)", i.e.
  second-language vocabulary — and **statics** — "a college-level engineering statics course". There
  is **no programming dataset**; "programming" appears only once in the paper, in the Introduction,
  as a generic example of what ITSs teach. The paper never uses the word "Chinese". This matters
  because the dossier's second coverage gap ("no strategy/card-game domain evidence") is built on
  this inventory — the gap conclusion survives, but the inventory backing it must be corrected, and
  it is *broader* than stated (it already spans language learning and engineering, not just math).
- **C4 — F8-iii strength downgrade, load-bearing.** The dossier rates the "at least 100 students"
  figure Q2/Q3 on the grounds it "comes from the paper's own simulation experiment". It does not.
  The phrase occurs exactly once, in **§5.1 (Discussion and Guidelines)**, and the paper's own
  wording sources it to "our analysis **and previous experience**" — a practitioner rule of thumb in
  a guidelines section, not a measured threshold reported by an experiment. Correct tier: **Q4**.
  Since the brief flags this figure as load-bearing for the product decision, the consequence is
  explicit: **the 100-student floor is expert judgement, not a measurement**, and should be weighted
  as such rather than as a hard empirical bound.
- **C5 — F9's Q4 is honest but generous, plus an undisclosed affiliation.** Under this rubric Q4 is
  "authoritative narrative review / theoretical synthesis". A two-sentence background framing in a
  primary paper's introduction is not a narrative review, but it *is* being used as a
  consensus/synthesis statement and the collector's caveat says exactly that, in those terms. I
  uphold Q4 while noting it is the weakest Q4 in this set. Separately, the dossier does not record
  that **both authors are Knewton, Inc. employees** (a commercial adaptive-learning vendor), per the
  paper's own byline. Low risk for a neutral structural claim about IRT vs BKT, but it belongs in
  the record.
- **C6 — a material passage the dossier missed, which cuts *toward* feasibility.** Pelánek **§3.1**
  states: "Once the Elo rating system has good estimates of item difficulties, it can estimate the
  skill of new students rather quickly — under the simulation settings just 10 answers per student
  are sufficient to produce reasonable skill estimates (correlation 0.8 with the ground truth)."
  This is directly on the load-bearing Q4 and the dossier does not cite it. It establishes that the
  ~100-student requirement attaches to **calibrating item difficulty**, *not* to estimating an
  individual learner's skill once difficulties are fixed. That is precisely the product path the
  dossier's own sufficiency statement proposes ("using literature-typical or expert-set default
  parameters instead of population-fit ones") — so there is real evidence for that path, and it
  currently sits unrecorded. Verified verbatim by me; tier **Q3** (result of the paper's simulation
  study, §3.1, which unlike the 100-student figure genuinely is an experimental result).

## Conflicts surfaced during verification

- **Conflict #2 (new, internal to Piech et al. 2015).** The paper's §6 prose claims "a 25% gain over
  the previous best reported result (AUC = 0.86 and 0.69 respectively)", but **the same paper's
  Table 1 caption defines BKT\* = 0.75 as "the best reported result from the literature for
  Assistments"**. Against 0.75 the gain is ≈15%, not 25%. The headline "25%" is computed against a
  0.69 baseline that the paper's own table does not treat as the prior best. This is distinct from
  registered Conflict #1 (Piech vs. Gervet, across papers) — it is an inconsistency *within the
  single source*, and it further softens F5's headline in the same direction Conflict #1 already
  pushes. → appended to `registers/conflict-register.md`.

## Verifier summary

- VERIFIED: **13 of 13** citation-claims checked (10 dossier findings, counting F1's two secondaries
  and F8's three quotes separately)  |  UNVERIFIABLE: **0**  |  DROPPED: **0**
- **UNVERIFIED remaining: 0**
- Strength downgraded: **F8-iii** ("at least 100 students": claimed Q2/Q3 simulation result →
  actual Q4 author guideline). All other tiers upheld, including F7's contested Q1 and F9's Q4.
- Supporting location differed from the collector's proposal: **F8-i** (§2, not §5.2) and **F8-iii**
  (§5.1 only, not "§4/§5.1"). All other locations confirmed as proposed.
- Quote fidelity: **no fabricated or drifted quotation found.** Two quotes are silently truncated
  (F2's Rasch sentence, F8-ii's trailing clause); neither truncation changes meaning.
- Sufficiency verdict **PARTIAL — honest, with one narrowing.** The core gap is real and I confirm
  it independently: no source in this set evaluates a true solo-learner, zero-population,
  fixed-item-bank deployment, and every dataset I checked myself is population-scale (Gervet's
  smallest is 182 learners; Pelánek's floor is ~100; Piech 15,931–47,495; Settles ~1M). But the gap
  is **narrower than the dossier states**, because of C6: Pelánek §3.1 gives measured evidence that
  once item difficulties are fixed, ~10 responses suffice to estimate one learner's skill (r ≈ 0.8
  with ground truth). So the unevidenced step is *obtaining* the item difficulties without a
  population — not per-learner estimation itself. PARTIAL remains the correct verdict, and the
  dossier's recommendation to treat the choice as Product judgement / Assumption stands; the
  recommendation is in fact somewhat *better* supported than the dossier claims.
