I read all five documents in full, plus the Phase-2 audit records that already verified the WCAG levels. Everything below is complete, not sampled.

**Path shorthand used throughout:**
- `ACT` = `/home/roking/Desktop/Projects/blackjack/.claude/worktrees/wl-start-ee6c56/docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md`
- `STO` = `/home/roking/Desktop/Projects/blackjack/.claude/worktrees/wl-start-ee6c56/docs/superpowers/specs/2026-07-16-adaptive-learning-browser-storage-research.md`
- `ACT-PLAN` / `STO-PLAN` = the two plans in `docs/superpowers/plans/`
- `SB` = `/home/roking/Desktop/Projects/blackjack/.claude/worktrees/wl-start-ee6c56/docs/specs/stack-boundaries.md`

---

# 1. All 41 ALR requirements (primary deliverable)

Each row: ID | one-line requirement | backing sources | anchor. "PC" = the requirement's own `PROJECT CONSTRAINT` tag (approved umbrella / product vision / QA contract), not external evidence.

### Multiple Choice (`ACT:117-153`)

| ID | Requirement | Backing sources | Anchor |
|---|---|---|---|
| ALR-001 | Use multiple choice for bounded recognition/classification evidence, not procedural transfer by itself | `DUO-001`, `BRI-001`, `SCI-001` + `QuestionStep`/outcome-ID contracts | `ACT:119-123` |
| ALR-002 | Resolve prompts, choices, correct answers, and grading from versioned curriculum or deterministic engine facts | PC (umbrella authority table) + `TECH-001`, `TECH-002` | `ACT:125-129` |
| ALR-003 | Generate distractors only from approved misconceptions or deterministic transformations; require an unambiguous answer set | PC (umbrella activity system) + `TECH-002` | `ACT:131-135` |
| ALR-004 | Preserve the first response; record each retry and hint level as assistance rather than replacing the original attempt | `SCI-001`, `SCI-004`, `SCI-009` + assistance/attempt-record contracts | `ACT:137-141` |
| ALR-005 | Configure feedback timing by evidence mode; keep the verdict specific to the submitted decision | `SCI-005` + PC (decision/outcome separation) | `ACT:143-147` |
| ALR-006 | Keyboard-operable choices, semantic state, non-color feedback, estimated duration, deterministic display fallback | `STD-001`, `STD-002` + PC (duration/fallback fields) | `ACT:149-153` |

### Assemble Blocks (`ACT:155-191`)

| ID | Requirement | Backing sources | Anchor |
|---|---|---|---|
| ALR-007 | Use assemble blocks to elicit an ordered/grouped/fill-the-gap reasoning structure with a deterministic interpretation | `DUO-002`, `BRI-001`, `SCI-004`, `SCI-009` + umbrella first-activity decision | `ACT:157-161` |
| ALR-008 | Serialize block IDs, labels, slots, ordering/grouping rules, accepted response shape, authority references | `DUO-004`, `TECH-001`, `TECH-002` + PC (serializable factories) | `ACT:163-167` |
| ALR-009 | Validate every block set for solvability, accepted-equivalent handling, impossible states, answer uniqueness | `TECH-002` + PC (deterministic grading authority) | `ACT:169-173` |
| ALR-010 | Source blocks and decoys from approved facts/concepts/misconceptions, never arbitrary generated wrong claims | `TECH-001`, `TECH-002` + umbrella misconception boundary | `ACT:175-179` |
| ALR-011 | Make partial fills, orientation hints, retries, and direct completion separately observable assistance levels | `SCI-004`, `SCI-009` + assistance contract | `ACT:181-185` |
| ALR-012 | Support non-drag keyboard/pointer operation, logical focus order, touch targets, duration metadata, canonical fallback | `STD-001`, `STD-002` + PC (duration/fallback) | `ACT:187-191` |

### Engine-Backed Hand (`ACT:193-235`)

| ID | Requirement | Backing sources | Anchor |
|---|---|---|---|
| ALR-013 | Use engine-backed hands for procedural transfer through evolving blackjack state, not decorative result animation | PC only (product vision, umbrella, QA learning-integrity; `HandStep`, `AttemptEngineContext`) | `ACT:195-199` |
| ALR-014 | Deal every engine-backed scenario from an ordered, traceable shoe through the Rust/WASM engine | PC only (mission, simulator authority, no-fake-card-flow) | `ACT:201-205` |
| ALR-015 | Obtain legal actions, hand facts, outcomes, settlement, strategy truth only from engine + verified oracle | PC only (authority table, QA learning-integrity) | `ACT:207-211` |
| ALR-016 | Record decision quality independently from resolved hand outcome; show both without implying causation | PC + explicit **COVERAGE GAP** (no competitor study tests blackjack outcome bias) | `ACT:213-217` |
| ALR-017 | Capture hints before action; never rewind or replace consumed shoe state to manufacture a cleaner retry | `SCI-001`, `SCI-005` + PC (ordered shoe, traceable attempts) | `ACT:219-223` |
| ALR-018 | Preserve the evaluated decision state for immediate or delayed feedback; use canonical fallback explanations | `SCI-005` + PC (checkpoint fallback, engine/oracle authority) | `ACT:225-229` |
| ALR-019 | Expose engine state accessibly, estimate scenario duration from allowed flow, fail explicitly without silent regeneration | `STD-001`, `STD-002` + PC (duration, fallback, replay) | `ACT:231-235` |

### Shared Activity Requirements (`ACT:237-273`)

| ID | Requirement | Backing sources | Anchor |
|---|---|---|---|
| ALR-020 | Every activity gets stable ID, version, skill/evidence goals, interaction mode, difficulty, serializable I/O schema | `DUO-004`, `TECH-001`, `TECH-002` + umbrella activity/evidence contracts | `ACT:239-243` |
| ALR-021 | Scenario generation is seeded and reproducible, with provenance for every curriculum fact and engine-dependent value | `TECH-001`, `TECH-002` + PC (reproducibility, authority boundaries) | `ACT:245-249` |
| ALR-022 | Record first response, final response, correctness/ungraded, assistance level, timing, error class — without equating speed with ability | `SCI-001` + PC (attempt envelope, `AttemptRecord` seam) | `ACT:251-255` |
| ALR-023 | Keep canonical prompts, hints, explanations, grading immediately available without an AI or network request | `TECH-001` + PC (bounded AI, deterministic fallback) | `ACT:257-261` |
| ALR-024 | Validate correctness, solvability, reachability, schema, a11y metadata, evidence compatibility, fallback before eligibility | `TECH-002` + PC (catalog validation, feature QA) | `ACT:263-267` |
| ALR-025 | Treat estimated duration as versioned planning input segmented by activity and interaction mode | `DUO-001`, `BRI-002` + PC (learner-selected bounded sessions) | `ACT:269-273` |

