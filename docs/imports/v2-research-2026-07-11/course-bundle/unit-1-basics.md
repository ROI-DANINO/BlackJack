# Unit 1 — Blackjack Basics (Knowledge Base)

> This is the **source-of-truth content** for Unit 1, not a lesson script. Each numbered sub-skill maps to roughly one Duolingo-style lesson. The `how-to-teach.md` file explains how to turn this into exercises. Rules assumed: see `rules-spec.md` (6-deck, S17, DAS, 3:2).

## Unit goal

By the end of Unit 1, a learner can sit at a table, understand every card and every action, and correctly play out a hand *legally* — without yet knowing the optimal play. They know **what** the choices are; Unit 2 teaches **which** to choose.

## The one idea to plant first (and defend all unit)

**The goal is to beat the dealer's hand — NOT to get as close to 21 as possible.**

This is the single most damaging beginner misconception, and almost every bad instinct downstream traces back to it. A player chasing "close to 21" hits hands they should stand on and busts constantly. Frame the whole game as *you vs. the dealer*: you win by having a higher total than the dealer without going over 21, **or** by the dealer busting. 21 is just the ceiling you can't cross, not the target you're aiming for.

Teach this explicitly and early, then reinforce it every time it's relevant.

---

## Sub-skill 1 — What blackjack is

