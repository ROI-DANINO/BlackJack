# Import: PR #11 Salvage (2026-08-02)

Material rescued from PR #11 before it was closed unmerged. Tracked here — rather than in
`journal/raw/_inbox/`, which is gitignored — so it survives a fresh clone, because after the PR
closes the only other copy is a branch ref on a remote whose retention nobody here controls.

**Source:** branch `claude/correct-work-rwm8me` @ `01c6974175fb328ea038656518f3b0830655e086`,
PR [#11](https://github.com/ROI-DANINO/BlackJack/pull/11). The branch is **retained, not deleted**.

Dispositions use the project's 5 combinable labels:
**Accepted · Covered · Deferred · Rejected · Archived**.

## Why this PR was closed rather than merged

The branch relocated the kanban board to `journal/ops/tasks.md`, a path neither the spine engine nor
`scripts/kanban.ts` resolves. Nothing broke loudly — instead the **execution authority forked**, and
the two boards diverged: `LDB-04` reached `Done` on the branch while sitting in `Ready` on `main`,
and `LDB-06` reached `Verification`. Two Phase 4 cards were then owner-approved **twice, two days
apart, in sessions blind to each other**. Merging would have ratified the second approval.

The mechanical half of that failure is now guarded by check 6 in `scripts/check-doc-drift.sh`. The
judgement half is recorded in `journal/decisions.md`, 2026-08-02.

## Dispositions

| From the branch | Disposition | Where it went / why |
|---|---|---|
| `2026-07-30-evidence-and-mastery-rules.md` (LDB-04) | **Deferred** | Held here verbatim as **input** to the LDB-04 grill. Its body says *"APPROVED 2026-07-30"* — that is true of the branch and false of `main`, where LDB-04 is `Ready` at `Evidence: pending`. Banner added above the body; nothing in it may be cited as settled. |
| `2026-07-30-session-composition.md` (LDB-06) | **Deferred** | Same treatment, as input to LDB-06. Its own status line reads "draft for approval". |
| QA-019 — recap copy asserts unearned capability | **Accepted** | Landed in `journal/qa/ledger.md` on `main`, re-verified first-hand and **widened from the 1 instance the Phase 2 verdict names to the 16 that exist** across all 9 recap steps. Its rationale was rewritten off the branch-only `LDB-04 §6.3` citation and onto board milestone scope. |
| The unset-constant finding | **Accepted (corrected)** | `findings.md` §1. The branch's own count of four was wrong — it is **two**, and the durable finding is the self-check that could not fail on a missing value, not the number. |
| The playtest-note precedent | **Accepted (reshaped)** | `findings.md` §2. Verified against `journal/ops/run-notes.md`. Recorded as an argument for phase 5; it has nothing to anchor to until LDB-04/LDB-06 land constants. |
| `web/src/tuning/` + `web/src/notes/` (code) | **Rejected** | 314 lines of constants citing LDB-04/LDB-06 sections as approved. Landing them adopts in code the decisions this repo has not made — the same failure by another door. `journal/decisions.md`, 2026-08-02. |
| `TuningPanel` / `NoteBar` / `NoteField` + `App`/`Learn`/`Lesson` wiring | **Rejected** | The consumers of the above; they land or fall with it. |
| Board + phase relocation to `journal/ops/` | **Rejected** | This *is* the incident. Guarded by check 6. |
| `scripts/kanban.ts` and `scripts/check-doc-drift.sh` edits | **Rejected** | Purely the relocation — `DEFAULT_BOARD` and `BOARD`/`PHASE` repointed. Landing either re-breaks `main` exactly as `AGENTS.md` predicts. |
| Deletion of `scripts/check-ldb03-taxonomy.js` | **Rejected** | `journal/phase.md` cites it as the script that re-ran LDB-03's six criteria green. |
| `journal/qa/notes/README.md` | **Rejected** | Documents an in-app export flow for a note bar that does not exist on `main`. |

## Evidence standard applied

Every claim in `findings.md` was re-derived from the source on 2026-08-02, not inherited from the
branch's account of itself. Where the branch was wrong — the four-versus-two constant count — the
branch's wording is quoted and corrected rather than silently fixed, because that correction is
itself evidence about how such counts drift.

**Not re-performed:** the branch's test suite was never run, since none of its code was landed. No
claim here rests on it.

**Close condition met:** every file in the branch's 86-file diff has a disposition above.
**Reopen trigger:** the LDB-04 and LDB-06 grills, which must read the two deferred specs as
evidence — an argued position to answer, never a decision to inherit.
