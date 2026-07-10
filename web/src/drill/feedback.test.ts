import { describe, expect, it } from 'vitest';
import type { Card, HandOutcome, HandState } from '../bridge/types';
import { formatCents, outcomeLine, roundFeedback } from './feedback';

const card = (rank: Card['rank'], suit: Card['suit'] = 'spades'): Card => ({ card_id: `x-${rank}-${suit}`, deck_id: 'x', rank, suit });
const hand = (cards: Card[], over: Partial<HandState> = {}): HandState => ({ cards, wager: 2000, is_complete: true, is_doubled: false, source: 'initial', ...over });

describe('reactive feedback', () => {
  it('formats cents', () => { expect(formatCents(3000)).toBe('$30.00'); });

  it('names a natural blackjack and 3:2', () => {
    const line = outcomeLine(hand([card('ace'), card('king')]), { hand_index: 0, result: 'blackjack', wager: 2000, delta: 3000 }, [card('nine'), card('seven', 'clubs')]);
    expect(line.toLowerCase()).toContain('blackjack');
    expect(line).toContain('3:2');
  });

  it('distinguishes a bust loss from a comparison loss', () => {
    const bust = outcomeLine(hand([card('ten'), card('ten', 'clubs'), card('nine')]), { hand_index: 0, result: 'loss', wager: 2000, delta: -2000 }, [card('ten'), card('seven')]);
    expect(bust.toLowerCase()).toContain('bust');
    const beaten = outcomeLine(hand([card('ten'), card('nine')]), { hand_index: 0, result: 'loss', wager: 2000, delta: -2000 }, [card('ten'), card('king')]);
    expect(beaten.toLowerCase()).toContain('dealer');
    expect(beaten.toLowerCase()).not.toContain('bust');
  });

  it('names a push, one line per hand', () => {
    const lines = roundFeedback([hand([card('ten'), card('nine')])], [{ hand_index: 0, result: 'push', wager: 2000, delta: 0 }], [card('ten'), card('nine', 'clubs')]);
    expect(lines).toHaveLength(1);
    expect(lines[0]!.toLowerCase()).toContain('push');
  });
});
