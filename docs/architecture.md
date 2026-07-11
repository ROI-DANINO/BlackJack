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

## Further reading

- [Stack boundaries](specs/stack-boundaries.md) explains why Rust, TypeScript, and Python have
  distinct roles.
- [Product vision](specs/product-vision.md) defines the training goal and the required realism.
- [QA playtest process](specs/qa-playtest-process.md) defines feature and milestone quality gates.
