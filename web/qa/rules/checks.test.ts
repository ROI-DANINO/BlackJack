import { describe, it, expect } from 'vitest';
import type { Card, HandOutcome, HandState, Rank, Suit } from '../../src/bridge/types';
import type { RoundLine } from '../lib/types';
import type { RoundTrace } from '../lib/driver';
import {
  blackjackDelta,
  checkDealerH17,
  checkPayouts,
  checkSplitEligibility,
  checkTraceMatchesJsonl,
  deriveHandOutcome,
  isNaturalBlackjack,
} from './checks';

// --- fixture builders ---
let n = 0;
function card(rank: Rank, suit: Suit = 'clubs'): Card {
  return { card_id: `deck-1-${rank}-${suit}-${n++}`, deck_id: 'deck-1', rank, suit };
}
function hand(cards: Card[], opts: Partial<HandState> = {}): HandState {
  return { cards, wager: 2000, is_complete: true, is_doubled: false, source: 'initial', ...opts };
}
function outcome(hand_index: number, result: HandOutcome['result'], wager: number, delta: number): HandOutcome {
  return { hand_index, result, wager, delta };
}

function trace(t: Partial<RoundTrace>): RoundTrace {
  return {
    roundIndex: 0, seed: 's', bet: 2000, autoResolved: false,
    initialPlayerCards: [card('ten'), card('nine')], firstDecisionLegal: ['hit', 'stand', 'double'],
    dealerUpRank: 'seven', decisions: [], finalHands: [hand([card('ten'), card('king')])],
    finalDealer: [card('ten'), card('seven')], outcomes: [outcome(0, 'win', 2000, 2000)],
    insuranceDeclined: false, reshuffled: false, notice: null, ...t,
  };
}

function roundLine(outcomes: HandOutcome[]): RoundLine {
  return {
    type: 'round', schema_version: 1, session_id: 'sid', round_index: 0, ts: 't', note: null,
    seed: 's', ruleset: {} as never, shoe_number: 1, dealt_cards: [], actions: [], outcomes,
    bankroll_before: 100000, bankroll_after: 100000, bankroll_delta: 0, penetration_reached: false,
  };
}

describe('blackjackDelta', () => {
  it('pays 3:2 (integer cents)', () => {
    expect(blackjackDelta(2000)).toBe(3000);
    expect(blackjackDelta(3000)).toBe(4500);
  });
});

describe('isNaturalBlackjack', () => {
  it('is true for an initial two-card 21', () => {
    expect(isNaturalBlackjack(hand([card('ace'), card('king')]))).toBe(true);
  });
  it('is false for a post-split 21 (source split)', () => {
    expect(isNaturalBlackjack(hand([card('ace'), card('king')], { source: 'split' }))).toBe(false);
  });
  it('is false for a three-card 21', () => {
    expect(isNaturalBlackjack(hand([card('seven'), card('seven'), card('seven')]))).toBe(false);
  });
});

describe('deriveHandOutcome', () => {
  const dealer17 = [card('ten'), card('seven')];
  it('win 1× when player beats dealer', () => {
    expect(deriveHandOutcome(hand([card('ten'), card('king')]), dealer17, 2000)).toEqual({ result: 'win', delta: 2000 });
  });
  it('loss −1× when dealer beats player', () => {
    expect(deriveHandOutcome(hand([card('ten'), card('five')]), dealer17, 2000)).toEqual({ result: 'loss', delta: -2000 });
  });
  it('push 0 on equal totals', () => {
    expect(deriveHandOutcome(hand([card('ten'), card('seven')]), dealer17, 2000)).toEqual({ result: 'push', delta: 0 });
  });
  it('blackjack 1.5× for an initial natural vs non-natural dealer', () => {
    expect(deriveHandOutcome(hand([card('ace'), card('king')]), dealer17, 2000)).toEqual({ result: 'blackjack', delta: 3000 });
  });
  it('doubled stake scales the delta 2×', () => {
    expect(deriveHandOutcome(hand([card('ten'), card('king')]), dealer17, 4000)).toEqual({ result: 'win', delta: 4000 });
  });
  it('dealer bust is a win', () => {
    expect(deriveHandOutcome(hand([card('ten'), card('six')]), [card('ten'), card('six'), card('king')], 2000)).toEqual({ result: 'win', delta: 2000 });
  });
});

