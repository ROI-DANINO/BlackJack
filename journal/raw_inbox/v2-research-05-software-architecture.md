# V2 Research 05 — Software Architecture

> Preserve the current Rust/WASM/TypeScript/Python division unless code evidence shows a concrete failure.

## Current-state assessment

**Repository fact:** the stack boundary is sound.

- Rust owns simulation and legal actions.
- WASM exposes serializable commands/state.
- TypeScript owns browser interaction.
- Python is reserved for research, generation, audits, and analytics.

The main architectural gap is not language choice. It is the transition from one hard-coded strategy table and one drill to versioned ruleset-aware learning services.

## Target logical layers

```text
React presentation
  ↓ intents / view models
Learning controller (headless TypeScript or Rust-backed orchestration)
  ↓ game commands + strategy queries
WASM contract
  ↓
Rust game engine + ruleset registry + strategy registry
  ↓
validated logs/events
```

Python remains offline tooling for strategy generation, independent validation, simulations, and content audits.

## State separation

Maintain three independent state categories:

1. `GameState` — cards, shoe, legal actions, wagers, settlement.
2. `LearningState` — objective, exercise, attempt, feedback timing, mastery evidence.
3. `PresentationState` — panels, animation, focus, expanded explanation, responsive layout.

Do not serialize transient animation state into the engine. Do not derive legal actions or correctness inside React.

## Ruleset registry direction

Replace a single constructor-only mental model with an explicit registry or validated loading boundary.

A ruleset must have:

- stable id and schema version
- complete behavior fields
- capability declaration
- deterministic fingerprint
- validation errors for unsupported combinations

Avoid boolean explosion where mutually exclusive protocols become contradictory. Prefer enums for surrender, dealer hole-card protocol, blackjack-loss handling, double policy, and split-ace policy.

## Strategy registry direction

The current oracle's explicit id gate is safe but not extensible. Evolve toward:

```text
strategy_for(ruleset_fingerprint) -> verified profile | unsupported
recommend(profile, hand, dealer_upcard, legal_actions) -> action + rationale ids
```

The oracle should return more than an action when learning needs it:

- primary recommendation
- fallback recommendation
- decision key/cell id
- strategy profile id/version
- explanation/rationale ids

Do not make the engine produce learner prose.

## Contract/versioning

- define schemas or generated shared types for commands and responses
- include protocol version in bridge calls before persistence/backward compatibility matters
- reject unknown fields/combinations deliberately rather than silently defaulting
- add contract tests that run the same fixtures through Rust serialization and TypeScript validation

## Headless learning controller

The controller should expose intents such as:

```text
start_lesson
submit_action
request_hint
continue_after_feedback
finish_session
```

It should decide lesson progression, not game legality. It asks the engine to create/play states and asks the strategy service to evaluate decisions.

## Current drill risks requiring inspection

- `ruleset: null` starts every drill on the default, hiding ruleset choice.
- situation records appear to collect actions and outcomes but not explicit strategy evaluation, response time, assistance, or concept ids.
- situation resolution currently appends teaching text after the round resolves; verify whether the first decision is evaluated before later actions obscure it.
- hard-coded bankroll/bet are acceptable for a slice but should not become learning semantics.

## Persistence readiness

V2 does not require accounts or a backend. It does require:

- stable event schema
- local session identifier
- export/replay capability
- versioned ruleset/strategy references
- deterministic reconstruction where possible

Persist derived mastery only after the evidence model is stable. Raw events are the durable source.

## Testing architecture

- Rust unit/property tests for rules and settlement
- golden strategy fixtures for every supported profile
- legality/strategy compatibility tests
- bridge serialization contract tests
- TypeScript controller state-machine tests
- content schema and reference-integrity tests
- deterministic replay tests
- end-to-end vertical-slice tests

## Avoid

- moving strategy logic into TypeScript for convenience
- one giant `Ruleset` with dozens of unrelated booleans and invalid combinations
- runtime Python service
- database/account work before local learning evidence proves necessary
- generalized plugin architecture for hypothetical variants
- coupling lesson ids to React route/component names

## Recommended first architecture spike

Implement no new UI polish. Prove one slice with:

- explicit current H17 profile selection
- strategy evaluation record for each learner decision
- one concept id and one misconception id
- immediate and delayed feedback mode toggle
- exportable learning event
- tests demonstrating that a mismatched S17 profile is rejected

Then add the second S17 profile as the first real extensibility test.
