import {
  GATE_NAMES,
  ResearchStoreError,
  type BrowserSuiteResult,
  type CandidateBrowserResult,
  type GateName,
  type GateResult,
  type ResearchAdapterFactory,
  type ResearchEnvelope,
  type ResearchProgressStore,
  type ResearchStoreErrorCode,
  type TimingResult,
} from './contract';
import {
  buildMalformedFixture,
  buildMalformedAttemptFixture,
  buildSchemaV1Fixture,
  buildSchemaV2Fixture,
  buildUnsupportedSchemaFixture,
  checkpointFromFixture,
  checkpointsFromFixture,
  FIXTURE_TIERS,
  RESEARCH_CURRICULUM_VERSIONS,
  RESEARCH_LEARNER_ID,
  RESEARCH_MIGRATION_CACHED_MASTERY,
  RESEARCH_REDUCER_VERSION,
  type FixtureTier,
} from './fixtures';

const SYNTHETIC_GATES = new Set<GateName>([
  'atomic-checkpoint',
  'aborted-upgrade-recovery',
  'malformed-record-recovery',
  'newer-schema-refusal',
  'quota-error-surface',
  'unavailable-storage-surface',
]);

function assert(condition: unknown, detail: string): asserts condition {
  if (!condition) throw new Error(detail);
}

function assertStoreError(
  error: unknown,
  code: ResearchStoreErrorCode,
): asserts error is ResearchStoreError {
  assert(error instanceof ResearchStoreError, `expected typed ${code} error`);
  assert(error.code === code, `expected ${code}, received ${error.code}`);
}

async function expectStoreError(
  operation: () => Promise<unknown>,
  code: ResearchStoreErrorCode,
): Promise<ResearchStoreError> {
  try {
    await operation();
  } catch (error) {
    assertStoreError(error, code);
    return error;
  }
  throw new Error(`expected ${code} rejection`);
}

const FULL_CANDIDATES = new Set(['native-indexeddb', 'idb', 'dexie']);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (!isRecord(value)) return value;
  return Object.fromEntries(
    Object.keys(value).sort().map((key) => [key, canonicalize(value[key])]),
  );
}

function logicalJson(value: unknown): string {
  return JSON.stringify(canonicalize(value));
}

function expectedMigratedEnvelope(): ResearchEnvelope {
  return {
    ...buildSchemaV2Fixture('small'),
    revision: 7,
    cachedMastery: RESEARCH_MIGRATION_CACHED_MASTERY,
  };
}

function assertRecoveryDetails(
  error: ResearchStoreError,
  namespace: string,
  detectedSchema: number,
  safeAction: 'reset-with-confirmation' | 'upgrade-app',
): void {
  assert(error.message.includes(`namespace=${namespace}`), 'recoverable error omitted namespace');
  assert(error.message.includes(`detectedSchema=${detectedSchema}`), 'recoverable error omitted detected schema');
  assert(error.message.includes('export-raw'), 'recoverable error omitted raw export action');
  assert(error.message.includes(safeAction), `recoverable error omitted ${safeAction} action`);
}

function assertRawV1Envelope(value: unknown): void {
  assert(isRecord(value), 'raw v1 inspection did not return an envelope');
  assert(value.databaseVersion === 1, 'v1 fixture was not stored at physical database version 1');
  assert(value.schemaVersion === 1, 'aborted migration changed the visible schema');
  assert(value.revision === 7, 'aborted migration changed revision');
  assert(!Object.hasOwn(value, 'reducerVersion'), 'aborted migration exposed reducerVersion');
  assert(Array.isArray(value.attempts), 'raw v1 inspection omitted attempts');
  assert(value.attempts.every((attempt) => isRecord(attempt) && !Object.hasOwn(attempt, 'assistance')),
    'aborted migration exposed partially transformed attempts');
  assert(JSON.stringify(value.idempotencyKeys) === JSON.stringify(['migration-existing']),
    'aborted migration changed idempotency keys');
}

async function safeClose(store: ResearchProgressStore): Promise<void> {
  try {
    await store.close();
  } catch {
    // A gate's primary failure is more useful than teardown noise.
  }
}

