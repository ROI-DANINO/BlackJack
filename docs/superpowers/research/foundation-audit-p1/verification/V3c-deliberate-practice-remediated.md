# Verification Record: C3 — Deliberate Practice (post-editorial-correction re-verification)

> Verifier: Claude (Opus 4.8, 1M) — V3c. **NOT** the collector, **NOT** C3-FP, **NOT** V3, **NOT** V3b,
> **NOT** the C3-EC editorial corrector. | Date: 2026-07-20
> Scope: re-verify the C3-EC editorial correction pass (14 findings changed, 9 examined and left
> unchanged, zero new sources), adjudicate one verifier-vs-verifier reversal, and re-judge sufficiency.
> Method: every primary source re-retrieved independently and read as extracted text, not accepted
> from any prior record. Nothing below is taken on the editor's word.

---

## PRIORITY ONE — RULING on the F3/F7 "attribution swap" reversal

**RULING: the editor is CORRECT. V3's F3b finding does not hold and is properly reversed. V3
over-corrected.**

I retrieved Macnamara, Hambrick & Oswald (2014) independently (`gwern.net/doc/psychology/2014-macnamara.pdf`)
and extracted its text layer. Page 1608 — the article's first page — prints **both** renderings:

**Abstract (p. 1608, left/full width), verbatim:**
> "More than 20 years ago, researchers proposed that individual differences in performance in such
> domains as music, sports, and games largely reflect individual differences in amount of deliberate
> practice, **which was defined as** engagement in structured activities created specifically to
> improve performance in a domain."

**Body text (p. 1608, right-hand column, opening section), verbatim:**
> "This view holds that expert performance largely reflects accumulated amount of deliberate practice,
> **which Ericsson et al. defined as** engagement in structured activities created specifically to
> improve performance in a domain."

Both sentences are on the same printed page. **F3 quotes the Abstract rendering and is correct. F7
quotes Ericsson & Harwell quoting the body rendering and is correct** — I confirmed E&H's rendering
verbatim in the Frontiers full text at the section "Differences in the Two Definitions of Deliberate
Practice by Ericsson et al. (1993) and Macnamara et al. (2014, 2016)":

> "Consistent with their search for deliberate practice, Macnamara et al. (2014, p. 1608, italics
> added) introduced their definition of 'deliberate practice, which Ericsson et al. *defined* as
> engagement in structured activities created specifically to improve performance in a domain.'"

Neither finding was misattributed. V3 saw one rendering in each paper and inferred a swap; in fact
**both papers reproduce both renderings** (E&H additionally quote the *abstract* rendering at their
p. 3 — V3's own record documents this, which is the internal evidence that V3's inference was
unsafe). The editor's diagnosis is exact and its preservation of V3's *substantive* residue — that
Macnamara's body phrasing presents the definition as Ericsson's own, which is the attribution E&H
spend 2019 rejecting — is the right call. **No correction required. The reversal stands.**

## PRIORITY ONE(b) — RULING on the F7 tier upgrade Q3 → Q1

**RULING: the upgrade is WARRANTED.** E&H's embedded reanalysis applies three stricter inclusion
criteria to Macnamara et al.'s 191 non-aggregated effect sizes, reducing them to 14 independent effect
sizes across 12 studies, and computes sample-weighted random-effects means via Comprehensive Meta
Analysis v3.3 (confirmed verbatim in the Frontiers text, including the software name and version).
That is a meta-analysis by method, and Q1 is the correct tier for the *component*. The dossier
correctly holds the **paper overall at Q4** (narrative rejoinder), which is also right — E&H's
argumentative frame is not a systematic review. The two-level treatment is the honest one. Recorded
as an upgrade against the collector's interest, as the editor claims.

---

## Axis 1 — citation verification of the corrections

### Sources independently re-retrieved by V3c

