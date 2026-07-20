# C3 — Deliberate practice · editorial correction pass

**Dispatch as:** `audit-editor` · model `opus` · Wave 1 (parallel with C1, C2, C4, C5)

## Where this fits
C3 is currently **SUFFICIENT**. Your job is **not** to re-open that verdict — it is to discharge an
editorial defect that survived it: the dossier still headlines figures the authors themselves
superseded in a 2018 corrigendum. A dossier can be sufficient and still misreport what it holds.

## Remedy type: editorial, NOT collection
Amendment 7. You have **no WebSearch** — you structurally cannot collect. WebFetch only re-reads
sources the dossier **already cites**. C3 needs no new collection unless your correction exposes a
genuine evidence gap — if it does, report a `Blocker`; do not go collecting.

## Read first
1. `journal/raw/_inbox/foundation-audit-p1/C3-deliberate-practice/dossier.md`
2. `journal/raw/_inbox/foundation-audit-p1/verification/V3-deliberate-practice.md`
3. `journal/raw/_inbox/foundation-audit-p1/verification/V3b-deliberate-practice-toppedup.md` — the record
   that first distinguished *missing evidence* from *misdescribed evidence*, creating this role
4. `journal/raw/_inbox/foundation-audit-p1/_templates/evidence-quality-rubric.md`

## Required corrections

### 1. The 2018 corrigendum — the headline defect
Macnamara et al.'s own corrigendum superseded the F3 figures. It was **appended to the PDF already read**.

| Domain / statistic | Original (2014) | Corrigendum (2018) |
|---|---|---|
| Games | 26% | **24%** |
| Music | 21% | **23%** |
| Sports | 18% | **20%** |
| r | .35 | **.38** |
| Variance explained | 12% | **14%** |

- Replace or clearly mark **all** superseded headline figures.
- Preserve originals **only** where historical comparison genuinely needs them — and mark them as
  superseded, naming the corrigendum and year.
- Corrected values **and attribution** must appear in the dossier itself, not only in verifier notes.

### 2. Quote / paraphrase / attribution issues already identified
- A sub-claim was **KILLED for a sign-flip**: "defensible" appears **nowhere** in Ericsson & Harwell.
  The phrase is Macnamara's, quoted in order to be **rebutted**. Confirm it has not been reintroduced.
- F6 Q2→Q3.
- Attribution was swapped between F3 and F7 — verify it is now correct.
- **Three "verbatim quotes" are paraphrases.** Restore true verbatim text or remove the quote marks.
- F9 range 36.0 → **32.1**–87.1%.
- F10 "rankings unchanged" is true of the **main model only** — scope the claim.

### 3. The interpretation defect that matters most for the product
Predictability is a **continuous meta-regression moderator**, so "24/12/4%" are **fitted values, not
subgroup means**. Corrected: 23/14/**6%**. There are **no bands to place blackjack into — there is a
slope**, and "low predictability" was operationalised from tasks like handling an aviation emergency.
The dossier must not invite slotting blackjack into a tier; that is analogy, not measurement.

Also: conflict #14 — the 61% figure vs the overcorrection rebuttal turns on a reliability assumption
(0.60) **lower than Ericsson's own published estimates (0.70–0.80)**; at 0.80 the same data yields
**49%**. Any use of 61% must carry that dependency.

## Calibration
If a claim is accurate as written, **leave it and say so**. If a prior correction over-corrected,
reverse it. Upgrades are legitimate findings.

## Output
Edit in place, preserving structure and finding IDs.
Report → `journal/raw/_inbox/foundation-audit-p1/remediation/C3-editorial-report.md`, listing every
finding ID changed and every one examined and left unchanged.
**Do not append to the shared registers** — return rows in your response text.
State explicitly whether C3's **SUFFICIENT verdict still stands** after your corrections.

Return: `Card`, `Result`, `Evidence`, `Next`, `Files`, `Blocker`.
