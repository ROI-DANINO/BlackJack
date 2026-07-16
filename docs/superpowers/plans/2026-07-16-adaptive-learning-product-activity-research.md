# Adaptive Learning Product and Activity Research Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce a cited, decision-ready evidence base for the first adaptive-learning session mechanics and the initial multiple-choice, assemble-blocks, and engine-backed-hand activity contracts.

**Architecture:** This is the first research plan under the approved adaptive-learning umbrella. It creates one tracked findings document, distinguishes observed product behavior from published claims and project inference, and converts evidence into testable activity requirements without selecting storage, AI providers, or implementation libraries.

**Tech Stack:** Markdown, official product/help/engineering sources, primary research papers and authoritative reviews, public/open-source repositories where officially attributable, Git, and the repository's existing research/design documents.

## Global Constraints

- Treat this as a training product, never gambling software.
- Use the approved umbrella architecture at `docs/superpowers/specs/2026-07-16-adaptive-ai-learning-architecture-design.md` as the scope boundary.
- Research only the initial learning-product/activity gate: session structure, scaffolding, hints, mistakes, review, skip tests, pacing, accessibility, and the first three activity types.
- Label every substantive statement as observed behavior, a published claim/finding, or project inference.
- Prefer primary research and official product, help, research, engineering, standards, and repository sources; use secondary sources only to locate primary evidence or explicitly expose disagreement.
- Do not imply access to Duolingo, Brilliant, or another product's proprietary source code, algorithms, experiments, internal metrics, or unpublished stack.
- Do not copy proprietary curriculum, wording, artwork, or interaction assets.
- Do not choose an AI provider, browser store, framework, component library, database, or hosted service in this plan.
- Keep blackjack rules, legal actions, outcomes, and Basic Strategy under Rust/WASM and verified-oracle authority.
- Keep AI out of answers, grading, mastery, progression, and unlocks.
- Findings are evidence, not adopted product authority, until the user reviews them and an owned design explicitly folds the accepted decisions.
- Only the root/orchestrating agent edits `journal/ops/tasks.md`; delegated researchers return evidence and never move cards.
- Record direct URLs, publication dates where available, retrieval date, source type, claim scope, and limitations for every cited source.
- Quote sparingly; paraphrase findings and keep any necessary quotation within source/copyright limits.

---

## File Map

**Create during execution:**

- `docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md` — source register, product-pattern comparison, learning-science synthesis, public technical/tooling audit, activity requirements, adopted/rejected recommendations, coverage gaps, and questions for user approval.

**Read but do not modify:**

- `docs/superpowers/specs/2026-07-16-adaptive-ai-learning-architecture-design.md` — approved umbrella scope and authority boundaries.
- `docs/specs/product-vision.md` — product feel, learning loop, and decision/outcome separation.
- `docs/specs/learning-mastery-and-scoring.md` — existing pedagogy, mastery, hints, and AI-coach direction.
- `docs/specs/qa-playtest-process.md` — feature QA and learning-integrity requirements.
- `docs/specs/research-brief.md` — just-in-time research rules and source discipline.
- `docs/specs/stack-boundaries.md` — Tool & Runtime Admission Protocol; this plan produces no admission decision.
- `web/src/learn/types.ts` — current activity and evidence vocabulary.
- `web/src/learn/content/blackjack-basics.ts` — current `Read Your Hand` and `Win, Lose, or Push` mechanics.

**Explicitly outside this plan:**

- Kanban/phase reconciliation;
- browser-storage comparison and admission;
- AI provider/model comparison and admission;
- implementation code, UI mockups, curriculum migration, and feature QA execution;
- wider blackjack curriculum population; and
- public hosting, security, accounts, sync, and multi-user scaling.

---

### Task 1: Establish the Research Record and Evidence Contract

**Files:**
- Create: `docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md`

**Interfaces:**
- Consumes: approved authority, scope, research-gate, and first-activity decisions from the umbrella spec.
- Produces: the stable headings, evidence labels, source-register schema, and research questions consumed by Tasks 2–7.

- [ ] **Step 1: Re-read the exact local scope before creating the findings file**

Run:

