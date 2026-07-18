# ProgressStore cycle-1 — 14-gate conformance against the idb adapter

> QA script-suite role `progress`. Spec: `docs/superpowers/specs/2026-07-17-progressstore-cycle1-design.md`. Plan: `docs/superpowers/plans/2026-07-17-progressstore-cycle1.md`.

- **Verdict:** PASS
- Started: 2026-07-18T21:17:34.002Z
- Finished: 2026-07-18T21:17:58.099Z
- Commit: `91d9b30`
- Base URL: http://127.0.0.1:4337/
- Gates per browser: 14 · Browsers: chromium, firefox
- chromium (149.0.7827.55): 14 pass / 0 fail / 0 declared-unsupported
- firefox (151.0): 14 pass / 0 fail / 0 declared-unsupported
- **Matrix total:** 28/28 pass

## Gate matrix (one row per browser × gate)

| Gate | chromium | firefox |
|------|------|------|
| open-empty | pass | pass |
| reload-persistence | pass | pass |
| atomic-commit | pass | pass |
| write-abort-rollback | pass | pass |
| idempotency-duplicate | pass | pass |
| revision-conflict | pass | pass |
| concurrent-appends | pass | pass |
| canonical-export-stable | pass | pass |
| export-precedes-reset | pass | pass |
| complete-reset | pass | pass |
| migration-additive | pass | pass |
| migration-abort-rollback | pass | pass |
| corrupt-recovery | pass | pass |
| newer-schema-refusal | pass | pass |

## Two-page race — additional multi-tab evidence (Option A)

The in-page gate 7 races two `open()` connections in one page. This is the SEPARATE two-PAGE
race the runner drives on the same origin with no runner-side mutex — distinct pages, distinct
attempts — recorded here as additional evidence for §2.4's unconditional `appendAttempt`.

- **chromium:** PASS — two real pages committed at consecutive revisions 1/2; reload sees both attempts [two-page-race-attempt-1, two-page-race-attempt-2]
- **firefox:** PASS — two real pages committed at consecutive revisions 1/2; reload sees both attempts [two-page-race-attempt-1, two-page-race-attempt-2]

## Failures

None — all gates passed in every browser.

## WebKit coverage gap (plan Step 5)

This run covers **Chromium and Firefox only**. WebKit is a NAMED GAP, not papered over: the
host's Playwright WebKit build targets Ubuntu 24.04 libraries and cannot launch against this
CachyOS/Arch ABI (AL-R2 `:141-145`). It is **non-blocking** — AL-R2 already proved `idb` 14/14 in
WebKit via the pinned container `mcr.microsoft.com/playwright:v1.61.1-noble`, and that container
path stays available if a WebKit-specific doubt ever arises. Nothing here is inherited from
AL-R2's `idb` evidence — these 28 cells re-prove §5.1's three-store layout and §2.4's append
deviation on THIS contract, in two engines.

## Serialized envelope bytes — measured, not gated (design §10, Task 10)

A MEASUREMENT pass, not a gate: the 14-gate matrix above (design §11) is the sole pass/fail
authority (design-erratum ruling — byte tiers are measured, never gated). This turns design
§10's "no cap" retention decision from an assumption into a measured claim. Each tier commits
`makeAttemptTier(n)` one attempt at a time into a freshly namespaced, then destroyed, REAL idb
store; canonical bytes come from the adapter's own `exportSnapshot({mode:'canonical'})` — the
real committed record shape, round-tripped through IndexedDB — not drafts serialized in memory.

Measured in **chromium** (see the Task 10 comment atop `run.ts` for why
this is chromium-only rather than duplicated across browsers).

| Tier | Attempts | Canonical bytes | Bytes/attempt | Measured IDB usage delta |
|------|----------|------------------|----------------|---------------------------|
| 20 | 20 | 16,324 | 816.20 | 23,112 bytes |
| 1,000 | 1,000 | 806,954 | 806.95 | 539,693 bytes |
| 10,000 | 10,000 | 8,096,959 | 809.70 | 2,339,935 bytes |

`navigator.storage.estimate()` is coarse/quantized in real browsers; a zero or non-monotonic
delta across tiers is a genuine browser observation, recorded as reported — never smoothed or
fabricated into a cleaner number.

**Conclusion, against design §10:** no cap is imposed. The measured cost is the table above —
at the 10,000-attempt stress tier (AL-R2's own stress tier), the canonical envelope is the
measured byte figure shown, not a guess. Three triggers, and only these three, would earn a
bound: (1) `QUOTA_EXCEEDED` observed in real use (not synthesised); (2) the external-beta
telemetry trigger firing (`docs/specs/research-brief.md:23`); (3) a measured `load()` latency
problem. Any future bound must be an **export-first compaction** or an **explicit user
action** — **never a silent delete** (design §10). This measurement pass does not itself
trigger any of the three, and asserts no new bound.
