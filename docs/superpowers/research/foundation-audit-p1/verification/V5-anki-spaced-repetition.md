# Verification Record: C5 — Anki as pedagogy; spaced repetition as methodology

> Verifier: Claude (Opus 4.8) — INDEPENDENT of the collector (Sonnet 5)  |  Date: 2026-07-19
> Contract: exists + supports + strength-honest. VERIFIED requires an exact supporting location.
> Every source is INDEPENDENTLY located by the verifier — the collector's summary is not trusted.

**Method note (independence + the flagged tooling hazard).** I did not use the collector's route or
trust any collector-supplied quote. All five primary PDFs (Cepeda 2006, Cepeda 2008, Donovan &
Radosevich 1999, Taylor & Rohrer 2010, Kornell & Bjork 2008) were downloaded with `curl` and text
was extracted **locally with `pdftotext`**, then grepped for each claimed quote in its own context.
This sidesteps the "fetch summary that quotes while claiming it cannot extract" hazard entirely — I
either found a string in a local text file or I did not. All four HTML sources were likewise fetched
with `curl` and stripped to text locally. Roediger & Karpicke (2006) was the one source whose full
text I could not obtain (Sage paywall, three open-mirror attempts returned HTML error pages); I
verified it against the **primary record's own abstract on PubMed (PMID 16507066)**, which is
stronger than the collector's secondary-summary basis. Every quote below is one I saw myself.

