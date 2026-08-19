# The Challenge and the Unit Skip-Test — LDB-11

> **Status: DRAFT 2026-08-19.** Not authoritative. Awaiting the `user-approval` gate.
>
> **This spec implements owner rulings rather than proposing them.** Twelve rulings were taken at
> the grill of 2026-08-19 and are recorded on card `LDB-11`. This document states them, grounds
> them, and works out what they cost. It does not re-open them. Where it adds something the grill
> did not settle, that addition is marked **[NEW HERE]** and is a gate item.
>
> **One approved decision is knowingly reversed** — `LDB-06` `RC-03` clause 2. See §6. It is stated
> as a reversal with its evidence cost named, not rewritten as though it had always read that way.

---

## 0. What made this card exist

`A-30` is an owner decision of 2026-08-17: *"Units are ordered, and a learner advances one step at a
time unless they pass a skip-test on what they are skipping."* `CONTEXT.md`'s **Unit** entry states
it as approved product behaviour: *"the learner … reaches a Unit further ahead only by passing a test
on what they are skipping."*

**No document designs that mechanic, and the phase-4 gate artifact never mentions it.** Counted
positively rather than claimed as an absence, on 2026-08-19:

| String searched | Where it was searched | Hits |
|---|---|---|
| `A-30` | `docs/superpowers/specs/*.md`, `CONTEXT.md`, `journal/decisions.md` | `assumption-register.md` 1, `CONTEXT.md` 2, `journal/decisions.md` 1, `2026-08-08-session-composition.md` 1 |
| `A-30` | `2026-08-19-learning-design-blueprint.md` | **0** |
| `skip-test`, `skip test`, `skipping` | every `2026-08-*` spec and `CONTEXT.md` | **1** — `CONTEXT.md:35` |

This is the repository's founding failure class — *"corrections do not execute themselves"* — with a
mechanic in place of a citation. An owner decision reached a register row and a glossary entry and
then stopped.

The same design supplies the confidence instrument that blueprint §9 item 1 left open, so one card
closes both. That is convergence and is treated as such: the Challenge is justified below on `A-30`
grounds alone, and the `P-5` coverage is a consequence rather than a reason.

---

## 1. Problem Statement

**From the learner's side.** A learner who already knows blackjack — or who has just worked hard at
one Skill and feels sharp — has no way to say so. Units are ordered and they lock. The only route
forward is to walk every step, including steps over material they already hold. The product's own
glossary promises them a way past, and there is nothing behind the promise.

**And the second, quieter problem.** The product has no idea whether it is producing confidence or
competence. Bridge §1.5 `[VERIFIED]` records that a brief practice period significantly raised
participants' confidence about an outcome they could not influence, and `product-design-inputs.md:144`
draws the conclusion: *"Confidence gain is not a proxy for learning and must never be used as one."*
`A-17` carries the assumption that confidence and skill rise together, rated **Low — expect
divergence**, with `P-5` as its named test. Nothing in the approved design captures a confidence
signal, so `P-5` is currently unanswerable and the assumption is untestable.

---

## 2. Solution

**A Challenge.** The learner sees the whole path, points at a Skill or a Unit ahead of them, and says
*"I've got this."* The product takes the claim seriously: it runs a short session that ends in real
dealt hands with no strategy table and no correction until the debrief. Clear it and the learner
moves; do not clear it and nothing is taken away.

**A Challenge has two parts, and they are two session shapes rather than one.**

1. **The warm-up** — a **Coached session**. Unmeasured Activities, multi-option questions, hand
   drills, visual logic. The product corrects immediately. This part carries the variety and the
   ceremony.
2. **The proving run** — a **Closing run**. Real dealt hands, `arranged` provenance drawn to cover
   the target's cells, **mixed** pool, strategy table **not offered**, feedback
   `deferred-to-debrief`. This part carries the proof.

**The measurement is the request, not a question.** The product never asks *"how confident are you?"*
It records that the learner asked, and what the Mastery window said at that moment. The divergence
between the two is the `P-5` series.

---

## 3. User Stories

1. As a learner, I want to see the whole path including Units I have not reached, so that I know what
   the product is going to teach me before I commit to it.
2. As a learner, I want to point at a Unit ahead of me and say I already know it, so that the product
   does not make me re-walk material I hold.
3. As a learner, I want that claim to be tested rather than taken at my word, so that moving ahead
   means something.
