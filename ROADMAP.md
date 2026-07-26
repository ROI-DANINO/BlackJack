# Roadmap

> Destination, layers, phases, exit criteria.
>
> Two axes, deliberately separate. **Layers** are the architecture — what the software is made of.
> They mature independently and never end. **Phases** are the delivery sequence — what gets built
> when. A phase names which layers it advances. `journal/ops/phase.md` binds to the numbered
> phase list via `roadmap_step:`.
>
> QA gates: every feature ships with a scoped feature QA; every phase closes with a milestone QA
> pack run before the next opens (`docs/specs/qa-playtest-process.md`).

## Destination

An approachable blackjack training game with accurate shoe simulation, Free Play, Basic Strategy
mastery, card counting practice, and later casino-like cognitive load.

The product is a training app with gameplay, not a gambling app and not an academic simulator.
Free Play deals from the real shoe; learning layers may add hints, feedback, and reports around
the hand, but they never rig card flow for lessons.

Delivery is web-first. Mobile is a later surface, activated only after the web learning experience
proves useful and a mobile runtime passes the Tool & Runtime Admission Protocol.

## The three layers

These are the same three tracks this roadmap has always carried, named for what they are. They are
the durable architecture; they do not sequence work and they do not end.

### L1 — Core engines (blackjack truth)

Ordered-shoe simulation, rules, settlement, replayable logs, ruleset-matched strategy, later
counting truth and table/machine variants.

**State: mature and proven.** Rust core with deterministic seeded shoes, traceable card origins,
verified H17/S17 strategy profiles, and a single JSON command crossing the WASM boundary that the
CLI and the browser share by construction. ~100 Rust tests, golden fixtures guarding the wire
contract from the TypeScript side.

**Known gaps.** The strategy oracle exists and is exhaustively chart-tested but is **not a
`CoreCommand`** — the browser cannot ask what the correct play is. Surrender is not modelled at
all; insurance is auto-decline only. No test runs on the wasm32 target, so native↔WASM parity is
guarded by a freshness script rather than proven. That script does not watch `Cargo.lock` or
`build-wasm.sh`; the gap has ridden past two slices.

**Evidence posture.** No research phase bears on this layer, and none needs to. Its authority is
code, tests, and `docs/specs/research-brief.md`. A task claiming research backing for an L1
decision is citing something that does not exist.

### L2 — Learning material (curriculum, activities, mastery)

Typed curriculum, deterministic lesson flow, engine-owned grading, feedback, practice, evidence,
mastery, and later counting instruction.

**State: deeply researched, shallowly built.** Nine mechanics units ship as authored data with a
referential-integrity validator and a content-agnostic renderer. Underneath them, the mastery model
is one line — every required check answered correctly once, ever — and `validate.ts` restricts
required checks to multiple-choice questions, so **a played hand can never satisfy completion**.
Completion gates nothing. A full durable-progress schema exists with an IndexedDB adapter, passes
28/28 contract gates in two browsers, and **has no product consumer**.

**The disqualifying constraint.** The project's own evidence bridge rules that a mastery model
which cannot ingest played-hand evidence is disqualified, and that the measure is play, not quiz
scores. The shipped model is structurally incapable of both.

**Evidence posture.** Roughly 90 of the 96 Phase 1 findings, all 20 Phase 3 findings, and all 41
activity requirements bear on this layer. Index:
`docs/superpowers/research/evidence-index/`. What may be asserted, what is product judgement, and
what is an untested assumption is settled in `P2-verdict-catalog.md` §Bottom line.

### L3 — Visual system (product experience)

Coherent navigation, onboarding, game feel, accessible feedback, responsive presentation, and later
mobile delivery.

**State: does not exist.** There is no CSS anywhere in `web/`. Navigation is a two-value `useState`
with two buttons — no router, no deep links, no history. The interface is unstyled semantic HTML
and reads as a debug harness (`QA-014`, open).

**Evidence posture.** Three Phase 1 findings touch this layer, all indirectly. Decisions here are
**product judgement by default** — which is fine, provided they are labelled that way rather than
dressed as evidence-backed. The one hard external constraint is accessibility, and a target WCAG
conformance level must be stated before the requirement set is treated as one baseline: the
reduced-motion element rests on SC 2.3.3, **Level AAA**, while the rest of the set is A or AA.

## Delivery map

Numbered phases. `journal/ops/phase.md` binds here via `roadmap_step:`, and every kanban milestone
node's `Roadmap:` must equal the active number.

