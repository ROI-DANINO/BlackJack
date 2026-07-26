I have read the complete Phase 3 archive (all 7 files, 2,758 lines) and the bridge spec in full. Findings below.

---

# PHASE 3 ARCHIVE — CITABLE CATALOG AND UNAPPLIED-CORRECTION WORK ITEM

**Paths used throughout (all absolute):**
- `A/` = `/home/roking/Desktop/Projects/blackjack/.claude/worktrees/wl-start-ee6c56/docs/superpowers/research/foundation-audit-p3/`
- `BRIDGE` = `/home/roking/Desktop/Projects/blackjack/.claude/worktrees/wl-start-ee6c56/docs/superpowers/specs/2026-07-22-product-design-inputs.md`

Archive shape: `README.md` (113) · `GAP-SPEC.md` (105) · `collection/C7-probability-ev-variance.md` (1674) · `collection/C7-topup-report.md` (151) · `verification/V-C7.md` (218) · `verification/V-C7-topup.md` (313) · `landing/L-C7.md` (184).

**One-line state of the archive:** two verification records raised **twenty** corrections total. `V-C7`'s ten (C-C7-001…010) **were landed** by `L-C7.md`. `V-C7-topup`'s ten (C-C7T-001…010) **were never applied** — that is the outstanding work item.

---

## 1. The citable catalog — F1–F20

Every finding carries status bucket `Evidence-backed` (the dossier assigned no `Product judgement` / `Assumption` / `Unsupported` labels). The differentiating labels are the **quality tier (Q1–Q6)** and **transfer distance (D1–D4)** against the target "an adult learning a probabilistic decision rule in a card game" (`A/collection/C7-probability-ev-variance.md:67-81`).

**Legend:** ✅ = verified clean · 🔧 = was DEFECTIVE, **correction landed** (safe to cite) · ⛔ = **DEFECTIVE with corrections NOT applied — do not cite as written**

### G1 — Format: natural frequencies

| ID | What it establishes | Label | Source |
|---|---|---|---|
| **F1** ✅ `:89` | Teaching adults to *construct* natural-frequency representations produced Bayesian performance as transferable as rule training and markedly more durable (no decay at 5 or 15 weeks, vs substantial rule-training decay), and a within-study control showed durability came from the *representation*, not the graphical aid. | Evidence-backed · **Q2** · **D3** | Sedlmeier & Gigerenzer (2001), *JEP:General* 130(3), 380–400, DOI 10.1037/0096-3445.130.3.380 — full text |
| **F2** ✅ `:181` | The field's own meta-analysis confirms the format effect but reports *short menu formats* and *visual aids* among the strongest moderators, improving **both** probability and frequency formats — the format effect is real but not the only or largest lever. | Evidence-backed *(abstract-level only)* · **Q1 design / access-limited** · **D3** | McDowell & Jacobs (2017), *Psych Bulletin* 143(12), 1273–1312, PMID 29048176 |
| **F17** ⛔ `:1331` | Even in the format that helps, ~3/4 of participants still fail the Bayesian task, and about half translate natural frequencies *back into probabilities* rather than using them. | Evidence-backed · **Q3** · **D3** | Weber, Binder & Krauss (2018), *Frontiers in Psychology* 9:1833, DOI 10.3389/fpsyg.2018.01833 |

### G2 — Description vs experience

| ID | What it establishes | Label | Source |
|---|---|---|---|
| **F3** ✅ `:225` | Adults who learn probabilities by *sampling* choose as if they **underweight** rare events while those given a stated description **overweight** them; mean absolute difference 36 pp, mechanism traced to small samples (median 15 draws) plus recency. | Evidence-backed · **Q2** · **D2** | Hertwig, Barron, Weber & Erev (2004), *Psych Science* 15(8), 534–539, PMID 15270998 |
| **F4** ✅ `:280` | Meta-analysis of >70,000 choices: the gap is 9.7 pp on one operationalisation and −13.4 on another, ~20 pp for risky-vs-safe choices and **nearly eliminated** when both options are risky; it survives removal of sampling error, and recency depends on learner control of stopping. | Evidence-backed · **Q1** · **D2** | Wulff, Mergenthaler-Canseco & Hertwig (2018), *Psych Bulletin* 144(2), 140–176, PMID 29239630 |

### G3 — Expected-value instruction and transfer

| ID | What it establishes | Label | Source |
|---|---|---|---|
| **F5** ✅ `:346` | **The behavioural null.** 198 university students taught probability theory using gambling examples showed superior odds calculation and fallacy resistance at six months, but **no decrease in actual gambling behaviour**. | Evidence-backed *(abstract-level)* · **Q3** · **D1–D2** | Williams & Connolly (2006), *Psych Addict Behav* 20(1), 62–68, PMID 16536666 |
| **F6** ✅ `:382` | Decision rules *can* be taught briefly (abstract principle + concrete examples), but successfully trained rules were "relatively simple" or "familiar," and the same tradition predicts **Bayes' rule a poor training candidate**; awareness alone is insufficient. | Evidence-backed *(for what the chapter asserts as review)* · **Q5** · **D3** | Larrick (2004), ch.16, *Blackwell Handbook of JDM*, from p. 316 |
| **F15** ✅ `:1108` | A **single ~60-min interactive game** reduced six cognitive biases by medium-to-large amounts persisting 8–12 weeks and beat a passive video on overall bias — but there is **no untrained control arm**, the six biases include none of this project's target concepts, and the **video beat the game on bias *knowledge***. | Evidence-backed · **Q2** · **D3 on content, closest match on *format*** | Morewedge, Yoon, Scopelliti, Symborski, Korris & Kassam (2015), *PIBBS* 2(1), 129–140, DOI 10.1177/2372732215600886 |
| **F16** ⛔ `:1250` | A field study of the *same game* found debiasing transferred to a real, unannounced business decision weeks later (29% less likely to choose the inferior solution) — but assignment was **not randomised**, the study **not preregistered**, and the bias transferred was confirmation bias. | Evidence-backed · **Q3** · **D3** | Sellier, Scopelliti & Morewedge (2019), *Psych Science* 30(9), 1371–1379, DOI 10.1177/0956797619861429 |
| **F20** ✅ `:1518` | Casino blackjack players use a **transparently false heuristic** — assume every upcoming card is a ten — easier to learn than optimal strategy and associated with better expected returns; the author contends inferring EV from subjective probability "may be both uncommon and non-normative" even in blackjack. | Evidence-backed *(abstract-level, for existence)* · **Q4** · **D1 — the only D1 blackjack item in the dossier** | Bennis (2025), *Mind & Society* 24(2), 275–301, DOI 10.1007/s11299-025-00346-9 |

### G4 — Outcome bias / resulting

