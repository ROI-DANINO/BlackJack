# The Activity Taxonomy and the Skill Mapping — LDB-03

> **Status: APPROVED 2026-08-01** (owner, `LDB-03` user-approval gate). Authoritative for *what is
> asked and what it measures*; owns no threshold, session shape, or widget.
>
> Three rulings were put to the gate individually and each was approved: **§3.2** (the pool ruling
> overturns `U2`'s generation-from-scratch test), **§4.1** (the dealt-cards consequence binds
> phase 5), and **§6.3** (the graded divergence from `U3-4`).
>
> Phase 4 deliverable 3. Consumes `2026-08-01-skill-graph.json` and the LDB-02 activity-pattern
> catalog; produces `2026-08-01-activity-taxonomy.json`, which is authoritative over this prose
> wherever the two disagree about a type, a parameter, or a verdict.

**Card:** `LDB-03` — *Define the activity taxonomy and map capabilities to activities.*
**Source:** `docs/superpowers/specs/2026-07-22-product-design-inputs.md` §4.
**Evidence base:** `docs/superpowers/research/activity-pattern-catalog/` (32 patterns, 24 products,
50 sources) and the approved skill graph.

---

## 0. What this document decides, and what it does not

**It decides:** what an Activity type *is*; what makes two of them different; how a supplied pool is
ruled; what the recognition ban prohibits; how provenance is recorded; which Skills each type
measures; and a verdict on all 32 catalog patterns.

**It does not decide:** thresholds, mastery rules, or scoring bands (`LDB-04`); session entry, size,
mix, or stopping (`LDB-06`); any widget, control, or WCAG target (`LDB-07`); which of these types
phase 5 actually builds (`LDB-08`).

Where a parameter is named below, its **range** is declared here and its **value** is owned
elsewhere. The `owner` field on every parameter in the JSON says which card.

---

## 1. The unit is the Activity type

The project holds two inventories that could each claim to be the taxonomy: 32 sourced patterns and
18 Skills. **Neither is it.**

An **Activity type** is a new node: a question shape, the Skills it measures, and a declared
grading authority. The 32 patterns are *sources* adopted into or rejected from it. Several patterns
collapse into one type in blackjack terms; several are named after a widget rather than a question,
which is the cut the catalog's central finding says is wrong. `CONTEXT.md` carries the term.

The alternative — the taxonomy *is* the adopted patterns — was rejected because it makes `U3-5` a
name that `LDB-06` has to write in a session-composition document, and because it inherits `U2`'s
vocabulary, `U2` being the unit with no reachable independent source.

---

## 2. Individuation: SHOWN × PRODUCED × WITHHELD `[Product judgement]`

> Two designs are the same Activity type when they show the same thing, ask for the same thing, and
> withhold the same thing. Everything else is a parameter.

This is the taxonomy's load-bearing choice and it is taken directly from the research. Identical
items scored **73.3% vs 73.5%** between a menu and free text (p = 0.93); construct-matched written
short answer tracks multiple choice at **r = 0.81**, while formats that change *what is asked*
diverge at **r = 0.51**. One source states it outright: *"not the answer format itself, but the
stimulus set by the question … influences the results."*

So the widget does not individuate. Neither does feedback timing, scoring granularity, provenance,
or any Condition axis — those are **parameters**, declared per type with their ranges, valued by
`LDB-04` and `LDB-06`.

**What this costs, stated plainly.** `U1-5` is Evidence-backed and substantive *purely* because
judgement arrives later — `classification.md` says of its sibling `U1-6`, "substantive on the
assessment axis, silent on the prompt axis." Under this rule neither becomes an Activity type. They
become parameters. That is not a demotion: the deferred debrief is the product's stated
differentiator and it is a setting that most types can carry, which is exactly why it should not be
one type among six.

---

## 3. The pool ruling — the card's named obligation

The card required this to be ruled **once, in writing**. Both units were reopened first-hand rather
than read through `FOR-LDB-03.md`'s summary of them, and the contradiction is sharper than the
summary reports: the two units applied **different tests**.

