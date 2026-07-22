# Verification — Unit U7

> Independent verification of `journal/raw/_inbox/foundation-audit-p2/audit/U7-audit.md` (9 assessed
> claims: Preserve 1, Relabel 7, Revise 1, Replace 0, Remove 0), against the four earlier learning
> designs under `docs/superpowers/specs/`. Written 2026-07-21. Verifier did not write the audit
> record and holds no edit capability over it.
>
> Everything below was independently retrieved this pass: all four audited designs read in full,
> `crates/blackjack-core/src/strategy.rs:130-204` read directly, `C2-its-actr-procedural.md:75-198`
> and `C4-chesscom-khan.md:108-147` read directly, `2026-07-16-adaptive-learning-product-activity-research.md:270-339`
> read directly, plus two primary product sources the record did not open
> (`web/src/learn/situations.ts:21-45`, `web/src/learn/content/blackjack-basics.ts:252-261`).

SUFFICIENCY: SUFFICIENT

The record engaged the on-point evidence its questions require (C2 F9/F10/F11 for spacing and
sequencing, C4 F4–F6 for threshold-gated ladders, `ALR-033`/`ALR-027` for the project's own
statement of where curriculum authority sits), reopened the one primary source a claim depended on,
and quoted every claim verbatim. The three material corrections below are bounded and closable from
sources already in hand; none of them is an evidence-collection gap. Noted for the gate: if the
program treats survivor coverage as a completeness precondition, `C-U7-002` must land before the
unit is gated — it is the one correction that changes what the record reports about the unit as a
whole rather than about a single row.

## Mandatory calibration — Remove/Replace defect-real answers

Not applicable: the audit record carries zero `Remove` and zero `Replace` verdicts. **Confirmed
honest.** I read all four documents in full and found nothing contradicted by a Phase 1 dossier or
by product source, and nothing baseless in the strong sense. The one claim with real evidential
tension (`K-U7-009`) rests on a single Q2 grade-7 classroom RCT whose own dossier caveat records the
transfer as untested — which is exactly the ceiling that makes `Revise` correct and `Replace`/`Remove`
manufactured. Zero Remove/Replace here is the calibrated result, not an omission.

## Duty 1 — calibration on the 7 `Relabel` verdicts (row by row)

The record's Format note (lines 42-49) declares a blanket policy: all four documents are uncited by
construction, therefore every assessed claim is an "implicit, untagged assertion" needing a label.
That policy is what makes the Relabel count near-deterministic, and it is the pessimism-drift risk
the dispatch names. I tested each row against the sharper question the dispatch supplies — *does the
claim's own wording carry an implied empirical warrant, or is it a bare design choice that needs no
relabel?*