| ID | What it establishes | Label | Source |
|---|---|---|---|
| **F7** 🔧 `:436` | Founding outcome-bias demonstration: willingness to delegate a decision tracked whether the decider's earlier bet **won or lost** — including where the loser was demonstrably the better decision-maker — and subjects showed the bias while explicitly denying outcome was relevant. | Evidence-backed · **Q2** · ~~D1~~ → **D2** *(re-rated by landed C-C7-005)* | Baron & Hershey (1988), *JPSP* 54(4), 569–579, PMID 3367280 |
| **F8** ✅ `:504` | Pre-registered replication, **N=692**, reproduced outcome bias at a **larger** effect than the original, and the bias persisted **among participants who had themselves stated outcomes should not be considered**. | Evidence-backed · **Q1** · **D3** | Aiyer, Kam, Ng, Young, Shi & Feldman (2023), *IRSP* 36(1), 12 |
| **F14** 🔧 `:539` | Five-experiment paper dedicated to *reducing* outcome bias: raising the salience of intentions **before** outcomes are disclosed helped evaluators overcome the bias; counter to the authors' own prediction, joint evaluation made outcome weighting **worse**. | Evidence-backed *(abstract-level access only)* · **Q2** · **D3** | Sezer, Zhang, Gino & Bazerman (2016), *OBHDP* 137, 13–26 |

> **F14 provenance note (worth a card):** F14 did not exist in the collected dossier. It was **created by the editorial landing pass** (`A/landing/L-C7.md:122-129`) as part of C-C7-010. No verification record covers F14 *as a finding*; `V-C7` verified the abstract via RePEc, and the top-up collector re-confirmed the transcription "character for character" (`A/collection/C7-topup-report.md:20-25`). It is the one finding in the dossier authored by an editor rather than a collector.

### G5 — Misconceptions

| ID | What it establishes | Label | Source |
|---|---|---|---|
| **F9** 🔧 `:635` | Videotaped **real-casino roulette** by 139 patrons betting their own money shows gambler's fallacy *and* hot-hand betting present in the field, with large individual heterogeneity and a positive within-person correlation between the two biases. | Evidence-backed · **Q3** · **D1** | Sundali & Croson (2006), *Judgment and Decision Making* 1(1), 1–12 |
| **F10** ✅ `:687` | Illusion of control: in a **pure-chance card game** adults bet significantly *more* against a nervous-seeming opponent; and **a brief period of practice significantly raised confidence of success on an uncontrollable outcome**. | Evidence-backed · **Q2** · **D1 (Exp. 1)** | Langer (1975), *JPSP* 32(2), 311–328 |
| **F18** ✅ `:1404` | Randomised wait-list-controlled trial of a cognitive treatment whose **first active ingredient is correcting erroneous perceptions of randomness** reported significant change on all outcome measures including *perception of control*, maintained at 6 and 12 months. | Evidence-backed *(abstract-level)* · **Q2** · **D2–D3** | Ladouceur, Sylvain, Boutin, Lachance, Doucet, Leblond & Jacques (2001), *J Nerv Ment Dis* 189(11), 774–780, PMID 11758661 |

### G6 — Simulation and visualisation

| ID | What it establishes | Label | Source |
|---|---|---|---|
| **F11** 🔧 `:755` | A three-cycle classroom programme found simulation software produced **disappointing** conceptual gains; gains appeared only when the activity forced students to **confront their own predictions against the simulated result** — the paper's own conclusion being simulations alone do not guarantee conceptual change. | Evidence-backed · **Q3** · **D3** | delMas, Garfield & Chance (1999), *J Statistics Education* 7(3) |
| **F12** 🔧 `:813` | **Sequentially simulated outcomes** — watching outcomes unfold one at a time — enabled accurate probabilistic inferences on classic problems people fail from equivalent description, and many participants preferred that format (**"kind" environments only**). | Evidence-backed *(abstract-level)* · **Q2** · **D2–D3** | Hogarth & Soyer (2011), *JEP:General* 140(3), 434–463, PMID 21639669 |
| **F13** ✅ `:855` | Adding **animated randomness** to a risk graphic improved alignment between risk estimates and risk perceptions but **reduced** healthy-behaviour intentions — a two-sided result. | Evidence-backed · **Q2** · **D3** | Witteman et al. (2014), *JMIR* 16(3), e80, DOI 10.2196/jmir.2895 |
| **F19** ⛔ `:1456` | 2024 integrative review: simulation benefits are **tentative and confined to "habits of mind"**, with persistent failure on the law of large numbers and the absolute-vs-proportional sample-size misconception. | Evidence-backed · **Q3** · **D3** | Gok & Goldstone (2024), *Cognitive Research: P&I* 9:33, PMC11139845 |

### Findings affected by the UNAPPLIED corrections

