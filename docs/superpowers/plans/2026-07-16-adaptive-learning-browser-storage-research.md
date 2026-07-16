# Adaptive Learning Browser Storage Research Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce a cited, reproducible Tool & Runtime Admission decision for the smallest browser-local `ProgressStore` that can safely persist one anonymous learner's adaptive-learning evidence.

**Architecture:** This research plan keeps storage evaluation outside production learning code. It first fixes the consumer, logical contract, evidence labels, and candidate set; then drives native IndexedDB, `idb`, and Dexie through one browser contract and benchmark harness in Chromium, Firefox, and WebKit. The final report combines official evidence, machine-readable measurements, migration/recovery drills, and all six Admission Protocol fields, then stops for user approval.

**Tech Stack:** Markdown, TypeScript, the existing Node/Vite/Playwright toolchain, browser storage APIs, native IndexedDB, `idb` 8.0.3, Dexie 4.4.4, official standards/browser/library sources, JSON evidence artifacts, and Git.

## Global Constraints

- Treat this as a blackjack training product, never gambling software.
- Use `docs/superpowers/specs/2026-07-16-adaptive-ai-learning-architecture-design.md` as the approved umbrella and scope boundary.
- The active consumer is one anonymous device learner in the local adaptive-mechanics proof; accounts, cross-device sync, hosted databases, analytics, and public multi-user storage remain out of scope.
- Research native IndexedDB, `idb`, and Dexie as equal first-class candidates under the same logical contract and browser matrix.
- Use the current in-memory state and `localStorage` as baselines, not presumptive winners.
- Screen OPFS and Cache Storage for suitability from official evidence; add either to the full harness only if it plausibly meets the structured transactional consumer.
- Run browser-observed evidence in Chromium, Firefox, and WebKit. Do not infer cross-browser behavior from Chromium alone.
- Keep the research harness isolated under `web/research/browser-storage/`; no candidate package enters the production app dependency graph or product import path during AL-R2.
- Candidate packages in the isolated harness are research dependencies, not admitted product dependencies.
- Do not write durable production learner progress, change `LessonController`, or define the final production adapter in this plan.
- The provisional research contract is allowed to constrain the later mechanics design, but it does not become product authority until the user approves the admission recommendation and a focused implementation design adopts it.
- Preserve blackjack authority: cards, rules, legal actions, outcomes, and strategy remain Rust/WASM-owned and are only referenced by serializable attempt evidence.
- Generate one pseudonymous device learner key outside engine `SessionState`; do not add account, email, tenant, organization, or provider identity fields.
- Record raw attempts as durable authority; cached mastery must remain reproducible and cannot replace raw evidence.
- Separate official/published evidence, browser-observed measurements, and project inference in every recommendation.
- Prefer W3C/WHATWG, MDN, browser-vendor, official library documentation/repositories, and package registries. Use secondary sources only to locate direct evidence or expose disagreement.
- Record direct URLs, source/release dates where available, retrieval date, evidence scope, and limitations for every cited source.
- Quote sparingly and remain within source/copyright limits.
- Performance results are fixture- and environment-specific. Correctness, safe migration, recovery, export/reset, and explicit failure behavior gate admission before speed.
- Synthetic fault injection must be labeled synthetic; it cannot be reported as a browser-observed quota, corruption, crash, or eviction event.
- The research may recommend native IndexedDB, `idb`, Dexie, or no admission. It may not force a winner when correctness evidence is insufficient.
- Only the root/orchestrating agent edits `journal/ops/tasks.md`; delegated readers, if explicitly authorized later, return evidence and never move cards.
- Stop at the user-approval gate. Do not start production persistence, adaptive mechanics implementation, or AL-R3 automatically.

---

## File Map

**Create during execution:**

- `docs/superpowers/specs/2026-07-16-adaptive-learning-browser-storage-research.md` — evidence labels, source register, consumer/data shape, candidate comparison, browser results, migration/recovery analysis, six-field Admission record, rejected alternatives, coverage gaps, and approval recommendations.
- `web/research/browser-storage/package.json` — isolated pinned candidate dependencies only.
- `web/research/browser-storage/package-lock.json` — reproducible research dependency resolution.
- `web/research/browser-storage/tsconfig.json` — strict type-check boundary for the isolated browser harness and Node runner.
- `web/research/browser-storage/index.html` — Vite-served browser harness entry page, outside the production application entry.
- `web/research/browser-storage/src/contract.ts` — provisional logical data shapes, adapter contract, result schema, and correctness-gate names.
- `web/research/browser-storage/src/fixtures.ts` — deterministic learner, attempt, session, migration, duplicate, and malformed fixtures.
- `web/research/browser-storage/src/adapters/memory.ts` — in-memory baseline.
- `web/research/browser-storage/src/adapters/local-storage.ts` — `localStorage` baseline.
- `web/research/browser-storage/src/adapters/native-indexeddb.ts` — native IndexedDB candidate.
- `web/research/browser-storage/src/adapters/idb.ts` — `idb` candidate.
- `web/research/browser-storage/src/adapters/dexie.ts` — Dexie candidate.
- `web/research/browser-storage/src/registry.ts` — complete equal-candidate registry and per-run namespace factory.
- `web/research/browser-storage/src/suite.ts` — shared correctness, migration, recovery, concurrency, and benchmark suite.
- `web/research/browser-storage/src/page.ts` — browser entry that exposes one typed harness function to Playwright.
- `web/research/browser-storage/run.ts` — Vite lifecycle, Chromium/Firefox/WebKit orchestration, environment capture, deterministic result aggregation, and JSON writer.
- `docs/superpowers/specs/evidence/2026-07-16-browser-storage/results.json` — raw machine-readable environment, gate, failure-drill, and timing results.

