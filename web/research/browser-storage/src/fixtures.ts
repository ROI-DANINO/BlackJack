import type {
  CheckpointWrite,
  ResearchAttempt,
  ResearchEnvelope,
  ResearchSessionSummary,
} from './contract';

export type FixtureTier = 'small' | 'medium' | 'stress';

export const RESEARCH_LEARNER_ID = 'device:00000000-0000-4000-8000-000000000001';
export const RESEARCH_REDUCER_VERSION = 'research-reducer-v1';
export const RESEARCH_CURRICULUM_VERSIONS = ['basic-strategy-research-v1'] as const;
const START_MS = Date.parse('2026-07-16T00:00:00.000Z');
const TIER_SIZES: Record<FixtureTier, { sessions: number; attempts: number }> = {
  small: { sessions: 1, attempts: 20 },
  medium: { sessions: 50, attempts: 1_000 },
  stress: { sessions: 500, attempts: 10_000 },
};

const id = (prefix: string, value: number): string => `${prefix}-${String(value).padStart(6, '0')}`;
const timestamp = (offset: number): string => new Date(START_MS + offset * 1_000).toISOString();

export function buildSchemaV2Fixture(tier: FixtureTier): ResearchEnvelope {
  const size = TIER_SIZES[tier];
  const attemptsPerSession = size.attempts / size.sessions;
  const attempts: ResearchAttempt[] = [];
  const sessions: ResearchSessionSummary[] = [];

  for (let sessionIndex = 0; sessionIndex < size.sessions; sessionIndex += 1) {
    const sessionId = id('session', sessionIndex + 1);
    let correctCount = 0;
    for (let localIndex = 0; localIndex < attemptsPerSession; localIndex += 1) {
      const attemptIndex = sessionIndex * attemptsPerSession + localIndex;
      const correct = attemptIndex % 3 !== 0;
      if (correct) correctCount += 1;
      attempts.push({
        attemptId: id('attempt', attemptIndex + 1),
        sessionId,
        occurredAt: timestamp(attemptIndex),
        activityId: `basic-strategy-${String(attemptIndex % 12).padStart(2, '0')}`,
        decision: ['hit', 'stand', 'double', 'split'][attemptIndex % 4] ?? 'hit',
        correct,
        responseMs: 400 + (attemptIndex % 1_200),
        assistance: 'none',
      });
    }
    const firstAttempt = sessionIndex * attemptsPerSession;
    sessions.push({
      sessionId,
      startedAt: timestamp(firstAttempt),
      endedAt: timestamp(firstAttempt + attemptsPerSession - 1),
      attemptCount: attemptsPerSession,
      correctCount,
    });
  }

  return {
    schemaVersion: 2,
    learnerId: RESEARCH_LEARNER_ID,
    revision: 0,
    reducerVersion: RESEARCH_REDUCER_VERSION,
    curriculumVersions: [...RESEARCH_CURRICULUM_VERSIONS],
    attempts,
    sessions,
    cachedMastery: null,
  };
}

export function buildSchemaV1Fixture(tier: FixtureTier = 'small'): unknown {
  const fixture = buildSchemaV2Fixture(tier);
  return {
    schemaVersion: 1,
    learnerId: fixture.learnerId,
    revision: fixture.revision,
    curriculumVersions: fixture.curriculumVersions,
    attempts: fixture.attempts.map(({ assistance: _assistance, ...attempt }) => attempt),
    sessions: fixture.sessions,
    cachedMastery: fixture.cachedMastery,
    idempotencyKeys: [],
  };
}

export function buildMalformedFixture(): unknown {
  return { schemaVersion: 2, learnerId: 17, revision: 'not-a-number', attempts: null };
}

export function buildUnsupportedSchemaFixture(): unknown {
  return { ...buildSchemaV2Fixture('small'), schemaVersion: 999 };
}

export function checkpointFromFixture(
  fixture: ResearchEnvelope,
  idempotencyKey: string,
  expectedRevision = 0,
): CheckpointWrite {
  return {
    idempotencyKey,
    expectedRevision,
    attempts: fixture.attempts,
    sessionSummary: fixture.sessions.at(-1) ?? null,
  };
}

export function checkpointsFromFixture(fixture: ResearchEnvelope, prefix: string): CheckpointWrite[] {
  return fixture.sessions.map((session, index) => ({
    idempotencyKey: `${prefix}-${String(index + 1).padStart(6, '0')}`,
    expectedRevision: index,
    attempts: fixture.attempts.filter((attempt) => attempt.sessionId === session.sessionId),
    sessionSummary: session,
  }));
}

export const FIXTURE_TIERS = Object.keys(TIER_SIZES) as FixtureTier[];
