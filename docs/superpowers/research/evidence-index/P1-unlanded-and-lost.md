I've read all 27 verification records, 14 remediation reports, both registers, both manifests, PROCESS-AUDIT, the templates, and the gate summary — and spot-checked disputed claims against the dossier text. Here is what was lost.

---

# 0. The headline, stated first

**The gate summary's central approval claim is false, and it is false in exactly the way the program said it had cured.**

`P1-gate-summary.md:411` — *"**Every Phase 1 correction landed and marked**, on all six cards."*
`P1-gate-summary.md:130` — *"**All are now landed**, marked with dated pass attributions…"*

I verified this against the promoted dossier text. **At least fourteen Phase-1 verifier corrections across three cards never landed and are still not in the archive.** The remediation landed the *second* generation of corrections (V1d, V2b/V2c, V3b/V3c, V4b/V4c, V6/V6b) and left the *first* generation (V1, V1c, V4, V5) exactly where it found them.

**C1 — five never landed.** `remediation/C1-editorial-report.md:72` states the reason plainly:

> `| **F1–F21** | Outside V1d's scope (it verified F22–F27). **Not examined by this pass and not altered.** |`

No other pass touched F1–F21 (C1-W was append-only, C1-ED2 was two hygiene fixes, C1-R2 appended F22–F27). Still live in `dossiers/C1-knowledge-tracing.md`:
- **V1-C5 / V1c-E — the Knewton vendor disclosure.** `grep -c Knewton` = **0**. V1c-E:  *"Three of four authors are **Knewton, Inc.** employees, and one of the three datasets is Knewton's own proprietary data… a synthesis that stacks F9 and F12 as two independent sources would be double-counting one vendor."* The dossier nowhere says so.
- **V1-C6 — Pelánek §3.1's measured "just 10 answers per student… (correlation 0.8 with the ground truth)."** `grep -c "10 answers per student"` = **0**. V1 called it *"directly on the load-bearing Q4 and the dossier does not cite it"* — and it cuts **toward** feasibility.
- **V1c-B — F16's headline.** `C1-knowledge-tracing.md:350` still reads *"…from background covariates (age, gender, learning disability, past trajectory)… in both a simulation study and an illustration on real platform data"* — the exact two overstatements V1c-B ruled unsupported by the only text anyone could access.
- **V1c-C — F21a Q2→Q4.** Line 404 still reads *"Q2 for Schroeders & Gnambs."*
- **V1c-D — F21b's edition.** Line 405 still cites *"Linacre, J.M. (1994)… Rasch Measurement Transactions, 7(4), 328"*, which V1c-D ruled *"must not be cited as a 1994 source."*

**C4 — five never landed, and two verifiers used them as a deliberate "tripwire" without ever asking who would fix them.** `verification/W5-C4-ED-final.md:132-138`:

> *"the four pre-existing F1–F9 defects that a silent repair would have removed are **all still present verbatim** after C4-ED"*

Confirmed live: F1's paraphrase under "exact quotes" (l.90), F5's wrong supporting location (l.128), F7's placeholder title `[Title on effects of Khan Academy usage on math performance]` (l.148), F9's wrong author list `Sala, G., **Foley, J.P.**, & Gobet, F.` (l.168). Plus two substantive downgrades that never landed anywhere:
- **F6 (l.133)** still asserts *"Mastery Challenges are **the one** documented mechanism by which mastery can be lost."* V4 ruled that *"false against three pages read for this card"* — quizzes, unit tests and course challenges also demote. `grep "unit tests and course challenges"` = **0**.
- **F7 (l.143)** still reads *"gains of 0.12–0.22 SD among elementary classrooms **using Khan Academy** at high intensity."* V4: the 0.22 is a **middle-school** result from a different experiment (elementary is 0.12–0.17), and *"what was randomized is the **KWiK ('Khoaching with Khan Academy') teacher-coaching program**, not Khan Academy usage."* `grep "KWiK"` = 0. `grep "0.12–0.17"` = 0.

**C5 — V5's corrections never landed, and a verifier certified their absence as compliance.** `verification/V5c-anki-spaced-repetition-remediated.md:202-204`:

> *"**All 21 checked strings** — spanning F1, F2, F3, F4, F7, F8, F9, F12, F13, F14, F15 … are present, verbatim, unaltered. Nothing prior was edited, moved, or softened."*

That was written as proof of append-only discipline. It is simultaneously proof that V5's corrections never landed. `dossiers/C5-anki-spaced-repetition.md:108` still headlines **F4** as *"Interleaved/**spaced** practice on a rule-application task"* — the exact framing V5 overturned:

> `verification/V5-anki-spaced-repetition.md:38` — *"The paper's actual design is the opposite… '**the degree of spacing was fixed**'… **Spacing was deliberately removed as a variable.** Downgraded claim, re-verified: *interleaving — not spacing — roughly doubled accuracy on a rule-application task*."*

`grep "degree of spacing was fixed|interleaving per se"` in the C5 dossier = **0**. This matters more than the others: **F4 is the closest thing in the whole program to evidence about a blackjack-shaped decision rule**, and the dossier still labels it spacing evidence when it is interleaving evidence.

The program's own diagnosis (`PROCESS-AUDIT.md:69-71`) — *"No pass was ever chartered to write them into the dossiers, and none did"* — **still applies to C1's F1–F21, C4's F1–F9, and C5's F1–F15.** Nobody re-ran the correction-marker census after remediation.

---

# 1. Overruled, rejected, and contradicted — and where each ruling stopped

