# Verification Record: C4c — Chess.com and Khan Academy learning models (remediation top-up)

> Verifier: Claude (Opus 4.8) — V4c, independent of the collector (C4-RT), of C4-FP, of V4 and of V4b
> | Date: 2026-07-20
> Contract: exists + supports + strength-honest. VERIFIED requires an exact supporting location.
> Every source is INDEPENDENTLY located by the verifier — the collector's summary is not trusted.
>
> **Scope per dispatch.** PART 1 verifies **F13 only** (the single citation added by pass C4-RT under
> `## Findings added by remediation sufficiency top-up`). F1–F9 were verified by V4; F10–F12 by V4b.
> Neither pass was redone. PART 2 re-judges sufficiency of the whole dossier now that F13 is in, and
> rules on the two divergences the collector escalated.

**Method note — deliberately a different instrument from the collector's.** The collector read the
ERIC PDF directly through a fetch tool and declared it had no `pdftotext` route. I therefore chose the
route it could not use, so that this is a genuine second reading rather than the same instrument run
twice. I downloaded `https://files.eric.ed.gov/fulltext/EJ1146230.pdf` with `curl` (550,845 bytes),
confirmed via `pdfinfo` that it is an 8-page PDF (Microsoft Word 2013, created 2017-06-24), and
extracted it twice with `pdftotext` — once with `-layout` (3,402 words) and once without (3,401) — then
read the full extraction and grepped it. Page attributions below are from the printed folios in the
extraction (70–77), which I mapped by locating each folio marker and assigning the text preceding it.
Statistical claims were **recomputed**, not eyeballed: I implemented an incomplete-beta t-distribution
in Python (scipy is unavailable in this environment) and reconstructed every reported p-value from the
paper's own t, df, M, SD and N. Those computations are what decided the two internal-inconsistency
adjudications, and they produced sharper answers than the collector reached.

**Headline.** F13 is **VERIFIED**, and it is the most carefully handled citation I have seen in this
card. Every quotation is verbatim, every statistic is exact, every one of the eleven page attributions
is correct, the design description is accurate in every particular I tested, and the Q3 grade is
warranted. The collector's two flagged internal inconsistencies are **both real** and I confirmed them
by independent computation — indeed one of them is *stronger* than the collector claimed. The
funding/COI distinction the dispatch singled out **holds**. Five defects are recorded below; **none is
a kill**, four are minor, and one — the source count — matters because the dispatch specifically asked
me to rule on it and the collector's replacement figure is itself wrong. One correction runs in the
collector's *favour*.

---

## PART 1 — Citation verification

| # | Claim | Source (id / title / URL·DOI) | Indep. located? | Exists | Supports | Strength honest | State | Supporting location (VERIFIED only) | Quality tier | Notes / downgrade |
|---|---|---|---|---|---|---|---|---|---|---|
| F13 | The only independent controlled study of Khan Academy located by this program comparing it against **active** controls — grade 7, 4 weeks — found **no statistically significant difference** on any of three comparisons; small, short, below-grade-level outcome, quasi-experimental, underpowered null | Kelly, D. P., & Rutherford, T. (2017). "Khan Academy as Supplemental Instruction: A Controlled Study of a Computer-Based Mathematics Intervention." *IRRODL* 18(4), 70–77. DOI 10.19173/irrodl.v18i4.2984. ERIC EJ1146230, `https://files.eric.ed.gov/fulltext/EJ1146230.pdf` | **Yes** — PDF downloaded with `curl`, extracted twice with `pdftotext`, read in full and grepped; all p-values recomputed independently | ✓ | ✓ | ✓ | **VERIFIED** | See the itemised verbatim table below — all five dispatch-named quotes, all seven statistics, the design, the comparator ns, the instrument, and the funding check, each confirmed at the page the dossier names | **Q3 — confirmed correct** | No downgrade. Five accuracy defects recorded below, all in supporting detail rather than in the finding; one correction runs in the dossier's favour. |

### Quote verification — all five dispatch-named strings are verbatim

Checked character-by-character against the local extraction. **All five pass.**

| Dossier string | Source text | Page | Verdict |
|---|---|---|---|
| "In both cases, we found no statistically significant differences in student test scores" | "In both cases, we found no statistically significant differences in student test scores." | 70 (Abstract) | **Verbatim** |
| "based on whether the classes were taught by the lead author" | "…were selected for control (n=75, both math and ELA enrichment courses) and treatment (n=39) groups based on whether the classes were taught by the lead author." | 73 (Design) | **Verbatim** |
| "a general lack of structure in enrichment classes" | "These results may be due to a general lack of structure in enrichment classes." | 75 (Discussion) | **Verbatim** |
| "does not present generalizable data and is limited in scope" | "This study does not present generalizable data and is limited in scope." | 76 (Discussion) | **Verbatim** |
| "to justify continued use" | "In order to determine the efficacy of his decision to use Khan Academy and justify continued use, he compared his students' math class grades to those in other enrichment classes…" | 72 (Context) | **Verbatim** as a mid-sentence fragment; the dossier renders it as "to determine the efficacy of his decision to use Khan Academy and justify continued use", which drops only the leading "In order". No meaning change. |

