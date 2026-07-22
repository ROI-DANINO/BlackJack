# Verification — Unit U5

> Independent verifier. Did not write `audit/U5-audit.md`. No `Bash`, no `Edit` — this file is the
> only write. Every citation below was re-opened from the primary source in this pass; no state is
> carried over from the audit record's own assertion. Run: foundation-audit-p2, 2026-07-21.

SUFFICIENCY: SUFFICIENT

The record's claims and citations are complete enough to gate. Two material corrections are raised
(sufficiency and correction status are different axes). Both are closable editorially from sources
already in hand; neither requires new collection, and neither leaves a claim un-gateable.

## Scope confirmation

Positional mapping used as supplied (row N = `journal/decisions.md:7+N`), not re-derived. Every
in-scope row anchor in the audit record was checked against the file content and all twelve resolve:
12=`:19` (Basic Strategy oracle), 13=`:20` (stiff-16 Hit hint), 14=`:21` (three tracks), 17=`:24`
(`LessonState`), 18=`:25` (imported future-guidance notes), 21=`:28` (adaptive learning), 22=`:29`
(umbrella plan family), 23=`:30` (24-source activity evidence set), 25=`:32` (learner identity),
26=`:33` (AL-D1 cycle-1 scope), 27=`:34` (ProgressStore four rulings), 30=`:37` (`commitSessionSummary`
no-op). No out-of-scope row and neither prose ADR section was audited.

## Mandatory calibration — Remove/Replace defect-real answers

The audit record carries **zero `Remove` and zero `Replace` verdicts**, so no `DEFECT-REAL` answer is
required. Recorded explicitly per G5, with a judgement on whether zero is honest:

**Zero is honest.** I re-opened all twelve rows and every cited source. Nothing in these rows is
contradicted by its stated basis or baseless. Every row's Why cell names an owned design document, an
owned research report, a governance constraint, or a code location, and in each case the named thing
exists and says what the row says it says. `Remove` would have required a claim with no support or
one its source refutes; `Replace` would have required a claim that is wrong but whose subject still
needs an answer. Neither shape is present. A high survival rate is also structurally plausible here:
the unit is made of *decisions*, which are legitimate acts of product authority, and the audit
correctly held them to "is the stated basis honest?" rather than "was the decision correct?".

The live risk in this unit was **under-calling**, not over-calling, and I tested for it directly
(see "Preserve spot-checks"). I found one under-call (C-U5-002) and one **over**-call (C-U5-001) —
the corrections run in both directions.

## Corrections raised

| ID | Correction | Remedy |
|----|----|----|
| C-U5-001 | `K-U5-002` (Revise, row 13 / `journal/decisions.md:20`) is not supported by its own cited sources; the Revise as written over-calls on both halves. **(b)** The record says *"'Not strategy advice' was later found insufficient in practice"* and cites `docs/superpowers/specs/2026-07-15-strategy-table-fundamentals-lesson1-design.md:122-125`. The source says the opposite about that half. Verbatim at `:120-122`: *"Blackjack Foundations' Hit unit says \"This hand is a stiff total. Choose Hit to take one more card\" — a *mechanics* instruction (try the button), not a strategy claim, consistent with the subject's \"mechanics-first literacy, no strategy language\" charter."* STF affirms "not a strategy claim"; what it flags at `:122-125` is a contradiction created by the **arranged hands**, not by the wording, and its approved fix (`:127-143`) is the very forward contextualization row 13's Why cell promised — which the same audit record Preserves as `K-U5-003` on the ground that the commitment "was kept". The two claims are mutually inconsistent. **(a)** The "bust-risk orientation is absent from the shipped copy" half rests on the undated-code-vs-dated-decision comparison and on the unestablished label *"an unshipped plan draft string"* applied to `docs/superpowers/plans/2026-07-10-first-guided-drill.md:861` — verbatim: *"Hit takes another card; Stand keeps your total and passes to the dealer. You have a stiff 16 — try Hit and feel the bust risk."* That plan is dated **2026-07-10**, one day before the decision, and carries the exact bust-risk framing the row asserts; whether it was the shipped copy on 2026-07-11 is precisely what the record concedes it cannot establish. The word "unshipped" is therefore an unverified status doing load-bearing work in the verdict. Fix the basis (both halves) before any verdict on row 13 stands. | editorial |
| C-U5-002 | The bounding statement at `audit/U5-audit.md:43-45` generalizes from one dossier to the whole Phase 1 archive: *"no U5 row was penalised for declining to cite external learning-science evidence for a mastery/progression choice — the archive establishes that such evidence does not exist for this product shape."* Only `C1-knowledge-tracing.md` was opened. C1's gap is narrowly scoped — verbatim at `:278`: *"**No source directly evaluates a true solo-learner, zero-population, fixed-item-bank deployment** of BKT, PFA, or DKT — the exact shape this product needs."* That is a statement about three named mastery models, not about the archive's learning-science evidence generally. It is load-bearing (it is the stated reason no row was penalised), so it is a basis defect, not a wording nit. The claim must be narrowed to C1's actual scope, and the archive's remaining content must be stated from having been read rather than assumed. **No verdict flips** — I opened C3, C5 and C6 in this pass and they corroborate rather than contradict (see "The C2–C6 non-read"). | editorial |