**Read but do not modify:**

- `docs/superpowers/specs/2026-07-16-adaptive-ai-learning-architecture-design.md` — consumer, learner envelope, `ProgressStore`, privacy, and research-gate requirements.
- `docs/specs/stack-boundaries.md` — six-field Tool & Runtime Admission Protocol.
- `docs/architecture.md` — live in-memory gap, ownership, serializable boundary, and provider-neutral application-port requirements.
- `docs/specs/research-brief.md` — just-in-time durable-progress research questions and candidate discipline.
- `docs/specs/qa-playtest-process.md` and `journal/qa/ledger.md` — later feature-QA process; this research plan does not claim feature QA.
- `web/src/learn/types.ts` and `web/src/learn/controller.ts` — current serializable `AttemptRecord` and in-memory completion behavior.
- `web/src/bridge/log/sink.ts` and `web/src/bridge/log/memory-sink.ts` — existing async application-port precedent and export behavior.
- `web/package.json` and `web/package-lock.json` — existing toolchain; research execution must not add `idb` or Dexie here.

**Explicitly outside this plan:**

- production `ProgressStore` code or app integration;
- changes to the current `AttemptRecord`, mastery reducer, curriculum, `LessonController`, React UI, or Rust/WASM bridge;
- account creation, authentication, cloud storage, cross-device sync, telemetry, analytics, or remote backup;
- public-web data-classification or security architecture;
- mobile persistence, native SQLite, server databases, or hosted service selection;
- AI provider/model/runtime research; and
- feature QA or milestone closure for the later durable-progress implementation.

---

### Task 1: Establish the Research Record and Evidence Contract

**Files:**
- Create: `docs/superpowers/specs/2026-07-16-adaptive-learning-browser-storage-research.md`

**Interfaces:**
- Consumes: approved storage consumer, learner envelope, authority boundaries, and research gate from the umbrella architecture.
- Produces: stable evidence labels, report headings, research questions, candidate names, and result/admission tables consumed by Tasks 2–8.

- [ ] **Step 1: Re-read the exact local consumer and gate**

Run:

```bash
sed -n '1,180p' docs/superpowers/specs/2026-07-16-adaptive-ai-learning-architecture-design.md
sed -n '240,280p' docs/superpowers/specs/2026-07-16-adaptive-ai-learning-architecture-design.md
sed -n '430,490p' docs/superpowers/specs/2026-07-16-adaptive-ai-learning-architecture-design.md
sed -n '1,125p' docs/specs/stack-boundaries.md
sed -n '60,100p' docs/architecture.md
sed -n '1,45p' docs/specs/research-brief.md
```

Expected: the output identifies one anonymous local learner, durable raw attempts, reproducible cached mastery, the `ProgressStore` port, reset/export/recovery, all six Admission fields, and the prohibition on silently choosing a database or provider.

- [ ] **Step 2: Create the findings file with the exact research record**

Create `docs/superpowers/specs/2026-07-16-adaptive-learning-browser-storage-research.md` with this initial content:

```markdown
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

## Active Consumer and Data Shape

## Candidate Suitability Screen

| Candidate | Role | Structured records | Transactions | Schema migration | Cross-browser | Research disposition | Evidence IDs / limitation |
|---|---|---|---|---|---|---|---|

## Provisional ProgressStore Contract

## Identity and Privacy Boundary

## Browser Environment

## Correctness and Failure Results

| Candidate | Browser | Reload | Atomic commit | Idempotency | Revision conflict | Concurrent tabs | Export/reset | Migration/recovery | Gate verdict |
|---|---|---|---|---|---|---|---|---|---|

## Benchmark Method

## Benchmark Results

## Migration and Recovery Evidence

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
```

- [ ] **Step 3: Verify every required report surface exists**

Run:

```bash
rg -n '^## (Research Questions|Evidence Labels|Source Register|Active Consumer and Data Shape|Candidate Suitability Screen|Provisional ProgressStore Contract|Identity and Privacy Boundary|Browser Environment|Correctness and Failure Results|Benchmark Method|Benchmark Results|Migration and Recovery Evidence|Tool and Runtime Admission Record|Rejected Alternatives|Limitations and Coverage Gaps|Recommendations Requiring User Approval)$|^### [1-6]\. ' docs/superpowers/specs/2026-07-16-adaptive-learning-browser-storage-research.md
```

Expected: 22 matches: 16 level-two report headings and six numbered Admission fields.

- [ ] **Step 4: Commit the research-record structure**

```bash
git add docs/superpowers/specs/2026-07-16-adaptive-learning-browser-storage-research.md
git diff --cached --check
git commit -m "docs(research): scope browser storage evidence"
```

Expected: one new findings file committed; no harness, product code, or Kanban file changes.

---

### Task 2: Build the Official Source Register and Suitability Screen

**Files:**
- Modify: `docs/superpowers/specs/2026-07-16-adaptive-learning-browser-storage-research.md`

