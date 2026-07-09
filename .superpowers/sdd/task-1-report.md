# Task 1 Report: Fix 10-Value Split Eligibility In The Core

Implemented Task 1 from `.superpowers/sdd/task-1-brief.md` in the Rust core only.

## What changed

1. Updated `crates/blackjack-core/src/rules.rs` so split eligibility uses blackjack split value, not raw rank equality:
   `Ten`, `Jack`, `Queen`, and `King` now count as the same split value.
2. Added the two requested direct rule tests to `crates/blackjack-core/tests/rules_tests.rs`.
3. Added the requested session-level regression to `crates/blackjack-core/tests/session_tests.rs`.

## TDD evidence

### RED

Ran the focused tests after adding the new test cases and before changing the rule:

```bash
cargo test -p blackjack-core allows_split_for_any_two_ten_value_cards
cargo test -p blackjack-core ten_and_face_card_can_split_through_session_legal_actions
```

Both failed as expected with the old `hand.cards[0].rank == hand.cards[1].rank` check:

```text
assertion `left == right` failed
  left: [Hit, Stand, Double]
 right: [Hit, Stand, Double, Split]
```

and:

```text
assertion failed: current_legal_actions(&session).expect("legal").contains(&Action::Split)
```

### GREEN

After the rule fix, ran the focused checks requested in the brief:

```bash
cargo test -p blackjack-core allows_split_for_any_two_ten_value_cards
cargo test -p blackjack-core rejects_split_for_different_non_ten_values
cargo test -p blackjack-core ten_and_face_card_can_split_through_session_legal_actions
```

All three passed.

### Full core suite

Ran:

```bash
cargo test -p blackjack-core
```

The full `blackjack-core` suite passed with 0 failures.

## Self-review

- The change stays on the shared rule path in `rules.rs`, so every caller gets the fix.
- The new tests cover both sides of the behavior: ten-value pair allowed, mismatched non-ten pair rejected.
- The session regression proves the rule change is visible through `current_legal_actions`, not just the direct helper.
- No web files or docs were touched.

## Commit

Committed the work after verification.
