use blackjack_core::{create_shoe, deal_card, discard_cards, needs_shuffle};
use std::collections::HashSet;

#[test]
fn creates_seeded_six_deck_shoe_with_unique_origins() {
    let shoe = create_shoe(6, "v1-seed", 75, 1).expect("shoe");
    let origins: HashSet<String> = shoe
        .cards
        .iter()
        .map(|card| format!("{}:{}", card.deck_id, card.card_id))
        .collect();

    assert_eq!(shoe.cards.len(), 312);
    assert_eq!(origins.len(), 312);
    assert_eq!(shoe.cursor, 0);
    assert!(shoe.discard.is_empty());
    assert_eq!(shoe.penetration_index, 234);
}

#[test]
fn shuffles_deterministically_by_seed() {
    let first: Vec<String> = create_shoe(6, "same-seed", 75, 1)
        .expect("shoe")
        .cards
        .into_iter()
        .take(8)
        .map(|card| card.card_id)
        .collect();
    let second: Vec<String> = create_shoe(6, "same-seed", 75, 1)
        .expect("shoe")
        .cards
        .into_iter()
        .take(8)
        .map(|card| card.card_id)
        .collect();
    let different: Vec<String> = create_shoe(6, "other-seed", 75, 1)
        .expect("shoe")
        .cards
        .into_iter()
        .take(8)
        .map(|card| card.card_id)
        .collect();

    assert_eq!(first, second);
    assert_ne!(first, different);
}

#[test]
fn deals_from_ordered_shoe_and_tracks_discard() {
    let mut shoe = create_shoe(1, "deal-seed", 50, 1).expect("shoe");
    let expected = shoe.cards[0].clone();
    let dealt = deal_card(&mut shoe).expect("card");
    discard_cards(&mut shoe, vec![dealt.clone()]);

    assert_eq!(dealt, expected);
    assert_eq!(shoe.cursor, 1);
    assert_eq!(shoe.discard, vec![expected]);
}

#[test]
fn marks_shuffle_after_penetration() {
    let mut shoe = create_shoe(1, "penetration-seed", 10, 1).expect("shoe");
    while shoe.cursor < shoe.penetration_index {
        let _ = deal_card(&mut shoe).expect("card");
    }
    assert!(needs_shuffle(&shoe));
}
