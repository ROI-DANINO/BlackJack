import { describe, it, expect } from 'vitest';
import { validateSubject } from './validate';
import type { Subject, Unit } from './types';

// A minimal but fully valid unit: covers explain/question/hand/recap step types,
// a satisfied requiredCheck, and recap capabilities that exactly match unit outcomes.
function validUnit(): Unit {
  return {
    id: 'basics',
    title: 'Basics',
    goal: 'Learn basics',
    prerequisites: [],
    outcomes: ['totals', 'soft'],
    requiredChecks: ['q1'],
    steps: [
      { id: 'intro', type: 'explain', title: 'Intro', body: 'Read the cards.' },
      {
        id: 'q1',
        type: 'question',
        outcomeId: 'totals',
        prompt: "What's the total?",
        choices: [{ value: '20', label: '20' }],
        answer: { kind: 'literal', value: '20' },
        correct: 'Yes',
        incorrect: 'No',
      },
      {
        id: 'hand1',
        type: 'hand',
        outcomeId: 'soft',
        title: 'Play a hand',
        intro: 'Play it out.',
        setup: { kind: 'live' },
        teach: 'Soft hands have an ace counted as 11.',
      },
      {
        id: 'recap',
        type: 'recap',
        title: 'Recap',
        capabilities: [
          { outcomeId: 'totals', text: 'You can read totals' },
          { outcomeId: 'soft', text: 'You can read soft totals' },
        ],
      },
    ],
  };
}

function validSubject(): Subject {
  return {
    id: 'blackjack-basics',
    title: 'Blackjack Basics',
    skills: [
      { id: 'totals', title: 'Read totals' },
      { id: 'soft', title: 'Soft totals' },
    ],
    units: [validUnit()],
  };
}

describe('validateSubject', () => {
  it('rejects duplicate ids and completion checks that measure no declared outcome', () => {
    const broken: Subject = {
      id: 'broken',
      title: 'Broken',
      skills: [{ id: 'totals', title: 'Read totals' }, { id: 'totals', title: 'Again' }],
      units: [{
        id: 'basics', title: 'Basics', goal: 'Learn basics', prerequisites: [],
        outcomes: ['totals'], requiredChecks: ['missing-step'],
        steps: [{ id: 'intro', type: 'explain', title: 'Intro', body: 'Read the cards.' }],
      }],
    };
    expect(validateSubject(broken)).toEqual([
      'duplicate skill id: totals',
      'unit basics: required check missing-step does not exist',
    ]);
  });

  it('accepts a fully valid subject', () => {
    expect(validateSubject(validSubject())).toEqual([]);
  });

  it('rejects duplicate unit ids', () => {
    const subject = validSubject();
    subject.units = [validUnit(), validUnit()];
    expect(validateSubject(subject)).toEqual(['duplicate unit id: basics']);
  });

  it('rejects duplicate step ids within a unit', () => {
    const subject = validSubject();
    const unit = subject.units[0]!;
    unit.steps = [...unit.steps, { id: 'intro', type: 'explain', title: 'Intro again', body: 'Repeat.' }];
    expect(validateSubject(subject)).toEqual(['unit basics: duplicate step id: intro']);
  });

  it('rejects unknown unit prerequisites', () => {
    const subject = validSubject();
    subject.units[0]!.prerequisites = ['nope'];
    expect(validateSubject(subject)).toEqual(['unit basics: unknown prerequisite: nope']);
  });

  it('rejects unit outcomes that are not declared skills', () => {
    const subject = validSubject();
    const unit = subject.units[0]!;
    unit.outcomes = [...unit.outcomes, 'ghost'];
    const recap = unit.steps.find((s) => s.type === 'recap');
    if (recap && recap.type === 'recap') {
      recap.capabilities = [...recap.capabilities, { outcomeId: 'ghost', text: 'Ghost capability' }];
    }
    expect(validateSubject(subject)).toEqual(['unit basics: unknown outcome: ghost']);
  });

  it('rejects units with no steps', () => {
    const subject = validSubject();
    subject.units[0]!.steps = [];
    subject.units[0]!.requiredChecks = [];
    subject.units[0]!.outcomes = [];
    expect(validateSubject(subject)).toEqual(['unit basics: has no steps']);
  });

  it('rejects a required check that does not name a question step', () => {
    const subject = validSubject();
    subject.units[0]!.requiredChecks = ['intro'];
    expect(validateSubject(subject)).toEqual(['unit basics: required check intro is not a question']);
  });

  it('rejects a question step whose outcome is not declared by the unit', () => {
    const subject = validSubject();
    const unit = subject.units[0]!;
    const q = unit.steps.find((s) => s.type === 'question');
    if (q && q.type === 'question') q.outcomeId = 'unsupported';
    expect(validateSubject(subject)).toEqual([
      'unit basics: question q1 targets unsupported outcome unsupported',
    ]);
  });

  it('rejects recap capabilities that omit a declared outcome', () => {
    const subject = validSubject();
    const unit = subject.units[0]!;
    const recap = unit.steps.find((s) => s.type === 'recap');
    if (recap && recap.type === 'recap') {
      recap.capabilities = recap.capabilities.filter((c) => c.outcomeId !== 'soft');
    }
    expect(validateSubject(subject)).toEqual(['unit basics: recap missing outcome: soft']);
  });

  it('rejects recap capabilities that reference an outcome the unit did not declare', () => {
    const subject = validSubject();
    const unit = subject.units[0]!;
    const recap = unit.steps.find((s) => s.type === 'recap');
    if (recap && recap.type === 'recap') {
      recap.capabilities = [...recap.capabilities, { outcomeId: 'phantom', text: 'Phantom capability' }];
    }
    expect(validateSubject(subject)).toEqual([
      'unit basics: recap references unknown outcome: phantom',
    ]);
  });
});
