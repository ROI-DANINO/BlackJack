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

/// A card specified for an arranged opening. The engine synthesizes arranged-origin
/// ids from the index and removes one same-rank/suit real card so composition is preserved.
#[derive(Clone, Debug, Deserialize, PartialEq, Serialize)]
#[serde(rename_all = "snake_case")]
pub struct PresetCard {
    pub rank: Rank,
    pub suit: Suit,
}

#[derive(Clone, Debug, Deserialize, Eq, PartialEq, Serialize)]
pub struct HandFacts {
    pub hard_total: u8,
    pub best_total: u8,
    pub is_soft: bool,
    pub is_bust: bool,
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
    pub ruleset: Ruleset,
    pub shoe_number: u32,
    pub dealt_cards: Vec<Card>,
    pub actions: Vec<ActionLog>,
    pub outcomes: Vec<HandOutcome>,
    pub bankroll_before: i32,
    pub bankroll_after: i32,
    pub bankroll_delta: i32,
    pub penetration_reached: bool,
}
