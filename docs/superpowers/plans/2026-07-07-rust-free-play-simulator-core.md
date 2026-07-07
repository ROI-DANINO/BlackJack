# Rust Free Play Simulator Core Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Rust simulator core for V1 Free Play blackjack with seeded shoes, traceable cards, legal actions, betting, bankroll settlement, and JSON-shaped logs.

**Architecture:** Rust owns the durable simulator core. The crate exposes pure Rust functions for tests and a tiny JSON CLI boundary for the future TypeScript UI and Python tools. Browser WASM is intentionally not part of this plan; the same serializable command/state shape will support WASM later.

**Tech Stack:** Rust 1.96, Cargo, `serde`, `serde_json`, Rust unit/integration tests, stdin/stdout JSON CLI.

## Global Constraints

- Treat this as a training product, not gambling software.
- Do not fake card flow: build shoes, shuffle once, deal from the ordered shoe, and keep card origins traceable.
- Rust owns the simulator core: cards, shoe, shuffle, ruleset, round flow, betting, settlement, and log generation.
- TypeScript owns browser UI and app shell, but UI integration is not part of this plan.
- Python owns research/data/table-generation/analytics work, but Python runtime integration is not part of this plan.
- V1 storage is in-memory state. No database in this plan.
- The default V1 ruleset remains `v1-modern-classic-h17-6d`.
- H17 remains the default; S17 is a supported ruleset option.
- Insurance is represented as an offer event when the dealer shows an ace, but V1 auto-declines it and logs that decision.
- V1 skips lessons, Basic Strategy advice, multi-seat play, surrender, insurance decisions, side bets, table polish, replay UI, and WASM packaging.

---

## File Structure

- Create `Cargo.toml`: root Cargo workspace.
- Create `crates/blackjack-core/Cargo.toml`: simulator crate manifest.
- Create `crates/blackjack-core/src/lib.rs`: public exports.
- Create `crates/blackjack-core/src/types.rs`: serializable domain types shared by all modules.
- Create `crates/blackjack-core/src/rng.rs`: deterministic seed-to-random generator.
- Create `crates/blackjack-core/src/shoe.rs`: deck/shoe creation, shuffle, deal, discard, penetration.
- Create `crates/blackjack-core/src/rules.rs`: hand scoring, ruleset defaults, legal actions, dealer behavior.
- Create `crates/blackjack-core/src/session.rs`: session lifecycle, round flow, actions, settlement, logs.
- Create `crates/blackjack-core/src/boundary.rs`: JSON command/request/response boundary.
- Create `crates/blackjack-core/src/main.rs`: CLI wrapper around the JSON boundary.
- Create `crates/blackjack-core/tests/shoe_tests.rs`: shoe correctness tests.
- Create `crates/blackjack-core/tests/rules_tests.rs`: scoring/legal-action/dealer tests.
- Create `crates/blackjack-core/tests/session_tests.rs`: round, split/double, bankroll/log tests.
- Create `crates/blackjack-core/tests/boundary_tests.rs`: JSON command boundary tests.

---

### Task 1: Rust Workspace and Shared Types

**Files:**
- Create: `Cargo.toml`
- Create: `crates/blackjack-core/Cargo.toml`
- Create: `crates/blackjack-core/src/lib.rs`
- Create: `crates/blackjack-core/src/types.rs`

**Interfaces:**
- Consumes: no app code.
- Produces:
  - `Rank`, `Suit`, `Card`, `DealerSoft17`, `Ruleset`, `Action`
  - `HandState`, `DealerState`, `RoundState`, `SessionState`, `RoundLog`, `HandOutcome`
  - `cargo test -p blackjack-core`

- [ ] **Step 1: Create the root workspace manifest**

Write `Cargo.toml`:

```toml
[workspace]
members = ["crates/blackjack-core"]
resolver = "3"
```

- [ ] **Step 2: Create the core crate manifest**

Write `crates/blackjack-core/Cargo.toml`:

```toml
[package]
name = "blackjack-core"
version = "0.1.0"
edition = "2024"

[dependencies]
serde = { version = "1", features = ["derive"] }
serde_json = "1"
```

- [ ] **Step 3: Create the public module surface**

Write `crates/blackjack-core/src/lib.rs`:

```rust
pub mod types;

pub use types::*;
```

- [ ] **Step 4: Create serializable shared types**

Write `crates/blackjack-core/src/types.rs`:

```rust
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Deserialize, Eq, PartialEq, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum Rank {
    Ace,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Jack,
    Queen,
    King,
}

#[derive(Clone, Debug, Deserialize, Eq, PartialEq, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum Suit {
    Clubs,
    Diamonds,
    Hearts,
    Spades,
}

#[derive(Clone, Debug, Deserialize, Eq, PartialEq, Serialize)]
pub struct Card {
    pub card_id: String,
    pub deck_id: String,
    pub rank: Rank,
    pub suit: Suit,
}

#[derive(Clone, Debug, Deserialize, Eq, PartialEq, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum DealerSoft17 {
    Hit,
    Stand,
}

#[derive(Clone, Debug, Deserialize, PartialEq, Serialize)]
pub struct Ruleset {
    pub id: String,
    pub decks: u8,
    pub penetration_percent: u8,
    pub dealer_soft_17: DealerSoft17,
    pub blackjack_payout: f32,
    pub max_split_hands: usize,
    pub double_after_split: bool,
    pub resplit_aces: bool,
    pub split_aces_receive_one_card: bool,
    pub insurance_auto_decline: bool,
}

#[derive(Clone, Debug, Deserialize, Eq, PartialEq, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum Action {
    Hit,
    Stand,
    Double,
    Split,
}

#[derive(Clone, Debug, Deserialize, Eq, PartialEq, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum HandSource {
    Initial,
    Split,
}

#[derive(Clone, Debug, Deserialize, PartialEq, Serialize)]
pub struct HandState {
    pub cards: Vec<Card>,
    pub wager: i32,
    pub is_complete: bool,
    pub is_doubled: bool,
    pub source: HandSource,
}

#[derive(Clone, Debug, Deserialize, PartialEq, Serialize)]
pub struct DealerState {
    pub cards: Vec<Card>,
}

#[derive(Clone, Debug, Deserialize, Eq, PartialEq, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum RoundStatus {
    PlayerTurn,
    DealerTurn,
    Resolved,
}

#[derive(Clone, Debug, Deserialize, PartialEq, Serialize)]
pub struct RoundState {
    pub status: RoundStatus,
    pub bet: i32,
    pub active_hand_index: usize,
    pub dealer: DealerState,
    pub hands: Vec<HandState>,
    pub dealt_cards: Vec<Card>,
    pub actions: Vec<ActionLog>,
    pub bankroll_before: i32,
}

#[derive(Clone, Debug, Deserialize, PartialEq, Serialize)]
pub struct ShoeState {
    pub seed: String,
    pub shoe_number: u32,
    pub cards: Vec<Card>,
    pub cursor: usize,
    pub discard: Vec<Card>,
    pub penetration_index: usize,
}

#[derive(Clone, Debug, Deserialize, PartialEq, Serialize)]
pub struct SessionState {
    pub seed: String,
    pub ruleset: Ruleset,
    pub shoe: ShoeState,
    pub bankroll: i32,
    pub default_bet: i32,
    pub round: Option<RoundState>,
    pub logs: Vec<RoundLog>,
}

#[derive(Clone, Debug, Deserialize, PartialEq, Serialize)]
pub struct ActionLog {
    pub action: LoggedAction,
    pub hand_index: usize,
    pub card_id: Option<String>,
}

#[derive(Clone, Debug, Deserialize, Eq, PartialEq, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum LoggedAction {
    Hit,
    Stand,
    Double,
    Split,
    InsuranceDeclined,
}

#[derive(Clone, Debug, Deserialize, Eq, PartialEq, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum OutcomeResult {
    Win,
    Loss,
    Push,
    Blackjack,
}

#[derive(Clone, Debug, Deserialize, PartialEq, Serialize)]
pub struct HandOutcome {
    pub hand_index: usize,
    pub result: OutcomeResult,
    pub wager: i32,
    pub delta: i32,
}

#[derive(Clone, Debug, Deserialize, PartialEq, Serialize)]
pub struct RoundLog {
    pub seed: String,
    pub ruleset_id: String,
    pub shoe_number: u32,
    pub dealt_cards: Vec<Card>,
    pub actions: Vec<ActionLog>,
    pub outcomes: Vec<HandOutcome>,
    pub bankroll_before: i32,
    pub bankroll_after: i32,
    pub bankroll_delta: i32,
    pub penetration_reached: bool,
}
```

- [ ] **Step 5: Run the first compile check**

Run:

```bash
cargo test -p blackjack-core
```

Expected: PASS with zero tests.

- [ ] **Step 6: Commit**

```bash
git add Cargo.toml crates/blackjack-core/Cargo.toml crates/blackjack-core/src/lib.rs crates/blackjack-core/src/types.rs
git commit -m "feat: scaffold rust simulator core"
```

---

### Task 2: Deterministic Shoe and Card Origins

**Files:**
- Create: `crates/blackjack-core/src/rng.rs`
- Create: `crates/blackjack-core/src/shoe.rs`
- Create: `crates/blackjack-core/tests/shoe_tests.rs`
- Modify: `crates/blackjack-core/src/lib.rs`

**Interfaces:**
- Consumes: `Card`, `Rank`, `ShoeState`, `Suit`.
- Produces:
  - `create_shoe(decks: u8, seed: &str, penetration_percent: u8, shoe_number: u32) -> Result<ShoeState, String>`
  - `deal_card(shoe: &mut ShoeState) -> Result<Card, String>`
  - `discard_cards(shoe: &mut ShoeState, cards: Vec<Card>)`
  - `needs_shuffle(shoe: &ShoeState) -> bool`

- [ ] **Step 1: Write failing shoe tests**

Write `crates/blackjack-core/tests/shoe_tests.rs`:

```rust
use blackjack_core::{create_shoe, deal_card, discard_cards, needs_shuffle};
use std::collections::HashSet;

#[test]
fn creates_seeded_six_deck_shoe_with_unique_origins() {
    let shoe = create_shoe(6, "v1-seed", 75, 1).expect("shoe");
    let origins: HashSet<String> = shoe
        .cards
        .iter()
        .map(|card| format!("{}:{}", card.deck_id, card.card_id))
        .collect();

    assert_eq!(shoe.cards.len(), 312);
    assert_eq!(origins.len(), 312);
    assert_eq!(shoe.cursor, 0);
    assert!(shoe.discard.is_empty());
    assert_eq!(shoe.penetration_index, 234);
}

#[test]
fn shuffles_deterministically_by_seed() {
    let first: Vec<String> = create_shoe(6, "same-seed", 75, 1)
        .expect("shoe")
        .cards
        .into_iter()
        .take(8)
        .map(|card| card.card_id)
        .collect();
    let second: Vec<String> = create_shoe(6, "same-seed", 75, 1)
        .expect("shoe")
        .cards
        .into_iter()
        .take(8)
        .map(|card| card.card_id)
        .collect();
    let different: Vec<String> = create_shoe(6, "other-seed", 75, 1)
        .expect("shoe")
        .cards
        .into_iter()
        .take(8)
        .map(|card| card.card_id)
        .collect();

    assert_eq!(first, second);
    assert_ne!(first, different);
}

#[test]
fn deals_from_ordered_shoe_and_tracks_discard() {
    let mut shoe = create_shoe(1, "deal-seed", 50, 1).expect("shoe");
    let expected = shoe.cards[0].clone();
    let dealt = deal_card(&mut shoe).expect("card");
    discard_cards(&mut shoe, vec![dealt.clone()]);

    assert_eq!(dealt, expected);
    assert_eq!(shoe.cursor, 1);
    assert_eq!(shoe.discard, vec![expected]);
}

#[test]
fn marks_shuffle_after_penetration() {
    let mut shoe = create_shoe(1, "penetration-seed", 10, 1).expect("shoe");
    while shoe.cursor < shoe.penetration_index {
        let _ = deal_card(&mut shoe).expect("card");
    }
    assert!(needs_shuffle(&shoe));
}
```

- [ ] **Step 2: Run tests to verify they fail**

Run:

```bash
cargo test -p blackjack-core --test shoe_tests
```

Expected: FAIL with unresolved imports for `create_shoe`, `deal_card`, `discard_cards`, and `needs_shuffle`.

- [ ] **Step 3: Implement deterministic RNG**

Write `crates/blackjack-core/src/rng.rs`:

```rust
pub struct SeededRng {
    state: u64,
}

impl SeededRng {
    pub fn new(seed: &str) -> Self {
        let mut state = 0xcbf29ce484222325_u64;
        for byte in seed.bytes() {
            state ^= u64::from(byte);
            state = state.wrapping_mul(0x100000001b3);
        }
        Self { state }
    }

    pub fn next_usize(&mut self, upper_exclusive: usize) -> usize {
        if upper_exclusive == 0 {
            return 0;
        }
        (self.next_u64() as usize) % upper_exclusive
    }

    fn next_u64(&mut self) -> u64 {
        self.state = self.state.wrapping_add(0x9e3779b97f4a7c15);
        let mut value = self.state;
        value = (value ^ (value >> 30)).wrapping_mul(0xbf58476d1ce4e5b9);
        value = (value ^ (value >> 27)).wrapping_mul(0x94d049bb133111eb);
        value ^ (value >> 31)
    }
}
```

- [ ] **Step 4: Implement shoe creation and dealing**

Write `crates/blackjack-core/src/shoe.rs`:

```rust
use crate::rng::SeededRng;
use crate::{Card, Rank, ShoeState, Suit};

const RANKS: [Rank; 13] = [
    Rank::Ace,
    Rank::Two,
    Rank::Three,
    Rank::Four,
    Rank::Five,
    Rank::Six,
    Rank::Seven,
    Rank::Eight,
    Rank::Nine,
    Rank::Ten,
    Rank::Jack,
    Rank::Queen,
    Rank::King,
];

const SUITS: [Suit; 4] = [Suit::Clubs, Suit::Diamonds, Suit::Hearts, Suit::Spades];

pub fn create_shoe(
    decks: u8,
    seed: &str,
    penetration_percent: u8,
    shoe_number: u32,
) -> Result<ShoeState, String> {
    if decks == 0 {
        return Err("decks must be positive".to_string());
    }
    if penetration_percent == 0 || penetration_percent > 100 {
        return Err("penetration_percent must be 1..=100".to_string());
    }

    let mut cards = Vec::with_capacity(decks as usize * 52);
    for deck in 1..=decks {
        let deck_id = format!("deck-{deck}");
        for suit in SUITS {
            for rank in RANKS {
                cards.push(Card {
                    card_id: format!("{deck_id}-{}-{}", rank_slug(&rank), suit_slug(&suit)),
                    deck_id: deck_id.clone(),
                    rank,
                    suit,
                });
            }
        }
    }

    shuffle(&mut cards, seed);
    let penetration_index = cards.len() * usize::from(penetration_percent) / 100;
    Ok(ShoeState {
        seed: seed.to_string(),
        shoe_number,
        cards,
        cursor: 0,
        discard: Vec::new(),
        penetration_index,
    })
}

pub fn deal_card(shoe: &mut ShoeState) -> Result<Card, String> {
    let card = shoe
        .cards
        .get(shoe.cursor)
        .cloned()
        .ok_or_else(|| "shoe is empty".to_string())?;
    shoe.cursor += 1;
    Ok(card)
}

pub fn discard_cards(shoe: &mut ShoeState, cards: Vec<Card>) {
    shoe.discard.extend(cards);
}

pub fn needs_shuffle(shoe: &ShoeState) -> bool {
    shoe.cursor >= shoe.penetration_index
}

fn shuffle(cards: &mut [Card], seed: &str) {
    let mut rng = SeededRng::new(seed);
    for index in (1..cards.len()).rev() {
        let swap_index = rng.next_usize(index + 1);
        cards.swap(index, swap_index);
    }
}

fn rank_slug(rank: &Rank) -> &'static str {
    match rank {
        Rank::Ace => "A",
        Rank::Two => "2",
        Rank::Three => "3",
        Rank::Four => "4",
        Rank::Five => "5",
        Rank::Six => "6",
        Rank::Seven => "7",
        Rank::Eight => "8",
        Rank::Nine => "9",
        Rank::Ten => "10",
        Rank::Jack => "J",
        Rank::Queen => "Q",
        Rank::King => "K",
    }
}

fn suit_slug(suit: &Suit) -> &'static str {
    match suit {
        Suit::Clubs => "clubs",
        Suit::Diamonds => "diamonds",
        Suit::Hearts => "hearts",
        Suit::Spades => "spades",
    }
}
```

- [ ] **Step 5: Export shoe modules**

Update `crates/blackjack-core/src/lib.rs`:

```rust
pub mod rng;
pub mod shoe;
pub mod types;

pub use shoe::*;
pub use types::*;
```

- [ ] **Step 6: Run tests**

Run:

```bash
cargo test -p blackjack-core --test shoe_tests
cargo test -p blackjack-core
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add crates/blackjack-core/src/rng.rs crates/blackjack-core/src/shoe.rs crates/blackjack-core/src/lib.rs crates/blackjack-core/tests/shoe_tests.rs
git commit -m "feat: add deterministic blackjack shoe"
```

---

### Task 3: Ruleset, Scoring, Legal Actions, H17/S17

**Files:**
- Create: `crates/blackjack-core/src/rules.rs`
- Create: `crates/blackjack-core/tests/rules_tests.rs`
- Modify: `crates/blackjack-core/src/lib.rs`

**Interfaces:**
- Consumes: `Action`, `Card`, `DealerSoft17`, `HandSource`, `HandState`, `Rank`, `Ruleset`.
- Produces:
  - `v1_h17_ruleset() -> Ruleset`
  - `HandScore { hard_total: u8, best_total: u8, is_soft: bool, is_blackjack: bool, is_bust: bool }`
  - `score_hand(cards: &[Card]) -> HandScore`
  - `legal_actions(hand: &HandState, ruleset: &Ruleset, hand_count: usize, bankroll_available: i32) -> Vec<Action>`
  - `dealer_must_hit(cards: &[Card], ruleset: &Ruleset) -> bool`

- [ ] **Step 1: Write failing rules tests**

Write `crates/blackjack-core/tests/rules_tests.rs`:

```rust
use blackjack_core::{
    dealer_must_hit, legal_actions, score_hand, v1_h17_ruleset, Action, Card, DealerSoft17,
    HandSource, HandState, Rank, Suit,
};

fn card(rank: Rank, id: &str) -> Card {
    Card {
        card_id: id.to_string(),
        deck_id: "deck-1".to_string(),
        rank,
        suit: Suit::Spades,
    }
}

#[test]
fn scores_soft_totals_blackjack_and_bust() {
    let soft = score_hand(&[card(Rank::Ace, "a"), card(Rank::Six, "six")]);
    assert_eq!(soft.best_total, 17);
    assert!(soft.is_soft);
    assert!(!soft.is_blackjack);

    let blackjack = score_hand(&[card(Rank::Ace, "a"), card(Rank::King, "king")]);
    assert_eq!(blackjack.best_total, 21);
    assert!(blackjack.is_blackjack);

    let bust = score_hand(&[
        card(Rank::King, "king"),
        card(Rank::Nine, "nine"),
        card(Rank::Five, "five"),
    ]);
    assert!(bust.is_bust);
}

#[test]
fn supports_h17_default_and_s17_override() {
    let soft_17 = vec![card(Rank::Ace, "a"), card(Rank::Six, "six")];
    let mut s17 = v1_h17_ruleset();
    s17.dealer_soft_17 = DealerSoft17::Stand;

    assert!(dealer_must_hit(&soft_17, &v1_h17_ruleset()));
    assert!(!dealer_must_hit(&soft_17, &s17));
}

#[test]
fn returns_legal_hit_stand_double_split_when_funds_allow() {
    let hand = HandState {
        cards: vec![card(Rank::Eight, "8a"), card(Rank::Eight, "8b")],
        wager: 25,
        is_complete: false,
        is_doubled: false,
        source: HandSource::Initial,
    };

    assert_eq!(
        legal_actions(&hand, &v1_h17_ruleset(), 1, 100),
        vec![Action::Hit, Action::Stand, Action::Double, Action::Split]
    );
}

#[test]
fn removes_double_and_split_when_bankroll_cannot_cover_them() {
    let hand = HandState {
        cards: vec![card(Rank::Eight, "8a"), card(Rank::Eight, "8b")],
        wager: 25,
        is_complete: false,
        is_doubled: false,
        source: HandSource::Initial,
    };

    assert_eq!(
        legal_actions(&hand, &v1_h17_ruleset(), 1, 0),
        vec![Action::Hit, Action::Stand]
    );
}
```

- [ ] **Step 2: Run tests to verify they fail**

Run:

```bash
cargo test -p blackjack-core --test rules_tests
```

Expected: FAIL with unresolved imports for rules functions.

- [ ] **Step 3: Implement rules**

Write `crates/blackjack-core/src/rules.rs`:

```rust
use crate::{Action, Card, DealerSoft17, HandState, Rank, Ruleset};

#[derive(Clone, Debug, Eq, PartialEq)]
pub struct HandScore {
    pub hard_total: u8,
    pub best_total: u8,
    pub is_soft: bool,
    pub is_blackjack: bool,
    pub is_bust: bool,
}

pub fn v1_h17_ruleset() -> Ruleset {
    Ruleset {
        id: "v1-modern-classic-h17-6d".to_string(),
        decks: 6,
        penetration_percent: 75,
        dealer_soft_17: DealerSoft17::Hit,
        blackjack_payout: 1.5,
        max_split_hands: 4,
        double_after_split: true,
        resplit_aces: false,
        split_aces_receive_one_card: true,
        insurance_auto_decline: true,
    }
}

pub fn score_hand(cards: &[Card]) -> HandScore {
    let hard_total: u8 = cards.iter().map(|card| rank_value(&card.rank)).sum();
    let ace_count = cards
        .iter()
        .filter(|card| matches!(card.rank, Rank::Ace))
        .count();
    let mut best_total = hard_total;
    let mut soft_aces = 0;

    for _ in 0..ace_count {
        if best_total + 10 <= 21 {
            best_total += 10;
            soft_aces += 1;
        }
    }

    HandScore {
        hard_total,
        best_total,
        is_soft: soft_aces > 0,
        is_blackjack: cards.len() == 2 && best_total == 21,
        is_bust: best_total > 21,
    }
}

pub fn legal_actions(
    hand: &HandState,
    ruleset: &Ruleset,
    hand_count: usize,
    bankroll_available: i32,
) -> Vec<Action> {
    if hand.is_complete || score_hand(&hand.cards).is_bust {
        return Vec::new();
    }

    let mut actions = vec![Action::Hit, Action::Stand];
    let can_double = hand.cards.len() == 2
        && !hand.is_doubled
        && bankroll_available >= hand.wager
        && (matches!(hand.source, crate::HandSource::Initial) || ruleset.double_after_split);
    let can_split = hand.cards.len() == 2
        && hand.cards[0].rank == hand.cards[1].rank
        && hand_count < ruleset.max_split_hands
        && bankroll_available >= hand.wager;
    let is_aces = hand.cards.len() == 2
        && matches!(hand.cards[0].rank, Rank::Ace)
        && matches!(hand.cards[1].rank, Rank::Ace);

    if can_double {
        actions.push(Action::Double);
    }
    if can_split && (!is_aces || ruleset.resplit_aces || matches!(hand.source, crate::HandSource::Initial)) {
        actions.push(Action::Split);
    }
    actions
}

pub fn dealer_must_hit(cards: &[Card], ruleset: &Ruleset) -> bool {
    let score = score_hand(cards);
    score.best_total < 17
        || (score.best_total == 17
            && score.is_soft
            && matches!(ruleset.dealer_soft_17, DealerSoft17::Hit))
}

fn rank_value(rank: &Rank) -> u8 {
    match rank {
        Rank::Ace => 1,
        Rank::Two => 2,
        Rank::Three => 3,
        Rank::Four => 4,
        Rank::Five => 5,
        Rank::Six => 6,
        Rank::Seven => 7,
        Rank::Eight => 8,
        Rank::Nine => 9,
        Rank::Ten | Rank::Jack | Rank::Queen | Rank::King => 10,
    }
}
```

- [ ] **Step 4: Export rules**

Update `crates/blackjack-core/src/lib.rs`:

```rust
pub mod rng;
pub mod rules;
pub mod shoe;
pub mod types;

pub use rules::*;
pub use shoe::*;
pub use types::*;
```

- [ ] **Step 5: Run tests**

Run:

```bash
cargo test -p blackjack-core --test rules_tests
cargo test -p blackjack-core
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add crates/blackjack-core/src/rules.rs crates/blackjack-core/src/lib.rs crates/blackjack-core/tests/rules_tests.rs
git commit -m "feat: add blackjack ruleset logic"
```

---

### Task 4: Session Lifecycle, Round Flow, Betting, and Logs

**Files:**
- Create: `crates/blackjack-core/src/session.rs`
- Create: `crates/blackjack-core/tests/session_tests.rs`
- Modify: `crates/blackjack-core/src/lib.rs`

