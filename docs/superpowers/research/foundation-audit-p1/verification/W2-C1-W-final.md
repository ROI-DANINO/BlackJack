# Verification Record: W2 — C1-W (single-source Wauters collection), FINAL WAVE

> Verifier: Claude Opus 4.8 (1M) — fresh independent verifier, did NOT perform C1-W  |  Date: 2026-07-20
> Contract: exists + supports + strength-honest. VERIFIED requires an exact supporting location.
> Every source was **independently retrieved by this verifier**. The collector's report and the
> dossier's characterisations were treated as claims, never as evidence for themselves.

**VERDICT ON C1-W: PASS.**

---

## 0. Independent retrieval — what this verifier obtained, first-hand

| Artefact | Route used by this verifier | Result |
|---|---|---|
| **F28** full PDF | `curl` of the EDM 2011 proceedings URL printed in the dossier | **HTTP 200, `application/pdf`, 367,851 bytes, 7 pages** — byte count and page count match C1-W's report **exactly** |
| F28 text layer | `pdftotext -layout` (this verifier's own extraction, independent of the collector's) | 392 lines; all string matching below run against this file |
| **F29** metadata | Crossref API on the DOI | Elsevier BV, vol **58**, issue **4**, pp **1183–1193**, published-print **2012-05**, **35 references**, title "…**judgment**", authors Wauters / Desmet / **Van Den Noortgate** — every field matches C1-W |
| F29 OA status | Unpaywall API | `is_oa: false`, `oa_status: "closed"`, **0 OA locations** — matches |
| F29 OA status | OpenAlex API | `is_oa: false`, **`any_repository_has_fulltext: false`**, no abstract index — matches |
| F29 OA status | Semantic Scholar Graph API | `openAccessPdf.status: "CLOSED"`, **empty URL**, disclaimer states the **abstract was elided by the publisher** — matches verbatim |
| F29 thesis record | Lirias DSpace REST `.../items/c08a2ccd-.../bundles` | `_embedded.bundles: []` — **no retrievable bitstream**. C1-W's "zero bitstreams deposited" is substantively correct |
| **F29 abstract** | **ERIC API, record EJ955402** — a route C1-W did **not** use | **Byte-for-byte identical** to the abstract quoted in the dossier, after whitespace/quote normalisation |

The F29 abstract match is the strongest single result in this record: an **independent repository this
pass never touched** returns the dossier's quoted abstract with **zero diff**.

---

## 1. Citation verification (Axis 1)

| # | Claim | Source | Indep. located? | Exists | Supports | Strength honest | State | Supporting location | Tier | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| F28 | Expert rating, zero learner responses, **r(23)=0.80, p<0.01** vs a population-calibrated IRT reference; full six-method ranking | Wauters, Desmet & Van Den Noortgate (2011), EDM 2011, 121–128 | **YES — full PDF re-downloaded and re-extracted** | ✔ | ✔ | ✔ | **VERIFIED** | §2.3 Results ¶3 + **Table I**; §2.2.1; §2.1.1; §2.1.4; §3 | **Q3** — correct | See §2 |
| F29 | Journal extension; abstract-scope only; body unread | Wauters et al. (2012), *Computers & Education* 58(4), 1183–1193, DOI 10.1016/j.compedu.2011.11.020 | **YES — metadata from Crossref; abstract from ERIC** | ✔ | ✔ (abstract scope) | ✔ | **VERIFIED (abstract) / UNVERIFIABLE (body)** — as the dossier already states | Abstract, ERIC EJ955402 ≡ Lirias | **Q4 while body-unread** — correct | See §4 |

**Kills: none. Dropped: none. Strength downgrades: none.**

---

## 2. The load-bearing number — verified figure by figure

Verbatim from this verifier's own `pdftotext` output of F28, §2.3:

> "The results of the Pearson correlation between the estimated item difficulty parameter and the true item difficulty parameter indicates that proportion correct has the strongest relation (r(23)=0.90, p<0.01), followed by learner feedback (r(23)=0.88, p<0.01), Elo rating (r(23)=0.85, p<0.01), expert rating (r(23)=0.80, p<0.01), paired comparison based on learners' feedback (r(23)=0.62, p<0.01) and paired comparison based on expert data (r(23)=0.56, p<0.01)."

