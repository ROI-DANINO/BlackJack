# Session Composition — LDB-06

> **Status: DRAFT, 2026-08-08.** Awaiting the `LDB-06` `user-approval` gate. Nothing here is
> authoritative until that gate records an approval, and the vocabulary in §14 and the
> `journal/decisions.md` rows in §13 land **at approval, not before** — the convention `LDB-04` §16
> and `LDB-05` §15 both set.
>
> Phase 4 deliverable 6. Consumes the approved `LDB-01`, `LDB-03`, `LDB-04` and `LDB-05` specs and
> values the six `LDB-03` parameters this card owns.
>
> **Four divergences from prior documents are recorded in §12, each with what it costs.** Three were
> surfaced and approved by the owner on 2026-08-08 before this document was written; the fourth was
> found afterwards by the `LDB-06` examiner pass and approved the same day. §16 is the audit record.

**Card:** `LDB-06` — *Decide session composition.*
**Source:** `docs/superpowers/research/evidence-index/activity-and-storage-catalog.md` §3.
**Binding inputs:** `2026-08-01-learning-outcomes-and-skill-graph.md` (+ `.json`),
`2026-08-01-activity-taxonomy-and-skill-mapping.md` (+ `.json`),
`2026-08-03-evidence-and-mastery-rules.md`, `2026-08-04-motivation-and-chips-economy.md`,
`2026-07-22-product-design-inputs.md` §0 and §4.

---

## 0. What this document decides, and what it does not

**It decides:** what a session *is* and how many kinds there are; whether table play produces mastery
evidence; how a session starts, how large it is, and how it ends; how practice pools are mixed, per
Activity type; whether rare-event exposure is engineered or organic; what a debrief contains; when
Practice opens over material; how the Recommender orders work; what persists across a reload; and
the values of the six `LDB-03` parameters this card owns.

**It does not decide:** any widget, control, layout, copy, animation, or WCAG target (`LDB-07`); the
chips economy or the stake constants (`LDB-05`, approved); what counts as mastery evidence or how it
is computed (`LDB-04`, approved); which Activity types phase 5 actually builds (`LDB-08`).

**Where this document names a number, that number is invented.** `A-07` forbids the phrase
"research-calibrated" in this repository. Two numbers appear below and both take register rows.

---

## 0.1 Binding product constraints

The five owner constraints of 2026-07-23, recorded at `2026-07-23-graded-decision-practice-design.md`
§2b as *"product judgement, not evidence-backed"*, and restated by `LDB-04` §0.1 because they were
structurally invisible to every LDB card. They bind every ruling below.

1. The learning path must not be steep. Confusion is a failure of the design, not of the learner.
2. **It must not be frustrating.**
3. **It is a game. It has to be fun.** Not a quiz with a card table drawn behind it.
4. This activity assumes table literacy — practice, not first exposure.
5. **Mastery means deciding correctly *without* the table.**

Constraints 1, 2 and 3 do more work in this document than in any prior LDB card, because session
shape is the layer a learner actually feels. Where a ruling below rests on one of them, it says so.

---

## Problem Statement

**From the learner's perspective.** I know what the app measures and I know when it thinks I have
learned something. What I do not know is what I am supposed to *do tonight*. I open it and there is
either an endless stream with no shape, or a lesson that ends and leaves me nowhere. When I sit at
the table, the app watches me play, grades every decision against the oracle, and then — as far as I
can tell — throws the result away, because the only thing that seems to count is answering questions.

**From the owner's perspective.** Four approved specs now depend on a session concept that no
document defines. `LDB-04` D11 hands over a `"faded"` session trajectory. `LDB-05` D4 leaves *"which
sections open when, what the mode serves, how it sequences, and how it stops"* here, and §13 states
plainly that **nothing bounds practice any more** — the gate dropped the per-window cap and forbade
this card from reaching back for a chip cap to replace it. `LDB-03` hands over six unvalued
parameters. `CONTEXT.md` has no entry for *session* at all. And the phase-3 bridge contradicts
itself on rare-event exposure, stating it as a requirement in §4.6 and listing it as an open decision
in §7.

`[Evidence-backed — all four specs and the bridge reopened first-hand 2026-08-08]`

---

## Solution

**There are two session types, and the difference between them is the whole design.**

> A **Learning session** is a bounded run of Presentations with a named goal, a size the learner
> chose, and a debrief. A **Table sitting** is one Free Play visit, from Buy-in to cash-out.
>
> A Learning session comes in two shapes. A **Coached session** repeats a segment until it is clean,
> corrects immediately, and may use `arranged` Provenance mode. A **Closing run** plays one whole
> shoe, in `organic` Provenance mode, with no strategy table and no correction until the debrief.
>
> **A Table sitting is a Closing run that the learner paid to sit at** — and its decisions count for
> Mastery on the four action Skills, `hit`, `stand`, `double` and `split`. They do not reach the bar
> for the four Skills that require a Classification the table never asks for (D2).

Everything else in this document follows from those three sentences, or bounds them.

---

## User Stories

**Learner**

1. As a learner, I want the app to tell me what tonight is for, so that I am not choosing from a menu
   before I have played a hand.
2. As a learner, I want to override that suggestion, so that the app steers me without owning me.
3. As a learner, I want to choose how long I am here for, so that a short evening is a real option
   and not a failure.
4. As a learner, I want to stop whenever I want without losing anything, so that stopping is never
   punished.
5. As a learner, I want the hands I play at the table to count, so that the app is measuring the
   thing I actually came to get good at.
6. As a learner, I want the strategy table in front of me while I am learning a shape and gone when I
   am proving it, so that I know which mode I am in without being told twice.
7. As a learner, I want the app never to take a resource away from me mid-session, so that I am never
   confused about why something vanished.
8. As a learner, I want the rule card available always, so that I am not being tested on memorising
   the furniture.
9. As a learner, I want to be told what I got wrong, with the actual cards in front of me, so that
   the debrief is a replay and not a score.
10. As a learner, I want to meet a dealer 21 before it costs me, so that the tail is something I have
    seen rather than something I was told about.
11. As a learner, I want practice available over anything I have already met, so that going broke
    mid-unit has a way out that is not waiting.
12. As a learner, I want to know what the app will recommend next and why, so that the thing that
    pays full Chips is not a black box.
13. As a learner, I want to close the tab mid-session and lose no work, so that the app respects that
    my evening ended.

**Owner**

14. As the owner, I want the bridge's rare-event contradiction resolved in writing, so that no later
    card inherits half of it.
15. As the owner, I want the blocked-versus-mixed rule stated per Activity type, so that the four
    types it cannot apply to say so instead of being silently skipped.
16. As the owner, I want every number here to carry a register row with a named test, so that the
    constants are visibly provisional.
17. As the owner, I want user story 15 of `LDB-05` — a bound on grinding — answered honestly rather
    than declared closed, so that the deferred free-tier mechanism is still visibly owed.
18. As the owner, I want the three unordered Condition axes left unordered, so that this card does
    not manufacture Assumptions with nothing behind them.
19. As the owner, I want `LDB-07` and `LDB-08` to receive explicit handoffs, so that what this card
    declined is visible rather than lost.

---

## Implementation Decisions

Seventeen rulings. Each carries its evidence label.

### D1. Two session types, and only two

A **Learning session** covers curriculum work and Practice. A **Table sitting** is one Free Play
visit.

**Why not one type.** *Size* and *stopping* mean incompatible things across the split. A Learning
session can end because its evidence target was met or a bound was reached; a Table sitting ends at
cash-out or when the Wallet cannot cover the lowest Table tier's minimum Buy-in (`LDB-05` D3). Forcing
a maximum activity count onto a casino visit is precisely the pressure the archive rejects outright —
`ACT:388` via the catalog: *"Loss-framed streaks, leagues, or penalties for ending a session"*,
reason *"Controlled pressure conflicts with non-punitive stopping and the training-product mission."*

