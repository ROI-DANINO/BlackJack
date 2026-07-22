# Landing — Unit U5

> Landing editor (audit-editor instance). Did **not** write `audit/U5-audit.md` and did **not**
> raise these corrections — `verification/V-U5.md` did. Not self-verified: a third, separate
> instance confirms this landing. Write scope this pass was exactly two files:
> `audit/U5-audit.md` (in place) and this record. `journal/decisions.md` — the audited object —
> was read but **not** edited, as were every product doc, spec, plan, and `registers/` file.
> Run: foundation-audit-p2, 2026-07-21.

| Correction ID | Anchor landed at | Retrieval performed |
|----|----|----|
| C-U5-001 | `audit/U5-audit.md` — the `K-U5-002` verdict row (verdict cell `Revise` → **`Preserve`**; withdrawn basis retained struck through inside the Citation cell; `<!-- LANDED C-U5-001 … -->` marker on its own line immediately below the row). Consequential landings of the same correction, each separately marked: the **Counts** paragraph (distribution restated, superseded figures struck), the "two defects located" sentence following it, the paragraph below the **Citation state** table (records the verifier's `CIT-U5-B` = `UNVERIFIED` and the `UNVERIFIABLE` 2026-07-11 copy; supersedes "No citation came back `UNVERIFIED`"), and the **Calibration** sentence that restated the withdrawn "exact contradicting finding" claim. | Primary sources re-opened first-hand by this editor, **not** taken from V-U5's quotations. (1) `docs/superpowers/specs/2026-07-15-strategy-table-fundamentals-lesson1-design.md:110-159` read in full. `:120-122` confirmed verbatim: *"Blackjack Foundations' Hit unit says \"This hand is a stiff total. Choose Hit to take one more card\" — a *mechanics* instruction (try the button), not a strategy claim, consistent with the subject's \"mechanics-first literacy, no strategy language\" charter."* — the source **affirms** the "not a strategy claim" half the audit offered it against. `:122-125` does locate the contradiction in the arranged `OPENINGS.stiffHands` STAND hands, not in the wording; `:127-143` is the approved forward-contextualization fix; `:145-147` confirms the one-string edit is deferred by design. V-U5's reading reproduces exactly. (2) `docs/superpowers/plans/2026-07-10-first-guided-drill.md:861` confirmed verbatim: *"Hit takes another card; Stand keeps your total and passes to the dealer. You have a stiff 16 — try Hit and feel the bust risk."* — bust-risk framing present, in a 2026-07-10 artifact; nothing on the page establishes the "unshipped" status the audit asserted. (3) `web/src/learn/content/blackjack-basics.ts:250-261` confirmed verbatim: `:257` *"This hand is a stiff total. Choose Hit to take one more card."*, `:260` *"Hit adds one more card to your hand."* — today's copy does carry no bust-risk wording (that half of the audit's evidence stands; it is drift since the decision). No retrieval failed. |
| C-U5-002 | `audit/U5-audit.md` — the "What was read before any retrieval (G7)" section, at the sentence originally at `:43-45` (over-broad clause struck in place, narrowed statement written beside it, `<!-- LANDED C-U5-002 … -->` marker on its own line below the paragraph); plus the `C2`/`C3`/`C4`/`C5`/`C6` bullet in the same section, which now states the archive's remaining content from reading rather than assumption. No verdict changed. | Primary sources re-opened first-hand. (1) `docs/superpowers/research/foundation-audit-p1/dossiers/C1-knowledge-tracing.md:277-280` and `:113-121` read directly. `:278` confirmed verbatim: *"**No source directly evaluates a true solo-learner, zero-population, fixed-item-bank deployment** of BKT, PFA, or DKT — the exact shape this product needs."* The gap is explicitly scoped to three named mastery models; the adjacent gap at `:279` is likewise scoped *"for any of the three models"*. `:117-118` confirmed verbatim. C1 therefore does **not** support the audit's claim about the archive as a whole — **the correction reproduces.** (2) Archive enumerated by this editor rather than assumed: the dossier directory holds exactly six files — `C1-knowledge-tracing.md`, `C2-its-actr-procedural.md`, `C3-deliberate-practice.md`, `C4-chesscom-khan.md`, `C5-anki-spaced-repetition.md`, `C6-blackjack-teachable.md`. (3) Spot-checks of V-U5's own reading, all reproducing verbatim: `C6:36-39` (*"This card's evidence base is genuinely thin …"*), `C5:22-24` (load-bearing Q4 on decision-rule transfer), `C3:34-43` (variance-explained dispute, bearing on no U5 row). (4) `C2` and `C4` opened at their headers by this editor — both unread by examiner and verifier; `C4-chesscom-khan.md:27` reads *"Q2. Khan Academy's mastery mechanics — the mastery-level ladder, how mastery is earned and lost."*, confirming the archive holds mastery/progression material outside C1's three-model scope. No retrieval failed. |
| C-U5-003 | `audit/U5-audit.md` — new paragraph after the existing C-U5-001 note and its marker, before "## Every row that cites a document by path…" (both on their own lines, outside the citation-state table, which ends at `:150`); names the `CIT-U5-B` row of the internal citation table at `:136`. States that the table's `VERIFIED` cells are examiner-assigned, not verifier-assigned; that this `VERIFIED` cell coincides with the verifier's ruling but is not corroboration of it (self-verified, and wrong when written, per the ruling); and that the authoritative state for `CIT-U5-B` is the verifier's ruling in `registers/citation-state-register.md` and `verification/V-U5-citation-ruling.md`. `<!-- LANDED C-U5-003 … -->` marker placed on its own line immediately below the new paragraph. The `VERIFIED` value at `:136` itself is unchanged. | Opened `verification/V-U5-citation-ruling.md` in full first-hand (authoritative dispatch source): confirmed its ruling text at `:182` ("Coincides with my ruling, but its provenance is invalid... examiner-assigned — a self-verified state, which is the thing this program forbids — and it was wrong at the time it was written... Do not treat this cell as corroboration of my ruling; it is right by accident") and its Corrections-raised row at `:192` naming `audit/U5-audit.md:136` and instructing the provenance mark. Independently opened `verification/V-U5.md` and confirmed first-hand its citation-states table at `:171` records `\| CIT-U5-B \| Revise \| U5 \| UNVERIFIED \|`, and its prose at `:188-192` gives the use-specific UNVERIFIED reasoning the ruling reproduces. Opened `audit/U5-audit.md:126-164` and confirmed the `:136` cell reads `VERIFIED` as reported, unedited by this pass, with the existing C-U5-001 note/marker immediately following the table at `:152-164`. Did not open or edit `registers/citation-state-register.md` (orchestrator-owned; out of write scope). No retrieval failed. |

## Verdict-row preservation

Verdict rows matching `^\| *K-U5-[0-9]{3} *\| *(Preserve|Relabel|Revise|Replace|Remove) *\|`
counted before this pass: **17**. Counted after: **17** (K-U5-001 … K-U5-017, none dropped, none
added). Distribution changed from **Preserve 15 / Relabel 1 / Revise 1 / Replace 0 / Remove 0** to
**Preserve 16 / Relabel 1 / Revise 0 / Replace 0 / Remove 0**. The record's own **Counts**
paragraph was updated to match, with the superseded figures retained struck through.

## What happened to `K-U5-002`

Its `Revise` was **withdrawn** and the row now carries **`Preserve`**. The row still exists and
still carries a valid verdict word, so it remains enumerable by the gate.

This was landed **on the verifier's adjudicated authority, not this editor's**. V-U5 ruled the
`Revise` *"not supported by its own cited sources"* and over-called *"on both halves"*: half (b)'s
cited source affirms the very reading the audit said it undermined (confirmed first-hand above),
and half (a) rests on an *"unverified status doing load-bearing work in the verdict"*, with the
2026-07-11 copy ruled **`UNVERIFIABLE`** absent repository-history access that neither examiner nor
verifier had.

`Preserve` is the **residual** verdict, not a new judgement about decision row 13. V-U5 states that
the surviving residue *"is a fact about drift *since* the decision, not an overstatement *by* the
decision"*, that if the "unshipped" label is false it *"makes row 13 accurate exactly as written on
2026-07-11"*, and — in its mandatory calibration — that across all twelve rows *"nothing in these
rows is contradicted by its stated basis or baseless"*, ruling out `Remove` and `Replace`; `Relabel`
does not fit either, since the defect found was in the audit's basis, not in the decision's warrant
status. With no defect established, the claim survives the audit, which is what `Preserve` means in
this record's legend. This editor substituted no opinion of its own about what row 13 deserves and
touched **no other verdict**. Flagged for the confirmer as the one inferential step in this pass:
V-U5 names the withdrawal but does not name the replacement word.

## Effect on the `CIT-U5-B` dependency (recorded, not acted on)

`CIT-U5-B` sits `UNVERIFIED` in the orchestrator-owned citation-state register, and the gate check
that currently fails on that row **fails correctly**: it was flagging a `Revise` resting on a
citation that could not be verified as supporting it. After this landing, **no verdict rests on
`CIT-U5-B` in the disputed way** — the `Revise` it supported no longer exists, and the surviving
`Preserve` at `K-U5-002` does not depend on either disputed half. The dependency the `UNVERIFIED`
state was protecting against is therefore discharged in the audit record. What the register should
now say is the orchestrator's call: **the register was not edited by this pass**, and the
examiner-assigned `VERIFIED` cell inside `audit/U5-audit.md`'s own citation-state table was
deliberately left unedited too, with the verifier's `UNVERIFIED` assignment recorded in prose
immediately below the table instead. Note for whoever re-judges it: the 2026-07-11 shipped copy
remains `UNVERIFIABLE` by any agent without repository history, independent of this landing.

## Reproduction status of each correction

- **C-U5-001 — reproduced in full.** Every quotation V-U5 offered was checked against the primary
  file, not accepted; all reproduce verbatim at the stated lines. No over-correction found: the
  audit's shipped-copy evidence (`blackjack-basics.ts:257`, `:260`) is accurate and was preserved
  rather than struck; only the inference drawn from it was withdrawn.
- **C-U5-002 — reproduced.** C1's gap is verifiably scoped to BKT/PFA/DKT, so the audit's
  generalization to the whole archive is unsupported. This editor additionally enumerated the
  archive directly (six dossiers) rather than accepting any count, and found one fact V-U5 did not
  state: **`C2` and `C4` were never opened by either the examiner or the verifier**, and `C4`
  covers Khan Academy mastery mechanics. That strengthens the correction and is recorded in the
  landed text; it is not raised as a new correction.
- Neither correction failed to reproduce. No new corrections are raised here.

## Marker convention used

Every `LANDED` marker is on **its own line, immediately below the affected row or paragraph**, and
**never** inside a table row or cell. Consequence a reader should expect: the marker below the
`K-U5-002` row splits the verdict table into two markdown tables when rendered. Line-wise gate
enumeration is unaffected (verified: 17 rows still match), but the rendered table loses its header
for rows `K-U5-003`–`K-U5-017`. Recorded as a known cost of the mandated convention, not a defect
introduced silently.
