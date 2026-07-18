// Browser entry for the ProgressStore contract suite (design §11), run against the REAL `idb`
// adapter (web/src/progress/idb-store.ts) inside a real browser page under Playwright (Task 9).
//
// WHY THIS EXISTS AT ALL. `web`'s Vitest environment is `node` (web/vite.config.ts — NOT jsdom),
// which has no IndexedDB and no DOM, so the adapter cannot be gated under Vitest. `contract.ts`
// holds the 14 gates as host-neutral DATA precisely so this file can drive the SAME 14 against the
// idb adapter here, where a real IndexedDB exists. This module is bundled by `vite build` (run.ts)
// into a page served over a real http origin (an opaque origin denies IndexedDB), and exposes its
// entry points on `window` for the Playwright runner to call.
//
// WHAT IT BUILDS. The idb `ContractSubject` — `capabilities:{durable:true, multiConnection:true}`,
// so gates 2 (reload) and 7 (concurrent tabs) RUN rather than reporting `declared-unsupported`.
// `open`/`reopen` go through the real exported `openProgressStore`, so gates 1-10, 13, 14 exercise
// the adapter directly. The SYNTHETIC controls (corrupt, setPhysicalSchema, abortNextWrite,
// abortNextUpgrade, withMigrations, destroy) are the SUBJECT's business (contract.ts §"HONESTY"):
// they inject deterministic faults the port itself must never be able to synthesise.
//
// HOW THE FAULTS STAY HONEST (self-review contract):
//   - `corrupt` MUTATES one existing record in place via a raw readwrite cursor — never inserts,
//     never resets — leaving every other store's count unchanged (gate 13's detectedSchema:1 needs
//     the meta singleton physically intact).
//   - `setPhysicalSchema` runs a real `versionchange` to 999 that creates no store and alters no
//     record — only the db.version marker moves (gate 14).
//   - `abortNextWrite` patches the native `IDBObjectStore.prototype.add` for ONE call: it queues the
//     adapter's real write, then calls `transaction.abort()`. A REAL AbortError surfaces in the
//     adapter's own catch (task-7 report: "aborted write ⇒ AbortError, gate 4"), the transaction
//     rolls back by IndexedDB's own guarantee, and — critically — the CONNECTION SURVIVES (a tx
//     abort does not close the db), so the gate's post-abort `load()` still succeeds. Superseding the
//     connection would have made that `load()` return `unavailable` and failed the gate for the
//     wrong reason.
//   - `abortNextUpgrade` + `withMigrations` own the versionchange path end to end (the fixed
//     `OpenProgressStore` signature cannot take a migration map — task-7 report finding #2). On the
//     abort branch a real `versionchange` transaction to v2 is opened and then aborted from inside
//     its upgrade callback: IndexedDB rolls the version bump back to v1 (gate 12). On the success
//     branch the additive field is materialised by a real cursor transform and the version bump is
//     then driven by the REAL adapter's `openProgressStore`, so `load().migrated` is the adapter's
//     own genuine `{from,to}` capture (gate 11), not a value this harness fabricates.
//   - `destroy` deletes the namespace database entirely (a synthetic control — NOT the product
//     reset, which clears stores; ruling 4).

import { deleteDB, openDB, type IDBPDatabase } from 'idb';
import { PROGRESS_STORE_GATES } from '../../src/progress/contract';
import type {
  ContractSubject,
  GateResult,
  MigrationMap,
  MigrationStoreName,
} from '../../src/progress/contract';
import type { OpenOutcome, ProgressStoreConfig } from '../../src/progress/store';
import type { LearnerKey } from '../../src/progress/types';
import { openProgressStore } from '../../src/progress/idb-store';
import { makeAttemptDraft } from '../../src/progress/fixtures';

// === Config ===================================================================================

const IDB_SCHEMA_VERSION = 1;
const META_SINGLETON_ID = 'envelope';

