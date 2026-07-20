# C1-W — Wauters single-source collection report

- **Pass ID:** C1-W (bounded amendment-6 top-up, single source)
- **Date:** 2026-07-20
- **Dossier touched:** `journal/raw/_inbox/foundation-audit-p1/C1-knowledge-tracing/dossier.md`
  (**append-only**; new section "Findings added by bounded amendment-6 top-up (C1-W …)" at end)
- **Authorisation:** amendment 6 (evidence already specifically identified by V1d) + amendment 5
  (sufficiency top-ups exempt from the 15-citation cap)
- **Trust role:** COLLECTOR. Nothing here is self-verified. Everything below is a claim awaiting a
  separate verifier.

---

## 1. Terminal state of the citation

The dispatch named one target and correctly warned not to assume its title. Confirming from the
sources themselves produced a **split terminal state**, because the target turned out to be a
two-paper research programme:

| # | Source | Terminal state |
|---|---|---|
| **F28** | Wauters, K., Desmet, P., & Van Den Noortgate, W. (2011). "Acquiring Item Difficulty Estimates: a Collaborative Effort of Data and Judgment." *Proc. 4th Int. Conf. on Educational Data Mining (EDM 2011)*, pp. 121–128. | **COLLECTED — FULL TEXT, READ IN FULL, LOCALLY EXTRACTED.** Strongest-access finding in the C1 dossier. |
| **F29** | Wauters, K., Desmet, P., & Van Den Noortgate, W. (2012). "Item difficulty estimation: An auspicious collaboration between data and judgment." *Computers & Education*, 58(4), 1183–1193. DOI 10.1016/j.compedu.2011.11.020 | **PARTIAL — citation CONFIRMED, abstract VERIFIED VERBATIM, body UNVERIFIABLE.** |

### Citation corrections against the dispatch and V1d

The dispatch was right to say "do not assume the title I have given is correct." Three corrections:

1. **Title spelling.** Crossref (queried directly on the DOI) and the KU Leuven Lirias record both
   give **"judgment"**. V1d's "judgement" is the ResearchGate spelling.
2. **Author surname.** Crossref gives **"Van Den Noortgate"** (capital D).
3. **Venue/pagination confirmed from Crossref, not assumed:** Elsevier BV, *Computers & Education*,
   volume 58, issue 4, pages 1183–1193, published print May 2012, 35 references.

The EDM 2011 citation was confirmed against **DBLP** (`conf/edm/WautersDN11`, pages 121–128,
access "open"), which additionally records it as **"Nominee for Best Paper Award."**

### Why the split, and why it does not inflate the count

F29 is the journal extension of F28: same authors, same 25-item study, same six methods, same result
ordering, with "paired comparison" renamed "one-to-many comparison". F28's own §3 announces what F29
adds — the sample-size analysis. **They are one research programme, not two independent
corroborations**, and the dossier says so explicitly so a later synthesis cannot double-count them.

**Citation accounting:** running total was 26 → now **27 full + 1 partial**.

---

## 2. Retrieval log — every route tried for F29's body

Recorded in full so this is not blindly re-run. **No paywall was circumvented and no pirate mirror
was used.**

| Route | Result |
|---|---|
| Unpaywall API | `is_oa: false`, `oa_status: "closed"`, **0** OA locations |
| OpenAlex API | `is_oa: false`, `any_repository_has_fulltext: false`; only location is the DOI landing page |
| Semantic Scholar Graph API | `openAccessPdf.status: "CLOSED"`, empty URL, abstract elided by publisher |
| ScienceDirect article page | HTTP 403 |
| ResearchGate record | HTTP 403 — "Request PDF" only |
| CORE API | Crossref metadata stub only, no full text |
| CiteSeerX | unreachable (HTTP 000) |
| Lirias record `lirias.kuleuven.be/108844` | HTTP 200 — record + abstract, but "Download PDF (external access)"; **no deposited file** |
| Lirias PhD-thesis record (`Adaptive item sequencing in item-based learning environments`, uuid `c08a2ccd-44c5-4546-a2bc-2556e941db07`) | bundles endpoint queried: **zero bitstreams deposited** |

