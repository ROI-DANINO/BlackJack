# Run Notes

Compact per-session decision/state notes (newest first).

## 2026-07-07 — Repo extraction + final-review remediation
- **Repo split**: `blackjack` was being committed *into* the Projects spine repo (branch `codex/rust-free-play-core`). Extracted it into its own standalone git repo at `~/Desktop/Projects/blackjack` via `git subtree split --prefix=blackjack` (25 commits, history preserved). Spine `master` now gitignores `blackjack/` and stopped tracking it; the accidental parent-spine commit (`wl rename sweep`) was moved onto spine `master`. Spine safety tag: `backup/spine-decontam-20260707`.
- **Finished the cut-off Codex session**: its final whole-branch review returned findings and the chat died before acting. Remediated all code findings via 3 parallel worktree-isolated TDD agents, integrated by cherry-pick onto `main`:
  - P1 dealer drew shoe cards after all hands terminal → guarded the dealer hit loop with a "any hand still contests" check (`!bust && !natural`).
  - P1 no reshuffle recovery at penetration → added `reshuffle_shoe` + `CoreCommand::Reshuffle` (next shoe, `shoe_number+1`, preserves bankroll/logs, rejects mid-round).
  - P2 unvalidated custom rulesets → `validate_ruleset` in `start_session` (payout finite/`>0`/`≤100`, decks `1..=8`, penetration `1..=100`, `max_split_hands ≥ 1`).
- **State**: 44 tests green, fmt + clippy clean on `main @ 5ffddbc`.
- **Next**: TypeScript UI bridge over the JSON/WASM-ready core boundary.

## 2026-07-07 — Closed the Water craft-gate finding
- Fixed the deferred milestone finding via TDD: `RoundLog.ruleset_id: String` → `RoundLog.ruleset: Ruleset` (types.rs + session.rs), so a hand on any custom (validated) ruleset is reproducible from its log alone. New test `round_log_tests.rs`. Commit `1c59fd7`. 45 tests green, fmt + clippy clean. Craft gate now clean (all four criteria met). Ledger (tasks/phase/session/memory) updated to mark it done.
