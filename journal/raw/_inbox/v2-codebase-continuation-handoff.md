# V2 Codebase Continuation Handoff

## Mission

Continue the V2 research inside the real repository. Read the raw research and current code, validate assumptions, then produce an evidence-based implementation plan and roadmap proposal. Do not treat raw-inbox recommendations as accepted architecture.

## Required reading order

1. `AGENTS.md` and repository workflow instructions.
2. `ROADMAP.md`, `docs/architecture.md`, `docs/specs/stack-boundaries.md`.
3. V2 roadmap/design specs and current guided-drill plans.
4. Existing files already in `journal/raw_inbox`:
   - `how-to-teach.md`
   - `rules-spec.md`
   - `unit-1-basics.md`
   - `unit-2-basic-strategy.md`
   - `roadmap.md`
5. The seven `v2-research-*` documents in this directory.
6. Rust rules, round flow, settlement, strategy oracle, WASM bridge, TypeScript bridge validation, drill controller/unit/feedback, tests, and history export.

## Guardrails

- Preserve QA-passed V1 behavior unless evidence identifies a correctness or extensibility blocker.
- Treat rulesets as first-class data, but do not support every blackjack variant now.
- Baseline-first teaching is allowed; universal-ruleset claims are not.
- Keep game rules, strategy truth, teaching content, curriculum, learner evidence, and presentation separate.
- Do not move game or strategy logic into React.
- Do not create a generic LMS.
- Do not invent strategy/probability claims.
- Prefer one vertical slice and a second real ruleset profile over speculative abstractions.
- Do not edit `ROADMAP.md` until findings and plan options are documented.

## Known repository facts to verify

- `Ruleset` already models several rule dimensions.
- `v1_h17_ruleset()` is the executable default.
- `basic_strategy_action()` rejects any ruleset id other than `v1-modern-classic-h17-6d`.
- the uploaded learning chart is S17-specific and therefore mismatched with the current oracle/default.
- the drill starts sessions with `ruleset: null`, therefore implicitly uses the default.
- current drill records need inspection for explicit strategy evaluation, assistance context, response time, concept ids, and decision-state replay.

## Code inspection questions

### Ruleset completeness

- Which behavior is configurable versus hard-coded?
- Are peek, no-hole-card, surrender, double restrictions, and blackjack-loss semantics explicit?
- Are current booleans capable of invalid combinations?
- Is `blackjack_payout: f32` appropriate for exact/versioned settlement?
- What fields affect strategy and therefore belong in a fingerprint?

### Strategy oracle

- Are table constants independently verified and documented?
- Can the current interface return decision/cell ids and fallbacks?
- Should profiles be compiled, generated, or validated at build time?
- How should unsupported profiles fail across Rust/WASM/UI?
- What is the smallest change that allows a second verified S17 profile?

### Learning loop

- At what point is a learner decision captured and evaluated?
- Can feedback be immediate or delayed without duplicating game flow?
- Can one situation produce multiple decision records as a hand evolves?
- Are concepts, objectives, misconceptions, hints, and chart use represented explicitly?
- Does the record distinguish skill evidence from hand outcome?

### Contracts and data

- Where are Rust and TypeScript shapes duplicated?
- What schema/version strategy already exists?
- Can V1 JSONL coexist with learning events, or should exports be separate?
- What is required now for local persistence versus only event-schema readiness?

### UI readiness

- Which components currently contain domain assumptions?
- Are game, learning, and presentation state separable without a rewrite?
- Are loading/error/unsupported-profile states explicit?
- Can a future rule card and chart consume view models rather than engine internals?

## Required deliverables before implementation

Create repository-grounded documents containing:

1. **Current-state findings** — exact files/symbols/tests and confirmed behavior.
2. **Mismatch ledger** — research claims vs repository reality.
3. **Decision candidates/ADRs** — at minimum:
   - ruleset representation and fingerprinting
   - strategy profile storage/generation
   - learning event model
   - ownership of learning orchestration
4. **Options analysis** — simplest viable option, stronger option, rejected overengineering.
5. **Vertical-slice plan** — tasks, dependencies, tests, exit criteria.
6. **Roadmap proposal** — only after the above, with V2/deferred boundaries.
7. **Risk register** — V1 regression, strategy mismatch, schema drift, content duplication, UX coupling.

## Recommended vertical slice to evaluate

```text
Explicitly select current H17 ruleset
→ run one guided concept through the real engine
→ evaluate each learner decision with the matching profile
→ emit a versioned learning event
→ support immediate and delayed feedback
→ show decision verdict separately from outcome
→ export/replay the session
→ reject an intentionally mismatched S17 profile
```

Then implement or spike the second S17 profile. Two actual profiles are the evidence needed to shape the registry abstraction.

## Validation commands

Discover and use repository-standard commands from `CONTRIBUTING.md` and package manifests. At minimum, run the relevant Rust tests, TypeScript tests/typecheck, WASM build/contract checks, and content validation introduced by the plan. Record exact commands and outputs in run notes.

## Reporting format

For every conclusion, label it:

- **Verified repository fact**
- **Verified external fact**
- **Inference**
- **Recommendation**
- **Open question**
- **Deferred**

Cite file paths and symbols. Never present a raw-inbox proposal as an accepted decision.

## Stop conditions

Do not begin broad implementation if:

- strategy source/provenance is unresolved
- ruleset/profile matching is ambiguous
- the vertical slice would require rewriting V1
- learning correctness is still tied to outcomes
- the proposed data model has no concrete consumer in the slice

Escalate these as decision points with options rather than silently choosing a large redesign.
