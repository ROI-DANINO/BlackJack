---
phase: v1-simulation-foundations
sub_phase: freeplay-polish-complete
plan: docs/plans/v1-simulation-foundations.md
spec: docs/specs/v1-simulation-foundations.md
step: "V1 Free Play skeleton and scoped polish complete. Awaiting phase-boundary call: move to V2 Basic Strategy unless a fresh playtest exposes a small V1 blocker."
prior_phase: freeplay-skeleton-complete
sessions:
  - journal/ops/sessions/initial-notes-indexed-20260707-034707.md
  - journal/ops/sessions/v1-ruleset-locked-20260707-035405.md
  - journal/ops/sessions/the-extraction-and-the-mend-2026-07-07T0928.md
  - journal/ops/sessions/the-cut-card-and-the-wizard-2026-07-09T0134.md
  - journal/ops/sessions/the-bridge-and-the-table-2026-07-09T0406.md
  - journal/ops/sessions/the-notes-that-wrote-back-2026-07-09T0501.md
  - journal/ops/sessions/the-ten-value-and-the-lamp-2026-07-09T0605.md
detour: []
blocking: null
next: "Decide whether to start V2 Basic Strategy now; first design question is how to encode the BlackjackInfo chart into a machine-readable Basic Strategy table. Push local main first if remote sync matters."
note: "Milestone close — scoped V1 Free Play polish COMPLETE (session the-ten-value-and-the-lamp-2026-07-09T0605). Split legality fixed at the shared Rust rule gate (any two 10-value cards can split); browser table shows per-hand win/loss/push/blackjack outcomes; dealer-ace insurance auto-decline is visible without adding player-taken insurance. Merged codex/freeplay-polish into local main, then removed tracked SDD scratch and ignored /.superpowers/. Verification on merged main: cargo test -p blackjack-core PASS (55 Rust integration tests), cd web && npm test PASS (23 web tests, known act warnings), cd web && npm run build PASS. Final review ready-to-merge; craft self-review PASS on Earth/Water/Fire/Air. main is ahead of origin/main by local commits; push remains false."
---
