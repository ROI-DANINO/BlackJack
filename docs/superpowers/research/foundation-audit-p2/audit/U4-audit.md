# Audit — Unit U4

> Unit under audit: `docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md`
> (474 lines, 24 cited sources, 41 `ALR-` requirements). Examiner role only — verdicts are **not**
> self-verified; a separate agent re-checks every row.
> Run: foundation-audit-p2. Written 2026-07-21.

Verdict legend: Preserve / Relabel / Revise / Replace / Remove

## What was read before any retrieval (G7)

Phase 1 dossiers consulted, from the approved archive `docs/superpowers/research/foundation-audit-p1/`:

- `dossiers/C2-its-actr-procedural.md` — read in full (408 lines). Evidence input for ITS
  effectiveness, ACT-R procedural acquisition, spacing/interleaving (F9–F11), and its own
  coverage-gap statements.
- `dossiers/C3-deliberate-practice.md` — read at F1 (lines 56–85) and the INFERENCE synthesis block
  (lines 436–464). Evidence input for feedback immediacy as a definitional/mechanism claim.
- `dossiers/C1-knowledge-tracing.md`, `dossiers/C4-chesscom-khan.md`,
  `dossiers/C5-anki-spaced-repetition.md`, `dossiers/C6-blackjack-teachable.md` — searched by term
  (`hint|assist|feedback|accessib|activity type|worked example`) to establish what the archive holds
  on U4's priority families before auditing them.

**Result of that read, stated plainly because it bounds every verdict below.** The Phase 1 archive is
a *mechanics* foundation. Across all six dossiers the terms `hint`, `assist*`, `feedback`, and
`accessib*` return 35 hits, and on inspection **none** is evidence about hint ladders, assisted-vs-
independent evidence quality, activity-type selection, or accessibility. The only substantive
feedback material is `C3-deliberate-practice.md:56` — *"requiring immediate feedback and repeated
corrective attempts"* — which is Ericsson et al.'s **definitional** requirement (the dossier's own
proposed tier at `C3-deliberate-practice.md:60-61`: *"Q4 (the theoretical-framework/definitional
portion of the paper — a normative synthesis, not itself an experiment)"*), **not** a timing
experiment. Phase 1 therefore cannot corroborate or refute U4's feedback-timing, hint-ladder,
activity-type, or accessibility claims. Those rest on U4's own sources, which is why the
re-verification below is weighted onto them.

## Format note (bears on how "Relabel" is applied here)

U4 declares **Layer-1 provenance labels only** — `OBSERVED` / `PUBLISHED` / `INFERENCE` /
`COVERAGE GAP` at `…-research.md:19-22` — plus an ad-hoc `PROJECT CONSTRAINT` tag used inside
`ALR-` Evidence fields. It carries **no Layer-2 status bucket** (`Evidence-backed` / `Product
judgement` / `Assumption` / `Unsupported`); that scheme post-dates it. A `Relabel` below therefore
means *the Layer-1 tag on this claim's evidence field is wrong*, and names the Layer-2 bucket the
claim belongs in.

