# Adaptive AI Learning Architecture — Local Mechanics Proof

> Status: conversational design approved 2026-07-16; written-spec review pending.
> Scope: umbrella architecture and decomposition for the first local, single-learner proof. This is
> not the full curriculum, a public hosting design, or one feature-sized implementation spec.

## Purpose

Blackjack should eventually teach like a smart, calm friend rather than replay the same authored
lesson for every learner. Subjects, units, skills, verified facts, prerequisites, and mastery
requirements remain stable. The actual session is assembled for the learner from their durable
history, current evidence, selected session budget, and the approved curriculum.

The first proof is deliberately small. It uses one anonymous local learner, two representative
Blackjack Foundations units, three activity types, browser-local durable progress, a deterministic
fallback planner, and an optional local AI planner/coach. It proves the mechanics before a later
deep-research cycle creates the wider lesson and unit catalog.

## Existing Context and Change in Direction

The current learning implementation stores nine complete Blackjack Foundations units as typed
`Unit.steps[]` data and executes them through a deterministic `LessonController`. That completed
path remains valuable as verified behavior, a comparison baseline, and a fallback.

The existing future-learning notes already define AI as a coach that explains, encourages,
summarizes patterns, and selects practice from approved facts. They also reserve a provider-neutral
`ProgressStore`, versioned progress records, and browser-local persistence before accounts or sync.
This design activates and extends those directions: AI may author the learner-facing shape of a
session, but it does not become the source of blackjack truth, answers, grading, mastery, or unlocks.

This work is upstream of the current Strategy Table Fundamentals cards. It must be represented as an
explicit adaptive-learning mechanics sub-phase rather than hidden inside `STF-02` or `STF-03`.

## Product Decisions

- Curriculum structure is stable; sessions are dynamic.
- Generated sessions may split a unit into remedial segments, mix prerequisite review, and combine
  related skills, but those segments do not become canonical units.
- Session generation uses a checkpoint hybrid: a safe skeleton exists up front, future chunks are
  prefetched, and synchronous waiting is short and exceptional.
- Activity truth leans deterministic. AI selects activities and may personalize approved wording,
  hints, transitions, and explanations.
- The tutor is a bounded hybrid that leans on-demand. It speaks proactively only at useful session
  boundaries and offers explicit help intents during activities.
- Sessions pursue evidence targets inside learner-selected time and activity-count bounds.
- An unfinished session saves progress and continues later; it is not a failure.
- Progression is guided with strict gates for essential prerequisites. Learners may skip a unit by
  passing a deterministic skill test.
- Learners see simple mastery states backed by richer internal evidence.
- The local proof uses an anonymous device learner ID and browser-local durable records.
- Curriculum is version-controlled structured data now. A future remote curriculum service may
  publish versioned catalogs that a browser-local database caches for speed and offline use.

## Non-Goals

The first proof does not:

- migrate all nine Blackjack Foundations units;
- populate the complete blackjack curriculum;
- implement Strategy Table Fundamentals;
- choose a production account, backend, database, model, or hosting provider;
- implement public multi-user queues, budgets, sync, analytics, or administration;
- expose unrestricted chat;
- use vector retrieval;
- let AI create new activity component types or executable UI;
- let AI decide blackjack facts, correct answers, grades, mastery, progression, or unlocks;
- replace scoped feature QA with model self-evaluation.

## Artifact and Plan Topology

This document is the program-level architecture. It is not executed through one mega-plan. The
work crosses operational state, independent research questions, infrastructure boundaries, pure
learning mechanics, model integration, UI activities, and conditional convergence. Each
implementation-bearing slice receives its own focused design, plan, verification, and feature QA.

### Operational reconciliation — no feature coding plan

After this umbrella spec passes written review, the root/orchestrating agent performs one explicit
Kanban/phase reconciliation. That operation fixes the invalid duplicate card, records the temporary
adaptive-learning sub-phase, creates only the active research/design cards, and validates board
policy. It uses a small reviewed checklist and exact board diff; it does not belong inside any
feature coding plan.

### Research plan family

The three initial research areas are independent artifacts with separate questions and evidence:

1. **Learning-product and activity research plan** — Duolingo, Brilliant, learning science,
   interaction/accessibility patterns, and requirements for the first three activity types.
2. **Browser progress-storage research/admission plan** — identity, storage alternatives,
   migrations, recovery, privacy, adapter contract, and the Tool & Runtime Admission record.
