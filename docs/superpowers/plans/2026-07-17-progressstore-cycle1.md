# ProgressStore Cycle-1 Foundation Implementation Plan

> For agentic workers: REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

Goal: Build the provider-neutral `ProgressStore` port, the versioned learner envelope and attempt record, and a provider-neutral 14-gate contract suite proven headless against fixtures — with no UI consumer and no learner data written.

Architecture: A new `web/src/progress/` module owns a data-in/data-out port with six operations. Two implementations satisfy it: an in-memory fake and an `idb`-backed adapter. One host-neutral gate suite runs against both — under Vitest for the fake, and in a real browser via Playwright for the adapter (jsdom has no IndexedDB). `idb` is imported by exactly one file, which is what makes the conditional admission reversible.

Tech Stack: TypeScript plus Vitest (fake, unit); `idb` 8.0.3 (adapter); existing Playwright + `vite` for the real-browser gate runner. No new dependency beyond `idb`.

Design: `docs/superpowers/specs/2026-07-17-progressstore-cycle1-design.md` (approved 2026-07-17).
Approving decisions: `journal/decisions.md`, 2026-07-17.

## Global Constraints

- **Cycle 1 only.** No `LessonController` changes, no UI consumer, no learner data written, no reducer, no planner. If a task would cross that line it belongs in the design's §13 prerequisites, not here.
- `web/src/progress/` must not import `web/src/learn/`. It may import `web/src/bridge/types`.
- Exactly one file — `progress/idb-store.ts` — may import `idb`. Enforced by a test, not convention.
- The port is data-in/data-out: no callbacks, no cursors/iterators returned, every write argument structured-clone-safe. Nothing async may run inside a transaction (design §9).
- Never import the extracted research harness (`dev-toolkit/browser-storage-conformance`). The 14 gates are re-derived against the real contract.
- Recoverable conditions are **returned** in discriminated unions; throwing is reserved for bugs (closed store, structurally invalid draft).
- No automatic reset, ever. Raw export must never validate.
- Close with ledger-driven feature QA under `docs/specs/qa-playtest-process.md`.

---

## File structure

| File | Responsibility |
|---|---|
| `web/src/progress/types.ts` | Envelope, attempt, session, `CachedMastery`, typed errors, `JsonValue`. |
| `web/src/progress/store.ts` | The port: `ProgressStore`, `openProgressStore`, all outcome unions. |
| `web/src/progress/canonical.ts` | Declared-key-order canonical serializer; content-only, no clock. |
| `web/src/progress/fixtures.ts` | Deterministic fixture builders (attempts, sessions, envelopes, tiers). |
| `web/src/progress/fake-store.ts` | In-memory implementation; `capabilities {durable:false, multiConnection:false}`. |
| `web/src/progress/idb-store.ts` | **The only file importing `idb`.** Three stores, `add()`-enforced idempotency. |
| `web/src/progress/contract.ts` | The 14 gates as host-neutral data + `ContractSubject`. |
| `web/src/progress/contract.test.ts` | Vitest wrapper: runs the gates against the fake. |
| `web/src/progress/boundary.test.ts` | Asserts the import boundary (`idb`, `learn/`). |
| `web/qa/progress/harness.ts` | Browser entry: exposes gates + the idb subject on `window`. |
| `web/qa/progress/run.ts` | Playwright runner: Chromium + Firefox, writes the run report. |
| `web/qa/progress/bundle-probe.ts` | Throwaway entry for the `idb` bundle-delta measurement. |
| `journal/qa/{ledger.md,runs/2026-07-17-progressstore-cycle1/report.md}` | Feature-QA evidence. |

---

### Task 1: Records, fixtures, and the phantom rule as a test

Files:
- Create: `web/src/progress/types.ts`
- Create: `web/src/progress/fixtures.ts`
- Create: `web/src/progress/types.test.ts`

Consumes: design §4 (records), §7 (phantom rule), §9 (structured-clone safety).

Produces: `ProgressAttempt`, `SessionRecord`, `LearnerEnvelope`, `CachedMastery`, `LearnerKey`, error types, and deterministic fixture builders.

Proves: the record shape is serializable, carries no phantom fields, and makes impossible states unrepresentable.

