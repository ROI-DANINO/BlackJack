# Activity Taxonomy and Capability Map — LDB-03

> **Status: draft for approval.** Gate: user-approval. ROADMAP Phase 4 deliverables 3 (activity
> taxonomy) and 4 (which activity measures which capability).
>
> **Inputs.** `2026-07-22-product-design-inputs.md` §4 (the six activity-evidence requirements);
> the 18 approved outcomes of `2026-07-30-learning-outcomes-and-skill-graph.md` (LDB-01); the 32
> patterns of the LDB-02 catalog, read at `run/U1|U2|U3/audit.md` rather than from summary.
>
> **What this decides.** The closed list of activity families, what each may and may not measure, the
> contracts that bind every family, and an adopt-or-reject verdict with a reason for all 32 patterns.
> It does **not** decide mastery thresholds (LDB-04), session size or mix (LDB-06), or the
> interaction contract and WCAG target (LDB-07).

---

## 0. Three families already exist, and that is the starting point

The approved activity evidence set of 2026-07-16 (`journal/decisions.md:30`) admitted **three
deterministic activity families** — Multiple Choice, Assemble Blocks, Engine-Backed Hand — with 41
`ALR-*` requirements attached. This document does not replace them. It keeps all three, demotes one,
and adds four, because the 18 approved outcomes include capabilities no existing family can measure:
a calibrated numeric estimate, a deferred session-level verdict, a whole policy, and free production.

**The demotion matters most.** Multiple Choice currently governs **100% of shipped mastery evidence**
(`validate.ts:65-66`), and `A-10` rates that assumption *"Very low — likely to be retired rather than
validated"*, since none of the three sources cited for it addresses format validity (`K-U4-003`).
§4.1 and the LDB-01 outcomes settle it: recognition may not be the sole evidence for any outcome that
is a decision.

---

## 1. The taxonomy — seven families

| # | Family | The learner… | May measure | May **not** measure |
|---|---|---|---|---|
| **F1** | **Recognition check** *(existing: Multiple Choice)* | selects from a bounded option set | outcomes whose real task is itself recognition | any decision outcome, as sole evidence |
| **F2** | **Ordered assembly** *(existing: Assemble Blocks)* | arranges a supplied pool into a sequence or grouping | outcomes where the *ordering* is the capability | anything the pool's contents supply |
| **F3** | **Engine-backed hand** *(existing)* | plays dealt state to resolution through the engine | decision outcomes, procedural transfer | distributional concepts without a prediction |
| **F4** | **Free production** *(new)* | produces the answer with no option set — names, enumerates, or writes a rule | recall breadth, abstraction across cells | anything requiring graded natural language |
| **F5** | **Calibrated estimate** *(new)* | states a probability or interval under a proper scoring rule | calibration, distributional literacy | correctness on any single estimate |
| **F6** | **Deferred-verdict session** *(new)* | plays an uninterrupted run; judgement arrives only at a debrief | decision/outcome separation, session-level behaviour | anything needing immediate correction |
| **F7** | **Whole-policy production** *(new)* | produces a complete policy over a space that is never presented cell by cell | whether a policy is held, as distinct from cells recalled | individual cell recall |

**F7 exists because decomposition destroys the measurement.** The catalog is explicit: presenting the
cells supplies the recall, so a policy test decomposed into per-cell items is no longer a policy test.
F7 is the only family that can measure `B3` as *policy* rather than as accumulated recognition.

**F5 exists because no other family can be scored on calibration.** Every other family scores an
attempt right or wrong; calibration is a property of a *series* of estimates and is meaningless on one.

---

## 2. Cross-cutting contracts

These bind every family. A family is not a licence to skip them.

**C-A — Classification gate (§4.3).** Any activity measuring a decision outcome must capture the
learner's classification *before* offering the action, and must never display the class. An activity
that says "this is a soft total" is not measuring the skill. This is what makes `A2` and `B1`
measurable inside F3 rather than needing a family of their own — a standalone classification exercise
would be recognition, which §4.1 forbids for a decision outcome.

**C-B — Prediction gate (§4.4).** No distributional display renders until a prediction is recorded.
A simulation that does not first capture a prediction is decoration. Applies to F3, F5 and F6 alike.
*Provenance stated honestly:* §4.4's usual citation is §1.4, which `§0` of the bridge marks
`[DEFECTIVE-SOURCE]` and which was **not reopened here**. C-B is carried as an approved product
requirement, labelled **Product judgement**, not as an evidence-backed finding.