| Row | My ruling | Reasoning |
|----|----|----|
| K-U7-001 (2–4 min/unit, one small skill) | **Relabel upheld** | "roughly two to four minutes" is a quantitative statement about learner behaviour; a reader can mistake it for calibrated. `ALR-027`'s Limitation ("the research does not establish universal minutes", verified verbatim at `…-product-activity-research.md:287`) is a fair one-level-up analogy, correctly flagged as analogy and not as direct evidence. Assumption is the right bucket. |
| K-U7-002 (Basics design covers runtime + first subject; STF follows in a separate design cycle) | **OVER-CALLED — should have had no verdict, or a different anchor** | The quoted sentence (`2026-07-11-…:10-12`) is a statement about *which design cycle comes when*, not a learner-facing curriculum claim, and it makes no empirical assertion at all. The record's own exclusion rule excludes exactly this genre: "**Downstream Deltas** … sequencing among future *design cards* … Project-planning scope, not curriculum scope; left alone" (audit record lines 114-116). The curriculum-prerequisite claim the citation cell actually argues about lives at `2026-07-11-…:18-19` ("They do not yet know which legal action is strategically correct; that begins with Strategy Table Fundamentals."), which is not the sentence quoted. See `C-U7-001`. |
| K-U7-003 (nine-unit teaching order) | **Relabel upheld** | A genuine curriculum-sequencing claim with implied pedagogical warrant; quote and anchors verified (`:68-111`; Hit and Stand at `:82`, Double `:96`, Split `:102`). `ALR-033` correctly applied; C2 F1 correctly described as consistent-with-but-not-establishing. Assumption is right. |
| K-U7-004 (Fable-subagent review passage) | **Relabel upheld** — see Duty 2 | |
| K-U7-006 (read-only skill decays if application is several lessons away) | **Relabel upheld** | The strongest of the seven. This is an explicit empirical assertion about skill decay, stated as fact, and it drives a hard downstream constraint ("adjacent and unskippable"). C2 F9/F10 are correctly characterised as adjacent-not-identical, and the COVERAGE GAP framing is accurate against the dossier text I read. A harsher `Revise` was available and the examiner did not reach for it; I do not overturn a verdict in the lenient direction. |
| K-U7-007 (teach hit/stand first, then double/split) | **Relabel upheld** | Verbatim at `2026-07-10-v2-…:18`. A bare curriculum-order claim, but ordering claims carry pedagogical implication, so a label is warranted. See non-material note on double-counting with K-U7-003. |
| K-U7-008 (fixed unlock order, checkpoint-gated) | **Relabel upheld** | Verbatim at `:31-33`. `ALR-033`'s Limitation is squarely on point and quoted correctly. C4 F4–F6 correctly used as "consistent with (not proof of)" — and correctly not treated as independent corroboration: those are Q5 vendor help-centre pages describing Khan Academy's own mechanism, which the record does not inflate. Product judgement is right. |

**Net: 6 of 7 Relabels upheld, 1 over-called.** That is not a pessimism-drift pattern. The high
Relabel count is genuinely driven by the document class (0 citations across 798 lines of curriculum
design), not by manufactured defects — with the one exception recorded as `C-U7-001`.

**Under-calling — the one `Preserve` does under-report survivors.** Two in-scope family-5 claims
survive scrutiny and appear in neither the verdict table nor the "Examined and deliberately left
alone" list:

1. `2026-07-15-…:107-116` ("Why Adaptive Checkpoint Grading"). The record *leans on* this passage as
   the independent warrant that keeps `K-U7-004` at `Relabel`, but never audits or credits it. Its
   quantitative core — "roughly one first-hand in five is not a plain hard total" — is sound on
   independent arithmetic (6-deck two-card openings: pairs ≈7.5%, two-card soft non-blackjack ≈9%,
   natural ≈4.8%; ≈21%). A survivor with a self-contained, checkable argument.
2. `2026-07-15-…:118-126` (Cross-Lesson Continuity). Its load-bearing factual claim — "**all three
   arranged `OPENINGS.stiffHands` examples are Basic-Strategy STAND hands** — 16 vs dealer 6, 15 vs
   dealer 5, 16 vs dealer 4" — I verified true against product source not opened by the record:
   `web/src/learn/situations.ts:31-35` gives `[ten, UP_SIX, six]` (16 v 6), `[king, UP_FIVE, five]`
   (15 v 5), `[nine, UP_FOUR, seven]` (16 v 4); and `web/src/learn/content/blackjack-basics.ts:252-259`
   confirms the `hit-hand` step uses `setup: { kind: 'arranged', openings: OPENINGS.stiffHands }`
   with `requestedAction: 'hit'`, so the learner does physically click Hit on 16-vs-6. This is an
   `OBSERVED`-grade survivor of exactly the kind the program asks to be reported.

See `C-U7-002`.

## Duty 2 — ruling on `K-U7-004` (agent-persona-as-evidence)

**Verdict upheld: `Relabel`, correctly scoped.**

- **Quote:** verbatim and exact against `2026-07-15-strategy-table-fundamentals-lesson1-design.md:12-17`,
  including line breaks and the em-dashes. No paraphrase, no ellipsis.
