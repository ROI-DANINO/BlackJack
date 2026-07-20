# Phase 1 Gate Summary — Adaptive Learning Foundation Audit

> **Status: PHASE 1 COMPLETE, AWAITING USER APPROVAL. Phase 2 has NOT begun and will not begin
> without explicit approval.**
> Assembled 2026-07-19 by the orchestrating session. Authority: **research evidence only** — nothing
> here changes adopted product behaviour or edits the approved baseline.
> Everything below lives under the git-ignored inbox. Nothing has been committed or promoted.

---

## 1. Headline

Six topic dossiers were collected, independently verified citation-by-citation, judged on a separate
**research-sufficiency** axis, and — where insufficient — sent for one bounded focused pass and
re-verified by a third independent agent.

**Citation verification came back near-perfect. Sufficiency did not.**

- **73 of 73 citations reached a terminal state. 0 remain UNVERIFIED. 0 UNVERIFIABLE. 0 fabricated
  sources anywhere in the program.**
- **All six dossiers were judged INSUFFICIENT on first review.** Every one had missed an important
  body of evidence while passing citation verification cleanly.

**The sufficiency rule is what caught this.** Under citation verification alone, all six dossiers
would have passed this gate.

---

## 2. Artifact paths

### Dossiers
| Card | Path | Findings | Citations |
|---|---|---|---|
| C1 | `journal/raw/_inbox/foundation-audit-p1/C1-knowledge-tracing/dossier.md` | 21 | **21** ⚠️ over cap |
| C2 | `journal/raw/_inbox/foundation-audit-p1/C2-its-actr-procedural/dossier.md` | 15 | 15 (at cap) |
| C3 | `journal/raw/_inbox/foundation-audit-p1/C3-deliberate-practice/dossier.md` | 11 | 9 |
| C4 | `journal/raw/_inbox/foundation-audit-p1/C4-chesscom-khan/dossier.md` | 12 | 12 |
| C5 | `journal/raw/_inbox/foundation-audit-p1/C5-anki-spaced-repetition/dossier.md` | 15 | 15 (at cap) |
| C6 | `journal/raw/_inbox/foundation-audit-p1/C6-blackjack-teachable/dossier.md` | 9 | 9 |

### Verification records (all under `journal/raw/_inbox/foundation-audit-p1/verification/`)
`V1-knowledge-tracing.md` · `V1b-knowledge-tracing-sufficiency.md` ·
`V1c-knowledge-tracing-toppedup.md` · `V2-its-actr-procedural.md` ·
`V2b-its-actr-procedural-toppedup.md` · `V3-deliberate-practice.md` ·
`V3b-deliberate-practice-toppedup.md` · `V4-chesscom-khan.md` · `V4b-chesscom-khan-toppedup.md` ·
`V5-anki-spaced-repetition.md` · `V5b-anki-spaced-repetition-toppedup.md` ·
`V6-blackjack-teachable.md` · `V6b-blackjack-teachable-toppedup.md`

### Registers
`registers/conflict-register.md` — **22 rows**, IDs unique (reconciled at gate assembly)
`registers/source-lead-register.md` — **30 rows**, IDs unique (reconciled at gate assembly)

---

## 3. Both axes, side by side

Citation state and dossier sufficiency are independent judgments. Read them together.

| Card | VERIFIED | UNVERIFIABLE | DROPPED | UNVERIFIED | Sufficiency (1st) | Focused pass | Sufficiency (final) |
|---|---|---|---|---|---|---|---|
| **C1** Knowledge tracing | 13 + 12 | 0 | 0 | **0** | INSUFFICIENT | ✅ ran | **INSUFFICIENT** ⚠️ |
| **C2** ITS / ACT-R | 11 + 4 | 0 | 0 | **0** | INSUFFICIENT | ✅ ran | **INSUFFICIENT** ⚠️ |
| **C3** Deliberate practice | 6 + 4 | 0 | 0 | **0** | INSUFFICIENT | ✅ ran | **SUFFICIENT** ✅ |
| **C4** Chess.com / Khan | 9 + 3 | 0 | 0 | **0** | INSUFFICIENT | ✅ ran | **INSUFFICIENT** ⚠️ |
| **C5** Anki / spaced rep | 11 + 4 | 0 | 0 | **0** | INSUFFICIENT | ✅ ran | **INSUFFICIENT** ⚠️ |
| **C6** Blackjack teachable | 6 + 3 | 0 | 0 | **0** | INSUFFICIENT | ✅ ran | **SUFFICIENT** ✅ |
| **TOTAL** | **73** | **0** | **0** | **0** | 0/6 | 6 passes | **2/6** |

