# Playtest Notes

Owner-authored notes captured **while using the product**, exported from the in-app note bar as
`blackjack-notes-<timestamp>.jsonl` and moved here.

**These files are tracked**, unlike `data/history/`. That split is deliberate and it is the reason
this directory exists rather than notes riding along with the round logs:

| | `data/history/` | here |
|---|---|---|
| Content | gameplay rounds — cards, bankroll, outcomes | opinions about the design |
| Grain | one line per resolved round | one line per note |
| Author | the engine | you |
| Tracked | **no** — personal and ephemeral, and `origin` is public | **yes** |

A gameplay log is personal data with no reason to be published. A note saying *"the presets feel
wrong at 8 minutes"* is a design finding, and it is worthless if it cannot travel back into the repo
where the design lives.

## How a file lands here

The browser cannot write into the repo, so **Download notes** saves to `~/Downloads`. Move it here
and commit it. Free play's per-hand notes are separate — they ride out on the round line in
`data/history/` and stay untracked with the rest of that gameplay data.

## Format

JSON Lines. Line 1 is a `note_session_header`; every later line is a `note`.

```jsonc
{"type":"note_session_header","schema_version":1,"session_id":"...","started_at":"...",
 "params":{"version":"2026-07-30.1","overrides":{}}}
{"type":"note","schema_version":1,"note_id":"...","session_id":"...","ts":"...",
 "kind":"change-request",
 "text":"the retry button should say what was wrong, not just that it was wrong",
 "anchor":{"surface":"learn","detail":"Read Your Hand · question q2","unitId":"u2",
           "stepId":"q2","stepType":"question"},
 "params":{"version":"2026-07-30.1","overrides":{"session.presets.standard.maxActivities":20}}}
```

Three fields carry the weight:

- **`kind`** — `change-request` (a thing to fix or decide) or `observation` (evidence about whether
  the design works). They are triaged differently.
- **`anchor`** — what was on screen, supplied by the surface rather than guessed by the note UI. A
  note without it cannot be acted on later.
- **`params`** — the tuning constants in force *at the moment the note was written*, stamped per
  note because an override can change mid-session. This is what makes *"this drags"* actionable:
  every number it refers to is recoverable from `version` plus `overrides`. An empty `overrides`
  object is positive evidence the session ran on stock values, not a missing record.

## What to do with a file

Triage into `journal/qa/ledger.md`'s findings register, the same as any QA run finding, then leave
the raw file here as the evidence it came from. The ledger is the state; these are the source.
