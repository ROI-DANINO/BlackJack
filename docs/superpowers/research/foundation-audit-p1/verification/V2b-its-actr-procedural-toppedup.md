# Verification Record: C2b — ITS / ACT-R / Procedural Skill (focused-pass additions F12–F15)

> Verifier: Claude (Opus 4.8, 1M) — a different agent instance than the collector, than V2, and than
> the top-up collector (C2-FP)  |  Date: 2026-07-19
> Contract: exists + supports + strength-honest. VERIFIED requires an exact supporting location.
> Every source is INDEPENDENTLY located by the verifier — the collector's summary is not trusted.
> **Scope: Part 1 covers F12–F15 ONLY.** F1–F11 were verified by V2; that pass stands and was not
> redone. Part 2 judges the sufficiency of the WHOLE enlarged dossier (F1–F15).

## Method note (how independence was made real)

Every one of the four additions was re-derived from primary text I downloaded and extracted myself
with `pdftotext`, never from a fetch summary. Files pulled independently at the URLs the dossier
records: Steenbergen-Hu & Cooper (2013) from the DukeSpace bitstream; the WWC Cognitive Tutor
intervention report from `ies.ed.gov`; Taatgen & Lee (2003) from `ai.rug.nl`; Anderson et al. (2004)
from the CMU ACT-R repository. Two-column PDFs were re-extracted **without** `-layout` where the
layout pass interleaved columns, because an interleaved extraction can fuse two unrelated sentences
into a quote that appears verbatim and is not — the class of hazard the shared brief warns about.

The RAND addendum initially returned a **403 CloudFront block** to a plain `curl` (919 bytes of HTML,
not a PDF). I did not treat that as unreachable and did not report it as read until I had it: a
re-request with a browser user-agent returned the genuine PDF, whose first page I read directly.
Flagging this because a less careful pass could have recorded the 403 body as the source.

**Access claims were tested as claims, not accepted.** The dossier's central access assertion — that
Pane et al. (2014) is genuinely paywalled — I re-ran against both APIs myself rather than trusting
that the collector ran them.

**Both negative findings (F12, F13) were checked harder than the positive ones, not less**, per the
dispatch. That scrutiny changed the F12 result materially; see the resolution log.

