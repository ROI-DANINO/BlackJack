use crate::rng::SeededRng;
use crate::{Card, Rank, ShoeState, Suit};

const RANKS: [Rank; 13] = [
    Rank::Ace,
    Rank::Two,
    Rank::Three,
    Rank::Four,
    Rank::Five,
    Rank::Six,
    Rank::Seven,
    Rank::Eight,
    Rank::Nine,
    Rank::Ten,
    Rank::Jack,
    Rank::Queen,
    Rank::King,
];

const SUITS: [Suit; 4] = [Suit::Clubs, Suit::Diamonds, Suit::Hearts, Suit::Spades];

pub fn create_shoe(
    decks: u8,
    seed: &str,
    penetration_percent: u8,
    shoe_number: u32,
) -> Result<ShoeState, String> {
    if decks == 0 {
        return Err("decks must be positive".to_string());
    }
    if penetration_percent == 0 || penetration_percent > 100 {
        return Err("penetration_percent must be 1..=100".to_string());
    }

    let mut cards = Vec::with_capacity(decks as usize * 52);
    for deck in 1..=decks {
        let deck_id = format!("deck-{deck}");
        for suit in SUITS.iter() {
            for rank in RANKS.iter() {
                cards.push(Card {
                    card_id: format!("{deck_id}-{}-{}", rank_slug(rank), suit_slug(suit)),
                    deck_id: deck_id.clone(),
                    rank: rank.clone(),
                    suit: suit.clone(),
                });
            }
        }
    }

    shuffle(&mut cards, seed);
    let penetration_index = cards.len() * usize::from(penetration_percent) / 100;
    Ok(ShoeState {
        seed: seed.to_string(),
        shoe_number,
        cards,
        cursor: 0,
        discard: Vec::new(),
        penetration_index,
    })
}

pub fn deal_card(shoe: &mut ShoeState) -> Result<Card, String> {
    let card = shoe
        .cards
        .get(shoe.cursor)
        .cloned()
        .ok_or_else(|| "shoe is empty".to_string())?;
    shoe.cursor += 1;
    Ok(card)
}

pub fn discard_cards(shoe: &mut ShoeState, cards: Vec<Card>) {
    shoe.discard.extend(cards);
}

pub fn needs_shuffle(shoe: &ShoeState) -> bool {
    shoe.cursor >= shoe.penetration_index
}

fn shuffle(cards: &mut [Card], seed: &str) {
    let mut rng = SeededRng::new(seed);
    for index in (1..cards.len()).rev() {
        let swap_index = rng.next_usize(index + 1);
        cards.swap(index, swap_index);
    }
}

fn rank_slug(rank: &Rank) -> &'static str {
    match rank {
        Rank::Ace => "A",
        Rank::Two => "2",
        Rank::Three => "3",
        Rank::Four => "4",
        Rank::Five => "5",
        Rank::Six => "6",
        Rank::Seven => "7",
        Rank::Eight => "8",
        Rank::Nine => "9",
        Rank::Ten => "10",
        Rank::Jack => "J",
        Rank::Queen => "Q",
        Rank::King => "K",
    }
}

fn suit_slug(suit: &Suit) -> &'static str {
    match suit {
        Suit::Clubs => "clubs",
        Suit::Diamonds => "diamonds",
        Suit::Hearts => "hearts",
        Suit::Spades => "spades",
    }
}