| Figure the dossier reports | Independently confirmed? |
|---|---|
| Proportion correct **.90** | **YES** (prose + Table I `True β` column) |
| IRT-Study **.90** | **YES** (Table I) |
| Learner feedback **0.88** | **YES** |
| Elo rating **0.85** | **YES** |
| **Expert rating 0.80** | **YES** |
| Paired comparison (learner) **0.62** | **YES** |
| Paired comparison (expert) **0.56** | **YES** |
| **All at `r(23)`, `p<0.01`** | **YES — every one, verbatim** |
| Proportion correct **r=1.00** vs study-data IRT | **YES** |
| Reference standard = Selor's prior IRT calibration on examinee data | **YES** — §2.1.1: "IRT-based calibration conducted on preliminary examinee data by Selor, the selection agency of the Belgian government, serves as true difficulty parameter values." |
| **Expert arm consumes ZERO learner responses** | **YES** — §2.2.1 gives the full expert protocol; it contains no learner data at any step |
| 318 students, 13 experts (of 16 contacted), 25 items, df=23, **no CIs anywhere** | **YES** — §2.2.1; no confidence interval appears in the paper |
| Domain: French verb conjugation, "supposedly measuring one single skill" | **YES** — §2.2.1 |

**The headline number is exactly right.** The full ranking is exactly right. No transcription error, no
model mismatch, no inherited-ellipsis distortion.

### Verbatim discipline — independently re-tested

I extracted every quoted span ≥45 characters from the appended C1-W dossier section and string-matched
each, after Unicode/whitespace normalisation, against **my own** `pdftotext` output.

- **F28 quotations matched: 19 / 19.** Zero failures. This is the *identical count* C1-W self-reported
  ("19/19"), arrived at independently.
- The 9 non-matching spans are correctly non-F28: paper titles, the F29 abstract, the Pelánek §5.1
  quote, a V1d quote, and two dossier self-quotes. None is a claimed F28 quotation.
- **F29 abstract: 1 / 1**, exact against ERIC.

**C1-W's "20/20 confirmed verbatim" claim is upheld by fully independent re-extraction.** The
no-summarising-fetch claim is corroborated: I reproduced every quotation from raw bytes.

### The three counterweights — all three are present in the dossier

1. **Authors' own no-generalisation disclaimer** — dossier caveat 1, quoted verbatim and correctly
   attributed to §3. Source, verbatim: *"…no generalization can yet be made to other domains and to
   items requiring more than one skill."* The dossier calls it "the single most important sentence in
   the source for this product." **Correct, and correctly weighted.**
2. **Learners significantly out-performed experts** — present, with **both** halves: §3 "findings
   indicate that learners perform better on judging the difficulty of items than experts" **and** the
   statistic §2.3 **t(22)=2.71, p<0.05**. Both verbatim-confirmed. The dossier also carries the
   authors' own mitigating caveat (larger learner sample), which is the honest way to report it.
3. **Reference-population asymmetry** — present as caveat 4, and the expert question is quoted in full,
   verbatim: *"What is, according to you, the percentage of students that will answer this item
   correctly after completing secondary education?"* The dossier draws the right conclusion:
   **r = 0.80 is an upper bound for this product, not a central estimate.** The reasoning is sound —
   the 13 raters were French teachers estimating a population they teach; a blackjack trainer's author
   has no such calibrated reference group.

**The finding is not dishonest. All three counterweights land, in the dossier text, not just in the report.**

Additional counterweights I confirmed present and correctly quoted: the 25-item / rater-fatigue
limitation (§3); the sample-dependence sentence (§3); the ICC figures (experts "good" ICC[3,1]=0.68,
learners "fair" 0.42/0.43 — all verbatim); the Impara & Plake contradiction (§3, verbatim); and the
paired-comparison relocation with its Selor-calibrated anchors (§2.1.4, verbatim).

---

## 3. Did it land in the dossier, and was anything unrelated changed?