Neither correction requires collection: both sources named in C-U5-001 and all six Phase 1 dossiers
are already in-repo and in hand.

## The C2–C6 non-read — ruling

**Correctly bounded as to verdicts; over-generalized as to stated justification (C-U5-002). Not a
sufficiency failure.**

The examiner's argument ("no U5 row cites them, so no verdict rests on them") is *not* sufficient on
its own — Phase 1's dominant defect was exactly material in hand going unread, and a citation-absence
test does not detect evidence that bears on a claim without being cited by it. So I tested the
argument by opening the dossiers rather than accepting it.

- `C6-blackjack-teachable.md` is the archive's only blackjack-domain card and bears on rows 13, 26
  and 23 without being cited by them. Its own front matter (`:36-39`) records: *"This card's evidence
  base is genuinely thin — a single n=4 single-subject study, a mock-casino money result, and exactly
  one PubMed record for 'card counting' in title/abstract. That thinness is a **verified finding about
  the literature**, not a defect in this dossier."* This **corroborates** row 23's domain-transfer-gap
  clause; it does not undermine any U5 row.
- `C5-anki-spaced-repetition.md` carries a load-bearing Q4 (`:22-24`) on whether spaced repetition
  transfers to a decision-rule skill, and its F1 (`:41-43`) records the spacing evidence as *"drawn
  almost entirely from verbal/declarative memory tasks"*. Its Q1 meta-analysis (Cepeda et al. 2006) is
  the same source as `SCI-002` in row 23's own register. Again corroborating, not contradicting.
- `C3-deliberate-practice.md` (`:34-43`) answers a dispute about variance explained by deliberate
  practice; no U5 row asserts anything it bears on.

So the twelve rows survive the unread material. What does not survive is the *sentence* the non-read
was used to license — hence C-U5-002 rather than an INSUFFICIENT verdict. The gap is closed by this
pass; the remedy is to write the narrowed statement, not to collect anything.

## `K-U5-002`'s temporal gap — ruling

**The verdict overreaches as stated; the disclosed limitation is not adequate, because the limitation
goes to the verdict's load-bearing premise rather than to a peripheral detail.**

A disclosure is adequate when the verdict still stands without the missing evidence. Here it does
not: half (a) *is* the comparison the missing evidence would settle. The record additionally converts
the unknown into an assertion by calling `…first-guided-drill.md:861` "an unshipped plan draft
string" — a status it cannot establish and which, if false, makes row 13 accurate exactly as written
on 2026-07-11. Half (b) fails independently and for a different reason: its cited source affirms the
half it is offered against (see C-U5-001).

**What would settle it:** repository history for
`web/src/learn/content/blackjack-basics.ts` (and its predecessor content module) as of 2026-07-11 —
e.g. `git log -L` / `git show` on that path at that date. Neither the examiner nor I can reach it.
Until an agent with repository-history access establishes it, the 2026-07-11 copy is **UNVERIFIABLE**,
and a `Revise` on row 13 may not rest on it. The residue that *is* established and survives — today's
shipped copy carries no bust-risk wording (`blackjack-basics.ts:257`, `:260`, both confirmed verbatim
by me) and STF-04's approved one-string edit is deferred by design (`…lesson1-design.md:145-147`) —
is a fact about drift *since* the decision, not an overstatement *by* the decision.

## Preserve spot-checks — is the stated basis honest?

Tested against "does the Why cell assert a warrant it does not have?", not "was the decision right?".

- **Row 12 / `K-U5-001`.** Oracle design re-opened. `:10-11`, `:59`, `:66` verbatim as quoted.
  `validate.ts:47-49` does validate `unit.profileId` against `'h17'`/`'s17'`. Basis honest. Sound.
- **Row 14 / `K-U5-004`.** Tracks design `:23`, `:26`, `:29`, `:11` all verbatim; the bracketed
  "(architecture + pedagogy)" gloss matches `:26`'s "(2a) learning architecture … (2b) pedagogy"
  exactly. Sound.
