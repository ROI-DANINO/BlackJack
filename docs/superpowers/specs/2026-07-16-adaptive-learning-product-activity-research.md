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
| STD-001 | [Web Content Accessibility Guidelines 2.2](https://www.w3.org/TR/WCAG22/) | W3C Accessibility Guidelines Working Group | 2023-10-05; errata incorporated 2024-12-12 | W3C Recommendation | Normative success criteria for keyboard access, focus, non-color cues, errors, dragging alternatives, target size, timing, and semantics | 2026-07-16 | Conformance baseline, not a complete cognitive-accessibility or usability specification; product testing remains necessary. |
| STD-002 | [Cognitive and learning disabilities and web barriers](https://www.w3.org/WAI/people-use-web/abilities-barriers/cognitive/) | W3C Web Accessibility Initiative | n.d. (current guidance) | Official informative guidance | Clear structure, consistent labels, predictable interaction, concise language, adaptation, and recoverable errors | 2026-07-16 | Informative rather than normative and intentionally broad across diverse user needs. |
| TECH-001 | [Hand-crafted, machine-made: How we make learning games with AI](https://blog.brilliant.org/hand-crafted-machine-made/) | Brilliant Staff | 2025-01-30 | Official technical and authoring article | Human-owned objectives and progression, constrained generation, variants, playtesting, and human correctness review | 2026-07-16 | High-level public account; representations, prompts, tools, and production quality data remain proprietary. |
| TECH-002 | [When almost right is catastrophically wrong: Evals for AI learning games](https://blog.brilliant.org/when-almost-right-is-catastrophically-wrong-evals-for-ai-learning-games/) | Brilliant / Blake Farrow | 2025-02-27 | Official technical evaluation article | Correctness, unique solvability, visual clarity, state consistency, impossible-state, and playability checks | 2026-07-16 | Selected examples and headline pass rates; eval implementation, datasets, and failure distributions are not public. |

## Product-Pattern Comparison

| Pattern | Duolingo evidence | Brilliant evidence | Other evidence | Evidence label | Transferable requirement | Confidence / limitation |
|---|---|---|---|---|---|---|

## Learning-Science Evidence

| Topic | Finding | Source IDs | Evidence strength / limitation | Project inference |
|---|---|---|---|---|

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

## Recommendations Requiring User Approval