- **`U2`** (`run/U2/audit.md:80`) rejected word-bank tile assembly because *"every element is
  supplied on screen and the target is one arrangement of the supplied bank, so nothing is generated
  from scratch"* — a **generation-from-scratch** test. It then rejected Brilliant's equation tiles
  "on the same rationale as the Duolingo word bank, for consistency."
- **`U3`** (`run/U3/audit.md:23`) admitted Parsons because *"the response is a permutation and subset
  over the fragment pool, not selection of one option from a presented set"* — a **not-one-of-N**
  test. Its pool may contain **distractors that must be left unused** (the source's own hedge:
  *"some of which may be"*); `U3-2`'s word bank is
  **lesson-wide, not per-item**.

### 3.1 The ruling `[Product judgement]`

> **A supplied pool is cosmetic when it discloses any part of what is being measured. It is
> substantive when the measured target is not in the pool.**

| Case | Verdict | Why |
|---|---|---|
| Word bank over "which hands would you double" | **cosmetic** | the pool contains the answers |
| Fragment assembly where the target is the order | **substantive** | the pool supplies elements; the order is not in it |
| The 169-cell strategy grid | **substantive** | the grid supplies the space, not the actions |
| The Hit / Stand / Double / Split action set | **exempt** | not a supplied pool — a real table enumerates the action space too |

### 3.2 What the ruling overturns, said out loud

It **overturns `U2`'s test.** The ground is not that `U2` was careless — it is that `U2`'s own row
records the rejection as *"Borderline … Rejected anyway … because the dispatch explicitly steers past
this format."* Half of that reason is dispatch scope, which is a process fact about the research
pass, not a finding about measurement.

It **disagrees with `classification.md`'s cosmetic call on `U3-7`**, which is reclassified
substantive here. `U3-7` is then not adopted anyway, for an unrelated reason — see §7.

**Why not `U2`'s test?** Because it also disqualifies `U1-1`. The 169 cells are supplied on screen
and the target is an assignment over them, so under a generation test the catalog's highest-value
pattern dies. The measurement-target test is also not invented for this purpose: it is the principle
already load-bearing in `classification.md` — *"presenting the cells supplies the recall."*

---

## 4. The recognition ban bites on the stimulus `[Product judgement]`

Seven of the 18 Skills are decisions: `hit`, `stand`, `double`, `split`, `strategy-action`,
`legal-fallback`, `adherence-under-loss`. For all seven the response is a choice among ≤4 legal
actions, and §3.1 exempts showing that set. So the card's clause — *no Skill that is a decision is
measured only by recognition* — cannot be about the response widget, or it prohibits everything.

> **An activity measures by recognition when the prompt assembles candidate answers for that item, or
> supplies a Classification the learner should have made.** Displaying the invariant action set is
> not recognition.

**What is deliberately *not* required: forcing production by hiding the actions.** This is the
option the project's own evidence is least kind to. Roediger et al. (`run/U3/audit.md:18`): production
scored **6–7% lower** on matched items, and on the delayed end-of-semester exam the tested group ran
**70% vs 73% nontested — "not reliable and obviously was opposite the predicted direction,"
F = 1.50.**

### 4.1 The consequence, recorded before phase 5 discovers it

`strategy-action`, `legal-fallback` and `adherence-under-loss` are all `classificationIncluded: true`.
Chain it through:

1. Their prompts may never name the hand shape — a shape-named prompt supplies the Classification.
2. So the situation must be shown as **cards**.
3. And per `LDB-01`, cards may only be rendered if they came from a shoe.

**All three are unmeasurable without real dealt hands.** No posed, card-free prompt can ever produce
primary evidence for them.

---

## 5. Provenance: three states, zero schema delta

The engine already solves the problem this creates. `crates/blackjack-core/src/shoe.rs:62`,
`create_prefix_shoe`, builds a **real shuffled six-deck shoe** and swaps a chosen opening to the top —
each arranged card **replacing a shuffled card of the same rank and suit**, so per-rank and per-suit
composition are unchanged. Arranged cards carry `deck_id: "arranged"` and ids like
`arranged-0-10-hearts`; organic cards keep `deck-3-10-hearts`.

