# Verification Record: C1 — Knowledge Tracing (remediation pass C1-R2, findings F22–F27)

> Verifier: Claude (Opus 4.8) — independent instance; differs from the C1 collector, C1-FP, C1-R2, V1, V1b, V1c
> Date: 2026-07-20
> Contract: exists + supports + strength-honest. VERIFIED requires an exact supporting location.
> Every source was INDEPENDENTLY located by this verifier. The collector's summary was not trusted.

## Retrieval method — deliberately different from the collector's

C1-R2 stated it could not download and extract files, and asked that every F22–F26 quote be treated as
*claimed*-verbatim and re-retrieved by an independent route. That was done. This pass used
`curl` + `pdftotext -layout` + **local Python string matching against the extracted text**, plus
PubMed E-utilities and the Semantic Scholar Graph API — none of which C1-R2 used. No quote below is
fetch-mediated; every HIT/MISS is a literal substring test against a locally held file.

**The single most consequential result of this method: F22's PDF body downloaded successfully from
`https://arxiv.org/pdf/2605.18562` (HTTP 200, 641 KB, 80 KB extracted text).** The collector reported
this body as not extractable and V1c had asked for its measured figure. It is now obtained and is
recorded in full below. The collector's access failure was a tooling limit, not an absence.

| # | Claim | Source (id / title / URL·DOI) | Indep. located? | Exists | Supports | Strength honest | State | Supporting location (VERIFIED only) | Quality tier | Notes / downgrade |
|---|---|---|---|---|---|---|---|---|---|---|
| F22 | LLMs as difficulty raters, no response data; "moderate to strong" correlations | Kolesnikova, Fedyanin, Hofman, Brinkhuis & Bolsinova (2026), arXiv:2605.18562 | Yes — **full PDF obtained** | Yes | Yes | **Partly** — abstract's favourable half carried without the body's counterweight | **VERIFIED** | Abstract; §4.1 Results; Tables 2–3; §5 Limitations | Q3 (confirmed on the body) | Preprint confirmed (`arXiv:2605.18562v1 [stat.ME] 18 May 2026`). 4/5 quotes verbatim; 1 silent truncation. **Numbers now obtained — see Correction 1.** |
| F23 | Response-free difficulty via fine-tuned transformers; still trains on response-calibrated items | Netík & Martinková (2026), arXiv:2605.16991 | Yes — full PDF obtained | Yes | **Yes — crux confirmed, and stronger than claimed** | Yes | **VERIFIED** | Abstract; §2.1 "Source corpus and pseudo-labelling" | Q3 | Literally labelled "A PREPRINT". 3/4 quotes verbatim; 4th differs only by hyphenation. |
| F24 | Randomized comparison; Default arm (fixed value, no predictions) lost to every prediction arm | van der Velde, Sense, Borst & van Rijn (2021), *Comput Brain Behav* 4(2):231–249, DOI 10.1007/s42113-021-00101-6 | Yes — publisher HTML retrieved and parsed locally | Yes | Yes | **No — overstated by omission** | **VERIFIED with corrections** | §"Bayesian Prediction of Rate of Forgetting"; §"Learning Session Performance"; §"Rate of Forgetting Prediction"; Ethics declarations | Q2 (randomisation confirmed) | **Spliced quote (Correction 2); COI found (Correction 3); delayed-recall null omitted (Correction 4).** |
| F25 | Per-learner, per-item rate of forgetting from own accuracy + latency | Sense, Behrens, Meijer & van Rijn (2016), *Topics in Cognitive Science* 8(1):305–321, DOI 10.1111/tops.12183 | Yes — metadata + abstract via independent routes | Yes | Yes (abstract-scope) | Yes | **VERIFIED (abstract-scope)** — body **UNVERIFIABLE** | Abstract (verbatim via PubMed E-utilities, PMID 26748838) | Q3 | Body blocked at 3 routes (Wiley pdfdirect 403, Wiley am-pdf 403, research.rug.nl 403). Collector's paywall report confirmed. Reliability figures still unobtained. |
| F26 | Null on WMC/GCA vs rate of forgetting; default 0.3 updated online; n=66 | Sense, Meijer & van Rijn (2018), *Frontiers in Education* 3:112, DOI 10.3389/feduc.2018.00112 | Yes — full text retrieved and parsed locally | Yes | Yes | Yes | **VERIFIED** | Abstract; Methods; Results; Discussion | Q3 | **All four quotes verbatim. n=66 confirmed. Homogeneity confirmed. Cleanest finding in the pass.** |
| F27 | Pelánek 2017 UMUAI: moving-average baselines "without assumptions"; BKT ignores item difficulty; individualized params fitted on few data points; prefer simple models | Pelánek (2017), UMUAI 27(3–5):313–350, DOI 10.1007/s11257-017-9193-2 | Yes — author PDF obtained and extracted | Yes | Yes | Yes | **VERIFIED** | §5.1 + Fig. 4; §4.3.1; §5.4; §6.4; §7.1 | Q4 (correct) | **All five passages verbatim** after de-hyphenation. Fig. 4 "without assumptions" classification confirmed. Adds no new source (already F19). |

