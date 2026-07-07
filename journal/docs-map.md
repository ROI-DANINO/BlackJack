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
    remit: Keeps blackjack engine behavior faithful to real shoe, card, and round flow.
  - name: learning designer
    remit: Keeps drills short, useful, and focused on mastery rather than lectures.
  - name: rules researcher
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
| journal/raw/ | Local raw imports and archived source notes; fold useful details into owned docs before relying on them. |
| docs/specs/<name>.md | Design specs. |
| docs/plans/ | Implementation plans for active specs. |
