# Repo Restructure — layers, evidence citation, and a board that can hold a design phase

> Status: **in progress, started 2026-07-26.** Owner-approved. This plan is the resume point;
> a fresh session should read it before touching anything.

## Why

Three things went wrong at once and compounded.

**The project stalled without anyone deciding to stall it.** Between 2026-07-07 and 2026-07-11,
eight plans shipped and the whole playable product exists. Between 2026-07-16 and 2026-07-23,
eight more plans produced two pieces of code — one unwired storage layer and one agent-tooling
migration — and **zero learner-visible change**. The last thing a learner could see change was
2026-07-11.

**Research and code diverged by layer.** Roughly 90 of Phase 1's 96 findings, all of Phase 3, and
all 41 activity requirements concern the learning material. The engine layer has essentially no
research bearing on it and does not need any. The visual layer has neither research nor code —
zero CSS exists in `web/`.

**The board could not represent the difference between designing and building.** `ROADMAP.md`
carries three numbered entries for the entire product, so `phase.md`'s `roadmap_step: 2` spans
P1 through P5. The kanban validates that every milestone node points at that number — which at
that resolution enforces nothing. Eleven build cards were shaped onto a design phase and the
tooling raised no objection. It then turned out the CLI has no `node-deactivate`, so the board
could not be corrected and was knowingly left wrong.

## Decisions already taken

**Layers, not versions.** V1/V2/V3 began as version numbers and are actually **layers of the
software**: L1 the mechanical engines, L2 the learning material, L3 the visual system. Layers
describe architecture and do not sequence work.

**Phases sequence work, and P5 ends playable.** The owner is currently the only user and will run
the playtests himself. P5 wires the L2 foundation into the surface that **already exists** — the
unstyled but functional web app — so real attempts are produced and real data exists. P6 then
builds the visual system on a learning design that has been tested on a human. This resolves a
standing contradiction: the charter's P5 gate is "real-player playtests pass before expansion",
which pure infrastructure cannot satisfy. See `docs/superpowers/research/evidence-index/P3-evidence-catalog.md`
§ playtest questions P-1…P-5, and the bridge's ruling that every numeric threshold is a product
judgement until calibrated on this product's own data.

**Every card, phase, and roadmap entry cites its evidence** by finding ID and archive locus,
through `docs/superpowers/research/evidence-index/`.

## Stages

### Stage 1 — capture (done)

`docs/superpowers/research/evidence-index/` with six pages and a README that states plainly that
the index is a pointer layer and never a warrant. `docs/superpowers/specs/2026-07-26-chips-xp-and-progression-economy.md`
captures the motivation model and its seven open questions E-1…E-7.

### Stage 2 — land the corrections that were never applied

Mechanical application of already-determined corrections; no new judgement. Delegated in parallel,
each returning a diff for review before any write.

- **14 unlanded Phase 1 verifier corrections** — C1 F1–F21, C4 F1–F9, C5 F1–F15. Highest value:
  C5 F4 must be relabelled from spacing evidence to interleaving evidence.
- **10 unapplied Phase 3 corrections** from `V-C7-topup.md`. **`C-C7T-009` must not be applied as
  written** — its own Floyd characterisation was itself wrong and is corrected in
  `foundation-audit-p3/README.md:50-66`. Write from the corrected record.
- **24 Relabels and 7 Revises from Phase 2**, none of which has ever been applied to a product
  document.
- **The false claim** at `P1-gate-summary.md:411` that every correction landed, and the four
  units ruled INSUFFICIENT that no owner-facing document reports.
- **Stale documents**: `README.md` pointing at paused work; `learning-mastery-and-scoring.md`
  banner-marked "parked for V2+" during V2; `docs/architecture.md`'s pointer to a component the
  approved design will not build; `v1-simulation-foundations.md` marked "Status: design" on
  shipped work; `ROADMAP.md:43` vs `PROGRESS.md:53`; the Tier-1 QA suite enumeration omitting
  `qa:learn`.