| # | Claim made | Who ruled against it | The ruling | Reached the gate summary? |
|---|---|---|---|---|
| 1 | C1-R2: *"The universal claim in the original Sufficiency Statement **is falsified as written**"* (`C1-collection-report.md:62`) | V1d | **"NO. The claim is NOT falsified."** The 0.3 default *"is an **empirically established population average**"* by F24's own Methods (`V1d:216-236`) | ✅ Yes — §6 item 3, correctly and prominently |
| 2 | C2-EC2: V2c misquoted *"its next nearest neighbor"* | W3 | **FAIL.** *"This is false. V2c was right. I confirmed it on three independent routes"* (`W3:116-137`) | ✅ Yes — §11 |
| 3 | V4b: the SRI quotation *"is not in the report"* | W5 | **Reversed.** *"That statement is false. The sentence is in the report, verbatim, on **folio p.37**"* (`W5:91-96`) | ✅ Yes — §11 |
| 4 | C3-EC: F7 contains a "stitched fragment" defect | V3c (C-1) | **"Verified false."** *"That exact sentence occurs **once**, at offset 33493 — inside the body section… **the same section, ~1,000 characters after**"* (`V3c:290-300`) | ⚠️ Partially — §4 says *"a manufactured 'stitched fragment' defect was **struck**"* with no explanation of what it was |
| 5 | C1-W: Pelánek's nearest referent in F28 is *proportion correct* | W2 | **"That identification is wrong."** The nearer referent is the **Elo arm**; *"C1-W understated its own case"* (`W2:169-186`) | ✅ Yes — §8, §11 |
| 6 | C2-FP: *"a significant NEGATIVE effect for low achievers, g = −.42"* | V2b | **Materially downgraded.** *"k is **2**, not 3"*; *"essentially one quasi-experiment"*; random-effects CI *"−.23 [−1.08, .63]"* crosses zero. *"That is a real signal… and **is not** 'ITS harm low achievers'"* (`V2b:43`) | ❌ **NO.** §4 mentions only *"Plano's −0.66 is a Grubbs-winsorized substitute for −1.57."* The **k=2**, the null-under-random-effects, and *"the only true experimental study in its own subgroup is essentially null"* never reach the gate summary at all |
| 7 | C2-EC: report type *"should be added and carries **more**"* weight | V2c (R1) | **Qualified.** Table 3: *"not significant under either specification in the adjusted analysis, and the peer-reviewed fixed-effect point estimate **reverses sign to −.04**"* (`V2c:400-431`) | ✅ Yes — §4, §7 item 2 |
| 8 | C2-FP: F15's fMRI study is Anderson et al.'s own work, evidencing declarative→procedural timing | V2b | **Downgraded on both axes.** *"They are **Qin et al. (2003)**"*; and *"'**Base-level learning is the sole factor producing the speed up**'… This is therefore **not** a measurement of the declarative→procedural transition"* (`V2b:44`) | ❌ **NO.** Neither the provenance error nor the mechanism reversal appears in the gate summary. §4's C2 paragraph omits both |
| 9 | C2-FP retraction: *"**Two** direct empirical tests"* of ACT-R's mechanism exist | V2b | **"Accurate count: **one**"** (`V2b:86-92`). *"That is enough to retract 'no such literature exists'; it is **not** enough to support a product decision that assumes a known proceduralization timeline"* | ❌ **NO** |
| 10 | C2 collector: F5, the power law is *"ACT theory's own headline behavioral signature"* | V2 | **Framing inverted.** The unelided sentence: *"and by its **surface contradiction to ACT's** multiple stage, multiple mechanism view"* — Anderson introduces it as *"a problem his theory must explain away"* (`V2:189-202`) | ⚠️ Only obliquely — conflict #12 in the register; never in the gate summary |
| 11 | C4-FP: the three new sources are *"genuinely independent of Khan Academy"* | V4b | **Downgraded.** F11 is *"**author-independent only** — it was commissioned by Khan Academy's own major funder and Khan Academy collaborated on its site selection"* (`V4b:45,53-54`) | ✅ Yes — §4 |
| 12 | C4-FP: F12's Q2 warrant rests on multiple-baseline confound control | V4b | **Struck.** The authors say their **nonconcurrent** design *"is limited in functional control due to its inability to identify history and maturation effects"* (`V4b:35`) | ⚠️ §4 mentions the strike but not the authors' own words, and not their call for concurrent designs *"before attributing change to Khan Academy"* |
| 13 | C6 collector: 44%/16% rests on *"three independently-worded secondary summaries"* | V6 | **Dropped.** *"That is one source and its echo, not convergence"* — a single 2013 *Psychology Today* blog plus an uncited echo (`V6:17`) | ✅ Yes — §4, §7 item 5 |
| 14 | C6-FP: F8 — 3 of 4 won money *"in an **actual** casino"* | V6b | **Downgraded.** *"neither source states"* it; F7 says **mock casino** (`V6b` summary) | ✅ Yes — §4 |
| 15 | C6-FP: the changing-speed criterion was *"explicitly designed to approximate realistic table pace"* | V6b | **Struck** as *"unsupported at abstract level with the full text unread"*; also *"zero baseline accuracy" overstates* (`V6b`) | ⚠️ §4 mentions "realistic table pace struck" but not the second half, and not that Q2's gap is *"NARROWED, not cleanly refuted"* (`W6:50`) |
| 16 | C3-FP: F11's missing per-tier *k* is retrievable via Fig. S1 / Open Data | V3b | **"It is not."** Predictability is a **continuous meta-regression moderator**; *"the per-tier k is **genuinely unavailable, not merely unlocated**"* (`V3b:74-104`) | ✅ Yes — §4, §7 item 3 |
| 17 | C3 collector: F9's *"Table 3's full sensitivity grid ranges from 36.0% to 87.1%"* | V3b | **Downgraded.** True range is **32.1%–87.1%** across three panels; and the 61%-vs-49% comparison *"spans two different panels"* (`V3b:141`) | ❌ **NO.** §4 gives only "61% … at 0.80 the same data yields 49%" — the panel mismatch and the wider grid are gone |
| 18 | C2 collector: Ma Table 1 small-group g = .10 (random effects) | V2 | **Corrected to .05** — *"read **.10 out of the fixed-effect column**"* (`V2:41`) | ❌ **NO** |
| 19 | C2 collector: Anderson's *"three-stage account"* | V2 | **Downgraded.** Anderson's abstract says *"**two major stages**"*; three stages is **Fitts (1964)** (`V2:42`) | ❌ **NO** |
| 20 | C4 collector: F6 uniqueness; F7 effect range/treatment; F9 authorship; F7 title; F5 location | V4 | All corrected | ❌ **NO — and never applied to the dossier either** (see §0) |

