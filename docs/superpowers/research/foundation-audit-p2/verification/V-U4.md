# Verification — Unit U4

> Independent verifier record for `audit/U4-audit.md` (18 assessed claims) against the audited unit
> `docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md` and the Phase 1
> evidence archive `docs/superpowers/research/foundation-audit-p1/`.
> Run: foundation-audit-p2. Written 2026-07-21. Verifier did not write the audit record and holds no
> edit capability over it.

SUFFICIENCY: INSUFFICIENT

Reason (one line): the record's coverage statement is false in two specific ways — its stated reason
for abstaining on ALR-007–ALR-012 does not hold for four of those six requirements, and roughly
fourteen `ALR-` requirements receive no statement at all in a section that exists to stop a later
role mistaking silence for oversight; both are closable from sources already in hand (**editorial**,
zero new collection).

## Mandatory calibration — Remove/Replace defect-real answers

The audit record carries **zero `Remove` and zero `Replace` verdicts**. Therefore **no `DEFECT-REAL`
answers are required from this verifier**, and none are recorded below. Recorded explicitly per
dispatch.

**Is zero the honest number here?** Yes. I re-opened nine of U4's cited sources plus the two repo
type modules and found no U4 claim that a source contradicts, and none that is baseless. Every
defect the examiner located, and every defect I located independently, is a labelling, quotation, or
coverage-precision defect — exactly what `Relabel`/`Revise` exist for. A `Remove` or `Replace` here
would have been manufactured.

