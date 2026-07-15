# Gameplay History Exports

Round-history logs exported from the blackjack trainer, for offline analysis in Python.

**The data files here are git-ignored** — only this README is tracked. Session logs are
personal and ephemeral, and `origin` is a public repo, so the `.jsonl` files never get
committed.

## How files land here

- **Browser UI ("Download history"):** the browser can't write into the repo, so the file
  downloads to your `~/Downloads` as `blackjack-session-<timestamp>.jsonl`. Move it here.
- **Future CLI / Node harness:** would write `.jsonl` directly into this directory.

## Format

JSON Lines (`.jsonl`) — one JSON object per line:

- Line 1: a `session_header` (`session_id`, `seed`, `ruleset`, `starting_bankroll`,
  `default_bet`, `started_at`, `schema_version`, harness version).
- Then one `round` line per resolved round, carrying the core's `RoundLog` verbatim
  (dealt cards, actions, outcomes, bankroll deltas, penetration flag) plus harness-added
  `session_id`, `round_index`, `ts`, `schema_version`.

Every line self-identifies via `session_id` + `schema_version`, so files can be concatenated
across sessions.

## Loading in Python

```python
import pandas as pd
df = pd.read_json("data/history/blackjack-session-....jsonl", lines=True)

rounds = df[df["type"] == "round"]          # per-round grain
header = df[df["type"] == "session_header"] # session metadata
```

The file is kept **lossless** — derived columns (running/true count, optimal action, totals)
are computed at analysis time, not baked in. See the design notes in
`docs/imports/v2-research-2026-07-11/history/history-data-analysis-2026-07-09.md` for grains, count semantics
(shoe-true vs player-perceived), and what to compute where.