**Conclusion: F29's body is genuinely UNVERIFIABLE, not a tooling failure.** This is the honourable
outcome the contract provides for. The abstract *was* obtained verbatim from the authors' own
institutional repository, which is the most authoritative source short of the publisher.

**The one route that worked:** the EDM 2011 precursor is openly hosted by the conference itself.
Downloaded in-session (HTTP 200, `application/pdf`, 367,851 bytes, 7 pages), converted with
`pdftotext -layout`, and string-matched locally.

---

## 3. Verbatim discipline — evidence of compliance

The program's stated hazard is summarising fetch. **This pass used none.** Every quotation placed in
the dossier was matched programmatically against a locally-downloaded artefact:

- **19/19** F28 quotations string-matched against the local `pdftotext` output — **0 failures**.
- **1/1** F29 abstract string-matched against the locally-downloaded Lirias HTML — **match**.
- **Total: 20/20 confirmed verbatim by the collector's own extraction.** None fetch-mediated.

---

## 4. What the source actually says — answers to the dispatch's five questions

### Q: Does the method reduce/remove the response-population requirement, or merely relocate it?

**BOTH, and the split is the substantive finding.** The study contains two judgmental arms and they
behave oppositely:

- **Expert rating — genuinely response-free at estimation time.** 13 experts, 25 items, **zero learner
  responses consumed.** But the question put to the expert is literally a request to predict a
  population statistic: *"What is, according to you, the percentage of students that will answer this
  item correctly after completing secondary education?"* The expert simulates a reference population
  from memory. **This is population-light, not population-free** — the requirement is discharged by
  expert priors, not abolished.
- **One-to-many (paired) comparison — RELOCATED, identically to F23.** It requires 11 anchor items
  "of which the item difficulty parameter is known", and those anchors come from "the preliminary IRT
  analysis, conducted by Selor" (the Belgian government's selection agency). **A response-calibrated
  anchor set is a hard precondition.** It is also the study's **worst**-performing method.
- **The reference standard is itself population-derived** — Selor's prior IRT calibration on examinee
  data *is* the "true difficulty parameter values". So r = 0.80 measures agreement *with* a
  population calibration, not independence *from* one.

### Q: Any measured accuracy figure for expert/judgmental estimation vs empirical calibration?

**YES. This is the number the program has been missing for three passes.**

Pearson correlations against `True β`, from Table I and §2.3 (verbatim in the dossier):

| Method | r vs True β | Learner responses needed |
|---|---|---|
| Proportion correct | **.90** | many |
| IRT (study data) | **.90** | 318 |
| Learner feedback | **0.88** | many |
| Elo rating | **0.85** | many |
| **Expert rating** | **0.80** | **zero** |
| Paired comparison (learner) | **0.62** | zero, but needs calibrated anchors |
| Paired comparison (expert) | **0.56** | zero, but needs calibrated anchors |

All at `r(23)`, `p<0.01`. **From the Pearson correlation against the Selor-calibrated reference.**

### Q: How many responses does the method still need?

**Zero, for the expert-rating arm.** 13 experts × 25 items of judgement, no learner data.

### Q: Limits, sample, domain, transfer to a small fixed expert-authored item bank?

- **Sample:** 25 items (df = 23, **no confidence intervals reported**), 318 students, 13 expert French
  teachers. Domain: **French verb conjugation, single skill.**
- **The authors' own disclaimer, verbatim:** *"no generalization can yet be made to other domains and
  to items requiring more than one skill."* **Blackjack decision drills are a different domain and are
  plausibly multi-skill.** This is the single most important sentence in the source for this product.