| Source | Route | Result |
|---|---|---|
| Macnamara, Hambrick & Oswald (2014) + 2018 Corrigendum | `gwern.net/doc/psychology/2014-macnamara.pdf`, full text layer extracted | **Obtained**, incl. corrigendum pp. 1202–1204 and both parts of Table 1 |
| Ericsson & Harwell (2019) | Frontiers HTML full text, raw fetch + tag-stripped, offset-indexed | **Obtained**, 133k chars |
| Hambrick, Macnamara & Oswald (2020) | Frontiers full text | **Obtained** |
| Macnamara & Maitra (2019) | PMC6731745 full text | **Obtained**, 72k chars |
| Hambrick et al. (2014), *Intelligence* 45, 34–45 | `gwern.net/doc/psychology/2014-hambrick.pdf`, 13pp text layer, page-indexed | **Obtained** |
| Ericsson, Krampe & Tesch-Römer (1993) | `gwern.net/doc/psychology/1993-ericsson.pdf`, 44pp | **Obtained** |
| Ericsson (2014), *Intelligence* 45, 81–103 | 4 routes attempted (gwern ×2, LSE mirror, publisher) | **UNVERIFIABLE by V3c** — see Quarantine |

### The corrigendum figures — F3, F10, Candidate conflicts

**Every figure re-verified EXACT against the corrigendum's Table 1, both parts.** Verbatim from the
corrigendum, "Main model (p. 1612)" panel and the continuation on p. 1203:

| Cell | Originally reported | Corrected | Dossier | State |
|---|---|---|---|---|
| Overall r | .35 [.30, .39] | **.38 [.33, .42]** | .38 [.33, .42] | ✅ |
| Overall variance | 12% (88% unexpl.) | **14% (86% unexpl.)** | 14% / 86% | ✅ |
| I² | 84.90 | **88.54** | 88.54 | ✅ |
| Domain moderator | Q(4)=49.09 | **Q(4)=36.61, p<.001** | Q(4)=36.61 | ✅ |
| Games | 26% (r̄=.51) | **24% (r̄=.49)** | 24% / .49 | ✅ |
| Music | 21% (r̄=.46) | **23% (r̄=.48)** | 23% / .48 | ✅ |
| Sports | 18% (r̄=.42) | **20% (r̄=.45)** | 20% / .45 | ✅ |
| Education | 4% (r̄=.21) | **5% (r̄=.22)** | 5% / .22 | ✅ |
| Professions | <1% (r̄=.05, p=.62) | **1% (r̄=.09, p=.377)** | 1% / .09 / .377, n.s. | ✅ |
| Predictability moderator | Q(1)=20.49, b=0.14, T²=.05 | **Q(1)=11.32, b=0.12, T²=.05** | as corrected | ✅ |
| High predictability | 24% (r̄=.49) | **23% (r̄=.48)** | 23% / .48 | ✅ |
| Moderate predictability | 12% (r̄=.35) | **14% (r̄=.37)** | 14% / .37 | ✅ |
| Low predictability | 4% (r̄=.21) | **6% (r̄=.25)** | 6% / .25 | ✅ |
| Solitary-DP model | games 23 / music 23 / sports 22, overall 11% | **games 22 / music 25 / sports 18, overall 14%** | as corrected | ✅ |

**All 14 of F10's core figures re-verified EXACT.** The editor's claim holds. `b = 0.12 (was 0.14)`
is confirmed present in the corrigendum's Table 1 continuation and was indeed absent from the
pre-C3-EC entry.

**"education 3% is not among the rows the corrigendum revises":** ✅ CONFIRMED. The solitary-practice
panel lists only overall, games, music and sports. Correct and non-obvious.

**Originals marked, not silently replaced:** ✅ CONFIRMED. F3 carries a `SUPERSEDED` banner naming
the correcting source, year and DOI; the 2014 values are retained *once*, verbatim, explicitly
labelled. F11 carries the same treatment. The Candidate-conflicts block names the superseded values it
replaced. This is the right pattern — the dispute literature quotes the 2014 numbers, so a reader who
meets them elsewhere can reconcile.

**F3's superseded verbatim quote** re-checked character-by-character against p. 1612:
> "Percentage of variance in performance explained by deliberate practice was 26% for games (r̄ = .51,
> p < .001), 21% for music (r̄ = .46, p < .001), 18% for sports (r̄ = .42, p < .001), 4% for education
> (r̄ = .21, p < .001), and less than 1% for professions (r̄ = .05, p = .62; see Fig. 3)"

✅ **VERBATIM.**

**F10's error-description quote** re-checked against p. 1202 — all three fragments exact, ellipses
correctly placed, no meaning-altering elision. ✅ **VERBATIM.**

### F11 / INFERENCE point 5 — the interpretation fix. Every element verified.

