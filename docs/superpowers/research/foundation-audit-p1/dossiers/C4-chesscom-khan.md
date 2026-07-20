# Dossier: Chess.com and Khan Academy learning models (C4)

> Status: RAW COLLECTION — DATA ONLY, not authority (Inbox Rule 0). UNTRUSTED until verified.
> Collector: Claude (Sonnet 5)  |  Date: 2026-07-19
> Leads consumed (untrusted): none — collected fresh
> Citations collected: **13 findings / 15 distinct sources** — original pass 9 findings / 9 sources,
> **+3 findings / 5 sources via focused pass C4-FP (2026-07-19)**, **+1 finding / 1 source via
> remediation top-up C4-RT (2026-07-20)**. Budget 6–12, **hard cap 15**. Under the header's own
> findings-based convention this reads **13/15**.
> ~~"Citations collected: 9 … total 12/15."~~ — superseded 2026-07-20 by editorial pass C4-ED per
> V4c divergence-2 ruling; the prior figure was stale and the two in-body replacements (l.233 "5
> distinct sources added since the original 9", implying 14; l.370 "9 distinct sources") contradicted
> each other and were both wrong.
> **⚠ AT THE HARD CAP.** On a distinct-source count the dossier now sits at **exactly 15 of 15**.
> No further collection is available on C4 without raising the cap. V4c: *"No new collection is
> warranted on C4."* Dossier sufficiency: **SUFFICIENT** (V4c).
>
> **Editorial status.** Two earlier passes ran append-only, which left corrections recorded but not
> applied. Editorial pass **C4-ED (2026-07-20)** ran with append-only lifted and discharged that debt
> in place. Superseded text is struck through and dated rather than deleted. Findings carrying
> in-place corrections: F10 (supporting location), F11, F12, F13. No source was added.

## Scope & questions this card must answer
- Q1. Chess.com's rating and progress systems — how the *regular game* rating works vs the *puzzle*
  rating, what each estimates, and what each requires to function (opponent pool vs item bank vs
  both).
- Q2. Khan Academy's mastery mechanics — the mastery-level ladder, how mastery is earned and lost.
- Q3. Published efficacy for either product — independent study vs first-party self-report, labelled
  explicitly on every finding.
- Q4. What is OBSERVED (live product/help-page evidence) vs PUBLISHED (papers) on this card.
- Q5 (load-bearing, shared with C1). Does either product's evidence settle the Elo vs IRT / knowledge-
  tracing mastery-model choice for a solo trainer against a fixed item bank — see Sufficiency
  statement below.

## Sufficiency statement (C1 and C4 only)

> **[Scope note added by C4-ED, 2026-07-20 — verdict unchanged.]** This statement was written by the
> original pass and refers to F1–F9 only; its references to "the two efficacy studies found for Khan
> Academy (F7, F8)" predate F10–F13. **Its verdict is unaffected and still holds** (confirmed by V4b and
> V4c): F10–F13 are all *outcome* studies, none evaluates the mastery ladder as a *measurement*
> instrument, and none bears on seeding ability for a solo learner against a fixed item bank. See the
> "Standing obligation (C4 only)" section at the end of this document for the post-F13 re-statement,
> including the one genuinely new signal F13 adds (a caution, not a resolution).

**PARTIAL, and it does not move the needle toward YES.** This card adds two concrete data points to
C1's finding that every model examined calibrates from a population, and it does not overturn that
finding — if anything it reinforces it from a different angle while also surfacing a third option C1
did not consider. (1) Chess.com's puzzle rating is a real, working Elo/Glicko-family instantiation of
"item as opponent" — confirming C1's point that education-Elo need not mean peer-vs-peer — but its own
help documentation states a new puzzle's difficulty rating is set by observing **who is able to solve
it** before being locked (F2 below): that is crowd/population calibration of item difficulty, not a
population-free method. It requires the same kind of population Pelánek's Elo simulation required
(C1 F8), just supplied by a different pool (chess.com's whole solver base rather than a classroom).
(2) Khan Academy's mastery system — the closest published "solo learner, fixed item/skill bank, no
opponent pool" analogue named in this program — turns out **not to be an Elo/IRT/BKT/PFA/DKT model at
all**: it is a deterministic percentage-threshold and paired-question ladder (F4–F6) with no item-
difficulty parameter, no ability estimate, and no probabilistic mastery score anywhere in its public
documentation. That is a genuinely new, useful fact: it demonstrates a real, shipped, at-scale
alternative to probabilistic mastery-estimation entirely — simple deterministic rules — which is
exactly the kind of "product reasoning" escape route C1's sufficiency statement said the decision
could fall back to. But it is evidence *for the existence of a non-probabilistic alternative*, not
evidence that resolves whether Elo/IRT/knowledge-tracing specifically can be initialized without a
learner population. Neither of the two efficacy studies found for Khan Academy (F7, F8) evaluates the
mastery-ladder's measurement validity at all — both study platform usage and learning outcomes, not
model choice. **What this card settles:** that "item as opponent" Elo is a real, shipped mechanism
(Chess.com), and that abandoning probabilistic mastery estimation for deterministic rules is a real,
shipped, at-scale alternative (Khan Academy). **What it does not settle:** whether any of Elo, IRT, or
knowledge-tracing can be seeded/initialized for a single learner against a fixed item bank without a
population of prior solvers — both products' documented practices still route through population data
or avoid the question by not modeling ability at all. The Elo-vs-IRT/KT choice remains a Product
judgement / Assumption call, not an Evidence-backed one, on the combined C1+C4 evidence.

## Overflow leads
~~None — 9 citations collected against a 6–12 budget; nothing was dropped for being over-budget.~~
**[Updated by C4-ED, 2026-07-20 — this line describes the original pass only.]** Nothing was ever dropped
for being over-budget. As of the C4-RT pass the dossier stands at 13 findings / 15 distinct sources, i.e.
**at the hard cap of 15**. Unretrieved leads deliberately not chased are recorded under "Leads noticed
but NOT chased" near the end of this document (Böhmer et al. 2014; Weeraratne & Chin 2018;
Vidergor & Ben-Amram 2020).

## Findings

### F1: Chess.com's Puzzles feature uses the same Glicko-style rating algorithm as its regular (player-vs-player) chess ratings, applied instead to a player-vs-item pairing
- Provenance: OBSERVED
- Access: Two Chess.com official pages fetched and read directly (live help-center/news pages, not papers).
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q5 (official product documentation)
- Source(s): (a) Chess.com Help Center, "How do Puzzle ratings work?" — https://support.chess.com/en/articles/8602396-how-do-puzzle-ratings-work ; (b) Chess.com News, "New Puzzles Ratings, Difficulty Settings, And More Consistent Experience" — https://www.chess.com/news/view/announcing-new-puzzles-rating-system
- Proposed supporting location: (a) body text on rating-change mechanics; (b) body text on algorithm description
- Claimed strength (exact quotes): "Just like in chess, your Puzzle rating adjusts based on the difficulty of each puzzle compared to your current Puzzle rating." / "The new Puzzle ratings use the same Glicko-style rating logic as your chess games (blitz, rapid, etc.)."
- Caveats: Neither page names Glicko-2 specifically for puzzles (the regular-game rating page, F3, does reference Glicko/rating-deviation concepts more explicitly); "Glicko-style" is the exact phrase used, not a precise algorithm spec.

### F2: A new Chess.com puzzle's initial difficulty rating is set by observing which of its early solvers can solve it, then the rating is locked after a set period
- Provenance: OBSERVED
- Access: Chess.com Help Center page fetched and read directly.
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q5 (official product documentation)
- Source(s): Chess.com Help Center, "How do Puzzle ratings work?" — https://support.chess.com/en/articles/8602396-how-do-puzzle-ratings-work
- Proposed supporting location: Body text, section describing puzzle-side (not player-side) rating establishment
- Claimed strength (exact quote): "When a puzzle is first added, its rating is determined by who is able to solve it. After a set period, the puzzle's rating becomes locked and does not change further. In some cases, if a puzzle's rating is found to be inaccurate, Chess.com may adjust it to better reflect its difficulty."
- Caveats: This is the single most sufficiency-relevant fact this card found (see Sufficiency statement): it is population/crowd calibration of item difficulty, not a population-free seeding method. No exact solver count, no exact "set period" duration, and no formula are disclosed — this is a plain-language help page, not a technical spec. Chess.com separately states it replayed "about 17 billion" historical puzzle attempts to re-rate both members and puzzles when it relaunched this system (same source (b) as F1), which is a further indicator of the population scale actually used, though that figure describes a one-time re-rating event, not routine new-puzzle seeding.

### F3: Chess.com's regular (non-puzzle) game rating is an explicitly player-vs-player Glicko rating with a stated Rating Deviation (RD) confidence measure, structurally distinct from the player-vs-item puzzle rating
- Provenance: OBSERVED
- Access: Chess.com Help Center page fetched and read directly.
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q5 (official product documentation)
- Source(s): Chess.com Help Center, "How do ratings work on Chess.com?" — https://support.chess.com/en/articles/8566476-how-do-ratings-work-on-chess-com
- Proposed supporting location: Body text listing the three factors that change a rating after a game
- Claimed strength (exact quote): "Chess.com uses the Glicko rating system" with rating changes depending on "The difference in rating between you and your opponent," "Our confidence in your rating," and "Our confidence in your opponent's rating."
- Caveats: The page frames ratings as designed to "measure their skill level and match them against opponents of similar ability" — i.e., matchmaking against a peer pool is the explicit purpose here, unlike the puzzle rating (F1/F2), which pairs a player against a fixed, already-existing item. This is the direct product evidence the scope file asked this card to locate and keep distinct from puzzle rating.

