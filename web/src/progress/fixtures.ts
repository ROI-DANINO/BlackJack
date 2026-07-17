// Deterministic fixture builders for the durable learner record contracts (types.ts).
//
// Every value is a literal or derived from the caller's own arguments (e.g. tier index) —
// never `Date.now()`, never `Math.random()`. Two calls with the same arguments are deep-equal.
// This determinism is what makes structured-clone round-tripping and byte-identical canonical
// export (design §5.2, §9.2) testable at all.
//
// `ProgressAttemptDraft` is defined locally as `Omit<ProgressAttempt, 'committedAtRevision'>`
// (design §3.4) rather than imported from `progress/store.ts` — that file is a later task in the
// cycle-1 plan, and this module must not depend on it existing.

import type {
  ProgressAttempt,
  SessionRecord,
  LearnerEnvelope,
  LearnerKey,
} from './types';
import type { Ruleset } from '../bridge/types';

type ProgressAttemptDraft = Omit<ProgressAttempt, 'committedAtRevision'>;

const FIXTURE_LEARNER_KEY = 'fixture-learner-0001' as LearnerKey;

const FIXTURE_RULESET: Ruleset = {
  id: 'fixture-ruleset-s17',
  decks: 6,
  penetration_percent: 75,
  dealer_soft_17: 'stand',
  blackjack_payout: 1.5,
  max_split_hands: 4,
  double_after_split: true,
  resplit_aces: false,
  split_aces_receive_one_card: true,
  insurance_auto_decline: true,
};

/** Pure function of `index` — no shared mutable counters, so repeated calls stay deterministic. */
function baseAttemptDraft(index: number): ProgressAttemptDraft {
  const ordinal = index + 1;
  return {
    attemptId: `fixture-attempt-${ordinal}`,
    learnerKey: FIXTURE_LEARNER_KEY,
    sessionId: 'fixture-session-1',
    presentationId: `fixture-presentation-${ordinal}`,
    attemptOrdinal: 1,
    evidence: {
      subjectId: 'blackjack-basics',
      unitId: 'unit-goal',
      skillId: 'goal',
      cellId: null, // 'goal' genuinely has no cell decomposition (design §2.2) — a real value, not a placeholder.
    },
    kind: 'comprehension',
    mode: 'acquisition',
    interaction: 'multiple-choice',
    difficultyBand: null,
    assistance: 'none',
    tableVisibility: 'not-applicable',
    presentation: 'canonical',
    response: { choice: 'a' },
    disposition: { status: 'graded', correct: true },
    gradedBy: { authority: 'catalog', profileId: null },
    engine: null,
    activity: {
      activityId: 'fixture-activity-goal-check',
      activityVersion: '1',
      catalogVersion: 'fixture-catalog-v1',
      seed: null,
      params: {},
    },
    occurredAt: '2026-01-01T00:00:00.000Z',
    elapsedMs: null,
  };
}

export function makeAttemptDraft(overrides: Partial<ProgressAttemptDraft> = {}): ProgressAttemptDraft {
  return { ...baseAttemptDraft(0), ...overrides };
}

/** n deterministic drafts, distinguished by index. Used by later tasks' multi-attempt gates. */
export function makeAttemptTier(n: number): ProgressAttemptDraft[] {
  return Array.from({ length: n }, (_, index) => baseAttemptDraft(index));
}

export function makeSessionRecord(overrides: Partial<SessionRecord> = {}): SessionRecord {
  return {
    sessionId: 'fixture-session-1',
    learnerKey: FIXTURE_LEARNER_KEY,
    committedAtRevision: 1,
    openedAt: '2026-01-01T00:00:00.000Z',
    closedAt: '2026-01-01T00:10:00.000Z',
    closeReason: 'learner-stopped',
    budget: { presetId: 'fixture-preset', targetDurationMs: 600_000, maxActivities: 10 },
    ruleset: { ...FIXTURE_RULESET },
    profileId: null,
    reducerVersion: null,
    curriculumVersion: 'fixture-catalog-v1',
    summary: null,
    ...overrides,
  };
}

export function makeEnvelope(overrides: Partial<LearnerEnvelope> = {}): LearnerEnvelope {
  return {
    schemaVersion: 1,
    learnerKey: FIXTURE_LEARNER_KEY,
    revision: 1,
    curriculumVersions: ['fixture-catalog-v1'],
    attempts: [{ ...baseAttemptDraft(0), committedAtRevision: 1 }],
    sessions: [makeSessionRecord()],
    cachedMastery: null,
    ...overrides,
  };
}
