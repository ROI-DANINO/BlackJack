# History / Round Data — What To Save, In What Format, And What The Core Should Expose

> Status: raw exploratory analysis (2026-07-09). Not a spec. Read-only study of the
> existing Rust core + `tools/play_cli.py` against the product specs. No code was changed.
> Scope: what round/session data is worth persisting for later analysis, in what format,
> what already exists for free vs. what needs new engine work, and when to do each.

---

## 0. TL;DR

- **Do now, zero core changes:** teach the *harness* (`tools/play_cli.py`, later the TS
  bridge) to append each resolved round's `RoundLog` to a **JSON Lines** file, plus one
  session-header line. Everything needed for a first pass already lives in
  `SessionState.logs` in memory; nothing persists today only because the process exits.
- **The core stays a pure, stateless function.** Persistence, timestamps, IDs, and
  count/strategy annotations are *harness / analysis-layer* concerns, consistent with the
  stack rule "V1 storage stays in memory; the core shares plain serializable state."
- **`RoundLog` is reproduction-oriented, not analysis-oriented.** It carries enough to
  *replay* a hand (seed + full ruleset + ordered cards + actions), but many fields an
  analyst wants (cursor position, dealer upcard, final totals, running/true count) are
  *derivable by replay* rather than *present as fields*. That's the main gap, and most of
  it is cheap to close in Python without touching Rust.
- **Reject three tempting-but-premature core additions:** an RNG audit trail (redundant —
  `{seed}:{shoe_number}` fully determines the shuffle), a running/true-count field in the
  core (count system is variable and is a *training-layer* concept), and an
  "optimal action" annotation in the core (belongs to the future Basic Strategy engine,
  not the simulator).

---

## 1. What the core already gives you for free

Confirmed against `crates/blackjack-core/src/types.rs` and `session.rs`. Each field below
is already serialized and already accumulates one entry per round in
`SessionState.logs: Vec<RoundLog>` while a run is live.

### 1a. Per-round, already in `RoundLog` (untouched)
| Field | Type | Use |
|-------|------|-----|
| `seed` | string | Deterministic replay key. Combined with `shoe_number` reconstructs the entire 312-card ordered shoe (Fisher-Yates on `{seed}:{shoe_number}`). |
| `ruleset` | full `Ruleset` object | Reproducibility principle: every round is replayable/interpretable from its own log even under a custom ruleset. Also lets analysis segment by rule (H17 vs S17, payout, DAS…). |
| `shoe_number` | u32 | Groups rounds into shoes; the shoe-reset boundary for count analysis. |
| `dealt_cards` | ordered `Vec<Card>` | Every card that left the shoe this round, in deal order, each with `card_id`, `deck_id`, `rank`, `suit`. This is the raw material for count reconstruction and card-origin QA. |
| `actions` | `Vec<ActionLog>` | Ordered player decisions: `Hit / Stand / Double / Split / InsuranceDeclined`, each with `hand_index` and (for card-drawing actions) the `card_id` drawn. |
| `outcomes` | `Vec<HandOutcome>` | Per-hand `result` (Win/Loss/Push/Blackjack), `wager` (post-double), and money `delta`. A vector because splits produce multiple hands. |
| `bankroll_before` / `bankroll_after` / `bankroll_delta` | i32 (minor units) | Bankroll/EV trajectory. Integer minor units end-to-end (no rounding slop). |
| `penetration_reached` | bool | Whether this round crossed the cut card (shoe must reshuffle next). |

### 1b. Per-session, already in `SessionState` (untouched)
`seed`, `ruleset`, `default_bet`, starting/current `bankroll`, and the live `shoe`
(`cursor`, `discard`, `penetration_index`). The whole `logs` array is here too — so a
crude "just dump it" persistence is literally serializing the final `SessionState`.

### 1c. Derivable for free (no engine change — just compute in Python at analysis time)
These are *not* stored as fields but need no new Rust; a replay/accumulation pass yields
them exactly. Worth calling out so we don't add core fields we don't need:

- **Cursor at round start** — the running sum of `dealt_cards.len()` over prior rounds
  *within the same `shoe_number`*. (Note: `deal_card` advances `cursor`; discards happen
  only at round end, so within a shoe the cursor is exactly cumulative dealt count.)
- **Penetration index / cards & decks remaining** — `decks * 52 * penetration_percent /
  100` from the ruleset; remaining = total − cursor.