4. As a learner, I want the test to be about the Unit I am skipping and nothing else, so that I am
   not failed by material I never claimed.
5. As a learner, I want the hands in a Challenge to be real dealt hands, so that clearing it means I
   can play, not that I can answer questions about playing.
6. As a learner, I want the situations in a Challenge to be relevant rather than random, so that a
   short Challenge still covers what matters.
7. As a learner, I want the situations to be **mixed** rather than grouped, so that I still have to
   notice which situation I am in.
8. As a learner, I want to Challenge a single Skill I have been working on, so that I can find out
   where I stand without committing to a whole Unit.
9. As a learner, I want the Challenge to start with something playful, so that it does not feel like
   sitting an exam.
10. As a learner, I want the playful part to correct me as I go, so that the warm-up teaches me
    something even if the proving run does not go well.
11. As a learner, I want the proving run to withhold correction until the end, so that the result
    reflects what I knew rather than what the app just told me.
12. As a learner, I want no strategy table during the proving run, so that clearing it is honest
    evidence of what I hold unaided.
13. As a learner, I want to Challenge a Skill the product has never taught me, so that the path is a
    suggestion rather than a cage.
14. As a learner who does that, I want to be shown the Skill first rather than refused, so that
    curiosity is answered with content instead of a locked door.
15. As a learner, I want that first showing to count for nothing, so that my record is not damaged by
    meeting something for the first time.
16. As a learner, I do not want the product to ask me how confident I feel, so that I am never asked
    to grade myself.
17. As a learner, I want my confidence never to affect my Mastery, so that feeling good about a Skill
    is never mistaken for having it.
18. As a learner, I want a Challenge I do not clear to cost me nothing, so that trying is never
    punished.
19. As a learner, I want to retry immediately, so that a Challenge is a thing I do rather than a
    thing I wait for.
20. As a learner, I want no "failed" language anywhere, so that the product stays a trainer rather
    than an examiner.
21. As a learner, I want a Challenge to get harder as my Player score rises, so that it keeps meaning
    something once I am good.
22. As a learner, I want the harder version to remove support rather than invent trick hands, so that
    difficulty is honest.
23. As a learner, I want a Challenge to differ each time I take it, so that I cannot clear it by
    memorising one run.
24. As a learner, I want the debrief to show me exactly which decisions were wrong and what the
    correct action was, so that a Challenge teaches even when it does not pass.
25. As a learner, I want a Unit Challenge to cover every gated Skill in that Unit, so that skipping
    ahead cannot leave a hole behind me.
26. As a learner who clears a Unit Challenge, I want to arrive at the new Unit with the skipped Units
    marked as cleared, so that the path stays coherent behind me.
27. As a learner, I want to go back over any Unit I have cleared, so that skipping ahead never
    destroys access to the material I skipped.
28. As a learner, I want the Challenge to be free, so that the economy never stands between me and
    proving something.
29. As a learner, I want the hands I play in a Challenge to count toward my Mastery like any other
    hands, so that the effort is never wasted.
30. As a learner, I want a Challenge to be offered to me when the product thinks I am ready, so that
    I am not left grinding a Skill I have already got.
31. As a learner, I want to tell the offered kind from the kind I asked for, so that an invitation
    does not read as a demand.
32. As the product owner, I want the moment a learner claims readiness recorded, so that `P-5` has a
    series to read.
33. As the product owner, I want the Mastery-window state recorded alongside that claim, so that the
    divergence is computable rather than inferred.
34. As the product owner, I want the confidence record isolated from every mechanism by construction,
    so that it cannot leak into Mastery through a later change nobody reviewed.
35. As the product owner, I want product-initiated Challenges excluded from the `P-5` series, so that
    the product's own opinion is not counted as the learner's.
36. As the product owner, I want a Unit Challenge to be deterministic and coverage-complete, so that
    the product makes no psychometric claim it cannot support.
37. As the product owner, I want the reversal of `RC-03` recorded as a reversal, so that a later
    reader can see what was traded and why.
38. As the product owner, I want each landing target checked present in its file after writing, so
    that this ruling does not join `A-30` in the drawer of decisions nobody executed.

---

## 4. Implementation Decisions

Every decision carries an evidence label. Decisions **D1–D12** are the grill rulings; **D13–D15** are
consequences worked out here and marked **[NEW HERE]**.

### D1. The request for a Challenge is the confidence signal

