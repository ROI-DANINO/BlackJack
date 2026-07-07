use blackjack_core::{
    Action, Card, Rank, RoundStatus, Suit, apply_action, start_round, start_session, v1_h17_ruleset,
};

fn card(card_id: &str, rank: Rank, suit: Suit) -> Card {
    Card {
        card_id: card_id.to_string(),
        deck_id: "deck-1".to_string(),
        rank,
        suit,
    }
}

// A hand played on a custom ruleset must be reproducible from its log alone: the
// RoundLog has to carry the full ruleset config, not just an opaque id string.
#[test]
fn round_log_captures_full_custom_ruleset_for_reproducibility() {
    let mut custom = v1_h17_ruleset();
    custom.id = "custom-test-ruleset".to_string();
    custom.decks = 4;
    custom.penetration_percent = 60;
    custom.max_split_hands = 2;

    let mut session =
        start_session("round-log-ruleset", 10_000, 10, Some(custom.clone())).expect("session");

    // Deterministic minimal round: player 20 stands, dealer 19 stands, player wins.
    session.shoe.cards = vec![
        card("p1", Rank::Ten, Suit::Clubs),
        card("d1", Rank::Ten, Suit::Diamonds),
        card("p2", Rank::Ten, Suit::Hearts),
        card("d2", Rank::Nine, Suit::Spades),
    ];
    session.shoe.cursor = 0;
    session.shoe.penetration_index = usize::MAX;

    start_round(&mut session, None).expect("round");
    apply_action(&mut session, Action::Stand).expect("stand");

    assert_eq!(
        session.round.as_ref().expect("round").status,
        RoundStatus::Resolved
    );

    let log = session.logs.first().expect("round log");
    // The whole ruleset config is reproducible from the log alone.
    assert_eq!(log.ruleset, custom);
    assert_eq!(log.ruleset.decks, 4);
    assert_eq!(log.ruleset.penetration_percent, 60);
    assert_eq!(log.ruleset.id, "custom-test-ruleset");
}
