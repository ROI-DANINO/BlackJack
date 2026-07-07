# Stack Boundaries

> Status: decided by V1 stack spike. Scope: language/runtime boundaries before simulator code.

## Position

Blackjack training is simulation-heavy. Do not let the first UI implementation accidentally
make the whole project TypeScript forever.

Use a polyglot-by-task stack:

- TypeScript for browser UI, interaction state, and thin app orchestration.
- Python for research, strategy-table generation, data processing, analytics, notebooks, and audits.
- Rust/WASM as a first-class simulator-core candidate when correctness, speed, Monte Carlo
  volume, or deterministic portable execution matters.
- No database for V1 unless persistence becomes part of the active phase.

## V1 Stack Spike Result

Local toolchains are available for Node, Rust, and Python. No WASM helper is installed yet.

Decision:

- Rust owns the simulator core: cards, shoe, shuffle, ruleset, round flow, betting, settlement,
  and log generation.
- TypeScript owns the browser UI and calls the simulator through a narrow app boundary.
- Python owns research/data work: strategy-table generation, validation scripts, analytics, and
  notebooks. Python does not become the app runtime.
- V1 storage stays in memory. Persisted history waits until it is part of the active phase.
- WASM is the intended browser bridge, but the first Rust core can expose the same JSON-shaped
  command/state boundary through Rust tests or a CLI before WASM tooling is added.

Why:

- The simulator is the durable product core and will likely need high-volume deterministic runs.
- Starting the core in Rust avoids a later rewrite from a TypeScript engine once counting,
  Monte Carlo, EV, or casino-like training loads arrive.
- Keeping the boundary as plain serializable state/actions keeps the UI simple and lets Python
  consume logs without binding to Rust internals.

## Decision Rule

Choose the simplest stack that satisfies the active phase, but keep simulator state and logs as
plain serializable data so another language can consume or replace a layer later.

Add a new runtime, database, or service only when a written task explains:

- the job it performs;
- alternatives considered;
- why the current simpler path no longer holds;
- how data crosses the boundary.

## Boundary Shape

Core commands:

- `start_session(seed, ruleset, bankroll, default_bet) -> session_state`
- `start_round(session_state, bet) -> session_state`
- `legal_actions(session_state) -> action[]`
- `apply_action(session_state, action) -> session_state`

Shared data:

- `session_state`
- `round_state`
- `card { card_id, deck_id, rank, suit }`
- `ruleset`
- `action`
- `round_log`
- `outcome`
- `bankroll_delta`

The UI should never infer blackjack rules from display state. It renders state and submits
commands.