### Session, Hint, Review, Skip-Test (`ACT:275-335`)

| ID | Requirement | Backing sources | Anchor |
|---|---|---|---|
| ALR-026 | Start each session with a clear evidence goal and an immediately available deterministic activity | `DUO-001`, `BRI-001` + PC (deterministic skeleton, first-chunk architecture) | `ACT:277-281` |
| ALR-027 | Learner chooses a session-size preset resolving to both a target duration and a max activity count | `BRI-002`, `SCI-007` + PC (approved session budget) | `ACT:283-287` |
| ALR-028 | End a session when its evidence target is satisfied, either bound is reached, or the learner stops | `SCI-008` + PC (approved session end conditions) | `ACT:289-293` |
| ALR-029 | Commit every completed attempt; preserve open goals and in-progress session state when the learner stops | `SCI-007` + PC (unfinished-session continuation) | `ACT:295-299` |
| ALR-030 | Group work into checkpoints with canonical fallback; invalidate enrichment built from stale learner snapshots | `DUO-004` + PC (checkpoint-hybrid runtime flow) | `ACT:301-305` |
| ALR-031 | Mix weak, prerequisite, and review-due evidence without immediate same-item trapping | `SCI-001`, `SCI-002`, `SCI-003`, `BRI-001` | `ACT:307-311` |
| ALR-032 | Reduce mastery deterministically from repeated, diverse evidence across sessions and assistance levels | `SCI-002`, `SCI-006` + PC (mastery reducer, one-mistake rule) | `ACT:313-317` |
| ALR-033 | Gate only essential prerequisites; show simple learner states backed by richer internal evidence | `BRI-001`, `SCI-006` + PC (progression + state vocabulary) | `ACT:319-323` |
| ALR-034 | Make each unit skip test deterministic, unassisted, coverage-complete for every gated skill | `SCI-008` + PC (deterministic skill-test policy) | `ACT:325-329` |
| ALR-035 | Keep coaching mostly learner-initiated; bind every help response to explicit intent and approved activity facts | `DUO-001`, `BRI-001`, `SCI-004`, `SCI-009` + PC (bounded coach authority) | `ACT:331-335` |

### Accessibility (`ACT:337-373`)

| ID | Requirement | Backing sources | Anchor |
|---|---|---|---|
| ALR-036 | Expose every control, card, block, state, feedback message with programmatic name, role, value, meaningful order | `STD-001`, `STD-002` | `ACT:339-343` |
| ALR-037 | All functionality keyboard-operable; single-pointer alternative to dragging with adequate target size/spacing | `STD-001` | `ACT:345-349` |
| ALR-038 | Communicate correctness, selection, legality, progress, errors with text and structure in addition to color | `STD-001` + PC (product-vision a11y direction) | `ACT:351-355` |
| ALR-039 | Concise instructions, consistent labels, predictable help, recoverable errors, integrated decision context | `STD-002`, `SCI-009` | `ACT:357-361` |
| ALR-040 | Avoid essential animation or time pressure; preserve operation under zoom, reflow, text spacing, reduced-motion | `STD-001` + PC (accuracy before timed automaticity) | `ACT:363-367` |
| ALR-041 | Include scoped accessibility checks and learning-integrity playtests in each activity feature QA | `STD-001`, `STD-002` + PC (QA ledger, learning-integrity process) | `ACT:369-373` |

**Coverage note for the board:** ALR-013, ALR-014, ALR-015 rest on **project constraint alone — zero external sources**. ALR-016 is project constraint plus a declared coverage gap. If a card claims research backing for the engine-backed-hand family, it is overstating; that family is owned policy, correctly labelled as such.

**Four requirements were downgraded by the Phase-2 audit** (`docs/superpowers/research/foundation-audit-p2/audit/U4-audit.md`, verified in `.../verification/V-U4.md`):
- **ALR-001** — `Relabel`. The format-validity claim is tagged to `DUO-001`, `BRI-001`, `SCI-001`, none of which discuss exercise formats or recognition-vs-recall validity (`V-U4.md:56-65`). The `PUBLISHED` half is unearned; treat as INFERENCE.
- **ALR-005** — `Relabel`. Its "acquisition mode provides immediate canonical correction" default is tagged to `SCI-005`, whose finding runs the other way: delayed feedback was *slightly stronger* on average (`V-U4.md:38-47`).
- **ALR-004 / ALR-022** — `Revise`. Both cite the `AttemptRecord` seam as *evidence*, when that seam is the **gap the requirement addresses** (`web/src/learn/types.ts:45-49` has a single `response: string`, no timing, no error class) (`V-U4.md:48-55`).
- **ALR-040** — `Revise`. See section 4.

---

# 2. Activity types the research supports

Three interaction types are specified. There are no others in the ALR set — but the *product-pattern* row on activity variation (`ACT:60`) records a wider observed inventory that Layer 2/3 may later draw on.

### Multiple choice
- **When to use:** bounded recognition or classification evidence (`ALR-001`, `ACT:119`). Not for procedural transfer by itself.
- **Measures well:** recognition, classification among a closed, unambiguous option set with deterministic grading authority (`ALR-002`, `ALR-003`).
- **Measures poorly:** *"recognition can overestimate recall or table execution, so later independent evidence must use a different or less-supported mode"* (`ACT:123`). A plausible distractor is *"not automatically a diagnosed misconception"* (`ACT:135`).
- **Audit caveat:** the evidence base does **not** contain a format-validity study — that claim was relabelled (`V-U4.md:56-65`).

### Assemble blocks
- **When to use:** to elicit an ordered, grouped, or fill-the-gap reasoning structure with a deterministic interpretation (`ALR-007`, `ACT:157`); supported by the worked-example/completion-problem line — *"begin with a canonical worked state or nearly complete assembly, then fade blocks and hints"* (`ACT:77`).
- **Measures well:** sequence, grouping, structure of reasoning; supports graded fading (partial fill → orientation hint → direct completion, `ALR-011`).
- **Measures poorly:** *"block assembly can cue recognition and sequence; it does not by itself prove recall or full-hand execution"* (`ACT:161`). Also: alternative (non-drag) interaction changes completion time, so *"duration is calibrated by interaction mode and never treated as equivalent ability evidence by default"* (`ACT:191`).