| Claim ID | Verdict | Claim | Citation |
|----|----|----|----|
| K-U4-001 | Preserve | "**PUBLISHED:** Brilliant recommends 15 minutes and offers a 2-minute practice option (`BRI-002`); voluntary mid-set stopping behavior is a **COVERAGE GAP**." … "Medium-low; durations are product recommendations, not comparative causal thresholds." (`docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md:58`) | BRI-002, re-opened 2026-07-21: "Brilliant recommends just 15 minutes per day for optimal learning progress" and "quick 2-minute practice sessions". Both figures exact; the confidence hedge is the honest one. |
| K-U4-002 | Preserve | "**OBSERVED:** official guides show distinct speaking, listening, matching, mistake-review, story, and word-practice formats (`DUO-002`)." (`…-research.md:60`) | Label is consistent with U4's own stated definition at `…-research.md:19`: "**OBSERVED:** directly visible in a publicly accessible product flow, **help page**, demonstration, or screenshot reviewed during this run." A guide page is inside that definition, and the row's own limitation ("inventories are snapshots and neither source exposes selection weights") does not overreach. <br><br> **Basis corrected (C-U4-001).** DUO-002 was retrieved directly on 2026-07-21 (`blog.duolingo.com/guide-to-duolingo-practice-hub`); the page names *Mistakes* ("Review previous mistakes, so they won't trip you up next time."), *Words* ("Study recommended words to bolster your vocabulary."), *Speak* ("Get comfortable speaking the language."), *Listen* ("Hone your ear so you can follow along when people speak the language."), plus Stories, Radio and Adventures, and the Words image caption reads "A Duolingo exercise where the learner has to choose a French vocabulary word in the left column and match it to the corresponding English word in the right column." U4's six-format list at `:60`, including "matching", is supported by first-hand retrieval — see the corrected note under the citation table. |
<!-- LANDED C-U4-001 (V-U4, editorial): DUO-002 retrieved first-hand by the prior landing pass; false "confirmed via DUO-001/BRI-001" basis struck below the citation table; verdict unchanged (Preserve). Marker relocated out of the verdict cell by this pass. -->
| K-U4-003 | Relabel | "Evidence: **PUBLISHED/INFERENCE:** `DUO-001`, `BRI-001`, `SCI-001`; current `QuestionStep` and outcome-ID project contracts." (ALR-001, `…-research.md:121`) | None of the three named sources speaks to multiple-choice *format validity*. DUO-001 (re-opened) describes hints, tips and difficulty ramp; BRI-001 (re-opened) describes pretesting, fading and interleaving; SCI-001 is repeated-retrieval-vs-restudy for paired vocabulary and does not compare recognition against recall formats. Phase 1 holds nothing on activity types either (see "What was read", above). The claim is defensible and the Limitation at `:123` is honest, but the `PUBLISHED` half is unearned: this belongs in **Product judgement** (an assessment-validity commitment), not `PUBLISHED/INFERENCE`. Relabel, not Remove — nothing contradicts it. |
| K-U4-004 | Revise | "Evidence: **INFERENCE:** `SCI-001`, `SCI-004`, `SCI-009`; existing assistance and attempt-record project contracts." (ALR-004, `…-research.md:139`), supporting "Preserve the first response and record each retry and hint level as assistance rather than replacing the original attempt." (`…-research.md:137`) | The "existing … attempt-record project contracts" clause overstates. The named seam is `web/src/learn/types.ts:45-49`: `AttemptRecord = { … prompt: string; response: string; correct: boolean \| null; assistance: Assistance; … }` — **one** `response` field, so a first response is not preserved separately from a final one; and `assistance` is the scalar `Assistance = 'none' \| 'retry' \| 'instruction'` (`web/src/learn/types.ts:40`), which carries no hint level and no direct-answer marker. The existing contract is the **gap this requirement addresses**, not evidence for it. Honest wording: cite the SCI inferences and the *approved* umbrella contract, and drop "existing … attempt-record project contracts" from the evidence basis. |
| K-U4-005 | Relabel | "Evidence: **PUBLISHED/INFERENCE:** `SCI-005`; **PROJECT CONSTRAINT:** decision/outcome separation and current canonical feedback contracts." (ALR-005, `…-research.md:145`), whose Verification reads "acquisition mode provides immediate canonical correction" (`…-research.md:146`) | SCI-005 re-opened 2026-07-21: it reports **delayed** feedback as slightly *more* effective than immediate, and that "clarity and consistency—as to whether participants receive immediate or delayed feedback—is more essential than the actual timing." The *configure-by-evidence-mode* half is a fair `INFERENCE` from that. The *default-to-immediate-during-acquisition* half runs against the source's average direction and is not derived from it — it is a falsifiable design bet (it would change if playtesting contradicted it), i.e. **Assumption**, not `PUBLISHED/INFERENCE`. The Limitation at `:147` ("no cited evidence supports one timing policy for every learner, skill, or activity") already hedges but does not correct the label. |
| K-U4-006 | Preserve | "**PUBLISHED:** Duolingo names optional hints and bite-sized explanations (`DUO-001`), but an ordered ladder is a **COVERAGE GAP**." … "Medium-low; neither source publishes escalation rules or hint-cost experiments." (`…-research.md:62`) | DUO-001, re-opened: "We also build in features to help keep you on the right track, like optional hints and bite-sized explanations" — exact. BRI-001, re-opened: "In practice sets, the scaffolding falls away … there are no more visual aids or hints" and "Koji is infinitely patient, asks instead of tells" / "never, ever just hands you the answer" — both U4 renderings at `:62` are faithful. The `COVERAGE GAP` on the ordered ladder is correctly declared, and the Medium-low confidence is the right weight. A survivor in the family this audit was told to press hardest. |
| K-U4-007 | Preserve | "**Hint ladder:** worked examples and fading support graded assistance (`SCI-004`, `SCI-009`), but the existing four-level ladder remains a project design rather than a research-derived sequence." (`…-research.md:89-90`) | Self-labelling is already exactly what a Relabel would otherwise impose: the ladder is named as project design, not research-derived. Nothing in the Phase 1 archive contradicts it (the archive holds no hint-ladder evidence at all). Preserve as written. |
| K-U4-008 | Preserve | "Both immediate and delayed digital feedback can help; context and consistency matter more than one universal winner (`SCI-005`)." (`…-research.md:63`) | SCI-005, re-opened: **"With regard to feedback timing, both immediate and delayed feedback had significant and strong effects on improving learning performance, with delayed feedback being slightly more effective than immediate feedback."** and "clarity and consistency—as to whether participants receive immediate or delayed feedback—is more essential than the actual timing of the feedback." The U4 sentence is an accurate, non-inflating rendering of the source's own conclusion. <br><br> **Self-correction (C-U4-002).** As first written, this cell rendered the first quotation as `"Both immediate and delayed feedback showed significant effects"` — a **paraphrase presented inside quotation marks**, which the source does not contain in those words. The superseded rendering is preserved here rather than back-filled, per the R24/R26 in-record self-correction pattern. The verbatim text above was re-transcribed from the publisher version of record (Springer HTML, open access, `10.1007/s10984-024-09501-4`) on 2026-07-21. Meaning is unchanged and the `Preserve` verdict stands. |
<!-- LANDED C-U4-002 (V-U4, editorial): paraphrase-in-quotation-marks replaced with the verbatim p.466 sentence by the prior landing pass; superseded rendering kept visible in-cell; verdict unchanged (Preserve). Marker relocated out of the verdict cell by this pass. -->
| K-U4-009 | Preserve | "Meta-analysis of 116 interventions from 46 articles; studies ended in 2019, were heterogeneous, and excluded special-needs education." (`…-research.md:79`) | SCI-005, re-opened: "116 interventions" from "46 articles"; "published between January 2004 and January 2019"; excluded "studies involving special needs education (e.g. dyslexia, deaf/blindness, and/or attention deficits)." Three of three figures exact. This meets the R24/R26 exactness bar in the Calibration section. |
| K-U4-010 | Preserve | "**PUBLISHED:** mastery-learning programs showed positive average achievement and attitude effects, especially for weaker learners, alongside extra time and lower completion in some self-paced college programs." … "Meta-analysis of 108 controlled evaluations" (`…-research.md:80`) | SCI-006, re-opened: "108 controlled evaluations"; "positive effects on the examination performance"; "positive effects on student attitudes"; "The effects appear to be stronger on the weaker students in a class"; "may increase student time on instructional tasks"; "Self-paced mastery programs often reduce the completion rates in college classes." Every clause of the U4 sentence maps to a clause of the abstract, including the "some self-paced college programs" scope limit. |
| K-U4-011 | Preserve | "**PUBLISHED:** adaptive-test precision and length depend on calibrated item information, ability estimation, and termination criteria; longer tests can improve accuracy with diminishing returns." … "**INFERENCE:** the first skip test should use deterministic, coverage-complete unassisted evidence rules rather than claim psychometric adaptivity" (`…-research.md:81`) | SCI-008, re-opened: "longer CATs yielded more accurate trait estimation, but there were diminishing returns with a very large number of items"; "Standard error termination … was sensitive to the item bank information structure." The published half is exact; the product half is correctly tagged `INFERENCE` and correctly declines the psychometric claim (echoed at ALR-028 `:291` and ALR-034 `:327-329`). A verified source used at its actual strength. |
| K-U4-012 | Preserve | "**INFERENCE:** show a small stable state vocabulary while retaining richer versioned evidence internally; do not let a single completion or mistake directly set mastery." (`…-research.md:65`) | BRI-001, re-opened: "The leveling system intentionally displays a more reductive view of concept connections and prerequisites than the underlying reality. It is focused on providing learners with clear and satisfying milestones." That supports the first clause directly. The second clause ("do not let a single completion or mistake directly set mastery") is project policy — but the row is tagged `INFERENCE` and its confidence cell reads "Medium; both production reducers are proprietary", so it is not presented as evidence-backed. Correctly labelled; Preserve. |
| K-U4-013 | Revise | "Evidence: **INFERENCE:** retrieval evidence `SCI-001`; **PROJECT CONSTRAINT:** approved attempt envelope and current `AttemptRecord` seam." (ALR-022, `…-research.md:253`), supporting "Record the first response, final response, correctness or ungraded status, assistance level, timing, and error classification…" (`…-research.md:251`) | Same overstatement as K-U4-004, on a second requirement. `AttemptRecord` (`web/src/learn/types.ts:45-49`) has a single `response`, `correct: boolean \| null` (no `ungraded`/`abandoned` state), no timing field and no error-classification field. Four of the six recorded items the requirement names are absent from the seam it cites. The "approved attempt envelope" half of the clause is sound — `web/src/progress/types.ts:44-50` explicitly implements the discriminated `AttemptDisposition` "to express *abandoned* (ALR-022)" and `:36-42` implements `ErrorClass` — so the correction is narrow: strike "and current `AttemptRecord` seam" from the evidence basis, keep "approved attempt envelope". |
| K-U4-014 | Preserve | "**COVERAGE GAP:** no product-specific conformance or reviewed activity audit was found." (both the Duolingo and Brilliant columns, `…-research.md:68`); "High for the standards baseline; product-specific usability still requires representative testing." | An honestly declared absence, re-stated in full at `…-research.md:397-402` with sources-searched, why-insufficient, affects-list and a "Blocks mechanics proof: **No**" ruling. Neither Phase 1 nor this pass found any product accessibility audit to contradict it. "We looked hard and it isn't there" recorded as a result, correctly. |
| K-U4-015 | Preserve | "**ALR-037 — Make all functionality keyboard-operable and provide a single-pointer alternative to dragging with adequate target size or spacing.**" with "Evidence: **PUBLISHED/INFERENCE:** `STD-001`." and "target-size checks meet WCAG 2.2 or a documented exception" (`…-research.md:346-349`) | STD-001, re-opened: SC **2.5.7 Dragging Movements — Level AA**; SC **2.5.8 Target Size (Minimum) — Level AA**; keyboard operation at SC 2.1.1 Level A. Every element of this requirement sits at or below the AA conformance line, so the `PUBLISHED` tag is earned and the "or a documented exception" phrasing correctly mirrors WCAG's own exception structure. |
| K-U4-016 | Revise | "**ALR-040 — Avoid essential animation or time pressure and preserve operation under zoom, reflow, text spacing, and reduced-motion preferences.**" with "Evidence: **PUBLISHED/INFERENCE:** `STD-001`" (`…-research.md:363-365`) | Overstatement is specific and single: **reduced motion**. STD-001, re-opened — Reflow is SC 1.4.10 (**AA**), Text Spacing SC 1.4.12 (**AA**), Timing Adjustable SC 2.2.1 (**A**), but the only WCAG 2.2 criterion covering a reduced-motion preference is **SC 2.3.3 Animation from Interactions, Level AAA**. U4 states no target conformance level anywhere, so a reader building the ALR-036–ALR-041 set as one normative baseline will treat an AAA criterion as AA-mandatory. Honest wording: keep the requirement, and mark the reduced-motion element as resting on a Level AAA criterion (i.e. above the AA baseline the rest of the set sits on) rather than on the same footing as reflow and text spacing. |
| K-U4-017 | Preserve | "**ALR-036 — Expose every activity control, card, block, state, and feedback message with programmatic name, role, value, and meaningful order.**" with "Evidence: **PUBLISHED/INFERENCE:** `STD-001`, `STD-002`." (`…-research.md:339-341`) | STD-001, re-opened: SC **4.1.2 "Name, Role, Value" — Level A**; the "meaningful order" element maps to SC 1.3.2 Meaningful Sequence (Level A). The requirement's wording tracks the criterion's own name almost verbatim and claims nothing beyond it; the Limitation at `:343` ("automated semantic checks require manual assistive-technology and comprehension playtests") does not overclaim. |
| K-U4-018 | Preserve | "AI-created activity kinds, executable UI, answers, or grading \| Reject for the first mechanics proof \| `TECH-001`, `TECH-002`, `ALR-002`, `ALR-023` \| Public evidence emphasizes constrained representations and correctness review; the umbrella keeps truth deterministic." (`…-research.md:386`) | TECH-002, re-opened: the article names six eval dimensions (mathematical correctness, unique solvability, visual clarity, state consistency, impossible states, physical plausibility) and states "the puzzles that fail the evals never even make it to the human review process" and "The collaboration between our AI tools and our human experts remains essential." U4's reading — constrained representations plus correctness review — is accurate, and the *rejection itself* is correctly attributed to the project ("the umbrella keeps truth deterministic") rather than to the source. The source/judgement seam is drawn in the right place. |

