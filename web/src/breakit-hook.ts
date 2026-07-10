// DEV-ONLY breakit hook. Mounted only under `import.meta.env.DEV || import.meta.env.VITE_BREAKIT`
// (see App.tsx), and imported dynamically from a statically-dead branch so a normal
// `npm run build` (no VITE_BREAKIT) tree-shakes this module out entirely. breakit's preview
// build sets VITE_BREAKIT=1 to keep it. NEVER import this from shipped code paths.
//
// It exposes ONLY the bridge/game internals the UI already drives, so injected attacks can
// call them via page.evaluate without any new engine surface.

import type { Action } from './bridge/types';
import type { GameController } from './bridge/game';
import { WasmTransport } from './bridge/core-client';
import { freshSeed } from './app/seed';

// Mirror Table.tsx's session constants (dev-only duplication; not shipped).
const START_BANKROLL = 100000; // cents
const DEFAULT_BET = 2000; // cents

export interface BreakitHook {
  controller: GameController;
  /** Raw WASM transport for feeding malformed envelopes at the core boundary. */
  transport: WasmTransport;
  deal: () => Promise<void>;
  /** Accepts any string so injected attacks can send illegal/out-of-turn actions. */
  act: (action: string) => Promise<void>;
  newSession: () => Promise<void>;
  startSession: (seed?: string, bankroll?: number, bet?: number) => Promise<void>;
  /** Flush + export the current JSONL as text (no file download needed). */
  downloadText: () => Promise<string>;
  setNote: (text: string) => void;
  getState: () => ReturnType<GameController['getState']>;
  freshSeed: () => string;
  version: string;
}

export function mountBreakit(controller: GameController): void {
  const hook: BreakitHook = {
    controller,
    transport: new WasmTransport(),
    deal: () => controller.startRound(controller.getState().session?.default_bet ?? DEFAULT_BET),
    act: (action) => controller.act(action as Action),
    newSession: () => controller.startSession(freshSeed(), START_BANKROLL, DEFAULT_BET),
    startSession: (seed = freshSeed(), bankroll = START_BANKROLL, bet = DEFAULT_BET) =>
      controller.startSession(seed, bankroll, bet),
    downloadText: async () => (await controller.downloadLog()).text(),
    setNote: (text) => controller.setNote(text),
    getState: () => controller.getState(),
    freshSeed,
    version: 'breakit-hook-1',
  };
  (globalThis as unknown as { __breakit: BreakitHook }).__breakit = hook;
}
