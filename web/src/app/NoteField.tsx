// The note form, used in both places the owner asked for: inline at the moment a decision
// resolves, and behind the always-available "note now" affordance in the shell.
//
// Unstyled on purpose, matching Lesson.tsx's standing posture — no CSS, no layout infrastructure
// until the visual system phase. Semantic elements and labels only.
//
// KIND IS A REQUIRED CHOICE, not a guess. A change request is a thing to fix or decide; an
// observation is evidence about whether the design works. They are triaged differently, so the
// form asks rather than inferring from wording.

import { useId, useState } from 'react';
import { useNotes } from '../notes/context';
import type { NoteAnchor, NoteKind } from '../notes/types';

export function NoteField({
  label,
  anchor,
  autoFocus = false,
  onSaved,
}: {
  label: string;
  /** Overrides the context anchor. Surfaces normally set the context anchor instead. */
  anchor?: NoteAnchor;
  autoFocus?: boolean;
  onSaved?: () => void;
}) {
  const notes = useNotes();
  const [text, setText] = useState('');
  const [kind, setKind] = useState<NoteKind>('change-request');
  const [saved, setSaved] = useState<string | null>(null);
  const target = anchor ?? notes.anchor;
  // Per-instance radio group name. The inline step field and the shell's "note now" field can be
  // open at once; a shared name would make them one radio group, so choosing a kind in one would
  // silently clear the other.
  const group = `note-kind-${useId()}`;

  const save = () => {
    const note = notes.log.add(kind, text, target);
    if (!note) { setSaved('Nothing to save — the note was empty.'); return; }
    setText('');
    setSaved('Note saved.');
    onSaved?.();
  };

  return (
    <fieldset>
      <legend>{label}</legend>
      <p>
        <small>
          {target.surface}
          {target.detail ? ` · ${target.detail}` : ''}
        </small>
      </p>
      <div role="radiogroup" aria-label="Note kind">
        <label>
          <input
            type="radio"
            name={group}
            checked={kind === 'change-request'}
            onChange={() => setKind('change-request')}
          />{' '}
          Change this
        </label>{' '}
        <label>
          <input
            type="radio"
            name={group}
            checked={kind === 'observation'}
            onChange={() => setKind('observation')}
          />{' '}
          Observation
        </label>
      </div>
      <label>
        <span>Note</span>{' '}
        <textarea
          rows={3}
          value={text}
          autoFocus={autoFocus}
          placeholder="what should change, and how it should work instead"
          onChange={(e) => { setText(e.target.value); setSaved(null); }}
          // Ctrl/Cmd+Enter saves, so a note never costs a reach for the mouse mid-session.
          onKeyDown={(e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); save(); } }}
        />
      </label>
      <div>
        <button onClick={save} disabled={text.trim() === ''}>Save note</button>
        {saved && <span role="status"> {saved}</span>}
      </div>
    </fieldset>
  );
}