Additional quotes I spot-checked beyond the five named, all **verbatim**: "A post-test only
control-group quasi-experimental design was chosen for this study" (p.73); "although the distribution
of students across treatment and control groups is far from random, there is little reason to believe
it is related to student achievement" (p.73); "Math enrichment classes were for general supplemental
math instruction and not planned in collaboration with the math teacher" (p.73); "Control group
students attended their math or ELA enrichment class with instruction given at the teacher's
discretion" (p.73); "Teachers of control group classes were asked not to expose their students to Khan
Academy or any other computer-based interventions" (p.73); "worked with Khan Academy for a minimum of
30 minutes per class over a four-week period" and the self-directed-simulation sentence (p.73); "our
failure to find an association between Khan Academy and math test scores is of note" (p.75); "the use
of Khan Academy was found to be no worse than more traditional forms of supplemental instruction"
(p.76); "This study did not find associations between use of Khan Academy as supplemental instruction
and higher math test scores; however, only one parameter of student success was measured" (p.76);
"merely exploratory" (p.75); "Further study including relevant covariates or introducing random
variation in Khan Academy use" (p.75); the full lead-author Context passage and the retroactive-IRB
passage (p.72). **No paraphrase was found presented as a quotation** — which is the specific defect
this program has repeatedly caught, including at F11 in this same dossier.