| # | Claim | Source (id / title / URL·DOI) | Indep. located? | Exists | Supports | Strength honest | State | Supporting location (VERIFIED only) | Quality tier | Notes / downgrade |
|---|---|---|---|---|---|---|---|---|---|---|
| F1 | Spacing advantage is highly replicated but its evidence base is verbal/declarative only | Cepeda, Pashler, Vul, Wixted & Rohrer (2006), *Psych. Bulletin* 132(3), 354–380 · augmentingcognition.com/assets/Cepeda2006.pdf | Yes — PDF downloaded, `pdftotext`, 27pp | ✔ | ✔ | ✔ | **VERIFIED** | Abstract ("839 assessments … 317 experiments … 184 articles"); **Method → "Inclusion Criteria"**, 1st sentence ("The material must have been learned during a verbal memory task…"); **Results**, p.359 col.1 ("For retention intervals less than 1 min, spaced presentations improved final-test performance by 9%"); **Results** p.360 ("Only 12 of 271 comparisons … showed no effect or a negative effect from spacing, making the spacing effect quite robust"); **Table 1** (retention-interval breakdown) | Q1 | Confirmed exactly. All three quotes verbatim. Collector's parenthetical "larger gains at longer intervals" is independently supported by Table 1 (1–59 s: 41.2→50.1; 8–30 days: 32.8→62.2). Scope characterisation is **correct and load-bearing** — the inclusion criterion is explicitly verbal-only. |
| F2 | Optimal gap scales with retention interval ("temporal ridgeline"); established on declarative trivia | Cepeda, Vul, Rohrer, Wixted & Pashler (2008), *Psych. Science* 19(11), 1095–1102 · files.eric.ed.gov/fulltext/ED505660.pdf | Yes — PDF downloaded, `pdftotext` | ✔ | ✔ | ✔ | **VERIFIED** | **Abstract** ("The optimum gap value was about 20% of the test delay for delays of a few weeks, falling to about 5% when delay was one year"); **Current Study** ("1354 new subjects"); **Method → Stimuli and materials** ("32 obscure but true trivia facts … All answers consisted of a single word of 5 or 6 letters") | Q2 | Verified verbatim. Declarative-single-fact scope is accurate. **Minor provenance note (differs from collector):** the ERIC file is the *in-press manuscript*, self-labelled "This manuscript may differ from the final published version" — fine for these numbers (they are in the abstract) but should be cited as such, not as the published version of record. |
| F3 | Distributed-practice benefit shrinks sharply as task complexity rises | Donovan & Radosevich (1999), *J. Applied Psych.* 84(5), 795–805 · gwern.net/doc/psychology/spaced-repetition/1999-donovan.pdf | Yes — PDF downloaded, `pdftotext` | ✔ | ✔ | **✘ → downgraded** | **VERIFIED (strength downgraded)** | **Abstract** ("A meta-analysis of 63 studies with 112 effect sizes yielded an overall mean weighted effect size of 0.46"); **Results → Moderator Analyses → Task type** ("dTC1 = 0.97, dTC2 = 0,42, dTC3 = 0.11, dTC4 = 0.07"); same section ("overall complexity was negatively and significantly correlated with the effect sizes generated (r = -.25, p < .05)"); **Discussion** ("The strong distribution of practice effects previously reported appears to be limited to relatively simple tasks") | Q1 | **Every number is exact.** But see downgrade below — the collector's directional framing ("toward complex **cognitive** tasks") is not what the clusters show, and this is the dossier's self-declared most load-bearing finding. |
| F4 | Interleaved/spaced practice on a rule-application task doubled accuracy; benefit concentrated in discrimination errors | Taylor & Rohrer (2010), *Applied Cognitive Psych.* 24(6), 837–848 · uweb.cas.usf.edu/~drohrer/pdfs/Taylor&Rohrer2010ACP.pdf | Yes — PDF downloaded, `pdftotext` | ✔ | ✔ | **✘ → downgraded** | **VERIFIED (strength downgraded)** | **Results → Tests** ("Mean accuracy on Test 1 … was more than doubled by the interleaving of practice (77% vs. 38%), t(22) = 2.96, p < .01, Cohen's d = 1.21"); **Results → Test errors** ("15% vs. 13% … discrimination errors (46% vs. 10%)"); **Discussion → A theoretical account of the benefit of interleaving** ("they must learn how to pair each kind of task with its appropriate procedure"); **Method** (four prism features: face, corner, edge, angle) | Q2 | All quotes verbatim. **But the collector's caveat inverts the paper's design** — see downgrade below. This is a finding about **interleaving with spacing held constant**, not about spacing. |
| F5 | 2024 systematic review: spaced digital education improves knowledge and skills, but skill evidence is thin | Martinengo et al. (2024), *JMIR* 26, e57760 · DOI 10.2196/57760 · PMC11502984 | Yes — PMC fetched, stripped to text locally | ✔ | ✔ | ✔ | **VERIFIED** | **Abstract → Results** ("Spaced online education was superior … postintervention knowledge (n=9, 39%; SMD 0.32, 95% CI 0.13-0.51)"; "Spaced digital simulation was superior to massed simulation for postintervention surgical skills (n=2, 9%; SMD 1.15, 95% CI 0.34-1.96, I²=74%, **low certainty of evidence**)"); **Results** (outcome breakdown: knowledge n=15 65%, skills n=9 39%, attitudes n=8 35%, behavior change n=8 35%); **Discussion** ("Similar research in health profession education is lacking"); **Limitations** ("substantial heterogeneity"; "the low quality of the included studies, reflected in the majority of unclear- and high-risk-of-bias assessments") | Q1 (downgraded in confidence — correctly) | Verified verbatim. **Precision refinement (differs from collector):** the headline SMD 1.15 rests on **n=2 studies at GRADE "low certainty"**, not on the n=9 skills subset. The collector's caution is directionally right but understates how thin that specific number is. Recording this *strengthens*, not weakens, the dossier's own reading. |
| F6 | Spacing improves inductive category learning despite learners judging massing more effective | Kornell & Bjork (2008), *Psych. Science* 19(6), 585–592 · web.williams.edu/…/Kornell.Bjork.2008a.pdf | Yes — PDF downloaded, `pdftotext` | ✔ | ✔ | ✔ (with a confound note) | **VERIFIED** | **Experiments 1a/1b Results** ("Experiment 1a (M = .61, SD = .24 vs. M = .35, SD = .24), t(119) = 10.82, p < .0001, d = 0.99" — and the text confirms analyses were "restricted … to the first test block"); **Experiment 2 Results** (hit rate "spaced condition (M = .77, SD = .22) than in the massed condition (M = .67, SD = .24), t(79) = 3.28"); **Abstract** ("Participants rated massing as more effective than spacing, even after their own test performance had demonstrated the opposite") | Q2 | All numbers verbatim; the collector's "first test block" qualifier is **correct for both experiments** (confirmed in text). **Added caveat the dossier lacks:** K&B's spaced condition is *interleaved* ("mixing paintings of different artists"), so spacing and interleaving are confounded here — Taylor & Rohrer (2010) name this paper explicitly as an instance of that confound. → Conflict #11. |
| F6-r | Verkoeijen & Bouwmeester (2014) replication of K&B Exp. 2 | *Frontiers in Psychology* 5, 259 · PMC3978334 | Yes — PMC fetched, stripped locally | ✔ | ✔ | **✘ → downgraded** | **VERIFIED (framing corrected)** | **Introduction** and **Conclusion** ("a medium-sized advantage of spacing over massing in inductive learning comparable to the original effect found by Kornell and Bjork (2008)"; "the 95% CI-s … overlapped considerably") | Q2 | Both quotes verbatim. **But the collector's framing inverts the source's tense:** "have never been replicated" is stated in this paper as the *motivation* for running the replication — and this paper **is** that replication, concluding the two experiments "clearly reinforce each other." The dossier presents it as a standing limitation on the finding. Corrected. |
| F7 | SM-2 was built from one person's self-study log by trial-and-error, not controlled validation | Wozniak, "SuperMemo 2 Algorithm (SM-2)" · supermemo.com/en/archives1990-2015/english/ol/sm2 | Yes — HTML fetched, stripped locally | ✔ | ✔ | ✔ | **VERIFIED** | **Algorithm statement** ("I(1):=1 I(2):=6 for n>2: I(n):=I(n-1)*EF"; "EF':=EF+(0.1-(5-q)*(0.08+(5-q)*0.02))"; "If EF is less than 1.3 then let EF be 1.3"; initial EF 2.5); **closing narrative** ("Constructed by means of the trial-and-error approach"); **evidence paragraph** ("During the first year of using the SM-2 algorithm (learning English vocabulary), I memorized 10,255 items … The overall retention was 89.3%") | Q5 | Verified verbatim, every element. The Assumption bucket and explicit Q5 (not Q2/Q3) tier are **honest and correctly reasoned** — n=1, one domain, self-reported, no control. This is exactly how a first-party self-report should be recorded. |
| F8 | FSRS computes a DSR model on Anki logs and reports large gains over SM-2, from its own developers, who concede no fair comparison is possible | Expertium, "Benchmark of Spaced Repetition Algorithms" + "A technical explanation of FSRS" · expertium.github.io/Benchmark.html, /Algorithm.html | Yes — both HTML fetched, stripped locally | ✔ | ✔ | ✔ (headline) | **VERIFIED (one sub-claim dropped)** | **Benchmark → Intro** ("when I say 'we', I'm referring to myself and Jarrett Ye, the creator of FSRS"); **Benchmark → Dataset** ("Anki revlogs 10k … ~727 million flashcard reviews from 10 thousand users"; "the real number of reviews used for evaluation is around 350 million"); **Benchmark → Superiority**, single paragraph containing BOTH ("FSRS-6 (with recency weighting) has a 99.6% superiority over Anki SM-2" AND "There is no way to have a truly fair, no caveats, comparison between FSRS and SM-2"); **Algorithm page** (R/S/D definitions) | Q5 | Headline verified verbatim; the card's specific ask — that one source contains both the superiority claim and the no-fair-comparison admission — is **confirmed, and they are in the same paragraph**. Collector correctly glosses "99.6% superiority" as a log-loss/per-collection figure, not "99.6% better." **Sub-claim dropped:** see Kills. **Provenance note:** the Benchmark page carries an "(UNFINISHED)" banner. |
| F9 | The minimum-information principle is a design heuristic from personal experience and analogy, not research | Wozniak, "Twenty rules of formulating knowledge" · supermemo.com/en/blog/twenty-rules-of-formulating-knowledge | Yes — HTML fetched, stripped locally | ✔ | ✔ | ✔ | **VERIFIED** | **Rule 4, "Stick to the minimum information principle"** ("The material you learn must be formulated in as simple way as it is…"; "Imagine a labyrinth. When making a repetition … your brain is running through a labyrinth"); and the same rule's closing ("You might want to experiment and try to learn two subjects using the two above approaches and see for yourself what advantage is brought by minimum information principle") | Q6 | Verified verbatim at exactly the proposed location (Rule 4). The characterisation "justified by an analogy … not by a cited experiment" is accurate — I checked; the rule cites no study. Product-judgement/community-convention bucket is correct and is the dossier's cleanest sub-Q3 answer. |
| F10 | Testing effect: retrieval beats restudy at delay, reversing an immediate-test advantage for restudy | Roediger & Karpicke (2006), *Psych. Science* 17(3), 249–255 · DOI 10.1111/j.1467-9280.2006.01693.x | Yes — located via PubMed **PMID 16507066**; abstract of the primary read directly | ✔ | ✔ | ✔ | **VERIFIED (access improved on collector)** | **Primary abstract (PubMed/Sage)**: "When the final test was given after 5 min, repeated studying improved recall relative to repeated testing. However, on the delayed tests, prior testing produced substantially greater retention than studying, even though repeated studying increased students' confidence in their ability to remember the material." | Q2 | **Differs from collector, in the dossier's favour:** the collector recorded this as abstract/secondary-only and downgraded on access. I verified the claim against the **primary source's own abstract**, which states the reversal directly — no secondary summary needed. The access downgrade can be lifted. Two small precisions: delays were 5 min / 2 days / **1 week** (collector cites only 5-min and 1-week), and the "does not depend on any specific spacing schedule" clause is the collector's reasonable inference, not something the source asserts. |
| F11 | Anki's self-graded difficulty rests on self-assessment the metacognition literature shows is miscalibrated | Kornell & Bjork (2008), as F6 | Yes — same local PDF | ✔ | ✔ | ✔ | **VERIFIED** | **Abstract** and **Experiment 1a Discussion** ("participants in Experiment 1a judged massing to be more effective than spacing, regardless of their performance in the two conditions"); supporting mechanism at **Discussion** ("made their metacognitive judgments on the basis of their subjective experience during the study phase") | Q3 | Quote verbatim. The Q3 tier and the Assumption/Product-judgement bucket are **honest** — and the collector's own bolded disclaimer that no citation directly evaluating Anki's four-button scale was found is accurate; I searched for one too (see sufficiency searches) and also found none. This is a well-handled finding: the claim is explicitly held to "adjacent, suggestive caution." |

