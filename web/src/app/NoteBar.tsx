// The always-available note strip in the app shell.
//
// Two ways in, per the owner's decision: this bar's "Note now" works on any screen including ones
// with no decision on them, and Lesson renders a NoteField inline the moment a decision resolves —
// the attach-on-answer analogue of free play's attach-on-Deal.
//
// Export follows the shape that already worked — a JSONL download named like the round history —
// but lands in `journal/qa/notes/`, which is tracked, rather than `data/history/`, which is not.
// See `journal/qa/notes/README.md` for why the two are kept apart.

import { useState, useSyncExternalStore } from 'react';
import { useNotes } from '../notes/context';
import { NoteField } from './NoteField';

export function NoteBar() {
  const notes = useNotes();
  const [open, setOpen] = useState(false);
  const [showList, setShowList] = useState(false);
  const [copied, setCopied] = useState(false);
  useSyncExternalStore(notes.log.subscribe, notes.log.getRevision, notes.log.getRevision);
  const count = notes.log.count();

  const download = () => {
    const url = URL.createObjectURL(notes.log.export());
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    const a = document.createElement('a'); a.href = url; a.download = `blackjack-notes-${stamp}.jsonl`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <aside aria-label="Playtest notes">
      <hr />
      <button onClick={() => setOpen(!open)} aria-expanded={open}>
        {open ? 'Close note' : 'Note now'}
      </button>{' '}
      <button onClick={() => setShowList(!showList)} aria-expanded={showList} disabled={count === 0}>
        {count === 1 ? '1 note' : `${count} notes`}
      </button>{' '}
      <button onClick={download} disabled={count === 0}>Download notes</button>{' '}
      <button
        onClick={() => {
          void navigator.clipboard?.writeText(notes.log.toText());
          setCopied(true);
        }}
        disabled={count === 0}
      >
        Copy as text
      </button>
      {copied && <span role="status"> Copied.</span>}

      {open && (
        <NoteField
          label="Note anything on this screen"
          autoFocus
          onSaved={() => setOpen(false)}
        />
      )}

      {showList && count > 0 && (
        <ol>
          {notes.log.list().map((note) => (
            <li key={note.note_id}>
              <small>
                [{note.kind}] {note.anchor.surface}
                {note.anchor.detail ? ` · ${note.anchor.detail}` : ''}
              </small>
              <br />
              {note.text}
            </li>
          ))}
        </ol>
      )}
    </aside>
  );
}
