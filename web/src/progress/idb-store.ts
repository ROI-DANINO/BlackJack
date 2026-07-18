// The real IndexedDB `ProgressStore` adapter — the ONLY file in progress/ that may import `idb`
// (design §3.1's file table; boundary.test.ts enforces the single-import rule structurally).
//
// Design: docs/superpowers/specs/2026-07-17-progressstore-cycle1-design.md
//
// SCOPE. Task 7 implemented `load`, `appendAttempt`, and the lifetime operations `open`/`close`, plus
// the minimum they share (the three-store schema, the error constructors, record validation, envelope
// materialisation). Task 8 completes the port — `commitSessionSummary`, `exportSnapshot` (both modes),
// `reset` (store-clearing per ruling 4), and `diagnose` — reconciled with the design §12 rulings #9–13
// (empty canonical export mints nothing; every evidence-write refuses a newer schema; a summary with no
// prior attempt is `no-evidence`; reset clears the three stores and preserves the DB + schema version).
//
// WHY THERE IS NO VITEST BEHAVIOURAL TEST HERE (granted exception). The Vitest environment is
// `node` (web/vite.config.ts) with no IndexedDB, and `fake-indexeddb` is deliberately NOT admitted
// (task-7-brief.md's note): gates 7/12/13/14 are precisely where a simulated IDB is least
// trustworthy, and gate 7 is the sole evidence for §2.4's approved append deviation. This adapter's
// runtime behaviour is therefore proven in Task 9's REAL browser under Playwright, reusing AL-R2's
// real-browser evidence discipline. What is provable here is the module boundary (boundary.test.ts)
// and `tsc`; the conformance argument per operation is made by citing the design §§ inline.
//
// TRANSACTION DISCIPLINE (§9, LIB-002). Inside every transaction below, the only awaited work is an
// `idb` request on THAT transaction; `mintLearnerKey` is SYNCHRONOUS (§6). No caller-supplied async,
// no foreign Promise, ever runs while a transaction is open — that is what stops an unrelated await
// from auto-closing a native IndexedDB transaction (AL-R2 :67).

import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type {
  CachedMastery,
  ConnectionSupersededError,
  InvalidRecordRef,
  LearnerEnvelope,
  LearnerKey,
  NewerSchemaError,
  ProgressAttempt,
  QuotaExceededError,
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

// === Physical layout (design §5.1) ============================================================

const META_SINGLETON_ID = 'envelope';

/**
 * The `meta` singleton — §5.1's `{ id, schemaVersion, learnerKey, revision, curriculumVersions[],
 * cachedMastery }`. `cachedMastery` lives here in cycle 1 (§5.1); cycle 1 writes no cache.
 */
type MetaRecord = {
  id: string;
  // Set once, at minting (`config.schemaVersion` at that moment). An additive migration (§8.1) bumps
  // only the physical `db.version` — `runSchema`'s steps create/alter object stores, they never
  // rewrite an EXISTING meta record's own fields, and `appendAttempt`/`commitSessionSummary` reuse
  // `existingMeta` as-is when one is already present. This field therefore goes STALE after a
  // migration and is never the schema authority: `readEnvelope` below derives
  // `LearnerEnvelope.schemaVersion` from `physicalVersion` (`db.version`), never from this field
  // (T7-M2). The in-memory fake mirrors this exact staleness — see fake-store.ts's `NamespaceState`.
  schemaVersion: number;
  learnerKey: LearnerKey;
  revision: number;
  curriculumVersions: string[];
  cachedMastery: CachedMastery | null;
};

/**
 * The three object stores (§5.1). Records are stored EXACTLY as written — an attempt is
 * `{...draft, committedAtRevision}` with no adapter bookkeeping wrapped around it, because raw
 * export (§3.6) and gates 13/14 read them uninterpreted. The single index `by-revision` has one
 * cycle-1 consumer: canonical export's deterministic ordering (§5.2, Task 8); it is CREATED here in
 * v1 and first USED in Task 8. `by-skill` has no cycle-1 consumer, so §7's rule omits it.
 */
interface ProgressDBSchema extends DBSchema {
  meta: { key: string; value: MetaRecord };
  attempts: { key: string; value: ProgressAttempt; indexes: { 'by-revision': number } };
  sessions: { key: string; value: SessionRecord };
}

type ProgressDB = IDBPDatabase<ProgressDBSchema>;

// === The internal migration map (design §5.1, §8.1) ===========================================
//
// The adapter's OWN migration map, keyed by target schema version — distinct from contract.ts's
// TEST-ONLY `MigrationMap` (the additive v2 gate 11 injects, which ships with zero product
// producers, §3.5). v1 creates the three stores; there is no product v2. Adding an entry later is
// additive (§8.1). Each step is SYNCHRONOUS and runs inside the `versionchange` transaction (§9).

type SchemaStep = (db: ProgressDB) => void;

const SCHEMA_STEPS: Record<number, SchemaStep> = {
  1: (db) => {
    db.createObjectStore('meta', { keyPath: 'id' }); // singleton id='envelope'
    const attempts = db.createObjectStore('attempts', { keyPath: 'attemptId' });
    attempts.createIndex('by-revision', 'committedAtRevision');
    db.createObjectStore('sessions', { keyPath: 'sessionId' });
  },
};

/** Runs every schema step in `(oldVersion, newVersion]`, in order. Fresh DB ⇒ oldVersion 0. */
function runSchema(db: ProgressDB, oldVersion: number, newVersion: number): void {
  for (let version = oldVersion + 1; version <= newVersion; version += 1) {
    const step = SCHEMA_STEPS[version];
    if (step !== undefined) step(db);
  }
}

// === Errors (§3.3 — returned in unions, never thrown for a STATE) =============================

const RECOVERY_SAFE_ACTIONS: SafeAction[] = ['export-raw', 'reset-with-confirmation'];
const NEWER_SCHEMA_SAFE_ACTIONS: SafeAction[] = ['export-raw', 'upgrade-app'];
const QUOTA_SAFE_ACTIONS: SafeAction[] = ['export-raw', 'reset-with-confirmation', 'retry']; // §8.2

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
  return { code: 'NEWER_SCHEMA', namespace, detectedSchema, expectedSchema, safeActions: [...NEWER_SCHEMA_SAFE_ACTIONS] };
}

