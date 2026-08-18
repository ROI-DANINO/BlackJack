# Play Verdicts and Ungraded Activities — LDB-09

> **Status: APPROVED 2026-08-15** at the `user-approval` gate. Authoritative.
>
> > ### ⚠ AMENDED 2026-08-17 by the `LDB-06` gate grill — owner decision
> >
> > **The five admitted types are renamed *Unmeasured Activities*, they are graded, their verdict is
> > shown to the learner, and they earn XP at a low rate.** `LDB-06` §12 divergence 8 carries the full
> > reasoning; this banner is the amendment record on the approved spec, so no reader of `LDB-09`
> > alone can miss it.
> >
> > **What changes:** D1's admission phrase *"a type that measures nothing"* becomes *a type that
> > **certifies** nothing*; D2's `gradedBy: none` becomes each type's actual grading authority, plus
> > `verdictSurfaced: true` — the parameter `rule-contrast` already carries at `false`; and D8's
> > title-clause "are recorded" widens to "are graded and recorded".
> >
> > **What does NOT change, and it is the load-bearing half:** `primaryFor: []` on all five, and D8's
> > *"never window-eligible."* No Unmeasured Activity reaches a Mastery bar, on `LDB-03` §6.1's ground
> > that a decontextualised sort *"measures it out of the situation that makes it hard."*
> >
> > **Why.** *Ungraded* had welded four separable properties into one word — recorded, feeds the
> > Recommender, verdict shown, moves a bar. D8 already made the first two true. Only the fourth was
> > ever load-bearing. The third was collateral, and a `hand-sort` that will not tell the learner a
> > hand was hard is not a gentler activity but a broken one.
> >
> > **Owed:** the two taxonomy-JSON edits above (`LDB-06` §11 item 9), and the `CONTEXT.md` term,
> > which lands with `LDB-06`'s vocabulary at **its** approval. `AttemptDisposition`'s
> > `{ status: 'ungraded' }` is **unchanged** — it describes grading *authority* and remains accurate
> > for a free-play action.
> >
> > **Not yet applied to this document's body.** This banner records the amendment; D1, D2 and D8
> > below still read as approved on 2026-08-15. Applying it is owed and is tracked at
> > `LDB-06` §11 item 9 — recorded here rather than left implicit, because "approved" and "applied"
> > coming apart is this repository's second named failure class.
>

> Two owner rulings were taken during drafting: the eight `state-report` Skills **keep both Skill and
> bar** with the evidence route changed (§D5), and **all five** admitted Activity types are carried,
> sequenced rather than budgeted (§D2). **All six §12 divergences were then ruled together at the
> gate and applied** — surfaced first, applied second, which is the mechanism decision 12 of
> 2026-08-15 requires and the reason none was applied during drafting.
>
> **What landed at approval, each verified present in its target file AFTER writing** rather than
> merely approved — this repo's second evidence rule, and the failure class that once let 14
> corrections survive a pass certifying they had all landed:
>
> - `2026-08-01-activity-taxonomy.json` — the `ungradedAdmission` clause; five new types with
>   `rehearses`; `rule-contrast.probe`; a 19-row `playVerdicts` block; `registerDelta` → 4 net new.
> - `2026-08-01-activity-taxonomy-and-skill-mapping.md` §6 — the amendment note and new §6.4.
> - `assumption-register.md` — `A-26`, `A-27`, `A-28`. `A-25` deliberately **not** reissued.
> - `CONTEXT.md` — four terms plus the Table(strategy)/Table(blackjack) collision note.
> - `journal/decisions.md` — the gate record.
> - `scripts/check-ldb03-taxonomy.js` — **6 checks → 8, all 8 passing.**
>
> **Verified by re-running the validators, not by asserting the writes:** `check-ldb03-taxonomy.js`
> 8 passed / 0 failed; `check-doc-drift.sh` no drift; `kanban.ts validate` exit 0.
>
> ROADMAP Phase 4 deliverable. **Phase 4 designs and builds nothing** — this document produces no
> code and authorises none. Everything in §11 is owed to phase 5.
>
> **Card:** `LDB-09` — *Re-verdict the unadopted patterns for play, and rule the state-report Skills.*
> **Source:** `docs/superpowers/research/activity-pattern-catalog/`.
> **Consumes:** `2026-08-01-activity-taxonomy-and-skill-mapping.md` + `.json` (six Activity types, 32
> pattern verdicts); `2026-08-01-learning-outcomes-and-skill-graph.md` + `.json` (18 Skills, four
> Condition axes); `2026-08-03-evidence-and-mastery-rules.md` (D6, D7, D12); the catalog's
> `classification.md` and `run/U1|U2|U3/audit.md`; `web/src/progress/types.ts` (the durable schema);
> `web/src/app/` (the shipped table); `scripts/check-ldb03-taxonomy.js` (the live validator).
> **Opens no new source.** Every claim below rests on evidence already in this repository or on code
> read first-hand this session.

---

## 0. What this document decides, and what it does not

**It decides:** a play verdict, with a reason, for each of the 19 patterns `LDB-03` disposed as
`rejected` (15) or `not-adopted-no-target` (4); which of them enter the design and in what form; the
clause that admits an Activity type grading nothing; whether the eight `state-report` Skills keep
Mastery bars; and where `state-report` evidence comes from.

