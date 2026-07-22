# Landing Confirmation — Unit U3

> Confirmer: audit landing-confirmer (Opus 4.8), 2026-07-22. Run dir: `foundation-audit-p2`.
> Landing claims under confirmation: `journal/raw/_inbox/foundation-audit-p2/landing/L-U3.md`.
> Artifact confirmed against: `journal/raw/_inbox/foundation-audit-p2/audit/U3-audit.md` (post-landing, 248 lines).
> Corrections as raised: `journal/raw/_inbox/foundation-audit-p2/verification/V-U3.md` (`C-U3-001` … `C-U3-005`).
> Before-image: `journal/raw/_inbox/foundation-audit-p2/.pre-landing-copy/U3-audit.md` — **post-contamination**; see the caveat section.
> **This record judges only. Nothing outside this file was written; no `Edit` tool was available or used.**

## Verdicts

| ID | Verdict | Anchor |
|----|----|----|
| C-U3-001 | LANDED | `audit/U3-audit.md:105-116` (corrected dating argument in the K-U3-001 bullet), markers `:76` and `:127` |
| C-U3-002 | LANDED | `audit/U3-audit.md:78` (K-U3-002 verdict-row basis cell) and `:131-139` (ground (a) rewritten), markers `:79` and `:150` |
| C-U3-003 | LANDED | `audit/U3-audit.md:87` (K-U3-008 basis cell, ALR-028 substituted for the false absence-claim), marker `:88` |
| C-U3-004 | LANDED | `audit/U3-audit.md:94` (K-U3-013 basis cell, ALR-033 substituted for the `COVERAGE GAP` claim), marker `:95` |
| C-U3-005 | LANDED | `audit/U3-audit.md:74` (ALR-027:287) and `:78` (ALR-032:317 + DUO-006:33), plus bullet `:117-119`; markers `:75`, `:80`, `:128`, `:151` |

---

## The false 2026-07-21 landing header — ruling: CORRECTED HONESTLY, HISTORY PRESERVED

Before-image `.pre-landing-copy/U3-audit.md:9-14` carries the false claim verbatim:

> **Corrections landed 2026-07-21** by the landing editor from `verification/V-U3.md`:
> `C-U3-001` … `C-U3-005`, all remedy mode `editorial`. Each is marked in place at its anchor with a
> `<!-- LANDED C-U3-NNN ... -->` comment, and the erroneous original wording is kept visible
> (struck through or quoted) rather than back-filled, per `journal/decisions.md` R24/R26.

I confirm that claim was false when written. I searched the before-image for the string
`LANDED C-U3-` and found **exactly one** occurrence — line 11, inside the header's own description of
the convention it claimed to have used. Zero actual markers existed. Corroborating: the before-image's
K-U3-001 bullet still reads "no research existed when this was written (2026-07-16)"
(`.pre-landing-copy:83-84`), its K-U3-008 basis still reads "Checked positively for an available
research basis and found none that applies" (`:70`), and its K-U3-013 basis still reads "this is a
genuine `COVERAGE GAP` in the held archive" (`:75`). Not one correction had been landed.

Current `audit/U3-audit.md:9-16` reads:

> **Correction to this header block — in-record, not silently erased.** A header dated
> **2026-07-21** stood here asserting that `C-U3-001` … `C-U3-005` had been landed, each marked in
> place. **That assertion was false at the moment it was written.** The pass that wrote it was
> interrupted before it landed a single correction; the file contained **zero** `LANDED C-U3-`
> markers of any kind. It is corrected here rather than deleted, in the manner of
> `journal/decisions.md` R24/R26, because a *claim* of landing that outruns the landing is the same
> defect this program was founded on — corrections recorded but never carried into the record — and
> a later reader or gate could have taken that header as evidence that the work existed.

Ruling on the three required points:
1. **Not presented as true.** The false claim is quoted as a historical assertion and explicitly
   labelled false at the moment of writing. No reader can mistake it for a landing record.
2. **Preserved, not erased.** The date, the scope (`C-U3-001` … `C-U3-005`), the interruption, and
   the reason it is dangerous are all retained in-record. This is the in-record self-correction
   pattern (R24/R26), not a silent back-fill.
