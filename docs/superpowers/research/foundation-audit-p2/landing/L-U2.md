# Landing — Unit U2

> Corrections landed into `journal/raw/_inbox/foundation-audit-p2/audit/U2-audit.md` per
> `journal/raw/_inbox/foundation-audit-p2/verification/V-U2.md` (`C-U2-001`, `C-U2-002`).
> Landing editor: this pass. Both remedies are `editorial` (no collection).
> Verdicts unchanged: `U2-audit.md` still carries exactly 11 verdict rows
> (`K-U2-001`…`K-U2-011`), same verdict words as before this pass. Only prose bases and one
> Layer-2 bucket label were corrected, as the verification record directed.

| ID | Anchor in `audit/U2-audit.md` | Retrieval actually performed |
|----|----|----|
| C-U2-001 | `U2-audit.md:80-82` (inside the `### K-U2-001` reasoning) — corrected sentence "Every `DUO-*` source is `PUBLISHED` at vendor-self-description grade" to "Every `DUO-*` source is vendor-authored"; added a `> Correction (C-U2-001, editorial)` block quoting the original wrong sentence and explaining the fix; `LANDED` marker placed on its own line at `U2-audit.md:95`, immediately below the correction block (this is a prose paragraph, not a `K-U2-NNN` verdict-table row, so no table row was touched). | Opened `docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md` directly (Read tool, in-repo — the source is already cited by this program) and read the Source Register in full, lines 1–100. Confirmed at line 33, verbatim: `DUO-006` source type is **"Peer-reviewed operational study"** (Settles & Meeder / ACL, 2016), not a self-description — matching what the verification record quoted. Confirmed no other `DUO-*` row (001–005) carries that type; all five are "Official product/guide/research/engineering article." |
| C-U2-002 | `U2-audit.md:182` (the `### K-U2-006` section header) and `:205-210` (closing falsifiability-intent paragraph) — bucket corrected from "Product judgement" to "Assumption" in the header and in the closing reasoning; the header's original wording is preserved and quoted inside a `> Correction (C-U2-002, editorial)` block at `:184-194` rather than silently overwritten. `LANDED` marker placed on its own line at `U2-audit.md:212`, immediately below the corrected closing paragraph (again a prose section, not a `K-U2-NNN` table row — the Verdicts table row for `K-U2-006` at line 49 carries only the verdict word `Relabel`, which is unchanged and was not touched). | Re-read `U2-audit.md:62-64` (the record's own declared falsifiability test) and `:169-184` (the original `K-U2-006` reasoning, before edit) directly in the file being landed, confirming the self-contradiction the verification record describes: the paragraph itself concludes "the rungs are closer to an Assumption" one sentence before labelling the row "Product judgement." Also re-opened `docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md` lines 85-100 (Read tool) and confirmed verbatim at `:89-90`: "Hint ladder: worked examples and fading support graded assistance (`SCI-004`, `SCI-009`), but the existing four-level ladder remains a project design rather than a research-derived sequence." — the analogue ruling the audit record itself already cites for this row. |

## Confirmations

- **No verdict word changed.** `K-U2-001`…`K-U2-011` all retain their original verdict
  (`Preserve`/`Relabel`) in the Verdicts table (`U2-audit.md:44-54`). `K-U2-006` remains
  `Relabel`; only its Layer-2 bucket label (Product judgement → Assumption) was corrected, per
  the verification record's explicit instruction ("Bucket is the whole remedy of a `Relabel`... The
  `K-U2-001` verdict is unaffected").
- **Verdict-row count preserved: 11.** Regex `^\| *K-U2-[0-9]{3} *\| *(Preserve|Relabel|Revise|Replace|Remove) *\|`
  matches exactly `K-U2-001` through `K-U2-011`, unchanged rows, unchanged order.
- **No `LANDED` marker was placed inside a table row or cell.** Both markers sit on their own
  line, in prose sections (`### K-U2-001` and `### K-U2-006` reasoning), below the corrected text.
- **Only the two write targets were touched**: `journal/raw/_inbox/foundation-audit-p2/audit/U2-audit.md`
  (in place) and this file (`journal/raw/_inbox/foundation-audit-p2/landing/L-U2.md`, new). No
  product doc, `docs/specs/product-vision.md`, `registers/`, or any file outside
  `journal/raw/_inbox/foundation-audit-p2/` was read for writing or edited.
- **Original error visibility preserved**, per `journal/decisions.md` R24/R26: both corrections
  quote the original wrong text in-place inside a `> Correction (...)` block rather than silently
  overwriting it, matching the pattern the audit record already uses for its own two self-corrections
  in its Calibration section.