**Counts:** 18 claims assessed — Preserve 13, Relabel 2, Revise 3, Replace 0, Remove 0.

Zero `Remove` and zero `Replace` is the honest outcome of this pass: nothing in U4 was found to be
contradicted or baseless. Every defect located was a labelling or precision defect, which is what
`Relabel` and `Revise` exist for.

## Citations re-verified (bounded per the Q4 ruling — 8, inside the 6–9 expectation)

Re-verified only where the downstream use is heaviest or where the claim leaning on the citation
bears on decision families 3, 4 or 8. The other 16 baseline sources were **not** re-opened.

| Citation | Verdict it supports | Unit | State |
|---|---|---|---|
| BRI-002 | K-U4-001 | U4 | VERIFIED |
| DUO-002 | K-U4-002 | U4 | VERIFIED |
| DUO-001 | K-U4-003, K-U4-006 | U4 | VERIFIED |
| SCI-005 | K-U4-005, K-U4-008, K-U4-009 | U4 | VERIFIED |
| BRI-001 | K-U4-006, K-U4-012 | U4 | VERIFIED |
| SCI-006 | K-U4-010 | U4 | VERIFIED |
| SCI-008 | K-U4-011 | U4 | VERIFIED |
| STD-001 | K-U4-015, K-U4-016, K-U4-017 | U4 | VERIFIED |
| TECH-002 | K-U4-018 | U4 | VERIFIED |