- **Running count / true count at any point** — replay `dealt_cards` across the shoe with a
  chosen count system (e.g. Hi-Lo) and divide by decks remaining. See the visibility
  caveat in §5.
- **Dealer upcard, final totals, soft/hard, bust, is-doubled, dealer hole card** — the
  deal order is fixed (player, dealer, player, dealer) and every subsequent card is
  attributed to a `hand_index` in `actions`, so full hand composition and totals are
  reconstructable. `score_hand` logic is simple enough to re-implement in the analysis
  layer (Python already does a partial version in `play_cli.py`).

---

## 2. What is NOT available and would need new work

Split by *where the work belongs* — this is the load-bearing distinction.

### 2a. Belongs in the harness / analysis layer (NOT the core)
The Rust core is a pure `command → new state` function driven over stdin JSON; it has no
clock, no identity, no persistence, and shouldn't grow any. These are the harness's job:

- **Stable IDs** — `session_id` (one per run) and a monotonic `round_index` within the
  session. Today ordering is implicit (vector position). The moment rounds are *appended
  across runs* into one file, you need explicit IDs to regroup and de-duplicate. The
  harness can mint these trivially (UUID/ULID + counter).
- **Timestamps and response time** — wall-clock per round and per action, and decision
  latency. These matter a lot for V2 scoring (`learning-mastery-and-scoring.md` lists
  "response time, table pace" as scoring factors), but they're a property of *when the
  human acted*, which only the harness observes — the core never should.
- **Bet-decision context** — for future bet-sizing training you'd want the chosen bet
  logged next to the count *at bet time*. The bet is available (`outcomes[].wager`,
  `RoundState.bet`), but pairing it with the pre-round count is an analysis composition.
- **Denormalized convenience fields** (dealer upcard, final totals, count columns) — could
  be written at capture time by the harness, but see §3: better to keep the persisted file
  lossless and derive these in a separate pass.

### 2b. Genuinely useful *small* core additions (if we decide the convenience is worth it)
Only two candidates are cheap and honestly justified, and both are pure conveniences that
remove a fiddly replay step:

- **`cursor_at_round_start` on `RoundLog`** — the shoe cursor is right there in
  `ShoeState` when `resolve_dealer_and_round` builds the log. Storing it removes the
  "sum prior rounds in this shoe" reconstruction and makes each round line
  self-describing for count/penetration analysis. Cheap, but derivable — so it's a
  do-soon nicety, not a must.
- **`penetration_index` (or the raw cut position) on `RoundLog`** — likewise already on
  `ShoeState`; saves recomputing from the ruleset. Even more marginal since it's a pure
  function of the ruleset already in the log.

Everything else that "would need core work" is either premature or misplaced — see §4.

---

## 3. Format: what to write, and when to graduate

### Recommendation: **JSON Lines (`.jsonl`), one object per round, plus a session header line.**

Rationale, weighed against the project's stated stack philosophy (Python is the
analytics/notebook/audit language; V1 storage is in-memory; a DB is deferred until a real
persistence requirement appears):

- **The data is nested and ragged.** `dealt_cards`, `actions`, and `outcomes` are arrays,
  and splits make the number of hands per round variable. JSON preserves this losslessly;
  CSV would force flattening and lose structure (or explode into multiple tables).
- **Append-friendly and stream-friendly.** One line per resolved round means the harness
  appends as it plays; a crash mid-session still leaves valid earlier lines. Trivial to
  concatenate across sessions.
- **First-class in the analytics language.** `pandas.read_json(path, lines=True)` and
  `json.loads` per line make it a one-liner to load; nested columns can be exploded as
  needed. This fits "Python owns analytics" without adding any dependency.
- **It mirrors the boundary that already exists.** The core already speaks JSON; the
  harness already parses it. Persisting the same shapes keeps one representation
  end-to-end (the same reasoning behind the integer-minor-units decision).

**Shape:** write a first line of `type: "session_header"` (session_id, seed, ruleset,
starting bankroll, default_bet, harness version, wall-clock start, a `schema_version`),
then one `type: "round"` line per resolved round carrying the `RoundLog` verbatim plus the
harness-added `session_id`, `round_index`, and timestamps. Keep `schema_version` on every
line so later readers can migrate.

**Keep the persisted file lossless; derive in a second pass.** Don't bake running count,
optimal action, or totals into the stored rows — write the raw log, and compute those in a
Python analysis/notebook step. That keeps the source of truth stable when the count system
or strategy table changes, and avoids re-emitting history when the derivation improves.

