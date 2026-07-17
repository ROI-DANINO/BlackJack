// The 14 provider-neutral storage gates (design §11), expressed as DATA rather than as test cases.
//
// Design: docs/superpowers/specs/2026-07-17-progressstore-cycle1-design.md
//
// WHY DATA AND NOT `it()` BLOCKS. The same 14 gates must run under Vitest against the in-memory
// fake (Task 5) AND inside a real browser page against the `idb` adapter (Tasks 7-9, driven by
// Playwright). Neither Vitest environment here has IndexedDB (web/vite.config.ts pins
// `environment: 'node'`), so the adapter cannot be gated under Vitest at all. This module is
// therefore importable by a browser bundle: it imports NO test framework, declares no `it()`, and
// calls no `expect()`. Every assertion is a plain throw-on-failure helper (`assert` below), and
// each gate reports a `GateResult` its host runner can render however it likes.
//
// Module boundary (design §3.1): imports only './types', './store', './canonical', './fixtures'.
// Never 'idb' (reserved for progress/idb-store.ts), never '../learn/'. Both are enforced by
// progress/boundary.test.ts (AST-based), not by convention.
//
// RE-DERIVATION (required by the AL-D1 card; design §11). The extracted research harness at
// `dev-toolkit/browser-storage-conformance` is NOT imported and was not read. AL-R2 reports 210
// cells = 15 rows × 14 gates but never names the 14, and the harness lives outside this repo
// (AL-R2 :29-39). These 14 are re-derived from the report's seven result columns (:160-166) plus
// its migration/recovery prose (:218-230), against THIS design's contract:
//   Reload → 1, 2 · Atomic commit → 3, 4 · Idempotency → 5 · Revision conflict → 6 ·
//   Concurrent tabs → 7 · Export/reset → 8, 9, 10 · Migration/recovery → 11, 12, 13, 14.
// Gates 13-14 carry a clause the research harness could not: raw export works in the failure
// state (design §3.6). Nothing is inherited: §5.1's three-store layout deviates from AL-R2's
// proven four, so gates 3, 4, 5 re-prove atomicity, idempotency, and abort-rollback on THIS
// layout from scratch.
//
// THE ONE RULE THAT GOVERNS EVERY GATE BELOW: a gate that cannot fail is worse than no gate.
// Each gate names, in its assertion messages, the exact wrong behavior it catches. Where a check
// could pass vacuously — an empty `recordCounts` map, a `status` that is right while the records
// are wrong — the vacuity is closed explicitly (see `requireCount`, `assertNoStoredRecords`), not
// papered over. Two clauses are load-bearing for approved deviations and must never be softened:
// gate 7 is the ONLY evidence for §2.4's `appendAttempt` deviation (deviations register #4), and
// gates 3/4/5 are the only evidence for §5.1's three-store layout (deviations register #3).
//
// TWO THINGS THIS FILE DELIBERATELY DOES NOT GATE, RECORDED HERE SO THEY DO NOT READ AS GAPS:
//   - §9 point 2 ("every write argument is structured-clone-safe ... asserted structurally by the
//     suite rather than trusted") has no gate here. It is not one of §11's 14, and this file's own
//     14-gate invariant (below) would break if a 15th were added to cover it. The property IS
//     covered — by progress/types.test.ts's `structuredClone(makeAttemptDraft())` deep-equality
//     round-trip (Task 1) — just not by a gate.
//   - §10 says "§11 makes measuring it a gate" (serialized envelope bytes at 20/1,000/10,000). §11's
//     table has no such gate, and this file is correct to have exactly 14: the measurement is a
//     design erratum, not a gap here. It lands as a measurement PASS, not a gate, in Task 10's
//     Playwright runner (docs/superpowers/plans/2026-07-17-progressstore-cycle1.md, Task 10).

import type { LearnerEnvelope, ProgressAttempt, SafeAction, SessionRecord } from './types';
import type {
  Diagnosis,
  OpenOutcome,
  ProgressAttemptDraft,
  ProgressStore,
  RawExport,
  SessionSummaryWrite,
} from './store';
import { canonicalize } from './canonical';
import type { CanonicalSnapshot } from './canonical';
import { makeAttemptDraft, makeAttemptTier, makeSessionRecord } from './fixtures';

// === The subject and gate shapes ==============================================================

/**
 * What a subject DECLARES it can do (design §11). The suite reads this rather than sniffing:
 * the in-memory fake is honestly 12/14 (AL-R2 :162), and §8.3 records that the in-memory baseline
 * "fails exactly the two gates (reload, concurrent tabs) a degraded mode openly does not offer".
 *
 * A declared non-capability is NOT a skip. Gates 2 and 7 assert the declaration by observation
 * before returning `declared-unsupported` — a fake that silently "passed" reload would be the
 * contract suite lying about the one property the port exists for (§11).
 */
export type StoreCapabilities = { durable: boolean; multiConnection: boolean };

/** The three physical stores design §5.1 declares. */
export type MigrationStoreName = 'meta' | 'attempts' | 'sessions';

/** An uninterpreted physical record, as a raw export dumps it (§3.6). */
export type MigrationRecord = { [key: string]: unknown };

/**
 * One additive-field-with-default step — the ONLY migration shape the design licenses (§8.1
 * point 2: "cursor-transform inside the `versionchange` transaction, verified byte-identical
 * against a golden fixture. Exactly AL-R2's proven shape, and nothing else").
 *
 * `transform` is SYNCHRONOUS by type, not by convention: §9 forbids any caller-supplied async
 * inside a transaction, and the cursor transform runs inside the `versionchange` transaction.
 * An async transform would auto-close it (LIB-002, AL-R2 :67).
 */
export type MigrationStep = {
  from: number;
  to: number;
  store: MigrationStoreName;
  transform: (record: MigrationRecord) => MigrationRecord;
};

/**
 * A TEST-ONLY migration plan handed to `ContractSubject.withMigrations`. It is not part of the
 * port: v1 has exactly one schema, so a real migration would ship with zero producers — the
 * phantom pattern §7 forbids and §3.5 cites as the reason there is no `migrate()` method. Gate 11
 * is the cycle-1 producer of a v2, and it exists only inside this suite.
 */
export type MigrationMap = {
  /** The schema version to open at. */
  targetVersion: number;
  steps: MigrationStep[];
};

/**
 * The host-supplied subject under test. `open`/`reopen` are how a gate obtains a store — there is
 * no callable `openProgressStore` to import (store.ts exports `OpenProgressStore` as a
 * call-signature INTERFACE; see its header for why the design's `declare function` was replaced).
 *
 * `reopen` simulates a reload: for a durable subject it is a fresh connection onto the same
 * physical data; for a non-durable subject the data is gone, which is exactly the observable that
 * makes gates 2 and 7's non-capability branches real assertions rather than skips.
 *
 * `close()` is resource disposal, never data disposal (§3.2) — data survives it for every
 * subject. Only `reopen` (non-durable) and `destroy` remove anything.
 *
 * The remaining controls are SYNTHETIC (AL-R2's label, carried onto gates 4, 12, 13, 14):
 * deterministic injected failures. They are the subject's own business — the port cannot
 * synthesise its own corruption, and §3.6 is explicit that the excluded AL-R2 harness inspector
 * (which could reach into arbitrary databases and mutate them) stays excluded from `ProgressStore`.
 * They live here, on the SUBJECT, precisely so they never reach the port.
 */
export type ContractSubject = {
  name: string;
  capabilities: StoreCapabilities;
  open: (namespace: string) => Promise<OpenOutcome>;
  reopen: (namespace: string) => Promise<OpenOutcome>;
  /**
   * Corrupts exactly ONE existing record of the given kind, MUTATED IN PLACE — never inserted, and
   * every other record's count in every store is UNCHANGED. `target: 'attempt'` (gate 13) corrupts
   * one existing attempt record only: the `meta` store is untouched — it remains physically intact
   * and readable at its existing schema version, and its record count stays 1. A subject that
   * "corrupts" by inserting a garbage record, or by resetting/recreating the namespace, does not
   * satisfy this and will make gate 13 fail for the wrong reason.
   */
  corrupt: (namespace: string, target: 'meta' | 'attempt') => Promise<void>;
  /**
   * Sets the namespace's physical `db.version` to `version` and nothing else: no stored record in
   * any store is added, removed, or altered (gate 14 reads a previously-seeded attempt back intact,
   * through raw export, after this call). This changes only the schema marker IndexedDB itself
   * tracks — it does not run a migration and does not materialize any default.
   */
  setPhysicalSchema: (namespace: string, version: number) => Promise<void>;
  withMigrations: (namespace: string, map: MigrationMap) => Promise<OpenOutcome>;
  /**
   * Causes the SINGLE NEXT write transaction (one `appendAttempt` or `commitSessionSummary`) to
   * abort before it commits: nothing that write would have added or changed survives, and nothing
   * already committed before this call is disturbed (gate 4). A one-shot injected fault — writes
   * after the aborted one must proceed normally.
   */
  abortNextWrite: (namespace: string) => Promise<void>;
  /**
   * Causes the SINGLE NEXT `versionchange` (upgrade) transaction to abort before it commits: the
   * namespace is left physically at its PRE-upgrade schema version, with its pre-upgrade records
   * unchanged — no partial cursor transform survives (gate 12). A one-shot injected fault — a
   * subsequent upgrade attempt must be able to succeed.
   */
  abortNextUpgrade: (namespace: string) => Promise<void>;
  destroy: (namespace: string) => Promise<void>;
};

export type GateResult = { id: string; status: 'pass' | 'fail' | 'declared-unsupported'; detail?: string };

export type ProgressGate = { id: string; label: 'OBSERVED' | 'SYNTHETIC'; run(s: ContractSubject): Promise<GateResult> };

// === Assertion + inspection helpers ===========================================================

/** Thrown by `assert`. Distinguishable from an unexpected runtime fault in a gate's own code. */
export class ContractAssertionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ContractAssertionError';
  }
}

/**
 * The whole assertion vocabulary of this module. No Vitest `expect`, because `contract.ts` must
 * be importable by a browser bundle that has no test framework in it.
 */
function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new ContractAssertionError(message);
}

/**
 * Non-`ContractAssertionError` output is prefixed `GATE BUG: ` so a runner reading only `status`
 * (a `TypeError` here still reports `status:'fail'`, per `GateResult`'s brief-mandated union — see
 * gate()'s catch) cannot mistake a bug in the gate's OWN body for the subject failing the gate.
 */