| # | Claim | Source (id / title / URL·DOI) | Indep. located? | Exists | Supports | Strength honest | State | Supporting location (VERIFIED only) | Quality tier | Notes / downgrade |
|---|---|---|---|---|---|---|---|---|---|---|
| F12 | ITS on K–12 maths: overall g = .01–.09; **significant negative effect for low achievers** | Steenbergen-Hu & Cooper (2013), *J. Educational Psychology* 105(4), 970–987, DOI 10.1037/a0032447 — DukeSpace OA bitstream | Yes — full PDF downloaded, text-extracted | ✅ | ✅ | ⚠️ **materially downgraded** | **VERIFIED after downgrade** | Abstract (verbatim, incl. "ranging from g = 0.01 to g = 0.09" and the low-achiever sentence); **Table 2** "Testing for Moderators of the Unadjusted Effect Sizes", row *Sample achievement level*; **Table 3** (adjusted), same row; body p.979 (verbatim, both model specifications) | **Q1 confirmed** | Every number the dossier reports is verbatim. But **k is wrong, and the headline overstates.** See resolution log F12 — this is the significant finding of this pass. |
| F13 | Cognitive Tutor Algebra I at scale: Yr1 −0.06 n.s.; Yr2 +0.21 (p=.04) but WWC-corrected critical p = .025 → indeterminate | Pane, Griffin, McCaffrey & Karam (2014), *EEPA* 36(2), 127–144, DOI 10.3102/0162373713507480 — **confirmed closed**; accessed via RAND WR-1050-DEIES + WWC intervention report (June 2016) | Yes — RAND PDF and WWC PDF both downloaded and text-extracted; paywall independently re-tested | ✅ | ✅ | ✅ | **VERIFIED** | RAND addendum p.1, verbatim: "We found no effects of CTAI in the first year of implementation (Cohort 1), but a statistically significant positive effect in the second year of the high school study (Cohort 2)." WWC **Appendix C.1 effect-size table**: Yr1 73 schools/5,328 students, ES −0.06, index −3, p = .46; Yr2 5,738 students, ES +0.21, index **+8**, p = .04. WWC **footnote c**, verbatim: "A correction for multiple comparisons was needed and resulted in a WWC-computed critical p-value of .025 for the Algebra Proficiency Exam in Cohort B; therefore, the WWC does not find the result to be statistically significant." WWC narrative p.6, verbatim, incl. "The WWC characterizes this study finding as an indeterminate effect." WWC **Appendix A.4**: 73 high schools, 51 districts, 7 states, 11,066 analytic students | **Q2 for the underlying RCT, access-downgraded** — confirmed adequate | **Cleanest of the four.** Every figure, n, and quote exact. Two context omissions noted below — neither defeats the claim. |
| F14 | ACT-R's actual declarative→procedural mechanism is *production compilation*; F4's *knowledge compilation* is ACT*'s, and Anderson abandoned it | Taatgen & Lee (2003), *Human Factors* 45(1), 61–76 — https://www.ai.rug.nl/~niels/publications/HF-published.pdf | Yes — full PDF downloaded, text-extracted; **published version confirmed** | ✅ | ✅ | ⚠️ minor | **VERIFIED** | p.61 abstract, verbatim. **p.62**, verbatim: "Anderson proposed a learning mechanism he called knowledge compilation, which became part of the ACT* cognitive architecture (Anderson, 1983), a predecessor of ACT-R… However, Anderson later abandoned knowledge compilation (Anderson & Lebiere, 1998) because of a lack of empirical evidence and problems with what he called 'computational misbehavior,' which is caused by learned procedural knowledge that brings the system to an endless loop or causes it to abort prematurely." p.62, "Production Compilation" section, verbatim: "Production compilation was developed by Taatgen and Anderson (2002), and is currently incorporated in the latest version of the ACT-R theory" | **Q4 confirmed** (single fitted model of one simulated ATC task) | **Published-version claim CONFIRMED independently**: the PDF carries "HUMAN FACTORS, Vol. 45, No. 1, Spring 2003, pp. 61–76. Copyright © 2003" plus running heads and odd page numbers 63/65/67…75. Not a preprint. One framing softening — see below. |
| F15 | Anderson et al. (2004) reports a 5-day fMRI practice study: 650→334 ms per retrieval; caudate active Day 1, absent Day 5 | Anderson, Bothell, Byrne, Douglass, Lebiere & Qin (2004), *Psychological Review* 111(4), 1036–1060 — CMU ACT-R repository PDF | Yes — full PDF downloaded, text-extracted | ✅ | ⚠️ **partial** | ⚠️ **materially downgraded** | **VERIFIED after downgrade** | Abstract p.1036, verbatim. p.1045–46, verbatim: "Taatgen and Anderson (2002) have developed a production learning mechanism for ACT–R called production compilation, which shows considerable promise… basically a combination of composition and proceduralization as described in Anderson (1983) for ACT*." p.1051, verbatim: "both production compilation and location learning are major contributors to the overall learning." p.1053: "Participants were imaged on Days 1 and 5." p.1054, verbatim: "**Qin et al. (2003) estimated** that each retrieval operation took 650 ms on Day 1 and **because of base-level learning** had sped up to 334 ms on Day 5. Base-level learning is the sole factor producing the speed up in Figure 16." p.1056–57, verbatim: "Figure 20 shows **unpublished data from the Qin et al. (2003) study**…"; ANOVA F(1,7)=28.33, p<.005; "Although this is a neural marker possibly related to things in ACT–R such as production rule compilation, we do not yet have a theory of why there is greater activity at these points." | **Q4 for this citation** — **corrected from collector's Q3** | **The dispatch asked me to confirm these are the paper's own results. They are not.** See resolution log F15 — the second significant finding of this pass. |

## Resolution log (every citation that was UNVERIFIED at any point)