**C-C — No jeopardy verdict, which is narrower than "grade nothing".** The debrief issues no
pass/fail verdict. It does **not** follow that nothing is scored — a score may exist without being
surfaced as jeopardy. This is the corrected reading: the aviation guide the catalog draws on asserts
no-jeopardy training in one chapter, denies the concept in another, and ships a graded per-individual
assessment form with a signature line. What survives is the narrow rule only.

**C-D — Assistance honesty (§4.5).** An activity records an assistance level only when that
assistance was actually delivered. **This contract is violated in shipped code today**:
`controller.ts:123` labels a second bare retry `'instruction'` when no instruction exists and no hint
ladder is built (`K-U6-005`, outstanding). LDB-04 owns the fix; no family here may add a second
instance.

**C-E — No learner self-rating as a mastery signal.** Never, in any family. Kornell & Bjork: 78% of
learners performed better under spaced practice and 78% rated massed practice as good or better. **The
learner does not know what worked.** This is the sole reason `U2-9` is rejected below despite being
otherwise buildable.

---

## 3. The capability map

Every one of LDB-01's 18 outcomes, and the family that measures it. **Bold** = primary evidence.

| Outcome | Family | Contracts | Note |
|---|---|---|---|
| `A1` pursue the dealer, not 21 | **F3** | C-A | Only the discriminating case counts — low total vs weak upcard. |
| `A2` read a hand before acting | **F3** (via C-A), F4 | C-A | The classification capture *is* the measurement. |
| `A3` read what the dealer shows and hides | **F2**, F3 | C-B | F2 measures the forced draw sequence as an ordering. |
| `A4` legal action through a full round | **F3** | — | |
| `A5` settle a round before it settles itself | **F3** | C-B | Prediction before payout renders. |
| `B1` classify before lookup | **F3** (via C-A), F2 | C-A | F2 measures the pair→soft→hard *order*; F3 measures its use. |
| `B2` charted action, chart open | **F3** | C-A | |
| `B3` charted action, chart withdrawn | **F3**, **F7** | C-A | F3 measures cells; F7 measures whether a policy is held. Both. |
| `B4` fall back when the action is illegal | **F3** | C-A | |
| `B5` full evolving hand at charted correctness | **F3** | C-A | |
| `B6` judge the decision, not the result | **F6** | C-C | Behavioural only — the attitudinal version measures nothing (§1.3). |
| `C1` identify the active ruleset | **F1** | — | The one legitimate sole use of recognition: the real task *is* recognition. |
| `C2` change the answer when the rule changes | **F3** (paired rulesets), F7 | C-A | Scored on delta cells only. |
| `C3` adapt to a mid-session rule change | **F6** | C-C | Unprompted application; registered `A-25`. |
| `P1` calibrated estimate, not a right answer | **F5** | C-B | Scored over a series, never one estimate. |
| `P2` commit a prediction before the distribution | **C-B itself** | C-B | A contract rather than a family — it gates F3/F5/F6. |
| `P3` read an EV statement without deciding by it | **F1**, F5 | — | Interpretation, not a decision (`D-1`). F1 is admissible precisely because this is not a decision outcome. |
| `P4` keep playing correctly through a losing run | **F6** | C-C, §4.6 | The losing run is engineered, not awaited. Registered `A-26`. |

**Coverage holds in both directions.** All 18 outcomes have a family. Every family has at least one
outcome. F1's total scope is `C1` and a supporting role on `P3` — both non-decision — which is what
discharges the card's clause that no decision capability is measured only by recognition.

---

## 4. The word-bank / Parsons ruling

**The inconsistency.** U2 rejected word-bank tile assembly. U3 admitted Parsons-style fragment
assembly as a qualifying pattern. These are the same interaction — a supplied pool, one target
arrangement — and each unit is defensible alone. FOR-LDB-03 requires this be ruled once, in writing.

**Ruling: the widget is not the determinant. The pool's relationship to the answer is.**

> Supplied-pool assembly is **admitted as F2, and only where the ordering itself is the capability.**
> Where the pool supplies content the learner should have produced, it is cosmetic and rejected.

Applied:

- **Admitted** — the dealer's fixed procedure as an ordered routine (`A3`); the pair→soft→hard
  classification order (`B1`). In both, the *sequence* is the thing being learned, and the items are
  known to the learner anyway. The pool supplies nothing the outcome is about.
- **Rejected** — any strategy-cell recall using a supplied pool. The pool supplies exactly the recall
  `B3` is meant to measure. This is where a word bank does its damage, and it is why U2 was right.

This ruling makes both units correct in their own scope, and neither travels. It also explains the
catalog's own finding without contradicting it: U3-7 and U3-2 are its two **best-evidenced** rows and
both are **cosmetic** — evidence standing does not track the substantive axis, and "well-sourced" is
not a proxy for "worth building."

---

## 5. Disposition of all 32 patterns

