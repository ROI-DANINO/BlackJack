# Verification Record: C2 — Intelligent Tutoring Systems, ACT-R, Procedural Skill Acquisition

> Verifier: Claude (Opus 4.8) — a different agent instance than the collector (Sonnet 5)  |  Date: 2026-07-19
> Contract: exists + supports + strength-honest. VERIFIED requires an exact supporting location.
> Every source is INDEPENDENTLY located by the verifier — the collector's summary is not trusted.

## Method note (how independence was made real)

I did not rely on any fetch summary for a passage I claim to have read. Six primary PDFs were
downloaded to local disk and text-extracted with `pdftotext` (Ma 2014, Anderson 1982, Heathcote 2000,
Pavlik & Anderson 2008, Cepeda 2006, VanLehn's slide deck), plus Rohrer 2014 pulled from Springer.
Every "exact quote" below was matched against locally extracted text, not against a model summary of
a web page. Two citations (F2 Kulik & Fletcher, F8 Donner & Hardy) are abstract-level records where
the abstract itself is the claimed supporting location; those were read via fetched record pages,
which is adequate for an abstract-scoped claim and is stated as such rather than implied to be
full-text reading.

**Access claims are verified as claims.** Where the collector said something was unreachable, I tried
to reach it myself. One such claim held (VanLehn 2011) and one did not (Cepeda 2006 — see F10).

| # | Claim | Source (id / title / URL·DOI) | Indep. located? | Exists | Supports | Strength honest | State | Supporting location (VERIFIED only) | Quality tier | Notes / downgrade |
|---|---|---|---|---|---|---|---|---|---|---|
| F1 | Step-based ITS ≈ human tutoring; gains plateau at step-level granularity | VanLehn (2011), *Educational Psychologist* 46(4), 197–221, DOI 10.1080/00461520.2011.611369 — accessed via author's own slide deck (educationgroup.mit.edu …VanLehnPresentationSlides.pdf) + Ma et al. (2014) secondary discussion | Yes — slide deck downloaded and text-extracted; Ma discussion read in primary PDF | ✅ | ✅ | ⚠️ corrected | **VERIFIED** (with tier correction + numeric upgrade) | Slides: "A widely held belief: Human tutors are much more effective than computer tutors" (slide 14); "Evidence for an interaction plateau"; "The interaction plateau hypothesis — … But grain sizes less than steps are no more effective than steps — Steps = substeps = human" (slide 41); **meta-analytic table, slide 37**, "Meta-analytic results for all possible pairwise comparisons (VanLehn, 2011)": vs. no tutoring — Answer-based 0.31 (165 effects), **Step-based 0.76 (28)**, **Substep-based 0.40 (26)**, **Human 0.79 (10)**. Ma et al. (2014) p.5 col.1 (PDF p.5, extracted lines 407–419) | **Q5** first-party self-report of a Q1 analysis, corroborated by a Q1 secondary (Ma) — **corrected from collector's Q4** | Collector's numeric hedge is **too pessimistic** — see "Upgrades" below. Headline phrasing "plateau *above* step-level granularity" is ambiguous/arguably inverted vs. VanLehn's own wording; see Notes. |
| F2 | 2016 meta-analysis of 50 ITS evaluations: median 0.66 SD over conventional levels; test-alignment a major moderator | Kulik & Fletcher (2016), *Review of Educational Research* 86(1), 42–78 — https://eric.ed.gov/?id=EJ1090502 | Yes — ERIC record independently fetched | ✅ | ✅ | ✅ | **VERIFIED** | Abstract, sentences 2 and 3 | Q1 (meta-analysis), access-limited to abstract — collector's downgrade is adequate | Both quoted sentences confirmed **verbatim**. Citation metadata (86(1), 42–78, 2016) exact. Collector transcribed "However, the amount of improvement…" as "The amount of improvement…" — trivial. |
| F3 | ITS beats large-group instruction / CBI / textbooks; does NOT beat individual human tutoring or small-group | Ma, Adesope, Nesbit & Liu (2014), *J. Educational Psychology* 106(4), 901–918 — https://cs.uky.edu/~sgware/reading/papers/ma2014intelligent.pdf | Yes — full PDF downloaded, text-extracted | ✅ | ✅ | ⚠️ **corrected** | **VERIFIED after correction** | Abstract (verbatim, extracted lines 19–29); **Table 1**, "Overall Mean Effect and Mean Effect Sizes for Comparison Treatments" (extracted lines 515–541) | Q1 (meta-analysis of 107 effect sizes, 14,321 participants) — confirmed | **Collector misread Table 1's columns.** See resolution log row F3. |
| F4 | Anderson (1982): declarative stage → knowledge compilation (composition + proceduralization) → procedural stage | Anderson (1982), *Psychological Review* 89(4), 369–406 — https://gwern.net/doc/iq/1982-anderson-2.pdf | Yes — full PDF downloaded, text-extracted | ✅ | ✅ | ⚠️ **downgraded** | **VERIFIED after downgrade** | Abstract, p.369 (verbatim); "It requires at least 100 hours of learning and practice…" confirmed at p.369 col.1 | Q4 (theoretical synthesis in a running production system) — confirmed | Quote is verbatim. But the headline's "**three-stage** account" is **not Anderson's framing** — the abstract says "**two major stages**" with knowledge compilation as the *transition process* between them. The three-stage framing (cognitive/associative/autonomous) is **Fitts (1964)**, which Anderson discusses on the same page as a comparison. Downgraded. |
| F5 | The power-law speedup as ACT's practice signature | Anderson (1982) p.397 — **read directly by me in the primary**, not via Heathcote | Yes — **primary read directly**, PDF page 29 = journal p.397 | ✅ | ⚠️ partial | ⚠️ **downgraded** | **VERIFIED after downgrade** | **Anderson (1982) p.397, section heading "Procedural Learning: The Power Law"** — full unelided sentence read directly. Also Heathcote et al. (2000) manuscript p.3 (extracted line 87), where the same elided quote appears | Q4 — access-downgrade **removed** (I read the primary), strength downgraded instead | **Material finding — see "Strength downgrades" below.** The collector's ellipsed quote hides a clause that reverses the framing. |
| F6 | Newell & Rosenbloom (1981) proposed power-law universality via chunking theory, on data averaged across subjects | N&R (1981) quoted via Heathcote, Brown & Mewhort (2000) — https://users.cs.northwestern.edu/~paritosh/papers/KIP/power-law-repealed.pdf | Yes — Heathcote PDF downloaded and text-extracted; N&R chapter itself not opened (consistent with collector) | ✅ | ✅ | ✅ | **VERIFIED** | Heathcote et al. (2000) manuscript pp.3–4: epigraph "Curve fitting without benefit of a model is notoriously a black art." (N&R p.23, extracted line 64); "the power function implies 'a learning process in which some mechanism is slowing down the rate of learning' (Newell & Rosenbloom, 1981, p. 18)" (line 183); "Data from all but one of the tasks examined by Newell and Rosenbloom (1981), for example, were averaged over subjects, conditions, or practice blocks." (lines 136–138); chunking theory at line 2673 | Q4 source, accessed **through a secondary quotation** — collector's access-downgrade is adequate | All three quotes confirmed verbatim inside Heathcote. Collector's access account is **truthful**. Bonus: Logan (1988) "benchmark prediction … serious contenders" (p.495) confirmed at line 121. |
| F7 | Exponential beat power in all 40 unaveraged datasets (7,910 series, 475 subjects, 24 experiments) | Heathcote, Brown & Mewhort (2000), *Psychonomic Bulletin & Review* 7(2), 185–207 — same URL | Yes — full PDF downloaded, text-extracted | ✅ | ✅ | ⚠️ minor | **VERIFIED** | Abstract (manuscript p.2, extracted lines 36–51) — verbatim; "Data Sets" section, manuscript p.13 (line 698): "We fit 40 sets of data; collectively, the data represent 7910 learning series from 475 subjects in 24 experiments taken from 13 published and 3 unpublished sources." | Q1 — confirmed | Abstract quote **verbatim**. One caveat overstated: the collector says *all* datasets are RT paradigms; a footnote analysis (extracted lines 415–423) also fits **games won/lost** data. Minor — the 40 main datasets are RT paradigms and the caveat's thrust holds. **Note the PDF is the "In Press" manuscript, so page refs are manuscript pages, not journal pp.185–207.** |
| F8 | 25,280 individual curves, four tasks: piecewise power law beats a single power law | Donner & Hardy (2015), *Psychonomic Bulletin & Review*, DOI 10.3758/s13423-015-0811-x — https://pmc.ncbi.nlm.nih.gov/articles/PMC4577530/ | Yes — PMC record independently fetched | ✅ | ✅ | ✅ | **VERIFIED**, and collector's flagged uncertainty **resolved** | Abstract, in full. Collector's paraphrase matches the abstract's closing sentences **verbatim**: "at least two processes at work in individual learning curves: locally, a gradual, smooth improvement, with diminishing gains within a specific strategy, which is modeled well as a PL; and globally, a discrete sequence of strategy shifts…" | Q3 (large-sample observational model comparison) — confirmed | Collector flagged that it "could not confirm the exact statistical comparison against the exponential family." **Resolved in the collector's favour:** the paper did compare — "Three-parameter piecewise exponential functions performed similarly to the three-parameter PPLs, but slightly worse, explaining 90.43% of the variance." The stated caveat can be relaxed. |
| F9 | ACT-R spacing model scheduling a fixed 180-item set beat Atkinson-Markov and flashcard controls | Pavlik & Anderson (2008), *JEP: Applied* 14(2), 101–117 — http://act-r.psy.cmu.edu/…/791xap-14-2-101.pdf | Yes — full PDF downloaded, text-extracted | ✅ | ✅ | ✅ | **VERIFIED** | Abstract (verbatim, extracted lines 13–22); Results, p.108: "For correctness, these results show a Cohen's-d effect size of 0.796 SD compared to the Atkinson control and 0.978 SD compared to the flashcard control… an effect size of 1.17 SD compared to the Atkinson control and 1.31 SD compared to the flashcard control." (lines 444–449); "60 participants learned a set of 180 Japanese-English vocabulary words" (line 170) | Q2 (controlled experiment, random assignment, n=60) — confirmed | **Cleanest citation in the dossier.** Every number, the n, the item count, and the abstract quote confirmed verbatim against the primary. |
| F10 | Cepeda et al. (2006): 839 assessments in 317 experiments; optimal ISI increases with retention interval | Cepeda, Pashler, Vul, Wixted & Rohrer (2006), *Psychological Bulletin* 132(3), 354–380 — https://augmentingcognition.com/assets/Cepeda2006.pdf | Yes — **full PDF downloaded and text-extracted** | ✅ | ✅ | ✅ | **VERIFIED — access UPGRADED** | Abstract, p.354 (verbatim): "This review found 839 assessments of distributed practice in 317 experiments located in 184 articles… Analyses suggest that ISI and retention interval operate jointly to affect final-test retention; specifically, the ISI producing maximal retention increased as retention interval increased." Also Method, extracted lines 208–209 | **Q1 — collector's access-downgrade REMOVED** | See "Access claims" below. The collector's own recorded URL works and returns the full PDF on a first attempt. One caveat the collector missed: the paper's scope is **verbal recall tasks** by title and inclusion criterion — relevant to transfer, and already registered as Conflict #10 by C5. |
| F11 | Interleaving different problem kinds beat blocking, 72% vs 38%, d=1.05, grade 7, n=140 | Rohrer, Dedrick & Burgess (2014), *Psychonomic Bulletin & Review* 21:1323–1330, DOI 10.3758/s13423-014-0588-3 | Yes — full PDF pulled from Springer, text-extracted | ✅ | ✅ | ✅ | **VERIFIED** | Abstract, p.1323 — verbatim, including "(72 % vs. 38 %, d = 1.05)" and the "superficially dissimilar" and "strengthening the association between each kind of problem and its corresponding strategy" clauses; Results p.1327: "size was large, d = 1.05, 95 % CI = [0.80, 1.30]" | Q2 — confirmed | Design is a **counterbalanced crossover** (p.1325); collector's "randomized, counterbalanced classroom experiment" is fair. Volume/pages (21:1323–1330) supplied here — dossier gave DOI only. |

## Resolution log (every citation that was UNVERIFIED at any point)

UNVERIFIED is transient. Every row here MUST end terminal — VERIFIED or UNVERIFIABLE or dropped.

| # | Which point failed (exists / supports / strength) | Move taken (re-check · downgrade · drop) | Terminal state | Note |
|---|---|---|---|---|
| F3 | **supports** (partial) — the headline attributes "small-group human instruction (g=.10, n.s.)" to Table 1's random-effects model | **downgrade** — corrected the number and its location, then re-verified the weakened claim | **VERIFIED** | Table 1 has **two** effect-size blocks side by side. Random-effects: large-group .44*, small-group **.05**, individual human −.11, CBI .57*, textbook .36*. Fixed-effect: .37*, **.10**, −.11, .47*, .30*. The collector read **.10 out of the fixed-effect column** and reported it as the random-effects value. Consequence: the dossier's "candidate conflict #2" (abstract vs. Table 1 rounding inconsistency) is **overstated** — the abstract's .05 for small-group **agrees exactly** with Table 1 random-effects. A smaller genuine discrepancy does remain (abstract .42/.35 vs. Table 1 random-effects .44/.36). The substantive claim — no significant ITS advantage over small-group instruction — holds in **both** columns and is unaffected. |
| F4 | **strength** — "three-stage account" attributed to Anderson | **downgrade** to what the source states, then re-verified | **VERIFIED** | Anderson's abstract: "two major stages." Knowledge compilation is the transition *process*, not a third stage. The three-stage model is Fitts (1964), discussed on p.369 as a comparison. The dossier's own quote (correctly transcribed) already contradicts its headline. |
| F5 | **strength** — headline calls the power law "ACT theory's **own headline behavioral signature**"; the cited sentence says close to the opposite | **re-check** by obtaining the primary directly, then **downgrade** the framing | **VERIFIED** (framing downgraded) | The collector's access account was honest — the elided quote really does appear in Heathcote et al. exactly as recorded (the ellipsis is Heathcote's, not the collector's). But the primary was reachable, and reading p.397 directly shows the elision removes a clause that inverts the framing. Anderson does later assert "The ACT theory predicts that a power law…", so the claim is partly rescuable — but not from the sentence cited. |
| F10 | **(access claim, not one of the three points)** — collector recorded the primary as not-directly-read and asked the verifier to prioritise it | **re-check** — downloaded the primary at the collector's own URL | **VERIFIED, access-downgrade removed** | Collector was appropriately honest about not having read it; the honesty is correct, the pessimism was unnecessary. |
| F8 | **(collector-flagged uncertainty, not a failed point)** | **re-check** — retrieved the full abstract and the results statement | **VERIFIED, uncertainty resolved** | Exponential family *was* compared; piecewise exponentials performed slightly worse than PPLs. |

## Kills (citations dropped — the claim lost this support)

**None.** Every one of the 11 citations resolved to a real, independently located source that states the
claimed thing. Three required strength or location corrections (F3, F4, F5); none required dropping.

I want to be explicit that this is a genuine result and not a rubber stamp, because a zero-kill Part 1
is exactly the pattern the shared brief warns about. The reason it is honest here is that this
collector's *access discipline* was unusually good: it flagged F1, F2, F5, F6, F8 and F10 as
partial-access at collection time rather than implying full reads, so there was little room for the
usual failure mode (a confident quote from a source never opened). I re-derived every quote from
locally extracted text and found no fabrication, no drifted attribution, and no invented number.

**The failure in this dossier is not in Part 1. It is in Part 2, and it is substantial.**

## Quarantine (UNVERIFIABLE — could not be reached at all)

**None.** No citation was unreachable.

However, one **access claim is confirmed**: VanLehn (2011)'s peer-reviewed full text is genuinely not
openly reachable. I independently tried Taylor & Francis (`403`), VanLehn's ASU faculty page, a
Semantic Scholar PDF mirror (`202`, empty), and a Google Sites mirror — all failed to return a PDF, and
a targeted search for an open mirror surfaced none. **The collector's disclosure is accurate.** Logged
to the source-lead register as a paywall lead (row 3), not as UNVERIFIABLE, because F1 is adequately
supported by two independently-read routes.

What F1 **can** support: the qualitative interaction-plateau finding and the four vs.-no-tutoring
effect sizes, both now confirmed first-party from the author's own slide table and corroborated
independently by Ma et al. What it **cannot** support: anything resting on the peer-reviewed paper's
methods, inclusion criteria, moderator analyses, or confidence intervals — none of which any read
route exposes.

## Conflicts surfaced during verification

1. **ITS effect sizes shrink toward null in independent K-12 and at-scale evaluations** — a whole
   opposing body of evidence the dossier does not contain. → appended to `registers/conflict-register.md` as **#11**.
2. **Anderson's own framing of the power law is a "surface contradiction" to ACT, not ACT's signature** —
   this corrects the evidentiary basis of the already-registered Conflict #6, whose "affected project
   areas" cell is built on the same elided quote. → appended as **#12**.
3. **Ma et al. abstract vs. Table 1** — the collector asked the verifier to adjudicate this. **Adjudicated,
   not registered:** it is substantially a column-reading error, not a source conflict (resolution log,
   F3). The residual real discrepancy (.42/.35 vs .44/.36) is ordinary online-first-vs-final rounding
   and is not worth a register row.

## Dossier sufficiency (SECOND AXIS — judged independently of citation states)

**Verdict: INSUFFICIENT**

Coverage assessed against: major evidence traditions · landmark sources · opposing positions ·
every required sub-question in the card's scope.

- **Traditions/landmarks/positions present:** ITS meta-analysis (Kulik & Fletcher; Ma et al.),
  VanLehn's interaction-granularity synthesis, Anderson's original ACT skill-acquisition theory,
  the power-law/exponential/piecewise-power-law curve dispute (Newell & Rosenbloom; Heathcote et al.;
  Donner & Hardy), and the practice-scheduling cluster (Pavlik & Anderson; Cepeda et al.; Rohrer et al.).
  This is a real and well-chosen spine. Q3 in particular is covered properly, with all three positions
  represented and the dispute correctly left open.
- **Required sub-questions answered: 4 of 4 touched, but 3 of 4 materially incomplete** (Q1, Q2, Q4 — see below).
- **Searches run to test for what is NOT there** (I cannot judge an omission from inside the dossier):
  1. `Steenbergen-Hu Cooper meta-analysis intelligent tutoring systems K-12 students effect size 2013 mathematics learning`
  2. `Pane Griffin McCaffrey Karam effectiveness Cognitive Tutor Algebra I large scale randomized field trial results`
  3. `Evans Brown Mewhort Heathcote "refining the law of practice" 2018 power exponential individual learning curves`
  4. `ACT-R production compilation empirical test declarative to procedural transition Taatgen Lee 2003 knowledge compilation evidence`
  5. `VanLehn 2011 … effect size 0.76 step-based 0.40 substep pdf full text` and `"EffectivenessOfTutoring" VanLehn … filetype:pdf interaction plateau` (access-claim tests)

  Searches 1–4 each returned a landmark the dossier never touches. That is a **75% hit rate on
  first-try searches aimed at the gaps** — the diagnostic signal for insufficiency.

### If INSUFFICIENT (all three required)

**1. What important evidence appears missing**

- **(Q1) The "effects shrink under independent evaluation and at scale" tradition — entirely absent.**
  - Steenbergen-Hu & Cooper (2013), *J. Educational Psychology* 105(4), 970–987 — meta-analysis of ITS
    on K-12 mathematics, 26 reports / 34 independent samples: average effect sizes **g = 0.01 to 0.09**,
    and **g = −0.18 for low-achieving students**.
  - Pane, Griffin, McCaffrey & Karam (2014), *Educational Evaluation and Policy Analysis* — large
    multi-state cluster-randomised trial of Cognitive Tutor Algebra I: **no effect in year 1**;
    **+0.21 SD in year 2, high schools only**, not significant for middle schools.
  - Aggravating factor: **Ma et al. (2014) — which the collector read in full — cites Steenbergen-Hu &
    Cooper repeatedly** (extracted lines 234, 420, 954). The lead was in hand and was not followed.
- **(Q2) ACT-R itself is missing; the dossier cites only ACT (1982), a decade before ACT-R.** The card
  names ACT-R. Absent: Taatgen & Lee (2003), "Production Compilation: A Simple Mechanism to Model
  Complex Skill Acquisition," *Human Factors* 45(1), 61–76 — the modern production-compilation
  mechanism, with a model fitted to an air-traffic-control learning task; and Anderson, Bothell, Byrne,
  Douglass, Lebiere & Qin (2004), "An Integrated Theory of the Mind," *Psychological Review* 111(4).
  **This one is not a protected honest gap.** The dossier's third coverage gap asserts that
  "a dedicated empirical validation of the transition timing itself was not located in this pass."
  That is an assertion of *absence in the literature*, and it is wrong — the production-compilation
  modelling literature is directly on point and surfaced on a single search.
- **(Q3) Evans, Brown, Mewhort & Heathcote (2018), "Refining the law of practice," *Psychological
  Review* 125(4), 592–605** — by the F7 authors, proposing a function with power and exponential as
  limiting cases that also fits the full RT distribution. The dossier freezes the dispute at 2015.
- **(Q4) The retrieval-practice / testing-effect tradition is absent.** The dossier covers spacing and
  interleaving but not testing effect (Roediger & Karpicke) or desirable difficulties (Bjork) — the
  tradition most directly describing what a blackjack drill *is*, mechanically.

**2. Why the omission could materially affect the findings**

The Q1 omission is the serious one and it is directional, not decorative. The dossier's ITS-effectiveness
picture is built from 0.66 (Kulik & Fletcher), 0.41 overall (Ma), and 0.76 (VanLehn step-based). Every
omitted source points the same way and it is **down**: near-null in K-12 mathematics, negative for low
achievers, and null-then-small in the largest independent field RCT of the flagship ACT-R-derived tutor.
A synthesis drawing on this dossier as it stands would conclude "ITS reliably produce moderate-to-large
learning gains." With Steenbergen-Hu & Cooper and Pane et al. included, the defensible conclusion is
materially weaker and more conditional: **effects are moderate in the aggregate meta-analytic literature
but attenuate sharply in independent, at-scale, real-classroom evaluations** — which is precisely the
regime a shipped consumer product occupies. This is the same "comparator changes everything" lesson the
dossier already draws from F3, extended along an axis it never examined: *who ran the evaluation, and at
what scale*. That is exactly the failure mode the card's sub-question 1 exists to prevent.

The Q2 omission matters differently: the card asks about **ACT-R**, and the dossier answers about **ACT**.
Knowledge compilation as described in 1982 was substantially reworked into production compilation in
ACT-R. Any product decision resting on "ACT-R says declarative knowledge proceduralises with practice"
is currently sourced to a superseded formulation, and the dossier wrongly reports the empirical
literature on that mechanism as non-existent.

Q3 and Q4 are lower-stakes — Q3's three-way framing is not *wrong*, only dated, and Q4's omission does
not contradict anything present.

**3. Exact scope of the one focused collection pass**

Bounded targeted re-collection, **6 citations maximum, no re-run of the card**:

- **Priority A (required, 3–4 citations) — Q1 "effects at scale":** Steenbergen-Hu & Cooper (2013),
  K-12 mathematics ITS meta-analysis — extract headline effect sizes, the low-achiever subgroup, and
  the comparator mix. Pane et al. (2014), CTAI at scale — extract design, year-1 and year-2 effects,
  and the school-level split. If reachable, one What Works Clearinghouse Cognitive Tutor intervention
  report as an independent-adjudication data point. Record against the dossier's existing F1–F3 as a
  **conflict**, not a replacement.
- **Priority B (required, 2 citations) — Q2 "ACT-R proper":** Taatgen & Lee (2003) production
  compilation, and Anderson et al. (2004) integrated theory. Explicitly **retract or correct the
  dossier's third coverage gap** in light of what is found.
- **Priority C (optional, 1 citation, only if budget remains) — Q3 currency:** Evans et al. (2018),
  *Psychological Review* 125(4), 592–605, to date-stamp the curve-shape dispute.

The Q4 retrieval-practice gap is **explicitly out of scope** for this pass — it is adjacent, and C3
(deliberate practice) and C5 (spaced repetition) plausibly already cover that ground. Check those two
dossiers before spending any budget on it.

## Notes on specific corrections

**Strength downgrades applied**

- **F5 — material.** Collector's headline: "ACT theory's own headline behavioral signature for practice
  is the power-law speedup." The full sentence at Anderson (1982) p.397, read directly, is:
  > "One aspect of skill acquisition is distinguished both by its ubiquity **and by its surface
  > contradiction to ACT's multiple stage, multiple mechanism view of skill development**. This is the
  > log-linear or power law for practice."

  The collector's ellipsed version removes the bolded clause. Anderson is introducing the power law as
  a **problem his theory must explain away**, under the section heading "Procedural Learning: The Power
  Law" — not as ACT's proud signature. Anderson does subsequently assert "The ACT theory predicts that
  a power law…" (p.398), so a weaker claim survives: *ACT was constructed to reproduce the power law it
  treats as a surface challenge*. Downgrade to that. The ellipsis originates in Heathcote et al., so
  this is inherited rather than manufactured — but it was inherited **because the primary was never
  opened, and the primary opens fine**.
- **F4 — moderate.** "Three-stage account" → Anderson's own "two major stages" plus a compilation
  transition. Three stages is Fitts (1964).
- **F3 — moderate, numeric.** Small-group g = **.05** (random-effects), not .10 (that is the
  fixed-effect column). Collector's "candidate conflict #2" correspondingly overstated.
- **F7 — minor.** "All datasets surveyed are response-time paradigms" — a footnoted games-won/lost
  analysis is also present. Thrust of the caveat holds.
- **F1 — tier.** Q4 → **Q5** (author's own conference slides are first-party self-report per the
  rubric), corroborated by a Q1 secondary. Q4 was the wrong box for this access route.

**Upgrades (collector was more pessimistic than the evidence warranted)**

- **F1 numerics.** The collector recorded d=0.79 / 0.76 / 0.40 as "probable-but-not-independently-
  confirmed," attributing them to uncorroborated web search. They are in fact **printed in the author's
  own slide 37 table**, explicitly captioned "Meta-analytic results for all possible pairwise
  comparisons (VanLehn, 2011)," with effect counts (165 / 28 / 26 / 10). That is first-party
  attribution to the 2011 analysis. The hedge can be substantially relaxed.
- **F10 access.** Collector recorded the Cepeda PDF as not fetched "given citation-budget and time."
  It downloads on a first attempt from the URL the collector itself recorded, and both claimed
  quantities are verbatim in the abstract. Access-downgrade removed; **Q1 stands undiminished.**
- **F8 uncertainty.** Resolved — exponentials were compared.

**Supporting locations that differ from the collector's proposal**

- **F5** — collector proposed Heathcote et al. (2000) p.3. My location is **Anderson (1982) p.397 itself**,
  section "Procedural Learning: The Power Law," read directly in the primary. This is the difference
  that exposed the elision.
- **F3** — collector proposed Table 1 for a value that lives in Table 1's *other* column. Corrected above.
- **F1** — collector proposed slides 14–21 generally. The load-bearing location is **slide 37** (the
  meta-analytic table) and **slide 41** ("The interaction plateau hypothesis"), which are more specific
  and stronger than what was proposed.
- **F7/F6** — the PDF at the recorded URL is the **"In Press" manuscript**, so all page references are
  manuscript pages, not journal pp.185–207. The collector's "p.3 / pp.3–4" refs are right for the
  manuscript and would be wrong for the published article.

## Verifier summary
- VERIFIED: **11**  |  UNVERIFIABLE: **0**  |  DROPPED: **0**
- **UNVERIFIED remaining: 0**
- **Dossier sufficiency: INSUFFICIENT**
- Claims the collector overstated (strength downgraded): **F5** (material — framing inverted by an
  inherited ellipsis), **F4** (three-stage vs. two-stage), **F3** (small-group g=.05 not .10, wrong
  Table 1 column), **F7** (minor caveat overstatement). Tier corrected on **F1** (Q4 → Q5).
- Claims the collector *understated* (upgraded): **F1** numerics (first-party confirmed),
  **F10** access (primary read; Q1 undiminished), **F8** flagged uncertainty (resolved).
