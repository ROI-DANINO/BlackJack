# Player Experience QA — Free Play V1

- **Build:** commit `6121a51` + rebuilt WASM. Scope: deep (first run).
- **Date:** 2026-07-09
- **Method:** Headless Chromium (Playwright-core over CDP, `--remote-debugging-port=9222`), driven from Node scripts in scratchpad. Played as a person who knows blackjack rules but has never seen this app. No source code, specs, or other QA reports were read before playing; on-screen text was re-checked more closely only after first impressions were recorded.
- **Rounds played:** ~50 (6 played slowly with full attention to each decision/outcome, 41 played rapidly back-to-back to confirm shoe-reshuffle behavior, plus a handful of targeted probes for Double and DOM inspection). Impressions stabilized well before round 10; the rest was targeted at specific special-case moments (ace up-card, split, reshuffle, double).
- **Evidence:** screenshots and raw text/button dumps under `/tmp/claude-1000/-home-roking-Desktop-Projects-blackjack/01328904-f940-42c0-8922-3da63d9a2744/scratchpad/pxq_*.png` / `.txt` (session-local scratch; not part of the repo).

## First-impressions narrative

Landed on a page that says only "Blackjack Free Play" and a single "Start session" button — plain black-on-white default HTML, no rules, no preview of stakes, no explanation of what this app does. Nothing to lose by clicking it, so I did. The screen then showed "Bankroll: $1000.00" and a "Deal" button (plus an unrelated "Download history" button) — still no mention of a bet size anywhere. Clicking Deal dealt a hand instantly: dealer showing one card plus a hidden `[??]`, my hand listed as two card codes like `7♦ 10♥`. There is no computed total anywhere on screen — I had to add 7+10=17 myself to know what I was looking at. Hit/Stand/Double appeared with no other cue that it was "my turn" beyond their mere presence (there is no dealer-turn "waiting" state to contrast it with, so this reads fine once you're used to it, but it's not explicit).

Standing resolved the hand immediately: dealer's hidden card flipped, a line appeared reading "Loss (-$20.00)" and the bankroll dropped to $980. That was the first time I learned my bet had been $20 — inferred backward from the loss amount, never stated up front. A small text input then appeared, "Note for this hand: [optional — saved with this hand]" next to "Download history" — a nice touch for a training tool (leave yourself a note on a decision) but its purpose is not explained anywhere and it visually runs together with the unrelated history button.

Play continued cleanly through more rounds: a push, a hand where I deliberately hit past 21 (bust), a natural blackjack that resolved instantly and was correctly labeled "Blackjack (+$30.00)" (3:2, distinct from a later 3-card 21 that correctly paid only "Win (+$20.00)", 1:1 — a nice, accurate detail). A split opportunity came up on `10♣ Q♣` and worked functionally (two independent hands, hit/stand tracked per-hand, correct per-hand win/loss amounts at resolution) — but nothing on screen ever indicates which of the two hands is currently active; I only knew by watching which hand's card list grew after I clicked Hit. An ace up-card produced "Insurance auto-declined" with no dollar figure and no explanation of what insurance is or why it was auto-declined. Forty-plus rapid rounds later, the shoe reshuffled and the app printed a plain, understandable "Shoe reshuffled — new shoe" line — this one was clear.

Across ~50 rounds nothing ever froze, nothing ever left me unsure of *whether* the app was waiting on me (buttons are simply present or absent), and I was never unable to find the button I needed. The confusion was entirely about *what the numbers mean*, not about *what to click*.

## Findings

**F1 — No hand total is ever shown, for either player or dealer (major)**
What a player experiences: every hand is rendered as a bare list of card codes (`A♣ 6♠ 4♣`) with no computed total, hard/soft indicator, or bust/21 flag anywhere — not during the hand, not in the outcome line, not in the DOM (checked `innerHTML`/`innerText`/attributes directly — no title/aria-label carries a total either). The player must mentally re-add every hand, every time, including tracking ace flexibility (e.g. `5♥ 4♣ A♠` is a soft 20, but nothing on screen says so). This is friction on every single decision in a game whose whole purpose is basic-strategy training.
Evidence: `pxq_03_after_deal.png` (`Hand 1: 7♦ 10♥`, no total), `pxq_round_18_hit.txt` (`5♥ 4♣ A♠`, no total/soft indicator), confirmed no hidden total in DOM via `inspect_dom.js` output (`<strong>Hand 1:</strong> <span>A♣ </span><span>6♠ </span>` — no other attributes).