## Resolution log (every citation that was UNVERIFIED at any point)

| # | Which point failed (exists / supports / strength) | Move taken (re-check · downgrade · drop) | Terminal state | Note |
|---|---|---|---|---|
| F3 | **strength** — numbers all correct, but the claim's *direction* ("as complexity rises from simple motor **toward complex cognitive tasks**") does not match the source's cluster structure | **(b) downgrade**, then re-verified the weakened claim | **VERIFIED (downgraded)** | Donovan & Radosevich's clusters are not a complexity ladder from motor to cognitive. TC1 (d=0.97) = high-physical/low-mental/**low** complexity; TC2 (d=0.42) = **high-mental/low-physical**/average complexity; TC3 (d=0.11) = **low-mental**/high-physical/high complexity; TC4 (d=0.07) = high-mental/high-physical/high complexity. **Both near-zero clusters are high-physical.** The paper further reports "Mental and physical requirements of the task were not significantly correlated with the effect sizes (p > .35)" — only *overall complexity* was. And the paper's own worked example places "learning of factual knowledge via a lecture" and "distance learning accomplished via the Internet" in **TC2, d = 0.42** — i.e. the closest cluster to a screen-based cognitive trainer retains a solid medium effect. Downgraded claim, re-verified: *task complexity is a statistically significant negative moderator of the distributed-practice effect (r = −.25, p < .05), with the effect collapsing to near zero in the two high-physical-requirement clusters; the purely cognitive, low-physical cluster retains d = 0.42.* |
| F4 | **strength** — the caveat mischaracterises the study's design in a way that overstates its relevance to *spacing* | **(b) downgrade**, then re-verified the weakened claim | **VERIFIED (downgraded)** | The dossier's caveat says the paper "treats interleaving as a vehicle for spacing rather than isolating spacing as a pure variable," quoting the paper's *motivational* sentence. The paper's actual design is the opposite: abstract — "children practiced four kinds of mathematics problems in an order that was interleaved or blocked, and **the degree of spacing was fixed**"; introduction — "The present study assessed the effects of interleaving **while equating the degree of spacing**"; discussion — "**this is the first study to assess the benefit of interleaving while controlling for the benefit of spacing** … the present data demonstrate that interleaving per se can improve test scores by a large margin." Spacing was deliberately removed as a variable. Downgraded claim, re-verified: *interleaving — not spacing — roughly doubled accuracy on a rule-application task, with the benefit concentrated in discrimination errors.* |
| F6-r | **strength** — tense/framing inversion of the replication's status | **(b) downgrade** (framing corrected), re-verified | **VERIFIED (corrected)** | See table row F6-r. The source *is* the replication; it does not leave the finding unreplicated. |
| F8 (sub-claim) | **supports** — the cited pages do not state the attributed MaiMemo/DHP lineage | **(c) drop** the sub-claim | **DROPPED (sub-claim only; F8 headline VERIFIED)** | See Kills. |