Every pattern adopted with a reason or rejected with one. Classified **from the sourced pattern**,
never from the candidate-capability column — three rows over-rate there and are marked ⚠.

### Adopted — 15

| ID | Family | Reason |
|---|---|---|
| U1-1 | F7 | The only pattern testing whether a *policy* is held. Decomposing it destroys the measurement. Highest-value larger build. |
| U1-2 | F5 | Probability behind an information cut-off, scored against the engine's value and never against what the shoe did — decision/outcome separation in estimate form. |
| U1-3 | F5 | Two-bound interval, hit-rate scored over a series. Pairs with U3-8 or is not worth building alone. |
| U1-4 | F3 + C-D | Scores *what the learner consults* before acting, separately from the answer. This is the honest form of assistance-as-recorded-input, and the direct antidote to `K-U6-005`'s flag-shaped mislabel. |
| U1-5 | F6 | Evidence-backed, independent. The deferral mechanism F6 is built on. |
| U1-6 | F6 | **Binary form only.** Deferred correct/not-correct is Now-tier. The catalogued EV-graded form is rejected — see below. |
| U1-7 | F4 | **Case-structure form only** (reduced to 2–5 critical decision points). The widget-only form is cosmetic by its own conditional determinant. |
| U1-8 | F3 | Part-task drill with a *fixed* reset point — repositioning, not re-dealing. Sits under F6, not beside it. |
| U1-9 | F6 | Episode-level scoring with criteria fixed in advance. The missing granularity between per-hand and per-session. |
| U3-1 | F4 | Unaided recall breadth over a region ("name every hand you would double against a 6"). One of the six. |
| U3-3 | F3 + C-D | Guidance-faded worked example. The *principle* is evidence-backed; the **rungs stay unspecified here** — they are `A-04`, and LDB-04/LDB-07 own them. |
| U3-4 | F4 | Contrasting-cases invention. Its value is demonstrably orthogonal to answer correctness, so no selection widget asks the same question. **Do not grade the invented rule** — that is the point of the pattern. |
| U3-5 | F6 | Mid-session resource applied unprompted; the sourced form saw what no other instrument could. Blackjack extension registered `A-25`. |
| U3-8 | F5 | Continuous estimate under a proper scoring rule. One of the six. |
| U3-9 | F4 | Convergent-cue abstraction — "these five hands take the same action". Derivable entirely from the oracle. |

**Two adopted with a build condition, not a design one:** `U2-6` (inverse chart cell — give the
answer, find the ruleset change that produces it) is adopted into **F7** as a cheap policy probe.
`U2-14` (free composition, "explain the play") is adopted into **F4 ungraded only** — graded, it
needs language understanding this project has no reason to build.

### Rejected — 17, each with its own reason

| ID | Reason for rejection |
|---|---|
| U1-6 *(EV-graded form)* | **`D-1` forbids it and the machinery does not exist.** LDB-01 ruled EV is interpretive literacy, never a grading axis; independently, `strategy.rs` is a lookup returning an action and a crate-wide search for `expected_value\|expectimax\|monte-carlo` returns zero matches. Two independent grounds. |
| U2-1 | Cosmetic — typing a sentence in place of selecting it. Channel swap over an unchanged question. |
| U2-2 | Cosmetic — a microphone in place of a keyboard. The response deadline that *would* make it substantive is separable from the channel, and belongs to automaticity, which is out of LDB-01 scope. |
| U2-3 ⚠ | Cosmetic **as sourced** — tracing a *displayed* glyph. The blank-grid analogue over-rates it, is registered `A-21`, and is in any case already covered on its own merits by U1-1 in F7. |
| U2-4 | Cosmetic — a continuous widget over an unchanged question. Where continuous elicitation genuinely matters, F5 does it under a scoring rule. |
| U2-5 | *Adopted in part* — the sketch-before-reveal shape survives **as C-B**, which is where its value lives. Rejected as a standalone family: a drawing surface with an undecided grading story is a widget, not a measurement. |
| U2-7 | Cosmetic — card-sort over an unchanged classification question. C-A already requires classification, unsupplied, at the point of decision. |
| U2-8 | Cosmetic — semantic parsing of an entry whose question is unchanged. |
| U2-9 | **C-E.** Proposes learner self-rating as the signal, which U3's own evidence contradicts (78/78). Rejected on the contract, not on buildability. |
| U2-10 | Adopted **in principle** into F7, **deferred in build**: it needs a rule language and a parser, the largest single build in the catalog. F7 is opened by U1-1 and U2-6 instead. Recorded as deferred rather than rejected outright. |
| U2-11 ⚠ | Out of scope — running-count material, and LDB-01 scoped counting out. Also over-rates: the source is self-paced; external pacing appears only in the analogue. |
| U2-12 | Out of scope — external pacing is the automaticity rung, stage 7, explicitly later work. |
| U2-13 ⚠ | Admitted **only under C-B**. Over-rates as sourced (the source solves a puzzle; the analogue merely demonstrates), and `A-22` records that the teaching claim is unevidenced while the mechanic is free. A sandbox that captures no prediction is decoration by §4.4. |
| U3-2 | Cosmetic, and the word-bank half of §4's ruling: the pool supplies the recall the outcome measures. |
| U3-6 | Rejected on its own evidence — the freer widget performed **worse** against the external criterion (r = .243 n.s. vs .551 p<.05; interrater 0.81 vs 0.92). Also the largest build of the substantive set. Lowest priority; not adopted. |
| U3-7 | Cosmetic, and the Parsons half of §4's ruling — admitted into F2 **only** where ordering is the capability, which is `A3` and `B1`, not strategy recall. |

