# Roadmap

> Destination, phases, milestones, exit criteria.
> Forward planning uses three continuing product tracks as a lens; the V1/V2/V3 milestones below are
> the live product-delivery steps (V2 current, with the P1–P6 arc as execution detail within them) and
> also carry the phase/QA lineage. Only the active phase gets detailed tasks.
> QA gates: every feature ships with a scoped feature QA; every milestone below closes with a
> milestone QA pack run before the next phase starts (`docs/specs/qa-playtest-process.md`).

## Destination
An approachable blackjack training game with accurate shoe simulation, Free Play, Basic Strategy mastery, card counting practice, and later casino-like cognitive load.

The product is a training app with gameplay, not a gambling app or an academic simulator.
Free Play deals from the real shoe; learning layers can add hints, feedback, and reports
around the hand, but they should not rig card flow for lessons.

Delivery is web-first. Mobile is a later product surface, activated only after the web learning
experience proves useful and a mobile runtime passes the Tool & Runtime Admission Protocol.

## Continuing Product Tracks

The tracks mature independently and continue for the life of the product. They are a planning lens,
not replacements for historical milestone names, phase identifiers, specs, commits, or QA records.

- **T1 Core — blackjack truth:** ordered-shoe simulation, rules, settlement, replayable logs,
  ruleset-matched strategy, later counting truth, and table/machine variants. The simulator and
  verified H17/S17 strategy profiles are mature; future work is activated by learning or realism
  consumers. One overdue boundary-hardening item remains: extend WASM freshness coverage to
  `Cargo.lock`/`build-wasm.sh` and prove native↔built-WASM parity with the next wire-changing slice.
- **T2 Learning — architecture and pedagogy:** typed curriculum, deterministic lesson flow,
  engine-owned grading, feedback, practice, mastery, and later counting instruction. Blackjack
  Foundations and the Strategy Profile Foundation are complete. The active slice is a small
  adaptive-learning mechanics proof over representative Blackjack Foundations units: establish the
  evidence/activity/progress contracts before Strategy Table Fundamentals resumes against them.
- **T3 Visual Shell — product experience:** coherent app navigation, onboarding, game feel,
  accessible feedback, responsive presentation, and later mobile delivery. This track has not begun;
  libraries and runtimes remain undecided until an active consumer justifies them.

### Need-activated platform capabilities

| Capability | Activation trigger | Guardrail / current status |
|---|---|---|
| Local durable progress | The first requirement that completion survive reload. | Triggered by the adaptive-learning mechanics proof. `idb` 8.0.3 is admitted — conditionally, pending a production bundle-delta check — behind the approved pseudonymous local learner key and `ProgressStore` seam. The active slice (AL-D1) builds the cycle-1 foundation only: port, versioned envelope/attempt record, and a provider-neutral contract suite proven headless against fixtures. The real write/reload path and its feature QA follow once the mechanics proof names a consumer and the per-skill evidence keys. |
| Accounts and cross-device sync | Learners need progress on more than one device. | Ordinary training remains client-authoritative; research identity, storage, migration, offline, and conflict semantics before selecting a provider. Backend runtime runs the Admission Protocol; candidates: Node+Hono, Bun, Deno, Rust/axum reusing `blackjack-core` (native engine parity if replay-validation ever activates); storage behind `ProgressStore`, fetch-standard handlers only. See `journal/decisions.md` 2026-07-16. |
| Product observability | External beta creates concrete learning or drop-off questions. | Research event purpose, consent/privacy, retention, batching, and offline failure before adding telemetry. |
| Independently published curriculum | Content must ship without an application release. | Research integrity, schema compatibility, rollback, and provenance before remote payloads/admin tooling. |
| Mobile runtime | Mobile becomes an active product slice after the web path is proven. | Run an admission spike for WASM packaging, lifecycle suspension/restore, offline behavior, and update delivery; no framework is selected today. |
| Competitive/certified authority | Leaderboards, multiplayer, or certified mastery require anti-cheat guarantees. | Research authority, replay validation, seed/shoe secrecy, and abuse handling; ordinary trainer play stays in browser WASM. |

## Delivery map

Numbered delivery steps. `journal/ops/phase.md` binds to these via `roadmap_step:`; each entry
points at its existing section below, which stays the authority for scope and exit criteria.

1. [x] **V1 — Simulation Foundations** — see `## V1 — Simulation Foundations`
2. [ ] **V2 — Learning Foundations** (current) — see `## V2 — Learning Foundations`
3. [ ] **V3 — UX and Game Experience** — see `## V3 — UX and Game Experience`

## Historical Milestone Record

The established milestone sections remain intact so completed scope, active exit criteria, and QA
evidence retain their original names and references.

## V1 — Simulation Foundations
- [x] Free Play skeleton — exit criteria MET (2026-07-09): one player plays complete rounds vs a dealer from a seeded 6-deck shoe with cut card / penetration, legal actions, outcomes, logs, and shoe continuity (auto-reshuffle). Playable in-browser via WASM with JSONL history + per-hand notes.
- [x] V1 milestone QA — exit criteria MET (2026-07-10): full milestone QA plus targeted remediation re-test; all six V1-gating findings verified and product verdict is GO for V2 in `journal/qa/ledger.md`.

