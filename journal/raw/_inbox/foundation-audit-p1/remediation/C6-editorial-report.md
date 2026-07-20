# C6 — Editorial Correction Report

> Corrector: Claude (Opus 4.8, 1M) — EDITORIAL CORRECTOR role, `.claude/agents/audit-editor.md`
> Date: 2026-07-20  |  Marker used throughout the dossier: `[C6-EC, 2026-07-20]`
> Scope: land the already-recorded corrections from **V6** (F1–F6) and **V6b** (F7–F9) into
> `C6-blackjack-teachable/dossier.md`. **No collection. No re-judgement of sufficiency.**

## Why this pass existed

A program-integrity audit established that no pass in this program was ever chartered to write
verifier corrections into the dossiers. C6's corrections were recorded by two independent verifiers
and returned as text — and stopped there. Five sibling cards were repaired; C6 was deliberately
excluded from remediation, leaving it the least-corrected card in the set while carrying a passing
SUFFICIENT verdict. **V6b's corrections were unapplied by construction**: V6b was the last record
written on this card, and nothing ran after it.

Confirmed on arrival: the dossier still carried `44%` ×3 and `16%` ×3 as live claims, the word
`Assumption` appeared once in the entire file, and `one-tailed` had **zero** hits.

## Findings CHANGED

