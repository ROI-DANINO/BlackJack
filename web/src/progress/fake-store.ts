// The in-memory `ProgressStore` — a TEST SUBJECT, never a product fallback.
//
// Design: docs/superpowers/specs/2026-07-17-progressstore-cycle1-design.md
//
// WHAT THIS IS FOR. `contract.ts` holds the 14 gates as host-neutral data so the same suite can run
// against two subjects. This is the first: a store with no IndexedDB, so the gates can run under
// Vitest's `node` environment (web/vite.config.ts) where IndexedDB does not exist. Its job is to
// prove the suite is PROVIDER-NEUTRAL — that the gates assert the port's contract and not one
// adapter's quirks. It scores 12/14, which is the point: §8.3 records the in-memory baseline as
// failing "exactly the two gates (reload, concurrent tabs) a degraded mode openly does not offer",
// and AL-R2 :162 recorded in-memory at 12/14. That record is reproduced here, not faked green.
//
// WHAT THIS IS NOT. §8.3 is explicit: "The product must run — but it must never silently swap to
// memory. A silent in-memory fallback *is* the UI claiming a save it does not have." AL-R2 :295
// rejected in-memory for durable progress — "it is a baseline, not an adapter". Nothing outside
// progress/contract.test.ts may import this file. The product's degraded mode lands with the UI
// consumer (§13.5) and is a different thing: a store that TELLS the learner it is not saving.
//
// Module boundary (design §3.1): imports only './types', './store', './canonical', './contract'
// (types only) — never 'idb' (reserved for progress/idb-store.ts), never '../learn/'. Enforced by
// progress/boundary.test.ts (AST-based), not by convention.
//
// HONESTY, AND WHERE IT COMES FROM. Three properties make the 12/2 an honest result rather than a
// convenient one:
//   - `capabilities: {durable:false, multiConnection:false}` — declared, and gates 2 and 7 do not
//     take the declaration on trust. Both call contract.ts's `assertDeclaredNonDurable`, which
//     seeds an attempt, PROVES it readable on the live connection, then requires it to be gone
//     after `reopen()`. A fake that quietly kept the data would FAIL those gates, not skip them.
//   - `reopen()` therefore drops the namespace's data (see `reopen` below). That is not the fake
//     being weakened to fit — it is what an in-memory store's reload genuinely is, and it is what
//     `ContractSubject`'s own doc requires: "for a non-durable subject the data is gone, which is
//     exactly the observable that makes gates 2 and 7's non-capability branches real assertions".
//   - `close()` is resource disposal, never data disposal (§3.2). Data survives it here for the
//     same reason it survives it in the adapter. Only `reopen()` and `destroy()` remove anything.
//
// PHYSICAL LAYOUT. §5.1's three stores — `meta` (singleton id='envelope'), `attempts`, `sessions` —
// are modelled literally, as arrays of uninterpreted records, because the gates read them literally:
// `diagnose().recordCounts` is per-store, and raw export (§3.6) dumps them uninterpreted. An
// attempt record is EXACTLY `{...draft, committedAtRevision}` with no adapter bookkeeping around it
// — gates 13 and 14 assert a raw record is deep-equal to the attempt that was written, so a wrapper
// field would fail them.

import type {
  CachedMastery,
  InvalidRecordRef,
  LearnerEnvelope,
  LearnerKey,
  NewerSchemaError,
  ProgressAttempt,
  RecoveryRequiredError,
  SafeAction,
  SessionRecord,
  StorageUnavailableError,
} from './types';
import type {
  AppendOutcome,
  CommitOutcome,
  Diagnosis,
  ExportOutcome,
  ExportRequest,
  LoadOutcome,
  OpenOutcome,
  OpenProgressStore,
  ProgressAttemptDraft,
  ProgressStore,
  ProgressStoreConfig,
  RawExport,
  ResetConfirmation,
  ResetOutcome,
  SessionSummaryWrite,
} from './store';
import { canonicalize } from './canonical';
import type { CanonicalSnapshot } from './canonical';
import type { ContractSubject, MigrationMap, MigrationStoreName } from './contract';

// === The realm ================================================================================

/** One physical record, held exactly as written — uninterpreted, like a structured clone. */
type PhysicalRecord = { [key: string]: unknown };

