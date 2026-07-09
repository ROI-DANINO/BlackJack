# QA Playtest Process

> How AI playtest QA works in this project: when QA runs, which agents run, how each agent
> session goes, how results are recorded, and how we avoid re-testing what is already proven —
> without missing regressions.
> Folded from `journal/raw/_inbox/blackjack-ai-playtest-qa-pack.md` (2026-07-09) and adapted to
> the real V1 build. Coverage state lives in `journal/qa/ledger.md`; per-run reports live in
> `journal/qa/runs/`.

## Purpose

Automated tests prove the engine's math. AI playtest QA proves the *game*: agents drive the real
browser build like players and reviewers, each from a different angle — rules fidelity at the UI
boundary, round flow, player experience, breakage, and product readiness.

Three principles resolve the thoroughness-vs-waste tension:

1. **Scope by change surface, not by memory.** The ledger records the commit at which each
   coverage area last passed. "Has this been tested?" is answered by `git diff <that-commit>..HEAD`
   over the area's files, never by recollection.
2. **Deep where changed, smoke where proven.** New/changed areas get a full agent session.
   Unchanged, previously-passed areas get a cheap smoke pass (play a couple of rounds through
   them) — enough to catch indirect regressions, not a re-derivation.
3. **Stopping rules are coverage-driven, not round-count-driven.** Each playtest session lists
   the situations it must observe and stops when each has been seen enough times to be
   conclusive (usually 2–3 occurrences) and further play only re-confirms what is already
   multiply-confirmed. There is no hard round cap — a session takes what it needs — but grinding
   for a situation the shoe won't deal is waste: after a genuine effort, report it as an
   explicit **coverage gap** in the report instead of brute-forcing it. Round minimums below
   are floors for statistical credibility, not targets.

## When QA runs

- **Feature QA** — every new feature gets its own scoped QA before it is called done.
  Run the agents whose angle the feature touches (usually 1–3 agents), deep on the feature,
  smoke on adjacent surfaces. A feature is not "done" until its QA findings are triaged and
  blockers are fixed and verified.
- **Milestone QA** — every milestone closes with a full pack run: all active agents, deep on
  everything changed since the last milestone QA, smoke on the rest. The Product Review agent's
  verdict gates the phase boundary.

## Scoping protocol (before any run)

1. Read `journal/qa/ledger.md` — coverage areas, their last-passed commits, and open findings.
2. For each area, diff its files since its recorded commit. Changed or new → **deep**;
   unchanged and last verdict PASS → **smoke**.
3. Open findings marked `fixed` get a targeted re-test in this run (regression check);
   findings already `verified` are not re-tested unless their area changed.
4. Write the chosen scope at the top of the run report before starting.

## The agent pack (adapted to the current V1 build)

Current build reality: browser Free Play (React → GameController → WASM → Rust core), bankroll +
betting + 3:2 blackjack, splits (incl. any two 10-values), double, insurance auto-decline,
shoe-boundary auto-reshuffle, per-hand outcomes, per-hand notes, JSONL round history in
`data/history/`. No learning/strategy layer, no mobile intent yet.

### Active agents — run these

#### 1. Rules & Payout Fidelity Agent

*(merged Rules QA + Betting/Economy QA — payout math is rules correctness here)*

The engine's hand math is already covered by the Rust suite; this agent tests the **UI/wire
boundary**: does what the table displays match what the engine decided and logged?

Session protocol:
- Play until the situation checklist is covered — each item observed ≥2 times, minimum 15
  rounds overall: soft hands, player natural, dealer natural, busts (player and dealer),
  pushes, splits (same-rank AND mixed ten-value pairs, aces), double, double-after-split,
  dealer ace (insurance auto-decline note appears), a shoe-boundary reshuffle. Unreachable
  items are reported as coverage gaps, not ground out.
- After each resolved round, cross-check three sources: on-screen totals/outcomes/bankroll
  delta ↔ the round's JSONL line in `data/history/` ↔ hand-computed expectation.
- Verify payout math end-to-end: 3:2 on naturals, 1:1 wins, push refunds, split/double stake
  handling, bankroll never silently drifts.
- Verify legal-action surface: buttons offered exactly match the legal actions for the state.

#### 2. State & Round Flow Agent

Session protocol:
- Walk every transition: bet → deal → player turn(s) → dealer turn → resolution → next round;
  multi-hand flow after splits (turn order, active-hand indicator).