**Interfaces:**
- Consumes: Task 1 evidence labels, questions, candidate names, and source-register schema.
- Produces: stable `STD-*`, `BROWSER-*`, `LIB-*`, and `PRIV-*` evidence IDs plus the bounded suitability decision that determines whether OPFS or Cache Storage enters the harness.

- [ ] **Step 1: Research storage semantics from direct standards and browser sources**

Use web search only to locate direct pages, then open and cite the direct pages. Run bounded searches for:

```text
site:developer.mozilla.org IndexedDB transactions versionchange durability browser storage
site:developer.mozilla.org Storage API quotas eviction persist private browsing
site:w3.org OR site:whatwg.org IndexedDB storage standard transaction durability
site:web.dev storage quotas eviction IndexedDB browser
site:webkit.org storage policy IndexedDB eviction private browsing
site:developer.mozilla.org localStorage Web Storage atomic quota
site:developer.mozilla.org origin private file system OPFS
site:developer.mozilla.org Cache Storage API request response
```

Record only claims supported by the opened direct source. Do not cite search-result snippets.

- [ ] **Step 2: Research the two wrappers from their official surfaces**

Open the official package records, documentation, changelogs/releases, repositories, and TypeScript/browser-support statements for:

```text
idb 8.0.3 — npm registry and github.com/jakearchibald/idb
Dexie 4.4.4 — npm registry, dexie.org, and github.com/dexie/Dexie.js
```

For each library, record bundle/runtime role, IndexedDB ownership, transaction abstraction, upgrade/migration API, TypeScript support, documented browser support, maintenance/release evidence, test story, and limitations. A wrapper does not receive credit for browser guarantees that still belong to IndexedDB.

- [ ] **Step 3: Research pseudonymous identity and local-data boundaries**

Use direct standards/browser privacy material to establish:

```text
origin scoping
site-data deletion and browser clearing
private/incognito lifetime limitations
quota and eviction uncertainty
persistent-storage permission/heuristics
export and user-initiated deletion
pseudonymous device identifier treatment
```

Do not introduce account identity, consent banners, hosted retention policy, or cross-device conflict semantics into the local proof.

- [ ] **Step 4: Populate the source register with stable IDs**

Use these ID families:

```text
STD-001, STD-002, ...       standards and specifications
BROWSER-001, BROWSER-002, ... browser-vendor and MDN evidence
LIB-001, LIB-002, ...       official idb/Dexie package, docs, release, and repository evidence
PRIV-001, PRIV-002, ...     direct privacy/identity/storage-lifetime evidence
```

Every row must include a direct URL, owner, publication date or package version when available, source type, exact evidence scope, retrieval date, and a concrete limitation.

- [ ] **Step 5: Complete the candidate suitability screen before harness expansion**

Create rows for exactly:

```text
in-memory state
localStorage
native IndexedDB
idb 8.0.3
Dexie 4.4.4
OPFS
Cache Storage
```

Give each candidate one research disposition:

```text
Baseline only
Full equal benchmark
Full benchmark activated by evidence
Reject before benchmark
```

Native IndexedDB, `idb`, and Dexie must be `Full equal benchmark`. In-memory state and `localStorage` must be `Baseline only`. OPFS and Cache Storage use only the evidence-supported activated/rejected values.

If either OPFS or Cache Storage receives `Full benchmark activated by evidence`, stop after Task 2 and amend this plan's candidate type, adapter file map, gate matrix, runner counts, and review commands before Task 3. Obtain user approval for that bounded plan amendment; do not add a sixth candidate silently while executing the five-candidate harness below.

- [ ] **Step 6: Verify source and suitability completeness**

Run:

```bash
rg -n '^\| (STD|BROWSER|LIB|PRIV)-[0-9]{3} \|' docs/superpowers/specs/2026-07-16-adaptive-learning-browser-storage-research.md
rg -n '^\| (in-memory state|localStorage|native IndexedDB|idb 8\.0\.3|Dexie 4\.4\.4|OPFS|Cache Storage) \|' docs/superpowers/specs/2026-07-16-adaptive-learning-browser-storage-research.md
```

Expected: direct-source rows cover standards, all three browsers, both libraries, privacy/lifetime semantics, and seven candidate rows with bounded dispositions.

- [ ] **Step 7: Commit the source register and suitability screen**

```bash
git add docs/superpowers/specs/2026-07-16-adaptive-learning-browser-storage-research.md
git diff --cached --check
git commit -m "docs(research): register browser storage sources"
```

Expected: only the findings report changes.

---

### Task 3: Freeze the Provisional Contract and Create the Failing Browser Harness

**Files:**
- Create: `web/research/browser-storage/package.json`
- Create: `web/research/browser-storage/package-lock.json`
- Create: `web/research/browser-storage/tsconfig.json`
- Create: `web/research/browser-storage/index.html`
- Create: `web/research/browser-storage/src/contract.ts`
- Create: `web/research/browser-storage/src/fixtures.ts`
- Create: `web/research/browser-storage/src/registry.ts`
- Create: `web/research/browser-storage/src/suite.ts`
- Create: `web/research/browser-storage/src/page.ts`
- Create: `web/research/browser-storage/run.ts`
- Modify: `docs/superpowers/specs/2026-07-16-adaptive-learning-browser-storage-research.md`

**Interfaces:**
- Consumes: Task 2's active candidates and official semantics.
- Produces: one typed provisional contract, deterministic fixture family, result schema, three-browser runner, and deliberately failing candidate registry consumed by Tasks 4–6.

