import Dexie, { type EntityTable } from 'dexie';
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

class ResearchDexie extends Dexie {
  meta!: EntityTable<MetaRecord, 'key'>;
  attempts!: EntityTable<ResearchAttempt, 'attemptId'>;
  sessions!: EntityTable<ResearchSessionSummary, 'sessionId'>;
  idempotency!: EntityTable<IdempotencyRecord, 'idempotencyKey'>;

  constructor(namespace: string) {
    super(namespace);
    this.version(2).stores({
      meta: '&key',
      attempts: '&attemptId, sessionId',
      sessions: '&sessionId',
      idempotency: '&idempotencyKey',
    });
  }
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
  if (error instanceof Dexie.QuotaExceededError) {
    throw new ResearchStoreError('QUOTA_EXCEEDED', error.message);
  }
  throw new ResearchStoreError(
    fallback,
    error instanceof Error ? error.message : String(error),
  );
}

async function migratePayload(database: ResearchDexie): Promise<void> {
  try {
    await database.transaction('rw', database.meta, database.attempts, async () => {
      const rawMeta = await database.meta.get('learner') as unknown as Record<string, unknown> | undefined;
      if (rawMeta?.schemaVersion !== 1) return;

      const attempts = await database.attempts.toArray() as unknown as Array<Record<string, unknown>>;
      await database.attempts.bulkPut(
        attempts.map((attempt) => ({ ...attempt, assistance: 'none' } as unknown as ResearchAttempt)),
      );
      await database.meta.put({
        ...rawMeta,
        key: 'learner',
        schemaVersion: 2,
        reducerVersion: RESEARCH_REDUCER_VERSION,
      } as unknown as MetaRecord);
      if (controlsState.abortUpgrade) {
        controlsState.abortUpgrade = false;
        throw new ResearchStoreError('UPGRADE_ABORTED', 'injected migration abort');
      }
    });
  } catch (error) {
    mapError(error, 'UPGRADE_ABORTED');
  }
}

class DexieProgressStore implements ResearchProgressStore {
  private database: ResearchDexie | null = null;

  async open(namespace: string): Promise<void> {
    if (controlsState.unavailable) throw new ResearchStoreError('STORAGE_UNAVAILABLE', 'injected storage unavailable');
    this.database?.close();
    this.database = new ResearchDexie(namespace);
    try {
      await this.database.open();
      await migratePayload(this.database);
    } catch (error) {
      this.database.close();
      this.database = null;
      mapError(error);
    }
  }

  private requireDatabase(): ResearchDexie {
    if (this.database === null) throw new ResearchStoreError('STORAGE_UNAVAILABLE', 'store is not open');
    return this.database;
  }

  async load(): Promise<ResearchEnvelope | null> {
    const database = this.requireDatabase();
    try {
      const [meta, attempts, sessions] = await database.transaction(
        'r',
        database.meta,
        database.attempts,
        database.sessions,
        async () => Promise.all([
          database.meta.get('learner'),
          database.attempts.toArray(),
          database.sessions.toArray(),
        ]),
      );
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
    const database = this.requireDatabase();
    try {
      return await database.transaction(
        'rw',
        database.meta,
        database.attempts,
        database.sessions,
        database.idempotency,
        async () => {
          const duplicate = await database.idempotency.get(write.idempotencyKey);
          const storedMeta = await database.meta.get('learner');
          if (storedMeta === undefined) {
            const [attemptCount, sessionCount, idempotencyCount] = await Promise.all([
              database.attempts.count(),
              database.sessions.count(),
              database.idempotency.count(),
            ]);
            if (attemptCount !== 0 || sessionCount !== 0 || idempotencyCount !== 0) {
              throw new ResearchStoreError('RECOVERY_REQUIRED', 'records exist without learner metadata');
            }
          }
          const current = storedMeta === undefined ? defaultMeta() : requireValidMeta(storedMeta);
          if (duplicate !== undefined) return { revision: current.revision, duplicate: true };
          if (current.revision !== write.expectedRevision) {
            throw new ResearchStoreError(
              'REVISION_CONFLICT',
              `expected revision ${write.expectedRevision}, found ${current.revision}`,
            );
          }
          await database.attempts.bulkPut(write.attempts);
          if (write.sessionSummary !== null) await database.sessions.put(write.sessionSummary);
          await database.idempotency.put({ idempotencyKey: write.idempotencyKey });
          await database.meta.put({ ...current, revision: current.revision + 1 });
          if (controlsState.abortWrite) {
            controlsState.abortWrite = false;
            throw new ResearchStoreError('WRITE_ABORTED', 'injected checkpoint abort');
          }
          return { revision: current.revision + 1, duplicate: false };
        },
      );
    } catch (error) {
      mapError(error, 'WRITE_ABORTED');
    }
  }

  async exportJson(): Promise<string> {
    return JSON.stringify(await this.load());
  }

  async reset(): Promise<void> {
    const database = this.requireDatabase();
    try {
      await database.transaction(
        'rw',
        database.meta,
        database.attempts,
        database.sessions,
        database.idempotency,
        async () => Promise.all([
          database.meta.clear(),
          database.attempts.clear(),
          database.sessions.clear(),
          database.idempotency.clear(),
        ]),
      );
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
  await Dexie.delete(namespace);
  const database = new ResearchDexie(namespace);
  try {
    await database.open();
    const raw = value as Record<string, unknown>;
    const { attempts, sessions, idempotencyKeys, ...rawMeta } = raw;
    await database.transaction(
      'rw',
      database.meta,
      database.attempts,
      database.sessions,
      database.idempotency,
      async () => {
        await database.meta.put({ ...rawMeta, key: 'learner' } as unknown as MetaRecord);
        if (Array.isArray(attempts)) {
          await database.attempts.bulkPut(attempts as ResearchAttempt[]);
        }
        if (Array.isArray(sessions)) {
          await database.sessions.bulkPut(sessions as ResearchSessionSummary[]);
        }
        if (Array.isArray(idempotencyKeys)) {
          await database.idempotency.bulkPut(
            idempotencyKeys.map((idempotencyKey) => ({ idempotencyKey: String(idempotencyKey) })),
          );
        }
      },
    );
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

export const dexieFactory: ResearchAdapterFactory = {
  id: 'dexie',
  create: () => new DexieProgressStore(),
  controls,
};
