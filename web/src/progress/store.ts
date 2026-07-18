// The provider-neutral ProgressStore port (design §3.2-§3.6, §9). This file is the SHAPE only —
// no implementation. Task 5 (progress/fake-store.ts, in-memory) and Tasks 7-8
// (progress/idb-store.ts, the real IndexedDB adapter) must each produce a value structurally
// satisfying `ProgressStore`, constructed from a `ProgressStoreConfig`. Getting this shape right
// is what makes the adapter swappable — a later reversal to native IndexedDB (design §2.1) costs
// exactly one new file passing the same contract suite, because nothing outside this file (and
// the future idb-store.ts) may know an adapter's implementation exists.
//
// Design: docs/superpowers/specs/2026-07-17-progressstore-cycle1-design.md
//
// Module boundary (design §3.1): this file imports ONLY from './types' — never 'idb' (reserved
// for progress/idb-store.ts) and never anything from '../learn/'. Both are enforced by
// progress/boundary.test.ts, not by convention.
//
// Transaction lifetime (design §9): every operation below is plain data in, plain data out. There
// is no operation here that hands control back to a caller while a transaction could be open —
// not by convention, but because it is unrepresentable in these types:
//   - the six operations are METHOD SIGNATURES on the `ProgressStore` interface
//     (`op(args): Promise<X>`), not arrow-typed properties (`op: (args) => ...`). A callback
//     parameter shaped like an arrow function returning a Promise is exactly what this file must
//     never contain — an adapter accepting one could let unrelated awaited caller work auto-close
//     a native IndexedDB transaction (LIB-002, AL-R2 :67). boundary.test.ts checks this
//     structurally over the compiled source, not just by review.
//   - `load()` returns a fully-materialized `LearnerEnvelope`, never a cursor or async iterator.
//   - `mintLearnerKey` is the one function-valued field anywhere in this file, and it is
//     deliberately SYNCHRONOUS (§6, §9 point 5): an async key mint inside the first-write
//     transaction would auto-close it exactly as an awaited callback would.

import type {
  LearnerKey,
  ProgressAttempt,
  SessionRecord,
  LearnerEnvelope,
  CachedMastery,
  SafeAction,
  RecoveryRequiredError,
  NewerSchemaError,
  StorageUnavailableError,
  QuotaExceededError,
  ConnectionSupersededError,
  InvalidRecordRef,
} from './types';

// === §3.2 — config, open outcome, the factory ================================================

export type ProgressStoreConfig = {
  namespace: string; // one IndexedDB database
  schemaVersion: number; // the schema THIS app build understands
  mintLearnerKey: () => LearnerKey; // injected: opaque, SYNC, format-agnostic (§6)
};

export type OpenOutcome =
  | { status: 'open'; store: ProgressStore }
  | { status: 'unavailable'; error: StorageUnavailableError };

// A call-signature interface, not an implementation: this task fixes the PORT's shape. An adapter
// (fake-store.ts Task 5, idb-store.ts Task 7) provides its own concrete factory conforming to this
// type — e.g. `export const openIdbProgressStore: OpenProgressStore = async (config) => {...}`.
//
// Deviation from design §3.2's code block, recorded per review ruling: the design writes
// `export declare function openProgressStore(...): Promise<OpenOutcome>;` verbatim. `declare` is
// TypeScript's ambient form — it asserts some OTHER artifact supplies this binding at runtime, but
// nothing in this plan ever does: Task 7 implements the real `openProgressStore` inside
// idb-store.ts, a second, actually-real export of the same name, so the `declare` here would
// remain a permanent phantom binding that `tsc --noEmit` cannot catch (a consumer importing it
// typechecks cleanly and fails only at link/call time). The plan's own file table (:32) calls this
// file "the port" and Task 3's Produces line (:94) says "openProgressStore signature" — a type is
// the honest expression of that intent. This interface is structurally identical to the design's
// signature and satisfies boundary.test.ts's no-callback check (c): it is method-call syntax
// (`(config): Promise<OpenOutcome>`), not an arrow-typed property, so it contains no `=> Promise`
// token sequence.
export interface OpenProgressStore {
  (config: ProgressStoreConfig): Promise<OpenOutcome>;
}

// === §3.4 — the five data operations' outcome unions ==========================================

export type LoadOutcome =
  | { status: 'empty' } // fresh namespace. Mints NOTHING. load() is a pure read (§6).
  | { status: 'loaded'; envelope: LearnerEnvelope; migrated: { from: number; to: number } | null }
  | { status: 'recovery-required'; error: RecoveryRequiredError }
  | { status: 'newer-schema'; error: NewerSchemaError }
  | { status: 'unavailable'; error: StorageUnavailableError };

// Canonical home of this alias (design §3.4). Task 1's `progress/fixtures.ts` originally carried
// an unexported local copy of this same alias, defined before this file existed; it now imports
// this export instead of redeclaring it, so there is exactly one definition.
export type ProgressAttemptDraft = Omit<ProgressAttempt, 'committedAtRevision'>;

export type AppendOutcome =
  | { status: 'committed'; revision: number }
  | { status: 'duplicate'; revision: number } // attemptId already present; nothing written
  // `NewerSchemaError` (Task 6.5 ruling 2): a write into a namespace physically NEWER than this
  // build refuses, because the storage IS available — just intentionally unreadable/unwritable by
  // this version. It is NOT StorageUnavailableError (the subsystem is fine; retrying the write can
  // never succeed until the app upgrades). §8.4; deviations register #10.
  | { status: 'rejected'; error: QuotaExceededError | StorageUnavailableError | ConnectionSupersededError | NewerSchemaError };