- [ ] **Step 1: Record the provisional logical boundary before coding adapters**

Add this exact logical shape to `Provisional ProgressStore Contract` in the findings report:

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

State explicitly that the research contract tests required semantics; the later mechanics design may split or rename operations without weakening those semantics.

- [ ] **Step 2: Create the isolated candidate package and install pinned wrappers**

Create `web/research/browser-storage/package.json`:

```json
{
  "name": "blackjack-browser-storage-research",
  "private": true,
  "type": "module",
  "dependencies": {
    "dexie": "4.4.4",
    "idb": "8.0.3"
  }
}
```

Create `web/research/browser-storage/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "noEmit": true,
    "types": ["node"]
  },
  "include": ["src", "run.ts"]
}
```

Run:

```bash
npm install --prefix web/research/browser-storage --ignore-scripts
npm --prefix web/research/browser-storage ls --depth=0
web/node_modules/.bin/tsc -p web/research/browser-storage/tsconfig.json --noEmit
git diff -- web/package.json web/package-lock.json
```

Expected: the isolated package lock pins Dexie 4.4.4 and `idb` 8.0.3; strict type-checking passes; the final diff command prints nothing because the production web package is untouched.

- [ ] **Step 3: Define the exact research types and gates**

In `contract.ts`, define and export the envelope/write types above plus:

```typescript
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
```

`ResearchFailureControls` must expose only deterministic research hooks for write abort, upgrade abort, raw malformed/newer-schema injection, and synthetic quota/unavailable errors. Keep those controls out of `ResearchProgressStore` so they cannot be mistaken for product API.

- [ ] **Step 4: Create deterministic fixture tiers**

In `fixtures.ts`, define fixtures with these exact sizes:

```text
small  — 1 session, 20 attempts
medium — 50 sessions, 1,000 attempts
stress — 500 sessions, 10,000 attempts
```

Use learner ID `device:00000000-0000-4000-8000-000000000001`, deterministic session/attempt IDs, sequential timestamps beginning `2026-07-16T00:00:00.000Z`, fixed curriculum/reducer versions, and no random or wall-clock input. Export builders for schema v1, schema v2, malformed, and unsupported schema 999 records.

- [ ] **Step 5: Write the common suite and stub registry before adapters**

`suite.ts` must execute all 14 named gates for every registered candidate and collect timing only after correctness gates finish. `registry.ts` must register all five candidate IDs with stub factories that throw `candidate <id> not implemented`.

Use this gate rule:

```typescript
const correctnessPassed = gates.every((result) => result.passed);
```

Quota and unavailable-storage gates pass only when they surface typed recoverable errors and preserve the last committed state. Their evidence remains `SYNTHETIC` and cannot be generalized into naturally observed browser behavior.

- [ ] **Step 6: Create the page entry and three-browser runner**

Install the browser bundles belonging to the existing pinned Playwright version before the first
three-engine run:

```bash
web/node_modules/.bin/playwright install chromium firefox webkit
```

Expected: Chromium, Firefox, and WebKit bundles for the existing web toolchain are available in the
Playwright cache; no production package manifest or lockfile changes.

`index.html` imports `/research/browser-storage/src/page.ts`. `page.ts` exposes exactly:

```typescript
declare global {
  interface Window {
    __runBrowserStorageResearch: () => Promise<BrowserSuiteResult>;
  }
}
```

`run.ts` must:

1. spawn the existing Vite binary from `web/node_modules` with base `/`, host `127.0.0.1`, port `4185`, and `--strictPort`;
2. wait for `http://127.0.0.1:4185/research/browser-storage/`;
3. launch Playwright's bundled Chromium, Firefox, and WebKit sequentially;
4. use a fresh browser context for each browser but retain origin storage across reload/concurrent-page gates inside that context;
5. capture browser name/version, user agent, Node version, package versions, UTC run time, commit hash, gate results, and timings;
6. sort candidates, gates, workloads, and operations before serialization;
7. write JSON plus a trailing newline to a sibling temporary file, then rename it atomically to `docs/superpowers/specs/evidence/2026-07-16-browser-storage/results.json`;
8. exit nonzero when a full-benchmark candidate has a failed correctness gate; and
9. always close pages, contexts, browsers, and the Vite child.

The runner must accept only these CLI filters:

```text
--candidate memory|local-storage|native-indexeddb|idb|dexie
--correctness-only
```

With no filter it runs all five candidates and includes timings. An unknown flag or candidate exits with code 2 before launching a browser.

- [ ] **Step 7: Run the harness and verify the intended red state**

Run:

```bash
web/node_modules/.bin/tsx web/research/browser-storage/run.ts
```

Expected: FAIL with `candidate memory not implemented` and analogous failures for the other registered candidates; no production app file changes.

- [ ] **Step 8: Commit the contract and red harness**

```bash
git add docs/superpowers/specs/2026-07-16-adaptive-learning-browser-storage-research.md web/research/browser-storage
git diff --cached --check
git commit -m "test(research): define browser storage contract"
```

Expected: the report contract, isolated package, deterministic fixtures, and deliberately red harness are committed together.

---

### Task 4: Implement Baselines and Equal First-Class Candidates

