use blackjack_core::{
    Action, CoreCommand, CoreResponse, RoundStatus, SessionState, apply_action,
    current_legal_actions, handle_command, reshuffle_shoe, start_round, start_session,
};

fn resolve_round(session: &mut SessionState) {
    while session
        .round
        .as_ref()
        .is_some_and(|round| round.status == RoundStatus::PlayerTurn)
    {
        let legal = current_legal_actions(session).expect("legal actions");
        let action = if legal.contains(&Action::Stand) {
            Action::Stand
        } else {
            Action::Hit
        };
        apply_action(session, action).expect("action");
    }
}

fn play_until_reshuffle(session: &mut SessionState) {
    loop {
        match start_round(session, None) {
            Ok(()) => resolve_round(session),
            Err(message) if message == "shoe must reshuffle" => return,
            Err(message) => panic!("unexpected start_round error: {message}"),
        }
    }
}

fn session_with_active_round(seed_prefix: &str) -> SessionState {
    for index in 0..1_000 {
        let mut session =
            start_session(&format!("{seed_prefix}-{index}"), 1_000_000, 2, None).expect("session");
        start_round(&mut session, None).expect("round");
        if session
            .round
            .as_ref()
            .is_some_and(|round| round.status != RoundStatus::Resolved)
        {
            return session;
        }
    }
    panic!("no seed produced an active round");
}

#[test]
fn reshuffle_advances_to_fresh_shoe_and_allows_new_round() {
    let mut session = start_session("reshuffle-a", 1_000_000, 2, None).expect("session");
    play_until_reshuffle(&mut session);

    let previous_shoe_number = session.shoe.shoe_number;
    assert_eq!(
        start_round(&mut session, None).expect_err("shoe must reshuffle"),
        "shoe must reshuffle"
    );

    reshuffle_shoe(&mut session).expect("reshuffle");

    assert_eq!(session.shoe.shoe_number, previous_shoe_number + 1);
    assert!(session.round.is_none());
    start_round(&mut session, None).expect("round after reshuffle");
}

#[test]
fn reshuffle_preserves_bankroll_and_logs() {
    let mut session = start_session("reshuffle-b", 1_000_000, 2, None).expect("session");
    play_until_reshuffle(&mut session);

    let bankroll = session.bankroll;
    let logs = session.logs.clone();
    let default_bet = session.default_bet;
    let seed = session.seed.clone();
    let ruleset = session.ruleset.clone();
    assert!(
        !logs.is_empty(),
        "expected accumulated logs before reshuffle"
    );

    reshuffle_shoe(&mut session).expect("reshuffle");

    assert_eq!(session.bankroll, bankroll);
    assert_eq!(session.logs.len(), logs.len());
    assert_eq!(session.logs, logs);
    assert_eq!(session.default_bet, default_bet);
    assert_eq!(session.seed, seed);
    assert_eq!(session.ruleset, ruleset);
}

#[test]
fn reshuffle_rejected_mid_round() {
    let mut session = session_with_active_round("reshuffle-c");
    assert_eq!(
        reshuffle_shoe(&mut session).expect_err("mid-round"),
        "cannot reshuffle mid-round"
    );
}

#[test]
fn new_shoe_order_differs_from_previous() {
    let mut session = start_session("reshuffle-d", 1_000_000, 2, None).expect("session");
    let first_order: Vec<String> = session
        .shoe
        .cards
        .iter()
        .map(|card| card.card_id.clone())
        .collect();

    play_until_reshuffle(&mut session);
    reshuffle_shoe(&mut session).expect("reshuffle");

    let second_order: Vec<String> = session
        .shoe
        .cards
        .iter()
        .map(|card| card.card_id.clone())
        .collect();

    assert_eq!(session.shoe.shoe_number, 2);
    assert_eq!(first_order.len(), second_order.len());
    assert_ne!(
        first_order, second_order,
        "new shoe order must differ deterministically from the previous shoe"
    );
}

#[test]
fn reshuffle_command_round_trips_through_boundary() {
    let mut session = start_session("reshuffle-e", 1_000_000, 2, None).expect("session");
    play_until_reshuffle(&mut session);
    let previous_shoe_number = session.shoe.shoe_number;

    let command = CoreCommand::Reshuffle { session };
    let encoded = serde_json::to_string(&command).expect("serialize");
    let decoded: CoreCommand = serde_json::from_str(&encoded).expect("deserialize");

    match handle_command(decoded).expect("handle reshuffle") {
        CoreResponse::Session(session) => {
            assert_eq!(session.shoe.shoe_number, previous_shoe_number + 1);
            assert!(session.round.is_none());
        }
        CoreResponse::Actions(_) => panic!("expected session response"),
    }
}