### F4: Khan Academy uses a five-level deterministic mastery ladder (Not Started, Attempted, Familiar, Proficient, Mastered) defined by fixed accuracy thresholds and mixed-skill-assessment checks, not a probabilistic ability estimate
- Provenance: OBSERVED
- Access: Khan Academy Help Center page, fetched via a text-extraction proxy after direct fetch returned HTTP 403; content cross-checked against convergent WebSearch snippets of the same page before being treated as reliable (see the "known hazard" note in the shared brief — this collector treated the proxied fetch as the actual read, not the search snippets alone).
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q5 (official product documentation)
- Source(s): Khan Academy Help Center, "How do Khan Academy's Mastery levels work?" — https://support.khanacademy.org/hc/en-us/articles/5548760867853--How-do-Khan-Academy-s-Mastery-levels-work
- Proposed supporting location: Body text defining each of the five levels
- Claimed strength (exact quotes): "Not Started: Students haven't worked on this skill yet." / "Attempted: Students got fewer than 70% of the questions correct on an exercise." / "Familiar: Students completed an exercise with 70%-99% of the questions correct." / "Proficient: Students completed an exercise with 100% of the questions correct." / "Mastered: Students were already at the Proficient and correctly answered questions on this skill on a mixed-skill assessment."
- Caveats: These are fixed accuracy-percentage thresholds and pass/fail checks on mixed-skill assessments — no rating, no confidence interval, no item-difficulty parameter, and no probability estimate appears anywhere in this definition. This is a structurally different mechanism from every model C1 examined (BKT, PFA, DKT, IRT, education-Elo).

### F5: Each Khan Academy skill carries 100 Mastery Points, awarded in fixed increments per level reached (50 at Familiar, 80 at Proficient, 100 at Mastered), aggregated into Unit and Course Mastery percentages
- Provenance: OBSERVED
- Access: Two Khan Academy Help Center pages, fetched via text-extraction proxy after direct 403s.
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q5 (official product documentation)
- Source(s): (a) Khan Academy Help Center, "What are Course and Unit Mastery?" — https://support.khanacademy.org/hc/en-us/articles/115002552631-What-are-Course-and-Unit-Mastery ; (b) same source as F4
- Proposed supporting location: Body text on point allocation and on Course/Unit percentage rollups
- Claimed strength (exact quote): "Moving to Familiar will earn you 50 of the 100 points. Leveling up to Proficient will get you to 80 points. Become Mastered in a skill to collect the total 100 available Mastery Points." Course Mastery is described as "The percentage of the course that you have mastered" / "The overall fraction of mastery points for that course that you have achieved."
- Caveats: This is a linear points ledger, not a weighted or difficulty-adjusted score — the documentation gives no indication that harder skills carry more points than easier ones.

### F6: Khan Academy's Mastery Challenges are the one documented mechanism by which mastery can be lost, not just gained — a paired-question check that can move a skill's level up, down, or leave it unchanged
- Provenance: OBSERVED
- Access: Khan Academy Help Center page, fetched via text-extraction proxy after direct 403.
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q5 (official product documentation)
- Source(s): Khan Academy Help Center, "What are Mastery Challenges?" — https://support.khanacademy.org/hc/en-us/articles/360037494231-What-are-Mastery-Challenges
- Proposed supporting location: Body text on scoring rules
- Claimed strength (exact quote): "Mastery Challenges always consist of 6 questions that review 3 skills" with "2 questions to each skill." "If you answer both questions correctly, you'll level up in that skill." / "If you answer both questions incorrectly, you'll level down in that skill." / "If you answer 1 question correctly and 1 question incorrectly, your level in that skill remains the same."
- Caveats: This is a bidirectional but coarse (3-outcome) update rule keyed on exactly 2 questions per skill per challenge — nothing resembling a continuous rating update or a per-item information weighting (as Elo/IRT would apply) is described. No time-based decay (mastery does not passively fade merely by the passage of time in this documentation) — loss is tied only to answering challenge questions incorrectly.