/**
 * One namespace's physical contents: §5.1's three stores plus the version marker.
 *
 * `physicalVersion` is this fake's `db.version` — the schema marker the DATABASE tracks, which is
 * deliberately separate from the `schemaVersion` field inside the `meta` record. The two are equal
 * in every normal state and are kept equal by `openConnection`'s upgrade. They come apart in
 * exactly one place: `setPhysicalSchema` (gate 14) moves the marker and nothing else, which is what
 * a store written by a NEWER build looks like to this build. `physicalVersion` is the detection
 * surface everywhere (`diagnose().detectedSchema`, `RawExport.physicalVersion`, the newer-schema
 * check), because that is what IndexedDB itself would report before any record is readable.
 */
type NamespaceState = {
  physicalVersion: number;
  meta: PhysicalRecord;
  attempts: PhysicalRecord[];
  sessions: PhysicalRecord[];
};

/** One-shot injected faults, per namespace (contract.ts's SYNTHETIC controls). */
type Faults = { abortWrite: boolean; abortUpgrade: boolean };

/**
 * THE realm — one module-level map, deliberately. There is no second realm for `reopen()` to reach,
 * which is the structural reason this subject cannot fake durability: a reload has nowhere to read
 * the data back from. The real adapter's equivalent is the browser's IndexedDB, which does survive
 * a reload — that difference IS the 12-vs-14.
 */
const REALM = new Map<string, NamespaceState>();
const FAULTS = new Map<string, Faults>();

const META_SINGLETON_ID = 'envelope';
const PHYSICAL_STORES: MigrationStoreName[] = ['meta', 'attempts', 'sessions'];

function faultsFor(namespace: string): Faults {
  const existing = FAULTS.get(namespace);
  if (existing !== undefined) return existing;
  const created: Faults = { abortWrite: false, abortUpgrade: false };
  FAULTS.set(namespace, created);
  return created;
}

/** One-shot by construction: reading a fault clears it, so the next write/upgrade proceeds. */
function consumeFault(namespace: string, kind: keyof Faults): boolean {
  const faults = FAULTS.get(namespace);
  if (faults === undefined || !faults[kind]) return false;
  faults[kind] = false;
  return true;
}

// === Errors (§3.3 — returned, never thrown) ====================================================

const RECOVERY_SAFE_ACTIONS: SafeAction[] = ['export-raw', 'reset-with-confirmation'];
const NEWER_SCHEMA_SAFE_ACTIONS: SafeAction[] = ['export-raw', 'upgrade-app'];

function storageUnavailable(
  namespace: string,
  detectedSchema: number | null,
  reason: StorageUnavailableError['reason'],
  safeActions: SafeAction[] = ['retry'],
): StorageUnavailableError {
  return { code: 'STORAGE_UNAVAILABLE', namespace, detectedSchema, safeActions, reason };
}

function recoveryRequired(namespace: string, detectedSchema: number, invalid: InvalidRecordRef[]): RecoveryRequiredError {
  return { code: 'RECOVERY_REQUIRED', namespace, detectedSchema, safeActions: [...RECOVERY_SAFE_ACTIONS], invalid };
}

function newerSchema(namespace: string, detectedSchema: number, expectedSchema: number): NewerSchemaError {
  return {
    code: 'NEWER_SCHEMA',
    namespace,
    detectedSchema,
    expectedSchema,
    safeActions: [...NEWER_SCHEMA_SAFE_ACTIONS],
  };
}

// === Validation ================================================================================
//
// This is the reader that makes §8.4's "fail closed" real: one malformed record fails the WHOLE
// load, itemised. It is used by `load()` and by `diagnose().integrity` — and deliberately NOT by
// raw export, which "must never validate" (§3.6).
//
// It checks SHAPE, not enum membership. A field-by-field enum check would be a second, drifting
// copy of types.ts; the property the gates exercise is that a structurally broken record is caught,
// named, and not silently skipped. It also tolerates UNKNOWN keys, which is required: after gate
// 11's additive v1→v2 migration every attempt record carries a field this build has never heard of,
// and §8.1's additive-only migration means a newer-but-additive record is readable, not corrupt.

function isRecord(value: unknown): value is PhysicalRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
const isString = (value: unknown): boolean => typeof value === 'string';
const isNumber = (value: unknown): boolean => typeof value === 'number' && Number.isFinite(value);
const isNullableString = (value: unknown): boolean => value === null || typeof value === 'string';
const isNullableNumber = (value: unknown): boolean => value === null || isNumber(value);
const isNullOrRecord = (value: unknown): boolean => value === null || isRecord(value);
const isAnything = (): boolean => true; // a JsonValue field the store holds OPAQUELY (§4.1)

