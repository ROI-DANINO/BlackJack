# Decisions — ADR Sink

> One terse entry per real decision: *what* we chose and *why*, appended by `codex-end` at each
> milestone/cycle close. Newest at the bottom.

| Date | Decision | Why |
|------|----------|-----|
| 2026-07-07 | V1 simulator core starts in Rust; TypeScript owns browser UI/app shell; Python owns research/data tooling. | Blackjack is simulation-heavy, and starting the durable card/shoe/round/betting core in Rust avoids a likely TypeScript-to-Rust migration when deterministic high-volume training and analysis arrive. |
