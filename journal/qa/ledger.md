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
| UI/wire fidelity (display ↔ engine ↔ JSONL) | `web/src/`, `crates/` wire types | 2026-07-10-qa-suite | c5aff12 | PASS | **now guarded by `qa:rules`** — 90 rounds re-derived, 12/12 situations ≥2×, 0 violations. (Orig. passed only after mid-run WASM rebuild — QA-001/QA-002.) |
| Betting & payout math (bankroll, 3:2, push, split/double stakes) | `web/src/`, `crates/` | 2026-07-10-qa-suite | c5aff12 | PASS | **now guarded by `qa:rules`** — H17, payout multipliers, split/double scaling, bankroll chain re-derived per round, 0 discrepancies |
| Round & state flow (turns, buttons, reset, reshuffle) | `web/src/` | 2026-07-10-qa-suite | c5aff12 | PASS | **now guarded by `qa:flow`** — 273 snapshots, 29 split-turn, 1 reshuffle, 0 violations; QA-004 active-hand marker positively verified |
| Player experience & clarity | `web/src/` | 2026-07-10-v1-remediation-retest | 30ec927 | PASS-with-reservations | QA-005 (totals) verified 2026-07-10; QA-006 open backlog; "functional, polish is V2/V3" |
| Robustness (rapid input, illegal actions, refresh, long grind) | `web/src/` | 2026-07-10-qa-suite | c5aff12 | PASS | **now guarded by `qa:breakit`** — 12/12 attacks, 0 breaks. QA-003/QA-007 verified; QA-008 (refresh wipe)/QA-012 open backlog, non-blocking |
| Product readiness (V1 gate) | whole build | 2026-07-10-v1-remediation-retest | 30ec927 | GO (for V2) | 6-item remediation list all verified 2026-07-10 → V1 gate cleared, V2 Basic Strategy unblocked. Still not external-playtest-ready (QA-006/008/010–014 backlog; styling V3). See `runs/2026-07-09-v1-milestone/product-review.md` |
| QA script suite (`web/qa/`: rules+flow+breakit) | `web/qa/`, `web/src/` | 2026-07-10-qa-suite | c5aff12 | PASS | `cd web && npm run qa` runs all three Tier-1 scripts; non-zero exit gates the milestone. Reports in `runs/<date>-{rules,flow,breakit}/`; breaks triaged into QA-NNN by hand (scripts never auto-edit this ledger). See `docs/specs/2026-07-10-qa-script-suite.md`. |

## Findings register

IDs `QA-NNN`, stable forever. Status: `open` → `fixed` → `verified`, or `wontfix` (+reason).
Only `verified` closes a finding; `fixed` items get a targeted re-test in the next run.

