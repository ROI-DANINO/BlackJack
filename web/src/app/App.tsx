import { useRef, useState } from 'react';
import { WasmTransport } from '../bridge/core-client';
import { MemorySink } from '../bridge/log/memory-sink';
import { GameController } from '../bridge/game';
import { Table } from './Table';
import { Learn } from './Learn';

type Mode = 'free_play' | 'learn';

export function App() {
  const game = useRef<GameController | null>(null);
  const [mode, setMode] = useState<Mode>('free_play');

  if (!game.current) {
    game.current = new GameController(
      new WasmTransport(), new MemorySink(),
      { now: () => new Date().toISOString() },
      { next: () => `${new Date().toISOString()}-${Math.random().toString(36).slice(2, 8)}` },
    );
    // DEV-ONLY: expose bridge internals to the breakit adversarial harness. Vite inlines both
    // flags to literals, so in a normal production build this folds to `if (false || undefined)`
    // — a dead branch Rollup drops, tree-shaking breakit-hook.ts out entirely. breakit's preview
    // build sets VITE_BREAKIT=1 to keep it.
    if (import.meta.env.DEV || import.meta.env.VITE_BREAKIT) {
      void import('../breakit-hook').then((m) => m.mountBreakit(game.current!));
    }
  }

  return (
    <main>
      <nav>
        <button aria-pressed={mode === 'free_play'} onClick={() => setMode('free_play')}>Free Play</button>
        <button aria-pressed={mode === 'learn'} onClick={() => setMode('learn')}>Learn</button>
      </nav>

      {mode === 'free_play' && (<><h1>Blackjack Free Play</h1><Table controller={game.current} /></>)}

      {mode === 'learn' && <Learn />}
    </main>
  );
}
