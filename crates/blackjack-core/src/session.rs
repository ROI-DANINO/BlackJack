use crate::{
    create_shoe, deal_card, dealer_must_hit, discard_cards, legal_actions, needs_shuffle,
    score_hand, v1_h17_ruleset, Action, ActionLog, Card, DealerState, HandOutcome, HandSource,
    HandState, LoggedAction, OutcomeResult, RoundLog, RoundState, RoundStatus, Ruleset,
    SessionState,
};

pub fn start_session(
    seed: &str,
    bankroll: i32,
    default_bet: i32,
    ruleset: Option<Ruleset>,
) -> Result<SessionState, String> {
    if bankroll < 0 {
        return Err("bankroll must be non-negative".to_string());
    }
    if default_bet <= 0 {
        return Err("default_bet must be positive".to_string());
    }

    let ruleset = ruleset.unwrap_or_else(v1_h17_ruleset);
    let shoe = create_shoe(ruleset.decks, seed, ruleset.penetration_percent, 1)?;

    Ok(SessionState {
        seed: seed.to_string(),
        ruleset,
        shoe,
        bankroll,
        default_bet,
        round: None,
        logs: Vec::new(),
    })
}

pub fn start_round(session: &mut SessionState, bet: Option<i32>) -> Result<(), String> {
    if session
        .round
        .as_ref()
        .is_some_and(|round| round.status != RoundStatus::Resolved)
    {
        return Err("round already active".to_string());
    }

    let bet = bet.unwrap_or(session.default_bet);
    if bet <= 0 {
        return Err("bet must be positive".to_string());
    }
    if session.bankroll < bet {
        return Err("insufficient bankroll".to_string());
    }
    if needs_shuffle(&session.shoe) {
        return Err("shoe must reshuffle".to_string());
    }

    let mut player = HandState {
        cards: Vec::new(),
        wager: bet,
        is_complete: false,
        is_doubled: false,
        source: HandSource::Initial,
    };
    let mut dealer = DealerState { cards: Vec::new() };
    let mut dealt_cards = Vec::new();

    deal_initial_card(&mut session.shoe, &mut player.cards, &mut dealt_cards)?;
    deal_initial_card(&mut session.shoe, &mut dealer.cards, &mut dealt_cards)?;
    deal_initial_card(&mut session.shoe, &mut player.cards, &mut dealt_cards)?;
    deal_initial_card(&mut session.shoe, &mut dealer.cards, &mut dealt_cards)?;

    let mut actions = Vec::new();
    if dealer
        .cards
        .first()
        .is_some_and(|card| matches!(card.rank, crate::Rank::Ace))
        && session.ruleset.insurance_auto_decline
    {
        actions.push(ActionLog {
            action: LoggedAction::InsuranceDeclined,
            hand_index: 0,
            card_id: None,
        });
    }

    session.round = Some(RoundState {
        status: RoundStatus::PlayerTurn,
        bet,
        active_hand_index: 0,
        dealer,
        hands: vec![player],
        dealt_cards,
        actions,
        bankroll_before: session.bankroll,
    });

    finish_if_naturals(session)
}

pub fn current_legal_actions(session: &SessionState) -> Result<Vec<Action>, String> {
    let round = active_round(session)?;
    let hand = round
        .hands
        .get(round.active_hand_index)
        .ok_or_else(|| "active hand missing".to_string())?;
    let committed: i32 = round.hands.iter().map(|hand| hand.wager).sum();

    Ok(legal_actions(
        hand,
        &session.ruleset,
        round.hands.len(),
        session.bankroll - committed,
    ))
}

pub fn apply_action(session: &mut SessionState, action: Action) -> Result<(), String> {
    let legal = current_legal_actions(session)?;
    if !legal.contains(&action) {
        return Err(format!("invalid action: {action:?}"));
    }

    match action {
        Action::Hit => hit(session),
        Action::Stand => stand(session),
        Action::Double => double_down(session),
        Action::Split => split_hand(session),
    }
}