## Resolution log (every citation that was UNVERIFIED at any point)

| # | Which point failed (exists / supports / strength) | Move taken (re-check · downgrade · drop) | Terminal state | Note |
|---|---|---|---|---|
| F22 | strength — abstract-scope ceiling; body unobtained by collector | **re-check via independent route — body OBTAINED** | VERIFIED | Measured figures recovered; abstract's favourable framing must be balanced by body. See Correction 1. |
| F23 | supports — crux (does it still need a population?) untested | re-check on body | VERIFIED | Crux confirmed; population chain longer than the dossier states. |
| F24 | strength — quotes fetch-mediated; funding unchecked; counts paraphrased | re-check on full text | VERIFIED w/ corrections | One quote is a splice; COI exists; a null result was omitted. |
| F25 | exists/supports — paywalled two ways | re-check via PubMed + Semantic Scholar | VERIFIED (abstract) / body UNVERIFIABLE | Abstract quote confirmed verbatim by a route the collector did not try. |
| F26 | strength — fetch-mediated | local string match | VERIFIED | 4/4 verbatim. No defect found. |
| F27 | strength — pages read visually, not string-matched | local string match on extracted PDF | VERIFIED | 5/5 verbatim. No defect found. |

## Corrections required

### Correction 1 (F22) — the missing number is now in hand; and the abstract oversells the body

The dossier records "**no correlation value was obtained**" and the C1-R2 coverage-gap section states
"**No numeric accuracy figure for zero-response difficulty estimation exists anywhere in this dossier.**"
That is no longer true. From the retrieved PDF:

**Table 2 — Spearman correlation between LLM-based and empirical estimates** (averaged across domains and design factors):
- GPT-4o — .673 [.629, .712]
- DeepSeek Chat — .633 [.584, .675]
- Qwen 3 235B — .665 [.616, .709]

**Table 3 — best and worst configurations** (averaged across LLMs): best is Pairwise · Soft · Zero-shot
at **.732 [.687, .768]**; worst is Absolute · Hard · Zero-shot at **.486 [.430, .540]**. By domain the
spread is large: Subtraction reaches **.847**, Text Problems falls to **.252**.

**The body materially qualifies the abstract sentence the dossier quotes.** §4.1, verbatim:

> "Across models, bootstrap confidence intervals overlapped with the range of agreement reported in
> previous studies for individual human raters (Clauser et al., 2008; Cross et al., 1984; Melican et al.,
> 1989). At the same time, observed correlations were lower than those reported for pooled human
> judgements, such as the mean correlation of .70 in Attali et al. (2014), and lower than the value of
> .76 reported by Yancey et al. (2024) for automated estimation of newly generated word stems."

The dossier carries the abstract's favourable half ("some configurations approached the upper end of the
accuracy range reported for human experts") without this counterweight. LLM estimates match *individual*
human raters but fall **below pooled human judgement and below an existing automated (BERT-IRT) method**.

**A further product-relevant limit, from §5, verbatim:**

> "the present study does not examine the absolute differences between LLM-based estimates and those
> derived from student response data, which limits the immediate applicability of the findings. This is
> because estimates produced by pairwise comparison are located on a relative scale."

The best-performing configurations yield only a **relative ordering**, not calibrated absolute
difficulties. And the authors' own closing position, verbatim: this use "is best understood as an
emerging methodological direction rather than as a finished solution."

**Minor quote defect.** The dossier's fifth F22 quote is a silent truncation at both ends. Actual:
"**By systematically comparing key design choices,** the study positions LLMs as a promising tool for
initial item calibration and offers insights into effective workflow configuration **in settings where
many new items are generated and response data are unavailable.**" No ellipsis is marked. Meaning is not
reversed — the dropped tail in fact *favours* the product's case — but it is not verbatim as presented.

