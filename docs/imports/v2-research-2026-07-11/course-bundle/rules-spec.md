# Rules Spec — Canonical Ruleset for the Course

> **This is the single source of truth.** Every unit, every lesson, and the strategy table are written against *these exact rules*. If your engine differs, change this file first, then propagate — because the "correct" answer to almost every strategy question depends on the ruleset.

## The ruleset we teach

| Rule | Value |
|---|---|
| Decks | 6 |
| Dealer on soft 17 | **Stands** (S17) |
| Blackjack pays | **3:2** |
| Double down | Any first two cards |
| Double after split (DAS) | **Allowed** |
| Split | Up to 4 hands |
| Re-split aces | Allowed (draw one card each) |
| Surrender | **Not offered** |
| Dealer peek for blackjack | Yes (dealer checks hole card on Ace/10 upcard) |
| Insurance offered | Yes (but it's a losing bet — see Unit 2) |

**Resulting house edge with perfect basic strategy: ≈ 0.44%.** That's the target number. A player using this exact strategy loses about 44 cents per $100 wagered over the long run — one of the best odds on any casino floor.

## Machine-readable flags (for the engine + content generation)

```json
{
  "ruleset_id": "6deck_S17_DAS_noSurrender_peek_bj3to2",
  "decks": 6,
  "dealer_hits_soft_17": false,
  "blackjack_payout": [3, 2],
  "double_allowed": "any_two",
  "double_after_split": true,
  "max_splits": 4,
  "resplit_aces": true,
  "surrender": "none",
  "dealer_peek": true,
  "insurance_offered": true,
  "house_edge_basic_strategy": 0.0044
}
```

## If you ever switch to "dealer HITS soft 17" (H17)

H17 is the *other* common 6-deck variant (very common on the Las Vegas Strip). It's slightly worse for the player and shifts a handful of chart cells. If your engine uses H17, flip `dealer_hits_soft_17` to `true` and apply these deltas to the Unit 2 table:

- **Hard 11 vs Ace:** Double (instead of Hit).
- **Soft 18 (A,7) vs 2:** Double (instead of Stand).
- **Soft 19 (A,8) vs 6:** Double (instead of Stand).
- **Pair of 8s vs Ace:** if surrender were also offered, surrender; with no surrender, still Split.
- Everything else stays the same.

Wizard of Odds' advice for anyone who only wants to memorize one chart: **learn the S17 chart** — the error cost of using the S17 chart on an H17 game is much smaller than the reverse. That's another reason we teach S17 as the baseline.

---

*Sources: strategy and house-edge figures cross-checked against Wizard of Odds (wizardofodds.com), Blackjack Apprenticeship (blackjackapprenticeship.com), and BlackjackInfo's basic-strategy engine (blackjackinfo.com).*
