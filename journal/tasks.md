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
- Plan: ROADMAP.md
## Ready
### LDB-08 — Assemble the blueprint and choose the phase-5 slice
- Type: design
- Milestone: LDB
- Intent: phase 4's gate is the owner approving a blueprint and the slice to build, and one approved slice is not a blueprint.
- Depends on: LDB-01, LDB-02, LDB-03, LDB-04, LDB-05, LDB-06, LDB-07
- Source: ROADMAP.md §Phase 4
- Outcome: One blueprint document assembling the eight decisions, with every claim carrying its evidence label and every assumption entered in the Assumption Register with a named validation method. Names the phase-5 slice AND the subset of P-1 through P-5 that slice must instrument — phase 5 cannot exit without answering them from recorded data. The graded-decision-practice design is the standing candidate and already wires both orphans, the strategy oracle and ProgressStore; it covers P-3 and P-5, hooks P-1, and covers neither P-2 nor P-4. Confirm or replace it against the finished blueprint rather than inheriting it, and if replacing, carry the instrumentation forward deliberately. Approvable when: every LDB-01 through LDB-07 decision appears with its label, the register has no unowned row, and the named slice's instrumentation covers the declared P-subset.
- Next: Assemble once LDB-01 through LDB-07 are approved. FROM LDB-02: do not count docs/superpowers/research/activity-pattern-catalog/buildability.md's build recommendation as independent confirmation of the standing graded-decision-practice candidate — it is the same author's unreviewed judgement converging on the pre-existing plan, and that file now says so. The binary slice, U1-5 plus the existing reveal, is genuinely no-engine-change and wires both orphans. The EV-graded upgrade is not: no EV machinery exists in blackjack-core and the oracle returns an action, not a number. If the blueprint adopts EV grading, cost it as Medium to Large and register the EV-table provenance assumption. FROM LDB-01 (approved 2026-08-01): P-2 and P-4 are declared UNANSWERABLE by this product, not merely uncovered — no EV-instructed arm exists because EV gets no Skill, and no heuristic-policy arm exists because the heuristic is frame-only. The candidate subset is P-1, P-3, P-5, and this card must record those two as deliberate exclusions rather than inherit them as coverage. The standing slice covering exactly that set is convergence, not confirmation — the same caution LDB-02 issued applies to LDB-01's own reasoning, which said so in its spec 5.4. Note EV grading is now foreclosed, which retires the Medium-to-Large costing above. LDB-01 added zero net register rows. Two items travel with it and are NOT blockers on assembly: the bridge 1.8 plus P3-evidence-catalog.md:236 comparator correction, which needs an independent re-check and must land in both files together; and the five schema deltas in spec section 10, owed to phase 5.
- Load: ROADMAP.md, docs/superpowers/specs/2026-07-23-graded-decision-practice-design.md
- Gate: user-approval
- Evidence: pending
- Updated: 2026-08-01T12:54:23.317Z
### LDB-07 — Design the interaction UX for the activity set
- Type: design
- Milestone: LDB
- Intent: the activities need an interaction contract before phase 5 can build them, and a WCAG target must be chosen deliberately rather than inherited.
- Depends on: LDB-03, LDB-06
- Source: docs/superpowers/specs/2026-07-22-product-design-inputs.md §8
- Outcome: How each activity is operated, and a stated target WCAG conformance level. The requirement set is a coherent Level AA baseline except for reduced motion, which rests on SC 2.3.3 at Level AAA, and concise language, which has no normative anchor at any level. WARNING: the AA-plus-two-commitments framing is index-original analysis — it exists in the evidence index and in no archive record, so reopen the WCAG criteria first-hand before adopting it, exactly as the K-U4-016 editor did for ALR-040. This is interaction design only; the visual system is phase 6. Approvable when: a target conformance level is stated, every requirement is mapped to a criterion whose level was read first-hand, and above-baseline commitments are labelled voluntary.
- Next: State the target conformance level, then split ALR-040 so the AAA element is labelled voluntary. FROM LDB-02: the What-the-learner-does column across docs/superpowers/research/activity-pattern-catalog/run/U1, U2 and U3 audit.md is a ready operation inventory for all 32 patterns — exactly this card's how-each-activity-is-operated. Caution: for U2-3, U2-11 and U2-13 the blackjack analogue differs materially from the sourced interaction, so spec the analogue's operation and label it Product judgement. The catalog contributes nothing on WCAG; that half is untouched. FROM LDB-01 (approved 2026-08-01): one interaction rule is already fixed and this card inherits rather than decides it — an undealt prompt may name a hand shape but may NEVER render cards that did not come from a shoe, and a shape-named prompt supplies the Classification for free so it may only operate Skills whose outcome is flagged classificationIncluded:false. Everything else in LDB-01 is silent on interaction, and nothing in it bears on WCAG — that half of this card is untouched by the graph.
- Load: docs/superpowers/research/evidence-index/activity-and-storage-catalog.md
- Gate: user-approval
- Evidence: pending
- Updated: 2026-08-01T12:54:10.406Z
### LDB-06 — Decide session composition
- Type: design
- Milestone: LDB
- Intent: a session is the unit a learner actually experiences, and its shape decides whether practice is mixed or blocked.
- Depends on: LDB-03, LDB-04
- Source: docs/superpowers/research/evidence-index/activity-and-storage-catalog.md
- Outcome: Session entry, size, stopping, and mix. Practice pools are mixed by default, per the ruling block to introduce, interleave to practise — mixed review is the steady state, not a final stage. A blocked pool is permitted only for first exposure and must be declared as such. Rare-event exposure is engineered rather than awaited — note the bridge contradicts itself here, listing this as an open decision in section 7 while stating it as a requirement in section 4.6; resolve it explicitly rather than inheriting one side. No loss-framed pressure and no penalty for stopping. Provisional on playtest question P-3. Approvable when: the session-size numbers carry register rows, the blocked-versus-mixed rule is stated per activity, and the bridge contradiction is resolved in writing.
- Next: FROM LDB-02: U3's spacing evidence is now first-hand in the archive — spaced M=.61 versus massed M=.35, d=0.99, in docs/superpowers/research/activity-pattern-catalog/run/U3/audit.md — supporting a mixed-by-default session. The 78-78 result additionally warns against letting learner preference choose blocked versus mixed. Catalogued session-shape options: U1-5 treats a whole shoe as the session unit with a deferred debrief; U2-11 and U2-12 are external pacing, substantive only if the stream advances independently of the response. FROM LDB-01 (approved 2026-08-01): three of the four Condition axes — scope, ruleset and pace — were deliberately left unordered for this card; order them or state that you decline to, and note that any ordering asserted here becomes an Assumption needing a register row. Support is already primary and is not reopened. Two session-shape obligations arrive with the graph: variance-expectation is predict-then-reveal, so its prediction must be captured BEFORE the shoe it concerns, and its scoring band is an unset threshold inheriting A-07. And the rare-event description that bridge 1.2 requires arrives as a post-shoe debrief, a prediction, or frequency framing in copy — never as a lesson unit (decision B2). That constrains how this card may answer the engineered-versus-organic contradiction it already owes.
- Load: docs/superpowers/research/evidence-index/activity-and-storage-catalog.md, docs/superpowers/specs/2026-07-22-product-design-inputs.md
- Gate: user-approval
- Evidence: pending
- Updated: 2026-08-01T12:54:01.661Z
### LDB-05 — Design the motivation and chips economy
- Type: design
- Milestone: LDB
- Intent: the economy's load-bearing question is an evidence question in disguise, so it can only be answered once mastery rules exist.
- Depends on: LDB-04
- Source: docs/superpowers/specs/2026-07-26-chips-xp-and-progression-economy.md
- Outcome: Answers to E-1 through E-7. E-1 decides whether a won hand returns chips — rewarding outcome is the one thing the learning design decouples, and the saving grace is that chips buy nothing. E-5 resolves that XP accumulates while a rating rises and falls, so they cannot be linked directly without choosing which property to drop. E-6 sets the below-25-user rating fallback. E-7 records that a real leaderboard implies server authority. Approvable when: all seven questions have written answers, E-1's answer names how it will be tested (register row A-20), and no mechanic rewards money won.
- Next: Wait on LDB-04 — the economy comes after evidence and mastery rules per ROADMAP, and the chips-return question is an evidence question in an economy costume. FROM LDB-02: U1-6's analogue states the E-1-adjacent mechanism directly, a per-session decision rating displayed separately from chips won. And U1-5's corrected reading bounds the framing: the licence is no pass-or-fail verdict in the debrief, not grade nothing. A score may exist without being surfaced as jeopardy. FROM LDB-01 (approved 2026-08-01): EV gets no Skill at all, so no economy mechanic may present an expected-value number as a learner-facing score — EV survives only as rationale in feedback copy. E-1 now has a named Skill to be measured against: adherence-under-loss, judged by the oracle, is the Skill that carries the P-1 and P-5 instruments, and whether a won hand returns chips is testable as its divergence. Note also that probability, EV and variance ship only where they change a decision (ROADMAP deliverable 2 as amended), which forecloses any chips mechanic justified as teaching the maths.
- Load: docs/superpowers/specs/2026-07-26-chips-xp-and-progression-economy.md, docs/superpowers/research/evidence-index/P1-evidence-catalog.md
- Gate: user-approval
- Evidence: pending
- Updated: 2026-08-01T12:53:50.476Z
### LDB-04 — Decide the per-activity evidence and mastery rules
- Type: design
- Milestone: LDB
- Intent: the shipped mastery model is disqualified by the project's own evidence, and everything about progression depends on what replaces it.
- Depends on: LDB-03
- Source: docs/superpowers/specs/2026-07-22-product-design-inputs.md §3
- Outcome: A mastery model that can ingest played-hand evidence, since the ruling is measure play not quiz scores and the shipped model structurally cannot. Confidence is never a mastery signal. Assistance is recorded only when assistance was actually delivered — the shipped code labels a bare retry as instruction when no instruction exists. Every threshold chosen is entered in docs/superpowers/specs/assumption-register.md as a product judgement with a named validation method; no constant here is research-calibrated. Provisional on playtest questions P-1 (can decision/outcome separation be trained at all) and P-5 (does confidence rise faster than skill). Approvable when: a played hand can satisfy mastery, no threshold is stated without a register row, and confidence appears in no mastery calculation.
- Next: FROM LDB-02, this card's confidence-is-never-a-mastery-signal ruling now has independent evidence: Kornell and Bjork, 78 percent performed better spaced while 78 percent rated massed as good or better (docs/superpowers/research/activity-pattern-catalog/classification.md item 3). U2-9 is the catalogued anti-pattern proposing exactly that widget — cite both in the decision. Also relevant: U1-6's rating-dependent grading breaks cross-learner comparability, a trap for any mastery constant; and U1-4 models assistance as a recorded input rather than a flag. FROM LDB-01 (approved 2026-08-01): mastery is per Skill x Condition-vector, not per Skill. The four axes are support, scope, ruleset and pace; support is primary on an owner decision (2026-07-23, tableOpen is the mastery axis) and the other three are DELIBERATELY unordered — this card orders them against data or states that it declines to. There is no stage ladder left to inherit: A-01 is withdrawn, not validated, and A-02 (accuracy before pace) is its only residue. Do not design a cell grammar — a Cell is derived by construction from a Decision situation and the 2026-07-17 obligation is discharged; a cellId records where evidence came from and is not a licence to drill cells as items. Every threshold this card picks still inherits A-07 and needs a sub-row when the number is actually written.
- Load: docs/superpowers/research/evidence-index/P1-evidence-catalog.md, web/src/progress/types.ts, web/src/learn/controller.ts
- Gate: user-approval
- Evidence: pending
- Updated: 2026-08-01T12:53:41.335Z
### LDB-03 — Define the activity taxonomy and map capabilities to activities
- Type: design
- Milestone: LDB
- Intent: an activity that does not declare which capability it measures cannot produce evidence of learning.
- Depends on: LDB-01, LDB-02
- Source: docs/superpowers/specs/2026-07-22-product-design-inputs.md §4
- Outcome: Every activity type declares the capability it measures, and the measurement is of decision behaviour wherever the capability is a decision. Classification is a required step wherever the real task requires it — an activity that tells the learner this is a soft total is not measuring the skill. Distributional concepts use predict-then-reveal; a simulation that does not first capture a prediction is decoration. Approvable when: every activity maps to at least one capability, no capability that is a decision is measured only by recognition, and every pattern from LDB-02 is either adopted with a reason or rejected with one.
- Next: Read docs/superpowers/research/activity-pattern-catalog/FOR-LDB-03.md first. FROM LDB-02: classification.md already supplies a candidate adopt-or-reject reason for all 32 patterns, which is most of this card's last approvable-when clause. Rule the word-bank versus Parsons boundary once, in writing — the two units drew it differently on the same interaction. Do not inherit two known defects: U1-5, U1-8 and U1-9 are Evidence-backed and independent on a single compilation, not vendor self-description; and classify from the sourced pattern, never the candidate-capability column, where three rows over-rate. FROM LDB-01 (approved 2026-08-01): the word capability is RETIRED — the node is a Skill and the sentence about it is a Learning outcome; see CONTEXT.md, which is authoritative for vocabulary. This card therefore maps activities to Skills, and the 18 Skills already exist in docs/superpowers/specs/2026-08-01-skill-graph.json with their grading authority and a classificationIncluded flag. Three hard constraints fall out: an activity may not supply the Classification to any Skill whose outcome includes it; an activity may pose a Decision situation without dealing, but may NEVER render cards that did not come from a shoe; and a shape-named prompt supplies the Classification for free, so it may only serve outcomes flagged classificationIncluded:false. Constraint 3 still stands on top of all of this — do not justify a format by claiming it measures a Skill better.
- Load: docs/superpowers/research/evidence-index/activity-and-storage-catalog.md, docs/superpowers/specs/2026-07-22-product-design-inputs.md
- Gate: user-approval
- Evidence: pending
- Updated: 2026-08-01T12:53:29.942Z


