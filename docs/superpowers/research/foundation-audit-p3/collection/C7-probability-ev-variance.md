# Dossier: Teaching probability, EV, variance, and risk (C7)

> Status: RAW COLLECTION — DATA ONLY, not authority (Inbox Rule 0). UNTRUSTED until verified.
> Collector: Claude (Opus 4.8), fresh agent instance — not a Phase 1 or Phase 2 collector.
> Date: 2026-07-22
> Brief: `journal/raw/_inbox/foundation-audit-p3/GAP-SPEC.md` (G1–G6). New-gap collection, not a re-audit.
> Leads consumed (untrusted): none — collected fresh. Phase 1 dossiers C1–C6 were **not** reopened,
> re-verified, or re-collected; `C6-blackjack-teachable.md` was read once, for dossier *shape only*.
> Citations collected: ~~**13**~~ ~~**14**~~ **20** / template budget 6–12 (hard cap 15).
> [LANDED C-C7-010 (V-C7, editorial): count raised 13 → 14 by the addition of F14 (Sezer et al.
> 2016, abstract-level). Still inside the hard cap.]
> [TOP-UP PASS 2026-07-22 (bounded collection remedy, V-C7 Axis-2): count raised 14 → 20 by F15–F20.
> **This deliberately exceeds the original brief's hard cap of 15, and the breach is disclosed rather
> than hidden.** The cap belonged to the first collection pass; V-C7 ruled that pass INSUFFICIENT on
> five of six questions and specified a bounded follow-on collection of roughly five new sources as
> the remedy. Six were collected. See the new section "Top-up collection pass" at the end of this
> file for the full record, and `collection/C7-topup-report.md` for what was searched and what failed.]
> Tooling constraint (structural, disclosed): this collector had **no Bash tool**. All retrieval was
> via web fetch plus local reading of PDFs the fetch layer saved to disk. Where a source could only be
> read through the fetch layer's own extraction (HTML pages), that is stated at the finding.

## Head statement

Phase 1's archive is a *mechanics* foundation. This dossier is the first *subject-matter* evidence in
the program: what is known about teaching a lay adult to reason about chance, expected value,
variance and risk. **The evidence is strongly asymmetric across the six questions.** G1 (format) and
G2 (description vs experience) are supported by large, well-replicated, quantitatively precise
literatures that I read in full. G4 (outcome bias) has an excellent *demonstration* literature —
including a ~~card-and-money experiment~~ **card-scenario experiment** — but ~~I found **essentially no
evidence that outcome bias can be trained away**, and the one dedicated intervention paper I identified
I could **not retrieve**~~ **one dedicated intervention paper was retrieved at abstract level only
(F14, below); it reports a manipulation that reduced outcome bias — raising the salience of intentions
before outcome disclosure — and, counter to its own prediction, that joint evaluation *increased*
outcome weighting. Full text was not obtained.** G3
(EV instruction transfer) rests on a **null result**: the closest study to this product's situation
taught university students the mathematics of gambling odds and expectation, improved their knowledge
and fallacy-resistance at six months, and found **no change in gambling behaviour**. G5 is well
established for *prevalence* and thin for *correction*. G6 contains a directly relevant warning that
simulation alone does not produce conceptual change.