**Over-calling check (are the examiner's four defects real?)** All four are real; none is
manufactured. Evidence, each from my own retrieval:

- **K-U4-016 (Revise, ALR-040 reduced motion) — REAL.** W3C WCAG 2.2 renders the heading
  "Success Criterion 2.3.3 Animation from Interactions (Level AAA)", against
  "1.4.10 Reflow (Level AA)", "1.4.12 Text Spacing (Level AA)", "2.2.1 Timing Adjustable (Level A)".
  U4 states no target conformance level anywhere, and ALR-040 tags the whole requirement
  `PUBLISHED/INFERENCE: STD-001`. The AAA element genuinely sits above the line the rest of the
  ALR-036–ALR-041 set sits on.
- **K-U4-005 (Relabel, ALR-005 immediate-feedback default) — REAL.** Brummer et al. (2024), p. 466,
  verbatim: *"With regard to feedback timing, both immediate and delayed feedback had significant
  and strong effects on improving learning performance, with delayed feedback being slightly more
  effective than immediate feedback. A combination of feedback timing approaches was ineffective.
  These findings indicate that clarity and consistency—as to whether participants receive immediate
  or delayed feedback—is more essential than the actual timing of the feedback."* ALR-005's
  Verification field (`:146`) asserts "acquisition mode provides immediate canonical correction"
  under a `PUBLISHED/INFERENCE: SCI-005` tag; the source's average direction runs the other way.
  The examiner's scoping is fair — it leaves the *configure-by-evidence-mode* half as sound
  `INFERENCE` and relabels only the immediate-default element.
- **K-U4-004 / K-U4-013 (Revise, `AttemptRecord` cited as evidence for its own gap) — REAL.** Code
  anchors resolve exactly as quoted. `web/src/learn/types.ts:40` is
  `export type Assistance = 'none' | 'retry' | 'instruction';`; `:45-49` is `AttemptRecord` carrying
  a single `response: string` and `correct: boolean | null` with no timing and no error-class field;
  `web/src/progress/types.ts:36-42` is `ErrorClass` and `:44-50` is the `AttemptDisposition`
  discriminated union whose own comment reads *"A discriminated union, not `correct: boolean | null`:
  it must express *abandoned* (ALR-022)"*. The seam named in ALR-004/ALR-022's evidence field is the
  gap, not the support; the "approved attempt envelope" half is genuinely sound.
- **K-U4-003 (Relabel, ALR-001 multiple-choice format validity) — REAL, but the weakest of the four.**
  DUO-001 re-opened: no discussion of exercise formats or assessment validity appears in its text.
  BRI-001 re-opened: pretesting, scaffold fading, interleaving — no format-validity claim. SCI-001
  re-opened (Karpicke & Roediger 2008, *Science* 319:966–968), abstract verbatim: *"students in one
  condition learned foreign language vocabulary words in the standard paradigm of repeated
  study-test trials"* — paired-associate production tests, no recognition-versus-recall format
  comparison. The `PUBLISHED` half of ALR-001's tag is therefore unearned. Caveat I record for
  honesty: U4 uses `PUBLISHED/INFERENCE` as a compound tag throughout, so a reader could take it to
  mean "inferred from published sources"; the examiner's Relabel is defensible under U4's own
  definition at `:20` but is a fine-grained call, not an egregious one. Upheld.

**Under-calling check (should any `Preserve` have been a `Relabel`?)** I tested the vendor-blog and
`INFERENCE`-tagged survivors specifically, and **name no additional claim for Relabel**:

- K-U4-001 (BRI-002), K-U4-006 (DUO-001/BRI-001), K-U4-012 (BRI-001) are vendor self-descriptions,
  but U4's own `PUBLISHED` definition at `:20` explicitly admits "an attributable official source",
  each row carries a Medium/Medium-low confidence hedge, and each declares the missing part as a
  `COVERAGE GAP`. Labelling is honest; no relabel warranted.
- K-U4-002 (`OBSERVED` from a Duolingo guide page) — I considered relabelling this, and rejected it:
  U4's `OBSERVED` definition at `:19` names "help page" explicitly, and I confirmed the source names
  every format U4 lists, including matching.
- Spot-check outside the examiner's rows, on a numeric claim it did not re-open: `…-research.md:82`
  says SCI-007 is a "Large meta-analysis across 344 samples". Howard et al. (2021) is 344 samples /
  223,209 participants. Figure correct; no missed defect there.

## Citation states (verifier-assigned)

Every state below is assigned from **my own retrieval**, not from the examiner's proposal. Nine of
nine proposed rows verify; one row is verifier-added (SCI-001, which K-U4-003's reasoning leans on
but which the proposed table omitted).

| BRI-002 | Preserve | U4 | VERIFIED |
| DUO-002 | Preserve | U4 | VERIFIED |
| DUO-001 | Relabel | U4 | VERIFIED |
| DUO-001 | Preserve | U4 | VERIFIED |
| SCI-005 | Relabel | U4 | VERIFIED |
| SCI-005 | Preserve | U4 | VERIFIED |
| SCI-001 | Relabel | U4 | VERIFIED |
| BRI-001 | Preserve | U4 | VERIFIED |
| SCI-006 | Preserve | U4 | VERIFIED |
| SCI-008 | Preserve | U4 | VERIFIED |
| STD-001 | Preserve | U4 | VERIFIED |
| STD-001 | Revise | U4 | VERIFIED |
| TECH-002 | Preserve | U4 | VERIFIED |

Retrieval evidence for each state:

- **BRI-002** — brilliant.org/faq: *"Brilliant recommends just 15 minutes per day for optimal
  learning progress"*; *"you can maintain your streak with quick 2-minute practice sessions"*. Both
  U4 figures exact. The unsourced *"6x more effective"* marketing line is on the page and U4 never
  repeats it.
- **DUO-002** — blog.duolingo.com/guide-to-duolingo-practice-hub: names *Mistakes*, *Words*,
  *Speak*, *Listen*, *Stories* (plus Radio/Adventures), and the Words screenshot caption reads
  *"A Duolingo exercise where the learner has to choose a French vocabulary word in the left column
  and match it to the corresponding English word in the right column."* U4's six-format list at
  `:60`, including "matching", is supported. **State assigned on my retrieval — the examiner's
  stated basis for this row was invalid (see C-U4-001).**
- **DUO-001** — *"We also build in features to help keep you on the right track, like optional hints
  and bite-sized explanations."* / *"Personalized lessons help you learn at your own pace and they
  adapt to your strengths and weaknesses as you progress."* / *"you start with simpler material in
  easier exercises…then lead you through more challenging examples."* No format-validity content
  (supports the Relabel at K-U4-003); hint/explanation content exact (supports K-U4-006).
- **SCI-005** — Brummer, de Boer, Mouw & Strijbos, *Learning Environments Research* 27:453–476
  (open-access version of record, University of Groningen repository). Abstract: *"A summary effect
  of .41 (SE=.05) was found for 116 interventions."* p. 457 exclusion criterion 1 verbatim:
  *"Studies involving special needs education (e.g. dyslexia, deaf/blindness, and/or attention
  deficits)."* p. 456: *"published between January 2004 and January 2019"*. p. 457/Fig. 1: *"46
  articles"*; p. 466: *"the 116 interventions from 46 articles"*. Timing passage quoted in full
  above. All three of U4's `:79` figures exact.
