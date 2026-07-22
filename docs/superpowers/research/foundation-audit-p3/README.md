# Foundation Audit — Phase 3 Subject-Matter Evidence

> **Status: BANKED WITH KNOWN DEFECTS, 2026-07-22.** The polish pass was deliberately stopped by user
> decision in favour of reaching design. This archive is **not** clean, and this page says exactly how.
>
> **Authority: evidence only.** It designs nothing. The design-facing output is
> `docs/superpowers/specs/2026-07-22-product-design-inputs.md`.

## Why this phase existed

Phase 1 built a **mechanics** foundation — mastery, adaptivity, spacing, deliberate practice,
blackjack trainability. It held **nothing** on the subject matter a blackjack trainer must teach:
probability, expected value, variance, and risk. That was confirmed at the file level before any
collection began (`GAP-SPEC.md` records the survey): the 41-requirement activity baseline contains
zero occurrences of *probability*, *expected value*, *EV*, *variance*, *risk* or *bankroll*, and every
apparent hit in the Phase 1 dossiers is either statistical variance-explained or experimental
manipulation of win rates.

## Read in this order

| File | What it is |
|---|---|
| `GAP-SPEC.md` | The bounded brief: questions G1–G6 and the binding evidence contract. |
| `collection/C7-probability-ev-variance.md` | The dossier. 20 findings, F1–F20. |
| `verification/V-C7.md` | Independent verification of F1–F14. 11 verified, 2 defective. |
| `verification/V-C7-topup.md` | Independent verification of F15–F20. 3 verified, 3 defective. **Its ten corrections are NOT applied.** |
| `landing/L-C7.md` | The one correction pass that did run — ten corrections landed against `V-C7`. |
| `collection/C7-topup-report.md` | The top-up collector's own report, including its self-flagged weak points. |

## THE DEFECTS — unfixed, and what they cost you

**`V-C7-topup.md` raised ten corrections with exact replacement wording. None were applied.** Before
relying on any of F15–F20, read that record. Specifically:

- **F16** — the transfer task is described as "graded"; the word appears nowhere in the paper. The
  only grading is students' pre-existing GPA used as a covariate. Two silent typographic alterations
  sit inside quotes marked verbatim.
- **F17** — a quote is silently truncated at exactly the point that removes the sample size the paper
  *does* print (N=180). **This defect runs pessimistic**: a more-schooled sample still failing makes
  the reported ceiling conservative, and the dossier omits that direction.
- **F19** — the verbatim quote is real, but the dossier glosses it as "the field has no controlled
  experiments" while the same review cites two. **Also pessimistic.**

**One study is known missing.** Floyd, Whelan & Meyers (2006), *Psychology of Addictive Behaviors*
20(1), 69–74, **PMID 16536667** — a randomised controlled trial of instruction on irrational gambling
beliefs, reporting positive effects on beliefs *and* on play. The collector claimed no such study
existed; the verifier found it at a PMID **one greater** than a paper already cited in the dossier —
same journal, same issue, immediately following pages.

**Sufficiency:** G1 closed · G2 closed · G3 **evidenced absence** (do not re-collect) · G4, G5, G6
**open**.

## The four findings that most affect the product

1. **Teaching the maths did not change behaviour.** 198 students taught probability with gambling
   examples showed better odds calculation and fallacy resistance at six months — and no change in
   actual gambling. *Measure play, not quiz scores.*
2. **Outcome bias survives knowing about it.** Pre-registered, N=692: the bias was present even among
   participants who had themselves said outcomes should not be considered. `product-vision.md:74-75`
   commits this product to decision-not-outcome feedback; **nothing here shows that commitment can be
   taught**, and G4 remains open.
3. **Experience and description teach differently.** Learners who sample outcomes underweight rare
   events; those given stated probabilities overweight them. This product deals hands — expect
   systematic under-respect for the tail.
4. **Practice raises confidence even where outcomes are uncontrollable.** A hazard specific to a
   gambling trainer: confidence gain is not evidence of skill gain and must never be used as one.

## Process notes worth keeping

**Two absence claims collapsed under independent re-search**, both times on the verifier's first or
second attempt from a different host. An "I searched and found nothing" is the least reliable claim a
research agent makes, and the cheapest to over-trust.

**The role reading downstream catches the author, never the author themselves.** The editorial pass
caught the *verifier* omitting a closing sentence from its own quotation. This is now the fourth
occurrence of that direction across Phases 2–3.

**Every source was re-opened at the correction step.** The editorial pass recorded zero
landed-on-verifier-authority items — it reopened each source rather than inheriting the verifier's
wording. That is the specific discipline whose absence caused this program's founding defect.

**A cap was breached and disclosed rather than hidden**: 20 citations against a brief cap of 15. The
verifier ruled the overage substantively justified, and noted that the authorised remedy arithmetically
could not fit the cap while nobody amended it.

## Where this goes

`docs/superpowers/specs/2026-07-22-product-design-inputs.md` — the Phase 3 → Phase 4 bridge. It marks
every input `[VERIFIED]`, `[UNVERIFIED]`, or `[DEFECTIVE-SOURCE]` so Phase 4 knows what it may lean on.