**The provenance labels itself, and nothing new is stored:**

| State | How it is read | Meaning |
|---|---|---|
| `organic` | `card_id` starts `deck-` | met in natural shoe order |
| `arranged` | `card_id` starts `arranged-` | composition-honest, opening chosen |
| `posed` | no cards at all | situation stated directly |

Each Activity type **declares which modes it may use**. Targeted practice on hard 16 vs 10 is
therefore available without faking card flow — the `AGENTS.md` constraint is satisfied, not dodged,
and `product-design-inputs` §4.6's "rare-event exposure must be deliberate" is buildable.

**Arranged is dealt evidence for the Skill.** Whether *arranged-only* evidence can reach mastery is
`LDB-04`'s to rule, and is handed over as an open question rather than answered here — because the
interleaving benefit is a **discrimination** benefit: 72% vs 38%, d = 1.05 (`product-design-inputs`
§1.1 `[VERIFIED]`), and discrimination errors 46% vs 10% (**P2 Bottom line A.2**,
`docs/superpowers/research/evidence-index/P2-verdict-catalog.md:170` — that figure is *not* in §1.1
and does not carry its `[VERIFIED]` tag). A learner drilled on arranged hard-16s has produced the right action many times without
ever having to notice a hard 16 arise. **That gap is `A-23`.**

---

## 6. The six Activity types

Coverage runs **both directions**. The card as written requires only activity → Skill; the reverse
clause is added here, because a Skill nothing can measure is evidence that `LDB-01` over-generated —
which is precisely why `LDB-01` itself dropped `goal` and `round-flow`. **A Skill no type can cover
is reported as a finding against `LDB-01`, never filled by inventing an activity.**

Checked 2026-08-01 against the graph, by script: **18 of 18 Skills carry primary evidence; 6 of 6
types declare at least one Skill; 32 of 32 patterns disposed.**

| Type | SHOWN | PRODUCED | WITHHELD | Graded by | Primary for |
|---|---|---|---|---|---|
| **deal-and-decide** | dealt cards + upcard, named ruleset | Classification (when required), then one legal action | the Classification, the correct action, the outcome | engine + oracle | `hit` `stand` `double` `split` `classify-hand` `strategy-action` `legal-fallback` `adherence-under-loss` |
| **state-report** | a dealt hand, round, or resolved hand | the stated value / total / predicate / settlement | the value; for `natural-blackjack`, the Classification | engine | `card-values` `hand-total` `ace-value` `bust` `dealer-info` `outcomes` `wager-result` `natural-blackjack` |
| **policy-paint** | the strategy space — grid, or withheld | an action for every situation in the region | the correct policy | oracle | — (*secondary:* `strategy-action`) |
| **rule-card-read** | an active table's behaviour | its soft-17, decks, DAS, payout | the rule card | engine | `read-rule-card` |
| **predict-then-reveal** | a named event and a count of upcoming hands | one frequency | the outcome — the hands are unplayed | catalog | `variance-expectation` |
| **rule-contrast** | the same situations under two rulesets | which rule differs | the rule, and any surfaced verdict | engine | — (*secondary:* `read-rule-card`, `strategy-action`) |

Three of the six are the product's own; three are adopted from the catalog (`U1-1`, `U3-4`, `U3-8`).
The catalog's other contribution is **ten parameters**.

### 6.1 `classify-hand` is a sub-response, not a type

It is graded separately **inside** `deal-and-decide`, which is what P2 Bottom line A.2 actually asks
for — *"classification should be measured separately from action selection."* Separately, not
elsewhere. A decontextualised card sort (`U2-7`) measures it out of the situation that makes it hard.

### 6.2 `policy-paint` supplies the Classification, and says so

The presented 169-cell grid is organised by pair / soft / hard, so it hands the learner the
Classification for free. Under §4 that means it cannot be **primary** for `strategy-action`; it
covers the action-selection half only, and the type declares `classificationSupplied: true`. The
`space: withheld` setting — free recall over a region, from `U3-1` — does *not* supply it.