The product **never** asks the learner to rate their own confidence. The learner's act of requesting a
Challenge on a named Skill or Unit *is* the claim, and it is what gets recorded.

This satisfies `A-17`'s named validation method — *"paired longitudinal series of self-rated
confidence and measured decision accuracy on the same sessions"* — because a request **is** a
self-rating, expressed as an action. It also clears the two grounds on which `LDB-09` declined `U2-9`'s
self-rating half: the evidential one (Kornell & Bjork — 78% performed better spaced, 78% rated massed
as good or better) does not apply, because nothing here treats the rating as evidence; and the
mood-killer one does not apply, because the learner initiates it.

`[Product judgement]`

### D2. Confidence is recorded and never used

The Challenge declaration record is **write-only with respect to every existing mechanism**. Written
positively, in the style of `LDB-05` D7's final column, so the prohibition cannot creep:

| The declaration may feed | The declaration may **never** feed |
|---|---|
| The `P-5` series, and nothing else in v1 | Mastery — no clause of `LDB-04` D1–D13 may read it |
| | Chips, XP, or the Player score |
| | The Recommender |
| | Challenge difficulty |
| | Any Grading authority |

**This is the reading of `LDB-04` user story 23, and the reading is the decision.** That story asks
that the app *"never ask me how confident I feel **and then treat my answer as evidence**, so that
feeling good about a Skill is never mistaken for having it."* The prohibition is the compound: the
harm named is *mistaking*, not *asking*. `LDB-04`'s own gate criterion 3 confirmed by enumerated
search that *"confidence appears in no mastery calculation … it appears only in exclusions"*, and D2
keeps that true — the exclusion becomes explicit rather than incidental.

`[Product judgement]` on the reading. `[Evidence-backed]` on the prohibition itself, via bridge §1.5
`[VERIFIED]` and `product-design-inputs.md:278` — *"Confidence must not be a mastery signal."*

### D3. Phase 5 owes the instrument, not the verdict

The phase-5 exit condition is reworded from *"cannot exit without **answering** these from recorded
attempt data"* to:

> Each declared question has a **named field or pair of fields recorded per attempt**, and a **query
> that would answer it** once enough data exists.

`A-17`'s method is a **longitudinal** series across sessions, and `A-24` records the decisive fact:
*"this product has one user."* A first build slice cannot produce a divergence curve for n = 1, so the
old wording is either unmeetable or an invitation to read a curve off ten hands.

**This applies to `P-1` and `P-3` as well as `P-5`.** The blueprint justifies both by saying the
fields already exist, which is an instrumentation claim. The reworded condition states what was
already meant.

`[Product judgement]`, grounded on `A-24` `[Evidence-backed]`.

### D4. Both may start a Challenge; only one kind is a signal

A Challenge carries `initiatedBy: learner | product`.

- **`learner`** — the learner asked. This is the `P-5` signal.
- **`product`** — the Recommender offered it because the Mastery window says the learner would clear
  it. This is a graduation moment and is **excluded from the `P-5` series**.

**Why the exclusion matters more than it looks.** If the product only ever offered Challenges when the
data said ready, `P-5` would be structurally unmeasurable: the interesting learner is the one who
*feels* ready when the evidence says not yet, and a readiness gate filters exactly that learner out
before the measurement happens. Recording both kinds and separating them is what keeps the question
answerable.

`[Product judgement]`

### D5. The proof is dealt hands; the warm-up is not evidence

The proving run is built from the Activity types that are `primaryFor` the target Skills. Computed
directly from `2026-08-01-activity-taxonomy.json` rather than taken from a summary:

| Activity type | `primaryFor` |
|---|---|
| `deal-and-decide` | `hit`, `stand`, `double`, `split`, `classify-hand`, `strategy-action`, `legal-fallback`, `adherence-under-loss` |
| `state-report` | `card-values`, `hand-total`, `ace-value`, `bust`, `dealer-info`, `outcomes`, `wager-result`, `natural-blackjack` |
| `rule-card-read` | `read-rule-card` |
| every other type | `[]` |

Under `LDB-04` D6, evidence from a type that is not `primaryFor` a Skill *"is recorded, informs what to
recommend next, and **never reaches the bar**."* So a quiz or a puzzle cannot certify anything, and
this design does not ask it to. `A-10` was retired on precisely this ground — *"no decision Skill's
primary evidence is multiple choice any more."*

