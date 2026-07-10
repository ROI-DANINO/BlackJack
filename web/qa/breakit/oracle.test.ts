import { describe, it, expect } from 'vitest';
import {
  parseJsonl,
  checkHistory,
  checkSessionFlush,
  checkMoney,
  checkCards,
  checkSeedOnScreen,
  checkSeedsDistinct,
  checkDeterminism,
  checkConsole,
  evaluate,
} from './oracle';
import type { LogLine } from './types';

// --- fixture builders (mirror the real JSONL schema from src/bridge/log/sink.ts) ---

const RULESET = {
  id: 'v1', decks: 6, penetration_percent: 75, dealer_soft_17: 'hit' as const, blackjack_payout: 1.5,
  max_split_hands: 4, double_after_split: true, resplit_aces: false,
  split_aces_receive_one_card: true, insurance_auto_decline: true,
};

function header(session_id: string, seed: string, starting_bankroll = 100000): LogLine {
  return {
    type: 'session_header', schema_version: 1, session_id, seed, started_at: 't0',
    starting_bankroll, default_bet: 2000, ruleset: RULESET, harness_version: 'test',
  };
}

let cardCounter = 0;
function card(rank = 'seven', suit = 'clubs') {
  const id = `deck-1-${rank}-${suit}-${cardCounter++}`;
  return { card_id: id, deck_id: 'deck-1', rank, suit } as const;
}

function round(
  session_id: string,
  round_index: number,
  opts: { before: number; delta: number; shoe?: number; cards?: { card_id: string }[] } = { before: 100000, delta: -2000 },
): LogLine {
  const before = opts.before;
  const delta = opts.delta;
  const cards = opts.cards ?? [card(), card(), card('ten'), card('ace')];
  return {
    type: 'round', schema_version: 1, session_id, round_index, ts: `t${round_index}`, note: null,
    seed: 'seed-a', ruleset: RULESET, shoe_number: opts.shoe ?? 1,
    dealt_cards: cards as never, actions: [],
    outcomes: [{ hand_index: 0, result: delta >= 0 ? 'win' : 'loss', wager: 2000, delta }],
    bankroll_before: before, bankroll_after: before + delta, bankroll_delta: delta,
    penetration_reached: false,
  } as LogLine;
}

function toJsonl(lines: LogLine[]): string {
  return lines.map((l) => JSON.stringify(l)).join('\n') + '\n';
}

// A clean, self-consistent single-session history: header + 2 chained rounds.
function healthy(): LogLine[] {
  return [
    header('sid-0', 'seed-a', 100000),
    round('sid-0', 0, { before: 100000, delta: -2000 }),
    round('sid-0', 1, { before: 98000, delta: 3000 }),
  ];
}

describe('parseJsonl', () => {
  it('parses well-formed JSONL and reports no errors', () => {
    const { records, errors } = parseJsonl(toJsonl(healthy()));
    expect(errors).toEqual([]);
    expect(records).toHaveLength(3);
  });

  it('flags a line that is not valid JSON (note-injection / newline corruption)', () => {
    const good = toJsonl(healthy());
    // Simulate a control-char/newline note that split one record across two physical lines.
    const corrupted = good.replace('"note":null', '"note":"oops\ninjected"');
    // JSON.stringify would have escaped a real newline; here we inject a raw one to model the break.
    const { errors } = parseJsonl(corrupted);
    expect(errors.length).toBeGreaterThan(0);
  });
});

describe('checkHistory', () => {
  it('PASSES on a healthy history', () => {
    const inv = checkHistory(healthy());
    expect(inv.every((i) => i.passed)).toBe(true);
  });

  it('FAILS on a duplicate round_index (the QA-003 double-click dup bug)', () => {
    const lines = [
      header('sid-0', 'seed-a'),
      round('sid-0', 0, { before: 100000, delta: -2000 }),
      round('sid-0', 0, { before: 100000, delta: -2000 }), // dup!
    ];
    const inv = checkHistory(lines);
    const dup = inv.find((i) => i.name.includes('no duplicate round_index'))!;
    expect(dup.passed).toBe(false);
  });

  it('FAILS on two headers for the same session_id', () => {
    const lines = [header('sid-0', 'seed-a'), header('sid-0', 'seed-a'), round('sid-0', 0)];
    const inv = checkHistory(lines);
    expect(inv.find((i) => i.name.includes('one session_header'))!.passed).toBe(false);
  });

  it('FAILS on an orphan round with no header', () => {
    const inv = checkHistory([header('sid-0', 'seed-a'), round('sid-1', 0)]);
    expect(inv.find((i) => i.name.includes('matching session_header'))!.passed).toBe(false);
  });
});

describe('checkSessionFlush (QA-007)', () => {
  it('PASSES when a prior round is flushed before the new header', () => {
    const lines = [
      header('sid-0', 'seed-a'), round('sid-0', 0), round('sid-0', 1),
      header('sid-1', 'seed-b'), round('sid-1', 0),
    ];
    expect(checkSessionFlush(lines).passed).toBe(true);
  });

  it('FAILS when a round is written AFTER the next session header (flush-order break)', () => {
    const lines = [
      header('sid-0', 'seed-a'), round('sid-0', 0),
      header('sid-1', 'seed-b'),
      round('sid-0', 1), // old-session round leaked after new header
    ];
    expect(checkSessionFlush(lines).passed).toBe(false);
  });
});

