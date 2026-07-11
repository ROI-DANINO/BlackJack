import type { Card } from '../../src/bridge/types';
import type { Invariant } from '../lib/types';

export function checkArrangedProvenance(leadingCards: Card[]): Invariant {
  const bad = leadingCards.filter((card) => card.deck_id !== 'arranged');
  return {
    name: 'arranged opening is arranged-origin',
    passed: bad.length === 0,
    detail: bad.length ? `${bad.length} non-arranged` : undefined,
  };
}

export function checkLiveProvenance(cards: Card[]): Invariant {
  const bad = cards.filter((card) => !card.deck_id.startsWith('deck-'));
  return {
    name: 'live cards come from a shuffled shoe',
    passed: bad.length === 0,
    detail: bad.length ? `${bad.length} non-shoe` : undefined,
  };
}

export function checkComposition(cards: Card[]): Invariant {
  return {
    name: 'shoe is a true six-deck (312)',
    passed: cards.length === 312,
    detail: `len=${cards.length}`,
  };
}
