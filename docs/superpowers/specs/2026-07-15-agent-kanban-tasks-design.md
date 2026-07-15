# Agent Kanban for Current-Phase Tasks

## Status

Approved design. This workflow enhancement turns `journal/ops/tasks.md` from a phase checklist into
the project’s agent-facing Kanban board while preserving the existing authority boundaries:
`ROADMAP.md` owns future work, specs own requirements and decisions, plans own implementation
decomposition, and the board owns executable current-phase status.

The board is repository-native structured Markdown. It is written only by the root/orchestrating
agent, read by every participating agent, and integrated conditionally into `codex-start`,
`codex-next`, and `codex-end` without changing those skills for projects that have not opted in.

This design does not implement the board, alter the skills, introduce a dashboard, or create a
machine-data generator.

## Why This Project Needs It

Recent work demonstrates a richer lifecycle than unchecked/checked tasks can express:

- a card can be designed, implemented across several commits, independently reviewed, sent back for
  remediation, feature-QA certified, and only then closed;
- a session can interrupt a clean task without partial files, leaving an exact worktree and next
  action for another agent;
- a promised hardening item can miss one slice and be carried into the next compatible boundary;
- feature and milestone QA have different evidence and closure rules; and
- the project deliberately keeps future-phase detail out of `tasks.md`.

The successful Blackjack Basics and Strategy Profile work also established the preferred unit of
execution: a bounded, independently verifiable handoff that is usually larger than one commit and
smaller than a complete feature. Current `tasks.md` checkboxes lose assignment, blocker, handoff,
review, and evidence state while completed sections accumulate indefinitely.

## Research Basis

The design adapts external guidance rather than copying a generic project board:

- [The Kanban Guide](https://kanbanguides.org/the-kanban-guide/) requires an explicit definition of
  workflow: work items, start and finish points, states, WIP control, movement policies, and a flow
  expectation. This project will record timestamps first and will not invent a time-based process
  gate without measured history.
- [OpenAI Codex subagent guidance](https://learn.chatgpt.com/docs/agent-configuration/subagents)
  recommends keeping requirements and decisions in the main thread, delegating bounded work, and
  returning distilled results. It warns that parallel write-heavy agents increase conflict and
  coordination overhead.
- [Microsoft Magentic-One](https://www.microsoft.com/en-us/research/articles/magentic-one-a-generalist-multi-agent-system-for-solving-complex-tasks/)
  separates a task ledger of facts and plans from a progress ledger of assignments, progress, and
  stalls. Blackjack already has the former in its specs and plans; `tasks.md` should be the latter.
- [Agent2Agent task lifecycle](https://a2a-protocol.org/dev/topics/life-of-a-task/) distinguishes
  working, interrupted/input-required, failed, and terminal task states and carries status context,
  timestamps, and artifacts.
- [GitHub Issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/about-issues)
  reinforces stable task identity, dependency relationships, assignees, and retained history.

## Goals

1. Let a fresh orchestrator identify the single best next action without reconstructing recent
   sessions or reading an entire implementation plan.
2. Make assignment, dependency, blocker, worktree, verification gate, and completion evidence
   explicit.
3. Keep the board small by containing current-phase work only and archiving completed milestone
   boards.
4. Preserve single-threaded writes while allowing bounded parallel read work.
5. Make `codex-start`, `codex-next`, and `codex-end` maintain one consistent execution picture.
6. Keep the format readable and directly patchable without a generator or database.
7. Preserve legacy skill behavior in projects without an agent Kanban.

## Non-Goals

- A web dashboard, draggable UI, GitHub Projects integration, or external task service.
- Durable multi-writer locking or direct task claims by subagents.
- Replacing specs, plans, `phase.md`, `active.md`, `next.md`, the QA ledger, or session history.
- Expanding future roadmap work into current cards.
- Measuring agent productivity or enforcing cycle-time targets before useful history exists.
- Making YAML or JSON the board’s source of truth.

## Authority and Ownership

The authoritative split is:

| Surface | Owns |
|---|---|
| `ROADMAP.md` | Future phases, milestones, and exit criteria |
| Design spec | Requirements, design decisions, and non-goals |
| Implementation plan | Ordered decomposition and task instructions |
| `journal/ops/tasks.md` | Executable current-phase cards, priority, assignment, live state, and evidence |
| `journal/ops/phase.md` | Machine-readable phase metadata and phase-level next action |
| `journal/context/active.md` | Three-line session summary pointing to the active card |
| `journal/context/next.md` | Fresh conversational bridge pointing to the card to resume |
| `journal/qa/ledger.md` | Product-area QA coverage and finding history |

Only the root/orchestrating agent writes `tasks.md`. Subagents may read the board and return
structured status, findings, or evidence. The orchestrator verifies that report before moving or
editing a card.

The board opts into this behavior with one marker:

```md
<!-- agent-kanban:v1 -->
```

Global skills retain their existing checklist behavior when the marker is absent.

## Definition of Workflow

### Lanes

The board contains these headings in this order:

```text
Ready -> Active -> Verification -> Done
                    |
                    +-> Blocked -> Active or Verification
```

`Blocked` is an interrupted holding state, not a terminal outcome. Top-to-bottom order within each
lane is priority.

### Start and Finish

A card is **started** when it enters `Active`. Cards in `Active`, `Verification`, and `Blocked`
remain started work and count toward WIP.

A card is **finished** only when it enters `Done` with its `Done when` condition satisfied and its
named gate passed. Finished cards are not reopened. A later defect becomes a linked `fix` card so
the original evidence remains historically true.

### Movement Policies

- `Ready -> Active`: dependencies are done, the card has a clear outcome and observable completion
  condition, an owner is assigned, and WIP capacity exists.
- `Active -> Verification`: the outcome has been produced and initial evidence is attached.
- `Verification -> Done`: the named review, approval, or QA gate passes.
- `Verification -> Active`: review or QA finds actionable rework within the card’s original scope.
- Any started lane `-> Blocked`: progress requires an unavailable dependency, authority, external
  state, or user decision. The exact blocker and unblock condition are required.
- `Blocked -> Active` or `Verification`: the unblock condition is met and WIP remains legal.
- A finding outside the original outcome creates a new card rather than silently expanding scope.

### WIP Policy

- At most three cards may be started at once.
- At most one started card may authorize product or authoritative-document writes.
- Other concurrent cards must be explicitly read-only research, review, or analysis-oriented QA.
- Several agents contributing to one shared outcome remain under one card unless their outputs are
  independently useful and independently verifiable.
- Any WIP exception is written on the affected card with its reason; it is never implicit.

No service-level expectation is enforced in V1 of this board. ISO update timestamps will create the
history needed to decide later whether work-item age or a service expectation provides real value.

## Work-Item Size

A card is a handoff-sized work packet:

- one coherent outcome;
- one owner at a time;
- one exact next action;
- one shared verification story;
- enough context for another session to resume directly; and
- normally completable in one focused agent session, though it may produce one to three commits.

Split a card when parts can be assigned independently, require different proof, affect unrelated
boundaries, or can finish while another part remains blocked. Keep work together when splitting
would add bookkeeping around one small outcome.

## Task Types

Every card has one stable type. Type describes the nature of the work and does not change as the
card moves through lanes.

| Type | Use |
|---|---|
| `research` | Gather evidence, verify rules, or investigate alternatives |
| `design` | Define product, learning, UX, architecture, or contracts |
| `plan` | Turn an approved design into executable work packets |
| `build` | Add or change intended product behavior |
| `fix` | Correct a demonstrated defect or review finding |
| `review` | Perform a standalone adversarial, code, or spec review |
| `qa` | Run feature or milestone playtests and reconcile the QA ledger |
| `docs` | Reconcile authoritative documentation or ingest evidence |
| `chore` | Maintain tooling, dependencies, generated artifacts, or repository hygiene |

Boundary rules:

- Tests written as part of implementation retain `build` or `fix`; a dedicated validation run is
  `qa`.
- Ordinary implementation review is the original card’s gate. Use `review` only when review is
  independently assigned work.
- A spike is `research`.
- Refactoring is `chore` unless it changes intended behavior.
- A user decision is a blocker or gate, not a task type.
- A milestone is a card grouping, not a type.

## Card Schema

Cards have stable phase-scoped IDs such as `STF-03`. IDs do not change when cards move and are not
reused. Lane placement is the sole status representation; cards have neither a status field nor a
checkbox.

```md
### STF-03 — Expose the grading contract
- Type: build
- Mode: write
- Owner: orchestrator
- Depends on: STF-02
- Source: `docs/superpowers/plans/2026-07-15-strategy-profile-foundation.md` Task 3
- Outcome: One authoritative grading verdict crosses Rust/WASM/TypeScript.
- Next: Define the Rust request and response shapes.
- Load: `crates/blackjack-core/src/strategy.rs`, `web/src/bridge/types.ts`
- Workspace: `main`
- Done when: Native and built-WASM vectors agree and contract tests pass.
- Gate: code-review
- Evidence: pending
- Updated: 2026-07-15T15:30+03:00
```

Required fields and semantics:

- `Type`: one value from the controlled vocabulary above.
- `Mode`: `read` or `write`; this controls WIP independently of type.
- `Owner`: the responsible orchestrator or delegated agent; `unclaimed` is allowed only in `Ready`.
- `Depends on`: card IDs from the same active board or `none`. A valid dependency exists, is not
  the card itself, and does not create a cycle. Completed prior-phase work belongs in `Source` or
  `Evidence`, not as a dependency on an archived card.
- `Source`: the spec, plan task, QA finding, decision, or other authority that scopes the card.
- `Outcome`: the observable change or result, not a step list.
- `Next`: one exact next action.
- `Load`: the minimum exact files the next agent needs.
- `Workspace`: repository, branch, or worktree location needed to resume safely.
- `Done when`: an observable completion condition.
- `Gate`: normally `code-review`, `feature-qa`, `milestone-qa`, `user-approval`, or `none`.
- `Evidence`: compact references to commits, commands/results, review verdicts, QA runs, or approved
  artifacts. It is not a transcript.
- `Updated`: ISO 8601 timestamp with timezone.

A `Blocked` card additionally requires:

```md
- Blocked by: <exact condition preventing progress>
- Unblock when: <observable condition that permits resumption>
```

Cards contain no private conversation excerpts, secrets, or local-only personal context because
`tasks.md` is tracked in a public repository.

## Agent Delegation Protocol

Before delegating work, the orchestrator confirms the card is in `Active`, records its owner, and
gives the agent the card ID, type, mode, outcome, completion condition, allowed scope, workspace,
dependencies, sources, and required evidence. The brief explicitly prohibits editing `tasks.md`.

Every delegated agent returns:

```md
Card: STF-03
Result: complete | partial | blocked
Evidence: <commits, commands, verdicts, or findings>
Next: <exact remaining action>
Files: <relevant paths>
Blocker: none | <exact unblock requirement>
```

The orchestrator checks the claimed evidence and then updates the card. Interrupted agents leave a
card `Active` with its last known evidence or move it to `Blocked` with a concrete reason. Timestamps
alone never reclaim a card or declare it stale.

## Command Integration

### `codex-start`

`codex-start` remains read-only except for its existing explicit mid-plan detour behavior. In a
marked project it:

1. loads the existing manifest, active summary, and pending bridge skeleton;
2. reads `tasks.md` as a hot current-state surface;
3. checks required lanes, unique IDs, controlled types and modes, required fields, referenced file
   existence, and WIP limits;
4. uses the newest pending bridge to locate the relevant card while treating the board as authority
   for that card’s state;
5. otherwise prioritizes finishing started work: `Verification`, then `Active`, then the first
   unblocked `Ready` card;
6. surfaces blocked cards and their unblock conditions without silently selecting unrelated work;
7. reports the selected card, exact next action, workspace, and files to load; and
8. reports disagreement between the board, `active.md`, `phase.md`, or bridge as drift without
   repairing it.

### `codex-next`

In a marked project, `codex-next` becomes a two-file handoff:

1. validate the board before mutation;
2. reconcile the current card’s lane, owner, next action, load files, workspace, partial evidence,
   blocker, and update time;
3. move the card only when available evidence satisfies the transition policy;
4. append a small `next.md` entry containing the card ID and exact resume pointer; and
5. write no session file, task archive, active summary, log entry, or commit.

The board and bridge update is one coherent patch. If both cannot remain consistent, neither is
changed.

### `codex-end`

For both checkpoint weights, `codex-end`:

1. archives the pre-update `tasks.md` using the existing archive behavior;
2. reconciles every card touched during the session;
3. attaches compact commit, test, review, and QA evidence;
4. moves cards only according to the approved policies;
5. makes `active.md` name the current card and its next action; and
6. records meaningful card movements in the session handoff.

At milestone close, every `Active`, `Verification`, or `Blocked` card must either be finished,
explicitly carried into the next phase, or rejected with a recorded reason. The completed board
remains in the task archive and `tasks.md` is prepared for the next active phase. Future roadmap
items are never expanded automatically.

## Failure Handling

- Skills validate the board before mutation.
- A missing or invalid value is repaired only when current evidence makes the correction
  unambiguous.
- Ambiguous corruption is reported with the exact card and field; no task state is invented.
- Missing `Source` or `Load` paths are surfaced as drift rather than silently removed.
- Duplicate IDs, unknown lanes or types, nonexistent/self/cyclic dependencies, and unexplained WIP
  excess are explicit validation failures.
- Review findings inside scope return a card to `Active`; findings outside scope create a new card.
- A bridge/board mismatch is surfaced rather than resolved by timestamp guessing.
- Projects without the opt-in marker follow unchanged legacy skill behavior.

## Verification Strategy

Implementation must verify behavior with temporary project fixtures rather than experimenting on
another live repository:

1. A marked fixture exercises board-aware start, next, and end behavior.
2. An unmarked fixture proves legacy skill behavior is unchanged.
3. `codex-start` makes no board writes.
4. `codex-next` changes only `tasks.md` and `next.md` and keeps them consistent.
5. `codex-end` archives before mutation and preserves evidence.
6. Duplicate IDs, invalid lanes/types/modes, missing fields, missing file pointers,
   nonexistent/self/cyclic dependencies, and WIP violations are detected.
7. One realistic card travels `Ready -> Active -> Verification -> Done`.
8. Blocked, remediation, interruption, and carried-forward paths are exercised separately.
9. A public-remote check confirms no private handoff text enters the tracked board.

The implementation should prefer fixture-based skill conformance checks and direct file-diff
assertions. A permanent generator or validator is out of scope unless the work discovers a
documented failure that justifies it.

## Rollout

1. Transform the current `tasks.md` into the marked structured board without losing current
   Strategy Table Fundamentals work or its carried hardening obligation.
2. Update the docs map description of `tasks.md` to name its agent-Kanban authority.
3. Add the orchestrator-only board rule and concise agent return contract to `AGENTS.md`.
4. Update the three global skills conditionally on the marker.
5. Run the marked and unmarked fixture verification matrix.
6. Exercise `codex-start` against the real project read-only.
7. Run a synthetic `codex-next`/`codex-end` fixture flow; do not create a false real session close.
8. Record feature QA for the workflow change before calling it complete.

## Evolution Trigger

Structured Markdown remains the source of truth until evidence demonstrates a need for machine
data. Reconsider YAML/JSON plus a rendered view only when at least one real consumer requires
structured queries, repeated board-format failures create measured repair cost, the active board no
longer fits the start read budget, or multiple orchestrators require transactional claims.

Any such change is a new design and must define one data owner, generation freshness, migration,
failure behavior, and an exit condition under the Tool & Runtime Admission Protocol.
