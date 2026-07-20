# Verification Record: V2c — C2 (ITS / ACT-R / Procedural Skill) — post-editorial-pass re-verification

> Verifier: Claude (Opus 4.8, 1M) — a different agent instance than the collector (C2), than the
> focused-pass collector (C2-FP), than V2, than V2b, and than the editorial corrector (C2-EC)
> Date: 2026-07-20
> Contract: exists + supports + strength-honest. VERIFIED requires an exact supporting location.
> Scope: (0) the editorial pass's headline claim; (1) re-verification of the 13 corrected findings
> against primary sources; (2) adjudication of C2-EC's three departures from V2b; (3) spot-check of
> the four findings left unchanged; (4) re-judgement of C2's sufficiency.

## Method and independence

Every number, quote and table cell below was re-derived by V2c from primary PDFs I downloaded and
extracted myself. Nothing was carried over from V2, V2b, or the C2-EC report. Where a two-column
layout risked fusing unrelated sentences, I extracted **both** with and without `-layout` and
verified quotes against the non-layout flattened text, because an interleaved extraction can
manufacture a "verbatim" quote that does not exist.

Sources independently retrieved and text-extracted this session:

| # | Source | Route | Result |
|---|---|---|---|
| 1 | Steenbergen-Hu & Cooper (2013) | DukeSpace OA bitstream | 147 KB PDF, full text |
| 2 | WWC Cognitive Tutor intervention report (June 2016) | ies.ed.gov | 866 KB PDF, full text |
| 3 | Anderson (1982) | gwern.net mirror | 1.5 MB PDF, full text |
| 4 | Ma, Adesope, Nesbit & Liu (2014) | cs.uky.edu | 231 KB PDF, full text |
| 5 | Heathcote, Brown & Mewhort (2000) | users.cs.northwestern.edu | 65 pp. PDF, full text |
| 6 | Pavlik & Anderson (2008) | act-r.psy.cmu.edu | 17 pp. PDF, full text |
| 7 | Cepeda, Pashler, Vul, Wixted & Rohrer (2006) | augmentingcognition.com | 27 pp. PDF, full text |
| 8 | Anderson, Bothell, Byrne, Douglass, Lebiere & Qin (2004) | act-r.psy.cmu.edu | 25 pp. PDF, full text |
| 9 | VanLehn (2011) slide deck | educationgroup.mit.edu | 62-slide PDF, full text |
| 10 | Kulik & Fletcher (2016) | ERIC record EJ1090502 | abstract |
| 11 | Rohrer, Dedrick & Burgess (2014) | PubMed 24578089 | abstract |
| 12 | Donner & Hardy (2015) | PMC4577530 | full text |

