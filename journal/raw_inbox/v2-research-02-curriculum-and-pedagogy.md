# V2 Research 02 — Curriculum and Pedagogy

> Research input, not a final implementation specification.

## Core principle

**Verified design principle:** grade the quality of the decision against the active ruleset-matched strategy, never the hand outcome. Outcome and skill must remain separate in feedback, telemetry, and progression.

## Learning target hierarchy

1. **Game literacy** — card values, soft/hard, dealer upcard, action meanings, outcomes.
2. **Rule literacy** — identify the active table rules and legal options.
3. **Chart literacy** — classify the hand and navigate the correct row/column.
4. **Decision recall** — choose the recommended action with and without support.
5. **Procedural transfer** — play full evolving hands correctly.
6. **Ruleset transfer** — notice when a changed table rule changes the answer.
7. **Automaticity** — accurate decisions at realistic pace, only after accuracy is stable.

## Recommended curriculum spine

### Subject A — Blackjack Foundations

- objective and asymmetric order of play
- rank values and ace valuation
- hard, soft, pair, natural, bust
- dealer upcard and hidden information
- hit and stand
- double and split when legal
- dealer fixed procedure, including active soft-17 rule
- settlement and 3:2 vs 6:5 awareness
- active-table rule card

### Subject B — Strategy Table Fundamentals

- what Basic Strategy is and is not
- strategy belongs to a ruleset
- classify before lookup: pair → soft → hard
- dealer column navigation
- fallback notation: double/surrender when unavailable
- chart-open guided decisions
- chart-faded and chart-hidden decisions
- full-hand transfer

### Subject C — Rule Variation Literacy

Introduce only after baseline fluency:

- identify H17/S17
- identify deck count, DAS, surrender, payout, and hole-card protocol
- compare one rule change at a time
- practice delta cells
- mixed-table identification and application

## Exercise ladder

For each concept, progress through:

1. recognition
2. guided classification
3. chart-open decision
4. chart-hidden decision
5. production before buttons appear
6. multi-step hand
7. interleaved review
8. timed practice after mastery

The same content should be reusable across this ladder; do not duplicate lessons as prose variants.

## Error taxonomy

Record at least:

- `hand_classification_error`
- `dealer_column_error`
- `rule_identification_error`
- `illegal_action_attempt`
- `strategy_recall_error`
- `fallback_rule_error`
- `outcome_bias`
- `dealer_rule_mimicry`
- `risk_aversion_stand`
- `greedy_split_or_double`
- `input_slip_or_timeout`

A misconception should be inferred only with repeated evidence or an explicit reasoning prompt. Do not label one wrong tap as a stable belief.

## Feedback model

### Immediate feedback

Use for new concepts and guided practice:

- decision status independent of outcome
- one-sentence correction
- active ruleset reference when relevant
- optional “why” expansion
- continue the hand through the actual engine

### Delayed feedback

Use for transfer and assessment:

- do not interrupt every choice
- mark decisions for end-of-hand or end-of-session review
- replay the exact decision state
- group errors by concept and misconception

The roadmap should not choose one global feedback mode. Feedback timing is a training configuration.

## Mastery model direction

Do not reduce progress to lesson completion. Track evidence per skill and ruleset context:

- attempts and correct decisions
- assistance level
- chart visibility
- response latency
- spacing interval
- recency
- transfer performance in full hands
- performance across more than one session

Suggested state labels are descriptive, not fixed thresholds:

`introduced → supported → recalled → transferred → retained → automatic`

Thresholds require product data and user testing. Mark them as provisional until validated.

## Spacing and interleaving

- repeat weak items sooner, but avoid immediate loops that reward short-term memorization
- mix old and new concepts
- interleave hard/soft/pair classification once each is introduced
- schedule delayed retrieval across sessions
- include occasional high-frequency easy cells to preserve fluency and confidence

## Ruleset pedagogy guardrail

Do not teach every table configuration at once. Use a baseline plus explicit deltas:

```text
Baseline rule card
→ one changed rule
→ what behavior changes
→ what strategy cells change
→ targeted practice
→ mixed comparison
```

This teaches transfer without forcing the learner to memorize several full charts independently.

## Research/user-test questions

- Do beginners understand that a chart is conditional on table rules?
- Can they identify soft/hard before choosing an action?
- Does immediate feedback create dependency on hints?
- Does a correct decision followed by a loss reduce trust?
- Can learners explain H17/S17 after seeing the table badge?
- Can they transfer from isolated cells to live hands?
- Which ruleset differences are cognitively manageable together?

## Deferred

- XP economy, leagues, ranks, daily challenges
- card counting curriculum
- betting ramps and risk-of-ruin
- casino-noise simulation
- universal LMS abstractions

## Learning-science references

Use these as general design evidence, not blackjack-specific prescriptions:

- Roediger & Karpicke (2006), test-enhanced learning/retrieval practice.
- Cepeda et al. (2006), distributed practice review.
- Kornell & Bjork (2008), interleaving and inductive learning.
- Bjork & Bjork, desirable difficulties.
- Ericsson et al. (1993), deliberate practice and feedback.

## Requires code inspection

- Whether the current drill records the first decision or only final hand outcomes.
- Whether feedback is currently strategy-based or outcome-based.
- Whether the drill can pause feedback without changing core round flow.
- Whether situation data already has stable concept and misconception identifiers.