**Ellipsis check (the program caught an inherited ellipsis reversing an author's meaning in Phase 1).**
The dossier's instrument quote — "21 multiple-choice questions… derived from a quasi-random stratified
selection…" — bridges a sentence boundary; the source reads "The assessment contained 21
multiple-choice questions. The assessment items were derived from a quasi-random stratified selection…".
The elision drops only "The assessment items were" and **does not alter meaning**. Recorded as checked
and clean, not as a defect.

### Statistics — every figure exact, and from the model claimed

| Dossier figure | Source | Page | Verdict |
|---|---|---|---|
| Control M = 72.22, SD = 14.750; treatment M = 73.75, SD = 14.280; MD = 1.53; p = .596 | Identical, all five values | 74 | **Exact** |
| t(60) = -1.009, p = .842 (KA vs traditional supplemental math) | Identical | 74 | **Exact** |
| t(112) = .649, p = .259 (any math supplement vs ELA) | Identical | 74 | **Exact** |
| r(37) = .51, p = .001 (topics mastered) | Identical | 75 | **Exact** |
| r(37) = .41, p = .009 (points attained) | Identical | 75 | **Exact** |
| r(37) = .132, p = .422 (minutes spent) | Identical | 75 | **Exact** |
| r(37) = .76, p = < .001 (minutes↔topics) | Identical | 75 | **Exact** |

The dossier attributes the correlations to **Table 2, N = 39**, and that is where they are. The
"Minutes Spent was the metric arguably most unrelated to prior student ability and therefore the least
biased test of the potential impact of Khan Academy use" passage is **verbatim** at p.75, and the
collector's use of it — singling out the dose measure as the decisive one — is the authors' own
emphasis, not an imported one. Confirmed.

### Design description — accurate in every particular tested

| Dossier claim | Source | Verdict |
|---|---|---|
| Post-test-only, control-group, quasi-experimental | "A post-test only control-group quasi-experimental design was chosen for this study due to factors related to convenience and accessibility." (p.73) | ✓ |
| Class-level assignment, rule = taught by lead author | p.73, verbatim above | ✓ |
| No pre-test | Grepped all 8 pages for `pre-?test / pretest / baseline`: **zero hits**. The Measures section (p.73) describes only the end-of-period assessment. | ✓ |
| No covariates | No ANCOVA, no covariate-adjusted model anywhere; analyses are independent-samples t-tests and Pearson correlations only. The sole hit for "covariat" is the authors *calling for* them in future work (p.75). | ✓ |
| 4 weeks | "over a four-week period" (p.73) | ✓ |
| N = 114 | "consisted of 114 total participants in three groups" (p.72); Table 1 Total N = 114 | ✓ |
| Grade 7 | "All of the school's seventh-grade students in general mathematics classes participated" (p.72) | ✓ |
| One school | "a large suburban charter school in North Carolina" (p.72) | ✓ |
| One teacher | "All of these students received mathematics instruction from the same teacher." (p.73) | ✓ |
| No power analysis | Grepped: **zero hits**. Confirmed absent. | ✓ |
| No attrition reported | Grepped: **zero hits**. Consistent with a single-post-test design. | ✓ |

### Active-control descriptions — accurate

Math enrichment **n = 23**, ELA enrichment **n = 52**, treatment **n = 39** — all three confirmed
against **Table 1, p.74** (ELA 52 / 46%; Math 23 / 20%; Treatment 39 / 34%; Total 114). The stated
control n = 75 reconciles (52 + 23 = 75), and the degrees of freedom corroborate the cell sizes
independently: the KA-vs-math-enrichment contrast is reported at **t(60)**, consistent with 39 + 23 − 2
= 60, and the whole-sample contrast at **t(112)**, consistent with 114 − 2 = 112. The collector's
characterisation of the comparator as genuinely **equal-time** is sound: all three groups sat an
enrichment period; only the content differed. Its stated limit on the word "active" — that the math
control was unstructured, "with instruction given at the teacher's discretion" (p.73), with the
authors themselves attributing the flat result partly to "a general lack of structure in enrichment
classes" (p.75) — is accurate and is the right qualification to attach.

### Q3 — warranted

**Confirmed, and the collector's reasoning is exactly right.** "Controlled" in the title is not
randomisation, and the paper says so in its own voice three separate ways: the design is named
"**quasi**-experimental" (p.73); assignment is conceded "far from random" (p.73); and the authors call
the study "merely exploratory" (p.75) and call for "introducing random variation in Khan Academy use"
as future work (p.75). Q3 (observational/quasi-experimental primary study) is the correct tier. **A Q2
grade would have been wrong** and the collector did not take it, despite Q2 being the more flattering
number for a citation the pass was dispatched to obtain. Recorded as a positive.

### Funding / independence — **the distinction holds**

This is the check the dispatch singled out, because a prior C4 source (F11) had a Gates→Khan funder
relationship sitting undisclosed-by-the-dossier on p.iii of a PDF the pass already had open. So I did
not spot-check it — I swept all eight pages.

I grepped the full extraction, case-insensitively, for: `fund | acknowledg | conflict | competing |
interest | grant | support(ed) by | sponsor | disclos | SSHRC | Athabasca | creative commons | CC BY |
licen`. **Total substantive hits: zero.** The only matches are inside reference-list entries and body
prose — "Grant, S." as a cited author surname (Gibson et al., 2015), "math interest" in the Discussion,
and "Intel funded pilot program in Chile" inside the Light & Pierson reference title. There is **no
funding statement, no acknowledgements section, no competing-interests declaration and no
conflict-of-interest statement anywhere in the article.**

The article's structure is Abstract → Introduction → Purpose → Method → Comparison of Groups →
Associations → Discussion → Conclusion → References, with nothing between Conclusion and References
and nothing after the References.

**The collector's distinction is therefore correct and it matters.** The accurate statement is
*independent by authorship and institution (Daniel P. Kelly and Teomara Rutherford, NC State
University, title page p.70 — no Khan Academy affiliation, no KA staff involvement stated anywhere),
with funding and COI **undisclosed** rather than disclosed-and-clean.* That is genuinely weaker than
F12, which affirmatively declares no organisational support and no financial interests, and it is
categorically different from F11, which affirmatively discloses the Gates→Khan relationship. **The
collector recorded it at the weaker, correct strength and explicitly warned it must not be upgraded to
"confirmed clean."** That is the right call and I endorse it without qualification. Recording an
absence of disclosure as an absence — rather than converting silence into a clean bill — is precisely
the discipline that failed at F11, and it did not fail here.

**Relationship to Khan Academy: none disclosed and none found.** I searched for any commissioning
relationship, data-sharing arrangement, site co-selection or acknowledgement of KA staff. There is
none. Khan Academy appears only as the studied object and as a 2015 website citation.

---

### Defects found (five). None is a kill.

**D1 — "The back page (p.77) carries only the Athabasca University logo and the CC BY licence mark" is
false.** *(Dossier, Funding-and-independence bullet 2; repeated in the collection report.)* I extracted
page 8 in isolation (`pdftotext -f 8 -l 8`). **Page 77 carries the tail of the reference list** —
Coletti et al. (2014), Gibson et al. (2015), Hinkle et al. (2003), Khan Academy (2015), Light & Pierson
(2014), Murphy et al. (2014), Noer (2012), Thompson (2011), Weiland (2015) — under the running head, with
the folio 77 at the foot. A publisher logo may sit below the text as an image (which `pdftotext` would
not surface), but "carries **only** the logo and the CC BY mark" is a misdescription of the page's
contents. **Severity: minor, and it does not touch the conclusion** — the load-bearing claim (no
funding/COI text anywhere in the article) is independently confirmed by my own eight-page sweep. But it
is a factual error inside the specific evidence offered for the specific check the dispatch flagged as
highest-risk, so it is recorded rather than waved through.

**D2 — "the paper never states its tail convention" is inaccurate.** *(Dossier, internal-inconsistency
item (ii).)* **Table 2's own note states it:** "Note. Bolded correlation coefficients are significant at
the 0.05 level (**2-tailed**)." (p.75). The paper does not state a convention for its *t-tests*, which
is the true and defensible version of the claim. **Severity: minor.**

**D3 — "the reported p-values are not conventional two-tailed values for the stated t and df"
over-generalises.** *(Same item.)* I recomputed every reported p-value. The picture is more specific,
and more interesting, than the dossier states:

| Test | Reported p | Two-tailed | Lower-tail | Upper-tail | Reading |
|---|---|---|---|---|---|
| t(60) = −1.009 | **.842** | .3170 | .1585 | **.8415** | Reported p is the **upper-tail** p — i.e. one-tailed *in the direction opposite to the observed effect* |
| t(112) = .649 | **.259** | .5177 | .7412 | **.2588** | Reported p is the **upper-tail** p — one-tailed |
| Comparison 1 (MD = 1.53) | **.596** | **.5964** | — | — | **Is a conventional two-tailed p.** Reconstructed from the paper's own Ms, SDs and Ns: pooled SD 14.59, SE 2.880, t = 0.531, df = 112 → two-tailed p = .5964 |
| r(37) = .51 / .41 / .132 / .76 | .001 / .009 / .422 / <.001 | .0009 / .0095 / **.4231** / <.0001 | — | — | **All four are conventional two-tailed values**, matching Table 2's stated convention |

So the accurate statement is: **the paper mixes conventions** — comparison 1 and all four correlations
are conventional two-tailed values; the two t-tests at pp.74 report upper-tail one-tailed values, one of
them in the direction opposite to its own effect. That is a *sharper* and more damning observation than
the collector's blanket one, but the collector's blanket phrasing is, as written, wrong about `.596`
and about the correlations. **Severity: minor — the collector's specific claim about t(60) = −1.009 is
exactly right, its conclusion is right, and its own confidence flag correctly labelled this inference as
"arithmetic reasoning about values the paper reports, not a statement the paper makes."** The
under-claiming was appropriate; the generalisation was one step too wide. **The collector's bottom line
— "every comparison is null on any tail convention" — is confirmed: the two-tailed values are .3170,
.5177 and .5964, all comfortably null.**

**D4 — "low-ceiling" overstates the instrument criticism, and "the paper does not discuss it"
understates the paper. This defect runs pessimistic.** *(Dossier, "Outcome measure sensitivity" bullet.)*
The factual core is correct and confirmed: the post-test was 21 multiple-choice items "derived from a
quasi-random stratified selection of questions from a previously administered, released copy of a North
Carolina End-of-Grade mathematics assessment (**grade six**)" (p.73), given to **seventh** graders
(p.72) at a school whose students "had above average scores… when compared to both the state and the
county" (p.72). Below-grade-level content for an above-average sample is a fair observation, and 21
items is genuinely coarse (one item ≈ 4.8 percentage points). But two things the dossier asserts are
not supported by the source:

1. **"Low-ceiling" is contradicted by the paper's own reported data.** Group means are 70.08–73.78%
   with SDs of 10.60–17.66, and the paper reports that "Assessment scores for both groups were normally
   distributed (assessed by Shapiro-Wilk's test), and there was homogeneity of variances (assessed by
   Levene's test…, p = .949)" (p.74). A genuine ceiling produces pileup near the maximum and negative
   skew; a mean of ~72% with confirmed normality is the opposite of that. *Low sensitivity* (coarse,
   21 items, off-target difficulty) is warranted; *low ceiling* is not.
2. **"the paper does not discuss it" is not accurate as phrased.** Ceiling effects are the paper's
   entire stated design rationale: the lead author's *prior* comparison used math class grades, which
   he "discovered… were heavily skewed with a high number of students with course grades at or above
   100%", and so "**Due to the potential ceiling effects of the previously-used measure**, the lead
   author designed a study with the explicit intent of investigating the association between Khan
   Academy use and an assessment that would result in more normally distributed scores suitable for
   statistical analysis" (p.72). The paper does not discuss the sensitivity of the *replacement*
   instrument — which is the true and defensible version of the criticism — but it engaged the ceiling
   question directly and, on its own reported diagnostics, solved it.

**Severity: minor, but it is the one defect that runs in the pessimistic direction**, and the
calibration warning in my brief makes that worth naming precisely rather than folding into a general
"handled well." The bullet should read: *a 21-item instrument built from below-grade-level content and
given to an above-average sample is coarse and off-target in difficulty, which limits sensitivity to
small differences; the paper selected it specifically to escape a ceiling effect in its prior measure
and reports that it produced normally distributed scores, but never examines the replacement
instrument's own sensitivity.*

**D5 — the corrected source count is itself wrong, and self-contradictory. See PART 2, divergence 2.**

### Correction running in the dossier's FAVOUR (under-claimed)

**The collector's bias-direction argument has stronger support in the source than it used.** The
dossier and report both rest the argument on the lead author being a KA advocate who set out "to
determine the efficacy of his decision to use Khan Academy and justify continued use" (p.72). Neither
surfaces the sentence immediately following, which is better evidence for the same point: the lead
author had **already run an earlier comparison in the same setting and it also returned a null** — "The
results of that comparison showed no statistically significant differences between students using Khan
Academy, students in other math enrichment classes, and those in English language arts (ELA) enrichment
classes." (p.72). An advocate who found a null on one measure, then built a better-powered instrument
specifically to test the question again, and reported a null a second time, is a materially harder
pattern to explain as motivated reasoning toward a positive than advocacy alone. This **strengthens**
the collector's judgement; it is recorded as a miss in the dossier's favour, not as a defect.

### Adjudication of the two claims the dispatch named

**Claim 1 — two internal inconsistencies in the paper. CONFIRMED, both. One is stronger than claimed.**

*(i) Narrative vs table means — CONFIRMED, and I can localise the error, which the collector did not.*
The narrative reports treatment "M = 73.75, SD = 14.280" (p.74) while **Table 1 on the same page**
reports Treatment M = 73.18, SD = 14.32, and **Table 2** (p.75, N = 39) likewise gives assessment-score
M = 73.18, SD = 14.32. Confirmed. The collector further notes Table 1's group means do not reconcile
with a combined-control mean of 72.22 — **also confirmed by computation: the enrolment-weighted
combined control from Table 1 is (52 × 70.08 + 23 × 73.78) / 75 = 71.21, not 72.22.** What the collector
did not establish, and what I did: **Table 1 reconciles exactly with itself.** Its weighted total,
(52 × 70.08 + 23 × 73.78 + 39 × 73.18) / 114 = **71.89**, matches Table 1's own printed Total of 71.89 to
the decimal. The tables are internally coherent; **the narrative figures are the outliers.** That
localises the error and makes the observation firmer than the dossier states it. It also means the
table-derived mean difference would be 73.18 − 71.21 = 1.97 rather than the reported MD = 1.53 —
still null, still small, and still in the treatment's favour.

*(ii) p-values not conventional two-tailed values — CONFIRMED for both t-tests, with the precision
correction at D3 above.* t(60) = −1.009 with p = .842 is the upper-tail p (.8415) for a *negative* t;
t(112) = .649 with p = .259 is the upper-tail p (.2588). Neither is two-tailed. The collector's central
claim is right and its own confidence flag correctly marked this as its inference rather than the
paper's statement.

**Both inconsistencies are real, both were correctly identified as not changing the verdict, and both
were correctly reported anyway.** Reporting a defect that does not help your case is the behaviour this
program is trying to produce, and it happened here unprompted.

**Claim 2 — the lead-author bias-direction reasoning. SOUND.**

The factual predicate is verbatim-confirmed: the lead author was hired as the school's technology
education teacher, taught the math enrichment classes, "included the regular use of Khan Academy and
received positive feedback from the students, administration, and parents", and undertook the
comparison "In order to determine the efficacy of his decision to use Khan Academy and justify
continued use" (p.72); assignment to treatment was literally "based on whether the classes were taught
by the lead author" (p.73). **Teacher and condition are fully confounded** — the dossier's phrasing is
exact, not an overstatement. The retroactive-exempt IRB passage is also verbatim (p.72).

The reasoning is sound. Where an experimenter has a declared stake in a positive result *and*
personally delivers the intervention, the confound's expected direction — through expectancy,
enthusiasm, implementation fidelity and investment — runs **toward** the treatment. A null obtained
under pro-treatment pressure is harder to attribute to investigator hostility or indifferent delivery
than a null from a disinterested team. The collector draws exactly the right two boundaries around
this: it "does not repair the design", and it "does not make the null stronger than its power allows."
Both caveats are necessary and both are present.

**One qualification, which does not overturn it.** The argument is probabilistic, not airtight. The
confound is *teacher identity*, and the lead author was a technology-education teacher delivering
enrichment, not the students' math teacher — so a residual scenario exists in which he was simply a
less effective math instructor than the comparison enrichment teachers, which would bias *against*
treatment and would partly manufacture the null. The paper cannot rule this out; it reports no measure
of instructor quality. The collector's framing survives because the paper's own evidence about the
author's motivation is direct and documentary while the counter-scenario is unevidenced speculation,
and because the Context passage I surfaced above (a *prior* null by the same advocate) cuts further in
the collector's direction. **Verdict: the reasoning is sound and correctly hedged; I would add the
instructor-quality residual as a one-line caveat, not as a correction.**

---

## Resolution log (every citation that was UNVERIFIED at any point)

| # | Which point failed (exists / supports / strength) | Move taken (re-check · downgrade · drop) | Terminal state | Note |
|---|---|---|---|---|
| F13 | **None terminally.** Five supporting-detail defects (D1 back-page description; D2 tail-convention claim; D3 p-value over-generalisation; D4 "low-ceiling" overstatement + "paper does not discuss it"; D5 source count) | **(a) re-check** — all five are editorial corrections to supporting narrative, not to the finding, its tier, its quotes or its statistics. No downgrade required. | **VERIFIED** | The finding as stated — an independent, active-control, quasi-experimental null, underpowered, Q3, funding/COI undisclosed — is fully supported by the source. D4 is the only defect running pessimistic and should be corrected in the dossier's favour. |

## Kills (citations dropped — the claim lost this support)
- **None.** F13 is real, open-access, reachable by two independent routes, and every quotation,
  statistic, page attribution, sample count and design particular I tested traced to genuine text. Said
  plainly rather than as a clean sweep: I recomputed seven p-values, two weighted means and a pooled-SD
  t-statistic specifically hunting for a number that would not reconcile, and **the only figures that
  failed to reconcile are the paper's own, not the dossier's.**

## Quarantine (UNVERIFIABLE — could not be reached at all)
- **None.** Recorded for future passes: the ERIC route (`files.eric.ed.gov/fulltext/EJ1146230.pdf`)
  extracts cleanly with `pdftotext` — 8 pages, 3,402 words. The collector's report that the IRRODL
  galley (`/article/view/2984/4199`) fails to extract is consistent with this program's known
  PDF-extraction hazard; **the ERIC mirror is the route that works and should be used first.**

## Conflicts surfaced during verification
- **None rising to the conflict register.** I concur with the collector, and with V4b before it, that
  F13's null is **not** in genuine evidential tension with F10–F12: different population (US grade 7 vs
  community-college adults vs grades 5–8 vs n = 3 elementary), different dose (4 weeks vs a semester vs
  two years), and — decisively — a different *comparison* (equal-time active control vs
  more-usage-versus-less). It is an **opposing position for sufficiency purposes**, which is a
  different thing from an evidence conflict. This is the same reasoning the dossier correctly applied
  to F7 vs F8 and that V4b applied to this source. No row for the conflict register.

---

## PART 2 — Dossier sufficiency (SECOND AXIS — judged independently of citation states)

> A dossier is sufficiently researched only when additional searching is unlikely to materially
> change its conclusions. An all-VERIFIED dossier can still be INSUFFICIENT. A COVERAGE GAP the
> collector found and named is thoroughness, not insufficiency.

**Verdict: SUFFICIENT** — with one editorial debt named below that is *not* a research gap and must not
be treated as one.

C4's prior INSUFFICIENT verdict (V4b) rested on **exactly one** named omission: Kelly & Rutherford
(2017). V4b specified it to the DOI, scoped the remedy to "one citation, roughly half a page", and named
the three things the collection had to record — Q3-not-Q2, the three null comparisons with exact
p-values, and the lead-author-as-teacher caveat. **All three were delivered, and delivered accurately.**
The gap that produced the INSUFFICIENT verdict is closed.

- **Traditions/landmarks/positions now present:** everything V4 and V4b credited (Chess.com's dual
  rating pathways F1–F3; Khan Academy's public mastery mechanics F4–F6; the KA-affiliated efficacy
  literature F7–F8 with relationships disclosed; the chess-transfer null F9, honestly out-of-scope; the
  independent federally funded cluster-RCT F10; the landmark SRI implementation study F11; the
  single-case behaviour-analysis tradition F12), **plus** the one class V4b named as missing: an
  independent controlled comparison against **active** controls, and one returning a **null** (F13). The
  dossier's independent evidence base is now directionally mixed rather than uniformly positive, which
  was the precise defect V4b identified.
- **Required sub-questions answered:** Q1, Q2, Q4 unchanged. **Q3 moves from "answered on one side of
  the ledger only" to "answered on both sides"** — this is the change that earns the verdict. Q5 is
  unaffected and its PARTIAL / does-not-move-the-needle statement still holds; I checked, and F13 bears
  on it no more than F10–F12 do. It is an outcome study, not a measurement-model study, and the
  collector says so itself.
- **Searches run to test for what is NOT there** (I cannot judge an omission from inside the dossier):
  1. **Reference-list mining of F13's own reference list** (p.76–77), read in full from my own
     extraction — the highest-yield probe available, since this is the program's dominant historical
     failure mode ("material inside sources the dossier already cites that it failed to read"). It
     contains **13 entries**. Only three are Khan Academy efficacy sources: Murphy et al. (2014) —
     **already in the dossier as F11**; Light & Pierson (2014) — Chilean qualitative study which F13's
     own text states "did not address student achievement" (p.72), therefore correctly not carried as
     efficacy evidence; and Böhmer, Burns & Crowley (2014) — **correctly identified by the collector as
     a lead and correctly not asserted.** The remainder are OER-landscape, statistics-methods, or
     journalistic citations (Atkins, Cheung & Slavin, Coletti, Gibson, Hinkle, Khan Academy website,
     Noer, Thompson, Weiland). **No unread efficacy source is hiding in F13's reference list.** This is
     the check that failed at F11 in this same dossier; it passes here.
  2. **Full-text disclosure sweep of F13** for funding/COI/acknowledgements — the direct analogue of the
     probe that produced V4b's F11 downgrade. Result: genuine absence, correctly recorded as absence
     (see Part 1).
  3. **Verified the collector's declared scope discipline** — I confirmed Böhmer et al. (2014) exists in
     F13's reference list as described ("Testing numeric: Evidence from a randomized controlled trial of
     a computer based mathematics intervention in Cape Town high schools", African Education Conference,
     Addis Ababa) and that F13's characterisation of it is verbatim-supported at p.72: "One study in
     South Africa reported an increase in student learning when Khan Academy and other computer assisted
     learning was included in instruction; however, Khan Academy was used as part of an after-school
     supplemental mathematics program… It is unclear from this study whether it was Khan Academy or the
     additional instructional resources and time that accounted for the increase in student outcomes."
     **The collector's decision to carry this as an unretrieved lead rather than assert it is correct**,
     and the confound it names is real and is stated by F13's own authors.