```bash
sed -n '1,180p' docs/superpowers/specs/2026-07-16-adaptive-ai-learning-architecture-design.md
sed -n '276,368p' docs/superpowers/specs/2026-07-16-adaptive-ai-learning-architecture-design.md
sed -n '394,446p' docs/superpowers/specs/2026-07-16-adaptive-ai-learning-architecture-design.md
```

Expected: the output names the three first activity types, the two representative units, the deterministic grading boundary, the research gate, and the non-goals.

- [ ] **Step 2: Create the findings document with the exact evidence contract**

Create `docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md` with this initial content:

```markdown
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

## Recommendations Requiring User Approval
```

- [ ] **Step 3: Verify the record has every required research surface**

Run:

```bash
rg -n '^## (Research Questions|Evidence Labels|Source Register|Product-Pattern Comparison|Learning-Science Evidence|Public Technical and Tooling Evidence|Initial Activity Requirements|Adopt, Reject, or Defer|Coverage Gaps and Conflicting Evidence|Recommendations Requiring User Approval)$|^### (Multiple Choice|Assemble Blocks|Engine-Backed Hand|Shared Activity Requirements|Session, Hint, Review, and Skip-Test Requirements|Accessibility Requirements)$' docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md
```

Expected: 16 matching headings: 10 level-two headings and 6 activity/requirement subsections.

- [ ] **Step 4: Commit the research record structure**

```bash
git add docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md
git diff --cached --check
git commit -m "docs(research): scope adaptive activity evidence"
```

Expected: one new findings file committed; no Kanban, code, or other owned docs changed.

---

### Task 2: Build the Official and Primary Source Register

**Files:**
- Modify: `docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md`

**Interfaces:**
- Consumes: Task 1 evidence labels and source-register columns.
- Produces: stable source IDs used by every later evidence row and recommendation.

- [ ] **Step 1: Search official Duolingo surfaces with bounded queries**

Use web search and then open direct sources for these queries:

```text
site:duolingo.com OR site:blog.duolingo.com learning science practice mistakes review hints
site:blog.duolingo.com research spaced repetition mastery personalization
site:blog.duolingo.com engineering lessons exercises experimentation learning
site:research.duolingo.com practice spacing assessment
site:github.com/duolingo learning OR education OR exercise
```

Record only direct official pages, official repositories, and attributable papers. For every required product-pattern category with no direct evidence, add a `COVERAGE GAP` rather than filling it from memory.

- [ ] **Step 2: Search official Brilliant surfaces with bounded queries**

Use web search and then open direct sources for these queries:

```text
site:brilliant.org interactive learning problem solving practice hints
site:brilliant.org/help course practice progress quiz
site:brilliant.org OR site:blog.brilliant.org learning science spaced practice feedback
site:github.com/brilliantorg education OR learning OR interactive
```

Record official product/help/research/engineering sources and officially attributable public repositories. Explicitly mark technical areas that remain proprietary or undocumented.

- [ ] **Step 3: Search primary learning-science and standards sources by topic**

Use scholarly/official search to locate the original paper or an authoritative review for each topic:

```text
retrieval practice learning primary study review
spacing effect learning meta-analysis retrieval
interleaved practice learning discrimination study
worked example effect cognitive load review
immediate delayed feedback learning meta-analysis
mastery learning meta-analysis education
adaptive testing learner knowledge evidence review
WCAG 2.2 understanding input purpose target size cognitive accessibility
```

Prefer DOI/publisher pages, author manuscripts, recognized research organizations, and W3C/WAI pages. Do not cite search-result snippets as evidence.

- [ ] **Step 4: Populate source rows with stable IDs and complete metadata**

Use source IDs grouped by origin:

```text
DUO-001, DUO-002, ...
BRI-001, BRI-002, ...
SCI-001, SCI-002, ...
STD-001, STD-002, ...
TECH-001, TECH-002, ...
```

Every row must include a direct URL, publisher/authors, publication date when available, source type, claim scope, retrieval date, and a concrete limitation. Do not create one source ID for a search results page.

- [ ] **Step 5: Verify source-register completeness before synthesis**

Run:

```bash
rg -n '^\| (DUO|BRI|SCI|STD|TECH)-[0-9]{3} \|' docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md
rg -n 'COVERAGE GAP' docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md
```

Expected: source rows exist for both products, learning science, and accessibility/standards; unanswered required categories are explicit coverage gaps rather than unsupported claims.

- [ ] **Step 6: Commit the source register**

```bash
git add docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md
git diff --cached --check
git commit -m "docs(research): register adaptive learning sources"
```

Expected: only the findings file changes.

---

### Task 3: Compare Observable Product Teaching Patterns

**Files:**
- Modify: `docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md`

**Interfaces:**
- Consumes: official sources and evidence labels from Tasks 1–2.
- Produces: a comparable product-pattern matrix without inferring proprietary implementations.

- [ ] **Step 1: Audit the same bounded pattern list for each product**

Populate one comparison row for each of these patterns:

```text
session entry and goal framing
session length and stopping behavior
first exposure and worked examples
activity variation
mistake handling and retry
hint escalation
immediate versus delayed feedback
review and spaced return
progress/mastery presentation
placement or skip tests
motivation without outcome bias
accessibility and non-color cues
```

For each product cell, cite source IDs and prefix the claim with `OBSERVED`, `PUBLISHED`, or `COVERAGE GAP`. Put cross-product interpretation only in the transferable-requirement column and label it `INFERENCE`.

- [ ] **Step 2: Separate product behavior from marketing and engineering claims**

For every row based on a marketing/help description, record what the source demonstrates and what it does not demonstrate. For every public engineering source, record only the component, boundary, experiment, or tool it actually documents; do not extrapolate to the undisclosed production stack.

- [ ] **Step 3: Record conflicts instead of averaging them away**

Add each disagreement between products, studies, or existing project direction to `Coverage Gaps and Conflicting Evidence` with source IDs and the decision it affects. Examples of decision categories are retry timing, hint cost, lesson length, visible mastery, and strict versus guided progression.

- [ ] **Step 4: Verify every comparison row is attributable**

Run:

```bash
rg -n '^\| (session entry|session length|first exposure|activity variation|mistake handling|hint escalation|immediate versus delayed|review and spaced|progress/mastery|placement or skip|motivation|accessibility)' docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md
```

Expected: 12 comparison rows, each with explicit evidence labels, source IDs or coverage gaps, a transferable requirement, and a limitation/confidence statement.

- [ ] **Step 5: Commit the product comparison**

```bash
git add docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md
git diff --cached --check
git commit -m "docs(research): compare adaptive teaching patterns"
```

Expected: only the findings file changes.

---

### Task 4: Synthesize Learning-Science Evidence

**Files:**
- Modify: `docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md`

**Interfaces:**
- Consumes: `SCI-*` and `STD-*` sources plus current project pedagogy.
- Produces: evidence-strength statements and bounded project inferences for activity/session design.

- [ ] **Step 1: Write one evidence row per required topic**

Cover exactly these topics:

```text
retrieval practice
spacing and retention
interleaving and discrimination
worked examples and fading guidance
cognitive load and split attention
immediate versus delayed feedback
mastery learning and prerequisite gates
adaptive assessment and evidence quality
motivation, autonomy, and non-punitive stopping
accessibility for cognitive and motor interaction
```

Each row states the finding, source IDs, evidence type/strength, limitations/population/context, and a separately labeled project inference. Do not turn a laboratory effect size directly into a product threshold.

- [ ] **Step 2: Cross-check existing project learning claims**

Read:

```bash
sed -n '1,240p' docs/specs/learning-mastery-and-scoring.md
sed -n '45,100p' docs/specs/product-vision.md
```

For each existing direction used by the umbrella—targeted repetition, hint ladder, interleaving, evidence across sessions, decision/outcome separation, guided progression—cite supporting evidence, qualify it, or record a gap. Do not edit the owned docs in this plan.

- [ ] **Step 3: Verify evidence and inference remain separate**

Run:

```bash
rg -n '^\| (retrieval practice|spacing and retention|interleaving and discrimination|worked examples|cognitive load|immediate versus delayed|mastery learning|adaptive assessment|motivation, autonomy|accessibility for cognitive)' docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md
```

