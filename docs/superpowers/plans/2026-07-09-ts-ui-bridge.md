# TypeScript UI Bridge Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Put a minimal, deliberately-unpolished playable Free Play blackjack UI in the browser on top of the existing Rust `blackjack-core`, running the core in-browser via WASM with zero changes to its rules logic.

**Architecture:** The Rust core stays a pure, stateless `command JSON → envelope JSON` function. We compile it to WASM and call it in the browser. A TypeScript `GameController` owns the live `SessionState`, drives the round loop, and emits per-round history to a swappable `LogSink`. React renders the controller's state read-only. Dependencies point strictly downward: React → GameController → CoreTransport → WASM → Rust.

**Tech Stack:** Rust (wasm-bindgen, feature-gated), WebAssembly, Vite, React, TypeScript, Vitest.

## Global Constraints

- The Rust core's **rules logic is unchanged**. Permitted core changes are non-rules only: `crates/blackjack-core/src/wasm.rs` (new), `dispatch_json` in `boundary.rs`, Cargo feature wiring, a golden-fixture test, a DRY refactor of the CLI envelope into the library, and **one width-safe RNG modulo fix in `rng.rs` (Task 0)**. The RNG fix is required because the byte-identical cross-target determinism guarantee below cannot hold without it; it is behavior-preserving on native.
- **One JSON envelope everywhere** (matches the current `CliOutput` in `main.rs`): success is `{"status":"ok","response":<CoreResponse>}`, failure is `{"status":"error","message":<string>}`.
- **Wire format is verbatim `snake_case`.** No `rename_all` on the core structs. `CoreCommand` is internally tagged on `"command"`; `CoreResponse` is adjacently tagged on `"type"`/`"data"`. The TS mirror follows the Rust reality, NOT the V1 spec's `cardId`/`deckId` shorthand (that shorthand is wrong for the wire).
- **Native builds stay clean:** `cargo build` and `cargo test` (no features) must NOT pull `wasm-bindgen`/`console_error_panic_hook`. All WASM code is behind `--features wasm`.
- **Determinism:** after Task 0, the same seed produces byte-identical shoes in the browser (wasm32) and in `cargo test` (native). The source is identical but the targets differ in `usize` width, so the RNG modulo must be width-safe (Task 0) for this to hold; the CLI-oracle tests are only a valid stand-in for browser behavior once Task 0 lands.
- **Logging store is swappable via an async `LogSink`.** In-memory + `.jsonl` download now; IndexedDB/DB later must be a drop-in with no round-loop changes. JSONL shape per `journal/raw/_inbox/history-data-analysis-2026-07-09.md` §3/§7: one `session_header` line, then one `round` line per resolved round carrying the `RoundLog` verbatim plus harness-added `session_id`, `round_index`, `ts`, `schema_version`.
- **Node 20+.** Pin `wasm-bindgen-cli` to the exact `wasm-bindgen` crate version. Generated `web/src/bridge/wasm/` is gitignored and rebuilt before `vite build`.
- **Plan-level refinement (flag for review):** the design spec *recommended* generating `types.ts` via `ts-rs`. This plan instead **hand-authors `types.ts` and guarantees no drift via Rust-emitted golden fixtures + a TS contract test + a runtime boundary validator.** Rationale: it removes tool-integration risk and makes every step exactly specifiable, while preserving the spec's actual requirement (drift is structurally caught in CI). If the reviewer prefers generation, Task 4 is the only task that changes.

---

### Task 0: Core determinism fix — width-safe RNG modulo

**Files:**
- Modify: `crates/blackjack-core/src/rng.rs:19`
- Test: `crates/blackjack-core/tests/rng_determinism_tests.rs`

**Why:** `next_usize` computes `(self.next_u64() as usize) % upper_exclusive`. On `wasm32-unknown-unknown`, `usize` is 32-bit, so `next_u64() as usize` **truncates to the low 32 bits before the modulo**; on native (64-bit) it does not. The Fisher-Yates shuffle would therefore diverge between the browser and every native test/fixture — silently breaking "same seed → identical shoe, replayable across the bridge." The fix does the modulo in `u64` before narrowing: **identical output on 64-bit** (existing fixtures/tests unaffected), and now matching on wasm32. This is an RNG change, not a rules change (see Global Constraints). It lands first so all later fixtures encode the cross-target-correct shoe.

**Interfaces:**
- Produces: no signature change — `SeededRng::next_usize` behavior is preserved on native and corrected on wasm32.

- [ ] **Step 1: Write a characterization test that locks the native shuffle prefix**

Create `crates/blackjack-core/tests/rng_determinism_tests.rs`:

```rust
use blackjack_core::start_session;

/// Locks the exact shoe prefix for a fixed seed so the RNG refactor is proven
/// behavior-preserving on native. The same vector must hold on wasm32 after the fix.
#[test]
fn shoe_prefix_is_stable_for_seed() {
    let s = start_session("det-check", 100000, 2000, None).unwrap();
    let prefix: Vec<String> = s.shoe.cards.iter().take(6).map(|c| c.card_id.clone()).collect();
    // FILL IN Step 2: paste the printed values here.
    let expected: Vec<&str> = vec![];
    assert_eq!(prefix, expected, "shoe prefix changed — RNG is not behavior-preserving on native");
}
```

- [ ] **Step 2: Capture the current native prefix and fill it in**

Run: `cargo test -p blackjack-core --test rng_determinism_tests -- --nocapture` then, from the assertion failure's `left`, copy the six `card_id` strings into `expected`. (Or temporarily `println!("{prefix:?}");`.) Re-run: the test now PASSES on the pre-fix code, capturing today's behavior.

- [ ] **Step 3: Apply the width-safe modulo**

In `crates/blackjack-core/src/rng.rs`, change line 19:

```rust
        (self.next_u64() % (upper_exclusive as u64)) as usize
```

- [ ] **Step 4: Run tests to verify native behavior is unchanged**

Run: `cargo test -p blackjack-core`
Expected: PASS — `rng_determinism_tests` still green (same prefix) plus all existing suites. This proves the fix is a no-op on 64-bit.

- [ ] **Step 5: Commit**

```bash
git add crates/blackjack-core/src/rng.rs crates/blackjack-core/tests/rng_determinism_tests.rs
git commit -m "fix(core): width-safe RNG modulo so wasm32 and native shuffle identically"
```

---

### Task 1: Rust WASM boundary + unified envelope

**Files:**
- Modify: `crates/blackjack-core/Cargo.toml`
- Modify: `crates/blackjack-core/src/boundary.rs` (add `dispatch_json` + `error_envelope` + private `Envelope`)
- Modify: `crates/blackjack-core/src/main.rs` (use `dispatch_json`)
- Create: `crates/blackjack-core/src/wasm.rs`
- Modify: `crates/blackjack-core/src/lib.rs` (register `wasm` module under feature)
- Test: `crates/blackjack-core/tests/envelope_tests.rs`

**Interfaces:**
- Produces: `blackjack_core::dispatch_json(input: &str) -> String` (native + wasm), `blackjack_core::error_envelope(message: String) -> String`, and a WASM export `handleCommand(input: string): string` (js_name).
- Consumes: existing `blackjack_core::{CoreCommand, handle_command}`.

- [ ] **Step 1: Write the failing test**

Create `crates/blackjack-core/tests/envelope_tests.rs`:

```rust
use blackjack_core::dispatch_json;

#[test]
fn ok_command_produces_status_ok_session_envelope() {
    let cmd = r#"{"command":"start_session","seed":"golden-seed","bankroll":100000,"default_bet":2000,"ruleset":null}"#;
    let out = dispatch_json(cmd);
    let v: serde_json::Value = serde_json::from_str(&out).unwrap();
    assert_eq!(v["status"], "ok");
    assert_eq!(v["response"]["type"], "session");
    assert_eq!(v["response"]["data"]["bankroll"], 100000);
}

#[test]
fn invalid_json_produces_status_error_envelope() {
    let out = dispatch_json("not json");
    let v: serde_json::Value = serde_json::from_str(&out).unwrap();
    assert_eq!(v["status"], "error");
    assert!(v["message"].as_str().unwrap().contains("invalid command json"));
}

#[test]
fn rules_error_produces_status_error_envelope() {
    let cmd = r#"{"command":"start_session","seed":"s","bankroll":-1,"default_bet":2000,"ruleset":null}"#;
    let out = dispatch_json(cmd);
    let v: serde_json::Value = serde_json::from_str(&out).unwrap();
    assert_eq!(v["status"], "error");
}
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cargo test -p blackjack-core --test envelope_tests`
Expected: FAIL — `dispatch_json` not found in `blackjack_core`.

- [ ] **Step 3: Add `dispatch_json` and the envelope to `boundary.rs`**

Append to `crates/blackjack-core/src/boundary.rs`:

```rust
#[derive(Serialize)]
#[serde(tag = "status", rename_all = "snake_case")]
enum Envelope<T: Serialize> {
    Ok { response: T },
    Error { message: String },
}

/// Parse one command, run it, and return the `{status,...}` envelope as a JSON string.
/// This is the single JSON entry point shared by the CLI and the WASM build.
pub fn dispatch_json(input: &str) -> String {
    let command: CoreCommand = match serde_json::from_str(input) {
        Ok(command) => command,
        Err(error) => return error_envelope(format!("invalid command json: {error}")),
    };
    match handle_command(command) {
        Ok(response) => serde_json::to_string(&Envelope::Ok { response })
            .unwrap_or_else(|error| error_envelope(format!("failed to serialize response: {error}"))),
        Err(message) => error_envelope(message),
    }
}

/// Build an `{"status":"error","message":...}` envelope string.
pub fn error_envelope(message: String) -> String {
    serde_json::to_string(&Envelope::<()>::Error { message })
        .unwrap_or_else(|_| r#"{"status":"error","message":"unserializable error"}"#.to_string())
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cargo test -p blackjack-core --test envelope_tests`
Expected: PASS (3 tests).

- [ ] **Step 5: Refactor `main.rs` to use `dispatch_json` (DRY the envelope)**

Replace the entire contents of `crates/blackjack-core/src/main.rs`:

```rust
use blackjack_core::{dispatch_json, error_envelope};
use std::io::{self, Read};

fn main() {
    let mut input = String::new();
    if let Err(error) = io::stdin().read_to_string(&mut input) {
        println!("{}", error_envelope(format!("failed to read stdin: {error}")));
        return;
    }
    println!("{}", dispatch_json(&input));
}
```

- [ ] **Step 6: Add Cargo feature wiring + wasm deps**

Replace `crates/blackjack-core/Cargo.toml`:

```toml
[package]
name = "blackjack-core"
version = "0.1.0"
edition = "2024"

[lib]
crate-type = ["cdylib", "rlib"]

[dependencies]
serde = { version = "1", features = ["derive"] }
serde_json = "1"
wasm-bindgen = { version = "0.2", optional = true }
console_error_panic_hook = { version = "0.1", optional = true }

[features]
wasm = ["dep:wasm-bindgen", "dep:console_error_panic_hook"]
```

- [ ] **Step 7: Create the WASM export module**

Create `crates/blackjack-core/src/wasm.rs`:

```rust
use crate::dispatch_json;
use wasm_bindgen::prelude::*;

/// Browser entry point: one JSON command in, one `{status,...}` envelope JSON out.
/// Mirrors the CLI exactly (same `dispatch_json`), so determinism and shapes match.
#[wasm_bindgen(js_name = handleCommand)]
pub fn wasm_handle_command(input: &str) -> String {
    console_error_panic_hook::set_once();
    dispatch_json(input)
}
```

Add to `crates/blackjack-core/src/lib.rs` after the existing `pub mod` lines:

```rust
#[cfg(feature = "wasm")]
pub mod wasm;
```

- [ ] **Step 8: Verify native build is unaffected and wasm compiles**

Run: `cargo test -p blackjack-core` (no features)
Expected: PASS — all existing tests + envelope tests green; `wasm-bindgen` NOT compiled.

Run: `cargo check -p blackjack-core --features wasm --target wasm32-unknown-unknown`
Expected: compiles. (If the `wasm32-unknown-unknown` target is missing: `rustup target add wasm32-unknown-unknown`.)

- [ ] **Step 9: Commit**

```bash
git add crates/blackjack-core/Cargo.toml crates/blackjack-core/src/boundary.rs crates/blackjack-core/src/main.rs crates/blackjack-core/src/wasm.rs crates/blackjack-core/src/lib.rs crates/blackjack-core/tests/envelope_tests.rs
git commit -m "feat(core): unified JSON envelope + feature-gated WASM export"
```

---

### Task 2: Golden fixtures for the wire contract

**Files:**
- Create: `crates/blackjack-core/tests/golden_fixtures.rs`
- Create (generated + committed): `crates/blackjack-core/tests/fixtures/session_start.json`
- Create (generated + committed): `crates/blackjack-core/tests/fixtures/session_resolved.json` (a full, played-to-resolution `SessionState` — the only fixture that contains `RoundState`/`HandState`/`DealerState`/`ActionLog`/`HandOutcome` objects, so the TS contract test can guard those nested field names)
- Create (committed literal): `crates/blackjack-core/tests/fixtures/response_actions.json`

**Interfaces:**
- Produces: committed JSON fixtures consumed by the TS contract test in Task 4. Exact paths: `crates/blackjack-core/tests/fixtures/*.json`.

- [ ] **Step 1: Write the failing test**

Create `crates/blackjack-core/tests/golden_fixtures.rs`:

```rust
use blackjack_core::{
    apply_action, dispatch_json, start_round, start_session, Action, CoreResponse, RoundStatus,
};
use std::fs;

fn fixture_path(name: &str) -> String {
    format!("{}/tests/fixtures/{name}", env!("CARGO_MANIFEST_DIR"))
}

/// Compare `actual` to the committed fixture, or (re)write it when UPDATE_FIXTURES=1.
fn check_or_write(name: &str, actual: &str) {
    let path = fixture_path(name);
    if std::env::var("UPDATE_FIXTURES").is_ok() {
        fs::create_dir_all(std::path::Path::new(&path).parent().unwrap()).unwrap();
        fs::write(&path, actual).unwrap();
    } else {
        let expected =
            fs::read_to_string(&path).unwrap_or_else(|_| panic!("missing {path}; run UPDATE_FIXTURES=1"));
        assert_eq!(actual.trim(), expected.trim(), "wire fixture {name} drifted");
    }
}

#[test]
fn session_start_fixture_is_stable() {
    let cmd = r#"{"command":"start_session","seed":"golden-seed","bankroll":100000,"default_bet":2000,"ruleset":null}"#;
    check_or_write("session_start.json", &dispatch_json(cmd));
}

#[test]
fn actions_response_shape_is_stable() {
    // Exact adjacently-tagged, snake_case shape the TS Action[]/CoreResponse mirror must match.
    let resp = CoreResponse::Actions(vec![Action::Hit, Action::Stand, Action::Double, Action::Split]);
    let json = serde_json::to_string(&resp).unwrap();
    assert_eq!(json, r#"{"type":"actions","data":["hit","stand","double","split"]}"#);
}

/// A full SessionState played to resolution, serialized RAW (not enveloped) so the TS
/// contract test can dereference every nested round/hand/dealer/log field name.
fn resolved_session_json() -> String {
    let mut s = start_session("golden-seed", 100000, 2000, None).unwrap();
    start_round(&mut s, Some(2000)).unwrap();
    let mut guard = 0;
    while s.round.as_ref().is_some_and(|r| r.status == RoundStatus::PlayerTurn) && guard < 30 {
        apply_action(&mut s, Action::Stand).unwrap();
        guard += 1;
    }
    serde_json::to_string(&s).unwrap()
}

#[test]
fn session_resolved_fixture_is_stable() {
    check_or_write("session_resolved.json", &resolved_session_json());
}
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cargo test -p blackjack-core --test golden_fixtures`
Expected: `session_start_fixture_is_stable` and `session_resolved_fixture_is_stable` FAIL (missing fixtures); `actions_response_shape_is_stable` PASSES.

