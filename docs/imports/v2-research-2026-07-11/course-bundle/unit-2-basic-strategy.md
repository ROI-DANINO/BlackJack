# Unit 2 — Basic Strategy (Knowledge Base)

> Source-of-truth content for Unit 2. Rules assumed: `rules-spec.md` (6-deck, **S17**, DAS, no surrender, 3:2). Every cell below is specific to these rules. `how-to-teach.md` covers how to sequence and drill this — **especially the critical point that a correct decision can still lose the hand.**

## Unit goal

The learner understands what basic strategy *is*, can **read** the table to find the right play for any hand, understands **why** it's right (at least for the emblematic hands), and understands **why even perfect play doesn't win every hand.** Memorizing the whole chart to automaticity is its own later unit (see roadmap Unit 3) — here we install the table, the reading skill, and the reasoning.

---

## Part A — What basic strategy actually is

**Basic strategy is the single mathematically-best action (hit / stand / double / split) for every combination of your hand and the dealer's upcard**, assuming you can't see the future and aren't counting cards.

It isn't opinion or folklore. It was derived by simulating *hundreds of millions* of hands by computer and recording which action produced the best average result (highest expected value) in each situation. The output is one decision per cell of a chart.

Two things to make explicit to the learner:
- Basic strategy tells you the play that **loses the least / wins the most on average** — not the play that wins *this* hand. Sometimes the best play still loses. That's not a flaw in the strategy (see Part D).
- It assumes the deck is "fresh" (average composition). Adjusting for *which cards have already come out* is card counting — a separate, advanced skill (roadmap Unit 6). Basic strategy is the foundation everything else is built on.

## Part B — The master key: dealer bust rates

Before the chart, teach **this**, because the chart is basically a consequence of it. The dealer's upcard tells you how likely the dealer is to bust:

