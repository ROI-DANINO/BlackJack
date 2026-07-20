# Verification Record: C5b — C5 focused-pass additions (F12–F15) + whole-dossier sufficiency re-judge

> Verifier: Claude (Opus 4.8) — INDEPENDENT of the collector, of V5, and of the C5-FP top-up collector  |  Date: 2026-07-19
> Contract: exists + supports + strength-honest. VERIFIED requires an exact supporting location.
> Every source is INDEPENDENTLY located by the verifier — no collector-supplied quote is trusted.
> **Scope: Part 1 covers F12–F15 ONLY.** F1–F11 stand on V5's pass and were not re-verified.

**Method note (independence + the flagged tooling hazard).** All four PDFs were downloaded with
`curl` and text extracted **locally with `pdftotext`** (both `-layout` and flow mode), then each
claimed quote was matched with `grep -F` against the local text. I never relied on a fetch summary,
so the "quotes while claiming it cannot extract" hazard cannot apply: I either matched a literal
string in a local file or I did not.

Two mechanical hazards worth recording, both resolved:

1. **F13 was silently truncated on download — twice.** `home.cs.colorado.edu` serves an incomplete
   certificate chain (curl exit 60 / `unable to verify the first certificate`, which also defeated
   WebFetch). With verification relaxed, two successive fetches returned **different sizes and
   different md5sums** (1,287,873 B / 871,873 B), no `%%EOF`, and `pdftotext` failed with
   `Couldn't read xref table`. A partial extraction of that corrupt file would have been exactly the
   kind of half-read the brief warns about. Resolved by forcing `--http1.1 --retry 5 -C -`, which
   produced a complete 1,438,314 B file terminating in `%%EOF` and extracting cleanly. **Only the
   complete file was used.**
2. Two quotes initially failed `grep -F` on **character encoding**, not content: `chapter’s`
   (typographic apostrophe) in F13 and `4–13 points` (en dash) in F14. Both matched verbatim once
   the correct characters were used. The dossier renders both correctly; the fault was my ASCII
   grep. Recorded so the misses are not mistaken for real ones.

