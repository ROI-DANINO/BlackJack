// Playtest notes — the shape of a thing you type while you are using the product.
//
// PRECEDENT, AND WHY IT IS BEING GENERALISED. Free play already has this: a per-hand note that
// attaches on Deal and rides out on the round's JSONL line (`bridge/game.ts`, `log/sink.ts`). Its
// first real use produced three product findings in a sixteen-round session — a possible
// split-legality bug, a per-hand win/lose/push indicator, and an insurance UI request
// (`journal/ops/run-notes.md`). That mechanism earned its keep, so the trainer gets it too. What
// it did NOT have is a surface-agnostic anchor, a kind, or any link to the constants in force,
// and all three are needed once notes come from an activity whose numbers are still being tuned.
//
// THE ANCHOR IS THE POINT. A note reading "this feels too long" is nearly useless without knowing
// which preset was live when you wrote it. A note carrying `anchor` plus `params` answers that
// from the record instead of from memory.

import type { ParamsStamp } from '../tuning/store';

export const NOTE_SCHEMA_VERSION = 1;

/**
 * Two kinds, because they get triaged differently. A change request is a thing to fix or decide;
 * an observation is evidence about whether the design works. Conflating them is how a bug report
 * ends up filed as a learning finding.
 */
export type NoteKind = 'change-request' | 'observation';

/**
 * Where the note was taken. Every field past `surface` is optional so a new surface can anchor a
 * note without this type changing — the future activity system supplies `activityId` and the
 * lesson flow supplies `unitId`/`stepId`, and neither has to know about the other.
 */
export type NoteAnchor = {
  /** Which part of the product: 'free-play', 'learn', 'unit-list', or a future activity surface. */
  surface: string;
  /** Human-readable "what was on screen", rendered back into the export so a note reads standalone. */
  detail: string | null;
  unitId?: string | null;
  stepId?: string | null;
  stepType?: string | null;
  activityId?: string | null;
  roundIndex?: number | null;
};

export type PlaytestNote = {
  type: 'note';
  schema_version: number;
  note_id: string;
  /** Groups every note from one sitting, so an export is readable as a session. */
  session_id: string;
  ts: string;
  kind: NoteKind;
  text: string;
  anchor: NoteAnchor;
  /** The constants in force when the note was written. This is what makes a tuning note actionable. */
  params: ParamsStamp;
};

export type NoteSessionHeader = {
  type: 'note_session_header';
  schema_version: number;
  session_id: string;
  started_at: string;
  /** Params at session open — the baseline any mid-session override is a deviation from. */
  params: ParamsStamp;
};

export type NoteLine = NoteSessionHeader | PlaytestNote;