**On the collector's aggregate claim** — *"every positive independent finding in this dossier compares
Khan usage against less of it or none of it; the only equal-time active-control comparison found no
difference."*

**Substantially accurate, with one qualifier the dossier should attach.** Tested finding by finding:

| Finding | Independent? | Comparison type | Supports the claim? |
|---|---|---|---|
| F7 (NBER RCT) | **No** — run "in partnership with" KA | KA classrooms vs control classrooms | N/A — not an *independent* finding, so outside the claim's scope either way |
| F8 (PNAS) | **No** — 2 of 5 authors KA staff | usage dose-gradient: more use vs less use | N/A, same reason |
| F10 (WestEd/IES) | Yes | WATS platform vs comparison sections | **Asserted, not established.** The dossier nowhere characterises what F10's control condition actually did. A cluster-RCT adding a platform is normally against business-as-usual, so the claim is very likely right — but it rests on inference, not on a recorded fact. |
| F11 (SRI) | Author-only (per V4b) | within-treated split by *amount* of KA use | **Yes** — explicitly more-vs-less |
| F12 (Patil & Juanico) | Yes | baseline vs KA exposure (n = 3) | **Yes** — explicitly none-vs-some |
| F13 (Kelly & Rutherford) | Yes | KA vs equal-time active alternatives | **Yes** — and null |

