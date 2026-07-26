<!-- agent-kanban:v2 -->
> Format + policy: /home/roking/Desktop/Projects/workspace/docs/specs/2026-07-16-agent-sdlc-kanban-design.md — written via scripts/kanban.ts only.
>
> Migrated from `agent-kanban:v1` on 2026-07-18 (White Lotus initiation, step 4). The last v1
> board is archived verbatim at `journal/ops/archive/tasks-2026-07-18T2217.md`, which also holds
> the fields v2 drops (`Mode`, `Owner`, `Workspace`, `Done when`).
>
> Card IDs were re-issued in dependency order. Mapping to the v1 IDs that older sessions, plans,
> and `.wl/sdd/` still cite by name:
>   AL-01 -> AL-01 · AL-R1 -> AL-02 · AL-R2 -> AL-03 · AL-D1 -> AL-04 · AL-B1 -> AL-05
> AL-06 is new on this board — the foundation-audit Phase 1 thread, previously tracked only in
> `journal/ops/phase.md`'s `next:` queue.

## Milestones

### LDB — Learning Design Blueprint [active]
- Roadmap: step 4
- Plan: docs/superpowers/plans/2026-07-26-repo-restructure.md
## Ready
### LDB-08 — Assemble the blueprint and choose the phase-5 slice
- Type: design
- Milestone: LDB
- Intent: phase 4's gate is the owner approving a blueprint and the slice to build, and one approved slice is not a blueprint.
- Depends on: LDB-01, LDB-02, LDB-03, LDB-04, LDB-05, LDB-06, LDB-07
- Source: ROADMAP.md §Phase 4
- Outcome: One blueprint document assembling the eight decisions, with every claim carrying its evidence label, and a named phase-5 slice. The graded-decision-practice design is the standing candidate and already wires both orphans — the strategy oracle and ProgressStore. Confirm or replace it against the finished blueprint rather than inheriting it.
- Next: Assemble once LDB-01 through LDB-07 are approved.
- Load: ROADMAP.md, docs/superpowers/specs/2026-07-23-graded-decision-practice-design.md
- Gate: user-approval
- Evidence: pending
- Updated: 2026-07-26T01:23:17.421Z
### LDB-07 — Design the interaction UX for the activity set
- Type: design
- Milestone: LDB
- Intent: the activities need an interaction contract before phase 5 can build them, and a WCAG target must be chosen deliberately rather than inherited.
- Depends on: LDB-03, LDB-06
- Source: docs/superpowers/specs/2026-07-22-product-design-inputs.md §8
- Outcome: How each activity is operated, and a stated target WCAG conformance level. The requirement set is a coherent Level AA baseline except for reduced motion, which rests on SC 2.3.3 at Level AAA, and concise language, which has no normative anchor at any level. Naming AA plus two declared above-baseline commitments is the honest framing. This is interaction design only; the visual system is phase 6.
- Next: State the target conformance level, then split ALR-040 so the AAA element is labelled a voluntary enhancement.
- Load: docs/superpowers/research/evidence-index/activity-and-storage-catalog.md
- Gate: user-approval
- Evidence: pending
- Updated: 2026-07-26T01:23:17.053Z
### LDB-06 — Decide session composition
- Type: design
- Milestone: LDB
- Intent: a session is the unit a learner actually experiences, and its shape decides whether practice is mixed or blocked.
- Depends on: LDB-03, LDB-04
- Source: docs/superpowers/research/evidence-index/activity-and-storage-catalog.md
- Outcome: Session entry, size, stopping, and mix. Practice pools are mixed by default, per the ruling block to introduce, interleave to practise — mixed review is the steady state, not a final stage. A blocked pool is permitted only for first exposure and must be declared as such. Rare-event exposure is engineered rather than awaited. No loss-framed pressure and no penalty for stopping.
- Next: Set the session-size presets as declared product judgements, since no source establishes universal minutes.
- Load: docs/superpowers/research/evidence-index/activity-and-storage-catalog.md, docs/superpowers/specs/2026-07-22-product-design-inputs.md
- Gate: user-approval
- Evidence: pending
- Updated: 2026-07-26T01:23:16.654Z
### LDB-05 — Design the motivation and chips economy
- Type: design
- Milestone: LDB
- Intent: the economy's load-bearing question is an evidence question in disguise, so it can only be answered once mastery rules exist.
- Depends on: LDB-04
- Source: docs/superpowers/specs/2026-07-26-chips-xp-and-progression-economy.md
- Outcome: Answers to E-1 through E-7. E-1 decides whether a won hand returns chips — rewarding outcome is the one thing the learning design decouples, and the saving grace is that chips buy nothing. E-5 resolves that XP accumulates while a rating rises and falls, so they cannot be linked directly without choosing which property to drop. E-6 sets the below-25-user rating fallback. E-7 records that a real leaderboard implies server authority.
- Next: Answer E-1 first; the rest follow from it.
- Load: docs/superpowers/specs/2026-07-26-chips-xp-and-progression-economy.md, docs/superpowers/research/evidence-index/P1-evidence-catalog.md
- Gate: user-approval
- Evidence: pending
- Updated: 2026-07-26T01:23:16.136Z
### LDB-04 — Decide the per-activity evidence and mastery rules
- Type: design
- Milestone: LDB
- Intent: the shipped mastery model is disqualified by the project's own evidence, and everything about progression depends on what replaces it.
- Depends on: LDB-03
- Source: docs/superpowers/specs/2026-07-22-product-design-inputs.md §3
- Outcome: A mastery model that can ingest played-hand evidence, since the ruling is measure play not quiz scores and the shipped model structurally cannot. Confidence is never a mastery signal. Assistance is recorded only when assistance was actually delivered — the shipped code labels a bare retry as instruction when no instruction exists. Every threshold chosen is labelled a product judgement with a named validation method; no constant here is research-calibrated.
- Next: Decide what replaces multiple-choice as mastery evidence, then write the reducer's inputs.
- Load: docs/superpowers/research/evidence-index/P1-evidence-catalog.md, web/src/progress/types.ts, web/src/learn/controller.ts
- Gate: user-approval
- Evidence: pending
- Updated: 2026-07-26T01:23:15.807Z
### LDB-03 — Define the activity taxonomy and map capabilities to activities
- Type: design
- Milestone: LDB
- Intent: an activity that does not declare which capability it measures cannot produce evidence of learning.
- Depends on: LDB-01, LDB-02
- Source: docs/superpowers/specs/2026-07-22-product-design-inputs.md §4
- Outcome: Every activity type declares the capability it measures, and the measurement is of decision behaviour wherever the capability is a decision. Classification is a required step wherever the real task requires it — an activity that tells the learner "this is a soft total" is not measuring the skill. Distributional concepts use predict-then-reveal; a simulation that does not first capture a prediction is decoration.
- Next: Cross the catalog from LDB-02 against the 41 ALR requirements and mark which requirement each pattern satisfies.
- Load: docs/superpowers/research/evidence-index/activity-and-storage-catalog.md, docs/superpowers/specs/2026-07-22-product-design-inputs.md
- Gate: user-approval
- Evidence: pending
- Updated: 2026-07-26T01:23:15.471Z
### LDB-02 — Build the activity-pattern catalog
- Type: research
- Milestone: LDB
- Intent: the product's stated intent is Duolingo- and Brilliant-style learning games, and every exercise format this project holds is a dealt hand or a multiple-choice question.
- Depends on: none
- Source: docs/imports/v2-research-2026-07-11/research/v2-research-03-course-and-source-audit.md:115
- Outcome: A catalog of interactive activity patterns that are neither a dealt hand nor a multiple-choice question, each with what it measures well and what it measures poorly. The corpus holds exactly two seeds, both Accepted-but-Deferred and both under-specified — the ruleset-delta comparison view and the live-highlighted chart with fading assistance. This card was named as a recommended research artifact on 2026-07-11 and never produced.
- Next: Read the two seed passages in v2-research-06-ux-foundations.md, then survey how comparable trainers structure non-quiz practice.
- Load: docs/imports/v2-research-2026-07-11/research/v2-research-06-ux-foundations.md, docs/imports/v2-research-2026-07-11/course-bundle/how-to-teach.md
- Gate: user-approval
- Evidence: pending
- Updated: 2026-07-26T01:23:15.104Z
### LDB-01 — Decide the learning outcomes and the skill graph
- Type: design
- Milestone: LDB
- Intent: nothing downstream can be scoped until it is decided what capability each unit produces and what must precede what.
- Depends on: none
- Source: docs/superpowers/specs/2026-07-22-product-design-inputs.md §9
- Outcome: A skill graph with prerequisites, and learning outcomes covering rules, hand reading, strategy, probability, EV and variance — each stated as an observable decision behaviour, not a knowledge claim. The accepted Subject A/B/C spine and the 7-stage hierarchy are inputs, not answers: P2 relabelled both to Assumption because no source evaluates a prerequisite ordering for this or any comparable domain.
- Next: Read P2-verdict-catalog §Bottom line C to see which sequencing beliefs are assumptions, then draft the outcome list against the accepted Subject A/B/C spine.
- Load: docs/superpowers/research/evidence-index/P2-verdict-catalog.md, docs/superpowers/specs/2026-07-22-product-design-inputs.md
- Gate: user-approval
- Evidence: pending
- Updated: 2026-07-26T01:22:28.433Z


