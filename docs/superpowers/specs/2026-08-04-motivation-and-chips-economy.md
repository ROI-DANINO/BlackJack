# The Motivation and Chips Economy — LDB-05

> **Status: DESIGNED 2026-08-04, awaiting the `user-approval` gate.**
>
> Every ruling below was put to the owner during a `grill-with-docs` session on 2026-08-04 and
> answered directly. The three §12 divergences need explicit assent at the gate; nothing else here
> is offered as a question.
>
> ROADMAP Phase 4 deliverable 6. **Phase 4 designs and builds nothing** — this document produces no
> code and authorises none. Its schema deltas (§11) are owed to phase 5, not applied here.
>
> **Card:** `LDB-05` — *Design the motivation and chips economy.*
> **Source:** `docs/superpowers/specs/2026-07-26-chips-xp-and-progression-economy.md` — the owner
> premise and the seven open questions `E-1`–`E-7`.
> **Consumes:** `2026-08-03-evidence-and-mastery-rules.md` (mastery, `Completion`, `Review due`, and
> the D9 boundary that the chips gate is this card's); `2026-08-01-activity-taxonomy.json`
> (`deal-and-decide` is `primaryFor` `adherence-under-loss`); `2026-08-01-skill-graph.json`;
> `2026-07-23-graded-decision-practice-design.md` §2b (the five owner product constraints);
> `docs/specs/product-vision.md` (the four motivation prohibitions);
> `docs/specs/learning-mastery-and-scoring.md:170-174` (the rating model, established early);
> `docs/superpowers/research/evidence-index/P1-evidence-catalog.md` (C1 — rating calibration);
> `crates/blackjack-core/src/session.rs` and `web/src/app/Table.tsx` (the shipped bankroll).
> **Reads but adopts nothing from:** `journal/raw/_inbox/p4-economy-design/` — see §14.

---

## 0. What this document decides, and what it does not

**It decides:** whether a won hand returns chips and on what terms (`E-1`); what happens at an empty
wallet (`E-2`); the *shape* by which learning work pays, and that its constants are placeholders
(`E-3`); what gates Free Play access (`E-4`); how XP, the player score, and the chip balance relate
to one another and which of them may move a learner's standing (`E-5`); the rating mechanism and why
it needs no minimum population (`E-6`); and it records the leaderboard disposition as inherited
rather than decided (`E-7`).

**It does not decide:** what the practice mode serves, when its sections open, session entry, size,
stopping, mix, or pace (`LDB-06`); any widget, control, layout, copy, animation, or WCAG target
(`LDB-07`); which Activity types phase 5 builds (`LDB-08`); anything about mastery itself, which
`LDB-04` settled and this document consumes unchanged.

**Where this document names a number, that number is invented.** The phrase "research-calibrated" is
not available in this repository (`A-07`). This design deliberately names **no** numeric value at
all — it fixes the shape and files the constants as owed sub-rows (§10), because `E-3`'s answer at
the gate was *shape, not numbers*.

---

## 0.1 Binding product constraints

Two sets bind every ruling below. Neither was rediscovered here; both are carried in so the economy
does not have to be re-argued against them.

**The four motivation prohibitions**, `docs/specs/product-vision.md:88-90`, opened and quoted
first-hand 2026-08-04:

> *"Motivation should reward practice, comprehension, and improving decision quality. It must not
> celebrate money won, encourage loss chasing, imply guaranteed profit, or punish a learner for
> ending a session."*

And `:84-86`, which is the commitment the economy is most able to break:

> *"A correct decision can lose and a poor decision can win; the product must show those as separate
> facts so it teaches skill rather than superstition."*

**The five owner product constraints of 2026-07-23**, `2026-07-23-graded-decision-practice-design.md`
§2b, recorded there as *"product judgement, not evidence-backed"*:

1. The learning path must not be steep. Confusion is a failure of the design, not of the learner.
2. **It must not be frustrating.**
3. **It is a game. It has to be fun.** Not a quiz with a card table drawn behind it.
4. The drill assumes table literacy — practice, not first exposure.
5. **Mastery means deciding correctly *without* the table.**

Constraint 3 has particular force here. An economy is the one part of a learning product whose whole
job is motivation, and this repository has a documented habit of designing the fun out of things by
making every mechanism safe. `journal/decisions.md:181-183`: *"Playability and learnability are co-equal
priorities that feed each other — fun comes from competence at a genuinely hard game, and competence
is what the learning delivers."*

**Three further constraints inherited from approved LDB cards**, each of which forecloses a
mechanism the economy might otherwise reach for:

- **No economy mechanic may take a learner self-rating as an input to anything** — `LDB-03` rejected
  U2-9 outright, and `LDB-04` D12 removed the one calibration-shaped mechanism that could have
  carried one. `[Evidence-backed]`
- **No economy mechanic may surface a pass/fail verdict** — `LDB-03` §6.3, applied concretely as
  `rule-contrast`'s `verdictSurfaced: false`. A score may exist without being surfaced as jeopardy.
  `[Evidence-backed]`
- **No economy mechanic may present an expected-value number as a learner-facing score, and none may
  be justified as teaching the maths** — `LDB-01` gives EV no Skill, and ROADMAP deliverable 2 as
  amended ships probability, EV and variance only where they change a decision. `[Evidence-backed]`

---

## Problem Statement

The learner has no reason to come back tomorrow.

The product's entire motivational surface today is a hardcoded number. `web/src/app/Table.tsx:8`
reads `const START_BANKROLL = 100000; // cents` — a thousand dollars of chips conjured from nothing,
passed into `startSession` with no source, no persistence, and no relationship to anything the
learner has done. `journal/decisions.md:194-195` states the consequence plainly: *"Free Play has an
economy today with no source for it."* Close the tab and it resets. Play well for an hour and it
resets. Nothing the learner earns survives, so nothing they do accumulates into a reason to continue.

Meanwhile `web/src/progress/` — the durable store built to hold exactly this — has never had a
product consumer outside its own QA harness.

The owner's premise names three meters (chips, XP, a chess-style player score) and leaves seven
questions open, of which one is load-bearing: **does winning return chips?** Every route out of it
looks like a trap. If wins fund the wallet, the product rewards *outcome* — the one thing the
learning design decouples at every level, and the thing `product-vision.md:84-86` exists to forbid.
If they do not, Free Play stops being a bankroll simulation at all, against a product whose whole
claim is training for a real table. And the mitigation the premise leans on — that chips buy nothing
— is untested: whether a purely cosmetic reward for winning still trains outcome bias is `A-20`, an
open register row.

## Solution

**Chips are earned by winning or by learning. Money never buys chips. Chips buy table time and
nothing else.**

That is the whole economy, and the trap dissolves at the third clause rather than the first. The
premise's own framing sentence had it as *"learning earns table time"*; the owner's ruling of
2026-08-04 widens the faucet and narrows the sink instead. Winning may fund your wallet freely,
because a full wallet advances you on **no** axis — not a unit, not a Skill, not a rank, not a
difficulty tier. The thing the product refuses to sell for chips is *progress*, and progress is
computed from decision evidence alone.

So Free Play is an honest casino simulator under real casino rules: a persistent wallet, a real
buy-in, a real stack, real wins and real losses, no cap on what you take away. The learner who goes
broke is genuinely broke, and the only way back to the table is to learn. And the learner who wins
big has bought themselves more hands at a table whose *character* — chart-off play, new rulesets,
faster pace, later count tools — still opens only to demonstrated skill.

Three meters, three jobs, never blended: **chips** are a wallet, **XP** is the effort ledger, the
**player score** is a rating that moves with decision quality. They sit side by side on one player
card, which is what makes it read as a single progression; nothing is summed. And the rating ingests
Free Play decisions graded by the strategy oracle, so the table finally becomes a place where
progression happens — driven by *how you played*, never by *what you won*.

## User Stories

1. As a new learner, I want a starting chip balance the moment I finish the first tutorial, so that
   my first table session is something I earned rather than something I was handed.
2. As a learner, I want my chip balance to still be there tomorrow, so that a session means
   something beyond the hour I spent in it.
3. As a learner, I want my balance to survive closing the browser and logging back in, so that I can
   play on my own schedule.
4. As a learner, I want to buy in to a table for a chosen stack, so that sitting down feels like
   sitting down at a real table.
5. As a learner, I want my whole stack back when I leave, so that ending a session never costs me
   anything.
6. As a learner, I want the hands I win to actually pay, so that the table is not lying to me about
   what blackjack is.
7. As a learner, I want the hands I lose to actually cost, so that the decisions I make there carry
   the weight they carry at a real table.
8. As a learner, I want to never be able to buy chips with money, so that I know the only currency
   here is skill and time.
9. As a learner who has run out of chips, I want a clear route back to the table through learning,
   so that being broke is a prompt rather than a wall.
10. As a learner who has run out of chips, I want no timer, no wait, and no purchase offer, so that
    the product never feels like it is monetising my impatience.
11. As a learner mid-curriculum, I want completing the next lesson to fund my next session, so that
    the learning path and the table pull in the same direction.
12. As a learner, I want practice on material I have already covered to be available and to pay, so
    that I am never stranded with nothing to do and nothing to earn.
13. As a learner, I want practice on the skills I most need to maintain to pay best, so that the
    economy points me at what is actually worth doing.
14. As a learner, I want practice on material I have fully mastered to still pay something, so that
    being good at everything never leaves me with no way to earn.
15. As a learner, I want a bound on how much I can earn from practice in a given window, so that the
    product is not asking me to grind.
16. As the owner, I want that bound to be a named, changeable constant, so that playtesting can move
    it rather than argue about it.
17. As a learner, I want the tables to open early, so that I reach the game while I am still curious
    about it.
18. As a learner, I want to be able to complete a round before I am dropped at a real table, so that
    my first session is not bewildering.
19. As a learner, I want the table itself to get more interesting as I improve — chart-off play, new
    rulesets, faster pace — so that mastery buys something I can feel.
20. As a learner, I want new table character to come from demonstrated skill and never from my
    balance, so that a lucky run does not counterfeit progress.
21. As a learner, I want to see my rank, my XP, and my chips as three separate things, so that I can
    tell what each one is actually telling me.
22. As a learner, I want my rank to move with how well I played, so that it means something.
23. As a learner, I want my rank to be unaffected by whether I won or lost, so that variance cannot
    make me look better or worse than I am.
24. As a learner, I want my XP to never go down, so that effort I have already spent is never taken
    away from me.
25. As a learner, I want work done at a higher rank to be worth more XP, so that improving is worth
    something on both meters at once.
26. As a learner, I want a rating that works from my very first session, so that I am not waiting for
    other players to exist before the product can tell me anything.
27. As a learner, I want the difficulty of what I am given to track my rating, so that the product
    stays at the edge of what I can do.
28. As a learner, I want a hand I played correctly and lost to be recorded as a hand I played
    correctly, so that the product's grading matches its teaching.
29. As a learner, I want no fanfare when I win money, so that the product is not teaching me to chase
    it.
30. As a learner, I want no running total of my lifetime winnings, so that there is no number to
    chase back to even.
31. As a learner who busted a stack, I want a summary of how I decided rather than a note that I am
    broke, so that the session ends on something I can use.
32. As a learner, I want to leave whenever I like with no penalty, so that the product never punishes
    me for having a life.
33. As the owner, I want every constant in this economy filed with a validation method, so that
    playtesting can settle them instead of taste.
34. As the owner, I want `LDB-06` and `LDB-07` to receive explicit handoffs, so that the questions
    this card deliberately did not answer are not silently dropped.

---

## Implementation Decisions

### D1. The wallet is unwalled and persists — `E-1`

**A won hand returns chips. A lost hand takes them.** The wallet persists across rounds, sessions,
and logouts. There is no cap on winnings and no ceiling on the balance.

The premise's own governing sentence is amended by owner ruling of 2026-08-04. It read
(`2026-07-26-chips-xp-and-progression-economy.md:47`):

> *"Learning earns table time; money never buys chips."*

It now reads: **learning *or winning* earns table time; money never buys chips.** The prohibition was
never on outcome as a faucet — it was on real money. This is §12 divergence 1.

**Why this does not break `product-vision.md:84-86`.** The decoupling commitment is about what the
product *says and credits*, not about the table's arithmetic. A table where winning does not pay is
not a real table; it teaches that every hand loses, which is a worse distortion than the one being
avoided. The separation is enforced where the bias actually operates — in what moves the learner's
**standing** (D7, D9) and in what the product **celebrates** (D12) — not by rigging the payouts.

**What makes it safe is the sink, not the faucet.** Chips buy table time and nothing else. A chip-rich
learner has bought more hands at a table whose character cannot improve without mastery (D6). They
have advanced on no axis. `[Product judgement]` on the ruling; `[Evidence-backed]` that the engine
already computes settlement this way (`session.rs:63-74`, `:214`, `:235-242`, `:383-384`).

### D2. The buy-in is a real transfer, and cash-out returns everything — `E-1`

Sitting down moves chips from the **wallet** to a **table stack**. Leaving moves the whole remaining
stack back, wins included, with nothing withheld.

**This maps one-to-one onto shipped machinery.** `start_session(seed, bankroll, default_bet, ruleset)`
(`session.rs:8-12`) already takes a bankroll at session start; `start_round` already refuses when
`session.bankroll < bet` (`:73-74`); doubles and splits already gate on `bankroll_available`
(`rules.rs:92,103,111`). The buy-in **is** the `bankroll` argument. This supplies the missing source
for `Table.tsx:8`'s `START_BANKROLL`, which is the defect named in the Problem Statement.

**Nothing is withheld at cash-out.** An earlier candidate design capped what returned to the wallet;
the owner declined it. A cap at the exit would punish ending a session, which `product-vision.md:90`
forbids by name, and would create a never-leave-the-table incentive. `[Product judgement]`

**Why a stack rather than betting straight from the wallet.** Three reasons, all product: it is what
a real casino does, which is the stated frame; busting a stack becomes a real moment that ends a
session without ending the learner's standing; and a stake level gives table tiers something to be
denominated in when D6's mastery-gated table character arrives.

### D3. An empty wallet is a real setback, and learning is the only refill — `E-2`

At zero chips, Free Play closes. **The only route back is learning.** No timer, no regeneration, no
top-up, no purchase, ever — the last of those being the premise's one absolute.

**Where the refill comes from depends on where the learner is.** Mid-curriculum it is the curriculum
itself: the next lesson or unit pays on `Completion`, which `LDB-04` D14 preserved for exactly this
reason — *"completion is the economy's trigger… retiring it inside a mastery ruling would delete
LDB-05's central mechanic as a side effect."* Once material has been covered, D4's practice mode is
also available over it.

**The dead end this closes.** The curriculum is finite — nine units ship today
(`web/src/learn/content/blackjack-basics.ts:613-623`), eighteen Skills across three Subjects are
designed. A rule of "go learn" with a finite curriculum strands the learner who has finished it. D4
and D5 are what prevent that, and the guarantee is stated positively: **there is no reachable state
in which a learner has no way to earn.** `[Product judgement]`

### D4. Practice is the standing faucet, and it is bounded — `E-2`

An always-available practice mode serves activities over material the learner has already covered,
and pays as they go. It is **bounded, not open**: it opens progressively as learning stacks, and what
it can pay in a given window is capped (D5).

**It cannot be used to skip the ladder.** Practice runs only over material already covered, so it is
never a route past the curriculum — it is a route *back through* it. `[Product judgement]`

**Its farming exploit is self-defeating and is left in deliberately.** To earn from practice a
learner must produce correct decisions on a confusable pool, which is deliberate practice — the
product's entire point. This is the rare exploit whose exploiter loses by winning. `[Product
judgement]`

**What this card does not decide about it.** Which sections open when, what the mode serves, how it
sequences, and how it stops are **`LDB-06`'s** — `2026-08-03-evidence-and-mastery-rules.md` §13
already assigns session composition there, and D8 of that document assigns staleness to the
recommender rather than to mastery. **This ruling is written to hold whatever subset of sections is
open**, so nothing here is blocked on that answer. See §13.

### D5. The pay tier: full rate, trickle, cap — `E-3`

Three rules, no numbers.

1. **Due and maintenance work pays the full rate.** A Skill in `Review due` — mastery reached, live
   window since fallen (`LDB-04` D8) — and a first `Completion` of new material both pay full.
2. **Practice on already-mastered material pays a reduced trickle that never reaches zero.** This is
   what makes D3's guarantee true rather than aspirational. The recommender's suggestion becomes the
   *economically preferred* path rather than the only paid one — a steer expressed in the economy
   instead of in a lock, which matters because `LDB-04` D9 ruled that mastery locks nothing.
3. **Both sit inside a per-window cap.** Total practice earnings are bounded per window.

**Wrong answers cost nothing.** Learning activities never debit the wallet — premise, held
everywhere, no entry fees and no penalties. Punitive mechanics are counterproductive where wrong
answers are the teaching mechanism (`docs/imports/v2-research-2026-07-11/course-bundle/how-to-teach.md:122`,
reopened first-hand 2026-08-04 — see §16 correction 3).

**Every constant here is a placeholder** and is filed in §10: the buy-in, the table minimum, the full
rate, the trickle rate, the cap amount, and the window length. `[Product judgement]` on the shape;
the values are `[Assumption]` and carry rows.

### D6. Free Play opens early; mastery gates table *character*, not access — `E-4`

**One gate, and it is early.** Free Play opens when the learner can complete a round — the
`COMPLETE_ROUND` unit of `blackjack-basics` (`blackjack-basics.ts:622`) — which is also where the
premise's fixed onboarding chip grant lands. "Has chips" and "has reached the level" are therefore
the same moment, and the premise's two-part gate collapses into one.

**After that, access never closes except by an empty wallet.** What improves with mastery is the
table itself: chart-off tables, new rulesets, pace tiers, later count tools. This is the established
line — *"unlocks based primarily on mastery"* (`learning-mastery-and-scoring.md:173`) — applied to
the table rather than to the curriculum, and it is consistent with `LDB-04` D9's ruling that mastery
locks no *content*, since D9 explicitly reserved the economy gate to this card.

**Why not later.** Constraint 3 — it is a game and it has to be fun. Gating the table behind a whole
Subject buys pedagogical safety with the thing the product is for. Constraint 4 — table literacy — is
satisfied by `COMPLETE_ROUND`, which is precisely the literacy it names. `[Product judgement]`

### D7. Three meters, three jobs, never blended — `E-5`

| Meter | What it is | Moves with | May gate |
|---|---|---|---|
| **Chips** | A persistent wallet | Winning, losing, learning | Table time only |
| **XP** | The effort ledger; monotonic, never falls | Work done, scaled by rating (D8) | Nothing |
| **Player score** | A rating; rises and falls | Decision quality, including at the table (D9) | Difficulty only |
| *Mastery* | *Not a meter — computed evidence (`LDB-04`)* | *Decision behaviour* | *Table character (D6)* |

**They are displayed side by side and never summed.** One player card, three separate facts. This is
what makes progression read as a single thing without any of it being blended.

**Chip count may never feed standing.** A blended number in which the wallet contributes to rank
would make a lucky run raise the learner's standing, which is `product-vision.md:88-90`'s *"celebrate
money won"* directly, and would teach the superstition `:84-86` exists to prevent. The owner
considered a blend on 2026-08-04 and declined it. `[Evidence-backed]` on the prohibition; `[Product
judgement]` on the three-meter shape.

**Bankroll and learning score stay visually distinct** — an inherited requirement
(`v2-research-06-ux-foundations.md:87,135-142`), and D7 is its structural form.

### D8. The link is a rate coupling: the rating scales XP earn rate — `E-5`

The premise's stated position was that **XP should be linked directly to the player score.** They
behave oppositely — XP accumulates and never falls; a rating rises and falls — so an identity would
require breaking one, and a score that cannot fall is not a rating.

**Resolved as a rate coupling.** Work done at a higher rating pays more XP. XP stays monotonic and
stays the celebration layer — levels, daily goals, the Duolingo-like surface the product's genre
commitment rests on. The rating stays a real rating: internal, two-directional, driving difficulty.
The link is real, and neither property is broken. `[Product judgement]`

**Both survive rather than one being dropped.** Dropping XP was considered — the older established
model (`learning-mastery-and-scoring.md:170-174`) lists *internal rating, visible rank/level, mastery
by skill, unlocks primarily by mastery, difficulty adjusted by rating* and contains **no XP at all**.
It was declined: removing XP removes the most recognisable motivational surface from a product whose
genre commitment is Duolingo-like, against constraint 3.

### D9. The rating ingests Free Play decisions, graded by the oracle — `E-5`

Every Free Play decision is graded against the strategy oracle and recorded, with the support
Condition (`table-open` / `table-closed`) captured. **The rating moves with how the learner played.
It does not move with what they won.**

**This is what "the table matters to progression" means here**, and it is the whole answer to the
owner's instinct that the meters should mix. Playing well at a real table raises your score; playing
badly lowers it; winning and losing do neither.

**`adherence-under-loss` is the Skill that carries it.** `2026-08-01-activity-taxonomy.json` makes
`deal-and-decide` `primaryFor` `adherence-under-loss`, with `provenance: ["organic","arranged"]` — it
cannot be posed. That is the named instrument `LDB-04` §13 handed to this card, and it is precisely
the capability *"played correctly and lost"* names. `[Evidence-backed]` on the mapping; `[Product
judgement]` on the ruling.

**This lives inside the sanctioned envelope.** `product-vision.md:69-71` permits the learning layer
to help *around* the game — optional table access, hints, count tools, post-session feedback — and
forbids manipulating cards for lesson purposes. Silent grading touches no card flow.

### D10. The rating fits per learner, online, from a published default — `E-6`

**One mechanism, not a primary and a fallback.** Every item starts at a published default constant
and adapts from that learner's own responses. It behaves identically at one learner and at a million,
so **no minimum population is required and no below-N threshold needs a value.** The premise's
"roughly 25 users" fallback is not chosen — it is dissolved.

**The evidence, read first-hand at `P1-evidence-catalog.md`.** `:54` **F26** (Sense, Meijer & van Rijn
2018, *Front Educ*, Q3) documents *"start every item at a fixed default of 0.3, adapt online from the
single learner"* — the cleanest finding in that pass, 4/4 quotes verbatim, and a shipped architecture
rather than a proposal. `:113` **F2** confirms the alternative is unavailable: Chess.com's puzzle
rating *"is determined by who is able to solve it"* — crowd calibration, not population-free seeding.
`:36` **F8** is the "needs at least 100 students" figure, and `:179` bounds it: *do not treat "100
students" as a floor; 1PL/Rasch with Bayesian priors is calibratable near ~100, 2PL/3PL is not.*

**Two qualifications that the premise document omits and this design carries, both from `:59`:**

- **Population-*light*, not population-free.** The head statement asserting the population requirement
  *falsified* was **struck as overstated**, and a verifier ruled it **not** falsified. The published
  default constant is itself a number somebody derived from a population.
- **The supporting citations are one lab.** F17/F24/F25/F26 are Groningen/van Rijn, one system
  (SlimStampen/MemoryLab), one commercial lineage — *"four citations on C1's central question,
  previously undisclosed, and not four independent lines of evidence."*

Both are filed as `A-24` (§10). The decisive fact needs no citation: **this product has one user.**
`[Evidence-backed]` on the architecture and on both qualifications; `[Product judgement]` on adopting
it as the sole mechanism.

### D11. The leaderboard is deferred — inherited, not decided — `E-7`

`E-7` is already ruled by a standing decision and this card records rather than re-opens it.
`ROADMAP.md:249`: the engine is client-authoritative and the browser can see the entire undealt shoe
in every response, so a leaderboard here is **forgeable**; `CLOUD-06` defers leaderboards pending
anti-cheat authority, and a real one *"implies server authority, which is an architecture change
rather than a feature."* That row names itself *"load-bearing for the economy design."*

**Consequence for D7.** XP's only stated job in the premise was to feed a leaderboard, and that job
is deferred. XP survives on its second job — levels, daily goals, the celebration layer — which D8
makes explicit. **No chip leaderboard may ever exist**, on D12's grounds independently of anti-cheat.
`[Evidence-backed]`

### D12. What this economy may never do

The four prohibitions, applied concretely so a later slice cannot violate them by inattention.

- **Never celebrate money won.** No confetti, animation, sound, or streak keyed to a win or to
  profit/loss. A session summary leads with decision quality; the bankroll result appears as one
  plain simulation fact. No "biggest win", no lifetime-winnings statistic, no chip leaderboard.
- **Never encourage loss chasing.** No cumulative profit/loss ledger anywhere in the product — a
  per-session net is an honest fact, a persistent running total is a target to chase back to even.
  Empty-wallet copy is framed as training, never as recouping: no "win it back", no "recover".
- **Never imply guaranteed profit.** Copy speaks in loss-rate terms — *"your stake buys more
  hands"* — never in win terms. Binding on any future counting curriculum especially.
- **Never punish ending a session.** Cash-out returns the whole stack (D2). No streak mechanic may
  destroy accumulated reward for a missed day; if streaks exist at all they are gentle, XP-layer
  only, and they remain a non-binding progression idea rather than an approved mechanic
  (`docs/imports/2026-07-15-v2-future-guidance/INDEX.md`, CLOUD-02).

And one carried from `LDB-04` D1's Condition rule: **a lucky wrong decision must never receive the
same celebration as a correct one**, which D9's oracle grading enforces structurally rather than by
copy discipline.

---

## Testing Decisions

**Phase 4 builds nothing, so this section specifies what phase 5 must be able to test, not tests to
write now.** The seams named are existing ones.

**What makes a good test here.** Only external behaviour. The economy's observable surface is: a
wallet balance that changes, a table that opens or refuses, and a rating that moves. Every assertion
below is written against one of those three, never against an internal reducer shape.

**The highest seam is the existing engine boundary.** `dispatch_json` already carries session
commands as serialisable JSON; `start_session`/`start_round`/settlement already own money. The
economy adds **no new seam to the engine** — the buy-in is the existing `bankroll` argument (D2), and
settlement is already computed. The one genuinely new seam is **wallet persistence**, and it belongs
at `web/src/progress/`'s existing store boundary, which already has a QA harness and a migration and
recovery suite (`2026-07-17-progressstore-cycle1-design.md`).

**Modules that will need tests:**

- **The wallet store** — persistence across reload, across simulated logout, and under the store's
  existing corruption/quota/`versionchange` failure modes. Prior art:
  `web/research/browser-storage/src/suite.ts` and the ProgressStore cycle-1 suite.
- **The earn/spend reducer** — that a `Completion` credits, that a `Review due` clear credits at full
  rate, that mastered-material practice credits a non-zero lesser amount, that the per-window cap
  bounds a window's total, and that no learning activity ever debits.
- **The buy-in and cash-out path** — that a buy-in cannot exceed the wallet, that cash-out returns
  the full remaining stack, and that leaving mid-round cannot lose committed wager state.
- **The access gate** — that Free Play refuses below the `COMPLETE_ROUND` gate and at a zero wallet,
  and opens otherwise.
- **The rating** — that it moves on oracle-graded decision correctness and is **invariant to hand
  outcome**. This is the single most important test in the economy: a property test asserting that
  two identical decision sequences with opposite `HandOutcome` results produce the identical rating
  delta.

**One assertion belongs in a lint or a check script rather than a unit test:** that no rating or XP
computation reads `handOutcome` or any wallet field. `LDB-04` established the precedent — its
approval produced `scripts/check-ldb03-taxonomy.js` after §11 claimed six checks that did not exist.
This document does not claim the check exists; it specifies it as owed to phase 5.

---

## Out of Scope

- **Which sections of practice open when, and what the mode serves** — `LDB-06`. See §13.
- **Session entry, size, stopping, mix, pace, and feedback timing** — `LDB-06`.
- **Every widget, control, layout, animation, copy string, and WCAG target**, including how the
  player card renders three meters without them reading as one, how the empty-wallet state is
  presented, and how a session summary orders decision quality above profit and loss — `LDB-07`.
  D12 states what the copy may not *say*; it writes none of it.
- **Which Activity types phase 5 builds and the phase-5 instrumentation subset** — `LDB-08`.
- **Anything about mastery** — `LDB-04`, consumed unchanged.
- **Accounts, login, and cross-device sync.** D1 says the wallet survives logout; *how* identity works
  is `CLOUD-02` and is not designed here.
- **A real leaderboard** — `CLOUD-06`, and it implies server authority (D11).
- **Any code change.** No file is edited by this document and none is authorised.

---

## Further Notes

### 10. Register delta

**Three sub-rows under `A-07`, two new top-level rows, and one existing row corrected.** To land at
approval, not before.

| Filed as | Covers | Validation |
|---|---|---|
| **`A-07b`** | The stake constants — buy-in amount and table minimum bet | **production telemetry.** Named first test: what fraction of sessions end by busting the stack within N hands? A buy-in that busts too fast makes the table feel punitive; one that never busts makes it feel weightless. |
| **`A-07c`** | The pay rates — full rate per `Completion` and per `Review due` clear, and the reduced trickle for mastered-material practice | **production telemetry.** Named first test: measured wallet trajectories — how many minutes of learning fund one session, and does the trickle alone keep a fully-mastered learner solvent? |
| **`A-07d`** | The per-window cap — amount and window length | **playtesting.** Named first test: do learners report hitting the cap, and does hitting it read as a stopping point or as a wall? |
| **`A-24`** | Per-learner online item fitting from one published default constant is sufficient for this product's rating at n = 1 learner | **production telemetry.** Named first test: does the fitted per-item parameter stabilise within one learner's own response history, and does difficulty selection track measured accuracy? **Two qualifications recorded on the row:** the architecture is population-*light*, not population-free — the default constant is itself population-derived, and the claim that the requirement was falsified was struck as overstated (`P1-evidence-catalog.md:59`); and F17/F24/F25/F26 are **one lab, one system, one commercial lineage**, not four independent lines of evidence. |
| **`A-25`** | The per-window practice cap does not read as an energy gate | **playtesting.** Named first test: after hitting the cap, do learners describe the product as asking them to wait? Population is narrow by construction — it can only bite a learner who is both broke and out of full-rate work. |

**`A-20` is corrected, not merely cited.** It currently reads *"the chips economy's **cosmetic**
reward for winning does not teach outcome bias."* Under D1 the reward is **not cosmetic** — winning
returns real chips that buy real table time. The mitigation is narrower than the row claims and must
say so: chips buy no *advancement*. The row's validation method gains its named instrument, which the
card requires by name: **`adherence-under-loss` divergence across matched arranged and organic runs,
sharing the `P-1` instrument.** Rewritten text to land at approval:

> **`A-20`** — Chips returned on a won hand buy table time only, and buying table time does not train
> outcome bias. The mitigation is structural but **narrower than "cosmetic"**: chips advance the
> learner on no axis — not a unit, not a Skill, not a rank, not a difficulty tier — but they do buy
> something the learner wants. Whether that still trains the bias is untested. **playtesting — shares
> the `P-1` instrument. Named test:** `adherence-under-loss` divergence across matched arranged and
> organic runs, comparing an arm where wins credit the wallet against one where they do not.

**Rows leaned on without spending:**

- **`A-07`** — parent; gains three sub-rows, extending the convention `A-07a` set.
- **`A-13`** / `P-1` — untouched; `A-20` shares its instrument rather than duplicating it.
- **`A-17`** — confirmed excluded. No clause of D1–D12 accepts a learner self-rating.
- **`A-14`**, **`A-16`** — untouched. No economy mechanic presents an EV number (§0.1).

### 11. Owed schema delta — to phase 5

`web/src/progress/types.ts` holds **no** economic field today — checked directly: `ProgressAttempt`,
`SessionRecord`, `CachedMastery`, and `LearnerEnvelope` carry nothing about a wallet, XP, or a rating.
Everything this design persists is new:

1. **A wallet balance** on the learner envelope, in the engine's integer minor units — `journal/decisions.md:10`
   fixes minor units end-to-end with no translation layer, and the economy must not introduce one.
2. **A ledger of economic events** — earn and spend, each with its source (`Completion`, `Review due`
   clear, practice trickle, buy-in, cash-out) — without which `A-07b`–`A-07d` cannot be validated
   from telemetry, and their named tests would be unrunnable.
3. **A per-window earned total**, or a derivation of it from the ledger, to enforce D5's cap.
4. **An XP total** and **a rating value**, plus the per-item fitted parameters D10 requires.
5. **A support Condition on Free Play attempts** — D9 requires `table-open`/`table-closed` to be
   captured at the table, not only in drills.

Item 2 is the one most likely to be dropped as an implementation detail and is the one that makes
this design falsifiable.

### 12. Divergences from approved or premised documents, surfaced not applied

**Three. Each needs the owner's assent at the gate.**

1. **The premise's governing sentence is amended.**
   `2026-07-26-chips-xp-and-progression-economy.md:47` reads *"Learning earns table time; money never
   buys chips."* D1 rules **learning *or winning* earns table time**. The owner stated this directly
   on 2026-08-04 — *"to earn them you need to win or learn thats the point"* — so the divergence is
   from the recorded premise, not from the owner's position. It is surfaced because the premise
   document is cited elsewhere and a reader arriving at line 47 would otherwise find this design in
   contradiction with it. **On approval, line 47 is corrected in place with a dated note.**

2. **The practice-availability rule reverses an earlier statement made in the same session.**
   Stated first: *"when you finished the learning skills and mastery only then you can play the
   freelearn."* Stated after: *"Free-learn opens sections as learnings stack and can be played with
   just what the user already learned."* **The second supersedes**, and D4 is written to the second.
   Both are recorded here and both travel to `LDB-06` (§13), so whoever designs the opening rule sees
   the reversal rather than inheriting half of it. The economic consequence is real — under the first
   statement a mid-curriculum learner who went broke had only the next lesson; under the second they
   also have practice — which is why D4 is deliberately written to hold **whatever subset of sections
   is open**.

3. **A per-window cap is a regeneration timer, and is adopted knowingly.**
   Checked against the actual prohibitions rather than a paraphrase: `product-vision.md:88-90` forbids
   celebrating money won, encouraging loss chasing, implying guaranteed profit, and punishing a
   learner for ending a session. **A per-window cap breaches none of them**, and it arguably serves
   the second — a learner cannot grind their way back into a tilt session. The risk is against
   constraint 3, *it has to be fun*, and it lands on the narrowest possible population: a learner who
   is simultaneously broke and out of full-rate work. Adopted as ruled, filed as `A-25`, and named
   here rather than left to be discovered.

   **The nearest documented caution names an energy gate specifically, so it is quoted rather than
   paraphrased.** `how-to-teach.md:122`, reopened first-hand 2026-08-04: *"Punitive mechanics can
   backfire. Duolingo's 'hearts' (lose a heart per mistake, get locked out) are criticized for
   creating anxiety around mistakes — and mistakes are how people learn. In a decision trainer where
   wrong answers are the whole teaching mechanism, a lock-you-out-for-errors system is especially
   counterproductive."*

   **Why the cap is not that mechanism.** Hearts are debited *per mistake* and lock the learner out
   *for being wrong*. Nothing in this economy is debited for a wrong answer — D5 states it directly,
   wrong answers cost nothing, and no learning activity ever debits the wallet. Chips are lost only
   at the table, by playing, never by erring in a lesson. The two mechanisms share a *shape*, not a
   trigger. **The residual is honest and is what `A-25` measures:** a cap can still produce the
   locked-out *feeling* even when nothing punished a mistake, and no source held here tests that
   distinction. `[Evidence-backed]` on the quote and on the trigger difference; `[Assumption]` that
   the difference is one learners actually experience.

### 13. Handed forward

**To `LDB-06`** — *session composition*:

- **When practice sections open, and what the mode serves.** D4 rules that the faucet exists and D5
  rules what it pays; neither depends on the answer. **Both of the owner's contradictory statements
  are recorded at §12 divergence 2** — do not merge them silently.
- **The `Review due` → full-rate coupling.** D5 pays full rate for clearing a `Review due` Skill,
  which makes the recommender an economic actor. Whatever `LDB-06` decides about staleness and
  recommendation ordering now has a chip consequence.
- **The `"faded"` session trajectory** already handed here by `LDB-04` D11 interacts with D9: a faded
  session changes the support Condition mid-session, and D9 records that Condition at the table.

**To `LDB-07`** — *interaction UX*:

- **How the player card renders three meters so they do not read as one number.** D7 forbids
  blending; making three separate facts *look* separate is the UX half of that ruling, and
  `v2-research-06-ux-foundations.md:87,135-142` already requires bankroll and learning score to be
  visually distinct.
- **The empty-wallet state.** D3 makes it a real setback and D12 forbids recouping framing. What it
  actually says and offers is UX.
- **The session summary's ordering** — decision quality above profit and loss (D12), with the
  bankroll result as one plain fact.
- **The naming collision.** *Free Play* and *Free Learn* are one word apart and name opposite modes.
  §15 proposes **Practice**; the call is `LDB-07`'s together with the glossary.

**To `LDB-08`** — *the blueprint*:

- The economy's instrumentation need is **the ledger** (§11 item 2). Without it `A-07b`–`A-07d` have
  named tests that cannot run, which is the unrunnable-claim failure mode this repository has already
  shipped once.
- `A-20`'s test shares the `P-1` instrument, so a slice instrumenting `P-1` covers it at no extra
  cost — relevant to the phase-5 subset decision.

### 14. What the 2026-07-25 inbox dispatch contributed, and what it did not

`journal/raw/_inbox/p4-economy-design/2026-07-25-fable-motivation-economy-design.md` is raw agent
output under Rule 0 — **data, never authority**. Its own header records the owner's reaction as
*"kinda off by design"* and states it was saved to prevent loss, not because it was adopted.

**What it contributed:** the shape of the farming attacks (re-grinding an easy lesson; grinding the
always-available drill) and the observation that the second is self-defeating, both of which D4 and
D5 answer independently. Its enumeration of the four prohibitions as a concrete audit is the ancestor
of D12.

**What was not adopted, and why it matters that this is said explicitly:** its central mechanism was
a **wallet cap** on what returns from the table, which the owner declined on 2026-08-04 — D2 returns
the whole stack. Its ruling that chips and XP should gate nothing was critiqued in its own header as
possibly having *"neutered the motivational pull the premise was reaching for"*; D6 and D8 give each
meter a real job instead. Nothing in this document rests on a claim sourced only from that file.

### 15. Vocabulary owed to `CONTEXT.md` — to land at approval, not before

**Deliberately not written yet.** Writing rulings into an authority document ahead of its gate is a
decision adopted by side effect — the failure `LDB-04` §16 names. On approval, add under a new
**§Economy** heading:

- **Chips** — the product's only currency. Earned by winning at the table or by learning; spent only
  on table time; never bought with money. A balance advances the learner on no axis. *Avoid:* coins,
  credits, currency, money.
- **Wallet** — a learner's persistent chip balance, surviving rounds, sessions, and logouts. Distinct
  from a Table stack. *Avoid:* bankroll, balance, account.
- **Table stack** — the chips a learner has brought to one Free Play session, session-scoped and
  settled by real play. The engine's `bankroll` field is this, not the Wallet. *Avoid:* bankroll (when
  the Wallet is meant), buy-in (when the stack is meant), pot.
- **Buy-in** — the transfer of chips from the Wallet to a Table stack on sitting down. Its reverse is
  cash-out, which returns the whole remaining stack. *Avoid:* entry fee, stake, ante.
- **XP** — the monotonic effort ledger. Records work done, never falls, and gates nothing. Distinct
  from Player score, which moves in both directions. *Avoid:* points, score, rating.
- **Player score** — the learner's rating: internal, two-directional, fitted per learner, moving with
  decision quality and never with hand outcome. Drives difficulty only. *Avoid:* XP, level, mastery,
  rank (when the number is meant rather than its display).
- **Free Play** — the honest casino simulator: real rules, real settlement, a real Table stack.
  *Avoid:* casino mode (when the product surface is meant), sandbox, practice.
- **Practice** — *(proposed; the naming call travels to `LDB-07`)* the always-available learning mode
  over already-covered material, which pays into the Wallet. Named to keep "free" meaning only "no
  chips required to enter". *Avoid:* free learn, free play, drill, grind.

### 16. Corrections landed and owed

**Found while writing this document, each verified first-hand rather than taken from a citing
document.**

1. **Citation drift in the premise document.** `2026-07-26-chips-xp-and-progression-economy.md` cites
   `product-vision.md:78-80` for the four motivation prohibitions and `:27` for the not-centred-on-chips
   line. They are at **`:88-90`** and **`:32`**. Opened and confirmed 2026-08-04. **Owed:** correct
   both citers at approval. The same file's `journal/ops/phase.md` references are also stale — that
   path no longer exists; the journal is flat (`journal/phase.md`).
2. **`2026-08-03-evidence-and-mastery-rules.md` is absent from `journal/docs-map.md`.** LDB-01's and
   LDB-03's specs are registered (`docs-map.md:84-87`); LDB-04's approved spec is not — confirmed by
   direct grep, zero hits. An approved authority document missing from the map `AGENTS.md` calls
   authoritative. **Owed:** register both it and this document at approval.
3. **A citation in the premise document points at a blank line, and this document nearly inherited
   it.** `2026-07-26-chips-xp-and-progression-economy.md:97-98` cites
   `how-to-teach.md:120` for *"punitive mechanics are counterproductive."* **Line 120 is empty.** The
   claim is real and is at **`:122`**, located by opening the file and searching it. This is the
   inherited-error class `AGENTS.md` names first: a document describing a source nobody reopened,
   then a second document trusting the first. The draft of this spec copied `:120` from the premise
   before the check ran. **Owed:** correct the premise document's citation at approval.

4. **`LDB-04` cites `journal/decisions.md:182` for a phrase that is not on line 182.**
   `2026-08-03-evidence-and-mastery-rules.md` D9 and D14 both quote chips as *"earned by completing
   lessons and units"* against `journal/decisions.md:182`. That phrase is at **`:179-180`**; line 182
   holds the co-equal-priorities clause instead. Verified by printing lines 178-184 directly. Minor,
   and it does not affect D14's reasoning — but it is the same drift class as correction 1, in an
   approved document. **Owed:** correct both loci at approval, or record it as accepted process
   history if the owner prefers not to edit an approved spec.

5. **`A-20`'s "cosmetic" is wrong under D1** — see §10 for the rewritten row.

### 17. Approval criteria — checkable

The card's three tests, enumerated positively. **Nothing below is satisfied by the absence of a
counter-example.**

1. **All seven questions have written answers.** `E-1` → D1, D2. `E-2` → D3, D4. `E-3` → D5, as a
   shape with all six constants filed (§10) — the owner ruled shape-not-numbers explicitly on
   2026-08-04. `E-4` → D6. `E-5` → D7, D8, D9. `E-6` → D10. `E-7` → D11, recorded as inherited from
   `ROADMAP.md:249` / `CLOUD-06` rather than re-decided. **Checked in both directions:** each of D1
   through D11 is reachable from at least one `E-` number, and no `E-` number is unanswered.
2. **`E-1`'s answer names how it will be tested, in register row `A-20`.** The row is rewritten in
   §10 with `adherence-under-loss` divergence across matched arranged and organic runs as its named
   test, sharing the `P-1` instrument. The criterion is satisfied by the row being **in the
   register**, not by §10 describing it — so it is checked after landing, not before.
3. **No mechanic rewards money won.** Enumerated positively rather than asserted: chips returned on a
   won hand buy **table time only** (D1); table *character* opens on mastery, never on balance (D6);
   the rating moves on oracle-graded decision quality and is invariant to `HandOutcome` (D9); XP never
   comes from money won (D7, D8); chip count may not feed standing, and the blend was considered and
   declined (D7); no cumulative profit/loss ledger, no lifetime-winnings statistic, no chip
   leaderboard, no celebration keyed to a win (D12). The one place a win *does* pay — the wallet — is
   the subject of `A-20` and is flagged as untested rather than claimed safe.

**Additionally checkable at the gate:** the three §12 divergences are each **stated** rather than
applied; every constant in D5 and D2 carries a §10 row and every §10 sub-row corresponds to a
constant this document actually names; the §15 glossary terms and the §10 rows land **at approval**
and are verified present in their target files after writing; and the three §16 corrections are
applied.