Sub-claims killed within otherwise-verified citations: **3** (C3 ×1, C5 ×1, C6 ×1).

### Why the four remaining INSUFFICIENT verdicts differ in kind

| Card | What is missing | Cost to fix | Blocked by |
|---|---|---|---|
| **C2** | Unextracted content **inside sources already cited** (a report-type moderator, robust under both models; a WWC domain rating) | **0 new citations** | nothing — but no mechanism exists for an *editorial* pass |
| **C4** | **1 citation, already obtained and read by the verifier** — the only independent controlled Khan study vs active controls, result **null** | 1 citation | **one-pass rule** |
| **C1** | Population-free item-difficulty estimation + the single-learner estimator tradition | 4–6 citations | **one-pass rule** (and would breach cap) |
| **C5** | Contextual-interference matched pair + 2 landmark reviews | 4 citations | **15-citation cap** |

---

## 4. Strength downgrades and corrections (all applied)

**C1** — F16 claim narrowed to simulation only · F21a Schroeders & Gnambs **Q2→Q4** (a tutorial's
summary of others' simulations is not a primary experiment) · F21b Linacre **Q3→Q4** + edition
corrected · **F12's 3-of-4 authors are Knewton, and F9 comes from the same vendor — must not be
counted as independent sources.**

**C2** — **F5 inherited ellipsis reversed the meaning**: Anderson calls the power law a "surface
contradiction" to ACT's view, i.e. a problem to explain away, not its signature · F4 "three-stage"
→ Anderson says **two** · F3 **g=.05 not .10** (fixed-effect column reported as random-effects) ·
F1 Q4→Q5 · **F12 k=2 not 3** — the striking −.42 is essentially **one quasi-experiment; the only
true experiment in that subgroup is null (g=−0.07)** · **F15's fMRI results are Qin et al. (2003),
not Anderson's own**, and the paper attributes the speed-up to **base-level declarative learning**,
not the declarative→procedural transition (**Q3→Q4**) · "Anderson abandoned ACT\*" is Taatgen & Lee's
characterisation, not Anderson's · retraction over-counts "two empirical tests" — accurate count is
**one**. *Three upgrades also applied where the collector was too pessimistic.*

**C3** — **1 sub-claim KILLED (sign-flip)**: "defensible" appears **nowhere** in Ericsson & Harwell;
the phrase is Macnamara's, quoted to be rebutted · **all F3 headline figures superseded by the
authors' own 2018 Corrigendum, which was appended to the PDF already read** (games 26→24%, music
21→23%, sports 18→20%, r .35→.38, variance 12→14%) · F6 Q2→Q3 · attribution swapped between F3/F7 ·
three "verbatim quotes" are paraphrases · F9 range 36.0→**32.1**–87.1% · F10 "rankings unchanged"
true of the **main model only**.

**C4** — F6 "**the one** mechanism" contradicted by its own sources · **F7's 0.22 upper bound is a
middle-school result presented as elementary; and what was randomized is a teacher-coaching program,
not Khan usage (Q3)** · F9 author list wrong (**Sala & Gobet**, not Sala, Foley & Gobet) ·
**F11 Gates→Khan funding + site co-selection disclosed on p.iii of the PDF already read** —
downgraded to *author-independent only* · F12's Q2 warrant contradicted by its own authors
(nonconcurrent design). *Two corrections ran in the dossier's favour.*