export type SessionSummaryWrite = {
  session: Omit<SessionRecord, 'committedAtRevision'>;
  expectedRevision: number; // revision-CHECKED — a summary publishes DERIVED state (§2.4, §8.4)
  cachedMastery: CachedMastery | null; // optional derived publish; disposable
};

export type CommitOutcome =
  | { status: 'committed'; revision: number }
  | { status: 'duplicate'; revision: number }
  | { status: 'conflict'; currentRevision: number } // REVISION_CONFLICT: reload, re-derive, retry
  // No persisted attempt yet ⇒ nothing to summarise (Task 6.5 ruling 3). The learner key is minted
  // only by the first appendAttempt (§6), so a summary before any attempt must NOT mint the key,
  // create the namespace, or write a session record — that would be exactly the phantom
  // zero-evidence session §4.2 point 2 forbids. This is a NO-OP outcome, not an error. Register #11.
  | { status: 'no-evidence' }
  // See AppendOutcome — ruling 2 applies to EVERY write, not only appendAttempt.
  | { status: 'rejected'; error: QuotaExceededError | StorageUnavailableError | ConnectionSupersededError | NewerSchemaError };

export type ExportRequest = { mode: 'canonical' } | { mode: 'raw' };

export type ExportOutcome =
  | { status: 'exported'; mode: 'canonical' | 'raw'; json: string }
  // A CANONICAL export of a namespace with no persisted data (Task 6.5 ruling 1). There is no
  // envelope to canonicalise and MINTING a learnerKey to fill one would be a write on a read, which
  // §6 forbids. This is DISTINCT from 'unavailable'/'absent': `absent` (§8.3) is reserved for a
  // storage subsystem that is genuinely unavailable, so a caller can tell "no data yet" from
  // "IndexedDB is unavailable in this browser". Raw export never returns this — a raw dump of an
  // empty namespace is `{status:'exported', mode:'raw'}` with empty stores (§3.6). Register #9.
  | { status: 'empty' }
  | { status: 'not-canonical-exportable'; error: RecoveryRequiredError | NewerSchemaError } // retry with mode:'raw'
  | { status: 'unavailable'; error: StorageUnavailableError };

export type ResetConfirmation = {
  acknowledged: 'reset-with-confirmation'; // a literal — not producible by accident
  expectedRevision: number | 'unloadable'; // forces the caller to have LOOKED first
};

// Task 6.5 ruling 4 changes reset's IMPLEMENTATION (clear all three object stores TRANSACTIONALLY,
// preserving the database and its schema version — never deleteDatabase), not its outcome shape: a
// successful reset is still `{status:'reset'}`. The ruling-2 refusal is deliberately NOT extended to
// reset — only evidence-writes (appendAttempt, commitSessionSummary) refuse a newer schema — but a
// reset on a newer-incompatible store is NOT a recovery from that incompatibility: it preserves the
// physical schema version (a v999 store stays v999), so writes stay refused after it too. Gate 14's
// `NEWER_SCHEMA` safeActions are `['export-raw','upgrade-app']` only — reset is never offered as a
// way out of this failure mode. Register #12.
export type ResetOutcome =
  | { status: 'reset' }
  | { status: 'conflict'; currentRevision: number } // another tab wrote since you looked
  | { status: 'rejected'; error: StorageUnavailableError };

// === §3.5 — the sixth slot: diagnose() =========================================================

export type Diagnosis = {
  namespace: string;
  expectedSchema: number;
  detectedSchema: number | null | 'unreadable'; // null = namespace absent
  physicalStores: string[];
  recordCounts: Record<string, number>;
  migration:
    | { kind: 'none' }
    | { kind: 'additive-available'; from: number; to: number }
    | { kind: 'unsupported'; reason: 'newer-than-app' | 'restructuring-required' };
  integrity: { invalid: InvalidRecordRef[] };
  safeActions: SafeAction[];
};

// === §3.6 — raw export of an unloadable envelope ===============================================
//
// This is the SHAPE the JSON string in `{status:'exported', mode:'raw', json}` deserializes to.
// It is not itself part of any operation's parameter or return type — an adapter (idb-store.ts,
// Tasks 7-8) constructs and serializes it internally. It lives here, not in a later task's file,
// because design §3.6 places it inside "the port" and a future producer needs one shared
// definition rather than inventing its own.

export type RawExport = {
  format: 'blackjack.progress.raw';
  formatVersion: 1;
  namespace: string;
  physicalVersion: number | null; // db.version as found
  stores: Record<string, unknown[]>; // every store → every record, uninterpreted
  errors: string[]; // stores/records that could not be read at all
};

// === §3.2 — the six operations; open/close are lifetime, not semantics ========================

export interface ProgressStore {
  load(): Promise<LoadOutcome>;
  appendAttempt(draft: ProgressAttemptDraft): Promise<AppendOutcome>;
  commitSessionSummary(write: SessionSummaryWrite): Promise<CommitOutcome>;
  exportSnapshot(request: ExportRequest): Promise<ExportOutcome>;
  reset(confirmation: ResetConfirmation): Promise<ResetOutcome>;
  diagnose(): Promise<Diagnosis>;

  /** Resource disposal, not a semantic operation. Idempotent. */
  close(): Promise<void>;
}
