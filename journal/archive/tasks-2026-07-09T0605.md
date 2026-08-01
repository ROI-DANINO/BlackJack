# Tasks — Current Phase Only

> Only the current phase gets detailed tasks. Future work lives in ROADMAP.md.
> codex-end archives this file to ops/archive/ before mutating it.

## Active - phase boundary: V1 Free Play skeleton complete -> decide direction
V1 Free Play exit criteria are met (craft gate PASS). The scoped Free Play polish pass fixed the
split-legality gap and made resolved outcomes plus auto-declined insurance visible in the UI.

- [ ] **Decide the next phase**: move to V2 Basic Strategy, unless a fresh playtest exposes a
      small V1 blocker.

## Ideas (captured from playtest notes)
- How should the BlackjackInfo chart be encoded into the first machine-readable Basic Strategy table? (V2)

## Done — V1 Free Play polish pass
- [x] **Split legality** — any two 10-value cards (10/J/Q/K) can split through the shared core
      legal-action rule.
- [x] **Per-hand outcome indicator** — the table shows win/loss/push/blackjack after resolution.
- [x] **Insurance visibility** — dealer-ace insurance auto-decline is visible instead of silent;
      no player-taken insurance flow added for V1.

## Done — Free Play UI polish cycle (shipped 2026-07-09, merged to main)
- [x] **Per-hand notes** (attach-on-Deal): GameController buffers the resolved round and writes it
      with an optional harness `note` field on the round JSONL line on Deal/Download. No core change.
- [x] **Auto-reshuffle at the shoe boundary** (+ notice) — closed the accepted Fire craft-minor;
      Free Play crosses shoes. rd-verify (opus) PASS; craft gate (sonnet) PASS; DRY cleanup (3a3bd6b).

## Done — earlier V1 milestones
- [x] TS UI bridge shipped — browser Free Play over the Rust core via WASM (see session
      the-bridge-and-the-table). Bridge spec/plan under docs/superpowers/.
- [x] Rust free-play simulator core (Tasks 1–6) + review remediation; blackjack extracted to its
      own repo. V1 ruleset locked.