function describeError(error: unknown): string {
  if (error instanceof ContractAssertionError) return error.message;
  if (error instanceof Error) return `GATE BUG: ${error.stack ?? `${error.name}: ${error.message}`}`;
  return `GATE BUG: non-Error thrown: ${String(error)}`;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Structural equality over fixture-shaped data. Fixtures are literals-only and contain no NaN, no
 * Date, no RegExp, no cycles (progress/fixtures.ts), which is exactly why a 30-line comparison is
 * sufficient here and a dependency is not.
 */
function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (!isPlainObject(a) || !isPlainObject(b)) {
    if (Array.isArray(a) && Array.isArray(b)) {
      return a.length === b.length && a.every((item, index) => deepEqual(item, b[index]));
    }
    return false;
  }
  const aKeys = Object.keys(a);
  if (aKeys.length !== Object.keys(b).length) return false;
  return aKeys.every((key) => Object.prototype.hasOwnProperty.call(b, key) && deepEqual(a[key], b[key]));
}

function parseJson(json: string, context: string): Record<string, unknown> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch (error) {
    throw new ContractAssertionError(`${context}: the exported bytes are not valid JSON — ${describeError(error)}`);
  }
  assert(isPlainObject(parsed), `${context}: the exported JSON is not an object.`);
  return parsed;
}

function requireOpen(outcome: OpenOutcome, context: string): ProgressStore {
  assert(
    outcome.status === 'open',
    `${context}: expected {status:'open'}, got {status:'${outcome.status}'}` +
      `${outcome.status === 'unavailable' ? ` (${outcome.error.code}/${outcome.error.reason})` : ''}.`,
  );
  return outcome.store;
}

async function loadEnvelope(store: ProgressStore, context: string): Promise<LearnerEnvelope> {
  const outcome = await store.load();
  assert(outcome.status === 'loaded', `${context}: expected {status:'loaded'}, got '${outcome.status}'.`);
  return outcome.envelope;
}

async function appendCommitted(store: ProgressStore, draft: ProgressAttemptDraft, context: string): Promise<number> {
  const outcome = await store.appendAttempt(draft);
  assert(
    outcome.status === 'committed',
    `${context}: expected {status:'committed'} for attemptId '${draft.attemptId}', got '${outcome.status}'` +
      `${outcome.status === 'rejected' ? ` (${outcome.error.code})` : ''}.`,
  );
  return outcome.revision;
}

async function exportCanonical(store: ProgressStore, context: string): Promise<string> {
  const outcome = await store.exportSnapshot({ mode: 'canonical' });
  assert(outcome.status === 'exported', `${context}: expected {status:'exported'}, got '${outcome.status}'.`);
  assert(outcome.mode === 'canonical', `${context}: exportSnapshot({mode:'canonical'}) reported mode '${outcome.mode}'.`);
  return outcome.json;
}

/**
 * Raw export (§3.6), validated hard enough to earn the cast at the bottom. Every field this suite
 * reads is checked here; `errors` is checked for shape only because no gate interprets it.
 */
async function exportRaw(store: ProgressStore, context: string): Promise<RawExport> {
  const outcome = await store.exportSnapshot({ mode: 'raw' });
  assert(
    outcome.status === 'exported',
    `${context}: exportSnapshot({mode:'raw'}) must return {status:'exported'} — raw export must be reachable in ` +
      `EVERY failure state (§3.6) — got '${outcome.status}'.`,
  );
  assert(outcome.mode === 'raw', `${context}: exportSnapshot({mode:'raw'}) reported mode '${outcome.mode}'.`);

  const parsed = parseJson(outcome.json, context);
  assert(
    parsed['format'] === 'blackjack.progress.raw',
    `${context}: raw export format is ${JSON.stringify(parsed['format'])}, expected 'blackjack.progress.raw' (§3.6).`,
  );
  assert(parsed['formatVersion'] === 1, `${context}: raw export formatVersion is ${JSON.stringify(parsed['formatVersion'])}, expected 1.`);
  assert(typeof parsed['namespace'] === 'string', `${context}: raw export namespace is not a string.`);
  const physicalVersion = parsed['physicalVersion'];
  assert(
    physicalVersion === null || typeof physicalVersion === 'number',
    `${context}: raw export physicalVersion must be a number or null ("db.version as found", §3.6), got ${JSON.stringify(physicalVersion)}.`,
  );
  const stores = parsed['stores'];
  assert(isPlainObject(stores), `${context}: raw export 'stores' must be an object of store → records (§3.6).`);
  for (const [name, records] of Object.entries(stores)) {
    assert(Array.isArray(records), `${context}: raw export store '${name}' is not an array of records.`);
  }
  assert(Array.isArray(parsed['errors']), `${context}: raw export 'errors' must be an array (§3.6).`);
  return parsed as unknown as RawExport;
}

function requireStore(raw: RawExport, store: MigrationStoreName, context: string): Record<string, unknown>[] {
  const records = raw.stores[store];
  assert(
    records !== undefined,
    `${context}: the raw export has no '${store}' store (found: ${Object.keys(raw.stores).join(', ') || 'none'}). ` +
      `§5.1 declares exactly three: meta · attempts · sessions.`,
  );
  return records.map((record, index) => {
    assert(isPlainObject(record), `${context}: raw '${store}' record ${index} is not an object.`);
    return record;
  });
}

function requireRecord(
  records: Record<string, unknown>[],
  key: string,
  value: unknown,
  context: string,
): Record<string, unknown> {
  const found = records.filter((record) => record[key] === value);
  assert(found.length === 1, `${context}: expected exactly one raw record with ${key}='${String(value)}', found ${found.length}.`);
  const record = found[0];
  assert(record !== undefined, `${context}: unreachable — filter returned one element that is undefined.`);
  return record;
}

/**
 * A record count for one physical store, or a FAILURE if diagnose() does not report that store.
 *
 * The `assert` is the anti-vacuity guard for this whole suite: `recordCounts[store] ?? 0` would
 * silently turn "the store is not reported" into "the store holds nothing", and every
 * count-did-not-grow / no-automatic-reset / no-residual-records assertion below would then pass
 * against a `diagnose()` that reports nothing at all.
 */
function requireCount(diagnosis: Diagnosis, store: MigrationStoreName, context: string): number {
  const count = diagnosis.recordCounts[store];
  assert(
    count !== undefined,
    `${context}: diagnose() reports no record count for the '${store}' store (§5.1 declares meta · attempts · sessions; ` +
      `got [${Object.keys(diagnosis.recordCounts).join(', ') || 'none'}]). An absent count must FAIL, never default to 0 — ` +
      `a default would make every "count did not grow" assertion in this suite vacuous.`,
  );
  return count;
}

/**
 * "Nothing is stored" — used by gate 1 (nothing was MINTED) and gate 10 (no RESIDUAL records).
 * Both legitimate shapes are accepted: an absent namespace (`detectedSchema: null`), or a
 * physically-present namespace whose stores are all empty. The second branch is what stops the
 * check from passing against a `diagnose()` that reports an empty map for a populated database.
 */
function assertNoStoredRecords(diagnosis: Diagnosis, context: string): void {
  assert(
    diagnosis.detectedSchema !== 'unreadable',
    `${context}: diagnose() reported detectedSchema:'unreadable' for a namespace that must be absent or empty.`,
  );
  const populated = Object.entries(diagnosis.recordCounts).filter(([, count]) => count > 0);
  assert(
    populated.length === 0,
    `${context}: expected zero records in every store, but diagnose() reports ` +
      `${populated.map(([store, count]) => `${store}=${count}`).join(', ')}.`,
  );
  if (diagnosis.detectedSchema !== null) {
    assert(
      diagnosis.physicalStores.length > 0,
      `${context}: diagnose() reports detectedSchema:${diagnosis.detectedSchema} — the namespace physically exists — ` +
        `but physicalStores is empty.`,
    );
    assert(
      Object.keys(diagnosis.recordCounts).length > 0,
      `${context}: diagnose() reports a physically-present namespace with an empty recordCounts map, which makes the ` +
        `"zero records" assertion above vacuous. Report a count per physical store.`,
    );
  }
}

function findAttempt(envelope: LearnerEnvelope, attemptId: string): ProgressAttempt | undefined {
  return envelope.attempts.find((attempt) => attempt.attemptId === attemptId);
}

function requireAttempt(envelope: LearnerEnvelope, attemptId: string, context: string): ProgressAttempt {
  const attempt = findAttempt(envelope, attemptId);
  assert(
    attempt !== undefined,
    `${context}: attempt '${attemptId}' is absent; the envelope holds [${envelope.attempts.map((a) => a.attemptId).join(', ') || 'none'}].`,
  );
  return attempt;
}

/**
 * The store assigns exactly ONE field, `committedAtRevision` (§6). Everything else must come back
 * byte-for-byte as the caller wrote it — this is what catches a store that persists an attemptId
 * and quietly drops the evidence around it.
 */
function assertAttemptRoundTrips(
  actual: ProgressAttempt,
  draft: ProgressAttemptDraft,
  revision: number,
  context: string,
): void {
  const expected: ProgressAttempt = { ...draft, committedAtRevision: revision };
  assert(
    deepEqual(actual, expected),
    `${context}: the stored attempt is not the evidence that was written.\nexpected=${JSON.stringify(expected)}\nactual=${JSON.stringify(actual)}`,
  );
}

function assertSafeActions(actual: SafeAction[], expected: SafeAction[], context: string): void {
  assert(Array.isArray(actual), `${context}: safeActions is not an array.`);
  assert(
    actual.length === expected.length && expected.every((action, index) => actual[index] === action),
    `${context}: safeActions must be exactly [${expected.map((a) => `'${a}'`).join(', ')}] — this suite's declared ` +
      `order, grounded in §8.2's export-before-reset rationale ("reset is the only thing that frees space and it ` +
      `destroys everything ... which is exactly why export must precede reset"), ` +
      `got [${actual.map((a) => `'${String(a)}'`).join(', ')}].`,
  );
}

/** `SessionSummaryWrite.session` omits the store-assigned revision (§3.4, §6). */
function sessionWrite(overrides: Partial<SessionRecord> = {}): Omit<SessionRecord, 'committedAtRevision'> {
  // `committedAtRevision` is STORE-assigned inside the transaction and must never be caller-supplied.
  const { committedAtRevision, ...rest } = makeSessionRecord(overrides);
  void committedAtRevision;
  return rest;
}

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

function requireDraft(drafts: ProgressAttemptDraft[], index: number): ProgressAttemptDraft {
  const draft = drafts[index];
  assert(draft !== undefined, `fixture bug: makeAttemptTier did not produce index ${index}.`);
  return draft;
}

// === Gate scaffolding =========================================================================

const NAMESPACE_PREFIX = 'progress-contract-';

type GateOutcome = Omit<GateResult, 'id'>;

function pass(detail?: string): GateOutcome {
  return detail === undefined ? { status: 'pass' } : { status: 'pass', detail };
}

type GateRun = {
  readonly subject: ContractSubject;
  readonly ns: string;
  openOutcome(): Promise<OpenOutcome>;
  open(context: string): Promise<ProgressStore>;
  reopen(context: string): Promise<ProgressStore>;
  migrateOutcome(map: MigrationMap): Promise<OpenOutcome>;
  migrate(map: MigrationMap, context: string): Promise<ProgressStore>;
  dispose(): Promise<void>;
};