| # | Which point failed | Move taken | Terminal state | Note |
|---|---|---|---|---|
| **F12** | **strength** — headline claims "a significant NEGATIVE effect for low-achieving students"; k misreported | **downgrade** to what the source supports, then re-verify the weakened claim | **VERIFIED** | Three separable problems, all confirmed against the paper's own tables. **(1) k is 2, not 3, for the −.42.** The dossier says "Only three studies supplied the low-achiever subgroup." Table 2 (unadjusted, the −.42 figure) records **k = 2**. Table 3 (adjusted, the −.18 figure) records k = 3. The paper's body (p.978) does say "There were three studies that reported results for low achievers (Biesinger & Crippen, 2008; Plano et al., 2007; Smith, 2001)" — so the dossier's k=3 is right for the *study count* and for the adjusted analysis, and **wrong for the striking number it headlines**. **(2) The −.42 is essentially one quasi-experiment.** Table 1 gives the low-achiever effect sizes: Plano, Ramey & Achilles (2007), n = 779, quasi-experimental, **g = −0.66**; Smith (2001), n = 445, true experimental, **g = −0.07**. An n-weighted fixed-effect combination of exactly those two reproduces ≈ −0.44. So the headline negative rests on a single quasi-experimental study, and the one *true experimental* low-achiever study in the set is essentially null. **(3) The random-effects point estimates are omitted.** The dossier records only the Qb moderator tests under each model. The actual random-effects low-achiever estimates are **−.23, 95% CI [−1.08, .63]** (unadjusted) and **−.16, 95% CI [−.49, .18]** (adjusted) — both CIs cross zero comfortably. A reader of the dossier can see that the *moderator difference* is fixed-effect-only, but cannot see that the *effect itself* is null under random effects. **Downgraded claim that survives:** in a K–12-maths ITS meta-analysis, the low-achiever subgroup estimate is negative under both models but reaches significance only under a fixed-effect specification, rests on k=2 effect sizes dominated by one quasi-experimental study, and is not significantly different from zero under random effects. That is a real signal worth carrying and **is not** "ITS harm low achievers." |
| **F15** | **supports** (partial) + **strength** — the 5-day fMRI study is not this paper's own work, and the timing result is not a declarative→procedural measure | **downgrade** on both axes, then re-verify the weakened claim | **VERIFIED** | **(1) Provenance.** The dispatch asked me to confirm the fMRI results are Anderson et al. (2004)'s own. They are **Qin et al. (2003)**, *PNAS* 100, 4951–4956, DOI 10.1073/pnas.0431053100 (confirmed via Crossref: Qin, Sohn, Anderson, Stenger, Fissell, Goode, Carter). Anderson et al. (2004) restates that study, reproduces its figures "Adapted with permission," and attributes the numbers in-text ("*Qin et al. (2003) estimated*…"). The caudate panel is explicitly "**unpublished data from the Qin et al. (2003) study**" — new to print, but still that study's data. Anderson is a co-author of Qin et al., so this is first-party restatement rather than third-party summary — but the dossier's Access field says only "Full PDF directly downloaded… and read in full," with **no secondary-route disclosure at all**, which is a lower disclosure standard than this same dossier applies to F1 (VanLehn) and F6 (Newell & Rosenbloom). Corrected: F15 is a **first-party secondary route to Qin et al. (2003)**. Qin et al. is itself closed access (Unpaywall `is_oa: false`) → logged to the source-lead register. **(2) Mechanism.** More serious. The dossier presents 650→334 ms as "a behavioral timing signature… consistent with a declarative-to-procedural shift." The paper says the opposite about its cause: "because of **base-level learning**… **Base-level learning is the sole factor producing the speed up**." Base-level learning is *declarative* memory strengthening — retrievals getting faster, not being compiled away. Retrievals are still occurring on Day 5, at 334 ms each. This is therefore **not** a measurement of the declarative→procedural transition; it is a measurement of declarative retrieval speedup, which ACT-R attributes to a different mechanism entirely. **(3) The neural leg is weaker than presented too.** Anderson explicitly flags the caudate result as *anomalous* under ACT-R — "if basal ganglia represent production firing, it is not clear why there should be any rise from baseline in any condition" — and closes "we do not yet have a theory of why there is greater activity at these points." The dossier does quote that hedge, to its credit, but frames the finding as an empirical test that "directly falsifies" the retracted gap. An unexplained neural correlate the theory's own authors cannot yet account for is not a test of the mechanism. **Downgraded claim that survives:** Anderson et al. (2004) names production compilation as ACT-R's production-learning mechanism, demonstrates it doing real explanatory work in the GT-ASP model comparison (that quote is exact and does support the dossier), and restates a 5-day practice study (Qin et al. 2003) showing a retrieval speedup the authors attribute to base-level learning plus an unexplained caudate day-effect. Tier corrected **Q3 → Q4**: for *this* citation the paper is an integrative theoretical synthesis restating others' experiments, not a primary empirical report. |
| F13 | — (no point failed) | none needed | **VERIFIED** | Recorded here only to state that I looked for a failure and did not find one. Every figure checked against the WWC's own appendix table and footnote. |
| F14 | — (no point failed) | none needed | **VERIFIED** | Published-version claim independently confirmed by journal pagination. |