### Engine-backed hand
- **When to use:** procedural transfer through evolving blackjack state (`ALR-013`, `ACT:195`) — explicitly *"not as a decorative result animation."*
- **Measures well:** decision quality under real ordered-shoe state, hand facts, legality, outcome comprehension — each activity must declare which authority is active (`ACT:211`).
- **Measures poorly:** *"one hand is one observation and cannot establish a stable misconception or mastery state"* (`ACT:199`). And outcome literacy is valid evidence for `Win, Lose, or Push` but *"is simply not evidence that the prior action was strategically correct"* (`ACT:217`). Duration is unpredictable — *"hand length varies with legal play and splits, so estimates are ranges or conservative budget inputs rather than promises"* (`ACT:235`).

### Other interaction types (evidence exists, no ALR requirement)
`ACT:60` records **OBSERVED** Duolingo formats: *"distinct speaking, listening, matching, mistake-review, story, and word-practice formats (`DUO-002`)"*, and **PUBLISHED** Brilliant mixing *"visual representation, hands-on manipulation, direct instruction, and problem solving (`BRI-001`)"*. The governing constraint on adding any of these: *"vary activity form only when it measures the target evidence or transfer; do not equate novelty with learning value"* (`ACT:60`) — with the limitation that *"inventories are snapshots and neither source exposes selection weights."*

---

# 3. Hints, feedback timing, session composition, skip/placement tests

### Hints
Evidence position is an admitted gap. `ACT:62`: Duolingo names optional hints *"but an ordered ladder is a **COVERAGE GAP**"*; Brilliant's Koji is *"described as asking rather than handing over answers"*; and *"Worked-example evidence supports initial guidance, not a universal hint sequence (`SCI-004`)."* Confidence: *"Medium-low; neither source publishes escalation rules or hint-cost experiments."*

The transferable requirement (`ACT:62`): *"use bounded, activity-owned hint levels from orientation to direct answer; every level records assistance and direct-answer use cannot count as independent evidence."*

The project's existing ladder is explicitly not research-derived — `ACT:89-90`: *"worked examples and fading support graded assistance (`SCI-004`, `SCI-009`), but the existing four-level ladder remains a project design rather than a research-derived sequence."*

Operative requirements: `ALR-004` (`ACT:137`) — *"Preserve the first response and record each retry and hint level as assistance rather than replacing the original attempt"*, with limitation *"assisted success can support learning but cannot satisfy an unassisted mastery or skip-test requirement"* (`ACT:141`). `ALR-011` (`ACT:181`) — partial fills / orientation hints / retries / direct completion as separately observable levels, limited by *"the research supports fading guidance generally, not a fixed number of block-hint levels"* (`ACT:185`). `ALR-017` (`ACT:219`) — *"Capture hints before action and never rewind or replace consumed shoe state to manufacture a cleaner retry."* `ALR-035` (`ACT:331`) — *"Keep coaching mostly learner-initiated and bind every help response to an explicit intent and approved activity facts"*; provider/model/latency/privacy deferred to AL-R3 (`ACT:335`).

### Feedback timing
The underlying finding (`ACT:79`): *"across digital-learning interventions, both immediate and delayed feedback improved learning; delayed feedback was slightly stronger on average, but task, content, context, learner control, and consistency moderated outcomes"* — from a *"Meta-analysis of 116 interventions from 46 articles; studies ended in 2019, were heterogeneous, and excluded special-needs education."*

The adopted rule (`ACT:79`): *"use immediate canonical correction for acquisition and configurable delayed review for transfer or assessment; timing is an evidence-mode decision, not one global rule."*

`ALR-005` (`ACT:143-147`): *"Configure feedback timing by evidence mode and keep the verdict specific to the submitted decision"* — verification: *"acquisition mode provides immediate canonical correction, while assessment mode can defer explanation without losing the evaluated prompt/response state"*; limitation: *"no cited evidence supports one timing policy for every learner, skill, or activity."*

`ALR-018` (`ACT:225-229`): feedback *"always references the exact cards, dealer information, legal actions, ruleset/profile, and response that were graded"*; *"delayed review can summarize a hand only if the full decision snapshot remains inspectable and replayable."*

**Flag for the card:** the verifier re-opened the source and confirmed the immediate-default is not what `SCI-005` says. Verbatim from Brummer et al. (2024) p.466 via `V-U4.md:39-43`: *"With regard to feedback timing, both immediate and delayed feedback had significant and strong effects on improving learning performance, with delayed feedback being slightly more effective than immediate feedback. A combination of feedback timing approaches was ineffective. These findings indicate that clarity and consistency—as to whether participants receive immediate or delayed feedback—is more essential than the actual timing of the feedback."* The *configure-by-evidence-mode* half survives as sound INFERENCE; the *immediate-by-default* half does not carry a PUBLISHED tag.

### Session composition
- **Entry** — `ALR-026` (`ACT:277`): *"Start each session with a clear evidence goal and an immediately available deterministic activity"*; verified by *"a cold/offline session names the target in learner language and presents the first canonical interaction without waiting for enrichment"*; limited: *"goal wording stays brief and cannot promise mastery or a fixed outcome from one session."*
- **Size** — `ALR-027` (`ACT:283`): preset resolves to *"both a target duration and a maximum activity count"*; *"numeric values require calibration and may vary by accessibility/interaction mode; the research does not establish universal minutes."*
- **Stopping** — `ALR-028` (`ACT:289`): four exit paths — *"its evidence target is satisfied, either bound is reached, or the learner stops"*, with *"no activity begins after a bound or explicit stop."* `ALR-029` (`ACT:295`): *"Commit every completed attempt and preserve open goals and in-progress session state when the learner stops"*; storage adapter behavior explicitly deferred to AL-R2 (`ACT:299`).
- **Sequencing** — `ALR-030` (`ACT:301`): checkpoints with canonical fallback; *"accept only the newest validated candidate, ignore late/stale results, and continue immediately with fallback when none is eligible."*
- **Mix** — `ALR-031` (`ACT:307`): *"Mix weak, prerequisite, and review-due evidence without immediate same-item trapping"*; verified when *"weak evidence returns soon but is separated by other useful work, and review includes older skills and discriminative mixtures"*; *"spacing intervals and mix ratios remain versioned, empirically calibrated policy."*
- **Duration inputs** — `ALR-025` (`ACT:269`): estimates are *"versioned planning input segmented by activity and interaction mode"* and *"must never become a correctness, mastery, or accessibility penalty."*
- **Rejected outright** — `ACT:388`: *"Loss-framed streaks, leagues, or penalties for ending a session"*, reason: *"Controlled pressure conflicts with non-punitive stopping and the training-product mission."*

### Skip / placement tests
Both products are a coverage gap. `ACT:66`: Duolingo — *"**COVERAGE GAP:** no reviewed official source specifies placement coverage, pass rules, or failure routing."* Brilliant — *"**COVERAGE GAP:** personalized starting-point claims do not expose test content, thresholds, or routing (`BRI-004`)."* Confidence: *"Low; this remains primarily an umbrella constraint with limited transferable product evidence."*

