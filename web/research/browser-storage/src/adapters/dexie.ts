import Dexie, { type EntityTable, type Table } from 'dexie';
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

const TABLE_SCHEMA = {
  meta: '&key',
  attempts: '&attemptId, sessionId',
  sessions: '&sessionId',
  idempotency: '&idempotencyKey',
} as const;

class ResearchDexie extends Dexie {
  meta!: EntityTable<MetaRecord, 'key'>;
  attempts!: EntityTable<ResearchAttempt, 'attemptId'>;
  sessions!: EntityTable<ResearchSessionSummary, 'sessionId'>;
  idempotency!: EntityTable<IdempotencyRecord, 'idempotencyKey'>;

  constructor(namespace: string) {
    super(namespace);
    this.version(1).stores(TABLE_SCHEMA);
    this.version(2).stores(TABLE_SCHEMA).upgrade(async (transaction) => {
      const attempts = transaction.table('attempts') as Table<Record<string, unknown>, string>;
      await attempts.toCollection().modify((attempt) => {
        if (!Object.hasOwn(attempt, 'assistance')) attempt.assistance = 'none';
      });
      if (controlsState.abortUpgrade) {
        controlsState.abortUpgrade = false;
        throw new ResearchStoreError('UPGRADE_ABORTED', 'injected v1 to v2 upgrade abort');
      }
      const meta = transaction.table('meta') as Table<Record<string, unknown>, string>;
      const rawMeta = await meta.get('learner');
      if (rawMeta?.schemaVersion === 1) {
        await meta.put({
          ...rawMeta,
          key: 'learner',
          schemaVersion: 2,
          reducerVersion: RESEARCH_REDUCER_VERSION,
        });
      }
    });
  }
}

class ResearchDexieV1 extends Dexie {
  meta!: Table<Record<string, unknown>, string>;
  attempts!: Table<Record<string, unknown>, string>;
  sessions!: Table<Record<string, unknown>, string>;
  idempotency!: Table<IdempotencyRecord, string>;

  constructor(namespace: string) {
    super(namespace);
    this.version(1).stores(TABLE_SCHEMA);
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

function detectedSchema(value: unknown): string {
  return isRecord(value) && typeof value.schemaVersion === 'number'
    ? String(value.schemaVersion)
    : 'unknown';
}

function recoveryError(
  namespace: string,
  code: 'RECOVERY_REQUIRED' | 'NEWER_SCHEMA',
  value: unknown,
  detail: string,
): ResearchStoreError {
  const actions = code === 'NEWER_SCHEMA'
    ? 'export-raw,upgrade-app'
    : 'export-raw,reset-with-confirmation';
  return new ResearchStoreError(
    code,
    `${detail}; namespace=${namespace}; detectedSchema=${detectedSchema(value)}; safeNextActions=${actions}`,
  );
}

function requireValidEnvelope(value: ResearchEnvelope, namespace: string): ResearchEnvelope {
  requireValidMeta(value, namespace);
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
  if (!valid) throw recoveryError(namespace, 'RECOVERY_REQUIRED', value, 'stored learner envelope is malformed');
  return value;
}

function requireValidMeta<T extends {
  schemaVersion: number;
  learnerId: string;
  revision: number;
  reducerVersion: string;
  curriculumVersions: string[];
}>(meta: T, namespace: string): T {
  if (meta.schemaVersion > 2) {
    throw recoveryError(namespace, 'NEWER_SCHEMA', meta, `schema ${meta.schemaVersion} requires a newer app`);
  }
  const valid = meta.schemaVersion === 2
    && typeof meta.learnerId === 'string'
    && Number.isInteger(meta.revision)
    && meta.revision >= 0
    && typeof meta.reducerVersion === 'string'
    && Array.isArray(meta.curriculumVersions)
    && meta.curriculumVersions.every((version) => typeof version === 'string');
  if (!valid) throw recoveryError(namespace, 'RECOVERY_REQUIRED', meta, 'stored learner metadata is malformed');
  return meta;
}

function mapError(
  error: unknown,
  fallback: 'STORAGE_UNAVAILABLE' | 'WRITE_ABORTED' | 'UPGRADE_ABORTED' = 'STORAGE_UNAVAILABLE',
): never {
  if (error instanceof ResearchStoreError) throw error;
  if (isRecord(error) && error.inner instanceof ResearchStoreError) throw error.inner;
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

class DexieProgressStore implements ResearchProgressStore {
  private database: ResearchDexie | null = null;
  private namespace: string | null = null;

  async open(namespace: string): Promise<void> {
    if (controlsState.unavailable) throw new ResearchStoreError('STORAGE_UNAVAILABLE', 'injected storage unavailable');
    this.database?.close();
    this.namespace = namespace;
    this.database = new ResearchDexie(namespace);
    try {
      await this.database.open();
    } catch (error) {
      this.database.close();
      this.database = null;
      this.namespace = null;
      mapError(error);
    }
  }

  private requireDatabase(): ResearchDexie {
    if (this.database === null) throw new ResearchStoreError('STORAGE_UNAVAILABLE', 'store is not open');
    return this.database;
  }

  private requireNamespace(): string {
    if (this.namespace === null) throw new ResearchStoreError('STORAGE_UNAVAILABLE', 'store is not open');
    return this.namespace;
  }

  async load(): Promise<ResearchEnvelope | null> {
    const database = this.requireDatabase();
    const namespace = this.requireNamespace();
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
          throw recoveryError(namespace, 'RECOVERY_REQUIRED', meta, 'records exist without learner metadata');
        }
        return null;
      }
      return requireValidEnvelope(canonicalEnvelope(meta, attempts, sessions), namespace);
    } catch (error) {
      mapError(error);
    }
  }

