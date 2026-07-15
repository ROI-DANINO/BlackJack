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

### STF-02 — Define the lesson content and state surface
- Type: design
- Mode: write
- Owner: unclaimed
- Depends on: STF-01
- Source: `ROADMAP.md`
- Outcome: The lesson's smallest content/state contract presents verified-profile and addressable strategy-table data without moving strategy truth into TypeScript.
- Next: Map the approved learner sequence onto the existing learning contracts and Rust strategy source.
- Load: `web/src/learn/types.ts`, `web/src/learn/content/blackjack-basics.ts`, `crates/blackjack-core/src/strategy.rs`
- Workspace: repository root
- Done when: The design names every required content/state field, its owner, and why no smaller surface works.
- Gate: code-review
- Evidence: pending
- Updated: 2026-07-15T09:29:00+03:00

### STF-03 — Define the engine-owned grading boundary
- Type: design
- Mode: write
- Owner: unclaimed
- Depends on: STF-02
- Source: `docs/specs/stack-boundaries.md`
- Outcome: A smallest Rust-owned grading API is specified with profile compatibility, verdict-versus-outcome separation, WASM freshness, and native↔built-WASM parity evidence.
- Next: Define request/response shapes and deterministic parity vectors at the Rust/TypeScript boundary.
- Load: `crates/blackjack-core/src/strategy.rs`, `web/src/bridge/types.ts`, `web/src/learn/engine.ts`, `docs/specs/stack-boundaries.md`
- Workspace: repository root
- Done when: The API contract, ownership, error cases, freshness guard, and parity proof are explicit enough to plan without inventing behavior.
- Gate: code-review
- Evidence: pending
- Updated: 2026-07-15T09:29:00+03:00

### STF-04 — Reconcile the early Hit-on-16 lesson moment
- Type: research
- Mode: read
- Owner: unclaimed
- Depends on: STF-01
- Source: `docs/specs/product-vision.md`
- Outcome: The earlier bust-risk interaction is explicitly contextualized so learners do not mistake it for Basic Strategy advice.
- Next: Compare the Blackjack Foundations wording with the later strategy recommendation and draft the smallest clarification.
- Load: `web/src/learn/content/blackjack-basics.ts`, `docs/specs/product-vision.md`, `docs/specs/research-brief.md`
- Workspace: repository root
- Done when: The design records approved wording/placement that preserves the original teaching goal without strategy contradiction.
- Gate: user-approval
- Evidence: pending
- Updated: 2026-07-15T09:29:00+03:00

### STF-05 — Write the Strategy Table Fundamentals feature design
- Type: design
- Mode: write
- Owner: unclaimed
- Depends on: STF-02, STF-03, STF-04
- Source: `docs/specs/qa-playtest-process.md`
- Outcome: One approved feature design integrates learner sequence, content/state ownership, grading boundary, wording reconciliation, and scoped learning/Player Experience QA.
- Next: Synthesize the approved card outcomes into the feature design and its QA boundary.
- Load: `journal/ops/tasks.md`, `docs/specs/product-vision.md`, `docs/specs/qa-playtest-process.md`, `docs/specs/stack-boundaries.md`
- Workspace: repository root
- Done when: The feature design is approved and is detailed enough for a separate implementation plan.
- Gate: user-approval
- Evidence: pending
- Updated: 2026-07-15T09:29:00+03:00

## Active

## Verification

## Blocked

## Done

### STF-04 — Reconcile the early Hit-on-16 lesson moment
- Type: research
- Mode: read
- Owner: orchestrator
- Depends on: STF-01
- Source: `docs/specs/product-vision.md`
- Outcome: The earlier bust-risk interaction is explicitly contextualized so learners do not mistake it for Basic Strategy advice.
- Next: Apply the approved one-string edit when the STF lesson is built (deferred write; linked from STF-05 or a small fix card).
- Load: `web/src/learn/content/blackjack-basics.ts`, `web/src/learn/situations.ts`, `docs/specs/product-vision.md`, `docs/specs/research-brief.md`
- Workspace: repository root
- Done when: The design records approved wording/placement that preserves the original teaching goal without strategy contradiction.
- Gate: user-approval
- Evidence: Finding — all three `OPENINGS.stiffHands` examples (16v6, 15v5, 16v4) are Basic-Strategy STAND hands; the Hit unit instructs "choose Hit," a direct contradiction. Path A approved by user 2026-07-15: keep dealt hands, edit one `hit-hand` intro string to disclaim strategy + forward-reference STF; 16v6 becomes a deliberate callback. Approved wording/placement recorded in `docs/superpowers/specs/2026-07-15-strategy-table-fundamentals-lesson1-design.md` (Cross-Lesson Continuity).
- Updated: 2026-07-15T10:06:50+03:00

### STF-01 — Choose the first learner-visible objective and sequence
- Type: design
- Mode: write
- Owner: orchestrator
- Depends on: none
- Source: `ROADMAP.md`
- Outcome: The first Strategy Table Fundamentals lesson has an approved mechanics-first objective and sequence from hand classification through table-open application.
- Next: STF-02/STF-03/STF-04 design against this objective; STF-05 synthesizes the feature design.
- Load: `ROADMAP.md`, `docs/specs/product-vision.md`, `docs/specs/learning-mastery-and-scoring.md`, `web/src/learn/types.ts`
- Workspace: repository root
- Done when: The learner objective, ordered steps, exclusions, and success evidence are explicitly approved.
- Gate: user-approval
- Evidence: Approved design written to `docs/superpowers/specs/2026-07-15-strategy-table-fundamentals-lesson1-design.md` (objective, 8-step sequence, adaptive checkpoint grading, exclusions, success evidence). Fable 5 two-hat review folded in; user approved 2026-07-15. Downstream deltas recorded for STF-02/03/04/05.
- Updated: 2026-07-15T10:06:50+03:00