- **Partial, imperfect relief on a settled coverage gap.** A 25-item fixed, expert-authored,
  single-skill drill bank rated by subject experts is **the closest structural match to this
  product's situation anywhere in the C1 dossier.** It remains imperfect: the ground truth came from
  a government agency's prior population calibration, which this product would not have. **This does
  not justify re-opening the settled gap** — it is incidental relief found inside a source collected
  for another reason, and gap (b), strategy/card-game evidence, is untouched.
- **The real transfer risk is the reference-population asymmetry.** The 13 experts were teachers
  estimating students they teach, about a population they have calibrated intuitions for. **A
  blackjack trainer's author has no equivalent grounded reference population.** Read r = 0.80 as an
  **upper** bound for this product, not a central estimate.

### Q: Does it change F27's Q4 grade?

**NO — F27 should remain Q4.** Declining a tier upgrade the dispatch invited. Three reasons:

1. **Only one of two primaries, and only partially.** Pelánek cites Pelánek 2014 *and* Wauters 2012.
   Pelánek 2014 is uncollected and, being by the overview's own author, would add no independence.
   Of the Wauters primary, the journal body is UNVERIFIABLE; what was read is its precursor.
2. **The primary substantiates an adjacent proposition.** See the registered conflict below.
3. **F27's Q4 was never solely about uncollected primaries** — its own caveat also grounds Q4 in the
   source being a narrative overview. Untouched by this pass.

---

## 5. A conflict registered against this pass's own interest

**Pelánek's citation of Wauters et al. (2012) may not support the proposition F27 attaches to it.**
F27 rests on Pelánek 2017 §5.1: moving-average / EMA techniques "often provide reasonable predictions
(Pelánek, 2014; Wauters et al., 2012)". **The Wauters programme does not appear to test a moving
average.** F28, read in full, evaluates six methods and none is a moving average; the strings
"moving average" and "exponential" were programmatically confirmed **absent** from its full text.
F29's verified abstract lists the same six and names none either.

Registered as **CANDIDATE, not defect**, with an explicit access caveat: F29's body is unread and may
add a condition the conference version lacked. The nearest referent in F28 is *proportion correct* — a
running aggregate — which performed **best of all** (.90 vs true β; 1.00 vs study IRT). **So F27's
direction survives even if its citation is loose; only the precision of the attribution is in
question.** Resolving it needs F29's body, which is UNVERIFIABLE. **Do not re-run collection for it.**

---

## 6. Checks against the dispatch's "must not contradict" list

| Constraint | Status |
|---|---|
| Do not revive the falsified "population-free" claim | **Held.** C1-W independently *affirms* V1d. F28 is the cleanest illustration of why V1d was right — zero responses collected, yet the expert question is literally a population prediction and the yardstick is a government population calibration. **Population-light, not population-free.** |
| "~100 students" is a rule of thumb, not measured | **Held.** Never quoted as measured. F29's abstract-scope "200-250 learners" is explicitly fenced off from it, with three stated constraints: abstract-scope only, "especially with" is not a threshold, and it does not measure Pelánek's figure. |
| Is this the ".76 existing automated method"? | **Checked explicitly: NO.** F22's body attributes .76 to **Yancey et al. (2024)** (BERT-IRT, word stems) and .70 to **Attali et al. (2014)**. Neither is Wauters. Stated explicitly in the dossier as instructed. |
| Independence from the F17/F24/F25/F26 cluster | **Fully independent, and stated.** ITEC / KU Leuven, Belgium — different country, lab, system, domain; no disclosed or apparent commercial interest. Independent also of Pelánek's Masaryk group, which merely cites it. **This materially improves the dossier's independence profile.** One partial exception disclosed: F28's *Elo arm* uses Brinkhuis & Maris (2010), and Brinkhuis co-authors **F22** — a partial dependency on that arm only. **The expert-rating arm, which is the finding that matters, is unaffected.** |
| Items attempted by ~1 student → degenerate difficulties | Not contradicted. A registered lead (Wauters et al. 2010, JCAL) speaks directly to it; not chased. |

---

## 7. Evidence collected in both directions