Expected: 10 learning-science rows; every row contains source IDs, an evidence limitation, and an explicit project inference.

- [ ] **Step 4: Commit the learning-science synthesis**

```bash
git add docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md
git diff --cached --check
git commit -m "docs(research): ground adaptive learning mechanics"
```

Expected: only the findings file changes.

---

### Task 5: Audit Public Technical and Content-Tooling Evidence

**Files:**
- Modify: `docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md`

**Interfaces:**
- Consumes: official engineering sources and attributable public repositories from Task 2.
- Produces: transferable boundary/tooling requirements without a stack or provider decision.

- [ ] **Step 1: Audit only publicly verifiable technical concerns**

Create one row for each concern:

```text
curriculum/content representation
activity/component representation
content validation and preview
experimentation and rollout
learner-model or personalization boundary
offline/cache behavior
accessibility testing
analytics/evaluation boundary
```

Each row states what is publicly verified, cites source IDs, names what remains unknown/proprietary, and records only the transferable implication for this project.

- [ ] **Step 2: Apply the Tool & Runtime Admission boundary**

Read:

```bash
sed -n '1,125p' docs/specs/stack-boundaries.md
```

Confirm the findings document does not select a framework, database, SDK, model, hosted service, or generated artifact. Any interesting technology is recorded only as evidence tied to a future consumer, not as an approved candidate or requirement.

- [ ] **Step 3: Verify unknowns are explicit**

Run:

```bash
rg -n '^\| (curriculum/content|activity/component|content validation|experimentation|learner-model|offline/cache|accessibility testing|analytics/evaluation)' docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md
```

Expected: 8 rows; every row has a non-empty unknown/proprietary-boundary cell and no admission decision.

- [ ] **Step 4: Commit the public technical/tooling audit**

```bash
git add docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md
git diff --cached --check
git commit -m "docs(research): audit public learning tooling evidence"
```

Expected: only the findings file changes.

---

### Task 6: Convert Evidence into Initial Activity Requirements

**Files:**
- Modify: `docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md`

**Interfaces:**
- Consumes: product, science, standards, and technical evidence from Tasks 2–5.
- Produces: testable `ALR-*` requirements and explicit adopt/reject/defer decisions used by the later activity-overlay design.

- [ ] **Step 1: Define the requirement record format**

Every requirement uses this exact shape:

```markdown
- **ALR-NNN — Imperative requirement.**
  - Applies to: activity or session surface.
  - Evidence: source IDs and evidence labels.
  - Verification: observable test or review condition.
  - Limitation: context in which the requirement may not hold.
```

Assign IDs sequentially beginning at `ALR-001`; never reuse an ID after it appears in a committed findings document.

- [ ] **Step 2: Write requirements for each first activity type**

For Multiple Choice, Assemble Blocks, and Engine-Backed Hand, cover:

```text
learning purpose and supported evidence
prompt and response contract
scenario/answer authority
distractor or block-generation constraints
hint and retry behavior
assistance evidence
feedback timing
accessibility and keyboard/touch behavior
estimated-duration input needed by session budgets
failure/fallback behavior
```

Every requirement cites evidence or is labeled a project constraint from the approved umbrella. Do not invent visual styling or implementation APIs.

- [ ] **Step 3: Write shared session and progression requirements**

Cover session entry, learner-selected bounds, evidence-target completion, checkpoint grouping,
non-punitive stopping, in-progress continuation, review mixing, mastery checks, skip tests, and
mostly on-demand coaching. Mark numeric thresholds as research-calibrated configuration unless the
evidence directly supports a bounded value for this exact context.

- [ ] **Step 4: Populate the disposition table**

For each candidate product pattern, choose exactly one disposition:

```text
Adopt for the first mechanics proof
Reject for the first mechanics proof
Defer until wider curriculum research
Defer until public web/multi-user work
```

Each row names evidence IDs, a concrete reason, and the next consumer. Do not use `consider later` or another unbounded disposition.

- [ ] **Step 5: Verify requirement IDs and dispositions**

Run:

