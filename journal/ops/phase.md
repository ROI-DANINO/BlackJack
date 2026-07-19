---
phase: v2-learning-foundations
roadmap_step: 2
sub_phase: adaptive-learning-foundation-audit
plan: docs/superpowers/plans/2026-07-17-adaptive-learning-foundation-audit-phase1.md
spec: docs/superpowers/specs/2026-07-17-adaptive-learning-foundation-audit-research.md
step: "AL-05 CLOSED at 4a197b6 — all 11 cycle-1 tasks done, 28/28 real-browser gates, feature QA PASS, whole-cycle Fable review closed (wl-verify CONFORMS; wl-judge PASS on cycle 3). Board: AL-05 → Done (0454885), selector returns AL-06. AL-06 not started — its gate is user approval of the audit charter, which is still Status: draft."
prior_phase: adaptive-learning-progress-build
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
  - journal/ops/sessions/the-adapter-and-the-verdict-2026-07-19T1328.md
# Two sessions are absent from this list by necessity, not oversight:
# the-board-and-the-baton (2026-07-15T0929) and the-charter-and-the-contract
# (2026-07-17T1923). Both were real — see commits b60f3ee and the 07-15 board
# work — but were authored in a parallel branch's working tree, and
# journal/ops/sessions/ is gitignored, so their files never crossed the merge.
# Unrecoverable: absent from disk and from all git history. Their outcomes
# survive in journal/decisions.md and in session-file history.
detour: []
blocking: "AL-06 gate: the foundation-audit charter is Status: draft — charter for approval. User approval required before the C1–C6 collection cards run."
next: "Get the audit charter approved (docs/superpowers/specs/2026-07-17-adaptive-learning-foundation-audit-research.md), then start AL-06: six read-only collection cards (C1–C6) writing raw dossiers to journal/raw/_inbox/foundation-audit-p1/, a SEPARATE verifier per dossier (V1–V6) under the three-point contract (exists/supports/strength-honest, UNVERIFIABLE quarantined), then the user gate on promotion. Engine: SDD with gated boundaries, NOT Workflow."
note: "MILESTONE CLOSE 2026-07-19 (the-adapter-and-the-verdict-2026-07-19T1328.md): AL-05 — the cycle-1 ProgressStore foundation — closed and merged to main at 4a197b6 (--no-ff, unpushed; board move at 0454885). Tasks 6.5–11 ran under subagent-driven development inside iroh: the four user rulings + fifth deviation amended into design/unions/gates with five proven falsifications (6.5); the idb adapter (7–8, two fix cycles); 28/28 gates in real Chromium+Firefox with honest synthetic controls and mutex-free two-page races (9); ~807–816 canonical bytes/attempt across three tiers (10); feature QA closed on fresh evidence with the six learning-integrity verdicts made durable in the ledger after proving report.md is generator-owned (11, two fix cycles). The user then directed a WHOLE-CYCLE final review on Fable — Tasks 1–6.5 included, product purpose/vision added as a lens: wl-verify CONFORMS (0C/0I; no over- or under-foundation), wl-judge PASS on cycle 3 after fix commits df2c790/f91aa8f/6686e50 (design §12 gained register row #14 for the §10 measurement erratum; the exhaustiveness tripwire now covers every canonical literal incl. HandOutcome). Milestone evidence re-run fresh on merged main: cargo 80/80 (17 suites), web 280/280, build clean, bundle 65.99 kB byte-stable. Craft gate skipped by rule (spec named in the prior phase.md has no wl:criteria block) — the dual-Fable record stands in its place. Open advisory (ungraded): idb-store.ts:752's raw store.ts:139-143 line-cite will rot; anchor it when next touched. Deferred-minors triage recorded in the verify report: ~14 accepted-with-reason, all fix-before-merge items fixed. PRIOR context (cutover, unrecoverable sessions, board v1→v2): see the-cutover-and-the-corrections session file and decisions.md 2026-07-18 row."
---