<!-- LANDED C-U4-001 (V-U4, editorial): struck the false "confirmed via the DUO-001/BRI-001 re-opening pass" basis for DUO-002 and replaced it with a first-hand retrieval of DUO-002; K-U4-002 stays Preserve. -->
**Correction landed — C-U4-001 (verification record `V-U4.md`; remedy mode `editorial`).**

*What this passage said as first written, preserved rather than back-filled:* "(DUO-002's content was
confirmed through the DUO-001/BRI-001 re-opening pass on the same publisher surfaces; K-U4-002's
verdict rests on U4's own internal label definition at `…-research.md:19`, not on a strength claim
about the source, so its evidentiary load is definitional rather than factual.)"

*What is wrong with it.* That basis is false and could not have been true. DUO-002 is a **separate
Duolingo Blog article** (`blog.duolingo.com/guide-to-duolingo-practice-hub`, `…-research.md:29`),
not the same page as DUO-001 (`duolingo-teaching-method`), and **BRI-001 is a different publisher
entirely** (Brilliant, `brilliant.org/about`, `…-research.md:34`). Re-opening DUO-001 and BRI-001
therefore confirmed nothing whatever about DUO-002. The `VERIFIED` state in the table above was
asserted **without the source ever having been retrieved** — "unverified by construction", the exact
failure mode this program exists to prevent, and it is recorded here rather than quietly repaired.