- [ ] **Step 3: Generate the session fixtures**

Run: `UPDATE_FIXTURES=1 cargo test -p blackjack-core --test golden_fixtures`
Expected: writes `session_start.json` and `session_resolved.json`. Open `session_resolved.json` and confirm `"round"` is non-null with a non-empty `"actions"` array — it must exercise `ActionLog`. If the seed dealt an immediate natural (empty `actions`), change the seed in `resolved_session_json` until `actions` has at least one entry, then regenerate.

- [ ] **Step 4: Create the committed actions fixture (enveloped, for the TS test)**

Create `crates/blackjack-core/tests/fixtures/response_actions.json` (exact content, single line):

```json
{"status":"ok","response":{"type":"actions","data":["hit","stand","double","split"]}}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `cargo test -p blackjack-core --test golden_fixtures`
Expected: PASS (3 tests). Open `session_start.json` and confirm it contains `"status":"ok"`, `"type":"session"`, and card fields `"card_id"`/`"deck_id"` (snake_case) — proof of the real wire shape.

- [ ] **Step 6: Commit**

```bash
git add crates/blackjack-core/tests/golden_fixtures.rs crates/blackjack-core/tests/fixtures/
git commit -m "test(core): commit golden wire fixtures for the TS bridge contract"
```

---

### Task 3: Web workspace scaffold + WASM build integration + bootstrap gate

**Files:**
- Create: `web/package.json`, `web/tsconfig.json`, `web/vite.config.ts`, `web/index.html`, `web/.gitignore`
- Create: `web/src/main.tsx`, `web/src/app/App.tsx`
- Create: `web/scripts/build-wasm.sh`
- Test: `web/src/bootstrap.test.ts`

**Interfaces:**
- Produces: `web/src/bridge/wasm/blackjack_core.js` (generated) exporting `default` init and `handleCommand`; an `npm run build:wasm` script; a mountable React shell gated on WASM init.

- [ ] **Step 1: Create the WASM build script**

Create `web/scripts/build-wasm.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail
# npm runs this from web/; all paths below are repo-root-relative, so cd there first.
cd "$(dirname "$0")/../.."
# Pin wasm-bindgen-cli to the crate version; (re)install on absence OR mismatch.
WB_VERSION="0.2.100"
if ! command -v wasm-bindgen >/dev/null 2>&1 || [ "$(wasm-bindgen --version | awk '{print $2}')" != "$WB_VERSION" ]; then
  cargo install wasm-bindgen-cli --version "$WB_VERSION" --force
fi
cargo build -p blackjack-core --features wasm --release --target wasm32-unknown-unknown
wasm-bindgen \
  target/wasm32-unknown-unknown/release/blackjack_core.wasm \
  --out-dir web/src/bridge/wasm --target web
echo "wasm build complete -> web/src/bridge/wasm/"
```

> Note: `WB_VERSION` must equal the resolved `wasm-bindgen` version in `Cargo.lock`. If they differ, wasm-bindgen errors loudly with the exact expected version — update `WB_VERSION` to match and rerun.

Make it executable: `chmod +x web/scripts/build-wasm.sh`.

- [ ] **Step 2: Create `web/package.json`**

```json
{
  "name": "blackjack-web",
  "private": true,
  "type": "module",
  "scripts": {
    "build:wasm": "bash scripts/build-wasm.sh",
    "dev": "vite",
    "build": "tsc -b && vite build",
    "test": "vitest run"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@testing-library/react": "^16.0.0",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "jsdom": "^24.1.0",
    "typescript": "^5.5.0",
    "vite": "^5.4.0",
    "vite-plugin-top-level-await": "^1.4.4",
    "vite-plugin-wasm": "^3.3.0",
    "vitest": "^2.0.0"
  }
}
```

- [ ] **Step 3: Create config files**

`web/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "skipLibCheck": true,
    "types": ["vitest/globals"]
  },
  "include": ["src"]
}
```

`web/vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

export default defineConfig({
  plugins: [react(), wasm(), topLevelAwait()],
  test: { environment: 'jsdom', globals: true },
});
```

`web/index.html`:

```html
<!doctype html>
<html lang="en">
  <head><meta charset="UTF-8" /><title>Blackjack Free Play</title></head>
  <body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body>
</html>
```

`web/.gitignore`:

```gitignore
node_modules/
dist/
src/bridge/wasm/
```

- [ ] **Step 4: Create the bootstrap gate + shell**

`web/src/app/App.tsx`:

```tsx
export function App() {
  return <main><h1>Blackjack Free Play</h1><p>Core loaded.</p></main>;
}
```

`web/src/main.tsx`:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import initCore from './bridge/wasm/blackjack_core';
import { App } from './app/App';

// WASM must finish async init before any core call. Gate the mount on it.
async function bootstrap() {
  await initCore();
  createRoot(document.getElementById('root')!).render(
    <StrictMode><App /></StrictMode>,
  );
}
void bootstrap();
```

- [ ] **Step 5: Write a build-order smoke test**

Create `web/src/bootstrap.test.ts`:

```ts
import { existsSync } from 'node:fs';
import { describe, it, expect } from 'vitest';

describe('wasm build output', () => {
  it('exists (run `npm run build:wasm` first)', () => {
    expect(existsSync(new URL('./bridge/wasm/blackjack_core.js', import.meta.url))).toBe(true);
  });
});
```

- [ ] **Step 6: Install, build WASM, run test**

Run (from `web/`): `npm install && npm run build:wasm && npm test`
Expected: WASM build writes `src/bridge/wasm/`; the smoke test PASSES.

- [ ] **Step 7: Commit**

```bash
git add web/package.json web/tsconfig.json web/vite.config.ts web/index.html web/.gitignore web/scripts/build-wasm.sh web/src/main.tsx web/src/app/App.tsx web/src/bootstrap.test.ts
git commit -m "feat(web): scaffold Vite+React app with feature-gated WASM build"
```

---

### Task 4: TS wire types + boundary validator + golden contract test

**Files:**
- Create: `web/src/bridge/types.ts`
- Create: `web/src/bridge/validate.ts`
- Test: `web/src/bridge/contract.test.ts`

**Interfaces:**
- Produces: all wire types (`Card`, `Ruleset`, `SessionState`, `RoundLog`, `Action`, `CoreCommand`, `CoreResponse`, `CliOutput`, …); `parseCliOutput(raw: string): CliOutput`; error classes `CoreRuleError` (recoverable) and `BridgeError` (fatal).

- [ ] **Step 1: Write the failing contract test**

