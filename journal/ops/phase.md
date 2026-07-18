---
phase: v2-learning-foundations
roadmap_step: 2
sub_phase: adaptive-learning-progress-build
plan: docs/superpowers/plans/2026-07-17-progressstore-cycle1.md
spec: docs/superpowers/specs/2026-07-16-adaptive-ai-learning-architecture-design.md
step: "AL-05 (was AL-B1) holds Active at 6/11, untouched this session. Desk infrastructure landed instead: the White Lotus migration executed in 8 steps and merged to main at 23cd805 (--no-ff, unpushed). Board is now agent-kanban:v2 and validates clean; scripts/kanban.ts is a derived port of workspace @5502ec2."
prior_phase: adaptive-learning-progress-design
sessions:
  - journal/ops/sessions/initial-notes-indexed-20260707-034707.md
  - journal/ops/sessions/v1-ruleset-locked-20260707-035405.md
  - journal/ops/sessions/the-extraction-and-the-mend-2026-07-07T0928.md
  - journal/ops/sessions/the-cut-card-and-the-wizard-2026-07-09T0134.md
  - journal/ops/sessions/the-bridge-and-the-table-2026-07-09T0406.md
  - journal/ops/sessions/the-notes-that-wrote-back-2026-07-09T0501.md
  - journal/ops/sessions/the-ten-value-and-the-lamp-2026-07-09T0605.md
  - journal/ops/sessions/the-table-and-the-tutor-2026-07-10T1114.md
  - journal/ops/sessions/the-oracle-and-the-guide-2026-07-10T1441.md
  - journal/ops/sessions/the-door-and-the-deck-2026-07-10T1504.md
  - journal/ops/sessions/the-lesson-and-the-ledger-2026-07-11T1524.md
  - journal/ops/sessions/the-drill-and-the-proof-2026-07-11T1637.md
  - journal/ops/sessions/the-fold-and-the-footnote-2026-07-11T2026.md
  - journal/ops/sessions/the-foundation-and-the-worktree-2026-07-11T2308.md
  - journal/ops/sessions/the-lens-and-the-north-star-2026-07-12T1745.md
  - journal/ops/sessions/the-profiles-and-the-proof-2026-07-15T0326.md
  - journal/ops/sessions/the-inbox-and-the-compass-2026-07-15T0521.md
  - journal/ops/sessions/the-bun-and-the-boundary-2026-07-16T0157.md
  - journal/ops/sessions/the-curriculum-and-the-coach-2026-07-16T0422.md
  - journal/ops/sessions/the-evidence-and-the-gate-2026-07-16T0531.md
  - journal/ops/sessions/the-proof-and-the-product-2026-07-16T0840.md
  - journal/ops/sessions/the-sweep-and-the-rescope-2026-07-17T1034.md
  - journal/ops/sessions/the-gates-and-the-probe-2026-07-17T1802.md
  - journal/ops/sessions/the-cutover-and-the-corrections-2026-07-18T2228.md