The requirement, `ALR-034` (`ACT:325-329`): *"Make each unit skip test deterministic, unassisted, and coverage-complete for every gated skill."* Verification: *"the test specification maps required evidence to every gated skill, records fixed pass rules, and a failed result names missing evidence without punishment."* Limitation: *"the first proof does not claim calibrated computerized-adaptive testing or general placement validity."*

Supporting inference (`ACT:81`): *"the first skip test should use deterministic, coverage-complete unassisted evidence rules rather than claim psychometric adaptivity; record enough evidence to evaluate calibration later."* And psychometric CAT is explicitly **deferred** (`ACT:390`): *"The first proof lacks calibrated item information and does not need CAT complexity for deterministic skip tests."*

---

# 4. Accessibility requirements and their true WCAG levels

The document cites `STD-001` (WCAG 2.2) as an undifferentiated block and **never states a target conformance level anywhere**. Here is every accessibility requirement with the criteria it actually rests on. Levels below were confirmed by direct retrieval of W3C WCAG 2.2 in the Phase-2 verification pass (`docs/superpowers/research/foundation-audit-p2/verification/V-U4.md:144-147`).

| ALR | Surface | WCAG 2.2 criteria it rests on | True level | Anchor |
|---|---|---|---|---|
| ALR-006 | Multiple-choice a11y: keyboard choices, semantic state, non-color feedback | 2.1.1 Keyboard (A), 4.1.2 Name/Role/Value (A), 1.4.1 Use of Color (A) | **A** | `ACT:149-153` |
| ALR-012 | Assemble-blocks a11y: non-drag operation, focus order, touch targets | 2.5.7 Dragging Movements (**AA**), 2.5.8 Target Size Minimum (**AA**), 2.1.1 Keyboard (A), 2.4.3 Focus Order (A) | **AA** | `ACT:187-191` |
| ALR-019 | Engine-hand a11y: semantic cards/actions/statuses, keyboard operation | 4.1.2 (A), 1.3.1 Info & Relationships (A), 2.1.1 (A) | **A** | `ACT:231-235` |
| ALR-036 | Programmatic name, role, value, meaningful order | 4.1.2 Name, Role, Value (A)*, 1.3.2 Meaningful Sequence (**A** — confirmed) | **A** | `ACT:339-343` |
| ALR-037 | Keyboard-operable + single-pointer alternative to dragging + target size | 2.1.1 Keyboard (**A**), 2.5.7 Dragging Movements (**AA**), 2.5.8 Target Size Minimum (**AA**) | **AA** | `ACT:345-349` |
| ALR-038 | Non-color cues for correctness, selection, legality, progress, errors | 1.4.1 Use of Color (**A** — verbatim confirmed), 1.3.1 (A); status feedback also touches 4.1.3 Status Messages (AA) | **A** (AA if status messages included) | `ACT:351-355` |
| ALR-039 | Concise instructions, consistent labels, predictable help, recoverable errors | Rests mainly on `STD-002`, which is **informative, not normative**. Nearest normative: 3.2.6 Consistent Help (A, new in 2.2), 3.3.1 Error Identification (A), 3.2.4 Consistent Identification (AA), 3.3.3 Error Suggestion (AA). "Concise language" has **no A/AA anchor** — the nearest WCAG criterion is 3.1.5 Reading Level (**AAA**) | **Mixed A/AA + non-normative** | `ACT:357-361` |
| ALR-040 | No essential animation/time pressure; zoom, reflow, text spacing, **reduced motion** | 1.4.10 Reflow (**AA**), 1.4.12 Text Spacing (**AA**), 2.2.1 Timing Adjustable (**A**), **2.3.3 Animation from Interactions (AAA)** | **AAA** (via reduced motion) | `ACT:363-367` |
| ALR-041 | Scoped a11y checks + learning-integrity playtests in each feature QA | Process requirement; no single SC | n/a | `ACT:369-373` |

\* `V-U4.md:223-227` records an honest caveat: the verifier's WCAG retrieval rendered SC 4.1.2 *without* a level string, so its Level-A status is not independently confirmed in that pass. Nothing in ALR-036 turns on it — its other cited criterion (1.3.2) verified at Level A.

### The AAA dependency — ALR-040
This is the one the owner needs to decide about. From the audit (`U4-audit.md:64`):

> *"Overstatement is specific and single: **reduced motion**. STD-001, re-opened — Reflow is SC 1.4.10 (**AA**), Text Spacing SC 1.4.12 (**AA**), Timing Adjustable SC 2.2.1 (**A**), but the only WCAG 2.2 criterion covering a reduced-motion preference is **SC 2.3.3 Animation from Interactions, Level AAA**. U4 states no target conformance level anywhere, so a reader building the ALR-036–ALR-041 set as one normative baseline will treat an AAA criterion as AA-mandatory."*

Corroborated by the independent verifier (`V-U4.md:32-37`) and already carried into `docs/specs/2026-07-22-product-design-inputs.md:299-303`:

> *"the reduced-motion requirement rests on **WCAG 2.2 SC 2.3.3, which is Level AAA**, and was presented alongside AA and A criteria with no level stated. Phase 4 must **state a target conformance level** before treating that requirement set as one normative baseline."*

One adjacent criterion considered and ruled out (`V-U4.md:228-230`): *"WCAG SC 2.2.2 Pause, Stop, Hide (Level A) covers auto-starting motion... It does not weaken K-U4-016: 2.2.2 is about a mechanism to pause moving content, not about honouring a user's reduced-motion preference, which remains 2.3.3 (AAA)."*

**Practical read for picking a target:** the ALR-036–ALR-041 set is a coherent **Level AA** baseline *except* for (a) ALR-040's reduced-motion element, which is AAA, and (b) ALR-039's "concise language" element, which has no normative WCAG anchor at any level and comes from informative WAI guidance. Choosing **AA + two named above-baseline commitments** is the honest framing; choosing plain AA means ALR-040 must be split so reduced-motion is labelled a voluntary enhancement.

The document's own honest hedge (`ACT:68`): *"**COVERAGE GAP:** no product-specific conformance or reviewed activity audit was found"* for both Duolingo and Brilliant; confidence *"High for the standards baseline; product-specific usability still requires representative testing."* And `ACT:373`: *"WCAG conformance and internal playtests do not replace later testing with representative disabled learners."*

---

# 5. Source registers (primary deliverable)

All 24 sources from `ACT:26-51`. "Vendor" = company self-description about its own product; "Independent" = peer-reviewed, standards body, or third-party.