**No citation was left UNVERIFIED. No citation required quarantine.**

## Kills (citations dropped — the claim lost this support)

- **F8, caveat sub-claim only** — "The underlying difficulty–stability–retrievability model is stated
  (**via the Algorithm page**) to descend from a 'DHP model' from a commercial vendor (MaiMemo)."
  I read both cited pages in full locally. **The Algorithm page contains no occurrence of "DHP" or
  "MaiMemo" at all.** What actually exists is on the *Benchmark* page, in the "DSR memory model"
  section, and it is a naming gloss, not a lineage claim: "Difficulty, Stability, Retrievability
  (alternatively Difficulty, Half-Life, Probability)" — i.e. DHP is presented as an *alternative name
  for the same model*, not as a MaiMemo-originated ancestor. The Benchmark page mentions MaiMemo only
  as a *comparison dataset* ("approximately 3 times more reviews than in the Maimemo dataset").
  → **Re-bucket: Assumption.** The MaiMemo/DHP lineage may well be true in the wider literature (Ye et
  al. published DHP work at MaiMemo), but **these two sources do not state it**, and the dossier
  attributes it to the wrong page. Source-lead register entry #2 rests on this same mis-attribution
  ("FSRS's own docs cite it as origin") and should be read with the same correction.
  **This does not disturb F8's headline finding**, which verified verbatim.