**It does not decide:** any widget, control, layout, rendering or WCAG target (`LDB-07`) — including
the disclosure control this document's D6 requires and the brush interaction its U2-3 verdict
recommends; session entry, size, stopping, mix or trajectory (`LDB-06`); whether an in-situ capture
is window-eligible (`LDB-04`); which types phase 5 actually builds (`LDB-08`); and the shell — path,
map, daily goal, return ritual, characters, sound — which is L3 and owed to phase 6.

**Scope fence, from the card:** Activity types only.

---

## 0.1 The premise this card was created on is false as stated

Decision 9 of 2026-08-15 reads: *"A learner who plays 20 hands has shown `card-values` and
`hand-total` without being asked."* Checked against the table that exists, it is **false** — and the
correction matters, because the whole ruling turns on it. The engine performs all eight Skills and
the player watches.

Enumerated positively, each read first-hand this session — *stating what was looked for and where,
because a check that can only fail when a record exists passes silently on a missing one*:

| Skill | What the shipped table does | Locus |
|---|---|---|
| `card-values` | never asks a value; the summed total is printed | `web/src/app/HandView.tsx:13,16` |
| `hand-total` | printed beside every hand | `HandView.tsx:16` |
| `ace-value` | printed as `7/17` — the dual value is resolved *for* the player | `web/src/app/totals.ts:22` |
| `bust` | the word appears nowhere in the shipped UI; a bust renders as its raw total (`24`) plus a `Loss` | 0 non-test hits across `web/src/app/*.tsx`; `web/src/app/totals.test.ts:23` |
| `dealer-info` | upcard rendered, hole card as `[??]`, visible total as `x + ?` | `HandView.tsx:16,19` |
| `outcomes` | `Win` / `Loss` / `Push` printed at settlement | `web/src/app/Table.tsx:12-14` |
| `wager-result` | signed delta and bankroll printed | `Table.tsx:19-20,45` |
| `natural-blackjack` | `blackjack` is its **own settlement label** — the Classification is handed over | `Table.tsx:15` |

`[Evidence-backed]` on the eight loci. `[Product judgement]` on the inference drawn from them.

**What this changes.** The choice was never *"bar, or redundant with play."* It is **"bar, or
nothing"** — these eight are exercised in exactly one place today, and that place is the quiz. It
also localises the problem: whether play exercises them is a property of **what the table displays**,
and no one has decided that. It currently lives in a file whose own header calls itself scaffolding —
`totals.ts:3-5`, *"DISPLAY-ONLY totals… V2 should move totals onto the wire."*

**The correction is recorded rather than smoothed**, because the decision it corrects is three days
old and was written by a session that had not opened `HandView.tsx`.

---

## Problem Statement

`LDB-02` was commissioned because *"every exercise format this project holds is a dealt hand or a
multiple-choice question."* It returned 32 patterns from 24 products. They were disposed as 15
rejected, 10 adopted-as-parameter, 4 no-target, 3 adopted-as-type — and the design came out with
**16 of the 17 Mastery bars reachable only through `deal-and-decide` or `state-report`**: a dealt
hand, or a question about a dealt hand. The catalog did not fail. It was never asked the question.

> **The count was corrected 2026-08-19 at the `LDB-08` assembly; the finding is unchanged.** This
> read *"17 of 18 Mastery bars"*, which was wrong twice in one phrase, and **this document already
> carried the right numbers in `D9`** — *"All 18 Skills stand, all 17 bars stand."*
>
> - **The union is 16, not 17.** `deal-and-decide` is `primaryFor` 8 Skills and `state-report` 8,
>   disjoint, so 16 — computed from `2026-08-01-activity-taxonomy.json`, and it reads 16 at **every**
>   commit of that file, including `702ad8d` (2026-08-01) and `4cf146a` (2026-08-15). It was never 17.
>   The other two Skills are `read-rule-card` (via `rule-card-read`) and `variance-expectation` (via
>   `predict-then-reveal`).
> - **There are 17 bars, not 18.** `variance-expectation` carries **no bar** — `LDB-04` D12, *"gets no
>   mastery bar in v1"* — so it cannot be one of the 18 denominators.
>
> **The finding is not weakened: 16/17 is 94%, against the 94% claimed.** Both cards this premise
> founded — `LDB-09` and `LDB-10` — stand on it unchanged, and no decision in either moves. What
> failed was a verification claim, not a judgement: the session record asserts this number was
> *"verified against `2026-08-01-activity-taxonomy.json` rather than recalled"*, and re-deriving it
> from that file returns 16. That is this repository's founding error class, caught here by
> recomputation at the assembly the number was being assembled into.

`classification.md`'s header records why. Its classifier was told *"not to rank on usefulness to the
product, and not to invent a composite score"*, so its only axis is substantive-vs-cosmetic on
**measurement**. Twenty-six of the 32 rows were disposed on whether they *measure* something this
product needs measured. **No pass has ever asked whether a pattern would be good to play.**

Three rules compose into the narrowness, each individually right: `LDB-01` §2's ship test, `LDB-03`
§6's coverage rule permitting activities only in service of a Skill, and `LDB-04` D6 admitting only
`primaryFor` evidence. Nothing enters the product unless it measures a Skill. `LDB-04` D6 wrote the
counter-argument itself — *"not everything the learner does needs to feed a progress meter. An app in
which every interaction is graded is a quiz with a card table drawn behind it"* — and nothing was
built on it. Register row `A-18`'s validation method is *"instrument the first non-quiz activity
against a quiz baseline"*, and it is **unclosable as designed**, because the design produced no
non-quiz activity.

Separately, the eight `state-report` Skills carry a bar each and are measured by asking a player to
name a number the screen is printing (§0.1).

