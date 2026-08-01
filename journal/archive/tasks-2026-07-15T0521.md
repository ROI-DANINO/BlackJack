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

## Complete — Strategy Profile Foundation ✅ (merged to main `5bbc0b4`)

Implementation plan: `docs/superpowers/plans/2026-07-15-strategy-profile-foundation.md`.

- [x] **Task 1: Verify and freeze the complete S17 source table** — provenance and independent
      cross-check recorded before encoding.
- [x] **Tasks 2-3: Core profiles and verified chart lookup** — canonical H17/S17 rulesets,
      full-struct resolution, and exhaustive source-cell coverage.
- [x] **Tasks 4-5: Authoritative compatibility wire contract** — Rust verdict, golden fixtures,
      TypeScript validation, and contract tests.
- [x] **Task 6: Lesson lifecycle gate** — declared-profile compatibility enforcement with
      profile-less regression coverage.
- [x] **Task 7: Scoped feature QA and ledger reconciliation** — 80 Rust tests, 217 web tests, and
      the full QA pack passed.

## In progress — Strategy Table Fundamentals design

- [ ] Choose the first learner-visible objective and sequence: hand classification, row/column table
      navigation, then table-open application without starting memorization-first.
- [ ] Define the smallest content/state surface the lesson needs, including how the verified profile
      and addressable strategy-table data are presented without moving strategy truth into TypeScript.
- [ ] Define the smallest engine-owned grading API and its Rust/TypeScript contract; retain the
      profile compatibility gate and verdict-versus-hand-outcome separation. Its implementation plan
      must also close the overdue boundary hardening: watch `Cargo.lock`/`build-wasm.sh` for stale
      artifacts and prove native↔built-WASM parity over deterministic vectors.
- [ ] Reconcile the Blackjack Foundations "try Hit to feel bust risk" moment with the later strategy
      recommendation so the product does not teach it as Basic Strategy advice.
- [ ] Write the feature design with its scoped learning/Player Experience QA boundary before an
      implementation plan is created.
