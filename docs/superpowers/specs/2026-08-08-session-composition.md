# Session Composition — LDB-06

> **Status: APPROVED by the owner 2026-08-17 at the `user-approval` gate. Authoritative.**
>
> Drafted 2026-08-08; revised 2026-08-15 and twice on 2026-08-17 — at the gate grill, and again at the
> composition pass the owner held the gate open for. That pass found **five** defects in D14's
> `secondaryFor` branch alone, added **D18 (Tutorial)** and D9's property-based legality rule, and
> filed **§12 divergence 10**. The gate record — what it found, the two defects that had already
> reached other specs, and the risk the owner accepted — is in `journal/decisions.md` under
> *"`LDB-06` APPROVED"*.
>
> **§14's vocabulary and §13's `journal/decisions.md` rows have landed**, per the convention `LDB-04`
> §16 and `LDB-05` §15 both set. §14's **Unmeasured Activity** entry was corrected on landing: it
> defined the class by two clauses selecting different sets, and admission route is what defines it.
>
> **Not verified.** Every repair in the 2026-08-17 passes was written by the session that found the
> defect. The owner approved knowing this, on the reasoning recorded in the gate record; phase 5's
> first task converts §11 item 8 from prose into one test per clause.
>
> Phase 4 deliverable 6. Consumes the approved `LDB-01`, `LDB-03`, `LDB-04` and `LDB-05` specs and
> values the six `LDB-03` parameters this card owns.
>
> **The divergences are recorded in §12, which states their count and dispositions; this header
> deliberately restates neither.** Each entry states its cost there, or states that it has none.
> Three were surfaced and approved
> by the owner on 2026-08-08 before this document was written; the fourth was found afterwards by the
> `LDB-06` examiner pass and approved the same day. §16 is the audit record.
>
> **Divergences 5 and 6 are new on 2026-08-15, and both reverse this document's own rulings.** The
> owner **held the gate open** on 2026-08-14 rather than ruling on it, in order to grill phase 4 on
> playability and change-agility first; that session ran 2026-08-15 and settled twelve decisions,
> three of which land here. **What changed:**
>
> - **D2** — the scope limit gains an **opt-in Classification capture** at the table, so a learner who
>   names the hand shape reaches the bar for all eight Skills rather than four (divergence 5).
> - **D3** — the per-session organic **Closing run is WITHDRAWN**. It deadlocked against D7 and D8, and
>   `LDB-04` D7 already carries the guarantee. The bridge resolution D3 exists to deliver is unchanged.
> - **D8** — no-streak becomes an **up-only streak**, with a standing rule that a removal must name its
>   replacement (divergence 6).
>
> The grill also produced work outside this document: `LDB-09` (re-verdict the unadopted catalog
> patterns for play; rule the eight `state-report` Skills), `LDB-10` (land the ten unapplied Phase 3
> corrections), and ROADMAP amendments placing the economy in phase 5. **`LDB-09` was approved on
> 2026-08-15 and did change the Activity type set: 6 types → 11**
> (`2026-08-15-play-verdicts-and-ungraded-activities.md:129`;
> `2026-08-01-activity-taxonomy.json:174,193,217,239,262`). That is larger than the extra rows in
> D4's table this paragraph anticipated — it also broke §15 criterion 3's hard-coded count (`RC-11`)
> and left the Recommender with no way to select any of the five new types (`RC-04`). Both are ruled
> below. (`RA-03`, corrected 2026-08-17.)
>
> **A third grill ran 2026-08-17 and closed this document's gate questions.** It settled the gate
> rulings raised over the two-instance examiner pass of 2026-08-15, recorded in
> `docs/superpowers/audits/2026-08-15-ldb06-redraft-corrections.md` and landed here; §17.1 states
> how many, and this header does not restate it. The divergences new from that session are marked as
> such in §12.
>
> > **Counts removed from this header 2026-08-17.** It read *"Eight divergences … seven approved, one
> > struck"* against §12's **nine**, *"divergences 6 and 8 cost nothing"* against a §12 that
> > **strikes** divergence 6, *"settled **fourteen** rulings"* against §17.1's **13**, and
> > *"divergences 7 and 8"* against §12's *"7, 8 and 9"*. §15 criteria 3 and 7 were rewritten the
> > same day to stop restating memorised counts and read them from source; the repair never reached
> > the header forty lines above them. Same repair, applied here.

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
> shoe, in `organic` Provenance mode, with no correction until the debrief; **inside a Learning
> session it does not offer the strategy table, and at a Table sitting the table is available on
> request at the cost of window eligibility** (§12 divergence 7).
>
> **A Table sitting is a Closing run that the learner paid to sit at** — and its decisions count for
> Mastery on the four action Skills, `hit`, `stand`, `double` and `split` — and on the other four
> too, whenever the learner takes D2's optional Classification capture. A table decision where they
> say nothing reaches the action Skills only, because the table never asks for a Classification (D2,
> §12 divergence 5).

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
15. As the owner, I want the blocked-versus-mixed rule stated per Activity type, so that the types it
    cannot apply to say so instead of being silently skipped.
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
This use leans on the **mission clause**, which is the half that survived the 2026-08-17 re-grounding
(see D8); `ACT:388` carries no research weight and its `SCI-007` citation was dropped at source.

**Why not three.** Curriculum work and Practice differ in **what fills the pool**, not in shape: same
entry, same size choice, same stopping, same debrief. That is a pool-source parameter, not a second
concept.

**What this card does *not* touch.** A Table sitting's boundary is already ruled by `LDB-05` D2 —
Buy-in is a real transfer bounded by the Table tier, cash-out returns the whole remaining Table
stack. This document does not reopen it. What it owns inside a sitting is the Condition settings and
the evidence question (D2).

`[Product judgement]`

### D2. A Table sitting's decisions enter the Mastery window — four Skills by default, eight on request

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
> **Two escapes were considered. One is declined; the other was taken on 2026-08-15.** Inferring the
> Classification from a correct action stays declined — it asserts the converse of `A-23`, whose
> whole worry is a learner *"produc[ing] the correct action many times without ever having to notice
> a hard 16 arise."*
>
> **The escape now taken: an optional Classification capture at the table.** ⚠ **Owner decision,
> 2026-08-15 — see §12 divergence 5.** The learner may name the Classification before acting. If they
> do, the Presentation meets `deal-and-decide`'s `produced` contract and reaches the bar for **all
> eight** Skills. If they do not, it reaches the four action Skills only, exactly as the scope limit
> above rules. The control is `LDB-07`'s to design.
>
> **Why the 2026-08-08 objection does not survive.** That draft declined this escape on the ground
> that it *"bends the honest simulator, which `product-vision.md:69-71` fences off."* Reopened
> 2026-08-15: `:69-71` permits the learning layer to help **around** the game — optional table access,
> hints, count tools, post-session feedback — and forbids **manipulating cards for lesson purposes**.
> An optional control the learner may ignore manipulates no card and changes no card flow. It is the
> same shape as `LDB-04` D4's *"show me"*, which is already approved and already sits at the table.
> The fence was cited against a mechanic it does not cover.
>
> **What the scope limit was costing, stated because it is the reason this reopened.** Under it,
> `classify-hand`, `strategy-action`, `legal-fallback` and `adherence-under-loss` — the four Skills
> that are the product's differentiator — could **never** be mastered at a table. The founding
> commitment bridge §1.7 states, *"measure play, not quiz scores,"* was literally true only of
> `hit`/`stand`/`double`/`split`. The four best Skills were reachable only through a Learning
> session. That inversion arrived as a side effect of a taxonomy `produced` contract, not as a
> product ruling, and the owner declined to keep it.
>
> **The scope limit itself is not deleted.** It is now the *default* rather than the ceiling, and it
> still governs every table Presentation where the learner says nothing — which will be most of them.
>
> **This was found by the `LDB-06` examiner pass (F5) after the first draft ruled it unqualified.**
> Owner call, 2026-08-08: scope it. Owner call, 2026-08-15: give it an opt-in escape. See §16.

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

`[Evidence-backed]` on the derivation from `LDB-05` D9 and `LDB-04` D6, on the `produced`
contract the scope limit reads off, and on the **`docs/specs/product-vision.md:69-71` re-reading at
the bridge's §4.6 requirement list (`2026-07-22-product-design-inputs.md:279-285`)**, reopened
first-hand 2026-08-15 — added because the redraft
introduced that source claim and left it outside this line, and `AGENTS.md`'s fourth evidence rule
requires every claim labelled (`RA-08`); `[Product judgement]` on the ruling and on accepting
consequence 3.

### D3. Engineered exposure teaches; `LDB-04` D7's organic floor closes the claim

**This resolves the bridge contradiction the card owes.** `2026-07-22-product-design-inputs.md` §4.6
states *"Rare-event exposure must be deliberate"* as a **requirement**; §7 lists *"Whether rare-event
exposure is engineered or organic (§4.6)"* as an **open decision candidate**. Both were written into
the same document.

**They are not in conflict once *exposure* is separated from *evidence*.** §4.6 is about the
curriculum not *waiting* for the shoe — which bridge §1.2 `[VERIFIED]` justifies, since
experience-taught learners systematically underweight rare events. §7 is about whether the product
engineers the encounter. The resolution takes both: **engineer the encounter; `LDB-04` D7 already
requires the organic close.**

**The shape is `U1-8`, and it is in the archive rather than invented here.** SPOT, per the
SACAA-approved facilitator guide §9.3, quoted in `run/U1/audit.md`'s `U1-8` row and reopened
first-hand 2026-08-08: *"This can be practiced several times by use of re-positioning and repetition
of the phase of the approach that needs attention. Once all phases have been satisfactorily been
completed, a \"full\" simulation of the approach from start to finish can be demonstrated and
experienced by the student as a whole."* `[sic, source grammar]`

> ### The per-session Closing run is WITHDRAWN — owner decision, 2026-08-15
>
> The 2026-08-08 draft translated `U1-8` into a rule of its own: *"a Learning session whose pool was
> `arranged` does not end without a Closing run over the same material, in `organic` Provenance
> mode."* **That rule is withdrawn.** It was invented here, it was strictly larger than the floor it
> sat on, and it deadlocked against this document's own D7.
>
> **The deadlock, which no pass caught — not the design interview, not the examiner.** D7 bounds a
> Short session at 10 Presentations. D8 rules that *"no activity begins after a bound or explicit
> stop."* D9 makes a Closing run `segmentation: whole-shoe`. So a learner who picks Short, drills an
> arranged pool, and reaches Presentation 10 hits a bound that forbids starting anything — while the
> withdrawn rule forbade the session ending. **A Short arranged session could not legally end.**
>
> **And the obvious repair was already foreclosed.** A Table sitting *is* a Closing run (D9), so it
> looks like the cheap way to discharge the obligation. But D7's organic floor applies only to
> `classificationIncluded: true` Skills, and D2's scope limit — the examiner's own F5 fix — had just
> made table evidence non-window-eligible for exactly those. **The F5 fix silently removed the
> cheapest route to satisfying the rule F5 did not touch.** Two correct local repairs composing into
> a dead end is the failure mode this document's §16 exists to catch, arriving one layer above where
> §16 was looking.
>
> **Nothing is lost by withdrawing it**, which is why this is a withdrawal and not a trade.

**What now carries the organic close: `LDB-04` D7, unchanged and already approved.** At least one
`organic` Presentation in the window for any Skill with `classificationIncluded: true`. D7 explicitly
left the session-shaped half here — *"Engineered exposure still teaches, still practises, and still
fills most of a window — it simply cannot be the only thing a learner ever met"* — and this card's
answer is now that **no session-shaped rule is needed**: D7 is a claim about a Skill's window, which
is exactly the form the card asked for (*"resolve the contradiction in terms of what evidence a
session must yield rather than in terms of what the engine can do"* — `journal/tasks.md:63`, quoted
verbatim; the redraft paraphrased the opening clause as *"resolve it"*, `RA-11`), and it binds across
sessions rather than inside one. A per-session rule could only ever
have been the same guarantee, scoped worse.

**It is buildable without faking card flow.** `crates/blackjack-core/src/shoe.rs:62-66`, reopened
first-hand 2026-08-08: `create_prefix_shoe` builds a real shuffled shoe and swaps a chosen opening to
the top, *"each arranged card replaces one shuffled card of the SAME rank+suit, so total and
per-rank/suit composition are unchanged"*, with arranged cards carrying arranged-origin ids. The
`AGENTS.md` constraint is satisfied, not dodged.

**And the rare-event *description* is not a lesson unit.** Per `LDB-01` decision B2, it arrives as a
post-shoe debrief, a captured prediction, or frequency framing in copy. D16 places it; D11 places the
prediction.

**The two "one"s no longer need telling apart.** The 2026-08-08 draft carried a paragraph explaining
that `LDB-04` D7's *one organic Presentation in a Skill's window* and this card's *one whole organic
shoe per arranged session* counted different units (examiner F7). With the second withdrawn, there is
one "one" and it is D7's. **The examiner finding stands and its subject is gone** — recorded rather
than quietly dropped, because F7 was correct and a reader of §16 will look for what became of it.

**A Coached session may still end on its own.** After the withdrawal, an arranged Learning session
closes on any of D8's four exits with nothing owed. Whether the learner has met the Skill organically
is a question about their **window**, answered by `LDB-04` D7 whenever Mastery is computed — not a
debt the session carries, and therefore not something D17 has to persist across a reload. The
withdrawal removes an obligation that had no carrier as well as one that deadlocked.

**Strictness stays at D7's one, deliberately.** A number of organic hands would be a constant with
nothing behind it and would need its own row. `A-23` is the standing row and its named validation
method — an arranged-only arm against a mixed arm, tested on organic play, scoring classification
errors separately — is what would justify raising it.

