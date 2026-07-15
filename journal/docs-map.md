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
  secret_scan: true         # /wl-end eyeballs staged files for secret patterns before any commit
private:
  - context/
  - ops/sessions/
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
| ROADMAP.md | Destination, phase list, milestones, exit criteria. |
| PROGRESS.md | What is done / in progress now; open questions. |
| journal/ops/phase.md | Machine-readable current phase state. |
| journal/ops/tasks.md | Tasks for the current phase only. |
| journal/context/active.md | Resume context for codex-start. |
| journal/ops/sessions/ | codex-end handoff files (history). |
| journal/context/next.md | Cheap cross-chat bridge (`codex-next`); consumed + reset by `codex-end`. |
| journal/decisions.md | ADR sink — terse "why we chose X", appended by `codex-end` at milestones. |
| journal/memory/ | Recall index + atomic fact files. |
| journal/raw/ | Local inbox for unprocessed raw imports; fold useful details into owned docs before relying on them. |
| docs/imports/initial-product-notes/ | Indexed original pre-init source notes and their folded destinations. |
| docs/imports/v2-research-2026-07-11/ | Indexed V2 research imports, dispositions, and folded destinations; not authoritative over owned docs. |
| docs/imports/2026-07-12-operating-model-research/ | Indexed operating-model research import (source note + claim-level dispositions); folded into the foundation spec. |
| docs/imports/2026-07-15-v2-future-guidance/ | Indexed V2 future-guidance imports, byte manifest, claim-level dispositions, and folded destinations; provenance only. |
| docs/architecture.md | Runtime/product-state ownership, live cross-layer seams, hosted-product posture, and provider-neutral application boundaries. |
| docs/specs/product-vision.md | Product north star, product feel, learning philosophy, and what makes the simulator different. |
| docs/specs/stack-boundaries.md | Tool & Runtime Admission Protocol and the current admitted stack/boundary results. |
| docs/specs/research-brief.md | Domain research anchors plus cross-cutting just-in-time research triggers and open questions. |
| docs/specs/learning-mastery-and-scoring.md | Future V2+ learning, mastery, hinting, scoring, and simulated-player design notes. |
| docs/specs/qa-playtest-process.md | The AI playtest QA process: agent pack, session protocols, scoping rules, run mechanics. |
| journal/qa/ledger.md | QA coverage state (area × last-passed commit) + findings register. Read before scoping any QA run. |
| journal/qa/runs/ | Per-run QA reports (one dir per run, one file per agent). |
| docs/specs/<name>.md | Design specs. |
| docs/plans/ | Implementation plans for active specs. |
| docs/superpowers/specs/ | Design specs (active superpowers/White Lotus flow) — where current designs land. |
| docs/superpowers/plans/ | Implementation plans for active specs (superpowers/White Lotus flow). |
| docs/superpowers/specs/2026-07-12-foundation-and-tracks-design.md | Foundation & Tracks: three tracks + contracts, cloud posture, stack Admission Protocol, protocol system, inbox 1-pager. |