- **Row 17 / `K-U5-005`.** `Lesson.tsx:68` is verbatim `const round = state.session?.round ?? null;`;
  `types.ts:52` carries `session: SessionState | null` on `LessonState`; tracks design `:69` carries
  the first-real-consumer rule verbatim. Sound. (Marginal: the Why cell's "prevents that leak from
  becoming the permanent product boundary" is a forward expectation stated as fact — but a ratified
  invariant does prevent by construction where honored, so this does not clear materiality.)
- **Row 18 / `K-U5-006`.** The audit's own handling here is a model of the independence discipline and
  I uphold it explicitly: it records that `AGENTS.md` is *downstream* of the decision and therefore
  corroborates consistent application rather than supplying independent warrant. That is the right
  call and the right reason. `AGENTS.md` Constraints text confirmed verbatim. Sound.
- **Row 21 / `K-U5-007` and `K-U5-008`.** Architecture design `:131-137` and `:140` match the row
  clause-for-clause; `:43` carries "bounded hybrid that leans on-demand" verbatim. The `Relabel` is
  well-calibrated and I uphold it: `:94`, `:205`, `:504` all file tokens/latency/cost as *to be
  measured* (`:504` verbatim: "Capacity models use measured calls, tokens, latency, fallbacks"), and
  the Why cell's own "leaves a **measurable** path" concedes measurement has not happened. Assumption
  is the right bucket; Relabel rather than Revise is the right instrument. Sound, at the mild end.