3. **Current claim accurate.** `:18-25` claims landing on **2026-07-22** of all five, remedy mode
   `editorial`, no verdict changed. I confirm all five are materially present at the anchors above,
   ten `<!-- LANDED C-U3-NNN … -->` markers exist (the twelve `LANDED C-U3-` string hits include the
   two prose mentions at `:12` and `:20`), all sit on their own lines outside `|` delimiters, and no
   verdict differs from the before-image.

One residual, non-defect note: the header's phrase "Erroneous original wording is kept visible
(quoted inside the marker)" is literally true for `C-U3-002` (`:79`, `:150`), `C-U3-003` (`:87`) and
`C-U3-004` (`:94`); for `C-U3-001` the withdrawn clause is quoted both in the marker at `:127` and in
the body at `:106-107`. The claim holds for all four wording-replacement corrections.

---

## Per-correction confirmation

### C-U3-001 — LANDED

**Asked** (`V-U3.md:101`): the assertion "no research existed when this was written (2026-07-16)" is
false; the supportable statement is narrower — intra-day ordering unresolved, plus the in-unit `AL-R1`
forward card at U3 `:596`.

**On disk now** (`audit/U3-audit.md:105-116`): the bullet quotes the original false clause, states it
"is false as a claim about a source", cites the same-day approved baseline, then states verbatim
"**intra-day ordering is unresolved and cannot be inferred**", then gives the `AL-R1` forward-card
argument, then preserves the narrower P1-archive claim ("the P1 archive (2026-07-19/20) postdates this
unit and so cannot have calibrated it — that narrower claim stands").

**Neither reasserts nor overcorrects — confirmed.** I checked both directions myself:
- No reassertion: the string "no research existed" appears in the current file only inside the
  quotation of the withdrawn wording.
- No overcorrection into a new false claim: the bullet does **not** claim the research register
  preceded the unit, nor that the unit therefore *was* research-calibrated. It stops at "unresolved".
- The preserved P1-archive claim is independently accurate: I confirmed P1 archive dating myself in
  `docs/superpowers/research/foundation-audit-p1/` (`verification/V3b-…:3` "Date: 2026-07-19";
  `verification/W7-C1-ED2-final.md:4`, `W6-C6-EC-final.md:4`, `W8-C4-ED2-final.md:4` all
  "Date: 2026-07-20"; `INTEGRITY-MANIFEST-post.md:110` "2026-07-20"), and U3 `:3` verbatim
  "> Status: conversational design approved 2026-07-16; written-spec review pending."
- The surviving statement at `audit/U3-audit.md:66-70` ("The Phase 1 archive, collected 2026-07-19/20
  (three to four days *after* this document was authored on 2026-07-16)") is correct and correctly
  left untouched.

**Retrievals reproduced — YES.** `…product-activity-research.md:3` verbatim:
"> Status: approved 2026-07-16; all six bounded recommendations were accepted." Register rows
`DUO-001`…`TECH-001` (`:28-50`) each carry "2026-07-16" in the Retrieval-date column — I read the
whole block. `…architecture-design.md:596` verbatim: "2. `AL-R1` — research learning products and
initial activity mechanics;".

### C-U3-002 — LANDED

**Asked** (`V-U3.md:102`): ground (a) ("no forward gate in this document names thresholds or retention
intervals") overstates the asymmetry against `:470-472`; `Revise` survives on (b) and (c).

**On disk now**: the verdict-row basis cell `:78` and bullet ground (a) `:131-139` both quote the
original wording, quote `:470-472` in full, name "review", "spacing", "mastery learning" as covering
retention intervals and mastery thresholds "at the *same* level of generality at which 'pacing' was
credited", and state the separation "rests on grounds (b) and (c) below, **not** on ground (a) as
originally written." Exactly what was asked; the verdict is untouched at `Revise`.

**Retrieval reproduced — YES.** `…adaptive-ai-learning-architecture-design.md:470-472` verbatim:
"Cover session structure, scaffolding, hints, skill tests, review, mistakes, pacing, activity
variation, accessibility, retrieval practice, spacing, interleaving, worked examples, cognitive load,
feedback timing, mastery learning, and adaptive assessment." Curriculum gate `:495-498` also reopened
and matches the record's quotation.

### C-U3-003 — LANDED

**Asked** (`V-U3.md:103`): the absence-claim "found none that applies" is false; ALR-028 at
`…product-activity-research.md:289-291` is a one-to-one antecedent; `Preserve` unaffected.

**On disk now** (`:87`): "**Basis corrected (C-U3-003).** The record originally stated 'Checked
positively for an available research basis and found none that applies.' That absence-claim is
false…" followed by the ALR-028 quotation and the note that the audit had cited SCI-008's limitation
but missed the derived rule. `Preserve` retained.

**Retrieval reproduced — YES.** Source `:289-291` verbatim:
"- **ALR-028 — End a session when its evidence target is satisfied, either bound is reached, or the
learner stops.**" / "  - Applies to: session controller stopping rules." / "  - Evidence:
**INFERENCE:** adaptive stopping tradeoffs in `SCI-008`; **PROJECT CONSTRAINT:** approved session end
conditions." The audit joins the rule line and the evidence line with "/" and does not mark the
elided "Applies to" line; this matches the record's quoting convention throughout and alters no
meaning. SCI-008 limitation at `:46` also reopened and verbatim.

### C-U3-004 — LANDED

**Asked** (`V-U3.md:104`): the `COVERAGE GAP` label was asserted over an unenumerated portion of a
held source; ALR-033 at `:319-321` is a one-to-one antecedent; `Preserve` unaffected.

**On disk now** (`:94`): quotes the original wording, names the failure mode ("the absence-as-proof
failure mode"), substitutes ALR-033 verbatim, and **retains the honest residue** — ALR-033's own
limitation at `:323`. `Preserve` retained.

**Retrieval reproduced — YES.** Source `:319-321` verbatim: "- **ALR-033 — Gate only essential
prerequisites while showing simple learner states backed by richer internal evidence.**" / "  -
Evidence: **PUBLISHED/INFERENCE:** `BRI-001`, `SCI-006`; **PROJECT CONSTRAINT:** approved progression
and state vocabulary." Limitation `:323` verbatim: "  - Limitation: mastery research does not identify
which blackjack prerequisites are essential; curriculum design owns that decision."

### C-U3-005 — LANDED

**Asked** (`V-U3.md:105`): add the strongest in-hand bases — ALR-027 `:287` for K-U3-001; ALR-032
`:317` (and DUO-006 `:33`) for K-U3-002.

**On disk now**: K-U3-001 verdict row `:74` and bullet `:117-119` both carry ALR-027 `:287` verbatim;
K-U3-002 verdict row `:78` carries ALR-032 `:317` and DUO-006 `:33` verbatim. The bullet marker at
`:151` states the K-U3-002 bases were added "in the verdict row" — I verified they are in fact there,
so the marker is accurate rather than a placeholder. Both verdicts remain `Revise`.

**Retrievals reproduced — YES (both headline sentences named in my dispatch).**
- `…product-activity-research.md:287` verbatim: "  - Limitation: numeric values require calibration
  and may vary by accessibility/interaction mode; the research does not establish universal minutes."
- `…product-activity-research.md:317` verbatim: "  - Limitation: counts, diversity rules, recency, and
  retention intervals remain provisional until observed blackjack data supports them."
- `…product-activity-research.md:33` (DUO-006 limitation cell) verbatim: "Language-item recall and
  engagement do not establish blackjack mastery thresholds or a general learner model."

---

## Other required checks

**Verdict-row survival — 13, counted by me.** Rows matching
`^\| *K-U3-[0-9]{3} *\| *(Preserve|Relabel|Revise|Replace|Remove) *\|` in `audit/U3-audit.md` = **13**
(K-U3-001…K-U3-013). Verdict values are identical to the before-image row-for-row: Revise, Revise,
Preserve, Preserve, Preserve, Preserve, Relabel, Preserve, Preserve, Preserve, Preserve, Preserve,
Preserve. **`K-U3-001` and `K-U3-002` remain `Revise`, not `Relabel`.** No marker sits inside a table
row or between `|` delimiters — all ten markers occupy their own lines (`:75`, `:76`, `:79`, `:80`,
`:88`, `:95`, `:127`, `:128`, `:150`, `:151`).

**No threshold values proposed — confirmed.** I read both `audit/U3-audit.md` and `landing/L-U3.md`
looking specifically for a proposed number. None appears. The only numerals in the corrected regions
are line anchors, dates, and quoted evidence about other products/sources (Khan's 70%/100% at `:69`,
Cepeda/Donovan effect sizes at `:90`) — all pre-existing descriptions of held evidence, none offered
as a value for this product. The audit's own exclusion at `:100-101` ("**without proposing any
replacement value** (out of scope, two phases away)") survives the landing. `L-U3.md:42-43` asserts
the same and the assertion checks out.

**Retrievals reproduced by me, first-hand** (all in-repo; no WebSearch, no WebFetch):
`…adaptive-learning-product-activity-research.md:275-334` (the whole ALR-026–ALR-035 block, covering
the mandated `:287` and `:317` sentences plus `:289-291`, `:319-321`, `:323`), the same file `:1-50`
(status line `:3`, register incl. DUO-006 `:33`, SCI-002 `:40`, SCI-005 `:43`, SCI-008 `:46`),
`…adaptive-ai-learning-architecture-design.md:1-8` (`:3`), `:461-505` (`:470-472`, `:487-491`,
`:495-498`), `:590-604` (`:596`), and the P1 archive dating hits under
`docs/superpowers/research/foundation-audit-p1/`. Every quotation checked is verbatim. **No material
correction in this unit lacks a reproduced retrieval.**

## How the contaminated before-image limited me

`.pre-landing-copy/U3-audit.md` was taken *after* the killed editor wrote the false 2026-07-21 header,
so it is not a true pre-landing image, and the genuine original is unrecoverable (the run directory is
gitignored). Concretely:
- **Not limiting** for the five corrections themselves: the before-image still carries every
  *uncorrected* original sentence (`:63`, `:64`, `:70`, `:75`, `:83-84`, `:92-93`), so the
  before/after diff for `C-U3-001`…`C-U3-005` is real evidence and I relied on it.
- **Limiting** for one thing only: I cannot prove from the before-image what the header said *before*
  the killed editor overwrote it. I therefore judged the header's current handling on its own terms —
  is the claim now presented as false, is the history retained, is the new claim accurate — and all
  three hold. I did **not** treat any difference from the before-image as `ALTERED` anywhere.
- I also cannot independently rule out some other silent change made to the body by the killed editor.
  Mitigation: all 13 verdict rows, all claim anchors, and all quoted source text in the current file
  were checked against the primary sources directly, so an undetected pre-image edit would have had to
  be simultaneously invisible and source-faithful. Confidence: high, not absolute.

## Noticed, not raised (returned for orchestrator routing, not written as corrections)

- `audit/U3-audit.md:87` renders ALR-028's lines as two "/"-joined fragments, silently dropping the
  "Applies to:" line. Non-meaning-altering; consistent with the record's own convention. Cosmetic.
- The mechanical/cosmetic items `V-U3.md:229-249` listed (off-by-one anchor at record `:55`→U3 `:229`;
  the `:425` vs `:424-425` span; the citation-state table's cell 2 holding claim IDs where the gate
  reads a verdict word) were explicitly non-gated by the verifier and are **not** landed. Consistent
  with what was asked — they were never raised as corrections — but the third means the post-landing
  citation-state table at `:158-168` still holds claim IDs in the verdict-word column.
- `audit/U3-audit.md:170-176` adds a sub-block naming six anchors made load-bearing by the landing and
  explicitly declining to assign them citation states ("state assignment is the verifier's, not the
  editor's"). Additive beyond the literal text of the five corrections, but scope-correct and
  self-limiting; recorded as observed, not as an alteration.
