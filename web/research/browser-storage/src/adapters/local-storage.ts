import {
  ResearchStoreError,
  type CheckpointWrite,
  type ResearchAdapterFactory,
  type ResearchAttempt,
  type ResearchEnvelope,
  type ResearchProgressStore,
  type ResearchSessionSummary,
} from '../contract';

let abortWrite = false;
let abortUpgrade = false;
let quotaError = false;
let unavailable = false;

const clone = <T>(value: T): T => structuredClone(value);
const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);
const envelopeKey = (namespace: string): string => `${namespace}:envelope`;
const idempotencyKey = (namespace: string): string => `${namespace}:idempotency-keys`;

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

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (!isObject(value)) return value;
  return Object.fromEntries(
    Object.keys(value).sort().map((key) => [key, canonicalize(value[key])]),
  );
}

function canonicalJson(value: unknown): string {
  return JSON.stringify(canonicalize(value));
}

function ensureAvailable(): void {
  if (unavailable) throw new ResearchStoreError('STORAGE_UNAVAILABLE', 'localStorage unavailable');
}

function readRaw(key: string): string | null {
  ensureAvailable();
  try {
    return localStorage.getItem(key);
  } catch (error) {
    throw new ResearchStoreError(
      'STORAGE_UNAVAILABLE',
      `localStorage read failed: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

function writeRaw(key: string, value: string): void {
  ensureAvailable();
  if (quotaError) throw new ResearchStoreError('QUOTA_EXCEEDED', 'injected localStorage quota error');
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    const code = error instanceof DOMException && error.name === 'QuotaExceededError'
      ? 'QUOTA_EXCEEDED'
      : 'STORAGE_UNAVAILABLE';
    throw new ResearchStoreError(
      code,
      `localStorage write failed: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

function removeRaw(key: string): void {
  ensureAvailable();
  try {
    localStorage.removeItem(key);
  } catch (error) {
    throw new ResearchStoreError(
      'STORAGE_UNAVAILABLE',
      `localStorage reset failed: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

function parseRawEnvelope(raw: string): unknown {
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return recovery('stored envelope is not valid JSON');
  }
}

function readIdempotencyKeys(namespace: string): Set<string> {
  const raw = readRaw(idempotencyKey(namespace));
  if (raw === null) return new Set();
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed) || parsed.some((key) => typeof key !== 'string')) {
      return recovery('invalid idempotency metadata');
    }
    return new Set(parsed as string[]);
  } catch (error) {
    if (error instanceof ResearchStoreError) throw error;
    return recovery('invalid idempotency metadata');
  }
}

function embeddedIdempotencyKeys(value: unknown): Set<string> {
  if (!isObject(value) || !Array.isArray(value.idempotencyKeys)) return new Set();
  return new Set(value.idempotencyKeys.filter((key): key is string => typeof key === 'string'));
}

function writeIdempotencyKeys(namespace: string, keys: Set<string>): void {
  writeRaw(idempotencyKey(namespace), canonicalJson([...keys].sort()));
}

class LocalStorageStore implements ResearchProgressStore {
  private namespace: string | null = null;

  async open(namespace: string): Promise<void> {
    ensureAvailable();
    this.namespace = namespace;
    const raw = readRaw(envelopeKey(namespace));
    if (raw === null) return;
    const value = parseRawEnvelope(raw);
    if (isObject(value) && value.schemaVersion === 1) {
      if (abortUpgrade) {
        abortUpgrade = false;
        throw new ResearchStoreError('UPGRADE_ABORTED', 'injected localStorage upgrade abort');
      }
      const migrated = parseEnvelope(value, 1);
      const keys = embeddedIdempotencyKeys(value);
      writeRaw(envelopeKey(namespace), canonicalJson(migrated));
      writeIdempotencyKeys(namespace, keys);
    }
  }

  async load(): Promise<ResearchEnvelope | null> {
    ensureAvailable();
    const raw = readRaw(envelopeKey(this.requireNamespace()));
    if (raw === null) return null;
    return clone(parseEnvelope(parseRawEnvelope(raw), 2));
  }

  async commitCheckpoint(write: CheckpointWrite): Promise<{ revision: number; duplicate: boolean }> {
    ensureAvailable();
    const namespace = this.requireNamespace();

    // This await deliberately leaves the cross-page read/check/write sequence unlocked.
    // The baseline must expose localStorage's real lost-update behavior, not simulate a transaction.
    const current = await this.load();
    const idempotencyKeys = readIdempotencyKeys(namespace);
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
    if (quotaError) throw new ResearchStoreError('QUOTA_EXCEEDED', 'injected localStorage quota error');

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

    // These synchronous calls are intentionally not protected by an in-process mutex.
    writeRaw(envelopeKey(namespace), canonicalJson(next));
    if (abortWrite) {
      abortWrite = false;
      throw new ResearchStoreError(
        'WRITE_ABORTED',
        'injected failure between non-atomic localStorage writes',
      );
    }
    writeIdempotencyKeys(namespace, nextKeys);
    return { revision: next.revision, duplicate: false };
  }

  async exportJson(): Promise<string> {
    return JSON.stringify(await this.load());
  }

  async reset(): Promise<void> {
    const namespace = this.requireNamespace();
    removeRaw(envelopeKey(namespace));
    removeRaw(idempotencyKey(namespace));
  }

  async close(): Promise<void> {
    this.namespace = null;
  }

  private requireNamespace(): string {
    if (this.namespace === null) {
      throw new ResearchStoreError('STORAGE_UNAVAILABLE', 'localStorage store is not open');
    }
    return this.namespace;
  }
}

export const localStorageFactory: ResearchAdapterFactory = {
  id: 'local-storage',
  create: () => new LocalStorageStore(),
  controls: {
    abortNextWrite: () => { abortWrite = true; },
    abortNextUpgrade: () => { abortUpgrade = true; },
    injectRawEnvelope: async (namespace, value) => {
      writeRaw(envelopeKey(namespace), canonicalJson(clone(value)));
      removeRaw(idempotencyKey(namespace));
    },
    setQuotaError: (enabled) => { quotaError = enabled; },
    setUnavailable: (enabled) => { unavailable = enabled; },
  },
};