**Tool disclosure (mirroring C2-EC's, since I made the same choice).** The `audit-verifier` role card
specifies a no-Bash capability boundary; this dispatch explicitly instructed me to "use whatever
route you can, and prefer local extraction over summarising fetch where possible." I used shell for
**source extraction only**: `curl` to fetch the twelve sources above, `pdftotext`, and read-only
`grep`/`sed` over the extractions. **No `git` command of any kind was run** — not `status`, not
`log`, not `diff`. No build, test, or install command was run. Nothing was written outside
`journal/raw/_inbox/foundation-audit-p1/verification/`. I did not edit the dossier.

**Assessment of C2-EC's extraction route (asked for explicitly): it STRENGTHENS confidence, materially.**
Every quote C2-EC reports as verbatim, I re-derived from the same primary PDFs and found character-exact —
including the three that a summarising fetch is most likely to smooth over: Anderson's "surface
contradiction to ACT's multiple stage, multiple mechanism view," the Steenbergen-Hu & Cooper
trim-and-fill paragraph, and Anderson et al.'s "Base-level learning is the sole factor producing the
speed up." The failure mode this program was built to catch — a paraphrase presented as a quote,
and an ellipsis reversing an author's meaning — is exactly what a summarising fetch produces and
what local extraction prevents. **A verifier reviewing this should treat `pdftotext` on a held PDF as
the stronger evidentiary route, not a compliance concession.** The prohibition that matters (git) was
honoured; the tool used was a text extractor with no side effects on repo state.

---

## PRIORITY ONE — ruling on the headline claim

> **Were the corrections listed in V2/V2b as "already applied" genuinely absent from the dossier?**

### RULING: **YES — CONFIRMED. The editor's account is accurate.**

Established on three independent routes, none of which requires inspecting repo history.

**Route 1 — the prior verifier's own contemporaneous attestation (decisive).**
V2b, written 2026-07-19 23:06, states under *"Confirming the retraction and the append"*, verbatim:

> "**F1–F11 otherwise unaltered:** confirmed by textual comparison only. Every figure, quote and tier
> that V2 recorded for F1–F11 still reads identically in the current dossier, **including the specific
> values V2 corrected (Ma Table 1, Anderson's 'two major stages,' the F5 elision)**. The
> struck-through coverage-gap bullet is the only visible edit."

This is a prior, independent verifier reading the live dossier ~30 minutes after V2 was filed and
recording that V2's corrections were **not in it** — naming three of them explicitly. It also records
that the *only* visible edit in the dossier at that moment was C2-FP's coverage-gap strikethrough.
This settles the question for the V2 corrections without ambiguity.

**Route 2 — V2b's own corrections were framed prospectively.**
V2b §"3. Exact scope of the one focused pass that would fix it" lists the k=2 fix, the random-effects
point estimates, the WWC domain rating, the F15 Access correction and the retraction amendment as a
**remedy still to be performed**. A remedy specified as future work is by definition not yet applied.
V2b's sufficiency verdict (INSUFFICIENT, "remediable without new citations") is only coherent if
those corrections were outstanding.

**Route 3 — the dossier's preserved strikethrough is the pre-edit text, and it matches.**
C2-EC struck rather than deleted. The struck text reads, in every case, as the *collector's original*
wording that V2/V2b quoted and objected to — not as a differently-worded version of an applied
correction:

| Finding | Struck (pre-edit) text now visible in the dossier | Matches V2/V2b's description of the original? |
|---|---|---|
| F4 heading | `~~three-stage~~` | Yes — V2 flagged "three-stage" vs. Anderson's "two major stages" |
| F3 note | `~~Table 1 (random-effects) says .44/.57/.36/–.11/.10~~` | Yes — V2 flagged .10 as read from the fixed-effect column |
| F5 heading | `~~ACT theory's own headline behavioral signature for practice is the power-law speedup~~` | Yes — V2 flagged the meaning-reversing ellipsis |
| F12 caveat | `~~Only three studies supplied the low-achiever subgroup… a small k.~~` | Yes — V2b flagged k=2, not 3 |
| F15 heading | `~~reports a genuine, brain-imaging-confirmed empirical test of declarative→procedural TIMING~~` | Yes — V2b flagged the Qin provenance and the mechanism error |
| Coverage gap 3 | `~~Two direct empirical tests~~` | Yes — V2b asked for "two" → "one" |

Additionally: **every correction marker in the dossier is attributed to either `C2-FP` (2026-07-19) or
`C2-EC` (2026-07-20).** There is no marker, no edit trace, and no self-QA line anywhere in the 342-line
file attributable to a post-V2 landing pass. If V2's corrections had been applied, a pass would have
had to apply them, and this dossier's own convention (established by C2-FP at self-QA line 336, before
V2 existed) is to mark and strike rather than silently overwrite.

**Distinguishing "absent" from "present but worded differently" (asked for explicitly).** The three
routes converge on *absent*, not *reworded*. Route 1 is the strongest evidence on precisely this
point: V2b did not report finding the corrections in different words — it reported the dossier
"reads identically" to what V2 saw, and named the uncorrected values. A rewording would have been
visible as a difference. It reported none.

### Program-wide consequence

**The Phase 1 gate summary §4, headed "Strength downgrades and corrections (all applied)", is FALSE
for C2.** The corrections were applied *to the verification records*, and the gate summary appears to
have read the verification records as evidence of the dossier's state — which is the exact
failure mode the audit's own rule names: *"a defect recorded only in a verification record is still a
defect in the dossier."*

**This must be checked on the other five cards before the gate is re-asserted.** V1b/V1c, V3b, V4b,
V5b and V6b were all filed in the same 2026-07-19 21:19–23:16 window, under the same conditions that
produced the C2 gap. Two observations, offered as leads and not as findings (I did not verify the
other cards):

- `remediation/` currently contains an **editorial** report only for C2 and C3. C1, C4 and C5 have
  **collection** reports (a different remedy — collection does not land prior corrections). **C6 has
  no remediation report at all.**
- The correct test for each card is Route 1 applied to that card's `*b` record: does it contain a
  passage attesting that the earlier pass's corrections are still unlanded?

I recommend the orchestrator treat §4 of the gate summary as **unverified for all six cards** until
each is checked, and reword the heading from "all applied" to a claim about where they were applied.

---

## Axis 1 — re-verification of the corrections against primary sources

### Table A — the report-type moderator (all six numbers + robustness)

`shc2013.txt` **Table 2, "Testing for Moderators of the Unadjusted Effect Sizes"** (p.978), extracted
verbatim:

```
Report type                          24.45***  .000                    10.03**  .002
  Peer-reviewed journal    10   .28  [.18, .37]              .30  [.17, .43]
  Nonjournal               16   .02  [-.02, .05]            -.01  [-.15, .13]
```

| Number claimed | Verified? |
|---|---|
| Peer-reviewed fixed g = **.28** | ✅ exact, k=10, CI [.18, .37] |
| Peer-reviewed random g = **.30** | ✅ exact, CI [.17, .43] |
| Nonjournal fixed g = **.02** | ✅ exact, k=16, CI [−.02, .05] |
| Nonjournal random g = **−.01** | ✅ exact, CI [−.15, .13] |
| Qb fixed **24.45, p = .000** | ✅ exact |
| Qb random **10.03, p = .002** | ✅ exact |
| "*wider* under random effects" | ✅ fixed contrast 0.26; random contrast 0.31 |
| "one of only two moderators in Table 2 clearing both specifications" | ✅ — I read the entire random-Qb column of Table 2: .62, **6.42\***, 5.10\*, .60, .58, .37, .70, .74, .37, 3.01, .02, 1.09, **10.03\*\***, 5.71. Only `ITS duration` (6.42, p=.040; and its further analysis 5.10, p=.024) and `Report type` clear. |

**State: VERIFIED.** All six numbers exact; robustness under both models confirmed; the "wider under
random effects" claim confirmed.

**⚠️ ONE MATERIAL OMISSION I FOUND — see Correction R1 below.** The report-type moderator **does not
replicate in the adjusted analysis (Table 3)**, and the dossier does not say so.

### Table B — WWC domain ratings (all three)

WWC report p.1, verbatim: *"Cognitive Tutor® Algebra I was found to have mixed effects on algebra and
no discernible effects on general mathematics achievement for secondary students. Cognitive Tutor®
Geometry was found to have potentially negative effects on geometry for secondary students."* ✅

WWC summary table, verbatim:

```
Algebra                          Mixed effects              +4    -7 to +19   5   12,182   Medium to large
General mathematics achievement  No discernible effects     +2    na          1      658   Small
Geometry                         Potentially negative effects -8   na          1      669   Small
```

| Claim | Verified? |
|---|---|
| Algebra: **mixed effects**, medium-to-large, avg **+4**, range **−7 to +19**, 5 studies, 12,182 students | ✅ all exact |
| General mathematics: **no discernible effects** | ✅ exact (1 study, 658 students, small) |
| Geometry: **potentially negative effects** | ✅ exact (1 study, 669 students, small) |
| Algebra-domain summary quote ("one study… showed a statistically significant positive effect, one study showed a substantively important positive effect, and three studies showed an indeterminate effect. This results in a rating of mixed effects, with a medium to large extent of evidence.") | ✅ verbatim, WWC p.6 |
| Counter-weight quote ("when this result was adjusted for multiple comparisons… not large enough to be considered substantively important… i.e., an effect size of at least 0.25") | ✅ verbatim, Wolfson paragraph, WWC p.6 |

**Confirming V2b asked only for the algebra rating:** V2b §3 requests, verbatim, *"add the domain-level
rating sentence — 'mixed effects, with a medium to large extent of evidence' — to F13's caveats."* One
domain. The two worse ratings are not mentioned anywhere in V2b. ✅ **C2-EC's departure #2 is correct.**

**State: VERIFIED.**

### Table C — the vendor-authorship finding (the strongest new item)

Verified against the WWC's own reference list and study-level narratives. **The pattern holds and is
cleaner than C2-EC stated it.**

| Study | WWC verdict | Authors / publisher (verbatim from WWC reference list) | Independent? |
|---|---|---|---|
| **Wolfson et al. (2008)** | statistically significant **positive** | "Wolfson, M., Koedinger, K., Ritter, S., & McGuire, C. (2008). *Cognitive Tutor Algebra I: Evaluation of results (1993–1994)*. **Pittsburgh, PA: Carnegie Learning, Inc.**" + additional source "Carnegie Learning, Inc. (2001)… Pittsburgh, PA: Author." | ❌ **Vendor** — vendor-published, vendor-authored (Ritter, Carnegie Learning; Koedinger, Cognitive Tutor co-creator) |
| **Ritter et al. (2007)** | substantively important **positive** | "Ritter, S., Kulikowich, J., Lei, P., McGuire, C., & Morgan, P. (2007)… Netherlands: IOS Press." + additional sources "Carnegie Learning, Inc. (2004)… Pittsburgh, PA: Author" and "Morgan, P., & Ritter, S. (2002)… Pittsburgh, PA: Carnegie Learning, Inc." | ❌ **Vendor** — first author is Carnegie Learning's own scientist; underlying reports are vendor reports |
| **Cabalo, Jaciw & Vu (2007)** | **indeterminate** | "…*A report of a randomized experiment in the Maui School District*. **Palo Alto, CA: Empirical Education, Inc.**" | ✅ Independent third-party evaluator |
| **Campuzano, Dynarski, Agodini & Rall (2009)** | **indeterminate** | "…(NCEE 2009-4041). **Washington, DC: U.S. Department of Education, Institute of Education Sciences.**" | ✅ Independent (federal) |
| **Pane et al. (2014)** | **indeterminate** | RAND | ✅ Independent |

**Both positives vendor; all three indeterminates independent. CONFIRMED — 5/5.**

**Is the inference sound?** Yes, with the weight C2-EC assigned it and no more. My assessment:

- **What it is:** a study-level, source-independent, method-independent convergence with the
  `Report type` moderator. Steenbergen-Hu & Cooper's finding is a meta-analytic moderator over 26
  K–12-maths samples; the WWC pattern is a five-study census of one product by a government reviewer
  using its own recomputation. That two unrelated instruments, on partly non-overlapping study sets,
  both separate "positive" from "independent" is genuine corroboration — the inference does not
  depend on either source being right about the other.
- **What it is not:** causal, and not statistically powered. n=5 with a 2/3 split occurs by chance
  often. C2-EC records exactly this ("Five studies is also a small base for an authorship-independence
  inference, and the WWC does not itself draw this inference"), and grades it "strongly suggestive
  convergence, not a demonstrated causal claim." **That grading is correct and I would not change a
  word of it.** Under the program's bucket taxonomy this is *Evidence-backed* for the pattern and
  *Product judgement* for the causal reading, which is how the dossier presents it.
- One refinement, non-material: the dossier's phrasing is precise (it prints the publisher fields and
  lets them speak). **The C2-EC *report*'s summary line — "published by Carnegie Learning" of both
  studies — is loose:** Ritter et al. (2007) was published by IOS Press, not Carnegie Learning. The
  *authorship* claim holds for both; the *publisher* claim holds for Wolfson only. The dossier does
  not make this error; only the report's summary table does.

**State: VERIFIED.**

### Table D — verbatim and numeric checks

| Check | Source | Result |
|---|---|---|
| Anderson's **"two major stages"** | Anderson (1982) abstract, p.369 | ✅ verbatim: *"A framework for skill acquisition is proposed that includes **two major stages** in the development of a cognitive skill"* |
| Three-stage model is **Fitts (1964)** | Anderson (1982) p.369–370 | ✅ — Anderson discusses "Fitts's cognitive stage," "Fitts's second stage is really a transition… knowledge compilation," "Fitts's autonomous [stage]" |
| The **"surface contradiction to ACT's"** clause | Anderson (1982) p.397, §"Procedural Learning: The Power Law" | ✅ verbatim, non-layout extraction: *"One aspect of skill acquisition is distinguished both by its ubiquity **and by its surface contradiction to ACT's multiple stage, multiple mechanism view of skill development**. This is the log-linear or power law for practice."* The inherited ellipsis removes precisely the clause carrying Anderson's stance. **The meaning reversal is real.** |
| The weaker surviving claim ("The ACT theory predicts that a power law…") | Anderson (1982) p.398 | ✅ verbatim: *"The ACT theory predicts that a power law should describe the amount of activation of a knowledge structure as a function of practice"* — the dossier's ellipsis here is honestly marked |
| **k = 2** for the −.42 | Steenbergen-Hu & Cooper **Table 2** | ✅ `Low achievers  2  -.42  [-.55,-.28]  -.23  [-1.08, .63]` |
| k = 3 for the −.18 | Steenbergen-Hu & Cooper **Table 3** | ✅ `Low achievers  3  -.18  [-.32,-.05]  -.16  [-.49, .18]` |
| Random CI **−.23 [−1.08, .63]** (crosses zero) | Table 2 | ✅ exact |
| Random CI **−.16 [−.49, .18]** (crosses zero) | Table 3 | ✅ exact |
| Body p.979 both-models quote | Steenbergen-Hu & Cooper | ✅ verbatim, incl. `Qb(1) = 46.13, p = .000` fixed and `Qb(1) = 0.60, p = .438` random |
| **Sample size** Qb random **0.74, p = .389** | Table 2, `Sample size (further analysis)` | ✅ exact; `<200 k=9 fixed .27 [.09,.45] random .21 [−.14,.56]`; `Over 200 k=17 fixed .04 [.01,.08] random .05 [−.08,.17]`; Qb fixed 5.94\*, p=.015 |
| Trim-and-fill paragraph | Steenbergen-Hu & Cooper, §"Examining Publication Bias" | ✅ verbatim word-for-word, incl. ".04 under a fixed-effect model… .03 under a random-effects model… was 0.05… and 0.09… might have been **slightly** overestimated" |
| Table 1 low-achiever rows | Steenbergen-Hu & Cooper | ✅ Biesinger n=3,566 Quasi Journal **0.22 / 0.13**; Plano n=779 Quasi Nonjournal **−0.66 / −0.48**; Smith n=445 **True experimental** Nonjournal **[unadjusted cell BLANK] / −0.07** |
| **Ma Table 1 two-block structure** | Ma et al. (2014) Table 1 | ✅ Random-effects: `.44* .05 −.11 .57* .36*`; Fixed-effect: `.37* .10 −.11 .47* .30*`. **The .10 is the fixed-effect small-group value.** Abstract: `.42 .57 .35 −.11 .05` — the **.05 agrees exactly** with random effects. |
| **F1 / VanLehn slide 37 d-values with effect counts** | VanLehn slide deck | ✅ verbatim: *"Meta-analytic results for all possible pairwise comparisons (VanLehn, 2011)"* — vs. no tutoring: Answer-based **165 / 0.31**, Step-based **28 / 0.76**, Substep-based **26 / 0.40**, Human **10 / 0.79**. All four counts and all four d-values exact. |
| **F7 "nearly all"** — footnoted games-won/lost analysis | Heathcote et al., footnote 1 | ✅ verbatim: *"For games won R² for the Exponential was 0.339 and only 0.253 for the power. For games lost R² was 0.183 and 0.173…"* |
| F7 "In Press" manuscript pagination | Heathcote et al. | ✅ running header on every page: *"In Press, Psychonomic Bulletin and Review"*. 65-page manuscript, not journal pp.185–207. |
| **F8** piecewise-exponential comparison | Donner & Hardy (2015) | ✅ verbatim: *"Three-parameter piecewise exponential functions performed similarly to the three-parameter PPLs, but slightly worse, explaining 90.43 % of the variance."* |
| **F10** both quantities | Cepeda et al. (2006) abstract | ✅ verbatim: *"This review found 839 assessments of distributed practice in 317 experiments located in 184 articles"* and *"the ISI producing maximal retention increased as retention interval increased."* PDF downloaded **first try** from the collector's own recorded URL. Title confirms the **verbal recall tasks** scope. |
| **F15** mechanism quote | Anderson et al. (2004) p.1054 | ✅ verbatim: *"Qin et al. (2003) estimated that each retrieval operation took 650 ms on Day 1 and because of base-level learning had sped up to 334 ms on Day 5. **Base-level learning is the sole factor producing the speed up in Figure 16.**"* |
| **F15** provenance quote | Anderson et al. (2004) | ✅ verbatim: *"Figure 20 shows **unpublished data from the Qin et al. (2003) study**"* |
| **F15** what survives | Anderson et al. (2004) | ✅ verbatim: *"both production compilation and location learning are major contributors to the overall learning"* |

**Every one of the 13 corrections re-verifies against the primary source. Zero DROPPED. Zero
UNVERIFIABLE.**

---

## Adjudication — C2-EC's three departures from V2b

### Departure 1 — "V2b's k=2 arithmetic does not verify" → **UPHELD, with a correction to the reasoning**

**Verified facts:**
- Smith (2001)'s **unadjusted effect-size cell in Table 1 is blank.** ✅ Only an adjusted −0.07 is
  printed. C2-EC's observation is correct.
- Biesinger (+0.22, n=3,566) and Plano (−0.66, n=779) do **not** combine to −.42. I computed it:
  inverse-variance ≈ n-weighting gives `(3566×0.22 + 779×−0.66)/4345 = +0.062` — **positive**, off by
  half a standard deviation and the wrong sign. ✅ C2-EC's claim is correct.
- The paper never states the composition of the k=2 cell. ✅ I searched the full text.

**Ruling: the departure is justified and the dossier's recorded status (open question, not asserted)
is the right call** — it is strictly more defensible than V2b's assertion, and it cuts *against* the
pessimistic reading, i.e. against the corrector's own incentive.

**But C2-EC's supporting argument overreaches in two places, and one of its own misses explains why
the arithmetic is unreconstructable:**

1. *"Smith has no unadjusted effect size printed in Table 1, so it cannot be one of the k=2 in the
   unadjusted analysis"* — this does not follow. A blank **printed** cell is not evidence of exclusion
   from the **analysed** set. And V2b's reconstruction does in fact compute: n-weighting Plano (−0.66,
   n=779) with Smith (−0.07, n=445) gives **−0.4455**, within .026 of the printed −.42, and it is the
   only candidate pairing that lands anywhere near it. So V2b's *conclusion* about composition is
   probably right; what fails is that its *evidence* rests on a value the table does not print.
   C2-EC recorded the right status for the wrong reason.
