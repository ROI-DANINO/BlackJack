import { beforeAll, describe, expect, it } from 'vitest';
import { initCoreForTest } from '../bridge/test-init';
import { WasmTransport } from '../bridge/core-client';
import type { CoreTransport } from '../bridge/transport';
import { CoreRuleError } from '../bridge/validate';
import { LearnEngine } from './engine';

beforeAll(async () => { await initCoreForTest(); });

class FakeTransport implements CoreTransport {
  constructor(private readonly reply: string) {}
  call(): string { return this.reply; }
}

describe('LearnEngine.describeHand', () => {
  it('returns typed hand facts through the real WASM core', () => {
    const engine = new LearnEngine(new WasmTransport());
    expect(engine.describeHand([{ rank: 'ace', suit: 'spades' }, { rank: 'six', suit: 'hearts' }]))
      .toEqual({ hard_total: 7, best_total: 17, is_soft: true, is_bust: false });
  });

  it('converts a core-rejected command into a recoverable CoreRuleError', () => {
    const engine = new LearnEngine(new FakeTransport(JSON.stringify({ status: 'error', message: 'bad cards' })));
    expect(() => engine.describeHand([])).toThrow(CoreRuleError);
    expect(() => engine.describeHand([])).toThrow('bad cards');
  });

  it('throws BridgeError (fatal) on a malformed envelope', () => {
    const engine = new LearnEngine(new FakeTransport('not json'));
    expect(() => engine.describeHand([])).toThrow(/non-JSON/);
  });

  it('throws BridgeError (fatal) on a wrong-response-type reply', () => {
    const reply = JSON.stringify({ status: 'ok', response: { type: 'session', data: {} } });
    const engine = new LearnEngine(new FakeTransport(reply));
    expect(() => engine.describeHand([])).toThrow(/expected hand_facts, got session/);
  });
});

describe('LearnEngine profile-bound sessions', () => {
  it('starts an explicit canonical H17 session and returns Rust compatibility unchanged', () => {
    const engine = new LearnEngine(new WasmTransport());
    const session = engine.startLiveForProfile('h17', 'profiled-h17');
    expect(session.ruleset).toEqual({
      id: 'v1-modern-classic-h17-6d', decks: 6, penetration_percent: 75,
      dealer_soft_17: 'hit', blackjack_payout: 1.5, max_split_hands: 4,
      double_after_split: true, resplit_aces: false, split_aces_receive_one_card: true,
      insurance_auto_decline: true,
    });
    expect(engine.checkStrategyCompatibility('h17', session)).toBe('compatible');
  });

  it('starts an explicit canonical S17 session and returns Rust compatibility unchanged', () => {
    const engine = new LearnEngine(new WasmTransport());
    const session = engine.startLiveForProfile('s17', 'profiled-s17');
    expect(session.ruleset).toEqual({
      id: 'v1-modern-classic-s17-6d', decks: 6, penetration_percent: 75,
      dealer_soft_17: 'stand', blackjack_payout: 1.5, max_split_hands: 4,
      double_after_split: true, resplit_aces: false, split_aces_receive_one_card: true,
      insurance_auto_decline: true,
    });
    expect(engine.checkStrategyCompatibility('s17', session)).toBe('compatible');
  });
});
