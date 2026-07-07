use crate::{Action, Card, DealerSoft17, HandSource, HandState, Rank, Ruleset};

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
    let hard_total = cards.iter().map(|card| rank_value(&card.rank)).sum();
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

    if hand.cards.len() == 2
        && !hand.is_doubled
        && bankroll_available >= hand.wager
        && (matches!(hand.source, HandSource::Initial) || ruleset.double_after_split)
    {
        actions.push(Action::Double);
    }

    let is_pair = hand.cards.len() == 2 && hand.cards[0].rank == hand.cards[1].rank;
    let is_split_aces = is_pair
        && matches!(hand.cards[0].rank, Rank::Ace)
        && matches!(hand.source, HandSource::Split);

    if is_pair
        && hand_count < ruleset.max_split_hands
        && bankroll_available >= hand.wager
        && (!is_split_aces || ruleset.resplit_aces)
    {
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
