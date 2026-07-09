// @vitest-environment node
// Runs under the node env (not the project-default jsdom) because Vite's
// static `new URL(url, import.meta.url)` asset transform resolves against
// jsdom's fake http://localhost:3000/ origin under jsdom, breaking this
// filesystem existence check.
import { existsSync } from 'node:fs';
import { describe, it, expect } from 'vitest';

describe('wasm build output', () => {
  it('exists (run `npm run build:wasm` first)', () => {
    expect(existsSync(new URL('./bridge/wasm/blackjack_core.js', import.meta.url))).toBe(true);
  });
});
