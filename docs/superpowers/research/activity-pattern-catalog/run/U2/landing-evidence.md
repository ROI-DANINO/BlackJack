# Landing evidence — unit U2

> **Recovered 2026-07-27, after the fact.** The research plan specified this file to carry the
> confirmers' quoted evidence. It was never created during the pass — the confirmers were dispatched
> with "rows, not files", returned their evidence inline, and the orchestrator wrote only the
> one-word `landing-confirmation.md` the gate reads. A process audit rated the omission a blocker:
> 82 confirmations rested on three one-word files, and because the gate deliberately does not read
> this path, **no check could see its absence.**
>
> What follows is each confirmer's **final return, extracted verbatim from its agent transcript** —
> not a summary, not the orchestrator's account of it. Each confirmer was a fresh instance that
> neither raised nor applied the corrections it checked.
>
> **Provenance caveat, stated rather than glossed:** these were recovered from session transcripts
> after the pass closed, not written by the confirmers into the archive at the time. They are the
> agents' own words; the *filing* is post-hoc.


---

## C1–C20, C22–C30

<!-- verbatim final return, agent transcript a026919bedd3c2be8 -->

Verification complete. I re-opened 10 of the 22 registered sources plus the local corpus file, and read the Duolingo whitepaper (U2-S1) as rendered pages 1–16 in full and DRR-21-02 (U2-S22) as rendered pages 1–2 and 6–8.

## Card

LDB-02 / U2 — independent landing confirmation, 29 live correction IDs (C1–C20, C22–C30; C21 retired, not sought).

## Result

**29 of 29 LANDED. 0 NOT-LANDED.** Terminal line intact and singular. Sufficiency: **SUFFICIENT**. Two new editorial-consistency findings raised (neither reopens sufficiency).

## Evidence — Judgement 1, per correction ID

Descriptions are verbatim from `corrections.md`. Material IDs are marked **[M]** and were re-checked at the primary source.

