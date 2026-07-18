// Durable learner record contracts — the provider-neutral ProgressStore's cycle-1 foundation.
//
// Transcribed EXACTLY from design §4.1 (the attempt), §4.2 (the session), §4.5 (the envelope):
// docs/superpowers/specs/2026-07-17-progressstore-cycle1-design.md
//
// The phantom rule (design §7): a `null` is allowed only when it is a real domain value, never
// as a placeholder for a producer that does not exist. `planning` (plan/checkpoint/evidence-goal
// identity) has no cycle-1 producer and is therefore an ABSENT optional group, not a nullable
// field — it must not appear as a key on a v1 record at all.
//
// Module boundary (design §3.1): this file imports web/src/bridge/types (engine facts are
// engine-owned) and imports NOTHING from web/src/learn/ (the durable attempt is a different type
// from learn/types.ts's in-memory AttemptRecord; coupling them would tie progress storage to
// lesson-authoring churn). `AttemptEngineContext` below mirrors learn/types.ts's shape of the
// same name BY VALUE (design :449) — it is not imported from '../learn/types'.

import type { Action, HandOutcome, Ruleset, StrategyProfileId } from '../bridge/types';

// --- JSON-safe value, for fields the store stores opaquely (design §4.1: response, activity.params;
// §4.2: session.summary; §4.5: cachedMastery.states).
export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

// --- Identity (design §6): an opaque, branded, pseudonymous local key. Never `deviceId`, never
// `anonymousId` — no storage format rides in the name.
export type LearnerKey = string & { readonly __learnerKey: unique symbol };

// === §4.1 — The attempt ====================================================================

export type AttemptKind = 'comprehension' | 'classification' | 'navigation' | 'action';
export type EvidenceMode = 'acquisition' | 'assessment' | 'diagnostic';
export type InteractionMode = 'multiple-choice' | 'assemble-blocks' | 'engine-hand';
export type TableVisibility = 'open' | 'hidden' | 'not-applicable';
export type PresentationSource = 'canonical' | 'ai' | 'cache' | 'fallback';
// Mirrors learn/types.ts:40 BY VALUE, not by import — the durable schema does not couple to it.
export type Assistance = 'none' | 'retry' | 'instruction';
export type ErrorClass =
  | 'hand-classification'
  | 'dealer-column'
  | 'illegal-action'
  | 'strategy-recall'
  | 'fallback-rule'
  | 'outcome-bias'; // mastery :102-104; "at least" → additive later

// A discriminated union, not `correct: boolean | null`: it must express *abandoned* (ALR-022)
// and must make `errorClass` unrepresentable on a correct answer (design §4.1).
export type AttemptDisposition =
  | { status: 'graded'; correct: true }
  | { status: 'graded'; correct: false; errorClass: ErrorClass | null } // null = wrong but unclassified
  | { status: 'ungraded' } // responded; no grading authority (e.g. free play action)
  | { status: 'abandoned' }; // presented; never responded — ALR-022 requires this fixture

// Engine facts, shape reused BY VALUE from the bridge (design :449). Kept structurally identical
// to learn/types.ts's AttemptEngineContext without importing it — the two are allowed to diverge
// independently because they serve different modules (§3.1).
export type AttemptEngineContext = {
  seed: string;
  playerCardIds: string[];
  dealerUpcardId: string | null;
  legalActions: Action[];
  outcomes: HandOutcome[];
  wager: number | null;
};

