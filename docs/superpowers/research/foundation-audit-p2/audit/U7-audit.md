# Audit — Unit U7

> Unit under audit: four earlier learning designs under `docs/superpowers/specs/` —
> `2026-07-11-blackjack-basics-learning-foundation-design.md` (384 lines),
> `2026-07-15-strategy-table-fundamentals-lesson1-design.md` (197 lines),
> `2026-07-10-v2-learning-foundations-roadmap-design.md` (79 lines),
> `2026-07-10-first-guided-drill-design.md` (142 lines, **marked Superseded at its own top**).
> All four paths resolved on first read; none was substituted. Total ~802 lines, 0 citations in any
> of the four. Examiner role only — verdicts are **not** self-verified; a separate agent re-checks
> every row.
> Run: foundation-audit-p2. Written 2026-07-21.

Verdict legend: Preserve / Relabel / Revise / Replace / Remove

## What was read before any retrieval (G7)

Phase 1 dossiers consulted, from the approved archive `docs/superpowers/research/foundation-audit-p1/`:

- `dossiers/C1-knowledge-tracing.md` — read lines 1–367: head statement, sufficiency statement, and
  F1–F17 (mastery-model calibration/population requirements). Evidence input for any claim implying
  a mastery/skill model choice.
- `dossiers/C2-its-actr-procedural.md` — read lines 1–251: scope, F1–F13, in particular F1/F3 (ITS
  step-granularity plateau), F9/F10 (ACT-R-derived practice scheduling, spacing/retention interval
  tradeoff) and F11 (interleaved vs. blocked practice, grade-7 math RCT, d=1.05). This is the
  dossier most directly on point for U7's sequencing and spacing claims.
