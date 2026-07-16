import {
  ResearchStoreError,
  type CheckpointWrite,
  type ResearchAdapterFactory,
  type ResearchAttempt,
  type ResearchEnvelope,
  type ResearchProgressStore,
  type ResearchSessionSummary,
} from '../contract';

type MemoryRecord = {
  envelope: unknown;
  idempotencyKeys: Set<string>;
};

const records = new Map<string, MemoryRecord>();
let abortWrite = false;
let abortUpgrade = false;
let quotaError = false;
let unavailable = false;

const clone = <T>(value: T): T => structuredClone(value);
const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

function recovery(detail: string): never {
  throw new ResearchStoreError('RECOVERY_REQUIRED', detail);
}

function requireString(value: unknown, field: string): string {
  if (typeof value !== 'string') recovery(`invalid ${field}`);
  return value;
}

function requireNonNegativeInteger(value: unknown, field: string): number {
  if (!Number.isInteger(value) || (value as number) < 0) recovery(`invalid ${field}`);
  return value as number;
}

function requireStringArray(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || value.some((entry) => typeof entry !== 'string')) {
    recovery(`invalid ${field}`);
  }
  return [...value] as string[];
}

function parseAttempt(value: unknown, migrating: boolean): ResearchAttempt {
  if (!isObject(value)) recovery('invalid attempt record');
  const assistance = migrating ? 'none' : value.assistance;
  if (assistance !== 'none' || typeof value.correct !== 'boolean') recovery('invalid attempt record');
  return {
    attemptId: requireString(value.attemptId, 'attemptId'),
    sessionId: requireString(value.sessionId, 'sessionId'),
    occurredAt: requireString(value.occurredAt, 'occurredAt'),
    activityId: requireString(value.activityId, 'activityId'),
    decision: requireString(value.decision, 'decision'),
    correct: value.correct,
    responseMs: requireNonNegativeInteger(value.responseMs, 'responseMs'),
    assistance,
  };
}

function parseSession(value: unknown): ResearchSessionSummary {
  if (!isObject(value)) recovery('invalid session record');
  return {
    sessionId: requireString(value.sessionId, 'sessionId'),
    startedAt: requireString(value.startedAt, 'startedAt'),
    endedAt: requireString(value.endedAt, 'endedAt'),
    attemptCount: requireNonNegativeInteger(value.attemptCount, 'attemptCount'),
    correctCount: requireNonNegativeInteger(value.correctCount, 'correctCount'),
  };
}

function parseEnvelope(value: unknown, expectedSchema: 1 | 2): ResearchEnvelope {
  if (!isObject(value)) recovery('stored envelope is not an object');
  if (typeof value.schemaVersion === 'number' && value.schemaVersion > 2) {
    throw new ResearchStoreError('NEWER_SCHEMA', `unsupported schema version ${value.schemaVersion}`);
  }
  if (value.schemaVersion !== expectedSchema) recovery('invalid schema version');
  if (!Array.isArray(value.attempts) || !Array.isArray(value.sessions)) {
    recovery('invalid record collections');
  }
  return normalizeEnvelope({
    schemaVersion: 2,
    learnerId: requireString(value.learnerId, 'learnerId'),
    revision: requireNonNegativeInteger(value.revision, 'revision'),
    reducerVersion: expectedSchema === 1
      ? 'research-reducer-v1'
      : requireString(value.reducerVersion, 'reducerVersion'),
    curriculumVersions: requireStringArray(value.curriculumVersions, 'curriculumVersions'),
    attempts: value.attempts.map((attempt) => parseAttempt(attempt, expectedSchema === 1)),
    sessions: value.sessions.map(parseSession),
    cachedMastery: clone(value.cachedMastery ?? null),
  });
}

function normalizeEnvelope(envelope: ResearchEnvelope): ResearchEnvelope {
  return {
    ...clone(envelope),
    curriculumVersions: [...envelope.curriculumVersions].sort(),
    attempts: [...envelope.attempts].sort((left, right) => left.attemptId.localeCompare(right.attemptId)),
    sessions: [...envelope.sessions].sort((left, right) => left.sessionId.localeCompare(right.sessionId)),
  };
}

function idempotencyKeysFromRaw(value: unknown): Set<string> {
  if (!isObject(value) || value.schemaVersion !== 1 || !Array.isArray(value.idempotencyKeys)) {
    return new Set();
  }
  return new Set(value.idempotencyKeys.filter((key): key is string => typeof key === 'string'));
}