describe('checkPayouts', () => {
  it('PASSES when the engine outcome matches the re-derivation', () => {
    expect(checkPayouts(trace({})).every((i) => i.passed)).toBe(true);
  });
  it('FAILS on a wrong payout delta (deliberately-broken fixture)', () => {
    const bad = trace({ outcomes: [outcome(0, 'win', 2000, 4000)] }); // delta should be 2000
    expect(checkPayouts(bad).some((i) => !i.passed)).toBe(true);
  });
  it('FAILS on wrong wager scaling for a doubled hand', () => {
    const bad = trace({
      finalHands: [hand([card('ten'), card('king')], { is_doubled: true, wager: 4000 })],
      outcomes: [outcome(0, 'win', 2000, 4000)], // wager should be 4000 for a doubled hand
    });
    const wagerCheck = checkPayouts(bad).find((i) => i.name.includes('wager scaling'))!;
    expect(wagerCheck.passed).toBe(false);
  });
});

describe('checkDealerH17', () => {
  it('PASSES on a clean hard-17 stand', () => {
    expect(checkDealerH17(trace({ finalDealer: [card('ten'), card('seven')] })).passed).toBe(true);
  });
  it('PASSES when the dealer correctly hits soft 17', () => {
    // soft 17 (A,6) → hit → A,6,4 = 21 (stand). Valid H17 play.
    expect(checkDealerH17(trace({ finalDealer: [card('ace'), card('six'), card('four')] })).passed).toBe(true);
  });
  it('FAILS on a bad H17 stand (dealer stood on 15 with a live player)', () => {
    expect(checkDealerH17(trace({ finalDealer: [card('ten'), card('five')] })).passed).toBe(false);
  });
  it('FAILS when the dealer draws after busting', () => {
    // 16 → hit → 26 (bust) → drew AGAIN: illegal.
    expect(checkDealerH17(trace({ finalDealer: [card('ten'), card('six'), card('ten'), card('two')] })).passed).toBe(false);
  });
  it('FAILS when the dealer hits a stand total (hit on hard 18)', () => {
    expect(checkDealerH17(trace({ finalDealer: [card('ten'), card('eight'), card('two')] })).passed).toBe(false);
  });
});

describe('checkSplitEligibility', () => {
  it('PASSES when a same-rank pair is offered Split', () => {
    expect(checkSplitEligibility(trace({ initialPlayerCards: [card('eight'), card('eight')], firstDecisionLegal: ['hit', 'stand', 'double', 'split'] })).passed).toBe(true);
  });
  it('PASSES when two different ten-value ranks are offered Split', () => {
    expect(checkSplitEligibility(trace({ initialPlayerCards: [card('ten', 'hearts'), card('king', 'spades')], firstDecisionLegal: ['hit', 'stand', 'double', 'split'] })).passed).toBe(true);
  });
  it('FAILS when an eligible pair is NOT offered Split (mis-offered fixture)', () => {
    expect(checkSplitEligibility(trace({ initialPlayerCards: [card('eight'), card('eight')], firstDecisionLegal: ['hit', 'stand', 'double'] })).passed).toBe(false);
  });
  it('FAILS when a non-eligible hand IS offered Split', () => {
    expect(checkSplitEligibility(trace({ initialPlayerCards: [card('seven'), card('eight')], firstDecisionLegal: ['hit', 'stand', 'double', 'split'] })).passed).toBe(false);
  });
  it('skips auto-resolved (natural) rounds', () => {
    expect(checkSplitEligibility(trace({ autoResolved: true, firstDecisionLegal: [] })).passed).toBe(true);
  });
});

describe('checkTraceMatchesJsonl', () => {
  it('PASSES when engine outcomes equal the JSONL outcomes', () => {
    const t = trace({ outcomes: [outcome(0, 'win', 2000, 2000)] });
    expect(checkTraceMatchesJsonl(t, roundLine([outcome(0, 'win', 2000, 2000)])).passed).toBe(true);
  });
  it('FAILS on an engine↔JSONL delta mismatch (leaked/tampered record)', () => {
    const t = trace({ outcomes: [outcome(0, 'win', 2000, 2000)] });
    expect(checkTraceMatchesJsonl(t, roundLine([outcome(0, 'loss', 2000, -2000)])).passed).toBe(false);
  });
});