- **SCI-001** — Karpicke & Roediger, *Science* 319(5865):966–968, abstract read in full from the
  MIT-hosted reprint. Paired-associate Swahili–English vocabulary, university students, four
  study/test-dropout conditions; *"Repeated studying after learning had no effect on delayed recall,
  but repeated testing produced a large positive effect."* No recognition-format comparison.
- **BRI-001** — brilliant.org/about: *"In practice sets, the scaffolding falls away — you're being
  tested on your independent ability to answer the questions, so there are no more visual aids or
  hints."*; *"Koji is infinitely patient, asks instead of tells, builds confidence instead of
  dependency, and never, ever just hands you the answer."*; *"The leveling system intentionally
  displays a more reductive view of concept connections and prerequisites than the underlying
  reality. It is focused on providing learners with clear and satisfying milestones to work
  toward."* All examiner renderings verbatim.
- **SCI-006** — Kulik, Kulik & Bangert-Drowns (1990): *"108 controlled evaluations"*; *"mastery
  learning programs have positive effects on the examination performance"*; *"positive effects on
  student attitudes"*; *"The effects appear to be stronger on the weaker students in a class"*;
  *"may increase student time on instructional tasks"*; *"Self-paced mastery programs often reduce
  the completion rates in college classes."* Six of six exact.
- **SCI-008** — Babcock & Weiss (2013): *"Longer CATs yielded more accurate trait estimation, but
  there were diminishing returns with a very large number of items"*; standard-error termination
  *"was sensitive to the item bank information structure."* Exact.
- **STD-001** — W3C WCAG 2.2. Levels confirmed by direct retrieval: 2.5.7 Dragging Movements (AA),
  2.5.8 Target Size (Minimum) (AA), 2.1.1 Keyboard (A), 1.3.2 Meaningful Sequence (A), 1.4.10
  Reflow (AA), 1.4.12 Text Spacing (AA), 2.2.1 Timing Adjustable (A), **2.3.3 Animation from
  Interactions (AAA)**.
- **TECH-002** — blog.brilliant.org: six eval dimensions named as mathematical correctness, unique
  solvability, visual clarity, state consistency, impossible states, physical plausibility;
  *"the puzzles that fail the evals never even make it to the human review process"*; *"The
  collaboration between our AI tools and our human experts remains essential to maintaining our
  quality standards"*. Exact.

No citation in scope came back `UNVERIFIED` or `UNVERIFIABLE`; therefore no surviving verdict in
this unit rests on an unverifiable citation.

## Ruling on the ALR-007–ALR-012 abstention

**Partially legitimate; the stated rationale is wrong and must be corrected — but no collection is
required.**

The record (lines 103–107) abstains on all six requirements on the ground that "Their evidence leans
on `SCI-004` and `SCI-009`… not re-opened in this bounded pass". Checked against the unit itself,
that ground holds for **only two** of the six:

- ALR-007 (`:159`) — `DUO-002`, `BRI-001`, `SCI-004`, `SCI-009`: partly dependent; two of its four
  sources were re-opened in this pass.
