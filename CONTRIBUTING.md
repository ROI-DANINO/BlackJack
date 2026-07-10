# Contributing to Blackjack

Thanks for helping improve a blackjack training product. The simulator must model real shoe
blackjack faithfully: cards come from an ordered shoe, retain traceable origins, and flow through
the Rust engine rather than being invented in display code.

## Prerequisites

- Rust, including the `wasm32-unknown-unknown` target:

  ```bash
  rustup target add wasm32-unknown-unknown
  ```

- `wasm-bindgen-cli` compatible with the version in `Cargo.lock`. `npm run build:wasm` checks for
  the required version (`0.2.126`) and installs it if necessary.
- Node 20 or newer and npm.

## Set up and run locally

From the repository root, verify the native simulator:

```bash
cargo test -p blackjack-core
```

Then build and run the browser app from `web/`:

```bash
cd web
npm install
npm run build:wasm
npm run dev
```

The generated files in `web/src/bridge/wasm/` are ignored on purpose. They are the browser build
of the Rust core. `npm run dev`, `npm test`, and `npm run build` check that artifact first and fail
if it is missing or stale. If they do, run this from `web/` and retry:

```bash
npm run build:wasm
```

## Verify a change

Run core checks from the repository root:

```bash
cargo test -p blackjack-core
cargo fmt --check
cargo clippy -p blackjack-core -- -D warnings
```

Run web checks from `web/`:

```bash
npm test
npm run build
npm run qa
```

`npm run qa` runs the browser QA suite. Before closing a feature, read the
[QA playtest process](docs/specs/qa-playtest-process.md), scope the run using
`journal/qa/ledger.md`, and record the resulting feature-QA run and findings under `journal/qa/`.

## Respect the boundaries

Rust owns blackjack behavior: cards, deterministic shoes, rulesets, legal actions, round flow,
settlement, logs, and the Basic Strategy oracle. TypeScript and React render engine state and send
commands; they do not recreate blackjack rules. The browser reaches the core through a narrow WASM
JSON boundary.

Read [docs/architecture.md](docs/architecture.md) before changing that boundary. The fuller
language/runtime rationale is in [docs/specs/stack-boundaries.md](docs/specs/stack-boundaries.md).

Keep product documentation aligned with [journal/docs-map.md](journal/docs-map.md): the documents
listed there are authoritative for their subjects. Avoid adding future-phase task detail to
`journal/ops/tasks.md`; that file is only for the current phase.
