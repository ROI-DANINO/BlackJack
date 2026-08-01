---
manifest_version: 1
profile: deep
domain: code
tier: deep
mode: project
root: journal
modules:
  research: true
  memory: true
  blog: false
  notebook: false
  audits: true
  graphify: true
  update: false
  decisions: true
  telemetry: true           # private route/review economics under .wl/ (gitignored); false opts out
  secret_scan: true         # /wl-end eyeballs staged files for secret patterns before any commit
private:
  - active.md
  - next.md
  - sessions/
  - memory/
  - raw/
  - log.md
push: false
desks: []
agents:
  - name: simulator
    provenance: user
    remit: Keeps blackjack engine behavior faithful to real shoe, card, and round flow.
  - name: learning designer
    provenance: user
    remit: Keeps drills short, useful, and focused on mastery rather than lectures.
  - name: rules researcher
    provenance: user
    remit: Verifies blackjack rules, strategy tables, and machine behavior before they become defaults.
---
# Docs Map — Source of Truth

One line per doc surface: what it is authoritative for. If two docs disagree, the one named
here wins; fix the other. Every phase ends by tidying these so they stay true.

| File | Source of truth for |
|------|---------------------|
| AGENTS.md | Mission, constraints, current-phase pointer. Read first. |
| CONTEXT.md | The project's canonical domain vocabulary — one entry per term, with the synonyms it retires. A glossary only: it holds no decision, design, or rationale. When a document or identifier disagrees with it, fix the document. |
| ROADMAP.md | Destination, phase list, milestones, exit criteria. |
| PROGRESS.md | What is done / in progress now; open questions. |
| journal/phase.md | Machine-readable current phase state. |
| journal/tasks.md | Agent Kanban (`agent-kanban:v2`) for executable current-phase cards, priority, live state, and evidence. Written only via scripts/kanban.ts. |
| scripts/kanban.ts | The board's only write path plus its read verbs (board/next/validate). **Formerly a derived port of `workspace/scripts/kanban.ts`; that master was archived to `workspace/archive/scripts/kanban.ts` (commit `0af7b33`) when the 2026-07-28 lifecycle simplification cut the kanban from White Lotus.** This copy is now the only living one — patch it here; there is nothing left to regenerate from. |
| scripts/check-doc-drift.sh | Read-only tripwires for documents disagreeing about state. Five checks, one per pair that has already drifted silently. Run before republishing an authority doc and at every `/wl-end`. Exits non-zero on drift; fix the document, not the check. |
| journal/active.md | Resume context for /wl-start. Flat per the 2026-07-28 simplified-lifecycle spine; the engine reads it here. |
| journal/sessions/ | /wl-end handoff files (history). |
| journal/next.md | Former cross-chat bridge. Inert: `/wl-next` was retired with the 2026-07-28 lifecycle simplification and the plugin no longer ships the command. Kept for its content only. |
| journal/decisions.md | ADR sink — terse "why we chose X", appended by `/wl-end` at milestones. |
| journal/memory/ | Recall index + atomic fact files for **project/phase** facts (this repo's work). Cross-cutting user/feedback/environment facts live in the **global store** (`~/.claude/projects/-home-roking-Desktop-Projects-blackjack/memory/`), which auto-loads every session. Two stores by role, not by accident; a `[[wikilink]]` resolves in-repo only, so name the global store inline when pointing at it. |
| journal/raw/ | Local inbox for unprocessed raw imports; fold useful details into owned docs before relying on them. |
| docs/imports/initial-product-notes/ | Indexed original pre-init source notes and their folded destinations. |
| docs/imports/v2-research-2026-07-11/ | Indexed V2 research imports, dispositions, and folded destinations; not authoritative over owned docs. |
| docs/imports/2026-07-12-operating-model-research/ | Indexed operating-model research import (source note + claim-level dispositions); folded into the foundation spec. |
| docs/imports/2026-07-15-v2-future-guidance/ | Indexed V2 future-guidance imports, byte manifest, claim-level dispositions, and folded destinations; provenance only. |
| docs/architecture.md | Runtime/product-state ownership, live cross-layer seams, hosted-product posture, and provider-neutral application boundaries. |
| docs/specs/product-vision.md | Product north star, product feel, learning philosophy, and what makes the simulator different. |
| docs/specs/stack-boundaries.md | Tool & Runtime Admission Protocol and the current admitted stack/boundary results. |
| docs/specs/research-brief.md | Domain research anchors plus cross-cutting just-in-time research triggers and open questions. |
| docs/specs/learning-mastery-and-scoring.md | Relabelled learning, mastery, hinting, scoring, and simulated-player design notes. Its ladders and tiers are product judgements and assumptions phase 4 may adopt as choices — not requirements, not research conclusions. |
| docs/superpowers/specs/assumption-register.md | **Every falsifiable belief the product runs on that evidence does not back**, each with a named validation method (playtesting · academic research · production telemetry). Authoritative for what is still a bet. A design doc cites a row rather than restating the caveat. |
| docs/specs/qa-playtest-process.md | The AI playtest QA process: agent pack, session protocols, scoping rules, run mechanics. |
| journal/qa/ledger.md | QA coverage state (area × last-passed commit) + findings register. Read before scoping any QA run. |
| journal/qa/runs/ | Per-run QA reports (one dir per run, one file per agent). |
| docs/specs/ | Design specs (pre-superpowers flow). |
| docs/plans/ | Implementation plans for active specs. |
| docs/superpowers/specs/ | Design specs (active superpowers/White Lotus flow) — where current designs land. |
| docs/superpowers/plans/ | Implementation plans for active specs (superpowers/White Lotus flow). |
| docs/superpowers/research/foundation-audit-p1/ | **Approved Phase 1 foundation-audit evidence archive** — dossiers, verification records, registers, integrity manifests, gate summary, process audit. Tracked and citable; the git-ignored inbox holds working copies only. |
| docs/superpowers/research/foundation-audit-p2/ | **Approved Phase 2 foundation-audit verdict archive** — per-claim audit records (U1–U8), verification and landing-confirmation records, registers (incl. conflicts `CFL-001`–`CFL-007` and the orchestrator error register), program-integrity record, integrity manifests, gate summary, process audit. Authoritative for *what each existing learning claim is entitled to assert*; it states no recommendation and designs nothing. |
| docs/superpowers/research/foundation-audit-p3/ | **Phase 3 subject-matter evidence** (probability, EV, variance, risk) — the gap Phase 1 did not cover. Dossier C7, two independent verification records, one landing record. **Banked with known unfixed defects**; its README enumerates them and the one known-missing study. Not authoritative over owned designs. |
| docs/superpowers/specs/2026-07-22-product-design-inputs.md | **The Phase 3 → Phase 4 bridge.** Confirmed learning principles, unresolved product assumptions, mastery/activity-evidence/AI-authority/accessibility constraints, the decisions routed to playtest, and the CFL-007 ruling. Authoritative for *what Phase 4 may assume*; it designs nothing itself. |
| docs/superpowers/specs/2026-08-01-learning-outcomes-and-skill-graph.md | **Phase 4 deliverables 1 and 2.** The Skills, their Learning outcomes, the prerequisite edges, the four Condition axes, and the two bridge decisions that had no other owner (EV taught explicitly; the false-heuristic scaffold). Authoritative for *what is taught and what must precede what*; owns no activity format, no threshold, and no gating rule. |
| docs/superpowers/specs/2026-08-01-skill-graph.json | The skill graph itself, as data — the artifact phase 5 consumes. Authoritative over the prose spec wherever the two disagree about a Skill, an edge, or a label. Design data, not shipped content. |
| docs/superpowers/specs/2026-08-01-activity-taxonomy-and-skill-mapping.md | **Phase 4 deliverable 3.** The six Activity types, what individuates them (shown × produced × withheld), the supplied-pool ruling, what the recognition ban prohibits, the three provenance modes, and a verdict on all 32 LDB-02 patterns. Authoritative for *what is asked and what it measures*; owns no threshold, no session shape, and no widget. |
| docs/superpowers/specs/2026-08-01-activity-taxonomy.json | The activity taxonomy as data — six types with their parameters and Skill mappings, plus all 32 pattern verdicts. Authoritative over its prose spec wherever the two disagree about a type, a parameter, or a verdict. Design data, not shipped content. |
| docs/superpowers/specs/2026-07-23-graded-decision-practice-design.md | **Phase 4 first slice.** The graded-decision activity, its `DecisionAttempt` evidence record, and its confusable-hand practice pool. Authoritative for that one activity only; owns no skill graph, taxonomy, sequence, or mastery threshold. |
| docs/superpowers/specs/2026-07-12-foundation-and-tracks-design.md | Foundation & Tracks: three tracks + contracts, cloud posture, stack Admission Protocol, protocol system, inbox 1-pager. |
| docs/superpowers/research/evidence-index/ | **Navigation index over the research archives** — every finding, requirement, verdict, and unlanded correction, with its archive locus. A pointer layer, never a warrant: its README states the citation rule. Cite findings from here; verify against the archive. |
| docs/superpowers/specs/2026-07-26-chips-xp-and-progression-economy.md | The chips/XP/rating motivation model as an owner premise, with open questions `E-1`–`E-7` and the constraints that bind them. Not a design and not a research conclusion. |
| docs/superpowers/plans/2026-07-26-repo-restructure.md | The layers-and-phases restructure: why, the decisions taken, the four stages, and what must not break in the White Lotus machinery. The resume point while it runs. |
| docs/superpowers/audits/2026-07-26-restructure-review.md | Independent adversarial review of the restructure against the owner's sufficiency criterion — can the plan be followed literally without improvising. Verdict **not yet**, with F1–F18 and a shortest-path-to-yes. Authoritative for what the restructure still owes. |

Two authoritative surfaces live outside this repository and therefore carry no table row (the
manifest lint resolves first cells as repo-relative paths):

- `~/Desktop/Projects/workspace/docs/specs/2026-07-16-agent-sdlc-kanban-design.md` — the
  `agent-kanban:v2` board format, card schema, lane/WIP policy, and selector contract.
- `~/.claude/skills/research-plan/SKILL.md` — the research-planning skill: role contract, the
  produce→verify→land→confirm loop, and gate falsifiability rules.
