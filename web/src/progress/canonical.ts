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
// `cachedMastery.states`) are routed through `canonicalizeJsonValue` below. "Opaque" means this
// module does not INTERPRET the value — it never adds, drops, or reinterprets a key. Imposing a
// deterministic key order at export time is not interpretation: JSON objects are an unordered
// collection of name/value pairs (RFC 8259), so lexicographic key sorting changes no stored bytes
// and loses no information. Arrays inside these payloads ARE ordered by JSON semantics and are
// therefore never sorted, only recursed into.

import type {
  ProgressAttempt,
  SessionRecord,
  CachedMastery,
  AttemptDisposition,
  AttemptEngineContext,
  JsonValue,
} from './types';
import type { Ruleset } from '../bridge/types';

/**
 * Recursively re-emits a `JsonValue` with object keys in lexicographic order. Arrays keep their
 * original element order — arrays are ordered in JSON semantics; only object key order is an
 * unspecified implementation detail (insertion / structured-clone order) that this function
 * replaces with a declared one (design §5.2).
 */
function canonicalizeJsonValue(value: JsonValue): JsonValue {
  if (value === null || typeof value !== 'object') {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(canonicalizeJsonValue);
  }
  const out: { [key: string]: JsonValue } = {};
  for (const key of Object.keys(value).sort()) {
    out[key] = canonicalizeJsonValue(value[key] as JsonValue);
  }
  return out;
}

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

// Key-list exhaustiveness tripwire (review finding, task 2 fix pass 2). Every canonicalX
// function below returns a hand-enumerated object literal; without a return-type annotation tied
// to the SOURCE type, the literal is only checked against itself (inferred), so adding a field to
// `T` (e.g. §7's `planning?` group landing on `ProgressAttempt`) compiles cleanly and that field
// silently never reaches the canonical export — exactly the failure this type exists to catch.
//
// Deliberately `Record<keyof T, unknown>`, NOT the homomorphic `{ [K in keyof T]: unknown }`
// written directly over `T`. The homomorphic form preserves T's own optional/readonly modifiers,
// so a newly-added `field?: X` would stay optional in the mapped type too and the object literal
// could keep omitting it with no error — reproducing this exact bug for the one case (an
// *optional* field) the finding names. `Record<K, V>` is defined generically over `K`, which
// breaks that homomorphic link: every key of `T`, including future optional ones, becomes
// REQUIRED in the checked type. Verified directly (not just asserted): `Record<keyof {a:string;
// b?:number}, unknown>` rejects `{a: 'x'}` with TS2741 "Property 'b' is missing".
//
// This does not fight the phantom rule (design §7 — absent keys must stay absent, never emitted
// as null/undefined in the OUTPUT BYTES). `unknown` accepts `undefined` as a value, so a future
// branch can satisfy "the key is present in the object literal" by writing `planning: undefined`
// when there is nothing to canonicalize — and `JSON.stringify` drops undefined-valued keys from
// its output entirely (verified: `JSON.stringify({a:1,b:undefined})` → `'{"a":1}'`, no `b` key at
// all, not even `null`). So the TYPE requires the key to be written down; the BYTES stay exactly
// as absent as they are today. The tripwire forces a human decision at the source line, not a
// particular runtime shape.
type AllKeysOf<T> = Record<keyof T, unknown>;

// The same tripwire, applied to every nested inline-typed group on `ProgressAttempt`/`SessionRecord`
// (review finding T2-M1 — the pass-2 fix above only reached the two TOP-level functions;
// `evidence`/`gradedBy`/`activity` (on the attempt) and `budget` (on the session) were still plain
// object literals, so a field added to any of THOSE groups would silently miss the canonical export
// exactly like the bug this file already fixed once. `ProgressAttempt['evidence']` etc. reach into
// the source type rather than re-declaring the shape, so there is only one place these fields are
// ever spelled out.
function canonicalEvidence(evidence: ProgressAttempt['evidence']): AllKeysOf<ProgressAttempt['evidence']> {
  return {
    subjectId: evidence.subjectId,
    unitId: evidence.unitId,
    skillId: evidence.skillId,
    cellId: evidence.cellId,
  };
}

function canonicalGradedBy(gradedBy: ProgressAttempt['gradedBy']): AllKeysOf<ProgressAttempt['gradedBy']> {
  return {
    authority: gradedBy.authority,
    profileId: gradedBy.profileId,
  };
}

function canonicalActivity(activity: ProgressAttempt['activity']): AllKeysOf<ProgressAttempt['activity']> {
  return {
    activityId: activity.activityId,
    activityVersion: activity.activityVersion,
    catalogVersion: activity.catalogVersion,
    seed: activity.seed,
    params: canonicalizeJsonValue(activity.params),
  };
}

function canonicalBudget(budget: SessionRecord['budget']): AllKeysOf<SessionRecord['budget']> {
  return {
    presetId: budget.presetId,
    targetDurationMs: budget.targetDurationMs,
    maxActivities: budget.maxActivities,
  };
}

function canonicalEngine(engine: AttemptEngineContext | null): AllKeysOf<AttemptEngineContext> | null {
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

function canonicalAttempt(attempt: ProgressAttempt): AllKeysOf<ProgressAttempt> {
  return {
    attemptId: attempt.attemptId,
    committedAtRevision: attempt.committedAtRevision,
    learnerKey: attempt.learnerKey,
    sessionId: attempt.sessionId,
    presentationId: attempt.presentationId,
    attemptOrdinal: attempt.attemptOrdinal,
    evidence: canonicalEvidence(attempt.evidence),
    kind: attempt.kind,
    mode: attempt.mode,
    interaction: attempt.interaction,
    difficultyBand: attempt.difficultyBand,
    assistance: attempt.assistance,
    tableVisibility: attempt.tableVisibility,
    presentation: attempt.presentation,
    response: canonicalizeJsonValue(attempt.response),
    disposition: canonicalDisposition(attempt.disposition),
    gradedBy: canonicalGradedBy(attempt.gradedBy),
    engine: canonicalEngine(attempt.engine),
    activity: canonicalActivity(attempt.activity),
    occurredAt: attempt.occurredAt,
    elapsedMs: attempt.elapsedMs,
  };
}

function canonicalRuleset(ruleset: Ruleset): AllKeysOf<Ruleset> {
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

function canonicalSession(session: SessionRecord): AllKeysOf<SessionRecord> {
  return {
    sessionId: session.sessionId,
    learnerKey: session.learnerKey,
    committedAtRevision: session.committedAtRevision,
    openedAt: session.openedAt,
    closedAt: session.closedAt,
    closeReason: session.closeReason,
    budget: canonicalBudget(session.budget),
    ruleset: canonicalRuleset(session.ruleset),
    profileId: session.profileId,
    reducerVersion: session.reducerVersion,
    curriculumVersion: session.curriculumVersion,
    summary: canonicalizeJsonValue(session.summary),
  };
}

function canonicalCachedMastery(cachedMastery: CachedMastery | null): AllKeysOf<CachedMastery> | null {
  if (cachedMastery === null) return null;
  return {
    reducerVersion: cachedMastery.reducerVersion,
    computedAtRevision: cachedMastery.computedAtRevision,
    states: canonicalizeJsonValue(cachedMastery.states),
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