---

## Solution

Three moves, none of which touches the Skill list.

**One.** `LDB-03` §6's coverage rule gains a clause: an Activity type may **grade nothing**, provided
it names the Skill it rehearses. This is not a licence for anything arbitrary and it is not a budget —
a fixed count of admitted types was offered to the owner and refused as a constant with nothing
behind it. The clause is enforced by the existing validator, not by assertion (§Testing).

**Two.** The 19 unadopted patterns are each given a play verdict with a reason (D4). Six are
admitted, becoming five new ungraded Activity types; one becomes a parameter on an existing type; two
are reported forward to the phases that own them; ten are declined, each on a stated play ground
rather than by inheriting its measurement ground.

**Three.** The eight `state-report` Skills keep their Skill **and** their bar, and the evidence moves
from a standalone quiz into real play behind a table disclosure setting — the same move `LDB-03` §6.1
already made for `classify-hand`, which is graded *inside* `deal-and-decide` rather than extracted
into a card sort.

The result costs **zero** Skill-list change, zero `evidence.skillId` change, and zero
`schemaVersion` migration — which is precisely the expense decision 9 named as the reason this card
could not wait. It turns out not to be incurred.

---

## User Stories

1. As a learner, I want some things I do in this app to be *just play*, so that practising does not feel like sitting an exam with cards drawn on it.
2. As a learner, I want to drag a batch of dealt hands into pair / soft / hard buckets, so that I can feel the classification rather than recite it.
3. As a learner, I want to guess how often a dealer showing 6 busts and then see the true number, so that I learn the shape of the game before anyone shows me a chart.
4. As a learner, I want to guess from a live shoe position how often hitting wins this hand, so that I meet the difference between a good decision and a good outcome on a hand I actually played.
5. As a learner, I want that guess scored against what the engine computes and never against what the shoe happened to do, so that being right is never punished for losing.
6. As a learner, I want to put the dealer's fixed routine into its correct order, so that I understand the procedure I am playing against rather than memorising its results.
7. As a learner, I want to be shown five hands that all take the same action and be asked to name it, so that I learn the principle instead of 169 separate cells.
8. As a learner, I want to build a rule out of fixed parts and watch it run against a pile of hands, so that I discover where my own theory of the game breaks.
9. As a learner, I want the cells where my rule broke shown to me, so that a wrong model is corrected rather than a wrong answer marked.
10. As a learner, I want to be asked which house rule would flip a decision, so that rule variation is a puzzle rather than a table to memorise.
11. As a learner, I want none of these to move a progress meter, so that I can try things without a score watching.
12. As a learner, I want them recorded anyway, so that the app knows what I have actually done and can recommend accordingly.
13. As a learner, I want to be able to turn off the printed hand totals, so that keeping my own total is part of playing rather than a quiz afterwards.
14. As a learner, I want my totals to stay printed until I choose otherwise, so that nothing is taken away from me on my first hand.
15. As a learner playing with totals hidden, I want the engine to keep adjudicating truthfully, so that hiding a number never changes what is actually happening in the game.
16. As a learner, I want credit for reading a hand correctly during real play, so that I am not asked afterwards to name a total I have already used.
17. As a learner who has played two hundred hands, I do not want to be asked what my total is, so that the app does not insult me with a question the screen answers.
18. As a beginner, I want a standalone form of those questions on first exposure, so that I am taught the vocabulary before I am expected to hold it.
19. As a learner, I want to be told when a bust happens in words, so that the concept has a name and is not just a number over 21.
20. As a learner, I do not want to be asked to rate how well that went, so that the app does not ask me a question I am known to answer wrongly.
21. As a learner, I do not want to type prose into a card game, so that practice does not turn into homework.
22. As a learner, I do not want to speak into a microphone to play, so that where I am and how I sound never decide whether I can practise.
23. As a designer, I want every ungraded type to name the Skill it rehearses, so that "it's fun" never becomes a licence to add anything at all.
24. As a designer, I want that requirement machine-checked, so that the rule fires on documents written after it rather than being remembered.
25. As a designer, I want all 19 unadopted patterns to carry a play verdict with a reason, so that a later phase inherits a decision instead of re-running the analysis.
26. As a designer, I want the two patterns that belong to other phases handed to them with their verdicts attached, so that their play value is not rediscovered from scratch.
27. As a designer, I want each declined pattern declined on a play ground, so that no row is refused twice for the same measurement reason.
28. As a designer, I want the register to say plainly which of these teach on evidence and which on assumption, so that nothing here travels as a fact it has not earned.
29. As a designer, I want `A-18` to become closable, so that the premise under the whole catalog can finally be tested.
30. As a phase-5 builder, I want the five types ranked by cost, so that I can ship the cheap ones first and learn before paying for the expensive one.
31. As a phase-5 builder, I want to know that ungraded attempts need no schema change, so that I do not design a migration I do not need.
32. As a phase-5 builder, I want the two schema deltas that *are* owed stated exactly, so that I discover neither of them late.
33. As the owner, I want every change to an approved spec put to me at a gate, so that no document is amended because a later one disagreed with it quietly.

---

## Implementation Decisions

### D1. An Activity type may grade nothing if it names the Skill it rehearses

`LDB-03` §6's coverage rule currently reads, forward direction: *"every Activity type declares at
least one Skill it measures."* It gains a second admission path: **a type that measures nothing is
admitted provided it declares `rehearses`, a non-empty list of Skill ids it gives practice at
without producing evidence for.**