- ALR-011 (`:183`) — `SCI-004`, `SCI-009`: genuinely dependent. Abstention legitimate.
- ALR-008 (`:165`) — `DUO-004`, `TECH-001`, `TECH-002`: **names neither SCI-004 nor SCI-009.**
- ALR-009 (`:171`) — `TECH-002` only: **TECH-002 was re-opened in this very pass** (K-U4-018).
- ALR-010 (`:177`) — `TECH-001`, `TECH-002`: TECH-002 re-opened.
- ALR-012 (`:189`) — `STD-001`, `STD-002`: **STD-001 was re-opened in this very pass**
  (K-U4-015/016/017).

The hole this leaves is load-bearing in exactly the family the run pressed hardest: ALR-012 is the
assemble-blocks accessibility requirement, sibling to ALR-006 and ALR-019, in the same set where the
examiner did find a real AA/AAA defect (K-U4-016). Having verified STD-001 myself I note ALR-012's
elements (2.5.7 AA, 2.5.8 AA, 2.4.3/2.1.1 A) all sit at or below AA — so it very likely carries no
AAA defect — but that is a judgement the audit role must make and record, not one I may substitute
for it.

**Remedy mode: `editorial`.** Four of the six can be assessed from sources already re-opened in this
pass; no collector is needed. If the two genuinely SCI-004/SCI-009-dependent requirements (ALR-007,
ALR-011) are to be assessed rather than abstained on, that would need 2 sources collected — but I do
**not** require it: their abstention is correct proportional restraint under the Q4 ruling, and
K-U4-007 already records the hint-ladder self-labelling honestly.

## Corrections raised

| ID | Correction | Remedy |
|----|----|----|
| C-U4-001 | Line 89–91 states: "(DUO-002's content was confirmed through the DUO-001/BRI-001 re-opening pass on the same publisher surfaces…)". DUO-002 is a separate Duolingo Blog article (`guide-to-duolingo-practice-hub`) and BRI-001 is a *different publisher* (Brilliant), so the citation table's `VERIFIED` state for DUO-002 was asserted without ever retrieving DUO-002 — the "unverified by construction" failure this program exists to prevent. The underlying source does verify on my own retrieval (page names Mistakes / Words / Speak / Listen / Stories, and the Words caption reads "A Duolingo exercise where the learner has to choose a French vocabulary word in the left column and match it to the corresponding English word in the right column"), so K-U4-002's `Preserve` stands; the false verification basis must be struck and replaced with the actual retrieval. | editorial |
| C-U4-002 | Line 54 (K-U4-008) presents as a verbatim re-opened quotation: `SCI-005, re-opened: "Both immediate and delayed feedback showed significant effects"`. The source (Brummer et al. 2024, p. 466) reads: "both immediate and delayed feedback had significant and strong effects on improving learning performance, with delayed feedback being slightly more effective than immediate feedback." The rendering is a paraphrase inside quotation marks — the Phase 1 defect class. Meaning is not reversed and K-U4-008's `Preserve` stands, but the quotation must be made verbatim. | editorial |
| C-U4-003 | Lines 103–107 give a factually wrong reason for the ALR-007–ALR-012 abstention: "Their evidence leans on `SCI-004` and `SCI-009`". ALR-008 (`…-research.md:165`) names `DUO-004`, `TECH-001`, `TECH-002` and neither SCI source; ALR-009 (`:171`) names `TECH-002` alone; ALR-010 (`:177`) names `TECH-001`, `TECH-002`; ALR-012 (`:189`) names `STD-001`, `STD-002`. TECH-002 and STD-001 were both re-opened in this same pass, so four of the six were assessable from sources already in hand and the "unverified citation" bar the record invokes does not apply to them. | editorial |
| C-U4-004 | The section heading at line 98 — "Examined and deliberately left alone (survivors not given a row)" — and line 100–101 ("Recorded so this pass's coverage is legible, and so a later role does not mistake silence for oversight") are contradicted by the section's own contents: ALR-002, ALR-003, ALR-006, ALR-020–ALR-025, ALR-034, ALR-035, ALR-038, ALR-039 and ALR-041 receive no row and no left-alone statement anywhere in the record. Roughly fourteen of the unit's 41 requirements are silently absent from a record that asserts its coverage is legible. Either the coverage claim must be narrowed to what was actually examined, or the omitted requirements must be accounted for; all of them cite sources already held. | editorial |