**Twelve rulings never reached the document the owner read.** Six of them (#6, #8, #9, #17, #18, #20) also never reached the dossier.

---

# 2. Corrections raised and never applied

| Correction | Raised by | Landing record? | State |
|---|---|---|---|
| F9/F12 Knewton vendor disclosure + don't-double-count | V1-C5, V1c-E | none | **OUTSTANDING** — 0 mentions in dossier |
| Pelánek §3.1 "~10 answers per student, r≈0.8" | V1-C6 | none | **OUTSTANDING** — pro-feasibility datum still unrecorded |
| F16 headline: covariate list + "both simulation and real-data" | V1c-B | none | **OUTSTANDING** — verbatim unchanged at l.350 |
| F21a tier Q2 → Q4 | V1c-C | none | **OUTSTANDING** |
| F21b edition: not a 1994 source | V1c-D | none | **OUTSTANDING** |
| F13's KDD degenerate-difficulty finding "should be pulled forward" | V1c-F | partial | Present in dossier but only as F13's own caveat |
| Ma Table 1 column error (.10 → .05) | V2 | C2-EC | ✅ landed (V2c verified) |
| Anderson "two major stages"; F5 ellipsis; F1 tier Q4→Q5; F7 "nearly all" | V2 | C2-EC | ✅ landed |
| F12 k=2 / random-effects CIs / constituent studies | V2b | C2-EC | ✅ landed |
| F15 provenance + mechanism; retraction "two"→"one" | V2b | C2-EC | ✅ landed |
| R1 report-type non-replication (Table 3) | V2c | C2-EC2, W3 verified 4/4 sites | ✅ landed |
| R2 Grubbs winsorization | V2c | C2-EC2 | ✅ landed |
| R4 — Ritter publisher error in C2-EC's report | V2c | **deliberately NOT applied** | Annotated only; W3 endorsed |
| W3-4 — R1 quote drops "overall" | W3 | none | **OUTSTANDING, sub-threshold** |
| F2/F11 de-minimis quote deviations | V2c | none | **OUTSTANDING, sub-threshold** |
| F3 corrigendum figures; F7 killed sub-claim; F11 method; Coverage-gap #1 | V3b | C3-EC/C3-EC2, W4 verified | ✅ landed |
| F9 Table 3 range 36.0% → 32.1% | V3b | C3-EC2 | ✅ landed in dossier, ❌ never in gate summary |
| C-1..C-5 (incl. the manufactured "stitched fragment") | V3c | C3-EC2, W4 verified | ✅ landed |
| Register row #15 author order | W4 | orchestrator | ✅ landed |
| F1/F5/F6/F7/F9 corrections | V4 | **none** | **OUTSTANDING × 5** |
| F11 independence; F12 tier warrant; coverage-gap restatement; F10 g-attribution | V4b/V4c | C4-ED, W5 verified | ✅ landed |
| W5-1 SRI quote reversal; W5-2 folio p.iv | W5 | C4-ED-2, W8 verified | ✅ landed |
| D1 false back-page claim in `C4-collection-report.md` | V4c | **annotated, not fixed** | Notice appended at l.162-182 |
| F13 personalisation/temporal-distribution confound | V5b | **none** | **OUTSTANDING** |
| F4 spacing→interleaving downgrade; F3 directional overstatement | V5 | **none** | **OUTSTANDING** |
| F14/F15 tier-label-in-bucket-field taxonomy defect | V5b | none | **OUTSTANDING** — l.491, l.529 still read "Q3 observational" in the bucket field |
| F1–F6 corrections (F1 locator, F2 drop/re-bucket, F3 one-tailed, F4 hedges, F5, F6) | V6 | C6-EC, W6 verified 21/21 | ✅ landed |
| F7/F8/F9 corrections | V6b | C6-EC | ✅ landed |
| Conflict register #27 amendment | V2c | orchestrator | ✅ landed (register l.27, reconciliation note l.37-48) |
| V4b's own error record (origin of W5-1) | W5/W8 | **left unamended by ruling** | Verification records immutable |

**Still outstanding: nine substantive, plus three sub-threshold.** None is disclosed in `P1-gate-summary.md`.

---

# 3. Agent scoping decisions that discarded information *(primary deliverable)*

Format: **what was dropped · who decided · was it ratified by the owner?**

### 3.1 Hard caps that stopped collection

**C4 is at the 15-source hard cap and cannot collect again.** `V4c:520-522`:
> *"on a distinct-source count the dossier now sits at exactly 15, i.e. **at the stated hard cap**… no further collection on C4 is available without raising the cap."*

`W5:180-186` adds a caveat the owner never saw:
> *"'Exactly 15' depends on two declared conventions: PNAS + its correction counted as one source (two DOIs), and Khan Academy's own blog post… not counted… **a stricter count would put it at 16–17.**"*

**Dropped:** Böhmer, Burns & Crowley (2014), a Cape Town RCT (lead #35). Decided by C4-RT under a one-citation budget. **Agent decision, not ratified.**

**C5 hit the ceiling and a verifier declared the card unfixable under it.** `V5b:289-295`:
> *"The dossier is at **15/15, the program's hard ceiling**… **This pass cannot be run under current rules.** The remaining insufficiency is therefore not a defect the collector can repair — it is the ceiling binding against the topic's real evidence surface… **Whether to lift the ceiling, reopen the card, or accept the dossier as-is with this gap documented is a program decision, not mine.**"*

Amendment 5 was subsequently invoked and the gap closed. But `V5b:202-211` records the intermediate state that the owner never saw: the contextual-interference pair *"was located, registered as rows #24/#25, and then not collected **because the ceiling was spent**"* — a located, live, directly-relevant dispute dropped by a budget rule, not a judgement.

**C2 was capped at 15 and its remedy had to be argued as zero-cost to be allowed.** `V2b:232-235`:
> *"If a governance rule requires the fifth-through-Nth item to be counted as citations… **The 15-citation ceiling is not what stands in the way here** — which is worth saying explicitly, because the card anticipated that it might be."*

**C1 blew past the cap without a ruling.** `V1c:287-289`:
> *"**The 21-citation overrun.** Recorded as a process matter per my card; **not mine to resolve.**"*
Nobody resolved it. C1 finished at 29 findings / 27 sources under amendment 5.

**C1-W was bounded to one source and dropped six leads inside it.** `C1-wauters-collection-report.md:225-241` — Impara & Plake (1998), Chalifour & Powers (1989), Hambleton/Bastari/Xing (1998), Johns/Mahadevan/Woolf (2006), Wauters et al. (2010 JCAL), Brinkhuis & Maris (2010). **Agent decision under an orchestrator-set budget.** Lead #40 is described in the register as *"**Highest-value lead in this group: C1 F28 explicitly contradicts it.**"* The owner sees a one-line parenthetical at gate summary §7 item 6: *"(Registered as conflict-adjacent: only one side has been read — lead #40.)"*

**C1-R2 dropped seven leads.** `C1-collection-report.md:85-90` — *"Leads NOT chased (scope discipline)"*: EDM 2025 cold-start, Yudelson et al. (2013), van Rijn et al. (2009), Wauters et al. (2012), Pelánek (2014), arXiv:2504.08804, arXiv:2602.06631. **Agent decision.** Two of these (Pelánek 2014, Wauters 2012) are *"F27's two uncollected primaries"* — the reason F27 sits at Q4.

**C5-REM dropped four live-dispute leads.** `V5c:362-364`: *"The collector candidly flagged four uncollected CI leads, **including one it says is 'arguably nearer sub-Q4 than either collected CI paper'**"* — the *Frontiers in Psychology* (2024) CI **transfer** meta-analysis, lead #39. **Agent decision, ratified by another agent (V5c), never by the owner.**

### 3.2 Questions declared closed / "do not re-collect"

**The single most consequential closure.** `V1d:309-314`:
> *"### Record as a COVERAGE GAP — do not re-run*
> *Two gaps have now survived three collection passes plus this verifier's independent searching: **(a) no evaluation on a small, fixed, expert-authored item bank**, and **(b) no strategy-game, card-game or gambling-adjacent domain evidence.** These should be recorded as **settled coverage gaps**… **Further passes against them should be refused.**"*

C1-EC then wrote into the dossier: *"**Further passes against either must be REFUSED**"* (`C1-editorial-report.md:55`). **A verifier agent created a standing prohibition on future research into the two questions closest to this product's actual domain.** The owner's approval note ratifies C1's INSUFFICIENT verdict as an honest coverage gap that *"must not trigger further collection"* — but the owner ratified a *verdict*, and what he got was **a permanent search ban authored by an agent**, which then survived a partial falsification:

`C1-wauters-collection-report.md:139-142` — C1-W found *incidental relief on gap (a)*:
> *"A 25-item fixed, expert-authored, single-skill drill bank rated by subject experts is **the closest structural match to this product's situation anywhere in the C1 dossier**… **This does not justify re-opening the settled gap**"*

The agent found evidence against its own closure and declined to reopen it. W2 endorsed (`W2:239-243`). The gate summary reports only: *"Two gaps are now ruled SETTLED — do not re-run"* (§5). **The partial falsification is invisible.**

**"Do not re-attempt F29's body."** `source-lead-register.md:58` (row #51) and `C1-wauters-collection-report.md:174`: *"Resolving it needs F29's body, which is UNVERIFIABLE. **Do not re-run collection for it.**"* Nine routes logged; W2 re-ran four and found a tenth (ERIC EJ955402) that yields only the abstract. **Reasonable, but it is an agent-issued permanent stop.**

**Keren & Wagenaar's primary text quarantined.** `V6:84` — *"Explicitly **out of scope**: … any further attempt at Keren & Wagenaar's primary text (quarantined)."* The 44%/16% split — the only per-decision error-magnitude figure the program ever had — dies here. `V6:33` on what remains open: *"Anyone retrieving the primary text should determine (i) whether these figures are in it at all, and (ii) **the denominator that makes 44+16 sum to 60% rather than 100%**."*

**Conflict #10 declared non-arbitrable.** `V5c:229-256` — F18 *"cannot be"* the modern arbiter of the spacing-vs-complexity dispute, on three verified grounds. **This is good work, but it means the dossier's most load-bearing caution (F3) still rests on a 1999 meta-analysis a verifier had already downgraded, and no arbiter exists.**

### 3.3 Deferrals to a later phase or another card

| Deferred | To where | Who decided | Ratified? |
|---|---|---|---|
| Retrieval-practice / testing-effect tradition — *"a blackjack basic-strategy trainer is, in structure, a retrieval-practice drill"* (`V2c:536`) | *"a **synthesis-time check with a named owner**"* (`V2c:548`) | V2, V2b, V2c — three agents in a row | ❌ No owner was ever named. **This is a live, unassigned, program-level gap that the gate summary never mentions.** |
| Meinz et al. (2011) Texas Hold'Em poker — *"**the nearest structural neighbour to blackjack anyone in this literature has studied**"* (register #34) | *"**Belongs to a domain-transfer card, not to C3**"* | V3b, endorsed V3c/W4 | ❌ No domain-transfer card exists |
| Kahneman & Klein (2009) — *"whether skill is learnable at all in low-validity, stochastic environments"* (register #30) | domain-transfer card | V3b | ❌ Same |
| Evans et al. (2018) curve-shape update | *"leave as a declared lead; **do not invoke amendment 5 for it**"* (`V2c:530`) | V2c | ❌ Agent-only |
| Restricted agent types (`audit-collector`/`audit-editor`/`audit-verifier`) | Phase 2 | orchestrator | ✅ Disclosed in §10 |
| Contextual-interference transfer meta-analysis (#39) | *"a **future card's trigger**, not a defect in this one"* (`V5c:381`) | V5c | ❌ No such card |

### 3.4 Refused / exhausted searches

- **WebSearch budget exhausted in five separate verification sessions** — V2b, V4b, V5b, V3b, V6b all fell back to bibliographic APIs. `V4b:22-23`: *"this session's **WebSearch budget was exhausted** before my sufficiency sweep… **a narrower instrument than free search**, declared here so the weight of my SUFFICIENT/INSUFFICIENT call can be judged accordingly."* **The gate summary reports none of this.**
- `V6b` states the limit most sharply: *"with WebSearch unavailable I could not search **grey literature** — ABAI conference programmes, ProQuest, or Google Scholar — **which is precisely where source-lead row 26 says a future pass should look**."*
- **V2c declined to re-run a coverage sweep and inherited another agent's negative result.** `V2c:576-578`: *"**Stated as a limitation:** a fresh independent coverage sweep was not part of this dispatch and **my SUFFICIENT verdict inherits V2b's negative search result on Q1/Q2 rather than reproducing it.**"* C2 is one of the five cards marked SUFFICIENT.
- **C4-ED issued zero retrievals.** `PROCESS-AUDIT.md:117-122` — *"issued **no WebFetch at all**… That made it *structurally incapable* of catching a prior verifier's misquote — it could only propagate one. **And it did.**"*
- **F25's body: blocked at three routes** (Wiley pdfdirect 403, Wiley am-pdf 403, research.rug.nl 403). *"The test–retest reliability figures remain unobtained"* — meaning the "rate of forgetting is a stable individual trait" claim, C1's whole population-light story, **has no reliability coefficient anywhere in the archive.**
- **F7/F9 (C6): six routes including a real JS-capable headless browser, all 403.** `V6b:114-119`. The full text of the *only* blackjack training study in existence is unread by anyone in this program.

### 3.5 Structural information loss nobody flagged

**`V2b:260-265` — the C2 dossier does not read even-handedly in document order:**
> *"F12 points back to F1–F3 ('in direct tension with…'), **but F1–F3 carry no forward pointer to F12–F15**… A reader working top-down meets the optimistic picture first with no signal that it is contested."*

(Later fixed for C2. **The same structural asymmetry was never checked on C1, C3, C4, C5 or C6.**)

**`V2:182-184` — the Q4 retrieval-practice gap was scoped out on an *assumption*:**
> *"it is adjacent, and C3 (deliberate practice) and C5 (spaced repetition) **plausibly already cover that ground.** Check those two dossiers before spending any budget on it."*
That check was never performed. V2c re-raised it eight passes later and re-deferred it.

---

# 4. The two registers, in full *(primary deliverable)*

### 4a. Register accounting errors first

- **Source-lead register: 47 rows, max ID #51.** The register's own reconciliation note (`conflict-register.md:64-65`) says *"46 rows (max ID #50)"* — **wrong on both counts**, stale by one row (#51, added by W2). `P1-gate-summary.md:270` repeats *"46 rows (max #50)"*; `P1-gate-summary.md:414` says *"47 source-lead rows."* **The gate summary contradicts itself in the same document.**
- **Four source-lead IDs are missing and unexplained: #16, #17, #18, #19.** No record anywhere in the corpus references them.
- **Six conflict IDs are missing and unexplained: #20, #21, #22, #23, #24, #25.** No record references them.
- **`P1-gate-summary.md:279` conflates the two registers.** In the paragraph about conflicts it says *"Rows **#24/#25** author misattributions corrected. Rows **#31/#32** resolved."* Those are **source-lead** rows (Czyż/Ammar; Latimier/Carpenter). Conflict rows #24/#25 do not exist. `INTEGRITY-MANIFEST-post.md:153` attributes them correctly. **A reader of the gate summary alone will look for six conflict rows that were never written.**
- Both registers do satisfy the "no duplicate IDs" claim.

---

### 4b. CONFLICT REGISTER — all 25 rows

| # | Conflict | Status | Bears on |
|---|---|---|---|
| **1** | Size/generality of DKT's advantage over BKT/PFA. Piech 2015 (AUC .85 vs .68) vs Gervet 2020 (logistic leads on small data) | **open** — *"Gervet is the more independent source and directly relevant, since **this product's data will be small**"* | Mastery-model choice |
| **2** | Which Assistments baseline Piech's "25% gain" is measured against — **inconsistency inside one paper**. Prose treats 0.69 as prior best; Table 1 caption defines BKT\*=0.75 | **open** — against the paper's own table the gain is **≈15%, not 25%** | Any use of the DKT margin |
| **3** | Variance explained by deliberate practice — turns entirely on which definition is the inclusion filter. Macnamara 2014 (26% games) vs Ericsson & Harwell 2019 (29% raw / 61% corrected) | **open** — *"the size of the effect swings by more than 2× … **not on new data**"* | Any "deliberate practice" mechanism claim |
| **4** | Does EKT 1993's violin finding replicate? Original "complete correspondence" vs Macnamara & Maitra 2019 pre-registered replication (best M=8224 vs good M=9844, p=0.364) | **open, leaning non-replication** — *"the majority of 'best' violinists had accumulated **less** practice"* | Any 10,000-hour / catch-up-impossible claim |
| **5** | FSRS's 99.6% superiority over SM-2, from the source that says no fair comparison is possible | **open** — internal tension in one self-published source | Adopting FSRS-style scheduling |
| **6** | Learning-curve shape: power law (Newell & Rosenbloom) vs exponential (Heathcote — *"exponential fit better in EVERY unaveraged dataset"*) vs piecewise power law (Donner & Hardy) | **open, three-way** — *"none of the surveyed datasets are accuracy-based discrete-choice tasks like a basic-strategy decision"* | Practice-scheduling design assuming a curve shape |
| **7** | Does DKT retain *any* advantage over well-specified shallow models? Piech/Gervet vs Khajah 2016 ("indistinguishable") + Wilson 2016 ("consistently matched or outperformed") | **open** — *"strengthens the case for the simplest adequate model in a low-data setting"* | Mastery-model choice |
| **8** | BKT fitted-parameter pathology: genuine non-identifiability (Beck & Chang) vs "semantic model degeneracy" from misspecification (Doroudi & Brunskill) | **open** — both agree the symptom is real and **not fixed by more data** | Solo-learner parameter estimation |
| **9** | Magnitude of passive-error dominance: Carlin & Robinson 80%/20% (n=423) vs Keren & Wagenaar 44%/16% (sums to 60%) | **open** (superseded by #16) | Curriculum weighting of which errors matter |
| **10** | How far spacing generalises: Cepeda 2006 (259/271 comparisons, but **verbal-only** criterion) vs Donovan & Radosevich 1999 (simple motor d=0.97 → **complex d=0.11 and 0.07**) | **open** — V5c ruled F18 **cannot arbitrate it** | Whether Anki-style scheduling is trustworthy for decision-rule drilling |
| **11** | Do ITS gains hold under independent at-scale evaluation? Kulik 0.66 SD / Ma g=.41 / VanLehn d=0.76 vs Steenbergen-Hu g=.01–.09 and **−0.18 for low achievers**; Pane RCT null year 1 | **open** — *"every independent/at-scale result sits far below the aggregate meta-analytic headline"* | Any "adaptive trainer reliably produces moderate-to-large gains" claim |
| **12** | What Anderson (1982) actually claims about the power law — corrects #6's evidentiary basis, which rests on an elided quote | **resolved-as-correction** — the unelided sentence says *"**surface contradiction to ACT's** multiple stage… view"* | Reduces the force of #6's stated stake |
| **13** | Which Macnamara 2014 domain figures are the real result — published vs the authors' 2018 corrigendum (games 26%→**24%**, r .35→**.38**, variance 12%→**14%**) | **resolved — corrigendum supersedes** | Any citation of "games 26%" |
| **14** | Is Ericsson & Harwell's 61% a legitimate correction or an overcorrection? E&H (rxx=0.60 → 61%) vs Hambrick/Macnamara/Oswald 2020 (*"they overcorrected"*; at 0.80 → **49%**) | **open** — *"**Whoever picks the lower reliability gets the bigger number**, and neither side's headline is invariant to that choice"* | Any product claim leaning on 61% |
| **15** | Are C5's two closest-to-a-decision-rule sources evidence about **spacing** at all, or about **interleaving**? Taylor & Rohrer held spacing *constant by design*; Kornell & Bjork confound the two | **open** — *"**Neither cleanly evidences *spacing* on a rule-application task**"*; *"the mechanism actually evidenced for situation→action rule learning is **interleaving/discriminability**… a different product lever from interval scheduling"* | **The most product-consequential row in the register** |
| **16** | Is #9 a genuine conflict at all? Keren & Wagenaar's figures traced to **one blog post + an uncited echo**; *Washington Post* corroboration returned 403 | **resolved-as-dissolved** — *"Side B has no verified provenance, so there is nothing for Side A to conflict with"* | Curriculum weighting; direction survives, magnitude does not |
| **17** | Does trained blackjack skill transfer out of the lab? Speelman 2015 pro-transfer (n=4, mock casino) vs Anderson & Brown 1984 anti-transfer (*"doubt on laboratory gambling as a valid analogue"*) | **open** — *"entirely absent from the C6 dossier"*; **neither full text has been read** | Whether a trainer should validate against lab-style scoring at all |
| **18** | Does the 2018 corrigendum also revise the **predictability moderator**? Q(1) 20.49→**11.32**, low-predictability **4%→6%** | **resolved — corrigendum supersedes** | Any blackjack transfer claim built on the predictability moderator |
| **19** | Full collection of the "ITS attenuate at scale" conflict; supersedes #11 with directly-read sources | **open, now backed by full collection** — *"even Pane's Year-2 'significant' result is rated an **indeterminate effect** by the independent government reviewer once multiple comparisons are corrected"* | Same as #11 |
| **26** | Refines #17/#25 with exact abstract text for both sides; full texts of both remain unreachable | **open — not resolved by this pass, per instruction** | Lab-vs-casino validation weight |
| **27** | **[AMENDED]** Selection conflict *inside one source*: C2-FP headlined the moderator clearing only fixed effects and passed over `Report type`, which clears both — but report type **does not replicate under adjustment** (Table 3, peer-reviewed estimate reversing to −.04) | **open, and asymmetric** — *"Resolvable with **zero new citations**"*. Records the recurrence: *"Same defect, one pass apart, in opposite directions"* | How much any published edtech effect size should be discounted |
| **28** | Did "3 of 4 won money" happen in a **mock** casino (JABA abstract) or a **casino setting / naturalistic setting** (dissertation)? | **open** — unresolvable at abstract level; both full texts unreachable | *"**The** load-bearing question for how much the money-winning result can carry in a training product"* |
| **29** | Can a learner's initial parameter be predicted from pre-assessable individual differences? Park 2019 (positive, **abstract-scope**) vs Sense/Meijer/van Rijn 2018 (**null, full text**, n=66) | **open, and asymmetric in access** — *"**both sides sit inside the Groningen/SlimStampen cluster**"* | Whether any pre-learning covariate is worth collecting at start-up |
| **30** | Does contextual interference improve retention? Czyż 2024 pro (SMD 0.63/0.71, 54 studies) vs Ammar 2024 critical (**only 37 of 183 outcomes, 20%, agreed**) | **open — but they partly converge** — F16's own **applied subgroup is non-significant (SMD 0.23, p=0.24)**. *"**Neither side is citable without the other.**"* Four further items deliberately uncollected | Any interleaving/practice-scheduling design |
| **31** | **[DOWNGRADED by W2, in the collector's favour]** Does Pelánek actually attribute assumption-free baselines to Wauters? "moving average"/"exponential" **programmatically absent** from Wauters' full text | **open** — *"F27's direction survives… its attribution precision does not"*; W2 found the nearer referent is the **Elo arm**, so *"C1-W understated its own case"* | How much weight F27 carries for "population-light difficulty estimation is a real tradition" |

---

### 4c. SOURCE-LEAD REGISTER — all 47 rows *(the owner has never seen this)*

**C1 — knowledge tracing (10 rows)**

| # | Source | Why not pursued | What it would support |
|---|---|---|---|
| **7** | Sense, Behrens, Meijer & van Rijn (2016) *rate of forgetting is stable*; + van Rijn et al. (2009) SlimStampen | *"Not attempted by any pass — surfaced by V1c"* | Directly tests C1's strongest sentence. **"Note the shape of the miss: the C1 focused pass collected F17 from *this same research group*, but took their 140,000-learner population study rather than the population-free per-learner estimator that is the system's defining mechanism."** This was V1b's gap **M3**, which the bounded fix's three bundles never covered |
| **8** | (a) arXiv:2605.16991 response-free difficulty; (b) arXiv:2605.18562 LLMs-as-experts; (c) **van der Velde et al. (2021) CBB 4:231–249** | *"Not attempted by any pass"*; (c) was **"named by title in V1b's Bundle B brief and still not collected"** | *"The literal question Bundle B was assigned and did not answer: **can item difficulty be obtained with no response population, and how much accuracy is lost?**"* Could move C1's Q4 from **Assumption → Evidence-backed** |
| **9** | Yudelson, Koedinger & Gordon (2013) Individualized BKT | *"named in V1b as a landmark and listed as **optional** in Bundle C; not collected"* | *"The closest thing in the BKT family to a solo-learner story"* |
| **40** | **Impara & Plake (1998)**, *JEM* 35(1), 69–81 | Over-budget overflow — C1-W bounded to one source | **"Highest-value lead in this group: C1 F28 explicitly contradicts it."** F28 found absolute-percentage judgement (r=.80) **outperformed** rank-ordering (.56/.62). *"A genuine conflict is asserted but only one side has been read"* |
| **41** | Chalifour & Powers (1989) | Over-budget overflow | Expert item-difficulty judgement accuracy — same tradition as #40 |
| **42** | Hambleton, Bastari & Xing (1998) | Over-budget overflow | Expert/judgmental difficulty estimation methodology |
| **43** | Johns, Mahadevan & Woolf (2006) | Over-budget overflow. **Second-hand figure only** (r=0.68 via F28) | Another zero/low-response difficulty-estimation datapoint. *"**Do not quote r=0.68 as verified**"* |
| **44** | Wauters, Desmet & Van den Noortgate (2010), *JCAL* 26(6) | Over-budget overflow | Relevant to the **degenerate-difficulty** problem (items attempted by ~1 learner → 1.0/0.0) |
| **45** | Brinkhuis & Maris (2010) | Over-budget overflow | Adaptive item calibration; **adjacent to the education-Elo item-as-opponent line** |
| **46** | EDM 2025, *Evolutionary Features for Mitigating Cold Starts in Logistic KT* | Over-budget overflow — C1-R2 bounded | *"**Note the recurring trap: most 'cold-start' work addresses a *new learner against an existing population*, not zero-population item calibration.** Check which before collecting"* |
| **47** | Yudelson, Koedinger & Gordon (2013) *(duplicate of #9)* | Over-budget overflow | How little data per-learner estimation needs |
| **48** | van Rijn, van Maanen & van Woudenberg (2009) | Over-budget overflow. **Groningen/SlimStampen lineage** | *"Would **not** add independent corroboration; treat as the same source of evidence"* |
| **49** | Pelánek (2014) | Over-budget overflow. **"One of F27's two uncollected primaries"** | *"F27 sits at **Q4 partly because these are uncollected**"* |
| **50** | arXiv:2504.08804 · arXiv:2602.06631 | Over-budget overflow. Preprints | Adjacent KT leads, unassessed |
| **51** | ERIC EJ955402 (Wauters 2012 abstract) | Route note. Surfaced by W2 | Two-host convergence on the abstract. **"Do not re-attempt F29's body"** |

**C2 — ITS / ACT-R (3 rows)**

| # | Source | Why not pursued | What it would support |
|---|---|---|---|
| **6** | VanLehn (2011), *Educational Psychologist* 46(4) | **Paywall, confirmed by V2 independently** (T&F 403, ASU page, S2 mirror 202/empty, no OA mirror) | *"Needed for anything resting on the paper's **methods, inclusion criteria, moderator analyses, or confidence intervals**"* — none of which the slide deck exposes |
| **28** | Pane, Griffin, McCaffrey & Karam (2014), *EEPA* 36(2) | **Paywall confirmed closed, re-tested by V2b** (Unpaywall zero OA locations; S2 CLOSED) | *"The claim is **NOT blocked**"* — supported two routes. What the primary alone would add: multiple-comparisons handling, and **the middle-school analysis (5,519 students / 74 schools), which WWC *excluded* for failing baseline equivalence — *excluded*, not *found null*"** |
| **29** | **Qin et al. (2003), *PNAS* 100, 4951–4956** | **Paywall.** *"Located by V2b via Crossref… **not attempted by the collector, which did not identify it as the primary at all**"* | **"The true primary behind C2 dossier F15's headline evidence."** The 5-day fMRI study, the 650→334 ms speedup and the caudate signature are *this* study's results. Would settle the participant count (F(1,7) implies n≈8) and *"whether Qin et al. themselves attribute the speedup to base-level declarative learning — the point on which F15's declarative→procedural framing turns"* |

**C3 — deliberate practice (4 rows)**

| # | Source | Why not pursued | What it would support |
|---|---|---|---|
| **14** | **[RESOLVED — consumed as C3 F8]** Hambrick et al. (2014), *Intelligence* 45, 112–114 | Surfaced by V3; not collected as a full citation | The direct published reply to F5 |
| **15** | **[RESOLVED — consumed as C3 F9; AUTHOR ORDER CORRECTED]** Hambrick, Macnamara & Oswald (2020) | Surfaced by V3 | The reply to the 61% figure. *"**stop the chain here — do NOT also collect Ericsson's 2021 counter-reply**… which is the next ring out"* |
| **30** | **Kahneman & Klein (2009), *American Psychologist* 64(6)** | *"Not attempted by any C3 pass — named by V3b… **Squarely outside C3's stated bound**; explicitly NOT a basis for an INSUFFICIENT verdict"* | **"The landmark statement… of whether skill is learnable at all in low-validity, stochastic environments, and under what conditions (regularity of the environment + opportunity to learn it through feedback). This is the tradition that speaks most directly to the product question C3's F11 predictability moderator only gestures at."** Routed to a domain-transfer card **that does not exist** |
| **33** | **VERSION HAZARD** — Hambrick et al. (2014) published vs LSE accepted manuscript | Logged only to warn the next pass | *"The accepted manuscript and the published article **differ substantially in wording, well beyond copyediting**"* — published *"unsuccessful for several reasons"* vs manuscript *"fails for four major reasons"*; "(p. 84)" vs "(p. 4)". V3b *"nearly recorded a **false kill**"*. **Verify quotes only against the published version** |
| **34** | **Meinz, Hambrick, Hawkins, Gillings, Meyer & Schneider (2011), Texas Hold'Em poker, *JARMAC*** | Surfaced by V3b. *"**Judged OUTSIDE C3's stated bound** and therefore NOT a basis for an INSUFFICIENT verdict"* | *"A primary skill study in a **stochastic card game**, by two of the principal authors in the C3 dispute… **it is the nearest structural neighbour to blackjack anyone in this literature has studied**, and it undercuts the gap's sweeping wording. **Belongs to a domain-transfer card**"* |

**C4 — Chess.com / Khan (5 rows)**

| # | Source | Why not pursued | What it would support |
|---|---|---|---|
| **3** | WestEd / IES postsecondary Khan Academy efficacy RCT (588 students / 34 instructors / 20 colleges) | Not attempted by the collector — surfaced by V4. Award record read; *"the underlying final report / peer-reviewed publication and its actual effect sizes were **NOT yet obtained**"* | *"Directly falsifies C4's coverage-gap claim… and in a **postsecondary self-directed-adult** population **much closer to this product's solo-adult trainee** than C4's grades 3–8 findings"* |
| **4** | Murphy et al. (2014), SRI Education | Surfaced by V4; *"Located but not yet read in full"* | *"The landmark independent Khan Academy evaluation… **it is an association / implementation study, not an RCT — tier Q3 and do not let 'independent' imply causal strength**"* |
| **5** | Patil & Juanico (2024), *Behavior Analysis in Practice*, n=3 | Surfaced by V4; abstract read | *"A small, low-powered but genuinely independent data point, from a methodological tradition C4 does not touch at all"* |
| **27** | **Kelly & Rutherford (2017), IRRODL 18(4)** | Surfaced by V4b via **reference-list mining of the focused pass's own F12 full text**. Read in full by V4b | *"The **opposing position** missing from C4's enlarged efficacy evidence… it is **null**"*. Cautions: *"quasi-experimental, post-test-only, non-random — tier **Q3**, and do **not** let 'Controlled Study' in the title imply randomisation"*; n≈114; 4 weeks; *"carry the paper's own counter-caveat that **the lead author was the teacher delivering the intervention**"* |
| **35** | Böhmer, Burns & Crowley (2014), Cape Town RCT | **Over-budget overflow — C4 scoped to one citation and now at the hard cap (15/15)** | *"A possible **second** controlled comparison involving Khan Academy. **Low priority**: F13's own authors note the RCT tested an after-school package in which Khan Academy was only one component"* |

**C5 — Anki / spaced repetition (11 rows)**

| # | Source | Why not pursued | What it would support |
|---|---|---|---|
| **1** | **Moulton et al. (2006), "Teaching surgical skills… A randomized, controlled trial," *Annals of Surgery* 244(3)** | **Over-budget overflow — not collected in full** | *"An independent RCT showing spaced (vs massed) training improves retention of a ***procedural motor*** skill (microsurgical suturing) — a second, **non-cognitive-discrimination data point** for whether spacing benefits transfer to procedural/skill domains (sub-Q4)"*. **Explicitly excluded from V5's bounded scope** (`V5:184`) |
| **2** | MaiMemo "DHP model" papers — FSRS's own stated ancestor | **Over-budget overflow — not opened** | A more independent technical precedent check on FSRS |
| **20** | Pavlik & Anderson (2008) | Surfaced by V5; later collected | Falsifies C5's "all scheduling evidence is from the tool's own maintainers" gap |
| **21** | **Lindsey, Shroyer, Pashler & Mozer (2014), *Psychological Science*** | Surfaced by V5; *"full text not yet obtained"* at the time | *"The strongest independent scheduler-efficacy data point: a semester-long middle-school study reporting **~16.5% retention gain over massed study and ~10% over one-size-fits-all spacing**… **this measures actual retention gain, not predictive accuracy; do not conflate with FSRS-style log-loss benchmarks**"* |
| **22** | **Settles & Meeder (2016), "A Trainable Spaced Repetition Model for Language Learning," ACL** | Named by V5 in Bundle A, **not collected** (*"the pass took Pavlik and Lindsey instead"*). V5c: *"never a requirement"* | *"Peer-reviewed half-life-regression scheduler evaluated against baseline SR algorithms, **with public data and code**. Caveat: **authors are Duolingo employees evaluating on Duolingo data**"*. **This is the closest published analogue to what this product would build** |
| **23** | *"Anki Use and Academic Performance in Medical Education"* systematic review (2026) | Surfaced by V5; not read | *"The only systematic review located that studies **Anki itself** rather than the spacing effect in the abstract… **'systematic review' must not imply Q1-strength causal support**"* |
| **24** | **[AUTHORS CORRECTED]** Czyż et al. (2024), *Sci Rep* | Located, then **not collected because the ceiling was spent** | *"The contextual-interference tradition, **absent from C5 entirely**, is the research community that owns the 'does mixing practice improve retention of a situation→action skill' question"*. **Collect as a matched pair with #25** |
| **25** | **[AUTHORS ADDED]** Ammar et al. (2024), *EPR* 36(2) art. 57 | Same | *"The **opposing position** to #24… **Collect as a matched pair with #24 so the disagreement is registered as a conflict rather than silently resolved**"* |
| **31** | **[RESOLVED — collected as F18]** Latimier, Peyre & Ramus (2021) | Recorded unreadable; later read in full | Modern synthesis of **spaced retrieval practice** — *"which is what Anki actually is, and which the dossier currently treats as cleanly separable claims"* |
| **32** | **[RESOLVED — collected as F19, Q4]** Carpenter et al. (2012) | Same | *"The landmark treatment of spacing **beyond simple verbal recall**"* |
| **36** | Commentary on Ammar et al. — DOI 10.1007/s10648-025-10006-6 | **Over-budget overflow — "in-scope but deliberately uncollected"** | *"Live continuation of conflict #30. **Neither side of #30 is citable without acknowledging the dispute is ongoing**"* |
| **37** | "Advancing Contextual Interference" reply | Over-budget overflow | The reply half of the exchange |
| **38** | "Comment on Czyż et al. (2024)" — SportRxiv 435. **Preprint, unrefereed** | Over-budget overflow | Direct critique of #30's pro-CI side |
| **39** | **Contextual-interference *transfer* meta-analysis, *Frontiers in Psychology* (2024)** | Over-budget overflow | **"Arguably nearer C5's sub-Q4 than either collected CI paper, because transfer (not acquisition) is the question a blackjack trainer actually faces."** V5c names it **the first lead to collect** if CI becomes load-bearing — *"but classes that as a future card's trigger"* |

**C6 — blackjack (4 rows)**

| # | Source | Why not pursued | What it would support |
|---|---|---|---|
| **10** | **Keren & Wagenaar (1985), *JEP: General* 114(2)** | **UNVERIFIABLE** — paywalled APA/PsycNet, no OA, abstract publisher-elided, PhilPapers 403. *"Both the C6 collector and V6 failed to reach it"* | The 44%/16% split V6 **dropped**. *"Anyone retrieving the primary should determine (i) whether these figures are in it at all, and (ii) **the denominator that makes 44+16 sum to 60% rather than 100%**"* |
| **11** | **Speelman, Whiting & Dixon (2015), *JABA* 48(3)** | Surfaced by V6; **full text not obtained** (closed access) | *"Directly falsifies **two** of C6's declared coverage gaps"* — Q1 and Q2. *"no accurate counting at baseline → 100% accuracy under **changing-speed-criterion** training; generalisation probes in a **mock casino**; 3 of 4 won money post-intervention"*. **n=4 — do not read as population evidence** |
| **12** | **Anderson & Brown (1984), *Br J Psychol* 75, 466 citations** | Surfaced by V6; **full text not obtained** | *"The blackjack-specific landmark on C6's Q4 (transfer)… subjects played **blackjack** in both a real casino and a lab… explicitly casts 'doubt on laboratory gambling as a valid analogue'. **Would replace F6 as primary Q4 evidence**"* |
| **13** | Speelman replication+extension; **Speelman doctoral dissertation, opensiuc.lib.siu.edu/dissertations/1265** | Surfaced by V6; located, not read | *"**The dissertation is likely the most complete and most accessible account of the training protocol** (open repository). Surrounding tradition worth one sweep: *Analysis of Gambling Behavior* journal… and PMC4883474"* |
| **26** | "Using BST to Improve Casino Blackjack Strategy: Replication and Extension" | **Not locatable by C6-FP** — Crossref, ERIC API, Semantic Scholar all returned nothing distinct | *"**Do not cite as a separate source until its independent existence is confirmed** — a future pass should try **ABAI conference-program archives specifically, which are not indexed by any database tried here**"* |

---

# 5. Where the gate summary softened, omitted, or over-smoothed

**5.1 — The approval claim itself.**
> Gate: *"**Every Phase 1 correction landed and marked**, on all six cards."* (`P1-gate-summary.md:411`)
> Record: *"**F1–F21** — Outside V1d's scope… **Not examined by this pass and not altered.**"* (`C1-editorial-report.md:72`); *"All 21 checked strings… present, verbatim, **unaltered**"* (`V5c:202`); *"the four pre-existing F1–F9 defects… are **all still present verbatim**"* (`W5:132`).

**5.2 — "0 fabricated sources across the program."**
Technically true, and repeated four times. It sits next to a much less comfortable count the gate summary buries in §10 item 4 and §11: **four manufactured defects, three of them by correction or verification passes.** `PROCESS-AUDIT.md:108-110`: *"the anti-fabrication pressure applies to passes that ***correct***, not only to passes that ***collect***."*

**5.3 — The C2 low-achiever finding.**
> Gate §4: *"Plano's −0.66 is a **Grubbs-winsorized substitute for −1.57**."*
> Record `V2b:43`: *"**(1) k is 2, not 3**… **(2) The −.42 is essentially one quasi-experiment**… the one *true experimental* low-achiever study in the set is essentially null. **(3) The random-effects point estimates are omitted** — **−.23, 95% CI [−1.08, .63]** and **−.16, [−.49, .18]**, both crossing zero. …That is a real signal worth carrying and **is not** 'ITS harm low achievers.'"*

The gate reports the least important of the three.

**5.4 — C1's F16.**
> Gate §6 item 5 and §5 treat C1's evidence base as characterised.
> Record `V1c:200-201`: *"**F16 does not estimate item difficulty at all** — it estimates *learner ability*… the card's brief explicitly names this pattern ('a citation that appears to support feasibility but whose source addresses a materially different problem') as a **strength-honesty failure** rather than a caveat."*

This never reaches the gate summary, and the correction never reached the dossier (§0).

**5.5 — "5 of 6 SUFFICIENT."**
> Gate §2 table, unqualified.
> Record `V2c:576-578`: *"**Stated as a limitation:** a fresh independent coverage sweep was not part of this dispatch and **my SUFFICIENT verdict inherits V2b's negative search result on Q1/Q2 rather than reproducing it.**"*
> Record `V2c:514-517`: *"I state this explicitly so the orchestrator can disagree: **if the program's convention is that a material strength correction blocks a sufficiency pass, then C2 is INSUFFICIENT-pending-R1.**"*

**5.6 — "Four independent confirmations now that no decision-rule spacing study exists" (§7 item 4).**
True. But the same section omits the thing that actually undercuts the card: **conflict #15** — that C5's two closest-to-a-decision-rule sources are interleaving evidence, not spacing evidence. Gate §7 item 4 says *"Spacing evidence does not reach this product's task shape"*; the register says something sharper and more actionable — *"the mechanism actually evidenced for situation→action rule learning is **interleaving/discriminability** (mixing hand types within a session), which is **a different product lever from interval scheduling**."*

**5.7 — C4's "at cap."**
> Gate §2: *"C4 … **13** (15 sources — **at cap**)."*
> Record `W5:180-186`: *"'Exactly 15' depends on two declared conventions… **a stricter count would put it at 16–17**."*

**5.8 — "The wave earned its cost twice" (§11).**
It also cost something. `W5:219` and `W8` both record that **`verification/V4b-chesscom-khan-toppedup.md` remains uncorrected** as the origin of a false statement, on an immutability ruling. The gate summary's §3 sidebar says verification records were never edited *"including the two later found to contain errors"* — but does not say **which** two, so a future reader cannot avoid them.

**5.9 — C1's settled gaps.**
> Gate §5: *"Two gaps are now ruled SETTLED — **do not re-run**… That is 'we looked hard and it isn't there,' which is a legitimate research result."*
> Record `C1-wauters-collection-report.md:139-142`: *"**Partial, imperfect relief on a settled coverage gap.** A 25-item fixed, expert-authored, single-skill drill bank rated by subject experts is **the closest structural match to this product's situation anywhere in the C1 dossier**."*

The gate presents a closed door. The record shows an agent found a crack in it and chose not to open it.

**5.10 — The gate summary never states which cards' F-ranges remain unexamined.** C1's F1–F21, C4's F1–F9 and C5's F1–F15 were never re-verified after their initial pass. The record is explicit (`V1c:8-11`, `V2b:8`, `V3b:7`, `V4b:8-11`, `V5b:6`) — every top-up verifier scoped itself to the *new* findings only. **Roughly half of the program's 96 findings have exactly one verification pass and carry unlanded corrections from it.**

---

# 6. Integrity manifests and PROCESS-AUDIT — what was certified, and what was not

**Certified positively:**
- SHA-256 over **25 named files** pre-remediation, re-hashed post (`INTEGRITY-MANIFEST-pre.md:64`).
- Seven repo probes: HEAD, `show-ref`, `git status --porcelain`, `git ls-files -s`, product-source tree hash, reflog depth.
- Every changed dossier hash mapped to a **named authorising pass** (`INTEGRITY-MANIFEST-post.md:75-82`).
- *"**0 of 12 agents ran git**"*, later *"**0 of 29**"*, with all shell use self-disclosed and corroborated.
- Templates: all three byte-identical throughout.

**Explicitly NOT certified — the manifest's own words (`INTEGRITY-MANIFEST-post.md:39-45`):**
> *"1. **The `git status --porcelain` probe cannot detect *further* modification of an already-modified file.** The charter was already unstaged-modified at baseline, so the second edit left the porcelain output byte-identical… A future run should hash tracked-file *contents*, not just status output.
> 2. **Hash equality proves the tree is unchanged; it does not prove nothing was *read*.** Read-only exfiltration is out of scope."*

**Checks that passed on absence rather than positive enumeration:**

1. **"0 of N agents ran git" is inferred from probe invariance plus self-disclosure — not from a command log.** No agent-side execution record exists. Two agents *self-disclosed* crossing their own role boundary (`INTEGRITY-MANIFEST-post.md:131-134`): *"Two agents disclosed crossing their own role card's nominal no-Bash boundary with read-only calls (`wc`, `grep`)… **This is the honest cost of the fallback posture: the boundary was self-policed rather than structural**"* — because the restricted agent types **failed to load** (`PROCESS-AUDIT.md:33-37`).
2. **The addendum's baseline is not comparable to the pre-manifest.** `INTEGRITY-MANIFEST-post.md:117-119`: *"The pre-dispatch probes are **no longer directly comparable**: the orchestrator committed and pushed the evidence branch between waves."* HEAD, refs, index and reflog *"changed **by design**."* From that point, integrity rests on reflog *arithmetic* (270→273 = "exactly 2 commits + 1 checkout") rather than hash identity.
3. **Append-only compliance was verified by content comparison, not diff, on every card.** `V5c:198`: *"I cannot inspect history (no `git` was run, in any form). I verified compliance by **content comparison** instead."* `V2b:103-105`: *"**Limitation stated plainly:** the shared brief forbids running git, so this is a content check against V2's record, not a diff. **I cannot rule out an edit to F1–F11 text that V2 never quoted.**"* This is an absence check: it can only detect changes to strings a prior verifier happened to quote.
4. **The "10 correction markers, not one named a verifier" census — the program's decisive finding — was never re-run after remediation.** Had it been, it would have caught §0.

**PROCESS-AUDIT is explicitly non-authoritative** (`PROCESS-AUDIT.md:9`: *"Nothing here is authoritative over a dossier or a verification record"*) and derived from *"the session working ledger and dispatch briefs (`.wl/sdd/`, **ephemeral, deliberately not merged**)"*. **The primary source for the process record was destroyed; PROCESS-AUDIT is a summary of it with no way to check it.** Its eleven lessons are its real value, and lesson 1 — *"Charter a landing step, **and check it**"* — is precisely the check that was written and not performed.

---

# 7. Bottom line: what the owner would want back *(primary deliverable)*

Ranked by effect on designing the product.

**1. C5's F4 is interleaving evidence, not spacing evidence — and the dossier still says otherwise.**
Conflict #15 is the most product-consequential row in either register and it is a *product lever* finding, not a process finding: *"the mechanism actually evidenced for situation→action rule learning is **interleaving/discriminability** (mixing hand types within a session), which is **a different product lever from interval scheduling**."* Taylor & Rohrer held spacing constant **by design** and still doubled accuracy (77% vs 38%, d=1.21) on a rule-application task. **The design implication is "mix hand types within a session," not "schedule reviews at expanding intervals."** V5 established this on 2026-07-19. It never landed and never reached the gate summary.

**2. Nine verifier corrections are still outstanding in the promoted archive**, including four that change what a source says (C4 F6's false uniqueness claim, C4 F7's cross-experiment effect-size splice and mislabelled treatment, C4 F9's wrong authors, C1 F16's fabricated covariate list). The archive is described as *"the citable copy."* **A landing-and-verify pass over C1 F1–F21, C4 F1–F9 and C5 F1–F15 is the single highest-value action available.**

**3. Lead #22 — Settles & Meeder (2016), Duolingo's half-life regression scheduler, with public data and code.** Named in a verifier's own bundle, then not collected because a collector chose two other papers. This is the closest published thing to the system this product would build, in the closest product context (a consumer drilling app), peer-reviewed, with an open dataset. **It was dropped on an agent's substitution preference and then reclassified as "never a requirement" by a second agent.**

**4. Lead #30 — Kahneman & Klein (2009), "Conditions for Intuitive Expertise."** Register: *"whether skill is learnable at all in low-validity, stochastic environments, and under what conditions (**regularity of the environment + opportunity to learn it through feedback**)… the tradition that speaks most directly to the product question C3's F11 predictability moderator only gestures at."* Blackjack is a high-regularity, high-feedback, low-outcome-validity environment — Kahneman & Klein's conditions are close to a specification for whether a blackjack trainer can work at all. **Routed by an agent to a "domain-transfer card" that has never been created.** Lead #34 (Meinz et al., poker — *"the nearest structural neighbour to blackjack anyone in this literature has studied"*) went to the same nonexistent card.

**5. The retrieval-practice / testing-effect tradition is a program-level hole with no owner.** `V2c:536`: *"a blackjack basic-strategy trainer is, **in structure, a retrieval-practice drill**… That is a real absence relative to the question."* Scoped out by V2 on an assumption that C3/C5 covered it; the check was never run; V2c re-deferred it to *"a **synthesis-time check with a named owner**"*; no owner was named. **The largest evidence body on whether retrieval practice produces durable learning is absent from the program and nobody is responsible for it.**

**6. C3 coverage gap #2 — the elite-population problem — is the binding constraint on the whole deliberate-practice card, and the gate summary never mentions it.** `V3c:429-433`: *"Coverage gap #2 (elite-population-only samples) is **the gap with the most product consequence**… Every study here explains variance ***among already-selected experts***. **A blackjack trainer's primary user is a novice.** …a downstream product decision should treat it as **the binding constraint on this entire card, more binding than the predictability moderator**."* Gate §7 item 3 discusses only the predictability moderator.

**7. C4's independent Khan Academy evidence is one source weaker than it reads, and the strongest lead was never retrieved.** Lead #3 — the WestEd/IES **postsecondary, self-directed-adult** cluster-RCT — is *"much closer to this product's solo-adult trainee than C4's grades 3–8 findings,"* and *"the underlying final report… and its actual effect sizes were **NOT yet obtained**."* C4 is at the hard cap and cannot collect it without a cap lift. Meanwhile F11's positive associations come from a study **commissioned by Khan Academy's own major funder, with Khan Academy co-selecting the sites.**

**8. Lead #1 — Moulton et al. (2006), *Annals of Surgery*, RCT: spaced vs massed training of a *procedural motor* skill.** The one non-verbal, non-declarative RCT data point on whether spacing transfers to procedural domains. **Dropped as over-budget overflow, then *explicitly declared out of scope* by V5** (`V5:184`) and again by V5b (`V5b:286`). Two agents independently confirmed it out, on budget grounds, and it is the closest thing in the register to answering C5's own load-bearing sub-question.

**9. Design signal, buried in one parenthetical: ask authors for percentages, not rankings.** Gate §7 item 6 states F28's r=.80 absolute-percentage result *"overturning the standing Impara & Plake result"* — and appends *"(only one side has been read — lead #40.)"* Register #40 is blunter: *"**Highest-value lead in this group: C1 F28 explicitly contradicts it**… A genuine conflict is asserted but only one side has been read."* If this product ever asks an author to set item difficulty, this is the design decision — and it currently rests on a single 25-item French-conjugation study whose authors disclaim generalisation, contradicting a standing result nobody has read.

**10. Four source-lead IDs (#16–#19) and six conflict IDs (#20–#25) are missing with no explanation anywhere in the corpus.** Both registers certify "no duplicate IDs" — a check that passes on absence. Nothing certifies that no row was lost. Given that this program's documented ID hazard was *duplicate* IDs from concurrent appends, ten silently vanished IDs deserve a look before Phase 2.

---

**One thing worth saying in the program's favour, since the owner asked for adversarial scrutiny and deserves the counterweight too:** the verification layer worked. Verifiers overruled collectors twenty times, overruled *each other* four times, reversed corrections that ran in the product's favour and against it, and repeatedly declined to manufacture findings — `V5c:408`: *"I looked hard for a scalp on this pass and there is not one."* The failure is not judgement. **It is that a program which correctly diagnosed "corrections don't self-execute" then re-ran the same failure on its own first generation of corrections, and certified the opposite in the one document the owner read.**