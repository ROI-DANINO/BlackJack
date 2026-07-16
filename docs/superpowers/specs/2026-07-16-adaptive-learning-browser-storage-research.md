# Adaptive Learning Browser Storage Research

> Status: evidence collection in progress.
> Scope: browser-local learner progress for the single-device adaptive-mechanics proof.
> Authority: research evidence only; no production store is admitted until user approval.

## Research Questions

1. What is the smallest serializable learner envelope and stable pseudonymous learner key needed before the first durable attempt write?
2. Which load, atomic checkpoint commit, session-summary, export, reset, close, migration, and recovery semantics must the provisional `ProgressStore` support?
3. How do native IndexedDB, `idb`, and Dexie behave under the same contract in Chromium, Firefox, and WebKit?
4. Why are in-memory state and `localStorage` sufficient or insufficient for this consumer?
5. Do OPFS or Cache Storage plausibly satisfy the structured transactional consumer?
6. How do candidates handle reload, duplicate commits, revision conflicts, concurrent tabs, interrupted writes, old/malformed/newer schemas, unavailable storage, and quota failures?
7. Which local privacy, export, deletion, retention, and later account-linking boundaries apply?
8. Which candidate passes all six Tool & Runtime Admission fields, and what evidence would replace or retire it?

## Evidence Labels

- **OFFICIAL:** a directly attributable standard, browser-vendor document, official library document/repository, or package record.
- **OBSERVED:** a result produced by the committed harness in the recorded browser/runtime environment.
- **SYNTHETIC:** a deterministic injected failure used to test application behavior; not a naturally observed browser event.
- **INFERENCE:** the project's bounded interpretation of official or observed evidence.
- **COVERAGE GAP:** a required question for which reliable direct evidence or reproducible measurement is unavailable.

## Source Register

