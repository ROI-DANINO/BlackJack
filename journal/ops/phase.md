---
phase: v1-simulation-foundations
sub_phase: freeplay-skeleton-complete
plan: docs/plans/v1-simulation-foundations.md
spec: docs/specs/v1-simulation-foundations.md
step: "V1 Free Play skeleton complete (craft gate PASS). Awaiting a phase-boundary call: triage captured playtest notes → V1 polish vs. V2 Basic Strategy."
prior_phase: freeplay-ui-polish
sessions:
  - journal/ops/sessions/initial-notes-indexed-20260707-034707.md
  - journal/ops/sessions/v1-ruleset-locked-20260707-035405.md
  - journal/ops/sessions/the-extraction-and-the-mend-2026-07-07T0928.md
  - journal/ops/sessions/the-cut-card-and-the-wizard-2026-07-09T0134.md
  - journal/ops/sessions/the-bridge-and-the-table-2026-07-09T0406.md
  - journal/ops/sessions/the-notes-that-wrote-back-2026-07-09T0501.md
detour: []
blocking: null
next: "Triage the captured playtest notes — FIRST verify the 'split two 10-value cards' question (possible split-legality rules gap vs. intended), then decide V1 Free Play polish (per-hand outcome indicator, split fix, insurance UI) vs. moving to V2 Basic Strategy."
note: "Milestone close — V1 Free Play skeleton COMPLETE (session the-notes-that-wrote-back-2026-07-09T0501). The notes+reshuffle cycle closed the prior milestone's accepted Fire craft-minor: startRound now auto-reshuffles + notices on 'shoe must reshuffle', so Free Play crosses shoe boundaries. Added per-hand notes (attach-on-Deal: buffer the resolved round, flush with an optional harness `note` field on the round JSONL line on Deal/Download; no core change). rd-verify (opus) PASS on correctness invariants; craft gate (sonnet) PASS on all four wl:criteria; DRY reshuffle cleanup (3a3bd6b). Merged to main (b7b60c5, 176dd86, 7f83023, a27a076, 3a3bd6b); 46 Rust + 19 web tests green. V1 exit criteria (seeded 6-deck shoe, cut card/penetration, legal actions, outcomes, logs, one player vs dealer, shoe continuity) are met. Captured playtest notes flagged three ideas incl. a possible split-legality rules question to investigate first."
---