*What it should say, on retrieval actually performed.* DUO-002 was retrieved first-hand at this
landing pass on **2026-07-21** from `https://blog.duolingo.com/guide-to-duolingo-practice-hub/`. The
page names *Mistakes*, *Words*, *Speak*, *Listen*, *Stories*, *Radio* and *Adventures* (plus Video
Call and Roleplay for Max subscribers), with per-activity descriptions — *Mistakes*: "Review
previous mistakes, so they won't trip you up next time."; *Words*: "Study recommended words to
bolster your vocabulary."; *Speak*: "Get comfortable speaking the language."; *Listen*: "Hone your
ear so you can follow along when people speak the language." The Words image caption reads: "A
Duolingo exercise where the learner has to choose a French vocabulary word in the left column and
match it to the corresponding English word in the right column." DUO-002's `VERIFIED` state above
now rests on that retrieval. The independent verifier reached the same page and the same caption
separately (`V-U4.md`, DUO-002 retrieval-evidence bullet). K-U4-002's `Preserve` **stands
unchanged**; only its stated verification basis was defective, and the row's own reliance on U4's
internal `OBSERVED` definition at `…-research.md:19` remains accurate.

No citation in this pass came back `UNVERIFIED` or `UNVERIFIABLE`. No `Preserve` or `Revise` above
rests on a source that was not re-opened, except where the verdict rests on U4's own internal
definitions or on repo source files read directly (`web/src/learn/types.ts`,
`web/src/progress/types.ts`).