**No new per-attempt field.** The activity type is on the attempt; the type declares the flag. Same
trick as provenance. `A-21` already registers the underlying assumption.

### 6.3 `rule-contrast` diverges from its source, deliberately

`U3-4`'s construct is invention whose value is **orthogonal to answer correctness** — *"the students
in the inventing condition did not generate a correct standardizing procedure during instruction, yet
they were more prepared to learn the procedure."*

This design grades the named differing rule, because an ungraded prompt produces no evidence and the
card requires every type to measure something. The source's caution is kept a different way: **the
verdict is recorded and never surfaced**, which is `U1-5`'s surviving licence — *issue no pass/fail
verdict in the debrief*, not *grade nothing*. **This is a divergence from the source, labelled
Product judgement and recorded rather than smoothed.**

---

## 7. All 32 patterns, disposed

Four verdicts, because the binary the card names cannot tell the truth about `U1-5` — the catalog's
best-evidenced substantive row, which this design leans on heavily and does not adopt as an activity.

| Verdict | n | Meaning |
|---|---|---|
| **adopted-as-type** | 3 | becomes an Activity type |
| **adopted-as-parameter** | 10 | becomes a setting on one |
| **not-adopted-no-target** | 4 | substantive, but no Skill in the approved graph is that shape |
| **rejected** | 15 | ruled out on the merits |

Full reasons per row are in `2026-08-01-activity-taxonomy.json` under `patternVerdicts`. Three
procedural rules were applied throughout, each lifted from the archive's own warnings:

1. **Classified from the sourced pattern, never the candidate-analogue column** — `U2-3`, `U2-11` and
   `U2-13` over-rate on that column.
2. **Used each row's own provenance label, not its unit's** — `U1-5`, `U1-8` and `U1-9` are
   Evidence-backed and independent, so "vendor self-description" would have been a *false reason*.
3. **Buildability tier recorded, never used as a reason** — that file is self-declared Product
   judgement and, by its own disclosure, converges on the standing phase-5 candidate by the same
   author.

### 7.1 The two conditionals, resolved

- **`U1-7`** (key-features, critical-steps-only) → **rejected**. Its determinant is *"is the item set
  reduced to critical steps?"* Reducing a shoe to its 2–5 critical decisions requires telling the
  learner which decisions are critical — supplying exactly the discrimination §4 says the stimulus
  must not supply.
- **`U2-11`** (continuous timed stream) → **substantive**, on its determinant: the blackjack analogue
  is externally paced. But per-element statistics over a counting stream needs a **counting Skill**,
  and none exists. **Not adopted**; flagged as card counting's natural home, which the graph already
  anticipates as a fifth Condition axis.

### 7.2 The cosmetic nine

Eight of `classification.md`'s nine cosmetic rows are **rejected on the recorded reason**. The ninth,
`U3-7`, is **reclassified substantive** by §3.1 and disposed of on a different ground: `LDB-01`
retired `round-flow` and `complete-round`, so **no Skill in the approved graph is an ordering.**

The card asked for this boundary to be ruled. It is ruled — and it turns out to have nothing to
attach to. Ruling it and building nothing on it is the honest outcome; rejecting the format to avoid
the question is not.

### 7.3 The strongest rejection

`U2-9` (typed free recall + learner self-rating). Cosmetic on the typing half, and the self-rating
half is **affirmatively contradicted** by evidence this project already holds: Kornell & Bjork — 78%
performed better spaced, 78% rated massed as good or better. **The learner does not know what
worked.** No in-app "how well did that go?" control may feed any measurement.

---

## 8. Predict-then-reveal produces one number

`U3-8` and `U1-3` were both opened first-hand. They are not equally supported.

- **`U1-3`** — Hubbard, **vendor-self-description**; the audit *withdrew* its independence claim on
  2026-07-26 because `U1-S10` relays the same originator. The instrument concedes its own gaming,
  slide 11: *"Individuals scoring between 17 and 19 on range tests are not just better at trivia.
  They are simply willing to use wider ranges. Generally about 2 to 10 times wider than the people
  scoring far below average."* The deck's
  answer is procedural (an equivalent-bet test), not empirical.