### DUO-* — Duolingo (6 sources, all vendor-published)

| ID | What it is | Used to support | Independence | Anchor |
|---|---|---|---|---|
| DUO-001 | *The Duolingo Method* (blog, Cassie Freeman, 2023-02-02), official product/learning-method article | Interactive first exposure, easier→harder progression, optional hints, personalization, bite-sized lessons. Backs ALR-001, ALR-025, ALR-026, ALR-035; product-pattern rows on entry, session length, first exposure, hint escalation, mastery presentation, motivation | **Vendor.** *"Product self-description; linked research is not reported with enough detail here to establish causal effects."* | `ACT:28` |
| DUO-002 | *Practice any skill, any time in the Practice tab* (Holly Munson, 2026-02-18), official product guide | Learner-selected targeted practice, mistake review, activity variety, example set size. The **only OBSERVED** activity-inventory source; backs ALR-007 | **Vendor.** *"Current product snapshot limited to described platforms and courses; no selection algorithm or outcome study."* | `ACT:29` |
| DUO-003 | *How our learners help improve Duolingo* (Reuveni & Leet, 2022-04-04), official research/product article | UX research, targeted mistake practice, controlled experiments, staged evaluation. Backs mistake-handling row + experimentation/analytics boundary rows | **Vendor.** *"Selected internal examples with incomplete protocols and no reusable production implementation."* | `ACT:30` |
| DUO-004 | *Rewriting Duolingo's engine in Scala* (André Kenji Horie, 2017-01-31), official engineering article | Session-generator boundary, course-data preprocessing, sequencing, caching, latency. Backs ALR-008, ALR-020, ALR-030 | **Vendor.** *"Historical architecture from 2017; current stack and algorithms may differ and are not inferred."* | `ACT:31` |
| DUO-005 | *Improving Duolingo, one experiment at a time* (Lavanya Aprameya, 2020-01-10), official engineering/experimentation article | Hypothesis-led A/B tests, gradual rollout, metric templates, learning/engagement guardrails. Backs experimentation/rollout + offline-cache + analytics rows | **Vendor.** *"Internal-service self-report; experiment definitions, datasets, and statistical code are not public."* | `ACT:32` |
| DUO-006 | *A Trainable Spaced Repetition Model for Language Learning* (Settles & Meeder, **ACL 2016**) | Recall prediction and an operational spaced-practice model. Backs the spacing/retention row and the learner-model boundary row | **Independent** (peer-reviewed operational study), though authored by Duolingo staff. *"Language-item recall and engagement do not establish blackjack mastery thresholds or a general learner model."* | `ACT:33` |

### BRI-* — Brilliant (5 sources, all vendor)

| ID | What it is | Used to support | Independence | Anchor |
|---|---|---|---|---|
| BRI-001 | *Making a world of great problem solvers* (about page, live 2026), official product/method page | Visual first exposure, pretesting, fading scaffolds, low-stakes review, interleaving, custom feedback, simple visible progress. The single most-cited source: backs ALR-001, ALR-007, ALR-026, ALR-031, ALR-033, ALR-035 | **Vendor.** *"Company self-description; several practices are described as active experiments without published protocols or outcomes."* | `ACT:34` |
| BRI-002 | *Brilliant FAQ* (live 2026), official product FAQ | Bite-sized lessons, 2-minute practice option, 15-minute recommendation, progression, feedback, personalized recommendations. Backs ALR-025, ALR-027; source of the session-size CONFLICT | **Vendor.** *"Marketing/help claims; duration and effectiveness claims are not tied to an inspectable study on the page."* | `ACT:35` |
| BRI-003 | *Can I reset course progress?* (help article, 2026-05-27) | Individual-lesson redo and review behavior. Backs the mistake-handling/retry row only | **Vendor.** *"Narrow feature snapshot; does not explain retry evidence, mastery effects, or course-wide state semantics."* | `ACT:36` |
| BRI-004 | *Practice math at your level* (product page, live 2026) | Stepwise interactive practice, mistake feedback, concept tracking, progress-based practice-set selection. Backs mastery-presentation + learner-model rows; the placement/skip-test COVERAGE GAP | **Vendor.** *"Marketing description without learner-model details, independent evaluation, or accessibility behavior."* | `ACT:37` |
| BRI-005 | *Brilliant Basics* (help index, live 2026) | Online-only access, cross-device progress sync, lesson access, product-surface behavior. Backs the offline/cache row and the deferred account-sync disposition | **Vendor.** *"Aggregated help snapshot with little implementation detail; availability and product behavior may change."* | `ACT:38` |

### SCI-* — Learning science (9 sources, all independent)

| ID | What it is | Used to support | Independence | Anchor |
|---|---|---|---|---|
| SCI-001 | Karpicke & Roediger, *The Critical Importance of Retrieval for Learning*, **Science**, 2008-02-15 — primary experiment | Retrieval practice → delayed recall. Backs ALR-001, ALR-004, ALR-017, ALR-022, ALR-031 | **Independent, peer-reviewed primary.** *"University learners and paired vocabulary; does not determine product scheduling or mastery thresholds."* | `ACT:39` |
| SCI-002 | Cepeda, Pashler, Vul, Wixted & Rohrer, *Distributed practice in verbal recall tasks*, **Psychological Bulletin**, 2006-05 — meta-analysis | Spacing and lag effects. Backs ALR-031, ALR-032 | **Independent meta-analysis.** *"Heterogeneous laboratory tasks; optimal intervals depend on retention target and cannot be copied into product configuration."* | `ACT:40` |
| SCI-003 | Rohrer & Taylor, *The Shuffling of Mathematics Practice Problems Boosts Learning*, **Instructional Science**, 2007-11 — primary experiments | Spaced + interleaved practice with delayed test. Backs ALR-031 and the interleaving row | **Independent primary.** *"Two mathematics experiments; transfer to blackjack classification requires product validation."* | `ACT:41` |
| SCI-004 | Sweller & Cooper, *The Use of Worked Examples as a Substitute for Problem Solving in Learning Algebra*, **Cognition and Instruction**, 1985 — primary experiments | Worked examples for novices, schema acquisition. Backs ALR-004, ALR-007, ALR-011, ALR-035 | **Independent primary.** *"Algebra populations and materials; expertise reversal and appropriate fading are not resolved by this study alone."* | `ACT:42` |
| SCI-005 | Brummer, de Boer, Mouw & Strijbos, *Digitally delivered instructional feedback and learning performance*, **Learning Environments Research**, 2024-06-17 — meta-analysis | Feedback content, timing, learner control, moderators. Backs ALR-005, ALR-017, ALR-018 | **Independent meta-analysis** (116 interventions / 46 articles). *"Included studies end in 2019, exclude special-needs education, and do not support one universal timing rule."* | `ACT:43` |
| SCI-006 | Kulik, Kulik & Bangert-Drowns, *Effectiveness of Mastery Learning Programs*, **Review of Educational Research**, 1990-06 — meta-analysis | Achievement, attitude, time, completion across 108 evaluations. Backs ALR-032, ALR-033 | **Independent meta-analysis.** *"Older, heterogeneous classroom programs; procedures and course contexts materially moderated results."* | `ACT:44` |
| SCI-007 | Howard, Bureau, Guay, Chong & Ryan, *Student Motivation and Associated Outcomes*, **Perspectives on Psychological Science**, 2021-11 — meta-analysis | Motivation types vs performance, persistence, well-being (344 samples). Backs ALR-027, ALR-029 | **Independent meta-analysis.** *"Mostly correlational samples; does not prove a specific interface mechanic causes autonomous motivation."* | `ACT:45` |
| SCI-008 | Babcock & Weiss, *Termination Criteria in Computerized Adaptive Tests*, **Journal of Computerized Adaptive Testing**, 2013-02-08 — simulation study | Precision, item count, item-bank sensitivity, stopping rules. Backs ALR-028, ALR-034 | **Independent simulation.** *"Psychometric simulation rather than a learning activity; assumes calibrated item information unavailable in the first proof."* | `ACT:46` |
| SCI-009 | Sweller, van Merriënboer & Paas, *Cognitive Architecture and Instructional Design: 20 Years Later*, **Educational Psychology Review**, 2019-01-22 — authoritative review | Worked examples, guidance fading, split attention, redundancy, expertise, load limits. Backs ALR-004, ALR-007, ALR-011, ALR-035, ALR-039 | **Independent authoritative review.** *"Theory-led review spanning varied domains; several effects have expertise and element-interactivity moderators."* | `ACT:47` |

