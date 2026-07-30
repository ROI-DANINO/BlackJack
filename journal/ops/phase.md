---
phase: v2-learning-foundations
roadmap_step: 4
objective: Design the learning blueprint — what is taught, in what order, through which activities, measured by what evidence — so phase 5 can build a slice that produces real learner data.
sub_phase: learning-design-blueprint
plan: ROADMAP.md  # phase 4 has no separate plan doc; ROADMAP §Phase 4 holds its deliverables, order, and exit criteria, and the LDB board holds its cards. Restructure record: docs/superpowers/plans/2026-07-26-repo-restructure.md (complete) + docs/superpowers/audits/2026-07-26-restructure-review.md (what it still owed). Phase-5 build plan held ready: docs/superpowers/plans/2026-07-23-graded-decision-practice.md (11 tasks, cards retired 2026-07-26, re-shape with fresh IDs when phase 5 opens)
spec: docs/superpowers/specs/2026-07-22-product-design-inputs.md  # what phase 4 may assume; its §0 states what may not be leaned on. Approved slice design: docs/superpowers/specs/2026-07-23-graded-decision-practice-design.md
step: LDB-01 closed 2026-07-30 — the learning outcomes and skill graph are approved, closing ROADMAP phase-4 deliverables 1 and 2. 18 outcomes across Subjects A/B/C plus a cross-cutting probability/EV/variance strand, each an observable decision behaviour; two were rewritten out of knowledge-claim form, and the rewrites are shown rather than asserted. The graph's 26 edges carry one of four labels and the count is the output: 16 Domain-necessary, 0 Evidence-backed, 8 Product judgement, 2 Assumption. The zero is deliberate — §1.1's interleaving evidence licenses a requirement (never hand the learner the classification) and not an ordering, so no prerequisite edge borrows its strength. A-01 is not spent: the 7-stage progression survives as vocabulary, not as edges. Two bridge decisions settled — D-1, EV is interpretive literacy and never the decision rule (A-14/P-2); D-2, the false ten-heuristic is not adopted, recorded explicitly as running against the evidence since §1.8 is the dossier's only on-domain source and mildly favours the option not taken (A-16 stays open for P-4). Five new register rows A-23..A-27. Also corrected en route: P2-verdict-catalog asserted in three places that no Phase 2 verdict had reached a product document — 28 of 31 have, and the 3 outstanding are exactly the three whose locus is code (K-U6-003/005/009); the 2026-07-26 sweep never reached web/src. K-U6-005 is live in controller.ts:123 and LDB-04 owns it.
prior_phase: adaptive-learning-progress-build
sessions:
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
next: Start LDB-03, the activity taxonomy — LDB-01 and LDB-02 are both Done, so it is unblocked and it alone unblocks four cards (LDB-04, LDB-06, LDB-07, LDB-08). Read docs/superpowers/research/activity-pattern-catalog/FOR-LDB-03.md first; classification.md already supplies a candidate adopt-or-reject reason for all 32 patterns, which is most of the card's last approvable-when clause. Two things LDB-01 hands it directly: the 18 approved outcomes are the capability list every activity must map to, so 'every activity declares the capability it measures' is now checkable rather than aspirational; and the four-label edge taxonomy (Domain-necessary / Evidence-backed / Product judgement / Assumption) is reusable for the adopt-or-reject reasons, which keeps arithmetic out of the register. Rule the word-bank versus Parsons boundary once, in writing. Do not classify from the candidate-capability column — three rows over-rate there. Constraint 3 binds hardest here: an activity adopted because 'this format measures X better' needs its own support, and LDB-01 registered A-24, A-25 and A-26 rather than assert exactly that.
note: journal/ops/sessions/the-assumption-nobody-opened-2026-07-27T0230.md
---