The `onGap` clause is untouched and still binds: *"a Skill no type can cover is recorded as a finding
against `LDB-01` — never filled by inventing an activity."* Rehearsal cannot be used to claim
coverage. A Skill covered only by `rehearses` is still uncovered.

**Two approved sentences already open this door**, and are cited rather than re-argued: `LDB-04` D6's
*"an app in which every interaction is graded is a quiz with a card table drawn behind it"*, and
`A-18`'s method, *"instrument the first non-quiz activity against a quiz baseline."*

**No fixed budget of such types.** Offered to the owner and refused: it would be a constant with
nothing behind it.

`[Product judgement]`, on the owner's ruling of 2026-08-15 (decision 8).

### D2. Five new ungraded Activity types, ranked by cost rather than capped by count

The taxonomy goes from **6 types to 11**. Each declares `primaryFor: []`, `secondaryFor: []`, a
non-empty `rehearses`, and `gradedBy: none`.

| Order | Type | From | Player does | `rehearses` | Cost |
|---|---|---|---|---|---|
| 1 | `hand-sort` | U2-7 | drags a dealt batch into pair / soft / hard | `classify-hand` | cheap |
| 2 | `estimate-and-check` | U1-2 + U2-4 | sets a number on a continuum — *how often does a dealer showing 6 bust?*, or, from this shoe position, *how often does hitting win?* — then the true value is revealed | `variance-expectation`, `dealer-info` | cheap |
| 3 | `procedure-order` | U3-7 | puts the dealer's fixed routine, or classify → dealer column → cell, into order | `strategy-action`, `outcomes` | middling |
| 4 | `principle-name` | U3-9 | is shown five situations sharing one action and names it | `strategy-action` | middling |
| 5 | `rule-battery` | U2-10 | assembles a rule from fixed parts, runs it over generated hands, and is shown the cells where it breaks | `strategy-action`, `read-rule-card` | expensive |

**The ranking is a build order, not a budget.** The owner ruled all five carried (2026-08-15).

**Boundaries recorded rather than assumed:**

- **U1-2 and U2-4 are one type**, differing only in `shown` — a live shoe position versus a standing
  quantity about the game. `produced` (a number) and `withheld` (the true value) are identical, and
  §2's individuation is `shown × produced × withheld`.
- **`estimate-and-check` is distinct from `predict-then-reveal`.** The latter's `withheld` is *the
  outcome; the hands have not been played yet* — a forecast whose evidence does not exist at capture
  time. `estimate-and-check` asks about a value that is already determined and computable. One is a
  prediction; the other is a check against a known truth.
- **`rule-battery` needs no rule language and no parser in its admitted form.** Fixed-part assembly
  yields a rule object directly, and the battery is the existing oracle evaluated over enumerated
  situations. `LDB-03`'s rejection of U2-10 costed the *free-text* form, which stays rejected. The
  cheap form was not costed because nobody asked for it.
- **`procedure-order` does not reinstate `round-flow`.** That Skill was retired because *"'follow'
  names no observable act."* This type creates no Skill and produces no evidence; ordering is an
  observable act that here measures nothing. Recorded because the resemblance is close enough to look
  like a Skill returning by the back door.

`[Product judgement]` throughout. Per-type teaching claims are labelled individually in §10.

### D3. `rule-contrast` gains a `probe` parameter — U2-6 is a parameter, not a type

U2-6's blackjack form is *give a decision that must flip, and find the rule change that flips it*.
`rule-contrast` already `produced`s *which of the table's rules differs*. The produced object is the
same — the rule — so under §2 this is a **`shown` parameter**, not a new type:

`probe: ["which-rule-differs", "which-rule-would-flip-this"]`, owner `LDB-07`.

`rule-contrast`'s existing `verdictSurfaced: false` is unchanged and covers both settings.

`[Product judgement]`.

### D4. All 19 unadopted patterns, ruled for play

Each verdict answers *would this be good to play, accepting that it measures nothing* — a question
none of these rows was asked when it was disposed.

**Admitted — 6 rows → 5 types (D2):** U2-7, U1-2, U2-4, U3-7, U3-9, U2-10.
**Admitted as a parameter — 1:** U2-6 (D3).

**Reported forward — 2:**

| Row | Verdict | To |
|---|---|---|
| U2-3 | Good to play, and it is a **widget** over `policy-paint`, not a type — the scope fence puts widget in `LDB-07`. `A-21` already registers the claim. Carry the verdict; do not re-derive it. | `LDB-07` |
| U2-11 | Good to play — the count stream is the arcade beat, and counting is what casual players find glamorous. It needs the counting Skill that phase 7's fifth Condition axis introduces. | Phase 7 |

**Declined — 10**, each on a play ground:

| Row | Why it would not be good to play |
|---|---|
| U1-3 | Gameable by widening. Its own source: high scorers *"are simply willing to use wider ranges. Generally about 2 to 10 times wider."* A game whose winning move is to answer vaguely is a bad game — and `predict-then-reveal` already occupies the calibration slot. |
| U1-7 | Reducing a shoe to its 2–5 critical decisions requires telling the learner which decisions are critical. That kills the play for the same reason it killed the measurement: the interesting part was noticing. |
| U2-1 | Typing where tapping is equal. Friction with no payoff. |
| U2-2 | Saying the play aloud is genuinely table-like and the most tempting decline here. It needs a microphone and speech recognition, and it excludes accented speakers, non-English speakers and anyone in a public place. The pressure half is separable and already adopted as `pace`. |
| U2-5 | The freehand curve is the fiddly, feel-bad form of `estimate-and-check`; drawing badly feels like failing. Ten repeated point estimates build the same curve and each one feels like a guess worth making. |
| U2-8 | Typing a number where tapping is equal. Friction. (The true-count and bet-unit entries it names become live only with phase 7's counting.) |
| U2-9 | The self-rating half is contradicted by evidence this project already holds — Kornell & Bjork: 78% performed better spaced, 78% rated massed as good or better. It is also a mood-killer. Declined on both counts. |
| U2-14 | Free-text *"explain the play"* reads as homework, and an open box that most players skip is worse than no box. |
| U3-2 | The word bank contains the answers, so there is no decision left to make. A puzzle with the solution printed beside it is not a puzzle. |
| U3-6 | Concept mapping is a school assignment, not a game — and its own evidence runs against its headline widget (r = .243 n.s. versus .551 p<.05; interrater 0.81 versus 0.92). |

**A removal names its replacement** (`AGENTS.md` §Constraints). What dies with U2-14 is the catalog's
only route to surfacing a **misconception** rather than a wrong answer. `rule-battery` (D2) and the
`which-rule-would-flip-this` probe (D3) both surface wrong *models* at no typing cost. That is a real
replacement, not a gesture.

`[Product judgement]` on all 19 verdicts. Where a verdict quotes a source, the quotation is
`[Evidence-backed]` and is reproduced from the catalog row, which this document did not re-open at
source — **stated plainly rather than implied**, per this repo's first evidence rule.

### D5. All eight `state-report` Skills keep their Skill and their Mastery bar

Ruled by the owner, 2026-08-15, on the §0.1 finding.

Neither horn the card offered is taken. They are not demoted to onboarding, because §0.1 shows the
premise for demotion is false: play does not currently exercise them. They do not keep the standalone
quiz as their only route either, because that is the *"quiz with a card table drawn behind it"*
`LDB-04` D6 warns against.

**What changes is where the evidence comes from** (D6, D7). The standalone `state-report` question
survives as the **first-exposure / onboarding** form only.

**The reversal cost, as the card requires it stated: nil.** Nothing is deleted from the graph. All 18
Skill ids stand, `evidence.skillId` is untouched, and no `schemaVersion` migration follows. That "no
bar" and "no Skill" are separable is already precedented — `LDB-04` D12 gives `variance-expectation`
no bar while keeping the Skill.

**Had the other horn been taken**, it is worth recording what it would have cost: 9 bars would
remain, 8 of them reachable only through `deal-and-decide` — one Activity type carrying nearly the
whole progress model. Demotion would have concentrated the narrowness, not relieved it.

`[Product judgement]` on the ruling; `[Evidence-backed]` on §0.1's loci and on D12's precedent.

### D6. Hand-total disclosure is a new Condition — `tableVisibility` does not cover it

A table disclosure setting governs whether the hand total is printed:
`totalsDisclosure: ["totals-shown", "totals-hidden"]`. With totals hidden the player keeps their own
total and the engine keeps adjudicating truthfully; nothing about card flow changes.

**`ProgressAttempt.tableVisibility` looks like this field and is not.** It is
`'open' | 'hidden' | 'not-applicable'` (`web/src/progress/types.ts:32`) and it records the **strategy
chart** — the `support` Condition axis, whose values are `table-open | table-closed` and whose basis
reads *"tableOpen is the project's mastery axis"* (`2026-08-01-skill-graph.json:8`). "Table" means the
strategy table there and the blackjack table here.

**This is stated at length because reusing the field would have been free, convenient, and wrong** —
the shape of this repository's named failure class, at the exact moment it was most tempting. A new
field is owed (§11).

`[Evidence-backed]` on both loci; `[Product judgement]` on introducing the Condition.

### D7. `state-report` evidence is produced in situ, and rides `LDB-06` D2's capture mechanism

With `totals-hidden`, a `state-report` capture on a live hand produces the evidence that a standalone
question produces today. **This is `LDB-03` §6.1's move, applied to a second type:** `classify-hand`
is *"graded separately **inside** `deal-and-decide`"* rather than extracted into a card sort, because
*"a decontextualised card sort measures it out of the situation that makes it hard."* The same
argument applies to naming a total.

The mechanism already exists: `LDB-06`'s 2026-08-15 redraft gave the table an **opt-in Classification
capture** (its §12 divergence 5). An in-situ `state-report` capture is the same shape and should ride
it rather than invent a parallel one.

**Two things this document does not decide**, and hands over rather than assumes:

- **Whether an in-situ capture is a separate Presentation, and whether it is window-eligible** —
  `LDB-04`, whose D3 rules that the unit is the presentation scored by its first response.
- **The capture control itself** — `LDB-07`.

One warning travels with it, from `LDB-06`'s own card: this capture must **not** be merged with the
`resourcesConsulted` field, because the two move window eligibility in opposite directions.

`[Product judgement]`.

### D8. Ungraded activities are recorded, are never window-eligible, and cost no schema change

An ungraded activity **produces a `ProgressAttempt`**. It must: `A-18`'s validation method requires
instrumenting the first non-quiz activity against a quiz baseline, and an activity that records
nothing cannot be instrumented. Admitting these types while recording nothing would leave `A-18`
exactly as unclosable as before.

**The durable schema already expresses this, with no change** — verified first-hand:

- `AttemptDisposition` carries `{ status: 'ungraded' }`, commented *"responded; no grading authority
  (e.g. free play action)"* — `web/src/progress/types.ts:49`.
- `gradedBy.authority` already includes `'none'` — `:100`.
- `EvidenceMode` already carries `'acquisition'`, which is what rehearsal is — `:30`.

The union also does useful work here: `errorClass` is unrepresentable on an ungraded disposition, so
an ungraded activity cannot accidentally file an error class.

**Never window-eligible.** `LDB-04` D6 admits only `primaryFor` evidence, and these types are
`primaryFor: []`. No exception is sought. The evidence is recorded, may inform what to recommend
next, and never reaches a bar.

`[Evidence-backed]` on the three schema loci; `[Product judgement]` on the recording obligation.

### D9. `LDB-01` is not amended — stated positively, as a result

The card anticipated that this work might need to change the approved skill graph, and set up the
mechanism for it (decision 12). **It does not.** All 18 Skills stand, all 17 bars stand, no Skill is
retired, none is added, and no `primaryFor` mapping is removed.

Recorded as a result rather than passed over in silence, because the absence of a change is exactly
the kind of thing a later reader assumes was never checked.

`[Evidence-backed]` — checkable, and check 2 of the validator asserts it (§Testing).

### D10. What the play verdicts do to `A-18`

`A-18` — *"An interactive learning game teaches these concepts better than passive presentation"* —
carries the method *"instrument the first non-quiz activity against a quiz baseline"* and has been
**unclosable since it was written**, because the design produced no non-quiz activity.

Five now exist. `A-18` becomes **closable**, and is the class-level premise under every type admitted
by D1: cited by each, duplicated by none. `hand-sort` is the cheapest instrument for it and should
carry the first attempt.

`[Product judgement]` on the routing; `[Evidence-backed]` that the row's method reads as quoted.

### D11. Whether ungraded activities consume the session bound is `LDB-06`'s — and must be asked

> **ANSWERED 2026-08-17: they consume it.** `LDB-06` D7, owner decision at the `LDB-06` gate grill.
> The first horn below was taken — fun and evidence do share one budget, and `LDB-06` D14's
> type-selection rule decides the mix rather than a cap.
>
> **`LDB-06` D7's stated ground for bounding by Presentation was retired in the same ruling**, which
> is the part worth reading back here: it had claimed bound and evidence were *"commensurable"*
> because both count Presentations. They were not, before any Unmeasured Activity existed — an
> abandoned Presentation (`LDB-04` D5) and a chart-open Presentation (`LDB-04` D4) each consume the
> bound and fill no window. **This card's question exposed an existing false ground rather than
> creating a new problem**, which is a better outcome than either horn it offered.
>
> Raising it worked, and §16.1 of `LDB-06` is why it was raised.

`LDB-06` D7 bounds a Short session at 10 Presentations and D8 forbids starting an activity after a
bound. Neither was written with an activity that produces no mastery evidence in view.

- If ungraded play **counts** toward the bound, fun and evidence compete for one budget, and every
  ungraded activity a session offers costs it a graded one.
- If it **does not**, the bound stops governing how long a session runs.

Neither is obviously right and this document declines to choose, because session composition is
`LDB-06`'s. **It is raised here so that it is asked rather than discovered**, for the reason
`LDB-06` §16.1 recorded on 2026-08-15: its `audit-examiner` pass assessed 48 claims, and the D3/D7/D8
deadlock was not among them and could not have been, because the instrument asks whether each ruling
is warranted and never whether the rulings **compose**. This question is reached only by composing D7,
D8 and this document's D2.

`[Product judgement]`.

---

## Testing Decisions

**What makes a good test here.** This document produces no runtime code, so its tests are checks over
**design artifacts** and cases owed to a seam phase 5 will build. Assert the external property — what
the artifact claims, what the reducer outputs — never how either is arrived at. Any approval criterion
that cannot be machine-checked is a criterion this document should not claim.

**One primary seam, existing and already green: `scripts/check-ldb03-taxonomy.js`.** It runs 6 checks
over `2026-08-01-activity-taxonomy.json` and reports `6 passed, 0 failed` today. It is extended rather
than replaced, and no second validator is introduced — the two-files-that-must-agree shape is the one
`scripts/check-doc-drift.sh` exists because of.

The extensions, one per approval criterion:

- **Check 1 (`type->skill`) must accept the second admission path.** Today it requires a non-empty
  `primaryFor` or `secondaryFor`; the five new types have **both empty** and would fail it as written.
  Extended: a type passes if it declares evidence coverage **or** a non-empty `rehearses` whose every
  id resolves in the skill graph. This is the mechanism that makes D1 enforceable — *"every newly
  admitted Activity type names the Skill it rehearses"* becomes a check rather than a promise.
- **Check 2 (`skill->primary type`) is extended by one assertion and must otherwise stay green
  untouched**: `rehearses` never contributes to coverage, so a Skill covered only by rehearsal still
  reports uncovered. This is D1's `onGap` clause, enforced.
- **Check 4 (pattern verdicts)** gains the play axis: exactly 19 rows carry a play verdict, every one
  has a non-empty reason, every id is one of the 15 `rejected` or 4 `not-adopted-no-target` rows, and
  no `adopted-*` row carries one.
- **Check 6 (register delta)** covers the three new rows of §10 and asserts `A-18`, `A-13`, `A-21` and
  `A-22` are cited rather than duplicated.
- **New check 7 (type integrity):** every ungraded type has `primaryFor: []`, `secondaryFor: []`,
  `gradedBy: none`, and a non-empty `rehearses` — so an ungraded type cannot silently acquire evidence
  coverage in a later edit.

**One seam already named by `LDB-04` and still unbuilt: the mastery reducer.** This document adds
cases and no seam. `LDB-04` specified it as a pure function from `ProgressAttempt[]` plus a config to
mastery states per Skill. The cases owed:

- an attempt with `disposition: { status: 'ungraded' }` and `gradedBy.authority: 'none'` is **present
  in the record** and **moves no bar** (D8) — both halves asserted, since testing only the second
  would pass on an implementation that dropped the attempt entirely;
- an in-situ `state-report` capture reaches the bar under whatever conditions `LDB-04` rules (D7),
  with the case written against that ruling rather than against this document's expectation of it;
- the eight `state-report` Skills still resolve to a bar (D5, D9).

**Not a seam.** Rendering — the disclosure control, the sort and ordering interactions, the estimate
continuum, the rule assembler — is `LDB-07`'s and is tested wherever that card decides. This document
deliberately owns no widget, following `LDB-04`'s own *"Not a seam. Rendering… is LDB-07's."*

**Prior art.** `scripts/check-ldb03-taxonomy.js` itself, whose six checks are the model for the
extensions; and for the reducer, the co-located vitest suites under `web/src/progress/`
(`contract.test.ts`, `canonical.test.ts`, `types.test.ts`, `boundary.test.ts`) with fixtures from
`web/src/progress/fixtures.ts`.

---

## Out of Scope

- **Every widget, control, layout, rendering and WCAG target** — `LDB-07`. Including the
  `totalsDisclosure` control (D6), the capture control (D7), U2-3's brush, and the operation of all
  five new types.
- **Session entry, size, stopping, mix, trajectory**, and whether ungraded activities consume the
  session bound — `LDB-06` (D11).
- **Window eligibility of in-situ captures**, and any change to what enters the mastery window —
  `LDB-04` (D7).
- **Which types phase 5 builds**, and the phase-5 slice — `LDB-08`. D2 ranks by cost; it does not
  select.
- **The shell** — path, map, daily goal, return ritual, characters, sound. L3, owed to phase 6.
- **Card counting** — U2-11's home. Phase 7, which introduces the fifth Condition axis.
- **New collection.** This card opens no source. Where a catalog quotation is reproduced, it is
  reproduced from the catalog row and labelled as such (D4).
- **Any code.** Phase 4 builds nothing. §11 is owed to phase 5 and authorises nothing now.

---

## Further Notes

### 10. Register delta

**Three new rows**, each a teaching claim separable from `A-18`'s class premise and contestable on its
own:

| Row | Claim | Evidence held | Validation method |
|---|---|---|---|
| new | Grouping situations by their shared action teaches the abstraction, rather than supplying the answer. (`principle-name`, U3-9) | Weak and against it. N = 20, one experiment, no replication, measuring later *memory* rather than abstraction, and its own authors call it contrived. | Playtesting — `principle-name` against per-cell recall on the same learners. |
| new | Eliciting a point estimate before revealing the true value builds variance intuition better than showing the value. (`estimate-and-check`, U2-4 half) | **None held.** U2-4's source makes no such claim and the row was classified *cosmetic*. `how-to-teach.md` Part 4's "teach bust rates before showing the chart" is a product premise, not evidence. | Playtesting against a show-the-number baseline. |
| new | Authoring a policy and watching it tested teaches the policy. (`rule-battery`, U2-10) | **None held.** | Playtesting; also the strongest instrument for closing `A-18`. |

**Cited, not duplicated** — each checked before being relied on:

- **`A-18`** — the class premise for every ungraded type (D10). Becomes closable.
- **`A-13`** (*"Learners can be trained to evaluate a decision independently of the hand result"*) —
  already carries `estimate-and-check`'s shoe-position half, whose whole point is scoring against the
  computed value and never against what the shoe did.
- **`A-21`** — already carries U2-3's blank-grid claim, forwarded to `LDB-07`.
- **`A-22`** — **checked and it does not stretch.** It covers a *configurable variance sandbox* where
  the learner sets shoe, ruleset and bet ramp and runs it. That is not point-estimate elicitation,
  which is why `estimate-and-check` gets its own row rather than riding this one.

**Net new rows: 3.**

### 11. Owed schema delta — two, both additive, both to phase 5

1. **`InteractionMode` widening.** It is a closed union of `'multiple-choice' | 'assemble-blocks' |
   'engine-hand'` (`web/src/progress/types.ts:31`). `assemble-blocks` plausibly covers `hand-sort` and
   `procedure-order`; `estimate-and-check` and `rule-battery` have no member. Additive union widening,
   zero migration. **Note the tension, recorded rather than resolved:** `LDB-03` excluded widget from
   the taxonomy by construction, yet the durable schema names widgets in this field. Valuing it is
   `LDB-07`'s; the widening is owed regardless.
2. **A hand-total disclosure field**, per D6. `tableVisibility` does not cover it and must not be
   reused for it.

**And the delta that is *not* owed, stated because assuming otherwise would cost a migration nobody
needs:** ungraded attempts require **no** schema change. `{ status: 'ungraded' }`, `authority: 'none'`
and `mode: 'acquisition'` all already exist (D8).

### 12. Divergences from approved specs — surfaced, then ruled, then applied

Per decision 12 of 2026-08-15. Surfaced here first and applied only after the owner ruled them at
this card's gate on 2026-08-15. **All six ruled together and assented; none dropped.** *(For
contrast, `LDB-05`'s gate put three individually and dropped one — so a batch ruling is the weaker
form, and is recorded as what happened rather than dressed up as the stronger one.)*

