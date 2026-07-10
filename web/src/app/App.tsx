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
    // DEV-ONLY: expose bridge internals to the breakit adversarial harness. Vite inlines both
    // flags to literals, so in a normal production build this folds to `if (false || undefined)`
    // — a dead branch Rollup drops, tree-shaking breakit-hook.ts out entirely. breakit's preview
    // build sets VITE_BREAKIT=1 to keep it.
    if (import.meta.env.DEV || import.meta.env.VITE_BREAKIT) {
      const controller = ref.current;
      void import('../breakit-hook').then((m) => m.mountBreakit(controller));
    }
  }
  return <main><h1>Blackjack Free Play</h1><Table controller={ref.current} /></main>;
}