| ID | Description (verbatim from corrections.md) | State | Quote found at locus |
|---|---|---|---|
| C1 **[M]** | U2-S13 provenance `independent` is unwarranted; the publisher discloses that reviewers receive compensation from the companies whose products get reviewed. Relabel to `compensated-third-party` and quote the disclosure in the cell | **LANDED** | `audit.md:93` Provenance column reads `compensated-third-party`; cell quotes *"Disclosure: The reviews written on this site are carried it by professionals, who receive compensation from the companies whose products get reviewed. We test each product thoroughly and recommend only what we believe to be the very best. We are independently owned and the opinions expressed here are our own."* **Source re-opened (U2-S20):** my own fetch returns that block character-for-character, including the "carried it by" typo, in the article body. Both halves quoted, as required. |
| C2 **[M]** | U2-12 evidence label drops `Evidence-backed` to `Product judgement`; field 7 rests on an unquantified subjective impression with no method or test conditions | **LANDED** | `audit.md:62` Evidence-label column reads `Product judgement`; cell states "which is why this row's evidence label is `Product judgement` and not `Evidence-backed`." Grep confirms `Evidence-backed` survives **nowhere** in the file as a live label — only inside that negation. **Source re-opened (U2-S13):** the remark is *"The software is accurate, it picks up your instrument's sound well."* — no method, conditions, instrument, room or error rate. Downgrade warranted. |
| C3 **[M]** | U2-S1 is misquoted: the audit renders "recognition exercises with tappable hints" where the source prints "receptive exercises". Two occurrences, both inside quotation marks | **LANDED** | Both loci fixed: `audit.md:19` and `:26` now quote "receptive exercises with tappable hints"; `:81` reads "starting everyone out with **receptive** exercises". **Source re-opened (U2-S1 p. 7, §2.5):** *"Duolingo supports learners who may have anxiety by starting everyone out with receptive exercises with tappable hints so they can choose their level of scaffolding."* Confirmed verbatim. Remaining "recognition exercises" strings (`:26`, `:81`) are the correction's own account of the former error, correctly quarantined. |
| C4 **[M]** | U2-3's "Source makes no measurement claim at all" is false; the source claims letter-tracing reinforces letter shape recognition and handwriting. State the vendor's claim and why it does not answer the measurement question | **LANDED — trap avoided** | `audit.md:53`: "So the measurement column stays unanswered by the source; **what was wrong was the word 'at all'**, which asserted a silence the source does not have." The true clause is kept. **Source re-opened (U2-S1 p. 10, §3.2):** *"we include visual and kinesthetic activities as we introduce each letter, such as letter-tracing, that reinforce letter shape recognition and help children learn handwriting skills (Santangelo & Graham, 2016)"* — verbatim, and an efficacy claim, not a measurement claim. |
| C5 | U2-1's qualification "no option set is displayed" is not stated by its cited locus. Partially closed by the top-up; the residual is C19 | **LANDED** | `audit.md:51`: "the supplied option set is absent rather than merely unused. **Sourcing of that last point, with its hop on the record (C5/C19)**… the absence of the word bank in the typed mode is **one inference**… Sourced on that basis, not asserted bare." |
| C6 | U2-S1 quoted as "the written form with sound"; the source prints "the written form and sound". Two occurrences | **LANDED** | Both loci: `audit.md:53` and `:81` read "the written form and sound". Grep: zero occurrences of "written form with sound". **Source re-opened (U2-S1 p. 4):** *"learners trace characters or letters to associate the written form and sound"* — verbatim. |
| C7 | U2-S6 quote truncated without ellipsis, dropping "or coordinate" and "even likely". The omission weakens the source — the audit under-claims against its own evidence | **LANDED** | `audit.md:56` and `:86` both carry the full sentence. **Source re-opened (Desmos §6):** *"If we ask students to change the first part of the graph so the second reaches a particular target value or coordinate, it's possible – even likely – the student will complete the task through guess-and-check, without thinking mathematically at all."* Exact match; "or coordinate" and "– even likely –" both restored. |
| C8 | U2-S10 quote drops "about what it finds" without ellipsis, in both the pattern cell and the register row | **LANDED** | Both loci: `audit.md:60` and `:90` end "…a list of predefined comments about what it finds." **Source re-opened (Exercism):** *"The Analyzer is a tool that looks for specific characteristics in a solution and returns to the student a list of predefined comments about what it finds."* Verbatim. |
| C9 **[M]** | U2-8 attaches a numeric-tolerance attribute to the expression grader; the source documents it under the decimal answer type. Relabel the mechanism, keep the pattern | **LANDED** | `audit.md:58`, `:85`: "The wiki documents it under the **`decimal`** answer type… whereas `expression`'s documented attributes are `data-functions`, `data-same-form`, `data-simplify` and `data-times`." **Source re-opened (khan-exercises wiki):** `data-max-error` is documented exclusively under `decimal`, with *"If an error margin needs to be allowed in the answer, as is the case in many statistics problems, you can specify the amount of error that is to be allowed"*; `expression`'s four attributes match exactly. Pattern kept, mechanism relabelled. |
| C10 **[M]** | U2-13 appends "to validate" outside the quotation marks, converting the source's statement that problems are hard to solve into a claim about validation tooling, and drops the vendor's qualifier that they are too difficult for most users. Trim the conclusion; do not delete the claim | **LANDED — trap avoided** | `audit.md:63` quotes the sentence whole: *"The more challenging balance problems with many layers, draggable weights, and unknowns remain difficult even for frontier models (but are also too difficult for most of our users!)"* — **source re-opened (Brilliant), verbatim match, qualifier present.** "to validate" survives only inside the correction's account of the error. Critically, the authoring-risk claim is **not** deleted: "Brilliant's own eval post concedes the authoring risk that puzzles come out 'visually unclear, or worse, completely unsolvable'" remains, and the cell states "The authoring-risk claim above does **not** depend on it". Source confirms *"They were visually unclear, or worse, completely unsolvable."* |
| C11 | U2-11 cites Part 2 section 2 of the corpus document for weakness-targeting; that content is Part 1 section 2 | **LANDED** | `audit.md:61`: "`how-to-teach.md` **Part 1 §2 'Personalize'**… (C11: an earlier draft cited Part 2 §2 for this; Part 2 item 2 is 'Chart-cell recall', a different thing.)" **Corpus re-opened:** `how-to-teach.md:22` "## Part 1", `:31` "### 2. Personalize", `:32` "Track per-cell accuracy… Weakness-targeting is most of the value of an adaptive trainer." Part 2 item 2 (`:50`) is indeed "Chart-cell recall". |
| C12 | U2-S15's register row claims it is cited for the rejected drag-and-drop candidate; that row cites U2-S14, and U2-S15 is cited nowhere | **LANDED** | `audit.md:95`: "that rejected row cites **U2-S14**, and `U2-S15` appears nowhere in Table 1, Table 2, or their continuations". **Verified positively by enumeration**, not by absence: grep for `U2-S15` returns line 95 only (its own row); the rejected drag-and-drop row at `:70` cites `U2-S14`. |
| C13 | U2-4's "whitepaper describes the mechanic only" is false — the source attaches an efficacy claim with two citations. The second clause, that it makes no measurement claim, remains true. Do not delete both | **LANDED — trap avoided** | `audit.md:54`: "**The second clause survives unchanged and is the one that matters here: the whitepaper still makes no measurement claim**". **Source re-opened (U2-S1):** p. 4 *"This type of active learning, when learners make decisions about incoming information rather than passively absorbing it, leads to better learning outcomes (Zosh et al., 2018)"* and *"to drive better outcomes (Hirsh-Pasek et al., 2015)"*; p. 14 *"Highly interactive number lines have been shown to increase fraction understanding as well as magnitude extent"*. All verbatim; all efficacy, none measurement. |
| C14 | DOWNGRADED — U2-S2's recorded title is the page's meta title, not an error. Verifier 2 disagrees with the raised finding; land as no-change with that stated | **LANDED as no-change, reasoning recorded** | `audit.md:82`: "**C14 — raised correction resolved AGAINST the finding; this row is deliberately unchanged.**" and it records its own limit: "`WebFetch` converts to markdown and drops the HTML head, so the editor could **not** re-read the raw `<title>` element". **Source re-opened (U2-S2):** on-page H1 is *"How Duolingo teaches speaking skills"*, differing from the recorded title as described. I hit the identical `<title>` limit and confirm the file neither silently applied nor silently dropped the row. |
| C15 **[M]** | The read-first note misclassifies two corpus exercise templates as not dealt-hand variants; both present a hand. One sentence: the correspondence to our patterns holds only at the level of response modality | **LANDED** | `audit.md:20`: "What distinguishes items 4 and 5 is **response modality**, not the absence of a dealt hand… The correspondence between this catalog and the corpus therefore holds only at the level of response modality". **Corpus re-opened:** item 4 (`:52`) *"show the hand, learner **names the play before any buttons appear**"*; item 5 (`:53`) *"a full hand played out"*. Both verbatim; both present a hand. Part 2 does name eight templates. |
| C16 **[M]** | U2-2's measurement cells omit the source's own caveat that an automaticity-loaded spoken-production measure understates knowledge — pages 6 and 8 of a report read cover to cover | **LANDED** | `audit.md:52` carries both, in both measurement columns. **Source re-opened (U2-S22 rendered pp. 6 and 8):** p. 6 *"A less time-sensitive measure of vocabulary knowledge (i.e., one that relies less on automatic production) would have likely yielded higher scores in this domain."* — verbatim. p. 8 *"Rather, the relatively low vocabulary subscore may be seen in part as an artifact of Versant's vocabulary measure which requires a high level of automaticity in speech production."* — verbatim from "the relatively low". |
| C17 | A concession is quoted as the vendor speaking against its own interest without the two sentences that immediately retract it | **LANDED** | `audit.md:321-336` restores both. **Source re-opened (U2-S22 p. 8):** the concession *"However, this study demonstrates that Duolingo's emphasis on receptive vocabulary knowledge may not transfer directly to productive knowledge, especially when automaticity is the goal of the assessment."* is followed **immediately** by *"At the same time, these results are not necessarily an indication of a lack of vocabulary knowledge among beginner Duolingo users. Rather, the relatively low vocabulary subscore may be seen in part as an artifact of Versant's vocabulary measure…"* — verbatim, and genuinely the next two sentences. The "against its own interest" framing is withdrawn in the file. |
| C18 **[M]** | C3's repair must extend to the inference drawn from it: "that confirms recognition-first onboarding" collapses once the word is "receptive" | **LANDED** | `audit.md:26`: "The earlier sentence 'That confirms recognition-first onboarding by Duolingo's own account' **is withdrawn**: it read the lead's own term back into a source that does not use it." Source confirms the whitepaper never uses "recognition" in that sentence. |
| C19 **[M]** | U2-1's table row is unchanged — its Source ID omits the new source and the qualification still asserts "no option set is displayed", with the hop stated only in distant prose | **LANDED** | Both legs at `audit.md:51`: Source ID now reads `U2-S1, U2-S21`; the qualification cell itself now carries the hop. **Source re-opened (U2-S21):** *"For extra practice during your lessons, don't rely on word banks in translation exercises!…"* — verbatim, and genuinely scoped to *translation* exercises, so the audit's "one inference" hedge is exactly right at source. |
| C20 | U2-12 quotes a sentence whose subject was changed inside the quotation marks | **LANDED** | `audit.md:62`: "An earlier draft ran this as *the detection* 'is accurate…', substituting a subject inside the quotation marks; the review's subject is 'The software'." **Source re-opened:** *"The software is accurate, it picks up your instrument's sound well."* Confirmed. |
| C22 | A cited claim is attributed to page 1; it spans pages 1 to 2 | **LANDED** | `audit.md:301-306` cites "**pp. 1-2**" and explains the span. **Source re-opened (U2-S22):** the sentence begins in p. 1's right-hand column at *"Loewen et al. (2020) acknowledged that 'any gains (on speaking ability) are encouraging' but suggested 'tempered interpretations of the magnitude of oral"* and completes at the top of p. 2 with *"proficiency growth exhibited by most learners in this study' (p. 19)."* Exactly as the file describes. |
| C23 **[M]** | C1's relabel has two loci — the source register row and the pattern row's own provenance cell, which also reads `independent` | **LANDED — both loci** | Locus 1: `audit.md:93`, U2-S13 register row Provenance column = `compensated-third-party`. Locus 2: `audit.md:62`, U2-12's own provenance cell = `compensated-third-party / Product judgement`. Disclosure text is **quoted** in the register cell, not merely asserted. |
| C24 **[M]** | U2-2's table row omits the new source from its Source ID despite that source being the reason the top-up was dispatched | **LANDED** | `audit.md:52` Source ID reads `U2-S1, U2-S2, U2-S3, U2-S22`. **Source re-opened:** U2-S22's title, DRR number, date, page count and full author list all verified against the rendered p. 1 — *Jiang, Rollinson, Chen, Reuveni, Gustafson, Plonsky, Pajak*, all Duolingo, Inc. except Plonsky (Northern Arizona University). Register row correct. |
| C25 | U2-S21's register row claims all eleven section headings were enumerated; ten were | **LANDED** | `audit.md:361`: "the **ten** section headings enumerated in 'Target 2' above — C25: an earlier draft of this cell said 'all eleven'". **Source re-opened:** the page yields the post title *"How Duolingo teaches writing skills"* plus **ten** section headings, and the Target-2 list at `:150-153` enumerates exactly those ten. Cell and list now agree. The added hedge about mixed heading levels is warranted. |
| C26 | UPGRADE — restore the truncated parenthetical, which prints a doubled word in the source and is reproduced sic | **LANDED** | `audit.md:254-258`. **Source re-opened (U2-S22 rendered p. 6):** *"According to a Versant representative, "this seemed to suggest that some candidates are either not speaking clearly in French or are taking the test in an improper environment (background noise noise, faulty mic, etc.)" (M. Kumar, personal communication, May 18, 2021)."* The doubled "noise" **is** in the source and is reproduced sic; the "M. Kumar" attribution is restored. |
| C27 | UPGRADE — raise U2-S21's date confidence from low to reasonable; the sibling post carries a distinct per-post date and an archive snapshot falls two days after | **LANDED** | `audit.md:361`: "**Upgraded to reasonable confidence (C27…)**". **Both sources re-opened:** U2-S21 byline renders "July 2, 2026"; U2-S2 byline renders "February 9, 2026" — distinct per-post dates, independently reproduced. The file correctly declines to rely on the archive leg the editor could not re-open. |
| C28 | UPGRADE — close the "Using new writing systems" lead as exhausted; the section is one sentence with no relevant content | **LANDED** | `audit.md:201-215`. **Source re-opened:** the section is exactly one sentence — *"If you're learning a language with a different writing system than your own, we have tools to help you recognize and use these new characters!"* — reproduced verbatim in the file, with no mention of tracing, stroke order or handwriting. Lead genuinely exhausted. |
| C29 **[M]** | The scaffolding-fade description credits U2-S1 with a fading mechanic; the source describes learner-chosen scaffolding, not fading. Seed B of this card is fading assistance, so the cell must not imply a precedent the source does not supply | **LANDED — see verdict below** | `audit.md:19`. Withdrawal present, correct, and correctly reasoned. |
| C30 | A quote truncates before "improving their likelihood to remember the correct idea" with no ellipsis; same defect as C7 and C8, landed for consistency | **LANDED** | `audit.md:19` carries the clause. **Source re-opened (U2-S1 p. 5, §2.2):** *"If they make a mistake, they receive a hint, and an exercise targeting the same concept is resurfaced at the very end of the lesson so they can answer it accurately, improving their likelihood to remember the correct idea."* Verbatim, closing clause included. |

