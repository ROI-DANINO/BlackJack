---
phase: v2-learning-foundations
roadmap_step: 4
objective: Design the learning blueprint — what is taught, in what order, through which activities, measured by what evidence — so phase 5 can build a slice that produces real learner data.
sub_phase: learning-design-blueprint
plan: ROADMAP.md  # phase 4 has no separate plan doc; ROADMAP §Phase 4 holds its deliverables, order, and exit criteria, and the LDB board holds its cards. Restructure record: docs/superpowers/plans/2026-07-26-repo-restructure.md (complete) + docs/superpowers/audits/2026-07-26-restructure-review.md (what it still owed). Phase-5 build plan held ready: docs/superpowers/plans/2026-07-23-graded-decision-practice.md (11 tasks, cards retired 2026-07-26, re-shape with fresh IDs when phase 5 opens)
spec: docs/superpowers/specs/2026-07-22-product-design-inputs.md  # what phase 4 may assume; its §0 states what may not be leaned on. Approved slice design: docs/superpowers/specs/2026-07-23-graded-decision-practice-design.md
step: LDB-04 closed 2026-07-30 — the per-activity evidence and mastery rules are approved, closing ROADMAP phase-4 deliverable 5 (six of nine done). Mastery is accumulated evidence weight >= 3.0 with at least one unassisted item as a STRUCTURAL gate rather than a number, not decayed past a 14-day horizon. Weights run by assistance crossed with tableVisibility — 1.0 unassisted/hidden down to 0 for incorrect — so a played hand at hidden visibility is the highest-weighted evidence in the model, which is what discharges the bridge's disqualifying constraint. The scoping finding: this is a REDUCER, not a migration. progress/types.ts was built for exactly this model and the old reducer ignored it — evidence.skillId, assistance, tableVisibility, occurredAt ('Recency/spacing input'), attemptOrdinal, presentationId and AttemptKind including 'classification' are all already present, while controller.ts:360-362 keyed on stepId and discarded outcomeId, itself a validated FK into Subject.skills. Gating is recommend-do-not-lock, decided on the internal ground that hard gating would make A-01 load-bearing at runtime when LDB-01 declined to assert that order even as graph edges. K-U6-005 fixed by renaming to 'retry-2' in both Assistance unions plus a second instance at controller.ts:218 that the verdict never named — safe only because nothing has ever been persisted, verified. K-U6-003 retired rather than corrected. K-U6-009 was out of scope and had no owner anywhere, so it is now QA-019, where logging it found 16 capability assertions across nine recap steps where the verdict names one. Register grew by two SUB-rows only (A-06a, A-07a), pooled per the owner's instruction that overlapping assumptions share instruments. Kulik 1990 was not opened — five routes blocked at the proxy with CONNECT tunnel failed 403, an environment policy block recorded as a named reachable gap rather than an evidenced absence.
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
next: Start LDB-06, session composition — LDB-03 and LDB-04 are both Done so it is unblocked, and ROADMAP:139-141 explicitly pre-authorises it running before the economy ('session composition may become selectable before the economy, which is acceptable'). It is also the last gate on LDB-07, which needs LDB-03 plus LDB-06. WHAT THIS CARD MUST RESOLVE, and one of them is a contradiction: the bridge lists rare-event exposure as an OPEN decision in §7 while stating it as a REQUIREMENT in §4.6 — resolve it explicitly in writing rather than inheriting one side, which the card's own Outcome demands. WHAT IS ALREADY DECIDED AND MUST NOT BE REOPENED: practice pools are mixed by default per the resolved CFL-007 ruling (block to introduce, interleave to practise; mixed review is the steady state, not a final stage), and LDB-03's contract C-F already binds each activity to DECLARE its pool as mixed or blocked-for-first-exposure — this card writes the POLICY that reads those declarations, not the declaration rule. WHAT LDB-04 HANDS IT: the 14-day decay horizon (A-06a) means sessions must surface Review-due skills, so session composition is now partly determined by the mastery model rather than free; and the weight table's tableVisibility dimension means a session that never withdraws the table can never produce 1.0-weight evidence. CONSTANTS: session size, duration and stopping rules all inherit A-07 and A-08/A-11 — per the owner's 2026-07-30 instruction, pool overlapping constants into shared sub-rows with the non-independence reason stated, rather than minting one row per number. Provisional on P-3, and A-15 records that the mixed-practice ruling is explicitly a bet on untested domain transfer.
note: journal/ops/sessions/the-write-path-and-the-test-that-refuted-itself-2026-07-30T0919.md
---
