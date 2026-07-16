export type ResearchAttempt = {
  attemptId: string;
  sessionId: string;
  occurredAt: string;
  activityId: string;
  decision: string;
  correct: boolean;
  responseMs: number;
  assistance: 'none';
};

export type ResearchSessionSummary = {
  sessionId: string;
  startedAt: string;
  endedAt: string;
  attemptCount: number;
  correctCount: number;
};

export type ResearchEnvelope = {
  schemaVersion: number;
  learnerId: string;
  revision: number;
  reducerVersion: string;
  curriculumVersions: string[];
  attempts: ResearchAttempt[];
  sessions: ResearchSessionSummary[];
  cachedMastery: unknown | null;
};

export type CheckpointWrite = {
  idempotencyKey: string;
  expectedRevision: number;
  attempts: ResearchAttempt[];
  sessionSummary: ResearchSessionSummary | null;
};

export interface ResearchProgressStore {
  open(namespace: string): Promise<void>;
  load(): Promise<ResearchEnvelope | null>;
  commitCheckpoint(write: CheckpointWrite): Promise<{ revision: number; duplicate: boolean }>;
  exportJson(): Promise<string>;
  reset(): Promise<void>;
  close(): Promise<void>;
}

export type ResearchStoreErrorCode =
  | 'REVISION_CONFLICT'
  | 'WRITE_ABORTED'
  | 'UPGRADE_ABORTED'
  | 'RECOVERY_REQUIRED'
  | 'NEWER_SCHEMA'
  | 'QUOTA_EXCEEDED'
  | 'STORAGE_UNAVAILABLE';

export class ResearchStoreError extends Error {
  constructor(
    readonly code: ResearchStoreErrorCode,
    message: string,
  ) {
    super(message);
    this.name = 'ResearchStoreError';
  }
}

export interface ResearchFailureControls {
  abortNextWrite(): void;
  abortNextUpgrade(): void;
  injectRawEnvelope(namespace: string, value: unknown): Promise<void>;
  setQuotaError(enabled: boolean): void;
  setUnavailable(enabled: boolean): void;
}

export type CandidateId = 'memory' | 'local-storage' | 'native-indexeddb' | 'idb' | 'dexie';
export type BrowserId = 'chromium' | 'firefox' | 'webkit';
export type GateName =
  | 'empty-load'
  | 'reload-round-trip'
  | 'atomic-checkpoint'
  | 'idempotent-duplicate'
  | 'revision-conflict'
  | 'concurrent-writers'
  | 'stable-export'
  | 'complete-reset'
  | 'upgrade-v1-v2'
  | 'aborted-upgrade-recovery'
  | 'malformed-record-recovery'
  | 'newer-schema-refusal'
  | 'quota-error-surface'
  | 'unavailable-storage-surface';

export type GateResult = {
  gate: GateName;
  passed: boolean;
  evidenceKind: 'OBSERVED' | 'SYNTHETIC';
  detail: string;
};

export type TimingResult = {
  workload: 'small' | 'medium' | 'stress';
  operation: 'open' | 'load' | 'commit' | 'export' | 'reset';
  samples: number[];
  p50Ms: number;
  p95Ms: number;
  maxMs: number;
};

export interface ResearchAdapterFactory {
  id: CandidateId;
  create(): ResearchProgressStore;
  controls: ResearchFailureControls;
}

export type CandidateBrowserResult = {
  browser: BrowserId;
  candidate: CandidateId;
  gates: GateResult[];
  timings: TimingResult[];
  fixtureBytes: Record<'small' | 'medium' | 'stress', number>;
  exportBytes: Record<'small' | 'medium' | 'stress', number>;
};

export type BrowserSuiteResult = {
  candidates: Array<Omit<CandidateBrowserResult, 'browser'>>;
};

export type ResearchResultFile = {
  schemaVersion: 1;
  generatedAtUtc: string;
  commit: string;
  nodeVersion: string;
  packages: { idb: '8.0.3'; dexie: '4.4.4'; playwright: string };
  browsers: Array<{ id: BrowserId; version: string; userAgent: string }>;
  candidates: Array<{ id: CandidateId; role: 'baseline' | 'full-benchmark' }>;
  runs: CandidateBrowserResult[];
};

export const GATE_NAMES: readonly GateName[] = [
  'empty-load',
  'reload-round-trip',
  'atomic-checkpoint',
  'idempotent-duplicate',
  'revision-conflict',
  'concurrent-writers',
  'stable-export',
  'complete-reset',
  'upgrade-v1-v2',
  'aborted-upgrade-recovery',
  'malformed-record-recovery',
  'newer-schema-refusal',
  'quota-error-surface',
  'unavailable-storage-surface',
];
