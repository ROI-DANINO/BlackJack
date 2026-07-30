# LDB-03 Claim Examination — salvaged examiner record

> **Provenance, stated because it bears on how much this record is worth.**
>
> Dispatched 2026-07-30 as an adversarial claim-auditor over
> `docs/superpowers/specs/2026-07-30-activity-taxonomy-and-capability-map.md`, whose two central
> rulings were authored and self-validated by the same party. A concurrent verifier run over the
> document's citations **produced nothing** and was killed; its analysis is lost.
>
> **Why the first two runs appeared to fail.** The dispatch named a write path under `docs/`. That
> path is outside the `audit-*` roles' enforced write scope (`journal/raw/_inbox/<run-dir>/audit/`),
> and no run-dir was supplied — so the agent could not write where it was told to. That was the
> dispatcher's error, not a tool fault. This examiner raised the blocker and preserved its verdicts
> to a scratchpad; the file below is that scratchpad copy, moved here verbatim before the
> scratchpad was reclaimed. The header banner it wrote about not being the landed record is
> retained rather than edited, since it is part of what the run actually said.
>
> **Standing.** These are **examiner-level verdicts, not verified findings.** The examiner's own note
> requires each to be independently re-checked. Exactly one has been re-checked by the orchestrator
> so far, and it **confirmed**: `C-1a`'s counter-example that
> `web/src/learn/content/blackjack-basics.ts:199-210` poses the round order as a **two-option**
> question over four ordered elements, refuting the document's claim that F2's only admitted instance
> defeats enumeration.
>
> **Not yet landed.** No verdict below has been applied to the audited document except where a later
> commit says so explicitly. This repo's second evidence rule is that corrections do not execute
> themselves; treat every non-Preserve row as outstanding until the target file shows otherwise.

---

# LDB-03 Claim Examination — adversarial claim-auditor record (WORKING COPY)

> **THIS IS NOT THE LANDED RECORD.** The dispatch named
> `/home/user/BlackJack/docs/superpowers/audits/2026-07-30-ldb-03-claim-examination.md` as the write
> target. That path is outside this role's enforced write scope (`journal/raw/_inbox/<run-dir>/audit/`
> only; `docs/` is explicitly excluded), and the dispatch supplied no `<run-dir>`. Blocker raised.
> This scratchpad copy exists only so no verdict is held in memory alone.

Document under audit: `docs/superpowers/specs/2026-07-30-activity-taxonomy-and-capability-map.md`
Examiner role: examiner, not verifier. Every verdict below is to be independently re-checked.
Status: ALL 10 CLAIMS EXAMINED. No claim left NOT YET EXAMINED.

## Verdict table

| ID | Claim (short) | Verdict |
|---|---|---|
| C-1a | Enumerability test as a criterion (§4 condition 1) | **Revise** |
| C-1b | "Condition 1 is the real content of the cosmetic call" + the U3-7 reconciliation | **Replace** |
| C-2 | B1 reversal — three elements, six permutations | **Revise** |
| C-3 | A3 reversal — conditional loop, content is the soft-17 decision | **Revise** |
| C-4 | Over-supply condition + A-28 scope | **Relabel** |
| C-5 | F2 survives with one mapped outcome | **Revise** |
| C-6 | C-A separate-datum clause | **Relabel** |
| C-7a | F1 demotion — C1 served by recognition alone | **Preserve** |
| C-7b | P3 is "not a decision outcome" | **Revise** |
| C-8a | C-B provenance handling (defective-source disclosure) | **Preserve** |
| C-8b | C-B's embedded empirical sentence carried as Product judgement | **Relabel** |
| C-9 | §6 coverage claims | **Revise** |
| C-10 | Decisions made by silence | **Revise** |

Assessed: 13 claim-units (10 dispatched claims, 3 split). Routed to Non-material notes: 4.

---

## C-1a — the enumerability test. **Revise**

Claim, verbatim (`2026-07-30-activity-taxonomy-and-capability-map.md:141-142`):

> "**Condition 1 — the response space must defeat enumeration.** The orderable elements must be too
> many for the same question to be posed as an option set over orderings."

and `:150-152`:

> "Three elements is six permutations, which any option set can hold. Six elements is 720, which none
> can. **Cosmetic-versus-substantive for ordering is a function of the response space**, and the test
> must be applied per instance rather than to the pattern in the abstract."

Evidence checked against — the classifier's operative test, verbatim
(`docs/superpowers/research/activity-pattern-catalog/classification.md:28-32`):

