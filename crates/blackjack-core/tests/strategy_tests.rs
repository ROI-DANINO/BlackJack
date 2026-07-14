use blackjack_core::{
    Action, Card, HandSource, HandState, Rank, Ruleset, StrategyProfile, Suit,
    basic_strategy_action, legal_actions, resolve_profile, v1_h17_ruleset, v1_s17_ruleset,
};

const DEALER_UPCARDS: [Rank; 10] = [
    Rank::Two,
    Rank::Three,
    Rank::Four,
    Rank::Five,
    Rank::Six,
    Rank::Seven,
    Rank::Eight,
    Rank::Nine,
    Rank::Ten,
    Rank::Ace,
];

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

fn card(rank: Rank, id: &str) -> Card {
    Card {
        card_id: id.to_string(),
        deck_id: "deck-1".to_string(),
        rank,
        suit: Suit::Spades,
    }
}

fn initial_hand(ranks: &[Rank]) -> HandState {
    HandState {
        cards: ranks
            .iter()
            .cloned()
            .enumerate()
            .map(|(index, rank)| card(rank, &format!("player-{index}")))
            .collect(),
        wager: 25,
        is_complete: false,
        is_doubled: false,
        source: HandSource::Initial,
    }
}

fn expected_action(source_move: char) -> Action {
    match source_move {
        'H' => Action::Hit,
        'S' => Action::Stand,
        'D' | 'X' => Action::Double,
        'P' => Action::Split,
        _ => panic!("unexpected source move: {source_move}"),
    }
}

fn recommend(ranks: &[Rank], dealer_rank: Rank, legal_actions: &[Action]) -> Action {
    let hand = initial_hand(ranks);
    basic_strategy_action(
        &hand,
        &card(dealer_rank, "dealer-upcard"),
        &v1_h17_ruleset(),
        legal_actions,
    )
    .expect("supported ruleset should return a result")
    .expect("active player hand with legal actions should have a recommendation")
}

#[test]
fn recommends_every_hard_total_source_cell() {
    let hands = [
        [Rank::Two, Rank::Three],
        [Rank::Two, Rank::Four],
        [Rank::Two, Rank::Five],
        [Rank::Two, Rank::Six],
        [Rank::Two, Rank::Seven],
        [Rank::Two, Rank::Eight],
        [Rank::Two, Rank::Nine],
        [Rank::Two, Rank::Ten],
        [Rank::Three, Rank::Ten],
        [Rank::Four, Rank::Ten],
        [Rank::Five, Rank::Ten],
        [Rank::Six, Rank::Ten],
        [Rank::Seven, Rank::Ten],
        [Rank::Eight, Rank::Ten],
    ];

    for (row, ranks) in HARD.iter().zip(hands) {
        let hand = initial_hand(&ranks);
        let legal = legal_actions(&hand, &v1_h17_ruleset(), 1, 100);
        for (dealer_rank, source_move) in DEALER_UPCARDS.iter().cloned().zip(row.chars()) {
            assert_eq!(
                recommend(&ranks, dealer_rank.clone(), &legal),
                expected_action(source_move),
                "hard hand {:?} against dealer {:?}",
                ranks,
                dealer_rank,
            );
        }
    }
}

#[test]
fn recommends_every_soft_total_source_cell() {
    let hands = [
        [Rank::Ace, Rank::Two],
        [Rank::Ace, Rank::Three],
        [Rank::Ace, Rank::Four],
        [Rank::Ace, Rank::Five],
        [Rank::Ace, Rank::Six],
        [Rank::Ace, Rank::Seven],
        [Rank::Ace, Rank::Eight],
        [Rank::Ace, Rank::Nine],
    ];

    for (row, ranks) in SOFT.iter().zip(hands) {
        let hand = initial_hand(&ranks);
        let legal = legal_actions(&hand, &v1_h17_ruleset(), 1, 100);
        for (dealer_rank, source_move) in DEALER_UPCARDS.iter().cloned().zip(row.chars()) {
            assert_eq!(
                recommend(&ranks, dealer_rank.clone(), &legal),
                expected_action(source_move),
                "soft hand {:?} against dealer {:?}",
                ranks,
                dealer_rank,
            );
        }
    }
}

