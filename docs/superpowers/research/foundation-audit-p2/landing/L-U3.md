# Landing record — Unit U3

> Target record: `journal/raw/_inbox/foundation-audit-p2/audit/U3-audit.md`.
> Corrections source (authoritative): `journal/raw/_inbox/foundation-audit-p2/verification/V-U3.md`.
> Landing editor: landing editor (Opus 4.8). Date: 2026-07-22. Run: `foundation-audit-p2`.
> Unit audited (read-only, unmodified): `docs/superpowers/specs/2026-07-16-adaptive-ai-learning-architecture-design.md`.
> No `WebSearch`; no `WebFetch`. Every retrieval below is an in-repo reopening performed by this pass,
> not accepted from the verification record.

## Prior false landing claim — corrected in-record

A header block dated **2026-07-21** in `audit/U3-audit.md:9-12` asserted that `C-U3-001`…`C-U3-005`
had been landed and marked in place. **No `LANDED C-U3-` marker existed anywhere in the file**; the
pass that wrote that header was interrupted before landing any correction. The header was **not
deleted**. It is corrected in place, in the manner of `journal/decisions.md` R24/R26: the audit record
now states what the 2026-07-21 header claimed, that the claim was false when written, and why a
premature claim of landing is the same defect the program was founded on.

## Marker convention used

`<!-- LANDED C-U3-NNN (V-U3, editorial): <one line> -->` on **its own line immediately below** the
affected row or paragraph. Never inside a table row, never between `|` delimiters.

**Verdict-row invariant checked after landing:** rows matching
`^\| *K-U3-[0-9]{3} *\| *(Preserve|Relabel|Revise|Replace|Remove) *\|` = **13**. Unchanged.

## Corrections landed

| ID | Anchor in `audit/U3-audit.md` | Retrieval actually performed |
|----|----|----|
| C-U3-001 | K-U3-001 prose bullet under "The two Revise verdicts" (post-edit `:103-126`; marker `:127`), cross-marker under the K-U3-001 verdict row (row `:74`, marker `:76`) | Read `docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md:1-50` — status line `:3` verbatim "Status: approved 2026-07-16; all six bounded recommendations were accepted."; source-register rows DUO-001…TECH-001 all carry "Retrieval date 2026-07-16". Read `...adaptive-ai-learning-architecture-design.md:1-8` — `:3` verbatim "Status: conversational design approved 2026-07-16; written-spec review pending." Read `...architecture-design.md:590-604` — `:596` verbatim "`AL-R1` — research learning products and initial activity mechanics;". Dates checked in the documents themselves, not inferred from V-U3. |
| C-U3-002 | K-U3-002 verdict row basis cell (`:78`; marker `:79`) and ground (a) of the K-U3-002 prose bullet (`:129-139`; marker `:150`) | Read `...adaptive-ai-learning-architecture-design.md:461-505` — gate text `:470-472` verbatim "Cover session structure, scaffolding, hints, skill tests, review, mistakes, pacing, activity variation, accessibility, retrieval practice, spacing, interleaving, worked examples, cognitive load, feedback timing, mastery learning, and adaptive assessment."; curriculum gate `:495-498` reopened and confirmed as the record quoted it. |
| C-U3-003 | K-U3-008 verdict row basis cell (`:87`; marker `:88`) | Read `...adaptive-learning-product-activity-research.md:275-334` — `:289-291` verbatim "**ALR-028 — End a session when its evidence target is satisfied, either bound is reached, or the learner stops.**" / "Evidence: **INFERENCE:** adaptive stopping tradeoffs in `SCI-008`; **PROJECT CONSTRAINT:** approved session end conditions." SCI-008 limitation re-read at `:46`. |
| C-U3-004 | K-U3-013 verdict row basis cell (`:94`; marker `:95`) | Read `...adaptive-learning-product-activity-research.md:275-334` — `:319-321` verbatim "**ALR-033 — Gate only essential prerequisites while showing simple learner states backed by richer internal evidence.**" / "Evidence: **PUBLISHED/INFERENCE:** `BRI-001`, `SCI-006`; **PROJECT CONSTRAINT:** approved progression and state vocabulary."; its limitation `:323` verbatim "mastery research does not identify which blackjack prerequisites are essential; curriculum design owns that decision." |
| C-U3-005 | K-U3-001 verdict row (`:74`; marker `:75`), K-U3-002 verdict row (`:78`; marker `:80`), K-U3-001 bullet (marker `:128`), K-U3-002 bullet (marker `:151`) | Read `...adaptive-learning-product-activity-research.md:275-334` — ALR-027 limitation `:287` verbatim "numeric values require calibration and may vary by accessibility/interaction mode; the research does not establish universal minutes."; ALR-032 limitation `:317` verbatim "counts, diversity rules, recency, and retention intervals remain provisional until observed blackjack data supports them." Read `...product-activity-research.md:1-50` — DUO-006 limitation `:33` verbatim "Language-item recall and engagement do not establish blackjack mastery thresholds or a general learner model." |

## Invariants asserted by this pass

- **No verdict changed.** All 13 stand exactly as the examiner assigned and the verifier upheld,
  including `K-U3-001` and `K-U3-002` as `Revise` (not `Relabel`). Bases, quotations and coverage
  claims were corrected; adjudication was not touched.
- **No threshold, interval, count, or other replacement value is proposed anywhere.** Naming that a
  threshold's basis is unstated is in scope; supplying a value is not, and none appears.
- **No new corrections raised.** Residual observations are returned to the orchestrator for a
  verifier to judge, not written into the record as corrections.
- **Files written:** `audit/U3-audit.md` (in place) and this file only. The audited spec and every
  other product doc, plan, source file, and `registers/` entry were read at most, never modified.