## Evidence — Judgement 2: verdict on C29

**LANDED and substantively correct. I did check the concreteness-fading passage and did not fall into the trap.**

I read U2-S1 as rendered pages **1–16, all of them** (1–3, 4–7, 8–9, 10–14, 15–16), specifically hunting for any description of assistance being withdrawn or reduced as competence grows.

1. **The withdrawal is right on the substance.** §2.5, p. 7 reads *"Duolingo supports learners who may have anxiety by starting everyone out with receptive exercises with tappable hints so they can choose their level of scaffolding."* The learner chooses the level; nothing withdraws it. §2.2, p. 5 is error-triggered remediation — help arrives *after a mistake*, the opposite direction of a fade.
2. **I opened the concreteness-fading passage and it does not rescue the claim.** §3.3, p. 14: *"At a finer grain, the progression in CRA is referred to as concreteness fading, where learners first see very realistic objects that become more and more abstract."* This is the concrete–representational–abstract framework fading the *representation*, not the assistance. The audit's cell names this passage explicitly, quotes it accurately, and rules it out for the right reason. It did not ignore it.
3. **The absence claim holds on my own reading of pp. 1–16.** No assistance-withdrawal mechanic anywhere. The nearest passages are all difficulty-progression, not help-withdrawal (p. 3 *"Duolingo challenges them to engage with progressively more complex topics"*; p. 9 *"AI-powered personalization adjusts the difficulty level"*).
4. **The file's hedge about pp. 17–19 is well-founded and I confirmed its basis.** The p. 1 table of contents places §4 References at p. 15; p. 15 carries "Author Biographies" then §4 beginning at *Adams, M. J. (1998)*; p. 16 ends at *French, R. M., & Cleeremans, A. (2015)*. "Author biographies plus the opening of §4 References… running alphabetically from Adams to French" is exactly right.