/**
 * Per-gate scaffolding: one namespace, and every store this gate opens closed on the way out.
 * The disposal matters for the real adapter — an IndexedDB `deleteDatabase` blocks on open
 * connections, so a gate that failed while holding one would cascade into the NEXT gate's
 * `destroy` rather than reporting its own failure.
 */
function newGateRun(subject: ContractSubject, ns: string): GateRun {
  const opened: ProgressStore[] = [];
  const track = (outcome: OpenOutcome): OpenOutcome => {
    if (outcome.status === 'open') opened.push(outcome.store);
    return outcome;
  };
  const openOutcome = async (): Promise<OpenOutcome> => track(await subject.open(ns));
  const reopenOutcome = async (): Promise<OpenOutcome> => track(await subject.reopen(ns));
  const migrateOutcome = async (map: MigrationMap): Promise<OpenOutcome> => track(await subject.withMigrations(ns, map));

  return {
    subject,
    ns,
    openOutcome,
    open: async (context) => requireOpen(await openOutcome(), context),
    reopen: async (context) => requireOpen(await reopenOutcome(), context),
    migrateOutcome,
    migrate: async (map, context) => requireOpen(await migrateOutcome(map), context),
    dispose: async () => {
      for (const store of opened.splice(0).reverse()) {
        // close() is idempotent (§3.2) and is disposal, not semantics — a gate that already
        // closed a store is not a failure, and a failure to dispose must not mask a gate result.
        try {
          await store.close();
        } catch {
          /* best-effort disposal */
        }
      }
    },
  };
}

function gate(id: string, label: 'OBSERVED' | 'SYNTHETIC', body: (run: GateRun) => Promise<GateOutcome>): ProgressGate {
  return {
    id,
    label,
    async run(subject: ContractSubject): Promise<GateResult> {
      const run = newGateRun(subject, `${NAMESPACE_PREFIX}${id}`);
      try {
        return { id, ...(await body(run)) };
      } catch (error) {
        return { id, status: 'fail', detail: describeError(error) };
      } finally {
        await run.dispose();
      }
    },
  };
}

/**
 * The `durable:false` non-capability, PROVEN rather than assumed (design §11, §8.3). Used by
 * gates 2 and 7. This is deliberately not a skip: §11 requires that for `durable:false` the suite
 * "asserts the store does not claim durability", because "a fake that silently 'passed' reload
 * would be the contract suite lying about the one property the port exists for".
 *
 * Note the middle step. Asserting only "the attempt is gone after reopen()" would pass against a
 * store whose `appendAttempt` never wrote anything at all, so the seed is first proven readable on
 * the live connection. Absence only means "did not survive" once presence is established.
 */
async function assertDeclaredNonDurable(run: GateRun): Promise<string> {
  await run.subject.destroy(run.ns);
  const store = await run.open('non-durable probe: open');
  const draft = makeAttemptDraft();
  const revision = await appendCommitted(store, draft, 'non-durable probe: seed append');

  const before = await loadEnvelope(store, 'non-durable probe: load on the live connection');
  assertAttemptRoundTrips(
    requireAttempt(before, draft.attemptId, 'non-durable probe: the seed must be readable BEFORE the reopen'),
    draft,
    revision,
    'non-durable probe',
  );
  await store.close();

  const reopened = await run.reopen('non-durable probe: reopen (simulates a reload)');
  const after = await reopened.load();
  assert(
    after.status === 'empty' || (after.status === 'loaded' && findAttempt(after.envelope, draft.attemptId) === undefined),
    `${run.subject.name} declares capabilities.durable:false, but attempt '${draft.attemptId}' SURVIVED reopen(). ` +
      `A declared non-capability must be true: §11 requires this suite to assert that a non-durable subject does not ` +
      `claim durability. Either the declaration is wrong, or reopen() is not simulating a reload — do not relax this check.`,
  );
  return `${run.subject.name} declares durable:false; verified by observation — a committed attempt does not survive reopen().`;
}

// === Gate 11/12 fixture: the test-only v2 =====================================================

const V1_SCHEMA = 1;
const V2_SCHEMA = 2;
const TEST_V2_FIELD = 'contractSuiteV2Default';
const TEST_V2_VALUE = 'materialized-by-v2';

/**
 * The only migration shape §8.1 licenses: additive-field-with-default, materialized by a cursor
 * transform inside the `versionchange` transaction. It lives in the SUITE, not in the product:
 * v1 has exactly one schema (§3.5), so a real v2 would have zero producers.
 */
const ADDITIVE_V2: MigrationMap = {
  targetVersion: V2_SCHEMA,
  steps: [
    {
      from: V1_SCHEMA,
      to: V2_SCHEMA,
      store: 'attempts',
      transform: (record) => ({ ...record, [TEST_V2_FIELD]: TEST_V2_VALUE }),
    },
  ],
};

const RECOVERY_SAFE_ACTIONS: SafeAction[] = ['export-raw', 'reset-with-confirmation'];
const NEWER_SCHEMA_SAFE_ACTIONS: SafeAction[] = ['export-raw', 'upgrade-app'];
const NEWER_PHYSICAL_SCHEMA = 999;

// === The 14 gates (design §11) ================================================================

/**
 * 1 — `open-empty` (Reload column, OBSERVED). Design §3.4, §6.
 *
 * Catches: a store that mints a learner key or an envelope just because the app opened. §6 is
 * explicit — "load() on an empty namespace mints NOTHING", and "opening the app creates no
 * identifier at all — data minimisation (PRIV-001) for free". Asserting only `status === 'empty'`
 * would miss all of that: a store can mint an envelope AND report empty in the same breath.
 */
const openEmpty = gate('open-empty', 'OBSERVED', async (run) => {
  await run.subject.destroy(run.ns);
  const store = await run.open('open-empty: open a fresh namespace');

  const first = await store.load();
  assert(first.status === 'empty', `open-empty: a fresh namespace must load {status:'empty'}, got '${first.status}'.`);

  // §3.4/§6: "load() is a pure read". Catches a store that mints on first load and reports
  // 'loaded' from then on — a reading of "empty" that is true exactly once.
  const second = await store.load();
  assert(
    second.status === 'empty',
    `open-empty: load() must be a pure read (§6) — a second load() on a fresh namespace returned '${second.status}', ` +
      `so the first load() minted something.`,
  );

  const diagnosis = await store.diagnose();
  assert(diagnosis.namespace === run.ns, `open-empty: diagnose() reports namespace '${diagnosis.namespace}', expected '${run.ns}'.`);
  assertNoStoredRecords(diagnosis, 'open-empty: nothing may be minted by open() or load()');
  assert(
    diagnosis.migration.kind === 'none',
    `open-empty: an empty namespace has nothing to migrate; diagnose() reports migration {kind:'${diagnosis.migration.kind}'}.`,
  );
  assert(diagnosis.integrity.invalid.length === 0, `open-empty: an empty namespace reported ${diagnosis.integrity.invalid.length} invalid record(s).`);

  // On "no learner key exists": the key's only surface is the loaded envelope, and {status:'empty'}
  // cannot carry one — that half is proven by the TYPE. The physical half is the meta count above:
  // §5.1 puts the learnerKey in the `meta` singleton, so meta=0 is the learner key not existing.
  return pass();
});

/**
 * 2 — `reload-persistence` (Reload column, OBSERVED). Design §11, §8.3.
 *
 * Catches: a store that acknowledges a write it did not durably make — `:522`'s failure at the
 * level of one write. Non-capability when `durable === false`, asserted rather than skipped.
 */
const reloadPersistence = gate('reload-persistence', 'OBSERVED', async (run) => {
  if (!run.subject.capabilities.durable) {
    return { status: 'declared-unsupported', detail: await assertDeclaredNonDurable(run) };
  }

  await run.subject.destroy(run.ns);
  const store = await run.open('reload-persistence: open');
  const draft = makeAttemptDraft();
  const revision = await appendCommitted(store, draft, 'reload-persistence: append');
  await store.close();

  const reopened = await run.reopen('reload-persistence: reopen (simulates a reload)');
  const envelope = await loadEnvelope(reopened, 'reload-persistence: load after reopen');
  const attempt = requireAttempt(envelope, draft.attemptId, 'reload-persistence: the committed attempt must survive a fresh connection');
  assert(
    attempt.committedAtRevision === revision,
    `reload-persistence: appendAttempt reported revision ${revision}, but the reloaded attempt carries ` +
      `committedAtRevision ${attempt.committedAtRevision}.`,
  );
  assertAttemptRoundTrips(attempt, draft, revision, 'reload-persistence');
  return pass();
});

/**
 * 3 — `atomic-commit` (Atomic commit column, OBSERVED). Design §5.1, §8.4.
 *
 * Catches: an append that writes the attempt WITHOUT bumping `meta.revision`, or bumps by more
 * than 1, or lets the two land in separate transactions. Re-proves atomicity on §5.1's THREE-store
 * layout — deviation register #3 is explicit that nothing is inherited from AL-R2's proven four.
 * The advance is measured from a seeded baseline rather than from an assumed initial value, so it
 * tests the +1 rule and not a guess about where revisions start.
 */
const atomicCommit = gate('atomic-commit', 'OBSERVED', async (run) => {
  await run.subject.destroy(run.ns);
  const store = await run.open('atomic-commit: open');
  const drafts = makeAttemptTier(2);
  const first = requireDraft(drafts, 0);
  const second = requireDraft(drafts, 1);

  const r0 = await appendCommitted(store, first, 'atomic-commit: first append');
  const afterFirst = await loadEnvelope(store, 'atomic-commit: load after the first append');
  assert(
    afterFirst.revision === r0,
    `atomic-commit: appendAttempt returned revision ${r0} but meta.revision is ${afterFirst.revision} — the attempt and ` +
      `the revision bump must land in ONE readwrite transaction over meta + attempts (§5.1).`,
  );

  const r1 = await appendCommitted(store, second, 'atomic-commit: second append');
  assert(r1 === r0 + 1, `atomic-commit: meta.revision must advance by exactly 1 per committed append; it went ${r0} → ${r1}.`);

  const afterSecond = await loadEnvelope(store, 'atomic-commit: load after the second append');
  assert(afterSecond.revision === r1, `atomic-commit: meta.revision is ${afterSecond.revision} after an append that returned ${r1}.`);
  assert(afterSecond.attempts.length === 2, `atomic-commit: expected 2 attempts, found ${afterSecond.attempts.length}.`);
  assertAttemptRoundTrips(requireAttempt(afterSecond, first.attemptId, 'atomic-commit'), first, r0, 'atomic-commit/first');
  assertAttemptRoundTrips(requireAttempt(afterSecond, second.attemptId, 'atomic-commit'), second, r1, 'atomic-commit/second');

  const diagnosis = await store.diagnose();
  assert(requireCount(diagnosis, 'attempts', 'atomic-commit') === 2, `atomic-commit: the attempts store physically holds ${requireCount(diagnosis, 'attempts', 'atomic-commit')} records, expected 2.`);
  assert(
    requireCount(diagnosis, 'meta', 'atomic-commit') === 1,
    `atomic-commit: the meta singleton must exist after the first append mints the envelope inside that same ` +
      `transaction (§6); diagnose() reports ${requireCount(diagnosis, 'meta', 'atomic-commit')} meta record(s).`,
  );

  if (!run.subject.capabilities.durable) {
    return pass(
      `Both the attempt and meta.revision asserted visible through load(). reopen() not exercised — ` +
        `${run.subject.name} declares durable:false, and gate 2 owns that non-capability.`,
    );
  }
  await store.close();
  const reopened = await run.reopen('atomic-commit: reopen');
  const afterReload = await loadEnvelope(reopened, 'atomic-commit: load after reopen');
  assert(afterReload.revision === r1, `atomic-commit: meta.revision is ${afterReload.revision} after a reload, expected ${r1}.`);
  assert(afterReload.attempts.length === 2, `atomic-commit: ${afterReload.attempts.length} of 2 attempts survived the reload.`);
  assertAttemptRoundTrips(requireAttempt(afterReload, second.attemptId, 'atomic-commit'), second, r1, 'atomic-commit/reloaded');
  return pass();
});

