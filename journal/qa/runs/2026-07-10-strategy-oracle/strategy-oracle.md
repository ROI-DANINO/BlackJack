# Strategy Oracle — Feature QA

- **Date:** 2026-07-10
- **Tested commit:** `bdda2f0321632074ca347443fc09dbd53f2a83c9` (`bdda2f0`)
- **Scope:** `crates/blackjack-core` changed since the Engine rules & math area's last-passed commit (`6121a51`). The new Basic Strategy oracle received deep test coverage; the pre-existing core engine suite received a regression smoke test.
- **Verdict:** **PASS**

## Deep test: Basic Strategy oracle

Command:

```text
cargo test -p blackjack-core --test strategy_tests
```

Result: **8 passed, 0 failed**.

- Source-chart coverage: all **320** cells passed: 140 hard-total cells, 80 soft-total cells, and 100 pair cells.
- Fallback and boundary coverage passed: unavailable double falls back to Hit; unavailable double-or-stand falls back to Stand; unavailable pair split falls back through hard/soft strategy; empty legal actions yield no recommendation; unsupported rulesets are rejected; natural blackjack yields no recommendation; a split ace-ten correctly recommends Stand when legal.

## Regression smoke: existing core engine

Command:

```text
cargo test -p blackjack-core
```

Result: **63 passed, 0 failed** (including the 8 strategy tests); no ignored or measured tests; doc tests passed with zero tests.

This covers the existing boundary, dealer-terminal, envelope, free-play, fixtures, reshuffle, RNG determinism, round-log, rules, ruleset-validation, session, and shoe suites.

## Findings and follow-up

No new QA findings. No open `fixed` findings applied to this engine-only change. The feature does not change `web/src/app/`, so Player Experience QA and browser QA scripts were out of scope for this feature run.
