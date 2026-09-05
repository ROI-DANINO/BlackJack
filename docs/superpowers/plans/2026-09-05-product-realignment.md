# Product Realignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Reconcile active product documentation with the approved playful-learning direction and make the next build unambiguous.

**Architecture:** Preserve the engine, shipped content and research. Apply an explicit decision delta to the existing design authorities, label obsolete data as snapshots, and update the existing navigation and kanban rather than creating a second board.

**Tech Stack:** Markdown, existing design JSON, existing Node kanban CLI and shell drift checker. No new dependency or runtime behavior.

**Spec:** `docs/superpowers/specs/2026-09-05-playful-learning-direction.md`

## Global Constraints

- Only the current phase gets executable board tasks.
- Do not duplicate blackjack rules in React.
- Money does not buy chips.
- Historical approvals and research remain records.
- No runtime implementation, deployment or full curriculum design in this pass.

### Task 1: Record the direction and uncertainty

**Files:** `docs/specs/product-vision.md`, `AGENTS.md`, `CONTEXT.md`, `docs/superpowers/specs/2026-09-05-playful-learning-direction.md`, `docs/superpowers/specs/assumption-register.md`, `journal/decisions.md`.

**Interfaces:** consumes the approved conversation decisions; produces a product direction and named playtest assumptions for later implementers.

- [x] Replace the vision with the three experiences and three horizons in the spec.
- [x] Record the decision delta, keep engine/QA constraints, and distinguish learning Practice from Practice table.
- [x] Register A-36 (first experience), A-37 (reward motivation), A-38 (ace activity) with actual observation methods and no claims of validation.

### Task 2: Reconcile old design authorities

**Files:** the LDB-01, LDB-03, LDB-04, LDB-05, LDB-06, LDB-09, LDB-11, LDB-07 and blueprint specs; the skill-graph and activity-taxonomy JSON; the July 23 graded-decision-practice spec and plan; `docs/specs/learning-mastery-and-scoring.md`.

**Interfaces:** consumes the spec's supersession map; produces explicit source-local replacement notices and snapshot-labelled data. Existing IDs and historical mappings remain intact.

- [x] Add source-local notices naming the exact replacement decisions; preserve line numbering in heavily cross-cited historical documents by using an existing blank line near the title.
- [x] Label the two design JSON files as previous-design snapshots in their existing note fields. Do not invent a replacement graph or change historical mappings.
- [x] Retain numeric/mastery/window checks as historical-design integrity checks; do not present passing them as validation of the new product direction. Change no assertions merely to obtain a green run.

### Task 3: Reconcile navigation and current work

**Files:** `ROADMAP.md`, `README.md`, `PROGRESS.md`, `docs/architecture.md`, `journal/docs-map.md`, `journal/milestone.md`, `journal/tasks.md` (CLI only).

**Interfaces:** consumes Tasks 1–2; produces one current reading path and a board-selected next action.

- [x] Replace future roadmap scope with the three horizons while keeping completed phase history and current step 4 stable.
- [x] Update current-state prose and authority-map rows so the old blueprint/JSON/July plan cannot silently control the next build.
- [x] Update LDB-08 via `node scripts/kanban.ts update` to review the new direction and documentation reconciliation. Preserve prior evidence and do not mark prototype work complete.
- [x] Keep milestone and board pointed at the same spec and current review; do not activate a future build node.

### Task 4: Verify the documentation landing

**Files:** changed files above; read-only checks `scripts/check-doc-drift.sh`, `scripts/check-ldb03-taxonomy.js`, `scripts/kanban.ts`.

**Interfaces:** consumes the updated tree; produces concrete review evidence and an honest handoff.

- [x] Run `git diff --check` and inspect the patch, especially replacement scope and authority precedence.
- [x] Run `node scripts/kanban.ts validate journal/tasks.md journal/milestone.md` and `node scripts/kanban.ts next journal/tasks.md journal/milestone.md`; confirm the selected action no longer requests approval of the old phase-5 bundle.
- [x] Parse both JSON snapshots and run `node scripts/check-ldb03-taxonomy.js`; report this only as old-design integrity.
- [x] Run `bash scripts/check-doc-drift.sh`. Repair actual introduced drift without weakening the check. Report pre-existing or unresolved failures explicitly.
- [x] Confirm the diff touches no runtime or research archive and no pre-existing fixture deletions. Return the current direction and exact next build boundary; do not claim a human playtest or deployment.

## Execution record — 2026-09-05

Documentation reconciliation completed locally. All ten drift checks passed; all thirteen existing taxonomy integrity checks passed, validating the historical design snapshot only. Board validation and patch whitespace checks passed. Both design JSON files were compared to HEAD: only their status notes changed. Assumption IDs are unique (A-36 through A-38 are new). Runtime code, scripts and research archives were unchanged; pre-existing missing fixture symlinks are excluded from this change. LDB-08 remains in review; no full-course design, human playtest, merge or deployment is claimed.
