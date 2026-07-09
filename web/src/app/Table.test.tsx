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

class ResolvedTransport implements CoreTransport {
  call(json: string): string {
    const cmd = JSON.parse(json);
    const ruleset = { id: 'v1-modern-classic-h17-6d', decks: 6, penetration_percent: 75, dealer_soft_17: 'hit', blackjack_payout: 1.5, max_split_hands: 4, double_after_split: true, resplit_aces: false, split_aces_receive_one_card: true, insurance_auto_decline: true };
    const round = {
      status: 'resolved',
      bet: 2000,
      active_hand_index: 0,
      dealer: { cards: [{ card_id: 'd1', deck_id: 'deck-1', rank: 'nine', suit: 'clubs' }] },
      hands: [{ cards: [{ card_id: 'p1', deck_id: 'deck-1', rank: 'ten', suit: 'clubs' }, { card_id: 'p2', deck_id: 'deck-1', rank: 'queen', suit: 'clubs' }], wager: 2000, is_complete: true, is_doubled: false, source: 'initial' }],
      dealt_cards: [],
      actions: [],
      bankroll_before: 100000,
    };
    const session = {
      seed: 'free-play',
      ruleset,
      shoe: { seed: 'free-play', shoe_number: 1, cards: [], cursor: 0, discard: [], penetration_index: 234 },
      bankroll: 102000,
      default_bet: 2000,
      round: cmd.command === 'start_session' ? null : round,
      logs: cmd.command === 'start_round' ? [{
        seed: 'free-play',
        ruleset,
        shoe_number: 1,
        dealt_cards: [],
        actions: [],
        outcomes: [{ hand_index: 0, result: 'win', wager: 2000, delta: 2000 }],
        bankroll_before: 100000,
        bankroll_after: 102000,
        bankroll_delta: 2000,
        penetration_reached: false,
      }] : [],
    };
    return JSON.stringify({ status: 'ok', response: { type: 'session', data: session } });
  }
}

class InsuranceDeclinedTransport implements CoreTransport {
  call(json: string): string {
    const cmd = JSON.parse(json);
    const ruleset = { id: 'v1-modern-classic-h17-6d', decks: 6, penetration_percent: 75, dealer_soft_17: 'hit', blackjack_payout: 1.5, max_split_hands: 4, double_after_split: true, resplit_aces: false, split_aces_receive_one_card: true, insurance_auto_decline: true };
    const round = {
      status: 'player_turn',
      bet: 2000,
      active_hand_index: 0,
      dealer: { cards: [{ card_id: 'dealer-ace', deck_id: 'deck-1', rank: 'ace', suit: 'spades' }] },
      hands: [],
      dealt_cards: [],
      actions: [{ action: 'insurance_declined', hand_index: 0, card_id: null }],
      bankroll_before: 100000,
    };
    const session = {
      seed: 'free-play',
      ruleset,
      shoe: { seed: 'free-play', shoe_number: 1, cards: [], cursor: 0, discard: [], penetration_index: 234 },
      bankroll: 100000,
      default_bet: 2000,
      round: cmd.command === 'start_round' ? round : null,
      logs: [],
    };
    return JSON.stringify({ status: 'ok', response: { type: 'session', data: session } });
  }
}

class PlayerTurnTransport implements CoreTransport {
  call(json: string): string {
    const cmd = JSON.parse(json);
    const ruleset = { id: 'v1-modern-classic-h17-6d', decks: 6, penetration_percent: 75, dealer_soft_17: 'hit', blackjack_payout: 1.5, max_split_hands: 4, double_after_split: true, resplit_aces: false, split_aces_receive_one_card: true, insurance_auto_decline: true };
    const round = {
      status: 'player_turn',
      bet: 2000,
      active_hand_index: 0,
      dealer: { cards: [{ card_id: 'd1', deck_id: 'deck-1', rank: 'nine', suit: 'clubs' }, { card_id: 'd2', deck_id: 'deck-1', rank: 'king', suit: 'hearts' }] },
      hands: [{ cards: [{ card_id: 'p1', deck_id: 'deck-1', rank: 'ten', suit: 'clubs' }, { card_id: 'p2', deck_id: 'deck-1', rank: 'seven', suit: 'hearts' }], wager: 2000, is_complete: false, is_doubled: false, source: 'initial' }],
      dealt_cards: [],
      actions: [],
      bankroll_before: 100000,
    };
    const session = {
      seed: 'free-play',
      ruleset,
      shoe: { seed: 'free-play', shoe_number: 1, cards: [], cursor: 0, discard: [], penetration_index: 234 },
      bankroll: 98000,
      default_bet: 2000,
      round: cmd.command === 'start_session' ? null : round,
      logs: [],
    };
    if (cmd.command === 'legal_actions') return '{"status":"ok","response":{"type":"actions","data":["hit","stand"]}}';
    return JSON.stringify({ status: 'ok', response: { type: 'session', data: session } });
  }
}

