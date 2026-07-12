use blackjack_core::start_session;

/// Locks the exact shoe prefix for a fixed seed so the RNG refactor is proven
/// behavior-preserving on native. The same vector must hold on wasm32 after the fix.
#[test]
fn shoe_prefix_is_stable_for_seed() {
    let s = start_session("det-check", 100000, 2000, None).unwrap();
    let prefix: Vec<String> = s
        .shoe
        .cards
        .iter()
        .take(6)
        .map(|c| c.card_id.clone())
        .collect();
    // Step 2: captured native shoe prefix (pre-fix)
    let expected: Vec<&str> = vec![
        "deck-4-4-diamonds",
        "deck-1-A-spades",
        "deck-4-3-diamonds",
        "deck-1-5-diamonds",
        "deck-6-A-hearts",
        "deck-2-4-spades",
    ];
    assert_eq!(
        prefix, expected,
        "shoe prefix changed — RNG is not behavior-preserving on native"
    );
}