The warm-up's Unmeasured Activities are still **graded, still surface their verdict, still recorded,
and still feed the Recommender** (`LDB-09` D8 as amended 2026-08-17). They are not silent; they are
simply not certification.

`[Evidence-backed]` on `LDB-04` D6 and the taxonomy values.

### D6. Hands are `arranged` in provenance and **mixed** in pool

Two dials, and they are set in opposite directions on purpose.

- **Provenance: `arranged`.** A composition-honest opening placed on top of a real shoe
  (`shoe.rs:62`). The Challenge draws situations that cover the target's cells — nothing wasted on
  hands that exercise nothing. This does not fake card flow; the shoe is real and ordered beneath it.
- **Pool: `mixed`.** The situations are interleaved, so the learner must still perform the
  **Classification** before choosing an action.

**A blocked pool would hand the answer over.** `LDB-06` D4: `deal-and-decide` is *"**Mixed by
default.** Blocked permitted **only** for first exposure to a Classification, declared as such, and
**only inside curriculum work** — never in Practice, never at a table."* A Challenge is not first
exposure. And `A-23` records the evidence that decides it: interleaving's benefit is a
**discrimination** benefit — 72% vs 38%, d = 1.05 — and a learner drilled on arranged hard-16s *"has
produced the correct action many times without ever having to notice a hard 16 arise"*, which is the
half a Challenge is supposed to test.

For a **Unit** Challenge this is not a preference: `ALR-034` requires it to be *coverage-complete for
every gated skill*, which is mixed by definition.

`[Evidence-backed]` on `LDB-06` D4 and `A-23`.

### D7. Difficulty comes from the Player score, and rank does not exist

"Rank" is the existing **Player score** — `LDB-05` D7's *"a rating; rises and falls"*, moving with
decision quality, which that same table already permits to gate **difficulty only**. Nothing new is
introduced and nothing is reversed.

**Difficulty is composed in this order:**

1. **Less support** — strategy table not offered, feedback deferred, no "show me" control.
2. **More noise** — longer runs, wider interleaving, more Skills live in the mix at once.
3. **Harder cells** — *deferred*. Nothing in the project ranks cells by difficulty, and inventing a
   ranking would need its own register row and its own evidence.

**No rung is permanent.** `LDB-04` D1 rules one Mastery state per Skill, and `CONTEXT.md` says Mastery
is *"never a permanent property, never a lock."* Clearing a hard Challenge grants no title and no
badge; the Skill's Mastery is still computed from the last ten Presentations and can still fall to
Review due.

`[Evidence-backed]` on `LDB-05` D7 and `LDB-04` D1. `[Product judgement]` on the ordering.

### D8. Variation is deterministic, not adaptive

A Challenge draws from a per-target pool, shuffled, covering the target's cells completely, and does
not repeat an order. The product does **not** estimate the learner's ability to select items.

`ALR-034`, adopted for the first mechanics proof: *"make skip tests deterministic, unassisted, and
coverage-complete for gated skills … do not claim psychometric adaptivity without calibrated items."*
`SCI-008` is the ground — adaptive precision depends on calibrated item information, which requires a
response population this product does not have (`A-24`: one user).

`[Evidence-backed]`

### D9. A Skill never met may be Challenged; the Tutorial runs first

The learner may request a Challenge on anything visible on the path.

1. The **declaration is recorded** — this is a `P-5` data point regardless of what follows, and it is
   the strongest over-confidence signal the product can capture.
2. `LDB-06` D18 then applies: *"first contact with a Skill is a **Tutorial**, and a Tutorial never
   counts."* The learner is shown the Skill.
3. The Challenge becomes available afterwards.

The learner is not refused and not lectured. They asked to be shown something; they are shown it.

`[Evidence-backed]` on `LDB-06` D18.

### D10. Not clearing a Challenge costs nothing

No Chips cost, no cooldown, no lock, no "failed" wording, no mark on the record. The debrief is an
ordinary Learning session debrief: decisions, corrections, the Skill's window.

**The consequence already exists and needs nothing added.** The proving run's Presentations were
table-closed evidence and counted like any others, so a weak Challenge has already moved the Mastery
window down. `CONTEXT.md` calls Review due *"a prompt to return, never a demotion"*, and `LDB-05` D12
forbids framing setbacks as recouping. A penalty layered on top would be a second punishment for one
event.

**`AGENTS.md`'s removal rule, applied in reverse:** if a cost is ever added here, it must name what it
motivates that the falling window does not.

`[Product judgement]`

