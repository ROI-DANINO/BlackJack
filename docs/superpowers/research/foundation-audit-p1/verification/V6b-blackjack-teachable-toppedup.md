# Verification Record: C6b — Blackjack as a teachable cognitive skill (focused-pass additions F7–F9)

> Verifier: Claude (Opus 4.8, 1M) — independent agent instance; NOT the C6 collector, NOT V6, NOT the C6-FP top-up collector  |  Date: 2026-07-19
> Contract: exists + supports + strength-honest. VERIFIED requires an exact supporting location.
> Every source is INDEPENDENTLY located by the verifier — the collector's summary is not trusted.
> Scope per V6b card: **Part 1 covers F7–F9 only.** F1–F6 were verified by V6; that pass stands and was not redone.

**Method note.** Per the shared brief's PDF/fetch hazard warning, I used no AI fetch-summary for any
quoted text. All three abstracts were downloaded with `curl` and text-extracted locally (regex HTML
strip), then compared to the dossier by exact string match after Unicode quote-character
normalisation. Bibliographic facts were confirmed against structured APIs (ERIC API, Semantic Scholar
graph API, Unpaywall, NCBI eutils), not against rendered pages. Where I could not read a passage, I
say so plainly.

**The hazard I was warned about.** Four people reaching 100% accuracy is exactly the result this
product wants to be true. I checked the "100%" number, the "3 of 4 won money" number, and the
generalisation-setting claim harder than anything else on this card. The 100% figure survives intact
and is correctly scoped in the dossier. The **setting** of the money-winning result does not — see F8.

| # | Claim | Source (id / title / URL·DOI) | Indep. located? | Exists | Supports | Strength honest | State | Supporting location (VERIFIED only) | Quality tier | Notes / downgrade |
|---|---|---|---|---|---|---|---|---|---|---|
| F7 | Peer-reviewed ABA study: BST + video rehearsal took 4 recreational gamblers from no accurate baseline counting to 100% accuracy under a changing-speed criterion; generalised to mock-casino play; 3 of 4 won money post-intervention | Speelman, Whiting & Dixon (2015), *J. Appl. Behav. Anal.* 48(3), 632–642. DOI 10.1002/jaba.225 · PMID 26173744 · ERIC EJ1073394 | YES — raw PubMed HTML downloaded and locally extracted; independently re-confirmed via **ERIC structured API** (`api.ies.ed.gov`, `id:EJ1073394`) **and** the rendered ERIC record page | YES | YES | **Mostly — two overreaches in the corrected gap paragraphs, not in the finding block** | **VERIFIED (two downgrades)** | **Abstract**, confirmed word-for-word on two hosts. Verbatim: "A behavioral skills training procedure that consisted of video instructions, video rehearsal, and video testing was used to teach 4 recreational gamblers a specific skill in playing blackjack (sometimes called card counting). **A multiple baseline design** was used to evaluate intervention effects... **Before training, no participant counted cards accurately.** Each participant completed all phases of the training protocol, **counting cards fluently with 100% accuracy during changing speed criterion training exercises.** Generalization probes were conducted while participants played blackjack **in a mock casino**... Afterwards, all 4 participants were able to count cards while they played blackjack... **After losing money during baseline, 3 of 4 participants won a substantial amount of money** playing blackjack after the intervention." ERIC independently confirms: v48 n3 p632-642, Sep 2015, Pages: 11, **Peer reviewed: T** | **Q3 — confirmed honest, and deliberately conservative** (see note) | Design and n are **exactly as stated**: multiple baseline across participants, n=4. Every bibliographic element checks out. Two downgrades below. |
| F8 | Author's dissertation states across three experiments that recreational players deviate significantly at greater cost than advertised, that self-reported strategy predicts casino outcomes poorly, and that BST generalised counting to a naturalistic setting with 3 of 4 winning money "in an actual casino" | Speelman, R.C. (2016), doctoral dissertation, Southern Illinois University Carbondale. https://opensiuc.lib.siu.edu/dissertations/1265/ | YES — OpenSIUC page downloaded, abstract locally extracted and diffed character-by-character against the dossier's quote | YES | **PARTIAL — the setting of the money-winning result is not supported** | **NO — "actual casino" overstates the source** | **VERIFIED (strength downgraded)** | **Abstract** (OpenSIUC, dissertations/1265). Verbatim on Experiment III: "The results indicate these skills could be taught using behavioral procedures and **generalized to a naturalistic setting. Following training, three participants won money in a casino setting**, likely improving the entertainment value and reducing the financial costs of the game." Access restriction confirmed verbatim: "This dissertation is only available for download to the SIUC community." | Q4 — acceptable pragmatic placement; the rubric has no clean slot for an unrefereed primary experimental report. The load-bearing guard here is the non-independence note, which **is** present | **Two downgrades + one label correction.** See below. The quoted span is verbatim exact (only a curly-apostrophe difference) — but it is **not "in full"** as labelled. |
| F9 | Blackjack played in both a real casino and a lab; significant condition differences in heart rate, gambling behaviour and sensation-seeking/arousal relations; casts doubt on lab gambling as a valid analogue | Anderson, G. & Brown, R.I.F. (1984), *Br. J. Psychology* 75(Pt 3), 401–410. DOI 10.1111/j.2044-8295.1984.tb01910.x · PMID 6487928 | YES — raw PubMed HTML downloaded and locally extracted; citation count independently recounted via Semantic Scholar graph API | YES | YES | **YES — hedge fully intact** | **VERIFIED** | **Abstract** (PubMed, PMID 6487928), quoted by the dossier genuinely **in full**. Verbatim, including the exact word order the pass claimed to preserve: "Significant differences between real and artificial casinos were found for mean heart-rate increases over base-lines, for gambling behaviour and in the relationships between sensation-seeking, arousal and gambling in the two conditions. **Doubt is cast on** laboratory gambling as a valid analogue of the real gambling situation." | Q3 — confirmed correct (comparative design over existing populations, not a randomised manipulation of transfer) | **Cleanest citation of the three.** The hedge is intact; the passive "Doubt is cast on" is preserved exactly as claimed, *not* strengthened to "casts doubt on" / "found" / "showed". Given this card's F4 history (a source's own hedge silently dropped, "suggested" rendered as "found"), I checked this specifically — the pass did what it said. The dossier's "466 citations" is **exactly right**: Semantic Scholar returns `citationCount: 466`, and the dossier honestly flagged it as not independently recounted. I recounted it. |

