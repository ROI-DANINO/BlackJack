import { describe, it, expect } from 'vitest';
import { MemorySink } from './memory-sink';
import type { RoundLog, Ruleset } from '../types';

const ruleset: Ruleset = {
  id: 'v1-modern-classic-h17-6d', decks: 6, penetration_percent: 75, dealer_soft_17: 'hit',
  blackjack_payout: 1.5, max_split_hands: 4, double_after_split: true, resplit_aces: false,
  split_aces_receive_one_card: true, insurance_auto_decline: true,
};
const roundLog: RoundLog = {
  seed: 's', ruleset, shoe_number: 1, dealt_cards: [], actions: [],
  outcomes: [{ hand_index: 0, result: 'win', wager: 2000, delta: 2000 }],
  bankroll_before: 100000, bankroll_after: 102000, bankroll_delta: 2000, penetration_reached: false,
};

describe('MemorySink', () => {
  it('writes a header then round lines as valid JSONL carrying RoundLog verbatim', async () => {
    const sink = new MemorySink();
    await sink.write({
      type: 'session_header', schema_version: 1, session_id: 'sid', seed: 's',
      started_at: '2026-07-09T00:00:00Z', starting_bankroll: 100000, default_bet: 2000,
      ruleset, harness_version: 'ts-bridge-0.1.0',
    });
    await sink.write({ type: 'round', schema_version: 1, session_id: 'sid', round_index: 0, ts: '2026-07-09T00:01:00Z', note: null, ...roundLog });

    const lines = sink.text().split('\n');
    expect(lines).toHaveLength(2);
    const header = JSON.parse(lines[0]!);
    expect(header.type).toBe('session_header');
    const round = JSON.parse(lines[1]!);
    expect(round.type).toBe('round');
    expect(round.round_index).toBe(0);
    expect(round.bankroll_delta).toBe(2000);   // RoundLog field is present at top level
    expect(round.outcomes[0].result).toBe('win');
  });

  it('export() yields a trailing-newline ndjson Blob', async () => {
    const sink = new MemorySink();
    await sink.write({
      type: 'session_header', schema_version: 1, session_id: 'sid', seed: 's',
      started_at: 't', starting_bankroll: 1, default_bet: 1, ruleset, harness_version: 'v',
    });
    const text = await sink.export().text();
    expect(text.endsWith('\n')).toBe(true);
  });
});
