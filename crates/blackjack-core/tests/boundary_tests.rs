use blackjack_core::{handle_command, Action, CoreCommand, CoreResponse, OutcomeResult, RoundStatus};

fn start_session(seed: &str) -> blackjack_core::SessionState {
    match handle_command(CoreCommand::StartSession {
        seed: seed.to_string(),
        bankroll: 2000,
        default_bet: 50,
        ruleset: None,
    })
    .expect("session")
    {
        CoreResponse::Session(session) => session,
        CoreResponse::Actions(_) => panic!("expected session"),
    }
}

fn start_round(session: blackjack_core::SessionState) -> blackjack_core::SessionState {
    match handle_command(CoreCommand::StartRound { session, bet: None }).expect("round") {
        CoreResponse::Session(session) => session,
        CoreResponse::Actions(_) => panic!("expected session"),
    }
}

fn legal_actions(session: blackjack_core::SessionState) -> Vec<Action> {
    match handle_command(CoreCommand::LegalActions { session }).expect("actions") {
        CoreResponse::Actions(actions) => actions,
        CoreResponse::Session(_) => panic!("expected actions"),
    }
}

fn natural_blackjack_session() -> (String, blackjack_core::SessionState) {
    for index in 0..10_000 {
        let seed = format!("json-blackjack-{index}");
        let session = start_round(start_session(&seed));

        if session
            .logs
            .first()
            .is_some_and(|log| log.outcomes.iter().any(|outcome| outcome.result == OutcomeResult::Blackjack))
        {
            return (seed, session);
        }
    }

    panic!("no natural blackjack seed found");
}

#[test]
fn start_session_command_returns_serializable_session() {
    let session = start_session("json-seed");

    assert_eq!(session.seed, "json-seed");
    assert_eq!(session.bankroll, 2000);
    assert_eq!(session.default_bet, 50);
    assert_eq!(session.shoe.cards.len(), 312);
}

#[test]
fn start_session_command_rejects_odd_default_bet_through_json_boundary() {
    let error = "bet must be divisible by 2 for 3:2 blackjack payout";

    let result = handle_command(CoreCommand::StartSession {
        seed: "json-odd-default".to_string(),
        bankroll: 2000,
        default_bet: 25,
        ruleset: None,
    });

    assert_eq!(result.expect_err("odd default bet"), error);
}

#[test]
fn legal_actions_command_returns_actions_for_started_round() {
    let session = start_round(start_session("json-round"));
    let actions = legal_actions(session);

    assert!(actions.contains(&Action::Hit));
    assert!(actions.contains(&Action::Stand));
}

#[test]
fn json_boundary_preserves_natural_blackjack_payout_in_session_log() {
    let (seed, session) = natural_blackjack_session();
    let log = session.logs.first().expect("round log");
    let blackjack = log
        .outcomes
        .iter()
        .find(|outcome| outcome.result == OutcomeResult::Blackjack)
        .expect("blackjack outcome");

    assert_eq!(session.seed, seed);
    assert_eq!(session.round.as_ref().expect("round").status, RoundStatus::Resolved);
    assert_eq!(log.bankroll_before, 2000);
    assert_eq!(blackjack.wager, 50);
    assert_eq!(blackjack.delta, 75);
    assert_eq!(log.bankroll_delta, 75);
    assert_eq!(log.bankroll_after, 2075);
    assert_eq!(session.bankroll, 2075);
}