Seed B correctly retains **no shipped analogue**. No false claim was restored.

## Evidence — terminal line

`VERDICT: Collected` appears **once** in the file, at line 364, as the last content line (line 365 is the trailing newline). Grep for `^VERDICT` returns a single hit. Intact and singular.

## Evidence — Judgement 2: sufficiency

**SUFFICIENT.**

- **Both gaps named in the prior INSUFFICIENT verdicts are closed, and I verified both at source, not from the record.** Pass 2's stated gap was "one directly on-point passage inside a source read cover to cover did not reach the record, and a vendor concession is quoted without the walk-back that immediately follows it" — that is C16 and C17. I re-opened U2-S22 pp. 6 and 8 and confirm both passages are now in the file, verbatim, at the right loci, and that C17's two sentences are genuinely the ones that immediately follow.
- **The provenance condition is MET.** I tested it rather than assumed it. Enumerating the Provenance column of all 22 register rows positively: U2-S13 = `compensated-third-party`; U2-S17 and U2-S18 = `independent` but both `UNREACHABLE` and, by grep, cited nowhere in any table; all 19 others = `vendor-self-description`. **Zero reachable sources are labelled `independent`,** and `Evidence-backed` survives nowhere as a live label. C1/C23 landed in both loci with the disclosure quoted; C2 landed. The unit's single evidence-backed/independent row is properly stripped.
- **The limit is stated plainly** — and stated in the place a reader cannot skip it. Every Table 1 row carries a visible provenance token in a dedicated column; U2-S17 and U2-S18 each state exactly what independent counterweight was lost ("without it, both Desmos rows rest on vendor-authored sources only"); U2-S13's cell explains why `independent` was unwarranted and warns cross-unit readers that U1/U3's `independent` was "**never checked for compensation**".
- **The strongest counter-arguments are engaged, repeatedly and against the file's own interest.** The corpus's recognition-vs-production lead is reported UNBACKED with counter-evidence quoted against it *and* that counter-evidence's Duolingo funding disclosed; C7 restores a source's own "even likely" failure rating against the file's own U2-6 row; C10 and C17 withdraw conclusions; C29 removes a precedent for one of the card's two seed ideas rather than keep it.

