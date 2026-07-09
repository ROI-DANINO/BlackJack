# Edge Case / Breaker QA — Free Play V1

- **Build commit:** `6121a51` + rebuilt WASM (07:03). **Scope:** deep (first run of this area).
- **Date:** 2026-07-09
- **Agent:** Edge Case / Breaker QA
- **Environment note:** the Playwright MCP browser tool in this environment is broken (hard-requires
  a system Chrome that isn't installed). Worked around it with the established pattern: launched the
  cached Playwright headless Chromium with `--remote-debugging-port=9222` and drove it from Node
  scripts (`playwright-core`'s `chromium.connectOverCDP`) in
  `/tmp/claude-1000/-home-roking-Desktop-Projects-blackjack/01328904-f940-42c0-8922-3da63d9a2744/scratchpad/`.
  Pure test-harness workaround; no product code touched. Read three source files
  (`web/src/app/Table.tsx`, `web/src/app/Controls.tsx`, `web/src/bridge/game.ts`,
  `web/src/bridge/log/{sink,memory-sink}.ts`) and two Rust files
  (`crates/blackjack-core/src/{session,rules}.rs`) **read-only**, to understand exactly where to aim
  race/edge attacks (e.g. the async `flushPending()` write path, the bankroll-vs-bet guard) — no
  edits made anywhere in the repo.

## Method

Drove one continuous Free Play session (plus a handful of deliberate fresh-session resets for
refresh tests) through **~150 rounds total** across ~20 targeted attack scripts, one per attack
class/variation. Two click-delivery mechanisms were used throughout:
1. `element.click()` dispatched via `page.evaluate()` — a **true same-JS-tick, no-actionability-wait**
   click, used for all rapid-fire/race attacks (this is stricter than a human could physically achieve
   with two separate mouse clicks, and is exactly the tool a "someone frantically double-clicking"
   scenario reduces to at the DOM-event level).
2. Normal Playwright-style single clicks for setup/sequencing between attacks.

Console (`console` + `pageerror` events) was captured continuously across the entire session into
`scratchpad/console.log`. All JSONL exports were captured **without relying on the OS download
manager** — `URL.createObjectURL` was monkey-patched in-page to read the exact `Blob` text the app
itself produced, which is a more reliable/precise capture than trusting a real browser download
finishing on disk.

## Attack log

### 1. Rapid input (machine-gun clicking)
- **Tried:** `Deal` ×10 in one tick (fresh idle state); `Hit` ×10 in one tick (mid-turn); `Stand`
  ×10 in one tick (mid-turn); `Double` ×10 in one tick (mid-turn).
- **Result:** Every burst applied its action **exactly once**. `Deal` ×10 → 1 round dealt, clicks
  2–10 surfaced the engine's `"round already active"` guard. `Hit` ×10 → hand busted on the 2nd
  card, clicks 3–10 hit the engine's post-resolution `"no active round"` guard. `Stand` ×10 → 1
  resolution, exactly one `-$20.00` applied. `Double` ×10 → wager doubled exactly once
  ($20→$40), exactly one payout applied, bankroll delta matched the displayed outcome to the
  cent every time.
- **Verdict: held.** The Rust core's synchronous state-machine guards (`round already active`,
  `no active round`/empty legal-actions) make simple same-button spam safe — no double-applied
  actions, no bankroll drift, ever, across 4 button types.

### 2. Race the transitions
- **Tried:** `Hit`+`Stand` fired together in one tick (both element refs grabbed before either
  click ran); `Double`+`Hit` fired together in one tick; note-field `Enter` keypress (checked for
  accidental submit-like side effects).
- **Result:** `Hit`+`Stand`: Hit's card bust the hand, round auto-resolved; Stand's click landed
  on a button whose handler now sees no active round and safely no-ops. `Double`+`Hit`: Double
  applied (wager → $40, exactly one card dealt, round resolved), Hit's click safely no-op'd for
  the same reason. Bankroll deltas matched the single applied action exactly in both cases.
  `Enter` in the note field did not trigger Deal or any other side effect.
- **Verdict: held** for these interleavings — but see **F1** below, found by racing the *other*
  pair of buttons (`Deal`/`Download history`), which is a genuine break.

### 3. Post-resolution actions on a dead round
- **Tried:** captured live JS references to the `Hit`/`Stand`/`Double` buttons *before* the round
  resolved, let the round resolve via a fresh `Stand` click, then called `.click()` directly on
  the stale (now DOM-detached) button objects.
- **Result:** All three stale `.click()` calls "succeeded" as JS calls (`clicked: true`,
  `existsInDom: false`) but produced **zero effect** on app state — bankroll, round, and buttons
  were unchanged afterward.
- **Why it's safe:** React attaches its synthetic event system via a single delegated listener on
  the document root; once a button is unmounted (removed from the DOM), a `.click()` on the
  orphaned node can't bubble to that listener, so the handler never fires. This is a robustness
  property of React's event model, not app-specific code.
- **Verdict: held.**

### 4. Refresh/restart abuse
- **Tried:** refresh mid-player-turn (post-Deal, pre-any-action); refresh mid-split (after Split
  + one Hit on hand 1, hand 2 untouched); refresh immediately after a round resolves but *before*
  the next Deal/Download flush (a round sitting in the note-buffer, unflushed).
- **Result:** **Identical outcome every time**: the whole app resets to the pre-`Start session`
  screen. Bankroll, round-in-progress, and — critically — the buffered-but-unflushed round are
  **all gone**, with **zero warning** (no `beforeunload` confirmation dialog, no autosave, no
  "resume session?" prompt). Verified via a controlled before/after: downloaded the JSONL right
  before intentionally repeating the "resolve-then-refresh-without-flushing" scenario, confirming
  the round that existed only in the buffer at refresh time never made it into any export.
- **Verdict: held from a corruption standpoint** (no stuck states, no partial/half-split state,
  no negative bankroll, no crash — clean, consistent full reset every time) **but see F3**: this
  is real, silent, unbounded data loss with no user-facing signal, and it compounds with F2.

### 5. Note field abuse
- **Tried, in one string:** 10,000× `'A'`, doubled newlines, a tab, a `\r\n`, literal `"`
  double-quotes, `'` single-quotes, `\` backslashes, a literal `{"json":"breaking"}` fragment,
  4 emoji, Arabic + Hebrew RTL text, and `<script>alert(1)</script><img src=x onerror=alert(2)>`
  — set via a native `<input>` value-setter + `input` event (bypasses React's synthetic-event
  quirks, exercises the real controlled-input path) and via `Deal` to flush.
- **Result:** No `alert()` ever fired (confirmed via a `window.__anyAlert` sentinel — never set).
  The flushed JSONL line was **valid JSON** every time (`JSON.parse` succeeded); quotes,
  backslashes, the embedded JSON-looking fragment, emoji, and both RTL scripts all round-tripped
  **byte-for-byte intact**. The `<script>` tag was stored as an inert string — never rendered as
  HTML anywhere in the app (React auto-escapes; no `dangerouslySetInnerHTML` anywhere; the note is
  never redisplayed in-app at all, only exported). DOM node count and button count were unchanged
  after the flush (no layout explosion).
  One real (minor) behavior: the note came back **4 characters shorter** than expected beyond the
  app's own intentional `.trim()` — traced to the HTML **"value sanitization algorithm" for
  single-line `<input type="text">`**, which silently strips `\n`/`\r` characters even on
  programmatic value assignment. A user pasting a multi-line note into this field loses their
  line breaks silently, with no indication.
- **Verdict: held** (no XSS, no JSON breakage, no size limit crash) with **F4** (minor) on the
  silent newline-stripping.

### 6. Long grind (55 consecutive rounds, across a reshuffle)
- **Tried:** 55 rounds back-to-back, single deliberate clicks (Deal → Stand/Split-then-Stand
  each hand → repeat), sampling DOM node count and `performance.memory.usedJSHeapSize` every 10
  rounds.
- **Result:** DOM node count stayed flat (28–29 nodes) for the entire run — **no node
  accumulation**. Heap usage fluctuated between ~8.7MB and ~14.2MB with no monotonic upward
  trend (normal GC noise, not a leak). Exactly **one** reshuffle notice appeared
  (`shoe_number` 1→2, `penetration_reached: true` at `round_index 48` in the JSONL — matches the
  on-screen "Shoe reshuffled — new shoe" notice exactly; round-index landmark differs from other
  QA runs' ~41–45 only because a different action sequence consumes a different number of cards
  from the same deterministic shoe — expected, matches the drift already documented in
  `state-round-flow.md` F3). Independently reconstructed the full 55-round `bankroll_before` →
  `bankroll_after` chain from the JSONL ground truth: **zero mismatches**, final chained bankroll
  ($730.00) matched the on-screen bankroll exactly. All 55 `round_index` values were unique and
  contiguous (0–54) — no duplicates from ordinary single-click play.
- **Verdict: PASS.** No leak, no slowdown signal, no bankroll drift, clean single reshuffle.

### 7. Bankroll edges
- **Tried:** engineered a fast, deterministic bankroll drain using a guaranteed-loss strategy
  (Hit repeatedly regardless of total, forcing a bust almost every round) across ~93 additional
  rounds from the grind's ending $730 down toward $0, specifically to reach the boundary where
  the flat $20 bet exceeds the remaining bankroll.
- **Result:** Bankroll landed on **exactly $0.00** (never negative — confirmed the Rust guard
  `if session.bankroll < bet { return Err("insufficient bankroll") }` in
  `crates/blackjack-core/src/session.rs:45` fires correctly). Clicking `Deal` at $0.00 produces a
  clean, repeatable `"insufficient bankroll"` message (verified twice in a row, same result both
  times) — no crash, no stuck spinner, no partial round dealt. Cross-checked the full ~94-round
  JSONL ground truth: `bankroll_before`/`bankroll_after` chain has **zero mismatches** end to end,
  terminating at exactly 0.
  However: at $0.00 there is **no in-app path forward** — no bet-size control (already flagged as
  F3 in `player-experience.md`), no "reset session," "new session," or "rebuy" button anywhere in
  the UI. The only two buttons left are `Deal` (permanently rejected) and `Download history`. The
  *only* way to keep playing is a full page refresh, which (per F3/Class 4 above) silently
  destroys the whole session with no warning.
- **Verdict: the guard itself is solid (held)** — no negative bankroll, no corruption, no crash —
  **but see F2**: the reachable dead-end has no in-app recovery, only a destructive refresh.
- Did **not** separately observe the Double/Split-specific bankroll gate (`bankroll_available >=
  hand.wager`, `crates/blackjack-core/src/rules.rs:73/83/91`) disappearing live in the $20–$40
  band, since the forced-bust strategy never doubled — see Coverage gaps.

### 8. Download control
- **Tried:** `Download history` ×8 in one tick with **zero rounds played** (fresh session);
  `Download history` ×8 in one tick **during an active player turn** (mid-round, round
  unresolved); `Download history` ×8 in one tick **at the $0.00 bankroll dead-end** (idle, no
  pending round); `Download history`×2 in one tick **with a resolved round buffered**; `Deal`×2 in
  one tick with a resolved round buffered; `Download history` + `Deal` fired together (different
  buttons, same tick) with a resolved round buffered.
- **Result — safe cases:** zero-rounds export was valid JSON with just the `session_header` line.
  Mid-round hammering left the in-progress round completely untouched (still `player_turn`,
  Hit/Stand/Double intact, same cards) and produced 0 round lines for the unresolved round (as
  expected — it isn't logged until resolved). Hammering at the $0.00 dead-end (no pending round)
  produced **zero** duplicates.
- **Result — broken case: see F1.** Every one of the three variants that fired **two
  flush-triggering clicks in the same tick while a resolved round sat in the note-buffer**
  (Download+Download, Deal+Deal, Download+Deal) produced a **byte-for-byte duplicate JSONL line**
  for that round (verified via independent `python3 json.loads` equality checks — `True` in all
  cases), each time reproduced on the first attempt.

## Findings

### F1 — Duplicate JSONL round entries from a same-tick double-flush race (blocker)
- **Root cause** (`web/src/bridge/game.ts`): `flushPending()` → `writePending()` calls
  `await this.sink.write({...this.pendingLine, note})` and only sets `this.pendingLine = null`
  **after** that `await` resolves. `MemorySink.write()` (`web/src/bridge/log/memory-sink.ts`) is
  declared `async` but has **no `await` inside its body** — so calling it pushes the line onto the
  in-memory array synchronously, then hands back an already-resolved promise. Awaiting an
  already-resolved promise still defers to the microtask queue (JS/V8 semantics), which means:
  if a **second** flush-triggering click (`Deal`'s `startRound()` or another `Download history`
  click's `downloadLog()`) fires in the same synchronous browser tick — e.g. a real double-click —
  it re-enters `flushPending()` while `this.pendingLine` is **still non-null** (the first call
  hasn't reached its post-await cleanup yet), and writes the **exact same round a second time**.
- **Reproduction (any one of these, starting from a state where a round has just resolved and the
  "Note for this hand" input is showing):**
  1. In the browser console / via JS: grab the single `Download history` button element and call
     `.click()` on it **twice in the same statement** (`btn.click(); btn.click();`) — or just
     physically double-click it fast enough.
  2. Same with the `Deal` button, or one `.click()` on each of `Download history` and `Deal`.
  3. Open the resulting `.jsonl` (via the app's Download or the in-page Blob capture) — the
     round that had just resolved appears **twice**, same `round_index`, identical `ts`, and
     every other field byte-identical.
- **Evidence:**
  - `scratchpad/c8_download_race.jsonl` — lines 6 and 7 are both `round_index: 5`,
    `ts: "2026-07-09T18:57:06.630Z"`, confirmed `l6 == l7` (Python string equality) → `True`.
  - `scratchpad/c8_deal_deal_race2.jsonl` — round_index sequence
    `[0,1,2,3,4,5,5,6,6,7]`: **two separate duplicates** (5 and 6) accumulated across two
    successive double-Deal maneuvers in the same session.
  - `scratchpad/c8_mixed_race.jsonl` — round_index sequence `[0, 0]` from a single
    `Download history` + `Deal` mixed-button race, reproduced on the very first attempt.
  - Console/pageerror log across the whole session (`scratchpad/console.log`) shows **zero**
    errors or warnings for any of these — this is a **silent** logical corruption, not a crash,
    which makes it more dangerous (nothing alerts a developer or QA using only the console).
- **Why it's a blocker:** it corrupts the durable training-history record — the one artifact this
  whole harness exists to produce accurately (per `AGENTS.md`: "keep card origins traceable").
  A duplicated round would double-count that hand's outcome/wager in any downstream analytics,
  strategy-adherence audit, or session replay. It is trivially reachable by ordinary impatient
  double-clicking on either of the two most-clicked buttons on the screen (`Deal` or
  `Download history`) — no unusual input, no devtools, no exotic timing required beyond what a
  fast human double-click already produces.
- **Suggested direction (not implemented — out of scope for this QA role):** null out
  `pendingLine` (or otherwise mark the flush as "in flight") **before** awaiting the sink write,
  or guard `flushPending()`/`downloadLog()`/`startRound()` with a simple re-entrancy lock.

### F2 — No in-app recovery path once bankroll can't cover the bet (major)
- **What happens:** bankroll hits $0.00 (or, more generally, drops below the fixed $20 default
  bet — there is no bet-size control in the UI at all, confirmed in `player-experience.md` F3).
  `Deal` then reliably returns `"insufficient bankroll"` forever. The only buttons left on screen
  are `Deal` (dead) and `Download history`. There is no `Reset`, `New session`, `Rebuy`, or
  `Restart` control anywhere in the observed UI across the whole run.
- **Reproduction:** start a session, repeatedly Deal and Hit-until-bust (or otherwise lose) until
  bankroll drops below $20. Confirmed reachable in ~93 rounds against the fixed `"free-play"`
  seed using a forced-bust strategy; ordinary play would take longer but the wall is real and
  reachable within a normal-length session.
- **Evidence:** `scratchpad/c7_wall.jsonl` — `bankroll_after: 0` on the final round, ground-truth
  chain-verified with 0 mismatches; on-screen state at the wall:
  `"Blackjack Free PlayBankroll: $0.00 ... insufficient bankroll Deal Download history"`, retried
  and got the identical rejection again.
- **Why it matters:** the *only* recovery is a full page refresh — which, per **F3** below,
  silently discards the whole session (bankroll, all unflushed history) with zero warning and no
  in-app hint that this is even the intended way out. A player who doesn't already know to hit
  Ctrl+R (or realize it will nuke everything) is simply stuck. For a *training* product, hitting
  $0 and having no graceful "let's go again" affordance is a real product gap, not just cosmetic.

### F3 — Any refresh discards the entire session with zero warning (major)
- **What happens:** refreshing the page at any point — mid-turn, mid-split (verified: after
  Split + one Hit on hand 1), or with a resolved-but-unflushed round sitting in the note buffer —
  wipes bankroll, the in-progress round, and any not-yet-downloaded round history, and returns to
  the pre-session `Start session` screen. No `beforeunload` confirmation, no autosave, no
  "continue previous session?" prompt of any kind.
- **Evidence:** three independent refresh tests (`scratchpad/c4_refresh_mid_turn.js`,
  `c4_refresh_pending.js`, `c4_find_split_and_refresh.js`) all produced the identical
  `{"text":"Blackjack Free PlayStart session", "buttons":[{"text":"Start session",...}]}` result
  regardless of which mid-round moment the refresh happened at. `c4_refresh_pending.js`
  specifically captured the JSONL content that *would* have been exported right before
  deliberately re-triggering the loss scenario and refreshing without downloading — confirming
  that round never made it into any export.
- **Why "major" not "blocker":** this is very likely **accepted by design** for V1 (`AGENTS.md`:
  "Default V1 storage is in-memory state") and the failure mode itself is clean — no corruption,
  no stuck/partial state, no negative bankroll, fully reproducible and consistent. It's flagged at
  major severity because (a) there is genuinely zero user-facing signal that a refresh is
  destructive, and (b) it's the *only* way out of the F2 dead-end, which compounds the risk: a
  player who bottoms out their bankroll and refreshes to recover has no way to know they've also
  just discarded any rounds they hadn't downloaded yet.

### F4 — Note field silently strips newlines on paste/programmatic set (minor)
- **What happens:** the note field is a single-line `<input type="text">`. Per the HTML "value
  sanitization algorithm" for single-line text controls, `\n`/`\r` characters are silently
  stripped even when the value is set programmatically (i.e. this isn't React-specific — it's
  native browser behavior for this input type). A note typed/pasted with line breaks loses them
  invisibly; nothing in the UI indicates this happened.
- **Evidence:** `scratchpad/c5_note_abuse.jsonl` — sent `'\n\nline2\ttab\r\n"quotes"...'`,
  received back `'line2\ttab"quotes"...'` (4 fewer characters than the app's own `.trim()` alone
  would explain; the tab survived, only the newline/CR characters vanished). Every other
  adversarial payload in the same string (quotes, backslashes, embedded `{"json":"breaking"}`,
  emoji, Arabic/Hebrew RTL) round-tripped exactly.
- **Why it's minor, not major:** no crash, no JSON corruption, no visible garbling — the resulting
  JSONL is still perfectly valid and the note is still legible, just reflowed onto one line. For a
  training-note field this is a real but low-stakes fidelity gap; worth a `<textarea>` if
  multi-line notes are ever intended.

### F5 — Rejected-click error text lingers in the status line until the next successful action (minor/cosmetic)
- **What happens:** when a redundant click hits an engine guard (`"round already active"`,
  `"no active round"`), that message is appended to the visible status text and stays there —
  concatenated awkwardly right before the next set of buttons (e.g.
  `"...Hand 1: 7♦ 10♥ round already activeHitStandDouble..."`) — until the next successful
  command clears `lastError`. Observed repeatedly during Class 1/2 rapid-click tests; never
  caused any functional problem, purely a leftover status-text artifact from the same
  `state.lastError` field already covered functionally by F1/F2's error messages above.
- **Verdict:** cosmetic only, not re-reporting as a numbered severity beyond noting it here for
  completeness — visually a bit rough for the concatenated-text UI already flagged (F6, zero
  styling) in `player-experience.md`.

## Coverage gaps
- **Double/Split bankroll gate at the live $20–$40 boundary:** confirmed via source
  (`crates/blackjack-core/src/rules.rs:73/83/91`, `bankroll_available >= hand.wager`) that
  Double/Split should stop being offered once bankroll can't cover a second wager, but the forced-
  bust drain strategy used to reach $0 never doubled, so this specific transition was not observed
  live in the UI. Given the identical, well-tested guard pattern already confirmed working for the
  base-bet case (F2's clean, repeatable `"insufficient bankroll"`), this is a low-risk gap, not a
  suspected break.
- **F1's race with an active split in flight:** the duplicate-flush race was only reproduced
  against single-hand rounds. It's very plausible the same bug applies with a 2-hand split
  resolved-and-buffered, since the race lives entirely in the harness layer above the engine, but
  this specific configuration wasn't independently verified.
- **3-way/4-way split turn order:** not exercised (same gap already noted in
  `state-round-flow.md`) — only single splits (2 hands) were encountered across this run's ~150
  rounds.
- **True multi-tab/multi-connection races:** all races in this report are same-page,
  same-JS-tick races (the realistic ceiling for one browser tab). Did not attempt driving two
  separate CDP connections against the same page concurrently — unlikely to be reachable by a
  real single-player user anyway, so treated as out of scope rather than a gap worth chasing.
- **Memory growth beyond ~150 rounds:** heap/DOM sampling covered ~150 rounds total across the
  grind and bankroll-drain scripts with no growth signal; did not extend into the thousands of
  rounds to rule out a very slow leak beyond that horizon.

## Verdict

**Area: Robustness — FAIL**, on the strength of **F1** (blocker: silent, trivially-reachable,
same-tick double-click race that duplicates a resolved round's entry in the exported JSONL history
— exactly the "duplicate JSONL rounds" failure mode this QA pass was dispatched to hunt for).
Every other attack class (rapid single-button mashing, stale/detached button references,
interleaved Hit/Stand/Double racing, 10k+-character/XSS/RTL note-field abuse, a 55-round grind
through a reshuffle, and a deliberate bankroll drain to exactly $0.00) held cleanly — no crashes,
no bankroll corruption, no XSS, no memory leak, no stuck states, zero console errors/warnings
across the whole session. The two **major** findings (F2: no in-app recovery once the flat bet
exceeds bankroll; F3: any refresh silently discards the whole session) are not corruption bugs but
are real, easily-reachable UX dead-ends that compound each other and should be weighed alongside
F1 before this area is called done. F1 alone is sufficient to fail this area: it is a data-
correctness bug in the one artifact (`data/history/*.jsonl`) this whole training harness exists to
produce faithfully.
