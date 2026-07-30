---
phase: v2-learning-foundations
roadmap_step: 4
objective: Design the learning blueprint — what is taught, in what order, through which activities, measured by what evidence — so phase 5 can build a slice that produces real learner data.
sub_phase: learning-design-blueprint
plan: ROADMAP.md  # phase 4 has no separate plan doc; ROADMAP §Phase 4 holds its deliverables, order, and exit criteria, and the LDB board holds its cards. Restructure record: docs/superpowers/plans/2026-07-26-repo-restructure.md (complete) + docs/superpowers/audits/2026-07-26-restructure-review.md (what it still owed). Phase-5 build plan held ready: docs/superpowers/plans/2026-07-23-graded-decision-practice.md (11 tasks, cards retired 2026-07-26, re-shape with fresh IDs when phase 5 opens)
spec: docs/superpowers/specs/2026-07-22-product-design-inputs.md  # what phase 4 may assume; its §0 states what may not be leaned on. Approved slice design: docs/superpowers/specs/2026-07-23-graded-decision-practice-design.md
step: LDB-06 revised and still awaiting approval; phase 4 remains six of nine. A parallel commit 2b902de shipped two cross-cutting facilities — web/src/tuning/params.ts, holding every constant A-07 calls 'invented until measured' with per-constant provenance, runtime overrides and a params stamp on every record so retuning PARTITIONS the data rather than corrupting it; and web/src/notes/, a playtest-note channel exporting to journal/qa/notes/ rather than the gitignored data/history/. Verified at 304 web tests, 80 Rust tests, tsc and production build clean, plus a real-browser run. NOTE FOR ROADMAP:95, which says phase 4 designs L2 and builds nothing: 1,533 lines of product code now exist in this phase. That may be a deliberate owner call but it is not recorded as one, and the two surfaces contradict each other until someone rules. THE DEFECT IT FOUND, which is this session's: LDB-06 §8's self-check read 'no number appears without a register row' and passed — but that clause can only fail when a number is PRESENT, so constants holding a row and no value were invisible to it. Four such constants existed. Two in LDB-06 §6, now valued; two in LDB-04 §2.2, in an ALREADY-APPROVED document, still unset. Prose can ship 'a minimum rate' and satisfy its own gate; TypeScript cannot compile against it, which is why building found what reading did not. §8 is now bidirectional and enumerates all nine constants positively.
prior_phase: adaptive-learning-progress-build
sessions:
  - journal/ops/sessions/the-write-path-and-the-test-that-refuted-itself-2026-07-30T0919.md
  - journal/ops/sessions/the-assumption-nobody-opened-2026-07-27T0230.md
  - journal/ops/sessions/the-rules-that-didnt-fire-2026-07-26T0255.md
  - journal/ops/sessions/the-board-that-shaped-the-wrong-phase-2026-07-25T2129.md
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
  - journal/ops/sessions/the-second-axis-and-the-unread-page-2026-07-20T0934.md
  - journal/ops/sessions/the-corrections-that-never-landed-2026-07-20T1403.md
  - journal/ops/sessions/the-blocked-push-and-the-broken-scan-2026-07-20T1424.md
  - journal/ops/sessions/the-gate-that-passed-on-nothing-2026-07-20T2015.md
  - journal/ops/sessions/the-loop-and-the-guard-that-broke-four-ways-2026-07-21T1024.md
  - journal/ops/sessions/the-product-turn-and-the-proven-gate-2026-07-21T1344.md
  - journal/ops/sessions/the-loop-that-closed-and-the-row-that-wasnt-there-2026-07-22T0316.md
  - journal/ops/sessions/the-absences-that-collapsed-2026-07-22T2203.md
# Two sessions are absent from this list by necessity, not oversight:
# the-board-and-the-baton (2026-07-15T0929) and the-charter-and-the-contract
# (2026-07-17T1923). Both were real — see commits b60f3ee and the 07-15 board
# work — but were authored in a parallel branch's working tree, and
# journal/ops/sessions/ is gitignored, so their files never crossed the merge.
# Unrecoverable: absent from disk and from all git history. Their outcomes
# survive in journal/decisions.md and in session-file history.
detour: []
blocking: ""  # RESOLVED 2026-07-20T2015: the '28 unpushed commits' were phantom stale-ref data. After `git fetch --prune`, main was behind 9 / ahead 0 and fast-forwarded clean. PR #9 merged at 6def4b6. No manual push was ever required.
next: TWO THINGS, and the second is owed rather than optional. (1) APPROVE OR REVISE LDB-06 — docs/superpowers/specs/2026-07-30-session-composition.md, in Verification. Its weakest parts remain the invented session presets (A-07b, which deliberately SPAN the A-08 Duolingo-vs-Brilliant conflict rather than resolving it) and the engineered-tail dosage plus P4 losing-run floor (A-07c), all of which now carry values and live in params.ts. (2) REPAIR THE LDB-04 GAP: 2026-07-30-evidence-and-mastery-rules.md:142-143 names F5's minimum series length and calibration bar and sets NEITHER, in a document already approved on 2026-07-30. Proposals wait at params.ts under mastery.calibration.*, flagged invented-unset-in-spec so nothing downstream invents them twice. Repairing an approved document is unassigned — decide whether it is an erratum on LDB-04 or a new card before LDB-08 assembles the blueprint over it. AFTER THOSE: LDB-07 (interaction UX) still owes the target WCAG conformance level; LDB-05 (economy) is the most independent card left and is CONSTRAINED by LDB-06 §4 — no penalty for stopping, no loss framing, no voided evidence; LDB-08 is best done fresh, since it must read all approved documents against each other. ALSO: rdw-end step 6's cold-storage sweep is DESTRUCTIVE in this repo — .gitignore:7 makes journal/ops/archive/cold/ a never-published subtree, so moving tracked archives there stages them as removals. Do not run that step here.
note: journal/ops/sessions/the-write-path-and-the-test-that-refuted-itself-2026-07-30T0919.md
---
