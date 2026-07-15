# Agent Kanban Tasks Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development
> (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn `journal/ops/tasks.md` into an orchestrator-written Agent Kanban and make the three
global context skills conditionally read or reconcile it without changing legacy projects.

**Architecture:** The tracked project owns a marked structured-Markdown board and its operating
contract. The global `codex-start`, `codex-next`, and `codex-end` skills branch only when they find
`<!-- agent-kanban:v1 -->`; otherwise their current behavior is preserved. Skill behavior is tested
RED-GREEN with isolated temporary projects and fresh agents, while tracked board and QA records hold
the rollout evidence because the personal skill directories are not Git repositories.

**Tech Stack:** Markdown, YAML, Git, shell-based fixture inspection, personal Codex skills under
`/home/roking/.codex/skills/`, temporary Python virtual environment for the skill validator.

## Global Constraints

- **REQUIRED SUB-SKILLS for Tasks 2-4:** Use `skill-creator`, `superpowers:writing-skills`, and
  `superpowers:test-driven-development` before editing each skill.
- `journal/ops/tasks.md` contains current-phase work only. Future work remains in `ROADMAP.md`.
- Only the root/orchestrating agent writes `tasks.md`; every delegated brief prohibits board edits.
- Lane order is `Ready`, `Active`, `Verification`, `Blocked`, `Done`; lane placement is status.
- Started work is `Active + Verification + Blocked`: maximum three cards and maximum one write-mode
  card unless the affected card records an exception.
- Task types are exactly `research`, `design`, `plan`, `build`, `fix`, `review`, `qa`, `docs`, and
  `chore`.
- Card size is handoff-sized: one coherent outcome, one owner, one next action, one verification
  story, normally one focused session and one to three commits.
- `tasks.md` is tracked in a public repository. Put no private conversation text, secrets, or
  local-only personal context in cards.
- Skill behavior changes only when `<root>/ops/tasks.md` contains `<!-- agent-kanban:v1 -->`.
- `codex-start` remains read-only except for its pre-existing explicit research-detour exception.
- Marked `codex-next` changes only `tasks.md` and `next.md`; unmarked behavior stays next-only.
- `codex-end` archives the pre-update board before reconciling it and never marks a gated card done
  without evidence.
- Do not add a permanent parser, generator, validator, dashboard, database, or runtime dependency.
- Use temporary fixtures under `/tmp/agent-kanban-evals/`; do not experiment with real
  `codex-next` or `codex-end` state during conformance testing.
- The three personal skill directories are not Git repositories. Back them up before editing and
  record their final SHA-256 hashes in tracked QA evidence.
- Stop after each skill until its baseline, edit, folder validation, metadata check, marked GREEN
  scenario, and unmarked regression scenario are complete.
- Preserve the unrelated untracked `web/dist-qa-drill/` directory.

---

## File Responsibility Map

### Tracked project files

- `journal/ops/tasks.md` — marked Agent Kanban, board policy, and current rollout cards.
- `journal/docs-map.md` — authority statement that `tasks.md` owns current-phase execution status.
- `AGENTS.md` — durable orchestrator-only write rule and delegated-agent return contract.
- `journal/ops/phase.md` — active spec/plan pointer and exact rollout/close next action.
- `journal/qa/runs/2026-07-15-agent-kanban/report.md` — marked/unmarked conformance evidence,
  personal-skill hashes, smoke-test results, and feature verdict.
- `journal/qa/ledger.md` — Agent workflow coverage row plus run-log entry.

### Personal skill files

- `/home/roking/.codex/skills/codex-start/SKILL.md` — marked-board hot read, invariant check,
  priority selection, and drift reporting.
- `/home/roking/.codex/skills/codex-start/agents/openai.yaml` — UI metadata consistent with the
  board-aware start behavior.
- `/home/roking/.codex/skills/codex-next/SKILL.md` — conditional two-file atomic handoff.
- `/home/roking/.codex/skills/codex-next/agents/openai.yaml` — UI metadata consistent with the
  conditional two-file behavior.
- `/home/roking/.codex/skills/codex-end/SKILL.md` — conditional board reconciliation for both
  checkpoint weights and milestone-close carry/reject rules.
- `/home/roking/.codex/skills/codex-end/agents/openai.yaml` — UI metadata consistent with the
  board-aware close behavior.

### Temporary evaluation files

- `/tmp/agent-kanban-evals/template-marked/` — clean marked fixture copied per scenario.
- `/tmp/agent-kanban-evals/template-legacy/` — clean unmarked checklist fixture.
- `/tmp/agent-kanban-evals/results/` — verbatim RED/GREEN outputs and file-diff observations.
- `/tmp/agent-kanban-evals/backups/` — original personal skill directories.
- `/tmp/agent-kanban-skill-venv/` — disposable PyYAML environment for `quick_validate.py` and
  `generate_openai_yaml.py`.

---

### Task 1: Establish RED baselines and adopt the tracked board contract

**Files:**
- Modify: `journal/ops/tasks.md`
- Modify: `journal/docs-map.md`
- Modify: `AGENTS.md`
- Temporary: `/tmp/agent-kanban-evals/template-marked/`
- Temporary: `/tmp/agent-kanban-evals/template-legacy/`
- Temporary: `/tmp/agent-kanban-evals/results/baseline-{start,next,end}.md`

**Interfaces:**
- Consumes: approved design
  `docs/superpowers/specs/2026-07-15-agent-kanban-tasks-design.md`.
- Produces: the `<!-- agent-kanban:v1 -->` opt-in, exact board schema, `AK-01` through `AK-05`,
  orchestrator-only mutation rule, and three observed baseline failures that Tasks 2-4 must fix.

- [ ] **Step 1: Create clean marked and legacy fixture skeletons**

Create `/tmp/agent-kanban-evals/template-marked/journal/{context,ops,memory}` and the same tree
under `template-legacy`. Use `apply_patch` to give both fixtures this minimal manifest:

```md
---
manifest_version: 1
profile: deep
domain: code
tier: deep
mode: project
root: journal
modules:
  research: false
  memory: false
  blog: false
  notebook: false
  audits: false
  graphify: false
  update: false
  decisions: false
  secret_scan: false
private:
  - context/
push: false
desks: []
agents: []
---
# Docs Map — Source of Truth

| File | Source of truth for |
|---|---|
| AGENTS.md | Fixture instructions. |
| journal/ops/phase.md | Current phase. |
| journal/ops/tasks.md | Current-phase execution. |
| journal/context/active.md | Resume summary. |
| journal/context/next.md | Context bridge. |
```

Give both fixtures:

```md
# AGENTS.md

This is a disposable skill-conformance fixture. Follow the invoked skill exactly.
```

```md
State: Agent Kanban fixture is mid-implementation on AK-02.
Next: Resume AK-02 at its exact Next field.
Done: AK-01 passed review.
```

```md
# Next — Context Bridge

> Cheap cross-chat bridge. Append `/codex-next` entries here mid-work; `/codex-end` consumes and
> resets this buffer. Empty = nothing pending.
```

```md
---
phase: fixture
sub_phase: agent-kanban
plan: null
spec: null
step: "Resume AK-02."
prior_phase: null
sessions: []
detour: []
blocking: null
next: "Resume AK-02."
note: "Disposable fixture."
---
```

Initialize each fixture as a local Git repository with a fixture-only identity:

```bash
git -C /tmp/agent-kanban-evals/template-marked init
git -C /tmp/agent-kanban-evals/template-marked config user.name "Agent Kanban Fixture"
git -C /tmp/agent-kanban-evals/template-marked config user.email "fixture@example.invalid"
git -C /tmp/agent-kanban-evals/template-legacy init
git -C /tmp/agent-kanban-evals/template-legacy config user.name "Agent Kanban Fixture"
git -C /tmp/agent-kanban-evals/template-legacy config user.email "fixture@example.invalid"
```

- [ ] **Step 2: Add the marked fixture board and unmarked legacy checklist**

Write this marked fixture board with `apply_patch`:

```md
<!-- agent-kanban:v1 -->
# Tasks — Agent Kanban

## Ready

### AK-03 — Run the next fixture task
- Type: qa
- Mode: read
- Owner: unclaimed
- Depends on: AK-02
- Source: `journal/ops/phase.md`
- Outcome: The dependent fixture task becomes selectable only after AK-02 finishes.
- Next: Inspect the completed AK-02 evidence.
- Load: `journal/ops/tasks.md`
- Workspace: `main`
- Done when: AK-02 is done and its evidence is readable.
- Gate: none
- Evidence: pending
- Updated: 2026-07-15T16:00:00+03:00

## Active

### AK-02 — Update the next skill
- Type: chore
- Mode: write
- Owner: orchestrator
- Depends on: AK-01
- Source: `journal/ops/phase.md`
- Outcome: A marked handoff updates the board and bridge consistently.
- Next: Add the marked-board branch to the next skill.
- Load: `journal/ops/tasks.md`, `journal/context/next.md`
- Workspace: `main`
- Done when: Only tasks.md and next.md change in the marked fixture.
- Gate: code-review
- Evidence: pending
- Updated: 2026-07-15T16:00:00+03:00

## Verification

## Blocked

## Done

### AK-01 — Adopt the board contract
- Type: docs
- Mode: write
- Owner: orchestrator
- Depends on: none
- Source: `journal/ops/phase.md`
- Outcome: The project has a marked structured board.
- Next: None; card is finished.
- Load: `journal/ops/tasks.md`
- Workspace: `main`
- Done when: The marker and required lanes exist.
- Gate: code-review
- Evidence: fixture evidence
- Updated: 2026-07-15T15:45:00+03:00
```

Write this legacy fixture checklist without the marker:

```md
# Tasks - Current Phase Only

## Active

- [ ] Resume the fixture task.

## Done

- [x] Create the fixture.
```

Commit both templates:

```bash
git -C /tmp/agent-kanban-evals/template-marked add .
git -C /tmp/agent-kanban-evals/template-marked commit -m "fixture: marked baseline"
git -C /tmp/agent-kanban-evals/template-legacy add .
git -C /tmp/agent-kanban-evals/template-legacy commit -m "fixture: legacy baseline"
```

Expected: both commits succeed and both worktrees are clean.

- [ ] **Step 3: Run three fresh-agent RED scenarios against the current skills**

Copy the marked template to distinct directories `red-start`, `red-next`, and `red-end`. Dispatch
fresh agents with no project-design context and these exact task prompts:

```text
Use $codex-start in /tmp/agent-kanban-evals/red-start. Orient read-only. Report the selected task,
all board validation findings, and the exact resume files. Do not edit anything.
```

```text
Use $codex-next in /tmp/agent-kanban-evals/red-next. AK-02 remains active; its exact next action is
now "Run the marked two-file conformance check." Reconcile the handoff and report every file you
changed.
```

```text
Use $codex-end in /tmp/agent-kanban-evals/red-end as a mid-work checkpoint. AK-02 has completed its
draft and must enter Verification with evidence "fixture draft complete". Report the archive and
board transition you performed.
```

Record the returned text verbatim in `results/baseline-start.md`, `baseline-next.md`, and
`baseline-end.md`, followed by `git status --short` and `git diff --name-only` from each fixture.

Expected RED:

- current `codex-start` does not guarantee a marked-board invariant check and card-first report;
- current `codex-next` updates only `next.md`, leaving AK-02 stale; and
- current `codex-end` has no explicit lane/card transition contract and cannot prove the required
  archive-before-board flow.

If a current skill unexpectedly passes its scenario, tighten the scenario to expose the missing
contract before editing that skill. Do not manufacture a failure.

- [ ] **Step 4: Replace the real checklist with the rollout board**

Use the approved card schema. At Task 1 completion the real board must contain:

- `AK-01` in `Verification`: adopt board contract and capture RED baselines;
- `AK-02` in `Ready`: update and verify `codex-start`;
- `AK-03` in `Ready`: update and verify `codex-next`;
- `AK-04` in `Ready`: update and verify `codex-end`; and
- `AK-05` in `Ready`: cross-skill conformance, feature QA, and live reconciliation.

Every card must include all required fields from the design. Use these exact card properties:

| ID | Type | Mode | Dependency | Gate | Outcome |
|---|---|---|---|---|---|
| AK-01 | docs | write | none | code-review | Marked board, authority docs, and captured RED evidence exist. |
| AK-02 | chore | write | AK-01 | code-review | Marked start validates and resumes from the board; legacy start is unchanged. |
| AK-03 | chore | write | AK-02 | code-review | Marked next updates board plus bridge atomically; legacy next is unchanged. |
| AK-04 | chore | write | AK-03 | code-review | Marked end archives and reconciles cards; legacy end is unchanged. |
| AK-05 | qa | write | AK-04 | feature-qa | Cross-skill fixtures, real read-only start, hashes, smoke tests, and ledger pass. |

Use these exact remaining fields:

**AK-01**

```md
- Owner: orchestrator
- Source: `docs/superpowers/plans/2026-07-15-agent-kanban-tasks.md` Task 1
- Outcome: Marked board, authority docs, and captured RED evidence exist.
- Next: Review the three RED reports, then update codex-start.
- Load: `journal/ops/tasks.md`, `AGENTS.md`, `journal/docs-map.md`, `/tmp/agent-kanban-evals/results/baseline-start.md`, `/tmp/agent-kanban-evals/results/baseline-next.md`, `/tmp/agent-kanban-evals/results/baseline-end.md`
- Workspace: `main`
- Done when: The marker, five lanes, five valid cards, authority row, agent contract, and three honest RED reports exist.
- Evidence: `/tmp/agent-kanban-evals/results/baseline-{start,next,end}.md`; board contract checks passed; commit pending
```

**AK-02**

```md
- Owner: unclaimed
- Source: `docs/superpowers/plans/2026-07-15-agent-kanban-tasks.md` Task 2
- Outcome: Marked start validates and resumes from the board; legacy start is unchanged.
- Next: Read the start RED report and add the smallest marked-board branch.
- Load: `/home/roking/.codex/skills/codex-start/SKILL.md`, `/home/roking/.codex/skills/codex-start/agents/openai.yaml`, `/tmp/agent-kanban-evals/results/baseline-start.md`
- Workspace: `main`
- Done when: Marked and legacy fresh-agent scenarios pass, the fixture stays read-only, and the skill folder validates.
- Evidence: pending
```

**AK-03**

```md
- Owner: unclaimed
- Source: `docs/superpowers/plans/2026-07-15-agent-kanban-tasks.md` Task 3
- Outcome: Marked next updates board plus bridge atomically; legacy next is unchanged.
- Next: Read the next RED report and add the conditional two-file contract.
- Load: `/home/roking/.codex/skills/codex-next/SKILL.md`, `/home/roking/.codex/skills/codex-next/agents/openai.yaml`, `/tmp/agent-kanban-evals/results/baseline-next.md`
- Workspace: `main`
- Done when: Marked next changes exactly tasks.md plus next.md, legacy next changes only next.md, and the skill folder validates.
- Evidence: pending
```

**AK-04**

```md
- Owner: unclaimed
- Source: `docs/superpowers/plans/2026-07-15-agent-kanban-tasks.md` Task 4
- Outcome: Marked end archives and reconciles cards; legacy end is unchanged.
- Next: Read the end RED report and add marked-board reconciliation to the shared close path.
- Load: `/home/roking/.codex/skills/codex-end/SKILL.md`, `/home/roking/.codex/skills/codex-end/agents/openai.yaml`, `/tmp/agent-kanban-evals/results/baseline-end.md`
- Workspace: `main`
- Done when: Marked end preserves an exact pre-update archive and legal transition, legacy end retains checklist behavior, and the skill folder validates.
- Evidence: pending
```

**AK-05**

```md
- Owner: unclaimed
- Source: `docs/superpowers/plans/2026-07-15-agent-kanban-tasks.md` Task 5
- Outcome: Cross-skill fixtures, real read-only start, hashes, smoke tests, and ledger pass.
- Next: Run all three validators, then execute marked and legacy lifecycle scenarios.
- Load: `journal/ops/tasks.md`, `journal/qa/ledger.md`, `docs/specs/qa-playtest-process.md`, `/tmp/agent-kanban-evals/results/`
- Workspace: `main`
- Done when: Marked and legacy lifecycle runs, real read-only start, skill hashes, product smoke, QA report, and ledger all pass.
- Evidence: pending
```

For every card, set `Updated` to the exact `date -Iseconds` output when it is created or moved.

Set `AK-01` evidence to the three baseline result paths and the board-contract checks. Set the first
ready card’s `Next` to review the RED evidence before changing `codex-start`.

- [ ] **Step 5: Update authority and agent instructions**

Change the docs-map row to:

```md
| journal/ops/tasks.md | Agent Kanban for executable current-phase cards, priority, assignment, live state, and evidence. |
```

Add this concise section to `AGENTS.md` before `## Current phase`:

```md
## Agent Kanban
- When `journal/ops/tasks.md` contains `<!-- agent-kanban:v1 -->`, it is the current-phase execution
  authority. Only the root/orchestrating agent edits it.
- Delegated agents may read cards but must return `Card`, `Result`, `Evidence`, `Next`, `Files`, and
  `Blocker`; they never claim, move, or edit cards directly.
- Finish started work before pulling new work. Respect the board's WIP and transition policies.
```

- [ ] **Step 6: Verify the tracked board contract**

Run:

```bash
git diff --check
rg -n '<!-- agent-kanban:v1 -->|^## (Ready|Active|Verification|Blocked|Done)$|^### AK-0[1-5] —' journal/ops/tasks.md
rg -n '^\| journal/ops/tasks.md \| Agent Kanban' journal/docs-map.md
rg -n '^## Agent Kanban|Only the root/orchestrating agent edits it|Delegated agents' AGENTS.md
```

Expected: no whitespace errors; one marker; all five lanes in order; exactly AK-01 through AK-05;
the docs-map owner and orchestrator-only rules are present.

- [ ] **Step 7: Commit the board contract**

```bash
git add AGENTS.md journal/docs-map.md journal/ops/tasks.md
git commit -m "docs: adopt agent kanban task board"
```

Expected: commit succeeds; `web/dist-qa-drill/` remains untracked and untouched.

---

### Task 2: Update and GREEN-test `codex-start`

**Files:**
- Modify: `/home/roking/.codex/skills/codex-start/SKILL.md`
- Modify: `/home/roking/.codex/skills/codex-start/agents/openai.yaml`
- Modify: `journal/ops/tasks.md`
- Temporary: `/tmp/agent-kanban-evals/backups/codex-start/`
- Temporary: `/tmp/agent-kanban-evals/results/green-start-{marked,legacy}.md`

**Interfaces:**
- Consumes: marker and card schema from Task 1; `baseline-start.md` RED behavior.
- Produces: conditional board hot-read, validation, finish-started priority, compact report, and
  unchanged unmarked start behavior.

- [ ] **Step 1: Review RED evidence and back up the skill**

Read `baseline-start.md`. Copy the untouched skill directory to
`/tmp/agent-kanban-evals/backups/codex-start/` and record:

```bash
sha256sum /home/roking/.codex/skills/codex-start/SKILL.md \
  /home/roking/.codex/skills/codex-start/agents/openai.yaml
```

Expected: two baseline hashes recorded before any edit.

- [ ] **Step 2: Add the minimal marked-board branch**

Keep the current frontmatter name and triggering semantics, but extend the description to mention
agent-Kanban projects. Add a concise `## Agent Kanban opt-in` section after skeleton loading with
this exact behavioral contract:

```md
## Agent Kanban opt-in

After resolving `<root>`, inspect `<root>/ops/tasks.md`. If it contains
`<!-- agent-kanban:v1 -->`, load it as a hot current-state file; otherwise preserve the legacy read
budget and behavior below.

For a marked board, check without writing:
- headings are exactly `Ready`, `Active`, `Verification`, `Blocked`, `Done` in that order;
- card IDs are unique and every card has all fields required by the board policy;
- `Type`, `Mode`, dependencies, referenced `Source`/`Load` paths, and WIP satisfy the policy; and
- `next.md`, `active.md`, `phase.md`, and the selected card do not contradict one another.

The newest pending bridge may identify the card, but the board owns its lane and fields. Without a
bridge, finish started work before pulling: first `Verification`, then `Active`, then the first
unblocked `Ready` card. Surface every `Blocked` card and its unblock condition. Top-to-bottom order
within a lane is priority.

Report the selected card ID/title, lane, owner, exact `Next`, `Workspace`, and `Load` paths. Report
board drift precisely and do not repair it during start.
```

Update the existing loading/report steps so they explicitly defer to this branch when marked and
retain the current instructions when unmarked. Do not duplicate the full card schema from the
project design; the marked `tasks.md` board policy is the local authority.

- [ ] **Step 3: Regenerate and preserve UI metadata**

Create the disposable validator environment once:

```bash
python -m venv /tmp/agent-kanban-skill-venv
/tmp/agent-kanban-skill-venv/bin/pip install PyYAML
```

Regenerate metadata:

```bash
/tmp/agent-kanban-skill-venv/bin/python \
  /home/roking/.codex/skills/.system/skill-creator/scripts/generate_openai_yaml.py \
  /home/roking/.codex/skills/codex-start \
  --interface 'display_name=Codex Start' \
  --interface 'short_description=Resume from project state and Agent Kanban' \
  --interface 'default_prompt=Use $codex-start to orient me in this project.'
```

Append with `apply_patch`:

```yaml
policy:
  allow_implicit_invocation: true
```

- [ ] **Step 4: Validate structure and concision**

Run:

```bash
/tmp/agent-kanban-skill-venv/bin/python \
  /home/roking/.codex/skills/.system/skill-creator/scripts/quick_validate.py \
  /home/roking/.codex/skills/codex-start
wc -l /home/roking/.codex/skills/codex-start/SKILL.md
rg -n 'agent-kanban:v1|Verification.*Active.*Ready|Report the selected card|preserve the legacy' \
  /home/roking/.codex/skills/codex-start/SKILL.md
```

Expected: `Skill is valid!`; SKILL.md stays below 500 lines; all marked-branch anchors exist.

- [ ] **Step 5: Run marked GREEN and unmarked regression scenarios**

Copy the clean templates to `green-start-marked` and `green-start-legacy`. Dispatch fresh agents:

```text
Use $codex-start in /tmp/agent-kanban-evals/green-start-marked. Orient read-only. Report the
selected task, all board validation findings, and the exact resume files. Do not edit anything.
```

```text
Use $codex-start in /tmp/agent-kanban-evals/green-start-legacy. Orient read-only and report where
the legacy checklist leaves off. Do not invent Agent Kanban requirements.
```

Record outputs plus before/after `git status --short`. Expected:

- marked output selects AK-02, names its lane/next/load/workspace, and reports no invariant failure;
- marked fixture remains byte-clean;
- legacy output follows the old skeleton and does not demand Kanban fields; and
- legacy fixture remains byte-clean.

If either fails, revise only `codex-start`, rerun validation, and repeat both scenarios before Task
3.

- [ ] **Step 6: Record the rollout in the tracked board and commit**

Move AK-01 to `Done` with Task 1 commit/review evidence. Move AK-02 to `Verification` with the two
GREEN result paths, quick-validator result, and SHA-256 hashes. Keep AK-03 first in `Ready`.

```bash
git add journal/ops/tasks.md
git commit -m "ops: record codex-start kanban rollout"
```

---

### Task 3: Update and GREEN-test `codex-next`

**Files:**
- Modify: `/home/roking/.codex/skills/codex-next/SKILL.md`
- Modify: `/home/roking/.codex/skills/codex-next/agents/openai.yaml`
- Modify: `journal/ops/tasks.md`
- Temporary: `/tmp/agent-kanban-evals/backups/codex-next/`
- Temporary: `/tmp/agent-kanban-evals/results/green-next-{marked,legacy}.md`

**Interfaces:**
- Consumes: Task 1 schema, Task 2 start behavior, and `baseline-next.md`.
- Produces: marked two-file board/bridge reconciliation and unchanged legacy next-only behavior.

- [ ] **Step 1: Review RED evidence, back up, and hash the skill**

Read `baseline-next.md`, copy the current skill directory to the backup path, and record SHA-256
hashes for `SKILL.md` and `agents/openai.yaml`.

- [ ] **Step 2: Replace the unconditional next-only contract with a conditional contract**

Update frontmatter description and opening prose so legacy behavior remains next-only while marked
projects use two files. Add this exact marked branch before the existing legacy steps:

```md
## Agent Kanban opt-in

Resolve `<root>` from the manifest and inspect `<root>/ops/tasks.md`. If it contains
`<!-- agent-kanban:v1 -->`, validate the board, identify exactly one current card, and prepare one
coherent patch that:

1. reconciles that card's lane, owner, `Next`, `Load`, `Workspace`, partial `Evidence`, blocker
   fields, and `Updated` timestamp from facts established in the conversation;
2. moves the card only when the board's transition and gate rules are satisfied; and
3. appends a `next.md` bridge entry naming the card ID and the same exact resume pointer.

Apply the board and bridge together. If either half is ambiguous or cannot remain consistent, leave
both unchanged and report the exact blocker. Never mark a gated card `Done` without its evidence.

In a marked project, touch only `ops/tasks.md` and `context/next.md`. Create no commit, session file,
archive, active summary, phase update, memory, or log entry.

If the marker is absent, follow the legacy next-only steps below unchanged.
```

- [ ] **Step 3: Regenerate metadata and restore explicit-invocation policy**

```bash
/tmp/agent-kanban-skill-venv/bin/python \
  /home/roking/.codex/skills/.system/skill-creator/scripts/generate_openai_yaml.py \
  /home/roking/.codex/skills/codex-next \
  --interface 'display_name=Codex Next' \
  --interface 'short_description=Bridge context and reconcile Agent Kanban' \
  --interface 'default_prompt=Use $codex-next to prepare a fresh context handoff.'
```

Append:

```yaml
policy:
  allow_implicit_invocation: false
```

- [ ] **Step 4: Validate the skill**

Run `quick_validate.py`, confirm the file remains under 500 lines, and verify these anchors:

```bash
rg -n 'agent-kanban:v1|Apply the board and bridge together|touch only.*tasks.md.*next.md|legacy next-only' \
  /home/roking/.codex/skills/codex-next/SKILL.md
```

Expected: valid skill and all anchors present.

- [ ] **Step 5: Run marked GREEN and legacy regression scenarios**

Copy clean templates to new scenario directories. Dispatch fresh agents with the same baseline-next
prompt for marked and this legacy prompt:

```text
Use $codex-next in /tmp/agent-kanban-evals/green-next-legacy. The legacy task remains active and its
next action is "Resume the fixture task." Prepare the cheapest handoff and report every file changed.
```

Expected marked result:

- exactly `journal/ops/tasks.md` and `journal/context/next.md` change;
- AK-02 remains `Active` with the new identical Next pointer and updated timestamp;
- the bridge names AK-02; and
- there is no commit or session/log/active/phase write.

Expected legacy result: only `journal/context/next.md` changes and the old template behavior remains.

- [ ] **Step 6: Record evidence and commit**

Move AK-02 to `Done` after its review evidence is available. Move AK-03 to `Verification` with the
marked/legacy result paths, validator result, and SHA-256 hashes. Keep AK-04 first ready.

```bash
git add journal/ops/tasks.md
git commit -m "ops: record codex-next kanban rollout"
```

---

### Task 4: Update and GREEN-test `codex-end`

**Files:**
- Modify: `/home/roking/.codex/skills/codex-end/SKILL.md`
- Modify: `/home/roking/.codex/skills/codex-end/agents/openai.yaml`
- Modify: `journal/ops/tasks.md`
- Temporary: `/tmp/agent-kanban-evals/backups/codex-end/`
- Temporary: `/tmp/agent-kanban-evals/results/green-end-{marked,legacy}.md`

**Interfaces:**
- Consumes: Task 1 schema, Task 2 selection order, Task 3 bridge contract, and `baseline-end.md`.
- Produces: archive-before-reconcile behavior for marked boards at both checkpoint weights and
  unchanged unmarked checklist behavior.

- [ ] **Step 1: Review RED evidence, back up, and hash the skill**

Read `baseline-end.md`, copy the current skill directory to its backup, and record SHA-256 hashes.

- [ ] **Step 2: Add marked-board reconciliation to the shared prelude**

Keep weight detection and all legacy milestone behavior. Immediately after resolving `<root>`, add:

```md
## Agent Kanban opt-in

If `<root>/ops/tasks.md` contains `<!-- agent-kanban:v1 -->`, validate the board before any mutation
and use its lanes and fields as the authority for current-phase execution. If the marker is absent,
preserve the legacy task-checklist behavior in every step below.

For a marked board at either checkpoint weight:

1. archive the pre-update board using the existing timestamped archive/cold-storage rules;
2. reconcile every card touched in the conversation from verified facts only;
3. attach compact commit, command/result, review, approval, and QA evidence;
4. move cards only through the board's transition policies;
5. keep gated work in `Verification` until its gate passes;
6. write exact `Blocked by` and `Unblock when` fields when progress cannot continue; and
7. make `active.md` name the selected card ID and the same exact Next action.

Record meaningful card movements in the session file. Subagents never edit the board; only this
root/orchestrating close reconciles their verified reports.

At milestone close, every started card must be finished, explicitly carried into the next phase,
or rejected with a recorded reason. Preserve the completed board in the archive, then prepare a
marked board for the next active phase without expanding future roadmap work automatically.
```

Rewrite existing task-update prose only where necessary to distinguish marked reconciliation from
legacy checklist updates. Do not duplicate unchanged secret-scan, craft-gate, reconciliation,
commit, or branch-integration instructions.

- [ ] **Step 3: Regenerate metadata and restore explicit-invocation policy**

```bash
/tmp/agent-kanban-skill-venv/bin/python \
  /home/roking/.codex/skills/.system/skill-creator/scripts/generate_openai_yaml.py \
  /home/roking/.codex/skills/codex-end \
  --interface 'display_name=Codex End' \
  --interface 'short_description=Checkpoint work and reconcile Agent Kanban' \
  --interface 'default_prompt=Use $codex-end to checkpoint and close this session.'
```

Append:

```yaml
policy:
  allow_implicit_invocation: false
```

- [ ] **Step 4: Validate structure and avoid skill bloat**

Run `quick_validate.py`, `wc -l`, and:

```bash
rg -n 'agent-kanban:v1|archive the pre-update board|keep gated work in.*Verification|every started card' \
  /home/roking/.codex/skills/codex-end/SKILL.md
```

Expected: valid skill, under 500 lines, and no duplicated full card schema.

- [ ] **Step 5: Run marked GREEN and legacy regression checkpoints**

Copy templates to new end scenarios and dispatch fresh agents using the baseline-end prompt for the
marked fixture and this legacy prompt:

```text
Use $codex-end in /tmp/agent-kanban-evals/green-end-legacy as a mid-work checkpoint. Preserve the
legacy task checklist behavior, create the normal handoff, and report what was committed.
```

Expected marked result:

- an archive contains the exact pre-update board;
- AK-02 moves `Active -> Verification` with `fixture draft complete` evidence;
- active/session/phase/bridge/log behavior remains consistent with the original end workflow;
- the fixture commit succeeds; and
- no future task is invented.

Expected legacy result: normal checklist archive/update and checkpoint commit, with no demand for
Kanban lanes or fields.

- [ ] **Step 6: Record evidence and commit**

Move AK-03 to `Done` after review. Move AK-04 to `Verification` with marked/legacy results,
validator evidence, and hashes. Keep AK-05 first ready.

```bash
git add journal/ops/tasks.md
git commit -m "ops: record codex-end kanban rollout"
```

---

### Task 5: Run cross-skill feature QA and reconcile the live rollout

**Files:**
- Modify: `journal/ops/tasks.md`
- Modify: `journal/ops/phase.md`
- Create: `journal/qa/runs/2026-07-15-agent-kanban/report.md`
- Modify: `journal/qa/ledger.md`
- Verify: `/home/roking/.codex/skills/codex-{start,next,end}/SKILL.md`
- Verify: `/home/roking/.codex/skills/codex-{start,next,end}/agents/openai.yaml`

**Interfaces:**
- Consumes: all three individually GREEN skills and their result files.
- Produces: cross-skill verdict, skill hashes, real-project read-only start evidence, ledger coverage,
  a fully evidenced rollout board, and the exact `codex-end` close handoff.

- [ ] **Step 1: Validate all personal skill folders and metadata together**

Run:

```bash
for skill in codex-start codex-next codex-end; do
  /tmp/agent-kanban-skill-venv/bin/python \
    /home/roking/.codex/skills/.system/skill-creator/scripts/quick_validate.py \
    "/home/roking/.codex/skills/$skill"
done
sha256sum /home/roking/.codex/skills/codex-{start,next,end}/SKILL.md \
  /home/roking/.codex/skills/codex-{start,next,end}/agents/openai.yaml
```

Expected: three `Skill is valid!` lines and six final hashes.

Inspect each `openai.yaml` to confirm its `default_prompt` still names the correct `$skill` and its
implicit-invocation policy matches the pre-change value.

- [ ] **Step 2: Run a fresh cross-skill marked lifecycle**

Copy the marked template to `green-lifecycle`. Use separate fresh agents sequentially:

1. `$codex-start` selects AK-02 read-only.
2. `$codex-next` updates AK-02 and the bridge to the same resume action.
3. `$codex-start` resumes AK-02 from the bridge and board without drift.
4. `$codex-end` checkpoints AK-02 into Verification with an exact pre-update archive.
5. `$codex-start` selects the Verification card before any Ready card.

Record every output, `git status`, changed-file list, archive comparison, and final card state in
`/tmp/agent-kanban-evals/results/green-lifecycle.md`.

Expected: no cross-command disagreement; every write set matches its skill contract; the archived
board byte-matches the pre-end board.

- [ ] **Step 3: Run a fresh cross-skill legacy lifecycle**

Repeat start -> next -> start -> end -> start in a new copy of the legacy template. Expected:

- start never requires Kanban fields;
- next remains next-only;
- end preserves checklist archive/update semantics; and
- final start resumes from the legacy handoff.

Record results in `green-lifecycle-legacy.md`.

- [ ] **Step 4: Run negative invariants and alternate transitions**

Before the real-project check, run the required failure and alternate-transition matrix.

Create separate marked-fixture copies and use `apply_patch` to introduce exactly one violation per
copy:

| Fixture | Single violation | Expected read-only start finding |
|---|---|---|
| `invalid-lanes` | Put `Blocked` before `Verification` | Required lane order is invalid. |
| `invalid-duplicate` | Duplicate the `AK-02` heading | Card ID AK-02 is duplicated. |
| `invalid-type` | Change AK-02 Type to `implementation` | Type is outside the controlled vocabulary. |
| `invalid-mode` | Change AK-02 Mode to `mixed` | Mode must be read or write. |
| `invalid-field` | Remove AK-02 Owner | Required Owner field is missing. |
| `invalid-path` | Change AK-02 Load to `missing/file.md` | Load path does not resolve. |
| `invalid-self-dependency` | Change AK-02 Depends on to AK-02 | Self-dependency is invalid. |
| `invalid-cycle` | Change AK-01 Depends on to AK-03 | AK-01 -> AK-03 -> AK-02 -> AK-01 cycle exists. |
| `invalid-wip` | Copy AK-03 into Active three times with unique IDs and Mode write | Started-card and write-card WIP are exceeded. |

For each copy, dispatch a fresh `$codex-start`, record its exact finding, and prove `git status
--short` is unchanged. On fresh copies of `invalid-duplicate`, invoke `$codex-next` and `$codex-end`;
both must refuse board mutation and name the duplicate rather than partially writing their other
surfaces.

Then exercise four legal alternate paths in separate clean marked copies:

1. **Blocked:** `$codex-next` moves AK-02 from Active to Blocked with `Blocked by: user must choose
   the fixture contract` and `Unblock when: user approves one contract`; the next `$codex-start`
   surfaces AK-02 and does not pull dependent AK-03.
2. **Interrupted:** `$codex-next` keeps AK-02 Active, records partial evidence `draft saved with no
   commit`, and updates the exact resume pointer without claiming completion.
3. **Remediation:** prepare AK-02 in Verification, then `$codex-end` records review evidence
   `fixture contract mismatch` and returns AK-02 to Active with the exact fix as Next.
4. **Carry-forward:** prepare AK-02 Blocked at a declared milestone close, then `$codex-end`
   explicitly carries it into the next marked board, preserves the completed board in the archive,
   and does not expand AK-03 or any future roadmap item automatically.

Record the negative matrix and four alternate paths in
`/tmp/agent-kanban-evals/results/green-negative-and-transitions.md`. Any missing refusal, partial
write, illegal move, or invented task is a feature-QA blocker.

- [ ] **Step 5: Exercise real `codex-start` read-only**

Capture the real repository status, dispatch a fresh agent to run `$codex-start` in the blackjack
repository, and capture status again:

```bash
git status --short > /tmp/agent-kanban-evals/results/real-start-before.txt
git status --short > /tmp/agent-kanban-evals/results/real-start-after.txt
diff -u /tmp/agent-kanban-evals/results/real-start-before.txt \
  /tmp/agent-kanban-evals/results/real-start-after.txt
```

Expected: no diff; the output selects AK-05 or the oldest remaining Verification card according to
the board, names exact fields, and reports no invariant drift.

- [ ] **Step 6: Run ledger-scoped product smoke checks**

No `crates/`, `web/src/`, or `web/qa/` files changed, so all product areas remain smoke-only. Run
the mandatory cheap gates from the QA process:

```bash
cargo test -p blackjack-core
npm --prefix web test
npm --prefix web run qa
```

Expected: 80 Rust tests pass, 217 web tests pass, and all QA roles exit zero.
Player Experience is skipped because `web/src/app/` did not change.

- [ ] **Step 7: Write the feature QA report and ledger entry**

Create `journal/qa/runs/2026-07-15-agent-kanban/report.md` with:

```md
# Agent Kanban Feature QA

## Scope
Deep: marked/unmarked behavior for codex-start, codex-next, codex-end; board invariants and
orchestrator-only mutation. Smoke: unchanged blackjack product suites. Player Experience skipped;
no web application files changed.

## Evidence
- RED baselines: `baseline-start.md`, `baseline-next.md`, and `baseline-end.md`; record the actual
  observed failure from each report in one sentence.
- Per-skill GREEN: name each `green-{start,next,end}-{marked,legacy}.md` result and its verdict.
- Cross-skill lifecycle: name `green-lifecycle.md` and `green-lifecycle-legacy.md` and their verdicts.
- Negative/alternate paths: name `green-negative-and-transitions.md` and record every invariant,
  refusal, blocked, interrupted, remediation, and carry-forward verdict.
- Real start: record the read-only status diff result and selected card.
- Skill validation: record all three validator results and the six actual SHA-256 hashes.
- Product smoke: record exact Rust/web test counts and all QA role outcomes.

## Findings
Write `None.` when no findings exist. Otherwise list each new stable QA-NNN ID, severity, evidence,
and disposition from the ledger.

## Verdict
PASS only if every marked invariant, every legacy regression, every skill validation, and every
smoke command passed. Otherwise FAIL with the exact blocking evidence.
```

Add a ledger coverage row named `Agent workflow & handoff`. Its watched files are `AGENTS.md`,
`journal/ops/tasks.md`, and the three personal skills; its last run is
`2026-07-15-agent-kanban`; its last-passed evidence uses the exact `git rev-parse --short HEAD`
output plus the six report hashes; its verdict is the report verdict; and its note links the run
report and states that marked and legacy lifecycles were deep-tested and real start stayed
read-only.

Append a run-log row with the same exact commit and verdict. Do not advance unrelated product-area
last-passed commits because their watched files did not change.

- [ ] **Step 8: Reconcile the board and phase for final review**

Move AK-04 to `Done` after review evidence. Move AK-05 to `Verification` with the QA report, exact
smoke results, cross-skill results, real-start diff, and final skill hashes.

Update `journal/ops/phase.md` to keep the Agent Kanban detour active but set:

```yaml
plan: docs/superpowers/plans/2026-07-15-agent-kanban-tasks.md
spec: docs/superpowers/specs/2026-07-15-agent-kanban-tasks-design.md
step: "Review AK-05 feature-QA evidence, then run codex-end to close the Agent Kanban detour."
next: "After AK-05 passes review, run codex-end; it should archive the completed board, pop the detour, and resume Strategy Table Fundamentals design."
```

Keep the parked Strategy Table Fundamentals `{phase, step}` unchanged in `detour`.

- [ ] **Step 9: Run final diff and secret checks**

```bash
git diff --check
git status --short
rg -n 'T''BD|T''ODO|F''IXME|implement la''ter|fill in det''ails' \
  journal/qa/runs/2026-07-15-agent-kanban/report.md journal/ops/tasks.md journal/ops/phase.md
git diff -- AGENTS.md journal/docs-map.md journal/ops/tasks.md journal/ops/phase.md \
  journal/qa/ledger.md journal/qa/runs/2026-07-15-agent-kanban/report.md
git add journal/ops/tasks.md journal/ops/phase.md journal/qa/ledger.md \
  journal/qa/runs/2026-07-15-agent-kanban/report.md
if git diff --cached | rg -n \
  'AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY-----|xox[baprs]-[0-9A-Za-z-]+|ghp_[0-9A-Za-z]{36}|AIza[0-9A-Za-z_-]{35}'; then
  exit 1
fi
```

Expected: no whitespace errors, no placeholders, no unrelated files, and no secret-pattern match.
A secret-pattern match is a blocker.

- [ ] **Step 10: Commit the feature-QA checkpoint**

```bash
git commit -m "test(ops): verify agent kanban workflow"
```

Expected: tracked rollout evidence is committed; AK-05 remains in Verification until its fresh
review passes. After that review, the orchestrator records the verdict and uses the real
`codex-end` milestone close rather than manufacturing another synthetic close.

---

## Final Review Gate

Before invoking the real `codex-end`:

- [ ] Review the complete tracked diff from the design commit through the QA commit.
- [ ] Review all three personal skill diffs against `/tmp/agent-kanban-evals/backups/`.
- [ ] Confirm all five board cards have passed their named gates.
- [ ] Confirm the marked and legacy lifecycle results are internally consistent.
- [ ] Confirm `journal/qa/ledger.md` points to the committed report and actual commit.
- [ ] Confirm the final six skill hashes match the QA report.
- [ ] Confirm the real repository still contains only the pre-existing unrelated
  `web/dist-qa-drill/` untracked directory.

If review passes, update AK-05 to `Done` with the review verdict and run `codex-end`. The close must
archive the completed Agent Kanban board, pop the research detour, restore
`v2-learning-foundations / strategy-table-fundamentals-design`, and seed the next marked board from
the current Strategy Table Fundamentals tasks without expanding future roadmap work.