- Blackjack is a card game played **against the dealer**, not against the other players at the table. Whether the person next to you wins or loses has no effect on you. (Beginners often think they're competing with the table.)
- **How you win a hand:** your hand totals higher than the dealer's without exceeding 21; OR the dealer exceeds 21 ("busts").
- **How you lose:** you exceed 21 (you bust — instant loss); OR the dealer's total is higher than yours without busting.
- **Tie ("push"):** equal totals → nobody wins, you get your bet back.

## Sub-skill 2 — Card values (the vocabulary of the game)

- **2 through 10:** worth their face number.
- **Jack, Queen, King:** each worth **10**.
- **Ace:** worth **1 or 11** — whichever helps you more, and it can change mid-hand.
- **Suits don't matter** in blackjack. Only the numeric value.

**Hard vs. soft hands** (critical vocabulary for Unit 2):
- A **soft** hand contains an Ace currently counted as 11 (so it *can't bust* on the next card — the Ace can drop to 1). Example: A + 6 = "soft 17."
- A **hard** hand has no Ace, or has an Ace that must count as 1 (because counting it as 11 would bust). Example: 10 + 7 = "hard 17"; A + 6 + 10 = "hard 17" (the Ace is now forced to 1).
- The *same total* plays very differently soft vs. hard. This distinction is the backbone of the strategy table, so nail it here.

## Sub-skill 3 — The deal and the table

- You place a bet, then everyone is dealt **two cards**.
- The **dealer** gets one card face-up (the **upcard**) and one face-down (the **hole card**). The upcard is the single most important piece of information you have — everything in basic strategy keys off it.
- With our peek rule, if the dealer's upcard is an Ace or a 10-value card, the dealer checks the hole card for blackjack before play continues.
- Your two cards are yours to act on; the dealer's hand is fixed by rules (Sub-skill 6).

## Sub-skill 4 — Blackjack (a "natural")

- A **blackjack** (or "natural") is an Ace + any 10-value card in your **first two cards** — an automatic 21.
- It **pays 3:2** (bet $10, win $15) and beats any other 21 made from three or more cards.
- If both you and the dealer have blackjack, it's a **push**.
- Odds of being dealt one: roughly **1 in 20 hands (~4.8%)**.

## Sub-skill 5 — Your actions (the choices you own)

These are the moves available on your turn. *Whether* to use each one is Unit 2; *what they are* is here.

- **Hit** — take another card. You can keep hitting until you stand or bust.
- **Stand** — take no more cards; end your turn with your current total.
- **Double down** — double your bet in exchange for **exactly one** more card, then you must stand. A commitment: bigger reward, but you only get one card.
- **Split** — if your two cards are a pair, separate them into two hands, each getting a second card and a matching bet. Now you play two hands. (With our rules you can double after splitting, and re-split up to 4 hands.)
- **Insurance** — offered when the dealer shows an Ace: a side bet that the dealer has blackjack, paying 2:1. **It exists, but it is a losing bet** — teach it as a trap to recognize and decline, not a tool. (Full reasoning in Unit 2.)
- *(Surrender is not offered in our ruleset. Mention it exists at some tables — give up half your bet to fold a bad hand — but it's not part of this course's decisions.)*

## Sub-skill 6 — The dealer has no choices

This surprises beginners and it's reassuring once understood: **the dealer follows fixed rules and makes zero decisions.**

- The dealer **must hit** until reaching a total of **17 or more**.
- The dealer **must stand** on **17 or higher** — including **soft 17** (that's our S17 rule).
- The dealer can't double, can't split, can't choose. This is why the game is *solvable*: because the dealer is a machine, mathematicians could compute the best response to every situation (that's basic strategy, Unit 2).

## Sub-skill 7 — Outcomes and payouts

- **Regular win:** pays **1:1** (even money) — bet $10, win $10.
- **Blackjack:** pays **3:2**.
- **Push (tie):** bet returned, no win or loss.
- **Bust:** you exceed 21 → immediate loss, *before the dealer even acts*. (Remember this — it's the entire reason the house has an edge, covered in Unit 2.)
- **Insurance:** pays 2:1 if taken and the dealer has blackjack.

## Sub-skill 8 — The order of play (putting it together)

1. Bets are placed; cards are dealt.
2. Dealer checks for blackjack if showing an Ace/10 (peek rule).
3. **Each player acts in turn** — hit / stand / double / split — until they stand or bust.
4. **Then the dealer acts**, revealing the hole card and drawing per the fixed rules.
5. Hands are compared; payouts are settled.

The key structural fact hidden in this order: **you always act first.** Hold onto that — it's the seed of Unit 2's "why you still lose sometimes."

---

## Optional side track — Casino etiquette (for players headed to a real table)

Clearly optional. Casual/app learners can skip it; casino-bound learners should get it as its own short branch so the core lessons stay clean.

- **Buying in:** place cash on the table (don't hand it to the dealer); they convert it to chips.
- **Signaling your action with your hands** (cameras need to see it; verbal alone isn't enough in most rooms):
  - *Hit:* tap or scratch the felt behind your cards.
  - *Stand:* wave a flat hand horizontally over your cards.
  - *Double/Split:* place the additional chips next to your bet; say the word.
- **Don't touch the cards** (in face-up shoe games) and **don't touch your bet** once the hand starts.
- **Table minimums/maximums:** posted on a placard; make sure the minimum fits your bankroll.
- **Tipping ("toking") the dealer** is customary but optional — e.g., a small bet placed for the dealer.
- **Table rules vary even within one casino** — check the placard: *especially* look for "pays 3:2" (avoid 6:5) and "stands on all 17s."

---

## Glossary (terms introduced this unit)

Hit · Stand · Double down · Split · Insurance · Bust · Push · Upcard · Hole card · Hard hand · Soft hand · Natural / Blackjack · Shoe · Toke

## Misconceptions to preempt (these become your wrong answers — see `how-to-teach.md`)

1. "The goal is to get to 21 / as close as possible." → No: beat the dealer without busting.
2. "I'm playing against the other players." → No: only against the dealer.
3. "Face cards are worth 11" or "an Ace is always 11." → J/Q/K = 10; Ace = 1 **or** 11.
4. "A soft 17 and a hard 17 are the same." → They play completely differently.
5. "If I bust but the dealer also busts, it's a push." → No: you already lost the moment you busted; the dealer's hand is irrelevant.
6. "Blackjack pays the same as any win." → No: 3:2, and it beats a 3-card 21.
7. "Insurance protects me / is smart when the dealer shows an Ace." → It's a losing side bet (Unit 2).
8. "The dealer decides whether to hit me / can choose to bust me." → The dealer has no choices at all.

---

*Sources: card values, actions, payouts, and blackjack frequency cross-checked against standard casino rules pages (Wizard of Odds, casino rule placards) and blackjack odds references (winstar.com, casinogrounds.com).*
