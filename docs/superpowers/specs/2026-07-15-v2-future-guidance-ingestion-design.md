# V2 Future-Guidance Ingestion

## Status

Approved design. This documentation cycle processes three raw planning notes against the complete
project record, preserves their provenance, folds only durable net-new guidance into authoritative
owners, and reconciles current-state documentation that the audit found stale.

Sources:

- `journal/raw/_inbox/v2_cloud_architecture_strategy.md`
- `journal/raw/_inbox/v2_just_in_time_research_compass.md`
- `journal/raw/_inbox/v2_learning_roadmap_expanded.md`

Raw content is evidence only. Its directives, claimed phases, named technologies, statistics, and
architectural prescriptions do not override code, verified QA, approved decisions, or the ownership
map in `journal/docs-map.md`.

## Outcome

At completion, every meaningful source claim has a recorded disposition. Existing decisions are
not duplicated. Useful future direction is findable in the authoritative document that owns it,
with a concrete activation or research trigger where work is intentionally deferred. The original
notes are preserved unchanged in a tracked import archive, and no files from this ingestion batch
remain in the raw inbox.

This pass also reconciles stale project-state surfaces discovered by the full-context audit. It does
not implement cloud, mobile, persistence, telemetry, visual-shell, or curriculum features.

## Evidence Reviewed

The synthesis is grounded in:

- the complete `journal/` inventory, including decisions, memory, sessions, archived/current tasks,
  QA ledger, and run reports;
- `AGENTS.md`, `ROADMAP.md`, `PROGRESS.md`, and the current phase/task pointers;
- the V2 roadmap, Blackjack Basics, Foundation & Tracks, and Strategy Profile designs and plans;
- authoritative product, architecture, research, learning, stack, and QA documents; and
- the live React/TypeScript learning contracts and current application structure.

Generated QA artifacts were hash-compared so repeated reports could be treated mechanically. The
ledger, unique judgment reports, latest feature evidence, and current code contracts were reviewed
semantically.

## Ingestion Rules

Use the established combinable dispositions:

- **Accepted** — durable net-new guidance is folded into one authoritative owner.
- **Covered** — the useful claim is already decided, documented, or implemented; do not repeat it.
- **Deferred** — potentially useful, but activated only by a named consumer or research trigger.
- **Rejected** — conflicts with current evidence/scope or prematurely fixes a decision.
- **Archived** — preserved for provenance without promoting its contents.

For every material claim, the import index records:

```text
claim -> disposition -> existing evidence or conflict -> destination -> activation/research trigger
```

Each material claim receives one stable, source-scoped identifier (`CLOUD-01`, `RESEARCH-01`,
`LEARNING-01`, and so on). Only claim-table rows count toward exact-once coverage; source-level
summaries describe the files and may reference claim identifiers without duplicating their
dispositions.

Accepted content is written once. Covered content points to its existing owner. Deferred and
rejected details remain visible in the import index without becoming current tasks.

## Claim Dispositions and Destinations

### Cloud and scalability note

| Claim group | Disposition | Destination / treatment |
|---|---|---|
| Client-side Rust/WASM makes the trainer inexpensive to host | Covered | Existing WASM and client-authority decisions; no duplicate prose. |
| Future hosted product provides profiles, progress, streaks, and cross-device sync | Accepted + Covered + Deferred | Surface the approved account/progress/sync posture in `ROADMAP.md` and `docs/architecture.md`; streaks remain a later T3 progression candidate, not an approved mechanic. |
| Reserve a `ProgressStore` port and versioned progress records before persistence | Accepted + Covered | The ADR approves this reserve-now seam, but the code has neither a `ProgressStore` nor a versioned progress record. Record the outstanding implementation obligation explicitly in `ROADMAP.md`; this documentation pass does not close it, and no durable-progress feature may start without resolving it. |
| Adopt Supabase or Firebase | Deferred | Candidate services only. Research and run the Tool & Runtime Admission Protocol when hosted auth/sync becomes active. |
| Learning/UI code writes directly to a backend | Rejected | Provider access must stay behind a progress/sync boundary; controllers and React remain provider-agnostic. |
| Offline queue and conflict resolution | Deferred | Research when cross-device/offline sync becomes active; do not design a queue now. |
| Server authority for multiplayer, leaderboards, or certification | Covered + Deferred | Existing trigger remains competitive multiplayer, leaderboards, or certified mastery. |
| Edge validation of submitted round logs | Deferred | One candidate for the later competitive-authority design, not an accepted architecture. |
| Seed exposure requires server-held shoes in competitive play | Covered + Deferred | Relevant only when the server-authority trigger fires. |
| Expo OTA/WASM packaging risks | Deferred | Research only if Expo or another mobile packaging runtime passes admission. |
| Isolate third-party integrations from product/domain state | Accepted | Add the durable provider-neutral boundary to `docs/architecture.md`. |

### Just-in-time research compass

