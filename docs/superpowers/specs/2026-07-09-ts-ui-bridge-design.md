# TypeScript UI Bridge — Design Spec

> Status: design (approved 2026-07-09). Scope: the first browser-playable Free Play surface
> over the existing Rust simulator core. Follows the V1 spec
> `docs/specs/v1-simulation-foundations.md` and the round-history analysis
> `journal/raw/_inbox/history-data-analysis-2026-07-09.md`.

## Plain-language summary (read this first)

We already built the real blackjack "brain" in Rust — it knows the rules, shuffles the shoe,
deals cards, and decides who wins. This milestone puts a **webpage on top of that brain** so a
person can actually play a hand: cards get dealt, you click Hit / Stand / Double / Split, the
dealer plays, and money moves in and out of a bankroll.

Two things make this safe and simple:

1. **We do not rebuild the game.** We compile the exact same Rust brain to run *inside* the
   webpage (WebAssembly / "WASM"). No server, works offline, and it behaves identically to the
   tests we already trust because it is literally the same compiled code.
2. **The webpage is deliberately plain.** No animations, chips, or styling yet — just a
   readable table and buttons. Polish is a later milestone.

Every finished round is recorded to a downloadable history file (for later analysis in Python),
built with a "plug" so a real database can be added later without touching the game loop.

The rest of this document is the technical design.

---

## Goal

Ship a minimal, deliberately-unpolished **browser** Free Play experience: one human player vs.
dealer, complete rounds from a real seeded shoe, legal actions (hit/stand/double/split),
bankroll settlement, and per-round history logging — all driven by the existing
`blackjack-core` Rust engine, unchanged in its rules logic.

Non-goals (stay out of this milestone): animations, chip/bet visual UI, styled table, round
history browser, multi-seat, learning/counting features, CSM/ASM. These map to the V1 spec's
**Air** guardrail and the roadmap's later phases.

## Locked decisions

| Decision | Choice | Why |
|----------|--------|-----|
| Deliverable | Bridge layer **+** minimal playable browser UI | The task calls for a "thin Free Play UI"; a headless bridge alone isn't playable, full polish front-runs the **Fire** criterion. |
| Delivery path | **Client-side WASM** | The core is a pure, stateless `command → state` function and the client already owns state, so there is nothing for a server to hold. WASM re-hosts the identical compiled Rust; static-site deployable; determinism preserved for free. |
| UI tooling | **Vite + React** | Declarative rendering of session state; familiar; grows into the polished UI later. |
| Logging store (now) | In-memory + `.jsonl` download | Simplest crash-tolerant-enough path for a thin milestone; feeds the Python analysis layer. |
| Logging store (later) | IndexedDB, then possibly SQLite/DB | Explicit future need. Reached through a swappable `LogSink` seam so it drops in without touching the round loop. |

## Architecture

Strict downward-only dependencies. Each layer talks only to the one below it, in that layer's
own vocabulary.

```
┌─ React UI (web/src/app/)      renders SessionState; dispatches player intents
│      ▼ calls (domain terms: startSession, act('hit'), downloadLog)
├─ GameController (web/src/bridge/game.ts)   single owner of the live SessionState + round loop
│      ▼ calls                                        ▼ emits round lines to
├─ CoreClient  (web/src/bridge/core-client.ts)      LogSink (web/src/bridge/log/)
│    implements CoreTransport { call(json): json }
│      ▼ calls
├─ WASM module  (blackjack-core compiled, wasm-bindgen)
└─ Rust core    (crates/blackjack-core — rules logic UNCHANGED)
```

Invariants:

- **Dependencies point down only.** React never touches WASM or JSON; it calls the controller
  in domain terms and reads a typed, read-only `SessionState`. The controller never touches the
  DOM. The `CoreClient` knows nothing about sessions — it is a stateless JSON translator.
- **The controller is the single owner of the live `SessionState`.** React holds a read-only
  reference via `useSyncExternalStore`; it never mutates state.
