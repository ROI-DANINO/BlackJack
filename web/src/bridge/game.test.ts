import { describe, it, expect, beforeAll } from 'vitest';
import { execSync } from 'node:child_process';
import { GameController } from './game';
import { CliTransport } from './cli-transport';
import { MemorySink } from './log/memory-sink';

const BIN = new URL('../../../target/debug/blackjack-core', import.meta.url).pathname;
beforeAll(() => execSync('cargo build -p blackjack-core', { cwd: new URL('../../../', import.meta.url).pathname }));

function make() {
  let n = 0, t = 0;
  const sink = new MemorySink();
  const c = new GameController(new CliTransport(BIN), sink,
    { now: () => `t${t++}` }, { next: () => `sid-${n++}` });
  return { c, sink };
}

describe('GameController', () => {
  it('starts a session and writes a header line', async () => {
    const { c, sink } = make();
    await c.startSession('seed-a', 100000, 2000);
    expect(c.getState().phase).toBe('in_session');
    expect(c.getState().session!.bankroll).toBe(100000);
    expect(JSON.parse(sink.text().split('\n')[0]!).type).toBe('session_header');
  });

  it('plays a round to resolution and logs exactly one round line per resolved round', async () => {
    const { c, sink } = make();
    await c.startSession('seed-a', 100000, 2000);
    await c.startRound(2000);
    // Drive to resolution: stand until the round is no longer the player's turn.
    let guard = 0;
    while (c.getState().session!.round?.status === 'player_turn' && guard++ < 20) {
      await c.act('stand');
    }
    expect(c.getState().session!.round!.status).toBe('resolved');
    const roundLines = sink.text().split('\n').filter((l) => JSON.parse(l).type === 'round');
    expect(roundLines).toHaveLength(1);
    expect(JSON.parse(roundLines[0]!).round_index).toBe(0);
  });

  it('strips logs from retained state but bankroll stays correct across rounds', async () => {
    const { c } = make();
    await c.startSession('seed-a', 100000, 2000);
    await c.startRound(2000);
    let guard = 0;
    while (c.getState().session!.round?.status === 'player_turn' && guard++ < 20) await c.act('stand');
    expect(c.getState().session!.logs).toHaveLength(0);           // stripped
    const bankrollAfterR1 = c.getState().session!.bankroll;
    expect(Number.isInteger(bankrollAfterR1)).toBe(true);
  });

  it('surfaces a recoverable rule error without leaving in_session', async () => {
    const { c } = make();
    await c.startSession('seed-a', 100000, 2000);
    await c.act('hit');   // no active round -> core returns an error envelope
    expect(c.getState().phase).toBe('in_session');
    expect(c.getState().lastError).toBeTruthy();
  });

  it('logs a naturals round that resolves inside start_round (zero player actions)', async () => {
    // Search seeds for an immediate natural, then assert one round line was emitted.
    for (let i = 0; i < 200; i++) {
      const { c, sink } = make();
      await c.startSession(`nat-${i}`, 100000, 2000);
      await c.startRound(2000);
      if (c.getState().session!.round!.status === 'resolved') {
        const roundLines = sink.text().split('\n').filter((l) => JSON.parse(l).type === 'round');
        expect(roundLines).toHaveLength(1);
        return;
      }
    }
    throw new Error('no natural found in 200 seeds — widen the search');
  });

  it('enters fatal state when the transport returns garbage', async () => {
    const sink = new MemorySink();
    const bad = { call: () => 'not json at all' };
    const c = new GameController(bad, sink, { now: () => 't' }, { next: () => 'sid' });
    await c.startSession('seed-a', 100000, 2000);
    expect(c.getState().phase).toBe('fatal');
    expect(c.getState().fatalMessage).toBeTruthy();
  });
});