# Two sessions are absent from this list by necessity, not oversight:
# the-board-and-the-baton (2026-07-15T0929) and the-charter-and-the-contract
# (2026-07-17T1923). Both were real — see commits b60f3ee and the 07-15 board
# work — but were authored in a parallel branch's working tree, and
# journal/ops/sessions/ is gitignored, so their files never crossed the merge.
# Unrecoverable: absent from disk and from all git history. Their outcomes
# survive in this file's note: and in journal/decisions.md.
detour: []
blocking: null
next: "Start foundation-audit research Phase 1 (AL-06) — plan docs/superpowers/plans/2026-07-17-adaptive-learning-foundation-audit-phase1.md, charter docs/superpowers/specs/2026-07-17-adaptive-learning-foundation-audit-research.md. Six read-only collection cards (C1 Knowledge Tracing, C2 ITS/ACT-R, C3 Deliberate Practice, C4 Chess.com & Khan, C5 Anki, C6 blackjack as a teachable skill) writing raw dossiers to journal/raw/_inbox/foundation-audit-p1/, then a SEPARATE verifier per dossier (V1-V6) applying the three-point contract, then a user gate. Settle first: the charter is still Status: draft — charter for approval, and AL-06 gate is user-approval with Evidence pending. BOARD NOTE: AL-06 sits in Ready with its dependency dropped; AL-05 holds Active at the WIP cap (max 1) and the selector therefore still returns AL-05. The user chose to keep the board as-is — this divergence is deliberate, not drift. DEFERRED, still queued: AL-05 Task 6.5 contract amendment, then Tasks 7-11."
note: "2026-07-18 pm (the-cutover-and-the-corrections): the White Lotus migration cleared both approval gates and executed in 8 steps, merged to main at 23cd805 with --no-ff so each step stays individually revertable. Board cut over v1->v2 (milestone AL scoped to roadmap_step 2, 6 cards), scripts/kanban.ts derived-ported from workspace @5502ec2 (regenerate, never patch), codex-* -> /wl-* trued across AGENTS.md + docs-map, .superpowers/ cold-archived. TWO PLAN ASSERTIONS DISPROVED and corrected in the ADR: (1) the two stale session pointers were unrecoverable, not drifted — those sessions were authored in a parallel branch working tree and journal/ops/sessions/ is gitignored, so they crossed no merge and exist in no history; (2) archiving .superpowers/ was NOT zero-git-effect — journal/ops/archive/ is tracked, so the destination arrived unignored and a git add -A would have pushed 2.2M of private scratch to a public remote; closed with its own ignore rule. Also: the CLI Load-path notes were a backtick-vs-bare format mismatch, not broken paths; the port header comment falsely claims write verbs are unimplemented (they exist — fix at the workspace source). MISTAKE: probing `kanban.ts update` against the live board overwrote AL-05 Evidence with the literal string 'test'; restored from HEAD, validate rc=0. update is destructive and prints a NEXT block after writing, so it reads like a query. plan:/spec: still point at the AL-05 cycle-1 work because AL-05 remains the Active card; AL-06 is the stated next thread. PRIOR — 2026-07-17 pm: AL-B1 went from zero code to 6/11 tasks under subagent-driven-development inside iroh — a fresh implementer + adversarial review + fix loop per task. The 14 gates went from written to EXECUTING (T5): 12 pass + 2 declared-unsupported, mutation-verified 16/16, with contract.ts held at 0 changed lines (the fake conforms to the contract, never the reverse). The idb bundle-delta gate PASSED (T6) at 1.35 KB vs the >5 KB alarm — the implementer caught its own false first measurement (Vite tree-shook the calls it was measuring). T3's import-boundary guard shipped broken twice before an AST rewrite. The user then ruled on four Task-7 blockers and directed them recorded as explicit design deviations (Task 6.5), with the fake and adapter to stay governed by one contract. Suite 279/279, build clean. A Fable review agent pushed to the public remote against an explicit read-only brief — harmless, but lesson saved: constrain subagents by capability, not instruction. MERGE NOTE 2026-07-18: this file resolves a two-branch divergence. A parallel session (the-charter-and-the-contract, 2026-07-17T1923) branched from a 2026-07-16 context and authored the foundation-audit research charter + Phase 1 plan; never having seen the 07-17 build sessions, its phase.md asserted the AL-D1 storage thread was PAUSED. That assertion was stale on arrival — the build had already shipped 13 files under web/src/progress/, and neither the charter nor the Phase 1 plan mentions AL-B1, the 14 gates, idb, or ProgressStore. Current phase therefore stays adaptive-learning-progress-build. The foundation-audit charter and plan are preserved intact and real; they are the queued next thread, NOT a supersession of the build. Phase 1's engine is SDD with gated boundaries, NOT the autonomous Workflow feature (halted on the prior run); anti-fabrication = separate-verifier three-point contract (exists/supports/strength-honest) with UNVERIFIABLE quarantined at zero downstream influence; two-layer classification = baseline provenance labels beneath canonical status buckets; Phase 1 raw output → journal/raw/_inbox/foundation-audit-p1/, with promotion to a durable home a user gate decision."
---
