# Dossier: Blackjack as a teachable cognitive skill (C6)

> Status: RAW COLLECTION — DATA ONLY, not authority (Inbox Rule 0). UNTRUSTED until verified.
> Collector: Claude (Sonnet 5)  |  Date: 2026-07-19
> Leads consumed (untrusted): none — collected fresh
> Citations collected: 6 / budget 6–12 (hard cap 15) | + focused pass C6-FP (2026-07-19): 3 new
> (F7–F9) / focused-pass budget 4–6 (hard cap 8) — see "Findings added by focused pass" section

> **[C6-EC, 2026-07-20] EDITORIAL CORRECTION PASS APPLIED — read this before citing anything below.**
> The corrections recorded by the two independent verifiers on this card (**V6**, F1–F6; **V6b**,
> F7–F9) had never been landed in this dossier — they were returned as text and stopped there. This
> pass lands them **in place**. No new evidence was collected and no verdict was re-judged. Every
> change is marked `[C6-EC, 2026-07-20]`; superseded text is struck through rather than deleted, so
> downstream work that already absorbed it can recognise and retract it. All finding IDs are preserved.
>
> **The four changes that most affect how this dossier may be used:**
> 1. **F2's "44% passive / 16% aggressive" statistics are DROPPED** and F2 is re-bucketed
>    **Evidence-backed → Assumption.** The figures trace to a single *Psychology Today* blog post and
>    an uncited echo of it — not the "three converging independent summaries" claimed — with the
>    originating publication ambiguous between two different Wagenaar works. **No magnitude may be
>    cited from F2.** The related candidate conflict is **dissolved, not open**.
> 2. **F4's quote is restored with the source's own two hedges** ("suggested", "in part"), and the
>    omitted and material limitation is added: the simulation used **simplified rules (no splitting,
>    doubling, insurance) with the win probability controlled by the computer**.
> 3. **F3's Study-2 behavioural effects are one-tailed** (t ≈ 1.79–1.86) — undisclosed until now.
>    Causal framing survives; magnitude is weaker than the bare p-values imply.
> 4. **F8's "in an actual casino" is struck** — the setting is a **mock casino** (F7), and the
>    discrepancy is logged open at conflict-register **#28**. F7's "realistic table pace" claim is
>    likewise struck as unsupported: Q2's gap is **narrowed, not cleanly refuted**.
>
> **Upgrades also landed** (honesty runs both ways): F5's open question is closed **in the collector's
> favour** (full PDF read; no quantitative accuracy data exists in it); F6's figures and F9's 466-citation
> count are confirmed exact by independent recount; F7's Q3 tier is confirmed **honest and deliberately
> conservative**; F6 is judged this dossier's **best-handled citation**.
>
> **On thinness.** This card's evidence base is genuinely thin — a single n=4 single-subject study, a
> mock-casino money result, and exactly one PubMed record for "card counting" in title/abstract. That
> thinness is a **verified finding about the literature**, not a defect in this dossier. It was not
> padded, and this pass did not pad it.

## Scope & questions this card must answer
- Q1. Basic strategy acquisition — training methods, time to proficiency, retention; including the
  psychology-of-gambling literature on players' decision accuracy even where training is not the
  study's purpose.
- Q2. Card counting as a skill — acquisition, working-memory load, accuracy under realistic speed and
  distraction.
- Q3. Error patterns — which basic-strategy decisions players get wrong most, and whether published
  evidence identifies *systematic* deviations.
- Q4. Transfer — does trained blackjack skill hold up under real casino conditions (time pressure,
  money, social pressure, fatigue), or is the evidence confined to lab tasks?

## Where I looked
Four literatures, per the scope file's framing, each searched directly rather than assumed absent:
- **Gambling studies** (Journal of Gambling Studies, Journal of Gambling Issues, Journal of Gambling
  Behavior): found real-casino field studies and one ecological-validity methods paper.
- **Judgment and decision-making** (Journal of Decision Making, Frontiers in Psychology decision-making
  work, Journal of Experimental Psychology: General): found the two strongest sources on this card.
- **Expertise / skill-acquisition research**: searched specifically for blackjack- or card-counting-
  specific working-memory, dual-task, and deliberate-practice studies (search terms included card
  counting + working memory, card counting + expertise, mental arithmetic under distraction, expert
  vs. novice dual-task). Found only domain-general dual-task/serial-recall/arithmetic literature with
  **no blackjack or card-counting content** — recorded as a coverage gap, not cited as a finding.
- **Applied / advantage-play literature** (Blackjack Apprenticeship, casino-strategy blogs, forums,
  advantage-play sites): plentiful, but per scope instruction these are Q6 first-party/practitioner
  claims and are not elevated to Findings here — they are noted narratively in Coverage gaps as
  *what practitioners claim*, never as evidence a training method works.

## Findings

### F1: A covert real-casino tracking study finds blackjack players deviate substantially from basic
strategy, that the deviations are strongly asymmetric (players err by playing too passively, not too
aggressively), and that deviators earn measurably worse outcomes than basic-strategy players.
- Provenance: PUBLISHED
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q3 — observational field data from a covert casino tracking system
  (not an experiment; no random assignment to "follows strategy" vs. "deviates")
- Source: Carlin, B.I. & Robinson, D.T. (2009). "Fear and loathing in Las Vegas: Evidence from
  blackjack tables." *Judgment and Decision Making*, 4(5), 385–396.
  https://sjdm.org/~baron/journal/9519/jdm9519.html (official journal mirror); abstract independently
  confirmed at Cambridge Core:
  https://www.cambridge.org/core/journals/judgment-and-decision-making/article/fear-and-loathing-in-las-vegas-evidence-from-blackjack-tables/A59038264979AC8C6A6B7D2436F958DA
- Access: full text extracted and read via the journal's own HTML mirror (sjdm.org); abstract
  independently re-confirmed via the Cambridge Core publisher page. Both converged verbatim on the
  same abstract wording — no inconsistency observed.
