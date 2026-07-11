# V2 Research 04 — Content and Data Architecture

> Design direction only. Validate against the codebase before adopting schemas.

## Goal

Make learning content reusable across rulesets, exercise formats, UI redesigns, and future localization without turning the project into a generic course platform.

## Separate authoring from runtime

### Authoring content

Human-readable Markdown/YAML can contain:

- concept explanations
- teaching rationale
- misconception notes
- source commentary
- curriculum intent

### Runtime content

Validated, versioned data should contain:

- stable ids
- ruleset/profile references
- prompts and short explanations
- exercise constraints
- concept and objective tags
- feedback references
- provenance ids

Markdown must not be the source of truth for strategy actions.

## Recommended domain entities

### Rules and strategy

- `RulesetDefinition`
- `StrategyProfile`
- `StrategyDecision`
- `RuleDelta`
- `SourceClaim`

### Learning content

- `Concept`
- `LearningObjective`
- `Misconception`
- `Explanation`
- `Curriculum`
- `LessonDefinition`
- `ExerciseTemplate`
- `ScenarioConstraint`

### Learner evidence

- `LearningSession`
- `DecisionAttempt`
- `AssistanceContext`
- `FeedbackEvent`
- `MasteryEvidence`

## Key relationships

```text
RulesetDefinition ──fingerprint──> StrategyProfile
StrategyProfile ──supports──> StrategyDecision
Concept ──taught by──> LessonDefinition
ExerciseTemplate + ScenarioConstraint ──generates──> ExerciseInstance
DecisionAttempt ──evaluated against──> StrategyProfile
DecisionAttempt ──adds evidence to──> MasteryEvidence
```

## Stable IDs and versioning

- IDs identify meaning; versions identify changes.
- Never reuse an id for materially different rules or pedagogy.
- Store `schema_version`, `content_version`, and `strategy_version` separately.
- Progress records should preserve the versions under which evidence was collected.
- Renames need aliases or migrations, not silent id replacement.

## Suggested repository shape

```text
content/
  concepts/
  misconceptions/
  explanations/
  curricula/
  lessons/
  exercise-templates/
  sources/
data/
  rulesets/
  strategy-profiles/
  generated/
schemas/
  ruleset.schema.json
  strategy-profile.schema.json
  lesson.schema.json
  learning-event.schema.json
```

This is a direction, not a required immediate restructure.

## Example design sketch

```json
{
  "lesson_id": "baseline-hard-stiffs-v1",
  "content_version": 1,
  "ruleset_scope": ["v1-modern-classic-h17-6d"],
  "objective_ids": ["classify-hard-stiff", "apply-weak-dealer-response"],
  "exercise_plan": [
    {"template_id": "classify-hand", "count": 3},
    {"template_id": "strategy-decision", "count": 8, "chart_visible": true},
    {"template_id": "play-full-hand", "count": 2, "feedback_timing": "end_of_hand"}
  ]
}
```

## Explanation architecture

Separate:

- short corrective message
- expanded mathematical explanation
- ruleset-delta explanation
- outcome/variance explanation
- accessibility-friendly card description

One strategy decision may reuse several explanations depending on the learner's error and training mode.

## Localization readiness

- keep stable semantic ids independent of English/Hebrew copy
- avoid embedding action letters in prose
- support RTL layout as presentation, not content logic
- keep card ranks/actions represented semantically
- allow translated short and expanded explanation variants

## Generated artifacts

Strategy tables and high-volume exercise instances may be generated, but generated output must be reproducible from:

- generator version
- ruleset fingerprint
- source data/version
- deterministic seed where applicable

Generated files should be validated in CI and not manually edited.

## Learning event minimum

```json
{
  "event": "decision_submitted",
  "session_id": "...",
  "exercise_id": "...",
  "ruleset_id": "...",
  "strategy_profile_id": "...",
  "concept_ids": ["soft-18"],
  "selected_action": "stand",
  "recommended_action": "hit",
  "legal_actions": ["hit", "stand"],
  "chart_visible": false,
  "hint_level": 0,
  "response_ms": 4100,
  "outcome_known": false
}
```

Store raw evidence; derive summaries such as accuracy later.

## Integrity rules

- content cannot reference an unknown concept, ruleset, or strategy profile
- an exercise cannot offer an action the engine says is illegal
- feedback cannot claim correctness without a strategy evaluation record
- rule-delta lessons must identify both source and target profiles
- learner progress cannot merge evidence from incompatible strategy profiles without an explicit aggregation rule

## Open questions

- Should authored YAML compile to JSON consumed by TypeScript, or should Rust expose lesson-ready data?
- Which layer owns exercise generation versus exercise sequencing?
- How much content should be embedded at build time versus loaded dynamically?
- Does V2 need persistence now, or only a stable event format and in-memory implementation?
