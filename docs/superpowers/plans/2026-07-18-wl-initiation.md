# White Lotus Initiation Plan

> Target: `/home/roking/Desktop/Projects/blackjack`. Planning branch: `wl/init-2026-07-18`. Base: `main` (@ `592f36e`, clean, synced with origin).
> Status: draft only — no migration action is authorized by this file.
>
> Conducted by the `/wl-init` Migration conductor (first field run), 2026-07-18. Operator deviation
> recorded: planning branch runs in the **main checkout**, not an isolated worktree (operator's
> explicit choice at the step-5 gate; consequence — no live blackjack session may run concurrently
> on another branch of this checkout while the plan branch is active).
> Scope: v1→v2 agent-kanban board migration + lifecycle-generation doc truing. Out of scope,
> deliberately: renaming `docs/superpowers/` (recorded as a deferred decision), any product code,
> anything touching the in-flight AL-B1 cycle or `.wl/sdd/`.

## Observed inventory

| Surface | Observed shape and provenance | Disposition (`retain \| migrate \| retire \| needs decision`) | Risk / decision | Verification |
|---|---|---|---|---|
| `journal/ops/tasks.md` | `<!-- agent-kanban:v1 -->`; v1 policy-prose header; lanes Ready/Active/Verification/Blocked/Done; 5 cards (AL-01, AL-R1, AL-R2, AL-D1 Done; AL-B1 Active 6/11); clean linear dep spine AL-01→AL-R1/R2→AL-D1→AL-B1 | migrate | The payload. Board is live; AL-B1 mid-cycle — execute only at a checkpoint boundary | `node scripts/kanban.ts validate` rc=0 on the migrated board; `board` + `next` render sanely |
| `journal/ops/phase.md` | v1-era frontmatter; no `roadmap_step:` key; `step:`/`next:`/`note:` are prose; `sessions:` lists 2 files that do not exist on disk | migrate | `roadmap_step` is greenfield — must agree with ROADMAP + node; stale pointers fixed in same pass | key present; both stale paths replaced by on-disk names; kanban CLI cross-check passes |
| `ROADMAP.md` | Narrative: Destination / Tracks T1-T3 / capabilities table / historical V1 `[x]` V2 `[ ]` V3 `[ ]`; **no numbered delivery-map line anywhere** | migrate (additive only) | Decision locked below: add minimal `## Delivery map` (3 numbered entries), narrative untouched | numbered `2. [ ] **V2 …**` line greppable; no other line of the file changed (`git diff` shows one hunk) |
| `AGENTS.md` | Commands section names `codex-start/next/end/init` (no such commands exist anywhere); `## Agent Kanban` section encodes v1 policy (marker, root-only edits, delegate return contract) | migrate | Doc-only; codex-* were never executables here, so no alias shim is needed — see alias contract | zero `codex-` matches post-edit; Kanban section states v2 marker + CLI-only writes |
| `journal/docs-map.md` | Meta-authority (v1 manifest, current schema); 4 rows reference `codex-*`; rows missing for README, `.wl/`, `journal/work/`; annotates `docs/superpowers/{specs,plans}/` as "where current designs land" | migrate (minimal) | Scope guard: fix codex rows + add board/CLI rows only; full table audit is follow-up, not this migration | zero `codex-` matches; new rows resolve; manifest self-check still passes |
| `CONTRIBUTING.md` | Defers to docs-map; references tasks.md as current-phase-only | retain (verify-only) | Wording stays true under v2 | one read-through post-migration; no edit expected |
| `scripts/` (absent) | Blackjack has no kanban CLI; lifecycle board steps currently no-op (guard: script present) | migrate (add derived port) | Decision locked below: port `scripts/kanban.ts` from workspace merged master with a derived-port header; never patched here | port carries the header; `validate`/`board`/`next` run green against the migrated board |
| `.superpowers/` (sdd/ + brainstorm/) | Untracked, gitignored scratch of the pre-`.wl` tool era; zero live references (one archived mention only) | retire (archive, never rm) | Local move only, no git effect | dir absent from repo root; archive copy exists; no tracked file references it |
| `.wl/sdd/` | Live SDD ledger for AL-B1; cited by `journal/ops/phase.md`, `tasks.md`, and product code (`web/src/progress/contract.ts:1059`, its test) | **retain — do not touch** | Any interference corrupts an in-flight cycle | untouched (`git status` + mtime unchanged) |
| `docs/superpowers/{specs,plans}/` | Tracked, live, authoritative spec/plan store for both eras (18+13 files); docs-map points here explicitly | retain; **needs decision (deferred): rename** | Renaming = cross-ref churn across docs-map, phase.md, `.wl/sdd`, product citations — not this migration | n/a (deferred; recorded in ADR) |
| `docs/plans/` + `docs/specs/` (legacy pair) | Older store; superseded in practice by the superpowers pair per docs-map annotation | retain as historical; needs decision (deferred) | Fold/redirect decision rides with the dir-rename decision | n/a (deferred) |
| `.worktrees/` | Empty, gitignored | retire (no-op — empty) | none | absent or empty |
| `.claude/worktrees/` | Empty; hidden via local-only `.git/info/exclude` instead of the shared `.gitignore` | migrate (tidy) | Consolidate: rely on ignored `/.worktrees/` pattern; drop the local exclude line | `git status` clean without the local exclude |
| `.github/workflows/pages.yml` | Deploy-only Pages workflow; zero framework coupling | retain | none | n/a |
| `README.md`, `PROGRESS.md`, `CLAUDE.md`, `tools/play_cli.py` | Product/docs surfaces; no lifecycle coupling (README/PROGRESS/tools) or pure shim (CLAUDE) | retain | none | n/a |
| `journal/` remainder (memory 20 facts + index, qa ledger + 24 runs, sessions ×30, context/active+next fresh, decisions.md ~23 ADRs, log.md, raw/_inbox ×1, work/ empty, ops/archive ×22 v1 boards + docs-map archive) | Healthy, current, index-gated | retain (archives frozen as v1 — never rewritten) | Migration appends: 1 ADR to decisions.md, 1 log.md line | ADR + log line present post-execution |

