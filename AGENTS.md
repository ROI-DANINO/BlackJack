# AGENTS.md — Read First

> Mission, constraints, and the current-phase pointer for blackjack.
> Authoritative per `journal/docs-map.md`.

## Mission
Build a Duolingo-like blackjack training game that feels approachable while modeling real shoe blackjack accurately enough for Basic Strategy, card counting, and later casino-like training.

## Constraints
- Treat this as a training product, not gambling software.
- Do not fake card flow: build shoes, shuffle once, deal from the ordered shoe, and keep card origins traceable.
- Keep future tasks out of `journal/ops/tasks.md`; only the active phase gets task detail.

## Current phase
See `journal/ops/phase.md`. Only the current phase gets detailed tasks
(`journal/ops/tasks.md`); future phases stay in `ROADMAP.md`.

## Commands
- `codex-start` — orient & resume (read-only).
- `codex-next` — cheap cross-chat bridge.
- `codex-end` — checkpoint; reconcile + blog at a milestone.
- `codex-init` — first-time setup or structural re-tune.
