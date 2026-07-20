# Sufficiency Review: C1 — Knowledge Tracing (BKT, DKT, PFA)

> Reviewer: Claude (Opus 4.8) — DIFFERENT instance from both the collector (Sonnet 5) and the
> verifier V1 (Opus 4.8, separate instance)  |  Date: 2026-07-19
> Axis: **coverage only.** Citations are not re-checked; V1's 13/13 VERIFIED pass stands untouched.
> Standard: sufficiently researched only when *additional searching is unlikely to materially change
> the dossier's conclusions.* Formal completeness is not substantive completeness.

## Verdict

**INSUFFICIENT.**

This is not a verdict against the collector's honesty. The dossier is careful, its quotes are clean
(V1 confirmed that independently), and it names three real coverage gaps — which is evidence of
diligence, not of insufficiency, and I have not counted any of the three against it. The problem is
different: **the dossier searched the knowledge-tracing literature and stopped at its edges.** Four
bodies of evidence that bear directly on this card — two of them on the single load-bearing
sub-question — were never reached, and at least one of them is one author-hop from a paper the
dossier already cites. Two of them push the load-bearing conclusion in *opposite* directions, which
is precisely why their joint absence is material rather than cosmetic.

## Searches I ran to test for absence

Sufficiency cannot be judged from inside the dossier. Six independent searches, each aimed at
something the dossier does **not** contain:

1. `"How deep is knowledge tracing" Khajah Lindsey Mozer BKT extensions match DKT` — testing for a
   DKT-skeptical / shallow-baseline tradition beyond the one comparison cited.
2. `Wilson "Back to the basics" Bayesian IRT outperform neural networks proficiency estimation` —
   testing for an IRT-beats-DKT counter-result.
3. `Beck Chang "Identifiability: a fundamental problem of student modeling" BKT parameter degenerate`
   — testing for a literature on whether BKT's parameters are even recoverable.
4. `cold start item difficulty estimation without population expert-set parameters adaptive learning
   knowledge tracing` — testing directly against V1's C6, the precise unevidenced step.
5. `SlimStampen adaptive fact learning individual rate of forgetting single learner ... no population
   fitting` — testing the dossier's headline claim that *every* source requires a population.
6. `item response theory sample size requirements calibration Rasch 1PL minimum examinees` +
   `Pelánek 2017 "Bayesian knowledge tracing, logistic models, and beyond"` — testing whether IRT is
   reached on its own terms, and for the field's standard overview.

All six returned substantial, directly-on-topic literature that the dossier does not cite.

## What is missing, and why it moves a conclusion

### M1. The DKT-skeptical / shallow-baseline tradition — an opposing position with only one side represented

The dossier's sole critical check on DKT is Gervet et al. (2020) (F4), logged as a conflict of
*degree* ("large-and-general vs. narrow-and-conditional"). A whole 2016 EDM cohort argued something
stronger — that DKT's advantage largely **dissolves** against properly-specified simpler models:

- Khajah, Lindsey & Mozer (2016), *How Deep is Knowledge Tracing?*, EDM — arXiv:1604.02416. BKT
  extended with forgetting, student ability, and skill discovery closes most of the gap; the authors
  conclude knowledge tracing "may be a domain that does not require depth."
- Wilson, Karklin, Han & Ekanadham (2016), *Back to the Basics: Bayesian extensions of IRT outperform
  neural networks for proficiency estimation*, EDM — arXiv:1604.02336. IRT-based methods **matched or
  outperformed DKT on all datasets tested** at tractable content granularity.
- Xiong et al. (2016), *Going Deeper with Deep Knowledge Tracing*, EDM — re-examines the Assistments
  numbers underlying F5's headline.

