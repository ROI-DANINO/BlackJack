# Dossier: Anki as pedagogy; spaced repetition as methodology (C5)

> Status: RAW COLLECTION — DATA ONLY, not authority (Inbox Rule 0). UNTRUSTED until verified.
> Collector: Claude (Sonnet 5)  |  Date: 2026-07-19
> Leads consumed (untrusted): none — collected fresh
> Citations collected: 11 / budget 6–12 (hard cap 15); + 4 added by focused pass C5-FP (2026-07-19,
> exactly 4/4 of its allotted ceiling) = 15 total, initial-collection cap reached.
> **[updated by C5-REM, 2026-07-20 — front-matter bookkeeping only, no finding altered]** The card was
> reopened under **program amendment 5** (sufficiency top-ups are exempt from the initial 15-source
> cap), and a bounded 4-citation sufficiency top-up added **F16–F19**. Counts are kept **separable**:
> initial collection **15** (F1–F15) · sufficiency top-up **4** (F16–F19) · **card total 19**.

## Scope & questions this card must answer
- Q1. The spacing effect itself: what is the meta-analytic evidence that distributed practice
  beats massed practice, how strong is it, and what are the boundary conditions (retention
  interval, material type, how spacing gain is measured)?
- Q2. Scheduling algorithms — the SM-2 family and FSRS: what does each actually compute, and what
  is the evidence for each? Keep the evidence asymmetry (academically-studied spacing effect vs.
  self/community-evaluated scheduling algorithms) explicit and separate.
- Q3. Anki as pedagogy, not software: what does the practice assume (atomic items, active recall,
  self-graded difficulty)? What is evidence-backed vs. community convention presented as method?
- Q4 (load-bearing). Does spaced repetition apply to a decision-rule skill? Anki's evidence base is
  dominated by declarative recall; blackjack basic strategy is a procedural decision rule applied
  to a situation. Is that transfer tested in the literature, or is it a coverage gap?

## Overflow leads (found but not collected — over budget)
- Moulton, C.A. et al. (2006). "Teaching surgical skills: what kind of practice makes perfect? A
  randomized, controlled trial." *Annals of Surgery*, 244(3), 400–409. Would have supported: an
  independent RCT showing spaced (vs. massed) training improves retention of a *procedural motor*
  skill (microsurgical suturing) — a second, non-cognitive-discrimination data point for sub-Q4.
  Not collected in full because F9–F11 below already establish the skill-transfer picture at
  sufficient strength for the budget; would be the first extra source to add if this card were
  re-opened. → also appended to `registers/source-lead-register.md`.
- Su, Ye, et al. / MaiMemo "DHP model" papers (the model FSRS's difficulty–stability–retrievability
  framework says it originates from). Would have supported: a slightly more independent (non-Anki-
  community) technical precedent for FSRS's approach. Not opened — the FSRS findings below are
  already labeled as community/self-evaluated, and this source would not change that label.

## Findings

### F1: The spacing/distributed-practice advantage over massed practice is one of the most
replicated effects in the memory literature, but its evidence base is drawn almost entirely from
verbal/declarative memory tasks
- Provenance: PUBLISHED
- Access: Full text extracted and read (via text-proxy fetch of the PDF; direct binary PDF fetch
  failed twice before the proxy route succeeded — see collector note below).
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q1 (large-scale quantitative meta-analysis)
- Source(s): Cepeda, N.J., Pashler, H., Vul, E., Wixted, J.T., & Rohrer, D. (2006). "Distributed
  practice in verbal recall tasks: A review and quantitative synthesis." *Psychological Bulletin*,
  132(3), 354–380. https://augmentingcognition.com/assets/Cepeda2006.pdf
- Proposed supporting location: Abstract/Method (839 assessments across 317 experiments, 184
  articles); Results (spacing-vs-massing comparisons); Method (inclusion criterion for material type)
- Claimed strength (exact quotes): "spaced presentations improved final-test performance by 9%,
  compared with massed presentations" (at retention intervals under 1 minute, with larger gains at
  longer intervals) / "Only 12 of 271 comparisons of massed and spaced performance showed no effect
  or a negative effect from spacing." / On scope: "The material must have been learned during a
  verbal memory task (most commonly, paired-associates/cued recall, list recall, fact recall, or
  paragraph recall; also, text recall, object recall, sentence recall, spelling, face naming,
  picture naming, and category recall)."
- Caveats / population / domain limits: This is the strongest single source for "spacing works," but
  its own inclusion criterion is exclusively verbal-memory material — no motor, procedural, or
  decision-application task appears anywhere in the reviewed corpus. It cannot itself speak to sub-Q4.

### F2: The size of the optimal gap between study sessions is not fixed — it scales with how long
retention needs to last, and this relationship ("temporal ridgeline") was established with
declarative trivia-fact material at very large scale
- Provenance: PUBLISHED
- Access: Full text extracted and read (via text-proxy fetch after two direct binary-fetch failures).
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q2 (large multi-session controlled experiment, not a meta-analysis)
- Source(s): Cepeda, N.J., Vul, E., Rohrer, D., Wixted, J.T., & Pashler, H. (2008). "Spacing effects
  in learning: A temporal ridgeline of optimal retention." *Psychological Science*, 19(11),
  1095–1102. https://files.eric.ed.gov/fulltext/ED505660.pdf
- Proposed supporting location: Method (participant count, materials); Results (ridgeline numbers)
- Claimed strength (exact quotes): "1,354 participants" learned "32 obscure trivia facts" (single-word
  answers) over sessions spread up to a year. "The optimum gap value was about 20% of the test delay
  for delays of a few weeks, falling to about 5% when delay was one year."
- Caveats / population / domain limits: Declarative single-fact recall only. This is the paper most
  directly relevant to "how should a scheduler set the next interval" (sub-Q2's underlying
  phenomenon), but it was not run on any skill or rule-application task, so it bears on scheduling
  theory, not on whether scheduling applies to blackjack-strategy decisions specifically.

### F3: Distributed-practice benefit shrinks sharply, and becomes weak-to-negligible, as task
complexity rises from simple motor tasks toward complex cognitive tasks — this is the single most
load-bearing finding for sub-Q4
- Provenance: PUBLISHED
- Access: Full text extracted and read (via text-proxy fetch after a direct binary-fetch failure).
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q1 (meta-analysis)
- Source(s): Donovan, J.J., & Radosevich, D.J. (1999). "A meta-analytic review of the distribution of
  practice effect: Now you see it, now you don't." *Journal of Applied Psychology*, 84(5), 795–805.
  https://gwern.net/doc/psychology/spaced-repetition/1999-donovan.pdf
- Proposed supporting location: Abstract (overall effect size); Results (task-complexity moderator
  breakdown and correlation)
- Claimed strength (exact quotes): "A meta-analysis of 63 studies with 112 effect sizes yielded an
  overall mean weighted effect size of 0.46" overall — but broken down by task cluster: simple motor
  tasks d = 0.97, moderate-complexity cognitive tasks d = 0.42, complex tasks d = 0.11 and d = 0.07
  in the two most complex clusters. "Overall complexity was negatively and significantly correlated
  with the effect sizes generated (r = -.25, p < .05)." / "The strong distribution of practice effects
  previously reported appears to be limited to relatively simple tasks."
- Caveats / population / domain limits: This meta-analysis is 25+ years old and does not include a
  blackjack-strategy-like task; "complex" here spans a range of lab and applied tasks, not
  specifically decision rules under uncertainty. But its central conclusion — that task complexity is
  a real, statistically significant moderator that *shrinks* the effect — is exactly the caution the
  scope's sub-Q4 asks for, and it comes from the meta-analytic tier, not a single study.

### F4: Interleaved/spaced practice on a rule-application task (choosing the correct math procedure
for a given problem type) roughly doubled test accuracy, and the entire benefit was concentrated in
fewer *discrimination* errors — i.e., in better matching of situation to correct action, not in fewer
calculation errors
- Provenance: PUBLISHED
- Access: Full text extracted and read (via text-proxy fetch).
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q2 (controlled experiment)
- Source(s): Taylor, K., & Rohrer, D. (2010). "The effects of interleaved practice." *Applied
  Cognitive Psychology*, 24(6), 837–848. http://uweb.cas.usf.edu/~drohrer/pdfs/Taylor&Rohrer2010ACP.pdf