So: the claim holds for F11 and F12 outright, is irrelevant to F7/F8 (which are not independent), and is
**probable but unverified for F10**. The honest restatement is: *of the independent findings whose
comparison condition is documented, every positive one compares Khan Academy usage against less of it
or none of it; F10's comparison condition is not characterised in this dossier and should be checked
before the claim is relied on categorically.* That is a one-line qualifier, not a defect that overturns
the aggregate observation. **The asymmetry the collector identifies is real.**

**Is it the right weight to place on one underpowered 4-week quasi-experiment? Yes — and notably, the
collector does not over-weight it.** The dossier states the movement as: confidence "moves **down**…
Not to zero, and not to 'refuted' — F13 is one underpowered short study and cannot carry that weight",
and the finding's own headline says it "establishes 'no detected benefit here,' not 'no benefit'". The
power caveat is stated at full strength (n = 23 active-control cell; key contrast at t(60); no power
analysis), and the dose-realism bullet actively explains how F13's null and F10's positive can coexist
without contradiction. **This is well-calibrated, and it is calibrated in the direction that costs the
collector its own headline** — a pass dispatched to find a null had every incentive to state it harder
than the evidence allows, and did not. Recorded as a positive.

**One residual imbalance, minor and running pessimistic.** F13's Discussion contains a sentence the
dossier quotes but does not weight: "the use of Khan Academy was found to be **no worse** than more
traditional forms of supplemental instruction" (p.76). Read against the collector's own dose-realism
point, the equal-time null carries a modest efficiency reading — equivalent outcomes from a
self-directed, zero-teacher-planning supplement versus teacher-delivered enrichment — which is a
different and more product-relevant framing than "no advantage detected", and the paper raises it
explicitly ("Khan Academy may be thought of as an alternative to traditional supplemental mathematics
instruction that may benefit… schools by increasing efficiency in the use of instructional resources",
p.74). The dossier prints the quote but frames the finding exclusively as an absence. Worth one line;
it does not change the verdict, and the underpowering caveat applies to the efficiency reading just as
much.

