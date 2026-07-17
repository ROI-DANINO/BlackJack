<!-- agent-kanban:v1 -->
# Tasks — Agent Kanban

**Board policy**

- Authority: only the root/orchestrating agent writes this file; delegated agents return structured
  status and evidence.
- Structure: lanes are `Ready`, `Active`, `Verification`, `Blocked`, `Done` in that order; lane
  placement is status, and top-to-bottom order is priority.
- Cards: IDs are unique. Every card requires `Type`, `Mode`, `Owner`, `Depends on`, `Source`,
  `Outcome`, `Next`, `Load`, `Workspace`, `Done when`, `Gate`, `Evidence`, and `Updated`.
- Values: `Type` is one of `research`, `design`, `plan`, `build`, `fix`, `review`, `qa`, `docs`,
  `chore`; `Mode` is `read` or `write`. Dependencies must exist, differ from the card, and be
  acyclic. Referenced `Source` and `Load` paths must resolve.
- WIP: cards in `Active`, `Verification`, and `Blocked` are started. At most three cards may be
  started, and at most one started card may have `Mode: write`, unless every excess card records an
  explicit exception and reason.
- Movement: `Ready -> Active` requires dependencies in Done, assigned ownership, clear `Outcome`
  and `Done when`, and WIP capacity. `Active -> Verification` requires the produced outcome and
  initial evidence. `Verification -> Done` requires demonstrable `Done when` satisfaction, the
  named gate passing, and compact evidence for both; a passed gate alone is insufficient.
  `Verification -> Active` is in-scope remediation. Any started card may move to `Blocked`; it may
  return to `Active` or `Verification` when unblocked and WIP permits. Finished cards are not
  reopened; a later defect becomes a linked `fix` card.
- Blocking: a Blocked card additionally requires exact `Blocked by` and `Unblock when` fields.

## Ready

### AL-B1 — Build the cycle-1 ProgressStore foundation
- Type: build
- Mode: write
- Owner: orchestrator
- Depends on: AL-D1
- Source: `docs/superpowers/specs/2026-07-17-progressstore-cycle1-design.md`
- Outcome: The provider-neutral `ProgressStore` port, the versioned envelope and attempt record, an `idb` adapter, and a host-neutral 14-gate contract suite exist — passing against a fake (12/14, with declared non-capabilities) and against real browsers (14/14) — with the `idb` bundle delta and the serialized envelope bytes measured rather than assumed.
- Next: Execute Task 1 of `docs/superpowers/plans/2026-07-17-progressstore-cycle1.md` — records, fixtures, and the phantom rule as a test.
- Load: `docs/superpowers/specs/2026-07-17-progressstore-cycle1-design.md`, `docs/superpowers/plans/2026-07-17-progressstore-cycle1.md`, `web/src/learn/types.ts`, `web/src/bridge/log/sink.ts`, `web/qa/lib/`
- Workspace: repository root
- Done when: All 11 plan tasks land in order; the 14 gates pass under `qa:progress` in Chromium and Firefox; the bundle delta is measured against the >5 KB gzipped threshold and the result recorded either way (a failure reverts to native IndexedDB, which the adapter boundary must survive); serialized envelope bytes are measured at the 20 / 1,000 / 10,000 tiers; scoped feature QA passes and `journal/qa/ledger.md` records durable progress as a newly deep-tested area; and the existing Rust and web suites stay green. Cycle-1 boundary holds throughout — no `LessonController` change, no UI consumer, no learner data written.
- Gate: feature-qa
- Evidence: Pending. Design + plan approved by the user on 2026-07-17.
- Updated: 2026-07-17

## Active

## Verification

## Blocked

## Done