### STD-* — Standards (2 sources, independent standards bodies) — *included because they carry all six accessibility ALRs*

| ID | What it is | Used to support | Independence | Anchor |
|---|---|---|---|---|
| STD-001 | **WCAG 2.2** (W3C AG WG, 2023-10-05, errata 2024-12-12) — W3C Recommendation | Every accessibility ALR: ALR-006, ALR-012, ALR-019, ALR-036–ALR-041 | **Independent, normative standard.** *"Conformance baseline, not a complete cognitive-accessibility or usability specification; product testing remains necessary."* | `ACT:48` |
| STD-002 | *Cognitive and learning disabilities and web barriers* (W3C WAI) — official **informative** guidance | ALR-006, ALR-012, ALR-019, ALR-036, ALR-039, ALR-041 | **Independent but non-normative.** *"Informative rather than normative and intentionally broad across diverse user needs."* | `ACT:49` |

### TECH-* — Content tooling (2 sources, both vendor)

| ID | What it is | Used to support | Independence | Anchor |
|---|---|---|---|---|
| TECH-001 | *Hand-crafted, machine-made: How we make learning games with AI* (Brilliant Staff, 2025-01-30), official technical/authoring article | Human-owned objectives and progression, constrained generation, variants, playtesting, human correctness review. Backs ALR-002, ALR-008, ALR-010, ALR-020, ALR-021, ALR-023 | **Vendor.** *"High-level public account; representations, prompts, tools, and production quality data remain proprietary."* | `ACT:50` |
| TECH-002 | *When almost right is catastrophically wrong: Evals for AI learning games* (Blake Farrow, 2025-02-27), official technical evaluation article | Correctness, unique solvability, visual clarity, state consistency, impossible-state, playability checks. Backs ALR-002, ALR-003, ALR-008, ALR-009, ALR-010, ALR-020, ALR-021, ALR-024 | **Vendor.** *"Selected examples and headline pass rates; eval implementation, datasets, and failure distributions are not public."* | `ACT:51` |

**Independence tally:** 13 of 24 are vendor self-description (all DUO except DUO-006, all BRI, both TECH). 11 are independent (9 SCI + 2 STD), plus DUO-006 which is peer-reviewed but Duolingo-authored. Verified as honestly labelled by the Phase-2 verifier (`V-U4.md:70-73`): *"K-U4-001 (BRI-002), K-U4-006 (DUO-001/BRI-001), K-U4-012 (BRI-001) are vendor self-descriptions, but U4's own `PUBLISHED` definition at `:20` explicitly admits 'an attributable official source', each row carries a Medium/Medium-low confidence hedge, and each declares the missing part as a `COVERAGE GAP`. Labelling is honest; no relabel warranted."*

> ⚠️ **ID collision hazard for task cards.** `STD-001` and `STD-002` mean **completely different things** in the two documents. In `ACT` they are WCAG 2.2 and WAI cognitive guidance (`ACT:48-49`). In `STO` they are the Indexed Database API 3.0 and the WHATWG Storage Standard (`STO:44-45`). Any card citing a bare `STD-00x` is ambiguous — always qualify with the document.

---

# 6. Coverage gaps and logged conflicts (quoted in full)

From `ACT:395-448`.

### Coverage gaps (5)

**Product accessibility behavior** (`ACT:397-402`):
> *"Sources searched: `DUO-001`–`DUO-005`, `BRI-001`–`BRI-005`, `STD-001`, and `STD-002`. Why insufficient: no reviewed product-specific keyboard, screen-reader, reduced-motion, or non-color conformance audit was found. Affects: `ALR-006`, `ALR-012`, `ALR-019`, and `ALR-036`–`ALR-041`. Blocks mechanics proof: **No** — the standards and explicit feature-QA requirements supply a baseline, but competitor compliance is not assumed and representative testing remains later work."*

**Placement and skip-test mechanics** (`ACT:403-407`):
> *"Sources searched: `DUO-001`–`DUO-003`, `BRI-001`, `BRI-004`, and `SCI-008`. Why insufficient: official sources name personalization or starting-point behavior without exposing skill coverage, pass criteria, calibration, or failure routing. Affects: `ALR-028`, `ALR-033`, and `ALR-034`. Blocks mechanics proof: **No** — the proof uses deterministic, unassisted, coverage-complete rules and makes no psychometric-adaptivity claim."*

**Production learner models** (`ACT:408-413`):
> *"Sources searched: `DUO-004`, `DUO-006`, `BRI-001`, `BRI-004`, `TECH-001`, `TECH-002`, and bounded official-repository queries. Why insufficient: no source exposes a complete production mastery reducer, exercise-selection algorithm, item calibration, or experiment-analysis implementation. Affects: `ALR-020`–`ALR-025` and `ALR-030`–`ALR-034`. Blocks mechanics proof: **No** — owned serializable evidence and a deterministic reducer/planner are the approved simpler boundary."*

