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

## Active

## Verification

### AK-07 — Complete movement policy and gate coverage
- Type: fix
- Mode: write
- Owner: orchestrator
- Depends on: AK-06
- Source: `journal/qa/runs/2026-07-15-agent-kanban/report.md`
- Outcome: The board and mutating skills require every transition precondition, and focused fixtures prove Ready entry plus Done success/refusal.
- Next: Review the policy/skill patch and focused transition evidence.
- Load: `journal/ops/tasks.md`, `docs/superpowers/specs/2026-07-15-agent-kanban-tasks-design.md`, `journal/qa/runs/2026-07-15-agent-kanban/report.md`
- Workspace: `feat/agent-kanban`
- Done when: Local/template policies and codex-next/end enforce exact preconditions; Ready entry, Done success, and unmet-Done refusal all pass.
- Gate: code-review
- Evidence: Focused report `25845d5f...`: Ready→Active changed only board+bridge; Done success archived exactly at `bd5a37b`; unmet Done when remained Verification at `cb0caee`; next/end validators pass.
- Updated: 2026-07-15T09:16:30+03:00

## Blocked

## Done

### AK-01 — Adopt board contract and capture RED baselines
- Type: docs
- Mode: write
- Owner: orchestrator
- Depends on: none
- Source: `docs/superpowers/plans/2026-07-15-agent-kanban-tasks.md` Task 1
- Outcome: Marked board, authority docs, and captured RED evidence exist.
- Next: Complete.
- Load: `journal/ops/tasks.md`, `AGENTS.md`, `journal/docs-map.md`, `journal/qa/runs/2026-07-15-agent-kanban/report.md`
- Workspace: `main`
- Done when: The marker, five lanes, five valid cards, authority row, agent contract, and three honest RED reports exist.
- Gate: code-review
- Evidence: Commits `1bd8657`, `eb2d5cb`; independent Task 1 review approved with no findings.
- Updated: 2026-07-15T06:27:48+03:00

### AK-02 — Update and verify codex-start
- Type: chore
- Mode: write
- Owner: orchestrator
- Depends on: AK-01
- Source: `docs/superpowers/plans/2026-07-15-agent-kanban-tasks.md` Task 2
- Outcome: Marked start validates and resumes from the board; legacy start is unchanged.
- Next: Complete.
- Load: `$CODEX_HOME/skills/codex-start/SKILL.md`, `$CODEX_HOME/skills/codex-start/agents/openai.yaml`, `journal/qa/runs/2026-07-15-agent-kanban/report.md`
- Workspace: `main`
- Done when: Marked and legacy fresh-agent scenarios pass, the fixture stays read-only, and the skill folder validates.
- Gate: code-review
- Evidence: Board commit `4c9bdc1`; personal-skill hashes and GREEN reports in `.superpowers/sdd/task-2-report.md`; independent Task 2 review approved with no findings.
- Updated: 2026-07-15T06:40:29+03:00

### AK-03 — Update and verify codex-next
- Type: chore
- Mode: write
- Owner: orchestrator
- Depends on: AK-02
- Source: `docs/superpowers/plans/2026-07-15-agent-kanban-tasks.md` Task 3
- Outcome: Marked next updates board plus bridge atomically; legacy next is unchanged.
- Next: Complete.
- Load: `$CODEX_HOME/skills/codex-next/SKILL.md`, `$CODEX_HOME/skills/codex-next/agents/openai.yaml`, `journal/qa/runs/2026-07-15-agent-kanban/report.md`
- Workspace: `main`
- Done when: Marked next changes exactly tasks.md plus next.md, legacy next changes only next.md, and the skill folder validates.
- Gate: code-review
- Evidence: Board commit `6fb58ee`; personal-skill hashes and GREEN reports in `.superpowers/sdd/task-3-report.md`; independent Task 3 review approved with no findings.
- Updated: 2026-07-15T06:50:35+03:00

### AK-04 — Update and verify codex-end
- Type: chore
- Mode: write
- Owner: orchestrator
- Depends on: AK-03
- Source: `docs/superpowers/plans/2026-07-15-agent-kanban-tasks.md` Task 4
- Outcome: Marked end archives and reconciles cards; legacy end is unchanged.
- Next: Complete.
- Load: `$CODEX_HOME/skills/codex-end/SKILL.md`, `$CODEX_HOME/skills/codex-end/agents/openai.yaml`, `journal/qa/runs/2026-07-15-agent-kanban/report.md`
- Workspace: `main`
- Done when: Marked end preserves an exact pre-update archive and legal transition, legacy end retains checklist behavior, and the skill folder validates.
- Gate: code-review
- Evidence: Board commit `1fb9376`; clean marked codex-end run `b9be56f`; legacy run `10f7d7a`; independent Task 4 re-review approved with no findings.
- Updated: 2026-07-15T07:32:09+03:00

### AK-06 — Restore the marked board policy contract
- Type: fix
- Mode: write
- Owner: orchestrator
- Depends on: AK-04
- Source: `journal/qa/runs/2026-07-15-agent-kanban/report.md`
- Outcome: Marked boards state the exact local schema, movement, blocking, and two-cap WIP policy that the global skills validate.
- Next: Complete.
- Load: `journal/ops/tasks.md`, `docs/superpowers/specs/2026-07-15-agent-kanban-tasks-design.md`, `journal/qa/runs/2026-07-15-agent-kanban/report.md`
- Workspace: `feat/agent-kanban`
- Done when: The live board and marked fixture template carry the policy, and a clean fresh start reports both WIP caps read-only.
- Gate: code-review
- Evidence: Commit `f7043a6`; template `833d1f2`; policy spike reported both WIP caps read-only; independent AK-06 review approved with no findings.
- Updated: 2026-07-15T08:29:07+03:00

### AK-05 — Run cross-skill conformance and feature QA
- Type: qa
- Mode: write
- Owner: orchestrator
- Depends on: AK-06
- Source: `docs/superpowers/plans/2026-07-15-agent-kanban-tasks.md` Task 5
- Outcome: Cross-skill fixtures, real read-only start, hashes, smoke tests, and ledger pass.
- Next: Complete; run the real codex-end milestone close after whole-change review.
- Load: `journal/qa/runs/2026-07-15-agent-kanban/report.md`, `journal/qa/ledger.md`, `docs/superpowers/plans/2026-07-15-agent-kanban-tasks.md`
- Workspace: `feat/agent-kanban`
- Done when: Marked and legacy lifecycle runs, real read-only start, skill hashes, product smoke, QA report, and ledger all pass.
- Gate: feature-qa
- Evidence: Commit `51be265`; 80 Rust / 217 web / full QA PASS; real start read-only/no drift; independent Task 5 feature-QA review approved with no findings; execution variance accepted as bounded and disclosed.
- Updated: 2026-07-15T08:57:49+03:00