## Kills (citations dropped)

**None.** All four additions resolve to real, independently located sources that state a version of
the claimed thing. Two required material strength downgrades (F12, F15); neither required dropping,
because in both cases a genuine weaker claim survives and is worth carrying.

I want to be explicit that a zero-kill Part 1 here is **not** a clean bill of health. Two of four
additions were overstated, and — the point the dispatch pressed — **both overstatements run in the
pessimistic direction**. F12's negative effect was reported as more solid than it is; F15's evidence
for the ACT-R mechanism was reported as more direct than it is. The original insufficiency was
directional bias toward optimism. This pass has partially reproduced the same failure with the sign
flipped: the numbers that confirmed the program's expectation got less scrutiny than the numbers that
did not. Both are the same error.

## Quarantine (UNVERIFIABLE)

**None.** No cited source was unreachable.

**One access claim confirmed, tested independently.** Pane et al. (2014) is genuinely closed. I re-ran
both APIs myself rather than trusting the collector's report: Unpaywall on DOI 10.3102/0162373713507480
returns `is_oa: false` with **zero** `oa_locations`; Semantic Scholar returns
`isOpenAccess: false, openAccessPdf.status: "CLOSED"`, with author list matching (Pane, Griffin,
McCaffrey, Karam). **The collector's disclosure is accurate**, and the two-route fallback (first-party
RAND addendum + independent WWC report) is a stronger evidentiary position than the single-route
fallback used for F1. Logged to source-lead register as a paywall lead, not as UNVERIFIABLE, because
F13 is well supported by both read routes.

**One new lead:** Qin et al. (2003), *PNAS* 100, 4951–4956 — the true primary behind F15's fMRI
result, also closed access (Unpaywall `is_oa: false`). Logged.

## Confirming the retraction and the append

**The retraction is real and correctly executed, and its core is right.** The struck-through bullet is
present with the original text intact and legible, marked `[RETRACTED by C2-FP, 2026-07-19]`, with the
accurate finding stated inline. Nothing was quietly deleted. The underlying correction is **sound**:
the dossier's original assertion that no empirical literature exists on ACT-R's declarative→procedural
mechanism was false, and Taatgen & Lee (2003) alone disproves it.

**But the retraction over-corrects on one point.** It claims "**Two** direct empirical tests of the
timing of ACT-R's *actual* declarative→procedural mechanism exist," and describes F15's 650→334 ms as a
"behavioral timing signature… consistent with a declarative-to-procedural shift." Per §Resolution log
F15, that speedup is attributed by the paper to base-level *declarative* learning, not to production
compilation. Accurate count: **one** direct demonstration of the mechanism (F14, a fitted model), plus
one restated practice study whose timing result measures something else and whose neural marker the
authors decline to explain.

**The narrower residual gap is real, not face-saving.** I checked both sources for a domain-general
repetition count and neither reports one: Taatgen & Lee fit a single simulated ATC task, and Anderson
et al. report a single artificial-algebra task. "No generalizable count of how many repetitions
compilation typically requires" is an accurate statement of what remains missing, and preserving it
was the honest move.

