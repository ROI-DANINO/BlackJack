import { beforeAll, describe, expect, it } from 'vitest';
import { initCoreForTest } from './test-init';
import { WasmTransport } from './core-client';
import { parseCliOutput } from './validate';
import type { CoreCommand, PresetCard } from './types';

beforeAll(async () => { await initCoreForTest(); });

describe('start_session_with_prefix transport', () => {
  it('arranges an opening and preserves six-deck composition', () => {
    const prefix: PresetCard[] = [
      { rank: 'eight', suit: 'spades' },
      { rank: 'six', suit: 'diamonds' },
      { rank: 'eight', suit: 'hearts' },
    ];
    const command: CoreCommand = {
      command: 'start_session_with_prefix',
      seed: 'lesson:split', bankroll: 100000, default_bet: 2000, ruleset: null, prefix,
    };
    const out = parseCliOutput(new WasmTransport().call(JSON.stringify(command)));
    if (out.status !== 'ok' || out.response.type !== 'session') throw new Error('expected session');
    const session = out.response.data;
    expect(session.shoe.cards).toHaveLength(312);
    expect(session.shoe.cards[0]!.deck_id).toBe('arranged');
    expect(session.shoe.cards[0]!.card_id).toBe('arranged-0-8-spades');
  });
});
