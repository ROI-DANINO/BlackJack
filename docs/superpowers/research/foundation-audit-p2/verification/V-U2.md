# Verification — Unit U2

> Record under verification: `journal/raw/_inbox/foundation-audit-p2/audit/U2-audit.md` (11 assessed claims).
> Unit audited: `docs/specs/product-vision.md` (102 lines, zero citations).
> Verifier: audit-verifier (Opus 4.8), 2026-07-21. Run dir: `foundation-audit-p2`.
> **This record judges. It does not repair.** No artifact outside this file was written.

SUFFICIENT

The record engages the evidence that bears on its question, positively enumerates what it left
unrowed and why, and reopens first-hand the two external sources its strongest `Preserve`s lean on.
Two material corrections are raised below; sufficiency and correction status are separate axes and a
SUFFICIENT unit may carry corrections.

---

## What I reopened independently (G9)

Every anchor below was opened by me, not accepted from the record.

| Source | What I checked | Result |
|---|---|---|
| `docs/specs/product-vision.md` | full 102 lines; anchors `:3`, `:6`, `:11-17`, `:20`, `:23`, `:26-27`, `:45-46`, `:58`, `:64`, `:69-72`, `:74-76`, `:78-80`, `:82-87`, `:90-99`, `:101-102` | all quoted text verbatim at the stated anchors |
| `…product-activity-research.md` | `:3`, `:28`, `:29`, `:30`, `:32`, `:33`, `:58`, `:59`, `:67`, `:68`, `:76`, `:77`, `:79`, `:80`, `:82`, `:83`, `:87-88`, `:89-90`, `:91-92`, `:95-97`, `:380`, `:388`, `:389`, `:397-402`, `:419-424`, `:425-428`, `:439-443`, `:453-454` | all quoted text verbatim except as noted below |
| `C4-chesscom-khan.md` | `:70-71`, `:261`, `:433-439`, `:463-471` | all quoted text verbatim at the stated anchors |
| `https://www.w3.org/TR/WCAG22/` (`STD-001`) | SC 1.4.1 Use of Color, reopened by me via WebFetch | **verbatim confirmed**, Level A confirmed: "Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element." |
| `https://digitalcommons.usf.edu/psy_facpub/1767/` (`SCI-003`) | Rohrer & Taylor abstract, reopened by me via WebFetch | **verbatim confirmed**: "When tested 1 week later, performance was vastly superior after mixed practice." … "Thus, the results of both experiments favored the shuffled format over the standard format." Authors, journal (*Instructional Science*) and year (2007) match the register at `:41`. |

The record's two claimed first-hand reopenings (`STD-001`, `SCI-003`) were **not taken on trust and
both hold**. Neither quotation is a paraphrase; neither carries an ellipsis; neither is misattributed.

`DUO-006`'s scoping and the "only peer-reviewed" claim were checked against the register directly:
`DUO-006` (`:33`) is the only `DUO-*` row typed "Peer-reviewed operational study" (`DUO-001` official
article, `-002` official guide, `-003` official research/product article, `-004`/`-005` official
engineering), and its recorded limitation is verbatim as quoted. **Both claims are accurate.**

## Mandatory calibration — Remove/Replace defect-real answers

**The audit record carries zero `Remove` and zero `Replace` verdicts, so no `DEFECT-REAL` answer is
owed for this unit.** Recorded explicitly, per dispatch.

**Is zero the honest number here?** Yes. I read `product-vision.md` line by line against the held
evidence and looked specifically for contradiction. The three nearest candidates all fail the
`Remove` bar:

- `:23` names one pole of a live logged conflict (`…product-activity-research.md:425-428`). Naming
  one pole of an *unresolved* conflict is not being contradicted by evidence.
- `:69` "teaches execution first" sits in tension with worked-example evidence for novices
  (`:77`), but `:71-72` explicitly retains explanations. Adjacent tension, not contradiction — the
  record reaches the same conclusion and declines to escalate, which is correct restraint.
- `:58`'s "mastery gate" against C4's null equal-time comparison (`C4:433-439`) is a caution on
  external validation; the audited line asserts no efficacy, so nothing is contradicted.

Zero `Remove` is a finding, not an omission.

## Corrections raised