- **Dealer 2–6 = "weak" upcards.** The dealer is *more* likely to bust (a 5 or 6 is the dealer's worst card). Your plan: play it safe and let them bust — **stand on your stiff hands (12–16), and double/split aggressively** to put more money out when the dealer is vulnerable.
- **Dealer 7–Ace = "strong" upcards.** The dealer is likely to make a good hand. Your plan: you have to try to make a hand yourself — **hit your stiffs even though busting is scary**, because standing on 16 and hoping just hands the dealer the win.

Almost every row of the chart is one of these two stories. Teach the *why* and the chart stops looking like arbitrary memorization.

---

## Part C — The chart

**Legend:** `H` = Hit · `S` = Stand · `D` = Double if allowed, otherwise Hit · `P` = Split
Columns are the **dealer's upcard**: `2 3 4 5 6 7 8 9 10 A`.

### Hard totals (no Ace, or Ace forced to 1)

| Your hand | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | A |
|---|---|---|---|---|---|---|---|---|---|---|
| 8 or less | H | H | H | H | H | H | H | H | H | H |
| 9 | H | D | D | D | D | H | H | H | H | H |
| 10 | D | D | D | D | D | D | D | D | H | H |
| 11 | D | D | D | D | D | D | D | D | D | H |
| 12 | H | H | S | S | S | H | H | H | H | H |
| 13 | S | S | S | S | S | H | H | H | H | H |
| 14 | S | S | S | S | S | H | H | H | H | H |
| 15 | S | S | S | S | S | H | H | H | H | H |
| 16 | S | S | S | S | S | H | H | H | H | H |
| 17+ | S | S | S | S | S | S | S | S | S | S |

### Soft totals (Ace counted as 11)

| Your hand | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | A |
|---|---|---|---|---|---|---|---|---|---|---|
| A,2 (13) | H | H | H | D | D | H | H | H | H | H |
| A,3 (14) | H | H | H | D | D | H | H | H | H | H |
| A,4 (15) | H | H | D | D | D | H | H | H | H | H |
| A,5 (16) | H | H | D | D | D | H | H | H | H | H |
| A,6 (17) | H | D | D | D | D | H | H | H | H | H |
| A,7 (18) | S | D | D | D | D | S | S | H | H | H |
| A,8 (19) | S | S | S | S | S | S | S | S | S | S |
| A,9 (20) | S | S | S | S | S | S | S | S | S | S |

### Pairs (DAS allowed)

**Legend for this table:** `P` = Split · other letters = the play if you *don't* split.

| Your pair | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | A |
|---|---|---|---|---|---|---|---|---|---|---|
| 2,2 | P | P | P | P | P | P | H | H | H | H |
| 3,3 | P | P | P | P | P | P | H | H | H | H |
| 4,4 | H | H | H | P | P | H | H | H | H | H |
| 5,5 | D | D | D | D | D | D | D | D | H | H |
| 6,6 | P | P | P | P | P | H | H | H | H | H |
| 7,7 | P | P | P | P | P | P | H | H | H | H |
| 8,8 | P | P | P | P | P | P | P | P | P | P |
| 9,9 | P | P | P | P | P | S | P | P | S | S |
| 10,10 | S | S | S | S | S | S | S | S | S | S |
| A,A | P | P | P | P | P | P | P | P | P | P |

> **5,5 is never split** — it's treated as a hard 10 (double vs 2–9). **10,10 is never split** — a made 20 is far too good to break up.

### The memorable text version (for teaching the heuristics)

These "rules of thumb" match the chart above and are how most people actually remember it:

- **Always split** Aces and 8s. **Never split** 5s or 10s.
- **Double hard 11** against everything except an Ace. **Double hard 10** except vs. 10 or Ace. **Double hard 9** vs. 3–6.
- **Stand on hard 12** vs. 4–6, otherwise hit. **Stand on hard 13–16** vs. 2–6, otherwise hit. **Always stand on hard 17+.**
- **Soft hands:** always hit soft 17 or less (double instead vs. the dealer low cards shown above). **Soft 18:** stand vs. 2/7/8, double vs. 3–6, hit vs. 9/10/A. **Always stand on soft 19+.**
- **Pairs:** split 2s, 3s, 6s, 7s, 9s per the chart; treat 5,5 as a 10 and never split 10,10.
- **Never take insurance.**

## The chart as data (for the engine)

```json
{
  "ruleset_id": "6deck_S17_DAS_noSurrender_peek_bj3to2",
  "columns": ["2","3","4","5","6","7","8","9","10","A"],
  "legend": {"H":"hit","S":"stand","D":"double_else_hit","P":"split"},
  "hard": {
    "5":  ["H","H","H","H","H","H","H","H","H","H"],
    "6":  ["H","H","H","H","H","H","H","H","H","H"],
    "7":  ["H","H","H","H","H","H","H","H","H","H"],
    "8":  ["H","H","H","H","H","H","H","H","H","H"],
    "9":  ["H","D","D","D","D","H","H","H","H","H"],
    "10": ["D","D","D","D","D","D","D","D","H","H"],
    "11": ["D","D","D","D","D","D","D","D","D","H"],
    "12": ["H","H","S","S","S","H","H","H","H","H"],
    "13": ["S","S","S","S","S","H","H","H","H","H"],
    "14": ["S","S","S","S","S","H","H","H","H","H"],
    "15": ["S","S","S","S","S","H","H","H","H","H"],
    "16": ["S","S","S","S","S","H","H","H","H","H"],
    "17": ["S","S","S","S","S","S","S","S","S","S"],
    "18": ["S","S","S","S","S","S","S","S","S","S"],
    "19": ["S","S","S","S","S","S","S","S","S","S"],
    "20": ["S","S","S","S","S","S","S","S","S","S"],
    "21": ["S","S","S","S","S","S","S","S","S","S"]
  },
  "soft": {
    "A2": ["H","H","H","D","D","H","H","H","H","H"],
    "A3": ["H","H","H","D","D","H","H","H","H","H"],
    "A4": ["H","H","D","D","D","H","H","H","H","H"],
    "A5": ["H","H","D","D","D","H","H","H","H","H"],
    "A6": ["H","D","D","D","D","H","H","H","H","H"],
    "A7": ["S","D","D","D","D","S","S","H","H","H"],
    "A8": ["S","S","S","S","S","S","S","S","S","S"],
    "A9": ["S","S","S","S","S","S","S","S","S","S"]
  },
  "pairs": {
    "22": ["P","P","P","P","P","P","H","H","H","H"],
    "33": ["P","P","P","P","P","P","H","H","H","H"],
    "44": ["H","H","H","P","P","H","H","H","H","H"],
    "55": ["D","D","D","D","D","D","D","D","H","H"],
    "66": ["P","P","P","P","P","H","H","H","H","H"],
    "77": ["P","P","P","P","P","P","H","H","H","H"],
    "88": ["P","P","P","P","P","P","P","P","P","P"],
    "99": ["P","P","P","P","P","S","P","P","S","S"],
    "TT": ["S","S","S","S","S","S","S","S","S","S"],
    "AA": ["P","P","P","P","P","P","P","P","P","P"]
  }
}
```

## How to read the table

1. Read the dealer's **upcard** → that's your **column**.
2. Classify **your** hand: is it a **pair**, a **soft** total (usable Ace), or a **hard** total? Use the matching table.
3. Find your hand's **row**; the intersection is the play.
4. If a cell says **`D`** but you've already taken a card (can't double) → **Hit**. If it says **`P`** to split but you can't → look your hand up as a hard total (except a pair of Aces).

Order of checking each hand: **pair? → soft? → hard?** Then apply the play.

---

## Part D — Why it's the *basic* strategy: the reasoning behind the emblematic hands

Teach a handful of these deeply; the rest of the chart rhymes with them.

