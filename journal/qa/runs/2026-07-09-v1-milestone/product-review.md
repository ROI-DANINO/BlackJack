# Product Review — V1 Milestone QA Synthesis

- **Build commit:** 6121a51 (+ WASM rebuilt from same commit mid-run — see QA-001/QA-002)
- **Run:** 2026-07-09-v1-milestone (first-ever QA run; all areas deep)
- **Reviewer:** Fable (orchestrator) — synthesis over four Sonnet playtest agents plus direct
  code verification of every load-bearing claim. Deviation from protocol noted: the reviewer
  did not personally play 5 rounds; agents played 300+ verified rounds and all key findings
  were re-verified in source (`Table.tsx`, `game.ts`, artifact timestamps) instead.
- **Agent reports in this dir:** `rules-payout-fidelity.md`, `state-round-flow.md`,
  `player-experience.md`, `edge-breaker.md`.

## What works — genuinely solid

- **The money math is exhaustively clean.** 127 + 18 + spot-checked rounds programmatically
  re-derived: zero payout, bankroll-delta, or dealer-H17 violations. 3:2 naturals vs 1:1
  post-split 21 correctly distinguished. This is the product's foundation and it holds.
- **Flow is unbreakable in practice.** 403 state snapshots: no stuck states, clean resets,
  correct control surfaces (Double vanishes after Hit, nothing actionable post-resolution).
- **Abuse-resistant.** Rapid clicks, races, stale-DOM clicks, refresh abuse, XSS attempts,
  150-round grinds: no console errors, flat memory, one real defect found (QA-003).
- **The QA process itself paid for its setup immediately** — QA-001/002 proved the previous
  milestone's headline fix never reached the browser build despite green suites.

## What blocks / what to fix before V2 (recommended remediation list)

| ID | Sev | Fix shape |
|----|-----|-----------|
| QA-001 | major | Tie WASM freshness to the core: make `dev`/`build`/`test` rebuild (or verify) the WASM when `crates/` changes. Without this, every future engine fix can silently miss the browser and invalidate QA. |
| QA-003 | blocker | `game.ts` flush race: null `pendingLine` before the awaited `sink.write` (or guard re-entry). Double-click Deal/Download currently duplicates a round in the history JSONL — corrupts the analytics record a training product depends on. |
| QA-004 | major | Render `active_hand_index` (already on the wire, never read): highlight the hand being played during splits. |
| QA-005 | major | Show hand totals (player + dealer visible total). A Basic-Strategy trainer that makes players do mental totals cannot teach; agents 1 and 3 both hit this. |
| QA-007 | major | Bankroll < bet is a dead end (Deal rejected, no reset/new-session control; only escape is refresh). Add a new-session/reset control. |
| QA-009 | decision | Fixed seed `'free-play'` (`Table.tsx:29`) deals the byte-identical shoe every session. Decide: random seed per session (logged for reproducibility) before any external playtest. |

## Backlog (fix later, tracked in ledger)

- QA-006 (major): bet amount invisible and unchangeable pre-deal — flat-bet is acceptable V1
  scope, but the amount should at least be displayed; full bet controls are V2/V3.
- QA-008 (major): refresh silently wipes the session — a `beforeunload` confirm is cheap;
  persistence is a later requirement per AGENTS.md storage policy.
- QA-010–013 (minor): insurance note unexplained; bust vs lose-to-dealer render identically;
  rejected-click error text lingers; note field strips newlines and crowds the Download button.
- QA-014 (note): unstyled UI — explicitly V3 scope ("training game polish"), not a V1 defect.

## Coverage gaps (carried to next run)

Split aces never dealt by the deterministic shoe; 3–4-way resplits unexercised; double/split
bankroll boundary source-verified but not observed live; multi-tab races unattempted.

## Gate verdicts

- **Ready for first external playtest?** **No.** The clarity majors (QA-004, QA-005) and the
  session dead-end (QA-007) would make a real tester's first session confusing, and QA-009
  would show every tester the identical cards. Player-experience verdict: "technically
  functional, not yet mildly fun."
- **Does the build match the intended direction?** Yes — honest shoe, traceable cards,
  engine-owned rules, UI as a thin client. Nothing found contradicts the mission.
- **Proceed to V2 Basic Strategy?** **Yes, after the remediation list above** (~6 small,
  well-localized fixes; each gets a scoped feature QA per the process, several are one-liners
  to a few hours). The foundations V2 builds on — engine correctness, wire fidelity,
  robustness of the round loop — are proven. Do not start V2 on top of QA-001 or QA-003:
  one silently invalidates future testing, the other corrupts the data V2's mastery
  tracking will need.

## Area verdicts recorded to ledger

| Area | Verdict |
|------|---------|
| Engine rules & math | PASS (strengthened: 300+ rounds independently re-derived) |
| UI/wire fidelity | PASS (after WASM rebuild; QA-002 verified-closed) |
| Betting & payout math | PASS |
| Round & state flow | PASS (QA-004 open, UX-major) |
| Player experience & clarity | PASS-with-reservations (QA-005/006 open) |
| Robustness | FAIL (QA-003 blocker; QA-007/008 open) |
| Product readiness (V1 gate) | Remediate 6 items, then V2. Not external-playtest-ready. |
