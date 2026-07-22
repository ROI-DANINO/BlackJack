# Landing — Unit U6

Corrections from `verification/V-U6.md` landed into `audit/U6-audit.md`. Both are remedy mode
`editorial`; neither changes a verdict. Verdict-row count preserved at 9
(`K-U6-001`…`K-U6-009`; Preserve 6, Relabel 2, Revise 1) — reconfirmed by direct enumeration of
`audit/U6-audit.md:44-52` after landing, matching the pre-landing count.

| ID | Anchor in `audit/U6-audit.md` | Retrieval actually performed |
|----|----|----|
| C-U6-001 | CONFLICT-U6-A paragraph (originally `:104-110`, now the CONFLICT-U6-A paragraph immediately preceding CONFLICT-U6-B) | Opened `docs/superpowers/plans/2026-07-20-adaptive-learning-foundation-audit-phase2.md` directly (offset 895, limit 25) and read `:903-912` in full. Confirmed verbatim: line `:910` ends `` `basic_strategy_action` has zero `` and line `:911` begins `` non-test callers, so the app never grades strategic correctness; ``, i.e. the sentence spans the line break immediately after the word "zero". Confirmed the record's prior quotation ("states the identifier has \"non-test callers, so the app never grades strategic correctness\"") drops "zero" and thereby inverts the plan's meaning. Confirmed the plan attributes no file to the identifier anywhere in `:903-912` — the U6 brief at `:903` is `web/`-scoped, and the identifier's actual location (`crates/blackjack-core/src/strategy.rs:140`) is stated nowhere in the plan text, so "its file-scope attribution is not [correct]" overstated a claim the plan never made. Landed: requoted `:910-911` whole (governing word "zero" restored) and replaced the file-scope-attribution wording with "the plan attributes no file to the identifier at all … an implied-scope gap, not a stated-wrong-file error." Original wording preserved in-record as an explicit "Correction (C-U6-001): an earlier draft … " note per the self-correcting-in-record convention, not silently back-filled. |
| C-U6-002 | Verdict-counts summary line (originally `:54`, now immediately below the verdict table at `:44-52`) | Independently re-enumerated the nine-row verdict table at `audit/U6-audit.md:44-52` (own Grep against `^\| *K-U6-[0-9]{3} *\| *(Preserve\|Relabel\|Revise\|Replace\|Remove) *\|`, confirmed 9 matches K-U6-001…K-U6-009) rather than trusting either the verifier's count or the record's own summary line. Counted verdicts directly from the row text: Preserve — K-U6-001, -002, -004, -006, -007, -008 (6); Relabel — K-U6-003, -009 (2); Revise — K-U6-005 (1); Replace 0; Remove 0. Total 6+2+1 = 9, matching the row count. Confirmed the pre-landing summary line read "Preserve 5, Relabel 2, Revise 1, Replace 0, Remove 0 (9 rows)" — internally impossible (5+2+1=8 against the same sentence's own "9 rows"). Landed: corrected "Preserve 5" to "Preserve 6" in the summary line. |

## Not landed / deferred

None. Both corrections reproduced against direct retrieval and were landed as stated by the
verifier, with no verdict change.

## Retrieval note

Both retrievals were performed directly against the plan file and the audit file already in this
run's write scope — no `WebSearch`, no new source. `WebFetch` was not needed (both sources are
local repo files, read via the `Read`/`Grep` tools).
