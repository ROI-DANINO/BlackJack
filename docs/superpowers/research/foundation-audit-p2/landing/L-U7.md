# Landing record — Unit U7

> Corrections `C-U7-001`–`C-U7-003` from `journal/raw/_inbox/foundation-audit-p2/verification/V-U7.md`
> landed into `journal/raw/_inbox/foundation-audit-p2/audit/U7-audit.md`. Written 2026-07-21 by a
> landing editor who did not raise the corrections and does not adjudicate verdicts. All three are
> remedy mode `editorial`; no new sources were collected (no `WebSearch`, no `WebFetch` used — every
> source is in-repo).
>
> **Preservation invariant held:** the audit record ends this pass with exactly **9** verdict rows —
> Preserve 1 (`K-U7-005`), Relabel 7 (`K-U7-001/002/003/004/006/007/008`), Revise 1 (`K-U7-009`).
> No verdict word was changed, no row added, removed, or re-anchored.

| ID | Anchor in `audit/U7-audit.md` | Retrieval actually performed |
|----|----|----|
| C-U7-001 | New "Corrections landed from verification (V-U7)" section, first item, placed immediately after the **Counts** line; `LANDED` marker on its own line below that item. Verdict row `K-U7-002` (line 69) left byte-for-byte unchanged. | Read `docs/superpowers/specs/2026-07-11-blackjack-basics-learning-foundation-design.md:1-30` directly. Confirmed `:10-12` verbatim ("This design covers the reusable learning runtime and its first subject, **Blackjack Basics**. Strategy Table Fundamentals follows in a separate design cycle after this feature passes scoped feature QA.") — a design-cycle/process statement carrying no empirical or pedagogical assertion. Confirmed the curriculum claim at `:18-19` verbatim ("They do not yet know which legal action is strategically correct; that begins with Strategy Table Fundamentals."). Also re-read the audit record's own exclusion sentence in its "Examined and deliberately left alone" list ("sequencing among future *design cards* … Project-planning scope, not curriculum scope; left alone") to confirm the genre-exclusion argument reproduces against the record itself. Both quotes reproduce exactly. |
| C-U7-002 | Two new entries appended to the "Examined and deliberately left alone (survivors not given a row)" section, explicitly marked as omitted by the original pass; `LANDED` marker on its own line after those entries (and a pointer item in the "Corrections landed" section). No `Preserve` row was added, so the count invariant is untouched. | (a) Read `docs/superpowers/specs/2026-07-15-strategy-table-fundamentals-lesson1-design.md:100-134` directly. Confirmed the "Why Adaptive Checkpoint Grading" quantitative core verbatim at `:109-111`. Independently re-derived the arithmetic rather than copying the verifier's: 6-deck two-card openings — pair 23/311 ≈ 7.4%; two-card soft non-blackjack excluding A-A ≈ 9.5%; natural ≈ 4.8%; total ≈ 21.6%, consistent with "roughly one first-hand in five". (b) Confirmed the Cross-Lesson Continuity claim verbatim at `:123-125`. Reopened the product source the audit record never opened: `web/src/learn/situations.ts:15-49` — `OPENINGS.stiffHands` at `:31-35` is `[ten♠, UP_SIX, six♥]` (16 v 6), `[king♣, UP_FIVE, five♠]` (15 v 5), `[nine♥, UP_FOUR, seven♦]` (16 v 4), all Basic-Strategy Stand cells; and `web/src/learn/content/blackjack-basics.ts:245-266` — step `hit-hand` at `:252-260` carries `setup: { kind: 'arranged', openings: OPENINGS.stiffHands }` with `requestedAction: 'hit'`. Claim reproduces in full. Files read only; nothing under `web/` was modified. |
| C-U7-003 | "Conflicts logged (recorded, not resolved)" section rewritten: the previous "None found…" wording is quoted in place (error left visible), followed by the logged conflict row; `LANDED` marker on its own line in the "Corrections landed" section. Register-row ID assignment explicitly left to the orchestrator. | Read `docs/superpowers/specs/2026-07-10-v2-learning-foundations-roadmap-design.md:50-63` directly — item 6 confirmed verbatim at `:56-57` ("After V2, expand Basic Strategy mastery gradually: hard totals, hard doubles, soft totals, pairs/splits, then mixed review."). Read `docs/superpowers/research/foundation-audit-p1/dossiers/C2-its-actr-procedural.md:188-201` directly — F11 confirmed: Rohrer, Dedrick & Burgess (2014), Q2 randomized counterbalanced classroom experiment, grade-7 math, n=140, claimed strength "The mean test scores were greater for material learned by interleaved practice rather than blocked practice (72 % vs. 38 %, d = 1.05)", caveat "a blackjack trainer's hand/upcard/action decision space is exactly this kind of 'choose the right strategy for this kind of problem' task rather than a single repeated skill. Domain is grade-7 math, not adult strategy-game/gambling-adjacent skill; that transfer is untested." Both sides reproduce verbatim. |

## Reproduction check

All three corrections reproduced against the primary sources. **None failed to reproduce**, and no
miscounted enumeration was found in `V-U7.md`: the verifier's row-by-row Relabel tally ("6 of 7
upheld, 1 over-called") matches the record's 7 Relabel rows, and the ≈21% arithmetic re-derives
independently.

## Deliberately not done

- **No verdict adjudicated.** `C-U7-001` offers two mutually exclusive resolutions (drop the row, or
  re-anchor the quote) and says "Do not do both." Both would alter the verdict table; the landing
  editor records the defect against the row and leaves the row as written. That choice is the
  orchestrator's or a later examiner's.
