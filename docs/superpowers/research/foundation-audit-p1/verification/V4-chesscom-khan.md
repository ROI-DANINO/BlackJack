# Verification Record: C4 — Chess.com and Khan Academy learning models

> Verifier: Claude (Opus 4.8) — V4, independent of the collector (Sonnet 5)  |  Date: 2026-07-19
> Contract: exists + supports + strength-honest. VERIFIED requires an exact supporting location.
> Every source is INDEPENDENTLY located by the verifier — the collector's summary is not trusted.

**Method note.** All three Khan Academy help pages returned HTTP 403 to WebFetch, exactly as the
collector reported. Rather than trust a proxy summary, I fetched each page with `curl` (browser
user-agent, HTTP 200) and extracted the article text locally, then read it myself. The NBER working
paper was downloaded as PDF and converted with `pdftotext` (18,407 words) and grepped locally. The
Sala PMC full text was likewise downloaded and grepped locally rather than trusted from a fetch
summary — that check caught one real citation error (F9). Per the shared brief's "known hazard"
warning, every quote below was matched against locally-extracted text, not against a summarizer's
paraphrase.

| # | Claim | Source (id / title / URL·DOI) | Indep. located? | Exists | Supports | Strength honest | State | Supporting location (VERIFIED only) | Quality tier | Notes / downgrade |
|---|---|---|---|---|---|---|---|---|---|---|
| F1 | Chess.com Puzzles uses the same Glicko-style rating logic as regular chess ratings, applied player-vs-item | (a) Chess.com Help, "How do Puzzle ratings work?" https://support.chess.com/en/articles/8602396-how-do-puzzle-ratings-work ; (b) Chess.com News, "New Puzzles Ratings, Difficulty Settings, And More Consistent Experience" https://www.chess.com/news/view/announcing-new-puzzles-rating-system | Yes — both fetched and read | ✓ | ✓ | ✓ | **VERIFIED** | (a) opening sentence of the rating-adjustment section: "Just like in chess, your Puzzle rating adjusts based on the difficulty of each puzzle compared to your current Puzzle rating." — verbatim match. (b) body text: "The new Puzzles rating system uses the same Glicko-style rating logic that we use for your regular chess games." | Q5 | **Quote accuracy correction.** The collector rendered (b) as "The new Puzzle ratings use the same Glicko-style rating logic as your chess games (blitz, rapid, etc.)" under a heading reading "exact quotes". That is a paraphrase, not the page's wording — the parenthetical "(blitz, rapid, etc.)" does not appear in the sentence. Substance is unaffected; the label "exact quote" was inaccurate. Collector's caveat that neither page names Glicko-2 for puzzles is correct and confirmed. |
| F2 | A new puzzle's initial difficulty rating is set by observing who solves it, then locked | Chess.com Help, "How do Puzzle ratings work?" (as above) | Yes — fetched and read twice | ✓ | ✓ | ✓ | **VERIFIED** | Body text, puzzle-side rating section: "When a puzzle is first added, its rating is determined by who is able to solve it. After a set period, the puzzle's rating becomes locked and does not change further. In some cases, if a puzzle's rating is found to be inaccurate, Chess.com may adjust it to better reflect its difficulty." — **verbatim, all three sentences.** | Q5 | Fully confirmed as written, including the collector's caveats (no solver count, no "set period" duration, no formula disclosed). The "about 17 billion" replayed puzzle attempts figure is also confirmed verbatim in source (b): "We've replayed our full history of puzzle attempts (about 17 billion!) to re-rate both members and puzzles using the new algorithm." Collector correctly scoped this as a one-time re-rating event, not routine seeding. |
| F3 | Regular Chess.com game rating is explicitly player-vs-player Glicko with a stated Rating Deviation | Chess.com Help, "How do ratings work on Chess.com?" https://support.chess.com/en/articles/8566476-how-do-ratings-work-on-chess-com | Yes — fetched and read | ✓ | ✓ | ✓ | **VERIFIED** | Body text: "Chess.com uses the Glicko rating system, which includes a measure called 'rating deviation' (RD)." Three listed factors confirmed: rating difference between you and opponent; confidence in your rating; confidence in your opponent's rating. Purpose statement confirmed: ratings "designed to measure their skill level and match them against opponents of similar ability." | Q5 | **Source is stronger than the collector's rendering.** The collector spliced "Chess.com uses the Glicko rating system" and the three factors as separate fragments; the page in fact names rating deviation explicitly in the same sentence as Glicko, and adds "If you're new and haven't played any games, the system is unsure of your 'real' rating, so your rating will fluctuate significantly during your first few games." The claim is if anything under-stated, not over-stated. |
| F4 | Five-level deterministic mastery ladder defined by fixed accuracy thresholds, not a probabilistic estimate | Khan Academy Help, "How do Khan Academy's Mastery levels work?" https://support.khanacademy.org/hc/en-us/articles/5548760867853--How-do-Khan-Academy-s-Mastery-levels-work | Yes — curl HTTP 200, text extracted and read locally | ✓ | ✓ | ✓ | **VERIFIED** | Body text defining each level. All five collector quotes matched **verbatim**: "Students haven't worked on this skill yet." / "Students got fewer than 70% of the questions correct on an exercise." / "Students completed an exercise with 70%-99% of the questions correct." / "Students completed an exercise with 100% of the questions correct." / "Students were already at the Proficient and correctly answered questions on this skill on a mixed-skill assessment." Page footer: "Updated August 21, 2023". | Q5 | Claim fully supported. Confirmed independently: no rating, confidence interval, item-difficulty parameter, or probability appears anywhere on the page. Page state recorded as of 2026-07-19. |
| F5 | Each skill carries 100 Mastery Points (50 Familiar / 80 Proficient / 100 Mastered), rolled up into Unit and Course Mastery | (a) Khan Academy Help, "What are Course and Unit Mastery?" https://support.khanacademy.org/hc/en-us/articles/115002552631-What-are-Course-and-Unit-Mastery ; (b) collector cites "same source as F4" | Yes — curl HTTP 200, extracted and read locally | ✓ | ✓ | ✓ | **VERIFIED** | Source (a), "Skill Levels in the new Mastery System" section: "Moving to Familiar will earn you 50 of the 100 points. Leveling up to Proficient will get you to 80 points. Become Mastered in a skill to collect the total 100 available Mastery Points." — verbatim. "Course Mastery" section: "The percentage of the course that you have mastered." / "The overall fraction of mastery points for that course that you have achieved." — verbatim. | Q5 | **Supporting-location correction.** The collector lists source (b) = the F4 mastery-levels page as co-supporting. It does not: that page contains **no mention of mastery points at all**. The entire points claim rests on source (a) alone. The claim still stands fully on (a). Collector's "linear ledger, not difficulty-weighted" caveat is *directly* confirmed by text the collector did not quote — the Unit Mastery section reads "for example, 1900 points on this unit— 100 for each skill in the unit", which is explicit uniform weighting rather than the absence-of-evidence inference the collector made. |
| F6 | Mastery Challenges are **the one** documented mechanism by which mastery can be lost | Khan Academy Help, "What are Mastery Challenges?" https://support.khanacademy.org/hc/en-us/articles/360037494231-What-are-Mastery-Challenges | Yes — curl HTTP 200, extracted and read locally | ✓ | **✗ → ✓ after downgrade** | **✗ → ✓ after downgrade** | **VERIFIED (downgraded)** | Body text, scoring rules: "Mastery Challenges always consist of 6 questions that review 3 skills" ... "devoting 2 questions to each skill" / "If you answer both questions correctly, you'll level up in that skill." / "If you answer both questions incorrectly, you'll level down in that skill." / "If you answer 1 question correctly and 1 question incorrectly, your level in that skill remains the same." — all **verbatim**. | Q5 | **STRENGTH DOWNGRADE — the uniqueness claim is contradicted by the collector's own sources.** The mechanism quotes are exact, but "**the one** documented mechanism by which mastery can be lost" is false against three pages read for this card: (i) the Mastery Challenges page itself says they are "another way for you to earn mastery levels, **in addition to taking Unit Tests and Course Challenges**"; (ii) the Course/Unit Mastery page says "As you practice skills and answer questions in **quizzes, unit tests, and course challenges**, your level for that skill will go up (**or down, if you miss any questions in the course**)"; (iii) the F4 mastery-levels page documents level-down generally — "Or students were at Proficient and missed questions on this skill" and "Or students were at Mastered and missed questions on this skill". Downgraded to: *Mastery Challenges are **one** documented mechanism by which mastery can be lost — a paired-question check that can move a skill up, down, or leave it unchanged; quizzes, unit tests and course challenges can also lower a level.* The re-verified weakened claim is fully supported. Collector's "no time-based decay" caveat is confirmed (the 12-hour rules govern availability, not decay). |
| F7 | RCT in partnership with Khan Academy (n=10,979 students, 224 teachers) found 0.12–0.22 SD gains **among elementary classrooms** at ~35 min/wk, no significant gain for middle school at ~10 min/wk | Oreopoulos, P., Gibbs, C., Jensen, M., & Price, J. (2024). **"Teaching Teachers To Use Computer Assisted Learning Effectively: Experimental and Quasi-Experimental Evidence."** NBER WP No. 32388, April 2024. https://www.nber.org/papers/w32388 | Yes — abstract read; full PDF downloaded and grepped locally | ✓ | **✗ → ✓ after downgrade** | **✗ → ✓ after downgrade** | **VERIFIED (downgraded)** | Abstract: "Results from two field experiments indicate significant Intent To Treat effects on math performance of 0.12 - 0.22 standard deviations. Further analysis indicates that these gains are from students in classrooms with at least an average of 35 minutes of practice per week." — verbatim. Sample, p.16/Table 4: "Our final sample included 224 teachers, 112 in the treatment group and 112 in the control group"; "This represents 10,979 students among 224 teachers." Grade split, **Table 5 and body text**: Grades 3-6 ITT 0.171** (n=7,234) and 0.122** with controls; Grades 7-8 −0.201 / −0.173 (n=3,745, n.s.); "State test scores were 0.12-0.17 standard deviations higher for students with treated teachers than control"; practice times "a mean of 34.7 minutes" (elementary) vs "a mean of 7.8 minutes" (grades 7-8). | Q2 for the randomized ITT; **Q3 for the 35-min/week dosage sub-claim** (explicitly "further analysis" / IV, not a randomized contrast) | **STRENGTH DOWNGRADE — effect range misattributed.** (1) The 0.12–0.22 SD range spans **two different experiments**; the 0.22 upper bound is a **middle-school** result from the Nashville weekly-review experiment ("For the full sample of middle school students, the estimated effect is 0.22 standard deviations"). Attributing 0.12–0.22 to *elementary* classrooms while reporting middle school as null conflates the two experiments. The elementary figure is **0.12–0.17**. (2) What was randomized is the **KWiK ("Khoaching with Khan Academy") teacher-coaching program**, not Khan Academy usage — the dossier's "classrooms using Khan Academy at high intensity" obscures that the treatment is weekly teacher coaching. (3) The dosage relationship is quasi-experimental, consistent with the paper's own subtitle. Downgraded claim: *a teacher-coaching intervention built on Khan Academy produced ITT gains of 0.12–0.22 SD across two field experiments; in the Arlington experiment elementary classrooms gained 0.12–0.17 SD at ~34.7 min/wk practice while grades 7–8 showed no significant effect at ~7.8 min/wk; the dosage threshold is a non-randomized further analysis.* Re-verified as stated. **Collector's title field was a placeholder** ("[Title on effects of Khan Academy usage on math performance]") — real title supplied above. **Collector's caveat was wrongly self-deprecating**, a correction in the dossier's favour: it states the elementary/middle split "is drawn from Khan Academy's own blog summary" and is "a first-party gloss." It is **not** — the split is in the peer working paper itself (Table 5 and body text). Khan Academy is named 59 times in the paper, so the KA attribution does not depend on the blog either. Partnership caveat confirmed independently via KA's blog ("run by University of Toronto researcher Dr. Phil Oreopolous in partnership with Khan Academy") — note KA's blog states elementary gains as "0.12 to 0.17", agreeing with the paper and not with the dossier's headline. |
| F8 | 2026 PNAS observational panel (200,000+ students) found 0.031 SD at ~6.6 h/yr rising to ~0.085 SD at ~30 min/wk; 2 of 5 authors are KA staff, 2 more served on KA's unpaid advisory committee | Eames, T., Brunskill, E., Yamkovenko, B., Weatherholtz, K., & Oreopoulos, P. (2026). "Computer-assisted learning in the real world: How Khan Academy influences student math learning." *PNAS* 123. DOI 10.1073/pnas.2507708123; correction DOI 10.1073/pnas.2604984123. https://pubmed.ncbi.nlm.nih.gov/41481459/ ; https://pmc.ncbi.nlm.nih.gov/articles/PMC12974481/ | Yes — PubMed abstract and PMC correction both fetched and read | ✓ | ✓ | ✓ | **VERIFIED** | Abstract: "a classroom with 6.6 h of annual Khan Academy practice (about 11 min per week) experiences a [Formula] 0.031 SD gain in math test score performance compared to no practice. For classrooms with higher usage levels, we find approximately linear gains, with projected effects rising to [Formula] 0.085 SD at the recommended 30 min per week." Design confirmed observational: "we exploit within-teacher and within-school changes in average classroom CAL practice time." Affiliations confirmed per byline: Eames & Oreopoulos (Economics, Toronto), Brunskill (CS, Stanford), Yamkovenko & Weatherholtz ("Efficacy Research, Khan Academy"). Correction notice: "E.B. and P.O. served on the informal Khan Academy research advisory committee from 2021 to 2024 and received no financial compensation for their participation." — verbatim. | Q3 — **confirmed correct** | The strongest-handled finding on the card. Every quote, affiliation, design descriptor and the COI disclosure verified exactly as recorded. Q3 tier and the explicit non-independence caveat are appropriate and adequate; no downgrade needed. One relationship the dossier does not surface: **Oreopoulos is an author on both F7 and F8**, so the card's two efficacy findings are not author-independent of each other. |
| F9 | Independent RCT of general chess instruction found no significant transfer to mathematical problem-solving across two experiments (n=233, n=52) | Dossier cites "Sala, G., **Foley, J.P.**, & Gobet, F. (2017)" — **actual authorship: Sala, G. & Gobet, F. (2017).** "Does chess instruction improve mathematical problem-solving ability? Two experimental studies with an active control group." *Learning & Behavior*. https://pmc.ncbi.nlm.nih.gov/articles/PMC5709436/ | Yes — PMC full text downloaded and grepped locally | **✗ → ✓ after re-check** | ✓ | ✓ | **VERIFIED (citation corrected)** | Abstract: "The three groups showed no statistically significant difference in mathematical problem-solving or metacognitive abilities in the posttest" (Exp. 1, N = 233). **Discussion section** (Exp. 2, N = 52): "The effects of chess instruction on mathematical problem-solving ability were minimal." **General discussion**: "The results of the two studies do not support the hypothesis according to which chess instruction benefits pupils' mathematical ability. The effects of chess, if any, appear to be minimal..." | Q2 — confirmed correct | **AUTHORSHIP ERROR, corrected by one re-check pass.** The paper has **two** authors, Giovanni Sala and Fernand Gobet (both Dept. of Psychological Sciences, University of Liverpool). "Sala, Foley, & Gobet (2017)" is a **different paper** — "The effect of chess instruction on pupils' cognitive and academic skills: State of the art and theoretical challenges," *Frontiers in Psychology* 8(238) — which appears in this paper's own reference list and was evidently conflated with it. All three quotes are genuine and verbatim in the correct paper, so the claim survives intact with corrected attribution. **Supporting-location correction:** the collector proposed "Abstract and Results sections"; in fact only the first quote is in the abstract — the other two are in the **Discussion** and **General discussion** sections respectively. Neither is in Results. Collector's out-of-scope flagging is honest and appropriate. |

