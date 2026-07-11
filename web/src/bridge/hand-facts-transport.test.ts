import { beforeAll, describe, expect, it } from 'vitest';
import { initCoreForTest } from './test-init';
import { WasmTransport } from './core-client';
import { parseCliOutput } from './validate';
import type { CoreCommand, PresetCard } from './types';

beforeAll(async () => { await initCoreForTest(); });

describe('describe_hand transport', () => {
  it('describes a three-card Ace hand through real WASM', () => {
    const cards: PresetCard[] = [
      { rank: 'ace', suit: 'spades' },
      { rank: 'six', suit: 'diamonds' },
      { rank: 'ten', suit: 'hearts' },
    ];
    const command: CoreCommand = { command: 'describe_hand', cards };
    const out = parseCliOutput(new WasmTransport().call(JSON.stringify(command)));
    if (out.status !== 'ok' || out.response.type !== 'hand_facts') throw new Error('expected hand facts');
    expect(out.response.data).toEqual({
      hard_total: 17,
      best_total: 17,
      is_soft: false,
      is_bust: false,
    });
  });
});
