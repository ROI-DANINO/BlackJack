import { beforeAll, describe, expect, it } from 'vitest';
import { initCoreForTest } from '../bridge/test-init';
import { WasmTransport } from '../bridge/core-client';
import type { CoreTransport } from '../bridge/transport';
import type { Action } from '../bridge/types';
import type { Subject, Unit } from './types';
import { LearnEngine } from './engine';
import { LessonController } from './controller';
import { OPENINGS } from './situations';

beforeAll(async () => { await initCoreForTest(); });

class FakeTransport implements CoreTransport {
  constructor(private readonly reply: string) {}
  call(): string { return this.reply; }
}

// The brief's illustrative unit uses `capabilities: ['Answered']`, a string array. The
// committed RecapStep contract (web/src/learn/types.ts) requires
// `capabilities: Array<{ outcomeId, text }>` — that committed type governs here.
function buildUnit(): Unit {
  return {
    id: 'test', title: 'Test', goal: 'Answer once', prerequisites: [], outcomes: ['test-skill'],
    requiredChecks: ['check'],
    steps: [
      { id: 'intro', type: 'explain', title: 'Intro', body: 'Choose the answer.' },
      {
        id: 'check', type: 'question', outcomeId: 'test-skill', prompt: 'Pick right.',
        choices: [{ value: 'wrong', label: 'Wrong' }, { value: 'right', label: 'Right' }],
        answer: { kind: 'literal', value: 'right' }, correct: 'Yes.', incorrect: 'Try again.',
      },
      { id: 'recap', type: 'recap', title: 'Done', capabilities: [{ outcomeId: 'test-skill', text: 'Answered' }] },
    ],
  };
}

function buildSubject(unit: Unit): Subject {
  return { id: 'test', title: 'Test', skills: [{ id: 'test-skill', title: 'Test' }], units: [unit] };
}

function newController(unit: Unit, transport: CoreTransport = new WasmTransport()): LessonController {
  return new LessonController(new LearnEngine(transport), buildSubject(unit), unit, {
    seq: () => 0, freshSeed: () => 'test-seed',
  });
}

/** A single-step unit whose only check is an arranged hand asking for `requestedAction`. */
function doubleHandUnit(requestedAction: Action = 'double'): Unit {
  return {
    id: 'double-unit', title: 'Double', goal: 'Double the eleven', prerequisites: [], outcomes: ['test-skill'],
    requiredChecks: ['double-hand'],
    steps: [
      {
        id: 'double-hand', type: 'hand', outcomeId: 'test-skill', title: 'Double on 11',
        intro: 'You have eleven. Double down.',
        setup: { kind: 'arranged', openings: OPENINGS.elevens }, requestedAction,
        teach: 'Eleven is the strongest doubling total — one card, twice the bet.',
      },
    ],
  };
}

/** A single-step unit whose only step is an ungraded live hand (no requestedAction). */
function liveHandUnit(): Unit {
  return {
    id: 'live-unit', title: 'Live', goal: 'Play a live hand', prerequisites: [], outcomes: ['test-skill'],
    requiredChecks: [],
    steps: [
      {
        id: 'live-hand', type: 'hand', outcomeId: 'test-skill', title: 'Live hand',
        intro: 'Play it out.', setup: { kind: 'live' },
        teach: 'A live hand is real play, not a graded drill.',
      },
    ],
  };
}

