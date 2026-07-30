import { describe, it, expect } from 'vitest';
import { NoteLog } from './log';
import { TuningStore } from '../tuning/store';
import type { NoteAnchor } from './types';

const anchor = (over: Partial<NoteAnchor> = {}): NoteAnchor => ({
  surface: 'learn', detail: 'unit u1 · question q3', unitId: 'u1', stepId: 'q3', stepType: 'question', ...over,
});

function makeLog(tuningStore = new TuningStore({})) {
  let n = 0;
  return new NoteLog({
    clock: { now: () => `2026-07-30T00:00:0${n}Z` },
    ids: { next: () => `id-${n++}` },
    tuning: tuningStore,
  });
}

describe('NoteLog', () => {
  it('opens with a session header carrying the params baseline', () => {
    const log = makeLog();
    const header = JSON.parse(log.toJsonl().split('\n')[0]!);
    expect(header.type).toBe('note_session_header');
    expect(header.session_id).toBe(log.sessionId);
    expect(header.params.overrides).toEqual({});
  });

  it('records a note with its kind, anchor and params stamp', () => {
    const log = makeLog();
    const note = log.add('change-request', '  splits should be offered here  ', anchor());
    expect(note).not.toBeNull();
    expect(note!.kind).toBe('change-request');
    expect(note!.text).toBe('splits should be offered here'); // trimmed
    expect(note!.anchor.stepId).toBe('q3');
    expect(note!.session_id).toBe(log.sessionId);
    expect(log.count()).toBe(1);
  });

  it('drops blank and whitespace-only text, matching the free-play blank⇒null position', () => {
    const log = makeLog();
    expect(log.add('observation', '', anchor())).toBeNull();
    expect(log.add('observation', '   \n  ', anchor())).toBeNull();
    expect(log.count()).toBe(0);
    expect(log.toJsonl().trimEnd().split('\n')).toHaveLength(1); // header only
  });

  it('stamps each note with the params in force AT THE TIME, not at session open', () => {
    // The reason this matters: change a preset mid-session and the notes either side of the change
    // must be distinguishable, or a tuning note cannot be attributed to the numbers that caused it.
    const store = new TuningStore({});
    const log = makeLog(store);
    const before = log.add('observation', 'felt about right', anchor())!;
    store.setOverride('session.presets.standard.maxActivities', 20);
    const after = log.add('observation', 'now it drags', anchor())!;
    expect(before.params.overrides).toEqual({});
    expect(after.params.overrides).toEqual({ 'session.presets.standard.maxActivities': 20 });
  });

  it('exports JSONL: header first, notes in written order, trailing newline', () => {
    const log = makeLog();
    log.add('observation', 'first', anchor());
    log.add('change-request', 'second', anchor({ surface: 'free-play', roundIndex: 4 }));
    const text = log.toJsonl();
    expect(text.endsWith('\n')).toBe(true);
    const lines = text.trimEnd().split('\n').map((l) => JSON.parse(l));
    expect(lines.map((l) => l.type)).toEqual(['note_session_header', 'note', 'note']);
    expect(lines[1].text).toBe('first');
    expect(lines[2].anchor.roundIndex).toBe(4);
  });

  it('lists newest first for display while the export stays chronological', () => {
    const log = makeLog();
    log.add('observation', 'first', anchor());
    log.add('observation', 'second', anchor());
    expect(log.list().map((n) => n.text)).toEqual(['second', 'first']);
    expect(log.toJsonl().trimEnd().split('\n').slice(1).map((l) => JSON.parse(l).text)).toEqual(['first', 'second']);
  });

  it('renders a readable plain-text digest, including when there are no notes', () => {
    const empty = makeLog();
    expect(empty.toText()).toContain('(no notes)');
    const log = makeLog();
    log.add('change-request', 'offer insurance', anchor({ surface: 'free-play', detail: 'round 4' }));
    const text = log.toText();
    expect(text).toContain('[change-request] free-play · round 4');
    expect(text).toContain('offer insurance');
  });

  it('notifies subscribers only when a note actually lands', () => {
    const log = makeLog();
    let calls = 0;
    log.subscribe(() => { calls += 1; });
    log.add('observation', 'kept', anchor());
    log.add('observation', '   ', anchor());
    expect(calls).toBe(1);
  });
});
