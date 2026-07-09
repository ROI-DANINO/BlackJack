# Tasks — Current Phase Only

> Only the current phase gets detailed tasks. Future work lives in ROADMAP.md.
> codex-end archives this file to ops/archive/ before mutating it.

## Active — phase boundary: V1 Free Play skeleton complete → triage & decide direction
V1 Free Play exit criteria are met (craft gate PASS). Before picking the next phase, triage the
feedback captured during playtest (via the new notes feature):

- [ ] **Investigate the split-legality question FIRST (possible bug).** Playtest note: "shouldnt
      10♣ Q♣ be splitable? both are equal 10.." (and "also should have a split in my opinion").
      Check the core's split rule (`current_legal_actions` / split gating in `session.rs`): does it
      require equal *rank* or equal *value*? Standard casino rules let you split any two 10-value
      cards (10/J/Q/K). Decide: real gap to fix, or intended V1 simplification to document.
- [ ] **Decide the next phase**: V1 Free Play polish (per-hand win/lose/push outcome indicator;
      split fix if the above is a gap; insurance take/decline UI) vs. moving to V2 Basic Strategy.

## Ideas (captured from playtest notes)
- Per-hand **win/lose/push indicator** in the UI after resolution (requested twice).
- **Insurance option** UI (insurance is modeled as auto-decline today).
- (The split-10 question is promoted to an Active task above.)
- How should the BlackjackInfo chart be encoded into the first machine-readable Basic Strategy table? (V2)

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