export type ProgressAttempt = {
  // --- identity & ordering
  attemptId: string; // opaque, CALLER-minted. Primary key AND idempotency key (§4.3).
  committedAtRevision: number; // STORE-assigned inside the transaction. The only field the store writes.

  // --- attribution
  learnerKey: LearnerKey;
  sessionId: string; // opaque episode label. NOT a foreign key into `sessions` (§4.2).
  presentationId: string; // groups retries of ONE presentation (ALR-004, ALR-011)
  attemptOrdinal: number; // 1 = first response on this presentation; >1 = retry

  // --- the evidence key: what mastery folds on
  evidence: {
    subjectId: string;
    unitId: string;
    skillId: string; // FK → Subject.skills[].id. Today's `outcomeId`, renamed (F1).
    cellId: string | null; // concept cell, opaque. null = this skill has no cell decomposition (§2.2).
  };

  // --- what was measured
  kind: AttemptKind;
  mode: EvidenceMode; // diagnostic is STORED but excluded from mastery — by the reducer, not the store
  interaction: InteractionMode;
  difficultyBand: string | null; // catalog-declared band; reducer input (design :406-408)

  // --- conditions the evidence was produced under
  assistance: Assistance;
  tableVisibility: TableVisibility;
  presentation: PresentationSource; // design :272 — how the wording was produced, WITHOUT the wording

  // --- response & verdict
  response: JsonValue; // structured. The ACTIVITY owns its schema (ALR-008); the store stores it opaquely.
  disposition: AttemptDisposition;

  // --- grading authority (design :270)
  gradedBy: {
    authority: 'engine' | 'oracle' | 'catalog' | 'none';
    profileId: StrategyProfileId | null; // §4.4
  };
  engine: AttemptEngineContext | null; // engine facts, shape reused BY VALUE from the bridge

  // --- replay identity (ALR-020, ALR-021, ALR-014)
  activity: {
    activityId: string;
    activityVersion: string;
    catalogVersion: string;
    seed: string | null;
    params: JsonValue;
  };

  // --- timing (ALR-022)
  occurredAt: string; // ISO-8601 UTC. Recency/spacing input. Wall clock, caller-supplied.
  elapsedMs: number | null; // presentation→response DURATION. Not a timestamp; clock-jump immune.

  // planning?: { planId; checkpointId; evidenceGoalId } — ABSENT in v1 (§7). Additive, zero migration.
};

// === §4.2 — The session =====================================================================

export type SessionRecord = {
  sessionId: string;
  learnerKey: LearnerKey;
  committedAtRevision: number;
  openedAt: string;
  closedAt: string;
  closeReason: 'evidence-target-met' | 'time-bound' | 'activity-bound' | 'learner-stopped'; // ALR-028, design :288-296
  budget: { presetId: string; targetDurationMs: number; maxActivities: number }; // ALR-027
  ruleset: Ruleset; // FULL object, once per session — the sink.ts:3-13 precedent, scoped correctly
  profileId: StrategyProfileId | null;
  reducerVersion: string | null; // what was live during the episode
  curriculumVersion: string;
  summary: JsonValue | null; // derived report; non-authoritative, recomputable
};

// === §4.5 — The envelope =====================================================================

export type CachedMastery = {
  reducerVersion: string; // PINNED: idb decision row — the cache is allowed only if tagged
  computedAtRevision: number; // staleness checkable WITHOUT recomputing
  states: JsonValue;
};

export type LearnerEnvelope = {
  schemaVersion: number;
  learnerKey: LearnerKey;
  revision: number;
  curriculumVersions: string[]; // every catalog version encountered
  attempts: ProgressAttempt[]; // ordered by committedAtRevision, then attemptId
  sessions: SessionRecord[];
  cachedMastery: CachedMastery | null; // disposable; the ONLY licensed lossy operation (§8.1)
};

// === §3.3 — Typed recoverable errors — returned, not thrown ================================

export type SafeAction =
  | 'export-raw' // AL-R2 :226-230
  | 'reset-with-confirmation' // AL-R2 :226-230
  | 'upgrade-app' // AL-R2 :226-230
  | 'retry'
  | 'reload';

type StoreErrorBase = {
  namespace: string;
  detectedSchema: number | null | 'unreadable';
  safeActions: SafeAction[];
};

export type RecoveryRequiredError = StoreErrorBase & { code: 'RECOVERY_REQUIRED'; invalid: InvalidRecordRef[] };
export type NewerSchemaError = StoreErrorBase & { code: 'NEWER_SCHEMA'; detectedSchema: number; expectedSchema: number };
// --- below: originated by this design (§8). Nobody owned storage failure; ALR-023's fallback is AI/network-scoped.
export type StorageUnavailableError = StoreErrorBase & { code: 'STORAGE_UNAVAILABLE'; reason: 'denied' | 'absent' | 'private-mode' | 'unknown' };
export type QuotaExceededError = StoreErrorBase & { code: 'QUOTA_EXCEEDED' };
export type ConnectionSupersededError = StoreErrorBase & { code: 'CONNECTION_SUPERSEDED' }; // another tab is upgrading

export type InvalidRecordRef = { store: string; key: unknown; reason: string };