**For the expert-authored path:** r = 0.80 with zero response data; peer-reviewed primary (Best Paper
nominee) not a preprint; fully independent lab; expert inter-rater agreement "good" (ICC[3,1]=0.68);
closest structural match in the dossier to a small fixed expert-authored bank.

**Against it:** the authors' own no-generalisation disclaimer; **learners significantly out-performed
experts** (0.88 vs 0.80, t(22)=2.71, p<0.05); the anchor-based variant relocates the requirement and
performs worst (.56); the reference standard is population-derived; the expert task is itself
population-referenced; 25 items with no CIs; and **it measures item difficulty only — nothing about
tracking changing skill**, so it does not touch the mastery-model question.

**A directly product-relevant design signal, and it points against intuition.** §3, verbatim:
*"Results contradict the postulation of Impara and Plake (1998) that experts perform better in
estimating the difficulty by rank ordering the items than by estimating the proportion of persons who
will answer the items correctly."* The **absolute-percentage** judgement (.80) beat the
**rank-ordering** judgement (.56). If this product asks an author to set difficulties, this study says
ask for "what fraction get this right", **not** "rank these hardest-to-easiest".

---

## 8. Proposed effect on the HEAD STATEMENT (proposal only — NOT applied)

**The verdict stands and should not be softened.** Two clauses need a factual update, both narrowing
rather than reversing:

- The feasibility side of the zero-population step is still weaker than C1-R2 believed, but **better
  evidenced and slightly less bleak**: expert rating at r = 0.80 with zero responses is a stronger
  showing than F22's LLM band, from a peer-reviewed primary rather than a preprint. **One sentence of
  fact, not a change of verdict** — and it must carry the transfer caveats or it will read as licence.
- **"Everything calibrates from a population" remains NOT falsified.**
- **The mastery-model choice remains a Product judgement**, unchanged.

---

## 9. Adjacent leads registered, NOT chased

Scope was one source. These were found inside it and recorded rather than pursued.

1. **Impara, J.C., & Plake, B.S. (1998).** *JEM* 35(1), 69–81. **Highest-value lead.** F28 explicitly
   contradicts it → a live disagreement on exactly whether experts can estimate difficulty without
   data. Not retrieved.
2. **Chalifour & Powers (1989)**, *JEM* 26, 120–132 (experts *can*) and **Hambleton, Bastari & Xing
   (1998)**, Report 298, UMass ("contradictory results") — the pro/con pair beneath F28 §2.1.5.
3. **Johns, Mahadevan & Woolf (2006)** — F28 reports second-hand: IRT difficulty vs percent-incorrect,
   "found a high correlation (r=0.68)". **Second-hand; a lead, not a finding.**
4. **Wauters, Desmet & Van den Noortgate (2010)**, *JCAL* 26(6), 549–562 — the programme's earlier
   paper; source of "many exercises are only made by few learners". **Directly relevant to the
   degenerate-difficulty concern.**
5. **Brinkhuis & Maris (2010)**, Cito Report 2010-1 — the Elo implementation; note the F22 dependency
   disclosed above.

---

## 10. Compliance

- **No `git` command was run at any point** — not `status`, `log`, or `diff`.
- **No build, test, or install command was run.**
- **Nothing outside `journal/raw/_inbox/foundation-audit-p1/` was written or modified.** Two files
  touched: the C1 dossier (append-only) and this report (new).
- **Append-only respected** — no existing finding altered, deleted, renumbered, or rewritten.
  All proposed changes to the HEAD STATEMENT and F27 are stated as *collector proposals* in their own
  sections and were **not** applied to existing text.
- **Nothing written to the shared registers** — rows returned in response text only.
- **Scope held to one source.** No broadening; five adjacent leads registered instead of chased.
- **Self-verification disclaimer:** C1-W is a collector. Nothing above is verified. The 20/20 verbatim
  match is a *collector's* check of its own extraction and does not substitute for independent
  re-retrieval by a separate agent.
