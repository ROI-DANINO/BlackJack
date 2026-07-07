use blackjack_core::{handle_command, Action, CoreCommand, CoreResponse};

#[test]
fn start_session_command_returns_serializable_session() {
    let response = handle_command(CoreCommand::StartSession {
        seed: "json-seed".to_string(),
        bankroll: 1000,
        default_bet: 25,
        ruleset: None,
    })
    .expect("response");

    match response {
        CoreResponse::Session(session) => {
            assert_eq!(session.seed, "json-seed");
            assert_eq!(session.bankroll, 1000);
            assert_eq!(session.shoe.cards.len(), 312);
        }
        CoreResponse::Actions(_) => panic!("expected session"),
    }
}

#[test]
fn legal_actions_command_returns_actions_for_started_round() {
    let session = match handle_command(CoreCommand::StartSession {
        seed: "json-round".to_string(),
        bankroll: 1000,
        default_bet: 25,
        ruleset: None,
    })
    .expect("session")
    {
        CoreResponse::Session(session) => session,
        CoreResponse::Actions(_) => panic!("expected session"),
    };

    let session = match handle_command(CoreCommand::StartRound { session, bet: None }).expect("round")
    {
        CoreResponse::Session(session) => session,
        CoreResponse::Actions(_) => panic!("expected session"),
    };

    let actions = match handle_command(CoreCommand::LegalActions { session }).expect("actions") {
        CoreResponse::Actions(actions) => actions,
        CoreResponse::Session(_) => panic!("expected actions"),
    };

    assert!(actions.contains(&Action::Hit));
    assert!(actions.contains(&Action::Stand));
}
