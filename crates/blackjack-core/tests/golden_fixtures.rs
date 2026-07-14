use blackjack_core::{
    Action, CoreCommand, CoreResponse, RoundStatus, StrategyProfile, apply_action, dispatch_json,
    start_round, start_session,
};
use std::fs;

fn fixture_path(name: &str) -> String {
    format!("{}/tests/fixtures/{name}", env!("CARGO_MANIFEST_DIR"))
}

/// Compare `actual` to the committed fixture, or (re)write it when UPDATE_FIXTURES=1.
fn check_or_write(name: &str, actual: &str) {
    let path = fixture_path(name);
    if std::env::var("UPDATE_FIXTURES").is_ok() {
        fs::create_dir_all(std::path::Path::new(&path).parent().unwrap()).unwrap();
        fs::write(&path, actual).unwrap();
    } else {
        let expected = fs::read_to_string(&path)
            .unwrap_or_else(|_| panic!("missing {path}; run UPDATE_FIXTURES=1"));
        assert_eq!(
            actual.trim(),
            expected.trim(),
            "wire fixture {name} drifted"
        );
    }
}

#[test]
fn session_start_fixture_is_stable() {
    let cmd = r#"{"command":"start_session","seed":"golden-seed","bankroll":100000,"default_bet":2000,"ruleset":null}"#;
    check_or_write("session_start.json", &dispatch_json(cmd));
}

#[test]
fn actions_response_shape_is_stable() {
    // Exact adjacently-tagged, snake_case shape the TS Action[]/CoreResponse mirror must match.
    let resp = CoreResponse::Actions(vec![
        Action::Hit,
        Action::Stand,
        Action::Double,
        Action::Split,
    ]);
    let json = serde_json::to_string(&resp).unwrap();
    assert_eq!(
        json,
        r#"{"type":"actions","data":["hit","stand","double","split"]}"#
    );
}

#[test]
fn response_hand_facts_fixture_is_stable() {
    let cmd = r#"{"command":"describe_hand","cards":[{"rank":"ace","suit":"spades"},{"rank":"six","suit":"hearts"}]}"#;
    check_or_write("response_hand_facts.json", &dispatch_json(cmd));
}

#[test]
fn response_strategy_compatibility_fixture_is_stable() {
    let session = start_session("compatibility-golden", 100000, 2000, None).unwrap();
    let command = CoreCommand::CheckStrategyCompatibility {
        profile_id: StrategyProfile::H17,
        session,
    };
    let json = dispatch_json(&serde_json::to_string(&command).unwrap());

    check_or_write("response_strategy_compatibility.json", &json);
}

/// A full SessionState played to resolution, serialized RAW (not enveloped) so the TS
/// contract test can dereference every nested round/hand/dealer/log field name.
fn resolved_session_json() -> String {
    let mut s = start_session("golden-seed", 100000, 2000, None).unwrap();
    start_round(&mut s, Some(2000)).unwrap();
    let mut guard = 0;
    while s
        .round
        .as_ref()
        .is_some_and(|r| r.status == RoundStatus::PlayerTurn)
        && guard < 30
    {
        apply_action(&mut s, Action::Stand).unwrap();
        guard += 1;
    }
    serde_json::to_string(&s).unwrap()
}

#[test]
fn session_resolved_fixture_is_stable() {
    check_or_write("session_resolved.json", &resolved_session_json());
}