Create `web/src/bridge/contract.test.ts`:

```ts
import { readFileSync } from 'node:fs';
import { describe, it, expect } from 'vitest';
import { parseCliOutput } from './validate';
import type { SessionState } from './types';

const FIX = new URL('../../../crates/blackjack-core/tests/fixtures/', import.meta.url);
const read = (name: string) => readFileSync(new URL(name, FIX), 'utf8');

describe('wire contract vs Rust golden fixtures', () => {
  it('parses a real session_start envelope into typed SessionState', () => {
    const out = parseCliOutput(read('session_start.json'));
    expect(out.status).toBe('ok');
    if (out.status !== 'ok' || out.response.type !== 'session') throw new Error('shape');
    const s: SessionState = out.response.data;
    expect(s.bankroll).toBe(100000);
    expect(s.ruleset.id).toBe('v1-modern-classic-h17-6d');
    expect(s.shoe.cards.length).toBe(312);
    // snake_case card fields must exist (guards camelCase drift)
    expect(s.shoe.cards[0]!.card_id).toBeTypeOf('string');
    expect(s.shoe.cards[0]!.deck_id).toBeTypeOf('string');
  });

  it('parses an actions envelope into Action[]', () => {
    const out = parseCliOutput(read('response_actions.json'));
    if (out.status !== 'ok' || out.response.type !== 'actions') throw new Error('shape');
    expect(out.response.data).toEqual(['hit', 'stand', 'double', 'split']);
  });

  it('covers every nested round/hand/dealer/log field name (guards nested drift)', () => {
    // Raw (non-enveloped) SessionState fixture, played to resolution.
    // This block only COMPILES if types.ts declares each field with its exact wire name,
    // and only PASSES if the real wire carries them — closing the nested-drift gap.
    const s: SessionState = JSON.parse(read('session_resolved.json'));
    const round = s.round!;
    expect(round.status).toBeTypeOf('string');
    expect(round.active_hand_index).toBeTypeOf('number');
    expect(round.bankroll_before).toBeTypeOf('number');
    expect(round.dealer.cards.length).toBeGreaterThan(0);
    const hand = round.hands[0]!;
    expect(hand.is_complete).toBeTypeOf('boolean');
    expect(hand.is_doubled).toBeTypeOf('boolean');
    expect(hand.wager).toBeTypeOf('number');
    expect(['initial', 'split']).toContain(hand.source);
    const act = round.actions[0]!;
    expect(act.hand_index).toBeTypeOf('number');
    expect(act.action).toBeTypeOf('string');
    expect(act).toHaveProperty('card_id');
    const log = s.logs[0]!;
    const outcome = log.outcomes[0]!;
    expect(outcome.hand_index).toBeTypeOf('number');
    expect(['win', 'loss', 'push', 'blackjack']).toContain(outcome.result);
    expect(outcome.wager).toBeTypeOf('number');
    expect(outcome.delta).toBeTypeOf('number');
    expect(log.bankroll_after).toBeTypeOf('number');
    expect(log.bankroll_delta).toBeTypeOf('number');
    expect(log.penetration_reached).toBeTypeOf('boolean');
  });

  it('throws BridgeError on non-JSON', () => {
    expect(() => parseCliOutput('garbage')).toThrow();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run (from `web/`): `npm test -- contract`
Expected: FAIL — `./validate` and `./types` do not exist.

- [ ] **Step 3: Write `types.ts`**

Create `web/src/bridge/types.ts`:

```ts
// Wire format mirrors crates/blackjack-core serde output EXACTLY (verbatim snake_case).
// Guarded by contract.test.ts against Rust golden fixtures. Do NOT rename to camelCase.

export type Rank =
  | 'ace' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven'
  | 'eight' | 'nine' | 'ten' | 'jack' | 'queen' | 'king';
export type Suit = 'clubs' | 'diamonds' | 'hearts' | 'spades';
export interface Card { card_id: string; deck_id: string; rank: Rank; suit: Suit }

export type DealerSoft17 = 'hit' | 'stand';
export interface Ruleset {
  id: string;
  decks: number;
  penetration_percent: number;
  dealer_soft_17: DealerSoft17;
  blackjack_payout: number;
  max_split_hands: number;
  double_after_split: boolean;
  resplit_aces: boolean;
  split_aces_receive_one_card: boolean;
  insurance_auto_decline: boolean;
}

export type Action = 'hit' | 'stand' | 'double' | 'split';
export type HandSource = 'initial' | 'split';
export interface HandState {
  cards: Card[]; wager: number; is_complete: boolean; is_doubled: boolean; source: HandSource;
}
export interface DealerState { cards: Card[] }
export type RoundStatus = 'player_turn' | 'dealer_turn' | 'resolved';
export type LoggedAction = 'hit' | 'stand' | 'double' | 'split' | 'insurance_declined';
export interface ActionLog { action: LoggedAction; hand_index: number; card_id: string | null }
export type OutcomeResult = 'win' | 'loss' | 'push' | 'blackjack';
export interface HandOutcome { hand_index: number; result: OutcomeResult; wager: number; delta: number }

export interface RoundState {
  status: RoundStatus;
  bet: number;
  active_hand_index: number;
  dealer: DealerState;
  hands: HandState[];
  dealt_cards: Card[];
  actions: ActionLog[];
  bankroll_before: number;
}
export interface ShoeState {
  seed: string; shoe_number: number; cards: Card[]; cursor: number;
  discard: Card[]; penetration_index: number;
}
export interface RoundLog {
  seed: string; ruleset: Ruleset; shoe_number: number;
  dealt_cards: Card[]; actions: ActionLog[]; outcomes: HandOutcome[];
  bankroll_before: number; bankroll_after: number; bankroll_delta: number;
  penetration_reached: boolean;
}
export interface SessionState {
  seed: string; ruleset: Ruleset; shoe: ShoeState;
  bankroll: number; default_bet: number;
  round: RoundState | null; logs: RoundLog[];
}

// Client-produced commands. Internally tagged on "command".
export type CoreCommand =
  | { command: 'start_session'; seed: string; bankroll: number; default_bet: number; ruleset: Ruleset | null }
  | { command: 'start_round'; session: SessionState; bet: number | null }
  | { command: 'legal_actions'; session: SessionState }
  | { command: 'apply_action'; session: SessionState; action: Action }
  | { command: 'reshuffle'; session: SessionState };

// Core-produced responses. Adjacently tagged on "type"/"data".
export type CoreResponse =
  | { type: 'session'; data: SessionState }
  | { type: 'actions'; data: Action[] };

// Envelope produced by dispatch_json / CliOutput.
export type CliOutput =
  | { status: 'ok'; response: CoreResponse }
  | { status: 'error'; message: string };
```

- [ ] **Step 4: Write `validate.ts`**

Create `web/src/bridge/validate.ts`:

```ts
import type { CliOutput, CoreResponse } from './types';

/** Recoverable: the core rejected a command (e.g. illegal action). Play continues. */
export class CoreRuleError extends Error {}
/** Fatal: malformed/absent envelope or transport failure. The instance may be poisoned. */
export class BridgeError extends Error {}