1. **`LDB-03` §6 coverage rule** gains D1's ungraded-admission clause. *(The owner settled the clause
   itself at Q8; the edit to an approved document is what is surfaced here.)*
2. **`LDB-03` §6 type table** goes from 6 types to 11 (D2), in
   `2026-08-01-activity-taxonomy-and-skill-mapping.md` and its `.json`.
3. **`LDB-03` `rule-contrast`** gains the `probe` parameter (D3).
4. **`LDB-03` `state-report`** gains the disclosure Condition, and its evidence route becomes in-situ
   as well as standalone (D5, D6, D7).
5. **`LDB-03` §7 pattern verdicts** gain a play axis over 19 of the 32 rows (D4). The measurement
   verdicts are **not** altered — the play verdict is a second, independent axis, and no row's
   original disposition is rewritten.
6. **`LDB-01` — no divergence.** Recorded here as an entry so the gate sees the answer rather than an
   absence (D9).

Divergences 1–5 all land in one approved artifact plus its validator, which was the owner's choice at
drafting: one place a reader looks for *what activities exist*, rather than two files that must agree.

### 13. Handed forward

- **To `LDB-04`:** is an in-situ `state-report` capture a separate Presentation under D3, and is it
  window-eligible? (D7.)
- **To `LDB-06`:** do ungraded activities consume the session bound? (D11.) And the in-situ capture
  rides D2's opt-in field — do not merge it with `resourcesConsulted`.