**Why not three.** Curriculum work and Practice differ in **what fills the pool**, not in shape: same
entry, same size choice, same stopping, same debrief. That is a pool-source parameter, not a second
concept.

**What this card does *not* touch.** A Table sitting's boundary is already ruled by `LDB-05` D2 —
Buy-in is a real transfer bounded by the Table tier, cash-out returns the whole remaining Table
stack. This document does not reopen it. What it owns inside a sitting is the Condition settings and
the evidence question (D2).

`[Product judgement]`

### D2. A Table sitting's decisions enter the Mastery window — for the four action Skills

Every table decision is a Presentation of `deal-and-decide`, in `organic` Provenance mode, graded by
the strategy oracle, and it counts toward `8 of the last 10` for **`hit`, `stand`, `double` and
`split`**.

> **The scope limit, and why it exists.** `deal-and-decide`'s `produced` contract is *"the
> Classification (pair / soft / hard) when the target Skill has `classificationIncluded:true`, then
> one action from the legal set"* (`2026-08-01-activity-taxonomy.json`, `deal-and-decide.produced`,
> read first-hand 2026-08-08). **A table decision produces the action only** — nobody announces "hard
> 16" at a table, they act. So for the four `classificationIncluded: true` Skills among the type's
> eight `primaryFor` Skills — `classify-hand`, `strategy-action`, `legal-fallback`,
> `adherence-under-loss` — a bare table Presentation does not meet the type's own contract and
> **does not reach the bar**. Those decisions are still recorded and still move the Player score
> (`LDB-05` D9); they are not window-eligible.
>
> **Two escapes were considered and declined.** Capturing the Classification at the table would meet
> the contract and would be a widget — `LDB-07`'s — but it bends the honest simulator, which
> `product-vision.md:69-71` fences off. Inferring the Classification from a correct action would
> assert the converse of `A-23`, whose whole worry is a learner *"produc[ing] the correct action many
> times without ever having to notice a hard 16 arise."*
>
> **This was found by the `LDB-06` examiner pass (F5) after the first draft ruled it unqualified.**
> Owner call, 2026-08-08: scope it. See §16.

**This was unowned, and it is the ruling that makes the founding commitment literally true.** Bridge
§1.7 `[VERIFIED]`: *"Measure play, not quiz scores."* `LDB-05` D9 already rules that every Free Play
decision is graded against the oracle and recorded with the support Condition captured. `LDB-04` D6
already makes `deal-and-decide` the **only** route to the eight decision Skills' bars, with
`provenance: ["organic","arranged"]` — it cannot be posed. Nothing excluded table hands and nothing
admitted them. Excluding them would mean the app grades play and then discards it as evidence.

**Three consequences, stated rather than left to phase 5.**

1. **A table Presentation has no retry**, so `LDB-04` D3's *first response* is the only response.
   Table evidence is the cleanest evidence in the model, not the loosest.
2. **`table-open` at a table is the strategy chart being on screen.** That is already `LDB-04` D4's
   "show me", and it keeps the Presentation out of the window. No new mechanism.
3. **A larger Wallet buys more table time, which buys more Presentations.** This is **opportunity,
   not credit** — every Presentation must still be correct with the chart closed. It does not breach
   `LDB-05` D7's rule that Chips may never gate table character, because nothing about the *bar*
   moves. It is nonetheless the nearest thing in the design to a meter blend and belongs in the
   spec rather than in a later discovery.

**Naming the risk positively rather than claiming there is none:** a learner with a large Wallet
reaches any given window faster in wall-clock terms than a learner with a small one. The bar is
identical; the *rate of opportunity* is not. Whether that matters is measurable from stored attempts
once a ledger exists (`LDB-05` §11), and it needs no new instrument.

`[Evidence-backed]` on the derivation from `LDB-05` D9 and `LDB-04` D6, and on the `produced`
contract the scope limit reads off; `[Product judgement]` on the ruling and on accepting
consequence 3.

### D3. Engineered exposure teaches; an organic Closing run closes the claim

**This resolves the bridge contradiction the card owes.** `2026-07-22-product-design-inputs.md` §4.6
states *"Rare-event exposure must be deliberate"* as a **requirement**; §7 lists *"Whether rare-event
exposure is engineered or organic (§4.6)"* as an **open decision candidate**. Both were written into
the same document.

**They are not in conflict once *exposure* is separated from *evidence*.** §4.6 is about the
curriculum not *waiting* for the shoe — which bridge §1.2 `[VERIFIED]` justifies, since
experience-taught learners systematically underweight rare events. §7 is about whether the product
engineers the encounter. The resolution takes both: **engineer the encounter, require the organic
close.**

**The shape is `U1-8`, and it is in the archive rather than invented here.** SPOT, per the
SACAA-approved facilitator guide §9.3, quoted in `run/U1/audit.md`'s `U1-8` row and reopened
first-hand 2026-08-08: *"This can be practiced several times by use of re-positioning and repetition
of the phase of the approach that needs attention. Once all phases have been satisfactorily been
completed, a \"full\" simulation of the approach from start to finish can be demonstrated and
experienced by the student as a whole."* `[sic, source grammar]`

Translated to this product: **a Learning session whose pool was `arranged` does not end without a
Closing run over the same material, in `organic` Provenance mode.**

**Stated in terms of evidence, which is the form the card demands.** This sits directly on `LDB-04`
D7's floor — at least one `organic` Presentation in the window for any Skill with
`classificationIncluded: true` — and supplies the session-shaped half D7 explicitly left here:
*"Engineered exposure still teaches, still practises, and still fills most of a window — it simply
cannot be the only thing a learner ever met."*

**It is buildable without faking card flow.** `crates/blackjack-core/src/shoe.rs:62-66`, reopened
first-hand 2026-08-08: `create_prefix_shoe` builds a real shuffled shoe and swaps a chosen opening to
the top, *"each arranged card replaces one shuffled card of the SAME rank+suit, so total and
per-rank/suit composition are unchanged"*, with arranged cards carrying arranged-origin ids. The
`AGENTS.md` constraint is satisfied, not dodged.

**And the rare-event *description* is not a lesson unit.** Per `LDB-01` decision B2, it arrives as a
post-shoe debrief, a captured prediction, or frequency framing in copy. D16 places it; D11 places the
prediction.