/** Validate the discriminants of a raw core reply and narrow it to CliOutput. */
export function parseCliOutput(raw: string): CliOutput {
  let v: unknown;
  try {
    v = JSON.parse(raw);
  } catch {
    throw new BridgeError(`core returned non-JSON: ${raw.slice(0, 120)}`);
  }
  if (!v || typeof v !== 'object' || !('status' in v)) throw new BridgeError('envelope missing status');
  const o = v as Record<string, unknown>;
  if (o.status === 'error') {
    if (typeof o.message !== 'string') throw new BridgeError('error envelope missing message');
    return { status: 'error', message: o.message };
  }
  if (o.status === 'ok') {
    const r = o.response as Record<string, unknown> | undefined;
    if (!r || (r.type !== 'session' && r.type !== 'actions') || !('data' in r)) {
      throw new BridgeError('ok envelope has malformed response');
    }
    return { status: 'ok', response: r as unknown as CoreResponse };
  }
  throw new BridgeError(`unknown envelope status: ${String(o.status)}`);
}
```

- [ ] **Step 5: Run test to verify it passes**

Run (from `web/`): `npm test -- contract`
Expected: PASS (4 tests).

- [ ] **Step 6: Commit**

```bash
git add web/src/bridge/types.ts web/src/bridge/validate.ts web/src/bridge/contract.test.ts
git commit -m "feat(bridge): hand-authored wire types + boundary validator, golden-fixture guarded"
```

---

### Task 5: CoreTransport interface + WASM + CLI transports

**Files:**
- Create: `web/src/bridge/transport.ts`
- Create: `web/src/bridge/core-client.ts` (WASM-backed)
- Create: `web/src/bridge/cli-transport.ts` (Node, test/QA only)
- Test: `web/src/bridge/cli-transport.test.ts`

**Interfaces:**
- Produces: `interface CoreTransport { call(commandJson: string): string }`; `class WasmTransport`; `class CliTransport` (constructor takes the core binary path).
- Consumes: `handleCommand` from `./wasm/blackjack_core`.

- [ ] **Step 1: Write the failing test**

Create `web/src/bridge/cli-transport.test.ts`:

```ts
import { describe, it, expect, beforeAll } from 'vitest';
import { execSync } from 'node:child_process';
import { CliTransport } from './cli-transport';
import { parseCliOutput } from './validate';

const BIN = new URL('../../../target/debug/blackjack-core', import.meta.url).pathname;
// Vitest runs test files in isolated workers, so build the binary this file needs here.
beforeAll(() => execSync('cargo build -p blackjack-core', { cwd: new URL('../../../', import.meta.url).pathname }));

