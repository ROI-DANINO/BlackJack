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
- Movement: `Ready -> Active -> Verification -> Done`; `Verification -> Active` is in-scope
  remediation. Any started card may move to `Blocked`; it may return to `Active` or `Verification`
  when unblocked and WIP permits. `Done` requires its named gate and evidence. Finished cards are
  not reopened; a later defect becomes a linked `fix` card.
- Blocking: a Blocked card additionally requires exact `Blocked by` and `Unblock when` fields.

## Ready

## Active

## Verification

### AK-06 — Restore the marked board policy contract
- Type: fix
- Mode: write
- Owner: orchestrator
- Depends on: AK-04
- Source: `/tmp/agent-kanban-evals/results/green-negative-and-transitions.md`
- Outcome: Marked boards state the exact local schema, movement, blocking, and two-cap WIP policy that the global skills validate.
- Next: Review the local policy addition and the clean WIP policy-spike result.
- Load: `journal/ops/tasks.md`, `docs/superpowers/specs/2026-07-15-agent-kanban-tasks-design.md`, `/tmp/agent-kanban-evals/results/green-negative-and-transitions.md`
- Workspace: `feat/agent-kanban`
- Done when: The live board and marked fixture template carry the policy, and a clean fresh start reports both WIP caps read-only.
- Gate: code-review
- Evidence: Failing clean WIP hash `f315fc6f...`; policy-only spike hash `13e25fd0...` reported started WIP `4 > 3` and started write-mode WIP `4 > 1`, with no edits.
- Updated: 2026-07-15T08:23:52+03:00

## Blocked

### AK-05 — Run cross-skill conformance and feature QA
- Type: qa
- Mode: read
- Owner: orchestrator
- Depends on: AK-06
- Source: `docs/superpowers/plans/2026-07-15-agent-kanban-tasks.md` Task 5
- Outcome: Cross-skill fixtures, real read-only start, hashes, smoke tests, and ledger pass.
- Next: Resume the four legal transitions after AK-06 passes review and the clean WIP rerun passes.
- Load: `journal/ops/tasks.md`, `journal/qa/ledger.md`, `docs/specs/qa-playtest-process.md`, `/tmp/agent-kanban-evals/results/`
- Workspace: `feat/agent-kanban`
- Done when: Marked and legacy lifecycle runs, real read-only start, skill hashes, product smoke, QA report, and ledger all pass.
- Gate: feature-qa
- Evidence: Marked and legacy lifecycles passed; eight clean invariant cases and duplicate next/end refusals passed; clean WIP run exposed missing local policy.
- Updated: 2026-07-15T08:23:52+03:00
- Blocked by: AK-06 must restore the marked board's explicit local WIP policy.
- Unblock when: AK-06 passes code review and a clean fresh start reports both WIP caps read-only.

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

### AK-03 — Update and verify codex-next
- Type: chore
- Mode: write
- Owner: orchestrator
- Depends on: AK-02
- Source: `docs/superpowers/plans/2026-07-15-agent-kanban-tasks.md` Task 3
- Outcome: Marked next updates board plus bridge atomically; legacy next is unchanged.
- Next: Complete.
- Load: `/home/roking/.codex/skills/codex-next/SKILL.md`, `/home/roking/.codex/skills/codex-next/agents/openai.yaml`, `.superpowers/sdd/task-3-global.diff`, `/tmp/agent-kanban-evals/results/green-next-marked.md`, `/tmp/agent-kanban-evals/results/green-next-legacy.md`
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
- Load: `/home/roking/.codex/skills/codex-end/SKILL.md`, `/home/roking/.codex/skills/codex-end/agents/openai.yaml`, `.superpowers/sdd/task-4-global.diff`, `/tmp/agent-kanban-evals/results/green-end-marked.md`, `/tmp/agent-kanban-evals/results/green-end-legacy.md`
- Workspace: `main`
- Done when: Marked end preserves an exact pre-update archive and legal transition, legacy end retains checklist behavior, and the skill folder validates.
- Gate: code-review
- Evidence: Board commit `1fb9376`; clean marked codex-end run `b9be56f`; legacy run `10f7d7a`; independent Task 4 re-review approved with no findings.
- Updated: 2026-07-15T07:32:09+03:00
