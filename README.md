# Blackjack

An approachable blackjack training game built on an accurate shoe simulator.

This is a training product—not gambling software. It aims to make realistic blackjack practice
friendly and game-like while keeping the card flow, rules, and future learning tools honest.

## What works today

Free Play is playable in the browser. It supports one player against the dealer through complete
rounds, including legal hit, stand, double, and split actions; per-hand results; bankroll
settlement; and local round-history export.

The simulator deals from a seeded, ordered shoe rather than generating cards one at a time. Cards
retain stable identities and deck origins, the shoe respects cut-card penetration, and Free Play
automatically starts a fresh shoe when needed.

Basic Strategy is also available to the engine as a ruleset-matched oracle. The next product step
is turning that accurate advice into a small guided learning drill.

## Quick start

You need Rust with the `wasm32-unknown-unknown` target, a compatible `wasm-bindgen` CLI, Node 20+
and npm. From the repository root:

```bash
cd web
npm install
npm run build:wasm
npm run dev
```

`npm run build:wasm` creates the local WASM bridge artifact that powers browser play. The web
commands will tell you to rerun it if that artifact is missing or older than the Rust core.

For tests, contribution workflow, and full prerequisites, read [CONTRIBUTING.md](CONTRIBUTING.md).

## Current rules

Free Play uses a modern-classic ruleset: six decks, dealer hits soft 17 (H17), doubling after
splits (DAS), no surrender, dealer peek, 3:2 natural-blackjack payout, and 75% default
penetration. Basic Strategy recommendations are specific to this ruleset.

## Documentation

- [Contributing guide](CONTRIBUTING.md) — setup, verification, and QA expectations.
- [Architecture](docs/architecture.md) — Rust, WASM, and TypeScript ownership boundaries.
- [Product vision](docs/specs/product-vision.md) — the training product’s north star.
- [Roadmap](ROADMAP.md) — completed work, active phase, and future milestones.
- [Stack boundaries](docs/specs/stack-boundaries.md) — why the core and UI use different tools.
- [QA playtest process](docs/specs/qa-playtest-process.md) — how feature and milestone quality is
  checked.

## Project status

V1 Simulation Foundations is complete and QA-passed. V2 Learning Foundations is active, beginning
with one small, immediate-feedback guided drill powered by the Basic Strategy oracle. See the
[roadmap](ROADMAP.md) for the current scope.
