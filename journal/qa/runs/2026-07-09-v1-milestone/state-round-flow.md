# State & Round Flow — QA Run

- **Build commit:** 6121a51 + rebuilt WASM (07:03)
- **Scope:** deep (first-ever run of this area)
- **Date:** 2026-07-09
- **Agent:** State & Round Flow QA
- **Environment note:** the Playwright MCP browser tool in this environment is misconfigured
  (hard-requires a system Chrome at `/opt/google/chrome/chrome`, absent on this box). Worked
  around it via the proven pattern: launched the cached Playwright Chromium headless with
  `--remote-debugging-port=9222`, and drove it from Node scripts using `playwright-core`
  (borrowed from `feather-browser/node_modules`, symlinked into the scratchpad — no system
  install available). Pure test-harness workaround; no product code touched.

## Method

Automated a single continuous Free Play session (`seed:"free-play"`) through **56 rounds**
(round_index 0–55) via a scripted driver that snapshots every button's text/disabled state,
every `<strong>`-labelled hand block, status/notice text, and note-input contents after every
click. Strategy varied deliberately by round to hit every target transition:

- Round 0: Hit once then Stand (tests Double disappearing after a Hit).
- Rounds 1–4, and most "filler" rounds: Stand only (fastest path through ordinary rounds).
- Round 5: Split, then Hit repeatedly on hand 1 until it **busts**, then continue hitting to
  see whether control **moves to hand 2** and behaves as a fresh hand.
- Round 11: Split, then Double both resulting hands (tests double-after-split, DAS).
- Round 14: split-eligible-round watch (turned out not to be a pair this playthrough — see
  Coverage gaps).
- Remaining rounds: Stand only, watching for auto-resolving naturals and the shoe-boundary
  reshuffle, opportunistically letting Split show up 4 more times (rounds 27, 40, 44, 50)
  without exercising it further (already covered twice above).

Because the shoe is a single continuous deterministic sequence and my play (extra hits,
splits, doubles) consumes a different number of cards than a "stand-only" baseline, my
round_index landmarks for pairs/naturals/reshuffle **drifted from the previous agent's
documented landmarks** (round 5's `10♣ Q♣` split matched by coincidence of timing, but by
round 14 the shoe cursor had diverged — see Coverage gaps). This drift is itself confirmation
that the shoe is properly cursor-based and deterministic given a fixed action sequence, not a
bug.

