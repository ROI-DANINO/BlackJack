# Buildability — what this project could ship, against what it already has

> **This whole file is `Product judgement`, authored by the orchestrator.** It is not research and
> carries no evidentiary standing. It is a claim about *this codebase*, not about learning — and the
> two are deliberately in separate files so that nobody inherits a build estimate as though a source
> had said it.
>
> It covers the **21 substantive and 2 conditional** rows from `classification.md`. The 9 cosmetic
> rows are omitted, not because they are unbuildable — most are trivial — but because the research
> says building them buys little.

## What the project already has

- A **Rust simulator core** with a WASM boundary: shoes, ordered dealing, rulesets, bankroll as
  first-class integer minor units, split/double legality gated on funds.
- A **ruleset-keyed strategy oracle** in Rust — one verified answer key for any dealt state. This is
  the single most leverage-bearing asset for this catalog.
- A **`ProgressStore`** — built, and currently unwired.
- An **unstyled but functional web app**, with per-hand notes and JSONL history export.
- Rulesets are already parameterised, so a second table is configuration rather than code.

## The tiers

| Tier | Meaning |
|---|---|
| **Now** | Scoring, feedback timing, or presentation over machinery that exists. No engine change. |
| **Small** | One new input surface or one new computation; engine unchanged. |
| **Medium** | New instrumentation, new content authoring, or a new data shape. |
| **Large** | New engine capability, a new grading model, or a language/parser. |

## The table

| ID | Pattern | Tier | What it actually needs |
|---|---|---|---|
| U1-5 | Uninterrupted run, judgement deferred to debrief | **Now** | Suppress per-hand verdicts, buffer them, release at shoe end. Pure feedback-timing. The engine already plays an ordered shoe. |
| U2-13 | Configurable variance sandbox | **Now** | UI over capability that exists — shoe, ruleset and bet ramp are already parameters. See `A-22`: the mechanic is free, the *teaching* claim is unevidenced. |
| U1-6 | Post-hoc graded decision-quality review | **Now / Small** | Oracle gives the correct play per state. Needs an EV-delta per decision to grade *how* wrong, not just whether. If EV-loss is not already computable, this is Small. |
| U3-9 | Convergent-cue generation ("these five take the same action") | **Small** | Group states by oracle answer, present the group, ask for the one action. Entirely derivable from the oracle. |
| U3-1 | Unaided free recall over a region | **Small** | "Name every hand you would double." Set comparison against the oracle's answer set. Needs set-diff scoring, not new engine. |
| U1-3 | Two-bound interval elicitation, hit-rate scored | **Small** | Needs true probabilities (dealer bust rate by upcard). Computable from the engine. Scoring is hit-rate over a session. |
| U3-8 | Continuous probability estimate, proper scoring rule | **Small** | Same computation as U1-3, different elicitation and a Brier score. Build with U1-3 or not at all. |
| U2-6 | Construct-an-object-to-hit-a-target | **Small** | Inverse chart cell: give the answer, ask which state produces it. Oracle inverts trivially. |
| U2-12 | Externally paced feed | **Small** | Deal on a fixed clock rather than on response. A timer over existing dealing. |
| U2-11 | Continuous timed stream, per-element stats | **Small** | Running-count stream at dealer tempo. Same timer as U2-12 plus per-element accuracy. **Conditional** — substantive only if the stream advances independently of the response. |
| U1-8 | Interruptible single-objective segment drill | **Small** | Segment a shoe by phase, allow repeat-until-clean. Needs shoe-position control, which the reshuffle command implies. |
| U1-1 | Whole-policy range painting | **Small / Medium** | A chart-grid input surface, then diff the learner's whole policy against the oracle's. The grid is the work; the grading is a diff. |
| U3-5 | Dynamic assessment with an embedded resource | **Small / Medium** | Present a rule card mid-session and measure whether the learner applies it. Needs mid-session content injection and a before/after split. |
| U3-4 | Contrasting-cases invention | **Medium** | Two rulesets side by side, learner infers the rule that explains the difference. Rulesets are already parameterised — the work is the invention prompt and *not grading the answer*, which is the point (see `classification.md`, U3-4). |
| U1-2 | Retrospective forecasting behind a cut-off | **Medium** | Needs a corpus of already-resolved hands with outcomes hidden. JSONL history exists; the work is curation and cut-off enforcement. |
| U1-4 | Open-ended information gathering before committing | **Medium** | Must instrument *what the learner consults* — rule card, running count, remaining deck — before acting, and score the search separately from the answer. New instrumentation; `ProgressStore` is where it lands. |
| U3-3 | Guidance-faded worked example | **Medium** | Needs assistance tracking and a fade schedule. This is **Seed B**, and `ProgressStore` is the natural home. Note the fading precedent this catalog once attributed to Duolingo was withdrawn — the evidence is the expertise-reversal literature, not a shipped product. |
| U1-7 | Key-features critical-step-only case | **Medium** | Content authoring: identify the 2–5 decision points that matter per scenario. **Conditional** — substantive only if the item set is genuinely reduced to critical steps. |
| U1-9 | Event-set scoring, criteria fixed in advance | **Medium** | Authoring a per-scenario event set plus published criteria. The scoring is mechanical once the set exists. |
| U2-5 | Free-form sketch before formal representation | **Medium** | A drawing surface, and a decision about whether to grade it. Sketch the expected bust-rate curve before the chart is revealed. |
| U2-14 | Free-composition "explain the play" | **Medium / Large** | Small if ungraded and used only as a reflection prompt. Large if graded — that needs language understanding this project has no reason to build. **Ship it ungraded or not at all.** |
| U2-10 | Author a rule, judged by a test battery | **Large** | The learner states a rule ("stand on all hard 17+") and it is run against hands. Needs a rule language and a parser. High value — it is the purest whole-policy test in the catalog — and the largest single build. |
| U3-6 | Construct-a-concept-map | **Large** | Graph input UI and graph grading. Also the row whose own evidence shows the freer widget performing *worse* on the external criterion. **Lowest priority of the substantive set.** |

## What I would actually build first, and why

**The cheap slice that tests the most:** `U1-5` + `U1-6` together.

Suppress per-hand verdicts across a whole shoe, then hand back a graded decision-quality review at
the end. Both are Now-tier, they compose into one coherent mode, and between them they exercise the
product's stated differentiator — grade the decision, never the outcome — more directly than
anything else here. `U1-5` is the deferral; `U1-6` is the grading granularity.

They also wire the two orphans the restructure identified: the review needs the **oracle** (already
built) and the session record needs **`ProgressStore`** (built, unwired).

**The highest-value larger bet:** `U1-1` (range painting). It is the only pattern that tests whether
the learner holds a *policy* rather than a set of memorised cells, and the research is explicit that
decomposing it into per-cell items destroys the measurement — because presenting the cell supplies
the recall.

**What I would not build yet:** `U3-6`, and `U2-14` in any graded form.

## Two honest caveats on this file

1. **A tier is not a schedule.** "Now" means no engine change, not that it is a small piece of work.
2. **These estimates rest on my reading of the repo, not on trying to build anything.** The one that
   would most repay a spike is `U1-6` — the whole tiering assumes an EV-delta per decision is
   derivable from the oracle, and if it is not, that row moves from Now to Small or Medium.
