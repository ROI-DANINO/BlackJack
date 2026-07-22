# Landing — Unit U8

Source: `journal/raw/_inbox/foundation-audit-p2/verification/V-U8.md`, corrections `C-U8-001`
through `C-U8-004`, all remedy mode `editorial`. All four are landed into
`audit/U8-audit.md`. No verdict changed; all 7 `Preserve` rows stand unmodified. No file outside
`audit/U8-audit.md` and this landing record was written to.

| ID | Anchor in `audit/U8-audit.md` | Retrieval actually performed |
|----|----|----|
| C-U8-001 | New `### Post-verification correction — coverage gap...` subsection under `## Calibration`, plus a `<!-- LANDED C-U8-001 -->` marker on its own line immediately after | Opened `docs/specs/qa-playtest-process.md:100-159` directly and read the "Learning-integrity contract" block in full (`:129-147`). Confirmed the six-check list and quoted `:131-132`, `:139-140`, `:143-144` verbatim against the live file. Cross-opened `journal/qa/ledger.md` in full and confirmed row 25 (`Durable learner progress (ProgressStore)`) carries "Six-row learning-integrity contract mapped with explicit verdicts (2 PASS, 1 PASS-precondition, 3 N/A — no grading/recommendations/UI exist yet)" and the "Learning-integrity contract detail" section (`:81-133`) backing it with a real per-row table. Cross-opened `PROGRESS.md:1-110` and confirmed line 62 reads "two dropped learning-integrity QA gates restored." **Discrepancy found and corrected in the landing, not silently propagated:** the verifier's quote rendered "must" as bolded (`**must**`); the live source at `:132` carries no bold markup there. Landed the quote as it actually appears, with an explicit quote-fidelity note; the substance of the correction (the block is real, unexamined, and material) reproduces. |
| C-U8-002 | New `### Post-verification correction — live authority-vs-authority drift...` subsection under `## Calibration`, plus a `<!-- LANDED C-U8-002 -->` marker on its own line immediately after | Opened `ROADMAP.md:1-100` directly and confirmed `:43` reads verbatim "The active slice (AL-D1) builds the cycle-1 foundation only: port, versioned envelope/attempt record, and a provider-neutral contract suite proven headless against fixtures." and "`idb` 8.0.3 is admitted — conditionally, pending a production bundle-delta check". Opened `PROGRESS.md:1-110` directly and confirmed `:53` reads "**AL-D1 complete — the cycle-1 `ProgressStore` design and its 11-task TDD plan are approved** (2026-07-17)." and `:64-65` read "## In progress" / "- **AL-B1 — build the cycle-1 foundation.**". Cross-opened `journal/qa/ledger.md:25` and confirmed "Bundle-delta gate PASS: `idb` costs 1,382 bytes gzipped (≈1.35 KB), well under the 5 KB alarm." Both sides of the contradiction verified open, at the stated anchors, as stated — the drift is real, not asserted. |
| C-U8-003 | New paragraph directly under the existing `docs/specs/qa-playtest-process.md:117-127` bullet in `## Non-material notes`, plus a `<!-- LANDED C-U8-003 -->` marker on its own line immediately after | Opened `docs/specs/qa-playtest-process.md:100-159` directly and confirmed `:122` reads "| Learning / Tutorial QA | any learning, drill, or explanation layer exists (V2) |" and `:31-33` still enumerate "the `web/qa/` suite: `qa:rules` + `qa:flow` + `qa:breakit`" (no `qa:learn`). Opened `PROGRESS.md:1-110` and confirmed `:19` reads "`qa:learn` now owns learning-path QA." Opened `journal/qa/ledger.md` in full and confirmed row 19 ("Blackjack Basics learning system") records "`qa:learn` passed 9/9 units" and row 23 ("QA script suite") records "`npm --prefix web run qa` passed rules → flow → breakit → learn". All four anchors reproduce as quoted; the contradiction between the process doc's stale enumeration/demotion and the ledger's actual practice is real. |
| C-U8-004 | New closing section `## Post-verification correction — citation-anchor error in K-U8-002` at the end of the file, plus a `<!-- LANDED C-U8-004 -->` marker on its own line immediately after | Opened `docs/superpowers/specs/2026-07-12-foundation-and-tracks-design.md:170-214` and confirmed `:177` reads the Boundary Change Checklist paragraph (freshness guard / golden fixtures / three known-open gaps) with no "usize-width bug" or QA-001/QA-002 text anywhere in `:176-179`. Separately opened `:85-99` and confirmed the actual quote — "This is the **only** family with real failure evidence (usize-width bug dealt a different shoe on wasm32 with native tests green; stale-WASM blocker QA-001/QA-002)." — sits at `:92`, inside the "Cross-target determinism parity" row. Anchor correction confirmed against the live file; K-U8-002's `Preserve` verdict is untouched. |

## Verdict-row invariant check

`grep -c '^\| *K-U8-[0-9]\{3\} *\| *(Preserve|Relabel|Revise|Replace|Remove) *\|'` against
`audit/U8-audit.md` after all four corrections landed: **7**, all `Preserve`. No row was added,
removed, or reworded; no marker was placed inside a table row or between table rows — all four
markers sit on their own line in prose (Calibration subsections, a Non-material-notes bullet's
sub-paragraph, and a closing section), after the verdict table or between list bullets, never
between table rows.

## Boundary confirmation

`ROADMAP.md`, `PROGRESS.md`, and `docs/specs/qa-playtest-process.md` were opened and read (multiple
times, at the specific anchors above) but not modified. No file outside
`journal/raw/_inbox/foundation-audit-p2/audit/U8-audit.md` and
`journal/raw/_inbox/foundation-audit-p2/landing/L-U8.md` was written to.
