# C1 Remediation Collection Report (C1-R2)

> Collector: Claude (Opus 4.8) — separate instance from the C1 collector, C1-FP, V1, V1b, V1c
> Date: 2026-07-20  |  Pass: remediation top-up, one bundle
> Status: RAW COLLECTION — DATA ONLY, not authority (Inbox Rule 0). **UNTRUSTED until verified.**
> This collector did NOT verify its own work and does not describe it as verified.

## Authorisation

- **Amendment 6** — an additional focused pass is permitted where the previous pass was mis-scoped.
  It was: C1-FP's Bundle B returned sources on **new-learner cold-start against an existing
  population**, a materially different question from the one assigned. Per the dispatch brief, that
  mis-scoping was the **orchestrator's error**, not the collector's. Recorded here as required.
- **Amendment 5** — sufficiency top-ups are exempt from the 15-citation cap. C1 stood at 21; this
  pass adds 5, to 26. The exemption was treated as permission to close the named gap, not as licence
  for open-ended collection: six further on-topic sources were identified and deliberately left
  uncollected as leads.

## The gap as assigned

Obtaining item difficulties **before any response population exists** — explicitly NOT new-learner
cold-start against an existing item bank, which C1-FP already covered. Plus V1b's M3
(single-learner estimator tradition), which was never assigned to a bundle in the previous pass.

## Dominant-defect check — run FIRST, and it paid

The program's dominant defect is failing to read what is already held. Before searching, I re-read
the dossier's own sources on the load-bearing question. **Pelánek 2017 UMUAI — already cited as F19,
from its abstract and §4.3.1 only** — turned out to contain, three sections away, the most usable
result in this entire pass: an explicit model family (moving-average / exponential-moving-average
baselines) classified in its Fig. 4 as operating **"without assumptions"** and requiring no
population-fitted parameters; a statement that basic BKT does not use item difficulty at all; a
warning that individualized parameters "are fitted using only few data points"; and a default-to-simple
recommendation in §7.1. Recorded as **F27, which adds no new source.**

That source PDF was read directly as rendered pages, making F27 the strongest-access finding here.

## What was added

| # | Source | Access | Direction on Q4 |
|---|--------|--------|-----------------|
| F22 | Kolesnikova, Fedyanin, Hofman, Brinkhuis & Bolsinova (2026), arXiv:2605.18562 — LLMs as difficulty raters, no response data | **Abstract-scope**; PDF body not extractable | For (bounded — "promising", "initial calibration") |
| F23 | Netík & Martinková (2026), arXiv:2605.16991 — response-free difficulty via fine-tuned transformers | **Abstract-scope** | Both — relocates the population requirement, does not remove it |
| F24 | van der Velde, Sense, Borst & van Rijn (2021), *Comput Brain Behav* 4(2):231–249 | Full text (fetch-mediated) | **Against** — measured cost of the no-data Default arm |
| F25 | Sense, Behrens, Meijer & van Rijn (2016), *Topics in Cognitive Science* 8(1):305–321 | **Abstract-scope**; paywalled two ways | For — population-free per-learner estimator |
| F26 | Sense, Meijer & van Rijn (2018), *Frontiers in Education* 3:112 | **Full text, open** | Both — documents the architecture; **null** on pre-learning covariates |
| F27 | Pelánek (2017) UMUAI — **already held as F19** | **Pages read directly** | For, at Q4, with a real trade-off |

**Added-citation count: 5 new sources (F22–F26). F27 adds none.** Target was 4–6.

## Result on the assigned question

**A defensible method before a response population exists does partly exist — but the dossier still
cannot close the mastery-model choice, and this pass did not close it.**

1. Response-free difficulty estimation is a real, active literature (F22, F23), but both sources are
   preprints read **abstract-only**, and **no numeric accuracy figure was obtained** — V1c asked for
   "the measured correlation/error, not the framing" and this pass did not deliver it. F23's method
   still trains on response-calibrated items.
2. **The universal claim in the original Sufficiency Statement is falsified as written.** F25/F26
   document a per-learner, per-item parameter fitted online from one learner's own accuracy and
   response latency, from a fixed default of 0.3, with no population fit. That sentence needs
   correcting.
3. **There is now a measured cost for the zero-data path, and it is unfavourable** (F24): the Default
   arm — fixed value, no predictions — was beaten by every prediction arm (~7.3 pp in-session
   accuracy; RMSE 0.102 vs 0.084). Modest, conditional on difficulty variability, fact-learning domain.
4. **The most usable answer was already on the shelf** (F27): assumption-free moving-average baselines
   need no population-fitted parameters — but estimate **no mastery quantity at all**, which is a real
   product trade-off, and the claim sits at Q4 with its primary sources uncollected.

## Shortfalls stated plainly

- **All F22–F26 quotes are fetch-mediated**, not locally string-matched as V1c's were. This collector
  had no ability to download and extract files. Treat every one as *claimed*-verbatim. F27 is the
  exception (pages read directly).
- F22's PDF body could not be extracted; the tool said so and I did not fill the gap by guessing.
- F25 is paywalled at Wiley (HTTP 402) and at the Groningen mirror (HTTP 403); reliability figures
  not obtained.
- F24's funding and conflict-of-interest statements were **not located** — flagged as unchecked, not
  as absent.
- Participant counts and per-arm designs in F24 reached me only via paraphrase; they are marked
  `[fetch-reported, NOT quoted]` in the dossier and are **not** presented in quote marks.
- Nothing contradicts the brief's "known context"; "~100 students" is not quoted as measured anywhere.

## Leads NOT chased (scope discipline)

EDM 2025 *Evolutionary Features for Mitigating Cold Starts in Logistic Knowledge Tracing*;
Yudelson, Koedinger & Gordon (2013); van Rijn, van Maanen & van Woudenberg (2009);
Wauters et al. (2012) and Pelánek (2014) (the primary sources behind F27's claim);
arXiv:2504.08804; arXiv:2602.06631 (ENEM LLM-difficulty benchmark).

## Registers

**Not written by this collector.** One new conflict row (#9) is returned in the response text for
whoever holds register write access.
