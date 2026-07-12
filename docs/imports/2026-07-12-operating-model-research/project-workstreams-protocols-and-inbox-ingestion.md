---
title: Project Workstreams, Domain Protocols, and Inbox Ingestion
status: raw-research-input
created: 2026-07-12
intended_destination: journal/raw/_inbox/
author_context: Roi Danino + ChatGPT synthesis
authority: non-authoritative
---

# Project Workstreams, Domain Protocols, and Inbox Ingestion

## Status and purpose

This file is a **raw research input**, not an approved design, protocol, constitution, or source of truth.

Its purpose is to capture a clarified understanding of what may be missing from the Blackjack project operating model, so it can be processed, challenged, researched, and improved inside the local closed framework.

Do not treat the terminology or proposed categories here as final. The local framework should compare this input against the actual project, existing protocols, commands, skills, documentation, and code before deciding what is genuinely missing.

---

# 1. Clarified problem statement

The project likely does **not** lack a general execution framework.

The closed framework already appears to handle much of the general agent workflow:

- orient to the repository;
- read the code that will change;
- compare the code against the approved specification;
- create or execute an implementation plan;
- implement in small steps;
- run verification;
- review the result;
- repeat until the change is correct, coherent, integrated, and complete;
- update project memory and handoff state.

The visible repository also shows a relatively strong delivery loop:

```text
Design
→ Plan
→ Implementation
→ Review
→ Feature QA
→ Milestone QA
→ Reconciliation
```

The likely missing layer is more specific:

> **Domain-specific construction protocols that define what must be true when building each kind of system or change in the project.**

The framework defines **how agents work**.

The protocols should define **what correctness, completeness, evidence, boundaries, and integration mean for a particular class of change**.

---

# 2. The three project workstreams

The previous V1 / V2 / V3 terminology was useful as an initial roadmap, but it does not accurately describe the current reality.

These are not strictly sequential versions. They are better understood as three continuing product workstreams.

## Workstream A — Core Systems, Logic, and Mechanisms

This workstream owns the durable technical and domain foundations.

Examples:

- blackjack rules and domain truth;
- simulation engines;
- deterministic state transitions;
- shoe and card lifecycle;
- legal actions;
- scoring and settlement;
- strategy truth;
- reusable state machines;
- cross-language contracts;
- persistence and history mechanisms when needed;
- general mechanisms used by learning and product layers.

Primary question:

> Is the system correct, deterministic, auditable, reusable, and independent from presentation?

This workstream is currently the most mature.

---

## Workstream B — Learning System and Instructional Experience

This workstream is broader than “learning content.”

It contains two related but distinct layers.

### B1. Learning Architecture

The code and data structures that represent learning.

Examples:

- subjects;
- skills;
- learning outcomes;
- prerequisites;
- units;
- lesson steps;
- exercise types;
- attempts;
- completion evidence;
- progression;
- mastery;
- assessment;
- feedback state;
- curriculum validation.

Primary question:

> Can learning content be represented, validated, executed, measured, and expanded without rebuilding the system for every new subject?

### B2. Instructional Experience

How a learner actually experiences the learning process.

Examples:

- when a concept is explained;
- when the learner observes, tries, applies, retries, or is assessed;
- immediate versus delayed feedback;
- misconception-specific feedback;
- cognitive load;
- pacing;
- lesson rhythm;
- learner control;
- guidance versus independent performance;
- how the product distinguishes understanding, execution, and mastery.

Primary question:

> Does the learning interaction help the user understand, practice, transfer, and retain the intended skill?

These two layers belong to the same workstream, but should not be collapsed into one concept.

Learning architecture is not the same as pedagogy.

Pedagogy is not the same as visual design.

---

## Workstream C — Product and Visual Experience

This workstream owns how the complete product is experienced in actual use.

Examples:

- information architecture;
- navigation;
- screen structure;
- interaction design;
- visual hierarchy;
- responsive behavior;
- accessibility;
- animation;
- game feel;
- onboarding;
- progression presentation;
- feedback presentation;
- design system;
- visual language;
- the final visual shell connecting the core and learning systems.

Primary question:

> Is the product clear, usable, approachable, enjoyable, and visually coherent?

The visual shell may be implemented later, but the earlier systems must expose enough semantic state to support it without major rewrites.

That means visual polish can be deferred, but presentation readiness cannot be ignored.

---

# 3. The critical boundaries between the workstreams

