// Canonical snapshot serializer (design §5.2). Content-only, deterministic bytes: byte-identity
// must be a PROPERTY OF THIS SERIALIZER — not an accident of JSON.stringify(obj)'s insertion-order
// behavior, and not an accident of IndexedDB's structured-clone read order. Precondition for the
// two gates that depend on it: gate 8 (canonical-export-stable) and gate 11 (migration-additive
// vs a golden fixture).
//
// Rules, all from design §5.2:
//   - No wall clock. `exportedAt` belongs in the export WRAPPER (§5.3), never in these bytes.
//   - Explicit declared key order, at every level — never `JSON.stringify(obj)` over an arbitrary
//     object, never rely on `Object.keys()` order.
//   - Explicit array order: attempts by (committedAtRevision, attemptId); sessions likewise by
//     (committedAtRevision, sessionId).
//   - Absent keys stay absent, never emitted as `null` (the phantom rule, design §7). This module
//     honors it by construction for `AttemptDisposition`: `{status:'graded',correct:true}` has no
//     `errorClass` key on the TYPE, and `canonicalDisposition` below never invents one. A `null`
//     that IS a real domain value (e.g. `cellId: null`, `errorClass: null` on an unclassified
//     wrong answer) is preserved as `null` — only phantom keys are omitted, not real nulls.
//
// Module boundary (design §3.1): imports only './types' and '../bridge/types'. No import of
// 'idb' (that import is reserved for progress/idb-store.ts, enforced by a separate test), no
// import of '../learn/'.
//
// Caller-opaque `JsonValue` payloads (`response`, `activity.params`, `session.summary`,
// `cachedMastery.states`) are passed through as-is, not recursively key-sorted. types.ts already
// documents these as fields "the store stores it opaquely" — this module owns key order for the
// record shapes it declares, not for content only the activity/reducer understands.

import type {
  ProgressAttempt,
  SessionRecord,
  CachedMastery,
  AttemptDisposition,
  AttemptEngineContext,
} from './types';
import type { Ruleset } from '../bridge/types';

/**
 * The canonical export shape (design §5.2). Distinct from `LearnerEnvelope` (types.ts): it adds
 * the export-format tag (`format`, `formatVersion`) and a caller-supplied `namespace` — the
 * IndexedDB database name lives on the store's open config (design §3.1's `namespace: string`),
 * not on the envelope itself.
 *
 * Defined HERE, not in types.ts: design §5.2 is the section that introduces this type and also
 * specifies this module's job, and nothing in the design places it on the envelope or the port
 * interface. A later task (store.ts) is expected to construct one from a loaded `LearnerEnvelope`
 * plus its own `namespace` config.
 */
export type CanonicalSnapshot = {
  format: 'blackjack.progress.snapshot';
  formatVersion: 1; // the EXPORT format's version — independent of schemaVersion
  schemaVersion: number; // the envelope schema exported
  namespace: string;
  learnerKey: string;
  revision: number;
  curriculumVersions: string[];
  attempts: ProgressAttempt[];
  sessions: SessionRecord[];
  cachedMastery: CachedMastery | null;
};

function compareAttempts(a: ProgressAttempt, b: ProgressAttempt): number {
  if (a.committedAtRevision !== b.committedAtRevision) {
    return a.committedAtRevision - b.committedAtRevision;
  }
  return a.attemptId < b.attemptId ? -1 : a.attemptId > b.attemptId ? 1 : 0;
}

function compareSessions(a: SessionRecord, b: SessionRecord): number {
  if (a.committedAtRevision !== b.committedAtRevision) {
    return a.committedAtRevision - b.committedAtRevision;
  }
  return a.sessionId < b.sessionId ? -1 : a.sessionId > b.sessionId ? 1 : 0;
}

// The phantom rule, applied to the one field on ProgressAttempt whose TYPE already makes a key
// structurally absent rather than nullable: `correct` and `errorClass` do not exist on the
// {status:'ungraded'} or {status:'abandoned'} variants, and `errorClass` does not exist on the
// {status:'graded', correct:true} variant. Building a fresh object per-branch (instead of
// spreading the input) is what keeps that absence honest through serialization.
function canonicalDisposition(disposition: AttemptDisposition): Record<string, unknown> {
  switch (disposition.status) {
    case 'graded':
      return disposition.correct
        ? { status: disposition.status, correct: disposition.correct }
        : { status: disposition.status, correct: disposition.correct, errorClass: disposition.errorClass };
    case 'ungraded':
      return { status: disposition.status };
    case 'abandoned':
      return { status: disposition.status };
  }
}