- **To `LDB-07`:** the `totalsDisclosure` control; the capture control; the operation of five new
  types; U2-3's brush, with its play verdict and `A-21` attached.
- **To `LDB-08`:** five types ranked by cost, not selected; `A-18` now closable, and `hand-sort` named
  as its cheapest instrument.
- **To phase 5:** §11's two deltas.
- **To phase 7:** U2-11's positive play verdict, so the counting on-ramp inherits it.

### 14. Approval criteria — checkable

1. **All 19** unadopted patterns carry a play verdict with a non-empty reason — 15 `rejected` plus 4
   `not-adopted-no-target`, enumerated by id, with no `adopted-*` row carrying one. *(Check 4.)*
2. `LDB-03` §6's coverage rule carries D1's clause, and **every** type with empty `primaryFor` and
   empty `secondaryFor` declares a non-empty `rehearses` resolving in the skill graph. *(Checks 1 and
   7.)*
3. Rehearsal contributes **no** coverage: check 2 still reports 18 of 18 covered by primary evidence,
   with the same mapping as before. *(Check 2.)*
4. The eight `state-report` Skills are ruled with the reversal cost stated — D5 rules *keep*, and the
   cost is nil because no id, bar or `schemaVersion` moves. *(Check 2 plus D9.)*
5. Every change to an approved spec appears in §12 as a divergence rather than applied to the target
   document before the gate.
