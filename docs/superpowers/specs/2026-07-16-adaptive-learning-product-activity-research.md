# Adaptive Learning Product and Activity Research

> Status: evidence collection in progress.
> Scope: initial product/activity research for the local adaptive-learning mechanics proof.
> Authority: research evidence only; adopted product behavior remains in approved owned designs.

## Research Questions

1. Which short-session structures help learners begin immediately, understand the goal, and stop without penalty?
2. How do effective products scaffold first exposure, guided practice, independent evidence, review, and placement/skip tests?
3. Which mistake, hint, feedback, and retry patterns teach without turning assistance into mastery proof?
4. What evidence supports retrieval practice, spacing, interleaving, worked examples, cognitive-load control, feedback timing, and mastery learning for this product?
5. What requirements should govern multiple-choice, assemble-blocks, and engine-backed-hand activities?
6. Which accessibility requirements apply before visual polish or mobile work begins?
7. Which publicly documented technical/content boundaries are transferable without copying a proprietary implementation?

## Evidence Labels

- **OBSERVED:** directly visible in a publicly accessible product flow, help page, demonstration, or screenshot reviewed during this run.
- **PUBLISHED:** claimed or found in an attributable official source, primary study, standard, or authoritative review.
- **INFERENCE:** the project's reasoned interpretation or proposed application of observed/published evidence.
- **COVERAGE GAP:** a required question for which adequate primary/official evidence was not found.

## Source Register