- **Determinism is preserved.** WASM runs the identical compiled Rust; a seed reproduces
  byte-identical shoes in the browser and in `cargo test`.

## Repo layout

The Rust crate's **rules logic is untouched**; we add one feature-gated file and a `web/`
workspace.

```
crates/blackjack-core/
  Cargo.toml            # crate-type = ["cdylib", "rlib"]; wasm-bindgen + ts-rs OPTIONAL deps
  src/
    wasm.rs             # NEW, #[cfg(feature="wasm")]: #[wasm_bindgen] handle_command(&str)->String
    ...                 # everything else unchanged
web/
  package.json          # Vite + React + TypeScript
  vite.config.ts        # vite-plugin-wasm (+ top-level-await)
  .gitignore            # ignores src/bridge/wasm/ (generated)
  src/
    bridge/
      types.ts          # GENERATED from Rust (ts-rs) — boundary + state mirror
      core-client.ts    # WASM-backed CoreTransport; runtime boundary validation
      transport.ts      # CoreTransport interface (+ a Node/CLI transport for tests)
      game.ts           # GameController: session lifecycle + round loop + sink emission
      log/
        sink.ts         # LogSink interface (async)
        memory-sink.ts  # in-memory accumulation + .jsonl download
      wasm/             # wasm-pack output (GITIGNORED, built by `npm run build:wasm`)
    app/                # React components: Table, DealerHand, PlayerHand, Controls, Bankroll, FatalBanner
    main.tsx            # async WASM bootstrap gate, then mount React
tools/
  play_cli.py           # unchanged (still a valid CLI transport reference)
```

## The WASM boundary contract

### One envelope, everywhere

`handle_command` in `boundary.rs` returns `Result<CoreResponse, String>` — it does **not**
itself produce the `{status}` envelope. That envelope (`CliOutput`) currently lives only in
`main.rs`. To avoid a third, WASM-only JSON shape, `wasm.rs` **reuses the same `CliOutput`
serialization**:

```rust
// crates/blackjack-core/src/wasm.rs  (only compiled with --features wasm)
#[wasm_bindgen]
pub fn handle_command(input: &str) -> String {
    // 1. install console_error_panic_hook once (diagnostics)
    // 2. parse CoreCommand; on parse error -> {"status":"error","message": ...}
    // 3. call crate::handle_command(cmd)
    // 4. Ok(resp)  -> serialize {"status":"ok","response": <CoreResponse>}
    //    Err(msg)   -> {"status":"error","message": msg}
    // NEVER .expect() — serialize fallibly; on serialize failure return an error envelope.
}
```

Consequences:
- The CLI's existing golden outputs **are** the WASM contract — one representation end-to-end.
- Expected rule failures (e.g. illegal action) arrive as `{"status":"error"}` and are
  recoverable. A Rust **panic** traps the WASM instance — handled as a *fatal* condition by the
  client (see Error handling).

### Serde representation the TS mirror must match exactly

- `CoreCommand`: internally tagged — `{"command":"start_session", ...}`, variants `snake_case`.
- `CoreResponse`: adjacently tagged — `{"type":"session","data":<SessionState>}` /
  `{"type":"actions","data":[<Action>...]}`.
- All state structs serialize fields **verbatim `snake_case`** (`default_bet`, `card_id`,
  `deck_id`, `shoe_number`, `bankroll_before`, …). There is **no** `rename_all` on the structs.
  > Note: the V1 spec's illustrative `Card` uses `cardId`/`deckId` (camelCase). That is
  > documentation shorthand and is **wrong** for the wire format. The real fields are
  > `card_id`/`deck_id`. The TS mirror follows the Rust reality, not the spec's example.

### Anti-drift: generate the types, guard with golden fixtures

- **Generate `web/src/bridge/types.ts` from the Rust types** via `ts-rs`
  (`#[cfg_attr(feature="ts", derive(TS))]`, feature-gated so native builds are unaffected).
  This makes field-name / tag drift structurally impossible.