### F7: An RCT run by a University of Toronto economist in partnership with Khan Academy (n=10,979 students, 224 teachers) found math-score gains of 0.12–0.22 SD among elementary classrooms using Khan Academy at high intensity (~35 min/week), but no significant gain for middle-school classrooms at low intensity (~10 min/week)
- Provenance: PUBLISHED
- Access: NBER working-paper landing page (abstract) fetched and read directly; Khan Academy's own blog post about the same study also read (not treated as the primary source — recorded as first-party framing, distinct from the NBER abstract).
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q2 (genuine field RCT with randomized treatment/control teacher assignment), with an explicit non-independence caveat below
- Source(s): Oreopoulos, P., Gibbs, C., Jensen, M., & Price, J. (2024/2025). "[Title on effects of Khan Academy usage on math performance]." NBER Working Paper No. 32388. https://www.nber.org/papers/w32388
- Proposed supporting location: Abstract
- Claimed strength (exact quote): "Results from two field experiments indicate significant Intent To Treat effects on math performance of 0.12 - 0.22 standard deviations," with the abstract further noting substantial gains occurred "from students in classrooms with at least an average of 35 minutes of practice per week."
- Caveats: **Not fully independent** — this RCT was run "in partnership with" Khan Academy (per Khan Academy's own announcement of the same study), not by outside researchers with no platform relationship. The abstract itself does not break out the elementary-vs-middle-school split or state the null middle-school result in those words; that split is drawn from Khan Academy's own blog summary of the same paper and is recorded here as a first-party gloss on a partly-independent study, not as an independently verified sub-finding. Effect size is Intent-to-Treat (average across compliers and non-compliers), not the effect of actual full-dose usage alone.

### F8: A 2026 PNAS observational panel study of 200,000+ students found math-score gains scaling from about 0.031 SD (at ~6.6 hours/year of Khan Academy use) to a projected ~0.085 SD at recommended usage levels (~30 min/week), but two of five co-authors are Khan Academy staff and two more served on Khan Academy's own (unpaid) research advisory committee
- Provenance: PUBLISHED
- Access: PubMed abstract page fetched and read directly (full PNAS article itself returned HTTP 403 to direct fetch); the PNAS-issued correction notice for this same article was separately fetched and read in full for the conflict-of-interest disclosure.
- Proposed status bucket: Evidence-backed, with an explicit conflict-of-interest caveat that downgrades how independently this should be weighted
- Proposed evidence-quality tier: Q3 (large-scale observational/correlational study exploiting within-teacher variation, not a randomized experiment), downgraded from what a naive read of "published in PNAS" might imply, precisely because of the disclosed COI
- Source(s): Eames, T., Brunskill, E., Yamkovenko, B., Weatherholtz, K., & Oreopoulos, P. (2026). "Computer-assisted learning in the real world: How Khan Academy influences student math learning." *Proceedings of the National Academy of Sciences*, 123. DOI: 10.1073/pnas.2507708123 (original), correction DOI: 10.1073/pnas.2604984123. https://pubmed.ncbi.nlm.nih.gov/41481459/ ; correction: https://pmc.ncbi.nlm.nih.gov/articles/PMC12974481/
- Proposed supporting location: Abstract (effect sizes and methodology); correction notice (competing-interest statement)
- Claimed strength (exact quotes): Effect at 6.6 hours/year: "0.031 SD gain"; effect "rising to 0.085 SD" at ~30 minutes/week. Author affiliations per the abstract/correction: Eames and Oreopoulos — Dept. of Economics, University of Toronto; Brunskill — Dept. of Computer Science, Stanford; Yamkovenko and Weatherholtz — "Efficacy Research, Khan Academy." Correction text: "E.B. and P.O. served on the informal Khan Academy research advisory committee from 2021 to 2024 and received no financial compensation for their participation."
- Caveats: This is exactly the Q3/first-party-adjacent distinction the scope file requires flagging explicitly — two of five authors are Khan Academy employees, and it is peer-reviewed and published in a selective independent journal (PNAS), so it sits between a fully independent study and a company blog self-report, not cleanly at either pole. It should not be cited at the strength of "independent replication" without this caveat attached.

### F9: An independent RCT of general chess instruction (not Chess.com specifically, and not any puzzle-rating mechanism) found no significant transfer to mathematical problem-solving ability across two experiments (n=233 and n=52 primary-school pupils)
- Provenance: PUBLISHED
- Access: PMC full-text page fetched and read directly.
- Proposed status bucket: Evidence-backed, but explicitly out of this card's product scope — included only to document the coverage gap (see below)
- Proposed evidence-quality tier: Q2 (randomized controlled experiments with active and passive control groups)
- Source(s): Sala, G., Foley, J.P., & Gobet, F. (2017). "Does chess instruction improve mathematical problem-solving ability? Two experimental studies with an active control group." *Learning & Behavior*. https://pmc.ncbi.nlm.nih.gov/articles/PMC5709436/
- Proposed supporting location: Abstract and Results sections for both experiments
- Claimed strength (exact quotes): "The three groups showed no statistically significant difference in mathematical problem-solving or metacognitive abilities in the posttest" (Experiment 1, n=233); "The effects of chess instruction on mathematical problem-solving ability were minimal" (Experiment 2, n=52); overall, "The results...do not support the hypothesis according to which chess instruction benefits pupils' mathematical ability."
- Caveats: **Out of strict scope** — this study evaluates chess instruction generally (lessons, not an online platform), not Chess.com's rating/puzzle system, and measures transfer to math ability, not tactical-skill improvement itself. Included because no study evaluating Chess.com's own puzzle-training mechanism was located (see Coverage gaps) — this is the closest controlled-experiment analogue found, and it is a null result for the *transfer* question, which is a different question from "does the rating/puzzle system itself track tactical skill."

## Candidate conflicts noticed
- None rising to the level of a genuine evidence conflict on this card's own findings. (F7 and F8 both report positive Khan Academy effects at different magnitudes under different designs and usage-intensity assumptions — 0.12–0.22 SD RCT vs 0.031–0.085 SD observational — but these are not in tension: they measure different usage regimes and different designs, not the same claim measured two contradictory ways. Not logged to the conflict register for that reason.)

## Coverage gaps
- **No source found describes how Khan Academy's exercise/skill difficulty is initially set or seeded** for a new exercise — unlike Chess.com's puzzle rating (F2), no Khan Academy help page, and no accessible technical source, states whether skill difficulty is human-authored, back-calculated from population data, or something else. A 2011 Khan Academy engineering blog post on an early "proficiency model" (predecessor to the current mastery ladder) was located via search but could not be opened (repeated HTTP 403/400 on every fetch route attempted) — per the shared brief's rule, it is not cited here because it was not actually read, and is not carried forward even as a lead since its content could not be confirmed at all, not even partially.
- **[corrected by C4-FP, 2026-07-19; RE-STATED IN PLACE by editorial pass C4-ED, 2026-07-20 — read the
  re-statement immediately below this paragraph before relying on any part of it]** This bullet originally asserted that no independent (non-Khan-Academy-affiliated) efficacy study existed for Khan Academy. That was a false negative — independent evidence exists and was readily locatable; see F10–F12 below.** F7 (an RCT run in partnership with Khan Academy) and F8 (two of five co-authors are Khan Academy staff, two more sat on its advisory committee) remain the two first-party-adjacent findings this original collection pass found, and the caveat on those two stands. But it is no longer accurate to say every efficacy finding on this card carries a first-party relationship, or that independent evidence is absent: F10 is a federally funded, independently authored multi-site cluster-RCT in community college algebra (Hedges g = 0.32 for its first-cohort sample — postsecondary/adult, closer to this product's likely users than any other efficacy finding on this card); F11 is a landmark independent implementation study (SRI International, Gates-funded, but explicitly correlational and non-causal by its own authors' statement, grades 5–8); F12 is a small independent single-subject study (University of Kansas, n=3). None of the three is free of limitation — see their caveats below — but all three are ~~genuinely independent of Khan Academy by authorship and (where checked) by disclosed conflict of interest~~ **[struck by C4-ED, 2026-07-20, per V4b]** **independent of Khan Academy by *authorship*; independence beyond authorship differs by source — F10 federally funded and independent, F12 independent on authorship, COI *and* funding, but F11 is *author-independent only* (commissioned by the Gates Foundation, Khan Academy's own major funder, with Khan Academy co-selecting sites)** — contrary to what this bullet originally claimed.

  **RE-STATEMENT IN PLACE (C4-ED, 2026-07-20 — discharges V4b item 3 and V4c divergence-1 editorial debt).**
  The correction above — that independent Khan Academy efficacy evidence **exists** — stands and must not
  be reversed. It is, however, **incomplete as written**: it reports the independent evidence as merely
  *existent*. The accurate summary is that the independent evidence is ***mixed*, not uniformly positive**:
  - **positive** in a semester-long community-college cluster-RCT (F10, Hedges g = 0.32) — with 68%
    instructor attrition and baseline non-equivalence flagged by its own authors;
  - **positive but correlational** in a two-year implementation study that is **author-independent only**
    (F11) — commissioned by the Bill & Melinda Gates Foundation, Khan Academy's own major funder, with
    Khan Academy co-selecting sites;
  - **positive** in an n = 3 single-case experiment whose own authors state its **nonconcurrent** design
    "is limited in functional control due to its inability to identify history and maturation effects" (F12);
  - **null** in the only independent controlled comparison against **active, equal-time** controls (F13).

  **Direction of movement.** Confidence in Khan-Academy-style mastery progression as an *externally
  validated* design moves **down** from where this bullet's original correction leaves it — not to zero
  and not to "refuted" (F13 is one underpowered short study and cannot carry that weight). The design
  question closest to what this product must answer — *does mastery-ladder practice beat equal time spent
  on something else?* — has been asked once by an independent team and answered **no detected difference**.
  **Of the independent findings whose comparison condition is documented, every positive one compares Khan
  Academy usage against less of it or none of it, not against an equal-time alternative.** That asymmetry
  is the finding. *(Qualifier per V4c: F10's comparison condition is not characterised anywhere in this
  dossier — a cluster-RCT adding a platform is normally against business-as-usual, so the claim is very
  likely right for F10 too, but for F10 it rests on inference, not on a recorded fact, and should be
  checked before the claim is relied on categorically. The claim holds outright for F11 and F12, and F7/F8
  are not independent so fall outside its scope.)*
  **Counter-reading that must be carried with the null (V4c, running in the dossier's favour):** F13's own
  authors state "the use of Khan Academy was found to be no worse than more traditional forms of
  supplemental instruction" (p.76) and raise it explicitly as a resource question — Khan Academy "may be
  thought of as an alternative to traditional supplemental mathematics instruction that may benefit…
  schools by increasing efficiency in the use of instructional resources" (p.74). Equivalent outcomes from
  a self-directed, zero-teacher-planning supplement versus teacher-delivered enrichment is a modest
  **efficiency** reading, not only an absence of advantage. The underpowering caveat applies to the
  efficiency reading just as much.
- **No study of any kind — first-party or independent — was located evaluating Chess.com's puzzle-rating or puzzle-training system's effect on learning/skill outcomes.** Chess.com's own public material (searched but not found to contain controlled outcome data) makes practice-value claims in narrative/marketing form only; the only controlled experimental evidence located in the chess domain (F9) is about general chess instruction's transfer to math, not about the Chess.com platform or its rating mechanism at all, and is explicitly a null result for that different question.
- **Neither product's public documentation states how confident the system is in a rating with few observations** in the way Glicko's Rating Deviation is described for regular Chess.com games (F3) — the puzzle rating's own RD behavior specifically (as opposed to the general-game RD) was not directly confirmed in any source opened for this card, only inferred from "Glicko-style" language (F1).

## Collector self-QA (fill before returning — Task's internal QA pass)
- [x] Every major claim has ≥1 source with a locatable supporting location.
- [x] No claim states strength beyond what its source shows (RCT vs observational distinction preserved; COI disclosed and not smoothed over; "Glicko-style" not upgraded to a specific named algorithm).
- [x] Every finding carries provenance + proposed status bucket + proposed quality tier.
- [x] Every source lists a URL/DOI for independent re-check.
- [x] Coverage gaps and candidate conflicts are named explicitly.
- [x] Citation count is within the depth budget (9, within 6–12; no overflow needed). **[Scoped to the original pass. Updated by C4-ED, 2026-07-20: across all three passes the dossier stands at **13 findings / 15 distinct sources — exactly at the hard cap of 15**.]**
- [x] No citation was added merely to reach a count — F9 is flagged as out-of-product-scope rather than silently presented as evidence about Chess.com.
- [x] (C1/C4 only) The mastery-model sufficiency statement is filled.

## Findings added by focused pass (C4-FP, 2026-07-19)

> Scope: this pass corrects exactly one false-negative coverage-gap bullet (see below) by collecting
> the independent Khan Academy efficacy evidence V4 found the original collection missed. It does not
> re-touch F1–F9, and it does not re-litigate Chess.com or the other three coverage gaps, which V4
> found honest. Leads consumed (untrusted): `registers/source-lead-register.md` rows #3, #4, #5.

### F10: An independent, federally funded multi-site cluster-RCT of Khan Academy's Algebra Basics Mission in California community college algebra found a statistically significant, small-to-moderate positive effect on algebra test scores (Hedges g = 0.32, 95% CI 0.14–0.50) for the first of its two study cohorts — but the study's own authors flag baseline non-equivalence and 68% instructor attrition as threats to that estimate
- Provenance: PUBLISHED
- Access: (a) IES award-record page fetched via WebFetch and read directly; (b) two peer-reviewed conference-proceedings PDFs (Hauk, Matlen, & Thomas, 2017; Hauk & Matlen, 2017) downloaded with `curl` and converted with `pdftotext` for local extraction, then read in full — not trusted from a fetch summary, per this program's known PDF-extraction hazard.
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: Q2 (primary controlled experiment — multi-site cluster-randomized trial), with the caveats below attached rather than smoothed over
- Source(s): (a) IES Award Record, "Khan Academy Resources for Maximizing Mathematics Achievement: A Postsecondary Mathematics Efficacy Study" (PI Steve Schneider, Co-PI Shandy Hauk; WestEd; IES Award #R305A140340, $2,197,416, 2014–2017). https://ies.ed.gov/use-work/awards/khan-academy-resources-maximizing-mathematics-achievement-postsecondary-mathematics-efficacy-study ; (b) Hauk, S., Matlen, B., & Thomas, L. (2017). "Exploration of the Factors that Support Learning: Web-based Activity and Testing Systems in Community College Algebra" [Contributed Report]. *Proceedings of the 20th Annual Conference on Research in Undergraduate Mathematics Education*, 638–645. https://files.eric.ed.gov/fulltext/ED583985.pdf ; (c) Hauk, S., & Matlen, B. J. (2017). Same title [Conference Long Paper]. *Proceedings of the 20th Annual Conference on Research in Undergraduate Mathematics Education*, 360–372. https://files.eric.ed.gov/fulltext/ED583986.pdf
- Proposed supporting location: (a) award abstract and design/sample fields; (b) Results section, p.641 (short paper); (c) "Intervention impact" subsection, pp.366–368 (long paper, fuller detail). **[Supporting-location correction applied in place by C4-ED, 2026-07-20, per V4b: the 0.14–0.50 interval is attributed to *Hedges g* explicitly only in the **short paper (b), p.641**. The long-paper sentence this finding actually quotes says "around the effect estimate", not "around the Hedges g". Cite (b) for the g-attribution. This is a citation-precision fix only — V4b applied **no downgrade of any kind** to F10, whose cohort limitation and both author-flagged validity threats are represented at full source strength.]**
- Claimed strength (exact quotes): "Controlling for students' pretest EAP scores, we found that using this particular WATS platform corresponded to a 0.35 increase in students' post-test EAP scores. This difference is considered a statistically significant positive effect (p < .05). The Hedges g value for this effect is 0.32... The 95% confidence interval around the effect estimate was 0.14 - 0.50" / raw-score model: "impact of WATS was estimated to result, on average, in a 2.57 point increase in student raw score... a statistically significant positive effect (p = 0.04, SE = 1.18, Hedges g = 0.32)" / "an effect size of .32 would correspond to an approximate 11 percentile point increase in scores... students in the WATS condition would perform at the 61st percentile" (source c, pp.367–368).
- Caveats: **This is the first-of-two-years cohort only** (510 students, 29 instructors, 18 colleges after attrition), explicitly labeled "early results" and "preliminary" by the authors, who state they are pooling it with a second 2016–17 cohort toward the study's full analytic sample (588 students / 34 instructors / 20 colleges, per the IES award abstract). Despite an extensive search — the IES award page, ERIC, Google Scholar–style queries for a combined-cohort report/journal article, and the WestEd project page (unreachable, DNS failure on every route tried) — **no publication with the pooled two-cohort effect size was located**; this is recorded as an honest sub-gap rather than silently presented as final. **The authors' own reported threats to validity, not smoothed over:** (i) instructor attrition from 89 enrolled to 29 analyzed (68%) is called out by name as a risk to generalizability; (ii) baseline non-equivalence — student pretest EAP scores differed between conditions at Hedges g = 0.30, which the paper itself notes exceeds the What Works Clearinghouse's g < .25 threshold for statistical correctability ("The EAP pretest difference for students is large enough that the analytic sample might be considered non-equivalent at baseline"). **Naming of the treatment:** neither conference paper names "Khan Academy" as the treatment condition in its Methods/Results text — both refer to it only as "the particular WATS investigated in our study," while citing Khan Academy's Mission/mastery-challenge mechanism elsewhere in the same papers only as a comparator example. The award record (source a) and the study's title, grant description, and outside citations of it (e.g., by Khan Academy's own later blog material) are what confirm the treatment is Khan Academy's Algebra Basics Mission; this is not in doubt, but it is worth flagging that the peer-reviewed text itself is not the place that names the product. **Population, as the verifier specifically asked this pass to flag:** these are self-directed, mostly-adult **community college students** — closer to this product's likely solo-adult trainee than the grades 3–8 populations in F7 and F8. **Independence:** fully independent authorship — WestEd (an independent nonprofit research agency), no Khan Academy staff or advisory-committee overlap found on the byline; funded by a competitive federal grant (U.S. Department of Education, Institute of Education Sciences), not by Khan Academy or an entity funding Khan Academy specifically, as far as this pass could confirm.

### F11: SRI International's 2014 Khan Academy report is explicitly an implementation study, not an effectiveness evaluation — its own authors state a true RCT was not attempted, and its test-score and attitudinal findings are presented as correlational, not causal, with mixed significance across sites and grades
- Provenance: PUBLISHED
- Access: PDF downloaded with `curl` from the report's own S3-hosted URL and converted with `pdftotext` for local extraction (36,189 words); read and grepped locally rather than trusted from a fetch summary, per the same hazard noted for F10.
- Proposed status bucket: Evidence-backed, with the association/non-causal framing preserved rather than upgraded
- Proposed evidence-quality tier: Q3 (observational/correlational primary study) — per the verifier's instruction, this is explicitly not an RCT and must not be recorded at a strength implying causal identification
- Source(s): Murphy, R., Gallagher, L., Krumm, A., Mislevy, J., & Hafter, A. (2014). *Research on the Use of Khan Academy in Schools*. Menlo Park, CA: SRI Education / SRI International. Funded by the Bill & Melinda Gates Foundation. https://s3.amazonaws.com/KA-share/impact/khan-academy-implementation-report-2014-04-15.pdf
- Proposed supporting location: "The Evolution of Khan Academy in Partnership with Schools" section (design rationale) and "Preliminary Findings on the Connection Between Khan Academy Use and Improved Teacher Practices and Student Outcomes" section (results), pp.31–39
- Claimed strength (exact quotes): "Because of the early-stage, emergent nature of both Khan Academy as a school resource and the schools' personalized learning implementation practices, SRI conducted an implementation study rather than an evaluation of Khan Academy's impact. An experimental test of an intervention's impact (a randomized control trial) would have required a clearly specified treatment... it was too soon to attempt a rigorous evaluation." / "these analyses are correlational and do not constitute definitive evidence with respect to Khan Academy impacts." / On test scores: "A positive association was found between more Khan Academy use and progress and improvements in student test scores" for grades 5–6 at Site 1 and grade 7 at Site 9 (statistically significant), with grade 8 at Site 9 showing "a strong trend in the same direction" that "was not statistically significant." / On attitudes: "A positive association was found between more Khan Academy use and progress and improvements in three of the four self-reported nonachievement outcomes – math anxiety, math self-concept, and academic efficacy," restricted to a single site/cohort (5th–6th grade, Site 1, SY2012-13) — but "these findings...are encouraging, they are correlational in nature rather than proof of causal impact."
- **INDEPENDENCE DOWNGRADE — applied in place by C4-ED (2026-07-20) per V4b; supersedes the independence language in the Caveats field below.** F11 is independent of Khan Academy **by authorship only**. It is **not** independent by funder and **not** fully independent by design, and both facts are stated in the report the collection pass had already downloaded and read:
  - **Funder.** p.iii: "In 2010 Khan Academy received major funding from the Bill & Melinda Gates Foundation and Google to build out its organization and create additional content." — and, in the sentence that carries over onto **p.iv** ~~p.iii~~ **[folio corrected by C4-ED-2, 2026-07-20, per W5-2: this second sentence is on folio p.iv, not p.iii; "major funding" on p.iii is correct and unchanged]**: "the Bill & Melinda Gates Foundation contracted with SRI International to study the implementation of Khan Academy." **Khan Academy's own major funder commissioned this study of its own grantee.** This is established fact, not an open question.
  - **Design.** p.9: "The research team selected the study sites in collaboration with Khan Academy." Acknowledgments, p.ii: "we would like to acknowledge the contributions of the leadership and staff at Khan Academy and their valuable insights and collaboration throughout this study." **Site co-selection by the sponsor's grantee is a material design-independence fact.**
  - **Corrected claim:** *F11 is author-independent only — SRI International, no Khan Academy staff on the byline — but commissioned by Khan Academy's major funder, with Khan Academy co-selecting sites and collaborating throughout.*
  - **Tier and framing unaffected:** Q3 and the non-causal/correlational handling were confirmed correct by V4b and are not disturbed.
- ~~**QUOTE-ACCURACY CORRECTION (C4-ED, 2026-07-20, per V4b).** The Caveats field below presents `"multiple plausible explanations for any of the reported associations"` inside quotation marks. **That sentence is not in the report.** The actual wording (p.38) is: "Multiple explanations for these associations are plausible in addition to the possibility of a causal link between Khan Academy use and better than predicted test performance." The substance is unaffected; the quotation marks were not earned and should be read as a paraphrase.~~
- **REVERSAL — the quote-accuracy correction above is SUPERSEDED and WITHDRAWN (C4-ED-2, 2026-07-20, per W5-1). The quotation is genuine and is restored.** The struck correction asserted a **falsehood about this source**. The phrase *is* in the report, verbatim, in the sentence that carries from the foot of folio **p.36** onto the top of folio **p.37** (pdf p.53), in the "Examining the Link between Khan Academy Use and Student Outcomes" section: "Although these models can help us examine the relationship between use and outcomes they cannot be used to establish with any level of confidence whether the use of Khan Academy caused better student outcomes. **There are multiple plausible explanations for any of the reported associations.** As a result, the findings presented in this section should be treated as exploratory and not be used to support definitive claims about the effectiveness of the Khan Academy resources." **Verified for this reversal by re-reading the primary PDF at page level (folios 36, 37, 39), not by re-reading a verification record.**
  - **Both sentences exist, in different places.** The report *also* contains, later, on folio **p.39** (pdf p.55) — *not* p.38, which is a table page: "Multiple explanations for these associations are plausible in addition to the possibility of a causal link between Khan Academy use and better than predicted test performance." V4b located this second sentence, concluded from its presence that the quoted one did not exist, and attributed it to p.38. Both conclusions were wrong.
  - **Origin of the error: V4b, not the collector and not C4-ED.** The collection pass's quotation was accurate — **it earned those quotation marks**, and the supporting location for it is **p.37**. V4b's verification record (`verification/V4b-chesscom-khan-toppedup.md`) is left unamended: verification records are historical and immutable, so the error is *recorded* here rather than edited there.
  - **Mechanism, recorded because it generalises.** C4-ED issued **no WebFetch**; it worded every correction from text already quoted inside V4/V4b/V4c. That makes it an **inherited-text pass with no mechanism to catch a prior verifier's misquote** — it could only propagate one. It is the mirror image of the pessimism defect the same pass correctly caught at D4: a correction running *against* the dossier that was itself unwarranted. **A pass that reads only verification records inherits their errors silently.** Corrections about what a source says must be worded against the source.
  - **Scope of this reversal:** the quotation and its supporting page only. F11's independence downgrade, its Q3 tier, its non-causal/correlational framing and every other C4-ED correction are untouched and remain correct. C4 remains **SUFFICIENT**; F13 remains **VERIFIED**.
- Caveats: This is the **landmark ~~independent~~ [struck by C4-ED — see the independence downgrade above; read "author-independent" here, not "independent"] Khan Academy evaluation** the verifier flagged as an expected citation any competent review would carry — a genuinely different research organization (SRI International, no Khan Academy authorship on the byline), ~~Gates Foundation–funded rather than Khan-Academy-funded~~ **[struck by C4-ED: this framing implies funder independence the report contradicts — Gates was Khan Academy's own major funder from 2010 and commissioned this study]**, covering 2 years / 9 sites / 20 schools / ~70 teachers / roughly 2,000 students per year (2011–13). But it is materially **weaker than an RCT in every dimension the brief warns against overstating**: no control group in the causal-inference sense — the design instead splits *within* the treated population by whether spring scores/attitudes were higher or lower than a regression-predicted value, and the authors themselves repeatedly disclaim causal interpretation and note "multiple plausible explanations for any of the reported associations" **[genuine verbatim quotation, SRI 2014, folio p.37; quotation marks RESTORED by C4-ED-2, 2026-07-20, per W5-1 — C4-ED's paraphrase relabelling was an inherited V4b error and is withdrawn, see the reversal above]** (e.g., unmeasured student traits like persistence or motivation could drive both higher Khan Academy usage and better outcomes). Statistical significance was inconsistent across the two sites/grade-bands studied (not significant for 8th grade at Site 9; only 3 of 4 attitudinal measures reached significance, and only for time-spent in 2 of those 3). Population is grades 5–8, not adult/postsecondary. ~~**Independence note not otherwise confirmed:** this pass did not verify whether the Gates Foundation, as SRI's funder here, has also funded Khan Academy directly in the same period — that would be a funder-side (not author-side) independence question distinct from authorship, and it is left unresolved rather than asserted either way.~~ **[STRUCK by C4-ED, 2026-07-20 — RESOLVED, and it resolves against independence. This was never an open question: the answer was on **pp.iii–iv** ~~p.iii~~ **[folio corrected by C4-ED-2 per W5-2]** of the PDF this pass states it downloaded and read in full. Gates gave Khan Academy "major funding" in 2010 and then "contracted with SRI International to study the implementation of Khan Academy." Leaving it "unresolved" was a search failure inside a source already in hand, not honest gap-naming. See the independence downgrade at the head of this finding.]**

### F12: Patil & Juanico (2024), an independent single-subject multiple-baseline study at the University of Kansas (n=3), found Khan Academy effective for teaching targeted elementary math skills to all three participants — a small, low-powered but genuinely independent data point from a methodological tradition (single-case behavior analysis) this dossier does not otherwise touch
- Provenance: PUBLISHED
- Access: ~~PubMed abstract page fetched via WebFetch and read directly; the Springer/ResearchGate full-text pages returned an authentication redirect and an HTTP 403 respectively on this pass and were not obtained — recorded honestly as abstract-level access~~ **[ACCESS CORRECTION applied in place by C4-ED, 2026-07-20, per V4b — this runs in the dossier's favour. Access is NOT abstract-only. The full text is FREE at PMC: `https://pmc.ncbi.nlm.nih.gov/articles/PMC12779882/` (12,142 words, obtained and read by V4b), and the PubMed page this pass says it read directly displays both "Free PMC article" and "PMCID: PMC12779882". The collection pass stopped at Springer and ResearchGate without trying the free route shown on the page it had open.]** Provenance is PUBLISHED either way, per the provenance vocabulary ("every journal article... is PUBLISHED, whether you read the full text or only an abstract").
- Proposed status bucket: Evidence-backed, weighted low given n=3
- Proposed evidence-quality tier: **Q2 retained; its stated warrant is STRUCK.** ~~Q2 (primary controlled experiment) in the single-case-design sense — multiple-baseline designs stagger intervention onset across participants/behaviors specifically to control for history/maturation confounds, which is a genuine experimental logic, not a merely correlational one~~ **[TIER-WARRANT STRIKE applied in place by C4-ED, 2026-07-20, per V4b. The struck rationale is contradicted by the study's own authors. This is a *nonconcurrent* multiple-baseline design, and the authors say the opposite about exactly the property the warrant claimed: "we used a nonconcurrent multiple baseline design for practical reasons. Although there is some debate related to the internal validity of this design (e.g., Slocum et al., 2022), our results should be interpreted with caution as this design **is limited in functional control due to its inability to identify history and maturation effects**… Thus, researchers should evaluate Khan Academy using designs (e.g., concurrent multiple baseline design, multiple probe design, consecutive controlled case series) that will give more confidence that exposure to Khan Academy is responsible for changes in responding." The warrant was also asserted about a design feature the collection pass could not have read — "multiple baseline" appears nowhere in the abstract it says it worked from.]** **Corrected tier statement: Q2 in the single-case-experimental sense — the independent variable is manipulated against a steady-state baseline — but a *nonconcurrent* multiple-baseline single-case experiment (n = 3) whose own authors state it lacks functional control over history and maturation effects and call for concurrent designs before attributing change to Khan Academy.** This remains **not equivalent to group-level RCT generalizability**, and is flagged as such rather than left to imply it.
- Source(s): Patil, P. A., & Juanico, J. F. (2024/2025). "The Effectiveness of Khan Academy in Teaching Elementary Math." *Behavior Analysis in Practice*, 18(4), 991–1004. DOI: 10.1007/s40617-024-00982-6. https://pubmed.ncbi.nlm.nih.gov/41523820/
- Proposed supporting location: PubMed abstract; author-affiliation field; competing-interests field
- Claimed strength (exact quotes, as rendered on PubMed): "Evaluating online educational platforms requires studying the design, development, and implementation of the learning environment as well as the learning materials, learners, and learning process to facilitate improvements in teaching and skill acquisition." Participants completed worksheets before and after Khan Academy use to assess targeted math-skill acquisition; "Khan Academy was effective for all three participants." Competing-interests statement, quoted in full: "The authors have no relevant financial or nonfinancial interests to disclose."
- Caveats: **n = 3.** This is the smallest and least generalizable of the three sources this pass collected, and it should be weighted accordingly, exactly as the verifier's scoping instructed — it is included for methodological diversity (single-subject behavior-analysis tradition, entirely distinct from the group-comparison designs of F7, F8, F10, and F11), not as a strong standalone efficacy claim. **Independence: confirmed.** Both authors are affiliated with the Department of Applied Behavioral Science, University of Kansas — no Khan Academy affiliation found on the byline — and the paper's own competing-interests statement discloses none. ~~No funding source is stated in the abstract-level material obtained; full-text access (Springer login wall, ResearchGate 403) would be needed to check for a funding-acknowledgment section, which is not the same field as the competing-interests disclosure already confirmed clean.~~ **[STRUCK by C4-ED, 2026-07-20 — RESOLVED CLEAN via the free PMC full text, per V4b; this runs in the dossier's favour. Declarations: "The authors did not receive support from any organization for the submitted work and declare they have no financial interests." n = 3 also confirmed on the full text. **F12's independence is therefore the strongest of the three sources this pass added — confirmed on authorship, COI *and* funding — not the weakest on that axis.**]** **Note on supporting location (V4b):** the design and funding statements live in the **PMC full text**, not in the PubMed abstract listed above as the supporting location.

### Coverage-gap correction (the one permitted edit to existing dossier content)

The second bullet of the original **Coverage gaps** section above (the one asserting no independent
efficacy study exists) has been rewritten in place and marked `[corrected by C4-FP, 2026-07-19]` —
this is the sole edit made to pre-existing dossier text; no other finding, quote, tier, or section
above was altered. See that bullet for the corrected wording; it points to F10–F12 below for the
evidence.

### New coverage gaps surfaced by this pass
- **No publication reporting the WestEd/IES study's full, pooled two-cohort analytic sample (588 students / 34 instructors / 20 colleges) and its combined effect size was located**, despite a genuine search (IES award page, ERIC, the study's own conference-paper reference lists, and repeated attempts at the WestEd project page, which failed DNS resolution on every route tried in this pass). Only the first-cohort (510/29/18) peer-reviewed preliminary result is cited here (F10). A future pass could retry the WestEd project page from a different network path, or search for a Tipton & Matlen (2019, *American Journal of Evaluation*) or Hauk & Kaser (2020, same journal) methods paper that may reference the final combined effect size in passing.
- ~~**Whether the Bill & Melinda Gates Foundation — SRI's funder for F11 — also funded Khan Academy directly during the same period was not checked in this pass.** This is a funder-side independence question distinct from the author-side check this pass did perform (no Khan Academy staff on any of the three new bylines); it is named here rather than either assumed clean or assumed compromised.~~ **[CLOSED — NOT A COVERAGE GAP. Struck by C4-ED, 2026-07-20, per V4b. This was never an open question requiring further collection: the answer sits on **pp.iii–iv** ~~p.iii~~ **[folio corrected by C4-ED-2 per W5-2]** of the SRI PDF this pass had already downloaded and read. Gates gave Khan Academy "major funding" in 2010 and then "contracted with SRI International to study the implementation of Khan Academy"; Khan Academy also co-selected the study sites (p.9). It resolves **against** F11's funder-side independence. See the independence downgrade at F11.]**

### Candidate conflicts noticed by this pass
- None rising to the conflict register. F10's RCT effect (g = 0.32, community-college algebra) and F11's grades 5–8 correlational associations are not in tension with each other or with F7/F8 — different populations, different designs, different outcome measures — consistent with the original dossier's finding that F7 and F8 also do not conflict.

### Citations added by this pass: 3 findings (F10–F12), drawing on **5** distinct sources (F10 cites 3: the IES award record plus two conference-proceedings papers; F11 and F12 each cite 1).
**[Arithmetic correction applied in place by C4-ED, 2026-07-20, per V4c D5. This line originally read "4 distinct sources" while its own parenthetical enumerates 3 + 1 + 1 = **5**. The error predates the C4-RT pass and was inherited by both later count statements.]**

## Findings added by remediation sufficiency top-up (C4-RT, 2026-07-20)

> **Marked as a sufficiency top-up.** Scope: **one citation**, added under program Amendment 6, which
> permits an additional focused pass where the missing evidence is **already specifically identified**.
> It was: V4b (`verification/V4b-chesscom-khan-toppedup.md`, §"If INSUFFICIENT", item 1) named
> Kelly & Rutherford (2017) exactly, with DOI and open-access route, and scoped this pass to
> "**one citation, roughly half a page**". That is the authorisation for this pass and it is recorded
> here rather than assumed. The citation was denied entry in Phase 1 purely by the one-pass rule, for
> consistency rather than on merit.
>
> ~~**This pass is append-only.** No pre-existing dossier text — including the header citation-count
> line, the Overflow-leads line, the self-QA checkboxes, the Sufficiency statement, and the
> `[corrected by C4-FP]` coverage-gap bullet — was edited. Where a pre-existing statement is now
> stale or incomplete, that is recorded in the appended sections below instead of rewritten above.
> Consequence to note for downstream readers: the header still reads "total 12/15"; the true count
> after this pass is **13 findings / 5 distinct sources added since the original 9**.~~
>
> **[SUPERSEDED by editorial pass C4-ED, 2026-07-20.]** The append-only constraint that governed the
> C4-RT pass has been **lifted**, and the editorial debt it accumulated has been discharged in place —
> the coverage-gap bullet is re-stated at its own location, V4b's F11 independence downgrade and F12
> tier-warrant strike are applied to F11 and F12 themselves, and the header count is corrected.
> Downstream readers no longer need to read the appended sections before relying on F11, F12 or the
> coverage-gap bullet. **The count statement above is also wrong on its own terms** (per V4c D5): "5
> distinct sources added since the original 9" implies 14 and omits F13's own source from its tally.
> **The correct counts are 13 findings / 15 distinct sources** — see the corrected header.
>
> Leads consumed (untrusted): `registers/source-lead-register.md` row #27.

### F13: The only independent controlled study of Khan Academy located by this program that compares it against **active** controls — Kelly & Rutherford (2017), grade 7, 4 weeks — found **no statistically significant difference** in math test scores on any of its three comparisons; but it is a small, short, below-grade-level-outcome quasi-experiment whose null is underpowered, so it establishes "no detected benefit here," not "no benefit"
- Provenance: PUBLISHED
- Access: **Full text obtained and read first-hand this session.** The IRRODL galley PDF (`/article/view/2984/4199`) did not extract via fetch; the article landing page and the inline HTML galley (`/article/download/2984/4221?inline=1`) were fetched, and the **ERIC full-text PDF (`https://files.eric.ed.gov/fulltext/EJ1146230.pdf`) was retrieved and read page-by-page in full (8 pp., pp. 70–77)**. All quotes below are from that PDF, read directly — not from an abstract, not from a fetch summary, and not from V4b's rendering of it. Open access, CC BY 4.0.
- Proposed status bucket: Evidence-backed
- Proposed evidence-quality tier: **Q3** (observational/quasi-experimental primary study). **Do not let "A Controlled Study" in the title imply randomisation** — assignment was not random and the paper says so. The authors themselves call it "merely exploratory."
- Source(s): Kelly, D. P., & Rutherford, T. (2017). "Khan Academy as Supplemental Instruction: A Controlled Study of a Computer-Based Mathematics Intervention." *International Review of Research in Open and Distributed Learning*, 18(4), 70–77. DOI 10.19173/irrodl.v18i4.2984. ERIC EJ1146230, full text `https://files.eric.ed.gov/fulltext/EJ1146230.pdf`; journal record `https://www.irrodl.org/index.php/irrodl/article/view/2984`
- Proposed supporting location: Abstract (p.70); Method — Context, Participants and Setting, Design, Procedure, Measures (pp.72–73); Comparison of Groups and Table 1 (p.74); Table 2 and Associations (p.75); Discussion (pp.75–76); Conclusion (p.76)

**Study design (exact, as the paper states it).** "A post-test only control-group quasi-experimental
design was chosen for this study due to factors related to convenience and accessibility. Classes of
students were selected for control (n=75, both math and ELA enrichment courses) and treatment (n=39)
groups based on whether the classes were taught by the lead author." (p.73) **Unit of assignment is
the class, and the assignment rule is "taught by the lead author" — not randomisation.** The paper
concedes the non-randomness in its own words and argues it is benign: "Students were assigned their
enrichment class based on their elective course schedule and not on their math class or ability and
alternated between math and ELA enrichment on a quarterly basis. In this respect, although the
distribution of students across treatment and control groups is far from random, there is little
reason to believe it is related to student achievement." (p.73) **Duration: four weeks.** Setting: "a
large suburban charter school in North Carolina", N = 114 seventh graders, all of whom "received
mathematics instruction from the same teacher" (pp.72–73). No pre-test was administered — this is a
post-test-only design, so baseline equivalence is argued, not measured.

**Comparator — what the active controls were actually doing.** Two control conditions, both of which
are *additional class time*, which is what makes this the dossier's only active-control comparison:
(i) **math enrichment** (n = 23) — "Math enrichment classes were for general supplemental math
instruction and not planned in collaboration with the math teacher" (p.73), and "Control group
students attended their math or ELA enrichment class with instruction given at the teacher's
discretion." (p.73); (ii) **ELA enrichment** (n = 52) — English language arts enrichment, i.e. an
active non-math comparator. "Teachers of control group classes were asked not to expose their
students to Khan Academy or any other computer-based interventions." (p.73) The **treatment** (n = 39)
"worked with Khan Academy for a minimum of 30 minutes per class over a four-week period… Students were
not given specific topics to work on within Khan Academy. This was intentional and meant to simulate
the typical use of Khan Academy as a self-paced and self-directed supplement to classroom mathematics
instruction by students working from home." (p.73) **Honest limit on the word "active":** the math
control is an *unstructured* comparator delivered at teacher discretion, not a specified alternative
protocol — the authors themselves later attribute the flat result partly to "a general lack of
structure in enrichment classes" (p.75). It is an active control in the sense that matters (equal
extra time on task), but it is not a well-specified one.

**Result — the three null comparisons, verbatim with exact statistics.**
- Abstract, p.70: "We also compared differences between students who had supplemental mathematics instruction and those who had not. **In both cases, we found no statistically significant differences in student test scores.**"
- KA vs combined controls, p.74: "Analysis revealed unremarkable differences in mean post-assessment scores between the combined math and ELA supplement control (M = 72.22, SD = 14.750) and treatment (M = 73.75, SD = 14.280) groups. Although the treatment group scored slightly higher (MD = 1.53), differences did not rise to a level of statistical significance (*p* = .596)."
- KA vs traditional supplemental math (the active-control comparison proper), p.74: "In comparing the Khan Academy class and traditional math supplemental class, there was no difference in test scores, *t*(60) = -1.009, *p* = .842."
- Any math supplement vs none, p.74: "we compared the combined math supplemental group to the ELA supplemental group. Again, there was no statistically significant difference, *t*(112) = .649, *p* = .259."
- Discussion, p.75: "our failure to find an association between Khan Academy and math test scores is of note." And p.76: "the use of Khan Academy was found to be no worse than more traditional forms of supplemental instruction."
- Conclusion, p.76: "This study did not find associations between use of Khan Academy as supplemental instruction and higher math test scores; however, only one parameter of student success was measured."

**Secondary finding on Khan Academy's own metrics (Table 2, p.75, N = 39) — directly relevant to Q5.**
"Student assessment scores were positively correlated with both topics mastered (*r*(37) = .51, *p* =
.001) and points attained (*r*(37) = .41, *p* = .009)." But the authors single out the dose measure and
find it null, and say why that is the decisive one: "**Minutes Spent was the metric arguably most
unrelated to prior student ability and therefore the least biased test of the potential impact of Khan
Academy use. It was not associated with student test score, *r*(37) = .132, *p* = .422** even though
there was a strong positive association between minutes spent using Khan Academy and topics mastered,
*r*(37) = .76, *p* = < .001." Their own reading, p.75: "it is possible that student factors, such as
prior mathematics ability or achievement, may be both driving these metrics and test scores."

**Limits — recorded at full strength, in both directions.**
- **Power.** No power analysis is reported anywhere in the paper. The active-control cell is **n = 23**; the key KA-vs-math-supplement contrast runs at *t*(60). A null at that size is compatible with a real small-to-moderate effect going undetected. **This null therefore does not license "Khan Academy does not work"** — it licenses "no benefit was detectable in a 4-week, 62-student contrast." Stating it more strongly than that would overstate it.
- **Outcome measure sensitivity.** The post-test was "21 multiple-choice questions… derived from a quasi-random stratified selection of questions from a previously administered, released copy of a North Carolina End-of-Grade mathematics assessment (**grade six**)" (p.73), administered to **seventh graders** at a school whose "students… had above average scores on standardized, state-wide, end-of-grade mathematics assessments when compared to both the state and the county" (p.72). ~~A 21-item, below-grade-level instrument given to an above-average sample is a low-ceiling, low-sensitivity measure; group means cluster at ~70–74%. This is a real threat to detecting any effect and the paper does not discuss it.~~

  **[CORRECTED IN PLACE by C4-ED, 2026-07-20, per V4c D4. This is the one defect on F13 that ran *pessimistic*, and it is corrected in the dossier's favour rather than preserved because pessimism feels safer.]** **Corrected wording:** *a 21-item instrument built from below-grade-level content and given to an above-average sample is **coarse and off-target in difficulty**, which limits sensitivity to small differences — one item ≈ 4.8 percentage points. The paper selected this instrument **specifically to escape a ceiling effect** in its prior measure and reports that it produced normally distributed scores, but it never examines the replacement instrument's own sensitivity.*
  Why the struck wording was wrong, on the paper's own data:
  1. **"Low-ceiling" is contradicted by the paper's own reported results.** Group means are 70.08–73.78% with SDs of 10.60–17.66, and the paper reports that "Assessment scores for both groups were normally distributed (assessed by Shapiro-Wilk's test), and there was homogeneity of variances (assessed by Levene's test…, p = .949)" (p.74). A genuine ceiling produces pileup near the maximum and negative skew; a mean of ~72% with confirmed normality is the opposite of that. **Low *sensitivity* is warranted; low *ceiling* is not.**
  2. **"the paper does not discuss it" understates the paper.** Ceiling effects are its **entire stated design rationale**: the lead author's *prior* comparison used math class grades, which he "discovered… were heavily skewed with a high number of students with course grades at or above 100%", and so "**Due to the potential ceiling effects of the previously-used measure**, the lead author designed a study with the explicit intent of investigating the association between Khan Academy use and an assessment that would result in more normally distributed scores suitable for statistical analysis" (p.72). The paper engaged the ceiling question directly and, on its own reported diagnostics, solved it. What it does not discuss is the **replacement** instrument's sensitivity — which is the true and defensible version of this criticism.
- **No pre-test / no covariates.** Post-test-only with non-random assignment and no reported baseline measure. The authors call for "Further study including relevant covariates or introducing random variation in Khan Academy use… in order to draw conclusions or make generalizable assumptions." (p.75)
- **Attrition.** None reported; the design is a single post-test, so there is no attrition figure to report and none is given.
- **Generalisability, in the authors' own words.** "This study does not present generalizable data and is limited in scope. More research with greater demographic diversity may present a clearer picture of the effects of Khan Academy and possibly similar programming." (p.76) Single school, single grade, single math teacher, 4 weeks.
- **Dose realism cuts both ways.** 30 minutes per class over 4 weeks is a *short* exposure. Note the contrast with F7, whose positive elementary effect was concentrated in classrooms averaging ~35 min/week sustained far longer, and F10, a semester-long dose. This is a real reason the null and the positives can coexist without contradiction.
- **Two internal numerical inconsistencies, recorded because they were found on a first-hand read and not because they change the verdict.** (i) The narrative reports the treatment group as "M = 73.75, SD = 14.280" (p.74) while **Table 1 on the same page reports Treatment M = 73.18, SD = 14.32** (and Table 2, p.75, likewise gives assessment-score M = 73.18, SD = 14.32 for N = 39). Table 1's group means (ELA 70.08 / Math 73.78 / Treatment 73.18 / Total 71.89) also do not reconcile with a combined-control mean of 72.22. **[STRENGTHENED by C4-ED, 2026-07-20, per V4c — this inconsistency is firmer than stated, and the error can be localised. Table 1 reconciles *exactly with itself*: its enrolment-weighted total, (52 × 70.08 + 23 × 73.78 + 39 × 73.18) / 114 = **71.89**, matches Table 1's own printed Total of 71.89 to the decimal, while the enrolment-weighted combined control is (52 × 70.08 + 23 × 73.78) / 75 = **71.21**, not the narrative's 72.22. **The tables are internally coherent; the narrative figures are the outliers.** The table-derived mean difference would be 73.18 − 71.21 = 1.97 rather than the reported MD = 1.53 — still null, still small, still in the treatment's favour.]**

  (ii) ~~The reported *p*-values are not conventional two-tailed values for the stated *t* and *df* — *t*(60) = -1.009 with *p* = .842 in particular is not a two-tailed *p*; the paper never states whether tests were one- or two-tailed.~~ **[CORRECTED IN PLACE by C4-ED, 2026-07-20, per V4c D2 and D3. Two things in the struck wording are wrong, and the corrected version is *sharper*, not softer.]**
  - **D2 — "the paper never states its tail convention" is inaccurate.** **Table 2's own note states it:** "Note. Bolded correlation coefficients are significant at the 0.05 level (**2-tailed**)." (p.75). The defensible version: *the paper does not state a tail convention for its **t-tests**.*
  - **D3 — the blanket claim over-generalises.** On independent recomputation of every reported value, **the paper mixes conventions**: comparison 1 (*p* = .596) **is** a conventional two-tailed value (pooled SD 14.59, SE 2.880, t = 0.531, df = 112 → two-tailed p = .5964), and **all four correlation p-values are conventional two-tailed values** (.0009 / .0095 / .4231 / <.0001), matching Table 2's stated convention. The defect is **confined to the two t-tests**, which report **upper-tail one-tailed** p-values: *t*(60) = −1.009, reported *p* = .842, is the upper-tail p (.8415) — i.e. one-tailed *in the direction opposite to the observed effect*; *t*(112) = .649, reported *p* = .259, is the upper-tail p (.2588). The original claim about *t*(60) = −1.009 specifically was exactly right.
  - **Corrected wording:** *the paper mixes tail conventions — comparison 1 and all four correlations report conventional two-tailed values, while the two t-tests at p.74 report upper-tail one-tailed values, one of them in the direction opposite to its own effect. Table 2 states a 2-tailed convention for the correlations; no convention is stated for the t-tests.*

  **Neither issue changes the direction of the result** — every comparison is null on any tail convention (the two-tailed values are .3170, .5177 and .5964, all comfortably null) — but both are flagged rather than passed through silently.

**Funding and independence — checked explicitly, including the disclosure pages.**
- **Authorship: independent.** Daniel P. Kelly and Teomara Rutherford, **NC State University** (title page, p.70). No Khan Academy affiliation on the byline; no Khan Academy staff involvement stated anywhere in the paper.
- **Funding: none disclosed — and, importantly, none to disclose is not the same as a clean statement.** I read all eight pages including the front matter, the end matter and the back page. **The paper contains no funding statement, no acknowledgements section, no competing-interests declaration, and no conflict-of-interest statement of any kind.** ~~The back page (p.77) carries only the Athabasca University logo and the CC BY licence mark.~~ **[CORRECTED IN PLACE by C4-ED, 2026-07-20, per V4c D1 — this description is false. Page 77 carries the **tail of the reference list** (Coletti et al. 2014, Gibson et al. 2015, Hinkle et al. 2003, Khan Academy 2015, Light & Pierson 2014, Murphy et al. 2014, Noer 2012, Thompson 2011, Weiland 2015) under the running head, with the folio 77 at the foot. A publisher logo may sit below the text as an image that text extraction would not surface, but "carries **only** the logo and the CC BY mark" misdescribes the page. **The load-bearing claim is unaffected and independently confirmed:** an eight-page case-insensitive sweep for funding / acknowledgment / conflict / competing-interest / grant / sponsor / disclosure terms returned **zero substantive hits** — the article contains no funding statement, no acknowledgements section and no COI declaration anywhere. The article's structure is Abstract → Introduction → Purpose → Method → Comparison of Groups → Associations → Discussion → Conclusion → References, with nothing after the References.]** The journal record likewise shows no article-level funding statement; IRRODL itself is supported by Athabasca University, AU Press and SSHRC. **So the honest statement is: independent by authorship and by institution, with funding and COI *not disclosed* rather than disclosed-and-clean.** This is weaker than F12 (Patil & Juanico, which affirmatively declares no support and no financial interests) and is a different situation from F11 (which affirmatively discloses a Gates→Khan funder relationship on its p.iii). It must not be recorded as "confirmed clean."
- **Relationship to Khan Academy: none disclosed, and none found.** No commissioning relationship, no data-sharing arrangement, no site co-selection, no acknowledgement of Khan Academy staff. This is the material contrast with F11 and it is why this citation carries real weight in the independence ledger.
- **But there is a design-independence caveat cutting the other way, and it must be carried.** The lead author **taught the treatment class and delivered the intervention himself**: "The lead author was originally hired in the school discussed in this study as a technology education teacher whose responsibilities included the teaching of math enrichment classes detailed below. As part of the class, he included the regular use of Khan Academy and received positive feedback from the students, administration, and parents. In order to determine the efficacy of his decision to use Khan Academy and justify continued use, he compared his students' math class grades to those in other enrichment classes…" (p.72). Assignment to treatment was literally "based on whether the classes were taught by the lead author" (p.73), so **teacher and condition are fully confounded** — the treatment group's teacher is the study's designer and an existing Khan Academy advocate. Also: "The data used in this study were collected prior to the lead author being affiliated with a university and were intended for use as a measure of instructional effectiveness. As such, Institutional Review Board (IRB) approval was not required for the original data collection. IRB approval was sought to use the de-identified student data reported herein, and exempt status was obtained retroactively." (p.72)
- **How that caveat should be read — and this is a judgement, flagged as such.** The teacher/condition confound is a genuine internal-validity threat, but its *direction of bias runs toward the treatment, not against it*: the intervention was delivered by its own advocate, who set out explicitly "to determine the efficacy of his decision to use Khan Academy and justify continued use" (p.72). A null found under those conditions is harder to attribute to investigator hostility than a null from a disinterested team would be. This does **not** repair the design, and it does not make the null stronger than its power allows — but it does mean the caveat should not be used to wave the result away.
  **[STRENGTHENED by C4-ED, 2026-07-20, per V4c — this argument has better support in the source than the dossier used, and the supporting sentence was sitting one line further on.]** The sentence immediately following the advocacy passage records that the lead author had **already run an earlier comparison in the same setting and it also returned a null**: "The results of that comparison showed no statistically significant differences between students using Khan Academy, students in other math enrichment classes, and those in English language arts (ELA) enrichment classes." (p.72). **An advocate who found a null on one measure, then built a better instrument specifically to test the question again, and reported a null a second time, is a materially harder pattern to explain as motivated reasoning toward a positive than advocacy alone.**
  **[Residual caveat added by C4-ED per V4c — the argument is probabilistic, not airtight.]** The confound is *teacher identity*, and the lead author was a technology-education teacher delivering enrichment, not the students' math teacher. A residual scenario therefore survives in which he was simply a less effective math instructor than the comparison enrichment teachers, which would bias *against* treatment and would partly manufacture the null. The paper reports no measure of instructor quality and cannot rule this out. The framing above survives because the paper's evidence about the author's motivation is direct and documentary while the counter-scenario is unevidenced speculation — but the residual is carried, not hidden.

- Caveats (summary): Q3, not Q2 — quasi-experimental, post-test-only, non-random, class-level assignment confounded with teacher. Underpowered (active-control cell n = 23). Below-grade-level 21-item outcome in an above-average sample. Four weeks. Single school, single grade, grade 7. Funding and COI undisclosed rather than declared clean. Lead author delivered the intervention. **The finding this citation actually supports is narrow and it is real: on the one occasion an independent team compared Khan Academy against equal-time active alternatives, no advantage was detected.**

### What this citation changes in the dossier's conclusions (appended, not edited above)

~~The `[corrected by C4-FP]` coverage-gap bullet above is **left exactly as written**, per append-only.
It is, however, **incomplete as of this pass**, and the following supersedes it for downstream synthesis:~~

**[STATUS UPDATED by C4-ED, 2026-07-20.]** Append-only has been lifted and **this section's content has
been applied in place at the coverage-gap bullet itself.** The section is retained below as the record of
where the correction originated; the bullet is now self-sufficient and no longer requires a downstream
reader to reach this section. The substance below stands:

- The bullet's correction — that independent Khan Academy efficacy evidence **exists** — stands and is
  well earned. **Do not reverse it.** Likewise, do not reverse V4b's two corrections that ran in the
  dossier's favour (F12 is free full text at PMC12779882, confirming n = 3 and a clean funding
  declaration; F10 required no downgrade of any kind).
- What must now be added: **that independent evidence is *mixed*, not uniformly positive.** The
  accurate summary is: positive in a semester-long community-college cluster-RCT (F10, g = 0.32, with
  68% instructor attrition and baseline non-equivalence flagged by its own authors); positive-but-
  correlational in a two-year implementation study that is **author-independent only** — commissioned
  by the Bill & Melinda Gates Foundation, Khan Academy's own major funder, with Khan Academy
  co-selecting sites (F11, per V4b's downgrade, which this pass does not disturb); positive in an n = 3
  single-case experiment whose authors state its nonconcurrent design "is limited in functional control
  due to its inability to identify history and maturation effects" (F12, per V4b's downgrade); and
  **null in the only independent controlled comparison against active, equal-time controls (F13)**.
- **Direction of movement.** Confidence in Khan-Academy-style mastery progression as an *externally
  validated* design moves **down** from where the C4-FP bullet leaves it. Not to zero, and not to
  "refuted" — F13 is one underpowered short study and cannot carry that weight. But the one design
  question closest to what this product must answer — *does mastery-ladder practice beat equal time
  spent on something else?* — has been asked once by an independent team and answered **no detected
  difference**. Every positive independent finding in this dossier compares Khan Academy usage against
  **less of it or none of it**, not against an equal-time alternative. That asymmetry is the finding.

### New coverage gaps surfaced by this pass
- **No adequately powered independent comparison of Khan Academy against an equal-time active control
  exists in anything located by this program.** F13 is the only active-control comparison and it is
  underpowered by a wide margin. This is a genuine absence in the literature, not a search failure of
  this pass, and it is the single most decision-relevant gap remaining on this card.
- **F13 discloses no funding and no competing interests at all** (verified by a full eight-page read).
  Its independence therefore rests on authorship and institution, not on an affirmative declaration.
  Resolving it would require an author query or a funder database, neither attempted here.

### Leads noticed but NOT chased (scope discipline — one-citation budget)
Recorded for the source-lead register, **not** collected, **not** verified, and **not** asserted:
- Böhmer, B., Burns, J., & Crowley, L. (2014). *Testing numeric: Evidence from a randomized controlled trial of a computer based mathematics intervention in Cape Town high schools*. African Education Conference, Addis Ababa. — Cited by F13 (p.72, and reference list p.76) as an RCT in which Khan Academy was part of an after-school supplemental package; F13's authors note the package confounds attribution. Potentially a second controlled comparison; unretrieved.
- Weeraratne & Chin (2018) and Vidergor & Ben-Amram (2020) — carried forward unchanged from V4b, which named them and explicitly did not verify them. Not touched by this pass.

### Standing obligation (C4 only): does the evidence now settle the mastery-model choice?
**No. It does not settle it, and F13 does not move it toward YES — if anything it adds a caution.**
The dossier's existing Sufficiency statement (above) is left unedited and its verdict still holds:
the Elo-vs-IRT/knowledge-tracing question remains a **Product judgement / Assumption** call, not an
Evidence-backed one. F13 is an outcome study, not a measurement-model study; like F10–F12 it says
nothing about how to seed or estimate ability for a solo learner against a fixed item bank, and it does
not evaluate Khan Academy's mastery ladder as a *measurement* instrument at all. Khan Academy's ladder
remains a deterministic percentage-threshold mechanism with no ability estimate (F4–F6), and F13 does
not disturb that. **The one genuinely new signal, and it is a caution rather than a resolution:** F13's
Table 2 shows Khan Academy's own progress metrics (topics mastered *r* = .51, points *r* = .41)
correlating with achievement while the metric least contaminated by prior ability — **minutes spent —
does not** (*r* = .132, *p* = .422), which the authors read as prior ability plausibly "driving these
metrics and test scores" alike. Read across to this product: a mastery-progress signal that correlates
with skill is **not** thereby evidence that the progression caused the skill, and a mastery ladder can
look validated by exactly the correlation that a pure prior-ability confound would also produce. That
is a design warning worth carrying into whatever mastery model is chosen. It narrows nothing about
which model to choose.

### Citations added by this pass: 1 finding (F13), 1 source. Running total: **13 findings / 15 distinct sources** across all three passes.

~~Running total: 13 findings / 9 distinct sources across all three passes.~~ **[CORRECTED IN PLACE by
C4-ED, 2026-07-20, per V4c D5. The "9" was the original F1–F9 source count carried forward as if it were
the running total. Enumerated directly from the dossier:]**

| Pass | Findings | Distinct sources newly cited |
|---|---|---|
| Original (F1–F9) | 9 | **9** — chess.com puzzle-ratings help; chess.com news; chess.com ratings help; KA mastery-levels help; KA course/unit-mastery help; KA mastery-challenges help; NBER w32388; PNAS (+ its correction, counted as one); Sala et al. |
| C4-FP (F10–F12) | 3 | **5** — IES award record; ED583985; ED583986 (F10 cites three); SRI 2014 report; Patil & Juanico |
| C4-RT (F13) | 1 | **1** — Kelly & Rutherford |
| **Total** | **13** | **15** |

**⚠ The dossier now sits at exactly the hard cap of 15 distinct sources.** No further collection is
available on C4 without raising the cap — which is consistent with, and reinforces, V4c's **SUFFICIENT**
verdict and its ruling that *"No new collection is warranted on C4."*