/**
 * 4 — `write-abort-rollback` (Atomic commit column, SYNTHETIC). Design §5.1, §3.3.
 *
 * Catches the OTHER half of all-or-nothing: an aborted append that leaves a revision bump behind
 * with no attempt (mastery ordering silently shifted), or an attempt behind with no bump (a record
 * that no export ordering can place). Both `meta.revision` AND the attempts collection are checked
 * — asserting only one is exactly the shape of failure this gate exists to find.
 */
const writeAbortRollback = gate('write-abort-rollback', 'SYNTHETIC', async (run) => {
  await run.subject.destroy(run.ns);
  const store = await run.open('write-abort-rollback: open');
  const drafts = makeAttemptTier(2);
  const seeded = requireDraft(drafts, 0);
  const aborted = requireDraft(drafts, 1);

  const r0 = await appendCommitted(store, seeded, 'write-abort-rollback: seed append');
  const before = await loadEnvelope(store, 'write-abort-rollback: load before the abort');
  assert(before.revision === r0, `write-abort-rollback: baseline meta.revision is ${before.revision}, expected ${r0}.`);
  assert(before.attempts.length === 1, `write-abort-rollback: baseline attempt count is ${before.attempts.length}, expected 1.`);

  await run.subject.abortNextWrite(run.ns);
  const outcome = await store.appendAttempt(aborted);
  assert(
    outcome.status === 'rejected',
    `write-abort-rollback: an aborted write must return {status:'rejected'}, got '${outcome.status}'` +
      `${outcome.status === 'committed' ? ` at revision ${outcome.revision}` : ''}.`,
  );
  assert(outcome.error.namespace === run.ns, `write-abort-rollback: the rejection names namespace '${outcome.error.namespace}', expected '${run.ns}'.`);
  assert(
    outcome.error.safeActions.length > 0,
    `write-abort-rollback: a RETURNED recoverable error must name at least one safe action (§3.3) — the caller has no ` +
      `other way to learn what it may do next.`,
  );

  const after = await loadEnvelope(store, 'write-abort-rollback: load after the abort');
  assert(
    after.revision === r0,
    `write-abort-rollback: meta.revision moved ${r0} → ${after.revision} across a REJECTED append. The transaction did ` +
      `not roll back (§5.1).`,
  );
  assert(after.attempts.length === 1, `write-abort-rollback: the attempts collection grew to ${after.attempts.length} across a rejected append.`);
  assert(
    findAttempt(after, aborted.attemptId) === undefined,
    `write-abort-rollback: the rejected attempt '${aborted.attemptId}' is present after the abort.`,
  );
  assertAttemptRoundTrips(requireAttempt(after, seeded.attemptId, 'write-abort-rollback'), seeded, r0, 'write-abort-rollback');

  const diagnosis = await store.diagnose();
  const physical = requireCount(diagnosis, 'attempts', 'write-abort-rollback');
  assert(
    physical === 1,
    `write-abort-rollback: the attempts store physically holds ${physical} records after a rejected append, expected 1 — ` +
      `the rollback left a record behind that load() happens to filter out.`,
  );
  return pass();
});

/**
 * 5 — `idempotency-duplicate` (Idempotency column, OBSERVED). Design §5.1, §4.3.
 *
 * Catches: a duplicate that reports `duplicate` while still WRITING — the count growing, the
 * revision advancing, or the stored evidence being overwritten. §5.1 is specific: "The adapter
 * uses `store.add()`, not `store.put()`", so the third append below carries DIFFERENT content
 * under the SAME attemptId. A `put()`-based store returns 'duplicate' and silently replaces the
 * evidence; only the round-trip check catches that.
 */
const idempotencyDuplicate = gate('idempotency-duplicate', 'OBSERVED', async (run) => {
  await run.subject.destroy(run.ns);
  const store = await run.open('idempotency-duplicate: open');
  const draft = makeAttemptDraft();

  const r0 = await appendCommitted(store, draft, 'idempotency-duplicate: first append');
  const afterFirst = await loadEnvelope(store, 'idempotency-duplicate: load after the first append');
  assert(afterFirst.attempts.length === 1, `idempotency-duplicate: baseline attempt count is ${afterFirst.attempts.length}, expected 1.`);
  assert(afterFirst.revision === r0, `idempotency-duplicate: baseline meta.revision is ${afterFirst.revision}, expected ${r0}.`);

  const again = await store.appendAttempt(draft);
  assert(
    again.status === 'duplicate',
    `idempotency-duplicate: re-appending attemptId '${draft.attemptId}' must return {status:'duplicate'}, got '${again.status}'. ` +
      `The primary key IS the idempotency key (§5.1) — a ConstraintError the database cannot fail to raise.`,
  );
  assert(again.revision === r0, `idempotency-duplicate: the duplicate must report the FIRST commit's revision (${r0}), got ${again.revision}.`);

  // add(), not put(): same key, different content. A store that overwrote here would still have
  // answered 'duplicate' above.
  const overwrite = makeAttemptDraft({
    response: { choice: 'z' },
    disposition: { status: 'graded', correct: false, errorClass: 'strategy-recall' },
  });
  assert(overwrite.attemptId === draft.attemptId, `fixture bug: makeAttemptDraft(overrides) changed attemptId from '${draft.attemptId}' to '${overwrite.attemptId}'.`);
  const third = await store.appendAttempt(overwrite);
  assert(third.status === 'duplicate', `idempotency-duplicate: a same-attemptId append with different content must return 'duplicate', got '${third.status}'.`);
  assert(third.revision === r0, `idempotency-duplicate: the second duplicate reported revision ${third.revision}, expected the first commit's ${r0}.`);

  const afterDuplicates = await loadEnvelope(store, 'idempotency-duplicate: load after two duplicate appends');
  assert(
    afterDuplicates.attempts.length === 1,
    `idempotency-duplicate: the attempt count GREW to ${afterDuplicates.attempts.length} across two duplicate appends.`,
  );
  assert(
    afterDuplicates.revision === r0,
    `idempotency-duplicate: meta.revision moved ${r0} → ${afterDuplicates.revision} across duplicate appends. §11 gate 5 is ` +
      `"returns duplicate, WRITES NOTHING" — a revision bump is a write.`,
  );
  assertAttemptRoundTrips(
    requireAttempt(afterDuplicates, draft.attemptId, 'idempotency-duplicate'),
    draft,
    r0,
    `idempotency-duplicate: the ORIGINAL evidence must survive a same-key append carrying different content (add(), not put(), §5.1)`,
  );

  const diagnosis = await store.diagnose();
  const physical = requireCount(diagnosis, 'attempts', 'idempotency-duplicate');
  assert(physical === 1, `idempotency-duplicate: the attempts store physically holds ${physical} records, expected 1.`);
  return pass();
});

/**
 * 6 — `revision-conflict` (Revision conflict column, OBSERVED). Design §3.4, §8.4, §2.4.
 *
 * Catches: the lost update the revision check exists to prevent. A summary (and any cachedMastery
 * it publishes) is DERIVED FROM ALL ATTEMPTS, so one computed at revision 5 is genuinely stale
 * once another tab appended at 6. §2.4 moved the check here, off `appendAttempt`, precisely so it
 * guards the half that REPLACES derived state — this gate is what proves it still guards it.
 * Also catches a conflict that reports a `currentRevision` it made up, and a conflict that wrote
 * the session anyway.
 */
const revisionConflict = gate('revision-conflict', 'OBSERVED', async (run) => {
  await run.subject.destroy(run.ns);
  const store = await run.open('revision-conflict: open');
  const drafts = makeAttemptTier(2);

  const r0 = await appendCommitted(store, requireDraft(drafts, 0), 'revision-conflict: first append');
  const seen = await loadEnvelope(store, 'revision-conflict: the load the caller derived its summary from');
  assert(seen.revision === r0, `revision-conflict: meta.revision is ${seen.revision} after an append that returned ${r0}.`);

  // Another write lands after the caller looked — the §8.4 lost-update window, opened for real.
  const r1 = await appendCommitted(store, requireDraft(drafts, 1), 'revision-conflict: a second append advances the revision');
  assert(r1 === r0 + 1, `revision-conflict: the second append went ${r0} → ${r1}, expected +1.`);

  const write: SessionSummaryWrite = { session: sessionWrite(), expectedRevision: r0, cachedMastery: null };
  const conflict = await store.commitSessionSummary(write);
  assert(
    conflict.status === 'conflict',
    `revision-conflict: commitSessionSummary at a STALE expectedRevision (${r0}; current ${r1}) must return ` +
      `{status:'conflict'}, got '${conflict.status}'. A summary that overwrites derived state it never saw is the lost ` +
      `update §8.4 keeps this check for.`,
  );
  assert(
    conflict.currentRevision === r1,
    `revision-conflict: the conflict reports currentRevision ${conflict.currentRevision}, but meta.revision is ${r1}. The ` +
      `caller retries at this number — a wrong one makes the retry loop forever.`,
  );

  const afterConflict = await loadEnvelope(store, 'revision-conflict: load after the conflict');
  assert(afterConflict.sessions.length === 0, `revision-conflict: a CONFLICTING commitSessionSummary wrote a session record anyway.`);
  assert(afterConflict.revision === r1, `revision-conflict: a conflicting commitSessionSummary moved meta.revision ${r1} → ${afterConflict.revision}.`);

  // Reload, re-derive, retry at the CURRENT revision (§3.4's REVISION_CONFLICT note).
  const retry = await store.commitSessionSummary({ ...write, expectedRevision: afterConflict.revision });
  assert(
    retry.status === 'committed',
    `revision-conflict: the retry at the current revision (${afterConflict.revision}) must commit, got '${retry.status}'. ` +
      `A conflict the caller cannot resolve by reloading is a deadlock, not a check.`,
  );
  assert(retry.revision === r1 + 1, `revision-conflict: the retry committed at revision ${retry.revision}, expected ${r1 + 1}.`);

  const afterRetry = await loadEnvelope(store, 'revision-conflict: load after the retry');
  assert(afterRetry.sessions.length === 1, `revision-conflict: expected 1 session record after the retry, found ${afterRetry.sessions.length}.`);
  const session = afterRetry.sessions[0];
  assert(session !== undefined, 'revision-conflict: unreachable — sessions.length is 1 but [0] is undefined.');
  assert(session.sessionId === write.session.sessionId, `revision-conflict: stored sessionId '${session.sessionId}', expected '${write.session.sessionId}'.`);
  assert(
    session.committedAtRevision === retry.revision,
    `revision-conflict: the session carries committedAtRevision ${session.committedAtRevision}, but the commit returned ${retry.revision}.`,
  );
  assert(afterRetry.revision === retry.revision, `revision-conflict: meta.revision is ${afterRetry.revision} after a commit that returned ${retry.revision}.`);
  return pass();
});

