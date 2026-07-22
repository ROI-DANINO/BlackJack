# Landing Verification — Unit U8

Role: independent landing confirmer (third instance). Judges only; no Edit tool used; nothing
modified.

Confirmed against: `landing/L-U8.md` (4 corrections claimed landed) × `audit/U8-audit.md`
(post-landing, live) × `verification/V-U8.md` (what was asked) × `.pre-landing-copy/U8-audit.md`
(true pre-landing byte image for this unit).

## Verdict table

| C-U8-001 | LANDED | New `### Post-verification correction — coverage gap...` subsection under `## Calibration` (audit lines 44-64) + `<!-- LANDED C-U8-001 -->` marker (line 66) |
| C-U8-002 | LANDED | New `### Post-verification correction — live authority-vs-authority drift...` subsection under `## Calibration` (audit lines 68-87) + `<!-- LANDED C-U8-002 -->` marker (line 89) |
| C-U8-003 | LANDED | New paragraph under the existing `qa-playtest-process.md:117-127` bullet in `## Non-material notes` (audit lines 100-108) + `<!-- LANDED C-U8-003 -->` marker (line 110) |
| C-U8-004 | LANDED | New closing section `## Post-verification correction — citation-anchor error in K-U8-002` (audit lines 138-150) + `<!-- LANDED C-U8-004 -->` marker (line 152) |

All four are `LANDED`. None is `NOT-LANDED` or `ALTERED`.

## Ruling on the bold-`must` quote-fidelity divergence

**The editor was right to diverge.** I opened `docs/specs/qa-playtest-process.md:129-147` directly.
Line 132 reads, verbatim and with no bold markup anywhere in the line:

```
132:learner progress, its QA must verify all of the following:
```

`V-U8.md` line 88 (the `C-U8-001` correction text) renders this as `"its QA **must** verify all of
the following:"` — bolded. The live source carries no such emphasis. The landed audit text
(`U8-audit.md:49-50`) quotes it plain — `"its QA must verify all of the following:"` — matching the
source exactly, and adds an explicit quote-fidelity note (`U8-audit.md:62-64`) rather than silently
propagating the verifier's rendering. This is the correct call: added emphasis inside quotation marks
makes a source read as more prescriptive than it wrote itself, which is exactly the defect class this
program was burned by. The verification record (`V-U8.md`) carries the error uncorrected — that is
expected and outside my write scope — and the audit record is now the accurate one. I did not find
any other quote in the four corrections carrying invented emphasis.

## Retrievals reproduced

I independently opened and read, at the stated anchors, all of the following (not a keyword grep —
full read of the surrounding block in each case):

- `docs/specs/qa-playtest-process.md:1-159` (full file through the Learning-integrity contract and
  the Tier-1 gate enumeration at `:31-33`). Confirmed `:122` reads verbatim "| Learning / Tutorial QA
  | any learning, drill, or explanation layer exists (V2) |"; confirmed `:31-33` enumerates only
  `qa:rules` + `qa:flow` + `qa:breakit`, no `qa:learn`; confirmed `:131-132`, `:139-140`, `:143-144`
  verbatim, no bold on "must".
- `journal/qa/ledger.md:1-40` (coverage-areas table). Confirmed row 19 ("Blackjack Basics learning
  system") contains "`qa:learn` passed 9/9 units"; row 23 ("QA script suite") contains "`npm --prefix
  web run qa` passed rules → flow → breakit → learn"; row 25 ("Durable learner progress
  (ProgressStore)") contains "Six-row learning-integrity contract mapped with explicit verdicts (2
  PASS, 1 PASS-precondition, 3 N/A — no grading/recommendations/UI exist yet)" and "Bundle-delta gate
  PASS: `idb` costs 1,382 bytes gzipped (≈1.35 KB), well under the 5 KB alarm."
- `ROADMAP.md:1-100`. Confirmed `:43` reads verbatim "The active slice (AL-D1) builds the cycle-1
  foundation only: port, versioned envelope/attempt record, and a provider-neutral contract suite
  proven headless against fixtures." and "`idb` 8.0.3 is admitted — conditionally, pending a
  production bundle-delta check".
- `PROGRESS.md:1-110`. Confirmed `:53` reads "**AL-D1 complete — the cycle-1 `ProgressStore` design
  and its 11-task TDD plan are approved** (2026-07-17)."; `:64-65` read "## In progress" / "-
  **AL-B1 — build the cycle-1 foundation.**"; `:19` reads "`qa:learn` now owns learning-path QA.";
  `:62` reads "...two dropped learning-integrity QA gates restored...".
- `docs/superpowers/specs/2026-07-12-foundation-and-tracks-design.md:80-199` — both anchors for the
  misplaced citation. `:177` reads in full: "- **Boundary Change Checklist** — *names* the discipline
  that already exists (freshness guard, golden fixtures, contract test, integer money end-to-end) and
  closes its three known-open gaps: (a) freshness guard must watch `Cargo.lock` + `build-wasm.sh`;
  (b) a native↔wasm32 parity run over the real artifact; (c) revisit the `writePending` race when a
  truly async sink lands." — no "usize-width bug", no QA-001/002 anywhere in `:176-179`. `:92` reads
  verbatim: "This is the **only** family with real failure evidence (usize-width bug dealt a
  different shoe on wasm32 with native tests green; stale-WASM blocker QA-001/002)." — confirming the
  editor's correction is accurate: the quoted evidence is at `:92`, not `:177-179`.

