import { readFileSync } from 'node:fs';
import { describe, it, expect } from 'vitest';
import { BridgeError, parseCliOutput } from './validate';
import type { CoreCommand, SessionState } from './types';

const FIX = new URL('../../../crates/blackjack-core/tests/fixtures/', import.meta.url);
const read = (name: string) => readFileSync(new URL(name, FIX), 'utf8');

describe('wire contract vs Rust golden fixtures', () => {
  it('parses a real session_start envelope into typed SessionState', () => {
    const out = parseCliOutput(read('session_start.json'));
    expect(out.status).toBe('ok');
    if (out.status !== 'ok' || out.response.type !== 'session') throw new Error('shape');
    const s: SessionState = out.response.data;
    expect(s.bankroll).toBe(100000);
    expect(s.ruleset.id).toBe('v1-modern-classic-h17-6d');
    expect(s.shoe.cards.length).toBe(312);
    // snake_case card fields must exist (guards camelCase drift)
    expect(s.shoe.cards[0]!.card_id).toBeTypeOf('string');
    expect(s.shoe.cards[0]!.deck_id).toBeTypeOf('string');
  });

  it('parses an actions envelope into Action[]', () => {
    const out = parseCliOutput(read('response_actions.json'));
    if (out.status !== 'ok' || out.response.type !== 'actions') throw new Error('shape');
    expect(out.response.data).toEqual(['hit', 'stand', 'double', 'split']);
  });

  it('parses Rust hand facts', () => {
    const out = parseCliOutput(read('response_hand_facts.json'));
    if (out.status !== 'ok' || out.response.type !== 'hand_facts') throw new Error('shape');
    expect(out.response.data).toEqual({ hard_total: 7, best_total: 17, is_soft: true, is_bust: false });
  });

  it('parses Rust strategy compatibility verdicts', () => {
    const out = parseCliOutput(read('response_strategy_compatibility.json'));
    if (out.status !== 'ok' || out.response.type !== 'strategy_compatibility') throw new Error('shape');
    expect(out.response.data).toBe('compatible');
  });

  it('rejects malformed strategy compatibility verdicts', () => {
    expect(() => parseCliOutput(JSON.stringify({
      status: 'ok',
      response: { type: 'strategy_compatibility', data: 'unknown_verdict' },
    }))).toThrow(BridgeError);
  });

  it('keeps the strategy compatibility command in snake_case', () => {
    const session = JSON.parse(read('session_resolved.json')) as SessionState;
    const command = {
      command: 'check_strategy_compatibility',
      profile_id: 'h17',
      session,
    } satisfies CoreCommand;
    expect(command).toMatchObject({ command: 'check_strategy_compatibility', profile_id: 'h17' });
  });

  it('covers every nested round/hand/dealer/log field name (guards nested drift)', () => {
    // Raw (non-enveloped) SessionState fixture, played to resolution.
    // This block only COMPILES if types.ts declares each field with its exact wire name,
    // and only PASSES if the real wire carries them — closing the nested-drift gap.
    const s: SessionState = JSON.parse(read('session_resolved.json'));
    const round = s.round!;
    expect(round.status).toBeTypeOf('string');
    expect(round.active_hand_index).toBeTypeOf('number');
    expect(round.bankroll_before).toBeTypeOf('number');
    expect(round.dealer.cards.length).toBeGreaterThan(0);
    const hand = round.hands[0]!;
    expect(hand.is_complete).toBeTypeOf('boolean');
    expect(hand.is_doubled).toBeTypeOf('boolean');
    expect(hand.wager).toBeTypeOf('number');
    expect(['initial', 'split']).toContain(hand.source);
    const act = round.actions[0]!;
    expect(act.hand_index).toBeTypeOf('number');
    expect(act.action).toBeTypeOf('string');
    expect(act).toHaveProperty('card_id');
    const log = s.logs[0]!;
    const outcome = log.outcomes[0]!;
    expect(outcome.hand_index).toBeTypeOf('number');
    expect(['win', 'loss', 'push', 'blackjack']).toContain(outcome.result);
    expect(outcome.wager).toBeTypeOf('number');
    expect(outcome.delta).toBeTypeOf('number');
    expect(log.bankroll_after).toBeTypeOf('number');
    expect(log.bankroll_delta).toBeTypeOf('number');
    expect(log.penetration_reached).toBeTypeOf('boolean');
  });

  it('throws BridgeError on non-JSON', () => {
    expect(() => parseCliOutput('garbage')).toThrow();
  });
});