- **No prescription added.** The corrections are about what the record reports; nothing here states
  what curriculum sequence the project should adopt.
- **No shared register written.** `C-U7-003`'s conflict is logged inside the audit record only;
  `registers/` was not touched.

## Second landing pass — adjudicated discharge of `C-U7-001` (2026-07-22)

> Executed by a **second landing editor**, a fresh instance that did not audit U7, did not raise
> `C-U7-001`, did not land the first pass, did not confirm it, and did not make the ruling. This pass
> executes `verification/V-U7-adjudication.md` only. No new sources (no `WebSearch`; `WebFetch` not
> used — every source is in-repo). Write scope: `audit/U7-audit.md` and this file, nothing else.
>
> **Ruling executed:** `RULING: Option B — retain the Relabel, re-anchor K-U7-002 to
> 2026-07-11-blackjack-basics-learning-foundation-design.md:18-19.`
>
> **Preservation invariant re-checked after execution:** exactly **9** verdict rows — Preserve 1
> (`K-U7-005`), Relabel 7 (`K-U7-001/002/003/004/006/007/008`), Revise 1 (`K-U7-009`). Unchanged, as
> option B changes a Claim cell and not a verdict.

| Adjudication item | Edit made in `audit/U7-audit.md` | Retrieval actually performed |
|----|----|----|
| 1 — `K-U7-002` **Claim cell** | Quoted sentence and anchor replaced: `:10-12` design-cycle sentence out, `"They do not yet know which legal action is strategically correct; that begins with Strategy Table Fundamentals." (`…-design.md:18-19`)` in. The `:10-12` sentence no longer appears in the Claim cell. | Opened `docs/superpowers/specs/2026-07-11-blackjack-basics-learning-foundation-design.md:1-70` directly this pass and read both anchors first-hand rather than trusting the adjudication's quotations. `:18-19` reproduces exactly: line 18 ends "…They do not yet know which legal action is strategically correct;" and line 19 is "that begins with Strategy Table Fundamentals." `:10-12` reproduces exactly: "This design covers the reusable learning runtime and its first subject, **Blackjack Basics**. Strategy Table Fundamentals follows in a separate design cycle after this feature passes scoped feature QA." |
| 2, 3 — Verdict cell, Claim ID cell | **Untouched.** Verdict word still `Relabel`; ID still `K-U7-002`; row neither withdrawn, renumbered, nor moved. | — |
| 4 — `K-U7-002` **Citation cell** | Single bounded change: the internal-consistency parenthetical now reads "(Product Outcome at `:16-17` defines Basics completion as a precondition …)" instead of `:16-19`. All other cell text — `ALR-033`, its `:319-323` range, its quoted Limitation, the "mislabeled by omission, not wrong" conclusion — byte-identical. | Read `:16-19` first-hand. **Observation, reported not corrected:** the two sentences the ruling identifies as "the two preceding sentences — `:16-17`" in fact run to mid-line 18 ("…round flow," at line 17 continues "actions, wagers, and results." at line 18). The ruling's `:16-17` anchor is therefore a slight truncation of the second sentence, not a misquotation; lines 16-17 do support the parenthetical's paraphrase as written, and the anchor no longer overlaps the Claim cell's sentence. Landed as tabulated. |
| 5, 6 — Counts line, `ALR-033` citation-state row | **Untouched.** Counts still "9 claims assessed — Preserve 1, Relabel 7, Revise 1, Replace 0, Remove 0." `ALR-033` still `VERIFIED`, still supporting `K-U7-002, K-U7-003, K-U7-007, K-U7-008`. | Both re-read in place after the edits. |
| 7 — `C-U7-001` recorded-finding block | Retained and restated as resolved. Lead line now reads "**RESOLVED by adjudication (option B).**"; the `:10-12` quotation is kept in place and explicitly labelled the **superseded rendering** of the Claim cell. Closing sentences replaced: the "landing editor does not adjudicate / row left exactly as written" text is now a past-tense account of the first pass, followed by the ruling, the executed re-anchoring, the bounded citation-cell narrowing, and what did not change. Cites `verification/V-U7-adjudication.md`. | **Beyond the tabulated item, minimal and reported:** the block's opening sentence read "The verdict row quotes `…:10-12`" in the present tense, which the re-anchoring falsifies. Changed to "Before this correction the verdict row quoted …" plus the superseded-rendering label. This is a tense/label accuracy fix required by item 1, not a re-adjudication; no quotation was altered or removed. |
| 8 — `LANDED` marker | Existing marker left byte-identical. One companion HTML-comment line added directly below it, on its own line, containing no `|`, outside every table, recording the adjudicated re-anchoring and restating the 9-row 1/7/1 distribution. | — |
| 9, 10 — `:239-241` note, `:160-162` "Downstream Deltas" exclusion bullet | **Untouched**, per the ruling. | Both re-read in place; both read coherently against the new anchor. |
| 11, 12 — `verification/*`, `landing/*` history, `registers/*` | **Untouched.** `V-U7.md`, `LV-U7.md` and `V-U7-adjudication.md` not opened for edit; the first pass's rows above are preserved and only appended to; no register row created or changed. | — |

**Discharge.** `C-U7-001` moves from recorded-finding to resolved, in the dossier itself and not only
in a verification note. Confirmation of this execution is a separate agent's act; this pass does not
mark its own work verified.

**Not done.** No verdict re-adjudicated, no new correction raised, no source collected, no
prescription about curriculum sequence added, and no file outside `audit/U7-audit.md` and this file
touched.
