# Dossier: Knowledge Tracing — BKT, DKT, PFA (C1)

> Status: RAW COLLECTION — DATA ONLY, not authority (Inbox Rule 0). UNTRUSTED until verified.
> Collector: Claude (Sonnet 5)  |  Date: 2026-07-19
> Leads consumed (untrusted): none — collected fresh
> Citations collected: 21 total — 9 original (budget 6–12, hard cap 15) + 12 added by focused pass
> C1-FP (2026-07-19), within its 8–12 top-up budget across three bundles (see
> "Findings added by focused pass (C1-FP, 2026-07-19)" below)
>
> **Remediation pass C1-R2 (2026-07-20)** added 5 further citations (F22–F26) plus one
> re-read finding drawn from a source already held (F27, no new source). Running total:
> `SUPERSEDED` ~~**26 citations** — 9 original + 12 (C1-FP) + 5 (C1-R2)~~ — **stale as of C1-W;
> reconciled below.** See "Findings added by remediation
> pass (C1-R2)" below. Nothing above that section was altered, deleted, or rewritten by C1-R2;
> the block immediately below is an **insertion**, made to satisfy this card's standing
> head-statement obligation, and removes no existing content.
>
> **EDITORIAL CORRECTION PASS (C1-EC, 2026-07-20).** A separate editorial corrector, acting on the
> independent verification record
> `journal/raw/_inbox/foundation-audit-p1/verification/V1d-knowledge-tracing-remediated.md`, has
> corrected this dossier **in place**. Append-only was lifted for that pass; superseded text is marked
> `SUPERSEDED`/`STRUCK` rather than deleted, and **no finding ID was removed or renumbered**.
> **No new sources were collected.** Corrections made: HEAD STATEMENT ¶3 and the Sufficiency
> Statement's universal sentence (an **overstatement running in this dossier's own favour**, now
> narrowed); F22 (measured figures recovered from the PDF body the collector could not extract, plus
> the body's counterweights, plus one silent truncation repaired); F23 (population chain lengthened —
> an **upgrade**); F24 (spliced quote repaired, commercial COI recorded, omitted null recorded);
> F25 (body marked UNVERIFIABLE); a new **source-independence disclosure**; and two coverage gaps
> recorded as **settled — do not re-run**. Each correction is labelled at its site. C1-EC is a
> corrector, not a verifier: nothing it changed is self-verified.
>
> **HEAD-COUNT RECONCILIATION (C1-ED2, 2026-07-20).** The "26 citations" figure above went stale when
> C1-W appended F28–F29 under append-only — the correct cost of that discipline, not a defect by the
> collecting pass. Reconciled by counting the dossier's own `Source(s):` / `Source:` lines, not by
> trusting any prior report. **Current total: 27 distinct sources cited**, of which **1 (F29) is
> partial-access — abstract verified, body UNVERIFIABLE.** Split kept separable per amendment 5:
> **initial collection 8** (F1–F10; F5 and F6 re-cite sources already counted at F3 and F2) **+ C1-FP
> 12** (F11–F21; F21 cites two) **+ C1-R2 5** (F22–F26; F27 adds no new source) **+ C1-W 2** (F28 full,
> F29 partial). **Note, recorded not charged:** the legacy "9 original" figure is one higher than the
> 8 distinct sources actually cited by F1–F10, which is why the running total read 26 rather than 25
> before this top-up. The prior passes' own declared figures are left as they recorded them; only the
> total is reconciled here. **29 finding IDs, 27 sources** — the two numbers differ legitimately
> (F5, F6, F27 re-use sources already counted; F21 cites two).

## HEAD STATEMENT — does the evidence settle the mastery-model choice? (added by C1-R2, 2026-07-20)

**No. It does not settle it, and this pass did not make it settle.** State that plainly to any reader.

What C1-R2 changed is narrower and worth having anyway:

1. **The "zero-population item difficulty" step now has evidence on both sides, where before it had
   none on the feasibility side.** Two 2026 response-free difficulty-estimation papers exist and were
   read (F22, F23), and F23's method still requires a *training set of response-calibrated items* to
   learn from, so it moves the population requirement rather than removing it. Neither has been shown
   to work at this product's bank shape.
   > `SUPERSEDED` — C1-R2 wrote here that "both are **abstract-scope only** for this collector."
   > **C1-EC (2026-07-20):** no longer true. V1d obtained **both** bodies. F22's measured figures are
   > now in the dossier (see F22) and they are **mixed-to-modest, not favourable**: Spearman **.633–.673**
   > aggregate, **.732** at the best configuration, ranging **.252** (text problems) to **.847**
   > (subtraction) — and the paper's own body places this **below pooled human judgement (.70)** and
   > **below an existing automated method (.76)**, on a **relative scale only**. The feasibility side of
   > this "both sides" framing is therefore weaker than C1-R2 believed when it wrote the sentence.
2. **There is now a measured cost for running with no data at all.** van der Velde et al. (2021)
   (F24) ran a randomized comparison in which one arm — the `Default` condition — used a fixed
   parameter value and no predictions whatsoever. That arm performed measurably worse. This is the
   closest thing in the dossier to a direct measurement of the product's proposed fallback path,
   and it is **unfavourable**, though modest in size and from a fact-learning domain.
   > **C1-EC correction — this is stated one-sidedly and must be read with two additions (see F24).**
   > (a) **The measured cost is confined to in-session accuracy.** In Experiment 1 there was **no
   > difference between conditions on the delayed recall test** — the retention outcome that actually
   > matters for a training product — with strong evidence favouring the intercept-only **null** model.
   > (b) **F24 carries a disclosed commercial conflict of interest**: the system it evaluates is
   > licensed to Noordhoff Publishers by the University of Groningen and "this project was partially
   > funded by these license fees." F24 must **not** be counted as independent corroboration of that
   > system. The direction ("unfavourable") remains defensible; its size and durability are smaller
   > than the paragraph implies.
3. `STRUCK — OVERSTATED. Replaced by 3′ below.` ~~"The universal claim in the original Sufficiency
   Statement — 'every single source found … calibrates its parameters from a population of many
   learners' — is now falsified as written."~~
   > **C1-EC (2026-07-20), on V1d's RULING: the claim is NOT falsified. C1-R2 overstated it, and this
   > correction runs *against* this dossier's own headline.** Two independent grounds:
   > (a) **Scope.** The original sentence enumerates its own scope — "across BKT, PFA, DKT, IRT, and
   > education-Elo." The SlimStampen estimator is an **ACT-R declarative-memory rate of forgetting**, a
   > **sixth family outside that enumeration**. On the sentence's literal terms, F25/F26 do not
   > contradict it.
   > (b) **Decisively: the 0.3 default is population-derived by the source's own admission.** F24's
   > Methods, verbatim: "We selected a weakly informative prior, with μ₀ = 0.3, κ₀ = 1, α₀ = 3, and
   > β₀ = 0.2. This particular prior was chosen because it reflects our assumption that the rate of
   > forgetting is normally distributed around 0.3, **which previous studies have shown to be a
   > reasonable average across materials and learners** (e.g. van Rijn et al., 2009, Sense et al.,
   > 2016)." The 0.3 is an **empirically established population average**, cited to prior population
   > studies — not an arbitrary constant.

3′. **(REPLACEMENT for 3) The estimator is population-*light*, not population-free — and that is
   still a real and useful result.** Every source found calibrates its *fitted* parameters from a
   population of many learners. The one partial exception — the SlimStampen/MemoryLab ACT-R rate of
   forgetting (F25, F26) — fits a **per-learner, per-item** parameter online from that learner's own
   accuracy and latency **with no population fit of that parameter and no per-item difficulty
   calibration**, but it still starts from a **population-derived default of 0.3**, which its own
   authors justify as an average "across materials and learners" established by prior studies.
   **What C1-R2 genuinely established, and gets credit for:** the population requirement can shrink
   from *tens of thousands of learners* to **a single published constant**. That is a substantial,
   product-relevant weakening of the universal framing. What it does not do is eliminate the
   requirement — **no source found eliminates it.**
4. **The strongest and most usable result in this whole pass came from a source the dossier already
   held and had only read the abstract of** (Pelánek 2017 UMUAI, cited as F19). Read in full, it
   documents an entire model family — moving-average / exponential-moving-average baselines —
   classified as operating **"without assumptions"** and requiring no population-fitted parameters,
   and it states that basic BKT does not use item difficulty at all. See F27. This is the program's
   dominant defect recurring: the answer was already on the shelf.

