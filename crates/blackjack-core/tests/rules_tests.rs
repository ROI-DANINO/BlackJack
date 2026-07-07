use blackjack_core::{
    dealer_must_hit, legal_actions, score_hand, v1_h17_ruleset, Action, Card, DealerSoft17,
    HandSource, HandState, Rank, Suit,
};

fn card(rank: Rank, id: &str) -> Card {
    Card {
        card_id: id.to_string(),
        deck_id: "deck-1".to_string(),
        rank,
        suit: Suit::Spades,
    }
}

#[test]
fn scores_soft_totals_blackjack_and_bust() {
    let soft = score_hand(&[card(Rank::Ace, "a"), card(Rank::Six, "six")]);
    assert_eq!(soft.best_total, 17);
    assert!(soft.is_soft);
    assert!(!soft.is_blackjack);

    let blackjack = score_hand(&[card(Rank::Ace, "a"), card(Rank::King, "king")]);
    assert_eq!(blackjack.best_total, 21);
    assert!(blackjack.is_blackjack);

    let bust = score_hand(&[
        card(Rank::King, "king"),
        card(Rank::Nine, "nine"),
        card(Rank::Five, "five"),
    ]);
    assert!(bust.is_bust);
}

#[test]
fn supports_h17_default_and_s17_override() {
    let soft_17 = vec![card(Rank::Ace, "a"), card(Rank::Six, "six")];
    let mut s17 = v1_h17_ruleset();
    s17.dealer_soft_17 = DealerSoft17::Stand;

    assert!(dealer_must_hit(&soft_17, &v1_h17_ruleset()));
    assert!(!dealer_must_hit(&soft_17, &s17));
}

#[test]
fn returns_legal_hit_stand_double_split_when_funds_allow() {
    let hand = HandState {
        cards: vec![card(Rank::Eight, "8a"), card(Rank::Eight, "8b")],
        wager: 25,
        is_complete: false,
        is_doubled: false,
        source: HandSource::Initial,
    };

    assert_eq!(
        legal_actions(&hand, &v1_h17_ruleset(), 1, 100),
        vec![Action::Hit, Action::Stand, Action::Double, Action::Split]
    );
}

#[test]
fn removes_double_and_split_when_bankroll_cannot_cover_them() {
    let hand = HandState {
        cards: vec![card(Rank::Eight, "8a"), card(Rank::Eight, "8b")],
        wager: 25,
        is_complete: false,
        is_doubled: false,
        source: HandSource::Initial,
    };

    assert_eq!(
        legal_actions(&hand, &v1_h17_ruleset(), 1, 0),
        vec![Action::Hit, Action::Stand]
    );
}

#[test]
fn split_aces_with_one_card_are_complete_when_rule_is_enabled() {
    let hand = HandState {
        cards: vec![card(Rank::Ace, "a"), card(Rank::Nine, "9")],
        wager: 25,
        is_complete: false,
        is_doubled: false,
        source: HandSource::Split,
    };

    assert_eq!(legal_actions(&hand, &v1_h17_ruleset(), 1, 100), Vec::new());
}

#[test]
fn split_non_ace_hand_that_draws_an_ace_still_has_legal_actions() {
    let hand = HandState {
        cards: vec![card(Rank::Eight, "8"), card(Rank::Ace, "a")],
        wager: 25,
        is_complete: false,
        is_doubled: false,
        source: HandSource::Split,
    };

    assert_eq!(
        legal_actions(&hand, &v1_h17_ruleset(), 1, 100),
        vec![Action::Hit, Action::Stand, Action::Double]
    );
}

#[test]
fn split_ace_pair_can_only_resplit_when_rule_and_limits_allow_it() {
    let hand = HandState {
        cards: vec![card(Rank::Ace, "a1"), card(Rank::Ace, "a2")],
        wager: 25,
        is_complete: false,
        is_doubled: false,
        source: HandSource::Split,
    };

    let mut ruleset = v1_h17_ruleset();
    ruleset.resplit_aces = true;

    assert_eq!(
        legal_actions(&hand, &ruleset, 1, 100),
        vec![Action::Split]
    );
    assert_eq!(legal_actions(&hand, &ruleset, 4, 100), Vec::new());
    assert_eq!(legal_actions(&hand, &ruleset, 1, 0), Vec::new());
}