Every quote reproduced above matches both the landing record's claimed retrieval and the live audit
text, verbatim, at the stated line.

## Product-document boundary — recorded, not repaired

`ROADMAP.md`, `PROGRESS.md`, and `docs/specs/qa-playtest-process.md` still contain the exact drifted
text quoted in the corrections (ROADMAP `:43` still calls AL-D1 the "active slice"; PROGRESS `:53`
still calls AL-D1 "complete"; `:64-65` still lists AL-B1 as "In progress"; qa-playtest-process `:31-33`
still omits `qa:learn` from the Tier-1 enumeration) — i.e. the drift these corrections describe is
still live in the product documents themselves, which is only possible if the editor did not
"reconcile" them. The audit record's own prose is explicit about this: `U8-audit.md:85-87` states "This
note records the drift for the reader; it does not reconcile `ROADMAP.md` or `PROGRESS.md` — that
reconciliation is a separate, already-scheduled act outside this audit's charter," and the C-U8-003
landing similarly only records the contradiction without proposing or performing a fix. Neither
correction's landed text reads as though the underlying documents were changed. Confirmed
recorded-not-repaired.

## Verdict-row count

Grepped `audit/U8-audit.md` for `^\| *K-U8-[0-9]{3} *\|`: **7 matches**, lines 20-26
(`K-U8-001` through `K-U8-007`), all `Preserve`. No row was added — `C-U8-001` (the coverage gap over
a section the audit never examined) correctly produced a prose note, not an eighth verdict row, matching
the dispatch's expectation exactly. Count = 7, not 8.

## Diff against the before-image

Compared `.pre-landing-copy/U8-audit.md` (76 lines) against the live `audit/U8-audit.md` (154 lines)
line-by-line. Lines 1-42 (header, authority-surfaces note, verdict table, and the opening of
`## Calibration`) are byte-identical between the two. The `## Non-material notes` bullets that are
not touched by `C-U8-003` — the `ROADMAP.md:39-48` "Need-activated platform capabilities" bullet, the
§5-§6/§9-§10 bullet, the `architecture.md:6-10,12-29` bullet, the `ROADMAP.md:1-18,50-64,133-157`
bullet, the `PROGRESS.md:5-26,53,87-105` bullet, and the closing §12 addendum bullet — are also
byte-identical in the live file (post-landing lines 112-136 match pre-landing lines 52-76 exactly).
The only deltas are the four correction insertions (two new `## Calibration` subsections, one
inserted paragraph inside the existing Parked-agents bullet, one new closing section) plus their four
`<!-- LANDED -->` markers. Nothing else in the record changed.

## Sufficiency / scope note

Not applicable to this pass — sufficiency is `V-U8.md`'s finding, not mine to re-litigate. No new
corrections raised.

## Confirmation

This file was re-read from disk with `Read` after writing, before this return was composed.

## Anything noticed but not raised

- The K-U8-002 table row's Claim-cell citation still reads `:177-179` uncorrected (the stale anchor
  sits inside the untouched verdict row); the fix lives only in the appended `C-U8-004` closing
  section rather than in the row itself. This is the correct editorial choice given the verdict-row
  invariant (editing the row's citation cell would have been a row edit, which the landing pass
  correctly avoided), and `V-U8.md` itself scoped the remedy this way ("editorial — correct anchor is
  in the same already-open file"). Not a defect; noted for completeness only.
- `V-U8.md`'s own C-U8-001 quote (line 88) is the one that carries the unbolded-to-bolded divergence;
  I did not find a second instance of invented emphasis in any of the other three corrections'
  verifier-side quotes.
