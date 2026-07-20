# Verification Record: W8 — C4-ED-2 bounded reversal pass (final wave, Phase 1 gate)

> Verifier: Claude (Opus 4.8) — W8, fresh and independent of C4-ED, C4-ED-2, C4-RT, C4-FP, V4, V4b,
> V4c and W5 | Date: 2026-07-20
> Scope: **pass `C4-ED-2` only — items W5-1 and W5-2.** C4 sufficiency (SUFFICIENT) and F13
> (VERIFIED) not reopened. No collection performed; C4 is at the 15-source hard cap regardless.

## Method — a third, independent instrument

The entire error class under review arose from passes reading **verification records instead of
sources**. I therefore retrieved the primary PDF myself from the URL F11 cites
(`https://s3.amazonaws.com/KA-share/impact/khan-academy-implementation-report-2014-04-15.pdf`,
3,475,436 bytes) and extracted it **per page with `pdftotext -layout -f N -l N`**, which preserves
the running foot — so each folio number is *read off the page itself*, not inferred from position
in a flat dump. I read pdf pages 5, 6, 52, 53, 54, 55. I did not take any wording from W5, from
`C4-editorial-report-2.md`, or from any verification record.

**Route used: text extraction (`pdftotext -layout`), not page images.** See the methodological
assessment at the end.

---

## W5-1 — the restored quotation

### The verbatim sentence, as **I** confirmed it

Folio **p.37** (pdf p.53), section "Examining the Link between Khan Academy Use and Student
Outcomes", carrying over from the foot of folio p.36 (pdf p.52):

> "Although these models can help us examine the relationship between use and outcomes they cannot
> be used to establish with any level of confidence whether the use of Khan Academy caused better
> student outcomes. **There are multiple plausible explanations for any of the reported
> associations.** As a result, the findings presented in this section should be treated as
> exploratory and not be used to support definitive claims about the effectiveness of the Khan
> Academy resources."

Page-break detail, confirmed independently: folio p.36 ends `"…whether the use of Khan Academy
caused better student outcomes. There are"`; folio p.37 opens `"multiple plausible explanations for
any of the reported associations. As a result,…"`. **The quoted fragment the dossier uses lies
wholly on folio p.37.** The dossier's citation to p.37 is exact, and its explicit note that the
sentence carries over from p.36 is also exact. **VERIFIED.**

### The three sub-claims about the dossier

| Required | Present? | Location |
|---|---|---|
| (a) Quotation restored as genuine verbatim, cited to **p.37** | **YES** | l.263 Caveats: `"multiple plausible explanations for any of the reported associations"` with marks restored and tagged `[genuine verbatim quotation, SRI 2014, folio p.37…]`; supporting page also stated at l.260 |
| (b) False "is not in the report" statement **struck as superseded, not deleted** | **YES** | l.257 is struck through in full (`~~…~~`) and remains readable in place; l.258 opens the replacement as `REVERSAL — … SUPERSEDED and WITHDRAWN` |
| (c) Error recorded as **inherited from V4b**, not the collector | **YES** | l.260: "Origin of the error: V4b, not the collector and not C4-ED. The collection pass's quotation was accurate — **it earned those quotation marks**" |

### The three source claims about V4b's worse-than-stated error

| Claim | My check | State |
|---|---|---|
| Second sentence is on folio **p.39** | pdf p.55, running foot "39", verbatim: "Multiple explanations for these associations are plausible in addition to the possibility of a causal link between Khan Academy use and better than predicted test performance." | **VERIFIED** |
| Folio **p.38** is a table page containing neither sentence | pdf p.54, running foot "38". Contains **Table 8** (Site 1, SY 2011-12) and **Table 9** (Site 9, SY 2012-13) and their sample-size/significance notes. **No prose paragraphs. Neither sentence appears.** | **VERIFIED** |
| **Both** sentences genuinely exist | Yes — p.37 and p.39 respectively, verbatim, in different sections of the argument. | **VERIFIED** |

V4b matched the p.39 sentence, concluded from its presence that the p.37 one did not exist, and
cited it to p.38 — a page that carries neither. The pass's characterisation of V4b's error is
accurate and, as it says, worse than W5 stated: not one off-by-one but a citation to a page with no
running prose at all.

---

## W5-2 — the folio fix

| Claim | My check | State |
|---|---|---|
| "the Bill & Melinda Gates Foundation contracted with SRI International to study the implementation of Khan Academy…" is on **p.iv** | pdf p.6, running foot "iv", **opening words of the page**: "the Bill & Melinda Gates Foundation contracted with SRI International to study the implementation of Khan Academy in a more diverse set of schools and classrooms during school year (SY) 2011–12 and SY 2012-13." Folio p.iii (pdf p.5) ends "…In September 2011". | **VERIFIED** |
| "Major funding" on **p.iii** is correct and unchanged | pdf p.5, running foot "iii", verbatim: "In 2010 Khan Academy received major funding from the Bill & Melinda Gates Foundation and Google to build out its organization and create additional content." Dossier l.253 still cites this to p.iii; **not altered**. | **VERIFIED** |

The folio is corrected at the independence-downgrade bullet (l.253) and the two downstream
references now read **pp.iii–iv** (ll.263, 285), with the superseded `p.iii` struck rather than
deleted. **The independence downgrade itself is untouched and stands.**