**Counted, and the counts were recounted from the rendered tables rather than asserted from
drafting.** All 32 patterns appear above; a search of this section returns 32 distinct ids. They
disposition as:

- **17 adopted** — the 15 in the table, plus `U2-6` and `U2-14` in the prose beneath it. One of the
  17, `U1-6`, is adopted **in its binary form only**.
- **12 rejected outright** — `U2-1`, `U2-2`, `U2-3`, `U2-4`, `U2-7`, `U2-8`, `U2-9`, `U2-11`,
  `U2-12`, `U3-2`, `U3-6`, `U3-7`.
- **3 dispositioned other than adopt/reject**, stated rather than rounded to the nearest column:
  `U2-5` is split — its shape survives as contract C-B, its standalone form is rejected; `U2-13` is
  **conditionally admitted**, valid only under C-B; `U2-10` is **deferred on build cost**, not
  rejected on merit, and returns when F7 justifies a rule language.

17 + 12 + 3 = 32. `U1-6` and `U2-5` are the two patterns appearing in both columns, and both splits
are stated above rather than resolved silently in favour of the adopted half.

*Reconciling the rejected table's row count, which is 16 and not 12:* it carries the 12 outright
rejections plus the four rows that are not outright rejections — `U1-6`'s EV-graded form, `U2-5`'s
standalone form, `U2-10`'s build deferral, and `U2-13`'s conditional admission. They sit in that
table because that is where a reader looks for them, not because they were rejected on merit. `U2-11` and `U2-12`
both return if and when counting enters scope — recorded here so the deferral is visible.

**Three defects deliberately not inherited.** `U1-5`, `U1-8` and `U1-9` are **Evidence-backed** and
**independent**, discounted only because all three rest on a single compilation — citing "vendor
self-description" as their reason would be a false reason, and none is used above. Classification was
done from the sourced pattern throughout, with the three over-rating rows marked ⚠. And no adoption
above rests on "this format measures X better" without support — where that rationale would have been
needed, a register row was written instead (`A-24`, `A-25`, `A-26`).

---

## 6. Approvability self-check

**1. Every activity maps to at least one capability.** Seven families, all mapped in §3:
F1→`C1`,`P3`; F2→`A3`,`B1`; F3→`A1`,`A2`,`A4`,`A5`,`B1`–`B5`,`C2`; F4→`A2`,`B3`; F5→`P1`,`P3`;
F6→`B6`,`C3`,`P4`; F7→`B3`,`C2`. No family is unmapped. Taking the union in the other direction, all
18 outcomes are named: `A1`–`A5`, `B1`–`B6`, `C1`–`C3`, `P1`–`P4` — with `P2` carried by contract C-B
rather than by a family, which §3 marks explicitly rather than leaving it to look like an omission.

**2. No capability that is a decision is measured only by recognition.** F1's entire scope is `C1`
(recognition is the real task) and a supporting role on `P3` (interpretation, not a decision). Every
decision outcome names F3, F6 or F7 as primary. The shipped state — 100% of mastery evidence being
multiple-choice — is explicitly disqualified rather than left standing.

**3. Every LDB-02 pattern is adopted with a reason or rejected with one.** All 32 appear in §5; two
are split across both columns, giving 34 dispositions. Each reason is specific to that pattern — no
pattern is rejected by category alone.

**Open items handed forward, so silence is not read as a ruling:** the fading rungs (`A-04`) go to
LDB-04/LDB-07 unspecified; `K-U6-005`'s code fix is LDB-04's; `U2-10` is deferred on build cost, not
rejected; counting-dependent patterns return only if counting enters scope. No numeric threshold,
count or duration appears anywhere above — `A-07` would require a row for each, and none belongs to
this card.