- **Golden-fixture contract test:** a Rust test serializes canonical values — a known
  `SessionState`, each `CoreResponse` variant, and each `CoreCommand` variant — to committed
  JSON fixtures. A TS test parses those fixtures against the generated types and fails CI on any
  mismatch. This also directly serves the history doc's "diff the bridge against the core" QA goal.
- **Runtime boundary validation:** `CoreClient` does one shape-check on every parsed response so
  a bad payload fails loud *at the boundary*, not deep inside a React component.

### CoreTransport seam

`CoreClient` implements a tiny interface so the controller is testable without a browser:

```ts
interface CoreTransport { call(commandJson: string): string }
```

- In the browser: WASM-backed (`WasmTransport`).
- In tests: a `CliTransport` that shells the native `blackjack-core` binary (stdin→stdout) —
  deterministic bridge tests, no browser, and a direct behavioral diff against the Rust core.

## Session-state lifecycle & round loop

`GameController` holds exactly one `SessionState` and is its sole mutator.

For each player intent it builds a `CoreCommand`, calls `transport.call`, and parses `CliOutput`:

- **`ok` + `Session`:**
  1. Compute `newState.logs.length - oldState.logs.length`.
  2. For **each** newly-appended `RoundLog`, emit a `round` line to the `LogSink`.
     *(This delta check — not "after ApplyAction" — is what captures naturals, which resolve
     synchronously inside `StartRound` with zero player actions.)*
  3. Swap the held state; notify React.
- **`ok` + `Actions`:** hand the legal-action list to the UI; **no** state swap.
- **`error`:** recoverable rules error; surface message to UI; state unchanged.
- **thrown exception** (WASM panic / parse failure): **fatal**; surface a reload-required state.

### Bounded payload

Full `SessionState` round-trips on every call, and it carries the 312-card shoe plus a `logs`
vector that grows each round. To keep hot-path calls (`LegalActions`, `ApplyAction`) bounded,
after draining any new `RoundLog`s to the sink the controller **strips `logs` from the state it
sends back into the next command**. The sink is the durable record; `SessionState.logs` is not
needed as an accumulator once each entry has been emitted.

### Default ruleset — single home

`StartSession.ruleset` is optional; omitting it uses the core's Rust default. The TS side models
`ruleset` as optional and **never** hard-codes a default ruleset object — the locked ruleset has
exactly one source of truth (Rust), matching the V1 spec YAML.

## Logging (LogSink)

The store is swappable behind an **async** interface — async *now*, before any DB exists, so the
later IndexedDB/DB swap changes zero call sites:

```ts
interface LogSink {
  write(line: LogLine): Promise<void>;   // one session_header or one round line
  flush(): Promise<void>;                // batching stores implement; MemorySink no-ops
  export(): Blob;                         // produce the .jsonl for download
}
```

- `MemorySink` (this milestone): appends to an in-memory array; `write`/`flush` resolve
  immediately; `export()` joins lines into a `.jsonl` Blob for a "Download history" action.
- **JSONL shape** (from history-analysis §3, §7): first line `type:"session_header"`
  (`schema_version`, `session_id`, `seed`, `ruleset`, `starting_bankroll`, `default_bet`,
  `started_at`, harness version); then one `type:"round"` line per resolved round carrying the
  `RoundLog` **verbatim** plus harness-added `session_id`, `round_index`, `ts`, `schema_version`.
- `session_id`, `round_index`, and timestamps are **harness-minted** — the core never gets a
  clock or identity (history-analysis §2a).
- **Keep the file lossless.** No running count, optimal-action, or totals baked in — those are
  derived later in Python (history-analysis §3). `schema_version` on every line from day one.
- Later: `IndexedDbSink` (append-per-round crash safety) is a drop-in implementing the same
  interface; SQLite/DB only when a real cross-session requirement lands, with the stack-change
  note the constitution requires.