type FieldCheck = [key: string, check: (value: unknown) => boolean, expectation: string];

function describeValue(value: unknown): string {
  return value === undefined ? 'undefined' : JSON.stringify(value) ?? String(value);
}

function checkFields(record: PhysicalRecord, checks: FieldCheck[], path: string): string | null {
  for (const [key, check, expectation] of checks) {
    if (!(key in record)) return `${path}${key} is missing; expected ${expectation}`;
    if (!check(record[key])) return `${path}${key} is ${describeValue(record[key])}; expected ${expectation}`;
  }
  return null;
}

function checkNested(record: PhysicalRecord, key: string, checks: FieldCheck[]): string | null {
  const nested = record[key];
  if (!isRecord(nested)) return `${key} is ${describeValue(nested)}; expected an object`;
  return checkFields(nested, checks, `${key}.`);
}

/** Returns WHY the record is invalid (§8.4: itemises which records failed AND why), or null. */
function validateAttempt(record: PhysicalRecord): string | null {
  const top = checkFields(
    record,
    [
      ['attemptId', isString, 'a string'],
      ['committedAtRevision', isNumber, 'a number'],
      ['learnerKey', isString, 'a string'],
      ['sessionId', isString, 'a string'],
      ['presentationId', isString, 'a string'],
      ['attemptOrdinal', isNumber, 'a number'],
      ['kind', isString, 'a string'],
      ['mode', isString, 'a string'],
      ['interaction', isString, 'a string'],
      ['difficultyBand', isNullableString, 'a string or null'],
      ['assistance', isString, 'a string'],
      ['tableVisibility', isString, 'a string'],
      ['presentation', isString, 'a string'],
      ['response', isAnything, 'any JSON value'],
      ['engine', isNullOrRecord, 'null or an object'],
      ['occurredAt', isString, 'a string'],
      ['elapsedMs', isNullableNumber, 'a number or null'],
    ],
    '',
  );
  if (top !== null) return top;

  return (
    checkNested(record, 'evidence', [
      ['subjectId', isString, 'a string'],
      ['unitId', isString, 'a string'],
      ['skillId', isString, 'a string'],
      ['cellId', isNullableString, 'a string or null'],
    ]) ??
    checkNested(record, 'disposition', [['status', isString, 'a string']]) ??
    checkNested(record, 'gradedBy', [
      ['authority', isString, 'a string'],
      ['profileId', isNullableString, 'a string or null'],
    ]) ??
    checkNested(record, 'activity', [
      ['activityId', isString, 'a string'],
      ['activityVersion', isString, 'a string'],
      ['catalogVersion', isString, 'a string'],
      ['seed', isNullableString, 'a string or null'],
      ['params', isAnything, 'any JSON value'],
    ])
  );
}

function validateSession(record: PhysicalRecord): string | null {
  const top = checkFields(
    record,
    [
      ['sessionId', isString, 'a string'],
      ['learnerKey', isString, 'a string'],
      ['committedAtRevision', isNumber, 'a number'],
      ['openedAt', isString, 'a string'],
      ['closedAt', isString, 'a string'],
      ['closeReason', isString, 'a string'],
      ['ruleset', isRecord, 'an object'],
      ['profileId', isNullableString, 'a string or null'],
      ['reducerVersion', isNullableString, 'a string or null'],
      ['curriculumVersion', isString, 'a string'],
      ['summary', isAnything, 'any JSON value or null'],
    ],
    '',
  );
  if (top !== null) return top;
  return checkNested(record, 'budget', [
    ['presetId', isString, 'a string'],
    ['targetDurationMs', isNumber, 'a number'],
    ['maxActivities', isNumber, 'a number'],
  ]);
}

function validateMeta(record: PhysicalRecord): string | null {
  const isStringArray = (value: unknown): boolean => Array.isArray(value) && value.every(isString);
  return checkFields(
    record,
    [
      ['id', isString, 'a string'],
      ['schemaVersion', isNumber, 'a number'],
      ['learnerKey', isString, 'a string'],
      ['revision', isNumber, 'a number'],
      ['curriculumVersions', isStringArray, 'an array of strings'],
      ['cachedMastery', isNullOrRecord, 'null or an object'],
    ],
    '',
  );
}