**Brilliant experimental strength** (`ACT:414-418`):
> *"Sources searched: `BRI-001`, `BRI-002`, and `BRI-004`. Why insufficient: Brilliant names experiments in review timing, composition, interleaving, automaticity, and set length but publishes no protocols or outcome estimates. Affects: `ALR-025`, `ALR-027`, `ALR-031`, and `ALR-032`. Blocks mechanics proof: **No** — these values remain research-calibrated configuration rather than adopted competitor thresholds."*

**Blackjack transfer and numeric calibration** (`ACT:419-424`):
> *"Sources searched: `SCI-001`–`SCI-009` plus `DUO-006`. Why insufficient: the studies cover language, mathematics, general digital learning, classrooms, or psychometric simulation rather than blackjack activity and retention data. Affects: `ALR-025`, `ALR-027`, `ALR-031`, `ALR-032`, and `ALR-034`. Blocks mechanics proof: **No** — the requirements adopt mechanisms but defer numeric thresholds and require scoped feature QA and later observed-data calibration."*

### Conflicts (5)

**Recommended session size** (`ACT:425-428`):
> *"Evidence: Duolingo describes a few minutes (`DUO-001`), while Brilliant recommends 15 minutes and offers 2-minute practice (`BRI-002`). Affects: `ALR-025`, `ALR-027`–`ALR-029`. Resolution: learner-selected duration plus activity-count bounds, with values treated as configuration. Blocks mechanics proof: **No**."*

**First exposure** (`ACT:429-433`):
> *"Evidence: Brilliant reports pretesting before procedure (`BRI-001`), while worked-example evidence favors stronger novice guidance (`SCI-004`, `SCI-009`). Affects: `ALR-001`, `ALR-007`, `ALR-026`, and `ALR-035`. Resolution: allow a low-stakes diagnostic attempt, preserve it as such, and keep canonical guidance immediately available; guesses do not become mastery evidence. Blocks mechanics proof: **No**."*

**Feedback timing** (`ACT:434-438`):
> *"Evidence: Brilliant emphasizes instant custom feedback (`BRI-001`), while digital-feedback evidence supports both immediate and delayed modes depending on context (`SCI-005`). Affects: `ALR-005`, `ALR-018`, and `ALR-031`. Resolution: immediate correction for acquisition and configurable delayed review for transfer/assessment. Blocks mechanics proof: **No**."*

**Motivation and stopping** (`ACT:439-443`):
> *"Evidence: both products publish streak or competition mechanics (`DUO-001`, `BRI-001`), while motivation evidence distinguishes autonomous from controlled regulation (`SCI-007`). Affects: `ALR-027`–`ALR-029`. Resolution: meaningful size choice and neutral stop/resume; no loss-framed pressure or punishment. Blocks mechanics proof: **No**."*

**Mastery visibility** (`ACT:444-448`):
> *"Evidence: Brilliant deliberately simplifies visible milestones while acknowledging richer underlying relations (`BRI-001`); mastery research reports benefits plus time and completion tradeoffs (`SCI-006`). Affects: `ALR-032`–`ALR-034`. Resolution: simple visible states backed by reproducible evidence, with thresholds provisional. Blocks mechanics proof: **No**."*

### Additional gaps recorded outside that section
- `ACT:58` — session length: *"exact stopping and resume behavior is a **COVERAGE GAP**"* (Duolingo); *"voluntary mid-set stopping behavior is a **COVERAGE GAP**"* (Brilliant).
- `ACT:62` — *"an ordered ladder is a **COVERAGE GAP**"* for hint escalation.
- `ACT:63` — *"**COVERAGE GAP:** reviewed official sources show in-lesson help and later mistake practice but do not define a general timing policy."*
- `ACT:95-97` — *"**Decision/outcome separation:** no reviewed learning-product or study source directly tests gambling outcome bias. Keeping decision quality independent from hand outcome remains an approved blackjack training constraint, not a newly inferred research finding."*
- `ACT:215` (inside ALR-016) — *"**COVERAGE GAP:** no competitor study directly tests blackjack outcome bias."*

---

# 7. Browser storage: what was established, and the admission gate

## What the storage research established

**Consumer** (`STO:83`): one first-party browser app, one anonymous local learner; must *"durably preserve append-oriented raw attempt records plus a reproducible cached mastery/checkpoint envelope, perform one atomic checkpoint commit, migrate explicit schema versions, export a canonical serializable snapshot, and completely reset its local envelope."* Accounts, sync, telemetry, cross-device out of scope.

**Method** (`STO:140-176`, `STO-PLAN:326-470`): 5 candidates × 3 browsers × 14 named gates = **210 result cells** — 120 `OBSERVED`, 90 `SYNTHETIC`. The 14 gates (`STO-PLAN:409-424`): `empty-load`, `reload-round-trip`, `atomic-checkpoint`, `idempotent-duplicate`, `revision-conflict`, `concurrent-writers`, `stable-export`, `complete-reset`, `upgrade-v1-v2`, `aborted-upgrade-recovery`, `malformed-record-recovery`, `newer-schema-refusal`, `quota-error-surface`, `unavailable-storage-surface`.

**Environment** (`STO:146-149`): Playwright container `mcr.microsoft.com/playwright:v1.61.1-noble`, Node v24.17.0, Chromium 149.0.7827.55, Firefox 151.0, WebKit 26.5, `idb` 8.0.3, Dexie 4.4.4. Note the honest constraint at `STO:142-145`: the CachyOS host *"cannot launch"* the downloaded WebKit against the host ABI, so all three engines ran in the container rather than as a mixed host/container comparison.

### APIs evaluated and verdicts (`STO:87-95`, `STO:160-166`)

| Candidate | Verdict | Why |
|---|---|---|
| in-memory | Baseline, **12/14** per browser | Fails `reload-round-trip` (*"a fresh page loses the module map"*) and `concurrent-writers` (*"independent pages both win"*) |
| `localStorage` | Baseline, **12/14** per browser | Fails atomic commit — *"injected interruption between envelope and idempotency-key writes exposes the split commit"* — and concurrent tabs: *"both pages read revision 0 and win"* |
| native IndexedDB | Admission candidate, **14/14** per browser (42/42 total) | One four-store `readwrite` transaction; real v1→v2 `versionchange`, rollback, raw-v1 inspection, corrupt/newer refusal |
| **`idb` 8.0.3** | Admission candidate, **14/14** per browser — **APPROVED** | Same, plus `tx.done`; `openDB` v1→v2 upgrade |
| Dexie 4.4.4 | Admission candidate, **14/14** per browser — **deferred** | Correct, but *"its richer table/query/live surface has no active consumer"* (`STO:298`) |
| OPFS | **Rejected before benchmark** | *"solving structured records, indexes, migrations, and atomic envelopes above raw files adds complexity with no active-consumer benefit"* (`STO:94`) |
| Cache Storage | **Rejected before benchmark** | *"semantic mismatch for mutable attempts, revision checks, indexes, and atomic checkpoint records"* (`STO:95`) |

