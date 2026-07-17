---
phase: v2-learning-foundations
sub_phase: adaptive-learning-progress-design
plan: null
spec: docs/superpowers/specs/2026-07-16-adaptive-ai-learning-architecture-design.md
step: "AL-D1 active — design the cycle-1 ProgressStore foundation (port, envelope, contract suite)."
prior_phase: adaptive-learning-storage-research
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
  - journal/ops/sessions/the-board-and-the-baton-2026-07-15T0929.md
  - journal/ops/sessions/the-bun-and-the-boundary-2026-07-16T0157.md
  - journal/ops/sessions/the-curriculum-and-the-coach-2026-07-16T0422.md
  - journal/ops/sessions/the-evidence-and-the-gate-2026-07-16T0531.md
  - journal/ops/sessions/the-proof-and-the-product-2026-07-16T0840.md
detour: []
blocking: null
next: "AL-D1 — Design the ProgressStore port signatures, versioned envelope/attempt record, and physical store layout headless against fixtures; resolve session definition, per-skill evidence keying, storage-failure policy, retention bound, and the raw-export path inside the design; then write the TDD implementation plan."
note: "2026-07-17: a seven-cluster research sweep re-scoped AL-D1 from an end-to-end write/reload slice to the design's cycle-1 foundation — the card had run one cycle ahead of its own Source (which places persistence integration in the cycle-3 overlay), and today's stepId-keyed attempts would persist mastery-unusable evidence. The first-durable-consumer question moves to the adaptive-mechanics proof. Repairs landed with the re-scope: the identity ADR was recorded for the first time (pseudonymous random opaque origin+profile-scoped key — the 2026-07-12 reserve-now gate had never been discharged), the idb admission was found to be conditional on an unrecorded production bundle-delta check and that obligation was propagated to decisions/ROADMAP/stack-boundaries, and two learning-integrity QA gates dropped in an earlier fold were restored. AL-R3 AI-planner research stays deferred; STF-02/03/05 remain paused and recoverable from archives/specs. The WASM freshness guard fix is a one-line change with no wire dependency and has now missed two carriers."
---