## Resolution log (every citation that was UNVERIFIED at any point)

UNVERIFIED is transient. Every row here MUST end terminal — VERIFIED or UNVERIFIABLE or dropped.

| # | Which point failed (exists / supports / strength) | Move taken (re-check · downgrade · drop) | Terminal state | Note |
|---|---|---|---|---|
| F6 | **supports + strength** — quotes exact, but the claim's "the one documented mechanism" uniqueness assertion is contradicted by the same page and two sibling pages | **(b) downgrade** — narrowed to "one documented mechanism", removing the uniqueness assertion; re-verified the weakened claim | **VERIFIED (downgraded)** | Uniqueness was the only defective element; the paired-question 3-outcome rule is exactly as quoted. Downstream effect: Khan Academy's mastery loss is broader than the dossier implies — quizzes, unit tests and course challenges also demote. |
| F7 | **supports + strength** — 0.12–0.22 SD attributed to elementary classrooms when 0.22 is a middle-school result from the other experiment; treatment mischaracterised as "using Khan Academy" rather than a teacher-coaching program | **(b) downgrade** — split the range by experiment and grade band, named the actual randomized treatment, tiered the dosage sub-claim Q3; re-verified | **VERIFIED (downgraded)** | Resolved by reading the full PDF locally, which also *strengthened* two things the collector had discounted (the grade split and the KA attribution are both in the paper, not only in KA's blog). |
| F9 | **exists** — wrong author list; "Sala, Foley, & Gobet" is a different paper by overlapping authors | **(a) one re-check pass** — located the correct record; authorship corrected to Sala & Gobet (2017), same title/venue/URL | **VERIFIED (corrected)** | Mechanical citation error, not a fabrication: the URL, title, venue, year, sample sizes and all three quotes are correct. Only the author list was wrong. |

## Kills (citations dropped — the claim lost this support)
- **None.** No citation failed terminally; two were resolved by downgrade and one by a mechanical
  re-check. Recorded plainly rather than presented as a clean sweep: this card's citations were, on
  the whole, unusually well handled — every URL resolved, every quote traced to real text, and the
  two Q5-vs-Q3 tier judgements (F8 especially) were made correctly and conservatively by the
  collector. The defects found are misattribution and overstatement, not invention.

## Quarantine (UNVERIFIABLE — could not be reached at all)
- **None.** All nine sources were reached and read independently. Note that the three Khan Academy
  help pages, which 403 to ordinary fetching, are reachable with a browser user-agent via `curl` —
  recorded here so a future pass does not repeat the collector's proxy workaround.

## Conflicts surfaced during verification
- **None rising to the conflict register.** The defects found in F6 and F7 are dossier-internal
  misreadings of their own sources, not genuine evidence conflicts between sources, and belong in
  this record rather than the register. I concur with the collector that F7 and F8 are not in
  tension — they measure different designs and usage regimes. No row appended to
  `registers/conflict-register.md`.
- Appended three rows to `registers/source-lead-register.md` (#3–#5) carrying the independent Khan
  Academy efficacy studies identified in Part 2, as leads for the focused pass.

## Dossier sufficiency (SECOND AXIS — judged independently of citation states)

> A dossier is sufficiently researched only when additional searching is unlikely to materially
> change its conclusions. An all-VERIFIED dossier can still be INSUFFICIENT. A COVERAGE GAP the
> collector found and named is thoroughness, not insufficiency.

**Verdict: INSUFFICIENT**

Coverage assessed against: major evidence traditions · landmark sources · opposing positions ·
every required sub-question in the card's scope.

- **Traditions/landmarks/positions present:** Chess.com's live rating documentation for both the
  peer-vs-peer and item-vs-player pathways (F1–F3, and the puzzle/game distinction is drawn cleanly
  and correctly — this is the card's strongest work); Khan Academy's full public mastery-mechanics
  documentation (F4–F6); the KA-affiliated efficacy literature (F7 NBER RCT, F8 PNAS panel), with
  first-party relationships disclosed rather than smoothed; the chess-transfer null literature (F9),
  honestly flagged as out of product scope.
- **Required sub-questions answered:** 3.5 of 4. Q1 (rating vs puzzle rating) — answered well.
  Q2 (mastery mechanics) — answered well, subject to the F6 correction. Q4 (OBSERVED vs PUBLISHED) —
  used correctly throughout; OBSERVED is the right provenance for the six product-documentation
  findings and the collector did not inflate any of them. **Q3 (efficacy, first-party vs
  independent) — answered only half.** The first-party side is thorough; the independent side is
  asserted to be empty, and it is not.
- **Searches run to test for what is NOT there:** (1) "SRI International Research on the Use of Khan
  Academy in Schools 2014 independent evaluation"; (2) "independent evaluation Khan Academy efficacy
  randomized study not affiliated What Works Clearinghouse"; (3) "chess puzzle rating Glicko item
  difficulty calibration research lichess tactics trainer rating validity study"; (4) "Khan Academy
  proficiency model engineering blog prediction model Elo"; (5) targeted follow-up fetches of the
  IES award record and the PubMed record for the two strongest independent candidates, to confirm
  they are real and genuinely non-affiliated before asserting the omission.

**What survives scrutiny.** Three of the dossier's four named coverage gaps are honest and
well-earned, and I do not penalise them: the absent Khan Academy difficulty-seeding documentation,
the absent study of Chess.com's own puzzle-training efficacy, and the unconfirmed puzzle-side RD
behaviour are all real absences the collector searched for and reported. The 2011 David Hu
proficiency-model post the collector could not open is likewise correctly excluded rather than
cited unread — that is exactly the discipline the brief asks for. (For a future pass: it is
reachable at `http://david-hu.com/2011/11/02/how-khan-academy-is-using-machine-learning-to-assess-student-mastery.html`,
and describes a **logistic-regression** predecessor model — historical, superseded by the current
deterministic ladder, and low-weight.)

### If INSUFFICIENT (all three required)

1. **What important evidence appears missing.** The dossier states as a coverage gap: "No
   independent (non-Khan-Academy-affiliated) efficacy study was located for Khan Academy." This is
   not an honest absence — it is a **false negative**, and the first obvious search disproves it.
   At least three genuinely independent evaluations exist and were readily locatable:
   - **WestEd / IES, "Khan Academy Resources for Maximizing Mathematics Achievement: A Postsecondary
     Mathematics Efficacy Study"** (PI Steve Schneider, co-I Shandy Hauk; IES award 2014–2017) — a
     **multi-site cluster-randomized controlled trial** in California community college algebra,
     analytic sample 588 students / 34 instructors / 20 colleges. An independent research
     organisation, federally funded, no Khan Academy authorship. This is the single most important
     omission: it is a genuine independent RCT, the exact evidence class the dossier declares absent.
   - **Murphy, R., Gallagher, L., Krumm, A., Mislevy, J., & Hafter, A. (2014), "Research on the Use
     of Khan Academy in Schools," SRI Education / SRI International**, Gates-funded, 20 schools,
     ~70 teachers, ~2,000 students per year across 2011–13. The most-cited independent Khan Academy
     evaluation in existence and the landmark a domain reviewer would expect any competent review of
     Khan Academy efficacy to cite.
   - **Patil, P.A. & Juanico, J.F. (2024), "The Effectiveness of Khan Academy in Teaching Elementary
     Math," *Behavior Analysis in Practice*,** DOI 10.1007/s40617-024-00982-6 (University of Kansas;
     single-subject multiple-baseline design, n=3) — small and low-powered, but independent, and
     methodologically a different tradition (single-subject behaviour analysis) that the dossier
     does not touch at all.
2. **Why the omission could materially affect the findings.** It directly falsifies a stated
   conclusion the dossier instructs downstream synthesis to carry. The dossier's coverage-gap
   section says: "Every efficacy finding on this card therefore carries at least a partial
   first-party relationship; this should not be described as 'independently replicated' in any
   downstream synthesis without this caveat attached." That instruction is wrong as written, and it
   is wrong in the direction of **understating** the evidence for Khan Academy's efficacy — a
   downstream reader would conclude the entire Khan Academy evidence base is first-party-tainted
   when an independent federally-funded cluster-RCT and a landmark independent SRI evaluation both
   exist. The conclusion that would move is the confidence attached to mastery-ladder-style
   deterministic progression as a shipped, *externally validated* design, which is precisely the
   design analogue this program is mining Khan Academy for. Secondarily, the WestEd RCT is a
   **postsecondary, self-directed-adult** population — much closer to this product's solo-adult
   trainee than the grades 3–8 classroom populations of F7 and F8 — so it bears on transfer to this
   product's actual user more directly than either finding currently in the dossier.
3. **Exact scope of the one focused collection pass.** Bounded, roughly 3–4 citations, Q3 sub-question
   only — **do not re-run the card, and do not re-touch F1–F6**, which are verified and sound.
   Collect: (a) the WestEd/IES postsecondary cluster-RCT — locate the final report or resulting
   peer-reviewed publication, and record its actual effect sizes and significance, not the award
   abstract's summary language; (b) the SRI 2014 implementation report and research brief
   (`https://s3.amazonaws.com/KA-share/impact/khan-academy-implementation-report-2014-04-15.pdf`),
   recording that it is an **association/implementation** study, not an RCT, and tiering it Q3
   accordingly; (c) Patil & Juanico (2024) as a small independent single-subject data point.
   Then **correct the dossier's coverage-gap statement** to reflect that independent Khan Academy
   efficacy evidence exists, and re-state what it does and does not show. No Chess.com re-collection
   is warranted — that side's gaps are genuine.

## Verifier summary
- VERIFIED: **9**  |  UNVERIFIABLE: **0**  |  DROPPED: **0**
- **UNVERIFIED remaining: 0** (required — a record with any citation left UNVERIFIED is incomplete)
- **Dossier sufficiency: INSUFFICIENT**
- **Claims the collector overstated (strength downgraded):**
  - **F6** — "the one documented mechanism by which mastery can be lost" → "one documented
    mechanism"; quizzes, unit tests and course challenges also demote, per the collector's own
    sources.
  - **F7** — 0.12–0.22 SD attributed to elementary classrooms; the 0.22 upper bound is a
    middle-school result from a different experiment (elementary is 0.12–0.17), and the randomized
    treatment is a teacher-coaching program (KWiK), not Khan Academy usage. Dosage sub-claim
    re-tiered Q3.
- **Claims the collector *under*-stated (corrections in the dossier's favour):**
  - **F7** — the elementary/middle-school split is in the NBER paper itself (Table 5), not merely a
    "first-party gloss" from KA's blog as the caveat concedes.
  - **F3, F5** — both claims are supported by more explicit source text than the collector quoted.
- **Citation errors corrected:** F9 authorship (Sala, Foley & Gobet → **Sala & Gobet**); F7 title
  placeholder filled with the real title.
- **Supporting locations differing from the collector's proposal:** **F5** (points claim rests on the
  Course/Unit Mastery page alone — the mastery-levels page contains no points text); **F9** (two of
  three quotes are in Discussion / General discussion, not "Abstract and Results"); **F7** (sample
  figures and grade split are in the paper body and Table 5, not the abstract); **F1** (quote (b) is
  a paraphrase of the page's actual sentence, not verbatim).