| ID | Correction | Remedy |
|----|----|----|
| C-U2-001 | `U2-audit.md:81` states "**Every `DUO-*` source is `PUBLISHED` at vendor-self-description grade**". That is false of `DUO-006`, and the record's own preceding sentence (`:77`) contradicts it. Register `…product-activity-research.md:33` types `DUO-006` verbatim as **"Peer-reviewed operational study"** (Settles & Meeder / ACL, 2016), not a self-description. The defensible claim — that no `DUO-*` source is an *independent* efficacy finding — survives, because `DUO-006` is vendor-**authored** (Duolingo Research) even though peer-reviewed. This is a source-tier/independence claim and therefore material. **The K-U2-001 verdict is unaffected**: it does not rest on this sentence. | `editorial` — the correct tier is already in a source in hand (`…product-activity-research.md:33`); no collection. |
| C-U2-002 | K-U2-006's bucket is wrong **by the record's own declared test**. `U2-audit.md:63-64` sets the test: "would the decision change if playtesting contradicted it? yes → Assumption; values commitment → Product judgement." `U2-audit.md:179-181` then finds, of the audited three-rung ladder, "the *number and content of the rungs* would change under playtest evidence, so the rungs are closer to an Assumption" — and labels the row **Product judgement** anyway. The audited claim (row K-U2-006) is the specific three-rung sequence at `:83-87`, not the fading principle; the principle is separately Evidence-backed at `…product-activity-research.md:77`, `:59`. The baseline's ruling on the exact analogue supports Assumption verbatim (`:89-90`): **"the existing four-level ladder remains a project design rather than a research-derived sequence."** Unlike K-U2-003, no part of this ladder is domain-forced. Bucket is the whole remedy of a `Relabel`, so a wrong bucket is a wrong verdict, and the error runs toward *over-settling* the claim. | `editorial` — `…product-activity-research.md:89-90` is already cited in the row; no collection. |

## Ruling — the `Product judgement` vs `Assumption` line

The record draws the line with falsifiability intent. I rule on each `Relabel`:

| Row | Record's bucket | My ruling |
|---|---|---|
| K-U2-001 (`:6`, "Duolingo-like") | Product judgement | **Correct.** `:26-27` genuinely does positioning work ("not an academic simulator with boring UI" / "not a gambling product centered on chips, bankroll, or casino fantasy" — verbatim confirmed). No playtest overturns "we want this kind of product"; it could only change which mechanics express it. `Revise` is unavailable (no efficacy is asserted), `Remove` is unavailable (nothing contradicts it), and demoting it to a Non-material note would be wrong — the premise propagates into `AGENTS.md`, so it is load-bearing and earns a row. `Relabel` is right and the bucket is right. |
| K-U2-002 (`:23`, "short learning loops") | Assumption | **Correct**, and the split against `:6` is drawn in the right place. `:23` sets session construction, `:6` sets genre. The live conflict at `:425-428` confirms the question is open. |
| K-U2-003 (`:11-17`, seven-step ladder) | Product judgement | **Within band — no correction.** Tempting to call Assumption, but steps 1–5 are largely domain-forced (true count is computed *from* running count; count-aware deviations presuppose Basic Strategy), so the sequence is not freely falsifiable in the way a designed ladder is. The record says exactly this at `:129-131` and carries the coverage gap alongside. Sound. |
| K-U2-006 (`:83-87`, three-rung fading ladder) | Product judgement | **Wrong bucket → C-U2-002.** Nothing here is domain-forced; the baseline rules the analogue a "project design". Assumption. |
| K-U2-007 (`:74-75`, decision vs outcome) | Product judgement | **Correct.** `…product-activity-research.md:95-97` says so almost in terms ("remains an approved blackjack training constraint, not a newly inferred research finding" — verbatim confirmed). No playtest would make this project grade decisions by hand outcome. |
| K-U2-010 (`:69-72`, execution first) | Product judgement | **Correct.** A statement about what competence the product certifies. The record honestly flags the `SCI-004`/`SCI-009` tension without escalating it — the right call. |

## Ruling — should any `Relabel` have been a Non-material note instead?

**No. Six is not over-calling here.** I tested each against "would a designer build differently?":
`:6` propagates into the project mission; `:23` sets session construction; `:11-17` is the curriculum
spine; `:83-87` sets the fading policy; `:74-75` sets the feedback contract; `:69-72` decides drills
versus exposition screens. All six are load-bearing.