## Quarantine (UNVERIFIABLE — could not be reached at all)

- None. Every source resolved. Roediger & Karpicke (2006) full text is paywalled, but the primary
  record and its abstract were reached directly and carry the claim — not quarantined.

## Conflicts surfaced during verification

- **#11 — Whether the interleaving evidence in this dossier (F4, F6) is spacing evidence at all.**
  Taylor & Rohrer (2010) held spacing *constant* and attribute the benefit to interleaving per se;
  they also name Kornell & Bjork (2008) — the dossier's F6 — as a study whose "interleaving
  manipulation is explicitly described as one that combines interleaving and spacing." Both of the
  dossier's two closest-to-a-decision-rule sources are therefore, on their sources' own terms, at
  least partly *interleaving* findings rather than *spacing* findings. → appended to
  `registers/conflict-register.md` as #11.

- Conflicts #10 (Cepeda vs. Donovan) and #5 (FSRS superiority vs. no-fair-comparison) are already
  registered by the collector. **I confirm both are real and correctly stated**, with one refinement
  to #10 recorded in the F3 downgrade above: the Donovan side is a *complexity* moderation whose
  near-zero clusters are high-physical, not a general "cognitive tasks don't benefit" result. I have
  not rewritten those rows; the refinement lives here and in conflict #11's note.

## Dossier sufficiency (SECOND AXIS — judged independently of citation states)

**Verdict: INSUFFICIENT**

This is not a verdict on honesty. The citation work here is, on the evidence, the most careful I
could have asked for: 11/11 citations exist, quotes are verbatim rather than paraphrased-and-
attributed, first-party sources are correctly held out of "Evidence-backed," and the collector named
four coverage gaps rather than papering over them. Per the shared brief, those named gaps are
**thoroughness and I do not count them against it.** The insufficiency is about a different thing —
three substantial bodies of evidence that were *missed*, one of which makes a stated coverage-gap
conclusion factually wrong.

- **Traditions/landmarks/positions present:** the verbal-recall spacing meta-analytic tradition
  (Cepeda 2006, 2008); the applied/organizational distribution-of-practice meta-analytic tradition
  (Donovan & Radosevich); the desirable-difficulties/metacognition tradition (Kornell & Bjork,
  Verkoeijen); interleaving (Taylor & Rohrer); the testing-effect tradition (Roediger & Karpicke);
  health-professions spaced-education reviews (Martinengo 2024); first-party SuperMemo/FSRS technical
  self-reports (SM-2, Twenty Rules, Expertium).
