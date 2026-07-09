# Tasks — Current Phase Only

> Only the current phase gets detailed tasks. Future work lives in ROADMAP.md.
> codex-end archives this file to ops/archive/ before mutating it.

## Active — sub-phase: Free Play UI polish (notes + shoe continuity)
- [ ] **Per-hand notes input.** During playtest, let the user type an optional note for the hand
      they just played; save it as a harness-added `note` field on that round's JSONL line (no
      core change — it's a harness annotation like `session_id`/`ts`). Open design decision:
      attach-on-Deal (buffer the resolved round, flush with the note when the next round starts /
      on download) vs. type-during-hand. Lean **attach-on-Deal**; confirm before building.
- [ ] **Wire `GameController.reshuffle()` into the UI** (closes the accepted Fire craft-minor).
      When `start_round` returns `"shoe must reshuffle"` at penetration, either auto-reshuffle
      with a visible notice or surface an explicit reshuffle control in `Controls.tsx`/`Table.tsx`
      so Free Play can cross the shoe boundary instead of dead-ending on a raw error string.

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