/** Every invalid record in the namespace, itemised by store + key + reason (§3.3, §8.4). */
function validateAll(state: NamespaceState): InvalidRecordRef[] {
  const invalid: InvalidRecordRef[] = [];
  const metaReason = validateMeta(state.meta);
  if (metaReason !== null) invalid.push({ store: 'meta', key: state.meta['id'] ?? META_SINGLETON_ID, reason: metaReason });
  state.attempts.forEach((record, index) => {
    const reason = validateAttempt(record);
    if (reason !== null) invalid.push({ store: 'attempts', key: record['attemptId'] ?? `<attempts[${index}]>`, reason });
  });
  state.sessions.forEach((record, index) => {
    const reason = validateSession(record);
    if (reason !== null) invalid.push({ store: 'sessions', key: record['sessionId'] ?? `<sessions[${index}]>`, reason });
  });
  return invalid;
}

// === Reading the envelope ======================================================================

function compareAttempts(a: ProgressAttempt, b: ProgressAttempt): number {
  if (a.committedAtRevision !== b.committedAtRevision) return a.committedAtRevision - b.committedAtRevision;
  return a.attemptId < b.attemptId ? -1 : a.attemptId > b.attemptId ? 1 : 0;
}

function compareSessions(a: SessionRecord, b: SessionRecord): number {
  if (a.committedAtRevision !== b.committedAtRevision) return a.committedAtRevision - b.committedAtRevision;
  return a.sessionId < b.sessionId ? -1 : a.sessionId > b.sessionId ? 1 : 0;
}

/**
 * Only ever called after `validateAll` returned no invalid refs, which is what earns the casts:
 * every field read below has been shape-checked. `attempts`/`sessions` are ordered by
 * (committedAtRevision, attemptId|sessionId) per types.ts:151.
 *
 * The clone is not decoration — without it the caller would hold a reference INTO the realm and
 * could mutate stored records by mutating a loaded envelope, which no real adapter would permit
 * (IndexedDB hands back a structured clone).
 */
function readEnvelope(state: NamespaceState): LearnerEnvelope {
  const meta = state.meta;
  return {
    schemaVersion: state.physicalVersion,
    learnerKey: meta['learnerKey'] as LearnerKey,
    revision: meta['revision'] as number,
    curriculumVersions: structuredClone(meta['curriculumVersions']) as string[],
    attempts: (structuredClone(state.attempts) as unknown as ProgressAttempt[]).sort(compareAttempts),
    sessions: (structuredClone(state.sessions) as unknown as SessionRecord[]).sort(compareSessions),
    cachedMastery: structuredClone(meta['cachedMastery'] ?? null) as CachedMastery | null,
  };
}

function snapshotOf(namespace: string, envelope: LearnerEnvelope): CanonicalSnapshot {
  return {
    format: 'blackjack.progress.snapshot',
    formatVersion: 1,
    schemaVersion: envelope.schemaVersion,
    namespace,
    learnerKey: envelope.learnerKey,
    revision: envelope.revision,
    curriculumVersions: envelope.curriculumVersions,
    attempts: envelope.attempts,
    sessions: envelope.sessions,
    cachedMastery: envelope.cachedMastery,
  };
}

// === Writing ===================================================================================

/**
 * §6: "load() on an empty namespace mints NOTHING. The key is minted by the first appendAttempt,
 * inside that same transaction." That is why this is called from inside a write, on a candidate
 * state that is only published at the commit point — an aborted first write mints nothing at all.
 */
function mintNamespace(config: ProgressStoreConfig): NamespaceState {
  return {
    physicalVersion: config.schemaVersion,
    meta: {
      id: META_SINGLETON_ID,
      schemaVersion: config.schemaVersion,
      learnerKey: config.mintLearnerKey(),
      revision: 0,
      curriculumVersions: [],
      cachedMastery: null,
    },
    attempts: [],
    sessions: [],
  };
}

/** `curriculumVersions[]`: "every catalog version encountered" (types.ts §4.5). */
function noteCurriculumVersion(state: NamespaceState, version: string): void {
  const versions = state.meta['curriculumVersions'];
  if (Array.isArray(versions) && !versions.includes(version)) versions.push(version);
}

