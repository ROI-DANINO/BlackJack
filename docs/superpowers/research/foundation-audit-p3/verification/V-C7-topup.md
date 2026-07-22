# Verification Record: C7 top-up (F15–F20) — teaching probability, EV, variance, risk

> Verifier: Claude (Opus 4.8), fresh instance — not the C7 collector, not the top-up collector,
> not the V-C7 verifier, not the editorial pass.  |  Date: 2026-07-22
> Scope: **F15–F20 only**, plus the top-up pass's absence claims, transfer-distance ratings,
> declined citation, integrity claims, and disclosed cap breach. F1–F14 were verified at V-C7 and
> are **not** re-verified here.
> Contract: exists + supports + strength-honest. VERIFIED requires an exact supporting location.
> **Every source below was independently located and opened by me.** Neither the dossier, nor
> `C7-topup-report.md`, nor `V-C7.md`, nor `L-C7.md` was used as evidence for any claim about a
> source. Where an extraction returned an absence, I re-queried the source directly rather than
> treating the absence as proof (this caught one false negative of my own — see F19).
> Tooling constraint (structural, disclosed): **no Bash tool**. No git, no diff, no repository
> history. PDFs saved to disk by the fetch layer were read page-by-page as **rendered pages**.

## Axis 1 — per-citation states

| # | Claim | Source (id / title / URL·DOI) | Indep. located? | Exists | Supports | Strength honest | State | Supporting location (VERIFIED only) | Quality tier | Notes / downgrade |
|---|---|---|---|---|---|---|---|---|---|---|
| F15 | Single ~60-min interactive game reduced six biases (d up to 1.74), persisting 8–12 weeks; beat video on commission, lost to it on knowledge; **no untrained control arm**; none of the six biases is outcome bias | Morewedge, Yoon, Scopelliti, Symborski, Korris & Kassam (2015), *PIBBS* 2(1), 129–140, DOI 10.1177/2372732215600886 — accepted MS, City Research Online, `openaccess.city.ac.uk/id/eprint/12324/1/Debiasing_Decisions_PIBBS.pdf` | YES — PDF saved locally, **all 30 pages read as rendered pages** (manuscript pp. 1–29 + figures) | YES | YES | YES (one minor overstatement, C-C7T-001) | **VERIFIED** | MS pp. 2, 11, 12, 13, 14, 16, 17–19, 20, 21, 22–23, 25; Figs. 1–2 (pp. 27–28) | Q2 upheld | Every verbatim quote in F15 matched character-for-character. See "F15 in detail" |
| F16 | Same game's debiasing transferred to a real, unannounced **graded** business decision weeks later; 29% less likely to choose inferior solution; not randomised, not preregistered | Sellier, Scopelliti & Morewedge (2019), *Psychological Science* 30(9), 1371–1379, DOI 10.1177/0956797619861429 — Wharton-hosted PDF | YES — PDF saved locally, **pp. 1371–1379 read as rendered pages** (version of record, incl. Table 1, Fig. 1, both notes, all declarations) | YES | PARTLY | NO — "graded" is not in the paper | **DEFECTIVE** | (corrections C-C7T-002, -003, -004) | Q3 upheld | 29% correct and confirmed at both stated loci; the collector's 19%→29% correction is right |
| F17 | Even in natural-frequency format ~3/4 still fail; ~half translate frequencies back into probabilities | Weber, Binder & Krauss (2018), *Frontiers in Psychology* 9:1833, DOI 10.3389/fpsyg.2018.01833 | YES — Frontiers full text, opened and re-queried by me on targeted literal-quotation prompts | YES | YES | NO — an unmarked truncation supports a false statement about the source | **DEFECTIVE** | (corrections C-C7T-005, -006, -007) | Q3 upheld | The defect runs **pessimistic**: the dossier refuses a figure the paper prints |
| F18 | Randomised wait-list-controlled trial of cognitive treatment whose first ingredient is correcting erroneous perceptions of randomness; significant change on all measures; gains maintained at 6 and 12 months | Ladouceur, Sylvain, Boutin, Lachance, Doucet, Leblond & Jacques (2001), *J Nerv Ment Dis* 189(11), 774–780, PMID 11758661 | YES — PubMed record opened by me | YES | YES | YES | **VERIFIED** | Abstract, PubMed PMID 11758661 | Q2 (abstract-limited) upheld | Abstract matches **word for word**. Author list, order, journal, year, pages all correct. PubMed publication types include *Randomized Controlled Trial* — design claim independently corroborated |
| F19 | 2024 integrative review: benefits tentative and confined to "habits of mind"; persistent failure on LLN; **not one** reviewed study was a controlled experiment | Gok & Goldstone (2024), *Cogn. Research: Principles and Implications* 9:33, DOI 10.1186/s41235-024-00561-x, PMC11139845 | YES — PMC full text, opened and **re-queried twice** by me | YES | YES | NO — the quote is real but its scope is over-extended, and the same review cites two controlled experiments | **DEFECTIVE** | (correction C-C7T-008) | Q3 upheld | The load-bearing quote **is verbatim** and sits under "Literature search". My first extraction missed it; I re-queried rather than record an absence |
| F20 | Casino blackjack players use a transparently false ten-heuristic; easier to learn, associated with better expected returns; EV inference "may be both uncommon and non-normative" | Bennis (2025), *Mind & Society* 24(2), 275–301, DOI 10.1007/s11299-025-00346-9 | YES — Springer article page, reached through the 303→`?error=cookies_not_supported` chain; abstract served in two passes covering the whole text | YES | YES | YES | **VERIFIED** | Publisher abstract, Springer article page | Q4 upheld | Abstract quoted **in full and verbatim**, including the (a)(b)(c) contentions. Handling is proportionate — see "F20 in detail" |

