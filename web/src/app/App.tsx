import { useRef, useState } from 'react';
import { WasmTransport } from '../bridge/core-client';
import { MemorySink } from '../bridge/log/memory-sink';
import { GameController } from '../bridge/game';
import { DrillController } from '../drill/controller';
import { UNITS } from '../drill/units';
import { freshSeed } from './seed';
import { Table } from './Table';
import { Drill } from './Drill';

type Mode = 'free_play' | 'learn';

export function App() {
  const game = useRef<GameController | null>(null);
  const [mode, setMode] = useState<Mode>('free_play');
  const [drill, setDrill] = useState<DrillController | null>(null);

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

  function openUnit(index: number) {
    const c = new DrillController(new WasmTransport(), UNITS[index]!, freshSeed);
    c.begin();
    if (import.meta.env.DEV || import.meta.env.VITE_BREAKIT) {
      // mountDrill lands in Task 11; cast keeps this a type-safe no-op until then.
      void import('../breakit-hook').then((m) =>
        (m as unknown as { mountDrill?: (c: DrillController) => void }).mountDrill?.(c),
      );
    }
    setDrill(c);
  }

  return (
    <main>
      <nav>
        <button aria-pressed={mode === 'free_play'} onClick={() => setMode('free_play')}>Free Play</button>
        <button aria-pressed={mode === 'learn'} onClick={() => { setMode('learn'); setDrill(null); }}>Learn</button>
      </nav>

      {mode === 'free_play' && (<><h1>Blackjack Free Play</h1><Table controller={game.current} /></>)}

      {mode === 'learn' && !drill && (
        <section>
          <h1>Get to Know Blackjack</h1>
          <ul>{UNITS.map((u, i) => (
            <li key={u.id}><button onClick={() => openUnit(i)}>{u.title}</button> — {u.goal}</li>
          ))}</ul>
        </section>
      )}

      {mode === 'learn' && drill && <Drill controller={drill} />}
    </main>
  );
}