### Failure modes and quota behavior
- **Concurrency** (`STO:172-174`): *"for every full candidate, two real pages reached the same revision without a runner-side mutex. Exactly one initial write committed; the conflict loser loaded revision 1 and its explicit retry advanced to revision 2."*
- **Corrupt / newer schema** (`STO:226-230`): malformed metadata and attempts surface `RECOVERY_REQUIRED` with actions `export-raw` and `reset-with-confirmation`; schema 999 surfaces `NEWER_SCHEMA` with `export-raw` and `upgrade-app`. *"Reset is never automatic."*
- **Quota / unavailable storage / write-abort / aborted-upgrade / malformed / newer-schema** are all **SYNTHETIC** (`STO:174-176`): *"They prove the adapter response and last-valid-state handling, not the frequency or exact trigger of real browser failures."*
- **Loss paths** (`STO:137`): *"clearing site data, closing a private session, quota pressure, and browser eviction are expected loss paths. A successful persistence request may reduce automatic eviction in a browser-specific way but cannot override explicit user deletion."*
- **Quota is deliberately approximate** (`STO:53`, BROWSER-005): *"Quotas are deliberately approximate and vary with browser, device, free space, and browsing mode."* Safari policy (BROWSER-012) *"can change by Safari release and does not describe Chromium or Firefox."*
- **Durability hints are hints** (`STO:50`, BROWSER-002): *"The value is a hint selected or reported by the user agent, not proof that a write survived power loss."*

### Performance: not measured
`STO:180-184`: **COVERAGE GAP — protocol implemented but timing run deferred.** *"no timing sample is decision-eligible in this report. Filtered trial runs showed that repeatedly rebuilding the 10,000-attempt fixture dominated research wall time... partial timing output is not preserved or cited."* `STO:203`: *"No performance ranking is made."*

### Conclusion
`STO:334-337`: **Approve `idb` 8.0.3** — *"It preserves native IndexedDB semantics, passes every hard gate in all three engines, has zero runtime dependencies, and adds only a native-shaped Promise/TypeScript layer."* Approved by the user 2026-07-16 (`STO:3`, `STO:331`).

Eight downstream constraints bind any implementation (`STO:302-311`): outer schema version + pseudonymous learner key before the first durable attempt; raw attempts are durable authority and cached mastery is disposable; checkpoint writes atomic + revision-checked + idempotent; unknown-newer and corrupt records never trigger silent reset; export available before destructive reset; storage failure leaves the last committed state usable; *"React and engine code do not call the storage provider directly"*; later account linking goes through a separate approved design.

Exit condition (`STO:283-289`): retire `idb` for native IndexedDB *"if a dependency-free policy becomes more valuable... or if the wrapper stops tracking required browsers."* Reopen Dexie only for a real indexed-query/live-observation consumer.

Remaining blocking gap (`STO:323-327`): *"no production adapter is wired to the application yet, and no feature QA has been run for durable learner progress"*, and *"Emitted production bundle cost was not measured."*

## What `stack-boundaries.md` requires before adopting any new technology

The gate (`SB:16-36`) fires before choosing any new **language/runtime**, **database/durable store/hosted service**, **compiled or generated delivery artifact**, or **cross-language/cross-process/cross-target boundary**. The active design or implementation plan **must record all six fields**:

1. **Active task and consumer** — *"the exact product/research job the tool serves now."*
2. **Alternatives considered** — *"including the current stack and a no-new-tool option."*
3. **Why the simpler current path no longer works** — *"concrete evidence or measured retrofit cost, not preference or hypothetical scale."*
4. **Serializable boundary shape** — *"the data/actions crossing the boundary and which side owns truth; no hidden shared/native state."*
5. **Freshness and determinism evidence where relevant** — freshness guard for generated artifacts; parity evidence for cross-target execution.
6. **Exit or retirement condition** — *"the evidence that would remove, replace, or consolidate the tool later."*

Framing constraints: *"This protocol is not a registry, technology catalogue, or permission to add speculative layers... admitted only for a concrete consumer. If the current path still works simply, keep it."* (`SB:12-14`) And `SB:38-39`: *"No additional protocol is created merely because a new candidate appears."*

`STO:232-289` is the worked example — all six fields filled in for `idb`.

**Two live board items from `SB`:**
- The `idb` admission is **conditional and still outstanding** (`SB:68-75`, restated at `SB:138-142`): *"the implementation slice must measure the real production bundle delta, and a material unacceptable delta reverses the choice to native IndexedDB."*
- `SB:138-142` records that the doc's own text is **stale**: *"`idb` 8.0.3 is now installed in `web/package.json` `dependencies` (observed 2026-07-23). The 'Storage and hosted services' section above says the application dependency is not installed yet; that sentence is stale."* The conditional bundle-delta measurement is unchanged and still owed.

**Layer relevance:** the Layer-1 constraint carried by `SB:130-131` is worth a card of its own — *"keep learning logic in plain TypeScript modules rather than inside React components, so logic survives a UI platform change. This is the only part of the mobile question that constrains present work."*

---

## Cross-cutting flags worth a card each

1. **State a WCAG target conformance level** before treating ALR-036–ALR-041 as one baseline. ALR-040's reduced-motion element is AAA (SC 2.3.3); everything else in the set is A or AA. (`ACT:363-367`; `docs/specs/2026-07-22-product-design-inputs.md:299-303`)
2. **Re-label ALR-001 and ALR-005** to drop unearned `PUBLISHED` tags. (`V-U4.md:38-65`)
3. **Fix ALR-004 / ALR-022 evidence fields** — the `AttemptRecord` seam is the gap, not the support. (`V-U4.md:48-55`; `web/src/learn/types.ts:40-49`)
4. **Disambiguate `STD-001` / `STD-002`** on every card — they mean different sources in the two research documents.
5. **Measure the `idb` production bundle delta** — the only outstanding condition on an already-installed dependency. (`SB:138-142`)
6. **13 of 41 ALRs were silently unaccounted for** in the Phase-2 audit's own coverage claim (`P2-gate-summary.md:73-75`) — the set in section 1 above is complete and can replace it.