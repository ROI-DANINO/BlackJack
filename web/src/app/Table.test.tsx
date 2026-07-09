// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Table } from './Table';
import { GameController } from '../bridge/game';
import { MemorySink } from '../bridge/log/memory-sink';
import type { CoreTransport } from '../bridge/transport';

// Fake transport: replays a golden session shape, then trivial responses.
const SESSION = JSON.stringify({
  status: 'ok',
  response: {
    type: 'session',
    data: {
      seed: 'free-play',
      ruleset: { id: 'v1-modern-classic-h17-6d', decks: 6, penetration_percent: 75, dealer_soft_17: 'hit', blackjack_payout: 1.5, max_split_hands: 4, double_after_split: true, resplit_aces: false, split_aces_receive_one_card: true, insurance_auto_decline: true },
      shoe: { seed: 'free-play', shoe_number: 1, cards: [], cursor: 0, discard: [], penetration_index: 234 },
      bankroll: 100000,
      default_bet: 2000,
      round: null,
      logs: [],
    },
  },
});

class FakeTransport implements CoreTransport {
  call(json: string): string {
    const cmd = JSON.parse(json);
    if (cmd.command === 'start_session') return SESSION;
    if (cmd.command === 'legal_actions') return '{"status":"ok","response":{"type":"actions","data":["hit","stand"]}}';
    return SESSION; // start_round/apply_action echo a session (no round) for this smoke test
  }
}

describe('Table', () => {
  it('renders bankroll and a deal control after session start', async () => {
    const c = new GameController(new FakeTransport(), new MemorySink(), { now: () => 't' }, { next: () => 'sid' });
    render(<Table controller={c} />);
    await fireEvent.click(screen.getByRole('button', { name: /start session/i }));
    expect(await screen.findByText(/bankroll/i)).toBeTruthy();
    expect(screen.getByText(/1000\.00|100000/)).toBeTruthy();
  });

  it('shows a fatal banner when the core is poisoned', async () => {
    const bad: CoreTransport = { call: () => 'garbage' };
    const c = new GameController(bad, new MemorySink(), { now: () => 't' }, { next: () => 'sid' });
    render(<Table controller={c} />);
    await fireEvent.click(screen.getByRole('button', { name: /start session/i }));
    expect(await screen.findByText(/reload/i)).toBeTruthy();
  });
});
