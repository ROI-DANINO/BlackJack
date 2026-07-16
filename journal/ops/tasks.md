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

### AL-R3 — Research and admit the local AI planner and coach boundary
- Type: research
- Mode: write
- Owner: unclaimed
- Depends on: AL-01
- Source: `docs/superpowers/specs/2026-07-16-adaptive-ai-learning-architecture-design.md`
- Outcome: A focused evidence report and Tool & Runtime Admission record define the provider-neutral local AI adapter, bounded latency/token policy, validation boundary, and deterministic fallback.
- Next: Write the independent AI-adapter research plan and define provider/API comparisons, structured-output validation, privacy/security baseline, latency budget, and exit condition.
- Load: `docs/superpowers/specs/2026-07-16-adaptive-ai-learning-architecture-design.md`, `docs/specs/stack-boundaries.md`, `docs/architecture.md`, `docs/specs/research-brief.md`
- Workspace: repository root
- Done when: The report supports a reversible adapter decision with hard authority, cost, latency, validation, fallback, and local-secret boundaries, and the recommendation passes user approval.
- Gate: user-approval
- Evidence: pending
- Updated: 2026-07-16T04:22:00+03:00

## Active

### AL-R2 — Research and admit browser-local learner progress storage
- Type: research
- Mode: write
- Owner: orchestrator
- Depends on: AL-01
- Source: `docs/superpowers/specs/2026-07-16-adaptive-ai-learning-architecture-design.md`
- Outcome: A focused evidence report and Tool & Runtime Admission record select the smallest durable browser-local ProgressStore implementation for the local-first proof.
- Next: Execute Task 4 of `docs/superpowers/plans/2026-07-16-adaptive-learning-browser-storage-research.md` and implement the two baselines plus three equal first-class candidates.
- Load: `docs/superpowers/specs/2026-07-16-adaptive-ai-learning-architecture-design.md`, `docs/specs/stack-boundaries.md`, `docs/architecture.md`, `docs/specs/research-brief.md`
- Workspace: `.worktrees/al-r2-browser-storage`
- Done when: Storage alternatives are compared against the active consumer, serialization and schema migration are explicit, determinism and failure behavior are tested, and the recommendation passes user approval.
- Gate: user-approval
- Evidence: Research plan `04a16b3`; user approved execution and parallel read-only evidence lanes on 2026-07-16; plan command correction `b28e40b`; clean baseline is Rust 80/80 and web 217/217; research record `a7e88f5` with 22 required headings; source register and seven-candidate suitability screen `cc6678c`, with native IndexedDB, `idb`, and Dexie advancing to equal benchmarks while OPFS and Cache Storage are rejected before benchmark; typed contract and three-engine red harness `2acc6eb`, verified as exactly 15 rows and 210 intended failures in the pinned Playwright container after a passing independent harness review.
- Updated: 2026-07-16T07:00:00+03:00

## Verification

## Blocked

## Done

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
