import { describe, it, expect } from 'vitest';
import { handTotal, totalLabel } from './totals';
import type { Card, Rank } from '../bridge/types';

let n = 0;
const card = (rank: Rank): Card => ({ card_id: `c${n++}`, deck_id: 'd1', rank, suit: 'spades' });
const hand = (...ranks: Rank[]) => ranks.map(card);

describe('handTotal', () => {
  it('sums hard hands', () => {
    expect(handTotal(hand('ten', 'seven'))).toEqual({ total: 17, soft: false });
    expect(handTotal(hand('queen', 'jack'))).toEqual({ total: 20, soft: false });
  });
  it('counts an ace as 11 while that does not bust (soft)', () => {
    expect(handTotal(hand('ace', 'six'))).toEqual({ total: 17, soft: true });
    expect(handTotal(hand('ace', 'ace'))).toEqual({ total: 12, soft: true });
  });
  it('demotes aces to 1 as needed (hard)', () => {
    expect(handTotal(hand('ace', 'six', 'ten'))).toEqual({ total: 17, soft: false });
    expect(handTotal(hand('ace', 'ace', 'ten'))).toEqual({ total: 12, soft: false });
  });
  it('reports bust totals as-is', () => {
    expect(handTotal(hand('ten', 'nine', 'five'))).toEqual({ total: 24, soft: false });
  });
});

describe('totalLabel', () => {
  it('renders hard totals plainly', () => expect(totalLabel(hand('ten', 'seven'))).toBe('17'));
  it('renders soft totals as low/high', () => {
    expect(totalLabel(hand('ace', 'six'))).toBe('7/17');
    expect(totalLabel(hand('ace', 'ace'))).toBe('2/12');
  });
  it('renders exactly 21 plainly even when soft (blackjack reads as 21, not 11/21)', () => {
    expect(totalLabel(hand('ace', 'king'))).toBe('21');
  });
  it('renders no label for an empty hand', () => expect(totalLabel([])).toBe(''));
});
