// @vitest-environment jsdom
import { beforeAll, describe, expect, it } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { initCoreForTest } from '../bridge/test-init';
import { WasmTransport } from '../bridge/core-client';
import type { CoreTransport } from '../bridge/transport';
import type { Subject, Unit } from '../learn/types';
import { LearnEngine } from '../learn/engine';
import { LessonController } from '../learn/controller';
import { OPENINGS } from '../learn/situations';
import { Lesson } from './Lesson';

beforeAll(async () => { await initCoreForTest(); });

// A small unit covering every LessonStep type through a REAL WasmTransport-backed engine,
// so grading (hand_total, and the eleven's legal actions) is proven against the actual core
// rather than a stub. Content mirrors the committed 'read-your-hand' / 'double' units
// (../learn/content/blackjack-basics.ts) but is kept local so this test does not churn when
// curriculum copy changes.
function buildUnit(): Unit {
  return {
    id: 'lesson-ui-test', title: 'Read Your Hand', goal: 'Read a total and try Double.',
    prerequisites: [], outcomes: ['test-skill'], requiredChecks: ['soft-total-check'],
    steps: [
      {
        id: 'intro', type: 'explain', title: 'Reading a hand total',
        body: 'An Ace can count as 1 or as 11, whichever keeps the hand from busting.',
      },
      {
        id: 'soft-total-check', type: 'question', outcomeId: 'test-skill',
        prompt: 'Ace + 6 — what is the best total?',
        choices: [{ value: '17', label: '17' }, { value: '7', label: '7' }],
        answer: { kind: 'hand_total', cards: [{ rank: 'ace', suit: 'clubs' }, { rank: 'six', suit: 'diamonds' }] },
        correct: 'Right — counting the Ace as 11 gives a total of 17.',
        incorrect: 'The Ace can count as 11 here, so the best total is 17.',
      },
      {
        id: 'double-hand', type: 'hand', outcomeId: 'test-skill', title: 'Double on eleven',
        intro: 'You have a two-card eleven. Choose Double.',
        setup: { kind: 'arranged', openings: OPENINGS.elevens }, requestedAction: 'double',
        teach: 'Double adds an equal wager and draws one card, then your turn ends.',
      },
      {
        id: 'recap', type: 'recap', title: 'Read Your Hand — done',
        capabilities: [{ outcomeId: 'test-skill', text: 'You can read a hand total.' }],
      },
    ],
  };
}

function buildSubject(unit: Unit): Subject {
  return { id: 'lesson-ui-test', title: 'Test', skills: [{ id: 'test-skill', title: 'Test' }], units: [unit] };
}

function newController(unit: Unit, transport: CoreTransport = new WasmTransport()): LessonController {
  return new LessonController(new LearnEngine(transport), buildSubject(unit), unit, {
    seq: () => 0, freshSeed: () => 'lesson-ui-test-seed',
  });
}

class FakeTransport implements CoreTransport {
  constructor(private readonly reply: string) {}
  call(): string { return this.reply; }
}

describe('Lesson view', () => {
  it('shows an explanation heading, body, and a Continue button', () => {
    const c = newController(buildUnit());
    render(<Lesson controller={c} onExit={() => {}} />);
    act(() => c.begin());
    expect(screen.getByRole('heading', { name: 'Reading a hand total' })).toBeTruthy();
    expect(screen.getByText(/ace can count as 1 or as 11/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /continue/i })).toBeTruthy();
  });

  it('shows a question prompt with an accessible button per choice', () => {
    const c = newController(buildUnit());
    render(<Lesson controller={c} onExit={() => {}} />);
    act(() => c.begin());
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(screen.getByText(/ace \+ 6/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: '17' })).toBeTruthy();
    expect(screen.getByRole('button', { name: '7' })).toBeTruthy();
  });

  it('shows incorrect feedback and a Retry button on a wrong answer', () => {
    const c = newController(buildUnit());
    render(<Lesson controller={c} onExit={() => {}} />);
    act(() => c.begin());
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    fireEvent.click(screen.getByRole('button', { name: '7' }));
    expect(screen.getByRole('status').textContent).toMatch(/ace can count as 11/i);
    expect(screen.getByRole('button', { name: /retry/i })).toBeTruthy();
    expect(screen.queryByRole('button', { name: /continue/i })).toBeNull();
    // Wrong answer locks the step: the choice buttons are gone until retry() runs.
    expect(screen.queryByRole('button', { name: '17' })).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: /retry/i }));
    expect(screen.getByRole('button', { name: '17' })).toBeTruthy();
  });

  it('shows correct feedback and a Continue button on a right answer', () => {
    const c = newController(buildUnit());
    render(<Lesson controller={c} onExit={() => {}} />);
    act(() => c.begin());
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    fireEvent.click(screen.getByRole('button', { name: '17' }));
    expect(screen.getByRole('status').textContent).toMatch(/counting the ace as 11/i);
    expect(screen.getByRole('button', { name: /continue/i })).toBeTruthy();
    expect(screen.queryByRole('button', { name: /retry/i })).toBeNull();
  });

  it('renders an engine hand step with only its legal-action buttons, resolving through Double', () => {
    const c = newController(buildUnit());
    render(<Lesson controller={c} onExit={() => {}} />);
    act(() => c.begin());
    fireEvent.click(screen.getByRole('button', { name: /continue/i })); // -> question
    fireEvent.click(screen.getByRole('button', { name: '17' }));
    fireEvent.click(screen.getByRole('button', { name: /continue/i })); // -> hand step

    expect(screen.getByRole('heading', { name: 'Double on eleven' })).toBeTruthy();
    const legal = c.getState().legalActions;
    expect(legal).toContain('double');
    for (const action of legal) {
      expect(screen.getByRole('button', { name: new RegExp(`^${action}$`, 'i') })).toBeTruthy();
    }
    // Only the engine's legal actions appear — never every possible Action.
    expect(screen.queryByRole('button', { name: /^split$/i })).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: /^double$/i })); // graded decision, resolves the hand
    expect(screen.getByRole('button', { name: /continue/i })).toBeTruthy();
    expect(screen.getAllByRole('status').length).toBeGreaterThan(0);
  });

  it('shows a recap of capability text (not outcome rows) and returns via onExit', () => {
    const c = newController(buildUnit());
    let exited = false;
    render(<Lesson controller={c} onExit={() => { exited = true; }} />);
    act(() => c.begin());
    fireEvent.click(screen.getByRole('button', { name: /continue/i })); // -> question
    fireEvent.click(screen.getByRole('button', { name: '17' }));
    fireEvent.click(screen.getByRole('button', { name: /continue/i })); // -> hand step
    fireEvent.click(screen.getByRole('button', { name: /^double$/i }));
    fireEvent.click(screen.getByRole('button', { name: /continue/i })); // -> recap

    expect(screen.getByRole('heading', { name: /read your hand — done/i })).toBeTruthy();
    expect(screen.getByText('You can read a hand total.')).toBeTruthy();
    expect(screen.queryByText(/win|loss|push/i)).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: /return to units/i }));
    expect(exited).toBe(true);
  });

  it('renders a fatal error with role="alert" when the transport returns a malformed reply', () => {
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
    render(<Lesson controller={c} onExit={() => {}} />);
    act(() => c.begin());
    fireEvent.click(screen.getByRole('button', { name: '17' }));
    expect(screen.getByRole('alert').textContent).toMatch(/non-JSON/i);
  });

  it('renders nothing before begin() populates a step', () => {
    const c = newController(buildUnit());
    const { container } = render(<Lesson controller={c} onExit={() => {}} />);
    expect(container.textContent).toBe('');
  });
});
