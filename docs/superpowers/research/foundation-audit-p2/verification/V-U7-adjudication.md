# Adjudication — Unit U7, correction `C-U7-001` (verdict `K-U7-002`)

> Fourth instance, dispatched as an **adjudicating verifier** with verdict authority for one
> question only. I did not audit U7 (`audit/U7-audit.md`), did not raise `C-U7-001`
> (`verification/V-U7.md`), did not land it (`landing/L-U7.md`), and did not confirm the landing
> (`verification/LV-U7.md`). Read-only: no `Edit`, no `Bash`. Run: foundation-audit-p2.
> Written 2026-07-22.
>
> Scope: choose exactly one of the two mutually exclusive resolutions the verifier left
> under-determined at `V-U7.md:199` and the confirmer restated at `LV-U7.md:63-77`. I did not
> re-audit U7, did not review any other verdict, and raise no new correction.
>
> Everything quoted below I retrieved myself this pass, directly from the named files at the named
> lines. Nothing is accepted on the audit record's, the verifier's, the editor's, or the confirmer's
> characterisation.

---

## RULING

**RULING: Option B — retain the `Relabel`, re-anchor `K-U7-002` to `2026-07-11-blackjack-basics-learning-foundation-design.md:18-19`.**

---

## The two candidate passages, verbatim

**Candidate 1 — the currently-quoted anchor,
`docs/superpowers/specs/2026-07-11-blackjack-basics-learning-foundation-design.md:10-12`**, read by
me this pass, exact at the stated lines:

> This design covers the reusable learning runtime and its first subject, **Blackjack Basics**.
> Strategy Table Fundamentals follows in a separate design cycle after this feature passes scoped
> feature QA.

This sentence sits under `## Status`, immediately after the approval paragraph. Its subject is a
**design cycle** and its gating condition is **"scoped feature QA"** — a process artifact, not a
learner state. It asserts nothing about learners, prerequisites, teaching order, or what anyone
knows or can do. There is no empirical or pedagogical proposition present, and therefore no
epistemic label that could be right or wrong about it. On this passage alone, `Relabel` has nothing
to attach to, and the verifier's over-called finding is correct.

**Candidate 2 — the proposed anchor, same file `:18-19`**, read by me this pass, exact at the stated
lines:

> They do not yet know which legal action is strategically correct; that begins with Strategy Table
> Fundamentals.

Its full paragraph context (`:16-19`, the `## Product Outcome` section, read this pass):

> A complete beginner can finish Blackjack Basics and then play a full Free Play hand without
> instructional help. They understand the goal, cards, totals, table information, round flow,
> actions, wagers, and results. They do not yet know which legal action is strategically correct;
> that begins with Strategy Table Fundamentals.

This **is** a curriculum claim, and specifically a curriculum-**prerequisite** claim: it asserts
what a learner does and does not possess at the Basics/STF boundary, and that strategic-correctness
instruction *begins* at STF and not before. It is learner-facing, falsifiable by playtest, and
carries an implied pedagogical warrant (that mechanics can and should be mastered before
strategy-correctness). It is exactly the class of decision `ALR-033` addresses — cited by the row
itself at `audit/U7-audit.md:69` and verified in this run at `V-U7.md:175` /
`audit/U7-audit.md:136`: "mastery research does not identify which blackjack prerequisites are
essential; curriculum design owns that decision."

## Is the genre-exclusion inconsistency `C-U7-001` alleges real? — **Yes.**

`audit/U7-audit.md:160-162`, "Examined and deliberately left alone", read by me this pass, verbatim:

> - **"Downstream Deltas" section** (`2026-07-15-...:170-182`) — sequencing among future *design
>   cards* (STF-02 through STF-05), not among learner-facing curriculum content. Project-planning
>   scope, not curriculum scope; left alone.

The `:10-12` sentence quoted in `K-U7-002`'s Claim cell is sequencing among **design cycles**, gated
on **feature QA** — the same project-planning genre the record excludes two sections later. The
record audits at `:69` what it excludes at `:160-162`. The inconsistency is real, not a
characterisation artifact, and it is not curable by leaving the row as written.

## Why B rather than A, on the merits and not on cost

I record the confirmer's warning explicitly (`LV-U7.md:58-61`): option B is the cheaper remedy, and
picking it for that reason would decide the merits by cost. I did not. Three pieces of evidence
inside the record itself, all retrieved this pass, establish that a real curriculum claim exists and
that the defect is mis-anchoring rather than verdict manufacture:

1. **The row's own citation cell already reasons about `:16-19`, not about `:10-12`.**
   `audit/U7-audit.md:69`, verbatim: "The claim is internally consistent (Product Outcome at
   `:16-19` defines Basics completion as a precondition for the strategy-lookup skill Strategy Table
   Fundamentals later teaches), so it holds; it is mislabeled by omission, not wrong." The verdict's
   stated basis is the Product Outcome subject boundary. Only the Claim cell's quotation went to the
   wrong sentence. Re-anchoring does not retrofit a verdict onto a convenient neighbouring sentence
   — it moves the quote to the sentence the reasoning was already about.

2. **`ALR-033` is applied in the row as a statement about subject precedence** — "this exact class of
   decision — which subject must precede which — is a **Product judgement**" (`:69`). A statement
   about which *design cycle* comes when needs no such warrant; a statement about which *subject a
   learner must complete first* does. The citation the row carries only makes sense against `:18-19`.

3. **The record's own non-material note at `audit/U7-audit.md:239-241` treats `K-U7-002` as the
   subject-boundary claim.** Verbatim, read this pass:

   > - `2026-07-11-...:60-61` ("It does not mean the learner can choose the Basic Strategy action ...")
   >   is the same subject-boundary claim as K-U7-002, stated from the negative side. Not a separate
   >   claim; folded into K-U7-002's citation rather than double-counted.

   I reopened `2026-07-11-…:60-61`, verbatim: "It does not mean the learner can choose the Basic
   Strategy action, recall a strategy table, play without assistance at speed, or demonstrate
   long-term mastery." That is unmistakably the same proposition as `:18-19`, negatively stated — and
   it is *not* the same proposition as `:10-12`, which says nothing about learners at all. The record
   itself, before any correction, understood `K-U7-002` to be about the learner-facing subject
   boundary.

Applying the program's standing rule — a `Relabel` is the remedy when a claim is **fine but its
epistemic label is wrong** — a real, unlabeled curriculum-prerequisite claim exists at `:18-19`,
uncited like everything else in these four documents, and it needs a Product-judgement /
Assumption label. `Relabel` is the correct verdict for it. Option A would withdraw a verdict that is
right about a claim that exists, on the strength of a quotation error, and would leave both `:18-19`
and `:60-61` assessed nowhere in the record — a coverage loss, and one that runs in exactly the
under-reporting direction `C-U7-002` already faulted this record for. B is right on the merits; its
lower cost is incidental.

**Stated against my own incentive:** the finding `C-U7-001` raised was sound and I uphold it in
substance — the row as written *was* anchored to a non-claim, and the record *did* audit what it
elsewhere excludes. What I decline is the stronger of the two remedies the verifier offered, because
the defect is in the Claim cell's quotation, not in the verdict word.

## The notes flagged as interacting with option B

