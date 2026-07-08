# Run Notes

Compact per-session decision/state notes (newest first).

## 2026-07-09 — Manual testing, play wizard, round-history data design
- **Verified the core is real, not just tested**: ran `cargo test` (45 green) and drove the
  `blackjack-core` CLI directly over stdin/stdout JSON (`start_session` → `start_round` →
  `legal_actions` → `apply_action`), confirming a live deterministic seeded shoe, correct
  3:2 blackjack payout, and correct H17 dealer auto-play (hits soft/hard <17, stands ≥17).
- **Built `tools/play_cli.py`**: a throwaway Python REPL wizard so a human can manually play
  hands against the same CLI boundary (hides dealer hole card during `player_turn`, shows only
  engine-reported legal actions, handles EOF/Ctrl-C cleanly). Not a product surface — a dev tool.
- **Round-history data design, via a resumed Opus 4.8 subagent** (read-only; output at
  `journal/raw/_inbox/history-data-analysis-2026-07-09.md`):
  - Recommends JSON Lines, written by the harness (not the Rust core, which stays a pure
    stateless function) — one `session_header` line + one `round` line per resolved round,
    each carrying the existing `RoundLog` verbatim. Zero core changes needed for this.
  - Rejected three premature core additions: an RNG audit trail (redundant — seed determines
    the shuffle), a running/true-count field (count system varies; it's a training-layer
    concept), a Basic-Strategy "optimal action" annotation (belongs to the future BS engine).
  - **Resolved a real design question**: shoe-true count (all cards drawn, hole card included
    at deal time) vs. player-perceived count (excludes the hole card until revealed — what a
    real counter could actually track) are both derivable from the *same* stored log; no need
    to store two orderings. The reveal-timing rule had to be corrected mid-review: `RoundLog`
    has no `status` field, so "reveal = once status leaves `player_turn`" is structurally
    inapplicable to the persisted grain. Corrected rule: hole card (always `dealt_cards[3]`)
    reveals immediately if `actions` has zero `hit`/`stand`/`double`/`split` entries (naturals
    fast path), else right after the last such entry — handles splits/naturals with no
    special-casing.
- **Docs fix, not a code fix**: `docs/specs/v1-simulation-foundations.md`'s `dealer_peek: true`
  looked like a configurable `Ruleset` field but isn't — peek is hardcoded/unconditional in
  `finish_if_naturals`. Added a note clarifying this; no engine behavior changed (today's
  always-peek behavior already matches standard real-casino rules, so nothing was "broken").
- **State**: no core code changed this session. TS UI bridge sub-phase still not started.
- **Next**: build the TypeScript UI bridge; when doing so, add the do-now JSONL round logging
  to whatever harness replaces/extends `play_cli.py`.

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