| ID | Source | Publisher / owner | Date / version | Source type | Evidence scope | Retrieval date | Limitation |
|---|---|---|---|---|---|---|---|
| STD-001 | [Indexed Database API 3.0](https://w3c.github.io/IndexedDB/) | W3C Web Applications Working Group | Editor's Draft, living | Standard | Object stores, indexes, transactions, version changes, connection blocking, commit/abort, and durability hints. | 2026-07-16 | Defines API semantics, not any browser's quota, eviction policy, crash behavior, or implementation quality. |
| STD-002 | [Storage Standard](https://storage.spec.whatwg.org/) | WHATWG | Living Standard | Standard | Origin-scoped storage buckets, quota, persistence, and storage endpoints. | 2026-07-16 | User-agent policy remains implementation-defined; persistence is not protection from explicit deletion. |
| STD-003 | [Web Storage](https://html.spec.whatwg.org/multipage/webstorage.html) | WHATWG | Living Standard | Standard | `localStorage` string-key/value model, origin scope, synchronous API, and storage events. | 2026-07-16 | Does not provide multi-record schemas, indexes, or application-level transactions. |
| STD-004 | [File System Standard](https://fs.spec.whatwg.org/) | WHATWG | Living Standard | Standard | Origin-private file-system handles and file/directory operations. | 2026-07-16 | Supplies a file substrate, not structured records, indexes, schema upgrades, or cross-file database transactions. |
| STD-005 | [Service Workers — Cache interface](https://w3c.github.io/ServiceWorker/#cache-interface) | W3C Web Applications Working Group | Editor's Draft, living | Standard | Cache Storage's request/response matching and mutation model. | 2026-07-16 | Designed around `Request`/`Response` resources; it has no general record schema, index, or version-change transaction model. |
| BROWSER-001 | [Window: indexedDB](https://developer.mozilla.org/en-US/docs/Web/API/Window/indexedDB) | MDN / Mozilla contributors | Living reference | Browser reference | IndexedDB entry point, origin scope, and broad browser availability. | 2026-07-16 | Compatibility breadth is not a guarantee of identical timing, durability, quota, or failure behavior. |
| BROWSER-002 | [IDBTransaction: durability](https://developer.mozilla.org/en-US/docs/Web/API/IDBTransaction/durability) | MDN / Mozilla contributors | Living reference | Browser reference | Browser-reported `strict`, `relaxed`, and `default` durability hints. | 2026-07-16 | The value is a hint selected or reported by the user agent, not proof that a write survived power loss. |
| BROWSER-003 | [Using IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB) | MDN / Mozilla contributors | Living guide | Browser guidance | Upgrade lifecycle, transactions, errors, version changes, and blocked older connections. | 2026-07-16 | Example guidance does not substitute for testing the project's exact schema and concurrent-tab behavior. |
| BROWSER-004 | [IndexedDB basic terminology](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Basic_Terminology) | MDN / Mozilla contributors | Living guide | Browser guidance | Transaction lifetime, browser-shutdown aborts, durability trade-offs, and same-origin storage. | 2026-07-16 | Shutdown and crash outcomes are browser/OS dependent and are difficult to reproduce as natural failures. |
| BROWSER-005 | [Storage quotas and eviction criteria](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria) | MDN / Mozilla contributors | Updated 2026-01-05 | Browser guidance | Best-effort versus persistent storage, quota failures, eviction, private browsing, and API coverage. | 2026-07-16 | Quotas are deliberately approximate and vary with browser, device, free space, and browsing mode. |
| BROWSER-006 | [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) | MDN / Mozilla contributors | Living reference | Browser reference | Synchronous Web Storage behavior, origin partition, and private-session lifetime. | 2026-07-16 | Small examples do not resolve multi-record atomicity, contention, or structured-data evolution. |
| BROWSER-007 | [Window: localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) | MDN / Mozilla contributors | Living reference | Browser reference | Origin-scoped persistence across sessions and string serialization. | 2026-07-16 | File-URL behavior is undefined and normal persistence remains subject to clearing, policy, and quota. |
| BROWSER-008 | [Origin private file system](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system) | MDN / Mozilla contributors | Living guide | Browser reference | OPFS isolation, in-place file access, quota participation, and performance role. | 2026-07-16 | It describes files, not a ready-made transactional record store for attempts and checkpoints. |
| BROWSER-009 | [StorageManager: getDirectory](https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/getDirectory) | MDN / Mozilla contributors | Living reference | Browser reference | OPFS root access and browser availability. | 2026-07-16 | Availability alone does not supply migrations, indexes, integrity rules, or atomic multi-file updates. |
| BROWSER-010 | [CacheStorage](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage) | MDN / Mozilla contributors | Living reference | Browser reference | Named caches, request matching, secure-context and worker/window availability. | 2026-07-16 | Its resource-cache abstraction mismatches mutable learner records and relational access patterns. |
| BROWSER-011 | [Persistent storage](https://web.dev/articles/persistent-storage) | Chrome Developers | 2020-05-12, updated 2021-11-05 | Browser-vendor guidance | `navigator.storage.persist()`, browser permission/heuristic differences, and eviction protection. | 2026-07-16 | Chrome-oriented guidance cannot establish Firefox or Safari behavior and does not prevent user clearing. |
| BROWSER-012 | [Updates to Storage Policy](https://webkit.org/blog/14403/updates-to-storage-policy/) | WebKit | 2023-04-26 | Browser-vendor policy | Safari storage quotas, cross-origin accounting, proactive eviction, and persistent-storage handling. | 2026-07-16 | Policy can change by Safari release and does not describe Chromium or Firefox. |
| BROWSER-013 | [Delete browsing data in Chrome](https://support.google.com/chrome/answer/2392709?hl=en) | Google Chrome Help | Living support page | Browser-vendor guidance | User clearing of site data and cookies. | 2026-07-16 | UI wording and exact deletion categories can vary by Chrome platform and release. |
| BROWSER-014 | [Clear cookies and site data in Firefox](https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox) | Mozilla Support | Living support page | Browser-vendor guidance | Firefox user-initiated per-site and broad site-data deletion. | 2026-07-16 | Desktop support steps do not enumerate every enterprise or mobile policy. |
| BROWSER-015 | [Clear cookies in Safari on Mac](https://support.apple.com/guide/safari/sfri11471/mac) | Apple | Living Safari User Guide | Browser-vendor guidance | Safari user-initiated website-data removal. | 2026-07-16 | Mac instructions do not define all iOS or managed-device behavior. |
| BROWSER-016 | [Browse in Incognito mode](https://support.google.com/chrome/answer/95464?hl=en) | Google Chrome Help | Living support page | Browser-vendor guidance | Incognito session lifetime and deletion of local browsing data when the session ends. | 2026-07-16 | Chrome-specific; other browsers use different private-session policy and terminology. |
| BROWSER-017 | [Full Third-Party Cookie Blocking and More](https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/) | WebKit | 2020-03-24 | Browser-vendor policy | Safari partitioning and ephemeral third-party storage context. | 2026-07-16 | Third-party embed policy is not the proof's first-party deployment model, but bounds future embedding assumptions. |
| LIB-001 | [`idb` 8.0.3 registry record](https://registry.npmjs.org/idb/8.0.3) | Jake Archibald / npm | 8.0.3, published 2025-05-07 | Official package record | Exact pinned artifact, exports, bundled declarations, zero runtime dependencies, and release metadata. | 2026-07-16 | Unpacked package bytes are not the application's emitted or compressed bundle cost. |
| LIB-002 | [`idb` README](https://github.com/jakearchibald/idb/tree/v8.0.3) | Jake Archibald | 8.0.3 | Official repository docs | Native-shaped Promise wrapper, `openDB`, `tx.done`, shortcuts, TypeScript schema, and documented modern-browser support. | 2026-07-16 | It retains native transaction lifetime; unrelated awaited work can auto-close a transaction. |
| LIB-003 | [`idb` 8.0.3 browser tests](https://github.com/jakearchibald/idb/blob/v8.0.3/test/index.ts) | Jake Archibald | 8.0.3 | Official repository tests | Upstream browser tests for wrapper behavior and deviations from IndexedDB. | 2026-07-16 | The suite intentionally does not prove IndexedDB itself or this project's schema and failure gates. |
| LIB-004 | [`idb` 8.0.3 release](https://github.com/jakearchibald/idb/releases/tag/v8.0.3) | Jake Archibald | 8.0.3, 2025-05-07 | Official release | Maintenance freshness and exact release identity. | 2026-07-16 | Release recency is maintenance evidence, not runtime-correctness evidence. |
| LIB-005 | [Dexie 4.4.4 registry record](https://registry.npmjs.org/dexie/4.4.4) | Dexie.js maintainers / npm | 4.4.4, published 2026-06-16 | Official package record | Exact pinned artifact, exports, bundled declarations, zero runtime dependencies, and release metadata. | 2026-07-16 | Package and distribution sizes are not comparable with a differently compressed `idb` headline figure. |
| LIB-006 | [Dexie 4.4.4 release](https://github.com/dexie/Dexie.js/releases/tag/v4.4.4) | Dexie.js maintainers | 4.4.4, 2026-06-16 | Official release | Maintenance freshness and the release's fixes. | 2026-07-16 | A maintenance release does not validate the blackjack data model or target browsers. |
| LIB-007 | [Dexie transactions](https://dexie.org/docs/Dexie/Dexie.transaction%28%29) | Dexie.js / Awarica | Dexie 4-compatible | Official library docs | Transaction zones, error propagation, nested transaction reuse, and async-boundary constraints. | 2026-07-16 | Nested transactions reuse one underlying `IDBTransaction`; they are not independent commits. |
| LIB-008 | [Dexie versioned stores](https://dexie.org/docs/Version/Version.stores%28%29) | Dexie.js / Awarica | Dexie 4-compatible | Official library docs | Declarative table/index schema versions. | 2026-07-16 | Schema declarations do not write application-specific data migrations or validate existing records. |
| LIB-009 | [Dexie upgrade callback](https://dexie.org/docs/Version/Version.upgrade%28%29) | Dexie.js / Awarica | Dexie 4-compatible | Official library docs | Transaction-bound data transforms during schema upgrade. | 2026-07-16 | Migration correctness and recovery policy remain application responsibilities. |
| LIB-010 | [Dexie TypeScript guide](https://dexie.org/docs/Typescript) | Dexie.js / Awarica | Dexie 4 | Official library docs | Bundled typings and typed database/table patterns. | 2026-07-16 | Runtime schema strings and persisted values are not proven correct by compile-time types. |
| LIB-011 | [Dexie 4.4.4 CI workflow](https://github.com/dexie/Dexie.js/blob/v4.4.4/.github/workflows/main.yml) | Dexie.js maintainers | 4.4.4 | Official repository CI | Upstream build and core/add-on test execution. | 2026-07-16 | Upstream coverage is maintenance evidence, not application-level cross-browser conformance. |
| LIB-012 | [Dexie on Safari](https://dexie.org/docs/IndexedDB-on-Safari) | Dexie.js / Awarica | Dexie 4-compatible | Official library docs | Documented Safari support, historical engine issues, and Dexie workarounds. | 2026-07-16 | Broad Safari claims are unversioned and browser storage policy remains WebKit-owned. |
| PRIV-001 | [Privacy Principles](https://www.w3.org/TR/privacy-principles/) | W3C Privacy Working Group | W3C Statement, 2025-06-12 | Privacy standard | Data minimization, user agency, deletion, and linkability principles for local identifiers and exports. | 2026-07-16 | Principles guide design; they do not prescribe a blackjack-specific legal compliance program. |
| PRIV-002 | [General Data Protection Regulation](https://eur-lex.europa.eu/eli/reg/2016/679/oj) | European Union | Regulation (EU) 2016/679 | Law / primary source | Pseudonymisation definition and the distinction between pseudonymous and anonymous information. | 2026-07-16 | Applicability is jurisdictional and contextual; this report is not legal advice and does not classify every future deployment. |

## Active Consumer and Data Shape

The active consumer is one first-party browser application serving one anonymous local learner. It must durably preserve append-oriented raw attempt records plus a reproducible cached mastery/checkpoint envelope, perform one atomic checkpoint commit, migrate explicit schema versions, export a canonical serializable snapshot, and completely reset its local envelope. Account identity, remote sync, telemetry, and cross-device reconciliation are outside this proof.

## Candidate Suitability Screen

| Candidate | Role | Structured records | Transactions | Schema migration | Cross-browser | Research disposition | Evidence IDs / limitation |
|---|---|---|---|---|---|---|---|
| in-memory state | Existing simplicity baseline | Native JS objects while the page lives | In-process sequencing only; no durable commit | Code-only shape changes | Browser-independent but reload-destructive | Baseline only | No durable boundary: reload, tab closure, and process loss discard progress. |
| localStorage | Minimal durable browser baseline | String-key/value pairs; structured values require whole-value serialization | No multi-key transaction; synchronous single-call mutation | Application-authored parse/rewrite | Widely available, with origin/private-mode policy differences | Baseline only | STD-003, BROWSER-006, BROWSER-007 — blocks the main thread and cannot atomically commit attempts plus checkpoint/revision records. |
| native IndexedDB | Browser-owned structured database | Object stores, keys, indexes, structured clone | Atomic transactions across named stores | Exclusive `versionchange` upgrade transaction | Broadly available; browser behavior still requires equal testing | Full equal benchmark | STD-001, BROWSER-001–BROWSER-005 — lowest abstraction, but verbose lifecycle/error handling and browser-owned durability. |
| idb 8.0.3 | Thin Promise/TypeScript wrapper over IndexedDB | Same IndexedDB data model with typed schema helpers | Enhanced native transactions and `tx.done` | Manual `upgrade` callback keyed by versions | Documents modern Chrome, Firefox, Safari, and Edge | Full equal benchmark | LIB-001–LIB-004 — native-shaped and small, but transaction lifetime and all storage guarantees remain IndexedDB-owned. |
| Dexie 4.4.4 | Higher-level IndexedDB table/query wrapper | Typed tables, indexed queries, and declarative schema strings | Transaction zones over native `IDBTransaction` | Declarative versions plus transactional upgrade callbacks | Documents Chrome, Firefox, Safari, and Edge; equal testing required | Full equal benchmark | LIB-005–LIB-012 — richer API may reduce application code but increases candidate-specific surface; browser guarantees remain IndexedDB-owned. |
| OPFS | Origin-private file substrate | Files and directories; application must invent record/index format | File writes, not a general cross-file record transaction | Entirely application-authored file format/versioning | Modern-browser availability varies by API surface and context | Reject before benchmark | STD-004, BROWSER-008, BROWSER-009 — solving structured records, indexes, migrations, and atomic envelopes above raw files adds complexity with no active-consumer benefit. |
| Cache Storage | Request/response resource cache | `Request` keys and `Response` values | Per-cache mutation API, not a multi-record database transaction | Cache naming/deletion only; no record-schema upgrade protocol | Broad service-worker/window support with secure-context constraints | Reject before benchmark | STD-005, BROWSER-010 — semantic mismatch for mutable attempts, revision checks, indexes, and atomic checkpoint records. |

## Provisional ProgressStore Contract

```typescript
type ResearchEnvelope = {
  schemaVersion: number;
  learnerId: string;
  revision: number;
  reducerVersion: string;
  curriculumVersions: string[];
  attempts: ResearchAttempt[];
  sessions: ResearchSessionSummary[];
  cachedMastery: unknown | null;
};

type CheckpointWrite = {
  idempotencyKey: string;
  expectedRevision: number;
  attempts: ResearchAttempt[];
  sessionSummary: ResearchSessionSummary | null;
};

interface ResearchProgressStore {
  open(namespace: string): Promise<void>;
  load(): Promise<ResearchEnvelope | null>;
  commitCheckpoint(write: CheckpointWrite): Promise<{ revision: number; duplicate: boolean }>;
  exportJson(): Promise<string>;
  reset(): Promise<void>;
  close(): Promise<void>;
}
```

This research contract tests required persistence semantics. The later adaptive-mechanics design may
split or rename operations, but it may not weaken atomic commit, idempotency, revision conflict,
migration/recovery, stable export, complete reset, or typed recoverable-error behavior established by
these gates.

## Identity and Privacy Boundary

- **INFERENCE from STD-002 and BROWSER-001:** progress is scoped to the application's origin and the current browser profile; it is not a physical-device identity and will not automatically follow a learner across scheme, host, port, profile, browser, or device changes.
- **INFERENCE from PRIV-001 and PRIV-002:** use a random opaque local learner key. Do not derive a hardware fingerprint or claim the data is universally anonymous merely because it lacks an account name; stable, linkable local records are at most pseudonymous in contexts where they can be related to a person.
- **OFFICIAL from BROWSER-005 and BROWSER-011–BROWSER-016:** clearing site data, closing a private session, quota pressure, and browser eviction are expected loss paths. A successful persistence request may reduce automatic eviction in a browser-specific way but cannot override explicit user deletion.
- **INFERENCE:** canonical export must be available before destructive recovery/reset, and reset must remove the complete local learner envelope. A later account link must be designed as an explicit import/association boundary; it is not implicit sync for this proof.

## Browser Environment

- **OBSERVED:** the CachyOS/Arch host launches Playwright Chromium and Firefox, but the downloaded
  WebKit fallback targets Ubuntu 24.04 libraries and cannot launch against the host ABI. The equal
  three-engine matrix therefore runs entirely in the version-matched official Playwright container,
  not as a mixed host/container comparison.
- Container: `mcr.microsoft.com/playwright:v1.61.1-noble`, digest
  `sha256:cf0daee9b994042e011bc29f20cdff1a9f682a039b43fcd738f7d8a9d3bcd9d6`.
- Red-harness environment: Node `v24.17.0`, Playwright `1.61.1`, Chromium `149.0.7827.55`,
  Firefox `151.0`, WebKit `26.5`, `idb` `8.0.3`, and Dexie `4.4.4`.
- **OBSERVED:** the deliberate red run produced the exact 15 browser/candidate rows and 210 named
  gate cells; all 210 failed only because the five registry factories report `candidate <id> not
  implemented`. The provisional result file was inspected and removed so pre-implementation output
  cannot be mistaken for final evidence.
- **Limitation:** containerized desktop engines are reproducible research targets, not evidence for
  mobile browsers, private-mode lifetime, natural eviction, OS power loss, or every deployed browser
  version.

## Correctness and Failure Results

| Candidate | Browser | Reload | Atomic commit | Idempotency | Revision conflict | Concurrent tabs | Export/reset | Migration/recovery | Gate verdict |
|---|---|---|---|---|---|---|---|---|---|
| in-memory state | Chromium / Firefox / WebKit | Fail: a fresh page loses the module map | Pass: cloned replacement is atomic in one realm | Pass | Pass | Fail: independent pages both win | Pass while the realm lives | Pass for code-only migration and typed fixtures | Baseline, 12/14 per browser |
| `localStorage` | Chromium / Firefox / WebKit | Pass | Fail: injected interruption between envelope and idempotency-key writes exposes the split commit | Pass without contention | Pass without contention | Fail: both pages read revision 0 and win | Pass | Pass for application parse/rewrite, but no transactional upgrade boundary | Baseline, 12/14 per browser |
| native IndexedDB | Chromium / Firefox / WebKit | Pass | Pass: one four-store `readwrite` transaction | Pass | Pass | Pass: one initial winner; loser reloads and retries at revision 1 | Pass | Pass: real v1→v2 `versionchange`, rollback, raw-v1 inspection, corrupt/newer refusal | Admission candidate, 14/14 per browser |
| `idb` 8.0.3 | Chromium / Firefox / WebKit | Pass | Pass: one four-store `readwrite` transaction plus `tx.done` | Pass | Pass | Pass: one initial winner; loser reloads and retries at revision 1 | Pass | Pass: real `openDB` v1→v2 upgrade, rollback, raw-v1 inspection, corrupt/newer refusal | Admission candidate, 14/14 per browser |
| Dexie 4.4.4 | Chromium / Firefox / WebKit | Pass | Pass: one four-table `rw` transaction | Pass | Pass | Pass: one initial winner; loser reloads and retries at revision 1 | Pass | Pass: declared v1/v2 upgrade transaction, rollback, raw-v1 inspection, corrupt/newer refusal | Admission candidate, 14/14 per browser |

- **OBSERVED:** the Task 5 correctness run produced all 210 named gate cells: 120 `OBSERVED`
  cells and 90 `SYNTHETIC` cells. Native IndexedDB, `idb`, and Dexie passed 42/42 each.
  The two baselines exited without admission failure while preserving their exact limitations above.
- **OBSERVED:** for every full candidate, two real pages reached the same revision without a
  runner-side mutex. Exactly one initial write committed; the conflict loser loaded revision 1 and
  its explicit retry advanced to revision 2.
- **SYNTHETIC:** quota, unavailable-storage, write-abort, aborted-upgrade, malformed-record, and
  newer-schema cells use deterministic harness controls. They prove the adapter response and
  last-valid-state handling, not the frequency or exact trigger of real browser failures.

## Benchmark Method

## Benchmark Results

## Migration and Recovery Evidence

The research migration is deliberately narrow. A v1 attempt has no `assistance`; v2 adds
`assistance: "none"`. V1 metadata has no `reducerVersion`; v2 adds
`research-reducer-v1`. Learner ID, revision 7, the complete attempt/session collections, cached
mastery, curriculum versions, and the pre-existing `migration-existing` idempotency key remain
unchanged. Reopening and re-running the v2 path produces byte-identical canonical export.

| Candidate | Transaction scope | Migration mechanism | Abort and retry evidence | Corrupt / newer behavior | Concurrent-writer result | User recovery path | Limitation |
|---|---|---|---|---|---|---|---|
| in-memory state | One cloned map-record replacement | Code-only parse and replacement | Injected abort occurs before replacement; retry migrates the retained v1 object | Typed refusal in the live realm | Independent page realms both win | Export or confirmed reset is possible only before the realm disappears | No reload durability and no cross-page authority |
| `localStorage` | Two independent synchronous key writes | Application parse/rewrite of envelope and idempotency-key set | Upgrade abort preserves v1, but checkpoint interruption proves the two-key boundary can become inconsistent | Typed refusal; reset is explicit | Both pages win and one update is lost | A production design would need raw export before confirmed reset; this baseline does not supply an atomic recovery boundary | No transaction across keys; synchronous main-thread work |
| native IndexedDB | One four-store checkpoint transaction; one exclusive version-change transaction | Native v1 database opened at version 2; cursor transforms attempts before metadata completes | Abort after attempt transforms rolls the physical database back to version 1; raw inspection shows no `assistance` or `reducerVersion`; reopen/retry succeeds | `RECOVERY_REQUIRED` or `NEWER_SCHEMA` includes namespace, detected schema, and safe actions; no automatic reset | Exactly one first commit; loser reload/retry reaches revision 2 | Offer raw export, then `reset-with-confirmation`; require app upgrade for schema 999 | Most lifecycle/error code; browser durability remains outside application control |
| `idb` 8.0.3 | Same four-store native transaction, awaited through `tx.done`; one `openDB` version-change transaction | `openDB(..., 2)` upgrade uses the underlying version-change transaction and cursor transform | Same physical-version-1 rollback and byte-stable retry; rejected `transaction.done` is consumed on deliberate abort | Same typed namespace/schema/action detail and no silent discard | Exactly one first commit; loser reload/retry reaches revision 2 | Same raw-export/confirmed-reset or app-upgrade route | Thin wrapper does not remove native transaction-lifetime or durability constraints |
| Dexie 4.4.4 | One four-table `rw` transaction; one declared-version upgrade transaction | Dexie version 1 and 2 schemas share the four tables; `version(2).upgrade(...)` performs the data transform | Throwing after attempt transforms rolls the whole upgrade back to logical version 1; v1-only inspection and retry pass | Same typed namespace/schema/action detail and no silent discard | Exactly one first commit; loser reload/retry reaches revision 2 | Same raw-export/confirmed-reset or app-upgrade route | Richest candidate-specific API surface; IndexedDB still owns storage guarantees |

For malformed metadata and malformed attempts, the full candidates surface
`RECOVERY_REQUIRED` with `export-raw` and `reset-with-confirmation`. For schema 999 they surface
`NEWER_SCHEMA` with `export-raw` and `upgrade-app`. Reset is never automatic: preserving the raw
record for user-directed export is part of the later product boundary, while the inspector used here
remains a harness-only control and is not part of `ProgressStore`.

## Tool and Runtime Admission Record

### 1. Active Task and Consumer

### 2. Alternatives Considered

### 3. Why the Simpler Current Path No Longer Works

### 4. Serializable Boundary Shape

### 5. Freshness and Determinism Evidence

### 6. Exit or Retirement Condition

## Rejected Alternatives

## Limitations and Coverage Gaps

## Recommendations Requiring User Approval