**F2 — No indicator of which hand is active during a split (major)**
What a player experiences: after Split, two hand lines appear (`Hand 1:` / `Hand 2:`) with identical styling — no highlight, bold, arrow, background, or label distinguishing the one currently being played. Clicking Hit/Stand acts on whichever hand the engine has queued (confirmed: Hit added a card to Hand 1 only; after standing Hand 1, the exact same visual layout returns with Double re-enabled, silently now applying to Hand 2). A player has to infer focus purely by comparing card-list length before/after each click — real risk of standing/hitting the hand they didn't intend to, especially with more than two split hands.
Evidence: `pxq_14_round6_split.png`, `pxq_15_round6_hit_which.txt` (Hand 1 gains `2♣`, Hand 2 unchanged), `pxq_16_round6_stand_hand1.txt` (layout after Stand looks structurally identical, only the button set hints anything changed).

**F3 — Bet amount is never shown before dealing, and no control to change it was found (major)**
What a player experiences: "Deal" is clicked with zero indication of the wager. The bet size ($20 flat, inferred from every payout being a $20/$40 multiple) is only learned retroactively from the outcome's dollar delta. A full DOM sweep for inputs/selects across idle and in-round states found exactly one input on the whole app — the optional post-hand note field; there is no bet-size stepper, field, or menu anywhere.
Evidence: `pxq_02_after_start.png` (Bankroll + Deal button, no bet field), `inspect_inputs.js` output (only input on the page is the note textbox).

**F4 — "Insurance auto-declined" is unexplained and inconsistent with the rest of the outcome UI (minor)**
What a player experiences: when the dealer shows an Ace, a plain text line "Insurance auto-declined" appears with no $ amount (every other outcome line on screen carries a dollar figure) and no explanation of what insurance is, why it's being declined automatically, or that the player had no say in it. A player who doesn't already know what insurance is will not learn it from this line.
Evidence: `pxq_round_18_deal.png`.

**F5 — Bust vs. "lost to a better dealer hand" are visually identical (minor)**
What a player experiences: both cases render as "Loss (-$20.00)" with no explicit "Bust" flag. Combined with F1 (no totals), a player must re-add their own cards to realize they went over 21 rather than just losing a close hand.
Evidence: `pxq_09_round3_hit1.png` (`Q♦ 4♥ K♥` = 24, shown only as "Loss (-$20.00)").

**F6 — Zero visual styling (note)**
What a player experiences: default browser fonts/buttons, no color, no card graphics, no visual separation between the dealer and player areas beyond a text label. This doesn't block understanding, but it works against the "mildly fun" bar — the app currently reads as a debug harness rather than a game.
Evidence: every screenshot in this run, e.g. `pxq_01_arrival.png`.

**F7 — "Note for this hand" purpose is unexplained and visually runs into "Download history" (minor)**
What a player experiences: an optional per-hand note field appears after every round with a placeholder ("optional — saved with this hand...") but no label explaining why a player would want to leave themselves a note. It sits directly beside the unrelated "Download history" button with no visual gap, so on a quick glance the two read as one control.
Evidence: `pxq_04_after_stand.png`.

## Positive notes
- Win/Loss/Push/Blackjack outcome labels plus exact dollar deltas are consistent and correctly computed every round I checked, including the harder cases: 3:2 blackjack payout correctly distinguished from a 1:1 three-card 21 (`pxq_12_round5_deal.png` vs `pxq_round_final_stand.txt`), doubled bets correctly show doubled loss/win amounts, and split hands each get their own correct per-hand result line.
- "Shoe reshuffled — new shoe" is plain, self-explanatory, and well-placed (after the round result, before the next Deal).
- The dealer's hidden hole card is clearly marked `[??]`, and no dealer cards leak before they should.
- Across ~50 rounds nothing hung, lagged, or left me guessing whether the app was waiting on me — pacing itself is fine.

## Does this feel playable and mildly fun, or only technically functional?

Only technically functional. Every round resolves correctly and I was never stuck — a player who already knows blackjack can push through by mentally tracking totals and inferring which hand/bet is active. But that's exactly the audience this app can least afford to underserve: it's a *training* tool, and the two most basic training questions ("what do I have?" and, once splitting, "which hand am I even looking at?") are not answered on screen. Combined with the complete absence of visual design, the experience right now feels like exercising a rules engine through a debug UI, not playing a game.

## Verdict

**Area: Player experience & clarity — PASS** (with reservations)

Rationale: no finding actually blocked me from understanding or continuing basic play across ~50 rounds — I could always determine what to click and, after the fact, what happened to my money. Nothing crashed, froze, or produced an unrecoverable state. So this does not meet the FAIL bar ("confusion blocks or seriously degrades basic play"). However, F1–F3 are real, reproducible major friction points — particularly the missing hand totals and the unmarked active-hand-during-split — that should be treated as release blockers for a *training* product even though they didn't block this QA session's play.