Both new findings below are internal-consistency items, not evidence gaps. Neither reopens sufficiency.

## Next

Two new corrections for the orchestrator's ledger. Both `editorial`; **zero new sources; no collection required.**

**Conflict-register rows (IDs to be assigned centrally):**

| Locus | Finding | Severity | Remedy route | Blast radius |
|---|---|---|---|---|
| `audit.md:142-144` | Stale statement now contradicted by the file's own register. The top-up collector's Target 1 still reads: "**I have not relabelled U2-S13.** Its `Provenance` cell still reads `independent` and I left it untouched, per dispatch." U2-S13's Provenance cell now reads `compensated-third-party` (`:93`). C1/C23 named two loci and both changed correctly — this third occurrence is narrative, not a provenance cell, so it was legitimately out of scope, but a reader reaching line 142 is told the opposite of the current state. The editor's note at `:360` does record that the relabel was applied, which mitigates but does not fix it. | Low-moderate | `editorial` | 1 sentence — mark superseded, cross-reference `:93` |
| `audit.md:19` (C29 cell) | Optional strengthening, **not required, no claim changes.** The cell pre-empts the "fading" keyword trap but not two other near-miss strings in the same source that a keyword re-checker would hit: p. 10 *"the levels gradually scaffold learners to more difficult content as they progress through the curriculum"* and p. 2 *"enables learners to gradually pick up patterns"*. I opened both and confirm each is difficulty-progression or implicit-learning, **not** assistance-withdrawal, so the absence claim is unaffected. Recorded so the next re-checker need not re-derive it. | Informational | `editorial` (optional) | 1 clause |

