// Canonical snapshot serializer — byte-identity is a property of the SERIALIZER, not an accident
// of key insertion order (design §5.2). Precondition for gate 8 (canonical-export-stable) and
// gate 11 (migration-additive vs a golden).
// Design: docs/superpowers/specs/2026-07-17-progressstore-cycle1-design.md §5.2, §7.
// No jsdom pragma: the Vitest environment here is 'node' (web/vite.config.ts).

import { canonicalize, type CanonicalSnapshot } from './canonical';
import { makeAttemptDraft, makeSessionRecord, makeEnvelope } from './fixtures';
import type { ProgressAttempt, SessionRecord } from './types';

function snapshotFrom(overrides: Partial<CanonicalSnapshot> = {}): CanonicalSnapshot {
  const envelope = makeEnvelope();
  return {
    format: 'blackjack.progress.snapshot',
    formatVersion: 1,
    schemaVersion: envelope.schemaVersion,
    namespace: 'fixture-namespace',
    learnerKey: envelope.learnerKey,
    revision: envelope.revision,
    curriculumVersions: envelope.curriculumVersions,
    attempts: envelope.attempts,
    sessions: envelope.sessions,
    cachedMastery: envelope.cachedMastery,
    ...overrides,
  };
}

describe('canonicalize — byte-identity is a property of the serializer (design §5.2)', () => {
  it('(a) two snapshots with identical content but DIFFERENT key insertion order canonicalize to identical strings', () => {
    const envelope = makeEnvelope();
    // fixtures.ts's makeEnvelope() always returns exactly one attempt and one session (see
    // fixtures.ts:108-109) — the non-null assertion reflects that guarantee, not an unchecked one.
    const attempt = envelope.attempts[0]!;
    const session = envelope.sessions[0]!;

    // Built with keys inserted in the exact REVERSE order of `attempt`/`session` above (which
    // fixtures.ts built in declared order). This is genuinely a different insertion order, not
    // the same construction twice — proven below via Object.keys and via naive JSON.stringify.
    const reversedAttempt: ProgressAttempt = {
      elapsedMs: attempt.elapsedMs,
      occurredAt: attempt.occurredAt,
      activity: {
        params: attempt.activity.params,
        seed: attempt.activity.seed,
        catalogVersion: attempt.activity.catalogVersion,
        activityVersion: attempt.activity.activityVersion,
        activityId: attempt.activity.activityId,
      },
      engine: attempt.engine,
      gradedBy: { profileId: attempt.gradedBy.profileId, authority: attempt.gradedBy.authority },
      disposition: attempt.disposition,
      response: attempt.response,
      presentation: attempt.presentation,
      tableVisibility: attempt.tableVisibility,
      assistance: attempt.assistance,
      difficultyBand: attempt.difficultyBand,
      interaction: attempt.interaction,
      mode: attempt.mode,
      kind: attempt.kind,
      evidence: {
        cellId: attempt.evidence.cellId,
        skillId: attempt.evidence.skillId,
        unitId: attempt.evidence.unitId,
        subjectId: attempt.evidence.subjectId,
      },
      attemptOrdinal: attempt.attemptOrdinal,
      presentationId: attempt.presentationId,
      sessionId: attempt.sessionId,
      learnerKey: attempt.learnerKey,
      committedAtRevision: attempt.committedAtRevision,
      attemptId: attempt.attemptId,
    };

    const reversedSession: SessionRecord = {
      summary: session.summary,
      curriculumVersion: session.curriculumVersion,
      reducerVersion: session.reducerVersion,
      profileId: session.profileId,
      ruleset: {
        insurance_auto_decline: session.ruleset.insurance_auto_decline,
        split_aces_receive_one_card: session.ruleset.split_aces_receive_one_card,
        resplit_aces: session.ruleset.resplit_aces,
        double_after_split: session.ruleset.double_after_split,
        max_split_hands: session.ruleset.max_split_hands,
        blackjack_payout: session.ruleset.blackjack_payout,
        dealer_soft_17: session.ruleset.dealer_soft_17,
        penetration_percent: session.ruleset.penetration_percent,
        decks: session.ruleset.decks,
        id: session.ruleset.id,
      },
      budget: {
        maxActivities: session.budget.maxActivities,
        targetDurationMs: session.budget.targetDurationMs,
        presetId: session.budget.presetId,
      },
      closeReason: session.closeReason,
      closedAt: session.closedAt,
      openedAt: session.openedAt,
      committedAtRevision: session.committedAtRevision,
      learnerKey: session.learnerKey,
      sessionId: session.sessionId,
    };

    // Sanity: prove the two sides really do have different insertion order, so a pass below is
    // not vacuous (a test built the same way on both sides proves nothing).
    expect(Object.keys(reversedAttempt)).not.toEqual(Object.keys(attempt));
    expect(Object.keys(reversedSession)).not.toEqual(Object.keys(session));
    expect(JSON.stringify(reversedAttempt)).not.toEqual(JSON.stringify(attempt));
    expect(JSON.stringify(reversedSession)).not.toEqual(JSON.stringify(session));

    const snapshotA = snapshotFrom({ attempts: [attempt], sessions: [session] });
    const snapshotB: CanonicalSnapshot = {
      cachedMastery: envelope.cachedMastery,
      sessions: [reversedSession],
      attempts: [reversedAttempt],
      curriculumVersions: envelope.curriculumVersions,
      revision: envelope.revision,
      learnerKey: envelope.learnerKey,
      namespace: 'fixture-namespace',
      schemaVersion: envelope.schemaVersion,
      formatVersion: 1,
      format: 'blackjack.progress.snapshot',
    };

    expect(canonicalize(snapshotA)).toEqual(canonicalize(snapshotB));
  });

  it('(b) attempts are emitted ordered by (committedAtRevision, attemptId) regardless of input array order', () => {
    const attemptRev1B: ProgressAttempt = { ...makeAttemptDraft({ attemptId: 'attempt-b' }), committedAtRevision: 1 };
    const attemptRev1A: ProgressAttempt = { ...makeAttemptDraft({ attemptId: 'attempt-a' }), committedAtRevision: 1 };
    const attemptRev3C: ProgressAttempt = { ...makeAttemptDraft({ attemptId: 'attempt-c' }), committedAtRevision: 3 };
    const attemptRev2Z: ProgressAttempt = { ...makeAttemptDraft({ attemptId: 'attempt-z' }), committedAtRevision: 2 };

    // Deliberately scrambled input order.
    const snapshot = snapshotFrom({
      attempts: [attemptRev3C, attemptRev1B, attemptRev2Z, attemptRev1A],
      sessions: [],
    });

    const parsed = JSON.parse(canonicalize(snapshot)) as { attempts: Array<{ attemptId: string; committedAtRevision: number }> };
    expect(parsed.attempts.map((a) => a.attemptId)).toEqual(['attempt-a', 'attempt-b', 'attempt-z', 'attempt-c']);
    expect(parsed.attempts.map((a) => a.committedAtRevision)).toEqual([1, 1, 2, 3]);
  });

  it('(b) sessions are emitted ordered by (committedAtRevision, sessionId) regardless of input array order', () => {
    const sessionRev1B: SessionRecord = { ...makeSessionRecord({ sessionId: 'session-b' }), committedAtRevision: 1 };
    const sessionRev1A: SessionRecord = { ...makeSessionRecord({ sessionId: 'session-a' }), committedAtRevision: 1 };
    const sessionRev2C: SessionRecord = { ...makeSessionRecord({ sessionId: 'session-c' }), committedAtRevision: 2 };

    const snapshot = snapshotFrom({
      attempts: [],
      sessions: [sessionRev2C, sessionRev1A, sessionRev1B],
    });

    const parsed = JSON.parse(canonicalize(snapshot)) as { sessions: Array<{ sessionId: string; committedAtRevision: number }> };
    expect(parsed.sessions.map((s) => s.sessionId)).toEqual(['session-a', 'session-b', 'session-c']);
  });

  it('(c) an absent optional key is ABSENT from the output, never null — disposition:"graded",correct:true has no errorClass key at all', () => {
    const attempt: ProgressAttempt = {
      ...makeAttemptDraft({ disposition: { status: 'graded', correct: true } }),
      committedAtRevision: 1,
    };
    const output = canonicalize(snapshotFrom({ attempts: [attempt], sessions: [] }));
    const parsed = JSON.parse(output) as { attempts: Array<{ disposition: Record<string, unknown> }> };
    const [first] = parsed.attempts;

    expect('errorClass' in first!.disposition).toBe(false);
    expect(output).not.toContain('errorClass');
  });

  it('(c) disposition:"ungraded" has no `correct` or `errorClass` key at all', () => {
    const attempt: ProgressAttempt = {
      ...makeAttemptDraft({ disposition: { status: 'ungraded' } }),
      committedAtRevision: 1,
    };
    const output = canonicalize(snapshotFrom({ attempts: [attempt], sessions: [] }));
    const parsed = JSON.parse(output) as { attempts: Array<{ disposition: Record<string, unknown> }> };
    const [first] = parsed.attempts;

    expect(first!.disposition).toEqual({ status: 'ungraded' });
    expect('correct' in first!.disposition).toBe(false);
    expect('errorClass' in first!.disposition).toBe(false);
  });

  it('(c) disposition:"abandoned" has no `correct` or `errorClass` key at all', () => {
    const attempt: ProgressAttempt = {
      ...makeAttemptDraft({ disposition: { status: 'abandoned' } }),
      committedAtRevision: 1,
    };
    const output = canonicalize(snapshotFrom({ attempts: [attempt], sessions: [] }));
    const parsed = JSON.parse(output) as { attempts: Array<{ disposition: Record<string, unknown> }> };
    const [first] = parsed.attempts;

    expect(first!.disposition).toEqual({ status: 'abandoned' });
  });

  it('(c) a REAL null (e.g. errorClass: null on an unclassified wrong answer) DOES appear, unlike a phantom key', () => {
    const attempt: ProgressAttempt = {
      ...makeAttemptDraft({ disposition: { status: 'graded', correct: false, errorClass: null } }),
      committedAtRevision: 1,
    };
    const output = canonicalize(snapshotFrom({ attempts: [attempt], sessions: [] }));
    const parsed = JSON.parse(output) as { attempts: Array<{ disposition: Record<string, unknown> }> };
    const [first] = parsed.attempts;

    expect(first!.disposition).toEqual({ status: 'graded', correct: false, errorClass: null });
  });

  it('(d) the output contains no `exportedAt` field and no other wall-clock export timestamp', () => {
    const output = canonicalize(snapshotFrom());
    expect(output).not.toContain('exportedAt');
  });

  it('(e) canonicalizing the same fixture content twice is byte-identical', () => {
    expect(canonicalize(snapshotFrom())).toEqual(canonicalize(snapshotFrom()));
  });

  it('(f) an opaque `response` object with the same content but different (nested) key insertion order canonicalizes identically', () => {
    // Built key-by-key in one order, including a nested object, so the reversed version below is
    // genuinely a different insertion order — not the same construction twice.
    const responseA = {
      choice: 'a',
      meta: { hint: false, retries: 0 },
      trail: [3, 1, 2],
    };
    const responseB = {
      trail: [3, 1, 2],
      meta: { retries: 0, hint: false },
      choice: 'a',
    };
    expect(Object.keys(responseB)).not.toEqual(Object.keys(responseA));
    expect(JSON.stringify(responseB)).not.toEqual(JSON.stringify(responseA));

    const attemptA: ProgressAttempt = { ...makeAttemptDraft({ response: responseA }), committedAtRevision: 1 };
    const attemptB: ProgressAttempt = { ...makeAttemptDraft({ response: responseB }), committedAtRevision: 1 };

    const outputA = canonicalize(snapshotFrom({ attempts: [attemptA], sessions: [] }));
    const outputB = canonicalize(snapshotFrom({ attempts: [attemptB], sessions: [] }));
    expect(outputA).toEqual(outputB);
  });

  it('(f) an array inside an opaque payload keeps its element order — [3,1,2] is not sorted to [1,2,3]', () => {
    const attempt: ProgressAttempt = {
      ...makeAttemptDraft({ response: { trail: [3, 1, 2] } }),
      committedAtRevision: 1,
    };
    const output = canonicalize(snapshotFrom({ attempts: [attempt], sessions: [] }));
    const parsed = JSON.parse(output) as { attempts: Array<{ response: { trail: number[] } }> };
    expect(parsed.attempts[0]!.response.trail).toEqual([3, 1, 2]);
  });

  it('(f) `activity.params` (another opaque call site) is also key-sorted regardless of insertion order', () => {
    const paramsA = { level: 2, seedGroup: { high: 9, low: 1 } };
    const paramsB = { seedGroup: { low: 1, high: 9 }, level: 2 };
    expect(Object.keys(paramsB)).not.toEqual(Object.keys(paramsA));

    const attemptA: ProgressAttempt = {
      ...makeAttemptDraft(),
      committedAtRevision: 1,
      activity: { ...makeAttemptDraft().activity, params: paramsA },
    };
    const attemptB: ProgressAttempt = {
      ...makeAttemptDraft(),
      committedAtRevision: 1,
      activity: { ...makeAttemptDraft().activity, params: paramsB },
    };

    const outputA = canonicalize(snapshotFrom({ attempts: [attemptA], sessions: [] }));
    const outputB = canonicalize(snapshotFrom({ attempts: [attemptB], sessions: [] }));
    expect(outputA).toEqual(outputB);
  });

  it('(g) a populated (non-null) `engine` context canonicalizes its declared fields, including the outcomes array rebuild', () => {
    const attempt: ProgressAttempt = {
      ...makeAttemptDraft({
        engine: {
          seed: 'fixture-engine-seed',
          playerCardIds: ['card-1', 'card-2'],
          dealerUpcardId: 'card-3',
          legalActions: ['hit', 'stand'],
          outcomes: [{ hand_index: 0, result: 'win', wager: 10, delta: 10 }],
          wager: 10,
        },
      }),
      committedAtRevision: 1,
    };

    const output = canonicalize(snapshotFrom({ attempts: [attempt], sessions: [] }));
    const parsed = JSON.parse(output) as {
      attempts: Array<{
        engine: {
          seed: string;
          playerCardIds: string[];
          dealerUpcardId: string;
          legalActions: string[];
          outcomes: Array<{ hand_index: number; result: string; wager: number; delta: number }>;
          wager: number;
        } | null;
      }>;
    };

    expect(parsed.attempts[0]!.engine).toEqual({
      seed: 'fixture-engine-seed',
      playerCardIds: ['card-1', 'card-2'],
      dealerUpcardId: 'card-3',
      legalActions: ['hit', 'stand'],
      outcomes: [{ hand_index: 0, result: 'win', wager: 10, delta: 10 }],
      wager: 10,
    });
  });

  it('(g) a populated (non-null) `cachedMastery`, including its opaque `states` payload, is key-sorted regardless of insertion order', () => {
    const statesA = { skillA: { level: 1, seen: 3 }, skillB: { level: 2, seen: 1 } };
    const statesB = { skillB: { seen: 1, level: 2 }, skillA: { seen: 3, level: 1 } };
    expect(Object.keys(statesB)).not.toEqual(Object.keys(statesA));

    const outputA = canonicalize(
      snapshotFrom({
        attempts: [],
        sessions: [],
        cachedMastery: { reducerVersion: 'fixture-reducer-v1', computedAtRevision: 4, states: statesA },
      }),
    );
    const outputB = canonicalize(
      snapshotFrom({
        attempts: [],
        sessions: [],
        cachedMastery: { computedAtRevision: 4, states: statesB, reducerVersion: 'fixture-reducer-v1' },
      }),
    );
    expect(outputA).toEqual(outputB);

    const parsed = JSON.parse(outputA) as {
      cachedMastery: { reducerVersion: string; computedAtRevision: number; states: unknown } | null;
    };
    expect(parsed.cachedMastery).toEqual({
      reducerVersion: 'fixture-reducer-v1',
      computedAtRevision: 4,
      states: { skillA: { level: 1, seen: 3 }, skillB: { level: 2, seen: 1 } },
    });
  });

  it('(g) a populated (non-null) `session.summary` (opaque) is key-sorted regardless of insertion order', () => {
    const summaryA = { attemptsGraded: 3, notes: { flagged: false, tag: 'ok' } };
    const summaryB = { notes: { tag: 'ok', flagged: false }, attemptsGraded: 3 };
    expect(Object.keys(summaryB)).not.toEqual(Object.keys(summaryA));

    const sessionA: SessionRecord = { ...makeSessionRecord({ summary: summaryA }), committedAtRevision: 1 };
    const sessionB: SessionRecord = { ...makeSessionRecord({ summary: summaryB }), committedAtRevision: 1 };

    const outputA = canonicalize(snapshotFrom({ attempts: [], sessions: [sessionA] }));
    const outputB = canonicalize(snapshotFrom({ attempts: [], sessions: [sessionB] }));
    expect(outputA).toEqual(outputB);

    const parsed = JSON.parse(outputA) as { sessions: Array<{ summary: unknown }> };
    expect(parsed.sessions[0]!.summary).toEqual({ attemptsGraded: 3, notes: { flagged: false, tag: 'ok' } });
  });

  it('emits the format tag and format version', () => {
    const parsed = JSON.parse(canonicalize(snapshotFrom())) as { format: string; formatVersion: number };
    expect(parsed.format).toBe('blackjack.progress.snapshot');
    expect(parsed.formatVersion).toBe(1);
  });
});
