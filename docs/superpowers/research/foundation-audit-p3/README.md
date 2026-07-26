# Foundation Audit — Phase 3 Subject-Matter Evidence

> **Status: SECOND-GENERATION CORRECTIONS LANDED, 2026-07-26.** `V-C7-topup.md`'s ten corrections
> (C-C7T-001…010) are now landed into `collection/C7-probability-ev-variance.md`, marked in place with
> `[LANDED C-C7T-NNN …]`. The editorial halves are complete for all ten; the bounded `collection`
> halves remain open — three sources not retrieved (Steenbergh et al. 2004 for G5; Gok et al. 2024 and
> Zhang et al. 2022 for G6). Originally **banked with known defects, 2026-07-22**, when the polish pass
> was deliberately stopped by user decision in favour of reaching design; this page still says exactly
> what was wrong and what changed.
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
| `verification/V-C7-topup.md` | Independent verification of F15–F20. 3 verified, 3 defective. **Its ten corrections were landed 2026-07-26** directly into the dossier (see `[LANDED C-C7T-NNN …]` markers); 3 bounded collection items remain open. |
| `landing/L-C7.md` | The one correction pass that did run — ten corrections landed against `V-C7`. |
| `collection/C7-topup-report.md` | The top-up collector's own report, including its self-flagged weak points. |

## THE CORRECTIONS — landed 2026-07-26, and what remains open

**`V-C7-topup.md` raised ten corrections with exact replacement wording (C-C7T-001…010). All ten are
now landed** into `collection/C7-probability-ev-variance.md`, each marked in place with
`[LANDED C-C7T-NNN (V-C7-topup, …), 2026-07-26: …]` and superseded wording struck rather than deleted,
matching this program's editorial convention. Specifically:

- **F16** — "graded" is struck; the word appears nowhere in the paper. The only grading is students'
  pre-existing GPA used as a covariate. The two silent typographic alterations that sat inside quotes
  marked verbatim are restored, and a new caveat states F16 is **not** independent corroboration of
  F15 (two shared authors, the same evaluated game, F16 declares no conflicts notwithstanding).
- **F17** — the truncated quote is restored; the sample bullet now states the paper's own printed
  **N = 180** instead of refusing to state a combined total. **This correction runs pessimistic**: a
  more-schooled sample still failing makes the reported ceiling conservative, and the dossier had
  omitted that direction. The mechanism (18%) and population-inference bullets are similarly restored.
- **F19** — the "no controlled experiments" quote is upheld as verbatim, but is now explicitly bounded
  to the review's own inclusion corpus, alongside the review's own two cited controlled experiments
  (Gok et al., 2024; Zhang et al., 2022). **Also pessimistic** — and because neither of those two
  sources has been retrieved (the `collection` half of C-C7T-008 was not attempted here), **G6 remains
  OPEN**.
- **F15** — the evidence-quality tier no longer claims "pre-registered-to-sponsor"; the paper only
  declared sample sizes in advance to its funder, not hypotheses or an analysis plan.
- **F20** — completeness only, running in the source's favour: volume/pages, author affiliation, and
  an independence check (funding, competing interests, data availability).

**One study was known missing — it has since been retrieved, and it is not what this page said it
was.** Floyd, Whelan & Meyers (2006), *Psychology of Addictive Behaviors* 20(1), 69–74,
**PMID 16536667**. The collector claimed no such study existed; the verifier found it at a PMID **one
greater** than a paper already cited in the dossier — same journal, same issue, immediately following
pages.

**RESOLVED 2026-07-23 (record: `journal/raw/_inbox/foundation-audit-p3/C8-floyd-2006.md`).** Both this
page and the bridge spec described it as *"a randomised controlled trial of instruction on irrational
gambling beliefs, positive on beliefs and play."* Its actual title is **"Use of warning messages to
modify gambling beliefs and behavior in a laboratory investigation."** It is a lab study of **warning
messages during simulated roulette played for imaginary money**: N=120 undergraduates, randomised
against an *active* control that received a history-of-roulette lesson (no untrained arm). The
treatment **bundles** pre-play education with in-play warning messages, so it cannot separate teaching
from cueing-at-the-moment-of-decision. The behavioural outcome, "less risky gambling behavior," is
in-session, imaginary-stakes, single-occasion, with no follow-up, and is never operationally defined
in the abstract. Full text is closed-access; nine retrieval routes failed, so **the record is
abstract-only and labelled as such**.

**Consequence: it does not overturn §1.7 of the bridge spec.** A one-session lab endpoint on play
money does not refute a six-month real-behaviour null. G5/§2.5 remains OPEN, but the "it may well cut
the other way" framing was not supported and has been corrected in the bridge spec. The outstanding
task, if ever pursued, is full text via institutional access to recover the operational definition of
"less risky gambling behavior" — the one unknown that could still move the verdict.

**This is also C-C7T-009, and it is the one correction in the 2026-07-26 landing pass that was
deliberately *not* applied as the verification record wrote it.** The verifier's own retraction of the
absence claim is correct and is landed. But the verifier's own characterisation of what Floyd et al.
found — quoted above as *"a randomised controlled trial of instruction on irrational gambling beliefs,
positive on beliefs and play"* — is the exact characterisation this page corrected on 2026-07-23,
**before** this landing pass ran. Landing C-C7T-009 from the verification record's own wording would
have written the *already-superseded* characterisation back into the dossier. Instead, the dossier's
"Searched and came up empty" section now carries the corrected characterisation above — bundled
warning messages, simulated roulette, imaginary money, no untrained arm, does not overturn §1.7, G5
still OPEN — with a note pointing here so a future reader does not have to reconstruct why the wording
differs from the correction that authorised it.

**The process point worth keeping:** this is the *third* absence-or-characterisation claim in this
program to collapse on independent re-checking. Here the paper's *existence* was correctly flagged by
the verifier, but its *content* was then described by two separate documents without anyone opening
it — a citation inherited twice. That is this program's founding error class, appearing again in a
place nobody had marked as risky.

**Sufficiency:** G1 closed · G2 closed · G3 **evidenced absence** (do not re-collect) · G4, G5, G6
**open**. Landing the ten corrections changed wording, not sufficiency — no new source was collected
by this pass, so these statuses are unchanged from `V-C7-topup.md`. **Residual collection, bounded (3
sources, none attempted in the 2026-07-26 landing pass):** Steenbergh et al. (2004) for G5; Gok et al.
(2024) and Zhang et al. (2022) for G6.

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