| # | Claim | Source (id / title / URL·DOI) | Indep. located? | Exists | Supports | Strength honest | State | Supporting location (VERIFIED only) | Quality tier | Notes / downgrade |
|---|---|---|---|---|---|---|---|---|---|---|
| F12 | A peer-reviewed, non-Anki-affiliated ACT-R scheduler beat both an independent 1972 algorithm and a flashcard control | Pavlik & Anderson (2008), *J. Exp. Psych.: Applied* 14(2), 101–117 · DOI 10.1037/1076-898X.14.2.101 · act-r.psy.cmu.edu/…/791xap-14-2-101.pdf | Yes — PDF downloaded, `pdftotext`, 17pp | ✔ | ✔ | ✔ | **VERIFIED** | **Masthead** (journal, vol/issue/pages, DOI, "Philip I. Pavlik, Jr. and John R. Anderson, Carnegie Mellon University"); **"The Experiment"** ("60 participants learned a set of 180 Japanese-English vocabulary words"); **conditions paragraph** ("The first condition tested a new method of scheduling based on an extended ACT-R model"; "The second condition was a replication of Atkinson (1972b)"; "The third condition consisted of a flashcard procedure"); **"Results and Discussion"** ("these effects were significant for Session 4 recall and latency, F(2, 57) = 5.4, p = .0073 and, F(2, 57) = 10.3, p = .00015"); **same section** ("a Cohen's-d effect size of 0.796 SD compared to the Atkinson control and 0.978 SD compared to the flashcard control. For latency … 1.17 SD … and 1.31 SD"); **Discussion, paragraph immediately preceding the "Implementation" subhead** (the generalisation caveat) | Q2 | **Every figure verbatim.** Design, conditions and all four effect sizes confirmed exactly as the dossier reports. Caveat confirmed as the authors' own words — see the caveat note below the table. |
| F13 | Semester-long classroom study: personalised spaced scheduler beat massed by 16.5% (d=1.42) and generic-spaced by 10.0% (d=0.88) | Lindsey, Shroyer, Pashler & Mozer (2014), *Psychological Science* 25(3), 639–647 · DOI 10.1177/0956797613504302 · home.cs.colorado.edu/~mozer/…/LindseyShroyerPashlerMozer2014.pdf | Yes — PDF downloaded (after the truncation fix above), `pdftotext`, 8pp | ✔ | ✔ | **✘ → downgraded** | **VERIFIED (strength downgraded)** | **"Participants"** ("Participants were eighth graders (median age 13) at a suburban Denver middle school. A total of 179 students—82 males and 97 females—…third-semester Spanish course"); same section ("The end-ofsemester cumulative exam was taken by 172 students; the followup exam four weeks later was taken by 176 students"); **Method** ("The scheduler was varied within participant by randomly assigning one third of a chapter's items to each scheduler, counterbalanced across participants"); **Method** ("cumulative exams were administered … one at the semester's end and one 28 days later"); **Results** ("On the first exam … 12.4% … d = 1.38 … 8.3% … d = 1.05"); **Results** ("On the second exam, personalized review boosted retention by 16.5% over massed review (t(175) = 11.1, p < .0001, d = 1.42) and by 10.0% over generic review (t(175) = 6.59, p < .0001, d = 0.88)"); **Discussion → "Personalization"** (the confound admission) | Q2 | **All six figures and both comparisons verbatim; retention interval confirmed (28 days).** Downgraded for an **omitted author-acknowledged confound** the dossier does not carry — see Resolution log. **Provenance note (differs from collector):** this file is the authors' self-archived accepted manuscript (its first page is a citation banner, not the journal's typeset page), not the version of record — the same distinction V5 drew for F2. |
| F14 | 2026 systematic review: Anki use *associated* with higher Step 1/CBSE scores; review states its base is observational and non-causal | Frappa, Chernov, Dillon & Alben (2026), *Medical Science Educator* 36, 1015–1025 · DOI 10.1007/s40670-026-02643-5 | Yes — open-access CC-BY PDF, `pdftotext`, 19pp | ✔ | ✔ | ✔ | **VERIFIED** | **Masthead** (journal/vol/pages/DOI; "Received: 2 November 2025 / Accepted: 4 January 2026"); **Abstract → Methods** ("Eleven eligible studies were qualitatively synthesized"); **Abstract → Results** ("High-frequency users outperformed minimal users by 4–13 points, with one study identifying a dose-response effect"; "Only one study assessed Step 2 CK and found no significant benefit"); **Limitations** ("the majority of included studies were observational or quasiexperimental, and none employed randomized designs"; "introducing risk of selection bias and limiting causal inference"; "Confounding and self-selection bias are important considerations across the included studies, as students were not randomly assigned to Anki use"; "residual confounding cannot be excluded, and causality cannot be inferred"); **Conclusion** ("As the existing evidence base is predominantly observational, these findings should not be interpreted as causal, nor as evidence that Anki represents an optimal or sufficient study strategy in isolation") | Q3 | **All five limitation quotes verbatim, including the full non-causal sentence.** Q3 tier is correct and the reasoning for it is sound — see the strength-honesty audit below. Wording is associational throughout ("associated with"); **no causal drift found.** |
| F15 | Non-randomised cohort: 78 Anki users vs 52 non-users; +12.9% CBSE (p=.003); authors concede an unresolved motivation confound | Gilbert, Frommeyer, Brittain, Stewart, Turner, Stolfi & Parmelee (2023), *Medical Science Educator* 33(4), 955–962 · DOI 10.1007/s40670-023-01826-8 | Yes — open-access CC-BY PDF, `pdftotext`, 15pp | ✔ | ✔ | ✔ | **VERIFIED** | **Masthead** (journal/vol/pages/DOI, "Accepted: 16 June 2023"); **Abstract/Methods** ("One hundred thirty first-year medical students were enrolled in an Anki utilization training program from July 2021 to September 2021"; "Seventy-eight students reported using Anki for at least one of the exams, and 52 students did not use Anki for any exam"); **Results** ("Anki users scored significantly higher across all four exams: Course I (6.4%; p < 0.001); Course II (6.2%; p = 0.002); Course III (7.0%; p = 0.002); and CBSE (12.9%; p = 0.003)"); **Discussion → Limitations** ("Another limitation was the lack of randomization … our findings could be a result of more motivated students using additional resources and spending more time studying, whether using Anki or not. We attempted to control for this using MCAT scores, but this confounder still exists") | Q3 | **Every figure and the full confound admission verbatim.** Q3 tier correct. Wording is comparative, not causal ("scored significantly higher", "gap"); **no causal drift found.** The dossier's note that this is the primary behind F14's +12.9% CBSE figure is **independently confirmed** — F14 cites it as ref [27] and reports "+ 12.9%, p = 0.003" — and the dossier correctly declines to double-count it as independent corroboration. |