- **`audit/U7-audit.md:239-241`** (the note the confirmer names at `LV-U7.md:72-73` as "the
  non-material note at `:239-241` (which folds `:60-61` into `K-U7-002`)"). Considered before ruling.
  It **supports** B rather than obstructing it: under B the note becomes coherent — `:60-61` is the
  negative-side statement of the very claim the row is now anchored to. Under A it would be orphaned,
  folding a real claim into a withdrawn row. **No edit to `:239-241` is required by this ruling**; it
  reads correctly as-is against the new anchor.
- **The Build Sequence scope-statement note** (`V-U7.md:215-219`; forwarded at `LV-U7.md:242-248`),
  which my dispatch named at "`V-U7.md:239-241`" — that line range in `V-U7.md` is the source-lead
  paragraph, not a note, so I treated both candidates. That note concerns `K-U7-009`'s anchor
  (`2026-07-10-v2-…:56-57` inside an excluded `:35-71` range) and is structurally analogous but
  factually independent: it asks whether an *exclusion sentence* is too broad, whereas `C-U7-001`
  asks whether a *quotation* points at the claim. It does not bear on the choice between A and B and
  did not affect this ruling. It remains an unlanded non-material note, correctly.

## Downstream consequences — exact, mechanical, no inference required

An editor executing this ruling changes the following and nothing else.

| # | Location | Change |
|---|---|---|
| 1 | `audit/U7-audit.md:69`, row `K-U7-002`, **Claim cell** | Replace the quoted sentence and its anchor with: `"They do not yet know which legal action is strategically correct; that begins with Strategy Table Fundamentals." (`2026-07-11-blackjack-basics-learning-foundation-design.md:18-19`)`. The `:10-12` sentence must **not** remain in the Claim cell — leaving it would re-commit the genre-exclusion breach. |
| 2 | `audit/U7-audit.md:69`, row `K-U7-002`, **Verdict cell** | **Unchanged** — `Relabel`. |
| 3 | `audit/U7-audit.md:69`, row `K-U7-002`, **Claim ID cell** | **Unchanged** — `K-U7-002`. Row is not withdrawn, not renumbered, not moved. |
| 4 | `audit/U7-audit.md:69`, row `K-U7-002`, **Citation cell** | One bounded wording fix only: the parenthetical "(Product Outcome at `:16-19` defines Basics completion as a precondition for the strategy-lookup skill Strategy Table Fundamentals later teaches)" now cites the passage the Claim cell quotes, so it can no longer stand as an *internal consistency check on* the claim. Narrow the anchor to the two preceding sentences — `:16-17` ("A complete beginner can finish Blackjack Basics and then play a full Free Play hand without instructional help. They understand the goal, cards, totals, table information, round flow, actions, wagers, and results.") — and keep the sentence's function unchanged. No other text in the cell changes; `ALR-033`, its line range and its quoted Limitation stay exactly as written. |
| 5 | `audit/U7-audit.md:78`, **Counts** line | **Unchanged** — "9 claims assessed — Preserve 1, Relabel 7, Revise 1, Replace 0, Remove 0." |
| 6 | `audit/U7-audit.md:136`, citation-state row `ALR-033` | **Unchanged** — "Verdict it supports" continues to read `K-U7-002, K-U7-003, K-U7-007, K-U7-008`; state stays `VERIFIED`. |
| 7 | `audit/U7-audit.md:85-110`, the `C-U7-001` recorded-finding block | **Retain, restate as resolved.** Per the run's R24/R26 keep-the-error-visible discipline, the pre-correction quotation of the `:10-12` sentence at `:89-91` must stay in place. Replace only the closing sentences at `:102-106` ("The verifier offers two mutually exclusive resolutions … the row is left exactly as written.") with a statement that the adjudication was made by a separate adjudicating verifier, that option B was chosen, and that the Claim cell was re-anchored to `:18-19` accordingly, citing `verification/V-U7-adjudication.md`. No new quotation needs retrieval — both sentences are already quoted verbatim in that block at `:89-91` and `:99-100`. |
| 8 | `audit/U7-audit.md:110`, the `LANDED C-U7-001` HTML comment | Add a companion marker line recording the adjudicated landing (the existing marker's text — "no verdict word or row changed" — remains true and should not be edited, since option B changes neither). Keep it on its own line, outside every table, with no pipe character, per `LV-U7.md:173-176`. |
| 9 | `audit/U7-audit.md:239-241`, non-material note | **Unchanged.** Consistent with the new anchor; see above. |
| 10 | `audit/U7-audit.md:160-162`, the "Downstream Deltas" exclusion bullet | **Unchanged.** Under B the record no longer audits a design-cycle sentence, so the exclusion and the verdict table cease to conflict without touching the exclusion. |
| 11 | `verification/V-U7.md`, `landing/L-U7.md`, `verification/LV-U7.md` | **Unchanged.** Verifier, landing and confirmation records are historical artifacts and are not edited by this ruling. |
| 12 | `registers/*` | **No register row created or changed by this ruling.** The `C-U7-003` conflict row already returned by `V-U7.md` and `LV-U7.md` is untouched. No source-lead row: this is editorial against sources already held. |

**Verdict-row invariant after execution:** 9 rows total — `Preserve` 1 (`K-U7-005`), `Relabel` 7
(`K-U7-001/002/003/004/006/007/008`), `Revise` 1 (`K-U7-009`), `Replace` 0, `Remove` 0. Identical to
the pre-ruling state; a row-wise gate check reads the same counts before and after, and the row it
reads at `:69` now rests on a sentence that carries the claim.

**Discharge status.** With items 1, 4, 7 and 8 executed, `C-U7-001` is fully discharged and the
`landed-but-unadjudicated` hold the confirmer placed at `LV-U7.md:76-77` is released. Execution is an
**editor's** act, and confirmation of that execution a **third** agent's; this record decides the
merits only and lands nothing.

## Limits of this ruling, stated

- I ruled on one question. I did not re-audit U7, did not review any of the other eight verdicts, did
  not assess the sufficiency of `audit/U7-audit.md`, and raise no new correction.
- I have no `Bash`, so I verified anchors by direct read at their stated line numbers; every anchor I
  cite resolved exactly there. I make no claim from file history.
- I did not author replacement wording for the audited design, and state nothing about what the
  project should do about its curriculum. Item 1 quotes the design's existing sentence for anchoring
  purposes only; item 4 narrows an anchor inside the audit record's own prose.
