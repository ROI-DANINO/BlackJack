# Decisions — ADR Sink

> One terse entry per real decision: *what* we chose and *why*, appended by `codex-end` at each
> milestone/cycle close. Newest at the bottom.

| Date | Decision | Why |
|------|----------|-----|
| 2026-07-07 | V1 simulator core starts in Rust; TypeScript owns browser UI/app shell; Python owns research/data tooling. | Blackjack is simulation-heavy, and starting the durable card/shoe/round/betting core in Rust avoids a likely TypeScript-to-Rust migration when deterministic high-volume training and analysis arrive. |
| 2026-07-07 | Extract blackjack into its own standalone git repo; the Projects spine gitignores it. | It had been wrongly committed into the spine; the spine constitution says sub-repos are their own git repos. `git subtree split` preserved all 25 commits; spine safety tag `backup/spine-decontam-20260707`. |
| 2026-07-07 | Core money is integer minor units; 3:2 requires even wager units; the JSON boundary shares the same minor-unit state (no translation layer). | Truncating 3:2 payouts at the boundary broke the exact-money contract; keeping one representation end-to-end avoids rounding slop in training bankrolls. |
| 2026-07-07 | Dealer plays out only when a hand still contests it (not bust, not natural); reshuffle is an explicit recovery command; custom rulesets are validated at session creation. | Final-review fixes: drawing after all-terminal poisoned card-counting logs; penetration dead-ended Free Play; unvalidated rulesets could panic/overflow settlement. |
| 2026-07-09 | Deliver the core to the browser via client-side WASM (not a Node/CLI server). | The core is a pure stateless `command→state` fn and the client owns state, so a server holds nothing; WASM re-hosts the identical compiled Rust, keeps determinism, and is static-deployable (a trainer should become a static site). |
| 2026-07-09 | Hand-author the TS wire types, guarded by Rust-emitted golden fixtures (incl. a played-to-resolution fixture) + a compile-time-typed contract test, instead of generating them with ts-rs. | Preserves the anti-drift guarantee (a rename fails the contract test at compile time) while removing ts-rs tool-integration risk on a frozen boundary; every step stays exactly specifiable. |
| 2026-07-09 | Width-safe RNG modulo in rng.rs (`(next_u64() % (upper as u64)) as usize`). | On wasm32 `usize` is 32-bit, so the old truncate-before-modulo dealt a different shoe than native — silently breaking cross-target determinism/replay while every native test stayed green. Behavior-preserving on 64-bit. |
| 2026-07-09 | History JSONL exports live in a dedicated gitignored `data/history/` (tracked README), not `journal/raw/_inbox`. | The journal inbox is for research notes folded into docs; gameplay data is a different artifact class and (public repo) must stay uncommitted. |