describe('LessonController — engine-backed hand steps', () => {
  it('runs an arranged requested-action hand and records instruction evidence separate from the outcome', () => {
    const unit = doubleHandUnit('double');
    const c = newController(unit);
    c.begin(); // arranges the eleven on a real shoe and deals the round
    const setup = c.getState();
    expect(setup.step?.id).toBe('double-hand');
    // Arranged provenance — the opening sits on a real, ordered shoe.
    expect(setup.session!.round!.hands[0]!.cards[0]!.deck_id).toBe('arranged');
    expect(setup.legalActions).toContain('double');

    c.choose('double');
    const s = c.getState();
    // Exactly one attempt: the graded decision.
    expect(s.attempts).toHaveLength(1);
    const attempt = s.attempts[0]!;
    expect(attempt).toMatchObject({
      interaction: 'hand', response: 'double', correct: true, assistance: 'instruction',
    });
    // The engine session (cards, wager, resolved outcome) is attached and separate from correctness.
    expect(attempt.engine).not.toBeNull();
    expect(attempt.engine!.wager).toBeGreaterThan(0);
    expect(attempt.engine!.outcomes.length).toBeGreaterThan(0);
    // Learning correctness (did they double?) and hand outcome (win/loss) are separate facts.
    expect(attempt.correct).toBe(true);
    // The requested check completes on the correct action, regardless of whether the hand won.
    expect(s.completed).toBe(true);
    expect(s.awaitingContinue).toBe(true);
    expect(s.feedback).not.toBeNull();
  });

  it('lets the learner choose a different legal action without falsely recording the requested one', () => {
    const unit = doubleHandUnit('double');
    const c = newController(unit);
    c.begin();
    expect(c.getState().legalActions).toContain('hit');

    c.choose('hit'); // valid play, but not the requested Double
    const s = c.getState();
    expect(s.attempts).toHaveLength(1);
    const attempt = s.attempts[0]!;
    expect(attempt.response).toBe('hit');
    expect(attempt.response).not.toBe('double');
    expect(attempt.correct).toBe(false); // Double was NOT practiced
    expect(s.completed).toBe(false); // the required check is not satisfied by a different action
  });

  it('plays an ungraded live hand with shuffled (not arranged) provenance', () => {
    const unit = liveHandUnit();
    const c = newController(unit);
    c.begin();
    const setup = c.getState();
    expect(setup.step?.id).toBe('live-hand');
    // Shuffled provenance — a normal shoe, not an arranged opening.
    expect(setup.session!.shoe.cards).toHaveLength(312);
    expect(setup.session!.shoe.cards[0]!.deck_id).not.toBe('arranged');

    // Stand out (if a decision is offered) until the hand resolves.
    let guard = 0;
    while (c.getState().session?.round?.status === 'player_turn' && guard++ < 20) c.choose('stand');

    const s = c.getState();
    expect(s.attempts).toHaveLength(1);
    expect(s.attempts[0]!.interaction).toBe('hand');
    expect(s.attempts[0]!.correct).toBeNull(); // live play is not graded
  });

  it('resolves a following last_outcome question from the stored hand-step engine log', () => {
    const unit: Unit = {
      id: 'outcome-unit', title: 'Outcome', goal: 'Read the result', prerequisites: [], outcomes: ['test-skill'],
      requiredChecks: ['outcome-q'],
      steps: [
        {
          id: 'nat', type: 'hand', outcomeId: 'test-skill', title: 'Natural', intro: 'Watch the deal.',
          setup: { kind: 'arranged', openings: OPENINGS.naturals }, teach: 'A natural pays 3:2.',
        },
        {
          id: 'outcome-q', type: 'question', outcomeId: 'test-skill', prompt: 'What was the result?',
          choices: [{ value: 'blackjack', label: 'Blackjack' }, { value: 'win', label: 'Win' }],
          answer: { kind: 'last_outcome', handIndex: 0 }, correct: 'Yes — a natural.', incorrect: 'No.',
        },
        { id: 'recap', type: 'recap', title: 'Done', capabilities: [{ outcomeId: 'test-skill', text: 'Answered' }] },
      ],
    };
    const c = newController(unit);
    c.begin(); // the natural resolves on the deal
    expect(c.getState().awaitingContinue).toBe(true);
    c.continue(); // -> the last_outcome question, whose session/log survives from the hand step
    c.answer('blackjack');
    expect(c.getState().attempts.at(-1)).toMatchObject({ correct: true, feedback: 'Yes — a natural.' });
    expect(c.getState().completed).toBe(true);
  });
});

