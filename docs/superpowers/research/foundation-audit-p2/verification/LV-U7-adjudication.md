# Adjudication-Execution Confirmation — Unit U7, `C-U7-001`

> Fifth instance on this correction chain. I did not audit U7 (`audit/U7-audit.md`), did not raise
> `C-U7-001` (`verification/V-U7.md`), did not land it (`landing/L-U7.md`), did not confirm that
> landing (`verification/LV-U7.md`), did not make the ruling (`verification/V-U7-adjudication.md`),
> and did not execute it (`landing/L-U7.md` §"Second landing pass"). Read-only: no `Edit`, no `Bash`.
> Run: foundation-audit-p2. Written 2026-07-22.
>
> Scope: confirm **execution of the adjudication only**. I do not re-adjudicate options A/B — that
> choice is settled — and I raise no new correction. Every anchor and quotation below I retrieved
> myself this pass from the named file at the named lines; nothing is accepted on the audit record's,
> the ruling's, the executing editor's, or the prior confirmer's word.

## Verdict row

| C-U7-001-adj | LANDED | `audit/U7-audit.md:69` (row `K-U7-002` Claim cell re-anchored to `:18-19`, Citation cell parenthetical narrowed to `:16-17`), `:85-115` (recorded-finding block retained and restated as resolved, superseded `:10-12` quotation kept verbatim at `:90-92`), `:118` (companion `LANDED … ADJUDICATED` marker on its own line, no pipe); `landing/L-U7.md:37-68` (append, first-pass rows preserved). Adjudication hold placed at `LV-U7.md:76-77` is **discharged**. |

`C-U7-001`'s own `LANDED` row at `LV-U7.md:15` is untouched and not re-counted here; this record
confirms only the discharge of the hold that row carries.

## Item-by-item against the ruling's table (`V-U7-adjudication.md:145-158`)

| # | Ruling requires | What I found | Result |
|---|---|---|---|
| 1 | Claim cell replaced with the `:18-19` sentence; `:10-12` must **not** remain in the Claim cell | `audit/U7-audit.md:69` Claim cell reads exactly: `"They do not yet know which legal action is strategically correct; that begins with Strategy Table Fundamentals." (`2026-07-11-blackjack-basics-learning-foundation-design.md:18-19`)`. The `:10-12` sentence is absent from the cell (I read the whole row). | **executed** |
| 2 | Verdict cell unchanged — `Relabel` | `\| K-U7-002 \| Relabel \|`. Byte-identical to `.pre-landing-copy/U7-audit.md:69`. | **executed (unchanged)** |
| 3 | Claim ID cell unchanged — `K-U7-002`, not withdrawn/renumbered/moved | Row sits at `:69`, between `K-U7-001` (`:68`) and `K-U7-003` (`:70`), ID intact. | **executed (unchanged)** |
| 4 | Citation cell: internal-consistency parenthetical narrowed `:16-19` → `:16-17`; **no other text changes**; `ALR-033`, its range and its quoted Limitation exactly as written | Cell now reads "…(Product Outcome at `:16-17` defines Basics completion as a precondition for the strategy-lookup skill Strategy Table Fundamentals later teaches), so it holds; it is mislabeled by omission, not wrong." Character-compared against the pre-image cell (`.pre-landing-copy:69`): the **only** difference in the entire cell is `:16-19` → `:16-17`. `ALR-033 (…-product-activity-research.md:319-323, "mastery research does not identify which blackjack prerequisites are essential; curriculum design owns that decision")` is byte-identical. | **executed, nothing more** |
| 5 | Counts line unchanged | `:78`: "**Counts:** 9 claims assessed — Preserve 1, Relabel 7, Revise 1, Replace 0, Remove 0." Byte-identical to `.pre-landing-copy:78`. | **unchanged ✓** |
| 6 | `ALR-033` citation-state row unchanged | `:144`: "\| ALR-033 (`…-product-activity-research.md:319-323`) \| K-U7-002, K-U7-003, K-U7-007, K-U7-008 \| U7 \| VERIFIED \|". Byte-identical to `.pre-landing-copy:90`. | **unchanged ✓** |
| 7 | `C-U7-001` block retained, restated as resolved; the `:10-12` quotation kept in place; only the closing sentences replaced; cite `V-U7-adjudication.md` | Block at `:85-115`. Superseded `:10-12` quotation present verbatim at `:90-92`. Closing text now records the separate adjudicating verifier, option B, the executed re-anchoring, the bounded citation-cell narrowing, and what did not change, citing `verification/V-U7-adjudication.md` at `:107`. Two reported extras (lead-line tense/label) ruled on below. | **executed** (see deviation 1) |
| 8 | Existing marker byte-unchanged; one companion marker line, own line, no pipe, outside tables | `:117` retains the original marker including "no verdict word or row changed". `:118` is the new companion line: `<!-- LANDED C-U7-001 ADJUDICATED (V-U7-adjudication, option B, editorial): … verdict word, Claim ID, row count and Counts line unchanged (9 rows: Preserve 1, Relabel 7, Revise 1) -->`. Contains no `\|`; sits outside every table. | **executed** |
| 9 | `:239-241` non-material note unchanged | Now at `:247-249` (uniform +95 offset). Byte-identical to `.pre-landing-copy:152-154`: "- `2026-07-11-...:60-61` ("It does not mean the learner can choose the Basic Strategy action ...") / is the same subject-boundary claim as K-U7-002, stated from the negative side. Not a separate / claim; folded into K-U7-002's citation rather than double-counted." | **unchanged ✓** |
| 10 | `:160-162` "Downstream Deltas" exclusion bullet unchanged | Now at `:168-170`. Byte-identical to `.pre-landing-copy:114-116`. | **unchanged ✓** |
| 11 | `verification/*` and the historical landing rows unchanged | `V-U7.md`, `LV-U7.md`, `V-U7-adjudication.md` all read as historical records with no adjudication-era edits; `L-U7.md:1-35` (first-pass header, table, "Reproduction check", "Deliberately not done") intact, with the second pass **appended** at `:37-68` under its own heading. | **unchanged / appended ✓** |
| 12 | No register row created or changed | `registers/` untouched by this pass on the evidence available to me (no register file names the adjudication; `L-U7.md:60` and `:66-68` claim no register write). Stated as a limit: without `Bash` I cannot prove a negative from file history. | **no change found** |

