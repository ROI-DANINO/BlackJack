import { beforeAll, describe, expect, it } from 'vitest';
import { initCoreForTest } from '../bridge/test-init';
import { WasmTransport } from '../bridge/core-client';
import type { CoreTransport } from '../bridge/transport';
import { UNITS } from './units';
import { DrillController } from './controller';
import type { Action } from '../bridge/types';

beforeAll(async () => { await initCoreForTest(); });
let n = 0;
const make = (unitIndex = 2) => new DrillController(new WasmTransport(), UNITS[unitIndex]!, () => `d-${(n += 1)}`, () => 0);

/** Stand (legal_actions always offers it) until the round resolves. Guards against infinite loops. */
function playOut(c: DrillController): void {
  let guard = 0;
  while (c.getState().session?.round?.status === 'player_turn' && guard++ < 20) {
    c.choose('stand');
  }
}

/** Walk every situation in the unit (applying its hint, or standing if none) until live_intro. */
function walkToLiveIntro(c: DrillController): void {
  let guard = 0;
  while (c.getState().phase === 'situation' && guard++ < 10) {
    const { hint, session } = c.getState();
    if (session!.round!.status === 'player_turn') c.choose((hint as Action) ?? 'stand');
    playOut(c);
    c.next();
  }
}

describe('DrillController', () => {
  it('sets up the first situation with arranged provenance and a hint', () => {
    const c = make(2); // double-split unit, first situation = double (hint: 'double')
    c.begin();
    const s = c.getState();
    expect(s.phase).toBe('situation');
    expect(s.situationIndex).toBe(0);
    expect(s.session!.round!.hands[0]!.cards[0]!.deck_id).toBe('arranged');
    expect(s.session!.round!.dealer.cards[0]!.deck_id).toBe('arranged');
    expect(s.legalActions).toContain('double');
    expect(s.hint).toBe('double');
    expect(s.prompt).toBe(UNITS[2]!.situations[0]!.intro);
    expect(s.fatal).toBeNull();
    expect(s.error).toBeNull();
  });

  it('resolves a no-decision natural blackjack straight to awaitingContinue with feedback + teach', () => {
    const c = make(0); // reading-the-table: situations[1] = natural-blackjack (no hint, no decision)
    c.begin();
    // situation 0 (read-total) has no hint — stand to resolve it.
    expect(c.getState().hint).toBeNull();
    playOut(c);
    expect(c.getState().awaitingContinue).toBe(true);
    expect(c.getState().records).toHaveLength(1);

    c.next(); // -> situation 1 (natural-blackjack)
    const s = c.getState();
    expect(s.phase).toBe('situation');
    expect(s.situationIndex).toBe(1);
    // Natural blackjack settles at deal time — zero player actions, straight to resolved.
    expect(s.session!.round!.status).toBe('resolved');
    expect(s.awaitingContinue).toBe(true);
    expect(s.legalActions).toEqual([]);
    expect(s.hint).toBeNull();
    expect(s.feedback.some((l) => l.toLowerCase().includes('blackjack'))).toBe(true);
    expect(s.feedback.at(-1)).toBe(UNITS[0]!.situations[1]!.teach);
    expect(s.records).toHaveLength(2);
    expect(s.records[1]!.situationId).toBe('natural-blackjack');
    expect(s.records[1]!.actionsTaken).toEqual([]); // no decision was made
  });

  it('ignores a second choose() once the hand is settled — no corruption, no duplicate record', () => {
    const c = make(2); // double-split unit, situation 0 = double
    c.begin();
    c.choose('double');
    const afterFirst = c.getState();
    expect(afterFirst.awaitingContinue).toBe(true);
    expect(afterFirst.records).toHaveLength(1);
    expect(afterFirst.fatal).toBeNull();

    c.choose('double'); // round already resolved -> must be a no-op, not re-applied
    const afterSecond = c.getState();
    expect(afterSecond.fatal).toBeNull();
    expect(afterSecond.records).toHaveLength(1);
    expect(afterSecond.awaitingContinue).toBe(true);
    expect(afterSecond.feedback).toEqual(afterFirst.feedback);
    expect(afterSecond.session).toBe(afterFirst.session); // state object untouched by the no-op
  });

  it('reaches a fresh live shoe after the situations, plays a live hand, and can finish anytime', () => {
    const unit = UNITS[0]!; // reading-the-table
    const c = make(0);
    c.begin();
    walkToLiveIntro(c);
    expect(c.getState().phase).toBe('live_intro');
    expect(c.getState().prompt).toBe(unit.live.intro);

    c.beginLive();
    const s = c.getState();
    expect(s.phase).toBe('live');
    expect(s.session!.shoe.cards[0]!.deck_id).toMatch(/^deck-/);
    expect(s.session!.round!.dealer.cards[0]!.deck_id).toMatch(/^deck-/);
    expect(s.hint).toBeNull();
    expect(s.liveHandsPlayed).toBe(0);
    expect(s.fatal).toBeNull();

    const recordsBefore = s.records.length;
    playOut(c); // resolve the first live hand (stand is always legal)
    const afterFirstHand = c.getState();
    expect(afterFirstHand.phase).toBe('live');
    expect(afterFirstHand.liveHandsPlayed).toBe(1);
    expect(afterFirstHand.feedback.length).toBeGreaterThan(0);
    expect(afterFirstHand.awaitingContinue).toBe(true);
    expect(afterFirstHand.records).toHaveLength(recordsBefore + 1);
    expect(afterFirstHand.records.at(-1)!.phase).toBe('live');
    expect(afterFirstHand.records.at(-1)!.situationId).toBeNull();
    expect(afterFirstHand.records.at(-1)!.topic).toBe('Live practice');

    c.next(); // deal again
    expect(c.getState().phase).toBe('live');
    expect(c.getState().awaitingContinue).toBe(false);
    expect(c.getState().liveHandsPlayed).toBe(1);

    c.finish(); // finish anytime, mid-shoe -> recap
    expect(c.getState().phase).toBe('recap');
  });

  it('lands on recap once maxHands live hands have been played', () => {
    const unit = UNITS[0]!;
    const c = make(0);
    c.begin();
    walkToLiveIntro(c);
    c.beginLive();

    let guard = 0;
    while (c.getState().liveHandsPlayed < unit.live.maxHands && guard++ < unit.live.maxHands * 2 + 5) {
      playOut(c);
      c.next();
    }
    expect(c.getState().liveHandsPlayed).toBe(unit.live.maxHands);
    c.next(); // maxHands reached -> next() lands on recap rather than dealing another hand
    expect(c.getState().phase).toBe('recap');
  });

  it('appends exactly one DrillDecisionRecord per resolved context across a whole unit', () => {
    const unit = UNITS[2]!; // double-split: 2 situations
    const c = make(2);
    c.begin();
    walkToLiveIntro(c);
    expect(c.getState().records).toHaveLength(unit.situations.length);
    const ids = c.getState().records.map((r) => r.situationId);
    expect(ids).toEqual(unit.situations.map((s) => s.id));

    c.beginLive();
    playOut(c);
    expect(c.getState().records).toHaveLength(unit.situations.length + 1);
    // A no-op choose() after resolution must never append another record.
    c.choose('stand');
    expect(c.getState().records).toHaveLength(unit.situations.length + 1);
  });

  it('surfaces a fatal error on a malformed core reply and a recoverable error on a rejected action, with retry() re-setting up the situation', () => {
    // These two edge cases (transport-level corruption; an engine-level rule rejection) cannot be
    // provoked through the public API against the real engine — the controller's own guards only
    // ever send actions it already knows are legal. Mirroring the precedent in bridge/game.test.ts,
    // a small scripted transport stands in for the real one for this one test only, delegating to
    // the real engine except for the two calls being scripted to fail.
    let sessionCalls = 0;
    let roundCalls = 0;
    const flaky: CoreTransport = {
      call(json: string): string {
        const cmd = JSON.parse(json) as { command: string };
        if (cmd.command === 'start_session_with_prefix') {
          sessionCalls += 1;
          if (sessionCalls === 1) return 'not json'; // 1st call ever: malformed -> fatal
          return new WasmTransport().call(json);
        }
        if (cmd.command === 'start_round') {
          roundCalls += 1;
          if (roundCalls === 1) return '{"status":"error","message":"no active round"}'; // 1st deal: rejected
          return new WasmTransport().call(json);
        }
        return new WasmTransport().call(json);
      },
    };
    const c = new DrillController(flaky, UNITS[2]!, () => 'd-flaky', () => 0);
    c.begin(); // 1st start_session_with_prefix call -> malformed reply
    expect(c.getState().fatal).toBe('core returned non-JSON: not json');

    // A fresh controller for the recoverable-error half, since a fatal instance may be poisoned.
    const c2 = new DrillController(flaky, UNITS[2]!, () => 'd-flaky-2', () => 0);
    c2.begin(); // 2nd start_session_with_prefix call succeeds (delegated); 1st start_round call is rejected
    expect(c2.getState().fatal).toBeNull();
    expect(c2.getState().error).toBe('Could not deal “Double.” Try again.');

    c2.retry(); // re-sets up the same situation from scratch, this time all the way through
    const s = c2.getState();
    expect(s.error).toBeNull();
    expect(s.phase).toBe('situation');
    expect(s.situationIndex).toBe(0);
    expect(s.session!.round!.hands[0]!.cards[0]!.deck_id).toBe('arranged');
  });
});