## Examined and deliberately left alone (survivors not given a row)

Recorded so the requirements listed **in this section** are legible, and so a later role does not
mistake silence about *them* for oversight. **This section does not account for all 41 `ALR-`
requirements** — see the correction immediately below for what it omits:

**Correction landed — C-U4-004 (verification record `V-U4.md`; remedy mode `editorial`).**

*What this section's heading and opening said as first written, preserved rather than back-filled:*
heading "Examined and deliberately left alone (survivors not given a row)"; opening "Recorded so
this pass's coverage is legible, and so a later role does not mistake silence for oversight:".

*What is wrong with it.* Read literally, the opening claims the pass's coverage is legible, i.e.
that every requirement is either given a verdict row above or a left-alone statement here. It is
not. Enumerated directly against the audited unit at this landing pass — its `ALR-` headings run
`ALR-001` (`…-research.md:119`) through `ALR-041` (`:369`), 41 in total — the requirements carrying
**neither** a verdict row **nor** any left-alone statement anywhere in this record are:
**ALR-002, ALR-003, ALR-006, ALR-020, ALR-021, ALR-023, ALR-024, ALR-025, ALR-034, ALR-035,
ALR-038, ALR-039, ALR-041** — **13 of 41**. Three of those appear in passing but are not assessed:
`ALR-002` and `ALR-023` occur only inside the quoted claim text of K-U4-018, `ALR-024` only inside a
non-material note, and `ALR-034` only as a supporting cross-reference in K-U4-011. A mention is not
an assessment, and none of the four is given a verdict or an abstention.

*Divergence from the verification record, recorded rather than copied.* `V-U4.md`'s C-U4-004 lists
**fourteen** requirements, including `ALR-022`. `ALR-022` **does** have a verdict row —
`K-U4-013`, which cites it at `…-research.md:253`. The verifier's count is one too high on that
point; the corrected figure is 13, established by re-enumerating the unit's own `ALR-` headings at
this pass rather than by transcribing the verifier's list. Everything else in C-U4-004 holds.

*What the heading and opening should say.* The section is a record of the requirements **it names**,
not a coverage statement over the unit. Its scope is: the assemble-blocks set (ALR-007–ALR-012, with
the C-U4-003 correction above), the engine-backed-hand set (ALR-013–ALR-019), the
session-construction set (ALR-026–ALR-031), ALR-032/ALR-033, and the COVERAGE GAP / CONFLICT
sections. The 13 requirements listed above were **not examined** in this bounded pass and are
neither survivors nor abstentions — they are simply outside what this pass covered, and a later role
must not read this section as clearing them.
<!-- LANDED C-U4-004 (V-U4, editorial): over-broad coverage claim narrowed to the requirements this section actually names; the 13 unexamined ALR- requirements enumerated from the unit's own ALR-001–ALR-041 headings; verifier's count of 14 corrected to 13 (ALR-022 has a row at K-U4-013); no verdict added or changed. -->

