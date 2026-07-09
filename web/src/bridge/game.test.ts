import { describe, it, expect, beforeAll } from 'vitest';
import { execSync } from 'node:child_process';
import { GameController } from './game';
import { CliTransport } from './cli-transport';
import { MemorySink } from './log/memory-sink';
import type { CoreTransport } from './transport';
import type { SessionState } from './types';

const BIN = new URL('../../../target/debug/blackjack-core', import.meta.url).pathname;
beforeAll(() => execSync('cargo build -p blackjack-core', { cwd: new URL('../../../', import.meta.url).pathname }));

function make() {
  let n = 0, t = 0;
  const sink = new MemorySink();
  const c = new GameController(new CliTransport(BIN), sink,
    { now: () => `t${t++}` }, { next: () => `sid-${n++}` });
  return { c, sink };
}

const roundLines = (text: string) =>
  text.split('\n').filter((l) => l && JSON.parse(l).type === 'round');

describe('GameController', () => {
  it('starts a session and writes a header line', async () => {
    const { c, sink } = make();
    await c.startSession('seed-a', 100000, 2000);
    expect(c.getState().phase).toBe('in_session');
    expect(c.getState().session!.bankroll).toBe(100000);
    expect(JSON.parse(sink.text().split('\n')[0]!).type).toBe('session_header');
  });

  it('buffers the resolved round and writes it (with the note) on the next Deal', async () => {
    const { c, sink } = make();
    await c.startSession('seed-a', 100000, 2000);
    await c.startRound(2000);
    let guard = 0;
    while (c.getState().session!.round?.status === 'player_turn' && guard++ < 20) await c.act('stand');
    expect(c.getState().session!.round!.status).toBe('resolved');
    // Not written yet — it's buffered awaiting a note.
    expect(roundLines(sink.text())).toHaveLength(0);
    expect(c.getState().canNote).toBe(true);

    c.setNote('stood on a stiff vs 10');
    await c.startRound(2000);   // Deal flushes the buffered round with the note, then deals again
    const lines = roundLines(sink.text());
    expect(lines).toHaveLength(1);
    const line = JSON.parse(lines[0]!);
    expect(line.round_index).toBe(0);
    expect(line.note).toBe('stood on a stiff vs 10');
  });

  it('flushes the pending round (with note) on downloadLog', async () => {
    const { c } = make();
    await c.startSession('seed-a', 100000, 2000);
    await c.startRound(2000);
    let guard = 0;
    while (c.getState().session!.round?.status === 'player_turn' && guard++ < 20) await c.act('stand');
    c.setNote('flush me');
    const text = await (await c.downloadLog()).text();
    const lines = roundLines(text);
    expect(lines).toHaveLength(1);
    expect(JSON.parse(lines[0]!).note).toBe('flush me');
    expect(c.getState().canNote).toBe(false);
  });

  it('strips logs from retained state but bankroll stays correct across rounds', async () => {
    const { c } = make();
    await c.startSession('seed-a', 100000, 2000);
    await c.startRound(2000);
    let guard = 0;
    while (c.getState().session!.round?.status === 'player_turn' && guard++ < 20) await c.act('stand');
    expect(c.getState().session!.logs).toHaveLength(0);           // stripped
    expect(Number.isInteger(c.getState().session!.bankroll)).toBe(true);
  });

  it('surfaces a recoverable rule error without leaving in_session', async () => {
    const { c } = make();
    await c.startSession('seed-a', 100000, 2000);
    await c.act('hit');   // no active round -> core returns an error envelope
    expect(c.getState().phase).toBe('in_session');
    expect(c.getState().lastError).toBeTruthy();
  });

  it('buffers and logs a naturals round resolved inside start_round (zero player actions)', async () => {
    for (let i = 0; i < 200; i++) {
      const { c } = make();
      await c.startSession(`nat-${i}`, 100000, 2000);
      await c.startRound(2000);
      if (c.getState().session!.round!.status === 'resolved' && c.getState().canNote) {
        // natural resolved with zero player actions -> buffered; flush via download and assert
        const text = await (await c.downloadLog()).text();
        expect(roundLines(text)).toHaveLength(1);
        return;
      }
    }
    throw new Error('no natural found in 200 seeds — widen the search');
  });

  it('keeps latest resolved hand outcomes in state for the table UI', async () => {
    const base = (round: SessionState['round'], logs: SessionState['logs'] = []): SessionState => ({
      seed: 's',
      ruleset: {
        id: 'v1', decks: 6, penetration_percent: 75, dealer_soft_17: 'hit', blackjack_payout: 1.5,
        max_split_hands: 4, double_after_split: true, resplit_aces: false,
        split_aces_receive_one_card: true, insurance_auto_decline: true,
      },
      shoe: { seed: 's', shoe_number: 1, cards: [], cursor: 0, discard: [], penetration_index: 234 },
      bankroll: 102000, default_bet: 2000, round, logs,
    });
    const resolvedRound: SessionState['round'] = {
      status: 'resolved', bet: 2000, active_hand_index: 0, dealer: { cards: [] },
      hands: [], dealt_cards: [], actions: [], bankroll_before: 100000,
    };
    const ok = (data: SessionState) => JSON.stringify({ status: 'ok', response: { type: 'session', data } });
    const fake: CoreTransport = {
      call(json: string): string {
        const cmd = JSON.parse(json);
        if (cmd.command === 'start_session') return ok(base(null));
        if (cmd.command === 'start_round') return ok(base(resolvedRound, [{
          seed: 's',
          ruleset: base(null).ruleset,
          shoe_number: 1,
          dealt_cards: [],
          actions: [],
          outcomes: [{ hand_index: 0, result: 'win', wager: 2000, delta: 2000 }],
          bankroll_before: 100000,
          bankroll_after: 102000,
          bankroll_delta: 2000,
          penetration_reached: false,
        }]));
        return '{"status":"ok","response":{"type":"actions","data":[]}}';
      },
    };
    const c = new GameController(fake, new MemorySink(), { now: () => 't' }, { next: () => 'sid' });

    await c.startSession('s', 100000, 2000);
    await c.startRound(2000);

    expect(c.getState().lastOutcomes).toEqual([{ hand_index: 0, result: 'win', wager: 2000, delta: 2000 }]);
  });

  it('sets a notice when insurance is auto-declined by the core', async () => {
    const ruleset = {
      id: 'v1', decks: 6, penetration_percent: 75, dealer_soft_17: 'hit' as const, blackjack_payout: 1.5,
      max_split_hands: 4, double_after_split: true, resplit_aces: false,
      split_aces_receive_one_card: true, insurance_auto_decline: true,
    };
    const round: SessionState['round'] = {
      status: 'player_turn',
      bet: 2000,
      active_hand_index: 0,
      dealer: { cards: [{ card_id: 'dealer-ace', deck_id: 'deck-1', rank: 'ace', suit: 'spades' }] },
      hands: [],
      dealt_cards: [],
      actions: [{ action: 'insurance_declined', hand_index: 0, card_id: null }],
      bankroll_before: 100000,
    };
    const session = (activeRound: SessionState['round']): SessionState => ({
      seed: 's',
      ruleset,
      shoe: { seed: 's', shoe_number: 1, cards: [], cursor: 0, discard: [], penetration_index: 234 },
      bankroll: 100000,
      default_bet: 2000,
      round: activeRound,
      logs: [],
    });
    const fake: CoreTransport = {
      call(json: string): string {
        const cmd = JSON.parse(json);
        const data = cmd.command === 'start_round' ? session(round) : session(null);
        return JSON.stringify({ status: 'ok', response: { type: 'session', data } });
      },
    };
    const c = new GameController(fake, new MemorySink(), { now: () => 't' }, { next: () => 'sid' });

    await c.startSession('s', 100000, 2000);
    await c.startRound(2000);

    expect(c.getState().notice).toBe('Insurance auto-declined');
  });

  it('auto-reshuffles at the shoe boundary, then deals with a notice', async () => {
    // Fake core: the first Deal reports the shoe must reshuffle; reshuffle + retry succeed.
    const data = (shoe_number: number, round: unknown) => ({
      seed: 's',
      ruleset: {
        id: 'v1', decks: 6, penetration_percent: 75, dealer_soft_17: 'hit', blackjack_payout: 1.5,
        max_split_hands: 4, double_after_split: true, resplit_aces: false,
        split_aces_receive_one_card: true, insurance_auto_decline: true,
      },
      shoe: { seed: 's', shoe_number, cards: [], cursor: 0, discard: [], penetration_index: 234 },
      bankroll: 100000, default_bet: 2000, round, logs: [],
    });
    const ok = (d: unknown) => JSON.stringify({ status: 'ok', response: { type: 'session', data: d } });
    const dealtRound = {
      status: 'player_turn', bet: 2000, active_hand_index: 0, dealer: { cards: [] },
      hands: [], dealt_cards: [], actions: [], bankroll_before: 100000,
    };
    let deals = 0;
    const fake: CoreTransport = {
      call(json: string): string {
        const cmd = JSON.parse(json);
        if (cmd.command === 'start_session') return ok(data(1, null));
        if (cmd.command === 'reshuffle') return ok(data(2, null));
        if (cmd.command === 'start_round') {
          deals++;
          return deals === 1
            ? JSON.stringify({ status: 'error', message: 'shoe must reshuffle' })
            : ok(data(2, dealtRound));
        }
        if (cmd.command === 'legal_actions') return '{"status":"ok","response":{"type":"actions","data":["hit","stand"]}}';
        return ok(data(2, null));
      },
    };
    const c = new GameController(fake, new MemorySink(), { now: () => 't' }, { next: () => 'sid' });
    await c.startSession('s', 100000, 2000);
    await c.startRound(2000);
    expect(c.getState().session!.shoe.shoe_number).toBe(2);          // reshuffled to a new shoe
    expect(c.getState().notice).toMatch(/reshuffled/i);
    expect(c.getState().lastError).toBeNull();
    expect(c.getState().session!.round!.status).toBe('player_turn'); // dealt on the new shoe
  });

  it('enters fatal state when the transport returns garbage', async () => {
    const bad: CoreTransport = { call: () => 'not json at all' };
    const c = new GameController(bad, new MemorySink(), { now: () => 't' }, { next: () => 'sid' });
    await c.startSession('seed-a', 100000, 2000);
    expect(c.getState().phase).toBe('fatal');
    expect(c.getState().fatalMessage).toBeTruthy();
  });
});