## Phase-boundary rule check (line references, not rewrites)

1. **States what the project should now do** — none found. The prescriptive-sounding passages at
   lines 50, 59 and 62 ("Honest wording: …") each prescribe a repair to the *audited record's
   evidence field*, which is the substance of a `Revise` verdict, not a product recommendation.
   Line 133 correctly defers: "Logged; resolution belongs to a later phase."
2. **Authors replacement content for a `Replace`** — moot and confirmed: zero `Replace` verdicts,
   and no replacement claim text is drafted anywhere in the record.
3. **Later-phase decision vocabulary `Confirm / Revise / Reconsider / Remove`** — not present. The
   words "Confirm" and "Reconsider" appear nowhere in the record (the only "confirmed" is the
   defective line 89, addressed at C-U4-001); "Revise"/"Remove" appear only as members of this
   phase's declared `Preserve / Relabel / Revise / Replace / Remove` legend at line 8.

## Non-material notes (mechanical / cosmetic — not gated)

- Record lines 24–27 claim the archive terms return "35 hits". My own case-insensitive grep of
  `hint|assist|feedback|accessib` across the six dossiers returns 31 *matching lines* across 3
  files. Counting method (occurrences vs lines) plausibly explains the difference; the qualitative
  conclusion is sound — I inspected the matches and they are dataset names ("Assistments"),
  paywall notes ("accessible"), and model-feedback prose, not hint-ladder, activity-type or
  accessibility evidence.
- Record lines 152–157 note that TECH-002's sixth eval dimension is "Physical plausibility", not
  "playability". Correct as to the dimension list, but the note slightly overstates: the article
  does use the word — "Our first LLM-generated mobile puzzles were structurally sound but had
  serious playability issues." U4's source-register scope cell at `:51` is still imprecise; still
  cosmetic, as the record concluded.
- My WCAG retrieval rendered "Success Criterion 4.1.2 Name, Role, Value" **without** a level string
  (all other criteria I checked rendered theirs). K-U4-017's assertion that it is Level A is
  therefore not independently confirmed by my retrieval, and I record that as an honest unknown
  rather than a defect — nothing in K-U4-017 turns on the level, since its other cited criterion
  (1.3.2, Level A) verified and the requirement claims nothing above AA.
- WCAG SC 2.2.2 Pause, Stop, Hide (Level A) covers auto-starting motion and sits adjacent to
  ALR-040's motion element. It does not weaken K-U4-016: 2.2.2 is about a mechanism to pause moving
  content, not about honouring a user's reduced-motion *preference*, which remains 2.3.3 (AAA).
- Borderline item I judged **non-material** and deliberately did not number: `…-research.md:82`
  says "externally controlled motivation is not associated with performance/persistence and relates
  to lower well-being". Howard et al. (2021) separate *external regulation* (no meaningful relation
  to performance or persistence) from *introjected/ego-involved* regulation (positively related to
  persistence, negatively to well-being) — both are "controlled" motivations in SDT. U4's wording
  maps cleanly onto external regulation, its `:67` row already says "weaker or adverse
  associations", and the design direction it feeds (ALR-027–ALR-029, no loss-framed pressure) is
  unchanged under either reading. Recorded here so the judgement is visible rather than silent.
- The record's Format note (lines 36–43) explaining that U4 carries Layer-1 provenance labels only
  is accurate: `…-research.md:19-22` declares exactly `OBSERVED` / `PUBLISHED` / `INFERENCE` /
  `COVERAGE GAP` and no Layer-2 bucket column exists in the document.
