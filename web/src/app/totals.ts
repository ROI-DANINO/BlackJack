import type { Card, Rank } from '../bridge/types';

// DISPLAY-ONLY totals. The engine adjudicates all outcomes; this exists so players
// don't do mental math (QA-005). If it ever disagrees with an engine outcome, the
// engine is right and this file is the bug. V2 should move totals onto the wire.
const VALUE: Record<Rank, number> = {
  ace: 11, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7,
  eight: 8, nine: 9, ten: 10, jack: 10, queen: 10, king: 10,
};

export function handTotal(cards: Card[]): { total: number; soft: boolean } {
  let total = 0, aces = 0;
  for (const c of cards) { total += VALUE[c.rank]; if (c.rank === 'ace') aces++; }
  while (total > 21 && aces > 0) { total -= 10; aces--; }
  return { total, soft: aces > 0 };
}

/** '17' for hard, '7/17' for soft; exactly 21 always reads plainly as '21'. */
export function totalLabel(cards: Card[]): string {
  if (cards.length === 0) return '';
  const { total, soft } = handTotal(cards);
  return soft && total !== 21 ? `${total - 10}/${total}` : `${total}`;
}
