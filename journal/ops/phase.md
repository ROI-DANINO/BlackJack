---
phase: v1-simulation-foundations
sub_phase: ts-ui-bridge
plan: docs/plans/v1-simulation-foundations.md
spec: docs/specs/v1-simulation-foundations.md
step: "TS UI bridge over the core boundary — not started"
prior_phase: free-play-core
sessions:
  - journal/ops/sessions/initial-notes-indexed-20260707-034707.md
  - journal/ops/sessions/v1-ruleset-locked-20260707-035405.md
  - journal/ops/sessions/the-extraction-and-the-mend-2026-07-07T0928.md
  - journal/ops/sessions/the-cut-card-and-the-wizard-2026-07-09T0134.md
detour: []
blocking: null
next: "Build the TypeScript UI bridge over the JSON/WASM-ready core boundary."
note: "TS UI bridge still not started. This session was manual-testing + groundwork, not bridge work: verified the core live (cargo test + hand-played CLI rounds), built tools/play_cli.py (throwaway manual-play wizard), and commissioned an Opus round-history data analysis (journal/raw/_inbox/history-data-analysis-2026-07-09.md) recommending JSONL logging at the harness layer plus a resolved reveal-order-vs-shoe-true count derivation rule. Also clarified dealer_peek in the v1 spec as implicit/hardcoded, not a configurable field. No core code changed."
---