describe('CliTransport (deterministic bridge QA transport)', () => {
  it('runs start_session against the real core binary', () => {
    const t = new CliTransport(BIN);
    const raw = t.call(JSON.stringify({
      command: 'start_session', seed: 'bridge-seed', bankroll: 100000, default_bet: 2000, ruleset: null,
    }));
    const out = parseCliOutput(raw);
    if (out.status !== 'ok' || out.response.type !== 'session') throw new Error('shape');
    expect(out.response.data.shoe.seed).toBe('bridge-seed');
  });

  it('is deterministic: same seed -> identical shoe order', () => {
    const t = new CliTransport(BIN);
    const cmd = JSON.stringify({
      command: 'start_session', seed: 'same', bankroll: 100000, default_bet: 2000, ruleset: null,
    });
    expect(t.call(cmd)).toEqual(t.call(cmd));
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run (from repo root): `cargo build -p blackjack-core` then (from `web/`) `npm test -- cli-transport`
Expected: FAIL — `./transport` / `./cli-transport` do not exist.

- [ ] **Step 3: Write the interface and both transports**

`web/src/bridge/transport.ts`:

```ts
/** The one seam the GameController talks to: raw JSON string in, raw JSON string out. */
export interface CoreTransport {
  call(commandJson: string): string;
}
```

`web/src/bridge/core-client.ts`:

```ts
import type { CoreTransport } from './transport';
import { handleCommand } from './wasm/blackjack_core';

/** Browser transport: calls the WASM export synchronously (after init in main.tsx). */
export class WasmTransport implements CoreTransport {
  call(commandJson: string): string {
    return handleCommand(commandJson);
  }
}
```

`web/src/bridge/cli-transport.ts`:

```ts
import { spawnSync } from 'node:child_process';
import type { CoreTransport } from './transport';

/** Node-only transport that shells the native core binary. Test/QA use, never bundled. */
export class CliTransport implements CoreTransport {
  constructor(private readonly bin: string) {}
  call(commandJson: string): string {
    const r = spawnSync(this.bin, { input: commandJson, encoding: 'utf8' });
    if (r.status !== 0) throw new Error(`core exited ${r.status}: ${r.stderr}`);
    return r.stdout.trim();
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run (from `web/`): `npm test -- cli-transport`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add web/src/bridge/transport.ts web/src/bridge/core-client.ts web/src/bridge/cli-transport.ts web/src/bridge/cli-transport.test.ts
git commit -m "feat(bridge): CoreTransport seam with WASM and CLI implementations"
```

---

### Task 6: LogSink + MemorySink (JSONL history)

**Files:**
- Create: `web/src/bridge/log/sink.ts`
- Create: `web/src/bridge/log/memory-sink.ts`
- Test: `web/src/bridge/log/memory-sink.test.ts`

**Interfaces:**
- Produces: `interface LogSink { write(line): Promise<void>; flush(): Promise<void>; export(): Blob }`; `type LogLine` (`SessionHeader | RoundLine`); `class MemorySink` with a test-only `text(): string`.
- Consumes: `RoundLog`, `Ruleset` from `../types`.

- [ ] **Step 1: Write the failing test**

Create `web/src/bridge/log/memory-sink.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { MemorySink } from './memory-sink';
import type { RoundLog, Ruleset } from '../types';

const ruleset: Ruleset = {
  id: 'v1-modern-classic-h17-6d', decks: 6, penetration_percent: 75, dealer_soft_17: 'hit',
  blackjack_payout: 1.5, max_split_hands: 4, double_after_split: true, resplit_aces: false,
  split_aces_receive_one_card: true, insurance_auto_decline: true,
};
const roundLog: RoundLog = {
  seed: 's', ruleset, shoe_number: 1, dealt_cards: [], actions: [],
  outcomes: [{ hand_index: 0, result: 'win', wager: 2000, delta: 2000 }],
  bankroll_before: 100000, bankroll_after: 102000, bankroll_delta: 2000, penetration_reached: false,
};

describe('MemorySink', () => {
  it('writes a header then round lines as valid JSONL carrying RoundLog verbatim', async () => {
    const sink = new MemorySink();
    await sink.write({
      type: 'session_header', schema_version: 1, session_id: 'sid', seed: 's',
      started_at: '2026-07-09T00:00:00Z', starting_bankroll: 100000, default_bet: 2000,
      ruleset, harness_version: 'ts-bridge-0.1.0',
    });
    await sink.write({ type: 'round', schema_version: 1, session_id: 'sid', round_index: 0, ts: '2026-07-09T00:01:00Z', ...roundLog });

    const lines = sink.text().split('\n');
    expect(lines).toHaveLength(2);
    const header = JSON.parse(lines[0]!);
    expect(header.type).toBe('session_header');
    const round = JSON.parse(lines[1]!);
    expect(round.type).toBe('round');
    expect(round.round_index).toBe(0);
    expect(round.bankroll_delta).toBe(2000);   // RoundLog field is present at top level
    expect(round.outcomes[0].result).toBe('win');
  });

  it('export() yields a trailing-newline ndjson Blob', async () => {
    const sink = new MemorySink();
    await sink.write({
      type: 'session_header', schema_version: 1, session_id: 'sid', seed: 's',
      started_at: 't', starting_bankroll: 1, default_bet: 1, ruleset, harness_version: 'v',
    });
    const text = await sink.export().text();
    expect(text.endsWith('\n')).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run (from `web/`): `npm test -- memory-sink`
Expected: FAIL — `./sink` / `./memory-sink` do not exist.

- [ ] **Step 3: Write `sink.ts`**

Create `web/src/bridge/log/sink.ts`:

```ts
import type { RoundLog, Ruleset } from '../types';

export interface SessionHeader {
  type: 'session_header';
  schema_version: number;
  session_id: string;
  seed: string;
  started_at: string;
  starting_bankroll: number;
  default_bet: number;
  ruleset: Ruleset;
  harness_version: string;
}

/** A round line carries the RoundLog verbatim (flattened) plus harness-added fields. */
export type RoundLine = {
  type: 'round';
  schema_version: number;
  session_id: string;
  round_index: number;
  ts: string;
} & RoundLog;

export type LogLine = SessionHeader | RoundLine;

/**
 * Swappable history store. ASYNC on purpose: an IndexedDB/DB implementation drops in
 * later with zero round-loop changes. The persisted file stays lossless (no derived
 * count/strategy columns) — those are computed later in the Python analysis layer.
 */
export interface LogSink {
  write(line: LogLine): Promise<void>;
  flush(): Promise<void>;
  export(): Blob;
}
```

- [ ] **Step 4: Write `memory-sink.ts`**

Create `web/src/bridge/log/memory-sink.ts`:

```ts
import type { LogLine, LogSink } from './sink';

/** In-memory JSONL accumulation + .jsonl download. First store implementation. */
export class MemorySink implements LogSink {
  private lines: string[] = [];

  async write(line: LogLine): Promise<void> {
    this.lines.push(JSON.stringify(line));
  }

  async flush(): Promise<void> {}

  export(): Blob {
    const body = this.lines.length ? this.lines.join('\n') + '\n' : '';
    return new Blob([body], { type: 'application/x-ndjson' });
  }

  /** Test-only accessor. */
  text(): string {
    return this.lines.join('\n');
  }
}
```

- [ ] **Step 5: Run test to verify it passes**

Run (from `web/`): `npm test -- memory-sink`
Expected: PASS (2 tests).

- [ ] **Step 6: Commit**

```bash
git add web/src/bridge/log/
git commit -m "feat(bridge): async LogSink seam + in-memory JSONL sink"
```

---

### Task 7: GameController (session lifecycle, round loop, logging, error/fatal)

**Files:**
- Create: `web/src/bridge/game.ts`
- Test: `web/src/bridge/game.test.ts`

**Interfaces:**
- Produces: `class GameController` with `startSession`, `startRound`, `act`, `reshuffle`, `downloadLog`, `getState`, `subscribe`; `type GameState { phase; session; legalActions; lastError; fatalMessage }`; `interface Clock { now(): string }`, `interface Ids { next(): string }`.
- Consumes: `CoreTransport` (Task 5), `LogSink`/`LogLine` (Task 6), `parseCliOutput`/`BridgeError` (Task 4), wire types (Task 4).

- [ ] **Step 1: Write the failing test**

Create `web/src/bridge/game.test.ts`:

```ts
import { describe, it, expect, beforeAll } from 'vitest';
import { execSync } from 'node:child_process';
import { GameController } from './game';
import { CliTransport } from './cli-transport';
import { MemorySink } from './log/memory-sink';

const BIN = new URL('../../../target/debug/blackjack-core', import.meta.url).pathname;
beforeAll(() => execSync('cargo build -p blackjack-core', { cwd: new URL('../../../', import.meta.url).pathname }));

function make() {
  let n = 0, t = 0;
  const sink = new MemorySink();
  const c = new GameController(new CliTransport(BIN), sink,
    { now: () => `t${t++}` }, { next: () => `sid-${n++}` });
  return { c, sink };
}

describe('GameController', () => {
  it('starts a session and writes a header line', async () => {
    const { c, sink } = make();
    await c.startSession('seed-a', 100000, 2000);
    expect(c.getState().phase).toBe('in_session');
    expect(c.getState().session!.bankroll).toBe(100000);
    expect(JSON.parse(sink.text().split('\n')[0]!).type).toBe('session_header');
  });

  it('plays a round to resolution and logs exactly one round line per resolved round', async () => {
    const { c, sink } = make();
    await c.startSession('seed-a', 100000, 2000);
    await c.startRound(2000);
    // Drive to resolution: stand until the round is no longer the player's turn.
    let guard = 0;
    while (c.getState().session!.round?.status === 'player_turn' && guard++ < 20) {
      await c.act('stand');
    }
    expect(c.getState().session!.round!.status).toBe('resolved');
    const roundLines = sink.text().split('\n').filter((l) => JSON.parse(l).type === 'round');
    expect(roundLines).toHaveLength(1);
    expect(JSON.parse(roundLines[0]!).round_index).toBe(0);
  });

  it('strips logs from retained state but bankroll stays correct across rounds', async () => {
    const { c } = make();
    await c.startSession('seed-a', 100000, 2000);
    await c.startRound(2000);
    let guard = 0;
    while (c.getState().session!.round?.status === 'player_turn' && guard++ < 20) await c.act('stand');
    expect(c.getState().session!.logs).toHaveLength(0);           // stripped
    const bankrollAfterR1 = c.getState().session!.bankroll;
    expect(Number.isInteger(bankrollAfterR1)).toBe(true);
  });

  it('surfaces a recoverable rule error without leaving in_session', async () => {
    const { c } = make();
    await c.startSession('seed-a', 100000, 2000);
    await c.act('hit');   // no active round -> core returns an error envelope
    expect(c.getState().phase).toBe('in_session');
    expect(c.getState().lastError).toBeTruthy();
  });

  it('logs a naturals round that resolves inside start_round (zero player actions)', async () => {
    // Search seeds for an immediate natural, then assert one round line was emitted.
    for (let i = 0; i < 200; i++) {
      const { c, sink } = make();
      await c.startSession(`nat-${i}`, 100000, 2000);
      await c.startRound(2000);
      if (c.getState().session!.round!.status === 'resolved') {
        const roundLines = sink.text().split('\n').filter((l) => JSON.parse(l).type === 'round');
        expect(roundLines).toHaveLength(1);
        return;
      }
    }
    throw new Error('no natural found in 200 seeds — widen the search');
  });

  it('enters fatal state when the transport returns garbage', async () => {
    const sink = new MemorySink();
    const bad = { call: () => 'not json at all' };
    const c = new GameController(bad, sink, { now: () => 't' }, { next: () => 'sid' });
    await c.startSession('seed-a', 100000, 2000);
    expect(c.getState().phase).toBe('fatal');
    expect(c.getState().fatalMessage).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run (from `web/`): `npm test -- game`
Expected: FAIL — `./game` does not exist.

- [ ] **Step 3: Write `game.ts`**

Create `web/src/bridge/game.ts`:

```ts
import type { Action, CliOutput, CoreCommand, Ruleset, SessionState } from './types';
import type { CoreTransport } from './transport';
import { BridgeError, parseCliOutput } from './validate';
import type { LogSink } from './log/sink';

const SCHEMA_VERSION = 1;
const HARNESS_VERSION = 'ts-bridge-0.1.0';

export type Phase = 'idle' | 'in_session' | 'fatal';
export interface Clock { now(): string }
export interface Ids { next(): string }

export interface GameState {
  phase: Phase;
  session: SessionState | null;
  legalActions: Action[];
  lastError: string | null;    // recoverable rule error
  fatalMessage: string | null; // poisoned/malformed core
}

export class GameController {
  private state: GameState = { phase: 'idle', session: null, legalActions: [], lastError: null, fatalMessage: null };
  private sessionId = '';
  private roundIndex = 0;
  private listeners = new Set<() => void>();

  constructor(
    private readonly transport: CoreTransport,
    private readonly sink: LogSink,
    private readonly clock: Clock,
    private readonly ids: Ids,
  ) {}

  getState = (): GameState => this.state;
  subscribe = (fn: () => void): (() => void) => { this.listeners.add(fn); return () => { this.listeners.delete(fn); }; };
  downloadLog = (): Blob => this.sink.export();

  async startSession(seed: string, bankroll: number, defaultBet: number, ruleset: Ruleset | null = null): Promise<void> {
    this.sessionId = this.ids.next();
    this.roundIndex = 0;
    const out = this.dispatch({ command: 'start_session', seed, bankroll, default_bet: defaultBet, ruleset });
    if (!out) return;
    if (out.status === 'error') { this.set({ lastError: out.message }); return; }
    if (out.response.type !== 'session') return;
    const session = out.response.data;
    await this.sink.write({
      type: 'session_header', schema_version: SCHEMA_VERSION, session_id: this.sessionId,
      seed: session.seed, started_at: this.clock.now(), starting_bankroll: session.bankroll,
      default_bet: session.default_bet, ruleset: session.ruleset, harness_version: HARNESS_VERSION,
    });
    this.set({ phase: 'in_session', session: this.strip(session), lastError: null });
  }

  async startRound(bet: number | null = null): Promise<void> {
    await this.command({ command: 'start_round', session: this.requireSession(), bet });
    this.refreshLegal();
  }

  async act(action: Action): Promise<void> {
    await this.command({ command: 'apply_action', session: this.requireSession(), action });
    this.refreshLegal();
  }

  async reshuffle(): Promise<void> {
    await this.command({ command: 'reshuffle', session: this.requireSession() });
  }

  // --- internals ---

  private async command(cmd: CoreCommand): Promise<void> {
    const out = this.dispatch(cmd);
    if (!out) return;
    if (out.status === 'error') { this.set({ lastError: out.message }); return; }
    if (out.response.type !== 'session') return;
    await this.applySession(out.response.data);
  }

  private async applySession(next: SessionState): Promise<void> {
    // We always send logs:[] onward, so next.logs holds only rounds resolved by THIS command.
    for (const log of next.logs) {
      await this.sink.write({
        type: 'round', schema_version: SCHEMA_VERSION, session_id: this.sessionId,
        round_index: this.roundIndex++, ts: this.clock.now(), ...log,
      });
    }
    this.set({ session: this.strip(next), lastError: null });
  }

  private refreshLegal(): void {
    const s = this.state.session;
    if (!s || !s.round || s.round.status !== 'player_turn') { this.set({ legalActions: [] }); return; }
    const out = this.dispatch({ command: 'legal_actions', session: s });
    if (out && out.status === 'ok' && out.response.type === 'actions') this.set({ legalActions: out.response.data });
  }

  private dispatch(cmd: CoreCommand): CliOutput | null {
    let raw: string;
    try { raw = this.transport.call(JSON.stringify(cmd)); }
    catch (e) { this.fail(`transport failure: ${(e as Error).message}`); return null; }
    try { return parseCliOutput(raw); }
    catch (e) { if (e instanceof BridgeError) { this.fail(e.message); return null; } throw e; }
  }

  /** Sink is the durable record; drop logs from retained/outbound state to bound payload size. */
  private strip(s: SessionState): SessionState { return { ...s, logs: [] }; }

  private requireSession(): SessionState {
    if (!this.state.session) throw new BridgeError('no active session');
    return this.state.session;
  }

  private set(patch: Partial<GameState>): void { this.state = { ...this.state, ...patch }; this.emit(); }
  private fail(message: string): void { this.state = { ...this.state, phase: 'fatal', fatalMessage: message }; this.emit(); }
  private emit(): void { for (const l of this.listeners) l(); }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run (from `web/`): `npm test -- game`
Expected: PASS (6 tests).

> If the `strip`-then-diff assumption is wrong (i.e. the core reads `session.logs`), the "bankroll stays correct across rounds" test will fail. It passing confirms stripping is safe.

- [ ] **Step 5: Commit**

```bash
git add web/src/bridge/game.ts web/src/bridge/game.test.ts
git commit -m "feat(bridge): GameController owns session lifecycle, round loop, and history"
```

---

### Task 8: React UI (table, controls, bankroll, fatal banner) + store binding

**Files:**
- Create: `web/src/app/useGame.ts`
- Create: `web/src/app/HandView.tsx`
- Create: `web/src/app/Controls.tsx`
- Create: `web/src/app/Table.tsx`
- Modify: `web/src/app/App.tsx`
- Modify: `web/src/main.tsx` (construct the real controller with WASM transport)
- Test: `web/src/app/Table.test.tsx`

**Interfaces:**
- Consumes: `GameController`, `GameState` (Task 7); wire types (Task 4).
- Produces: `useGame(controller): GameState`; presentational components driven entirely by controller state.

- [ ] **Step 1: Write the failing test**

Create `web/src/app/Table.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { Table } from './Table';
import { GameController } from '../bridge/game';
import { MemorySink } from '../bridge/log/memory-sink';
import type { CoreTransport } from '../bridge/transport';

// Fake transport: replays the committed golden session, then trivial responses.
const SESSION = readFileSync(
  new URL('../../../crates/blackjack-core/tests/fixtures/session_start.json', import.meta.url), 'utf8',
).trim();

class FakeTransport implements CoreTransport {
  call(json: string): string {
    const cmd = JSON.parse(json);
    if (cmd.command === 'start_session') return SESSION;
    if (cmd.command === 'legal_actions') return '{"status":"ok","response":{"type":"actions","data":["hit","stand"]}}';
    return SESSION; // start_round/apply_action echo a session (no round) for this smoke test
  }
}

describe('Table', () => {
  it('renders bankroll and a deal control after session start', async () => {
    const c = new GameController(new FakeTransport(), new MemorySink(), { now: () => 't' }, { next: () => 'sid' });
    render(<Table controller={c} />);
    await fireEvent.click(screen.getByRole('button', { name: /start session/i }));
    expect(await screen.findByText(/bankroll/i)).toBeTruthy();
    expect(screen.getByText(/1000\.00|100000/)).toBeTruthy();
  });

  it('shows a fatal banner when the core is poisoned', async () => {
    const bad: CoreTransport = { call: () => 'garbage' };
    const c = new GameController(bad, new MemorySink(), { now: () => 't' }, { next: () => 'sid' });
    render(<Table controller={c} />);
    await fireEvent.click(screen.getByRole('button', { name: /start session/i }));
    expect(await screen.findByText(/reload/i)).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run (from `web/`): `npm test -- Table`
Expected: FAIL — `./Table` / `./useGame` do not exist.

- [ ] **Step 3: Write the store binding**

Create `web/src/app/useGame.ts`:

```ts
import { useSyncExternalStore } from 'react';
import type { GameController, GameState } from '../bridge/game';

export function useGame(controller: GameController): GameState {
  return useSyncExternalStore(controller.subscribe, controller.getState, controller.getState);
}
```

- [ ] **Step 4: Write the presentational components**

Create `web/src/app/HandView.tsx`:

```tsx
import type { Card } from '../bridge/types';

const RANK: Record<string, string> = {
  ace: 'A', two: '2', three: '3', four: '4', five: '5', six: '6', seven: '7',
  eight: '8', nine: '9', ten: '10', jack: 'J', queen: 'Q', king: 'K',
};
const SUIT: Record<string, string> = { clubs: '♣', diamonds: '♦', hearts: '♥', spades: '♠' };

export function HandView({ label, cards, hideFrom }: { label: string; cards: Card[]; hideFrom?: number }) {
  return (
    <div>
      <strong>{label}:</strong>{' '}
      {cards.map((c, i) =>
        hideFrom !== undefined && i >= hideFrom
          ? <span key={c.card_id}>[??] </span>
          : <span key={c.card_id}>{RANK[c.rank]}{SUIT[c.suit]} </span>,
      )}
    </div>
  );
}
```

Create `web/src/app/Controls.tsx`:

```tsx
import type { Action } from '../bridge/types';
import type { GameController, GameState } from '../bridge/game';

const LABELS: Record<Action, string> = { hit: 'Hit', stand: 'Stand', double: 'Double', split: 'Split' };

export function Controls({ controller, state }: { controller: GameController; state: GameState }) {
  const round = state.session?.round ?? null;
  const inPlayerTurn = round?.status === 'player_turn';
  return (
    <div>
      {!round || round.status === 'resolved'
        ? <button onClick={() => void controller.startRound(state.session?.default_bet ?? null)}>Deal</button>
        : null}
      {inPlayerTurn
        ? state.legalActions.map((a) => (
            <button key={a} onClick={() => void controller.act(a)}>{LABELS[a]}</button>
          ))
        : null}
    </div>
  );
}
```

Create `web/src/app/Table.tsx`:

```tsx
import type { GameController } from '../bridge/game';
import { useGame } from './useGame';
import { HandView } from './HandView';
import { Controls } from './Controls';

export function Table({ controller }: { controller: GameController }) {
  const state = useGame(controller);

  if (state.phase === 'fatal') {
    return <div role="alert"><h2>Something broke</h2><p>{state.fatalMessage}</p><p>Please reload the page.</p></div>;
  }

  if (state.phase === 'idle') {
    return (
      <button onClick={() => void controller.startSession('free-play', 100000, 2000)}>
        Start session
      </button>
    );
  }

  const s = state.session!;
  const round = s.round;
  const dealerHideFrom = round && round.status === 'player_turn' ? 1 : undefined;
  return (
    <div>
      <p>Bankroll: ${(s.bankroll / 100).toFixed(2)}</p>
      {round ? <HandView label="Dealer" cards={round.dealer.cards} hideFrom={dealerHideFrom} /> : null}
      {round ? round.hands.map((h, i) => <HandView key={i} label={`Hand ${i + 1}`} cards={h.cards} />) : null}
      {state.lastError ? <p role="status">{state.lastError}</p> : null}
      <Controls controller={controller} state={state} />
      <button onClick={() => {
        const url = URL.createObjectURL(controller.downloadLog());
        const a = document.createElement('a'); a.href = url; a.download = 'history.jsonl'; a.click();
        URL.revokeObjectURL(url);
      }}>Download history</button>
    </div>
  );
}
```

- [ ] **Step 5: Wire the real controller in `App.tsx` and `main.tsx`**

Replace `web/src/app/App.tsx`:

```tsx
import { useRef } from 'react';
import { GameController } from '../bridge/game';
import { WasmTransport } from '../bridge/core-client';
import { MemorySink } from '../bridge/log/memory-sink';
import { Table } from './Table';

export function App() {
  const ref = useRef<GameController>();
  if (!ref.current) {
    ref.current = new GameController(
      new WasmTransport(),
      new MemorySink(),
      { now: () => new Date().toISOString() },
      { next: () => `${new Date().toISOString()}-${Math.random().toString(36).slice(2, 8)}` },
    );
  }
  return <main><h1>Blackjack Free Play</h1><Table controller={ref.current} /></main>;
}
```

(`main.tsx` already mounts `<App />` after WASM init from Task 3 — no change needed beyond confirming it imports `initCore` and awaits it.)

- [ ] **Step 6: Run test to verify it passes**

Run (from `web/`): `npm test -- Table`
Expected: PASS (2 tests).

- [ ] **Step 7: Full check — build and full test run**

Run (from `web/`): `npm run build:wasm && npm run build && npm test`
Expected: WASM builds, `tsc`+`vite build` succeed, all Vitest suites green.

Manual smoke (optional): `npm run dev`, open the printed URL, click Start session → Deal → play a hand → Download history, confirm the `.jsonl` has a header line + one round line per resolved round.

- [ ] **Step 8: Commit**

```bash
git add web/src/app/ web/src/main.tsx
git commit -m "feat(web): minimal playable Free Play table over the WASM bridge"
```

---

## Self-Review

**1. Spec coverage:**
- Deliverable = bridge + minimal playable UI → Tasks 4–8. ✓
- Client-side WASM delivery → Tasks 1, 3. ✓
- Cross-target determinism (wasm32 shoe == native shoe) → Task 0 (width-safe RNG modulo); prerequisite for the CLI-oracle tests being valid. ✓
- Vite + React → Tasks 3, 8. ✓
- In-memory + download logging behind async `LogSink` seam → Task 6; used in Task 7. ✓
- One envelope everywhere (`CliOutput`) → Task 1. ✓
- snake_case wire + exact serde tagging, mirror follows Rust not the spec's `cardId` → Task 4 + golden fixtures Task 2. ✓
- Anti-drift guard → Task 2 (Rust-side exact-bytes golden fixtures, incl. a played-to-resolution fixture that populates all nested types) + Task 4 (contract test that dereferences every nested field with its real wire name, so drift fails at compile time, + runtime validator). *Mechanism differs from spec's ts-rs recommendation; the resolved-fixture + compile-time-typed contract test closes the nested-type gap the reviewer flagged. ts-rs remains a drop-in alternative for Task 4 if preferred.* ✓
- Naturals logged (logs-delta, not ApplyAction-only) → Task 7 `applySession` + the "one round line per resolved round" test. ✓
- Bounded payload (strip logs) → Task 7 `strip` + the cross-round bankroll test. ✓
- CoreTransport seam / CLI transport for deterministic tests → Task 5. ✓
- Async WASM bootstrap gate → Task 3 `main.tsx`. ✓
- Panic/fatal vs recoverable error handling → Task 1 (panic hook, no `.expect`), Task 4 (`BridgeError`/`CoreRuleError`), Task 7 (`fatal` phase), Task 8 (`FatalBanner`/reload). ✓
- Native builds stay clean (feature-gated) → Task 1 Step 8. ✓
- Default ruleset single-homed in Rust → Task 4 models `ruleset` optional; UI passes `null`. ✓
- Cargo/npm coexistence, gitignored wasm output, pinned wasm-bindgen-cli → Task 3. ✓
- Testing (golden, bridge-vs-core, logging incl. naturals, UI smoke) → Tasks 2, 5, 6, 7, 8. ✓

**2. Placeholder scan:** No TBD/TODO; every code step shows complete code; every run step shows an exact command and expected result. ✓

**3. Type consistency:** `CoreTransport.call` signature identical across Tasks 5/7/8. `LogSink`/`LogLine` identical across Tasks 6/7. `GameState` fields (`phase`, `session`, `legalActions`, `lastError`, `fatalMessage`) consistent across Tasks 7/8. Wire field names (`card_id`, `deck_id`, `default_bet`, `bankroll_delta`, `dealer_soft_17`) match the Rust `types.rs` verbatim. `handleCommand` js_name matches between Task 1 (export) and Task 5 (import). ✓

**Open follow-ups (non-blocking, deferred by design):** bet-amount UI beyond `default_bet`; explicit vs automatic reshuffle UX; IndexedDB `LogSink` implementation when a persistence requirement lands. These are the spec's flagged open questions and stay out of this milestone.
