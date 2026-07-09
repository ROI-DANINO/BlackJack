# QA Ledger

> Coverage state + findings register. Process: `docs/specs/qa-playtest-process.md`.
> Before scoping any QA run, read this file; "already tested?" is answered by diffing an
> area's files since its **Last-passed commit**, never by memory. After every run, update
> both tables. Run reports live in `journal/qa/runs/`.

## Coverage areas

Verdicts: `PASS` / `FAIL` / `never-run`. Deep-test an area when its files changed since the
recorded commit (or it has never run); smoke-test otherwise.

| Area | Watched files | Last run | Last-passed commit | Verdict | Notes |
|------|---------------|----------|--------------------|---------|-------|
| Engine rules & math | `crates/` | 2026-07-09-v1-milestone | 6121a51 | PASS | 55 Rust tests + 300+ rounds independently re-derived in-browser (H17, payouts, split legality) |
| UI/wire fidelity (display ↔ engine ↔ JSONL) | `web/src/`, `crates/` wire types | 2026-07-09-v1-milestone | 6121a51 (WASM rebuilt) | PASS | passed only after mid-run WASM rebuild — see QA-001/QA-002 |
| Betting & payout math (bankroll, 3:2, push, split/double stakes) | `web/src/`, `crates/` | 2026-07-09-v1-milestone | 6121a51 | PASS | zero discrepancies over 145 fully re-derived rounds |
| Round & state flow (turns, buttons, reset, reshuffle) | `web/src/` | 2026-07-09-v1-milestone | 6121a51 | PASS | 403 snapshots, no stuck states; QA-004 open (UX-major, not flow-breaking) |
| Player experience & clarity | `web/src/` | 2026-07-09-v1-milestone | 6121a51 | PASS-with-reservations | "technically functional, not yet fun"; QA-005/006 open |
| Robustness (rapid input, illegal actions, refresh, long grind) | `web/src/` | 2026-07-09-v1-milestone | — | **FAIL** | QA-003 blocker (history dup); QA-007/008 open; otherwise abuse-resistant, 0 console errors |
| Product readiness (V1 gate) | whole build | 2026-07-09-v1-milestone | — | remediate-then-go | 6-item remediation list, then V2. Not external-playtest-ready. See `runs/2026-07-09-v1-milestone/product-review.md` |

## Findings register

IDs `QA-NNN`, stable forever. Status: `open` → `fixed` → `verified`, or `wontfix` (+reason).
Only `verified` closes a finding; `fixed` items get a targeted re-test in the next run.

| ID | Found in run | Area | Severity | Summary | Status |
|----|--------------|------|----------|---------|--------|
| QA-001 | 2026-07-09-v1-milestone | build pipeline | major | WASM artifact (gitignored) is not rebuilt/verified when `crates/` changes; stale engine served silently — green suites don't prove the browser build | fixed (08937da) — awaiting targeted re-test |
| QA-002 | 2026-07-09-v1-milestone | UI/wire fidelity | blocker | Mixed-rank ten-value pairs never offered Split (7/7) — root cause: stale WASM (QA-001); engine correct; Split verified 4/4 after rebuild + sane split round logged | **verified** (closed 2026-07-09) |
| QA-003 | 2026-07-09-v1-milestone | robustness | blocker | Same-tick double-click on Deal/Download writes a duplicate round line to history JSONL (`game.ts` `writePending` nulls `pendingLine` after the awaited write; reproduced 3 ways) | fixed (ed71d38) — awaiting targeted re-test |
| QA-004 | 2026-07-09-v1-milestone | round & state flow | major | No indication of which hand is active during a split; `active_hand_index` on the wire but never rendered | fixed (c460438) — awaiting targeted re-test |
| QA-005 | 2026-07-09-v1-milestone | player experience | major | No hand totals displayed (player or dealer) — every decision requires mental math | fixed (cf59ae0) — awaiting targeted re-test |
| QA-006 | 2026-07-09-v1-milestone | player experience | major | Bet amount not shown pre-deal and not changeable; only visible via outcome deltas | open — backlog (display cheap now; controls V2/V3) |
| QA-007 | 2026-07-09-v1-milestone | robustness | major | Bankroll below flat bet → dead end: Deal rejected, no reset/new-session control; only escape is refresh | fixed (5e6a580) — awaiting targeted re-test |
| QA-008 | 2026-07-09-v1-milestone | robustness | major | Refresh silently wipes the session — no warning, no autosave | open — backlog (`beforeunload` confirm is cheap) |
| QA-009 | 2026-07-09-v1-milestone | product | decision | Fixed seed `'free-play'` (`Table.tsx:29`): every session deals the byte-identical shoe | fixed (9056a53, e2d59b7) — random per-session seed, displayed + logged |
| QA-010 | 2026-07-09-v1-milestone | player experience | minor | "Insurance auto-declined" note gives no amount/explanation | open — backlog |
| QA-011 | 2026-07-09-v1-milestone | player experience | minor | Bust vs lose-to-dealer render identically ("Loss (−$X)"), no bust flag | open — backlog |
| QA-012 | 2026-07-09-v1-milestone | robustness | minor | Rejected-click error text lingers in the status line until next successful action | open — backlog |
| QA-013 | 2026-07-09-v1-milestone | player experience | minor | Note field strips newlines (single-line input) and visually crowds the Download button | open — backlog |
| QA-014 | 2026-07-09-v1-milestone | player experience | note | Unstyled UI reads as a debug harness — explicitly V3 scope, recorded so it isn't re-reported | open — V3 |

**Coverage gaps carried forward:** split aces never dealt (deterministic shoe); 3–4-way
resplits; double/split bankroll boundary observed in source only; multi-tab races untried.

## Run log

| Date | Run | Type | Commit | Report dir | Outcome |
|------|-----|------|--------|------------|---------|
| 2026-07-09 | v1-milestone | milestone QA (first run, all deep) | 6121a51 (+WASM rebuild) | `runs/2026-07-09-v1-milestone/` | 14 findings (2 blockers: QA-002 verified-closed, QA-003 open); verdict: remediate 6 items, then V2 |
