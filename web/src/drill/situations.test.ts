import { beforeAll, describe, expect, it } from 'vitest';
import { initCoreForTest } from '../bridge/test-init';
import { WasmTransport } from '../bridge/core-client';
import { parseCliOutput } from '../bridge/validate';
import type { CoreCommand, PresetCard, SessionState } from '../bridge/types';
import { elevenOpening, naturalBlackjackOpening, pairOpening, stiffSixteenOpening } from './situations';

beforeAll(async () => { await initCoreForTest(); });
const transport = new WasmTransport();

function deal(prefix: PresetCard[]): SessionState {
  const start = parseCliOutput(transport.call(JSON.stringify({
    command: 'start_session_with_prefix', seed: 'sit-test', bankroll: 100000, default_bet: 2000, ruleset: null, prefix,
  } satisfies CoreCommand)));
  if (start.status !== 'ok' || start.response.type !== 'session') throw new Error('start');
  const round = parseCliOutput(transport.call(JSON.stringify({ command: 'start_round', session: start.response.data, bet: null } satisfies CoreCommand)));
  if (round.status !== 'ok' || round.response.type !== 'session') throw new Error('round');
  return round.response.data;
}
function legal(session: SessionState) {
  const out = parseCliOutput(transport.call(JSON.stringify({ command: 'legal_actions', session } satisfies CoreCommand)));
  if (out.status !== 'ok' || out.response.type !== 'actions') throw new Error('legal');
  return out.response.data;
}
const value = (rank: string) => (rank === 'ace' ? 11 : ['ten','jack','queen','king'].includes(rank) ? 10 : Number({two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9}[rank]));

describe('situation selectors set up the intended opening across seq variety', () => {
  for (let seq = 0; seq < 3; seq += 1) {
    it(`pairOpening(${seq}) is a splittable pair`, () => {
      const s = deal(pairOpening(seq));
      const [a, b] = s.round!.hands[0]!.cards;
      expect(value(a!.rank)).toBe(value(b!.rank));
      expect(legal(s)).toContain('split');
    });
    it(`elevenOpening(${seq}) totals 11 and can double`, () => {
      const s = deal(elevenOpening(seq));
      const [a, b] = s.round!.hands[0]!.cards;
      expect(value(a!.rank) + value(b!.rank)).toBe(11);
      expect(legal(s)).toContain('double');
    });
    it(`naturalBlackjackOpening(${seq}) is a natural`, () => {
      const s = deal(naturalBlackjackOpening(seq));
      // Natural resolves on deal.
      expect(s.round!.status).toBe('resolved');
      expect(s.logs.at(-1)!.outcomes[0]!.result).toBe('blackjack');
    });
    it(`stiffSixteenOpening(${seq}) totals 16`, () => {
      const s = deal(stiffSixteenOpening(seq));
      const [a, b] = s.round!.hands[0]!.cards;
      expect(value(a!.rank) + value(b!.rank)).toBe(16);
    });
  }
});
