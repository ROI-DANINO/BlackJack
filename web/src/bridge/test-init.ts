import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import initCore from './wasm/blackjack_core';

let ready: Promise<unknown> | null = null;

function wasmBytes(): Buffer {
  // Node env: import.meta.url is a file: URL → read it directly.
  // jsdom env (Vitest "web" transform): import.meta.url is http: → fall back to a
  // cwd-relative path (Vitest runs from web/).
  const url = new URL('./wasm/blackjack_core_bg.wasm', import.meta.url);
  return url.protocol === 'file:'
    ? readFileSync(url)
    : readFileSync(resolve(process.cwd(), 'src/bridge/wasm/blackjack_core_bg.wasm'));
}

/** Init the WASM core for Vitest (node + jsdom): Node's fetch can't load the wasm
 *  file: URL, so read the bytes and pass them to initCore() as a single object
 *  (avoids the deprecated positional form's warning). Memoized per process. */
export function initCoreForTest(): Promise<unknown> {
  if (!ready) ready = Promise.resolve(initCore({ module_or_path: wasmBytes() }));
  return ready;
}