## Active


## Verification

## Done
### LDB-01 — Decide the learning outcomes and the skill graph
- Type: design
- Milestone: LDB
- Intent: nothing downstream can be scoped until it is decided what capability each unit produces and what must precede what.
- Depends on: none
- Source: docs/superpowers/specs/2026-07-22-product-design-inputs.md §9
- Outcome: A skill graph with prerequisites, and learning outcomes covering rules, hand reading, strategy, probability, EV and variance — each stated as an observable decision behaviour, not a knowledge claim. The 7-stage hierarchy is an Assumption (K-U1-003) and needs an Assumption Register entry with a named validation method. Which subjects precede which is a Product judgement (K-U7-008) — free to change, just labelled. Two bridge decisions have no other owner and are settled here: whether the curriculum teaches EV explicitly at all (provisional on playtest question P-2, register row A-14 — evidenced absence, no further collection authorised), and whether a deliberately simplified heuristic is adopted as a scaffold (provisional on P-4, register row A-16 — the evidence points toward the heuristic). Approvable when: every outcome is an observable decision behaviour, every edge carries an evidence label, and every assumption has a register row.
- Next: Designed 2026-08-01; awaiting the user-approval gate. Spec docs/superpowers/specs/2026-08-01-learning-outcomes-and-skill-graph.md + graph data 2026-08-01-skill-graph.json. Review order: spec §0 (what it does NOT own), then §11's four checkable approval criteria against the JSON. Three things to look at hardest: the 7-stage ladder is SPLIT not adopted so A-01 is withdrawn-not-validated (§4); probability/EV/variance ship only where they change a decision, which amended ROADMAP deliverable 2 (§5.1); EV gets no Skill and the heuristic is frame-only, so P-2 and P-4 are declared OUT and the phase-5 subset is P-1/P-3/P-5 (§5.2-5.4). Net new register rows: zero. Two follow-ons do NOT block approval: bridge §1.8 + P3-evidence-catalog.md:236 both repeat a comparator the held abstract does not contain, needing an independent re-check before landing together; and §10 lists five schema deltas owed to phase 5.
- Load: docs/superpowers/research/evidence-index/P2-verdict-catalog.md, docs/superpowers/specs/2026-07-22-product-design-inputs.md
- Gate: user-approval
- Evidence: APPROVED by owner 2026-08-01. Spec docs/superpowers/specs/2026-08-01-learning-outcomes-and-skill-graph.md + docs/superpowers/specs/2026-08-01-skill-graph.json (18 Skills across 3 Subjects, 4 open Condition axes, every outcome naming a grading authority, every edge labelled). Vocabulary in CONTEXT.md (new, registered in docs-map). Register: A-01 withdrawn, A-02 inherited, A-14 dormant with a reopening condition, A-16 method rewritten, net new rows zero. ROADMAP deliverables 1 and 2 marked done; deliverable 2 amended to discharge by decision behaviour; phase-5 subset note added. Decisions row appended. Claim-check record journal/raw/_inbox/2026-08-01-ldb01-claim-check/audit/ — 27 of 50 hard-12-16 cells verified against crates/blackjack-core/src/strategy.rs. Findings carried into all six remaining LDB cards.
- Updated: 2026-08-01T12:54:32.921Z
### LDB-02 — Build the activity-pattern catalog
- Type: research
- Milestone: LDB
- Intent: the product's stated intent is Duolingo- and Brilliant-style learning games, and every exercise format this project holds is a dealt hand or a multiple-choice question.
- Depends on: none
- Source: docs/imports/v2-research-2026-07-11/research/v2-research-03-course-and-source-audit.md:116
- Outcome: A catalog of interactive activity patterns that are neither a dealt hand nor a multiple-choice question, each with what it measures well and what it measures poorly. The corpus holds exactly two seeds, both Accepted-but-Deferred and both under-specified — the ruleset-delta comparison view and the live-highlighted chart with fading assistance. Named as a recommended research artifact on 2026-07-11 and never produced. RESEARCH CONTRACT, because the last unpaved research phase produced the mess: every source is opened first-hand and no claim rests on a snippet, an abstract, or another document's description of it; a source register records each source with its access date and whether it is vendor self-description or independent; at least eight patterns from at least five distinct products; any claim carried into the taxonomy is verified by a separate agent before it lands. Approvable when: the register exists, every pattern names the capability it could measure, and no unopened source is cited.
- Next: Plan this pass with the research-plan skill before collecting — it owns the role contract, the produce-verify-land-confirm loop, and the gate rules. Then read the two seed passages in v2-research-06-ux-foundations.md and survey outward.
- Load: docs/imports/v2-research-2026-07-11/research/v2-research-06-ux-foundations.md, docs/imports/v2-research-2026-07-11/course-bundle/how-to-teach.md
- Gate: user-approval
- Evidence: 5b92ddb docs/superpowers/research/activity-pattern-catalog/ — 32 patterns from 24 products, 50 sources, 82 corrections landed and independently confirmed, research-gate PASS. Classification, buildability and process audit banked alongside. journal/ops/tasks.md
- Updated: 2026-07-27T02:16:36.516Z





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