- **The split is sound.** "verified the example cells against `crates/blackjack-core/src/strategy.rs`"
  is a report of a deterministic check and is additionally backstopped inside the same document by a
  required automated check — `:166` ("Example and checkpoint cells are validated against the oracle
  (extend `web/src/learn/validate.ts` with an example-cell-vs-oracle check); no strategy value is
  hand-written prose") and `:186-190`. So nothing load-bearing rests on the persona's *report* of the
  code-check. Treating that half as legitimate is not leniency; it is correct.
- **The independent argument exists — confirmed.** `:107-116` is a self-contained argument from
  honest-shoe hand-class frequency plus the no-rigging constraint, making no reference to the review.
  Because it stands alone, the persona endorsement is *not* the sole warrant, and `Relabel` (label
  wrong, claim fine) is the right strength rather than something stronger. Had `:107-116` been absent
  I would have called the verdict too soft; it is present, and I independently sanity-checked its one
  number (≈21%, above).
- **Negative confirmed independently.** I grepped all four audited files for persona/review-as-warrant
  patterns (`subagent|reviewed by|Fable|persona|endorse|instructional designer|expert review|
  recommend(ed|s) (that|we)`). The only hit inside the unit is the STF passage itself. The one
  near-miss — `2026-07-10-first-guided-drill-design.md:9` ("reshaped 2026-07-10 after review of the
  original product notes and the V2 roadmap") — cites documents, not an agent opinion, and is not
  offered as pedagogical warrant. The record's negative finding holds.

## Duty 3 — ruling on `K-U7-009`

**Verdict upheld: `Revise`. Neither over- nor under-called. This is the record's best row.**

- **Figures verified against the dossier, not the record.** `C2-its-actr-procedural.md:190-198`, F11:
  headline "72% vs. 38% correct, d = 1.05"; Claimed strength, exact quote: "The mean test scores were
  greater for material learned by interleaved practice rather than blocked practice (72 % vs. 38 %,
  d = 1.05)." Design: "Q2 (randomized, counterbalanced classroom experiment)", grade-7 math, n=140,
  Rohrer, Dedrick & Burgess (2014). Every figure, the model, the author list, and the tier are
  reported correctly. Q2 is warranted by the design.
- **Analogy quoted correctly and not overstated.** The dossier caveat is verbatim: "a blackjack
  trainer's hand/upcard/action decision space is exactly this kind of 'choose the right strategy for
  this kind of problem' task rather than a single repeated skill." The record carries the dossier's
  own limiting clause too — "Domain is grade-7 math, not adult strategy-game/gambling-adjacent skill;
  that transfer is untested" — and uses it as the explicit reason not to escalate.
- **Ruling.** Escalating to `Replace`/`Remove` on one Q2 classroom RCT with self-declared untested
  transfer would be a manufactured defect. Dropping to `Relabel` is also wrong: unlike the other
  roadmap bullets, this claim's subject matter is one on which the project *already holds* directly
  analogous evidence pointing the other way, so leaving its implied confidence unqualified would
  mislead a reader who holds the same archive. `Revise` is the calibrated middle.

## Duty 4 — quotes and anchors (G9)

Every audited claim carries a verbatim quote and a `file:line` anchor naming which of the four files
it came from. I re-checked all nine character-for-character against the sources:

- K-U7-001 `2026-07-11-…:65-66` ✅ exact. K-U7-002 `:10-12` ✅ exact. K-U7-003 `:68-111` ✅ (unit
  headings verified at `:68`, `:82`, `:96`, `:102`, `:107`).
- K-U7-004 `2026-07-15-…:12-17` ✅ exact. K-U7-005 ✅ exact text; anchor short by one line (see
  non-material). K-U7-006 ✅ exact text; anchor short by one line (see non-material).
- K-U7-007 `2026-07-10-v2-…:18` ✅ exact. K-U7-008 `:31-33` ✅ exact. K-U7-009 `:56-57` ✅ exact.
- **No paraphrase presented as verbatim. No ellipsis anywhere in the record — therefore no
  meaning-reversing elision of the Phase 1 kind.** Dossier quotations (F11's claimed-strength and
  caveat) are likewise verbatim against `C2-its-actr-procedural.md`.
- **`strategy.rs` reopening independently reproduced.** `basic_strategy_action` at `:140`; the
  empty/complete/bust/blackjack guard at `:153-159`; `if is_pair(hand)` at `:162`; `let score =
  score_hand(&hand.cards); let chart_move = if score.is_soft { soft_move(...) } else { hard_move(...) }`
  at `:173-178`. Precedence is pair → soft → hard, exactly as `K-U7-005` states. `Preserve` is
  correct and correctly limited to a code-precedence fact rather than a pedagogical-effectiveness
  claim. One nuance recorded as non-material below.

## Duty 6 — what the record did not log

The record states (lines 124-127) that the `K-U7-009` tension was "carried as a `Revise`, not left as
an unresolved conflict entry." That is the resolution-instead-of-recording pattern the program
forbids. The tension is between an approved project design document and a Q2 finding in the approved
Phase 1 archive; the audit verdict is the in-unit remedy, but the cross-phase register is where the
tension belongs so a later phase can see it without re-deriving it. One conflict row is returned to
the orchestrator (below); no other conflict was found — I independently checked the four documents
against each other and they do not contradict one another on any sequencing or prerequisite claim.

## Phase-boundary rules

1. **"States what the project should now do"** — no breach found. Closest approach is audit record
   **line 76** ("the honest wording should state that the closest analogous evidence found favors
   introducing mixed-category practice earlier rather than only at the end, and that this is an open
   design question"). Read strictly, this characterises what the *claim's wording* overstates, which
   is in scope; it does not prescribe a curriculum order. It is close enough to the line that an
   editor must not treat it as approved replacement wording. Recorded as non-material, line reference
   given.
2. **Authoring replacement content for a `Replace`** — moot and confirmed: zero `Replace` verdicts,
   and no replacement content authored anywhere in the record.
3. **`Confirm / Revise / Reconsider / Remove` in a later phase's decision sense** — no breach. The
   legend at line 13 is the audit vocabulary (Preserve / Relabel / Revise / Replace / Remove) and
   every use is an audit verdict, not a decision stamp.

## Citation states (verifier-assigned)

All rows below were retrieved and read by me this pass; none was accepted on the record's say-so, and
none rests on another source's retrieval.

| Citation | Verdict it supports | Unit | State |
|---|---|---|---|
| ALR-033 (`2026-07-16-adaptive-learning-product-activity-research.md:319-323`) | Relabel | U7 | VERIFIED |
| ALR-027 (`2026-07-16-adaptive-learning-product-activity-research.md:283-287`) | Relabel | U7 | VERIFIED |
| C2-F1 (VanLehn 2011 via Ma et al. 2014, `C2-its-actr-procedural.md:83-92`) | Relabel | U7 | VERIFIED |
| C2-F9 (Pavlik & Anderson 2008, `C2-its-actr-procedural.md:170-178`) | Relabel | U7 | VERIFIED |
| C2-F10 (Cepeda et al. 2006, `C2-its-actr-procedural.md:180-188`) | Relabel | U7 | VERIFIED |
| C2-F11 (Rohrer, Dedrick & Burgess 2014, `C2-its-actr-procedural.md:190-198`) | Revise | U7 | VERIFIED |
| C4-F4/F6 (Khan Academy mastery ladder, `C4-chesscom-khan.md:113-141`) | Relabel | U7 | VERIFIED |
| `crates/blackjack-core/src/strategy.rs:140-194` (primary product source) | Preserve | U7 | VERIFIED |
| `web/src/learn/situations.ts:31-35` + `web/src/learn/content/blackjack-basics.ts:252-259` (verifier-retrieved) | Preserve (proposed survivor, per C-U7-002) | U7 | VERIFIED |

No `UNVERIFIED` or `UNVERIFIABLE` states. The single `Preserve` and the single `Revise` each rest on a
`VERIFIED` citation, so the no-weak-basis rule holds.

Two secondary observations on citation quality, neither defect-forming: (a) C2-F1's dossier entry
carries a Phase 1 access downgrade to Q5 (read via the author's own slide deck), and the record uses
it only as "consistent with, but does not specifically establish" — appropriately weak use; (b) C4
F4–F6 are Q5 vendor help-centre documentation, and the record does not present them as independent
corroboration of anything, only as an existence proof of a shipped deterministic ladder. Both uses
are within what the sources can bear.

## Corrections raised

| ID | Correction | Remedy |
|----|----|----|
| C-U7-001 | `K-U7-002` is over-called and mis-anchored. The quoted sentence — verbatim at `2026-07-11-blackjack-basics-learning-foundation-design.md:10-12`: "This design covers the reusable learning runtime and its first subject, **Blackjack Basics**. Strategy Table Fundamentals follows in a separate design cycle after this feature passes scoped feature QA." — is a design-cycle/process statement making no empirical or pedagogical assertion, and is the same genre the record itself excludes from scope at its own lines 114-116 ("sequencing among future *design cards* … Project-planning scope, not curriculum scope; left alone"). The curriculum claim the citation cell actually argues is at `2026-07-11-…:18-19`: "They do not yet know which legal action is strategically correct; that begins with Strategy Table Fundamentals." The verdict's basis is therefore not the text it cites. Resolve one of two ways: drop `K-U7-002` to a non-material note (making the counts Relabel 6), or keep the `Relabel` and re-anchor the quote to `:18-19` so the verdict rests on the sentence that carries the claim. Do not do both. | editorial |
| C-U7-002 | Survivors are under-reported: exactly one `Preserve` across 798 lines and four documents, while two in-scope family-5 claims appear in neither the verdict table nor the "Examined and deliberately left alone" list. (a) `2026-07-15-…:107-116` ("Why Adaptive Checkpoint Grading") — the record makes this passage the load-bearing independent warrant that keeps `K-U7-004` at `Relabel` yet never assesses it; its quantitative core, verbatim, is "An honest 6-deck deal produces a pair, a two-card soft hand, or a natural blackjack a meaningful fraction of the time (roughly one first-hand in five is not a plain hard total), and the product constitution forbids rigging the deal." That figure is independently sound (≈21%). (b) `2026-07-15-…:123-125` — verbatim: "**all three arranged `OPENINGS.stiffHands` examples are Basic-Strategy STAND hands** — 16 vs dealer 6, 15 vs dealer 5, 16 vs dealer 4 — so the learner physically clicks Hit on 16-vs-6, the single most iconic Stand cell in the game." Verified true against product source: `web/src/learn/situations.ts:31-35` — `stiffHands: [[C('ten','spades'), UP_SIX, C('six','hearts')], [C('king','clubs'), UP_FIVE, C('five','spades')], [C('nine','hearts'), UP_FOUR, C('seven','diamonds')]]` (16v6, 15v5, 16v4, all Basic-Strategy Stand) — and `web/src/learn/content/blackjack-basics.ts:252-259`, where step `hit-hand` carries `setup: { kind: 'arranged', openings: OPENINGS.stiffHands }` with `requestedAction: 'hit'`. Both belong in the record as assessed survivors (`Preserve`) or, at minimum, as explicitly named left-alone items with a stated reason. | editorial (all source text supplied verbatim above; the editor should reopen `web/src/learn/situations.ts` per G9 before landing (b)) |
| C-U7-003 | The record's "Conflicts logged" section (lines 122-127) states none, on the ground that the `K-U7-009` tension was "carried as a `Revise`, not left as an unresolved conflict entry." Conflicts are recorded, not resolved: an audit verdict and a conflict-register entry are different artifacts serving different phases. The tension — an approved project design document (`2026-07-10-v2-learning-foundations-roadmap-design.md:56-57`, blocked-then-mixed) against a Q2 finding in the approved Phase 1 archive (`C2-its-actr-procedural.md:190-198`, interleaved 72% vs blocked 38%, d=1.05) — must also be logged as a conflict. Row returned to the orchestrator for ID assignment (verifier does not write shared registers). | editorial |

## Non-material notes (mechanical / cosmetic — not gated)

- Anchor off-by-one, `K-U7-005`: quote text is exact but spans `2026-07-15-…:65-67`, not `:65-66`
  (the clause "*soft*, then *hard*. This is what makes A-A resolve to the pair section…" sits on line
  67). Quotation marks around `soft 12` are rendered single in the record, double in the source.
- Anchor off-by-one, `K-U7-006`: the quote begins mid-line at `:153` ("…is the adjacent application
  lesson. STF-05 must sequence that…"), so the range is `:153-155`, not `:154-155`.
- Line-count inconsistency inside the record: header says "~802 lines" (line 8), Format note says
  "798 lines" (line 49). Actual totals are 384 + 197 + 79 + 142 = 802.
- `K-U7-003` and `K-U7-007` are substantively the same curriculum-order claim stated in two
  documents. Two rows is defensible (each document needs its own label) but should be stated as such,
  since the record elsewhere refuses to double-count (its own non-material note on `:60-61`).
- Scope-statement inconsistency: the "Examined and deliberately left alone" section excludes "Build
  Sequence and Engineering Boundaries in the roadmap (`2026-07-10-v2-…:35-71`)" as out of family-5
  scope, yet `K-U7-009` audits item 6 of that very Build Sequence at `:56-57`. Auditing `:56-57` is
  correct — it is learner-facing curriculum content that happens to sit in a build list — so the
  exclusion sentence, not the verdict, is what needs narrowing.
- `strategy.rs` nuance not recorded by `K-U7-005`: the pair branch at `:162-171` falls through to the
  soft/hard branch when `pair_move` is `ChartMove::Split` and `Action::Split` is not in
  `legal_actions`. Precedence is therefore pair-first *conditional on split legality*. This does not
  disturb the claim (chart precedence is pair → soft → hard); it is a legality accommodation, worth a
  parenthetical if the row is ever re-touched.
- Audit record **line 76** phrasing ("the honest wording should state that…") sits at the edge of the
  no-prescription boundary. Not a breach as written; an editor must not treat it as approved
  replacement wording.

## Rows returned to the orchestrator (not written by the verifier)

**Conflict register — one row proposed:**

| Conflict | Side A | Side B | Status |
|---|---|---|---|
| Curriculum sequencing: category-blocked-then-mixed vs. interleaved practice | Project design — `docs/superpowers/specs/2026-07-10-v2-learning-foundations-roadmap-design.md:56-57`: "After V2, expand Basic Strategy mastery gradually: hard totals, hard doubles, soft totals, pairs/splits, then mixed review." | Phase 1 archive — `docs/superpowers/research/foundation-audit-p1/dossiers/C2-its-actr-procedural.md:190-198` (F11, Rohrer, Dedrick & Burgess 2014, Q2 RCT, grade-7 math, n=140): interleaved 72% vs. blocked 38%, d=1.05; dossier caveat records the blackjack decision space as "exactly this kind of 'choose the right strategy for this kind of problem' task" while stating domain transfer is untested. | RECORDED — unresolved. Carried in-unit as `K-U7-009 Revise`; registered here so a later phase does not have to re-derive it. |

**Source-lead register — no rows.** No evidence gap was identified; all three corrections are
editorial against sources already held.