**Files:**
- Create: `web/research/browser-storage/src/adapters/memory.ts`
- Create: `web/research/browser-storage/src/adapters/local-storage.ts`
- Create: `web/research/browser-storage/src/adapters/native-indexeddb.ts`
- Create: `web/research/browser-storage/src/adapters/idb.ts`
- Create: `web/research/browser-storage/src/adapters/dexie.ts`
- Modify: `web/research/browser-storage/src/registry.ts`
- Modify: `web/research/browser-storage/src/suite.ts`

**Interfaces:**
- Consumes: Task 3 contract, fixtures, named gates, and failure-control separation.
- Produces: five idiomatic adapters behind one logical interface, with native IndexedDB, `idb`, and Dexie receiving identical full-gate coverage.

- [ ] **Step 1: Implement the in-memory baseline and make only its gates green**

The memory baseline stores a cloned envelope per namespace in a module-level `Map`. It must enforce expected revision, idempotency key uniqueness, atomic checkpoint replacement, stable sorted export, complete reset, and the same typed errors as browser-backed candidates. It must intentionally fail reload durability when the simulated process map is cleared; record that as a baseline limitation rather than disguising it.

Run:

```bash
web/node_modules/.bin/tsx web/research/browser-storage/run.ts --candidate memory
```

Expected: all applicable memory correctness gates pass except the explicitly expected durability limitation; the overall command still exits zero because memory is a baseline, not an admission candidate.

- [ ] **Step 2: Implement the `localStorage` baseline**

Store one canonical JSON envelope and one idempotency-key set under namespace-prefixed keys. Enforce schema refusal, revision conflicts, deterministic export, and reset. Do not add an in-process lock that falsely simulates cross-tab atomic transactions. The concurrent-writers gate must expose the actual lost-update/serialization limitation if present.

Run:

```bash
web/node_modules/.bin/tsx web/research/browser-storage/run.ts --candidate local-storage
```

Expected: reload/export/reset gates pass; any atomicity or concurrency limitation is explicit and does not fail the research run because `localStorage` is a baseline.

- [ ] **Step 3: Implement native IndexedDB first from direct API semantics**

Use one database per namespace with object stores:

```text
meta          key "learner" -> schemaVersion, learnerId, revision, reducerVersion, curriculumVersions, cachedMastery
attempts      keyPath "attemptId", index "sessionId"
sessions      keyPath "sessionId"
idempotency   keyPath "idempotencyKey"
```

`commitCheckpoint` must use one `readwrite` transaction spanning all four stores. It must read and verify current revision, return `duplicate: true` without new writes for a repeated idempotency key, write attempts/session/idempotency, increment revision once, and reject on injected abort. Resolve only after `transaction.oncomplete`; reject on `onabort`/`onerror` with a typed research error.

Run:

```bash
web/node_modules/.bin/tsx web/research/browser-storage/run.ts --candidate native-indexeddb
```

Expected: the native candidate passes the full correctness suite in all three browser engines before timings are accepted.

- [ ] **Step 4: Implement `idb` with the same stores and semantics**

Use `openDB` and its upgrade callback for the exact four-store schema. Use a single multi-store `readwrite` transaction for `commitCheckpoint`, await `tx.done`, and preserve the same result/error shapes. Do not add behavior unavailable to the native candidate's logical contract.

Run:

```bash
web/node_modules/.bin/tsx web/research/browser-storage/run.ts --candidate idb
```

Expected: `idb` passes the same full correctness suite in Chromium, Firefox, and WebKit.

- [ ] **Step 5: Implement Dexie with the same stores and semantics**

Define the exact four tables and use `db.transaction('rw', ...)` for checkpoint commits. Keep Dexie-specific collection/live-query APIs out of the adapter because the active consumer does not require them. Preserve the same revision, idempotency, export, reset, and error behavior.

Run:

```bash
web/node_modules/.bin/tsx web/research/browser-storage/run.ts --candidate dexie
```

Expected: Dexie passes the same full correctness suite in Chromium, Firefox, and WebKit.

- [ ] **Step 6: Run the complete equal-candidate correctness matrix**

```bash
web/node_modules/.bin/tsx web/research/browser-storage/run.ts --correctness-only
```

Expected: all full-benchmark candidates pass all required correctness gates across the three browsers; baselines record limitations without being promoted to admission candidates.

- [ ] **Step 7: Commit the candidate adapters**

```bash
git add web/research/browser-storage
git diff --cached --check
git commit -m "test(research): exercise browser storage candidates"
```

Expected: only research-harness files change.

---

### Task 5: Exercise Migration, Recovery, Failure, and Concurrency

**Files:**
- Modify: `web/research/browser-storage/src/contract.ts`
- Modify: `web/research/browser-storage/src/fixtures.ts`
- Modify: `web/research/browser-storage/src/adapters/native-indexeddb.ts`
- Modify: `web/research/browser-storage/src/adapters/idb.ts`
- Modify: `web/research/browser-storage/src/adapters/dexie.ts`
- Modify: `web/research/browser-storage/src/suite.ts`
- Modify: `docs/superpowers/specs/2026-07-16-adaptive-learning-browser-storage-research.md`

**Interfaces:**
- Consumes: Task 4's green equal-candidate contract.
- Produces: explicit v1→v2 migration behavior, recovery evidence, typed failure surfaces, and multi-tab conflict evidence used by the admission gate.

- [ ] **Step 1: Define the exact v1→v2 migration**

Use this research migration only:

```text
schema v1 attempt: assistance is absent
schema v2 attempt: assistance is required and defaults to "none" during migration
schema v1 meta: reducerVersion is absent
schema v2 meta: reducerVersion is required and defaults to "research-reducer-v1" during migration
```

Migration must preserve learner ID, attempts, sessions, idempotency keys, and revision; it must not recalculate correctness or mastery. Re-running the migration must be idempotent.

- [ ] **Step 2: Prove successful and aborted migration behavior**

For native IndexedDB, `idb`, and Dexie:

1. load the v1 fixture;
2. migrate to v2 and verify byte-stable canonical export after reopening;
3. inject an abort after attempt transformation but before meta/version completion;
4. verify no partial v2 state becomes visible;
5. reopen the last valid v1 state; and
6. retry migration successfully.

Expected: every full candidate either demonstrates atomic recovery or fails admission with exact evidence.

- [ ] **Step 3: Prove malformed and newer-schema recovery**

Inject malformed meta, malformed attempt, and schema version 999 separately. The store must never silently reset or discard valid records. It must return a typed recoverable error containing namespace, detected schema, and safe next actions (`export-raw`, `reset-with-confirmation`, or `upgrade-app`).

- [ ] **Step 4: Prove deterministic idempotency and revision conflicts**

Submit the same checkpoint twice and verify one logical commit and `duplicate: true` on the repeat. Then submit two different writes with the same `expectedRevision`; exactly one may advance the revision. The loser must receive a typed revision-conflict error and may succeed only after reload/retry with the new revision.

- [ ] **Step 5: Exercise two real pages against one origin namespace**

Open two pages in the same browser context, load the same revision, and race distinct checkpoint writes. Record whether each candidate preserves the exactly-one-winner rule. Do not serialize the pages in the Node runner or add a shared JavaScript mutex that hides browser behavior.

- [ ] **Step 6: Separate synthetic failure handling from observed browser behavior**

Inject `QuotaExceededError`, storage-unavailable, and write-abort faults through `ResearchFailureControls`. Verify typed recoverable errors and preservation of the last committed state. In the report, label these `SYNTHETIC`; use official sources—not the injection—to describe real quota, eviction, or private-mode behavior.

- [ ] **Step 7: Run and record the full failure matrix**

```bash
web/node_modules/.bin/tsx web/research/browser-storage/run.ts --correctness-only
```

Expected: raw JSON contains all 14 named gate results for every candidate/browser pair, with explicit `OBSERVED` or `SYNTHETIC` labels and no missing result cells.

- [ ] **Step 8: Summarize migration and recovery evidence in the report**

For each candidate, record transaction scope, migration mechanism, abort behavior, retry behavior, corrupt/newer-record behavior, concurrent-writer result, user recovery path, and limitation. Do not copy raw timing arrays into prose.

- [ ] **Step 9: Commit the failure and recovery evidence**

```bash
git add web/research/browser-storage docs/superpowers/specs/2026-07-16-adaptive-learning-browser-storage-research.md
git diff --cached --check
git commit -m "docs(research): verify storage migration recovery"
```

Expected: harness changes and their report interpretation commit together.

---

### Task 6: Run the Cross-Browser Benchmark and Freeze Raw Evidence

**Files:**
- Modify: `web/research/browser-storage/src/fixtures.ts`
- Modify: `web/research/browser-storage/src/suite.ts`
- Modify: `web/research/browser-storage/run.ts`
- Create: `docs/superpowers/specs/evidence/2026-07-16-browser-storage/results.json`
- Modify: `docs/superpowers/specs/2026-07-16-adaptive-learning-browser-storage-research.md`

**Interfaces:**
- Consumes: Task 5's correctness-gated candidates and deterministic fixture tiers.
- Produces: reproducible environment metadata, raw samples, p50/p95/max summaries, serialized sizes, and bounded benchmark interpretation.

- [ ] **Step 1: Lock the timing protocol in the report before running it**

Record this exact method:

```text
browsers: Playwright bundled Chromium, Firefox, WebKit
candidate order: rotate deterministically by browser; record order
warm-up: 5 unrecorded operations per candidate/workload/operation
samples: 30 recorded operations per candidate/workload/operation
workloads: small (20 attempts), medium (1,000), stress (10,000)
operations: open, load, single checkpoint commit, canonical export, reset
statistics: raw samples plus p50, p95, max; no mean-only claims
correctness gate: no timing is decision-eligible when that candidate/browser pair fails correctness
```

Record serialized fixture byte size and exported byte size for every workload. Do not claim these fixtures predict real learner retention volume.

- [ ] **Step 2: Install the three Playwright browser engines if missing**

```bash
web/node_modules/.bin/playwright install chromium firefox webkit
```

Expected: Playwright reports the required browser binaries present or installs them successfully.

- [ ] **Step 3: Run the complete benchmark from a clean result path**

```bash
web/node_modules/.bin/tsx web/research/browser-storage/run.ts
```

Expected: exit zero; the runner atomically replaces one deterministic-schema result file containing environment metadata, all gate cells, raw timing arrays, summaries, fixture sizes, export sizes, and no missing candidate-browser-workload-operation cell.

- [ ] **Step 4: Verify result integrity independently of the report**

Run:

```bash
node -e "const fs=require('fs');const p='docs/superpowers/specs/evidence/2026-07-16-browser-storage/results.json';const s=fs.readFileSync(p,'utf8');const x=JSON.parse(s);if(x.browsers.length!==3)throw Error('browser count');if(x.candidates.length!==5)throw Error('candidate count');for(const b of x.browsers)for(const c of x.candidates){const r=x.runs.find(v=>v.browser===b.id&&v.candidate===c.id);if(!r)throw Error('missing '+b.id+'/'+c.id);if(r.gates.length!==14)throw Error('gate count '+b.id+'/'+c.id)}if(!s.endsWith('\\n'))throw Error('newline');console.log('result matrix, gate counts, and newline: PASS')"
rg -n '"passed": false' docs/superpowers/specs/evidence/2026-07-16-browser-storage/results.json
```

Expected: the Node check prints `PASS`. Every `passed: false` match is either a documented baseline limitation or blocks that full candidate; `null` must not appear as an omitted result substitute.

- [ ] **Step 5: Populate the browser environment and benchmark tables**

The report must name the exact OS, Node version, commit, browser versions, `idb`/Dexie versions, run timestamp, workload sizes/bytes, sample count, and benchmark limitations. Summarize p50/p95/max and cross-browser outliers without claiming universal performance.

- [ ] **Step 6: Commit the raw evidence and benchmark synthesis**

```bash
git add docs/superpowers/specs/evidence/2026-07-16-browser-storage/results.json docs/superpowers/specs/2026-07-16-adaptive-learning-browser-storage-research.md web/research/browser-storage
git diff --cached --check
git commit -m "docs(research): benchmark browser progress stores"
```

Expected: raw evidence, any harness correction required to obtain it, and report interpretation are committed together.

---

### Task 7: Complete the Admission Record and Recommendation

**Files:**
- Modify: `docs/superpowers/specs/2026-07-16-adaptive-learning-browser-storage-research.md`

**Interfaces:**
- Consumes: Tasks 2–6 official sources, logical contract, gate results, failure drills, raw benchmark evidence, and limitations.
- Produces: a decision-ready six-field Admission record, rejected alternatives, later implementation constraints, and bounded approval choices.

- [ ] **Step 1: Complete all six Admission fields with traceable evidence**

Each field must answer:

1. **Active task and consumer:** exact local adaptive-learning proof, learner envelope, expected write/read/reload flow, and why progress loss now blocks the consumer.
2. **Alternatives considered:** in-memory, `localStorage`, native IndexedDB, `idb`, Dexie, OPFS, Cache Storage, and no-new-tool path.
3. **Why the simpler current path no longer works:** the measured/observable reload, transaction, migration, or recovery failure—not preference or future scale.
4. **Serializable boundary shape:** learner identity, versioned envelope, checkpoint write, raw attempts, summaries, cached mastery, export/reset, and which layer owns truth.
5. **Freshness and determinism evidence:** pinned research versions, committed raw results, deterministic fixtures, stable export, and three-browser evidence; explicitly state that no generated production artifact is admitted here.
6. **Exit or retirement condition:** exact evidence that would remove, replace, or consolidate the chosen option.

- [ ] **Step 2: Apply hard correctness gates before ranking convenience or speed**

A full candidate is ineligible if any target browser cannot demonstrate:

```text
reload durability
atomic checkpoint commit
idempotent duplicate handling
revision-conflict detection
exactly-one-winner concurrent writes
stable complete export
complete reset
atomic v1→v2 migration
aborted migration recovery
malformed/newer-schema refusal without silent loss
typed quota/unavailable-storage failure handling
```

Among eligible candidates, compare API complexity, bundle/dependency cost, maintenance evidence, migration ergonomics, test clarity, raw timing evidence, and exit cost. Keep subjective ergonomics labeled `INFERENCE` and show the concrete code/evidence behind it.

- [ ] **Step 3: Define later implementation constraints without designing the implementation**

Record the minimum constraints passed downstream:

```text
outer schema version and pseudonymous learner key exist before first durable attempt
raw attempts remain durable authority
checkpoint writes are atomic, revision-checked, and idempotent
cached mastery is reproducible and disposable
unknown-newer and corrupt records never trigger silent reset
export works before destructive reset/recovery
storage failure leaves the last committed state usable and surfaces a recoverable product state
React and engine code do not call the storage provider directly
account linking later imports/associates the local envelope through a separate design
```

Do not choose final TypeScript filenames, controller wiring, UI copy, or migration numbering for production.

- [ ] **Step 4: Populate rejected alternatives and bounded coverage gaps**

For every rejected/deferred candidate, cite official and observed evidence, the failed consumer requirement, and the trigger that would reopen it. Coverage gaps must name sources/experiments attempted, why evidence remains insufficient, the affected decision, and whether it blocks admission.

- [ ] **Step 5: Write the exact user-approval choices**

`Recommendations Requiring User Approval` must offer:

```text
Approve the recommended candidate and downstream constraints
Approve a named alternative with its explicit tradeoff
Reject admission and keep progress in memory pending specified evidence
```

Name the recommended option, why it wins, which evidence would change the recommendation, and whether any non-blocking uncertainty remains.

- [ ] **Step 6: Verify the Admission record has no silent scope expansion**

Run:

```bash
rg -n '^### [1-6]\. ' docs/superpowers/specs/2026-07-16-adaptive-learning-browser-storage-research.md
rg -n -i 'account|sync|backend|server|hosted|analytics|telemetry|mobile|sqlite|postgres|supabase|firebase' docs/superpowers/specs/2026-07-16-adaptive-learning-browser-storage-research.md
```

