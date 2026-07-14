use blackjack_core::{
    Action, CoreCommand, CoreResponse, OutcomeResult, PresetCard, Rank, RoundStatus, Suit,
    dispatch_json, handle_command, v1_h17_ruleset, v1_s17_ruleset,
};
use serde_json::{Value, json};

fn start_session(seed: &str) -> blackjack_core::SessionState {
    start_session_with_ruleset(seed, None)
}

fn start_session_with_ruleset(
    seed: &str,
    ruleset: Option<blackjack_core::Ruleset>,
) -> blackjack_core::SessionState {
    match handle_command(CoreCommand::StartSession {
        seed: seed.to_string(),
        bankroll: 2000,
        default_bet: 50,
        ruleset,
    })
    .expect("session")
    {
        CoreResponse::Session(session) => *session,
        CoreResponse::Actions(_) => panic!("expected session"),
        CoreResponse::HandFacts(_) => panic!("expected session"),
        CoreResponse::StrategyCompatibility(_) => panic!("expected session"),
    }
}

fn strategy_compatibility_json(profile_id: &str, session: blackjack_core::SessionState) -> Value {
    serde_json::from_str(&dispatch_json(
        &json!({
            "command": "check_strategy_compatibility",
            "profile_id": profile_id,
            "session": session,
        })
        .to_string(),
    ))
    .expect("JSON envelope")
}

fn start_round(session: blackjack_core::SessionState) -> blackjack_core::SessionState {
    match handle_command(CoreCommand::StartRound { session, bet: None }).expect("round") {
        CoreResponse::Session(session) => *session,
        CoreResponse::Actions(_) => panic!("expected session"),
        CoreResponse::HandFacts(_) => panic!("expected session"),
        CoreResponse::StrategyCompatibility(_) => panic!("expected session"),
    }
}

fn legal_actions(session: blackjack_core::SessionState) -> Vec<Action> {
    match handle_command(CoreCommand::LegalActions { session }).expect("actions") {
        CoreResponse::Actions(actions) => actions,
        CoreResponse::Session(_) => panic!("expected actions"),
        CoreResponse::HandFacts(_) => panic!("expected actions"),
        CoreResponse::StrategyCompatibility(_) => panic!("expected actions"),
    }
}

fn natural_blackjack_session() -> (String, blackjack_core::SessionState) {
    for index in 0..10_000 {
        let seed = format!("json-blackjack-{index}");
        let session = start_round(start_session(&seed));

        if session.logs.first().is_some_and(|log| {
            log.outcomes
                .iter()
                .any(|outcome| outcome.result == OutcomeResult::Blackjack)
        }) {
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
fn describe_hand_command_returns_engine_owned_ace_facts() {
    let cards = vec![
        PresetCard {
            rank: Rank::Ace,
            suit: Suit::Spades,
        },
        PresetCard {
            rank: Rank::Six,
            suit: Suit::Hearts,
        },
    ];
    let response = handle_command(CoreCommand::DescribeHand { cards }).expect("hand facts");
    match response {
        CoreResponse::HandFacts(facts) => {
            assert_eq!(facts.hard_total, 7);
            assert_eq!(facts.best_total, 17);
            assert!(facts.is_soft);
            assert!(!facts.is_bust);
        }
        other => panic!("expected hand facts, got {other:?}"),
    }
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
    assert_eq!(
        session.round.as_ref().expect("round").status,
        RoundStatus::Resolved
    );
    assert_eq!(log.bankroll_before, 2000);
    assert_eq!(blackjack.wager, 50);
    assert_eq!(blackjack.delta, 75);
    assert_eq!(log.bankroll_delta, 75);
    assert_eq!(log.bankroll_after, 2075);
    assert_eq!(session.bankroll, 2075);
}

#[test]
fn strategy_compatibility_accepts_matching_h17_profile() {
    let response = strategy_compatibility_json(
        "h17",
        start_session_with_ruleset("compat-h17", Some(v1_h17_ruleset())),
    );

    assert_eq!(response["status"], "ok");
    assert_eq!(response["response"]["type"], "strategy_compatibility");
    assert_eq!(response["response"]["data"], "compatible");
}

#[test]
fn strategy_compatibility_rejects_other_verified_profile() {
    let response = strategy_compatibility_json(
        "h17",
        start_session_with_ruleset("compat-s17", Some(v1_s17_ruleset())),
    );

    assert_eq!(response["status"], "ok");
    assert_eq!(response["response"]["data"], "profile_mismatch");
}

#[test]
fn strategy_compatibility_rejects_unverified_altered_ruleset() {
    let mut altered_ruleset = v1_h17_ruleset();
    altered_ruleset.penetration_percent = 70;
    let response = strategy_compatibility_json(
        "h17",
        start_session_with_ruleset("compat-altered", Some(altered_ruleset)),
    );

    assert_eq!(response["status"], "ok");
    assert_eq!(response["response"]["data"], "unsupported_ruleset");
}