Cross-checked outcomes against the underlying JSONL export (`Download history`, captured via
Playwright's download event) for rounds 5, 11, 14, 23, 24, 25, and the shoe-boundary rounds
43–47: bankroll deltas, wagers, and `penetration_reached`/`shoe_number` all matched the
on-screen text exactly, with zero discrepancies. The crosscheck file was deleted after use
(git-ignored `data/history/*`, so no repo state was touched).

Also ran two whole-transcript sweeps (programmatic, not manual spot checks):
1. Split-eligibility rule (any same-rank pair, or any two 10-value ranks 10/J/Q/K) checked
   against every fresh 2-card hand dealt (56 hands) — **0 mismatches**, both directions
   (no missing Split offers, no incorrectly-offered Split).
2. Dealer hidden-card rule (exactly one card shown + `[??]` marker iff a player-turn action
   button is enabled) checked against every dealer snapshot (227 snapshots) — **0 mismatches**.

## State-transition table

| State | Controls offered | Verdict |
|---|---|---|
| Fresh page load, no session | `Start session` only | PASS — nothing else actionable |
| Session started, no round dealt | `Deal`, `Download history` | PASS |
| Round dealt, player turn, first decision (2 cards, non-pair) | `Hit`, `Stand`, `Double` | PASS |
| Round dealt, player turn, first decision (splittable pair) | `Hit`, `Stand`, `Double`, `Split` | PASS (56/56 fresh hands checked, 0 mismatches) |
| Player turn, after 1+ Hit (no longer a fresh 2-card hand) | `Hit`, `Stand` (no `Double`, no `Split`) | PASS — Double/Split correctly vanish once the hand is no longer exactly 2 cards |
| Player turn, hand 1 busted mid-split | control silently advances to hand 2's fresh 2-card state (`Hit/Stand/Double` reappear, incl. Double) | PASS — verified via card-count/legal-action reconstruction (see F1 below for the UX caveat) |
| Player turn, after Split, on a fresh split hand | `Hit`, `Stand`, `Double` (no re-`Split`, ruleset allows split but not re-split here) | PASS |
| Dealer turn / auto-resolving natural | no action buttons at any point; state jumps straight from "after Deal" to "resolved" | PASS — 0 instances of Hit/Stand/Double/Split appearing during or after a natural |
| Round resolved | `Deal`, `Download history`, note `<input>` | PASS |
| Round resolved + Deal clicked (any outcome, incl. shoe-boundary reshuffle) | full state (dealer, hands, outcomes, notice, note draft) clears before the new deal's cards render | PASS — verified across all 55 round transitions, incl. the reshuffle boundary |
| Any state | simultaneous `Deal` + any action button enabled | never observed (0/403 snapshots) |
| Any state | a disabled `Hit/Stand/Double/Split/Deal` button (vs. simply absent) | never observed — illegal actions are omitted, not disabled |

## Coverage

- **56 rounds** played end-to-end, fresh load → session start → repeated deal/play/resolve →
  session end of harness run, all in one continuous session.
- **Split flow: 2 full plays** (round 5: split + bust hand 1 + hand 2 also busts; round 11:
  split + double-after-split on both hands) + **4 more Split-offered-but-not-taken**
  instances (rounds 27, 40, 44, 50) confirming the control surface, not the full flow.
- **Bust-and-advance-to-second-hand**: observed **1** time directly (round 5) — hand 1 busted
  at step 4, and step 5's legal actions (`Hit/Stand/Double`, i.e. a *fresh* hand) together
  with hand 2's card count only starting to grow from that point on, confirm turn correctly
  moved to hand 2. Reasoning had to be done by a human/QA-script cross-referencing card
  counts — see F1 (no built-in indicator).
- **Double-after-split (DAS)**: observed **1** time (round 11), both resulting hands
  correctly allowed and paid off at 2× wager ($40 loss each on a $20 base bet).
- **Auto-resolving naturals**: observed **2** times opportunistically (round 24: dealer
  natural, dealer `A♥K♦` vs. player `8♠K♦`, Loss, no action ever offered; round 25: player
  natural, `K♦A♦`, Blackjack +$30, no action ever offered). Documented landmark rounds 23/52
  did not reproduce dealer/player naturals in *this* playthrough because of the shoe-cursor
  drift explained above — round 23 in my run was an ordinary Stand-and-win round instead.
  Functionally equivalent coverage was still obtained via rounds 24/25.
- **Shoe boundary / reshuffle**: observed **1** time, at round_index 45→46 (my playthrough;
  JSONL confirms `penetration_reached:true` at round 45, `shoe_number` increments 1→2 at
  round 46). "Shoe reshuffled — new shoe" notice appeared exactly for round 46 and was gone
  by round 47 — no leakage.
- **Insurance auto-decline notice**: observed **multiple** times (e.g. rounds 24, 27),
  appears exactly on rounds where the dealer's up-card is an ace, and only those rounds;
  cleared correctly on the next round.
- **Round reset (stale-state leakage)**: checked programmatically across **all 55**
  round-to-round transitions — no stale cards, outcome text, notices, or note-field content
  ever carried into a new round.
- **Stuck-state hunt**: swept all 403 captured snapshots for a state with no actionable
  `Deal`/`Hit`/`Stand`/`Double`/`Split` button — found none (the only such state is the
  intentional pre-session screen, where `Start session` is the sole and correct action).
- **Console/errors**: 3 console messages total for the whole run, all benign (`[vite]
  connecting`, `[vite] connected`, React DevTools info banner) — zero warnings, zero errors,
  zero `pageerror` events across 56 rounds of play.

### Coverage gaps
- Documented landmark rounds 11/14 as "same-rank pairs (2-2)" and round ~41 as the shoe
  boundary did not reproduce in this playthrough — expected, since those landmarks were
  recorded against a different (likely stand-only) action sequence, and the shoe is
  cursor-based over one continuous deterministic sequence, so any divergence in prior rounds'
  action counts shifts every later round's dealt cards. I did not attempt to replay the exact
  prior agent's action sequence to hit those specific round numbers; instead I verified the
  same *situations* (pairs, dealer/player naturals, reshuffle) opportunistically wherever they
  landed in my own sequence, which is equally valid evidence for state/round-flow purposes.
- Did not exercise a **3-way or 4-way split** (max_split_hands: 4) — only ever reached 2
  hands via one split; a second split opportunity on an already-split hand was never dealt in
  this run. Turn-order behavior across 3+ hands is unverified.
- Did not type text into the "Note for this hand" field, so its clear/leak behavior between
  rounds was only checked passively (value stayed `""` throughout, as expected since nothing
  was ever typed) — not a positive test of note-content clearing.
- Did not verify the `resplit_aces: false` / `split_aces_receive_one_card: true` rules
  specifically, since no ace pair was dealt as a fresh 2-card hand in this run.
- Relied on DOM text/attribute snapshots plus one JSONL cross-check rather than a
  screenshot-by-screenshot visual review for every round; two representative screenshots were
  reviewed directly (pre/post round-5 split) and confirmed the DOM-derived read was accurate.

## Findings

### F1 — No visual indication of which hand is active during a split turn
- **Severity:** major
- **Reproduction:**
  1. Start a session, deal until a splittable pair is dealt (e.g. round 5 in this run,
     `10♣ Q♣`).
  2. Click `Split`. Both resulting hands render identically: `Hand 1: 10♣ 2♥` and
     `Hand 2: Q♣ 2♠`, same `<strong>` label styling, no highlight, border, background, order
     change, "(active)" suffix, or any other differentiator.
  3. Click `Hit` repeatedly. Cards are silently appended to whichever hand is currently
     active (confirmed correct by card-count tracking and the reappearance of `Double` in the
     legal-action set exactly when the engine has moved to hand 2's fresh 2-card state) — but
     nothing on screen tells the player this happened. The only way to know play has moved to
     hand 2 is to notice hand 1's card count has stopped changing.
- **Evidence:**
  - Source: `web/src/bridge/types.ts` defines `RoundState.active_hand_index: number`, but
    `web/src/app/Table.tsx` (renders `round.hands.map(...)`) and
    `web/src/app/HandView.tsx` never read or render it anywhere — confirmed by reading both
    files in full; no conditional class/style/text keyed off `active_hand_index` exists.
  - Runtime, round 5 mid-split (transcript.jsonl / scratchpad, tag
    `round5-step2-after-Hit`): `bodyText` = `"...Hand 1: 10♣ 2♥ 2♣ | Hand 2: Q♣ 2♠ |
    HitStand..."` — plain text, `strongEls` for both hand labels carry identical tag/no
    distinguishing attributes.
  - Screenshot: `scratchpad/screens/post-round5-split-bust.png` shows `Hand 1:` and
    `Hand 2:` rendered with identical bold styling and no other marker, even after
    resolution.
  - Functional correctness is not in question — actions were verified (via card-count
    reconstruction and JSONL cross-check on round 5 and round 11) to always apply to the
    engine's actual active hand. This is a display/UX gap, not a rules/engine bug.
- **Why it matters for this product**: this is a *training* tool (per AGENTS.md), where a
  player is expected to reason about "what should I do with this hand." During a split, a
  player cannot currently tell which hand their next click will affect without manually
  diffing card counts — a real risk of confusing feedback ("did that Hit go to my 12 or my
  18?") especially once hands get to 3+ cards and look visually similar.

### F2 — (none beyond F1) Round/state transitions, resets, and control-surface legality are otherwise clean
No blocker/minor findings. Every other checked transition (pre-session gating, deal → player
turn → resolution → reset, Double/Split appearing/disappearing correctly, bust-and-advance
across split hands, auto-resolving naturals landing cleanly with zero mid-resolution actions
offered, shoe-boundary reshuffle notice appearing/clearing exactly once, insurance-decline
notice correlating 1:1 with dealer-ace rounds, no simultaneous Deal+action state, no disabled
core-action buttons, zero stuck states across 403 snapshots, zero console errors/warnings)
passed cleanly across the full 56-round run, corroborated by an independent JSONL ground-truth
cross-check on 7 sampled rounds with zero discrepancies.

### F3 — note: round-landmark drift confirms (does not break) shoe determinism
- **Severity:** note
- Documented landmark rounds (11/14 pairs, ~41 reshuffle) did not reproduce at the same
  round_index in this playthrough because this run's action sequence (extra hits, splits,
  doubles) consumed a different card count than whatever sequence produced the original
  landmarks. This is expected behavior for a single continuous deterministic shoe cursor, not
  a defect — flagging only so future QA runs don't assume round-index landmarks are
  action-sequence-independent. Same underlying situations (pairs, naturals, reshuffle) were
  still hit and verified, just at different round numbers (27/40/44/50 for pairs, 45/46 for
  reshuffle, 24/25 for naturals).

## Verdict

**Round & state flow: PASS**, with one **major** UX finding (F1: no active-hand indicator
during split play) that should be fixed before this becomes a serious training tool for
split-hand decision-making, but does not itself cause incorrect game state, stuck states, or
leaked state — every transition, reset, and control-surface-legality check across 56 rounds
and 403 snapshots was clean, and independently cross-checked against JSONL ground truth with
zero discrepancies.