2. **C2-EC missed the fact that actually decides this.** Steenbergen-Hu & Cooper, §Results, verbatim:

   > "The Grubbs tests showed that, among the unadjusted overall effect sizes (k = 26), one effect
   > size (g = **−1.57**) appeared to be an outlier (i.e., Plano, Ramey, & Achilles, 2007)… Clearly
   > then, the unadjusted effect size was strongly impacted by the preexisting differences between
   > the treatment and comparison groups. **We reset the effect size to −0.66, its next nearest
   > neighbor** among the unadjusted overall effect sizes."

   **Plano's printed −0.66 is a winsorized substitute for a raw −1.57.** This is why no
   reconstruction from the printed table can reproduce the pooled −.42 cleanly, and it is a
   material, unextracted fact about the most negative data point in the finding the dossier spends
   most of F12 discussing. See Correction R2.

### Departure 2 — "V2b's WWC remedy was incomplete in the optimistic direction" → **UPHELD in full**

Both halves verified. V2b's §3 requested the algebra "mixed effects, with a medium to large extent of
evidence" rating and nothing else; the WWC also rates one domain **no discernible effects** and one
**potentially negative effects**, both confirmed verbatim above. Adding only the algebra rating would
have moved the record optimistically on incomplete grounds.

**This is the single clearest calibration signal in the pass.** A corrector under pressure to find
problems, correcting a prior verifier, chose the correction that makes the record *less* favourable
to the product than V2b's proposal. That is the opposite of the manufactured-pessimism failure mode —
it is a correction that cost it its own narrative. Sound.