```bash
rg -n '^\- \*\*ALR-[0-9]{3} —' docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md
rg -n '^\| .* \| (Adopt for the first mechanics proof|Reject for the first mechanics proof|Defer until wider curriculum research|Defer until public web/multi-user work) \|' docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md
```

Expected: sequential `ALR-*` requirements exist across all six requirement subsections, and every disposition uses one bounded value.

- [ ] **Step 6: Commit the requirements synthesis**

```bash
git add docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md
git diff --cached --check
git commit -m "docs(research): define initial adaptive activity requirements"
```

Expected: only the findings file changes.

---

### Task 7: Adversarially Review the Evidence and Prepare the User Gate

**Files:**
- Modify: `docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md`

**Interfaces:**
- Consumes: the complete findings document from Tasks 1–6.
- Produces: a citation-audited, scope-safe research report with explicit coverage gaps and a bounded user-decision list.

- [ ] **Step 1: Audit every factual and comparative claim against its cited source**

For each table row and recommendation:

1. Open the cited direct source.
2. Confirm the source supports the claim's actual wording and scope.
3. Downgrade overbroad language or add the missing limitation.
4. Convert unsupported claims to `COVERAGE GAP` or remove them.
5. Confirm product observation, published evidence, and project inference are not blended.

- [ ] **Step 2: Audit copyright, proprietary-boundary, and authority safety**

Confirm the report contains no copied lesson/activity content, long quotations, inferred proprietary code/stack, raw inbox authority, AI-owned grading, or blackjack claims sourced only from a learning-product comparison.

- [ ] **Step 3: Audit scope against the umbrella spec**

Run:

```bash
rg -n -i 'provider|model|database|indexeddb|localstorage|framework|sdk|hosting|account|sync|vector' docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md
```

Expected: any match is either a source observation, explicit non-decision, deferred consumer, or coverage note; no stack/admission choice appears.

- [ ] **Step 4: Write the final coverage gaps and user-approval list**

`Coverage Gaps and Conflicting Evidence` must name each unresolved question, sources searched, why the evidence is insufficient or conflicting, its affected requirement, and whether it blocks the mechanics proof.

`Recommendations Requiring User Approval` must contain only decisions that change the approved umbrella, activity scope, or learner experience. Each item cites `ALR-*` requirements and offers a recommended disposition with alternatives.

- [ ] **Step 5: Run the final deterministic document checks**

Run:

```bash
rg -n -i '\b(TBD|TODO|FIXME|placeholder|somehow)\b' docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md
git diff --check
git status --short
```

Expected: the placeholder scan and whitespace check print nothing; status shows only the findings file modified for this task.

- [ ] **Step 6: Commit the reviewed research report**

```bash
git add docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md
git diff --cached --check
git commit -m "docs(research): review adaptive activity evidence"
```

Expected: the complete research report is committed with no owned product spec, Kanban, code, or unrelated file changes.

- [ ] **Step 7: Stop at the user evidence gate**

Report:

```text
Research report complete. Please review the Adopt/Reject/Defer table, coverage gaps, and recommendations requiring approval. No findings become product authority and no activity implementation plan begins until you approve the bounded recommendations.
```

Expected: execution stops for user review; no automatic fold into `product-vision.md`, `learning-mastery-and-scoring.md`, the umbrella spec, or implementation cards.

---

## Plan Verification

Before executing this plan, the root/orchestrating agent verifies:

```bash
test -f docs/superpowers/specs/2026-07-16-adaptive-ai-learning-architecture-design.md
test -f docs/specs/product-vision.md
test -f docs/specs/learning-mastery-and-scoring.md
test -f docs/specs/qa-playtest-process.md
test -f docs/specs/research-brief.md
test -f docs/specs/stack-boundaries.md
test -f web/src/learn/types.ts
test -f web/src/learn/content/blackjack-basics.ts
git status --short
```

Expected: every required input exists and the worktree is clean. Any controller-owned Kanban/phase reconciliation must already be committed separately before research execution begins.

This plan is complete when the reviewed findings report is committed and awaiting user approval. It does not close the umbrella program, admit a tool/runtime, or authorize implementation.
