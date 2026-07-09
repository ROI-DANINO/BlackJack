# Rules & Payout Fidelity — QA Run

- **Build commit:** 6121a51
- **Scope:** deep (first-ever run of this area)
- **Date:** 2026-07-09
- **Agent:** Rules & Payout Fidelity QA
- **Environment note:** the Playwright MCP browser tool in this environment is misconfigured
  (it hard-requires a system Chrome install at `/opt/google/chrome/chrome`, which doesn't
  exist on this box). Worked around it by driving the already-cached Playwright Chromium
  directly via `playwright-core`'s `chromium.connectOverCDP` from a headless Chromium
  instance launched with `--remote-debugging-port=9222`. This is a pure test-harness
  workaround; no product code was touched. (A speculative one-line edit to the plugin's
  `.mcp.json` env block was tried and reverted — it had no effect since the MCP server
  process was already running.)

## Rounds played

**127 rounds** across one continuous Free Play session (`session_id
2026-07-09T03:44:47.131Z-w564cl`), played against a fixed `"seed":"free-play"` shoe (see
Finding F3). Every resolved round was flushed to disk via the in-app "Download history"
control (captured through Playwright's download event, saved to
`data/history/blackjack-session-2026-07-09T03-57-01-860Z.jsonl`) and cross-checked against
on-screen state and hand arithmetic. In addition to manual play for the first 5 rounds, most
rounds were driven by a scripted basic-strategy-ish heuristic (hit/stand/double on totals,
split any front-two-card pair or 10-value-looking pair when offered) to maximize situation
coverage across a large sample, with every resulting round still individually verified.

A full programmatic replay of all 127 rounds (reconstructing each hand's card-by-card
sequence from `dealt_cards` + `actions` and re-deriving dealer draw/stand decisions and
payout math independently) found **zero dealer-play (H17) violations** and **zero
bet/payout math violations** across the entire session — see Verdict section.

### Situations covered

| Situation | Count | Notes |
|---|---|---|
| Rounds played | 127 | 1 continuous session, 4 shoes |
| Player natural blackjack (3:2) | 6 outcomes (5 auto-resolved with no player action) | payout always exactly 1.5× wager |
| Dealer natural blackjack | 4 (rounds 23, 52, 73, 89) | round auto-resolves immediately, no player decision offered, correct |
| Pushes | 10 | wager refunded, delta $0 |
| Wins / Losses | 46 / 72 | heuristic strategy is not optimal — net loss is expected, not a bug |
| Doubles | 19 | incl. double after split |
| Splits (successful) | 7 (rounds 11, 14, 57, 70, 88, 110, 112) | pairs: 2-2 ×3, 8-8, 3-3, K-K ×2 — all same-rank |
| Mixed-rank ten-value "pairs" (10/J/Q/K) | 7 (rounds 5, 10, 13, 17, 38, 80, 121) | **Split never offered — see F1** (later root-caused to stale WASM; fixed & re-verified same day, see F1 re-test) |
| Insurance-eligible rounds (dealer shows ace) | 13 | "Insurance auto-declined" note shown every time, 1:1 with dealer ace up-card, no exceptions |
| Soft hands (player) | many (A-9, A-8, A-3-A, etc.) | soft totals hit/double/stand correctly per screen |
| Dealer soft 17 (H17) | verified programmatically across all 127 rounds | 0 violations — dealer always hits soft 17 and hard <17, stands hard 17+ and soft 18+ |
| Dealer bust after draw | many | verified bankroll/outcome math matches |
| Shoe reshuffle | 3 (rounds 41, 83, 123) | "Shoe reshuffled — new shoe" note shown on screen; `shoe_number` increments 1→2→3→4 in JSONL, `penetration_reached:true` on the triggering round |
| Legal-action surface (Hit/Stand/Double disappearing appropriately) | continuous | Double vanishes after first Hit; no actions offered once a round is resolved (only Deal); Split offered for genuine same-rank pairs |

## Findings

### F1 — Mixed-rank ten-value pairs could not be split (root-caused: stale WASM artifact)
- **Status: root-caused & re-tested same day (see "F1 re-test" below). The engine's split
  behavior is verified correct after a WASM rebuild — the browser had been served a stale
  WASM artifact built at 04:40, predating the split fix (commit 4294080, landed in the Rust
  core at 05:43). The residual finding is the build-pipeline staleness gap (F1-b).
  Original evidence preserved below for the record.**
- **Severity (as observed):** blocker (breaks correct/legal play — a stated, locked rule was unavailable in the UI)
- **Reproduction:**
  1. Start a session, deal rounds until the player's first two cards are two different
     ten-value ranks (e.g. `10♣` + `Q♣`, or `Q♠` + `K♥`, or `K♥` + `J♥`) — any two of
     {10, J, Q, K} with different ranks.
  2. Observe the action buttons offered: only `Hit / Stand / Double` appear — `Split` is
     never offered.
  3. Compare with a genuine same-rank pair (e.g. `K♠` + `K♦`, `8♥` + `8♠`, `3♣` + `3♠`,
     `2♦` + `2♠`) dealt in the same session: `Split` **is** correctly offered and works
     (verified 7/7 times).