### Departure 3 — "V2b's `Sample size` framing missed that it fails random effects" → **UPHELD in full**

Verified exactly: `Sample size (further analysis)` — Qb fixed 5.94\*, p = .015; **Qb random 0.74,
p = .389**; random point estimates .21 [−.14, .56] vs .05 [−.08, .17], CIs overlapping across almost
their entire range and both crossing zero. V2b's sentence — *"Sample size runs the same way (< 200:
g = .27; > 200: g = .04)"* — sets it beside report type without the model split, which reads as a
second robust moderator.

**The judgement is correct and is the harder call of the three.** Recording it as corroborating
colour rather than a second robust moderator is what the table supports; had C2-EC landed V2b's
framing verbatim, the dossier would have swapped an old overstatement for a new one. Well reasoned.

---

## Spot-check of the four findings LEFT UNCHANGED (F2, F6, F9, F11)

I re-verified all four independently rather than accepting the editor's account. **All four are
accurate as written. The decision to leave them alone was well-calibrated, not lazy.**

| Finding | Independent check | Result |
|---|---|---|
| **F2** Kulik & Fletcher (2016) | ERIC abstract retrieved | ✅ Both sentences **verbatim**: *"The median effect of intelligent tutoring in the 50 evaluations was to raise test scores 0.66 standard deviations over conventional levels, or from the 50th to the 75th percentile."* and *"…the amount of improvement found in an evaluation depended to a great extent on whether improvement was measured on locally developed or standardized tests, suggesting that alignment of test and instructional objectives is a critical determinant of evaluation results."* Access-downgrade pairing (Q1 study, abstract-only read) correct and honestly disclosed. The "conventional levels is a mixed comparator" caveat is accurate. |
| **F6** Newell & Rosenbloom via Heathcote | Heathcote PDF, full text | ✅ All three **verbatim**: *"Curve fitting without benefit of a model is notoriously a black art"* (N&R p.23); *"a learning process in which some mechanism is slowing down the rate of learning"* (N&R p.18); *"…examined by Newell and Rosenbloom (1981)… were averaged over subjects, conditions, or practice blocks."* Access account (chapter not opened, quoted through a secondary) truthful; downgrade adequate. |
| **F9** Pavlik & Anderson (2008) | act-r.psy.cmu.edu PDF, full text | ✅ Every figure **verbatim**: *"For correctness, these results show a Cohen's-d effect size of 0.796 SD compared to the Atkinson control and 0.978 SD compared to the flashcard control. For latency… 1.17 SD… and 1.31 SD…"*; *"60 participants learned a set of 180 Japanese-English vocabulary words"*; abstract quote exact. V2's "cleanest citation in the dossier" assessment holds. Its self-critical caveat is correctly directed. |
| **F11** Rohrer, Dedrick & Burgess (2014) | PubMed abstract | ✅ **140 seventh-grade students** confirmed. All three sentences verbatim incl. *"(72 % vs. 38 %, d = 1.05)"*, the superficially-dissimilar clause, and the discrimination/association conclusion. Transfer caveat (grade-7 math ≠ adult strategy-game skill) honestly stated. |