The main architectural risk is not inside the three workstreams individually. It is in the contracts between them.

## Core → Learning

The Core should expose authoritative facts and operations such as:

- legal actions;
- hand facts;
- outcomes;
- strategy recommendations;
- rule compatibility;
- reproducible engine state;
- action consequences;
- stable identifiers and serializable records.

The Learning System should consume this truth. It should not recreate domain logic.

## Learning → Product Experience

The Learning System should expose semantic learning state such as:

- current objective;
- current interaction;
- available learner actions;
- feedback intent;
- correctness state;
- assistance used;
- progress state;
- completion evidence;
- recoverable and fatal errors;
- recap information.

The Product Experience should decide how this state is presented, not what it means.

## Product Experience → Learning → Core

User interactions should move downward through semantic boundaries:

```text
User interaction
→ learning intent or domain action
→ learning controller
→ engine command
→ authoritative result
→ learning interpretation
→ presentation state
```

A future visual shell should not need to inspect internal engine details, infer learning state, or duplicate business rules.

---

# 4. Framework versus protocols

## The framework

The closed framework likely defines general operating behavior:

- how to orient;
- how to gather context;
- how to decide whether research or design is required;
- how to create plans;
- how to execute;
- how to review;
- how to verify;
- how to checkpoint;
- how to preserve context;
- how agents coordinate.

## Domain protocols

Domain protocols define the mandatory requirements for recurring classes of project work.

Examples of questions protocols should answer:

- What must be checked before adding a new engine capability?
- What evidence is required before changing domain truth?
- When must logic live in Rust rather than TypeScript?
- What must a new lesson prove before it is considered complete?
- How does a lesson connect a declared outcome to completion evidence?
- When is a learning mechanic reusable versus lesson-specific?
- What must happen when an engine contract changes?
- How is a new state exposed safely to the future UI?
- When does a change require architecture review?
- When must implementation stop and return to research or design?

The protocols should not duplicate the general execution loop.

They should plug into it.

---

# 5. Candidate protocol families

These are research categories, not a final protocol inventory.

## Core Systems protocols

Possible recurring protocol classes:

- Domain Logic Change
- Engine Capability Addition
- State Machine Change
- Ruleset Change
- Strategy Source or Profile Addition
- Cross-Language Contract Change
- Determinism and Replay
- Persistence Introduction
- Data Migration
- Backward Compatibility
- Performance-Sensitive Mechanism
- External Data or Rules Provenance

## Learning System protocols

Possible recurring protocol classes:

- New Learning Subject
- New Skill or Learning Outcome
- New Unit or Lesson
- New Lesson-Step Type
- New Exercise Mechanic
- Engine-Backed Learning Interaction
- New Feedback Pattern
- Assessment Addition
- Prerequisite or Progression Change
- Mastery or Scoring Change
- Curriculum Validation
- Learning Evidence Review
- Instructional UX Review

## Product Experience protocols

Possible recurring protocol classes:

- New User Flow
- New Screen or Mode
- Presentation-State Addition
- New Interaction Pattern
- Reusable Visual Component
- Responsive Review
- Accessibility Review
- Animation or Game-Feel Addition
- Onboarding Change
- Usability Validation
- Visual Integration of an Existing Capability

## Cross-layer protocols

These may be the most valuable because they protect the boundaries:

- Core → Learning Integration
- Learning → Product Experience Integration
- End-to-End Feature Slice
- Contract Evolution
- Source-of-Truth Ownership Change
- Architecture Exception
- Scope Escalation
- Research Dependency Before Implementation
- Feature Readiness for Visual Integration
- Deprecation and Replacement
- Cross-Layer Regression Review

---

# 6. Protocol selection and routing

The project may need a classification step before work begins.

For every meaningful change, the framework should be able to determine:

```text
What kind of change is this?
Which workstream owns it?
Which other workstreams does it affect?
Which boundaries does it cross?
Which protocols apply?
What is the risk level?
What evidence is required?
Who may approve it?
```

Example:

> Add a new lesson that teaches Split through arranged engine-backed hands.

This may not be only a “lesson content” task.

It could trigger:

- New Unit or Lesson;
- Engine-Backed Learning Interaction;
- Arranged Situation;
- Learning Evidence;
- Core → Learning Integration;
- Feature QA.

The user should not need to manually remember every applicable protocol.

The framework should classify the work and load the relevant protocols.

---

