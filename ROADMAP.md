# Roadmap

> Destination, layers, phases, exit criteria.
>
> Two axes, deliberately separate. **Layers** are the architecture — what the software is made of.
> They mature independently and never end. **Phases** are the delivery sequence — what gets built
> when. A phase names which layers it advances. `journal/milestone.md` binds to the numbered
> phase list via `roadmap_step:`.
>
> QA gates: every feature ships with a scoped feature QA; every phase closes with a milestone QA
> pack run before the next opens (`docs/specs/qa-playtest-process.md`).

## Destination

An attractive playful learning game for blackjack and statistical understanding, with accurate
chip-based Free Play and an isolated Practice table. Counting and casino-like cognitive load are expansion.

The product is a training app with gameplay, not a gambling app and not an academic simulator.
Free Play deals from the real shoe; learning layers may add hints, feedback, and reports around
the hand, but they never rig card flow for lessons.

Delivery is web-first. Mobile is a later surface, activated only after the web learning experience
proves useful and a mobile runtime passes the Tool & Runtime Admission Protocol.

**The long-run destination is multi-user**: accounts, cross-device progress, multiplayer Free Play
tables with real people at them, and leaderboards ranked on **mastery** — never on chips or
winnings, which `LDB-05` forbids as loss-chasing. `[Product judgement]`, recorded 2026-08-17 from
the owner's stated direction. Not a dated commitment and not a scheduled phase.

It is written here so the engine boundary stays a decision rather than an accident. Ordinary
training is client-authoritative and the browser can see the entire undealt shoe, so multiplayer and
any trustworthy leaderboard imply **server authority — an architecture change, not a feature**
(`CLOUD-06`; see the Competitive / certified authority row under Need-activated platform
capabilities). Supabase is the banked provider for the accounts-and-sync half
(`journal/decisions.md` 2026-08-16) and does **not** address the authority half. Nothing is admitted
until a trigger fires: a second device, a second user, or server authority.

## The three layers

These are the same three tracks this roadmap has always carried, named for what they are. They are
the durable architecture; they do not sequence work and they do not end.

### L1 — Core engines (blackjack truth)

Ordered-shoe simulation, rules, settlement, replayable logs, ruleset-matched strategy, later
counting truth and table/machine variants.

**State: mature and proven.** Rust core with deterministic seeded shoes, traceable card origins,
verified H17/S17 strategy profiles, and a single JSON command crossing the WASM boundary that the
CLI and the browser share by construction. 80 Rust tests (counted 2026-07-26; an inflated count
was corrected once before, so this one is a count and not a recollection), golden fixtures guarding
the wire contract from the TypeScript side.

**Known gaps.** The strategy oracle exists and is exhaustively chart-tested but is **not a
`CoreCommand`** — the browser cannot ask what the correct play is. Surrender is not modelled at
all; insurance is auto-decline only. No test runs on the wasm32 target, so native↔WASM parity is
guarded by a freshness script rather than proven. That script does not watch `Cargo.lock` or
`build-wasm.sh`; the gap has ridden past two slices.

**Evidence posture.** No research phase bears on this layer, and none needs to. Its authority is
code, tests, and `docs/specs/research-brief.md`. A task claiming research backing for an L1
decision is citing something that does not exist.

### L2 — Learning material (curriculum, activities, mastery)

Typed curriculum, deterministic lesson flow, engine-owned grading, feedback, practice, evidence,
mastery, and later counting instruction.

**State: deeply researched, shallowly built.** Nine mechanics units ship as authored data with a
referential-integrity validator and a content-agnostic renderer. Underneath them, the mastery model
is one line — every required check answered correctly once, ever — and `validate.ts` restricts
required checks to multiple-choice questions, so **a played hand can never satisfy completion**.
Completion gates nothing. A full durable-progress schema exists with an IndexedDB adapter, passes
28/28 contract gates in two browsers, and **has no product consumer**.

**Measurement limit.** The shipped completion flag is not proof of playing skill. Claims of play
mastery need played-hand evidence; conceptual and statistical learning need assessment appropriate
to their outcomes. This does not require building the complete mastery model before a discovery
activity prototype.