/** What a corrupt record looks like: a string where a structured field belongs (mirrors the fake). */
const CORRUPT_MARKER = 'contract-suite-corrupted';

/**
 * Deterministic, synchronous, format-agnostic (§6). A fixed opaque string keeps canonical bytes
 * reproducible across a reopen (gate 8) — the key is minted ONCE by the first append and then read
 * back unchanged, exactly as a real key mint would be.
 */
const mintIdbLearnerKey = (): LearnerKey => 'idb-contract-learner-0001' as LearnerKey;

const configFor = (namespace: string, schemaVersion: number): ProgressStoreConfig => ({
  namespace,
  schemaVersion,
  mintLearnerKey: mintIdbLearnerKey,
});

function storageUnavailable(namespace: string, detectedSchema: number | null): OpenOutcome {
  return {
    status: 'unavailable',
    error: { code: 'STORAGE_UNAVAILABLE', namespace, detectedSchema, safeActions: ['retry'], reason: 'unknown' },
  };
}

// === One-shot write-abort injection (gate 4) ==================================================
//
// A native `IDBObjectStore.prototype.add` patch, installed ONCE. When armed for a namespace, the
// NEXT `add` on a readwrite transaction of that database queues the real write and then aborts the
// transaction — a genuine tx-level abort of the ADAPTER's own transaction, leaving the connection
// alive. It is one-shot (disarmed the moment it fires) and namespace-scoped, so it never disturbs
// any other write.

let armedWriteAbortDb: string | null = null;

function installWriteAbortHook(): void {
  const proto = IDBObjectStore.prototype as unknown as {
    add: (this: IDBObjectStore, ...args: unknown[]) => IDBRequest;
    __contractPatched?: boolean;
  };
  if (proto.__contractPatched) return;
  const originalAdd = proto.add;
  proto.add = function patchedAdd(this: IDBObjectStore, ...args: unknown[]): IDBRequest {
    const request = originalAdd.apply(this, args as never[]);
    const tx = this.transaction;
    if (armedWriteAbortDb !== null && tx.mode === 'readwrite' && tx.db.name === armedWriteAbortDb) {
      armedWriteAbortDb = null; // one-shot: disarm BEFORE aborting so nothing re-enters
      try {
        tx.abort();
      } catch {
        /* already inactive — the queued request will still error out */
      }
    }
    return request;
  };
  proto.__contractPatched = true;
}

// === One-shot upgrade-abort injection (gate 12) ===============================================

const armedUpgradeAbort = new Set<string>();

/** Consume the one-shot upgrade-abort flag for a namespace. */
function consumeUpgradeAbort(namespace: string): boolean {
  if (!armedUpgradeAbort.has(namespace)) return false;
  armedUpgradeAbort.delete(namespace);
  return true;
}

// === Raw IndexedDB helpers (the synthetic controls' real surface) =============================

type RawRecord = { [key: string]: unknown };

/** The physical db.version as found, without triggering an upgrade. */
async function physicalVersionOf(namespace: string): Promise<number> {
  const db = await openDB(namespace);
  const version = db.version;
  db.close();
  return version;
}

/**
 * Apply each additive step's transform to every record in its store, in a real readwrite cursor
 * transaction, WITHOUT changing the schema version. The version bump is left to the adapter's own
 * `openProgressStore` (success branch of `withMigrations`), so `load().migrated` is the adapter's
 * genuine capture. The transform preserves the keyPath value, so `cursor.update` re-keys nothing.
 */
async function materialiseAdditive(namespace: string, map: MigrationMap): Promise<void> {
  const db = await openDB(namespace);
  try {
    for (const step of [...map.steps].sort((a, b) => a.from - b.from)) {
      const tx = db.transaction(step.store, 'readwrite');
      let cursor = await tx.store.openCursor();
      while (cursor) {
        await cursor.update(step.transform(cursor.value as RawRecord) as never);
        cursor = await cursor.continue();
      }
      await tx.done;
    }
  } finally {
    db.close();
  }
}