**The two "one"s count different units, said so the parity does not mislead.** `LDB-04` D7's floor is
one `organic` Presentation **in a Skill's window**, and only for the five `classificationIncluded:
true` Skills. This rule is one whole organic shoe **per arranged Learning session**, with no Skill
restriction — differently scoped, and strictly the larger of the two. It is not a divergence: D7
`:335-337` says outright *"**It leaves LDB-06 free.**"* But it sits above D7's floor rather than
level with it.

**Strictness stays at one run, deliberately.** A number of organic hands would be a constant with
nothing behind it and would need its own row. `A-23` is the standing row and its named validation
method — an arranged-only arm against a mixed arm, tested on organic play, scoring classification
errors separately — is what would justify raising it.

`[Evidence-backed]` on the two source quotations and on the code locus; `[Product judgement]` on the
ruling.

### D4. Blocked versus mixed, stated per Activity type — and it applies to two of six

`CFL-007` is already resolved (bridge §7, user decision 2026-07-22): *block to introduce, interleave
to practise; mixed review is not a final stage, it is the steady state.* What was unresolved is that
the rule is meaningless for four of the six Activity types, and the card requires it stated per
activity rather than once.

| Activity type | Ruling | Why |
|---|---|---|
| `deal-and-decide` | **Mixed by default.** Blocked permitted **only** for first exposure to a Classification, declared as such, and **only inside curriculum work** — never in Practice, never at a table. | The discrimination task bridge §1.1 measures. |
| `state-report` | **Mixed. No first-exposure exception.** | Its Skills are not confusable categories in the sense §1.1 measures; `card-values` and `hand-total` are not told apart, they are read off. |
| `policy-paint` | **Exempt, with the reason recorded.** | Under `LDB-04` D6 it produces **no Mastery evidence at all**. The interleaving argument has nothing to attach to. Its span is governed by `region` (D12) instead. |
| `rule-card-read` | **n/a** — one ruleset per Presentation. | |
| `predict-then-reveal` | **n/a** — one prediction per shoe. | |
| `rule-contrast` | **n/a** — a contrast of two rulesets *is* the content. | |

**A shoe is inherently mixed**, which is why the "never at a table" clause needs no enforcement
mechanism — it is a property of dealing, not a rule to police.

**The evidence, reopened first-hand 2026-08-08** at `run/U3/audit.md:31`: Kornell & Bjork (2008)
Experiments 1a/1b, first test block, **spaced M = .61 (SD .24) vs massed M = .35 (SD .24), t(119) =
10.82, d = 0.99.** That row also records the format was rejected as an MCQ analogue and the
interleaving result kept — so this is the result, not the widget.

**Learner preference may never choose blocked over mixed.** Same source, `run/U3/audit.md:33`: *"78%
of the participants did better with spaced presentations than they did with massed presentations, but
78% of the participants said that massing was as good as or better than spacing"*; across Exps 1a and
2, *"85% of the participants did at least as well in the spaced condition … but 83% of the
participants rated the massed condition as equally effective as or more effective."* A "which do you
prefer?" control is therefore foreclosed here as well as in `LDB-03` §7.3.

**The honest caveat, attached to the right study.** The figures quoted above are Kornell & Bjork's
artist-identification induction task — **undergraduates, t(119)**, in a format that same audit row
**rejected as an MCQ analogue**, keeping only the interleaving result. They are not the grade-7
result. The *"grade-7 mathematics, n = 140"* caveat belongs to bridge §1.1's **72% vs 38%, d = 1.05**
finding (`2026-07-22-product-design-inputs.md:63`) and is carried by `A-15`. Adult blackjack transfer
is untested for **both**. `A-15` is the standing row; `P-3` is the instrument; this document adds no
new row.

*(The first draft attached the grade-7 caveat to the Kornell & Bjork figures — two different studies.
Found by the examiner pass, F12. See §16.)*

`[Evidence-backed]` on both figures, reopened first-hand; `[Product judgement]` on the per-type
dispositions.

### D5. The three unordered Condition axes stay unordered

`LDB-01` §4 left `scope`, `ruleset` and `pace` deliberately unordered and assigned the question here,
and the `LDB-06` card's own `FROM LDB-01` handoff (`journal/tasks.md:51`) states the consequence
verbatim: *"order them or state that you decline to, and note that any ordering asserted here becomes
an Assumption needing a register row."*

> **That sentence is the board's, not `LDB-01`'s.** The first draft attributed it to `LDB-01` §4,
> which does not contain it — §4 says *"Scope, ruleset and pace are unordered — LDB-06 orders them
> against data"*, and the nearest register sentence is at §3. **This is the second occurrence in this
> project of a board paraphrase being cited as spec text**; `LDB-04` §12 divergence 0 caught the first
> — *"The handoff is a paraphrase written onto the board; LDB-01's own spec text says something
> narrower."* The substance is unchanged either way; the locus was wrong. (Examiner F2. See §16.)
**This card declines to order them, on the record.**

`A-02` — accuracy stable before speed is trained — is graded **Very low**: its only blackjack-specific
support is N = 12 with computer-controlled win probability and no split, double, or insurance. It is
inherited, not re-asserted, and this document does not re-assert it.

**What replaces an ordering, because "declined" alone is not an answer.** The axes are **recorded per
attempt and selected by the table's character or by the learner**, never sequenced by the curriculum.
`pace: timed` and `ruleset: novel-profile` are exactly what `LDB-05` D6 lists as table *character*,
gated by Mastery. A real progression therefore exists and the economy delivers it.

**The caveat, flagged rather than smuggled.** That is a soft ordering emerging from `LDB-05` D6. It
takes no register row because this card asserts only *how the table opens up* — already approved —
and **not** that the resulting sequence teaches better, which would be the falsifiable claim. If a
later document asserts the latter, it opens a new row.

**One structural fact found in the schema and worth recording:** `SessionRecord.ruleset` is a full
`Ruleset` object stored **once per session** (`web/src/progress/types.ts:131`, read first-hand
2026-08-08). The `ruleset` axis is therefore session-scoped in the shipped schema, not
presentation-scoped. That is consistent with this ruling and constrains `rule-contrast`, which cannot
be a whole session.

`[Product judgement]`

### D6. Entry: a named goal the learner may override, and an activity on screen before any choice

`ALR-026` (`ACT:277`, via the evidence index): *"Start each session with a clear evidence goal and an
immediately available deterministic activity"*, limited by *"goal wording stays brief and cannot
promise mastery or a fixed outcome from one session."*

**A Learning session opens with one sentence naming one Skill in learner language**, proposed by the
Recommender (D14) and overridable to any covered Skill (D13). **The first activity is on screen
before any choice is required** — that is `ALR-026`'s second half and it means a session never opens
with a menu. Constraint 1: a chooser before a hand is a steepness the product does not need.

**And the negative, ruled explicitly: a Table sitting has no evidence goal.** It is the honest casino
simulator. Prepending a learning objective to it is the manipulation `product-vision.md:69-71` fences
off — the learning layer may help *around* the game and may not bend the game for lesson purposes.
The one pre-shoe moment a sitting does have is the optional prediction capture (D11), which is an
offer, not a goal.

`[Product judgement]` on the ruling. `ALR-026` is quoted from the evidence index, which quotes the
activity baseline at `ACT:277`; **the `ACT:` source document itself was not opened for this
document.**

### D7. Size: three presets, bounded by Presentation count; minutes are an estimate

| Preset | Bound | Note |
|---|---|---|
| **Short** | 10 Presentations | Deliberately equal to `n = 10`, so one Short session can fill exactly one Mastery window. |
| **Standard** | 25 Presentations | |
| **Long** | 50 Presentations | |

**Minutes are displayed as an estimate and never enforced.** ⚠ **This diverges from `ALR-027`, which
requires a preset to resolve to *both* a target duration and a maximum activity count. Approved by
the owner 2026-08-08 — see §12 divergence 1.**

Grounds: a wall-clock bound in a product where hand length varies is a timer; the count is the same
unit the Mastery window counts, so bound and evidence are commensurable; and `ALR-025` (`ACT:269`)
already licenses duration as *"versioned planning input"* that *"must never become a correctness,
mastery, or accessibility penalty"* — an estimate is exactly that. The recorded conflict behind
`ALR-027` is entirely about minutes (Duolingo "a few", Brilliant fifteen with a two-minute option),
and the archive's own verdict is *"the research does not establish universal minutes."*

**Every number here is invented.** Filed as one pooled sub-row, **`A-07e`** — pooled because moving
one preset changes what the others mean, the convention `A-07a` set. See §10.

`[Product judgement]`

### D8. Stopping: four exits, and the session never refuses to continue

`ALR-028` (`ACT:289`) gives four exit paths — *"its evidence target is satisfied, either bound is
reached, or the learner stops"* — with *"no activity begins after a bound or explicit stop."* All four
are adopted. **The shipped schema already encodes them**: `SessionRecord.closeReason` is
`'evidence-target-met' | 'time-bound' | 'activity-bound' | 'learner-stopped'`
(`web/src/progress/types.ts:129`, read first-hand 2026-08-08). D7 makes `'time-bound'` unreachable;
§11 owes the delta.

**At the bound the app offers a debrief and a natural end. Starting another session is immediate,
with no cooldown, ever.** Constraint 2, and `ACT:388`'s rejection of penalties for ending a session.

**Abandonment is already ruled and needs nothing here.** `LDB-04` D5: an abandoned Presentation is
recorded, excluded from the window, and **not** counted as a failure. `AttemptDisposition` carries
`{ status: 'abandoned' }` as a real domain value (`types.ts:50`, read first-hand). Stopping mid-hand
is abandonment and costs nothing.

**No streak in v1.** ⚠ **A product judgement, approved by the owner 2026-08-08 — see §12 divergence
2.** Every shipped streak mechanic is loss-framed by construction: its entire motivational force is
the fear of losing it, which is what `ACT:388` names. XP and levels already carry `LDB-05` D8's
celebration layer.

**What answers user story 15 — and what does not.** `LDB-05` §13 states that nothing bounds practice
any more and forbids this card from reaching back for a chip cap. What this card offers instead is an
**honestly finite queue**: the Recommender's bands (D14) are exhaustible, and when they empty the
session goal becomes *"nothing is due — play because you want to"*, which is true. Combined with
`LDB-05` D5.2's trickle, a learner grinding after that point is earning at the lowest rate over the
least useful material, and the app is telling them so.

> **This answers user story 15 partially, and the spec says so.** It bounds nothing. The owner's
> stated intent, recorded at `LDB-05` §12 divergence 3, is that a free-tier bound arrives later as an
> energy or error-rate mechanism, which is the deferred-monetization row in `journal/decisions.md` of
> 2026-08-05. Declaring the story closed here would be the false-closure pattern this repository has
> already shipped once.

`[Product judgement]` throughout; `[Evidence-backed]` on the two code loci and on `ACT:388` as
relayed by the evidence index.

### D9. Two session shapes, with `feedbackTiming` and `segmentation` bound together

| Shape | `segmentation` | `feedbackTiming` | Provenance | Strategy table | `EvidenceMode` |
|---|---|---|---|---|---|
| **Coached session** | `segment-repeat-until-clean` | `immediate` | `arranged` permitted | available | `acquisition` |
| **Closing run** | `whole-shoe` | `deferred-to-debrief` | `organic` | none | `assessment` |

**The two parameters are set as a pair and are never toggled independently, and never by the
learner.** The reason is the source's own finding rather than a preference. Brummer et al. (2024)
p.466, as relayed verbatim by the evidence index at `activity-and-storage-catalog.md:141` (which
quotes `V-U4.md:39-43`): *"both immediate and delayed feedback had significant and strong effects…
with delayed feedback being slightly more effective than immediate feedback. A combination of feedback
timing approaches was ineffective. These findings indicate that clarity and consistency—as to whether
participants receive immediate or delayed feedback—is more essential than the actual timing of the
feedback."*

**A combination was ineffective and consistency is what matters. So the design commits to a pairing
and holds it.** That converts `A-03` from a bet on *timing* into a bet on *pairing*, which is a note
added to `A-03` rather than a new row (§10).

**The shapes are `U1-8` and `U1-5`.** Coached is SPOT — the facilitator may instruct and stop the run,
the segment is repositioned and re-flown. Closing is LOFT — the uninterrupted scenario with feedback
deferred to a debrief. Both rows were reopened first-hand 2026-08-08 in `run/U1/audit.md`.

**A Table sitting is always a Closing run.** That is why the model closes rather than needing a third
shape: the table already *is* the closing run, and D2 makes its evidence count — for the four action
Skills, per D2's scope limit.

**No new field is needed to record which shape a session was.** `ProgressAttempt.mode` is
`'acquisition' | 'assessment' | 'diagnostic'` (`types.ts:30`, annotated at `:85`, read first-hand), and `ALR-005`'s own
rule is *"configure feedback timing by evidence mode."* The shape is derivable from the attempts and
must not be duplicated onto `SessionRecord`.

`[Evidence-backed]` on the Brummer quotation as relayed — **the Brummer paper and `V-U4.md` were not
opened for this document**; `[Product judgement]` on the pairing and on the two shapes.

### D10. The app never withdraws the strategy table; the rule card is always available

**`supportFading` in the session sense: the fade is real, and it is a property of which shape the
learner is in.** A Coached session has the table and a free "show me"; a Closing run has no chart.
The fade is visible in the *sequence* of attempts, which is exactly the form `LDB-04` D11 requires:
*"Fading is a property of a session's trajectory; support is a property of a presentation."*

**Nothing is withdrawn mid-session.** A resource that vanishes without the learner asking is
confusing by construction (constraint 1) and frustrating (constraint 2). Scheduling a withdrawal
would also spend the `A-04` rungs `LDB-04` D11 deliberately declined to spend — *"`A-04` is **not
spent** — this asserts no rungs."* This ruling keeps it unspent.

**`ruleCardAvailable: shown-mid-session`**, for both `deal-and-decide` and `rule-card-read`. The rule
card states the *table's own behaviour* — soft-17, decks, DAS, payout — which at a real table is
public and printed on the felt. Hiding it measures memorisation of furniture, not a Skill. And
`U3-5`'s construct is dynamic assessment: present the resource and measure whether the learner
**applies** it, which is precisely what `read-rule-card` is for.

**This makes the `resourcesConsulted` delta load-bearing** — see §11. Opening the strategy table must
keep a Presentation out of the window (`LDB-04` D4); opening the rule card must not.

`[Product judgement]`

### D11. `revealMode: play-it-out`; the sandbox is deferred, not rejected

One prediction is offered at the **start** of a Closing run or a Table sitting, over the hands about
to be played. The signed error is surfaced in the debrief. Declining costs nothing and records
nothing, because `LDB-04` D12 gives `variance-expectation` no bar.

**This satisfies the constraint `LDB-01` carried:** the prediction is captured **before** the shoe it
concerns, which is the only placement where a whole shoe is about to happen.

**`configured-sandbox` is not built in v1.** It costs a whole authoring surface — shoe, ruleset and
bet-ramp configuration — to deliver a teaching claim the register marks **unevidenced**. `A-22`,
verbatim: *"None held. `U2-13`'s source describes an authoring risk, and the catalog row states
plainly that neither source claims what it measures about the learner."* Building the unevidenced
instrument first while the evidenced one is nearly free is backwards. `A-22` stays live with its
validation method; deferring is not rejecting.

**Play-it-out is nearly free because the shoe is being played anyway** — the reveal *is* the session
the learner was already having. That is bridge §1.4's mechanism: gains appeared *"only when the
activity forced students to confront their own prediction against the simulated result."*

`[Evidence-backed]` on `A-22`'s wording and on bridge §1.4's `[DEFECTIVE-SOURCE]` status, which is
carried rather than hidden — §1.4 is flagged defective in bridge §0 and this ruling does not lean on
it beyond the predict-first shape, which is ruled by `LDB-04` D12 and by the taxonomy's `revealMode`
note — **not** by the register: `A-22` covers the *configurable sandbox*, not predict-first (examiner
F8). `[Product judgement]` on deferring.

### D12. `region: named-region`

`policy-paint` runs over the Classification category the session is about. `whole-table` is reserved
for a learner-opened *"where do I stand"* diagnostic and is never a session activity.

169 cells in one sitting is against constraints 1 and 2. And since `LDB-04` D6 gives this type no
Mastery evidence at all, its job is to **show shape** — which a region does and a full grid buries.

**The diagnostic has a home in the schema already:** `EvidenceMode` carries `'diagnostic'`, which
`types.ts:85` annotates as *"STORED but excluded from mastery — by the reducer, not the store"*. The
`whole-table` view therefore records without contaminating anything.

`[Product judgement]`

### D13. Practice opens per Skill, at one recorded Presentation

**A Skill is *covered* — and therefore available in Practice — once at least one Presentation of it is
recorded.** Not when a unit is Completed.

`LDB-05` §12 divergence 2 settled *that* Practice opens progressively (the owner's second statement
superseding the first, confirmed at the 2026-08-05 gate). The grain was left here.

**Why not Completion.** Completion is already the economy's trigger (`CONTEXT.md`; `LDB-04` D14).
Using it here too would couple the refill route to the paying route, so a learner who went broke
mid-unit would have exactly one way out — the thing `LDB-05` D3 exists to prevent.

**Why Skill-grain works.** It is computable from `ProgressAttempt.evidence.skillId` with no new field
(`types.ts:79`, read first-hand), and it makes Practice a real refill at the exact moment D3 cares
about.

**The consequence, stated because nobody has written it down:** this makes *introduce* operationally
equal to **one exposure**, after which the Skill is practised mixed.

**The count comes from bridge §4.6 item 2, not from `CFL-007`.** `CFL-007`'s own text
(`2026-07-22-product-design-inputs.md:276-277`) is purpose-bounded and fixes no count — *"A category
may be introduced in isolation **so the concept lands**."* The count language is at §4.6 item 2
(`:221`), *"A blocked pool is permitted only for **first exposure** to a category"*, which D4 already
cites. **And the definition binds D4's curriculum-only blocked pool, not this rule** — D13 governs
Practice *availability*, D4 governs where a blocked pool may exist, and the two are different
questions. (Examiner F6.)

`[Product judgement]`

### D14. The Recommender's ordering is fixed and published

**Bands, in order:**

1. **`Review due`** — Mastery was reached and the live window has since fallen (`LDB-04` D2, D8).
2. **Below the bar with recent evidence** — weak.
3. **Prerequisites met, no evidence yet** — new.
4. **Mastered, oldest `occurredAt` first** — staleness, which `LDB-04` D8 assigned to the Recommender
   rather than to Mastery.

**Within a session the pool mixes across bands** rather than draining band 1 first. `ALR-031`
(`ACT:307`): *"Mix weak, prerequisite, and review-due evidence without immediate same-item
trapping"*, verified when *"weak evidence returns soon but is separated by other useful work, and review includes
older skills and discriminative mixtures."* The second clause is what band 4 rests on.

**A missed item may return after at least 3 intervening Presentations.** Invented; filed as
**`A-07f`** (§10). Named test: does a shorter gap raise same-session accuracy while lowering
next-session accuracy — the massed-wins-now signature this repository already holds in Kornell &
Bjork.

**The ordering is published in one sentence, for the same reason `LDB-04` D10 published the mastery
rule.** The Recommender is now an *economic* actor: `LDB-05` D5 pays full rate for clearing a
`Review due` Skill. A mechanism that decides what pays full Chips and is also opaque is a slot machine
by a second route.

**It reads the live window, never the ratchet** — `LDB-04` D2, which calls that sentence load-bearing:
*"The badge is motivational; the window is operational."*

**No tuned score.** A weighted ranking would be a set of constants with nothing behind them, and
`LDB-04` D1 already rejected a weight table for the same reason.

`[Product judgement]` on the bands and the gap; `[Evidence-backed]` on `ALR-031` as relayed by the
evidence index.

### D15. `pace: untimed` in v1; `timed` exists only as table character

Every Learning session in v1 is `untimed`. `timed` exists only as table character in Free Play, gated
by Mastery per `LDB-05` D6.

**This is a scope decision, not the ordering D5 declined.** It says v1 does not build a timed learning
activity. It does **not** say accuracy must precede speed — that is `A-02`, graded Very low, inherited
and not re-asserted.

**It also lands on the right side of the card's own note** that `U2-11`/`U2-12` external pacing is
substantive *only if the stream advances independently of the response*. A dealer moving on does that;
a countdown on a posed question does not.

**Consequence, stated:** a timed table's Presentations count toward the bar exactly like untimed ones,
because `LDB-04` D1 lets **only support** set the bar and leaves `pace` recorded but unordered.
`elapsedMs` is already on the attempt (`types.ts:116`, read first-hand), so the evidence to revisit
this exists without a new field.

`[Product judgement]`

### D16. The debrief: four contents and one prohibition

`feedbackTiming: deferred-to-debrief` is worthless if the debrief is undefined. `ALR-018` (`ACT:225`)
is a hard requirement: delayed review *"can summarize a hand only if the full decision snapshot
remains inspectable and replayable."*

**Contents.**

1. **Every decision that diverged from the oracle, each replayable to its exact Decision situation** —
   cards, upcard, legal actions, ruleset, response.
2. **Mastery window movement per Skill**, shown as the published count `LDB-04` D10 requires.
3. **The signed prediction error**, if a prediction was captured (D11, `LDB-04` D12).
4. **The Table stack result as one plain fact** — and only in a Table sitting.

**The prohibition: no self-rating control anywhere in the debrief.** `LDB-03` §7.3 rules this on
evidence reopened first-hand 2026-08-08 (`run/U3/audit.md:33`): the learner does not know what worked.
No in-app *"how well did that go?"* may feed any measurement.

**Requirement 1 needs no schema change** — this was checked positively rather than assumed.
`ProgressAttempt.engine` is `AttemptEngineContext | null` carrying `seed`, `playerCardIds`,
`dealerUpcardId`, `legalActions`, `outcomes`, `wager` (`types.ts:56-62`, hung off `engine` at `:103`), and
`activity` carries `activityId`, `activityVersion`, `catalogVersion`, `seed`, `params`
(`types.ts:106-112`). Both read
first-hand 2026-08-08. `ALR-018`'s replay requirement is **already satisfied by the shipped schema**.

**The debrief is derived, never authoritative.** `SessionRecord.summary` is annotated *"derived
report; non-authoritative, recomputable"* (`types.ts:135`). It stays that way; the attempts are the
record.

**Ordering and rendering are `LDB-07`'s**, per `LDB-05` D12 and §13 — decision quality above profit
and loss, bankroll as one plain fact. This card rules what is *present*, not what is *on top*.

`[Evidence-backed]` on the schema loci and on the Kornell & Bjork figures; `[Product judgement]` on
the four contents.

### D17. Committed Presentations persist; in-progress session state does not

⚠ **Diverges from `ALR-029`'s second clause. Approved by the owner 2026-08-08 — see §12 divergence 3.**

`ALR-029` (`ACT:295`) asks for two things: *"Commit every completed attempt"* **and** *"preserve open
goals and in-progress session state when the learner stops."* The first is adopted. The second is not
built in v1.

**No evidence is ever lost.** `LDB-04` D3 commits a Presentation on its **first response**. What a
reload discards is the session's goal and remaining count — one tap to re-enter, with no cooldown,
because D8 removed every barrier to starting again.

**The shipped schema already declines to model an open session, and this was checked rather than
assumed.** `ProgressAttempt.sessionId` is annotated *"opaque episode label. **NOT** a foreign key into
`sessions`"* (`types.ts:71`), and `SessionRecord` carries both `openedAt` and `closedAt` with a
required `closeReason` (`types.ts:127-129`) — it is a record of a *finished* session. An attempt
therefore survives a session that never closes, which is exactly this ruling, already implemented.
Both loci read first-hand 2026-08-08.

**Reopening condition, in place of a register row.** If abandonment rate rises materially with session
length, an in-progress resume is doing work. That is computable from stored attempts and
`SessionRecord.closeReason` with no new instrument. **No row is filed**, and the choice is visible
rather than silent: the belief is not a threshold, the cost of being wrong is one screen, and recovery
is total — the same asymmetry `LDB-04` D8 used to decline a decay horizon.

**The real point.** Wallet persistence (`LDB-05` D1) and window persistence over the last *n*
Presentations (`LDB-04` D2) already force durable storage regardless of this ruling. That boundary
should go through `docs/specs/stack-boundaries.md`'s Tool & Runtime Admission Protocol **once, as one
decision**, rather than being admitted twice for two reasons. Handed to `LDB-08` (§13).

`[Evidence-backed]` on the two schema loci; `[Product judgement]` on the ruling.

---

## The six `LDB-03` parameters, valued

Every parameter carrying `owner: LDB-06` in `2026-08-01-activity-taxonomy.json`. **The board's
handoff names six and there are six** — checked positively against the JSON on 2026-08-08.

| Parameter | Activity type(s) | Value | Decision |
|---|---|---|---|
| `feedbackTiming` | `deal-and-decide`, `state-report` | **bound to session shape** — `immediate` in a Coached session, `deferred-to-debrief` in a Closing run | D9 |
| `segmentation` | `deal-and-decide` | **bound to session shape** — `segment-repeat-until-clean` / `whole-shoe` | D9 |
| `pace` | `deal-and-decide` | **`untimed`** in v1; `timed` only as table character | D15 |
| `ruleCardAvailable` | `deal-and-decide`, `rule-card-read` | **`shown-mid-session`** | D10 |
| `revealMode` | `predict-then-reveal` | **`play-it-out`**; `configured-sandbox` deferred | D11 |
| `region` | `policy-paint` | **`named-region`**; `whole-table` as a learner-opened diagnostic only | D12 |

---

## Testing Decisions

1. **A Closing run cannot begin with an `arranged` shoe.** Assert that a session whose
   `EvidenceMode` is `assessment` produces attempts whose `engine.playerCardIds` all start `deck-`,
   never `arranged-` — the check reads real card ids rather than a flag (D3).
2. **A Coached session whose pool was arranged is not closeable without a Closing run.** Fixture: a
   learner drills an arranged hard-16 pool to clean and stops; assert the session's Skills show no
   organic Presentation and that `LDB-04` D7 therefore withholds Mastery. This is a *positive*
   enumeration of what was checked, not a test that passes on an empty pool.
3. **A Table sitting produces window-eligible attempts.** Assert a table decision commits with
   `gradedBy.authority: 'oracle'`, `attemptOrdinal: 1`, `disposition.status: 'graded'`, and
   `tableVisibility` recorded — and that it is **not** `{ status: 'ungraded' }`. See §11 item 2: the
   shipped comment says otherwise and is now wrong.
4. **`closeReason: 'time-bound'` is never emitted.** Under D7 it is unreachable; assert no producer
   exists. §11 item 1 retires it, and the assertion guards the interim.
5. **A missed item does not return within 3 Presentations.** Direct test of `A-07f`.
6. **A reload loses no committed attempt.** Commit *n* Presentations, discard session state, assert
   *n* attempts survive and the window is unchanged (D17).
7. **No debrief surface accepts a learner self-rating.** A structural check, not a copy check: assert
   no debrief input feeds the reducer (D16).
8. **The Recommender reads the live window, not the ratchet.** Fixture: a learner above the
   high-water mark whose live window has fallen still gets that Skill recommended (`LDB-04` D2).

---

## Out of Scope

- **Every widget, control, layout, copy string, animation and WCAG target** — `LDB-07`. This document
  names no widget, deliberately.
- **Where the published Recommender order and the published Mastery count are *rendered*** — `LDB-07`.
- **The stake constants, pay rates, and the empty-wallet state** — `LDB-05`, approved.
- **What counts as Mastery evidence and how it is computed** — `LDB-04`, approved.
- **Which Activity types phase 5 builds** — `LDB-08`.
- **A free-tier bound on earning** — deferred by the owner at the `LDB-05` gate to a later energy or
  error-rate mechanism. D8 answers user story 15 only in session shape.
- **The hint ladder.** `A-04`'s rungs stay unspent (D10). **`Assistance`'s third value does not
  survive as `'instruction'`:** `LDB-04` **D15** ruled it renamed to `'retry-2'` in both
  `learn/types.ts` and `progress/types.ts`, reserving `'instruction'` for a level that exists only
  once a hint ladder does. §11 item 3's argument is unaffected — `'retry-2'` is no more a
  consulted-a-resource value than `'instruction'` was. (Examiner F9; the first draft asserted a value
  an approved spec had ruled away.)

---

## Further Notes

### 10. Register delta

**Net new rows: two, both sub-rows of `A-07`. One existing row gains a note.**

| Row | Change |
|---|---|
| **`A-07e`** | **New.** The three session-size presets — Short 10, Standard 25, Long 50 Presentations (D7). Pooled, because moving one changes what the others mean — the convention `A-07a` set. **Named first test:** completion rate and return rate by preset, which is `A-08`'s existing instrument at no extra cost. Mode: **playtesting**, matching `A-08`'s declared mode — the instrument is shared, so the mode must be too. |
| **`A-07f`** | **New.** The Recommender's separation gap — a missed item may return after at least 3 intervening Presentations (D14). **Named first test:** does a shorter gap raise same-session accuracy while lowering next-session accuracy? Computable from stored attempts. Mode: **production telemetry**. |
| `A-03` | **Note added, no new row.** D9 fixes the timing pairing rather than the timing, on the source's own finding that consistency matters more than timing. `A-03`'s validation method already reads *"the honest test is consistency versus timing"* — this design is now the arm that tests it. |
| `A-23` | Cited, not restated. D3's organic close is a mitigation of `A-23`, not a new assertion — which is why no row is filed for the Coached-then-Closing shape. |
| `A-15` | Cited. D4 adds nothing; `P-3` remains the instrument. |
| `A-22` | Cited. D11 defers `configured-sandbox` and leaves the row live. |
| `A-02` | Cited, inherited, **not re-asserted** (D5, D15). |
| `A-04` | **Not spent** (D10), continuing `LDB-04` D11. |

**Two identifiers are deliberately skipped, and the reason is recorded so the gap is not read as an
error.** `A-07d` and `A-25` are **not** reused. The register discusses both by name in its closing
paragraph — *"`A-07d` … and `A-25` … were drafted in `2026-08-04-motivation-and-chips-economy.md` §10
and were never written here"* — so a reader grepping either identifier lands on a paragraph about a
dropped per-window cap. Reusing them would make that paragraph read as though it described these
rows. New rows start at `A-07e`.

### 11. Owed schema delta

Four items. Each was checked against `web/src/progress/types.ts`, read first-hand 2026-08-08, rather
than assumed.

1. **`SessionRecord.budget` and `closeReason`.** `budget` is
   `{ presetId: string; targetDurationMs: number; maxActivities: number }` (`types.ts:130`) and
   `closeReason` includes `'time-bound'` (`types.ts:129`). Under D7 the duration is an **estimate**,
   so `'time-bound'` has no producer. The file's own **phantom rule** (`types.ts:6-9`) forbids
   exactly this: *"a `null` is allowed only when it is a real domain value, never as a placeholder
   for a producer that does not exist."* **Owed:** retire `'time-bound'` from the enum and rename
   `targetDurationMs` to something that says estimate. This is the concrete cost of divergence 1 and
   it is stated here rather than discovered in phase 5.

2. **`AttemptDisposition`'s free-play comment is now wrong.** `types.ts:49` reads
   `| { status: 'ungraded' } // responded; no grading authority (e.g. free play action)`. `LDB-05` D9
   (approved 2026-08-05) rules that **every** Free Play decision is graded by the oracle, and D2
   above makes those decisions window-eligible for the four action Skills. **No type change is
   needed** — `{ status: 'graded' }` and `gradedBy.authority: 'oracle'` both already exist.

   **Owed: the annotation, in TWO places.** `web/src/progress/types.ts:49` **and**
   `docs/superpowers/specs/2026-07-17-progressstore-cycle1-design.md:452`, the approved parent the
   code declares itself an exact transcription of. Correcting only the code leaves the approved spec
   still saying the opposite, and **`scripts/check-doc-drift.sh` has no check for this pair** — its
   six checks are board/milestone `next:`, QA role enumeration, closed-milestone prose, Rust test
   count, in-progress plan, and single-live-board — so nothing would catch the re-divergence. This is
   the corrections-do-not-execute-themselves family in its cheapest form. (Examiner F4; the first
   draft named one target.)

