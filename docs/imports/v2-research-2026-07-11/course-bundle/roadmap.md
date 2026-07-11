# Course Roadmap — The Full Arc

> Where the two built units sit, and what a complete "Blackjack Duolingo" looks like. Rules baseline: `rules-spec.md` (6-deck, S17, DAS, 3:2).

## The shape of the journey

Three phases, and it's worth being honest with the learner about each:

1. **Play legally** — understand every card, action, and outcome. *(Unit 1)*
2. **Play optimally** — make the best-EV decision on every hand, to automaticity. *(Units 2–4)* This is where most players should aim to live. It caps the house edge at ~0.5%.
3. **Play to win (advantage play)** — actually flip the edge in your favor. *(Units 5–7)* This is genuinely hard, casinos actively fight it, and it requires counting **and** deviations **and** bet-spreading together. Most learners will never need or reach this — and that's fine.

**Be upfront about the wall between phase 2 and phase 3.** Basic strategy alone *cannot* beat blackjack — perfect play still loses ~0.5%. Only card counting + deviations + a bet spread crosses into positive expected value, and even then the edge is small and slow. Selling "learn basic strategy and beat the casino" would be a lie; the honest pitch is "learn to play the best possible game and lose the least — and, if you want, go down the hard road toward an actual edge."

---

## Unit 1 — Basics ✅ *(built — see `unit-1-basics.md`)*
**Prereq:** none. **Goal:** play out any hand legally, understand the vocabulary.
Sub-skills: beat-the-dealer framing · card values · soft vs. hard · the deal & upcard · the four actions · the dealer's fixed rules · outcomes & payouts · order of play.

## Unit 2 — Basic Strategy ✅ *(built — see `unit-2-basic-strategy.md`)*
**Prereq:** Unit 1. **Goal:** understand what basic strategy is, read the chart, grasp *why* it works and *why perfect play still loses.*
Sub-skills: what basic strategy is · dealer bust rates · reading the chart · hard totals · soft totals · pairs · the reasoning · decision-vs-outcome & the house edge.

---

## Unit 3 — Basic Strategy Fluency
**Prereq:** Unit 2. **Goal:** move the chart from "can look it up" to "knows it cold, instantly, unaided." *This is the real grind of the course, and it's more than one unit's worth of practice — Unit 2 installs the table; Unit 3 burns it in.*
Sub-skills:
- Hard totals to automaticity (chart hidden, then timed).
- Soft totals to automaticity (the most-often-misplayed group).
- Pairs / splitting to automaticity.
- **Interleaved** drills — identify hand type *then* decide, mixing all three groups.
- Speed rounds — sub-2-second decisions, simulating real-table pace.
- "Boss" mixed exam gating progress on retained accuracy across a gap.

## Unit 4 — Deeper Why & Rule Variations
**Prereq:** Unit 3. **Goal:** understand the reasoning well enough to *reconstruct* plays, and adapt when the rules change.
Sub-skills:
- Dealer bust probability by upcard (the numbers behind the intuition).
- The marginal/close hands (why 12 vs. 2 and 3 differ; the 1–2% decisions).
- **H17 vs. S17** — what shifts and why (this is where your engine's rules matter; see `rules-spec.md`).
- DAS, surrender, single- vs. multi-deck — how each rule nudges strategy and the edge.
- Reading a table's rule placard and picking a good game (3:2 vs. 6:5, S17 vs. H17).

## Unit 5 — Bankroll, Variance & "Systems"
**Prereq:** Unit 2 (can slot earlier; it's about money and psychology, not new plays). **Goal:** understand the *money* side — why perfect players still go on losing streaks, and why betting systems don't work.
Sub-skills:
- Variance & the long run — why short sessions swing wildly around the EV.
- Bankroll sizing and risk of ruin (in plain terms).
- **Why progressive betting fails** — Martingale, D'Alembert, Fibonacci, etc. all lose to the same house edge; no bet pattern changes the odds of the next hand.
- "The cards are due / running cold" — the gambler's fallacy, and why each hand is independent.
- Responsible-play framing: setting limits, the honesty that even perfect play is −EV.

## Unit 6 — Card Counting Fundamentals *(advanced / optional)*
**Prereq:** Units 3–4 (basic strategy must be automatic first — you can't count while still thinking about basic plays). **Goal:** understand *why* counting works and the mechanics of a simple system.
Sub-skills:
- Why counting works — as high cards leave the shoe the edge shifts; a rich deck favors the player.
- The **Hi-Lo** system: card tags (+1 / 0 / −1) and keeping a **running count**.
- **True count** — dividing running count by decks remaining, and why that conversion matters.
- Turning the count into a **bet spread** (bet more when the count is high).
- Honest caveats: it's mentally taxing, edges are small, casinos use countermeasures (shuffling, backing off players), and it's **legal but unwelcome** — expect to be asked to leave.

## Unit 7 — Deviations / Index Plays *(advanced / optional)*
**Prereq:** Unit 6. **Goal:** deviate correctly from basic strategy based on the count.
Sub-skills:
- What a deviation is — when the count makes the *second-best* basic play become best (e.g., the "Illustrious 18" family, taking insurance only at a high count, standing on 16 vs. 10 when the deck is rich).
- Reading an index chart and why **deviations are rule- and count-dependent**.
- Combining counting + deviations + bet spread into an actual advantage — and a realistic picture of how thin and slow that edge is.

## Optional interstitial — Side Bets & Bad Bets
Can appear as a short standalone module anytime after Unit 2. **Goal:** recognize traps.
Sub-skills: insurance revisited (the −EV math) · why side bets (21+3, Perfect Pairs, Lucky Ladies, etc.) carry big house edges · why 6:5 blackjack and continuous-shuffle machines are games to avoid.

---

## Notes for building the tree

- **Units 1–5 are the "complete" course for a normal player.** 6–7 are a clearly-marked advanced branch — gate them behind mastery and behind an explicit "this is the hard road, and casinos will fight you" framing.
- **Unit 3 is bigger than it looks.** Budget the most content and the most spaced-repetition machinery here; fluency with the chart is the single skill that most defines a competent player, and it's earned through volume, not a lesson.
- **Rule variations (Unit 4) are where your engine's exact ruleset becomes visible to the learner.** Keep everything pinned to `rules-spec.md`; if you ever change the engine's rules, that file and the Unit 2 table update first, then the rest follows.
- **Keep the honesty thread running the whole way:** phase 2 makes you lose slowly; only the hard phase-3 stack makes you win, barely. That candor is a feature — it's what separates a trustworthy teaching app from the "beat the casino" clickbait.
