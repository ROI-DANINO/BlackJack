import {
  deleteDB,
  openDB,
  unwrap,
  type DBSchema,
  type IDBPDatabase,
  type IDBPTransaction,
} from 'idb';
import {
  ResearchStoreError,
  type CheckpointWrite,
  type ResearchAdapterFactory,
  type ResearchAttempt,
  type ResearchEnvelope,
  type ResearchFailureControls,
  type ResearchProgressStore,
  type ResearchSessionSummary,
  type ResearchStoreErrorCode,
} from '../contract';
import {
  RESEARCH_CURRICULUM_VERSIONS,
  RESEARCH_LEARNER_ID,
  RESEARCH_REDUCER_VERSION,
} from '../fixtures';

type MetaRecord = {
  key: 'learner';
  schemaVersion: number;
  learnerId: string;
  revision: number;
  reducerVersion: string;
  curriculumVersions: string[];
  cachedMastery: unknown | null;
};

type IdempotencyRecord = { idempotencyKey: string };

const DATABASE_VERSION = 2;
const STORE_NAMES = ['meta', 'attempts', 'sessions', 'idempotency'] as const;

interface ResearchDb extends DBSchema {
  meta: { key: 'learner'; value: MetaRecord };
  attempts: { key: string; value: ResearchAttempt; indexes: { sessionId: string } };
  sessions: { key: string; value: ResearchSessionSummary };
  idempotency: { key: string; value: IdempotencyRecord };
}