The discriminating evidence that this is not blanket-rowing is what the record *declined* to row: the
rest of the Product Feel list at `:20-31` ("fun, light, approachable", "precise and serious under the
hood", "not an academic simulator with boring UI"), the platform/mobile sequencing at `:35-38`, the
app-shell coherence at `:40-43`, and the scope pointer at `:47-48` were all routed to Non-material
notes with reasons. A pessimism-driven pass would have rowed those too. It did not.

## Ruling — the two in-record self-corrections

1. **Withdrawn `Revise` on K-U2-002 — the withdrawal was correct.** I checked the ground it rests on:
   `product-vision.md:20` reads verbatim "The product should eventually feel like:", and `:23` is a
   bullet under it asserting no duration. There is therefore no factual overstatement for a `Revise`
   to weaken. Had the `Revise` stood it would have been a manufactured defect. **No real defect was
   talked away.**
2. **Consolidation of `:64` and `:90-99` into K-U2-011 — sound; nothing load-bearing was dropped.** I
   read all eight bullets at `:90-99` plus `:64` against the adopted requirement at
   `…product-activity-research.md:453-454`. They express one principle (ordered-shoe integrity and
   traceability) at several surfaces, and `:64` is the identical principle applied to Free Play. The
   two bullets that come closest to being distinct — "cut card / penetration matters" and "session
   logs can be replayed and debugged" — are both inside the adopted "ordered-shoe engine hands" /
   "deterministic truth" scope. Separate rows would have been row inflation.

   Making the consolidation visible rather than silent is the R24/R26 pattern and I do not treat it
   as a defect.

## Citation states (verifier-assigned)

Format: `| <citation ID> | <verdict it supports> | <unit> | <state> |`. These are my states, not the
record's proposals. I do not write the register; these rows are returned for orchestrator append.

| CIT-U2-01 | Relabel | U2 | VERIFIED |
| CIT-U2-02 | Relabel | U2 | VERIFIED |
| CIT-U2-03 | Relabel | U2 | VERIFIED |
| CIT-U2-04 | Preserve | U2 | VERIFIED |
| CIT-U2-05 | Preserve | U2 | VERIFIED |
| CIT-U2-06 | Relabel | U2 | VERIFIED |
| CIT-U2-07 | Relabel | U2 | VERIFIED |
| CIT-U2-08 | Preserve | U2 | VERIFIED |
| CIT-U2-09 | Preserve | U2 | VERIFIED |
| CIT-U2-10 | Relabel | U2 | VERIFIED |
| CIT-U2-11 | Preserve | U2 | VERIFIED |

All five `Preserve` verdicts (K-U2-004, -005, -008, -009, -011) rest on `VERIFIED` citations, as
required. I checked each `Preserve` at the exact location named rather than accepting a
plausible-sounding pointer:

- **K-U2-004** — `:80` and `:87-88` verbatim; `SCI-006` is indeed a meta-analysis of 108 controlled
  evaluations (register `:44`). The Preserve survives because the audited line names a *stage
  sequence*, no thresholds and no mastery model. Accurate.
- **K-U2-005** — the strongest row in the unit; both halves match, and `SCI-003`'s domain limit
  (`:76`, "a narrow mathematics domain and limited activity types") is carried, not smoothed.
  Grade is warranted by design (two primary experiments with delayed tests), not by usefulness.
- **K-U2-008** — `:67` and `:82` verbatim including the limitation "primarily correlational and not
  a test of app stopping mechanics", and the counter-evidence at `:439-443` is logged rather than
  suppressed. Not upgraded beyond its basis.
- **K-U2-009** — SC 1.4.1 reopened by me and confirmed verbatim at Level A; the reduced-motion half
  is genuinely named at `:83`. The `:397-402` accessibility coverage gap is about *competitor
  practice*, not the standard, so it correctly does not weaken this Preserve.
- **K-U2-011** — `:453-454` verbatim, and `…product-activity-research.md:3` ("approved 2026-07-16;
  all six bounded recommendations were accepted") confirms the record's treatment of a
  "Recommendation" line as an *adopted* requirement. Sound.

## Ruling — the two proposed conflicts (confirmed, not resolved)

- **CONF-U2-A — session length. CONFIRMED as a real conflict at the anchor given.**
  `…product-activity-research.md:425-428` reads verbatim: "**CONFLICT — Recommended session size.**
  Evidence: Duolingo describes a few minutes (`DUO-001`), while Brilliant recommends 15 minutes and
  offers 2-minute practice (`BRI-002`)." `product-vision.md:23` does name the Duolingo pole. The
  characterisation is accurate and no resolution is proposed. I do not resolve it.
- **CONF-U2-B — mastery-progression external validation. CONFIRMED, and the characterisation as a
  standing caution rather than a contradiction is CORRECT.** `C4:433-439` is verbatim as quoted. The
  audited line (`product-vision.md:58`) names a stage in a loop, asserts no efficacy and names no
  mastery model, so C4's finding cannot contradict it. Carried from C4, not originated here — also
  correct. I do not resolve it.

## Phase-boundary checks

All three clear. Reported as line references, not rewritten.

1. **Does not state what the project should now do.** No such statement found. The two nearest
   misses were checked and cleared: `U2-audit.md:135` ("No collection is requested here; recording
   the gap is the result") is a statement about this audit's own process, not project direction;
   `:373` ("Worth a drafter's attention; not a verdict") stops short of prescribing an action and
   explicitly disclaims verdict status. `:244-245` explicitly refuses to enter the design question.
2. **Authors no replacement content.** Moot and confirmed — zero `Replace` verdicts.
3. **Does not use the later-phase decision vocabulary.** "Reconsider" does not appear anywhere in the
   record; "Confirm" does not appear as a decision stamp. "Revise"/"Remove" appear only as this
   phase's verdict words in the legend and reasoning. Clear.

## Sufficiency reasoning

- **Landmark/contrary evidence unmentioned?** None found within the evidence this program holds. The
  record read `C4-chesscom-khan.md` in full (489 lines) and surfaced the *contrary* material inside
  it — the F13 null against an equal-time active control and the prior-ability-confound caution at
  `C4:463-471` — rather than quoting only the supportive findings. That is the strongest sufficiency
  signal in the record.
- **Strongest counter-argument engaged?** Yes. The strongest counter to a "Duolingo-like" north star
  is that no held source establishes Duolingo-like design causes learning. The record states that
  directly (`:80`) and still declines to escalate to `Unsupported`/`Remove`, with reasons.
- **Material inside cited sources left unread?** One partial instance, checked and found
  non-decisive. The record declares reading `…product-activity-research.md` at "lines 1–120,
  395–455". I read the undeclared range and found three directly relevant rows: `:380`
  ("Learner-selected session bounds with neutral stop/resume | **Adopt** for the first mechanics
  proof"), `:388` ("Loss-framed streaks, leagues, or penalties for ending a session | **Reject**"),
  and `:389` ("Fixed numeric mastery thresholds copied from studies or competitors | **Defer**").
  **All three corroborate** the record's verdicts — `:380` strengthens the Assumption call on
  K-U2-002, `:388` strengthens the K-U2-008 Preserve, `:389` strengthens the K-U2-004 reasoning.
  None flips or undermines any verdict, and the read range was declared honestly rather than
  overstated. This is a coverage nit, recorded below, not a sufficiency failure.

**Verdict: SUFFICIENT.**

## Non-material notes (mechanical / cosmetic — not gated)

*(un-numbered; no ID; no landing loop)*

- Anchor short by one line: `U2-audit.md:250-252` and the CIT-U2-11 row cite
  `…product-activity-research.md:453`, but the quoted sentence runs `:453-454` ("…traceable
  first-response / evidence, ordered-shoe engine hands, and canonical fallback"). Quotation is
  verbatim; only the range is clipped.
- Truncated register quote without ellipsis: `U2-audit.md:75-76` gives `DUO-003` (`:30`) as
  "Selected internal examples with incomplete protocols"; the register continues "…and no reusable
  production implementation." No meaning is changed.
- Elided hedge in the CONF-U2-B quotation (`U2-audit.md:325-327`): the ellipsis after "moves
  **down**" omits C4's own qualifier "Not to zero, and not to 'refuted' — F13 is one underpowered
  short study and cannot carry that weight." The record's *use* of the quote (a standing caution
  that does not contradict) is if anything more conservative than the source, so no meaning is
  reversed — but the hedge was the author's and is worth restoring.
- Loose gloss at `U2-audit.md:98-100`: `C4:70-71` is verbatim, but the sentence there is about the
  Elo-vs-IRT/knowledge-tracing model choice "on the combined C1+C4 evidence", not specifically about
  "the far more heavily studied Khan Academy". The substance the record draws from it holds.
- CIT-U2-10 lists `…product-activity-research.md:96-97` alongside `:77`, but only `:77` is used in
  the K-U2-010 reasoning; `:96-97` (decision/outcome separation) bears on K-U2-007, not on
  "execution first". The location exists and is verbatim; it is simply not load-bearing here.
- Citation-state table column order: `U2-audit.md:294-306` puts the **claim ID** in cell 2 where the
  register's positional read expects the **verdict word**. The rows I return above use the required
  order; the examiner's table is superseded by mine either way.
- CONF-U2-B nuance: C4's finding arguably bears a little wider than "the model to be chosen" — it
  touches whether mastery-ladder progression is externally validated at all. It still does not
  contradict `product-vision.md:58`, which asserts no efficacy, so the record's characterisation
  stands.
- Declared read range `:1-120, :395-455` of `…product-activity-research.md` leaves `:121-394`
  unread; three corroborating rows there (`:380`, `:388`, `:389`) are named in the sufficiency
  section above. No verdict depends on them.