### F12's caveat — the card's specific ask, checked closely

The card asked me to confirm the generalisation caveat is the **authors' own** and is carried at full
strength. Both hold, with one nuance the dossier should not be read past.

Verbatim, from the Discussion: *"However, creating a model is clearly not trivial even for relatively
simple domains such as the fact memorization we investigated. For more complex domains with multiple
grain sizes (some items contain more information than others), dependencies (some items depend on
other items) and transfer effects (learning some items transfers to other items) the modeling must
take on additional complexity to produce an accurate model and enable the method. At the current
time, it is unclear how issues such as these can be modeled, but it is clear that if they are not
included in a model when they are strong effects then the method cannot be expected to work
properly."*

- **It is the authors' own text**, in their Discussion, not a verifier's or collector's gloss. ✔
- **The dossier carries it in the Caveats field and quotes it accurately**, with ellipses that elide
  only the parenthetical glosses. It is not buried. ✔
- **Nuance:** the authors' "transfer effects" means *inter-item* transfer within a learning set
  ("learning some items transfers to other items"), not transfer-of-training to a different task.
  And the caveat is about the difficulty of **building an accurate model** for such domains, not a
  claim that spacing fails there. The dossier's rendering — "the paper does not claim this result
  generalizes to complex procedural/decision domains like blackjack basic strategy" — is a **modest
  and defensible** reading that does not overreach. A stronger reading (that the authors positively
  predict failure on decision rules) would overreach, and the dossier does not make one.

### Strength-honesty audit of F14/F15 — the card's flagged high-risk pair

The card flagged these as the classic setup for a correct sentence carrying an unearned causal
implication. I read both sources' conclusions, not only their quoted sentences, and checked the
dossier's own wording for drift. **I found no causal drift in either.** Specifically:

- Both finding headlines use associational verbs ("associated with", "scored significantly higher
  than"), never causal ones. Neither says Anki *improves*, *causes*, or *produces* anything.
- Both headlines put the self-limitation in the headline itself, joined by "but" — the caveat is not
  demoted to a footnote.
- Both are tiered **Q3**, and F14's Q3 is the non-obvious correct call: it is formally a *systematic
  review* (rubric Q1), but every included primary study is non-randomised. Tiering the synthesis by
  its method rather than by what generates its numbers would have been the standard way to smuggle in
  unearned strength. The dossier explicitly reasons this out and declines to do it. That is the
  rubric's "downgrade tier if the source is weaker than the citing claim implies, and note it,"
  applied correctly.
- F14's status-bucket field reads "Q3 observational — explicitly NOT Evidence-backed as a causal
  claim" and F15's similarly. **Minor taxonomy irregularity:** the bucket field carries a tier label
  rather than one of the four buckets (Evidence-backed / Product judgement / Assumption /
  Unsupported). The accompanying prose is unambiguous, so this is a formatting nit, not a strength
  problem — but a downstream reader filtering on bucket names will not match these rows.

**Verdict on the flagged risk: the dossier does not commit the error it was warned about.** These two
findings are, if anything, the most carefully hedged in the card.

### One figure in the dispatch brief that does not match the source (the dossier is not at fault)

My dispatch described F12 as reporting "omnibus p<.001". The source reports **two** omnibus tests:
recall F(2,57)=5.4, **p=.0073** and latency F(2,57)=10.3, p=.00015. Only the latency test is p<.001.
**The dossier quotes both correctly**; the loose paraphrase is the dispatch's, not the collector's.
Recorded so the discrepancy is not later attributed to the dossier.

## Resolution log (every citation that was UNVERIFIED at any point)

| # | Which point failed (exists / supports / strength) | Move taken (re-check · downgrade · drop) | Terminal state | Note |
|---|---|---|---|---|
| F13 | **strength** — every figure is exact, but the dossier omits a self-limitation the authors state explicitly, and that limitation bears on the finding's own headline attribution | **(b) downgrade**, then re-verified the weakened claim | **VERIFIED (downgraded)** | In the Discussion's "Personalization" subsection the authors write: **"We acknowledge that our design confounds personalization and the coarse temporal distribution of review (Figure 1, Table 1)."** The dossier's caveats carry only the *massed-comparator* qualification ("'massed' review is spaced by usual laboratory standards" — which I confirmed verbatim) and not this one. The distinction matters: the **massed** comparison (16.5%, d=1.42) is unaffected, but the **personalised-vs-generic-spaced** comparison (10.0%, d=0.88) cannot cleanly isolate *personalisation* as the active ingredient, because the two schedules also differed in temporal distribution. Downgraded claim, re-verified: *a personalised model-based scheduler outperformed both massed and generic-spaced review on a 28-day-delayed cumulative exam; the margin over generic spacing is not cleanly attributable to personalisation per se, as the authors acknowledge their design confounds personalisation with temporal distribution.* **The corrected coverage-gap sentence this finding grounds ("model-based scheduling beats naive/massed review") survives the downgrade intact** — it rests on the massed comparison. |
| F12 | — | none needed | **VERIFIED** | No point failed. |
| F14 | — | none needed | **VERIFIED** | No point failed. |
| F15 | — | none needed | **VERIFIED** | No point failed. |

**No citation was left UNVERIFIED. No citation required quarantine. No citation was dropped.**

## Kills (citations dropped — the claim lost this support)

- **None.** All four additions survive. F13 carries a strength downgrade, not a kill.

## Quarantine (UNVERIFIABLE — could not be reached at all)

- **None.** All four sources resolved and were read in full locally.

## Verification of the permitted in-place correction

The pass was allowed exactly one edit to pre-existing text. I checked it against both halves it
asserts.

- **Half 1 — "peer-reviewed, non-vendor scheduling research exists."** **TRUE.** F12 is a controlled
  experiment in *J. Exp. Psych.: Applied* testing a model-based scheduler against Atkinson (1972b)
  and a flashcard control; F13 is a *Psychological Science* classroom study of a personalised
  scheduler. Neither has any Anki/SuperMemo/FSRS affiliation. The original sentence — "All
  scheduling-algorithm evidence found in this pass originates from the tool's own maintainers" — was
  indeed false as a description of the field.
- **Half 2 — "the specific SM-2-vs-FSRS comparison remains self-evaluated by the tool's own
  maintainers."** **TRUE, and the correction is right to preserve it.** I confirmed neither F12 nor
  F13 names, tests, or benchmarks SM-2 or FSRS. F12's comparator is Atkinson (1972b), a 1972 Markov
  model; F13's comparators are a generic fixed schedule and massed review. My own search for an
  independent evaluation of FSRS-vs-SM-2 (below) surfaced none.
- **Did it overshoot into dissolving an asymmetry that still partly holds?** **No.** The correction
  states the asymmetry is *narrowed, not eliminated* ("it narrows rather than eliminates the F7/F8
  asymmetry"; "Both halves are true; neither should be cited without the other"). That is exactly the
  right calibration — it neither defends the false sentence nor over-corrects into "the asymmetry was
  imaginary." **Confirmed accurate on both halves.**
- **F1–F11 otherwise unaltered:** confirmed by reading the current dossier against V5's record —
  every quote, tier, bucket and caveat V5 verified is still present and unchanged, and the correction
  is confined to the marked bracket in Coverage gaps. **One bookkeeping edit beyond the correction:**
  the header's citation-count line was updated (11 → "+ 4 … = 15 total"). That is front-matter
  metadata, not a finding/quote/tier, and it was necessary to keep the header truthful; noted only
  for completeness, not as a breach.

## Conflicts surfaced during verification

- **None new.** F13's personalisation/temporal-distribution confound is a within-source limitation
  recorded as a strength downgrade above, not a disagreement between two sources, so it does not
  warrant a conflict-register row. Conflicts #10, #11 and #5 from earlier passes are untouched by
  this pass.

## Dossier sufficiency (SECOND AXIS — judged independently of citation states)

**Verdict: INSUFFICIENT — and, per my card, NOT FIXABLE under the program's current 15-citation
ceiling. What to do about that constraint is not my decision.**

This verdict should not be read as criticism of the top-up. The focused pass did precisely what V5
scoped it to do, did it accurately, and its four citations verify cleanly. Both gaps V5 named as
Bundle A and Bundle B are genuinely closed. The insufficiency that remains is a different and
narrower thing, and part of it is a constraint artefact rather than a collector failure.

- **Traditions/landmarks/positions now present:** verbal-recall spacing meta-analysis (Cepeda 2006,
  2008); applied/organisational distribution-of-practice meta-analysis (Donovan & Radosevich);
  desirable-difficulties/metacognition (Kornell & Bjork, Verkoeijen); interleaving (Taylor & Rohrer);
  testing effect (Roediger & Karpicke); health-professions spaced-education review (Martinengo 2024);
  first-party SuperMemo/FSRS self-reports (SM-2, Twenty Rules, Expertium); **and now, newly, the
  academic adaptive-scheduling tradition (Pavlik & Anderson 2008; Lindsey et al. 2014) and the
  empirical Anki-user literature (Frappa et al. 2026; Gilbert et al. 2023).**
- **Required sub-questions answered: 3.5 of 4, but the half has moved.** Q1 answered well. **Q2 is
  now answered properly on both sides** — the asymmetry framing that V5 found "wrong as stated" is
  corrected and now accurate. **Q3 is materially improved and no longer vendor-only** (see below).
  Q4 remains an honestly-argued gap, and I did not find a counterexample either.
- **Searches I ran to test for what is NOT there** (WebSearch budget for this session was exhausted,
  so I queried literature APIs directly — Europe PMC REST, OpenAlex, Crossref, Semantic Scholar
  Graph — which is a stronger check than keyword search for existence/venue/citation-count):
  1. Europe PMC: `spaced retrieval practice "decision rule" learning retention`
  2. Europe PMC: `spaced practice "if-then" rule application transfer procedural decision training`
  3. Europe PMC: `blackjack basic strategy training learning`
  4. Europe PMC: `spaced repetition flashcard "card counting" OR blackjack OR poker skill acquisition`
  5. OpenAlex: `spacing effect procedural skill decision rule application retention`
  6. OpenAlex: `spaced repetition strategy game expert decision making training transfer`
  7. OpenAlex: `independent evaluation FSRS spaced repetition scheduler comparison SM-2`
  8. OpenAlex: `adaptive scheduling algorithm spaced repetition half-life regression language learning`
  9. OpenAlex: `contextual interference meta-analysis motor learning retention 2024`
  10. OpenAlex: `desirable difficulties spacing categorization decision making expertise training meta-analysis`
  11. OpenAlex + Crossref + Semantic Scholar: targeted existence/venue checks on two suspected
      landmark omissions (below), and OA-location lookups for both.

**On the three things my card asked me to judge:**

1. **The sub-Q4 gap stands, and F12 now strengthens it — but the dossier does not connect the two.**
   Searches 1–6 surfaced no study testing spacing on a blackjack-shaped decision rule; the nearest
   hits were a Spanish-vocabulary tutor, distributed mathematics practice (Barzagar Nazari & Ebersbach
   2018), and an emergency-medicine procedural-knowledge course. Search 3 returned 19 hits, none a
   training study (the closest, Front Psychol 2023, is about *unjustified confidence* in blackjack
   strategy, not about training it). **I therefore confirm V5's finding independently and do not
   re-penalise the gap.** However — the card asked whether the dossier connects F12's caveat to
   sub-Q4, and **it does not.** F12's caveat lives only in F12's own Caveats field; the sub-Q4
   coverage-gap section still lists only Taylor & Rohrer, Kornell & Bjork and Martinengo as its
   nearest analogues, and never cites the fact that a scheduling paper's own authors flag
   dependency/transfer domains as unresolved. That is a **missed cross-reference, not a missing
   source** — it costs the dossier nothing in evidence and would cost one sentence to fix. I record
   it as a synthesis note, not as a basis for the verdict.
2. **The CI omission is honestly handled — and I still count it toward insufficiency, for a reason
   the shared brief distinguishes.** The brief's rule is that a gap the collector *searched for and
   honestly reported absent* is thoroughness. The CI pair is not that: it is a **known, existing,
   directly-relevant body that was located, registered as rows #24/#25, and then not collected because
   the ceiling was spent.** The pass's disclosure of this is exemplary — it names the constraint,
   refuses to pretend the omission was a judgement call, and instructs the next pass to take both
   sources or neither so the dispute is not silently half-resolved. I confirmed the pair is real and
   live: OpenAlex returns Kim et al. (2024), "High contextual interference improves retention in motor
   learning: systematic review and meta-analysis," **and** a 2024 "Comment on Czyż et al. (2024) on
   Contextual Interference in Motor Learning," i.e. an active dispute. It bears directly on F4, which
   V5 downgraded from spacing evidence to **interleaving** evidence — leaving one of the dossier's two
   closest-to-a-decision-rule sources governed by a literature the dossier does not cite. **Honest
   handling; still a material gap.** Both facts are true at once.
3. **The Anki sub-question is now adequately answered, and no longer leans on first-party essays.**
   This is a real improvement and should be credited. Sub-Q3 previously rested entirely on Wozniak
   (F9, F11). It now has an empirical layer (F14, F15) that is **correctly labelled as correlational
   and non-causal** rather than being used to upgrade the vendor claims. Note what this does *not*
   do: F14/F15 measure Anki *use* against *exam scores*; neither isolates any specific Anki design
   assumption. So F9's "minimum information principle" and F11's self-graded-difficulty assumption
   remain **exactly as unvalidated as before** — the new evidence sits alongside them, not under
   them. The dossier does not claim otherwise. Sub-Q3: answered.

### If INSUFFICIENT (all three required)

**1. What important evidence appears missing**

- **(A) Two landmark spacing reviews that no pass and no verifier has yet named.** These are my own
  finding, not carried over from V5, and they are the reason this verdict is not simply "the CI pair
  is outstanding":
  - **Latimier, A., Peyre, H., & Ramus, F. (2021). "A Meta-Analytic Review of the Benefit of Spacing
    out Retrieval Practice Episodes on Retention." *Educational Psychology Review*, 33, 959–987. DOI
    10.1007/s10648-020-09572-8.** Existence, venue and year confirmed via OpenAlex, Crossref and
    Semantic Scholar; ~96 citations. **I could not read it** — closed access, no OA location in
    OpenAlex, no abstract in Crossref/Semantic Scholar/Europe PMC, Springer gated behind an IdP
    redirect. I therefore assert only what its title, venue and standing establish, and characterise
    its *relevance* rather than its findings.
  - **Carpenter, S.K., Cepeda, N.J., Rohrer, D., Kang, S.H.K., & Pashler, H. (2012). "Using Spacing
    to Enhance Diverse Forms of Learning: Review of Recent Research and Implications for
    Instruction." *Educational Psychology Review*, 24, 369–378. DOI 10.1007/s10648-012-9205-z.**
    Same confirmation route; ~474 citations. Same access limitation — **not read.**
- **(B) The contextual-interference pair**, already registered as source-lead rows #24/#25 and fully
  disclosed by the pass. Not re-argued here; see point 2 above.
- **(C) Settles & Meeder (2016), "A Trainable Spaced Repetition Model for Language Learning," ACL** —
  named by V5 in Bundle A, not collected (the pass took Pavlik and Lindsey instead). Existence
  confirmed via OpenAlex (~201 citations). **I judge this the *least* material of the three** and do
  not rest the verdict on it: the academic-scheduling tradition is now represented by two
  independent, peer-reviewed sources, and a third would corroborate rather than move the conclusion.
  Recorded for completeness, not as a demand.

**2. Why the omission could materially affect the findings**

- **(A) goes to the dossier's two weakest structural joints, both of which are load-bearing.**
  - The dossier's *most* load-bearing caution — F3, that spacing's benefit shrinks as task complexity
    rises — rests on a **1999** meta-analysis that V5 already had to downgrade for directional
    overstatement. A 2021 meta-analysis of spaced retrieval practice is the obvious modern check on
    whether that 25-year-old moderation still holds as stated. It could move F3's strength in
    **either** direction, and F3 is the finding the dossier itself calls its most load-bearing.
  - Carpenter et al. (2012) is, on its title and standing, the landmark treatment of spacing beyond
    simple verbal recall — which is *precisely* the question sub-Q4 asks. The dossier currently
    argues "the evidence base is declarative-only" from Cepeda 2006's inclusion criterion (correctly,
    for that source) without engaging the review whose stated remit is the generalisation question.
    A competent domain reviewer would expect it cited. Its absence does not make the sub-Q4 gap
    *wrong* — I searched and, like V5, found no decision-rule study — but it means the gap is argued
    without the review most directly addressed to it.
  - Both also bridge F1 (spacing) and F10 (testing effect), which the dossier currently treats as
    cleanly separable claims. Latimier's subject is *spaced retrieval practice* — the conjunction of
    the two — which is what Anki actually is. That bears on whether the dossier's separability claim
    survives.
- **(B)** as V5 argued and the pass conceded: CI's applied-setting attenuation would strengthen the
  sub-Q4 caution, while its interleaving-benefit findings would qualify it. With F4 downgraded to
  interleaving evidence, this is the literature that governs the dossier's closest analogue.
- **Direction of the likely movement, stated plainly:** I do **not** expect any of this to overturn
  the sub-Q4 gap — two independent searches have now failed to find a decision-rule spacing study.
  I expect it to change **how confidently the surrounding generalisation claims are stated**, which
  matters here because sub-Q4 is the card's declared highest-value output and its credibility rests
  on the framing around it being current.

**3. Exact scope of the one focused collection pass — and why it cannot be run**

Bounded scope, **4 citations**, no re-run of the card:
- **2 on contextual interference** — Kim et al. (2024), *Scientific Reports*, and the *Educational
  Psychology Review* (2024) critical multilevel meta-analysis, **collected as a matched pair** (rows
  #24/#25) so the dispute registers as a conflict rather than being half-resolved.
- **2 landmark spacing reviews** — Latimier et al. (2021) and Carpenter et al. (2012). Both are
  **closed access**; whoever collects them will need institutional access or an author copy, and
  should record honestly if they cannot be read rather than citing them from abstract alone.

Explicitly **out of scope**: re-collecting anything in F1–F15; Settles & Meeder (2016); and the
Moulton (2006) overflow lead.

**The blocking constraint, stated plainly as my card instructs.** The dossier is at **15/15, the
program's hard ceiling**, and its own header states no further citations may be added without
reopening the card. **This pass cannot be run under current rules.** The remaining insufficiency is
therefore not a defect the collector can repair — it is the ceiling binding against the topic's real
evidence surface. I record the scope so it is ready if the ceiling is lifted or the card is reopened,
and I note that a 4-citation pass would take the card to 19. **Whether to lift the ceiling, reopen
the card, or accept the dossier as-is with this gap documented is a program decision, not mine.**

## Verifier summary
- VERIFIED: **4**  |  UNVERIFIABLE: **0**  |  DROPPED: **0**
- **UNVERIFIED remaining: 0** — every citation in scope is terminal.
- **Dossier sufficiency: INSUFFICIENT**, and **not fixable under the 15-citation ceiling**.
- Claims the collector overstated (strength downgraded):
  1. **F13** — omits the authors' own "our design confounds personalization and the coarse temporal
     distribution of review." All figures exact; the *personalised-vs-generic* margin is not cleanly
     attributable to personalisation. The massed comparison, which grounds the in-place correction,
     is unaffected.
  - No other downgrades. **F12, F14 and F15 are strength-honest as written.**
- **The flagged high-risk pair (F14, F15) came through clean.** Both are associational in wording,
  both carry their self-limitation in the headline, both are correctly tiered Q3 — including the
  non-obvious call to tier a *systematic review* as Q3 because all its primary studies are
  non-randomised. I looked specifically for unearned causal implication and did not find it.
- **The permitted correction is accurate on both halves and does not overshoot.** F1–F11 are
  otherwise unaltered.
- Supporting locations that differed from the collector's: **F13** — provenance is the self-archived
  accepted manuscript, not the version of record (as V5 noted for F2); and the confound admission
  sits in **Discussion → "Personalization"**, a location the dossier does not cite at all.
- Synthesis note (not a verdict basis): the dossier never connects **F12's authors' own
  dependency/transfer caveat** to its **sub-Q4 gap statement**, though the caveat is direct support
  for it. One sentence would close the loop.
- Minor taxonomy note: F14/F15 put a **tier label in the status-bucket field** rather than one of the
  four buckets. Prose is unambiguous; row-level filtering would miss them.