**Two de-minimis quote deviations noticed, recorded for completeness, neither material and neither
requiring action:** F2 omits a leading "However," from the second quoted sentence (presented as a
separate sentence after "And:", so it does not misrepresent); F11 renders "rather than by blocked
practice" as "rather than blocked practice" (one dropped preposition). Flagged only because this
program's standard for text marked "exact quote" is character-exact, and both would be trivially
fixable in any future pass. **Neither changes any meaning; neither is a paraphrase-as-quote defect.**

## The withdrawn Ma-rounding conflict — is it really an artifact?

**Verified: YES, it is a column-reading artifact. The withdrawal is correct.**

Ma et al. (2014) Table 1 carries **two side-by-side effect-size blocks** under a shared header
(`Random-effects model` | `Fixed-effect model`), each with `g+ / SE / Lower / Upper`. Extracted
verbatim:

```
                                     RANDOM              FIXED
  Large-group human instruction   0.44*  0.05  ...   0.37*  0.02 ...
  Small-group human instruction   0.05   0.28  ...   0.10   0.16 ...
  Individual human instruction   -0.11   0.10  ...  -0.11   0.10 ...
  Individual CBI                  0.57*  0.11  ...   0.47*  0.06 ...
  Individual textbook/workbook    0.36*  0.09  ...   0.30*  0.06 ...
```

