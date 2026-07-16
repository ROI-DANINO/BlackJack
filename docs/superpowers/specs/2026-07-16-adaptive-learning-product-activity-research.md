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
| BRI-005 | [Brilliant Basics](https://brilliant.org/help/using-brilliant/) | Brilliant Worldwide | n.d. (live 2026 help page) | Official help index | Current online-only access, cross-device progress sync, lesson access, and product-surface behavior | 2026-07-16 | Aggregated help snapshot with little implementation detail; availability and product behavior may change. |
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
| curriculum/content representation | **PUBLISHED:** Duolingo's historical Session Generator consumed course data preprocessed and serialized outside request handling; Brilliant says human authors retain objectives, progression, and intended learning moments. | `DUO-004`, `TECH-001` | Current schemas, authoring model, versioning, validation, and release machinery for both products are not public. | **INFERENCE:** keep stable curriculum, provenance, and objectives in versioned serializable data owned independently from session sequencing. This is a boundary requirement, not a format or tool admission. |
| activity/component representation | **PUBLISHED:** Duolingo described known exercise/challenge kinds; Brilliant describes game-specific representations and separate generation/evaluation behavior per game type. | `DUO-004`, `TECH-001`, `TECH-002` | Production component registries, schemas, rendering contracts, and extension mechanisms are proprietary. | **INFERENCE:** planners request known versioned activity kinds and bounded parameters; deterministic factories own prompts, valid states, answers, and grading. No framework or component library is selected. |
| content validation and preview | **PUBLISHED:** Brilliant reports human review of generated problems and automated checks for correctness, solvability, state consistency, visual clarity, impossible states, and playability before human review. | `TECH-001`, `TECH-002` | Eval code, datasets, thresholds, authoring preview, review roles, false-positive rates, and publication controls are not public. | **INFERENCE:** later authoring must validate truth and interaction invariants and support human preview/playtest; compilation alone cannot approve learning content. The consumer must choose tools through its own gate. |
| experimentation and rollout | **PUBLISHED:** Duolingo describes hypotheses, explicit arms/eligibility, metric templates, gradual rollout, monitoring, pausing, and rejecting changes that harm learning or retention. | `DUO-003`, `DUO-005` | Assignment, exposure, analysis code, guardrail definitions, governance, and current production system remain internal. | **INFERENCE:** any future beta experiment needs a named learning question, predeclared guardrails, staged exposure, and a stop/reject path. This does not admit analytics or experimentation infrastructure. |
| learner-model or personalization boundary | **PUBLISHED:** Duolingo published one recall model and described a session generator; Brilliant publicly separates simplified milestones, practice selection, and a richer learner model. | `DUO-001`, `DUO-006`, `BRI-001`, `BRI-004` | Complete features, reducers, item parameters, update policies, production model code, and causal efficacy evidence are not public. | **INFERENCE:** store raw versioned attempts, reduce mastery deterministically, and provide compact evidence to a bounded planner; neither competitor model nor an AI service becomes authority. |
| offline/cache behavior | **PUBLISHED:** Duolingo's 2017 design cached serialized course data and a 2020 article discussed offline lessons; Brilliant's current help says lessons require connectivity while progress syncs between devices. | `DUO-004`, `DUO-005`, `BRI-005` | Current cache invalidation, offline write/reconciliation, storage, sync, and recovery semantics are not documented. | **INFERENCE:** the local proof must keep canonical fallback activity available without a network request; durable storage and sync choices remain in their separate triggered research gates. |
| accessibility testing | **PUBLISHED:** WCAG defines normative interaction criteria and WAI supplies cognitive guidance; Brilliant publicly mentions visual-clarity evals for generated puzzles. | `STD-001`, `STD-002`, `TECH-002` | Neither reviewed product publishes a complete accessibility test matrix, assistive-technology results, conformance report, or generated-content accessibility gate. | **INFERENCE:** combine semantic/automated checks with keyboard, screen-reader, zoom/reflow, reduced-motion, touch, non-color, and cognitive-clarity playtests; no accessibility tool is admitted here. |
| analytics/evaluation boundary | **PUBLISHED:** Duolingo distinguishes feature experiments and learning/engagement metrics; Brilliant distinguishes generated-puzzle correctness evals from human review. | `DUO-003`, `DUO-005`, `TECH-002` | Event taxonomies, retention, consent, experiment statistics, evaluation datasets, and operational dashboards are proprietary. | **INFERENCE:** keep content correctness/evals, deterministic learner evidence, feature QA, and later product analytics as separate consumers with separate authority and admission decisions. |

## Initial Activity Requirements

### Multiple Choice

- **ALR-001 — Use multiple choice for bounded recognition or classification evidence, not for procedural transfer by itself.**
  - Applies to: multiple-choice activity.
  - Evidence: **PUBLISHED/INFERENCE:** `DUO-001`, `BRI-001`, `SCI-001`; current `QuestionStep` and outcome-ID project contracts.
  - Verification: every activity declares one or more skill/evidence goals, and a review can explain why selecting among choices measures them.
  - Limitation: recognition can overestimate recall or table execution, so later independent evidence must use a different or less-supported mode.

- **ALR-002 — Resolve prompts, choices, correct answers, and grading from versioned curriculum or deterministic engine facts.**
  - Applies to: multiple-choice prompt and response contract.
  - Evidence: **PROJECT CONSTRAINT:** approved umbrella authority table; **PUBLISHED/INFERENCE:** `TECH-001`, `TECH-002`.
  - Verification: a serialized activity contains stable choice IDs and an authority reference; replay with the same versions yields the same verdict.
  - Limitation: bounded AI may reword approved display slots only after validation and cannot change facts, choices, answers, or grading.

- **ALR-003 — Generate distractors only from approved misconceptions or deterministic transformations and require an unambiguous answer set.**
  - Applies to: multiple-choice choice generation.
  - Evidence: **PROJECT CONSTRAINT:** approved umbrella activity system; **PUBLISHED/INFERENCE:** correctness and unique-solvability checks in `TECH-002`.
  - Verification: validation rejects duplicate meanings, unsupported false claims, inaccessible labels, missing answer authority, and unintended multiple correct choices.
  - Limitation: a plausible distractor is not automatically a diagnosed misconception; repeated evidence or explicit reasoning is still required.

- **ALR-004 — Preserve the first response and record each retry and hint level as assistance rather than replacing the original attempt.**
  - Applies to: multiple-choice hints, retry, and evidence emission.
  - Evidence: **INFERENCE:** `SCI-001`, `SCI-004`, `SCI-009`; existing assistance and attempt-record project contracts.
  - Verification: an automated contract test shows first response, retries, hint/direct-answer use, final response, and correctness remain separately observable.
  - Limitation: assisted success can support learning but cannot satisfy an unassisted mastery or skip-test requirement.

- **ALR-005 — Configure feedback timing by evidence mode and keep the verdict specific to the submitted decision.**
  - Applies to: multiple-choice feedback.
  - Evidence: **PUBLISHED/INFERENCE:** `SCI-005`; **PROJECT CONSTRAINT:** decision/outcome separation and current canonical feedback contracts.
  - Verification: acquisition mode provides immediate canonical correction, while assessment mode can defer explanation without losing the evaluated prompt/response state.
  - Limitation: no cited evidence supports one timing policy for every learner, skill, or activity.

- **ALR-006 — Provide keyboard-operable choices, semantic state, non-color feedback, an estimated duration, and a deterministic display fallback.**
  - Applies to: multiple-choice interaction, accessibility, session budgeting, and failure behavior.
  - Evidence: **PUBLISHED/INFERENCE:** `STD-001`, `STD-002`; **PROJECT CONSTRAINT:** activity duration and fallback fields in the umbrella.
  - Verification: keyboard and screen-reader tests can select/submit every choice; duration metadata is present; invalid personalization falls back to canonical wording without changing the answer.
  - Limitation: estimates guide session budgets and require later calibration; they are not ability or speed scores.

### Assemble Blocks

- **ALR-007 — Use assemble blocks to elicit an ordered, grouped, or fill-the-gap reasoning structure that has a deterministic interpretation.**
  - Applies to: assemble-blocks learning purpose and evidence.
  - Evidence: **OBSERVED/PUBLISHED/INFERENCE:** `DUO-002`, `BRI-001`, `SCI-004`, `SCI-009`; approved umbrella first-activity decision.
  - Verification: each activity names its target evidence and maps every submitted arrangement to a deterministic structured response rather than free-form prose judgment.
  - Limitation: block assembly can cue recognition and sequence; it does not by itself prove recall or full-hand execution.

- **ALR-008 — Serialize block IDs, labels, slots, ordering/grouping rules, accepted response shape, and authority references.**
  - Applies to: assemble-blocks prompt and response contract.
  - Evidence: **INFERENCE:** public representation boundaries in `DUO-004`, `TECH-001`, `TECH-002`; **PROJECT CONSTRAINT:** serializable activity factories.
  - Verification: the same activity and response round-trip through serialization and produce the same normalized arrangement and verdict.
  - Limitation: this requirement specifies data behavior, not a UI framework, component library, or transport.

- **ALR-009 — Validate every block set for solvability, accepted-equivalent handling, impossible states, and answer uniqueness where uniqueness is required.**
  - Applies to: assemble-blocks scenario and answer authority.
  - Evidence: **PUBLISHED/INFERENCE:** `TECH-002`; **PROJECT CONSTRAINT:** deterministic grading authority.
  - Verification: exhaustive or property-based checks cover reachable arrangements for bounded sets and fail content that is unsolvable, ambiguous, or admits an invalid answer.
  - Limitation: some classification tasks may intentionally accept equivalent orderings; those equivalences must be explicit rather than inferred at runtime.

- **ALR-010 — Source blocks and decoys from approved facts, concepts, and misconceptions, never arbitrary generated wrong claims.**
  - Applies to: assemble-blocks block generation.
  - Evidence: **PUBLISHED/INFERENCE:** human-owned objectives and correctness review in `TECH-001`, `TECH-002`; approved umbrella misconception boundary.
  - Verification: every block resolves to a catalog ID or deterministic transformation with provenance, and validation rejects unreferenced factual text.
  - Limitation: an AI-assisted authoring workflow may propose variants for human review later, but it cannot publish or grade them directly.

- **ALR-011 — Make partial fills, orientation hints, retries, and direct completion separately observable assistance levels.**
  - Applies to: assemble-blocks hints, retry, feedback, and evidence.
  - Evidence: **INFERENCE:** guidance fading in `SCI-004`, `SCI-009`; existing project assistance contract.
  - Verification: a contract test distinguishes an untouched response, rearrangement after feedback, hinted placement, partial completion, and fully revealed answer.
  - Limitation: the research supports fading guidance generally, not a fixed number of block-hint levels.

- **ALR-012 — Support non-drag keyboard/pointer operation, logical focus order, touch targets, duration metadata, and a canonical interaction fallback.**
  - Applies to: assemble-blocks accessibility, session budgeting, and failure behavior.
  - Evidence: **PUBLISHED/INFERENCE:** `STD-001`, `STD-002`; **PROJECT CONSTRAINT:** bounded activity duration and deterministic fallback.
  - Verification: every drag action has click/select and keyboard equivalents; focus follows semantic order; invalid generated presentation uses the canonical block layout with identical grading.
  - Limitation: alternative interaction can change completion time, so duration is calibrated by interaction mode and never treated as equivalent ability evidence by default.

### Engine-Backed Hand

- **ALR-013 — Use engine-backed hands for procedural transfer through evolving blackjack state, not as a decorative result animation.**
  - Applies to: engine-backed-hand learning purpose and evidence.
  - Evidence: **PROJECT CONSTRAINT:** product vision, approved umbrella, and QA learning-integrity contract; current `HandStep` and `AttemptEngineContext` seams.
  - Verification: each activity declares the decision, hand-fact, action, or outcome evidence it collects and emits the engine context used to interpret the attempt.
  - Limitation: one hand is one observation and cannot establish a stable misconception or mastery state.

- **ALR-014 — Deal every engine-backed scenario from an ordered, traceable shoe through the Rust/WASM engine.**
  - Applies to: engine-backed-hand scenario authority and card flow.
  - Evidence: **PROJECT CONSTRAINT:** mission, simulator authority, and no-fake-card-flow rule.
  - Verification: replay evidence includes seed/session state and card IDs; every visible card resolves to its ordered shoe origin; no UI code creates or substitutes cards.
  - Limitation: a training scenario may constrain a deterministic seed or shoe prefix for coverage only when labeled and still processed as a real ordered shoe.

- **ALR-015 — Obtain legal actions, hand facts, outcomes, settlement, and applicable strategy truth only from the engine and verified oracle.**
  - Applies to: engine-backed-hand response contract and grading.
  - Evidence: **PROJECT CONSTRAINT:** approved authority table and QA learning-integrity contract.
  - Verification: contract tests reject actions absent from engine legality and compare every graded fact or strategy verdict with the active ruleset-matched authority.
  - Limitation: early literacy units may grade hand facts or outcome comprehension rather than Basic Strategy; the activity must name which authority is active.

- **ALR-016 — Record decision quality independently from the resolved hand outcome and show both facts without implying causation.**
  - Applies to: engine-backed-hand evidence and feedback.
  - Evidence: **PROJECT CONSTRAINT:** product vision and QA learning-integrity contract; **COVERAGE GAP:** no competitor study directly tests blackjack outcome bias.
  - Verification: feature QA includes a correct decision that loses and a wrong decision that wins, with stable decision verdicts in both cases.
  - Limitation: outcome literacy remains valid evidence for `Win, Lose, or Push`; it is simply not evidence that the prior action was strategically correct.

- **ALR-017 — Capture hints before action and never rewind or replace consumed shoe state to manufacture a cleaner retry.**
  - Applies to: engine-backed-hand hints, retry, and card-flow integrity.
  - Evidence: **INFERENCE:** `SCI-001`, `SCI-005`; **PROJECT CONSTRAINT:** ordered shoe, traceable attempts, and assistance evidence.
  - Verification: the attempt retains pre-action state, assistance, submitted action, and resulting engine state; retry practice creates a new traceable scenario rather than mutating history.
  - Limitation: deterministic replay may reproduce a past hand for review, but it is labeled replay and does not become new live-shoe evidence.

- **ALR-018 — Preserve the evaluated decision state for immediate or delayed feedback and use canonical fallback explanations.**
  - Applies to: engine-backed-hand feedback timing and fallback.
  - Evidence: **PUBLISHED/INFERENCE:** `SCI-005`; **PROJECT CONSTRAINT:** checkpoint fallback and engine/oracle authority.
  - Verification: feedback always references the exact cards, dealer information, legal actions, ruleset/profile, and response that were graded; unavailable enrichment falls back without changing truth.
  - Limitation: delayed review can summarize a hand only if the full decision snapshot remains inspectable and replayable.

- **ALR-019 — Expose engine state accessibly, estimate scenario duration from allowed flow, and fail explicitly without silent regeneration.**
  - Applies to: engine-backed-hand accessibility, session budgeting, and failure behavior.
  - Evidence: **PUBLISHED/INFERENCE:** `STD-001`, `STD-002`; **PROJECT CONSTRAINT:** serializable duration, fallback, and replay requirements.
  - Verification: cards/actions/statuses have semantic text and keyboard operation; the activity declares an estimate; invalid state produces recoverable diagnostics and preserves the trace instead of dealing replacement cards.
  - Limitation: hand length varies with legal play and splits, so estimates are ranges or conservative budget inputs rather than promises.

### Shared Activity Requirements

- **ALR-020 — Give every activity a stable ID, version, skill/evidence goals, interaction mode, difficulty, and serializable input/response schema.**
  - Applies to: all activity factories and attempt records.
  - Evidence: **INFERENCE:** `DUO-004`, `TECH-001`, `TECH-002`; **PROJECT CONSTRAINT:** approved umbrella activity and evidence contracts.
  - Verification: schema validation and round-trip tests reject missing identity/version/evidence fields and preserve them through session planning and attempts.
  - Limitation: the exact schema evolves in the mechanics design; this requirement does not preselect a serialization library.

- **ALR-021 — Make scenario generation seeded and reproducible, with provenance for every curriculum fact and engine-dependent value.**
  - Applies to: all deterministic activity factories.
  - Evidence: **PUBLISHED/INFERENCE:** correctness controls in `TECH-001`, `TECH-002`; **PROJECT CONSTRAINT:** reproducibility and authority boundaries.
  - Verification: identical factory/catalog/engine versions plus seed and parameters yield equivalent activity truth, and provenance resolves to owned facts or engine calls.
  - Limitation: learner-facing wording may vary within validated slots, but grading and evidence identity cannot.

- **ALR-022 — Record the first response, final response, correctness or ungraded status, assistance level, timing, and error classification without equating speed with ability.**
  - Applies to: shared activity evidence.
  - Evidence: **INFERENCE:** retrieval evidence `SCI-001`; **PROJECT CONSTRAINT:** approved attempt envelope and current `AttemptRecord` seam.
  - Verification: contract fixtures cover correct, incorrect, retried, hinted, abandoned, and ungraded attempts with no loss of first-response data.
  - Limitation: stable misconception labels require repeated evidence or explicit reasoning, not one classified error.

- **ALR-023 — Keep canonical prompts, hints, explanations, and grading immediately available without an AI or network request.**
  - Applies to: shared activity authority and latency fallback.
  - Evidence: **PUBLISHED/INFERENCE:** `TECH-001`; **PROJECT CONSTRAINT:** bounded AI and deterministic fallback architecture.
  - Verification: offline and invalid-enrichment contract tests complete every initial activity using canonical content with identical grading.
  - Limitation: later bounded enrichment may improve phrasing or coaching but cannot be required to start or finish an activity.

- **ALR-024 — Validate correctness, solvability, reachability, schema, accessibility metadata, evidence compatibility, and fallback before an activity is eligible.**
  - Applies to: shared activity validation and preview.
  - Evidence: **PUBLISHED/INFERENCE:** `TECH-002`; **PROJECT CONSTRAINT:** catalog/activity validation and feature QA.
  - Verification: invalid fixtures for every listed dimension fail deterministically with actionable diagnostics and cannot enter a session plan.
  - Limitation: automated validation does not replace scoped feature QA or human learning-integrity review.

- **ALR-025 — Treat estimated duration as a versioned planning input segmented by activity and interaction mode.**
  - Applies to: all activities and session budgets.
  - Evidence: **PUBLISHED/INFERENCE:** differing product duration patterns in `DUO-001`, `BRI-002`; **PROJECT CONSTRAINT:** learner-selected bounded sessions.
  - Verification: every factory supplies an estimate or bounded range and the planner records the estimate used when accepting an activity into a session.
  - Limitation: estimates remain research-calibrated configuration and must never become a correctness, mastery, or accessibility penalty.

### Session, Hint, Review, and Skip-Test Requirements

- **ALR-026 — Start each session with a clear evidence goal and an immediately available deterministic activity.**
  - Applies to: session entry and goal framing.
  - Evidence: **PUBLISHED/INFERENCE:** `DUO-001`, `BRI-001`; **PROJECT CONSTRAINT:** deterministic skeleton and first-chunk architecture.
  - Verification: a cold/offline session names the target in learner language and presents the first canonical interaction without waiting for enrichment.
  - Limitation: goal wording stays brief and cannot promise mastery or a fixed outcome from one session.

- **ALR-027 — Let learners choose a session-size preset that resolves to both a target duration and a maximum activity count.**
  - Applies to: session pacing and autonomy.
  - Evidence: **PUBLISHED/INFERENCE:** `BRI-002`, `SCI-007`; **PROJECT CONSTRAINT:** approved session budget.
  - Verification: every plan records the selected preset and resolved bounds, and tests cover at least a short and longer preset without changing grading rules.
  - Limitation: numeric values require calibration and may vary by accessibility/interaction mode; the research does not establish universal minutes.

- **ALR-028 — End a session when its evidence target is satisfied, either bound is reached, or the learner stops.**
  - Applies to: session controller stopping rules.
  - Evidence: **INFERENCE:** adaptive stopping tradeoffs in `SCI-008`; **PROJECT CONSTRAINT:** approved session end conditions.
  - Verification: deterministic controller tests exercise all four exit paths and show no activity begins after a bound or explicit stop.
  - Limitation: evidence-target completion ends the session plan, not necessarily the unit or skill mastery state.

- **ALR-029 — Commit every completed attempt and preserve open goals and in-progress session state when the learner stops.**
  - Applies to: non-punitive stopping, continuation, and evidence durability.
  - Evidence: **PUBLISHED/INFERENCE:** autonomy evidence `SCI-007`; **PROJECT CONSTRAINT:** unfinished-session continuation.
  - Verification: stop/resume tests reconstruct the same open goals and do not duplicate, erase, or mark completed attempts as failed.
  - Limitation: the storage adapter and migration behavior are decided by the separate AL-R2 research gate.

- **ALR-030 — Group work into checkpoints with canonical fallback and invalidate enrichment created from stale learner snapshots.**
  - Applies to: session sequencing, prefetch, and failure handling.
  - Evidence: **INFERENCE:** public session boundary `DUO-004`; **PROJECT CONSTRAINT:** checkpoint-hybrid runtime flow.
  - Verification: controller tests accept only the newest validated candidate, ignore late/stale results, and continue immediately with fallback when none is eligible.
  - Limitation: exact checkpoint size and handoff latency remain configuration for the later mechanics and AI-adapter plans.

- **ALR-031 — Mix weak, prerequisite, and review-due evidence without immediate same-item trapping.**
  - Applies to: review scheduling and session composition.
  - Evidence: **PUBLISHED/INFERENCE:** `SCI-001`, `SCI-002`, `SCI-003`, `BRI-001`.
  - Verification: planner fixtures show weak evidence returns soon but is separated by other useful work, and review includes older skills and discriminative mixtures.
  - Limitation: spacing intervals and mix ratios remain versioned, empirically calibrated policy.

- **ALR-032 — Reduce mastery deterministically from repeated, diverse evidence across sessions and assistance levels.**
  - Applies to: mastery evidence and visible states.
  - Evidence: **PUBLISHED/INFERENCE:** `SCI-002`, `SCI-006`; **PROJECT CONSTRAINT:** approved mastery reducer and one-mistake rule.
  - Verification: reducer fixtures prove identical histories yield identical states, a single error cannot establish a stable weakness, and direct-answer attempts cannot independently satisfy mastery.
  - Limitation: counts, diversity rules, recency, and retention intervals remain provisional until observed blackjack data supports them.

- **ALR-033 — Gate only essential prerequisites while showing simple learner states backed by richer internal evidence.**
  - Applies to: guided progression and mastery presentation.
  - Evidence: **PUBLISHED/INFERENCE:** `BRI-001`, `SCI-006`; **PROJECT CONSTRAINT:** approved progression and state vocabulary.
  - Verification: catalog tests identify every essential gate, nonessential unfinished practice does not block guided progress, and each visible state is reproducible from the reducer.
  - Limitation: mastery research does not identify which blackjack prerequisites are essential; curriculum design owns that decision.

- **ALR-034 — Make each unit skip test deterministic, unassisted, and coverage-complete for every gated skill.**
  - Applies to: placement and skip tests.
  - Evidence: **PUBLISHED/INFERENCE:** measurement limits in `SCI-008`; **PROJECT CONSTRAINT:** approved deterministic skill-test policy.
  - Verification: the test specification maps required evidence to every gated skill, records fixed pass rules, and a failed result names missing evidence without punishment.
  - Limitation: the first proof does not claim calibrated computerized-adaptive testing or general placement validity.

- **ALR-035 — Keep coaching mostly learner-initiated and bind every help response to an explicit intent and approved activity facts.**
  - Applies to: hint escalation and coach behavior.
  - Evidence: **PUBLISHED/INFERENCE:** optional help in `DUO-001`, fading scaffolds in `BRI-001`, `SCI-004`, `SCI-009`; **PROJECT CONSTRAINT:** bounded coach authority.
  - Verification: canonical help is always available; any enriched help records intent, facts, assistance level, validation result, and fallback; coaching cannot submit or grade a response.
  - Limitation: provider, model, latency, privacy, and token policy belong to the separate AL-R3 research gate.

### Accessibility Requirements

- **ALR-036 — Expose every activity control, card, block, state, and feedback message with programmatic name, role, value, and meaningful order.**
  - Applies to: semantic accessibility across all initial activities.
  - Evidence: **PUBLISHED/INFERENCE:** `STD-001`, `STD-002`.
  - Verification: accessibility-tree and screen-reader checks identify the prompt, current state, available responses, submission, verdict, and help without visual inspection.
  - Limitation: automated semantic checks require manual assistive-technology and comprehension playtests.

- **ALR-037 — Make all functionality keyboard-operable and provide a single-pointer alternative to dragging with adequate target size or spacing.**
  - Applies to: motor interaction for choices, blocks, and hands.
  - Evidence: **PUBLISHED/INFERENCE:** `STD-001`.
  - Verification: keyboard-only and pointer tests complete every activity; block movement has select/place controls; target-size checks meet WCAG 2.2 or a documented exception.
  - Limitation: minimum conformance does not establish comfort for every motor impairment, so representative usability review remains required.

- **ALR-038 — Communicate correctness, selection, legality, progress, and errors with text and structure in addition to color.**
  - Applies to: non-color cues and status feedback.
  - Evidence: **PUBLISHED/INFERENCE:** `STD-001`; **PROJECT CONSTRAINT:** product vision accessibility direction.
  - Verification: grayscale/high-contrast review and semantic inspection preserve every instructional distinction, including correct versus outcome and legal versus selected action.
  - Limitation: exact visual symbols and palette belong to later visual-system design and research.

- **ALR-039 — Use concise instructions, consistent labels, predictable help, recoverable errors, and integrated decision context.**
  - Applies to: cognitive accessibility and cognitive-load control.
  - Evidence: **PUBLISHED/INFERENCE:** `STD-002`, `SCI-009`.
  - Verification: content review finds one clear task per activity, stable terminology, no necessary split attention, and a recovery path that preserves the learner's work.
  - Limitation: concise language must not omit ruleset or authority details needed for a correct decision.

- **ALR-040 — Avoid essential animation or time pressure and preserve operation under zoom, reflow, text spacing, and reduced-motion preferences.**
  - Applies to: visual, motion, and timing accessibility.
  - Evidence: **PUBLISHED/INFERENCE:** `STD-001`; **PROJECT CONSTRAINT:** accuracy before timed automaticity.
  - Verification: tests complete activities at supported zoom/reflow and reduced motion; timing can be paused/extended or is nonessential; no animation alone conveys grading state.
  - Limitation: later realistic-pace training is a separate evidence mode introduced only after untimed accuracy is stable.

- **ALR-041 — Include scoped accessibility checks and learning-integrity playtests in each activity feature QA.**
  - Applies to: verification and release gating.
  - Evidence: **PUBLISHED/INFERENCE:** `STD-001`, `STD-002`; **PROJECT CONSTRAINT:** QA ledger and learning-integrity process.
  - Verification: each feature QA records automated and manual coverage, explicit gaps, assistive-technology results appropriate to the change, and decision/outcome/assistance integrity.
  - Limitation: WCAG conformance and internal playtests do not replace later testing with representative disabled learners.

## Adopt, Reject, or Defer

| Candidate pattern | Disposition | Evidence IDs | Reason | Consumer |
|---|---|---|---|---|
| Immediate interaction with a stated evidence goal and canonical first activity | Adopt for the first mechanics proof | `DUO-001`, `BRI-001`, `ALR-026` | Begins useful work without model or network latency while keeping the goal legible. | Adaptive mechanics foundation and two-unit overlay |
| Learner-selected session bounds with neutral stop/resume | Adopt for the first mechanics proof | `BRI-002`, `SCI-007`, `ALR-027`–`ALR-029` | Preserves autonomy and prevents one product's duration recommendation from becoming a universal threshold. | Adaptive mechanics foundation |
| Graded activity-owned hints with assistance evidence | Adopt for the first mechanics proof | `SCI-004`, `SCI-009`, `ALR-004`, `ALR-011`, `ALR-035` | Supports novice guidance and fading without treating revealed answers as mastery proof. | Activity factories and evidence reducer |
| First-response preservation across retry and feedback | Adopt for the first mechanics proof | `SCI-001`, `ALR-004`, `ALR-017`, `ALR-022` | Keeps learning support compatible with honest diagnostic evidence. | Activity contracts and ProgressStore record design |
| Mixed weak-skill and review-due practice across sessions | Adopt for the first mechanics proof | `SCI-001`–`SCI-003`, `ALR-031`, `ALR-032` | Retrieval, spacing, and discrimination evidence support the principle while numeric schedules stay configurable. | Deterministic planner and mastery reducer |
| Simple visible mastery states backed by reproducible evidence | Adopt for the first mechanics proof | `BRI-001`, `SCI-006`, `ALR-032`, `ALR-033` | Gives learners clarity without exposing unsupported precision or collapsing raw evidence. | Learner envelope and learning-path UI |
| Deterministic coverage-complete skip tests | Adopt for the first mechanics proof | `SCI-008`, `ALR-034` | Matches the approved authority boundary and avoids unsupported claims of calibrated adaptive testing. | Progression policy and unit catalog |
| AI-created activity kinds, executable UI, answers, or grading | Reject for the first mechanics proof | `TECH-001`, `TECH-002`, `ALR-002`, `ALR-023` | Public evidence emphasizes constrained representations and correctness review; the umbrella keeps truth deterministic. | Planner/coach validator and activity registry |
| Forced same-item retries until a correct answer appears | Reject for the first mechanics proof | `SCI-001`, `SCI-002`, `ALR-004`, `ALR-031` | It can erase first-response evidence and substitute short-term repetition for later retrieval. | Session controller |
| Loss-framed streaks, leagues, or penalties for ending a session | Reject for the first mechanics proof | `SCI-007`, `ALR-027`–`ALR-029` | Controlled pressure conflicts with non-punitive stopping and the training-product mission. | Learning-path motivation and session-end copy |
| Fixed numeric mastery thresholds copied from studies or competitors | Defer until wider curriculum research | `SCI-002`, `SCI-006`, `ALR-032` | Effects support general mechanisms, not blackjack-specific counts, intervals, or cut scores. | Wider curriculum and mastery calibration program |
| Psychometrically adaptive item selection and termination | Defer until wider curriculum research | `SCI-008`, `ALR-034` | The first proof lacks calibrated item information and does not need CAT complexity for deterministic skip tests. | Future assessment research |
| Broad learner analytics and product experimentation infrastructure | Defer until public web/multi-user work | `DUO-003`, `DUO-005`, `ALR-041` | No active external-beta consumer exists; feature QA and local attempt evidence are sufficient now. | External beta analytics/admission cycle |
| Account sync and cross-device progress reconciliation | Defer until public web/multi-user work | `BRI-005`, `ALR-029` | Local anonymous progress is the approved proof boundary; sync semantics need a separate active consumer and gate. | Public deployment and cross-device sync program |
| Copying competitor curriculum, wording, art, proprietary algorithms, or stack | Reject for the first mechanics proof | `DUO-004`, `BRI-001`, `TECH-001`, `TECH-002` | Only transferable behavior and boundary evidence is in scope; proprietary implementation and assets are neither verified nor authorized. | All downstream designs and authoring workflows |

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
