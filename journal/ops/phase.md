---
phase: v1-simulation-foundations
sub_phase: freeplay-ui-polish
plan: docs/plans/v1-simulation-foundations.md
spec: docs/specs/v1-simulation-foundations.md
step: "TS UI bridge shipped & merged; next is a small Free Play UI cycle (per-hand notes + reshuffle wiring)"
prior_phase: ts-ui-bridge
sessions:
  - journal/ops/sessions/initial-notes-indexed-20260707-034707.md
  - journal/ops/sessions/v1-ruleset-locked-20260707-035405.md
  - journal/ops/sessions/the-extraction-and-the-mend-2026-07-07T0928.md
  - journal/ops/sessions/the-cut-card-and-the-wizard-2026-07-09T0134.md
  - journal/ops/sessions/the-bridge-and-the-table-2026-07-09T0406.md
detour: []
blocking: null
next: "Build the per-hand notes input (harness `note` field on the round JSONL line) and wire GameController.reshuffle() into Controls.tsx/Table.tsx so Free Play crosses the shoe boundary."
note: "Milestone close — ts-ui-bridge shipped (session the-bridge-and-the-table-2026-07-09T0406). Browser-playable Free Play over the Rust core via WASM, built via subagent-driven-development (9 tasks: RNG width-fix, WASM boundary, golden fixtures, Vite/React scaffold, wire types, transports, LogSink, GameController, table UI) with Fable pre-build/plan/whole-branch reviews. Bridge spec docs/superpowers/specs/2026-07-09-ts-ui-bridge-design.md, plan docs/superpowers/plans/2026-07-09-ts-ui-bridge.md. Merged to main locally (push:false): merges ec8386f + d4afda8; 46 Rust + 17 web tests green. Craft gate FAIL-minor ACCEPTED [f]: Fire partial — GameController.reshuffle() unwired in the UI so Free Play dead-ends at penetration on a raw \"shoe must reshuffle\" error; accepted because reshuffle UX was a documented open question in the ts-ui-bridge spec (core+controller support it) and is bundled into the next UI cycle. Also added data/history/ as the JSONL export home."
---