### F7 — the two downgrades

Both sit in the **rewritten coverage-gap paragraphs**, not in the F7 finding block. This matters:
the finding block is careful, and the gap paragraphs are what a downstream reader actually leans on.

1. **"Explicitly designed to approximate realistic table pace" is not in the source.** The Q2
   correction states F7 measures counting accuracy under "a **changing-speed criterion** explicitly
   designed to approximate realistic table pace." The abstract says only "counting cards fluently
   with 100% accuracy during changing speed criterion training exercises." It says nothing about
   *why* the speeds changed or what pace they approximated, and **the full text is unread**. Whether
   those speeds resemble a real casino table is unestablished. This matters more than a normal
   wording slip, because Q2's original declared gap was *precisely* "counting accuracy under
   realistic table speed" — so this phrase is doing the work of falsifying the gap. **Downgrade:** the
   honest statement is that a changing-speed criterion was used and the gap is *narrowed*; that it
   approximates realistic table pace is unverified pending full text.
2. **"Zero baseline accuracy" overstates "no participant counted cards accurately."** The Q2
   paragraph says "from zero baseline accuracy" and the F7 headline says "no baseline card-counting
   accuracy." The source says participants did not count *accurately* — which means below criterion,
   not necessarily 0%. Q1's paragraph gets this right ("no accurate performance at baseline"), and
   F7's own caveat is careful about it. Q2 slips. Minor, but it inflates the before/after contrast.

**What F7 got right, and I want on the record because it was the temptation.** The "100% accuracy"
figure is the single most inflatable number on this card. The dossier keeps it tied to *changing-speed
criterion training exercises* everywhere it appears, and never lets it attach to the mock-casino
generalisation probes — for which the abstract reports only "were able to count cards," with **no
accuracy figure at all**. That distinction is preserved in the F7 headline, in the F7 quote, and in
both the Q1 and Q2 corrected paragraphs. This is the discipline the card was worried about, and it
held.