class SplitTurnTransport implements CoreTransport {
  call(json: string): string {
    const cmd = JSON.parse(json);
    const ruleset = { id: 'v1-modern-classic-h17-6d', decks: 6, penetration_percent: 75, dealer_soft_17: 'hit', blackjack_payout: 1.5, max_split_hands: 4, double_after_split: true, resplit_aces: false, split_aces_receive_one_card: true, insurance_auto_decline: true };
    const round = {
      status: 'player_turn',
      bet: 2000,
      active_hand_index: 1,   // hand 2 is being played
      dealer: { cards: [{ card_id: 'd1', deck_id: 'deck-1', rank: 'nine', suit: 'clubs' }, { card_id: 'd2', deck_id: 'deck-1', rank: 'king', suit: 'hearts' }] },
      hands: [
        { cards: [{ card_id: 'p1', deck_id: 'deck-1', rank: 'eight', suit: 'clubs' }, { card_id: 'p2', deck_id: 'deck-1', rank: 'three', suit: 'hearts' }], wager: 2000, is_complete: true, is_doubled: false, source: 'split' },
        { cards: [{ card_id: 'p3', deck_id: 'deck-1', rank: 'eight', suit: 'spades' }, { card_id: 'p4', deck_id: 'deck-1', rank: 'five', suit: 'diamonds' }], wager: 2000, is_complete: false, is_doubled: false, source: 'split' },
      ],
      dealt_cards: [],
      actions: [],
      bankroll_before: 100000,
    };
    const session = {
      seed: 'free-play',
      ruleset,
      shoe: { seed: 'free-play', shoe_number: 1, cards: [], cursor: 0, discard: [], penetration_index: 234 },
      bankroll: 96000,
      default_bet: 2000,
      round: cmd.command === 'start_session' ? null : round,
      logs: [],
    };
    if (cmd.command === 'legal_actions') return '{"status":"ok","response":{"type":"actions","data":["hit","stand"]}}';
    return JSON.stringify({ status: 'ok', response: { type: 'session', data: session } });
  }
}

class RecordingTransport implements CoreTransport {
  seeds: string[] = [];
  call(json: string): string {
    const cmd = JSON.parse(json);
    if (cmd.command === 'start_session') { this.seeds.push(cmd.seed); return SESSION; }
    if (cmd.command === 'legal_actions') return '{"status":"ok","response":{"type":"actions","data":[]}}';
    return SESSION;
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

  it('shows the resolved outcome beside the hand', async () => {
    const c = new GameController(new ResolvedTransport(), new MemorySink(), { now: () => 't' }, { next: () => 'sid' });
    render(<Table controller={c} />);
    await fireEvent.click(screen.getByRole('button', { name: /start session/i }));
    await fireEvent.click(await screen.findByRole('button', { name: /deal/i }));

    expect(await screen.findByText(/Win \(\+\$20\.00\)/)).toBeTruthy();
  });

  it('shows when insurance is auto-declined', async () => {
    const c = new GameController(new InsuranceDeclinedTransport(), new MemorySink(), { now: () => 't' }, { next: () => 'sid' });
    render(<Table controller={c} />);
    await fireEvent.click(screen.getByRole('button', { name: /start session/i }));
    await fireEvent.click(await screen.findByRole('button', { name: /deal/i }));

    expect(await screen.findByText(/insurance auto-declined/i)).toBeTruthy();
  });

  it('shows hand totals, hiding the dealer hole card from the total during the player turn', async () => {
    const c = new GameController(new PlayerTurnTransport(), new MemorySink(), { now: () => 't' }, { next: () => 'sid' });
    render(<Table controller={c} />);
    await fireEvent.click(screen.getByRole('button', { name: /start session/i }));
    await fireEvent.click(await screen.findByRole('button', { name: /deal/i }));

    expect(await screen.findByText(/Hand 1 \(17\)/)).toBeTruthy();
    expect(screen.getByText(/Dealer \(9 \+ \?\)/)).toBeTruthy();   // hole card hidden: 9 visible + ?
  });

  it('marks only the active hand during a split turn', async () => {
    const c = new GameController(new SplitTurnTransport(), new MemorySink(), { now: () => 't' }, { next: () => 'sid' });
    render(<Table controller={c} />);
    await fireEvent.click(screen.getByRole('button', { name: /start session/i }));
    await fireEvent.click(await screen.findByRole('button', { name: /deal/i }));

    expect(await screen.findAllByText(/playing/)).toHaveLength(1);
    expect(screen.getByText(/Hand 2/).parentElement!.textContent).toMatch(/playing/);
    expect(screen.getByText(/Hand 1/).parentElement!.textContent).not.toMatch(/playing/);
  });

  it('starts each session with a fresh random seed and displays it', async () => {
    const t = new RecordingTransport();
    const c = new GameController(t, new MemorySink(), { now: () => 't' }, { next: () => 'sid' });
    render(<Table controller={c} />);
    await fireEvent.click(screen.getByRole('button', { name: /start session/i }));

    expect(t.seeds).toHaveLength(1);
    expect(t.seeds[0]).toMatch(/^fp-[a-z0-9]{1,10}$/);
    expect(await screen.findByText(/session seed/i)).toBeTruthy();
  });

  it('offers a New session control that starts a fresh session with a fresh seed', async () => {
    const t = new RecordingTransport();
    const c = new GameController(t, new MemorySink(), { now: () => 't' }, { next: () => 'sid' });
    render(<Table controller={c} />);
    await fireEvent.click(screen.getByRole('button', { name: /start session/i }));
    await fireEvent.click(await screen.findByRole('button', { name: /new session/i }));

    expect(t.seeds).toHaveLength(2);
    expect(t.seeds[1]).toMatch(/^fp-[a-z0-9]{1,10}$/);
    expect(t.seeds[1]).not.toBe(t.seeds[0]);
  });
});