**Collector caveat (iv) is VERIFIED**: the study scores LLM output against "empirical difficulty estimates
treated as empirical reference", i.e. it demonstrates correlation *with* population-derived truth, not a
system running without one. That caveat was correctly stated.

### Correction 2 (F24) — a spliced quote presented as verbatim **[DEFECT]**

The dossier's fourth F24 "exact quote" reads:

> "Provided a sufficient number of easy facts, the use of individualised difficulty predictions created a
> more strongly differentiated repetition schedule that improved participants' response accuracy,
> particularly on difficult facts."

**No such sentence exists in the paper.** It is a composite of two sentences from two different sections:

1. Discussion, verbatim: "Provided a sufficient number of easy facts, the use of individualised difficulty
   predictions created **a more pronounced differentiation in the scheduling of easy and difficult items,
   resulting in better retention of items studied during the learning session.**"
2. General Discussion, verbatim: "**Experiment 2 showed that using difficulty predictions** created a more
   strongly differentiated repetition schedule that improved participants' response accuracy, particularly
   on difficult facts."

The dossier grafts the opening clause of (1) onto the tail of (2), with no ellipsis and no indication of
splicing. Both halves are real sentences and the composite does not reverse the paper's meaning — but it
is not a quote and must not stand inside quote marks. **This is the one place C1-R2's own quote discipline
failed**, and it is exactly the fetch-mediation hazard the collector warned the verifier about.

Note also: the *Default* condition quote silently drops the paper's inline symbol — actual text is "in
which the predicted rate of forgetting \\(\\alpha_{\\varnothing}\\) is always the default value of 0.3."
Trivial, an HTML-rendering artifact, but it should carry an ellipsis.

**The other three F24 figures are verbatim and correct**: "on average, response accuracy in these
conditions was about 7.3 percentage points higher (95% CI [3.9, 11.0])" — HIT; and RMSE
*M* = 0.084, *SD* = 0.025 vs *M* = 0.102, *SD* = 0.035, BF = 1.0 × 10³ — HIT.

**Randomisation CONFIRMED**, verbatim: "Participants were randomly assigned to one of the five prediction
types". The study was additionally **preregistered** (osf.io/vwg6u for Exp 1, osf.io/snfyz for Exp 2).
**Q2 is warranted.**

**Participant counts** (correctly kept out of quote marks by the collector, now read off the paper):
Experiment 1 — 241 University of Groningen first-year psychology students (82 in sample 1, 159 in sample 2),
plus 217 MTurk participants in the USA (85 / 132). Experiment 2 — 197 students (128 / 69), sample sizes set
by preregistered Bayesian stopping rules.

### Correction 3 (F24) — funding/COI located; it resolves **against** independence

The collector flagged this "unchecked, not absent". Checking it found a real disclosure. Ethics
declarations, verbatim:

> "**Conflict of Interest** An earlier version of the adaptive learning system discussed in this manuscript
> is licensed to Noordhoff Publishers by the University of Groningen. **This project was partially funded
> by these license fees.** However, the publishing house had no involvement in this study."

F24 is **developer-authored and partially funded by commercial licence revenue from the very system it
evaluates**. Per the verifier contract, it cannot be counted as independent corroboration of that system.
This is not disqualifying — the COI is disclosed, the design is randomised and preregistered, and the
result cuts *against* the authors' convenience in no obvious way — but the dossier must record it.

By contrast **F26 declares the opposite**, verbatim: "The authors declare that the research was conducted
in the absence of any commercial or financial relationships that could be construed as a potential conflict
of interest." Both statements are recorded as made.

### Correction 4 (F24) — a null result was omitted, and it softens F24's direction

The dossier presents F24 as "the closest direct measurement in this dossier of the cost of running with
zero response data" and reports the 7.3 pp loss. It does not report that **the effect did not survive to
the delayed recall test in Experiment 1.** Verbatim:

> "**Delayed Recall Test Performance** There was no difference between conditions in the number of correctly
> recalled facts on the delayed recall test (Fig. 5d). A comparison of Bayesian Poisson regression models
> showed **strong evidence in favour of the intercept-only null model** (Table 1 D), which found an average
> test score across conditions of 15.0 (95% CI [14.5, 15.4])."

And on accuracy restricted to studied items, also Exp 1: "the Bayesian logistic mixed-effects model that was
most likely to have generated the data was **the intercept-only null model**."

