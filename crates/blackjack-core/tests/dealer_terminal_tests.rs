use blackjack_core::{
    Action, Card, OutcomeResult, Rank, RoundStatus, Suit, apply_action, start_round, start_session,
};

fn card(card_id: &str, rank: Rank, suit: Suit) -> Card {
    Card {
        card_id: card_id.to_string(),
        deck_id: "deck-1".to_string(),
        rank,
        suit,
    }
}

/// Force a deterministic shoe: cards deal in order, cursor at start, penetration
/// never triggers a reshuffle mid-scenario.
fn seed_shoe(session: &mut blackjack_core::SessionState, cards: Vec<Card>) {
    session.shoe.cards = cards;
    session.shoe.cursor = 0;
    session.shoe.penetration_index = usize::MAX;
}

// (a) When the player's only hand busts, the dealer draws NO extra cards.
// Deal order is player, dealer, player, dealer, then draws from the cursor.
// Player: Ten + Six = 16, hits into a Ten = 26 (bust).
// Dealer: Ten + Five = 15, which WOULD hit if the loop ran (proves the guard).
#[test]
fn busted_only_hand_leaves_dealer_on_two_cards() {
    let mut session = start_session("dealer-terminal-bust", 10_000, 10, None).expect("session");
    seed_shoe(
        &mut session,
        vec![
            card("p1", Rank::Ten, Suit::Clubs),
            card("d1", Rank::Ten, Suit::Diamonds),
            card("p2", Rank::Six, Suit::Hearts),
            card("d2", Rank::Five, Suit::Spades),
            card("p-hit", Rank::Ten, Suit::Clubs),
            card("dealer-would-draw", Rank::Five, Suit::Diamonds),
            card("filler", Rank::Five, Suit::Hearts),
        ],
    );

    start_round(&mut session, None).expect("round");
    apply_action(&mut session, Action::Hit).expect("hit to bust");

    let round = session.round.as_ref().expect("round");
    assert_eq!(round.status, RoundStatus::Resolved);
    assert_eq!(
        round.dealer.cards.len(),
        2,
        "dealer must not draw when the only player hand busted"
    );

    let log = session.logs.first().expect("round log");
    assert!(
        log.outcomes
            .iter()
            .all(|outcome| outcome.result == OutcomeResult::Loss),
        "busted hand must settle as a loss"
    );
}

// (b) Player natural blackjack, dealer not natural: dealer draws no extra cards.
// Player: Ace + Ten = natural 21. Dealer: Nine + Five = 14 (would hit if loop ran).
#[test]
fn player_natural_leaves_dealer_on_two_cards() {
    let mut session = start_session("dealer-terminal-natural", 10_000, 10, None).expect("session");
    seed_shoe(
        &mut session,
        vec![
            card("p1", Rank::Ace, Suit::Clubs),
            card("d1", Rank::Nine, Suit::Diamonds),
            card("p2", Rank::Ten, Suit::Hearts),
            card("d2", Rank::Five, Suit::Spades),
            card("dealer-would-draw", Rank::Five, Suit::Diamonds),
            card("filler", Rank::Five, Suit::Hearts),
        ],
    );

    // Player blackjack auto-resolves inside start_round.
    start_round(&mut session, None).expect("round");

    let round = session.round.as_ref().expect("round");
    assert_eq!(round.status, RoundStatus::Resolved);
    assert_eq!(
        round.dealer.cards.len(),
        2,
        "dealer must not draw against a lone natural blackjack"
    );

    let log = session.logs.first().expect("round log");
    assert!(
        log.outcomes
            .iter()
            .any(|outcome| outcome.result == OutcomeResult::Blackjack),
        "natural must settle as a blackjack win"
    );
}

// (c) REGRESSION: player stands on a non-bust, non-blackjack hand and the dealer
// still plays out its hit loop as before.
// Player: Ten + Seven = 17 (stand). Dealer: Ten + Five = 15 -> draws Five -> 20.
#[test]
fn standing_hand_still_makes_dealer_play_out() {
    let mut session = start_session("dealer-terminal-stand", 10_000, 10, None).expect("session");
    seed_shoe(
        &mut session,
        vec![
            card("p1", Rank::Ten, Suit::Clubs),
            card("d1", Rank::Ten, Suit::Diamonds),
            card("p2", Rank::Seven, Suit::Hearts),
            card("d2", Rank::Five, Suit::Spades),
            card("dealer-draw", Rank::Five, Suit::Diamonds),
            card("filler", Rank::Five, Suit::Hearts),
        ],
    );

    start_round(&mut session, None).expect("round");
    apply_action(&mut session, Action::Stand).expect("stand");

    let round = session.round.as_ref().expect("round");
    assert_eq!(round.status, RoundStatus::Resolved);
    assert!(
        round.dealer.cards.len() > 2,
        "dealer must still draw when a live standing hand contests it"
    );
    assert_eq!(round.dealer.cards.len(), 3);
}

// (d) Split into two hands where one busts and one stands: the dealer still draws
// for the standing hand.
// Pair of Eights split. Hand 0: Eight + Six = 14, hits Ten -> 24 (bust).
// Hand 1: Eight + Ten = 18 (stand). Dealer: Ten + Five = 15 -> draws Five -> 20.
#[test]
fn split_with_one_busted_and_one_standing_still_draws_dealer() {
    let mut session = start_session("dealer-terminal-split", 10_000, 10, None).expect("session");
    seed_shoe(
        &mut session,
        vec![
            card("p1", Rank::Eight, Suit::Clubs),
            card("d1", Rank::Ten, Suit::Diamonds),
            card("p2", Rank::Eight, Suit::Hearts),
            card("d2", Rank::Five, Suit::Spades),
            card("split-a", Rank::Six, Suit::Clubs),
            card("split-b", Rank::Ten, Suit::Diamonds),
            card("hand0-hit", Rank::Ten, Suit::Hearts),
            card("dealer-draw", Rank::Five, Suit::Spades),
            card("filler", Rank::Five, Suit::Clubs),
        ],
    );

    start_round(&mut session, None).expect("round");
    apply_action(&mut session, Action::Split).expect("split");
    apply_action(&mut session, Action::Hit).expect("hit hand 0 to bust");
    apply_action(&mut session, Action::Stand).expect("stand hand 1");

    let round = session.round.as_ref().expect("round");
    assert_eq!(round.status, RoundStatus::Resolved);
    assert_eq!(round.hands.len(), 2);
    assert!(
        round.dealer.cards.len() > 2,
        "dealer must still draw for the live standing split hand"
    );
    assert_eq!(round.dealer.cards.len(), 3);
}
