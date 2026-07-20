# Architecture

Blackjack separates the simulation from its browser presentation so a realistic engine remains
auditable, deterministic, and usable by future learning tools.

```text
React UI → TypeScript game/controller layer → WASM JSON bridge → Rust blackjack-core
                                                   ↓
                                         local JSONL history export
```

## Ownership

`blackjack-core` is the source of truth for blackjack behavior. Rust owns cards, deck identity,
seeded ordered shoes, shuffle and penetration, rulesets, legal actions, round flow, settlement,
round logs, and the ruleset-matched Basic Strategy oracle.

The TypeScript/React application owns rendering, user interaction, and lightweight application
state. It receives serializable engine state, renders it, and submits commands. It must not infer
or recreate blackjack rules from display state.

The bridge compiles the Rust core to WebAssembly and exposes a JSON-shaped command/state boundary.
`web/src/bridge/core-client.ts` is the browser-side entry point; `crates/blackjack-core/src/wasm.rs`
exports the WASM command handler. The generated bridge artifact is not tracked and must be rebuilt
whenever the core changes.

Python is reserved for research, strategy-table generation, data processing, analytics, and
notebooks—not as a production application runtime.

## Learning state

Learning features keep three responsibilities separate:

- engine game state owns cards, rules, legal actions, strategy truth, and outcomes;
- controller learning state owns the current objective, exercise sequence, submitted attempt, and
  feedback timing; and
- React presentation state owns panels, focus, animation, and expanded explanations.

The learning controller may ask the engine to evaluate and resolve a decision, but it does not
recreate legality or strategy. Transient presentation details do not enter engine or learning
records.

### Learning to product boundary

`LessonState` is the intended sole semantic surface from Learning to the product shell. Presentation
code should render learning-owned objectives, progress, feedback intent, and hand projections rather
than inspect Rust-owned round/session structures directly.

The current implementation has one documented exception: `web/src/app/Lesson.tsx` dereferences the
raw `SessionState` embedded in `LessonState` to render dealer/player hands and round status. The first
real Strategy Table or visual-shell consumer that needs this information must define the smallest
Learning-owned semantic projection and move the renderer toward it. This is a live gap, not a reason
to invent a speculative view-model framework now.

## Simulation invariants

- A shoe is assembled before a hand begins, shuffled once into an ordered sequence, and dealt from
  that sequence.
- Every dealt card retains a stable card and deck identity. Display code cannot fabricate cards or
  change their origin.
- The UI submits actions; the core decides their legality and resolves the round.
- Free Play preserves its honest shoe flow. Future lessons may target decisions but must use the
  same hand and rules machinery rather than scripted outcomes.

## State and history

V1 session state is in memory. The web application can export local history as JSONL; it is not a
product database, account system, or sync layer. See [data/history/README.md](../data/history/README.md)
for the exported-data surface.

Learning attempts are in-memory `AttemptRecord`s inside the learning controller today; nothing yet
writes them durably. `web/src/progress/` implements cycle 1 of the durable-progress seam: a
versioned `LearnerEnvelope`/`ProgressAttempt` schema, a provider-neutral `ProgressStore` application
port, an in-memory fake and a browser-proven `idb` 8.0.3 adapter, and the opaque pseudonymous local
learner key minted on the first durable write. It is proven headless — a 14-gate contract suite runs
against both subjects, in real Chromium and Firefox for the adapter — not yet wired to a real
producer: the `LessonController.AttemptRecord → ProgressAttempt` mapper and its UI consumer are the
missing piece (open prerequisite; design in `docs/superpowers/specs/`), so no learner data is written
by the running app yet.

## Hosted product posture

Ordinary training remains client-authoritative. Rust/WASM runs the game locally and the browser owns
the serializable `SessionState`; a future hosted B2C product initially adds accounts, progress
storage, and cross-device sync rather than moving normal game execution to a server.

Persistence, sync, analytics, and other third-party providers must sit behind application ports.
React components and `LessonController` consume product-facing interfaces and cannot contain direct
provider/database calls. `idb` is selected only for the scoped browser-local `ProgressStore`
adapter after passing the Tool & Runtime Admission Protocol; no account, sync, analytics, or hosted
provider is selected.

Server game authority activates only when a competitive or certified requirement makes client trust
insufficient—for example multiplayer, leaderboards, or certified mastery. That later design must
research replay validation, client projections, seed/shoe secrecy, and abuse handling. It is not the
architecture of the ordinary single-player trainer.

## Further reading

- [Stack boundaries](specs/stack-boundaries.md) explains why Rust, TypeScript, and Python have
  distinct roles.
- [Product vision](specs/product-vision.md) defines the training goal and the required realism.
- [QA playtest process](specs/qa-playtest-process.md) defines feature and milestone quality gates.