/**
 * 7 — `concurrent-appends` (Concurrent tabs column, OBSERVED). Design §2.4, §8.4, §11.
 *
 * THE SOLE EVIDENCE FOR DEVIATION #4 — `appendAttempt` dropping `expectedRevision`. The deviation
 * rests on one checked claim: IndexedDB serialises `readwrite` transactions with overlapping scope
 * across connections in the same origin, so a read-modify-write of `meta.revision` inside one
 * transaction is atomic across tabs. §2.4 ends "Gate 7 (§11) re-proves it against this contract."
 * If this gate is ever softened, an approved deviation loses its only proof.
 *
 * Catches: a lost update (both connections landing on ONE revision, or one attempt vanishing at
 * reload), and — just as importantly — an `appendAttempt` that "protects" itself by rejecting the
 * second connection. §2.4 is explicit that a conflict check on an append "protects nothing; it
 * deletes something": a second tab's append is genuine evidence, and raw attempts are the sole
 * durable truth.
 *
 * Shape (Option A, controller ruling): two connections obtained by two `open(namespace)` calls on
 * the subject, so this stays a uniform ProgressGate runnable by any host. Task 9's Playwright
 * runner separately drives a real two-PAGE race and records it as additional multi-tab evidence;
 * that is not this gate's job and is not built here.
 *
 * Non-capability when `multiConnection === false`. Also closes `journal/qa/ledger.md`'s standing
 * "multi-tab races untried" — for ProgressStore specifically, not for the app at large (§11).
 */
const concurrentAppends = gate('concurrent-appends', 'OBSERVED', async (run) => {
  if (!run.subject.capabilities.multiConnection) {
    // Not a skip (§11). The declaration is asserted, and the assertion is aimed at the shape this
    // design actually admits: §8.3 records the in-memory baseline as failing "exactly the two
    // gates (reload, concurrent tabs)", so multiConnection:false and durable:false travel together.
    assert(
      !run.subject.capabilities.durable,
      `concurrent-appends: ${run.subject.name} declares multiConnection:false but durable:true. Cycle 1 admits exactly ` +
        `two subject shapes — the in-memory fake (neither capability) and the idb adapter (both). §8.3 records the ` +
        `in-memory baseline as failing "exactly the two gates (reload, concurrent tabs)". A DURABLE single-connection ` +
        `store is a third shape this gate has no derived assertion for, and letting it report 'declared-unsupported' ` +
        `would be a vacuous pass on the only evidence for deviation #4. Re-derive gate 7 against it; do not relax this.`,
    );
    const detail = await assertDeclaredNonDurable(run);
    return {
      status: 'declared-unsupported',
      detail: `${run.subject.name} declares multiConnection:false. ${detail}`,
    };
  }

  await run.subject.destroy(run.ns);
  const a = await run.open('concurrent-appends: connection A');
  const b = await run.open('concurrent-appends: connection B');
  const drafts = makeAttemptTier(2);
  const draftA = requireDraft(drafts, 0);
  const draftB = requireDraft(drafts, 1);
  assert(draftA.attemptId !== draftB.attemptId, `fixture bug: makeAttemptTier(2) produced two attempts with the same attemptId '${draftA.attemptId}'.`);

  // NO runner-side mutex (§11 gate 7): both appends are in flight at once. The serialisation that
  // must produce two distinct revisions is the STORE's, not this gate's. Awaiting A before issuing
  // B would test nothing — it would prove sequential appends work, which gate 3 already proves.
  const [outA, outB] = await Promise.all([a.appendAttempt(draftA), b.appendAttempt(draftB)]);

  assert(
    outA.status === 'committed',
    `concurrent-appends: connection A's append returned '${outA.status}'. appendAttempt is UNCONDITIONAL (§2.4, ` +
      `deviation #4) — a conflict or rejection here destroys genuine evidence to satisfy a check that protects nothing.`,
  );
  assert(
    outB.status === 'committed',
    `concurrent-appends: connection B's append returned '${outB.status}'. Appends commute; two tabs appending DIFFERENT ` +
      `attempts do not conflict semantically (§2.4).`,
  );
  assert(
    outA.revision !== outB.revision,
    `concurrent-appends: both connections committed at revision ${outA.revision} — a lost update. The read-modify-write ` +
      `of meta.revision must be atomic across connections (§8.4).`,
  );
  assert(
    Math.abs(outA.revision - outB.revision) === 1,
    `concurrent-appends: revisions ${outA.revision} and ${outB.revision} are not consecutive. Each append reads ` +
      `meta.revision and assigns +1 inside its own transaction (§8.4), so two serialised appends yield N and N+1.`,
  );

  await a.close();
  await b.close();
  const reopened = await run.reopen('concurrent-appends: reopen');
  const envelope = await loadEnvelope(reopened, 'concurrent-appends: load after reopen');
  assert(
    envelope.attempts.length === 2,
    `concurrent-appends: ${envelope.attempts.length} of 2 concurrently-appended attempts survived the reload — a lost ` +
      `update that both appends reported as committed.`,
  );
  assertAttemptRoundTrips(requireAttempt(envelope, draftA.attemptId, 'concurrent-appends'), draftA, outA.revision, 'concurrent-appends/A');
  assertAttemptRoundTrips(requireAttempt(envelope, draftB.attemptId, 'concurrent-appends'), draftB, outB.revision, 'concurrent-appends/B');
  assert(
    envelope.revision === Math.max(outA.revision, outB.revision),
    `concurrent-appends: meta.revision settled at ${envelope.revision}, expected the higher of the two commits ` +
      `(${Math.max(outA.revision, outB.revision)}).`,
  );
  return pass();
});

/**
 * 8 — `canonical-export-stable` (Export/reset column, OBSERVED). Design §5.2, §5.3.
 *
 * Catches: a canonical export whose bytes depend on anything but content — a wall clock, or
 * `JSON.stringify` over an object whose key order is IndexedDB structured-clone read order. §5.2
 * is explicit that byte-identity must be "a property of this serializer", not an accident, and
 * that AL-R2's :216 migration gate is undefinable without it.
 *
 * The strongest check here is the FIRST one: the store's canonical bytes must BE
 * progress/canonical.ts's output over the loaded envelope. Comparing two exports to each other
 * would pass for a store that stringifies its own object twice, identically and wrongly.
 */
const canonicalExportStable = gate('canonical-export-stable', 'OBSERVED', async (run) => {
  await run.subject.destroy(run.ns);
  const store = await run.open('canonical-export-stable: open');
  for (const draft of makeAttemptTier(3)) {
    await appendCommitted(store, draft, `canonical-export-stable: append ${draft.attemptId}`);
  }
  const seeded = await loadEnvelope(store, 'canonical-export-stable: load before the summary');
  const committed = await store.commitSessionSummary({ session: sessionWrite(), expectedRevision: seeded.revision, cachedMastery: null });
  assert(committed.status === 'committed', `canonical-export-stable: seeding a session summary returned '${committed.status}'.`);

  const firstEnvelope = await loadEnvelope(store, 'canonical-export-stable: first load');
  const first = await exportCanonical(store, 'canonical-export-stable: first export');
  const expected = canonicalize(snapshotOf(run.ns, firstEnvelope));
  assert(
    first === expected,
    `canonical-export-stable: exportSnapshot({mode:'canonical'}) did not return progress/canonical.ts's bytes for the ` +
      `loaded envelope. Byte-identity is a PROPERTY OF THAT SERIALIZER (§5.2) — declared key order, declared array ` +
      `order, no clock — not of JSON.stringify.\nexpected=${expected}\nactual=${first}`,
  );
  assert(
    !first.includes('exportedAt'),
    `canonical-export-stable: the canonical bytes carry an 'exportedAt' key. The clock lives in the export WRAPPER, never ` +
      `in the evidence (§5.2, §5.3) — a timestamp inside these bytes breaks AL-R2's :216 gate outright. (Two rapid ` +
      `exports can share a timestamp, so byte-comparison alone would not catch this.)`,
  );

  await loadEnvelope(store, 'canonical-export-stable: second load');
  const second = await exportCanonical(store, 'canonical-export-stable: second export');
  assert(second === first, `canonical-export-stable: two exports across two separate loads differ.\nfirst=${first}\nsecond=${second}`);

  if (!run.subject.capabilities.durable) {
    return pass(
      `Byte-identity asserted across two separate load()s and against canonical.ts's own output. reopen() not exercised — ` +
        `${run.subject.name} declares durable:false, and gate 2 owns that non-capability.`,
    );
  }
  await store.close();
  const reopened = await run.reopen('canonical-export-stable: reopen');
  await loadEnvelope(reopened, 'canonical-export-stable: load after reopen');
  const third = await exportCanonical(reopened, 'canonical-export-stable: export after reopen');
  assert(
    third === first,
    `canonical-export-stable: the canonical export changed across a reopen — the bytes depend on physical read order, not ` +
      `on content (§5.2).\nbefore=${first}\nafter=${third}`,
  );
  return pass();
});

/**
 * 9 — `export-precedes-reset` (Export/reset column, OBSERVED). Design §3.4, §8.2.
 *
 * Catches: a store whose canonical export is unavailable exactly when there is something to save,
 * and a reset that destroys data the caller never looked at. §3.4 states the honest limit — the
 * port CANNOT enforce that the UI offered an export, and refuses to fake that with an
 * `exportOffered: boolean` the caller can lie about. What it CAN guarantee is that the export
 * works and that reset is revision-checked; those are the two halves asserted here.
 *
 * RUNTIME HALF ONLY. The brief's other clause — "reset without `acknowledged` does not type-check"
 * — is a COMPILE-TIME property, and gates are runtime data: they cannot assert `tsc`. It is handed
 * to Task 5's `contract.test.ts` as a `@ts-expect-error` block. It is not dropped; see
 * .wl/sdd/task-4-report.md.
 */