Scope:
- Web app foundation with mobile-responsive thinking.
- One active player vs dealer in the UI; engine stays table-shaped for more seats later.
- Real shoe creation from multiple decks, stable card/deck IDs, seeded shuffle, cut card / penetration, and round/session logs.
- A configured modern-classic casino ruleset; no rules scattered through UI code.
- Hit/stand first, then double/split/surrender only where the locked V1 ruleset requires them.

Non-goals:
- Full learning path, card counting lessons, simulated players, leaderboards, daily challenges, polished casino visuals, real-money/chips-first gameplay, and CSM/ASM simulation.

## V2 — Learning Foundations
- [ ] Learning foundations — exit criteria: a new player can learn the current table's legal
  actions, navigate the matching Basic Strategy table, and use it in guided practice with
  immediate or delayed feedback that keeps decision quality separate from hand outcome.

V2 ships two ordered, replayable subjects:
- [x] **Blackjack Foundations** — teaches hit/stand first, then double and split, using short
  guided simulations with concise explanations.
- [ ] **Strategy Table Fundamentals** — teaches hand classification and table navigation, then
  table-open guided practice and checkpoints. The table remains user-toggleable; no-table
  testing and realistic pace are later mastery work.

The shared **Strategy Profile Foundation** required by the second subject is complete: H17/S17
strategy truth is verified and lessons can gate against the active ruleset (`5bbc0b4`).

Before the remaining Strategy Table Fundamentals design is resumed, the active adaptive-learning
mechanics sub-phase will prove the smallest reusable evidence, activity, session, progress, and
deterministic-fallback contracts against one or two existing Blackjack Foundations units. This is a
bounded retrofit, not a new subject or a generic course platform.

**How the adaptive-learning foundation is being built — the P1–P6 research→product program.** This
V2 learning-architecture work runs through a six-phase arc that turns a research foundation into a
built learning product. **P1–P3 do not build the product; they make it trustworthy and usable to
design.** Authority for the phase map, deliverables, and gates is the charter
(`docs/superpowers/specs/2026-07-17-adaptive-learning-foundation-audit-research.md`); ROADMAP owns
the P4–P6 product scope.

| Phase | Role | Builds product? |
|---|---|---|
| **P1 — Evidence foundation** ✅ | Verified evidence + transferable learning requirements. | No |
| **P2 — Load-bearing foundation audit** | Per-decision verdicts on the decisions that materially affect the product. | No |
| **P3 — Research foundation & product-design inputs** | The six research deliverables + a **Product Design Inputs** bridge into P4. | No |
| **P4 — Learning product & activity blueprint** | **Owns** the skill graph, curriculum, activity taxonomy, and the first vertical slice. | Designs it |
| **P5 — Vertical-slice implementation & learning proof** | A small representative slice proven by real-player learning-integrity playtests. | Builds a slice |
| **P6 — Product expansion & visual experience** | Full curriculum/activity catalog and the complete visual system; aligns with the V3 UX milestone. | Builds it out |

**How P1–P6 map to the V-milestones (the two numbering systems are complementary, not rival).** The
**V-steps** (V1/V2/V3) are the product-delivery milestones above; the **P-phases** are the
research→product execution arc *within* them. **P1–P5 advance V2 — Learning Foundations** (research
foundation → designed learning product → proven vertical slice); **P6 is the V3 — UX and Game
Experience milestone** (full visual system, game feel, and product polish). So `phase.md`'s
`roadmap_step: 2` (V2) is correct for all of P1–P5; P6 opens V3. When a P-phase is cited, read it as
execution detail inside its V-milestone.

Build the learning loop in this order: verify and encode one ruleset-matched strategy source;
ship one guided drill loop; add brief feedback and targeted repetition; add persisted progress
and checkpoints only when that progression needs them; then expand strategy content gradually.
Free Play remains an honest ordered shoe. Its table can appear early, but active coaching and
session reviews come after the teaching loop is proven. Drills may target decisions, but must
run them through the same hand/rules machinery rather than use fixed scripted outcomes.

Non-goals: full Basic Strategy memorization, no-table/timed assessments, card counting,
accounts/backend, rank/XP systems, and generic course-platform abstractions. Each V2 feature
gets its own research or design cycle when it becomes active.

## V3 — UX and Game Experience
- [ ] Training game polish — exit criteria: mobile-friendly table UI, onboarding, progression, and session feedback feel like a game rather than a simulator.

Likely scope:
- Better table UI, onboarding, progression, rank/mastery presentation, game-feel polish, and clearer Free Play hints/reports.

## Later
Add topics incrementally:

- Running count mastery.
- True count.
- Multi-seat tables.
- Simulated players.
- Casino pace.
- Bet sizing / unit sizing.
- Count deviations.
- Advanced counting systems.
- Table-rule literacy and ruleset-matched strategy deltas.
- CSM/ASM and machine-buffer table variants.
- Leaderboards.
- Daily challenges.
- Shared daily shoe / daily drill.

Each major topic should get its own research, spec, and implementation plan when it becomes active.