- Proposed supporting location: Abstract; ~~§2.1.1~~ **§1 Introduction** (data: "over 4,300 hands
  played in over 1,300 rounds of actual play," Bally MP-21 optical Card and Chip Recognition System);
  Introduction **and the Table 4 note / Table 4 Panel A discussion** (win-rate comparison); Table 3
  Panel A (error counts).
  **[C6-EC, 2026-07-20 — supporting-location correction, per V6.]** The collector placed the
  "over 4,300 hands / 1,300 rounds / Bally MP-21" passage at **§2.1.1**; V6 independently downloaded
  and locally text-extracted the journal HTML mirror and found §2.1.1 covers the game's *rules*
  (split/double/insurance/surrender availability). The passage is in **§1, the Introduction**. The
  48.1%/36.6% win rates appear in the Introduction **and** in the Table 4 note and Table 4 Panel A
  discussion, not the Introduction alone. Abstract and Table 3 were located exactly as proposed;
  every quoted figure is exact (Table 3 Panel A: Total 423 · Passive 339 = 0.801 · Aggressive
  84 = 0.199, 99% CI [0.751, 0.851]; Table 3 note gives the hand total as 4,394).
- Claimed strength (exact verb, from the abstract): "we find strong evidence of an economically
  significant omission bias: **80% of the mistakes** at the table are caused by playing too
  conservatively, resulting in substantial monetary losses." Also, from the Introduction: "Players
  that followed the basic strategy won 48.1% of the time... Deviators won only 36.6% of the time."
  Table 3: 339 passive errors vs. 84 aggressive errors out of 423 total identified mistakes.
- Caveats / population / domain limits: single Las Vegas casino, one table, one covert-tracking
  system pilot; correlational — the paper documents *that* deviation correlates with worse outcomes
  and *that* errors skew passive, not a controlled test of *why*. Does not break error rates down by
  specific decision type (insurance vs. splitting vs. doubling vs. hit/stand) — I checked directly via
  re-fetch and confirmed the paper reports only the passive/aggressive dichotomy, not a per-decision
  breakdown.
  **[C6-EC, 2026-07-20 — caveat added, per V6.]** A further limitation the dossier did not state, found
  by V6 in the paper's §2.1.2: the observed table had **no surrender option, and no instance of any
  player buying insurance was recorded.** This independently strengthens and explains the collector's
  "no per-decision breakdown" caveat — two of the four decision categories were effectively absent
  from the dataset, so the passive/aggressive dichotomy is not merely unreported at finer grain, it is
  partly unmeasurable from this data.

### F2: ~~An earlier, independent real-casino field study found the same directional pattern — errors of
omission (not taking a card when basic strategy calls for one) far outnumber errors of commission — in
a different country, casino, and decade.~~
**[C6-EC, 2026-07-20 — SUPERSEDED HEADLINE. Restated per V6's drop + re-bucketing:]**
**An earlier real-casino field study of 112 players' complete play histories in an Amsterdam casino
exists and is frequently described as finding omission-dominant errors. The study is real, correctly
attributed and correctly dated; its *design* is corroborated across independent bibliographic sources.
Its error statistics are NOT supportable and have been dropped — no magnitude may be cited from it,
and the directional claim itself now rests on secondary description, not on read primary text.**
- Provenance: PUBLISHED
- ~~Proposed status bucket: Evidence-backed~~ → **[C6-EC, 2026-07-20] Status bucket: Assumption.**
  V6 re-bucketed this finding **Evidence-backed → Assumption**. The directional claim is a plausible,
  widely-repeated description of a real study that neither the collector nor the verifier could read.
- ~~Proposed evidence-quality tier: Q3~~ → **[C6-EC, 2026-07-20] Split tier.** **Q6** for the
  *statistics* (blog-sourced, and now dropped entirely); the **paper itself would be Q3 if read** —
  observational field data (complete play histories) plus player interviews — but it has not been read
  by anyone in this program. See Access note below.
- Source: Keren, G.B. & Wagenaar, W.A. (1985). "On the psychology of playing blackjack: Normative and
  descriptive considerations with implications for decision theory." *Journal of Experimental
  Psychology: General*, 114(2), 133–158.
- Access: **reduced confidence — full text NOT obtained.** ~~The statistics below are drawn from three
  independently-worded secondary summaries (general search-engine synopses plus a November 1985
  *Washington Post* contemporaneous report on the study) that converge on the same two numbers and
  sample description. That convergence is reassuring but is not equivalent to reading the primary text
  myself — treat the exact wording as unverified until the verifier locates the original.~~
  **[C6-EC, 2026-07-20 — SUPERSEDED. The "three converging independent summaries" claim does not
  survive checking, per V6.]** V6 traced the figures and found **one source and its echo, not
  convergence**: they originate in a single Q6 blog post — Mark Griffiths, *Psychology Today*, "Basic
  Instinct" (2013), verbatim: *"Wagennar showed that 44% of playing errors involved not taking an extra
  card when they should have and that 16% of errors involved taking an extra card when they shouldn't
  have"* — which Untamed Science reproduces near-verbatim **with no citation at all**. Worse, Griffiths'
  own reference list contains **both** Keren & Wagenaar (1985) **and** Wagenaar (1988), *Paradoxes of
  Gambling Behaviour*, so **which publication the figures come from is unestablished.** The
  *Washington Post* (1985-11-20) page cited as independent corroboration returned **HTTP 403** to V6;
  it could not be confirmed to contain those numbers, and a 1985 newspaper reporting the identical
  percentage pair later given by a 2013 blog is an assumption, not evidence. Primary text remains
  unobtainable after a full re-check pass (PsycNet loading-shell only, PhilPapers 403, Semantic Scholar
  abstract publisher-elided, targeted repository search, *Washington Post* archive 403) and is
  **quarantined** to source-lead register **#10**. What *is* independently corroborated (DOI resolution,
  Semantic Scholar, PhilPapers, and F1's own reference list, which V6 read): the paper is real,
  correctly attributed, correctly dated and paginated, and its design description is accurate.
- Proposed supporting location: **existence + study design only** — "the complete history of play of
  112 subjects in an Amsterdam casino" plus personal interviews. **[C6-EC, 2026-07-20]** No supporting
  location exists for any statistic, because no statistic survives.
- ~~Claimed strength (as reported by secondary sources, not my own reading): "44% of playing errors
  involved not taking an extra card when they should have and 16% of errors involved taking an extra
  card when they shouldn't have," and that error likelihood was related to the dealer's up-card value.~~
  **[C6-EC, 2026-07-20 — DROPPED, per V6's Kills entry.]** The "44% passive / 16% aggressive"
  statistics are **dropped**. They rest on one Q6 blog post and an uncited echo of it, with the
  originating publication ambiguous between the 1985 paper and Wagenaar's 1988 book, and no
  primary-text confirmation available to either the collector or the verifier. The superseded figures
  are retained above **struck through and solely for historical traceability** — so that downstream
  work that already absorbed them can recognise and retract them. They must not be re-cited.
  **Permitted citation form:** F2 may be cited as *"a 1985 Amsterdam field study of 112 players'
  complete play histories exists and is frequently described as finding omission-dominant errors."*
  It may **not** be cited for any number.
- Caveats / population / domain limits: 1985, Netherlands, single casino; descriptive/correlational.
  **[C6-EC, 2026-07-20]** The collector's observation that ~~the 44%/16% figures sum to 60%, not 100%~~
  the two figures fail to sum to the full error population was a real signal — but it is now moot
  rather than resolved: the figures have no verified provenance, so there is no denominator question
  to answer. The candidate conflict this was logged under is **dissolved, not open** — see the
  Candidate conflicts section below and conflict-register row **#16**.

### F3: A recent two-study lab investigation finds blackjack decision accuracy well below the
basic-strategy ceiling, systematic overconfidence, and only a weak confidence–knowledge correlation —
and that overconfidence itself changes behavior (less information-seeking, higher bets, lower anxiety).
- Provenance: PUBLISHED
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q3 (Study 1, correlational individual-differences design) / Q2
  (Study 2, experimental manipulation of induced confidence)
- Source: Stone, E.R., Parker, A.M., Hanks, A.R., & Swiston, R.C. (2023). "Thinking without knowing:
  Psychological and behavioral consequences of unjustified confidence regarding blackjack strategy."
  *Frontiers in Psychology*, 14. https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2023.1015676/full
  (full text); also mirrored at PMC: https://pmc.ncbi.nlm.nih.gov/articles/PMC9909440/
- Access: full text extracted and read directly from the Frontiers HTML page; the PMC mirror was used
  as an independent cross-check and agreed on all figures quoted below — no inconsistency observed.
- Proposed supporting location: "Knowledge-confidence assessment (KCA)" Methods section (40-item paper
  test covering hit/stand, split, double down, and insurance); Results sections for Study 1 (n=118)
  and Study 2 (n=115, 108 after exclusions).
- Claimed strength (exact figures as reported): Study 1 — average confidence 80.1% (SD 7.37), average
  accuracy 62.0% (SD 9.50), mean overconfidence 18.1 points; "114 out of the 118 participants exhibited
  some degree of overconfidence." Confidence–knowledge correlation r=0.30 (Study 1, p<0.001), r=0.13
  (Study 2) — "confidence and knowledge were positively correlated but only modestly so." Study 2
  (experimental): higher induced confidence caused larger average bets ($67.02 vs. $57.21, ~~p=0.04~~
  **t(105) = 1.79, p = 0.04, one-tailed**) and reduced information-seeking (~~p=0.03~~
  **t(92) = 1.86, p = 0.03, one-tailed**).
  **[C6-EC, 2026-07-20 — undisclosed directional testing, per V6.]** The dossier printed "p=0.04" and
  "p=0.03" **without disclosing that both are one-tailed tests**, with t ≈ 1.79–1.86 — i.e. marginal.
  V6 quotes the paper verbatim: *"participants bet more on average in the higher-confidence condition
  (M = $67.02) than in the lower-confidence condition (M = $57.21), t(105) = 1.79, p = 0.04,
  one-tailed."* The **causal framing survives** — this is a genuine experiment with a verified
  manipulation check — but the effects are **weaker than the bare p-values imply**, and no downstream
  use should treat these two behavioural effects as robustly established. Every other figure in this
  finding was string-matched exact by V6 against a locally-extracted copy of the paper.
- Caveats / population / domain limits: lab task, paper-based scoring against basic-strategy
  correctness, not live table play; the authors themselves frame blackjack as chosen because it "can
  be played in a laboratory, with tight control" — i.e., they explicitly treat this as a simulation,
  not authentic casino gambling. The paper does **not** disaggregate accuracy by decision category
  (I checked directly: no hit/stand vs. split vs. double vs. insurance breakdown is reported), and does
  not address training method, retention, or time-to-proficiency at all.

### F4: A small lab experiment on simulated blackjack manipulated time pressure directly and found it
affects card/wager decisions and judgment confidence — one of very few blackjack-specific studies that
manipulates a casino-like stressor rather than only observing it.
- Provenance: PUBLISHED
- Proposed status bucket: Evidence-backed (weak — very small sample)
- Proposed evidence-quality tier: Q2 — controlled experimental manipulation, but N=12
- Source: Phillips, J.G. & Amrhein, P.C. (1989). "Factors influencing wagers in simulated Blackjack."
  *Journal of Gambling Behavior*, 5(2), 99–111.
- Access: ~~abstract/methodology only, via converging secondary search summaries... Treat exact wording
  as unverified.~~ **[C6-EC, 2026-07-20 — access UPGRADED, per V6.]** V6 obtained the **full abstract
  verbatim** from the Montclair State University research portal (institutional, authoritative), with
  bibliographic details cross-checked at Springer/DOI. The wording is no longer unverified. Full text
  remains paywalled to everyone in this program — abstract-level verification only, which is adequate
  because the cited claim is itself drawn from the abstract.
- Proposed supporting location: **Abstract** — methodology as stated: "**Twelve subjects played 20
  hands under each of the experimental conditions.**"
- ~~Claimed strength (as reported by secondary sources): "deviations from optimal play can be understood
  in terms of players' decision processes, influenced by the time available to make a decision, the
  short-term probability of winning, and perceived control of outcomes; each factor may potentiate the
  effects of the others."~~
  **[C6-EC, 2026-07-20 — SUPERSEDED QUOTE. The collector's rendering silently removed BOTH of the
  source's own hedges: it dropped "in part" and rendered "suggested" as "found". Restored verbatim
  from the abstract, per V6:]**
  **Claimed strength (verbatim, Abstract):** "To examine effects of time pressure upon confidence of
  judgments, the time allowed to place a bet, and to choose extra cards, was manipulated. Twelve
  subjects played 20 hands under each of the experimental conditions.… The results **suggested** that
  deviations from optimal play can **in part** be understood in terms of players' decision processes,
  that are influenced by the time available to make a decision, the short-term probability of winning,
  and perceived control of outcomes; each factor may potentiate the effects of the others."
  The source hedges twice; the dossier hedged neither. Both hedges are load-bearing and must travel
  with any downstream use of this finding.
- Caveats / population / domain limits: N=12 is small even for a within-subjects lab design; simulated,
  not real casino stakes; 1989, dated relative to modern digital/app training contexts; exact effect
  sizes and statistical tests are not available at abstract level.
  **[C6-EC, 2026-07-20 — MATERIAL CAVEAT ADDED; the dossier omitted this entirely, per V6.]** The
  abstract states verbatim: "The computer simulation of Blackjack used **simplified rules (no
  splitting, doubling down, insurance, etc.)**, and **the probability of winning was controlled by the
  computer.**" A rigged-outcome simulation stripped of split, double and insurance is a **very
  restricted construct of "deviation from optimal play"** — it cannot bear much weight as evidence
  about basic-strategy decision-making. **V6 judges this limitation more severe than the N=12 the
  dossier did disclose.** Tier Q2 is retained as defensible (a genuine within-subjects experimental
  manipulation), but the construct-validity limit above should govern how this finding is used.

### F5: An ethnographic field study of real casino blackjack players explicitly organizes its account of
player beliefs and behavior around basic strategy and card counting as concepts, but it is a
qualitative/interpretive study of beliefs, not a quantitative measurement of accuracy or skill
acquisition.
- Provenance: PUBLISHED
- Proposed status bucket: Evidence-backed (for its qualitative claim only — explicitly NOT evidence
  that any training method improves accuracy or retention)
- Proposed evidence-quality tier: Q3 — primary ethnographic/observational study (naturalistic
  participant observation + interviews), not an experiment or a review
- Source: Bennis, W.M. (2004). "Blackjack playing strategies and beliefs: A view from the field."
  *Journal of Gambling Issues*, 10. DOI: 10.4309/jgi.2004.10.1
- Access: ~~the full PDF returned HTTP 403 on every mirror I tried... I did **not** read the body of
  the paper, only the abstract-level text quoted below.~~
  **[C6-EC, 2026-07-20 — access UPGRADED; the stated block was not real, per V6.]** The 403 is
  **referer-gating, not a hard block.** V6 supplied an HTTP Referer header and **successfully
  downloaded the full 43-page PDF** from cdspress.ca; the abstract was independently confirmed
  verbatim via the Semantic Scholar API first. The body has now been read: the author's own
  card-counting background (Thorp, *Beat the Dealer*) frames the study; "card counting" appears 33×
  and "basic strategy" 80×.
- Proposed supporting location: Abstract — "The current research contributes to the naturalistic study
  of casino gamblers. It reports the results of 10 weeks of ethnographic participant observation
  conducted in 1999 in two Indiana riverboat casinos... uses blackjack's basic strategy and card
  counting as organizing principles around which to discuss and assess these strategies and beliefs."
- Caveats / population / domain limits: 1999 fieldwork, two casinos near Chicago; explicitly about
  players' *beliefs* (e.g., gambler's-fallacy-style betting systems), not a controlled accuracy or
  proficiency measurement; ~~I have not read enough of the paper to know whether it reports any
  quantitative hit/stand-type accuracy data, and I am not asserting it does.~~
  **[C6-EC, 2026-07-20 — OPEN QUESTION CLOSED, in the collector's favour, per V6.]** Having read the
  full text, V6 reports the paper contains **zero** occurrences of "percent", only five "%" characters,
  and a single "Table". It reports **no quantitative accuracy data whatsoever.** The collector's
  refusal to assert was correct, and the caveat can now be stated in the stronger, settled form: *this
  paper reports no quantitative accuracy or proficiency data at all.* This is an upgrade, not a defect
  — recorded so the finding is not left carrying an uncertainty that has been resolved.

### F6: General (non-blackjack) gambling-research methodology literature finds that lab-based gambling
studies and real-venue field studies point the same direction but the venue/field version shows a
weaker effect — suggestive, by extension, that conclusions from simulated/lab blackjack studies (F3,
F4 above) may not fully transfer to real casino conditions, though this is my own bridging inference,
not a blackjack-specific result.
- Provenance: INFERENCE (applying a non-blackjack source to this card's transfer question)
- Proposed status bucket: Assumption
- Proposed evidence-quality tier: Q3 (the underlying source itself is a comparative empirical study —
  replicated lab-vs-venue design)
- Source: Gainsbury, S. & Blaszczynski, A. (2011). "The Appropriateness of Using Laboratories and
  Student Participants in Gambling Research." *Journal of Gambling Studies*, 27, 83–97.
- Access: ~~full-text was paywalled (Springer redirect to login); findings summarized here from a
  detailed secondary synopsis... not independently verified against primary text.~~
  **[C6-EC, 2026-07-20 — access UPGRADED, per V6.]** V6 obtained the **full publisher abstract
  verbatim** from Springer (via the idp cookie-redirect route) and cross-checked the sample sizes
  independently: **all figures confirmed exact.** Unpaywall confirms no OA full text exists, so
  abstract level is the ceiling here for anyone — but the abstract is now primary-verified, not
  secondary-synopsis material.
- Proposed supporting location: reported as a replicated study — 127 university students in a lab
  condition vs. 124 club patrons in a real gambling-venue condition, testing a harm-minimization
  messaging intervention (electronic gaming machines, not blackjack).
- Claimed strength (**verbatim from the publisher abstract, per V6**): "The main results and effects of
  both studies were in the same direction, but fewer significant results were found in the venue
  study. Venue participants provided much less information in response to survey questions than
  student participants and **were less likely to return follow-up questionnaires.**"
  **[C6-EC, 2026-07-20 — paraphrase completed; V6b's open mismatch RESOLVED.]** Two items:
  (a) The dossier's "venue participants gave less-complete survey responses" is a **fair paraphrase of
  the first clause** but silently **omits the follow-up-questionnaire clause** — a second, distinct
  attrition problem. Restored above.
  (b) **V6b's self-disclosed unresolved mismatch is now settled by direct reading, no diff required.**
  V6 stated that this dossier renders the source as "less likely to return following the initial
  study"; V6b could not find that phrase in the dossier and could not tell whether V6 paraphrased
  loosely or F6 had been altered after V6 read it. Reading both texts directly: **that phrase never
  existed in the dossier.** The dossier's pre-correction wording was "venue participants gave
  less-complete survey responses." V6 was loosely paraphrasing *the source's* clause when it described
  the dossier's drift, not quoting the dossier. **Conclusion: F6 was not touched; V6's quotation of
  the dossier was imprecise.** The real defect was the omission in (a), not a misrendering. Recorded so
  this does not remain an open integrity question on the card.
  **[C6-EC, 2026-07-20 — upgrade noted, per V6.]** V6 also observes the abstract's own concluding
  sentence — "caution should be taken in interpreting results, and where possible both methodologies
  should be used to verify conclusions" — supports the collector's bridging inference **slightly better
  than the collector claimed.** V6's overall assessment: bucketing this as **Assumption** with the
  domain mismatch flagged in bold is "honest and correct — this is the dossier's best-handled
  citation." No downgrade applies to F6.
- Caveats / population / domain limits: **domain mismatch — this study is about EGM harm-minimization
  messaging, not blackjack, basic strategy, or card counting.** It is cited here only as the closest
  available empirical evidence on the general lab-vs-field generalization question in gambling
  research, and the leap to "therefore blackjack skill may not transfer" is explicitly my own
  inference, not something this source measured.

## Candidate conflicts noticed
- ~~**Magnitude of the passive-error dominance across the two real-casino field studies (F1 vs. F2).**
  Both Carlin & Robinson (2009) and Keren & Wagenaar (1985) agree on *direction*... But the reported
  magnitudes differ in a way that doesn't obviously reconcile: Carlin & Robinson report 339/423 = 80%
  passive vs. 84/423 = 20% aggressive (summing to 100% of identified mistakes), while the secondary
  descriptions of Keren & Wagenaar report 44% passive vs. 16% aggressive (summing to only 60% of
  "playing errors"...). I have appended this to the shared conflict register rather than silently
  averaging the two figures.~~
  **[C6-EC, 2026-07-20 — SUPERSEDED. This conflict is DISSOLVED, not open, per V6.]** Registered by the
  collector as conflict-register **#9** and dissolved by V6 at conflict-register **#16**, which reads
  the outcome as **resolved-as-dissolved**. This cannot be a genuine cross-study empirical
  disagreement, because **the second pair of numbers has no verified provenance** — see the F2
  correction above. Side B has nothing behind it, so there is nothing for Side A to conflict with. The
  superseded magnitudes are retained struck-through **only** so that downstream work which already
  absorbed them can recognise and retract them.
  **What survives:** the **direction** — that passive/conservative errors dominate — still has **one**
  verified real-casino source, Carlin & Robinson (F1), whose figures V6 confirmed exact against the
  paper's own text. It **no longer has two**, and **no precise magnitude is supported by anything** in
  this dossier. Any curriculum weighting of "which basic-strategy errors matter most" must be built on
  F1 alone, as a single-study directional finding.

## Coverage gaps
- **Q1 — training methods, time-to-proficiency, retention. [corrected by C6-FP, 2026-07-19 — this gap
  declaration was false; a controlled training-intervention study exists and was missed, not absent.]**
  A fifth literature this dossier never searched — applied behaviour analysis (ABA) / behavioural-
  skills-training research on gambling — contains exactly the kind of study the original paragraph
  declared did not exist anywhere. **Speelman, Whiting & Dixon (2015) (F7)** is a controlled,
  multiple-baseline training intervention: 4 recreational gamblers, no accurate performance at
  baseline, staged video-instruction/rehearsal/testing protocol, a fluency criterion (100% accuracy
  under a changing-speed criterion), and post-training performance measurement, ~~corroborated by~~
  **re-reported in** **Speelman's 2016 SIU dissertation (F8)**, whose Experiment III describes the same
  training procedure "generalized to a naturalistic setting."
  **[C6-EC, 2026-07-20 — residual double-count risk closed, per V6b.]** "Corroborated by" is struck
  because it **drops the same-study caveat** that F8's own finding block states correctly: F8 is
  "**not** independent corroboration of F7, it is very likely the same study reported in a second
  venue." A reader working from this coverage-gaps section alone — which is the section downstream work
  actually quotes — would reasonably read the original wording as **independent corroboration of an
  n=4 result**. It is not. **F7 and F8 are one study, one dataset, n=4, in two venues.** The caveat now
  travels with the paragraph, not only with the finding block.
  The honest gap is now narrower, not zero: this is
  a **single-subject design with n=4** — real evidence that a training method can bring novices to a
  counting-accuracy criterion, and **not** evidence about time-to-proficiency or retention at
  population scale. No study of any kind (still) measures retention after training ends, and no
  population-level or group-design training-intervention study was located in any literature searched
  by either pass. The corrected honest statement is: *a controlled training intervention exists and
  works at n=4; population-scale efficacy and retention remain untested.*
- **Q2 — card counting as a skill. [corrected by C6-FP, 2026-07-19 — partially false; the acquisition
  and speed-accuracy claims were missed evidence, not absence; the cognitive-psychology mechanism claim
  stands as verified by the independent verifier.]** The claim that "no peer-reviewed study was found
  that measures card-counting acquisition… or counting accuracy under realistic table speed" is false:
  **Speelman, Whiting & Dixon (2015) (F7)** is peer-reviewed (JABA) and measures ~~exactly this~~
  **part of this** — card-counting acquisition from ~~zero baseline accuracy~~ **a baseline at which
  no participant counted cards accurately** to 100% accuracy under a **changing-speed criterion**
  ~~explicitly designed to approximate realistic table pace~~, with generalisation probes while
  actually playing blackjack in a mock casino.
  **[C6-EC, 2026-07-20 — two V6b downgrades landed. Both matter, and the first is load-bearing.]**
  (a) **"Explicitly designed to approximate realistic table pace" is not in the source and is struck.**
  The abstract says only "counting cards fluently with 100% accuracy during changing speed criterion
  training exercises." It says nothing about *why* the speeds changed or what pace they approximated,
  and **the full text is unread.** Whether those speeds resemble a real casino table is
  **unestablished.** This matters more than a normal wording slip: Q2's original declared gap was
  *precisely* "counting accuracy under realistic table speed," so this phrase was doing the work of
  falsifying the gap. **The honest statement is that a changing-speed criterion was used and the gap is
  NARROWED — not that the "realistic table speed" element is cleanly refuted.** That element remains
  unverified pending full text.
  (b) **"Zero baseline accuracy" overstated the source and is struck.** The source says participants
  did not count *accurately* — i.e. below criterion, **not necessarily 0%**. (Q1's paragraph gets this
  right with "no accurate performance at baseline"; this paragraph slipped and inflated the
  before/after contrast.)
  **What V6b put on the record in F7's favour, because it was the temptation:** the "100% accuracy"
  figure — the single most inflatable number on this card — is kept tied to *changing-speed criterion
  training exercises* everywhere it appears and is **never** allowed to attach to the mock-casino
  generalisation probes, for which the abstract reports only "were able to count cards," with **no
  accuracy figure at all**. That discipline held throughout, and is not disturbed by these downgrades.
  This is single-subject, **n=4** — a demonstration
  that counting-to-criterion training can work for an individual, not a population-level acquisition
  curve or a proficiency-by-hours-of-practice estimate. What remains a **genuine, re-confirmed absence**
  (this pass did not re-search for it and defers entirely to the verifier's independent confirmation):
  no study — in this pass's literature or the original four — measures the **working-memory load**
  specific to maintaining a running/true count as a cognitive mechanism (dual-task cost, span capacity
  consumed, interference from concurrent play decisions). Domain-general dual-task/serial-recall/
  mental-arithmetic-under-load literature exists but still, as previously reported, does not mention
  blackjack or card counting. Advantage-play practitioner sources remain first-party Q6 claims, not
  elevated to Findings, unchanged from the original pass.
- **Q3 — per-decision-type error breakdown.** Both real-casino field studies located (F1, F2) report
  only a passive-vs-aggressive dichotomy of errors, not a breakdown by specific decision type (is
  insurance the single worst decision? Is failing to double soft hands worse than misplaying pair
  splits?). I checked this directly against both papers' reported content rather than assuming it —
  neither source supports a finer-grained answer. Advantage-play forum posts claim specific individual
  "worst mistakes" (e.g., taking even money on a blackjack), but these are anecdotal practitioner
  observations, not measured error-rate data, and are not cited as Findings here.
- **Q4 — transfer under real casino conditions. [corrected by C6-FP, 2026-07-19 — blackjack-specific
  evidence exists on both sides of this question and was missed; the dossier previously substituted a
  non-blackjack bridge for it.]** Two blackjack-specific sources now bear directly on transfer, and they
  **point in opposite directions** — a genuine unresolved opposing-positions structure, not a single
  answer: **Anderson & Brown (1984) (F9)** had subjects play blackjack in both a real casino and a
  laboratory and found significant condition differences in heart-rate response, gambling behaviour,
  and the sensation-seeking/arousal relationship, concluding (their words) that "doubt is cast on
  laboratory gambling as a valid analogue of the real gambling situation" — **anti-transfer**.
  **Speelman, Whiting & Dixon (2015) (F7)**, conversely, found that skills trained via video-based
  behavioural-skills training **did** generalise: all 4 participants who reached the counting-accuracy
  criterion in training were subsequently able to count cards while actually playing blackjack in a
  mock casino — **pro-transfer**, for the specific skill and setting tested. Neither source resolves
  the other: Anderson & Brown addresses physiological/behavioural authenticity of lab vs. real-money
  play, not whether a *trained* skill specifically survives the transition; Speelman et al. addresses
  generalisation of a trained skill to a *mock*, not an authentic money-and-crowd, casino. This tension
  is logged in the conflict register (row 17/25, and refined at row 26) and is **not resolved here**. F6
  (the non-blackjack EGM harm-minimisation bridge) may remain as secondary, weaker support; it is no
  longer the primary evidence for this sub-question — F7 and F9 are. This sub-question is answered from
  both sides now, rather than being the least-answered of the four, but the answer is a live conflict,
  not a settled position.

## Collector self-QA (fill before returning — Task's internal QA pass)
- [x] Every major claim has ≥1 source with a locatable supporting location.
- [x] No claim states strength beyond what its source shows (overconfidence/error findings kept as
      correlational/descriptive where the sources are correlational/descriptive; F6 explicitly marked
      as my own inference, not the source's own claim).
- [x] Every finding carries provenance + proposed status bucket + proposed quality tier.
- [x] Every source lists a URL/DOI for independent re-check.
- [x] Coverage gaps and candidate conflicts are named explicitly.
- [x] Citation count is within the depth budget (6, floor of 6–12; no overflow to list).
- [x] No citation was added merely to reach a count — six is the honest result of a genuinely thin
      topic; three of the four sub-questions have a documented coverage gap.
- [x] (C1/C4 only) N/A — sufficiency statement omitted per scope file.

## Findings added by focused pass (C6-FP, 2026-07-19)

> Collector: Claude (Sonnet 5), fresh agent instance — not the original C6 collector, not V6.
> Scope: one bounded top-up pass per the independent verifier's (V6) sufficiency verdict. Read-only,
> AUTHORITY: evidence only. Everything below is additional to, and does not alter, F1–F6 above.

**Where I looked.** Exactly the two things V6's sufficiency section scoped: (1) the applied behaviour
analysis (ABA) / behavioural-skills-training tradition on blackjack, specifically Speelman, Whiting &
Dixon (2015), its dissertation source, and any replication-and-extension; (2) Anderson & Brown (1984)
for the blackjack lab-vs-casino transfer landmark. I did not re-search gambling studies, JDM, or
expertise/skill-acquisition generally (out of scope), and made no further attempt at Keren & Wagenaar
(1985) primary text (quarantined).

**Access note (read before the findings below).** Both F7's and F9's publisher (Wiley) fronts every
DOI resolution with a Cloudflare JavaScript challenge page ("Just a moment...") rather than a simple
HTTP 403 — this is a harder block than the referer-gating the verifier found on F5's publisher, and it
does not yield to a changed Referer header or user-agent. I independently confirmed both are genuinely
closed access (not merely gated) via Unpaywall (`is_oa: false`, `oa_locations: []` for both DOIs),
Semantic Scholar (`openAccessPdf.status: "CLOSED"` for both), absence from PMC, and absence of any
open-repository deposit findable via Crossref/ERIC. I tried five independent routes before concluding
this (direct Wiley/DOI curl, Unpaywall API, Semantic Scholar API, PMC/NCBI eutils, ERIC API) — full text
for F7 and F9 is UNREACHABLE by any route available to me, not merely unopened. What follows is
abstract-level access for both, with the abstract text extracted **locally from the raw PubMed HTML**
(not an AI fetch-summary) and matched against the independent ERIC record for F7, which agreed
verbatim.

### F7: A peer-reviewed applied-behaviour-analysis study trained four recreational gamblers with no
baseline card-counting accuracy to 100% counting accuracy under a changing-speed criterion, using
video-based behavioural skills training, and confirmed the trained skill generalised to actual
blackjack play in a mock casino, with three of the four participants subsequently winning money after
losing during baseline. This directly falsifies the dossier's original Q1 and Q2 coverage-gap
declarations that no controlled training-intervention study and no counting-accuracy-under-speed study
exist.
- Provenance: PUBLISHED
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: **Q3** — a genuine controlled experimental design (multiple baseline
  across participants, with a fluency/speed criterion and generalisation probes), but tiered down from
  Q2 specifically because it is a **single-subject design with n=4**, per this pass's scope
  instruction: real evidence that this training method can bring an individual to criterion, and *not*
  evidence about a population-level effect size, average time-to-proficiency, or retention.
  **[C6-EC, 2026-07-20 — tier CONFIRMED honest and conservative, per V6b.]** V6b was asked whether Q3
  is honest or should sit lower, and answers: it should **not** sit lower. A multiple-baseline design
  with staggered baselines is a genuine experimental control, not an observational study — by the
  rubric's own definitions it is nominally **Q2**. The dossier tiered it *down* to Q3 for n=4, a
  rubric-sanctioned downgrade that errs **against** the product's interest. That is the correct
  direction of error, and the tier stands as written.
- Source: Speelman, R.C., Whiting, S.W. & Dixon, M.R. (2015). "Using behavioral skills training and
  video rehearsal to teach blackjack skills." *Journal of Applied Behavior Analysis*, 48(3), 632–642.
  DOI 10.1002/jaba.225. PMID 26173744. ERIC EJ1073394.
- Access: **abstract-level only — full text unreachable.** Confirmed genuinely closed access via
  Unpaywall (`is_oa: false`), Semantic Scholar (`openAccessPdf.status: CLOSED`), and absence from PMC;
  Wiley's DOI resolution returns a Cloudflare JS challenge page to automated fetches, not a simple
  referer-gated 403. Abstract extracted locally from PubMed's raw HTML (not a fetch-summary) and
  cross-checked verbatim against the independent ERIC EJ1073394 abstract record — the two converge
  word-for-word, which is genuine independent convergence (two different hosts, PubMed/NLM and
  ERIC/IES), not the single-source-plus-echo pattern this same dossier's F2 warns against.
- Proposed supporting location: Abstract (PubMed and ERIC, word-for-word identical).
- Claimed strength (exact quote, from the PubMed abstract, locally extracted): "A behavioral skills
  training procedure that consisted of video instructions, video rehearsal, and video testing was used
  to teach 4 recreational gamblers a specific skill in playing blackjack (sometimes called card
  counting). A multiple baseline design was used to evaluate intervention effects on card-counting
  accuracy and chips won or lost across participants. Before training, no participant counted cards
  accurately. Each participant completed all phases of the training protocol, counting cards fluently
  with 100% accuracy during changing speed criterion training exercises. Generalization probes were
  conducted while participants played blackjack in a mock casino following each training phase.
  Afterwards, all 4 participants were able to count cards while they played blackjack. In conjunction
  with count accuracy, total winnings were tracked to determine the monetary advantages associated with
  counting cards. After losing money during baseline, 3 of 4 participants won a substantial amount of
  money playing blackjack after the intervention."
- Caveats / population / domain limits: **n=4, single-subject multiple-baseline design** — this is the
  central caveat and must not be dropped in any downstream use of this finding. Recreational gamblers,
  not novices with zero exposure to blackjack (baseline card-counting was inaccurate, not necessarily
  baseline *play* was inexperienced). "Mock casino" generalisation probes are not authentic money/social
  stakes — see F9 below for the opposing concern about lab-to-real-casino validity. No retention
  follow-up is reported in the abstract (full text unread, so a retention measure cannot be ruled out
  with certainty, but none is described at abstract level). Does not report time-to-criterion in
  hours/sessions at abstract level. I could not independently confirm the existence of a distinct,
  separately citable "replication and extension" publication (see new source-lead-register row below) —
  I am not citing one, to avoid citing something I could not verify exists as its own source.

### F8: The training-intervention author's own doctoral dissertation independently states, across three
linked experiments, that recreational blackjack players deviate significantly from optimal strategy at
greater cost than casinos advertise, that self-reported strategy does not predict actual casino outcome
variance well, and that behavioural-skills training generalized card-counting to a naturalistic setting
with 3 of 4 trained participants subsequently winning money ~~in an actual casino~~ **in a casino
setting**.
**[C6-EC, 2026-07-20 — "IN AN ACTUAL CASINO" IS UNSUPPORTED AND IS STRUCK. Per V6b; the exact
overcorrection this card was warned about.]** The source says three participants "won money **in a
casino setting**" and that the skills "generalized to a **naturalistic setting**." It **never says
"actual."** Meanwhile **F7 — which this same dossier argues is the same study — states the probes were
in a MOCK casino.** The dossier was therefore describing one result as "mock" in one place and "actual"
in another, upgrading a mock-casino training result into a real-money casino result — the version a
blackjack-training product would most like to be true. **Permitted citation form:** F8 may be cited
only for "won money in a casino setting" / "a naturalistic setting," with **F7's "mock casino" as the
more specific and more reliable characterisation of the same probes.** The "actual casino" framing
must not propagate downstream. (Note: the dissertation *does* use "authentic casino outcomes" — but
that is **Experiment II**, the self-report/outcome-variance study, **not** the Experiment III training
result. The two were conflated.) Logged **open** at conflict-register row **#28** (V6b's record cites
it as row 27; it was appended as **28**): whether the money was won with real money in a real casino or
with chips in a mock one is *the* load-bearing question for how much this result can carry, and neither
abstract settles it. Neither full text is reachable to resolve it.
- Provenance: PUBLISHED (doctoral dissertation — not a peer-reviewed journal article; institutional
  repository record, not independently peer-reviewed the way F7 was)
- Proposed status bucket: Evidence-backed (corroborating/method-context only — same author and same
  lab as F7; this is corroboration from the same research program, not an independent replication)
- Proposed evidence-quality tier: Q4 — non-peer-reviewed terminal-degree document; its Experiment III
  describes the same behavioural-skills-training/card-counting work as F7 (same PI, overlapping
  timeframe), so it should be read as elaboration of F7's method and framing, not as a second
  independent data point on training efficacy.
- Source: Speelman, R.C. (2016). "Using Behavioral Skills Training to Promote Optimal Blackjack
  Strategies." Doctoral dissertation, Southern Illinois University Carbondale.
  https://opensiuc.lib.siu.edu/dissertations/1265/
- Access: **abstract-level only.** The repository page states plainly: "This dissertation is only
  available for download to the SIUC community." I am not SIUC-affiliated; ProQuest Dissertations &
  Theses access was not attempted (no institutional login available to me). The abstract itself was
  extracted **locally from the OpenSIUC page's raw HTML** (not an AI fetch-summary) — the full text of
  the abstract below is exact, not paraphrased.
- Proposed supporting location: Abstract (OpenSIUC repository record, dissertations/1265).
- Claimed strength (exact quote, locally extracted, ~~in full~~ **— abstract, Experiments I–III
  sentences**): **[C6-EC, 2026-07-20 — label corrected, per V6b.]** V6b diffed the quoted span
  character-by-character: it is **verbatim exact** (only a curly-apostrophe difference). But it is
  **not the full abstract** — four opening sentences are omitted before it, and one after it: "Overall
  the results suggest recreational players make significant errors and would likely benefit from
  training procedures designed to educate and promote optimal choice." In fairness, the omitted closer
  is *pro-training* and hedged, so the omission does **not** inflate the dossier's case and arguably
  under-claims. The label was still wrong and is corrected. Quote as given:
  "The current set of experiments were
  designed to analyze choice behavior in the context of blackjack and the outcomes related to various
  choices and strategy. Experiment I examined recreational blackjack player's choices and the
  associated odds produced by these choices. The results found that recreational players made
  significant deviations from optimal strategies and that these choices produced financial losses that
  were far greater than those commonly advertised by the gaming industry. Experiment II investigated
  the relationship between self-reported strategy and authentic casino outcomes. The results found that
  authentic casino outcomes varied widely; those using poor strategy may contact small wins or
  substantial losses over short periods of play. Experiment III examined the efficacy of a behavior
  skills training procedure designed to promote optimal choices in blackjack and notably, to teach a
  specific skill in blackjack (sometimes referred to as card counting). The results indicate these
  skills could be taught using behavioral procedures and generalized to a naturalistic setting.
  Following training, three participants won money in a casino setting, likely improving the
  entertainment value and reducing the financial costs of the game."
- Caveats / population / domain limits: same author, same lab, same apparent dataset/design as F7
  ~~(the "3 of 4 participants won money" figure matches F7's abstract exactly)~~
  **[C6-EC, 2026-07-20 — stated basis corrected, conclusion retained, per V6b.]** The figures do **not**
  match exactly: the dissertation says "**three participants**," not "3 of 4." The same-study
  identification is nonetheless **well-supported** on other grounds — same author, same PI, same
  procedure, three winners, overlapping timeframe. V6b is correcting the *stated basis*, not the
  conclusion. — this is **not** independent
  corroboration of F7, it is very likely the same study reported in a second venue, plus two additional
  experiments (I and II) not otherwise covered by this dossier. Experiments I and II are themselves
  potentially relevant to Q1 (deviation from optimal strategy, self-reported-vs-actual outcome
  variance) but are described only at the one-sentence abstract level here — full method, n, and
  statistics for Experiments I and II are unknown to me and are not claimed. Not peer-reviewed in the
  way F7 was (dissertation committee review is a different bar than journal peer review).

### F9: A blackjack-specific landmark comparing real-casino and laboratory play found significant
differences in physiological arousal, gambling behaviour, and the sensation-seeking/arousal
relationship between the two settings, concluding that laboratory gambling is not a valid stand-in for
real-casino gambling — directly relevant to, and in tension with, F7's mock-casino generalisation
result.
- Provenance: PUBLISHED
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q3 — a real-vs-lab comparative design using existing player
  populations (students and experienced gamblers), not a randomized experimental manipulation of the
  transfer question itself
- Source: Anderson, G. & Brown, R.I.F. (1984). "Real and laboratory gambling, sensation-seeking and
  arousal." *British Journal of Psychology*, 75(Pt 3), 401–410. DOI 10.1111/j.2044-8295.1984.tb01910.x.
  PMID 6487928. 466 citations ~~(Semantic Scholar/Google Scholar aggregate, not independently recounted
  by me)~~. **[C6-EC, 2026-07-20 — UPGRADE, per V6b: independently recounted and confirmed.]** V6b
  queried the Semantic Scholar graph API directly and returned `citationCount: 466` — **exactly right**.
  The collector's honest flag that it had not recounted the figure is superseded by an actual recount.
  V6b also records F9 as the **cleanest citation of the three added by the focused pass**: it passed all
  three verification points on first check, and the source's own passive hedge "Doubt is cast on" was
  preserved exactly as claimed rather than being strengthened to "casts doubt on" / "found" / "showed" —
  checked specifically because of this card's F4 history. No downgrade applies to F9.
- Access: **abstract-level only — full text unreachable**, same Cloudflare-gated Wiley block as F7; no
  OA copy per Unpaywall, no PMC deposit. Abstract extracted **locally from the raw PubMed HTML** (not a
  fetch-summary); this 1984 record carries no ERIC entry to cross-check against, so unlike F7 this
  abstract has only one independently-read source, not two converging ones — flagged so this is not
  overstated as "confirmed via multiple independent sources" the way F7 legitimately can be.
- Proposed supporting location: Abstract (PubMed record for PMID 6487928).
- Claimed strength (exact quote, locally extracted, in full): "The existence and importance of
  excitement in gambling, the effects of runs of wins and losses on gambling behaviour and the
  relationships of both with sensation-seeking were investigated using samples of students and
  experienced gamblers in real and artificial gambling situations. Heart-rate increases, gambling
  behaviour and events such as 'stake decision time' were recorded as subjects played blackjack.
  Significant differences between real and artificial casinos were found for mean heart-rate increases
  over base-lines, for gambling behaviour and in the relationships between sensation-seeking, arousal
  and gambling in the two conditions. Doubt is cast on laboratory gambling as a valid analogue of the
  real gambling situation. Sensation-seeking and arousal are discussed briefly in relation to
  explanations of gambling." Note the exact phrasing is "**Doubt is cast on** laboratory gambling..."
  — quoted here in the source's own word order, not the more commonly paraphrased "casts doubt on."
- Caveats / population / domain limits: 1984, dated relative to modern casino/app contexts; the
  transfer question it answers is about **physiological/behavioural authenticity** of lab blackjack
  generally (arousal, heart rate, betting behaviour, sensation-seeking relationships) — it is not a
  study of *trained-skill* transfer specifically, and does not speak to whether a taught skill (like
  F7's counting) would or would not hold up under real-casino arousal conditions. That specific
  question — does a *trained* skill survive the arousal gap this paper documents — is unanswered by
  either F7 or F9 alone and is exactly the tension logged in the conflict register.

## Coverage gaps found by this pass (in addition to those above)
- **A distinct "replication and extension" publication could not be independently confirmed to exist**
  as a separately citable source. V6's sufficiency section named "'Using Behavioral Skills Training to
  Improve Casino Blackjack Strategy: Replication and Extension' — a direct replication+extension" of
  F7, but I could not locate independent bibliographic confirmation (venue, year, DOI) via Crossref,
  ERIC, Semantic Scholar's search API, or PMC/NCBI eutils search across several query phrasings. The
  closest match I found is F8 (Speelman's 2016 dissertation), whose Experiment III describes the same
  training procedure and reports the same "3 of 4 participants won money" figure as F7's abstract —
  this may be what the title refers to, or it may be a separate conference paper/poster with no
  independent index footprint I could reach. I am not citing a "replication and extension" as its own
  source because I could not verify one exists distinct from F7/F8. Logged as a fresh lead below rather
  than guessed at.
- **Neither F7 nor F9's full text was obtainable by any route I tried** (direct Wiley/DOI curl,
  Unpaywall, Semantic Scholar, PMC/NCBI eutils, ERIC, Crossref for OA links). Unlike F5 in the original
  verification pass, these are not simple referer-gated 403s but Cloudflare JS-challenge blocks; I
  could not confirm this is bypassable by any means available to me. A future pass with institutional
  access (SIUC library for F8's full dissertation; a university proxy for F7/F9's Wiley full text) could
  close this gap and should specifically check F7's full Method section for exact session counts,
  time-to-criterion, and any retention follow-up not visible in the abstract.
- **Experiments I and II of the Speelman (2016) dissertation (F8)** are described only at one-sentence
  abstract granularity here and were not separately verified or tiered as their own findings; a future
  pass with SIUC access could determine whether either bears additional weight on Q1 beyond what F1–F2
  already establish.

## Conflict-register entry added by this pass
Appended to `journal/raw/_inbox/foundation-audit-p1/registers/conflict-register.md` as row **26**.
Note: the register had been concurrently updated by other passes (C1-FP, C2-FP, C3-FP) between when
V6 wrote its record and when this pass ran — the highest row present at write time was **25**, not 17
as V6's own text implied, and row 17's original content had also been re-appended verbatim as row 25
by an earlier pass. Row 26 refines rows 17/25 (the Speelman-vs-Anderson&Brown transfer tension V6
surfaced but could not read either primary source for) by supplying the exact, locally-extracted
abstract quotes for both sides, obtained in this pass. Still logged **open** — this pass did not
resolve it, per instruction.

## Source-lead-register entry added by this pass
Appended to `journal/raw/_inbox/foundation-audit-p1/registers/source-lead-register.md` as row **26**
(highest existing row was 25): documents the failed search for a distinct "replication and extension"
publication (see Coverage gaps above) as a fresh, specific lead for any future pass with better
database access, and records that F7/F9 full text is genuinely unreachable (Cloudflare-gated, not
referer-gated) rather than merely unattempted.

## Focused-pass self-QA
- [x] Every finding (F7–F9) carries provenance, proposed status bucket, proposed quality tier, exact
      quote, and access note.
- [x] Design and n stated plainly for the single-subject ABA work (F7: n=4, multiple baseline) and not
      allowed to imply population-level efficacy anywhere in this section or in the corrected Q1/Q2
      gap paragraphs.
- [x] Only the Q1, Q2, and Q4 coverage-gap paragraphs were rewritten; Q3's paragraph was not touched.
- [x] No existing finding (F1–F6), quote, tier, or section above this pass's appended content was
      altered, deleted, or rewritten.
- [x] The Anderson & Brown / Speelman opposing-positions tension is logged in the conflict register and
      explicitly left open, not resolved.
- [x] Citation count for this pass: 3 (F7, F8, F9) — within the stated hard cap of 8; below the stated
      4–6 floor. Not padded to reach the floor: a fourth candidate (the PMC4883474 behaviour-analytic
      gambling-research review) was checked and found not to mention Speelman's work or blackjack
      training at all (it centers on slot machines and near-miss effects), so it was left uncited rather
      than added merely to hit a count — the same discipline the original dossier's self-QA applied.
- [x] Quotes checked against source hedges: "doubt is cast on," not strengthened to "proves" or
      "shows"; "3 of 4 participants," not rounded to "most" or "nearly all."
