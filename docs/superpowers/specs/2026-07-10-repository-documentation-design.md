# Repository Documentation Design

> Status: approved for specification review (2026-07-10).

## Goal

Make the repository understandable and runnable for both prospective players and contributors
without duplicating the product, rules, design, or QA records that already exist.

## Scope

Create three maintained entry points:

1. `README.md` is the public landing page. It explains that Blackjack is a training product,
   describes the current browser-playable Free Play foundation and locked ruleset, provides a
   short local quick start, and links to the authoritative product, roadmap, QA, and contributor
   documents.
2. `CONTRIBUTING.md` is the developer workflow. It records prerequisites, the install/build/run/
   test commands, the generated-WASM freshness rule, the Rust/UI ownership boundary, and the
   feature-QA expectation.
3. `docs/architecture.md` is a concise technical map. It describes the React UI, TypeScript
   application layer, Rust simulator core, WASM transport, data/history boundary, and the
   invariant that all card flow originates from an ordered shoe.

## Audience and information flow

| Reader | First document | Next destination |
| --- | --- | --- |
| Player or evaluator | `README.md` | Local Free Play, roadmap, product vision |
| New contributor | `README.md` then `CONTRIBUTING.md` | Local development and tests |
| Engine or UI contributor | `CONTRIBUTING.md` then `docs/architecture.md` | Relevant detailed specs and QA process |

The three entry points summarize only stable, current facts. Their links lead to the existing
authoritative records named in `journal/docs-map.md`; they do not reproduce strategy tables,
historical plans, or QA-run reports.

## Developer workflow requirements

The contributor guide must make the browser build sequence explicit:

1. Install the web dependencies in `web/`.
2. Run `npm run build:wasm` there to compile `blackjack-core` for `wasm32-unknown-unknown` and
   generate the ignored bridge artifact.
3. Run `npm run dev`, `npm test`, or `npm run build` from `web/`.

Those commands already reject a missing or stale artifact. The guide must explain that this is a
correctness guard, not an incidental setup problem: browser play must run the same up-to-date Rust
core as native tests. Rust verification remains `cargo test -p blackjack-core`; the full browser
QA entry point remains `npm run qa` from `web/`.

## Architecture content

The architecture page will document these boundaries:

- Rust owns rules, cards, deterministic shoes, round flow, settlement, logs, and the Basic
  Strategy oracle.
- TypeScript/React owns display and interaction state; it does not derive blackjack rules.
- The WASM bridge passes JSON-shaped commands and state between them.
- Python remains available for research and data work, not app runtime behavior.
- V1 state is in memory; exported history is local JSONL rather than a product database.

It will name the ordered-shoe and traceable-card-origin requirements as product invariants.

## Out of scope

- A documentation website or generated API reference.
- A code of conduct or security policy.
- Rewriting existing product, roadmap, rules, QA, research, or design documents.
- Documentation for future V2 drills beyond linking to the roadmap.

## Validation

- Verify all Markdown links resolve to tracked repository files.
- Execute the documented core and web verification commands when the required local tooling and
  generated WASM artifact are available.
- Read the final pages from the perspective of a first-time player and a first-time contributor;
  commands must state their working directory and the product boundary must remain clear.
