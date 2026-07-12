import { describe, expect, it } from 'vitest';
import { BLACKJACK_BASICS } from '../../src/learn/content/blackjack-basics';
import type { Unit } from '../../src/learn/types';
import {
  checkAllUnitsVisited,
  checkArrangedProvenance,
  checkComposition,
  checkLiveProvenance,
  checkNoDuplicateAttempts,
  checkRecapCoverage,
  checkRequiredChecksPassed,
  type UnitCoverage,
} from './checks';

const NINE_UNIT_IDS = BLACKJACK_BASICS.units.map((u) => u.id);

describe('learn checks — provenance/composition (carried over from qa/drill)', () => {
  it('flags a leading card that is not arranged-origin', () => {
    expect(checkArrangedProvenance([{ deck_id: 'arranged' }] as any).passed).toBe(true);
    expect(checkArrangedProvenance([{ deck_id: 'deck-1' }] as any).passed).toBe(false);
  });

  it('requires live cards from a shuffled deck', () => {
    expect(checkLiveProvenance([{ deck_id: 'deck-3' }] as any).passed).toBe(true);
    expect(checkLiveProvenance([{ deck_id: 'arranged' }] as any).passed).toBe(false);
  });

  it('requires a true six-deck composition', () => {
    expect(checkComposition(Array(312).fill({}) as any).passed).toBe(true);
    expect(checkComposition(Array(300).fill({}) as any).passed).toBe(false);
  });
});

describe('checkAllUnitsVisited', () => {
  it('passes when coverage names every expected unit', () => {
    const coverage = NINE_UNIT_IDS.map((unitId) => ({ unitId }));
    expect(checkAllUnitsVisited(coverage, NINE_UNIT_IDS).passed).toBe(true);
  });

  it('fails and names the missing unit when one is skipped', () => {
    const coverage = NINE_UNIT_IDS.filter((id) => id !== 'split').map((unitId) => ({ unitId }));
    const result = checkAllUnitsVisited(coverage, NINE_UNIT_IDS);
    expect(result.passed).toBe(false);
    expect(result.detail).toContain('split');
  });
});

describe('checkRequiredChecksPassed', () => {
  it('passes when every declared required check has a correct attempt', () => {
    const coverage: UnitCoverage[] = [
      {
        unitId: 'meet-blackjack',
        requiredChecks: ['goal-check', 'face-value-check'],
        attempts: [
          { stepId: 'goal-check', correct: false },
          { stepId: 'goal-check', correct: true },
          { stepId: 'face-value-check', correct: true },
        ],
      },
    ];
    expect(checkRequiredChecksPassed(coverage).passed).toBe(true);
  });

  it('fails and names the unit/check when a required check never landed a correct attempt', () => {
    const coverage: UnitCoverage[] = [
      {
        unitId: 'meet-blackjack',
        requiredChecks: ['goal-check', 'face-value-check'],
        attempts: [{ stepId: 'goal-check', correct: true }],
      },
    ];
    const result = checkRequiredChecksPassed(coverage);
    expect(result.passed).toBe(false);
    expect(result.detail).toContain('meet-blackjack/face-value-check');
  });
});

describe('checkNoDuplicateAttempts', () => {
  it('allows a wrong attempt before a correct one (retry recovery)', () => {
    const coverage: UnitCoverage[] = [
      {
        unitId: 'hit-and-stand',
        requiredChecks: ['action-check'],
        attempts: [
          { stepId: 'action-check', correct: false },
          { stepId: 'action-check', correct: true },
        ],
      },
    ];
    expect(checkNoDuplicateAttempts(coverage).passed).toBe(true);
  });

  it('fails when the same step is graded correct twice', () => {
    const coverage: UnitCoverage[] = [
      {
        unitId: 'hit-and-stand',
        requiredChecks: ['action-check'],
        attempts: [
          { stepId: 'action-check', correct: true },
          { stepId: 'action-check', correct: true },
        ],
      },
    ];
    const result = checkNoDuplicateAttempts(coverage);
    expect(result.passed).toBe(false);
    expect(result.detail).toContain('hit-and-stand/action-check');
  });
});

describe('checkRecapCoverage', () => {
  it('passes for the real curriculum: every unit recap matches its declared outcomes', () => {
    expect(checkRecapCoverage(BLACKJACK_BASICS.units).passed).toBe(true);
  });

  it('fails when a recap is missing a capability for a declared outcome', () => {
    const broken: Unit = {
      ...BLACKJACK_BASICS.units[0]!,
      outcomes: ['goal', 'card-values'],
      steps: BLACKJACK_BASICS.units[0]!.steps.map((step) =>
        step.type === 'recap' ? { ...step, capabilities: [step.capabilities[0]!] } : step,
      ),
    };
    const result = checkRecapCoverage([broken]);
    expect(result.passed).toBe(false);
    expect(result.detail).toContain(broken.id);
  });

  it('fails when a unit has no recap step at all', () => {
    const broken: Unit = { ...BLACKJACK_BASICS.units[0]!, steps: BLACKJACK_BASICS.units[0]!.steps.filter((s) => s.type !== 'recap') };
    const result = checkRecapCoverage([broken]);
    expect(result.passed).toBe(false);
    expect(result.detail).toContain('no recap step');
  });
});