describe('LessonController — recoverable errors', () => {
  it('records a recoverable error (not a fatal) when the core rejects a command', () => {
    const unit: Unit = {
      id: 'reject-test', title: 'Reject', goal: 'g', prerequisites: [], outcomes: ['test-skill'],
      requiredChecks: ['q'],
      steps: [
        {
          id: 'q', type: 'question', outcomeId: 'test-skill', prompt: 'Total?',
          choices: [{ value: '17', label: '17' }],
          answer: { kind: 'hand_total', cards: [{ rank: 'ace', suit: 'spades' }, { rank: 'six', suit: 'hearts' }] },
          correct: 'Yes.', incorrect: 'No.',
        },
        { id: 'recap', type: 'recap', title: 'Done', capabilities: [{ outcomeId: 'test-skill', text: 'Answered' }] },
      ],
    };
    const c = newController(unit, new FakeTransport(JSON.stringify({ status: 'error', message: 'core said no' })));
    c.begin(); // lands on the question step (first step)
    c.answer('17');
    expect(c.getState().attempts).toHaveLength(0);
    expect(c.getState().error).toBe('core said no');
    expect(c.getState().fatal).toBeNull();
  });
});

describe('LessonController — explain/question/recap progression', () => {
  it('records an incorrect retry and completes a required check after a correct answer', () => {
    const unit = buildUnit();
    const c = newController(unit);
    c.begin();
    c.continue(); // explanation -> question
    c.answer('wrong');
    expect(c.getState().attempts.at(-1)).toMatchObject({ correct: false, assistance: 'none' });
    c.retry();
    c.answer('right');
    expect(c.getState().attempts.at(-1)).toMatchObject({ correct: true, assistance: 'retry' });
    expect(c.getState().awaitingContinue).toBe(true);
    expect(c.getState().completed).toBe(true);
  });

  it('records feedback text on the current state for wrong and right answers', () => {
    const unit = buildUnit();
    const c = newController(unit);
    c.begin();
    c.continue();
    c.answer('wrong');
    expect(c.getState().feedback).toBe('Try again.');
    c.retry();
    c.answer('right');
    expect(c.getState().feedback).toBe('Yes.');
  });

  it('blocks a second answer attempt until retry() is called', () => {
    const unit = buildUnit();
    const c = newController(unit);
    c.begin();
    c.continue();
    c.answer('wrong');
    c.answer('right'); // ignored: still locked, no retry() yet
    expect(c.getState().attempts).toHaveLength(1);
    expect(c.getState().attempts.at(-1)).toMatchObject({ correct: false });
  });

  it('ignores a duplicate answer once the step is already correctly resolved', () => {
    const unit = buildUnit();
    const c = newController(unit);
    c.begin();
    c.continue();
    c.answer('right');
    expect(c.getState().attempts).toHaveLength(1);
    c.answer('wrong'); // must not record another attempt or flip the outcome
    expect(c.getState().attempts).toHaveLength(1);
    expect(c.getState().awaitingContinue).toBe(true);
  });

  it('choose() validates the response against the step choices before recording an attempt', () => {
    const unit = buildUnit();
    const c = newController(unit);
    c.begin();
    c.continue();
    c.choose('not-a-choice');
    expect(c.getState().attempts).toHaveLength(0);
    expect(c.getState().error).toMatch(/not a valid choice/);
    c.choose('right');
    expect(c.getState().attempts.at(-1)).toMatchObject({ correct: true, response: 'right' });
  });

  it('notifies subscribers on state changes and stops after unsubscribe', () => {
    const unit = buildUnit();
    const c = newController(unit);
    let calls = 0;
    const unsubscribe = c.subscribe(() => { calls += 1; });
    c.begin();
    expect(calls).toBe(1);
    c.continue();
    expect(calls).toBe(2);
    unsubscribe();
    c.answer('right');
    expect(calls).toBe(2); // no further notification after unsubscribe
  });

  it('resolves hand_total, hand_softness, and hand_bust answers through the real engine', () => {
    const unit: Unit = {
      id: 'engine-answers', title: 'Engine Answers', goal: 'g', prerequisites: [], outcomes: ['test-skill'],
      requiredChecks: ['total-q', 'soft-q', 'bust-q'],
      steps: [
        { id: 'intro', type: 'explain', title: 'Intro', body: 'Read the hand.' },
        {
          id: 'total-q', type: 'question', outcomeId: 'test-skill', prompt: 'Total?',
          choices: [{ value: '17', label: '17' }, { value: '7', label: '7' }],
          answer: { kind: 'hand_total', cards: [{ rank: 'ace', suit: 'spades' }, { rank: 'six', suit: 'hearts' }] },
          correct: 'Yes, 17.', incorrect: 'Count the Ace as 11.',
        },
        {
          id: 'soft-q', type: 'question', outcomeId: 'test-skill', prompt: 'Soft or hard?',
          choices: [{ value: 'soft', label: 'Soft' }, { value: 'hard', label: 'Hard' }],
          answer: { kind: 'hand_softness', cards: [{ rank: 'ace', suit: 'spades' }, { rank: 'six', suit: 'hearts' }] },
          correct: 'Yes, soft.', incorrect: 'The Ace can count as 11.',
        },
        {
          id: 'bust-q', type: 'question', outcomeId: 'test-skill', prompt: 'Bust?',
          choices: [{ value: 'bust', label: 'Bust' }, { value: 'not_bust', label: 'Not bust' }],
          answer: {
            kind: 'hand_bust',
            cards: [{ rank: 'ten', suit: 'clubs' }, { rank: 'eight', suit: 'diamonds' }, { rank: 'five', suit: 'hearts' }],
          },
          correct: 'Yes, that busts.', incorrect: 'Add it up again.',
        },
        { id: 'recap', type: 'recap', title: 'Done', capabilities: [{ outcomeId: 'test-skill', text: 'Answered' }] },
      ],
    };
    const c = newController(unit);
    c.begin();
    c.continue(); // explain -> total-q
    c.answer('17');
    expect(c.getState().attempts.at(-1)).toMatchObject({ correct: true, feedback: 'Yes, 17.' });
    c.continue(); // total-q -> soft-q
    c.answer('soft');
    expect(c.getState().attempts.at(-1)).toMatchObject({ correct: true, feedback: 'Yes, soft.' });
    c.continue(); // soft-q -> bust-q
    c.answer('bust');
    expect(c.getState().attempts.at(-1)).toMatchObject({ correct: true, feedback: 'Yes, that busts.' });
    expect(c.getState().completed).toBe(true);
    c.continue(); // bust-q -> recap
    expect(c.getState().step?.id).toBe('recap');
  });

  it('sets a fatal error and records no attempt when the transport returns a malformed reply', () => {
    const unit: Unit = {
      id: 'fatal-test', title: 'Fatal', goal: 'g', prerequisites: [], outcomes: ['test-skill'],
      requiredChecks: ['q'],
      steps: [
        {
          id: 'q', type: 'question', outcomeId: 'test-skill', prompt: 'Total?',
          choices: [{ value: '17', label: '17' }],
          answer: { kind: 'hand_total', cards: [{ rank: 'ace', suit: 'spades' }, { rank: 'six', suit: 'hearts' }] },
          correct: 'Yes.', incorrect: 'No.',
        },
        { id: 'recap', type: 'recap', title: 'Done', capabilities: [{ outcomeId: 'test-skill', text: 'Answered' }] },
      ],
    };
    const c = newController(unit, new FakeTransport('not json'));
    c.begin(); // lands directly on the question step (first step)
    c.answer('17');
    expect(c.getState().attempts).toHaveLength(0);
    expect(c.getState().fatal).toMatch(/non-JSON/);
  });
});
