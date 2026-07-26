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

The Learn path now includes nine Blackjack Foundations units driven by the real engine. Basic
Strategy is engine-owned through verified H17 and S17 profiles, and lessons are rejected when their
declared profile does not match the active ruleset. Those nine units are treated as a prototype
placeholder, not a constraint on what comes next.

The current phase is **design, not build**: phase 4 decides the curriculum, skill graph, activity
taxonomy, evidence and mastery rules, session shape, and motivation economy. Graded Decision
Practice — a free-decision activity graded against the verified oracle and wired to a durable
learner record — is the designed candidate for the phase-5 build, pending confirmation against the
finished blueprint. Strategy Table Fundamentals was approved and then intentionally paused.

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
- [Stack boundaries](docs/specs/stack-boundaries.md) — how tools/runtimes are admitted and which
  boundaries are active today.
- [QA playtest process](docs/specs/qa-playtest-process.md) — how feature and milestone quality is
  checked.

## Project status

Delivery phases 1–3 are complete: the simulation foundation, the learning-mechanics prototype
(Blackjack Foundations plus the verified strategy profiles and the durable-progress port), and the
research foundation. **Phase 4 — the learning design blueprint — is active, and it builds nothing.**
Its eight open deliverables are on the board (`journal/ops/tasks.md`, milestone `LDB`). See the
[roadmap](ROADMAP.md) for layers and phases.
