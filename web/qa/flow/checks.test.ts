import { describe, it, expect } from 'vitest';
import {
  RESHUFFLE_NOTICE,
  checkActiveHandIndicator,
  checkControlSurface,
  checkNoDoubleSplitAfterHit,
  checkNoStaleLeak,
  checkNoStuck,
  checkReshuffleNotice,
  type FlowSnapshot,
} from './checks';

function snap(p: Partial<FlowSnapshot> = {}): FlowSnapshot {
  return {
    roundKey: 1, label: 'after-deal', phase: 'in_session', status: 'player_turn',
    buttons: ['Hit', 'Stand', 'Double', 'Download history', 'New session'],
    legalActions: ['hit', 'stand', 'double'], handCount: 1, activeHandIndex: 0,
    activeHandCardCount: 2, activeMarkers: 0, noticeText: null, outcomeTexts: [],
    noteInputPresent: false, shoeNumber: 1, ...p,
  };
}

describe('checkControlSurface', () => {
  it('PASSES for a legal player-turn surface (buttons == legal actions)', () => {
    expect(checkControlSurface(snap()).passed).toBe(true);
  });
  it('PASSES for a legal idle surface (Start session only)', () => {
    expect(checkControlSurface(snap({ phase: 'idle', status: 'none', buttons: ['Start session'], legalActions: [] })).passed).toBe(true);
  });
  it('PASSES for a legal resolved surface (Deal, no in-turn actions)', () => {
    expect(checkControlSurface(snap({ status: 'resolved', buttons: ['Deal', 'Download history', 'New session'], legalActions: [] })).passed).toBe(true);
  });
  it('FAILS when Deal is offered mid player-turn (illegal surface)', () => {
    expect(checkControlSurface(snap({ buttons: ['Hit', 'Stand', 'Double', 'Deal', 'Download history', 'New session'] })).passed).toBe(false);
  });
  it('FAILS when a rendered button is not a legal action (Split shown but not legal)', () => {
    expect(checkControlSurface(snap({ buttons: ['Hit', 'Stand', 'Double', 'Split', 'Download history', 'New session'] })).passed).toBe(false);
  });
  it('FAILS when a resolved round leaves a stray action button', () => {
    expect(checkControlSurface(snap({ status: 'resolved', buttons: ['Deal', 'Hit', 'Download history', 'New session'], legalActions: [] })).passed).toBe(false);
  });
});

describe('checkNoStuck', () => {
  it('PASSES when at least one control is actionable', () => {
    expect(checkNoStuck(snap()).passed).toBe(true);
  });
  it('FAILS on a stuck state (no actionable control)', () => {
    expect(checkNoStuck(snap({ status: 'resolved', buttons: ['Download history', 'New session'], legalActions: [] })).passed).toBe(false);
  });
});

describe('checkActiveHandIndicator (QA-004)', () => {
  it('PASSES when exactly one hand is marked active during a split turn', () => {
    expect(checkActiveHandIndicator(snap({ handCount: 2, activeMarkers: 1, buttons: ['Hit', 'Stand', 'Double', 'Download history', 'New session'] })).passed).toBe(true);
  });
  it('FAILS when a split turn renders NO active-hand indicator (the QA-004 bug)', () => {
    expect(checkActiveHandIndicator(snap({ handCount: 2, activeMarkers: 0 })).passed).toBe(false);
  });
  it('FAILS when a single-hand round wrongly marks a hand active', () => {
    expect(checkActiveHandIndicator(snap({ handCount: 1, activeMarkers: 1 })).passed).toBe(false);
  });
  it('PASSES (no marker) on a resolved single-hand round', () => {
    expect(checkActiveHandIndicator(snap({ status: 'resolved', handCount: 1, activeMarkers: 0 })).passed).toBe(true);
  });
});

describe('checkNoDoubleSplitAfterHit', () => {
  it('PASSES when a 3-card hand no longer offers Double/Split', () => {
    expect(checkNoDoubleSplitAfterHit(snap({ activeHandCardCount: 3, buttons: ['Hit', 'Stand', 'Download history', 'New session'], legalActions: ['hit', 'stand'] })).passed).toBe(true);
  });
  it('FAILS when a 3-card hand still offers Double', () => {
    expect(checkNoDoubleSplitAfterHit(snap({ activeHandCardCount: 3 })).passed).toBe(false);
  });
});

describe('checkNoStaleLeak', () => {
  it('PASSES when a fresh player turn has no leftover outcome or note field', () => {
    expect(checkNoStaleLeak(snap({ label: 'after-deal' })).passed).toBe(true);
  });
  it('FAILS when a prior outcome leaks into the fresh round', () => {
    expect(checkNoStaleLeak(snap({ label: 'after-deal', outcomeTexts: ['Win (+$20.00)'] })).passed).toBe(false);
  });
  it('FAILS when the note input leaks into a fresh player turn', () => {
    expect(checkNoStaleLeak(snap({ label: 'after-deal', noteInputPresent: true })).passed).toBe(false);
  });
});

describe('checkReshuffleNotice', () => {
  const afterDeal = (roundKey: number, shoeNumber: number, noticeText: string | null): FlowSnapshot =>
    snap({ roundKey, label: 'after-deal', shoeNumber, noticeText });

  it('PASSES when the notice shows exactly on a shoe increment and clears next round', () => {
    const seq = [afterDeal(1, 1, null), afterDeal(2, 2, RESHUFFLE_NOTICE), afterDeal(3, 2, null)];
    expect(checkReshuffleNotice(seq).passed).toBe(true);
  });
  it('FAILS when the shoe increments but no reshuffle notice appears', () => {
    const seq = [afterDeal(1, 1, null), afterDeal(2, 2, null)];
    expect(checkReshuffleNotice(seq).passed).toBe(false);
  });
  it('FAILS when the reshuffle notice appears without a shoe increment (stale leak)', () => {
    const seq = [afterDeal(1, 1, null), afterDeal(2, 1, RESHUFFLE_NOTICE)];
    expect(checkReshuffleNotice(seq).passed).toBe(false);
  });
});
