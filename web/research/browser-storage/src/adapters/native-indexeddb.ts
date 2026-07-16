import {
  ResearchStoreError,
  type CheckpointWrite,
  type ResearchAdapterFactory,
  type ResearchAttempt,
  type ResearchEnvelope,
  type ResearchProgressStore,
  type ResearchSessionSummary,
  type ResearchStoreErrorCode,
} from '../contract';
import {
  RESEARCH_CURRICULUM_VERSIONS,
  RESEARCH_LEARNER_ID,
  RESEARCH_REDUCER_VERSION,
} from '../fixtures';

const DATABASE_VERSION = 2;
const META_KEY = 'learner';
const STORE_NAMES = ['meta', 'attempts', 'sessions', 'idempotency'] as const;

type StoredMeta = {
  schemaVersion: number;
  learnerId: string;
  revision: number;
  reducerVersion: string;
  curriculumVersions: string[];
  cachedMastery: unknown | null;
};

type IdempotencyRecord = {
  idempotencyKey: string;
};

type FailureState = {
  abortWrite: boolean;
  abortUpgrade: boolean;
  quotaError: boolean;
  unavailable: boolean;
};

const failures: FailureState = {
  abortWrite: false,
  abortUpgrade: false,
  quotaError: false,
  unavailable: false,
};

function databaseName(namespace: string): string {
  return `blackjack-browser-storage:native-indexeddb:${namespace}`;
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
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

function parseMeta(namespace: string, value: unknown): StoredMeta {
  if (isRecord(value) && typeof value.schemaVersion === 'number' && value.schemaVersion > DATABASE_VERSION) {
    throw newerSchemaError(namespace, value);
  }
  if (!isRecord(value)
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
    schemaVersion: value.schemaVersion,
    learnerId: value.learnerId,
    revision: value.revision,
    reducerVersion: value.reducerVersion,
    curriculumVersions: [...value.curriculumVersions],
    cachedMastery: value.cachedMastery,
  };
}

function canonicalEnvelope(
  meta: StoredMeta,
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

function initialMeta(): StoredMeta {
  return {
    schemaVersion: DATABASE_VERSION,
    learnerId: RESEARCH_LEARNER_ID,
    revision: 0,
    reducerVersion: RESEARCH_REDUCER_VERSION,
    curriculumVersions: [...RESEARCH_CURRICULUM_VERSIONS],
    cachedMastery: null,
  };
}

function createStores(database: IDBDatabase): void {
  const meta = database.createObjectStore('meta');
  void meta;
  const attempts = database.createObjectStore('attempts', { keyPath: 'attemptId' });
  attempts.createIndex('sessionId', 'sessionId');
  database.createObjectStore('sessions', { keyPath: 'sessionId' });
  database.createObjectStore('idempotency', { keyPath: 'idempotencyKey' });
}

function requestResult<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('IndexedDB request failed'));
  });
}

function transactionCompletion(
  transaction: IDBTransaction,
  namespace: string,
  fallbackCode: ResearchStoreErrorCode,
  injectedError?: () => ResearchStoreError | undefined,
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const failure = (): ResearchStoreError => {
      const injected = injectedError?.();
      if (injected !== undefined) return injected;
      if (transaction.error?.name === 'QuotaExceededError') {
        return storeError('QUOTA_EXCEEDED', namespace, transaction.error.message);
      }
      return storeError(
        fallbackCode,
        namespace,
        transaction.error?.message ?? 'IndexedDB transaction failed',
      );
    };
    transaction.oncomplete = () => resolve();
    transaction.onabort = () => reject(failure());
    transaction.onerror = () => reject(failure());
  });
}

function migrateVersionOne(
  transaction: IDBTransaction,
  onInjectedAbort: () => void,
): void {
  const attempts = transaction.objectStore('attempts');
  const cursorRequest = attempts.openCursor();
  cursorRequest.onerror = () => transaction.abort();
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

    if (failures.abortUpgrade) {
      failures.abortUpgrade = false;
      onInjectedAbort();
      transaction.abort();
      return;
    }

    const metaStore = transaction.objectStore('meta');
    const metaRequest = metaStore.get(META_KEY);
    metaRequest.onerror = () => transaction.abort();
    metaRequest.onsuccess = () => {
      const rawMeta = metaRequest.result as unknown;
      if (!isRecord(rawMeta) || rawMeta.schemaVersion !== 1) {
        transaction.abort();
        return;
      }
      metaStore.put({
        ...rawMeta,
        schemaVersion: DATABASE_VERSION,
        reducerVersion: RESEARCH_REDUCER_VERSION,
      }, META_KEY);
    };
  };
}

