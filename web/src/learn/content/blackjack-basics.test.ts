// Content-coverage tests for the Blackjack Basics curriculum (all nine units). These are pure
// structural/data assertions — no controller, no WASM core — matching the committed
// contracts (types.ts / validate.ts). Full engine-graded playthroughs live in controller.test.ts.

import { describe, expect, it } from 'vitest';
import { validateSubject } from '../validate';
import type { QuestionStep } from '../types';
import { BLACKJACK_BASICS } from './blackjack-basics';

const STRATEGY_LANGUAGE = [/best move/i, /correct play/i, /basic strategy/i];

function allText(): string[] {
  const out: string[] = [];
  for (const unit of BLACKJACK_BASICS.units) {
    out.push(unit.title, unit.goal);
    for (const step of unit.steps) {
      if (step.type === 'explain') out.push(step.title, step.body);
      if (step.type === 'question') {
        out.push(step.prompt, step.correct, step.incorrect);
        for (const choice of step.choices) out.push(choice.label);
      }
      if (step.type === 'hand') out.push(step.title, step.intro, step.teach);
      if (step.type === 'recap') {
        out.push(step.title);
        for (const cap of step.capabilities) out.push(cap.text);
      }
    }
  }
  return out;
}

describe('BLACKJACK_BASICS — structural coverage', () => {
  it('validates cleanly against the committed curriculum contracts', () => {
    expect(validateSubject(BLACKJACK_BASICS)).toEqual([]);
  });

  it('declares all nine units in the exact locked order', () => {
    expect(BLACKJACK_BASICS.units.map((u) => u.id)).toEqual([
      'meet-blackjack', 'read-your-hand', 'round-flow', 'hit-and-stand',
      'win-lose-push', 'blackjack-is-special', 'double', 'split', 'complete-round',
    ]);
  });

  it('gives every unit at least one required check and ends on a recap step', () => {
    for (const unit of BLACKJACK_BASICS.units) {
      expect(unit.requiredChecks.length).toBeGreaterThan(0);
      expect(unit.steps.at(-1)?.type).toBe('recap');
    }
  });

  it('makes Double request the double action and Split request the split action', () => {
    const handOf = (unitId: string, stepId: string) => {
      const unit = BLACKJACK_BASICS.units.find((u) => u.id === unitId)!;
      const step = unit.steps.find((s) => s.id === stepId)!;
      if (step.type !== 'hand') throw new Error(`${stepId} is not a hand step`);
      return step;
    };
    expect(handOf('double', 'double-hand').requestedAction).toBe('double');
    expect(handOf('split', 'split-hand').requestedAction).toBe('split');
  });

  it('runs the checkpoint on a live hand with no requested action and no strategy answer rule', () => {
    const unit = BLACKJACK_BASICS.units.find((u) => u.id === 'complete-round')!;
    const handSteps = unit.steps.filter((s) => s.type === 'hand');
    expect(handSteps).toHaveLength(1);
    const hand = handSteps[0]!;
    if (hand.type !== 'hand') throw new Error('expected a hand step');
    expect(hand.setup.kind).toBe('live');
    // The checkpoint never asks the learner to perform a "right" action — no requested action,
    // and its final question grades outcome comprehension (last_outcome), never oracle agreement.
    expect(hand.requestedAction).toBeUndefined();
    for (const step of unit.steps) {
      if (step.type === 'question') expect(step.answer.kind).toBe('last_outcome');
    }
  });

  it('locks the skill catalog to the exact stable ids/titles from the brief', () => {
    expect(BLACKJACK_BASICS.skills).toEqual([
      { id: 'goal', title: 'Explain the goal of blackjack' },
      { id: 'card-values', title: 'Recognize card values' },
      { id: 'hand-total', title: 'Read a hand total' },
      { id: 'ace-value', title: 'Use an Ace as 1 or 11' },
      { id: 'bust', title: 'Recognize a bust' },
      { id: 'round-flow', title: 'Follow a blackjack round' },
      { id: 'dealer-info', title: 'Read dealer information' },
      { id: 'hit', title: 'Explain and use Hit' },
      { id: 'stand', title: 'Explain and use Stand' },
      { id: 'outcomes', title: 'Recognize win, loss, and push' },
      { id: 'wager-result', title: 'Follow the original wager' },
      { id: 'natural-blackjack', title: 'Distinguish blackjack from ordinary 21' },
      { id: 'double', title: 'Explain and use Double' },
      { id: 'split', title: 'Explain and use Split' },
      { id: 'split-hands', title: 'Follow separately played split hands' },
      { id: 'complete-round', title: 'Complete and explain a full round' },
    ]);
  });

  // Prerequisites are SKILL ids (each introduced as an outcome by an earlier unit), per the
  // design and the brief's unitGraph. The committed validator checks them against skill ids.
  it('locks the prerequisite/outcome graph for all nine units to the brief exactly', () => {
    const graph = BLACKJACK_BASICS.units.map((u) => ({
      id: u.id, prerequisites: u.prerequisites, outcomes: u.outcomes,
    }));
    expect(graph).toEqual([
      { id: 'meet-blackjack', prerequisites: [], outcomes: ['goal', 'card-values'] },
      { id: 'read-your-hand', prerequisites: ['card-values'], outcomes: ['hand-total', 'ace-value', 'bust'] },
      { id: 'round-flow', prerequisites: ['goal', 'hand-total'], outcomes: ['round-flow', 'dealer-info'] },
      { id: 'hit-and-stand', prerequisites: ['round-flow', 'hand-total', 'bust'], outcomes: ['hit', 'stand'] },
      { id: 'win-lose-push', prerequisites: ['round-flow', 'bust'], outcomes: ['outcomes', 'wager-result'] },
      { id: 'blackjack-is-special', prerequisites: ['hand-total', 'outcomes', 'wager-result'], outcomes: ['natural-blackjack'] },
      { id: 'double', prerequisites: ['hit', 'stand', 'wager-result'], outcomes: ['double'] },
      { id: 'split', prerequisites: ['round-flow', 'wager-result'], outcomes: ['split', 'split-hands'] },
      {
        id: 'complete-round',
        prerequisites: [
          'goal', 'hand-total', 'dealer-info', 'hit', 'stand', 'outcomes',
          'wager-result', 'natural-blackjack', 'double', 'split', 'split-hands',
        ],
        outcomes: ['complete-round'],
      },
    ]);
  });

  it('matches the exact minimum step-type inventory per unit', () => {
    const requiredStepTypes: Record<string, string[]> = {
      'meet-blackjack': ['explain', 'question', 'question', 'recap'],
      'read-your-hand': ['explain', 'question', 'question', 'question', 'recap'],
      'round-flow': ['explain', 'question', 'question', 'recap'],
      'hit-and-stand': ['explain', 'question', 'hand', 'hand', 'question', 'recap'],
      'win-lose-push': ['explain', 'hand', 'question', 'question', 'recap'],
      'blackjack-is-special': ['explain', 'hand', 'question', 'question', 'recap'],
      'double': ['explain', 'question', 'hand', 'question', 'recap'],
      'split': ['explain', 'question', 'hand', 'question', 'recap'],
      'complete-round': ['explain', 'hand', 'question', 'recap'],
    };
    for (const unit of BLACKJACK_BASICS.units) {
      const actual = unit.steps.map((s) => s.type);
      const expected = requiredStepTypes[unit.id]!;
      // "additional explanation screens are allowed" — every required type must appear in
      // order as a subsequence, and the exact set given is what we author (no extras here).
      expect(actual).toEqual(expected);
    }
  });

  it('never uses strategy language in any authored prompt/body/feedback/label/teach text', () => {
    const text = allText();
    for (const pattern of STRATEGY_LANGUAGE) {
      const offenders = text.filter((t) => pattern.test(t));
      expect(offenders).toEqual([]);
    }
  });

  it('grades every hand-total/bust question with an engine answer rule, never a literal', () => {
    const engineFactChecks = new Set([
      'face-value-check', 'soft-total-check', 'ace-adjust-check', 'bust-check',
    ]);
    for (const unit of BLACKJACK_BASICS.units.slice(0, 6)) {
      for (const step of unit.steps) {
        if (step.type !== 'question') continue;
        if (!engineFactChecks.has(step.id)) continue;
        expect(['hand_total', 'hand_softness', 'hand_bust']).toContain(step.answer.kind);
      }
    }
  });

  it('never grades a total/bust/softness fact with a literal answer rule', () => {
    for (const unit of BLACKJACK_BASICS.units.slice(0, 6)) {
      for (const step of unit.steps) {
        if (step.type !== 'question') continue;
        if (step.answer.kind !== 'literal') continue;
        // A literal rule's value must not look like a bare hand total/bust token that
        // should have been engine-graded instead.
        expect(step.answer.value).not.toMatch(/^(bust|not_bust|soft|hard)$/);
      }
    }
  });

  it('grades win-lose-push and blackjack-is-special outcomes/payouts via engine session rules', () => {
    const byId = new Map<string, QuestionStep>();
    for (const unit of BLACKJACK_BASICS.units.slice(0, 6)) {
      for (const step of unit.steps) {
        if (step.type === 'question') byId.set(step.id, step);
      }
    }
    expect(byId.get('outcome-check')!.answer).toMatchObject({ kind: 'last_outcome' });
    expect(byId.get('payout-check')!.answer).toMatchObject({ kind: 'last_bankroll_delta' });
    // Fixed 2000-cent teaching wager -> a natural pays 3:2 -> +3000-cent delta. Pin the exact
    // wire value the intended-correct choice offers (the controller grades against '3000').
    expect(byId.get('payout-check')!.choices).toContainEqual(
      expect.objectContaining({ value: '3000' }),
    );
  });

  it('every requiredChecks id names a question step whose outcomeId belongs to its unit', () => {
    for (const unit of BLACKJACK_BASICS.units) {
      const stepsById = new Map(unit.steps.map((s) => [s.id, s]));
      for (const checkId of unit.requiredChecks) {
        const step = stepsById.get(checkId);
        expect(step?.type).toBe('question');
        if (step?.type === 'question') expect(unit.outcomes).toContain(step.outcomeId);
      }
    }
  });

  it('includes the exact tabled check ids for each unit', () => {
    const ids = (unitId: string) =>
      BLACKJACK_BASICS.units.find((u) => u.id === unitId)!.steps
        .filter((s): s is QuestionStep => s.type === 'question').map((s) => s.id);
    expect(ids('meet-blackjack')).toEqual(expect.arrayContaining(['goal-check', 'face-value-check']));
    expect(ids('read-your-hand')).toEqual(
      expect.arrayContaining(['soft-total-check', 'ace-adjust-check', 'bust-check']));
    expect(ids('round-flow')).toEqual(expect.arrayContaining(['dealer-info-check', 'round-order-check']));
    expect(ids('hit-and-stand')).toEqual(expect.arrayContaining(['action-check']));
    expect(ids('win-lose-push')).toEqual(expect.arrayContaining(['outcome-check']));
    expect(ids('blackjack-is-special')).toEqual(expect.arrayContaining(['natural-check', 'payout-check']));
    expect(ids('double')).toEqual(expect.arrayContaining(['double-wager-check']));
    expect(ids('split')).toEqual(expect.arrayContaining(['split-count-check']));
    expect(ids('complete-round')).toEqual(expect.arrayContaining(['final-outcome-check']));
  });

  it('hit-and-stand includes one requested Hit hand and one requested Stand hand', () => {
    const unit = BLACKJACK_BASICS.units.find((u) => u.id === 'hit-and-stand')!;
    const handSteps = unit.steps.filter((s) => s.type === 'hand');
    expect(handSteps.map((s) => s.requestedAction).sort()).toEqual(['hit', 'stand']);
  });
});