6. The three new register rows are present in `assumption-register.md` **after** writing, each with a
   named validation method, and `A-13`, `A-18`, `A-21`, `A-22` are cited rather than duplicated.
   *(Check 6 — verified in the target file, not merely approved.)*
7. `scripts/check-ldb03-taxonomy.js` reports all checks passing after the extensions, and
   `scripts/check-doc-drift.sh` reports no drift.

*Criteria 1–3, 6 and 7 are machine-checked; 4 and 5 are read. That split is stated so no reader takes
the whole list for automated.*

### 15. Vocabulary owed to `CONTEXT.md` — to land at approval, not before

`Ungraded Activity type` · `Rehearses` · `Totals disclosure` · `In-situ capture` · and the five type
names — `hand-sort`, `estimate-and-check`, `procedure-order`, `principle-name`, `rule-battery`.

Plus one **disambiguation**, which is the reason D6 exists at all: **Table (strategy)** versus **Table
(blackjack)**. `tableVisibility` and `supportFading`'s `table-open` mean the strategy chart;
`totalsDisclosure` means the blackjack table. One word, two referents, and the schema uses both.

### 16. What this document did not check

Stated positively, because absence has stood as proof in this repository four times.

- **The catalog's sources were not re-opened.** D4's verdicts rest on the catalog rows and on
  `classification.md`, both already in the repository. Quotations inside those rows are reproduced,
  not re-verified at source. The card required no new collection and none was done.
- ~~**`journal/decisions.md` rows and `CONTEXT.md` terms are owed and have not landed.**~~
  **LANDED 2026-08-15 at approval** and verified present in each target file after writing. §15's
  vocabulary is in `CONTEXT.md` — four terms plus the Table collision note — and the gate record is
  the last section of `journal/decisions.md`.
- ~~**The validator extensions in §Testing are specified and unwritten.**~~ **WRITTEN 2026-08-15**:
  `check-ldb03-taxonomy.js` now runs **8 checks and passes all 8**. The extension was not cosmetic —
  the five new types would have **failed check 1 as it stood**, which is the whole reason D1's clause
  is enforced rather than asserted. Check 3 additionally reports `principle-name` as
  classification-supplied with no violation, and would fail the moment that type were graded.
- **The mastery-reducer cases in §Testing remain unwritten**, because the reducer itself is unbuilt.
  `LDB-04` named the seam; phase 5 builds it. Those cases are owed with it, not with this document.
- **The `LDB-06` redraft was not audited by this card.** An `audit-examiner` pass over its 357 lines
  is separately owed and is not this document's.