/**
 * The candidate state a write builds before committing. Every write here is prepared on a private
 * copy and published to the realm in ONE assignment — that assignment IS the transaction commit.
 * An abort (`abortNextWrite`) simply drops the copy, which is why gate 4 finds meta.revision AND
 * the attempts collection AND the physical record count all unchanged: there is no window in which
 * a half-written state was ever in the realm.
 */
function candidateFor(config: ProgressStoreConfig, current: NamespaceState | undefined): NamespaceState {
  return current === undefined ? mintNamespace(config) : structuredClone(current);
}

// === The store =================================================================================

type MigrationReport = { from: number; to: number };

function createStore(config: ProgressStoreConfig, migrated: MigrationReport | null): ProgressStore {
  const ns = config.namespace;

  const loadNow = (): LoadOutcome => {
    const state = REALM.get(ns);
    if (state === undefined) return { status: 'empty' };
    // The physical marker is the only thing readable before the records are (§3.6's rationale):
    // a store written by a newer build is not corrupt, merely unreadable here (§8.4).
    if (state.physicalVersion > config.schemaVersion) {
      return { status: 'newer-schema', error: newerSchema(ns, state.physicalVersion, config.schemaVersion) };
    }
    const invalid = validateAll(state);
    if (invalid.length > 0) {
      // Fail closed (§8.4): one bad record fails the WHOLE load. Skipping it would make mastery
      // non-reproducible AND hide data loss.
      return { status: 'recovery-required', error: recoveryRequired(ns, state.physicalVersion, invalid) };
    }
    return { status: 'loaded', envelope: readEnvelope(state), migrated };
  };

  /**
   * A write into a namespace this build cannot read is refused. The design does not pin an outcome
   * for this (no gate reaches it: gates 13 and 14 never write after the fault), but the alternative
   * — appending evidence into a store whose schema this build has never heard of — would be a write
   * the store could not later export or reason about. `rejected` is the only outcome shape
   * `AppendOutcome`/`CommitOutcome` offer for it.
   */
  const refuseIfNewer = (current: NamespaceState | undefined): StorageUnavailableError | null =>
    current !== undefined && current.physicalVersion > config.schemaVersion
      ? storageUnavailable(ns, current.physicalVersion, 'unknown', ['export-raw', 'upgrade-app'])
      : null;

  return {
    async load(): Promise<LoadOutcome> {
      return loadNow();
    },

    async appendAttempt(draft: ProgressAttemptDraft): Promise<AppendOutcome> {
      const current = REALM.get(ns);
      const refusal = refuseIfNewer(current);
      if (refusal !== null) return { status: 'rejected', error: refusal };

      const next = candidateFor(config, current);
      // §5.1: the record's own primary key IS its idempotency key. The adapter uses add(), not
      // put() — so a duplicate key writes NOTHING, and the original evidence is what survives.
      const existing = next.attempts.find((record) => record['attemptId'] === draft.attemptId);
      if (existing !== undefined) return { status: 'duplicate', revision: existing['committedAtRevision'] as number };

      // §8.4: read meta.revision, +1, write meta + attempt in ONE readwrite tx. §6: the store
      // assigns exactly one field, `committedAtRevision`.
      const revision = (next.meta['revision'] as number) + 1;
      next.meta['revision'] = revision;
      next.attempts.push(structuredClone({ ...draft, committedAtRevision: revision }) as unknown as PhysicalRecord);
      noteCurriculumVersion(next, draft.activity.catalogVersion);

      if (consumeFault(ns, 'abortWrite')) {
        return { status: 'rejected', error: storageUnavailable(ns, current?.physicalVersion ?? null, 'unknown') };
      }
      REALM.set(ns, next);
      return { status: 'committed', revision };
    },

    async commitSessionSummary(write: SessionSummaryWrite): Promise<CommitOutcome> {
      const current = REALM.get(ns);
      const refusal = refuseIfNewer(current);
      if (refusal !== null) return { status: 'rejected', error: refusal };

      const next = candidateFor(config, current);
      const existing = next.sessions.find((record) => record['sessionId'] === write.session.sessionId);
      if (existing !== undefined) return { status: 'duplicate', revision: existing['committedAtRevision'] as number };

      // §2.4/§8.4: the revision check belongs HERE and only here — a summary (and any cachedMastery
      // it publishes) is derived from ALL attempts, so one computed at revision 5 is genuinely
      // stale once another tab appended at 6. That is where a lost update loses information.
      const currentRevision = next.meta['revision'] as number;
      if (write.expectedRevision !== currentRevision) return { status: 'conflict', currentRevision };

      const revision = currentRevision + 1;
      next.meta['revision'] = revision;
      next.sessions.push(structuredClone({ ...write.session, committedAtRevision: revision }) as unknown as PhysicalRecord);
      // `cachedMastery: null` is "no derived publish on this write" (§3.4), not "clear the cache" —
      // the cache is disposable, but discarding it is a decision, not a side effect of a summary.
      if (write.cachedMastery !== null) next.meta['cachedMastery'] = structuredClone(write.cachedMastery);
      noteCurriculumVersion(next, write.session.curriculumVersion);

      if (consumeFault(ns, 'abortWrite')) {
        return { status: 'rejected', error: storageUnavailable(ns, current?.physicalVersion ?? null, 'unknown') };
      }
      REALM.set(ns, next);
      return { status: 'committed', revision };
    },

    async exportSnapshot(request: ExportRequest): Promise<ExportOutcome> {
      if (request.mode === 'raw') {
        // §3.6: "Raw export must never validate." No load, no schema, no interpretation — every
        // store, every record, exactly as found, corrupt ones included. This is the surface that
        // makes failing closed survivable.
        const state = REALM.get(ns);
        const raw: RawExport =
          state === undefined
            ? { format: 'blackjack.progress.raw', formatVersion: 1, namespace: ns, physicalVersion: null, stores: {}, errors: [] }
            : {
                format: 'blackjack.progress.raw',
                formatVersion: 1,
                namespace: ns,
                physicalVersion: state.physicalVersion,
                stores: {
                  meta: [structuredClone(state.meta)],
                  attempts: structuredClone(state.attempts),
                  sessions: structuredClone(state.sessions),
                },
                errors: [],
              };
        return { status: 'exported', mode: 'raw', json: JSON.stringify(raw) };
      }

      const outcome = loadNow();
      switch (outcome.status) {
        case 'loaded':
          // §5.2: byte-identity is a property of THIS serializer. The store does not stringify its
          // own object — it hands the loaded envelope to canonical.ts and returns those bytes.
          return { status: 'exported', mode: 'canonical', json: canonicalize(snapshotOf(ns, outcome.envelope)) };
        case 'recovery-required':
        case 'newer-schema':
          // §4.6: you cannot canonicalise a store whose records you cannot read. §3.4 names the
          // retry: mode:'raw'.
          return { status: 'not-canonical-exportable', error: outcome.error };
        case 'unavailable':
          return { status: 'unavailable', error: outcome.error };
        case 'empty':
          // UNSPECIFIED BY THE DESIGN, and reached by no gate: `ExportOutcome` has no 'empty'
          // branch, and there is no envelope to canonicalise. Reporting the namespace as absent is
          // the only answer that does not require MINTING a learnerKey to fill an export — which
          // §6 forbids on a read ("load() on an empty namespace mints NOTHING"). Flagged for Task 7:
          // the adapter must make the same call, and it should be pinned rather than inferred.
          return { status: 'unavailable', error: storageUnavailable(ns, null, 'absent') };
      }
    },

    async reset(confirmation: ResetConfirmation): Promise<ResetOutcome> {
      const state = REALM.get(ns);
      if (state === undefined) return { status: 'reset' }; // nothing to destroy; idempotent
      if (confirmation.expectedRevision !== 'unloadable') {
        // §3.4: expectedRevision proves the caller LOOKED first, and stops a reset silently
        // destroying a concurrent tab's writes it never saw.
        const currentRevision = state.meta['revision'];
        if (isNumber(currentRevision) && currentRevision !== confirmation.expectedRevision) {
          return { status: 'conflict', currentRevision: currentRevision as number };
        }
        // A meta whose revision is unreadable cannot be revision-checked at all; that is what
        // `expectedRevision: 'unloadable'` exists for, and the caller reaching here with a number
        // has looked at something this store cannot corroborate. Ungated.
      }
      REALM.delete(ns);
      return { status: 'reset' };
    },

    async diagnose(): Promise<Diagnosis> {
      const state = REALM.get(ns);
      if (state === undefined) {
        // §3.5: detectedSchema null = namespace absent. Nothing physical exists, so there is no
        // store to report a count for — and nothing to migrate or repair.
        return {
          namespace: ns,
          expectedSchema: config.schemaVersion,
          detectedSchema: null,
          physicalStores: [],
          recordCounts: {},
          migration: { kind: 'none' },
          integrity: { invalid: [] },
          safeActions: [],
        };
      }
      const invalid = validateAll(state);
      const migration: Diagnosis['migration'] =
        state.physicalVersion > config.schemaVersion
          ? { kind: 'unsupported', reason: 'newer-than-app' }
          : state.physicalVersion < config.schemaVersion
            ? { kind: 'additive-available', from: state.physicalVersion, to: config.schemaVersion }
            : { kind: 'none' };
      const safeActions: SafeAction[] =
        state.physicalVersion > config.schemaVersion
          ? [...NEWER_SCHEMA_SAFE_ACTIONS]
          : invalid.length > 0
            ? [...RECOVERY_SAFE_ACTIONS]
            : [];
      return {
        namespace: ns,
        expectedSchema: config.schemaVersion,
        detectedSchema: state.physicalVersion,
        physicalStores: [...PHYSICAL_STORES],
        recordCounts: { meta: 1, attempts: state.attempts.length, sessions: state.sessions.length },
        migration,
        integrity: { invalid },
        safeActions,
      };
    },

    async close(): Promise<void> {
      // §3.2: resource disposal, not a semantic operation, and idempotent. An in-memory store holds
      // no connection, file handle, or lock — so there is genuinely nothing to release, and the
      // data must survive (only reopen() and destroy() remove anything). This being a no-op is the
      // honest in-memory answer, not a shortcut: a close() that dropped data would make gates 2 and
      // 7 report 'declared-unsupported' for a reason that has nothing to do with durability.
    },
  };
}

