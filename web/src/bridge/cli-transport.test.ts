import { describe, it, expect, beforeAll } from 'vitest';
import { execSync } from 'node:child_process';
import { CliTransport } from './cli-transport';
import { parseCliOutput } from './validate';

const BIN = new URL('../../../target/debug/blackjack-core', import.meta.url).pathname;
// Vitest runs test files in isolated workers, so build the binary this file needs here.
beforeAll(() => execSync('cargo build -p blackjack-core', { cwd: new URL('../../../', import.meta.url).pathname }));

describe('CliTransport (deterministic bridge QA transport)', () => {
  it('runs start_session against the real core binary', () => {
    const t = new CliTransport(BIN);
    const raw = t.call(JSON.stringify({
      command: 'start_session', seed: 'bridge-seed', bankroll: 100000, default_bet: 2000, ruleset: null,
    }));
    const out = parseCliOutput(raw);
    if (out.status !== 'ok' || out.response.type !== 'session') throw new Error('shape');
    expect(out.response.data.shoe.seed).toBe('bridge-seed');
  });

  it('is deterministic: same seed -> identical shoe order', () => {
    const t = new CliTransport(BIN);
    const cmd = JSON.stringify({
      command: 'start_session', seed: 'same', bankroll: 100000, default_bet: 2000, ruleset: null,
    });
    expect(t.call(cmd)).toEqual(t.call(cmd));
  });
});
