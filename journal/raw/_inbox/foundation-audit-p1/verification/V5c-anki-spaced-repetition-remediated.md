# Verification Record: V5c — C5 sufficiency top-up additions (F16–F19) + whole-dossier sufficiency re-judge

> Verifier: Claude (Opus 4.8) — INDEPENDENT of the collector, of V5, V5b, and of C5-REM  |  Date: 2026-07-20
> Contract: exists + supports + strength-honest. VERIFIED requires an exact supporting location.
> Every source is INDEPENDENTLY located by the verifier — no collector-supplied quote is trusted.
> **Scope: F16–F19 ONLY.** F1–F15 stand on V5 and V5b; they were re-checked only for tampering
> (see "Append-only compliance"), not re-verified.

## Method note — I deliberately used a STRONGER route than the collector

The collector disclosed that this pass used WebFetch rather than V5b's local `curl` + `pdftotext` +
`grep -F` path, and correctly called that a reason for closer scrutiny. I therefore did not repeat
its route. **All four sources were downloaded with `curl` and extracted locally with `pdftotext`
(both `-layout` and flow mode), and every claimed quote was matched with `grep -F` against the local
text file.** I never relied on a fetch summary: I either matched a literal string in a local file or
I did not. For F16 I used the **Nature publisher PDF**, not the collector's PMC/text-proxy route, so
the figures were cross-checked across two independent routes and two independent hosts.

Mastheads for all four were established independently from the **Crossref REST API** before any PDF
was opened, so bibliographic detail was never taken from a page summariser.

Retrieval results (all four succeeded; no source was UNVERIFIABLE):

| # | Route | Result |
|---|---|---|
| F16 | `nature.com/articles/s41598-024-65753-3.pdf` | 45pp, extracted clean |
| F17 | `link.springer.com/content/pdf/10.1007/s10648-024-09892-z.pdf` | 38pp, extracted clean (no IdP redirect with a browser UA) |
| F18 | `http://www.lscp.net/persons/ramus/docs/EPR20.pdf` | 29pp, extracted clean; **typeset version of record**, not a preprint (page footers read "Educational Psychology Review (2021) 33:959–987") |
| F19 | `pdf.retrievalpractice.org/spacing/Carpenter_etal_2012_EDPR.pdf` | extracted clean, full body; **typeset version of record** (header "Educ Psychol Rev (2012) 24:369–378", Springer 2012 copyright line) |

**Both sources V5b recorded as "could not be read" are genuinely readable and were genuinely read.**
The collector's claim to have read them in full — which my card correctly flagged as exactly the kind
of claim that must not be taken on trust — **is true.** I read both myself, from the same hosts, and
every quote attributed to them matched.