3. **Local AI planner/coach research/admission plan** — provider/model evaluation, structured
   output, grounding, security, latency, tokens, cost, fallback thresholds, and admission evidence.

Each research plan produces a tracked findings/report artifact. Research conclusions may constrain
later designs; they do not silently edit implementation scope.

### Implementation spec-and-plan family

Research evidence feeds several focused implementation cycles:

1. **Adaptive mechanics foundation** — catalog contracts, learner envelope, evidence records,
   mastery reducer, session-plan contract, deterministic planner, controller skeleton, headless
   tests, and adapter contract suites. Its detailed design and plan consume the relevant learning
   and storage findings.
2. **Local AI adapter and evaluation harness** — loopback planner/coach boundary, request
   isolation, structured validation, usage recording, model stubs, live evaluation harness, and
   security baseline. Its design and plan consume the AI research and the proven planner contract.
3. **Two-unit activity overlay** — the three activity factories, `Read Your Hand`, `Win, Lose, or
   Push`, UI execution, checkpoint prefetch, on-demand coach, persistence integration, and scoped
   feature QA. Its design and plan consume the mechanics foundation plus learning/activity evidence.
4. **Lesson-path convergence** — conditional work only after overlay evidence. If the proof passes,
   a separate convergence plan routes ordinary lessons through `SessionPlan`, adapts fixed
   `steps[]` through the deterministic planner, proves parity, and removes the superseded direct
   execution path.

The mechanics, AI adapter, and overlay are not combined merely because they share this architecture.
Their failure modes, research inputs, verification, and exit conditions differ enough to justify
separate plans.

### Later programs

Wider curriculum-data research and public web/multi-user deployment remain separate future
programs. Each receives its own design and plan only when the local proof activates its trigger.

## Authority Boundaries

| Concern | Authority |
|---|---|
| Cards, ordered shoes, rules, legal actions, outcomes, hand facts, Basic Strategy | Rust/WASM engine and verified strategy oracle |
| Stable skills, objectives, facts, misconceptions, prerequisites, evidence requirements, provenance | Versioned curriculum catalog |
| Activity scenarios, correct answers, grading, canonical fallback help | Deterministic activity factories using catalog and engine authority |
| Raw attempt evidence | `ProgressStore` records produced by the session controller |
| `New`, `Learning`, `Needs practice`, `Mastered`, `Review due` | Versioned deterministic mastery reducer |
| Unit completion, prerequisite gates, skip-test verdicts | Deterministic progression policy |
| Session ordering, difficulty, activity mix, repetition, optional wording/coaching | Bounded `SessionPlanner` and `Coach`; deterministic fallback always available |
| Rendering and interaction | React product shell over learning-owned semantic state |

AI output is advisory input to validated learning contracts. It never writes learner state directly.

## Architecture

All lesson execution converges on one serializable `SessionPlan` contract:

```text
Versioned CurriculumCatalog
           +
ProgressStore -> deterministic MasteryReducer
           |
           v
SessionPlanner -> SessionPlan -> SessionController -> ActivityRegistry
      |                              |                    |
AI or deterministic             checkpoint/prefetch   Rust/WASM truth
planner                         and fallback          and grading
```

### Components

#### `CurriculumCatalog`

A read-only, versioned catalog loaded from repository-controlled structured files. It resolves
subjects, units, skills, facts, misconceptions, provenance, activity compatibility, evidence
requirements, and engine/oracle authority references. Catalog validation happens before affected
units are offered.

#### `ProgressStore`

A provider-neutral port for the local learner envelope, individual attempts, session summaries,
and safe migrations. The first adapter is browser-local and is selected only after the storage
research/admission gate. The port must support load, append attempt, commit session summary,
export, reset, and explicit migration/recovery behavior.

#### `MasteryReducer`

A pure, deterministic, versioned reducer from attempt evidence to skill states and compact evidence
summaries. The same input history and reducer policy must produce the same output.

#### `ActivityRegistry`

A registry of deterministic activity factories. Each factory owns a versioned input/output schema,
scenario generation, answer authority, grading, canonical prompt/help, AI-editable slots,
accessibility metadata, estimated duration, and emitted evidence shape.

#### `SessionPlanner`