**When to graduate (and to what):**
- **A flattened CSV/Parquet *view*** (per-hand or per-decision rows) — generate on demand
  from the JSONL for quick spreadsheet/pandas work. This is a derived artifact, not the
  store. Reach for Parquet once row counts hit tens of thousands and load time bites.
- **SQLite** — only when a *real* requirement lands: cross-session history queries, a
  mastery/progress feature that reads past performance, or interactive "show my last N
  sessions." That's a V2+ persistence phase, and per the stack rule it should come with a
  written note (job, alternatives, why JSONL no longer holds). Not now.
- **A server DB (Postgres) / accounts** — only if multi-device sync, leaderboards, or
  shared-daily-shoe (all "Later" on the roadmap) become active. Far out; don't design for
  it now.

---

## 4. What smells premature — challenge before building

- **RNG audit trail.** Redundant. The shuffle is a pure deterministic function of
  `{seed}:{shoe_number}` (see `shoe.rs::shuffle` + `rng.rs`), and both are already in
  every `RoundLog`. Logging RNG internals would store nothing the seed doesn't already
  determine. Skip it.
- **Running/true count as a core field.** Two reasons it doesn't belong in the simulator:
  (1) the count *system* is variable (Hi-Lo, KO, Omega II…), and the core deliberately
  models the *table*, not a *counting strategy*; (2) count is a V2+ *training-layer*
  concept. It's fully derivable from `dealt_cards`. Compute it in the analysis/training
  layer, parameterized by system.