### D11. One mechanic, two scopes

| | **Skill Challenge** | **Unit Challenge** |
|---|---|---|
| Target | One Skill | One Unit |
| Coverage | That Skill's cells | **Every gated Skill in the Unit** (`ALR-034`) |
| Length | Short | Proportional to the Unit |
| On clearing | Nothing structural — the window moved, as it does for any Presentations | The skipped Units are marked cleared and the learner arrives at the target Unit |
| `P-5` role | The primary instrument | Also a declaration, recorded identically |

Same shape, same screen, same rules. Only scope and length differ.

**The case against, recorded because it was raised:** two separate mechanics would let the Unit
Challenge be a heavier ceremony with its own pacing. That difference is a **presentation** decision and
belongs to `LDB-07`; it does not require a second mechanic underneath.

`[Product judgement]`

### D12. The term is **Challenge**

`CONTEXT.md` gains **Challenge**, **Skill Challenge** and **Unit Challenge**. The **Unit** entry is
reworded from *"only by passing a test on what they are skipping"* to *"only by clearing a Challenge
on what they are skipping"*, and `A-30` is reworded to match.

**`test` joins the `Avoid` list.** It is already avoided under **Closing run** (*Avoid: Test,
assessment, exam, final*), so `CONTEXT.md` currently contradicts itself: one entry forbids the word and
another uses it for the product's most important assessment.

domain-modeling.

### D13. **[NEW HERE]** The declaration record

