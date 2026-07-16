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
