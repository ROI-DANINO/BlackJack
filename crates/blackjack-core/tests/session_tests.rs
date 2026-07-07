use blackjack_core::{
    apply_action, current_legal_actions, start_round, start_session, Action, Card, OutcomeResult,
    Rank, RoundStatus, Suit,
};
use std::collections::HashSet;

fn card(card_id: &str, rank: Rank, suit: Suit) -> Card {
    Card {
        card_id: card_id.to_string(),
        deck_id: "deck-1".to_string(),
        rank,
        suit,
    }
}

#[test]
fn plays_complete_seeded_round_and_logs_dealt_cards() {
    let mut session = start_session("complete-round", 10_000, 2_500, None).expect("session");
    start_round(&mut session, None).expect("round");

    while session
        .round
        .as_ref()
        .is_some_and(|round| round.status == RoundStatus::PlayerTurn)
    {
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

    assert_eq!(
        session.round.as_ref().expect("round").status,
        RoundStatus::Resolved
    );
    assert_eq!(origins.len(), log.dealt_cards.len());
    assert!(!log.outcomes.is_empty());
    assert_eq!(log.bankroll_after - log.bankroll_before, log.bankroll_delta);
}

#[test]
fn rejects_round_when_bankroll_cannot_cover_bet() {
    let mut session = start_session("poor", 5, 50, None).expect("session");
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
        let mut session = start_session(&seed, 10_000, 2_500, None).expect("session");
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
    let mut session = start_session("double-seed", 10_000, 2_500, None).expect("session");
    start_round(&mut session, None).expect("round");

    if current_legal_actions(&session)
        .expect("legal")
        .contains(&Action::Double)
    {
        apply_action(&mut session, Action::Double).expect("double");
        let log = session.logs.first().expect("log");
        assert!(log.outcomes.iter().any(|outcome| outcome.wager == 5_000));
    }
}

#[test]
fn rejects_odd_bets_for_three_to_two_blackjack_payout() {
    let error = "bet must be divisible by 2 for 3:2 blackjack payout";

    assert_eq!(
        start_session("odd-default", 10_000, 25, None).expect_err("odd default bet"),
        error
    );

    let mut session = start_session("odd-round", 10_000, 2_500, None).expect("session");
    assert_eq!(
        start_round(&mut session, Some(25)).expect_err("odd round bet"),
        error
    );
}

#[test]
fn split_aces_round_does_not_get_stuck_with_no_legal_actions() {
    let mut found = None;

    for index in 0..10_000 {
        let seed = format!("split-aces-{index}");
        let mut session = start_session(&seed, 10_000, 2_500, None).expect("session");
        start_round(&mut session, None).expect("round");

        let round = session.round.as_ref().expect("round");
        let hand = &round.hands[0];
        if round.status == RoundStatus::PlayerTurn
            && hand.cards.len() == 2
            && hand.cards[0].rank == blackjack_core::Rank::Ace
            && hand.cards[1].rank == blackjack_core::Rank::Ace
            && current_legal_actions(&session)
                .expect("legal actions")
                .contains(&Action::Split)
        {
            let original_ids = [hand.cards[0].card_id.clone(), hand.cards[1].card_id.clone()];
            found = Some((session, original_ids));
            break;
        }
    }

    let (mut session, original_ids) = found.expect("seed with pair of aces");
    apply_action(&mut session, Action::Split).expect("split");

    let round = session.round.as_ref().expect("round");
    assert_eq!(round.hands.len(), 2);
    assert_eq!(round.hands[0].cards[0].card_id, original_ids[0]);
    assert_eq!(round.hands[1].cards[0].card_id, original_ids[1]);

    if round.status == RoundStatus::Resolved {
        assert!(!session.logs.is_empty());
        return;
    }

    assert_eq!(round.status, RoundStatus::PlayerTurn);
    assert!(round.active_hand_index < round.hands.len());
    assert!(!round.hands[round.active_hand_index].is_complete);
    assert!(
        !current_legal_actions(&session)
            .expect("legal actions after split")
            .is_empty(),
        "split hand got stuck with no legal actions"
    );
}

#[test]
fn split_two_card_twenty_one_settles_as_a_normal_win() {
    let mut session = start_session("split-21", 10_000, 10, None).expect("session");
    session.shoe.cards = vec![
        card("p1", Rank::Ten, Suit::Clubs),
        card("d1", Rank::Nine, Suit::Clubs),
        card("p2", Rank::Ten, Suit::Diamonds),
        card("d2", Rank::King, Suit::Diamonds),
        card("split-1", Rank::Ace, Suit::Hearts),
        card("split-2", Rank::Eight, Suit::Spades),
    ];
    session.shoe.cursor = 0;
    session.shoe.penetration_index = usize::MAX;

    start_round(&mut session, None).expect("round");
    assert!(current_legal_actions(&session).expect("legal").contains(&Action::Split));

    apply_action(&mut session, Action::Split).expect("split");
    apply_action(&mut session, Action::Stand).expect("stand first");
    apply_action(&mut session, Action::Stand).expect("stand second");

    let log = session.logs.first().expect("round log");
    let first_hand = log
        .outcomes
        .iter()
        .find(|outcome| outcome.hand_index == 0)
        .expect("first hand outcome");

    assert_eq!(first_hand.result, OutcomeResult::Win);
    assert_eq!(first_hand.delta, first_hand.wager);
    assert!(!log.outcomes.iter().any(|outcome| outcome.result == OutcomeResult::Blackjack));
}