- **Landed:** every load-bearing claim in the report was checked **against the dossier text**, not the
  report. All present: the number, the table, the expert protocol, the three counterweights, the
  not-a-clean-win caveat, the independence statement, the ".76 is Yancey not Wauters" check, the
  ~100-students fence, the F27-stays-Q4 answer, the registered conflict. **Nothing claimed in the
  report is missing from the dossier.**
- **Append-only: HELD**, to the full extent verifiable without `git` (which I did not run). Evidence:
  no `C1-W`, `F28`, or `F29` token appears anywhere above the section heading at dossier line 934; the
  HEAD STATEMENT and the F27 record contain no trace of r = 0.80 or of this pass's proposals; the
  pre-existing settled-gap table (line 824) and Sufficiency Statement are intact and still read as
  V1d/C1-EC left them. The HEAD STATEMENT and F27 amendments are stated **as proposals in their own
  sections and were not applied** — exactly as the report claims.
- **Consequence, noted not charged:** the dossier's head block still reads "Running total: 26
  citations" and does not name C1-W. That staleness is the *correct* cost of strict append-only — the
  new running total (27 full + 1 partial) is stated inside the appended section. Flagging it for the
  orchestrator's reconciliation, not as a defect.

---

## 4. Adjudication of the three self-reported items

### (a) F29 body UNVERIFIABLE — **HONEST. Do not re-attempt.**

I re-ran four of the nine routes independently and all four returned exactly what C1-W logged
(Unpaywall 0 OA locations; OpenAlex `any_repository_has_fulltext: false`; S2 CLOSED with the
publisher-elision disclaimer; Lirias thesis bundles empty). The log is **accurate, not decorative**.

Assessment of exhaustiveness: the nine routes span OA aggregators (Unpaywall, OpenAlex, CORE, S2), the
publisher, the two major social/repository mirrors, and the authors' **own** institutional repository
including the PhD thesis that contains the chapter. That is a genuinely exhausting sweep for full text.
I found **one route C1-W did not try — ERIC (EJ955402)** — but ERIC holds only the abstract, so it
**does not change the terminal state**; it independently corroborates the abstract instead. There is no
legitimate route to the body short of a paywall or a mirror, both correctly refused.

**No claim in the dossier rests on the unread body.** I checked every F29-sourced statement: all are
either metadata (Crossref-confirmed) or abstract-scope, and each is explicitly labelled as such. The
Q4-while-body-unread tier is correct and consistent with the C1-EC precedent on F22.

### (b) Declining the F27 tier upgrade — **CORRECT.**

All three of C1-W's reasons hold on inspection:
1. Confirmed — Pelánek cites two primaries; Pelánek 2014 is uncollected and is by the overview's own
   author, so it could not add independence.
2. Confirmed — see (c); the Wauters programme measures **item difficulty**, while F27's proposition is
   about **moving-average baselines predicting answer correctness**. Different proposition.
3. Confirmed by direct inspection — F27's own caveat (dossier line 767) grounds Q4 partly in
   "an authoritative overview asserting a position", untouched by this pass.

Upgrading F27 on this evidence would have been the over-claim. **Declining was the right call, and the
right call in the direction that cost the pass credit.**

### (c) The self-registered conflict — **absence VERIFIED; conflict should be DOWNGRADED (in the pass's favour).**

Programmatic check on my own extraction of F28's full text:

- `"moving average"` — **0 occurrences** (case-insensitive). **Confirmed absent.**
- `"exponential"` — **0 occurrences**. **Confirmed absent.**
- The only occurrence of `moving` anywhere is in a **reference title**: BRINKHUIS & MARIS 2010,
  *"Adaptive Estimation: How to Hit a Moving Target."*

So the factual core of the conflict is exactly as registered. **But the conflict overstates itself, and
I am correcting it in the direction that favours the pass and favours F27:**