function openDatabase(namespace: string): Promise<IDBDatabase> {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(databaseName(namespace), DATABASE_VERSION);
    let injectedUpgradeAbort = false;

    request.onupgradeneeded = (event) => {
      const oldVersion = event.oldVersion;
      const transaction = request.transaction;
      if (transaction === null) return;
      if (oldVersion === 0) {
        createStores(request.result);
        return;
      }
      if (oldVersion === 1) {
        migrateVersionOne(transaction, () => { injectedUpgradeAbort = true; });
      }
    };
    request.onsuccess = () => {
      const database = request.result;
      database.onversionchange = () => database.close();
      resolve(database);
    };
    request.onerror = () => reject(injectedUpgradeAbort
      ? storeError('UPGRADE_ABORTED', namespace, 'injected v1 to v2 upgrade abort')
      : storeError(
        'STORAGE_UNAVAILABLE',
        namespace,
        request.error?.message ?? 'IndexedDB open failed',
      ));
    request.onblocked = () => reject(storeError(
      'STORAGE_UNAVAILABLE',
      namespace,
      'IndexedDB open was blocked by another connection',
    ));
  });
}

function deleteDatabase(namespace: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const request = indexedDB.deleteDatabase(databaseName(namespace));
    request.onsuccess = () => resolve();
    request.onerror = () => reject(storeError(
      'STORAGE_UNAVAILABLE',
      namespace,
      request.error?.message ?? 'IndexedDB delete failed',
    ));
    request.onblocked = () => reject(storeError(
      'STORAGE_UNAVAILABLE',
      namespace,
      'IndexedDB delete was blocked by another connection',
    ));
  });
}

function rawParts(value: unknown): {
  meta: unknown;
  attempts: unknown[];
  sessions: unknown[];
  idempotencyKeys: string[];
} {
  if (!isRecord(value)) return { meta: value, attempts: [], sessions: [], idempotencyKeys: [] };
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
  await deleteDatabase(namespace);
  const schemaVersion = isRecord(value) && value.schemaVersion === 1 ? 1 : DATABASE_VERSION;
  const database = await new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(databaseName(namespace), schemaVersion);
    request.onupgradeneeded = () => createStores(request.result);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(storeError(
      'STORAGE_UNAVAILABLE',
      namespace,
      request.error?.message ?? 'raw IndexedDB injection open failed',
    ));
  });

  try {
    const transaction = database.transaction([...STORE_NAMES], 'readwrite');
    const completion = transactionCompletion(transaction, namespace, 'STORAGE_UNAVAILABLE');
    const parts = rawParts(value);
    transaction.objectStore('meta').put(parts.meta, META_KEY);
    for (const attempt of parts.attempts) transaction.objectStore('attempts').put(attempt);
    for (const session of parts.sessions) transaction.objectStore('sessions').put(session);
    for (const idempotencyKey of parts.idempotencyKeys) {
      transaction.objectStore('idempotency').put({ idempotencyKey } satisfies IdempotencyRecord);
    }
    await completion;
  } finally {
    database.close();
  }
}

class NativeIndexedDbStore implements ResearchProgressStore {
  private database: IDBDatabase | null = null;
  private namespace: string | null = null;

  async open(namespace: string): Promise<void> {
    if (failures.unavailable) {
      throw storeError('STORAGE_UNAVAILABLE', namespace, 'injected IndexedDB unavailability');
    }
    this.database?.close();
    this.database = null;
    this.namespace = namespace;
    this.database = await openDatabase(namespace);
  }

  async load(): Promise<ResearchEnvelope | null> {
    const { database, namespace } = this.requireOpen();
    const transaction = database.transaction(['meta', 'attempts', 'sessions'], 'readonly');
    const completion = transactionCompletion(transaction, namespace, 'STORAGE_UNAVAILABLE');
    const metaRequest = requestResult(transaction.objectStore('meta').get(META_KEY));
    const attemptRequest = requestResult(transaction.objectStore('attempts').getAll());
    const sessionRequest = requestResult(transaction.objectStore('sessions').getAll());
    const [rawMeta, rawAttempts, rawSessions] = await Promise.all([
      metaRequest,
      attemptRequest,
      sessionRequest,
      completion,
    ]);
    if (rawMeta === undefined) {
      if (rawAttempts.length !== 0 || rawSessions.length !== 0) {
        throw recoveryError(namespace, rawMeta, 'records exist without learner metadata');
      }
      return null;
    }
    const meta = parseMeta(namespace, rawMeta);
    if (!rawAttempts.every(isAttempt) || !rawSessions.every(isSession)) {
      throw recoveryError(namespace, rawMeta, 'stored attempt or session record is malformed');
    }
    return canonicalEnvelope(meta, rawAttempts, rawSessions);
  }