This is the correction with the most product weight and it is the most thoroughly right.

1. **"Continuous meta-regression moderator, not subgroups"** — ✅ VERIFIED, by three independent
   structural signals I checked myself in the 2014 text:
   - The test is **Q(1) with a reported slope b**, against **Q(4)** for domain (5 categories, 4 df).
     A categorical moderator with three levels would be Q(2). Verbatim, p. 1612: *"Predictability of
     the task environment was also a statistically significant moderator, Q(1) = 20.49, b = 0.14,
     T² = .05, p < .001."*
   - The interrater passage (p. 1611) names predictability as **the quantitative variable**, singular,
     with all other moderators categorical. Verbatim: *"As indexed by Cohen's kappa for the
     categorical variables and Spearman's rho for the quantitative variable, interrater agreement
     ... domain: κs = .99–1.00; predictability of the task environment: ρs = .89–.96; method used to
     assess deliberate practice: κs = .91–.98..."* Spearman's rho is applied to predictability alone.
   - The score is the mean of two 1–3 ratings, so it takes five values, not three.
2. **"Fitted values, not subgroup means"** — ✅ follows necessarily from (1). Correct.
3. **"No per-tier k exists"** — ✅ **VERIFIED DIRECTLY, and this is the load-bearing one.** I read
   Table 1 ("Descriptive Characteristics of the Meta-Analysis", p. 1612) in full. It reports effect
   sizes and participants for **Domain** (5 rows), **Method used to estimate deliberate practice
   hours** (3 rows), **Method used to estimate performance** (4 rows), and **Publication status**
   (2 rows), totalling 157 / 11,135. It reports **no predictability rows at all**. There is no per-tier
   k because the model has no tiers. The dossier's replacement of "not yet fetched — chase Fig. S1 /
   Open Data" with "structurally unavailable, not merely unlocated" is **correct**, and withdrawing
   that future lead saves real wasted effort.
4. **Corrected 23 / 14 / 6** — ✅ verified above.
5. **"No bands, a slope"; nothing licenses placing blackjack in a tier** — ✅ **CORRECT and, in my
   judgement, the single most valuable thing this pass did.** The pre-existing text invited a
   downstream reader to slot blackjack into "the low-predictability tier" and read off 6%. That move
   is not available. The rewritten caveat says so explicitly and in the right register.

**Table 1 cross-check on F3's own location claim:** the editor moved F3's Table 1 reference to
p. 1612 and noted this also corrects V3's "Table 1 p. 1611". ✅ CONFIRMED — Table 1 and the moderator
text are on the same page. **Games: 11 effect sizes, N = 1,291** ✅ exact.

### INFERENCE point 4 — .50–.51 → .49–.50

✅ **VERIFIED.** Loose-definition games r̄ = **.49** (corrigendum). Strict-definition games r = **0.50**
(E&H, verbatim: *"for effect sizes from the domains of games (r = 0.50, k = 5), music (r = 0.71,
k = 3), and sports (r = 0.58, k = 5)"*). The corrected range is right, and the editor's stated reason —
that a live number inside an INFERENCE block escapes citation-level checking — is a sound reason to
have bothered with a 0.01 drift.

### The 61% dependency block

✅ **VERIFIED, and it is arithmetically airtight.** I re-derived every figure:

- 61%: r = .54 ÷ √(0.60 × 0.80) = .779 → **60.8%** ✅ (E&H's own stated 61%)
- 49%: r = .56 ÷ √(0.80 × 0.80) = .700 → **49.0%** ✅ (matches the 2020 reply's verbatim
  *"rc = 0.70, indicating that deliberate practice explains 49% of the reliable between-person
  variance in performance (rather than 61%)"*)
- Grid minimum: r = .51 ÷ 0.90 = .567 → **32.1%** ✅
- Grid maximum: r = .56 ÷ 0.60 = .933 → **87.1%** ✅
- Old dossier figure: r = .54 ÷ 0.90 = .600 → **36.0%** — confirmed to be the **first panel's**
  minimum only, exactly as the editor states.

The reliability dependency is stated: Ericsson's own published values are **0.70–0.80** (Tuffiash
et al. 2007 *"at or above 0.80"*; Ericsson 2012 *"typically been found to range between 0.7 and 0.8"* —
both verbatim ✅), against the **0.60** E&H assumed. At 0.80 the same data yields **49%**. ✅ All
present, and the dependency travels with the number: it appears in F7's heading, in F7's body as a
`MANDATORY DEPENDENCY` block, in the Candidate-conflicts section inline, and in F9. I checked all four
sites. **No unqualified use of 61% survives anywhere in the dossier.**

The editor's added **panel subtlety** — that 61% comes from the *combined* panel and 49% from the
*deliberate-only* panel, so "the same data" is slightly cleaner than the arithmetic — is ✅ CONFIRMED
against Table 3's three panels (r = .54 / .51 / .56) and is a genuinely sharp catch that runs against
the dossier's own rhetorical convenience.

### The killed sub-claim

✅ **VERIFIED on all three counts.**
1. **"defensible" appears nowhere in Ericsson & Harwell (2019).** I regex-searched the full
   tag-stripped Frontiers text for `defensible` and `Defensible`: **zero matches.** Independently
   corroborated by a second retrieval route.
2. **The phrase is Macnamara's, reproduced to be rebutted.** Verbatim from E&H:
   > "...and that '*deliberate practice is important, but not as important as has been argued.*'
   > **In contrast, we argue** that the current knowledge of the relation between quantity and quality
   > of practice and resulting improvements in performance is steadily increasing..."

   A rebuttal, not a concession. The original dossier's rendering was a sign-flip. Correctly killed.
3. **Not reintroduced.** I swept the dossier for `defensible` (case-insensitive): 9 occurrences, all
   legitimate — the C3-EC note that records the kill, F9's actual published title *"Is the Deliberate
   Practice View Defensible?"*, and ordinary English usage ("the defensible residue", "is not
   defensible", "the defensible reading"). **No reintroduction.** The editor's identification of the
   title as the probable contamination vector is plausible and worth having on record.

The surviving half of the caveat — genetics *"remarkably small"* — ✅ verified verbatim in E&H's
abstract: *"genetic effects have so far accounted for remarkably small amounts of variance – with
exception of genetic influences of height and body size."* Correctly kept.

### Page-reference corrections (spot-checked)

| Correction | State | Evidence |
|---|---|---|
| F4 chess quote p. 37 → **p. 38** | ✅ VERIFIED | PDF page 5 of 13 = journal p. 38; §3.2 "Discussion of chess reanalyses" and the 34%/66% sentence both sit there |
| F4 music quote p. 40 (unchanged) | ✅ VERIFIED | PDF page 7 = p. 40; §4.1 "Results of music reanalyses" |
| F4 "not even close to sufficient" p. 41 (unchanged) | ✅ VERIFIED | PDF page 8 = p. 41 |
| F4 caveat: rxx=.60 → 54.7% unexplained | ✅ VERIFIED | verbatim p. 38: *"Even assuming a low level of reliability (rxx = .60), deliberate practice left a very large proportion of the variance in chess performance unexplained (54.7%)"* |
| F9 p. 8 → **p. 9**; Table 3 p. 9 → **p. 10**; 19 → **21 pp.** | ⚠️ PARTIAL — see Correction C-3 | quote content verified; pagination relayed from V3b, and **F9's body still prints "(p. 8)" three times** |
| F9 range 36.0 → **32.1–87.1%** | ✅ VERIFIED | arithmetic re-derived above |
| F11 worked examples p. 1611 → **p. 1609** | ✅ VERIFIED | the passage *"There were three levels of predictability—low, medium, and high. An example of an activity with a low-predictability environment was handling an aviation emergency..."* is in the Introduction under "Our second goal", on the article's second page = p. 1609 |
| F3 page refs "p. 5" → journal pagination p. 1612 | ✅ VERIFIED | consistent throughout |

### F10 — "every ranking unchanged" narrowed to the main model

✅ **The correction is CORRECT and necessary**, and all three counter-example figures are exact
against Table 1 p. 1203. ⚠️ But two of the three are mischaracterised — see Correction C-2.

- *solitary + excluding team sports*: sports **28% → 21%**, games 23→22, music 23→25. Sports moves
  from **sole top to sole bottom**. ✅ A genuine, decisive ranking counter-example. This one alone
  establishes the editor's point.
- *solitary*: sports **22% → 18%**, music **23% → 25%**. ✅ figures exact. ⚠️ But the dossier says
  this moves "sports from joint-top to bottom of the three." Sports was **22% against games 23% and
  music 23% — already the lowest of the three.** It was never joint-top. The real ranking change in
  this model is games and music separating from a tie.
- *excluding team sports*: sports **19% → 16%**. ✅ figures exact. ⚠️ But the ranking in this model is
  games > music > sports both before (26/21/19) and after (24/23/16). This is a magnitude move, **not
  a ranking counter-example**, and it is listed under "Counter-examples."

### The three paraphrases-printed-as-verbatim

| # | State | Evidence |
|---|---|---|
| **F1** | ✅ **NOW GENUINELY VERBATIM** | EKT 1993 p. 368: *"the teacher designs practice activities that the individual can engage in between meetings with the teacher. We call these practice activities deliberate practice and distinguish them from other activities, such as playful interaction, paid work, and observation of others, that individuals can pursue in the domain."* Matches the corrected dossier exactly. The editor's contamination diagnosis is also confirmed — the adjacent sentence *"Consider three general types of activities, namely, work, play, and deliberate practice"* is present on the same page, which is exactly where "work, play, and observation of others" came from. |
| **F4 music** | ✅ **NOW GENUINELY VERBATIM** | p. 40: *"On average, deliberate practice explained 29.9% of the variance in performance after correcting for measurement error variance (avg. r̂ = .52; sample size-weighted avg. r̂ = .52), leaving 70.1% of the variance unexplained and potentially explainable by other factors."* The dossier's ellipsis correctly marks the elided second r̂ clause. |
| **F5** | ⚠️ **UNVERIFIABLE by V3c** | Ericsson (2014) could not be obtained by any of four routes. The correction ("relation **of**" not "relation **between**") is relayed from V3's direct PDF read and is labelled as such in the dossier. V3 additionally corroborated the surrounding sentence against Hambrick et al.'s published reply. I could not independently confirm the preposition. Recording this as honest quarantine, not as a defect. |

### F1/F6/F2 additional checks not in the brief

- EKT 1993 monotonic-benefits quote ✅ verbatim (*"the amount of time an individual is engaged in
  deliberate practice activities is monotonically related to that individual's acquired performance.
  This assumption can be tested empirically."*).
- EKT feedback/repetition quotes ✅ verbatim.
- F6 tier Q2 → Q3 ✅ **WARRANTED.** M&M 2019 compares pre-existing, faculty-nominated skill groups via
  retrospective interview. No manipulation, no random assignment. The editor's reasoning —
  pre-registration and double-blinding are bias controls, not a design class — is exactly right, and
  framing it as the same tier as the original it replicates is the apter comparison.
- F6 26% re-attribution ✅ **VERIFIED and precisely right.** Verbatim: *"We found a significant effect
  of group for accumulated practice alone until age 18, χ²₂ = 13.90, p = 0.001, η² = 0.26"* — the 26%
  is the **three-group** test. And: *"Ericsson et al.'s comparison of practice alone between the best
  and good violinists combined as a single group and the less accomplished violinists explained 48% of
  the variance in performance."* The dossier's corrected 48%-vs-26% framing is exact.

---

## Spot-checks of the NINE items left unchanged

I read five of the nine in the sources rather than in the dossier. The editor is **well-calibrated,
not lazy** — with two narrow exceptions.

| Item | Verdict |
|---|---|
| **F2** | ✅ Every figure exact against EKT 1993 p. 379 and p. 383: 7,410 / 5,301 / 3,420 hr, F(1,27)=4.59 p<.05, F(1,27)=11.86 p<.01; pianists 7,606 vs 1,606, F(1,22)=26.29 p<.001. ⚠️ One silent truncation — see Correction C-4. |
| **F6 quotes/figures** | ✅ M = 8224 / 9844, t(24) = −0.93, p = 0.364, d = −0.38 exact; the 2894–11 926 h CI passage verbatim; the "impossible to catch up" contradiction verbatim; teacher-designed 23% vs practice-alone 26% verbatim (*"Accumulated amounts of practice alone (26%) and teacher-designed practice (23%) explained similar amounts of variance in performance"*); n = 39 confirmed via r₃₇ = 0.72. ⚠️ Same truncation as F2 — see C-4. |
| **F9 raw r = .54** | ✅ Correct to leave. The 2020 reply disputes only the attenuation input; the raw correlation on the 14-study strict subset is not contested by either side. The dossier reads its source correctly. |
| **F10 core figures** | ✅ All 14 re-verified exact (table above). The editor's claim is true. |
| **F11 qualifications (1) and (2)** | ✅ **Correct to leave, and the editor's judgement here is good.** Qualification (1) ("analogy, not measurement") and (2) ("smaller, not absent — r = .25 is positive and significant") are both accurate, both necessary, and honest **in both directions** — (2) explicitly guards against the *opposite* overstatement, that practice fails in stochastic domains. The rewritten caveat (3) does make (1) more apt, not less. This is the best-disciplined writing in the dossier and touching it would have made it worse. |
| **INFERENCE pts 1–3** | ✅ Fair syntheses. Point 3 states that the project's own most attractive claim ("practice accounts for most of the difference between best and average users") is the one that does not survive, and it is correctly bucketed Product judgement. No over-claim. |
| **Coverage gaps #2–#3** | ✅ Both correct and well-argued. #2 (elite-population-only samples) is materially important for this product — the dossier's whole literature is about what separates a concertmaster from a competent professional, not novice acquisition, which is the product's actual primary use case. Correct to leave and correct to have flagged. |
| **F8** | ✅ Correct to leave. V3b verified it against the **published** *Intelligence* version and its own first-pass doubt was an edition artefact that would have produced a false kill. Leaving it and letting V3b's record carry the near-miss is right. |
| **Overflow leads / scope block** | ✅ Bound-respecting omissions, named in writing. Compliance, not insufficiency. |

---

## Corrections required (all MINOR; none changes a figure, a bucket, or a verdict)

### C-1 — F7's "stitched fragment" note is itself wrong. **This is the one substantive defect.**

The C3-EC note (2) on F7 asserts that the relabelling half of the quote *"is located in the **abstract**
(and again at p. 3), where it reads in full: 'To avoid confusion between our original definition ...
we will refer to their definition as structured practice, which is consistent with a terminology
proposed by Hüttermann et al. (2014)'"*, and concludes *"The single '(p. 5)' cite covering both halves
is therefore wrong for the second half."*

**Verified false.** I offset-indexed the full Frontiers text. That exact sentence occurs **once**, at
offset 33493 — inside the body section *"Differences in the Two Definitions of Deliberate Practice by
Ericsson et al. (1993) and Macnamara et al. (2014, 2016)"* (section header at offset 31896) — i.e.
**the same section, ~1,000 characters after** the "introduced their definition" half at offset 32503.
The **abstract** (offset 7388) contains a *different* sentence: *"Their definition of 'deliberate
practice' differs significantly from the original definition of deliberate practice and will
henceforth be referred to as structured practice."*

So: the two halves of the dossier's quote sit in the same section within a page of each other, the
`(p. 5)` cite is **correct for both**, and the ellipsis is ordinary quoting practice. **The editor
invented a citation defect that does not exist.** Root cause is visible: V3's record correctly located
*the abstract's paraphrase* under the heading "Relabelling: abstract"; the editor attached that
location to the *body's* sentence without re-checking. This is an error of the pessimistic kind, in a
pass explicitly warned about pessimism drift.

**Remedy:** strike C3-EC note (2) on F7, or rewrite it to say that E&H state the relabelling twice —
once in the abstract in different words, once in the body at p. 5 in the words quoted — and that the
`(p. 5)` cite is correct. Note (1), the attribution reversal, is unaffected and stands.

### C-2 — F10's ranking counter-examples: two of three are mischaracterised

Figures all exact; characterisations not. (a) In the *solitary* model sports was **already lowest**
(22% vs 23%/23%) and cannot have moved "from joint-top to bottom." (b) The *excluding team sports*
model shows **no ranking change at all** (games > music > sports before and after) and is not a
counter-example to a ranking claim. **Remedy:** keep the *solitary + excluding team sports* case
(28% → 21%, sole top to sole bottom), which fully establishes the point; recast the other two as
magnitude movements. The correction's substance — that "every" was true only of the main model — is
**correct and should stand**.

### C-3 — F9's body still prints "(p. 8)" three times against its own corrected header

F9's `Proposed supporting location` was corrected to **p. 9**, but the `Claimed strength` block below
it still cites the reliability-critique quote and both Ericsson-side reliability quotes to
**"(p. 8)"** — three occurrences. The finding now contradicts itself on the page number a reader would
actually follow. **Remedy:** propagate p. 8 → p. 9 in F9's body. (Pagination itself relayed from V3b's
PDF read; V3c did not independently re-paginate the 2020 Frontiers article, only its content, which
verified verbatim.)

### C-4 — a fourth non-verbatim quote survives, and two silent truncations

The pass reported three paraphrases-printed-as-verbatim and fixed three. A fourth is in the very
sentence whose page reference it corrected:

- **F4 chess quote.** Dossier: *"deliberate practice explained 34% of the reliable variance **in
  performance in chess performance**, leaving 66% unexplained..."* Source (p. 38): *"deliberate
  practice explained 34% of the reliable variance **in chess performance**, leaving 66% unexplained
  and potentially explainable by other factors."* A duplicated phrase inside quotation marks.
- **F2 and F6 "complete correspondence."** Both render EKT's p. 379 sentence as ending *"...their
  average accumulation of practice time alone"* with the quotation closed. The source — confirmed in
  EKT 1993 directly and in M&M 2019's quotation of it — ends *"...practice time alone **with the
  violin**."* Truncated mid-sentence without ellipsis, twice. Substantively nil, but both were
  examined this pass and declared "verbatim."

**Remedy:** restore the F4 wording; add a closing ellipsis or the three missing words in F2 and F6.

### C-5 — wrong source-lead register IDs, one of them propagated into the dossier

The dossier's Coverage-gap #1 cites Meinz et al. (2011) as *"source-lead **#29**"*. Against the live
`registers/source-lead-register.md`:

- **#29 = Qin et al. (2003)**, the fMRI paper belonging to **card C2**.
- **#34 = Meinz et al. (2011)**, the poker study. This is the correct ID.
- **#28 = Pane et al. (2014)**, Cognitive Tutor Algebra — another card entirely.
- **#33 = the LSE-vs-published edition hazard**, which the editorial report calls "#28".

Origin is V3b, which wrote *"Appended as source-lead #29"* — a **predicted** ID that the
orchestrator's central reconciliation landed at #34. The editor relayed it without checking the live
register. **This has an operational consequence:** the editorial report's proposed register updates
would, if executed literally, annotate C2's Qin row with a poker note and the Cognitive Tutor row with
an edition hazard. **Remedy:** #29 → **#34** in the dossier's Coverage-gap #1 and in the report;
#28 → **#33** in the report. (#14 and #15 spot-checked and **correct** as the report states.)

---

## Kills
**None.** No claim lost its support in this pass.

## Reversals / upgrades (recorded because they run against the pessimistic direction)
- **V3's F3b attribution-swap finding — REVERSED.** V3's correction was an over-correction; the source
  prints both renderings on p. 1608. Route to whoever owns V3's record.
- **F7 embedded-reanalysis tier Q3 → Q1 — UPHELD** as warranted.
- **F6 tier Q2 → Q3 — UPHELD** as warranted.
- **Nine unchanged items — UPHELD.** Five read in the sources; all correct as written.

## Quarantine (UNVERIFIABLE by V3c)
- **Ericsson, K.A. (2014), *Intelligence* 45, 81–103.** Four retrieval routes attempted (gwern ×2, LSE
  mirror, publisher); none yielded the article. F5's "relation **of**" correction is therefore relayed
  from V3's direct PDF read and remains labelled as such in the dossier. Not a defect; V3's read is on
  record and independently corroborated in part. No register row needed — the source is *collected*,
  merely not re-obtainable by this verifier's routes.

## Conflicts surfaced
**No new conflicts.** The editor's assessment is correct: every conflict touched (#3 definitional,
#13 corrigendum supersedes, #14 61%-vs-49% reliability, #18 predictability moderator) is already
registered, and this pass's findings are editorial defects in prose, not disagreements between sources.

---

## Axis 2 — Dossier sufficiency

**Verdict: SUFFICIENT** (unchanged, and I concur that it now stands more cleanly).

**Assessment of the editor's reasoning.** The editor's operational test is: *every correction was made
from sources the dossier already cited; none required or exposed the need for a new source.* I
**verified that claim rather than accepting it** — I traced every one of the 14 changed findings to
its source, and all of them resolve inside Macnamara et al. (2014), its 2018 Corrigendum, Ericsson &
Harwell (2019), Hambrick et al. (2014), Hambrick et al. (2020), EKT (1993) or Macnamara & Maitra
(2019). All seven are already in the dossier. **The test holds.**

It is also, I think, the *right* test, and worth naming as a program-level pattern: sufficiency asks
whether further *searching* would move the conclusions. A remediation pass that closed every defect
without opening a single new source is direct evidence that the answer is no. That is a stronger
argument for SUFFICIENT than V3b could make prospectively, because V3b was predicting it and this pass
demonstrated it.

**V3b's four-defect caveat is discharged.** V3b recorded SUFFICIENT alongside four unfixed defects and
warned the verdict should not be read as clean. I checked all four in the current dossier:

| V3b defect | State |
|---|---|
| F3's uncorrected headline figures | ✅ **Fixed** — corrected throughout, originals marked SUPERSEDED, at all five sites |
| F7's still-present killed sub-claim | ✅ **Fixed** — struck, re-bucketed Unsupported, verified not reintroduced |
| F11's misdescribed moderator method | ✅ **Fixed** — and better than V3b asked for; the per-tier-k gap is now correctly recorded as structurally unavailable and the wasted lead withdrawn |
| Coverage-gap #1's overstatement | ✅ **Fixed** — two claims struck, the honest residual kept, and the internal contradiction with INFERENCE point 5 explicitly resolved by a governing cross-reference |

The verdict is now backed by a dossier that says what it holds. The five outstanding items (C-1
through C-5) are all editorial and none of them touches the sufficiency axis.

**The out-of-bound leads.** ✅ **Both remain registered and uncollected, not quietly dropped.**
- Meinz et al. (2011), poker — present in the live register at **#34** (miscited as #29; see C-5),
  status "not attempted... judged OUTSIDE C3's stated bound," and now *cited in the dossier itself* in
  Coverage-gap #1 as the reason the sweeping claim was struck. This is the correct handling: the lead
  is doing work in the dossier without being counted as collected.
- Kahneman & Klein (2009) — present at **#30**, "not attempted by any C3 pass... squarely outside C3's
  stated bound," routed to a domain-transfer card. Uncollected and registered.

Neither makes C3 insufficient. Both belong to a domain-transfer card, and I agree with that routing —
Kahneman & Klein in particular is the landmark that speaks to the product's real question (*is skill
learnable at all in a low-validity environment?*) rather than C3's question (*how much variance does
practice explain?*), and it should not be absorbed into this card.

