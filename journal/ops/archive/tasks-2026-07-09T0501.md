# Tasks — Current Phase Only

> Only the current phase gets detailed tasks. Future work lives in ROADMAP.md.
> codex-end archives this file to ops/archive/ before mutating it.

## Active — sub-phase: Free Play UI polish (notes + shoe continuity) — DONE
Both tasks shipped & merged to main (b7b60c5 + 176dd86 → merge 7f83023); rd-verify (opus) PASS;
19/19 web tests green. This likely completes the V1 Free Play skeleton exit criteria — a
phase-boundary decision (V2 Basic Strategy vs. more Free Play polish) is the next call, best made
at a `/wl-end` milestone check.
- [x] **Per-hand notes input** (attach-on-Deal). GameController buffers the resolved round and
      writes it with an optional harness `note` field on the round JSONL line when you Deal (or
      Download). No core change. New GameState: noteDraft/notice/canNote.
- [x] **Wired `GameController.reshuffle()` into the UI** — auto-reshuffle + "Shoe reshuffled"
      notice when the shoe hits penetration. **Closes the accepted Fire craft-minor** (Free Play
      no longer dead-ends at the shoe boundary).

## Done — TS UI bridge (V1 sub-phase, shipped 2026-07-09, merged to main)
- [x] Brainstorm → design spec (`docs/superpowers/specs/2026-07-09-ts-ui-bridge-design.md`) →
      implementation plan (`docs/superpowers/plans/2026-07-09-ts-ui-bridge.md`).
- [x] Core: width-safe RNG modulo (cross-target determinism); unified JSON envelope +
      feature-gated WASM export (`handleCommand`); golden wire fixtures.
- [x] Web: Vite+React+TS scaffold + wasm build + async init gate; hand-authored wire types +
      boundary validator + golden contract test; CoreTransport (WASM + CLI); async LogSink +
      MemorySink; GameController (session/round loop, logs-delta history, error/fatal); React
      table UI (bankroll, hands, hole-card hide, legal-action buttons, download, fatal banner).
- [x] Built via subagent-driven-development (9 tasks); Fable pre-build/plan/whole-branch reviews;
      merged to main locally. 46 Rust + 17 web tests green.
- [x] `data/history/` established as the JSONL export home (gitignored data + tracked README).

## Questions
- How should the BlackjackInfo chart be encoded into the first machine-readable Basic Strategy table?
- Per-hand notes: attach-on-Deal vs type-during-hand? (lean attach-on-Deal)