**Why this is material, and not merely more of the same.** Wilson et al. shares two authors —
Karklin and Ekanadham — with the T-SKIRT paper the dossier *does* cite as F9. The collector reached
these authors' framing statement and did not reach their empirical result, which is a coverage
failure, not a budget choice. And the direction matters for the product: the dossier currently treats
BKT as "dominated" (F4, F5, F6) and DKT as the strong-but-data-hungry option. If a well-specified
shallow model matches DKT, the dossier's implicit ordering of candidates changes, and the case for
the *simplest* model in a low-data setting strengthens considerably. This is exactly the reading a
solo-trainer product needs.

### M2. The cold-start literature — an entire research community, sitting on the one unevidenced step

V1's Correction C6 isolated the load-bearing question to a single link: **obtaining item difficulties
without a population.** V1 was right, and that makes an omission here maximally material. There is a
live, named, multi-year literature on exactly this, none of which the dossier reaches:

- *An explanatory item response theory method for alleviating the cold-start problem in adaptive
  learning environments*, Behavior Research Methods (2019) — predicts item parameters from item
  *features* rather than from response populations.
- *Alleviating the Cold Start Problem in Adaptive Learning using Data-Driven Difficulty Estimates*,
  Computational Brain & Behavior (2021).
- *Large-scale evaluation of cold-start mitigation in adaptive fact learning: Knowing "what" matters
  more than knowing "who"*, UMUAI (2024) — the title alone states a finding directly on this card:
  item-side priors outweigh learner-side priors.
- *Evolutionary Features for Mitigating Cold Starts in Logistic Knowledge Tracing*, EDM (2025) —
  logistic-family (PFA-family) models specifically.
- LLM-as-item-difficulty-rater work (2025–2026), estimating difficulty with no response data at all.

**Which conclusion moves, and in which direction.** The dossier's sufficiency statement proposes
"using literature-typical or expert-set default parameters instead of population-fit ones" and then
labels that path a **Product judgement / Assumption** because no evidence supports it. That labelling
may be wrong. There is a body of evidence on setting item parameters without a response population,
and V1 already found one measured result (Pelánek §3.1: ~10 responses suffice for per-learner skill
once difficulties are fixed) pointing the same way. Together these could move the product path from
Assumption to **Evidence-backed** — a change in the classification of the single decision this card
exists to inform.

### M3. Single-learner adaptive practice — a direct counterexample to the dossier's headline claim

The dossier states flatly: "**every single source found** ... calibrates its parameters from a
population of many learners," and nominates Duolingo HLR (F10) as "the closest real-world analogue"
to this product — while conceding HLR is out of scope.

There is a closer analogue, and it is a counterexample. The ACT-R-based adaptive fact-learning
tradition (SlimStampen / MemoryLab; van Rijn et al. 2009, Sense et al. 2016) fits a **per-learner,
per-item rate of forgetting online from that learner's own responses**, is a deployed system, and has
peer-reviewed evidence that an individual's forgetting rate is a stable individual trait. It is
nearer to "one learner, fixed item bank, self-directed adaptive practice" than Duolingo HLR on every
axis, and it is a population-free estimator.

**Which conclusion moves.** The headline "every single source" claim is a universal generalization
drawn from a search that did not cover the family most likely to falsify it. F10 was selected as the
nearest analogue *by the same search*, so the choice of analogue is suspect too. This does not
overturn PARTIAL, but it weakens the strongest sentence in the sufficiency statement.

### M4. IRT is never reached on its own terms — so Q3 is answered by anecdote

Every IRT characterization in this dossier is **secondary**: F8 is Pelánek (an Elo paper) describing
IRT; F9 is a two-sentence background framing in a T-SKIRT introduction that V1 itself called "the
weakest Q4 in this set." No primary psychometrics source appears — not Rasch (1960), not Lord (1980),
not Embretson & Reise or Baker & Kim, and none of the sample-size/calibration literature.

