# C1 — Knowledge Tracing · bounded collection top-up

**Dispatch as:** `audit-collector` · model `opus` · Wave 1 (parallel with C2–C5)

## Where this fits
A blackjack training product needs a mastery model. C1's dossier passed citation verification (all
VERIFIED) but was judged INSUFFICIENT on the research-sufficiency axis, twice.

## Read first
1. `journal/raw/_inbox/foundation-audit-p1/C1-knowledge-tracing/dossier.md`
2. `journal/raw/_inbox/foundation-audit-p1/verification/V1b-knowledge-tracing-sufficiency.md`
3. `journal/raw/_inbox/foundation-audit-p1/verification/V1c-knowledge-tracing-toppedup.md` — re-verification after the first, MIS-SCOPED pass
4. `journal/raw/_inbox/foundation-audit-p1/_templates/evidence-quality-rubric.md`

## Why an additional pass is authorised
Amendment 6 permits an additional focused pass where **the previous pass was mis-scoped**. It was:
the first pass returned sources on *new-learner cold-start against an existing population* — a
different question. That mis-scoping was the orchestrator's error. Record this justification.

Amendment 5 exempts sufficiency top-ups from the 15-citation cap. C1 stands at 21; that is not a
reason to hold back, nor licence for open-ended collection. Stay in the named gap.

## The gap — search for exactly this
The unevidenced step is **obtaining item difficulties before any response population exists** — NOT
new-learner cold-start against an existing item bank, which is already covered.

1. **Population-free / zero-population item-difficulty estimation.** Expert/judgmental estimation and
   its accuracy vs empirical calibration (Angoff-style and successors); automated/linguistic item
   difficulty prediction from item features; LLM- or model-predicted difficulty; cold-start item
   calibration; synthetic or simulated calibration data.
2. **Single-learner / very-low-data ability estimation.** Bayesian IRT with informative priors;
   small-sample and few-response ability estimation; single-subject/idiographic measurement; adaptive
   testing with tiny calibration samples; what the minimum-sample literature actually reports.
3. **Does any defensible method exist before a response population accumulates?** A well-evidenced
   "no" is a legitimate and valuable result — report it rather than manufacturing a positive finding.

Target **4–6 sources**. Prefer primary sources and authoritative reviews.

## Known context you must not contradict
- Every model examined (BKT, PFA, DKT, IRT, education-Elo) calibrates from a response population.
- Education-Elo treats the **item** as the opponent; it does NOT require a peer-opponent pool.
- Chess.com sets a new puzzle's difficulty by crowd-calibration, then locks it.
- Items attempted by ~1 student yield degenerate 1.0/0.0 difficulties (overfitting, data leakage).
- Khan Academy's mastery ladder uses deterministic percentage thresholds, no probabilistic estimate.
- "~100 students" is Pelánek's rule of thumb, **not a measured threshold** (Q4). Never quote as measured.

## Output
Append to the dossier, **append-only**. Mark added citations so they stay distinguishable from the
initial collection (amendment 5 requires separable counts).
Report → `journal/raw/_inbox/foundation-audit-p1/remediation/C1-collection-report.md`.
**Do not append to the shared registers** — return rows in your response text.
C1 carries a standing obligation: state at the dossier head whether the evidence now settles the
**mastery-model choice**. Say plainly if it does not.

Return: `Card`, `Result`, `Evidence`, `Next`, `Files`, `Blocker`, added-citation count, register rows.