## Compatibility and alias contract

| Existing entrypoint or state | Canonical WL replacement | Compatibility behavior | Retirement gate | Verification | Rollback |
|---|---|---|---|---|---|
| `codex-start/next/end/init` (doc references only — no executable exists anywhere for these names) | Global `/wl-start` `/wl-next` `/wl-end` `/wl-init` (regenerated 2026-07-18, already serving this desk) | **No alias needed** — nothing executable to preserve; behavior is already the wl-* family. Doc rewrite only | The AGENTS.md + docs-map edit commit (steps 5-6) | zero `codex-` matches in tracked files | `git revert` of that commit |
| `<!-- agent-kanban:v1 -->` board + v1 policy prose (per `docs/superpowers/specs/2026-07-15-agent-kanban-tasks-design.md`) | `agent-kanban:v2` board written only via `scripts/kanban.ts` (per workspace `docs/specs/2026-07-16-agent-sdlc-kanban-design.md`) | Hard cutover in one commit — the CLI refuses writes to v1 (exit 4), so no coexistence window exists by design; 22 v1 archives + step-4 pre-archive keep full history | The step-4 board-migration commit, gated by `validate` rc=0 | v2 marker present; validate rc=0; AL-B1 ledger content preserved verbatim in its card | restore the step-4 pre-archive copy over tasks.md (see reversibility table) |
| v1-only card fields `Mode` / `Owner` / `Workspace` / `Done when` | Dropped (v2's deliberate cuts: single-writer makes Owner/Mode moot; `Done when` folds into `Outcome`; `Workspace` folds into worktree practice) | Values preserved in the archived v1 board; `Done when` text folded into each card's `Outcome`/`Intent` during rewrite | Same step-4 commit | archived board carries every dropped value; spot-check AL-B1 | same as board rollback |
| No CLI on this desk (board steps no-op) | `scripts/kanban.ts` **derived port** of workspace merged master | Additive — nothing existing changes behavior; lifecycle board steps activate on next `/wl-start` | n/a (addition, not replacement) | port header names source + rule "regenerate, never patch"; CLI runs green | delete the file (pre-state = no CLI) |

## Dependencies

Every ordered migration step names its prerequisite steps, approvals, and external inputs; record
`none` only after checking the observed inventory.

| Migration step | Prerequisite steps, approvals, or external inputs | Readiness evidence |
|---|---|---|
| 1. ROADMAP delivery map | Operator plan approval (gate 2) | This plan approved |
| 2. phase.md (`roadmap_step: 2` + stale session pointers) | Step 1 (the numbered line it binds to must exist first) | Step 1 committed; `sessions/` dir listing in probe c |
| 3. Port `scripts/kanban.ts` | Workspace master merged (done, `5502ec2`, pushed); operator plan approval | Workspace suite 16/16 green on merged master, 2026-07-18 |
| 4. Board v1→v2 rewrite | Steps 1-3 (roadmap line + phase key + CLI must all exist for `validate` to pass); **checkpoint boundary** — no in-flight blackjack session mid-write | AL-B1 state frozen at a `/wl-end` or equivalent pause; step 3's CLI validates |
| 5. AGENTS.md truing | Step 4 (the v2 policy it describes must be live) | Step 4 committed |
| 6. docs-map truing | Step 4 (rows describe the v2 board + CLI) | Step 4 committed |
| 7. Retire `.superpowers/` + worktree-exclude tidy | None (independent of board work) | Probe d: zero live references |
| 8. ADR + log line | Steps 1-7 (records what actually happened) | All prior steps committed |

## Ordered migration steps

1. **ROADMAP.md — add the delivery map (additive only).** Insert a `## Delivery map` section:
   `1. [x] **V1 — Simulation Foundations**` · `2. [ ] **V2 — Learning Foundations**` (current) ·
   `3. [ ] **V3 — UX and Game Experience**`, each line pointing at its existing historical section.
   Not one existing line changes.
2. **phase.md.** Archive per desk convention (`journal/ops/archive/phase-<timestamp>.md` — first
   phase.md archive; convention generalizes from tasks/docs-map precedent), then add
   `roadmap_step: 2` and replace the two stale `sessions:` entries with the on-disk filenames.
3. **Port the CLI.** Copy workspace merged-master `scripts/kanban.ts` → `scripts/kanban.ts` with a
   derived-port header (source path + commit + "regenerated from workspace, never patched here" —
   the four-family topology rule). No tests ported; the workspace suite owns the source.
4. **Board v1→v2 (the payload; checkpoint boundary required).**
   a. Archive live board → `journal/ops/archive/tasks-<timestamp>.md` (23rd archive, the last v1).
   b. Author the v2 board: `<!-- agent-kanban:v2 -->` + pointer line; `## Milestones` with one node
      `### AL — Adaptive-Learning Foundations [active]`, `- Roadmap: step 2`,
      `- Plan: docs/superpowers/plans/2026-07-17-progressstore-cycle1.md`; lanes reordered
      (Blocked last); 5 cards re-authored on the 13-field schema — IDs re-issued as `AL-01…AL-05`
      in dependency order (mapping recorded in the board's pointer comment: old AL-01→AL-01,
      AL-R1→AL-02, AL-R2→AL-03, AL-D1→AL-04, AL-B1→AL-05), `Depends on` rewritten to match;
      `Intent` authored per card from its v1 `Outcome`/`Done when` first sentence; `Done when`
      folded into `Outcome`; `Mode`/`Owner`/`Workspace` dropped (archive holds them); AL-B1's
      Evidence ledger carried verbatim; the phase.md-queued **foundation-audit Phase 1** thread
      authored as a Ready card (closes the probe-c board/phase divergence), `Gate: user-approval`.
   c. Gate: `node scripts/kanban.ts validate journal/ops/tasks.md journal/ops/phase.md` rc=0, then
      `board` + `next` reviewed by the operator (the `next` arc must select AL-05's continuation).
5. **AGENTS.md.** Commands section → the four `wl-*` names; `## Agent Kanban` section rewritten to
   v2: marker `agent-kanban:v2`, written only via `scripts/kanban.ts`, single-writer, delegate
   return contract unchanged in spirit (structured status, never board writes).
6. **docs-map.md.** The 4 `codex-*` rows → `wl-*`; add rows for `scripts/kanban.ts` (derived port)
   and the board's v2 format authority (the workspace design spec, by full path). Nothing else.
7. **Retire + tidy.** Move `.superpowers/` → `journal/ops/archive/cold/superpowers-scratch-2026-07-18/`
   (local move; both paths gitignored/untracked — zero git effect); delete the now-dead
   `/.superpowers/` ignore line; remove the `.claude/worktrees/` line from `.git/info/exclude`
   (the empty dir disappears from status once removed by Claude Code itself; if it lingers, add
   `.claude/worktrees/` to `.gitignore` instead — one mechanism, shared).
8. **Record.** Append one ADR row to `journal/decisions.md` (v1→v2 board cutover + codex→wl truing +
   deferred `docs/superpowers/` rename) and one `journal/log.md` line.

## Per-mutation reversible boundaries

Before a legacy-surface mutation can be planned, record a row for it in the table below.
Every row must name a reversible boundary, backup or archival action, restoration check, rollback action, and verification command or observation.

| Legacy-surface mutation | Reversible boundary | Backup or archival action | Restoration check | Rollback action | Verification command or observation |
|---|---|---|---|---|---|
| ROADMAP.md delivery-map insert | Its own commit on `wl/init-2026-07-18` | Git history (additive hunk only) | `git show HEAD~1:ROADMAP.md` renders prior file | `git revert <commit>` | `grep -n '^2\. \[ \]' ROADMAP.md` hits exactly one line; `git diff` shows a single hunk |
| phase.md key + session pointers | Its own commit | `journal/ops/archive/phase-<ts>.md` copy made before edit | archive file byte-compares to pre-edit `git show` | `cp` archive over phase.md (or `git revert`) | `grep -c 'roadmap_step: 2' journal/ops/phase.md` = 1; both session paths resolve on disk |
| `scripts/kanban.ts` addition | Its own commit | None needed (pure addition) | n/a | `git rm scripts/kanban.ts` + revert | `node scripts/kanban.ts board journal/ops/tasks.md journal/ops/phase.md` exits 0 (post step 4) |
| tasks.md v1→v2 rewrite | Its own commit; board frozen at a checkpoint | `journal/ops/archive/tasks-<ts>.md` (the 23rd, final v1 archive) written FIRST | archive carries the v1 marker + all 5 cards + dropped fields, byte-identical to pre-edit board | `cp` archive over tasks.md (or `git revert`) | `validate` rc=0; `grep -c 'agent-kanban:v2' tasks.md` = 1; AL-B1 evidence text diff-checked against archive |
| AGENTS.md truing | Its own commit | Git history | `git show HEAD~1:AGENTS.md` | `git revert` | `grep -c codex- AGENTS.md` = 0; Commands lists exactly the four `wl-*` |
| docs-map.md truing | Its own commit | `journal/ops/archive/docs-map-<ts>.md` copy (second such archive; convention exists) | archive byte-compares | `cp` archive back (or `git revert`) | `grep -c codex- journal/docs-map.md` = 0; manifest self-check keys intact |
| `.superpowers/` move | Local filesystem only (untracked both sides) | The move IS the archive (`archive/cold/superpowers-scratch-2026-07-18/`) | `ls` the archive path; contents intact | move the dir back | repo root has no `.superpowers/`; archive dir listing matches probe-d inventory |
| `.gitignore` + `.git/info/exclude` tidy | Its own commit (gitignore) / local edit (exclude) | Git history; exclude line noted here: `.claude/worktrees/` | `git show` | `git revert`; re-add exclude line | `git status` clean; no local-only exclusion remains |

## Approval gates

Draft written → operator approves plan commit → operator approves execution.

Additional execution precondition (this target): step 4 runs only at a **checkpoint boundary** —
no live blackjack session mid-AL-B1 writing `journal/ops/` concurrently (operator chose branch-only
isolation, so the checkout is shared).

## Reconciliation before ready

Every observed surface has a disposition, and every migration action traces to an observed surface
or an explicitly approved new convention.

- Every inventory row above carries a disposition; the three `needs decision` items are each either
  **locked by this plan** (ROADMAP numbering → minimal delivery map; CLI → derived port; node
  structure → single `AL` node; v1-field drop → fold-and-archive) or **explicitly deferred with an
  owner** (`docs/superpowers/` rename + legacy `docs/plans|specs` fold → future re-tune, recorded
  in the step-8 ADR).
- Every ordered step traces to inventory rows (steps 1-2 → ROADMAP/phase rows; 3 → absent-CLI row;
  4 → tasks.md row; 5-6 → AGENTS/docs-map rows; 7 → .superpowers/worktrees rows; 8 → journal
  remainder row). The one **new convention** introduced — the `## Delivery map` section and the
  foundation-audit Ready card — is named here for explicit approval rather than smuggled in.
