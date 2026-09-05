# Interaction UX for the activity set — LDB-07
> **2026-09-05 partial supersession:** Add the distinct Practice table and allow discovery activities in regular lessons. This earlier navigation/session design is not the final UI contract for the revised product. Current replacement: `docs/superpowers/specs/2026-09-05-playful-learning-direction.md` §4. Prior approvals below remain history; unaffected correctness and evidence obligations retain their scope.
> **Status: APPROVED 2026-08-22** at the `user-approval` gate — all four divergences ruled
> individually, and the second approval criterion (D20's discharge table) met after the ruling, not
> before it. Landing evidence at §Gate. Produced by
> `/mattpocock-skills:grill-with-docs` on 2026-08-22, four rounds, frontier emptied, shared
> understanding confirmed by the owner before drafting.
>
> **What this decides:** how each of the eleven Activity types is operated; the interaction contract
> for six screens; the target WCAG conformance level and the input model; and the disposition of
> every obligation the five upstream specs handed to this card.
>
> **What it does not decide:** the visual system — colour, type, spacing, motion design, iconography,
> navigation chrome, onboarding, characters, sound. That is **phase 6 / L3** (`ROADMAP.md:84-90,
> :243-250`). It also decides nothing about which Activity types phase 5 builds (`LDB-08`), and
> nothing about mastery, the economy, session composition, or the taxonomy's membership — those are
> approved and this document is downstream of all of them.
>
> **Two glossary resolutions were landed during the grill, not at approval**, because
> `/domain-modeling` captures terms as they resolve: `CONTEXT.md` gained a **Debrief** entry and
> **Practice** was settled with **Free Learn** retired. `scripts/check-doc-drift.sh`: 8 checks, no
> drift, after the edit.

---

## Problem Statement

**From the learner's side.** Eleven Activity types exist on paper and none of them can be operated.
The taxonomy individuates a type by *shown × produced × withheld* and deliberately contains **no
widget at all** — that exclusion is stated in the JSON itself: *"Widget is not here at all - it is
LDB-07's."* So the product knows what every activity measures and nothing about what the learner
touches. A learner cannot sort a hand, paint a policy, name a rule, ask for help, claim a Skill they
already hold, or read what a session did to them, because none of those actions has a defined form.

**And the second problem, which is about this project rather than about a learner.** Six approved
specs have been routing obligations here for three weeks — *"every widget, control, layout, copy
string, animation and WCAG target — `LDB-07`"* — and nothing has arrived to receive them. Counted
positively rather than asserted as an absence, on 2026-08-22: **25 handoff items** across five specs'
`Handed forward` sections, **6 taxonomy parameters** carrying `"owner": "LDB-07"`, and **11 Activity
types** with no operation. The pile is now large enough that its own bookkeeping has failed once:
`LDB-04` D11 reassigned `policy-paint`'s `space` parameter to this card on 2026-08-03, and the
taxonomy JSON still read `"owner": "LDB-04"` **nineteen days later**, carrying a rationale that same
decision had explicitly declared void. Nothing in the repository could have noticed.

**And a third, which the WCAG half exists for.** `product-design-inputs.md` §8 requires this phase to
*"state a target conformance level"* before treating the ALR-036–041 requirement set as one normative
baseline, because it isn't one: it silently mixes Level A, AA and AAA criteria. That defect already
shipped once and was caught by a verification pass (`K-U4-016`), not by design.

## Solution

**One interaction contract, at the altitude phase 5 can build against and phase 6 can style.**

For each of the eleven Activity types: what is shown, what the learner manipulates, how a response is
committed, what comes back, and what is recorded. For six screens — the table, the path, the Debrief,
the player card, the Challenge, and Practice — a low-fidelity layout fixing what is present and in
what order. Exact copy **only** where an approved ruling constrains the words, and nowhere else.

**Four principles do most of the work**, because the handoffs cluster into four shapes rather than
twenty-five separate problems:

1. **Every session shape is named to the learner.** Three shapes, two table-states — the support
   affordance cannot tell them apart, so a name does it and feedback timing confirms it.
2. **Optional controls are split by evidence polarity.** Asking for help costs window eligibility;
   offering more of yourself adds credit. A learner must be able to tell those apart without reading
   anything. The rule card is neither — it is furniture.
3. **Everything shown about the learner is a fact about work done or evidence held** — never a
   judgement, never a rank, never a total. The Mastery indicator changes *kind* at the bar rather
   than filling to it.
4. **Honest negative states share one pattern:** state the fact, name what is available right now,
   never characterise the learner.

**And the accessibility target is stated rather than inherited:** **Level AA**, with two named
above-baseline commitments labelled voluntary.

## User Stories

1. As a learner, I want every activity to tell me what it wants from me before I touch it, so that I
   am never guessing at the interaction as well as the answer.
2. As a learner, I want to know which kind of session I am in, so that I am not surprised when the
   app stops correcting me.
3. As a learner, I want the strategy table to be there when the session offers it and absent when it
   does not, so that support is a property of the session rather than of the moment.
4. As a learner, I want to ask for the strategy table in plain words, so that looking something up is
   an honest act rather than a silent penalty.
5. As a learner, I want to be told that asking costs this hand its place in my window, so that the
   cost is never invisible.
6. As a learner, I want the rule card to be there whenever I want it at no cost, so that I am not
   made to memorise the furniture of the table.
7. As a learner, I want the four legal actions always visible, so that I am choosing from the action
   space rather than recalling it.
8. As a learner, I want to be able to hide my hand total, so that I can make the game harder on
   myself when I am ready.
9. As a learner, I want to name what kind of hand I am looking at when I feel like it, so that I get
   credit for a step I actually perform.
10. As a learner, I want that offer to be ignorable forever with no consequence, so that it never
    reads as the app asking permission to grade me.
11. As a learner, I want to operate every activity with a keyboard, so that a pointer is never
    required to play.
12. As a learner, I want nothing to require dragging, so that a motor impairment does not lock me out
    of an activity.
13. As a learner, I want targets big enough to hit, so that precision is not part of the difficulty.
14. As a learner, I want correctness, legality and selection told to me in words as well as colour, so
    that I do not need colour vision to play.
15. As a learner, I want the game to work at zoom and with my own text spacing, so that reading it is
    not a fight.
16. As a learner, I want motion to be something I can turn off, so that animation is never the price
    of playing.
17. As a learner, I want no activity to depend on speed, so that accuracy is what is being asked of
    me.
18. As a learner, I want to sort a batch of hands into pair, soft and hard quickly and physically, so
    that classification becomes reflex rather than recall.
19. As a learner, I want to paint where I would hit across the whole grid, so that I can see the
    strategy as a shape instead of a hundred and sixty-nine facts.
20. As a learner, I want that painting to count for nothing, so that a toy is allowed to be a toy.
21. As a learner, I want to put the steps of a procedure in order, so that I learn a sequence by
    performing it.
22. As a learner, I want to name what a group of hands has in common, so that I find the principle
    rather than being told it.
23. As a learner, I want to guess a number and be shown the true one, so that my intuition gets
    calibrated against something real.
24. As a learner, I want to assemble a rule and watch it run against real hands, so that I see exactly
    where my rule breaks.
25. As a learner, I want to be shown which rule differs between two tables after I answer, so that I
    learn the answer even though I am not being graded.
26. As a learner, I do not want a right-or-wrong verdict on that answer, so that guessing at it stays
    safe.
27. As a learner, I want to see my whole path including what I have not reached, so that I know what
    the product intends to teach me.
28. As a learner, I want to tell apart a Unit I walked from a Unit I cleared by Challenge, so that my
    own history is legible to me.
29. As a learner, I want a quiet way to say "I've got this" on anything ahead of me, so that the path
    is a suggestion and not a cage.
30. As a learner, I want the product's own invitation to look different from my own claim, so that an
    offer never reads as a demand.
31. As a learner, I want a Challenge to open with something playful, so that it does not feel like
    sitting an exam.
32. As a learner, I want the warm-up to be honest about whether it prepared me, so that I am not
    misled about what is coming.
33. As a learner, I want my Mastery progress shown as something countable, so that I can see the rule
    working rather than trust it.
34. As a learner, I want the indicator to look *different* once I am past the bar rather than merely
    full, so that I can tell a held thing from a nearly-full one.
35. As a learner, I want my count to be allowed to fall before I reach the bar, so that the number
    means something.
36. As a learner, I want my chips, my XP and my score kept as three separate facts, so that no single
    number stands for me.
37. As a learner, I do not want those three numbers following me into a hand, so that playing is not
    performed in front of a scoreboard.
38. As a learner, I want my Table stack visible while I am betting it, so that I know what I am
    playing with.
39. As a learner, I want the Debrief to put what I decided above what I won, so that the product's
    priorities are visible in its own summary.
40. As a learner, I want every decision that diverged shown with the actual cards, so that a Debrief
    teaches rather than scores.
41. As a learner, I want one closing surface rather than two, so that I am not made to read my session
    twice under different names.
42. As a learner, I want "nothing is due" to feel like an open door, so that finishing the queue is
    not mistaken for finishing the product.
43. As a learner whose wallet cannot cover a seat, I want to be told plainly and shown the way back,
    so that a setback is not dressed as a failure.
44. As a learner, I never want to be told I failed anything, so that the product stays a trainer.
45. As a learner, I want the words the app uses to be the same words everywhere, so that I am learning
    one vocabulary rather than two.
46. As the product owner, I want every obligation handed to this card given a disposition in writing,
    so that no ruling quietly evaporates the way `A-30` and `space` both did.
47. As the product owner, I want a script to fail when a type or parameter arrives without one, so
    that the discharge is enforced rather than asserted.
48. As the product owner, I want the WCAG target stated with each criterion's level read first-hand,
    so that no AAA criterion is ever again presented inside an AA baseline.
49. As the product owner, I want above-baseline commitments labelled voluntary, so that a conformance
    claim is never overstated.
50. As the product owner, I want the `space` reassignment finally executed in the taxonomy, so that
    this card does not repeat the failure it was the victim of.
51. As the product owner, I want each declined mechanic to name what carries its motivation instead,
    so that the removal rule fires on the card it was written for.

## Implementation Decisions

Every decision carries an evidence label, per `AGENTS.md`. Where a decision merely records an owner
ruling taken at the grill, it says so and does not re-argue it.

### D1. The artifact is contracts for all eleven types, layout for six screens, copy only where bound

Operation contracts for **all eleven** Activity types; low-fidelity layout for the **six** screens
that carry binding handoffs; exact copy strings **only** at the moments an approved ruling constrains
the wording, and nowhere else.

The last clause is not a style preference. At least six handoffs are about the *words*: no "failed"
language anywhere; *"nothing is due"* must not read as an ending; the empty wallet must not acquire
recouping framing; the Recommender order must be stated in one sentence that is not a queue; the
Classification control must not read as the app asking permission to grade you; a published count
must not read as a grade. A handoff that says *"must not read as X"* is discharged only by writing
the sentence that does not read as X. Full copy for eleven types is phase-6 work and would rot.

`[Product judgement]`

### D2. Scope does not narrow to the phase-5 slice

Every one of the eleven types gets a contract, whether or not phase 5 builds it. Narrowing to the
slice would make this card depend on `LDB-08`, which is its **sibling** — both unblocked by `LDB-06`,
neither gating the other — and would invert a dependency the board spent a correction getting right
on 2026-08-17. Layout, by contrast, is spent only where a ruling demands it.

`[Product judgement]`

### D3. Target Level AA, with two named voluntary commitments

**The levels below were reopened first-hand at `https://www.w3.org/TR/WCAG22/` on 2026-08-22**, as
the card's own WARNING requires — the AA-plus-two framing existed only in the evidence index and in
no archive record, so it was re-derived rather than inherited.

| Criterion | Level |
|---|---|
| 1.3.1 Info and Relationships | **A** |
| 1.3.2 Meaningful Sequence | **A** |
| 1.4.1 Use of Color | **A** |
| 2.1.1 Keyboard | **A** |
| 2.2.1 Timing Adjustable | **A** |
| 2.2.2 Pause, Stop, Hide | **A** |
| 3.2.6 Consistent Help | **A** |
| 3.3.1 Error Identification | **A** |
| 4.1.2 Name, Role, Value | **A** |
| 1.4.10 Reflow | **AA** |
| 1.4.12 Text Spacing | **AA** |
| 2.4.11 Focus Not Obscured (Minimum) | **AA** |
| 2.5.7 Dragging Movements | **AA** |
| 2.5.8 Target Size (Minimum) | **AA** |
| 3.2.4 Consistent Identification | **AA** |
| 3.3.3 Error Suggestion | **AA** |
| 4.1.3 Status Messages | **AA** |
| 2.3.3 Animation from Interactions | **AAA** |
| 3.1.5 Reading Level | **AAA** |

**Seven criteria were added to this table at the gate, on 2026-08-22.** The twelve above them were
reopened when this card was drafted; the seven are the ones the requirement mapping below turned out
to need and the drafted table did not carry — `ALR-036` had **no** criterion in it at all. Each of the
seven was read on **its own** `Understanding` page rather than from a whole-document retrieval,
because the whole-document retrieval returned **`4.1.2` at Level AA**, which its own criterion page
contradicts verbatim with **`(Level A)`**. That is the same criterion whose level the phase-2
verification pass could not confirm either (`V-U4.md:223-227`), so it has now defeated two retrievals
and is recorded here as resolved first-hand rather than left to a third.

#### The requirement mapping

Every accessibility requirement this phase adopted, against the criteria it rests on. **Levels are
this table's, not the requirement's** — that conflation is what `K-U4-016` caught.

| ALR | Rests on | Highest level | Status against the target |
|---|---|---|---|
| ALR-036 — programmatic name, role, value, meaningful order | 4.1.2 (A), 1.3.2 (A) | A | within baseline |
| ALR-037 — keyboard-operable, single-pointer alternative to dragging, target size | 2.1.1 (A), 2.5.7 (AA), 2.5.8 (AA), 2.4.11 (AA) | AA | within baseline |
| ALR-038 — non-colour cues for correctness, selection, legality, progress, errors | 1.4.1 (A), 1.3.1 (A), 4.1.3 (AA) | AA | within baseline |
| ALR-039 — concise instructions, consistent labels, predictable help, recoverable errors | 3.2.6 (A), 3.3.1 (A), 3.2.4 (AA), 3.3.3 (AA); the **concision** element has no normative anchor at any level, 3.1.5 (AAA) being about reading level instead | AA, plus one element with no anchor | **voluntary, above baseline** — the concision element only; claimed as conformance nowhere |
| ALR-040 — no essential animation or time pressure; zoom, reflow, text spacing, reduced motion | 2.2.1 (A), 2.2.2 (A), 1.4.10 (AA), 1.4.12 (AA), 2.3.3 (AAA) | AAA via the reduced-motion element | **voluntary, above baseline** — the reduced-motion element only; the rest is within baseline |
| ALR-041 — scoped accessibility checks and learning-integrity playtests in each feature QA | a process requirement; **no success criterion** in WCAG 2.2 | n/a | n/a — discharged by `docs/specs/qa-playtest-process.md`, not by conformance |

**`ALR-041` is the one requirement with no criterion, and `ALR-039`/`ALR-040` are the only two
carrying an above-baseline element.** Check 13 asserts exactly that shape, so a future requirement
quietly promoted above AA fails the run.

**The target is Level AA.** Two requirements sit above it and are labelled **voluntary
above-baseline commitments**:

- **Reduced motion.** SC 2.3.3 is **AAA**, and it is the *only* criterion in WCAG 2.2 covering a
  reduced-motion preference. **SC 2.2.2 (A) does not rescue it** — checked rather than assumed: 2.2.2
  governs moving content the page itself starts, not honouring a user preference. Committed to anyway;
  the core loop is dealt cards in motion and `prefers-reduced-motion` is nearly free.
- **Concise language.** ALR-039's concision element has **no normative anchor at any level**. 3.1.5
  Reading Level is AAA and is about reading level, not concision. Committed to as product practice,
  claimed as conformance nowhere.

**Level AAA is not reachable and is not claimed.** 3.1.5 alone would bind every prose string in a
product that teaches probability.

`[Evidence-backed]` on every level, reopened 2026-08-22. `[Product judgement]` on the target and on
the two commitments.

### D4. Pointer-first, keyboard-complete, and nothing is drag-only

Every operation in every type must be completable with a keyboard, and every drag must have a
select-then-place equivalent. Targets meet 2.5.8.

This is not a stylistic preference, and stating it now rather than in phase 6 is the whole point: it
binds hardest on `hand-sort` (sorting hands into buckets), the frontier brush (D12), and
`procedure-order` (reordering steps), all three of which have drag as their natural form. Under D3,
**2.1.1 is Level A and 2.5.7 is Level AA**, so a drag-only or pointer-only operation fails the
baseline this document commits to. Naming it before phase 5 builds costs nothing; discovering it
after costs a rebuild of the three most tactile activities in the catalog.

Responsive presentation now belongs to the first experience; mobile delivery remains need-activated (`ROADMAP.md`, delivery map; superseded September 5). This decision is about
*modalities the contract must support*, not about which devices v1 ships on.

`[Evidence-backed]` on the criterion levels. `[Product judgement]` on stating it at this altitude.

### D5. Practice is the name; Free Learn is retired

*Free Play* and *Free Learn* were one word apart and named opposite modes. **Practice** is confirmed
as the always-available learning mode over already-covered material; **Free Learn** is retired and
survives only as a term to avoid. *Free Play* is untouched.

**Landed in `CONTEXT.md` during the grill**, not deferred to approval.

`[Product judgement]` — owner ruling, 2026-08-22.

### D6. Every session shape is named to the learner

`LDB-06` handed this over framed as *"D10 makes the presence or absence of the strategy table the
only difference the learner sees."* **That framing was outgrown three days later and the arithmetic
is what settles it.** `LDB-11` D16 introduced a third shape, so the model now holds **three** shapes
and **two** table-states, and **two of the three shapes have no table**: a Closing run in a Learning
session *"does not offer it"*, and a Proving run has it *"not offered"*. A binary affordance cannot
distinguish three things. Leaving the difference implicit is not a risk to weigh; it is impossible.

**The ruling.** The shape is **named at entry and stays named** while the learner is in it. Feedback
timing is the confirming structural cue and needs no design — it already differs (`immediate` in a
Coached session, `deferred-to-debrief` in both others). The Closing/Proving pair share both
table-state *and* feedback timing, so for that pair the name is the only thing doing the work.

**This does not touch `LDB-06` D10.** D10 forbids the app *withdrawing* a resource; a label withdraws
nothing.

`[Evidence-backed]` on the three-shapes-two-states arithmetic. `[Product judgement]` on naming as the
remedy.

### D7. Optional controls split by evidence polarity; the rule card is not a control

Four controls arrived here looking alike. They are not alike, and the difference is what they do to
evidence.

| Control | Polarity | Evidence effect |
|---|---|---|
| *"I'm not sure — show me"* (`LDB-04` D4) | **Costs** | Keeps the Presentation out of the Mastery window |
| Optional Classification capture (`LDB-06` D2 div 5) | **Adds** | Buys credit on four more Skills |
| In-situ `state-report` capture (`LDB-09` D7) | **Adds** | Produces a graded element; rides D2's opt-in field |
| The rule card (`LDB-06` D10) | **Neither** | Explicitly costs nothing |

**Two control patterns, one for each polarity, and the rule card is demoted out of the control set
entirely** — it is always-present furniture. At a real table the rule card is *"public and printed on
the felt"*; presenting it as a control implies a cost D10 rules it does not have.

**Why not one flattened pattern.** `LDB-04` D4's core ruling is that the cost *"must be an offered,
labelled action… not a silent reclassification"*, because *"a learner whose progress stalls for an
invisible reason is confused, and confusion is a design failure."* A single pattern that renders
"this costs you" and "this earns you" identically re-creates exactly that invisibility.

**The adding pattern carries one further constraint**, inherited verbatim: it must not read as the app
asking permission to grade you, and must be *"skippable without a second thought — a learner who
ignores it forever loses nothing they had."*

`[Evidence-backed]` on the polarities. `[Product judgement]` on two patterns rather than one or four.

### D8. One progress-display principle, and a change of kind at the bar

**The principle.** Everything the product displays about the learner is either a fact about **work
done** or a fact about **evidence held**. Never a judgement, never a rank, never a total. This covers
all four progress handoffs at once: the published Mastery count, the pre/post asymmetry, the three
meters, and the published Recommender order.

**The grammar for the asymmetry.** `LDB-04` D10 handed over: *"the pre-mastery indicator can move
backwards; the post-mastery state cannot."* Below the bar the count is a **countable, reversible
tally** — discrete marks that light and unlight, so 7/10 → 5/10 is visible and honest. At the bar it
**changes kind**: it becomes a held state, not a full tally.

**Why a change of kind rather than a fill level.** A bar that fills to 100% and then stops moving is
visually indistinguishable from one that could still empty. The ratchet — the single most important
thing `LDB-04` D2 bought the learner — would be invisible at exactly the moment it starts protecting
them. A change of kind also does the second job for free: a discrete held state does not read as a
grade, which is what D10 asked for.

**The Recommender order** is stated in one sentence as a steer, not a queue: Mastery locks nothing
(`LDB-04` D9), so the order describes what the product would pick next, not what the learner must do.

`[Product judgement]`

### D9. One closing surface: the Debrief

`LDB-05` D12 handed over *"the session summary's ordering"*; `LDB-06` D16 defined *"the debrief"* and
its four contents. **These are one surface under two names**, and D16 content 4 proves it: *"the Table
stack result as one plain fact — and only in a Table sitting"* means the Debrief already spans
Learning sessions and Table sittings, which is the entire scope a separate summary would have had.

A glossary finding made during the grill: **`CONTEXT.md` had no `Debrief` entry at all**, while three
entries leaned on the word — `Learning session`, `Closing run`, `Proving run`. A term load-bearing in
three definitions and defined in none is where this repository's drift starts.

**Ruled: one surface, named Debrief. "Session summary" is retired to `_Avoid_`.** The entry was
written into `CONTEXT.md` during the grill.

Contents are `LDB-06` D16's, unchanged. Ordering is `LDB-05` D12's, unchanged: **decision quality
above profit and loss**, with the bankroll result as one plain fact.

`[Product judgement]` on the unification. `[Evidence-backed]` on the two-names-one-scope finding.

### D10. Warm-ups always run; generic where nothing rehearses the target

`LDB-11` D17 explicitly licensed this card to skip the warm-up *"where nothing rehearses the target"*.
**Recomputed from `2026-08-01-activity-taxonomy.json` on 2026-08-22**, not carried over: the five
Unmeasured types rehearse exactly six Skills — `classify-hand`, `variance-expectation`, `dealer-info`,
`strategy-action`, `outcomes`, `read-rule-card`. **Of the 17 gated Skills, 5 are rehearsed and 12 are
not.**

**The licence is declined.** A warm-up always runs. Where nothing rehearses the target it is
deliberately **generic** and the copy does not pretend otherwise.

**Why.** User story 9 of `LDB-11` asks that a Challenge *"start with something playful, so that it
does not feel like sitting an exam."* That is ceremony, and ceremony does not need to be targeted to
work. Skipping it would make **12 of 17** Challenges open cold on unaided dealt hands with no strategy
table — which is precisely the feel that user story rejects, applied to the majority case.

**The honesty constraint is on the copy, not the mechanic.** A generic warm-up must not imply it
prepared the learner for the target.

**Removal rule, discharged:** nothing is removed, so nothing needs to carry it.

`[Evidence-backed]` on the 5-of-17 count, recomputed. `[Product judgement]` on declining the licence.

### D11. One pattern for honest negative states

Three states arrived from three different cards carrying the same three-part ruling:

| State | Its binding rule |
|---|---|
| Wallet below the lowest tier's minimum buy-in | *"a real setback"*; refill only by learning; *"no timer, no regeneration, no top-up, no purchase, ever"*; no recouping framing |
| The Recommender's bands are empty | *"nothing is due — play because you want to"*; must not read as an ending |
| A Challenge not cleared | Nothing taken away; retry immediately; *"no 'failed' language anywhere"* |

**One pattern: state the fact plainly, name something available right now, never characterise the
learner.** This is a pattern discovered rather than imposed — three cards independently arrived at
the same shape.

**Removal rule, discharged for the cluster:** each state names what carries the motivation in place
of the mechanic that was withheld. Empty wallet → the curriculum itself pays on `Completion`, and
Practice is available over covered material. Nothing due → Practice and Free Play, both open, stated
as an invitation. Challenge not cleared → immediate retry, and the Debrief's replay, which teaches
whether or not the Challenge cleared.

`[Product judgement]`

### D12. `policy-paint` ships `presented-grid`; the frontier brush ships ungraded

**`space` is ruled `presented-grid` for v1.** The `withheld` setting — *"withheld entirely so the
learner must generate the region too"* — is deferred.

**U2-3's frontier brush is adopted as an ungraded play object.** It measures nothing, enters no
window, and makes no claim.

**Why ungraded rather than dropped, and why not graded.** `A-21`'s evidence column reads **"None
held"** at confidence **Low**: the sourced pattern has the learner trace a *displayed* glyph, and the
blank-grid version is *"this project's own extension"*. Shipping it **graded** would spend full build
cost on an unevidenced measurement, and `policy-paint` is `secondaryFor: ["strategy-action"]` with
`primaryFor: []` — it never produces primary evidence, so there is nothing the product needs from
grading it. Shipping it **ungraded** costs `A-21` nothing, because an activity that makes no
measurement claim cannot be wrong about one. Dropping it entirely would have removed *"good to play —
tactile, and matches how the strategy is actually held, as a shape rather than 169 facts"*, which is
the single most distinctive interaction in the catalog, from a design that has declined mechanics
across eleven cards.

**Precedent:** this is the move `LDB-09` made when it admitted five ungraded types purely for play
value.

**Removal rule:** nothing is removed, so nothing needs to carry it. `A-21` stays unspent.

Under D4 the brush needs a non-drag equivalent: **cell tap-to-toggle**, with the painted region also
settable by keyboard.

`[Evidence-backed]` on `A-21`'s status and on `policy-paint`'s evidence role. `[Product judgement]` on
ungraded adoption.

### D13. The path's interaction contract is this card's; the shell is phase 6

**A scope conflict between two approved specs, resolved rather than ignored.** `LDB-09` §Out of Scope
reads *"**The shell** — path, map, daily goal, return ritual, characters, sound. L3, owed to phase
6."* `LDB-11` §9 sends *"how the path renders"* here, and its user stories 1, 26 and 31 require a path
to exist at all.

**The seam is D1's fidelity line.** This card fixes the path's **interaction contract**; phase 6 builds
the shell.

This card owes, and phase 6 does not decide:

- **Four Unit states** — *not reached*, *current*, *cleared by walking*, *cleared by Challenge*. The
  last two must be distinguishable, because `LDB-11` user story 26 asks to arrive at a new Unit with
  skipped Units *"marked as cleared"* and the learner's own history has to stay legible.
- **Every Unit is inspectable ahead of the learner** (user story 1).
- **The request control is reachable from any Unit or any Skill** (user stories 2 and 8).
- **A product-offered Challenge is visibly distinct from a learner-requested one** (user story 31).

**Why the third option was not available.** Deferring the path wholesale to phase 6 would strand
`A-30` — the owner decision of 2026-08-17 that `LDB-11` exists to execute — in exactly the drawer it
was just pulled out of.

`[Product judgement]`

### D14. The Challenge affordance is quiet and on every Unit ahead

Every Unit the learner has not reached carries a small, quiet **"I've got this"**. The product's own
invitation (user story 30) arrives as a visibly different, louder element, so that an offer never
reads as a demand (user story 31).

**Why not offer-only.** If the control exists only where the product offers it, user story 2 —
*"point at a Unit ahead of me and say I already know it"* — is satisfied only inside a menu nobody
opens, and `A-30` becomes undiscoverable in practice while appearing implemented.

**Why not one skip-ahead entry point.** It works, and it makes skipping feel like an administrative
action rather than a claim. The whole framing of `LDB-11` is that the learner makes a claim and the
product takes it seriously.

`[Product judgement]`

### D15. The player card is a place you go; the Table stack is not

`LDB-05` D7 fixes **three meters, side by side, never summed** — Chips, XP, Player score — and does
not say where they live. **They live on one surface the learner opens deliberately. No meter appears
in persistent chrome.**

**One carve-out: the Table stack is always visible while the learner is betting it**, because it is
game state rather than progress display. The glossary already separates the two — a Table stack is
*"the chips a learner has brought to one Free Play session, session-scoped and settled by real play"*,
which is distinct from the Wallet.

**Why not persistent chrome.** A number that cannot be looked away from becomes a standing whether or
not it is a total, which is what D8's principle exists to prevent. `LDB-05` D7's own requirement that
*"bankroll and learning score stay visually distinct"* is satisfied on the card; it does not require
either to be omnipresent.

**Why not surface-on-change.** Genuinely attractive — the motion *is* the feedback — but it makes XP
the loudest recurring event in the product, and under D3's voluntary reduced-motion commitment every
such surfacing needs a non-animated equivalent that would be a persistent meter by another name.

`[Product judgement]`

### D16. The glossary's words are the learner's words

`CONTEXT.md`'s terms are used verbatim in learner-facing copy: **Coached session**, **Closing run**,
**Proving run**, **Practice**, **Free Play**, **Challenge**, **Table sitting**, **Debrief**.

**No second, learner-facing vocabulary is created.** Two vocabularies for one set of concepts is the
drift D9 just found between "debrief" and "session summary", and this repository has an entire
evidence rule about that failure class.

**The discipline that follows:** if a term is wrong for a learner, **the glossary entry changes**. A
synonym is never added beside it.

`[Product judgement]`

### D17. `rule-contrast` reveals the differing rule without grading the answer

**A contradiction found during the grill, between two approved documents.** `rule-contrast` is
`legalIn: ["coached-session"]`, and `LDB-06` D9 gives a Coached session `feedbackTiming: immediate`.
But its `verdictSurfaced` parameter is `[false]` — *"recorded, never shown as pass/fail"*. In the one
shape where everything is corrected instantly, this activity alone would say nothing back at all.
Under `LDB-04`'s constraint 1, silence with no visible reason is a design failure.

**The ruling: reveal without verdict.** After the learner answers, the product shows **which rule
actually differs and what it does**. It never shows whether the learner's answer was right.

**Why this is the evidenced resolution rather than a compromise.** The type's own source note records
U3-4's construct as invention: *"the students in the inventing condition did not generate a correct
standardizing procedure during instruction, yet they were more prepared to learn the procedure."* The
effect comes from having **attempted before being told**, not from never being told. Revealing the
rule preserves the construct; surfacing a verdict is what `U1-5`'s licence forbids, and it stays
forbidden. The grade continues to be **recorded**.

**`probe` ships `which-rule-differs` only.** `which-rule-would-flip-this` — `LDB-09` D3's inversion —
is deferred: it is a second activity's build for the same Skill.

`[Evidence-backed]` on the collision and on the invention construct. `[Product judgement]` on deferring
the inversion.

### D18. `totalsDisclosure` is a learner-operated toggle

`LDB-09` D6 created `totalsDisclosure: ["totals-shown", "totals-hidden"]` as a Condition; the control
is this card's. **The learner operates it at the table**, and the setting is recorded per attempt like
any Condition. It sits under D7's **help-seeking** pattern — the same object as *"I'm not sure — show
me"*: an offered, labelled action whose use is recorded.

**Why not derived from the session shape.** Shown-in-Coached / hidden-in-the-others is tidy and
re-creates precisely what `LDB-06` D10 forbids — a resource that changes because the app decided,
which D10 calls *"confusing by construction"*.

**Why not a session parameter.** It is a real difficulty lever; putting it behind a composition screen
the learner never sees removes their ability to make the game harder on themselves (user story 8).

`[Product judgement]`

### D19. The operation contracts

Eleven contracts, at D1's altitude. Each states what is shown, what the learner manipulates, how a
response is committed, what returns, and what is recorded. **Three bindings from upstream apply to all
of them** and are inherited, not decided here:

- **From `LDB-01`:** an undealt prompt may name a hand shape but may **never** render cards that did
  not come from a shoe; and a shape-named prompt supplies the Classification for free, so it may only
  operate Skills flagged `classificationIncluded: false`.
- **From `LDB-03`:** showing the four legal actions is **not** assistance — a real table enumerates
  the action space too — so the action bar is not a hint and must not sit on any fading ladder. Any
  tile, bank or pool UI is governed by the supplied-pool rule: cosmetic when it discloses any part of
  what is being measured, substantive when the measured target is not in it.
- **From D4:** keyboard-complete, nothing drag-only, targets meeting 2.5.8.

| Type | Manipulated | Committed by | Returns |
|---|---|---|---|
| `deal-and-decide` | The action bar (four legal actions, always shown); optionally the Classification control (D7, adding) and the totals toggle (D18) | Choosing an action | Per `feedbackTiming`: immediately in a Coached session, at the Debrief otherwise |
| `state-report` | A value entry sized to the quantity asked for; the in-situ capture control where it rides a live hand (D7, adding) | Submitting the value | Per `feedbackTiming` |
| `policy-paint` | A presented grid of Decision situations; an action assigned to every situation in the region | Submitting the completed policy — never per cell, because per-cell submission *"destroys the measurement"* | The correct policy against theirs |
| `rule-card-read` | Four named table properties, each chosen from its own option set; the rule card is furniture and always reachable at no cost | Submitting all four | Per `feedbackTiming` |
| `predict-then-reveal` | One frequency on a continuum, before the hands are played | Committing the prediction | The hands play out; the signed prediction error appears at the Debrief |
| `rule-contrast` | Two rulesets side by side; the differing rule named from the table's rule set | Naming the rule | **The differing rule, revealed; never a verdict** (D17) |
| `hand-sort` | A batch of dealt hands, all at once, into pair / soft / hard | Placing the last hand | Nothing graded; ungraded by construction |
| `estimate-and-check` | One number on a continuum | Committing the estimate | The true value, which already exists and is computable |
| `procedure-order` | Scrambled steps of a fixed procedure, possibly with distractors to leave unused | Submitting the order | The correct order |
| `principle-name` | A group of Decision situations that share an action; the shared action named | Naming the action | The shared action and why they are alike |
| `rule-battery` | Fixed parts assembled into a policy rule, then run against generated hands | Running the assembled rule | The cells where the rule breaks |

Every drag-shaped operation above — `hand-sort`'s partition, `procedure-order`'s reordering,
`policy-paint`'s region, the frontier brush — carries a select-then-place equivalent under D4.

`[Product judgement]` on each contract; `[Evidence-backed]` on the three inherited bindings.

### D20. The card gains a second approval criterion: the discharge table

The card's current bar checks **only the WCAG half** — *"a target conformance level is stated, every
requirement is mapped to a criterion whose level was read first-hand, and above-baseline commitments
are labelled voluntary."* Nothing in it makes the operation half checkable, so this card could be
approved with every handoff untouched.

**Added:** the spec carries a **discharge table** (§Discharge), one row per obligation, cited by file,
each marked *answered* / *declined, with what carries it instead* / *forwarded, by name* — and **check
12** enforces its completeness mechanically.

**Why a table and a check rather than a prose clause.** A prose requirement that handoffs "be
addressed" passes silently on a missing row, which is this repository's documented absence-as-proof
defect, shipped four times. `LDB-09` set the standard: *"enforcement not assertion — a check earns its
place only if the design could drift into failing it."*

**This changes a card's approval criterion at a `user-approval` gate**, and is therefore an owner
ruling, taken 2026-08-22.

`[Product judgement]`

### D21. The `space` correction lands with this spec

`LDB-04` D11 was approved carrying the divergence *"`space`'s owner moves from LDB-04 to LDB-07"*,
recorded at `2026-08-03-evidence-and-mastery-rules.md:445` and `:714`, and the same decision declared
the parameter's JSON rationale **void**. `2026-08-01-activity-taxonomy.json` still carries
`"owner": "LDB-04"` and the voided note, **nineteen days later**. Found by hand on 2026-08-22 while
counting owned parameters for the discharge table; nothing in the repository could have found it.

**Both halves are corrected here:** `owner` becomes `LDB-07`, and the voided note is replaced with
D12's ruling. The `owner: "LDB-07"` parameter count moves **6 → 7**.

This is the repository's founding failure class — *corrections do not execute themselves* — landing on
the card that inherited the correction. It is also **the documented failure that earns check 12**, per
`AGENTS.md`'s bar of *"a documented failure or a measured retrofit cost; never just in case."*

`[Evidence-backed]`

## Testing Decisions

**What makes a good test here.** Phase 4 builds no product code, so every test in scope is a **design
validator**: a script that reads the approved design artifacts and fails when they contradict each
other or when an obligation goes undischarged. It tests external behaviour of the *design* — what the
artifacts say — never how a check is implemented. The bar is `LDB-09`'s: *enforcement not assertion*.
A check that could only ever pass is worse than none, because it certifies.

**Seams — zero new ones.**

- **`scripts/check-ldb03-taxonomy.js`, 11 checks → 13.** It already reads
  `2026-08-01-activity-taxonomy.json` and already reports `N passed, M failed`. Prior art is direct
  and repeated: `LDB-09` took it 6 → 8 and `LDB-11` took it 8 → 11, both for this reason — the
  design's enforcement stays in one place. Verified green at 11/11 on 2026-08-22 before extension.
- **`scripts/check-doc-drift.sh` gains nothing.** Declined for `LDB-11`'s reason: no pair covered by
  this spec has drifted, and check 12 covers the failure class that actually did. Verified green at
  8/8 on 2026-08-22.
- **Rendering is not a seam** — phase 6 owns the visual system, and this document owns no pixels.

**Check 12 — discharge completeness.** Three clauses against §Discharge: every `activityTypes` id has
an operation-contract row; every parameter carrying `owner: "LDB-07"` has a disposition row; every
"To `LDB-07`" handoff item has a disposition row. **It fails the moment a type or an owned parameter
is added without a disposition** — which is exactly what happened to `space` and went unnoticed for
nineteen days (D21).

**Check 13 — WCAG mapping integrity.** Against §D3's table and the ALR mapping: every requirement in
ALR-036–041 appears; **exactly one** is marked *no success criterion* (ALR-041); **exactly two** are
marked *voluntary, above baseline* (ALR-040's reduced-motion element, ALR-039's concision element).
Earned by a documented failure: `K-U4-016` found ALR-040 presenting an AAA criterion inside what read
as an AA baseline, caught by a verification pass rather than by design.

**What is deliberately not tested.** Nothing asserts that a contract is *good*, only that it exists
and is dispositioned. Whether an interaction works is a **feature QA playtest** question under
`docs/specs/qa-playtest-process.md`, in phase 5, against built code.

## Out of Scope

- **The visual system.** Colour, type, spacing, motion design, iconography, navigation chrome,
  onboarding, characters, sound, responsive layout, mobile delivery — phase 6 / L3.
- **Which Activity types phase 5 builds**, and the phase-5 slice — `LDB-08`.
- **Mastery, the economy, session composition, and the taxonomy's membership** — approved upstream and
  untouched here.
- **Product code.** Phase 4 builds none. The only executable changes are the two design validators and
  the `space` correction.
- **`policy-paint`'s `withheld` setting** and `rule-contrast`'s `which-rule-would-flip-this` probe —
  deferred by D12 and D17, not rejected.
- **Where Unit boundaries fall**, and the Recommender's banding — `A-30` and `LDB-06` D14 respectively.
- **A conformance audit.** D3 states a target; it does not claim the product currently meets it.
- **Copy beyond the bound moments.** D1 fixes the boundary deliberately.

## Further Notes

**Two conflicts between approved documents were found during the grill and are resolved rather than
worked around.** D6 (three shapes, two table-states) and D17 (`verdictSurfaced: false` inside an
`immediate` shape). Both were latent: each arose when a later approved card changed a premise an
earlier one had reasoned from, and neither would have been caught by any existing check. They are
recorded here in full because the resolution is cheap and the rediscovery is not.

**One unlanded correction was found and is repaired** — D21's `space`. It is named in the divergences
below because it edits an approved artifact.

**On the removal rule.** `LDB-06` D8 warned that *"when `LDB-07` declines a motivational mechanic — and
an interaction card will — it names what carries that motivation instead."* This card declines less
than expected: D10 declines a licence to *remove* warm-ups and keeps them; D12 keeps the brush by
making it ungraded. The rule is discharged explicitly at D10, D11 and D12 rather than left to be
inferred.

### Divergences for the gate

Put individually, so none is carried by another's assent. **All four were ruled approved by the
owner on 2026-08-22**, each answered on its own.

1. **The card's approval criterion gains a second half** (D20). Changes a `user-approval` gate's bar.
2. **`LDB-11` D17's licence is declined** (D10). The licence was granted to this card and is being
   handed back unused, with the 5-of-17 measurement stated.
3. **`2026-08-01-activity-taxonomy.json` is edited** (D21) — `space`'s `owner` and note. An approved
   artifact changes; the change executes a decision approved on 2026-08-03 rather than making a new
   one.
4. **`LDB-09`'s "path is phase 6" scope line is narrowed** (D13). The shell stays phase 6; the path's
   interaction contract moves here, because `LDB-11` needs it and `LDB-11` is the later approval.

### Register rows this owes

Filed at approval, not before — the convention `LDB-04` §16 set.

**Filed 2026-08-22 at the gate, and verified present in the target file by grep after writing** — not
merely approved. `registerDelta.netNewRows` moves 6 → 9 and check 6's expected list moves with it.

| Row | Assumption | Validation method |
|---|---|---|
| **`A-33`** *(filed)* | Naming the session shape is sufficient for a learner to tell a Closing run from a Proving run, given they share table-state and feedback timing. | Playtesting — ask learners mid-session which shape they are in, in both shapes. |
| **`A-34`** *(filed)* | A change of *kind* at the Mastery bar reads as "held" rather than as "full", where a filled bar would not. | Playtesting — show both grammars and ask whether the count can still fall. |
| **`A-35`** *(filed)* | Revealing the differing rule without a verdict preserves U3-4's invention effect rather than collapsing it into being told. | Playtesting against a verdict-surfaced arm; nearest precedent is `A-22`, whose evidence is *"None held"*. |
| **`A-21`, unchanged** | Not spent by D12 — the brush ships ungraded and makes no measurement claim. | Unchanged; stays under `registerDelta.cited`, never `new`, so a later reader does not think D12 spent it. |

### Discharge

The table `check 12` reads. One row per obligation: **25** handoff items across five specs, **7**
`owner: "LDB-07"` parameters after D21, and **11** operation contracts. Each row carries
**answered** / **declined, with what carries it instead** / **forwarded, by name**.

The 25 were enumerated by hand on 2026-08-22 by reading each source's own handoff section, not by
trusting any count written about them: `LDB-04` 4, `LDB-05` 4, `LDB-06` 7 live, `LDB-09` 4, `LDB-11` 6.
`LDB-06` handed over an eighth — the up-only streak's rendering — which its own text retired on
2026-08-17 with *"Nothing is owed to `LDB-07` on this now"*; it is excluded from the 25 and named here
so a later reader does not count it as missing.

#### Handoffs

| # | Obligation | Source | Disposition |
|---|---|---|---|
| H1 | `policy-paint`'s `space` | `LDB-04` D11 §13 | **answered** — D12 rules `presented-grid`; D21 lands the owner correction |
| H2 | How a published Mastery count renders without reading as a grade | `LDB-04` D10 §13 | **answered** — D8: a fact about evidence held, never a judgement |
| H3 | The *"I'm not sure — show me"* control | `LDB-04` D4 §13 | **answered** — D7's costs-polarity pattern |
| H4 | The asymmetry — the pre-mastery indicator may move backwards, the post-mastery state may not | `LDB-04` D10 §13 | **answered** — D8's change of kind at the bar |
| H5 | How the player card renders three meters so they do not read as one number | `LDB-05` D7 §13 | **answered** — D8 (never summed, never a total) and D15 (one surface, no persistent chrome) |
| H6 | The empty-wallet state | `LDB-05` D3, D12 §13 | **answered** — D11's honest-negative-state pattern |
| H7 | The session summary's ordering — decision quality above profit and loss | `LDB-05` D12 §13 | **answered** — D9: one surface, the Debrief; ordering unchanged |
| H8 | The *Free Play* / *Free Learn* naming collision | `LDB-05` §15 §13 | **answered** — D5: **Practice**; Free Learn retired |
| H9 | How a Coached session and a Closing run are told apart at a glance | `LDB-06` D10 §13 | **answered** — D6: the shape is named at entry and stays named |
| H10 | How the published Recommender order is stated without reading as a queue | `LDB-06` D14 §13 | **answered** — D8: one sentence, a steer not a gate |
| H11 | The debrief's ordering | `LDB-06` D16 §13 | **answered** — D9 |
| H12 | The *"nothing is due"* session goal, which must not read as an ending | `LDB-06` D8 §13 | **answered** — D11 |
| H13 | The naming collision, with D13 making Practice's scope concrete | `LDB-06` D13 §13 | **answered** — D5 (same ruling as H8; recorded separately because it was handed over twice) |
| H14 | The optional Classification control at the table | `LDB-06` D2 div 5 §13 | **answered** — D7's adds-polarity pattern, carrying the skippable-without-a-second-thought constraint verbatim |
| H15 | The removal rule — name what carries the motivation instead | `LDB-06` D8 §13 | **answered** — discharged explicitly at D10, D11 and D12 rather than left to be inferred |
| H16 | The `totalsDisclosure` control | `LDB-09` D6 §13 | **answered** — D18: learner-operated, under the help-seeking pattern |
| H17 | The in-situ capture control | `LDB-09` D7 §13 | **answered** — D7's adds-polarity pattern |
| H18 | The operation of the five new Unmeasured types | `LDB-09` D2 §13 | **answered** — D19 contracts C7–C11 |
| H19 | U2-3's frontier brush, with its play verdict and `A-21` attached | `LDB-09` §13 | **answered** — D12: adopted ungraded; `A-21` explicitly unspent |
| H20 | How a Challenge looks | `LDB-11` §9 | **answered** — D14 (the affordance) and D19 (what runs inside it) |
| H21 | How the path renders | `LDB-11` §9 | **answered** in part — D13 fixes the interaction contract; **forwarded, by name** — the visual shell to **phase 6**, per D13's seam |
| H22 | How the request control reads | `LDB-11` §9 | **answered** — D14: quiet *"I've got this"* on every Unit ahead, visibly distinct from the product's own louder invitation |
| H23 | How the debrief is laid out | `LDB-11` §9 | **answered** — D9 |
| H24 | Whether the Unit Challenge is a heavier ceremony with its own pacing | `LDB-11` D11 | **declined, with what carries it instead** — this card adds no ceremony weight. D14's affordance is identical at both scopes; the Unit Challenge's greater weight is carried by its **coverage-completeness** over every gated Skill in the Unit (`LDB-11` D11), which is structural rather than presentational |
| H25 | The licence to skip the warm-up where nothing rehearses the target | `LDB-11` D17 | **declined, with what carries it instead** — D10 hands the licence back unused. A warm-up always runs; where nothing rehearses the target it is generic and the copy does not pretend otherwise. Ceremony carries it, and the honesty constraint moves to the copy |

#### Owned parameters

Seven after D21. **Four are answered here and three are forwarded** — the split is stated rather than
smoothed, because a parameter this card owns and does not decide is exactly what the table exists to
make visible.

| # | Parameter | Type | Disposition |
|---|---|---|---|
| P1 | `space` | `policy-paint` | **answered** — D12: `presented-grid` for v1; `withheld` deferred, not removed |
| P2 | `verdictSurfaced` | `rule-contrast` | **answered** — D17: reveal the differing rule, never the verdict; the grade is still recorded |
| P3 | `probe` | `rule-contrast` | **answered** — D17: ships `which-rule-differs` only; `which-rule-would-flip-this` deferred as a second activity's build for the same Skill |
| P4 | `subject` | `estimate-and-check` | **forwarded, by name** — to `LDB-08`. Both values stay live and D19's contract is identical under either, so which quantity ships follows the phase-5 slice's Skill subset, not the interaction |
| P5 | `procedure` | `procedure-order` | **forwarded, by name** — to `LDB-08`, for the same reason: `dealer-routine` and `lookup-sequence` share one operation and differ only in authored content |
| P6 | `groupSize` | `principle-name` | **forwarded, by name** — to **phase 5**'s build of `principle-name`. The value is literally `unset`; group size is a content-authoring parameter and no interaction in D19 depends on it |
| P7 | `assembly` | `rule-battery` | **answered** — D19 and the JSON both fix `fixed-parts` only; the free-text form needs a rule language and a parser and stays rejected |

#### Operation contracts

| # | Type | Disposition |
|---|---|---|
| C1 | `deal-and-decide` | **answered** — D19 |
| C2 | `state-report` | **answered** — D19 |
| C3 | `policy-paint` | **answered** — D19, with D12's ungraded brush and D4's non-drag equivalent |
| C4 | `rule-card-read` | **answered** — D19 |
| C5 | `predict-then-reveal` | **answered** — D19 |
| C6 | `rule-contrast` | **answered** — D19, with D17's reveal-without-verdict return |
| C7 | `hand-sort` | **answered** — D19, with D4's select-then-place equivalent |
| C8 | `estimate-and-check` | **answered** — D19 |
| C9 | `procedure-order` | **answered** — D19, with D4's select-then-place equivalent |
| C10 | `principle-name` | **answered** — D19 |
| C11 | `rule-battery` | **answered** — D19 |

---

## Gate

**Ruled 2026-08-22.** Four divergences, each put on its own and answered on its own.

| # | Divergence | Ruling |
|---|---|---|
| 1 | The card's approval criterion gains a second half (D20) | **approved** |
| 2 | `LDB-11` D17's warm-up licence is declined (D10) | **approved** — the licence is handed back unused |
| 3 | `2026-08-01-activity-taxonomy.json` is edited (D21) | **approved** |
| 4 | `LDB-09`'s *"path is phase 6"* scope line is narrowed (D13) | **approved** — contract here, shell in phase 6 |

### What landed, counted in the target file after writing

- `2026-08-01-activity-taxonomy.json` — `space.owner` **LDB-04 → LDB-07**, void note replaced with
  D12's ruling; `owner: "LDB-07"` count **6 → 7**, read back out of the file by check 12.
  `registerDelta.new` +3, `netNewRows` **6 → 9**, `notReissued` note extended. `schemaVersion`
  unmoved — no id, bar or shape changed.
- `assumption-register.md` — `A-33`, `A-34`, `A-35` filed, each with a named validation method and a
  stated failure reading. `A-21` deliberately **not** filed as new.
- `scripts/check-ldb03-taxonomy.js` — **11 → 13**. Check 6's expected list extended to match.
- This file — §Discharge populated (43 rows), §D3 gained the requirement mapping and **seven
  criteria**, status flipped.

### The seven criteria, and why they are a finding rather than a formality

D3 as drafted carried twelve criteria. Mapping the six adopted requirements onto them showed
**`ALR-036` had no criterion in the table at all**, and `ALR-038` and `ALR-039` were partly covered.
The card's own WCAG approval criterion — *every requirement is mapped to a criterion whose level was
read first-hand* — was therefore **not met by the draft**, and check 13 written honestly failed on
first run. D20's check found it one section over from where it was aimed.

Each of the seven was read on its **own** `Understanding` page. This mattered: a whole-document
retrieval returned **`4.1.2` at Level AA**, and the criterion's own page says **`(Level A)`** verbatim.
`V-U4.md:223-227` records that the phase-2 verifier's retrieval of this same criterion came back with
**no level string at all**. Two retrievals have now failed on 4.1.2 specifically. Every added
criterion lands at A or AA, so **the Level AA target is unchanged** — the defect was coverage, not
the target.

### Evidence that the checks can fail

Both new checks were **observed failing before the sections they read existed** — check 12 at
`rows=0`, check 13 at `ALR rows found=[none]` — and each was then mutation-tested against the exact
failure it was written for:

| Mutation | Result |
|---|---|
| Mapping claims `4.1.2 (AA)` while the level table says A | `FAIL 13 … level disagreements=[4.1.2: mapping says AA, table says A]` |
| A new `owner: "LDB-07"` parameter added with no disposition row | `FAIL 12 … missing a disposition row=[principle-name.canary]` |

The second mutation is the `space` scenario itself, caught in the run that would have shipped it.

**Final state:** `scripts/check-ldb03-taxonomy.js` **13 passed, 0 failed**;
`scripts/check-doc-drift.sh` **no drift across 8 checks**. Both run after the last edit.

### Two dispositions a reader should not skip

- **Three of the seven owned parameters are forwarded, not answered** — `subject`, `procedure`,
  `groupSize` (P4–P6). All three are content-authoring choices whose operation is identical under
  either value, so the interaction contract does not depend on them; `LDB-08` and phase 5 receive
  them by name. The table states this rather than smoothing it, which is the whole reason D20 exists.
- **Two handoffs are declined** — H24 (Unit Challenge ceremony) and H25 (the warm-up licence), each
  naming what carries it instead, per `LDB-06` D8's removal rule.