// === Opening, and the versionchange transaction ================================================

/**
 * `open()` never creates anything (§6: "opening the app creates no identifier at all"). The one
 * thing it can do is run the `versionchange` transaction — which is where an additive migration
 * lives (§8.1 point 2: cursor-transform inside the versionchange transaction), reported afterwards
 * by `load()` (§3.5: "always reported ... the caller cannot fail to learn that its data moved").
 */
function openConnection(config: ProgressStoreConfig, migrations: MigrationMap | null): OpenOutcome {
  const ns = config.namespace;
  const state = REALM.get(ns);

  if (state === undefined || state.physicalVersion >= config.schemaVersion) {
    // No version change: nothing to upgrade, or the store is at/above this build's schema. (A store
    // ABOVE it opens fine and fails at load() — §3.2's OpenOutcome has no 'newer-schema' branch, and
    // a store that refused to open would strand the export-raw path §3.6 mandates.)
    return { status: 'open', store: createStore(config, null) };
  }

  const from = state.physicalVersion;
  const upgraded = structuredClone(state);
  for (const step of [...(migrations?.steps ?? [])].sort((a, b) => a.from - b.from)) {
    if (step.from < from || step.to > config.schemaVersion) continue;
    replaceRecords(upgraded, step.store, step.transform);
  }
  upgraded.physicalVersion = config.schemaVersion;
  upgraded.meta['schemaVersion'] = config.schemaVersion;

  // THE COMMIT POINT of the versionchange transaction. The cursor transform and the version bump
  // are one transaction (§8.1): an abort must undo BOTH, and it does here by construction — the
  // whole upgrade was built on a copy that is now simply dropped. The realm still holds the
  // pre-upgrade state, physically at `from`, with no partial transform in it (gate 12).
  if (consumeFault(ns, 'abortUpgrade')) {
    return { status: 'unavailable', error: storageUnavailable(ns, from, 'unknown') };
  }
  REALM.set(ns, upgraded);
  return { status: 'open', store: createStore(config, { from, to: config.schemaVersion }) };
}