**Checked and explicitly ruled NOT defects** (recorded so they are not re-raised): the C13 quote of the p. 14 number-line sentence terminates before "(e.g., knowing the relationship between 2, 20, and 400; see Siegler (2022) for review)" without an ellipsis — this is a terminal truncation of a grammatically complete fragment, dropping only an illustrative parenthetical and a citation pointer, and the cell already discloses that the claims come "each with a citation". Not a C7/C8/C30-class defect. Also: `how-to-teach.md` item 7 "Speed drill" is the one of eight templates that does not literally print a hand; "a timed run of decisions" carries it in context, and C15's correction concerned items 4 and 5, which are exactly right.

## Files

Read only; **nothing written.** Per dispatch ("Rows, not files") this record is returned as text, not a file.

- `/home/roking/Desktop/Projects/blackjack/journal/raw/_inbox/2026-07-26-ldb-02-activity-patterns/run/U2/audit.md`
- `/home/roking/Desktop/Projects/blackjack/journal/raw/_inbox/2026-07-26-ldb-02-activity-patterns/run/U2/corrections.md`
- `/home/roking/Desktop/Projects/blackjack/journal/raw/_inbox/2026-07-26-ldb-02-activity-patterns/run/U2/verification.md`
- `/home/roking/Desktop/Projects/blackjack/docs/imports/v2-research-2026-07-11/course-bundle/how-to-teach.md`

Sources re-opened: U2-S1 (rendered pp. 1–16), U2-S2, U2-S5, U2-S6, U2-S10, U2-S13, U2-S14, U2-S20, U2-S21, U2-S22 (rendered pp. 1–2, 6–8), plus the local corpus file. **Not re-opened** (no material correction touches them): U2-S3, U2-S4, U2-S7, U2-S8, U2-S9, U2-S11, U2-S12, U2-S16, U2-S19; U2-S17/U2-S18 remain unreachable and are cited nowhere; U2-S22 pp. 3–5 and 9–12 were not re-rendered, so the file's §1.1 p. 3 and §3.2 p. 4 quotes rest on Pass 2's verification, not mine.

## Blocker

None.

---

## C31–C32

<!-- verbatim final return, agent transcript a3a287d74211b23cd -->

## Card

`LDB-02` — unit **U2** activity-pattern catalog; independent landing confirmation for follow-up corrections **C31** and **C32** only. C1–C30 out of scope (closed by a prior confirmer).

## Result

**Both landed cleanly. C31 = LANDED. C32 = LANDED.** No withdrawn claim needs restoring. Terminal line and row inventory intact. One ledger-state discrepancy (not an artifact defect) returned for the orchestrator, plus one optional non-material observation I explicitly do **not** recommend landing as a correction.

---

### Row 1 — C31

**ID description, verbatim from `corrections.md` line 40:**
> A top-up narrative passage still states that U2-S13 was not relabelled and that its provenance cell still reads independent; that cell now reads compensated-third-party. Mark the passage superseded and cross-reference the register row

**State: `LANDED`**

**(a) Marker present** — `audit.md:153-160`, immediately above the passage (one blank line between), grep anchor matches exactly once:

> **Superseded (C31; editor). The paragraph immediately below was true when the top-up collector wrote it, and is kept as the record of what that collector was instructed to do and did. It no longer describes this file.** U2-S13's `Provenance` cell now reads **`compensated-third-party`**, and so does U2-12's own provenance cell — both relabelled by the editorial pass under C1/C23. The current label, and the disclosure quote it rests on, are in **U2-S13's row in Table 3**; the editor's note in **U2-S20's row in Table 3 (continued)** records that the relabel was applied and why U2-S20's own cell was left at `vendor-self-description`. Read the next paragraph as history, not as state.

**(b) Original paragraph survives, unmoved** — `audit.md:162-164`, still the closing paragraph of "Target 1", still ahead of the `## Target 2` heading:

> **I have not relabelled U2-S13.** Its `Provenance` cell still reads `independent` and I left it untouched, per dispatch. This row exists so that an editor's relabel has a first-hand source to rest on.

Corroboration that it is unaltered, not merely present: the ledger's own C31 description characterises the passage as stating "that U2-S13 was not relabelled and that its provenance cell still reads independent" — which is what the retained text says, in the top-up collector's first-person voice ("per dispatch"), consistent with the surrounding Target 1 narrative. **Stated as a limit, not glossed:** I have no Bash/git, so this is corroboration by independent description, not a byte-level diff against a pre-edit snapshot. No pre-edit copy of `audit.md` exists anywhere in the run directory (I enumerated it: `manifest.json`, and `run/U1|U2|U3` each holding `audit.md` / `corrections.md` / `verification.md`, plus `U3/landing-confirmation.md`).

**(c) Cross-references resolve against current content** (located by content, not by any recorded line number):