1. [x] **Simulation foundations** — the L1 engine, Free Play, and an honest ordered shoe.
2. [x] **Learning mechanics prototype** — nine Blackjack Foundations units, verified strategy profiles, and the durable-progress port. Built before it was designed; treated as a prototype, not a constraint.
3. [x] **Research foundation** — evidence collection, a per-claim audit of the project's own learning claims, and the subject-matter top-up. Made the foundation trustworthy enough to design from; built no product.
4. [ ] **Learning design blueprint** (current) — the curriculum, skill graph, activity taxonomy, evidence and mastery rules, session shape, motivation economy, and interaction UX. Designs L2; builds nothing.
5. [ ] **Vertical slice and learning proof** — build the L2 foundation and wire it into the surface that already exists, so real attempts produce real data and the playtest questions can be answered.
6. [ ] **Visual system and first playable** — build L3 on a learning design that has been tested on a human; a coherent shell containing a first playable game with beginner learning material.
7. [ ] **Expansion** — the full curriculum and activity catalog; strategy, table reading, and the counting on-ramp scaled to learner level.

## Phase 4 — Learning design blueprint (current)

**Exit criteria.** The owner approves a blueprint that says what is taught, in what order, through
which activities, measured by what evidence — and approves the slice to build in Phase 5.

**Deliverables.** Nine, one of them done.

| # | Deliverable | State |
|---|---|---|
| 1 | Skill graph and prerequisites | open |
| 2 | Learning outcomes, including probability, EV and variance | open |
| 3 | Activity taxonomy | open |
| 4 | Which activity measures which capability | open |
| 5 | Per-activity evidence and mastery rules | open |
| 6 | Session composition | open |
| 7 | Interaction UX | open |
| 8 | The first vertical slice, designed | **done** — `docs/superpowers/specs/2026-07-23-graded-decision-practice-design.md`, approved 2026-07-25 |
| 9 | Motivation and economy | premise captured, undesigned — `docs/superpowers/specs/2026-07-26-chips-xp-and-progression-economy.md`, open questions `E-1`–`E-7` |

**A tenth, added 2026-07-26: the activity-pattern catalog.** Every exercise format in every
document this project holds is a dealt hand or a multiple-choice question. A sweep of the whole
corpus for interactive, manipulable, or game-like formats returns essentially nothing. This is not
a new idea —
`docs/imports/v2-research-2026-07-11/research/v2-research-03-course-and-source-audit.md:115` names a
competitor exercise-pattern catalog as a recommended research artifact, and it was never produced.
The product's stated intent is Duolingo- and Brilliant-style learning games, not only blackjack
hands, and nothing in the corpus supports that intent today.

**Binding inputs.** `docs/superpowers/specs/2026-07-22-product-design-inputs.md` is what Phase 4 may
assume. Its §0 states what may not be leaned on. Every numeric threshold, interval, and duration
this phase picks is a product judgement until calibrated on this product's own data — the phrase
"research-calibrated" is not available.

**Order.** Outcomes and skill graph, then the activity taxonomy including the pattern catalog, then
evidence and mastery rules, then the economy, then session composition and interaction UX. The
economy sits after evidence deliberately: its load-bearing open question — whether a won hand
returns chips — is an evidence-and-mastery question wearing an economy costume, and cannot be
answered before what counts as learning evidence is decided.

## Phase 5 — Vertical slice and learning proof

**Exit criteria.** Real-player learning-integrity playtests pass. The owner is currently the only
user and runs them himself.

**Scope.** Build the L2 foundation the blueprint specifies and wire it into the **existing**
unstyled web surface. This phase does not build L3. It ends with something a person can sit down
and use, ugly and complete, producing durable attempts.

It wires both orphans: the strategy oracle gets a `CoreCommand` so the browser can ask what is
correct, and `ProgressStore` gets its first product consumer.

**Why playable rather than infrastructure-only.** Five questions are settled as unanswerable from
literature and routed to playtest — whether decision/outcome separation can be trained, whether EV
instruction changes play, whether mixed practice helps this audience or overwhelms beginners,
whether a cheap false heuristic beats correct strategy for novices, and whether confidence rises
faster than skill (`P-1`…`P-5`). None can be answered without a player, and no threshold this
product uses can be calibrated without the data a player produces.

The graded-decision-practice slice is the designed candidate; its 11-task plan is
`docs/superpowers/plans/2026-07-23-graded-decision-practice.md`. It carries the overdue L1
freshness-guard fix as a passenger.

## Phase 6 — Visual system and first playable

**Exit criteria.** A coherent app shell containing a first playable game that teaches someone who
has never heard of blackjack: what it is, the basic rules, what actions exist, how you win, and why
strategy matters.

**Scope.** L3 from nothing — navigation and routing, onboarding, game feel, progression and mastery
presentation, accessible feedback, responsive layout. State a target WCAG conformance level first.

This phase builds on a learning design that Phase 5 has tested on a human. Building the visual
system before that test would style an untested pedagogy.

## Phase 7 — Expansion

The full curriculum and activity catalog; basic strategy, table reading, and the counting on-ramp,
each scaled to learner level. Each major topic gets its own research, spec, and implementation plan
when it becomes active.

## Historical milestone record