const controlsState = {
  abortWrite: false,
  abortUpgrade: false,
  quota: false,
  unavailable: false,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function storeError(
  code: ResearchStoreErrorCode,
  namespace: string,
  detail: string,
): ResearchStoreError {
  return new ResearchStoreError(code, `${detail}; namespace=${namespace}`);
}

function detectedSchema(value: unknown): string {
  if (isRecord(value) && typeof value.schemaVersion === 'number') return String(value.schemaVersion);
  return 'unknown';
}

function recoveryError(namespace: string, value: unknown, detail: string): ResearchStoreError {
  return storeError(
    'RECOVERY_REQUIRED',
    namespace,
    `${detail}; detectedSchema=${detectedSchema(value)}; safeNextActions=export-raw,reset-with-confirmation`,
  );
}

function newerSchemaError(namespace: string, value: unknown): ResearchStoreError {
  return storeError(
    'NEWER_SCHEMA',
    namespace,
    `stored schema is newer than ${DATABASE_VERSION}; detectedSchema=${detectedSchema(value)}; safeNextActions=export-raw,upgrade-app`,
  );
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((entry) => typeof entry === 'string');
}

function isAttempt(value: unknown): value is ResearchAttempt {
  return isRecord(value)
    && typeof value.attemptId === 'string'
    && typeof value.sessionId === 'string'
    && typeof value.occurredAt === 'string'
    && typeof value.activityId === 'string'
    && typeof value.decision === 'string'
    && typeof value.correct === 'boolean'
    && typeof value.responseMs === 'number'
    && Number.isFinite(value.responseMs)
    && value.assistance === 'none';
}

function isSession(value: unknown): value is ResearchSessionSummary {
  return isRecord(value)
    && typeof value.sessionId === 'string'
    && typeof value.startedAt === 'string'
    && typeof value.endedAt === 'string'
    && typeof value.attemptCount === 'number'
    && Number.isInteger(value.attemptCount)
    && value.attemptCount >= 0
    && typeof value.correctCount === 'number'
    && Number.isInteger(value.correctCount)
    && value.correctCount >= 0;
}

function createStores(database: IDBPDatabase<ResearchDb>): void {
  if (!database.objectStoreNames.contains('meta')) database.createObjectStore('meta', { keyPath: 'key' });
  if (!database.objectStoreNames.contains('attempts')) {
    database.createObjectStore('attempts', { keyPath: 'attemptId' }).createIndex('sessionId', 'sessionId');
  }
  if (!database.objectStoreNames.contains('sessions')) database.createObjectStore('sessions', { keyPath: 'sessionId' });
  if (!database.objectStoreNames.contains('idempotency')) {
    database.createObjectStore('idempotency', { keyPath: 'idempotencyKey' });
  }
}

function defaultMeta(): MetaRecord {
  return {
    key: 'learner',
    schemaVersion: 2,
    learnerId: RESEARCH_LEARNER_ID,
    revision: 0,
    reducerVersion: RESEARCH_REDUCER_VERSION,
    curriculumVersions: [...RESEARCH_CURRICULUM_VERSIONS],
    cachedMastery: null,
  };
}

function canonicalEnvelope(
  meta: MetaRecord,
  attempts: ResearchAttempt[],
  sessions: ResearchSessionSummary[],
): ResearchEnvelope {
  return {
    schemaVersion: meta.schemaVersion,
    learnerId: meta.learnerId,
    revision: meta.revision,
    reducerVersion: meta.reducerVersion,
    curriculumVersions: [...meta.curriculumVersions].sort((left, right) => left.localeCompare(right)),
    attempts: [...attempts].sort((left, right) => left.attemptId.localeCompare(right.attemptId)),
    sessions: [...sessions].sort((left, right) => left.sessionId.localeCompare(right.sessionId)),
    cachedMastery: meta.cachedMastery,
  };
}

function requireValidMeta(namespace: string, value: unknown): MetaRecord {
  if (isRecord(value) && typeof value.schemaVersion === 'number' && value.schemaVersion > DATABASE_VERSION) {
    throw newerSchemaError(namespace, value);
  }
  if (!isRecord(value)
    || value.key !== 'learner'
    || value.schemaVersion !== DATABASE_VERSION
    || typeof value.learnerId !== 'string'
    || typeof value.revision !== 'number'
    || !Number.isInteger(value.revision)
    || value.revision < 0
    || typeof value.reducerVersion !== 'string'
    || !isStringArray(value.curriculumVersions)
    || !Object.hasOwn(value, 'cachedMastery')) {
    throw recoveryError(namespace, value, 'stored learner metadata is malformed');
  }
  return {
    key: 'learner',
    schemaVersion: value.schemaVersion,
    learnerId: value.learnerId,
    revision: value.revision,
    reducerVersion: value.reducerVersion,
    curriculumVersions: [...value.curriculumVersions],
    cachedMastery: value.cachedMastery,
  };
}

function mapError(
  error: unknown,
  namespace: string,
  fallback: 'STORAGE_UNAVAILABLE' | 'WRITE_ABORTED' | 'UPGRADE_ABORTED' = 'STORAGE_UNAVAILABLE',
): never {
  if (error instanceof ResearchStoreError) throw error;
  if (error instanceof DOMException && error.name === 'QuotaExceededError') {
    throw storeError('QUOTA_EXCEEDED', namespace, error.message);
  }
  throw storeError(
    fallback,
    namespace,
    error instanceof Error ? error.message : String(error),
  );
}

function migrateVersionOne(
  transaction: IDBPTransaction<
    ResearchDb,
    Array<'meta' | 'attempts' | 'sessions' | 'idempotency'>,
    'versionchange'
  >,
  onInjectedAbort: () => void,
): void {
  const nativeTransaction = unwrap(transaction);
  const attempts = nativeTransaction.objectStore('attempts');
  const cursorRequest = attempts.openCursor();
  cursorRequest.onerror = () => nativeTransaction.abort();
  cursorRequest.onsuccess = () => {
    const cursor = cursorRequest.result;
    if (cursor !== null) {
      const rawAttempt = cursor.value as unknown;
      if (isRecord(rawAttempt) && !Object.hasOwn(rawAttempt, 'assistance')) {
        cursor.update({ ...rawAttempt, assistance: 'none' });
      }
      cursor.continue();
      return;
    }

    if (controlsState.abortUpgrade) {
      controlsState.abortUpgrade = false;
      onInjectedAbort();
      nativeTransaction.abort();
      return;
    }

    const metaStore = nativeTransaction.objectStore('meta');
    const metaRequest = metaStore.get('learner');
    metaRequest.onerror = () => nativeTransaction.abort();
    metaRequest.onsuccess = () => {
      const rawMeta = metaRequest.result as unknown;
      if (!isRecord(rawMeta) || rawMeta.schemaVersion !== 1) {
        nativeTransaction.abort();
        return;
      }
      metaStore.put({
        ...rawMeta,
        key: 'learner',
        schemaVersion: DATABASE_VERSION,
        reducerVersion: RESEARCH_REDUCER_VERSION,
      });
    };
  };
}

async function openDatabase(namespace: string): Promise<IDBPDatabase<ResearchDb>> {
  let injectedUpgradeAbort = false;
  try {
    return await openDB<ResearchDb>(namespace, DATABASE_VERSION, {
      upgrade(database, oldVersion, _newVersion, transaction) {
        // idb eagerly creates transaction.done for versionchange transactions;
        // the open request owns the outcome, but the done rejection still needs
        // a handler when an injected or browser abort occurs.
        void transaction.done.catch(() => undefined);
        if (oldVersion === 0) {
          createStores(database);
          return;
        }
        if (oldVersion === 1) {
          migrateVersionOne(transaction, () => { injectedUpgradeAbort = true; });
        }
      },
    });
  } catch (error) {
    if (injectedUpgradeAbort) {
      throw storeError('UPGRADE_ABORTED', namespace, 'injected v1 to v2 upgrade abort');
    }
    mapError(error, namespace);
  }
}

class IdbProgressStore implements ResearchProgressStore {
  private database: IDBPDatabase<ResearchDb> | null = null;
  private namespace: string | null = null;

  async open(namespace: string): Promise<void> {
    if (controlsState.unavailable) {
      throw storeError('STORAGE_UNAVAILABLE', namespace, 'injected storage unavailable');
    }
    this.database?.close();
    this.database = null;
    this.namespace = namespace;
    try {
      this.database = await openDatabase(namespace);
    } catch (error) {
      this.database?.close();
      this.database = null;
      this.namespace = null;
      mapError(error, namespace);
    }
  }

  private requireOpen(): { database: IDBPDatabase<ResearchDb>; namespace: string } {
    if (this.database === null || this.namespace === null) {
      throw new ResearchStoreError('STORAGE_UNAVAILABLE', 'idb store is not open');
    }
    return { database: this.database, namespace: this.namespace };
  }

  async load(): Promise<ResearchEnvelope | null> {
    const { database, namespace } = this.requireOpen();
    try {
      const transaction = database.transaction(['meta', 'attempts', 'sessions'], 'readonly');
      const [rawMeta, rawAttempts, rawSessions] = await Promise.all([
        transaction.objectStore('meta').get('learner'),
        transaction.objectStore('attempts').getAll(),
        transaction.objectStore('sessions').getAll(),
        transaction.done,
      ]);
      if (rawMeta === undefined) {
        if (rawAttempts.length !== 0 || rawSessions.length !== 0) {
          throw recoveryError(namespace, rawMeta, 'records exist without learner metadata');
        }
        return null;
      }
      const meta = requireValidMeta(namespace, rawMeta);
      if (!rawAttempts.every(isAttempt) || !rawSessions.every(isSession)) {
        throw recoveryError(namespace, rawMeta, 'stored attempt or session record is malformed');
      }
      return canonicalEnvelope(meta, rawAttempts, rawSessions);
    } catch (error) {
      mapError(error, namespace);
    }
  }

  async commitCheckpoint(write: CheckpointWrite): Promise<{ revision: number; duplicate: boolean }> {
    const { database, namespace } = this.requireOpen();
    if (controlsState.quota) throw storeError('QUOTA_EXCEEDED', namespace, 'injected quota failure');
    const transaction = database.transaction(
      ['meta', 'attempts', 'sessions', 'idempotency'],
      'readwrite',
    );
    try {
      const duplicate = await transaction.objectStore('idempotency').get(write.idempotencyKey);
      const storedMeta = await transaction.objectStore('meta').get('learner');
      if (storedMeta === undefined) {
        const [attemptCount, sessionCount, idempotencyCount] = await Promise.all([
          transaction.objectStore('attempts').count(),
          transaction.objectStore('sessions').count(),
          transaction.objectStore('idempotency').count(),
        ]);
        if (attemptCount !== 0 || sessionCount !== 0 || idempotencyCount !== 0) {
          throw recoveryError(namespace, storedMeta, 'records exist without learner metadata');
        }
      }
      const current = storedMeta === undefined ? defaultMeta() : requireValidMeta(namespace, storedMeta);
      if (duplicate !== undefined) {
        await transaction.done;
        return { revision: current.revision, duplicate: true };
      }
      if (current.revision !== write.expectedRevision) {
        transaction.abort();
        await transaction.done.catch(() => undefined);
        throw storeError(
          'REVISION_CONFLICT',
          namespace,
          `expected revision ${write.expectedRevision}, found ${current.revision}`,
        );
      }
      for (const attempt of write.attempts) await transaction.objectStore('attempts').put(attempt);
      if (write.sessionSummary !== null) await transaction.objectStore('sessions').put(write.sessionSummary);
      await transaction.objectStore('idempotency').put({ idempotencyKey: write.idempotencyKey });
      await transaction.objectStore('meta').put({ ...current, revision: current.revision + 1 });
      if (controlsState.abortWrite) {
        controlsState.abortWrite = false;
        transaction.abort();
        await transaction.done.catch(() => undefined);
        throw storeError('WRITE_ABORTED', namespace, 'injected checkpoint abort');
      }
      await transaction.done;
      return { revision: current.revision + 1, duplicate: false };
    } catch (error) {
      try {
        transaction.abort();
      } catch {
        // The transaction may already have completed or aborted.
      }
      await transaction.done.catch(() => undefined);
      mapError(error, namespace, 'WRITE_ABORTED');
    }
  }

  async exportJson(): Promise<string> {
    return JSON.stringify(await this.load());
  }

  async reset(): Promise<void> {
    const { database, namespace } = this.requireOpen();
    try {
      const transaction = database.transaction(
        ['meta', 'attempts', 'sessions', 'idempotency'],
        'readwrite',
      );
      const completion = transaction.done;
      await Promise.all([
        transaction.objectStore('meta').clear(),
        transaction.objectStore('attempts').clear(),
        transaction.objectStore('sessions').clear(),
        transaction.objectStore('idempotency').clear(),
        completion,
      ]);
    } catch (error) {
      mapError(error, namespace, 'WRITE_ABORTED');
    }
  }

  async close(): Promise<void> {
    this.database?.close();
    this.database = null;
    this.namespace = null;
  }
}

function rawParts(value: unknown): {
  meta: Record<string, unknown>;
  attempts: unknown[];
  sessions: unknown[];
  idempotencyKeys: string[];
} {
  if (!isRecord(value)) return { meta: {}, attempts: [], sessions: [], idempotencyKeys: [] };
  const {
    attempts: rawAttempts,
    sessions: rawSessions,
    idempotencyKeys: rawIdempotencyKeys,
    ...meta
  } = value;
  return {
    meta,
    attempts: Array.isArray(rawAttempts) ? rawAttempts : [],
    sessions: Array.isArray(rawSessions) ? rawSessions : [],
    idempotencyKeys: Array.isArray(rawIdempotencyKeys)
      ? rawIdempotencyKeys.filter((key): key is string => typeof key === 'string')
      : [],
  };
}

async function injectRawEnvelope(namespace: string, value: unknown): Promise<void> {
  try {
    await deleteDB(namespace);
  } catch (error) {
    mapError(error, namespace);
  }
  const databaseVersion = isRecord(value) && value.schemaVersion === 1 ? 1 : DATABASE_VERSION;
  let database: IDBPDatabase<ResearchDb>;
  try {
    database = await openDB<ResearchDb>(namespace, databaseVersion, {
      upgrade(createdDatabase, _oldVersion, _newVersion, transaction) {
        void transaction.done.catch(() => undefined);
        createStores(createdDatabase);
      },
    });
  } catch (error) {
    mapError(error, namespace);
  }
  try {
    const transaction = database.transaction([...STORE_NAMES], 'readwrite');
    const completion = transaction.done;
    const parts = rawParts(value);
    try {
      await transaction.objectStore('meta').put({ ...parts.meta, key: 'learner' } as unknown as MetaRecord);
      for (const attempt of parts.attempts) {
        await transaction.objectStore('attempts').put(attempt as ResearchAttempt);
      }
      for (const session of parts.sessions) {
        await transaction.objectStore('sessions').put(session as ResearchSessionSummary);
      }
      for (const idempotencyKey of parts.idempotencyKeys) {
        await transaction.objectStore('idempotency').put({ idempotencyKey });
      }
      await completion;
    } catch (error) {
      try {
        transaction.abort();
      } catch {
        // The injection transaction may already have aborted.
      }
      await completion.catch(() => undefined);
      throw error;
    }
  } catch (error) {
    mapError(error, namespace);
  } finally {
    database.close();
  }
}

async function inspectRawEnvelope(namespace: string): Promise<unknown> {
  let database: IDBPDatabase<ResearchDb>;
  try {
    database = await openDB<ResearchDb>(namespace);
  } catch (error) {
    mapError(error, namespace);
  }
  try {
    const transaction = database.transaction([...STORE_NAMES], 'readonly');
    const [rawMeta, attempts, sessions, idempotency] = await Promise.all([
      transaction.objectStore('meta').get('learner'),
      transaction.objectStore('attempts').getAll(),
      transaction.objectStore('sessions').getAll(),
      transaction.objectStore('idempotency').getAll(),
      transaction.done,
    ]);
    const { key: _key, ...meta } = isRecord(rawMeta) ? rawMeta : {};
    return {
      databaseVersion: database.version,
      ...meta,
      attempts: [...attempts].sort((left, right) =>
        String(left.attemptId).localeCompare(String(right.attemptId))),
      sessions: [...sessions].sort((left, right) =>
        String(left.sessionId).localeCompare(String(right.sessionId))),
      idempotencyKeys: idempotency
        .map((record) => record.idempotencyKey)
        .sort((left, right) => left.localeCompare(right)),
    };
  } catch (error) {
    mapError(error, namespace);
  } finally {
    database.close();
  }
}

const controls: ResearchFailureControls = {
  abortNextWrite: () => { controlsState.abortWrite = true; },
  abortNextUpgrade: () => { controlsState.abortUpgrade = true; },
  injectRawEnvelope,
  inspectRawEnvelope,
  setQuotaError: (enabled) => { controlsState.quota = enabled; },
  setUnavailable: (enabled) => { controlsState.unavailable = enabled; },
};

export const idbFactory: ResearchAdapterFactory = {
  id: 'idb',
  create: () => new IdbProgressStore(),
  controls,
};
