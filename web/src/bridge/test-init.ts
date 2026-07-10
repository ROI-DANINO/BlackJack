import { readFileSync } from 'node:fs';
import initCore from './wasm/blackjack_core';

let ready: Promise<unknown> | null = null;

/** Init the WASM core for Vitest (node/jsdom): Node's fetch can't load the wasm
 *  file: URL, so read the bytes and pass them to initCore(). Memoized per process. */
export function initCoreForTest(): Promise<unknown> {
  if (!ready) {
    ready = Promise.resolve(initCore({ module_or_path: readFileSync(new URL('./wasm/blackjack_core_bg.wasm', import.meta.url)) }));
  }
  return ready;
}