**On the Q3 tier.** The card asked whether Q3 is honest or should sit lower. It should **not** sit
lower. A multiple-baseline design with staggered baselines is a genuine experimental control, not an
observational study — by the rubric's own definitions it is nominally **Q2** (primary controlled
experiment). The dossier tiered it *down* to Q3 for n=4, which is a rubric-sanctioned downgrade
("downgrade tier if the source is weaker than the citing claim implies") and errs **against** the
product's interest. That is the correct direction of error. Q3 confirmed as honest and conservative.

### F8 — the downgrades

1. **"In an actual casino" is not supported and contradicts the dossier's own F7.** F8's finding
   headline reads: "...generalized card-counting to a naturalistic setting with 3 of 4 trained
   participants subsequently winning money **in an actual casino**." The source says "three
   participants won money **in a casino setting**" and "generalized to a **naturalistic setting**."
   It never says "actual." Meanwhile F7 — which this same dossier argues is very likely *the same
   study* — states the probes were in a **mock casino**. So the dossier's own two findings describe
   one result as "mock" in one place and "actual" in another. **This is the exact overcorrection the
   card warned about:** it upgrades a mock-casino training result into a real-money casino result,
   which is the version a blackjack-training product would most like to be true. **Downgrade:** F8
   may be cited only for "won money in a casino setting" / "a naturalistic setting," with F7's
   "mock casino" as the more specific and more reliable characterisation of the same probes.
   (Note the dissertation *does* use "authentic casino outcomes" — but that is **Experiment II**, the
   self-report/outcome-variance study, not the Experiment III training result. The two are conflated.)
2. **"Exact quote... in full" is inaccurate.** The quoted span is verbatim correct — I diffed it
   character-by-character and it matches but for a curly apostrophe. However it is **not the full
   abstract**: four opening sentences are omitted before it, and one sentence after it — "Overall the
   results suggest recreational players make significant errors and would likely benefit from
   training procedures designed to educate and promote optimal choice." In fairness, the omitted
   closer is *pro-training* and hedged ("suggest," "likely"), so the omission does **not** inflate the
   dossier's case and arguably under-claims. The label is still wrong and should read "abstract,
   Experiments I–III sentences" rather than "in full."
3. **The same-study identification is sound, but its stated basis is not exact.** The dossier argues
   F7 and F8 are one study because "the '3 of 4 participants won money' figure matches F7's abstract
   **exactly**." It does not match exactly: the dissertation says "three participants," not "3 of 4."
   The identification is nonetheless well-supported (same author, same PI, same procedure, three
   winners, overlapping timeframe) — I am correcting the stated basis, not the conclusion.

**Double-counting check — the card's central F8 question.** The dossier does **not** present F7 and
F8 as two independent pieces of evidence *within the F8 finding block*, which states plainly: "this
is **not** independent corroboration of F7, it is very likely the same study reported in a second
venue," and buckets it "corroborating/method-context only." That guard is explicit and correct.
**However**, the Q1 coverage-gap paragraph says F7 is "**corroborated by** Speelman's 2016 SIU
dissertation (F8)" and does not carry the same-study caveat in that paragraph. A reader working from
the coverage-gaps section alone — which is the section downstream work will actually quote — would
reasonably read that as independent corroboration of an n=4 result. Flagged as a residual
double-count risk in the corrected paragraph, not in the finding.

### The access claim — independently tested, and it holds