- **`U3-8`** — Mellers et al. (2014), *Psychological Science*, **independent / Evidence-backed**.

The tiebreak is the approved graph. `variance-expectation`'s outcome reads *"states **how often** they
expect the event to occur"* — a frequency, one number. Choosing the interval would amend a spec
approved 2026-08-01. **Adopted: one frequency.**

**Constraint carried to `LDB-04`, from `U3-8`'s own *Measures poorly* cell:** *"A raw score confounds
item difficulty with skill, and single items are near-useless."* The signal must aggregate across
many predictions before any threshold is read off it. The scoring band is unset and inherits `A-07`.

**And the sandbox is the reveal half only.** `U2-13` is adopted as `revealMode: configured-sandbox`,
never standalone — `product-design-inputs` §4.4: *a simulation that does not first capture a
prediction is decoration.* `A-22` already registers the unevidenced teaching claim.

---

## 9. Register delta

**Net new rows: one.** Checked positively before writing: `A-21` covers `U2-3`'s blank-grid analogue
and `A-22` covers `U2-13`'s variance sandbox — both rows `classification.md` said were owed **already
exist** in the register, which now runs to `A-23`.

| Row | Change |
|---|---|
| **`A-23`** | **New.** Arranged-opening evidence transfers to organic discrimination — §5. |
| `A-21` | Cited, not restated. Covers `policy-paint`'s claim in both `space` settings. |
| `A-22` | Cited. Covers `U2-13` as `revealMode: configured-sandbox`. |
| `A-07` | Inherited by `predict-then-reveal`'s scoring band, unset here. |
| `A-04` | Inherited by the `supportFading` rungs, unset here. |
| `A-02` | Inherited by the `pace` parameter; no ordering against it is claimed. |

Everything else in this document is **Product judgement**, labelled at the section that makes it.

---

## 10. What is handed forward

| To | What |
|---|---|
| `LDB-04` | Whether arranged-only evidence reaches mastery (`A-23`); the `predict-then-reveal` scoring rule with its aggregate-not-single-item constraint; whether classification-supplied evidence counts for `strategy-action`; the `supportFading` rungs; `scoringGranularity` |
| `LDB-06` | `feedbackTiming`, `segmentation`, `pace`, `ruleCardAvailable`, `revealMode`, `region` |
| `LDB-07` | Every widget. This document contains none — deliberately |
| `LDB-08` | Six types with declared coverage, and four verdicts on all 32 patterns, to assemble against |
| `LDB-01` | Nothing. No Skill was found uncoverable |

---

## 11. Approval criteria — checkable

Each is a script check against `2026-08-01-activity-taxonomy.json` and
`2026-08-01-skill-graph.json`. The script is **`scripts/check-ldb03-taxonomy.js`** — run it; all six
passed on 2026-08-01 at design, and again at the approval gate.

> The first version of this section asserted these as script checks while no script existed in the
> repo, so the claim could not be re-run and its absent verifier would have read as a pass — the
> failure mode `AGENTS.md`'s third evidence rule names. The script was written and run before
> approval was granted. It prints what it looked for and where on success as well as on failure.

1. **Every Activity type maps to at least one Skill.** — 6/6, no type declares an empty mapping.
2. **Every Skill maps to at least one Activity type that could produce primary evidence.** — 18/18.
3. **No Skill that is a decision is measured only by recognition.** — no type flagged
   `classificationSupplied` is primary for a `classificationIncluded: true` Skill; no `posed`-only
   type is primary for one either.
4. **Every one of the 32 patterns carries a verdict and a reason.** — 32/32, no duplicates, no
   missing ids, counts match the declared tally.
5. **The word-bank versus Parsons boundary is ruled once, in writing.** — §3.1, with what it
   overturns and what it disagrees with named in §3.2.
6. **Net new register rows are stated and match.** — one (`A-23`), with the two pre-existing rows
   enumerated positively rather than assumed absent.