## Active


## Verification

## Done





## Blocked
<!-- removed: GD-11 — P5-shaped build work, parked 2026-07-25 and retired in the 2026-07-26 restructure; all 11 tasks survive in full in docs/superpowers/plans/2026-07-23-graded-decision-practice.md and will be re-shaped with fresh IDs when phase 5 opens (2026-07-26) -->
<!-- removed: GD-10 — P5-shaped build work, parked 2026-07-25 and retired in the 2026-07-26 restructure; all 11 tasks survive in full in docs/superpowers/plans/2026-07-23-graded-decision-practice.md and will be re-shaped with fresh IDs when phase 5 opens (2026-07-26) -->
<!-- removed: GD-09 — P5-shaped build work, parked 2026-07-25 and retired in the 2026-07-26 restructure; all 11 tasks survive in full in docs/superpowers/plans/2026-07-23-graded-decision-practice.md and will be re-shaped with fresh IDs when phase 5 opens (2026-07-26) -->
<!-- removed: GD-08 — P5-shaped build work, parked 2026-07-25 and retired in the 2026-07-26 restructure; all 11 tasks survive in full in docs/superpowers/plans/2026-07-23-graded-decision-practice.md and will be re-shaped with fresh IDs when phase 5 opens (2026-07-26) -->
<!-- removed: GD-07 — P5-shaped build work, parked 2026-07-25 and retired in the 2026-07-26 restructure; all 11 tasks survive in full in docs/superpowers/plans/2026-07-23-graded-decision-practice.md and will be re-shaped with fresh IDs when phase 5 opens (2026-07-26) -->
<!-- removed: GD-06 — P5-shaped build work, parked 2026-07-25 and retired in the 2026-07-26 restructure; all 11 tasks survive in full in docs/superpowers/plans/2026-07-23-graded-decision-practice.md and will be re-shaped with fresh IDs when phase 5 opens (2026-07-26) -->
<!-- removed: GD-05 — P5-shaped build work, parked 2026-07-25 and retired in the 2026-07-26 restructure; all 11 tasks survive in full in docs/superpowers/plans/2026-07-23-graded-decision-practice.md and will be re-shaped with fresh IDs when phase 5 opens (2026-07-26) -->
<!-- removed: GD-04 — P5-shaped build work, parked 2026-07-25 and retired in the 2026-07-26 restructure; all 11 tasks survive in full in docs/superpowers/plans/2026-07-23-graded-decision-practice.md and will be re-shaped with fresh IDs when phase 5 opens (2026-07-26) -->
<!-- removed: GD-03 — P5-shaped build work, parked 2026-07-25 and retired in the 2026-07-26 restructure; all 11 tasks survive in full in docs/superpowers/plans/2026-07-23-graded-decision-practice.md and will be re-shaped with fresh IDs when phase 5 opens (2026-07-26) -->
<!-- removed: GD-02 — P5-shaped build work, parked 2026-07-25 and retired in the 2026-07-26 restructure; all 11 tasks survive in full in docs/superpowers/plans/2026-07-23-graded-decision-practice.md and will be re-shaped with fresh IDs when phase 5 opens (2026-07-26) -->
<!-- removed: GD-01 — P5-shaped build work, parked 2026-07-25 and retired in the 2026-07-26 restructure; all 11 tasks survive in full in docs/superpowers/plans/2026-07-23-graded-decision-practice.md and will be re-shaped with fresh IDs when phase 5 opens (2026-07-26) -->