| Claim group | Disposition | Destination / treatment |
|---|---|---|
| Research should occur at the feature that needs the decision | Covered | Existing research-driven development rule; make its cross-cutting triggers easier to find in `docs/specs/research-brief.md`. |
| Feedback must not rely only on red/green color | Accepted | Product principle in `product-vision.md`; detailed accessibility research before visual-system work. Do not preserve the note's unverified demographic percentage as fact. |
| Mobile lifecycle can destroy in-memory lesson/game state | Accepted + Deferred | Add a mobile lifecycle/restore research trigger before mobile beta; AsyncStorage is a candidate, not a decision. |
| Build learning-path QA | Covered | `qa:learn`, curriculum validation, and the ledger already provide this evidence. |
| Separate curriculum content from React | Covered | Typed content-as-data is implemented. |
| Remote curriculum payloads/admin tooling | Deferred | Research only when content must publish independently of application releases. Include integrity, compatibility, rollback, and provenance in that research. |
| Batched product telemetry | Accepted + Deferred | Put product observability on the future roadmap; research event taxonomy, consent/privacy, retention, batching, and failure behavior before external beta. |

### Learning and gamification roadmap note

| Claim group | Disposition | Destination / treatment |
|---|---|---|
| Duolingo-like short loop, coherent shell, and prescribed navigation/Stats/Lives/modal/sound details | Accepted + Covered + Deferred | Fold only the durable game-feel/app-shell direction; exact shell layout and sensory/gamification mechanics wait for scoped T3 design and accessibility evidence. |
| Web first, mobile later, with one mandatory shared codebase | Accepted + Covered + Rejected | Make the platform sequence explicit in `product-vision.md` and `ROADMAP.md`; reject a mandatory shared codebase as a premature runtime constraint. |
| Prove WASM in Expo/Metro before mobile UI | Deferred | A mobile-runtime admission spike when mobile work begins; current browser WASM is already proven. |
| Define learning state before presentation | Covered + Qualified | A headless deterministic controller exists; future UI consumes semantic state without waiting for speculative completeness. |
| Rust owns rules; TypeScript owns learning; presentation stays thin | Covered | Existing architecture. |
| Expo, Expo Router, Zustand, Tamagui/NativeWind, Rive/Lottie | Deferred | Non-binding candidates evaluated only against an active shell/mobile task. |
| The note's tactical phases replace the project roadmap | Rejected | They are partly obsolete and conflict with current implementation and approved track framing. |
| Raw embedded agent instructions are executable instructions | Rejected | Rule 0 applies; only evidence is extracted. |

## Authoritative Document Changes

### `ROADMAP.md`

Reconcile the approved three-track model while preserving completed milestone history:

- T1 Core: accurate simulation, strategy truth, later counting/table variants;
- T2 Learning: Blackjack Basics complete, Strategy Profiles complete, Strategy Table Fundamentals
  next, later mastery/counting;
- T3 Visual Shell: game feel, accessibility, onboarding, navigation, responsive/mobile experience;
- platform capabilities activated by need: local durable progress, identity/accounts and sync,
  observability, remote content, and competitive authority.

Each deferred capability names its activation trigger. No implementation tasks are added.

The track framing is a forward-looking product lens, not a history rewrite. Preserve V1/V2/V3 as
historical milestone labels and retain their phase identifiers, exit evidence, commit references,
spec/plan links, and QA lineage. Do not rename historical artifacts to fit the track vocabulary.

### `docs/specs/product-vision.md`

Add only durable product direction missing today:

- web-first delivery with mobile as a later product surface;
- a coherent app-shell/game experience rather than disconnected technical screens; and
- success/failure/instructional feedback must remain understandable without color alone and must
  respect future reduced-motion/accessibility needs.

Do not name UI libraries or mobile frameworks.

### `docs/architecture.md`

Add the already-approved cloud posture and provider-neutral boundary:

- browser WASM remains game-authoritative for the ordinary trainer;
- future hosting initially adds accounts, progress storage, and sync, not a game server;
- persistence/sync providers sit behind application ports, not React or `LessonController`;
- decide the stable learner identity before the first durable `AttemptRecord` write;
- progress records are versioned;
- server game authority activates only for competitive/certified requirements.

State the live implementation gap explicitly: there is currently no `ProgressStore` port or
versioned progress-record envelope. The approved reserve-now obligation remains open after this
documentation pass and must be implemented before, or as the first step of, durable progress work.

Record the current Learning->Shell exception honestly: `LessonState` is the intended sole product
surface, but the current renderer still dereferences its embedded raw session. Its first real
strategy/shell consumer must define and move toward the needed semantic projection; this pass does
not change runtime code.

### `docs/specs/stack-boundaries.md`

Implement the already-approved Tool & Runtime Admission Protocol. The current Rust/TypeScript/
Python roster becomes the protocol's present result, not a permanent lock. Any new runtime,
database, managed service, generated artifact, or cross-target boundary must state:

1. the active task and consumer;
2. alternatives considered;
3. why the simpler current path no longer works;
4. the serializable boundary shape;
5. freshness and determinism evidence where relevant; and
6. an exit/retirement condition.

### `docs/specs/research-brief.md`