The requirements this section does account for:

- **ALR-007 through ALR-012** (assemble blocks). Left unassessed. **Correction landed — C-U4-003
  (verification record `V-U4.md`; remedy mode `editorial`).**

  *What this bullet said as first written, preserved rather than back-filled:* "Their evidence leans
  on `SCI-004` and `SCI-009` (worked examples, guidance fading, completion problems). Those two
  sources were **not** re-opened in this bounded pass, and the audit rule forbids a `Preserve`
  resting on an unverified citation — so rather than manufacture a verdict, these are left
  unassessed. Their downstream use has not visibly drifted from the standard cognitive-load-theory
  reading."

  *What is wrong with it.* The stated ground is factually false for four of the six requirements.
  Re-read directly from the audited unit at this landing pass (2026-07-21/22), the Evidence fields
  are: **ALR-008** (`…-research.md:165`) — "**INFERENCE:** public representation boundaries in
  `DUO-004`, `TECH-001`, `TECH-002`; **PROJECT CONSTRAINT:** serializable activity factories",
  naming **neither** SCI source; **ALR-009** (`:171`) — "**PUBLISHED/INFERENCE:** `TECH-002`;
  **PROJECT CONSTRAINT:** deterministic grading authority", `TECH-002` alone; **ALR-010** (`:177`) —
  "**PUBLISHED/INFERENCE:** human-owned objectives and correctness review in `TECH-001`,
  `TECH-002`; approved umbrella misconception boundary"; **ALR-012** (`:189`) —
  "**PUBLISHED/INFERENCE:** `STD-001`, `STD-002`; **PROJECT CONSTRAINT:** bounded activity duration
  and deterministic fallback". `TECH-002` and `STD-001` were both re-opened **in this same pass**
  (K-U4-018 and K-U4-015/016/017 respectively), so the "unverified citation" bar this bullet invokes
  does not apply to those four at all. The bullet also asserted that their downstream use "has not
  visibly drifted" — a substantive judgement offered while declining to assess them.

  *What it should say.* Only **ALR-007** (`:159` — "`DUO-002`, `BRI-001`, `SCI-004`, `SCI-009`",
  partly dependent; two of its four sources were re-opened) and **ALR-011** (`:183` — "**INFERENCE:**
  guidance fading in `SCI-004`, `SCI-009`; existing project assistance contract", genuinely
  dependent) rest on the un-re-opened SCI-004/SCI-009 pair, and for those two the abstention is
  proportional restraint under the Q4 ruling. For **ALR-008, ALR-009, ALR-010 and ALR-012** the
  abstention stands **unexplained**: they were assessable from sources already in hand and simply
  were not assessed. This is recorded as an open coverage gap in this pass, not as a justified
  abstention. No verdict is manufactured for them here — issuing one is the examiner role's, not the
  landing editor's. The "has not visibly drifted" clause is withdrawn as an unsupported judgement.
<!-- LANDED C-U4-003 (V-U4, editorial): false SCI-004/SCI-009 abstention rationale corrected against the audited unit's own Evidence fields at :159/:165/:171/:177/:183/:189; four of six reclassified from justified abstention to unexplained coverage gap; no verdict added or changed. -->
- **ALR-013 through ALR-019** (engine-backed hand). Almost entirely tagged `PROJECT CONSTRAINT`
  (mission, ordered-shoe rule, QA learning-integrity contract) rather than source-backed, which is
  the correct label for them; no evidence-bucket defect found.