3. **`resourcesConsulted` does not exist.** Grepped across `web/src/` and `crates/` on 2026-08-08:
   **zero hits.** `LDB-04` §11 owed this delta and handed it here; D10 makes it load-bearing, because
   opening the strategy table must keep a Presentation out of the window and opening the rule card
   must not. **Owed:** a per-attempt record distinguishing *strategy table* from *rule card*. It
   cannot ride on `Assistance`, which is `'none' | 'retry' | 'instruction'` (`types.ts:35`) and has
   no consulted-a-resource value.

4. **`TableVisibility` and `LDB-04` disagree on wording.** The schema declares
   `'open' | 'hidden' | 'not-applicable'` (`types.ts:32`); `LDB-04` D11 ruled the axis binary as
   **`table-open | table-closed`**. The third value is an N/A marker rather than a Condition value,
   which is fine. **Owed:** one vocabulary reconciliation, so `hidden` and `table-closed` stop being
   two names for one thing.

**Checked and *not* owed, enumerated positively rather than assumed absent:** the replay snapshot
`ALR-018` requires already exists as `ProgressAttempt.engine` and `ProgressAttempt.activity`
(`types.ts:103` / `56-62`, and `106-112`); the session shape needs no field because it is derivable from
`mode` (`types.ts:85`); the diagnostic view needs no field because `EvidenceMode` carries
`'diagnostic'`; the Skill-grain coverage rule needs no field because `evidence.skillId` exists
(`types.ts:79`); and the pace evidence needs no field because `elapsedMs` exists (`types.ts:116`).