- **Evidence:**
  - Locked ruleset (per this run's brief): *"Any two 10-value cards (10/J/Q/K) may be
    split."*
  - Screen, round with `10♣ Q♣`: buttons were `["Hit","Stand","Double","Download
    history"]` — no Split.
  - JSONL, round_index 5 (`data/history/blackjack-session-2026-07-09T03-57-01-860Z.jsonl`):
    ```
    {"round_index":5,...,"dealt_cards":[{"rank":"ten","suit":"clubs",...},{"rank":"six","suit":"diamonds",...},{"rank":"queen","suit":"clubs",...},{"rank":"six","suit":"diamonds",...},...],"actions":[{"action":"stand","hand_index":0,"card_id":null}],"outcomes":[{"hand_index":0,"result":"win","wager":2000,"delta":2000}],...}
    ```
    Player's first two cards are `ten-clubs` + `queen-clubs` (both value 10, different
    rank); `actions` contains only `stand` — no `split` action was even offered/possible.
  - Reproduced identically 7 times across the session: round_index **5, 10, 13, 17, 38, 80,
    121** — every single mixed-rank ten-value pair dealt in 127 rounds failed to offer
    Split (7/7). Meanwhile same-rank ten pairs (`K♠K♦` at round 70, `K♥K♥` at round 112)
    **did** correctly offer and execute Split (2/2, excluding round 23 where the dealer had
    a natural blackjack and no player action was possible for anyone).
  - This exact defect was also independently flagged by a human/prior session: a leftover
    note found in an earlier session file
    (`data/history/blackjack-session-2026-07-09T01-47-16-984Z.jsonl`, round_index 5) reads:
    *"shouldnt 10♣ Q♣ be splitable? both are equal 10.."* — same cards, same conclusion,
    corroborating this is a persistent, known-but-unfixed defect, not a one-off fluke of
    this run.
  - ~~Root cause is at the UI/wire boundary or the engine's split-eligibility check~~ —
    superseded: root cause was a **stale served artifact**, not engine or UI logic. See
    F1 re-test below.

#### F1 re-test (same day, after WASM rebuild at 07:03)

- **Root cause (per coordinator):** the Vite dev server was serving a WASM artifact built at
  04:40, before the split fix (commit 4294080) landed in the Rust core at 05:43. The fix
  never reached the served browser build. Rebuilt WASM from current main at 07:03
  (`web/src/bridge/wasm/blackjack_core_bg.wasm`, verified mtime 07:03:54).
- **Method:** hard-reloaded the page with browser cache cleared via CDP
  (`Network.clearBrowserCache`) to guarantee the fresh `.wasm` was fetched. Exploited the
  deterministic `free-play` shoe (F3): replayed the original session's exact recorded
  actions for rounds 0–16 so the shoe stayed card-for-card aligned with the 127-round map,
  putting known mixed ten-value pairs back on the table at round_index 5, 10, 13, and 17.
- **Result — Split is now offered on every mixed-rank ten-value pair (4/4):**
  - round 5: `10♣ Q♣` → buttons `["Hit","Stand","Double","Split"]` — **Split OFFERED**
  - round 10: `Q♥ K♦` → **Split OFFERED**
  - round 13: `K♠ 10♠` → **Split OFFERED**
  - round 17: `10♠ Q♥` vs dealer `J♠` up → **Split OFFERED**
- **Split executed at round 17 and verified end-to-end:**
  - Screen: Hand 1 `10♠ K♠` Win (+$20.00), Hand 2 `Q♥ A♥` Win (+$20.00), dealer
    `J♠ 3♠ K♥` = 23 bust, bankroll $770.00 after.
  - Post-split 21 (`Q♥ A♥`) was correctly paid **1:1 as "Win"**, not 3:2 as blackjack —
    correct rule behavior for a split hand.
  - JSONL (flushed via next Deal, downloaded to
    `data/history/blackjack-session-2026-07-09T17-43-01-403Z.jsonl`), round_index 17:
    ```
    {"round_index":17,...,"dealt_cards":[{"card_id":"deck-5-10-spades",...},{"card_id":"deck-6-J-spades",...},{"card_id":"deck-4-Q-hearts",...},{"card_id":"deck-4-3-spades",...},{"card_id":"deck-5-K-spades",...},{"card_id":"deck-5-A-hearts",...},{"card_id":"deck-2-K-hearts",...}],"actions":[{"action":"split","hand_index":0,"card_id":null},{"action":"stand","hand_index":0,"card_id":null},{"action":"stand","hand_index":1,"card_id":null}],"outcomes":[{"hand_index":0,"result":"win","wager":2000,"delta":2000},{"hand_index":1,"result":"win","wager":2000,"delta":2000}],"bankroll_before":73000,"bankroll_after":77000,"bankroll_delta":4000,"penetration_reached":false}
    ```
    Card assignment, both wagers, both deltas, and the bankroll invariant all match the
    screen and hand arithmetic exactly.
  - The full programmatic verification sweep over the 18-round re-test session again found
    **0 dealer-play (H17) issues and 0 bet/payout issues**.
