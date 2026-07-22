# Landing Verification — Unit U6 (independent confirmer, third instance)

Confirming `landing/L-U6.md` against `audit/U6-audit.md` (post-landing), `verification/V-U6.md`
(what was asked), and `.pre-landing-copy/U6-audit.md` (true before-image).

## Verdict table

| C-U6-001 | LANDED | `audit/U6-audit.md:106-122` (CONFLICT-U6-A paragraph, requoted `:910-911` in full with "zero" restored; "implied-scope gap, not a stated-wrong-file error" wording landed; `<!-- LANDED C-U6-001 ... -->` marker at `:122`) |
| C-U6-002 | LANDED | `audit/U6-audit.md:54-55` (summary line now reads "Preserve 6, Relabel 2, Revise 1, Replace 0, Remove 0 (9 rows)"; `<!-- LANDED C-U6-002 ... -->` marker at `:55`) |

## Check 1 — C-U6-002, count reproduced independently

I re-enumerated `audit/U6-audit.md:44-52` myself, row by row:

| Row | ID | Verdict |
|---|---|---|
| :44 | K-U6-001 | Preserve |
| :45 | K-U6-002 | Preserve |
| :46 | K-U6-003 | Relabel |
| :47 | K-U6-004 | Preserve |
| :48 | K-U6-005 | Revise |
| :49 | K-U6-006 | Preserve |
| :50 | K-U6-007 | Preserve |
| :51 | K-U6-008 | Preserve |
| :52 | K-U6-009 | Relabel |

Distribution: **Preserve 6** (K-U6-001, -002, -004, -006, -007, -008), **Relabel 2** (K-U6-003,
K-U6-009), **Revise 1** (K-U6-005), Replace 0, Remove 0. **Total 9.** This matches the landed
summary line at `:54` verbatim: "Preserve 6, Relabel 2, Revise 1, Replace 0, Remove 0 (9 rows)."

Row-format check against `^\| *K-U6-[0-9]{3} *\| *(Preserve|Relabel|Revise|Replace|Remove) *\|`:
all nine rows (`:44`–`:52`) are single-line, unbroken, and match the pattern. No comment marker or
other content is embedded inside any table cell — the `<!-- LANDED C-U6-002 ... -->` marker sits
on its own line at `:55`, immediately below the table and the corrected summary line, not inside
it. The failure mode named in the dispatch (a marker splitting a row) did **not** recur here. Both
halves — the count fix and row survival — verified independently and both hold.

The pre-landing image (`.pre-landing-copy/U6-audit.md:54`) read "Preserve 5, Relabel 2, Revise 1,
Replace 0, Remove 0 (9 rows)" — 5+2+1=8 against the same sentence's own "(9 rows)," confirming the
defect V-U6.md described was real before landing.

## Check 2 — C-U6-001, quotation and requote reproduced

