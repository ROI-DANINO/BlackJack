# Basic Strategy Oracle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a tested Rust-owned Basic Strategy oracle for the locked V1 blackjack ruleset.

**Architecture:** A new core module stores the verified BlackjackInfo chart as compact immutable row strings and maps a current player hand, dealer upcard, and existing legal actions to one recommended legal action. Existing simulator legality stays authoritative; this plan adds no UI, WASM, JSON protocol, AI, or runtime probability calculation.

**Tech Stack:** Rust 2024, existing `blackjack-core` crate, built-in Rust test framework.

## Global Constraints

- Canonical source: `docs/superpowers/specs/2026-07-10-basic-strategy-oracle-design.md`.
- Support only `v1-modern-classic-h17-6d`; reject another ruleset ID explicitly.
- `D` falls back to Hit; `DS` falls back to Stand; an unavailable Split uses hard/soft strategy.
- Returned actions must already be legal. No dependencies or new abstractions.

---

## File Structure

- Create: `crates/blackjack-core/src/strategy.rs` — chart constants and lookup.
- Modify: `crates/blackjack-core/src/lib.rs` — export the strategy module.
- Modify: `crates/blackjack-core/src/rules.rs` — make rank value crate-visible.
- Create: `crates/blackjack-core/tests/strategy_tests.rs` — chart and fallback tests.

### Task 1: Define the chart contract in tests

**Files:**
- Create: `crates/blackjack-core/tests/strategy_tests.rs`

**Interfaces:**
- Produces the failing public interface: `basic_strategy_action(hand: &HandState, dealer_upcard: &Card, ruleset: &Ruleset, legal_actions: &[Action]) -> Result<Option<Action>, String>`.

- [ ] **Step 1: Write failing source-cell tests**

Use dealer columns `2,3,4,5,6,7,8,9,10,A`. Make two-card initial hands and use `legal_actions(&hand, &v1_h17_ruleset(), 1, 100)`. Assert all chart cells with these exact source rows (`X` means double-or-stand):

```rust
const HARD: [&str; 14] = [
    "HHHHHHHHHH", "HHHHHHHHHH", "HHHHHHHHHH", "HHHHHHHHHH",
    "HDDDDHHHHH", "DDDDDDDDHH", "DDDDDDDDDD", "HHSSSHHHHH",
    "SSSSSHHHHH", "SSSSSHHHHH", "SSSSSHHHHH", "SSSSSHHHHH",
    "SSSSSSSSSS", "SSSSSSSSSS",
];
const SOFT: [&str; 8] = [
    "HHHDDHHHHH", "HHHDDHHHHH", "HHDDDHHHHH", "HHDDDHHHHH",
    "HDDDDHHHHH", "XXXXXSSHHH", "SSSSSXSSSS", "SSSSSSSSSS",
];
const PAIRS: [&str; 10] = [
    "PPPPPPHHHH", "PPPPPPHHHH", "HHHPPHHHHH", "DDDDDDDDHH",
    "PPPPPHHHHH", "PPPPPPHHHH", "PPPPPPPPPP", "PPPPPSPPSS",
    "SSSSSSSSSS", "PPPPPPPPPP",
];
```

Use hard hands `2+3` through `2+10`, then `3+10` through `7+10`, and `8+10` for 18+. Use soft hands `A+2` through `A+9`. Use pair rows `2,2` through `10,10`, then `A,A`. Map `H/S/D/X/P` to `Hit/Stand/Double/Double/Split`.

- [ ] **Step 2: Add failing fallback tests**

Assert these exact cases, plus empty legal actions and an unsupported ruleset ID:

```rust
assert_eq!(recommend(&[Rank::Ace, Rank::Six], Rank::Three, &[Action::Hit, Action::Stand]), Action::Hit);
assert_eq!(recommend(&[Rank::Ace, Rank::Seven], Rank::Two, &[Action::Hit, Action::Stand]), Action::Stand);
assert_eq!(recommend(&[Rank::Eight, Rank::Eight], Rank::Ten, &[Action::Hit, Action::Stand]), Action::Hit);
assert_eq!(recommend(&[Rank::Ace, Rank::Ace], Rank::Ten, &[Action::Hit, Action::Stand]), Action::Hit);
assert_eq!(recommend(&[Rank::Ten, Rank::Queen], Rank::Six, &[Action::Hit, Action::Stand, Action::Double, Action::Split]), Action::Stand);
```