const namespaceFor = (factory: ResearchAdapterFactory, gate: GateName): string =>
  `blackjack-storage-research:${factory.id}:${gate}`;

async function commitSmall(store: ResearchProgressStore, key: string, expectedRevision = 0): Promise<void> {
  const fixture = buildSchemaV2Fixture('small');
  await store.commitCheckpoint(checkpointFromFixture(fixture, key, expectedRevision));
}

function assertCheckpointState(envelope: ResearchEnvelope | null, revision = 1): void {
  const fixture = buildSchemaV2Fixture('small');
  assert(envelope !== null, 'committed envelope is missing');
  assert(envelope.schemaVersion === 2, 'schema version changed');
  assert(envelope.learnerId === RESEARCH_LEARNER_ID, 'learner identity changed');
  assert(envelope.revision === revision, `expected revision ${revision}`);
  assert(envelope.reducerVersion === RESEARCH_REDUCER_VERSION, 'reducer version changed');
  assert(JSON.stringify(envelope.curriculumVersions) === JSON.stringify(RESEARCH_CURRICULUM_VERSIONS), 'curriculum versions changed');
  assert(JSON.stringify(envelope.attempts) === JSON.stringify(fixture.attempts), 'attempt records changed');
  assert(JSON.stringify(envelope.sessions) === JSON.stringify([fixture.sessions.at(-1)]), 'session summary changed');
  assert(envelope.cachedMastery === null, 'cached mastery changed');
}

