import type { Card, HandOutcome, HandState } from '../bridge/types';
import { handTotal } from '../app/totals';

export function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export function outcomeLine(hand: HandState, outcome: HandOutcome, dealerCards: Card[]): string {
  const player = handTotal(hand.cards).total;
  const dealer = handTotal(dealerCards).total;
  const amount = formatCents(Math.abs(outcome.delta));
  switch (outcome.result) {
    case 'blackjack':
      return `Natural blackjack — two cards to 21. Pays 3:2: +${amount}.`;
    case 'win': {
      const stake = hand.is_doubled ? ' (doubled stake)' : '';
      const why = dealer > 21 ? 'the dealer busted' : `your ${player} beat the dealer's ${dealer}`;
      return `Win — ${why}. +${amount}${stake}.`;
    }
    case 'push':
      return `Push — both sides had ${player}. Your bet comes back.`;
    case 'loss':
      return player > 21
        ? `Bust — your ${player} went over 21, so the hand is lost. −${amount}.`
        : `The dealer's ${dealer} beat your ${player} — a strong total can still lose. −${amount}.`;
  }
}

export function roundFeedback(hands: HandState[], outcomes: HandOutcome[], dealerCards: Card[]): string[] {
  return outcomes.map((outcome) => outcomeLine(hands[outcome.hand_index]!, outcome, dealerCards));
}