### 12. Divergences, surfaced and approved

**Four.** Divergences 1–3 were put to the owner individually on 2026-08-08 and approved before this
document was written. Divergence 4 was found by the examiner pass afterwards and approved the same
day. **All four are approved.**

1. **`ALR-027` requires two bounds; D7 ships one.** The requirement is *"a session-size preset
   resolving to both a target duration and a max activity count."* D7 demotes the duration to a
   displayed estimate. Grounds are in D7; the schema cost is §11 item 1. **APPROVED.**

2. **No streak in v1.** `ACT:388` rejects *loss-framed* streaks; a streak that only counts up is not
   literally forbidden by it. D8 declines the whole mechanic anyway, on the judgement that every
   shipped streak is loss-framed by construction. This is a product judgement going beyond the
   recorded prohibition rather than a divergence from it, and it is recorded as a divergence so the
   distinction is visible. **APPROVED.**

3. **`ALR-029`'s second clause is not built.** *"Preserve open goals and in-progress session state
   when the learner stops"* — D17 preserves committed attempts only. Grounds and the reopening
   condition are in D17. **APPROVED.**

4. **D2 diverges from the approved ProgressStore cycle-1 design.** ⚠ **Found by the examiner pass
   (F3); the first draft asserted the opposite.**

   That draft read *"No approved document says otherwise … the only text pointing the other way is a
   code comment."* **That is false.**
   `docs/superpowers/specs/2026-07-17-progressstore-cycle1-design.md:3` reads *"Status: **approved
   2026-07-17**. Authoritative for the cycle-1 `ProgressStore` foundation"*, and `:452` carries
   `| { status: 'ungraded' }     // responded; no grading authority (e.g. free play action)`.
   `web/src/progress/types.ts:1-4` declares itself *"Transcribed EXACTLY from design §4.1"* of that
   spec, so the code comment is not the origin — it is the copy.

   `LDB-05` D9 (approved 2026-08-05) rules every Free Play decision oracle-graded, and D2 follows D9.
   **The two approved specs disagree and the later one wins**, which is a divergence and is recorded
   as one rather than argued away. **Owner ruling, 2026-08-08: declare it.** §11 item 2 now names
   **both** correction targets.

   Both loci reopened first-hand 2026-08-08.

