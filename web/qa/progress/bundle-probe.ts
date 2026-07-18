// Bundle-delta measurement probe for the `idb` library's conditional admission (task 6;
// design §2.1: docs/superpowers/specs/2026-07-17-progressstore-cycle1-design.md;
// journal/decisions.md, idb row, amended 2026-07-17).
//
// This file is NOT part of the app. It lives under web/qa/, which web/tsconfig.json's
// `"include": ["src"]` already excludes from the app's typecheck, and it is never imported from
// web/src or web/index.html, so it is not part of the production build's entry graph either
// (index.html -> src/main.tsx). See journal/qa/runs/2026-07-17-progressstore-cycle1/bundle-delta.md
// for the throwaway measurement build that consumes this file, the exact commands, and the
// recorded verdict.
//
// Why this probe has to exist at all: nothing in cycle 1 imports the real
// `progress/idb-store.ts` adapter (design §3.1) — there is no UI consumer yet (§13.4). Building
// the app "with vs without idb" today would measure **zero**, because an unused import is
// tree-shaken out of a production bundle. This probe supplies the missing consumer: it imports
// exactly the `idb` runtime surface the adapter will use — `openDB` and `deleteDB` — and
// references both from an EXPORTED function, so a production bundler cannot tree-shake them away.
// `IDBPDatabase` below is a type-only import; it is erased at compile time and costs nothing in
// the measured bundle.

import { openDB, deleteDB, type IDBPDatabase } from 'idb';

/**
 * Exercises the shape of idb usage `progress/idb-store.ts` needs: open a database with an
 * `upgrade` callback that creates an object store (the adapter's `meta` store, design §5.1),
 * close the connection, then delete the database. Exported so the production bundler must keep
 * `openDB` and `deleteDB` reachable — this is the entire point of the probe.
 */
export async function runBundleProbe(namespace: string): Promise<IDBPDatabase | null> {
  const db = await openDB(namespace, 1, {
    upgrade(database) {
      if (!database.objectStoreNames.contains('meta')) {
        database.createObjectStore('meta', { keyPath: 'id' });
      }
    },
  });
  db.close();
  await deleteDB(namespace);
  return null;
}

// Forces retention through a production bundler. An export alone is not enough: nothing in this
// repo calls `runBundleProbe`, so a bundler that proves an unused export has no observable effect
// is free to dead-code-eliminate the WHOLE function body — including the calls to `openDB` and
// `deleteDB` inside it — same as it would eliminate an unused stub. Measured directly: the first
// version of this probe omitted this line and produced a false near-zero delta, because Rollup
// dropped `openDB`/`deleteDB` themselves as unreachable and only idb's own always-run module-level
// Proxy-trap registration (executed merely by importing 'idb') survived. Assigning to a property of
// `globalThis` is a write a bundler cannot prove is side-effect-free (globalThis is an ambient,
// externally-observable object), so this reference is never removed, and it is genuinely how a
// real adapter would be reachable from outside the module.
(globalThis as Record<string, unknown>).__blackjackProgressBundleProbe = runBundleProbe;