### Ruling on divergence 1 — append-only vs V4b's "re-state in place"

**Acceptable.** Three reasons, and one named consequence.

1. **The substantive requirement was met.** V4b item 3 asked that the coverage-gap bullet be re-stated
   so downstream synthesis reads the independent evidence as *mixed* rather than merely *existent*. The
   appended section "What this citation changes in the dossier's conclusions" does exactly that, in
   terms at least as strong as V4b asked for, and explicitly declares that it "supersedes" the bullet
   for downstream synthesis. The *instruction's purpose* is satisfied; only its *mechanism* differs.
2. **The append-only rule was the later and more specific instruction**, issued by this pass's own brief
   and binding on this pass. A collector cannot obey both; preferring the instruction that governs its
   own pass is the correct resolution.
3. **The divergence was declared, not hidden** — in the dossier's own header note, in a dedicated
   "Append-only compliance" section of the collection report, and flagged explicitly for the verifier.
   That is the behaviour the protocol wants when two instructions conflict. Silently splitting the
   difference would have been the failure.

**Named consequence, which is a real cost and should not be waved off:** the dossier now contains a
stale claim (the `[corrected by C4-FP]` bullet, which reports independent evidence as existent without
direction) and its correction 160-odd lines apart, with the correction downstream of the claim. A
reader who reads the Coverage-gaps section and stops gets the incomplete picture. The append-only rule
has now, across two passes, accumulated **three** such debts in this one dossier:

- the `[corrected by C4-FP]` bullet, superseded but not restated;
- **V4b's F11 downgrade** (author-independent only; Gates→KA funder relationship and KA site
  co-selection as established fact) — carried in the C4-RT appended narrative but **not applied to F11
  itself**, so the F11 finding text still reads at the strength V4b struck;
- **V4b's F12 tier-warrant strike** (the history/maturation confound-control rationale, contradicted by
  the authors' own nonconcurrent-design limitation) — likewise carried but **not applied to F12
  itself**.

**This is an editorial debt, not a research gap, and the distinction is load-bearing for the verdict.**
Every one of these corrections is *recorded inside the dossier* and is retrievable by a reader who
reads the document through. Nothing needs collecting. Sufficiency asks whether the evidence has been
engaged; it has. But the debt should be discharged by a bounded **editorial** pass — no collection, no
new sources, no re-verification — that applies the three corrections in place and removes the
append-only constraint for that pass. Until then, downstream consumers must be told to read the
appended sections before relying on F11, F12, or the coverage-gap bullet.

### Ruling on divergence 2 — the stale header count. **The collector is right that it is stale, and wrong about the replacement number.**

The collector correctly declined to edit the header under append-only, and correctly flagged it. But it
also stated a "true count", twice, and **the two statements contradict each other and both are wrong.**

- Dossier header (ll.6–7), unedited: "Citations collected: 9 / budget 6–12 (hard cap 15) — **+3 via
  focused pass C4-FP**, total 12/15." — stale, as declared.
- Dossier l.233 (C4-RT header note): "the true count after this pass is **13 findings / 5 distinct
  sources added since the original 9**" — implies **14** total sources.
- Dossier l.370 and the collection report: "Running total: **13 findings / 9 distinct sources** across
  all three passes." — implies **9** total sources.

I enumerated the distinct sources directly from the dossier:

| Pass | Findings | Distinct sources newly cited |
|---|---|---|
| Original (F1–F9) | 9 | **9** — chess.com puzzle-ratings help; chess.com news; chess.com ratings help; KA mastery-levels help; KA course/unit-mastery help; KA mastery-challenges help; NBER w32388; PNAS (+ its correction, counted as one); Sala et al. |
| C4-FP (F10–F12) | 3 | **5** — IES award record; ED583985; ED583986 (F10 cites three); SRI 2014 report; Patil & Juanico |
| C4-RT (F13) | 1 | **1** — Kelly & Rutherford |
| **Total** | **13** | **15** |