- **Required sub-questions answered: 3.5 of 4.** Q1 answered well. Q2 answered on the *algorithm
  description* side but its "evidence asymmetry" framing is **wrong as stated** (see below). Q3
  answered only from SuperMemo's own essays — no empirical study of Anki appears anywhere. Q4
  answered honestly and, in my judgment, correctly as a gap.
- **Searches run to test for what is NOT there** (five, all beyond the dossier's contents):
  1. `Pavlik Anderson optimal schedule of practice ACT-R spacing model peer-reviewed`
  2. `Lindsey Shroyer Pashler Mozer 2014 improving students long-term knowledge retention personalized review Psychological Science`
  3. `Settles Meeder 2016 half-life regression Duolingo spaced repetition ACL model evaluation`
  4. `Anki flashcard use medical students exam performance empirical study retrospective`
  5. `contextual interference effect decision making training spacing procedural skill retention meta-analysis`
     (plus `spaced practice retention of decision rules clinical decision making training…` for sub-Q4)

### If INSUFFICIENT (all three required)

**1. What important evidence appears missing**

- **(A) The academic adaptive-scheduling tradition — the most consequential omission.** Peer-reviewed,
  non-community scheduling-algorithm research exists and is absent entirely:
  - Pavlik & Anderson (2008), "Using a model to compute the optimal schedule of practice," *J. Exp.
    Psych.: Applied* 14(2), 101–117 — ACT-R-based scheduler, optimized condition tested against
    controls.
  - Lindsey, Shroyer, Pashler & Mozer (2014), "Improving students' long-term knowledge retention
    through personalized review," *Psychological Science* — a **semester-long classroom study** of a
    personalized spaced-review scheduler reporting ~16.5% retention gain over massed study and ~10%
    over one-size-fits-all spacing.
  - Settles & Meeder (2016), "A Trainable Spaced Repetition Model for Language Learning," *ACL* 2016 —
    half-life regression, peer-reviewed, evaluated against baseline schedulers on Duolingo data, with
    public code and data.
- **(B) Empirical studies of Anki itself.** The card's sub-Q3 is "Anki as pedagogy," yet not one study
  of actual Anki users is cited. There is a body of it, including a **systematic review**: "Anki Use
  and Academic Performance in Medical Education: A Systematic Review of Evidence and Learning Theory,"
  *Medical Science Educator* (2026), plus multiple cohort/retrospective studies relating Anki usage
  volume and start-date to USMLE Step 1 / NBME performance.
- **(C) The contextual-interference (CI) tradition, including its opposing position.** Directly
  governs how F4/F6-style interleaving findings should be read, and contains an active dispute the
  dossier represents only one side of: Kim et al. (2024), "High contextual interference improves
  retention in motor learning: systematic review and meta-analysis," *Scientific Reports* 14 (54
  studies, 2,068 participants; medium benefit overall but "almost negligible" in *applied* settings),
  versus a **critical** systematic review with multilevel meta-analysis in *Educational Psychology
  Review* (2024) reporting only ~20% of 183 pooled outcomes agreed with the paradoxical CI effect.

**2. Why the omission could materially affect the findings**

- **(A) falsifies a stated conclusion.** The dossier's coverage gap reads: "**No independent,
  non-community-authored evaluation of FSRS (or SM-2) against each other, or against a held-out
  academic benchmark, was located. All scheduling-algorithm evidence found in this pass originates
  from the tool's own maintainers.**" The second sentence is false as a description of the field, and
  sub-Q2's framing — an asymmetry between "academically-studied spacing effect vs. self/community-
  evaluated scheduling **algorithms**" — collapses: scheduling algorithms *have* been studied
  academically, with control conditions and independent authorship. The conclusion moves **toward
  more confidence** that algorithmic spaced scheduling beats naive/massed review, while leaving the
  narrower FSRS-vs-SM-2 comparison exactly as self-evaluated as the dossier says. That is a real
  directional change, and it is the kind that matters: the current framing invites a downstream reader
  to discount *all* scheduling evidence because FSRS's benchmark is self-authored.
