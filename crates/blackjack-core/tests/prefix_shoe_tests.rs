use blackjack_core::{
    Action, CoreCommand, PresetCard, Rank, RoundStatus, Suit, create_prefix_shoe,
    current_legal_actions, deal_card, dispatch_json, start_round, start_session_with_prefix,
};

fn preset(cards: &[(Rank, Suit)]) -> Vec<PresetCard> {
    cards
        .iter()
        .map(|(rank, suit)| PresetCard {
            rank: rank.clone(),
            suit: suit.clone(),
        })
        .collect()
}

#[test]
fn prefix_is_dealt_first_in_order_with_arranged_provenance() {
    let prefix = preset(&[
        (Rank::Eight, Suit::Spades),
        (Rank::Six, Suit::Diamonds),
        (Rank::Eight, Suit::Hearts),
    ]);
    let mut shoe = create_prefix_shoe(6, "lesson:split", 75, &prefix).expect("builds");

    // Composition is still a true six-deck.
    assert_eq!(shoe.cards.len(), 312);

    let p1 = deal_card(&mut shoe).expect("p1");
    assert_eq!((p1.rank, p1.suit), (Rank::Eight, Suit::Spades));
    assert_eq!(p1.deck_id, "arranged");
    assert_eq!(p1.card_id, "arranged-0-8-spades");
    let d1 = deal_card(&mut shoe).expect("d1");
    assert_eq!((d1.rank, d1.suit), (Rank::Six, Suit::Diamonds));
    let p2 = deal_card(&mut shoe).expect("p2");
    assert_eq!((p2.rank, p2.suit), (Rank::Eight, Suit::Hearts));
    assert_eq!(p2.card_id, "arranged-2-8-hearts");
}

#[test]
fn per_rank_suit_composition_is_preserved() {
    let prefix = preset(&[(Rank::Ace, Suit::Spades)]);
    let shoe = create_prefix_shoe(6, "lesson:bj", 75, &prefix).expect("builds");
    // Exactly six ace-of-spades across the shoe (one arranged + five remaining real).
    let count = shoe
        .cards
        .iter()
        .filter(|c| c.rank == Rank::Ace && c.suit == Suit::Spades)
        .count();
    assert_eq!(count, 6);
    // Remainder is normal shoe origin.
    let real_left = shoe
        .cards
        .iter()
        .filter(|c| c.deck_id != "arranged")
        .count();
    assert_eq!(real_left, 311);
}

#[test]
fn unavailable_prefix_card_is_rejected() {
    // Seven copies of one exact card cannot exist in a six-deck shoe.
    let prefix = preset(&[
        (Rank::Ace, Suit::Spades),
        (Rank::Ace, Suit::Spades),
        (Rank::Ace, Suit::Spades),
        (Rank::Ace, Suit::Spades),
        (Rank::Ace, Suit::Spades),
        (Rank::Ace, Suit::Spades),
        (Rank::Ace, Suit::Spades),
    ]);
    let err = create_prefix_shoe(6, "lesson:x", 75, &prefix).expect_err("rejected");
    assert!(err.contains("unavailable"));
}

#[test]
fn empty_prefix_is_rejected() {
    let err = create_prefix_shoe(6, "lesson:x", 75, &[]).expect_err("rejected");
    assert!(err.contains("at least one card"));
}

#[test]
fn arranged_pair_opening_offers_split_and_resolves_for_real() {
    // Player 8♠, 8♥ against dealer 6♦ up. Downstream is real shuffled cards.
    let prefix = preset(&[
        (Rank::Eight, Suit::Spades),
        (Rank::Six, Suit::Diamonds),
        (Rank::Eight, Suit::Hearts),
    ]);
    let mut session =
        start_session_with_prefix("lesson:split", 100_000, 2_000, None, prefix).expect("session");
    start_round(&mut session, None).expect("deals");

    let round = session.round.as_ref().expect("round");
    assert_eq!(round.status, RoundStatus::PlayerTurn);
    assert_eq!(round.hands[0].cards[0].deck_id, "arranged"); // provenance
    let legal = current_legal_actions(&session).expect("legal");
    assert!(legal.contains(&Action::Split)); // the situation is set up
}

#[test]
fn arranged_natural_blackjack_resolves_without_a_decision() {
    // Player A♠ + K♥ vs dealer 6♦ up -> natural, settles on deal (no player decision).
    let prefix = preset(&[
        (Rank::Ace, Suit::Spades),
        (Rank::Six, Suit::Diamonds),
        (Rank::King, Suit::Hearts),
    ]);
    let mut session =
        start_session_with_prefix("lesson:bj", 100_000, 2_000, None, prefix).expect("session");
    start_round(&mut session, None).expect("deals");
    assert_eq!(
        session.round.as_ref().unwrap().status,
        RoundStatus::Resolved
    );
    let log = session.logs.last().expect("logged");
    assert_eq!(
        log.outcomes[0].result,
        blackjack_core::OutcomeResult::Blackjack
    );
}

#[test]
fn start_session_with_prefix_dispatches_over_json() {
    let command = CoreCommand::StartSessionWithPrefix {
        seed: "lesson:bj".to_string(),
        bankroll: 100_000,
        default_bet: 2_000,
        ruleset: None,
        prefix: preset(&[
            (Rank::Ace, Suit::Spades),
            (Rank::Six, Suit::Diamonds),
            (Rank::King, Suit::Hearts),
        ]),
    };
    let json = serde_json::to_string(&command).expect("serializes");
    assert!(json.contains("\"command\":\"start_session_with_prefix\""));
    let out = dispatch_json(&json);
    assert!(out.contains("\"status\":\"ok\""));
    assert!(out.contains("\"deck_id\":\"arranged\""));
}