const exportPrecedesReset = gate('export-precedes-reset', 'OBSERVED', async (run) => {
  await run.subject.destroy(run.ns);
  const store = await run.open('export-precedes-reset: open');
  const drafts = makeAttemptTier(2);
  const r0 = await appendCommitted(store, requireDraft(drafts, 0), 'export-precedes-reset: first append');
  const r1 = await appendCommitted(store, requireDraft(drafts, 1), 'export-precedes-reset: second append');
  const envelope = await loadEnvelope(store, 'export-precedes-reset: load');
  assert(envelope.revision === r1, `export-precedes-reset: meta.revision is ${envelope.revision}, expected ${r1}.`);

  // (a) Canonical export succeeds WHILE DATA EXISTS. §8.2: reset is the only thing that frees
  //     space and it destroys everything — "which is exactly why export must precede reset".
  const json = await exportCanonical(store, 'export-precedes-reset: canonical export while data exists');
  const snapshot = parseJson(json, 'export-precedes-reset: canonical export');
  const attempts = snapshot['attempts'];
  assert(
    Array.isArray(attempts) && attempts.length === 2,
    `export-precedes-reset: the canonical export carries ${Array.isArray(attempts) ? attempts.length : 'no'} attempts, not ` +
      `the 2 that exist. An export that drops evidence is not an export, and it is the last thing standing before a reset.`,
  );

  // (b) reset at a STALE expectedRevision → conflict. r0 is a revision that GENUINELY existed, so
  //     this is a real staleness, not an impossible number the store might reject for other reasons.
  const stale = await store.reset({ acknowledged: 'reset-with-confirmation', expectedRevision: r0 });
  assert(
    stale.status === 'conflict',
    `export-precedes-reset: reset at a stale expectedRevision (${r0}; current ${r1}) must return {status:'conflict'}, got ` +
      `'${stale.status}'. expectedRevision proves the caller LOOKED first and stops a reset silently destroying a ` +
      `concurrent tab's writes it never saw (§3.4).`,
  );
  assert(stale.currentRevision === r1, `export-precedes-reset: the conflict reports currentRevision ${stale.currentRevision}, but meta.revision is ${r1}.`);

  const after = await loadEnvelope(store, 'export-precedes-reset: load after the conflicting reset');
  assert(after.revision === r1, `export-precedes-reset: a conflicting reset moved meta.revision ${r1} → ${after.revision}.`);
  assert(
    after.attempts.length === 2,
    `export-precedes-reset: a CONFLICTING reset destroyed evidence — ${after.attempts.length} of 2 attempts remain. A ` +
      `conflict means the reset did not happen.`,
  );
  const diagnosis = await store.diagnose();
  const physical = requireCount(diagnosis, 'attempts', 'export-precedes-reset');
  assert(physical === 2, `export-precedes-reset: the attempts store physically holds ${physical} records after a conflicting reset, expected 2.`);
  return pass();
});

/**
 * 10 — `complete-reset` (Export/reset column, OBSERVED). Design §3.4, §5.1.
 *
 * Catches: a reset that clears the envelope but strands records in a store it forgot — with §5.1's
 * three-store layout the obvious miss is `sessions`, which no `load()` on an empty namespace would
 * ever reveal. That is why all THREE stores are populated first and their counts asserted NON-zero
 * before the reset: "no residual records in any store" proves nothing about a store that was empty
 * to begin with.
 */
const completeReset = gate('complete-reset', 'OBSERVED', async (run) => {
  await run.subject.destroy(run.ns);
  const store = await run.open('complete-reset: open');
  const drafts = makeAttemptTier(2);
  await appendCommitted(store, requireDraft(drafts, 0), 'complete-reset: first append');
  const r1 = await appendCommitted(store, requireDraft(drafts, 1), 'complete-reset: second append');
  const committed = await store.commitSessionSummary({ session: sessionWrite(), expectedRevision: r1, cachedMastery: null });
  assert(
    committed.status === 'committed',
    `complete-reset: seeding a session summary returned '${committed.status}'. All THREE stores (§5.1: meta · attempts · ` +
      `sessions) must hold records before the reset, or "no residual records in any store" is vacuous.`,
  );
  const envelope = await loadEnvelope(store, 'complete-reset: load before the reset');

  // Non-vacuity: prove there IS something to remove, in every store §5.1 declares.
  const before = await store.diagnose();
  assert(requireCount(before, 'meta', 'complete-reset/before') === 1, `complete-reset: expected 1 meta record before the reset, found ${requireCount(before, 'meta', 'complete-reset/before')}.`);
  assert(requireCount(before, 'attempts', 'complete-reset/before') === 2, `complete-reset: expected 2 attempt records before the reset, found ${requireCount(before, 'attempts', 'complete-reset/before')}.`);
  assert(requireCount(before, 'sessions', 'complete-reset/before') === 1, `complete-reset: expected 1 session record before the reset, found ${requireCount(before, 'sessions', 'complete-reset/before')}.`);

  const reset = await store.reset({ acknowledged: 'reset-with-confirmation', expectedRevision: envelope.revision });
  assert(reset.status === 'reset', `complete-reset: reset at the CURRENT revision (${envelope.revision}) must return {status:'reset'}, got '${reset.status}'.`);

  const after = await store.load();
  assert(after.status === 'empty', `complete-reset: load() after a complete reset must return {status:'empty'}, got '${after.status}'.`);
  assertNoStoredRecords(await store.diagnose(), 'complete-reset: no residual records may remain in ANY store');
  return pass();
});

/**
 * 11 — `migration-additive` (Migration/recovery column, OBSERVED). Design §8.1, §3.5, §5.2.
 *
 * Catches: a migration that is never reported (§3.5 — "explicit" contrasts with SILENT, not with
 * automatic: "the caller cannot fail to learn that its data moved"); a default that never
 * materializes; and — the clause that matters most — a migration that RESTRUCTURES or DROPS
 * anything on its way through. §8.1 licenses exactly one shape and nothing else.
 *
 * Two surfaces, because neither alone is sufficient:
 *   - The v2 default is checked through RAW export. Canonical export hand-enumerates the keys of
 *     THIS build's `ProgressAttempt` (canonical.ts's `AllKeysOf` tripwire), and a test-only v2
 *     field is not one of them — so the uninterpreted dump (§3.6) is the only surface that can see
 *     it land. Asserting it through canonical bytes would be a check that cannot fail.
 *   - The golden is the SAME content re-declared at v2. An additive migration must move exactly
 *     one thing in the canonical view — the schema version. A dropped attempt, a re-keyed field, a
 *     re-nested group, or a revision bump the migration had no business making all move these
 *     bytes. (Note the corollary: this gate asserts a migration does NOT advance `meta.revision`.
 *     §8.1 point 2 licenses exactly one migration shape — additive-field-with-default, verified
 *     byte-identical against a golden fixture — and canonical.ts's `AllKeysOf` tripwire hand-
 *     enumerates this build's `ProgressAttempt` keys, so `schemaVersion` is the ONLY thing an
 *     additive migration may move in the canonical view. A revision bump moves a second thing,
 *     outside §8.1's license — not merely a fact about `committedAtRevision`'s single assignment
 *     (§6, which is about the ATTEMPT field, not `meta.revision`).)
 */
const migrationAdditive = gate('migration-additive', 'OBSERVED', async (run) => {
  await run.subject.destroy(run.ns);
  const seeding = await run.open('migration-additive: open the v1 fixture');
  const drafts = makeAttemptTier(2);
  for (const draft of drafts) {
    await appendCommitted(seeding, draft, `migration-additive: seed ${draft.attemptId}`);
  }
  const v1 = await loadEnvelope(seeding, 'migration-additive: load the v1 fixture');
  assert(
    v1.schemaVersion === V1_SCHEMA,
    `migration-additive: this gate's premise is a v1 fixture, but ${run.subject.name}'s envelope reports schemaVersion ` +
      `${v1.schemaVersion}. The gate is checking the premise rather than assuming it — a v1→v2 migration over a store ` +
      `that was never v1 proves nothing.`,
  );
  const golden = canonicalize({ ...snapshotOf(run.ns, v1), schemaVersion: V2_SCHEMA });
  await seeding.close();

  const migrated = await run.migrate(ADDITIVE_V2, 'migration-additive: open at v2 with a test-only additive migration');
  const load = await migrated.load();
  assert(load.status === 'loaded', `migration-additive: load() at v2 must return {status:'loaded'}, got '${load.status}'.`);
  const report = load.migrated;
  assert(
    report !== null,
    `migration-additive: load() reported migrated:null after a v1→v2 upgrade. §3.5 — the migration is always REPORTED; ` +
      `"the caller cannot fail to learn that its data moved".`,
  );
  assert(
    report.from === V1_SCHEMA && report.to === V2_SCHEMA,
    `migration-additive: expected migrated:{from:${V1_SCHEMA},to:${V2_SCHEMA}}, got {from:${report.from},to:${report.to}}.`,
  );
  assert(load.envelope.schemaVersion === V2_SCHEMA, `migration-additive: the migrated envelope reports schemaVersion ${load.envelope.schemaVersion}, expected ${V2_SCHEMA}.`);
  assert(
    load.envelope.attempts.length === 2,
    `migration-additive: the migration dropped evidence — ${load.envelope.attempts.length} of 2 attempts survived. A ` +
      `migration never restructures and never drops evidence (§8.1).`,
  );

  const raw = await exportRaw(migrated, 'migration-additive: raw export after the migration');
  const attemptRecords = requireStore(raw, 'attempts', 'migration-additive');
  assert(attemptRecords.length === 2, `migration-additive: the raw export holds ${attemptRecords.length} attempt records, expected 2.`);
  for (const draft of drafts) {
    const record = requireRecord(attemptRecords, 'attemptId', draft.attemptId, 'migration-additive');
    assert(
      record[TEST_V2_FIELD] === TEST_V2_VALUE,
      `migration-additive: the v2 default did not materialize on '${draft.attemptId}' — expected ${TEST_V2_FIELD}=` +
        `'${TEST_V2_VALUE}', got ${JSON.stringify(record[TEST_V2_FIELD])}. A materialized default is the ONLY migration ` +
        `that bumps the schema (§8.1 point 2); an upgrade that bumps the version without running the cursor transform is ` +
        `a schema that lies about its own records.`,
    );
  }

  const exported = await exportCanonical(migrated, 'migration-additive: canonical export after the migration');
  assert(
    exported === golden,
    `migration-additive: the post-migration canonical export does not match the golden — the SAME content re-declared at ` +
      `v2. The migration changed something it had no license to change (§8.1: never rename, never re-key, never re-nest, ` +
      `never drop).\ngolden=${golden}\nactual=${exported}`,
  );

  // AL-R2 :216, verbatim: "reopening and re-running the v2 path produces byte-identical canonical
  // export". The store is already at v2, so nothing may migrate a second time.
  await migrated.close();
  const rerun = await run.migrate(ADDITIVE_V2, 'migration-additive: re-run the v2 path');
  const second = await rerun.load();
  assert(second.status === 'loaded', `migration-additive: re-running the v2 path must load, got '${second.status}'.`);
  assert(
    second.migrated === null,
    `migration-additive: the v2 path re-ran a migration on a store ALREADY at v2 (migrated:{from:${second.migrated?.from},` +
      `to:${second.migrated?.to}}). A migration that re-applies is a transform running over its own output.`,
  );
  const reexported = await exportCanonical(rerun, 'migration-additive: canonical re-export');
  assert(reexported === golden, `migration-additive: re-running the v2 path produced different canonical bytes (AL-R2 :216).\ngolden=${golden}\nactual=${reexported}`);
  return pass();
});

