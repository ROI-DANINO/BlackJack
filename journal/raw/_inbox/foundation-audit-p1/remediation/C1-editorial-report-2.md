# C1 Editorial Correction Report 2 (C1-ED2)

> Corrector: Claude Opus 4.8 (1M) — editorial role, no collection performed
> Date: 2026-07-20
> Instruction set: `journal/raw/_inbox/foundation-audit-p1/verification/W2-C1-W-final.md` §6 and §3
> Scope: exactly two hygiene fixes. No source was collected. No `git`, build, test, or install
> command was run. Nothing outside `journal/raw/_inbox/foundation-audit-p1/` was touched.
> C1-ED2 is a corrector, not a verifier: nothing changed here is self-verified.

---

## Fix 1 — quote marks around non-verbatim text (dossier §"Effect on the HEAD STATEMENT", ~line 1183)

**What the dossier said:**

> …the expert arm collects no responses, yet the question put to the expert is literally "what
> percentage of students will answer this item correctly", and the yardstick is a government agency's
> population calibration.

**What F28 actually says** (§2.2.1, verbatim; confirmed present verbatim elsewhere in the same dossier
section and independently re-extracted by W2 from its own `pdftotext` output):

> "What is, according to you, the percentage of students that will answer this item correctly after
> completing secondary education?"

**Defect:** quotation marks around a compressed rendering — "students **that** will" → "students will",
and "after completing secondary education" dropped. Meaning is preserved and the full verbatim quote
appears earlier in the same section, so this is **not** a distortion and not a kill. It is the Phase 1
defect class (paraphrase presented as quotation) and the one item not covered by C1-W's own 19/19
verbatim count.

**Remedy applied:** the **full sentence restored verbatim**, italicised, in place of the compressed
rendering. This was the preferred remedy per the dispatch and it reads cleanly in context — the
restored clause "after completing secondary education" in fact *strengthens* the sentence's own
argument, since it names the reference population explicitly and so makes the population-light point
more directly than the compressed form did.

**No claim, figure, tier, or verdict changed.** Same sentence, same conclusion.

---

## Fix 2 — stale head count

**What the dossier's head block said:** "Running total: **26 citations** — 9 original + 12 (C1-FP) +
5 (C1-R2)."

**Why it was stale:** C1-W appended F28 and F29 under strict append-only and therefore could not edit
the head block. Per W2 §3 this is **the correct cost of that discipline, not a defect by the
collecting pass**, and is flagged for reconciliation rather than charged.

**Method — counted independently, not inherited.** Per the dispatch's explicit warning about a prior
wrong replacement count, the figure below was derived by enumerating the dossier's own `Source(s):`
and `Source:` lines and de-duplicating them, not by adding 2 to any previously reported total.

### Reconciled count

**27 distinct sources cited**, of which **1 (F29) is partial-access** — abstract verified verbatim,
body UNVERIFIABLE.

| Pass | Findings | Distinct sources added | Note |
|---|---|---|---|
| Initial collection | F1–F10 | **8** | F5 re-cites F3's source (Piech et al. 2015); F6 re-cites F2's (Pavlik et al. 2009) |
| Focused pass C1-FP | F11–F21 | **12** | F21 cites two sources (Schroeders & Gnambs 2025; Linacre 1994) |
| Remediation pass C1-R2 | F22–F26 (+F27) | **5** | F27 is a re-read of F19's source — correctly adds no citation |
| Amendment-6 top-up C1-W | F28, F29 | **2** | F28 full text; F29 partial (abstract only) |
| **Total** | **29 finding IDs** | **27** | |

Initial-collection and top-up figures are kept **separable**, as amendment 5 requires. The
reconciliation was written into the dossier head block as a labelled `HEAD-COUNT RECONCILIATION`
insertion; the superseded "26 citations" line is struck and marked `SUPERSEDED` rather than deleted,
per the dossier's existing convention. No finding ID was removed or renumbered.

### One observation, recorded not charged

The legacy **"9 original"** figure is **one higher** than the 8 distinct sources actually cited by
F1–F10. That off-by-one is the reason the running total read 26 rather than 25 before this top-up, and
it also explains why the pre-existing head line reads "Citations collected: 21 total" where F1–F21
cite 20 distinct sources. The discrepancy **predates C1-W and predates C1-R2** — it originates in the
initial collector's own self-QA line ("Citation count is within the depth budget (9, within 6–12)").

This is recorded, not fixed: rewriting a prior pass's own declared figure is outside this pass's
two-fix scope, and the prior passes' declarations are left exactly as they recorded them. Only the
**total** is reconciled, and the note in the dossier head states plainly where the difference comes
from so no downstream reader has to re-derive it.

Consequence for C1-W: **none.** C1-W's own accounting ("running total was 26; adds 1 full + 1
partial") was arithmetically correct given the baseline it inherited. The 27 figure differs from
C1-W's "27 full + 1 partial" only in that (a) the inherited baseline carried the legacy off-by-one,
and (b) "full" is not a safe label for the whole legacy set — F25's body is marked UNVERIFIABLE by
C1-EC and several earlier sources are abstract-scope. The reconciled figure therefore counts
**distinct sources cited**, and flags partial access only where the dossier itself has established it
(F29). This is a labelling correction to the axis, not a charge against C1-W.

---

## What was examined and deliberately left unchanged

- **C1's INSUFFICIENT sufficiency verdict** — the user-approved, honest COVERAGE GAP. Not re-opened,
  not re-litigated, not touched.
- **The headline r(23)=0.80 and the full six-method ranking** — W2 independently confirmed every
  figure verbatim. Left exactly as written.
- **All three counterweights**, the ~100-students fencing, the ".76 is Yancey not Wauters" check, the
  F27 tier decision, the source-independence disclosure, and the settled-gap table — all confirmed by
  W2 as present and correct. Untouched.
- **F29's UNVERIFIABLE marking** — honest across four independently re-run routes. Untouched.
- **The six registered adjacent leads** — genuine F28 reference-list items, correctly left unchased.
  Not chased here either; this pass collected nothing.
- **W2 §6's second, self-described "trivial/cosmetic" item** (the C1-W section self-quoting the settled
  gap as "(a) no evaluation…" where the table at line 824 capitalises "No") — **left unchanged**, and
  deliberately so. It was not in the two-fix dispatch, it is a capitalisation difference inside a
  self-quote of the dossier's own text, and changing it would be the kind of cosmetic inflation this
  program has explicitly warned against. Recorded here so the decision is visible rather than silent.

## Calibration statement

Both changes are hygiene. Neither is a finding. Neither changes a number, a tier, a verdict, a
sufficiency judgement, or the direction of any claim. Fix 1 makes a quotation honest; Fix 2 makes a
count current. The only substantive thing surfaced is the pre-existing off-by-one in the initial
collector's citation figure, which is reported as an observation with its provenance named — it is not
charged against any pass, and it changes no conclusion in the dossier. **No fifth manufactured defect
is offered here.**