- Proposed supporting location: Method (four prism-geometry problem types, two-step solution
  requiring formula selection + substitution); Results (Test 1 accuracy and error-type breakdown)
- Claimed strength (exact quotes): "Mean accuracy on Test 1 ... was more than doubled by the
  interleaving of practice (77% vs. 38%), t(22) = 2.96, p < .01, Cohen's d = 1.21." / "blocked
  practice and interleaved practice produced about the same number of fabrication errors (15% vs.
  13%, respectively), but interleaving of practice dramatically reduced the frequency of
  discrimination errors (46% vs. 10%)." / mechanism: "because interleaving requires participants to
  repeatedly switch between different kinds of tasks, they must learn how to pair each kind of task
  with its appropriate procedure."
- Caveats / population / domain limits: **This is interleaving, not spacing in isolation** — the
  paper's own framing is "interleaving ... ensures that practice of any particular skill is
  distributed, or spaced," i.e., it treats interleaving as a vehicle for spacing rather than isolating
  spacing as a pure variable. Domain is a school geometry procedure (which formula to apply to which
  prism feature), not a real-time decision under hidden information/uncertainty like a blackjack
  hand. It is nonetheless the closest source found in this collection to "spacing a decision-rule
  skill" — the task structure (situation → select correct action from a small fixed set) is
  structurally close to basic-strategy play.

### F5: A 2024 systematic review found spaced digital education improves not only knowledge outcomes
but also skill outcomes (including a large effect for spaced simulation-based surgical skill
training) — yet the review itself states research specifically on non-knowledge outcomes is thin
- Provenance: PUBLISHED
- Access: Full text extracted and read directly (open-access JMIR article, PMC mirror).
- Proposed status bucket: Evidence-backed, with an explicit stated evidence gap
- Proposed evidence-quality tier: Q1 (systematic review + meta-analysis), downgraded in confidence by
  the review's own risk-of-bias findings (see caveats)
- Source(s): Martinengo, L., Ng, M.S.P., Ng, T.D.R., Ang, Y.-I., Jabir, A.I., Kyaw, B.M., & Tudor Car,
  L. (2024). "Spaced Digital Education for Health Professionals: Systematic Review and Meta-Analysis."
  *Journal of Medical Internet Research*, 26, e57760. DOI: 10.2196/57760.
  https://www.jmir.org/2024/1/e57760 (PMC: https://pmc.ncbi.nlm.nih.gov/articles/PMC11502984/)
- Proposed supporting location: Abstract/Results (23 included studies; outcome-type breakdown;
  knowledge vs. skill effect sizes); Discussion (stated research gap)
- Claimed strength (exact quotes): "spaced online education was superior to massed online education
  for postintervention knowledge" (SMD 0.32) and "Spaced digital simulation was superior to massed
  simulation for postintervention surgical skills" (SMD 1.15) — outcomes assessed included "knowledge
  (n=15, 65%), skills (n=9, 39%), attitudes (n=8, 35%), clinical behavior change (n=8, 35%)." On the
  gap: "Similar research in health profession education is lacking" regarding optimal spacing for
  outcomes beyond knowledge, and the review calls for work to "evaluate ... the impact of spaced
  digital education on other learning outcomes, such as skills."
- Caveats / population / domain limits: The review itself flags "substantial heterogeneity" and "the
  low quality of the included studies, reflected in the majority of unclear- and high-risk-of-bias
  assessments." The skill-outcome studies (n=9) are a small, low-quality subset of the total, and
  "surgical skills" here means simulated psychomotor procedures, not cognitive decision rules. This
  source shows spacing's benefit *generalizes past pure knowledge* but is explicit that the
  skill-specific evidence is both thinner and lower-quality than the knowledge evidence — it
  corroborates F3's caution rather than overturning it.

### F6: Spacing/interleaving improves inductive category learning (classifying novel exemplars by an
implicit rule) even though learners subjectively judge massed practice as more effective — a direct
demonstration that self-assessed learning quality can be miscalibrated under a spacing manipulation
- Provenance: PUBLISHED
- Access: Full text extracted and read (via text-proxy fetch).
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q2 (controlled experiment; independently replicated — see below)
- Source(s): Kornell, N., & Bjork, R.A. (2008). "Learning concepts and categories: Is spacing the
  'enemy of induction'?" *Psychological Science*, 19(6), 585–592.
  https://web.williams.edu/Psychology/Faculty/Kornell/Publications/Kornell.Bjork.2008a.pdf
- Proposed supporting location: Experiment 1a results (classification-test accuracy); Experiment 2
  results (recognition test, ruling out a pure label-memory explanation); Discussion (subjective
  ratings vs. performance)
- Claimed strength (exact quotes): Experiment 1a, first test block: spaced M = .61 (SD = .24) vs.
  massed M = .35 (SD = .24). Experiment 2 recognition test, first block: spaced hit rate M = .77
  (SD = .22) vs. massed M = .67 (SD = .24). Participants nonetheless preferred massing subjectively
  despite their own performance showing the opposite.