describe('checkMoney', () => {
  it('PASSES on a chained, balanced history', () => {
    expect(checkMoney(healthy()).passed).toBe(true);
  });

  it('FAILS when bankroll_delta != Σ outcome deltas', () => {
    const bad = round('sid-0', 0, { before: 100000, delta: -2000 }) as Extract<LogLine, { type: 'round' }>;
    bad.bankroll_delta = -1000; // tamper: no longer equals the outcome delta or after-before
    bad.bankroll_after = 99000;
    expect(checkMoney([header('sid-0', 'seed-a'), bad]).passed).toBe(false);
  });

  it('FAILS when the bankroll chain is broken between rounds', () => {
    const lines = [
      header('sid-0', 'seed-a', 100000),
      round('sid-0', 0, { before: 100000, delta: -2000 }), // after = 98000
      round('sid-0', 1, { before: 99999, delta: 1000 }), // before should be 98000
    ];
    expect(checkMoney(lines).passed).toBe(false);
  });
});

describe('checkCards', () => {
  it('PASSES when every card in a shoe is unique', () => {
    expect(checkCards(healthy()).passed).toBe(true);
  });

  it('FAILS when a card_id is dealt twice within one shoe', () => {
    const dupCard = { card_id: 'deck-1-ace-spades', deck_id: 'deck-1', rank: 'ace', suit: 'spades' };
    const lines = [
      header('sid-0', 'seed-a'),
      round('sid-0', 0, { before: 100000, delta: -2000, shoe: 1, cards: [dupCard, card()] }),
      round('sid-0', 1, { before: 98000, delta: -2000, shoe: 1, cards: [dupCard, card()] }),
    ];
    expect(checkCards(lines).passed).toBe(false);
  });

  it('PASSES when the same card_id appears in different shoes (after reshuffle)', () => {
    const c = { card_id: 'deck-1-ace-spades', deck_id: 'deck-1', rank: 'ace', suit: 'spades' };
    const lines = [
      header('sid-0', 'seed-a'),
      round('sid-0', 0, { before: 100000, delta: -2000, shoe: 1, cards: [c] }),
      round('sid-0', 1, { before: 98000, delta: -2000, shoe: 2, cards: [c] }),
    ];
    expect(checkCards(lines).passed).toBe(true);
  });
});

describe('seed integrity', () => {
  it('PASSES when the on-screen seed matches the header seed', () => {
    expect(checkSeedOnScreen(healthy(), 'seed-a').passed).toBe(true);
  });

  it('FAILS on a seed mismatch between screen and header', () => {
    expect(checkSeedOnScreen(healthy(), 'fp-different').passed).toBe(false);
  });

  it('detects distinct vs repeated seeds across New session', () => {
    expect(checkSeedsDistinct(['fp-a', 'fp-b', 'fp-c']).passed).toBe(true);
    expect(checkSeedsDistinct(['fp-a', 'fp-a']).passed).toBe(false);
  });

  it('determinism PASSES for identical same-seed runs and FAILS on divergence', () => {
    const runA = toJsonl(healthy());
    expect(checkDeterminism(runA, runA).passed).toBe(true);

    const diverged = toJsonl([
      header('sid-1', 'seed-a'),
      round('sid-1', 0, { before: 100000, delta: -2000, cards: [card('king')] }),
    ]);
    expect(checkDeterminism(runA, diverged).passed).toBe(false);
  });
});

describe('checkConsole', () => {
  it('PASSES with no error/warning messages', () => {
    expect(checkConsole([{ type: 'log', text: 'hello' }]).passed).toBe(true);
  });

  it('FAILS on a console error', () => {
    expect(checkConsole([{ type: 'error', text: 'Uncaught TypeError: boom' }]).passed).toBe(false);
  });

  it('ignores benign favicon 404 noise', () => {
    expect(checkConsole([{ type: 'error', text: 'Failed to load resource: favicon.ico 404' }]).passed).toBe(true);
  });
});

describe('evaluate (composition)', () => {
  it('a healthy attack yields all-green invariants', () => {
    const inv = evaluate({
      attack: 'smoke', kind: 'realistic', jsonl: toJsonl(healthy()),
      console: [], onScreenSeed: 'seed-a', freshDealWorks: true,
    });
    expect(inv.every((i) => i.passed)).toBe(true);
  });

  it('a broken attack (dup + console error + stuck UI) yields failures', () => {
    const dupLines = [header('sid-0', 'seed-a'), round('sid-0', 0), round('sid-0', 0)];
    const inv = evaluate({
      attack: 'broken', kind: 'injected', jsonl: toJsonl(dupLines),
      console: [{ type: 'error', text: 'boom' }], freshDealWorks: false,
    });
    expect(inv.some((i) => !i.passed)).toBe(true);
  });

  it('surfaces an attack that threw', () => {
    const inv = evaluate({ attack: 'x', kind: 'injected', jsonl: '', console: [], error: 'exploded' });
    expect(inv.find((i) => i.name.includes('without throwing'))!.passed).toBe(false);
  });
});