**No item exceeded.** I looked specifically for the failure mode the dispatch names — an editor
"improving" beyond the tabulation — and found none: the offset reconciliation below bounds the whole
change surface to row `:69`, the `C-U7-001` block, and one added marker line.

**Offset reconciliation (whole-file, against the first-landing image reported at `LV-U7.md:15-17,
185-193`).** Everything after the `C-U7-001` block shifts by exactly **+8** and by nothing else:
`C-U7-002` pointer `:112-116 → :120-124`; its marker `:118 → :126`; `C-U7-003` marker `:123 → :131`;
survivor entries `:168-192 → :176-200`; their marker `:194 → :202`; "Conflicts logged" `:196-214 →
:204-222`; file end `:248 → :256`. The +8 is fully explained by the block's +7 prose lines plus the
+1 companion marker. Everything at or above `:78` — the entire verdict table and the Counts line —
sits at unchanged line numbers and, where I character-compared (rows `:68`, `:69`, `:76`, the Counts
line), is byte-identical to the pre-landing image except for the two tabulated cell edits inside
`:69`.

## Verdict-row survival — counted by me

Pattern `^\| *K-U7-[0-9]{3} *\| *(Preserve|Relabel|Revise|Replace|Remove) *\|`, counted by hand on
`audit/U7-audit.md:68-76`:

| Metric | Required | Counted | Result |
|---|---|---|---|
| Total verdict rows | 9 | **9** | PASS |
| `Preserve` | 1 | **1** (`K-U7-005`, `:72`) | PASS |
| `Relabel` | 7 | **7** (`K-U7-001` `:68`, `002` `:69`, `003` `:70`, `004` `:71`, `006` `:73`, `007` `:74`, `008` `:75`) | PASS |
| `Revise` | 1 | **1** (`K-U7-009`, `:76`) | PASS |
| `Replace` / `Remove` | 0 | **0** | PASS |

IDs are contiguous `001`–`009`, no duplicates, no row split or mangled into a non-matching form. The
distribution is identical to the pre-ruling state, as option B requires.

## Retrieval reproduced from the primary source

Opened `docs/superpowers/specs/2026-07-11-blackjack-basics-learning-foundation-design.md` myself,
`:1-70`.

