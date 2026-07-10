use crate::{Action, Card, HandState, Ruleset, rules, score_hand};

const HARD: [&str; 14] = [
    "HHHHHHHHHH",
    "HHHHHHHHHH",
    "HHHHHHHHHH",
    "HHHHHHHHHH",
    "HDDDDHHHHH",
    "DDDDDDDDHH",
    "DDDDDDDDDD",
    "HHSSSHHHHH",
    "SSSSSHHHHH",
    "SSSSSHHHHH",
    "SSSSSHHHHH",
    "SSSSSHHHHH",
    "SSSSSSSSSS",
    "SSSSSSSSSS",
];

const SOFT: [&str; 8] = [
    "HHHDDHHHHH",
    "HHHDDHHHHH",
    "HHDDDHHHHH",
    "HHDDDHHHHH",
    "HDDDDHHHHH",
    "XXXXXSSHHH",
    "SSSSSXSSSS",
    "SSSSSSSSSS",
];

const PAIRS: [&str; 10] = [
    "PPPPPPHHHH",
    "PPPPPPHHHH",
    "HHHPPHHHHH",
    "DDDDDDDDHH",
    "PPPPPHHHHH",
    "PPPPPPHHHH",
    "PPPPPPPPPP",
    "PPPPPSPPSS",
    "SSSSSSSSSS",
    "PPPPPPPPPP",
];

#[derive(Clone, Copy)]
enum ChartMove {
    Hit,
    Stand,
    DoubleHit,
    DoubleStand,
    Split,
}

/// Returns the Basic Strategy action for the supported V1 ruleset.
///
/// The caller supplies engine-derived legal actions; this lookup never creates an action the
/// simulator has not permitted.
pub fn basic_strategy_action(
    hand: &HandState,
    dealer_upcard: &Card,
    ruleset: &Ruleset,
    legal_actions: &[Action],
) -> Result<Option<Action>, String> {
    if ruleset.id != "v1-modern-classic-h17-6d" {
        return Err(format!(
            "basic strategy unavailable for ruleset: {}",
            ruleset.id
        ));
    }
    if legal_actions.is_empty() || hand.is_complete || score_hand(&hand.cards).is_bust {
        return Ok(None);
    }

    let dealer_column = dealer_column(&dealer_upcard.rank);
    if is_pair(hand) {
        let pair_move = pair_move(hand, dealer_column);
        if matches!(pair_move, ChartMove::Split) {
            if legal_actions.contains(&Action::Split) {
                return Ok(Some(Action::Split));
            }
        } else {
            return legal_action(pair_move, legal_actions).map(Some);
        }
    }

    let score = score_hand(&hand.cards);
    let chart_move = if score.is_soft {
        soft_move(score.best_total, dealer_column)
    } else {
        hard_move(score.best_total, dealer_column)
    };
    legal_action(chart_move, legal_actions).map(Some)
}

fn is_pair(hand: &HandState) -> bool {
    hand.cards.len() == 2
        && rules::rank_value(&hand.cards[0].rank) == rules::rank_value(&hand.cards[1].rank)
}

fn dealer_column(rank: &crate::Rank) -> usize {
    match rules::rank_value(rank) {
        2..=9 => usize::from(rules::rank_value(rank) - 2),
        10 => 8,
        1 => 9,
        _ => unreachable!("rank values are between one and ten"),
    }
}

fn pair_move(hand: &HandState, dealer_column: usize) -> ChartMove {
    let value = rules::rank_value(&hand.cards[0].rank);
    let row = if value == 1 {
        9
    } else {
        usize::from(value - 2)
    };
    chart_move(PAIRS[row], dealer_column)
}

fn hard_move(total: u8, dealer_column: usize) -> ChartMove {
    let row = match total {
        ..=5 => 0,
        6..=17 => usize::from(total - 5),
        _ => 13,
    };
    chart_move(HARD[row], dealer_column)
}

fn soft_move(total: u8, dealer_column: usize) -> ChartMove {
    if total <= 12 {
        return ChartMove::Hit;
    }

    let row = usize::from(total.min(20) - 13);
    chart_move(SOFT[row], dealer_column)
}

fn chart_move(row: &str, dealer_column: usize) -> ChartMove {
    match row.as_bytes()[dealer_column] {
        b'H' => ChartMove::Hit,
        b'S' => ChartMove::Stand,
        b'D' => ChartMove::DoubleHit,
        b'X' => ChartMove::DoubleStand,
        b'P' => ChartMove::Split,
        _ => unreachable!("strategy tables contain only valid chart moves"),
    }
}

fn legal_action(chart_move: ChartMove, legal_actions: &[Action]) -> Result<Action, String> {
    let action = match chart_move {
        ChartMove::Hit => Action::Hit,
        ChartMove::Stand => Action::Stand,
        ChartMove::DoubleHit => {
            if legal_actions.contains(&Action::Double) {
                Action::Double
            } else {
                Action::Hit
            }
        }
        ChartMove::DoubleStand => {
            if legal_actions.contains(&Action::Double) {
                Action::Double
            } else {
                Action::Stand
            }
        }
        ChartMove::Split => Action::Split,
    };

    if legal_actions.contains(&action) {
        Ok(action)
    } else {
        Err("basic strategy recommendation is not legal".to_string())
    }
}