- **Dead `docs-map.md` rows** — the `~`-prefixed row and the `docs/specs/<name>.md` placeholder.
  Both are permanent false-positive drift warnings that train the reader to ignore `Drift:`.

### Stage 3 — rebuild `ROADMAP.md`

Two sections that are currently conflated:

- **Layers** (unnumbered): L1 / L2 / L3, each with its current state, what exists, what is
  missing, and which evidence bears on it.
- **Delivery map** (numbered): the phases. This is what `roadmap_step` points into.

Also resolve the circular authority: `ROADMAP.md` declares itself authoritative for P4–P6 scope
and contains no P4, P5 or P6 section, while the charter points back to `ROADMAP.md`.

**Mechanical constraint:** renumbering requires updating `phase.md`'s `roadmap_step:` and every
milestone node's `Roadmap:` line in the same change, or board validation fails and `/wl-start`
enters recovery.

### Stage 4 — rebuild the board

Remove `GD-01`…`GD-11` with reasons and `node-close GD`. The content is not lost —
`docs/superpowers/plans/2026-07-23-graded-decision-practice.md` holds all eleven tasks in full and
they will be recreated with fresh IDs when P5 opens. Node and card IDs burn permanently; `GD` and
`GD-01`…`GD-11` are spent.

Then shape the P4 design node with cards for the phase's real deliverables: the skill graph and
prerequisites, learning outcomes, the activity taxonomy, capability-to-activity mapping,
per-activity evidence and mastery rules, session composition, interaction UX, the motivation
economy, and **the activity-pattern catalog** — the non-hand, non-multiple-choice learning-game
formats. That last one is not an invention: `docs/imports/v2-research-2026-07-11/research/v2-research-03-course-and-source-audit.md:115`
names a competitor exercise-pattern catalog as a recommended research artifact, and it was never
produced. A sweep of the entire corpus for interactive, manipulable, or game-like activity formats
returns essentially nothing; every exercise in every document is a dealt hand or a multiple-choice
question.

## What must not break

The White Lotus machinery hard-fails on these. Verified against `workspace/scripts/wl-lifecycle.ts`
and `scripts/kanban.ts`.

- `journal/docs-map.md` stays at that exact path — every other owner path is derived from its
  directory. Its frontmatter keeps `manifest_version: 1`, `profile`, `domain`, `tier`, `mode`,
  `root`, and a `modules:` block.
- `journal/ops/phase.md` exists and opens with a `---` frontmatter block, and keeps
  `roadmap_step:` as a number while a v2 board exists.
- Every milestone node's `Roadmap:` equals that number; every node's `Plan:` resolves on disk.
- `journal/ops/tasks.md` line 1 is exactly `<!-- agent-kanban:v2 -->`; the file has a
  `## Milestones` section; **any `## ` heading that is not a lane name is a validation failure**,
  so no `## Ideas` or `## Backlog`.
- Every card carries all eleven required fields; `Gate` is one of the six legal values.
- At most one `[active]` node. Card and node IDs are never reused — archives are scanned.
- `journal/ops/tasks.md` is written only through `scripts/kanban.ts`.

Two cheap wins to take while restructuring: add an `objective:` key to `phase.md` (the engine
already reads it, and without it every session after a `/wl-end` opens with
`Objective: unknown`), and delete the dead `docs-map` rows.

## Deferred, deliberately

Framework fixes belong to `~/Desktop/Projects/workspace`, which owns `kanban.ts` and its tests;
`scripts/kanban.ts` here is a derived port and must not be patched. None of them blocks this
restructure: `node-deactivate` and `node-remove`; `Active → Ready` and `Ready → Blocked`
transitions; appendable `Evidence`; report-only `Source` validation; a reorder verb; the
lifecycle precedence where a board's `next` silently overrides a hand-written `phase.md` `next:`;
and the cross-chat baton living under a gitignored path, which makes it inert in worktrees.
