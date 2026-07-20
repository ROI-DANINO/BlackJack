# Verification Record: W5 — C4-ED editorial landing pass (final wave, Phase 1 gate)

> Verifier: Claude (Opus 4.8) — W5, fresh and independent of C4-ED, C4-RT, C4-FP, V4, V4b and V4c
> | Date: 2026-07-20
> Scope: **pass `C4-ED` only.** Not re-opening C4 sufficiency (SUFFICIENT) or F13 (VERIFIED).
> No collection performed — C4 is at the 15-source hard cap, so collection is unavailable regardless.
>
> **Method — deliberately not the instrument C4-ED used.** C4-ED explicitly issued **no WebFetch** and
> worded every correction from text already quoted inside V4/V4b/V4c. That makes the whole pass an
> *inherited-text* pass: if a prior verifier misquoted a source, C4-ED had no mechanism to catch it and
> would land the error in the dossier. I therefore went back to the **primary sources**, not to the
> verification records. I downloaded and extracted with `pdftotext`: the SRI 2014 report
> (36,239 words, 82pp), Kelly & Rutherford via ERIC EJ1146230 (3,402 words, 8pp), and Hauk, Matlen &
> Thomas ED583985 (3,516 words); and fetched the Patil & Juanico PMC full text. Page folios were
> resolved by per-page extraction (`pdftotext -f N -l N`), not by proximity in a flat dump. Arithmetic
> was recomputed in Python.

**Headline.** The pass is **substantially sound and its central purpose is discharged**. All three
recorded-but-unapplied corrections genuinely landed in the dossier text, all five upward corrections
are warranted by the sources, the counts are correct, and no unrelated text or conclusion was
disturbed. **One correction is wrong and must be reversed**: the F11 "quote-accuracy correction"
strikes a quotation that **is verbatim in the source**, and inserts a false statement into the dossier.
It is an inherited V4b error that C4-ED had no instrument to detect. **Verdict: PASS with one required
reversal.**

---

## Q2 first — did the corrections actually land? (the pass's whole point)

Checked against dossier text, not against the report's claim. **26 `C4-ED` markers** present.

| Correction | Landed? | Dossier location |
|---|---|---|
| Coverage-gap bullet re-stated **in place** | **YES** | ll.178–213 — full re-statement at the bullet itself |
| — qualifier: aggregate claim asserted but **not established for F10** | **YES** | ll.201–205, verbatim as V4c required |
| — qualifier: null carries a modest **efficiency** reading, now weighted | **YES** | ll.206–213 |
| F11 independence downgrade → **author-independent only** | **YES** | ll.252–256, prominent block at head of F11; struck phrases marked inline at l.258 |
| — matching coverage-gap bullet struck as **CLOSED, not a gap** | **YES** | l.280 |
| F12 tier-warrant strike, **Q2 retained, reason replaced** | **YES** | l.264 |
| F11 paraphrase-as-quotation | Landed — **but the correction itself is wrong** (see Defect W5-1) | l.257 |
| F10 g-attribution → short paper (b) p.641 | **YES** | l.240 |
| — explicit in-place note that **V4b applied no downgrade to F10** | **YES** | l.240, stated as "no downgrade of any kind" |

The editorial debt V4c named is genuinely discharged. A reader who stops at the Coverage-gaps section
now gets the complete, direction-carrying picture; F11 and F12 read at their downgraded strength at the
findings themselves. **This is the defect pattern the pass existed to fix, and it is fixed.**

---

## Q1 — does every claimed correction match the source?

### VERIFIED against primary sources