The abstract reports `.42 / .57 / .35 / −.11 / .05`. The small-group **.05 agrees exactly** with the
random-effects column; the .10 the original note called "Table 1 (random-effects)" is the
**fixed-effect** value. The claimed conflict was manufactured by reading across the wrong block.
Three of five abstract values (.57, −.11, .05) match random effects exactly; two (.42 vs .44, .35 vs
.36) differ by one hundredth. **A one-hundredth discrepancy in two of five values within one paper is
not a source conflict and does not warrant a register row. Withdrawal upheld.**

One small note: C2-EC's *explanation* for the residual — "ordinary online-first-vs-final rounding" —
is an **Assumption**, not evidence; I found nothing in the paper establishing it. The withdrawal is
right on de-minimis grounds regardless of the explanation, so this does not change the outcome, but
the dossier states a cause it has not evidenced. Minor; see Correction R3.

## Calibration claims — assessed

C2-EC claimed movement in both directions. **Verified, and the claim is honest:**

- **Three upgrades carried forward** (F1 numerics + tier Q4→Q5, F8 uncertainty resolved, F10 access
  downgrade removed) — **all three independently verified as correct upgrades.** F1's d-values are
  genuinely printed in VanLehn's own slide-37 table with effect counts; F8's exponential family
  genuinely *was* compared; F10's PDF genuinely downloads first try and both quantities are verbatim.
  Plus F5's access-downgrade removal, which I verified by downloading Anderson (1982) myself in one
  attempt from the collector's own recorded URL.
- **One over-correction withdrawn** (Ma-rounding conflict) — verified as an artifact, above.
- **Three prior corrections themselves corrected** — all three departures upheld, two of them cutting
  against pessimism (WWC, sample size).
- **Four findings examined and left unchanged** — all four independently confirmed accurate.

**Assessment: this is well-calibrated work, not insubordination and not manufactured pessimism.** The
pass moved the record optimistically on F1, F5, F8, F10 and the Ma conflict; pessimistically on F12
and F15, both re-derived from primary text I have now independently reproduced; and it corrected a
prior verifier three times, twice in the direction that made its own findings less striking. The one
finding it elevated to the headline — report type — is not a pessimistic finding about ITS but a
finding about which ITS numbers to trust, which is the correct framing.

---

## Corrections REQUIRED by V2c (returned for a follow-on editorial pass — I did not edit the dossier)

### R1 — `Report type` does not replicate in the adjusted analysis, and the dossier does not say so

**Severity: material.** This is the one finding I would insist on, because the dossier now headlines
report type in F12, adds a forward pointer at the head of `## Findings` instructing readers not to
quote an effect size without it, and the C2-EC report calls it "the most decision-relevant result C2
now carries."

Steenbergen-Hu & Cooper run the same moderator over **adjusted** effect sizes in **Table 3**.
Verbatim:

```
Report type                            .69   .407              1.98   .160
  Peer-reviewed journal    6   -.04  [-.17, .08]      .23  [-.11, .57]
  Nonjournal              11    .02  [-.04, .07]     -.03  [-.15, .09]
```

**The moderator is not significant under either specification in the adjusted analysis, and the
peer-reviewed fixed-effect point estimate reverses sign to −.04.**

The dossier is not *wrong* — it labels its table "Table 2" and Table 2 is the unadjusted analysis,
where the finding is exactly as reported. But "robust under BOTH fixed- and random-effects models"
in the F12 headline and the forward pointer will be read as robustness *simpliciter*, and a reader
has no way to discover from the dossier that the same paper's adjusted analysis (k=17 samples rather
than 26) does not reproduce it.

**This is the identical omission C2-EC correctly faulted V2b for on `Sample size` — a moderator's
robustness reported without the specification where it fails — reproduced by C2-EC on the moderator
it elevated.** Required fix: add to F12 that the moderator is confined to the unadjusted analysis and
does not reach significance in Table 3 under either model, with the k difference noted. Direction of
movement: report type should carry somewhat less weight than the dossier currently gives it, though
it remains the best-supported moderator in Table 2 and the vendor-authorship convergence is
unaffected.

### R2 — Plano's −0.66 is a Grubbs-winsorized substitute for −1.57

**Severity: moderate.** Verbatim, Steenbergen-Hu & Cooper §Results:

> "The Grubbs tests showed that, among the unadjusted overall effect sizes (k = 26), one effect size
> (g = −1.57) appeared to be an outlier (i.e., Plano, Ramey, & Achilles, 2007). We found that the
> Plano et al. (2007) study provided information for both an adjusted (adjusted by pretest scores,
> g = −0.48) and an unadjusted effect size (g = −1.57). Clearly then, the unadjusted effect size was
> strongly impacted by the preexisting differences between the treatment and comparison groups. We
> reset the effect size to −0.66, its next nearest neighbor among the unadjusted overall effect
> sizes."