# 7. Not every repeated action needs a protocol

A protocol is justified when several of these are true:

- the action repeats;
- agents may perform it inconsistently;
- it has known failure modes;
- it crosses a system boundary;
- mistakes are expensive or hard to reverse;
- order of operations matters;
- evidence is required before completion;
- an approval or escalation point is necessary;
- the action changes a source of truth;
- the change affects future extensibility.

Smaller work may need only:

- a checklist;
- an architectural principle;
- an automated test;
- an existing review gate;
- no additional documentation.

The goal is not to create a protocol for every project noun.

The goal is to standardize high-risk or frequently repeated construction decisions.

---

# 8. Maturity should be separate from the workstreams

Instead of treating Core, Learning, and Visual Experience as sequential versions, each workstream can have its own maturity state.

Possible maturity model:

```text
Explore
→ Establish Foundation
→ Prove With a Real Slice
→ Expand
→ Harden
→ Polish
```

Current project interpretation, to be validated against the local repository:

- Core Systems: mostly Expand / Harden.
- Learning System: Establish Foundation / Prove With a Real Slice.
- Product and Visual Experience: Explore / early Foundation.
- Core–Learning boundary: active focus.
- Learning–Visual boundary: should be prepared semantically, but not visually completed yet.

This model explains why the project feels “between V1 and V2.”

It is not between versions.

Different workstreams are at different maturity levels.

---

# 9. Important caution: “Foundation” can become scope permission

The word “Foundation” is useful but dangerous.

It can justify speculative abstractions that do not yet have a real consumer.

A foundation should normally have at least one of the following:

- a concrete current consumer;
- a known recurring use case;
- a verified risk it removes;
- a decision it enables;
- a dependency required by an approved near-term slice;
- an explicit exit criterion;
- evidence that delaying it would create substantial rework.

Research should examine whether the project needs a specific protocol for foundation work.

Possible question:

> What must be proven before a foundation-only slice is approved?

---

# 10. Inbox ingestion and information integration concern

There is a second potential gap:

> The project may need an explicit protocol for processing information that enters `journal/raw/_inbox`.

The inbox is useful because it allows raw material to enter the project without immediately polluting authoritative documentation.

However, merely placing information in the inbox does not define:

- who must process it;
- when it must be processed;
- how its reliability is assessed;
- whether it is relevant;
- whether it conflicts with current project truth;
- what decision it is meant to inform;
- whether it is accepted, rejected, deferred, or archived;
- where accepted information should be folded;
- what provenance must be preserved;
- how duplication is avoided;
- how the original raw source is retained;
- when the inbox item is considered fully processed;
- what happens when only part of an item is accepted;
- how the project prevents raw information from being treated as authoritative.

This may already exist in the closed framework. The local research should verify that before creating anything new.

---

# 11. Proposed concept: Inbox Ingestion Protocol

Do not write the final protocol yet.

First determine whether the framework already implements the following lifecycle or an equivalent one.

```text
Raw intake
→ classify
→ validate source and provenance
→ identify intended decision or destination
→ compare against current authoritative state
→ extract atomic claims or findings
→ assign disposition
→ fold accepted information into owned sources
→ record rejection, deferral, or conflict
→ preserve original source
→ verify no unresolved dependency remains
→ close the inbox item
```

## Possible dispositions

A useful model may include dispositions such as:

- Accepted
- Accepted with qualification
- Partially accepted
- Rejected
- Superseded
- Duplicate
- Deferred
- Needs verification
- Conflicts with current decision
- Reference only
- Not relevant
- Unsafe or untrusted

These are only candidate concepts.

The local framework may already use different terminology.

## Key principle

> Inbox content is evidence or input, never project truth by default.

Raw imports should not outrank:

- approved decisions;
- architectural ownership;
- verified domain sources;
- current code behavior;
- authoritative specs;
- validated product requirements.

## Required questions for every inbox item

The future protocol may need to answer:

1. What is this item?
2. Where did it come from?
3. Is the source trusted, untrusted, or unknown?
4. What claim or decision is it relevant to?
5. Does it describe current reality, a proposal, or a hypothesis?
6. Does it conflict with existing authoritative material?
7. What part is useful?
8. What part must be rejected or verified?
9. Where should accepted knowledge live?
10. What evidence shows the fold was complete?
11. Should the original remain archived?
12. What would reopen this item later?

---

# 12. Inbox processing failure modes to research

