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

## Next phase — not yet scoped

Strategy Table Fundamentals (next V2 subject) gets its task detail here once its design/brainstorm
pass lands. Until then this section stays empty of task detail (see `ROADMAP.md`).

## Ideas

- Future unit selection may test skipped prerequisites; do not add skip tests or persistence in
  this feature.
- Revisit the Hit-on-16 orientation moment when Strategy Table Fundamentals begins.
- Strategy Table Fundamentals remains the next subject after Blackjack Basics feature QA passes.