- **Stand on 16 vs. dealer 6 (feels wrong, is right):** You'll probably lose either way, but a 6 is the dealer's *most likely bust card*. Standing lets the dealer possibly bust and hand you the win; hitting risks busting yourself first and throwing away that chance.
- **Hit 16 vs. dealer 10 (the worst hand in blackjack):** Both options lose more than half the time — this is the single biggest money-loser in the game. The exact expected values (six-deck) are roughly **Stand ≈ −0.54, Hit ≈ −0.536** per dollar. Hitting is *barely* less bad. There's no good outcome here; basic strategy just picks the least-bad one. (Great teaching hand precisely *because* it shows the strategy minimizing loss, not manufacturing a win.)
- **Always split 8s:** A hard 16 (two 8s together) is the worst starting total in the game. Splitting turns one terrible hand into two hands that each start with 8 — a fresh start twice. You do this even against strong dealer cards because 16 is *that* bad.
- **Always split Aces:** Two Aces = soft 12 (a weak hand), but each Ace is the best card to start a new hand with (any 10 makes 21). Splitting them is hugely +EV, which is exactly why casinos limit you to one card per split Ace.
- **Never split 10s:** You already have 20 — a near-certain winner. Breaking it up to chase two hands is greedy and worse on average, even against a weak dealer.
- **Double 11:** Your single strongest doubling hand — you can't bust with one card and you're very likely to make 21 or a strong total, so you want more money out. (Against an Ace under S17 you just hit, because the dealer's Ace is too dangerous.)
- **Never take insurance:** It's a side bet that the dealer's hole card is a 10. In a fresh deck the dealer completes blackjack only about 30.8% of the time, but insurance pays 2:1 — you need it to hit ~33.3% just to break even. The math is permanently against you. Skip it every time. (The only exception is deep card-counting territory, far beyond this course.)

---

## Part E — Why you don't win every hand (the section learners most need)

This is the emotional and conceptual crux of the whole app. Learners *will* follow the chart, lose a hand, and conclude the chart is broken. Head that off directly.

**1. Basic strategy minimizes the house's edge — it doesn't erase it.** Perfect play against our rules still leaves a house edge of about **0.44%**. It makes you lose *slowly*; nothing about blackjack makes you win.

**2. The structural reason the house wins: you act first.** If you bust, you lose **immediately** — even if the dealer would have busted too on the same hand. That "double bust goes to the house" asymmetry, plus the fact that you're acting without seeing the hole card, is the entire source of the edge. Every player-friendly rule (3:2 blackjacks, doubling, splitting, S17) is the casino handing a little edge *back* to keep the game attractive — but never enough to flip it.

**3. The actual outcome distribution (six-deck, S17, basic strategy):** you win roughly **42%** of hands, lose about **49%**, and push the remaining **~9%**. Read that again: **even with flawless play you lose more hands than you win.** You stay close to even (and beat most casino games) because your *wins* are worth more — blackjacks pay 3:2, and your doubles and splits put extra money out exactly when you're favored.

**4. A correct decision is not the same as a winning outcome.** This is the most important sentence in the course. You can make the mathematically perfect play and still lose the hand — that's **variance**, not a mistake. Over one hand, or one session, results are noisy and can swing wildly in either direction; the edge only shows up over thousands of hands. The chart is judged by its *average* result across a huge sample, not by whether it won the hand you just played. **The app must reward the decision, never the outcome** (see `how-to-teach.md`) — otherwise it teaches superstition.

**5. What learning the chart actually buys you:** it drops the house edge from roughly **2%+** (a casual "by feel" player) down to about **0.5%**. Concretely: on $25 hands, ~80 hands/hour for 4 hours (~$8,000 of total action), feel-play at ~2.5% expects a ~$200 loss; basic strategy at ~0.5% expects a ~$40 loss. Same luck, ~$160 of avoidable loss removed — purely by making the move the chart says.

> **Honest framing (keep this in the app):** basic strategy makes you *lose more slowly*; it does not make blackjack a way to make money. Even perfect play is negative expected value. Present the game as a skill to master and a way to lose less, not as income.

---

## Common errors this unit fights (feed these into distractors — see `how-to-teach.md`)

1. Standing on stiff hands (13–16) against a **strong** dealer upcard (7–A) because hitting "feels risky."
2. Hitting stiff hands against a **weak** dealer upcard (2–6) instead of letting the dealer bust.
3. Not doubling in strong spots (especially 11, and 10 vs. weak cards) — leaving money on the table.
4. Splitting 10s (greed) or failing to split 8s/Aces (fear).
5. Standing on soft 18 vs. 9/10/A instead of hitting — misreading a soft hand as a "safe" 18.
6. Taking insurance because the dealer's Ace looks scary.
7. Treating a lost hand as proof the chart is wrong (outcome-vs-decision confusion).
8. Trying to mimic the dealer's rules (always hit to 17) — this is a *worse* strategy than basic strategy, because unlike the dealer you don't get the "acts last" advantage.

---

*Sources: strategy cells cross-checked against Wizard of Odds and Blackjack Apprenticeship S17 charts; house-edge (~0.44%) from a 6-deck S17 DAS chart; win/lose/push distribution (~42% / ~49% / ~8–9%, Wizard of Odds simulations) corroborated across winstar.com, deucescracked.com, casinogrounds.com, pokertube.com; 16-vs-10 expected values from effortlessmath.com; insurance/dealer-blackjack math from standard odds references.*
