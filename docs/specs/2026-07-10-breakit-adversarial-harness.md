# Breakit — Adversarial E2E Abuse Harness

> Design spec. Status: approved for build 2026-07-10. Source of truth for the breakit harness
> until superseded. Implementation plan (if any) lives in `docs/plans/`.

## Purpose

Manual double-clicking barely probes the app. A real adversary — or just a fast, hostile user
with devtools — hammers the *running* app programmatically. Breakit is a repeatable harness
that drives the live browser build with adversarial input and timing, then asserts invariants
that must **never** break. It is a **living** harness: every milestone QA adds attacks for the
new surface, and "run breakit" gates the milestone.

This is a **local, no-backend training tool** — no auth, no network, no user data. So "break"
means **correctness + robustness + integrity**, not classic pentest (there is no server, login,
or datastore to attack). Concretely: corrupt game state, wrong blackjack results, broken/dup
history, panics/hangs, stuck UI, determinism violations.

## Scope decisions (locked)

- **Target layer:** full browser E2E abuse (drive the real running app), per user choice.
- **Attack depth:** *both* realistic-user abuse **and** injected attacks via `page.evaluate`.
- **Injection hook gating:** **env-gated, stripped from prod** (option 1). Hook mounts only under
  a breakit/DEV flag; the normal production build tree-shakes it out.
- **Reporting:** **report file + non-zero exit** (option 1). Writes a run report; exits non-zero
  on any break so it can gate a milestone. Does **not** auto-edit the ledger — breaks are triaged
  into `QA-NNN` rows deliberately by a human/session.
- **Tooling:** standalone `playwright` library (NOT the Playwright MCP, which is broken here —
  see memory `env-playwright-mcp-broken`). Uses Playwright's **bundled chromium** already in
  `~/.cache/ms-playwright/`. No new browser install. **Not** routed through Feather/hermes —
  Feather's careful sequential observe→act loop is the opposite of what abuse needs, and coupling
  to a separate private repo violates the "small boundaries" constraint in AGENTS.md.

## Architecture

```
web/breakit/
  run.ts            # entrypoint: boot preview server, launch chromium, run battery, report, exit code
  server.ts         # start `vite preview` with breakit env flag; return baseUrl; teardown
  browser.ts        # launch bundled chromium headless; new context per attack (isolated downloads dir)
  oracle.ts         # invariant checks over exported JSONL + console + DOM state
  attacks/
    realistic.ts    # UI-only abuse (clicks, spam, grind, refresh, multi-tab)
    injected.ts     # page.evaluate against window.__breakit (concurrency, malformed input, bad notes)
  report.ts         # assemble per-attack pass/fail + repro; write to journal/qa/runs/<date>-breakit/
  types.ts          # Attack, AttackResult, Invariant, RunReport shapes
```

- **App-side change (only this):** a dev-only hook, mounted in `web/src/` guarded by
  `import.meta.env.DEV || import.meta.env.VITE_BREAKIT`. It attaches `window.__breakit` exposing
  the bridge/game internals the UI already uses (`game.ts` deal/act/download/new-session,
  `core-client`, current snapshot). Wrapped so a normal `npm run build` strips it entirely.
  Breakit's preview server sets `VITE_BREAKIT=1`.
- **Determinism:** breakit runs against `vite preview` of a fresh `npm run build` — no HMR, stable
  artifact. The predev/pretest wasm-freshness guard applies; breakit's script must fail loudly if
  WASM is stale (reuse `scripts/check-wasm-fresh.sh`).
- **Isolation:** each attack runs in its own browser context with its own downloads directory
  under the scratch/run dir, so JSONL artifacts never collide across attacks.

### Boundaries (unit responsibilities)

- `server.ts` — owns process lifecycle of the preview server; knows nothing about attacks.
- `browser.ts` — owns Chromium/context/download-dir; knows nothing about invariants.
- `attacks/*` — each attack is `(page, ctx) => Promise<Artifacts>`; produces artifacts (downloaded
  JSONL paths, console log, timing) but makes **no** assertions.
- `oracle.ts` — pure functions `(artifacts) => Invariant[]`; the only place "pass/fail" is decided.
- `report.ts` — formats results; owns no logic about what passed.

This keeps the attack list and the invariant list independently extensible — the two axes that
grow every milestone.

## Attack catalog (V1 — grows per milestone)

