# C4 Editorial Report 2 — bounded reversal pass `C4-ED-2`

> Corrector: Claude (Opus 4.8), editorial role | Date: 2026-07-20
> Mandate: W5 (`verification/W5-C4-ED-final.md`), items **W5-1** and **W5-2** only.
> Scope: **two changes.** C4 sufficiency (SUFFICIENT) and F13 (VERIFIED) not reopened.
> No collection. C4 is at the 15-source hard cap; no source added, none needed.
> The first editorial report (`remediation/C4-editorial-report.md`) is left intact.

---

## Method — deliberately not C4-ED's instrument

W5 identified the mechanism behind the defect I am reversing: **C4-ED issued no WebFetch.** It
worded every correction from text already quoted inside V4/V4b/V4c. That makes it an
**inherited-text pass with no mechanism to catch a prior verifier's misquote** — structurally
incapable of detecting the one error it landed.

I therefore did not take the wording from W5's brief or from any verification record. I fetched
the **primary PDF** (the report's own S3 URL, already cited by F11) and read it at **page level**
— folios 36, 37, 38, 39 and iii, iv — so that every claim about what the source says was checked
against the source. This is the point: *a correction about what a source says must be worded
against the source.*

---

## W5-1 — REVERSAL: the struck quotation is genuine and is restored

### Confirmed verbatim, independently

Folio **p.37** (pdf p.53), section "Examining the Link between Khan Academy Use and Student
Outcomes". The sentence carries over from the foot of folio p.36:

> "Although these models can help us examine the relationship between use and outcomes they cannot
> be used to establish with any level of confidence whether the use of Khan Academy caused better
> student outcomes. **There are multiple plausible explanations for any of the reported
> associations.** As a result, the findings presented in this section should be treated as
> exploratory and not be used to support definitive claims about the effectiveness of the Khan
> Academy resources."

Page-level detail, since it is what V4b got wrong: p.36 ends mid-sentence at "…caused better
student outcomes. There are"; folio p.37 opens "multiple plausible explanations for any of the
reported associations. As a result,…". The quoted fragment sits on **p.37**.

### The second sentence exists too — on p.39, not p.38

Folio **p.39** (pdf p.55), verbatim:

> "Multiple explanations for these associations are plausible in addition to the possibility of a
> causal link between Khan Academy use and better than predicted test performance."

**Both sentences exist, in different places.** V4b matched this one, concluded from its presence
that the quoted one did not exist, and cited it to p.38. Both conclusions are wrong. Folio p.38 is
a **table page** (Tables 8 and 9) and contains neither sentence.

### What was wrong in the dossier

C4-ED, acting on V4b, had:
1. asserted in the dossier that the quotation **"is not in the report"** — a **false statement
   about a source**;
2. **struck a legitimate verbatim quotation** and relabelled it a paraphrase;
3. attributed to the report a sentence at a page (p.38) where it does not appear.

### What I changed

- The `QUOTE-ACCURACY CORRECTION` block at F11 is **struck through and marked SUPERSEDED /
  WITHDRAWN**, not deleted — the superseded text stays visible and auditable in place, per the
  program's convention.
- A **REVERSAL** block replaces it, carrying the verbatim p.37 sentence, the p.39/p.38 correction,
  and an explicit statement that **the collector earned those quotation marks**.
- In the Caveats field, the paraphrase relabelling and the struck quotation marks are removed; the
  quotation reads as a quotation again, cited to **folio p.37**.

### Attribution of the error, and the mechanism (recorded, not edited)

- **Origin: V4b.** Not the collector — whose quotation was accurate — and not C4-ED, which had no
  instrument to detect it. This is recorded in the dossier. `verification/V4b-chesscom-khan-toppedup.md`
  is **left unamended**: verification records are historical and immutable. Same handling W5 chose.
- **Mechanism, recorded in the dossier because it generalises beyond this finding:** a pass that
  reads only verification records inherits their errors silently. C4-ED's no-WebFetch method is the
  mirror image of the D4 pessimism defect the same pass correctly caught — a correction running
  *against* the dossier that was itself unwarranted.

---

## W5-2 — folio fix: "contracted with SRI International" is on p.iv

Confirmed by page-level read. Folio **p.iii** ends "…In September 2011"; folio **p.iv** opens "the
Bill & Melinda Gates Foundation contracted with SRI International to study the implementation of
Khan Academy in a more diverse set of schools and classrooms during school year (SY) 2011–12 and SY
2012-13."

- **"Major funding" on p.iii is correct** and was **not** changed: folio p.iii, verbatim, "In 2010
  Khan Academy received major funding from the Bill & Melinda Gates Foundation and Google to build
  out its organization and create additional content."
- The folio for the *second* sentence is corrected to **p.iv** at the independence-downgrade bullet,
  and the two downstream references that cited "p.iii" for both sentences together now read
  **pp.iii–iv**. Superseded folios struck, not deleted.

**The independence downgrade itself is untouched and stands.** Both sentences are verbatim; the
funder relationship is fully established. Only a folio was wrong.

---

## Deliberately left unchanged

Everything else W5 verified as sound, examined and not touched:

- F11 independence downgrade (author-independent only), Q3 tier, non-causal/correlational framing.
- F10 supporting-location / Hedges g fix and the "V4b applied no downgrade" note.
- F12 access correction, tier-warrant strike with Q2 retained, funding-clean resolution, and its
  ranking as the strongest of the three on independence.
- All five upward corrections, including the D4 reversal.
- Coverage-gap re-statement and both its qualifiers; the CLOSED coverage-gap bullet.
- The "4 → 5 distinct sources" arithmetic correction.
- The four pre-existing F1–F9 defects W5 used as a tripwire (F1 paraphrase, F5 "same source as F4",
  F7 placeholder title, F9 "Foley, J.P.") — **still present verbatim.** Nothing silently repaired.
- Counts: **13 findings / 15 distinct sources**, at the hard cap. Unchanged; nothing I did affects
  either number — no source added, none removed.
- **C4 remains SUFFICIENT. F13 remains VERIFIED.** Neither reopened.

## Calibration note

This pass **restores** something wrongly removed. It runs in the direction opposite to the four
manufactured defects this program has caught. I found no third change worth making and did not go
looking for one; no new problem is reported here, because none was found within scope.

I do **not** mark my own corrections verified. A separate instance should re-check the two changes
above against the primary PDF.