The local review should explicitly look for these risks.

## Raw-to-truth leakage

A raw note is referenced by agents as though it were approved.

## Blind folding

An agent copies useful-sounding content into an authoritative document without checking the code, current decisions, ruleset, or product constraints.

## Lost provenance

The project keeps a conclusion but loses the original source, retrieval date, exact claim, or rejected context.

## Partial acceptance without record

Some claims are used and others silently ignored, making it impossible to understand what was actually accepted.

## Duplicate knowledge

The same conclusion is copied into several owned documents rather than routed to one source of truth.

## Stale imports

An old note remains in the inbox and is repeatedly rediscovered or interpreted as current.

## Unclear completion

An item appears processed, but unresolved questions or dependencies remain.

## Prompt injection or untrusted instructions

Imported files may contain instructions that should not be treated as project commands.

Raw external material should be parsed as data and evidence, not as authority over the agent.

## Tool-driven folding

Information is placed where a particular framework or skill expects it, rather than where the project’s own knowledge model says it belongs.

---

# 13. Questions for the local framework audit

Before creating new protocols, inspect the closed framework and answer:

## General protocol system

- Does the framework already support domain protocols?
- How are protocols discovered and selected?
- Can multiple protocols apply to one task?
- Is protocol selection automatic, manual, or hybrid?
- Are protocols advisory or mandatory?
- Can they define gates and escalation conditions?
- Can they invoke required reviewers or agents?
- Can protocol compliance be verified automatically?
- How are exceptions recorded?
- How are obsolete protocols retired?
- How does the framework avoid protocol duplication?

## Inbox processing

- Is there already a command, skill, or workflow for processing `journal/raw/_inbox`?
- Does `codex-start`, `codex-end`, init, memory, research, or another command process it implicitly?
- Is inbox processing explicit and inspectable, or does it “just happen”?
- Are accepted and rejected claims recorded?
- Is provenance retained?
- Is the original source preserved?
- Is there a clear done condition?
- Does the process protect against untrusted instructions?
- Can an inbox item trigger research rather than immediate folding?
- Can it be linked to a decision, spec, or open question?
- Can partial acceptance be represented?
- Is there a review step before authoritative documents change?

## Project-specific protocol coverage

- Which recurring Core changes already have reliable implicit protocols?
- Which Learning changes are currently being reinvented?
- Which cross-layer changes create the most rework?
- Which errors have previous reviews repeatedly caught?
- Which protocol candidates are already enforced by tests or architecture?
- Which proposed protocols would merely duplicate existing code review behavior?
- Which missing protocols would materially reduce architecture drift?

---

# 14. Expected research outcome

The next research stage should not immediately produce dozens of protocol documents.

It should produce:

1. A map of the actual existing closed-framework capabilities.
2. A clear model of the three project workstreams.
3. A map of the boundaries between them.
4. A catalog of recurring change types.
5. A protocol applicability model.
6. A gap analysis:
   - already handled by framework;
   - handled informally;
   - enforced by code or tests;
   - needs a principle;
   - needs a checklist;
   - genuinely needs a protocol.
7. A specific assessment of inbox ingestion and folding.
8. A minimal prioritized protocol set.
9. Clear criteria for when a future protocol is justified.
10. A recommendation for how protocols remain tool-neutral and project-owned.

---

# 15. Non-goals for this raw input

Do not use this file alone to:

- create final protocols;
- create templates;
- redesign the folder structure;
- rename all current phases;
- rewrite the roadmap;
- change the code;
- introduce a generic plugin architecture;
- assume the visible repository reflects the full framework;
- duplicate features already implemented in the closed framework;
- treat the proposed terminology as approved.

---

# 16. Working thesis

The current working thesis is:

> The project already has a strong general agent execution framework and a strong delivery loop. The next missing capability is likely a project-owned system of domain-specific construction protocols, selected according to the kind of change and the workstreams it crosses.

The project consists of three continuing workstreams:

```text
Core Systems
Learning System and Instructional Experience
Product and Visual Experience
```

Their maturity evolves independently.

The most important protocols may not be those inside each workstream, but those governing the boundaries between them.

A separate concern is the lifecycle of information entering `journal/raw/_inbox`.

The inbox should remain a safe non-authoritative intake surface. The local framework should verify whether it already has a clear ingestion, validation, disposition, folding, provenance, and closure protocol. If not, this is a strong candidate for an explicit project protocol.