So the measured cost of the zero-data path is confined to **in-session accuracy**; on the retention outcome
that actually matters for a training product, Experiment 1 found **nothing**. The dossier's characterisation
("unfavourable", "measured cost") is directionally defensible but presently one-sided. This must be added.

### Correction 5 (F23) — the population chain is longer than the dossier states, and there is a ceiling figure

The dossier's crux claim — that F23 "relocates the population requirement rather than removing it" — is
**VERIFIED, and the actual chain is longer than the dossier describes.** §2.1, verbatim:

> "We pseudo-label every item by few-shot prompting of a large language model (Gemini 2.5 Flash) using
> PALRACE (Zou et al., 2022), **a human-administered subset of RACE++ with Rasch difficulty estimated from
> response patterns**, as the source of in-context anchors. On a held-out pilot drawn from PALRACE itself,
> **the LLM's predictions correlate at r = 0.46 with response-based Rasch difficulty**."

The training targets are not response-calibrated difficulties directly — they are *LLM pseudo-labels*
anchored on response-calibrated Rasch difficulties, and that pseudo-labelling step itself correlates only
**r = 0.46** with the response-based truth. The whole pipeline therefore sits on a population-calibrated
anchor set *and* inherits a substantial ceiling from the pseudo-labelling step. The dossier holds neither
fact. This strengthens, not weakens, the collector's reading.

## Kills (citations dropped — the claim lost this support)
- **None.** No citation in F22–F27 was found to fail on existence or support. All six sources exist, are
  correctly attributed, and say substantially what the dossier says they say.

## Quarantine (UNVERIFIABLE — could not be reached at all)
- **F25 body** — Sense et al. (2016), *Topics in Cognitive Science* 8(1):305–321. Blocked at three
  independent routes (Wiley `pdfdirect` 403, Wiley `am-pdf` 403, research.rug.nl 403), confirming the
  collector's HTTP 402/403 report. Semantic Scholar lists an open-access PDF at BRONZE status that the
  publisher nonetheless refuses. The **abstract is VERIFIED verbatim** via PubMed E-utilities (PMID
  26748838) — a route the collector did not attempt. The test–retest reliability figures remain
  unobtained. → source-lead-register.

## Conflicts surfaced during verification

- **New conflict (returned, not written): F22's own body vs its own abstract on where LLM difficulty
  estimation sits relative to human experts.** The abstract says some configurations "approached the upper
  end of the accuracy range reported for human experts"; §4.1 says observed correlations "were lower than
  those reported for pooled human judgements... and lower than the value of .76 reported by Yancey et al.
  (2024)". Not a contradiction — the abstract compares to *individual* raters, the body to *pooled* ones —
  but a dossier quoting only the abstract will overstate the method. Affected areas: whether LLM-set
  difficulties are good enough to seed a product bank.

- **New conflict (returned, not written): source-independence concentration on C1's load-bearing question.**
  F17, F24, F25 and F26 are all authored by the same University of Groningen group (van Rijn, Sense,
  van der Velde, Meijer) and all concern the same SlimStampen/MemoryLab system. F24 discloses that the
  system is commercially licensed to Noordhoff Publishers and that the study was partially funded by those
  licence fees. Four of the dossier's citations on its central question are **one lab, one system, one
  commercial lineage**, and the dossier nowhere says so. Affected areas: how much independent weight the
  "a population-free estimator exists" claim can carry.

- **Conflict #9 as proposed by C1-R2 (F16 vs F26) is sound and should be registered as written.** The
  asymmetry the collector notes — the null is full-text, the positive is abstract-scope — is confirmed.

## RULING — is "every single source found … calibrates from a population" falsified?

**NO. The claim is NOT falsified. C1-R2 overstated this, and the charter does not need re-correcting in the
direction the collector implies.** This is the most consequential finding in this record and it runs
against, not with, the collector's headline. Two independent grounds:

**1. Scope.** The dossier sentence reads: "every single source found — **across BKT, PFA, DKT, IRT, and
education-Elo** — calibrates its parameters from a population of many learners." It enumerates five model
families. The SlimStampen estimator is an **ACT-R declarative-memory rate of forgetting** — a sixth family,
outside the sentence's own stated scope. On its literal terms, F25/F26 do not touch it.

**2. The 0.3 default is population-derived — the source says so in its own words.** This is the question the
dispatch brief flagged, and F24's Methods answers it directly, verbatim:

> "We selected a weakly informative prior, with μ₀ = 0.3, κ₀ = 1, α₀ = 3, and β₀ = 0.2. This particular prior
> was chosen because it reflects our assumption that the rate of forgetting is normally distributed around
> 0.3, **which previous studies have shown to be a reasonable average across materials and learners**
> (e.g. van Rijn et al., 2009, Sense et al., 2016)."

The starting value of 0.3 is not an arbitrary constant. It is an **empirically established population
average**, cited to prior population studies. The estimator is therefore **not population-free**. It is
population-*light*: it requires no population **fit** of the per-item parameter, but it inherits a
population-derived scalar prior.

**What the collector genuinely established, and should get credit for:** the per-learner, per-item rate of
forgetting is fitted online from **one learner's own accuracy and latency**, with **no population fit of that
parameter and no per-item difficulty calibration**. That is a real, product-relevant weakening of the
universal framing — it shows the population requirement can shrink from "tens of thousands of learners" to
**a single published constant**. That is a valuable result and it does warrant an edit.

**Recommended replacement sentence** (narrowing, not retraction):

> "Every source found calibrates its *fitted* parameters from a population of many learners. The one partial
> exception — the SlimStampen/MemoryLab ACT-R rate of forgetting (F25, F26) — fits a per-learner, per-item
> parameter online from that learner's own accuracy and latency with no population fit, but it still starts
> from a **population-derived default of 0.3**, which its own authors justify as an average 'across materials
> and learners' established by prior studies. The population requirement can therefore be reduced to a single
> published constant, but no source found eliminates it."

**Note on F25's paywall:** the brief asked me to weigh that F25 — one of the two sources carrying the
falsification claim — was never read past its abstract. In the event this does not much matter, because the
load-bearing evidence for the claim comes from **F26 (full text, all quotes verified) and F24 (full text,
verified)**, not from F25. What defeats the claim is the provenance of 0.3, which sits in F24's own Methods.
The paywall is a real gap for the *reliability* figures; it is not what decides this ruling.

## Dossier sufficiency (SECOND AXIS — judged independently of citation states)

**Verdict: INSUFFICIENT — but the remedy is EDITORIAL, not a further collection pass.**

Coverage assessed against: major evidence traditions · landmark sources · opposing positions · every
required sub-question in the card's scope.

- **Traditions/landmarks/positions present:** BKT (Corbett & Anderson; Šarić-Grgić review), PFA/LFA
  (Pavlik; Cen), DKT and its sceptical replication tradition (Piech; Khajah; Wilson; Xiong; Gervet),
  identifiability/degeneracy (Beck & Chang; Doroudi & Brunskill), IRT on its own terms (Baker; Schroeders &
  Gnambs), education-Elo (Pelánek), cold-start against an existing population (Park; van der Velde 2024),
  **response-free difficulty estimation (F22, F23)**, **single-learner online estimators (F25, F26)**, and
  **assumption-free baselines (F27)**. This is genuinely broad coverage at 26 citations.
- **Required sub-questions answered:** Q1 ✓, Q2 ✓, Q3 ✓. **Q4 (load-bearing) — partially, and better than
  the dossier itself believes**, because F22's measured figures are now recovered.
- **Searches run to test for what is NOT there:** independent web search on small/fixed/expert-authored item
  banks with no response data; direct retrieval attempts on all six sources; Semantic Scholar metadata
  lookup on F25. These surfaced **no landmark the dossier has missed** on the core question, and confirmed
  the two remaining domain gaps are real absences rather than search failures.

### Why INSUFFICIENT, and the exact remedy

1. **What important evidence appears missing** — *nothing that requires new collection on the core gap.*
   The dossier's own stated blocker ("no numeric accuracy figure for zero-response difficulty estimation
   exists anywhere in this dossier") is **false as of this record**: the figures were inside F22, a source
   already cited, and are recovered above (Spearman .633–.673 aggregate; .732 best configuration; .252–.847
   by domain; below pooled-human .70 and below automated .76; relative scale only). **This is the program's
   dominant defect recurring for the fifth time — material inside an already-cited source.** In fairness to
   this collector, unlike the previous four instances the cause was a genuine tooling block that it reported
   honestly rather than inattention it concealed.
2. **Why the omission could materially affect the findings** — it changes the HEAD STATEMENT. The dossier
   currently says the zero-population step has evidence "on both sides" but no measurement. It now has a
   measurement, and that measurement is **mixed-to-modest**: good enough to rank items, not calibrated in
   absolute terms, below pooled human experts, and demonstrated only on primary-school arithmetic where
   surface features predict difficulty far better than they would for blackjack decision drills. Separately,
   Corrections 2–4 mean F24 is currently reported one-sidedly and with a non-verbatim quote, and the
   "falsified" claim in HEAD STATEMENT ¶3 is **overstated** and would, uncorrected, propagate a second error
   into the charter.