- **Row 23 / `K-U5-009`.** I re-counted the register at `…product-activity-research.md:28-51`
  independently: DUO 6 + BRI 5 + SCI 9 + STD 2 + TECH 2 = **24**. Exact. The six approved items map
  one-to-one onto `:452-474`. The gap clause is verbatim at `:419-424`. Sound. (Independence
  observation, non-material and out of U5's scope — see notes.)
- **Rows 25 / 26 / 27 — the positive controls.** Checked specifically for lenient grading *because*
  they are the calibration standard. **They were not graded leniently.** Evidence that the examiner
  applied the same bar: it logged an internal contradiction inside row 25's own cited source (AL-R2),
  and it caught a line-anchor drift inside row 26's citation set. Independently:
  `validate.ts:51-55` and `:70-75` are exact to the line, character-for-character as quoted;
  `types.ts:45-49` carries no `id`, timestamp, `schemaVersion` or learner key, so `K-U5-012` holds;
  `Learn.tsx:4` is verbatim; `…progressstore-cycle1-design.md:72`, `:74`, `:93`, `:118`, `:120-121`,
  `:471`, `:814` are all verbatim at the stated lines. Sound.
- **Row 30 / `K-U5-017`.** `:1082` (§12 register #11), `:342-345` (§3.4), `:565` (§4.2 pt 2) and
  `:780` (§6) all verbatim at the stated lines. Sound.

**Under-call sweep result:** one found (C-U5-002). I looked specifically for Why-cells asserting
research warrants they lack and found no further instance clearing materiality. Row 21's "while still
adapting lesson order, phrasing, hints, and practice" is a design-specified capability
(`…architecture-design.md:41-42`), not an unmeasured quantitative claim, and is correctly left alone.

## Conflict — ruling (recorded, not resolved)

**Anchors confirmed; the conflict is real and the irony holds; row 25's own claim is genuinely
unaffected.**

- `…adaptive-learning-browser-storage-research.md:136` verbatim: *"stable, linkable local records are
  **at most pseudonymous** in contexts where they can be related to a person."*
- The same document, `:83` verbatim: *"The active consumer is one first-party browser application
  serving one **anonymous** local learner."*
- `…adaptive-learning-product-activity-research.md:392` verbatim: *"Local **anonymous** progress is the
  approved proof boundary"*.

A detail the audit record did not surface and that sharpens the conflict: AL-R2's own register entry
`PRIV-002` at `:79` cites GDPR for *"Pseudonymisation definition and the distinction between
pseudonymous and anonymous information"* — so the document contradicts, at `:83`, a distinction it
registers as a source at `:79`.

Row 25's claim is unaffected. Its warrant is the Identity and Privacy Boundary section (`:133-136`),
which is intact and quoted verbatim by the row; the row corrects three *named other* documents and
never claims to have enumerated every instance. Recorded for a later phase. Not resolved here.

## Citation states (verifier-assigned)

Every source below was re-opened by me from the primary artifact in this pass. All are in-repo; no
external fetch was required and none was performed. No state below is accepted on the basis of
another agent's retrieval.

| CIT-U5-A | Preserve | U5 | VERIFIED |
| CIT-U5-B | Revise | U5 | UNVERIFIED |
| CIT-U5-C | Preserve | U5 | VERIFIED |
| CIT-U5-D | Preserve | U5 | VERIFIED |
| CIT-U5-E | Preserve | U5 | VERIFIED |
| CIT-U5-F | Preserve | U5 | VERIFIED |
| CIT-U5-G | Preserve | U5 | VERIFIED |
| CIT-U5-G | Relabel | U5 | VERIFIED |
| CIT-U5-H | Preserve | U5 | VERIFIED |
| CIT-U5-I | Preserve | U5 | VERIFIED |
| CIT-U5-J | Preserve | U5 | VERIFIED |
| CIT-U5-K | Preserve | U5 | VERIFIED |
| CIT-U5-L | Preserve | U5 | VERIFIED |
| CIT-U5-M | Preserve | U5 | VERIFIED |
| CIT-U5-N | Preserve | U5 | VERIFIED |
| CIT-U5-O | Preserve | U5 | VERIFIED |
| CIT-U5-P | Preserve | U5 | VERIFIED |

`CIT-U5-B` is `UNVERIFIED`, not `UNVERIFIABLE`: the sources were obtained and their quoted strings are
verbatim and line-exact, but the source contradicts the use made of it (half b) and the second source
carries an unverified status label doing load-bearing work (half a). I could not verify that the
citation supports the verdict it is offered for. Per the standing rule, the `Revise` at `K-U5-002` may
not rest on it until C-U5-001 is landed.

`CIT-U5-P` is `VERIFIED` — C1 does say, verbatim at `:117-118` and `:277-278`, what the record quotes.
The defect at C-U5-002 is the record's generalization *beyond* that citation, not the citation itself.

## Phase-boundary rules

1. **Does not state what the project should now do** — substantially compliant. One borderline
   instance, flagged not raised: `audit/U5-audit.md:75` — *"a designer must not build a review surface
   that replays authored prose"* — is prescriptive in form, though it appears inside a materiality
   rationale ("Material to family 3 … and to review:") rather than as a recommendation. Contrast
   `:140-141`, which defers correctly ("Resolution belongs to a later phase").
2. **No replacement content authored for a `Replace`** — moot and confirmed: zero `Replace` verdicts.
   One adjacent instance, flagged not raised: `audit/U5-audit.md:61` proposes wording ("Honest
   wording: the retained step is a **mechanics instruction on three Basic-Strategy-Stand hands**") for
   a `Revise`, which the rule does not cover.
3. **No decision-sense stamping** — clean. `Confirm` and `Reconsider` do not occur anywhere in the
   record. `Revise` and `Remove` occur only at `:10` (the verdict legend), `:61` (the verdict cell),
   and `:78-84` (the counts paragraph and the sentence "which is what `Revise` and `Relabel` exist
   for"), all unambiguously in the audit-verdict sense. This was the sharpest risk in a unit made of
   decisions and the record did not fall into it.

## Non-material notes (mechanical / cosmetic — not gated)

- `ROADMAP.md:42` anchor drift in row 26 is real and correctly routed: `:42` is the `|---|---|---|`
  separator and the cited content sits at `:43` ("Triggered by the adaptive-learning mechanics
  proof."). Confirmed; cosmetic; upholding the record's non-material routing.
- **Independence observation on row 23's register, not raised as a correction.** Twelve of the 24
  sources at `…product-activity-research.md:28-51` are vendor/competitor self-descriptions
  (`DUO-001`–`005`, `BRI-001`–`005`, `TECH-001`–`002`); the register's own Limitations column marks
  them as such ("Product self-description", "Marketing/help claims", "Company self-description"), and
  row 23's Why cell explicitly disclaims "copying competitor thresholds or proprietary systems". The
  row therefore does not launder vendor material as independent corroboration and the `Preserve`
  stands. Noted because the audit did not perform the independence check explicitly; the report's own
  sources are U4's audit target, not U5's.
- The record's `:1082` quotation of §12 register #11 elides across two table cells with "…". The
  elided text does not alter the meaning; verified against the source. Cosmetic.
- The record cites `…architecture-design.md:132` for "Versioned curriculum catalog"; `:132`'s Concern
  cell reads "Stable skills, objectives, facts, misconceptions, prerequisites…" and the quoted phrase
  is that row's Authority cell. Correct line, partial cell. Cosmetic.
- Row 22's exclusion is upheld: `journal/decisions.md:29` is plan decomposition and research
  sequencing and touches none of the eight decision families. Its Why cell is a claim about program
  structure. No claim clears the materiality gate. Correctly returned with zero claims rather than
  padded.
- The record's own row-mapping spot-checks (rows 18/24/30) reproduce correctly against the file; I
  additionally confirmed all twelve in-scope anchors. No drift.
- The audit's "Examined and deliberately left alone" section is an unusually useful artifact: it makes
  the survivors enumerable rather than inferring soundness from silence. Noted as good practice, not
  as a finding.