Two grep misses were **my own extraction artefacts, not dossier errors**, and are recorded so they
are not mistaken for real ones: (a) `Bird (2010) … English-learning adults' understanding` failed on
a typographic-vs-ASCII apostrophe; (b) F17's `calling into question the generalization of the CI
model to PE and sports practices` failed because a running header and an author footnote are
interleaved into the sentence in the PDF text stream. Both are verbatim in the source.

| # | Claim | Source (id / title / URL·DOI) | Indep. located? | Exists | Supports | Strength honest | State | Supporting location (VERIFIED only) | Quality tier | Notes / downgrade |
|---|---|---|---|---|---|---|---|---|---|---|
| F16 | Pro-CI 2024 meta-analysis: medium significant retention benefit overall (SMD 0.63), but **non-significant in applied settings** (SMD 0.23, p = 0.24) | Czyż, Wójcik, Solarská & Kiper (2024), *Scientific Reports* 14:15974 · DOI 10.1038/s41598-024-65753-3 | Yes — publisher PDF from nature.com, `pdftotext`, 45pp (a *different route from the collector's*) | ✔ | ✔ | ✔ | **VERIFIED** | **Crossref masthead** (*Scientific Reports* 14(1), art. 15974, 2024-07-10, 4 authors: Czyż Stanisław H., Wójcik Aleksandra M., Solarská Petra, Kiper Paweł); **Abstract** ("We screened full texts of 294 studies, of which 54 were included in the meta-analysis"; "In the meta-analyses, two different models were applied, i.e., a three-level mixed model and random-effects model with averaged effect sizes from single studies"; "We found that the random practice schedule in laboratory settings effectively improved motor skills retention. On the contrary, in the applied setting, the beneficial effect of random practice on the retention was almost negligible"); **Results → Three-level mixed model** (overall SMD = 0.63 (95% CI: 0.33, 0.93; p < 0.001); "covered 54 primary studies and included 2068" participants); **Results → Random-effects model with averaged SMDs** ("The analysis based on averaged SMDs (form one study) yielded the following: SMD = 0.71 (95% CI: 0.41, 1.01; p < 0.001)"); **Results → setting subgroup** (laboratory SMD = 0.92 (0.48, 1.36; p < 0.001); applied "The non-significant pooled effect size based on the three-level meta-analytic model was small SMD = 0.23 (95% CI: -0.16, 0.62; p = 0.24)"); **Discussion** ("When applying the three-level mixed model … (SMD = 0.63). Analysis with the random-effects model on averaged outcomes for singles studies yielded similar results … (SMD = 0.71)"); **Competing interests** ("The authors declare no competing interests") | Q1 | **Every figure verbatim. The two-model claim is exactly right** — see the dedicated section below. The `[sic]` on "statically insignificant" is confirmed as the source's own typo. Q1 warranted (systematic review + multilevel meta-analysis). No vendor interest. |
| F17 | Critical 2024 multilevel meta-analysis: only 37 of 183 pooled outcomes (20%) agreed with the paradoxical CI effect; generalizability of the CI model called into question | Ammar, Trabelsi, Boujelbane, Salem, Boukhris, Glenn, Zmijewski, Jahrami, Chtourou & Schöllhorn (2024), *Educational Psychology Review* 36(2) art. 57 · DOI 10.1007/s10648-024-09892-z | Yes — publisher PDF from link.springer.com, `pdftotext`, 38pp | ✔ | ✔ | ✔ | **VERIFIED** | **Crossref masthead + PDF byline + running footer** (*Educational Psychology Review* 36(2), art. 57, 2024, **10 authors**, exactly as listed; footer "Educational Psychology Review (2024) 36:57"); **Abstract** ("A total of 933 records from five electronic databases were screened using the PICOS criteria, of which 36 studies were selected"; "Out of 183 overall pooled outcomes, Δ in only 37 performance outcomes (20%) agreed with the paradoxical CI effects on the acquisition or the relatively permanent gains"; "No statistically significant overall difference was detected for 'Δ pre-post' … (effect size (ES) = 0.1, p = 0.35)"; the full two-step retention sentence, quoted below); **Abstract → conclusion** ("These findings found very limited evidence supporting the recommendation to employ high CI practices to gain a longer-term performance advantage, calling into question the generalization of the CI model to PE and sports practices"; "High-quality follow-up research evaluating alternative motor-learning models are therefore needed"); **Declarations** ("Competing Interests The authors declare no competing interests"; "Funding Open Access funding enabled and organized by Projekt DEAL") | Q1 | **Every figure and both clauses of the retention sentence verbatim.** The fabricated venue is definitively refuted and no trace of it survives — see below. Q1 warranted. Schöllhorn's differential-learning commitment is real and the dossier discloses it. |
| F18 | 2021 meta-analysis of spaced retrieval practice: g = 0.74 is the **publication-bias-corrected** figure (raw g = 1.01); perceptual and motor learning excluded **by inclusion criterion**; no moderator significant | Latimier, Peyre & Ramus (2021), *Educational Psychology Review* 33, 959–987 · DOI 10.1007/s10648-020-09572-8 · lscp.net/persons/ramus/docs/EPR20.pdf | Yes — PDF downloaded, `pdftotext`, 29pp, version of record | ✔ | ✔ | ✔ | **VERIFIED** | **Crossref masthead** (EPR vol. 33, pp. 959–987; issued online 2020-10-07, **print volume 33 = 2021**, so the dossier's "2021" is correct); **Abstract** ("We carried out meta-analyses on 29 studies…"; "Results from subset 1 indicated a strong benefit of spaced retrieval practice in comparison with massed retrieval practice (g = 0.74)"; "(g = 0.034)") — **and the abstract states no other subset-1 effect size, confirming it reports only the corrected figure**; **Results → Subset 1, Weighted Mean Effect Size** ("The overall weighted mean effect size across all 39 effect size estimates was g = 1.01 (95% CI [0.68, 1.34], p < 0.0001) with an estimated between-study SE of 0.15"); **Results → Publication Bias Analysis** (significant Egger's test t = 4.41, d.f. = 37, p < 0.0001; "we used the trim-and-fill method … The overall weighted mean effect size was reduced to g = 0.74 (95% CI [0.55, 0.91], p < 0.0001)"); **Method → inclusion criteria** ("we focus on semantic and verbal stimuli learning (including mathematics problems). Thus, studies on perceptual and motor learning were excluded"); **Method → Type of Material (Stimuli)** (the "pairs … versus others" coding, verbatim); **Table 4** (subset 1: retention interval β = 0.02, p ≈ 0.78; stimuli β = −0.32, p ≈ 0.24 — **all subset-1 moderators non-significant**); **Discussion → Limitations** (the power caveat and the "diversity of experimental settings … was limited" and "Ultimately, meta-analyses cannot make new results emerge…" quotes); **Conflict of Interest** (none declared; ANR/PSL public funding) | Q1 | **All figures verbatim. The bias-correction claim is correct and is a genuinely non-obvious catch** — see below. One **precision nuance** on the finding headline, recorded but *not* a downgrade. |
| F19 | Landmark spacing-generalization review; its enumerated exceptions are grammar rules, spelling, reading, biology, an abstract maths task, coordinated motor skills — none a taught situation→action rule | Carpenter, Cepeda, Rohrer, Kang & Pashler (2012), *Educational Psychology Review* 24, 369–378 · DOI 10.1007/s10648-012-9205-z · pdf.retrievalpractice.org | Yes — PDF downloaded, `pdftotext`, version of record | ✔ | ✔ | ✔ | **VERIFIED** | **Crossref masthead + PDF header** (EPR 24(3):369–378, 2012, 5 authors as listed; "REVIEW ARTICLE"; "Published online: 4 August 2012"); **Abstract** ("we review research findings of the types of learning that benefit from spaced study, demonstrations of these benefits in educational settings, and recent research on the time intervals during which spaced study should occur in order to maximize memory retention"); **generalization section** ("The vast majority of studies on the spacing effect have been conducted in the laboratory, and these studies typically require participants to learn relatively simple types of verbal information such as word lists or trivia facts"; "Recently, however, new findings have emerged showing that spacing can also improve learning of information that is conceptually more difficult"; "For example, Bird (2010) found that longer spacing gaps improved English-learning adults' understanding of subtle grammatical rules"; "Spacing has also been shown to improve learning in other tasks that might be considered complex forms of learning, such as spelling (Fishman et al. 1968), reading skills (e.g., Seabrook et al. 2005), and biology (Reynolds & Glaser, 1964)"; "Spacing effects were found in two recent experiments in which college students learned a moderately abstract mathematics task (Rohrer & Taylor 2006, 2007)"; "Benefits of spacing have also been reported for tasks involving coordinated motor skills"); **spacing-gap section** ("A comprehensive comparison of various spacing gaps and test delays involving three or more learning sessions has yet to be carried out") | **Q4** | **Exception list verbatim and, importantly, COMPLETE** — I read the whole review, including the sections the dossier does not quote, and found no seventh task type. **Q4 is definitively correct** — see below. |

### F16's two-model claim — the direct analogue of the Phase 1 fixed-vs-random defect

My card told me to get this exactly right, because Phase 1's signature defect was a fixed-effect
figure reported as random-effects. **The dossier gets it exactly right.** Verbatim from the source:

- Three-level mixed model, overall: *"The pooled effect size based on the three-level meta-analytic
  model was medium SMD = 0.63 (95% CI: 0.33, 0.93; p < 0.001)."*
- Under the heading **"Random-effects model with averaged SMDs"**: *"The analysis based on averaged
  SMDs (form one study) yielded the following: SMD = 0.71 (95% CI: 0.41, 1.01; p < 0.001) (Fig. 3)."*
  (*"form"* is the source's own typo for *from*.)

Both figures exist, both CIs are exact, and **each is attributed to the correct model.** The dossier
additionally states that both are random-effects family and are not interchangeable, which is
accurate. This is the defect-class the program keeps catching, and here it is handled correctly and
pre-emptively flagged by the collector rather than being caught by a verifier.

**Applied-setting subgroup confirmed non-significant**, verbatim, including the negative lower bound:
*"The non-significant pooled effect size based on the three-level meta-analytic model was small
SMD = 0.23 (95% CI: -0.16, 0.62; p = 0.24)."* The dossier's judgement that this is "the single most
decision-relevant number here" for an applied trainer is a defensible product reading, and it is
labelled as such rather than smuggled in as a source claim.

### F17 — the fabrication near-miss, independently adjudicated

The collector reported that a fetch-summariser returned *"Educational Research Review, 39, 100537"*
with a **7-author** list, rejected it, and re-established the masthead from Crossref. **I confirm the
collector's correction and the fabrication both.**

Independently from the Crossref API and then independently again from the publisher PDF's own byline
and running footer:

- Venue: ***Educational Psychology Review*** — not *Educational Research Review*.
- Volume/issue/article: **36(2), article 57** — not *39, 100537*. The PDF's own running footer reads
  `Educational Psychology Review (2024) 36:57`.
- Authors: **10** — Ammar, Trabelsi, Boujelbane, Salem, Boukhris, Glenn, Zmijewski, Jahrami, Chtourou,
  Schöllhorn — not 7.

**I searched the entire dossier for surviving traces of the fabricated detail and found none.** The
strings "Educational Research Review", "100537" and any 7-author rendering do not appear anywhere in
the file. The dossier, the collection report, and register-correction text all carry the
Crossref-confirmed masthead. **No fabricated detail survived anywhere.**

This is the strongest single piece of evidence for the collector's good faith in this pass: it caught
a fabrication that would have been very hard for a verifier to distinguish from an honest citation
error, and it disclosed it unprompted.

### F17 is genuinely un-quotable half-way, and the dossier does not quote it half-way

Confirmed verbatim from the abstract, as one continuous passage:

> *"An overall significant difference (p = 0.001) in favor of high CI practice was detected in 'Δ
> post-retention.' However, this difference was not large enough (ES = − 0.35) to produce an overall
> greater long-term gain following high (24.56 ± 4.4%), compared to low (21.9 ± 9.8%) CI (ES = − 0.13,
> p = 0.18)."*

The collector's hazard warning is **correct and material**: the first clause on its own reads as a
significant retention win for high CI, which is the opposite of the paper's stated conclusion
(*"very limited evidence supporting the recommendation to employ high CI practices to gain a
longer-term performance advantage"*). **The dossier quotes both clauses, joined by the authors' own
"However," and explicitly instructs that it must not be quoted half-way.** This is precisely the
inherited-ellipsis meaning-reversal failure mode from Phase 1, and the dossier inoculates against it
rather than committing it.

### F18's g = 0.74 — confirmed, and this is a genuinely non-obvious catch

Both numbers confirmed verbatim, and — the load-bearing part — **the abstract reports only the
corrected figure.** The abstract's sole subset-1 effect size is *"a strong benefit of spaced
retrieval practice in comparison with massed retrieval practice (g = 0.74)."* The raw pooled
estimate g = 1.01 appears **only in the Results body**, and the trim-and-fill correction is applied
after a significant Egger's test (t = 4.41, d.f. = 37, p < 0.0001) that the authors themselves say
makes it "likely that publication bias has occurred… the mean effect size may be overestimated."

Anyone citing this landmark from its abstract — the overwhelmingly common path — would report 0.74
as the pooled estimate without knowing it is bias-corrected. **The dossier catches this and names the
model on both figures.** I credit it as a real find, not a bookkeeping detail.

**Inclusion criterion confirmed verbatim**, and it is decisive for the sufficiency argument:
*"we focus on semantic and verbal stimuli learning (including mathematics problems). Thus, studies on
perceptual and motor learning were excluded."*

**Precision nuance (recorded, NOT a downgrade).** F18's finding *headline* asserts "no moderator,
including stimulus type, reached significance." I checked this against Table 4 for **both** subsets
rather than only subset 1. It is **literally true** — the nearest thing to a significant moderator is
subset 2's number-of-exposures at **p = 0.09**, which the authors describe as "might have an effect."
However, the paper's own *abstract* frames that same moderator affirmatively ("Moderator analyses on
this subset showed that the number of exposures … explains inconsistencies between studies"), so a
reader comparing the dossier headline to the abstract could think they conflict. They do not. The
dossier's finding body correctly scopes its moderator claims to "in subset 1." **No correction
required; recorded only so a future reader does not re-open this as a discrepancy.**

### F19's Q4 grade is warranted — and I checked this against the source's own content, not its label

The collector graded F19 **Q4** (narrative review) rather than Q1, despite "REVIEW ARTICLE" in the
journal's own labelling and ~474 citations. **This is correct, and I verified it structurally rather
than taking it on argument.** I counted every meta-analytic marker in the full text:

- Occurrences of "pooled", "Hedges", "random-effects", "SMD", "95% CI", "effect size": **zero.**
- Occurrences of "meta-analytic": **one** — a reference to other people's work, not its own method.

**The paper computes no pooled estimate of any kind.** It reviews and interprets primary findings and
reproduces one figure from Rohrer & Taylor. Tiering it Q1 would have imported unearned strength from
a label. This is the second time this collector has made the non-obvious downward tier call (V5b
credited the same move on F14), and it is the right call again.

### F19's exception list — verbatim, and complete

All six exceptions confirmed verbatim in the authors' own words: grammar rules (Bird 2010), spelling
(Fishman et al. 1968), reading skills (Seabrook et al. 2005), biology (Reynolds & Glaser 1964), a
"moderately abstract mathematics task" (Rohrer & Taylor 2006, 2007), and "tasks involving coordinated
motor skills" (Moulton et al. 2006).

**Completeness check — this is the part that mattered, and I did it independently.** A narrative
review's task list is only usable as a bounding argument if the dossier read *all* of it. I read the
sections the dossier does **not** quote, specifically the "realistic educational contexts" section
that immediately follows the exception list. It adds Sobel et al. (2011) — fifth-graders learning
**GRE-style word definitions** — and Carpenter et al. (2009) — eighth-graders learning **US history
facts**. **Both are declarative recall**, so both *support* the dossier's framing rather than
undercut it. **No seventh task type exists that the dossier omitted, and nothing in the unquoted
sections cuts against its reading.** The dominant defect of this entire program — material inside a
cited source that the collector failed to read — **did not occur here.**

I also note approvingly that the dossier explicitly labels Bird/Fishman/Seabrook/Reynolds &
Glaser/Rohrer & Taylor as *Carpenter et al.'s characterisations*, not independently verified primary
results. That is the correct handling and it is the exact failure ("a characterisation by a critic
quoted as the original author's own words") that Phase 1 caught elsewhere.

## Resolution log (every citation that was UNVERIFIED at any point)

| # | Which point failed (exists / supports / strength) | Move taken (re-check · downgrade · drop) | Terminal state | Note |
|---|---|---|---|---|
| F16 | — | none needed | **VERIFIED** | No point failed. Cross-checked across two independent hosts/routes; figures identical. |
| F17 | — | none needed | **VERIFIED** | No point failed. Fabricated venue independently refuted; no trace survives in the dossier. |
| F18 | — | none needed | **VERIFIED** | No point failed. One precision nuance on the headline recorded above; it is literally true and needs no correction. |
| F19 | — | none needed | **VERIFIED** | No point failed. Q4 tier independently confirmed structurally. |

**No citation was left UNVERIFIED. No citation required quarantine. No citation was dropped.**

## Kills (citations dropped — the claim lost this support)

- **None.** All four additions survive at full strength. **No downgrades either** — this is the first
  C5 pass to come through with no strength correction of any kind.

## Quarantine (UNVERIFIABLE — could not be reached at all)

- **None.** All four sources resolved and were read in full locally, including the two V5b recorded
  as unreadable.

## Append-only compliance — the disclosed exception, checked

I cannot inspect history (no `git` was run, in any form). I verified compliance by **content
comparison** instead: I extracted every quote, tier, bucket, caveat and correction marker that V5 and
V5b recorded as verified in F1–F15, and matched each against the current dossier.

**All 21 checked strings — spanning F1, F2, F3, F4, F7, F8, F9, F12, F13, F14, F15 and the C5-FP
in-place correction marker — are present, verbatim, unaltered.** Nothing prior was edited, moved, or
softened.

**On the declared exception:** the front-matter now reads `…= 15 total, initial-collection cap
reached.` followed by a clearly marked bracketed insert
`**[updated by C5-REM, 2026-07-20 — front-matter bookkeeping only, no finding altered]**` recording
the amendment-5 reopening and the 15/4/19 split. V5b recorded the prior line as stating that no
further citations may be added; that clause is now replaced with "initial-collection cap reached."

**The exception is limited to exactly what was declared.** It is confined to the front-matter
citation-count line, it alters no finding, quote, tier, bucket, caveat, coverage gap or prior
correction, and it was necessary to keep the header truthful after the card was reopened. The change
also **preserves the separability** of the 15 / 4 / 19 counts rather than folding the top-up into the
initial-effort figure, which is the honest presentation. This mirrors the bookkeeping edit V5b
accepted from C5-FP, and I accept it on the same basis. **No breach.**

## Conflicts surfaced during verification

- **None new.** The CI dispute (F16 vs F17) is a real, live conflict, but the collector already
  returns it as a conflict-register row rather than resolving it, so it is not a *new* surfacing by me.
  I confirm it is correctly characterised: the two syntheses reach opposite headline verdicts and are
  not reconcilable by averaging, and the collector's observation that they **partly converge** where
  it matters for this product (F16's own applied subgroup SMD = 0.23, p = 0.24 points the same
  direction as F17's applied-domain scepticism) is accurate and is the most useful thing anyone has
  said about the pair.

### Ruling: does conflict #10 survive F18 intact? — YES, and the collector's reasoning is sound

Conflict #10 is Cepeda et al. (2006) — spacing near-universal within an exclusively **verbal**
inclusion criterion — against Donovan & Radosevich (1999) — spacing collapsing from d = 0.97 to
d = 0.07–0.11 as task complexity rises across a **motor-and-cognitive** corpus.

V5b hoped F18 would be the modern arbiter. **It cannot be, and the collector is right to refuse to
use it as one.** Three independent grounds, each verified against the source:

1. **No corpus overlap.** F18's inclusion criterion — *"studies on perceptual and motor learning were
   excluded"* — places its entire corpus on Cepeda's side of the conflict. It never touches the
   material that generates Donovan & Radosevich's complexity moderation. A meta-analysis cannot
   adjudicate a conflict about a corpus it excluded by design.
2. **The stimulus-type null is a within-verbal null.** I read the actual coding: *"pairs (whatever the
   type—face–name pairs, translated word pairs…) versus others (including prose passages, word lists,
   classroom lectures, and maths problems)."* **Every level of that moderator is verbal/semantic.** A
   non-significant contrast between two kinds of verbal material says nothing whatsoever about
   verbal-vs-motor generality. Reading it as cross-domain generality would be a textbook
   scope-inflation — the exact inversion class this program keeps catching.
3. **The authors themselves forbid the null-as-absence reading**, verbatim: *"we cannot ensure that an
   effect is not significant due to a true lack of effect or a lack of power (Hempel et al., 2013).
   With low power, we should not conclude that there is no relationship between the moderator and the
   variability in the subset."*

**Conflict #10 survives F18 intact and remains `open`.** F18 does add something real — it is a modern,
bias-corrected confirmation of the *magnitude* on Cepeda's pole (g = 0.74 within verbal material) —
but strengthening one pole is not arbitrating the conflict. The dossier says exactly this and no more.
**Sound.**

## Register corrections — both confirmed

I read both rows in `registers/source-lead-register.md` directly.

- **Row #24 — CONFIRMED WRONG, correction is correct.** The row reads `Kim, et al. (2024)`. The
  authors of that DOI/title are **Czyż, S.H., Wójcik, A.M., Solarská, P., & Kiper, P.** — established
  independently from the Crossref API *and* from the publisher PDF byline. The rest of row #24 is
  **confirmed correct**: *Scientific Reports* 14, PMC11237090, the title verbatim, **54 studies** and
  **2,068 participants** (verbatim: *"Outcomes from 54 studies were included in the meta-analysis,
  resulting in testing of 2068"*), and the "almost negligible" applied-setting characterisation
  (verbatim in the abstract). **Only the author attribution needs fixing.** The collector's diagnosis
  that V5b carried "Kim et al." forward while simultaneously noting a *"Comment on Czyż et al.
  (2024)"* — i.e. the same paper under two names — is correct.
- **Row #25 — CONFIRMED.** The row carries the title, venue and DOI but **no author list**. Authors,
  volume and article number are now established as **Ammar et al., EPR 36(2), art. 57**.
- **Row #25's substantive summary — CONFIRMED VERBATIM.** The row's "only ~37 of 183 pooled outcomes
  (20%)" matches the source's abstract exactly: *"Out of 183 overall pooled outcomes, Δ in only 37
  performance outcomes (20%) agreed with the paradoxical CI effects."*

## Dossier sufficiency (SECOND AXIS — judged independently of citation states)

**Verdict: SUFFICIENT**

V5b's INSUFFICIENT verdict named a bounded, 4-citation scope: **(A)** two landmark spacing reviews
(Latimier 2021, Carpenter 2012), **(B)** the CI matched pair (rows #24/#25), and **(C)** Settles &
Meeder (2016) — which V5b explicitly judged "the *least* material of the three," did "not rest the
verdict on," and recorded "for completeness, not as a demand."

**(A) and (B) are closed, one-for-one, at full verified strength. (C) was never a requirement.** The
card total is 19, exactly as V5b predicted. No fifth source was padded in, and four genuinely
in-scope adjacent CI sources were left as register leads rather than collected — scope discipline
under a live temptation to over-collect.

- **Traditions/landmarks/positions present:** verbal-recall spacing meta-analysis (Cepeda 2006, 2008);
  applied/organisational distribution-of-practice meta-analysis (Donovan & Radosevich 1999);
  desirable difficulties / metacognition (Kornell & Bjork; Verkoeijen replication); interleaving
  (Taylor & Rohrer); testing effect (Roediger & Karpicke); health-professions spaced education
  (Martinengo 2024); first-party SuperMemo/FSRS self-reports; academic adaptive scheduling (Pavlik &
  Anderson 2008; Lindsey et al. 2014); empirical Anki-user literature (Frappa 2026; Gilbert 2023);
  **and now the modern spaced-retrieval-practice meta-analysis (Latimier 2021), the field's own
  spacing-generalization review (Carpenter 2012), and both sides of the live 2024 contextual-
  interference dispute (Czyż et al.; Ammar et al.).** That is a genuinely complete map of the
  traditions bearing on this card's four sub-questions.
- **Required sub-questions answered: 4 of 4.** Q1 answered well and now with a modern check. Q2
  answered on both sides with the asymmetry stated accurately. Q3 answered with an empirical layer
  correctly labelled correlational. **Q4 is answered — and the answer is "this is a gap."** An
  honestly-established, well-bounded negative result is an answer, not an omission.
- **Searches I ran to test for what is NOT there** (independent of the collector's, using literature
  APIs rather than keyword web search, which is a stronger existence check):
  1. OpenAlex: `spaced repetition decision rule training retention procedural`
  2. OpenAlex: `spacing effect if-then rule application transfer training`
  3. OpenAlex: `blackjack basic strategy training spaced practice`
  4. OpenAlex: `spaced practice situation action mapping decision skill retention`
  5. OpenAlex: `distributed practice decision making training retention meta-analysis`
  6. Europe PMC: `spaced retrieval practice AND "decision rule"` (22 hits, none a training study)
  7. Europe PMC: `spacing effect AND "card counting"` (**0 hits**)
  8. Europe PMC: `distributed practice AND categorization AND retention AND rule`
  9. Europe PMC: `"spacing effect" AND "cognitive skill" AND acquisition AND retention` (5 hits)
  10. Crossref API: independent masthead resolution for all four DOIs.

  **No study testing spaced repetition on a taught situation→action decision rule surfaced.** This is
  now the **fourth** independent confirmation of the same absence (V5, V5b, C5-REM, and mine). I
  confirm it and **do not re-penalise the gap.**

### Is the collector's "RECONFIRMED, not closed" reasoning sound? — YES

This was the central thing my card asked me to judge honestly, so I state it plainly.

The collector claims the four new sources **bound** the gap rather than close it. **The reasoning is
sound, and it is stronger than the position V5b complained about.** Each leg holds against the
sources as I read them:

- **F19 leg — holds, and this is the one that answers V5b's actual complaint.** V5b's objection was
  not that the gap was wrong; it was that the dossier argued "the evidence base is declarative-only"
  from *Cepeda 2006's inclusion criterion* without engaging the review whose stated remit is the
  generalization question. That review is now engaged, read in full, and quoted in the authors' own
  words — including their own concession of the simple-verbal base rate. Its enumerated exceptions are
  grammar rules, spelling, reading, biology, an abstract maths task, and coordinated motor skills;
  **I verified the list is verbatim and, by reading the unquoted sections, that it is complete.**
  None is a taught, fixed situation→action rule applied under time pressure and hidden information.
  **V5b's specific complaint is answered exactly as stated.**
- **F18 leg — holds, and it is the strongest of the three** because it is an *inclusion criterion*,
  not an absence of results: perceptual and motor learning were excluded by design, so the modern
  meta-analysis provably cannot be stretched across the gap. That is a categorical bound, not an
  inference from silence.
- **F16/F17 leg — holds.** The tradition that owns situation→action practice scheduling is
  motor-domain, is in open dispute, and has a non-significant applied-setting subgroup in the
  *pro*-side's own analysis. That genuinely bounds the gap.

**The important calibration, which the dossier itself gets right:** the F19 leg is an argument from a
*narrative* review's illustrative list, which is weaker than a systematic search would be. **The
dossier says so, unprompted** — "its task list is illustrative rather than exhaustive, and absence
from the list is weaker evidence than a systematic search would be (which is why this finding is
stated as 'the gap stands after engaging it,' not 'the review proves no such study exists')." That
is the correct epistemic weight, self-applied. A dossier that had claimed F19 *proves* the absence
would have earned a downgrade; this one pre-empts it.

**I therefore find the central claim not merely defensible but correctly calibrated.** The gap is
reported as reconfirmed rather than closed, no study was invented to fill it, and the honest negative
result is presented as the card's highest-value output rather than softened. That is the behaviour
the program exists to produce.

### On the leads left uncollected — why they do not re-open insufficiency

The collector candidly flagged four uncollected CI leads, including one it says is "arguably nearer
sub-Q4 than either collected CI paper" (the *Frontiers in Psychology* 2024 CI **transfer**
meta-analysis). I considered whether that self-flag re-opens the verdict. **It does not**, on the
program's own distinction:

- These were **searched for, found, named, and deliberately scoped out**, with reasons — thoroughness,
  not concealment. That is the opposite of the row-#24/#25 situation V5b penalised, where a located
  body went uncollected because a *ceiling* had been spent and the dispute would have been left
  half-represented. Here the dispute **is** represented, both sides, as a matched pair.
- **None of them could move a conclusion.** A CI transfer meta-analysis is still motor-domain: it
  would bound sub-Q4 further in the *same* direction as F16/F17, not close it. The commentary and
  reply deepen a dispute the dossier already registers as live, unresolved, and citable only in pairs.
- Treating every adjacent source a collection surfaces as a new insufficiency is an infinite regress.
  The test is whether **additional searching is unlikely to materially change the conclusions** — and
  after four independent failed searches for the decision-rule study, and with both poles of the CI
  dispute and both landmark reviews now in hand, it is not.

They are correctly recorded as register leads. If the CI tradition later becomes load-bearing for a
design decision, the transfer meta-analysis is the first thing to collect — but that is a future
card's trigger, not a defect in this one.

## Verifier summary

- VERIFIED: **4**  |  UNVERIFIABLE: **0**  |  DROPPED: **0**
- **UNVERIFIED remaining: 0** — every citation in scope is terminal.
- **Dossier sufficiency: SUFFICIENT.** V5b's named 4-source gap is closed one-for-one; all four
  verify at full strength; four independent searches confirm the sub-Q4 absence is real.
- **Claims the collector overstated (strength downgraded): NONE.** No kills, no downgrades, no
  corrections required to the dossier. This is the first C5 pass to come through entirely clean.
- **Both heightened-scrutiny hazards were checked and both were handled correctly by the collector.**
  (1) The weaker extraction route was re-run by me on the stronger local `curl`+`pdftotext`+`grep -F`
  path, against a *different host* for F16, and **every figure and quote matched**. (2) The F17
  fabrication is real, the collector's Crossref recovery is correct, and **no fabricated detail
  survives anywhere in the dossier text.**
- **The two "read in full" claims V5b had marked unreadable are true.** I read F18 and F19 myself,
  from the same hosts; both are the typeset versions of record, not preprints or partial extractions.
  The collector's decision to abandon the undecodable andymatuschak.org copy rather than partially
  quote it is confirmed as the right call — the retrievalpractice.org copy it used instead extracts
  cleanly and completely.
- **Append-only compliance holds.** 21 prior-verified strings across F1–F15 are present verbatim and
  unaltered; the single edit is confined to the front-matter count line exactly as declared.
- **Register corrections confirmed:** row #24's "Kim, et al. (2024)" is a genuine mis-attribution
  (correct: Czyż, Wójcik, Solarská & Kiper); row #25 lists no authors (correct: Ammar et al., EPR
  36(2), art. 57); row #25's "37 of 183 (20%)" is verbatim correct.
- **Conflict #10 survives F18 intact and remains `open`** — F18's corpus, moderator coding, and the
  authors' own power caveat each independently forbid using it as an arbiter.
- Calibration note, stated deliberately because my card warned about the pessimism trap: **I looked
  hard for a scalp on this pass and there is not one.** The collector self-reported two real hazards,
  made two non-obvious conservative tier/model calls that a less careful pass would have gotten wrong
  in the direction of unearned strength, refused to over-collect against a lifted ceiling, and
  reported a negative result as a negative result. Finding it sound is the honest verdict, and I
  record it as such rather than manufacturing a defect to justify the dispatch.