async function exerciseGate(factory: ResearchAdapterFactory, gate: GateName): Promise<void> {
  const namespace = namespaceFor(factory, gate);
  const store = factory.create();

  try {
    if (gate === 'empty-load') {
      await store.open(namespace);
      assert((await store.load()) === null, 'fresh namespace must load null');
      return;
    }

    if (gate === 'reload-round-trip') {
      throw new Error('cross-page reload result missing from runner');
    }

    if (gate === 'atomic-checkpoint') {
      await store.open(namespace);
      await commitSmall(store, 'atomic-1');
      factory.controls.abortNextWrite();
      await expectStoreError(() => commitSmall(store, 'atomic-2', 1), 'WRITE_ABORTED');
      assertCheckpointState(await store.load());
      return;
    }

    if (gate === 'idempotent-duplicate') {
      await store.open(namespace);
      const write = checkpointFromFixture(buildSchemaV2Fixture('small'), 'duplicate-1');
      const first = await store.commitCheckpoint(write);
      const second = await store.commitCheckpoint(write);
      assert(first.revision === 1 && !first.duplicate, 'first commit result is invalid');
      assert(second.revision === 1 && second.duplicate, 'duplicate commit advanced revision');
      assertCheckpointState(await store.load());
      return;
    }

    if (gate === 'revision-conflict') {
      await store.open(namespace);
      await commitSmall(store, 'revision-1');
      await expectStoreError(() => commitSmall(store, 'revision-2', 0), 'REVISION_CONFLICT');
      assertCheckpointState(await store.load());
      return;
    }

    if (gate === 'concurrent-writers') {
      throw new Error('two-page concurrency result missing from runner');
    }

    if (gate === 'stable-export') {
      await store.open(namespace);
      await commitSmall(store, 'export-1');
      const first = await store.exportJson();
      const second = await store.exportJson();
      assert(first === second, 'unchanged state produced unstable export bytes');
      assertCheckpointState(JSON.parse(first) as ResearchEnvelope);
      return;
    }

    if (gate === 'complete-reset') {
      await store.open(namespace);
      await commitSmall(store, 'reset-1');
      await store.reset();
      assert((await store.load()) === null, 'reset left learner state behind');
      await store.close();
      const reopened = factory.create();
      try {
        await reopened.open(namespace);
        assert((await reopened.load()) === null, 'reset state reappeared after reopen');
        const result = await reopened.commitCheckpoint(
          checkpointFromFixture(buildSchemaV2Fixture('small'), 'reset-1'),
        );
        assert(result.revision === 1 && !result.duplicate, 'reset left idempotency metadata behind');
        assertCheckpointState(await reopened.load());
      } finally {
        await safeClose(reopened);
      }
      return;
    }

    if (gate === 'upgrade-v1-v2') {
      await factory.controls.injectRawEnvelope(namespace, buildSchemaV1Fixture());
      await store.open(namespace);
      const loaded = await store.load();
      const expected = expectedMigratedEnvelope();
      assert(logicalJson(loaded) === logicalJson(expected), 'v1 migration changed logical learner state');
      const duplicate = await store.commitCheckpoint(
        checkpointFromFixture(expected, 'migration-existing', expected.revision),
      );
      assert(duplicate.duplicate && duplicate.revision === expected.revision,
        'migration did not preserve idempotency metadata');
      const firstExport = await store.exportJson();
      await store.close();
      const reopened = factory.create();
      try {
        await reopened.open(namespace);
        const secondExport = await reopened.exportJson();
        assert(firstExport === secondExport, 'migration export changed after reopen/re-run');
      } finally {
        await safeClose(reopened);
      }
      return;
    }

    if (gate === 'aborted-upgrade-recovery') {
      await factory.controls.injectRawEnvelope(namespace, buildSchemaV1Fixture());
      const inspect = factory.controls.inspectRawEnvelope;
      const before = FULL_CANDIDATES.has(factory.id) && inspect !== undefined
        ? await inspect(namespace)
        : undefined;
      factory.controls.abortNextUpgrade();
      await expectStoreError(() => store.open(namespace), 'UPGRADE_ABORTED');
      if (FULL_CANDIDATES.has(factory.id)) {
        assert(inspect !== undefined, 'full candidate omitted raw migration inspection');
        assertRawV1Envelope(before);
        const after = await inspect(namespace);
        assertRawV1Envelope(after);
        assert(JSON.stringify(after) === JSON.stringify(before), 'aborted migration changed raw v1 bytes');
      }
      const retry = factory.create();
      try {
        await retry.open(namespace);
        assert(logicalJson(await retry.load()) === logicalJson(expectedMigratedEnvelope()),
          'retry did not recover the last valid v1 state');
      } finally {
        await safeClose(retry);
      }
      return;
    }

    if (gate === 'malformed-record-recovery') {
      if (FULL_CANDIDATES.has(factory.id)) {
        for (const [suffix, fixture] of [
          ['meta', buildMalformedFixture()],
          ['attempt', buildMalformedAttemptFixture()],
        ] as const) {
          const corruptNamespace = `${namespace}:${suffix}`;
          const corruptStore = factory.create();
          const inspect = factory.controls.inspectRawEnvelope;
          assert(inspect !== undefined, 'full candidate omitted raw recovery inspection');
          await factory.controls.injectRawEnvelope(corruptNamespace, fixture);
          const before = await inspect(corruptNamespace);
          try {
            await corruptStore.open(corruptNamespace);
            const error = await expectStoreError(() => corruptStore.load(), 'RECOVERY_REQUIRED');
            assertRecoveryDetails(error, corruptNamespace, 2, 'reset-with-confirmation');
            const after = await inspect(corruptNamespace);
            assert(JSON.stringify(after) === JSON.stringify(before),
              `${suffix} refusal changed persisted raw state`);
          } finally {
            await safeClose(corruptStore);
          }
        }
        return;
      }
      await factory.controls.injectRawEnvelope(namespace, buildMalformedFixture());
      await store.open(namespace);
      await expectStoreError(() => store.load(), 'RECOVERY_REQUIRED');
      await store.reset();
      assert((await store.load()) === null, 'confirmed reset did not recover malformed namespace');
      return;
    }

    if (gate === 'newer-schema-refusal') {
      await factory.controls.injectRawEnvelope(namespace, buildUnsupportedSchemaFixture());
      const inspect = factory.controls.inspectRawEnvelope;
      const before = FULL_CANDIDATES.has(factory.id) && inspect !== undefined
        ? await inspect(namespace)
        : undefined;
      await store.open(namespace);
      const error = await expectStoreError(() => store.load(), 'NEWER_SCHEMA');
      if (FULL_CANDIDATES.has(factory.id)) {
        assert(inspect !== undefined, 'full candidate omitted raw recovery inspection');
        assertRecoveryDetails(error, namespace, 999, 'upgrade-app');
        const after = await inspect(namespace);
        assert(JSON.stringify(after) === JSON.stringify(before),
          'newer-schema refusal changed persisted raw state');
      }
      return;
    }

    if (gate === 'quota-error-surface') {
      await store.open(namespace);
      await commitSmall(store, 'quota-1');
      factory.controls.setQuotaError(true);
      await expectStoreError(() => commitSmall(store, 'quota-2', 1), 'QUOTA_EXCEEDED');
      factory.controls.setQuotaError(false);
      assertCheckpointState(await store.load());
      return;
    }

    await store.open(namespace);
    await commitSmall(store, 'unavailable-1');
    await store.close();
    factory.controls.setUnavailable(true);
    const unavailable = factory.create();
    await expectStoreError(() => unavailable.open(namespace), 'STORAGE_UNAVAILABLE');
    factory.controls.setUnavailable(false);
    const recovered = factory.create();
    try {
      await recovered.open(namespace);
      assertCheckpointState(await recovered.load());
    } finally {
      await safeClose(recovered);
    }
  } finally {
    factory.controls.setQuotaError(false);
    factory.controls.setUnavailable(false);
    await safeClose(store);
  }
}