| ID | Found in run | Area | Severity | Summary | Status |
|----|--------------|------|----------|---------|--------|
| QA-001 | 2026-07-09-v1-milestone | build pipeline | major | WASM artifact (gitignored) is not rebuilt/verified when `crates/` changes; stale engine served silently — green suites don't prove the browser build | **verified** (2026-07-10) — touch lib.rs → `npm test` aborts with stale-wasm message; `build:wasm` heals, 41/41 pass |
| QA-002 | 2026-07-09-v1-milestone | UI/wire fidelity | blocker | Mixed-rank ten-value pairs never offered Split (7/7) — root cause: stale WASM (QA-001); engine correct; Split verified 4/4 after rebuild + sane split round logged | **verified** (closed 2026-07-09) |
| QA-003 | 2026-07-09-v1-milestone | robustness | blocker | Same-tick double-click on Deal/Download writes a duplicate round line to history JSONL (`game.ts` `writePending` nulls `pendingLine` after the awaited write; reproduced 3 ways) | **verified** (2026-07-10) — no dupes across 13 rounds / 3 downloads incl. double-click Download; Deal now self-guards (deals too fast to double-click). Caveat: same-tick Deal race unreachable by manual input — verified via download-behavior + tests |
| QA-004 | 2026-07-09-v1-milestone | round & state flow | major | No indication of which hand is active during a split; `active_hand_index` on the wire but never rendered | **verified** (2026-07-10) — active-hand marker renders and advances correctly on a split |
| QA-005 | 2026-07-09-v1-milestone | player experience | major | No hand totals displayed (player or dealer) — every decision requires mental math | **verified** (2026-07-10) — totals shown; soft `x/y`, blackjack `21`, dealer `(X + ?)` then full reveal |
| QA-006 | 2026-07-09-v1-milestone | player experience | major | Bet amount not shown pre-deal and not changeable; only visible via outcome deltas | open — backlog (display cheap now; controls V2/V3) |
| QA-007 | 2026-07-09-v1-milestone | robustness | major | Bankroll below flat bet → dead end: Deal rejected, no reset/new-session control; only escape is refresh | **verified** (2026-07-10) — New session always present; flushes prior buffered round under the OLD session_id before the new header (JSONL confirmed) |
| QA-008 | 2026-07-09-v1-milestone | robustness | major | Refresh silently wipes the session — no warning, no autosave | open — backlog (`beforeunload` confirm is cheap) |
| QA-009 | 2026-07-09-v1-milestone | product | decision | Fixed seed `'free-play'` (`Table.tsx:29`): every session deals the byte-identical shoe | **verified** (2026-07-10) — seed renders `fp-…`, changes per session; JSONL `session_header.seed` matches the on-screen VALUE (not just the label) |
| QA-010 | 2026-07-09-v1-milestone | player experience | minor | "Insurance auto-declined" note gives no amount/explanation | open — backlog |
| QA-011 | 2026-07-09-v1-milestone | player experience | minor | Bust vs lose-to-dealer render identically ("Loss (−$X)"), no bust flag | open — backlog |
| QA-012 | 2026-07-09-v1-milestone | robustness | minor | Rejected-click error text lingers in the status line until next successful action | open — backlog |
| QA-013 | 2026-07-09-v1-milestone | player experience | minor | Note field strips newlines (single-line input) and visually crowds the Download button | open — backlog |
| QA-014 | 2026-07-09-v1-milestone | player experience | note | Unstyled UI reads as a debug harness — explicitly V3 scope, recorded so it isn't re-reported | open — V3 |

**Coverage gaps carried forward:** split aces never dealt (deterministic shoe); 3–4-way
resplits; double/split bankroll boundary observed in source only; multi-tab races untried.

**Remediation-branch backlog (final whole-branch review, 2026-07-09 — none block merge):**
targeted re-test should verify the seed VALUE renders (jsdom test only checks the label) and
click-hammer New session in the real browser; `writePending`'s claim-before-await must be
revisited when V2 adds a truly async sink (a suspending write could let `downloadLog` export
without the in-flight round); Deal+New-session same-tick interleave can write a round line
after the new header (correct session_id, wrong file position); wasm freshness guard doesn't
watch `Cargo.lock`/`build-wasm.sh`; `Table.tsx` duplicates the startSession handler (extract
`startFresh()` when bet controls arrive); HandView `hideFrom=0` shows no total; totals tests
lack A,2,4 soft and A,A,9 soft-21 cases; no negative active-marker assertions (single-hand /
resolved rounds).

## Run log

| Date | Run | Type | Commit | Report dir | Outcome |
|------|-----|------|--------|------------|---------|
| 2026-07-09 | v1-milestone | milestone QA (first run, all deep) | 6121a51 (+WASM rebuild) | `runs/2026-07-09-v1-milestone/` | 14 findings (2 blockers: QA-002 verified-closed, QA-003 open); verdict: remediate 6 items, then V2 |
| 2026-07-10 | v1-remediation-retest | targeted feature-QA re-test (manual, Roi playing) | 30ec927 | — | 6 remediated findings (QA-001/003/004/005/007/009) re-tested against running build → all **verified**; V1 gate cleared for V2. QA-003 caveat: same-tick Deal race unreachable by manual input |
| 2026-07-10 | qa-suite | Tier-1 script suite (first run of qa:rules + qa:flow; qa:breakit restructured) | c5aff12 | `runs/2026-07-10-{rules,flow,breakit}/` | All PASS: rules 90 rounds/12-of-12 situations/0 violations, flow 273 snapshots/0 violations, breakit 12/12. No new findings. Replaces mechanical pack agents 1/2/4 with deterministic scripts |