- **"Optimal action per Basic Strategy" annotation in the core.** This is the future Basic
  Strategy engine's output, not the simulator's. The specs keep the BS table as a separate
  machine-readable artifact (still an open question: "how to encode the BlackjackInfo
  chart"). Annotating actions as correct/incorrect is exactly the V2 learning layer's job;
  putting it in the round log means the log's correctness depends on a strategy table
  version — bad coupling. Do it as a derived analysis column keyed to a table version.
- **Re-logging the full 312-card shoe per round.** Already decided against and correct:
  reconstructible from the seed. Confirmed — `dealt_cards` per round is the right grain.

---

## 5. Grain matters — match the record to the analysis

Four distinct grains, each serving different future uses. They are *not* interchangeable:

| Grain | Natural key | What it powers | Status |
|-------|-------------|----------------|--------|
| **Per-action** (one decision) | session_id + round_index + action_seq | Basic Strategy training feedback ("was *this* hit optimal?"), decision latency, count-at-decision, error severity | `ActionLog` exists but lacks context (hand total, dealer upcard, count, timestamp). A per-action analysis view must be *derived by replay*; it is not a stored grain today. |
| **Per-round / per-hand** (one dealt round) | session_id + round_index | Outcome/EV per round, split behavior, blackjack rate, penetration-crossing behavior | This is `RoundLog`'s grain. Per-*hand* outcomes are nested inside as `outcomes[]` (splits). Directly persistable now. |
| **Per-shoe** | seed + shoe_number | Count trajectory across a shoe, penetration/deck-depth EV, "how count drifts before the cut card" | Derivable by grouping rounds on `shoe_number`; no explicit shoe record exists. |
| **Per-session** | session_id | Bankroll curve, session-level report ("Casino Mode session report" in the learning spec), overall accuracy | `SessionState` header; the session-header JSONL line covers it. |

Concrete future-use mapping:
- **Engine QA / debugging (current TS-bridge phase):** per-round `dealt_cards` + `actions`
  + `seed`/`shoe_number` let you replay any suspicious hand deterministically and diff the
  bridge's behavior against the Rust core. This is the *immediate* payoff and needs only
  do-now persistence.
- **Basic Strategy training (V2):** per-action grain + derived dealer-upcard + derived
  optimal action. Needs the BS table (not yet built) — so persist raw now, annotate later.
- **Card counting training (Later):** per-shoe count trajectory from `dealt_cards`,
  true count = running / decks-remaining (needs cursor — derivable, or the do-soon field).
- **Bankroll / EV analysis:** per-round `bankroll_delta` + per-session curve; already free.

---

## 6. Prioritization

### Do now — no core changes, just serialize what exists
1. In the harness (`tools/play_cli.py` today, TS bridge later), after each resolved round,
   append `session["logs"][-1]` as one JSONL `type:"round"` line, decorated with a
   harness-minted `session_id`, monotonic `round_index`, per-round timestamp, and
   `schema_version`.
2. Write one `type:"session_header"` line at session start (seed, ruleset, starting
   bankroll, default_bet, start time, harness version, schema_version).
3. Do the count/strategy/totals derivations in a *separate* Python analysis pass over the
   JSONL, not at write time.

Rationale: everything is already in memory; the only missing piece is a file write. This
also immediately serves the current phase (deterministic replay for bridge QA).

### Do soon — small, well-justified core additions
4. Add `cursor_at_round_start` to `RoundLog` (already on `ShoeState` at log-build time).
   Makes every round line self-describing for count/penetration work; removes a fiddly
   cross-round reconstruction. Low cost, clearly serves the count-training direction.
5. Optionally add `penetration_index` to `RoundLog` (even more marginal — pure function of
   the ruleset already logged). Only if you find yourself recomputing it constantly.

Both are pure conveniences; neither is required for correctness. Gate them behind "am I
actually reconstructing this by hand a lot?" before adding.

### Do later / speculative — only when the feature is actually being built
6. Timestamps/response-time as first-class scored fields — when V2 scoring/pace exists
   (capture in harness, never in core).
7. Optimal-action / error-severity annotation — when the Basic Strategy engine ships
   (derived column keyed to a table version).
8. Running/true-count columns as a stored, parameterized derivation — when counting
   training ships (analysis layer, per count system).
9. SQLite/Parquet store and any account/multi-session identity — when a persistence,
   history, or leaderboard feature is a real, active requirement (with the written
   stack-change note the constitution requires).

### Explicitly don't
10. RNG audit trail; core-level count field; core-level BS-correctness field; re-logging
    the whole shoe. (See §4.)

---

## 7. Illustrative JSONL (shape only — not a schema to implement verbatim)

Session header line, then two round lines. `RoundLog` fields are carried verbatim; the
harness adds `session_id`, `round_index`, `ts`, `schema_version`.

```
{"type":"session_header","schema_version":1,"session_id":"2026-07-09T...-a1b2","seed":"manual-play","started_at":"2026-07-09T12:00:03Z","starting_bankroll":100000,"default_bet":2000,"ruleset":{"id":"v1-modern-classic-h17-6d","decks":6,"penetration_percent":75,"dealer_soft_17":"hit","blackjack_payout":1.5,"...":"..."}}
{"type":"round","schema_version":1,"session_id":"2026-07-09T...-a1b2","round_index":0,"ts":"2026-07-09T12:00:11Z","seed":"manual-play","shoe_number":1,"dealt_cards":[{"card_id":"deck-3-K-hearts","deck_id":"deck-3","rank":"king","suit":"hearts"},{"card_id":"deck-1-6-clubs","...":"..."}],"actions":[{"action":"stand","hand_index":0,"card_id":null}],"outcomes":[{"hand_index":0,"result":"win","wager":2000,"delta":2000}],"bankroll_before":100000,"bankroll_after":102000,"bankroll_delta":2000,"penetration_reached":false,"ruleset":{"...":"..."}}
{"type":"round","schema_version":1,"session_id":"2026-07-09T...-a1b2","round_index":1,"ts":"2026-07-09T12:00:29Z","seed":"manual-play","shoe_number":1,"dealt_cards":["..."],"actions":[{"action":"split","hand_index":0,"card_id":null},{"action":"stand","hand_index":0,"card_id":null},{"action":"double","hand_index":1,"card_id":"deck-2-9-spades"}],"outcomes":[{"hand_index":0,"result":"loss","wager":2000,"delta":-2000},{"hand_index":1,"result":"blackjack","wager":4000,"delta":6000}],"bankroll_before":102000,"bankroll_after":106000,"bankroll_delta":4000,"penetration_reached":false,"ruleset":{"...":"..."}}
```

Note the `ruleset` repeats per round — that's the existing reproducibility decision, and
it's fine: for a research file, redundancy that guarantees self-contained replay beats
normalization. (If file size ever matters, a session-header ruleset + a per-round
`ruleset_hash` is the natural compression, but don't bother yet.)

---

## 8. Open questions (couldn't resolve from docs/code)

1. **Is cross-session / account-level history ever planned?** The roadmap's "Later" lists
   leaderboards, daily challenges, and a shared daily shoe, which imply eventual accounts —
   but there is no account/user model anywhere today. This determines whether `session_id`
   needs to be globally stable/persistent or is just a per-file grouping key. Assume the
   latter for now.
2. **Count-training semantics: what can the player "see"?** `dealt_cards` includes the
   dealer's hole card in deal order (dealt at round start in this peek game), but a real
   counter doesn't see the hole card until the dealer reveals it. For faithful count
   *training*, the analysis (and any future UI count tool) must distinguish "cards visible
   to the player at time T" from "all cards dealt." Product decision needed before count
   features; the raw log supports either interpretation.
3. **Which count system is the default?** Hi-Lo is the obvious first, but the roadmap
   mentions advanced systems later. This only affects the derivation layer, not what to
   store — but it should be decided before building count feedback.
4. **Insurance / side-bet event richness.** Only `InsuranceDeclined` is logged today
   (auto-decline). If insurance-taken or other side bets are ever added, the action/outcome
   log shape grows — worth keeping `schema_version` from day one to absorb that.
5. **Do we want the harness to log illegal-action *attempts*?** For training-error analysis
   ("player tried to split a non-pair") the rejected attempts are signal, but the core only
   returns an error and records nothing. That's a harness-capture decision, not a core one.

---

## 9. Resolution of open question #2 — shoe-true vs. player-perceived count

> Follow-up pass (2026-07-09), re-reading `session.rs`/`types.rs` against a proposed
> resolution worked out in conversation. The core distinction holds; the proposed
> mechanical rule ("hole card becomes visible once `RoundState.status` stops being
> `player_turn`") needed correcting — not just for the naturals edge case, but because
> `RoundLog` doesn't carry `status` at all. Corrected below with the exact code evidence.

### 9a. The distinction holds

`dealt_cards` stays the single stored ordering (draw order, hole card included the instant
it's dealt) — no second stored ordering is needed. Two *counts* are derived from it:

- **Shoe-true count** — running count over all of `dealt_cards` in strict draw order,
  hole card counted at its actual draw position. Matches the physical/simulated shoe;
  use for engine QA, true-count math against actual remaining-shoe composition, and
  determinism/replay checks.
- **Player-perceived count** — running count over only what a real player has actually
  seen so far; the dealer's hole card is excluded until its in-game reveal. This is the
  one that must back any future counting-trainer feature — training on shoe-true count
  would teach the player information they wouldn't have at the table.

The two differ by at most one card (the current round's hole card) and only during that
round's decision phase; they are identical between rounds and converge the instant that
round's hole card is revealed. Confirmed against the code, not just asserted:

- `dealt_cards[3]` (the 4th card dealt) is **unconditionally** the dealer's hole card,
  every round, with no exceptions. `start_round` calls `deal_initial_card` exactly four
  times in a fixed order — player, dealer, player, dealer — before any naturals check,
  action processing, or split logic runs. Splits (`split_hand`) only ever append *more*
  cards after this fixed prefix. So the hole card's position is always identifiable this
  way, exactly as proposed.
- No other card is ever asymmetric: the player's own cards are always visible to the
  player, the dealer's up card (`dealt_cards[1]`) is visible from the deal, and any cards
  the dealer draws during `resolve_dealer_and_round` are, by construction, dealt *after*
  the reveal boundary (see below) — so they're "born visible." The hole card at index 3
  is the only card in the whole log needing special reveal-time handling.

### 9b. The naturals edge case — traced, and the proposed rule corrected

The coordinator's find is real and the proposed fix ("check `RoundState.status`, treat
`player_turn` → not-`player_turn` as the reveal trigger") does not survive contact with
the code, for a sharper reason than "sometimes the state is skipped":

- `RoundState` is constructed with `status: RoundStatus::PlayerTurn` explicitly (the
  struct literal in `start_round`). `finish_if_naturals(session)` is then called
  synchronously. If either hand is a natural (`score_hand(hands[0].cards).is_blackjack ||
  score_hand(dealer.cards).is_blackjack` — checked directly on hand values, not gated by
  any separate "peek" flag; the `Ruleset` struct in `types.rs` has no `dealer_peek` field
  at all, unlike the descriptive YAML in the V1 spec, so peek is effectively *always on*
  and implicit in this immediate check), it sets `hands[0].is_complete = true` and calls
  `resolve_dealer_and_round`, which sets `status = DealerTurn` and, at the end, `status =
  Resolved` — all before `start_round` returns to its caller.
- So the enum genuinely does pass through `PlayerTurn → DealerTurn → Resolved` in that
  order — it is not literally skipped as a data transition. But **no external observer
  ever sees the intermediate `PlayerTurn` value**: the CLI/harness only receives the
  `CoreResponse` snapshot *after* `start_round` fully returns, by which point a naturals
  round already reads `status: "resolved"`. `tools/play_cli.py`'s `while
  round_state["status"] == "player_turn":` loop body correctly never executes in this
  case — confirming the naturals path is externally silent about ever having a
  player-turn phase.
- More fundamentally: **`RoundLog` — the struct this whole document is about persisting —
  has no `status` field at all** (confirmed against `types.rs`: `seed, ruleset,
  shoe_number, dealt_cards, actions, outcomes, bankroll_before, bankroll_after,
  bankroll_delta, penetration_reached`). So a status-keyed rule isn't just fragile for the
  naturals case — it's structurally inapplicable to the persisted grain, full stop, since
  the field being checked doesn't exist in the data being analyzed.

**Corrected, code-verified rule:** derive reveal timing from `actions`, not `status`.

> The dealer's hole card (always `dealt_cards[3]`) is revealed **immediately — i.e., there
> is no hidden window for that round at all — if `actions` contains zero entries with
> `action` in `{hit, stand, double, split}`** (this is the naturals fast path: either the
> player's or the dealer's own hand was a natural, so the round resolved with zero player
> decisions). **Otherwise, it is revealed right after the last such entry in `actions`**,
> regardless of which `hand_index` it belongs to — because `resolve_dealer_and_round` only
> runs once every hand across every split is terminal, so "last qualifying action in the
> log" and "moment play moves to dealer resolution" are the same instant for both
> single-hand and multi-hand (split) rounds. No special-casing is needed for splits beyond
> this: more hands just mean more qualifying entries before the same boundary.
>
> `InsuranceDeclined` is explicitly excluded from the qualifying-action set. It is logged
> (when the dealer's up card is Ace and `insurance_auto_decline` is true) *before*
> `finish_if_naturals` runs, so a genuine zero-decision naturals round can still contain
> exactly one `InsuranceDeclined` entry — counting it as a "decision" would wrongly treat
> some naturals rounds as if a hidden-hole-card window existed.
>
> Practical derivation recipe for a per-round or per-shoe player-perceived count: process
> `dealt_cards` in order, but move index 3 (the hole card) to be counted **last** within
> that round's sequence instead of at its dealt position; shoe-true count needs no such
> adjustment and just sums `dealt_cards` in strict order. This is exact for round-level and
> shoe-level aggregates. (A future per-*action* grain wanting the count at each individual
> decision, mid-round, would need the same exclude-until-reveal rule applied at the
> action-sequence level, not just at the round boundary — noted as a refinement for
> whenever the per-action grain in §5 is actually built, not needed for round/shoe grain.)

### 9c. No core/engine changes required

This is a pure analysis-layer derivation over fields already in `RoundLog`
(`dealt_cards`, `actions`) — consistent with the rest of this document's stance that the
core stays a stateless rules/shoe engine and count semantics belong to the training/
analysis layer. No new Rust field, and no `RoundStatus` needs to be added to `RoundLog`,
because the `actions`-based rule is both sufficient and more robust (it doesn't depend on
capturing a transient in-memory value at all).

### 9d. Additional edge cases checked

- **Does insurance ever reveal anything early?** No. With the V1 default
  (`insurance_auto_decline: true`), the engine only ever logs a decline — there is no
  accept path modeled, so no additional information (about the hole card or otherwise) is
  ever exposed through insurance handling. If a future ruleset models an actual accept/pay
  path, revisit this note, but nothing in the current engine leaks early.
- **Do splits change hole-card timing?** No — see 9b. Splits add more player decisions
  (more qualifying `actions` entries across multiple `hand_index` values) before the same
  single reveal boundary; they don't introduce a second hole card or a second reveal
  event. There is exactly one dealer hand and one hole card per round regardless of how
  many player hands result from splitting.
- **Dealer-peek modeling.** Worth flagging since it surfaced while tracing this: the
  descriptive V1 ruleset YAML in `docs/specs/v1-simulation-foundations.md` lists
  `dealer_peek: true`, but the actual Rust `Ruleset` struct has no `dealer_peek` field —
  peek is implicit, baked into `finish_if_naturals` checking dealer-blackjack unconditionally
  right after the deal. Functionally equivalent to "always peeks," but it's a doc/code
  naming gap, not a count-semantics problem — noted here rather than silently assumed.