**Realistic (UI only):**
1. Same-tick / parallel **Deal** clicks (fire N clicks within one frame).
2. **Download history** spam (double/triple-click; concurrent with Deal).
3. **New session** spam; New-session immediately after resolve without dealing (QA-007 path).
4. Interleave Deal + Download + New-session in one tight loop.
5. Long grind — hundreds of rounds to shoe reshuffle and past it; watch for stuck state / leaks.
6. Refresh mid-write (reload right after an action that buffers a round line).
7. Two tabs on the same origin acting concurrently (multi-tab race).

**Injected (`page.evaluate` → `window.__breakit`):**
8. Concurrent internal calls the UI serializes (e.g. two `deal()` / act calls without awaiting).
9. Malformed action envelopes fed at the bridge boundary (illegal action, out-of-turn, bad shape).
10. Control-char / newline / very-long **note** injection (QA-013 territory) → assert JSONL stays
    one valid record per line, no injection into structure.
11. Download while a write is in flight (exercise the `writePending` claim-before-await window the
    ledger flagged for V2).

## Oracle — invariants (a break = any failure)

Assert over the **exported JSONL** (the machine-checkable truth artifact), console, and DOM:

- **History integrity:** no duplicate `round_index`; monotonic ordering; exactly one
  `session_header` per session id; every round's `session_id` matches its header.
- **Seed integrity:** `session_header.seed` equals the on-screen seed value (not just the label);
  New session changes the seed; same seed ⇒ identical shoe (determinism).
- **Session flush:** New-session-after-resolve writes the prior buffered round under the **old**
  `session_id`, before the new header (QA-007).
- **Money conservation:** bankroll == starting ± Σ(per-round deltas) across the run.
- **Card conservation:** within a shoe, no card instance dealt twice; shoe depletion/reshuffle is
  consistent (derive from reveal order in the JSONL).
- **No crashes:** zero uncaught console errors/warnings; no page crash; no hang (per-attack
  timeout).
- **No stuck UI:** after each attack, controls remain responsive (a fresh Deal still works).

Each invariant is checked per-attack where meaningful and once globally at run end.

## Reporting

- Writes `journal/qa/runs/<date>-breakit/report.md` (+ `report.json`) with: run metadata (commit,
  build hash, chromium version), per-attack pass/fail, and for each break a **repro** (attack name,
  seed, action sequence, offending JSONL/console excerpt).
- **Exit non-zero** if any invariant broke; zero otherwise. Enables milestone gating and future CI.
- Does **not** mutate the ledger. A human/session triages breaks into `QA-NNN` rows.

## Milestone cadence (living harness)

- Add `npm run breakit` to `web/package.json`.
- One-line rule into `docs/specs/qa-playtest-process.md`: **every milestone QA runs breakit; a
  non-zero exit blocks the phase boundary.**
- One-line pointer in `journal/qa/ledger.md` (Coverage areas or a Run-log note) so breakit runs
  are recorded like other QA runs.
- Each new feature milestone **extends** `attacks/` and `oracle.ts` for the new surface (e.g. V2
  Basic Strategy: assert hint/decision correctness holds under abuse).

## Testing the harness itself

- `oracle.ts` invariant functions are pure ⇒ unit-tested with vitest against hand-built good/bad
  JSONL fixtures (including a known-dup and a known-seed-mismatch that must FAIL).
- A smoke attack that is known-safe must PASS; a deliberately-broken fixture must FAIL — proving
  the harness can actually detect breaks (guard against a no-op green harness).

## Out of scope (V1)

- Network/resource abuse (throttle, offline, memory pressure), localStorage/URL fuzzing, clock
  manipulation — the "kitchen sink" tier. Revisit if a milestone needs it.
- CI wiring — the non-zero exit makes it CI-ready, but actually adding a workflow is deferred.
- Attacking Feather/hermes — explicitly a different objective (dogfooding the executor), not this.

## Risks / notes

- The `window.__breakit` hook is the one prod-surface change; the env guard + a build-output check
  (assert the hook symbol is absent from a normal `npm run build`) keep it out of shipped code.
- Injected concurrency may surface *real* bugs (e.g. the V2 `writePending` async-sink hazard the
  ledger already flagged) — that is the point; triage into QA-NNN.
- Breakit depends on stable button labels / DOM hooks; prefer `data-testid` or role/text targeting
  added minimally to the app if current selectors are brittle.