**F1–F11 otherwise unaltered:** confirmed by textual comparison only. Every figure, quote and tier that
V2 recorded for F1–F11 still reads identically in the current dossier, including the specific values V2
corrected (Ma Table 1, Anderson's "two major stages," the F5 elision). The struck-through coverage-gap
bullet is the only visible edit. **Limitation stated plainly:** the shared brief forbids running git, so
this is a content check against V2's record, not a diff. I cannot rule out an edit to F1–F11 text that
V2 never quoted.

## Conflicts surfaced during verification

1. **The dossier headlines the fragile moderator and omits the robust one.** Steenbergen-Hu & Cooper's
   Table 2 contains a moderator that is significant under **both** fixed-effect *and* random-effects
   models — **report type**: peer-reviewed journal g = **.28** (k=10) vs. nonjournal g = **.02** (k=16),
   Qb(1) = 24.45, p = .000 fixed / Qb(1) = 10.03, p = .002 random. Sample size runs the same way
   (< 200: g = .27; > 200: g = .04). The low-achiever moderator the dossier headlines clears only the
   fixed-effect specification. **This is the most consequential thing I found**, because report type is
   a direct, quantified, within-source explanation of *why* F1–F3 sit so far above F12–F13 — and it sits
   in a source the collector says it read in full, in the same table it quoted from.
   → appended to `registers/conflict-register.md` as **#27**.

## Dossier sufficiency (SECOND AXIS — judged independently of citation states)

**Verdict: INSUFFICIENT** — with an important qualifier: **the remedy costs zero new citations**, so the
15-citation ceiling does not block it. Every element below already sits inside a source the dossier
cites and the collector reports reading in full.

Coverage assessed against: major evidence traditions · landmark sources · opposing positions ·
every required sub-question in the card's scope.

- **Traditions/landmarks/positions now present:** the ITS meta-analytic spine (Kulik & Fletcher; Ma et
  al.; now Steenbergen-Hu & Cooper); VanLehn's interaction-granularity synthesis; the at-scale
  independent-evaluation position (Pane et al. via WWC) — previously absent, now genuinely represented;
  Anderson's original ACT theory *and* ACT-R's actual production-compilation mechanism; the full
  three-way power-law/exponential/piecewise dispute; the practice-scheduling cluster.
  **The directional bias V2 identified has been substantially fixed.** Both sides are present, and the
  conflict is registered rather than resolved by fiat. That is real progress and I want it on the record.
- **Required sub-questions:** 4 of 4 touched. Q1 and Q3 are now adequately covered. **Q1's
  *explanation* is not** (below). Q2's empirical leg is thinner than the dossier claims (F15).
- **Searches run to test for what is NOT there** (WebSearch budget for this session was exhausted, so I
  ran these through the OpenAlex, Semantic Scholar, Crossref and Unpaywall APIs directly — a route that
  returns bibliographic records rather than a model's summary of them, which for coverage testing is
  the stronger instrument, though it does not reach the grey/report literature a web crawl would):
  1. OpenAlex `intelligent tutoring systems meta-analysis publication bias`
  2. OpenAlex `production compilation ACT-R skill acquisition empirical`
  3. OpenAlex `Evans Brown Mewhort Heathcote refining the law of practice` → **confirms Evans et al.
     (2018), *Psychological Review*, 61 citations, still absent**. V2 scoped this out as optional and
     C2-FP correctly did not pursue it; recording it as a known, declared, low-stakes omission, **not**
     as grounds for insufficiency.
  4. OpenAlex `Qin predicting practice effects BOLD function fMRI symbolic manipulation task`
  5. Crossref bibliographic query on the same → **located Qin et al. (2003), PNAS 100, 4951–4956**, the
     true primary behind F15. This search is what exposed the F15 provenance problem.
  6. OpenAlex `Anderson Fincham acquisition of procedural skills from examples transition declarative`
  7. OpenAlex `education technology interventions evidence review Escueta Quan Nickow Oreopoulos`
  8. OpenAlex `computer assisted instruction mathematics meta-analysis effect size K-12`
  9. Semantic Scholar `retrieval practice testing effect meta-analysis` → confirms a large live
     tradition still absent; V2 explicitly scoped this out pending a check of C3/C5. Not counted against.
  10. Unpaywall + Semantic Scholar on DOI 10.3102/0162373713507480 (Pane access-claim test) and
      Unpaywall on DOI 10.1073/pnas.0431053100 (Qin access test).

  Searches 1, 2, 6, 7 and 8 surfaced **no** landmark the enlarged dossier misses on Q1 or Q2 — a
  markedly different result from V2's 75% gap-hit rate, and the reason I regard the Bundle A/B
  collection itself as successful. One untouched tradition worth naming without weighting heavily:
  technology-supported personalised learning in low- and middle-income countries (e.g. *BJET* 2021
  meta-analysis, 218 citations). It is a distinct evaluation regime, but it is not obviously
  directional and I would not spend the ceiling on it.

### The insufficiency

**1. What important evidence appears missing**

The card asks whether the enlarged dossier lets a reader **tell why the two sides differ**, or merely
appends pessimistic numbers alongside optimistic ones. It is closer to the latter, and the missing
piece is not a missing source — it is **unextracted content in a source already cited**:

- **Steenbergen-Hu & Cooper (2013), Table 2, the `Report type` and `Sample size` moderators.**
  Peer-reviewed journal g = .28 vs. nonjournal g = .02 (significant under *both* models); studies
  under n=200 g = .27 vs. over n=200 g = .04. The dossier extracted the achievement-level moderator
  from this table and left these beside it.
- **Steenbergen-Hu & Cooper's own publication-bias analysis** (Duval & Tweedie trim-and-fill, p.976),
  likewise present in the source and unextracted.
- **The low-achiever subgroup's constituent effect sizes** (Table 1): Plano et al. −0.66
  quasi-experimental vs. Smith −0.07 true experimental.
- **WWC's overall rating of Cognitive Tutor Algebra I**, which the dossier omits while quoting the
  Pane-specific verdict: across five studies the WWC finds **"mixed effects, with a medium to large
  extent of evidence"** — one statistically significant positive (Wolfson), one substantively
  important positive (Ritter), three indeterminate. A reader of F13 alone would reasonably infer the
  independent reviewer found the product ineffective. It did not; it found the *flagship trial*
  indeterminate within a mixed overall picture.

**2. Why the omission could materially affect the findings**

Three distinct conclusions move.

- **The Q1 conflict changes shape.** As it stands, the dossier's implied explanation for the F1–F3 vs.
  F12–F13 divergence is "who ran the evaluation, and at what scale" — a narrative axis with no number
  attached. The report-type moderator supplies the actual quantified mechanism, from inside the
  evidence, and it is **more robust than anything the dossier currently headlines** (it is one of only
  two moderators in that table clearing a random-effects specification). The defensible conclusion
  moves from "effects attenuate at scale" to the sharper and better-evidenced "**measured ITS effect
  size tracks report type and study size; the peer-reviewed literature is systematically higher than
  the unpublished evaluation literature by roughly a quarter of a standard deviation**." For a product
  deciding how much to trust published effect sizes, that is the more actionable finding, and it is the
  one currently absent.
- **A fragile negative finding will travel as a solid one.** "ITS produce a significant negative effect
  for low achievers, g = −.42" is exactly the kind of striking, quotable, counterintuitive result that
  gets carried downstream stripped of its caveats. On the source's own tables it is k=2, dominated by
  one quasi-experimental study, null under random effects, and contradicted by the only true
  experimental study in its own subgroup. The dossier records the model caveat but not the k=2, not the
  constituent studies, and not the random-effects point estimates — so a later reader has no way to
  discover the fragility without re-opening the paper. Direction of movement: **this finding should
  carry substantially less weight than the dossier currently allows.**
- **Q2's empirical support is thinner than stated.** With F15 downgraded, the dossier's evidence that
  ACT-R's declarative→procedural mechanism has been empirically tested reduces to one fitted model of
  one simulated task. That is enough to retract "no such literature exists"; it is **not** enough to
  support a product decision that assumes a known proceduralization timeline.

**3. Exact scope of the one focused pass that would fix it**

**Zero new citations. No new collection. A re-extraction pass over sources already in the dossier**,
bounded to four items:

- From **Steenbergen-Hu & Cooper (2013)** (already cited, already read in full): extract Table 2's
  `Report type` and `Sample size` moderator rows with both model specifications; extract the
  trim-and-fill publication-bias result (p.976); extract the three low-achiever effect sizes and
  designs from Table 1; add the random-effects point estimates and CIs to F12's caveats.
- From the **WWC report** (already cited, already read): add the domain-level rating sentence — "mixed
  effects, with a medium to large extent of evidence" — to F13's caveats so the Pane verdict is not
  read as the WWC's verdict on the product.
- Correct **F15's Access field** to disclose it as a first-party secondary route to Qin et al. (2003),
  matching the disclosure standard the dossier already applies to F1 and F6, and correct the mechanism
  claim per the resolution log.
- Amend the **retraction** from "two direct empirical tests" to one, keeping the retraction itself.

If a governance rule requires the fifth-through-Nth item to be counted as citations, note that the
first two are re-extractions from sources already counted in the 15, and the second two are
corrections to existing entries. **The 15-citation ceiling is not what stands in the way here** —
which is worth saying explicitly, because the card anticipated that it might be.

## Verifier summary
- VERIFIED: **4**  |  UNVERIFIABLE: **0**  |  DROPPED: **0**   *(F12–F15 only; F1–F11 stand on V2)*
- **UNVERIFIED remaining: 0**
- **Dossier sufficiency (F1–F15): INSUFFICIENT** — remediable **without** new citations.
- **Strength downgrades applied:** **F12** (material — k is 2 not 3 for the −.42; the figure rests on
  one quasi-experimental study; random-effects point estimates and CIs omitted; "significant negative
  effect" overstated). **F15** (material — the fMRI study is Qin et al. 2003, not this paper's own work;
  the 650→334 ms speedup is attributed by the authors to base-level *declarative* learning, not to the
  declarative→procedural transition; tier corrected Q3 → Q4). **F14** (minor — "Anderson explicitly
  abandoned it" is Taatgen & Lee's characterisation citing Anderson & Lebiere 1998, not Anderson's own
  words read directly; and Anderson et al. 2004 describes production compilation as "basically a
  combination of composition and proceduralization as described in Anderson (1983) for ACT*", i.e. the
  ACT*→ACT-R relationship is more *continuous* than "abandoned" implies — F4 and F14 are closer to
  supersession-by-refinement than to contradiction).
- **Claims confirmed exactly as the collector stated them:** F13 in full (every figure, n, p-value and
  quote); F14's published-version-not-preprint claim; the Pane et al. paywall claim; the accuracy and
  auditability of the retraction's execution.
- **Supporting locations differing from the collector's proposal:** **F15** — the collector proposed
  Anderson et al. (2004) pp.1053–57 as the location of the fMRI study. The study's actual location is
  **Qin et al. (2003), *PNAS* 100, 4951–4956**; those pages of Anderson et al. are a restatement of it.
  **F12** — the collector proposed p.978–979 for the moderator analysis; the load-bearing locations are
  **Table 2** (unadjusted, k=2) and **Table 3** (adjusted, k=3) as distinct tables with different k, a
  distinction the single page-range citation conceals, plus **Table 1** for the constituent studies.
- **Reader-facing structural note (not a verification result):** F12 points back to F1–F3 ("in direct
  tension with…"), but F1–F3 carry no forward pointer to F12–F15, and the additions sit in a separate
  section below the coverage gaps. A reader working top-down meets the optimistic picture first with no
  signal that it is contested. This is an artifact of the correct rule forbidding edits to F1–F11, not
  a collector failure — but whoever synthesises this card should know the dossier does not read
  even-handedly in document order.