// === The idb ContractSubject ==================================================================

installWriteAbortHook();

const idbSubject: ContractSubject = {
  name: 'idb (web/src/progress/idb-store.ts)',
  // Declared, and PROVEN by gates 2 and 7 rather than trusted (§11). Both true: a real IndexedDB
  // database survives a reload (durable) and admits multiple connections in one origin
  // (multiConnection). This is exactly what makes the idb row 14/14 where the in-memory fake is 12/14.
  capabilities: { durable: true, multiConnection: true },

  open: (namespace) => openProgressStore(configFor(namespace, IDB_SCHEMA_VERSION)),

  // A durable reopen is a FRESH connection onto the same physical database — the browser's
  // IndexedDB kept the data across the simulated reload. (The fake deletes here; the adapter must
  // not, and gates 2/7 prove the difference by observation.)
  reopen: (namespace) => openProgressStore(configFor(namespace, IDB_SCHEMA_VERSION)),

  corrupt: async (namespace, target) => {
    // Exactly ONE existing record, mutated in place — nothing inserted, no count changed. For
    // target:'attempt' the meta store is untouched (gate 13 reads detectedSchema:1 off the intact
    // meta singleton). A raw handle, opened version-less so it never triggers an upgrade.
    const db = await openDB(namespace);
    try {
      if (target === 'meta') {
        const tx = db.transaction('meta', 'readwrite');
        const record = (await tx.store.get(META_SINGLETON_ID)) as RawRecord | undefined;
        if (record === undefined) {
          throw new Error(`idb subject: corrupt('${namespace}', 'meta') on a namespace with no meta record.`);
        }
        record['revision'] = CORRUPT_MARKER;
        await tx.store.put(record as never);
        await tx.done;
        return;
      }
      const tx = db.transaction('attempts', 'readwrite');
      const cursor = await tx.store.openCursor();
      if (cursor === null) {
        throw new Error(`idb subject: corrupt('${namespace}', 'attempt') on a namespace with no attempt records.`);
      }
      await cursor.update({ ...(cursor.value as RawRecord), evidence: CORRUPT_MARKER } as never);
      await tx.done;
    } finally {
      db.close();
    }
  },

  setPhysicalSchema: async (namespace, version) => {
    // A real `versionchange` that moves ONLY the db.version marker: the upgrade callback creates no
    // store and alters no record. This is what a store written by a NEWER build looks like to this
    // build (gate 14). Records seeded before this call read back byte-for-byte through raw export.
    const db = await openDB(namespace, version, { upgrade() { /* marker only — no schema change */ } });
    db.close();
  },

  withMigrations: async (namespace, map): Promise<OpenOutcome> => {
    const physicalBefore = await physicalVersionOf(namespace);

    if (consumeUpgradeAbort(namespace)) {
      // Gate 12: a REAL `versionchange` transaction to the target version is opened and then aborted
      // from inside its upgrade callback. IndexedDB rolls the version bump back — the store stays at
      // its pre-upgrade version with no partial transform (the retry, below/next call, then proves
      // the transform itself works). OpenOutcome has no 'aborted' branch (§3.2), so this surfaces as
      // {status:'unavailable'}, matching the adapter's own aborted-open shape.
      try {
        const db = await openDB(namespace, map.targetVersion, {
          upgrade() {
            throw new Error('CONTRACT_ABORT_UPGRADE');
          },
        });
        db.close();
        return storageUnavailable(namespace, physicalBefore); // unreachable: the throw aborts the open
      } catch {
        return storageUnavailable(namespace, physicalBefore);
      }
    }

    // Success branch. Materialise the additive default with a real cursor transform (no version
    // change), then let the REAL adapter drive the version bump: `openProgressStore` at the target
    // version opens the still-older physical store, runs its own upgrade, and captures
    // `migrated:{from,to}` generically (task-7 report). load()/exportSnapshot()/diagnose() on the
    // returned store are therefore the ADAPTER's, over the migrated physical database.
    if (physicalBefore < map.targetVersion) {
      await materialiseAdditive(namespace, map);
    }
    return openProgressStore(configFor(namespace, map.targetVersion));
  },

  abortNextWrite: async (namespace) => {
    armedWriteAbortDb = namespace;
  },

  abortNextUpgrade: async (namespace) => {
    armedUpgradeAbort.add(namespace);
  },

  destroy: async (namespace) => {
    // A synthetic control (delete the whole namespace DB), NOT the product reset (which clears
    // stores, ruling 4). `deleteDatabase` blocks on open connections; gates dispose their stores
    // before the next gate's destroy, and the race helpers close before returning.
    armedUpgradeAbort.delete(namespace);
    if (armedWriteAbortDb === namespace) armedWriteAbortDb = null;
    await deleteDB(namespace);
  },
};

