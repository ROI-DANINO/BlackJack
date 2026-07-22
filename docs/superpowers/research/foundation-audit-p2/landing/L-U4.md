# Landing record — Unit U4

> Corrections raised in `verification/V-U4.md` and landed into `audit/U4-audit.md`.
> Run: foundation-audit-p2. Landing target is the **audit record**; the audited unit
> `docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md` was read but
> **not** edited, per the charter.
> This pass: 2026-07-22. It also repaired marker damage left by a prior landing pass that was
> interrupted mid-flight (see "Damage repaired", below).

All four corrections are remedy mode `editorial` — no new collection, no `WebSearch`.
No verdict was changed by any of them. Verdict-row count at the end of this pass: **18**
(`K-U4-001`–`K-U4-018`), matching the pre-existing invariant.

## Corrections landed

| ID | Anchor in `audit/U4-audit.md` | Retrieval actually performed |
|----|----|----|
| C-U4-001 | `K-U4-002` row (Preserve, unchanged) + the "Correction landed — C-U4-001" passage under the "Citations re-verified" table | **Prior landing pass**, first-hand web retrieval of DUO-002 at `https://blog.duolingo.com/guide-to-duolingo-practice-hub/` (2026-07-21): page names *Mistakes* / *Words* / *Speak* / *Listen* / *Stories* / *Radio* / *Adventures*, with the Words caption "A Duolingo exercise where the learner has to choose a French vocabulary word in the left column and match it to the corresponding English word in the right column." **This pass performed no new retrieval for C-U4-001**; it read the landed passage in `audit/U4-audit.md` and confirmed the substantive edit is present (false "confirmed via the DUO-001/BRI-001 re-opening pass" basis struck and visibly preserved; replacement basis states the direct retrieval). Only the marker placement was changed. |
| C-U4-002 | `K-U4-008` row (Preserve, unchanged) — the in-cell "Self-correction (C-U4-002)" block | **Prior landing pass**, re-transcription of Brummer et al. (2024), *Learning Environments Research* 27:453–476, p. 466, from the open-access version of record (`10.1007/s10984-024-09501-4`), 2026-07-21. **This pass performed no new retrieval for C-U4-002**; it read the landed cell and confirmed the verbatim sentence — "With regard to feedback timing, both immediate and delayed feedback had significant and strong effects on improving learning performance, with delayed feedback being slightly more effective than immediate feedback." — is present, and that the superseded paraphrase ("Both immediate and delayed feedback showed significant effects") is preserved in-cell rather than back-filled. Only the marker placement was changed. |
| C-U4-003 | "Examined and deliberately left alone" section, the **ALR-007 through ALR-012** bullet | **This pass**, first-hand read of the audited unit `docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md` lines 150–199, reading each Evidence field verbatim: `:159` ALR-007 "`DUO-002`, `BRI-001`, `SCI-004`, `SCI-009`"; `:165` ALR-008 "**INFERENCE:** public representation boundaries in `DUO-004`, `TECH-001`, `TECH-002`"; `:171` ALR-009 "**PUBLISHED/INFERENCE:** `TECH-002`"; `:177` ALR-010 "`TECH-001`, `TECH-002`"; `:183` ALR-011 "**INFERENCE:** guidance fading in `SCI-004`, `SCI-009`"; `:189` ALR-012 "**PUBLISHED/INFERENCE:** `STD-001`, `STD-002`". Verifier's quotations independently confirmed, not taken on trust. |
| C-U4-004 | "Examined and deliberately left alone" section heading + opening paragraph | **This pass**, first-hand enumeration of the audited unit's full `ALR-` heading list (pattern `**ALR-NNN —`), returning 41 headings from `ALR-001` at `:119` to `ALR-041` at `:369`, cross-checked against every requirement ID named in `audit/U4-audit.md`. Result: 13 requirements carry neither a verdict row nor a left-alone statement. This **diverges from the verification record**, which lists 14 by including `ALR-022`; `ALR-022` does have a row (`K-U4-013`, citing `…-research.md:253`). The corrected figure 13 is recorded in the audit record with the divergence stated openly. |

## Damage repaired (prior pass, not a correction)

A prior landing pass placed its `LANDED` markers **inside the verdict cell** of two table rows,
displacing the verdict word and removing those rows from the gate's verdict-row grammar
(`^\| *K-U4-[0-9]{3} *\| *(Preserve|Relabel|Revise|Replace|Remove) *\|`); the unit's parsing count
had fallen from 18 to 16.

- `K-U4-002` — restored to `| K-U4-002 | Preserve | … |`; marker moved to its own line below the row.
- `K-U4-008` — restored to `| K-U4-008 | Preserve | … |`; marker moved to its own line below the row.

Both were `Preserve` before the damage and are `Preserve` after the repair. **No verdict was
changed**; the claim and citation cell contents were preserved verbatim. The standalone marker under
the "Citations re-verified" table was already correctly placed and was left untouched. Parsing
verdict-row count re-checked after editing: **18**, IDs `K-U4-001`–`K-U4-018` contiguous, with
counts Preserve 13 / Relabel 2 / Revise 3 / Replace 0 / Remove 0 — unchanged from the record's own
"Counts" line.

## Marker convention used

`<!-- LANDED C-U4-NNN (V-U4, editorial): <one line> -->` on its **own line, immediately below the
affected row or block**. Never inside a table row or cell.

## Not landed

None. All four corrections raised in `V-U4.md` are landed in the audit record itself.
