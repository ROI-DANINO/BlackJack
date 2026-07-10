# QA Playtest Process

> How AI playtest QA works in this project: which checks run as **scripts** vs **agents**, how
> each runs, how results are recorded, and how we avoid re-testing what is already proven — without
> missing regressions.
> Folded from `journal/raw/_inbox/blackjack-ai-playtest-qa-pack.md` (2026-07-09) and adapted to the
> real V1 build; moved to a script-first model 2026-07-10 (see
> `docs/specs/2026-07-10-qa-script-suite.md`). Coverage state lives in `journal/qa/ledger.md`;
> per-run reports live in `journal/qa/runs/`.

## Purpose

Automated unit tests prove the engine's math. QA proves the *game*: that the real browser build
behaves — rules fidelity at the UI boundary, round flow, robustness under abuse, and player
experience. Most of that is **mechanical and deterministic** and belongs in scripts; only
subjective feel and the final go/no-go call need a mind.

Three principles resolve the thoroughness-vs-waste tension:

1. **Scope by change surface, not by memory.** The ledger records the commit at which each
   coverage area last passed. "Has this been tested?" is answered by `git diff <that-commit>..HEAD`
   over the area's files, never by recollection.
2. **Deep where changed, smoke where proven.** Scripts run in full every milestone (they're
   cheap); the Player-Experience agent runs only when its surface (`web/src/app/`) changed.
3. **Coverage-driven stopping.** Scripts play until each required situation is observed enough to
   be conclusive (≥2×), then stop; a situation the deterministic shoe won't deal is reported as an
   explicit **coverage gap**, not ground out.

## Script-first model — the three tiers

- **Tier 1 — deterministic scripts (every milestone, gate the phase boundary, ~free, no agents):**
  `cargo test -p blackjack-core` (engine math) + the wasm-freshness guard + `cd web && npm test`
  (unit) + **`cd web && npm run qa`** (the `web/qa/` suite: `qa:rules` + `qa:flow` + `qa:breakit`).
  Any non-zero exit blocks the boundary.
- **Tier 2 — exactly one judgment agent, only when `web/src/app/` changed:** the Player Experience
  agent. It is fed the Tier-1 results so it never re-derives mechanics — it answers only "is this
  clear / does it teach / does it feel like a game."
- **Tier 3 — synthesis, inline (parent session, or one cheap agent):** read Tier-1 output + the PX
  report → gate verdict + ledger update.

## When QA runs

- **Feature QA** — every new feature gets its own scoped QA before it is called done. Run the
  Tier-1 scripts (deep where the feature changed files a script covers), and the PX agent if the
  feature touched `web/src/app/`. A feature is not "done" until its findings are triaged and
  blockers are fixed and verified.
- **Milestone QA** — run the full Tier-1 suite deep, then the PX agent iff `web/src/app/` changed,
  then synthesize. The synthesis verdict gates the phase boundary; a non-zero `npm run qa` exit
  blocks it outright.

## Scoping protocol (before any run)

1. Read `journal/qa/ledger.md` — coverage areas, their last-passed commits, and open findings.
2. For each area, diff its files since its recorded commit. Changed/new → run the covering script
   **and** (if `web/src/app/`) the PX agent; unchanged + last verdict PASS → the scripts still run
   (cheap), PX is skipped.
3. Open findings marked `fixed` get a targeted re-test this run; `verified` findings are not
   re-tested unless their area changed.
4. Record the run in the ledger run-log.

## The pack — scripts and agents

Each former playtest agent is now either a **[SCRIPT]** (deterministic, in `web/qa/`) or an
**[AGENT]** (judgment). Scripts write `journal/qa/runs/<date>-<role>/report.{md,json}` and exit
non-zero on any failure; they never edit the ledger (findings are triaged into `QA-NNN` by hand).

### 1. Rules & Payout Fidelity — **[SCRIPT] `qa:rules`**

*(merged Rules QA + Betting/Economy QA — payout math is rules correctness here)*

`web/qa/rules/`. Drives a scripted basic-strategy-ish session until the situation checklist is each
seen ≥2× (soft hands, player/dealer natural, player/dealer bust, push, same-rank split, mixed
ten-value split, double, double-after-split, dealer-ace insurance note, shoe reshuffle);
unreachable items → coverage gap. Per round it independently re-derives and asserts: dealer H17
correctness, payout multipliers (1× / −1× / 0 / 1.5×, double/split scaling), split-eligibility
(offered iff same-rank OR two 10-value ranks, both directions), and the bankroll chain — each
cross-checked against on-screen state and the round's JSONL line. Emits a coverage report.
**Extend it** each milestone with new situations/rules the feature adds.