/**
 * 12 — `migration-abort-rollback` (Migration/recovery column, SYNTHETIC). Design §8.1, §3.2.
 *
 * Catches: a half-migrated store. AL-R2's own prose names the hazard — "cursor transforms attempts
 * before metadata completes" — and the failure mode is the worst one available: a version number
 * that says v2 over records that are still v1, or v2 records under a v1 version. Either is a store
 * whose schema and contents disagree, which §4.6 says makes canonical re-export undefinable.
 *
 * The physical-version check is doubled deliberately. `open()` at the app's own (v1) version
 * SUCCEEDING is itself evidence — IndexedDB fails an open at a version LOWER than the physical one
 * — and `diagnose().detectedSchema` states it directly. `raw.physicalVersion` is the third,
 * uninterpreted reading (§3.6: "db.version as found").
 */
const migrationAbortRollback = gate('migration-abort-rollback', 'SYNTHETIC', async (run) => {
  await run.subject.destroy(run.ns);
  const seeding = await run.open('migration-abort-rollback: open the v1 fixture');
  const draft = makeAttemptDraft();
  const revision = await appendCommitted(seeding, draft, 'migration-abort-rollback: seed');
  const v1 = await loadEnvelope(seeding, 'migration-abort-rollback: load the v1 fixture');
  assert(v1.schemaVersion === V1_SCHEMA, `migration-abort-rollback: this gate's premise is a v1 fixture; the envelope reports schemaVersion ${v1.schemaVersion}.`);
  await seeding.close();

  await run.subject.abortNextUpgrade(run.ns);
  const aborted = await run.migrateOutcome(ADDITIVE_V2);
  assert(
    aborted.status === 'unavailable',
    `migration-abort-rollback: an ABORTED v1→v2 upgrade must not yield an open store; got '${aborted.status}'. OpenOutcome ` +
      `has exactly two branches (§3.2), so an aborted upgrade surfaces as {status:'unavailable'}.`,
  );
  assert(aborted.error.code === 'STORAGE_UNAVAILABLE', `migration-abort-rollback: the aborted upgrade reported error code '${aborted.error.code}'.`);
  assert(aborted.error.namespace === run.ns, `migration-abort-rollback: the error names namespace '${aborted.error.namespace}', expected '${run.ns}'.`);

  const probe = await run.open('migration-abort-rollback: reopen at v1 after the aborted upgrade');
  const diagnosis = await probe.diagnose();
  assert(
    diagnosis.detectedSchema === V1_SCHEMA,
    `migration-abort-rollback: the store is physically at schema ${JSON.stringify(diagnosis.detectedSchema)} after an ` +
      `ABORTED upgrade; it must still be v1. A version bump that outlives its own transaction is a store claiming a ` +
      `schema its records do not have (§4.6).`,
  );
  assert(requireCount(diagnosis, 'attempts', 'migration-abort-rollback') === 1, `migration-abort-rollback: expected 1 attempt after the aborted upgrade, diagnose() reports ${requireCount(diagnosis, 'attempts', 'migration-abort-rollback')}.`);

  const raw = await exportRaw(probe, 'migration-abort-rollback: raw export after the aborted upgrade');
  assert(raw.physicalVersion === V1_SCHEMA, `migration-abort-rollback: raw export reports physicalVersion ${JSON.stringify(raw.physicalVersion)} ("db.version as found", §3.6), expected ${V1_SCHEMA}.`);
  const record = requireRecord(requireStore(raw, 'attempts', 'migration-abort-rollback'), 'attemptId', draft.attemptId, 'migration-abort-rollback');
  assert(
    !(TEST_V2_FIELD in record),
    `migration-abort-rollback: the aborted upgrade left a PARTIAL transform behind — '${draft.attemptId}' carries ` +
      `${TEST_V2_FIELD}=${JSON.stringify(record[TEST_V2_FIELD])}. The cursor transform and the version bump are one ` +
      `versionchange transaction; an abort must undo both.`,
  );

  const loaded = await loadEnvelope(probe, 'migration-abort-rollback: load at v1 after the abort');
  assert(loaded.schemaVersion === V1_SCHEMA, `migration-abort-rollback: the envelope reports schemaVersion ${loaded.schemaVersion} after the aborted upgrade, expected ${V1_SCHEMA}.`);
  assert(loaded.attempts.length === 1, `migration-abort-rollback: ${loaded.attempts.length} attempts survived the aborted upgrade, expected 1.`);
  assertAttemptRoundTrips(requireAttempt(loaded, draft.attemptId, 'migration-abort-rollback'), draft, revision, 'migration-abort-rollback');
  await probe.close();

  // Retry succeeds — an abort that poisons the store is not a rollback.
  const retried = await run.migrate(ADDITIVE_V2, 'migration-abort-rollback: retry the upgrade');
  const load = await retried.load();
  assert(load.status === 'loaded', `migration-abort-rollback: the retried upgrade must load, got '${load.status}'.`);
  const report = load.migrated;
  assert(report !== null, `migration-abort-rollback: the retried upgrade reported migrated:null.`);
  assert(report.from === V1_SCHEMA && report.to === V2_SCHEMA, `migration-abort-rollback: the retry reported migrated:{from:${report.from},to:${report.to}}, expected {from:${V1_SCHEMA},to:${V2_SCHEMA}}.`);
  const rawAfter = await exportRaw(retried, 'migration-abort-rollback: raw export after the retry');
  const migratedRecord = requireRecord(requireStore(rawAfter, 'attempts', 'migration-abort-rollback'), 'attemptId', draft.attemptId, 'migration-abort-rollback');
  assert(migratedRecord[TEST_V2_FIELD] === TEST_V2_VALUE, `migration-abort-rollback: the retried upgrade did not materialize the v2 default; got ${JSON.stringify(migratedRecord[TEST_V2_FIELD])}.`);
  return pass();
});

/**
 * 13 — `corrupt-recovery` (Migration/recovery column, SYNTHETIC). Design §8.4, §3.3, §3.6, §3.5.
 *
 * Catches, in order of severity:
 *   - An AUTOMATIC RESET. [PINNED, §8.4: "No automatic reset, ever."] A store that "recovers" by
 *     discarding the evidence has destroyed the sole durable truth. Asserting only that the status
 *     is 'recovery-required' would not notice.
 *   - A raw export that VALIDATES. §3.6: "Raw export must never validate. The moment it applies the
 *     schema it loses the only property that makes it useful." A validating raw export drops or
 *     chokes on exactly the record you need it for.
 *   - Silently skipping the bad record. §8.4 is deliberate: one bad record fails the WHOLE load,
 *     because quietly skipping it "would make mastery non-reproducible AND hide data loss".
 *
 * This gate and gate 14 carry the clause AL-R2's harness could not — raw export works in the
 * failure state — which is §3.6's hole closed by a test rather than by a paragraph. It is also
 * what makes "fail closed" survivable rather than merely harsh.
 */
const corruptRecovery = gate('corrupt-recovery', 'SYNTHETIC', async (run) => {
  await run.subject.destroy(run.ns);
  const seeding = await run.open('corrupt-recovery: open');
  const drafts = makeAttemptTier(2);
  const stored: ProgressAttempt[] = [];
  for (const draft of drafts) {
    const revision = await appendCommitted(seeding, draft, `corrupt-recovery: seed ${draft.attemptId}`);
    stored.push({ ...draft, committedAtRevision: revision });
  }
  const before = await loadEnvelope(seeding, 'corrupt-recovery: load before the corruption');
  assert(before.attempts.length === 2, `corrupt-recovery: expected 2 seeded attempts, found ${before.attempts.length}.`);
  await seeding.close();

  await run.subject.corrupt(run.ns, 'attempt');

  const store = await run.open('corrupt-recovery: open over the corrupt namespace');
  const load = await store.load();
  assert(
    load.status === 'recovery-required',
    `corrupt-recovery: one malformed attempt must fail the WHOLE load (§8.4 — fail closed); got '${load.status}'. ` +
      `Silently skipping a corrupt attempt makes mastery non-reproducible and hides data loss.`,
  );
  const error = load.error;
  assert(error.code === 'RECOVERY_REQUIRED', `corrupt-recovery: expected code 'RECOVERY_REQUIRED', got '${error.code}'.`);
  assert(error.namespace === run.ns, `corrupt-recovery: the error names namespace '${error.namespace}', expected '${run.ns}'.`);
  assert(
    error.detectedSchema === V1_SCHEMA,
    `corrupt-recovery: RECOVERY_REQUIRED must report detectedSchema:${V1_SCHEMA} (§3.3) — only the 'attempt' record was ` +
      `corrupted, so the meta singleton is intact and the physical schema IS readable; ${JSON.stringify(error.detectedSchema)} ` +
      `either lies about a present, readable v1 namespace (a value of null) or fails to report what a human needs to see ` +
      `to know what they are looking at.`,
  );
  assertSafeActions(error.safeActions, RECOVERY_SAFE_ACTIONS, 'corrupt-recovery');
  assert(
    error.invalid.length >= 1,
    `corrupt-recovery: RECOVERY_REQUIRED must ITEMIZE the invalid records (§8.4 — one of the three mitigations that make ` +
      `failing closed survivable); invalid[] is empty.`,
  );
  for (const ref of error.invalid) {
    assert(typeof ref.store === 'string' && ref.store.length > 0, `corrupt-recovery: an InvalidRecordRef must name its store; got ${JSON.stringify(ref.store)}.`);
    assert('key' in ref, `corrupt-recovery: an InvalidRecordRef must carry the offending key (§3.3).`);
    assert(typeof ref.reason === 'string' && ref.reason.length > 0, `corrupt-recovery: an InvalidRecordRef must say WHY (§8.4: itemises which records failed AND WHY); reason is ${JSON.stringify(ref.reason)}.`);
  }

  // NO AUTOMATIC RESET, EVER [PINNED §8.4]. Every record is still there — the corrupt one included.
  const diagnosis = await store.diagnose();
  const attemptCount = requireCount(diagnosis, 'attempts', 'corrupt-recovery');
  assert(
    attemptCount === 2,
    `corrupt-recovery: ${attemptCount} of 2 attempt records remain — the store reset itself in response to corruption. ` +
      `No automatic reset, ever (§8.4) — recovery is a USER decision, reached through export-raw and a confirmed reset.`,
  );
  assert(requireCount(diagnosis, 'meta', 'corrupt-recovery') === 1, `corrupt-recovery: the meta singleton was removed; ${requireCount(diagnosis, 'meta', 'corrupt-recovery')} records remain.`);
  assert(diagnosis.integrity.invalid.length >= 1, `corrupt-recovery: diagnose().integrity must itemize the invalid records (§3.5); invalid[] is empty.`);

  // Canonical export is refused, and names the retry (§3.4's "→ retry with mode:'raw'").
  const canonical = await store.exportSnapshot({ mode: 'canonical' });
  assert(
    canonical.status === 'not-canonical-exportable',
    `corrupt-recovery: a canonical export of an UNLOADABLE envelope must return {status:'not-canonical-exportable'}, got ` +
      `'${canonical.status}'. You cannot canonicalise a store whose records you cannot read (§4.6).`,
  );
  assert(canonical.error.code === 'RECOVERY_REQUIRED', `corrupt-recovery: the refusal carries code '${canonical.error.code}', expected 'RECOVERY_REQUIRED'.`);

  // RAW EXPORT STILL RETURNS THE GOOD RECORDS (§3.6, §8.4).
  const raw = await exportRaw(store, 'corrupt-recovery: raw export in the failure state');
  const attemptRecords = requireStore(raw, 'attempts', 'corrupt-recovery');
  assert(
    attemptRecords.length === 2,
    `corrupt-recovery: raw export returned ${attemptRecords.length} of 2 attempt records. Raw export must never VALIDATE ` +
      `(§3.6) — it dumps every record uninterpreted, corrupt ones included. A raw export that applies the schema loses ` +
      `the only property that makes it useful.`,
  );
  const intact = stored.filter((attempt) => attemptRecords.some((record) => deepEqual(record, attempt)));
  assert(
    intact.length >= 1,
    `corrupt-recovery: raw export returned no INTACT good record. Corrupting ONE attempt must leave the other retrievable ` +
      `byte-for-byte — §8.4's "export-raw retrieves everything, including the good records" is the first of the three ` +
      `mitigations that make failing the whole load survivable.`,
  );
  assert(requireStore(raw, 'meta', 'corrupt-recovery').length === 1, `corrupt-recovery: raw export returned ${requireStore(raw, 'meta', 'corrupt-recovery').length} meta records, expected 1.`);
  return pass();
});