- At each state, check enabled/disabled controls: nothing actionable after resolution, nothing
  missing during a turn, no stuck state that can't reach the next round.
- Cross a shoe boundary and confirm the reshuffle notice and clean continuation.
- Confirm round reset: no stale cards, outcomes, or messages leak into the next round.

#### 3. Player Experience Agent

*(includes basic UI-consistency notes — no standalone UI agent until polish matters)*

Session protocol:
- Play as a fresh player who knows blackjack but not this app, until impressions stabilize
  (typically ~10 rounds — stop when new rounds stop producing new observations). No source
  reading before playing — first impressions are the data.
- Report every moment of confusion: unclear whose turn it is, why a hand won/lost/pushed,
  what a button will do, what the reshuffle/insurance notes mean.
- Note friction and readability: layout, text consistency, card/score clarity, outcome
  visibility. Judge "playable and mildly fun," not visual polish.

#### 4. Edge Case / Breaker Agent

Session protocol:
- Rapid-click every action button, including during dealer play and mid-transition.
- Attempt out-of-turn and post-resolution actions; attempt illegal bets if the UI allows input.
- Refresh mid-round and verify recovery behavior is sane (and note what the intended behavior
  should be if undefined).
- Grind consecutive rounds across a reshuffle looking for state accumulation, message
  buildup, bankroll drift, or slowdown (covers the "long session" angle at V1 scale). At
  least 20 rounds; keep going only while new signals appear, and stop once a stretch of
  rounds adds nothing new.
- Watch the browser console throughout; any error/warning is a finding.

#### 5. Product Review Agent — always runs last

Reads the other agents' reports first, then plays ~5 rounds itself.

Session protocol:
- Verdict on the build as a V1 training product: what works, what feels incomplete, what
  blocks basic playability.
- Check the build against the mission (approachable training game, honest shoe) and the
  V1 scope in `ROADMAP.md`.
- Triage all findings from the run into **V1 blockers** (fix before the next phase) vs
  **backlog** (note in `journal/ops/tasks.md` Ideas or ROADMAP).
- Answer the gate question explicitly: ready for the next phase / ready for first external
  playtest — yes or no, and why.

### Parked agents — activation triggers

| Agent | Activate when |
|-------|---------------|
| Strategy Advisor QA | V2 ships strategy hints/feedback — checks the *advice is correct*, not just clear |
| Learning / Tutorial QA | any learning, drill, or explanation layer exists (V2) |
| UI Consistency QA (standalone) | V3 polish phase; until then folded into Player Experience |
| Accessibility QA | approaching real external playtests (V3) |
| Mobile / Responsive QA | mobile layout work becomes active (V3) |
| Long Session QA (full) | stability over 50+ rounds matters; Breaker's 20-round grind covers V1 |
| Regression QA | not an agent — regression is the ledger-driven smoke/re-test protocol in every run |

## Run mechanics

1. **Preflight**: test suites green (`cargo test -p blackjack-core`; `cd web && npm test`);
   `cd web && npm run dev` serving; record the commit hash; do the scoping protocol.
2. **Sequential playtesters**: agents that drive the browser (Playwright) run one at a time —
   they share one browser session. Pure code/log-reading verification can run in parallel.
3. **Reports**: each agent writes `journal/qa/runs/<YYYY-MM-DD>-<run-name>/<agent>.md` with:
   build commit, scope (deep/smoke areas), rounds played, checks performed, findings.
   Each finding: severity (`blocker` / `major` / `minor` / `note`), reproduction steps, and
   evidence (screenshot, JSONL line, console output).
4. **Synthesis**: Product Review agent triages; blockers become tasks in
   `journal/ops/tasks.md`; backlog items go to Ideas or ROADMAP.
5. **Fix → verify loop**: each fixed blocker gets a targeted re-test (agent or manual) before
   its ledger status moves `open → fixed → verified`. Only `verified` closes a finding.
6. **Ledger update**: after synthesis, update `journal/qa/ledger.md` — per-area verdict +
   commit, and the findings register. This is what makes the next run cheap.

## Finding lifecycle

`open` → `fixed` (change landed, unverified) → `verified` (re-tested on the real build) —
or `wontfix` (with a one-line reason). IDs are `QA-NNN`, assigned in the ledger, stable forever;
run reports reference them.