---

## Nothing else moved

Tested, not assumed. `C4-ED-2` appears at exactly **4 sites** in the dossier — ll.253, 258–262,
263, 285 — every one of them within W5-1 or W5-2. **There is no third change.**

| Must be unchanged | State |
|---|---|
| F10 (supporting-location / Hedges g fix; "V4b applied no downgrade" note, l.240) | unchanged — carries `C4-ED` only |
| F12 (access correction; tier-warrant strike with Q2 retained; funding-clean resolution) | unchanged — `C4-ED` only |
| F13 (heading, l.321; VERIFIED status) | unchanged, not reopened |
| Coverage-gap re-statement + both qualifiers (ll.178–213) | unchanged |
| CLOSED gap bullet (l.285) | struck-as-CLOSED intact; **only** the folio reference inside it moved to pp.iii–iv |
| 4 → 5 arithmetic fix (l.482) | unchanged: "**5** — IES award record; ED583985; ED583986; SRI 2014 report; Patil & Juanico" |
| All five upward corrections **including D4** | unchanged — D4 block at l.382 carries `C4-ED … per V4c D4` with no `C4-ED-2` marker |

**Tripwire — the four pre-existing F1–F9 defects, all still present verbatim. Nothing silently
repaired.**
- F1, l.90 — paraphrase "…as your chess games (blitz, rapid, etc.)" still under "exact quotes" ✓
- F5, l.128 — "(b) same source as F4" ✓
- F7, l.148 — placeholder "[Title on effects of Khan Academy usage on math performance]" ✓
- F9, l.168 — "Sala, G., **Foley, J.P.**, & Gobet, F. (2017)" ✓

**Counts recomputed, not accepted:** `^### F[0-9]` → **13**; `^- Source(s):` → **13**.
**13 findings / 15 distinct sources — unchanged, at the hard cap.** No source added or removed;
nothing this pass did could affect either number.

---

## Methodological assessment — the page-image route

The pass reported WebFetch text extraction failing on this PDF and so saved the binary and read it
**page-by-page as images**, arguing that made folio boundaries checkable rather than inferred.

**Assessment: the reasoning is right, the instrument was defensible, but it was not the only route
available and not the lowest-risk one for the quotation.**

- **The argument for page-level reading is correct and is the heart of this fix.** V4b's error was
  precisely a folio error, and folio numbers live in the running foot — invisible in a flat
  whole-document dump where page boundaries vanish. Any route that does not resolve pages
  individually could not have caught this. That part of the pass's reasoning is sound and I reached
  the same finding by the same logic.
- **But per-page *text* extraction gives the same folio guarantee.** `pdftotext -f N -l N` returned
  the running foot ("36", "37", "38", "39", "iii", "iv") on every page I read. WebFetch failing is
  not evidence that text extraction failed — a local extractor succeeded on this exact file, and
  W5 also extracted it successfully. The pass generalised from one tool's failure to "the text
  route is unavailable."
- **The C2 precedent applies weakly here, and no drop occurred.** The C2 defect was a dropped
  line-final word across a column break — a *transcription-fidelity* risk. This document is
  two-column, and the p.37 quotation both spans a page break **and** sits at a column head, so the
  risk was live, not absent. I checked: the pass's transcription is **correct word-for-word**
  against my independent text extraction, including across the p.36→p.37 carry. No drop.
- **Net.** Appropriate for the folio question, riskier than necessary for the verbatim question,
  and correct in outcome. Not a defect. Recommendation for future passes, offered as guidance
  rather than a finding: **use per-page text extraction as primary and page images as
  cross-check** — it answers the folio question just as well and does not put a verbatim quotation
  through an OCR-class channel.

---

## Verdict

**C4-ED-2: PASS.** Both changes are correct, complete, and correctly bounded.

- Every source claim the pass makes is verbatim-true against the primary PDF, checked by me
  independently: the p.37 sentence, the p.39 second sentence, the p.38 table-page character, the
  p.iv contract sentence, the p.iii major-funding sentence.
- Both dossier changes landed, superseded text is struck rather than deleted, and the error is
  attributed to V4b rather than to the collector — whose quotation was, as the pass says, accurate.
- No third change was made. The tripwire defects survive verbatim. Counts hold at 13/15.

**I found nothing wrong with this pass. Said plainly, because a clean record is a valid result:
this is a correctly scoped, correctly executed reversal that restores something wrongly removed,
and there is no fifth defect here to report. I looked for one and did not find one.**

**C4 as a whole: PASSES the final wave.** W5's two required items — the only items left open — are
discharged. C4 remains **SUFFICIENT**; F13 remains **VERIFIED**; neither was reopened. The dossier
no longer contains a false statement about any of its sources. **C4 is clear for the Phase 1 gate.**

### Rows returned for central assignment (NOT appended by me)

**Conflict register:** none.

**Source-lead register:** none — no new source located or needed; C4 is at cap.

**Correction register:** none. No correction is required by this verification.

**Informational, for the orchestrator's ruling only (carried forward from W5, not a new item):**
`verification/V4b-chesscom-khan-toppedup.md` remains the historical origin of the W5-1 error and is
left unamended by both W5 and C4-ED-2 on the shared view that verification records are immutable.
I concur with that boundary. The dossier — the artefact downstream synthesis reads — is corrected,
and it records the origin.
