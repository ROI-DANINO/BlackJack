# V2 Research 07 — Validation and QA Strategy

> Quality must cover mathematical truth, game behavior, learning integrity, and user comprehension.

## Four QA layers

### 1. Engine fidelity

- deterministic shoe and replay
- legal action generation under every supported rule combination
- dealer procedure and settlement
- split/double/surrender edge cases
- exact payout handling
- round and bankroll invariants

### 2. Strategy fidelity

- profile/ruleset fingerprint match
- every chart cell verified
- fallback actions verified when preferred actions are illegal
- split-hand and post-hit behavior verified
- no recommendation outside legal actions
- independent source cross-check

### 3. Learning integrity

- decision correctness is recorded before outcome feedback
- lucky wrong actions remain wrong
- correct losing actions remain correct
- assistance and chart visibility are recorded
- concept/objective ids are valid
- delayed feedback replays the correct decision state
- mastery summaries can be reproduced from raw events

### 4. UX comprehension

- learner can identify active rules
- learner understands hard/soft/pair
- learner can use the chart
- learner separates decision quality from hand result
- errors are recoverable and do not lose progress silently
- accessibility flows work without mouse/color/motion dependence

## Strategy golden-test format

For each supported profile, maintain reviewed fixtures:

```text
ruleset fingerprint
hand representation
hand source and card count
dealer upcard
legal actions
expected primary action
expected fallback action
decision/cell id
source claim id
```

Golden fixtures should be generated or audited against at least two independent methods where practical.

## Property tests

Examples:

- recommended action is always legal
- identical rulesets produce identical fingerprints
- any strategy-affecting field change invalidates a profile match
- card conservation holds through arranged drills and splits
- settlement deltas sum to bankroll change
- replaying the same seed/commands produces the same state/log
- UI cannot submit an action absent from engine legal actions

## Ruleset test matrix

### V2 required

- current H17 baseline
- S17 comparison profile after implemented
- double unavailable fallback states
- split unavailable fallback states

### Model-ready but deferred

- surrender/no-surrender
- DAS/no-DAS
- peek/ENHC/OBO
- split-ace variants
- 3:2/6:5 settlement

Do not claim support because fields exist. A ruleset is supported only when engine, strategy, bridge, content, and tests agree.

## Content validation

CI should reject:

- unknown references
- duplicate stable ids
- unsupported ruleset/profile links
- untranslated required strings for a shipped locale
- strategy prose that embeds an unverified action claim
- exercises that cannot be generated legally
- content version regressions

## Cross-language contract QA

- Rust serializes canonical fixtures
- TypeScript parser validates and round-trips supported messages
- Python audit tooling reads the same event/ruleset artifacts
- schema/version mismatch produces explicit errors

## Replay QA

A learning bug report should include enough data to reconstruct:

- ruleset and strategy versions
- seed or arranged prefix
- engine command sequence
- learner action sequence
- feedback mode and assistance context
- resulting event log

## Pedagogical QA scenarios

- correct hit loses immediately
- wrong stand wins because dealer busts
- action is correct only under one of H17/S17
- preferred double is unavailable and fallback is required
- pair classification conflicts with hard-total instinct
- soft hand changes to hard after a hit
- user opens chart before answering
- user retries immediately and later after spacing

## QA gates before roadmap expansion

The first V2 slice is ready to expand only when:

- one ruleset/profile pair is provenance-verified
- decision events are strategy-based and replayable
- immediate and delayed feedback work
- targeted retry uses concept evidence
- current V1 Free Play remains regression-safe
- beginner playtest reveals no blocking comprehension failure

## Requires code inspection

- current test coverage for unsupported ruleset ids
- whether strategy tables have external provenance fixtures
- whether bridge schemas are generated or manually duplicated
- whether drill records preserve the exact decision state
- whether local export can accommodate learning events without breaking V1 history