| Marker claims | Current cell | Line |
|---|---|---|
| U2-S13 register-row `Provenance` | `compensated-third-party` (col. 5 of Table 3) | `audit.md:104` |
| U2-12 pattern-row provenance | `compensated-third-party / Product judgement` (col. 11 of Table 1) | `audit.md:73` |
| U2-S20 row records relabel applied + why its own cell stayed | "…it has been applied to U2-S13 and to U2-12's provenance cell (C1/C23). This row's own cell is left at `vendor-self-description`…" | `audit.md:380` |
| relabel attributed to C1/C23 | U2-S13 row prints "(C1/C23; editor, U2-S20 re-opened)" | `audit.md:104` |

All four resolve. The narrative/register contradiction the correction targeted is gone; no third stale locus of `independent` for U2-S13 remains (`compensated-third-party` occurs at lines 73, 104 ×3, 155, 380 — and the only surviving `independent` for U2-S13 is inside the explicitly-superseded paragraph, which is the intended outcome).

---

### Row 2 — C32

**ID description, verbatim from `corrections.md` line 41:**
> The C29 cell pre-empts the fading keyword trap but not two further near-miss strings in the same source, both confirmed to be difficulty-progression rather than assistance-withdrawal; record them so a re-checker need not re-derive them

**State: `LANDED`**

Anchor found once, `audit.md:30`, inserted inside the Seed B note after the "concreteness fading" trap sentence and before the concluding "**So U2-S1 supplies no shipped precedent…**" — which still follows intact.

**Both quotations re-read by me from the source, not from the brief.** I fetched `https://duolingo-papers.s3.amazonaws.com/reports/duolingo-method-whitepaper.pdf` myself and read rendered pp. 1-3 and 9-11 as page images. Rendered and printed page numbers coincide (page headers print "2", "9", "10", "11"); cover confirms "January 11, 2023 (19 pages)".

**Source, p. 2, §2.1 "Learn by Doing" (as I read it):**
> Then, careful repetition of content with the right amount of variation enables learners to gradually pick up patterns — patterns in everything from letter sounds to verb use to shape categories — even if they don't realize it.

**Source, p. 10, §3.2 "The Literacy App" → "Learn in a Personalized Way" (as I read it):**
> Following recommendations for gamified learning (Callaghan & Reich, 2018; Yee, 2013), the levels gradually scaffold learners to more difficult content as they progress through the curriculum.

Both audit quotations match character-for-character, including the parenthetical citation and its semicolon. Section and page attributions are correct: §2.1 begins on p. 2 (TOC: 2.1 → p. 2, 2.2 → p. 4), so the file's two different page locators for §2.1 (p. 2 here, p. 4 in the U2-S1 register row) are consistent with a section spanning pp. 2-4 — **not** a conflict.

**Substance — my own judgement, tested rather than accepted. Neither string is an assistance-fade.**

- **p. 10.** The verb takes content-difficulty as its destination: learners are scaffolded *to more difficult content*. Nothing is withdrawn. Decisively, the immediately preceding sentence in the same paragraph is the only help-mechanic sentence there, and it runs the other way: "When relevant, we also provide hints to help children improve, such as highlighting the initial letters in a text where a child is looking for words that start with a target letter." Help is provided conditionally; no withdrawal schedule attaches to it. This is nonetheless the whitepaper's closest keyword collision with Seed B ("gradually" + "scaffold"), so recording it was the right call.
- **p. 2.** The subject is what the learner acquires, not what the app removes. The clause the audit stops before — "even if they don't realize it" — and p. 3's naming of "implicit statistical learning" as the cognitive tool both confirm the editor's label. The omitted continuation *supports* the editor's reading rather than cutting against it.

**Both editor conclusions upheld; the absence claim stands.** I did not find a fade anywhere in pp. 1-3 or 9-11. Enumerated positively, the adjacent-but-not-fade material I read: p. 9 "AI-powered personalization adjusts the difficulty level so that learners can keep receiving language input that remains comprehensible and manageable. Additional personalized feedback is provided in the form of explicit tips in plain language when learners make grammatical errors" (adaptive difficulty + error-triggered help *added*); p. 3 "As learners progress through a course, Duolingo challenges them to engage with progressively more complex topics" (difficulty progression); p. 3 "Even in instances where learners aren't provided with explicit information about the concepts they are learning, they are expected to draw connections for themselves as they move to more and more complex topics" (designed non-provision, not withdrawal — p. 2 confirms explicit overviews are absent from the outset: lessons are designed "without the need to rely on explicit introductory overviews").

---

### Row 3 — terminal line and row integrity

- **Terminal line:** `VERDICT: Collected` occurs exactly once, at `audit.md:384`, the last line with content, nothing after it.
- **Row integrity — enumerated positively, by ID and by count.** Exactly 56 lines in the file begin with `|`, which decomposes with zero remainder: Table 1 (2 header + 13 rows, `U2-1`…`U2-13`, contiguous ascending), Table 2 (2 + 7), Table 3 (2 + 19, `U2-S1`…`U2-S19`, contiguous ascending), Table 1 continued (2 + 1, `U2-14`), Table 2 continued (2 + 1), Table 3 continued (2 + 3, `U2-S20`…`U2-S22`). No duplicate ID, no gap, no out-of-order ID, no stray table row. **Nothing was reordered, renumbered, added, or deleted.**
- **Limit stated, not glossed:** this is inventory evidence, not a diff. Without git I cannot certify byte-level non-change of cells I did not read.