function quotaExceeded(namespace: string, detectedSchema: number): QuotaExceededError {
  return { code: 'QUOTA_EXCEEDED', namespace, detectedSchema, safeActions: [...QUOTA_SAFE_ACTIONS] };
}

function connectionSuperseded(namespace: string, detectedSchema: number | null): ConnectionSupersededError {
  return { code: 'CONNECTION_SUPERSEDED', namespace, detectedSchema, safeActions: ['reload'] };
}

function errorName(error: unknown): string {
  return error instanceof Error ? error.name : '';
}

/**
 * `.name` read straight off the value — robust where `errorName` is not. IndexedDB rejects with a
 * `DOMException`, which is NOT reliably `instanceof Error` across browsers, so Task-8 write
 * classification reads the name structurally rather than through the `instanceof` gate. It also reads
 * the name off a `tx.error` DOMException the same way (T7-M1, below).
 */
function nameOf(value: unknown): string {
  return typeof value === 'object' && value !== null && typeof (value as { name?: unknown }).name === 'string'
    ? (value as { name: string }).name
    : '';
}

/** A `name: message` (or bare message) string for a value that could not be read (raw-export errors). */
function describeError(error: unknown): string {
  const name = nameOf(error);
  const message =
    typeof error === 'object' && error !== null && typeof (error as { message?: unknown }).message === 'string'
      ? (error as { message: string }).message
      : String(error);
  return name !== '' ? `${name}: ${message}` : message;
}

/**
 * Classify a write transaction's failure into the typed `rejected` union — improving on Task 7's
 * appendAttempt pattern per the T7-M1 review lesson. A quota abort can surface at `tx.done` as an
 * `AbortError` whose REAL cause — `QuotaExceededError` — sits on `tx.error`, not on the rejection.
 * So `tx.error` is inspected FIRST, then the rejection's own name; anything else is an honest
 * `unknown` + `['retry']` (§8.2, §8.4). ConstraintError is handled by the caller before this (it is a
 * `duplicate`, not a `rejected`).
 */
function classifyTxRejection(
  error: unknown,
  tx: { error: DOMException | null },
  namespace: string,
  physicalVersion: number,
): QuotaExceededError | StorageUnavailableError {
  if (nameOf(tx.error) === 'QuotaExceededError' || nameOf(error) === 'QuotaExceededError') {
    return quotaExceeded(namespace, physicalVersion);
  }
  return storageUnavailable(namespace, physicalVersion, 'unknown', ['retry']);
}

/**
 * Open-failure taxonomy (§8.3). `VersionError` is handled BEFORE this — it is not an unavailable
 * store but a physically-newer one, opened read-only instead (see `openConnection`). `SecurityError`
 * is a denied/blocked IndexedDB; some browsers throw `InvalidStateError` in private mode. Everything
 * else is `unknown` — honest, and never a lie the caller can act on wrongly.
 */
function classifyOpenError(error: unknown): StorageUnavailableError['reason'] {
  switch (errorName(error)) {
    case 'SecurityError':
      return 'denied';
    case 'InvalidStateError':
      return 'private-mode';
    default:
      return 'unknown';
  }
}

// === Record validation (§8.4 — fail closed) ===================================================
//
// The reader that makes §8.4's "fail closed" real: ONE malformed record fails the WHOLE load,
// itemised (which record, and why). Used by `load()` — and, in Task 8, by `diagnose().integrity`.
// It checks SHAPE, not enum membership (an enum check would be a second, drifting copy of types.ts),
// and it TOLERATES unknown keys — required, because after an additive migration (gate 11) every
// record carries a field this build has never heard of, and §8.1's additive-only rule means a
// newer-but-additive record is readable, not corrupt.

