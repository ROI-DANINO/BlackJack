use blackjack_core::{
    apply_action, current_legal_actions, start_round, start_session, Action, RoundStatus,
};
use std::collections::HashSet;

#[test]
fn plays_complete_seeded_round_and_logs_dealt_cards() {
    let mut session = start_session("complete-round", 1000, 25, None).expect("session");
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

    if current_legal_actions(&session)
        .expect("legal")
        .contains(&Action::Double)
    {
        apply_action(&mut session, Action::Double).expect("double");
        let log = session.logs.first().expect("log");
        assert!(log.outcomes.iter().any(|outcome| outcome.wager == 50));
    }
}