fn hit(session: &mut SessionState) -> Result<(), String> {
    let card = deal_card(&mut session.shoe)?;
    let round = active_round_mut(session)?;
    let hand_index = round.active_hand_index;
    let hand = round
        .hands
        .get_mut(hand_index)
        .ok_or_else(|| "active hand missing".to_string())?;
    hand.cards.push(card.clone());
    if score_hand(&hand.cards).is_bust {
        hand.is_complete = true;
    }
    round.dealt_cards.push(card.clone());
    round.actions.push(ActionLog {
        action: LoggedAction::Hit,
        hand_index,
        card_id: Some(card.card_id),
    });
    if round.hands[hand_index].is_complete {
        advance_hand(session)?;
    }
    Ok(())
}

fn stand(session: &mut SessionState) -> Result<(), String> {
    let round = active_round_mut(session)?;
    let hand_index = round.active_hand_index;
    round.hands[hand_index].is_complete = true;
    round.actions.push(ActionLog {
        action: LoggedAction::Stand,
        hand_index,
        card_id: None,
    });
    advance_hand(session)
}

fn double_down(session: &mut SessionState) -> Result<(), String> {
    let card = deal_card(&mut session.shoe)?;
    let round = active_round_mut(session)?;
    let hand_index = round.active_hand_index;
    let hand = &mut round.hands[hand_index];
    hand.wager *= 2;
    hand.cards.push(card.clone());
    hand.is_doubled = true;
    hand.is_complete = true;
    round.dealt_cards.push(card.clone());
    round.actions.push(ActionLog {
        action: LoggedAction::Double,
        hand_index,
        card_id: Some(card.card_id),
    });
    advance_hand(session)
}

fn split_hand(session: &mut SessionState) -> Result<(), String> {
    let first_draw = deal_card(&mut session.shoe)?;
    let second_draw = deal_card(&mut session.shoe)?;
    let round = active_round_mut(session)?;
    let hand_index = round.active_hand_index;
    let hand = round.hands.remove(hand_index);
    let first = HandState {
        cards: vec![hand.cards[0].clone(), first_draw.clone()],
        wager: hand.wager,
        is_complete: false,
        is_doubled: false,
        source: HandSource::Split,
    };
    let second = HandState {
        cards: vec![hand.cards[1].clone(), second_draw.clone()],
        wager: hand.wager,
        is_complete: false,
        is_doubled: false,
        source: HandSource::Split,
    };

    round.hands.insert(hand_index, second);
    round.hands.insert(hand_index, first);
    round.dealt_cards.push(first_draw);
    round.dealt_cards.push(second_draw);
    round.actions.push(ActionLog {
        action: LoggedAction::Split,
        hand_index,
        card_id: None,
    });
    Ok(())
}

fn advance_hand(session: &mut SessionState) -> Result<(), String> {
    let round = active_round_mut(session)?;
    if let Some(next_index) = round
        .hands
        .iter()
        .enumerate()
        .skip(round.active_hand_index + 1)
        .find_map(|(index, hand)| (!hand.is_complete).then_some(index))
    {
        round.active_hand_index = next_index;
        return Ok(());
    }

    resolve_dealer_and_round(session)
}