// === Two-page race helpers (gate 7 additional evidence — Option A) ============================
//
// The in-page gate 7 races two `open()` connections in ONE page (uniform ProgressGate data). The
// runner ALSO drives two REAL PAGES against the same origin with no runner-side mutex; these helpers
// are what each page calls. Distinct attemptIds per page; the store's cross-connection transaction
// serialisation is what must still produce two consecutive revisions and lose nothing.

const RACE_NAMESPACE = 'progress-contract-two-page-race';

async function raceReset(): Promise<void> {
  await deleteDB(RACE_NAMESPACE);
}

async function raceAppend(ordinal: number): Promise<{ status: string; revision: number | null; attemptId: string }> {
  const attemptId = `two-page-race-attempt-${ordinal}`;
  const outcome = await openProgressStore(configFor(RACE_NAMESPACE, IDB_SCHEMA_VERSION));
  if (outcome.status !== 'open') return { status: `open:${outcome.error.code}`, revision: null, attemptId };
  const store = outcome.store;
  try {
    const appended = await store.appendAttempt(makeAttemptDraft({ attemptId }));
    return {
      status: appended.status,
      revision: appended.status === 'committed' || appended.status === 'duplicate' ? appended.revision : null,
      attemptId,
    };
  } finally {
    await store.close();
  }
}

async function raceReadback(): Promise<{ attemptCount: number; revision: number | null; attemptIds: string[] }> {
  const outcome = await openProgressStore(configFor(RACE_NAMESPACE, IDB_SCHEMA_VERSION));
  if (outcome.status !== 'open') return { attemptCount: -1, revision: null, attemptIds: [] };
  const store = outcome.store;
  try {
    const load = await store.load();
    if (load.status !== 'loaded') return { attemptCount: -1, revision: null, attemptIds: [] };
    return {
      attemptCount: load.envelope.attempts.length,
      revision: load.envelope.revision,
      attemptIds: load.envelope.attempts.map((attempt) => attempt.attemptId).sort(),
    };
  } finally {
    await store.close();
  }
}

// === Window API ===============================================================================

declare global {
  interface Window {
    __runProgressGates: () => Promise<GateResult[]>;
    __progressSubject: ContractSubject;
    __raceReset: () => Promise<void>;
    __raceAppend: (ordinal: number) => Promise<{ status: string; revision: number | null; attemptId: string }>;
    __raceReadback: () => Promise<{ attemptCount: number; revision: number | null; attemptIds: string[] }>;
  }
}

/** Run all 14 gates against the idb subject, in design §11 order, and return one GateResult each. */
async function runProgressGates(): Promise<GateResult[]> {
  const results: GateResult[] = [];
  for (const gate of PROGRESS_STORE_GATES) {
    results.push(await gate.run(idbSubject));
  }
  return results;
}

window.__runProgressGates = runProgressGates;
window.__progressSubject = idbSubject;
window.__raceReset = raceReset;
window.__raceAppend = raceAppend;
window.__raceReadback = raceReadback;
