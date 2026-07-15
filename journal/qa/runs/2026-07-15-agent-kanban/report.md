# Agent Kanban Feature QA

## Scope

Deep: marked/unmarked behavior for codex-start, codex-next, codex-end; board invariants and
orchestrator-only mutation. Smoke: unchanged blackjack product suites. Player Experience skipped;
no web application files changed.

## Evidence

### RED baselines

- `baseline-start.md`: the tightened run showed that the pre-change installed skill did not
  guarantee marker detection, structured-board validation, or card-first selection.
- `baseline-next.md`: the pre-change installed contract wrote only `next.md`, leaving the marked
  board stale instead of reconciling the two-file handoff.
- `baseline-end.md`: archive/movement could be improvised, but the pre-change installed contract
  did not guarantee board validation or legal card transitions.

### Per-skill GREEN

- `green-start-marked.md`: PASS — marked board validation and card-first read-only selection.
- `green-start-legacy.md`: PASS — legacy checklist orientation unchanged.
- `green-next-marked.md`: PASS — exactly tasks plus bridge changed atomically.
- `green-next-legacy.md`: PASS — legacy next-only behavior unchanged.
- `green-end-marked.md`: PASS — exact pre-update archive and legal gated transition.
- `green-end-legacy.md`: PASS — legacy checklist archive/checkpoint semantics unchanged.

### Cross-skill lifecycle

- `green-lifecycle.md`: PASS — fresh marked start → next → start → end → start stayed consistent;
  the archived board byte-matched the pre-end board and final start prioritized Verification.
- `green-lifecycle-legacy.md`: PASS — fresh legacy lifecycle stayed marker-free, next-only at the
  bridge step, preserved checklist archive/update semantics, and resumed the final handoff.

### Negative invariants and alternate paths

- `green-negative-and-transitions.md`: PASS after the approved local-policy remediation
  `f7043a6` and template commit `833d1f2`.
- All nine invariant fixtures passed: lane order, duplicate ID, controlled Type, controlled Mode,
  required Owner, resolvable Load, self-dependency, dependency cycle, and both WIP caps.
- Duplicate-ID `$codex-next` and `$codex-end` both refused atomically with no partial writes.
- Blocked, interrupted, remediation, and milestone carry-forward paths all followed legal moves;
  carry-forward preserved the outgoing board and did not expand dependent/future work.
- Execution-mode variance: at the user's request to prioritize speed after the earlier nested
  fanout, the resumed QA implementer ran the final four isolated transition fixtures directly.
  These four cases use deterministic hashes/file-set assertions and are not claimed as fresh-agent
  evidence; earlier lifecycle, invariant, and refusal cases retain their recorded fresh-agent
  provenance.

### Real start

- `real-start.md`: PASS at `66de1a6`. The reconciled live worktree selected AK-05 in Active with
  its exact Next, workspace, and Load; board/manifest/memory/privacy validation found no drift.
- `real-start-before.txt` and `real-start-after.txt` are byte-identical and empty. Tracked and
  ignored-private hash manifests are also byte-identical before/after.

### Skill validation and hashes

- Validator: `codex-start` — `Skill is valid!`
- Validator: `codex-next` — `Skill is valid!`
- Validator: `codex-end` — `Skill is valid!`
- `codex-start/SKILL.md`: `7f9e5674cca3c7e0265e0ec6d1ae98606a20d4f45f26b1eff1b8453dd3df93d5`
- `codex-next/SKILL.md`: `f00a780a67ce550a1583ae4696e84397b2be9fa8bfca46be9c13d614a7196483`
- `codex-end/SKILL.md`: `21e695a037291edd54ca8c8d9de57268d7c26eb749901828298990aee590c246`
- `codex-start/agents/openai.yaml`: `b1db2413585df5ea6c87bd37e0bf6d2317788330b3aef4c3d86a64e9213a89ff`
- `codex-next/agents/openai.yaml`: `b10d00a2809c87123a1f2e72900740d8647a9231f3eba62d2882d5cd605fa3a9`
- `codex-end/agents/openai.yaml`: `a49f4ad9a2e3c98905765fb99700f44fa726c689361001421fabdf774b88a56e`
- Metadata audit: each default prompt names its matching `$skill`; implicit invocation remains
  enabled only for `codex-start`, matching the pre-change values.

### Product smoke

- `cargo test -p blackjack-core`: PASS — 80 tests, 0 failures.
- `npm --prefix web test`: PASS — 22 files, 217 tests, 0 failures. Only the documented pre-existing
  React `act(...)` warnings appeared.
- `npm --prefix web run qa`: PASS — all WASM freshness checks passed; rules 90 rounds / 514
  assertions / 0 gaps / 0 violations; flow 273 snapshots / 1,166 assertions / 29 split-turn
  snapshots / 1 reshuffle / 0 violations; breakit 12/12 attacks; learn 9/9 units / 28 assertions /
  0 violations.
- Player Experience skipped because `web/src/app/` did not change.

## Findings

None.

## Verdict

PASS. Every marked invariant, legacy regression, skill validation, legal transition, real-start
read-only check, and required smoke command passed.