**The new anchor, `:18-19`** — line 18 reads "actions, wagers, and results. They do not yet know
which legal action is strategically correct;" and line 19 reads "that begins with Strategy Table
Fundamentals." The sentence the Claim cell now quotes is therefore, verbatim:

> They do not yet know which legal action is strategically correct; that begins with Strategy Table
> Fundamentals.

Exact against the Claim cell, punctuation and semicolon included. The quotation is **complete at the
sentence boundary** — it starts at a sentence start (mid-line 18) and ends at the paragraph's final
full stop. No truncation, no ellipsis, and no meaning-changing omission: the surrounding paragraph
(`:16-19`) makes the same subject-boundary point the quoted sentence makes, so nothing withheld
softens or reverses it.

**The superseded anchor, `:10-12`**, verbatim:

> This design covers the reusable learning runtime and its first subject, **Blackjack Basics**.
> Strategy Table Fundamentals follows in a separate design cycle after this feature passes scoped
> feature QA.

Exact at the stated lines, under `## Status`. I confirm independently that it is a design-cycle /
process statement gated on "scoped feature QA" and carries no learner-facing claim — i.e. the
finding `C-U7-001` raised was sound, and the ruling's premise reproduces.

I also reopened `:60-61` (the sentence the `:247-249` note folds into `K-U7-002`), verbatim: "It does
not mean the learner can choose the Basic Strategy action, recall a strategy table, play without
assistance at speed, or demonstrate long-term mastery." It is the negative-side statement of the
`:18-19` claim, so the untouched note reads coherently against the new anchor — item 9's
"unchanged" is not merely permitted but correct.

## Is the superseded quotation still visible? — **Yes.**

`audit/U7-audit.md:86-92`, read this pass:

> Before this correction the verdict row quoted
> `2026-07-11-blackjack-basics-learning-foundation-design.md:10-12` — the **superseded rendering** of
> the Claim cell, retained here verbatim so the original error stays visible:
>
> > "This design covers the reusable learning runtime and its first subject, **Blackjack Basics**.
> > Strategy Table Fundamentals follows in a separate design cycle after this feature passes scoped
> > feature QA."

The error was not silently swapped out. Both renderings are in the record, labelled which is which,
at the record's most-read position (immediately under the **Counts** line). This satisfies the run's
keep-the-error-visible discipline as the ruling's item 7 requires.

## The two reported deviations — ruled

**Deviation 1 — present → past tense in the `C-U7-001` block's lead ("The verdict row **quotes**
`:10-12`" → "Before this correction the verdict row quoted…"), plus the "RESOLVED by adjudication
(option B)" tag on the block heading and the "**superseded rendering**" label.**

**Ruling: compelled accuracy fix, not an unrequested edit.** Item 1 of the ruling makes the present
tense false at the moment it is executed: after re-anchoring, the row does *not* quote `:10-12`, and a
record asserting otherwise would be wrong on its face. Item 7's instruction is "**Retain, restate as
resolved**", which is a licence to change the block's framing tense; its narrower sentence ("Replace
only the closing sentences at `:102-106`") constrains what may be *removed or rewritten in
substance*, and nothing of substance was. The change is minimal (tense plus a resolution label), it
removes and alters no quotation — I confirmed both quoted passages at `:90-92` and `:100-101` are
verbatim against the source — and the editor **reported** it in `L-U7.md:57` rather than hiding it.
Had the editor left the present tense standing, that would itself have been a defect. Not `ALTERED`.

**Deviation 2 — the ruling calls `:16-17` "the two preceding sentences" while the second sentence
runs into line 18; the editor landed `:16-17` as tabulated and reported the discrepancy.**

**The editor's reading is correct, and landing-as-tabulated was right.** I reproduce it: line 17 ends
"…table information, round flow," and the sentence completes on line 18 with "actions, wagers, and
results." So `:16-17` truncates the second sentence's tail; it does not misquote anything — the
audit's Citation cell carries no quotation at that anchor, only the paraphrase "Product Outcome at
`:16-17` defines Basics completion as a precondition…", which lines 16-17 do support as far as they
go. Landing as tabulated was right for two independent reasons: (a) substituting `:16-18` would be an
editor overriding an adjudicator's explicit tabulation on its own authority — the exact act the
examiner/editor/confirmer split exists to prevent; and (b) `:16-18` would re-overlap line 18, the line
the Claim cell now quotes, partially re-creating the "the parenthetical cites the passage it is
checking" problem that item 4 exists to remove. Reporting rather than silently fixing is the correct
editorial behaviour here. Not `ALTERED`.