function ensureAvailable(): void {
  if (unavailable) throw new ResearchStoreError('STORAGE_UNAVAILABLE', 'memory storage unavailable');
}

class MemoryStore implements ResearchProgressStore {
  private namespace: string | null = null;

  async open(namespace: string): Promise<void> {
    ensureAvailable();
    this.namespace = namespace;
    const record = records.get(namespace);
    if (isObject(record?.envelope) && record.envelope.schemaVersion === 1) {
      if (abortUpgrade) {
        abortUpgrade = false;
        throw new ResearchStoreError('UPGRADE_ABORTED', 'injected memory upgrade abort');
      }
      const migrated = parseEnvelope(record.envelope, 1);
      records.set(namespace, {
        envelope: clone(migrated),
        idempotencyKeys: new Set(record.idempotencyKeys),
      });
    }
  }

  async load(): Promise<ResearchEnvelope | null> {
    ensureAvailable();
    const record = records.get(this.requireNamespace());
    if (record === undefined) return null;
    return clone(parseEnvelope(record.envelope, 2));
  }

  async commitCheckpoint(write: CheckpointWrite): Promise<{ revision: number; duplicate: boolean }> {
    ensureAvailable();
    const namespace = this.requireNamespace();
    const record = records.get(namespace);
    const current = record === undefined ? null : parseEnvelope(record.envelope, 2);
    const idempotencyKeys = record?.idempotencyKeys ?? new Set<string>();
    if (idempotencyKeys.has(write.idempotencyKey)) {
      return { revision: current?.revision ?? 0, duplicate: true };
    }
    const revision = current?.revision ?? 0;
    if (revision !== write.expectedRevision) {
      throw new ResearchStoreError(
        'REVISION_CONFLICT',
        `expected revision ${write.expectedRevision}, received ${revision}`,
      );
    }
    if (abortWrite) {
      abortWrite = false;
      throw new ResearchStoreError('WRITE_ABORTED', 'injected memory write abort');
    }
    if (quotaError) throw new ResearchStoreError('QUOTA_EXCEEDED', 'injected memory quota error');

    const attempts = new Map((current?.attempts ?? []).map((attempt) => [attempt.attemptId, attempt]));
    for (const attempt of clone(write.attempts)) attempts.set(attempt.attemptId, attempt);
    const sessions = new Map((current?.sessions ?? []).map((session) => [session.sessionId, session]));
    if (write.sessionSummary !== null) {
      const session = clone(write.sessionSummary);
      sessions.set(session.sessionId, session);
    }
    const next = normalizeEnvelope({
      schemaVersion: 2,
      learnerId: current?.learnerId ?? 'device:00000000-0000-4000-8000-000000000001',
      revision: revision + 1,
      reducerVersion: current?.reducerVersion ?? 'research-reducer-v1',
      curriculumVersions: current?.curriculumVersions ?? ['basic-strategy-research-v1'],
      attempts: [...attempts.values()],
      sessions: [...sessions.values()],
      cachedMastery: current?.cachedMastery ?? null,
    });
    const nextKeys = new Set(idempotencyKeys);
    nextKeys.add(write.idempotencyKey);
    records.set(namespace, { envelope: clone(next), idempotencyKeys: nextKeys });
    return { revision: next.revision, duplicate: false };
  }

  async exportJson(): Promise<string> {
    return JSON.stringify(await this.load());
  }

  async reset(): Promise<void> {
    ensureAvailable();
    records.delete(this.requireNamespace());
  }

  async close(): Promise<void> {
    this.namespace = null;
  }

  private requireNamespace(): string {
    if (this.namespace === null) {
      throw new ResearchStoreError('STORAGE_UNAVAILABLE', 'memory store is not open');
    }
    return this.namespace;
  }
}

export const memoryFactory: ResearchAdapterFactory = {
  id: 'memory',
  create: () => new MemoryStore(),
  controls: {
    abortNextWrite: () => { abortWrite = true; },
    abortNextUpgrade: () => { abortUpgrade = true; },
    injectRawEnvelope: async (namespace, value) => {
      ensureAvailable();
      records.set(namespace, {
        envelope: clone(value),
        idempotencyKeys: idempotencyKeysFromRaw(value),
      });
    },
    setQuotaError: (enabled) => { quotaError = enabled; },
    setUnavailable: (enabled) => { unavailable = enabled; },
  },
};