[LANDED C-C7-005 (V-C7, editorial): "card-and-money experiment" overstated Baron & Hershey (1988)
Experiment 5, which is a hypothetical written vignette, not a played card game. I re-opened the
first author's hosted full text and confirmed the abstract's own framing, verbatim: "Subjects were
given descriptions of decisions made by others under conditions of uncertainty, together with
outcomes of those decisions." Struck wording left visible above.]

[LANDED C-C7-010 (V-C7, editorial — re-wording half only): the absence claim above did not survive.
Sezer, Zhang, Gino & Bazerman (2016) is reachable at publisher-abstract level via RePEc/IDEAS, a
route the collection pass did not try. I opened it myself and confirmed the abstract; it is carried
as F14 below. The `collection` half of C-C7-010 — attempting the **full text** — is explicitly out
of this editorial pass's scope and remains open. Superseded wording left visible above.]

Nothing below proposes an activity, curriculum, sequence, or product change. That authority is
Phase 4's and this collection has none of it.

## Scope & questions this card must answer
- **G1** — Format: do natural frequencies beat probabilities/percentages for lay reasoning, and when
  does the advantage hold or vanish?
- **G2** — Description vs experience, including rare-event behaviour.
- **G3** — Does expected-value instruction transfer to actual choices, or stay inert?
- **G4** — Can people be taught to evaluate decision quality independently of outcome?
- **G5** — Misconceptions (gambler's fallacy, hot hand, law of small numbers, illusion of control):
  prevalence, and whether instruction corrects them — negative results explicitly wanted.
- **G6** — Interactive simulation / sampling visualisation / repeated play for variance and risk
  intuition: what works, what is merely popular.

## Transfer-distance scale used in this dossier

`CFL-007` exists because a grade-7 mathematics result sits against a blackjack roadmap. To avoid
creating a second silently, every finding below carries an explicit distance rating against the
target: **an adult learning a probabilistic decision rule in a card game.**

- **D1 — Near.** Adults, chance/gambling task, money or money-like stakes, cards or a casino game.
- **D2 — Moderate.** Adults, abstract monetary gambles or explicit probability reasoning, lab setting.
- **D3 — Far.** Adults, but a different content domain (medical diagnosis, cardiovascular risk,
  classroom statistics) where the reasoning is analogous but the material is not a game of chance.
- **D4 — Very far.** Population or task materially unlike the target (e.g. school-age learners,
  non-probabilistic content).

No finding in this dossier is D4. **No finding in this dossier is a blackjack study**; C6 holds the
blackjack-specific evidence and was not reopened.

---

## Findings

### G1 — Format: natural frequencies

#### F1: A three-study training experiment found that teaching adults to *construct natural-frequency representations* produced Bayesian-reasoning performance that was as transferable as rule training and markedly more durable — with no decay at 5 weeks and none at 15 weeks — whereas rule training decayed substantially; and a within-study control showed the durability came from the *frequency representation*, not from the graphical aid.
- Provenance: PUBLISHED
- Proposed status bucket: **Evidence-backed**
- Proposed evidence-quality tier: **Q2** — three controlled experiments with random assignment to
  training condition, a no-training control (Study 1a), pre/post/follow-up design, and a designed
  confound-elimination study (Study 2).
- Transfer distance: **D3 (far)** — adults (university students), but the content is medical/legal
  Bayesian inference (mammography, sepsis, the cab problem), not a card game. The *learning mechanic*
  (adult, brief computerised training, probabilistic rule, retention tested) is close; the *material*
  is not.
- Source: Sedlmeier, P. & Gigerenzer, G. (2001). "Teaching Bayesian Reasoning in Less Than Two Hours."
  *Journal of Experimental Psychology: General*, 130(3), 380–400. DOI 10.1037/0096-3445.130.3.380.
- Access: **full text read.** The APA release PDF (`https://www.apa.org/pubs/journals/releases/xge-1303380.pdf`)
  was saved locally by the fetch layer and I read all 19 pages directly, including Figures 9, 10 and
  12, Tables 1–3, the Discussion, footnotes 4 and 5, and the reference list. No part of this finding
  rests on a summary.
- Supporting locations: p. 388 (Study 1a Results, immediate effect); p. 389 (Study 1a *Stability*);
  pp. 390–391 (Study 1b method and results); Figure 9, p. 392; Figure 10 and Table 2, p. 393;
  pp. 394–395 (Study 2 method and results); Figure 12 and Table 3, p. 395; ~~pp. 396 (Discussion,
  footnotes 4–5)~~ **pp. 396–397 (Discussion, footnotes 4–5; scope limit p. 397)**.
  [LANDED C-C7-009 (V-C7, editorial): the multivalued/continuous scope-limit quotation used in the
  Caveats below is printed on p. 397, not p. 396. I re-opened the rendered page and confirmed it
  there, verbatim: "First, we have dealt with only an elementary form of Bayesian inference, and we
  do not know how these results generalize to situations in which hypotheses and data are not binary
  but multivalued or continuous."]
- Claimed strength — exact figures as the paper reports them:
  - **Study 1a** (Sixty-two University of Chicago students; ~~14 grid / 15 tree / 20 rule / 4 control
    at training~~ **14 grid / 15 tree / 20 rule / 5 control, of whom 4 took part in the second
    session**): "At baseline (Test 1), the median percentage of Bayesian solutions was 10% in the
    frequency conditions and 0% in the rule training condition." "The median performance after rule
    training increased to 60%, whereas it was 75% and 90% for the two frequency representation
    training sessions."
    [LANDED C-C7-001 (V-C7, editorial): the control cell is 5, not 4; 4 is the number who returned
    for session two. I re-opened Sedlmeier & Gigerenzer 2001 p. 388 as a rendered PDF page and
    confirmed both sentences, verbatim: "We trained 14 participants in the grid condition, 15
    participants in the tree condition, 20 participants in the rule training condition, and we had 5
    participants in the control condition." and "Four of the five members of the control group took
    part in the second session." Superseded figure left visible above.]
  - **Study 1a stability**, verbatim: "For the rule training, Figure 9 shows that, 5 weeks after
    training, Bayesian reasoning is down to a median of 20% — almost back to where it was before
    training. The students who were taught to construct frequency representations, however, show a
    different curve. The high immediate effect of training is not lost, and 5 weeks after training,
    there is even an increase in the median number of Bayesian inferences in the frequency grid
    condition."
  - **Study 1b** (Fifty-six students at the Free University of Berlin; 28 per condition; zero
    attrition): immediate median 64% (rule) vs 86% (representation). At 5 weeks the rule condition was
    "down to only 43%" overall; in the **no-bonus** subgroup rule training fell to "a median of only
    14% Bayesian solutions," while "the performance remained at a median of 86% Bayesian solutions
    over 5 weeks, from Test 2 to Test 4" in the frequency tree condition.
  - **Study 2** (Seventy-two students at the University of Munich; 24 trained per condition; ~15-week
    final follow-up) added a **probability tree** condition so that the graphical aid was held constant
    across frequency and probability formats: ~~"the immediate training effect of 93% Bayesian
    solutions remained stable over the whole period of 15 weeks. In fact, it even increased to 100%
    Bayesian solutions at Test 4. In contrast, the rule training group began high, at a median of 86%
    Bayesian solutions, and ended up with a median of 50% after 15 weeks."~~ **"Here, the immediate
    training effect of a median of 93% Bayesian solutions remained stable over the whole period of 15
    weeks. In fact, it even increased to 100% Bayesian solutions at Test 4. In contrast, the rule
    training group began high, at a median of 86% Bayesian solutions, and ended up at a median of 50%
    after 15 weeks."** Continuing: "The probability tree training shows a
    similar pattern of results as the rule training… a more pronounced decay from Test 3 to Test 4,
    with a final median of 57% Bayesian solutions."
    [LANDED C-C7-002 (V-C7, editorial): two alterations sat inside a passage presented as verbatim —
    "a median of" was dropped before 93%, and "ended up **at** a median of 50%" was rendered "ended
    up **with**". Neither reverses meaning; both breach the verbatim contract. I re-opened p. 395 as
    a rendered PDF page and restored the printed wording. Superseded rendering left visible above.]
  - **Transfer** was high in every condition. Study 1a, liberal criterion, differences between training
    and transfer problems were "on average, 7.2, 3.0, and −0.8 percentage points for the frequency
    tree, frequency grid, and rule training methods, respectively."
  - **Training time**, verbatim: "The time needed for teaching representations was short, between 1 and
    2 hr (not counting the time needed for the tests), depending on the speed of the individual
    participant."
- **The graphical-aid control is the load-bearing part** (Discussion, p. 396), verbatim: "The similar
  performance in the two probability training programs indicates that the important question is not
  whether a graphical aid should be used in teaching statistical literacy but what is a proper
  representation for a graphical aid."
- Caveats / population / domain limits, stated by the source or observed by me in the text:
  - **Study 1a had high attrition** and the authors themselves downgrade it: "Study 1a, however, had
    its limits and therefore should be assigned the status of a pilot study."
  - **Monetary incentives interacted with rule training.** In Study 1b's bonus subgroup, rule training
    showed **no** decay; the authors traced this to participants looking Bayes's rule up outside the lab
    and conclude: "This interpretation suggests that financial incentives can play an important role in
    statistical training, in leading to additional efforts to look up the formula outside the
    laboratory." The frequency conditions were unaffected by the bonus.
  - **Footnote 4** records a scoring-criterion sensitivity the body text does not: under the *strict*
    criterion there is "a relatively large difference in the median percentages at Test 4 (36 percentage
    points) between rule training and probability tree conditions, which is much smaller when expressed
    in means (6 percentage points) and which is not found when applying the liberal criterion."
  - Scope limit stated by the authors: "we have dealt with only an elementary form of Bayesian
    inference, and we do not know how these results generalize to situations in which hypotheses and
    data are not binary but multivalued or continuous."
  - Sample sizes per cell are small (14–28); all participants are university students.

#### F2: The field's own meta-analysis of 20 years of natural-frequency research confirms the format effect but reports that *short menu formats* and *visual aids* were among the strongest moderators, improving performance for **both** probability and frequency formats — i.e. the format effect is real but not the only, or necessarily the largest, lever.
- Provenance: PUBLISHED
- Proposed status bucket: **Evidence-backed** (for the abstract-level claims only — see Access)
- Proposed evidence-quality tier: **Q1** for the design (systematic review + bivariate mixed-effects
  meta-analysis of 226 performance estimates from 35 articles), **but the access is Q-limited**: I read
  only the abstract, so this dossier can carry only what the abstract states.
- Transfer distance: **D3 (far)** — the underlying task base is descriptive Bayesian inference problems,
  not games of chance.
- Source: McDowell, M. & Jacobs, P. (2017). "Meta-analysis of the effect of natural frequencies on
  Bayesian reasoning." *Psychological Bulletin*, 143(12), 1273–1312. DOI 10.1037/bul0000126.
  PMID 29048176.
- Access: **ABSTRACT-LEVEL ONLY — full text NOT obtained.** Attempts and barriers, all disclosed:
  Ovid publisher full-text page returned **HTTP 402 Payment Required**; the Semantic Scholar record
  page returned empty content to my fetch; no MPG.PuRe deposit or other open copy was locatable by the
  search phrasings I tried. The abstract below was retrieved from the **PubMed** record.
- Supporting location: Abstract (PubMed, PMID 29048176).
- Claimed strength, verbatim from the abstract: "A systematic review of relevant literature yielded 35
  articles representing 226 performance estimates." And: "Short menu formats (less computationally
  complex representations showing joint-events) and visual aids demonstrated some of the strongest
  moderation effects, improving performance for both conditional probability and natural frequency
  formats. A number of methodological factors (e.g., exposure to both problem formats) were also found
  to affect performance rates, emphasizing the importance of a systematic approach."
- **Explicit non-claim — read this before citing F2.** The figures "24% (natural frequency) vs 4%
  (probability)" are widely attributed to this meta-analysis in secondary sources, including in
  search-engine synopses I saw during this collection. **Those figures do not appear in the abstract I
  read, and I did not read the full text. This dossier therefore does not cite them, and no downstream
  work may cite them from here.** Logged as a lead, below.
- Caveats: abstract-level access means I cannot report the pooled effect estimate, the heterogeneity,
  the funnel/publication-bias analysis, or which moderators failed. **F2 must not be used to state a
  magnitude for the natural-frequency effect.** Its permitted use is: *a systematic meta-analysis of
  this literature exists, is large, and reports short-menu formats and visual aids as among the
  strongest moderators, benefiting both formats.*

**G1 candidate conflict, noted not resolved:** F1 (Study 2, read in full) concludes the graphical aid
is *not* the decisive factor — the representation is. F2's abstract (read only at abstract level)
reports **visual aids** as among the strongest moderators. These are not necessarily contradictory
(F1 held the *aid* constant and varied the *format*; F2 pools across studies that varied the aid), but
they pull in different directions on how much a product should credit visualisation as such. Recorded
here as a **candidate conflict** because it cannot be settled without F2's full text.

---

### G2 — Description vs experience

#### F3: In a direct experimental comparison of structurally identical problems, adults who learned probabilities by *sampling outcomes* chose as if they **underweighted** rare events, while adults given a stated description chose as if they **overweighted** them; the average absolute difference was 36 percentage points, and the mechanism was traced to small samples (median 15 draws) plus recency.
- Provenance: PUBLISHED
- Proposed status bucket: **Evidence-backed**
- Proposed evidence-quality tier: **Q2** — controlled experiment, random assignment to description vs
  experience, real monetary payoffs, with a within-paper mechanism analysis.
- Transfer distance: **D2 (moderate)** — adults, real money, explicit monetary gambles learned by
  repeated sampling from an unlabelled distribution. This is the closest structural analogue in this
  dossier to "learning a game's odds by playing hands," but the task is a two-button gamble, not a
  card game with a decision rule.
- Source: Hertwig, R., Barron, G., Weber, E.U. & Erev, I. (2004). "Decisions From Experience and the
  Effect of Rare Events in Risky Choice." *Psychological Science*, 15(8), 534–539.
  DOI 10.1111/j.0956-7976.2004.00715.x. PMID 15270998.
- Access: **full text read.** Retrieved from the Max Planck open repository
  (`https://pure.mpg.de/rest/items/item_2504664/component/file_2520409/content`), saved locally by the
  fetch layer, and read directly — all 6 pages including Tables 1 and 2, Figure 1, both footnote
  blocks and the reference list.
- Supporting locations: Abstract (p. 534); Method, p. 536; Results and Table 1, p. 536; Figure 1 and
  footnote 3, p. 537; Table 2 and the recency analysis, p. 538.
- Claimed strength — exact figures as reported:
  - Method: "One hundred students at the Technion (Haifa, Israel) were presented with the six decision
    problems displayed in Table 1." Half description, half experience; real payoffs ("$4.50 fee for
    showing up and 2¢ for each point won").
  - "Across all problems, the average (absolute) difference between the percentage of respondents
    choosing option H in the experience and description groups was 36 percentage points, and
    between-groups differences were statistically significant for all problems except Problem 2."
    (Problem 1: 88% experience vs 36% description.)
  - Search was frugal: "the total number of draws per problem was relatively small, with a median of
    15." In Problem 5 "most respondents (18 out of 25) never encountered '32'."
  - "Averaging across all problems in the experience group showed that 78% of respondents sampled the
    critical rare event less frequently than expected (np), whereas 22% sampled it as frequently as
    expected or more frequently than expected."
  - Recency: ~~"Whereas the first half predicted, on average, 59% of the final choices, the second half
    predicted 75% of the choices, t(49) = 3.1, p = .003, two-tailed."~~ **"Whereas the first half
    predicted, on average, 59% of the final choices, the second half predicted 75% of the choices,
    t(49) = −3.1, p = .003, two-tailed."**
    ~~**Transcription flag (mine, not the source's):** the PDF's text layer rendered this statistic
    inconsistently across two extractions — once as `3.1` and once as `−3.1`. The *magnitude*, degrees
    of freedom, p value and two-tailed status were identical in both. A verifier should confirm the
    sign against a clean copy; nothing in this finding depends on it.~~
    [LANDED C-C7-003 (V-C7, editorial): the sign is settled — **negative**. I re-opened Hertwig et al.
    2004 p. 538 as a rendered PDF page (not a text layer) and read the printed value: `t(49) = −3.1`.
    The transcription flag is struck rather than deleted so the pre-correction state stays
    reconstructible; it is **resolved and must not be re-opened or acted on** by any downstream
    reader. (V-C7 asked for outright deletion; strike-with-resolution preserves this program's
    leave-superseded-wording-visible rule and achieves the same effect.)]
  - The paper explicitly links this to variance perception, verbatim: "Reliance on small samples of
    experience not only plays a key role in decisions from experience but also contributes to
    perception of the world as less variable than it actually is. In fact, underestimating the variance
    of a population is equivalent to underweighting a rare event."
- Caveats / population / domain limits: N=100 undergraduates at one institution; six two-outcome
  problems; rare events defined by the authors' own admission "somewhat arbitrarily … as those with a
  probability of .20 or less" (footnote 2). The description-side comparison figures lean on Kahneman &
  Tversky (1979), which I did **not** read. This is a 2004 result whose interpretation was
  subsequently contested — see F4, which is the appropriate citation for magnitude.

#### F4: A meta-analysis of >70,000 choices by >6,000 participants confirms the description–experience gap is robust, but reports the magnitude as **9.7 percentage points** on one operationalisation and **−13.4** on another — with a **large moderator**: the gap is about 20 points when the choice is between a risky and a safe option and is **nearly eliminated** when both options are risky. It also reports that the gap **survives** when sampling error is removed, and that recency depends on whether the learner controls when to stop sampling.
- Provenance: PUBLISHED
- Proposed status bucket: **Evidence-backed**
- Proposed evidence-quality tier: **Q1** — systematic meta-analysis with mixed-effects models over
  trial-level data from 128 data sets, with publication-bias checks.
- Transfer distance: **D2 (moderate)** — same task family as F3, aggregated.
- Source: Wulff, D.U., Mergenthaler-Canseco, M. & Hertwig, R. (2018). "A Meta-Analytic Review of Two
  Modes of Learning and the Description-Experience Gap." *Psychological Bulletin*, 144(2), 140–176.
  DOI 10.1037/bul0000115. PMID 29239630.
- Access: **full publisher PDF obtained and read in part.** Retrieved via the MPG.PuRe REST API
  (`https://pure.mpg.de/rest/items/item_2548464_7/component/file_2552718/content`) after the PuRe
  HTML record page returned **HTTP 403** and dirkwulff.org returned **HTTP 403**. I read pp. 140–141
  (title, abstract, introduction), pp. 145–149 (Table 2, Figures 2–6, the gap magnitude and moderator
  results, sample size and sampling error), and pp. 152–155 (equivalence analysis, recency, Tables 7–8).
  **I did not read the whole 37-page article** — the General Discussion and appendices are unread and
  nothing here is claimed from them.
- Supporting locations: Abstract, p. 140; Table 2, p. 145; pp. 146 (gap magnitude, moderators, Table 3);
  pp. 147–149 (sample size, sampling error, value maximization, Figures 4–6); pp. 152–153 (equivalence
  and recency); Table 8, p. 155.
- Claimed strength — exact figures as reported:
  - Corpus, from the abstract, verbatim: "we evaluated these and other determinants of the
    decision–experience gap by reference to more than 70,000 choices made by more than 6,000
    participants." Table 2 gives Experience: 80 data sets, N = 4,400, 45,239 choices; Description:
    48 data sets, N = 2,208, 31,353 choices.
  - Magnitude, p. 146, verbatim: "description and experience conditions differed by, on average, 9.7
    percentage points (z = 3.49, p < .001) in the discrete operationalization and by −13.4 percentage
    points in the CPT-based operationalization (z = −6.27, p < .001)."
  - **Moderator**, p. 146, verbatim: "First, for both operationalizations, the size of the gap was
    strongly affected by the problem structure. When a choice involved a risky and a certain option,
    the gap was large, namely about 20 percentage points… When a choice involved two risky options,
    however, the gap was nearly eliminated under discrete underweighting and substantially reduced
    under the CPT-based operationalization."
  - Sampling, p. 147: "The median sample size across all 40,246 trials (problems × participants) is 20;
    for all choices involving a risky and a safe option (10,712 trials) it is 14; and for all choices
    involving two risky options (29,534 trials) it is 22." "In about one third of the trials (36%) in
    the data sets… at least one of the outcomes was not experienced." "Across all trials, we found that
    the experienced frequencies accurately tracked the true probabilities in only 1% of cases."
  - The gap is **not** merely sampling error, p. 153, verbatim: "reducing or eliminating sampling error
    does not automatically reduce or eliminate the description-experience gap." And p. 152, on the
    subset with equivalent information: "in 5 out of 6 problems, a description-experience gap
    (consistent with the discrete underweighting of rare events) emerged, even when description and
    experience were equivalent (as defined)."
  - Recency is conditional, from the abstract, verbatim: ~~"Fourth, we found that the occurrence of
    recency was contingent on decision makers' autonomy to terminate search, consistent with the notion
    of optional stopping."~~ **"Fourth, the occurrence of recency was contingent on decision makers'
    autonomy to terminate search, consistent with the notion of optional stopping."**
    [LANDED C-C7-004 (V-C7, editorial): the words "we found that" are not in the abstract — a
    paraphrase inside quotation marks. Meaning unchanged; verbatim contract breached. I re-opened the
    abstract at PubMed (PMID 29239630) and confirmed the printed sentence. Superseded rendering left
    visible above.]
    Table 8 shows the regulated (experimenter-fixed sample size) condition's
    recency effects at .01/.00/.01 with p = .474/.685/.307 — i.e. null.
- **Correction of a widely circulated figure.** Search-engine synopses encountered during this
  collection reported this paper's gap as "18.7 percentage points" for risky-vs-safe and "7 percentage
  points" for risky-vs-risky. **Those numbers are not what the paper's results section states at
  p. 146**, which is what I read and quote above. This dossier reports the paper's own figures.
- Caveats / population / domain limits: overwhelmingly student/lab samples playing monetary lotteries;
  "the gap" is a difference in *choice proportions*, not a measure of learning or knowledge; the two
  operationalisations (discrete underweighting vs CPT-based) disagree in sign convention and partly in
  moderator results (Table 3: Domain is significant under CPT, null under DU), so a single "the gap is
  X" statement is an oversimplification the paper itself avoids.

---

### G3 — Expected-value instruction and transfer

#### F5: The closest study to this product's situation is a **null result on behaviour**: 198 university students taught probability theory using gambling examples showed superior odds calculation and resistance to gambling fallacies six months later, but **no decrease in actual gambling behaviour**.
- Provenance: PUBLISHED
- Proposed status bucket: **Evidence-backed** (for the abstract-level claims only — see Access)
- Proposed evidence-quality tier: **Q3** — a controlled multi-group educational field study with a
  6-month follow-up and two comparison groups, but with intact classes rather than random assignment
  (the abstract does not describe randomisation, and I could not read the method).
- Transfer distance: **D1–D2** — adults, real gambling behaviour as the outcome, instruction explicitly
  about odds and mathematical expectation in gambling. This is the **nearest-transfer finding in the
  whole dossier** for the G3 question, and it is a negative one.
- Source: Williams, R.J. & Connolly, D. (2006). "Does learning about the mathematics of gambling change
  gambling behavior?" *Psychology of Addictive Behaviors*, 20(1), 62–68. DOI 10.1037/0893-164X.20.1.62.
  PMID 16536666.
- Access: **ABSTRACT-LEVEL ONLY — full text NOT obtained.** The abstract was retrieved from the PubMed
  record. I did not attempt a paywalled publisher route and did not locate an open deposit. I therefore
  cannot report effect sizes, the exact behavioural measures, attrition, or whether assignment was
  random.
- Supporting location: Abstract (PubMed, PMID 16536666).
- Claimed strength, verbatim, in full: "The present research examined the influence of improved
  knowledge of odds and mathematical expectation on the gambling behavior of university students. A
  group of 198 students in an introductory statistics class received instruction on probability theory
  using examples from gambling. A comparison group of 134 students received generic instruction on
  probability, and another group of 138 students in classes on unrelated topics received no
  mathematical instruction. Students receiving the intervention demonstrated superior ability to
  calculate gambling odds as well as resistance to gambling fallacies 6 months after the intervention.
  Unexpectedly, this improvement in knowledge and skill was not associated with any decreases in actual
  gambling behavior. The implication of this research is that enhanced mathematical knowledge on its
  own may be insufficient to change gambling behavior."
- Note the source's own hedges, which must travel with any use of this finding: "**may be**
  insufficient," and "**on its own**." The study does not show that instruction is useless; it shows
  that knowledge gain and behaviour change dissociated in this sample.
- Caveats / population / domain limits: university students in a statistics course; the behavioural
  outcome is *gambling participation*, which is not the same construct as *decision quality within a
  game*. A trainer that aims to improve play quality rather than reduce gambling is not the target this
  study measured. Abstract-level access is a real limit and this finding should be re-read at full text
  before it carries weight.

#### F6: A handbook review of the debiasing literature reports that decision rules *can* be taught with brief training, that the effective recipe was an abstract principle combined with concrete examples, and — a caveat directly relevant to any EV/Bayes curriculum — that the successfully trained rules were "relatively simple" or "familiar," and that the same research tradition would predict **Bayes' rule to be a poor candidate for training**.
- Provenance: PUBLISHED (book chapter / narrative review — **not** a primary study and **not** a
  meta-analysis)
- Proposed status bucket: **Evidence-backed** for what the chapter itself asserts as a review; the
  chapter's descriptions of Fong/Krantz/Nisbett (1986), Fong & Nisbett (1991), Larrick/Morgan/Nisbett
  (1990) and Lehman & Nisbett (1990) are **secondary descriptions of studies I did not read** and are
  reported here as such, not as primary evidence.
- Proposed evidence-quality tier: **Q5** — invited handbook review chapter, not peer-reviewed in the
  journal sense, single-author synthesis.
- Transfer distance: **D3 (far)** — the reviewed training studies are sunk-cost, law-of-large-numbers,
  conditional-reasoning and economics tasks with students and academics, not games of chance.
- Source: Larrick, R.P. (2004). "Debiasing." Chapter 16 in D.J. Koehler & N. Harvey (eds.),
  *Blackwell Handbook of Judgment and Decision Making*. Blackwell Publishing. Chapter begins p. 316.
- Access: **read directly.** PDF at `https://web.stanford.edu/~knutson/jdm/larrick04.pdf`, saved
  locally by the fetch layer; I read pp. 316–328 (Rationality and Debiasing; The Nature of Biases;
  Motivational Strategies; Cognitive Strategies; Training in rules; Training in representations;
  Training in biases; and the start of Technological Strategies). Later pages were not read.
- Supporting locations: p. 318 (why individuals do not self-debias); pp. 324–325 ("Training in rules");
  pp. 325–326 ("Training in representations", "Training in biases").
- Claimed strength — verbatim quotes:
  - p. 325: "Overall, these studies demonstrated that classes of decision rules could be taught
    effectively, often with relatively brief training. The most effective approaches combined an
    abstract principle with concrete examples, where experience with examples provided skills at
    mapping the principle to specific content."
  - p. 325, the caveat: "The rules that were taught successfully were either relatively simple, such as
    the sunk cost rule, or familiar, such as the law of large numbers. It is important to note that
    this rule-training research did not tackle highly complex, unfamiliar, abstract rules, such as
    Bayes' rule; the assumptions underlying this research would suggest that Bayes' rule would be a
    poor candidate for training."
  - p. 324, on durability, describing Fong & Nisbett (1991): "decision makers trained in one type of
    domain (e.g., sports performance) successfully generalized the rule to other domains (e.g., test
    taking), although cross-domain transfer diminished over two weeks."
  - p. 326, on merely teaching people that biases exist: "Without accompanying recognition skills and
    decision tools, it is unlikely that 'awareness' alone would be sufficient."
  - p. 318, directly relevant to G4: "First, they will often not realize when they have used a poor
    decision process – feedback on their decision outcome may be delayed, or the causal determinants of
    the outcome may be ambiguous, making both the existence and source of error difficult to identify
    (Hogarth, 2001). Second, the tendency to use decision outcomes to evaluate decision processes can
    lead to faulty conclusions in decisions made under uncertainty."
  - p. 318, the chapter's own summary position: "Despite the different emphases in these approaches,
    they share a common implication: debiasing requires intervention."
- **Tension worth flagging.** The chapter (2004) predicts Bayes' rule is a poor training candidate;
  F1 (Sedlmeier & Gigerenzer, 2001) reports durable success at teaching exactly that — and the chapter
  acknowledges this at pp. 325–326, describing Sedlmeier's frequency training as "highly effective and
  durable, surpassing the effects of probability training." The chapter's own resolution is that the
  representation, not the rule, is what was trained. I record this as **resolved within the source**,
  not as an open conflict.
- Caveats: a 2004 narrative review; the field has moved. Every study-specific number in it is
  second-hand as far as this dossier is concerned.

---

### G4 — Outcome bias / resulting

#### F7: The founding demonstration of outcome bias includes an experiment using ~~**card decks and $20 gambles**~~ **a hypothetical card-deck-and-$20-gamble scenario** in which subjects' willingness to let another person decide on their behalf tracked whether that person's earlier bet had *won or lost* — including in a condition where the losing decision-maker was demonstrably the *better* decision-maker — and subjects showed the bias while explicitly denying that outcome was relevant.
- Provenance: PUBLISHED
- Proposed status bucket: **Evidence-backed**
- Proposed evidence-quality tier: **Q2** — a series of controlled experiments with between- and
  within-subject manipulations of outcome holding the decision constant.
- Transfer distance: ~~**D1 (near) for Experiment 5** — adults, ordinary vs "mystery" card decks,
  red/black draws, $20 stakes, and a judgement about someone else's card-game decision. This is the
  closest *task* match in the dossier.~~ **D2 (moderate) for Experiment 5** — adults judging a
  *hypothetical written scenario* about another student's choice between an ordinary and a "mystery"
  card deck for a described $20 gamble. No cards were dealt and no money was staked; the subject's
  task is evaluative, not a card decision. The *content* is the nearest in the dossier to a card game;
  the *task* is judging a vignette. **D3 for Experiments 1–4**, which are medical scenarios.
  [LANDED C-C7-005 (V-C7, editorial): the D1 rating failed this dossier's own D1 definition — "Adults,
  chance/gambling task, **money or money-like stakes**, cards or a casino game" — because Experiment 5
  staked nothing. I re-opened the first author's hosted full text and confirmed the abstract's framing,
  verbatim: "Subjects were given descriptions of decisions made by others under conditions of
  uncertainty, together with outcomes of those decisions."; and the Experiment 5 scenario opening,
  verbatim: "Suppose you are in a psychology experiment with another student (of your own sex) from
  this class. The other student will make two choices concerning which of two gambles to play." This
  is the "*mock* casino described as an actual one" failure mode that produced CFL-007. **F10 (Langer
  Exp. 1) and F9 (Sundali & Croson) remain correctly D1** and are the dossier's genuine near-transfer
  items. Superseded rating left visible above.]
- Source: Baron, J. & Hershey, J.C. (1988). "Outcome bias in decision evaluation." *Journal of
  Personality and Social Psychology*, 54(4), 569–579. DOI 10.1037/0022-3514.54.4.569. PMID 3367280.
- Access: **full text read via the first author's own hosted copy** at
  `https://www.sas.upenn.edu/~baron/papers.htm/judg.html`. The publisher version is closed —
  Semantic Scholar's API returns `openAccessPdf.status: "CLOSED"` and reports that the abstract field
  has been elided by the publisher. **Retrieval-route disclosure:** this source is HTML, so the text I
  quote was extracted through the fetch layer's page reader rather than from a PDF I opened myself.
  The quotes below are reproduced as that reader returned them and a verifier should re-open the page
  and compare.
- Supporting locations: Abstract; Experiment 5 Method and Results; General Discussion.
- Claimed strength — verbatim:
  - Abstract: "Subjects rated the thinking as better (or rated the decision maker as more competent, or
    indicated greater willingness to yield the decision) when the outcome was favorable than when it was
    unfavorable. In monetary gambles, subjects rated the thinking as better when the outcome of the
    option _not_ chosen turned out poor than when it turned out well. Subjects who were asked felt that
    they should not take outcomes into account in making these evaluations, yet, they did so."
  - Experiment 5 subjects: "Subjects were 111 members of a class in thinking and decision-making taught
    by the first author, those who were present on the day the experiment was done."
  - Experiment 5 design, verbatim: "One deck is an **ordinary** deck of 52 cards. Both you and the other
    student have made sure that there are 26 red cards and 26 black cards and that the deck is well
    shuffled. The other deck is the **mystery** deck. The proportion of red and black cards is unknown,
    and neither of you can inspect it." (Emphasis is the source's own, as returned by the page reader.)
  - Experiment 5's designed reversal, verbatim: "Note that in the mystery-first condition when the
    student wins, there is a good argument for _not_ switching… By this argument, the decision is
    actually better in the lose condition than in the win condition. If subjects attended to these
    arguments, the outcome bias would be reversed."
  - Experiment 5 result, verbatim: "Putting aside the subjects who did not change, the outcome bias is
    significant for both the mystery-first conditions (p<.005, two-tailed) and the ordinary-first
    conditions (p<.01), by Fisher's exact test. Subjects are more willing to let the other student
    decide when the outcome is positive, and less willing when it is negative. This is true even in the
    mystery-first conditions, where the student is actually a better decision-maker in the lose
    condition."
  - Subjects' own denial, verbatim: "Some subjects explicitly denied its relevance, even when it seemed
    to affect them (e.g., 'The success may well be random - I am not satisfied that his/her decision
    making is responsible'). Thus, subjects did not appear to think they were using outcome as a basis
    for their evaluations."
  - **The single most important sentence for this product, verbatim from the Discussion:** "Mere
    understanding that such confusion contaminates our evaluations is not enough to eliminate it."
    (Whitespace in the source between "our" and "evaluations" is irregular; I have normalised it and am
    marking that alteration here.)
- Caveats / population / domain limits: 1988; Experiment 5's subjects were **students in the first
  author's own decision-making class** — a population already primed on the material, which makes the
  persistence of the bias more striking but the sample non-representative; the analysis discards
  non-changers; the outcome measure is willingness-to-yield, not a graded decision-quality rating.
  Experiment 1's N is 20.

#### F8: A pre-registered, well-powered replication (N = 692 online adults) reproduced outcome bias at a **larger** effect size than the original, and — the finding this product should care about most — the bias was still present **among participants who had themselves stated that outcomes should not be taken into consideration** when evaluating decisions.
- Provenance: PUBLISHED
- Proposed status bucket: **Evidence-backed**
- Proposed evidence-quality tier: **Q1** — pre-registered direct replication with a priori exclusion
  criteria, open materials/data/code, large sample, between-participants design.
- Transfer distance: **D3 (far)** — MTurk adults judging a *medical* decision scenario. The mechanism is
  the same one the product commits to; the material is not a game.
- Source: Aiyer, S., Kam, H.C., Ng, K.Y., Young, N.A., Shi, J. & Feldman, G. (2023). "Outcomes Affect
  Evaluations of Decision Quality: Replication and Extensions of Baron and Hershey's (1988) Outcome
  Bias Experiment 1." *International Review of Social Psychology*, 36(1), 12.
  DOI 10.5334/irsp.751. OSF: https://osf.io/knjhu/. PMC12372742.
- Access: **read at two independent hosts.** The journal's own article page (rips-irsp.com) and the
  PMC deposit were fetched separately and returned the **same abstract verbatim** — genuine two-host
  convergence, not a single source and its echo. **Retrieval-route disclosure:** both are HTML and were
  read through the fetch layer's page reader; the journal-hosted PDF link returned **HTTP 404** and the
  PMC PDF endpoint returned only a "Preparing to download" shell, so I did not open a PDF myself.
- Supporting locations: Abstract; Results (main ANOVA and the subgroup analysis); Limitations.
- Claimed strength — verbatim from the abstract (identical at both hosts): "For the replication
  (pre-registered) part of the study, we successfully replicated signal and direction of the outcome
  bias (original: _dpaired_ = 0.21 – 0.53; replication: _dindependent_ = 0.77 [0.62, 0.93] to 1.1
  [0.94, 1.26]), and even for participants who stated that outcomes should not be taken into
  consideration when evaluating decisions (_d_ = 0.64 [0.21, 1.08])."
  Sample, verbatim from the abstract: "an online Amazon Mechanical Turk sample using CloudResearch
  (_N_ = 692), switching from a within-participants design in the original experiment to a
  between-participants design."
- Results detail obtained from the PMC full text (route as disclosed above, **lower confidence than the
  abstract**): main effect of outcome type F(1, 688) = 152.37, p < .001, Cohen's f = .47, 90% CI
  [0.40, 0.53]; successful outcomes M = 1.78, SD = 0.81 vs failed outcomes M = 0.68, SD = 1.47. A
  verifier should re-check these four numbers specifically.
- Caveats / population / domain limits, from the paper's own limitations: the replication used a
  **single medical scenario**, against the original's 15-scenario design, and the authors state this
  limits generalisability; MTurk sample; the comprehension-check questions may have made certain
  scenario information more salient. The extensions (perceived importance, responsibility, norms) did
  **not** mediate the effect — a null the abstract does not headline.

#### F14: A five-experiment paper dedicated to reducing outcome bias reports, at abstract level, that raising the salience of intentions *before* outcomes are disclosed helped evaluators overcome the bias — and, counter to the authors' own prediction, that evaluating two people jointly rather than separately made outcome weighting **worse**.
- Provenance: PUBLISHED
- Proposed status bucket: **Evidence-backed (abstract-level access only)**
- Proposed evidence-quality tier: **Q2** for the design as the abstract describes it (five experiments
  with manipulated evaluation mode and intention salience), **access-limited to Q-abstract**.
- Transfer distance: **D3 (far)** — adults evaluating others' workplace and investment decisions; not a
  game of chance, and the judged party is another person, not the learner's own play.
- Source: Sezer, Ö., Zhang, T., Gino, F. & Bazerman, M.H. (2016). "Overcoming the outcome bias: Making
  intentions matter." *Organizational Behavior and Human Decision Processes*, 137, 13–26.
- Access: **ABSTRACT-LEVEL ONLY — full text NOT obtained.** The publisher abstract was retrieved from
  the RePEc/IDEAS record (`https://ideas.repec.org/a/eee/jobhdp/v137y2016icp13-26.html`), a route the
  original collection pass did not attempt. The two barriers it did record (ting-zhang.com SSL
  handshake failure; hbs.edu HTTP 403) are real and remain in the failed-retrieval table below.
- Supporting location: Publisher abstract (RePEc/IDEAS record, OBHDP 137, 13–26).
- Claimed strength, verbatim, in full: "People often make the well-documented mistake of paying too
  much attention to the outcomes of others' actions while neglecting information about the original
  intentions leading to those outcomes. In five experiments, we examine interventions aimed at reducing
  this outcome bias in situations where intentions and outcomes are misaligned. Participants evaluated
  an individual with fair intentions leading to unfavorable outcomes, an individual with selfish
  intentions leading to favorable outcomes, or both individuals jointly. Contrary to our initial
  predictions, participants weighed others' outcomes more—not less—when these individuals were
  evaluated jointly rather than separately (Experiment 1). Consequently, separate evaluators were more
  intention-oriented than joint evaluators when rewarding and punishing others (Experiment 2a) and
  assessing the value of repeated interactions with these individuals in the future (Experiment 2b).
  Third-party recommenders were less outcome-biased in allocating funds to investment managers when
  making separate evaluations relative to joint evaluations (Experiment 3). Finally, raising the
  salience of intentions prior to discovering outcomes helped joint evaluators overcome the outcome
  bias, suggesting that joint evaluation made attending to information about intentions more difficult
  (Experiment 4). Our findings bridge decision-making research on the outcome bias and management
  research on organizational justice by investigating the role of intentions in evaluations."
- **What abstract-level access cannot support, and no downstream work may claim from F14:** sample
  sizes, populations, materials, effect sizes, statistical tests, whether Experiment 4's effect
  persisted beyond the immediate measure, and how "salience of intentions" was operationalised. F14
  establishes that a dedicated intervention literature *exists* and reports one positive manipulation
  and one counter-intuitive negative. It does **not** establish that the manipulation is durable,
  replicable, or portable to a game.
- Caveats / population / domain limits: abstract-level only; the evaluation target is a third party's
  decision, not the evaluator's own; organisational-justice framing, not a chance game.

[LANDED C-C7-010 (V-C7, editorial — re-wording half): F14 is new to the dossier under this correction.
I did not take it on the verifier's word: I opened the RePEc/IDEAS record myself and transcribed the
abstract in full, including the closing sentence that V-C7's own quotation ellipsised and omitted. The
`collection` half of C-C7-010 — obtaining the **full text** — was not attempted and remains open.]

#### G4 COVERAGE GAP — ~~this is the most important negative result in the dossier~~ **narrowed by C-C7-010; see the landing marker at the end of this section**

~~**I searched specifically for evidence that outcome bias can be *trained away*, and did not find a
retrievable study.**~~ **I searched specifically for evidence that outcome bias can be *trained away*.
One dedicated intervention paper exists and is retrievable at abstract level (F14); no full text and
no card-game-specific study was obtained.** What I searched for and what came back:

- Search terms used included: outcome-bias debiasing intervention; training to evaluate decision
  quality independently of outcome; poker "resulting" outcome bias training; teaching decision quality
  vs outcome; instruction "ignore the outcome" experiment.
- ~~**One dedicated intervention paper was identified and could NOT be retrieved.**~~ **One dedicated
  intervention paper was identified and has now been retrieved at abstract level — see F14 above.**
  Sezer, Ö., Zhang, T.,
  Gino, F. & Bazerman, M.H. (2016), "Overcoming the outcome bias: Making intentions matter,"
  *Organizational Behavior and Human Decision Processes*, 137, 13–26. Barriers encountered, in order:
  the author-hosted PDF at ting-zhang.com failed with an **SSL handshake failure** on both `http://`
  and `https://`; the Harvard Business School item page returned **HTTP 403**; ScienceDirect is
  paywalled and was not attempted. ~~**I therefore cannot state what this paper found, and this dossier
  makes no claim about it.**~~ **A fourth route not attempted at collection time — the RePEc/IDEAS
  record — returns the publisher abstract. The dossier now carries the paper at abstract level (F14).
  The full text is still unobtained and remains the highest-priority lead for a follow-up pass.**
- **No blackjack-, poker-, or card-game-specific study of training decision-quality-independent-of-
  outcome was located at all.** The poker "resulting" material that surfaces on this query is
  practitioner writing (popular articles, strategy sites, Annie Duke's trade work) — first-party
  Q6 claims, not evidence, and not elevated to findings here.
- **What the retrievable evidence says instead is discouraging, and it says it three times over:**
  Baron & Hershey's own discussion (F7) — "Mere understanding that such confusion contaminates our
  evaluations is not enough to eliminate it"; Aiyer et al. (F8) — the bias persists in people who
  explicitly endorse the correct principle; and Larrick (F6, p. 326) — "Without accompanying
  recognition skills and decision tools, it is unlikely that 'awareness' alone would be sufficient."
  These three converge on: **stating the rule to a learner is not an intervention.** They do **not**
  establish that no intervention works — ~~that question is genuinely open and, on the evidence I could
  retrieve, **unanswered**~~ **and F14 now supplies a partial answer at abstract level: raising the
  salience of intentions before outcome disclosure reduced the bias, while joint evaluation increased
  it. The question is no longer unanswered; it is answered thinly, at abstract level, in a far-transfer
  domain, with no durability evidence.**

~~This is a real, honestly-searched empty result on the most product-consequential item in the brief,
and it is stated as such rather than filled.~~

[LANDED C-C7-010 (V-C7, editorial — re-wording half): the section's central negative claim was
overstated. "Every route I tried" was accurate about the collection pass's three attempts (two of
which V-C7 reproduced, and which stand in the failed-retrieval table); it was not accurate as a
statement about the paper's availability. I opened the RePEc/IDEAS record myself and read the
publisher abstract. **The gap is narrowed, not closed:** the full text is still unobtained, and the
absence of any card-game- or gambling-specific study of training decision-quality-independent-of-
outcome is unchanged and is *not* softened by this correction. Superseded wording left visible above.]

---

### G5 — Misconceptions

#### F9: Videotaped real-casino roulette play by 139 patrons betting their own money shows both the gambler's fallacy and hot-hand betting present in the field, with **large individual heterogeneity** — roughly half of classifiable players betting one way and half the other — and a positive within-person correlation between the two biases.
- Provenance: PUBLISHED
- Proposed status bucket: **Evidence-backed**
- Proposed evidence-quality tier: **Q3** — naturalistic observational field data with per-individual
  statistical modelling; no experimental manipulation.
- Transfer distance: **D1 (near)** — adults, real money, in an actual casino, on a chance game. Roulette,
  not blackjack; the biases concern *betting on sequences*, not strategy decisions.
- Source: Sundali, J. & Croson, R. (2006). "Biases in casino betting: The hot hand and the gambler's
  fallacy." *Judgment and Decision Making*, 1(1), 1–12.
  https://www.sas.upenn.edu/~baron/journal/06001/jdm06001.htm
- Access: **full text read** at the journal's own hosted HTML mirror. **Retrieval-route disclosure:**
  HTML, read through the fetch layer's page reader; quotes below are as that reader returned them.
- Supporting locations: Abstract; Data section; Results, Tables 2 and 3; Conclusion.
- Claimed strength — verbatim:
  - Abstract: "This paper's first contribution is to use data from the field (individuals playing
    roulette in a casino) to demonstrate the existence and impact of these biases that have been
    previously documented in the lab. Decisions in the field are consistent with biased beliefs,
    although we observe significant individual heterogeneity in the population."
  - Data: "Casino executives supplied the researchers with security videotapes for 18 hours of play of a
    single roulette table. The videotapes consisted of three separate six-hour time blocks over a 3-day
    period in July of 1998." "Nine hundred and four spins of the roulette wheel were captured in this
    data set (approximately 1 spin per minute)." (The corpus also comprises 22,527 individual bets by
    139 identifiable patrons.)
  - Heterogeneity, verbatim: "As Table 2 shows, we observe significant heterogeneity in the population.
    Approximately half of the players in our data (depending which model the reader prefers) can be
    categorized as gambler's fallacy players; when a number has previously appeared, the probability of
    their betting on it decreases. The other half of the players in our data can be categorized as hot
    outcome players."
  - Hot hand vs stock of luck, verbatim: "Of our 139 gamblers, 62 bet consistently with the hot hand and
    32 with the stock of luck bias."
  - Conclusion, verbatim: "We find a significant and positive correlation between individuals who act in
    accordance with gambler's fallacy beliefs and with hot hand beliefs, suggesting a unifying cause for
    the two illusions. Further research will be needed to identify this cause, and to help us predict an
    individual's biases and their resulting actions."
- **Explicit non-claim.** The aggregate result that gambler's-fallacy behaviour appears in outside bets
  after long streaks belongs to the **companion paper** (Croson & Sundali, 2005, *Journal of Risk and
  Uncertainty*, 30(3), 195–209), which this paper cites and which **I did not read**. No streak-length
  or aggregate-magnitude claim may be taken from F9.
- Caveats / population / domain limits: one table, one Reno casino, three sessions in July 1998;
  observational, so bias classification is inferred from betting patterns, not from stated beliefs;
  ~~45 of the 139 gamblers showed insufficient variation to classify on the hot-hand dimension by my
  reading of the counts (139 − 62 − 32 = 45) — that arithmetic is **mine, not the paper's**, and should
  be checked against the paper's own text before use.~~ **The paper accounts for the remaining 45 of
  the 139 gamblers directly: "Of the remaining 45 gamblers, 31 of them either only won or only lost at
  the table in our sample while 14 played for only one spin of the wheel." No arithmetic of mine is
  involved.** Roulette betting behaviour is not blackjack
  strategy behaviour.
  [LANDED C-C7-006 (V-C7, editorial): two defects. (a) The 45 is the paper's own figure, not a
  derivation, so the disclaimer sent readers to re-derive printed text. (b) The stated *reason*
  ("insufficient variation to classify") was not the paper's reason. I re-opened the journal-hosted
  HTML and confirmed the quoted sentence. Superseded wording left visible above.]

#### F10: A six-study programme established the illusion of control, and two of its studies are directly cautionary for a training product: in a **pure-chance card game**, adults bet significantly *more* against a nervous-seeming opponent than a confident one; and in a chance apparatus, **giving people a brief period of practice significantly raised their confidence of success** even though the outcome was not controllable.
- Provenance: PUBLISHED
- Proposed status bucket: **Evidence-backed**
- Proposed evidence-quality tier: **Q2** — six experiments with random assignment; several in real-world
  field settings.
- Transfer distance: **D1 (near) for Experiment 1** — adults, a card game, real money bets, a pure-chance
  outcome. **D2 for Experiment 4** (a chance apparatus with practice). D2–D3 for the lottery studies.
- Source: Langer, E.J. (1975). "The Illusion of Control." *Journal of Personality and Social Psychology*,
  32(2), 311–328.
- Access: **full text PDF obtained and read in part.** Retrieved from
  `https://nuovoeutile.it/wp-content/uploads/2014/10/Langer1975_IllusionofControl.pdf`, saved locally
  and read directly: pp. 311–316 (abstract, introduction, Experiment 1 in full, Experiment 2) and
  pp. 319–321 (Experiment 4 procedure and results, Experiment 5, start of Experiment 6). **Experiment 3
  and the General Discussion were not read** and nothing is claimed from them.
- Supporting locations: Abstract, p. 311; Experiment 1 Method pp. 313–314 and Results p. 315;
  Experiment 4 Procedure and Results pp. 319–320, Tables 2 and 3, p. 320.
- Claimed strength — exact figures as reported:
  - Abstract, verbatim: "An illusion of control was defined as an expectancy of a personal success
    probability inappropriately higher than the objective probability would warrant." And: "In Study 1
    subjects cut cards against either a confident or a nervous competitor… Indicators of confidence in
    all six studies supported the prediction."
  - Experiment 1: "Subjects were 36 male undergraduates enrolled in the introductory psychology course
    at Yale University… They were randomly assigned to one of two experimental conditions, with 18
    subjects in each." Betting was 0–25¢ per round over four rounds against a confederate who was
    either "dapper" or a "schnook."
  - Experiment 1 result, verbatim: "The mean bet for subjects in the dapper condition was 11.04 as
    compared with 16.25 for subjects in the schnook condition (t = 2.39, p < .025). The difference
    between the two groups should be even more apparent when we examine the first bets made, since the
    first round of betting most closely followed the experimental manipulation. The mean first bet for
    the dapper condition was 9.28, while the mean first bet for the schnook condition was 16.72
    (t = 3.16, p < .005)."
  - Experiment 4 — **the practice manipulation.** "High familiarity" was operationalised as roughly two
    minutes of hands-on contact with the apparatus under a cover story: "The experimenter suggested
    that the subject become familiar with the machine and practice while she repaired the damage. The
    experimenter took approximately 2 minutes to restore the plug to working order." Low familiarity
    subjects "began the task without this familiarization period."
  - Experiment 4 result, verbatim: "The analysis of the variance of these ratings yielded significant
    main effects for both familiarity and involvement, F(1, 56) = 4.71, p < .05, in both cases."
    On the chess-player comparison item: "for familiarity, F(1, 56) = 7.33, p < .01; for involvement,
    F(1, 56) = 4.25, p < .05." Cell means (Table 2, n = 15 per cell): high-familiarity/high-involvement
    6.07, high/low 5.67, low/high 5.67, low/low 3.80.
- **What this does and does not say.** It says that familiarity/practice and active involvement in a
  *chance* task inflate confidence beyond what the objective probability warrants. It does **not** say
  that practice in a skill-plus-chance task like blackjack does the same, and it does **not** test any
  corrective. Any use of it as a caution about repeated-play training is an inference, and would be the
  reader's, not the source's.
- Caveats / population / domain limits: 1975; Experiment 1 is 36 male Yale undergraduates and the
  dependent measure is bet size, with maximum stakes of 25¢ per round; Experiment 4's outcome is
  *self-reported confidence*, not behaviour; the manipulation-check questionnaires used samples of 15–16.

#### G5 — what I found on whether instruction corrects these misconceptions

**Positive, but only on knowledge:** F5 (Williams & Connolly) is the only retrievable instruction study
in this dossier that measured fallacy resistance, and it found instruction produced "resistance to
gambling fallacies 6 months after the intervention" — while producing **no** behavioural change.

**Searched and not found:** I did not locate a retrievable controlled study testing whether instruction
corrects the gambler's fallacy, hot-hand belief, or illusion of control **within a card game or with a
game-playing population**. Nor did I locate a meta-analysis of misconception-correction interventions in
gambling. The nearest adjacent bodies — clinical "cognitive correction" work in problem-gambling
treatment, and classroom probability-misconception research — were **not** searched in depth because
they sit outside this brief's bounds; they are recorded as leads, not as findings, and their absence
here is a scope decision, not a claim that they are empty.

---

### G6 — Simulation and visualisation

#### F11: A three-cycle classroom research programme found that having students explore sampling distributions with simulation software produced **disappointing** conceptual gains, and that the gains only appeared when the activity was redesigned to force students to **confront their own predictions against the simulated result** — the paper's own conclusion being that simulations alone do not guarantee conceptual change.
- Provenance: PUBLISHED
- Proposed status bucket: **Evidence-backed**
- Proposed evidence-quality tier: **Q3** — quasi-experimental classroom research across multiple
  institutions with pre/post diagnostic instruments and MANOVA comparison between activity versions;
  not randomised assignment of individuals.
- Transfer distance: **D3 (far)** — adult university students, statistics classroom, sampling
  distributions. The *concept* (sampling variability) is the concept a blackjack trainer would need to
  teach; the setting is a classroom, not a game.
- Source: delMas, R.C., Garfield, J. & Chance, B.L. (1999). "A Model of Classroom Research in Action:
  Developing Simulation Activities to Improve Students' Statistical Reasoning." *Journal of Statistics
  Education*, 7(3). DOI 10.1080/10691898.1999.12131279.
- Access: **read at the journal's own archive** (`https://jse.amstat.org/v7n3/delmas.cfm`) after the
  Taylor & Francis mirror returned **HTTP 403**. **Retrieval-route disclosure:** HTML, read through the
  fetch layer's page reader.
- Supporting locations: Abstract; the first activity's results; the revised activity's results; the
  discussion of what changed.
- Claimed strength — verbatim:
  - Abstract, verbatim: "An activity that asked students to test their predictions and confront their
    misconceptions was found to be more effective than one based on guided discovery. Our findings
    demonstrate that while software can provide the means for a rich classroom experience, computer
    simulations alone do not guarantee conceptual change."
  - First-cycle result, verbatim: "Very few students chose the correct pair of graphs on the pretest
    (8%), and the average percent of correct choices remained quite low on the posttest (16%)."
  - The paper's own generalisation, verbatim: "Our findings suggest that a straightforward presentation
    of the knowledge (for example, having students experience simulated sampling distributions from
    different types of populations, and for different size samples) doesn't necessarily lead to a sound
    conceptual understanding of the core concepts."
  - What the redesign changed, verbatim: the revised activity "placed more emphasis on comparisons of
    the shape and variability of the distributions than on the recording of parameters and statistics,
    and required students to make a direct comparison of their pretest 'predictions' with the sampling
    distributions produced by the program."
- ~~Numbers reported by the fetch layer that I flag as **lower confidence and requiring re-check**: 89
  students in cycle 1 and 141 in cycle 2 completing both pre- and post-test; posttest correct-only rising
  from 16% (initial activity) to 36% (revised activity); "correct or good reasoning" rising from 16% to
  72%. I did not see these in a PDF I opened myself.~~
  **Numbers, re-checked and no longer flagged: 89 students in cycle 1 and 141 in cycle 2 completing
  both pre- and post-test. On the "correct or good reasoning" measure the two activities are compared
  pretest-to-posttest, not posttest-to-posttest: initial-activity students went from 22% (pretest) to
  about 49% (posttest); revised-activity students went from 16% (pretest) to 72% (posttest). The
  between-activity posttest contrast on *correct-only* responses is 16% (initial) vs 36% (revised).
  All four figures are confirmed against the journal's own archive.**
  [LANDED C-C7-007 (V-C7, editorial): the struck sentence set "16% → 72%" in parallel with the
  preceding between-activity contrast, which reads as initial-activity posttest → revised-activity
  posttest. It is not — it is pretest → posttest *within* the revised activity, and the corresponding
  initial-activity figures are 22% → 49%. As written it overstated the redesign's advantage on that
  measure. I re-opened jse.amstat.org/v7n3/delmas.cfm myself and confirmed all four figures verbatim:
  "On average, students displayed acceptable reasoning under this second criterion on only 22% of the
  items on the pretest, increasing to an average percent of about 49% on the posttest."; "On average,
  the new activity students went from having correct or good reasoning on 16% of the pretest items to
  having correct or good reasoning on 72% of the posttest items."; "While the initial activity students
  chose the correct pair of graphs on an average of 16% of the posttest items, the new activity
  students were correct on 36% of the posttest items." The lower-confidence flag is cleared. Superseded
  wording left visible above.]
- Caveats / population / domain limits: 1999 software and classroom context; multiple institution types
  with unequal cell sizes; the outcome is a graphics-based multiple-choice diagnostic, not behaviour;
  no retention follow-up reported in what I read.

#### F12: An experiment with statistically naïve and sophisticated adults found that **sequentially simulated outcomes** — watching outcomes unfold one at a time — enabled accurate probabilistic inferences on classic problems that people fail when given the equivalent description, and that many participants preferred that format.
- Provenance: PUBLISHED
- Proposed status bucket: **Evidence-backed** (for the abstract-level claims only — see Access)
- Proposed evidence-quality tier: **Q2** for the design as the abstract describes it (two experiments,
  within-participant comparison with and without simulated experience), **access-limited to Q-abstract**.
- Transfer distance: **D2–D3** — adults across sophistication levels; tasks are classic probabilistic
  inference problems and a regression-output investment judgement, not a card game.
- Source: Hogarth, R.M. & Soyer, E. (2011). "Sequentially simulated outcomes: kind experience versus
  nontransparent description." *Journal of Experimental Psychology: General*, 140(3), 434–463.
  DOI 10.1037/a0023265. PMID 21639669.
- Access: **ABSTRACT-LEVEL ONLY — full text NOT obtained.** The abstract was retrieved from the PubMed
  record. I did not locate an open deposit and did not attempt a paywalled route.
- Supporting location: Abstract (PubMed, PMID 21639669).
- Claimed strength, ~~verbatim, in full~~ **verbatim, in full (closing sentence restored — see the
  landing marker below)**: "Recently, researchers have investigated differences in decision
  making based on description and experience. We address the issue of when experience-based judgments of
  probability are more accurate than are those based on description. If description is well understood
  ('transparent') and experience is misleading ('wicked'), it is preferable to experience. However, if
  description is not transparent, will valid ('kind') experience lead to more accurate judgments? We
  report 2 experiments. The first involved 7 well-known probabilistic inference tasks. Participants
  differed in statistical sophistication and answered with and without experience obtained through
  sequentially simulated outcomes. The second experiment involved interpreting the outcomes of a
  regression analysis when making inferences for investment decisions. In both experiments, even the
  statistically naïve achieved accurate probabilistic inferences after experiencing sequentially
  simulated outcomes, and many preferred this presentation format. **We conclude by discussing
  theoretical and practical implications.**"
  [LANDED C-C7-008 (V-C7, editorial): the quotation was presented as complete but omitted the
  abstract's final sentence. I re-opened PubMed (PMID 21639669) and read the abstract through to its
  end; the closing sentence is "We conclude by discussing theoretical and practical implications." It
  is appended above in bold, which is the addition — no prior wording was removed, so nothing is
  struck here. The parallel check on F5's "verbatim, in full" was left alone: V-C7 checked it and
  found it clean.]
- **Note the source's own conditional, which is load-bearing and must travel with this finding:** the
  benefit is claimed for **"kind"** experience — experience that is a valid sample of the underlying
  process — and the paper explicitly contrasts this with **"wicked"** experience, where experience is
  misleading and description is preferable. F3 and F4 above describe exactly the conditions under which
  sampled experience becomes misleading (small samples, unencountered rare events). **F12 and F3/F4 are
  not in conflict; they are the two halves of the same conditional, and citing F12 without the
  "kind"/"wicked" qualifier would misrepresent it.**
- Caveats: abstract-level access; I cannot report N, populations, effect sizes, or which of the seven
  tasks benefited and which did not. No claim beyond the abstract's own wording is made.

#### F13: A large randomised online experiment on adults found that adding **animated randomness** to a risk graphic — event markers appearing one at a time in random positions before settling — improved the alignment between people's risk estimates and their risk perceptions, but also **reduced** healthy-behaviour intentions.
- Provenance: PUBLISHED
- Proposed status bucket: **Evidence-backed**
- Proposed evidence-quality tier: **Q2** — nested factorial randomised experiment, large stratified
  panel sample.
- Transfer distance: **D3 (far)** — adults, but the content is 10-year cardiovascular risk in a health
  risk calculator, not a game. Included because it is the only randomised adult experiment I retrieved
  that manipulates *visualised randomness/sampling* as such.
- Source: Witteman, H.O., Fuhrel-Forbis, A., Wijeysundera, H.C., Exe, N., Dickson, M., Holtzman, L.,
  Kahn, V.C. & Zikmund-Fisher, B.J. (2014). "Animated Randomness, Avatars, Movement, and Personalization
  in Risk Graphics." *Journal of Medical Internet Research*, 16(3), e80. DOI 10.2196/jmir.2895.
  PMC3978557.
- Access: **read at the PMC deposit** (`https://pmc.ncbi.nlm.nih.gov/articles/PMC3978557/`).
  **Retrieval-route disclosure and a confidence flag:** HTML read through the fetch layer's page reader,
  and the reader returned the abstract with an **ellipsis it inserted itself** rather than a complete
  verbatim abstract. I therefore quote only the two clauses that carry statistics, and I flag F13 as
  **the lowest-confidence citation in this dossier**. A verifier should re-open it first.
- Supporting locations: Abstract; Results; Limitations.
- Claimed strength — the two clauses returned with statistics attached, verbatim: "Animated randomness
  was associated with better alignment between risk estimates and risk perceptions (_F_ 1,3576=6.12,
  _P_=.01); however, it also led to lower scores on healthy lifestyle intentions (_F_ 1,3572=11.1,
  _P_<.001)."
  Sample as returned: 3,630 US adults aged 35–74 without prior cardiovascular disease, drawn from a
  Survey Sampling International panel stratified by gender, age and race. Animated randomness was
  operationalised as event rectangles appearing sequentially in random positions in a 10×10 icon array
  before settling into a standard grouped display.
- Caveats / population / domain limits, from the paper's own limitations as returned: "This study was
  limited by the fact that we used an Internet survey panel to recruit participants… they may not be
  representative of the broader population." Health domain; the "improvement" is alignment of perception
  with estimate, not accuracy of a probability judgement; and the **same manipulation produced a
  negative effect on intentions**, which is a two-sided result and must not be reported one-sidedly.

---

## Candidate conflicts noticed

1. **Graphical aid vs representation (F1 vs F2).** F1's Study 2, read in full, holds the graphical aid
   constant and concludes the aid is not the decisive factor. F2's abstract reports visual aids among
   the strongest moderators across the meta-analytic corpus. Not necessarily contradictory, but not
   reconcilable without F2's full text, which I could not obtain. **Open.**
2. **"Experience teaches" vs "experience misleads" (F12 vs F3/F4).** Resolved *within* F12's own
   abstract by the kind/wicked distinction — recorded as **resolved, with the resolving qualifier
   attached to F12** so it cannot be dropped downstream. Not logged as an open conflict.
3. **Trainability of complex probabilistic rules (F6 vs F1).** Larrick (2004) predicts Bayes' rule is a
   poor training candidate; Sedlmeier & Gigerenzer (2001) trained it durably. The chapter itself
   acknowledges and resolves this (representation, not rule). **Resolved within the source, not open.**
4. **Two-sided result inside one source (F13).** The same manipulation improved perception alignment and
   worsened behavioural intentions. Not a cross-source conflict; recorded so it cannot be cited
   one-sidedly.

## Coverage gaps (stated as gaps, not filled)

- **G4 is the headline gap.** ~~No retrievable evidence that outcome bias can be trained away; the one
  dedicated intervention paper (Sezer et al., 2016) was **unreachable** by every route I tried;~~ **The
  one dedicated intervention paper (Sezer et al., 2016) was retrieved at **abstract level only** (F14);
  it reports a manipulation that reduced outcome bias — raising intention salience before outcome
  disclosure — and, counter to its own prediction, that joint evaluation *increased* outcome weighting.
  Full text was not obtained.** No
  card-game- or gambling-specific study of teaching decision-quality-independent-of-outcome exists in
  anything I could retrieve. What *is* established is the negative half: awareness and endorsement of
  the correct principle do not remove the bias (F7, F8, F6).
  [LANDED C-C7-010 (V-C7, editorial — re-wording half).]
- **G3 has no positive transfer result.** The nearest study is a **null on behaviour** (F5). I found no
  study that instructs adults in expected-value reasoning and then measures whether their *in-game*
  choices improve. F6's review of rule training is adjacent, secondary, and about sunk costs and the law
  of large numbers, not EV.
- **G5 correction evidence is thin.** Prevalence is well established (F9, F10). Whether instruction
  corrects these specific misconceptions in a game-playing adult population is, in the sources I
  retrieved, **untested** — F5's fallacy-resistance gain is the only positive datum and it comes with a
  behavioural null attached.
- **G6 has no meta-analysis on the target question.** I searched for a meta-analysis of interactive
  simulation for building *variance/risk intuition in adults* and found only simulation-based-learning
  meta-analyses in higher education and medical/nursing education generally — too far from the target to
  cite here without creating a second CFL-007. Recorded as a gap, and as a lead.
- **Retention beyond weeks is measured in exactly one source.** F1's 15-week follow-up is the longest
  retention interval anywhere in this dossier. Nothing here speaks to retention over months of
  intermittent product use.
- **Every finding is on adults but none is on a blackjack learner.** The nearest tasks are ~~Baron &
  Hershey's card decks (F7, D1),~~ Langer's card cutting (F10, D1) and Sundali & Croson's casino roulette
  (F9, D1). **Baron & Hershey's card scenario (F7) is re-rated D2 and is not a near-transfer task:
  it is a hypothetical vignette, not a played card game.** Phase 1's C6 holds the blackjack-specific literature and was not reopened.
  [LANDED C-C7-005 (V-C7, editorial): F7 dropped from the near-transfer roll-up; F9 and F10 remain
  correctly D1.]

## Failed retrievals (complete list — every attempt and its barrier)

| # | Target | URL/route | Barrier | What I therefore could not establish |
|---|--------|-----------|---------|--------------------------------------|
| 1 | McDowell & Jacobs (2017) full text | ovid.com publisher full-text | **HTTP 402 Payment Required** | Pooled effect size, heterogeneity, publication-bias analysis, and the widely-quoted 24%/4% figures |
| 2 | McDowell & Jacobs (2017) full text | semanticscholar.org record page | Empty content returned | Same as above |
| 3 | Wulff et al. (2018) | dirkwulff.org publication page | **HTTP 403** | — (worked around via MPG.PuRe REST API) |
| 4 | Wulff et al. (2018) | pure.mpg.de pubman HTML record | **HTTP 403** | — (worked around via the REST API) |
| 5 | Sezer, Zhang, Gino & Bazerman (2016) | ting-zhang.com author PDF | **SSL handshake failure** (http and https) | ~~**Everything.** No claim about this paper is made~~ **The full text (still unobtained). The publisher abstract was later obtained by a fourth route — see the note under this table** |
| 6 | Sezer et al. (2016) | hbs.edu item page | **HTTP 403** | ~~Even the publisher abstract~~ **The publisher abstract *by this route* — later obtained via RePEc/IDEAS; see the note under this table** |
| 7 | "Good decision vs. good results" (Theory and Decision) | link.springer.com | 303 redirect to `idp.springer.com` login; not followed | Whether this financial-agent outcome-bias study is usable; not cited |
| 8 | Larrick, Morgan & Nisbett (1990) | deepblue.lib.umich.edu PDF **and** handle page | **HTTP 403** on both | Primary evidence on cost-benefit/EV-adjacent training transfer. Only F6's secondary description is available, and it is labelled as such |
| 9 | delMas et al. (1999) | tandfonline.com full article | **HTTP 403** | — (worked around via jse.amstat.org) |
| 10 | Aiyer et al. (2023) PDF | storage.googleapis.com journal PDF | **HTTP 404** | A PDF-level read; abstract confirmed at two independent HTML hosts instead |
| 11 | Aiyer et al. (2023) PDF | pmc.ncbi.nlm.nih.gov `/pdf/` | Returned a "Preparing to download" shell only | Same as above |
| 12 | Baron & Hershey (1988) publisher version | Semantic Scholar API | `openAccessPdf.status: "CLOSED"`; abstract elided by publisher | — (worked around via the first author's own hosted full text) |

[LANDED C-C7-010 (V-C7, editorial — re-wording half): rows 5 and 6 are retained as accurate records of
two real barriers, both of which V-C7 independently reproduced. The **working route**, not attempted at
collection time and opened by me during this correction pass, is
`https://ideas.repec.org/a/eee/jobhdp/v137y2016icp13-26.html` (RePEc/IDEAS), which returns the publisher
abstract in full. It is recorded here in prose rather than as a new table row so that this table's row
count is unchanged. ScienceDirect (paywalled) and the article's full text remain unattempted/unobtained.]

**Nothing was quietly substituted.** Where a target could not be opened, either a route to *the same
work* was found (rows 3, 4, 9, 12) or the claim was dropped entirely (rows 1, 2, ~~5, 6,~~ 7, 8)
**— rows 5 and 6 are now partially recovered: abstract obtained, full text not**.

## Searched and came up empty — explicit negative record

Per the brief's Rule 4, these are wanted outcomes, stated plainly rather than filled:

- ~~**Any retrievable controlled test of whether outcome bias can be reduced by training.** Zero found.
  (One candidate identified, unreachable — see failed-retrieval row 5.)~~
  **Any *full-text* controlled test of whether outcome bias can be reduced by training. Zero obtained.
  One candidate (Sezer et al. 2016) is carried at abstract level as F14; its Experiment 4 reports a
  successful reduction, but no methods, sample or effect size is available to this dossier.**
  [LANDED C-C7-010 (V-C7, editorial — re-wording half).]
- **Any peer-reviewed study of "resulting" in poker or blackjack.** Zero found. The material that
  surfaces is practitioner/popular writing (Q6), not evidence.
- **Any study instructing adults in expected-value reasoning and measuring in-game choice improvement.**
  Zero found. F5 measures gambling *participation* and finds no change.
- **Any controlled test of whether instruction corrects the gambler's fallacy, hot-hand belief, or
  illusion of control in a card-game population.** Zero found.
- **Any meta-analysis of interactive simulation for building variance or risk intuition in adults.**
  Zero found on the target question; only general higher-education and medical-education
  simulation-based-learning meta-analyses, which are too far in domain to cite here.

## Self-assessed sufficiency, per question

| Q | Findings | Sufficiency | Plain statement |
|---|----------|-------------|-----------------|
| **G1** | F1, F2, **F17** | **SUFFICIENT** | One full-text-read three-study experiment with a 15-week follow-up and a designed confound control, plus the field's meta-analysis at abstract level. The conditions under which the advantage holds are answered for *durability* and for *graphical aid vs representation*; the *magnitude* question is answered only weakly, because F2's full text was unreachable. **Top-up: F17 adds the absolute ceiling and its mechanism; see "Sufficiency after the top-up".** |
| **G2** | F3, F4 | **SUFFICIENT** | The strongest-covered question in the dossier. A landmark experiment read in full and a meta-analysis of >70,000 choices read in substantial part, with rare-event behaviour, sample-size mechanism, recency, and a large problem-structure moderator all quantified from primary text. |
| **G3** | F5, F6 (+F4's maximization rates), **F15, F16, F20** | **PARTIAL — and the partial answer is negative** | There is no positive transfer result here. The nearest study is a knowledge-gain-with-behaviour-null; the supporting review is secondary and about different rules. This is enough to say *EV instruction cannot be assumed to transfer*; it is **not** enough to say what instructional form would. **Top-up: F15/F16 supply a positive, durable, game-delivered transfer result — but for confirmation bias, not EV; F20 argues from inside blackjack that EV inference may not be what players use. Still PARTIAL; see "Sufficiency after the top-up".** |
| **G4** | F7, F8, F14 | **PARTIAL — demonstration yes, correction thin** | Outcome bias is superbly demonstrated — though ~~in a near-transfer card-and-money task~~ **F7's card task is a hypothetical vignette, re-rated D2, not near-transfer** — and its resistance to mere awareness is triply attested. On whether it can be *trained away* — the actual question the brief asks — the answer I can support is ~~**no evidence retrieved, and the one dedicated paper unreachable**~~ **that one dedicated intervention paper was retrieved at abstract level only (F14); it reports a manipulation that reduced outcome bias (raising intention salience before outcome disclosure) and, counter to its own prediction, that joint evaluation increased outcome weighting. Full text was not obtained.** This remains the dossier's biggest hole and it sits under the project's most-committed position. **Top-up: NOT closed and NOT improved. F15's six trained biases do not include outcome bias; see "Sufficiency after the top-up".** |
| **G5** | F9, F10 (+F5), **F18** | **PARTIAL** | Prevalence: sufficient, with two near-transfer sources (real casino, real card game). Correction by instruction: essentially unevidenced, with one knowledge-level positive attached to a behavioural null. **Top-up: F18 makes the correction half non-empty — one clinical randomised trial, abstract-level, treatment package. Still PARTIAL; see "Sufficiency after the top-up".** |
| **G6** | F11, F12, F13, **F19 (+F15)** | **PARTIAL** | The "what is merely popular" half is answered well and unusually crisply by F11's own conclusion. The "what works" half rests on one abstract-level source (F12) with a load-bearing kind/wicked qualifier and one far-domain randomised experiment (F13) that is this dossier's lowest-confidence citation and produced a two-sided result. **Top-up: F19 reports the reviewed simulation literature contains no controlled experiments; F15 adds an interactive-vs-passive contrast. See "Sufficiency after the top-up".** |

[LANDED C-C7-005 and C-C7-010 (V-C7, editorial): the G4 row above was re-worded in place. Markers are
kept in prose, outside the table, so the row structure is untouched; the table still has six data rows.
Note also that this is the *collector's self-assessment* table and V-C7's independent Axis-2 verdict
differs — V-C7 rules the dossier **INSUFFICIENT**, with only G2 sufficient. That verdict lives in V-C7
and is not transcribed into this table by me; re-scoring the collector's self-assessment is not an
editorial remedy and was not in scope for this pass.]

**Overall: 2 of 6 sufficient, 4 of 6 partial.** No question is empty, and no section was padded to avoid
looking empty. Two of the four partials (G3, G4) are partial *because the honest answer is a negative or
an absence*, which the brief asked for explicitly.

## Overflow leads (found but not collected — record, do not chase)

- **Sezer, Ö., Zhang, T., Gino, F. & Bazerman, M.H. (2016)**, "Overcoming the outcome bias: Making
  intentions matter," *OBHDP*, 137, 13–26 — **the single highest-priority lead in this dossier.** A pass
  with institutional access should retrieve it first; it is the only dedicated outcome-bias intervention
  paper I identified. **[LANDED C-C7-010 (V-C7, editorial — re-wording half): no longer merely a lead.
  The publisher abstract is now held and carried as F14; the abstract-level route is RePEc/IDEAS. What
  remains a lead is the *full text*, which is still the dossier's highest-priority retrieval target.]**
- **McDowell & Jacobs (2017) full text** — needed to settle the G1 magnitude question, the graphical-aid
  conflict (candidate conflict 1), and the provenance of the circulating 24%/4% figures.
- **Larrick, Morgan & Nisbett (1990)**, *Psychological Science*, 1(6), 362–370 — primary evidence on
  cost-benefit-rule training and its transfer to real-life choices; currently present only as F6's
  secondary description.
- **Croson, R. & Sundali, J. (2005)**, *Journal of Risk and Uncertainty*, 30(3), 195–209 — the companion
  paper holding the aggregate streak-length gambler's-fallacy results that F9 explicitly does not carry.
- **Fong, G.T., Krantz, D.H. & Nisbett, R.E. (1986)** and **Fong & Nisbett (1991)** — the primary
  statistical-training-transfer studies underneath F6's review claims.
- **Clinical "cognitive correction" interventions in problem-gambling treatment** — a substantial
  adjacent literature deliberately not searched, as it sits outside this brief's bounds. Flagged so a
  later phase can decide whether to open it rather than rediscover it by accident.
- **Simulation-based-learning meta-analyses in higher education** (e.g. Chernikova et al., 2020, *Review
  of Educational Research*) — large and real, but far enough in domain that citing it here would risk a
  second CFL-007. Recorded, not collected.
- **Kahneman & Tversky (1979)** — cited by F3 and F4 for the description-side comparison figures; not
  read by me, and no claim in this dossier rests on it directly.

## Collector self-QA

- [x] Every major claim has ≥1 source with a locatable supporting location (page, section, table or
      figure named for every finding).
- [x] No claim states strength beyond what its source shows. Source hedges preserved verbatim where they
      exist — F5's "may be" and "on its own", F12's "kind"/"wicked" conditional, F11's "doesn't
      necessarily", F2's abstract-only scope.
- [x] Every finding carries provenance, proposed status bucket, proposed quality tier, **and an explicit
      transfer-distance rating (D1–D4)** against "an adult learning a probabilistic decision rule in a
      card game."
- [x] Every source lists a URL and/or DOI plus PMID/PMC where one exists, for independent re-check.
- [x] Coverage gaps, candidate conflicts, and the complete failed-retrieval table are stated explicitly.
- [x] Empty results are stated as empty. G4's central question and four other targeted searches are
      recorded as **zero findings**, not filled.
- [x] Citation count ~~13~~ **14**, within the 15 hard cap; overflow listed as leads, not collected.
- [x] No citation was added to reach a count. ~~Three sources (F2, F5, F12) are abstract-level~~ **Four
      sources (F2, F5, F12, F14) are abstract-level** and are
      labelled as such at the point of use, with an explicit statement of what they therefore cannot
      support. One (F13) is flagged as the dossier's lowest-confidence citation.
      [LANDED C-C7-010 (V-C7, editorial): count 13 → 14 for F14, which is abstract-level and labelled
      as such at the point of use. F13's self-flag is left exactly as written: V-C7 records it as
      over-cautious (calibration note U-3), but that is an *upgrade*, not one of the ten corrections
      this editorial pass was scoped to land, and I did not re-open F13 myself.]
- [x] Retrieval route disclosed per finding: which sources I read as PDFs I opened myself (F1, F3, F4,
      F6, F10), which I read as HTML through the fetch layer's page reader (F7, F8, F9, F11, F13), and
      which are abstract-only (F2, F5, F12, **F14**).
- [x] Two widely-circulated figures were checked against primary text and **corrected or refused**: the
      "24%/4%" natural-frequency figures (refused — not in the abstract I read) and the "18.7 / 7
      percentage point" description–experience gap figures (corrected to the paper's own 9.7 / −13.4 and
      "about 20 percentage points").
- [x] No activity, curriculum, sequencing, or product change is proposed anywhere in this document.
- [x] Phase 1 dossiers C1–C6 were not reopened, edited, re-verified, or re-collected. No file outside
      `journal/raw/_inbox/foundation-audit-p3/collection/` was written or modified.
      [Note, editorial pass: this checkbox is the **collection** pass's own statement and stands as a
      record of that pass. The subsequent editorial pass wrote this file and one landing record at
      `journal/raw/_inbox/foundation-audit-p3/landing/L-C7.md`, and nothing else.]

---

## Landing record — editorial corrections from V-C7

This dossier was corrected in place by an editorial pass on 2026-07-22 against verification record
`journal/raw/_inbox/foundation-audit-p3/verification/V-C7.md`. Corrections **C-C7-001 through C-C7-009**
and the **re-wording half of C-C7-010** are landed above, each marked in prose at its anchor as
`[LANDED C-C7-00N (V-C7, editorial): …]`, with superseded wording struck rather than deleted.

**Still open and deliberately not landed here:** the `collection` half of **C-C7-010** — obtaining the
Sezer et al. (2016) **full text**. The editorial pass did not attempt it. V-C7's Axis-2 sufficiency
verdict (INSUFFICIENT; leads S-2 through S-8) is also untouched by this pass and requires a bounded
collection pass, not editing.

Per-correction detail, including which sources the editor personally re-opened, is in
`journal/raw/_inbox/foundation-audit-p3/landing/L-C7.md`.

---

# Top-up collection pass — F15–F20

> Second collector, fresh instance (Claude Opus 4.8), 2026-07-22. **Append-only.** Nothing in F1–F14,
> in any `[LANDED …]` marker, or in any struck-through superseded wording above was altered by this
> pass. Both pre-existing tables retain their original row counts; every note this pass adds sits in
> prose outside a table.
> Authority: the `collection` remedy in V-C7's Axis-2 verdict (bounded, ~5 new sources; S-2 and S-4
> for G3/G4/G6, S-3 for G1, S-5 for G5, S-7 or S-8 for G6; **G2 not reopened**; F1–F14 not
> re-verified or re-collected).
> Tooling constraint (structural, disclosed): this collector also had **no Bash tool**. Retrieval was
> by web fetch; PDFs the fetch layer saved to disk were then read page by page as rendered pages.
> **Correction to a lead label:** V-C7's lead S-4 names the field-transfer paper "Morewedge & Carey".
> That is a mis-parse of the author name *Carey K. Morewedge*. The paper is **Sellier, Scopelliti &
> Morewedge (2019)**, and is carried below as F16.

## G3 / G4 / G6 — the interactive-training evidence

#### F15: Two longitudinal experiments found that a **single** ~60-minute session of an interactive computer game reduced six cognitive biases by medium-to-large amounts that persisted 8–12 weeks, and outperformed a passive instructional video on overall bias — but the design has **no untrained control condition**, the biases trained include none of this project's target concepts, and on *bias knowledge* the video beat the game.
- Provenance: PUBLISHED (accepted version of the article of record)
- Proposed status bucket: **Evidence-backed**
- Proposed evidence-quality tier: **Q2** — two pre-registered-to-sponsor longitudinal experiments,
  random assignment to training condition, pre/post/follow-up repeated measures, reliability-tested
  scales, independent third-party re-analysis. **Not Q1**: no untrained control arm (see caveats).
- Transfer distance: **D3 (far) on content, and the dossier's closest match on *format*.** The
  participants are adults; the material is cognitive-bias scales built around intelligence-analysis
  and everyday-judgment scenarios, not a game of chance and not a probabilistic decision rule in a
  card game. What *is* near is the delivery vehicle: a single-session interactive computer game with
  personalised feedback, practice items, and (in Experiment 2) adaptive extra practice on failure.
  **No finding in this dossier is closer to this product's *format*; none of its *content* is close.**
  I flag explicitly that format-nearness is not content-nearness, and that reading F15 as evidence
  about teaching probability or EV would be exactly the CFL-007 error the brief forbids.
- Source: Morewedge, C.K., Yoon, H., Scopelliti, I., Symborski, C.W., Korris, J.H. & Kassam, K.S.
  (2015). "Debiasing Decisions: Improved Decision Making With a Single Training Intervention."
  *Policy Insights from the Behavioral and Brain Sciences*, 2(1), 129–140.
  DOI 10.1177/2372732215600886.
- Access: **full text read.** The accepted version at City Research Online
  (`https://openaccess.city.ac.uk/id/eprint/12324/1/Debiasing_Decisions_PIBBS.pdf`) was saved locally
  by the fetch layer and I read pp. 1–29 of the manuscript as **rendered PDF pages**, including the
  abstract, Highlights, both Method sections, both Results sections, Conclusions, Figure 1 (design)
  and Figure 2 (all bias-commission means). **This is the accepted manuscript, not the publisher's
  typeset version**; page numbers below are the manuscript's own running numbers, not journal pages.
- Supporting locations: p. 2 (abstract); p. 11 (funding, bias list); p. 12 (intervention lengths,
  Fischhoff's four procedures); p. 13 (game structure, after-action review); pp. 14, 20 (participants);
  pp. 16–17 (testing procedure, follow-up timing); pp. 17–19 (Experiment 1 results); pp. 22–23
  (Experiment 2 results); p. 25 (percentage summary).
- Claimed strength — exact figures as the paper reports them:
  - **Abstract, verbatim (p. 2):** "We report the results of two longitudinal experiments that found
    medium to large effects of one-shot debiasing training interventions. Participants received a
    single training intervention, played a computer game or watched an instructional video, which
    addressed biases critical to intelligence analysis (in Experiment 1: bias blind spot, confirmation
    bias, and fundamental attribution error; in Experiment 2: anchoring, representativeness, and social
    projection). Both kinds of interventions produced medium to large debiasing effects immediately
    (games ≥ -31.94% and videos ≥ -18.60%) that persisted at least 2 months later (games ≥ -23.57% and
    videos ≥ -19.20%). Games, which provided personalized feedback and practice, produced larger
    effects than did videos."
  - **Populations, verbatim (p. 14, Experiment 1):** "Two hundred and seventy-eight people in a
    convenience sample recruited in Pittsburgh, PA (132 women; *M*age = 24.5, *SD* = 8.52) received $30
    for completing a laboratory training session, and an additional $30 payment for completing a
    follow-up test online." And: "A total of 243 participants successfully completed the laboratory
    portion of the experiment (Game *n* = 160; Video *n* = 83); 196 successfully completed the online
    follow-up (Game *n* = 130; Video *n* = 66)."
  - **Experiment 2 population, verbatim (p. 20):** "Two hundred and sixty-nine people in a convenience
    sample recruited in Pittsburgh, PA (155 women; *M*age = 27.8, *SD* = 12.01)". And: "A total of 238
    participants successfully completed the laboratory portion of the experiment (Game *n* = 156;
    Video *n* = 82); 192 successfully completed the online follow-up (Game *n* = 126; Video *n* = 66)."
  - **Retention intervals** — Experiment 1 follow-up at **8 weeks**, verbatim (p. 16): "To measure the
    persistence of debiasing training, eight weeks from the day in which he or she completed the
    laboratory session, each participant received a personalized link via email to complete the
    follow-up measure". Experiment 2 at **12 weeks**, verbatim (p. 21): "The experiment adhered to the
    same testing procedure as described in Experiment 1, with the exception that the follow-up was
    administered 12 weeks after participants completed their laboratory session."
  - **Intervention length, verbatim (p. 12):** "Attempting to reduce these biases with videos and games
    allowed us to administer short, one-shot training interventions (i.e., approximately 30 and 60
    minutes, respectively)".
  - **Experiment 1 overall bias, verbatim (pp. 17–18):** "Overall, training effectively reduced
    cognitive bias immediately and two months later, *F*(1, 241) = 439.23, *p* < .001 and *F*(1, 194) =
    179.88, *p* < .001, respectively. Debiasing effect sizes (Rosenthal & Rosnow, 1991) for overall bias
    were large for the game (*d*pre-post = 1.68 and *d*pre-followup = 1.11) and medium for the video
    (*d*pre-post = .69 and *d*pre-followup = .66). The game more effectively debiased participants than
    did the video immediately and two months later, *F*(1, 240) = 68.8, *p* < .001 and *F*(1, 193) =
    12.69, *p* < .001, respectively."
  - **Experiment 2 overall bias, verbatim (p. 22):** "Debiasing effect sizes for overall bias were large
    for both the game (*d*pre-post = 1.74 and *d*pre-followup = 1.16) and video (*d*pre-post = 1.75 and
    *d*pre-followup = 1.07). However, the game more effectively debiased participants than did the video
    immediately, *F*(1, 235) = 13.44, *p* < .001, and marginally three months later, *F*(1, 189) = 3.66,
    *p* = .057."
  - **Generalisation to untrained material (Experiment 1), verbatim (p. 19):** "More important, compared
    to their pretest scores, participants exhibited reduced confirmation bias for untrained facets at
    posttest and follow-up, *t*(159) = 10.05, *p* < .001, *d* = .79 and *t*(129) = 7.42, *p* < .001,
    *d* = .65, respectively." And, on the trained-vs-untrained contrast: "there were no significant
    differences between trained and untrained facets at follow-up, *t* < 1".
  - **Summary percentages, verbatim (p. 25):** "Participants who played our games exhibited large
    reductions in cognitive bias immediately (-46.25% and -31.94%), which persisted at least 2 or 3
    months later (-34.76% and -23.57%) in Experiments 1 and 2, respectively. Participants who watched
    the videos exhibited medium and large reductions immediately (-18.60% and -25.70%), which persisted
    at least 2 or 3 months later (-20.10% and -19.20%) in Experiments 1 and 2, respectively."
- **What the same results sections say that cuts the other way — read this before citing F15 as
  "games beat videos".** All four items below are in the paper's own Results, and three sit in the same
  paragraphs as the headline figures:
  - **Anchoring: no game advantage at all.** Verbatim (p. 22): "Debiasing effect sizes for anchoring were
    medium for the game (*d*pre-post = .70 and *d*pre-followup = .63) and large to medium for the video
    (*d*pre-post =.80 and *d*pre-followup = .66). The game and video were equally effective immediately
    and three months later, *F*s < 1, *p*s > .62." On this one bias the video's point estimates are the
    larger of the two.
  - **Representativeness: video's immediate point estimates are also larger.** Verbatim (p. 22):
    "Debiasing effect sizes for representativeness were large for both the game (*d*pre-post = 1.51 and
    *d*pre-followup= 1.05) and video (*d*pre-post = 1.80 and *d*pre-followup = 1.09)." The paper
    nonetheless reports the game as more effective on the covariate-adjusted between-condition test
    (p. 23): "The game more effectively debiased participants than did the video immediately, *F*(1, 235)
    = 10.85, *p* < .01, but was no more effective three months later, *F* < 1, *p* = .37."
  - **On knowledge, the video won — in both experiments.** Verbatim (Experiment 1, pp. 19–20): "The video
    more effectively taught participants to recognize and discriminate bias than did the game
    immediately, *F*(1, 240) = 15.52, *p* < .001, but was no more effective two months later, *F* < 1."
    Verbatim (Experiment 2, p. 23): "The video more effectively taught participants to recognize and
    discriminate bias than did the game immediately, *F*(1, 235) = 11.07, *p* < .001, but was no more
    effective three months later, *F* < 1." **Interactive practice beat passive presentation on
    *behaviour* (bias commission) while losing to it on *knowledge* (bias recognition).** That
    dissociation is the paper's, not mine, and it is not mentioned in the abstract.
  - **The authors do not claim to know why the game won.** Verbatim (p. 25): "The greater efficacy of the
    games than the videos suggest that personal feedback and practice increase the debiasing effects of
    training, but more research is needed to determine precisely why it was more effective."
- Caveats / population / domain limits:
  - **No untrained control condition — the most important limit, and it is my observation, not the
    paper's.** In the Method and Results sections I read (pp. 14–23) participants are randomly assigned
    **only** to game or video; I found no description of a no-training arm, and Figure 2 plots only Game
    and Video. The headline *d* values are therefore **within-condition pre-to-post change**, not change
    relative to an untrained group, and the only *between*-condition contrast the design supports is
    game vs video. Repeated exposure to the measures is partly mitigated — verbatim (p. 17): "The
    specific bias scales serving as the pretest, posttest, and follow-up measures of bias commission and
    bias knowledge were counterbalanced across participants" — but counterbalancing interchangeable forms
    is not a substitute for a control arm. **This dossier therefore may not cite F15 as showing that
    training beats no training; it shows that both formats produced large pre-post change and that the
    game produced more of it than the video.** The paper does not state this as a limitation.
  - **None of the six trained biases is a target concept of this project.** They are bias blind spot,
    confirmation bias, fundamental attribution error, anchoring, representativeness and social
    projection. **Outcome bias is not among them; gambler's fallacy is not among them; expected value is
    not taught; variance is not taught.** Representativeness is the nearest neighbour to the law of small
    numbers, and the game did teach at least one sampling rule — verbatim (p. 13): "relevant statistical
    rules (e.g., large samples are more accurate representations than small samples)" — but the paper
    reports no measure of variance or EV understanding.
  - **Funder and authorship disclosure, verbatim (p. 11):** "The experiments, funded by Intelligence
    Advanced Research Projects Activity BAA-11-03, tested whether debiasing training could produce
    persistent reductions in six cognitive biases identified by our program sponsor as affecting all
    types of intelligence analysis." Two co-authors are at the contractors that built the training
    materials (Symborski at Leidos; Korris at Creative Technologies Incorporated), and the paper credits
    the game itself to an author group including them — verbatim (p. 15): "(produced by Symborski,
    Barton, Quinn, Morewedge, Kassam, & Korris, 2014)". **The evaluated intervention was built by the
    evaluating authors under a sponsor contract.** I found **no** Declaration of Conflicting Interests
    section in the accepted manuscript pp. 1–29; I cannot say whether the typeset version carries one.
    Partially offsetting, verbatim (p. 14): "Sample sizes were declared in advance to our government
    sponsor, and independent third-party analyses of the data were performed that confirmed the accuracy
    of our results (Kopecky, McKneely, & Bos, 2015)."
  - Attrition from lab session to follow-up is roughly one fifth in both experiments (243→196; 238→192),
    and the Game and Video arms are unequal in size by design of the recruitment, not by 1:1 randomisation
    ratio. Some Experiment 2 subscale reliabilities are low — verbatim (p. 21): "Anchoring (Cronbach's α):
    .60pretest, .52 posttest, and .62follow-up."
  - Convenience samples in one US city; mostly college-educated (80.2% and 94.1% "had some college
    education"); paid $60 in total, which is a substantial incentive.

#### F16: A field study of the **same game** found its debiasing transferred to a real, unannounced graded business decision weeks later — trained students were 29% less likely to choose the inferior hypothesis-confirming solution — but assignment was **not randomised**, the study was **not preregistered**, and the bias transferred was confirmation bias, not EV or outcome bias.
- Provenance: PUBLISHED
- Proposed status bucket: **Evidence-backed**
- Proposed evidence-quality tier: **Q3** — field quasi-experiment with a surreptitious behavioural
  outcome and extensive robustness checks, but assignment is by natural scheduling variance among
  self-selected volunteers, not random, and the analysis plan was not preregistered.
- Transfer distance: **D3 (far)** — adults (graduate business students), and the measured decision is a
  written business-case judgement about launching a race under engine-failure risk. It *is* a decision
  under uncertainty with an objectively better option, which is structurally closer to a strategy
  decision than a questionnaire vignette; it is not a game of chance, no money was staked, and no
  probability or EV instruction was given.
- Source: Sellier, A.-L., Scopelliti, I. & Morewedge, C.K. (2019). "Debiasing Training Improves Decision
  Making in the Field." *Psychological Science*, 30(9), 1371–1379. DOI 10.1177/0956797619861429.
- Access: **full text read.** The Wharton-hosted PDF
  (`https://marketing.wharton.upenn.edu/wp-content/uploads/2019/12/01.06.2020-Morewedge-Carey-PAPER-DebiasingTransferstotheField.pdf`)
  was saved locally by the fetch layer and I read pp. 1371–1378 as **rendered PDF pages**, including the
  abstract, Method, Results, Figure 1, Table 1, Discussion, funding and conflict declarations, and both
  footnotes.
- Supporting locations: p. 1371 (abstract); p. 1372 (participants, intervention); p. 1373 (case,
  procedure); p. 1374 (exclusions, scale measures, case solutions); p. 1375 (selection-effect tests);
  p. 1377 (process tests); p. 1378 (discussion, funding, conflicts, open practices, footnote 1).
- Claimed strength — verbatim:
  - **Abstract, in full (p. 1371):** "The primary objection to debiasing-training interventions is a lack
    of evidence that they improve decision making in field settings, where reminders of bias are absent.
    We gave graduate students in three professional programs (*N* = 290) a one-shot training intervention
    that reduces confirmation bias in laboratory experiments. Natural variance in the training schedule
    assigned participants to receive training before or after solving an unannounced business case
    modeled on the decision to launch the Space Shuttle Challenger. We used case solutions to
    surreptitiously measure participants' susceptibility to confirmation bias. Trained participants were
    29% less likely to choose the inferior hypothesis-confirming solution than untrained participants.
    Analysis of case write-ups suggests that a reduction in confirmatory hypothesis testing accounts for
    their improved decision making in the case. The results provide promising evidence that
    debiasing-training effects transfer to field settings and can improve decision making in professional
    and private life."
  - **Main result, verbatim (p. 1374):** "Logistic regression revealed that trained participants were
    significantly less likely to choose the hypothesis-confirming decision to race (58.8%) than were
    untrained controls (72.2%), β = −0.60, Wald χ²(1) = 5.23, *p* = .022, exp(β) = 0.549, 95% CI [0.33,
    0.92]."
  - **Population, verbatim (p. 1372):** "Three hundred eighteen graduate business students at HEC Paris
    were enrolled in a course in which we administered a modified version of the 'Carter Racing' case".
    And: "Participants were students enrolled in three different graduate programs: those completing a
    master of business administration degree (*n* = 217), a master of science degree in entrepreneurship
    (*n* = 64), or a master of science degree in strategic management (*n* = 35)."
  - **Assignment, verbatim (p. 1373):** "The timing of the session in which each participant received
    training determined his or her assignment to either the trained condition or the untrained condition.
    The average lag in the trained condition between training and case completion was 17.96 days
    (*SD* = 19.86)."
  - **Durability within the field design, verbatim (p. 1374):** "The debiasing effects of the game were no
    weaker in the short-lag group (56.8%) or long-lag group (63.2%), 95% CI for the mean difference =
    [−2.07%, 9.10%], χ²(1, *N* = 182) = 0.65, *p* = .419."
  - **The authors' own framing of what the design does and does not show, verbatim (p. 1378):** "The method
    of condition assignment obviously raises selection concerns, but they are allayed by two analyses."
    And: "More research is needed to explain why this game-based training intervention improved decision
    making in a novel paradigm and domain more effectively than has specialized expert training (Milkman
    et al., 2009)."
- **Numerical correction to a circulating figure.** A search-result synopsis I encountered during this
  collection reported this study's effect as "**19%** less likely." **The paper says 29%**, in both the
  abstract (p. 1371) and the Discussion (p. 1378, verbatim: "Trained students were 29% less likely to
  choose an inferior hypothesis-confirming case solution than were untrained students."). The 19% figure
  is not in the paper. This dossier reports 29%.
- Caveats / population / domain limits:
  - **Not randomised and not preregistered.** Assignment is by scheduling; participation in the training
    was voluntary. Verbatim (p. 1378): "The design and analysis plans for this study were not
    preregistered." The authors do run selection tests (CRT, GPA, GMAT covariates; 2/4/6-day windows) and
    report the effect survives them, and they report a real imbalance — verbatim (p. 1375): "It is
    interesting to note that CRT scores were significantly higher for trained participants (*M* = 2.44,
    95% CI = [2.31, 2.57]) than untrained participants (*M* = 2.18, 95% CI = [2.00, 2.36])".
  - **Twenty-two untrained "controls" were no-shows**, verbatim (p. 1374): "Twenty-two participants in the
    untrained control condition (20.4%) solved the case but did not complete a gaming session; they signed
    up for a session but did not show up for that session."
  - The transferred bias is **confirmation bias only**. Nothing in this study concerns expected value,
    variance, outcome bias, or any misconception in G5.
  - Funding and conflicts, verbatim (p. 1378): "The HEC Foundation provided financial support for this
    research." and "The author(s) declared that there were no conflicts of interest with respect to the
    authorship or the publication of this article." Note that the game is proprietary — verbatim
    (p. 1372): "We do not provide the proprietary intervention, but a general summary is publicly
    available (Symborski et al., 2017)" — which limits independent replication, and that the third
    author is an author of F15.

## G1 — the ceiling on the natural-frequency advantage

#### F17: An empirical study reports that even in the format that helps, **roughly three quarters of participants still fail** the Bayesian task, and identifies the mechanism: about half of participants translate natural frequencies *back into probabilities* rather than using them.
- Provenance: PUBLISHED (open access)
- Proposed status bucket: **Evidence-backed**
- Proposed evidence-quality tier: **Q3** — two convenience samples of students, within-participant
  comparison of presentation format against self-chosen calculation format, with coded solution
  algorithms; no random assignment to a training condition and no control group.
- Transfer distance: **D3 (far)** — adults (mostly trainee mathematics teachers at one German
  university), classic Bayesian inference word problems, not a game of chance.
- Source: Weber, P., Binder, K. & Krauss, S. (2018). "Why Can Only 24% Solve Bayesian Reasoning Problems
  in Natural Frequencies: Frequency Phobia in Spite of Probability Blindness." *Frontiers in Psychology*,
  9:1833. DOI 10.3389/fpsyg.2018.01833.
- Access: **full text read via the fetch layer's page reader** at
  `https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2018.01833/full`.
  **Retrieval-route disclosure and a flag:** HTML, not a PDF I opened myself. My **first** extraction
  returned an abridged abstract presented as complete and a participant total that the paper does not
  print; I discarded that pass entirely and re-read the page twice more with strict
  literal-quotation-only prompts. Everything quoted below comes from those later passes. A verifier
  should still re-open this page.
- Supporting locations: Abstract; Sample; Results; Discussion.
- Claimed strength — verbatim:
  - **Abstract, in full:** "For more than 20 years, research has proven the beneficial effect of natural
    frequencies when it comes to solving Bayesian reasoning tasks (Gigerenzer and Hoffrage, 1995). In a
    recent meta-analysis, McDowell and Jacobs (2017) showed that presenting a task in natural frequency
    format increases performance rates to 24% compared to only 4% when the same task is presented in
    probability format. Nevertheless, on average three quarters of participants in their meta-analysis
    failed to obtain the correct solution for such a task in frequency format. In this paper, we present
    an empirical study on what participants typically do wrong when confronted with natural frequencies.
    We found that many of them did not actually *use* natural frequencies for their calculations, but
    translated them back into complicated probabilities instead. This switch from the intuitive
    *presentation format* to a less intuitive *calculation format* will be discussed within the framework
    of psychological theories (e.g., the Einstellung effect)."
  - **Sample, verbatim:** "We recruited *N* = 114 students from the University of Regensburg (Bavaria) in
    summer 2016, and *N* = 69 in winter 2017/2018". And: "Since each participant worked on two tasks, we
    obtained a total of 360 Bayesian inferences including participants' detailed solution algorithms."
    **I do not state a combined participant total: the paper, in what I read, does not print one, and
    the arithmetic would be mine.** This is the same defect class as C-C7-006 and I decline to repeat it.
  - **This study's own performance rates, verbatim:** "While 20% of the Bayesian tasks in probability
    format were solved correctly across both contexts, the performance rate for the tasks presented in
    frequency format was 36%".
  - **The mechanism, verbatim:** "when presented with a task in natural frequency format (second and
    fourth bars of Figure 2), almost half of participants (49%) nevertheless chose to apply
    probabilities"; "only 18% across both contexts chose to translate the problem into natural
    frequencies"; "natural frequencies represented the preferred calculation format in only about one
    third (34%) of all 360 Bayesian tasks".
  - **The best cell, verbatim:** "the highest performance was detected when both variables *presentation
    format* and *calculation format* were natural frequencies (61% correct responses)".
  - **Discussion, verbatim:** "We found that the majority of participants do not actively use natural
    frequencies in Bayesian reasoning tasks. Even if the task is presented in the intuitive natural
    frequency format (with a neutral question asking for proportions), about half of the participants
    still prefer calculating with probabilities instead. Therefore, and since the 'standardized'
    probability format is the 'sine qua non' in probability theory, the results of our study reveal the
    Einstellung effect in Bayesian reasoning situations (Luchins, 1942; Luchins and Luchins, 1959; McCloy
    et al., 2007)."
- **Explicit non-claim, and it matters — this is what F2 refused and this finding does *not* undo.** The
  "24% vs 4%" figures in the sentence above are **Weber, Binder & Krauss reporting what McDowell & Jacobs
  (2017) found.** That is a **secondary attribution**. F2's refusal to cite those figures as read from
  McDowell & Jacobs stands, and this finding does not license citing them as if the meta-analysis had
  been opened. What F17 establishes at first hand is (a) that a peer-reviewed source in this literature
  attributes those figures to that meta-analysis, and (b) F17's **own** 20%/36%/49%/61% data. **The
  meta-analysis itself remains unread by this dossier (failed-retrieval rows 1 and 2).**
- **What this closes for G1, and what it does not.** It supplies the brief's "under what conditions does
  the advantage disappear" half with a concrete ceiling: the format advantage is real and, in this
  study's own data, roughly a 16-percentage-point gain — from a base at which most people still fail.
  It does **not** test any training intervention, so it does not bear on F1's durability result, and it
  does not resolve the F1-vs-F2 graphical-aid conflict, which remains open.
- Caveats / population / domain limits: students at a single German university, most of them enrolled in
  a mathematics-teaching programme and therefore **unusually schooled in probability notation** — which
  is plausibly the source of the Einstellung effect the authors report, and makes this population
  arguably *less* representative of a lay adult learner than the paper's framing implies. That is my
  inference and is labelled as such. No control condition; no training; no retention measure.

## G5 — whether instruction corrects the misconceptions

#### F18: A randomised wait-list-controlled trial of a cognitive treatment whose **first active ingredient is correcting erroneous perceptions of randomness** reported significant change on all outcome measures — including gamblers' *perception of control* — with gains maintained at 6 and 12 months.
- Provenance: PUBLISHED
- Proposed status bucket: **Evidence-backed (abstract-level access only)**
- Proposed evidence-quality tier: **Q2** for the design as the abstract describes it (randomised
  allocation to treatment or wait-list control, multiple outcome measures, 6- and 12-month follow-ups),
  **access-limited to Q-abstract**.
- Transfer distance: **D2–D3.** Adults; the content *is* randomness and the illusion of control in real
  gambling, which is nearer this project's subject matter than anything else in G5 that involves
  instruction. But the population is **clinically diagnosed pathological gamblers**, the delivery is
  individual therapy rather than instruction to a learner, and the outcome is gambling pathology, not
  decision quality in a game. **A healthy adult learning basic strategy is not this population**, and
  reading F18 as "instruction fixes the gambler's fallacy in normal learners" would overreach it.
- Source: Ladouceur, R., Sylvain, C., Boutin, C., Lachance, S., Doucet, C., Leblond, J. & Jacques, C.
  (2001). "Cognitive treatment of pathological gambling." *Journal of Nervous and Mental Disease*,
  189(11), 774–780. DOI 10.1097/00005053-200111000-00007. PMID 11758661.
- Access: **ABSTRACT-LEVEL ONLY — full text NOT obtained.** The abstract was read at the **PubMed**
  record. My first extraction paraphrased the middle of the abstract; I re-fetched with a
  literal-output-only prompt and the text below is from that second pass. I did not attempt the
  journals.lww.com or ovid.com publisher routes, both of which I expect to be paywalled; that is a
  choice, not a barrier, and it is disclosed as such.
- Supporting location: Abstract (PubMed, PMID 11758661).
- Claimed strength, verbatim, in full: "This study evaluated the efficacy of a cognitive treatment
  package for pathological gambling. Sixty-six gamblers, meeting DSM-IV criteria for pathological
  gambling, were randomly assigned to treatment or wait-list control conditions. Cognitive correction
  techniques were used first to target gamblers' erroneous perceptions about randomness and then to
  address issues of relapse prevention. The dependent measures used were the South Oaks Gambling Screen,
  the number of DSM-IV criteria for pathological gambling met by participants, as well as gamblers'
  perception of control, frequency of gambling, perceived self-efficacy, and desire to gamble. Posttest
  results indicated highly significant changes in the treatment group on all outcome measures, and
  analysis of data from 6- and 12-month follow-ups revealed maintenance of therapeutic gains.
  Recommendations for clinical interventions are discussed, focusing on the cognitive correction of
  erroneous perceptions toward the notion of randomness."
- **What abstract-level access cannot support, and no downstream work may claim from F18:** effect sizes,
  the size and handling of attrition, the number of therapy sessions, whether the wait-list control was
  followed for the same 12 months (the abstract does not say), the psychometrics of the
  perception-of-control measure, or which component of the package produced the change. **In particular,
  the design cannot separate the randomness-correction component from relapse prevention and from
  non-specific therapy effects, because the abstract describes a single treatment *package*.** The
  abstract also reports "highly significant" without a single test statistic.
- **What this does and does not do to the dossier's G5 position.** The first collection pass recorded
  correction-by-instruction as "essentially unevidenced" and said so partly because it had **declared the
  clinical literature out of scope**. V-C7 ruled that self-narrowing an insufficiency, and it was: an
  adult randomised trial whose named first ingredient is correcting beliefs about randomness does exist,
  and here it is. **It is not, however, evidence that a training game teaches a non-clinical adult to
  stop committing the gambler's fallacy.** The honest statement is that the correction half of G5 is no
  longer empty, and is now thin, clinical, and abstract-level.
- Caveats / population / domain limits: 2001; N = 66 total across both arms, so cell sizes are small;
  treatment-seeking clinical sample recruited in Quebec; the comparator is a wait-list, which controls
  for time but not for therapist attention or expectancy.

## G6 — what the simulation literature actually supports

#### F19: A 2024 integrative review of computer simulations for teaching statistical sampling finds the benefits **tentative and confined to general "habits of mind"**, documents persistent failure on the specific concepts a variance trainer would need — including the law of large numbers and the absolute-vs-proportional sample-size misconception — and reports that **not one** of the studies it reviewed was a controlled experiment.
- Provenance: PUBLISHED (open access)
- Proposed status bucket: **Evidence-backed**
- Proposed evidence-quality tier: **Q3** — an integrative/narrative review with a declared theoretical
  frame (grounded cognition), **not** a systematic review with a search protocol and **not** a
  meta-analysis. Its own headline methodological finding is that its evidence base contains no controlled
  experiments, which caps how strongly anything in it can be claimed.
- Transfer distance: **D3 (far)** — students in statistics education, sampling distributions and the law
  of large numbers. The *concept* is exactly the one a blackjack variance trainer must teach; the
  population is classroom learners and the setting is instruction, not play. Note the review does not
  restrict itself to adults, so I do not claim an adult-only population for it.
- Source: Gok, S. & Goldstone, R.L. (2024). "How do students reason about statistical sampling with
  computer simulations? An integrative review from a grounded cognition perspective." *Cognitive
  Research: Principles and Implications*, 9, article 33. DOI 10.1186/s41235-024-00561-x. PMC11139845.
- Access: **read via the fetch layer's page reader** at
  `https://pmc.ncbi.nlm.nih.gov/articles/PMC11139845/`. **Retrieval-route disclosure:** HTML, not a PDF I
  opened myself, and read in **two** passes — a first general pass and a second pass restricted to
  literal quotation only. Only material that survived the second pass is quoted below; the first pass's
  synthesis of "design features" is **not** carried into this finding, because it was the tool's
  organisation of the paper rather than the paper's own sentences.
- Supporting locations: Abstract; the review's discussion of habits of mind; the methodological note on
  study designs; the discussion of simulations and statistical inference.
- Claimed strength — verbatim:
  - **Abstract, in full:** "Interactive computer simulations are commonly used as pedagogical tools to
    support students' statistical reasoning. This paper examines whether and how these simulations enable
    their intended effects. We begin by contrasting two theoretical frameworks—*dual processes* and
    *grounded cognition*—in the context of people's conceptions about statistical sampling, setting the
    stage for the potential benefits of simulations in learning such conceptions. Then, we continue with
    reviewing the educational literature on statistical sampling simulations. Our review tentatively
    suggests benefits of the simulations for building *statistical habits of mind*. However, challenges
    seem to persist when more specific concepts and skills are investigated. With and without simulations,
    students have difficulty forming an aggregate view of data, interpreting sampling distributions,
    showing a process-based understanding of the law of large numbers, making statistical inferences, and
    context-independent reasoning. We propose that grounded cognition offers a framework for understanding
    these findings, highlighting the bidirectional relationship between perception and conception,
    perceptual design features, and guided perceptual routines for supporting students' meaning making
    from simulations. Finally, we propose testable instructional strategies for using simulations in
    statistics education."
  - **The methodological ceiling on the whole reviewed literature, verbatim:** "Notably, none of the
    studies included controlled experiments."
  - **What "habits of mind" means here, verbatim:** "An important learning objective in basic statistical
    education is developing habits of mind, defined as the ability to spontaneously bring statistical
    knowledge to bear when one encounters critical claims about data (Ridgway, 2022)."
  - **Where simulations fall short, verbatim:** "While simulations might aid with the process of taking
    multiple samples, they may be less helpful in encapsulation of the process to a single entity, which
    is a crucial step for statistical inference (Eliason & Jones, 2020)."
- **Why this is the most useful G6 item in the dossier despite being only Q3.** The brief asks G6 to
  separate "what works" from "what is merely popular". F11 (delMas et al., 1999) answered that from a
  single classroom programme a quarter-century ago. F19 reports that the field's *whole* reviewed evidence
  base still contains no controlled experiment, and that the specific concept nearest this product's need
  — a process-based understanding of the law of large numbers — is among the things students still fail
  "with and without simulations". **The dossier's existing G6 gap statement ("no meta-analysis on the
  target question") is confirmed rather than overturned, and now has a stated reason.**
- Caveats / population / domain limits: an integrative review, not systematic; the authors advance a
  theoretical position (grounded cognition) and the review is organised to support it, so selection of
  cited work is not protocol-driven; the review's forward-looking instructional proposals are explicitly
  labelled by the authors as untested ("we propose testable instructional strategies"), and **nothing in
  this dossier may cite those proposals as findings**. Sampling distributions are not variance-in-a-card-
  game; the concept maps, the task does not.

## G3 — a blackjack-specific counter-position

#### F20: A mixed-methods study of casino blackjack argues that players use a **transparently false heuristic** — assume every upcoming card is a ten — that is easier to learn than optimal strategy and is associated with better expected returns, and contends that inferring expected value from subjective probability may be "both uncommon and non-normative" even in blackjack.
- Provenance: PUBLISHED
- Proposed status bucket: **Evidence-backed (abstract-level access only)** for the study's existence,
  claims and method; **the EV contention itself is the author's theoretical argument, not a measured
  result**, and is recorded as such.
- Proposed evidence-quality tier: **Q4** — single-author mixed-methods work combining ethnography with
  structured player interviews; no experiment, no control, no random sampling of players. Its
  "associated with better expected returns" is an association the author reports, and I could not read
  the analysis behind it.
- Transfer distance: **D1 (near) — and it is the only D1 *blackjack* item anywhere in this dossier.**
  Adults, real casino blackjack, real money, the actual hit/stand decision. Note carefully: near
  transfer buys relevance, not strength. **This is a D1 source at a low quality tier**, the inverse of
  most of this dossier, and the two properties must be cited together.
- Source: Bennis, W.M. (2025). "A heuristic based on transparently false likelihoods improves gamblers'
  expected value in the wild." *Mind & Society*. DOI 10.1007/s11299-025-00346-9.
- Access: **ABSTRACT-LEVEL ONLY — full text NOT obtained.** `link.springer.com` returned a **303 redirect
  to `idp.springer.com`** (the same barrier already recorded at failed-retrieval row 7 for a different
  Springer item); following the chain landed on a `?error=cookies_not_supported` page which serves the
  abstract but not the article. My first extraction from that page returned a **paraphrase with quoted
  fragments spliced in** — a tool-generated summary, not a source — and I discarded it in full; the text
  below is from a second pass with a literal-output-only prompt.
- Supporting location: Publisher abstract (Springer article page, *Mind & Society*).
- Claimed strength, verbatim, in full: "Casino blackjack players learn a simple heuristic that helps them
  decide when to take additional cards, the most common blackjack decision. The heuristic assumes that all
  upcoming cards will be 10-value cards, even though that assumption is true fewer than one in three
  times. The heuristic results in systematic error, but it is also adaptive: it is easier to learn than
  the optimal strategy, the cost of using it is trivial, and its use is associated with better expected
  returns. The heuristic helps explain inconsistent previous findings about blackjack likelihood judgments
  and decision biases. The research relies on mixed methods including qualitative data from 1.5 years of
  ethnographic fieldwork as a blackjack dealer and player, and quantitative data from interviews with
  players about how they play each blackjack hand. The heuristic is used as a case to support several
  theoretical contentions: (a) despite established precedent, gambling is not a good domain-general
  metaphor for decision making under risk or uncertainty; (b) even in a small-world domain where outcome
  likelihoods can be calculated and monetary outcomes are unambiguous, using subjective probability to
  infer expected value may be both uncommon and non-normative; and (c) a focus on narrow, domain- and
  culture-specific heuristics and biases—despite their limited scope—offers valuable lessons about how,
  and how well, people make decisions."
- **Why this is carried, and the direction it points.** G3 asks whether EV instruction transfers to
  actual choices. F5 supplied a behavioural null. F20 supplies something different and, for this project,
  more uncomfortable: a claim from inside the target domain that **skilled real play may not run on EV
  inference at all**, and that a systematically false but cheap heuristic is what players actually
  acquire. If that is right, an EV-first curriculum is not merely hard to transfer — it may be modelling
  the wrong cognitive object. **I record this as a live counter-position, not as a settled result**: it is
  Q4, single-author, abstract-level, and the author frames (b) as a "theoretical contention" he uses the
  case to *support*, not as a finding he measured.
- **What abstract-level access cannot support, and no downstream work may claim from F20:** how many
  players were interviewed, how "use of the heuristic" was classified, how expected returns were computed,
  what the association's magnitude or uncertainty is, whether any comparison to basic strategy was made,
  and whether the fieldwork casino's rules resemble the shoe game this project models. **Nothing here may
  be cited as a number.**
- **Scope note.** This is a blackjack source, and C6 is the Phase 1 dossier that holds blackjack-specific
  evidence. **C6 was not reopened by this pass and is not re-verified or amended by F20.** F20 is carried
  here because it answers a G3 question about *teaching and using EV*, which is C7's remit, not C6's.
- Caveats / population / domain limits: casino patrons observed and interviewed by a participant-observer
  who was also a dealer; no sampling frame; the "better expected returns" association is uncontrolled for
  player skill, table rules, or self-selection; 2025 publication with, as far as I can tell, no
  replication.

## Failed retrievals in this top-up pass (prose, so the table above keeps its 12 rows)

Recorded here rather than as new table rows, following the editorial pass's precedent, so that the
failed-retrieval table's row count is unchanged.

1. **Bennis (2025) full text** — `link.springer.com/article/10.1007/s11299-025-00346-9` returned a **303
   redirect to `idp.springer.com`**; following it produced a second redirect to a
   `?error=cookies_not_supported` URL. That page serves the abstract only. **Barrier: authenticated
   Springer session required.** I therefore cannot establish F20's sample size, method detail, or the
   magnitude of the expected-return association. This reproduces, on a different article, the same
   Springer barrier already recorded at row 7.
2. **Morewedge et al. (2015) publisher version of record** — not attempted. I read the **accepted
   manuscript** from City Research Online, which carries the repository's own warning, verbatim: "This
   version of the publication may differ from the final published version. To cite this item please
   consult the publisher's version." **I therefore cannot certify that the typeset article's numbers,
   page breaks, or conflict-of-interest declaration match what I read.** This is a disclosure, not a
   barrier — I did not try the SAGE route.
3. **Ladouceur et al. (2001) full text** — not attempted (journals.lww.com and ovid.com expected
   paywalled). Abstract-level only, as stated at F18. Declared as a choice, not a barrier.
4. **McDowell & Jacobs (2017) full text** — **still not obtained.** F17 gives a *secondary* attribution of
   the 24%/4% figures and does not substitute for the meta-analysis. Rows 1 and 2 of the table stand.
5. **Sezer et al. (2016) full text** — **not attempted by this pass and still unobtained.** I confirmed the
   RePEc/IDEAS abstract route works and that the abstract matches F14's transcription character for
   character, but the `collection` half of C-C7-010 remains open. It is still the dossier's
   highest-priority retrieval target.

## Searched and came up empty in this top-up pass — explicit negative record

Per the brief's Rule 4 and the top-up dispatch's stricter standard: each absence below was searched at
least two ways **and** checked against at least two hosts before being written down.

- **A controlled study teaching expected-value reasoning and measuring improvement in actual card-game
  play. Still zero.** Searched via general web search for training/instruction studies tied to blackjack
  and EV, and separately through the reference framing of F15/F16's training literature. What the
  blackjack-plus-EV query returns is (a) reinforcement-learning and Monte-Carlo papers about *machines*
  solving blackjack, (b) practitioner and course material, and (c) **F20**, which is ethnographic and
  argues *against* EV inference being what players do. **The first collection pass's negative on this
  point survives re-search, and F20 does not overturn it — it reframes it.**
- **A debiasing-training study targeting outcome bias specifically. Still zero beyond F14's abstract.**
  F15 is the strongest training-transfer evidence in the dossier and **outcome bias is not among its six
  trained biases**; F16's transferred bias is confirmation bias. I checked F15's own bias list twice
  against the paper (abstract p. 2 and Highlights p. 3) rather than against any summary. **G4's specific
  hole — can *outcome* bias be trained away — is not filled by the debiasing-training literature this
  pass retrieved**, and it would be an error to let F15's presence in the dossier imply otherwise.
- **A randomised trial of *instruction in randomness* aimed at gambler's fallacy or illusion of control in
  a non-clinical adult population.** Searched via general web search and again restricted to
  `pubmed.ncbi.nlm.nih.gov`. What returns is a clinical treatment literature: F18, plus personalized-
  feedback and warning-message trials in problem gamblers, plus a 2025 RCT of computerised cognitive
  training (Luquiens et al., *J Behav Addict*, PMID 39819891) whose active ingredient is **inhibition
  training, not instruction in randomness**, and which reports a **null** — I opened its PubMed record and
  read the abstract, and I am **not** carrying it as a finding because its mechanism is not the one G5
  asks about. It is logged as a lead below. **The non-clinical adult instruction trial G5 actually wants
  was not found.**

## Leads found in this pass (record, do not chase)

- **Luquiens, A., Benyamina, A., Perney, P. & Carré, A. (2025)**, "Computerized cognitive training for
  problem gambling: A randomized controlled trial (TRAIN-online)," *Journal of Behavioral Addictions*,
  DOI 10.1556/2006.2024.00080, PMID 39819891. A 185-participant RCT reporting no significant
  between-group differences on any outcome. **Not carried as a finding because it trains inhibition, not
  beliefs about randomness** — but it is a real adult null in the adjacent space and a later phase may
  want it.
- **Ladouceur et al. group-therapy replication (2003)** and the wider Quebec cognitive-correction
  programme — F18 is one trial from a series; the series was not enumerated.
- **Kopecky, McKneely & Bos (2015)** — the independent third-party re-analysis of F15's data, cited at
  F15 p. 14. Would materially strengthen or weaken F15 and was not retrieved.
- **Symborski et al. (2017)** — the publicly available general summary of the proprietary "Missing"
  game, cited at F16 p. 1372. The only route to knowing what the intervention actually contained.
- **Scopelliti, Morewedge, McCormick, Min, LeBrecht & Kassam (2015)** — the bias-blind-spot scale
  underlying F15's measures; cited at F15 p. 5.
- **Gigerenzer & Hoffrage (1995)** — the founding natural-frequency paper, cited by F1 and F17 and read
  by neither.

## Sufficiency after the top-up — this collector's independent judgement

Stated separately from, and **not** written into, the collector self-assessment table above, whose cells
carry only a pointer to this section. V-C7's Axis-2 verdict was INSUFFICIENT on G1, G3, G4, G5, G6.

- **G1 — now SUFFICIENT.** F17 supplies the missing ceiling and the mechanism behind it, from primary
  text. The F1-vs-F2 graphical-aid conflict remains open and still needs McDowell & Jacobs' full text,
  but that is a *conflict*, not a coverage gap.
- **G3 — improved, still PARTIAL.** F15 and F16 give the dossier its first positive, durable,
  field-transferring training result, and it was delivered by an interactive game. But neither trains
  expected value. The literal question — does *EV* instruction transfer — still rests on F5's null, now
  joined by F20's argument from inside blackjack that EV inference may not be what players do. **I do not
  claim G3 closed.**
- **G4 — still INSUFFICIENT, and unchanged by this pass.** F15's six biases do not include outcome bias.
  Sezer et al. remains abstract-level. This stays the dossier's biggest hole and it still sits under
  `product-vision.md:74-75`.
- **G5 — improved, still PARTIAL.** F18 makes the correction half non-empty. It is one trial, clinical,
  abstract-level, and a treatment package that cannot isolate the randomness-correction component.
- **G6 — improved, arguably SUFFICIENT for the "what is merely popular" half; PARTIAL overall.** F19
  confirms the field has no controlled experiments and that the target concept resists simulation, and
  F15 adds a genuine interactive-vs-passive contrast — with the honest wrinkle that the interactive
  format won on behaviour and lost on knowledge.

**This is a collector's self-assessment and is untrusted until a verifier re-checks it.** F15's
no-control-arm observation and F17's Einstellung-population inference are the two judgements in this pass
I would most want an adversarial reader to attack first.
