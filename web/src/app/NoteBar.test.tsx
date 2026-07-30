// @vitest-environment jsdom
import { useEffect } from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { NoteLog } from '../notes/log';
import { NoteProvider, useNotes } from '../notes/context';
import { TuningStore } from '../tuning/store';
import type { NoteAnchor } from '../notes/types';
import { NoteBar } from './NoteBar';
import { NoteField } from './NoteField';

/** Stands in for a real surface: pushes an anchor up from an effect, the way Lesson and Learn do. */
function Surface({ anchor }: { anchor: NoteAnchor }) {
  const notes = useNotes();
  useEffect(() => { notes.setAnchor(anchor); }, [notes, anchor]);
  return null;
}

function setup(anchor?: NoteAnchor) {
  const tuning = new TuningStore({});
  const log = new NoteLog({ tuning });
  render(
    <NoteProvider log={log}>
      {anchor && <Surface anchor={anchor} />}
      <NoteBar />
    </NoteProvider>,
  );
  return { log, tuning };
}

const type = (text: string) => fireEvent.change(screen.getByRole('textbox'), { target: { value: text } });

describe('NoteBar', () => {
  it('captures a note from any screen and counts it', () => {
    const { log } = setup();
    fireEvent.click(screen.getByRole('button', { name: 'Note now' }));
    type('the unit titles do not say what I would learn');
    fireEvent.click(screen.getByRole('button', { name: 'Save note' }));

    expect(log.count()).toBe(1);
    expect(log.list()[0]!.text).toBe('the unit titles do not say what I would learn');
    expect(screen.getByRole('button', { name: '1 note' })).toBeTruthy();
  });

  it('anchors the note to whatever the surface reported', () => {
    const { log } = setup({
      surface: 'learn', detail: 'Meet Blackjack · question q2', unitId: 'u1', stepId: 'q2', stepType: 'question',
    });
    fireEvent.click(screen.getByRole('button', { name: 'Note now' }));
    type('this prompt is ambiguous');
    fireEvent.click(screen.getByRole('button', { name: 'Save note' }));

    const note = log.list()[0]!;
    expect(note.anchor.surface).toBe('learn');
    expect(note.anchor.stepId).toBe('q2');
    expect(note.anchor.detail).toContain('Meet Blackjack');
  });

  it('defaults to change-request and records observation when chosen', () => {
    const { log } = setup();
    fireEvent.click(screen.getByRole('button', { name: 'Note now' }));
    type('a');
    fireEvent.click(screen.getByRole('button', { name: 'Save note' }));
    expect(log.list()[0]!.kind).toBe('change-request');

    fireEvent.click(screen.getByRole('button', { name: 'Note now' }));
    fireEvent.click(screen.getByRole('radio', { name: /observation/i }));
    type('b');
    fireEvent.click(screen.getByRole('button', { name: 'Save note' }));
    expect(log.list()[0]!.kind).toBe('observation');
  });

  it('stamps the tuning values in force, so a note about pacing names its numbers', () => {
    const { log, tuning } = setup();
    tuning.setOverride('session.presets.standard.maxActivities', 25);
    fireEvent.click(screen.getByRole('button', { name: 'Note now' }));
    type('this drags near the end');
    fireEvent.click(screen.getByRole('button', { name: 'Save note' }));

    expect(log.list()[0]!.params.overrides).toEqual({ 'session.presets.standard.maxActivities': 25 });
  });

  it('cannot save an empty note, and export stays disabled until one lands', () => {
    setup();
    expect(screen.getByRole('button', { name: 'Download notes' }).hasAttribute('disabled')).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: 'Note now' }));
    expect(screen.getByRole('button', { name: 'Save note' }).hasAttribute('disabled')).toBe(true);
    type('   ');
    expect(screen.getByRole('button', { name: 'Save note' }).hasAttribute('disabled')).toBe(true);
    type('real');
    fireEvent.click(screen.getByRole('button', { name: 'Save note' }));
    expect(screen.getByRole('button', { name: 'Download notes' }).hasAttribute('disabled')).toBe(false);
  });

  // Regression: both fields once shared name="note-kind", which made them ONE radio group — so
  // choosing a kind in the inline step field silently cleared it in the shell field, and the note
  // saved with whatever the other field had last set. Lesson renders both at once.
  it('keeps the kind of two simultaneously-open note fields independent', () => {
    const tuning = new TuningStore({});
    const log = new NoteLog({ tuning });
    render(
      <NoteProvider log={log}>
        <NoteField label="Note on this step" />
        <NoteField label="Note anything on this screen" />
      </NoteProvider>,
    );
    const [inline, shell] = screen.getAllByRole('group');
    fireEvent.click(within(inline!).getByRole('radio', { name: /observation/i }));

    expect((within(inline!).getByRole('radio', { name: /observation/i }) as HTMLInputElement).checked).toBe(true);
    expect((within(shell!).getByRole('radio', { name: /change this/i }) as HTMLInputElement).checked).toBe(true);

    fireEvent.change(within(shell!).getByRole('textbox'), { target: { value: 'from the shell field' } });
    fireEvent.click(within(shell!).getByRole('button', { name: 'Save note' }));
    expect(log.list()[0]!.kind).toBe('change-request'); // not clobbered by the inline field
  });

  it('lists saved notes newest first', () => {
    setup();
    for (const text of ['first thing', 'second thing']) {
      fireEvent.click(screen.getByRole('button', { name: 'Note now' }));
      type(text);
      fireEvent.click(screen.getByRole('button', { name: 'Save note' }));
    }
    fireEvent.click(screen.getByRole('button', { name: '2 notes' }));
    const items = screen.getAllByRole('listitem').map((li) => li.textContent ?? '');
    expect(items[0]).toContain('second thing');
    expect(items[1]).toContain('first thing');
  });
});