function canonicalEngine(engine: AttemptEngineContext | null) {
  if (engine === null) return null;
  return {
    seed: engine.seed,
    playerCardIds: [...engine.playerCardIds],
    dealerUpcardId: engine.dealerUpcardId,
    legalActions: [...engine.legalActions],
    outcomes: engine.outcomes.map((outcome) => ({
      hand_index: outcome.hand_index,
      result: outcome.result,
      wager: outcome.wager,
      delta: outcome.delta,
    })),
    wager: engine.wager,
  };
}

function canonicalAttempt(attempt: ProgressAttempt) {
  return {
    attemptId: attempt.attemptId,
    committedAtRevision: attempt.committedAtRevision,
    learnerKey: attempt.learnerKey,
    sessionId: attempt.sessionId,
    presentationId: attempt.presentationId,
    attemptOrdinal: attempt.attemptOrdinal,
    evidence: {
      subjectId: attempt.evidence.subjectId,
      unitId: attempt.evidence.unitId,
      skillId: attempt.evidence.skillId,
      cellId: attempt.evidence.cellId,
    },
    kind: attempt.kind,
    mode: attempt.mode,
    interaction: attempt.interaction,
    difficultyBand: attempt.difficultyBand,
    assistance: attempt.assistance,
    tableVisibility: attempt.tableVisibility,
    presentation: attempt.presentation,
    response: attempt.response,
    disposition: canonicalDisposition(attempt.disposition),
    gradedBy: {
      authority: attempt.gradedBy.authority,
      profileId: attempt.gradedBy.profileId,
    },
    engine: canonicalEngine(attempt.engine),
    activity: {
      activityId: attempt.activity.activityId,
      activityVersion: attempt.activity.activityVersion,
      catalogVersion: attempt.activity.catalogVersion,
      seed: attempt.activity.seed,
      params: attempt.activity.params,
    },
    occurredAt: attempt.occurredAt,
    elapsedMs: attempt.elapsedMs,
  };
}

function canonicalRuleset(ruleset: Ruleset) {
  return {
    id: ruleset.id,
    decks: ruleset.decks,
    penetration_percent: ruleset.penetration_percent,
    dealer_soft_17: ruleset.dealer_soft_17,
    blackjack_payout: ruleset.blackjack_payout,
    max_split_hands: ruleset.max_split_hands,
    double_after_split: ruleset.double_after_split,
    resplit_aces: ruleset.resplit_aces,
    split_aces_receive_one_card: ruleset.split_aces_receive_one_card,
    insurance_auto_decline: ruleset.insurance_auto_decline,
  };
}

function canonicalSession(session: SessionRecord) {
  return {
    sessionId: session.sessionId,
    learnerKey: session.learnerKey,
    committedAtRevision: session.committedAtRevision,
    openedAt: session.openedAt,
    closedAt: session.closedAt,
    closeReason: session.closeReason,
    budget: {
      presetId: session.budget.presetId,
      targetDurationMs: session.budget.targetDurationMs,
      maxActivities: session.budget.maxActivities,
    },
    ruleset: canonicalRuleset(session.ruleset),
    profileId: session.profileId,
    reducerVersion: session.reducerVersion,
    curriculumVersion: session.curriculumVersion,
    summary: session.summary,
  };
}

function canonicalCachedMastery(cachedMastery: CachedMastery | null) {
  if (cachedMastery === null) return null;
  return {
    reducerVersion: cachedMastery.reducerVersion,
    computedAtRevision: cachedMastery.computedAtRevision,
    states: cachedMastery.states,
  };
}

/** Deterministic, declared-key-order JSON bytes for a `CanonicalSnapshot` (design §5.2). */
export function canonicalize(snapshot: CanonicalSnapshot): string {
  const out = {
    format: snapshot.format,
    formatVersion: snapshot.formatVersion,
    schemaVersion: snapshot.schemaVersion,
    namespace: snapshot.namespace,
    learnerKey: snapshot.learnerKey,
    revision: snapshot.revision,
    curriculumVersions: [...snapshot.curriculumVersions],
    attempts: [...snapshot.attempts].sort(compareAttempts).map(canonicalAttempt),
    sessions: [...snapshot.sessions].sort(compareSessions).map(canonicalSession),
    cachedMastery: canonicalCachedMastery(snapshot.cachedMastery),
  };

  return JSON.stringify(out);
}