| Claim | Source check | State |
|---|---|---|
| Gates gave Khan Academy "major funding" in 2010 | SRI report, **folio p.iii** (pdf p.5), verbatim: "In 2010 Khan Academy received major funding from the Bill & Melinda Gates Foundation and Google to build out its organization and create additional content." | **VERIFIED** |
| Gates "contracted with SRI International to study the implementation of Khan Academy" | Verbatim — but on **folio p.iv** (pdf p.6), *not* p.iii as the dossier states. See Defect W5-2. | **VERIFIED (page attribution off by one)** |
| Khan Academy **co-selected sites** | SRI, **p.9** confirmed by per-page extraction: "The research team selected the study sites in collaboration with Khan Academy to represent a range of ways that Khan Academy was being used for math instruction." | **VERIFIED** |
| Acknowledgments thank KA staff for "collaboration throughout this study" | SRI, **p.ii** (pdf p.4), verbatim | **VERIFIED** |
| F12 nonconcurrent design "is limited in functional control due to its inability to identify history and maturation effects" | PMC12779882 full text, verbatim | **VERIFIED** |
| F12 free full text at PMC12779882; funding resolves clean | Confirmed: freely available; "The authors did not receive support from any organization for the submitted work and declare they have no financial interests"; n = 3 confirmed | **VERIFIED** |
| F10 0.14–0.50 attributed to *Hedges g* in short paper (b) p.641 | ED583985, verbatim: "The 95% confidence interval of the Hedges g value is .14 - .50." Folio 641 confirmed by running foot. | **VERIFIED** |
| D4: Shapiro-Wilk normality + Levene p = .949 | Kelly & Rutherford **p.74**, verbatim | **VERIFIED** |
| D4: ceiling effect was the **stated design rationale** | K&R **p.72**, verbatim: "Due to the potential ceiling effects of the previously-used measure, the lead author designed a study with the explicit intent of investigating the association between Khan Academy use and an assessment that would result in more normally distributed scores suitable for statistical analysis." | **VERIFIED** |
| F13 prior null by the same advocate (p.72) | K&R p.72, verbatim: "The results of that comparison showed no statistically significant differences between students using Khan Academy, students in other math enrichment classes, and those in English language arts (ELA) enrichment classes." | **VERIFIED** |
| Internal inconsistency (i): **71.89 = 71.89** | Recomputed from Table 1 (p.74): (52×70.08 + 23×73.78 + 39×73.18)/114 = **71.887**, matching the printed Total **71.89**. Combined control = **71.21**, not the narrative's 72.22. Table-derived MD = **1.97**. | **VERIFIED exactly** |
| D2: Table 2 states a 2-tailed convention | K&R p.75, verbatim: "Note. Bolded correlation coefficients are significant at the 0.05 level (2-tailed)." | **VERIFIED** |
| D3: defect confined to the two t-tests | Consistent with the reported values; V4c's recomputation reproduced. The mixed-convention framing is the accurate one. | **VERIFIED** |

**On the upward corrections specifically** — the dispatch asked me to scrutinise these hardest, since a
pass that only corrects downward is a calibration warning. **All five are warranted.** D4 in particular
is a real over-correction being properly reversed: the paper's own Shapiro-Wilk normality result and
~72% means do contradict "low-ceiling," and a paper whose entire stated design rationale was escaping a
ceiling effect is badly described by "the paper does not discuss it." The replacement wording (coarse
and off-target in difficulty, replacement instrument's own sensitivity never examined) is defensible and
is what the source supports. **F12 being the strongest rather than the weakest of the three C4-FP
sources on independence is confirmed** — it is the only one of the three with an affirmative clean
funding declaration (F10 has no COI statement at all; F11 is funder-compromised). That ranking reversal
is correct.

### Defects

**W5-1 — the F11 quote-accuracy "correction" is WRONG and must be reversed. This is the one required
change.** *(Dossier l.257; inherited from V4b.)*

The dossier now states, in place:

> The Caveats field below presents `"multiple plausible explanations for any of the reported
> associations"` inside quotation marks. **That sentence is not in the report.**

**That statement is false.** The sentence is in the report, verbatim, on **folio p.37** (pdf p.53):

> "Although these models can help us examine the relationship between use and outcomes they cannot be
> used to establish with any level of confidence whether the use of Khan Academy caused better student
> outcomes. **There are multiple plausible explanations for any of the reported associations.** As a
> result, the findings presented in this section should be treated as exploratory…"

What happened: **both sentences exist, in different places.** V4b located the *other* one — "Multiple
explanations for these associations are plausible in addition to the possibility of a causal link
between Khan Academy use and better than predicted test performance" — which sits later, on **folio
p.39** (pdf p.55), and concluded from its presence that the quoted sentence did not exist. It does.
V4b's own page attribution for its replacement ("p.38") is also wrong by one.

Consequences, all of which the reversal must undo:
1. The dossier's **original quotation was accurate**; the collector earned those quotation marks.
2. The dossier now asserts a **falsehood** about its own source.
3. A legitimate verbatim quotation has been struck and relabelled a paraphrase (l.258 renders it
   `**[paraphrase, not a quotation…]** ~~"~~…~~"~~`), and the dossier attributes to the report a
   sentence at a page (p.38) where it does not appear.

**This is a correction running *against* the dossier that is itself unwarranted** — the mirror image of
the D4 pessimism the pass correctly caught, and precisely the failure mode C4-ED's no-WebFetch method
could not detect. C4-ED is not the origin of the error, but it is what landed it in the artefact
downstream synthesis reads. **Severity: minor for the finding's substance** (F11's independence
downgrade, Q3 tier, non-causal framing and every other correction are untouched by this and remain
correct) — **but it is a false statement in the dossier about a source, in the exact defect class the
program has repeatedly caught, and it must not survive the gate.**

