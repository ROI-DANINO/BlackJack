# Tasks - Current Phase Only

> Only the current phase gets detailed tasks. Future work lives in `ROADMAP.md`.

## Complete — V2 Blackjack Basics learning foundation ✅ (merged to main 964efa1, pushed)

- [x] **Design the V2 learning foundation** - approved nine short complete-beginner units,
      mechanics-first presentation, reusable contracts, and the engine/curriculum boundary.
- [x] **Write the implementation plan** - 11 TDD tasks with per-task review and final feature QA.
- [x] **Task 1: Rust-owned hand facts** - `bbb5cd7`; reviewed.
- [x] **Task 2: WASM and TypeScript hand-facts contract** - `81ced34`; reviewed.
- [x] **Task 3: Typed curriculum contracts and validation** - `6c84c26` (surfaced+fixed the
      validator prereq→skill-id bug); reviewed.
- [x] **Tasks 4-5: Learning runtime mechanics** - `5b75769`, `a09835b` (engine adapter,
      deterministic controller, arranged/live hand steps, serializable situations); reviewed.
- [x] **Tasks 6-7: Blackjack Basics curriculum** - `e6c0e21`, `ab2b5e7` (nine units + end-to-end
      controller walk verifying every unit through the real engine); reviewed.
- [x] **Tasks 8-9: Functional Learn UI and prototype retirement** - `d44f56a`, `7daf35c` (thin
      Lesson/Learn renderers, ordered navigation, guided-drill fully removed, Free Play untouched);
      reviewed.
- [x] **Task 10: Learn browser QA role** - `e9ddc57`/`8952828` (`qa:learn` replaces `qa:drill`;
      9/9 units, 0 violations); reviewed.
- [x] **Task 11: Feature QA and ledger reconciliation** - `7bfbd7e` (all deterministic gates,
      Player Experience PASS, ledger reconciled); final whole-branch review merge-clean.

## In progress — Strategy Profile Foundation

Implementation plan: `docs/superpowers/plans/2026-07-15-strategy-profile-foundation.md`.

- [ ] **Task 1: Verify and freeze S17 source table** — required research/provenance gate before code.
- [ ] **Tasks 2-3: Core profiles and verified chart lookup** — canonical S17 ruleset, full-struct resolution, exhaustive source-cell tests.
- [ ] **Tasks 4-5: Authoritative compatibility wire contract** — Rust verdict plus validated TypeScript bridge.
- [ ] **Task 6: Lesson lifecycle gate** — declared-profile compatibility gate; profile-less regression coverage.
- [ ] **Task 7: Scoped feature QA and ledger reconciliation** — gate this slice before completion.

## Ideas

- Future unit selection may test skipped prerequisites; do not add skip tests or persistence in
  this feature.
- Revisit the Hit-on-16 orientation moment when Strategy Table Fundamentals begins.
- Strategy Table Fundamentals remains the next subject after Blackjack Basics feature QA passes.
- Foundation & Tracks follow-ups (from 2026-07-12 fold, `docs/superpowers/specs/2026-07-12-foundation-and-tracks-design.md`):
  deliverable A (posture & decisions memo + reframe `stack-boundaries.md` → Tool & Runtime Admission Protocol + AGENTS.md stack-section cleanup);
  deliverable B (protocol-system + inbox-ingestion 1-pager); ROADMAP three-tracks + cloud north-star reframe.
- Cloud reserve-now seams (when persistence lands): decide the stable identity/account key BEFORE the first durable `AttemptRecord` write; define the `ProgressStore` port (in-memory impl only); add `schema_version` to progress records.