- Caveats / population / domain limits: The task is perceptual/inductive classification (learning to
  recognize an artist's style from exemplar paintings) — a rule the learner never receives explicitly,
  inferred from examples. This is closer to "pattern recognition under a hidden rule" than to
  "applying an explicitly stated, fixed decision rule" (blackjack basic strategy is closer to the
  latter — the rule is given, not induced). The replication cited next confirms the induction
  finding but does not extend it toward explicit-rule application.
- Independent replication note: Verkoeijen, P.P.J.L., & Bouwmeester, S. (2014) replicated this result
  ("a medium-sized advantage of spacing over massing in inductive learning ... comparable to the
  original effect") but also flagged that "the findings from Kornell and Bjork's (2008) second
  experiment have never been replicated" outside their own paper, in *Frontiers in Psychology*, 5,
  259. https://pmc.ncbi.nlm.nih.gov/articles/PMC3978334/ — recorded here as a supporting citation
  rather than a separate finding to stay inside budget.

### F7: SM-2, the algorithm underlying classic Anki scheduling, was built from one person's own
multi-year self-study log via trial-and-error, not from a controlled experiment or peer-reviewed
validation against alternatives
- Provenance: PUBLISHED (self-published technical description by the algorithm's author; treated as
  PUBLISHED per the taxonomy since it is an attributable primary/official source, not because it
  is peer-reviewed — see explicit tier downgrade below)
- Access: Full text (HTML page) directly retrieved and read.
- Proposed status bucket: Assumption (labeled explicitly by its own author as heuristic/trial-and-error, not an empirically validated model)
- Proposed evidence-quality tier: Q5 (first-party technical self-report), explicitly not Q2/Q3 —
  no independent sample, no control condition
- Source(s): Wozniak, P.A. "SuperMemo 2 Algorithm (SM-2)." SuperMemo archives.
  https://www.supermemo.com/en/archives1990-2015/english/ol/sm2
- Proposed supporting location: Algorithm description (interval/EF formulas); author's narrative on
  development and validation
- Claimed strength (exact quotes): Interval rule: "I(1):=1, I(2):=6, for n>2: I(n):=I(n-1)*EF."
  E-Factor update: "EF':=EF+(0.1-(5-q)*(0.08+(5-q)*0.02))," floor 1.3, initial 2.5 — described as
  "constructed by means of the trial-and-error approach." Evidence offered: "During the first year of
  using the SM-2 algorithm (learning English vocabulary), I memorized 10,255 items ... The overall
  retention was 89.3%." No comparison group, no other learners, no peer review.
- Caveats / population / domain limits: n = 1 (the author), one material domain (English vocabulary),
  no control condition, self-reported retention. This is presented, and should be recorded, as an
  engineering artifact with a self-report existence claim — not as an evidence-backed learning-science
  result, despite decades of widespread downstream adoption.

### F8: FSRS, Anki's current default scheduler, computes a three-parameter memory-state model
(difficulty, stability, retrievability) fit to large-scale Anki review logs, and reports large accuracy
gains over SM-2 — but this evidence is produced and reported entirely by the algorithm's own
developer community on its own telemetry, with an explicit admission that a fully fair comparison
to SM-2 is not possible
- Provenance: PUBLISHED (first-party technical/benchmark report; not an independent academic study)
- Access: Full text (HTML pages) directly retrieved and read.
- Proposed status bucket: Assumption / Product judgement (not Evidence-backed in the same sense as
  F1–F6 — see explicit asymmetry note)
- Proposed evidence-quality tier: Q5 (self-reported benchmark by the tool's own maintainers on
  telemetry from their own user base), explicitly not Q1/Q2 despite the large sample size
- Source(s): "Benchmark of Spaced Repetition Algorithms," Expertium (open-spaced-repetition project).
  https://expertium.github.io/Benchmark.html ; "A technical explanation of FSRS," Expertium's Blog.
  https://expertium.github.io/Algorithm.html
- Proposed supporting location: Benchmark methodology section (dataset, authorship); Results tables
  (log loss / RMSE / AUC comparisons); Algorithm page (difficulty/stability/retrievability definitions)
- Claimed strength (exact quotes): "when I say 'we', I'm referring to myself and Jarrett Ye" (FSRS's
  creator) — dataset is "Anki revlogs 10k," roughly "727 million reviews from 10,000 users," filtered
  to "roughly 350 million reviews" for benchmarking. "FSRS-6 (with recency weighting) has a 99.6%
  superiority over Anki SM-2" (log-loss comparison). Explicit self-caveat: "There is no way to have a
  truly fair, no caveats, comparison between FSRS and SM-2" (SM-2 was not designed to output
  calibrated probabilities, so extra conversion formulas were added on top of it for the comparison).
- Caveats / population / domain limits: No independent third party runs or audits this benchmark; it
  is authored by FSRS's own developers using data from users of the tool being evaluated. The
  underlying difficulty–stability–retrievability model is stated (via the Algorithm page) to descend
  from a "DHP model" from a commercial vendor (MaiMemo), which was not independently opened in this
  pass (see Overflow leads). This is the evidence-asymmetry the scope calls out: contrast the
  independence and peer review behind F1–F3 (the spacing effect) against the self-evaluated nature
  of F7–F8 (specific scheduling algorithms) — the two should never be cited with the same confidence.

### F9: Anki's "minimum information principle" (atomic, simply-formulated items) is presented by its
originator as a design heuristic derived from personal experience and analogy, not as a result drawn
from or validated against controlled research
- Provenance: PUBLISHED (self-published methodological essay by the practice's originator)
- Access: Full text (HTML page) directly retrieved and read.
- Proposed status bucket: Product judgement / community convention (explicitly not Evidence-backed)
- Proposed evidence-quality tier: Q6 (first-party methodological blog essay; no cited studies,
  no data)
- Source(s): Wozniak, P.A. "Effective learning: Twenty rules of formulating knowledge." SuperMemo.
  https://www.supermemo.com/en/blog/twenty-rules-of-formulating-knowledge
- Proposed supporting location: Rule 4 (minimum information principle) and surrounding rationale
- Claimed strength (exact quotes): "The material you learn must be formulated in as simple way as it
  is [possible]" — justified by an analogy ("Imagine a labyrinth...") about consistent neural
  processing, not by a cited experiment. The author invites the reader to self-verify rather than
  citing evidence: "You might want to experiment and try to learn two subjects using the two above
  approaches and see for yourself what advantage is brought by minimum information principle."
- Caveats / population / domain limits: This is the clearest case in this dossier of "community
  convention presented as method" (sub-Q3's second half). Atomicity/minimum-information is
  plausible and widely followed, but the source itself offers no controlled comparison — it should
  not be cited alongside the testing-effect literature (F10) as if the two carried equal evidentiary
  weight, even though Anki practice bundles both together.

### F10: The testing effect — that retrieving information from memory (an active-recall self-test)
produces better long-term retention than passive re-study of the same material — is a well-replicated
laboratory finding that is distinct from, and does not depend on, any specific spacing schedule
- Provenance: PUBLISHED
- Access: Abstract and secondary summaries only — the Psychological Science full text sits behind a
  Sage paywall and was not directly opened in this pass; the specific numbers below are corroborated
  identically across multiple independent secondary descriptions of the same experiment, but this is
  recorded as an abstract/secondary-level citation, not a full-text-verified one.
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q2 (primary controlled experiment), downgraded on access grounds —
  full text not directly opened
- Source(s): Roediger, H.L., & Karpicke, J.D. (2006). "Test-enhanced learning: Taking memory tests
  improves long-term retention." *Psychological Science*, 17(3), 249–255.
  DOI: 10.1111/j.1467-9280.2006.01693.x
- Proposed supporting location: Experiments 1–2 (repeated study vs. repeated testing conditions,
  immediate vs. one-week delayed final test)
- Claimed strength (as consistently reported in secondary sources, not directly quoted from primary
  text): repeated studying produced better recall than repeated testing on an immediate (5-minute)
  final test, but this reversed on a delayed (one-week) final test, where prior testing produced
  substantially greater retention than repeated studying.
- Caveats / population / domain limits: This finding supports Anki's requirement to actively recall
  the answer before flipping the card (active recall is evidence-backed), independent of whichever
  scheduling algorithm sits underneath it — it should not be used to validate SM-2 or FSRS
  specifically, since the testing effect and the scheduling-interval question are separable claims
  that Anki-as-a-practice happens to bundle together.

### F11: Anki's self-graded difficulty rating (learner presses "again/hard/good/easy" and the
scheduler trusts that judgment) rests on an assumption — accurate self-assessment of one's own
learning state — that the metacognition literature shows is frequently miscalibrated, including
specifically under spacing/massing manipulations
- Provenance: PUBLISHED (drawing on the same Kornell & Bjork 2008 result already cited as F6, plus
  general metacognition-literature corroboration found via search but not separately opened in full)
- Access: Full text for the core claim (Kornell & Bjork 2008, already fetched for F6); broader
  metacognition-literature framing corroborated only via search-result abstracts, not independently
  opened — flagged accordingly.
- Proposed status bucket: Product judgement / Assumption (the self-grading mechanism itself is
  evidence-backed as *plausible-but-unverified*, not as validated)
- Proposed evidence-quality tier: Q3 (the Kornell & Bjork data point is a primary experimental
  finding, but it demonstrates miscalibration in one lab paradigm — it is not a direct study of
  Anki's four-button grading scale specifically)
- Source(s): Kornell & Bjork (2008), as in F6 — the subjective-preference-vs-performance dissociation
  described there ("massing apparently created a sense of fluent learning" while objective
  performance favored spacing).
- Proposed supporting location: Discussion section of Kornell & Bjork (2008), on subjective ratings
- Claimed strength (exact quote, repeated from F6): participants rated massed practice as more
  effective "even after their own test performance had demonstrated the opposite."
- Caveats / population / domain limits: This is evidence that people can misjudge their own learning
  under specific experimental manipulations of *spacing*, not a direct study of whether Anki users
  correctly self-grade a given card's recall quality on the "again/hard/good/easy" scale. **No
  citation directly evaluating the accuracy of Anki-style self-graded difficulty ratings themselves
  was located in this pass** — that specific question is recorded as a coverage gap below, and this
  finding should be read only as an adjacent, suggestive caution, not as a direct answer.

## Candidate conflicts noticed
- **Effect size is not one number — it is conditional on task type, and two credible bodies of
  evidence disagree by implication about how far "spacing works" generalizes.** F1 (Cepeda et al.
  2006) reports the spacing advantage as nearly universal within its scope (12/271 negative
  comparisons) — but that scope is exclusively verbal/declarative recall. F3 (Donovan & Radosevich
  1999) reports the same general phenomenon collapsing from d = 0.97 (simple motor) to d = 0.07–0.11
  (complex tasks) as task complexity rises. These are not a direct contradiction (different
  populations of studies, 20+ years apart, different task inclusion criteria), but citing "the
  spacing effect is robust" without also citing the complexity-moderation finding would materially
  overstate what the literature supports for a complex procedural/decision task like blackjack basic
  strategy. → also appended to `registers/conflict-register.md`.
- **FSRS's own benchmark claims a decisive, large win over SM-2, but the same source states no fully
  fair comparison is possible.** (F8) The 99.6%-superiority figure and the "no fair comparison"
  caveat come from the same document — worth flagging so a downstream reader does not cite only the
  headline number. → also appended to `registers/conflict-register.md`.

## Coverage gaps
- **Sub-Q4, stated plainly: no study located in this pass tests spaced repetition on a genuine
  procedural decision rule of the blackjack-basic-strategy shape** — a fixed, explicitly-taught
  mapping from situation (hand + dealer upcard) to one of a small set of actions, applied under time
  pressure and hidden information. The closest analogues found are: (a) Taylor & Rohrer (2010, F4),
  interleaved practice on *which formula to apply* to a math-problem type — closer in structure but
  still untimed, no hidden information, no stakes; (b) Kornell & Bjork (2008, F6), spaced *inductive
  category learning* — a rule the learner infers rather than one given explicitly as basic-strategy
  is; (c) the 2024 health-professional review (F5), which itself states the skill-outcome literature
  is thin and heterogeneous even before narrowing to "decision rule" specifically. Transfer from the
  declarative-recall evidence base to a blackjack-style decision rule is **untested**, not merely
  under-studied at the margins — this is the single highest-value finding of this card and should
  not be softened into "probably transfers."
- **No study directly evaluates the accuracy of Anki-style self-graded difficulty ratings**
  (again/hard/good/easy) against an objective ground truth. F11 offers only an adjacent,
  suggestive caution from a different experimental paradigm.
- **No independent, non-community-authored evaluation of FSRS (or SM-2) against each other, or
  against a held-out academic benchmark, was located.** All scheduling-algorithm evidence found in
  this pass originates from the tool's own maintainers. **[corrected by C5-FP, 2026-07-19: this
  second sentence is false as a description of the field and is struck as a factual claim — it
  described only what this pass's searches turned up, not what exists. Peer-reviewed, non-community
  scheduling-algorithm research does exist, independent of any Anki/SM-2/FSRS vendor: see F12 (Pavlik
  & Anderson, 2008 — a controlled experiment testing a model-based scheduler against an independent
  1972 peer-reviewed scheduling algorithm and a flashcard control) and F13 (Lindsey et al., 2014 — a
  semester-long real-classroom study reporting a 16.5% cumulative-exam retention gain for personalized
  spaced scheduling over massed study). The corrected, narrower asymmetry: peer-reviewed scheduling
  research exists and shows model-based scheduling beats naive/massed review — but the specific
  SM-2-vs-FSRS comparison (F7, F8) remains self-evaluated by the tool's own maintainers on the tool's
  own telemetry, and no independent, third-party evaluation of *that specific comparison* was located
  in either pass. Both halves are true; neither should be cited without the other. See F12–F15 below.]**
- **No source in this collection is drawn from a gambling, card-game, or strategy-game skill
  domain.** All spacing/scheduling evidence collected here comes from verbal memory, school
  mathematics, painting-style classification, and clinical/surgical training domains.

## Collector self-QA (fill before returning — Task's internal QA pass)
- [x] Every major claim has ≥1 source with a locatable supporting location.
- [x] No claim states strength beyond what its source shows (e.g., F7/F8/F9 are explicitly kept out
  of "Evidence-backed" where the source itself is a self-report, not a controlled study).
- [x] Every finding carries provenance + proposed status bucket + proposed quality tier.
- [x] Every source lists a URL/DOI for independent re-check.
- [x] Coverage gaps and candidate conflicts are named explicitly.
- [x] Citation count is within the depth budget (11, within 6–12; no overflow was forced in).
- [x] No citation was added merely to reach a count — two solid leads (Moulton 2006; MaiMemo/DHP)
  were deliberately left as overflow leads rather than padded in.
- [x] (C1/C4 only) N/A — scope file states the sufficiency statement is not required for C5; that
  section is omitted per instruction.

## Collector note on tooling
Several primary-source PDFs (Cepeda et al. 2006 and 2008, Donovan & Radosevich 1999, Kornell & Bjork
2008) initially failed to extract as readable text via direct WebFetch — the tool returned a
binary/stream-parsing failure rather than text. Per the shared brief's flagged hazard, each of these
was re-fetched via a text-proxy route (`r.jina.ai/<url>`) before being relied upon, and the resulting
extracted quotes were internally consistent (matching independent secondary summaries of the same
studies found via search) rather than the "looks-plausible-but-inconsistent" pattern the brief warned
about. Two sources (Cepeda et al. 2008's escholarship.org mirror; a ResearchGate page) returned hard
403s rather than ambiguous content and were simply abandoned in favor of an alternate mirror that
worked — recorded here for transparency, not as a hazard instance.

## Findings added by focused pass (C5-FP, 2026-07-19)

> Scope: a single bounded top-up pass filling exactly two named gaps from V5 (the verification
> record), under a hard 4-citation ceiling. Not a re-run of F1–F11, which stand as verified. All four
> PDFs below were downloaded with `curl` and read locally via `pdftotext -layout`, matching V5's own
> method, except where noted. No existing finding, quote, tier, or section above this header was
> altered — the single permitted exception (the false "all scheduling-algorithm evidence... from the
> tool's own maintainers" sentence in Coverage gaps) is corrected in place, inline, above.

### F12: A peer-reviewed, non-Anki-affiliated scheduling algorithm (an ACT-R-based model of optimal
practice timing) was tested in a controlled experiment against both an independent 1972 scheduling
algorithm and a flashcard control, and beat both on accuracy and response latency — direct evidence
that peer-reviewed scheduling-algorithm research is not confined to tool-maintainer self-evaluation
- Provenance: PUBLISHED
- Access: Full text extracted and read (PDF downloaded directly from the ACT-R research group's own
  publication archive at Carnegie Mellon, `act-r.psy.cmu.edu`; `pdftotext -layout` locally; 17pp)
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q2 (controlled experiment, independent peer-reviewed publication —
  not a meta-analysis, and not a self-evaluated vendor benchmark like F7/F8)
- Source(s): Pavlik, P.I., Jr., & Anderson, J.R. (2008). "Using a Model to Compute the Optimal
  Schedule of Practice." *Journal of Experimental Psychology: Applied*, 14(2), 101–117.
  DOI: 10.1037/1076-898X.14.2.101.
  http://act-r.psy.cmu.edu/wordpress/wp-content/uploads/2012/12/791xap-14-2-101.pdf
- Proposed supporting location: "The Experiment" / "Experiment Design" (participant count, materials,
  three between-subjects conditions); "Results and Discussion" (Session 4 statistics and effect sizes)
- Claimed strength (exact quotes): "60 participants learned a set of 180 Japanese-English vocabulary
  words." Three between-subjects conditions: "The first condition tested a new method of scheduling
  based on an extended ACT-R model" (the authors' own optimization algorithm); "The second condition
  was a replication of Atkinson (1972b)" (an independent, pre-Anki, peer-reviewed scheduling
  algorithm — a three-state Markov model); "The third condition consisted of a flashcard procedure"
  (naive-learner control). Result: "these effects were significant for Session 4 recall and latency,
  F(2, 57) = 5.4, p = .0073 and, F(2, 57) = 10.3, p = .00015, with all pairwise t test comparisons
  favoring the schedule optimization... For correctness, these results show a Cohen's-d effect size
  of 0.796 SD compared to the Atkinson control and 0.978 SD compared to the flashcard control. For
  latency, these results show an effect size of 1.17 SD compared to the Atkinson control and 1.31 SD
  compared to the flashcard control."
- Caveats / population / domain limits: Material is declarative paired-associate vocabulary learning
  (Japanese-English word pairs) — not a procedural decision rule; this source does not close sub-Q4's
  gap. The comparator "Atkinson (1972b)" is itself a peer-reviewed prior scheduling algorithm, not
  SM-2/FSRS — this finding shows peer-reviewed scheduling-algorithm-vs-scheduling-algorithm research
  exists in the academic literature; it does not directly compare against SM-2 or FSRS by name, so it
  narrows rather than eliminates the F7/F8 asymmetry (see corrected Coverage-gap statement above). The
  authors themselves caution against over-generalizing: "creating a model is clearly not trivial even
  for relatively simple domains such as the fact memorization we investigated," and they flag as
  unresolved "domains with multiple grain sizes... dependencies... and transfer effects" — i.e., the
  paper does not claim this result generalizes to complex procedural/decision domains like blackjack
  basic strategy.

### F13: A semester-long, real-classroom controlled study of a personalized (model-based) spaced-
review scheduler found a 16.5% cumulative-exam retention gain over massed review and a 10.0% gain
over a one-size-fits-all spaced schedule — peer-reviewed, independent of any flashcard-tool vendor
- Provenance: PUBLISHED
- Access: Full text extracted and read (PDF downloaded directly from co-author Michael Mozer's
  University of Colorado Boulder faculty site; `pdftotext -layout` locally; 8pp)
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q2 (single controlled classroom experiment, within-participant
  three-arm comparison — not a meta-analysis, and measuring actual retention gain, not the
  predictive-accuracy/log-loss metric F8's FSRS benchmark uses; these are not the same claim type)
- Source(s): Lindsey, R.V., Shroyer, J.D., Pashler, H., & Mozer, M.C. (2014). "Improving Students'
  Long-Term Knowledge Retention Through Personalized Review." *Psychological Science*, 25(3),
  639–647. DOI: 10.1177/0956797613504302.
  https://home.cs.colorado.edu/~mozer/Research/Selected%20Publications/reprints/LindseyShroyerPashlerMozer2014.pdf
- Proposed supporting location: Abstract; "Participants" (179 eighth graders, suburban Denver middle
  school); Method ("The scheduler was varied within participant..."); "Results" (exam 1 and exam 2
  statistics)
- Claimed strength (exact quotes): "Participants were eighth graders (median age 13) at a suburban
  Denver middle school. A total of 179 ... semester cumulative exam was taken by 172 students; the
  followup exam four weeks later was taken by 176 students." Three within-participant conditions
  ("massed," "generic spaced," "personalized [model-based] spaced") were assigned by "randomly
  assigning one third of a chapter's items to each scheduler, counterbalanced across participants."
  "On the first exam, the personalized spaced scheduler improved retention by 12.4% over the massed
  scheduler (t(169) = 10.1, p < .0001, Cohen's d = 1.38) and by 8.3% over the generic spaced scheduler
  (t(169) = 8.2, p < .0001, d = 1.05) ... On the second exam, personalized review boosted retention by
  16.5% over massed review (t(175) = 11.1, p < .0001, d = 1.42) and by 10.0% over generic review
  (t(175) = 6.59, p < .0001, d = 0.88)."
- Caveats / population / domain limits: Material is Spanish foreign-language vocabulary/grammar
  retrieval-practice items in a middle-school classroom — declarative recall, not a decision rule;
  does not close sub-Q4. This is the strongest independent (non-Anki, non-SuperMemo) empirical
  demonstration located in either pass that model-based personalized spaced scheduling outperforms
  both massed study and a generic fixed-interval schedule, using an actual retention-gain outcome
  measure rather than a predictive-accuracy benchmark. The paper itself caveats its own comparator:
  "'massed' review is spaced by usual laboratory standards, being spread out over at least seven
  days" — the authors' own qualification on why the generic-vs-massed gap is smaller than the
  personalized-vs-massed gap, not a criticism of the personalized condition's result.

### F14: A 2026 systematic review of 11 studies found Anki use associated with higher USMLE Step 1
and CBSE scores, but the review's own limitations section states plainly that its evidence base is
observational and cannot support a causal claim — the first empirical (non-first-party) evidence
located in either pass for sub-Q3's "Anki as pedagogy" question, which had rested entirely on
Wozniak's own essays (F9, F11)
- Provenance: PUBLISHED
- Access: Full text extracted and read (open-access CC-BY PDF via publisher; `pdftotext -layout`
  locally; 19pp)
- Proposed status bucket: Q3 observational — explicitly NOT Evidence-backed as a causal claim (the
  source itself states this; see quotes below)
- Proposed evidence-quality tier: Q3 (systematic review of observational/quasi-experimental primary
  studies; the synthesis method is systematic, but every included primary study is non-randomized, so
  tiering the review's headline as Q1 would misrepresent what generates the number)
- Source(s): Frappa, N., Chernov, D., Dillon, M., & Alben, M.G. (2026). "Anki Use and Academic
  Performance in Medical Education: A Systematic Review of Evidence and Learning Theory." *Medical
  Science Educator*, 36, 1015–1025. DOI: 10.1007/s40670-026-02643-5.
  https://link.springer.com/content/pdf/10.1007/s40670-026-02643-5.pdf
- Proposed supporting location: Abstract/Results ("Eleven eligible studies were qualitatively
  synthesized"; USMLE Step 1 and CBSE findings); "Limitations" section (causality/confounding
  language)
- Claimed strength (exact quotes): "Eleven eligible studies were qualitatively synthesized." "High-
  frequency users outperformed minimal users by 4–13 points, with one study identifying a dose-
  response effect based on total cards reviewed." "Only one study assessed Step 2 CK and found no
  significant benefit." On its own evidentiary status: "the majority of included studies were
  observational or quasi-experimental, and none employed randomized designs... introducing risk of
  selection bias and limiting causal inference." "Confounding and self-selection bias are important
  considerations across the included studies, as students were not randomly assigned to Anki use...
  residual confounding cannot be excluded, and causality cannot be inferred." "As the existing
  evidence base is predominantly observational, these findings should not be interpreted as causal,
  nor as evidence that Anki represents an optimal or sufficient study strategy in isolation."
- Caveats / population / domain limits: Population is medical students (a highly selected, high-
  conscientiousness population) and the outcome is standardized clinical/knowledge-exam performance —
  declarative recall, not a decision-rule skill; does not touch sub-Q4. The review's own conclusion is
  explicitly non-causal — citing "Anki works" from this source without its own observational caveat
  would repeat exactly the direction-inversion hazard this pass was warned to guard against. Correct
  reading: sub-Q3 is no longer answered from zero empirical Anki-user studies, but the empirical layer
  that now exists is itself correlational, not a controlled validation of Anki's mechanism.

### F15: A single-institution cohort-control study (not randomized) found Anki users scored
significantly higher than non-users on four medical-school exams, including a 12.9% gap on a
comprehensive exam — but the study's own authors attribute the gap only tentatively to Anki and
explicitly state a motivation/study-effort confound could not be ruled out even after attempting to
control for it
- Provenance: PUBLISHED
- Access: Full text extracted and read (open-access CC-BY PDF via publisher; `pdftotext -layout`
  locally; 15pp)
- Proposed status bucket: Q3 observational — explicitly not causal, matching the review's (F14) own
  caveat about this same underlying evidence base
- Proposed evidence-quality tier: Q3 (self-selected, non-randomized cohort-control design; not Q1/Q2)
- Source(s): Gilbert, M.M., Frommeyer, T.C., Brittain, G.V., Stewart, N.A., Turner, T.M., Stolfi, A.,
  & Parmelee, D. (2023). "A Cohort Study Assessing the Impact of Anki as a Spaced Repetition Tool on
  Academic Performance in Medical School." *Medical Science Educator*, 33(4), 955–962.
  DOI: 10.1007/s40670-023-01826-8.
  https://link.springer.com/content/pdf/10.1007/s40670-023-01826-8.pdf
- Proposed supporting location: Abstract/Methods ("One hundred thirty first-year medical students...
  enrolled in an Anki utilization training program"); Results (per-exam percentages and p-values);
  Discussion/Limitations (confound admission)
- Claimed strength (exact quotes): "One hundred thirty first-year medical students were enrolled...
  Seventy-eight students reported using Anki for at least one of the exams, and 52 students did not
  use Anki for any exam." "Anki users scored significantly higher across all four exams: Course I
  (6.4%; p < 0.001); Course II (6.2%; p = 0.002); Course III (7.0%; p = 0.002); and CBSE (12.9%;
  p = 0.003)." On the confound, in the authors' own words: "Another limitation was the lack of
  randomization, which was not pursued given the ethical considerations behind limiting access to
  medical student resources. Thus, our findings could be a result of more motivated students using
  additional resources and spending more time studying, whether using Anki or not. We attempted to
  control for this using MCAT scores, but this confounder still exists."
- Caveats / population / domain limits: Single US medical school; self-selected (not randomly
  assigned) Anki use; small sub-analysis sample sizes for later exams (e.g., CBSE dependency analysis
  n = 10). Same population/outcome type as F14 — does not touch sub-Q4. This is the specific primary
  study behind F14's "+12.9%" CBSE figure (same number, same study); recorded once here for the
  primary source's own limitation language rather than double-counted as independent corroboration.

### Correction record (cross-reference)
The one correction this pass is permitted to make — striking the false "all scheduling-algorithm
evidence... from the tool's own maintainers" sentence — is applied **in place, inline**, in the
Coverage gaps section above (marked `[corrected by C5-FP, 2026-07-19]`), not here, so a reader hits it
at the point of the original false claim. F12 and F13 are the citations that ground that correction.

### Additional coverage gap noted by this pass (cap cost, not an importance judgment)
- **The contextual-interference (CI) tradition — including its two conflicting 2024 meta-analyses —
  remains uncollected in this card.** This is the third body of evidence V5 named as missing (Kim et
  al. 2024, *Scientific Reports*, reporting a medium CI benefit that is "almost negligible" in applied
  settings, vs. a critical multilevel meta-analysis in *Educational Psychology Review* 2024 finding
  only ~20% of pooled outcomes agreed with the paradoxical CI effect). It directly bears on how F4's
  downgraded interleaving finding (see V5's resolution log) should be read for sub-Q4. **It was not
  collected here because the 4-citation ceiling was fully spent on Bundles A and B; this is a budget
  constraint, not a judgment that the CI tradition is less important than what was collected.** Both
  sources are already registered as a matched pair in `registers/source-lead-register.md` (rows #24,
  #25 — "Collect as a matched pair," so the dispute is registered rather than silently resolved by
  collecting only one side). Whoever reopens this card next should collect both or neither.

### Citation-count confirmation
Exactly 4 citations were added by this pass (F12, F13, F14, F15) against a hard ceiling of 4. No
overflow was forced in; the CI pair above was deliberately left uncollected rather than pushed past
the ceiling.

---

## Findings added by sufficiency top-up (C5-REM, 2026-07-20) — EXEMPT FROM THE 15-CITATION CAP

> **Counting note (program amendment 5).** These four citations are a **sufficiency top-up** closing
> the gap V5b specified, and are **exempt from the initial 15-source cap**. Initial-collection count
> remains **15** (F1–F15). Top-up count: **4** (F16–F19). Card total: **19**. The two counts are kept
> separable deliberately; do not fold F16–F19 into the initial-effort figure.
>
> Scope taken **exactly** as V5b's §3 specifies: the contextual-interference **matched pair** (both
> sides, per source-lead rows #24/#25) plus the **two landmark spacing reviews** (Latimier et al.
> 2021; Carpenter et al. 2012). Explicitly not collected: Settles & Meeder (2016), the Moulton (2006)
> overflow lead, and anything re-covering F1–F15. **Append-only** — no pre-existing finding, quote,
> tier, caveat, coverage-gap or correction above this header was altered by this pass.
>
> Collector: Claude (Opus 4.8) | UNTRUSTED until independently verified. Access method: WebFetch,
> with the `r.jina.ai` text-proxy route used where a publisher IdP redirect or an http-only host
> blocked direct retrieval (see the tooling note at the end of this section — **two real hazards
> occurred and both are recorded**).

### F16: The pro-CI side of the live 2024 contextual-interference dispute — a random/high-interference practice schedule produces a medium, statistically significant retention benefit **overall**, but that benefit is **small and non-significant in applied (non-laboratory) settings**
- Provenance: PUBLISHED
- Access: Full text read (open-access CC-BY; PMC HTML, retrieved directly and re-retrieved via the
  text-proxy route to cross-check the subgroup figures).
- Proposed status bucket: Evidence-backed (for the *laboratory* effect); the applied-setting result is
  a **null**, and must be carried as such
- Proposed evidence-quality tier: Q1 (systematic review + multilevel meta-analysis)
- Source(s): Czyż, S.H., Wójcik, A.M., Solarská, P., & Kiper, P. (2024). "High contextual interference
  improves retention in motor learning: systematic review and meta-analysis." *Scientific Reports*,
  14, 15974. DOI: 10.1038/s41598-024-65753-3.
  https://pmc.ncbi.nlm.nih.gov/articles/PMC11237090/
- Proposed supporting location: Abstract; Results → overall pooled model; Results → setting subgroup
  analysis (laboratory vs. applied)
- Claimed strength (exact quotes): "We screened full texts of 294 studies, of which 54 were included
  in the meta-analysis." Overall: **"The pooled effect size based on the three-level meta-analytic
  model was medium SMD = 0.63 (95% CI: 0.33, 0.93; p < 0.001)."** Laboratory subgroup: **"The pooled
  effect size based on the three-level meta-analytic model was large SMD = 0.92 (95% CI: 0.48, 1.36;
  p < 0.001)."** Applied subgroup: **"The non-significant pooled effect size based on the three-level
  meta-analytic model was small SMD = 0.23 (95% CI: -0.16, 0.62; p = 0.24)."** The authors' own
  abstract states it plainly: "We found that the random practice schedule in laboratory settings
  effectively improved motor skills retention. On the contrary, in the applied setting, the beneficial
  effect of random practice on the retention was almost negligible." Age subgroups: "The random
  schedule was more beneficial for retention in older adults (large effect size) and in adults (medium
  effect size). In young participants, the pooled effect size was negligible and statically
  insignificant." [*sic* — "statically" is the source's own typo, reproduced verbatim.]
- **Model-provenance note (the Phase 1 defect this guards against):** the headline SMD = 0.63 is from
  the **three-level mixed model**. The paper reports a *second*, different overall figure —
  **SMD = 0.71 (95% CI: 0.41, 1.01; p < 0.001)** — from a **random-effects model with averaged effect
  sizes from single studies**. Both are random-effects family; they are **not interchangeable** and
  must be cited with their model named. Do not report one as the other.
- **Author-attribution correction (affects the registers, not the dossier):** source-lead register row
  **#24 attributes this paper to "Kim, et al. (2024)". That attribution is wrong.** The authors are
  **Czyż, Wójcik, Solarská & Kiper**. V5b carried the same "Kim et al." name forward from the register
  while simultaneously — and correctly — noting the existence of a *"Comment on Czyż et al. (2024)"*;
  the two are the same underlying paper. The DOI, venue, study count (54) and participant count
  (2,068) in row #24 are otherwise correct. **Register row #24 needs an author correction.**
- Caveats / population / domain limits: **This is motor learning, not cognitive decision-rule
  learning.** The corpus is motor-skill acquisition (the CI literature's home domain since 1966).
  Its relevance to sub-Q4 is *structural*, not domain-matched: CI is the research tradition that owns
  the "does mixing practice conditions improve retention of a situation→action mapping" question, and
  F4 (Taylor & Rohrer) — which V5 downgraded from spacing evidence to **interleaving** evidence — sits
  inside this tradition's remit. The applied-setting null is the single most decision-relevant number
  here: a blackjack trainer is an applied setting, not a lab.

### F17: The critical side of the same 2024 dispute — a multilevel meta-analysis of the CI literature in physical-education and sport contexts finds that **only 20% of pooled outcomes agreed with the paradoxical CI effect**, and the authors explicitly call the CI model's generalizability into question
- Provenance: PUBLISHED
- Access: Full text/abstract read (open-access CC-BY; publisher HTML reached via the text-proxy route
  after Springer's IdP redirect blocked direct fetch; bibliographic record independently confirmed
  against the **Crossref API** and an independent bibliographic mirror — see hazard note below).
- Proposed status bucket: Evidence-backed (as a null/negative synthesis result)
- Proposed evidence-quality tier: Q1 (critical systematic review + multilevel meta-analysis)
- Source(s): Ammar, A., Trabelsi, K., Boujelbane, M.A., Salem, A., Boukhris, O., Glenn, J.M.,
  Zmijewski, P., Jahrami, H.A., Chtourou, H., & Schöllhorn, W.I. (2024). "The Effects of Contextual
  Interference Learning on the Acquisition and Relatively Permanent Gains in Skilled Performance: A
  Critical Systematic Review with Multilevel Meta-Analysis." *Educational Psychology Review*, 36(2),
  article 57. DOI: 10.1007/s10648-024-09892-z.
  https://link.springer.com/article/10.1007/s10648-024-09892-z
- Proposed supporting location: Abstract (screening counts, outcome tally, both Δ comparisons);
  Conclusion (generalizability statement)
- Claimed strength (exact quotes): "A total of 933 records from five electronic databases were
  screened using the PICOS criteria, of which 36 studies were selected." **"Out of 183 overall pooled
  outcomes, Δ in only 37 performance outcomes (20%) agreed with the paradoxical CI effects on the
  acquisition or the relatively permanent gains."** On acquisition: "No statistically significant
  overall difference was detected for 'Δ pre-post' between low (blocked) (28.9 ± 59.5%) and high
  (random/serial) (27.9 ± 52.8%) CI (effect size (ES) = 0.1, p = 0.35)." On retention — **and note the
  authors' own two-step qualification, which must not be quoted half-way:** "An overall significant
  difference (p = 0.001) in favor of high CI practice was detected in 'Δ post-retention.' However,
  this difference was not large enough (ES = − 0.35) to produce an overall greater long-term gain
  following high (24.56 ± 4.4%), compared to low (21.9 ± 9.8%) CI (ES = − 0.13, p = 0.18)."
  Conclusion: "These findings found very limited evidence supporting the recommendation to employ high
  CI practices to gain a longer-term performance advantage, calling into question the generalization
  of the CI model to PE and sports practices." And: "High-quality follow-up research evaluating
  alternative motor-learning models are therefore needed."
- **Register correction (row #25):** the row lists this source with no authors and describes it only
  by title. Authors, volume and article number are now established: **Ammar et al., EPR 36(2), art.
  57**. Row #25's substantive summary ("only ~37 of 183 pooled outcomes (20%)") is **exactly correct**
  and is confirmed verbatim above.
- Caveats / population / domain limits: Domain is **physical education and sport**, i.e. motor skills
  — the same domain limit as F16, and again not a cognitive decision rule. The synthesis is a
  *critical* review by authors who advocate an alternative (differential-learning) framework
  (Schöllhorn is a co-author), which is a stated theoretical commitment a reader should weigh; it does
  not impeach the outcome tally, which is a count, but it is why the pair must be cited **together**.
  The dispute is live and public: EPR subsequently published a *Commentary on Ammar et al. (2024)*
  (DOI 10.1007/s10648-025-10006-6) and a further reply (DOI 10.1007/s10648-025-10043-1), and a
  *"Comment on Czyż et al. (2024)"* exists on SportRxiv — **located and recorded as leads, not
  collected**, per scope discipline.

### F18: The modern (2021) meta-analysis of **spaced retrieval practice** — the exact conjunction Anki implements — finds a strong benefit over massed retrieval practice, but its own numbers carry two qualifications the headline hides: the effect size shrinks by more than a quarter once publication bias is corrected, and **no moderator, including stimulus type, reached significance**
- Provenance: PUBLISHED
- Access: **Full text read** (author self-archived copy on co-author Franck Ramus's LSCP page,
  reached via the text-proxy route — the host is http-only and refused a direct https connection).
  **This closes V5b's "could not be read" status on this source.**
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q1 (meta-analysis)
- Source(s): Latimier, A., Peyre, H., & Ramus, F. (2021). "A Meta-Analytic Review of the Benefit of
  Spacing out Retrieval Practice Episodes on Retention." *Educational Psychology Review*, 33,
  959–987. DOI: 10.1007/s10648-020-09572-8. http://www.lscp.net/persons/ramus/docs/EPR20.pdf
- Proposed supporting location: Abstract; Results → subset 1 overall effect and trim-and-fill
  correction; Results → moderator table (subset 1); Method → inclusion criteria; Discussion →
  Limitations
- Claimed strength (exact quotes): "We carried out meta-analyses on 29 studies investigating the
  benefit of spacing out retrieval practice episodes on final retention." Abstract headline: "a strong
  benefit of spaced retrieval practice in comparison with massed retrieval practice (g = 0.74)" and
  "no significant difference between expanding and uniform spacing schedules of retrieval practice
  (g = 0.034)." **The two numbers behind that headline, which must be cited with their model:**
  uncorrected — "The overall weighted mean effect size across all 39 effect size estimates was
  g = 1.01 (95% CI [0.68, 1.34], p < 0.0001) with an estimated between-study SE of 0.15" (random-
  effects, robust variance estimation); bias-corrected — "The overall weighted mean effect size was
  reduced to g = 0.74 (95% CI [0.55, 0.91], p < 0.0001)" after trim-and-fill. **The abstract's g = 0.74
  is the publication-bias-corrected figure, not the raw pooled estimate.**
- **Moderators — the point that bears on Conflict #10, and the one a headline-only read loses:** in
  subset 1, **neither retention interval nor stimulus type moderated the effect.** Stimulus type was
  coded as "pairs (whatever the type—face–name pairs, translated word pairs…) versus others (including
  prose passages, word lists, classroom lectures, and maths problems)" and returned a non-significant
  test; retention interval (log minutes) likewise non-significant. **The authors themselves refuse the
  null-as-evidence-of-absence reading:** "we cannot ensure that an effect is not significant due to a
  true lack of effect or a lack of power (Hempel et al., 2013). With low power, we should not conclude
  that there is no relationship between the moderator and the variability in the subset."
- **Direct bearing on sub-Q4 and Conflict #10 — and it does NOT resolve the conflict in either
  direction.** The paper's inclusion criterion is decisive and should be quoted whenever this source is
  used: **"we focus on semantic and verbal stimuli learning (including mathematics problems). Thus,
  studies on perceptual and motor learning were excluded."** So the 2021 modern check on F1's
  near-universality is *itself* scoped to verbal/semantic material and **cannot** speak to F3's
  complexity moderation across motor/procedural tasks. It neither confirms nor refutes F3. **Conflict
  #10 survives this source intact** — the two literatures still do not overlap. Anyone tempted to cite
  Latimier as "the modern meta-analysis showing spacing is robust across material types" would be
  reading a within-verbal non-significant moderator as cross-domain generality, which the authors'
  own inclusion criterion and their own power caveat both forbid.
- Caveats / population / domain limits: Verbal/semantic material only (plus maths problems); 29
  studies; the authors flag unresolved heterogeneity ("there was significant heterogeneity between
  studies in subset 1, which our moderator analyses failed to explain") and limited setting diversity
  ("the diversity of experimental settings (particular stimuli, test types, population) was limited,
  making it impossible to fully address the moderating effects of these factors"). Their closing
  limitation is the most quotable sentence in the paper for this dossier's purposes: **"Ultimately,
  meta-analyses cannot make new results emerge that have not been sufficiently investigated in the
  experimental literature."**

### F19: The landmark review whose stated remit is exactly sub-Q4's question — "does spacing generalize past simple verbal recall?" — answers **yes, across a listed set of richer school tasks**, but the list it actually offers is spelling, reading, grammar rules, biology, mathematics and coordinated motor skills; **no decision-rule or situation→action task appears in it**
- Provenance: PUBLISHED
- Access: **Full text read** (author-community mirror of the published article, via the text-proxy
  route). **This closes V5b's "could not be read" status on this source.** A second mirror
  (andymatuschak.org) returned an undecodable compressed stream and was abandoned — see hazard note.
- Proposed status bucket: Evidence-backed (as a narrative synthesis; it is not itself a meta-analysis)
- Proposed evidence-quality tier: **Q4** (authoritative narrative review / theoretical synthesis) —
  explicitly **not Q1**, despite "Review" in the title and ~474 citations. It reviews and interprets
  primary findings; it does not pool them. Tiering it Q1 would be the standard way to smuggle in
  unearned strength.
- Source(s): Carpenter, S.K., Cepeda, N.J., Rohrer, D., Kang, S.H.K., & Pashler, H. (2012). "Using
  Spacing to Enhance Diverse Forms of Learning: Review of Recent Research and Implications for
  Instruction." *Educational Psychology Review*, 24, 369–378. DOI: 10.1007/s10648-012-9205-z.
  https://pdf.retrievalpractice.org/spacing/Carpenter_etal_2012_EDPR.pdf
- Proposed supporting location: Abstract; the section reviewing which types of learning benefit from
  spacing; the spacing-gap/test-delay section
- Claimed strength (exact quotes): Abstract, on remit: "we review research findings of the types of
  learning that benefit from spaced study, demonstrations of these benefits in educational settings,
  and recent research on the time intervals during which spaced study should occur in order to
  maximize memory retention." On the scope problem the dossier has been arguing from Cepeda 2006's
  inclusion criterion — **stated here in the authors' own words:** "The vast majority of studies on the
  spacing effect have been conducted in the laboratory, and these studies typically require
  participants to learn relatively simple types of verbal information such as word lists or trivia
  facts." On generalization: "Recently, however, new findings have emerged showing that spacing can
  also improve learning of information that is conceptually more difficult. For example, Bird (2010)
  found that longer spacing gaps improved English-learning adults' understanding of subtle grammatical
  rules." / "Spacing has also been shown to improve learning in other tasks that might be considered
  complex forms of learning, such as spelling (Fishman et al. 1968), reading skills (e.g., Seabrook et
  al. 2005), and biology (Reynolds & Glaser, 1964)." / "Spacing effects were found in two recent
  experiments in which college students learned a moderately abstract mathematics task (Rohrer &
  Taylor 2006, 2007)" / "Benefits of spacing have also been reported for tasks involving coordinated
  motor skills." On what remains unknown: "A comprehensive comparison of various spacing gaps and test
  delays involving three or more learning sessions has yet to be carried out."
- **Why this matters for sub-Q4 — read the list, not the thesis.** V5b's reason for demanding this
  source was that the dossier argued "the evidence base is declarative-only" from Cepeda 2006's
  inclusion criterion without engaging the review whose remit is the generalization question. Having
  now read it: **the review supports the dossier's framing rather than overturning it, but on
  different and better grounds.** Carpenter et al. explicitly concede the laboratory/simple-verbal
  base rate in their own words, then enumerate the exceptions — and every enumerated exception is
  either (a) still declarative content (spelling, biology facts), (b) a *rule the learner induces or
  applies to a stated problem* (grammar corrections, prism-volume maths — the latter being the same
  Rohrer line of work the dossier already holds as F4), or (c) coordinated **motor** skill. **None is
  a taught, fixed situation→action decision rule applied under time pressure and hidden information.**
  The dossier's sub-Q4 gap therefore stands after engaging the review most directly addressed to it —
  which is a materially stronger position than arguing the gap from one meta-analysis's inclusion
  criterion. **The gap is now argued from the field's own generalization review, not around it.**
- Caveats / population / domain limits: 2012, so it predates F16/F17's CI meta-analyses and the modern
  spaced-retrieval synthesis (F18); it is a narrative review, so its task list is illustrative rather
  than exhaustive, and absence from the list is weaker evidence than a systematic search would be
  (which is why this finding is stated as "the gap stands after engaging it," not "the review proves
  no such study exists"). Its within-source claims are attributions to primary studies this pass did
  **not** independently open (Bird 2010; Fishman et al. 1968; Seabrook et al. 2005; Reynolds & Glaser
  1964; Rohrer & Taylor 2006, 2007) — those are quoted as *Carpenter et al.'s* characterisations, not
  as independently verified primary results.

### Conflict opened by this pass (returned for the conflict register; not written there by this pass)
- **Contextual interference: two 2024 Q1 syntheses, opposite headline verdicts, and they are NOT
  reconcilable by simply averaging.** F16 (Czyż et al., *Sci Rep*) reports a medium, significant
  overall CI retention benefit (SMD = 0.63) and concludes high CI improves retention; F17 (Ammar et
  al., *EPR*) reports that only 20% of 183 pooled outcomes agreed with the paradoxical CI effect and
  concludes the CI model's generalizability to PE/sport is called into question. **The most useful
  observation is that the two partly agree where it matters most for this product:** F16's own
  *applied-setting* subgroup is **SMD = 0.23, p = 0.24 — non-significant**, which points the same
  direction as F17's applied-domain scepticism. The disagreement is largely about whether the
  laboratory effect (F16: SMD = 0.92) should be treated as the finding or as the artefact. Both were
  collected as a **matched pair** exactly as source-lead rows #24/#25 instruct, so the dispute is
  registered rather than half-resolved. **Neither side may be cited without the other.**

### Coverage gap — RECONFIRMED, NOT CLOSED (this is the honest result, not a shortfall)
- **Sub-Q4 stands. No study testing spaced repetition on a blackjack-shaped decision rule was found
  by this pass either.** This is now the **third** independent confirmation of the same absence (V5,
  V5b, and this pass). Searches run: spaced retrieval practice × "decision rule"/"if-then rule"
  application training retention; spacing effect × "situation-action"/"conditional rule"/"strategy
  table" decision-skill retention × blackjack basic strategy. Nearest hits were a radiology-education
  systematic review of spaced learning/interleaving/retrieval practice, medical-resident repeated
  testing, and blackjack basic-strategy chart material with no training-methodology content. **No
  study was invented to fill this gap, and none should be.** The four sources added here bound the
  gap more tightly than before — they do not close it:
  - F19 shows the field's own generalization review does not list such a task.
  - F18 shows the modern spaced-retrieval meta-analysis **excludes** perceptual and motor learning by
    inclusion criterion, so it cannot be stretched to cover it.
  - F16/F17 show the tradition that *does* own situation→action practice scheduling (CI) is (a)
    motor-domain and (b) in open dispute, with its applied-setting effect non-significant in F16's own
    subgroup analysis.
- **Cross-reference V5b flagged as missing, now supplied (synthesis note, no new citation required):**
  F12's authors' own caveat — that domains with "multiple grain sizes... dependencies... and transfer
  effects" are unresolved for model-based scheduling — is **direct support for this sub-Q4 gap** and
  should be read together with it. A basic-strategy decision rule is precisely such a domain. V5b
  observed the dossier never connected the two; this sentence connects them. (Per V5b's own nuance:
  the authors mean *inter-item* transfer within a learning set, and they are describing the difficulty
  of *building an accurate model*, not predicting that spacing fails. Do not overread it.)

### Leads found but deliberately not collected (returned for the source-lead register)
- **Commentary on Ammar et al. (2024)**, *Educational Psychology Review*, DOI
  10.1007/s10648-025-10006-6 — the published rebuttal in the CI dispute.
- **"Advancing Contextual Interference: Addressing Methodological Debates, Reflecting on Meta-Analytic
  Practices and Generalizability, and Guiding Future Directions in Motor Learning"**, *Educational
  Psychology Review*, DOI 10.1007/s10648-025-10043-1 — the further reply.
- **"Comment on Czyż et al. (2024) on Contextual Interference in Motor Learning"**, SportRxiv preprint
  435 — the other direction of the same dispute.
- **"The effect of contextual interference on transfer in motor learning — a systematic review and
  meta-analysis,"** *Frontiers in Psychology* (2024) — a CI **transfer** meta-analysis, which is
  arguably nearer sub-Q4 than either collected CI paper (transfer, not retention).
- All four are **in scope of the CI dispute but outside this pass's named gap**, which specified the
  matched pair only. Recorded as leads per scope discipline; **not chased.**

### Tooling hazards encountered (two real, both recorded — neither silently absorbed)
1. **A fetch-summariser returned a fabricated journal name.** Retrieving F17 through the text-proxy
   route produced a citation line reading *"Educational Research Review, 39, 100537"* — a real-looking
   but **wrong** venue, volume and article number for a DOI in the `10.1007/s10648` (Educational
   Psychology Review) prefix, and it also returned a **7-author** list. Both were rejected and the
   record was re-established from the **Crossref API** (`api.crossref.org/works/10.1007/s10648-024-09892-z`),
   which returned *Educational Psychology Review*, 36(2), article 57, and a **10-author** list; an
   independent bibliographic mirror returned the identical 10-author list. **The masthead recorded in
   F17 above is the Crossref-confirmed one.** This is exactly the hazard the shared brief warns about
   and it would have produced a fabricated-looking citation if accepted uncritically.
2. **A PDF mirror returned undecodable content rather than an error.** `andymatuschak.org`'s copy of
   Carpenter et al. (2012) returned compressed stream data from which no abstract or body text could
   be extracted, while still yielding a plausible-looking author/year header. It was **abandoned, not
   partially quoted**; F19 is sourced entirely from the `pdf.retrievalpractice.org` copy, which
   extracted cleanly. Separately, F18's host (`lscp.net`) is **http-only** and refused a direct
   https connection (ECONNREFUSED), and both Springer targets returned IdP redirects; the text-proxy
   route resolved all three.
3. Not a hazard, but recorded for the verifier: **every quotation in F16–F19 comes from a retrieval
   performed this session.** Where two retrieval routes were run against the same source (F16), the
   subgroup figures matched across both. The verifier should nonetheless re-extract independently —
   this pass used WebFetch rather than local `pdftotext`, which is a **weaker** extraction path than
   V5b's, and that difference should be treated as a reason for closer scrutiny of F16–F19, not less.

### Citation-count confirmation (top-up)
Exactly **4** citations added: F16, F17, F18, F19 — matching V5b's 4-source scope one-for-one (CI
matched pair + two landmark reviews). No fifth source was added; four in-scope adjacent CI sources
were left as register leads rather than collected. Initial collection **15**; top-up **4**; card total
**19**, as V5b predicted.