The card told me to test this sceptically, because V6 had already overturned one "unreachable" claim
on this card (F5's 403 turned out to be referer-gating and V6 retrieved the full 43-page PDF). **This
time the claim survives**, and I tested a route the pass never tried:

| Route | F7 (10.1002/jaba.225) | F9 (10.1111/j.2044-8295.1984.tb01910.x) |
|---|---|---|
| `curl` + browser UA + `Referer: pubmed.ncbi.nlm.nih.gov` (the exact trick that beat F5) | **403** — Cloudflare "Just a moment..." interstitial | **403** — same |
| `curl` on `/doi/epdf/` variant | **403** — same | n/a |
| Unpaywall API | `is_oa: false`, `oa_status: closed`, `oa_locations: []` | `is_oa: false`, `oa_status: closed`, `oa_locations: []` |
| Semantic Scholar graph API | `openAccessPdf.status: CLOSED` | `openAccessPdf.status: CLOSED` |
| NCBI eutils PMC search + `elink` | no PMC deposit | no PMC deposit — the `elink` hits are `pubmed_pmc_refs` (articles *citing* it), not the article |
| **Real headless Chromium via Playwright (JS-capable) — NOT tried by the pass** | **403**, title "Just a moment...", body resolves to "Performing security verification... Ray ID: a1dc5124fd45fce5" | **403**, same, Ray ID a1dc51758e2897c2 |

**Finding:** the pass's "five routes" were **all non-JS clients** (curl + four REST APIs), which by
construction cannot pass a JavaScript challenge — so its conclusion "unreachable by any route" was
not actually tested against the one client class that could have succeeded. I closed that hole by
running a real JS-capable browser. It also fails. The block is genuine, the articles are genuinely
closed access on two independent OA indexes, and **the pass's access claim is confirmed rather than
inherited.** F5's referer-gating was a softer wall; this one is not.

**One calibration note on F7's "two-host convergence."** The pass contrasts F7's PubMed/ERIC
agreement against "the single-source-plus-echo pattern this same dossier's F2 warns against." That
contrast is directionally fair but slightly overstated *in kind*. PubMed and ERIC are genuinely
different hosts (NLM vs. IES) and their agreement does conclusively rule out a fabricated or drifted
fetch-summary — which is what the pass claims it for, and which is the program's core risk. But ERIC
records `Abstractor: As Provided`, i.e. both hosts ultimately transcribe the **same
publisher-deposited author abstract**. It is two-host *transcription fidelity*, not two independent
observations of the study. F2's problem was different and worse: a substantive statistic with
ambiguous provenance between two publications. No downgrade — the claim does the work it is used for.

## Resolution log (every citation that was UNVERIFIED at any point)

| # | Which point failed (exists / supports / strength) | Move taken (re-check · downgrade · drop) | Terminal state | Note |
|---|---|---|---|---|
| F7 | **strength** — Q2 gap paragraph asserts the changing-speed criterion was "explicitly designed to approximate realistic table pace" (unsupported at abstract level, full text unread); "zero baseline accuracy" overstates "no participant counted cards accurately" | **(b) downgrade** — re-verified the weakened claims against the locally-extracted abstract on two hosts | **VERIFIED (downgraded)** | Citation survives fully. The falsification of Q2's gap survives too, but as *narrowing*, not as a clean refutation of the "realistic table speed" element specifically. |
| F8 | **supports/strength** — "in an actual casino" unsupported by the source and contradicted by F7's "mock casino"; quote mislabelled "in full"; stated basis for same-study identification not exact | **(b) downgrade** — re-verified the weakened claim ("won money in a casino setting," "naturalistic setting") against the character-diffed abstract | **VERIFIED (downgraded)** | Citation survives as corroborating/method context. The "actual casino" wording must not propagate downstream. |
| F9 | none — passed all three points on first check | n/a | **VERIFIED** | Quote confirmed in full and verbatim; hedge and word order intact; citation count independently recounted at 466. |

## Kills (citations dropped — the claim lost this support)
- **None.** All three citations survive. Two carry strength downgrades (F7, F8); one is clean (F9).
  Recording plainly that this pass killed no citation: the three sources are real, correctly
  attributed, correctly dated and paginated, and their abstracts say what the dossier says they say.
  What this pass caught is **wording drift in the rewritten gap paragraphs and one inflated setting
  claim** — not fabrication.

## Quarantine (UNVERIFIABLE — could not be reached at all)
- **None at the citation level.** F7 and F9 full texts remain unreachable (six routes, including a
  real browser — see table above) and F8's full text is SIUC-restricted, but all three are verified at
  abstract level, which is the level at which the dossier cites them. Already logged as
  source-lead-register row 26 by the pass; I confirmed that row exists and add no duplicate.

## Conflicts surfaced during verification
- **New — conflict-register #27.** The two reports of what the dossier itself argues is a *single*
  study describe the money-winning setting differently: JABA (F7) says the generalisation probes were
  in a **"mock casino"**; the dissertation (F8) says three participants "won money **in a casino
  setting**," and the dissertation's Experiment II separately invokes "**authentic** casino outcomes."
  Whether the 3-of-4 money result occurred with real money in a real casino or with chips in a mock
  one is **the** load-bearing question for how much that result can carry in a training product, and
  the two abstracts do not settle it. Appended as row 27; left **open** — neither full text is
  reachable to resolve it.
- Conflict-register #26 (the F7-vs-F9 transfer tension) was appended by the pass as claimed. I
  confirmed the row exists and is logged **open**. No duplicate added.

## Dossier sufficiency (SECOND AXIS — judged independently of citation states)

**Verdict: SUFFICIENT**

Coverage assessed against: major evidence traditions · landmark sources · opposing positions ·
every required sub-question in the card's scope.

- **Traditions/landmarks/positions present (F1–F9):** gambling studies (F2, F4, F5, F6); judgment &
  decision-making (F1, F3); real-casino field observation (F1, F2, F5); lab experimentation (F3, F4);
  gambling-research methodology (F6); **applied behaviour analysis / behavioural-skills training (F7,
  F8)** — the tradition V6 correctly identified as missing; and the **blackjack lab-vs-casino transfer
  landmark** (F9, 466 citations). The gap V6 found is closed.
- **Required sub-questions answered: 4 of 4**, in the sense the standard actually requires — each now
  has either evidence or an absence I independently confirmed is real. Q1: answered at n=4, with
  population-scale efficacy and retention still untested and *said to be untested*. Q2: acquisition
  and speed answered at n=4 (with my downgrade on "realistic table pace"); working-memory mechanism
  still absent — confirmed genuinely absent below. Q3: honest coverage gap, verified by V6, untouched
  by the pass. Q4: answered from **both** sides, as a live conflict.

### Searches I ran to test for what is NOT there

My session's WebSearch budget was exhausted, so I ran these through bibliographic APIs directly —
which is a **stronger** instrument for the specific question "does this literature contain more than
three papers," since these are exhaustive database queries rather than ranked web results:

1. **PubMed** `"card counting"[Title/Abstract]` → **exactly ONE record in the entire database**:
   Speelman et al. 2015 (F7).
2. **PubMed** `blackjack AND (training OR teaching OR instruction)` → 12 records; the only training
   study is F7. The rest are neuroscience of risk/reward, ovarian-cancer prediction, and bluegrass
   transcriptomics.
3. **PubMed** `blackjack[Title/Abstract]` → full 40-record listing reviewed by hand. Only two
   blackjack-skill papers exist in it: F3 (Stone et al. 2023, already in the dossier) and F7. The
   remainder are plant science ("blackjack" the weed *Bidens pilosa*), genomics, and fMRI.
4. **Crossref** `behavioral skills training blackjack casino strategy replication extension` → **no
   replication-and-extension paper**. Returns F7 itself plus mathematics/probability texts.
5. **Crossref** `blackjack card counting training` → 24 hits, **entirely** mathematics, computer
   science, statistics, and law. Zero training-intervention studies.
6. **Crossref** `teaching blackjack basic strategy gamblers intervention` → same profile; no
   instructional-intervention study.
7. **Semantic Scholar forward-citation graph of F7** (the decisive one) → **7 citing papers, none of
   them a blackjack follow-up.** They cite F7 as a *methodological exemplar* of behavioural skills
   training in unrelated domains: youth-football tackling, motor skills for individuals with
   developmental disabilities, baseline-trend extrapolation, randomisation in multiple-baseline
   designs.
8. **ERIC API** `id:EJ1073394` + rendered record → bibliographic confirmation and abstract cross-check.

### Why this makes SUFFICIENT the honest verdict

**The card asked whether 3 citations is genuinely what the literature supports, or whether a
competent searcher would find more. I searched, and 3 is what exists.** Search 1 is close to
dispositive: in the whole of PubMed, "card counting" appears in exactly one title/abstract. Search 7
settles the specific open question — a paper with only 7 citations, none of which builds on it in its
own domain, has not been replicated or extended. **V6's named "Using Behavioral Skills Training to
Improve Casino Blackjack Strategy: Replication and Extension" has no bibliographic footprint in
Crossref, ERIC, Semantic Scholar, or PubMed.** The pass was right to decline to cite it, right to
decline to pad from 3 to the 4–6 floor, and right to log it as a lead instead of guessing. That
restraint is the correct behaviour and it is now independently evidenced rather than merely asserted.

The dossier's remaining declared gaps are **honest reported absences, which the shared brief tells me
is thoroughness rather than insufficiency** — and I confirmed the most important one directly:
working-memory load as a mechanism of counting is untested because, per search 1, essentially *no*
card-counting cognitive-psychology literature exists at all.

### The three things the card asked me to confirm

1. **Corrected paragraphs.** Q1, Q2 and Q4 carry explicit `[corrected by C6-FP]` markers. **Q3 carries
   no marker and reads consistently with V6's description of it — untouched, as claimed.** F1–F6:
   I cross-checked V6's own verbatim quotations *of the dossier* against the current text — F1's
   "§2.1.1" supporting location, F2's "three independently-worded secondary summaries," F4's quote
   still missing "in part," F5's open question about quantitative data — all still present exactly as
   V6 recorded them, so F1–F6 are unaltered.
   **One mismatch I could not adjudicate, disclosed rather than glossed:** V6 states the dossier
   renders Gainsbury's "less likely to return follow-up questionnaires" as "less likely to return
   following the initial study." That phrase does not appear in the current F6, which reads "venue
   participants gave less-complete survey responses." Either V6 paraphrased loosely or F6 was touched.
   The content is trivial either way, and **a byte-level diff would require git, which my brief bars
   me from running** — so I record the discrepancy rather than resolve it.
   **Do the corrections understate the remaining limits?** Q1: **no** — it states n=4 three times and
   closes with the honest formulation "*a controlled training intervention exists and works at n=4;
   population-scale efficacy and retention remain untested*," which is exactly the sentence the card
   worried would be missing. Q4: **no** — limits on both sides are explicit. **Q2: slightly yes**, via
   the "realistic table pace" overreach downgraded above.
2. **The Q4 conflict.** Both sides are represented fairly and neither is quietly favoured. Each side
   gets a direct quote and its own limiting caveat; the paragraph states "Neither source resolves the
   other" and explains precisely *why* they answer different questions; it is logged open in register
   row 26, which I confirmed exists. Note the asymmetry runs **against** the product's interest: the
   pro-transfer side (F7) is the one carrying the explicit qualifier that a mock casino "is not
   authentic money/social stakes." That is the right direction for a product that would prefer
   transfer to be established.
3. **What is still missing.** Nothing that would materially move the conclusions — see the eight
   searches above. **Limit on my own coverage, stated plainly:** with WebSearch unavailable I could
   not search grey literature — ABAI conference programmes, ProQuest, or Google Scholar — which is
   precisely where source-lead row 26 says a future pass should look for the putative replication.
   This does not change my verdict, because the dossier **declines to cite** that lead and logs it as
   unconfirmed; but I am not claiming coverage I do not have.

## Verifier summary
- VERIFIED: **3**  |  UNVERIFIABLE: **0**  |  DROPPED: **0**
- **UNVERIFIED remaining: 0**
- **Dossier sufficiency (whole enlarged dossier, F1–F9): SUFFICIENT**
- Claims the collector overstated (strength downgraded):
  - **F8** — "3 of 4 trained participants subsequently winning money **in an actual casino**" → the
    source says "three participants won money **in a casino setting**" / "generalized to a
    **naturalistic setting**," and F7 (the same study) says the probes were in a **mock casino**. The
    "actual casino" framing must not propagate. Also: the quote is labelled "in full" but omits four
    opening sentences and the concluding sentence; and the same-study identification's stated basis
    ("matches F7's abstract exactly") is not exact — "three participants" vs "3 of 4 participants."
  - **F7** — the Q2 corrected paragraph's "changing-speed criterion **explicitly designed to
    approximate realistic table pace**" is unsupported at abstract level with the full text unread;
    and "zero baseline accuracy" overstates the source's "no participant counted cards accurately."
  - **F7/F8 residual double-count risk** — the Q1 paragraph's "corroborated by" wording drops the
    same-study caveat that the F8 finding block states correctly.
- Citations whose supporting location differed from the collector's: **none** — all three are
  abstract-level as proposed, and I confirmed each abstract at that exact location. For F7 I obtained
  the abstract at a *second* independently structured location the pass did not cite (the ERIC
  REST API record, as distinct from the ERIC web page).
- Access claims tested rather than inherited: **the pass's "unreachable" claim is CONFIRMED** for F7
  and F9 — including against a real JS-capable headless browser, a client class none of the pass's
  five routes covered. Unlike V6's experience with F5 on this same card, this wall is real.