  async commitCheckpoint(write: CheckpointWrite): Promise<{ revision: number; duplicate: boolean }> {
    const { database, namespace } = this.requireOpen();
    if (failures.quotaError) {
      throw storeError('QUOTA_EXCEEDED', namespace, 'injected QuotaExceededError');
    }

    const transaction = database.transaction([...STORE_NAMES], 'readwrite');
    let injectedError: ResearchStoreError | undefined;
    const completion = transactionCompletion(
      transaction,
      namespace,
      'WRITE_ABORTED',
      () => injectedError,
    );
    const metaStore = transaction.objectStore('meta');
    const idempotencyStore = transaction.objectStore('idempotency');

    try {
      const [rawMeta, duplicateRecord] = await Promise.all([
        requestResult(metaStore.get(META_KEY)),
        requestResult(idempotencyStore.get(write.idempotencyKey)),
      ]);
      const meta = rawMeta === undefined ? initialMeta() : parseMeta(namespace, rawMeta);
      if (duplicateRecord !== undefined) {
        await completion;
        return { revision: meta.revision, duplicate: true };
      }
      if (meta.revision !== write.expectedRevision) {
        injectedError = storeError(
          'REVISION_CONFLICT',
          namespace,
          `expected revision ${write.expectedRevision}, found ${meta.revision}`,
        );
        transaction.abort();
        await completion;
        throw injectedError;
      }

      for (const attempt of write.attempts) transaction.objectStore('attempts').put(attempt);
      if (write.sessionSummary !== null) {
        transaction.objectStore('sessions').put(write.sessionSummary);
      }
      idempotencyStore.put({ idempotencyKey: write.idempotencyKey } satisfies IdempotencyRecord);
      metaStore.put({ ...meta, revision: meta.revision + 1 }, META_KEY);

      if (failures.abortWrite) {
        failures.abortWrite = false;
        injectedError = storeError('WRITE_ABORTED', namespace, 'injected checkpoint transaction abort');
        transaction.abort();
      }
      await completion;
      return { revision: meta.revision + 1, duplicate: false };
    } catch (error) {
      if (error instanceof ResearchStoreError) throw error;
      try {
        transaction.abort();
      } catch {
        // The transaction may already have completed or aborted.
      }
      try {
        await completion;
      } catch (transactionError) {
        if (injectedError !== undefined) throw injectedError;
        if (transactionError instanceof ResearchStoreError) throw transactionError;
      }
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        throw storeError('QUOTA_EXCEEDED', namespace, error.message);
      }
      throw storeError(
        'WRITE_ABORTED',
        namespace,
        error instanceof Error ? error.message : String(error),
      );
    }
  }

  async exportJson(): Promise<string> {
    const envelope = await this.load();
    return JSON.stringify(envelope);
  }

  async reset(): Promise<void> {
    const { database, namespace } = this.requireOpen();
    const transaction = database.transaction([...STORE_NAMES], 'readwrite');
    const completion = transactionCompletion(transaction, namespace, 'WRITE_ABORTED');
    for (const storeName of STORE_NAMES) transaction.objectStore(storeName).clear();
    await completion;
  }

  async close(): Promise<void> {
    this.database?.close();
    this.database = null;
    this.namespace = null;
  }

  private requireOpen(): { database: IDBDatabase; namespace: string } {
    if (this.database === null || this.namespace === null) {
      throw new ResearchStoreError('STORAGE_UNAVAILABLE', 'native IndexedDB store is not open');
    }
    return { database: this.database, namespace: this.namespace };
  }
}

export const nativeIndexedDbFactory: ResearchAdapterFactory = {
  id: 'native-indexeddb',
  create: () => new NativeIndexedDbStore(),
  controls: {
    abortNextWrite: () => { failures.abortWrite = true; },
    abortNextUpgrade: () => { failures.abortUpgrade = true; },
    injectRawEnvelope,
    setQuotaError: (enabled) => { failures.quotaError = enabled; },
    setUnavailable: (enabled) => { failures.unavailable = enabled; },
  },
};