#[test]
fn recommends_every_pair_source_cell() {
    let ranks = [
        Rank::Two,
        Rank::Three,
        Rank::Four,
        Rank::Five,
        Rank::Six,
        Rank::Seven,
        Rank::Eight,
        Rank::Nine,
        Rank::Ten,
        Rank::Ace,
    ];

    for (row, rank) in PAIRS.iter().zip(ranks) {
        let hand_ranks = [rank.clone(), rank];
        let hand = initial_hand(&hand_ranks);
        let legal = legal_actions(&hand, &v1_h17_ruleset(), 1, 100);
        for (dealer_rank, source_move) in DEALER_UPCARDS.iter().cloned().zip(row.chars()) {
            assert_eq!(
                recommend(&hand_ranks, dealer_rank.clone(), &legal),
                expected_action(source_move),
                "pair {:?} against dealer {:?}",
                hand_ranks,
                dealer_rank,
            );
        }
    }
}

#[test]
fn falls_back_when_recommended_actions_are_unavailable() {
    assert_eq!(
        recommend(
            &[Rank::Ace, Rank::Six],
            Rank::Three,
            &[Action::Hit, Action::Stand]
        ),
        Action::Hit
    );
    assert_eq!(
        recommend(
            &[Rank::Ace, Rank::Seven],
            Rank::Two,
            &[Action::Hit, Action::Stand]
        ),
        Action::Stand
    );
    assert_eq!(
        recommend(
            &[Rank::Eight, Rank::Eight],
            Rank::Ten,
            &[Action::Hit, Action::Stand]
        ),
        Action::Hit
    );
    assert_eq!(
        recommend(
            &[Rank::Ace, Rank::Ace],
            Rank::Ten,
            &[Action::Hit, Action::Stand]
        ),
        Action::Hit
    );
    assert_eq!(
        recommend(
            &[Rank::Ten, Rank::Queen],
            Rank::Six,
            &[Action::Hit, Action::Stand, Action::Double, Action::Split],
        ),
        Action::Stand
    );
}

#[test]
fn returns_no_recommendation_without_legal_actions() {
    let hand = initial_hand(&[Rank::Ten, Rank::Seven]);
    assert_eq!(
        basic_strategy_action(
            &hand,
            &card(Rank::Six, "dealer-upcard"),
            &v1_h17_ruleset(),
            &[],
        ),
        Ok(None)
    );
}

#[test]
fn returns_no_recommendation_for_natural_blackjack_with_legal_actions() {
    let hand = initial_hand(&[Rank::Ace, Rank::King]);
    assert_eq!(
        basic_strategy_action(
            &hand,
            &card(Rank::Six, "dealer-upcard"),
            &v1_h17_ruleset(),
            &[Action::Hit, Action::Stand],
        ),
        Ok(None)
    );
}

#[test]
fn recommends_stand_for_split_ace_ten_with_legal_actions() {
    let mut hand = initial_hand(&[Rank::Ace, Rank::Ten]);
    hand.source = HandSource::Split;

    assert_eq!(
        basic_strategy_action(
            &hand,
            &card(Rank::Six, "dealer-upcard"),
            &v1_h17_ruleset(),
            &[Action::Stand],
        ),
        Ok(Some(Action::Stand))
    );
}

#[test]
fn rejects_an_unsupported_ruleset_id() {
    let hand = initial_hand(&[Rank::Ten, Rank::Seven]);
    let legal = legal_actions(&hand, &v1_h17_ruleset(), 1, 100);
    let mut unsupported: Ruleset = v1_h17_ruleset();
    unsupported.id = "unsupported".to_string();

    assert_eq!(
        basic_strategy_action(
            &hand,
            &card(Rank::Six, "dealer-upcard"),
            &unsupported,
            &legal,
        ),
        Err("basic strategy unavailable for ruleset: unsupported".to_string())
    );
}

#[test]
fn resolves_only_exact_canonical_rulesets() {
    assert_eq!(
        resolve_profile(&v1_h17_ruleset()),
        Some(StrategyProfile::H17)
    );
    assert_eq!(
        resolve_profile(&v1_s17_ruleset()),
        Some(StrategyProfile::S17)
    );

    let mut altered_decks = v1_h17_ruleset();
    altered_decks.decks = 8;
    assert_eq!(resolve_profile(&altered_decks), None);

    let mut altered_id = v1_h17_ruleset();
    altered_id.id = "v1-modern-classic-h17-8d".to_string();
    assert_eq!(resolve_profile(&altered_id), None);
}