I record, without raising it as a correction, that `:16-17` remains a one-line-short anchor; it is
cosmetic and it belongs to the ruling, not to the execution.

## Is `C-U7-001` now fully discharged? — **Yes.**

The prior confirmer's hold (`LV-U7.md:47-52, 76-77`) had one operative complaint: "Prose does not
reach a row-wise reader" — `:78` asserted "Relabel 7" unqualified while `:69` carried a verdict
"whose basis the same record now says 'is not the text it cites'".

That is now resolved, and it is worth being precise about *why*, because the counts are numerically
identical before and after. The row-wise problem is resolved **because the verdict word was correct
all along and only its quotation was wrong.** The defect was never that the record contained one
`Relabel` too many; it was that row `:69` pointed at a sentence carrying no claim while its own
citation cell reasoned about a different sentence that does. Re-anchoring removes the mismatch at the
row itself: a consumer reading only the table now sees `K-U7-002 | Relabel` attached to a genuine,
uncited curriculum-prerequisite claim, supported by an `ALR-033` citation that is on point for it.
The Counts line's "Relabel 7" is no longer an unqualified assertion the record's prose disowns; it is
an assertion the record's prose now affirms. Nothing is left that fails to reach a row-wise reader:
the `ALR-033` → `K-U7-002` mapping at `:144` remains true, the `:247-249` note remains true, and the
`:168-170` genre-exclusion bullet no longer conflicts with any audited row, because no design-cycle
sentence is audited any more.

`C-U7-001` therefore moves from `landed-but-unadjudicated` to **closed**. I place no further hold on
it.

## Noticed, not raised (for orchestrator routing; deliberately un-numbered)

- **Marker arithmetic drifts further.** `audit/U7-audit.md` now carries **five** `LANDED` HTML-comment
  markers (`:117`, `:118`, `:126`, `:131`, `:202`) for **three** corrections. Both prior duplications
  (`LV-U7.md` "noticed" item 1) plus the new companion marker. Every one is individually legitimate;
  a naive marker-counting gate would read five landings. Tooling/cosmetic only.
- **The first-pass marker at `:117` now reads slightly oddly beside `:118`** — it says the record
  "recorded that row K-U7-002 is over-called and mis-anchored … no verdict word or row changed",
  which remains literally true of the first pass and which the ruling (item 8) expressly forbade
  editing. No defect; noted so a later reader does not mistake it for a stale marker.
- **`V-U7.md` non-material notes remain unlanded** (`LV-U7.md` "noticed" item 4), including the
  Build Sequence scope-statement note the adjudication considered and set aside at
  `V-U7-adjudication.md:133-139`. Correctly unlanded — none was a numbered correction.
- **`V-U7-adjudication.md:150` is the source of the `:16-17` one-line truncation**, not the editor.
  Routed as an observation on the ruling, not as a correction to the artifact.

## Confirmer's own limits, stated

- **No `Bash`**, so no `git diff`, no mtime inspection, and no claim from file history. My
  before/after evidence is a full read of `audit/U7-audit.md`, character comparison of the verdict
  rows, Counts line, `ALR-033` citation row, `:168-170` exclusion bullet and `:247-249` note against
  `.pre-landing-copy/U7-audit.md`, plus arithmetic reconciliation of every section offset (uniform
  +8, fully explained).
- **The preserved before-image predates the *first* landing**, so I cannot byte-compare the
  `C-U7-001` block against its post-first-landing state. For that block I rely on the ruling's
  tabulation, the offset arithmetic (+7 prose lines, all inside the block), the editor's own reported
  deviation, and direct re-retrieval of both quotations from the primary source. A same-length
  in-line substitution inside that block's prose would in principle escape detection; I state this as
  an unknown rather than certifying a negative.
- I did **not** re-adjudicate options A/B, did not re-judge any of the nine verdicts, did not assess
  U7's research sufficiency, raised no new correction, edited nothing, and state nothing about what
  the project should do about its curriculum.

## Rows returned to the orchestrator (not written by me)

- **Conflict register — no new row.** The single `C-U7-003` row already returned at `LV-U7.md:259-261`
  is unchanged by this pass and is not re-returned here.
- **Source-lead register — no rows.** The adjudication and its execution were editorial against
  sources already held; every source reproduces.