**Summary: VERIFIED 3 (F15, F18, F20) · DEFECTIVE 3 (F16, F17, F19) · UNVERIFIABLE 0 · DROPPED 0.**
No citation in F15–F20 is dropped. All three DEFECTIVE states are repairable in place; none removes a source.

## Resolution log (every citation UNVERIFIED at any point)

| # | Which point failed | Move taken | Terminal state | Note |
|---|---|---|---|---|
| F19 | exists (apparent) | re-query the same source with an exact-string prompt instead of an enumeration prompt | **VERIFIED (quote) / DEFECTIVE (scope)** | My first extraction returned every sentence containing "controlled" and the load-bearing sentence was **not** among them. Treating that as proof would have manufactured a kill against a true quote. Re-queried for the literal string; it exists |
| F20 | exists (apparent) | follow the Springer redirect chain and re-query for the abstract's closing sentences specifically | **VERIFIED** | First pass returned an abstract truncated at "…how they play each blackjack hand", omitting exactly the passage F20 leans on. Second pass at the same host returned it verbatim. A RePEc extraction I also ran returned a **paraphrase** and was discarded, not used |

## Kills (citations dropped)

None. No source in F15–F20 fails to support a claim badly enough to be dropped.

## Quarantine (UNVERIFIABLE)

None among F15–F20. One item I raise below (Steenbergh et al. 2004) was reached only at search level and is carried as a **lead**, not as evidence.

---

## Corrections raised

Material defects only. IDs are unit-local, assigned by me; they are **not** shared-register IDs.
Every "required replacement" below is drawn from a source I opened myself and is quoted verbatim.