### 2. State & Round Flow — **[SCRIPT] `qa:flow`**

`web/qa/flow/`. Walks every transition (pre-session → deal → player turn(s) → dealer → resolution →
next round; multi-hand after split) and asserts: control surface exactly matches legal actions
(Double gone after Hit; nothing actionable post-resolution; Split iff eligible), no stuck states,
no stale leak (cards/outcome/notice/note) into the next round, the shoe-boundary reshuffle notice
appears once and clears, and `active_hand_index` is actually rendered during a split (and absent on
single-hand/resolved rounds).

### 3. Player Experience — **[AGENT]** (runs only when `web/src/app/` changed)

*(includes basic UI-consistency notes — no standalone UI agent until polish matters)*

The one irreducible agent: subjective clarity and feel a script can't judge. Session protocol:
- Play as a fresh player who knows blackjack but not this app, until impressions stabilize
  (typically ~10 rounds). Read the Tier-1 script reports first for what's already mechanically
  proven; do **not** re-derive math or re-hunt races — report only confusion, friction, and
  readability ("whose turn is it," "why did I win/lose," "what does this button/note/notice mean").
- Judge "playable and mildly fun," not visual polish.

### 4. Edge Case / Breaker — **[SCRIPT] `qa:breakit`**

`web/qa/breakit/`. The adversarial E2E abuse harness (spec:
`docs/specs/2026-07-10-breakit-adversarial-harness.md`): realistic UI abuse + injected
`page.evaluate` attacks, asserting history/seed/flush/money/card invariants + no console
errors/crashes/stuck UI. Grows each milestone with attacks for the new surface.

### 5. Product Review — **[SYNTHESIS]** (always last)

Parent session (or one cheap agent). Reads the Tier-1 reports + the PX report (does not re-run
mechanics), then:
- Verdict on the build as a training product: what works, what feels incomplete, what blocks basic
  playability. Check against the mission and the `ROADMAP.md` scope.
- Triage findings into blockers (fix before the next phase) vs backlog.
- Answer the gate question explicitly: ready for the next phase / first external playtest — yes/no,
  and why.

### Parked agents — activation triggers

| Agent | Activate when |
|-------|---------------|
| Strategy Advisor QA | V2 ships strategy hints/feedback — checks the *advice is correct* (likely a new `qa:strategy` script) |
| Learning / Tutorial QA | any learning, drill, or explanation layer exists (V2) |
| UI Consistency QA (standalone) | V3 polish phase; until then folded into Player Experience |
| Accessibility QA | approaching real external playtests (V3) |
| Mobile / Responsive QA | mobile layout work becomes active (V3) |
| Long Session QA (full) | stability over 50+ rounds matters; breakit's grind covers V1 |
| Regression QA | not an agent — regression is the ledger-driven scripts + smoke/re-test protocol |

## Run mechanics

1. **Preflight**: `cargo test -p blackjack-core` green; `cd web && npm test` green; record the
   commit hash; do the scoping protocol. (The scripts run their own wasm-freshness gate and build a
   deterministic `vite preview` — no dev server needed; if `npm run dev` is up on :5173 it won't
   collide, the scripts use their own ports.)
2. **Tier 1**: `cd web && npm run qa` (rules + flow + breakit, sequential — they share the browser
   pattern). Non-zero exit = a blocker; open the role's report for the repro.
3. **Tier 2**: if `web/src/app/` changed, run the Player Experience agent, feeding it the Tier-1
   reports.
4. **Tier 3 (synthesis)**: triage; blockers become `QA-NNN` findings + tasks; backlog to Ideas/ROADMAP.
5. **Fix → verify loop**: each fixed blocker gets a targeted re-test (re-run the covering script, or
   manual) before its ledger status moves `open → fixed → verified`. Only `verified` closes it.
6. **Ledger update**: after synthesis, update `journal/qa/ledger.md` — per-area verdict + commit,
   the findings register, and the run-log. This is what makes the next run cheap.

## Finding lifecycle

`open` → `fixed` (change landed, unverified) → `verified` (re-tested on the real build) —
or `wontfix` (with a one-line reason). IDs are `QA-NNN`, assigned in the ledger, stable forever;
run reports and script fixtures reference them.