`[Evidence-backed]` on the two source quotations and on the code locus; `[Product judgement]` on the
ruling and on the 2026-08-15 withdrawal.

### D4. Blocked versus mixed, stated per Activity type — and it applies to three of eleven

`CFL-007` is already resolved (bridge §7, user decision 2026-07-22): *block to introduce, interleave
to practise; mixed review is not a final stage, it is the steady state.* What was unresolved is that
the rule is meaningless for most Activity types — the table below carries one row per type declared
in the taxonomy and says which, rather than this sentence restating a count — and the card requires it stated per
activity rather than once.

| Activity type | Ruling | Why |
|---|---|---|
| `deal-and-decide` | **Mixed by default.** Blocked permitted **only** for first exposure to a Classification, declared as such, and **only inside curriculum work** — never in Practice, never at a table. | The discrimination task bridge §1.1 measures. |
| `state-report` | **Mixed. No first-exposure exception.** | Its Skills are not confusable categories in the sense §1.1 measures; `card-values` and `hand-total` are not told apart, they are read off. |
| `policy-paint` | **Exempt, with the reason recorded.** | Under `LDB-04` D6 it produces **no Mastery evidence at all**. The interleaving argument has nothing to attach to. Its span is governed by `region` (D12) instead. |
| `rule-card-read` | **n/a** — one ruleset per Presentation. | |
| `predict-then-reveal` | **n/a** — one prediction per shoe. | |
| `rule-contrast` | **n/a** — a contrast of two rulesets *is* the content. | |
| `hand-sort` | **Mixed. No first-exposure exception.** | Added 2026-08-17. |
| `estimate-and-check` | **n/a** — one quantity per Presentation. | |
| `procedure-order` | **n/a** — one procedure per Presentation. | |
| `principle-name` | **n/a** — the five situations shown *are* the mixture. | |
| `rule-battery` | **n/a** — one assembled rule per Presentation. | |

> **Five rows added 2026-08-17 for `LDB-09`'s new types** (`RC-11`). Four are `n/a` on the same
> grounds as the three above them: the type presents one object per Presentation, so there is no pool
> to block or mix.
>
> **`hand-sort` is the one that is not `n/a`, and it is not an exemption either.** It would have been
> easy to file all five alongside `policy-paint` as *"exempt — produces no Mastery evidence, so the
> interleaving argument has nothing to attach to."* That reasoning does not survive contact with what
> `hand-sort` is: dragging a dealt batch into **pair / soft / hard** is a discrimination task over
> confusable categories, which is exactly what bridge §1.1 measures and exactly what the Kornell &
> Bjork result below is about. **A blocked `hand-sort` is a sorting task with one bin** — it does not
> merely lose the interleaving benefit, it stops being the activity.
>
> That the type produces no evidence changes what it may *certify*, not how it should be *built*.
> Filing it as exempt would have let a measurement rule decide a design question, which is the
> inversion `LDB-04` D6 warns about pointed the other way round.

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
finding (`2026-07-22-product-design-inputs.md:91`, its caveat at `:100`) and is carried by `A-15`. Adult blackjack transfer
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
Recommender (D14) and **overridable to any Skill the learner has reached** — see the block below.
**The first activity is on screen before any choice is required** — that is `ALR-026`'s second half
and it means a session never opens with a menu. Constraint 1: a chooser before a hand is a steepness
the product does not need.

> ### The override set is what the learner has reached, not what they have already touched — owner decision, 2026-08-17
>
> This read *"overridable to any **covered** Skill (D13)"*. D13 defines covered as **at least one
> recorded Presentation**, and D14's band 3 is **no evidence yet** — so the override set and band 3
> were **exact complements**, and a learner could never choose first contact. Someone curious about
> splitting had to wait for the shoe to deal them one. Found by the composition pass of 2026-08-17.
>
> **D13's "covered" was the wrong test to borrow.** D13 governs **Practice availability** — the refill
> route `LDB-05` D3 depends on — which `RC-10` already established answers a different question from
> the one D4 answers. This decision borrowed it for a third question it was never about.
>
> **The set is now: any Skill in a Unit the learner has reached** (`CONTEXT.md`, **Unit**; owner
> ruling of 2026-08-17 recorded in `journal/decisions.md`). Units are ordered and they lock: forward
> one at a time, backward freely over anything cleared, and further ahead only by passing a test on
> what is being skipped. **Where the Unit boundaries fall is `LDB-08`'s to cut** (`A-30`), so this
> decision states the *rule* and not the *cut*, and needs no edit when the levels are drawn.

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
| **Short** | 10 Presentations | Deliberately equal to `n = 10`, so one Short session can fill **at most** one Mastery window. |
| **Standard** | 25 Presentations | |
| **Long** | 50 Presentations | |

**Minutes are displayed as an estimate and never enforced.** ⚠ **This diverges from `ALR-027`, which
requires a preset to resolve to *both* a target duration and a maximum activity count. Approved by
the owner 2026-08-08 — see §12 divergence 1.**

Grounds: a wall-clock bound in a product where hand length varies is a timer; the count is **the unit
the learner experiences** — ten things they did; and `ALR-025` (`ACT:269`)
already licenses duration as *"versioned planning input"* that *"must never become a correctness,
mastery, or accessibility penalty"* — an estimate is exactly that. The recorded conflict behind
`ALR-027` is entirely about minutes (Duolingo "a few", Brilliant fifteen with a two-minute option),
and the archive's own verdict is *"the research does not establish universal minutes."*

> ### The bound counts **every** Presentation, Unmeasured ones included — owner decision, 2026-08-17
>
> `LDB-09` D11 handed this question here and declined to choose: an Activity type that produces no
> mastery evidence either consumes the bound or does not. **It consumes it.** A Short session is ten
> things the learner did, which is what a learner counts.
>
> **The cost, stated rather than left to be discovered: a session that is more fun holds less
> evidence.** Three rounds of `hand-sort` in a Short session leave seven graded hands. That trade is
> accepted, and **D14's type-selection rule decides the mix rather than a cap** — a ceiling on the
> Unmeasured share would be a number with nothing behind it, which `A-07` forbids.
>
> **This retires one of the grounds above, and the retirement is the honest part.** The 2026-08-08
> draft justified counting by Presentation on the basis that *"the count is the same unit the Mastery
> window counts, so bound and evidence are commensurable."* **That was already false when it was
> written.** An abandoned Presentation consumes the bound and fills no window (`LDB-04` D5); a
> chart-open Presentation consumes it and fills no window (`LDB-04` D4). Unmeasured Activities make an
> existing approximation visible rather than creating one — which is why the Short row above now reads
> *at most* one window rather than *exactly* one. (`LDB-09` D11; `RC-01` is separate and ruled at D9.)

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
with no cooldown, ever.** Constraint 2, and `ACT:388`'s rejection of penalties for ending a session
— **on its mission clause, which is the half that survived the 2026-08-17 re-grounding** (see the
D8 streak passage below). That clause rests on `ALR-027`–`ALR-029`, this product's own non-punitive
stopping requirements, and needs no research citation to stand.

**Abandonment is already ruled and needs nothing here.** `LDB-04` D5: an abandoned Presentation is
recorded, excluded from the window, and **not** counted as a failure. `AttemptDisposition` carries
`{ status: 'abandoned' }` as a real domain value (`types.ts:50`, read first-hand). Stopping mid-hand
is abandonment and costs nothing.

**No streak ships in v1. A forgiving weekly one is designed and deferred to the account.**
⚠ **Settled 2026-08-17 at the gate grill, after two prior reversals — see §12 divergences 2 and 6 for
the full history, which is preserved rather than flattened.**

The ruling moved three times: no streak (2026-08-08) → an up-only day counter (2026-08-15) → **no
streak in v1, with a forgiving weekly streak designed and triggered by the account** (2026-08-17).
The final position matches the first in **outcome only**. The 2026-08-08 reasoning —
*"every shipped streak mechanic is loss-framed by construction: its entire motivational force is the
fear of losing it"* — is **not** restored, because the evidence pass contradicted it specifically:
the only located study testing the mechanism found the effect running through *sense of
accomplishment*, not negative emotion, and loss aversion itself is contested in two recent
re-analyses. Right answer, wrong reason.

