# Verification Record: W7 — C1-ED2 (editorial repair pass, two hygiene fixes)

> Verifier: Claude Opus 4.8 (1M) — fresh independent verifier, did NOT perform C1-ED2 and did not
> perform C1-W or W2  |  Date: 2026-07-20
> Scope: the two repairs named in `W2-C1-W-final.md` §6 and §3. No collection. No scope expansion.
> C1's INSUFFICIENT verdict is the user-approved COVERAGE GAP and was not re-opened.

**VERDICT ON C1-ED2: PASS.**

Both fixes are correct and complete. No third edit was found. No new defect is offered.

---

## 1. Fix 1 — quote marks around non-verbatim text

**Independently re-retrieved F28**, not inherited from any report:

- `curl -sL` of the EDM 2011 URL printed in the dossier (line 981) → **367,851 bytes**, matching
  W2's independently reported byte count exactly.
- Own `pdftotext -layout` extraction → 392 lines (matches W2's 392).
- F28 §2.2.1, my own extraction, lines 218–219, verbatim:

  > Second, the expert was asked: “What is, according to you, the percentage of students that will
  > answer this item correctly after completing secondary education?”.

**Dossier now reads (lines 1197–1199):**

> …the question put to the expert is literally *"What is, according to you, the percentage of
> students that will answer this item correctly after completing secondary education?"*, and the
> yardstick is a government agency's population calibration.

**Result: character-for-character match against the source.** `VERIFIED`.

- The compressed rendering is **gone**: `grep -n "students will answer" dossier.md` returns **zero
  hits** across the whole dossier.
- The pass chose *restore* over *drop the quote marks*. W2 §6 offered both; restoration is the
  stronger of the two and is the option that leaves the argument better evidenced, since the restored
  clause names the reference population and so carries the population-light point directly.
- No claim, figure, tier, bucket, or verdict moved with it. The surrounding sentence's conclusion is
  unchanged.

**Collateral check:** the only other in-quote rendering of this sentence is dossier line 1006–1007,
which quotes the clause *"the percentage of students that will answer this item correctly after
completing secondary education"*. That is a **contiguous verbatim substring** of the source sentence
— a legitimate partial quotation, not a compression. Not a defect. The full-sentence block quote at
line 996 also matches my extraction exactly.

---

## 2. Fix 2 — head count, derived independently

Counted from the dossier's own `Source(s):` / `Source:` lines, mapped finding-by-finding and
de-duplicated. **The pass's stated subtotals were not used as input**; they are compared only after
the fact.

| Finding | Source line | Distinct source |
|---|---|---|
| F1 | 179 | Corbett & Anderson 1994 — **S1** |
| F2 | 189 | Pavlik, Cen & Koedinger 2009 — **S2** |
| F3 | 199 | Piech et al. 2015 — **S3** |
| F4 | 209 | Gervet et al. 2020 — **S4** |
| F5 | 219 | Piech et al. 2015 — *dup of S3* |
| F6 | 229 | Pavlik et al. 2009 — *dup of S2* |
| F7 | 239 | Šarić-Grgić et al. 2024 — **S5** |
| F8 | 249 | Pelánek 2016/2017 *Computers & Education* (Elo) — **S6** |
| F9 | 259 | Ekanadham & Karklin 2017 — **S7** |
| F10 | 269 | Settles & Meeder 2016 — **S8** |
| F11 | 305 | Khajah et al. 2016 — **S9** |
| F12 | 315 | Wilson et al. 2016 — **S10** |
| F13 | 325 | Xiong et al. 2016 — **S11** |
| F14 | 335 | Beck & Chang 2007 — **S12** |
| F15 | 345 | Doroudi & Brunskill 2017 — **S13** |
| F16 | 355 | Park et al. 2019 — **S14** |
| F17 | 365 | van der Velde et al. 2024 — **S15** |
| F18 | 375 | Baker 2001 — **S16** |
| F19 | 385 | Pelánek 2017 *UMUAI* overview (DOI 10.1007/s11257-017-9193-2) — **S17** |
| F20 | 395 | Cen, Koedinger & Junker 2006 — **S18** |
| F21 | 405 | Schroeders & Gnambs 2025 — **S19**; Linacre 1994 — **S20** |
| F22 | 472 | Kolesnikova et al. 2026 — **S21** |
| F23 | 548 | Netík & Martinková 2026 — **S22** |
| F24 | 587 | van der Velde et al. 2021 — **S23** |
| F25 | 693 | Sense et al. 2016 — **S24** |
| F26 | 729 | Sense et al. 2018 — **S25** |
| F27 | 761 | Pelánek 2017 *UMUAI* — *dup of S17* (byte-identical DOI and URL to line 385; confirmed by direct comparison) |
| F28 | 978 | Wauters, Desmet & Van Den Noortgate 2011 — **S26** |
| F29 | 1101 | Wauters et al. 2012 — **S27** (partial access) |

### Independently derived total

**27 distinct sources across 29 finding IDs**, of which **1 (F29) is partial-access**.

Per-pass, derived: **initial F1–F10 = 8** · **C1-FP F11–F21 = 12** · **C1-R2 F22–F27 = 5** ·
**C1-W F28–F29 = 2**. 8 + 12 + 5 + 2 = 27. ✔

**This matches the pass's reported figures exactly, including every subtotal.** The specific failure
mode the dispatch flagged — a corrector producing a *wrong* replacement count while fixing staleness
— **did not occur here.**

**Separability (amendment 5): SATISFIED.** The dossier head block (lines 36–38) states the split as
`initial collection 8 + C1-FP 12 + C1-R2 5 + C1-W 2`, with the re-cite reasons named inline. Initial
collection and top-up figures are individually recoverable from the text.

**Convention respected:** the superseded "26 citations" line (line 12) is struck and marked
`SUPERSEDED`, not deleted; the reconciliation is a labelled `HEAD-COUNT RECONCILIATION (C1-ED2)`
insertion at lines 32–43. No finding ID was removed or renumbered — F1…F29 are all present and in
sequence.

---

## 3. Adjudication — the legacy off-by-one

**The off-by-one is REAL. Independently confirmed, twice over:**

- The head's legacy `9 original` (line 6) is **one higher** than the **8** distinct sources F1–F10
  actually cite. The cause is exactly as the pass names it: F5 re-cites F3's source and F6 re-cites
  F2's, so ten findings yield eight sources — but the initial collector counted findings, not
  sources.
- The consequential `Citations collected: 21 total` (line 6) is likewise **one higher** than the
  **20** distinct sources cited by F1–F21.
- The provenance attribution is correct: the figure originates in the initial collector's own self-QA
  line, and therefore **predates both C1-R2 and C1-W**. Neither later pass introduced it; each
  inherited it.

**Was the handling right? YES.** Three reasons, all of which hold on inspection:

1. **Reconciling only the total is the correct minimal repair.** The total is the figure a downstream
   reader relies on; it is now correct and derived, not inherited.
2. **Rewriting a prior pass's own declared figure would falsify that pass's record.** The initial
   collector's self-QA line is a record of what that pass *believed and declared*. Editing it in place
   would erase the evidence of the error while claiming to fix it — the opposite of this program's
   discipline. Marking and explaining is the honest treatment.
3. **It is outside the two-fix scope**, and expanding scope to rewrite prior declarations is precisely
   the kind of drift the dispatch prohibits.

**Not charging it against C1-W is also correct.** C1-W's arithmetic ("running total was 26; adds 1
full + 1 partial") was sound *given the baseline it inherited*. A pass cannot be charged for an error
it did not make and could not see without re-deriving the whole count — which was not its brief.

**One observation, recorded not charged.** Line 6's `Citations collected: 21 total — 9 original` is
left **unstruck**, whereas line 12's `26 citations` is struck and marked `SUPERSEDED`. That is a
presentational asymmetry. It is **not** a defect: the reconciliation block eleven lines below states
the correct total, names the off-by-one explicitly, and gives its provenance, so no reader is left
with an uncorrected figure and no reader has to re-derive it. Recorded for completeness only. **I am
not charging this, and it requires no further pass.**

---

## 4. Nothing else moved — confirmed

Verified present and unchanged by direct inspection (no `git` used; content checks only):

| Item | State |
|---|---|
| **C1's INSUFFICIENT sufficiency verdict** | Untouched. Not re-opened, not re-litigated here either. |
| **r(23)=0.80 and the full six-method ranking** (dossier line 987) | **Intact and re-verified against my own F28 extraction, lines 278–280.** All six figures — .90 / .88 / .85 / **.80** / .62 / .56, all at `r(23)`, `p<0.01` — match verbatim. |
| **Counterweight 1** — authors' no-generalisation disclaimer | Present, line 1070, verbatim. |
| **Counterweight 2** — learners out-performed experts, `t(22)=2.71, p<0.05` | Present, line 1053. |
| **Counterweight 3** — reference-population asymmetry / population-light | Present, lines 1000–1011, with the expert question quoted. |
| **~100-students fencing** | Intact at lines 945, 1134, 1252; the pre-existing hedged mentions at 145/244/278/408 are unchanged. Never asserted as measured. |
| **F27's tier** | `Q4 (authoritative narrative overview — unchanged from F19)`. Untouched. |
| **F29's UNVERIFIABLE marking** | Intact at lines 958, 1094, 1097, 1158, 1170, 1241. Access still recorded as a failure, not smoothed. |
| **The six registered adjacent leads** | All six present (lines 1205–1231): Impara & Plake 1998; Chalifour & Powers 1989; Hambleton, Bastari & Xing 1998; Johns, Mahadevan & Woolf 2006; Wauters et al. 2010 JCAL; Brinkhuis & Maris 2010. None chased. C1-W's own "five adjacent leads" self-QA phrasing is left as C1-W recorded it. |
| **Settled-gap table / source-independence disclosure** (line 824 region) | Intact, reads as C1-EC left it. |

**Exactly two edit sites.** `grep -n "C1-ED2" dossier.md` returns **one** hit — the labelled head
reconciliation (fix 2). Fix 1 is an unlabelled in-place replacement of the quoted string at line
1197, which is the appropriate treatment for restoring a verbatim quotation. **No third edit was
found**, and every load-bearing element listed above is intact.

**W2 §6's trivial second item** (the C1-W section self-quoting the settled gap as "(a) no
evaluation…" where the table at line 824 capitalises "No") — **confirmed still unfixed, and leaving
it was the right call.** It is a capitalisation difference inside a quotation of the dossier's own
text, it was not in the dispatch, and W2 itself labelled it cosmetic. Fixing it would have been
exactly the cosmetic inflation this program has warned against. Recording the decision in the report
rather than acting silently is the correct handling.

---

## 5. Calibration statement

I looked for a fifth manufactured defect and did not find one to report. Specifically:

- I **did not** inflate the unstruck line-6 legacy figure into a finding. It is fully corrected in
  context eleven lines below and misleads no one.
- I **did not** treat the partial-clause quotation at line 1006 as a second quote-mark defect. It is
  a contiguous verbatim substring, which is what a partial quotation is.
- I **did not** re-open C1's INSUFFICIENT verdict, the approved coverage gap, or any of C1-W's
  substantive conclusions.
- I **did** re-derive the source count from scratch rather than checking the pass's arithmetic against
  its own subtotals, which is the one place a corrector could plausibly have gone wrong. It did not.

Both changes are hygiene, both are correct, both are complete, and neither moved a number, a tier, a
bucket, a verdict, or the direction of any claim. **C1-ED2: PASS.** A short, clean record is the
right output, and this is it.

---

## 6. Registers

**Conflict register: no rows.**
**Source-lead register: no rows.**
Nothing was appended to any shared register.

---

## 7. Compliance

- **No `git` command was run at any point.** No build, test, or install command was run.
- **Nothing was edited.** The dossier and both reports were read only.
- One new file written, inside `journal/raw/_inbox/foundation-audit-p1/verification/`.
- Retrieval was confined to re-obtaining **F28**, a source already cited and already in scope, to
  check the fix-1 quotation first-hand. The PDF and its text extraction were written to the session
  scratchpad, outside the repo. No new source was collected; no scope was expanded.