**What still does not exist in this dossier:** any evaluation of any of these methods on a small,
fixed, expert-authored item bank; any strategy-game or card-game domain evidence; ~~and any full-text
reading of F22 or F23~~ `STRUCK — C1-EC: V1d read both bodies in full; see F22 and F23. What remains
unread is F25's body, which is UNVERIFIABLE (blocked at three routes).` The two remaining gaps above
are now recorded as **settled COVERAGE GAPs — do not re-run** (see "Coverage gaps — settled").
The mastery-model choice remains a **Product judgement** informed by evidence,
not an Evidence-backed decision. A defensible product path (start from expert-set or default
difficulties, use a simple assumption-free baseline, and let per-learner parameters adapt online from
the single learner's own responses) is now **supported by analogy and by one measured cost figure** —
it is not validated for this product.

## Scope & questions this card must answer
- Q1. What does each model (BKT, DKT, PFA) actually estimate, and how do they differ in what they
  claim to measure?
- Q2. What is the evidence for predictive validity of each — on what data, in what domain?
- Q3. What are the data requirements of each — learners, items, interactions before the estimate is
  meaningful?
- Q4 (load-bearing). Does any of them fit a solo trainer against a fixed item bank — one learner, no
  opponent pool, a fixed drill-item set — versus Elo, which needs an opponent pool?

## Sufficiency statement
**PARTIAL.** The evidence collected settles the *structural* half of the question cleanly: independent
sources (Pelánek 2017; Ekanadham & Karklin 2017) agree that classic IRT assumes a **static** ability
and is built around a **fixed, parameterized item bank** (good for short tests / coarse-grained skill),
while Elo is built to **track changing skill** but, as normally deployed in adaptive-practice systems,
does this by treating each **item** as the "opponent" (not another learner) — so the brief's framing of
Elo as strictly needing a peer pool is an oversimplification for the education-Elo variant, though the
underlying chess-Elo intuition it borrows from is peer-vs-peer. BKT and PFA sit structurally closer to
the "track changing skill against a fixed item/skill set" need than either IRT or classic peer-Elo. What
the evidence does **not** settle is the actual load-bearing question: ~~**every single source found —
across BKT, PFA, DKT, IRT, and education-Elo — calibrates its parameters from a population of many
learners**~~ `NARROWED by C1-EC (2026-07-20) per V1d's RULING — see the replacement sentence
immediately below. The original is retained here, marked, because downstream text and the charter
quote it.` (from Pelánek's own stated floor of "at least 100 students" for Elo item-difficulty estimates,
up through Piech et al.'s 47,495 Khan Academy learners and Settles & Meeder's ~1–13 million Duolingo
learners).

> **REPLACEMENT SENTENCE (authoritative; C1-EC, grounded in V1d):** *Every source found calibrates its
> **fitted** parameters from a population of many learners. The one partial exception — the
> SlimStampen/MemoryLab ACT-R rate of forgetting (F25, F26) — fits a per-learner, per-item parameter
> online from that learner's own accuracy and latency with no population fit, but it still starts from
> a **population-derived default of 0.3**, which its own authors justify as an average "across
> materials and learners" established by prior studies (F24, Methods). The population requirement can
> therefore be reduced to **a single published constant**, but **no source found eliminates it**.*
>
> Note on the original's scope: it enumerated "BKT, PFA, DKT, IRT, and education-Elo." The SlimStampen
> estimator is an **ACT-R declarative-memory** model — a sixth family outside that enumeration — so on
> the original sentence's literal terms F25/F26 never contradicted it. The narrowing above is made on
> the stronger ground (the provenance of 0.3), not on that technicality.

No source in this collection reports or evaluates a **true solo-learner, zero-population,
fixed-item-bank deployment** of BKT, PFA, or DKT — the exact configuration this product needs. That
specific configuration is a genuine coverage gap, not a settled question, so the Elo-vs-IRT/KT choice
for a solo trainer cannot be closed on this evidence alone; it should be made on product reasoning
(e.g., using literature-typical or expert-set default parameters instead of population-fit ones) and
labelled a Product judgement / Assumption, not an Evidence-backed decision.

## Overflow leads
None — 9 citations were collected against a 6–12 budget; no lead was dropped for being over-budget.

## Findings

### F1: BKT estimates a binary latent per-skill mastery state via a 2-state Hidden Markov Model (learned/unlearned), updated after each observed response
- Provenance: PUBLISHED
- Access: Abstract + secondary confirmation, both directly read.
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q3 (primary study introducing + empirically validating the model on real tutor data), downgraded from Q4 because the abstract, not the full body, was accessible
- Source(s): Corbett, A.T. & Anderson, J.R. (1994). "Knowledge tracing: Modeling the acquisition of procedural knowledge." *User Modeling and User-Adapted Interaction*, 4, 253–278. DOI: 10.1007/BF01099821 — https://link.springer.com/article/10.1007/BF01099821
- Proposed supporting location: Abstract (full text paywalled; only the abstract was directly retrievable)
- Claimed strength (exact quote): "the tutor also maintains an estimate of the probability that the student has learned each of the rules in the ideal model, in a process called knowledge tracing. The tutor presents an individualized sequence of exercises to the student based on these probability estimates until the student has 'mastered' each rule. ... Currently the model is quite successful in predicting test performance."
- Caveats: Only the abstract was directly opened (Springer full text required auth). The 4-parameter structure (p(L0), p(T), p(G), p(S)) is confirmed independently via two sources I read in full — Abdelrahman, Wang & Nunes (2022), "Knowledge Tracing: A Survey," arXiv:2201.06953, §"Standard BKT Model" ("two types of variables... Binary latent variables which represent the knowledge states... Binary observed variables which represent how students attempt questions"); and Pavlik, Cen & Koedinger (2009), §"2. Performance Factors Analysis compared to Knowledge Tracing" ("KT is based on a 2 state Markov model with 4 parameters... L0, T, G, and S").

### F2: PFA estimates the probability of correctness on the next item directly from observed prior-success/prior-failure counts per skill — no hidden latent state
- Provenance: PUBLISHED
- Access: Directly read, PDF extracted and verified.
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q3 (primary model-introduction study; downgraded from Q2 because it is a retrospective model-fit comparison on logged data, not a randomized experiment)
- Source(s): Pavlik, P.I., Cen, H., & Koedinger, K.R. (2009). "Performance Factors Analysis — A New Alternative to Knowledge Tracing." *Proceedings of the 14th International Conference on Artificial Intelligence in Education* (AIED 2009), Brighton, England. https://files.eric.ed.gov/fulltext/ED506305.pdf
- Proposed supporting location: §"1. Performance Factors Analysis", Equations 1–2
- Claimed strength (exact quote): "LFA's standard form is shown in Equation 1, where m is a logit value representing the accumulated learning for student i ... This model is an elaboration of the Rasch item response model which has an equivalent form to Equation 1 with γ set to 0."
- Caveats: PFA is explicitly framed as an elaboration of the Rasch/IRT logistic form with added practice-count terms, not as a hidden-state model — this is a structural, not incremental, difference from BKT.

### F3: DKT estimates next-interaction correctness from a recurrent (LSTM/RNN) hidden state that is not guaranteed to correspond to an interpretable "mastery" quantity
- Provenance: PUBLISHED
- Access: NeurIPS PDF directly downloaded and extracted.
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q3 (primary study; self-reported benchmark by the model's own authors, no independent replication in this source)
- Source(s): Piech, C., Bassen, J., Huang, J., Ganguli, S., Sahami, M., Guibas, L., & Sohl-Dickstein, J. (2015). "Deep Knowledge Tracing." *Advances in Neural Information Processing Systems* 28 (NeurIPS 2015), 505–513. http://papers.neurips.cc/paper/5654-deep-knowledge-tracing.pdf
- Proposed supporting location: Abstract; §1 Introduction
- Claimed strength (exact quote): "The RNN family of models have important advantages over previous methods in that they do not require the explicit encoding of human domain knowledge, and can capture more complex representations of student knowledge. Using neural networks results in substantial improvements in prediction performance."
- Caveats: The paper's own framing is about *prediction performance*, not about validating the hidden state as a faithful mastery estimate — a distinction later literature (F7 below) flags as under-examined for BKT and, by the same logic, more so for DKT's uninterpretable hidden state.

### F4: Across nine real-world ITS datasets, logistic-regression-family models (PFA-like) win on small/moderate-size datasets or where interactions-per-student are very high; DKT wins on large datasets or where precise temporal information matters most; BKT (Markov-process methods) lags behind both across the board
- Provenance: PUBLISHED
- Access: PDF directly downloaded and extracted.
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q3 (large-scale independent multi-dataset primary comparison; the strongest and most independent single source in this set, but still an original empirical study, not a meta-analysis of others' published results)
- Source(s): Gervet, T., Koedinger, K., Schneider, J., & Mitchell, T. (2020). "When is Deep Learning the Best Approach to Knowledge Tracing?" *Journal of Educational Data Mining*, 12(3), 31–54. https://theophilegervet.github.io/assets/pdf/gervet2020deep.pdf
- Proposed supporting location: Abstract; Table 2 (dataset sizes, 182–29,018 learners); Tables 10–11 (AUC comparison tables); §"3. Datasets" ("the size of a dataset depends not only on the number of learners and total interactions it contains but, most importantly, on the number of learners that attempt each item and KC")
- Claimed strength (exact quote): "Logistic regression – with the right set of features – leads on datasets of moderate size or containing a very large number of interactions per student, whereas Deep Knowledge Tracing leads on datasets of large size or where precise temporal information matters most. Markov process methods, like Bayesian Knowledge Tracing, lag behind other approaches."
- Caveats: Domain is K-12/college math, programming, and one Chinese middle-school math tutor (squirrel) — no game-skill or strategy-domain dataset. "Lags behind" is the paper's own summary verb, not upgraded here.

### F5: DKT's own reported AUC advantage over standard BKT (0.85 vs 0.68 on Khan Academy, n=47,495 learners; 0.86 vs 0.69 best-prior on Assistments, n=15,931 learners)
- Provenance: PUBLISHED
- Access: Directly read from the extracted PDF.
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q3, with an explicit self-report caveat (same authors report both the new method and the baseline comparison; no independent replication within this source — see F4/Candidate conflicts for a partially independent check)
- Source(s): Piech et al. (2015), as above.
- Proposed supporting location: §5 "Datasets" and §6 "Results", Table 1
- Claimed strength (exact quote): "On the Khan dataset using an LSTM neural network model led to an AUC of 0.85 which was a notable improvement over the performance of a standard BKT (AUC = 0.68) ... On the Assistments dataset DKT produced a 25% gain over the previous best reported result (AUC = 0.86 and 0.69 respectively)."
- Caveats: This is the number the field later re-examined (see F4/Gervet 2020 and Candidate conflicts) — the DKT-vs-BKT gap is not stable across datasets/model families.

### F6: On four real intelligent-tutoring-system datasets (physics, geometry, algebra, fractions; ~41,000–101,000 observations each), PFA had better log-likelihood, BIC, r, and A' than knowledge tracing (BKT) in all four
- Provenance: PUBLISHED
- Access: Directly read from extracted PDF.
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q3 (retrospective model-fit comparison on real tutor logs, not a randomized experiment)
- Source(s): Pavlik, Cen & Koedinger (2009), as above.
- Proposed supporting location: §"2.1 Model Comparison Results", Table 3
- Claimed strength (exact quote): "While the differences are not large, the PFA model has better LL, BIC, r and A'."
- Caveats: The authors themselves flag "the differences are not large" — this is a modest, not decisive, advantage, and the paper is written by PFA's own proponents.

### F7: The field predominantly validates BKT against next-answer prediction (RMSE/AUC/accuracy), not against the underlying knowledge-mastery claim itself; only a minority of studies check the mastery estimate against an independent ground truth such as a post-test
- Provenance: PUBLISHED
- Access: Abstract HTML directly retrieved and read in full (full text paywalled beyond the abstract — see Caveats).
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q1 (PRISMA-guided systematic review)
- Source(s): Šarić-Grgić, I., Grubišić, A., & Gašpar, A. (2024). "Twenty-five years of Bayesian knowledge tracing: a systematic review." *User Modeling and User-Adapted Interaction*. DOI: 10.1007/s11257-023-09389-4
- Proposed supporting location: Abstract (full text paywalled beyond the abstract)
- Claimed strength (exact quote): "the study reveals two types of evaluation approaches found in the literature, including the prediction of student answers and the ability to estimate knowledge mastery. ... only a few studies further investigated the systems' estimations of knowledge mastery by correlating it to knowledge on post-tests."
- Caveats: Only the abstract was accessible (paywalled beyond it) — recorded as an abstract-level finding, not a full-text-verified one. This directly bears on Q2: predictive-validity claims for BKT overwhelmingly concern the *next-answer* prediction task, not the *mastery* claim per se.

### F8: IRT assumes constant/static skill (suited to short tests or coarse-grained, slow-moving skills, typically calibrated by maximum likelihood on a sample); Elo is designed to track changing skill via simple per-item/per-student online updates, but the same paper's own simulation shows Elo needs "at least 100 students" to get good item-difficulty estimates; BKT/PFA fit fine-grained learning but "may require calibration on large samples using nontrivial parameter estimation"
- Provenance: PUBLISHED
- Access: PDF directly downloaded, extracted, and read in full.
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q4 for the narrative/structural claims (authoritative synthesis); the "100 students" figure specifically comes from the paper's own simulation experiment, which would independently rate Q2/Q3 — noted as mixed
- Source(s): Pelánek, R. (2016/2017). "Applications of the Elo rating system in adaptive educational systems." *Computers & Education*. DOI: 10.1016/j.compedu.2016.03.017 — https://www.fi.muni.cz/~xpelanek/publications/CAE-elo.pdf
- Proposed supporting location: §1 Introduction ("these models... may require calibration on large samples using nontrivial parameter estimation"); §5.2 "What are the Advantages of the Elo Rating System?" ("Basic item response theory models assume a constant skill. These models are thus applicable only for short tests... or for modeling very 'coarse-grained' skills... We can model fine-grained skill and learning over short term using models like Bayesian Knowledge Tracing or Performance Factor Analysis"); §4/§5.1 ("the system needs at least 100 students to get good estimates of item difficulty")
- Claimed strength (exact quotes, three separate passages): "Basic IRT models assume that a student's skill is constant... whereas the Elo rating system is designed to track changing skill levels." / "these models, however, are not easy to use: they may require calibration on large samples using nontrivial parameter estimation." / "the system needs at least 100 students to get good estimates of item difficulty."
- Caveats: This paper is the strongest single source for sub-question 4, but its "opponent" framing for education-Elo is student-vs-**item**, not student-vs-peer — it does not describe Elo as literally requiring a pool of other learners to play against, contrary to how the brief frames it. It does, however, still require a population of many students' responses to fit item difficulty, so the "no opponent pool" framing in the brief needs this nuance.

### F9: IRT models both student ability and item/content difficulty but not learning over time; BKT models learning over time but does not account for diversity of students or content — each captures a different half of the "single learner + fixed item bank" problem, not both
- Provenance: PUBLISHED
- Access: arXiv PDF directly downloaded, extracted, and read.
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q4 (this specific claim is asserted as established background/consensus framing in the paper's introduction, not as the paper's own novel experimental result — the paper as a whole, introducing the T-SKIRT method, would otherwise rate Q3)
- Source(s): Ekanadham, C. & Karklin, Y. (2017 arXiv posting; originally presented at the ICML 2015 workshop track, Lille, France). "T-SKIRT: Online Estimation of Student Proficiency in an Adaptive Learning System." arXiv:1702.04282 [cs.AI]. https://arxiv.org/abs/1702.04282
- Proposed supporting location: §1 Introduction
- Claimed strength (exact quote): "Bayesian Knowledge Tracing (BKT) is a framework that explicitly models student learning (Corbett & Anderson, 1994) but it accounts for diversity in neither students nor content. On the other hand, Item Response Theory (IRT) is a framework for modeling responses by estimating both student and content properties (Rasch, 1960; Lord, 1980), but it does not account for student learning."
- Caveats: This is a two-sentence framing statement in a paper's introduction, presented as settled background rather than a result the paper itself tests — treat as an authoritative summary claim, not as independently re-derived evidence.

### F10: A directly comparable "solo learner, large fixed item bank, ongoing individualized practice" system built outside the BKT/PFA/DKT family (Duolingo's Half-Life Regression, for spaced-repetition practice) was fit on 12.9 million learner-item traces and field-tested with roughly 1 million students — it is not itself one of the three scoped models, but it is the closest real-world analogue to this product's deployment shape, and it too required population-scale data
- Provenance: PUBLISHED
- Access: PDF directly downloaded, extracted, and read.
- Proposed status bucket: Evidence-backed (as an adjacent-model data point, explicitly out of the three-model scope)
- Proposed evidence-quality tier: Q2 (includes a genuine field A/B retention experiment, not just retrospective log-fitting)
- Source(s): Settles, B. & Meeder, B. (2016). "A Trainable Spaced Repetition Model for Language Learning." *Proceedings of ACL 2016*, 1848–1858. https://research.duolingo.com/papers/settles.acl16.pdf
- Proposed supporting location: §"4.1 Historical Log Data Evaluation" ("two weeks of Duolingo log data, containing 12.9 million student-word lesson and practice session traces"); §4.2 ("the experiment lasted six weeks and involved just under 1 million students")
- Claimed strength (exact quote): "We collected two weeks of Duolingo log data, containing 12.9 million student-word lesson and practice session traces... Table 2 shows the evaluation results on the full data set of 12.9 million instances." / "The experiment lasted six weeks and involved just under 1 million students."
- Caveats: **Out of strict scope** — HLR is a forgetting-curve/half-life model, not BKT, DKT, or PFA. Included only because it is the closest published "one learner, one item/word bank, self-directed adaptive practice" deployment found, and it still required population-scale fitting data; it does not itself resolve the solo-learner question, it reinforces the coverage gap (see Sufficiency statement).

## Candidate conflicts noticed
- **DKT-vs-BKT margin is not stable across studies.** Piech et al. (2015) (F5) report a large, decisive DKT advantage over standard BKT (0.85 vs 0.68 AUC, Khan Academy; 0.86 vs 0.69, Assistments). Gervet et al. (2020) (F4), an independent later comparison across nine real datasets including some of the same families, instead find that a well-featured logistic-regression model (PFA-style) — not DKT — leads on small/moderate datasets, DKT only leads on large datasets or where temporal order matters most, and BKT is consistently the weakest of the three across the board. Both agree BKT is dominated, but they disagree on whether DKT's advantage over the other two is large-and-general (Piech et al.) or narrow-and-conditional-on-dataset-scale (Gervet et al.). This should be logged in `registers/conflict-register.md` by whoever has write access to it — this collector was scoped write-only to the dossier file and did not touch the registers.

## Coverage gaps
- **No source directly evaluates a true solo-learner, zero-population, fixed-item-bank deployment** of BKT, PFA, or DKT — the exact shape this product needs. Every dataset found for predictive-validity or data-requirement evidence involves a population ranging from Pelánek's stated floor of ~100 students (for Elo item-difficulty calibration) up through tens of thousands (Gervet et al., Piech et al.) to millions (Settles & Meeder, out-of-scope analogue). This is the central gap behind the PARTIAL sufficiency verdict.
- **No domain evidence from strategy-game, card-game, or gambling-adjacent skill domains** was found for any of the three models — all located evidence is from K-12/college math, introductory programming, and second-language vocabulary acquisition. Transfer of these findings to a blackjack basic-strategy/counting drill domain is untested in the literature found.
- **No independent replication of Corbett & Anderson (1994)'s original predictive-validity claim** ("quite successful in predicting test performance") was directly opened in this pass — the claim is recorded from the abstract only, since the full text sits behind a Springer paywall this collector could not access.

## Collector self-QA (fill before returning — Task's internal QA pass)
- [x] Every major claim has ≥1 source with a locatable supporting location.
- [x] No claim states strength beyond what its source shows (verbs like "lags behind," "not large," "may require" are preserved as-stated, not upgraded).
- [x] Every finding carries provenance + proposed status bucket + proposed quality tier.
- [x] Every source lists a URL/DOI for independent re-check.
- [x] Coverage gaps and candidate conflicts are named explicitly.
- [x] Citation count is within the depth budget (9, within 6–12; no overflow needed).
- [x] No citation was added merely to reach a count — F10 (Settles & Meeder) is flagged as out-of-scope-but-relevant rather than silently folded in as a fourth model.
- [x] (C1/C4 only) The mastery-model sufficiency statement is filled.

## Findings added by focused pass (C1-FP, 2026-07-19)

> Scope: this section fills exactly the four gaps named in the independent sufficiency review
> (`journal/raw/_inbox/foundation-audit-p1/verification/V1b-knowledge-tracing-sufficiency.md`):
> Bundle A (DKT-skeptical/shallow-baseline tradition), Bundle B (cold-start / population-free
> parameters, paired with identifiability/degeneracy evidence), and Bundle C (IRT and landmarks on
> their own terms). F1–F10 above are untouched. Numbering continues from F10.

### F11: BKT extended with previously-proposed enhancements (forgetting, individual student ability, data-driven skill discovery) reaches performance indistinguishable from DKT on the same benchmarks where DKT's original advantage was reported
- Provenance: PUBLISHED
- Access: Full-text PDF (arXiv:1604.02416) downloaded and extracted locally.
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q3 (primary empirical re-analysis/extension study, directly re-fitting BKT variants against DKT's own reported benchmark comparisons)
- Source(s): Khajah, M., Lindsey, R.V., & Mozer, M.C. (2016). "How deep is knowledge tracing?" Proceedings of the 9th International Conference on Educational Data Mining (EDM 2016). arXiv:1604.02416 [cs.AI] — https://arxiv.org/abs/1604.02416
- Proposed supporting location: Abstract; discussion decomposing the Piech et al. (2015) BKT-vs-DKT gap
- Claimed strength (exact quote): "We demonstrate that when BKT is extended to allow it more flexibility in modeling statistical regularities—using extensions previously proposed in the literature—BKT achieves a level of performance indistinguishable from that of DKT. ... knowledge tracing may be a domain that does not require 'depth'; shallow models like BKT can perform just as well and offer us greater interpretability and explanatory power." Quantitatively: "31.6% of difference in performance reported in [Piech et al. 2015] appears to be due to the use of a biased procedure for computing the AUC for BKT. Another 50.6% of the difference in performance reported vanishes if BKT is augmented to allow for forgetting."
- Caveats: This re-analyzes the same benchmark datasets Piech et al. (2015) used (dossier F5) rather than introducing independent new data — its force comes from decomposing an existing result. Domain remains math/tutoring (Statics, Spanish, and a synthetic simulation), so it does not close the dossier's existing no-strategy-game-domain gap.

### F12: Bayesian/hierarchical extensions of classical IRT consistently matched or outperformed DKT across all three datasets tested, at the finest content granularity tractable for IRT to train on, and were cheaper and easier to train
- Provenance: PUBLISHED
- Access: Full-text PDF (arXiv:1604.02336) downloaded and extracted locally.
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q3 (primary empirical multi-dataset comparison)
- Source(s): Wilson, K.H., Karklin, Y., Han, B., & Ekanadham, C. (2016). "Back to the basics: Bayesian extensions of IRT outperform neural networks for proficiency estimation." Proceedings of EDM 2016. arXiv:1604.02336 — https://arxiv.org/abs/1604.02336
- Proposed supporting location: Abstract; §6 Conclusion
- Claimed strength (exact quote): "We find that IRT-based methods consistently matched or outperformed DKT across all data sets at the finest level of content granularity that was tractable for them to be trained on." / "Our results indicate that simple IRT-based models equal or outperform DKT on a variety of data sets... In our experience, structured models were easier to train and required less parameter tuning than DKT... the computational demands of DKT hampered our ability to fully explore the parameter space."
- Caveats: Two of this paper's four authors (Karklin, Ekanadham) also authored the T-SKIRT paper the dossier already cites as F9 — this finding reaches their empirical result, not only their background framing (the specific coverage failure the sufficiency review's M1 named). "Tractable" is load-bearing: IRT's advantage held only up to the granularity IRT could feasibly be trained on; the paper itself flags scaling difficulty for richer IRT variants beyond that point.

### F13: An independent replication attempt of Piech et al.'s DKT-vs-BKT/PFA comparison found the DKT advantage over PFA did not hold once a data-quality defect (duplicated rows) in the public ASSISTments 2009-2010 dataset was corrected
- Provenance: PUBLISHED
- Access: Full-text PDF downloaded (educationaldatamining.org) and extracted locally.
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q3 (independent replication using the original authors' released code/data plus additional datasets — more independent than a typical single-group primary study, but still a retrospective observational comparison, not a controlled experiment)
- Source(s): Xiong, X., Zhao, S., Van Inwegen, E.G., & Beck, J.E. (2016). "Going Deeper with Deep Knowledge Tracing." Proceedings of the 9th International Conference on Educational Data Mining (EDM 2016), pp. 544–550. https://www.educationaldatamining.org/EDM2016/proceedings/paper_133.pdf
- Proposed supporting location: Abstract; §4.1 "Duplicated records"; §5 Results (Table 8); §6 Discussion
- Claimed strength (exact quote): "We determine that the DKT findings don't hold an overall edge when compared to the PFA model, when applied to properly prepared datasets that are limited to main (i.e. non-scaffolding) questions." / "we counted there are 123,778 rows of duplications out of 525,535 in the data set (23.6%)." / "Contrary to our expectation, the DKT algorithm did not achieve overwhelmingly better performance when compared to PFA model on ASSISTments data sets when they are properly prepared."
- Caveats: DKT still won decisively on the KDD Cup dataset in this same paper, which the authors attribute to PFA being handicapped there by inaccurate item-difficulty estimation — so the result is dataset-and-preparation dependent, the same qualifier the dossier already applies to Gervet et al. (F4). This paper also independently corroborates dossier Conflict #2 (the Piech et al. 25%-vs-15% gain discrepancy) from a different angle: a portion of Piech et al.'s reported margin traces to duplicated data rather than a modeling advantage.

### F14: BKT suffers a genuine identifiability problem — an infinite family of parameter settings can fit the same observed performance data equally well while making different, sometimes clearly wrong, claims about a student's actual knowledge state — and more performance data alone does not fix this; informative priors are required
- Provenance: PUBLISHED
- Access: Full-text PDF downloaded (cs.cmu.edu mirror) and extracted locally.
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q3 (primary study combining a formal argument with an empirical validation of a proposed fix — Dirichlet-prior-biased search — showing a statistically reliable AUC improvement, 0.620±0.002 vs 0.614±0.002)
- Source(s): Beck, J.E. & Chang, K. (2007). "Identifiability: A Fundamental Problem of Student Modeling." In: Conati, C., McCoy, K., Paliouras, G. (eds) User Modeling 2007 (UM 2007), LNCS vol. 4511, pp. 137–146. Springer. DOI: 10.1007/978-3-540-73078-1_17. Full text: http://www.cs.cmu.edu/~kkchang/paper/BeckChang.2007.UserModeling.IdentifiabilityStudentModel.pdf
- Proposed supporting location: Abstract; §6 "Conclusions"
- Claimed strength (exact quote): "observed student performance corresponds to an infinite family of possible model parameter estimates, all of which make identical predictions about student performance. However, these parameter estimates make different claims, some of which are clearly incorrect, about the student's unobservable internal knowledge." / "The main conclusion of this paper is that... we must take the assertions of our student model about the student's knowledge with a large grain of salt. Furthermore, acquiring additional training data is not a solution to this problem. Even with an order of magnitude more data, there are still many sets of parameters that will fit the student data equally well. We need to encode prior beliefs in order to do a satisfactory job of modeling student knowledge; performance data are not enough."
- Caveats: This is the pro-caution ("against feasibility") half of Bundle B's mandatory balance. See F15 immediately below — a later paper argues this specific "identifiability" framing was itself mislabeled. Read together, not either alone: both still agree fitted BKT parameters are not automatically trustworthy as knowledge-state claims, which is the operative caution for this product regardless of the precise mechanism. Logged as Candidate conflict below (register #8).

### F15: A later paper shows BKT is actually formally identifiable under mild, practically-satisfied conditions (contradicting Beck & Chang's 2007 specific claim), but identifies a distinct, real problem — "semantic model degeneracy," where the best-fitting parameters are inconsistent with BKT's own conceptual assumptions — which the authors argue arises from model misspecification, not from insufficient data
- Provenance: PUBLISHED
- Access: Full-text PDF downloaded (ERIC fulltext mirror) and extracted locally.
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q3 (primary formal-plus-simulation study; EDM 2017 Best Paper nominee)
- Source(s): Doroudi, S. & Brunskill, E. (2017). "The Misidentified Identifiability Problem of Bayesian Knowledge Tracing." Proceedings of the 10th International Conference on Educational Data Mining (EDM 2017). https://files.eric.ed.gov/fulltext/ED596611.pdf
- Proposed supporting location: Abstract; §1 Introduction; degeneracy simulation results and discussion (§4–5)
- Claimed strength (exact quote): "we show that BKT is actually an identifiable model, under mild conditions on the parameters that should always be satisfied in practical settings... no additional criteria beyond predictive accuracy are needed to identify a single BKT model that best explains observed student performance." On degeneracy: "not only can alternative models of student learning lead to fitting (near) degenerate parameters, but varying the number of observations can lead to different forms of degeneracy! This is a counterintuitive phenomenon that we believe is not the result of not having enough data (students) to fit the models well, but rather the result of the mismatch between the true form of student learning and the model we are using to fit student learning."
- Caveats: This does not vindicate solo-learner, parameter-free estimation — it relocates the caution rather than removing it: even with abundant, well-populated data, a misspecified model can still yield degenerate, misleading parameter estimates, so population size alone is not a sufficient fix either. Logged as Candidate conflict below (register #8), against F14.

### F16: An "explanatory IRT" method that estimates a new learner's starting ability from background covariates (age, gender, learning disability, past trajectory) rather than that learner's own accumulated response history substantially reduced cold-start ability-estimation error, in both a simulation study and an illustration on real platform data
- Provenance: PUBLISHED
- Access: PubMed abstract directly read in full (full text paywalled beyond the abstract at the Behavior Research Methods host — not opened in this pass).
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q3 (primary study; the abstract describes a simulation study plus a real-data illustration, not a live randomized field deployment, so not rated Q2)
- Source(s): Park, J.Y., Joo, S.-H., Cornillie, F., van der Maas, H.L.J., & Van den Noortgate, W. (2019). "An explanatory item response theory method for alleviating the cold-start problem in adaptive learning environments." Behavior Research Methods, 51(2), 895–909. DOI: 10.3758/s13428-018-1166-9 — https://pubmed.ncbi.nlm.nih.gov/30511157/
- Proposed supporting location: Abstract (full text paywalled beyond abstract)
- Claimed strength (exact quote): "we propose making the ERS [Elo rating system] more efficient by using an explanatory item response theory modeling to estimate students' ability levels on the basis of their background information and past trajectories of learning. A simulation study was conducted under various conditions, and the results showed that the proposed approach substantially reduces ability estimation errors."
- Caveats: **This is the pro-feasibility half of Bundle B's mandatory balance, and it has a real limit.** It addresses cold start for a *new learner* joining a system whose explanatory IRT model is already fit on a population's prior learner-item interaction data. It is evidence that a *given new learner's* own start-up estimate can substitute background covariates for that learner's own response history — not evidence that item difficulty or model parameters can be obtained with *zero population ever*. Abstract-only access; full text was not opened in this pass.

### F17: At large scale (~100 million trials, ~140,000 learners) in a real adaptive fact-learning system, difficulty predictions derived from the item/fact side generally outperformed predictions derived from the learner-ability side for improving cold-start estimates, though both contributed to better estimates than default values
- Provenance: PUBLISHED
- Access: Abstract directly read via the University of Groningen research portal (full text at Springer paywalled beyond the abstract — not opened in this pass).
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q3 (large-scale empirical simulation study built on real historical log data; not itself a live randomized field experiment — see Caveats)
- Source(s): van der Velde, M., Sense, F., Borst, J.P., & van Rijn, H. (2024). "Large-scale evaluation of cold-start mitigation in adaptive fact learning: Knowing 'what' matters more than knowing 'who'." User Modeling and User-Adapted Interaction, 34, 1467–1491. DOI: 10.1007/s11257-024-09401-5
- Proposed supporting location: Abstract
- Claimed strength (exact quote): "In a simulation study conducted on a large educational data set from an adaptive fact learning system (about 100 million trials from almost 140 thousand learners), we predicted individual learning parameters from response data. Using these predicted parameters as starting estimates for the adaptive learning system yielded a more accurate model of learners' memory performance than using default values. We found that predictions based on the difficulty of the fact ('what') generally outperformed predictions based on the ability of the learner ('who'), though both contributed to better model estimates."
- Caveats: Same structural limit as F16 — the "what" (item-side) priors that outperform "who" (learner-side) priors are themselves derived from a 140,000-learner population; this is evidence that item-side information transfers better to a *new* learner than learner-side information does, not evidence that item difficulty can be set with no population at all. The abstract itself frames this as extending "a previous smaller-scale laboratory-based experiment" with real field-tested learning outcomes (not opened in this pass, and not the same paper) — this citation is the large-scale simulation follow-up, not a field experiment itself.

### F18: A primary/standard psychometric account of what IRT actually estimates — a latent, continuous examinee ability (θ) via each item's own characteristic curve P(θ) — tracing to Lawley (1943), Lord, and Rasch, independent of any knowledge-tracing or Elo framing
- Provenance: PUBLISHED
- Access: Full-text PDF (open, ERIC-distributed edition) downloaded and extracted locally; Acknowledgments and Chapter 1 read in full.
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q4 (authoritative standard reference/textbook — a synthesis and pedagogical account of the field's foundational theory, not a novel primary study)
- Source(s): Baker, F.B. (2001). The Basics of Item Response Theory (2nd ed.). ERIC Clearinghouse on Assessment and Evaluation, University of Maryland, College Park, MD. Full text: https://www.ime.unicamp.br/~cnaber/Baker_Book.pdf (open mirror of the ERIC-distributed edition)
- Proposed supporting location: Acknowledgments; Chapter 1, "The Item Characteristic Curve"
- Claimed strength (exact quote): "A primary goal of educational and psychological measurement is the determination of how much of such a latent trait a person possesses... the generic term 'ability' is used within item response theory to refer to such latent traits... At each ability level, there will be a certain probability that an examinee with that ability will give a correct answer to the item. This probability will be denoted by P(θ)." On origins: "D.N. Lawley... published a paper in 1943... This paper marks the beginning of item response theory as a measurement theory. The work of Dr. F.M. Lord... has been the driving force behind both the development of the theory and its application... In the late 1960s, Dr. B.D. Wright... recognized the importance of the measurement work by the Danish mathematician Georg Rasch."
- Caveats: This closes the "IRT is never reached on its own terms" gap the sufficiency review named (M4) — every prior IRT characterization in the dossier (F8, F9) came from inside an Elo paper or a T-SKIRT introduction. This is a pedagogical text, not a novel empirical contribution, hence Q4 despite being authoritative.

### F19: The standard, up-to-date overview of learner-modeling techniques (BKT, logistic/PFA-family models, and their data requirements) is a different, previously-uncited work from the "Pelánek 2017" the dossier's own Sufficiency Statement and F8 actually meant (the 2016 Computers & Education Elo paper)
- Provenance: PUBLISHED
- Access: Full-text PDF (author's own accepted-preprint mirror) downloaded and extracted locally.
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q4 (a synthesis/overview article surveying and organizing the field's primary literature, not itself a novel primary empirical study)
- Source(s): Pelánek, R. (2017). "Bayesian knowledge tracing, logistic models, and beyond: an overview of learner modeling techniques." User Modeling and User-Adapted Interaction, 27(3–5), 313–350. DOI: 10.1007/s11257-017-9193-2. Author's PDF: https://www.fi.muni.cz/~xpelanek/publications/umuai-overview.pdf
- Proposed supporting location: Abstract; §4.3.1–4.3.2 (BKT and PFA data-requirement breakdowns by "global/local learner/domain data")
- Claimed strength (exact quote): "Learner modeling is a basis of personalized, adaptive learning. The research literature provides a wide range of modeling approaches, but it does not provide guidance for choosing a model suitable for a particular situation. We provide a systematic and up-to-date overview of current approaches to tracing learners' knowledge and skill... focusing in particular on the widely used Bayesian knowledge tracing and logistic models." On item-difficulty individualization specifically: "[BKT] Local domain data: not used in the basic model; extensions of BKT contain such parameters as item difficulties (Pardos and Heffernan, 2011)."
- Caveats: This finding directly resolves the citation confusion the sufficiency review flagged: the dossier's Sufficiency Statement and F8 cite "Pelánek 2016/2017" for the Computers & Education Elo paper — a real but different paper from this one. This UMUAI overview should not be treated as already covered by F8.

### F20: Learning Factors Analysis (LFA) — the direct statistical parent of Performance Factors Analysis, which the dossier's own F2 quotes as building on "LFA's standard form" — is a semi-automated method combining a logistic statistical model, expert judgment, and combinatorial search over "difficulty factors" to evaluate and improve a cognitive/skill model from tutor log data
- Provenance: PUBLISHED
- Access: Full-text PDF (CMU-hosted) downloaded and extracted locally.
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q3 (primary study introducing and empirically applying the method to real Geometry Cognitive Tutor log data)
- Source(s): Cen, H., Koedinger, K., & Junker, B. (2006). "Learning Factors Analysis – A General Method for Cognitive Model Evaluation and Improvement." In: Intelligent Tutoring Systems (ITS 2006), LNCS vol. 4053, pp. 164–175. Springer. DOI: 10.1007/11774303_17. Full text: http://pact.cs.cmu.edu/pubs/Cen,%20Koedinger%20&%20Junker06.pdf
- Proposed supporting location: Abstract; §1 Introduction
- Claimed strength (exact quote): "A cognitive model is a set of production rules or skills encoded in intelligent tutors to model how students solve problems... In this paper we propose a semi-automated method for improving a cognitive model called Learning Factors Analysis that combines a statistical model, human expertise and a combinatorial search. We use this method to evaluate an existing cognitive model and to generate and evaluate alternative models."
- Caveats: This is the named landmark the sufficiency review flagged as absent even though the dossier's own F2 quotes a paper that directly references "LFA's standard form" — a one-author-hop citation gap, now closed. Like the rest of this card's evidence base, it is drawn from a K-12 math tutor (Geometry Cognitive Tutor), not a strategy-game or card-game domain.

### F21: No single fixed sample-size threshold exists for IRT calibration — 1PL/Rasch models are calibratable on far smaller samples than 2PL/3PL, with figures as low as ~100 respondents reported when Bayesian priors are incorporated, while models with guessing/slipping parameters or latent-class mixtures may need thousands; a lower-formality practitioner source independently corroborates the low end for the plain Rasch case
- Provenance: PUBLISHED
- Access: Schroeders & Gnambs: full-text PDF (author's own hosted mirror) downloaded and extracted locally. Linacre: HTML page (rasch.org) directly read in full — a one-page Rasch Measurement Transactions column, not a peer-reviewed journal article; included only as corroboration and flagged as the weaker of the two sources.
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q2 for Schroeders & Gnambs (peer-reviewed methodological tutorial synthesizing multiple simulation studies with quantitative thresholds by model type, in Advances in Methods and Practices in Psychological Science); Q3-and-informal for Linacre (a practitioner guideline note in a technical newsletter, not a peer-reviewed article) — recorded as mixed, matching how the dossier already handles mixed-tier sources (see F8)
- Source(s): (1) Schroeders, U. & Gnambs, T. (2025). "Sample-Size Planning in Item-Response Theory: A Tutorial." Advances in Methods and Practices in Psychological Science, 8(1), 1–13. DOI: 10.1177/25152459251314798 — https://timo.gnambs.at/sites/default/files/gnambstimo/publications/schroeders2025.pdf (2) Linacre, J.M. (1994). "Sample Size and Item Calibration Stability." Rasch Measurement Transactions, 7(4), 328 — https://www.rasch.org/rmt/rmt74m.htm
- Proposed supporting location: Schroeders & Gnambs, "Simulation-Based Sample-Size Determination for IRT Analyses" section; Linacre, main stability-by-sample-size table.
- Claimed strength (exact quotes): Schroeders & Gnambs: "simulation studies examining the minimum required sample size for IRT analyses have consistently shown that these are context-dependent. For instance, some studies have suggested that IRT can yield accurate parameter estimates with as few as 100 respondents if prior information is incorporated into the estimation (König et al., 2020; Sheng, 2013)... In contrast, other studies have indicated that for IRT models including guessing or slipping parameters (Cuhadar, 2022) or those representing mixtures of multiple latent classes... even sample sizes of 2,000 may be insufficient." Linacre: "a sample of 50 well-targeted examinees is conservative" for ±1 logit stability at 99% confidence, and "30 examinees is enough for well-designed pilot studies."
- Caveats: This directly brackets the "at least 100 students" figure carried in the dossier's F8/Sufficiency Statement from Pelánek's own simulation (which V1 downgraded to an author's rule of thumb) — Schroeders & Gnambs show ~100 is plausible specifically for simpler 1PL/Rasch-with-priors setups, while 2PL/3PL or misspecified models can need an order of magnitude more, so "100" is real but model-dependent, not a universal floor. Neither source addresses the zero-population case directly; both concern how small a *population* can be, not doing without one.

## Candidate conflicts noticed — added by focused pass (C1-FP)
> Note: `registers/conflict-register.md` was concurrently appended to by other collector agents while this
> pass ran, so its "#" numbering is not a clean sequential counter (existing rows already jump 1, 2, 6, 3,
> 4, 5 before this pass). To avoid colliding with rows added by other collectors, the two rows below were
> written to the register as **#7 and #8** (after the highest number already present, #6), not #3/#4.

- **Conflict #7 (register row #7): does DKT retain any reliable advantage over well-specified shallow/Bayesian alternatives, or does the advantage dissolve entirely?** Side A (already in dossier): Piech et al. (2015) (F5) report a large, decisive DKT advantage; Gervet et al. (2020) (F4) report a narrower, dataset-scale-conditional advantage. Side B (this pass): Khajah, Lindsey & Mozer (2016) (F11) and Wilson, Karklin, Han & Ekanadham (2016) (F12) both report well-specified shallow/Bayesian extensions reaching performance "indistinguishable from" or that "matched or outperformed" DKT — not merely a narrowed gap, but no reliable gap at all in their tested settings. This extends the dossier's existing Conflict #1 to a stronger claim. Status: open. Affected areas: mastery-model choice; strengthens the case for BKT/PFA/IRT-family models over DKT specifically in a low-data solo-trainer setting.
- **Conflict #8 (register row #8): is untrustworthy fitted-BKT-parameter behavior a matter of non-identifiability, or of "semantic model degeneracy" under model misspecification?** Beck & Chang (2007) (F14) attribute the problem to genuine non-identifiability — an infinite family of parameter sets fits the data equally well. Doroudi & Brunskill (2017) (F15) directly dispute this mechanism, showing BKT is formally identifiable under mild conditions, and relocate the real problem to model misspecification ("semantic model degeneracy"), which they argue is not fixed by more data either. Status: open — both agree the practical symptom (fitted parameters can misrepresent a student's true knowledge state) is real; they disagree on why. Affected areas: how much independent weight the identifiability caution should carry in Bundle B's balance judgement, separate from the population-size question.

## Coverage gaps — added by focused pass (C1-FP)
- **Bundle B's pro-feasibility citations address new-learner cold start against an existing population, not a true zero-population case.** Park et al. (2019) (F16) and van der Velde et al. (2024) (F17) both show that a *new* learner's start-up estimate can borrow from a population-fitted model (via background covariates or item-side priors) instead of that learner's own response history — neither is evidence that item difficulty or model parameters can be obtained with *no population ever*, the product's actual configuration. This pass narrows the original coverage gap (population-derived item-side priors transfer better than learner-side ones; explanatory covariates can substitute for a given learner's own history) but does not close it.
- **Still no strategy-game, card-game, or gambling-adjacent domain evidence**, across any of the eleven new citations — consistent with the original dossier's named gap. All domains found in this pass remain K-12/college math, ITS tutoring, general psychometric testing, or (Bundle B) fact/vocabulary learning.
- **No case study at this product's exact bank shape (small, fixed, expert-authored item bank) was found.** Bundle C's primary-IRT and sample-size sources (F18, F21) are general calibration literature, not a study of calibration against a small fixed bank of the size this product would actually use.

## Focused-pass self-QA (C1-FP)
- [x] Only the four gaps named in V1b were targeted; no re-collection of anything F1–F10 already covers.
- [x] No existing finding, quote, tier, section, or the Sufficiency Statement was altered, deleted, or rewritten.
- [x] Every added finding (F11–F21) carries provenance, access, proposed status bucket, proposed quality tier, source(s) with URL/DOI, supporting location, and an exact-quote claimed strength.
- [x] **Bundle B's mandatory balance requirement was met**: two feasibility-supporting citations (F16 Park et al. 2019; F17 van der Velde et al. 2024) and two identifiability/degeneracy citations (F14 Beck & Chang 2007; F15 Doroudi & Brunskill 2017) — both directions collected, with the limits of each stated in its own Caveats rather than upgraded.
- [x] Citation count: 12 citations across 11 findings (F21 bundles two corroborating sources under one claim), within the 8–12 focused-pass budget (Bundle A: 3, Bundle B: 4, Bundle C: 5).
- [x] New coverage gaps and candidate conflicts are named explicitly and numbered after the last existing entry — written to the register as #7–#8 (not #3–#4) because other collector agents had concurrently appended rows #3–#6 to the shared register between this pass's initial read and its write; see note at the top of "Candidate conflicts noticed — added by focused pass" above.
- [x] No citation was padded to reach a count; F21 folds a second, weaker source into one finding rather than inflating the count with a low-value standalone entry.

## Findings added by remediation pass (C1-R2, 2026-07-20)

> Scope: exactly the one gap V1c named — **obtaining item difficulties before any response
> population exists**, and the single-learner estimator tradition (V1b's M3) that was never assigned
> to a bundle. Q1, Q2, Q3 were NOT re-opened; Bundles A and C are closed and were left alone.
> F1–F21 are untouched. Numbering continues from F21. Target was 4–6 sources; **5 new sources
> (F22–F26) were added, plus F27, which adds NO new source** and instead reports material found by
> reading a source the dossier already cites (F19) in full rather than by abstract.
>
> **Authorisation:** amendment 6 (the previous pass was mis-scoped — it returned new-learner
> cold-start against an *existing* population, a different question; that mis-scoping was the
> orchestrator's error, not the collector's) and amendment 5 (sufficiency top-ups are exempt from the
> 15-citation cap).
>
> **ACCESS CAVEAT THE VERIFIER MUST WEIGH — read before checking any quote below.** This collector
> had no ability to download files and string-match locally, the method V1c used. Every quote in
> F22–F26 is **fetch-mediated**: retrieved by a tool that converts a page and reports its text
> through a small model. That is a weaker evidentiary route than V1c's `curl` + `pdftotext` +
> local string match, and it is exactly the hazard the shared brief names. Treat every F22–F26
> quote as **claimed-verbatim, not confirmed-verbatim**, and re-retrieve by an independent route.
> **F27 is the exception and is the strongest-access finding in this pass:** its source PDF was read
> directly as rendered pages, so its quotes were read off the page, not reported by a summarizer.
> Where a number reached this collector only inside a summarizer's paraphrase, it is marked
> `[fetch-reported, NOT quoted]` and is **not** presented in quote marks.

### F22: Three off-the-shelf LLMs, used as difficulty raters for newly created items with no access to response data, produced difficulty estimates showing "moderate to strong positive correlations" with empirical item difficulties across six domains of primary-school mathematics
- Provenance: PREPRINT (arXiv, not stated as peer-reviewed)
- Access: ~~**arXiv abstract page retrieved and read; abstract-scope only.** The PDF body was fetched
  and the tool reported it could **not** extract the Results text — so the specific Spearman
  coefficients, the human-expert comparison range, and the limitations section were **not obtained**.~~
  `SUPERSEDED by C1-EC (2026-07-20).` **The body is now in hand.** V1d downloaded
  `https://arxiv.org/pdf/2605.18562` (HTTP 200, 641 KB, ~80 KB extracted text) and string-matched
  locally. C1-R2's access failure was **a tooling limit, not an absence**, and C1-R2 reported it
  honestly. Tables 2–3, §4.1 Results and §5 Limitations are now recorded below.
- Proposed status bucket: Evidence-backed ~~(abstract-scope), with a **strength ceiling**: no numeric
  result reached this collector~~ `SUPERSEDED — the strength ceiling is lifted; measured figures below.`
  **Now full-text-scope.**
- Proposed evidence-quality tier: Q3 (primary empirical study; full factorial design against an
  empirical difficulty reference) — **confirmed on the body by V1d; no longer abstract-proposed.**
- Source(s): Kolesnikova, D., Fedyanin, K., Hofman, A.D., Brinkhuis, M.J.S., & Bolsinova, M. (2026).
  "Estimating Item Difficulty with Large Language Models as Experts." arXiv:2605.18562, submitted
  18 May 2026 — https://arxiv.org/abs/2605.18562
- Proposed supporting location: Abstract; **§4.1 Results; Tables 2–3; §5 Limitations** (added by C1-EC)
- Claimed strength (exact quote): "Accurate estimates of item difficulty are essential for valid assessment and effective adaptive learning. However, for newly created tasks, response data are typically unavailable. Pretesting and expert judgement can be costly and slow, while machine learning methods often require large labelled training datasets." / "This study addresses this gap by evaluating three off-the-shelf LLMs as difficulty raters for newly created items without access to response data." / "Across domains, LLM-based estimates exhibited moderate to strong positive correlations with empirical item difficulties. For simpler arithmetic tasks, some configurations approached the upper end of the accuracy range reported for human experts in previous research." / ~~"The study positions LLMs as a promising tool for initial item calibration and offers insights into effective workflow configuration."~~ `SILENT TRUNCATION — repaired by C1-EC.` **Actual verbatim sentence, both ends restored:** "**By systematically comparing key design choices,** the study positions LLMs as a promising tool for initial item calibration and offers insights into effective workflow configuration **in settings where many new items are generated and response data are unavailable.**" (The dropped tail in fact *favours* the product's case; the defect is one of quote discipline, not of direction.)

- **MEASURED RESULTS — added by C1-EC (2026-07-20) from the PDF body V1d obtained. This is the
  numeric figure the dossier previously and wrongly declared did not exist anywhere in it.**

  **Table 2 — Spearman correlation between LLM-based and empirical estimates** (averaged across
  domains and design factors):
  - GPT-4o — **.673** [.629, .712]
  - DeepSeek Chat — **.633** [.584, .675]
  - Qwen 3 235B — **.665** [.616, .709]

  **Table 3 — best and worst configurations** (averaged across LLMs): best is Pairwise · Soft ·
  Zero-shot at **.732** [.687, .768]; worst is Absolute · Hard · Zero-shot at **.486** [.430, .540].
  By domain the spread is large: **Subtraction .847**, **Text Problems .252**.

- **THE BODY MATERIALLY QUALIFIES THE ABSTRACT SENTENCE QUOTED ABOVE — added by C1-EC.** The dossier
  previously carried only the abstract's favourable half. §4.1, verbatim:

  > "Across models, bootstrap confidence intervals overlapped with the range of agreement reported in
  > previous studies for individual human raters (Clauser et al., 2008; Cross et al., 1984; Melican et
  > al., 1989). At the same time, observed correlations were lower than those reported for pooled human
  > judgements, such as the mean correlation of .70 in Attali et al. (2014), and lower than the value of
  > .76 reported by Yancey et al. (2024) for automated estimation of newly generated word stems."

  So "approached the upper end of the accuracy range reported for human experts" is true of
  **individual** raters only. The body places the method **below pooled human judgement (.70)** and
  **below an existing automated (BERT-IRT) method (.76)**. This is registered as a conflict between
  F22's own abstract and its own body — not a contradiction (different comparators), but a dossier
  quoting only the abstract **overstates the method**.

- **RELATIVE SCALE ONLY — added by C1-EC.** §5 Limitations, verbatim:

  > "the present study does not examine the absolute differences between LLM-based estimates and those
  > derived from student response data, which limits the immediate applicability of the findings. This is
  > because estimates produced by pairwise comparison are located on a relative scale."

  The best-performing configurations yield only a **relative ordering of items**, not calibrated
  absolute difficulties. Absolute agreement is **explicitly unexamined**. The authors' own closing
  position, verbatim: this use "is best understood as an emerging methodological direction rather than
  as a finished solution."

- **Net effect on the dossier's story (C1-EC):** these figures **weaken**, not strengthen, the
  zero-response-data difficulty case the dossier told from the abstract alone. ~.73 at best, on a
  relative scale, below pooled human experts, on primary-school arithmetic.

- Caveats: **This is the closest source in the entire dossier to the product's literal configuration**
  — difficulty for newly created items, no response data — and it is also the weakest-access one.
  Four separate limits: (i) ~~abstract-scope, so "moderate to strong" is the strongest characterisation
  available and **no correlation value was obtained**~~ `SUPERSEDED by C1-EC — the values ARE obtained
  (above). Replacement limit (i): the measured correlations are **mixed-to-modest** (.633–.673
  aggregate, .732 best, .252–.847 by domain), sit **below pooled human judgement and below an existing
  automated method**, and are on a **relative scale only** with absolute agreement unexamined.`;
  (ii) the authors' own verb is "promising" and
  the stated use is "**initial** item calibration", i.e. a starting point that empirical calibration
  later replaces — not a substitute for it; (iii) domain is primary-school mathematics, where item
  difficulty is plausibly far more predictable from surface features than blackjack decision drills;
  (iv) the study still needed a population-calibrated "empirical reference" to score the LLM against,
  so it demonstrates that zero-response estimates *correlate with* population-derived truth — it does
  not demonstrate a system running without one. **C1-EC: caveat (iv) is VERIFIED on the body — the
  study scores LLM output against "empirical difficulty estimates treated as empirical reference".
  The collector stated this caveat correctly and gets credit for it.** Preprint status also confirmed
  on the body (`arXiv:2605.18562v1 [stat.ME] 18 May 2026`) — not confirmed peer-reviewed.

### F23: A response-free item-difficulty model that fine-tunes transformer encoders directly on item wording "recovers a substantial share of the wording-derivable signal at training-set sizes typical of applied measurement" — but it is trained on items whose difficulties are already known, so it relocates the population requirement rather than eliminating it
- Provenance: PREPRINT (arXiv, not stated as peer-reviewed)
- Access: ~~**arXiv abstract page retrieved and read; abstract-scope only.** Body not opened.~~
  `SUPERSEDED by C1-EC (2026-07-20).` V1d obtained the full PDF and string-matched locally; §2.1 is
  now recorded below. The paper is literally labelled "A PREPRINT". Of C1-R2's four quotes, three are
  verbatim and the fourth differs only by hyphenation.
- Proposed status bucket: Evidence-backed — **now full-text-scope** (was abstract-scope)
- Proposed evidence-quality tier: Q3 (primary methodological study with a Monte Carlo subsampling
  evaluation design and a held-out test set; proposed from the abstract only)
- Source(s): Netík, J. & Martinková, P. (2026). "Response-free item difficulty modelling for
  multiple-choice items with fine-tuned transformers: Component-wise representation and multi-task
  learning." arXiv:2605.16991, submitted 16 May 2026 — https://arxiv.org/abs/2605.16991
- Proposed supporting location: Abstract
- Claimed strength (exact quote): "Response-free item difficulty modelling promises to reduce reliance on response-based calibration but is intrinsically difficult on reading-comprehension multiple-choice items, where difficulty depends on inferential demands across wording components." / "Each method is evaluated under a Monte Carlo subsampling design at three training-set sizes on a held-out test set. We find that joint encoding is a viable end-to-end alternative to feature-engineering pipelines; while the component-wise variant shows no detectable benefit, consistent with self-attention already harvesting the cross-component signal, the multi-task variant delivers significant paired improvements in the smallest-sample regime. Transformer fine-tuning, especially if regularised by a suitable auxiliary task, recovers a substantial share of the wording-derivable signal at training-set sizes typical of applied measurement."
- **UPGRADE — added by C1-EC (2026-07-20). The crux is confirmed, and the population chain is LONGER
  than the dossier states.** This is a correction in the collector's favour. §2.1 "Source corpus and
  pseudo-labelling", verbatim:

  > "We pseudo-label every item by few-shot prompting of a large language model (Gemini 2.5 Flash) using
  > PALRACE (Zou et al., 2022), **a human-administered subset of RACE++ with Rasch difficulty estimated
  > from response patterns**, as the source of in-context anchors. On a held-out pilot drawn from PALRACE
  > itself, **the LLM's predictions correlate at r = 0.46 with response-based Rasch difficulty**."

  The training targets are **not** response-calibrated difficulties directly — they are *LLM
  pseudo-labels* anchored on response-calibrated Rasch difficulties, and that pseudo-labelling step
  itself correlates only **r = 0.46** with the response-based truth. The pipeline therefore sits on a
  **population-calibrated anchor set** *and* inherits a substantial **ceiling** from the pseudo-labelling
  step. The dossier held neither fact. F23 relocates the population requirement even further from
  elimination than C1-R2 claimed.

- Caveats: **The load-bearing caveat, and it is structural, not incidental.** "Response-free" here
  means *the item being scored* needs no responses. The model itself is **fine-tuned on training-set
  items with known (i.e. response-calibrated) difficulties** — the abstract's own framing is
  "training-set sizes". So this method requires a population somewhere upstream; it just does not
  require one for each *new* item. That is a real and useful property for a growing bank, and it is
  **not** the "no population ever" case. The authors' own word for what is recovered is "a
  substantial share of the **wording-derivable** signal" — an explicitly bounded ceiling, not the
  full difficulty signal. Domain is reading-comprehension MCQs. Preprint; abstract-scope.

### F24: In a randomized comparison inside an adaptive fact-learning system, the arm that used a fixed default parameter and no predictions at all performed measurably worse than every prediction-based arm — the closest direct measurement in this dossier of the cost of running with zero response data
- Provenance: PUBLISHED, peer-reviewed, open access (CC BY)
- Access: Publisher HTML full text retrieved and read; **fetch-mediated** (see access caveat above).
  The CC-BY PDF at research.rug.nl returned HTTP 403 and was not opened.
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: **Q2** (the paper reports experiments with participants randomly
  assigned to prediction conditions, i.e. a controlled experiment, not retrospective log-fitting —
  this is the highest-tier empirical source on the load-bearing question in the whole dossier;
  verifier should confirm the randomisation claim against the Methods section)
- Source(s): van der Velde, M., Sense, F., Borst, J.P., & van Rijn, H. (2021). "Alleviating the Cold
  Start Problem in Adaptive Learning using Data-Driven Difficulty Estimates." *Computational Brain &
  Behavior*, 4(2), 231–249. DOI: 10.1007/s42113-021-00101-6 —
  https://link.springer.com/article/10.1007/s42113-021-00101-6
- Proposed supporting location: §"Bayesian Prediction of Rate of Forgetting" (the Default condition);
  §"Learning Session Performance" (Exp. 1); §"Rate of Forgetting Prediction" (Exp. 1, RMSE);
  §"Delayed Recall Test Performance" (Exp. 2); §"General Discussion" (the conditional conclusion).
  ~~**Section attributions are as reported by the retrieval tool and should be re-confirmed.**~~
  `RESOLVED by C1-EC — V1d re-confirmed the section attributions against the parsed publisher HTML.`
  Add: §"Delayed Recall Test Performance" (Exp. **1**, the null); Ethics declarations (the COI).
- Claimed strength (exact quotes, four passages): "For comparison, we also included a *Default* condition in which the predicted rate of forgetting is always the default value of 0.3." `[C1-EC: minor — the paper's actual text carries an inline symbol here, "in which the predicted rate of forgetting \(\alpha_{\varnothing}\) is always the default value of 0.3." An HTML-rendering artifact; it should carry an ellipsis.]` / "on average, response accuracy in these conditions was about 7.3 percentage points higher (95% CI [3.9, 11.0])" `[VERBATIM — confirmed by local string match]` / "Only a one-sided Bayesian *t*-test comparing RMSE in all four predictive conditions (*M* = 0.084, *SD* = 0.025) to the *Default* condition (*M* = 0.102, *SD* = 0.035) found strong evidence for an improvement in prediction accuracy (BF = 1.0 × 10³)." `[VERBATIM — confirmed]` / ~~"Provided a sufficient number of easy facts, the use of individualised difficulty predictions created a more strongly differentiated repetition schedule that improved participants' response accuracy, particularly on difficult facts."~~

  > **`STRUCK — SPLICED QUOTE. Repaired by C1-EC (2026-07-20). This is a genuine quote-discipline
  > defect: no such sentence exists in the paper.`** The struck text grafts the opening clause of one
  > sentence onto the tail of another, from two different sections, with no ellipsis and no indication
  > of splicing. Both halves are real and the composite does **not** reverse the paper's meaning — but
  > it is not a quote and must not stand inside quote marks. The two genuine sentences, verbatim:
  >
  > 1. **Discussion:** "Provided a sufficient number of easy facts, the use of individualised difficulty
  >    predictions created **a more pronounced differentiation in the scheduling of easy and difficult
  >    items, resulting in better retention of items studied during the learning session.**"
  > 2. **General Discussion:** "**Experiment 2 showed that using difficulty predictions** created a more
  >    strongly differentiated repetition schedule that improved participants' response accuracy,
  >    particularly on difficult facts."
  >
  > Note that (2) is scoped to **Experiment 2** — a scope the spliced version silently dropped.

- **RANDOMISATION CONFIRMED (C1-EC, via V1d local string match).** Verbatim: "Participants were
  randomly assigned to one of the five prediction types". The study was additionally **preregistered**
  (osf.io/vwg6u for Exp 1; osf.io/snfyz for Exp 2). **The Q2 tier is warranted.**

- **PARTICIPANT COUNTS, now read off the paper** (correctly kept out of quote marks by C1-R2):
  Experiment 1 — **241** University of Groningen first-year psychology students (82 in sample 1, 159 in
  sample 2), plus **217** MTurk participants in the USA (85 / 132). Experiment 2 — **197** students
  (128 / 69). Sample sizes were set by preregistered Bayesian stopping rules.

- **CONFLICT OF INTEREST — LOCATED. Added by C1-EC (2026-07-20). C1-R2 flagged this "unchecked, not
  absent"; checking it found a real disclosure, and it resolves AGAINST independence.** Ethics
  declarations, verbatim:

  > "**Conflict of Interest** An earlier version of the adaptive learning system discussed in this
  > manuscript is licensed to Noordhoff Publishers by the University of Groningen. **This project was
  > partially funded by these license fees.** However, the publishing house had no involvement in this
  > study."

  F24 is **developer-authored and partially funded by commercial licence revenue from the very system
  it evaluates**. Per the verifier contract, **F24 must not be counted as independent corroboration of
  SlimStampen/MemoryLab.** This is not disqualifying — the COI is disclosed, the design is randomised
  and preregistered, and the result does not cut in the authors' obvious convenience — but the dossier
  must record it, and did not. See also the **Source-independence disclosure** section below.

- **OMITTED NULL — added by C1-EC (2026-07-20). The 7.3 pp figure is IN-SESSION ONLY.** The dossier
  presented F24 as "the closest direct measurement… of the cost of running with zero response data"
  without reporting that **the effect did not survive to the delayed recall test in Experiment 1.**
  Verbatim:

  > "**Delayed Recall Test Performance** There was no difference between conditions in the number of
  > correctly recalled facts on the delayed recall test (Fig. 5d). A comparison of Bayesian Poisson
  > regression models showed **strong evidence in favour of the intercept-only null model** (Table 1 D),
  > which found an average test score across conditions of 15.0 (95% CI [14.5, 15.4])."

  And on accuracy restricted to studied items, also Exp 1: "the Bayesian logistic mixed-effects model
  that was most likely to have generated the data was **the intercept-only null model**."

  **Product-relevant consequence:** the measured cost of the zero-data path is confined to
  **in-session accuracy**; on the **retention** outcome that actually matters for a training product,
  Experiment 1 found **nothing**. The dossier's characterisation ("unfavourable", "measured cost") is
  directionally defensible but was **one-sided**; it is now two-sided.
- Caveats: **Direction: this cuts AGAINST the product's zero-data path, and it should be reported that
  way rather than softened.** Four qualifications. (i) The effect is real but modest — ~7.3 percentage
  points of in-session accuracy, and the abstract itself conditions the whole result on there being
  "sufficient variability in the difficulty of the study material", which a small hand-authored
  blackjack drill bank may or may not have. (ii) **Every** prediction arm's advantage comes from prior
  response data of other learners; the retrieval tool reported that no strategy operated without such
  data and that the arms were fact-level, learner-level, hybrid, and domain-level
  `[fetch-reported, NOT quoted]`. So this paper is *also* a source for the population-requirement
  claim. (iii) Participant counts reached this collector only via paraphrase and are **not** quoted
  here; the verifier should read them off the paper. `[C1-EC: DONE — counts recorded above.]`
  (iv) ~~Funding and conflict-of-interest statements were **not located** in the retrieved text —
  flagged as unchecked, not as absent.~~ `RESOLVED by C1-EC — the COI EXISTS and is recorded above
  (system licensed to Noordhoff Publishers; project partially funded by those licence fees). F24 is
  NOT independent of the system it evaluates.` (v) **NEW (C1-EC): the 7.3 pp effect is in-session
  only — Experiment 1's delayed recall test returned a NULL.** Domain is
  fact/vocabulary learning (town names, Swahili–Dutch pairs), not strategy drills.

### F25: The SlimStampen/MemoryLab adaptive fact-learning system estimates a rate of forgetting "for each item and learner on the basis of the learner's accuracy and response time", continuously updated during the session — a per-learner, per-item parameter fitted with no population fit, and the estimates are stable over time though not across materials
- Provenance: PUBLISHED, peer-reviewed
- Access: **PubMed abstract retrieved and read; abstract-scope only.** Wiley full text returned
  HTTP 402 Payment Required; the research.rug.nl PDF returned HTTP 403. Body **not read by this
  collector.** Test–retest correlation values, sample sizes, and the limitations section were
  therefore **not obtained** — reported as a shortfall.
- **ACCESS STATE — C1-EC (2026-07-20), per V1d: the ABSTRACT is VERIFIED verbatim; the BODY is
  `UNVERIFIABLE`.** V1d independently confirmed the abstract quote below by a route C1-R2 did not try
  (PubMed E-utilities, PMID 26748838) — the quote is exact. The **body was blocked at three
  independent routes** (Wiley `pdfdirect` 403, Wiley `am-pdf` 403, research.rug.nl 403), confirming
  C1-R2's paywall report. Semantic Scholar lists an open-access PDF at BRONZE status that the
  publisher nonetheless refuses. **The test–retest reliability figures remain unobtained.**
  → routed to `source-lead-register`.
  **Consequence, and it is binding: no claim in this dossier may rest on F25's unread body.** In
  particular, "the estimates are stable over time though not across materials" is carried **on the
  abstract's own words only**, with **no reliability coefficient behind it anywhere in this dossier**.
  Note also that the falsification claim F25 was originally recruited to carry has been withdrawn
  (see HEAD STATEMENT 3′) — and it was withdrawn on evidence from **F24's full text**, not on F25's
  paywall, so F25's access limit is not what decides that question.
- Proposed status bucket: Evidence-backed (**abstract-scope only; body UNVERIFIABLE**)
- Proposed evidence-quality tier: Q3 (primary empirical study; proposed from the abstract only)
- Source(s): Sense, F., Behrens, F., Meijer, R.R., & van Rijn, H. (2016). "An Individual's Rate of
  Forgetting is Stable Over Time but Differs Across Materials." *Topics in Cognitive Science*, 8(1),
  305–321. DOI: 10.1111/tops.12183. PMID: 26748838 — https://pubmed.ncbi.nlm.nih.gov/26748838/
- Proposed supporting location: Abstract
- Claimed strength (exact quote): "By making optimal use of both and adjusting the system to the individual learner using cognitive models based on declarative memory theories, such systems consistently outperform traditional methods (Van Rijn, Van Maanen, & Van Woudenberg, 2009). This adjustment process is driven by a continuously updated estimate of the rate of forgetting for each item and learner on the basis of the learner's accuracy and response time. In this study, we investigated to what extent these estimates of individual rates of forgetting are stable over time and across different materials. We demonstrate that they are stable over time but not across materials."
- Caveats: **This is the counterexample V1b's M3 predicted** ~~, and it does falsify the dossier's
  "every single source" sentence~~ `STRUCK — OVERSTATED. C1-EC (2026-07-20) per V1d's RULING: it does
  NOT falsify that sentence. (a) The sentence enumerated BKT/PFA/DKT/IRT/education-Elo; this is an
  ACT-R rate of forgetting, a sixth family outside that enumeration. (b) Decisively, the 0.3 default
  the estimator starts from is population-derived by F24's own admission ("a reasonable average across
  materials and learners"). The correct characterisation is **population-LIGHT, not population-free**.
  See HEAD STATEMENT 3′ and the Sufficiency Statement replacement sentence.` — and it buys what it
  does buy at a price the product must price in. (i) The
  estimator is ~~population-free~~ `population-LIGHT (C1-EC)` but **model-specific**: it estimates a *rate of forgetting* inside an
  ACT-R declarative-memory model, not a general item difficulty, and it is the memory model — not the
  data — that supplies the structure. (ii) It requires a **response-time signal**, not just
  correctness; a product logging only correct/incorrect cannot run it. (iii) "Not stable across
  materials" is an explicit transfer warning: an estimate obtained on one material does not carry to
  another, which limits how far a blackjack-domain deployment could borrow from the published
  evidence. (iv) Abstract-scope; no reliability figure was obtained by this collector.

### F26: In the same research programme's fully open follow-up, the per-learner rate of forgetting starts from a fixed default of 0.3 and is "updated after each repetition of the item to reflect the response accuracy and latency of the participant" — and the attempt to set better *initial* parameters from pre-learning individual-difference measures (working memory, general cognitive ability) returned a NULL result
- Provenance: PUBLISHED, peer-reviewed, fully open access
- Access: Publisher full text (Frontiers, open) retrieved and read; **fetch-mediated.** This is the
  only F22–F26 source whose body was reachable **to C1-R2** in full.
- **C1-EC (2026-07-20) — EXAMINED, NO DEFECT FOUND. This is the cleanest finding in the pass.** V1d
  string-matched all four quotes against locally held full text: **4/4 verbatim.** n=66 confirmed;
  the homogeneity hedge confirmed. Nothing here needed correcting.
- **COI, for the record (C1-EC):** F26 declares the **opposite** of F24, verbatim: "The authors declare
  that the research was conducted in the absence of any commercial or financial relationships that
  could be construed as a potential conflict of interest." Both statements are recorded as made. Note
  that a clean COI declaration is **not** the same as independence — F26 is the same lab and the same
  system as F17, F24 and F25; see the **Source-independence disclosure** below.
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q3 (primary empirical study, correlational/individual-differences
  design; the authors report a failure to find the hypothesised relation)
- Source(s): Sense, F., Meijer, R.R., & van Rijn, H. (2018). "Exploration of the Rate of Forgetting
  as a Domain-Specific Individual Differences Measure." *Frontiers in Education*, 3, Article 112.
  DOI: 10.3389/feduc.2018.00112 —
  https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2018.00112/full
- Proposed supporting location: Abstract; Methods (parameter initialisation and update); Results
  (participant counts); Discussion (the null conclusion). **Section attributions are as reported by
  the retrieval tool and should be re-confirmed.**
- Claimed strength (exact quotes, four passages): "Typically, adaptive systems start a learning session with a set of default parameters, with these parameters being updated and adapted to the learner's characteristics when responses are collected." / "When a new item is introduced, the parameter starts with the default value of 0.3 and is subsequently updated after each repetition of the item to reflect the response accuracy and latency of the participant." / "Of the 126 participants in Session 1, 66 studied the Swahili-Dutch word-pairs using the adaptive system, which resulted in estimated *rates of forgetting* for those participants." / "However, given that we did not find a consistent relationship between a participant's WMC or GCA and their final *rate of forgetting*, we conclude that—at least in the current relatively homogeneous sample—neither of these domain-general measures would be a good candidate."
- Caveats: **This finding cuts in two directions at once and must not be reported as one-sided.**
  *For* the product: it documents, in an accessible full text, the exact architecture the product
  would use — start every item at a fixed default, adapt online from the single learner's own
  responses — and it does so in a deployed system. *Against* a neighbouring shortcut: it is a **null
  result** on precisely the strategy F16 (Park et al. 2019) is cited for, namely predicting a
  learner's starting parameter from pre-assessable individual differences. Read together with F16,
  the dossier now holds one abstract-scope positive (background covariates help) and one full-text
  null (WMC/GCA do not), and the null is the one whose body anyone in this program has actually read.
  The authors' own hedge — "at least in the current relatively homogeneous sample" — is preserved and
  not upgraded; n=66 on the adaptive system is small. This is a **conflict** with F16 and is logged
  below as candidate conflict #9.

### F27: (NO NEW SOURCE — deeper read of F19, already collected) Pelánek's 2017 UMUAI overview documents an entire model family that requires no population-fitted parameters at all — moving-average / exponential-moving-average baselines, classified as operating "without assumptions" — states that basic BKT does not use item difficulty at all, warns that individualized parameters "are fitted using only few data points", and concludes that simple models are preferable by default
- Provenance: PUBLISHED, peer-reviewed. **This source is already cited in this dossier as F19.**
- Access: **Strongest access in this pass.** The author's PDF was fetched and read directly as
  rendered pages (Fig. 4 and §§4.3.1, 5.1, 5.4, 6.4, 7.1 on pp. 14–32 of the preprint pagination).
  Quotes below were read off the page, not reported by a summarizer. F19 cited this same paper from
  its **abstract and §4.3.1 only**.
- **C1-EC (2026-07-20) — EXAMINED, NO DEFECT FOUND.** V1d re-extracted the author PDF and string-matched
  all five passages locally: **5/5 verbatim** after de-hyphenation, including Fig. 4's "without
  assumptions" classification. C1-R2's claim to have read the pages directly is corroborated by this
  being the only section with a perfect verbatim record. Left unchanged.
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q4 (authoritative narrative overview — unchanged from F19)
- Source(s): Pelánek, R. (2017). "Bayesian knowledge tracing, logistic models, and beyond: an
  overview of learner modeling techniques." *User Modeling and User-Adapted Interaction*, 27(3–5),
  313–350. DOI: 10.1007/s11257-017-9193-2. Author's PDF:
  https://www.fi.muni.cz/~xpelanek/publications/umuai-overview.pdf
  (Note V1c's warning: the hosted PDF is an accepted preprint with suppressed running heads and no
  journal pagination; page numbers cited here are the **preprint's own** page numbers.)
- Proposed supporting location: §5.1 "Modeling Learning and Forgetting" (p. 17) and Fig. 4 (p. 16);
  §4.3.1 (p. 14); §5.4 "Learner Clustering and Individualization" (p. 22); §6.4 "Data Collection"
  (p. 30); §7.1 "Developers' Perspective" (p. 32).
- Claimed strength (exact quotes, five passages):
  §5.1 — "BKT and logistic models differ in their basic assumptions about learning. An alternative approach is to avoid making any specific assumptions about learning. This can be done by using simple approaches like computing a moving average of answer correctness. These simple methods are not based on any specific assumptions about learning, but by discarding or discounting past answers they can model changing skills. A specific simple, yet useful technique is the exponential moving average, where past attempts are weighted by an exponentially decreasing function. Such simple techniques often provide reasonable predictions (Pelánek, 2014; Wauters et al., 2012) and have pragmatic advantages such as the ease of application and computational efficiency. Moreover, the absence of specific assumptions about learning may be an advantage in some circumstances, e.g., a smaller impact of misspecified knowledge components."
  Fig. 4 (p. 16) classifies "baselines — (exponential) moving average" under the heading "**without assumptions**", opposite "based on assumptions about learning" (BKT, logistic models).
  §4.3.1 (basic BKT data requirements) — "Local domain data: not used in the basic model; extensions of BKT contain such parameters as item difficulties (Pardos and Heffernan, 2011)."
  §5.4 — "Individualization increases the number of model parameters and carries the risk of overfitting. The individualized parameters are fitted using only few data points and thus can be significantly influenced by the noise in data."
  §6.4 — "For example, if data are collected using an adaptive system that provides learners with items of appropriate difficulty, even a simple baseline model achieves a good predictive accuracy and differences between models may become small even though the consequences of using different models in an application would be large (Pelánek et al., 2016)."
  §7.1 — "From the developers' perspective it is thus preferable to use simple learner models unless there is a clear reason to prefer more complex models." and, quoting VanLehn (2006), "it is easy to get carried away by the sheer intellectual challenge of assessment and to overbuild this part of the tutoring system".
- Caveats: **This is the program's dominant defect recurring, and it should be recorded as such
  rather than presented as a discovery.** Every passage above sat inside a paper the dossier had
  already collected and cited (F19) — the earlier pass read its abstract and one subsection, and the
  material bearing hardest on the load-bearing question was three sections away. Limits on what it
  supports: (i) Q4 tier — this is an authoritative overview asserting a position and pointing at
  primary work (Pelánek 2014; Wauters et al. 2012), **not** a measured result; the primary sources
  behind "often provide reasonable predictions" were **not** collected in this pass and remain
  uncollected. (ii) The moving-average family answers "can you run with no population-fitted
  parameters?" with a yes, but at the cost of estimating **no mastery quantity at all** — it
  discounts past answers rather than modelling knowledge, so it does not satisfy a product
  requirement for an interpretable mastery estimate; that trade must be stated, not elided.
  (iii) §6.4's point cuts both ways and is worth carrying into synthesis intact: under adaptive item
  selection even a simple baseline looks accurate, *and* small metric differences can still have
  large application consequences — so predictive-accuracy comparisons are a weak basis for this
  product's choice in either direction.

## SOURCE-INDEPENDENCE DISCLOSURE — added by editorial pass (C1-EC, 2026-07-20)

> Surfaced by V1d. **The dossier nowhere said this, and it should have.** This is the same class of
> defect as counting vendor-authored sources as independent corroboration.

**Four of this dossier's citations bearing on its central question are one lab, one system, one
commercial lineage.**

| Finding | Source | Lab | System |
|---|---|---|---|
| **F17** | van der Velde, Sense, Borst & van Rijn (2024), *UMUAI* 34:1467–1491 | University of Groningen (van Rijn group) | SlimStampen / MemoryLab |
| **F24** | van der Velde, Sense, Borst & van Rijn (2021), *Comput Brain Behav* 4(2) | same | same |
| **F25** | Sense, Behrens, Meijer & van Rijn (2016), *Topics in Cognitive Science* 8(1) | same | same |
| **F26** | Sense, Meijer & van Rijn (2018), *Frontiers in Education* 3:112 | same | same |

All four are authored by the same University of Groningen group (van Rijn, Sense, van der Velde,
Meijer) and all concern the same SlimStampen/MemoryLab adaptive fact-learning system. **F24 discloses
that the system is commercially licensed to Noordhoff Publishers by the University of Groningen and
that the study was partially funded by those licence fees.**

**Consequences that must be carried into synthesis:**

1. **These four citations are not four independent lines of evidence.** They are four reports from one
   research programme about one artefact. Counting them as mutual corroboration overstates the
   evidence base for the "a population-light estimator exists and works" claim — which is precisely
   the claim they are load-bearing for.
2. **F24 in particular cannot be counted as independent corroboration of SlimStampen**, being
   developer-authored and partially funded by licence revenue from the evaluated system.
3. **No independent replication of the SlimStampen rate-of-forgetting estimator by a group outside
   Groningen exists in this dossier.** That is now recorded as a real limit on the weight the
   population-light finding can carry, not as an oversight to be fixed by more collection from the
   same lineage.
4. This does **not** disqualify the four sources. F24 is randomised and preregistered; F26 is fully
   open with a clean COI declaration and reports a null against its own hypothesis. The point is the
   **concentration**, which the dossier previously left unstated.

## COVERAGE GAPS — SETTLED, DO NOT RE-RUN (added by editorial pass, C1-EC, 2026-07-20)

> Per V1d. These two gaps have now survived **three collection passes** (C1, C1-FP, C1-R2) **plus an
> independent verifier's own searching**. V1d ran independent web search on small/fixed/expert-authored
> item banks with no response data and found **no landmark this dossier has missed** on the core
> question.

| Gap | State | Ruling |
|---|---|---|
| **(a) No evaluation on a small, fixed, expert-authored item bank** | **SETTLED COVERAGE GAP** | "We looked hard and it is not there." A legitimate **research result**, not a collection failure. |
| **(b) No strategy-game, card-game or gambling-adjacent domain evidence** | **SETTLED COVERAGE GAP** | Same. |

**Further collection passes against either gap should be REFUSED.** They are recorded here as settled
absences so that no downstream pass re-spends budget rediscovering them.

**What this changes and what it does not:** it converts two open collection tasks into two closed
research findings. It does **not** weaken the head statement — on the contrary, a settled absence of
domain-matched evidence is exactly why the mastery-model choice remains a **Product judgement** rather
than an Evidence-backed decision.

## Candidate conflicts noticed — added by remediation pass (C1-R2)

> Numbering continues after #8. Not written to `registers/conflict-register.md` by this collector —
> returned in the response text per the dispatch brief.

- **Conflict #9: can a learner's *initial* model parameter be usefully predicted from pre-assessable
  individual differences?** Side A: Park et al. (2019) (F16, abstract-scope, claim already narrowed
  by V1c to simulation-only) report that explanatory-IRT estimation of ability from "background
  information and past trajectories of learning" "substantially reduces ability estimation errors."
  Side B: Sense, Meijer & van Rijn (2018) (F26, **full text read**) report a null — "we did not find
  a consistent relationship between a participant's WMC or GCA and their final *rate of forgetting*"
  — and conclude neither domain-general measure "would be a good candidate." Status: open, and
  **asymmetric in access**: the null is full-text and the positive is abstract-scope, which is the
  reverse of the usual bias. Not a clean contradiction — different parameters (IRT ability vs
  ACT-R rate of forgetting), different covariates (background/trajectory vs WMC/GCA), and F26's
  sample is small (n=66) and self-described as homogeneous. Affected areas: whether any pre-learning
  covariate is worth collecting at product start-up.

- **Conflict #10 (added by C1-EC, 2026-07-20; NOT written to the shared register — returned in text):
  F22's own body vs its own abstract on where LLM difficulty estimation sits relative to human
  experts.** Side A (abstract, which is all the dossier previously carried): some configurations
  "approached the upper end of the accuracy range reported for human experts in previous research."
  Side B (§4.1, body): observed correlations "were lower than those reported for pooled human
  judgements, such as the mean correlation of .70 in Attali et al. (2014), and lower than the value of
  .76 reported by Yancey et al. (2024) for automated estimation of newly generated word stems."
  Status: **not a contradiction** — the abstract compares to *individual* raters, the body to *pooled*
  ones — but **a dossier quoting only the abstract overstates the method**, which is exactly what this
  dossier did until this pass. Affected areas: whether LLM-set difficulties are good enough to seed a
  product item bank.

- **Conflict-adjacent, registered as a disclosure rather than a conflict (C1-EC): source-independence
  concentration on C1's load-bearing question** — F17/F24/F25/F26 are one lab, one system, one
  commercial lineage. Written up in full in the **SOURCE-INDEPENDENCE DISCLOSURE** section above.

## Coverage gaps — added by remediation pass (C1-R2)

- ~~**F22 and F23 were not read past their abstracts, and both are preprints.** The two sources that
  speak most directly to the product's literal configuration are the two whose bodies nobody in this
  program has opened. **No numeric accuracy figure for zero-response difficulty estimation exists
  anywhere in this dossier** — F22's "moderate to strong" is the strongest characterisation held.
  V1c hoped this pass would "record the measured correlation/error, not the framing"; it did not,
  and that shortfall is stated here rather than disguised.~~
  > **`STRUCK — NO LONGER TRUE. C1-EC (2026-07-20).`** V1d obtained **both** bodies by an independent
  > route (`curl` + `pdftotext -layout` + local string match). The numeric accuracy figures **do now
  > exist in this dossier** — see F22: Spearman **.633–.673** aggregate, **.732** best configuration,
  > **.252–.847** by domain, **below pooled human judgement (.70)** and **below an existing automated
  > method (.76)**, on a **relative scale only**. V1c's request is now satisfied. Both sources remain
  > **preprints**, which is unchanged. **This was the program's dominant defect recurring for the fifth
  > time — material sitting inside an already-cited source.** In fairness to C1-R2, and unlike the
  > previous four instances, the cause was a genuine tooling block that it **reported honestly rather
  > than concealed**.
- **F25's body is also unread** (paywalled two ways) — **now formally `UNVERIFIABLE` (C1-EC): blocked
  at three independent routes, confirmed by V1d.** The rate-of-forgetting test–retest reliability
  figures — the numbers that would say how *good* the population-light estimator actually is — were
  not obtained and are routed to the source-lead register. F26 partially compensates but measures a
  different thing. **No claim in this dossier may rest on F25's unread body.**
- **The primary sources behind F27's key claim were not collected.** Pelánek 2017 attributes
  "reasonable predictions" from moving-average baselines to Pelánek (2014) and Wauters et al. (2012);
  neither was retrieved. The assumption-free-baseline path therefore rests on a Q4 assertion, not on
  a measured result — the same shape of shortfall V1c flagged as V1c-C.
- **Still no small-fixed-expert-authored-bank evidence and still no strategy/card-game domain
  evidence**, across all 26 citations. Unchanged from both prior passes. **→ C1-EC: both are now
  recorded as SETTLED COVERAGE GAPs — do not re-run.** See "COVERAGE GAPS — SETTLED, DO NOT RE-RUN"
  above.
- **Not chased (recorded as leads, per scope discipline):** *Evolutionary Features for Mitigating
  Cold Starts in Logistic Knowledge Tracing* (EDM 2025); Yudelson, Koedinger & Gordon (2013)
  individualized BKT; van Rijn, van Maanen & van Woudenberg (2009), the SlimStampen system paper
  cited inside F25's abstract; Wauters et al. (2012) and Pelánek (2014) per the gap above;
  arXiv:2504.08804 and the ENEM benchmark (arXiv:2602.06631), two further LLM-difficulty papers
  surfaced by search and deliberately left uncollected to stay inside the named gap.

## Remediation-pass self-QA (C1-R2)

> **`STALE HISTORICAL SNAPSHOT — C1-EC (2026-07-20).`** This checklist records C1-R2's state at the
> time it returned and is left otherwise unedited **for auditability**. It is **not** current status.
> Three of its items have since been overtaken: (a) "F22 body not extractable" — the body **was**
> obtained by V1d; (b) "F22/F25/F27 cut *for* [the zero-data path]" — **F22 now cuts both ways**, its
> measured figures being mixed-to-modest and below pooled human judgement; (c) the pass's own headline
> falsification claim was **overstated** and has been narrowed (HEAD STATEMENT 3′). One item is
> **confirmed** rather than overtaken: the honesty of the access-limit reporting, which V1d tested and
> upheld in every particular.

- [x] Only the one gap V1c named was targeted. Q1/Q2/Q3 were not re-opened; Bundles A and C untouched.
- [x] No existing finding, quote, tier, section, or sufficiency statement was altered or deleted. The
      only non-append edit is the clearly-labelled HEAD STATEMENT insertion, which removes nothing and
      exists to satisfy this card's standing obligation.
- [x] 5 new citations (F22–F26), within the 4–6 target. F27 adds **no** new source and is counted
      separately as a re-read of F19.
- [x] **The dominant-defect check was run first and it caught something** — F27 came from reading a
      source already in hand, and it is the most usable result in this pass.
- [x] Access limits are stated as failures, not smoothed over: F22 body not extractable, F25 paywalled
      two ways, F24's funding statement not located, and **all** F22–F26 quotes flagged as
      fetch-mediated rather than locally string-matched.
- [x] Both directions collected: F24 cuts against the zero-data path (measured cost), F22/F25/F27 cut
      for it, F23 and F26 cut both ways. No side was collected alone.
- [x] The brief's "known context you must not contradict" was checked line by line; nothing here
      contradicts it. In particular "~100 students" is not quoted as measured anywhere in this pass.
- [x] Nothing was written to the shared registers by this collector.

## Findings added by bounded amendment-6 top-up (C1-W "Wauters pass", 2026-07-20)

> **SCOPE OF THIS PASS — ONE SOURCE, APPEND-ONLY.** This pass was dispatched to collect exactly one
> lead: Wauters, Desmet & Van den Noortgate (2012), named by V1d as "the one uncollected lead that
> would move a conclusion" and a primary source behind F27's Q4 claim. **Authorisation:** amendment 6
> (evidence already specifically identified) and amendment 5 (sufficiency top-ups exempt from the
> citation cap). **Nothing above this heading was altered, deleted, or rewritten by C1-W.**
>
> **Citation accounting, kept separable:** running total was **26**. C1-W adds **1 new source read in
> full** (the EDM 2011 primary, F28) and **1 partially-obtained source** (the 2012 journal article,
> F29 — abstract verified verbatim from the authors' institutional repository, **body UNVERIFIABLE**).
> New running total: **27 full + 1 partial**.
>
> **ACCESS ROUTE — stronger than C1-R2's.** Unlike C1-R2, this pass had `curl` + `pdftotext` + local
> string matching. Every quotation in F28 was matched against a locally-extracted text layer of a PDF
> downloaded in-session (HTTP 200, 367,851 bytes, 7 pages). F28 is therefore **confirmed-verbatim by
> the collector's own extraction**, not fetch-mediated. F29's abstract was extracted from a locally
> downloaded HTML page (HTTP 200), not summarised by a model.

### F28: Domain experts rating item difficulty **with zero learner response data** achieved Pearson r = 0.80 against a population-calibrated IRT reference — the measured accuracy figure for judgmental difficulty estimation that this program has been missing for three passes; but the same study's paired-comparison method, and the reference standard itself, are both population-derived

- Provenance: **PEER-REVIEWED CONFERENCE PAPER**, EDM 2011 proceedings; DBLP records it as
  "Nominee for Best Paper Award" (dblp key `conf/edm/WautersDN11`, access: open).
- Access: **FULL TEXT, READ IN FULL, LOCALLY EXTRACTED.** PDF downloaded in-session from the official
  EDM proceedings host and converted with `pdftotext -layout`. All quotes below string-matched
  against that local text. **This is the strongest-access finding in the C1 dossier.**
- Proposed status bucket: **Evidence-backed**
- Proposed evidence-quality tier: **Q3** (primary empirical study, real data, explicit reference
  standard, full correlation matrix reported) — with a **precision caveat**: n = 25 items, df = 23,
  so every coefficient below is imprecisely estimated and the paper reports no confidence intervals.
- Source: Wauters, K., Desmet, P., & Van Den Noortgate, W. (2011). "Acquiring Item Difficulty
  Estimates: a Collaborative Effort of Data and Judgment." *Proceedings of the 4th International
  Conference on Educational Data Mining (EDM 2011)*, pp. 121–128.
  https://educationaldatamining.org/EDM2011/wp-content/uploads/proc/edm2011_paper37_full_Wauters.pdf
- Proposed supporting location: §2.1.5 Expert Rating; §2.2.1 Material and Procedure; §2.3 Results,
  **Table I**; §3 Discussion.

**THE NUMBER (Table I and §2.3, verbatim):**

> "The results of the Pearson correlation between the estimated item difficulty parameter and the true item difficulty parameter indicates that proportion correct has the strongest relation (r(23)=0.90, p<0.01), followed by learner feedback (r(23)=0.88, p<0.01), Elo rating (r(23)=0.85, p<0.01), expert rating (r(23)=0.80, p<0.01), paired comparison based on learners' feedback (r(23)=0.62, p<0.01) and paired comparison based on expert data (r(23)=0.56, p<0.01)."

Table I, correlations against `True β` (the reference standard), transcribed from the PDF's own table:
IRT-Study **.90**; Proportion Correct **.90**; Learner Feedback **0.88**; **Expert Rating 0.80**;
Paired Comparison (learner) **0.62**; Paired Comparison (Expert) **0.56**; Elo Rating **0.85**.

**HOW MANY RESPONSES THE EXPERT ARM STILL NEEDS: ZERO.** The expert arm consumed no learner response
data at all. §2.2.1, verbatim, is the entire expert protocol:

> "Experts completed the pretest used as an example. This pretest consisted of one item with three subquestions. First, the expert had to fill in the correct French verb conjugation. Second, the expert was asked: "What is, according to you, the percentage of students that will answer this item correctly after completing secondary education?". Finally, the expert was asked to judge where the presented item should be located in the presented series of 11 items ordered by difficulty level from easy to difficult."

Thirteen experts. Twenty-five items. No learner responses required to produce the estimate.

**DOES IT REMOVE OR RELOCATE THE POPULATION REQUIREMENT? BOTH — AND THE SPLIT IS THE FINDING.**
This must be stated with the same precision the dossier applied to F23, and it **does not revive the
claim V1d ruled against**:

1. **Expert rating — genuinely response-free at estimation time, but population-*referenced* in its
   construct.** No responses are collected. However the question put to the expert is *literally* a
   request to predict a population statistic: "the percentage of students that will answer this item
   correctly after completing secondary education". The expert is not asked what is intrinsically
   hard; the expert is asked to simulate a reference population from memory. This is the **exact
   pattern V1d named: population-light, not population-free.** The requirement is discharged by
   expert priors rather than by data collection — it is not abolished.
2. **Paired / one-to-many comparison — explicitly RELOCATED, in the same manner as F23.** §2.1.4,
   verbatim: raters place the new item in "a series of 11 items ordered by difficulty level from easy
   to difficult... This means that the raters have to make a one-to-many comparison with 11 items of
   which the item difficulty parameter is known." Those anchors are population-calibrated: "b1 is the
   difficulty parameter of item 1 as estimated by the preliminary IRT analysis, conducted by Selor."
   **A response-calibrated anchor set is a precondition.** Same relocation defect as F23, and it is
   also the *worst-performing* method in the study (.56 / .62).
3. **The reference standard is population-derived.** §2.1.1, verbatim: "IRT-based calibration
   conducted on preliminary examinee data by Selor, the selection agency of the Belgian government,
   serves as true difficulty parameter values." So r = 0.80 is agreement *with* a population
   calibration, not independence *from* one.

**WHERE 0.80 SITS AGAINST THE FIGURES ALREADY IN THIS DOSSIER — comparison must be made carefully.**
0.80 is numerically above F22's LLM band (Spearman .633–.673 aggregate, .732 best), above the pooled
human .70 (Attali et al. 2014) and above the automated .76 (Yancey et al. 2024) that F22's body cites.
**Do not report this as a clean win.** Four reasons the comparison is not like-for-like: (i) Pearson
here vs Spearman in F22; (ii) 25 items and df = 23 with no CIs, vs F22's bootstrap intervals across
six domains; (iii) different domain (French verb conjugation, single skill) and different reference
standard; (iv) F22's comparators are drawn from a different literature. The defensible statement is
narrow: **expert judgement with zero response data has been measured at r = 0.80 against a
population-calibrated reference in one small single-skill study** — not that expert rating beats LLMs.

**IS THIS THE ".76 EXISTING AUTOMATED METHOD"? NO — checked explicitly, as the brief required.**
F22's body attributes .76 to **Yancey et al. (2024)**, BERT-IRT on newly generated word stems, and
.70 to **Attali et al. (2014)**. Neither is Wauters. This source is unrelated to both.

**SOURCE INDEPENDENCE — this source is fully independent of the four-source cluster.** F17/F24/F25/F26
are one lab (Groningen / van Rijn), one system (SlimStampen/MemoryLab), one commercial lineage
(Noordhoff licence fees). F28 is **ITEC, Katholieke Universiteit Leuven, Belgium** — a different
country, lab, system, and domain, with no disclosed commercial interest and none apparent. It is also
independent of Pelánek's Masaryk group (F19/F27), which merely *cites* it. **This materially improves
the dossier's independence profile**, which the C1-EC disclosure flagged as a weakness.

- **Additional measured results worth carrying (all verbatim from §2.3):**
  - Expert inter-rater agreement was the study's best judgmental agreement: "The inter-rater
    agreement for the classification of the item difficulty by experts was good (ICC[3,1]=0.68 for
    expert rating and for paired comparison)." Learner agreement was weaker: "fair (ICC[3,1]=0.42 for
    learner feedback; ICC[3,1]=0.43 for paired comparison)."
  - **A result that cuts against the "trust the expert" instinct:** learners out-performed experts,
    significantly. §3: "findings indicate that learners perform better on judging the difficulty of
    items than experts." §2.3: "The difference between the correlation coefficient of learner feedback
    with the true difficulty parameter value and the correlation coefficient of expert rating with the
    true difficulty parameter value is significant (t(22)=2.71, p<0.05)." The authors immediately
    caveat it: "It needs to be considered that the estimation by means of learner feedback is based on
    a larger sample than the estimation by means of expert rating, which could explain the difference".
  - **A prior expectation the study overturned.** §3: "Results contradict the postulation of Impara
    and Plake (1998) that experts perform better in estimating the difficulty by rank ordering the
    items than by estimating the proportion of persons who will answer the items correctly." The
    absolute-percentage judgement (.80) beat the rank-ordering judgement (.56). **This is a
    directly product-relevant design signal** and it points the opposite way to the intuition that
    ranking is the easier expert task.
  - Sample dependence, §3: "it is clear that proportion correct and the Elo rating system are sample
    dependent as they correlate higher with the IRT calibration on the study data than with the true
    difficulty parameter values." Expert rating is, by construction, not sample dependent in this way.

- **Caveats and transfer — the load-bearing limits.**
  1. **The authors' own generalisation disclaimer, verbatim (§3):** "A limitation of this study, which
     should be tackled in future research, is the fact that even though some of the alternative item
     difficulty estimation methods seem to be a viable alternative for IRT-based calibration in this
     study, no generalization can yet be made to other domains and to items requiring more than one
     skill." **Blackjack decision drills are a different domain and are plausibly multi-skill
     (hand-total arithmetic, rule recall, count adjustment). The authors disclaim this transfer
     themselves.** This is the single most important sentence in the source for this product.
  2. **Item-set size, verbatim (§3):** "We recognize that a total number of twenty five items is
     limited, but considering raters fatigue, we were compelled to keep the item set rather small.
     Furthermore, we made sure that the twenty five items covered a broad range of difficulty."
  3. **PARTIAL RELIEF ON A SETTLED COVERAGE GAP — record honestly, do not overclaim.** The settled
     gap "(a) no evaluation on a small, fixed, expert-authored item bank" is **partially and
     imperfectly** relieved: a 25-item fixed bank of expert-authored single-skill drill items, rated
     by 13 subject experts, is the **closest structural match to this product's situation anywhere in
     the C1 dossier**. It remains imperfect — the difficulty *ground truth* came from a government
     selection agency's prior population calibration, which this product would not have. **This does
     not justify re-opening the settled gap**; it is a partial, incidental relief found inside a
     source collected for another reason, and gap (b) — strategy/card-game domain evidence — is
     untouched.
  4. **The reference-population asymmetry is the real transfer risk.** The 13 experts were French
     teachers estimating performance of Belgian students "after completing secondary education" — a
     population they teach and have calibrated intuitions about. **A blackjack trainer's author has no
     equivalent grounded reference population.** The r = 0.80 should be read as an *upper* bound for
     this product's situation, not a central estimate.
  5. **This does not measure a mastery model.** Like F27, it addresses item difficulty only. It says
     nothing about tracking a learner's changing skill.

### F29: The 2012 journal article behind F27 — citation confirmed, abstract verified verbatim from the authors' own institutional repository, **body UNVERIFIABLE (closed access, no OA copy exists by any route tried)**

- Provenance: **PEER-REVIEWED JOURNAL ARTICLE.**
- Access: **PARTIAL — abstract verified, body UNVERIFIABLE.** Recorded as a failure, not smoothed over.
- Proposed status bucket: **Evidence-backed (abstract-scope only)** — with a hard strength ceiling.
- Proposed evidence-quality tier: **Q4 while body-unread.** Do not tier it higher on the strength of
  an abstract; that is the exact defect C1-EC corrected in F22.
- Source: Wauters, K., Desmet, P., & Van Den Noortgate, W. (2012). "Item difficulty estimation: An
  auspicious collaboration between data and judgment." *Computers & Education*, 58(4), 1183–1193.
  DOI: 10.1016/j.compedu.2011.11.020. **Citation independently confirmed against the Crossref record
  for that DOI** (publisher Elsevier BV, volume 58, issue 4, pages 1183–1193, published print May
  2012, 35 references) **and against the KU Leuven Lirias record**, https://lirias.kuleuven.be/108844.
  V1d's rendering of the title as "judgement" is the ResearchGate spelling; **Crossref and the
  publisher record both spell it "judgment"**, and Crossref gives the author surname as
  "Van Den Noortgate".
- **Retrieval attempts, all of them, so this is not re-run blindly:** Unpaywall (`is_oa: false`,
  `oa_status: "closed"`, **zero** OA locations); OpenAlex (`is_oa: false`, `any_repository_has_fulltext:
  false`, only location is the DOI landing page); Semantic Scholar Graph API (`openAccessPdf.status:
  "CLOSED"`, empty URL, abstract elided by publisher); ScienceDirect article page (HTTP 403);
  ResearchGate record (HTTP 403, "Request PDF" only); CORE API (Crossref metadata stub, no full text);
  CiteSeerX (unreachable); KU Leuven Lirias record page (HTTP 200, but "Download PDF (external
  access)" only — no deposited file); the authors' PhD-thesis record in Lirias
  (`Adaptive item sequencing in item-based learning environments`, uuid
  `c08a2ccd-44c5-4546-a2bc-2556e941db07`) — **queried its bundles endpoint: zero bitstreams deposited.**
  No paywall was circumvented and no pirate mirror was used.
- **Abstract, verbatim, extracted from the Lirias record page** (the authors' own institution's
  repository — the most authoritative abstract source short of the publisher):

  > "The evolution from static to dynamic electronic learning environments has stimulated the research on adaptive item sequencing. A prerequisite for adaptive item sequencing, in which the difficulty of the item is constantly matched to the ability level of the learner, is to have items with a known difficulty level. The difficulty level can be estimated by means of the item response theory (IRT). However, the requirement of a large sample size for calibrating items based on IRT models is not easily met in many practical learning situations. The aim of this paper is to search for relatively simple and fast alternative estimation methods and to review the accuracy of these methods as compared to IRT-based calibration in one single setting, and this for various sample sizes. Using real data, six alternative estimation methods are compared next to IRT-based calibration: proportion correct, learner feedback, expert rating, one-to-many comparison (learner), one-to-many comparison (expert) and the Elo rating system. Results indicate that proportion correct has the strongest relation with IRT-based difficulty estimates, followed by learner feedback, the Elo rating system, expert rating and finally one-to-many comparison. Learner feedback and one-to-many comparison (learner) provide stable estimates even with a small sample size. IRT, proportion correct and the Elo rating system provide reliable estimates, especially with a sample size of 200-250 learners. The alternative estimation methods can be utilized for adaptive item sequencing when IRT-based calibration does not yet provide reliable estimates or can be used as a prior in a Bayesian estimation method."

- **Relationship to F28 — stated plainly so the two are not double-counted.** F29 is the journal
  extension of F28. Same authors, same six methods, same ranking of results, and the terminology is
  renamed ("paired comparison" in F28 → "one-to-many comparison" in F29). **F28's own §3 announces
  F29's added contribution:** "Future research will focus on the sample size requirement for reliable
  difficulty estimates. The different alternative estimation methods will be compared for different
  sample sizes." **The sample-size analysis is the part of F29 that F28 does not contain, and it is
  precisely the part whose body could not be obtained.** Treat F28 and F29 as **one research
  programme, not two independent corroborations.**
- **The abstract-scope sample-size sentence, and the strict limit on using it.** The abstract states
  "IRT, proportion correct and the Elo rating system provide reliable estimates, especially with a
  sample size of 200-250 learners." **This is adjacent to the dossier's open "~100 students" question
  and must not be conscripted into it.** Three constraints: (i) it is **abstract-scope, body unread** —
  the operational definition of "reliable" and the shape of the accuracy-vs-n curve are unknown;
  (ii) "especially with" is not a threshold claim and must never be quoted as one; (iii) it does not
  measure Pelánek's ~100 rule of thumb, which **remains an unmeasured rule of thumb (Q4)** — nothing
  in this pass changes that. What can be said is weaker and still useful: **one abstract from an
  independent lab names a working figure in the low hundreds rather than ~100, and it is unverified.**
- **A CANDIDATE CONFLICT THIS PASS IS OBLIGED TO REGISTER — see the conflicts section below.**

## Candidate conflicts noticed — added by amendment-6 top-up (C1-W)

- **Pelánek's citation of Wauters et al. (2012) may not support the proposition F27 attaches to it.**
  F27 rests on Pelánek 2017 §5.1, which says moving-average / exponential-moving-average techniques
  "often provide reasonable predictions (Pelánek, 2014; Wauters et al., 2012)." **The Wauters
  research programme, as far as this pass could read it, does not test a moving average.** F28 —
  read in full — evaluates six methods (IRT, proportion correct, learner feedback, expert rating,
  paired comparison ×2, Elo) and **none of them is a moving average**; the strings "moving average"
  and "exponential" do not appear in it. F29's verified abstract lists the same six and likewise names
  no moving average. **Registered as a CANDIDATE conflict, not a defect**, with an explicit access
  caveat: F29's body is unread, and it is possible the journal version adds a moving-average condition
  the conference version lacked. The nearest thing in F28 is *proportion correct*, a running
  aggregate over all responses, which is a plausible loose referent for "simple technique" — and it
  performed best of all (r = .90 vs true β, r = 1.00 vs study IRT). **So the direction of F27's claim
  survives even if its citation is loose; only the precision of the attribution is in question.**
  Resolving this needs F29's body, which is UNVERIFIABLE. **Do not re-run collection for it.**

## Does this change F27's Q4 grade? — C1-W's proposed answer

**NO. F27 should remain Q4.** Stated plainly, because the temptation runs the other way.

The reasoning V1d anticipated was: F27 is Q4 partly *because* its primaries were uncollected, so
collecting one should lift it. **That does not follow here**, for three reasons:

1. **One of two primaries was obtained, and only partially.** Pelánek cites *two* primaries
   (Pelánek 2014; Wauters et al. 2012). Pelánek 2014 remains uncollected — and it is by the same
   author as the overview, so collecting it would not add independence anyway. Of the Wauters
   primary, the journal body is UNVERIFIABLE; what was read in full is its **conference precursor**.
2. **The primary substantiates an adjacent proposition, not F27's.** Per the candidate conflict
   above, F27's Q4 claim is about **moving-average mastery baselines**; the Wauters programme is about
   **item-difficulty estimation**. A primary that does not test the cited technique cannot upgrade the
   tier of the claim about that technique.
3. **F27's Q4 was never solely about uncollected primaries.** F27's own caveat records a second,
   independent reason: it is "an authoritative overview asserting a position", i.e. a narrative
   secondary source. That reason is untouched by this pass.

**What DID change is not F27's tier but the dossier's evidence base**, and this is the honest
statement of the pass's value: the dossier now holds, for the first time, **a measured accuracy figure
for zero-response-data expert difficulty estimation (r = 0.80), from a peer-reviewed primary study,
read in full by direct local extraction, from a lab wholly independent of every other source in this
dossier.** That is a real gain. It is not a tier change to F27.

## Effect on the HEAD STATEMENT — C1-W's proposed answer

**The HEAD STATEMENT's verdict stands and should not be softened. Two of its clauses now need a
factual update, both narrowing rather than reversing.**

- The HEAD STATEMENT says the zero-population step's feasibility side is "weaker than C1-R2 believed."
  **That remains true, but it is now better evidenced and slightly less bleak**: expert rating at
  r = 0.80 with zero learner responses is a stronger showing than F22's LLM band, from a peer-reviewed
  primary rather than a preprint. **The correct amendment is one sentence of fact, not a change of
  verdict**, and it must carry F28's caveats 1–4 with it or it will be read as licence.
- **"Everything calibrates from a population" is still NOT falsified, and C1-W explicitly does not
  revive that claim.** F28 is the cleanest illustration of *why* V1d was right: the expert arm
  collects no responses, yet the question put to the expert is literally *"What is, according to you,
  the percentage of students that will answer this item correctly after completing secondary
  education?"*, and the yardstick is a government agency's population calibration.
  **Population-light, not population-free** — V1d's term is exactly right and F28 confirms it from a
  new direction.
- **The mastery-model choice remains a Product judgement**, unchanged. F28 is about item difficulty,
  not about tracking changing skill.

## Adjacent leads registered, NOT chased (C1-W)

Scope was one source; these were encountered inside it and are recorded rather than pursued.

- **Impara, J.C., & Plake, B.S. (1998).** "Teachers' Ability to Estimate item Difficulty: a Test of
  the Assumptions in the Angoff Standard Setting Method." *Journal of Educational Measurement*, 35(1),
  69–81. **Highest-value lead found.** F28 explicitly **contradicts** it, so it is a live disagreement
  in the literature on the exact question of whether experts can estimate difficulty without data.
  Cited from F28's reference list; **not retrieved, not read** by this pass.
- **Chalifour, C.L., & Powers, D.E. (1989)**, *Journal of Educational Measurement*, 26, 120–132 —
  F28 cites it as evidence experts *can* estimate difficulty accurately. **Hambleton, R.K., Bastari,
  & Xing, D. (1998)**, Report No. 298, University of Massachusetts — F28 cites it as "contradictory
  results". Together these two are the pro/con pair beneath F28's §2.1.5. Neither retrieved.
- **Johns, J., Mahadevan, S., & Woolf, B. (2006).** F28 §2.1.2 reports, verbatim: "Johns, Mahadevan
  and Woolf (2006) have compared the item difficulty level obtained by IRT estimation with the
  percentage of students who have answered the item incorrectly, and found a high correlation
  (r=0.68)." **Second-hand figure — recorded as a lead, not as a dossier finding.**
- **Wauters, Desmet & Van den Noortgate (2010)**, *JCAL* 26(6), 549–562 — the programme's earlier
  paper, cited by F28 for the claim that in free-choice learning environments "many exercises are only
  made by few learners". **Directly relevant to this dossier's degenerate-difficulty concern
  (items attempted by ~1 student).** Not retrieved.
- **Brinkhuis, M.J.S., & Maris, G. (2010)**, Cito Report 2010-1 — the Elo implementation F28 used.
  Note Brinkhuis is also a co-author of **F22**, so this is a **partial dependency between F22 and
  F28's Elo arm** and should not be treated as full independence on that specific arm. **F28's expert
  rating arm — the finding that matters — is unaffected.**

## Amendment-6 top-up self-QA (C1-W)

- [x] **Scope held to one source.** One lead dispatched; one research programme collected (F28 read in
      full, F29 partial). No broadening. Five adjacent leads registered instead of chased.
- [x] **No `git` command was run at any point.** No build, test, or install command was run.
- [x] **Nothing outside `journal/raw/_inbox/foundation-audit-p1/` was written or modified.**
- [x] **Append-only respected.** No existing finding was altered, deleted, renumbered, or rewritten.
      Proposed HEAD STATEMENT/F27 changes are stated as *proposals from a collector* in their own
      sections — they were **not** applied to the text above.
- [x] **Nothing was written to the shared registers.** Rows returned in the response text only.
- [x] **Access limits stated as failures, not smoothed over.** F29's body is UNVERIFIABLE and every
      one of the nine retrieval routes tried is enumerated so it is not blindly re-run.
- [x] **Every quotation was string-matched locally** against a PDF/HTML downloaded in this session.
      No quotation is fetch-mediated or summariser-reported.
- [x] **Both directions collected.** F28 cuts *for* the expert-authored path (r = 0.80, zero
      responses, independent lab) and *against* it (authors' own no-generalisation disclaimer;
      learners beat experts significantly; the anchor-based variant relocates the requirement and
      performs worst; the reference standard is population-derived; the expert task is itself
      population-referenced).
- [x] **The brief's "known context you must not contradict" was checked line by line.** The falsified
      claim is **not** revived — C1-W independently affirms V1d's population-light framing.
      "~100 students" is **not** quoted as measured anywhere in this pass, and the abstract's
      "200-250 learners" is explicitly fenced off from it. F28 is explicitly checked against, and
      found **not** to be, F22's ".76 existing automated method" (that is Yancey et al. 2024).
- [x] **A tier upgrade was declined where the dispatch invited one.** F27 stays Q4, with reasons.
- [x] **A self-undermining conflict was registered rather than suppressed** — that Pelánek's citation
      of Wauters may not support the proposition F27 attaches to it.
