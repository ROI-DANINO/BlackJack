use blackjack_core::{Ruleset, start_session, v1_h17_ruleset};

fn session_with(ruleset: Ruleset) -> Result<(), String> {
    start_session("validation-seed", 10_000, 100, Some(ruleset)).map(|_| ())
}

#[test]
fn rejects_zero_blackjack_payout() {
    let mut ruleset = v1_h17_ruleset();
    ruleset.blackjack_payout = 0.0;
    assert!(session_with(ruleset).is_err());
}

#[test]
fn rejects_negative_blackjack_payout() {
    let mut ruleset = v1_h17_ruleset();
    ruleset.blackjack_payout = -1.5;
    assert!(session_with(ruleset).is_err());
}

#[test]
fn rejects_nan_blackjack_payout() {
    let mut ruleset = v1_h17_ruleset();
    ruleset.blackjack_payout = f32::NAN;
    assert!(session_with(ruleset).is_err());
}

#[test]
fn rejects_absurd_blackjack_payout() {
    let mut ruleset = v1_h17_ruleset();
    ruleset.blackjack_payout = 1000.0;
    assert!(session_with(ruleset).is_err());
}

#[test]
fn rejects_zero_decks() {
    let mut ruleset = v1_h17_ruleset();
    ruleset.decks = 0;
    assert!(session_with(ruleset).is_err());
}

#[test]
fn rejects_too_many_decks() {
    let mut ruleset = v1_h17_ruleset();
    ruleset.decks = 99;
    assert!(session_with(ruleset).is_err());
}

#[test]
fn rejects_zero_penetration_percent() {
    let mut ruleset = v1_h17_ruleset();
    ruleset.penetration_percent = 0;
    assert!(session_with(ruleset).is_err());
}

#[test]
fn rejects_out_of_range_penetration_percent() {
    let mut ruleset = v1_h17_ruleset();
    ruleset.penetration_percent = 200;
    assert!(session_with(ruleset).is_err());
}

#[test]
fn rejects_zero_max_split_hands() {
    let mut ruleset = v1_h17_ruleset();
    ruleset.max_split_hands = 0;
    assert!(session_with(ruleset).is_err());
}

#[test]
fn accepts_default_v1_ruleset() {
    assert!(session_with(v1_h17_ruleset()).is_ok());
}