**Residual sufficiency observation, not a defect:** Coverage gap #2 (elite-population-only samples)
is the gap with the most product consequence, and it remains genuinely open. Every study here explains
variance *among already-selected experts*. A blackjack trainer's primary user is a novice. The dossier
names this correctly and does not overclaim past it — but a downstream product decision should treat
it as the binding constraint on this entire card, more binding than the predictability moderator.

---

## Summary judgement on the editorial pass

**Sound work.** The corrigendum handling is exhaustive and exact — 14 of 14 figures verified, at every
site they appear, with originals marked rather than erased. The F11 rewrite is the most valuable thing
in this pass: it correctly identifies that predictability is a slope rather than three bands, proves it
from three independent structural signals, verifies that the per-tier k is structurally unavailable
rather than merely unfetched, withdraws a lead that would have wasted a future pass, and states
plainly that nothing in the dossier licenses placing blackjack in a tier. The 61% dependency block is
arithmetically airtight and I re-derived every cell. The sign-flip kill is correct and did not
reintroduce. The nine items left alone were left alone correctly, including the two F11 qualifications
that carry the most product weight.

The reversal and the self-adverse upgrade are both correct on the merits, not gestures.

Against that: five minor defects, of which **C-1 is the only one I would call substantive** — an
invented citation defect, in the pessimistic direction, in a pass explicitly briefed about pessimism
drift. C-5 has an operational bite (it would corrupt another card's register rows if executed). C-2,
C-3 and C-4 are prose hygiene. None of them changes a figure, a bucket, a tier, or a verdict.

**No kills. Zero figures wrong. One reversal upheld, two tier changes upheld, five minor corrections
required.** I am recording zero-kills as a genuine result, not as a clean bill of health: I read five
of the nine unchanged items in the sources precisely so that "nothing wrong" would mean something.