## Error handling

Two distinct classes, surfaced differently:

- **Recoverable (rules error):** `{"status":"error","message":...}` from the core — e.g. illegal
  action, invalid bet. The UI shows the message; state is unchanged; play continues. The UI
  should mostly *prevent* these by only offering actions returned by `LegalActions`.
- **Fatal (thrown exception):** a WASM panic or a boundary parse/validation failure. The
  controller enters a fatal state; the UI shows a `FatalBanner` prompting reload. We do not try
  to limp along on a poisoned WASM instance.

Hardening: `console_error_panic_hook` for readable panic traces; no `.expect()` in `wasm.rs`;
every `CoreClient.call` wrapped in `try/catch`.

## WASM ↔ Vite build integration

- Build target `wasm-bindgen --target web`; Vite uses `vite-plugin-wasm`
  (+ `vite-plugin-top-level-await`).
- **Async bootstrap gate:** `main.tsx` `await init()` on the WASM module *before* mounting React.
  Exports are only safe to call after init resolves; a loading state covers the gap. Controller
  methods are synchronous *after* the gate.
- **Pin `wasm-bindgen-cli` to the exact `wasm-bindgen` crate version** — version skew is the
  classic silent breakage.
- Generated `web/src/bridge/wasm/` (`.wasm` + JS glue + `.d.ts`) is **gitignored**; CI/build runs
  `build:wasm` before `vite build`. Documented build order:
  `cargo build --features wasm → wasm-bindgen → vite build`.
  > wasm-bindgen's own `.d.ts` types only `handle_command(string): string`; it provides **no**
  > typing for the JSON payload. The generated `types.ts` (ts-rs) remains the payload contract.

## Testing

- **Rust:** existing 45 tests stay green; native build/tests unaffected by the `wasm`/`ts`
  features (optional deps, feature-gated modules).
- **Golden-fixture contract:** Rust emits canonical JSON fixtures; a TS test parses them against
  the generated `types.ts`. Fails on any wire-format drift.
- **Bridge (Node, no browser):** run `GameController` against `CliTransport`; play a scripted
  seeded round and assert the state transitions, legal-action gating, bankroll deltas, and — the
  headline check — that the bridge produces the **same** results as the Rust core for the same
  seed (determinism / no-rules-in-the-UI).
- **Logging:** assert `MemorySink` produces a valid session_header + one round line per resolved
  round, **including a naturals round** (zero player actions) to prove the logs-delta emission.
- **UI (light):** a smoke test that a seeded session renders the dealer upcard, the player hand,
  and only the legal action buttons. No heavy visual testing this milestone.

## Acceptance criteria

- A person can open the page and play complete rounds vs. the dealer from a seeded shoe: deal,
  hit/stand/double/split as legal, dealer plays, outcome settles bankroll, next round continues
  until the cut card forces a reshuffle.
- The UI contains **no blackjack rules** — every legal action and every outcome comes from the
  core via the bridge.
- The browser build runs fully client-side (no server) and is static-site deployable.
- Each resolved round (naturals included) is captured to a downloadable `.jsonl` matching the
  history-analysis shape; logging is behind the async `LogSink` seam.
- The TS boundary types are generated from Rust and guarded by a golden-fixture contract test.
- Recoverable rule errors are shown without breaking play; fatal errors surface a reload banner.
- Rust's existing tests remain green; native builds do not pull the `wasm`/`ts` dependencies.

## Open questions (non-blocking)

- **Framework-y state:** is `useSyncExternalStore` the right React binding, or a light store
  (Zustand)? Default to `useSyncExternalStore`; revisit only if the wiring gets noisy.
- **Bet UI:** this milestone can start each round at the session `default_bet` with no bet
  control, or expose a single numeric bet input. Lean to a single input; confirm during planning.
- **Reshuffle UX:** auto-reshuffle when penetration is reached vs. an explicit "shuffle" button.
  Lean to automatic with a visible notice; confirm during planning.
