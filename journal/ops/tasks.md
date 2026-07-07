# Tasks — Current Phase Only

> Only the current phase gets detailed tasks. Future work lives in ROADMAP.md.
> codex-end archives this file to ops/archive/ before mutating it.

## Active — sub-phase: TS UI bridge over the core
- [ ] Design the TypeScript UI bridge over the JSON/WASM-ready core boundary (`CoreCommand`/`CoreResponse`).
- [ ] Decide the core delivery path to the browser: native JSON CLI vs WASM build of `blackjack-core`.
- [ ] Enrich `RoundLog` with full ruleset config (`decks`, `penetration_percent`, `blackjack_payout`, `dealer_soft_17`) — deferred Water craft-gate finding; do before custom rulesets reach the UI.

## Done — Free Play simulator core (Rust)
- [x] Verify a credible V1 default ruleset (decks, H17/S17, payout, DAS, split/resplit, surrender, insurance, penetration).
- [x] Lock the ruleset in `docs/specs/v1-simulation-foundations.md`.
- [x] Draft the implementation plan; run the stack-boundary spike; land the Rust worker plan.
- [x] Implement the Free Play simulator core (Tasks 1–6): rules, shoe, scoring, session/split, JSON boundary + CLI.
- [x] Remediate the final whole-branch review: dealer-terminal draw, shoe-reshuffle recovery, custom-ruleset validation.
- [x] Extract blackjack into its own standalone git repo.

## Ideas
- Original draft notes are indexed under `docs/imports/initial-product-notes/`.

## Questions
- How should the BlackjackInfo chart be encoded into the first machine-readable Basic Strategy table?