Expected: six numbered Admission headings. Every scope keyword match is an explicit exclusion, future trigger, rejected alternative, or boundary statement—not a selected implementation.

- [ ] **Step 7: Commit the decision synthesis**

```bash
git add docs/superpowers/specs/2026-07-16-adaptive-learning-browser-storage-research.md
git diff --cached --check
git commit -m "docs(research): recommend browser progress storage"
```

Expected: only the findings report changes.

---

### Task 8: Adversarially Review the Evidence and Stop at the User Gate

**Files:**
- Modify: `docs/superpowers/specs/2026-07-16-adaptive-learning-browser-storage-research.md`
- Modify if evidence defects require correction: `web/research/browser-storage/**`
- Modify if corrected runs are required: `docs/superpowers/specs/evidence/2026-07-16-browser-storage/results.json`

**Interfaces:**
- Consumes: the complete report, harness, sources, and raw results from Tasks 1–7.
- Produces: a citation-audited, reproducible, scope-safe research package awaiting user approval.

- [ ] **Step 1: Audit every factual claim and candidate comparison**

For every report row and recommendation:

1. open each cited direct source;
2. confirm wording, browser/version scope, and documented limitations;
3. confirm every `OBSERVED` claim is present in raw results;
4. confirm every `SYNTHETIC` claim is labeled and never generalized into browser behavior;
5. downgrade overbroad language to `INFERENCE` or `COVERAGE GAP`; and
6. remove unsupported claims rather than filling them from memory.

- [ ] **Step 2: Re-run the harness from the committed inputs**

```bash
npm install --prefix web/research/browser-storage --ignore-scripts
web/node_modules/.bin/tsx web/research/browser-storage/run.ts
git diff -- docs/superpowers/specs/evidence/2026-07-16-browser-storage/results.json
```

Expected: rerun exits zero. Environment/run timestamp fields may differ; gate structure, deterministic exports, candidate set, and interpretation-relevant results remain consistent. Any material timing or gate change is investigated and recorded before approval.

- [ ] **Step 3: Audit product authority, privacy, and data-loss safety**

Confirm the report does not:

```text
put identity inside Rust SessionState
let cached mastery replace raw attempts
silently reset malformed/newer data
claim browser eviction cannot happen
claim pseudonymous local identity is anonymous in every privacy sense
select account/sync/backend behavior
import candidate libraries into production app code
turn benchmark speed into the sole admission reason
```

- [ ] **Step 4: Verify plan/report/source/result integrity**

Run:

```bash
rg -n -i '\b(TBD|TODO|FIXME|placeholder|somehow)\b' docs/superpowers/specs/2026-07-16-adaptive-learning-browser-storage-research.md web/research/browser-storage
rg -n '^\| (STD|BROWSER|LIB|PRIV)-[0-9]{3} \|' docs/superpowers/specs/2026-07-16-adaptive-learning-browser-storage-research.md
test -f docs/superpowers/specs/evidence/2026-07-16-browser-storage/results.json
git diff --check
git status --short
```

Expected: placeholder and whitespace scans print nothing; source rows and the raw result file exist; status contains only reviewed AL-R2 corrections, if any.

- [ ] **Step 5: Commit review corrections**

```bash
if git diff --quiet -- docs/superpowers/specs/2026-07-16-adaptive-learning-browser-storage-research.md docs/superpowers/specs/evidence/2026-07-16-browser-storage/results.json web/research/browser-storage
then
  echo "No review corrections; retain the prior report and evidence commits."
else
  git add docs/superpowers/specs/2026-07-16-adaptive-learning-browser-storage-research.md docs/superpowers/specs/evidence/2026-07-16-browser-storage/results.json web/research/browser-storage
  git diff --cached --check
  git commit -m "docs(research): review browser storage evidence"
fi
```

Expected: the final research package is committed. If review required no changes, record the prior report commit as review evidence instead of creating an empty commit.

- [ ] **Step 6: Stop at the user evidence gate**

Report exactly:

```text
Browser-storage research complete. Please review the Admission record, rejected alternatives, coverage gaps, and recommended candidate. No storage option becomes product authority and no durable-progress implementation begins until you approve the bounded recommendation.
```

Expected: execution stops for user review. AL-R2 does not move to Done and AL-R3 does not start automatically.

---

## Plan Verification

Before executing Task 1, the root/orchestrating agent runs:

```bash
test -f docs/superpowers/specs/2026-07-16-adaptive-ai-learning-architecture-design.md
test -f docs/specs/stack-boundaries.md
test -f docs/architecture.md
test -f docs/specs/research-brief.md
test -f web/src/learn/types.ts
test -f web/src/learn/controller.ts
test -f web/src/bridge/log/sink.ts
test -f web/package.json
rg -n '^### AL-R2 ' journal/ops/tasks.md
rg -n '^- Owner: orchestrator$|^- Next: Write the independent browser-storage research plan' journal/ops/tasks.md
git status --short
```

Expected: every input exists; AL-R2 is Active and owned by the orchestrator; before Task 1 begins, the only uncommitted file is none. The plan commit and any subsequent operational pointer update must already be committed separately.

This plan is complete when the reviewed findings report, isolated harness, and raw evidence are committed and awaiting user approval. It does not itself admit a production dependency, implement durable progress, close AL-R2, or authorize another card.