function percentile(samples: number[], quantile: number): number {
  const sorted = [...samples].sort((left, right) => left - right);
  return sorted[Math.min(sorted.length - 1, Math.ceil(sorted.length * quantile) - 1)] ?? 0;
}

async function measure(
  factory: ResearchAdapterFactory,
  tier: FixtureTier,
): Promise<{ timings: TimingResult[]; exportBytes: number }> {
  const store = factory.create();
  const namespace = `blackjack-storage-research:${factory.id}:timing:${tier}`;
  const fixture = buildSchemaV2Fixture(tier);
  const samples = new Map<TimingResult['operation'], number>();
  let exportBytes = 0;
  const timed = async (operation: TimingResult['operation'], action: () => Promise<unknown>): Promise<void> => {
    const started = performance.now();
    await action();
    samples.set(operation, performance.now() - started);
  };
  try {
    await timed('open', () => store.open(namespace));
    await timed('load', () => store.load());
    const writes = checkpointsFromFixture(fixture, `timing-${tier}`);
    for (const write of writes.slice(0, -1)) await store.commitCheckpoint(write);
    const finalWrite = writes.at(-1);
    assert(finalWrite !== undefined, 'timing fixture has no checkpoint');
    await timed('commit', () => store.commitCheckpoint(finalWrite));
    await timed('export', async () => {
      exportBytes = new TextEncoder().encode(await store.exportJson()).byteLength;
    });
    await timed('reset', () => store.reset());
  } finally {
    await safeClose(store);
  }
  return {
    timings: [...samples].map(([operation, sample]) => ({
      workload: tier,
      operation,
      samples: [sample],
      p50Ms: percentile([sample], 0.5),
      p95Ms: percentile([sample], 0.95),
      maxMs: sample,
    })),
    exportBytes,
  };
}

async function runCandidate(factory: ResearchAdapterFactory): Promise<Omit<CandidateBrowserResult, 'browser'>> {
  const gates: GateResult[] = [];
  for (const gate of GATE_NAMES) {
    try {
      await exerciseGate(factory, gate);
      gates.push({ gate, passed: true, evidenceKind: SYNTHETIC_GATES.has(gate) ? 'SYNTHETIC' : 'OBSERVED', detail: 'passed' });
    } catch (error) {
      gates.push({
        gate,
        passed: false,
        evidenceKind: SYNTHETIC_GATES.has(gate) ? 'SYNTHETIC' : 'OBSERVED',
        detail: error instanceof Error ? error.message : String(error),
      });
    }
  }

  const fixtureBytes = Object.fromEntries(
    FIXTURE_TIERS.map((tier) => [tier, new TextEncoder().encode(JSON.stringify(buildSchemaV2Fixture(tier))).byteLength]),
  ) as Record<FixtureTier, number>;

  return {
    candidate: factory.id,
    gates,
    timings: [],
    fixtureBytes,
    exportBytes: { small: 0, medium: 0, stress: 0 },
  };
}

export async function runBrowserSuite(
  factories: ResearchAdapterFactory[],
  correctnessOnly: boolean,
): Promise<BrowserSuiteResult> {
  const candidates = [];
  void correctnessOnly;
  for (const factory of factories) candidates.push(await runCandidate(factory));
  return { candidates };
}

