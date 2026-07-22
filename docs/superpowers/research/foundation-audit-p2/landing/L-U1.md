# Landing — Unit U1

> Audit-editor instance, independent of the `audit-verifier` that raised `C-U1-001`–`C-U1-003` in
> `verification/V-U1.md` and of the third instance that will confirm this landing.
> Target edited in place: `audit/U1-audit.md`. Run: foundation-audit-p2. Written 2026-07-22.
> All three corrections are remedy mode `editorial`; no source outside those already cited by the
> audit record or the verification record was opened.

**Preservation invariant checked after editing:** `audit/U1-audit.md` contains exactly **18** rows
matching `^\| *K-U1-[0-9]{3} *\| *(Preserve|Relabel|Revise|Replace|Remove) *\|` — 13 `Preserve`,
5 `Relabel`, 0 `Revise`, 0 `Replace`, 0 `Remove`. **No verdict was added, changed, or removed.**
All `LANDED` markers sit on their own lines (audit lines 21, 122, 155, 197); none is inside a table
row or a cell.

| Correction ID | Anchor landed at | Retrieval performed |
|----|----|----|
| C-U1-001 | `audit/U1-audit.md:77-122` — the drift-finding bullet formerly at `:68-70`. The false sentence is struck through and kept visible, followed by a five-bullet correction; `LANDED` marker at `:122`. Secondary in-cell amendment at the `K-U1-010` row (`:148`), which had credited the baseline's "targeted repetition" sentence to Cepeda alone. | Opened `docs/imports/v2-research-2026-07-11/research/v2-research-02-curriculum-and-pedagogy.md` and read `:1-80` and `:170-185` directly: `:14` reads "4. **Decision recall** — choose the recommended action with and without support."; `:62` reads "5. production before buttons appear"; `:174` reads "Roediger & Karpicke (2006), test-enhanced learning/retrieval practice." Opened `docs/specs/learning-mastery-and-scoring.md:1-100`: `:35` reads "4. Decision recall: choose the recommendation with progressively less support."; `:23` and `:92` confirmed verbatim — lineage confirmed first-hand, not taken from the verifier. Opened `docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md` at `:39` (SCI-001 row: "The Critical Importance of Retrieval for Learning", "Jeffrey Karpicke and Henry Roediger / Science", "2008-02-15", DOI 10.1126/science.1152408), `:74`, `:87-88`, `:141`, `:253` — all verbatim as landed. Opened `PROGRESS.md:97-99` and confirmed the dropped-"production"-rung open question verbatim. **Retrieval that failed, stated plainly:** `https://doi.org/10.1126/science.1152408` redirects to `https://www.science.org/doi/10.1126/science.1152408`, which returned **HTTP 403 Forbidden**; the publisher page was not read in this pass. The 2008 paper's bibliographic identity is therefore landed on the baseline's own `:39` row and its DOI, and this record makes **no** claim to have re-read that paper's abstract. |
| C-U1-002 | `audit/U1-audit.md:164-197` — a new "Coverage correction landed" block immediately after the **Counts** paragraph (`:159-162`); `LANDED` marker at `:197`. Recorded as an unassessed claim family, explicitly stating the counts are unchanged. | Opened `docs/specs/learning-mastery-and-scoring.md:1-100` first-hand and transcribed the unassessed text verbatim: `:22-24` ("1. Play correctly with the table open." / "2. Play correctly without the table and without time pressure." / "3. Play correctly without the table at realistic table pace."), `:35`, and `:87`+`:89-95` (the seven exercise-ladder rungs). Opened the baseline `2026-07-16-adaptive-learning-product-activity-research.md` at `:59` ("support a guided first encounter and fade assistance before evidence is counted as independent mastery proof."), `:77` (worked-examples/fading INFERENCE, `SCI-004`/`SCI-009`), and `:387` (rejected option "Forced same-item retries until a correct answer appears", rationale "It can erase first-response evidence and substitute short-term repetition for later retrieval.") — all read in the source, all verbatim as landed. |
| C-U1-003 | Two places. (a) `audit/U1-audit.md:11-21` — the **Quoting convention** paragraph (`:11-13`) and its correction (`:15-21`): the false clause "no ellipsis is used anywhere in this record" is quoted back and corrected, `LANDED` marker at `:21`. (b) `audit/U1-audit.md:154` — the `K-U1-016` row's citation cell now carries the verbatim source-order passage, with the previous rendering quoted and named as defective; `LANDED` marker on its own line at `:155`, immediately below the row. | Opened `docs/superpowers/research/foundation-audit-p1/dossiers/C4-chesscom-khan.md:110-124` and transcribed `:121` directly: "- Caveats: These are fixed accuracy-percentage thresholds and pass/fail checks on mixed-skill assessments — no rating, no confidence interval, no item-difficulty parameter, and no probability estimate appears anywhere in this definition. This is a structurally different mechanism from every model C1 examined (BKT, PFA, DKT, IRT, education-Elo)." Confirmed first-hand that the record's rendering reversed the two clauses across an unmarked ellipsis and dropped the noun "mechanism". Verdict for `K-U1-016` (`Relabel`, bucket Assumption) is untouched. |

## Handling of the Roediger & Karpicke 2006 vs Karpicke & Roediger 2008 attribution hazard

Landed as an explicit, separately-stated distinction rather than a merge. The audit record now says
that the **stripped import reference** is "Roediger & Karpicke (2006), test-enhanced
learning/retrieval practice." (`…curriculum-and-pedagogy.md:174`), and that the baseline's `SCI-001`
is a **different paper** — Karpicke, J.D. & Roediger, H.L. III (2008), *Science* 319(5865), 966–968,
DOI 10.1126/science.1152408 (`…-research.md:39`) — with reversed author order, different year, and
different journal, "not interchangeable." The landed text explicitly does **not** assert that
`SCI-001` is the stripped reference; it asserts only the narrower, checkable claim that the
surviving U1 claim family has retrieval evidence in hand under `SCI-001`.

## Scope statement

Files written in this pass: `audit/U1-audit.md` (in place) and this file. Nothing else was written.
`docs/specs/learning-mastery-and-scoring.md`, the P1 dossiers, the baseline, the import, and
`PROGRESS.md` were **read only**.