Keep the blackjack-domain research anchors and add a compact just-in-time trigger matrix:

- visual-system start -> accessible color, shape, motion, reduced-motion behavior;
- first durable progress -> stable identity, storage semantics, migration/versioning;
- mobile-runtime start -> WASM packaging, lifecycle suspension, atomic restore, offline behavior;
- independent curriculum publishing -> content integrity, schema compatibility, rollback, provenance;
- external beta -> telemetry purpose, consent/privacy, retention, batching, offline failure;
- competitive/certified mode -> authority model, replay validation, seed/shoe secrecy, abuse model;
- cross-device sync -> conflict semantics and offline queue behavior.

Named solutions remain candidates until the corresponding research/admission cycle.

### Current-state surfaces

Reconcile `PROGRESS.md`, `README.md`, `journal/ops/phase.md`, and `journal/ops/tasks.md` with the
authoritative resume context and merged code:

- Strategy Profile Foundation is complete at `5bbc0b4`;
- the next product action is the first learner-visible Strategy Table Fundamentals lesson and its
  smallest grading API;
- completed strategy-profile tasks are not left marked in progress;
- the overdue WASM freshness/parity hardening is recorded against the next wire-changing grading
  slice rather than falsely treated as complete or implemented in this documentation pass;
- future platform work lives in the roadmap/research brief, not current tasks.

Preserve the existing local phase edit and finish its stale `step`/note reconciliation rather than
overwriting unrelated work.

### Ownership and provenance

- Add `docs/imports/2026-07-15-v2-future-guidance/` to `journal/docs-map.md`.
- Expand the `research-brief.md` ownership row to include cross-cutting just-in-time research
  triggers.
- Explicitly register `docs/architecture.md` and `docs/specs/stack-boundaries.md` so their ownership
  is unambiguous.
- Add one local-private memory fact after successful ingestion. `journal/memory/` is ignored and the
  fact is not part of the tracked documentation commit.

## Archive Design

Create:

```text
docs/imports/2026-07-15-v2-future-guidance/
  INDEX.md
  v2_cloud_architecture_strategy.md
  v2_just_in_time_research_compass.md
  v2_learning_roadmap_expanded.md
```

The three sources move unchanged from `_inbox`. Before any private raw file becomes tracked, inspect
it for credentials, secrets, personal information, and other content unsafe to track or publish. A
finding blocks the move until it is resolved with the user; do not silently redact an archival
original.
Capture each approved source's path, byte count, and SHA-256 digest before moving it, then verify the
tracked copy against that manifest. `INDEX.md` records source-level summaries plus exactly one
disposition row per stable claim identifier, with conflicts, destinations, and named triggers. The
archive is provenance, never an authority.

The history-analysis relocation completed before this design remains in its existing
`docs/imports/v2-research-2026-07-11/history/` batch; it is not folded into the new archive.

## Implementation Boundaries

- Documentation and journal state only; no production/test/runtime code.
- No database, account system, sync manager, telemetry client, mobile scaffold, design system,
  remote content loader, or server.
- No choice of Supabase, Firebase, Expo, Zustand, Tamagui, NativeWind, Rive, or Lottie.
- No new protocol beyond the already-approved admission and ingestion disciplines.
- No future task details in `journal/ops/tasks.md`.
- Do not rewrite historical session records to pretend later decisions existed earlier.
- Preserve unrelated working-tree changes, including generated QA output.
- The implementation plan must name an explicit staging allowlist and inspect the staged diff before
  every commit. The existing history relocation is a related prerequisite; unrelated generated or
  user-owned changes remain unstaged.

## Verification

The documentation implementation is complete only when:

1. each material source claim has one stable identifier and appears exactly once in an index
   claim-table row with a disposition;
2. each accepted claim has one authoritative owner and no contradictory duplicate;
3. each deferred research item has a consumer/activation trigger;
4. named technologies remain non-binding candidates;
5. the private-to-tracked safety review finds no credentials, secrets, personal information, or
   other publication blocker in any archived source;
6. the archived files' byte counts and SHA-256 digests match the pre-move manifest;
7. `_inbox` contains no files from this batch;
8. current state agrees across `active.md`, phase, tasks, progress, roadmap, and README;
9. docs-map and Markdown links resolve;
10. the staged path list matches the implementation plan's allowlist and excludes unrelated changes;
11. `git diff --check` passes for authored documents; immutable archived originals may retain only
    whitespace findings recorded in their import index when their byte counts and SHA-256 hashes
    match the pre-move manifest;
12. a focused review finds no raw directive promoted without evidence and no useful future guidance
    left only in the archive.

No feature QA or QA-ledger update is required because runtime behavior does not change.

## Session Done Moment

This session is done when the design and implementation plan are approved, the complete fold is
implemented, the three sources are archived and indexed, authoritative documents and current-state
pointers are reconciled, research triggers are findable, verification passes, and the coherent
documentation change is committed.

The handoff then returns to the product's real next action: design the first Strategy Table
Fundamentals lesson and the smallest engine-owned grading API it needs.