The V1/V2/V3 milestone names are retained so completed scope, QA evidence, and commit references
keep their original identifiers. They map onto the numbered phases above: **V1** is phase 1;
**V2 — Learning Foundations** spans phases 2 through 5; **V3 — UX and Game Experience** is phase 6.
The V-names were also being read as layers, which is what made the two axes collide; the layer
question is now answered by L1/L2/L3 above.

### V1 — Simulation Foundations
- [x] Free Play skeleton — exit criteria MET (2026-07-09): one player plays complete rounds vs a dealer from a seeded 6-deck shoe with cut card / penetration, legal actions, outcomes, logs, and shoe continuity. Playable in-browser via WASM with JSONL history and per-hand notes.
- [x] V1 milestone QA — exit criteria MET (2026-07-10): full milestone QA plus targeted remediation re-test; all six V1-gating findings verified, product verdict GO in `journal/qa/ledger.md`.

Scope: web app foundation with mobile-responsive thinking; one active player vs dealer in the UI
with the engine table-shaped for more seats later; real shoe creation from multiple decks with
stable card/deck IDs, seeded shuffle, cut card / penetration, and round/session logs; a configured
modern-classic ruleset with no rules scattered through UI code.

### V2 — Learning Foundations
- [ ] Exit criteria: a new player can learn the current table's legal actions, navigate the matching Basic Strategy table, and use it in guided practice with feedback that keeps decision quality separate from hand outcome.

Two ordered, replayable subjects were planned:
- [x] **Blackjack Foundations** — nine units teaching hit/stand, then double and split, through short guided simulations. Shipped 2026-07-11; treated since as a prototype placeholder, not a constraint on the Phase 4 design.
- [ ] **Strategy Table Fundamentals** — hand classification and table navigation, then table-open guided practice and checkpoints. **Intentionally paused**; it resumes against the contracts Phase 4 designs and Phase 5 builds.

The shared **Strategy Profile Foundation** is complete: H17/S17 strategy truth is verified and
lessons gate against the active ruleset (`5bbc0b4`). Durable progress reached cycle 1 — the
provider-neutral port, versioned envelope, and contract suite shipped and passed feature QA
(`4a197b6`) — and has had no product consumer since.

### V3 — UX and Game Experience
- [ ] Exit criteria: mobile-friendly table UI, onboarding, progression, and session feedback feel like a game rather than a simulator.

## Need-activated platform capabilities

| Capability | Activation trigger | Guardrail / current status |
|---|---|---|
| Local durable progress | The first requirement that completion survive reload. | **Triggered.** `idb` 8.0.3 is admitted conditionally behind the approved pseudonymous local learner key and the `ProgressStore` seam; the cycle-1 foundation shipped and passed feature QA. Two conditions remain: the production bundle-delta measurement the admission was conditional on, and a first product consumer — Phase 5 supplies both. |
| Accounts and cross-device sync | Learners need progress on more than one device. | Ordinary training stays client-authoritative; research identity, storage, migration, offline, and conflict semantics before selecting a provider. Backend runtime runs the Admission Protocol. See `journal/decisions.md` 2026-07-16. |
| Product observability | External beta creates concrete learning or drop-off questions. | Research event purpose, consent/privacy, retention, batching, and offline failure before adding telemetry. |
| Independently published curriculum | Content must ship without an application release. | Research integrity, schema compatibility, rollback, and provenance before remote payloads or admin tooling. |
| Mobile runtime | Mobile becomes an active slice after the web path is proven. | Admission spike for WASM packaging, lifecycle suspension/restore, offline behaviour, and update delivery; no framework selected. |
| Competitive / certified authority | Leaderboards, multiplayer, or certified mastery require anti-cheat guarantees. | **Load-bearing for the economy design.** The engine is client-authoritative and the browser can see the entire undealt shoe in every response, so a leaderboard on this architecture is forgeable. `CLOUD-06` defers leaderboards pending anti-cheat authority; a real one implies server authority, which is an architecture change rather than a feature. |

## Non-goals, and one that changed

Not in scope now: full Basic Strategy memorization, no-table and timed assessments, card counting
instruction, accounts and backend, generic course-platform abstractions, CSM/ASM simulation, and
real-money or chips-first gameplay.

**Changed 2026-07-26: rank and XP systems are no longer a non-goal.** They were listed as one, and
an XP-and-chips economy has since been adopted as an owner premise for Phase 4 — chips earned by
completing lessons, spent only in Free Play, never purchased, affecting nothing but realism. The
prohibition that stands is the one in `docs/specs/product-vision.md:27`: the product is not centred
on chips, bankroll, or casino fantasy. The captured model is compatible with it. See
`docs/superpowers/specs/2026-07-26-chips-xp-and-progression-economy.md`.

## Later

Running count mastery · true count · multi-seat tables · simulated players · casino pace · bet and
unit sizing · count deviations · advanced counting systems · table-rule literacy and ruleset-matched
strategy deltas · CSM/ASM and machine-buffer table variants · leaderboards · daily challenges ·
shared daily shoe.

Each major topic gets its own research, spec, and implementation plan when it becomes active.