function probeResult(factory: ResearchAdapterFactory, gate: GateResult): BrowserSuiteResult {
  const fixtureBytes = Object.fromEntries(
    FIXTURE_TIERS.map((tier) => [tier, new TextEncoder().encode(JSON.stringify(buildSchemaV2Fixture(tier))).byteLength]),
  ) as Record<FixtureTier, number>;
  return {
    candidates: [{
      candidate: factory.id,
      gates: [gate],
      timings: [],
      fixtureBytes,
      exportBytes: { small: 0, medium: 0, stress: 0 },
    }],
  };
}

async function runProbe(
  factory: ResearchAdapterFactory,
  gate: GateName,
  operation: () => Promise<string>,
): Promise<BrowserSuiteResult> {
  try {
    return probeResult(factory, {
      gate,
      passed: true,
      evidenceKind: 'OBSERVED',
      detail: await operation(),
    });
  } catch (error) {
    return probeResult(factory, {
      gate,
      passed: false,
      evidenceKind: 'OBSERVED',
      detail: error instanceof Error ? error.message : String(error),
    });
  }
}

export async function runReloadProbe(
  factory: ResearchAdapterFactory,
  phase: 'write' | 'read',
): Promise<BrowserSuiteResult> {
  return runProbe(factory, 'reload-round-trip', async () => {
    const store = factory.create();
    try {
      await store.open(namespaceFor(factory, 'reload-round-trip'));
      if (phase === 'write') {
        await commitSmall(store, 'reload-1');
        assertCheckpointState(await store.load());
        return 'write-complete';
      }
      assertCheckpointState(await store.load());
      return 'fresh-page read preserved exact checkpoint';
    } finally {
      await safeClose(store);
    }
  });
}

export async function runConcurrentWriterProbe(
  factory: ResearchAdapterFactory,
  role: 'a' | 'b',
): Promise<BrowserSuiteResult> {
  return runProbe(factory, 'concurrent-writers', async () => {
    const store = factory.create();
    try {
      await store.open(namespaceFor(factory, 'concurrent-writers'));
      assert((await store.load()) === null, 'race did not begin from revision zero');
      const barrier = (window as unknown as {
        __researchConcurrencyBarrier?: () => Promise<void>;
      }).__researchConcurrencyBarrier;
      assert(typeof barrier === 'function', 'runner concurrency barrier is unavailable');
      await barrier();
      try {
        const result = await store.commitCheckpoint(
          checkpointFromFixture(buildSchemaV2Fixture('small'), `race-${role}`),
        );
        assert(result.revision === 1 && !result.duplicate, 'winner returned an invalid commit result');
        return 'outcome:winner';
      } catch (error) {
        assertStoreError(error, 'REVISION_CONFLICT');
        const current = await store.load();
        assert(current?.revision === 1, 'conflict loser did not reload the winner revision');
        const retry = await store.commitCheckpoint(
          checkpointFromFixture(buildSchemaV2Fixture('small'), `race-${role}-retry`, 1),
        );
        assert(retry.revision === 2 && !retry.duplicate, 'conflict loser retry did not advance once');
        return 'outcome:revision-conflict-retry';
      }
    } finally {
      await safeClose(store);
    }
  });
}

export async function runMeasurementProbe(
  factory: ResearchAdapterFactory,
): Promise<BrowserSuiteResult> {
  const measurements = await Promise.all(FIXTURE_TIERS.map((tier) => measure(factory, tier)));
  const fixtureBytes = Object.fromEntries(
    FIXTURE_TIERS.map((tier) => [tier, new TextEncoder().encode(JSON.stringify(buildSchemaV2Fixture(tier))).byteLength]),
  ) as Record<FixtureTier, number>;
  const exportBytes = Object.fromEntries(
    FIXTURE_TIERS.map((tier, index) => [tier, measurements[index]?.exportBytes ?? 0]),
  ) as Record<FixtureTier, number>;
  return {
    candidates: [{
      candidate: factory.id,
      gates: [],
      timings: measurements.flatMap((measurement) => measurement.timings),
      fixtureBytes,
      exportBytes,
    }],
  };
}