### 13. Handed forward

**To `LDB-07`** — *interaction UX*:

- **How a Coached session and a Closing run are told apart at a glance**, given D10 makes the
  presence or absence of the strategy table the only difference the learner sees. If those two read
  as one mode, D9's consistency finding is defeated in the UI.
- **How the published Recommender order (D14) is stated in one sentence** without reading as a queue
  the learner must obey — `LDB-04` D9 rules Mastery locks nothing, and the order is a steer, not a
  gate.
- **The debrief's ordering** — D16 rules what is present; `LDB-05` D12 already assigned decision
  quality above profit and loss to you.
- **The "nothing is due" session goal** (D8). It is the honest state and it must not read as an
  ending.
- **The naming collision `LDB-05` §13 already sent you** — *Free Play* versus *Free Learn*, with
  **Practice** proposed. D13 makes Practice's scope concrete, which may help settle it.

**To `LDB-08`** — *the blueprint*:

- **The storage boundary is one decision, not two** (D17). Wallet persistence and window persistence
  both force it; the Tool & Runtime Admission Protocol in `docs/specs/stack-boundaries.md` should be
  run once over the pair.
- **D2 changes the phase-5 instrumentation calculus.** If Table sittings feed the window, a slice
  that instruments Free Play covers `P-1` and `A-13`. **The `A-20` half is withdrawn:** `A-20`'s
  named test is `adherence-under-loss` divergence, and D2's scope limit makes table evidence
  non-window-eligible for exactly that Skill. `A-20` still shares the `P-1` instrument per `LDB-05`
  §13, so it is not unreachable — but a Free Play slice does not cover it for free, and
  `adherence-under-loss` must be instrumented in a Learning session. (Examiner F5.)
