# Decisions — ADR Sink

> One terse entry per real decision: *what* we chose and *why*, appended by `codex-end` at each
> milestone/cycle close. Newest at the bottom.

| Date | Decision | Why |
|------|----------|-----|
| 2026-07-07 | V1 simulator core starts in Rust; TypeScript owns browser UI/app shell; Python owns research/data tooling. | Blackjack is simulation-heavy, and starting the durable card/shoe/round/betting core in Rust avoids a likely TypeScript-to-Rust migration when deterministic high-volume training and analysis arrive. |
| 2026-07-07 | Extract blackjack into its own standalone git repo; the Projects spine gitignores it. | It had been wrongly committed into the spine; the spine constitution says sub-repos are their own git repos. `git subtree split` preserved all 25 commits; spine safety tag `backup/spine-decontam-20260707`. |
| 2026-07-07 | Core money is integer minor units; 3:2 requires even wager units; the JSON boundary shares the same minor-unit state (no translation layer). | Truncating 3:2 payouts at the boundary broke the exact-money contract; keeping one representation end-to-end avoids rounding slop in training bankrolls. |
| 2026-07-07 | Dealer plays out only when a hand still contests it (not bust, not natural); reshuffle is an explicit recovery command; custom rulesets are validated at session creation. | Final-review fixes: drawing after all-terminal poisoned card-counting logs; penetration dead-ended Free Play; unvalidated rulesets could panic/overflow settlement. |