The dossier presents −0.66 as Plano's printed unadjusted ES with no note that it is a substituted
value, or that the authors themselves attribute the raw figure to baseline non-equivalence. This is
material to the low-achiever discussion, it explains why the k=2 composition cannot be reconstructed
from the printed table, and it cuts **further against** the pessimistic reading — the most negative
low-achiever data point is both winsorized and, on the authors' own account, confounded by
pre-existing group differences. It sits in the same source, read in full, that C2-EC re-extracted
Table 1 from.

### R3 — "online-first-vs-final rounding" is an unevidenced explanation

**Severity: cosmetic.** The residual Ma abstract-vs-table discrepancy (.42/.35 vs .44/.36) is real
and de minimis; the *cause* the dossier assigns it is an Assumption with no supporting text. Restate
as "cause not established; magnitude de minimis" or drop the causal clause. Does not affect the
withdrawal.

### R4 — the C2-EC report's summary line on Ritter et al. (2007) publisher

**Severity: cosmetic, and it is in the report, not the dossier.** The report's findings table says both
positive studies were "published by Carnegie Learning"; Ritter et al. (2007) was published by IOS
Press. The dossier body is precise and needs no change.

---

## Conflicts surfaced during verification (returned as text — registers NOT written to)

| Proposed | Claim in tension | Detail |
|---|---|---|
| **New row** | `Report type` moderator is robust across models in Steenbergen-Hu & Cooper's **unadjusted** analysis (Table 2, Qb 24.45/10.03) but **not significant under either model in the adjusted analysis** (Table 3, Qb 0.69 p=.407 / 1.98 p=.160), with the peer-reviewed fixed estimate reversing to −.04 | Within-source, within-paper specification split on the moderator the dossier now headlines. Bears directly on conflict row **#27**. The orchestrator may prefer to amend #27 rather than open a new row — my recommendation is to **amend #27**, since it is the same finding at a corrected weight, not a new disagreement. |
| **No new row** | Ma-rounding | Confirmed withdrawn; do not promote. C2-EC's proposed withdrawal is upheld. |
| **No new row** | Vendor-authorship convergence | Correctly folded into #27 by C2-EC rather than opened separately. I agree with that handling — it is corroboration of #27, not an independent conflict. |

## Source-lead register rows (returned as text)

| Source | Status | Note |
|---|---|---|
| Qin, Sohn, Anderson, Stenger, Fissell, Goode & Carter (2003), *PNAS* 100, 4951–4956, DOI 10.1073/pnas.0431053100 | Paywall lead | Unchanged from V2b/C2-EC. F15 is a first-party secondary route; correctly scoped in the dossier. Not a defect. |
| Evans, Brown, Mewhort & Heathcote (2018), *Psychological Review* 125(4), 592–605 | Collection lead — **optional, low priority** | See sufficiency assessment. Not load-bearing. |

---

## Axis 2 — dossier sufficiency, re-judged

**Verdict: SUFFICIENT.**

C2's INSUFFICIENT verdict (V2b) rested on a precisely-enumerated remedy of unextracted content inside
already-cited sources at zero new citations. I checked the discharge item by item against V2b's own
§3 list:

| V2b §3 required item | Landed? | Verified by V2c? |
|---|---|---|
| Table 2 `Report type` moderator, both specifications | ✅ | ✅ all six numbers exact |
| Table 2 `Sample size` moderator, both specifications | ✅ (and corrected — see departure 3) | ✅ exact |
| Trim-and-fill publication-bias result | ✅ | ✅ verbatim |
| Three low-achiever effect sizes + designs from Table 1 | ✅ | ✅ exact (⚠️ Grubbs note missing — R2) |
| Random-effects point estimates + CIs into F12 | ✅ | ✅ both CIs exact, both cross zero |
| WWC domain rating into F13 | ✅ **exceeded** — all three domains, plus vendor authorship | ✅ all verified |
| F15 Access field → first-party secondary route | ✅ | ✅ |
| F15 mechanism correction | ✅ | ✅ verbatim |
| Retraction "two" → "one" | ✅ | ✅ |
| *(carried from V2, never landed)* F1 tier + numerics, F3 column, F4 two-stage, F5 ellipsis, F7 "nearly all", F8 upgrade, F10 upgrade, F14 attribution, Ma-conflict withdrawal | ✅ all landed | ✅ all verified |
| *(structural, V2b flagged)* forward pointer at head of `## Findings` | ✅ | ✅ present and accurate |

**The enumerated remedy is fully discharged, at zero new citations, dossier still 15/15.** The
insufficiency V2b identified no longer holds.

**Why R1 and R2 do not reopen INSUFFICIENT.** Both are strength/precision defects *within* an
extraction that has now happened — Axis-1 corrections, not a failure to engage evidence bearing on
the card's question. Sufficiency asks whether additional *searching* would materially change the
conclusions; it would not. R1 does move the weight of one headline finding, and I have marked it
material for that reason, but a follow-on editorial pass of the same zero-citation kind closes it.
I state this explicitly so the orchestrator can disagree: if the program's convention is that a
material strength correction blocks a sufficiency pass, then C2 is INSUFFICIENT-pending-R1. On my
reading of the two-axis split in the role card, it is SUFFICIENT with a required correction.

### The two residual gaps C2-EC escalated — are they load-bearing?

**1. Evans et al. (2018), *Psychological Review* 125(4) — NOT load-bearing. Do not spend a top-up.**