| ID | Locus | Correction | Remedy |
|----|----|----|----|
| C-C7T-001 | F15, "Proposed evidence-quality tier" line | "two pre-registered-to-sponsor longitudinal experiments" overstates. The paper claims only that **sample sizes** were declared in advance; no hypotheses or analysis plan were registered. Verbatim, MS p. 14: "Sample sizes were declared in advance to our government sponsor, and independent third-party analyses of the data were performed that confirmed the accuracy of our results (Kopecky, McKneely, & Bos, 2015)." **Required replacement:** "two longitudinal experiments whose **sample sizes** were declared in advance to the government sponsor — a sample-size declaration, **not** a preregistration of hypotheses or analysis plan" | editorial |
| C-C7T-002 | F16 headline (`#### F16: …`) | **"graded" is not supported by the paper.** The word does not appear, and nothing in Method, Procedure, Results or Discussion states that the case was graded or counted toward course marks. What the paper states, verbatim (p. 1373): "Between 6 and 49 days after the start of the gaming sessions, participants individually solved a modified version of the 'Carter Racing' business case in one of their regularly scheduled classes." and "The case was not announced on the syllabi of the courses in which it was administered, the faculty administering the training and case were different, and no other connection was made between the case and the intervention." The only grading in the paper is the *students'* pre-existing GPA, collected as a covariate (p. 1374). **Required replacement:** strike "graded" — headline to read "…transferred to a real, unannounced business decision solved in a regularly scheduled class weeks later". *Real* ✓ and *unannounced* ✓ both stand and are independently confirmed | editorial |
| C-C7T-003 | F16, "Main result, verbatim (p. 1374)" and "CRT" quote (p. 1375) | Two silent typographic alterations inside passages presented as verbatim. (a) The dossier renders "95% CI [0.33, 0.92]"; the paper prints "95% CI = [0.33, 0.92]". (b) The dossier renders "…untrained participants (*M* = 2.18, 95% CI = [2.00, 2.36])"; the paper prints "…untrained participants (*M* = 2.18, 95% CI = [2.00, 2.36]; mean difference = 0.26, …" — the closing parenthesis is the dossier's insertion. Neither changes meaning; both breach the verbatim contract, and are the same class as landed C-C7-002 and C-C7-004. **Required replacement:** restore "95% CI = [0.33, 0.92]"; and mark the second as a truncation, e.g. "…95% CI = [2.00, 2.36]…" | editorial |
| C-C7T-004 | F16, "Caveats / population / domain limits", final bullet | The independence conclusion is left for the reader to draw. All the ingredients are correctly cited, but the dossier never states that **F16 is not independent corroboration of F15**: Morewedge is an author of both; Scopelliti is an author of both; F16 evaluates the same proprietary game that F15 credits, verbatim (F15 MS p. 15), to "(produced by Symborski, Barton, Quinn, Morewedge, Kassam, & Korris, 2014)" — i.e. to an author group including Morewedge; and F16's declaration reads, verbatim (p. 1378): "The author(s) declared that there were no conflicts of interest with respect to the authorship or the publication of this article." **Required replacement:** add — "**Not independent corroboration of F15.** Two of F16's three authors (Morewedge, Scopelliti) are authors of F15, and the evaluated game is the one F15 credits to an author group including Morewedge. F16 declares no conflicts of interest notwithstanding. F16 extends F15's own programme to the field; it does not replicate it from outside." | editorial |
| C-C7T-005 | F17, "Sample, verbatim" bullet — **material** | The finding states: "**I do not state a combined participant total: the paper, in what I read, does not print one, and the arithmetic would be mine.**" **The paper does print one.** Discussion, first sentence, verbatim: "In an empirical study with *N* = 180 students from the University of Regensburg, we found that the majority of participants do not actively use natural frequencies in Bayesian reasoning tasks." The reconciliation is inside the very sentence the dossier truncated — full text, verbatim: "We recruited *N* = 114 students from the University of Regensburg (Bavaria) in summer 2016, and *N* = 69 in winter 2017/2018 (three of which were excluded from the analysis since they had already participated in the study in 2016)." (114 + 69 − 3 = 180, the paper's own figure.) **Required replacement:** restore the truncated clause, and replace the refusal note with — "**Combined N = 180**, the paper's own printed figure (Discussion, verbatim: 'In an empirical study with *N* = 180 students from the University of Regensburg…'); 114 + 69 − 3 excluded repeat participants. No arithmetic of mine is involved." **Note the direction: this correction is an *upgrade*. The dossier under-claimed.** | editorial |
| C-C7T-006 | F17, "Discussion, verbatim" bullet — **material** | The quotation presented as verbatim **begins mid-sentence with no ellipsis**, and the elided words are precisely the printed N=180 whose existence C-C7T-005 shows the finding denies. Printed sentence, verbatim: "In an empirical study with *N* = 180 students from the University of Regensburg, we found that the majority of participants do not actively use natural frequencies in Bayesian reasoning tasks." **Required replacement:** quote the sentence from its start, as printed above | editorial |
| C-C7T-007 | F17, "The mechanism, verbatim" bullet (the 18% clause) and "Caveats" bullet | (a) The 18% fragment is verbatim but stripped of its conditioning clause and sits adjacent to a 49% quote about the *frequency* condition, where it reads as though it concerns the same condition. Printed, verbatim: "On the other hand, when they faced a probability version of a task (first and third bars of Figure 2), only 18% across both contexts chose to translate the problem into natural frequencies." **Required replacement:** restore the leading clause. (b) The population inference is **substantively warranted** — the paper prints, verbatim: "Most of these students were enrolled in a teaching math program (*N* = 147), while some of them studied economic information technology, so a certain level of mathematics competency among the participants can be assumed." — but the clause "**than the paper's framing implies**" is not: the paper states the competency assumption openly and further reports, verbatim: "The *N* = 42 mathematics education students aspiring to teach at the academic school track of the German school system (Gymnasial students) outperformed the other *N* = 138 participants significantly." **Required replacement:** drop "than the paper's framing implies" and add the direction the dossier omits — "the paper states this itself; and because the sample is *more* mathematically schooled than a lay adult, a 36% frequency-format success rate is a **conservative** ceiling for a lay learner, not an inflated one." | editorial |
| C-C7T-008 | F19, headline; "Claimed strength" bullet 2; "Why this is the most useful G6 item"; and the G6 line of "Sufficiency after the top-up" — **material** | The quote "Notably, none of the studies included controlled experiments." is **verbatim and real** (section: "Literature search") — that part is upheld. But its scope is the review's own **inclusion corpus**, and the dossier omits the sentences that immediately follow it and that bound it. Verbatim: "Notably, none of the studies included controlled experiments. We did not impose any constraints on the inclusion criteria based on the empirical methods the studies used (see Table 1). As a result, 28 studies were either pre-post-test comparisons within a single group or observational qualitative studies that probed students' understanding 4 other studies included an additional no-simulation comparison group. A single study used a quasi-experimental design to compare two simulation activities." Further, **the same review cites two controlled experiments elsewhere in its own text**, verbatim: "In a recent controlled experiment, we tested the promises of this grounded approach for the design of sampling simulations (Gok et al., 2024)." and "Zhang et al.'s (2022) controlled experiment yielded similar results. Students who watched a hands-on video before using R simulations demonstrated better understanding than those who used R simulations alone." The dossier's gloss "**the field's *whole* reviewed evidence base still contains no controlled experiment**" and the sufficiency line "**F19 confirms the field has no controlled experiments**" are therefore **not supported**. **Required replacement:** bound the claim — "none of the studies **in this review's inclusion corpus** was a controlled experiment; 4 of them did include a no-simulation comparison group and 1 used a quasi-experimental design. The review separately cites two controlled experiments outside that corpus (Gok et al., 2024 — by this review's own first author; Zhang et al., 2022), neither of which this dossier has read." | **editorial** for the wording; **collection** for Gok et al. (2024) and Zhang et al. (2022) if G6 is to be closed |
| C-C7T-009 | Top-up section, "Searched and came up empty in this top-up pass", third bullet — **material** | The absence claim "**A randomised trial of *instruction in randomness* aimed at gambler's fallacy or illusion of control in a non-clinical adult population** … was not found" **does not survive.** I opened PubMed record **PMID 16536667** myself. Floyd, K., Whelan, J.P. & Meyers, A.W. (2006), "Use of warning messages to modify gambling beliefs and behavior in a laboratory investigation," *Psychology of Addictive Behaviors* 20(1), 69–74. Abstract, verbatim: "Participants were 120 undergraduate students from an urban state university who reported previous gambling activity. They were recruited to play a computerized roulette game with imaginary money. … Participants were randomly assigned to 1 of 2 conditions. In the warning-message condition, participants received an educational component discussing common irrational beliefs expressed by gamblers and, while playing roulette, viewed brief messages that addressed irrational gambling beliefs. In the control condition, participants received an educational component on the history of roulette but no warning messages. Participants in the warning-message condition reported significantly fewer irrational beliefs and demonstrated less risky gambling behavior than those in the control condition." That is: **non-clinical adults · randomised · active control · instruction about irrational gambling beliefs · outcomes = beliefs *and* actual play in a chance game · positive result.** **It sits at PMID 16536667 — one greater than F5's PMID 16536666 — in the same journal, same volume, same issue, on the immediately following pages (F5: 20(1), 62–68; this: 20(1), 69–74).** **Required replacement:** retract the absence claim; add the finding; and correct the G5 characterisation "thin, clinical, abstract-level" and "essentially unevidenced", which are no longer true | **collection** (retrieve Floyd et al. 2006; and Steenbergh et al. 2004, below) **and** editorial (retract the absence claim) |
| C-C7T-010 | F20, Source line and Caveats | Completeness, and it runs in the source's **favour**. The dossier gives no volume/pages and no funding or competing-interests check for the dossier's only D1 blackjack item. I read them at Springer. **Required replacement:** cite as "*Mind & Society*, 24(2), 275–301"; author affiliation "Faculty of Business Administration, Prague University of Economics and Business"; and add — "**Independence checked:** funding, verbatim: 'The research was supported by a Fulbright-Hays Doctoral Dissertation Research Abroad Fellowship and a Social Science Research Council International Dissertation Field Research Fellowship.' Competing interests, verbatim: 'The author declares no conflict of interest.' No gambling-industry, casino or vendor funding. Data availability is limited, verbatim: 'Field observation and interview data are unavailable to protect participant anonymity. Survey data is available upon reasonable request from the author.'" | editorial |

## Non-material notes (mechanical — not gated)

- F15 and F16 both contain quotations that end mid-sentence at a natural break without a terminal
  ellipsis (e.g. F15's p. 12 intervention-length quote; F16's p. 1372 population quote). The quoted
  strings are themselves exact. I do **not** raise these: the quoted text is unaltered, and raising
  them would be manufacturing.
- F17's abstract quote carries italic emphasis on "use", "presentation format", "calculation format".
  Frontiers does italicise these; my plain-text extraction strips italics either way, so I cannot
  adjudicate and decline to invent a defect.
- F15's Experiment 2 section heading reads "ANCHORING, PROJECTION BIAS, AND REPRESENTATIVENESS"
  while the abstract says "social projection". The dossier follows the abstract. Not a defect.

---

## F15 in detail — the collector's self-nominated weakest claim is its strongest

The top-up report nominated F15's no-untrained-control-arm claim as "the single claim in this pass I
most want attacked", flagging it as its own reading of pp. 14–23 rather than a stated limitation.

**I attacked it and it holds.** I read the entire accepted manuscript (all 30 PDF pages, MS pp. 1–29
plus both figures), not the pp. 14–23 the collector read. Findings:

- **The design has exactly two arms.** Testing Procedure, verbatim (MS p. 16): "Next, each
  participant was randomly assigned to receive one of the training interventions, to either play the
  game or watch the video, without repetition." Experiment 2, verbatim (MS p. 21): "The experiment
  adhered to the same testing procedure as described in Experiment 1, with the exception that the
  follow-up was administered 12 weeks after participants completed their laboratory session."
- **Figure 1 (MS p. 27)** plots the whole design as PRETEST (In Laboratory) → TRAINING (Game/Video)
  → POSTTEST (In Laboratory) → FOLLOW-UP (+8 or 12 weeks). There is no third path.
- **Figure 2 (MS pp. 28–29)** plots Game and Video only; its caption, verbatim: "Symbols indicate
  statistically significant and marginally significant differences between game and video conditions
  at posttest and follow-up".
- **The manuscript has no Limitations section at all**, so the absence of this as a stated limitation
  is confirmed, not merely unobserved.

The collector's caveat is **correct**, correctly attributed to itself, and now established across the
full paper rather than a page range. It also confirms that random assignment *did* occur (to game vs
video), which is what F15's Q2 rating rests on. **No correction.** This is the anti-pessimism case
the brief asks me to state plainly: a sound finding, stated as sound.

Also independently confirmed, each verbatim and character-for-character against the rendered pages:
the full abstract (p. 2); the six trained biases (p. 11) — **bias blind spot, confirmation bias,
fundamental attribution error, anchoring, representativeness, social projection; outcome bias is not
among them, and G4 is therefore not improved by F15**; the IARPA BAA-11-03 funding sentence (p. 11);
the 30/60-minute intervention lengths (p. 12); the sampling-rule quote (p. 13); both participant
blocks (pp. 14, 20); the third-party re-analysis sentence (p. 14); the counterbalancing sentence
(p. 17); Experiment 1 overall bias including *d* = 1.68/1.11 vs .69/.66 (pp. 17–18); the untrained-
facet generalisation and the "*t* < 1" follow-up contrast (p. 19); Experiment 1 and Experiment 2
bias-knowledge results *F*(1, 240) = 15.52 and *F*(1, 235) = 11.07 (pp. 20, 23); Experiment 2 overall
bias including **d = 1.74** (p. 22); anchoring "*F*s < 1, *p*s > .62" (p. 22); representativeness
(pp. 22–23); the anchoring α of .60/.52/.62 (p. 21); and the p. 25 summary percentages and the
"more research is needed to determine precisely why" sentence. **All exact.** I also confirm the
collector's statement that the accepted manuscript carries **no** Declaration of Conflicting
Interests.

## F20 in detail — is an abstract-only source being over-leaned on?

**No.** F20 states its Q4 tier and D1 distance together and explicitly writes that "near transfer buys
relevance, not strength"; labels contention (b) as the author's theoretical contention rather than a
measured result; enumerates what may not be claimed; and states "**Nothing here may be cited as a
number.**" The abstract is quoted in full and is verbatim — I confirmed the opening at Springer and
then re-queried the same host specifically for the closing sentences, which returned, verbatim: "The
heuristic is used as a case to support several theoretical contentions: (a) despite established
precedent, gambling is not a good domain-general metaphor for decision making under risk or
uncertainty; (b) even in a small-world domain where outcome likelihoods can be calculated and
monetary outcomes are unambiguous, using subjective probability to infer expected value may be both
uncommon and non-normative; and (c) a focus on narrow, domain- and culture-specific heuristics and
biases—despite their limited scope—offers valuable lessons about how, and how well, people make
decisions." The ten-heuristic characterisation matches, verbatim: "The heuristic assumes that all
upcoming cards will be 10-value cards, even though that assumption is true fewer than one in three
times." Only C-C7T-010 applies, and it strengthens the finding.

## Transfer-distance audit (all six)

| # | Rating | Verdict |
|---|---|---|
| F15 | "D3 (far) on content, and the dossier's closest match on *format*" | **Honest, not smuggled.** The formal rating is D3. The format claim is separately labelled, is true (single-session interactive game, personalised feedback, adaptive extra practice), and is immediately followed by an explicit prohibition: reading F15 as evidence about teaching probability or EV "would be exactly the CFL-007 error the brief forbids". This is the opposite of the CFL-007 failure mode |
| F16 | D3 (far) | Correct. Business-case judgement, no chance game, no stakes |
| F17 | D3 (far) | Correct. Bayesian word problems |
| F18 | D2–D3 | Slightly generous under the dossier's own scale — participants perform no gambling task and the outcome is pathology — but the *content* is randomness beliefs in real gambling, and the finding carries an explicit "A healthy adult learning basic strategy is not this population" warning. **Acceptable; no correction** |
| F19 | D3 (far) | Correct, and it honestly declines to claim an adult-only population |
| F20 | D1 (near) | Correct under the scale — adults, real casino blackjack, real money, the actual hit/stand decision — and correctly paired with Q4 and with the "relevance, not strength" warning |

No rating in this pass repeats the CFL-007 error. The dossier does **not** rate any hypothetical
vignette as near transfer.

## Independent absence-claim searches

I searched by routes the collector did not name (Semantic Scholar graph API; targeted author/title
queries; PubMed record-level reads; same-issue/adjacent-record inspection).

| Absence claim | My verdict | Basis |
|---|---|---|
| No controlled study teaching EV reasoning and measuring improvement in **actual card-game play** | **SURVIVES** | My independent query returned the same three categories the collector reported: reinforcement-learning/curriculum-learning papers about *machines* solving blackjack, practitioner and course material, and F20 itself. Nothing instructional-plus-behavioural |
| No debiasing-training study targeting **outcome bias** | **SURVIVES** | The only dedicated intervention returned was Sezer et al. (2016), already held as F14. G4 is unchanged, and F15's bias list independently confirms outcome bias is not among the six. **Caveat, not a collapse:** Fasolo, Heard & Scopelliti (2025), "Mitigating Cognitive Bias to Improve Organizational Decisions," *Journal of Management*, is a 2025 integrative review of debiasing interventions co-authored by **Scopelliti — an author of both F15 and F16, already twice in this dossier**. It is the obvious place a counter-example would be enumerated and was not consulted. Logged as a lead |
| No randomised trial of instruction in randomness for gambler's fallacy / illusion of control in a **non-clinical adult** population | **COLLAPSES** | Floyd, Whelan & Meyers (2006), *Psychology of Addictive Behaviors* 20(1), 69–74, **PMID 16536667** — opened by me; see C-C7T-009. 120 undergraduates, randomly assigned, educational component on irrational gambling beliefs vs history-of-roulette control, positive on both beliefs and play. **PMID 16536667 is one greater than F5's PMID 16536666, in the same journal, volume and issue, on the immediately following pages.** A second candidate — Steenbergh, Whelan, Meyers, May & Floyd (2004), *International Gambling Studies* 4(1), 3–16, N=101, randomised to warning / warning-plus-limit-setting-and-irrational-beliefs / history video — I reached at **search level only** and carry as a lead, not as evidence |

The collector's own "checked at two hosts" standard was met in form. It failed here because both of
its routes (general web query; PubMed restricted to a randomness-instruction phrasing) were framed
around the *intervention's* vocabulary. The paper that breaks the claim is framed around "warning
messages", and sits one page-turn from a source the dossier already holds.

## The declined citation — Luquiens et al. (2025)

**Exclusion upheld.** I opened PubMed **PMID 39819891** myself. The intervention is, verbatim: "a
web-based cognitive training program targeting inhibition unrelated to addiction cues or a control
program on visuo-spatial functioning"; the population is "adults with problem gambling (CPGI ≥5)";
the result is, verbatim: "No significant differences were found between groups for any outcome." The
collector's characterisation — a 185-participant RCT, null, active ingredient inhibition training
rather than instruction in randomness — is **exactly right** (185 randomised: 93/92). Declining it as
a G5 *finding* while logging it as a lead is the correct call: its mechanism is not the one G5 asks
about and its population is clinical. **No correction.**

## Integrity check

Enumerated positively at the file, not accepted from the collector's confirmation.

- **`[LANDED C-C7-NNN]` markers: 22 occurrences present**, at lines 10, 41, 47, 109, 121, 150, 264,
  326, 448, 578, 623, 682, 797, 839, 916, 936, 956, 976, 998, 1014, 1054, plus the summary at 1079.
  **All ten IDs C-C7-001 … C-C7-010 are present and accounted for.** ✔
- **Struck-through superseded wording intact** — `~~…~~` spans present throughout F1–F14 and the
  pre-top-up sections (lines 9, 31, 107, 116, 143, 256–263, 441, 583–621, 675, 787, 826, 907, 932,
  947, 948, 964, 971, 994, 1049, 1050 among others). Nothing appears deleted in place of a strike. ✔
- **Failed-retrieval table parses at 12 data rows** — lines 943–954, headers at 941–942. ✔
- **Sufficiency table parses at 6 data rows** — lines 991–996 (G1–G6), headers at 989–990. ✔
- **Append-only shape** — both tables sit above line 1000; the entire top-up (F15–F20, its failed
  retrievals, its negative record, its leads, its sufficiency section) is prose from line 1091 to the
  end. No new table row was inserted into either pre-existing table. ✔
- **NOT ESTABLISHED: byte-level immutability of F1–F14.** I have no Bash and therefore no git diff.
  I can state that all landed markers and struck wording are present and internally coherent and that
  F1–F14's content is consistent with the landing narrative; I **cannot** certify that no character in
  F1–F14 changed. This is a real limit of my toolset, disclosed rather than papered over.

## Incidental observations on F1–F14 (out of scope, not re-verified, not acted on)

- **F5 (Williams & Connolly, PMID 16536666) is not defective**, but it is the anchor of the G5 gap:
  the paper that breaks absence-claim C is the next article in the same issue. This is an observation
  about the *search*, not about F5.
- No other issue noticed in passing.

---

## Axis 2 — research sufficiency (judged independently of citation states)

> A dossier is sufficiently researched only when additional searching is unlikely to materially
> change its conclusions. All three DEFECTIVE states above are repairable; sufficiency is a
> separate judgment and is decided here on what the top-up engaged and what it did not.

**Verdict: INSUFFICIENT** — but narrowly, and **two of the three gaps need no new collection at all.**

This is a materially better pass than the collection it remedies. F15 was read in genuine depth and
its *disconfirming* content — the knowledge dissociation, the anchoring null, the funder-built-the-
intervention problem — was surfaced from the same results paragraphs as the headline. F16's 29%
correction is right. F20 was found and handled with unusual restraint. G1 is closed. Two of the
three remaining gaps are the program's signature defect: **material inside sources already in hand.**

### Per question

| Q | My verdict | Reasoning |
|---|---|---|
| **G1** | **CLOSE — SUFFICIENT** | F1 (full text, 15-week retention, designed confound control) + F2 (abstract, meta-analytic scale) + F17 (ceiling and mechanism, primary). After C-C7T-005/-007 land, F17 is *stronger* than written: a mathematically-schooled sample still fails 64% of frequency-format tasks. The F1-vs-F2 graphical-aid item is a **conflict**, not a coverage gap, and does not block closure |
| **G2** | **CLOSE** | Out of scope for this pass; correctly not reopened |
| **G3** | **OPEN, and I judge it *not closable by further collection*** | F15/F16 train confirmation bias, not EV. F5's behavioural null and F20's counter-position stand. **My own independent search reproduces the absence.** I recommend the orchestrator record G3's EV-transfer question as an **evidenced absence** rather than as a gap awaiting a bounded pass; sending a collector after it again is likely to burn a pass for nothing |
| **G4** | **OPEN — INSUFFICIENT, unchanged** | Independently confirmed: none of F15's six biases is outcome bias, so F15 does not touch G4. Sezer et al. (2016) remains abstract-level. **One bounded lead only:** Fasolo, Heard & Scopelliti (2025) *Journal of Management* review — by an author already twice in this dossier — plus the standing Sezer full text |
| **G5** | **OPEN — INSUFFICIENT, and for a reason the dossier does not state** | The dossier's position ("correction by instruction is thin, clinical, abstract-level"; "essentially unevidenced") is **now false**. A randomised, non-clinical, adult, instruction-based study with a **positive** result on both beliefs and play exists and sits at the PMID immediately after a source already held |
| **G6** | **OPEN — INSUFFICIENT** | F19's "no controlled experiments" is bounded to the review's own inclusion corpus; 4 corpus studies had a no-simulation comparison group and 1 was a quasi-experiment, and the review itself cites two controlled experiments (Gok et al. 2024; Zhang et al. 2022). The dossier's stronger gloss must be withdrawn, and the two controlled experiments are the actual G6 evidence |

### If INSUFFICIENT — the three required fields

1. **What important evidence appears missing**
   - **G5:** Floyd, Whelan & Meyers (2006), *Psych. Addict. Behav.* 20(1), 69–74, PMID 16536667;
     and Steenbergh, Whelan, Meyers, May & Floyd (2004), *International Gambling Studies* 4(1), 3–16.
   - **G6:** Gok, Nesbitt, Shipley & Goldstone (2024), the controlled experiment F19's own authors
     report; and Zhang et al. (2022), the controlled experiment F19 cites as yielding similar results.
   - **G4 (lead, lower priority):** Fasolo, Heard & Scopelliti (2025), *Journal of Management*.
   - **Already in hand, needs only reading correctly:** F17's printed N=180 and its Discussion
     opening; F19's bounding paragraph in "Literature search".

2. **Why the omission could materially affect the findings, and in which direction**
   - **G5 moves from negative to mixed-positive.** The dossier currently tells Phase 4 that
     instruction correcting gambling misconceptions is essentially unevidenced outside a clinical
     therapy package. That is the *opposite* of what Floyd et al. report for exactly the population
     this product serves — non-clinical adults, in a chance game, with behaviour measured. A design
     phase reading the dossier as written would under-weight explicit misconception instruction.
   - **G6 moves from "no experimental evidence exists" to "experimental evidence exists and is
     small".** The dossier's current gloss would license the claim that nothing is known
     experimentally about simulations for sampling concepts. That claim is contradicted by the very
     review used to support it.
   - **G1 moves slightly *stronger*** once C-C7T-005/-007 land — the only correction in this pass
     that runs against the dossier's own pessimism.

3. **Exact scope of the one focused pass** — split by remedy route, because these are different jobs:
   - **`editorial` (no new sources; material already held):** C-C7T-001, -002, -003, -004, -005,
     -006, -007, -010, and the wording half of -008 and -009. **Ten items, zero retrievals.** Every
     required replacement above is quoted verbatim from a source I opened.
   - **`collection` (bounded, 4 sources, hard cap 4):** Floyd et al. (2006) and Steenbergh et al.
     (2004) for G5; Gok et al. (2024) and Zhang et al. (2022) for G6. Do **not** reopen G1, G2, G3
     or C1–C6. Do **not** chase the Fasolo/Sezer G4 items in the same pass — G4 is a standing hole,
     not a closable one, and mixing it in will blow the bound.

## Disclosed cap breach — 20 citations against a cap of 15

**Substantively justified; not scope creep.** The cap belonged to the first collection pass. V-C7
ruled that pass INSUFFICIENT on five of six questions and authorised a bounded follow-on of roughly
five sources; six were collected, and each maps to a named open question (F15/F16 → G3+G6, F17 → G1,
F18 → G5, F19 → G6, F20 → G3). None is padding, none was added to reach a count, and the breach is
declared in the dossier header, in the top-up preamble, and in the top-up report. **Process note for
the orchestrator, not a dossier defect:** the remedy authorised a collection that arithmetically
could not fit the cap, and no one amended the cap. That is a gap in the remedy instruction, not in
the collector's conduct.

## Verifier summary

- **VERIFIED: 3** (F15, F18, F20)  |  **DEFECTIVE: 3** (F16, F17, F19)  |  **UNVERIFIABLE: 0**  |  **DROPPED: 0**
- **UNVERIFIED remaining: 0**
- **Absence claims: 2 survive, 1 collapses** (non-clinical adult randomness-instruction RCT)
- **Integrity: PASS** on markers, strikes, both table row counts and append-only shape;
  **byte-level immutability of F1–F14 NOT ESTABLISHED** (no Bash / no git available to me)
- **Dossier sufficiency (F15–F20 scope): INSUFFICIENT** — G1 closes; G4, G5, G6 remain open;
  G3 is open but, in my judgement, not closable by collection
- **Claims the collector overstated:** F16's "graded"; F19's "the field has no controlled
  experiments"; F15's "pre-registered-to-sponsor"; the G5 absence claim
- **Claims the collector *under*stated (upgrades):** F17's refusal to state a combined N — the paper
  prints N = 180; and F17's population caveat, which points in the opposite direction to the one
  stated. The collector's self-nominated weakest claim, F15's missing control arm, **is correct and
  is confirmed across the full manuscript**

## Sources I personally opened

Morewedge et al. (2015) accepted MS PDF, all 30 pages as rendered pages · Sellier et al. (2019)
version-of-record PDF, pp. 1371–1379 as rendered pages · Weber et al. (2018) Frontiers full text
(three targeted literal-quotation queries) · Ladouceur et al. (2001) PubMed record PMID 11758661 ·
Gok & Goldstone (2024) PMC11139845 (two queries, incl. an exact-string query) · Bennis (2025)
Springer article page via the 303 chain (two queries) · Bennis (2025) Semantic Scholar graph record
(abstract elided by publisher) · Bennis (2025) RePEc/IDEAS record (**returned a paraphrase — discarded,
not used**) · Floyd, Whelan & Meyers (2006) PubMed record PMID 16536667 · Luquiens et al. (2025)
PubMed record PMID 39819891.

## Could not reach

- **Morewedge et al. (2015) version of record** (SAGE) — not attempted by me either; I read the same
  accepted manuscript, which carries the repository's own "may differ from the final published
  version" warning. I therefore **cannot** certify the typeset article's numbers, pagination, or
  whether it carries a Declaration of Conflicting Interests. The collector's disclosure on this is
  accurate.
- **Steenbergh et al. (2004)** — reached at search level only; carried as a lead, not as evidence.
- **Gok et al. (2024) and Zhang et al. (2022)** — identified inside F19's text; not retrieved. This
  is the G6 collection remedy, not a claim of mine.
- **Fasolo, Heard & Scopelliti (2025)** — identified; not retrieved. Lead only.