I opened `docs/superpowers/plans/2026-07-20-adaptive-learning-foundation-audit-phase2.md:895-919`
directly (not through the landing record's characterisation). Lines 910–911 read exactly:

```
910: Verified adjacent facts the auditor should test rather than assume: `basic_strategy_action` has zero
911: non-test callers, so the app never grades strategic correctness; `web/src/progress/**` is imported
```

Confirmed: line `:910` ends "has zero"; line `:911` begins "non-test callers, so the app never
grades strategic correctness;" — the sentence spans the break immediately after "zero," exactly as
the editor and verifier both reported.

**Pre-landing defect confirmed.** `.pre-landing-copy/U6-audit.md:107-108` quoted the plan as if it
said the identifier "has ... non-test callers" (fragment only, "zero" dropped), which inverts the
meaning — the plan says the identifier has **zero** non-test callers, not that it has non-test
callers.

**Landed requote confirmed verbatim.** `audit/U6-audit.md:107-110` now reads: "`...has zero
non-test callers, so the app never grades strategic correctness`" (quote closes before the plan's
trailing semicolon and the unrelated progress-import clause, which is a reasonable quote boundary,
not a meaning-altering truncation — the quoted material itself is complete and accurate, including
the restored "zero"). This matches the plan's actual text word for word.

**Second limb (file-attribution → implied-scope) confirmed by reading the plan's own text.** I read
`:901-912` in full: the U6 brief (`:903`, "U6 brief must state...") is scoped to
`web/src/learn/controller.ts:361`; the "Verified adjacent facts" sentence (`:910-912`) states the
`basic_strategy_action` fact and the `progress/**` import fact but names **no file path** for
`basic_strategy_action` anywhere in `:903-912`. The plan genuinely attributes no file to the
identifier, so the landed reframing — "the plan attributes no file to the identifier at all ... an
implied-scope gap, not a stated-wrong-file error" (`audit/U6-audit.md:117-121`) — is accurate to
the source, not merely asserted.

## Check 3 — retrievals actually performed

Both corrections are material (a quotation-inverting drop and an internally-impossible count), and
both carry recorded, reproducible retrievals in `landing/L-U6.md`. I independently repeated both
retrievals from primary sources (the plan file directly for C-U6-001; the audit's own verdict table
for C-U6-002) rather than trusting the landing record's narrative, and both reproduce exactly as
claimed. Neither correction is `NOT-LANDED` on retrieval grounds.

## Check 4 — anything changed outside the two anchors

Compared `audit/U6-audit.md` against `.pre-landing-copy/U6-audit.md` section by section (Scope
read table, Phase 1 dossiers list, all nine verdict rows' claim text, Survivors, Calibration,
Self-correction note, CONFLICT-U6-B, the full Citation-state table, Coverage gaps, and all six
Non-material notes). All of this content is byte-identical between the two versions (only shifted
by line number because of the two landed insertions and the two `<!-- LANDED ... -->` markers).
The only substantive changes are:
- `:54` — "Preserve 5" → "Preserve 6" (C-U6-002), plus a marker comment at `:55`.
- `:104-121` (pre-landing `:104-112`) — the CONFLICT-U6-A paragraph, requoted and reframed
  (C-U6-001), plus a marker comment at `:122`.

No change outside these two anchors and their markers. **No `ALTERED` finding.**

## Web/ scope check

Nothing under `web/` was read or referenced as a write target by either correction — both act
purely on the audit record's own prose and on the (docs-scope) plan file. `landing/L-U6.md`'s own
retrieval note states both retrievals were performed "directly against the plan file and the audit
file already in this run's write scope — no `WebSearch`, no new source," and neither correction's
remedy (both `editorial`) touches code. I have no Bash/git access in this role and therefore cannot
run a diff against `web/` directly; my confirmation here rests on (a) the corrections' own scope
being confined to prose in `docs/` and the audit record, (b) the landing record's explicit
retrieval-target list containing no `web/` path, and (c) the audit record's own unchanged
self-attestation at `:4` ("No file outside this record was written, and no product code was
changed"). I did not find any indication, direct or indirect, that a `web/` file was touched.

## Verdict-row and verbatim summary

- C-U6-001: **LANDED.**
- C-U6-002: **LANDED.**
- Verdict-row distribution I counted myself: **Preserve 6, Relabel 2, Revise 1, Replace 0, Remove 0,
  9 rows total** — matches the landed summary line exactly.
- The dropped-"zero" quotation defect is real pre-landing and the landed requote is verbatim and
  complete, confirmed by opening the plan file directly.
- The file-attribution → implied-scope reframing is accurate to the plan's own text (no file
  attributed to the identifier anywhere in `:903-912`).
- Both retrievals reproduce independently.
- No change outside the two correction anchors and their markers.
- No evidence of any `web/` file modification (see caveat on tooling above).

## Noticed but not raised (routed to orchestrator, not numbered)

- The landed C-U6-001 text quotes the plan sentence up to "strategic correctness" and omits the
  trailing semicolon and the immediately following progress-import clause without an ellipsis. This
  is a quote-boundary choice, not a meaning change (the omitted material is a separate, unrelated
  fact already handled by CONFLICT-U6-B), and V-U6.md's own anchor/verbatim check flagged an
  analogous unmarked truncation elsewhere in this same record (`controller.ts:210`) as a
  "non-material note," not a correction. I judge this the same way and do not raise it.
- No other discrepancies noticed.
