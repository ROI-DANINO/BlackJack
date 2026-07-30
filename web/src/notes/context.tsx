// Note context: one NoteLog for the sitting, plus the anchor of whatever is currently on screen.
//
// The anchor is pushed UP by each surface rather than pulled down by the note UI, because only the
// surface knows what it is showing — Lesson knows its unit and step, free play knows its round
// index, and a future activity surface will know its activityId. The note UI stays ignorant of all
// three, which is what lets a new surface start anchoring notes without this file changing.

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import { NoteLog } from './log';
import type { NoteAnchor } from './types';

export const UNANCHORED: NoteAnchor = { surface: 'app', detail: null };

type NoteContextValue = {
  log: NoteLog;
  anchor: NoteAnchor;
  /** Idempotent: an equal anchor is ignored, so a surface may call this from a render effect. */
  setAnchor: (next: NoteAnchor) => void;
};

const NoteContext = createContext<NoteContextValue | null>(null);

export function NoteProvider({ children, log }: { children: ReactNode; log?: NoteLog }) {
  const held = useRef<NoteLog | null>(null);
  if (!held.current) held.current = log ?? new NoteLog();
  const [anchor, setAnchorState] = useState<NoteAnchor>(UNANCHORED);
  const serialized = useRef(JSON.stringify(UNANCHORED));

  const setAnchor = useCallback((next: NoteAnchor) => {
    const key = JSON.stringify(next);
    if (key === serialized.current) return; // guards a surface that rebuilds its anchor each render
    serialized.current = key;
    setAnchorState(next);
  }, []);

  const value = useMemo<NoteContextValue>(
    () => ({ log: held.current!, anchor, setAnchor }),
    [anchor, setAnchor],
  );
  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
}

export function useNotes(): NoteContextValue {
  const value = useContext(NoteContext);
  if (!value) throw new Error('useNotes must be used inside a <NoteProvider>');
  return value;
}
