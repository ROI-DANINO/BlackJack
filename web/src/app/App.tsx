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
  }
  return <main><h1>Blackjack Free Play</h1><Table controller={ref.current} /></main>;
}