A provider-neutral interface that accepts a bounded planner input and returns a candidate
`SessionPlan` or activity chunk. A deterministic planner and an AI planner implement the same port.
The deterministic planner is permanent offline/error behavior, not temporary code.

#### `SessionController`

The learning runtime. It enforces eligibility, evidence goals, time and activity bounds, model-call
caps, one active planner request per session, checkpoint versions, idempotency, cancellation,
validation, deterministic fallback, attempt persistence, and end-of-session behavior.

#### `Coach`

A separate provider-neutral interface for bounded help intents. The first intents are hint,
explain, why-wrong, another-example, and current-focus. Coach output cannot mutate the plan,
attempts, grades, mastery, or progression.

#### `UsageRecorder`

A local research surface for request counts, input/output tokens where provided, latency,
validation failures, stale responses, fallbacks, coach usage, activity completion, and learning
evidence. It must not record secrets, hidden reasoning, or unnecessary learner content.

## Curriculum Data Model

The catalog describes teaching structure and truth rather than complete lesson scripts.

```text
Subject
`-- Unit
    |-- required and optional skill IDs
    |-- prerequisite and progression policy
    |-- teaching objectives
    |-- allowed activity factory IDs
    |-- mastery and skip-test requirements
    |-- curriculum fact IDs
    |-- engine/oracle authority IDs
    `-- source/provenance IDs
```

Each skill record includes:

- the learner capability being trained;
- prerequisite skills and difficulty bands;
- verified facts and concise canonical explanations;
- common misconceptions;
- valid examples and generation constraints;
- required evidence kinds and assistance ceilings;
- suitable activity factories;
- answer authority references; and
- claim-level source/provenance references and verification status.

A unit therefore answers both “what must this unit teach?” and “where does its instructional truth
come from?” without containing a fixed session.

## Learner and Evidence Data

The first local learner envelope contains:

```text
LearnerRecord
|-- schema version
|-- anonymous device learner ID
|-- reducer version
|-- curriculum versions encountered
|-- sessions
|-- raw attempts
|-- skill evidence summaries
`-- reproducible cached mastery snapshot
```

The anonymous learner UUID is generated on first use and treated as pseudonymous rather than as
personal identity. A later account system must explicitly import or link the local learner record.

Every graded attempt records at least:

- learner, session, plan, checkpoint, unit, skill, activity, and evidence-goal IDs;
- curriculum, activity-factory, and reducer versions;
- interaction mode and difficulty;
- response and deterministic correctness or ungraded status;
- first response versus retry and assistance level;
- error/misconception classification where applicable;
- the authority used to grade, including relevant engine facts;
- timing for later research, without assuming speed equals ability; and
- whether presentation came from AI, cache, or deterministic fallback.

Derived mastery may be cached for startup performance, but it must be reproducible from durable
attempt evidence and its recorded reducer version.

## Session Plan and Budget

A `SessionPlan` identifies its catalog version, learner-snapshot version, unit, evidence goals,
session budget, checkpoint structure, activity factory requests, canonical fallback chunks, and
optional coaching intentions.

The learner chooses a session-size preset. Each preset resolves to a target duration and maximum
activity count. The deterministic controller also owns model-call and token/output bounds. Exact
values are research-calibrated configuration rather than fixed architectural assumptions.

A session ends when:

- its evidence target is satisfied;
- its time bound is reached;
- its activity bound is reached; or
- the learner stops.

All completed attempts remain committed. Open evidence goals stay `in progress` and inform the next
session, which may use different activities and a small amount of prerequisite or spaced review.

## Runtime Flow

### Session start

1. Load and validate the relevant catalog slice and learner record.
2. Run the mastery reducer.
3. Confirm unit or skip-test eligibility.
4. Resolve the learner-selected session budget.
5. Create a deterministic skeleton with evidence goals, checkpoints, and fallback chunks.
6. Instantiate the first activity chunk locally so play begins without model latency.
7. Prefetch the next candidate chunk from the planner.

### Each response

1. The deterministic activity factory or Rust/WASM authority grades the response.
2. Persist the attempt.
3. Re-run the reducer for affected skills.
4. Select canonical immediate feedback.
5. Continue without an AI request.

### Checkpoint

1. Create a compact delta snapshot from evidence since the prior checkpoint.
2. Cancel or invalidate work for an older snapshot.
3. Validate the newest candidate against catalog IDs, schemas, evidence goals, and budgets.
4. Use it if ready.
5. Allow only a short bounded handoff during the natural recap if it is nearly ready.
6. Otherwise continue immediately with the deterministic fallback.
7. Prefetch the following checkpoint.

Only one planner request may be active per session. Requests carry learner, session, checkpoint,
curriculum, snapshot, and idempotency identifiers. Late results for stale snapshots are ignored.

### On-demand coach

Coach requests contain only the current activity, relevant approved facts, compact learner state,
recent evidence needed for the question, and the requested help intent. Canonical help remains
immediately available if the coach is slow, invalid, over budget, or offline.

## Activity System

An activity factory declares:

- activity kind and version;
- supported skill/evidence types;
- serializable input and response schemas;
- seeded deterministic scenario generation;
- answer authority and grading function;
- allowed difficulty parameters;
- canonical prompt, hint, explanation, and fallback feedback;
- bounded slots AI may reword;
- accessibility requirements;
- estimated duration; and
- emitted evidence.

The planner requests factories by known IDs and constrained parameters. The factory creates the
actual activity and answer. AI cannot introduce a component, executable UI, unsupported fact,
answer rule, or grading rule.

### First activity types

1. **Multiple choice** — existing compatibility, approved-misconception distractors, deterministic
   grading.
2. **Assemble blocks** — a Duolingo/Brilliant-like ordered or fill-the-gap reasoning interaction.
3. **Engine-backed hand** — real shoe/round behavior, Rust authority, and decision/outcome
   separation.

Activity truth leans deterministic. AI may select, sequence, and reword bounded slots. Distractors
normally come from approved misconceptions or deterministic transformations rather than arbitrary
generated wrong claims.

## First Vertical Slice

The proof uses two completed Blackjack Foundations units while leaving their fixed path intact:

- **Read Your Hand** — totals, Ace adjustment, and bust recognition across stateless engine facts,
  multiple choice, and assemble-block activities.
- **Win, Lose, or Push** — an arranged real-engine hand followed by outcome and wager evidence,
  exercising live state and checkpoint adaptation without the known Hit-on-16 wording conflict.

The slice uses only the minimum existing facts required for these units. It does not redesign the
full curriculum. Its mechanical success criteria are:

- different learner histories produce meaningfully different valid plans;
- all grading stays deterministic;
- progress and identity survive reload;
- the coach is grounded and bounded;
- every activity and session remains completable without AI; and
- model/usage behavior is measurable.

## Grading, Mastery, and Progression

### Interaction evidence

Every graded interaction emits deterministic evidence. Assisted success is useful practice but not
independent mastery proof. Explanations and ordinary coach conversation emit no mastery evidence.
Asking for help is not failure; it records assistance only when tied to an activity.

### Mastery states

Learners see:

- `New`
- `Learning`
- `Needs practice`
- `Mastered`
- `Review due`

The reducer considers evidence count and diversity, correctness, assistance, repeated
misconceptions, recency, difficulty, activity type, and whether evidence came from guided practice,
review, mastery check, or skip test.

One mistake cannot establish a stable weakness. Mastery requires repeated independent evidence
across the evidence types declared by the skill policy. A mastered skill becomes `Review due`
rather than losing its historical mastery when retention evidence ages or later mistakes accumulate.
Thresholds and retention intervals are versioned, research-calibrated curriculum/reducer policy.

### Session and unit grading

Ordinary sessions do not pass or fail and do not award mastery directly. Their summaries report
evidence goals satisfied and open, skills strengthened, assistance patterns, activities completed,
and why the next session is recommended.

Units are `Locked`, `Available`, `In progress`, `Completed`, or `Review due`. Essential
prerequisites are strict gates. Guided progression may continue with nonessential unfinished
practice.

A learner may challenge a unit through a deterministic skill test. It uses fixed unassisted
evidence requirements for every gated skill. Passing records placement-test evidence and unlocks
dependent units; failing identifies the missing skills without punishment. Placement evidence still
participates in later spaced review.

## Staged Security and Privacy

### Local baseline

- Provider secrets live in a loopback-only local process environment, never browser code, Git,
  curriculum data, progress records, or logs.
- The local endpoint accepts only the intended app origin and uses a session token; loopback binding
  alone is not the access-control boundary.
- Provider payloads contain compact skill evidence rather than full histories or personal data and
  remain inspectable during development.
- Model output is untrusted: validate schemas, sizes, IDs, activity types, fact references, and
  budgets before use.
- User text and curriculum content cannot become system instructions.
- The model receives no filesystem, shell, database, engine-command, or arbitrary tool access.
- Local progress supports reset, export, and recovery.
- Raw coach conversations are not retained unless later evidence establishes a requirement.

### Public-web activation

Before publication, a dedicated security/privacy research card covers threat modeling, data
classification, authentication, authorization, cross-user isolation, secret management, budgets,
rate limits, billing abuse, queues/caches, prompt injection, consent, retention, export/delete,
provider policies, HTTPS, CSP, CORS, CSRF, dependency/deployment security, and incident logging.
Tests must attempt cross-learner record and plan access. This work is not pulled into the local
mechanics proof.

Public learners receive logically isolated planner and coach requests, not separate provider API
keys or direct browser-provider connections. A server-side gateway owns shared provider credentials
and capacity while enforcing per-learner/session ordering, fairness, budgets, idempotency,
cancellation, and personalized-cache isolation. Provider rate limits remain shared infrastructure
that the gateway must measure and manage.

## Research Gates

These are consumer-triggered Kanban dependencies using the existing research/design cycle and Tool
& Runtime Admission Protocol. They do not create a new universal process gate.

### Initial learning-product and activity research

Before finalizing the three activity factories, study publicly observable behavior, official
research, engineering publications, and public/open-source tooling from Duolingo, Brilliant, and
relevant learning products. Cover session structure, scaffolding, hints, skill tests, review,
mistakes, pacing, activity variation, accessibility, retrieval practice, spacing, interleaving,
worked examples, cognitive load, feedback timing, mastery learning, and adaptive assessment.

The output is a cited evidence matrix, labeled observations versus published claims versus our
inferences, adopted/rejected patterns, an initial activity taxonomy, and testable requirements. It
does not assume access to proprietary code or copy proprietary content.

### Browser persistence admission

Before the first durable attempt write, compare relevant browser stores and wrappers on quotas,
eviction, transactions, corruption recovery, schema migration, export/delete, testing, anonymous
identity, privacy, and future account linking. Produce all six Admission Protocol fields, the chosen
adapter contract, rejected alternatives, and migration/recovery evidence.

### Local AI adapter admission

Before a real provider is connected, benchmark structured-output reliability, grounding to catalog
IDs, hallucination/prompt-injection resistance, latency, token usage, caching, cancellation,
streaming where relevant, rate limits, cost, privacy/retention, and model routing. Produce a
provider-neutral evaluation harness, fixture results, the six admission fields, prompt/output
contracts, fallback thresholds, and exit conditions.

### Wider curriculum-data research

After the mechanics proof, research the complete skill graph, prerequisites, misconceptions,
examples, evidence policies, sources, ruleset dependencies, and fields consumed by the proven
factories/planner. Rules and strategy claims require rules-researcher verification. The output is a
source map and validated version-controlled catalog, not unstructured generated lessons.

### Public hosting and scale research

Activated only after local evidence exists. Research identity, hosted progress, the AI gateway,
concurrency, fairness, queues, caching, budgets, privacy/consent, sync conflicts, observability,
provider limits, and security. Capacity models use measured calls, tokens, latency, fallbacks, and
learning outcomes from the local proof rather than hypothetical traffic.

## Failure and Recovery

- AI timeout, outage, budget exhaustion, invalid schema, unknown IDs, or rejected content uses the
  deterministic fallback and records the reason without penalizing the learner.
- Stale planner results are ignored; duplicate idempotent requests are reused safely.
- Coach failure exposes canonical help immediately.
- An unavailable local AI process disables personalized planning/coaching while deterministic
  sessions continue.
- Catalog validation errors disable affected units with clear diagnostics; invalid facts are never
  sent to the tutor.
- Engine/profile incompatibility stops the affected activity or unit; AI cannot override it.
- A factory-generation failure selects another permitted factory or fallback before an attempt
  exists.
- A grading failure preserves diagnostic context but emits no mastery evidence.
- A failed progress write keeps the session in memory, clearly marks progress unsaved, and retries
  idempotently. The UI never claims an unconfirmed save.
- Attempts commit individually so stopping, closing, or refreshing does not make the whole session
  one fragile transaction.
- Unknown newer record versions are preserved instead of silently reset. Corrupt records offer
  backup/export and controlled recovery.

## Verification and Evaluation

### Deterministic automated tests

- Catalog IDs, prerequisites, provenance, authority references, mastery policies, and factory
  compatibility.
- Reducer state transitions and invariants, including that AI cannot alter mastery and one mistake
  cannot create a stable weakness.
- Factory determinism by seed, valid answers, canonical help, evidence, and accessibility metadata.
- Common `SessionPlan` contract compliance for deterministic and AI adapters.
- Progress identity, reload persistence, atomic attempts, migrations, corruption, export/reset, and
  recovery through a reusable adapter contract suite.
- Controller-owned time, activity, and model-call limits.

### Integration and browser tests

Model stubs cover valid fast output, slow prefetch, timeout/fallback, invalid schemas/IDs, duplicate
and stale responses, coach failure, persistence failure, and reload recovery. Both representative
units run through the real Rust/WASM engine. The completed fixed lesson path remains covered until
convergence is verified.

### Live-model research evaluation

Live providers are explicit evaluation runs, not nondeterministic CI dependencies. A fixed fixture
set records schema-valid plan rate, unsupported-claim rejection, grounding, latency/token/cost
distributions, cache/fallback behavior, coach helpfulness and hint quality through a human rubric,
and adversarial content-separation behavior.

### Feature closure

The slice closes only after existing engine/learning tests remain green and scoped feature QA is
recorded in `journal/qa/ledger.md`. The playtest includes learning, Player Experience, and relevant
security/adversarial checks under the existing QA process.

## Staged Convergence and Exit Conditions

1. Headless tests prove production contracts with tiny curriculum and learner fixtures.
2. A two-unit adaptive overlay exercises those contracts through the real UI while the fixed path
   remains the comparison control and fallback.
3. When the slice passes its exit evidence, the ordinary lesson UI is moved to consume
   `SessionPlan`; existing fixed `steps[]` content is exposed through the deterministic planner.
4. The old direct execution path is removed only after behavioral parity, automated verification,
   and scoped QA.
5. The deterministic planner remains permanently for offline, outage, invalid-output, and budget
   fallback.
6. Wider curriculum research and activity expansion use the proven contracts.

Temporary adapters must name the condition under which they are removed. No parallel path remains
merely because convergence was inconvenient.

## Kanban and Phase Integration

The project stays in `v2-learning-foundations`, with a temporary adaptive-learning mechanics
sub-phase before Strategy Table Fundamentals resumes. Board reconciliation occurs after this written
spec is approved:

1. Remove the duplicate Ready copy of completed `STF-04`.
2. Preserve completed `STF-01` and `STF-04` evidence.
3. Put `STF-02`, `STF-03`, and `STF-05` behind the adaptive-mechanics outcome.
4. Resolve `STF-02`/`STF-03` ordering against the shared contracts; likely the engine grading
   boundary precedes the final lesson content/state surface, or both independently consume the
   shared architecture.
5. Keep wider curriculum and public-scale work out of the active board until their triggers fire.

The first reconciliation creates only the umbrella-close and three current-phase research cards;
the research cards enter Ready and are pulled one at a time under the board's write-WIP policy:

1. `AL-01` — close the approved umbrella architecture and board reconciliation;
2. `AL-R1` — research learning products and initial activity mechanics;
3. `AL-R2` — research/admit browser-local progress storage; and
4. `AL-R3` — research/admit the local AI planner/coach boundary.

Later mechanics, AI-adapter, activity-overlay, convergence, and QA cards are added when their
upstream evidence makes their exact outcomes and gates current work. Their detailed task steps live
in their own plans, not in this umbrella spec or in future board cards.

Only the root/orchestrating agent edits the marked Kanban. Research cards that produce tracked
artifacts are write-mode work and obey the board's single-writer WIP policy.

After written-spec approval, the immediate planning transition produces the small operational
reconciliation checklist and the first research plan, not a feature-coding mega-plan. Later
implementation plans are written only after their named research and contract dependencies close.

## Design Outcome

The product gains a constrained adaptive-learning architecture without betting the curriculum,
learner record, or gameplay truth on an LLM. The local proof measures whether personalization and a
mostly on-demand coach improve the experience. It preserves a deterministic, fully usable learning
path, creates concrete consumers for later research and stack decisions, and postpones public-scale
infrastructure until real usage evidence exists.
