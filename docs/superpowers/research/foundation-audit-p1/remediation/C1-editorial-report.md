# C1 — Editorial correction report (C1-EC)

> Corrector: Claude (Opus 4.8, 1M) — editorial corrector; NOT the C1 collector, NOT C1-FP, NOT C1-R2,
> NOT V1/V1b/V1c/V1d  |  Date: 2026-07-20
> Instruction set: `journal/raw/_inbox/foundation-audit-p1/verification/V1d-knowledge-tracing-remediated.md`
> Remedy type: **editorial, not collection.** **No new sources collected. No WebSearch used. No
> WebFetch needed** — V1d supplied verbatim text for every correction, and re-fetching would not have
> improved on a local string match this pass cannot reproduce.
> Append-only was **lifted** for this pass. Edits are **in place**; superseded text is marked
> `SUPERSEDED` / `STRUCK` and struck through rather than deleted. **No finding ID was removed,
> renumbered, or reused.**
> Trust role: **corrector, not verifier.** Nothing below is self-verified.

## Headline result

**The dossier's own most consequential claim has been reversed against itself.** C1-R2 asserted that
"every single source found … calibrates from a population" was **falsified**. V1d ruled it **NOT
falsified**, and that ruling is now carried in the dossier at all three sites where the claim lived
(HEAD STATEMENT ¶3, the Sufficiency Statement, F25's caveat). The correct characterisation is
**population-*light*, not population-free**.

The collector's genuine contribution is **preserved and credited, not deleted**: it showed the
population requirement can shrink from *tens of thousands of learners* to **a single published
constant**. That result stands.

**This pass moved the dossier's story in the unfavourable direction on balance** — one overstatement
running in the dossier's own favour reversed, F22's measured numbers turning out weaker than its
abstract implied, an omitted null added, and a commercial COI recorded. **Two corrections run the
other way and are recorded as upgrades** (F23; F22's caveat (iv)), and **three findings were examined
and left unchanged** because they are accurate as written.

## Findings CHANGED

| ID / site | Change | Ground |
|---|---|---|
| **HEAD STATEMENT ¶3** | **STRUCK as overstated; replaced by a new ¶3′.** The "falsified as written" claim is withdrawn on two grounds carried verbatim into the dossier: (a) **scope** — the original sentence enumerates BKT/PFA/DKT/IRT/education-Elo, and SlimStampen's ACT-R rate of forgetting is a **sixth family outside that enumeration**; (b) **decisively, the 0.3 default is population-derived by F24's own Methods** ("which previous studies have shown to be a reasonable average across materials and learners"). ¶3′ states the population-*light* characterisation **and preserves the collector's real result** (requirement shrinks to a single published constant). | V1d RULING |
| **HEAD STATEMENT ¶1** | Correction block added: "both are abstract-scope only" is **no longer true** (both bodies obtained), and F22's recovered figures make the feasibility side of the "both sides" framing **weaker** than C1-R2 believed. | V1d Correction 1 |
| **HEAD STATEMENT ¶2** | Correction block added: the measured cost is **in-session only** (Exp 1 delayed-recall **null**), and F24 carries a **commercial COI**. Direction kept as defensible; size and durability scoped down. | V1d Corrections 3–4 |
| **HEAD STATEMENT — "What still does not exist"** | "any full-text reading of F22 or F23" **STRUCK** (both read). Replaced with F25's body as the genuine remaining unread item, plus a pointer to the settled gaps. | V1d |
| **Sufficiency statement** | The universal sentence **narrowed, not retracted**. Original retained and marked (downstream text and the charter quote it); an authoritative **REPLACEMENT SENTENCE** added verbatim from V1d's recommendation, plus the scope note explaining that the narrowing rests on the provenance of 0.3, **not** on the ACT-R technicality. | V1d RULING |
| **F22 — access/bucket/tier** | `SUPERSEDED`: body **obtained** (arXiv PDF, HTTP 200, local string match). Abstract-scope ceiling **lifted**; bucket now full-text-scope; Q3 **confirmed on the body**, no longer abstract-proposed. C1-R2's access failure recorded as **a tooling limit, honestly reported**, not inattention. | V1d Correction 1 |
| **F22 — measured results** | **Tables 2–3 added**: Spearman **.673** GPT-4o / **.633** DeepSeek / **.665** Qwen aggregate; best config **.732**; worst **.486**; by domain **.847** (subtraction) to **.252** (text problems), with CIs. | V1d Correction 1 |
| **F22 — the body's counterweight** | **§4.1 added verbatim**: correlations "were lower than those reported for pooled human judgements… **.70**… and lower than the value of **.76**… for automated estimation". The abstract's "upper end of the human-expert range" is true of **individual** raters only. **This materially weakens the zero-response-data story the dossier told from the abstract alone**, and is stated as such. | V1d Correction 1 |
| **F22 — relative scale** | **§5 added verbatim**: the study "does not examine the absolute differences… because estimates produced by pairwise comparison are located on a **relative scale**." Absolute agreement **explicitly unexamined**. Authors' closing position added: "an emerging methodological direction rather than as a finished solution." | V1d Correction 1 |
| **F22 — silent truncation** | 4th/last quote **repaired to true verbatim**, both ends restored: "**By systematically comparing key design choices,** the study positions LLMs as a promising tool for initial item calibration… **in settings where many new items are generated and response data are unavailable.**" Noted that the dropped tail in fact **favoured** the product's case — a discipline defect, not a directional one. | V1d Correction 1 |
| **F22 — caveat (i)** | `SUPERSEDED` — "no correlation value was obtained" replaced with the measured, **mixed-to-modest** characterisation. | V1d |
| **F24 — spliced quote** | **STRUCK.** "No such sentence exists in the paper." Both genuine sentences restored verbatim and labelled by section (Discussion; General Discussion), with the note that the real sentence is scoped to **Experiment 2** — a scope the splice silently dropped. Also flagged the *Default*-condition quote's dropped inline symbol (\(\alpha_{\varnothing}\)) as needing an ellipsis. | V1d Correction 2 |
| **F24 — COI** | **LOCATED and recorded verbatim.** System "licensed to Noordhoff Publishers by the University of Groningen… **This project was partially funded by these license fees.**" Explicit ruling written into the dossier: **F24 must not be counted as independent corroboration of SlimStampen.** C1-R2's flag ("unchecked, not absent") resolved to **present**. Caveat (iv) marked RESOLVED. | V1d Correction 3 |
| **F24 — omitted null** | **Added verbatim.** Exp 1 "**Delayed Recall Test Performance** There was no difference between conditions… **strong evidence in favour of the intercept-only null model**", plus the studied-items null. Consequence stated: the measured cost is **in-session only**; on **retention** — the outcome that matters for a training product — Exp 1 found **nothing**. New caveat (v) added. | V1d Correction 4 |
| **F24 — corroborations** | Randomisation **confirmed verbatim** and preregistration recorded (osf.io/vwg6u, osf.io/snfyz) → **Q2 warranted**. Participant counts read off the paper (241 + 217 Exp 1; 197 Exp 2). "Section attributions should be re-confirmed" marked **RESOLVED**. | V1d |
| **F23** | **UPGRADE, in the collector's favour.** Access `SUPERSEDED` (body obtained). §2.1 added verbatim: training targets are **LLM pseudo-labels anchored on PALRACE's response-based Rasch difficulties**, and that step correlates only **r = 0.46** with response-based truth. The population chain is **longer** than the dossier stated, with an inherited ceiling. | V1d Correction 5 |
| **F25** | **Body marked `UNVERIFIABLE`** (blocked at three routes: Wiley pdfdirect 403, Wiley am-pdf 403, research.rug.nl 403; Semantic Scholar BRONZE that the publisher refuses). **Abstract marked VERIFIED verbatim** via PubMed E-utilities, PMID 26748838. Binding statement added: **no claim may rest on F25's unread body**; the "stable over time, not across materials" claim is carried on the abstract's words with **no reliability coefficient anywhere in this dossier**. | V1d Quarantine |
| **F25 — caveat** | "**it does falsify the dossier's 'every single source' sentence**" **STRUCK** with both grounds; "population-free" → **population-LIGHT**. Note added that the withdrawal rests on **F24's full text**, not on F25's paywall. | V1d RULING |
| **NEW: Source-independence disclosure** | **New section.** Table showing **F17, F24, F25, F26 = one lab (Groningen / van Rijn group), one system (SlimStampen/MemoryLab), one commercial lineage (Noordhoff)**. Four consequences written out, chiefly: these are **not four independent lines of evidence** on C1's central question, and **no out-of-Groningen replication of the estimator exists in this dossier**. | V1d conflict #2 |
| **NEW: Settled coverage gaps** | **New section.** (a) no small/fixed/expert-authored-bank evaluation and (b) no strategy/card-game/gambling-adjacent domain evidence recorded as **SETTLED COVERAGE GAPs — "we looked hard and it is not there"**, surviving three collection passes plus V1d's own searching. **Further passes against either must be REFUSED.** Framed as a legitimate research result. | V1d |
| **Conflict #10 (new, in dossier; NOT written to register)** | F22's **abstract vs its own body** on where LLM difficulty estimation sits relative to human experts. Not a contradiction (individual vs pooled raters) but "a dossier quoting only the abstract overstates the method" — which this dossier did until now. | V1d |
| **C1-R2 coverage gaps** | "**No numeric accuracy figure… exists anywhere in this dossier**" **STRUCK as no longer true**, with the figures cited inline. Recorded as **the program's dominant defect recurring for the fifth time** — material inside an already-cited source — with the mitigation that this instance was a genuine tooling block **reported honestly rather than concealed**. F25 gap updated to UNVERIFIABLE. Domain/bank gaps cross-referenced to SETTLED. | V1d |
| **Header block** | C1-EC provenance note added: append-only lifted, no collection, ID preservation, and the list of corrections with the explicit statement that the headline correction runs **in the dossier's own disfavour**. | — |
| **C1-R2 self-QA** | Marked a **stale historical snapshot**, left otherwise unedited for auditability, with the three overtaken items named and the one **confirmed** item (honesty of access reporting) credited. | V1d |

## Findings EXAMINED and deliberately LEFT UNCHANGED

| ID | Why it stands |
|---|---|
| **F26** | **Cleanest finding in the pass.** V1d string-matched all four quotes locally: **4/4 verbatim**; n=66 confirmed; homogeneity hedge confirmed. **No defect.** Only *additions* made: a clean-bill note, and F26's own COI declaration recorded verbatim as the contrast to F24 — with the caution that a clean COI declaration is **not** independence, since F26 is the same lab and system. |
| **F27** | V1d re-extracted the author PDF and string-matched **5/5 passages verbatim** after de-hyphenation, including Fig. 4's "without assumptions" classification. C1-R2's claim to have read pages directly is **corroborated**. Content untouched; a clean-bill note added. |
| **F22 caveat (iv)** | **VERIFIED on the body and credited.** The study does score LLM output against "empirical difficulty estimates treated as empirical reference" — it demonstrates correlation *with* population-derived truth, not a system running without one. **Correctly stated by the collector.** |
| **F24 quotes 2 and 3** | The 7.3 pp figure (95% CI [3.9, 11.0]) and the RMSE comparison (*M* = 0.084/0.025 vs 0.102/0.035, BF = 1.0 × 10³) are **verbatim HITs**. Untouched. |
| **F25 heading** | Reads "a per-learner, per-item parameter fitted with **no population fit**." **Accurate as written** — V1d's own replacement sentence uses exactly that phrase. The population-derived element is the **0.3 default**, not a fit. Deliberately not altered; the correction belongs in the caveat, where it was made. |
| **HEAD STATEMENT core verdict** | "**No. It does not settle it**" — **confirmed correct by V1d** and explicitly preserved. Even with F22's recovered numbers, ~.73 against a population-derived reference on primary-school arithmetic, on a relative scale, does not settle a mastery model for a blackjack trainer. |
| **HEAD STATEMENT ¶4 / F27's dominant-defect framing** | Accurate and self-critical as written. Untouched. |
| **F1–F21** | Outside V1d's scope (it verified F22–F27). **Not examined by this pass and not altered.** |
| **Conflict #9 (F16 vs F26)** | V1d: "sound and should be registered as written." Untouched. |
| **Original + C1-FP coverage-gap and conflict sections** | Untouched except for the cross-reference to the settled-gaps section. |

## Calibration note — pressure ran both ways

The brief warned that this program drifts pessimistic and that upgrades are legitimate findings.
The dominant direction here was **unfavourable to the dossier, correctly so** — but not uniformly:

**Against the dossier (the correct direction here):**
1. Its headline "falsified" claim **reversed** — an overstatement running in its own favour.
2. F22's recovered numbers are **weaker** than its abstract implied (below pooled human judgement,
   below an existing automated method, relative scale only).
3. An omitted **null** added; a commercial **COI** recorded; a **spliced quote** struck.
4. A source-independence concentration the dossier nowhere disclosed.

**For the dossier (recorded, not suppressed):**
1. **F23 upgraded** — its crux is not only confirmed but **understated**; the population chain is
   longer than claimed.
2. **F22 caveat (iv) verified and credited** to the collector.
3. **F26 and F27 examined and found clean** — 4/4 and 5/5 verbatim. No defects manufactured to match
   the brief's tone.
4. **F22's truncation runs in the collector's favour** — the dropped tail strengthened its case; that
   is stated in the dossier rather than presented as a damaging omission.
5. **C1-R2's honesty is upheld.** V1d tested its self-reported shortfalls and found them accurate in
   every particular; 20 of 22 quoted passages were verbatim. The dossier now says so.
6. **The collector's real result is preserved**: the population requirement can shrink to a single
   published constant. That was not deleted while correcting the overstatement.

## No collection performed

V1d judged gaps (a) small/fixed/expert-authored bank and (b) strategy/card-game domain evidence to be
**settled COVERAGE GAPs — do not re-run.** They were **not** re-run. No WebSearch was available to
this role and none was sought. WebFetch was not needed: V1d supplied verbatim text for every
correction from a local string-match route this pass could not have improved on.

**One optional lead, NOT collected, flagged for the orchestrator's decision (not mine):** V1d names
**Wauters et al. (2012), "Item difficulty estimation: an auspicious collaboration between data and
judgement," *Computers & Education*** as "the one uncollected lead that would move a conclusion" — it
is both a primary source behind F27's Q4 claim and directly about combining expert judgement with data
to set item difficulty, i.e. the product's literal proposed path. It is already recorded in the
dossier's not-chased leads. **Escalating to collection is the orchestrator's call.**

## Register rows (returned in text; NOT written to the shared registers)

**Conflict register — one proposed new row:**

| # | Conflict | Sides | Status | Affected areas |
|---|---|---|---|---|
| **#10** | F22's own abstract vs its own body on where LLM difficulty estimation sits relative to human experts | A (abstract): "approached the upper end of the accuracy range reported for human experts". B (§4.1): correlations "were lower than those reported for pooled human judgements… .70… and lower than the value of .76". | Open — **not a contradiction** (individual vs pooled raters), but abstract-only quoting **overstates the method** | Whether LLM-set difficulties are good enough to seed a product item bank |

Conflict **#9** (F16 vs F26) is sound as C1-R2 proposed it and should be registered as written.

**Source-lead register — one proposed row:**

| # | Lead | Action |
|---|---|---|
| — | **Sense et al. (2016) body** — *Topics in Cognitive Science* 8(1):305–321, DOI 10.1111/tops.12183 | Record **UNVERIFIABLE**: blocked at three independent routes; Semantic Scholar lists BRONZE OA the publisher refuses. Test–retest reliability figures unobtained. Needs institutional access, not another fetch attempt. |
| — | **Wauters et al. (2012)**, *Computers & Education* | Keep open, **high value / low cost**, per V1d. Orchestrator's decision — **not collected by this pass.** |

**Correction-register rows** (one per site changed): HEAD STATEMENT ¶1, ¶2, ¶3→¶3′, "what still does
not exist"; Sufficiency Statement; F22 (access, bucket, tier, measured results, §4.1 counterweight,
§5 relative scale, truncation, caveat i, caveat iv upgrade); F23 (access, §2.1 upgrade); F24 (spliced
quote, COI, null, randomisation/preregistration, counts, section attributions, caveats iv–v); F25
(body UNVERIFIABLE, caveat); F26 (clean-bill + COI note); F27 (clean-bill note); Source-independence
disclosure (new); Settled coverage gaps (new); Conflict #10 (new); C1-R2 coverage gaps; C1-R2 self-QA;
header block. **Of these, HEAD STATEMENT ¶3 and the Sufficiency Statement are a REVERSAL of the
collector's own headline** and should be routed to whoever owns the charter correction — **this pass
did not touch the charter.**

## Prohibitions observed

- **No `git` command of any kind was run** — not `status`, not `log`, not `diff`.
- **Nothing outside `journal/raw/_inbox/foundation-audit-p1/` was read for correction or written to.**
  Product code, specs, plans and the charter were **not touched**. The charter correction is the
  orchestrator's job and was left to it.
- **No build, test, or install command was run.**
- **No new sources collected; no shared register written.**