### Row 4 — the editor's header block does not overstate

`audit.md:16-25` claims: "Source re-opened: U2-S1 (rendered PDF pp. 1–3 and 9–11 of 19 — both quoted pages fall inside the range the pass above had already read)." The pass above (`audit.md:9`) states it re-opened U2-S1 at "rendered PDF pp. 1–16 of 19". pp. 2 and 10 fall inside 1-16. **True as stated.** I independently read pp. 1-3 and 9-11 by the same route and found both quoted sentences there, so the read claim is not merely plausible but confirmed. "No claim changed in this follow-up" is also accurate: C31 inserts a marker over a retained passage and alters no register cell; C32 adds cleared near-misses to an absence argument that was already correct.

---

## Evidence

Sources opened by me this session: the U2 audit and ledger files (read directly), and the Duolingo method whitepaper PDF re-fetched from the vendor S3 locator and read as rendered page images at pp. 1-3 and 9-11. Every claim above rests on text I read myself; no characterisation was taken from the dispatch brief or from any prior record.

## Next

**Rows for the orchestrator to assign IDs to and reconcile centrally — I appended to no register.**

**Conflict-register row 1 (ledger state vs. artifact state) — remedy route: `editorial`, no collection.**
`corrections.md` rows 40 and 41 still carry state `NOT-LANDED` for C31 and C32, while every one of C1–C30 has a second row appended carrying `LANDED` (lines 42-70). Both C31 and C32 are in fact landed in `audit.md`. Under this repo's documented "corrections do not execute themselves" failure class, a ledger reading NOT-LANDED for a landed correction is exactly the drift that gets re-worked later. Remedy: append the two `LANDED` rows in the ledger's own convention. **This is a bookkeeping gap, not a defect in the landing.** Note also, for the orchestrator's map: C31/C32 are *not* the last two rows of the table as the dispatch stated — they sit at lines 40-41, followed by the 29 appended LANDED rows; the table has 61 data rows in two blocks.

**Observation row (offered, explicitly NOT recommended for landing).** The p. 2 quotation is a mid-sentence fragment ending before an em-dash appositive, with no ellipsis at either end. Under this file's own standard — C8 and C30 were landed "for consistency" for trailing truncation with no meaning change — a strict reading would want a trailing ellipsis. I do not recommend raising it: the omitted words ("— patterns in everything from letter sounds to verb use to shape categories — even if they don't realize it") *strengthen* the editor's characterisation, the fragment is integrated into the editor's own prose rather than presented as a complete sentence, and landing it would be over-correction of the kind this program was warned about. Recorded only so a later re-checker does not re-derive it. If the orchestrator wants strict uniformity, remedy route is `editorial`, one character, no collection.

**Source-lead row (optional enrichment, same class as C32 itself) — remedy route: `editorial`, no collection.** A third near-miss string exists on a page the follow-up editor already re-opened: p. 3 — "Even in instances where learners aren't provided with explicit information about the concepts they are learning, they are expected to draw connections for themselves as they move to more and more complex topics." A future keyword re-checker could read this as a fade. It is not: p. 2 establishes that explicit overviews are absent from the outset ("without the need to rely on explicit introductory overviews"), so this is designed non-provision, not withdrawal-as-competence-grows. If the orchestrator wants C32's pre-emptive coverage to be complete, this is the one string left to record, and the material is already in hand.

## Files

- `/home/roking/Desktop/Projects/blackjack/journal/raw/_inbox/2026-07-26-ldb-02-activity-patterns/run/U2/audit.md` (read only; C31 marker at 153-160, retained passage at 162-164, C32 sentence in the Seed B bullet at line 30, header block at 16-25, terminal line at 384)
- `/home/roking/Desktop/Projects/blackjack/journal/raw/_inbox/2026-07-26-ldb-02-activity-patterns/run/U2/corrections.md` (read only; C31 at line 40, C32 at line 41)
- `/home/roking/.claude/projects/-home-roking-Desktop-Projects-blackjack/7399fb2a-7c00-49e2-991d-e2595a51933a/tool-results/webfetch-1785098996223-fys8dx.pdf` (U2-S1 re-fetched by me and read at rendered pp. 1-3, 9-11)

**No files written.** Per dispatch ("Rows, not files"), this confirmation is returned as data rather than written into `verification/`. Nothing outside the run directory was touched, and nothing inside it was modified.

## Blocker

None.