Required remedy (editorial, no collection): strike the quote-accuracy correction at l.257 and the
inline markings at l.258; restore the quotation marks; optionally record that the report also contains
a second, similar sentence at p.39, and cite the quoted one to **p.37**.

**W5-2 — page attribution: "contracted with SRI International" is on p.iv, not p.iii.** *(Dossier
ll.253, 258, 280.)* Both sentences are verbatim and the funder relationship is fully established; only
the folio is wrong for the second one. "Major funding" is correctly on p.iii. **Severity: trivial. Does
not touch the downgrade, which stands.**

---

## Q3 — was any unrelated text or conclusion changed?

**No.** Tested rather than assumed, using V4b's own tripwire: the four pre-existing F1–F9 defects that a
silent repair would have removed are **all still present verbatim** after C4-ED:

- F1 still renders the paraphrase "…as your chess games (blitz, rapid, etc.)" under "exact quotes" (l.90);
- F5 still lists source (b) as "same source as F4" (l.128);
- F7 still carries the placeholder "[Title on effects of Khan Academy usage on math performance]" (l.148);
- F9 still cites "Sala, G., **Foley, J.P.**, & Gobet, F. (2017)" (l.168).

Nothing was silently repaired, and nothing outside the correction scope was touched. Superseded text is
struck and dated throughout rather than deleted, so every edit is auditable in place. F1–F9 are
otherwise untouched; the "left unchanged" table in the report matches what is actually in the dossier.

---

## Q4 — are bucket, tier, caveat and sufficiency still honest?

**Yes.**