> "**The operative test**, as the classifier framed it: strip the pattern to what it changes relative
> to *"present a state, pick one of N actions."* If the same question over the same stimulus could be
> posed **to the same effect** with a selection widget, it is **cosmetic**."

**Why it does not stand as written.**

1. **The test drops "to the same effect" and substitutes mechanical feasibility.** The document quotes
   the effect-equivalence wording correctly at `:148-149` ("could be posed to the same effect with a
   selection widget") and then writes condition 1 without it at `:141-142` ("too many for the same
   question to be posed as an option set"). Those are different tests. Feasibility-of-rendering is a
   cardinality property; effect-equivalence is a measurement property.

2. **Cardinality contradicts the document's own governing logic.** The document rests two other
   load-bearing rulings on *supply*, not on count:
   - `:45-46`: "presenting the cells supplies the recall, so a policy test decomposed into per-cell
     items is no longer a policy test."
   - `:156-157`: "A pool holding exactly the answer **supplies** it."
   An option set over six orderings supplies the six candidate orderings. By the document's own
   supply reasoning that is *not* the same question to the same effect — so condition 1's worked
   example (6 permutations ⇒ cosmetic) is refuted by the document's own criterion elsewhere.

3. **The threshold is undefined and the test is applied asymmetrically.** The only two anchors are 3
   elements (6) and 6 elements (720). 4 elements is 24 and 5 is 120; the document says nothing about
   where enumeration stops. It applies the test *numerically to reject* (`:168` B1 "six
   permutations") and *qualitatively to admit* (`:163` "Enough elements to defeat enumeration" for
   A4, with no count anywhere in the document).

4. **The one instance it admits is contradicted by shipped content.** The A4 order-of-play content is
   posed in this codebase today as a **two-option** selection:
   `web/src/learn/content/blackjack-basics.ts:199-210` — `round-order-check`, `prompt: 'Which order
   does a round follow?'`, two choices, the correct one being
   `'Opening deal → player turn → dealer turn → settlement'`. Four ordered elements, posed as an
   option set of two. That is the exact reduction condition 1 claims is impossible for the admitted
   instance.

**What must change.** (a) Restore effect-equivalence as the criterion and state the supply test that
actually does the work: an ordering is cosmetic when the option-set form poses the same question to
the same effect, which fails when enumerating orderings would *supply* arrangements the learner would
otherwise have to produce. (b) State the element threshold, or drop the numeric framing and rule per
instance on supply. (c) Count the elements of the A4 instance in the document, and reconcile with
`blackjack-basics.ts:199-210`.

**Consequence for the two reversals.** Because condition 1 as written is not a sound criterion, the
B1 and A3 rejections cannot rest on it alone — see C-2 and C-3, both of which survive on *other*
grounds.

---

## C-1b — "the real content of the cosmetic call" and the U3-7 reconciliation. **Replace**

Claims, verbatim (`:147-148`, `:174-177`):

> "**Why condition 1 is the real content of the cosmetic call.**"
> "…it is cosmetic in the short-sequence instances the classifier judged, and substantive in
> long-sequence instances with distractors. … the catalog's classification of both rows as cosmetic
> stands unchallenged — these conditions say when an instance escapes it, not that the call was
> wrong."

Evidence checked against:

- `classification.md:154-157` — the classifier's own recorded grounds for treating the two rows as
  one interaction: "**U2 rejected word-bank tile assembly; U3 admitted Parsons fragment assembly.**
  These are the same interaction — a supplied pool, one target arrangement." *Supply and arrangement.
  Length is named nowhere.*
- `classification.md:67` — the U3-7 row: "Fragment-assembly ordering (Parsons-style) | **cosmetic** |
  Evidence-backed | independent". No instance-length qualifier.
- `run/U3/audit.md:23` — the sourced pattern the classifier classified from: "Given a scrambled set of
  solution fragments, **some of which may be distractors that must be left unused**, drags them into
  a correct order" and "the response is **a permutation and subset over the fragment pool**, not
  selection of one option from a presented set."

**Why this is wrong, not merely imprecise.**

- The document attributes to the classifier a *length* reading. The classifier's recorded reasoning is
  a *supply* reading. Presenting the document's own new test as an excavation of someone else's is a
  claim about a source's reasoning that the source does not carry — the error class this repo's
  evidence discipline names first.
- "the short-sequence instances the classifier judged" is unsupported: nothing in `classification.md`
  or `run/U3/audit.md` scopes the U3-7 call to short sequences, and the row records no fragment count.
- The sourced U3-7 instance **already carries condition 2** — distractors that must be left unused,
  quoted verbatim in the audit row and quoted by the document itself at `:154`. So the document's own
  conditions, applied to the sourced row, do *not* leave the catalog's cosmetic call "unchallenged":
  condition 2 is met by the sourced form, and condition 1 is undetermined for it because no one holds
  a fragment count. The reconciliation asserts agreement it has not established.

**Successor claim to be drafted by a later role** (naming only, not drafting): that the two admission
conditions are this document's **own new test**, authored here and labelled as such; that applied to
U3-7's *sourced* form the test is indeterminate on condition 1 and satisfied on condition 2; and that
the ruling therefore constrains future instances rather than ratifying the catalog's call on the
sourced one.

---

## C-2 — the B1 reversal. **Revise**

Claim, verbatim (`:111` and `:168`):

> "*Not F2.* Three elements is six orderings — fully enumerable as an option set, so assembly buys
> nothing."
> "`B1`'s pair→soft→hard order fails condition 1 outright at six permutations."

Evidence — LDB-01's approved B1 (`2026-07-30-learning-outcomes-and-skill-graph.md:96`):

> "| **B1** | **Classify before lookup.** Produce the classification in the order pair → soft → hard,
> as a required step, before any chart access or action. | `classify-pair` **new**, `classify-soft`
> **new**, `classify-hard` **new** |"

**The task is mis-modelled.** B1's response is *the classification of a dealt hand* ("Produce the
classification"), performed under a fixed procedural order the curriculum specifies. The learner never
arranges pair/soft/hard; the order is a given, invariant, and stated in the outcome text. There is no
6-way permutation response space anywhere in B1 — the document invented one in order to score it
against condition 1.

Two further consequences the document misses, both of which make its conclusion *stronger* than its
argument:
- If a designer did ask the learner to arrange the three steps, there is exactly **one** admissible
  answer and it is printed in the outcome definition — so it fails on *supply* (the document's own
  condition-2 logic), not on permutation count.
- Modelling B1 as an ordering also cuts against the document's own C-A ruling at `:111` ("The C-A
  datum is the measurement"), which treats B1's measurement as a classification capture, not a
  sequence.

**Verdict.** The ruling (`B1` is not F2; it is measured by the C-A datum inside F3) **survives**. The
stated reason does not. Revise to: B1 is not a sequencing task at all — its response is a
classification per hand, so F2 is inapplicable regardless of permutation count; and any assembly form
of the pair→soft→hard order would supply its own answer.

---

## C-3 — the A3 reversal. **Revise**

Claim, verbatim (`:108`, `:166-168`):

> "*Not F2.* The dealer procedure is a conditional loop, not a permutation — its content is the
> soft-17 condition, which is a decision."
> "`A3`'s dealer procedure fails condition 1 and is not even a permutation; it is a conditional loop
> whose content is the soft-17 condition, a decision."

Evidence — LDB-01's approved A3 (`2026-07-30-learning-outcomes-and-skill-graph.md:83`):

> "| **A3** | **Read what the dealer shows and what it hides.** State the upcard and, *before the
> reveal*, predict the dealer's **forced** draw sequence under the active rule. | `dealer-info` |"

and the shipped skill (`web/src/learn/content/blackjack-basics.ts:186-197`): `dealer-info-check`,
`prompt: 'During the player turn, how much of the dealer's hand can you see?'` — a two-option
recognition item about *visibility*, not about the soft-17 branch.

**What survives.** "Not a permutation" is sound and is the load-bearing half: the draw sequence's
length is data-dependent (it depends on the unseen hole card), so there is no fixed element set to
arrange. A3's own approved form is predict-before-reveal, which is why `:108` correctly gates it with
C-B. That is a structural argument, not a convenient one, and it holds without condition 1.

**What does not.**
1. **"its content is the soft-17 condition, which is a decision"** conflicts with the outcome's own
   word: LDB-01:83 calls the draw sequence **forced**. The H17/S17 branch is the *dealer's* rule
   branch, not a learner decision; the document silently converts one into the other.
2. **It over-narrows A3.** A3's content is the upcard/hole-card split *and* the forced draw under the
   active rule. The only shipped `dealer-info` evidence
   (`blackjack-basics.ts:186-197`) is about visibility and does not touch soft-17 at all. "Its content
   is the soft-17 condition" is false of the outcome as approved and of the shipped skill.
3. **"fails condition 1" is asserted without a count.** Rendered as an assemblable routine — reveal
   hole card → draw while under 17 → apply the soft-17 rule → stand — the procedure is ~4 elements
   (24 orderings), which sits inside the undefined middle of the document's own 6-vs-720 scale.

**What must change.** Rest the A3 rejection on the non-permutation structure and on A3's
predict-before-reveal form (C-B), delete the claim that its content is the soft-17 condition, and
either count the elements or stop asserting a condition-1 failure the document does not evidence.

---

## C-4 — the over-supply condition and A-28's scope. **Relabel**

Claims, verbatim (`:143-144`, `:156-158`, `:182-183`):

> "**Condition 2 — the pool must over-supply.** It must contain distractors that have to be left
> unused, so that using it requires *rejection* and not merely arrangement."
> "A pool that over-supplies forces the learner to reject, and **rejection is discrimination** — the
> mechanism behind the corpus's strongest asset (discrimination errors 46% → 10%)."
> "Condition 2's empirical half — that an over-supplied pool measures discrimination rather than
> arrangement — is registered as `A-28`."

Evidence — the register row exists and is scoped honestly
(`docs/superpowers/specs/assumption-register.md:77`):

> "| A-28 | An over-supplied assembly pool … measures discrimination rather than mere arrangement, and
> so escapes the cosmetic classification that an exact-fit pool earns. | **Inferred, not held.** …
> **no held evidence shows that requiring rejection from a pool exercises the same discrimination that
> interleaving trains.** The connection is this project's … | Low | **playtesting** … |"

And §1.1 as written (`2026-07-22-product-design-inputs.md:53-63`) — interleaving improves
"**discrimination between kinds of problems**"; it says nothing about rejecting items from a pool.

**Findings.**

1. **A-28's scope is correct and, unusually, more honest than the prose it registers.** The row states
   the exact inferential gap and names a validation method that would actually close it (over-supplied
   vs exact-fit arms, scored on classification accuracy elsewhere in the session). As an Assumption
   the claim is admissible: falsifiable, untested, method named. That is the right filing.
2. **The prose overclaims relative to its own row.** `:157` asserts the identity flatly —
   "rejection **is** discrimination — the mechanism behind the corpus's strongest asset" — with no
   label at the point of use, while A-28 records that "Neither source connects the two". Under this
   repo's rule that labels attach to claims, the identity sentence must carry the `A-28` label where
   it is asserted, not 25 lines later and not restricted to an "empirical half".
3. **More of the ruling is unregistered than the row admits.** `:183` registers only condition 2's
   empirical half. **Condition 1 carries no evidence label anywhere in the document** — not
   Evidence-backed, not Product judgement, not Assumption — despite being falsifiable (a 6-element
   ordering may measure nothing more than a 3-element one) and despite licensing two reversals. That
   is an unlabelled load-bearing claim.
4. **The discriminanda differ and the document does not say so.** §1.1's discrimination is between
   *kinds of problem* (is this a soft 16 or a pair of 8s). Pool rejection is discrimination between
   *correct and incorrect procedural steps*. A-28's evidence column concedes the sources do not
   connect them; the prose does not.

**What must change.** Label the identity claim at `:157` as resting on `A-28`; and either register
condition 1's empirical half or label it Product judgement explicitly.

---

## C-5 — F2 surviving with exactly one mapped outcome. **Revise**

Claim, verbatim (`:109`, `:275-277`):

> "| `A4` legal action through a full round | **F3**, **F2** | — | F2 isolates the order-of-play
> dimension F3 confounds with action legality: `round-flow`, `split-hands`, `complete-round`. The only
> outcome meeting §4's two conditions today. |"
> "F2 maps to one outcome, which is narrow but honest: it is the only outcome meeting §4's conditions
> today, and the conditions are what would let it grow if a longer sequence enters scope."

**What survives, and why.** The measurement argument for keeping F2 as a family is specific and real,
not padding: an engine-backed hand confounds "does the learner know the order of play" with "did the
learner pick a legal action", and no other family isolates the first. F2 is also genuinely distinct
from F4 (F4 is defined at `:40` as "produces the answer with **no option set**"; an over-supplied pool
*is* an option set) and from F3 (no engine play). A one-outcome family is therefore not per se a
defect, and collapsing it into F3/F4 would lose the isolation argument.

**What does not survive.**

1. **The sole admitted instance is never shown to pass condition 1.** The document names three skills
   — `round-flow`, `split-hands`, `complete-round` — and asserts "Enough elements to defeat
   enumeration" (`:163`) without a step list or a count. Three named elements is the same count the
   document uses at `:168` to *disqualify* B1. The shipped instance of exactly this content is a
   4-element order posed as a **two-option** question (`blackjack-basics.ts:199-210`).
2. **F2 is bold (primary) evidence for A4, a decision outcome, while measuring declarative sequence
   knowledge.** F2's own permission column reads "sequence knowledge" (`:38`); A4's approved form is
   behavioural — "Play a round to resolution choosing only legal actions, including after a split"
   (`skill-graph.md:84`). LDB-01's admissibility test (`skill-graph.md:48-50`, and §1.7 behind it)
   exists precisely to stop knowledge-shaped evidence standing for a behavioural outcome. Arranging
   tiles into the right order is not playing a round.
3. **F2 is not load-bearing for coverage and the document does not say so.** Delete F2 and all 18
   outcomes still have a family (A4 keeps F3). §6's test is "every family has at least one outcome",
   which is weaker than necessity; the honest statement is that F2 is retained on a **product
   judgement** about isolating order-of-play, pending a longer sequence entering scope.

**What must change.** State the actual orderable step list and its count for the A4 instance and show
it clears condition 1; demote F2 from primary to supporting on A4 or justify primary status against
A4's behavioural definition; and label F2's retention as a product judgement rather than a
coverage-derived necessity.

---

## C-6 — contract C-A's separate-datum clause. **Relabel**

Claim, verbatim (`:64-73`):

> "**The capture is recorded as its own attempt datum, under its own outcome id, scorable and gateable
> independently of the action taken on the same hand.** This clause is not decoration. The corpus's
> strongest asset is the finding that *interleaving improves discrimination, and classification should
> be measured **separately** from action selection* (discrimination errors 46% vs 10%; 72% vs 38%,
> d=1.05)."

Evidence — §1.1 in full (`2026-07-22-product-design-inputs.md:53-63`) says:

> "The mechanism the authors name is what matters here: it improves **discrimination between kinds of
> problems** and **strengthens the association between each kind and its strategy.**"

§1.1 contains **no measurement prescription at all**. And LDB-01, approved, has already ruled on
exactly this over-reach (`skill-graph.md:215-223`):

> "What this licenses is that **classification is a separable, trainable capability that practice must
> never hand to the learner** — an **EB** requirement… **The claim that forcing an explicit,
> separately-scored classification step improves decision accuracy is a further step again, and is
> registered as `A-24`.**"

**Findings.**

1. **The evidence level is wrong.** The italicised clause "classification should be measured
   separately from action selection" is presented as a finding of the corpus. It is not in §1.1. The
   separate-*scoring* step is `A-24` — an Assumption at "Medium on the requirement, unknown on the
   step" (`assumption-register.md:72`). C-A's second paragraph is the operationalisation of A-24 and
   must cite it. LDB-01 drew this exact line one card earlier; LDB-03 crosses it back.
2. **The clause does deliver separability, not merely relocate a promise — on one condition.** Both
   stated consequences are computable from data the outcomes already require:
   - the record grain exists: `AttemptRecord.outcomeId` is a validated FK into `Subject.skills`
     (`skill-graph.md:74`), and the shipped field is literally named `outcomeId`
     (`blackjack-basics.ts:188`), so "under its own outcome id" is coherent at the shipped grain;
   - consequence 1 (distinguishing correct-classify/wrong-action from misclassify-and-play-consistently)
     is computable because A2 requires "its total **and** its class" (`skill-graph.md:82`) and B1
     requires the classification — class + total + upcard determines a chart cell, so the action can be
     scored against the learner's *asserted* class as well as the true one. The document does not state
     that derivation rule; it should, or consequence 1 is satisfiable but unspecified.
   - consequence 2 (classification mastery from classification data alone) is consistent with LDB-01
     and with the bridge's §3 constraint 1, since the datum is captured inside a played hand.
3. **C-A's stated scope contradicts the §3 map.** `:58-59` says "**Any** activity measuring a decision
   outcome must capture the learner's classification". Per LDB-01 §1 (`skill-graph.md:62`) every
   outcome but `C1` is a decision — yet `A4` carries "—" for contracts (`:109`), and `A3`, `A5`, `P1`
   carry only C-B. Either C-A's scope wording must narrow to §4.3's "wherever the real task requires
   it", or those rows need C-A.

**What must change.** Cite `A-24` at the clause and label the separate-scoring requirement as resting
on an Assumption; delete or attribute the pseudo-quoted "should be measured separately" finding; state
the against-asserted-class scoring rule; reconcile C-A's "any decision outcome" scope with §3.

---

## C-7a — F1 demoted, C1 served by recognition alone. **Preserve**

Claim (`:117`): "| `C1` identify the active ruleset | **F1** | — | The one legitimate sole use of
recognition: the real task *is* recognition. |"

This is not the document's ruling to make and it does not make it — it inherits an approved one.
LDB-01 §1 (`skill-graph.md:62`): "**'Selects the correct option about X'** — admissible **only** where
the real task is itself recognition (§4.1). `C1` is the only outcome that qualifies"; and LDB-01 §6.1
(`skill-graph.md:339`): "One recognition outcome, `C1`, is admitted under §4.1's carve-out because the
real task is itself recognition." C1's own text is "Given a table, **state** H17/S17, deck count, DAS,
surrender availability, and payout" (`skill-graph.md:121`) — reading attributes off a displayed table
is recognition by construction. The demotion itself is independently warranted by `A-10`
("Very low — likely to be retired rather than validated", `assumption-register.md:58`).

**Preserved because**: the claim is downstream of an approved ruling, restates it without widening it,
and the carve-out's justification (the real task is display-reading) holds against C1's own wording.

---

## C-7b — "P3 is not a decision outcome". **Revise**

Claim, verbatim (`:122`): "| `P3` read an EV statement without deciding by it | **F1**, F5 | — |
Interpretation, not a decision (`D-1`). F1 is admissible precisely because this is not a decision
outcome. |"

Evidence — P3 as approved (`skill-graph.md:144`):

> "| **P3** | **Read an EV statement without using it to decide.** Given two plays and their EV, state
> which loses less over many hands — **and in play, still choose the charted action.** | `ev-interpret`
> **new** |"

**Three problems.**

1. **P3 has an in-play behavioural clause.** "in play, still choose the charted action" is a decision
   behaviour. Neither F1 (recognition) nor F5 (calibrated estimate under a proper scoring rule) can
   measure it. The map assigns that half of the outcome to no family.
2. **The reclassification contradicts approved LDB-01 without saying so.** `skill-graph.md:62` says C1
   is *the only* outcome that qualifies as recognition and "every other outcome is a decision".
   Declaring P3 "not a decision outcome" creates a second recognition-admissible outcome — an
   amendment to an approved document, made in a table note, unlabelled.
3. **`D-1` does not license it.** D-1 rules that EV is "interpretive literacy, never a decision **rule**"
   (`skill-graph.md:265-269`). "Not a decision rule" is not "not a decision outcome". `A-27`'s own
   validation method assumes in-play measurement: "Play-decision accuracy across an EV-literate and a
   no-EV arm, **measured on hands played**" (`assumption-register.md:75`).

**What must change.** Name where P3's in-play half is measured — F3 under C-A, or explicitly as a
non-deviation condition observed on B2/B3 hands — and stop asserting P3 has no decision component. If
the document intends to amend LDB-01's recognition carve-out, it must say so in those words.

---

## C-8a — C-B's provenance handling. **Preserve**

Claim, verbatim (`:77-79`):

> "*Provenance stated honestly:* §4.4's usual citation is §1.4, which `§0` of the bridge marks
> `[DEFECTIVE-SOURCE]` and which was **not reopened here**. C-B is carried as an approved product
> requirement, labelled **Product judgement**, not as an evidence-backed finding."

Checked against the bridge: §1.4 is indeed marked `[DEFECTIVE-SOURCE — see §0]`
(`2026-07-22-product-design-inputs.md:83`); §0's rule is "Anything marked `[UNVERIFIED]` or
`[DEFECTIVE-SOURCE]` must not be **leaned on** without reopening the source first. Do not inherit —
that is this program's founding error class" (`:44-45`); §4.4 is itself an approved requirement
(`:224-225`).

**Not laundering, on three grounds.**
1. The rule §0 states is a bar on *leaning on* the source — i.e. on asserting its finding as warrant.
   The document does the opposite: it names the defect, states it did not reopen, and drops the
   evidence level to Product judgement. That is precisely "if you could not open it, say so".
2. §0 is inside the same approved document as §4. Approval of §4.4 was approval **with notice** of
   §1.4's defect, so the requirement's binding force does not route through the defective finding.
3. The identical handling was already approved one card upstream for `P2`
   (`skill-graph.md:152-155`), which uses almost the same sentence. Consistency with an approved
   precedent, disclosed, is not inheritance.

**Preserved because**: the claim's warrant is the requirement's approved status, not the source's
content; the defect is disclosed at the point of use; and the label is downgraded rather than
borrowed.

---

## C-8b — C-B's embedded empirical sentence. **Relabel**

Claim, verbatim (`:75-76`): "**C-B — Prediction gate (§4.4).** No distributional display renders until
a prediction is recorded. **A simulation that does not first capture a prediction is decoration.**"

The first sentence is a design rule — a product judgement, free to change with a label, correctly
handled by C-8a. The second is an **empirical proposition** about what teaches: it is falsifiable, it
is untested in this project's possession (its only warrant, §1.4, is DEFECTIVE-SOURCE and unopened),
and it would change under contradicting data. The register's own distinction
(`assumption-register.md:36-40`) puts exactly that shape in the Assumption column: "**Assumption** —
falsifiable, untested, and would change under contradicting data. **Needs a row.**"

This matters because C-B is load-bearing well beyond its own paragraph: it carries `P2` entirely
(`:121` "**C-B itself**"), gates F3/F5/F6, is the sole surviving form of `U2-5` (`:226`), and is the
only condition under which `U2-13` is admitted (`:233`). No existing row covers it — `A-22` covers a
variance sandbox's teaching claim, not the prediction gate.

**What must change.** Either strike the empirical sentence and keep the requirement, or register the
empirical half with a named validation method and cite it at the contract.

---

## C-9 — the coverage claims. **Revise**

Claim, verbatim (`:281-284`):

> "**2. No capability that is a decision is measured only by recognition.** F1's entire scope is `C1`
> (recognition is the real task) and a supporting role on `P3` (interpretation, not a decision).
> **Every decision outcome names F3, F6 or F7 as primary.**"

**Walked outcome by outcome**, taking LDB-01 §1's ruling that every outcome but `C1` is a decision
(`skill-graph.md:62`), against §3's map (`:106-123`; bold = primary per `:102`):

| Outcome | Decision? | Primary family in §3 | Recognition-only? |
|---|---|---|---|
| A1 | yes | F3 | no |
| A2 | yes | F3 (via C-A); F4 secondary | no |
| A3 | yes | F3 | no |
| A4 | yes | F3 **and** F2 | no |
| A5 | yes | F3 | no |
| B1 | yes | F3 (via C-A) | no |
| B2 | yes | F3 | no |
| B3 | yes | F3, F7 | no |
| B4 | yes | F3 | no |
| B5 | yes | F3 | no |
| B6 | yes | F6 | no |
| C1 | **no** (approved carve-out) | F1 | permitted |
| C2 | yes | F3; F7 secondary | no |
| C3 | yes | F6 | no |
| P1 | yes | **F5** | no |
| P2 | yes | **none — contract C-B** | no |
| P3 | yes (LDB-01) | **F1**, F5 secondary | not *only* — F5 is listed |
| P4 | yes | F6 | no |

**The headline claim holds.** No decision outcome is mapped to F1 as its *sole* family. `C1` is the
only recognition-only mapping and it is the approved carve-out. The card's approvable-when clause
("no capability that is a decision is measured only by recognition",
`journal/ops/tasks.md:92`) is satisfied on the map as drawn. That result is preserved.

**Three supporting statements are false as written.**
1. "Every decision outcome names F3, F6 or F7 as primary" is false three times over: `P1`'s primary is
   **F5**, `P3`'s primary is **F1**, and `P2` names **no family at all**.
2. `P3` is carried only by F1 (primary) + F5. F5 is defined as "states a probability or interval under
   a proper scoring rule" and may not measure "correctness on any single estimate" (`:41`); P3's task
   is a comparative correctness judgement plus an in-play non-deviation clause. F5 is a poor fit, and
   with F5 excluded the headline claim would fail on P3. The safety margin here is one questionable
   cell, and the document should say which measurement F5 actually performs for P3.
3. §6.1's enumeration does not match §3. `:274` asserts "F4→`A2`,`B3`", but B3's row (`:113`) lists
   only "**F3**, **F7**" — F4 appears nowhere on B3, despite `U3-1` and `U3-9` being adopted into F4
   for chart-withdrawn recall content (`:205`, `:210`). §6.1's claim that the counts were "recounted
   from the rendered tables" does not hold for this cell.
4. `:277-279` "All 18 outcomes have a family" is contradicted by its own following clause ("`P2`
   carried by contract C-B rather than by a family"). Honest, but self-contradicting as a coverage
   assertion.

---

## C-10 — decisions made by silence. **Revise**

The card requires (`journal/ops/tasks.md:91-92`): Source `§4` of the bridge — the six activity-evidence
requirements — with the Outcome clause naming three of them explicitly.

**Positively enumerated: what I looked for, where, and what I found.** I checked the audited document
for a contract or handoff answering each of the bridge's six §4 requirements
(`2026-07-22-product-design-inputs.md:218-232`):

| §4 req | Covered where in the audited doc |
|---|---|
| §4.1 decision behaviour, declared capability | §1 F1 row `:37`; §3 whole map; §0 `:27-29` |
| §4.2 **practice pools mixed by default; a blocked pool declared as such** | **NOWHERE** |
| §4.3 classification a required step | C-A `:58-73` |
| §4.4 predict-then-reveal | C-B `:75-79` |
| §4.5 assistance recorded honestly | C-D `:87-92` |
| §4.6 rare-event exposure engineered | `:123` (P4 row) |

Search performed on the audited document for `mixed|blocked|interleav|CFL-007|4\.2`: **one hit only**,
`:66`, and it is C-A's justification, not a pool rule. So:

1. **§4.2 is decided by silence.** The bridge's mixed-by-default requirement carries a per-activity
   declaration obligation ("A blocked pool is permitted only for first exposure to a category, and
   **must be declared as such**", `:220-221`) and rests on the resolved `CFL-007` ruling (`:270-284`).
   The audited document neither imposes it as a contract nor hands it to LDB-06 — and §6's explicit
   "Open items handed forward, so silence is not read as a ruling" list (`:290-294`) does not mention
   it. This is the one §4 requirement the card sourced that the document neither discharges nor defers.
2. **Condition 1 carries no evidence label** (see C-4.3). Every other load-bearing claim in the
   document is labelled or registered; this one is not.
3. **P3's reclassification out of the decision set** amends approved LDB-01 §1 without saying so
   (see C-7b).
4. **C-A's scope is narrowed in practice without being narrowed in text** — "any activity measuring a
   decision outcome" (`:58`) versus `A4`'s "—" contracts cell (`:109`) (see C-6.3).
5. **The four new families ship with no requirement set.** §0 records that the three existing families
   carry "41 `ALR-*` requirements" (`:19-21`); F4–F7 are added with none, and the document does not say
   who writes them or that they are deferred. LDB-07 owns the interaction contract, but the document
   does not hand this forward.
6. **F2's retention is never labelled** as the product judgement it is (see C-5.3).

**What must change.** Add §4.2 to the contract set or to the handed-forward list with a named owner;
label condition 1; state the LDB-01 amendment for P3 or withdraw it; reconcile C-A's scope sentence;
say who writes the new families' requirements.

---

## Non-material notes (no verdict, no landing loop)

- **`A-28` renders outside the register table.** `assumption-register.md:76` is a blank line and `:77`
  is a single table row with no header, so the row renders as a detached fragment rather than as part
  of the register table. The row exists, is greppable, and its content is correct; the audited
  document's claim that it is registered is true. Formatting only.
- **"under its own outcome id"** (`:64`) reads as the wrong grain against LDB-01's "Skills are the
  evidence grain" (`skill-graph.md:72-75`), but resolves in the document's favour: the shipped field is
  literally `outcomeId` and takes skill ids (`blackjack-basics.ts:188`; `skill-graph.md:74`). No
  correction needed.
- **§5's disposition arithmetic holds.** 15 tabled + `U2-6` + `U2-14` = 17 adopted; 11 rejected
  outright as listed; 4 other (`U2-5`, `U2-13`, `U3-7`, `U2-10`); 17+11+4 = 32 distinct ids, and the
  "16 not 11" reconciliation at `:255-259` accounts for exactly the five non-outright rows. Checked and
  sound.
- **`:172-177` "Both units were right"** is a framing sentence; its substantive half is audited under
  C-1b and needs no separate verdict.
