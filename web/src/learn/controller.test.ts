import { beforeAll, describe, expect, it } from 'vitest';
import { initCoreForTest } from '../bridge/test-init';
import { WasmTransport } from '../bridge/core-client';
import type { CoreTransport } from '../bridge/transport';
import type { Subject, Unit } from './types';
import { LearnEngine } from './engine';
import { LessonController } from './controller';

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