That literature answers Q3 quantitatively where the dossier answers it anecdotally. It reports that
1PL/Rasch difficulty parameters stabilize around **~150–200 examinees**, and around **~100 with
Bayesian priors incorporated** — bracketing Pelánek's "at least 100 students," which V1 downgraded to
Q4 expert judgement precisely because nothing measured backs it. A measured psychometric bound would
restore evidential footing to the number the whole Q4 argument rests on.

Also absent as landmarks a domain expert would expect on this exact card:

- **Pelánek (2017), *Bayesian knowledge tracing, logistic models, and beyond: an overview of learner
  modeling techniques*, UMUAI 27:313–350** — the standard overview of precisely this card's topic.
  Note: the dossier's sufficiency statement cites "Pelánek 2017" but means the 2016 *Computers &
  Education* Elo paper. The actual 2017 overview is absent, and the miscitation suggests the two may
  have been conflated.
- **Cen, Koedinger & Junker (2006), Learning Factors Analysis** — PFA's direct parent, named in the
  quote the dossier itself reproduces in F2 ("LFA's standard form").
- **Beck & Chang (2007), *Identifiability: A Fundamental Problem of Student Modeling*** — BKT admits
  families of parameter sets that predict identically but assert different things about mastery. With
  **one** learner and no population to regularize the fit, this problem is at its *worst* in exactly
  this product's configuration. It cuts **against** feasibility, and its absence is why M2's
  pro-feasibility evidence must not be collected alone.
- Yudelson, Koedinger & Gordon (2013) individualized BKT; Pardos & Heffernan on p(L₀)
  individualization and EM initialization — the literature on per-student parameters, i.e. the
  closest thing in the BKT family to a solo-learner story.

## The bounded fix — ONE focused collection pass

Scope: **8–12 citations, three bundles, no re-collection of anything already in the dossier.** Do not
re-open Q1; F1–F3 answer it. Target Q2, Q3, and Q4 only.

- **Bundle A — DKT skepticism / shallow baselines (2–3 citations).** Khajah, Lindsey & Mozer (2016);
  Wilson, Karklin, Han & Ekanadham (2016); optionally Xiong et al. (2016). Question: does DKT's
  advantage survive a well-specified simpler model?
- **Bundle B — cold start and population-free parameters (3–4 citations), highest priority.** The
  explanatory-IRT cold-start method (BRM 2019), the UMUAI 2024 cold-start-mitigation evaluation, and
  one of the data-driven-difficulty or logistic-KT cold-start papers. Question: can item difficulty
  be set from item features / expert priors / defaults instead of a response population, and how much
  accuracy is lost? **Must be paired with** Beck & Chang (2007) on identifiability, so the pass
  collects the evidence cutting against solo-learner feasibility alongside the evidence for it.
- **Bundle C — IRT and landmarks on their own terms (3–4 citations).** One primary IRT source
  (Rasch/Lord or a standard text), one IRT sample-size/calibration study giving a measured floor, and
  **Pelánek (2017) UMUAI overview**. Optionally Cen/Koedinger/Junker (2006) LFA and
  Yudelson et al. (2013). Question: what does the discipline that actually studies calibration say
  the data requirement is, and does a landmark overview change the model ordering?

Expected effect on the card: Q3 gains a measured data-requirement floor rather than a rule of thumb;
Q4's proposed product path is re-classified on evidence rather than assumed; the model ordering in Q2
is re-tested against the strongest opposing result. PARTIAL may well survive — but it would then be a
verdict the searching supports, rather than one the searching stopped short of testing.

## What I did NOT count against the dossier

- Its three named coverage gaps (solo-learner deployment; no strategy/card-game domain; no
  independent replication of Corbett & Anderson). Naming a gap is diligence.
- Its citation budget. 9 of 6–12 is within budget — but budget headroom makes M1–M4 harder to excuse,
  not easier, since nothing was dropped for space (the dossier's own "Overflow leads: None").
- Anything in V1's verification record. That pass is complete and correct as far as I can tell, and
  its Correction C6 is what let me locate the precise seam where M2 matters most.