C1-W names *proportion correct* as "the nearest referent" in F28. **That identification is wrong.** The
nearer referent is the **Elo arm**. F28 §2.1.6 states the update rule β_n = β_0 + W(Y − Y_e) and that
"the weight given to new observations decreases when the rating of items is based on many observations"
— that is precisely an exponentially-weighted running estimate that discounts past attempts, which is
the mechanism Pelánek §5.1 describes ("past attempts are weighted by an exponentially decreasing
function"). The Elo implementation F28 uses is drawn from a paper literally titled *How to Hit a Moving
Target*. Elo scored r = 0.85 vs true β.

The **residual** mismatch is real but narrower than registered: Wauters estimates **item difficulty**,
whereas Pelánek's sentence concerns **predicting answer correctness / tracking changing skill**. That is
a genuine looseness in Pelánek's attribution, but it is a looseness of *target quantity*, not of
*technique* — Wauters does evaluate an exponentially-discounted online update.

**Recommended disposition: register as a WEAK/NOTED attribution imprecision, not a CANDIDATE conflict.**
This does not change F27's Q4 (grounded independently on narrative-secondary status), and it does not
require F29's body. The pass's own conclusion — "F27's direction survives; only precision of
attribution is in question" — is **right, and if anything understated its own case**.

---

## 5. The four "also check" items

| Item | Verdict |
|---|---|
| **~100-students fencing held; ~100 never quoted as measured** | **HELD.** The 200–250 figure appears only inside the quoted abstract and in the fencing paragraph, which imposes three explicit constraints (abstract-scope, "especially with" ≠ threshold, does not measure Pelánek's figure) and states ~100 "remains an unmeasured rule of thumb (Q4)". I grepped every `100 students` / `~100` occurrence in the dossier: none in the C1-W section asserts it as measured, and the two pre-existing mentions (lines 234, 394) predate this pass and already carry their own hedges. **The open question stays Q4.** |
| **r = 0.80 is not a clean win over F22** | **PRESENT and CORRECT.** Dossier lines 1009–1017 carry all four disqualifiers (Pearson vs Spearman; n=25/df=23 with no CIs vs F22's bootstrap intervals across six domains; different domain and reference standard; comparators from a different literature) and end with a deliberately narrow defensible statement. Cross-checked against the dossier's own F22 record: F22 is Kolesnikova et al. (2026), reports **Spearman**, and attributes .76 to **Yancey et al. (2024)** and .70 to **Attali et al. (2014)**. **The ".76 is not Wauters" check is correct.** |
| **F28's lab is wholly independent of the Groningen/SlimStampen cluster** | **VERIFIED from the paper's own author-address footnote:** all three authors are **ITEC/IBBT, Katholieke Universiteit Leuven, Kortrijk, Belgium**. Different country, lab, system, and domain from F17/F24/F25/F26. Also independent of Pelánek's Masaryk group, which only cites it. **The disclosed partial exception is real and correctly disclosed**: F28's Elo arm uses Brinkhuis & Maris (2010), and Brinkhuis is a co-author of F22 (Kolesnikova, Fedyanin, Hofman, **Brinkhuis**, Bolsinova, 2026) — I confirmed this from the dossier's F22 record. The expert-rating arm is genuinely unaffected. |
| **Funding / COI** | F28 contains **no funding, acknowledgement, grant, or conflict-of-interest statement at all** (0 matches). The dossier's "no disclosed commercial interest and none apparent" is accurate, though it reads as a clean statement where the truth is an **absence** of one. Recorded for precision; not a defect. |

---

## 6. The one editorial correction required

**Dossier line ~1183 (HEAD STATEMENT section) contains a non-verbatim string inside quotation marks.**

The dossier writes: *"the question put to the expert is literally «what percentage of students will
answer this item correctly»"*.

The source says: *"What is, according to you, the percentage of students that will answer this item
correctly after completing secondary education?"*

The rendering compresses "students **that** will" → "students will" and drops "after completing
secondary education". **Meaning is fully preserved and the complete verbatim quote appears earlier in
the same section**, so this is not a distortion and not a kill. But quotation marks around a
non-verbatim string is exactly the defect class Phase 1 caught three times, and it is the one item not
covered by the collector's own 19/19 count. **Remedy: editorial only — drop the quote marks or restore
the full sentence. No collection needed. Not gating.**

(Second, trivial: the C1-W section self-quotes the settled gap as "(a) no evaluation…" where the
dossier's own table at line 824 capitalises "No". Cosmetic.)

---

## 7. Dossier sufficiency (Axis 2 — judged independently)

**Verdict: INSUFFICIENT — unchanged, and this is the approved, honest COVERAGE GAP, not a new gap.**

Per the dispatch, C1's remaining INSUFFICIENT verdict has been ruled an approved coverage gap by the
user. I did not re-litigate it and I did not collect beyond what was needed to check C1-W's claims.
Confining myself to whether **this pass** left a *new* sufficiency hole:

- **It did not.** C1-W held to one source, registered five adjacent leads (Impara & Plake 1998;
  Chalifour & Powers 1989; Hambleton, Bastari & Xing 1998; Johns, Mahadevan & Woolf 2006; Wauters et al.
  2010 JCAL; Brinkhuis & Maris 2010) rather than chasing them, and each is a genuine reference-list
  item in F28 — I confirmed all six appear in F28's reference list at the pages cited.
- The Impara & Plake lead is correctly identified as the highest-value one: F28 **explicitly
  contradicts** it (§3, verbatim-confirmed), which makes it a live disagreement on the exact question of
  whether experts can estimate difficulty without data. Leaving it registered rather than chased was
  the correct discipline for a one-source pass.
- **The partial relief on settled gap (a) is honestly stated and correctly refused as grounds to
  re-open.** A 25-item fixed expert-authored single-skill bank rated by 13 subject experts is a real
  structural match; the ground truth coming from a government agency's population calibration is the
  real limit, and the dossier says so. Gap (b) — strategy/card-game domain evidence — is untouched, and
  the dossier says that too.

**No new focused pass is warranted by anything in C1-W.**

---

## 8. Verifier summary

- **VERIFIED: 1** (F28 — full text, all 19 quotations, every reported figure)
- **VERIFIED (abstract) / UNVERIFIABLE (body): 1** (F29 — terminal state upheld as honest)
- **DROPPED: 0  |  Kills: 0  |  UNVERIFIED remaining: 0**
- **Claims the collector overstated: none.** The pass **understated** its own case once (§4c).
- **Dossier sufficiency: INSUFFICIENT — pre-existing approved coverage gap, unchanged by this pass.**

### Rows returned for central reconciliation (NOT appended by me)

**Conflict register — amendment to existing conflict #31:**
> Downgrade #31 from CANDIDATE conflict to **NOTED attribution imprecision**. Verifier confirmed
> "moving average" and "exponential" are absent from F28's full text (0/0), but identified that the
> nearest referent is the **Elo arm** (§2.1.6: weight-decaying online update, implementation from
> Brinkhuis & Maris 2010, *"How to Hit a Moving Target"*), **not** proportion correct as C1-W proposed.
> Residual mismatch is target quantity (item difficulty vs correctness prediction), not technique.
> Does not affect F27's Q4. Does not require F29's body. **Do not re-run collection.**

**Source-lead register:**
> ERIC record **EJ955402** holds the F29 abstract in full and independently corroborates the Lirias
> extraction. Abstract only — **does not** open a route to the body; F29's body stays UNVERIFIABLE.

---

## 9. Statement on calibration

C1-W reported findings against its own interest three times (the population-light split, the
learners-beat-experts result, the conflict against F27's citation) and declined an invited tier
upgrade. I looked for the pessimism trap in the other direction and found the pass had **over**-charged
itself once, in §4c, which I have corrected in its favour.

I found no fabrication, no misquotation of substance, no number error, no wrong attribution, no
append-only violation, and no dishonest sufficiency statement. **One cosmetic quote-mark fix is the
entire correction list.** Judged on substance: **this is sound work, and the strongest-access,
best-evidenced finding in the C1 dossier.**

**C1-W: PASS.**

---

## 10. Compliance

- **No `git` command was run at any point.** No build, test, or install command was run.
- **Nothing was edited.** The dossier was read only. One new file written, inside
  `journal/raw/_inbox/foundation-audit-p1/verification/`.
- Nothing was written to the shared registers; rows returned above for central assignment.
- Retrieval was confined to re-obtaining the two sources under review plus the API metadata needed to
  test C1-W's retrieval log. No scope expansion, no new collection.