/**
 * 14 — `newer-schema-refusal` (Migration/recovery column, SYNTHETIC). Design §8.4, §3.5, §3.6.
 *
 * Catches: an app build that "helpfully" resets or downgrades a store written by a NEWER build —
 * the multi-tab-after-update case, where the other tab's data is perfectly good and this build
 * simply cannot read it. [PINNED §8.4: no automatic reset, ever.] §3.5 is explicit that additive
 * migration "never touches an unknown-newer or corrupt store".
 *
 * `open()` must SUCCEED here: `newer-schema` is a LoadOutcome (§3.4) and OpenOutcome's only
 * non-open branch is StorageUnavailableError (§3.2). A store that refused to open would make
 * {status:'newer-schema'} unreachable and strand the export-raw path AL-R2 :226-228 mandates.
 *
 * `raw.physicalVersion === 999` is the assertion that proves the MECHANISM, not just the outcome:
 * §3.6 says raw export "opens the database with no version argument ... Passing our expected
 * version is exactly what would break it."
 */
const newerSchemaRefusal = gate('newer-schema-refusal', 'SYNTHETIC', async (run) => {
  await run.subject.destroy(run.ns);
  const seeding = await run.open('newer-schema-refusal: open');
  const draft = makeAttemptDraft();
  const revision = await appendCommitted(seeding, draft, 'newer-schema-refusal: seed');
  const stored: ProgressAttempt = { ...draft, committedAtRevision: revision };
  const v1 = await loadEnvelope(seeding, 'newer-schema-refusal: load the seeded fixture');
  assert(v1.schemaVersion === V1_SCHEMA, `newer-schema-refusal: expected a v1 fixture; the envelope reports schemaVersion ${v1.schemaVersion}.`);
  await seeding.close();

  await run.subject.setPhysicalSchema(run.ns, NEWER_PHYSICAL_SCHEMA);

  const store = await run.open(`newer-schema-refusal: open over a schema-${NEWER_PHYSICAL_SCHEMA} namespace`);
  const load = await store.load();
  assert(
    load.status === 'newer-schema',
    `newer-schema-refusal: a store physically at schema ${NEWER_PHYSICAL_SCHEMA} must load {status:'newer-schema'}, got ` +
      `'${load.status}'.`,
  );
  const error = load.error;
  assert(error.code === 'NEWER_SCHEMA', `newer-schema-refusal: expected code 'NEWER_SCHEMA', got '${error.code}'.`);
  assert(error.namespace === run.ns, `newer-schema-refusal: the error names namespace '${error.namespace}', expected '${run.ns}'.`);
  assert(
    error.detectedSchema === NEWER_PHYSICAL_SCHEMA,
    `newer-schema-refusal: NEWER_SCHEMA.detectedSchema must report the schema FOUND (${NEWER_PHYSICAL_SCHEMA}), got ` +
      `${JSON.stringify(error.detectedSchema)} — it is what tells a human which app version can read this store.`,
  );
  assert(
    error.expectedSchema < error.detectedSchema,
    `newer-schema-refusal: expectedSchema (${error.expectedSchema}) must be lower than the detected ${error.detectedSchema} — ` +
      `that is what makes the store NEWER than this build.`,
  );
  assertSafeActions(error.safeActions, NEWER_SCHEMA_SAFE_ACTIONS, 'newer-schema-refusal');

  // NO RESET [PINNED §8.4]. An unknown-newer store is never touched (§3.5).
  const diagnosis = await store.diagnose();
  assert(diagnosis.detectedSchema === NEWER_PHYSICAL_SCHEMA, `newer-schema-refusal: diagnose() reports detectedSchema ${JSON.stringify(diagnosis.detectedSchema)}, expected ${NEWER_PHYSICAL_SCHEMA}.`);
  const migration = diagnosis.migration;
  assert(migration.kind === 'unsupported', `newer-schema-refusal: diagnose() must report migration {kind:'unsupported'} for an unknown-newer store, got '${migration.kind}'. An 'additive-available' here would be this build offering to migrate a schema it has never heard of.`);
  assert(migration.reason === 'newer-than-app', `newer-schema-refusal: expected migration reason 'newer-than-app', got '${migration.reason}'.`);
  const attemptCount = requireCount(diagnosis, 'attempts', 'newer-schema-refusal');
  assert(
    attemptCount === 1,
    `newer-schema-refusal: ${attemptCount} of 1 attempt records remain — this build reset a store written by a NEWER one. ` +
      `No automatic reset, ever (§8.4); the data is not corrupt, it is merely unreadable HERE.`,
  );
  assert(requireCount(diagnosis, 'meta', 'newer-schema-refusal') === 1, `newer-schema-refusal: the meta singleton was removed; ${requireCount(diagnosis, 'meta', 'newer-schema-refusal')} records remain.`);

  const canonical = await store.exportSnapshot({ mode: 'canonical' });
  assert(canonical.status === 'not-canonical-exportable', `newer-schema-refusal: a canonical export at schema ${NEWER_PHYSICAL_SCHEMA} must return {status:'not-canonical-exportable'}, got '${canonical.status}'.`);
  assert(canonical.error.code === 'NEWER_SCHEMA', `newer-schema-refusal: the refusal carries code '${canonical.error.code}', expected 'NEWER_SCHEMA'.`);

  // RAW EXPORT STILL WORKS (§3.6): "It therefore works at schema 999 ... at any future schema this
  // build has never heard of."
  const raw = await exportRaw(store, `newer-schema-refusal: raw export at schema ${NEWER_PHYSICAL_SCHEMA}`);
  assert(raw.namespace === run.ns, `newer-schema-refusal: raw export names namespace '${raw.namespace}', expected '${run.ns}'.`);
  assert(
    raw.physicalVersion === NEWER_PHYSICAL_SCHEMA,
    `newer-schema-refusal: raw export must report physicalVersion as db.version AS FOUND (${NEWER_PHYSICAL_SCHEMA}, §3.6), ` +
      `got ${JSON.stringify(raw.physicalVersion)}. Raw export opens with NO version argument — passing this build's ` +
      `expected version is exactly what would break it.`,
  );
  const attemptRecords = requireStore(raw, 'attempts', 'newer-schema-refusal');
  assert(attemptRecords.length === 1, `newer-schema-refusal: raw export returned ${attemptRecords.length} attempt records, expected 1.`);
  assert(
    deepEqual(attemptRecords[0], stored),
    `newer-schema-refusal: raw export did not return the record intact at schema ${NEWER_PHYSICAL_SCHEMA}.\nexpected=` +
      `${JSON.stringify(stored)}\nactual=${JSON.stringify(attemptRecords[0])}`,
  );
  return pass();
});

// === The suite ================================================================================

/**
 * The 14 gates, in design §11's table order. Both cycle-1 subjects run this exact array: Task 5's
 * in-memory fake under Vitest (expected 12 pass + 2 declared-unsupported, preserving AL-R2's
 * honest :162 record), and Tasks 7-9's `idb` adapter inside a real browser page (expected 14 pass).
 */
export const PROGRESS_STORE_GATES: ProgressGate[] = [
  openEmpty,
  reloadPersistence,
  atomicCommit,
  writeAbortRollback,
  idempotencyDuplicate,
  revisionConflict,
  concurrentAppends,
  canonicalExportStable,
  exportPrecedesReset,
  completeReset,
  migrationAdditive,
  migrationAbortRollback,
  corruptRecovery,
  newerSchemaRefusal,
];

// Design §11 fixes the suite at 14. This throws at IMPORT time, so a dropped gate cannot hide
// behind a green run: a suite that quietly shrank to 13 would still report "all gates passed".
const EXPECTED_GATE_COUNT = 14;
if (PROGRESS_STORE_GATES.length !== EXPECTED_GATE_COUNT) {
  throw new Error(
    `progress/contract.ts: design §11 fixes the contract suite at ${EXPECTED_GATE_COUNT} gates; this module exports ` +
      `${PROGRESS_STORE_GATES.length}. Gates are the entire evidence base for cycle 1 — including the §2.4 appendAttempt ` +
      `deviation (gate 7) and the §5.1 three-store layout (gates 3-5). Removing one removes a proof.`,
  );
}

const GATE_IDS = PROGRESS_STORE_GATES.map((entry) => entry.id);
if (new Set(GATE_IDS).size !== GATE_IDS.length) {
  throw new Error(`progress/contract.ts: gate ids must be unique; got [${GATE_IDS.join(', ')}].`);
}
