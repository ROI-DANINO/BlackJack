<!-- agent-kanban:v1 -->
# Tasks — Agent Kanban

## Ready

### AK-04 — Update and verify codex-end
- Type: chore
- Mode: write
- Owner: unclaimed
- Depends on: AK-03
- Source: `docs/superpowers/plans/2026-07-15-agent-kanban-tasks.md` Task 4
- Outcome: Marked end archives and reconciles cards; legacy end is unchanged.
- Next: Read the end RED report and add marked-board reconciliation to the shared close path.
- Load: `/home/roking/.codex/skills/codex-end/SKILL.md`, `/home/roking/.codex/skills/codex-end/agents/openai.yaml`, `/tmp/agent-kanban-evals/results/baseline-end.md`
- Workspace: `main`
- Done when: Marked end preserves an exact pre-update archive and legal transition, legacy end retains checklist behavior, and the skill folder validates.
- Gate: code-review
- Evidence: pending
- Updated: 2026-07-15T06:21:15+03:00

### AK-05 — Run cross-skill conformance and feature QA
- Type: qa
- Mode: write
- Owner: unclaimed
- Depends on: AK-04
- Source: `docs/superpowers/plans/2026-07-15-agent-kanban-tasks.md` Task 5
- Outcome: Cross-skill fixtures, real read-only start, hashes, smoke tests, and ledger pass.
- Next: Run all three validators, then execute marked and legacy lifecycle scenarios.
- Load: `journal/ops/tasks.md`, `journal/qa/ledger.md`, `docs/specs/qa-playtest-process.md`, `/tmp/agent-kanban-evals/results/`
- Workspace: `main`
- Done when: Marked and legacy lifecycle runs, real read-only start, skill hashes, product smoke, QA report, and ledger all pass.
- Gate: feature-qa
- Evidence: pending
- Updated: 2026-07-15T06:21:15+03:00

## Active

## Verification

### AK-03 — Update and verify codex-next
- Type: chore
- Mode: write
- Owner: orchestrator
- Depends on: AK-02
- Source: `docs/superpowers/plans/2026-07-15-agent-kanban-tasks.md` Task 3
- Outcome: Marked next updates board plus bridge atomically; legacy next is unchanged.
- Next: Review `.superpowers/sdd/task-3-global.diff` against Task 3 and the two GREEN reports.
- Load: `/home/roking/.codex/skills/codex-next/SKILL.md`, `/home/roking/.codex/skills/codex-next/agents/openai.yaml`, `.superpowers/sdd/task-3-global.diff`, `/tmp/agent-kanban-evals/results/green-next-marked.md`, `/tmp/agent-kanban-evals/results/green-next-legacy.md`
- Workspace: `main`
- Done when: Marked next changes exactly tasks.md plus next.md, legacy next changes only next.md, and the skill folder validates.
- Gate: code-review
- Evidence: Quick validator passed; marked and legacy GREEN reports at `/tmp/agent-kanban-evals/results/green-next-marked.md` and `/tmp/agent-kanban-evals/results/green-next-legacy.md`; exact mutation/forbidden-surface assertions passed; old/new SHA-256 hashes and recursive global diff recorded in `.superpowers/sdd/task-3-report.md` and `.superpowers/sdd/task-3-global.diff`.
- Updated: 2026-07-15T06:46:45+03:00

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
- Load: `journal/ops/tasks.md`, `AGENTS.md`, `journal/docs-map.md`, `/tmp/agent-kanban-evals/results/baseline-start.md`, `/tmp/agent-kanban-evals/results/baseline-next.md`, `/tmp/agent-kanban-evals/results/baseline-end.md`
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
- Load: `/home/roking/.codex/skills/codex-start/SKILL.md`, `/home/roking/.codex/skills/codex-start/agents/openai.yaml`, `.superpowers/sdd/task-2-global.diff`, `/tmp/agent-kanban-evals/results/green-start-marked.md`, `/tmp/agent-kanban-evals/results/green-start-legacy.md`
- Workspace: `main`
- Done when: Marked and legacy fresh-agent scenarios pass, the fixture stays read-only, and the skill folder validates.
- Gate: code-review
- Evidence: Board commit `4c9bdc1`; personal-skill hashes and GREEN reports in `.superpowers/sdd/task-2-report.md`; independent Task 2 review approved with no findings.
- Updated: 2026-07-15T06:40:29+03:00
