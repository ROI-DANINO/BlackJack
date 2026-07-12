// PURE checks for the Learn QA role. Two families:
//  - Provenance/composition checks (checkArrangedProvenance, checkLiveProvenance,
//    checkComposition): carried over verbatim from the retired qa/drill/checks.ts. They are
//    role-agnostic properties of a shoe/hand's cards, not drill-specific, so they move here
//    rather than being reinvented.
//  - Learn-specific coverage checks: pure functions over the driver's collected UnitCoverage
//    snapshots (never touch the browser/page themselves) plus one content-integrity check that
//    reads the static curriculum (BLACKJACK_BASICS units) directly, since recap capabilities are
//    authored data, not something every browser run necessarily walks all the way to.

import type { Card } from '../../src/bridge/types';
import type { Unit } from '../../src/learn/types';
import type { Invariant } from '../lib/types';

// --- carried over from qa/drill/checks.ts ---

export function checkArrangedProvenance(leadingCards: Card[]): Invariant {
  const bad = leadingCards.filter((card) => card.deck_id !== 'arranged');
  return {
    name: 'arranged opening is arranged-origin',
    passed: bad.length === 0,
    detail: bad.length ? `${bad.length} non-arranged` : undefined,
  };
}

export function checkLiveProvenance(cards: Card[]): Invariant {
  const bad = cards.filter((card) => !card.deck_id.startsWith('deck-'));
  return {
    name: 'live cards come from a shuffled shoe',
    passed: bad.length === 0,
    detail: bad.length ? `${bad.length} non-shoe` : undefined,
  };
}

export function checkComposition(cards: Card[]): Invariant {
  return {
    name: 'shoe is a true six-deck (312)',
    passed: cards.length === 312,
    detail: `len=${cards.length}`,
  };
}

// --- Learn-specific coverage checks ---

/** One attempt as the driver observed it: which step it graded and whether it was correct. */
export interface AttemptSnapshot {
  stepId: string;
  correct: boolean | null;
}

/** What the driver collected for one unit's run. */
export interface UnitCoverage {
  unitId: string;
  requiredChecks: string[];
  attempts: AttemptSnapshot[];
}

/** Every unit in the curriculum must appear in coverage — none skipped, none silently dropped. */
export function checkAllUnitsVisited(coverage: Array<{ unitId: string }>, expectedUnitIds: string[]): Invariant {
  const visited = new Set(coverage.map((c) => c.unitId));
  const missing = expectedUnitIds.filter((id) => !visited.has(id));
  return {
    name: 'coverage: every unit was visited',
    passed: missing.length === 0,
    detail: missing.length ? `missing units: ${missing.join(', ')}` : undefined,
  };
}

/** Every unit's declared requiredChecks (LessonController.computeCompleted's contract) must have
 *  a correct attempt against that exact step id — recomputed independently of the app's own
 *  `completed` flag, so a driver or controller regression can't mark a hollow run as covered. */
export function checkRequiredChecksPassed(coverage: UnitCoverage[]): Invariant {
  const failures: string[] = [];
  for (const unit of coverage) {
    for (const checkId of unit.requiredChecks) {
      const ok = unit.attempts.some((a) => a.stepId === checkId && a.correct === true);
      if (!ok) failures.push(`${unit.unitId}/${checkId}`);
    }
  }
  return {
    name: 'coverage: every declared required check passed',
    passed: failures.length === 0,
    detail: failures.length ? failures.join(', ') : undefined,
  };
}

/** No step should ever be graded correct twice — a retry legitimately adds a wrong attempt
 *  before the correct one, but the controller guards against re-grading an already-answered
 *  question (LessonController.submitResponse: `if (awaitingContinue) return`), so two
 *  correct=true attempts against the same step id would mean that guard broke. */
export function checkNoDuplicateAttempts(coverage: UnitCoverage[]): Invariant {
  const dups: string[] = [];
  for (const unit of coverage) {
    const seenCorrect = new Set<string>();
    for (const attempt of unit.attempts) {
      if (attempt.correct !== true) continue;
      if (seenCorrect.has(attempt.stepId)) dups.push(`${unit.unitId}/${attempt.stepId}`);
      seenCorrect.add(attempt.stepId);
    }
  }
  return {
    name: 'coverage: no step graded correct more than once',
    passed: dups.length === 0,
    detail: dups.length ? dups.join(', ') : undefined,
  };
}

/** Content integrity, not a browser-run property: each unit's recap step lists exactly the
 *  capabilities its `outcomes` promise — same set, no more, no fewer. Runs directly against
 *  BLACKJACK_BASICS so it holds even for units whose driven run exits (via `completed`) before
 *  ever reaching the recap step. */
export function checkRecapCoverage(units: Unit[]): Invariant {
  const bad: string[] = [];
  for (const unit of units) {
    const recap = unit.steps.find((step) => step.type === 'recap');
    if (!recap || recap.type !== 'recap') {
      bad.push(`${unit.id}: no recap step`);
      continue;
    }
    const capabilityIds = [...recap.capabilities.map((c) => c.outcomeId)].sort();
    const outcomeIds = [...unit.outcomes].sort();
    const same =
      capabilityIds.length === outcomeIds.length && capabilityIds.every((id, i) => id === outcomeIds[i]);
    if (!same) {
      bad.push(`${unit.id}: recap [${capabilityIds.join(',')}] != outcomes [${outcomeIds.join(',')}]`);
    }
  }
  return {
    name: 'content: recap capabilities match unit outcomes',
    passed: bad.length === 0,
    detail: bad.length ? bad.join('; ') : undefined,
  };
}