- **ALR-026 through ALR-031** (session construction). Checked; each carries an `INFERENCE` tag and a
  Limitation that declines the numeric claim (e.g. `:287` "the research does not establish universal
  minutes"). No overstatement located.
- **ALR-032, ALR-033** (mastery reducer, prerequisite gating). Checked against re-verified SCI-006
  and BRI-001. Both carry mixed `PUBLISHED/INFERENCE` + `PROJECT CONSTRAINT` tags that already
  separate the literature-supported principle from the project's deterministic-reducer design, and
  ALR-033's Limitation (`:323`, "mastery research does not identify which blackjack prerequisites
  are essential") states the boundary explicitly. Left alone.
- **The five COVERAGE GAP entries and five CONFLICT entries at `…-research.md:397-448`.** Each names
  sources searched, why insufficient, requirements affected, and a "Blocks mechanics proof" ruling.
  This is the strongest-constructed section of the unit and no defect was found in it.

## Conflicts logged (recorded, not resolved)

- **Feedback timing, cross-document.** `docs/imports/v2-research-2026-07-11/course-bundle/
  how-to-teach.md:105` states: "**Immediate and corrective.** Right after each decision, not batched.
  Immediate correction is where misconceptions actually get fixed." U4 `…-research.md:79` states:
  "delayed feedback was slightly stronger on average, but task, content, context, learner control,
  and consistency moderated outcomes." The U4 side is now re-verified against SCI-005 (K-U4-009). A
  third position sits in the Phase 1 archive: `docs/superpowers/research/foundation-audit-p1/
  dossiers/C3-deliberate-practice.md:68` — "The subjects should receive immediate informative
  feedback" — which is Ericsson et al.'s *definitional* requirement at proposed tier Q4, not a
  measured timing comparison. Logged; resolution belongs to a later phase.

## Calibration — what "good" looks like

Held to the `journal/decisions.md` R20/R24/R25/R26/R27 bar (exact doc path plus section or line
number, or a measured figure; visible in-record self-correction rather than quiet back-fill).
Concretely, in this record: K-U4-009 and K-U4-010 rest on three and six exact figures respectively,
re-read from the sources; K-U4-015/016/017 name individual WCAG success-criterion numbers *and*
their conformance levels rather than citing "WCAG 2.2"; K-U4-004 and K-U4-013 cite
`web/src/learn/types.ts:40`, `:45-49` and `web/src/progress/types.ts:36-42`, `:44-50` rather than
asserting what the code does. Where a citation was not re-opened, no `Preserve` was issued — see
"Examined and deliberately left alone", which records the ALR-007–ALR-012 abstention rather than
converting an unverifiable basis into a verdict.

## Non-material notes

(No verdict. No landing loop. These failed the materiality gate — a designer would not build
differently on any of them.)

- `…-research.md:51` describes TECH-002's scope as "Correctness, unique solvability, visual clarity,
  state consistency, impossible-state, and **playability** checks". On re-opening, the article's
  sixth named dimension reads "**Physical plausibility**". The word sits in a source-register scope
  cell; no `ALR-` requirement rides on "playability" (ALR-024 at `:263` lists "correctness,
  solvability, reachability, schema, accessibility metadata, evidence compatibility, and fallback").
  Cosmetic.
- `…-research.md:65` renders DUO-001 as "exercise order and difficulty adapt to strengths and
  weaknesses". The source says "Personalized lessons help you learn at your own pace and they adapt
  to your strengths and weaknesses" plus "you start with simpler material in easier exercises …
  then lead you through more challenging examples". "Difficulty" is supported; "order" is a mild
  extrapolation. Nothing downstream turns on it.
- `…-research.md:79` lists SCI-005's moderators as "task, content, context, learner control, and
  consistency"; the source names "feedback focus, discipline, assessment type, and learner control"
  (plus the consistency finding). A loose rendering rather than a quotation, but the substantive
  conclusion U4 draws from them is unaffected and is separately verified in K-U4-008.
- U4's `BRI-002` source page carries an unsourced marketing figure ("learn interactively, which has
  been shown to be 6x more effective"). U4 never repeats it, and its limitation cell at `:35`
  already reads "duration and effectiveness claims are not tied to an inspectable study on the
  page". Noted only to record that the trap was checked.
- U4 names `AttemptRecord` as the durable seam; the durable schema is now `ProgressAttempt`
  (`web/src/progress/types.ts:64`), whose own comment at `:13-14` says it is deliberately decoupled
  "from learn/types.ts's in-memory AttemptRecord". That divergence post-dates U4 (2026-07-16) and is
  not a defect in a dated research baseline. The material half of the seam question is already
  captured in K-U4-004 and K-U4-013.
- U4 uses Layer-1 provenance labels only and has no Layer-2 status-bucket column. That is a format
  vintage, not a claim; it is recorded in the "Format note" above so the `Relabel` verdicts are
  readable, and is not itself a finding.