- **Buckets:** unchanged; all findings remain Evidence-backed with their qualifiers intact.
- **Tiers:** F11 **Q3** untouched (correct). F12 **Q2 retained, warrant replaced** — exactly the ruling
  V4b issued, and the replacement warrant ("the independent variable is manipulated against a
  steady-state baseline," with the authors' own nonconcurrent limitation attached) is honest and
  source-supported. F13 **Q3** untouched. No tier was inflated.
- **Caveats:** F10 is explicitly protected against being read as weakened — the note that V4b applied
  **no downgrade of any kind** is present at l.240, which is the right call, since a bare
  citation-precision fix at a finding could easily be misread downstream as an impeachment.
- **Sufficiency:** the statement gained a **scope note only**; its verdict is untouched and still
  correct — F10–F13 are outcome studies, none evaluates the mastery ladder as a *measurement*
  instrument. **C4 remains SUFFICIENT; F13 remains VERIFIED.** Neither was reopened, as instructed.
- The residual instructor-quality caveat is carried as a caveat, not as a correction, per V4c.

---

## Counts — recomputed independently, not accepted

I enumerated from the dossier's own `Source(s):` fields rather than from the report's table.

- `^### F[0-9]` → **13 findings**. `^- Source(s):` → **13 fields**.
- Distinct sources: chess.com puzzle-ratings help; chess.com news; chess.com ratings help; KA
  mastery-levels help; KA course/unit-mastery help; KA mastery-challenges help; NBER w32388; PNAS
  (+ correction, counted as one); Sala et al. = **9**. IES award record; ED583985; ED583986; SRI 2014;
  Patil & Juanico = **5**. Kelly & Rutherford = **1**.

**CONFIRMED FINAL COUNTS: 13 findings / 15 distinct sources.** The per-pass split (9/9 + 3/5 + 1/1) is
correct, the pre-existing C4-FP "4 sources" error is correctly repaired to **5** (l.285), and every
stale statement is struck rather than left live. All count statements in the document are now mutually
consistent; the at-cap fact is recorded in three places (ll.14, 76–77, 481) as claimed.

**One convention caveat, not a defect.** "Exactly 15" depends on two declared conventions: PNAS +
its correction counted as one source (two DOIs), and Khan Academy's own blog post — read for F7 and
used as the origin of the elementary/middle split — not counted, since it is recorded as first-party
framing rather than in a `Source(s)` field. Both are defensible and both are declared. But the dossier
sits at the cap *on that convention*; a stricter count would put it at 16–17. Since the operative
consequence is "no further collection available," and C4 is SUFFICIENT with no collection warranted,
nothing turns on this. Flagged so the orchestrator is not surprised by it later.

---

## Verifier summary

- **Corrections claimed by C4-ED: 13 checked. VERIFIED: 12. Reversed as unwarranted: 1 (W5-1).**
- **Landing check (Q2): all three recorded-but-unapplied corrections + both further unapplied
  corrections are genuinely present in the dossier text.** The editorial debt is discharged.
- **Unrelated text changed: none.** Four pre-existing F1–F9 defects survive verbatim as a tripwire.
- **Bucket / tier / caveat / sufficiency: honest and unchanged.** C4 SUFFICIENT, F13 VERIFIED, neither
  reopened.
- **Confirmed final counts: 13 findings / 15 distinct sources — at the hard cap.**
- **Calibration.** Said plainly, because a clean record is a valid result: this pass is well executed.
  It corrected downward *and* upward, it did not suppress the five upgrades, its D4 reversal of a
  pessimistic defect is correct on the source, and its F12 independence re-ranking is right. It also
  declined to mark its own work verified and asked for a separate re-check — which is what surfaced
  W5-1. The single defect I found is an **inherited** error the pass's own method could not catch, and
  it runs *against* the dossier, not in its favour. There is no evidence of self-serving correction in
  either direction.

### Rows returned for central assignment (NOT appended by me)

**Conflict register:** none.

**Source-lead register:** none — no new source located or needed; C4 is at cap.

**Correction-register row (or equivalent), for the orchestrator to assign:**

| Target | Defect | Required action | Severity |
|---|---|---|---|
| `C4-chesscom-khan/dossier.md` l.257–258 (F11) | Quote-accuracy correction is itself wrong: "multiple plausible explanations for any of the reported associations" **is verbatim** at SRI p.37; V4b matched a different sentence at p.39 and wrongly declared the quoted one absent. Dossier now contains a false statement about its source and has struck a legitimate quotation. | Bounded editorial reversal: restore the quotation and its marks, delete the false "not in the report" statement, cite to **p.37**; optionally note the second similar sentence at p.39. **No collection. No other field touched.** | Minor–moderate (false statement in the artefact; substance of F11 unaffected) |
| `C4-chesscom-khan/dossier.md` ll.253, 258, 280 (F11) | "contracted with SRI International…" attributed to p.iii; it is on **p.iv**. "Major funding" on p.iii is correct. | Change folio to p.iv where that sentence is cited. | Trivial |
| `verification/V4b-chesscom-khan-toppedup.md` | Origin of W5-1 — records the false "that sentence is not in the report" finding and a wrong page (p.38 → p.39). | Historical record; flag as superseded by W5 rather than amend, per the same reasoning C4-ED applied to the collection report. Orchestrator to rule. | Informational |

### Note carried forward for the gate

C4-ED flagged (its §7) that D1's false back-page claim is **also** repeated in
`remediation/C4-collection-report.md`, and left it, on the view that amending another pass's record is
outside an editorial mandate scoped to the dossier. **I concur with that boundary** — the dossier is the
artefact downstream synthesis reads and it is corrected. W5-1 raises the identical question for V4b, and
I have handled it the same way: recorded, not amended. Both need an orchestrator ruling, not a
verifier's edit.

**Verdict on pass C4-ED: PASS**, with one required bounded editorial reversal (W5-1) and one trivial
page-attribution fix (W5-2). Neither reopens F13, C4 sufficiency, or any tier.