- **(B) leaves sub-Q3 answered entirely from the vendor.** Every sub-Q3 claim traces to Wozniak's own
  writing. "Evidence-backed vs. community convention" cannot be adjudicated from sources that are
  themselves the convention's origin. The Anki-user literature is observational (self-selected,
  confounded with conscientiousness) and would mostly *reinforce* the dossier's "convention, not
  validated method" verdict — but it would do so with evidence rather than by absence, and it could
  move F9's bucket if any study isolates item atomicity.
- **(C) affects the load-bearing sub-Q4 conclusion in both directions.** Given the F4 downgrade above,
  interleaving/CI — not spacing — is the mechanism actually evidenced for rule-application tasks. The
  CI literature is where that question has been studied for decades, and its own recent meta-analyses
  disagree about whether the effect survives in applied settings. The dossier's sub-Q4 gap statement
  ("untested, not merely under-studied") is, I judge, **still correct for spacing on a
  blackjack-shaped decision rule** — I searched for a counterexample and found none. But it is
  currently argued without the literature that most nearly bears on it, and CI's applied-setting
  attenuation would strengthen the caution while its interleaving-benefit findings would qualify it.

**3. Exact scope of the one focused collection pass**

One bounded pass, **6–8 citations, no re-run of the card**, collecting only:
- **3–4 on academic scheduling algorithms** — Pavlik & Anderson (2008); Lindsey et al. (2014);
  Settles & Meeder (2016); optionally one recent independent FSRS/HLR comparison. Record what each
  scheduler was compared *against*, whether authorship is independent of the tool, and the outcome
  measure (predictive accuracy vs. actual retention gain — these are not the same claim). **Then
  rewrite the sub-Q2 asymmetry framing and strike the "all scheduling-algorithm evidence originates
  from the tool's own maintainers" gap statement.**
- **1–2 on Anki empirically** — the *Medical Science Educator* (2026) systematic review as the anchor,
  plus at most one primary cohort study. Tier these **Q3 observational at best**; do not let
  "systematic review" imply Q1-strength causal support for a self-selected-usage association.
- **2 on contextual interference** — the *Scientific Reports* (2024) meta-analysis and the
  *Educational Psychology Review* (2024) critical review, collected **as a matched pair** so the
  dispute is registered as a conflict rather than resolved.

Explicitly **out of scope**: re-collecting anything in F1–F11, and the Moulton (2006) overflow lead
(already registered as source-lead #1).

## Verifier summary
- VERIFIED: **11**  |  UNVERIFIABLE: **0**  |  DROPPED: **0 whole citations** (1 sub-claim within F8 dropped)
- **UNVERIFIED remaining: 0** — every citation is terminal.
- **Dossier sufficiency: INSUFFICIENT** (citation integrity is high; coverage has three real holes)
- Claims the collector overstated (strength downgraded):
  1. **F3** — "as task complexity rises from simple motor toward complex **cognitive** tasks." The two
     near-zero clusters are both **high-physical**; the high-mental/low-physical cluster holds
     d = 0.42, and the paper reports mental requirements were *not* significantly correlated with
     effect size. Numbers exact; direction overstated. Most consequential correction in this record,
     since the dossier calls F3 its most load-bearing finding.
  2. **F4** — presented as "interleaved/**spaced** practice" with a caveat claiming the paper does not
     isolate spacing. The paper **held spacing fixed by design** and is explicitly "the first study to
     assess the benefit of interleaving while controlling for the benefit of spacing." It is
     interleaving evidence, not spacing evidence.
  3. **F6-r** — the Verkoeijen "never been replicated" quote is the replication's *motivation*, not a
     standing limitation; that paper is itself the successful replication.
  4. **F8 sub-claim** — MaiMemo/DHP lineage attributed to a page that does not mention either term.
  5. **F5** (precision, not overstatement) — the SMD 1.15 rests on n=2 studies at GRADE low certainty.
- Claims where the collector **under**-stated its own support: **F10** — verified against the primary's
  own abstract; the access-based downgrade can be lifted.
- Supporting locations that differed from the collector's: **F8** (DHP/MaiMemo is on the Benchmark
  page as a naming gloss, not on the Algorithm page as a lineage claim); **F5** (the 1.15 figure and
  its n=2/low-certainty qualifier sit together in the Abstract→Results, not in the skills subset);
  **F2** (ERIC copy is the in-press manuscript, not the version of record). All other locations
  matched or were more precise versions of the collector's proposals.
