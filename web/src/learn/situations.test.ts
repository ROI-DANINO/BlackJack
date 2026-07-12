import { beforeAll, describe, expect, it } from 'vitest';
import { initCoreForTest } from '../bridge/test-init';
import { WasmTransport } from '../bridge/core-client';
import { parseCliOutput } from '../bridge/validate';
import type { Action, CoreCommand, PresetCard, SessionState } from '../bridge/types';
import { OPENINGS } from './situations';

beforeAll(async () => { await initCoreForTest(); });
const transport = new WasmTransport();

function start(prefix: PresetCard[]): SessionState {
  const out = parseCliOutput(transport.call(JSON.stringify({
    command: 'start_session_with_prefix', seed: 'openings-test', bankroll: 100000, default_bet: 2000, ruleset: null, prefix,
  } satisfies CoreCommand)));
  if (out.status !== 'ok' || out.response.type !== 'session') throw new Error('start failed');
  return out.response.data;
}
function round(session: SessionState): SessionState {
  const out = parseCliOutput(transport.call(JSON.stringify({ command: 'start_round', session, bet: null } satisfies CoreCommand)));
  if (out.status !== 'ok' || out.response.type !== 'session') throw new Error('round failed');
  return out.response.data;
}
function legal(session: SessionState): Action[] {
  const out = parseCliOutput(transport.call(JSON.stringify({ command: 'legal_actions', session } satisfies CoreCommand)));
  if (out.status !== 'ok' || out.response.type !== 'actions') throw new Error('legal failed');
  return out.response.data;
}

describe('OPENINGS serializable curriculum data', () => {
  it('carries no functions — survives a JSON round-trip unchanged', () => {
    expect(JSON.parse(JSON.stringify(OPENINGS))).toEqual(OPENINGS);
  });

  it('every named group has at least one opening', () => {
    for (const [name, group] of Object.entries(OPENINGS)) {
      expect(group.length, name).toBeGreaterThan(0);
    }
  });

  // Provenance + composition hold for EVERY opening across EVERY group: the prefix orders
  // the top of a real, shuffled, composition-correct six-deck (312-card) shoe.
  it('arranges each opening on a real 312-card shoe with arranged provenance', () => {
    for (const group of Object.values(OPENINGS)) {
      for (const opening of group) {
        const s = start(opening);
        expect(s.shoe.cards).toHaveLength(312);
        expect(s.shoe.cards[0]!.deck_id).toBe('arranged');
      }
    }
  });

  it('readableTotals deal a two-card hand the learner can hit or stand', () => {
    for (const opening of OPENINGS.readableTotals) {
      const r = round(start(opening));
      expect(r.round!.hands[0]!.cards).toHaveLength(2);
      const actions = legal(r);
      expect(actions).toContain('hit');
      expect(actions).toContain('stand');
    }
  });

  it('stiffHands total 12-16 and can be hit or stood', () => {
    for (const opening of OPENINGS.stiffHands) {
      const r = round(start(opening));
      const actions = legal(r);
      expect(actions).toContain('hit');
      expect(actions).toContain('stand');
    }
  });

  it('elevens can double', () => {
    for (const opening of OPENINGS.elevens) {
      const r = round(start(opening));
      expect(legal(r)).toContain('double');
    }
  });

  it('pairs can split', () => {
    for (const opening of OPENINGS.pairs) {
      const r = round(start(opening));
      expect(legal(r)).toContain('split');
    }
  });

  it('naturals resolve on the deal as a blackjack', () => {
    for (const opening of OPENINGS.naturals) {
      const r = round(start(opening));
      expect(r.round!.status).toBe('resolved');
      expect(r.logs.at(-1)!.outcomes[0]!.result).toBe('blackjack');
    }
  });
});
