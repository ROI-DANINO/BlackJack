use blackjack_core::dispatch_json;

#[test]
fn ok_command_produces_status_ok_session_envelope() {
    let cmd = r#"{"command":"start_session","seed":"golden-seed","bankroll":100000,"default_bet":2000,"ruleset":null}"#;
    let out = dispatch_json(cmd);
    let v: serde_json::Value = serde_json::from_str(&out).unwrap();
    assert_eq!(v["status"], "ok");
    assert_eq!(v["response"]["type"], "session");
    assert_eq!(v["response"]["data"]["bankroll"], 100000);
}

#[test]
fn invalid_json_produces_status_error_envelope() {
    let out = dispatch_json("not json");
    let v: serde_json::Value = serde_json::from_str(&out).unwrap();
    assert_eq!(v["status"], "error");
    assert!(v["message"].as_str().unwrap().contains("invalid command json"));
}

#[test]
fn rules_error_produces_status_error_envelope() {
    let cmd = r#"{"command":"start_session","seed":"s","bankroll":-1,"default_bet":2000,"ruleset":null}"#;
    let out = dispatch_json(cmd);
    let v: serde_json::Value = serde_json::from_str(&out).unwrap();
    assert_eq!(v["status"], "error");
}
