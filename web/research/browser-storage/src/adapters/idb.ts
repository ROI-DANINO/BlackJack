import { deleteDB, openDB, type DBSchema, type IDBPDatabase } from 'idb';
import {
  ResearchStoreError,
  type CheckpointWrite,
  type ResearchAdapterFactory,
  type ResearchAttempt,
  type ResearchEnvelope,
  type ResearchFailureControls,
  type ResearchProgressStore,
  type ResearchSessionSummary,
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
    curriculumVersions: Array.isArray(meta.curriculumVersions)
      ? [...meta.curriculumVersions].sort((left, right) => left.localeCompare(right))
      : meta.curriculumVersions,
    attempts: attempts.sort((left, right) => String(left.attemptId).localeCompare(String(right.attemptId))),
    sessions: sessions.sort((left, right) => String(left.sessionId).localeCompare(String(right.sessionId))),
    cachedMastery: meta.cachedMastery,
  };
}

function requireValidEnvelope(value: ResearchEnvelope): ResearchEnvelope {
  requireValidMeta(value);
  const valid = Array.isArray(value.attempts)
    && value.attempts.every((attempt: unknown): attempt is ResearchAttempt =>
      isRecord(attempt)
      && typeof attempt.attemptId === 'string'
      && typeof attempt.sessionId === 'string'
      && typeof attempt.occurredAt === 'string'
      && typeof attempt.activityId === 'string'
      && typeof attempt.decision === 'string'
      && typeof attempt.correct === 'boolean'
      && typeof attempt.responseMs === 'number'
      && Number.isFinite(attempt.responseMs)
      && attempt.assistance === 'none')
    && Array.isArray(value.sessions)
    && value.sessions.every((session: unknown): session is ResearchSessionSummary =>
      isRecord(session)
      && typeof session.sessionId === 'string'
      && typeof session.startedAt === 'string'
      && typeof session.endedAt === 'string'
      && typeof session.attemptCount === 'number'
      && typeof session.correctCount === 'number'
      && Number.isInteger(session.attemptCount)
      && Number.isInteger(session.correctCount)
      && session.attemptCount >= 0
      && session.correctCount >= 0);
  if (!valid) throw new ResearchStoreError('RECOVERY_REQUIRED', 'stored learner envelope is malformed');
  return value;
}

function requireValidMeta<T extends {
  schemaVersion: number;
  learnerId: string;
  revision: number;
  reducerVersion: string;
  curriculumVersions: string[];
}>(meta: T): T {
  if (meta.schemaVersion > 2) {
    throw new ResearchStoreError('NEWER_SCHEMA', `schema ${meta.schemaVersion} requires a newer app`);
  }
  const valid = meta.schemaVersion === 2
    && typeof meta.learnerId === 'string'
    && Number.isInteger(meta.revision)
    && meta.revision >= 0
    && typeof meta.reducerVersion === 'string'
    && Array.isArray(meta.curriculumVersions)
    && meta.curriculumVersions.every((version) => typeof version === 'string');
  if (!valid) throw new ResearchStoreError('RECOVERY_REQUIRED', 'stored learner metadata is malformed');
  return meta;
}

function mapError(
  error: unknown,
  fallback: 'STORAGE_UNAVAILABLE' | 'WRITE_ABORTED' | 'UPGRADE_ABORTED' = 'STORAGE_UNAVAILABLE',
): never {
  if (error instanceof ResearchStoreError) throw error;
  if (error instanceof DOMException && error.name === 'QuotaExceededError') {
    throw new ResearchStoreError('QUOTA_EXCEEDED', error.message);
  }
  throw new ResearchStoreError(
    fallback,
    error instanceof Error ? error.message : String(error),
  );
}

async function openDatabase(namespace: string): Promise<IDBPDatabase<ResearchDb>> {
  return openDB<ResearchDb>(namespace, 2, {
    upgrade(database) {
      createStores(database);
    },
  });
}

async function migratePayload(database: IDBPDatabase<ResearchDb>): Promise<void> {
  const transaction = database.transaction(['meta', 'attempts'], 'readwrite');
  try {
    const rawMeta = await transaction.objectStore('meta').get('learner') as unknown as Record<string, unknown> | undefined;
    if (rawMeta?.schemaVersion !== 1) {
      await transaction.done;
      return;
    }
    const attempts = await transaction.objectStore('attempts').getAll() as unknown as Array<Record<string, unknown>>;
    for (const attempt of attempts) {
      await transaction.objectStore('attempts').put({ ...attempt, assistance: 'none' } as unknown as ResearchAttempt);
    }
    await transaction.objectStore('meta').put({
      ...rawMeta,
      key: 'learner',
      schemaVersion: 2,
      reducerVersion: RESEARCH_REDUCER_VERSION,
    } as unknown as MetaRecord);
    if (controlsState.abortUpgrade) {
      controlsState.abortUpgrade = false;
      transaction.abort();
      await transaction.done.catch(() => undefined);
      throw new ResearchStoreError('UPGRADE_ABORTED', 'injected migration abort');
    }
    await transaction.done;
  } catch (error) {
    mapError(error, 'UPGRADE_ABORTED');
  }
}