The Challenge declaration is a record distinct from a `ProgressAttempt`, because it exists whether or
not any Presentation follows it (D9's Tutorial case).

Fields:

| Field | Meaning |
|---|---|
| `target` | The Skill id or Unit id claimed |
| `targetKind` | `skill` \| `unit` |
| `declaredAt` | Timestamp |
| `initiatedBy` | `learner` \| `product` (D4) |
| `windowStateAtDeclaration` | Per targeted Skill: the Mastery window's contents and whether the bar was met **at that moment** |
| `outcome` | `cleared` \| `not-cleared` \| `abandoned` \| `redirected-to-tutorial` |

`windowStateAtDeclaration` is the half that makes `P-5` computable. Recording only the request would
force the query to reconstruct history; recording the window beside it makes the divergence a
subtraction.

`[Product judgement]`

### D14. **[NEW HERE]** Session-shape legality moves into the taxonomy data

`LDB-06`'s legality rule lives in prose today. For check 9 (§7) to be mechanical, the taxonomy JSON
must carry the shapes each Activity type is legal in, derived from the rule rather than hand-listed.

This is the same move `LDB-09` made when it put `rehearses` into the JSON so check 1 could enforce a
coverage clause instead of promising it.

`[Product judgement]`

### D15. **[NEW HERE]** `LDB-05` D11 changes state

The leaderboard moves from **deferred** — *"inherited from `CLOUD-06`, not decided here"* — to
**scheduled behind the second-user trigger**, which `stack-boundaries.md` already defines.

**Three things this does not do.** It does not adopt Supabase: that provider is a named candidate
whose admission fields 1, 2, 3 and 6 are open, and *"Supabase can lose the gate it has not yet been
through."* It does not touch `LDB-05` D12's prohibition — **no Chips leaderboard may ever exist**,
permanently, on anti-superstition grounds independent of architecture. And it does not unlock anything
in phase 5: storage stays IndexedDB, because the banked record already rules `P-1`, `P-3` and `P-5`
answerable from local attempt data.

**The correction that made this decidable:** a hosted database does not fix forgeability. The engine is
client-authoritative and the browser can see the entire undealt shoe, so a client that can compute a
false score can write it to Supabase exactly as easily as to IndexedDB. The declared target is
therefore **replay verification** — the client submits the seed, the ruleset and the decision sequence,
and a server re-runs `blackjack-core` to recompute the result. The engine is already deterministic and
seeded (`session.rs:9`, `session.rs:24`, `rng.rs:SeededRng`), which is what makes this cheap.

**Its schema consequence, and the reason it is stated now rather than at the gate:** replay
verification requires the **seed and the decision sequence to persist per session**, not just the
aggregate. That is a storage decision, and it is much cheaper to make before the adapter is written
than after.

`[Evidence-backed]` on the forgeability ground (`ROADMAP.md:307`, `E-7`, `CLOUD-06`).
`[Product judgement]` on replay verification as the target.

---

## 5. Testing Decisions

**What makes a good test here.** Phase 4 builds no product code, so every test in scope is a **design
validator**: a script that reads the approved design artifacts and fails when they contradict each
other. The bar `LDB-09` set is the right one — *enforcement not assertion*: a check earns its place
only if the design could drift into failing it, and a check that could only pass is worse than none,
because it certifies.

**Seams — zero new ones.**

- **`scripts/check-ldb03-taxonomy.js`, 8 checks → 10.** It already reads
  `2026-08-01-activity-taxonomy.json` and reports `N passed, M failed`. Extending it keeps the design's
  enforcement in one place. Prior art: `LDB-09` took it 6 → 8 for exactly this reason, and its check 1
  had to change because five new types would have failed it as written.
- **`scripts/check-doc-drift.sh` gains nothing.** Declined deliberately: `AGENTS.md`'s bar is *"a
  documented failure or a measured retrofit cost; never just in case"*, and `CONTEXT.md` and `A-30`
  have never drifted from each other. Two checks already sit unbuilt at blueprint §8 **with** their
  failures documented; adding a third without one would be the thing that bar exists to prevent.
- **Rendering is not a seam.** It is `LDB-07`'s, per `LDB-04`'s precedent.

**Check 9 — Challenge legality.** Reads D14's shape data. Asserts that every Activity type yielding the
goal Skill no window-eligible evidence is legal in **exactly** `{Coached, Challenge}`; that no type is
legal in a shape whose Provenance mode is absent from its own `provenance` list (`RC-03` clause 1,
unchanged); and that every type declared in the taxonomy carries a legality entry. **It fails the
moment a type is added without deciding its shape legality** — the failure mode `RC-03` clause 2 was
written as a property rule to prevent.

**Check 10 — confidence isolation.** Enumerates positively where the declaration record's field names
appear across `web/src/progress/` and the approved specs, and fails if any of them appear in a Mastery
computation, a meter computation, the Recommender, or difficulty selection. This is D2 made mechanical.
It is the ruling most likely to be broken later by inattention rather than by decision, which is
exactly what `LDB-05` D7's final column exists to stop.

**Existing checks that must still pass, and one that will move on its own.** Check 6 (register delta)
reads declared new rows against `assumption-register.md`, so it will fail until §8's rows are filed —
that is the check doing its job. Checks 1–5, 7 and 8 must remain at pass; check 7's ungraded-type
integrity in particular must not be weakened to accommodate the warm-up.

---

## 6. The reversal — `LDB-06` `RC-03` clause 2

**Stated as a reversal, with what it costs, because the repository's own rule is that a removal names
its replacement.**

**Current wording** (`2026-08-08-session-composition.md:836-846`, owner decision 2026-08-17):

> An Activity type is legal in a session shape when both hold:
> 1. Its `provenance` list contains the shape's Provenance mode.
> 2. **If it yields the goal Skill no window-eligible evidence, the shape is Coached.**

**New wording:** clause 2 becomes *"…the shape is **Coached or a Challenge**."* Clause 1 is untouched.

**What is unchanged, and it is most of it.** Ordinary Closing runs and Table sittings keep the old
rule. The owner ruled Free Play stays clean, on `RC-03`'s own ground: *"nobody wants a card-sorting
puzzle in the middle of a shoe they paid to sit down for."* `policy-paint` remains excluded from every
Closing run by clause 1 alone, mechanically, because it is `provenance: ["posed"]`.

**What it costs, named rather than minimised.** `RC-03`'s second ground is evidence-backed: Brummer's
finding that *"a combination of feedback timing approaches was ineffective."* A warm-up that reveals its
own answers, followed by a proving run whose feedback is deferred, is a combination of feedback
timings. **That cost is accepted, not argued away.**

**Two things narrow it.** The two parts are sequential and separated by a boundary the learner can see,
rather than interleaved within one run — which is not the same configuration Brummer measured, though
this document does not claim the distinction is evidence-backed. And the warm-up is optional to the
learner in the sense that it can be skipped straight to the proving run.

**Reopening condition:** if Challenge clear-rates for learners who take the warm-up come out **at or
below** those who skip it, Brummer's finding has reproduced here and the warm-up should move out of the
Challenge into ordinary Coached sessions. Computable from stored data with no new instrument.

`[Product judgement]` on the reversal. `[Evidence-backed]` on the ground being overridden.

---

## 7. What this spec must land, and where

A ruling that stays in a spec has not happened. Each item is verified **present in its target file
after writing**, and counted positively.

| # | Target file | What lands |
|---|---|---|
| 1 | `2026-08-08-session-composition.md` | `RC-03` clause 2 reworded; superseded wording quoted in place |
| 2 | `2026-08-04-motivation-and-chips-economy.md` | D11 state change (D15); D12 untouched and said to be untouched |
| 3 | `CONTEXT.md` | Challenge, Skill Challenge, Unit Challenge; Unit entry reworded; `test` added to `Avoid` |
| 4 | `assumption-register.md` | `A-30` reworded; new rows per §8 |
| 5 | `docs/specs/stack-boundaries.md` | Replay verification as declared target + its schema consequence |
| 6 | `2026-08-01-activity-taxonomy.json` | Shape legality data (D14) |
| 7 | `scripts/check-ldb03-taxonomy.js` | Checks 9 and 10 |
| 8 | `journal/decisions.md` | The gate record |

---

## 8. Register rows this owes

Filed at approval, not before — the convention `LDB-04` §16 set and `LDB-09` followed.

| Row | Assumption | Validation method |
|---|---|---|
| **`A-17` sub-row** | A learner's **request** for a Challenge is a usable proxy for self-rated confidence. | Playtesting — `P-5`. Compare the declaration series against the Mastery window at declaration time. **Known limitation, recorded rather than hidden: this measures only learners who act on their confidence. A learner who feels ready and never asks is invisible.** |
| **New** | A two-part Challenge — playful warm-up then proving run — motivates a learner to prove a Skill better than a proving run alone. | Playtesting — clear-rate and request-rate with the warm-up against without. Nearest precedent is `A-22`, whose evidence for a Brilliant-sourced puzzle is *"None held"*. |
| **New** | Clearing a Unit Challenge is adequate evidence to skip the Units it covers. | Playtesting — track learners who skip a Unit against those who walk it, on later organic play of the skipped Unit's Skills. This is `A-30`'s missing test; `A-30` itself records *"None, and none was sought — this is product judgement."* |

---

## 9. Out of Scope

- **The leaderboard and the Supabase admission gate.** Different trigger, different card, own six-field
  gate. D15 changes the leaderboard's *state* and builds none of it.
- **Server authority.** Replay verification is declared as the target; nothing here implements it.
- **Every screen.** How a Challenge looks, how the path renders, how the request control reads, how the
  debrief is laid out — `LDB-07`.
- **The visual system.** Phase 6.
- **Harder-cell difficulty.** D7 defers it; nothing ranks cells.
- **Product code.** Phase 4 builds none. The only executable change here is the design validator.
- **Where Unit boundaries fall.** `A-30` registers that as a sequencing choice; this spec designs the
  crossing, not the boundaries.

---

## 10. Divergences for the gate

Put individually, so none is carried by another's assent — the stronger form `LDB-04` used, rather than
`LDB-09`'s together-ruling.

1. **The `RC-03` clause-2 reversal** (§6). An approved, evidence-backed decision is knowingly
   overridden inside one session shape.
2. **`LDB-05` D11's state change** (D15). Approved as deferred; becomes scheduled.
3. **The phase-5 exit condition rewording** (D3). It touches `P-1` and `P-3`, not only `P-5`, so it
   changes a criterion on a card that is not this one.
4. **`test` becoming an `Avoid` word** (D12), which edits an approved glossary entry.
5. **D13, D14 and D15 are [NEW HERE]** — worked out in this document rather than ruled at the grill.
6. **No new drift check** (§5), declined against a rule that could have been read as requiring one.

---

## 11. Further Notes

**On the founding convergence.** This card closes `A-30`'s gap and `P-5`'s gap with one mechanic. That
is convenient, and convenience is how `LDB-01` §5.4 and `LDB-02` both warned a design gets confirmed
without being tested. The Challenge is justified on `A-30` alone: the glossary promises learners a way
past a locked Unit and nothing delivers it. If `P-5` were dropped tomorrow the Challenge would still be
owed.

**On what phase 4 now costs.** This card was added to a phase that was one ruling from closing. The
owner made that call knowingly at the grill, on the ground that a mechanic caught before a gate is a
design and the same mechanic caught after it is a correction.

**The order from here.** `LDB-11` → its gate → `LDB-07` (which designs the screens for whatever
survives) → `LDB-08` reassembles with `A-30` and the Challenge in it → the phase-4 gate.