### AL-D1 — Design the cycle-1 ProgressStore foundation (port, envelope, contract suite)
- Type: design
- Mode: write
- Owner: orchestrator
- Depends on: AL-R2
- Source: `docs/superpowers/specs/2026-07-16-adaptive-ai-learning-architecture-design.md`
- Outcome: A user-approved design and executable TDD plan define the provider-neutral `ProgressStore` port, the versioned learner envelope and attempt record, and a provider-neutral contract suite — proven headless against fixtures. No UI consumer, and no learner data written.
- Next: AL-B1 — execute Task 1 of the approved TDD plan.
- Load: `docs/superpowers/specs/2026-07-16-adaptive-ai-learning-architecture-design.md`, `docs/superpowers/specs/2026-07-16-adaptive-learning-browser-storage-research.md`, `docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md`, `docs/specs/learning-mastery-and-scoring.md`, `docs/specs/research-brief.md`, `docs/architecture.md`, `web/src/learn/`, `web/src/bridge/log/sink.ts`
- Workspace: repository root
- Done when: The design (a) gives signatures for the six pinned port operations — load, append attempt, commit session summary, export, reset, explicit migration/recovery; (b) defines the versioned envelope and attempt record carrying the owned-spec field set, including per-skill/cell evidence keys, an attempt-kind discriminator, evidence mode, assistance level, table visibility, strategy-profile version, and session attribution; (c) decides the physical store layout and separates it from the export/wire envelope; (d) answers all seven `research-brief.md:20` obligations (identity is discharged by the 2026-07-17 ADR; record ownership, storage semantics, boundary, schema versioning, migration, and recovery remain); (e) originates the storage-failure policy the research explicitly does not cover — quota, denied/private-mode IndexedDB, corruption, multi-tab — plus a retention bound; (f) plans the conditional `idb` bundle-delta check with a pre-agreed "material" threshold; (g) re-derives the 14 storage gates against the real contract without importing the extracted harness; and (h) ships an executable TDD plan with scoped feature QA, approved by the user.
- Gate: user-approval
- Evidence: 2026-07-17 seven-cluster research sweep (AL-R1, AL-R2, adaptive design, foundation ADR + architecture + decisions, V2 research imports, course bundle + history data, mastery/scoring + future guidance) established the cycle-1 re-scope; user approved the scope and the folded repairs on 2026-07-17. Repairs landed: identity ADR recorded, conditional bundle-check obligation propagated to `journal/decisions.md` / `ROADMAP.md` / `docs/specs/stack-boundaries.md`, identity wording corrected in three docs, two dropped learning-integrity QA gates restored to `docs/specs/qa-playtest-process.md`, and the stale `.worktrees/al-r2-browser-storage` pointer fixed. Owned spec `docs/superpowers/specs/2026-07-17-progressstore-cycle1-design.md` (1021 lines) and TDD plan `docs/superpowers/plans/2026-07-17-progressstore-cycle1.md` (11 tasks) written and user-approved on 2026-07-17, including all four design rulings (bundle threshold >5 KB gzipped; cellId field fixed / grammar deferred to curriculum; authored prose dropped; `appendAttempt` drops `expectedRevision` as a recorded deviation from AL-R2's floor). Gate satisfied: user-approval. Prior: storage decision package `b8c0d2f`; user redirected from benchmark timing toward a production artifact on 2026-07-16.
- Updated: 2026-07-17

### AL-R2 — Research and admit browser-local learner progress storage
- Type: research
- Mode: write
- Owner: orchestrator
- Depends on: AL-01
- Source: `docs/superpowers/specs/2026-07-16-adaptive-ai-learning-architecture-design.md`
- Outcome: A focused evidence report and Tool & Runtime Admission record select the smallest durable browser-local ProgressStore implementation for the local-first proof.
- Next: AL-D1 — design the first real product slice through the admitted `idb`-backed `ProgressStore` boundary.
- Load: `docs/superpowers/specs/2026-07-16-adaptive-ai-learning-architecture-design.md`, `docs/specs/stack-boundaries.md`, `docs/architecture.md`, `docs/specs/research-brief.md`
- Workspace: `.worktrees/al-r2-browser-storage`
- Done when: Storage alternatives are compared against the active consumer, serialization and schema migration are explicit, determinism and failure behavior are tested, and the recommendation passes user approval.
- Gate: user-approval
- Evidence: Research plan `04a16b3`; user approved execution and parallel read-only evidence lanes on 2026-07-16; clean baseline Rust 80/80 and web 217/217; source/suitability record `cc6678c`; red harness `2acc6eb`; full candidates `ebc0d8d`; migration/recovery evidence `9de383a`; decision package `b8c0d2f`; raw 15-row/210-cell evidence with native IndexedDB, `idb`, and Dexie each passing 42/42 across Chromium, Firefox, and WebKit; incomplete performance timing retained as an explicit non-blocking coverage gap. User approved recommended `idb` 8.0.3 and its downstream constraints on 2026-07-16.
- Updated: 2026-07-16T08:40:27+03:00

### AL-R1 — Research learning products and initial activity mechanics
- Type: research
- Mode: write
- Owner: orchestrator
- Depends on: AL-01
- Source: `docs/superpowers/plans/2026-07-16-adaptive-learning-product-activity-research.md`
- Outcome: A cited, decision-ready evidence report defines requirements for the first three activity contracts without copying proprietary content or choosing unrelated infrastructure.
- Next: AL-R2 — write the independent browser-local learner progress storage research plan.
- Load: `docs/superpowers/specs/2026-07-16-adaptive-ai-learning-architecture-design.md`, `docs/superpowers/plans/2026-07-16-adaptive-learning-product-activity-research.md`, `docs/specs/product-vision.md`, `docs/specs/learning-mastery-and-scoring.md`, `docs/specs/research-brief.md`
- Workspace: repository root
- Done when: The reviewed report distinguishes evidence from inference, produces traceable `ALR-*` requirements for multiple choice, assemble blocks, and engine-backed hands, records coverage gaps, and passes user approval.
- Gate: user-approval
- Evidence: Research record `e4d73d7`; source register `2ebb792`; product comparison `e1f8b02`; learning-science synthesis `dd97d90`; technical audit `2ccfb34`; initial requirements `108d31f`; adversarial review `58acefb`. The report registers 24 sources, 12 product-pattern rows, 10 learning-science rows, 8 technical-boundary rows, 41 sequential `ALR-*` requirements, 15 dispositions, and 6 approval recommendations. Source/requirement reference integrity, scope and placeholder scans, and `git diff --check` passed before the review commit. User approved the dispositions, gaps, and bounded recommendations on 2026-07-16.
- Updated: 2026-07-16T05:27:07+03:00

### AL-01 — Approve the adaptive-learning umbrella and reconcile current work
- Type: design
- Mode: write
- Owner: orchestrator
- Depends on: none
- Source: `docs/superpowers/specs/2026-07-16-adaptive-ai-learning-architecture-design.md`
- Outcome: The adaptive-learning architecture, plan-family boundaries, and current research sequence are approved and represented by one valid active-phase board.
- Next: AL-R1 — execute Task 1 of the approved learning-product and activity-mechanics research plan.
- Load: `docs/superpowers/specs/2026-07-16-adaptive-ai-learning-architecture-design.md`, `docs/superpowers/plans/2026-07-16-adaptive-learning-product-activity-research.md`, `journal/ops/archive/tasks-2026-07-16T0422.md`
- Workspace: repository root
- Done when: The umbrella architecture is approved, the work is split into independent research and implementation plans, the stale duplicate STF card is removed from the live board after an exact archive, and AL-R1 is the selected next card.
- Gate: user-approval
- Evidence: User approved the architecture and plan split on 2026-07-16; commits `9b59845`, `202ffdb`, and `6c1003c`; exact pre-update board archive comparison passed; docs diff/reference plus docs-map/memory integrity checks passed. A pre-existing missing private historical session pointer is documented in the close handoff. Paused STF-02/03/05 and completed STF-01/04 remain preserved in the archive.
- Updated: 2026-07-16T04:22:00+03:00