- [ ] Step 1: Write failing tests in `types.test.ts`: (a) `structuredClone(makeAttemptDraft())` round-trips deep-equal — the structured-clone-safety guard from design §9.2; (b) a built draft has **no `planning` key at all** (`'planning' in draft === false`, not `=== null`) — design §7; (c) fixture builders are deterministic (two calls with the same args are deep-equal, no clock, no random); (d) `makeAttemptDraft` accepts every `AttemptDisposition` variant including `abandoned` and `ungraded` (ALR-022's required fixture set: correct, incorrect, retried, hinted, abandoned, ungraded).
- [ ] Step 2: Run `npm --prefix web run test -- progress/types.test.ts`. Expected: fails, module does not exist.
- [ ] Step 3: Write `types.ts` transcribing design §4.1/§4.2/§4.5 exactly: branded `LearnerKey`; `AttemptDisposition` as a discriminated union so `errorClass` is unrepresentable on a correct answer; `AttemptKind` with four values; `evidence.cellId: string | null`; `gradedBy.profileId`; `activity{activityId, activityVersion, catalogVersion, seed, params}`; `occurredAt` + `elapsedMs`; **no `prompt`, no `feedback`, no `reducerVersion`, no `planning`**. Import `Action`, `HandOutcome`, `Ruleset`, `StrategyProfileId` from `../bridge/types`; import nothing from `../learn/`.
- [ ] Step 4: Write `fixtures.ts`: `makeAttemptDraft(overrides?)`, `makeSessionRecord(overrides?)`, `makeEnvelope(overrides?)`, and `makeAttemptTier(n)` returning n deterministic drafts (used by Tasks 10/11). All values are literals or seeded counters — never `Date.now()`, never `Math.random()`.
- [ ] Step 5: Add a type-level negative check as a commented `@ts-expect-error` block: an attempt with `disposition: {status:'graded', correct:true, errorClass:'outcome-bias'}` must not compile.
- [ ] Step 6: Run `npm --prefix web run test -- progress/types.test.ts`. Expected: PASS.
- [ ] Step 7: Commit: `feat(progress): add durable learner record contracts`.

### Task 2: The canonical serializer

Files:
- Create: `web/src/progress/canonical.ts`
- Create: `web/src/progress/canonical.test.ts`

Consumes: Task-1 types and fixtures; design §5.2.

Produces: `canonicalize(snapshot: CanonicalSnapshot): string` with declared key order.

Proves: byte-identity is a property of the serializer, not an accident of insertion order. This is the precondition for gates 8 and 11.

- [ ] Step 1: Write failing tests: (a) two objects with the **same content but different key insertion order** canonicalize to identical strings — this is the test `JSON.stringify` fails; (b) attempts are emitted ordered by `(committedAtRevision, attemptId)` regardless of input array order; (c) an absent optional key is **absent** from the output, never `null` (design §7); (d) the output contains no timestamp field and no `exportedAt` — grep the string; (e) canonicalizing the same fixture twice is byte-identical.
- [ ] Step 2: Run `npm --prefix web run test -- progress/canonical.test.ts`. Expected: fail.
- [ ] Step 3: Implement `canonicalize` with an **explicit declared key order per record type** — never `JSON.stringify(obj)` over an arbitrary object, never `Object.keys()` order. Sort attempts by `(committedAtRevision, attemptId)`, sessions by `(committedAtRevision, sessionId)`. Omit `undefined` keys. Emit `format: 'blackjack.progress.snapshot'` and `formatVersion: 1`.
- [ ] Step 4: Run `npm --prefix web run test -- progress/canonical.test.ts`. Expected: PASS.
- [ ] Step 5: Commit: `feat(progress): add canonical snapshot serializer`.

### Task 3: The port

Files:
- Create: `web/src/progress/store.ts`
- Create: `web/src/progress/boundary.test.ts`

Consumes: Task-1 types; design §3.

Produces: `ProgressStore`, `openProgressStore` signature, `ProgressStoreConfig`, and every outcome union.

Proves: the port's shape enforces design §9 — there is no way to hand control to a caller mid-transaction.

- [ ] Step 1: Write failing tests in `boundary.test.ts`: (a) read every file in `web/src/progress/` and assert **only `idb-store.ts` contains an `idb` import**; (b) assert **no file in `web/src/progress/` imports from `../learn/`**; (c) assert `store.ts` source contains no `=> Promise` callback parameter type and no `AsyncIterable` — the design §9.1 no-callback rule, checked structurally.
- [ ] Step 2: Run `npm --prefix web run test -- progress/boundary.test.ts`. Expected: fail (files missing).
- [ ] Step 3: Write `store.ts` transcribing design §3.2/§3.3/§3.4/§3.5: the six operations plus `close()`; `openProgressStore(config): Promise<OpenOutcome>`; `mintLearnerKey: () => LearnerKey` **synchronous**; `LoadOutcome`, `AppendOutcome`, `CommitOutcome`, `ExportOutcome`, `ResetOutcome`, `Diagnosis`; all five typed errors carrying `{namespace, detectedSchema, safeActions[]}`. `appendAttempt` takes **no `expectedRevision`** (design §2.4); `commitSessionSummary` **does**.
- [ ] Step 4: Run `npm --prefix web run test -- progress/boundary.test.ts` and `npm --prefix web run build`. Expected: PASS and a clean `tsc --noEmit`.
- [ ] Step 5: Commit: `feat(progress): add provider-neutral ProgressStore port`.

### Task 4: The 14 gates, as host-neutral data

Files:
- Create: `web/src/progress/contract.ts`

Consumes: Task-3 port; design §11 (the gate table).

Produces: `PROGRESS_STORE_GATES: ProgressGate[]` (exactly 14) and the `ContractSubject` shape.

Proves: the suite can run under Vitest **and** inside a browser page. This is why gates are data, not `it()` blocks — the idb subject has no Vitest.

- [ ] Step 1: Define the subject and gate shapes:
  ```ts
  export type StoreCapabilities = { durable: boolean; multiConnection: boolean };
  export type ContractSubject = {
    name: string;
    capabilities: StoreCapabilities;
    open: (namespace: string) => Promise<OpenOutcome>;
    reopen: (namespace: string) => Promise<OpenOutcome>;          // simulates reload for durable subjects
    // SYNTHETIC controls (AL-R2's SYNTHETIC label) — deterministic injected failures:
    corrupt: (namespace: string, target: 'meta' | 'attempt') => Promise<void>;
    setPhysicalSchema: (namespace: string, version: number) => Promise<void>;
    withMigrations: (namespace: string, map: MigrationMap) => Promise<OpenOutcome>;
    abortNextWrite: (namespace: string) => Promise<void>;
    abortNextUpgrade: (namespace: string) => Promise<void>;
    destroy: (namespace: string) => Promise<void>;
  };
  export type GateResult = { id: string; status: 'pass' | 'fail' | 'declared-unsupported'; detail?: string };
  export type ProgressGate = { id: string; label: 'OBSERVED' | 'SYNTHETIC'; run(s: ContractSubject): Promise<GateResult> };
  ```
- [ ] Step 2: Implement all 14 gates **exactly as the design §11 table names them**, each asserting with a plain throw-on-failure helper (no Vitest import — `contract.ts` must be importable by a browser bundle):
  1. `open-empty` — fresh namespace → `{status:'empty'}`; assert **nothing was minted** (a follow-up `diagnose()` reports `detectedSchema: null` or zero records; no learner key exists).
  2. `reload-persistence` — append, `reopen`, load → the attempt is present. **Non-capability when `capabilities.durable === false`.**
  3. `atomic-commit` — one append; assert the attempt exists **and** `meta.revision` advanced by exactly 1, both visible after reopen/reload.
  4. `write-abort-rollback` — `abortNextWrite`, append → `rejected`; assert `meta.revision` **and** the attempts collection are both unchanged. (SYNTHETIC)
  5. `idempotency-duplicate` — append the same `attemptId` twice → second is `{status:'duplicate', revision:<first>}`; assert the attempt count did not grow.
  6. `revision-conflict` — `commitSessionSummary` with a stale `expectedRevision` → `{status:'conflict', currentRevision}`; reload, retry at the current revision → `committed`.
  7. `concurrent-appends` — two connections append **distinct** attempts with no runner-side mutex; assert **both commit**, at **distinct revisions**, and **both survive** a reload (no lost update). **Non-capability when `capabilities.multiConnection === false`.**
  8. `canonical-export-stable` — export canonical twice across two separate loads → byte-identical.
  9. `export-precedes-reset` — canonical export succeeds while data exists; `reset` without `acknowledged` does not type-check (compile-time) and `reset` with a **stale** `expectedRevision` → `{status:'conflict'}`.
  10. `complete-reset` — `reset` with the correct revision → `{status:'reset'}`; next `load()` → `{status:'empty'}`; assert **no residual records in any store**.
  11. `migration-additive` — open a v1 fixture via `withMigrations` with a test-only v2 that adds a defaulted field; load → `{status:'loaded', migrated:{from:1,to:2}}`; assert the default materialized and the canonical export is **byte-identical to a golden**.
  12. `migration-abort-rollback` — `abortNextUpgrade`, open at v2 → rejected; assert the store is **physically still v1** with **no partial transform**; retry succeeds. (SYNTHETIC)
  13. `corrupt-recovery` — `corrupt(ns,'attempt')`; load → `{status:'recovery-required'}` with `code:'RECOVERY_REQUIRED'`, `namespace`, `detectedSchema`, `safeActions:['export-raw','reset-with-confirmation']`, and an itemized `invalid[]`; assert **no automatic reset** (records still present) **and `exportSnapshot({mode:'raw'})` still returns the good records**. (SYNTHETIC)
  14. `newer-schema-refusal` — `setPhysicalSchema(ns, 999)`; load → `{status:'newer-schema'}` with `safeActions:['export-raw','upgrade-app']`; assert **no reset** and **raw export still works**. (SYNTHETIC)
- [ ] Step 3: Assert `PROGRESS_STORE_GATES.length === 14` in the module itself (a cheap invariant that fails loudly if a gate is dropped).
- [ ] Step 4: Run `npm --prefix web run build`. Expected: clean `tsc --noEmit`.
- [ ] Step 5: Commit: `test(progress): re-derive the 14 storage gates against the real contract`.

**Re-derivation note (required by the AL-D1 card).** The extracted harness is **not** imported. AL-R2 reports 210 cells = 15 rows × 14 gates and never names them; these 14 are re-derived from the report's seven result columns (`:160-166`) and its migration/recovery prose (`:218-230`). Mapping: Reload → 1,2; Atomic commit → 3,4; Idempotency → 5; Revision conflict → 6; Concurrent tabs → 7; Export/reset → 8,9,10; Migration/recovery → 11,12,13,14. Gates 13–14 add a clause the research harness could not carry: **raw export works in the failure state** (design §3.6).

### Task 5: The fake, and 12/14 with declared non-capabilities

Files:
- Create: `web/src/progress/fake-store.ts`
- Create: `web/src/progress/contract.test.ts`

Consumes: Tasks 1–4.

Produces: an in-memory `ProgressStore` and the Vitest wrapper that runs all 14 gates against it.

Proves: the suite is provider-neutral, and the fake's 12/14 exactly reproduces AL-R2's recorded in-memory row (`:162`) rather than faking a pass.

- [ ] Step 1: Write `contract.test.ts` as a thin wrapper: `describe.each(PROGRESS_STORE_GATES)('$id', gate => it('holds for the fake', async () => { const r = await gate.run(fakeSubject); expect(r.status).not.toBe('fail'); }))`. Add one explicit assertion that gates 2 and 7 return **`declared-unsupported`** for the fake — not `pass`. Add a summary assertion: exactly 12 `pass` and exactly 2 `declared-unsupported`.
- [ ] Step 2: Run `npm --prefix web run test -- progress/contract.test.ts`. Expected: fail, fake missing.
- [ ] Step 3: Implement `fake-store.ts`: an in-memory envelope keyed by namespace **inside one module realm**; `capabilities: {durable:false, multiConnection:false}`; `reopen` returns a store over the **same** realm map (so it is honest that it is not reload); code-only migration support for gate 11 (AL-R2 `:220`: in-memory passed "code-only parse and replacement"); synthetic controls implemented as realm mutations. Idempotency by map-key presence. Revision assignment on append. `reset` clears the namespace entry.
- [ ] Step 4: Ensure gates 2 and 7 detect `capabilities` and return `declared-unsupported` **with a reason string**, and that the gate's non-capability branch **asserts the store does not claim durability** (e.g. a fresh realm reports `empty`) rather than skipping.
- [ ] Step 5: Run `npm --prefix web run test -- progress/contract.test.ts`. Expected: PASS — 12 pass, 2 declared-unsupported.
- [ ] Step 6: Commit: `feat(progress): add in-memory fake and provider-neutral gate wrapper`.

### Task 6: Install `idb` and measure the bundle delta — before writing the adapter

Files:
- Modify: `web/package.json`
- Create: `web/qa/progress/bundle-probe.ts`
- Create: `journal/qa/runs/2026-07-17-progressstore-cycle1/bundle-delta.md`

Consumes: the conditional admission (`journal/decisions.md`, idb row) and design §2.1.

Produces: a recorded gzipped delta and a go/no-go on `idb`.

Proves: `idb` is the thin wrapper it was admitted as — **or** it is not, and we revert now rather than after three tasks of adapter code.

**Why this task runs here.** Nothing in cycle 1 imports the adapter (there is no UI consumer), so a naive "build the app with and without" measures **zero** — the import is tree-shaken. The probe supplies the missing consumer. Measuring before the adapter exists is deliberate: a failure at this gate is cheap now and expensive later.

- [ ] Step 1: `npm --prefix web install --save idb@8.0.3` — exact pin, matching AL-R2's LIB-001 artifact.
- [ ] Step 2: Write `bundle-probe.ts`: import **exactly the `idb` runtime surface the adapter will use** (`openDB`, `deleteDB`) and reference them from an exported function so they cannot be tree-shaken. Type-only imports (`IDBPDatabase`) are free and are excluded.
- [ ] Step 3: Build the probe twice with the production config (`vite build`, minify on, same target): (a) as written; (b) with the `idb` imports replaced by a no-op stub of the same shape. Record **gzipped** bytes for each. The delta is `idb`'s emitted cost.
- [ ] Step 4: Apply the threshold: **> 5 KB gzipped ⇒ material ⇒ STOP and revert to native IndexedDB** (design §2.1). If it fails: do not proceed to Task 7; instead write `progress/idb-store.ts` as `progress/indexeddb-store.ts` over the native API, satisfying the identical port and the identical 14 gates — the port and suite are provider-neutral precisely so this costs one file, and Tasks 7–9 continue unchanged against the native adapter.
- [ ] Step 5: Record in `bundle-delta.md`: exact command lines, both gzipped byte counts, the delta, the threshold, the verdict, and the `idb` version. Note explicitly that this is an **alarm with ~3× headroom, not a budget** — it is not a figure to optimise toward.
- [ ] Step 6: Delete the probe from the app's build inputs (keep the file under `web/qa/`, never `web/src/`) so it cannot reach a shipped bundle.
- [ ] Step 7: Commit: `chore(progress): install idb 8.0.3 and record the bundle-delta gate`.

### Task 7: The idb adapter — open, load, append

Files:
- Create: `web/src/progress/idb-store.ts`
- Modify: `web/src/progress/boundary.test.ts`

Consumes: Task 3 (port), Task 6 (admission confirmed).

Produces: three stores, revision assignment, `add()`-enforced idempotency, and `load()`.

Proves: design §5.1's three-store layout and §8.4's unconditional append. Nothing is inherited from AL-R2's four-store proof.

- [ ] Step 1: Write failing focused tests only where they can run in Vitest — i.e. the **boundary** test extension: `idb-store.ts` imports `idb` (allowed, and is the only such file). The gate proofs run in Task 9's real browser; **do not add `fake-indexeddb`** (see the note below).
- [ ] Step 2: Implement `openProgressStore`: `openDB(namespace, schemaVersion, { upgrade, blocked, blocking, terminated })`. The `upgrade` callback is driven by an internal `MigrationMap` whose **v1 entry creates the three stores** (`meta` keyPath `id`; `attempts` keyPath `attemptId` + index `by-revision` on `committedAtRevision`; `sessions` keyPath `sessionId`). Register `blocking` (`onversionchange`) → `close()` → mark the store superseded so every later operation returns `ConnectionSupersededError` with `safeActions:['reload']`. Map open failures to `StorageUnavailableError` with `reason` `'denied' | 'private-mode' | 'absent' | 'unknown'`.
- [ ] Step 3: Implement `load()`: read `meta` singleton; absent → `{status:'empty'}` and **mint nothing** (design §6). Validate every record; any invalid → `{status:'recovery-required'}` (fail closed, design §8.4). If `detectedSchema > schemaVersion` → `{status:'newer-schema'}`. If `detectedSchema < schemaVersion` and an additive migration exists, it ran in the `upgrade` transaction → return `{status:'loaded', migrated:{from,to}}`. Return the **fully-materialized** envelope; no cursors escape (design §9.3).
- [ ] Step 4: Implement `appendAttempt`: one `readwrite` tx over `meta` + `attempts`. Inside it: read `meta`; if absent, create it with `mintLearnerKey()` called **synchronously** and revision 0; `revision = meta.revision + 1`; `attempts.add({...draft, committedAtRevision: revision})`; `meta.put({...meta, revision})`; `await tx.done`. **No `expectedRevision`.** Catch `ConstraintError` → read the existing record → `{status:'duplicate', revision: existing.committedAtRevision}`. Catch `QuotaExceededError` → the typed error, **never delete to make room** (design §8.2). Nothing async runs inside the tx (design §9).
- [ ] Step 5: Run `npm --prefix web run test -- progress/boundary.test.ts` and `npm --prefix web run build`. Expected: PASS, clean `tsc --noEmit`.
- [ ] Step 6: Commit: `feat(progress): add idb adapter open/load/append`.

**Why no `fake-indexeddb`.** It is a new runtime dependency requiring the Tool & Runtime Admission Protocol, and it would prove the adapter against a **simulation** of IndexedDB. Gates 7 (cross-connection serialisation), 12 (`versionchange` abort/rollback), 13, and 14 are precisely where a simulated IDB is least trustworthy — and gate 7 is the evidence for design §2.4's approved deviation. AL-R2 established its evidence in real browsers; cycle 1 does the same, reusing the Playwright already in `devDependencies`.

### Task 8: The idb adapter — summary, export, reset, diagnose

Files:
- Modify: `web/src/progress/idb-store.ts`

Consumes: Task 7.

Produces: the remaining four operations, including both export modes.

Proves: design §3.6's raw-export mechanism and §3.4's revision-checked reset.

- [ ] Step 1: Implement `commitSessionSummary`: one `readwrite` tx over `meta` + `sessions`. Read `meta`; if `meta.revision !== write.expectedRevision` → `{status:'conflict', currentRevision: meta.revision}` (design §8.4 — the check lives **here**, on the derived-state publish). Else `sessions.add(...)` (catch `ConstraintError` → `duplicate`), bump revision, write `cachedMastery` into `meta` when supplied.
- [ ] Step 2: Implement `exportSnapshot({mode:'canonical'})`: `load()`; if not `loaded` → `{status:'not-canonical-exportable', error}` steering to raw. Else read inside the tx, **serialize after it closes** (design §9.4), via `canonicalize`.
- [ ] Step 3: Implement `exportSnapshot({mode:'raw'})`: open **with no version argument** so IndexedDB opens at whatever version is physically present — never triggering an upgrade, never `VersionError`. Enumerate `db.objectStoreNames`, dump every record **uninterpreted**, emit `RawExport`. **It must never validate** (design §3.6). It must work at schema 999 and on a corrupt store.
- [ ] Step 4: Implement `reset(confirmation)`: require the `'reset-with-confirmation'` literal; if `expectedRevision` is a number and differs from `meta.revision` → `{status:'conflict'}`; `'unloadable'` bypasses the check. Delete the database (or clear all three stores) so a subsequent `load()` is `{status:'empty'}` with no residue.
- [ ] Step 5: Implement `diagnose()`: read-only, never mutates, works when `load()` cannot — version-less open, report `detectedSchema`, `physicalStores`, `recordCounts`, the `migration` verdict, itemized `integrity.invalid[]`, and `safeActions`.
- [ ] Step 6: Run `npm --prefix web run build`. Expected: clean `tsc --noEmit`.
- [ ] Step 7: Commit: `feat(progress): add idb adapter summary, export, reset, diagnose`.

### Task 9: Run all 14 gates against the adapter in real browsers

Files:
- Create: `web/qa/progress/harness.ts`
- Create: `web/qa/progress/run.ts`
- Modify: `web/package.json` (add `qa:progress`)
- Modify: `web/qa/run-all.ts` (add the role to the suite)

Consumes: Tasks 4, 5, 7, 8.

Produces: `npm run qa:progress` — 14/14 against the idb adapter in Chromium and Firefox, with a JSON/MD report.

Proves: the deviations of design §5.1 and §2.4 hold in real IndexedDB, in more than one engine. **Nothing here is inherited from AL-R2** — its evidence covers `idb`, not our layout.

**Why a browser runner exists.** `web`'s Vitest environment is jsdom, which has **no IndexedDB**. The adapter cannot be gated under Vitest at all. The existing `web/qa/` scripts already drive a deterministic production preview through Playwright; this role reuses that pattern and adds no dependency.

- [ ] Step 1: Write `harness.ts`: a browser entry that imports `PROGRESS_STORE_GATES` and builds the **idb `ContractSubject`** (`capabilities: {durable:true, multiConnection:true}`), implementing the synthetic controls in-page against raw IndexedDB (`corrupt` writes a malformed record; `setPhysicalSchema` reopens at 999; `abortNextUpgrade`/`abortNextWrite` throw inside the relevant transaction; `withMigrations` opens with a test-only v2 map). Expose `window.__runProgressGates()` returning `GateResult[]`.
- [ ] Step 2: Write `run.ts`: build `harness.ts` with `vite build` into a temp dir alongside a minimal HTML page; serve it over **http on a real origin** (an opaque origin denies IndexedDB, so `about:blank` will not work); launch Playwright **Chromium and Firefox**; run `__runProgressGates()`; for gate 7, open **two real pages** on the same origin with **no runner-side mutex** and let them race. Write `journal/qa/runs/2026-07-17-progressstore-cycle1/report.{md,json}` with one row per (browser × gate) and exit non-zero on any `fail`.
- [ ] Step 3: Add `"qa:progress": "tsx qa/progress/run.ts"` to `web/package.json` and register the role in `qa/run-all.ts`.
- [ ] Step 4: Run `npm --prefix web run qa:progress`. Expected: **28/28 (14 gates × 2 browsers) pass**, 0 failures.
- [ ] Step 5: Record the WebKit coverage gap explicitly in the report: AL-R2 `:141-145` observed that the host's Playwright WebKit targets Ubuntu 24.04 libraries and cannot launch against this CachyOS/Arch ABI. **Non-blocking** — AL-R2 already proved `idb` 14/14 in WebKit via the pinned container (`mcr.microsoft.com/playwright:v1.61.1-noble`), and the container path stays available if a WebKit-specific doubt ever arises. Name it a gap; do not paper over it.
- [ ] Step 6: Commit: `test(progress): gate the idb adapter in Chromium and Firefox`.

### Task 10: Measure serialized envelope bytes — turn "no cap" into a measured claim

Files:
- Modify: `web/qa/progress/run.ts`
- Modify: `journal/qa/runs/2026-07-17-progressstore-cycle1/report.md`

Consumes: Task 1 fixtures (`makeAttemptTier`), Task 9 runner; design §10.

Produces: recorded serialized envelope bytes at 20 / 1,000 / 10,000 attempts against the **real** record shape.

Proves: the no-cap retention decision is a measured claim, not an assumption.

- [ ] Step 1: Extend the runner with a measurement pass (not a gate): build envelopes at the three tiers with `makeAttemptTier`, record `canonicalize(...)` byte length and the `navigator.storage.estimate()` usage delta after committing each tier.
- [ ] Step 2: Run and record all three tiers in the report as a table: tier → attempts → canonical bytes → bytes/attempt → measured IDB usage delta.
- [ ] Step 3: State the conclusion explicitly against design §10: no cap is imposed, the measured cost is X, and the three named triggers (observed `QUOTA_EXCEEDED`; the external-beta telemetry trigger at `research-brief.md:23`; a measured `load()` latency problem) remain the **only** things that would earn a bound — which must then be an export-first compaction or an explicit user action, **never a silent delete**.
- [ ] Step 4: Commit: `test(progress): measure serialized envelope bytes at three tiers`.

### Task 11: Close scoped feature QA and reconcile the ledger

Files:
- Create: `journal/qa/runs/2026-07-17-progressstore-cycle1/report.md`
- Modify: `journal/qa/ledger.md`

Consumes: final code and deterministic evidence.

Produces: a scoped PASS/FAIL verdict, a new coverage area, and triaged findings.

**Scoping (per `docs/specs/qa-playtest-process.md` §"Scoping protocol").** `journal/qa/ledger.md` has **no prior pass for durable progress** — this is a **new area needing a deep run**, not a smoke test. The area's watched files are `web/src/progress/`, `web/qa/progress/`.

- [ ] Step 1: Add the coverage area row to the ledger: `Durable learner progress (ProgressStore) | web/src/progress/, web/qa/progress/ | 2026-07-17-progressstore-cycle1 | <commit> | PASS | Deep-tested (new area)`.
- [ ] Step 2: Run the full Tier-1 script suite: `cargo test -p blackjack-core`; `npm --prefix web run test`; `npm --prefix web run qa` (now including `qa:progress`). Expected: all zero-exit. If Rust triggers the WASM freshness guard, run `npm --prefix web run build:wasm` and re-run the blocked check.
- [ ] Step 3: **Skip the Player Experience agent** — and record why, so the skip is auditable rather than silent: cycle 1 changes **no** file under `web/src/app/`, and the process's Tier-2 rule (`qa-playtest-process.md:36-37`, `:89`) runs PX only when that surface changed. There is no learner-facing surface to judge because there is deliberately no UI consumer.
- [ ] Step 4: Map the **learning-integrity contract** (`qa-playtest-process.md:129-147`), whose trigger now covers durable learner progress. Record a verdict for each of the six, with explicit N/A reasons — never a silent omission:

  | Contract check | Cycle-1 verdict | Evidence |
  |---|---|---|
  | Correct decision stays correct when the hand loses; wrong stays wrong when it wins | **N/A** — no grading and no UI in cycle 1 | Fires in cycle 3 with the mapper/UI consumer |
  | Every recommendation from the ruleset-matched oracle and legal in the evaluated state | **N/A** — cycle 1 produces no recommendations | `gradedBy.profileId` is *stored* and round-trip-proven (gate 8) so cycle 3 can satisfy this |
  | Table visibility and assistance observable when the feature uses them | **PASS** | `tableVisibility` + `assistance` round-trip through append → load → canonical export (gates 3, 8) |
  | Learner comprehension judged separately from strategy fidelity/flow/polish | **N/A** — no learner-facing surface | — |
  | **Errors recoverable; progress never lost silently; an unconfirmed or failed save is never presented as saved** | **PASS — this is cycle 1's core** | Gates 4, 13, 14 (no automatic reset; typed recoverable errors; raw export in the failure state); result unions force the caller to handle failure (design §3.3); `{status:'rejected'}` is never a success |
  | **Any mastery/progress summary shown is reproducible from raw stored evidence and its recorded reducer version** | **PASS (precondition)** | Cycle 1 shows nothing, but proves the precondition: `CachedMastery` carries `reducerVersion` + `computedAtRevision`, raw attempts are the sole durable truth, and canonical export (gate 8) contains everything needed to recompute |

- [ ] Step 5: Record in the report: exact commands, commit SHA, deep/smoke scope per area, the 28/28 gate matrix, the bundle-delta verdict (Task 6), the three-tier byte measurement (Task 10), the WebKit coverage gap, and the PX skip rationale. Note that **gate 7 closes the ledger's standing "multi-tab races untried" coverage gap for `ProgressStore` specifically** — it does not close it for the app at large.
- [ ] Step 6: Create `QA-NNN` findings only for real findings. Confirm no ledger row for another area moves — cycle 1 touches no other area's watched files.
- [ ] Step 7: Commit: `test(qa): close ProgressStore cycle-1 feature QA`.

---

## Plan self-review

- Tasks 1–2 fix the record shape and the canonical serializer first, because byte-identity (gates 8, 11) is a property of the serializer and every later gate depends on it.
- Task 3 fixes the port and enforces the two import boundaries by test, not convention — which is what makes Task 6's possible reversal cost one file.
- Tasks 4–5 deliver the provider-neutral suite and prove it against the fake at exactly AL-R2's recorded 12/14, with the two non-capabilities **declared and asserted** rather than skipped.
- Task 6 measures the conditional admission **before** the adapter is written, so a >5 KB failure costs one probe rather than three tasks. Its fallback is spelled out and is deliberately cheap.
- Tasks 7–9 build and gate the adapter in real browsers. Nothing is inherited from AL-R2: the three-store layout, `add()`-enforced idempotency, and the unconditional append are deviations, so they are re-proven.
- Task 10 converts the no-cap retention decision from assumption to measurement.
- Task 11 closes ledger-driven feature QA as a new deep-tested area, maps all six learning-integrity checks with explicit N/A reasons, and records the PX skip rationale so it is auditable.
- No task writes learner data, adds a UI consumer, touches `LessonController`, imports the extracted research harness, or adds a dependency beyond the conditionally admitted `idb`.
- Two facts drive the shape of Tasks 6 and 9 and are stated where they bite: nothing imports the adapter in cycle 1 (so a naive bundle diff measures zero), and jsdom has no IndexedDB (so the adapter cannot be gated under Vitest).
