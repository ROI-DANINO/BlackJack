# Tool & Runtime Admission Protocol

> Status: approved 2026-07-12. The Rust/TypeScript/Python roster below is the protocol's current
> result, not a permanent language lock.

## Purpose

Choose the simplest toolchain that satisfies the active product task while protecting the properties
that are expensive to recover later: blackjack authority, plain serializable boundaries, generated-
artifact freshness, and cross-target determinism.

This protocol is not a registry, technology catalogue, or permission to add speculative layers. A
new runtime, database, managed service, generated artifact, or cross-target boundary is admitted only
for a concrete consumer. If the current path still works simply, keep it.

## Admission trigger and gate

Run the gate before choosing any new:

- language or application runtime;
- database, durable store, or hosted/managed service;
- compiled, transpiled, or generated delivery artifact; or
- cross-language, cross-process, or cross-target boundary.

The active design or implementation plan must record all six fields:

1. **Active task and consumer** — the exact product/research job the tool serves now.
2. **Alternatives considered** — including the current stack and a no-new-tool option.
3. **Why the simpler current path no longer works** — concrete evidence or measured retrofit cost,
   not preference or hypothetical scale.
4. **Serializable boundary shape** — the data/actions crossing the boundary and which side owns
   truth; no hidden shared/native state.
5. **Freshness and determinism evidence where relevant** — generated/compiled artifacts need a
   freshness guard; cross-target execution needs parity evidence when behavior must match.
6. **Exit or retirement condition** — the evidence that would remove, replace, or consolidate the
   tool later.

No additional protocol is created merely because a new candidate appears. Normal design, review,
verification, and feature QA remain the execution loop.

## Current admitted results

### Rust and WebAssembly

Rust owns the durable simulator core: cards and deck identity, ordered shoes, seeded shuffle,
penetration, rulesets, legal actions, round flow, exact-money settlement, replayable logs, hand facts,
and ruleset-matched Basic Strategy. WASM delivers that same core to the browser because deterministic
portable execution and later high-volume simulation justify it.

The generated browser bridge is not tracked. Core changes must rebuild it, and freshness/parity
checks belong to any slice that changes this boundary.

### TypeScript and React

TypeScript owns browser interaction, lightweight application state, learning contracts/controllers,
and bridge validation. React renders product state and submits actions; it does not own or recreate
blackjack rules, legality, totals, settlement, or strategy truth.

### Python

Python is admitted for research scripts, strategy-table generation/verification, data processing,
analytics, audits, and notebooks. It is not a production application runtime today.

### Storage and hosted services

Current product state is in memory. Local JSONL history export is a lossless user/dev artifact, not a
database or sync system. `idb` 8.0.3 is admitted for one concrete consumer: the browser-local
`ProgressStore` adapter for pseudonymous learner attempts and checkpoints. It passed the scoped
cross-browser correctness, migration, failure, and recovery gates; performance timing was explicitly
not used in the decision and remains a non-blocking gap. The application dependency and production
adapter are not installed or implemented yet — and the admission stays conditional until they are:
the implementation slice must measure the real production bundle delta, and a material unacceptable
delta reverses the choice to native IndexedDB. No account provider, BaaS, telemetry service, hosted
database, or mobile framework has been admitted. The provider-neutral `ProgressStore` and
outer-versioned record seam must be implemented by the first durable-progress slice.

## Current boundary shape

The engine exposes one stateless JSON entry point, `dispatch_json(input) -> output`. Each command
carries the complete state it needs; the core holds no ambient session.

Current command variants:

- `start_session`
- `start_session_with_prefix`
- `start_round`
- `legal_actions`
- `apply_action`
- `reshuffle`
- `describe_hand`
- `check_strategy_compatibility`

Current response variants:

- `session`
- `actions`
- `hand_facts`
- `strategy_compatibility`

The envelope and shared state are plain serializable data mirrored by hand-authored TypeScript types,
Rust-emitted golden fixtures, runtime validation, and compile-time contract tests. Every new wire
variant must extend that evidence in its own feature plan.

## Banked evidence for future triggers

Evidence gathered **before** a trigger fires, so a later admission is not decided under pressure.
None of this admits anything. Nothing below is a decision.

### Mobile runtime (trigger not fired)

Scan 2026-07-23, 24 sources opened; record `journal/raw/_inbox/2026-07-23-mobile-stack-scan.md`.

- **The best-evidenced "shared Rust core, native UI" production example is Element X** — one Rust
  core (`matrix-rust-sdk`) exposed via UniFFI, with fully native SwiftUI and Jetpack Compose UIs.
  That is the shape this project already has, which means the **UI is expected to be rewritten per
  platform and the core is not.**
- **Comparable learning/content apps ship fully native per platform.** Duolingo, Brilliant, and
  Reddit showed no cross-platform framework, shared compiled core, or webview shell in any source
  opened. Sourcing is uneven and must not be overstated: Duolingo's *current iOS* architecture is
  unsourced, Brilliant rests on one job posting, and Reddit's own domains were unreachable (nothing
  newer than April 2025).
- **Watch, do not bet on:** `uniffi-bindgen-react-native` (v0.31.0-3, 2026-05-28) now emits a
  `wasm-bindgen` crate *alongside* native mobile bindings — one binding set spanning web and mobile
  from the same Rust core. Still 0.x with three small named users.
- **Two negatives that matter more than the positives.** Tauri v2's *mobile* production users are
  **completely unestablished** — the names in circulation are desktop-first products sourced only
  from a search summary. UniFFI's own documentation makes **no** production-readiness claim and names
  **no** users; its credibility rests on observed usage, not self-declaration.
- **Design consequence available today at zero cost:** keep learning logic in plain TypeScript
  modules rather than inside React components, so logic survives a UI platform change. This is the
  only part of the mobile question that constrains present work.

The trade-off to carry into the eventual gate: the **proven** pattern is expensive (an additional
native UI codebase per platform); the **cheap** patterns are unproven.

## Corrections to the record

- **`idb` 8.0.3 is now installed** in `web/package.json` `dependencies` (observed 2026-07-23). The
  "Storage and hosted services" section above says the application dependency is not installed yet;
  that sentence is stale. The **conditional** part of the admission is unchanged and still
  outstanding: the first slice that ships a real consumer must measure the production bundle delta,
  and a material unacceptable delta reverses the choice to native IndexedDB.
- **Bun is written in Rust, not Zig**, as of Bun's own "Rewriting Bun in Rust" post (2026-07-08),
  corroborated by the README on `main`. Recorded only to keep the record accurate — Bun is not
  admitted, is not a candidate for any active task, and this changes nothing. Relevant only if the
  future backend trigger fires, where Bun is one of several listed candidates.
- **The Rust rewrite of SQLite is "Turso Database"** (formerly codenamed Limbo). Its own README
  (v0.7.1, 2026-07-22) claims named production deployments while declining a 1.0 and advising
  independent backups; older secondary sources still say "not production ready." Not a candidate for
  any active task.

## Revising a current result

The current roster may change whenever an active task passes the gate. A later mobile runtime,
database, managed provider, or server boundary is therefore possible without treating today's stack
as permanent—but none becomes a decision merely by appearing in research or an import archive.