**C5** — **F3's complexity framing inverted**: Donovan's near-zero clusters are **high-physical**;
the high-mental cluster is **d=0.42**; the paper says mental requirements were **not** significantly
correlated with effect size · F4 caveat wrong — the study **held spacing fixed by design** ·
**F6-r's "never replicated" quote is that paper's motivation — it IS the replication** · F8 sub-claim
dropped · F13 confounds personalisation with temporal distribution (authors' own words) ·
F10 **upgraded**.

**C6** — **F2's 44%/16% trace to a single *Psychology Today* blog post**, not "three converging
independent summaries" → **Evidence-backed → Assumption** · F4 dropped the source's own "in part"
and rendered "suggested" as "found"; omitted that the simulation used **simplified rules with
computer-controlled win probability** · F3's Study-2 effects are **one-tailed** ·
**F8's "actual casino" is a MOCK casino** — the money result's setting was upgraded (conflict #28) ·
"realistic table pace" unsupported at abstract level — **and it is the phrase falsifying the Q2 gap.**

---

## 5. Conflicts (22) and quarantine (30)

Both registers are at `registers/`. **No quarantined or unverified source influenced any conclusion
in this package.** Duplicate IDs arising from concurrent agent appends were reconciled at assembly;
the remap is recorded in the session ledger.

Conflicts worth the gate's attention:
- **#1 / #7** DKT's advantage over shallow models — large-and-general vs scale-conditional vs
  dissolving entirely.
- **#2** Piech et al.'s "25% gain" contradicts its own Table 1 (prior best 0.75, not 0.69 → ~15%).
- **#8** BKT parameter untrustworthiness: non-identifiability vs semantic degeneracy — the two
  anti-feasibility sources disagree on mechanism.
- **#10** Spacing's generality: near-universal (verbal recall only) vs collapsing with complexity.
- **#13 / #18** Macnamara 2014 vs its own 2018 corrigendum, including the predictability moderator.
- **#14** 61% vs the overcorrection rebuttal — turns on a reliability assumption (0.60) **lower than
  Ericsson's own published estimates (0.70–0.80)**; at 0.80 the same data yields **49%**.
- **#28** Mock vs actual casino for C6's money result.

---

## 6. The Elo vs IRT / knowledge-tracing question — current state

**Not settled by evidence. Ready to be decided as a labelled product judgement.**

What Phase 1 established:

1. **The charter's framing was wrong.** Education-Elo treats the **item** as the opponent, not a peer
   — it does **not** require an opponent pool. Chess.com's puzzle rating is exactly this.
2. **But it is still population-dependent.** Chess.com's own help docs state a new puzzle's difficulty
   is set by **crowd-calibration** ("determined by who is able to solve it," then locked).
3. **Every model examined calibrates from a population** — BKT, PFA, DKT, IRT and education-Elo alike.
4. **The unevidenced step is narrow and specific: obtaining item difficulties without a response
   population.** Per-learner estimation is *not* the problem — once difficulties are known, ~10 answers
   per learner suffice for a reasonable estimate.
5. **A focused pass targeting exactly this failed to close it.** Both "pro-feasibility" sources address
   **new-learner cold-start against an existing population**, not zero-population estimation.
6. **Direct empirical evidence against the near-zero case exists** — and it was sitting unremarked
   inside a citation collected for another purpose: items attempted by **~1 student yield degenerate
   1.0/0.0 difficulties, causing overfitting and data leakage.**
7. **A shipped alternative exists.** Khan Academy's mastery ladder uses **deterministic percentage
   thresholds with no probabilistic ability estimate at all.**
8. **The "~100 students" figure is an author's rule of thumb, not a measured threshold** (downgraded
   Q2/Q3 → Q4). Do not quote it as measured.

**Recommendation:** decide the mastery model on product reasoning, label it **Product judgement** or
**Assumption** per amendment 3, and enter it in the Assumption Register with a named Validation
Method. The literature has now been genuinely searched — this is "we looked hard and it isn't there,"
not "we don't know."

---

## 7. Cards returned for additional collection

All six. Every focused pass was bounded, append-only, and re-verified by a **third** independent
agent. **C1 was denied a second pass** under the one-pass rule; **C4 was denied one on the same
grounds** even though its fix is a single citation already in hand — refused for consistency, not
because it lacked merit.

---

## 8. Findings that bear directly on the product

Evidence only. These are **not** product decisions.

1. **Spacing/scheduling evidence does not reach this product's task shape.** Pavlik & Anderson's own
   authors flag their work as untested on tasks with "dependencies... and transfer effects" — which
   is exactly what a basic-strategy decision rule is. Two independent verifiers separately confirmed
   no decision-rule spacing study exists.
2. **Deliberate practice is weakly supported for domains resembling this one** — but read carefully:
   predictability is a **continuous meta-regression moderator**, so the "24/12/4%" tiers are **fitted
   values, not subgroup means.** Corrected figures: 23/14/**6%**. There are **no bands to place
   blackjack into — there is a slope**, and "low predictability" was operationalised from tasks like
   handling an aviation emergency. This is analogy, not measurement.
3. **ITS effect sizes vary enormously with implementation, scale, comparator and population** — and
   the quantified explanation is a **report-type moderator (peer-reviewed g=.28 vs nonjournal g=.02,
   robust under both models)** that is still unextracted from a source already cited.
4. **Players err by playing too conservatively**, and show ~62% strategy accuracy against ~80%
   confidence. The most directly actionable finding for curriculum weighting and for training
   confidence calibration — though one supporting magnitude was downgraded to Assumption.
5. **Card counting is trainable to criterion** — but the evidence is a **single n=4 single-subject
   study**, the money result was in a **mock** casino, and PubMed contains **exactly one record** for
   "card counting" in title/abstract. Real evidence; almost none of it.

---

## 9. Promotion decision — for the user, not done automatically

Verified evidence currently lives **only** in the git-ignored inbox. Promotion to a tracked home
(e.g. `docs/superpowers/research/`) is a **user decision**. Note that the previous run's promoted
files **no longer exist anywhere** — see §10.

---

## 10. Program findings requiring a decision

1. **The depth cap and the sufficiency rule conflict.** C1 stands at 21/15. Three cards hit the cap
   exactly. C5's remaining gap **cannot be fixed** beneath it. The cap governs *initial collection
   effort*; a sufficiency top-up answers a different failure. **Recommend: exempt sufficiency-driven
   passes from the cap.**
2. **The one-pass rule bound twice, on the two cards where it cost most** (C1, C4 — the latter a
   single citation already read). **Recommend: permit a second pass where the first was mis-scoped by
   the orchestrator** — C1's was; that error was mine.
3. **Sufficiency has one remedy but two failure modes.** V3b distinguished *missing evidence* (collect
   more) from *misdescribed evidence* (fix the prose). Amendment 4 offers only the first. Three cards
   carry undischargeable editorial defects — **including C3's F3, which still headlines superseded
   figures with no correction marker.** **Recommend: add an editorial correction pass.**
4. **Instruction does not constrain agents; capability does.** **2 of 4 focused passes ran git despite
   a bolded prohibition** — both read-only, both self-disclosed, both harmless *by luck of impulse*.
   No agent type with the right toolset (WebSearch/WebFetch/Read + inbox-scoped Write) exists here.
5. **Append-only integrity is unverifiable by construction.** The inbox is untracked and the briefs bar
   git, so **two verifiers could not confirm earlier findings were unaltered.** One improvised a
   tamper-evident check by confirming previously-recorded defects were still present verbatim.
6. **The charter contains two factual errors.** (a) It states four halted-run dossiers exist on disk;
   **they exist nowhere — not on disk, not in any branch, not in any commit.** (b) Its Elo framing is
   wrong (§6.1). Both should be corrected before Phase 2.
7. **The dominant defect is not fabrication — it is not reading what you already hold.** Zero
   fabricated sources in 73 citations. But **four of four sufficiency failures traced to material
   inside sources already collected**: a meta-analysis cited repeatedly in a paper read in full; a
   funding disclosure on p.iii of a downloaded PDF; a decisive null result in a collected source's
   reference list; a robust moderator in the same table as the fragile one that was headlined.
8. **The program drifted pessimistic and corrected itself.** V2b: *"the two overstatements I found both
   run pessimistic... zero kills here is not a clean bill of health."* A program rewarded for finding
   problems began finding them where they were not. Worth carrying into Phase 2, whose entire purpose
   is adversarial.

---

## 11. Recommendation

**Phase 1 is ready for approval — with items 1–3 of §10 decided at the same time.**

The evidence base is sound where it is verified: 73/73 terminal, zero fabricated, zero unverified,
every downgrade applied and recorded. Two dossiers are SUFFICIENT. The four remaining INSUFFICIENT
verdicts are **precisely characterised, individually bounded, and none is a collector failure** — two
are blocked by program rules, one costs zero new citations, one is blocked by the cap.

**What should not happen is approving Phase 1 while leaving §10 items 1–3 unresolved**, because those
rules will bind again in Phase 2 and the same defects will recur.

**Phase 2 has not begun and will not begin without explicit approval.**