| Finding | Corrections outstanding | Direction |
|---|---|---|
| **F15** | C-C7T-001 | **Optimistic** (quality tier overstated) |
| **F16** | C-C7T-002, -003, -004 | **Optimistic** ×2, contract-breach ×1 |
| **F17** | C-C7T-005, -006, -007 | **Pessimistic** — dossier under-claims its own evidence |
| **F19** | C-C7T-008 | **Pessimistic** — gloss over-extends a bounded claim |
| **F20** | C-C7T-010 | **Pessimistic** (incomplete citation; runs in the source's favour) |
| **G5 §** (negative record + sufficiency, not a finding) | C-C7T-009 | **Pessimistic** — absence claim collapsed |
| **F1, F3, F4, F7, F9, F11, F12, F14** | none outstanding — C-C7-001…010 all landed (`A/landing/L-C7.md:51-62`) | clean |
| **F2, F5, F6, F8, F10, F13, F18** | never defective | clean |

---

## 2. ⚠️ MAIN DELIVERABLE — the ten unapplied corrections from `V-C7-topup.md`

Source: `A/verification/V-C7-topup.md:52-63` (table "Corrections raised"). Verifier: Claude Opus 4.8, fresh instance, no Bash. Every replacement string below is quoted by the verifier from a source it opened itself (`:50`).

**Aggregate remedy scope, verbatim (`A/verification/V-C7-topup.md:257-263`):**
> "**`editorial` (no new sources; material already held):** C-C7T-001, -002, -003, -004, -005, -006, -007, -010, and the wording half of -008 and -009. **Ten items, zero retrievals.**"
> "**`collection` (bounded, 4 sources, hard cap 4):** Floyd et al. (2006) and Steenbergh et al. (2004) for G5; Gok et al. (2024) and Zhang et al. (2022) for G6."

**Direction tally:** 4 OPTIMISTIC (dossier overstates: -001, -002, -004; plus the pure contract breach -003), **5 PESSIMISTIC** (dossier understates: -005, -006, -007, -008, -009, -010 — see per-row). Verifier's own summary, `:285-290`:
> "**Claims the collector overstated:** F16's 'graded'; F19's 'the field has no controlled experiments'; F15's 'pre-registered-to-sponsor'; the G5 absence claim"
> "**Claims the collector *under*stated (upgrades):** F17's refusal to state a combined N — the paper prints N = 180; and F17's population caveat, which points in the opposite direction to the one stated."

---

### C-C7T-001 — F15 · OPTIMISTIC · editorial
`A/verification/V-C7-topup.md:54`
- **Targets:** F15, the "Proposed evidence-quality tier" line (`A/collection/C7-probability-ev-variance.md:1111`).
- **What is wrong:** "two pre-registered-to-sponsor longitudinal experiments" overstates. The paper claims only that **sample sizes** were declared in advance; no hypotheses or analysis plan were registered.
- **Verifier's supporting quote (MS p. 14):** "Sample sizes were declared in advance to our government sponsor, and independent third-party analyses of the data were performed that confirmed the accuracy of our results (Kopecky, McKneely, & Bos, 2015)."
- **Exact replacement wording:** *"two longitudinal experiments whose **sample sizes** were declared in advance to the government sponsor — a sample-size declaration, **not** a preregistration of hypotheses or analysis plan"*

### C-C7T-002 — F16 · OPTIMISTIC · editorial
`A/verification/V-C7-topup.md:55`
- **Targets:** F16 headline (`#### F16: …`, `A/collection/C7-probability-ev-variance.md:1250`).
- **What is wrong:** **"graded" is not supported by the paper.** The word does not appear; nothing in Method, Procedure, Results or Discussion states the case was graded or counted toward course marks. **The only grading in the paper is the students' pre-existing GPA, collected as a covariate (p. 1374).**
- **Verifier's supporting quotes (p. 1373):** "Between 6 and 49 days after the start of the gaming sessions, participants individually solved a modified version of the 'Carter Racing' business case in one of their regularly scheduled classes." and "The case was not announced on the syllabi of the courses in which it was administered, the faculty administering the training and case were different, and no other connection was made between the case and the intervention."
- **Exact replacement wording:** strike "graded" — headline to read *"…transferred to a real, unannounced business decision solved in a regularly scheduled class weeks later"*. (*Real* ✓ and *unannounced* ✓ both stand and are independently confirmed.)

### C-C7T-003 — F16 · verbatim-contract breach (neutral meaning) · editorial
`A/verification/V-C7-topup.md:56`
- **Targets:** F16, the "Main result, verbatim (p. 1374)" bullet and the "CRT" quote (p. 1375).
- **What is wrong:** two silent typographic alterations inside passages presented as verbatim.
  - (a) Dossier renders `95% CI [0.33, 0.92]`; the paper prints `95% CI = [0.33, 0.92]`.
  - (b) Dossier renders "…untrained participants (*M* = 2.18, 95% CI = [2.00, 2.36])"; the paper prints "…untrained participants (*M* = 2.18, 95% CI = [2.00, 2.36]; mean difference = 0.26, …" — **the closing parenthesis is the dossier's insertion.**
  - "Neither changes meaning; both breach the verbatim contract, and are the same class as landed C-C7-002 and C-C7-004."
- **Exact replacement wording:** restore `"95% CI = [0.33, 0.92]"`; and mark the second as a truncation, e.g. `"…95% CI = [2.00, 2.36]…"`

### C-C7T-004 — F16 · OPTIMISTIC (by omission) · editorial
`A/verification/V-C7-topup.md:57`
- **Targets:** F16, "Caveats / population / domain limits", final bullet.
- **What is wrong:** the independence conclusion is left for the reader to draw. All ingredients are correctly cited, but **the dossier never states that F16 is not independent corroboration of F15**: Morewedge and Scopelliti author both; F16 evaluates the same proprietary game F15 credits (F15 MS p. 15) to "(produced by Symborski, Barton, Quinn, Morewedge, Kassam, & Korris, 2014)"; and F16's declaration reads (p. 1378): "The author(s) declared that there were no conflicts of interest with respect to the authorship or the publication of this article."
- **Exact replacement wording — add:** *"**Not independent corroboration of F15.** Two of F16's three authors (Morewedge, Scopelliti) are authors of F15, and the evaluated game is the one F15 credits to an author group including Morewedge. F16 declares no conflicts of interest notwithstanding. F16 extends F15's own programme to the field; it does not replicate it from outside."*

### C-C7T-005 — F17 · **PESSIMISTIC — explicit UPGRADE** · MATERIAL · editorial
`A/verification/V-C7-topup.md:58`
- **Targets:** F17, "Sample, verbatim" bullet (`A/collection/C7-probability-ev-variance.md:1365`).
- **What is wrong:** the finding states *"**I do not state a combined participant total: the paper, in what I read, does not print one, and the arithmetic would be mine.**"* — **The paper does print one.** Discussion, first sentence: "In an empirical study with *N* = 180 students from the University of Regensburg, we found that the majority of participants do not actively use natural frequencies in Bayesian reasoning tasks." The reconciliation sits **inside the very sentence the dossier truncated**: "We recruited *N* = 114 students from the University of Regensburg (Bavaria) in summer 2016, and *N* = 69 in winter 2017/2018 (three of which were excluded from the analysis since they had already participated in the study in 2016)." (114 + 69 − 3 = 180.)
- **Exact replacement wording:** restore the truncated clause, and replace the refusal note with — *"**Combined N = 180**, the paper's own printed figure (Discussion, verbatim: 'In an empirical study with *N* = 180 students from the University of Regensburg…'); 114 + 69 − 3 excluded repeat participants. No arithmetic of mine is involved."*
- **Verifier's own direction note, verbatim:** "**Note the direction: this correction is an *upgrade*. The dossier under-claimed.**"

### C-C7T-006 — F17 · **PESSIMISTIC** · MATERIAL · editorial
`A/verification/V-C7-topup.md:59`
- **Targets:** F17, "Discussion, verbatim" bullet (`A/collection/C7-probability-ev-variance.md:1377`).
- **What is wrong:** the quotation presented as verbatim **begins mid-sentence with no ellipsis**, and the elided words are precisely the printed N=180 whose existence C-C7T-005 shows the finding denies.
- **Printed sentence, verbatim:** "In an empirical study with *N* = 180 students from the University of Regensburg, we found that the majority of participants do not actively use natural frequencies in Bayesian reasoning tasks."
- **Exact replacement wording:** quote the sentence from its start, as printed above.

### C-C7T-007 — F17 · **PESSIMISTIC (part b)** · editorial
`A/verification/V-C7-topup.md:60`
- **Targets:** F17, "The mechanism, verbatim" bullet (the 18% clause) **and** the "Caveats" bullet.
- **(a) What is wrong:** the 18% fragment is verbatim but stripped of its conditioning clause and sits adjacent to a 49% quote about the *frequency* condition, where it reads as though it concerns the same condition. Printed: "On the other hand, when they faced a probability version of a task (first and third bars of Figure 2), only 18% across both contexts chose to translate the problem into natural frequencies."
  **Replacement:** restore the leading clause.
- **(b) What is wrong:** the population inference is **substantively warranted** — the paper prints: "Most of these students were enrolled in a teaching math program (*N* = 147), while some of them studied economic information technology, so a certain level of mathematics competency among the participants can be assumed." — **but the clause "than the paper's framing implies" is not**: the paper states the competency assumption openly and further reports: "The *N* = 42 mathematics education students aspiring to teach at the academic school track of the German school system (Gymnasial students) outperformed the other *N* = 138 participants significantly."
  **Exact replacement wording:** drop "than the paper's framing implies" and add the direction the dossier omits — *"the paper states this itself; and because the sample is *more* mathematically schooled than a lay adult, a 36% frequency-format success rate is a **conservative** ceiling for a lay learner, not an inflated one."*

### C-C7T-008 — F19 · **PESSIMISTIC** · MATERIAL · editorial + collection
`A/verification/V-C7-topup.md:61`
- **Targets — four loci that must move together:** F19 headline; "Claimed strength" bullet 2; "Why this is the most useful G6 item"; and the **G6 line of "Sufficiency after the top-up"** (`A/collection/C7-probability-ev-variance.md:1667-1670`).
- **What is upheld:** the quote "Notably, none of the studies included controlled experiments." is **verbatim and real** (section: "Literature search").
- **What is wrong:** its scope is the review's own **inclusion corpus**, and the dossier omits the bounding sentences that immediately follow: "We did not impose any constraints on the inclusion criteria based on the empirical methods the studies used (see Table 1). As a result, 28 studies were either pre-post-test comparisons within a single group or observational qualitative studies that probed students' understanding 4 other studies included an additional no-simulation comparison group. A single study used a quasi-experimental design to compare two simulation activities." Further, **the same review cites two controlled experiments elsewhere in its own text**: "In a recent controlled experiment, we tested the promises of this grounded approach for the design of sampling simulations (Gok et al., 2024)." and "Zhang et al.'s (2022) controlled experiment yielded similar results. Students who watched a hands-on video before using R simulations demonstrated better understanding than those who used R simulations alone."
  The dossier's gloss "**the field's *whole* reviewed evidence base still contains no controlled experiment**" and the sufficiency line "**F19 confirms the field has no controlled experiments**" are therefore **not supported**.
- **Exact replacement wording:** *"none of the studies **in this review's inclusion corpus** was a controlled experiment; 4 of them did include a no-simulation comparison group and 1 used a quasi-experimental design. The review separately cites two controlled experiments outside that corpus (Gok et al., 2024 — by this review's own first author; Zhang et al., 2022), neither of which this dossier has read."*
- **Remedy route:** "**editorial** for the wording; **collection** for Gok et al. (2024) and Zhang et al. (2022) if G6 is to be closed."

### C-C7T-009 — G5 negative record · **PESSIMISTIC** · MATERIAL · collection + editorial
`A/verification/V-C7-topup.md:62`
- **Targets:** Top-up section, "Searched and came up empty in this top-up pass", third bullet (`A/collection/C7-probability-ev-variance.md:1620-1628`); plus the G5 characterisations "thin, clinical, abstract-level" and "essentially unevidenced".
- **What is wrong:** the absence claim "**A randomised trial of *instruction in randomness* aimed at gambler's fallacy or illusion of control in a non-clinical adult population** … was not found" **does not survive.** The verifier opened PubMed **PMID 16536667**: Floyd, K., Whelan, J.P. & Meyers, A.W. (2006), "Use of warning messages to modify gambling beliefs and behavior in a laboratory investigation," *Psychology of Addictive Behaviors* 20(1), 69–74. **"It sits at PMID 16536667 — one greater than F5's PMID 16536666 — in the same journal, same volume, same issue, on the immediately following pages (F5: 20(1), 62–68; this: 20(1), 69–74)."**
- **Exact replacement wording:** "retract the absence claim; add the finding; and correct the G5 characterisation 'thin, clinical, abstract-level' and 'essentially unevidenced', which are no longer true"
- 🚨 **CRITICAL CAVEAT — DO NOT APPLY -009 AS WRITTEN.** The verifier's own characterisation of Floyd et al. was **itself wrong and has since been corrected**. `A/README.md:50-66` and `BRIDGE:33-40, 168-187`:
  > "Both this page and the bridge spec described it as *'a randomised controlled trial of instruction on irrational gambling beliefs, positive on beliefs and play.'* Its actual title is **'Use of warning messages to modify gambling beliefs and behavior in a laboratory investigation.'** It is a lab study of **warning messages during simulated roulette played for imaginary money**: N=120 undergraduates, randomised against an *active* control that received a history-of-roulette lesson (no untrained arm). The treatment **bundles** pre-play education with in-play warning messages, so it cannot separate teaching from cueing-at-the-moment-of-decision." (`A/README.md:51-57`)
  >
  > "**Consequence: it does not overturn §1.7 of the bridge spec.**" (`A/README.md:62`)

  The absence-claim retraction (the editorial half) **is** valid — the study exists. The collection half is **already discharged** for Floyd (record: `journal/raw/_inbox/foundation-audit-p3/C8-floyd-2006.md`), abstract-only. **Steenbergh et al. (2004)** remains un-retrieved. The residual task, verbatim (`A/README.md:64-66`): "full text via institutional access to recover the operational definition of 'less risky gambling behavior' — the one unknown that could still move the verdict."

### C-C7T-010 — F20 · **PESSIMISTIC (runs in the source's favour)** · editorial
`A/verification/V-C7-topup.md:63`
- **Targets:** F20, the "Source" line and "Caveats".
- **What is wrong:** "Completeness, and it runs in the source's **favour**. The dossier gives no volume/pages and no funding or competing-interests check for the dossier's only D1 blackjack item."
- **Exact replacement wording:** cite as *"*Mind & Society*, 24(2), 275–301"*; author affiliation *"Faculty of Business Administration, Prague University of Economics and Business"*; and add — *"**Independence checked:** funding, verbatim: 'The research was supported by a Fulbright-Hays Doctoral Dissertation Research Abroad Fellowship and a Social Science Research Council International Dissertation Field Research Fellowship.' Competing interests, verbatim: 'The author declares no conflict of interest.' No gambling-industry, casino or vendor funding. Data availability is limited, verbatim: 'Field observation and interview data are unavailable to protect participant anonymity. Survey data is available upon reasonable request from the author.'"*

---

### Card-ready summary of the work item

| ID | Finding | Route | Direction | Retrieval needed? |
|---|---|---|---|---|
| C-C7T-001 | F15 tier line | editorial | optimistic | no |
| C-C7T-002 | F16 headline | editorial | optimistic | no |
| C-C7T-003 | F16 quotes | editorial | neutral (contract) | no |
| C-C7T-004 | F16 caveats | editorial | optimistic (omission) | no |
| C-C7T-005 | F17 sample | editorial | **pessimistic (upgrade)** | no |
| C-C7T-006 | F17 discussion quote | editorial | **pessimistic** | no |
| C-C7T-007 | F17 mechanism + caveats | editorial | **pessimistic (b)** | no |
| C-C7T-008 | F19 scope gloss + G6 sufficiency | editorial + collection | **pessimistic** | Gok 2024, Zhang 2022 |
| C-C7T-009 | G5 absence claim | editorial + collection | **pessimistic** | Floyd ✅ done; Steenbergh 2004 open. **Re-word from corrected README, not from -009 verbatim** |
| C-C7T-010 | F20 source line | editorial | **pessimistic** | no |

---

## 3. Gap spec G1–G6 — question and final status

Questions verbatim from `A/GAP-SPEC.md:49-66`. Final status from `A/README.md:74` and `BRIDGE:41`, which agree: **"G1 closed · G2 closed · G3 evidenced absence (do not re-collect) · G4, G5, G6 open."**

| G | Question asked | Final status | What is still unknown (open only) |
|---|---|---|---|
| **G1 — Format** | "Does presenting chance information as **natural frequencies** rather than probabilities or percentages measurably improve lay reasoning, and under what conditions does the advantage hold or disappear?" | **CLOSED** (`V-C7-topup:225` "CLOSE — SUFFICIENT") | — *(one residual **conflict**, not a gap: F1 says the graphical aid is not decisive, F2's abstract says visual aids are among the strongest moderators; unresolvable without McDowell & Jacobs full text — `V-C7:143`, `C7:891-894`)* |
| **G2 — Description vs experience** | "How does learning a probability by **experiencing outcomes** … differ from learning it from a **stated description**? … Include rare-event behaviour." | **CLOSED** (`V-C7:180` "SUFFICIENT — agree"; the one question both verifiers rate sufficient) | — |
| **G3 — Expected value** | "Is there evidence that instruction in expected-value reasoning **transfers** to actual choices, or does it remain inert knowledge? What instructional forms have been tested?" | **EVIDENCED ABSENCE — do not re-collect** | Verifier judgement, `V-C7-topup:227`: "**OPEN, and I judge it *not closable by further collection***… **My own independent search reproduces the absence.** … sending a collector after it again is likely to burn a pass for nothing" |
| **G4 — Outcome bias / resulting** | "What is known about teaching people to **evaluate decision quality independently of outcome**, and about correcting outcome bias? Any evidence that it can be trained at all, and any evidence it cannot, is equally wanted." | **OPEN** | **Whether outcome-bias separation can be taught at all.** F15's six trained biases exclude outcome bias (independently confirmed). Sezer et al. (2016) is **abstract-level only** — unknown: N, materials, effect sizes, whether Experiment 4's effect persisted. Full text blocked (ScienceDirect paywall, hbs.edu 403, ting-zhang.com SSL). One un-retrieved lead: **Fasolo, Heard & Scopelliti (2025), *Journal of Management*** — "the obvious place a counter-example would be enumerated and was not consulted" (`V-C7-topup:159`). |
| **G5 — Misconceptions** | "Gambler's fallacy, hot-hand, law of small numbers, illusion of control: what is established about their prevalence and about whether instruction corrects them — including **negative results**." | **OPEN** | **Prevalence is settled; correction is not.** Unknown: whether instruction in randomness changes *play* in non-clinical adults. F18 is a clinical treatment *package* that cannot isolate the randomness-correction component. Floyd et al. (2006) is now retrieved but **abstract-only**, bundles teaching with in-play cueing, imaginary money, single session, no follow-up — the unknown that could move it is the **operational definition of "less risky gambling behavior"** (`A/README.md:64-66`). **Steenbergh et al. (2004), *International Gambling Studies* 4(1), 3–16, N=101 — reached at search level only, never opened.** |
| **G6 — Simulation and visualisation** | "Evidence on interactive simulations, sampling visualisations, and repeated-play tools for building variance and risk intuition. What works, what is merely popular." | **OPEN** | The "what is merely popular" half is answered (F11, F19). The "what works" half is not. **Two named controlled experiments have never been read: Gok, Nesbitt, Shipley & Goldstone (2024)** and **Zhang et al. (2022)** — "the two controlled experiments are the actual G6 evidence" (`V-C7-topup:230`). Also unresolved: no meta-analysis exists on the target question (independently confirmed negative, `V-C7:184`). |

---

## 4. ⚠️ MAIN DELIVERABLE — `2026-07-22-product-design-inputs.md` in full

**Document authority (`BRIDGE:3-13`):** "Phase 4 designs the curriculum, the skill graph, and the activity catalog *from this document*, without reopening Phases 1–3." It folds seven charter deliverables into one — Evidence Summary, Research Synthesis, Project Implications, Gap Map, Assumption Register, Decision Candidates — a "deliberate, user-approved deviation." What it is **not**: "Not a curriculum, not an activity design, not a sequence. Every line below is a *constraint on* or *input to* design."

**The tag rule (`BRIDGE:43-45`), verbatim:**
> "anything below marked `[VERIFIED]` was independently checked against the opened source. Anything marked `[UNVERIFIED]` or `[DEFECTIVE-SOURCE]` must not be leaned on without reopening the source first. **Do not inherit — that is this program's founding error class.**"

Note: **no line in the document carries `[UNVERIFIED]`.** The tag vocabulary is declared but only two of three values are used.

### §1 — Confirmed learning principles (eight, all tagged)

| § | Principle | Tag | Backing finding | Design consequence, verbatim |
|---|---|---|---|---|
| **1.1** `:53` | **Interleaving is the practice structure.** Interleaved practice on different kinds of problems beat blocked 72% vs 38% (d=1.05); mechanism = improves **discrimination between kinds of problems** and strengthens kind→strategy association. Stated caveat: "grade-7 mathematics, n=140. Adult blackjack transfer is untested." | **`[VERIFIED]`** | Phase 1 (Rohrer/Taylor line, not C7) | "**Blocked practice removes the discrimination step entirely:** inside a block labelled 'hard totals,' classification is free." |
| **1.2** `:65` | **Experience and description teach different things.** Sampling → *underweight* rare events; description → *overweight*. Robust across >70,000 choices; ~20-pt gap for risky-vs-safe, nearly vanishing when both options are risky. | **`[VERIFIED]`** | F3, F4 | "**This product teaches primarily by dealing hands — i.e. by experience.** … A trainer that only deals hands will produce players who under-respect the tail." |
| **1.3** `:75` | **Outcome bias is large, robust, and survives knowing about it.** Pre-registered, N=692, reproduced at a *larger* effect, still present among participants who had themselves said outcomes should not be considered. | **`[VERIFIED]`** | F8 | "**Telling learners 'judge the decision, not the result' will not be sufficient.** They will agree with you and keep doing it." |
| **1.4** `:83` | **Simulation alone does not produce understanding.** Three-cycle classroom programme: simulation software produced *disappointing* conceptual gains; gains appeared only when the activity forced students to **confront their own prediction against the simulated result**. | **`[DEFECTIVE-SOURCE — see §0]`** | F11 (delMas) | "**a 'watch 10,000 hands play out' visualisation will not teach variance.** A predict-then-reveal-then-reconcile loop might. Predict first, then show." |
| **1.5** `:92` | **Practice raises confidence even when the outcome is uncontrollable.** Brief practice significantly raised confidence on an uninfluenceable outcome; in a pure-chance card game adults bet more against a nervous-seeming opponent. | **`[VERIFIED]`** | F10 (Langer) | "**This is a hazard specific to what you are building.** … Confidence gain is not a proxy for learning and must never be used as one." |
| **1.6** `:101` | **Frequency formats help, with a firm ceiling.** Natural frequencies beat probabilities — but roughly **three quarters still fail**, and ~half quietly translate frequencies back into probabilities. "In a sample *more* schooled than your users." | **`[DEFECTIVE-SOURCE — see §0]`** | F17 (Weber) | "**Use frequency framing; do not expect it to carry the concept on its own.**" |
| **1.7** `:108` | **Teaching the maths does not by itself change play.** 198 students taught probability with gambling examples: superior odds calculation and fallacy resistance at six months, **no change in actual gambling behaviour**. | **`[VERIFIED]`** | F5 | "**The single most important line in this document for scoping.** … **Measure play, not quiz scores.**" |
| **1.8** `:117` | **Blackjack players use a false heuristic that outperforms nothing-at-all.** Casino players assume the next card is a ten — far easier to learn than optimal strategy, associated with better expected returns than unaided play; EV inference from subjective probability may be "both uncommon and non-normative." | **`[VERIFIED]`** | F20 (Bennis) | "**Take the pedagogical point seriously:** a cheap wrong model that improves play may beat a correct model nobody internalises. That is a genuine design option, not a concession." |

> **Tag-integrity flags for the owner (two, both cheap to resolve):**
> 1. **§1.4's `[DEFECTIVE-SOURCE]` tag looks stale.** Its source is F11 (delMas), whose defect was **C-C7-007 — and that correction WAS landed** (`A/landing/L-C7.md:59, 93-103`). The genuinely-unrepaired simulation defect is **F19/C-C7T-008**, which §1.4 does not cite. Either the tag is over-conservative or it is pointing at the wrong finding.
> 2. **§2.3 has silently absorbed C-C7T-002 while the dossier has not.** `BRIDGE:155` says "a real, unannounced decision" — the word "graded" is already gone, i.e. the bridge is *ahead of* the dossier. `BRIDGE:160` also already carries C-C7T-004's independence point ("The follow-up shares authors with the original and evaluates the same game"). Any landing pass should reconcile the two documents, not just edit the dossier.

### §2 — Unresolved product assumptions (five)

| § | Assumption | Status | The load-bearing statement |
|---|---|---|---|
| **2.1** `:132` | Whether **outcome-bias separation can be taught at all** | **OPEN, and it is load-bearing** | "`product-vision.md:74-75` commits this product to feedback that 'judges the quality of a decision against the active ruleset-matched strategy, never the hand result,' and it is implemented (`controller.ts:210,217`). The commitment is almost certainly right. **There is no evidence in this project's possession that a learner can be trained to internalise it.**" One paper (Sezer) resisted retrieval "through four separate barriers"; at abstract level, raising salience of *intentions before outcomes are disclosed* helped — "a sequencing idea Phase 4 may use as a **hypothesis, not as a finding**." **Route: playtest, not more research.** |
| **2.2** `:145` | Whether **EV instruction transfers to choices** | **EVIDENCED ABSENCE** | "Not 'we didn't look.' Two independent agents, multiple query routes and hosts, found **no study** measuring whether expected-value instruction improves in-game decisions. The nearest handbook review suggests simple, familiar rules train well and predicts Bayes-like rules to be **poor** training candidates. **Do not schedule further collection on this.** Treat it as settled-empty and design around it." |
| **2.3** `:153` | Whether a **debiasing *game*** works for this product's concepts | **OPEN** | Encouraging for the *format*. "Three cautions, all verified: the design has **no untrained control arm** (game vs video only); the **video beat the game** on bias *knowledge*; and **none of the six biases trained is outcome bias or EV reasoning.**" → "**Read it as: interactive format is a reasonable bet. Not as: this proves your game teaches.**" |
| **2.4** `:164` | Correcting **gambler's fallacy / hot-hand / illusion of control** | **OPEN** | "Prevalence is strongly established, including in the field (real casino patrons, own money). Correction is thinly evidenced." |
| **2.5** `:168` | **Randomness instruction** | **OPEN** — "(the missing source has been opened; it does not close it)" | **Corrected 2026-07-23.** "This section previously said Floyd et al. (2006) was an RCT positive on beliefs *and* play, and that it 'may well cut the other way.' **Both claims were wrong**, and neither came from the paper." Actual: simulated roulette, imaginary money, N=120, active control, education **bundled** with in-play warnings, in-session endpoint, no follow-up, abstract-only (nine retrieval routes failed). **"Ruling: §1.7 stands."** Reopening condition: full text via institutional access to recover the operational definition of "less risky gambling behavior." |

### §3 — Mastery and progression constraints (`BRIDGE:191-210`)

**What exists today (verified against shipped code):**
- Mastery is one line (`web/src/learn/controller.ts:361`): every required check answered correctly once, ever. "No repetition, no decay, no spacing, no assisted-vs-independent distinction."
- `validate.ts:65-66` rejects any required check that is not a `question` step → "**100% of shipped mastery evidence is declarative multiple-choice. A played hand can never satisfy completion.**"
- Completion **gates nothing** (`Learn.tsx:4`).
- The durable-progress schema has **zero product consumers** — imported only by a QA harness.

**The three constraints, numbered as in the document:**
1. `:204` — "**A mastery model that cannot ingest played-hand evidence is disqualified.** §1.7 says measure play, not quiz scores; the current shape structurally cannot."
2. `:206` — The richer documented model (`learning-mastery-and-scoring.md`) is banner-marked "parked for V2+" and its "stated ladder, hint ladder, spacing model and error-severity tiers are `Relabel`led as **product judgement, not evidence-backed**. Phase 4 may adopt them — as design choices, not as research conclusions."
3. `:210` — "**Confidence must not be a mastery signal** (§1.5)."

### §4 — Activity-evidence requirements (six) (`BRIDGE:212-232`)

> Framing: "What an activity must produce for it to count as evidence of learning."

1. `:216` **Every activity declares which capability it measures**, "and the measurement must be of *decision behaviour*, not recognition, wherever the capability is a decision (§1.7)."
2. `:218` **Practice pools are mixed by default** (§1.1 + the CFL-007 ruling in §7). "A blocked pool is permitted only for first exposure to a category, and must be declared as such."
3. `:220` **Classification must be a required step** wherever the real task requires it. "If an activity tells the learner 'this is a soft total,' it is not measuring the skill."
4. `:223` **Predict-then-reveal for any distributional concept** (§1.4). "A simulation that does not first capture a prediction is decoration."
5. `:225` **Assistance must be recorded honestly.** "Phase 2 found the code labelling a bare retry as `'instruction'` when no instruction is delivered, and the mislabel propagating into a test that calls it 'a hinted attempt.' Any assistance level an activity records must correspond to assistance the learner actually received."
6. `:230` **Rare-event exposure must be deliberate** (§1.2). "Experience-only learners underweight the tail; if the tail matters, the curriculum has to engineer encounters with it rather than wait for the shoe."

### §5 — AI-authority boundaries (five) (`BRIDGE:234-250`)

1. `:238` "**Blackjack rules, legality, totals, dealer play, and outcomes are engine-owned.** The learn layer never regrades them. This is implemented and was verified in Phase 2; keep it."
2. `:241` "**Basic-strategy correctness is a deterministic oracle**, not a model judgement."
3. `:243` "**A model may not be the authority on whether a learner has mastered something.** Mastery is computed from recorded evidence."
4. `:245` "**An agent's endorsement is not evidence.** Phase 2 found a design justifying four choices because a subagent 'endorsed them architecturally.' Phase 4 must not repeat it: a code-check an agent performed is `OBSERVED`; an agent's opinion is not warrant."
5. `:248` "Numeric thresholds and retention intervals are **not** 'research-calibrated' — the project's own baseline states optimal intervals cannot be copied into product configuration. Any constant Phase 4 picks is a product judgement until calibrated against this product's own data."

### §7 — Decision candidates: one made, four open (`BRIDGE:268-294`)

**CFL-007 — RESOLVED 2026-07-22 (user decision)**
- *Conflict:* `2026-07-10-v2-learning-foundations-roadmap-design.md:56-57` sequences Basic Strategy mastery as "hard totals, hard doubles, soft totals, pairs/splits, **then** mixed review" — blocked practice with mixing last. The project's own held evidence points the other way (§1.1).
- *Resolution, verbatim:* "**block to introduce, interleave to practise.** A category may be introduced in isolation so the concept lands. Once introduced, **all practice and review draws from a mixed pool**, and the learner must classify the hand before choosing an action. **Mixed review is not a final stage; it is the steady state.**"
- *Why not full interleaving from lesson one:* "the interleaving result is grade-7 mathematics, n=140, and transfer to adult blackjack is untested… a learner meeting a soft 17 before knowing what 'soft' means is simply confused. Recorded as `P-3` in §6 — if playtests show learners handle full mixing, widen it."
- *Action for Phase 4:* "revise `:56-57` to state the introduce-blocked / practise-mixed rule explicitly."

**Open decision candidates (four), verbatim `BRIDGE:289-294`:**
- "Whether the curriculum teaches EV explicitly at all, given §2.2 and §1.8."
- "Whether to adopt a deliberately simplified heuristic as a scaffold (§1.8) or teach correct strategy from the start."
- "What replaces multiple-choice as mastery evidence (§3)."
- "Whether rare-event exposure is engineered or organic (§4.6)."

### §8 — Accessibility constraints (`BRIDGE:298-307`)
- Phase 2 correction applied: "the reduced-motion requirement rests on **WCAG 2.2 SC 2.3.3, which is Level AAA**, and was presented alongside AA and A criteria with no level stated. Phase 4 must **state a target conformance level** before treating that requirement set as one normative baseline. Reflow (1.4.10) and Text Spacing (1.4.12) are AA; Timing Adjustable (2.2.1) is A."
- "The activity baseline's accessibility evidence is an honestly-recorded **coverage gap**, not a body of findings. Treat it as product judgement."

### §9 — What Phase 4 owns (`BRIDGE:311-316`)
"The skill graph and prerequisites; learning outcomes for rules, hand reading, strategy, probability, EV and variance; the activity taxonomy; which activity measures which capability; per-activity evidence and mastery rules; session composition; interaction UX; and the first vertical slice to build. **None of that is decided here.**"

---

## 5. The playtest questions P-1 … P-5

Source table: `BRIDGE:258-264`. Framing: "These are settled as *unanswerable from literature*. Route them to the Phase 5 slice."

| # | Question (verbatim) | Document's "why playtest" (verbatim) | What a playtest must measure |
|---|---|---|---|
| **P-1** | "Can learners be trained to evaluate their decisions independently of the hand result?" | "§2.1 — the one dedicated intervention is abstract-only; the commitment is already shipped. Measure it in-product." | Learner *judgements of decision quality* on hands where **decision quality and hand outcome are deliberately decoupled** — correct play that lost, incorrect play that won. Track whether the gap between "was this the right play?" and "did it win?" narrows with exposure. §1.3 warns self-report of endorsing the principle is worthless as a measure (N=692 endorsers still showed the bias), so the instrument must be behavioural, not attitudinal. |
| **P-2** | "Does EV instruction change play?" | "§2.2 — evidenced absence. No further collection authorised." | Play-decision accuracy in an EV-instructed arm vs a non-EV arm, measured on **hands played, not quiz items** (§1.7, §4.1). Must be a *behavioural* endpoint — F5's whole lesson is that knowledge gain and behaviour change dissociate. |
| **P-3** | "Does mixed practice help *this* audience, or overwhelm beginners?" | "§1.1's transfer to adult blackjack is untested. The CFL-007 ruling (§7) is a bet; instrument it." | Compare introduce-blocked/practise-mixed against fuller interleaving on **classification accuracy** (which is the mechanism §1.1 names) plus beginner drop-off/frustration. Also needs a retention arm — blocked practice typically wins in-session and loses on delay. |
| **P-4** | "Does a false-but-cheap heuristic (§1.8) beat correct strategy for novices in practice?" | "Directly testable, and cheap." | Novices taught the assume-a-ten heuristic vs novices taught correct basic strategy, compared on **realised expected value of actual play** at matched training time — not on strategy-chart recall. Time-to-competence is the second axis (the heuristic's claimed advantage is learnability). |
| **P-5** | "Does confidence rise faster than skill?" | "§1.5 says it will. Track both; if they diverge, the product is producing false confidence." | **Paired longitudinal series**: self-rated confidence and measured decision accuracy on the *same* sessions. The measurement is the divergence between the two curves, not either alone. §1.5's hazard is that practice on an uncontrollable outcome inflates confidence regardless of skill. |

---

## 6. What this corpus says the project must NOT do — every prohibition, quoted

### Product / design prohibitions (bridge spec)

| Prohibition | Location |
|---|---|
| "**A mastery model that cannot ingest played-hand evidence is disqualified.**" | `BRIDGE:204` |
| "**Confidence must not be a mastery signal**" / "Confidence gain is not a proxy for learning and **must never be used as one**." | `BRIDGE:210`, `:99` |
| "**A model may not be the authority on whether a learner has mastered something.** Mastery is computed from recorded evidence." | `BRIDGE:243` |
| "**An agent's endorsement is not evidence.** … Phase 4 **must not repeat it**: a code-check an agent performed is `OBSERVED`; an agent's opinion is not warrant." | `BRIDGE:245-247` |
| "Numeric thresholds and retention intervals are **not** 'research-calibrated'… Any constant Phase 4 picks is a product judgement until calibrated against this product's own data." | `BRIDGE:248-250` |
| "**Telling learners 'judge the decision, not the result' will not be sufficient.** They will agree with you and keep doing it." | `BRIDGE:80-81` |
| "**a 'watch 10,000 hands play out' visualisation will not teach variance.**" / "A simulation that does not first capture a prediction is **decoration**." | `BRIDGE:89`, `:224` |
| "**Use frequency framing; do not expect it to carry the concept on its own.**" | `BRIDGE:106` |
| "**Measure play, not quiz scores.**" | `BRIDGE:114` |
| "If an activity tells the learner 'this is a soft total,' **it is not measuring the skill**." | `BRIDGE:221` |
| "**Any assistance level an activity records must correspond to assistance the learner actually received.**" | `BRIDGE:228` |
| "Phase 4 must design *knowing they are open*, and **must not write them up as evidence-backed**." | `BRIDGE:129-130` |
| "Anything marked `[UNVERIFIED]` or `[DEFECTIVE-SOURCE]` **must not be leaned on without reopening the source first. Do not inherit** — that is this program's founding error class." | `BRIDGE:44-45` |
| "**Do not schedule further collection on this.** Treat it as settled-empty and design around it." (EV transfer) | `BRIDGE:151` |
| "**Read it as: interactive format is a reasonable bet. Not as: this proves your game teaches.**" | `BRIDGE:162` |
| "Phase 4 must **state a target conformance level** before treating that requirement set as one normative baseline." | `BRIDGE:303-304` |
| Phase 4 may use the intention-salience sequencing idea "**as a hypothesis, not as a finding**." | `BRIDGE:141` |
| The parked mastery model's ladder/hints/spacing/error tiers: "Phase 4 may adopt them — **as design choices, not as research conclusions**." | `BRIDGE:208-209` |

### Citation / evidence-handling prohibitions (archive)

| Prohibition | Location |
|---|---|
| "**F2 must not be used to state a pooled effect size or a percentage.**" | `A/collection/C7-probability-ev-variance.md:209` |
| F13's two-sided result "**must not be reported one-sidedly**." | `A/collection/C7-probability-ev-variance.md:885` |
| On F20: "**Nothing here may be cited as a number.**" | `A/collection/C7-probability-ev-variance.md:1567` |
| On F15: reading it "as evidence about teaching probability or EV **would be exactly the CFL-007 error the brief forbids**." | `A/collection/C7-probability-ev-variance.md:1120-1121` |
| "**F15 cannot be cited as showing that training beats no training.**" | `A/collection/C7-topup-report.md:75-76` |
| "**it would be an error to let F15's presence in the dossier imply otherwise**" (that G4/outcome bias is addressed). | `A/collection/C7-probability-ev-variance.md:1619` |
| F3's resolved transcription flag "is **resolved and must not be re-opened or acted on** by any downstream [reader]." | `A/collection/C7-probability-ev-variance.md:267` |
| "landing these nine corrections **must not be read as having done so**" (closing the sufficiency gap). | `A/landing/L-C7.md:184` |
| "G3 **evidenced absence** (do not re-collect)" | `A/README.md:74` |
| G3: "sending a collector after it again is likely to **burn a pass for nothing**." | `A/verification/V-C7-topup.md:227` |
| "Do **not** reopen G1, G2, G3 or C1–C6. Do **not** chase the Fasolo/Sezer G4 items in the same pass — G4 is a standing hole, not a closable one, and **mixing it in will blow the bound**." | `A/verification/V-C7-topup.md:261-263` |
| Brief: C1–C6 "are closed and **must not be reopened, re-verified, or re-collected**." · "Answer these; **do not widen**." · "**Do not manufacture a finding to avoid an empty section.**" · "A laboratory finding on undergraduates with word lists is not a finding about adults learning blackjack, and **must not be written as one**." · "`CFL-007` exists because a grade-7 mathematics result sits against a blackjack roadmap; **do not create a second one silently**." · "**No design.**" | `A/GAP-SPEC.md:8, 47, 81-82, 85-86, 89, 90-91` |
| Evidence contract: "**Open every source you cite.** No claim may rest on a search-result snippet, an abstract summary produced by a tool, or another document's description of a source. **If you could not open it, you did not read it.**" · "**Quote verbatim, mark every alteration.** No silent ellipsis. No added emphasis. No paraphrase inside quotation marks." · "Do **not** substitute a different source and present it as the one you meant to read." | `A/GAP-SPEC.md:72-79` |
| On the retrieved Floyd study: "**It does not overturn §1.7.**" / "A one-session lab result on play money does not refute a six-month real-behaviour null." | `A/README.md:62`, `BRIDGE:181-182` |

---

## Three things worth a card beyond what was asked

1. **The ten unapplied corrections are net-pessimism-correcting.** Five run pessimistic vs four optimistic, and `V-C7`'s Axis-2 already named the pattern (`A/verification/V-C7.md:190`): "**the dossier is systematically pessimistic on trainability, and that pessimism is an artefact of where its search stopped, not of the literature.**" Landing them makes the evidence base *more* permissive, not less.

2. **C-C7T-009 must not be applied verbatim.** Its Floyd characterisation was itself an un-opened inherited citation and has been corrected in `A/README.md:50-66` — the README calls this "the *third* absence-or-characterisation claim in this program to collapse on independent re-checking" and "a citation inherited twice." The retraction of the absence claim is valid; the finding text must be written from the corrected record, not from the correction.

3. **Byte-level integrity of F1–F14 is NOT established** (`A/verification/V-C7-topup.md:193-196`): "I have no Bash and therefore no git diff… I **cannot** certify that no character in F1–F14 changed." A `git log`/`git diff` on `C7-probability-ev-variance.md` would close that at zero cost, since the repo is under version control — the one verification gap in this archive that a shell can settle outright.