fn resolve_dealer_and_round(session: &mut SessionState) -> Result<(), String> {
    {
        let round = active_round_mut(session)?;
        round.status = RoundStatus::DealerTurn;
    }

    loop {
        let must_hit = {
            let round = active_round(session)?;
            dealer_must_hit(&round.dealer.cards, &session.ruleset)
        };
        if !must_hit {
            break;
        }

        let card = deal_card(&mut session.shoe)?;
        let round = active_round_mut(session)?;
        round.dealer.cards.push(card.clone());
        round.dealt_cards.push(card);
    }

    let (outcomes, cards_to_discard, bankroll_before, dealt_cards, actions) = {
        let round = active_round(session)?;
        let outcomes = settle_hands(&round.hands, &round.dealer.cards, &session.ruleset);
        let cards_to_discard = round
            .dealer
            .cards
            .iter()
            .cloned()
            .chain(
                round
                    .hands
                    .iter()
                    .flat_map(|hand| hand.cards.iter().cloned()),
            )
            .collect();
        (
            outcomes,
            cards_to_discard,
            round.bankroll_before,
            round.dealt_cards.clone(),
            round.actions.clone(),
        )
    };

    let bankroll_delta: i32 = outcomes.iter().map(|outcome| outcome.delta).sum();
    session.bankroll += bankroll_delta;
    discard_cards(&mut session.shoe, cards_to_discard);
    let penetration_reached = needs_shuffle(&session.shoe);
    let log = RoundLog {
        seed: session.seed.clone(),
        ruleset_id: session.ruleset.id.clone(),
        shoe_number: session.shoe.shoe_number,
        dealt_cards,
        actions,
        outcomes,
        bankroll_before,
        bankroll_after: session.bankroll,
        bankroll_delta,
        penetration_reached,
    };
    session.logs.push(log);
    active_round_mut(session)?.status = RoundStatus::Resolved;
    Ok(())
}

fn finish_if_naturals(session: &mut SessionState) -> Result<(), String> {
    let has_natural = {
        let round = active_round(session)?;
        score_hand(&round.hands[0].cards).is_blackjack
            || score_hand(&round.dealer.cards).is_blackjack
    };
    if has_natural {
        active_round_mut(session)?.hands[0].is_complete = true;
        resolve_dealer_and_round(session)?;
    }
    Ok(())
}

fn settle_hands(hands: &[HandState], dealer_cards: &[Card], ruleset: &Ruleset) -> Vec<HandOutcome> {
    let dealer_score = score_hand(dealer_cards);
    hands
        .iter()
        .enumerate()
        .map(|(hand_index, hand)| {
            let score = score_hand(&hand.cards);
            if score.is_blackjack && !dealer_score.is_blackjack {
                return HandOutcome {
                    hand_index,
                    result: OutcomeResult::Blackjack,
                    wager: hand.wager,
                    delta: (hand.wager as f32 * ruleset.blackjack_payout) as i32,
                };
            }
            if score.is_bust {
                return HandOutcome {
                    hand_index,
                    result: OutcomeResult::Loss,
                    wager: hand.wager,
                    delta: -hand.wager,
                };
            }
            if dealer_score.is_bust || score.best_total > dealer_score.best_total {
                return HandOutcome {
                    hand_index,
                    result: OutcomeResult::Win,
                    wager: hand.wager,
                    delta: hand.wager,
                };
            }
            if score.best_total == dealer_score.best_total {
                return HandOutcome {
                    hand_index,
                    result: OutcomeResult::Push,
                    wager: hand.wager,
                    delta: 0,
                };
            }
            HandOutcome {
                hand_index,
                result: OutcomeResult::Loss,
                wager: hand.wager,
                delta: -hand.wager,
            }
        })
        .collect()
}

fn deal_initial_card(
    shoe: &mut crate::ShoeState,
    target: &mut Vec<Card>,
    dealt_cards: &mut Vec<Card>,
) -> Result<(), String> {
    let card = deal_card(shoe)?;
    target.push(card.clone());
    dealt_cards.push(card);
    Ok(())
}

fn active_round(session: &SessionState) -> Result<&RoundState, String> {
    session
        .round
        .as_ref()
        .filter(|round| round.status != RoundStatus::Resolved)
        .ok_or_else(|| "no active round".to_string())
}

fn active_round_mut(session: &mut SessionState) -> Result<&mut RoundState, String> {
    session
        .round
        .as_mut()
        .filter(|round| round.status != RoundStatus::Resolved)
        .ok_or_else(|| "no active round".to_string())
}