class IdbProgressStore implements ResearchProgressStore {
  private database: IDBPDatabase<ResearchDb> | null = null;

  async open(namespace: string): Promise<void> {
    if (controlsState.unavailable) throw new ResearchStoreError('STORAGE_UNAVAILABLE', 'injected storage unavailable');
    this.database?.close();
    this.database = null;
    try {
      this.database = await openDatabase(namespace);
      await migratePayload(this.database);
    } catch (error) {
      this.database?.close();
      this.database = null;
      mapError(error);
    }
  }

  private requireDatabase(): IDBPDatabase<ResearchDb> {
    if (this.database === null) throw new ResearchStoreError('STORAGE_UNAVAILABLE', 'store is not open');
    return this.database;
  }

  async load(): Promise<ResearchEnvelope | null> {
    try {
      const transaction = this.requireDatabase().transaction(['meta', 'attempts', 'sessions'], 'readonly');
      const [meta, attempts, sessions] = await Promise.all([
        transaction.objectStore('meta').get('learner'),
        transaction.objectStore('attempts').getAll(),
        transaction.objectStore('sessions').getAll(),
      ]);
      await transaction.done;
      if (meta === undefined) {
        if (attempts.length !== 0 || sessions.length !== 0) {
          throw new ResearchStoreError('RECOVERY_REQUIRED', 'records exist without learner metadata');
        }
        return null;
      }
      return requireValidEnvelope(canonicalEnvelope(meta, attempts, sessions));
    } catch (error) {
      mapError(error);
    }
  }

  async commitCheckpoint(write: CheckpointWrite): Promise<{ revision: number; duplicate: boolean }> {
    if (controlsState.quota) throw new ResearchStoreError('QUOTA_EXCEEDED', 'injected quota failure');
    const transaction = this.requireDatabase().transaction(
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
          throw new ResearchStoreError('RECOVERY_REQUIRED', 'records exist without learner metadata');
        }
      }
      const current = storedMeta === undefined ? defaultMeta() : requireValidMeta(storedMeta);
      if (duplicate !== undefined) {
        await transaction.done;
        return { revision: current.revision, duplicate: true };
      }
      if (current.revision !== write.expectedRevision) {
        transaction.abort();
        await transaction.done.catch(() => undefined);
        throw new ResearchStoreError(
          'REVISION_CONFLICT',
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
        throw new ResearchStoreError('WRITE_ABORTED', 'injected checkpoint abort');
      }
      await transaction.done;
      return { revision: current.revision + 1, duplicate: false };
    } catch (error) {
      mapError(error, 'WRITE_ABORTED');
    }
  }

  async exportJson(): Promise<string> {
    return JSON.stringify(await this.load());
  }

  async reset(): Promise<void> {
    try {
      const transaction = this.requireDatabase().transaction(
        ['meta', 'attempts', 'sessions', 'idempotency'],
        'readwrite',
      );
      await Promise.all([
        transaction.objectStore('meta').clear(),
        transaction.objectStore('attempts').clear(),
        transaction.objectStore('sessions').clear(),
        transaction.objectStore('idempotency').clear(),
      ]);
      await transaction.done;
    } catch (error) {
      mapError(error, 'WRITE_ABORTED');
    }
  }

  async close(): Promise<void> {
    this.database?.close();
    this.database = null;
  }
}

async function injectRawEnvelope(namespace: string, value: unknown): Promise<void> {
  await deleteDB(namespace);
  const database = await openDatabase(namespace);
  try {
    const transaction = database.transaction(['meta', 'attempts', 'sessions', 'idempotency'], 'readwrite');
    const raw = value as Record<string, unknown>;
    const { attempts, sessions, idempotencyKeys, ...rawMeta } = raw;
    await transaction.objectStore('meta').put({ ...rawMeta, key: 'learner' } as unknown as MetaRecord);
    for (const attempt of Array.isArray(attempts) ? attempts : []) {
      await transaction.objectStore('attempts').put(attempt as ResearchAttempt);
    }
    for (const session of Array.isArray(sessions) ? sessions : []) {
      await transaction.objectStore('sessions').put(session as ResearchSessionSummary);
    }
    for (const key of Array.isArray(idempotencyKeys) ? idempotencyKeys : []) {
      await transaction.objectStore('idempotency').put({ idempotencyKey: String(key) });
    }
    await transaction.done;
  } finally {
    database.close();
  }
}

const controls: ResearchFailureControls = {
  abortNextWrite: () => { controlsState.abortWrite = true; },
  abortNextUpgrade: () => { controlsState.abortUpgrade = true; },
  injectRawEnvelope,
  setQuotaError: (enabled) => { controlsState.quota = enabled; },
  setUnavailable: (enabled) => { controlsState.unavailable = enabled; },
};

export const idbFactory: ResearchAdapterFactory = {
  id: 'idb',
  create: () => new IdbProgressStore(),
  controls,
};
