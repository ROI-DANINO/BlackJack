# P3 Gap Specification — teaching probability, EV, variance, and risk

> **Bounded collection brief.** This is the *only* new collection Phase 3 authorises. It exists
> because the Phase 1 archive holds nothing on this subject matter, and Phase 4 cannot design
> probability/EV/variance activities on an empty evidence base.
>
> **Scope discipline:** this is a **new-gap collection, not a re-audit.** Phase 1's dossiers (C1–C6)
> are closed and must not be reopened, re-verified, or re-collected. If a question can be answered
> from C1–C6, it is out of scope here by definition.

## Why this gap exists (established, not assumed)

Checked directly against the archive on 2026-07-22, at the files, not from memory:

- **`docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md`** — the
  41-requirement approved activity baseline: **zero** occurrences of *probability*, *expected value*,
  *EV*, *variance*, *risk*, or *bankroll*.
- **`C3-deliberate-practice.md`** — 42 keyword hits, and **every one is statistical
  variance-explained** in the Macnamara / Hambrick / Ericsson meta-analytic dispute (`:163`, `:169`,
  `:204`, `:211-218`, `:292`, `:375`). None concerns teaching variance as a concept to a learner.
- **`C6-blackjack-teachable.md`** — 8 hits, and they are the **experimental manipulation of win
  probability** in the Phillips & Amrhein apparatus (`:24`, `:234`, `:243`, `:252`), not instruction
  in probability.
- **C1, C2, C4, C5** — 2–5 incidental hits each, none on the subject.

**Conclusion: total coverage gap.** Phase 1 is a *mechanics* foundation — mastery, adaptivity,
spacing, deliberate practice, blackjack trainability. It is not a *subject-matter* foundation. This
was already recorded in the P1 fit-to-purpose review; the survey above confirms it at the file level.

## Why it is load-bearing for this product

Blackjack is a game of expected value under variance. A trainer that teaches only the strategy chart
teaches a lookup table; a trainer that teaches *why* the chart is right teaches the subject. Three
already-committed project positions depend on evidence this project does not hold:

1. **"Judge the decision, not the outcome"** — `product-vision.md:74-75`, implemented at
   `controller.ts:210,217`. The project commits to it and holds **no evidence on how to teach a
   learner to internalise it.** This is the outcome-bias problem, and it is the single most
   product-consequential item in this gap.
2. **The V2+ curriculum names probability, EV, and variance as learning outcomes** (P4's remit) with
   no evidence base underneath them.
3. **Counting instruction is EV reasoning in disguise** — a count is only meaningful as a proxy for
   shifting expected value. Teaching the count without the EV intuition teaches a ritual.

## Questions (the bounded set)

Answer these; do not widen. Each must be answerable with cited, retrievable sources.

- **G1 — Format.** Does presenting chance information as **natural frequencies** rather than
  probabilities or percentages measurably improve lay reasoning, and under what conditions does the
  advantage hold or disappear?
- **G2 — Description vs experience.** How does learning a probability by **experiencing outcomes**
  (sampling, play) differ from learning it from a **stated description**? The description–experience
  gap is directly relevant: this product teaches by dealing hands. Include rare-event behaviour.
- **G3 — Expected value.** Is there evidence that instruction in expected-value reasoning
  **transfers** to actual choices, or does it remain inert knowledge? What instructional forms have
  been tested?
- **G4 — Outcome bias / resulting.** What is known about teaching people to **evaluate decision
  quality independently of outcome**, and about correcting outcome bias? Any evidence that it can be
  trained at all, and any evidence it cannot, is equally wanted.
- **G5 — Misconceptions.** Gambler's fallacy, hot-hand, law of small numbers, illusion of control:
  what is established about their prevalence and about whether instruction corrects them — including
  **negative results**.
- **G6 — Simulation and visualisation.** Evidence on interactive simulations, sampling
  visualisations, and repeated-play tools for building variance and risk intuition. What works, what
  is merely popular.

## Evidence contract (binding)

Carried unchanged from Phases 1–2. These are the rules that made the earlier phases trustworthy.

- **Open every source you cite.** No claim may rest on a search-result snippet, an abstract summary
  produced by a tool, or another document's description of a source. If you could not open it, you
  did not read it.
- **Quote verbatim, mark every alteration.** No silent ellipsis. No added emphasis. No paraphrase
  inside quotation marks. If you add emphasis, say so at the quote.
- **Failed retrievals are disclosed, never hidden.** A paywall, a 403, or a dead link is a finding:
  record the attempt, the barrier, and what you could not establish. Do **not** substitute a
  different source and present it as the one you meant to read.
- **Record what you looked for and did not find.** A searched-and-empty result is a real, wanted
  outcome — especially for G4 and G5, where negative results are informative. Do not manufacture a
  finding to avoid an empty section.
- **Label every finding**: `Evidence-backed` / `Product judgement` / `Assumption` / `Unsupported`,
  plus a quality tier and the population/task the study actually used. A laboratory finding on
  undergraduates with word lists is not a finding about adults learning blackjack, and must not be
  written as one.
- **State transfer distance explicitly.** For each finding, say how far it is from *an adult learning
  a probabilistic decision rule in a card game*. `CFL-007` exists because a grade-7 mathematics
  result sits against a blackjack roadmap; do not create a second one silently.
- **No design.** This collection produces evidence. It does not propose activities, curriculum,
  sequence, or product changes — that is Phase 4's, and this brief has no authority to touch it.

## Deliverable

One dossier, `collection/C7-probability-ev-variance.md`, following the Phase 1 dossier template:
head statement, per-question findings (`F1`…), full citations, coverage gaps stated as gaps, and a
self-assessed sufficiency judgement per question. **A verifier will adversarially re-check it against
the actual sources, so an honest gap costs nothing and an overstatement costs everything.**

## Out of scope

Reopening C1–C6 · re-auditing Phase 2 verdicts · resolving `CFL-007` (that is a Phase 3 decision, made
separately, not a collection task) · the mathematics of blackjack itself (the project already has a
verified strategy oracle; this is about *teaching*, not about computing correct play) · any activity,
curriculum, or product design.