3. **Exact scope of the remedy — editorial, one bounded pass, no re-collection required:**
   - Fold F22's Tables 2–3 figures and its §4.1/§5 counterweights into F22 (material supplied above).
   - Repair the F24 spliced quote; add the COI; add the Exp-1 delayed-recall null.
   - Add F23's PALRACE anchor chain and the r = 0.46 pseudo-labelling ceiling.
   - Rewrite HEAD STATEMENT ¶3 and the Sufficiency Statement per the RULING above — narrow, do not retract.
   - Add the source-independence note (F17/F24/F25/F26 = one lab, one system, one commercial lineage).
   - **Optional single-source collection, high value, cheap:** Wauters et al. (2012), "Item difficulty
     estimation: an auspicious collaboration between data and judgement," *Computers & Education* — it is
     both a primary source behind F27's Q4 claim *and*, by its title and subject, directly about combining
     expert judgement with data to set item difficulty, i.e. the product's literal proposed path. This is
     the one uncollected lead that would move a conclusion.

### Record as a COVERAGE GAP — do not re-run
Two gaps have now survived three collection passes plus this verifier's independent searching:
**(a) no evaluation on a small, fixed, expert-authored item bank**, and **(b) no strategy-game, card-game or
gambling-adjacent domain evidence.** These should be recorded as **settled coverage gaps — "we looked hard
and it is not there"** — which is a legitimate research result, not a collection failure. Further passes
against them should be refused.

### On the collector's standing obligation
**The collector's self-assessment — that the evidence does not settle the mastery-model choice — is CORRECT
and is confirmed by this verifier.** Even with F22's recovered numbers, a Spearman of ~.73 against a
population-derived reference on primary-school arithmetic, on a relative scale only, does not settle a
mastery model for a blackjack trainer. The HEAD STATEMENT's core verdict stands; only its ¶3 is overstated.

## Verifier summary
- **VERIFIED: 6** (F22, F23, F24 *with corrections*, F25 *abstract-scope*, F26, F27) | **UNVERIFIABLE: 1 partial** (F25 body only) | **DROPPED: 0**
- **UNVERIFIED remaining: 0**
- **Dossier sufficiency: INSUFFICIENT — editorial remedy only, no further collection pass warranted**
- **Claims the collector overstated (strength downgraded):**
  1. **"Every single source calibrates from a population" is falsified** → **overstated; NOT falsified.**
     Narrow the sentence; do not retract it. The 0.3 default is population-derived by F24's own admission.
  2. **F24 as a clean "measured cost of the zero-data path"** → one-sided; the Exp-1 delayed-recall outcome
     was a null, and the paper carries an undisclosed-in-dossier commercial COI.
  3. **F22's "approached the upper end of the human-expert range"** → true of *individual* raters only; the
     body places the method *below* pooled human judgement and below an existing automated method.
- **Claims the collector understated (upgraded):**
  1. **F23's population-relocation crux** → correct, and the chain is longer than described (PALRACE Rasch
     anchors; r = 0.46 pseudo-label ceiling).
  2. **"No numeric accuracy figure exists in this dossier"** → no longer true; the figures were in F22 and
     are recovered here.
- **Quote-discipline audit (requested):** the `[fetch-reported, NOT quoted]` convention **held throughout for
  numbers** — participant counts and per-arm designs were correctly kept outside quote marks in F24, and the
  counts I read off the paper are consistent with the collector's paraphrase. No `[fetch-reported]` value was
  presented as quoted. The discipline **failed once for prose**: the F24 spliced quote (Correction 2).
- **Good-faith assessment:** C1-R2's self-reported shortfalls were accurate in every particular I could test
  — F22's body was genuinely hard to reach by its tooling, F25 is genuinely paywalled at both named routes,
  F24's funding statement is genuinely buried in a collapsed Ethics-declarations block, and F27's access
  claim (pages read directly) is corroborated by its being the only section with a perfect verbatim record.
  Of 22 quoted passages tested by local string match, **20 were verbatim**, one was a hyphenation variant,
  and one was a splice. This is a materially better verbatim rate than the fetch-mediated route would
  predict, and the collector's own warning about that route is what made it cheap to audit.
