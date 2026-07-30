// The note log: one append-only collector every surface writes into, exported as JSONL.
//
// Deliberately NOT routed through the free-play LogSink. That sink's round line carries its own
// proven `note` field with attach-on-Deal buffering and its own tests (QA-003, QA-007 rescue), and
// putting trainer notes through it would mean touching a path that already works. This is a second,
// parallel channel with the same posture — async writes, swappable storage, lossless export — that
// free play can also write into via "note now" without changing how per-hand notes flush.
//
// Export lands in `journal/qa/notes/`, NOT in `data/history/`. `/data/history/*` is gitignored —
// gameplay logs are personal and `origin` is public — so a note exported there could never travel
// back into the repo where the design it concerns lives. Notes are design findings, so they go to
// the tracked QA surface and get triaged into `journal/qa/ledger.md`.

import { tuning, type TuningStore } from '../tuning/store';
import { NOTE_SCHEMA_VERSION, type NoteAnchor, type NoteKind, type NoteLine, type PlaytestNote } from './types';

export type NoteLogDeps = {
  clock: { now: () => string };
  ids: { next: () => string };
  tuning: TuningStore;
};

const defaultDeps = (): NoteLogDeps => ({
  clock: { now: () => new Date().toISOString() },
  ids: { next: () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}` },
  tuning,
});

export class NoteLog {
  private lines: NoteLine[] = [];
  private notes: PlaytestNote[] = [];
  private listeners = new Set<() => void>();
  /** Monotonic; `list()` allocates, so useSyncExternalStore subscribes to this instead. */
  private revision = 0;
  private readonly deps: NoteLogDeps;
  readonly sessionId: string;

  constructor(deps: Partial<NoteLogDeps> = {}) {
    this.deps = { ...defaultDeps(), ...deps };
    this.sessionId = this.deps.ids.next();
    this.lines.push({
      type: 'note_session_header',
      schema_version: NOTE_SCHEMA_VERSION,
      session_id: this.sessionId,
      started_at: this.deps.clock.now(),
      params: this.deps.tuning.stamp(),
    });
  }

  subscribe = (fn: () => void): (() => void) => {
    this.listeners.add(fn);
    return () => { this.listeners.delete(fn); };
  };

  /**
   * Records a note. Blank and whitespace-only text is dropped and reported as not-added, so an
   * accidental empty submit cannot pad the export with rows that say nothing — the free-play
   * `note` field takes the same position (blank ⇒ null).
   */
  add = (kind: NoteKind, text: string, anchor: NoteAnchor): PlaytestNote | null => {
    const trimmed = text.trim();
    if (trimmed === '') return null;
    const note: PlaytestNote = {
      type: 'note',
      schema_version: NOTE_SCHEMA_VERSION,
      note_id: this.deps.ids.next(),
      session_id: this.sessionId,
      ts: this.deps.clock.now(),
      kind,
      text: trimmed,
      anchor,
      params: this.deps.tuning.stamp(), // stamped per note: overrides may change mid-session
    };
    this.lines.push(note);
    this.notes.push(note);
    this.revision += 1;
    for (const fn of this.listeners) fn();
    return note;
  };

  getRevision = (): number => this.revision;

  /** Newest first, for display. */
  list = (): PlaytestNote[] => [...this.notes].reverse();

  count = (): number => this.notes.length;

  /** JSONL: header line, then one line per note, in the order they were written. */
  toJsonl = (): string => this.lines.map((line) => JSON.stringify(line)).join('\n') + '\n';

  export = (): Blob => new Blob([this.toJsonl()], { type: 'application/x-ndjson' });

  /** Plain-text digest — a readable fallback when a file is more friction than the note is worth. */
  toText = (): string => {
    const header = [`# Playtest notes — session ${this.sessionId}`, `# params ${this.deps.tuning.stamp().version}`, ''];
    const body = this.notes.map((note) => {
      const where = [note.anchor.surface, note.anchor.detail].filter(Boolean).join(' · ');
      return `- [${note.kind}] ${where}\n  ${note.text}`;
    });
    return [...header, ...(body.length > 0 ? body : ['(no notes)'])].join('\n') + '\n';
  };
}
