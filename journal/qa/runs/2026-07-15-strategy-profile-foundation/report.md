# Strategy Profile Foundation — Feature QA

- **Verdict:** PASS
- **Code evaluated:** `84953ed` (`feat(learn): gate profile-declared lessons by ruleset`)
- **Scope baseline:** `8952828`
- **Finding status:** no new findings; existing backlog is unchanged.

## Scope

`git diff --name-status 8952828..84953ed` changed `crates/blackjack-core/`,
`web/src/bridge/`, `web/src/learn/`, and QA-report plumbing. It did not change
`web/src/app/`.

- **Deep:** engine rules/math, bridge/wire, and Blackjack Basics learning.
- **Smoke:** payout, round/state flow, and robustness, whose feature behavior did not change.
- **PX:** skipped: the `web/src/app/` trigger was not met. The prior PX coverage remains at
  `8952828`.

## Deterministic gates

| Command | Result |
|---|---|
| `cargo fmt --all -- --check` | PASS |
| `cargo clippy -p blackjack-core -- -D warnings` | PASS |
| `cargo test -p blackjack-core` | PASS — 92 tests |
| `npm --prefix web run test` | PASS — 22 files, 215 tests |
| `npm --prefix web run qa` | PASS — rules, flow, breakit, learn |

The web test preflight and every QA role ran `scripts/check-wasm-fresh.sh`. All passed with
the current WASM artifact, so no `build:wasm` recovery was necessary.

## Browser-pack evidence

- Rules: 90 independently re-derived rounds, 514 assertions, all 12 required situations at
  least twice, 0 violations. See `../2026-07-15-rules/report.md`.
- Flow: 273 snapshots, 1,166 assertions, 29 split-turn snapshots, one reshuffle, 0 violations.
  See `../2026-07-15-flow/report.md`.
- Breakit: all 12 realistic/injected attacks passed with 0 failed invariants; the production
  build omitted the dev hook. See `../2026-07-15-breakit/report.md`.
- Learn: all 9 Blackjack Basics units completed; six arranged and one live checkpoint hand;
  28 assertions and 0 violations. See `../2026-07-15-learn/report.md`.

## Profile-gate lifecycle

Focused real-WASM evidence was re-run with:

```sh
npm --prefix web run test -- learn/controller.test.ts
```

It passed 27/27 tests. `web/src/learn/controller.test.ts` initializes the real WASM module in
`beforeAll` and routes `RewritingWasmTransport` calls through `WasmTransport`.

- `starts a matching H17 declaration before rendering step zero and keeps H17 for an arranged hand`:
  compatible result reaches a renderable step.
- `refuses an S17 declaration against an explicit H17 probe before any step or action can render`:
  `profile_mismatch` is fatal before render.
- `refuses an altered known-id ruleset before any step or action can render`:
  `unsupported_ruleset` is fatal before render.
- `keeps profile-less Blackjack Basics on its null-ruleset path and playable`:
  the ordinary curriculum still starts with `ruleset: null` and has a usable or resolved hand.

## Conclusion

The profile foundation preserves Rust as the compatibility authority, carries its validated
verdict through the bridge, gates declared lessons safely before rendering, and leaves the
profile-less Blackjack Basics path playable. Feature QA is PASS; no `QA-NNN` was created.
