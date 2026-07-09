# Tasks — Current Phase Only

> Only the current phase gets detailed tasks. Future work lives in ROADMAP.md.
> codex-end archives this file to ops/archive/ before mutating it.

## Active - V1 QA remediation, then V2
V1 milestone QA ran 2026-07-09 (`journal/qa/runs/2026-07-09-v1-milestone/`): money math,
flow, and abuse-resistance all solid; verdict = fix 6 items, then move to V2. Each fix gets a
scoped feature QA per `docs/specs/qa-playtest-process.md`; statuses live in `journal/qa/ledger.md`.

- [x] **QA-001 (major)** — tie WASM freshness to the core: `dev`/`build`/`test` must rebuild or
      verify `web/src/bridge/wasm/` when `crates/` changes (gitignored artifact went stale and
      silently dropped the split fix from the browser).
- [x] **QA-003 (blocker)** — history-duplication race: null `pendingLine` before the awaited
      `sink.write` in `web/src/bridge/game.ts` (double-click Deal/Download duplicates a JSONL round).
- [x] **QA-004 (major)** — render `active_hand_index`: highlight the active hand during splits.
- [x] **QA-005 (major)** — display hand totals (player + dealer visible total).
- [x] **QA-007 (major)** — add a reset/new-session control so bankroll < bet isn't a dead end.
- [x] **QA-009 (decision)** — replace fixed seed `'free-play'` (`Table.tsx:29`) with a random
      per-session seed, logged for reproducibility.
- [ ] **Move to V2 Basic Strategy** once the above are `verified` in the ledger.

## Done — V1 milestone QA (2026-07-09)
- [x] QA groundwork: process spec, coverage ledger, feature/milestone QA gates in AGENTS/ROADMAP.
- [x] Milestone QA pack run: 4 Sonnet playtest agents (~300 verified rounds) + Fable synthesis;
      14 findings; QA-002 (split-10 regression) root-caused to stale WASM and verified closed.

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