- **`A-07e` and `A-07f` both close from stored attempts with no new instrument**, so neither adds
  cost to the slice.
- **Four schema deltas are owed (§11)**, of which only item 3 (`resourcesConsulted`) is a new field.

**To phase 5:**

- The session-size presets are **config, not constants** — the same reducer-seam principle `LDB-04`
  §13 set for `k` and `n`, so `A-07e` can be tested against re-parameterised replays.
- `'time-bound'` must not acquire a producer (§11 item 1).

### 14. Vocabulary owed to `CONTEXT.md` — to land at approval, not before

Five terms. **One is a correction to this document's own drafting**, recorded rather than quietly
fixed: the session shape now called **Coached session** was drafted as *Drill*, which collides with
`CONTEXT.md`'s existing `_Avoid_` lists — **drill** is already banned on **Cell**, on **Practice**,
and on **Activity type**. The glossary caught it; the draft did not.

All five land under a **new `## Sessions` heading** in `CONTEXT.md`, between `## Learning model` and
`## Economy` — naming the section so the landing is checkable, the convention `LDB-04` §16 and
`LDB-05` §15 both used.

- **Learning session** — A bounded run of Presentations with a named goal, a learner-chosen size, and
  a debrief. Covers curriculum work and Practice. _Avoid_: session (unqualified), lesson, round.
- **Table sitting** — One Free Play visit, from Buy-in to cash-out. _Avoid_: session (unqualified),
  game, visit, run.
- **Coached session** — A Learning session that repeats a segment until clean, corrects immediately,
  and may use `arranged` Provenance mode. _Avoid_: drill, practice session, training run.
- **Closing run** — A Learning session or Table sitting that plays one whole shoe in `organic`
  Provenance mode, with no strategy table and no correction until the debrief. _Avoid_: test,
  assessment, exam, final.
- **Recommender** — What proposes the next Skill to work on, from the live Mastery window and
  recency. Never a Grading authority, and never a lock. _Avoid_: scheduler, planner, algorithm, AI.

**`Recommender` is included because two approved specs lean on it across three loci, and neither
defines it** —
`LDB-04` D2 (*"the recommender above all — reads the live window"*), `LDB-04` D8 (staleness), and
`LDB-05` D5.2 (*"the recommender's suggestion becomes the economically preferred path"*).

**Two `journal/decisions.md` rows, also at approval** — hard to reverse, surprising without context,
and the result of a real trade-off, which is the three-part test:

1. **Engineered exposure teaches; an organic Closing run closes the claim** (D3) — with the bridge
   §4.6 / §7 contradiction named as what it resolves.
2. **The three unordered Condition axes stay unordered; table character carries the progression**
   (D5) — with the note that this asserts no learning order and files no row.

`docs/adr/` is **not** created. `docs/agents/domain.md` and `AGENTS.md` both rule decisions live in
`journal/decisions.md` and that `docs/adr/` must not exist here.

### 15. Approval criteria — checkable

Each is a positive enumeration — what was looked for, and where — because a criterion that can only
fail when a record exists passes silently on a missing one.

1. **Session entry, size, stopping and mix are each decided.** D6, D7, D8, D4 — four decisions, named.
2. **The session-size numbers carry register rows.** `A-07e` (three presets) and `A-07f` (the
   separation gap), both specified in §10 with a named validation method and a mode.
3. **The blocked-versus-mixed rule is stated per Activity type.** D4's table has **6 of 6** rows: two
   rulings, one exemption with its reason, three `n/a` with their reasons.
4. **The bridge contradiction is resolved in writing.** D3, naming §4.6 and §7 explicitly, resolving
   in terms of what evidence a session must yield, and citing the code locus that makes it buildable.
5. **All six `LDB-03` parameters carrying `owner: LDB-06` are valued.** The parameter table lists six;
   checked against `2026-08-01-activity-taxonomy.json` on 2026-08-08 — `feedbackTiming`,
   `segmentation`, `pace`, `ruleCardAvailable`, `revealMode`, `region`.
6. **Every item `LDB-04` §13 and `LDB-05` §13 handed here is answered or explicitly declined.**
   `LDB-04`: the `"faded"` trajectory → D10; the `resourcesConsulted` delta → §11 item 3; D7's organic
   minimum → D3; engineered exposure remains available → D3. `LDB-05`: when Practice opens → D13;
   nothing bounds practice → D8, answered partially and said so; the `Review due` full-rate coupling →
   D14; the `"faded"` / D9 interaction → D10 with D2.
7. **Divergences are surfaced, not applied silently.** Four, each in §12 with its approval; for
   divergence 1 its schema cost, and for divergence 4 both of its correction targets.
8. **No claim describes a source that was not opened.** Sources reopened first-hand for this document
   on 2026-08-08 and named as such: `run/U3/audit.md:31,33`; `run/U1/audit.md` rows `U1-5` and `U1-8`;
   `crates/blackjack-core/src/shoe.rs:62-100`; `web/src/progress/types.ts:1-179` (the whole file); the four binding
   specs and the bridge. **Explicitly relayed rather than opened.** Relay is marked inline at D1, D6, D8, D9 and D14; it is
   *not* separately marked at D7, D16 and D17, which quote `ALR-025`, `ALR-018` and `ALR-029` — read
   this list as the authority on what was relayed, not the inline marks. **The full relay set is:**
   every
   `ALR-*` / `ACT:*` quotation comes from
   `docs/superpowers/research/evidence-index/activity-and-storage-catalog.md`, not from the activity
   baseline itself; and the Brummer et al. (2024) quotation comes from that index quoting
   `V-U4.md:39-43`, neither of which was opened here; **Kornell & Bjork (2008)**, quoted at D4 and D16
   through `run/U3/audit.md:31,33`; and the **SACAA facilitator guide / `U1-S6`**, quoted at D3 and D9
   through `run/U1/audit.md`'s `U1-5` and `U1-8` rows. The last two were omitted from the first
   draft's list, which also claimed relay was labelled at every use (examiner F1).

### 16. The examiner pass — what it found, and what landed

**An adversarial `audit-examiner` pass was run on the first draft on 2026-08-08, before the gate**,
because this document was written by the same session that ran its design interview and this
repository's recorded failure mode is that a session's own rules do not fire on its own errors.

**48 claims assessed: 36 Preserve, 12 Revise, 0 Relabel, 0 Replace, 0 Remove.** No claim was
contradicted outright. All twelve Revise findings are landed in this document; the two that changed a
ruling rather than a citation were put to the owner and decided by them.

| # | Finding | Landed as |
|---|---|---|
| **F5** | D2's *"counts exactly like any other"* overreached. `deal-and-decide`'s `produced` contract requires the Classification for `classificationIncluded: true` Skills; a table decision produces the action only. | **Owner call:** D2 scoped to `hit`/`stand`/`double`/`split`. Propagated to the Solution, D9 and §13, where the `A-20` coverage claim is **withdrawn**. |
| **F3** | §12 claimed no approved document contradicted D2. The approved ProgressStore cycle-1 design `:452` does. | **Owner call:** new §12 **divergence 4**; §11 item 2 now names both targets (**F4**). |
| **F2** | D5 attributed a verbatim sentence to `LDB-01` §4; it is the board card's `FROM LDB-01` handoff (`journal/tasks.md:51`). **Second occurrence of the class `LDB-04` §12 divergence 0 caught.** | Re-cited at D5, with the recurrence named. |
| **F12** | D4 attached bridge §1.1's *"grade-7 mathematics, n = 140"* caveat to Kornell & Bjork's figures — a different study — while labelling them `[Evidence-backed]`. | D4's caveat rewritten; both studies' limits stated. |
| **F9** | Out of Scope asserted `Assistance` retains `'instruction'`; `LDB-04` **D15** ruled it renamed to `'retry-2'`. | Corrected; §11 item 3's argument unaffected. |
| **F1** | §15 criterion 8 claimed relay was *"labelled at each use"* and omitted two relayed primary sources. | Claim narrowed; Kornell & Bjork and the SACAA guide added to the relay set. |
| **F6** | D13's one-exposure definition was attributed to `CFL-007`; the count language is at bridge §4.6 item 2. | Re-cited; the D4/D13 scope distinction stated. |
| **F8** | D11 said the predict-first shape is *"covered by the register"*; `A-22` covers the sandbox. | Re-attributed to `LDB-04` D12 and the taxonomy note. |
| **F7** | D3 and `LDB-04` D7 both say "one" and count different units. | Stated explicitly; D7's *"It leaves LDB-06 free"* quoted. |
| **F10 / F11** | Two miscounts — "three approved specs" (two, across three loci) and "three schema loci" (two). | Both corrected. |

**Non-material notes taken:** the `types.ts` read-range (the file is 179 lines, not 200); `ALR-031`'s
verification quote restored to its full clause; `A-07e`'s declared mode changed to **playtesting** to
match `A-08`, whose instrument it shares; and §14 now names the `CONTEXT.md` heading the five terms
land under.

**What the examiner could not check, carried forward rather than left silent.** That the reopenings
happened on the date claimed (it has no shell and no history access); the five external sources
(the SACAA guide, Kornell & Bjork, Brummer et al., `V-U4.md`, the `ACT:` baseline), none of which is
in this repository — every claim resting on them is audited only as far as the in-repo relay, which
is what F1 is about; and whether §10/§14's promised landings landed, which they had not, by design.
It confirmed the pre-gate state positively: the register still ends at `A-07c`, and `CONTEXT.md`
carries none of the five terms.

**One defect in the audit itself, recorded rather than smoothed.** The examiner reported F2's string
as *"one hit, in this file"* having grepped only `docs/superpowers/specs/`, and had stated it did not
open `journal/tasks.md` — where the string actually lives. The finding was right; its absence claim
was scoped narrower than it read. That is failure class 3 appearing **inside** the pass built to
catch failure class 3, which is the recurrence `AGENTS.md`'s first evidence rule records twice.

**Not confirmed.** The examiner states that none of its verdicts is confirmed and that a separate
instance should re-check them. Nine of the twelve were re-checked first-hand against the raw files
before landing — F2, F3, F5, F6, F9, F10, F11, F12 and the `A-22` text behind F8 — and all nine held.
**F1, F4 and F7 were landed on the examiner's reading without independent re-check**, and that is
recorded here rather than left as an implied verification.
