// Learn unit-navigator. Owns the selected unit + its LessonController in React state and hands
// the controller to <Lesson> for rendering. Every unit is directly selectable; opening a unit
// constructs a FRESH LessonController so a completed unit replays cleanly. Prerequisites are shown
// as non-interactive metadata only — nothing is locked (V1 has no progress gating yet).
//
// The dev-only learn hook is imported dynamically from the statically-dead
// `if (import.meta.env.DEV || import.meta.env.VITE_BREAKIT)` branch, so a normal `npm run build`
// folds it to a dead branch and tree-shakes breakit-hook.ts out entirely.

import { useState } from 'react';
import { WasmTransport } from '../bridge/core-client';
import { BLACKJACK_BASICS } from '../learn/content/blackjack-basics';
import { LessonController } from '../learn/controller';
import { LearnEngine } from '../learn/engine';
import type { Unit } from '../learn/types';
import { Lesson } from './Lesson';
import { freshSeed } from './seed';

export function Learn() {
  const [controller, setController] = useState<LessonController | null>(null);

  const open = (unit: Unit) => {
    const next = new LessonController(
      new LearnEngine(new WasmTransport()),
      BLACKJACK_BASICS,
      unit,
      { seq: (() => { let value = 0; return () => value++; })(), freshSeed },
    );
    next.begin();
    setController(next);
    if (import.meta.env.DEV || import.meta.env.VITE_BREAKIT) {
      void import('../breakit-hook').then((module) => module.mountLearn(next));
    }
  };

  if (controller) return <Lesson controller={controller} onExit={() => setController(null)} />;

  return (
    <section>
      <h1>{BLACKJACK_BASICS.title}</h1>
      <ul>
        {BLACKJACK_BASICS.units.map((unit) => (
          <li key={unit.id}>
            <button onClick={() => open(unit)}>{unit.title}</button> — {unit.goal}
            {unit.prerequisites.length > 0 && (
              <span> (builds on: {unit.prerequisites.join(', ')})</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