**Evidence posture.** Roughly 90 of the 96 Phase 1 findings, all 20 Phase 3 findings, and all 41
activity requirements bear on this layer. Index:
`docs/superpowers/research/evidence-index/`. What may be asserted, what is product judgement, and
what is an untested assumption is settled in `P2-verdict-catalog.md` §Bottom line.

### L3 — Visual system (product experience)

Coherent navigation, onboarding, game feel, accessible feedback, responsive presentation, and later
mobile delivery.

**State: does not exist.** There is no CSS anywhere in `web/`. Navigation is a two-value `useState`
with two buttons — no router, no deep links, no history. The interface is unstyled semantic HTML
and reads as a debug harness (`QA-014`, open).

**Evidence posture.** Three Phase 1 findings touch this layer, all indirectly. Decisions here are
**product judgement by default** — which is fine, provided they are labelled that way rather than
dressed as evidence-backed. The one hard external constraint is accessibility, and a target WCAG
conformance level must be stated before the requirement set is treated as one baseline: the
reduced-motion element rests on SC 2.3.3, **Level AAA**, while the rest of the set is A or AA.

## Delivery map

Numbered phases remain stable for the existing board. The September 5 direction replaces the old
phase-5 bundle and the requirement to delay visual quality until phase 6. All future scope below is
Product judgement; only phase 4 has executable board detail today.

1. [x] **Simulation foundations** — ordered-shoe engine and Free Play.
2. [x] **Learning mechanics prototype** — nine foundations units, strategy profiles and progress-storage port.
3. [x] **Research foundation** — retained research, audits and pattern catalog; not proof of product enjoyment.
4. [ ] **Learning design realignment** (current) — reconcile the approved direction and next build with existing authorities.
5. [ ] **First experience** — test one activity, then a coherent attractive beginner opening with learning and table play.
6. [ ] **Core learning product** — grow blackjack/statistics content, fitting challenges, progression and chip economy.
7. [ ] **Expansion** — counting, casino-like load and other need-activated advanced capabilities.

## Phase 4 — Learning design realignment (current)

Current direction: `docs/superpowers/specs/2026-09-05-playful-learning-direction.md`.
Documentation plan: `docs/superpowers/plans/2026-09-05-product-realignment.md`.
Current board: `journal/tasks.md`, milestone LDB, card LDB-08.

Exit: the current reading path agrees on product direction, previous-design snapshots, untested
assumptions and the bounded next build. Review the landed reconciliation, not a blanket approval
of the previous nine-item build bundle. The full curriculum need not be redesigned to exit.

## Phase 5 — First experience

First candidate: Build the Hand, the three-moment ace activity in the current direction §3.
Inspect the existing UI/engine seam and write its scoped implementation plan before coding.
Build and observe this small interaction before deciding whether to expand, revise or replace it.

Then assemble an opening that a beginner wants to use for about ten minutes, with coherent visual
presentation, beginner rules/actions, learning and table play. Test interest, navigation and
understanding separately. An isolated puzzle does not satisfy this exit criterion.

The prototype has no need for a wallet consumer, mastery window or recommender. Implement those
only when the selected experience actually consumes them; their existing correctness, persistence
and scoped QA obligations still apply then. Do not rewrite all nine shipped units first.

## Phase 6 — Core learning product

Expand both blackjack and statistical learning, including explicit expected value, probability
and variance. Reuse existing content and research with explicit learning outcomes and fitting
activities. Add integrated learning rewards, persistent chip-based Free Play and isolated Practice
table behavior. Completion, understanding and playing skill remain separate claims.

The final curriculum graph, unit count, progression tuning and navigation are not locked.
No future task board is opened here.

## Phase 7 — Expansion

Counting and casino-like training remain later. Mobile, accounts, sync and multiplayer remain
need-activated; existing stack admission and server-authority constraints still apply.

## Prior planning

The August blueprint and July graded-decision-practice plan are retained design records with
source-local supersession notices. Their old next-build scope is replaced by this delivery map and
the September direction. Completed milestone evidence remains in the journal and QA ledger.

The complete preceding roadmap is preserved at
`journal/archive/roadmap-before-2026-09-05-realignment.md`, including deferred ideas and old exit criteria.