**What was struck, and why it was not simply kept.** The up-only counter incremented on any committed
Presentation on a calendar day (`RC-06`, and that unit choice was correct — a *session* count would
have risen for a learner who tapped "stop" and not for one who closed the tab, punishing one way of
ending, against D8's own *"stopping is never punished"* and user story 13). It needed no new field;
`occurredAt` is already on the attempt. What defeated it was not its unit but its **evidential
standing**: no study compares a never-falling counter with a resettable one, and in the one study
that separates the parts, an *intact* streak did not significantly outperform showing no streak at
all, while the *break* carried the reliably measurable effect. Removing the break may remove the
mechanic. Building the untested variant when two evidenced designs existed unexamined was the error.

**What is designed instead.** A **weekly** window; the week counts when it contains **any committed
Presentation**; forgiveness that is free, earned by studying and auto-applied, never purchased; and
gain-framed copy weighting a new streak equally with a continued one. Attendance rather than mastery
is deliberate: `LDB-04`'s window is 8-of-10 with a ratchet, so a learner can practise hard for a week
and move no bar, and a mastery-gated streak would punish real work for not being productive enough.

**Why it waits for the account.** The honesty of the mechanic depends on the number being true, and
browser-local IndexedDB is per-device: a phone, a private window or a cleared cache drops it. A
counter that cannot fall by design but falls by infrastructure delivers loss framing through an
unguarded door. Trigger: accounts exist. See `journal/decisions.md` 2026-08-16.

> **`ACT:388` is re-grounded, and this reaches past D8 — 2026-08-17.** Every version of this ruling,
> in both directions, rested on `ACT:388`: *"Loss-framed streaks, leagues, or penalties for ending a
> session"*, reason *"Controlled pressure conflicts with non-punitive stopping and the
> training-product mission."*
>
> **Its evidence column cites one research source, and that source cannot carry it.** Read
> first-hand 2026-08-17: `docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md:388`
> cites `SCI-007` plus `ALR-027`–`ALR-029`, and `:45` registers `SCI-007` — Howard et al. (2021),
> *Perspectives on Psychological Science* — with the limitation *"Mostly correlational samples; **does
> not prove a specific interface mechanic causes autonomous motivation**."* A source registered as
> unable to support a mechanic claim was the sole research ground for a mechanic **rejection**. The
> mismatch is checkable inside this repository and needs no journal access.
>
> **What survives is the mission clause**, resting on `ALR-027`–`ALR-029`, this product's own
> non-punitive stopping requirements. That is a `[Product judgement]` and it stands without a
> research citation. `ACT:388`'s own row is corrected at source; **D8's no-cooldown ruling above is
> the second consumer** and is re-grounded with it.
>
> **Deliberately not written here:** what Howard et al. *does* support. The evidence pass reports it
> favours identified regulation — acting from personal value — which would be a better ground than
> the one dropped. **That reading is relayed twice over, through an agent and through an abstract,
> and no one in this repository has opened the paper.** Writing it would add a second-hand claim to a
> passage being corrected for containing one. Owed as a named follow-up, not as prose.

**`product-vision.md:90` is satisfied by absence in v1, and the absence is recorded.** It forbids
punishing a learner for ending a session. No streak exists to punish anything.

> **What `LDB-05` D12 did and did not license — retained, because it corrected a real error.** The
> 2026-08-15 draft said D12 *"already anticipated exactly this shape"*, quoting *"if streaks exist at
> all they are gentle, XP-layer only"*. **That quotation stops one clause early.** D12 continues *"and
> they remain a non-binding progression idea **rather than an approved mechanic**"*
> (`2026-08-04-motivation-and-chips-economy.md:524-527`). D12 constrains what a streak may look like
> if one ships; it does not pre-approve one. (`RA-14`.) **The correction outlived the ruling it
> corrected** — the deferred weekly streak still claims no licence from D12, and when it is built it
> will need its own approval rather than inheriting one.

> **The removal rule fires on this ruling, which is the first time it has fired on its own author.**
> D8 removes the return-cadence mechanic and must therefore name what carries that motivation
> instead. **Nothing does.** Every surviving mechanic — XP, the chips economy, the Player score,
> mastery bars, the Recommender's goal — rewards depth *within* a session; none rewards coming back
> tomorrow. That gap is real, it is unfilled in v1, and it is stated here rather than left for a
> thirteenth item on a list nobody assembles until it is thirteen long. `A-29` in the assumption
> register carries the claim that the deferred weekly streak will fill it.

> **The standing rule this comes with: a removal must name its replacement.** ⚠ **Owner decision,
> 2026-08-15, binding on every later card — see §12 divergence 6.**
>
> Enumerate what the blueprint had removed before this ruling: streaks, timers, cooldowns,
> self-rating, leaderboards, win celebration, cumulative profit and loss, surfaced verdicts, locks,
> gates, loss framing, pass marks. **Every one is individually well argued and the list is still too
> long.** `LDB-05` §0.1 names the mechanism — *"this repository has a
> documented habit of designing the fun out of things by making every mechanism safe"* — and then D8
> removed streaks anyway, three decisions later, in this document. **A rule stated in a spec did not
> fire on the spec that stated it**, which is this repository's recorded failure class applied to
> motivation instead of to citations.
>
> So: **from 2026-08-15, a design document that removes a motivational mechanic must name what
> carries that motivation instead, or record that nothing does.** Not a gate and not a veto — a
> sentence. The cost of the rule is one line per removal; the cost of its absence is a list of twelve
> that nobody assembled until it was twelve long.

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

`[Product judgement]` throughout; `[Evidence-backed]` on the two code loci.

**`ACT:388` was labelled `[Evidence-backed]` here until 2026-08-17 and is not.** It is a
`[Product judgement]` — its mission clause rests on this product's own `ALR-027`–`ALR-029`, and its
one research citation was dropped at source as unable to support a mechanic claim. The streak
evidence gathered at the gate is `[Evidence-backed]` but **relayed**: it lives at
`docs/superpowers/research/design-evidence/2026-08-17-streak-mechanics.md` — tracked, and
relayed: no one
in this repository has opened any of its 18 external sources. The two claims sourced from it in D8 —
that the mechanism runs through accomplishment rather than negative emotion, and that an intact
streak did not reliably outperform no streak — carry that relay, not a first-hand reading.

### D9. Two session shapes, with `feedbackTiming` and `segmentation` bound together

| Shape | `segmentation` | `feedbackTiming` | Provenance | Strategy table | `EvidenceMode` |
|---|---|---|---|---|---|
| **Coached session** | `segment-repeat-until-clean` | `immediate` | `arranged` permitted | available | `acquisition` |
| **Closing run** — in a Learning session | `whole-shoe` | `deferred-to-debrief` | `organic` | **not offered** | `assessment` |
| **Closing run** — at a Table sitting | `whole-shoe` | `deferred-to-debrief` | `organic` | **available on request; opening it costs window eligibility** | `assessment` |

**The strategy-table column is the only one that splits, and it splits on 2026-08-17 — see §12
divergence 7 and the block below.** Everything else a Closing run *is* holds identically in both.

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
Skills, per D2's scope limit, or all eight when the learner takes the opt-in capture.

> ### The Recommender's band selects the shape — owner decision, 2026-08-17
>
> **This is the gap `RC-01` found, and it was load-bearing.** D3's 2026-08-15 withdrawal removed the
> only rule that produced a Closing run inside a Learning session. D6, D7, D13 and D14 then assigned a
> goal, a size and a Skill — and **nothing assigned a shape**, while shape sets five things:
> `segmentation`, `feedbackTiming`, Provenance, chart availability and `EvidenceMode`. A Learning
> session could not be started, because five of its parameters had no producer.
>
> **The shape follows the goal Skill's band in D14's published ordering:**
>
> | Band | Shape | Why |
> |---|---|---|
> | 2 — below the bar, recent evidence | **Coached session** | They are getting it wrong now; correction belongs next to the mistake. |
> | 3 — prerequisites met, no evidence yet | **Coached session** | First contact. Constraint 1: the path must not be steep. |
> | 1 — review due (Mastery reached, window has fallen) | **Closing run** | They had it. The question is whether they still do, and that question is only answerable without the chart. |
> | 4 — mastered, stalest first | **Closing run** | Same question, lower urgency. |
>
> **Three properties this has, each of which was a requirement rather than a bonus.** It adds no new
> constant — D14's bands are already fixed and already published, per that decision's own reason.
> It satisfies `RC-16`: the band is read at session start from the goal Skill, so the shape is fixed
> before the first Presentation and never changes partway. And it leaves D6's override intact without
> breaking D9's pairing rule — **the learner overrides the goal *Skill*, and the shape follows
> whatever band that Skill sits in.** They never toggle `feedbackTiming` or `segmentation`, which is
> what the pairing rule actually forbids.
>
> **What was declined.** Letting the learner pick the shape directly (it is the toggle D9 forbids, and
> Brummer's finding is that inconsistency is the failure mode). And making every Learning session
> Coached, leaving Closing runs to Free Play only (cheaper, but it puts `assessment` mode behind a
> Buy-in — mastery would be provable only by spending chips, which `LDB-05` D7 forbids chips from
> gating).

> ### The chart is available at a Table sitting — owner decision, 2026-08-17
>
> ⚠ **Reverses this document's own 2026-08-08 ruling — see §12 divergence 7.** As drafted, the Closing
> run row read `Strategy table: none`, and *"a Table sitting is always a Closing run"* carried that
> into Free Play. **Nobody ruled that; it arrived as a side effect of the two sentences composing**,
> and neither examiner pass adjudicated it — instance A raised it after instance B had finished, which
> §17 records as a structural finding about parallel passes rather than about this claim.
>
> **Four loci say the chart is available at a table, three of them approved:**
>
> - `docs/specs/product-vision.md:70` — the learning layer helps around the game through *"optional
>   table access, hints, count tools, and post-session feedback"*. Reopened first-hand 2026-08-17.
> - `docs/specs/product-vision.md:91-95` — the intended progression **begins** at *"playing with the
>   table open"*. A table that cannot be open has no step 1.
> - `LDB-05` D9, approved 2026-08-05 — every Free Play decision is recorded *"with the support
>   Condition (`table-open` / `table-closed`) captured"*. A condition with one reachable value is not
>   a condition.
> - This document's own D2, consequence 2 — *"`table-open` at a table is the strategy chart being on
>   screen."* D2 and D9 contradicted each other across four hundred lines.
>
> **And the simulator argument runs the other way from how it was used.** Basic-strategy cards are
> permitted at most real tables — houses sell them in their own gift shops — because a card only makes
> a player give up the house edge correctly. What casinos object to is counting. So removing the chart
> from Free Play makes the simulator *less* faithful, not more. `[Product judgement]` — this is
> general knowledge of casino practice, not a claim read out of any source in this repository, and it
> is labelled as such rather than dressed as evidence.
>
> **What "available" costs, and it costs exactly what it already cost.** Opening the chart sets
> `tableVisibility: 'open'` and keeps that Presentation out of the Mastery window — `LDB-04` D4,
> approved, unchanged. The hand is still graded by the oracle, still recorded, still feeds the
> Recommender, still appears in the debrief, still settles for chips. **One counter declines to move,
> and it declines because constraint 5 defines mastery as deciding correctly *without* the table.**
> No new mechanism, no new field.
>
> **A Learning session's Closing run keeps `Strategy table: not offered`**, because there the app
> chose the shape in order to ask a question the chart would answer for them. The learner chose to sit
> at a table; nobody chose it for them.

> ### An Unmeasured Activity never appears in a Closing run — owner decision, 2026-08-17
>
> `RC-03`. An Unmeasured Activity carries `EvidenceMode: 'acquisition'` (`LDB-09` D8, reading
> `types.ts`'s `EvidenceMode`), and a Closing run is an `assessment` session. Worse, the type reveals
> its answer inside the activity — that is what `estimate-and-check` **is** — against a shape whose
> `feedbackTiming` is `deferred-to-debrief`. **Both halves of this decision break at once**, and the
> half that breaks second is the one resting on evidence: Brummer's finding above is precisely that
> *"a combination of feedback timing approaches was ineffective."* Admitting rehearsal into a proving
> run builds the one condition the source singles out as worse than either alternative.
>
> **So Unmeasured Activities appear only in a Coached session.** Nothing is lost — they are rehearsal,
> and rehearsal belongs where correction already lives. With the ruling above it also follows that no
> Table sitting ever contains one, which is the right answer for an independent reason: nobody wants a
> card-sorting puzzle in the middle of a shoe they paid to sit down for.

> ### Legality is a property rule, not a class rule — owner decision, 2026-08-17
>
> The ruling above names a **class**, and a class rule only governs what the class name reaches. It
> does not reach `policy-paint` or `rule-contrast`. `LDB-09` D2 admits the Ungraded Activity types as
> those declaring `primaryFor: []`, `secondaryFor: []`, a non-empty `rehearses` and `gradedBy: none`;
> those two have a **non-empty `secondaryFor` and no `rehearses`**, so they are outside it — while
> `LDB-04` D6 calls both *"teaching and diagnostic instruments"* producing *"no mastery evidence at
> all"*, which is the whole ground the exclusion rests on. **The ground reached them and the wording
> did not**, and nothing noticed until D14's `secondaryFor` branch made them selectable.
>
> **An Activity type is legal in a session shape when both hold:**
>
> 1. Its `provenance` list contains the shape's Provenance mode.
> 2. If it yields the goal Skill no window-eligible evidence, the shape is **Coached**.
>
> Clause 1 is mechanical and reads data the taxonomy already carries — it excludes `policy-paint` from
> every Closing run on its own, because that type is `provenance: ["posed"]` and a Closing run is
> `organic`. Clause 2 restates the ruling above in terms of the property that justified it, so it
> reaches the five Ungraded types **and** the two `secondaryFor` ones, and will reach whatever the
> taxonomy gains next without anybody having to remember to widen a class name.
>
> **This replaces a rule rather than adding one**, which is the only reason it is worth writing at a
> gate. `[Product judgement]` on clause 2's extension; `[Evidence-backed]` on the Brummer ground above
> and on the taxonomy values clause 1 reads.
>
> **Also settled here: the repeat-until-clean loop admits only Presentations that surface a verdict.**
> `rule-contrast` withholds *"the rule, **and any surfaced verdict on the learner's answer**"* and
> carries `verdictSurfaced: [false]`, retained deliberately. A learner cannot reach "clean" on a
> Presentation that never tells them anything. It may appear in a Coached session as ordinary work; it
> is not eligible as a repeated segment. Stated as a property so it governs any future silent type
> rather than naming this one.

**No new field is needed to record which shape a session was.** `ProgressAttempt.mode` is
`'acquisition' | 'assessment' | 'diagnostic'` (`types.ts:30`, annotated at `:85`, read first-hand), and `ALR-005`'s own
rule is *"configure feedback timing by evidence mode."* The shape is derivable from the attempts and
must not be duplicated onto `SessionRecord`.

`[Evidence-backed]` on the Brummer quotation as relayed — **the Brummer paper and `V-U4.md` were not
opened for this document**; `[Product judgement]` on the pairing and on the two shapes.

### D10. The app never withdraws the strategy table; the rule card is always available

**`supportFading` in the session sense: the fade is real, and it is a property of which shape the
learner is in.** A Coached session has the table and a free "show me"; a Learning session's Closing
run does not offer it; **a Table sitting offers it and charges window eligibility for it** (D9,
2026-08-17). The fade is therefore real in the first two cases and *elective* in the third — which is
the stronger form, because a learner who stops opening the chart at a table has demonstrated the fade
rather than had it administered.
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

`[Evidence-backed]` on `A-22`'s wording and on bridge §1.4, which this ruling may now lean on
normally. `[Product judgement]` on deferring.

> **Relabelled 2026-08-19 at the `LDB-08` assembly — the label changed, the ruling did not.** This
> sentence previously read *"on bridge §1.4's `[DEFECTIVE-SOURCE]` status, which is carried rather
> than hidden — §1.4 is flagged defective in bridge §0 and this ruling does not lean on it beyond the
> predict-first shape"*. Bridge §1.4 now reads `[VERIFIED]`
> (`2026-07-22-product-design-inputs.md:120`, ruling recorded at `:55-77` and in `journal/decisions.md`
> under *"Three rulings at the `LDB-10` gate"*), and that tag was **stale on the day the bridge was
> written** — `C-C7-007` is present at the original bank `55f24aa`. The hedge was therefore never
> load-bearing: it was a discount taken against a defect that had already been repaired.
>
> What is unchanged, and why this is a relabel rather than a re-decision: predict-first remains
> independently ruled by `LDB-04` D12 and by the taxonomy's `revealMode` note, **not** by the
> register — `A-22` covers the *configurable sandbox*, not predict-first (examiner F8). Deferring
> `configured-sandbox` is unaffected. This is the single relabel `LDB-10` reported forward, and the
> `LDB-08` sweep found no second one.

### D12. `region: named-region`

`policy-paint` runs over the Classification category the session is about. `whole-table` is reserved
for a learner-opened *"where do I stand"* diagnostic and is never a session activity.

> ### The `whole-table` view is the learner's own progress picture — owner decision, 2026-08-17
>
> Stated because the original sentence reserved the view and never said what it is **for**, which left
> it looking like an unused setting. It is the learner's map: the full strategy grid, showing where
> they stand across it. That is a product surface `LDB-07` designs; this decision only rules that the
> `whole-table` region exists for it and is reached by the learner asking, never by the Recommender
> handing it out.
>
> **Which region a session-activity `policy-paint` runs over still has no producer.** D12 keys it to
> *"the Classification category the session is about"*, and D6 and D14 make a session about a
> **Skill** — `named-region` appears at exactly two loci in this document and neither assigns one.
> The gap was invisible until D14's `secondaryFor` branch made the type selectable. **Handed to
> phase 5** (§13) rather than answered with a rule nothing supports; the owner declined to spend a
> register row on an invented selection heuristic at this gate. Found by the composition pass of
> 2026-08-17.

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

> ### A table Presentation opens Practice and does **not** spend the first-exposure licence — owner decision, 2026-08-17
>
> `RC-10`. Take the rule above at its word and compose it with D4. A learner sits down at Free Play
> before touching the curriculum and is dealt a hard 16. That is *"at least one Presentation
> recorded"*, so the Skill is covered — and if coverage also spends D4's first-exposure licence, **the
> curriculum may never block-introduce hard totals to that learner at all.** The introduction is
> consumed by an event nobody designed as one.
>
> **And under D2's default they did not even meet it as a Classification.** A bare table decision
> produces the action only; the learner was never asked to notice *"this is a hard 16"*, which is the
> precise thing an introduction exists to make them notice — and the precise thing `A-23` worries
> about them never doing.
>
> **So the two rules are separated, and the wording D4 already carries is what separates them.** D4
> permits a blocked pool *"only for first exposure to a Classification, **declared as such**, and
> **only inside curriculum work**"*. The licence is spent by a Presentation meeting that description.
> A table Presentation meets neither clause: nothing declares it, and Free Play is not curriculum
> work. It makes the Skill **practisable** — D13's actual job, unchanged, and the refill route
> `LDB-05` D3 depends on — and leaves the introduction unspent.
>
> **This corrects a sentence in this decision rather than in D4.** The paragraph below reads that the
> one-exposure definition *"binds D4's curriculum-only blocked pool"*; examiner F6 had already
> established that D13 and D4 answer different questions, and binding them was the residue of the
> attribution error F6 caught. The binding is withdrawn; F6's distinction stands and now does the work
> it was found for.

**The count comes from bridge §4.6 item 2, not from `CFL-007`.** `CFL-007`'s own text
(`2026-07-22-product-design-inputs.md:336-337`) is purpose-bounded and fixes no count — *"A category
may be introduced in isolation **so the concept lands**."* The count language is at §4.6 item 2
(`:280-281`), *"A blocked pool is permitted only for **first exposure** to a category"*, which D4 already
cites. **D13 governs Practice *availability*; D4 governs where a blocked pool may exist. They are
different questions and neither binds the other** — the first draft had this definition binding D4's
curriculum-only blocked pool, which the block above withdraws on `RC-10`. (Examiner F6, whose
distinction this now applies rather than merely records.)

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

> ### The bands order **Skills**; a second rule picks the Activity type — owner decision, 2026-08-17
>
> `RC-04`. All four bands above are predicates over a Skill's Mastery **window**. So the Recommender
> orders Skills, and **nothing in this document said which Activity type the learner is then handed.**
> That gap was already live before `LDB-09`: `policy-paint` and `rule-contrast` are `primaryFor: []`
> and were therefore unselectable by every band. `LDB-09` added five more such types, making it five
> times worse and impossible to keep ignoring — **five Activity types would have been built and never
> offered.**
>
> **The candidate set for a goal Skill `S` is: every type that is `primaryFor` `S`, plus every type
> whose `secondaryFor` list contains `S`, plus every type whose `rehearses` list contains `S`.** No
> new field — all three lists already exist in `2026-08-01-activity-taxonomy.json`. `LDB-09` D1
> requires a non-empty `rehearses` on every type that has **neither `primaryFor` nor `secondaryFor`**,
> which is what makes *those* types reachable; the `secondaryFor` branch is what makes the rest
> reachable.
>
> > **The `secondaryFor` branch was added 2026-08-17 by owner ruling, closing `RC-04`.** Until then
> > the set had two branches and reached **9 of the 11** Activity types. The ground sentence also read
> > *"on exactly the types that have no `primaryFor`"*, which misstates `LDB-09` — it scopes the
> > requirement to types with empty `primaryFor` **and** empty `secondaryFor`
> > (`2026-08-15-play-verdicts-and-ungraded-activities.md:618-619`, reopened first-hand). Two types
> > sat in the gap the wider reading concealed, enumerated positively across all 11 types in the
> > taxonomy:
> >
> > | type | `primaryFor` | `secondaryFor` | `rehearses` |
> > |---|---|---|---|
> > | `policy-paint` (`:108-109`) | *empty* | `strategy-action` | **absent** |
> > | `rule-contrast` (`:158-159`) | *empty* | `read-rule-card`, `strategy-action` | **absent** |
> >
> > **D12 is what made this a contradiction rather than a gap.** It already rules that *"`policy-paint`
> > runs over the Classification category the session is about"* — a statement that it *is* a session
> > activity — while the two-branch candidate set could never select it. One document held both.
>
> **Band treatment: a `secondaryFor` type is drawn on the `rehearses` footing, not the `primaryFor`
> one.** It is available at **band 3 and on request**, and **not** at bands 1, 2 and 4. The ground is
> `LDB-04` D6 — *only `primaryFor` evidence enters the window* — so a `secondaryFor` type yields the
> goal Skill no window-eligible evidence, exactly like a rehearsal type. Bands 1, 2 and 4 exist
> because the session's goal **is** evidence, and spending a Presentation there on a type that cannot
> move the bar would be the same defect in a new place. This keeps the two types reachable without
> letting a Skill be served by a type that was deliberately denied primary evidence for it.
>
> **Cost: none in schema or data.** No field, no taxonomy edit, no validator change — the three lists
> and the band rule all already exist. `[Product judgement]` on the band restriction;
> `[Evidence-backed]` on the `LDB-04` D6 ground it rests on.
>
> **Within that set, one published rule, keyed to the same bands:**
>
> - **Band 3 — no evidence yet:** the session opens with a **Tutorial** (D18). Where an Ungraded
>   Activity type rehearses the goal Skill, the Tutorial uses it. Where none does — which is the case
>   for most Skills, see D18 — the Tutorial is a real dealt hand with the strategy table on screen and
>   immediate correction. Either way it is play rather than measurement, and either way it does not
>   count. This is constraint 1 — *the learning path must not be steep* — doing work rather than being
>   quoted, and it is the only place in this document where a constraint selects a mechanism instead
>   of vetoing one.
> - **Bands 1, 2 and 4:** a `primaryFor` type. The session's goal is evidence and these learners have
>   already met the material.
> - **Between activities, on request:** any type in the candidate set that is **legal in the current
>   session's shape** (D9's legality rule). `EvidenceMode: 'diagnostic'` is annotated *"STORED but
>   excluded from mastery"* (`types.ts:85`), so this records without contaminating anything.
>
>   > **Rewritten 2026-08-17 at the composition pass — owner decision.** This bullet read *"**At any
>   > point, on request:** any type in the candidate set, as the learner-opened diagnostic D12 already
>   > reserves."* Two defects, both found by composing it rather than reading it.
>   >
>   > **It contradicted D9 three lines below the paragraph that certifies it does not.** The candidate
>   > set's `rehearses` branch *is* the five Ungraded Activity types; bands 1 and 4 map to a Closing
>   > run; D9 rules that those types appear only in a Coached session. Concrete case: goal
>   > `strategy-action`, band 4, learner requests `principle-name`. The composes paragraph below
>   > checked the **default** bullet and not this one.
>   >
>   > **And the citation to D12 was false either way.** D12 reserves `whole-table` — a `region` value
>   > of a single type — and says it *"is never a session activity"*. This bullet cited that as
>   > reserving a diagnostic across *any type in the candidate set*, which for `strategy-action` is
>   > six types. Widening D12 is a fine thing to do and it is **this** decision doing it, not D12; it
>   > is filed as §12 divergence 10 rather than dressed as a citation.
>   >
>   > **The owner's rule is simpler than either repair.** There is **no mid-activity switching at
>   > all**: the learner leaves the activity they are in, and then chooses. That is why the bullet now
>   > says *between activities* rather than *at any point*. It composes with D8, which already rules
>   > that stopping is always permitted, never penalised, and recorded — `{ status: 'abandoned' }` is
>   > a real domain value (`types.ts:50`). Leaving a Closing run part-way abandons that shoe, which is
>   > the honest accounting and needs no new mechanism.
>
> **What it composes with, and what it does not.** Band 3 → Coached session (D9), where a Tutorial is
> legal under either of its two forms — consistent. Bands 1 and 4 → Closing run, and the on-request
> channel now admits only types legal in that shape (D9's legality rule) — consistent. The opening
> Tutorial consumes 1 of the session's bound (D7) — consistent, and intended. And D6 already requires
> an activity on screen before any choice is required, which a Tutorial satisfies in both its forms.
>
> > **This paragraph was wrong when written, and the way it was wrong is the reason it is now stated
> > as a list of checks rather than a claim of completeness.** It read *"It composes with the four
> > rulings it touches, checked rather than assumed"*, and then certified *"Bands 1 and 4 → Closing
> > run → no Unmeasured Activity — consistent"* — true of the default bullet, false of the on-request
> > bullet three lines above it. It also omitted D12, D13, D4 and D9's pairing rule from "the four
> > rulings it touches". A completeness claim made by the session that wrote the rule is worth less
> > than the checks themselves; the checks are what is kept.
>
> **This is published for D14's own stated reason**, below: a mechanism that decides what a learner is
> handed and is also opaque is the thing this decision exists to refuse.

> ### The bands order the Skills that carry a bar; `variance-expectation` is not one — owner decision, 2026-08-17
>
> All four bands are predicates over a Skill's Mastery window. `LDB-04` D12 gives
> `variance-expectation` **no mastery bar in v1**, so it is in bands 1, 2 and 4 never, and leaves
> band 3 the moment it has any evidence — making `predict-then-reveal`, its only `primaryFor` type,
> **Recommender-reachable at most once ever**. Found by the composition pass of 2026-08-17.
>
> **It is not the Recommender's to hand out.** D11 already offers the prediction capture before a
> shoe, which is that Skill's delivery route and needs no band. So the bands are stated as ordering
> **the Skills that carry a bar**, and `LDB-04` is where that set is read from — deliberately not
> restated as a count here, which is the repair §15 criteria 3, 7 and 8 all took this same day.
>
> **`estimate-and-check` is unaffected** — it rehearses `variance-expectation` and `dealer-info`, and
> reaches a learner through the second, which does carry a bar.

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

1. **Every *produced element* that diverged from the oracle — Classification or action — each
   replayable to its exact Decision situation** — cards, upcard, legal actions, ruleset, response.

   > **Widened from "decision" to "produced element" — owner decision, 2026-08-17 (`RC-08`).** As
   > drafted this read *"every decision that diverged from the oracle"*, which leaves a real mistake
   > invisible. A learner takes D2's opt-in capture, names a hard 18 *"soft 18"*, and then **stands**,
   > which is correct. D9 forbids mid-hand correction in a Closing run, so nothing is said at the
   > time. The action did not diverge, so content 1 never shows it. The one thing they got wrong
   > reaches them only as a number in content 2 — and user story 9 asks for *"what I got wrong, with
   > the actual cards in front of me,"* explicitly *"a replay and not a score."*
   >
   > Divergence 5 created this gap by making the Classification a produced element at the table, and
   > `LDB-03` §6.1 already rules it *"graded separately **inside** `deal-and-decide`"* — so the
   > verdict exists and only the debrief was failing to show it. **The widening costs nothing to
   > render**: content 1 already replays the whole situation, and this changes which situations are
   > selected, not what is drawn.
   >
   > It also pre-fits `LDB-09` D7, which routes an in-situ `state-report` capture through the same
   > mechanism. That will produce a third element — a hand total — and content 1 now already covers
   > it without a further amendment.
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

### D18. First contact with a Skill is a **Tutorial**, and a Tutorial never counts

**Owner decision, 2026-08-17, at the gate grill.**

**A Tutorial is the learner's first encounter with a Skill.** It takes one of two forms, and which one
is decided by the taxonomy rather than by a judgement call:

- **Where an Ungraded Activity type rehearses the goal Skill**, the Tutorial is that type. Play, by
  construction.
- **Where none does**, the Tutorial is a real dealt hand with the **strategy table on screen and
  immediate correction** — a Coached session's own shape, doing what it already does.

**A Tutorial produces no Mastery evidence, whatever the learner does with the chart.** It is excluded
by rule, not by chart state (§11 item 8). Two reasons, and the second is the one that decided it: a
first Presentation is the one the learner was least equipped for, and letting it count would make a
mastery record depend on whether somebody happened to click the chart open.

**A Tutorial does not repeat itself.** Once played, the Skill's later work is ordinary practice. The
learner may **replay it on request** at any time, which costs nothing — it never counted in the first
place.

> **Why this exists, and what it replaced.** D14's band-3 rule read *"the session **opens with an
> Unmeasured Activity** where one rehearses the goal Skill."* The five Ungraded types rehearse **6**
> of the **18** Skills between them (union of `hand-sort`, `estimate-and-check`, `procedure-order`,
> `principle-name` and `rule-battery`, read from the taxonomy). So for **12 Skills the rule named an
> activity that does not exist**, with no fallback written anywhere — verified by enumerating every
> `rehears`/Ungraded mention in this document.
>
> **And the 12 are the foundational ones**: `card-values`, `hand-total`, `ace-value`, `bust`, `hit`,
> `stand`, `double`, `split`, `wager-result`, `natural-blackjack`, `legal-fallback`,
> `adherence-under-loss`. The mechanism fired for the derived material and failed at genuine first
> contact — inverting against the constraint that justified it. Found by the composition pass of
> 2026-08-17, independently by two instruments.
>
> **The second form is not a patch.** `hit` and `stand` carry **no prerequisites at all** in the skill
> graph — they are roots, like `card-values`. A new learner can be dealt a hand and act on it in their
> first minute; they do not need totals first. And deciding whether to hit **is** the task, so a
> rehearsal version of it would be a quiz with a card table drawn behind it, against constraint 3.
> For those Skills a real hand with the chart open is the *better* first contact, not the consolation
> one.
>
> **What is deliberately left open.** Whether more Ungraded types get built — and therefore how many
> Skills reach the first form — is `LDB-08`'s call about what phase 5 builds, and the owner has said
> he wants more of them. This decision is written so that answer can change without reopening it: the
> form follows the taxonomy, so a new type moves a Skill from the second form to the first with no
> edit here.

`[Product judgement]` throughout. The 6-of-18 and 12-Skill figures are read from
`2026-08-01-activity-taxonomy.json` and `2026-08-01-skill-graph.json` and are stated as of this gate;
they move when the taxonomy does, which is the intended behaviour and the reason the rule is written
in terms of *whether one exists* rather than in terms of a count.

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
   never `arranged-` — the check reads real card ids rather than a flag (D9). *(This test survives
   D3's withdrawal: it constrains what a Closing run **is**, which D9 rules, not when one is
   **owed**, which was the withdrawn half.)*
2. **An arranged-only window withholds Mastery, and the session still closes.** *(Rewritten
   2026-08-15: the 2026-08-08 version asserted a Coached session was "not closeable without a Closing
   run" — the rule that deadlocked and is withdrawn at D3.)* Fixture: a learner drills an arranged
   hard-16 pool to clean and stops. Assert two things, not one — that the session reaches a normal
   `closeReason` with nothing owed, **and** that `LDB-04` D7 withholds Mastery because the window
   holds no `organic` Presentation. The second half is a *positive* enumeration of what was checked,
   not a test that passes on an empty pool.
3. **A Table sitting produces window-eligible attempts, and its scope depends on the opt-in.** Assert
   a table decision commits with `gradedBy.authority: 'oracle'`, `attemptOrdinal: 1`,
   `disposition.status: 'graded'`, and `tableVisibility` recorded — and that it is **not**
   `{ status: 'ungraded' }`. See §11 item 2: the shipped comment says otherwise and is now wrong.
   **Then assert both arms of divergence 5**: a table Presentation *without* a Classification reaches
   the bar for `hit`/`stand`/`double`/`split` and **not** for the four `classificationIncluded: true`
   Skills; the same Presentation *with* one reaches all eight. A test covering only the default arm
   would pass while the escape was unbuilt.
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
| **`A-07e`** | **New.** The three session-size presets — Short 10, Standard 25, Long 50 Presentations (D7). Pooled, because moving one changes what the others mean — the convention `A-07a` set. **Named first test:** completion rate and return rate by preset, which is `A-08`'s existing instrument at no extra cost. Mode: **playtesting**, matching `A-08`'s declared mode — the instrument is shared, so the mode must be too. **⚠ Blocked until §11 item 7 lands (added 2026-08-17, `RC-07`):** the preset survives only on a closed session, so as things stand the test can see nothing but sessions that completed — and completion is what it measures. The row stands; its named method does not run until `presetId` reaches the attempt. |
| **`A-07f`** | **New.** The Recommender's separation gap — a missed item may return after at least 3 intervening Presentations (D14). **Named first test:** does a shorter gap raise same-session accuracy while lowering next-session accuracy? Computable from stored attempts. Mode: **production telemetry**. |
| `A-03` | **Note added, no new row.** D9 fixes the timing pairing rather than the timing, on the source's own finding that consistency matters more than timing. `A-03`'s validation method already reads *"the honest test is consistency versus timing"* — this design is now the arm that tests it. |
| `A-23` | Cited, not restated. **No row is filed because the mitigation lives in an approved spec — `LDB-04` D7's organic floor — which this card cites rather than re-asserts.** *(Rewritten 2026-08-17, `RC-12`: the row read **"D3's organic close is a mitigation of `A-23`, not a new assertion — which is why no row is filed for the Coached-then-Closing shape"** — retrieved verbatim from `git show 4f0b7e7`, not recalled — and that shape was withdrawn at D3 on 2026-08-15. **This note's own first version quoted the retired row wrongly**, giving "no row is filed for the Coached-then-Closing shape" as the **reason**; it was the **scope** of the unfiled row, and the reason was the mitigation clause before the dash. Corrected 2026-08-17 after independent verification — a repair note misdescribing the text it repairs is the founding error class operating on a correction, which is where this repository has already lost corrections twice. The mitigation is in fact **stronger** than when the row was written — D9's band mapping now sends bands 1 and 4 into Closing runs, so organic whole-shoe play is a routine event in the design rather than something a bespoke rule had to force.)* |
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

**Nine items.** Items 1–4 were checked against `web/src/progress/types.ts`, read first-hand
2026-08-08, rather than assumed. Item 5 was added 2026-08-15 with divergence 5 and grepped the same
way. **Items 6–9 were added 2026-08-17**, each against the same file re-read first-hand that day.

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
   above makes those decisions window-eligible for the four action Skills, and for all eight where
   the learner takes the optional Classification capture. **No type change is needed** — `{ status: 'graded' }` and `gradedBy.authority: 'oracle'` both already exist.

   **Owed: the annotation, in TWO places.** `web/src/progress/types.ts:49` **and**
   `docs/superpowers/specs/2026-07-17-progressstore-cycle1-design.md:452`, the approved parent the
   code declares itself an exact transcription of. Correcting only the code leaves the approved spec
   still saying the opposite, and **`scripts/check-doc-drift.sh` has no check for this pair** — its
   checks are board/milestone `next:`, QA role enumeration, closed-milestone prose, Rust test count,
   in-progress plan, single-live-board, evidence-index unapplied-claims, and bridge tag attribution,
   **eight as run 2026-08-17, none of them covering a code-comment-to-parent-spec pair** — so nothing
   would catch the re-divergence. (This read *"its six checks are"* until 2026-08-17; checks 7 and 8
   had been added since. The negative claim was unaffected, which is why it is corrected rather than
   withdrawn — but a count written beside an enumerable list going stale is, again, `RC-11`.) This is
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

5. **The opt-in Classification is not recordable today — added 2026-08-15 with divergence 5.**
   Grepped `web/src/progress/types.ts` on 2026-08-15: `ProgressAttempt` carries no field stating
   whether the learner supplied a Classification. **It cannot ride on item 3.** `resourcesConsulted`
   distinguishes *strategy table* from *rule card* — both are things the learner **consumed**, and
   consuming either keeps a Presentation *out* of the window (D10, `LDB-04` D4). The Classification is
   something the learner **produced**, and producing it puts a Presentation *into* four more windows.
   Opposite direction, opposite effect on eligibility; one field cannot carry both without meaning two
   things.

   **Owed:** a per-Presentation record of whether the Classification was produced and whether it was
   correct. The grading rule already exists and only the storage does not — `LDB-01` §2 requires
   Classification declared per Skill, and `LDB-03` §6.1 rules it *"graded separately **inside**
   `deal-and-decide`"*. **This is the one genuinely new field divergence 5 adds**, and naming it here
   is the cost of that divergence stated rather than discovered in phase 5.

6. **A Table sitting cannot be closed in the schema — added 2026-08-17 (`RC-05`).** A sitting ends at
   cash-out or when the Wallet cannot cover the lowest tier's minimum Buy-in (`LDB-05` D3).
   `SessionRecord.closeReason` is
   `'evidence-target-met' | 'time-bound' | 'activity-bound' | 'learner-stopped'` (`types.ts:129`) —
   **no value expresses either ending.** And `budget` is a **required**
   `{ presetId; targetDurationMs; maxActivities }` (`types.ts:130`), carrying a `presetId` a sitting
   has not got, because D7's presets are a Learning-session concept.

   **Ruled 2026-08-17: a Table sitting does produce a `SessionRecord`.** D16 content 4 (the Table
   stack result) and `LDB-05`'s Buy-in→cash-out ledger both need a close to hang from, and D17's
   *"the attempts are the record"* supplies no bookend. **Owed:** `closeReason` gains `'cashed-out'`
   and `'wallet-exhausted'`; `budget` becomes nullable. The file's phantom rule (`types.ts:6-9`) is
   satisfied rather than dodged — *"a `null` is allowed only when it is a real domain value"*, and
   "this visit had no size preset" is a real domain fact, not a missing producer.

   **§11's own positive list missed this**, and the miss is worth naming: the list enumerates what was
   checked against `types.ts` and every check was about a *Learning* session. A Table sitting is the
   other half of D1's split and no item looked at it. Enumerating positively protects against absence
   being read as proof; it does not protect against a category nobody thought to enumerate.

7. **`A-07e`'s named test cannot close — added 2026-08-17 (`RC-07`).** The row's named first test is
   *completion rate and return rate by preset*. `presetId` exists **only** on
   `SessionRecord.budget`; D17 emits no `SessionRecord` for a session that never closes; and
   `ProgressAttempt` carries no preset field anywhere — the whole type re-read first-hand 2026-08-17,
   all members enumerated. **So the only sessions carrying a preset are the ones that completed, and
   the measurement is completion rate.** Its denominator is definitionally absent. That is
   survivorship built into a register row's validation method.

   **Owed:** `presetId` on the attempt. It rides `activity.params`, which already exists and is
   `JsonValue`, so this is additive with zero migration. **This corrects §13's claim to `LDB-08`**
   that `A-07e` and `A-07f` both close *"from stored attempts with no new instrument"* — true of
   `A-07f`, false of `A-07e` until this lands.

8. **Nothing states which key the Mastery window folds on — added 2026-08-17 (`RC-09`).** D2 rules
   that one table decision counts toward four Skills' windows, or eight with the opt-in. But
   `ProgressAttempt.evidence.skillId` is a **single** `string` (`types.ts:79`), while `LDB-04` D6
   states the rule at **type** level — *"only `primaryFor` evidence enters the window."* The two never
   met: `LDB-04` does not contain the string `skillId` anywhere (grepped 2026-08-17, zero hits), so
   the question was not answered there either.

   **Ruled: the Activity type is the window key; `evidence.skillId` is the presentation's goal label.**
   The predicate, stated so phase 5 does not have to infer it:

   > A Presentation enters Skill `S`'s window when **all six** hold: its Activity type is
   > `primaryFor` `S`; it met that type's `produced` contract for `S`; its **`tableVisibility` was
   > not `'open'`**; it was not **abandoned**; its `mode` was not **`'diagnostic'`**; and it was not a
   > **Tutorial** (D18).

   > **The sixth clause is new 2026-08-17 and arrives with D18.** A Tutorial is excluded by rule
   > rather than by chart state, so a learner who never opens the chart during first contact still
   > does not have that Presentation counted. This is the fourth time this item has grown, which is an
   > argument the item now makes against itself: **phase 5 should implement this as a positive
   > definition of what counts, with a test per clause**, not as a list of exclusions that keeps
   > discovering new members. Whether a Tutorial needs a stored marker or is derivable from *"first
   > Presentation of this Skill"* is a phase-5 question — the latter is computable from
   > `ProgressAttempt.evidence.skillId` (`types.ts:79`) with no new field, and is the cheaper answer
   > if it survives the replay case, since a replayed Tutorial is not the first.

   > **The third clause was restated in the schema's vocabulary 2026-08-17.** It read *"it was
   > **`table-closed`**"* — a value the attempt schema does not have. `types.ts:32` declares
   > `TableVisibility = 'open' | 'hidden' | 'not-applicable'`; `table-closed` is a **taxonomy
   > `supportFading` value**, and no mapping between the two vocabularies was written anywhere.
   > `table-closed` and `supportFading` appear nowhere in `web/` or `crates/` — they are spec
   > vocabulary only, so this costs nothing to correct and nothing is built against it.
   >
   > **It is `!== 'open'`, not `=== 'hidden'`, and the difference is nine Skills.** `state-report`
   > and `rule-card-read` declare no `supportFading` parameter at all, so their attempts are
   > `'not-applicable'` — neither open nor hidden. `state-report` is `primaryFor` **8 of the 18
   > Skills** and `rule-card-read` covers `read-rule-card`, so an `=== 'hidden'` reading silently
   > excludes 9 of 18 Skills from every window. The question mastery asks is *did they decide without
   > the table*; an activity with no table to open satisfies that rather than failing it. This is
   > also `LDB-04` D12's point that the fade lives in the **sequence**, not in a single attempt.
   > `LDB-04:97-98`'s own *"8 of the last 10 table-closed presentations"* inherits the same
   > rewording. Found by the composition pass of 2026-08-17.

   > **The third and fourth clauses were missing from the first draft of this item, and are added
   > 2026-08-17 after a composition check.** `LDB-04`'s window is *"8 of the last 10 **table-closed**
   > presentations"* (`2026-08-03-evidence-and-mastery-rules.md:97-98`, reopened first-hand), with
   > abandoned presentations *"recorded and excluded"* by its D5. A two-clause predicate reads as
   > complete and is not, and a phase-5 builder implementing it literally would admit both classes
   > into the window.
   >
   > **The fifth clause was still missing after that repair, and is added 2026-08-17 at the gate —
   > the third consecutive time this item's completeness failed on its own correction.** It is not a
   > new ruling: `ProgressAttempt.mode` is annotated *"diagnostic is STORED but excluded from mastery
   > — **by the reducer, not the store**"* (`types.ts:85`, read first-hand), and `LDB-04` already
   > names *"diagnostic-mode attempts excluded (schema contract)"* as a required reducer test group
   > (`2026-08-03-evidence-and-mastery-rules.md:579`). Item 8's entire owed deliverable **is** that
   > reducer's rule, so the one document that had to carry the clause is the one that dropped it.
   >
   > **The producer is D14 of this same document** — its on-request diagnostic channel. A diagnostic
   > run on a `primaryFor` type satisfies every earlier clause, and D14 quotes the *"excluded from
   > mastery"* annotation in the act of creating the case the predicate then admits. This is a live
   > defect in an unbuilt reducer, not bookkeeping.
   >
   > *(D14's bullet was rewritten later on 2026-08-17 — the channel is now "between activities" rather
   > than "at any point", and admits only types legal in the current shape. That narrows when the case
   > arises; it does not remove it, because a diagnostic on a legal `primaryFor` type is still
   > reachable. The clause stands. This note replaces a verbatim quotation of the superseded wording,
   > which would otherwise have described text this document no longer contains.)*
   >
   > **§11's own not-owed list is what let it through**, and the mechanism is worth naming because it
   > will recur: *"the diagnostic view needs no field because `EvidenceMode` carries `'diagnostic'`"*
   > is **true about fields** and was read as **true about the predicate**. A field that exists is
   > evidence that storage is solved; it is no evidence at all that anything reads it. An
   > enumerate-positively list protects against absence read as proof, and does not protect against a
   > *present* fact answering a question it was never asked.
   >
   > **§12 divergence 7 is what makes this urgent rather than pedantic.** Making the chart available
   > at a Table sitting turns `table-closed` from an edge case into the single most common reason a
   > table Presentation is uncounted. The omission and the ruling that detonates it were written in
   > the same session, an hour apart — which is `LDB-06` §16.1's finding reproducing itself on the
   > repair rather than on the original.

   The second clause **is** D2's scope limit generalised — it is exactly why a bare table decision
   reaches four Skills and an opt-in one reaches eight, rather than that being a special case bolted
   onto D2. **No new field is owed beyond item 5**, which already records whether the Classification
   was produced. What is owed is that this rule be *written down* in phase 5's reducer, which is why
   it is an item here rather than a line in the not-owed list below.

9. **`LDB-09`'s five new types need two taxonomy edits — added 2026-08-17 (§12 divergence 8).** They
   ship with `gradedBy: none`; under divergence 8 they are graded and their verdict is shown.
   **Owed to whoever amends `LDB-09`:** `gradedBy` set to the grading authority each type actually
   uses, and `verdictSurfaced: true` — **which is a real amendment, not a free reuse.** The parameter
   exists, but the taxonomy declares it `"values": [false]` and `"owner": "LDB-07"`. So this widens
   an admitted value domain on a parameter a **third card owns**, and the widening is handed to
   `LDB-07` rather than done here. *(Corrected 2026-08-17: this read "a parameter that already exists
   in the taxonomy, carried at `false` by `rule-contrast`, so no new vocabulary is invented." `true`
   was never an admitted value. The amendment is still wanted — §12 divergence 8 rules that the five
   new types show verdicts — only its stated cost was wrong.)* `primaryFor: []` is **unchanged**,
   which is what keeps them out of every window.

   **And a live validator will fail when this lands — found by reading it, not by assuming.**
   `scripts/check-ldb03-taxonomy.js` check 7 (*"ungraded type integrity"*, lines 144-159) asserts for
   every `graded === false` type that **`gradedBy` is exactly `['none']`**, alongside empty
   `primaryFor`/`secondaryFor` and a non-empty `rehearses`. Setting a real grading authority trips it.

   **The repair is to adapt the check, never to delete it.** Its `primaryFor`/`secondaryFor`/
   `rehearses` assertions are the load-bearing ones — they are what stop a play type *"silently
   acquiring evidence coverage in a later edit"*, which is the comment's own stated purpose and is
   untouched by divergence 8. Swap the `gradedBy === ['none']` assertion for
   **`verdictSurfaced === true`**, so the check goes on guarding the property that still matters
   instead of the one that stopped being true. Deleting the clause would leave the guard weaker than
   before an amendment that was supposed to make these types *more* visible to the learner.

   All 8 checks pass today (re-run 2026-08-17, `8 passed, 0 failed`) because **the JSON is
   deliberately unedited** — this document authorises no code and no data change, per phase 4's rule.

**Checked and *not* owed, enumerated positively rather than assumed absent:** the replay snapshot
`ALR-018` requires already exists as `ProgressAttempt.engine` and `ProgressAttempt.activity`
(`types.ts:103` / `56-62`, and `106-112`); the session shape needs no field because it is derivable from
`mode` (`types.ts:85`); the diagnostic view needs no field because `EvidenceMode` carries
`'diagnostic'` — **which is a claim about storage only, and is not a claim that any rule reads it;
item 8's fifth clause is where it gets read, and this line was misread as covering that once
already**; the Skill-grain coverage rule needs no field because `evidence.skillId` exists
(`types.ts:79`); and the pace evidence needs no field because `elapsedMs` exists (`types.ts:116`).

### 12. Divergences, surfaced and approved

**Ten.** Divergences 1–3 were put to the owner individually on 2026-08-08 and approved before this
document was written. Divergence 4 was found by the examiner pass afterwards and approved the same
day. **Divergences 5 and 6 are new on 2026-08-15**, from a `grill-with-docs` session run at the
owner's request *before* the gate rather than at it — he held the gate open on 2026-08-14 to grill
phase 4 on playability and change-agility first. **Divergences 7, 8 and 9 are new on 2026-08-17**,
from the grill that closed this document's gate questions; **divergence 10 is new later the same
day**, from the composition pass that followed it.

**Eight are approved. Two are struck: divergence 2, superseded by 6, and divergence 6 itself,
superseded by the evidence pass of 2026-08-17.**

> **The count was wrong until 2026-08-17 and the way it was wrong is the point.** It read *"Eight …
> seven are approved"*, which described this section exactly as it stood **before divergence 9 was
> appended the same day**. §15 criterion 7 was edited that day to *mention* divergence 9 and its
> leading count was left at eight — so the criterion whose stated job is *"divergences are surfaced,
> not applied silently"* was itself silently one short, and the entry it dropped (6) was the only one
> carrying no disposition stamp. **This is `RC-11`'s shape reproducing in the criterion next door**:
> criterion 3 was rewritten that same day to stop hard-coding *"6 of 6"* and read its count from the
> taxonomy, and criterion 7 was left hard-coding its own. Criterion 7 now reads the count from this
> section. (`RA-22` corrected the seven-and-one phrasing on 2026-08-17 and did not catch the total;
> corrected again 2026-08-17 at the gate grill.)

> **Two of this document's own 2026-08-08 rulings were reversed at that session, and are recorded as
> divergences from *itself* rather than edited away:** D2's scope limit gains an opt-in escape
> (divergence 5), and D8's blanket no-streak becomes an up-only streak (divergence 6). D3's
> per-session Closing run was **withdrawn** in the same session — that one is not a divergence,
> because it removes a rule this document invented rather than departing from a source, and its
> withdrawal is recorded in full at D3.

1. **`ALR-027` requires two bounds; D7 ships one.** The requirement is *"a session-size preset
   resolving to both a target duration and a max activity count."* D7 demotes the duration to a
   displayed estimate. Grounds are in D7; the schema cost is §11 item 1. **APPROVED.**

2. **~~No streak in v1.~~ SUPERSEDED 2026-08-15 by divergence 6.** As written on 2026-08-08:
   *"`ACT:388` rejects loss-framed streaks; a streak that only counts up is not literally forbidden
   by it. D8 declines the whole mechanic anyway, on the judgement that every shipped streak is
   loss-framed by construction."* **Its own first sentence is what reopened it** — the draft
   identified the exact gap in the prohibition and then declined to use it. Struck rather than
   deleted, because the reasoning that reversed this is contained in the entry itself.

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
   as one rather than argued away. **APPROVED** — owner ruling, 2026-08-08: *declare it*. §11 item 2
   now names **both** correction targets.

   > **The stamp is normalised, not newly granted (2026-08-17, at the gate).** This entry carried the
   > ruling as prose while the other six carried the word **APPROVED**, and the section's *"seven are
   > approved"* has counted this entry as one of the seven throughout — nine total, less the two
   > struck, is seven only if this one counts. Approving a divergence *means* accepting the departure
   > and recording it, which is exactly what *"declare it"* ruled. **No decision moves here**; what
   > changes is that a reader enumerating §12 no longer has to judge whether one entry's prose amounts
   > to a disposition while six others say so outright.
   >
   > **It does not make the count greppable, and the first draft of this note wrongly said it did.**
   > `grep '\*\*APPROVED'` over §12 returns **nine** hits for **seven** approved entries — this note
   > itself is one, and the standing-rule approval trailing divergence 9 is another. Criterion 7 is
   > right to prescribe *enumerating the numbered entries*; a word-count shortcut would have been the
   > hard-coded-answer shape criterion 3 was rewritten to remove, invented afresh one section away and
   > inside the repair for it.

   Both loci reopened first-hand 2026-08-08.

5. **D2's scope limit gains an opt-in escape, diverging from this document's own 2026-08-08 ruling.**
   That ruling declined a table-side Classification capture because it *"bends the honest simulator,
   which `product-vision.md:69-71` fences off."* **Reopened first-hand 2026-08-15: `:69-71` permits
   the learning layer to help *around* the game — it names optional table access, hints, count tools
   and post-session feedback — and forbids manipulating cards for lesson purposes.** An optional
   control manipulates no card. The fence was cited against a mechanic it does not cover, and
   `LDB-04` D4's *"show me"* is the same shape and already approved at the table.

   **What it costs, stated rather than left to phase 5.** A per-Presentation record of whether the
   Classification was given, which §11 item 3's `resourcesConsulted` delta does not cover — that
   delta distinguishes *strategy table* from *rule card*, and this is a third thing. The control
   itself is `LDB-07`'s. **APPROVED, owner 2026-08-15.**

6. **~~An up-only streak ships, reversing divergence 2.~~ STRUCK 2026-08-17 by the evidence pass, and
   replaced.** As written: *"`ACT:388` forbids* loss-framed *streaks; divergence 2 declined every
   streak on the wider judgement that all shipped streaks are loss-framed by construction. That is a
   claim about other products, not a reading of the prohibition. A counter that cannot fall applies no
   pressure and penalises no ending."* Amended by `RC-06` to increment on a **committed Presentation
   on a calendar day** rather than a closed session, so that a learner who tapped "stop" and one who
   closed the tab were treated alike. `RA-14` had already stripped its second support: **`LDB-05` D12
   constrains the shape such a streak may take — *"gentle, XP-layer only"* — but its own next clause
   says they *"remain a non-binding progression idea rather than an approved mechanic"*, so it
   licenses nothing**, leaving the entry resting on the reading of `ACT:388` alone.

   **Why it is struck.** A bounded evidence collection was run at the gate
   (`docs/superpowers/research/design-evidence/2026-08-17-streak-mechanics.md`, tracked and citable but
   **not authoritative and not verified**; relayed — the gate session opened none of its 18 external sources). Three results, in the order
   they bear:

   - **The premise survives.** Divergence 6 was right that the motivational force need not come from
     losability. The only located study testing the mechanism finds the effect runs through *sense of
     accomplishment*, not negative emotion. **So divergence 2's reasoning is not restored by this
     strike** — see below.
   - **But the mechanic buys nothing measurable.** In that study an *intact* streak did not
     significantly beat showing no streak at all, while its authors concede the intact-vs-no-log
     contrast was not consistent across their studies. The reliably measurable half of a streak's
     effect is the *break*. An up-only counter removes the break and keeps the half that may be worth
     nothing — and no study anywhere compares a never-falling counter against a resettable one, so
     the design was reaching for an untested variant.
   - **Two forgiving designs are evidenced and neither was considered.** Khan Academy removed daily
     streaks in 2021 citing this exact worry, converted them to permanent badges, and returned in 2024
     with a **weekly** streak. Brilliant's protection is **free, earned by studying, auto-applied**.
     The one large education RCT reporting *no discouragement effect* used a **weekly** streak whose
     messaging weighted starting a new one equally with extending one.

   **What replaces it — a forgiving weekly streak, triggered by the account.** A **weekly** window; a
   week counts when it contains **any committed Presentation** (attendance, not mastery — `LDB-04`'s
   8-of-10 ratcheting window means a learner can work hard for a week and move no bar, so gating on
   movement would punish real work, which is precisely what `ACT:388`'s mission clause forbids);
   forgiveness free, earned and auto-applied rather than purchased; and gain-framed copy that treats
   starting a new streak as equal to extending one.

   **It does not ship in v1, and the trigger is the account, not a date.** The mechanic's honesty
   depends on the number being true, and browser-local IndexedDB is per-device — a learner who opens
   the app on a phone, in a private window, or after clearing storage watches it fall. A counter that
   cannot fall by design but falls by infrastructure delivers the loss framing through a door nobody
   guarded. It becomes buildable when accounts exist (`journal/decisions.md` 2026-08-16, Supabase
   banked), which is also where `CLOUD-02` filed streaks in the first place.

   **Divergence 2's outcome is restored; its reasoning is not.** v1 ships no streak, which is what
   divergence 2 concluded. But divergence 2 rested on *"every shipped streak mechanic is loss-framed
   by construction: its entire motivational force is the fear of losing it,"* and the first result
   above contradicts that specifically. Right answer, wrong reason, and both entries stay readable so
   the difference does not get flattened on a later reading.

   **Cost: one register row and one owed sentence.** `A-29` in
   `docs/superpowers/specs/assumption-register.md` carries the claim that a forgiving weekly streak
   carries return-cadence motivation, with a named validation method. And under the removal rule this
   very entry establishes, **nothing carries return-cadence motivation in v1** — recorded at D8 rather
   than left to be noticed.

7. **The strategy chart is available at a Table sitting, reversing this document's own D9 and D10.**
   As drafted, D9 gave a Closing run `Strategy table: none` and ruled *"a Table sitting is always a
   Closing run"* — so Free Play had no chart. **Nobody decided that**; it emerged from two sentences
   four hundred lines apart, and it contradicted this document's own D2 consequence 2, approved
   `LDB-05` D9's captured `table-open` condition, and `docs/specs/product-vision.md:70` and `:91-95`,
   all reopened first-hand 2026-08-17.

   Neither examiner pass adjudicated it: instance A raised it after instance B had finished, and the
   two ran concurrently with no carrier for a handoff between them. **That is recorded in §17 as a
   finding about the instrument**, not about this ruling.

   Opening the chart keeps the Presentation out of the window exactly as `LDB-04` D4 already rules.
   **Cost: none beyond this entry** — no new field, no new mechanism, and the *"fade"* D10 describes
   becomes elective at a table rather than administered, which is the stronger form. **APPROVED,
   owner 2026-08-17.**

8. **`LDB-09`'s Unmeasured Activities show verdicts and earn XP, amending an approved spec.**
   `LDB-09` was approved 2026-08-15 with five types declaring `gradedBy: none` and D1's admission
   path for a type that *"measures nothing"*. **Amended here on the owner's ruling: they are graded,
   the learner is told, and they earn XP at a low rate.** They remain never-window-eligible, which is
   `LDB-09` D8's actual load-bearing clause and is untouched.

   **The word was carrying four jobs.** *Ungraded* had welded together *recorded*, *feeds the
   Recommender*, *verdict shown*, and *moves a bar*. The first two were already true in `LDB-09` D8
   (*"the evidence is recorded, may inform what to recommend next, and never reaches a bar"*); only
   the last is load-bearing; and the third was collateral. A `hand-sort` that will not tell you a hand
   was hard is not a gentler activity, it is a broken one.

   **Why the bar stays shut, on evidence rather than on caution.** `LDB-03` §6.1 rules that a
   decontextualised card sort *"measures it out of the situation that makes it hard."* Sorting a tidy
   batch into three bins is the easy form of noticing "hard 16" while a dealer shows 10 and the money
   is down. Letting it feed `classify-hand`'s bar would let a learner master a Skill by playing the
   easy version, against constraint 5.

   **Two costs, both stated.** The taxonomy JSON's five new types need `gradedBy` changed from `none`
   and a `verdictSurfaced: true` (the parameter `rule-contrast` already carries at `false`, so the
   vocabulary exists) — recorded in §11 item 9 and owed to whoever amends `LDB-09`. And the concept
   is **renamed to Unmeasured Activity** throughout, which touches `LDB-09`, `CONTEXT.md` and this
   document; `{ status: 'ungraded' }` stays in the schema, where it accurately describes grading
   *authority*. **APPROVED, owner 2026-08-17.**

9. **A chart-open hand does not move the Player score, where `LDB-05` D9 can be read as saying it
   does.** D9, approved 2026-08-05, says every Free Play decision is graded and recorded *"with the
   support Condition (`table-open` / `table-closed`) captured"*, and that *"the rating moves with how
   the learner played."* **It captures the condition and never says what the condition is for.**

   This card rules that chart-open hands are excluded from the rating, on the same ground Mastery
   excludes them: with the chart open, *how the learner played* is partly the chart's doing. The
   consequence is not cosmetic — `LDB-05` D7 lets the Player score gate **difficulty**, so a rating
   inflated by chart-open hands hands the learner tables they cannot play, which is constraint 2.

   **Recorded as a divergence although it may only be a completion.** The honest reading is that D9
   captures the condition precisely so that a later card can use it, and this is that card. But the
   sentence *"the rating moves with how the learner played"* carries no qualifier, so the opposite
   reading is available — and this repository's rule is to surface a possible reversal rather than
   rely on the charitable reading of a spec one is departing from. **No damping factor**: a partial
   weight would be a constant with nothing behind it, which `A-07` forbids. **APPROVED, owner
   2026-08-17.**

   **It travels with a standing rule** — a design document that removes a motivational mechanic must
   name what carries that motivation instead, or record that nothing does. The evidence for the rule
   is this document: `LDB-05` §0.1 names the design-the-fun-out habit, and D8 removed streaks three
   decisions later anyway. **APPROVED, owner 2026-08-15.**

10. **The learner-opened diagnostic is widened from D12's `whole-table` view to any candidate type
    legal in the current shape — added 2026-08-17 (composition pass).** D12 reserves `whole-table`,
    a `region` value of a **single** type, and rules it *"is never a session activity"*. D14's
    on-request channel offers a diagnostic across **any type in the candidate set** — six types for
    `strategy-action`. That is a real widening of an approved sentence in this same document, and it
    had been carried as a **citation to D12** rather than as a departure from it, which is how a rule
    nobody ruled acquires the authority of one.

    **Cost: none beyond this entry.** No field, no taxonomy edit, no new mechanism — `EvidenceMode`
    already carries `'diagnostic'`, annotated *"STORED but excluded from mastery"* (`types.ts:85`).

    **Why it is filed at all, against this document's own stated reason for not filing it.** §17.1
    declined one on the ground that *"a divergence records a departure from an approved **source**,
    and the candidate-set rule is this document's own invention."* §12 contradicts that ground three
    times over: divergences 5 and 6 are recorded here as *"divergences from **itself**"*, and
    divergence 7 is headed *"reversing this document's own D9 and D10"*. **Three of the entries above
    are self-divergences**, so the stated reason was false about the section it was reasoning about.
    That sentence is withdrawn at §17.1. **APPROVED, owner 2026-08-17.**

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

**Added 2026-08-15, from the pre-gate grill:**

- **The optional Classification control at the table** (D2, divergence 5). The hardest constraint on
  it is that it must not read as the app asking permission to grade you. It is an offer that buys the
  learner four more Skills' worth of credit, and it must be skippable without a second thought — a
  learner who ignores it forever loses nothing they had. Nearest approved precedent to design against
  is `LDB-04` D4's *"I'm not sure — show me"*, which is also an offered control with an evidence
  consequence.
- **~~How the up-only streak renders without acquiring loss framing.~~ RETIRED 2026-08-17 — there is
  no streak in v1 to render** (D8, divergence 6 struck). It is retired rather than deleted because
  the handoff's *content* survives the mechanic and transfers whole to the deferred weekly streak:
  the number is the mechanic, and a flame that greys out, a "keep it going" string, or a notification
  re-introduces the pressure `ACT:388`'s mission clause names, whatever the counter's arithmetic.
  **Nothing is owed to `LDB-07` on this now**; the note travels with the mechanic to whichever card
  builds it once accounts exist.
- **The removal rule** (D8). When `LDB-07` declines a motivational mechanic — and an interaction
  card will — it names what carries that motivation instead, or records that nothing does.

**To `LDB-08`** — *the blueprint*:

- **The storage boundary is one decision, not two** (D17). Wallet persistence and window persistence
  both force it; the Tool & Runtime Admission Protocol in `docs/specs/stack-boundaries.md` should be
  run once over the pair.
- **D2 changes the phase-5 instrumentation calculus, and divergence 5 changed it again.** If Table
  sittings feed the window, a slice that instruments Free Play covers `P-1` and `A-13`. **The `A-20`
  half was withdrawn on 2026-08-08 and is restored conditionally on 2026-08-15:** `A-20`'s named test
  is `adherence-under-loss` divergence; D2's scope limit made table evidence non-window-eligible for
  exactly that Skill (examiner F5), and divergence 5's opt-in Classification capture makes it
  eligible again **whenever the learner opts in**.

  **State the condition rather than the coverage.** A Free Play slice covers `A-20` only if it builds
  the opt-in control and only across Presentations where it was used, so the achieved sample is a
  learner behaviour rather than a property of the slice. If `LDB-08` declares `A-20` covered, it must
  say what opt-in rate it is assuming and how it will know. If the control is not built, the
  2026-08-08 position stands unchanged and `adherence-under-loss` must be instrumented in a Learning
  session. `A-20` shares the `P-1` instrument either way (`LDB-05` §13), so it is never unreachable.
- **`A-07f` closes from stored attempts with no new instrument. `A-07e` does not** — *corrected
  2026-08-17 (`RC-07`)*: its named test needs `presetId` on the attempt (§11 item 7), because a
  preset survives only on a closed session and the test measures completion. One additive field, then
  it closes.
- **Nine schema deltas are owed (§11)**, of which **three** are new fields: item 3
  (`resourcesConsulted`), item 5 (the produced Classification, added 2026-08-15) and item 7
  (`presetId` on the attempt, added 2026-08-17). Items 3 and 5 pull in opposite directions on window
  eligibility and must not be merged into one field.
- **One of the nine is a rule rather than a field, and it is the one most easily lost: §11 item 8.**
  Phase 5's reducer must fold the window on *the Activity type's `primaryFor` plus the `produced`
  contract*, not on `evidence.skillId`. Building it the obvious way — one attempt, one Skill — makes
  D2 unimplementable and will look like a D2 problem rather than a reducer problem.
- **A Table sitting closes with `'cashed-out'` or `'wallet-exhausted'` and a null `budget`** (§11
  item 6). Neither value exists today.

**To phase 5:**

- The session-size presets are **config, not constants** — the same reducer-seam principle `LDB-04`
  §13 set for `k` and `n`, so `A-07e` can be tested against re-parameterised replays.
- `'time-bound'` must not acquire a producer (§11 item 1).

### 14. Vocabulary owed to `CONTEXT.md` — to land at approval, not before

Six terms. **One is a correction to this document's own drafting**, recorded rather than quietly
fixed: the session shape now called **Coached session** was drafted as *Drill*, which collides with
`CONTEXT.md`'s existing `_Avoid_` lists — **drill** is already banned on **Cell**, on **Practice**,
and on **Activity type**. The glossary caught it; the draft did not.

All six land under a **new `## Sessions` heading** in `CONTEXT.md`, between `## Learning model` and
`## Economy` — naming the section so the landing is checkable, the convention `LDB-04` §16 and
`LDB-05` §15 both used.

- **Learning session** — A bounded run of Presentations with a named goal, a learner-chosen size, and
  a debrief. Covers curriculum work and Practice. _Avoid_: session (unqualified), lesson, round.
- **Table sitting** — One Free Play visit, from Buy-in to cash-out. _Avoid_: session (unqualified),
  game, visit, run.
- **Coached session** — A Learning session that repeats a segment until clean, corrects immediately,
  and may use `arranged` Provenance mode. _Avoid_: drill, practice session, training run.
- **Closing run** — A Learning session or Table sitting that plays one whole shoe in `organic`
  Provenance mode, with no correction until the debrief. In a Learning session the strategy table is
  not offered; at a Table sitting it is available on request and opening it costs that Presentation
  its window eligibility. _Avoid_: test, assessment, exam, final.

  *(The strategy-table clause was amended 2026-08-17 with §12 divergence 7. Recorded because the
  amendment splits one term across two contexts, and the alternative — inventing a fourth session
  term — would have bought a distinction the design does not otherwise make: everything else a
  Closing run **is** holds identically in both.)*

- **Unmeasured Activity** — An Activity type that produces no Mastery evidence: `primaryFor: []`,
  never window-eligible, admitted under `LDB-09` D1 by declaring the Skills it `rehearses`. It is
  still graded, still tells the learner the verdict, still recorded, still feeds the Recommender, and
  earns XP at a low rate. _Avoid_: **ungraded activity** (it is graded — the word survives only as
  `AttemptDisposition`'s `{ status: 'ungraded' }`, which describes grading *authority*), toy, filler,
  mini-game, warm-up.
- **Recommender** — What proposes the next Skill to work on, from the live Mastery window and
  recency. Never a Grading authority, and never a lock. _Avoid_: scheduler, planner, algorithm, AI.

**`Recommender` is included because two approved specs lean on it across three loci, and neither
defines it** —
`LDB-04` D2 (*"the recommender above all — reads the live window"*), `LDB-04` D8 (staleness), and
`LDB-05` D5.2 (*"the recommender's suggestion becomes the economically preferred path"*).

**Two `journal/decisions.md` rows, also at approval** — hard to reverse, surprising without context,
and the result of a real trade-off, which is the three-part test:

1. **Engineered exposure teaches; `LDB-04` D7's organic floor closes the claim** (D3) — with the
   bridge §4.6 / §7 contradiction named as what it resolves. *(Retitled 2026-08-15: the row was
   "an organic Closing run closes the claim", which is the rule the owner withdrew. The decision the
   row records — engineer the encounter, do not wait for the shoe — is unchanged; what is no longer
   true is that this card invents the closing mechanism.)*
2. **The three unordered Condition axes stay unordered; table character carries the progression**
   (D5) — with the note that this asserts no learning order and files no row.

**These two still land at approval and have not landed.** The 2026-08-15 grill wrote a *separate*
`journal/decisions.md` section recording the owner's twelve rulings from that session — that is a
record of decisions he made, not of this card's gate, and it does not discharge either row above.
Checked positively rather than assumed: `grep` for both row titles in `journal/decisions.md` on
2026-08-15 returns nothing.

`docs/adr/` is **not** created. `docs/agents/domain.md` and `AGENTS.md` both rule decisions live in
`journal/decisions.md` and that `docs/adr/` must not exist here.

### 15. Approval criteria — checkable

Each is a positive enumeration — what was looked for, and where — because a criterion that can only
fail when a record exists passes silently on a missing one.

1. **Session entry, size, stopping and mix are each decided.** D6, D7, D8, D4 — four decisions, named.
2. **The session-size numbers carry register rows.** `A-07e` (three presets) and `A-07f` (the
   separation gap), both specified in §10 with a named validation method and a mode.
3. **The blocked-versus-mixed rule is stated per Activity type.** D4's table carries **one row per
   Activity type declared in `2026-08-01-activity-taxonomy.json`, with the count read from that file
   at gate time** — not a literal written here. Every row states a ruling, an exemption with its
   reason, or `n/a` with its reason; none is blank.

   > **Rewritten 2026-08-17 (`RC-11`).** This criterion read *"D4's table has **6 of 6** rows"*. The
   > taxonomy went to 11 types when `LDB-09` was approved on 2026-08-15, so a criterion whose whole
   > job is to check coverage was **certifying a number it had memorised** — and it would have passed
   > a gate on a table missing five rows, because 6 of 6 is what it looked for and 6 of 6 is what it
   > found. That is the guard-that-cannot-fail shape this repository has now shipped five times, in
   > its purest form: a check that hard-codes the answer to the question it is asking. The count is
   > now read from the source of truth, so the criterion cannot go stale without the taxonomy going
   > stale with it.
4. **The bridge contradiction is resolved in writing.** D3, naming §4.6 and §7 explicitly, resolving
   in terms of what evidence a session must yield, and citing the code locus that makes it buildable.
   **Still satisfied after the 2026-08-15 withdrawal, and checked rather than assumed:** what was
   withdrawn is the per-session Closing run, which was D3's *addition*; the resolution itself —
   engineer the encounter, and let `LDB-04` D7's organic floor close the claim — is stated at D3 and
   is the same answer in terms of evidence rather than of engine capability. The card required the
   contradiction resolved, not a new rule invented to resolve it.
5. **All six `LDB-03` parameters carrying `owner: LDB-06` are valued.** The parameter table lists six;
   checked against `2026-08-01-activity-taxonomy.json` on 2026-08-08 — `feedbackTiming`,
   `segmentation`, `pace`, `ruleCardAvailable`, `revealMode`, `region`.
6. **Every item `LDB-04` §13 and `LDB-05` §13 handed here is answered or explicitly declined.**
   `LDB-04`: the `"faded"` trajectory → D10; the `resourcesConsulted` delta → §11 item 3; D7's organic
   minimum → D3; engineered exposure remains available → D3. `LDB-05`: when Practice opens → D13;
   nothing bounds practice → D8, answered partially and said so; the `Review due` full-rate coupling →
   D14; the `"faded"` / D9 interaction → D10 with D2.
7. **Divergences are surfaced, not applied silently.** **Every numbered entry in §12 carries a
   disposition — approved, or struck with its supersession named — and the counts are read from that
   section at gate time, not written here.** Every entry also states its cost, or states that it has
   none; silence is not an answer. Checkable by enumerating §12's numbered entries and confirming each
   has both.

   > **Rewritten 2026-08-17 at the gate grill.** This criterion read *"**Eight — seven approved, one
   > struck**"*. §12 held **nine** entries — the figure described the section as it stood before
   > divergence 9 was appended earlier the same day, and this criterion was edited that day to
   > *mention* divergence 9 while its leading count stayed at eight. The entry the count dropped was
   > divergence 6, the only one then carrying no disposition stamp at all. **A criterion whose stated
   > job is to stop divergences being applied silently was itself silently one short, and would have
   > passed a gate on the entry it omitted.** This is `RC-11`'s shape one criterion over: criterion 3
   > was rewritten the same day to stop hard-coding *"6 of 6"* and read its count from the taxonomy,
   > and nobody looked at the neighbouring criterion doing the same thing. The count is now read from
   > §12, so it cannot go stale without §12 going stale with it.

   As of this gate: **ten entries, eight approved, two struck** — read from §12 on 2026-08-17 after
   divergence 10 was added, and re-read by executing this criterion rather than by carrying the
   previous reading forward. (It said *"nine entries, seven approved, two struck"* an hour earlier.
   That the figure moved and the criterion caught it is the count-from-source rewrite working, on its
   first occasion to prove it.) Divergence 1 names its schema cost;
   divergence 4 both of its correction targets; divergence 5 the per-Presentation record it owes that
   §11 item 3 does not cover; divergence 7 that it costs nothing beyond its entry; divergence 8 its
   two costs; divergence 9 the reading of `LDB-05` D9 it rests on. **Divergence 2 is struck and
   superseded by 6; divergence 6 is struck and replaced by the deferred weekly streak** — both kept
   rather than rewritten, so the reasoning that reversed each stays readable, and so the difference
   between divergence 2's restored *outcome* and its unrestored *reasoning* is not flattened.
8. **No claim describes a source that was not opened.** **Checked by enumerating every first-hand
   mark in this document at gate time** — grep `reopened first-hand|read first-hand|opened
   first-hand` — and confirming each names a locus that resolves to what the claim says. A fixed list
   written on one date cannot do this job; the marks are the record.

   > **Rewritten 2026-08-17 (composition pass).** This criterion enumerated *"sources reopened
   > first-hand for this document **on 2026-08-08**"* and had never been extended. The document
   > carries **24** first-hand marks, twelve of them dated 2026-08-15 or 2026-08-17 and absent from
   > the list — including both `product-vision.md` loci carrying divergence 7's reversal of this
   > document's own ruling, and the three bridge anchors that had gone stale that morning. **A
   > criterion whose entire method is positive enumeration was enumerating a set the document had
   > outgrown**, and would have passed a gate while saying nothing about the newest and least-reviewed
   > claims in it. This is `RC-11`'s shape a third time: criteria 3 and 7 were rewritten the same day
   > to stop restating memorised counts, and the criterion directly below them hard-coded a **date**
   > instead. Same repair — read the set from source.
   >
   > The 2026-08-08 list is kept below as history, with its one error corrected: it claimed
   > `web/src/progress/types.ts:1-179` *"(the whole file)"*; the file is **178** lines.

   *History, 2026-08-08:* `run/U3/audit.md:31,33`; `run/U1/audit.md` rows `U1-5` and `U1-8`;
   `crates/blackjack-core/src/shoe.rs:62-100`; `web/src/progress/types.ts:1-178` (the whole file); the four binding
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

### 16.1 What the 2026-08-15 grill did to two examiner findings

The table above is the record of **2026-08-08** and is left exactly as it was. Two of its rows have
since changed status, and that is recorded here rather than by editing history.

- **F5 — scoped, then given an escape.** F5 was correct: `deal-and-decide`'s `produced` contract does
  require the Classification, and a table decision does not supply it. The 2026-08-08 fix was to
  narrow D2 to four Skills. **The 2026-08-15 grill found what that fix cost** — the four Skills that
  are the product's differentiator became unmasterable at a table, making *"measure play, not quiz
  scores"* true only of `hit`/`stand`/`double`/`split`. Divergence 5 adds an opt-in rather than
  reversing F5: the contract still governs, and the learner may now meet it.
- **F7 — correct, and its subject is gone.** F7 observed that D3 and `LDB-04` D7 both said "one" and
  counted different units. D3's "one" is withdrawn, so there is one "one" left. The finding was right
  and needed no repair beyond the removal of what it was about.

**And one thing neither the examiner nor the design interview caught, recorded because it is the
point of this section.** D3's withdrawn rule **deadlocked against D7 and D8 inside this same
document** — a Short arranged session could not legally end. The examiner assessed 48 claims for
whether each was warranted by its evidence, and every one of the three rulings involved was
individually warranted. **The pass reported no composition finding**, and its instrument asks whether
each ruling is warranted by its evidence rather than whether the rulings compose. That is a gap in
the instrument, not a lapse in its execution, and it is worth stating before the next document runs
an examiner pass and reads a clean result as a clean design.

> **Weakened 2026-08-17 (`RA-29`).** This sentence read *"Nothing in the pass looked at whether the
> rulings composed"* — a claim about what the pass **did**, which no surviving record can support: no
> record of the 2026-08-08 pass exists outside this section, and instance A of the 2026-08-15 pass
> searched `journal/raw/_inbox/**` — 145 files, enumerated positively — without finding one. What is
> supportable is what the pass **reported**. The point of §16.1 survives the weakening intact, which
> is why this is a relabel and not a retraction.

### 17. The two-instance examiner pass of 2026-08-15, and the gate grill of 2026-08-17

**Two `audit-examiner` instances ran concurrently over the 2026-08-15 redraft** — instance A over 29
claims, instance B over 18 compositions, records at
`journal/raw/_inbox/2026-08-15-ldb06-redraft-examiner/audit/`, RAW under Inbox Rule 0. Their 36
findings were compiled into `docs/superpowers/audits/2026-08-15-ldb06-redraft-corrections.md` in three
groups: 10 text repairs needing no ruling, 13 gate rulings, and 13 filed with no landing owed.

**Instance B was added because §16.1 had just recorded that the 2026-08-08 pass reported no
composition finding.** It worked. B walked a Short arranged Coached session to a legal close (RC-14),
confirmed D7's bound does not reach a Table sitting (RC-13), that reload produces no phantom
`SessionRecord` (RC-15), and that `'time-bound'` stays unreachable, owed and guarded (RC-17) — and it
found the composition defects a claim-by-claim instrument cannot reach, of which `RC-01` and `RC-03`
were load-bearing enough to block the gate.

**All 13 gate rulings were settled by the owner on 2026-08-17** and are landed above. The 10 text
repairs are landed. The 13 filed items needed nothing.

#### What the passes got wrong about themselves

- **Instance B over-scoped an absence claim.** Its record says `ungraded` *"appears nowhere"* in this
  spec; it appears three times, quoting the schema's `{ status: 'ungraded' }`. The substantive point
  survived and the claim as written did not. **That is failure class 3 recurring inside a pass built
  to catch failure class 3** — the third occurrence of the class in this document's history, after the
  2026-08-08 examiner's F2 grep and §16's own record of it.
- **One item fell between the two instances and nearly vanished.** A handed the
  chart-at-a-Table-sitting question to B; they ran concurrently and B had already finished. Nothing
  carried it. It was recovered by hand into the checklist's Group 2 and is now §12 divergence 7 —
  **the single largest ruling of the three passes, and the one closest to being lost entirely.**

  **The structural lesson, which is the reusable part: a cross-pass handoff between parallel
  instances has no carrier.** Two instances are strictly better than one at finding defects and
  strictly worse at *routing* them. Run the second instance after the first, or give the handoff a
  named owner before either starts.

#### What this section is not

**No verifier instance has re-checked either pass in full.** §17.1 records a **scoped** verifier pass
of 2026-08-17 over six gate rulings, and a composition pass of the same day; outside those scopes
every examiner verdict above remains unconfirmed in the sense `AGENTS.md` uses.

> **Qualified 2026-08-17.** This sentence read *"No verifier instance has re-checked either pass"*
> while §17.1, sixteen lines below, recorded one. The unqualified claim was true when written and was
> not revisited by the section appended beneath it. A subset was re-checked first-hand against the raw files during the
report-back — **enumerated by the ✔ marks in
`docs/superpowers/audits/2026-08-15-ldb06-redraft-corrections.md`, which are the record; this document
deliberately no longer restates their count.** (It said *"Eight of the 36"* until 2026-08-17; ten rows
carried the glyph. Both the audit's legend and this sentence had memorised a number beside a list that
could always be read — `RC-11`'s shape a third time.) A further set — the `product-vision.md`,
`LDB-05` D9, `LDB-04` D6/D3,
`journal/tasks.md:63` and `web/src/progress/types.ts` loci behind `RC-01`, `RC-05`, `RC-07`, `RC-09`,
`RA-11` and divergences 7 and 9 — was reopened first-hand on 2026-08-17 before the corresponding
ruling was written. **The rest carry an examiner's reading only, and this sentence is the record of
which is which** rather than an implied verification of all 36.

There were **no `Remove` and no `Replace` verdicts** across either pass: no claim in the redraft was
contradicted outright.

#### 17.1 The scoped verifier pass of 2026-08-17

**An independent `audit-verifier` was run at the gate over the six Group 2 gate rulings that no second
party had re-checked** — `RC-04`, `RC-06`, `RC-08`, `RC-10`, `RC-11`, `RC-12`. The scope is the
complement, enumerated positively rather than assumed: Group 2 holds thirteen; six carry the ✔
owner-checked mark in the corrections file; `RC-09`'s loci were reopened first-hand on 2026-08-17
before its ruling was written. The record is
`journal/raw/_inbox/2026-08-17-ldb06-gate-verifier/verification-record.md` — **RAW under Inbox Rule 0,
evidence and not authority.** The remaining 23 findings (Group 1's text repairs and Group 3's filed
items) are still examiner-only, and this sentence is the record of that.

**Five stale, one confirmed.** `RC-06`, `RC-08`, `RC-10`, `RC-11` and `RC-12` had each been overtaken
by a repair already in this document — the findings were right when written and no longer describe the
text. **`RC-04` survived, narrowed:** D14's candidate-set rule reached 9 of 11 Activity types, and its
stated ground misread `LDB-09`'s scope. **Ruled by the owner the same day** — a third `secondaryFor`
branch, drawn on the `rehearses` footing — and landed at D14. It was the only one of the six that
still moved anything.

~~**No new divergence is filed for it**, and the reason is stated rather than left to inference: a
divergence records a departure from an approved *source*, and the candidate-set rule is this
document's own invention at D14. Nothing outside it said otherwise. §12 stays at nine entries and
criterion 7's count is unaffected.~~

> **WITHDRAWN 2026-08-17 by the composition pass.** The stated ground was false about the section it
> was reasoning about: §12 records divergences 5 and 6 as *"divergences from **itself**"* and heads
> divergence 7 *"reversing this document's own D9 and D10"* — **three of its entries are
> self-divergences**, so "departure from an approved source" was never the filing test here. The rule
> is now **§12 divergence 10**, approved by the owner the same day. Kept struck rather than deleted so
> the reasoning that got it wrong stays readable — §12's own convention for divergences 2 and 6.
>
> Criterion 7 reads its count from §12 at gate time, which is exactly why adding an entry costs
> nothing: the criterion self-corrects, and this is the first occasion since that rewrite to prove it
> does.

**Two verdicts were re-checked against the pre-repair text by this session, which the verifier could
not open** — it has no shell and said so rather than inferring. `git show 4f0b7e7` confirms criterion
3 read *"6 of 6"* at `:1148` and D13 carried *"the definition binds D4's curriculum-only blocked
pool"* at `:671`. Both agree with the verifier's two-witness reasoning. **`RC-12`'s misquote was
likewise settled from git rather than from memory**, and the corrected quotation is at §10's `A-23`
row.

**What this pass does not establish.** It verified six findings; it did not re-verify the rulings
those findings produced, and no verifier has read this document's decisions as decisions. `RC-04`
demonstrates the difference: the finding was verified, the repair written for it was not, and the
repair is where the defect survived.