- `dossiers/C4-chesscom-khan.md` — read lines 1–337: scope, sufficiency statement, F1–F9 (Chess.com
  Elo/puzzle mechanics; Khan Academy's deterministic mastery ladder). Evidence input for
  prerequisite/mastery-gating claims and for whether any cited product model settles a
  population-free mastery approach.
- Baseline `docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md`,
  read directly at `:270-339` (the `ALR-026`–`ALR-035` session/hint/review/skip-test block).
  `ALR-033` (`:319-323`, "mastery research does not identify which blackjack prerequisites are
  essential; curriculum design owns that decision") is directly on point for every prerequisite/
  sequencing claim assessed below and is cited repeatedly.
- Primary source re-opened once, per the citation-handling rule that a claim about what a source
  says requires reopening it: `crates/blackjack-core/src/strategy.rs:140-194`, because
  `2026-07-15-strategy-table-fundamentals-lesson1-design.md:12-17` names this exact file as what an
  internal review "verified the example cells against," and K-U7-005 below rests on it directly.

## Format note

None of the four audited documents carries any Layer-1 or Layer-2 evidence tag at all — they predate
the `ALR-`/citation-bucket scheme (all four are dated 2026-07-10/11/15; the baseline with the
scheme is dated 2026-07-16). Every claim below is therefore audited as an **implicit, untagged
assertion**, and "Relabel" means: this claim should carry an explicit Product-judgement or
Assumption label rather than sit as unlabeled prose that a downstream reader could mistake for
settled fact. This is the default remedy the dispatch names for an uncited-but-reasonable claim,
applied broadly here because these four documents are uncited by construction (0 citations, 798
lines).

## The agent-persona-as-evidence check (dispatch-flagged; result stated up front)

**Found. One passage, one document.**
`2026-07-15-strategy-table-fundamentals-lesson1-design.md:12-17`:
> "The four design choices below were reviewed by a Fable 5 subagent wearing two hats — a
> professional blackjack teacher and a learning-games instructional designer — which verified the
> example cells against `crates/blackjack-core/src/strategy.rs` and the prior-subject wording
> against `web/src/learn/content/blackjack-basics.ts`. All four choices were endorsed
> architecturally; this document incorporates the review's one blocker (adaptive checkpoint
> grading) and its cheap, high-value refinements."

Searched the other three documents for the same pattern (any appeal to what an agent, persona, or
reviewer role "said," "endorsed," "recommended," or "blocked" as the stated warrant for a
pedagogical claim) and found none. See K-U7-004 below for the verdict.

| Claim ID | Verdict | Claim | Citation |
|----|----|----|----|
| K-U7-001 | Relabel | "Blackjack Basics contains nine short units. Each should take roughly two to four minutes, focus on one small skill, and declare explicit prerequisites, learning outcomes, and completion evidence." (`2026-07-11-blackjack-basics-learning-foundation-design.md:65-66`) | No citation in the source document. The general principle that duration/atomicity numbers are calibration, not literature-derived, is stated by the project's own later baseline at `ALR-027` (`…-product-activity-research.md:283-287`, Limitation: "numeric values require calibration and may vary by accessibility/interaction mode; the research does not establish universal minutes") — the same logic applies one level up, to per-unit duration and one-skill-per-unit granularity. Nothing in C1/C2/C4 is contradicted; this is a falsifiable design bet (would change under playtesting), so **Assumption**, not an implicit fact. |
| K-U7-002 | Relabel | "They do not yet know which legal action is strategically correct; that begins with Strategy Table Fundamentals." (`2026-07-11-blackjack-basics-learning-foundation-design.md:18-19`) | No citation. `ALR-033` (`…-product-activity-research.md:319-323`, "mastery research does not identify which blackjack prerequisites are essential; curriculum design owns that decision") is the project's own later, explicit statement that this exact class of decision — which subject must precede which — is a **Product judgement**, not an evidence-backed one. The claim is internally consistent (Product Outcome at `:16-17` defines Basics completion as a precondition for the strategy-lookup skill Strategy Table Fundamentals later teaches), so it holds; it is mislabeled by omission, not wrong. |
| K-U7-003 | Relabel | The nine-unit teaching order "1. Meet Blackjack" … "9. Play a Complete Round" (`2026-07-11-blackjack-basics-learning-foundation-design.md:68-111`), e.g. unit 4 "Hit and Stand" placed before unit 7 "Double" and unit 8 "Split". | No citation for the specific order. `ALR-033` again applies (curriculum-prerequisite decisions are the project's to make). No dossier evidence contradicts teaching simple binary actions (Hit/Stand) before compound ones (Double/Split); C2's step-based-ITS literature (F1, `C2-its-actr-procedural.md:83-92`) is consistent with, but does not specifically establish, this particular ordering. **Assumption**, falsifiable by later playtest data. |
| K-U7-004 | Relabel | "The four design choices below were reviewed by a Fable 5 subagent wearing two hats — a professional blackjack teacher and a learning-games instructional designer — which verified the example cells against `crates/blackjack-core/src/strategy.rs` and the prior-subject wording against `web/src/learn/content/blackjack-basics.ts`. All four choices were endorsed architecturally; this document incorporates the review's one blocker (adaptive checkpoint grading) and its cheap, high-value refinements." (`2026-07-15-strategy-table-fundamentals-lesson1-design.md:12-17`) | This is the dispatch-flagged agent-persona-as-evidence passage. Two distinct things are bundled: (a) the review "verified the example cells against `crates/blackjack-core/src/strategy.rs`" — a deterministic code-check, `OBSERVED` in character, and legitimate; (b) "endorsed architecturally" / "the review's one blocker" is presented as the reason the design (in particular the adaptive-checkpoint-grading decision that Exclusions and the "Why Adaptive Checkpoint Grading" section build on) is sound. An agent/persona's opinion is at best `INFERENCE`, not evidence — a persona review is an internal design-iteration step, not a source, measurement, or an explicit product judgement standing on its own reasoning. The design choices themselves are not contradicted by anything found (the "Why Adaptive Checkpoint Grading" section, `:107-116`, gives an independent, self-contained statistical argument that does not depend on the persona review at all) — so this is a labelling defect, not a wrong claim. Relabel the warrant from "reviewed/endorsed" to **Product judgement** (an internal iteration record), and keep the self-contained statistical argument as the claim's actual support. |
| K-U7-005 | Preserve | "Teach the three hand shapes **in precedence order** so ambiguous hands resolve deterministically: check *pair* first, then *soft*, then *hard*. This is what makes A-A resolve to the pair section rather than 'soft 12.'" (`2026-07-15-strategy-table-fundamentals-lesson1-design.md:65-66`) | Verified directly against the primary source the document itself names: `crates/blackjack-core/src/strategy.rs:140-179`. `basic_strategy_action` checks `is_pair(hand)` first (`:162`); only after the pair branch does it compute `score.is_soft` to choose between `soft_move` and `hard_move` (`:173-178`). The engine's own precedence is exactly pair → soft → hard, matching the claim. `OBSERVED`, Evidence-backed at the strength the claim actually makes (a code-precedence fact, not a pedagogical-effectiveness claim). |
| K-U7-006 | Relabel | "STF-05 must sequence that lesson **adjacent and unskippable**: a read-only skill decays if the chance to apply it is several lessons away, which would turn a sound deferral into a mistake." (`2026-07-15-strategy-table-fundamentals-lesson1-design.md:154-155`) | No citation. The dossier most on point, C2, holds adjacent-but-not-identical evidence: F9 (Pavlik & Anderson 2008, `C2-its-actr-procedural.md:170-178`) shows ACT-R-scheduled practice against a fixed item set beats unscheduled/flashcard control with large effect sizes, and F10 (Cepeda et al. 2006, `C2-its-actr-procedural.md:180-188`) shows the retention-maximizing inter-study interval grows with the retention interval. Neither directly measures "a taught procedural skill decays if its first application is delayed by several lesson-units" — that specific configuration is a **COVERAGE GAP**, not a settled finding. The claim is plausible and consistent in direction with F9/F10 but is a falsifiable design bet: **Assumption**, not evidence-backed as currently worded. |
| K-U7-007 | Relabel | "Teach hit and stand first, then double and split." (`2026-07-10-v2-learning-foundations-roadmap-design.md:18`) | No citation. Internally consistent with the later, more detailed unit order in `2026-07-11-blackjack-basics-learning-foundation-design.md:82-104` (Hit/Stand at unit 4, Double/Split at units 7–8), so the claim held up downstream. No dossier source specifically evidences this exact ordering (C2's step-based-ITS material is topic-general, not blackjack-specific). `ALR-033` again places this class of decision under curriculum design's own authority. **Assumption**. |
| K-U7-008 | Relabel | "Subjects unlock in a fixed recommended order. Completed units remain replayable. Passing a checkpoint unlocks the next unit automatically; a checkpoint can use a real Free Play session to let an experienced player advance." (`2026-07-10-v2-learning-foundations-roadmap-design.md:31-33`) | No citation. `ALR-033` (`…-product-activity-research.md:319-323`) is the project's own explicit statement that essential-prerequisite decisions are curriculum design's call, not a research-settled one — directly on point for "unlocks... in a fixed recommended order." Nothing in C1/C2/C4 contradicts gating by checkpoint; C4's Khan Academy findings (F4-F6, `C4-chesscom-khan.md:113-141`) describe a comparable deterministic, threshold-gated ladder as a real, shipped alternative to probabilistic mastery models, which is consistent with (not proof of) this claim's approach. **Product judgement**, correctly grounded once labelled. |
| K-U7-009 | Revise | "6. After V2, expand Basic Strategy mastery gradually: hard totals, hard doubles, soft totals, pairs/splits, then mixed review." (`2026-07-10-v2-learning-foundations-roadmap-design.md:56-57`) | This describes **blocked** practice (master each category in isolation) with mixed practice reserved for last. The single most directly relevant citation the dossiers hold, C2 F11 (Rohrer, Dedrick & Burgess 2014, `C2-its-actr-procedural.md:190-198`), found the reverse ordering effect for a closely analogous task: a grade-7 math RCT where **interleaved** practice on different problem kinds produced far better delayed-test scores than **blocked** practice (72% vs. 38% correct, d=1.05), a result the dossier's own caveat calls out as transferable in shape: "a blackjack trainer's hand/upcard/action decision space is exactly this kind of 'choose the right strategy for this kind of problem' task rather than a single repeated skill." The roadmap claim, as worded, treats "gradual-then-mixed" as an uncontroversial default without acknowledging this tension. Overstatement: the claim implies category-blocked mastery is the safe default; the honest wording should state that the closest analogous evidence found favors introducing mixed-category practice earlier rather than only at the end, and that this is an open design question, not a settled sequencing decision. Domain transfer (grade-7 math to adult blackjack strategy) remains untested in the literature found, so this is Revise (weaken the claim's implied confidence), not Replace or Remove. |

**Counts:** 9 claims assessed — Preserve 1, Relabel 7, Revise 1, Replace 0, Remove 0.

## Corrections landed from verification (V-U7)

Landed editorially by a separate landing editor; verdict words and row count are unchanged. Each
item below quotes what this record said before correction, so the original error stays visible.

**C-U7-001 — `K-U7-002` is over-called and mis-anchored. RESOLVED by adjudication (option B).**
Before this correction the verdict row quoted
`2026-07-11-blackjack-basics-learning-foundation-design.md:10-12` — the **superseded rendering** of
the Claim cell, retained here verbatim so the original error stays visible:

> "This design covers the reusable learning runtime and its first subject, **Blackjack Basics**.
> Strategy Table Fundamentals follows in a separate design cycle after this feature passes scoped
> feature QA."

That sentence states *which design cycle comes when*. It makes no empirical or pedagogical
assertion, and it is the same genre this record itself excludes from scope below — "sequencing
among future *design cards* … Project-planning scope, not curriculum scope; left alone". The
curriculum-prerequisite claim the row's citation cell actually argues about is a different sentence,
at `2026-07-11-…:18-19`, retrieved verbatim this pass:

> "They do not yet know which legal action is strategically correct; that begins with Strategy Table
> Fundamentals."

So the verdict's basis was not the text it cited. The verifier offered two mutually exclusive
resolutions — drop `K-U7-002` to a non-material note (making the counts Relabel 6), or keep the
`Relabel` and re-anchor the quote to `:18-19` — and stated "Do not do both." The first landing pass
declined to choose, recorded the defect here, and left the row as written. A **separate adjudicating
verifier** has since ruled (`verification/V-U7-adjudication.md`): **option B** — retain the
`Relabel`, re-anchor `K-U7-002` to `:18-19`. That re-anchoring has now been executed in the verdict
table above, together with the one bounded consequence the ruling tabulates (the citation cell's
internal-consistency parenthetical narrowed from `:16-19` to `:16-17`, so it no longer cites the
passage the Claim cell quotes). The verdict word, the Claim ID, the row count and the Counts line
are unchanged, as option B changes a Claim cell and not a verdict. **Verified this pass:** both
quotes re-read directly from the design document by the executing landing editor; the exclusion
sentence read directly from this record's own
"Examined and deliberately left alone" section.

<!-- LANDED C-U7-001 (V-U7, editorial): recorded that row K-U7-002 is over-called and mis-anchored (quoted sentence is a design-cycle statement; the curriculum claim is at :18-19); no verdict word or row changed -->
<!-- LANDED C-U7-001 ADJUDICATED (V-U7-adjudication, option B, editorial): K-U7-002 Claim cell re-anchored from :10-12 to :18-19 and its citation-cell consistency parenthetical narrowed from :16-19 to :16-17; superseded :10-12 quotation retained above; verdict word, Claim ID, row count and Counts line unchanged (9 rows: Preserve 1, Relabel 7, Revise 1) -->

**C-U7-002 — survivors were under-reported.** This record assessed exactly one `Preserve` across
four documents, and two in-scope family-5 claims appeared in neither the verdict table nor the
"Examined and deliberately left alone" list. Both are now named in that list below, with reasons.
The second of them was verified by the verifier against product source this record never opened;
the landing editor reopened that source independently rather than accepting the quotation.

<!-- LANDED C-U7-002 (V-U7, editorial): added the two unreported survivors (STF :107-116 and :118-125) to the "Examined and deliberately left alone" list; no verdict row added or changed -->

**C-U7-003 — a conflict was resolved instead of recorded.** See the corrected
"Conflicts logged" section below.

<!-- LANDED C-U7-003 (V-U7, editorial): replaced the "None found" conflicts entry with the logged K-U7-009 conflict row; the previous wording is quoted in place -->


Zero `Remove` and zero `Replace` is the honest outcome of this pass: nothing audited in U7 was found
to be contradicted or baseless. The defects located are labelling defects (an uncited sequencing
claim standing as unlabeled prose, and one persona-endorsement passage standing as if it were
evidentiary warrant) and one overstatement (K-U7-009) — exactly what `Relabel` and `Revise` exist
for.

## Citations re-verified

| Citation | Verdict it supports | Unit | State |
|---|---|---|---|
| ALR-033 (`…-product-activity-research.md:319-323`) | K-U7-002, K-U7-003, K-U7-007, K-U7-008 | U7 | VERIFIED |
| ALR-027 (`…-product-activity-research.md:283-287`) | K-U7-001 | U7 | VERIFIED |
| C2-F1 (VanLehn 2011 via Ma et al. 2014, `C2-its-actr-procedural.md:83-92`) | K-U7-003 | U7 | VERIFIED |
| C2-F9 (Pavlik & Anderson 2008, `C2-its-actr-procedural.md:170-178`) | K-U7-006 | U7 | VERIFIED |
| C2-F10 (Cepeda et al. 2006, `C2-its-actr-procedural.md:180-188`) | K-U7-006 | U7 | VERIFIED |
| C2-F11 (Rohrer, Dedrick & Burgess 2014, `C2-its-actr-procedural.md:190-198`) | K-U7-009 | U7 | VERIFIED |
| C4-F4/F6 (Khan Academy mastery ladder, `C4-chesscom-khan.md:113-141`) | K-U7-008 | U7 | VERIFIED |
| `crates/blackjack-core/src/strategy.rs:140-194` (primary product source, read directly this pass) | K-U7-005 | U7 | VERIFIED |

No citation above came back `UNVERIFIED` or `UNVERIFIABLE`. The one `Preserve` (K-U7-005) rests on a
directly re-opened primary source (the engine code the audited document itself names), not on an
unverified reference. The one `Revise` (K-U7-009) rests on a directly re-read dossier finding.

## Examined and deliberately left alone (survivors not given a row)

- **Feedback Rules** (`2026-07-11-...:144-158`) — family 4 (hints/feedback), not family 5
  (curriculum/prerequisite). Out of this unit's scope; not audited here.
- **Engine Boundary, Curriculum Model, Lesson Controller** sections
  (`2026-07-11-...:160-268`) — these are architecture/contract claims (family 7), not sequencing or
  prerequisite claims. No family-5 content found in them worth a row.
- **Exclusions in the STF lesson-1 design** — "H17-vs-S17 profile differences," "No-table recall and
  timed/realistic pace" (`2026-07-15-...:156-158`) — genuine scope deferrals, but nobody would
  seriously contest deferring ruleset-profile nuance or no-table recall past a first lookup lesson;
  materiality gate fails these (nobody would build differently).
- **"Downstream Deltas" section** (`2026-07-15-...:170-182`) — sequencing among future *design
  cards* (STF-02 through STF-05), not among learner-facing curriculum content. Project-planning
  scope, not curriculum scope; left alone.
- **Build Sequence and Engineering Boundaries** in the roadmap (`2026-07-10-v2-...:35-71`) — e.g.
  "Build one ruleset-matched, engine-owned strategy oracle before teaching features" — this is an
  engineering-sequencing claim (family 6/7 territory: what must be built before what), not a
  learner-facing curriculum claim. Out of this unit's family-5 scope.

The two entries below were **omitted from this list by the original pass** and are added under
`C-U7-002`. Both are in-scope family-5 claims that survive scrutiny; neither was assessed anywhere
in this record before this correction.

- **"Why Adaptive Checkpoint Grading"** (`2026-07-15-...:107-116`) — this record *leans on* the
  passage in K-U7-004's citation cell as the independent warrant that keeps that row at `Relabel`,
  yet never assessed or credited it. Its quantitative core, retrieved verbatim by the landing editor
  at `:109-111`: "An honest 6-deck deal produces a pair, a two-card soft hand, or a natural blackjack
  a meaningful fraction of the time (roughly one first-hand in five is not a plain hard total), and
  the product constitution forbids rigging the deal." The figure is self-contained and checkable, and
  the landing editor independently reproduced it rather than copying the verifier's arithmetic:
  6-deck two-card openings give pairs ≈7.4% (23/311), two-card soft non-blackjack excluding A-A
  ≈9.5%, natural ≈4.8% — ≈21.6% total, i.e. "roughly one first-hand in five." A survivor with a
  self-contained argument; left alone because it stands on its own reasoning, not because it was
  out of scope.
- **Cross-Lesson Continuity** (`2026-07-15-...:118-126`) — its load-bearing factual claim, retrieved
  verbatim at `:123-125`: "**all three arranged `OPENINGS.stiffHands` examples are Basic-Strategy
  STAND hands** — 16 vs dealer 6, 15 vs dealer 5, 16 vs dealer 4 — so the learner physically clicks
  Hit on 16-vs-6, the single most iconic Stand cell in the game." The landing editor reopened the
  product source this record never opened and confirms it independently:
  `web/src/learn/situations.ts:31-35` gives `stiffHands` as `[ten♠, UP_SIX, six♥]` (16 v 6),
  `[king♣, UP_FIVE, five♠]` (15 v 5), `[nine♥, UP_FOUR, seven♦]` (16 v 4) — all three Basic-Strategy
  Stand cells — and `web/src/learn/content/blackjack-basics.ts:252-259` shows step `hit-hand` with
  `setup: { kind: 'arranged', openings: OPENINGS.stiffHands }` and `requestedAction: 'hit'`, so the
  learner does click Hit on 16-vs-6. `OBSERVED`-grade survivor.

<!-- LANDED C-U7-002 (V-U7, editorial): the two entries above were added to this list; product source situations.ts:31-35 and blackjack-basics.ts:252-259 reopened independently by the landing editor -->

## Conflicts logged (recorded, not resolved)

**Corrected under `C-U7-003`.** This section previously read, in full:

> "None found beyond the tension already recorded and resolved into a verdict at K-U7-009. No two
> audited documents contradict each other on a sequencing or prerequisite claim; the tension found
> is between one document's claim and a Phase 1 dossier finding, and it is carried as a `Revise`,
> not left as an unresolved conflict entry."

Carrying a tension as a verdict is not the same artifact as logging it: an audit verdict is the
in-unit remedy, while a conflict entry is what lets a later phase see the tension without
re-deriving it. The first sentence's "no two audited documents contradict each other" holds and is
retained. The tension itself is logged here:

| Conflict | Side A | Side B | Status |
|---|---|---|---|
| Curriculum sequencing: category-blocked-then-mixed vs. interleaved practice | Project design — `docs/superpowers/specs/2026-07-10-v2-learning-foundations-roadmap-design.md:56-57`: "After V2, expand Basic Strategy mastery gradually: hard totals, hard doubles, soft totals, pairs/splits, then mixed review." | Phase 1 archive — `docs/superpowers/research/foundation-audit-p1/dossiers/C2-its-actr-procedural.md:190-198` (F11, Rohrer, Dedrick & Burgess 2014, Q2 RCT, grade-7 math, n=140): interleaved 72% vs. blocked 38%, d=1.05; dossier caveat records the blackjack decision space as "exactly this kind of 'choose the right strategy for this kind of problem' task" while stating that domain transfer is untested. | RECORDED — unresolved. Carried in-unit as `K-U7-009 Revise`; logged here so a later phase does not re-derive it. Register-row ID assignment is the orchestrator's, not this record's. |

Both anchors were reopened by the landing editor this pass and match verbatim.

## Calibration — what "good" looks like

Held to the `journal/decisions.md` R20/R24/R25/R26/R27 bar (exact doc path plus section/line number,
or a measured figure). Concretely, in this record: K-U7-005 is grounded in an exact function-level
citation of primary product source code (`crates/blackjack-core/src/strategy.rs:140-194`) read
directly this pass, not asserted from the audited document's own claim about it. K-U7-009 names an
exact effect size (72% vs. 38%, d=1.05) from a dossier finding read directly, and states precisely
what the claim overstates rather than asserting a general "this seems wrong." K-U7-002/008 both cite
the exact line range of `ALR-033`'s Limitation clause rather than paraphrasing it.

## Non-material notes

(No verdict. No landing loop. These failed the materiality gate — a designer would not build
differently on any of them.)

- `2026-07-10-first-guided-drill-design.md` is marked **Superseded** at its own top (line 5: "This
  guided-drill prototype was retired and replaced by the Blackjack Basics learning foundation") and
  retained only "for historical context." Its micro-unit structure (2–3 units, `:26-39`) has been
  replaced wholesale by the nine-unit structure audited at K-U7-001/003 above. Nothing in this
  document is still load-bearing anywhere else in the four files or in the baseline; per the
  staleness rule, this is a one-line note, not a verdict. Its high-level sequencing intent ("orient
  the learner ... before teaching the Basic Strategy table," `:16-17`) is not contradicted by the
  current design — it is simply superseded in detail.
- `2026-07-11-...:60-61` ("It does not mean the learner can choose the Basic Strategy action ...")
  is the same subject-boundary claim as K-U7-002, stated from the negative side. Not a separate
  claim; folded into K-U7-002's citation rather than double-counted.
- The Fable-review provenance note at `2026-07-15-...:12-17` also states the same subagent "verified
  ... the prior-subject wording against `web/src/learn/content/blackjack-basics.ts`" — a
  cross-document consistency check, not a pedagogical warrant. This half of the sentence is not part
  of the K-U7-004 labelling defect; it describes a legitimate text-diffing check, not an opinion
  presented as evidence.
- Wording nits ("mechanics-first, one concept per screen," `2026-07-15-...:55`) are a step-authoring
  style note, not a contestable sequencing claim distinct from K-U7-003/K-U7-005; not double-counted.
