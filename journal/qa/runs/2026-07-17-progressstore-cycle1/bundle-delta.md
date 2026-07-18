# `idb` bundle-delta gate — cycle-1 ProgressStore, Task 6

- **Verdict: PASS.** Measured delta **1,382 bytes gzipped (≈1.35 KB)**, against a **>5 KB gzipped**
  alarm threshold (design §2.1). idb's conditional admission (`journal/decisions.md`, idb row,
  amended 2026-07-17) holds. Proceed to Task 7 against the `idb` adapter.
- **`idb` version: `8.0.3`**, pinned exactly in `web/package.json` (`"idb": "8.0.3"`, not
  `"^8.0.3"`) — matching AL-R2's LIB-001 artifact.
- **Toolchain:** `vite v5.4.21` (from the build console output, reproduced in "Commands run from
  `web/`" below). The Node version is **not** recorded: it did not appear in the console output
  captured for this measurement, and neither `web/package.json` nor `web/package-lock.json`
  declares an `engines.node` constraint. Noting the gap rather than guessing at a number; a future
  re-run should capture `node -v` alongside the build output.

## Why this measurement exists, and why it runs before the adapter

`docs/superpowers/specs/2026-07-17-progressstore-cycle1-design.md` §2.1 admitted `idb`
**conditionally**: the admission holds only if the real production bundle delta comes in under
5 KB gzipped. Nothing in cycle 1 imports the real adapter (`progress/idb-store.ts` does not exist
yet — no UI consumer, §3.1/§13.4), so building the app "with vs. without `idb`" today would measure
**zero**: an unused import is tree-shaken out of a production bundle. Measuring now, before the
adapter is written, means a failure here costs one throwaway probe file instead of three tasks of
adapter code (Tasks 7–9).

**The 5 KB line is an alarm with roughly 3× headroom, not a budget.** It does not exist to be
optimised toward, and a result close to it would not be "nearly failing" — it would mean `idb` is
not the thin wrapper it was admitted as. The measured 1.35 KB is comfortably under the alarm and
is reported as exactly that: `idb` is, in fact, the thin wrapper AL-R2 and the design expected.
There was no attempt to trim, cherry-pick a favourable import set, or otherwise tune this number —
the goal was to measure what a real adapter emits, not to engineer a pass.

## Method

### The probe

`web/qa/progress/bundle-probe.ts` imports exactly the runtime surface the real adapter needs —
`openDB` and `deleteDB` — plus the type-only `IDBPDatabase` (erased at compile time; free). It
exercises the shape `progress/idb-store.ts` will use: open a database with an `upgrade` callback
that creates an object store, close it, delete it.

**First attempt was wrong, and the fix matters to the result's validity.** The first version of
the probe exported `runBundleProbe` and relied on the export alone to prevent tree-shaking, per the
brief's "reference them from an exported function so they cannot be tree-shaken." Measured
directly: this was **not** sufficient. Nothing in the repo calls `runBundleProbe`, and Vite's
production build (not a library build; no `preserveEntrySignatures` forcing retention) is free to
prove an unused, side-effect-free export has no observable effect and drop the whole function body
— including the calls to `openDB` and `deleteDB` inside it. The first real-vs-stub build pair
measured a false **1.32 KB delta of collateral, not of the real thing**: Rollup dropped `openDB`
and `deleteDB` as unreachable in *both* builds, and the only thing left in the "real" build was
`idb`'s own always-run module-level Proxy-trap registration code, executed merely by importing the
package, independent of whether `openDB`/`deleteDB` are ever called.

The fix: the probe now also does

```ts
(globalThis as Record<string, unknown>).__blackjackProgressBundleProbe = runBundleProbe;
```

at module top level — a write to a property of an ambient, externally-observable object, which no
bundler can prove is side-effect-free. This forced genuine retention, confirmed by grepping the
built real-variant chunk for `indexedDB.open`/`indexedDB.deleteDatabase` (present) before trusting
the byte counts below. The corrected numbers are the ones reported in this file; the first,
uncorrected pair was discarded and is not a candidate result.

### Two builds, apples-to-apples

Both builds ran through **the same Vite production config** — a throwaway config
(`web/.probe.vite.config.ts`, deleted after measurement, never committed) built with
`mergeConfig(baseConfig, overrides)` against the real `web/vite.config.ts`, so `target`, `minify`,
and every other production setting are identical to the app's real build. The **only** override was
the build entry (the probe file instead of `index.html`) and, for build (b) only, a
`resolve.alias` swapping the bare `idb` specifier for a no-op stub of the same exported shape
(`openDB`, `deleteDB`, same call signatures, no real behavior). Nothing else differed between the
two invocations — same file, same config object, same flags, toggled only by a `PROBE_STUB` env
var that this file's `resolve.alias` branches on.

### The throwaway harness, inlined for reproducibility

Both `web/.probe.vite.config.ts` and the no-op `idb` stub were deliberately never committed (see
"What did NOT ship" below), and their exact original bytes were not captured verbatim anywhere at
the time — checked against this repo's full git history, including unreachable objects
(`git fsck --unreachable`), and neither file's content turned up. **What follows is a labelled
reconstruction from the prose description above (config shape, `mergeConfig` over the real
`web/vite.config.ts`, `PROBE_STUB`-gated `resolve.alias`, matching-signature no-op stub), not a
recovery of the original bytes.** It is offered so a future re-run has a concrete starting point
instead of having to re-derive the harness from prose alone — re-verify against the real `idb`
type signatures for the `idb` version in use before trusting it as-is.

`web/.probe.vite.config.ts` (reconstructed):

```ts
import { defineConfig, mergeConfig } from 'vite';
import baseConfig from './vite.config';

const isStub = process.env.PROBE_STUB === '1';

export default defineConfig(
  mergeConfig(baseConfig, {
    build: {
      outDir: isStub ? '.probe-dist/stub' : '.probe-dist/real',
      rollupOptions: {
        input: 'qa/progress/bundle-probe.ts',
      },
    },
    resolve: isStub
      ? {
          alias: {
            idb: '/qa/progress/idb.stub.ts',
          },
        }
      : undefined,
  }),
);
```

No-op `idb` stub, same exported shape (`openDB`, `deleteDB`) as the real package (reconstructed):

```ts
// No-op stand-in for the `idb` runtime surface bundle-probe.ts uses. Same call signatures as the
// real package's openDB/deleteDB; no IndexedDB calls, no real behavior. Used only via
// resolve.alias in .probe.vite.config.ts when PROBE_STUB=1.
export async function openDB(
  _name: string,
  _version?: number,
  _options?: unknown,
): Promise<{ close(): void }> {
  return { close() {} };
}

export async function deleteDB(_name: string): Promise<void> {
  return;
}
```

Commands run from `web/`:

```sh
npm install --save-exact idb@8.0.3

# build (a): real idb
npx vite build --config .probe.vite.config.ts
#   .probe-dist/real/assets/bundle-probe-ClUi49Fv.js   4.69 kB │ gzip: 1.67 kB

# build (b): no-op stub of the same shape, via resolve.alias
PROBE_STUB=1 npx vite build --config .probe.vite.config.ts
#   .probe-dist/stub/assets/bundle-probe-CaTuhy2Y.js   0.48 kB │ gzip: 0.28 kB
```

Vite's console gzip figures above are its own rounded estimate. The authoritative byte counts used
for the verdict were computed directly with Node's built-in `zlib` (no new dependency needed):

```sh
node -e "
const fs = require('fs'); const zlib = require('zlib'); const path = require('path');
function gzipSize(file) { const buf = fs.readFileSync(file); return { raw: buf.length, gzip: zlib.gzipSync(buf).length }; }
const realFile = path.join('.probe-dist/real/assets', fs.readdirSync('.probe-dist/real/assets')[0]);
const stubFile = path.join('.probe-dist/stub/assets', fs.readdirSync('.probe-dist/stub/assets')[0]);
const real = gzipSize(realFile), stub = gzipSize(stubFile);
console.log('real:', JSON.stringify(real));
console.log('stub:', JSON.stringify(stub));
console.log('delta gzip bytes:', real.gzip - stub.gzip);
"
```

Output:

```
real: {"raw":4692,"gzip":1666}
stub: {"raw":477,"gzip":284}
delta gzip bytes: 1382
```

(A cross-check at gzip level 9 gave 1664/284, delta 1380 — 2 bytes of level-dependent noise on an
already-small file; the default-level figures above are what is reported as the result.)

## Result

| | raw bytes | gzip bytes |
|---|---|---|
| (a) real `idb` (`openDB` + `deleteDB`, forced-reachable) | 4,692 | 1,666 |
| (b) no-op stub, same shape | 477 | 284 |
| **Delta (idb's emitted cost)** | **4,215** | **1,382 (≈1.35 KB)** |

- **Threshold:** > 5 KB gzipped ⇒ material ⇒ revert to native IndexedDB (design §2.1).
- **Measured delta:** ≈1.35 KB gzipped.
- **Verdict: PASS.** 1.35 KB is well under 5 KB — roughly 3.7× headroom, consistent with the
  design's "~3× headroom" framing. This is not a close call and is not reported as one.

## Apples-to-apples checklist

- Same Vite config object (`mergeConfig` over the real `web/vite.config.ts`) for both builds —
  same `target`, same `minify`, same plugin set.
- Same entry file (`web/qa/progress/bundle-probe.ts`) for both builds; only what `idb` resolves to
  changed, via `resolve.alias`, not by hand-editing the probe between runs.
- Same production mode (`vite build` defaults to `production`) for both.
- Verified by inspecting the built output, not just trusting sizes: the real-variant chunk
  contains genuine `indexedDB.open(...)` / `indexedDB.deleteDatabase(...)` calls; the stub-variant
  chunk contains the stub's own trivial no-op bodies and nothing from `idb`.
- The probe's own wrapper code costs ~0 bytes on its own (confirmed by the discarded first
  measurement, where an unforced, unreachable version of the exact same wrapper logic was
  tree-shaken to an empty chunk) — so the reported delta is attributable to `idb`, not to glue code
  written for this probe.

## Independent corroboration (from-scratch reproduction)

A second, independent run of this measurement was performed from scratch — its own throwaway Vite
config and its own no-op `idb` stub (leaner than the one reconstructed above), built without access
to the implementer's throwaway files, which were already deleted. Purpose: confirm the result is
reproducible from the method description alone, not an artifact of one specific probe/stub
pairing.

| | gzip bytes |
|---|---|
| (a) real `idb` (independent run) | 1,666 |
| (b) no-op stub (independent run, leaner shape) | 190 |
| **Delta (independent run)** | **1,476 (≈1.44 KB)** |

- **Real-side figure reproduced exactly**: 1,666 bytes gzipped — identical to the 1,666 recorded
  above. This is the strongest evidence that the real-`idb` measurement is stable and
  config-independent.
- **Stub-side figure did not reproduce**: 190 bytes vs. this document's 284 — a leaner no-op stub
  (fewer or smaller no-op bodies). That difference alone moved the delta from 1,382 (1.35 KB) to
  1,476 (1.44 KB), a swing of **~7%** attributable purely to stub shape, not to anything about the
  real `idb` build.
- **Anti-tree-shake check held in both runs**: the real build contains `indexedDB.open` and
  `indexedDB.deleteDatabase`; the stub build contains zero `indexedDB` occurrences.
- **Verdict is unaffected**: 1.35 KB and 1.44 KB both land far under the 5 KB alarm (≈3.7× and
  ≈3.4× headroom respectively). This is reported as corroboration of the PASS, not as a
  discrepancy to resolve.
- **This is exactly why the harness is inlined above.** A ~7% swing from stub shape alone, with the
  real side pinned exactly, means the number that moves under a version bump or a re-run is
  sensitive to a throwaway file most readers would assume is interchangeable. Without the config
  and stub preserved, a future re-run cannot tell whether a changed delta reflects a real change in
  `idb`'s emitted code or just a different stub.

**On future headroom (verified against `web/node_modules/idb/package.json` and
`web/node_modules/idb/build/index.js`):** `idb`'s `package.json` declares no `sideEffects` field,
and its single ESM entry point exports exactly four names — `export { deleteDB, openDB, unwrap,
wrap };` — its complete public surface. All four dispatch through one shared Proxy-wrapping
mechanism (`wrap` / `wrapFunction` / `idbProxyTraps` in `build/index.js`) that `openDB` already
pulls in to satisfy this measurement. A later adapter exercising more of the surface
(`transaction()`, `objectStore()`, cursors) would be calling methods on objects already Proxy-wrapped
via that same shared path, so it is unlikely to add meaningfully more bytes beyond what's measured
here — though this is inference from reading the source, not a repeat measurement, and the gate
should still be re-run if the adapter's real bundle delta is ever in question.

## What did NOT ship, and why that's fine

- `web/qa/progress/bundle-probe.ts` is committed (it is the Task 6 deliverable), but it is inert:
  - `web/tsconfig.json` is `"include": ["src"]`. Confirmed with
    `npx tsc --noEmit --listFiles | grep qa/` (empty output) — `qa/` was never part of the
    app's typecheck, before or after this task.
  - Nothing under `web/src` or `web/index.html` imports `web/qa/progress/bundle-probe.ts`, and
    Vite's real production build (`npm run build`) only follows the graph reachable from
    `index.html` → `src/main.tsx`. The probe was never reachable from the shipped bundle by
    construction — there was no separate "remove it from the build inputs" step needed beyond
    "don't import it from `src/`," which was never done.
  - Confirmed empirically: `npm --prefix web run build` after installing `idb` and adding the
    probe still produces `dist/assets/index-*.js` at **65.99 kB gzipped** — byte-identical to the
    pre-`idb` baseline recorded before this task. Neither `idb` nor the probe reached the app
    bundle.
- The throwaway measurement config (`web/.probe.vite.config.ts`) and its two output directories
  (`web/.probe-dist/`) were deleted after the byte counts above were captured. They are not part
  of this commit; `git status` was checked clean of them before committing.
- The no-op stub used for build (b) lived only in the session scratchpad, never in this repo.

## Boundary-test scan-root finding (reported, not weakened)

`web/src/progress/boundary.test.ts` enforces by AST that only `progress/idb-store.ts` may import
`idb` within `web/src` (its `progressFiles()` scan root is `web/src/progress/`; its wider
`srcFiles()` scan root, used for the fake-store check, is `web/src/`). Neither scan root reaches
`web/qa/progress/bundle-probe.ts`, because the probe lives under `web/qa/`, a sibling of `web/src/`,
not a descendant of it — exactly where the task brief required it to live ("never `web/src/`").
This is a correct non-finding, not a gap: the boundary test's job is to keep `web/src/progress/`'s
single-`idb`-importer rule true of the **shipping module**, and the probe is deliberately outside
that module's directory tree by construction, so there is nothing for the existing scan to
(or that it should) reach. The boundary test was not modified.

## Verification

- `npm --prefix web run test` — 279/279 passed (26 test files), unchanged from before this task.
- `npm --prefix web run build` — clean (`tsc --noEmit && vite build`); app bundle
  `65.99 kB gzipped`, unchanged from the recorded pre-`idb` baseline.
- `web/package.json`: `"idb": "8.0.3"` (exact, no caret). `package-lock.json` updated to match.