C2's Q3 is scoped in the dossier's own words as *"a genuine open dispute, not to be resolved here."*
The dossier carries all three live positions (power law / exponential / piecewise) with the strongest
one, Heathcote et al., read in full from primary text. Evans et al. would date-stamp the dispute past
2015 — but it cannot change a conclusion whose content is "unresolved," and it is another RT-paradigm
paper, so it does not touch the gap that actually matters to this product: the dossier's own coverage
gap that *no source addresses whether either curve family describes accuracy improvement in a
discrete-choice task*. Adding Evans would improve currency and close nothing. **Recommendation: leave
as a declared lead; do not invoke amendment 5 for it.**

**2. Retrieval-practice / testing-effect tradition (Q4) — potentially load-bearing, but NOT a C2 gap.
Resolve at synthesis, not by reopening C2.**

This one deserves a straight answer rather than a shrug. Q4 asks what the literature says about
practice scheduling for a fixed-item solo drill, and a blackjack basic-strategy trainer is, in
structure, a retrieval-practice drill. The testing-effect tradition (Roediger & Karpicke and
successors) is the largest evidence body on whether retrieval practice itself produces durable
learning, and C2 carries none of it — Q4 rests on F9 (Pavlik, ACT-R scheduling), F10 (Cepeda,
distributed practice in *verbal recall*), F11 (Rohrer, interleaving). That is a real absence relative
to the question.

**But it is not C2's absence to fill.** V2 and V2b both scoped it out *pending a check of C3/C5*, and
C5 is the Anki/spaced-repetition card, where this tradition is where it belongs. Pulling it into C2
would duplicate across cards, which is precisely what the citation caps exist to prevent, and would
spend a top-up on evidence the program may already hold.

**Recommendation:** convert this from a C2 residual gap into a **synthesis-time check with a named
owner** — verify that C5 (and/or C3) actually carries the retrieval-practice/testing-effect
tradition. If neither does, it is a **program-level** gap to be filled on the card that owns it, and
amendment 5 should be invoked *there*, not on C2. C2's Q4 conclusions do not move either way until
that check returns.

### Coverage assessed against the template's four axes

- **Traditions / landmarks / positions present:** the ITS meta-analytic spine (Kulik & Fletcher; Ma et
  al.; Steenbergen-Hu & Cooper); VanLehn's interaction-granularity synthesis; the at-scale
  independent-evaluation position (Pane via RAND + WWC); Anderson's original ACT theory *and* ACT-R's
  actual production-compilation mechanism; the full three-way power-law/exponential/piecewise dispute;
  the practice-scheduling cluster (spacing, distributed practice, interleaving). **Newly present after
  this pass and genuinely decision-relevant: a quantified, within-source account of *why* the
  optimistic and pessimistic ITS literatures diverge, corroborated at study level from an unrelated
  source.** That was the substance of V2b's insufficiency and it is now in the dossier.
- **Required sub-questions:** 4 of 4 engaged. Q1 now answerable with its own explanation attached
  rather than as two piles of numbers. Q2 correctly scoped to one fitted model plus one restated
  study. Q3 carries all three positions and is honestly left open. Q4 is the thinnest, per above.
- **Strongest counter-argument engaged?** Yes, and in both directions — which is the test C2 previously
  failed. F1–F3's optimistic picture is contested by F12–F13 with a forward pointer; F12's own
  striking negative is deflated by its own caveats (k=2, null under random effects, the only true
  experiment null, the largest sample positive); F13's null is contextualised by the WWC's mixed
  algebra rating; and that mixed rating is in turn qualified by vendor authorship. The dossier now
  argues against itself at every level, which is what a usable evidence base looks like.
- **Searches run to test for what is NOT there:** I did not re-run V2b's ten-query coverage sweep and
  do not claim to have. My Axis-2 judgement rests on (a) V2b's sweep, which found no missed landmark
  on Q1 or Q2, (b) item-by-item verification that V2b's enumerated remedy is discharged, and (c) my
  own reading of the two named residual gaps against the card's scope. **Stated as a limitation:** a
  fresh independent coverage sweep was not part of this dispatch and my SUFFICIENT verdict inherits
  V2b's negative search result on Q1/Q2 rather than reproducing it.

---

## Verifier summary

- **Corrections re-verified: 13** | VERIFIED: **13** | UNVERIFIABLE: **0** | DROPPED: **0**
- **Findings spot-checked and confirmed unchanged-correctly: 4** (F2, F6, F9, F11)
- **UNVERIFIED remaining: 0**
- **Dossier sufficiency (F1–F15): SUFFICIENT** — V2b's enumerated remedy fully discharged at zero new
  citations; dossier still 15/15.
- **Headline claim: CONFIRMED.** The V2/V2b corrections were genuinely absent from the dossier.
  Phase 1 gate summary §4 ("all applied") is **false for C2** and must be re-checked for C1, C3–C6.
- **C2-EC's three departures from V2b: all three UPHELD** (one with a corrected rationale and one
  missed supporting fact — see R1/R2).
- **Withdrawn Ma-rounding conflict: confirmed an artifact.** Withdrawal upheld.
- **New corrections required by V2c: 4** — **R1 material** (report type does not replicate in the
  adjusted analysis), **R2 moderate** (Plano's −0.66 is a Grubbs-winsorized substitute for −1.57),
  R3 and R4 cosmetic.
- **Calibration of the pass under review: sound.** Moved in both directions on verified grounds,
  corrected a prior verifier twice *against* pessimism, and left four accurate findings alone. The
  one defect I found in it (R1) is a genuine miss, not a bias — and notably it is the same class of
  omission the pass itself correctly identified in V2b.
- **Tool-route assessment: local `pdftotext` extraction STRENGTHENS confidence in the quotes.** Every
  claimed-verbatim quote re-derived character-exact from the primary PDF. No git command was run by
  this verifier.