function replaceRecords(state: NamespaceState, store: MigrationStoreName, transform: (record: PhysicalRecord) => PhysicalRecord): void {
  switch (store) {
    case 'meta':
      state.meta = transform(state.meta);
      return;
    case 'attempts':
      state.attempts = state.attempts.map(transform);
      return;
    case 'sessions':
      state.sessions = state.sessions.map(transform);
      return;
  }
}

/** The `OpenProgressStore` factory (store.ts) for the in-memory subject. */
export const openFakeProgressStore: OpenProgressStore = async (config) => openConnection(config, null);

// === The contract subject ======================================================================

const FAKE_SCHEMA_VERSION = 1;

/**
 * Deterministic — literals only, no `crypto.randomUUID`, no clock (progress/fixtures.ts's rule).
 * §6 requires `mintLearnerKey` to be injected, synchronous, and format-agnostic; a fixed opaque
 * string satisfies all three and keeps canonical bytes reproducible across runs.
 */
const mintFakeLearnerKey = (): LearnerKey => 'fake-learner-0001' as LearnerKey;

const configFor = (namespace: string, schemaVersion: number): ProgressStoreConfig => ({
  namespace,
  schemaVersion,
  mintLearnerKey: mintFakeLearnerKey,
});

/** What a corrupt record looks like: a string where a structured field belongs. */
const CORRUPT_MARKER = 'contract-suite-corrupted';