| ID | Correction landed | Source of the correction | Severity |
|---|---|---|---|
| **F1** | Supporting location corrected: the "over 4,300 hands / 1,300 rounds / Bally MP-21" passage is in **§1 Introduction**, not §2.1.1 (which covers game rules). Win rates 48.1%/36.6% appear in the Introduction **and** the Table 4 note / Table 4 Panel A discussion, not the Introduction alone. Added the omitted §2.1.2 caveat: the table had **no surrender option and no recorded instance of any player buying insurance** | V6 | Low (locator) + a substantive added caveat |
| **F2** | **The "44% passive / 16% aggressive" statistics are DROPPED.** Status bucket re-bucketed **Evidence-backed → Assumption**. Tier split: **Q6** for the (now dropped) statistics, Q3 only hypothetically for the unread paper. The "three independently-worded secondary summaries" access claim is struck and replaced with what V6 actually found: one Q6 blog (Griffiths, *Psychology Today*, "Basic Instinct", 2013) plus an uncited near-verbatim echo (Untamed Science), with attribution ambiguous between Keren & Wagenaar (1985) and Wagenaar (1988); the *Washington Post* corroboration returned HTTP 403 and was never confirmed. Permitted citation form stated explicitly; primary text quarantined to source-lead register **#10** | V6 (Kills entry) | **Highest on the card** |
| **F3** | Both Study-2 behavioural effects disclosed as **one-tailed**, with the t-statistics restored: bets **t(105)=1.79, p=0.04, one-tailed**; information search **t(92)=1.86, p=0.03, one-tailed**. Causal framing explicitly preserved; magnitude claim softened | V6 | Medium |
| **F4** | Quote restored verbatim with **both** of the source's own hedges, which the collector's rendering had silently removed — "**suggested**" (had been rendered "found") and "**in part**" (had been dropped). Added the omitted and material limitation: the simulation used "**simplified rules (no splitting, doubling down, insurance, etc.)**" and "**the probability of winning was controlled by the computer**". Access upgraded: abstract is verbatim-verified (Montclair State portal), no longer "unverified secondary summaries" | V6; V6b attests directly that F4's quote was *still* missing "in part" | **High** |
| **F5** | **Upgrade.** Access claim corrected — the 403 was referer-gating, not a hard block; V6 retrieved the full 43-page PDF. The collector's open question is closed **in the collector's favour**: the paper contains zero occurrences of "percent", five "%" characters, one "Table", and **no quantitative accuracy data whatsoever** | V6 | Low (upgrade) |
| **F6** | Paraphrase completed — the dossier's "gave less-complete survey responses" omitted the source's second, distinct attrition clause "**and were less likely to return follow-up questionnaires**". Access upgraded to verbatim publisher abstract; figures confirmed exact. V6's note recorded that the abstract's closing sentence supports the collector's bridge *slightly better* than claimed. **V6b's open mismatch RESOLVED — see below** | V6; loose end from V6b | Low |
| **F7** | Two V6b downgrades landed in the **Q2 coverage-gap paragraph**. (a) "**explicitly designed to approximate realistic table pace**" **struck as unsupported** — the abstract says only "changing speed criterion training exercises", full text unread. This is load-bearing: Q2's declared gap was *precisely* "counting accuracy under realistic table speed", so the phrase was doing the work of falsifying the gap. Corrected to **gap NARROWED, not cleanly refuted**. (b) "**zero baseline accuracy**" struck — the source says participants did not count *accurately*, i.e. below criterion, not necessarily 0%. Also landed: V6b's on-the-record confirmation that the "100% accuracy" figure was correctly kept tied to training exercises and never allowed to attach to the mock-casino probes | V6b | **High** (a) / Low (b) |
| **F7 tier** | **Upgrade/confirmation.** Q3 confirmed **honest and deliberately conservative** — the design is nominally Q2 (multiple baseline with staggered baselines is genuine experimental control); tiering down for n=4 errs *against* the product's interest, which is the correct direction of error | V6b | Confirmation |
| **F8** | "**in an actual casino**" **struck as unsupported** — the source says "won money **in a casino setting**" / "generalized to a **naturalistic setting**", and F7 (the same study) says **mock casino**. Permitted citation form stated; the "actual casino" framing is barred from propagating. Noted that the dissertation's "authentic casino outcomes" belongs to **Experiment II**, not the Experiment III training result — the two were conflated. Logged against conflict-register **#28** | V6b | **High — this is the overcorrection the card was warned about** |
| **F8 quote label** | "in full" corrected to "**abstract, Experiments I–III sentences**" — the span is verbatim exact (curly-apostrophe aside) but omits four opening sentences and one closing sentence. Recorded that the omitted closer is *pro-training*, so the omission **under-claims** rather than inflates | V6b | Low |
| **F8 same-study basis** | Struck "the '3 of 4 participants won money' figure matches F7's abstract **exactly**" — it does not; the dissertation says "**three participants**", not "3 of 4". **The conclusion (same study) is retained** — it is well-supported on other grounds. Basis corrected, not conclusion | V6b | Low |
| **F9** | **Upgrade.** "466 citations (not independently recounted by me)" superseded — V6b recounted via the Semantic Scholar graph API and confirmed `citationCount: 466`, exactly right. Recorded as the cleanest of the three focused-pass citations; the passive hedge "Doubt is cast on" was verified preserved rather than strengthened | V6b | Low (upgrade) |
| **Q1 gap paragraph** | "**corroborated by** Speelman's 2016 dissertation (F8)" struck → "**re-reported in**". The original wording dropped the same-study caveat that F8's finding block states correctly, so a reader working from the coverage-gaps section alone — the section downstream work actually quotes — would read it as independent corroboration of an n=4 result. Residual double-count risk closed | V6b | Medium |
| **Candidate conflicts** | The F1-vs-F2 magnitude conflict is marked **dissolved, not open**, per conflict-register **#16** (`resolved-as-dissolved`). Side B has no verified provenance, so there is nothing for Side A to conflict with. Recorded what survives: the **direction** has **one** verified source (F1), no longer two, and **no precise magnitude is supported by anything** in this dossier | V6 | **High** — this section carried the dropped figures as live claims |
| **Header** | Added a correction banner at the top of the dossier summarising the four use-affecting changes, the upgrades, and an explicit statement that the card's thinness is a verified finding about the literature, not a defect — and was not padded | This pass | — |

## V6b's self-disclosed loose end — RESOLVED

V6b flagged an unresolved mismatch on F6 and said *"a byte-level diff would require git, which my
brief bars me from running."* I am equally barred from git, but the question is settleable by reading
both texts directly, which I did.

- **V6 claimed** the dossier rendered Gainsbury's "less likely to return follow-up questionnaires" as
  "less likely to return following the initial study."
- **V6b could not find that phrase** in the dossier and could not tell whether V6 paraphrased loosely
  or whether F6 had been altered after V6 read it — an open integrity question on the card.
- **Resolution: the phrase never existed in the dossier.** The pre-correction F6 read "venue
  participants gave less-complete survey responses." V6 was loosely paraphrasing *the source's* clause
  when describing the dossier's drift, not quoting the dossier.
- **Therefore F6 was not touched; V6's quotation of the dossier was imprecise.** The real defect was a
  different one — the **omission** of the follow-up-questionnaire clause entirely — which I have now
  corrected. Recorded in the dossier so this does not remain an open question.

## Examined and deliberately LEFT UNCHANGED