**Interfaces:**
- Consumes: `create_shoe`, `deal_card`, `discard_cards`, `needs_shuffle`, `v1_h17_ruleset`, `dealer_must_hit`, `legal_actions`, `score_hand`.
- Produces:
  - `start_session(seed: &str, bankroll: i32, default_bet: i32, ruleset: Option<Ruleset>) -> Result<SessionState, String>`
  - `start_round(session: &mut SessionState, bet: Option<i32>) -> Result<(), String>`
  - `current_legal_actions(session: &SessionState) -> Result<Vec<Action>, String>`
  - `apply_action(session: &mut SessionState, action: Action) -> Result<(), String>`

- [ ] **Step 1: Write failing session tests**

Write `crates/blackjack-core/tests/session_tests.rs`:

```rust
use blackjack_core::{
    apply_action, current_legal_actions, start_round, start_session, Action, RoundStatus,
};
use std::collections::HashSet;

#[test]
fn plays_complete_seeded_round_and_logs_dealt_cards() {
    let mut session = start_session("complete-round", 1000, 25, None).expect("session");
    start_round(&mut session, None).expect("round");

    while session.round.as_ref().is_some_and(|round| round.status == RoundStatus::PlayerTurn) {
        let legal = current_legal_actions(&session).expect("legal actions");
        let action = if legal.contains(&Action::Stand) {
            Action::Stand
        } else {
            Action::Hit
        };
        apply_action(&mut session, action).expect("action");
    }

    let log = session.logs.first().expect("round log");
    let origins: HashSet<String> = log
        .dealt_cards
        .iter()
        .map(|card| format!("{}:{}", card.deck_id, card.card_id))
        .collect();

    assert_eq!(session.round.as_ref().expect("round").status, RoundStatus::Resolved);
    assert_eq!(origins.len(), log.dealt_cards.len());
    assert!(!log.outcomes.is_empty());
    assert_eq!(log.bankroll_after - log.bankroll_before, log.bankroll_delta);
}

#[test]
fn rejects_round_when_bankroll_cannot_cover_bet() {
    let mut session = start_session("poor", 5, 25, None).expect("session");
    assert_eq!(
        start_round(&mut session, None).expect_err("insufficient"),
        "insufficient bankroll"
    );
}

#[test]
fn logs_auto_declined_insurance_when_dealer_shows_ace_seed_allows_it() {
    let mut found = None;
    for index in 0..500 {
        let seed = format!("ace-up-{index}");
        let mut session = start_session(&seed, 1000, 25, None).expect("session");
        start_round(&mut session, None).expect("round");
        if session
            .round
            .as_ref()
            .expect("round")
            .actions
            .iter()
            .any(|item| matches!(item.action, blackjack_core::LoggedAction::InsuranceDeclined))
        {
            found = Some(session);
            break;
        }
    }
    assert!(found.is_some());
}

#[test]
fn can_double_and_settle_bankroll() {
    let mut session = start_session("double-seed", 1000, 25, None).expect("session");
    start_round(&mut session, None).expect("round");

    if current_legal_actions(&session).expect("legal").contains(&Action::Double) {
        apply_action(&mut session, Action::Double).expect("double");
        let log = session.logs.first().expect("log");
        assert!(log.outcomes.iter().any(|outcome| outcome.wager == 50));
    }
}
```

- [ ] **Step 2: Run tests to verify they fail**

Run:

```bash
cargo test -p blackjack-core --test session_tests
```

Expected: FAIL with unresolved imports for session functions.

- [ ] **Step 3: Implement session engine**

Write `crates/blackjack-core/src/session.rs`:

```rust
use crate::{
    create_shoe, deal_card, dealer_must_hit, discard_cards, legal_actions, needs_shuffle,
    score_hand, v1_h17_ruleset, Action, ActionLog, Card, DealerState, HandOutcome, HandSource,
    HandState, LoggedAction, OutcomeResult, RoundLog, RoundState, RoundStatus, Ruleset,
    SessionState,
};

pub fn start_session(
    seed: &str,
    bankroll: i32,
    default_bet: i32,
    ruleset: Option<Ruleset>,
) -> Result<SessionState, String> {
    if bankroll < 0 {
        return Err("bankroll must be non-negative".to_string());
    }
    if default_bet <= 0 {
        return Err("default_bet must be positive".to_string());
    }
    let ruleset = ruleset.unwrap_or_else(v1_h17_ruleset);
    let shoe = create_shoe(ruleset.decks, seed, ruleset.penetration_percent, 1)?;
    Ok(SessionState {
        seed: seed.to_string(),
        ruleset,
        shoe,
        bankroll,
        default_bet,
        round: None,
        logs: Vec::new(),
    })
}

pub fn start_round(session: &mut SessionState, bet: Option<i32>) -> Result<(), String> {
    if session.round.as_ref().is_some_and(|round| round.status != RoundStatus::Resolved) {
        return Err("round already active".to_string());
    }
    let bet = bet.unwrap_or(session.default_bet);
    if bet <= 0 {
        return Err("bet must be positive".to_string());
    }
    if session.bankroll < bet {
        return Err("insufficient bankroll".to_string());
    }
    if needs_shuffle(&session.shoe) {
        return Err("shoe must reshuffle".to_string());
    }

    let mut player = HandState {
        cards: Vec::new(),
        wager: bet,
        is_complete: false,
        is_doubled: false,
        source: HandSource::Initial,
    };
    let mut dealer = DealerState { cards: Vec::new() };
    let mut dealt_cards = Vec::new();

    for target in [&mut player.cards, &mut dealer.cards, &mut player.cards, &mut dealer.cards] {
        let card = deal_card(&mut session.shoe)?;
        target.push(card.clone());
        dealt_cards.push(card);
    }

    let mut actions = Vec::new();
    if dealer.cards.first().is_some_and(|card| matches!(card.rank, crate::Rank::Ace))
        && session.ruleset.insurance_auto_decline
    {
        actions.push(ActionLog {
            action: LoggedAction::InsuranceDeclined,
            hand_index: 0,
            card_id: None,
        });
    }

    session.round = Some(RoundState {
        status: RoundStatus::PlayerTurn,
        bet,
        active_hand_index: 0,
        dealer,
        hands: vec![player],
        dealt_cards,
        actions,
        bankroll_before: session.bankroll,
    });

    finish_if_naturals(session)
}

pub fn current_legal_actions(session: &SessionState) -> Result<Vec<Action>, String> {
    let round = active_round(session)?;
    let hand = round
        .hands
        .get(round.active_hand_index)
        .ok_or_else(|| "active hand missing".to_string())?;
    let committed: i32 = round.hands.iter().map(|hand| hand.wager).sum();
    Ok(legal_actions(
        hand,
        &session.ruleset,
        round.hands.len(),
        session.bankroll - committed,
    ))
}

pub fn apply_action(session: &mut SessionState, action: Action) -> Result<(), String> {
    let legal = current_legal_actions(session)?;
    if !legal.contains(&action) {
        return Err(format!("invalid action: {action:?}"));
    }
    match action {
        Action::Hit => hit(session),
        Action::Stand => stand(session),
        Action::Double => double_down(session),
        Action::Split => split_hand(session),
    }
}

fn hit(session: &mut SessionState) -> Result<(), String> {
    let card = deal_card(&mut session.shoe)?;
    let round = active_round_mut(session)?;
    let hand_index = round.active_hand_index;
    let hand = round
        .hands
        .get_mut(hand_index)
        .ok_or_else(|| "active hand missing".to_string())?;
    hand.cards.push(card.clone());
    if score_hand(&hand.cards).is_bust {
        hand.is_complete = true;
    }
    round.dealt_cards.push(card.clone());
    round.actions.push(ActionLog {
        action: LoggedAction::Hit,
        hand_index,
        card_id: Some(card.card_id),
    });
    if round.hands[hand_index].is_complete {
        advance_hand(session)?;
    }
    Ok(())
}

fn stand(session: &mut SessionState) -> Result<(), String> {
    let round = active_round_mut(session)?;
    let hand_index = round.active_hand_index;
    round.hands[hand_index].is_complete = true;
    round.actions.push(ActionLog {
        action: LoggedAction::Stand,
        hand_index,
        card_id: None,
    });
    advance_hand(session)
}

fn double_down(session: &mut SessionState) -> Result<(), String> {
    let card = deal_card(&mut session.shoe)?;
    let round = active_round_mut(session)?;
    let hand_index = round.active_hand_index;
    let hand = &mut round.hands[hand_index];
    hand.wager *= 2;
    hand.cards.push(card.clone());
    hand.is_doubled = true;
    hand.is_complete = true;
    round.dealt_cards.push(card.clone());
    round.actions.push(ActionLog {
        action: LoggedAction::Double,
        hand_index,
        card_id: Some(card.card_id),
    });
    advance_hand(session)
}

fn split_hand(session: &mut SessionState) -> Result<(), String> {
    let first_draw = deal_card(&mut session.shoe)?;
    let second_draw = deal_card(&mut session.shoe)?;
    let round = active_round_mut(session)?;
    let hand_index = round.active_hand_index;
    let hand = round.hands.remove(hand_index);
    let first = HandState {
        cards: vec![hand.cards[0].clone(), first_draw.clone()],
        wager: hand.wager,
        is_complete: false,
        is_doubled: false,
        source: HandSource::Split,
    };
    let second = HandState {
        cards: vec![hand.cards[1].clone(), second_draw.clone()],
        wager: hand.wager,
        is_complete: false,
        is_doubled: false,
        source: HandSource::Split,
    };
    round.hands.insert(hand_index, second);
    round.hands.insert(hand_index, first);
    round.dealt_cards.push(first_draw);
    round.dealt_cards.push(second_draw);
    round.actions.push(ActionLog {
        action: LoggedAction::Split,
        hand_index,
        card_id: None,
    });
    Ok(())
}

fn advance_hand(session: &mut SessionState) -> Result<(), String> {
    let round = active_round_mut(session)?;
    if let Some(next_index) = round
        .hands
        .iter()
        .enumerate()
        .skip(round.active_hand_index + 1)
        .find_map(|(index, hand)| (!hand.is_complete).then_some(index))
    {
        round.active_hand_index = next_index;
        return Ok(());
    }
    resolve_dealer_and_round(session)
}

fn resolve_dealer_and_round(session: &mut SessionState) -> Result<(), String> {
    {
        let round = active_round_mut(session)?;
        round.status = RoundStatus::DealerTurn;
    }
    loop {
        let must_hit = {
            let round = active_round(session)?;
            dealer_must_hit(&round.dealer.cards, &session.ruleset)
        };
        if !must_hit {
            break;
        }
        let card = deal_card(&mut session.shoe)?;
        let round = active_round_mut(session)?;
        round.dealer.cards.push(card.clone());
        round.dealt_cards.push(card);
    }

    let (outcomes, cards_to_discard, bankroll_before, dealt_cards, actions) = {
        let round = active_round(session)?;
        let outcomes = settle_hands(&round.hands, &round.dealer.cards, &session.ruleset);
        let cards_to_discard = round
            .dealer
            .cards
            .iter()
            .cloned()
            .chain(round.hands.iter().flat_map(|hand| hand.cards.iter().cloned()))
            .collect();
        (
            outcomes,
            cards_to_discard,
            round.bankroll_before,
            round.dealt_cards.clone(),
            round.actions.clone(),
        )
    };
    let bankroll_delta: i32 = outcomes.iter().map(|outcome| outcome.delta).sum();
    session.bankroll += bankroll_delta;
    discard_cards(&mut session.shoe, cards_to_discard);
    let penetration_reached = needs_shuffle(&session.shoe);
    let log = RoundLog {
        seed: session.seed.clone(),
        ruleset_id: session.ruleset.id.clone(),
        shoe_number: session.shoe.shoe_number,
        dealt_cards,
        actions,
        outcomes,
        bankroll_before,
        bankroll_after: session.bankroll,
        bankroll_delta,
        penetration_reached,
    };
    session.logs.push(log);
    active_round_mut(session)?.status = RoundStatus::Resolved;
    Ok(())
}

fn finish_if_naturals(session: &mut SessionState) -> Result<(), String> {
    let has_natural = {
        let round = active_round(session)?;
        score_hand(&round.hands[0].cards).is_blackjack || score_hand(&round.dealer.cards).is_blackjack
    };
    if has_natural {
        active_round_mut(session)?.hands[0].is_complete = true;
        resolve_dealer_and_round(session)?;
    }
    Ok(())
}

fn settle_hands(hands: &[HandState], dealer_cards: &[Card], ruleset: &Ruleset) -> Vec<HandOutcome> {
    let dealer_score = score_hand(dealer_cards);
    hands
        .iter()
        .enumerate()
        .map(|(hand_index, hand)| {
            let score = score_hand(&hand.cards);
            if score.is_blackjack && !dealer_score.is_blackjack {
                return HandOutcome {
                    hand_index,
                    result: OutcomeResult::Blackjack,
                    wager: hand.wager,
                    delta: (hand.wager as f32 * ruleset.blackjack_payout) as i32,
                };
            }
            if score.is_bust {
                return HandOutcome {
                    hand_index,
                    result: OutcomeResult::Loss,
                    wager: hand.wager,
                    delta: -hand.wager,
                };
            }
            if dealer_score.is_bust || score.best_total > dealer_score.best_total {
                return HandOutcome {
                    hand_index,
                    result: OutcomeResult::Win,
                    wager: hand.wager,
                    delta: hand.wager,
                };
            }
            if score.best_total == dealer_score.best_total {
                return HandOutcome {
                    hand_index,
                    result: OutcomeResult::Push,
                    wager: hand.wager,
                    delta: 0,
                };
            }
            HandOutcome {
                hand_index,
                result: OutcomeResult::Loss,
                wager: hand.wager,
                delta: -hand.wager,
            }
        })
        .collect()
}

fn active_round(session: &SessionState) -> Result<&RoundState, String> {
    session
        .round
        .as_ref()
        .filter(|round| round.status != RoundStatus::Resolved)
        .ok_or_else(|| "no active round".to_string())
}

fn active_round_mut(session: &mut SessionState) -> Result<&mut RoundState, String> {
    session
        .round
        .as_mut()
        .filter(|round| round.status != RoundStatus::Resolved)
        .ok_or_else(|| "no active round".to_string())
}
```