function requireState(namespace: string, control: string): NamespaceState {
  const state = REALM.get(namespace);
  if (state === undefined) {
    // A throw, not a returned error: this is the SUBJECT's control surface misused by a host, i.e.
    // a bug in the runner — not a recoverable storage condition (§3.3).
    throw new Error(`fake subject: ${control}('${namespace}') on a namespace that does not exist.`);
  }
  return state;
}

/**
 * The in-memory subject for contract.ts's 14 gates. Expected: 12 pass + 2 declared-unsupported
 * (gates 2 and 7), reproducing AL-R2 :162's in-memory row.
 */
export function createFakeSubject(): ContractSubject {
  return {
    name: 'in-memory fake (progress/fake-store.ts)',
    // Declared, and PROVEN by gates 2 and 7 rather than trusted (§11). Both flags are false and
    // travel together: §8.3 records the in-memory baseline as failing exactly reload + concurrent
    // tabs. Neither is a knob to turn — see the header.
    capabilities: { durable: false, multiConnection: false },

    open: async (namespace) => openConnection(configFor(namespace, FAKE_SCHEMA_VERSION), null),

    reopen: async (namespace) => {
      // A RELOAD, not a second connection. For an in-memory store a reload is the end of the realm
      // that held the data: the process is gone and there is nowhere to read it back from. Dropping
      // the namespace is therefore this subject's TRUTH, not a concession to make gates 2 and 7
      // report 'declared-unsupported' — ContractSubject's own doc requires it ("for a non-durable
      // subject the data is gone"), and contract.ts's `assertDeclaredNonDurable` proves it by
      // observation: it seeds an attempt, reads it back on the live connection FIRST, and only then
      // requires it to be absent here. A fake that kept the data would fail gates 2 and 7 honestly;
      // the answer to that is this line, never a softer gate.
      REALM.delete(namespace);
      return openConnection(configFor(namespace, FAKE_SCHEMA_VERSION), null);
    },

    corrupt: async (namespace, target) => {
      // Exactly ONE existing record, MUTATED IN PLACE — nothing inserted, no count changed, and for
      // target:'attempt' the meta singleton is not touched at all (so it stays physically intact and
      // readable at v1, which is what gate 13's detectedSchema:1 assertion depends on).
      const state = requireState(namespace, 'corrupt');
      if (target === 'meta') {
        state.meta['revision'] = CORRUPT_MARKER;
        return;
      }
      const record = state.attempts[0];
      if (record === undefined) {
        throw new Error(`fake subject: corrupt('${namespace}', 'attempt') on a namespace with no attempt records.`);
      }
      record['evidence'] = CORRUPT_MARKER;
    },

    setPhysicalSchema: async (namespace, version) => {
      // The version MARKER and nothing else: no record added, removed, or altered — note that
      // `meta.schemaVersion` is deliberately left where it was. No migration runs, no default is
      // materialized. This is what this build sees when a NEWER build has written the store.
      requireState(namespace, 'setPhysicalSchema').physicalVersion = version;
    },

    withMigrations: async (namespace, map) => openConnection(configFor(namespace, map.targetVersion), map),

    abortNextWrite: async (namespace) => {
      faultsFor(namespace).abortWrite = true;
    },

    abortNextUpgrade: async (namespace) => {
      faultsFor(namespace).abortUpgrade = true;
    },

    destroy: async (namespace) => {
      REALM.delete(namespace);
      FAULTS.delete(namespace);
    },
  };
}