| ID | Source | Publisher / authors | Date | Source type | Evidence scope | Retrieval date | Limitations |
|---|---|---|---|---|---|---|---|
| DUO-001 | [The Duolingo Method](https://blog.duolingo.com/duolingo-teaching-method/) | Duolingo / Cassie Freeman | 2023-02-02 | Official product and learning-method article | Interactive first exposure, easier-to-harder progression, optional hints, personalization, bite-sized lessons | 2026-07-16 | Product self-description; linked research is not reported with enough detail here to establish causal effects. |
| DUO-002 | [Practice any skill, any time in the Practice tab](https://blog.duolingo.com/guide-to-duolingo-practice-hub/) | Duolingo / Holly Munson | 2026-02-18 | Official product guide | Learner-selected targeted practice, mistake review, activity variety, and example set size | 2026-07-16 | Current product snapshot limited to described platforms and courses; no selection algorithm or outcome study. |
| DUO-003 | [How our learners help improve Duolingo](https://blog.duolingo.com/how-duolingo-works-with-learners/) | Duolingo / Ben Reuveni and Billy Leet | 2022-04-04 | Official research and product article | UX research, targeted mistake practice, controlled feature experiments, and staged evaluation | 2026-07-16 | Selected internal examples with incomplete protocols and no reusable production implementation. |
| DUO-004 | [Rewriting Duolingo's engine in Scala](https://blog.duolingo.com/rewriting-duolingos-engine-in-scala/) | Duolingo / André Kenji Horie | 2017-01-31 | Official engineering article | Session-generator boundary, course-data preprocessing, sequencing, caching, and latency posture | 2026-07-16 | Historical architecture from 2017; current stack and algorithms may differ and are not inferred. |
| DUO-005 | [Improving Duolingo, one experiment at a time](https://blog.duolingo.com/improving-duolingo-one-experiment-at-a-time/) | Duolingo / Lavanya Aprameya | 2020-01-10 | Official engineering and experimentation article | Hypothesis-led A/B tests, gradual rollout, metric templates, and learning/engagement guardrails | 2026-07-16 | Internal-service self-report; experiment definitions, datasets, and statistical code are not public. |
| DUO-006 | [A Trainable Spaced Repetition Model for Language Learning](https://research.duolingo.com/papers/settles.acl16.pdf) | Burr Settles and Brendan Meeder / ACL | 2016 | Peer-reviewed operational study | Recall prediction and an operational spaced-practice model using Duolingo language-learning data | 2026-07-16 | Language-item recall and engagement do not establish blackjack mastery thresholds or a general learner model. |
| BRI-001 | [Making a world of great problem solvers](https://brilliant.org/about/) | Brilliant Worldwide | n.d. (live 2026 page) | Official product and method page | Visual first exposure, pretesting, fading scaffolds, low-stakes review, interleaving, custom feedback, and simple visible progress | 2026-07-16 | Company self-description; several practices are described as active experiments without published protocols or outcomes. |
| BRI-002 | [Brilliant FAQ](https://brilliant.org/faq/) | Brilliant Worldwide | n.d. (live 2026 page) | Official product FAQ | Bite-sized lessons, 2-minute practice option, 15-minute recommendation, progression, feedback, and personalized recommendations | 2026-07-16 | Marketing/help claims; duration and effectiveness claims are not tied to an inspectable study on the page. |
| BRI-003 | [Can I reset course progress?](https://brilliant.org/help/features/can-i-reset-course-progress/) | Brilliant Worldwide | 2026-05-27 | Official help article | Individual-lesson redo and review behavior | 2026-07-16 | Narrow feature snapshot; does not explain retry evidence, mastery effects, or course-wide state semantics. |
| BRI-004 | [Practice math at your level](https://brilliant.org/math/practice/) | Brilliant Worldwide | n.d. (live 2026 page) | Official product page | Stepwise interactive practice, mistake feedback, concept tracking, and progress-based practice-set selection | 2026-07-16 | Marketing description without learner-model details, independent evaluation, or accessibility behavior. |
| SCI-001 | [The Critical Importance of Retrieval for Learning](https://doi.org/10.1126/science.1152408) | Jeffrey Karpicke and Henry Roediger / Science | 2008-02-15 | Primary experiment | Repeated retrieval and delayed recall for learned vocabulary | 2026-07-16 | University learners and paired vocabulary; does not determine product scheduling or mastery thresholds. |
| SCI-002 | [Distributed practice in verbal recall tasks: a review and quantitative synthesis](https://pubmed.ncbi.nlm.nih.gov/16719566/) | Nicholas Cepeda, Harold Pashler, Edward Vul, John Wixted, and Doug Rohrer / Psychological Bulletin | 2006-05 | Meta-analysis | Spacing and lag effects across verbal-recall studies | 2026-07-16 | Heterogeneous laboratory tasks; optimal intervals depend on retention target and cannot be copied into product configuration. |
| SCI-003 | [The Shuffling of Mathematics Practice Problems Boosts Learning](https://digitalcommons.usf.edu/psy_facpub/1767/) | Doug Rohrer and Kelli Taylor / Instructional Science | 2007-11 | Primary experiments | Spaced and interleaved mathematics practice with a delayed test | 2026-07-16 | Two mathematics experiments; transfer to blackjack classification requires product validation. |
| SCI-004 | [The Use of Worked Examples as a Substitute for Problem Solving in Learning Algebra](https://doi.org/10.1207/s1532690xci0201_3) | John Sweller and Graham Cooper / Cognition and Instruction | 1985 | Primary experiments | Worked examples for novice algebra learning and schema acquisition | 2026-07-16 | Algebra populations and materials; expertise reversal and appropriate fading are not resolved by this study alone. |
| SCI-005 | [Digitally delivered instructional feedback and learning performance](https://link.springer.com/article/10.1007/s10984-024-09501-4) | Leonie Brummer, Hester de Boer, Jolien M. Mouw, and Jan-Willem Strijbos / Learning Environments Research | 2024-06-17 | Meta-analysis | Feedback content, timing, learner control, context, and task moderators in digital environments | 2026-07-16 | Included studies end in 2019, exclude special-needs education, and do not support one universal timing rule. |
| SCI-006 | [Effectiveness of Mastery Learning Programs: A Meta-Analysis](https://doi.org/10.3102/00346543060002265) | Chen-Lin Kulik, James Kulik, and Robert Bangert-Drowns / Review of Educational Research | 1990-06 | Meta-analysis | Achievement, attitude, time, and completion effects across 108 mastery-learning evaluations | 2026-07-16 | Older, heterogeneous classroom programs; procedures and course contexts materially moderated results. |
| SCI-007 | [Student Motivation and Associated Outcomes](https://pubmed.ncbi.nlm.nih.gov/33593153/) | Joshua Howard, Julien Bureau, Frédéric Guay, Jane Chong, and Richard Ryan / Perspectives on Psychological Science | 2021-11 | Meta-analysis | Associations between motivation types and performance, persistence, and well-being | 2026-07-16 | Mostly correlational samples; does not prove a specific interface mechanic causes autonomous motivation. |
| SCI-008 | [Termination Criteria in Computerized Adaptive Tests](https://www.jcatpub.net/index.php/jcat/article/view/16) | Ben Babcock and David Weiss / Journal of Computerized Adaptive Testing | 2013-02-08 | Simulation study | Precision, item count, item-bank sensitivity, and stopping rules in adaptive assessment | 2026-07-16 | Psychometric simulation rather than a learning activity; assumes calibrated item information unavailable in the first proof. |
| SCI-009 | [Cognitive Architecture and Instructional Design: 20 Years Later](https://link.springer.com/article/10.1007/s10648-019-09465-5) | John Sweller, Jeroen van Merriënboer, and Fred Paas / Educational Psychology Review | 2019-01-22 | Authoritative review | Worked examples, guidance fading, split attention, redundancy, variability, expertise, and cognitive-load limits | 2026-07-16 | Theory-led review spanning varied domains; several effects have expertise and element-interactivity moderators. |
| STD-001 | [Web Content Accessibility Guidelines 2.2](https://www.w3.org/TR/WCAG22/) | W3C Accessibility Guidelines Working Group | 2023-10-05; errata incorporated 2024-12-12 | W3C Recommendation | Normative success criteria for keyboard access, focus, non-color cues, errors, dragging alternatives, target size, timing, and semantics | 2026-07-16 | Conformance baseline, not a complete cognitive-accessibility or usability specification; product testing remains necessary. |
| STD-002 | [Cognitive and learning disabilities and web barriers](https://www.w3.org/WAI/people-use-web/abilities-barriers/cognitive/) | W3C Web Accessibility Initiative | n.d. (current guidance) | Official informative guidance | Clear structure, consistent labels, predictable interaction, concise language, adaptation, and recoverable errors | 2026-07-16 | Informative rather than normative and intentionally broad across diverse user needs. |
| TECH-001 | [Hand-crafted, machine-made: How we make learning games with AI](https://blog.brilliant.org/hand-crafted-machine-made/) | Brilliant Staff | 2025-01-30 | Official technical and authoring article | Human-owned objectives and progression, constrained generation, variants, playtesting, and human correctness review | 2026-07-16 | High-level public account; representations, prompts, tools, and production quality data remain proprietary. |
| TECH-002 | [When almost right is catastrophically wrong: Evals for AI learning games](https://blog.brilliant.org/when-almost-right-is-catastrophically-wrong-evals-for-ai-learning-games/) | Brilliant / Blake Farrow | 2025-02-27 | Official technical evaluation article | Correctness, unique solvability, visual clarity, state consistency, impossible-state, and playability checks | 2026-07-16 | Selected examples and headline pass rates; eval implementation, datasets, and failure distributions are not public. |

## Product-Pattern Comparison

| Pattern | Duolingo evidence | Brilliant evidence | Other evidence | Evidence label | Transferable requirement | Confidence / limitation |
|---|---|---|---|---|---|---|
| session entry and goal framing | **PUBLISHED:** lessons begin with interactive work, moving from simpler to harder material (`DUO-001`). | **PUBLISHED:** lessons focus on one concept, begin with the simplest form, and may pretest before instruction (`BRI-001`). | Worked examples can benefit novices (`SCI-004`). | PUBLISHED; INFERENCE | **INFERENCE:** state one evidence goal, start interaction immediately, and keep canonical guidance available when first exposure would otherwise require guessing. | Medium; official self-descriptions do not compare alternative entry flows or blackjack learners. |
| session length and stopping behavior | **PUBLISHED:** bite-sized lessons take a few minutes (`DUO-001`); exact stopping and resume behavior is a **COVERAGE GAP**. | **PUBLISHED:** Brilliant recommends 15 minutes and offers a 2-minute practice option (`BRI-002`); voluntary mid-set stopping behavior is a **COVERAGE GAP**. | Autonomy-supportive motivation correlates with better persistence and well-being (`SCI-007`). | PUBLISHED; COVERAGE GAP; INFERENCE | **INFERENCE:** let the learner choose a bounded time/activity preset, preserve completed evidence, and treat stopping as neutral rather than failure. | Medium-low; durations are product recommendations, not comparative causal thresholds. |
| first exposure and worked examples | **PUBLISHED:** easier exercises, optional hints, and short explanations precede harder application (`DUO-001`). | **PUBLISHED:** visual explanation and manipulation build intuition with low initial complexity; Brilliant also reports pretesting before procedure (`BRI-001`). | Worked-example evidence favors guidance for novices but does not define fading for this domain (`SCI-004`). | PUBLISHED; INFERENCE | **INFERENCE:** support a guided first encounter and fade assistance before evidence is counted as independent mastery proof. | Medium; the products use different subjects and Brilliant's pretest claim is an internal conclusion. |
| activity variation | **OBSERVED:** official guides show distinct speaking, listening, matching, mistake-review, story, and word-practice formats (`DUO-002`). | **PUBLISHED:** lessons mix visual representation, hands-on manipulation, direct instruction, and problem solving (`BRI-001`). | Interleaving benefits discrimination in a mathematics study (`SCI-003`). | OBSERVED; PUBLISHED; INFERENCE | **INFERENCE:** vary activity form only when it measures the target evidence or transfer; do not equate novelty with learning value. | Medium; inventories are snapshots and neither source exposes selection weights. |
| mistake handling and retry | **OBSERVED:** mistake review targets prior errors in a separate practice set (`DUO-002`, `DUO-003`). | **OBSERVED:** individual lessons can be redone or reviewed; **PUBLISHED:** interactive problems give answer-specific feedback (`BRI-003`, `BRI-001`). | Feedback effectiveness varies by content and context (`SCI-005`). | OBSERVED; PUBLISHED; INFERENCE | **INFERENCE:** preserve the first response, label retry and assistance separately, give corrective feedback, and schedule later evidence rather than looping until a guessed answer appears learned. | Medium; exact retry routing and mastery impact are not public. |
| hint escalation | **PUBLISHED:** Duolingo names optional hints and bite-sized explanations (`DUO-001`), but an ordered ladder is a **COVERAGE GAP**. | **PUBLISHED:** scaffolds and hints are removed from independent practice; Koji is described as asking rather than handing over answers (`BRI-001`). | Worked-example evidence supports initial guidance, not a universal hint sequence (`SCI-004`). | PUBLISHED; COVERAGE GAP; INFERENCE | **INFERENCE:** use bounded, activity-owned hint levels from orientation to direct answer; every level records assistance and direct-answer use cannot count as independent evidence. | Medium-low; neither source publishes escalation rules or hint-cost experiments. |
| immediate versus delayed feedback | **COVERAGE GAP:** reviewed official sources show in-lesson help and later mistake practice but do not define a general timing policy (`DUO-001`, `DUO-002`). | **PUBLISHED:** interactive problems provide instant custom feedback while independent review removes scaffolds (`BRI-001`). | Both immediate and delayed digital feedback can help; context and consistency matter more than one universal winner (`SCI-005`). | PUBLISHED; COVERAGE GAP; INFERENCE | **INFERENCE:** default to immediate canonical correction during acquisition and support delayed round/session review for transfer or assessment; configure timing by evidence mode. | Medium; the meta-analysis is heterogeneous and excludes special-needs education. |
| review and spaced return | **OBSERVED/PUBLISHED:** learners can select mistake and skill practice; Duolingo has also published an operational recall-scheduling model (`DUO-002`, `DUO-006`). | **PUBLISHED:** low-stakes practice removes scaffolds and experiments with spacing, interleaving, weak areas, set length, and review across lessons (`BRI-001`). | Retrieval, spacing, and interleaving have supporting evidence with domain limitations (`SCI-001`, `SCI-002`, `SCI-003`). | OBSERVED; PUBLISHED; INFERENCE | **INFERENCE:** revisit weak and older skills across sessions, mix classification demands, and calibrate intervals from blackjack practice data instead of copying a product algorithm. | Medium-high for the general principle; low for any schedule or threshold. |
| progress/mastery presentation | **PUBLISHED:** exercise order and difficulty adapt to strengths and weaknesses (`DUO-001`); the reviewed sources do not define a current visible mastery vocabulary. | **PUBLISHED:** Brilliant intentionally shows simplified milestones while tracking richer concept relations and progress (`BRI-001`, `BRI-004`). | Mastery programs show average benefits and time/completion tradeoffs (`SCI-006`). | PUBLISHED; COVERAGE GAP; INFERENCE | **INFERENCE:** show a small stable state vocabulary while retaining richer versioned evidence internally; do not let a single completion or mistake directly set mastery. | Medium; both production reducers are proprietary and historical mastery evidence is heterogeneous. |
| placement or skip tests | **COVERAGE GAP:** no reviewed official source specifies placement coverage, pass rules, or failure routing. | **COVERAGE GAP:** personalized starting-point claims do not expose test content, thresholds, or routing (`BRI-004`). | Adaptive-test precision depends on item-bank information and termination policy (`SCI-008`). | COVERAGE GAP; PUBLISHED; INFERENCE | **INFERENCE:** make skip tests deterministic, unassisted, coverage-complete for gated skills, and explicit about missing evidence; do not claim psychometric adaptivity without calibrated items. | Low; this remains primarily an umbrella constraint with limited transferable product evidence. |
| motivation without outcome bias | **PUBLISHED:** points, streaks, encouragement, and social features support practice habits (`DUO-001`). | **PUBLISHED:** streaks, leagues, feedback, and milestones are used, while Brilliant says it limits game incentives to keep focus on content (`BRI-001`, `BRI-002`). | Autonomous and personally valued motivation correlate with persistence and well-being; externally controlled motivation has weaker or adverse associations (`SCI-007`). | PUBLISHED; INFERENCE | **INFERENCE:** reward practice, comprehension, and decision quality; never celebrate money won, penalize stopping, or use hand outcome as evidence of skill. | Medium for motivation direction; decision/outcome separation is a blackjack project constraint, not a competitor-derived finding. |
| accessibility and non-color cues | **COVERAGE GAP:** no product-specific conformance or reviewed activity audit was found. | **COVERAGE GAP:** no product-specific conformance or reviewed activity audit was found. | WCAG 2.2 and WAI cognitive guidance cover keyboard operation, focus, semantics, non-color information, target alternatives, predictable structure, concise text, and error recovery (`STD-001`, `STD-002`). | COVERAGE GAP; PUBLISHED; INFERENCE | **INFERENCE:** every activity must be keyboard-operable, programmatically named, understandable without color, usable without essential dragging, and tested for focus, target, error, zoom/reflow, and cognitive clarity. | High for the standards baseline; product-specific usability still requires representative testing. |

## Learning-Science Evidence

| Topic | Finding | Source IDs | Evidence strength / limitation | Project inference |
|---|---|---|---|---|
| retrieval practice | **PUBLISHED:** after initial learning, repeated retrieval produced substantially better delayed recall than repeated study in a controlled vocabulary experiment. | `SCI-001` | Strong primary evidence for the tested university/vocabulary setting; one task and population do not establish a universal activity format. | **INFERENCE:** require learners to produce independent first responses and revisit retrieval after feedback; repeated viewing or answer-assisted retries are not equivalent mastery evidence. |
| spacing and retention | **PUBLISHED:** distributed practice generally improves later verbal recall, while the useful interval depends on the desired retention interval and study context. | `SCI-002`, `DUO-006` | Large meta-analysis plus an operational language model; tasks are recall-heavy and the operational outcome does not validate blackjack intervals. | **INFERENCE:** collect evidence across sessions and make review intervals versioned configuration calibrated from this product, never copied from a language model. |
| interleaving and discrimination | **PUBLISHED:** mixed mathematics practice improved delayed selection and performance compared with blocked practice in the reported experiments. | `SCI-003` | Direct experiments with delayed tests, but a narrow mathematics domain and limited activity types. | **INFERENCE:** after initial guided practice, mix hand/outcome classifications so the learner must identify the relevant rule rather than repeat one visible procedure. |
| worked examples and fading guidance | **PUBLISHED:** worked examples reduce novice problem-solving load; completion problems can bridge from near-complete solutions to independent work, while benefits diminish with expertise. | `SCI-004`, `SCI-009` | Multiple primary experiments plus an authoritative review; domains are mainly structured academic problems and good example design is itself difficult. | **INFERENCE:** begin with a canonical worked state or nearly complete assembly, then fade blocks and hints; do not force the same scaffold on demonstrated experts. |
| cognitive load and split attention | **PUBLISHED:** novel information is constrained by working memory; unnecessary separation of mutually dependent information increases load, while integrated presentation can restore learning benefits. | `SCI-009` | Broad theory and review grounded in many controlled studies; load depends on prior knowledge and element interaction, and measurement remains imperfect. | **INFERENCE:** keep the hand state, question, allowed actions, feedback, and explanation spatially/temporally coherent; remove decorative or duplicated information that competes with the decision. |
| immediate versus delayed feedback | **PUBLISHED:** across digital-learning interventions, both immediate and delayed feedback improved learning; delayed feedback was slightly stronger on average, but task, content, context, learner control, and consistency moderated outcomes. | `SCI-005` | Meta-analysis of 116 interventions from 46 articles; studies ended in 2019, were heterogeneous, and excluded special-needs education. | **INFERENCE:** use immediate canonical correction for acquisition and configurable delayed review for transfer or assessment; timing is an evidence-mode decision, not one global rule. |
| mastery learning and prerequisite gates | **PUBLISHED:** mastery-learning programs showed positive average achievement and attitude effects, especially for weaker learners, alongside extra time and lower completion in some self-paced college programs. | `SCI-006` | Meta-analysis of 108 controlled evaluations; older, heterogeneous procedures and content materially moderated results. | **INFERENCE:** gate only essential prerequisites, preserve guided progress elsewhere, and keep evidence counts and thresholds provisional until blackjack use data exists. |
| adaptive assessment and evidence quality | **PUBLISHED:** adaptive-test precision and length depend on calibrated item information, ability estimation, and termination criteria; longer tests can improve accuracy with diminishing returns. | `SCI-008` | Transparent simulation study, not an instructional trial; assumes psychometric calibration and an item bank the first proof does not have. | **INFERENCE:** the first skip test should use deterministic, coverage-complete unassisted evidence rules rather than claim psychometric adaptivity; record enough evidence to evaluate calibration later. |
| motivation, autonomy, and non-punitive stopping | **PUBLISHED:** intrinsic and personally valued motivation correlate with success, persistence, and well-being, while externally controlled motivation is not associated with performance/persistence and relates to lower well-being. | `SCI-007` | Large meta-analysis across 344 samples, but primarily correlational and not a test of app stopping mechanics. | **INFERENCE:** offer meaningful session-size choice, explain progress, and make stopping/resuming neutral; avoid loss-framed streak pressure, outcome celebration, or coercive continuation. |
| accessibility for cognitive and motor interaction | **PUBLISHED:** WCAG 2.2 requires operable, perceivable, understandable, and robust interaction including keyboard, focus, semantics, non-color, target, timing, and dragging alternatives; WAI guidance adds predictable structure, concise language, and recoverable errors. | `STD-001`, `STD-002` | Normative standard plus official informative guidance; neither replaces representative user testing or proves a learning effect. | **INFERENCE:** accessibility is part of every activity contract and verification plan before polish, including keyboard-only, screen-reader semantics, zoom/reflow, reduced motion, touch targets, non-color cues, and error recovery. |

Existing project directions cross-check:

- **Targeted repetition:** supported in principle by retrieval and spacing evidence (`SCI-001`,
  `SCI-002`), but not by trapping learners in same-session answer repetition.
- **Hint ladder:** worked examples and fading support graded assistance (`SCI-004`, `SCI-009`), but
  the existing four-level ladder remains a project design rather than a research-derived sequence.
- **Interleaving:** supported for discrimination after foundational practice (`SCI-003`); the
  evidence does not justify mixing every activity from first exposure.
- **Evidence across sessions:** spacing and mastery findings support repeated evidence over time
  (`SCI-002`, `SCI-006`), while exact counts, intervals, and decay rules remain coverage gaps.
- **Decision/outcome separation:** no reviewed learning-product or study source directly tests
  gambling outcome bias. Keeping decision quality independent from hand outcome remains an approved
  blackjack training constraint, not a newly inferred research finding.
- **Guided progression:** mastery evidence supports corrective opportunity but includes time and
  completion tradeoffs (`SCI-006`); strict prerequisite selection and skip-test coverage remain
  deterministic project policy requiring proof-specific validation.

## Public Technical and Tooling Evidence

| Concern | Publicly verified evidence | Source IDs | Unknown / proprietary boundary | Transferable implication |
|---|---|---|---|---|

## Initial Activity Requirements

### Multiple Choice

### Assemble Blocks

### Engine-Backed Hand

### Shared Activity Requirements

### Session, Hint, Review, and Skip-Test Requirements

### Accessibility Requirements

## Adopt, Reject, or Defer

| Candidate pattern | Disposition | Evidence IDs | Reason | Consumer |
|---|---|---|---|---|

## Coverage Gaps and Conflicting Evidence

- **COVERAGE GAP — Product accessibility behavior:** The bounded official Duolingo and Brilliant
  searches did not yield a product-specific keyboard, screen-reader, reduced-motion, or non-color
  audit for the reviewed activity flows. `STD-001` and `STD-002` therefore define the transferable
  baseline; product compliance is not assumed.
- **COVERAGE GAP — Placement and skip-test mechanics:** Official sources describe progression,
  personalization, and practice, but do not expose enough detail to compare deterministic placement
  coverage, pass criteria, or failure routing.
- **COVERAGE GAP — Production learner models:** No attributable public repository or official page
  found in the bounded searches exposes either product's complete production mastery reducer,
  exercise-selection algorithm, item calibration, or experiment-analysis implementation.
- **COVERAGE GAP — Brilliant experimental strength:** `BRI-001` names active experiments in review
  timing, composition, interleaving, automaticity, and set length, but publishes neither protocols
  nor outcome estimates; those statements remain product behavior claims, not learning effects.
- **COVERAGE GAP — Blackjack transfer:** The learning studies cover language, mathematics, general
  digital learning, or psychometric simulation. They support bounded hypotheses, not numeric
  mastery thresholds or guaranteed transfer to blackjack decisions.
- **CONFLICT — Recommended session size:** Duolingo describes lessons of a few minutes
  (`DUO-001`), while Brilliant recommends 15 minutes and also offers 2-minute practice
  (`BRI-002`). This affects session presets, not a universal optimum; the proof must treat duration
  and activity count as learner-selected, research-calibrated configuration.
- **CONFLICT — First exposure:** Brilliant reports pretesting before procedure (`BRI-001`), while
  worked-example evidence favors stronger novice guidance (`SCI-004`). This affects initial
  assistance: a low-stakes attempt may diagnose prior knowledge, but must not strand a novice or
  count a guess as mastery evidence.
- **CONFLICT — Feedback timing:** Brilliant emphasizes instant custom feedback (`BRI-001`), while
  digital-feedback evidence finds both immediate and delayed modes useful under different
  conditions (`SCI-005`). This affects acquisition versus transfer modes; no single global timing
  rule is justified.
- **CONFLICT — Motivation and stopping:** Both products publish streak/competition mechanics
  (`DUO-001`, `BRI-001`), while motivation evidence distinguishes autonomous from controlled
  regulation (`SCI-007`). This affects session-end copy and rewards: the proof must not punish
  stopping or use loss-framed pressure.
- **CONFLICT — Mastery visibility:** Brilliant deliberately simplifies visible milestones while
  acknowledging richer underlying relations (`BRI-001`); mastery research reports benefits plus
  time and completion tradeoffs (`SCI-006`). This affects the state vocabulary and argues for
  simple labels backed by auditable evidence rather than a visible pseudo-precise score.

## Recommendations Requiring User Approval