type PhysicalRecord = { [key: string]: unknown };

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
  return value === undefined ? 'undefined' : (JSON.stringify(value) ?? String(value));
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

/** Returns WHY the record is invalid (§8.4 itemises which failed AND why), or null when valid. */
function validateAttempt(value: unknown): string | null {
  if (!isRecord(value)) return `attempt record is ${describeValue(value)}; expected an object`;
  const top = checkFields(
    value,
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
    checkNested(value, 'evidence', [
      ['subjectId', isString, 'a string'],
      ['unitId', isString, 'a string'],
      ['skillId', isString, 'a string'],
      ['cellId', isNullableString, 'a string or null'],
    ]) ??
    checkNested(value, 'disposition', [['status', isString, 'a string']]) ??
    checkNested(value, 'gradedBy', [
      ['authority', isString, 'a string'],
      ['profileId', isNullableString, 'a string or null'],
    ]) ??
    checkNested(value, 'activity', [
      ['activityId', isString, 'a string'],
      ['activityVersion', isString, 'a string'],
      ['catalogVersion', isString, 'a string'],
      ['seed', isNullableString, 'a string or null'],
      ['params', isAnything, 'any JSON value'],
    ])
  );
}

function validateSession(value: unknown): string | null {
  if (!isRecord(value)) return `session record is ${describeValue(value)}; expected an object`;
  const top = checkFields(
    value,
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
  return checkNested(value, 'budget', [
    ['presetId', isString, 'a string'],
    ['targetDurationMs', isNumber, 'a number'],
    ['maxActivities', isNumber, 'a number'],
  ]);
}

function validateMeta(value: unknown): string | null {
  if (!isRecord(value)) return `meta record is ${describeValue(value)}; expected an object`;
  const isStringArray = (candidate: unknown): boolean => Array.isArray(candidate) && candidate.every(isString);
  return checkFields(
    value,
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

/**
 * Every invalid record in the namespace, itemised by store + key + reason (§3.3, §8.4). `meta` is
 * `MetaRecord | undefined` so `diagnose()` can run on a store-cleared namespace (ruling 4): no meta
 * singleton is EMPTY, not corrupt, so there is nothing to validate. `load()` always passes a defined
 * meta (it short-circuits `empty` before reaching here).
 */
function validateAll(meta: MetaRecord | undefined, attempts: ProgressAttempt[], sessions: SessionRecord[]): InvalidRecordRef[] {
  const invalid: InvalidRecordRef[] = [];
  if (meta !== undefined) {
    const metaReason = validateMeta(meta);
    if (metaReason !== null) invalid.push({ store: 'meta', key: META_SINGLETON_ID, reason: metaReason });
  }
  attempts.forEach((record, index) => {
    const reason = validateAttempt(record);
    if (reason !== null) {
      const key = isRecord(record) && isString(record['attemptId']) ? record['attemptId'] : `<attempts[${index}]>`;
      invalid.push({ store: 'attempts', key, reason });
    }
  });
  sessions.forEach((record, index) => {
    const reason = validateSession(record);
    if (reason !== null) {
      const key = isRecord(record) && isString(record['sessionId']) ? record['sessionId'] : `<sessions[${index}]>`;
      invalid.push({ store: 'sessions', key, reason });
    }
  });
  return invalid;
}

// === Reading the envelope (§4.5) ==============================================================

function compareAttempts(a: ProgressAttempt, b: ProgressAttempt): number {
  if (a.committedAtRevision !== b.committedAtRevision) return a.committedAtRevision - b.committedAtRevision;
  return a.attemptId < b.attemptId ? -1 : a.attemptId > b.attemptId ? 1 : 0;
}

function compareSessions(a: SessionRecord, b: SessionRecord): number {
  if (a.committedAtRevision !== b.committedAtRevision) return a.committedAtRevision - b.committedAtRevision;
  return a.sessionId < b.sessionId ? -1 : a.sessionId > b.sessionId ? 1 : 0;
}

/**
 * Called only after `validateAll` returned nothing — every field read below is shape-checked.
 * IndexedDB already hands back structured clones, so mutating this envelope cannot reach the store;
 * the spreads exist only so the in-place `sort` does not reorder the arrays `getAll` returned.
 * Attempt/session objects are passed through WHOLE (not reconstructed field-by-field) so any
 * additive-migration field they carry (gate 11) survives into the envelope. Ordering is
 * (committedAtRevision, attemptId|sessionId) per types.ts:151.
 */
function readEnvelope(
  meta: MetaRecord,
  attempts: ProgressAttempt[],
  sessions: SessionRecord[],
  physicalVersion: number,
): LearnerEnvelope {
  return {
    schemaVersion: physicalVersion,
    learnerKey: meta.learnerKey,
    revision: meta.revision,
    curriculumVersions: [...meta.curriculumVersions],
    attempts: [...attempts].sort(compareAttempts),
    sessions: [...sessions].sort(compareSessions),
    cachedMastery: meta.cachedMastery,
  };
}

/**
 * A loaded envelope + the store's namespace → the export-format `CanonicalSnapshot` (§5.2). The store
 * never stringifies its own object — it hands this to `canonicalize`, so byte-identity (gates 8, 11)
 * stays a property of the ONE serializer, not of this adapter's read order.
 */
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

// === The connection and its lifetime ==========================================================

/**
 * One open connection's mutable state. `superseded` is set by the `blocking` (`onversionchange`)
 * handler when another tab upgrades the database (§8.4, BROWSER-003): the handler closes the native
 * connection and flips this flag, and every later operation short-circuits to
 * `ConnectionSupersededError`/`safeActions:['reload']`. `blocking` deliberately does NOT null `db`
 * (it leaves it referenced so `db.version` stays reportable) — only `close()` nulls it.
 */
type Connection = {
  db: ProgressDB | null;
  superseded: boolean;
};

function createStore(config: ProgressStoreConfig, connection: Connection, migrated: { from: number; to: number } | null): ProgressStore {
  const ns = config.namespace;

  /** The live connection, or a bug-throw if used after `close()` (§3.3: using a closed store). */
  const requireDb = (): ProgressDB => {
    if (connection.db === null) throw new Error(`progress idb adapter: operation on a closed store ('${ns}').`);
    return connection.db;
  };

  const detectedVersion = (): number | null => (connection.db === null ? null : connection.db.version);

  const store: ProgressStore = {
    async load(): Promise<LoadOutcome> {
      // Superseded connection: LoadOutcome has no ConnectionSuperseded branch (only writes carry it,
      // §3.4), so the representable signal is `unavailable` + the `reload` safe action — the caller
      // cannot use this connection and must reopen. See task-7-report.md for this deviation note.
      if (connection.superseded) {
        return { status: 'unavailable', error: storageUnavailable(ns, detectedVersion(), 'unknown', ['reload']) };
      }
      const db = requireDb();
      const physicalVersion = db.version;

      // §6: `meta` singleton absent ⇒ fresh (or store-cleared) namespace ⇒ `{status:'empty'}`,
      // minting NOTHING. load() is a pure read.
      //
      // §3.3: a read failure that is NOT the guarded `superseded` path (e.g. InvalidStateError from
      // a connection entering closePending after an onversionchange the `blocking` handler hasn't
      // processed yet, or an eviction/disk fault) is a recoverable STATE, not a bug — it is returned
      // via LoadOutcome's `unavailable` branch, mirroring appendAttempt's default catch (§8.4: honest
      // 'unknown' + ['retry'], the same reason this file never guesses a browser-specific cause for a
      // mid-session fault).
      let meta: MetaRecord | undefined;
      try {
        meta = await db.get('meta', META_SINGLETON_ID);
      } catch {
        return { status: 'unavailable', error: storageUnavailable(ns, physicalVersion, 'unknown', ['retry']) };
      }
      if (meta === undefined) return { status: 'empty' };

      // §8.4: a physically-newer store is not corrupt, merely unreadable by this build. Reported
      // before any record is validated — the physical marker is the only thing readable first (§3.6).
      if (physicalVersion > config.schemaVersion) {
        return { status: 'newer-schema', error: newerSchema(ns, physicalVersion, config.schemaVersion) };
      }

      let attempts: ProgressAttempt[];
      let sessions: SessionRecord[];
      try {
        attempts = await db.getAll('attempts');
        sessions = await db.getAll('sessions');
      } catch {
        return { status: 'unavailable', error: storageUnavailable(ns, physicalVersion, 'unknown', ['retry']) };
      }

      // §8.4 fail closed: one bad record fails the WHOLE load, itemised. Skipping it would make
      // mastery non-reproducible AND hide data loss.
      const invalid = validateAll(meta, attempts, sessions);
      if (invalid.length > 0) return { status: 'recovery-required', error: recoveryRequired(ns, physicalVersion, invalid) };

      // §3.5: any additive migration ran in the `upgrade` transaction at open and is REPORTED here so
      // the caller cannot fail to learn its data moved. Cycle-1 product opens report `null` (v1 has
      // no older schema); `migrated` is non-null only when an older store was upgraded at open.
      return { status: 'loaded', envelope: readEnvelope(meta, attempts, sessions, physicalVersion), migrated };
    },

    async appendAttempt(draft: ProgressAttemptDraft): Promise<AppendOutcome> {
      // §8.4: a superseded connection refuses every write with ConnectionSupersededError — never
      // block silently, never fight the upgrading tab.
      if (connection.superseded) return { status: 'rejected', error: connectionSuperseded(ns, detectedVersion()) };
      const db = requireDb();
      const physicalVersion = db.version;

      // §8.4 (ruling 2): a write into a namespace physically NEWER than this build refuses with
      // NEWER_SCHEMA — never STORAGE_UNAVAILABLE. The storage is available; the store is intentionally
      // unwritable by this version, so `upgrade-app` (not `retry`) is the honest safe action.
      if (physicalVersion > config.schemaVersion) {
        return { status: 'rejected', error: newerSchema(ns, physicalVersion, config.schemaVersion) };
      }

      // §5.1, §6, §8.4: ONE readwrite tx over meta + attempts. Read meta; mint it SYNCHRONOUSLY on
      // first write (§6 — the learner key is created ONLY here, inside this transaction, never by
      // load/open); assign revision = meta.revision + 1; `add()` the attempt (add(), not put() — the
      // primary key IS the idempotency key, §5.1); rewrite meta; commit. No async but idb ops on this
      // tx runs inside it (§9).
      const tx = db.transaction(['meta', 'attempts'], 'readwrite');
      try {
        const metaStore = tx.objectStore('meta');
        const attemptsStore = tx.objectStore('attempts');

        const existingMeta = await metaStore.get(META_SINGLETON_ID);
        const baseMeta: MetaRecord = existingMeta ?? {
          id: META_SINGLETON_ID,
          schemaVersion: config.schemaVersion,
          learnerKey: config.mintLearnerKey(), // SYNC (§6, §9 point 5)
          revision: 0,
          curriculumVersions: [],
          cachedMastery: null,
        };

        const revision = baseMeta.revision + 1;
        // `add()` raises ConstraintError FROM THE DATABASE on a duplicate attemptId — issued BEFORE
        // the meta rewrite, so a duplicate aborts the tx with meta.revision unbumped (gate 5).
        await attemptsStore.add({ ...draft, committedAtRevision: revision });

        const catalogVersion = draft.activity.catalogVersion; // curriculumVersions: "every version encountered" (§4.5)
        const nextMeta: MetaRecord = {
          ...baseMeta,
          revision,
          curriculumVersions: baseMeta.curriculumVersions.includes(catalogVersion)
            ? baseMeta.curriculumVersions
            : [...baseMeta.curriculumVersions, catalogVersion],
        };
        await metaStore.put(nextMeta);
        await tx.done;
        return { status: 'committed', revision };
      } catch (error) {
        // The tx has already aborted (idb aborts on a failed request or an explicit abort); nothing
        // it would have written survives (gate 4 rollback). Classify the failure into a typed union
        // using the structural `nameOf` (T7-M1 review lesson, §9's tx.error-first classification) —
        // NOT `errorName`'s `instanceof Error` gate, which a real DOMException can miss cross-browser.
        if (nameOf(error) === 'ConstraintError') {
          // §5.1: duplicate attemptId. Read the existing record (a fresh auto-commit read tx) and
          // report its revision — the same answer AL-R2 returned, from a stronger mechanism.
          const existing = await db.get('attempts', draft.attemptId);
          if (existing === undefined) {
            throw new Error(`progress idb adapter: ConstraintError on '${draft.attemptId}' but the conflicting attempt is unreadable.`);
          }
          return { status: 'duplicate', revision: existing.committedAtRevision };
        }
        // §8.2/§8.4: QuotaExceededError (checked on tx.error first, per classifyTxRejection) → the
        // typed quota error; anything else (an aborted write, gate 4's injected fault surfacing as
        // AbortError, or any other transient fault) → honest 'unknown' + ['retry'].
        return { status: 'rejected', error: classifyTxRejection(error, tx, ns, physicalVersion) };
      }
    },

    async commitSessionSummary(write: SessionSummaryWrite): Promise<CommitOutcome> {
      // §8.4: a superseded connection refuses every write with ConnectionSupersededError (mirrors
      // appendAttempt) — never block silently, never fight the upgrading tab.
      if (connection.superseded) return { status: 'rejected', error: connectionSuperseded(ns, detectedVersion()) };
      const db = requireDb();
      const physicalVersion = db.version;

      // §8.4 (ruling 2, register #10): a write into a namespace physically NEWER than this build
      // refuses with NEWER_SCHEMA — never STORAGE_UNAVAILABLE. Applied to every evidence-write, not
      // only appendAttempt; `upgrade-app` (not `retry`) is the honest safe action.
      if (physicalVersion > config.schemaVersion) {
        return { status: 'rejected', error: newerSchema(ns, physicalVersion, config.schemaVersion) };
      }

      // §5.1, §8.4: ONE readwrite tx over meta + sessions. The revision check lives HERE (§2.4, §8.4):
      // a summary publishes DERIVED state, so a stale expectedRevision is a genuine lost-update hazard
      // and is refused — unlike appendAttempt, whose appends commute and take no revision check.
      const tx = db.transaction(['meta', 'sessions'], 'readwrite');
      try {
        const metaStore = tx.objectStore('meta');
        const sessionsStore = tx.objectStore('sessions');

        // §6 (ruling 3, register #11): the learner key is minted ONLY by the first persisted attempt.
        // No meta singleton ⇒ no attempt yet (a fresh namespace, or one store-cleared by reset) ⇒ mint
        // NOTHING: no key, no session record, no meta. `no-evidence` is a no-op OUTCOME, not an error,
        // and preserves §4.2 point 2's ban on phantom zero-evidence sessions. This read-only exit lets
        // the readwrite tx auto-commit as a no-op.
        const existingMeta = await metaStore.get(META_SINGLETON_ID);
        if (existingMeta === undefined) return { status: 'no-evidence' };

        // §5.1: sessionId is the primary key AND the idempotency key. A re-commit of the same session
        // is `duplicate` (idempotent), checked BEFORE the revision gate so a legitimate retry after a
        // lost ack is not misreported as a conflict; `add()` below is the atomic guard for the
        // concurrent-duplicate race (caught as ConstraintError).
        const existingSession = await sessionsStore.get(write.session.sessionId);
        if (existingSession !== undefined) return { status: 'duplicate', revision: existingSession.committedAtRevision };

        const currentRevision = existingMeta.revision;
        if (write.expectedRevision !== currentRevision) return { status: 'conflict', currentRevision };

        const revision = currentRevision + 1;
        // add(), not put(): a concurrent tab that landed this sessionId first raises ConstraintError
        // FROM THE DATABASE, caught below, so the original session survives (gate 5's mechanism).
        await sessionsStore.add({ ...write.session, committedAtRevision: revision });

        const catalogVersion = write.session.curriculumVersion; // curriculumVersions: "every version encountered" (§4.5)
        const nextMeta: MetaRecord = {
          ...existingMeta,
          revision,
          // `cachedMastery: null` on the write means "no derived publish", NOT "clear the cache" — the
          // cache is disposable but discarding it is a decision, not a side effect of a summary (§3.4).
          cachedMastery: write.cachedMastery !== null ? write.cachedMastery : existingMeta.cachedMastery,
          curriculumVersions: existingMeta.curriculumVersions.includes(catalogVersion)
            ? existingMeta.curriculumVersions
            : [...existingMeta.curriculumVersions, catalogVersion],
        };
        await metaStore.put(nextMeta);
        await tx.done;
        return { status: 'committed', revision };
      } catch (error) {
        // The tx has already aborted; nothing it would have written survives (gate 4 rollback).
        if (nameOf(error) === 'ConstraintError') {
          // A concurrent writer landed this sessionId between our read and our add(): report its
          // revision, the idempotent answer, from a fresh auto-commit read.
          const existing = await db.get('sessions', write.session.sessionId);
          if (existing === undefined) {
            throw new Error(`progress idb adapter: ConstraintError on session '${write.session.sessionId}' but the conflicting record is unreadable.`);
          }
          return { status: 'duplicate', revision: existing.committedAtRevision };
        }
        return { status: 'rejected', error: classifyTxRejection(error, tx, ns, physicalVersion) };
      }
    },

    async exportSnapshot(request: ExportRequest): Promise<ExportOutcome> {
      if (request.mode === 'raw') {
        // §3.6: open with NO version argument — IndexedDB opens at whatever version is physically
        // present, NEVER triggering an upgrade and NEVER failing with VersionError. Enumerate
        // `objectStoreNames`, dump every record UNINTERPRETED, and NEVER validate: applying the schema
        // is exactly what would break it at schema 999 or on a corrupt store. A FRESH, untyped handle
        // (not the live typed connection) is what lets it read stores outside ProgressDBSchema and work
        // even when the live connection is superseded/closed; the namespace already exists (this store
        // came from a successful open), so a version-less open reopens it rather than minting a phantom.
        const errors: string[] = [];
        const stores: Record<string, unknown[]> = {};
        let physicalVersion: number | null = null;
        let rawDb: IDBPDatabase | null = null;
        try {
          rawDb = await openDB(ns);
          physicalVersion = rawDb.version;
          for (const storeName of Array.from(rawDb.objectStoreNames)) {
            try {
              stores[storeName] = await rawDb.getAll(storeName);
            } catch (error) {
              errors.push(`${storeName}: ${describeError(error)}`);
            }
          }
        } catch (error) {
          errors.push(`open: ${describeError(error)}`);
        } finally {
          rawDb?.close();
        }
        const raw: RawExport = { format: 'blackjack.progress.raw', formatVersion: 1, namespace: ns, physicalVersion, stores, errors };
        return { status: 'exported', mode: 'raw', json: JSON.stringify(raw) };
      }

      // Canonical (§3.4, §5.2, §9.4): load THROUGH the same read path, then serialize AFTER the read
      // transaction has closed — nothing async but the load's own idb reads runs before serialization.
      const outcome = await store.load();
      switch (outcome.status) {
        case 'loaded':
          return { status: 'exported', mode: 'canonical', json: canonicalize(snapshotOf(ns, outcome.envelope)) };
        case 'recovery-required':
        case 'newer-schema':
          // §4.6: you cannot canonicalise a store whose records you cannot read. §3.4 names the retry:
          // mode:'raw'.
          return { status: 'not-canonical-exportable', error: outcome.error };
        case 'unavailable':
          return { status: 'unavailable', error: outcome.error };
        case 'empty':
          // Ruling 1 (register #9): a canonical export of a namespace with no persisted data returns
          // the explicit `{status:'empty'}` and mints NOTHING — filling an envelope with a fresh
          // learnerKey would be a write on a read (§6). Distinct from 'unavailable'/'absent' (§8.3), so
          // a caller can tell "no data yet" from "IndexedDB unavailable". Raw export never returns this.
          return { status: 'empty' };
      }
    },

    async reset(confirmation: ResetConfirmation): Promise<ResetOutcome> {
      const db = requireDb();
      const physicalVersion = db.version;
      try {
        // Delta 1 / ruling 4 (§8.4, register #12): CLEAR all three object stores in ONE readwrite
        // transaction, preserving the database and its physical schema version — NEVER
        // deleteDatabase(namespace). This makes "no residual records in ANY store" (gate 10)
        // falsifiable (a stranded store is representable) and keeps the schema surviving, so post-reset
        // `load()` is `{status:'empty'}` while `diagnose().detectedSchema` reports the physical version
        // (§3.5). A transactional clear also never blocks on open connections, as deleteDatabase would.
        const tx = db.transaction(['meta', 'attempts', 'sessions'], 'readwrite');
        const metaStore = tx.objectStore('meta');
        if (confirmation.expectedRevision !== 'unloadable') {
          // §3.4: the numeric expectedRevision proves the caller LOOKED first and blocks a reset from
          // silently destroying a concurrent tab's unseen writes. 'unloadable' (obtainable only from
          // diagnose()) is the escape for a corrupt/unreadable envelope and bypasses this check.
          const meta = await metaStore.get(META_SINGLETON_ID);
          const currentRevision = meta?.revision;
          if (typeof currentRevision === 'number' && currentRevision !== confirmation.expectedRevision) {
            // Read-only exit: the tx cleared nothing and auto-commits as a no-op.
            return { status: 'conflict', currentRevision };
          }
          // meta absent, or its revision unreadable: a numeric expectedRevision cannot be corroborated
          // (that is what 'unloadable' is for). Reaching here with a number simply proceeds — clearing
          // already-empty stores is an idempotent no-op.
        }
        await metaStore.clear();
        await tx.objectStore('attempts').clear();
        await tx.objectStore('sessions').clear();
        await tx.done;
        return { status: 'reset' };
      } catch {
        // ResetOutcome's only rejection carrier is StorageUnavailableError (a confirmed reset is the
        // sanctioned recovery, so it has no newer-schema/quota refusal). A superseded/closed connection
        // steers to `reload`; any other fault to `retry`.
        return {
          status: 'rejected',
          error: storageUnavailable(ns, physicalVersion, 'unknown', connection.superseded ? ['reload'] : ['retry']),
        };
      }
    },

    async diagnose(): Promise<Diagnosis> {
      // §3.5: read-only, never mutates, never mints, and works when `load()` cannot. It reads the live
      // connection (already at the physical version — the VersionError path reopened it version-less
      // for a newer store, so `db.version` is the true physical marker even at schema 999).
      const db = requireDb();
      const detectedSchema = db.version;
      const physicalStores = Array.from(db.objectStoreNames);
      const recordCounts: Record<string, number> = {};
      let meta: MetaRecord | undefined;
      let attempts: ProgressAttempt[] = [];
      let sessions: SessionRecord[] = [];
      try {
        if (physicalStores.includes('meta')) {
          const metaAll = await db.getAll('meta');
          recordCounts.meta = metaAll.length;
          meta = metaAll.find((record) => record.id === META_SINGLETON_ID);
        }
        if (physicalStores.includes('attempts')) {
          attempts = await db.getAll('attempts');
          recordCounts.attempts = attempts.length;
        }
        if (physicalStores.includes('sessions')) {
          sessions = await db.getAll('sessions');
          recordCounts.sessions = sessions.length;
        }
      } catch {
        // A read fault (superseded/closed connection, disk error): report what is known physically and
        // steer to recovery. diagnose NEVER throws for a storage STATE (§3.3) — it must answer when
        // load() cannot.
        return {
          namespace: ns,
          expectedSchema: config.schemaVersion,
          detectedSchema,
          physicalStores,
          recordCounts,
          migration: detectedSchema > config.schemaVersion ? { kind: 'unsupported', reason: 'newer-than-app' } : { kind: 'none' },
          integrity: { invalid: [] },
          safeActions: [...RECOVERY_SAFE_ACTIONS],
        };
      }

      // Post-(store-clearing)-reset (ruling 4): meta absent ⇒ EMPTY, not corrupt ⇒ nothing to validate,
      // and `detectedSchema` still reports the SURVIVING physical version with zero record counts
      // (present-but-empty ≠ absent, §3.5).
      const invalid = validateAll(meta, attempts, sessions);
      const migration: Diagnosis['migration'] =
        detectedSchema > config.schemaVersion
          ? { kind: 'unsupported', reason: 'newer-than-app' }
          : detectedSchema < config.schemaVersion
            ? { kind: 'additive-available', from: detectedSchema, to: config.schemaVersion }
            : { kind: 'none' };
      const safeActions: SafeAction[] =
        detectedSchema > config.schemaVersion
          ? [...NEWER_SCHEMA_SAFE_ACTIONS]
          : invalid.length > 0
            ? [...RECOVERY_SAFE_ACTIONS]
            : [];
      return {
        namespace: ns,
        expectedSchema: config.schemaVersion,
        detectedSchema,
        physicalStores,
        recordCounts,
        migration,
        integrity: { invalid },
        safeActions,
      };
    },

    async close(): Promise<void> {
      // §3.2: resource disposal, not a semantic operation, and idempotent. Closing an already-closed
      // connection is a no-op. Data survives close() — only reset() (Task 8) and destroy() remove it.
      if (connection.db !== null) {
        connection.db.close();
        connection.db = null;
      }
    },
  };

  return store;
}

// === Opening (design §3.2, §6, §8.3, §8.4) ====================================================

/**
 * The `OpenProgressStore` factory (store.ts) for the real IndexedDB subject, exported as the real
 * `openProgressStore` (deviations register #13 — the port declares only the call-signature
 * INTERFACE, and THIS file supplies the one real binding; there is no phantom `declare`).
 *
 * `open` never mints an identifier (§6) — it only creates the physical schema (empty stores) and, if
 * an older store exists, runs the additive `versionchange` migration. The learner key is minted by
 * the first `appendAttempt`, never here.
 */
export const openProgressStore: OpenProgressStore = async (config) => {
  const ns = config.namespace;

  // §8.3: IndexedDB genuinely absent (very old / stripped runtime) ⇒ unavailable/'absent' up front.
  if (typeof indexedDB === 'undefined') {
    return { status: 'unavailable', error: storageUnavailable(ns, null, 'absent') };
  }

  const connection: Connection = { db: null, superseded: false };
  const onBlocking = (): void => {
    // §8.4 (BROWSER-003): another tab is upgrading. Close our connection and mark it superseded so
    // every later operation returns ConnectionSupersededError/['reload'].
    connection.superseded = true;
    connection.db?.close();
  };
  const onTerminated = (): void => {
    // Browser abnormally terminated the connection — treat like superseded (reload to recover).
    connection.superseded = true;
  };
  const onBlocked = (): void => {
    // Our (newer) open is blocked by an older connection still open in another tab. There is no
    // OpenOutcome slot for "temporarily blocked" (open|unavailable only), and nothing to do but
    // wait: idb keeps the open promise pending until the old tab honours its own `versionchange`
    // and closes, at which point our upgrade proceeds. Registered per the brief's callback set;
    // deliberately a no-op beyond that — we never force-evict another tab's connection (§8.4:
    // "never fight it").
  };

  let migrated: { from: number; to: number } | null = null;
  try {
    const db = await openDB<ProgressDBSchema>(ns, config.schemaVersion, {
      upgrade(database, oldVersion, newVersion) {
        const target = newVersion ?? config.schemaVersion;
        runSchema(database, oldVersion, target); // §5.1: v1 creates meta + attempts(+by-revision) + sessions
        // §3.5: report an upgrade of a KNOWN OLDER store (oldVersion > 0). A fresh DB (oldVersion 0)
        // is a creation, not a migration, so it reports null.
        if (oldVersion > 0 && oldVersion < target) migrated = { from: oldVersion, to: target };
      },
      blocked: onBlocked,
      blocking: onBlocking,
      terminated: onTerminated,
    });
    connection.db = db;
    return { status: 'open', store: createStore(config, connection, migrated) };
  } catch (error) {
    // §8.4: a store physically NEWER than this build makes a versioned open throw VersionError.
    // Open must NOT refuse it — load() reports newer-schema and raw export (§3.6, Task 8) must still
    // reach the data. Reopen with NO version argument (opens at the physical version, never upgrades,
    // never VersionErrors), so load()/appendAttempt see `db.version > schemaVersion` and act on it.
    if (errorName(error) === 'VersionError') {
      try {
        const db = await openDB<ProgressDBSchema>(ns, undefined, { blocking: onBlocking, terminated: onTerminated });
        connection.db = db;
        return { status: 'open', store: createStore(config, connection, null) };
      } catch (reopenError) {
        return { status: 'unavailable', error: storageUnavailable(ns, null, classifyOpenError(reopenError)) };
      }
    }
    // §8.3: denied / private-mode / unknown — knowable at open, surfaced so the UI can tell the
    // learner progress will not be saved. NEVER a silent in-memory swap (that lands with the UI).
    return { status: 'unavailable', error: storageUnavailable(ns, null, classifyOpenError(error)) };
  }
};