- **Conclusion:** engine behavior verified correct after rebuild. F1 as a rules defect is
  closed; what remains is F1-b.

### F1-b — Build pipeline does not rebuild WASM when the Rust core changes (residual from F1)
- **Severity:** major (a green `npm run dev` / test run does not prove the served browser
  build carries current engine behavior — an engine fix silently failed to ship, and only
  live browser QA caught it)
- **Evidence:** commit 4294080 fixed ten-value split eligibility in the Rust core at 05:43;
  the dev server kept serving a 04:40 WASM build, so the browser exhibited pre-fix behavior
  for hours (all 127 rounds of this run's main session, 7/7 mixed-pair failures) despite
  the fix being on main and the 55 Rust engine tests passing. The WASM artifact
  (`web/src/bridge/wasm/blackjack_core_bg.wasm`) is only refreshed by an explicit rebuild.
- **Suggested handling (not fixed by this agent):** make the web build/dev pipeline detect
  `crates/` changes and rebuild the WASM bridge automatically (or at minimum fail loudly /
  print the WASM build timestamp+commit at session start so staleness is visible).

### F2 — (none — dealer H17 play and payout math are exhaustively clean)
No blocker/major/minor findings beyond F1. See Verdict for the full-session programmatic
sweep that found 0 issues in dealer soft-17 handling and 0 issues in bet/payout arithmetic.

### F3 — Free Play shoe is fully deterministic (`seed: "free-play"`)
- **Severity:** note
- **Observation:** every session's `session_header` and round records carry
  `"seed":"free-play"`, and the resulting round-by-round shoe order is **byte-for-byte
  reproducible**: round_index 5 of this run's session dealt the exact same `card_id`
  sequence (`deck-2-10-clubs`, `deck-2-6-diamonds`, `deck-6-Q-clubs`, `deck-1-6-diamonds`,
  `deck-5-2-hearts`, `deck-2-2-spades`, `deck-2-2-clubs`) as round_index 5 of an earlier,
  unrelated session recorded in
  `data/history/blackjack-session-2026-07-09T01-47-16-984Z.jsonl` — identical cards,
  identical bankroll before/after, identical outcome. This is not a wire/payout bug (card
  origins are still traceable to real deck/shoe positions per AGENTS.md, and the shoe is
  still built/shuffled once and dealt in order — nothing is faked), but it means "Free Play"
  currently behaves as a fixed replay rather than fresh randomness each session. Worth
  confirming this is intentional (e.g. deterministic for debugging/QA reproducibility)
  before it reaches real users, since a training tool that always deals identically could
  be surprising or (if noticed) gameable.

## Verdict (amended after F1 re-test)

- **UI/wire fidelity (display ↔ engine ↔ JSONL):** **PASS** (amended; was FAIL). The
  original FAIL was caused entirely by F1, which is now root-caused as a stale served WASM
  artifact — not a UI, wire, or engine-logic defect. After the rebuild, mixed-rank
  ten-value pairs offer Split 4/4 (rounds 5, 10, 13, 17 of the deterministic shoe), an
  executed mixed-pair split resolved and logged correctly end-to-end, and a post-split 21
  correctly paid 1:1. Every other fidelity aspect (card display, hand totals, dealer
  up/hole reveal, insurance note correlation, resolution text, reshuffle note, legal-action
  button surface) matched the engine/JSONL exactly across all 127 original rounds plus the
  18-round re-test session, with zero discrepancies. The residual **F1-b (major,
  build-pipeline staleness)** is a process/tooling gap, not a fidelity defect in the
  running build, so it does not fail this area — but it must be tracked in the ledger and
  should gate the milestone until addressed, since it can silently reintroduce exactly this
  class of failure.
- **Betting & payout math:** **PASS** (unchanged, strengthened by the re-test). A full
  programmatic re-derivation of all 127 rounds' bankroll deltas, win/loss/push/blackjack
  payout multipliers (1×, −1×, 0, 1.5× respectively), double/split wager scaling, and
  `bankroll_before + delta == bankroll_after` invariants found **zero discrepancies**; the
  18-round re-test session (including the mixed-pair split) was swept with the same
  verifier, also clean. Dealer soft-17-must-hit (H17) logic was independently re-derived
  from raw dealt-card order for all 127 + 18 rounds and also found **zero discrepancies**
  (dealer always hits on hard <17 and soft 17, always stands on hard 17+ and soft 18+,
  never draws after busting).

## Summary of findings by severity

- F1 — blocker (as observed) → **closed**: mixed-rank ten-value pairs (10/J/Q/K, different ranks) never offered Split across 7/7 occurrences; root-caused to a stale WASM artifact, engine behavior verified correct after rebuild (Split offered 4/4, split round resolved and logged correctly).
- F1-b — major — **open**: build pipeline does not rebuild/verify the WASM bridge when the Rust core changes; an engine fix shipped to main but never reached the served browser build.
- F3 — note — Free Play shoe is fully deterministic under `seed:"free-play"`; confirm this is intentional. (Proved operationally useful for the F1 re-test replay.)
