use blackjack_core::{
    Action, DealerSoft17, RoundStatus, apply_action, current_legal_actions, start_round,
    start_session, v1_h17_ruleset,
};
use std::collections::HashSet;

#[test]
fn free_play_core_proves_traceable_cards_logs_bankroll_and_s17() {
    let mut ruleset = v1_h17_ruleset();
    ruleset.dealer_soft_17 = DealerSoft17::Stand;
    let mut session = start_session("first-check", 1000, 50, Some(ruleset)).expect("session");
    start_round(&mut session, None).expect("round");

    while session
        .round
        .as_ref()
        .is_some_and(|round| round.status == RoundStatus::PlayerTurn)
    {
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
    assert!(
        log.dealt_cards
            .iter()
            .all(|card| !card.card_id.is_empty() && !card.deck_id.is_empty())
    );
    assert_eq!(log.bankroll_delta, outcome_delta);
    assert_eq!(log.bankroll_after, log.bankroll_before + outcome_delta);
}