**The correct counts are 13 findings / 15 distinct sources.** The "9" at l.370 is the original F1–F9
source count carried forward as if it were the running total. The "5 added since the original 9" at
l.233 is arithmetically right about C4-FP but omits F13's own source from its own tally.

I also found a **pre-existing arithmetic error in C4-FP that both later statements inherit from**:
dossier l.216 reads "3 findings (F10–F12), drawing on **4** distinct sources (F10 cites 3: the IES award
record plus two conference-proceedings papers; F11 and F12 each cite 1)" — its own enumeration sums to
**5**, not 4. That error predates this pass and was not introduced by it.

**Under the header's own findings-based convention** — where "total 12/15" meant 12 citations against a
hard cap of 15 — the header should read **13/15**. Worth flagging for the orchestrator: **on a
distinct-source count the dossier now sits at exactly 15, i.e. at the stated hard cap.** Whichever
convention the program intends, no further collection on C4 is available without raising the cap — which
is consistent with, and reinforces, the SUFFICIENT verdict.

### Why SUFFICIENT rather than INSUFFICIENT

The one named gap is closed with an accurately handled citation. The reference-list probe — this
program's dominant failure mode, four of four Phase 1 sufficiency failures — was run against the new
source and found nothing unread. The remaining coverage gaps the collector names are genuine absences
in the literature, correctly identified as such rather than as search failures: **no adequately powered
independent equal-time active-control comparison of Khan Academy exists in anything located by this
program**, and that is a real state of the field, not a hole in this dossier. The Chess.com-side gaps
V4 and V4b both found honest remain honest and I do not re-penalise them. F13's own reference list
offers exactly one unretrieved candidate (Böhmer et al. 2014), correctly carried as an unasserted lead,
and it is a conference paper in which Khan Academy was confounded inside an after-school package by
F13's authors' own account — it would not materially change the dossier's conclusions.

**Additional searching is now unlikely to materially change this dossier's conclusions.** That is the
test, and it is met.

---

## Verifier summary
- VERIFIED: **1**  |  UNVERIFIABLE: **0**  |  DROPPED: **0**
- **UNVERIFIED remaining: 0**
- **F13 terminal citation state: VERIFIED**
- **Dossier sufficiency: SUFFICIENT**
- **Claims the collector overstated (strength downgraded): none rising to a downgrade.** Five
  supporting-detail corrections (D1–D5), none touching the finding, its Q3 tier, its quotes or its
  statistics: (D1) p.77 does not carry "only" a logo and CC BY mark — it carries the tail of the
  reference list; (D2) the paper *does* state a tail convention, in Table 2's note ("2-tailed"), just
  not for its t-tests; (D3) `.596` and all four correlation p-values *are* conventional two-tailed
  values — the defect is confined to the two t-tests, which report upper-tail one-tailed p's; (D4)
  "low-ceiling" is contradicted by the paper's own Shapiro-Wilk normality and ~72% means, and "the paper
  does not discuss it" understates a paper whose stated design rationale was escaping a ceiling effect;
  (D5) the corrected source count is wrong — see below.
- **Claims the collector *under*-stated (corrections in the dossier's favour):**
  - **The bias-direction argument is better supported than the dossier uses.** p.72 records that the
    lead author had *already* run an earlier comparison in the same setting that "showed no
    statistically significant differences" — a prior null by the same advocate, which is stronger
    evidence against motivated reasoning than advocacy alone. Not surfaced.
  - **Internal inconsistency (i) is firmer than claimed.** Table 1 reconciles *exactly* with itself
    (weighted total 71.89 = printed Total 71.89), which localises the discrepancy to the narrative
    rather than leaving it ambiguous between narrative and table.
  - **The equal-time null carries a modest efficiency reading** the dossier quotes but does not weight
    ("no worse than more traditional forms of supplemental instruction", p.76), which the paper raises
    explicitly as a resource-efficiency question (p.74).
- **Count correction (dispatch asked me to rule): the correct counts are 13 findings / 15 distinct
  sources.** The dossier's stated "9 distinct sources" (l.370) is wrong; its "5 distinct sources added
  since the original 9" (l.233) implies 14 and is also wrong; the two contradict each other. A
  pre-existing C4-FP error is inherited — l.216 says "4 distinct sources" while enumerating 5. Under the
  header's findings-based convention the header should read **13/15**; on a distinct-source count the
  dossier now sits **at the hard cap of 15**.
- **Divergence rulings:** (1) append-only substitution for V4b's "re-state in place" — **acceptable**;
  purpose met, later and more specific instruction preferred, divergence declared not hidden. (2) stale
  header — **collector correct to flag and not edit; replacement figure wrong**, corrected above.
- **Editorial debt carried forward (not a research gap, needs no collection):** three corrections are
  recorded in the dossier but not applied in place — the `[corrected by C4-FP]` coverage-gap bullet
  (superseded by the C4-RT appended section), V4b's F11 independence downgrade, and V4b's F12
  tier-warrant strike. A bounded editorial pass with the append-only constraint lifted should apply all
  three plus D1–D5 and the count. **No new collection is warranted on C4.**
- **Supporting locations differing from the collector's proposal: none.** All eleven page attributions
  in F13 (pp.70, 72, 72–73, 73, 74, 75, 76) were independently checked against folio positions in my own
  extraction and **all are correct** — a standard the earlier passes on this card did not meet.