- [ ] **Step 4: Export session**

Update `crates/blackjack-core/src/lib.rs`:

```rust
pub mod rng;
pub mod rules;
pub mod session;
pub mod shoe;
pub mod types;

pub use rules::*;
pub use session::*;
pub use shoe::*;
pub use types::*;
```

- [ ] **Step 5: Run tests**

Run:

```bash
cargo test -p blackjack-core --test session_tests
cargo test -p blackjack-core
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add crates/blackjack-core/src/session.rs crates/blackjack-core/src/lib.rs crates/blackjack-core/tests/session_tests.rs
git commit -m "feat: add free play session engine"
```

---

### Task 5: JSON Command Boundary and CLI

**Files:**
- Create: `crates/blackjack-core/src/boundary.rs`
- Create: `crates/blackjack-core/src/main.rs`
- Create: `crates/blackjack-core/tests/boundary_tests.rs`
- Modify: `crates/blackjack-core/src/lib.rs`

**Interfaces:**
- Consumes: session API from Task 4.
- Produces:
  - `CoreCommand::{StartSession, StartRound, LegalActions, ApplyAction}`
  - `CoreResponse::{Session, Actions}`
  - `handle_command(command: CoreCommand) -> Result<CoreResponse, String>`
  - CLI: `cargo run -p blackjack-core` reads one JSON command from stdin and writes one JSON response to stdout.

- [ ] **Step 1: Write failing boundary tests**

Write `crates/blackjack-core/tests/boundary_tests.rs`:

```rust
use blackjack_core::{handle_command, Action, CoreCommand, CoreResponse};

#[test]
fn start_session_command_returns_serializable_session() {
    let response = handle_command(CoreCommand::StartSession {
        seed: "json-seed".to_string(),
        bankroll: 1000,
        default_bet: 25,
        ruleset: None,
    })
    .expect("response");

    match response {
        CoreResponse::Session(session) => {
            assert_eq!(session.seed, "json-seed");
            assert_eq!(session.bankroll, 1000);
            assert_eq!(session.shoe.cards.len(), 312);
        }
        CoreResponse::Actions(_) => panic!("expected session"),
    }
}

#[test]
fn legal_actions_command_returns_actions_for_started_round() {
    let session = match handle_command(CoreCommand::StartSession {
        seed: "json-round".to_string(),
        bankroll: 1000,
        default_bet: 25,
        ruleset: None,
    })
    .expect("session")
    {
        CoreResponse::Session(session) => session,
        CoreResponse::Actions(_) => panic!("expected session"),
    };

    let session = match handle_command(CoreCommand::StartRound { session, bet: None }).expect("round") {
        CoreResponse::Session(session) => session,
        CoreResponse::Actions(_) => panic!("expected session"),
    };

    let actions = match handle_command(CoreCommand::LegalActions { session }).expect("actions") {
        CoreResponse::Actions(actions) => actions,
        CoreResponse::Session(_) => panic!("expected actions"),
    };

    assert!(actions.contains(&Action::Hit));
    assert!(actions.contains(&Action::Stand));
}
```

- [ ] **Step 2: Run tests to verify they fail**

Run:

```bash
cargo test -p blackjack-core --test boundary_tests
```

Expected: FAIL with unresolved imports for boundary types.

- [ ] **Step 3: Implement the JSON boundary**

Write `crates/blackjack-core/src/boundary.rs`:

```rust
use crate::{
    apply_action, current_legal_actions, start_round, start_session, Action, Ruleset, SessionState,
};
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Deserialize, PartialEq, Serialize)]
#[serde(tag = "command", rename_all = "snake_case")]
pub enum CoreCommand {
    StartSession {
        seed: String,
        bankroll: i32,
        default_bet: i32,
        ruleset: Option<Ruleset>,
    },
    StartRound {
        session: SessionState,
        bet: Option<i32>,
    },
    LegalActions {
        session: SessionState,
    },
    ApplyAction {
        session: SessionState,
        action: Action,
    },
}

#[derive(Clone, Debug, Deserialize, PartialEq, Serialize)]
#[serde(tag = "type", content = "data", rename_all = "snake_case")]
pub enum CoreResponse {
    Session(SessionState),
    Actions(Vec<Action>),
}

pub fn handle_command(command: CoreCommand) -> Result<CoreResponse, String> {
    match command {
        CoreCommand::StartSession {
            seed,
            bankroll,
            default_bet,
            ruleset,
        } => start_session(&seed, bankroll, default_bet, ruleset).map(CoreResponse::Session),
        CoreCommand::StartRound { mut session, bet } => {
            start_round(&mut session, bet)?;
            Ok(CoreResponse::Session(session))
        }
        CoreCommand::LegalActions { session } => {
            current_legal_actions(&session).map(CoreResponse::Actions)
        }
        CoreCommand::ApplyAction { mut session, action } => {
            apply_action(&mut session, action)?;
            Ok(CoreResponse::Session(session))
        }
    }
}
```

- [ ] **Step 4: Implement stdin/stdout CLI**

Write `crates/blackjack-core/src/main.rs`:

```rust
use blackjack_core::{handle_command, CoreCommand};
use serde::Serialize;
use std::io::{self, Read};

#[derive(Serialize)]
#[serde(tag = "status", rename_all = "snake_case")]
enum CliOutput<T: Serialize> {
    Ok { response: T },
    Error { message: String },
}

fn main() {
    let mut input = String::new();
    if let Err(error) = io::stdin().read_to_string(&mut input) {
        print_error(format!("failed to read stdin: {error}"));
        return;
    }

    let command: CoreCommand = match serde_json::from_str(&input) {
        Ok(command) => command,
        Err(error) => {
            print_error(format!("invalid command json: {error}"));
            return;
        }
    };

    match handle_command(command) {
        Ok(response) => {
            println!(
                "{}",
                serde_json::to_string(&CliOutput::Ok { response }).expect("serialize response")
            );
        }
        Err(message) => print_error(message),
    }
}

fn print_error(message: String) {
    println!(
        "{}",
        serde_json::to_string(&CliOutput::<()>::Error { message }).expect("serialize error")
    );
}
```

- [ ] **Step 5: Export boundary**

Update `crates/blackjack-core/src/lib.rs`:

```rust
pub mod boundary;
pub mod rng;
pub mod rules;
pub mod session;
pub mod shoe;
pub mod types;

pub use boundary::*;
pub use rules::*;
pub use session::*;
pub use shoe::*;
pub use types::*;
```

- [ ] **Step 6: Run boundary tests and CLI smoke**

Run:

```bash
cargo test -p blackjack-core --test boundary_tests
cargo test -p blackjack-core
printf '{"command":"start_session","seed":"cli-seed","bankroll":1000,"default_bet":25,"ruleset":null}' | cargo run -q -p blackjack-core
```

Expected: tests PASS, and CLI output starts with:

```json
{"status":"ok","response":{"type":"session"
```

- [ ] **Step 7: Commit**

```bash
git add crates/blackjack-core/src/boundary.rs crates/blackjack-core/src/main.rs crates/blackjack-core/src/lib.rs crates/blackjack-core/tests/boundary_tests.rs
git commit -m "feat: add simulator json boundary"
```

---

### Task 6: First Check and Project Docs Sync

**Files:**
- Create: `crates/blackjack-core/tests/free_play_check.rs`
- Modify: `PROGRESS.md`
- Modify: `journal/ops/tasks.md`
- Modify: `docs/plans/v1-simulation-foundations.md`

**Interfaces:**
- Consumes: complete Rust simulator core and JSON boundary.
- Produces: one high-signal check proving seeded shoe, traceable cards, logs, bankroll math, and S17 option.

- [ ] **Step 1: Add the first-check test**

Write `crates/blackjack-core/tests/free_play_check.rs`:

```rust
use blackjack_core::{
    apply_action, current_legal_actions, start_round, start_session, v1_h17_ruleset, Action,
    DealerSoft17, RoundStatus,
};
use std::collections::HashSet;

#[test]
fn free_play_core_proves_traceable_cards_logs_bankroll_and_s17() {
    let mut ruleset = v1_h17_ruleset();
    ruleset.dealer_soft_17 = DealerSoft17::Stand;
    let mut session = start_session("first-check", 1000, 25, Some(ruleset)).expect("session");
    start_round(&mut session, None).expect("round");

    while session.round.as_ref().is_some_and(|round| round.status == RoundStatus::PlayerTurn) {
        let legal = current_legal_actions(&session).expect("legal actions");
        let action = if legal.contains(&Action::Double) {
            Action::Double
        } else {
            Action::Stand
        };
        apply_action(&mut session, action).expect("action");
    }

    let log = session.logs.first().expect("log");
    let origins: HashSet<String> = log
        .dealt_cards
        .iter()
        .map(|card| format!("{}:{}", card.deck_id, card.card_id))
        .collect();
    let outcome_delta: i32 = log.outcomes.iter().map(|outcome| outcome.delta).sum();

    assert_eq!(session.ruleset.dealer_soft_17, DealerSoft17::Stand);
    assert_eq!(origins.len(), log.dealt_cards.len());
    assert!(log
        .dealt_cards
        .iter()
        .all(|card| !card.card_id.is_empty() && !card.deck_id.is_empty()));
    assert_eq!(log.bankroll_delta, outcome_delta);
    assert_eq!(log.bankroll_after, log.bankroll_before + outcome_delta);
}
```

- [ ] **Step 2: Run full verification**

Run:

```bash
cargo test -p blackjack-core
cargo fmt --check
cargo clippy -p blackjack-core -- -D warnings
```

Expected: PASS.

- [ ] **Step 3: Update progress docs**

Edit `PROGRESS.md` so `In progress` says:

```md
- V1 Simulation Foundations: Rust simulator core implemented; next plan the TypeScript UI bridge over the JSON/WASM-ready boundary.
```

Edit `journal/ops/tasks.md` so these active tasks are checked:

```md
- [x] Rewrite or replace the worker implementation plan after the stack decision.
- [x] Implement the Free Play skeleton simulator core from `docs/plans/v1-simulation-foundations.md`.
```

Edit `docs/plans/v1-simulation-foundations.md` so the sequence marks the Rust-core implementation done and leaves the next step as the thin Free Play UI.

- [ ] **Step 4: Commit**

```bash
git add crates/blackjack-core/tests/free_play_check.rs PROGRESS.md journal/ops/tasks.md docs/plans/v1-simulation-foundations.md
git commit -m "test: add rust simulator first check"
```

---

## Self-Review

Spec coverage:

- Rust simulator core owns cards/shoe/rules/round/betting/logs: Tasks 1-5.
- Seeded shoe and traceable card origins: Task 2 and Task 6.
- H17 default and S17 option: Task 3 and Task 6.
- Hit, stand, double, split: Task 4.
- Betting, bankroll settlement, blackjack 3:2, wins/losses/pushes: Task 4 and Task 6.
- Insurance auto-decline logging: Task 4.
- JSON-shaped boundary for TypeScript and Python consumers: Task 5.
- No DB, no UI, no WASM packaging in this plan: Global Constraints and file structure.

Red-flag scan: clean.

Type consistency:

- `Ruleset`, `ShoeState`, `SessionState`, `RoundState`, `Action`, `RoundLog`, and `HandOutcome` are defined in Task 1 before use.
- `create_shoe`, `deal_card`, `discard_cards`, and `needs_shuffle` are defined in Task 2 before use.
- `v1_h17_ruleset`, `score_hand`, `legal_actions`, and `dealer_must_hit` are defined in Task 3 before use.
- `start_session`, `start_round`, `current_legal_actions`, and `apply_action` are defined in Task 4 before use by the JSON boundary.