- [ ] **Step 3: Verify tests fail before implementation**

Run: `cargo test -p blackjack-core --test strategy_tests`

Expected: FAIL because `basic_strategy_action` does not exist.

- [ ] **Step 4: Commit the test contract**

```bash
git add crates/blackjack-core/tests/strategy_tests.rs
git commit -m "test: define basic strategy oracle contract"
```

### Task 2: Implement the compact engine oracle

**Files:**
- Create: `crates/blackjack-core/src/strategy.rs`
- Modify: `crates/blackjack-core/src/lib.rs`
- Modify: `crates/blackjack-core/src/rules.rs`

**Interfaces:**
- Consumes: Task 1's function signature and existing `score_hand`, `Action`, `Rank`, and `Card`.
- Produces: `basic_strategy_action` for later drills, hints, and review.

- [ ] **Step 1: Wire the module**

Add `pub mod strategy;` and `pub use strategy::*;` to `src/lib.rs`. Change `fn rank_value(rank: &Rank) -> u8` in `src/rules.rs` to `pub(crate) fn rank_value(rank: &Rank) -> u8`.

- [ ] **Step 2: Add the lookup**

Create `src/strategy.rs` using the same three exact chart rows from Task 1 and a private:

```rust
enum ChartMove { Hit, Stand, DoubleHit, DoubleStand, Split }
```

Implement the public function with this guard:

```rust
if ruleset.id != "v1-modern-classic-h17-6d" {
    return Err(format!("basic strategy unavailable for ruleset: {}", ruleset.id));
}
if legal_actions.is_empty() || hand.is_complete || score_hand(&hand.cards).is_bust {
    return Ok(None);
}
```

For an exactly two-card equal-value pair, use its pair row first. Return Split only when it is legal; otherwise calculate from hard/soft totals. Normalize all ten-value ranks with `rules::rank_value`. Use soft rows 13–20, hard rows 5–17 and 18+, and Hit for soft 12 (`A,A`) when Split is unavailable. Convert `DoubleHit` and `DoubleStand` using the supplied legal actions. Return `Err("basic strategy recommendation is not legal".to_string())` if the final action is not legal.

- [ ] **Step 3: Verify focused tests pass**

Run: `cargo test -p blackjack-core --test strategy_tests`

Expected: PASS; 320 source cells and every fallback pass.

- [ ] **Step 4: Run core regression checks**

Run: `cargo test -p blackjack-core && cargo fmt --check && cargo clippy -p blackjack-core -- -D warnings`

Expected: all commands exit 0.

- [ ] **Step 5: Commit implementation**

```bash
git add crates/blackjack-core/src/strategy.rs crates/blackjack-core/src/lib.rs crates/blackjack-core/src/rules.rs
git commit -m "feat: add basic strategy oracle"
```

### Task 3: Run feature QA and update the ledger

**Files:**
- Modify: `journal/qa/ledger.md`
- Create: `journal/qa/runs/2026-07-10-strategy-oracle/strategy-oracle.md`

**Interfaces:**
- Consumes: passing Task 2 output.
- Produces: a ledger-backed feature-QA verdict for changed engine rules.

- [ ] **Step 1: Scope the run from the ledger**

Run: `sed -n '1,180p' journal/qa/ledger.md`

Expected: deep-test the new oracle because `crates/` changed; smoke-test existing engine behavior.

- [ ] **Step 2: Run scoped feature QA**

Run: `cargo test -p blackjack-core --test strategy_tests && cargo test -p blackjack-core`

Expected: source cells, fallbacks, and all existing engine tests pass.

- [ ] **Step 3: Record QA precisely**

Write the tested commit, 320-cell coverage, fallback coverage, regression command, verdict, and findings to the report. Update the engine-rules ledger row's last-passed commit only for PASS.

- [ ] **Step 4: Commit QA evidence**

```bash
git add journal/qa
git commit -m "test: record strategy oracle feature QA"
```