  async commitCheckpoint(write: CheckpointWrite): Promise<{ revision: number; duplicate: boolean }> {
    if (controlsState.quota) throw new ResearchStoreError('QUOTA_EXCEEDED', 'injected quota failure');
    const database = this.requireDatabase();
    const namespace = this.requireNamespace();
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
              throw recoveryError(namespace, 'RECOVERY_REQUIRED', storedMeta, 'records exist without learner metadata');
            }
          }
          const current = storedMeta === undefined ? defaultMeta() : requireValidMeta(storedMeta, namespace);
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
    this.namespace = null;
  }
}

async function injectRawEnvelope(namespace: string, value: unknown): Promise<void> {
  await Dexie.delete(namespace);
  const raw = value as Record<string, unknown>;
  const isVersionOne = raw.schemaVersion === 1;
  const database: Dexie = isVersionOne ? new ResearchDexieV1(namespace) : new ResearchDexie(namespace);
  try {
    await database.open();
    const { attempts, sessions, idempotencyKeys, ...rawMeta } = raw;
    const meta = database.table<Record<string, unknown>, string>('meta');
    const attemptTable = database.table<Record<string, unknown>, string>('attempts');
    const sessionTable = database.table<Record<string, unknown>, string>('sessions');
    const idempotency = database.table<IdempotencyRecord, string>('idempotency');
    await database.transaction(
      'rw',
      meta,
      attemptTable,
      sessionTable,
      idempotency,
      async () => {
        await meta.put({ ...rawMeta, key: 'learner' });
        if (Array.isArray(attempts)) {
          await attemptTable.bulkPut(attempts as Array<Record<string, unknown>>);
        }
        if (Array.isArray(sessions)) {
          await sessionTable.bulkPut(sessions as Array<Record<string, unknown>>);
        }
        if (Array.isArray(idempotencyKeys)) {
          await idempotency.bulkPut(
            idempotencyKeys.map((idempotencyKey) => ({ idempotencyKey: String(idempotencyKey) })),
          );
        }
      },
    );
  } finally {
    database.close();
  }
}

async function inspectRawEnvelope(namespace: string): Promise<unknown> {
  const logicalVersion = await new Promise<number>((resolve, reject) => {
    const request = indexedDB.open(namespace);
    request.onsuccess = () => {
      const nativeDatabase = request.result;
      const version = nativeDatabase.version / 10;
      nativeDatabase.close();
      resolve(version);
    };
    request.onerror = () => reject(request.error ?? new Error('raw Dexie inspection open failed'));
  });
  const database: Dexie = logicalVersion === 1
    ? new ResearchDexieV1(namespace)
    : new ResearchDexie(namespace);
  try {
    await database.open();
    const metaTable = database.table<Record<string, unknown>, string>('meta');
    const attemptTable = database.table<Record<string, unknown>, string>('attempts');
    const sessionTable = database.table<Record<string, unknown>, string>('sessions');
    const idempotencyTable = database.table<IdempotencyRecord, string>('idempotency');
    const [meta, attempts, sessions, idempotency] = await database.transaction(
      'r',
      metaTable,
      attemptTable,
      sessionTable,
      idempotencyTable,
      async () => Promise.all([
        metaTable.get('learner'),
        attemptTable.toArray(),
        sessionTable.toArray(),
        idempotencyTable.toArray(),
      ]),
    );
    if (meta === undefined) return null;
    const { key: _key, ...rawMeta } = meta;
    return {
      databaseVersion: logicalVersion,
      ...rawMeta,
      attempts: attempts.sort((left, right) => String(left.attemptId).localeCompare(String(right.attemptId))),
      sessions: sessions.sort((left, right) => String(left.sessionId).localeCompare(String(right.sessionId))),
      idempotencyKeys: idempotency
        .map((record) => record.idempotencyKey)
        .sort((left, right) => left.localeCompare(right)),
    };
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

export const dexieFactory: ResearchAdapterFactory = {
  id: 'dexie',
  create: () => new DexieProgressStore(),
  controls,
};