| Item | Why left alone |
|---|---|
| **F1's core figures** — 80%/20%, 339/84/423, 48.1%/36.6%, "over 4,300 hands" | V6 string-matched every one against a locally-extracted copy: **all exact**. Accurate as written |
| **F1's Q3 tier and "correlational, not causal" caveat** | V6: "confirmed correct". No change warranted |
| **F2's bibliographic details** (authors, year, journal, volume, pages, DOI) | Real, correctly attributed, correctly dated and paginated — corroborated across DOI, Semantic Scholar, PhilPapers, and F1's own reference list. **The citation is not killed; only its statistics are.** Left intact deliberately |
| **F2's design description** ("112 subjects, Amsterdam casino, complete play histories + interviews") | Independently corroborated by V6 across multiple sources. This is what F2 may still be cited for |
| **F3's Study-1 figures** — 80.1%/62.0%/18.1, "114 of 118", r=0.30, r=0.13, 40-item KCA | Every figure verified exact by V6. Left as written |
| **F3's "n=115, 108 after exclusions"** | V6: "arithmetically right" (paper states n=7 excluded). No defect |
| **F3's "does not disaggregate accuracy by decision category"** | V6 read the full Results and **confirmed** it. Accurate |
| **F3's Q3/Q2 split tier** | V6: "confirmed correct" |
| **F5's abstract quote** | V6: matches the source "verbatim and matching the dossier exactly". No drift |
| **F6's bucketing as Assumption + bolded domain mismatch** | V6: "honest and correct — this is the dossier's best-handled citation." Left untouched and the praise recorded |
| **F6's sample figures** (127 students / 124 club patrons) | Confirmed exact against the verbatim publisher abstract |
| **Q3 coverage gap** (per-decision-type error breakdown) | **Verified honest by V6 and explicitly must be left standing.** V6's own independent searching also returned only practitioner advice. V6b confirmed Q3 carries no correction marker and was never touched. Untouched by this pass |
| **F7's abstract quote** | V6b confirmed word-for-word on two hosts (PubMed/NLM and ERIC/IES). No drift |
| **F7's n=4 / multiple-baseline caveat** | Stated correctly and repeatedly; V6b explicitly praised the discipline. Left |
| **F9's abstract quote and its "Doubt is cast on" word order** | V6b checked this specifically because of the card's F4 history and found the pass "did what it said". Accurate as written |
| **F8's "not independent corroboration… very likely the same study" guard** | V6b: "That guard is explicit and correct." Left intact |
| **F8's Q4 tier** | V6b: "acceptable pragmatic placement". Left |
| **F8's "authentic casino outcome variance" (Experiment II)** | This one **is** supported — the dissertation genuinely uses "authentic casino outcomes" for Experiment II. Only the Experiment III "actual casino" claim was wrong. Left as written, deliberately, to avoid over-correcting |
| **Q4 coverage-gap paragraph** | V6b assessed both sides as fairly represented with neither quietly favoured, and noted the asymmetry runs *against* the product's interest. Already correctly says "mock casino". No correction recorded against it |
| **The focused pass's restraint on the putative "replication and extension"** | V6b independently confirmed via Crossref/ERIC/Semantic Scholar/PubMed that **it has no bibliographic footprint**. The pass was right to decline to cite it. Left |
| **Citation count of 3 in the focused pass (below the 4–6 floor)** | V6b: correct restraint, independently evidenced. Not padded, and not padded by me |

## Nothing manufactured

Per the calibration warning, every change above traces to a correction **explicitly recorded** in V6
or V6b. I added no defect of my own invention. Two items I checked and declined to treat as defects:

1. **F8's Experiment II "authentic casino outcomes"** — accurate as written; only Experiment III's
   setting was overstated. Correcting both would have been mechanical over-application.
2. **F2's citation itself** — V6 dropped a *claim element*, not the citation. Killing the citation
   would have overstated V6's own finding. The study survives; its numbers do not.

## No collection performed

No WebFetch call was made. Every correction was landed from the verbatim source quotations already
recorded in V6 and V6b, both of which locally extracted and string-matched their sources. No source
was added; no source-lead or conflict register was appended to.

## Files

- `journal/raw/_inbox/foundation-audit-p1/C6-blackjack-teachable/dossier.md` — edited in place
- `journal/raw/_inbox/foundation-audit-p1/remediation/C6-editorial-report.md` — this report
