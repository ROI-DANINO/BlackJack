# Foundation & Tracks — Design Draft

> Project-owned. Non-authoritative until approved via the normal Design→Plan loop. Mines the `_inbox` workstreams note as **evidence only** — its directives were not obeyed and its §5 40-protocol catalogue is not adopted. Every proposal below names a concrete near-term consumer or a measured retrofit cost; anything that could not is deferred or rejected.
>
> **Status (2026-07-12):** the framing and the cloud posture (§5) are **approved by Roi**. Folded from `journal/raw/_inbox/project-workstreams-protocols-and-inbox-ingestion.md` (disposition **partially-accepted**; provenance in `docs/imports/2026-07-12-operating-model-research/INDEX.md`). This is now the owned reference for the two routable deliverables — **(A)** a posture & decisions memo and **(B)** a protocol-system + inbox-ingestion design — each to go through Design→Plan on its own.

## 0. Headline finding (read this first)

This codebase is **already well-founded**. Across ~34 candidate foundations put through adversarial review, the dominant verdict was *defer* or *reject* — not because the ideas are wrong, but because the expensive-to-retrofit seams **already exist and are already protected**: a pure stateless `dispatch_json` reducer, fully serializable state, a golden-fixture + compile-time contract test guarding the wire, an async-swappable `LogSink`, an identity-free `SessionState`, and stable serializable curriculum ids.

Therefore the operative risk here is **over-foundation, not under-foundation** — exactly Roi's stated #1 fear. The right move now is small: **decide postures, protect properties that already hold, and route a handful of cheap, evidenced hardening items to the next boundary-touching slice.** Almost nothing needs to be *built* as new foundation.

**This document deliberately decomposes into two separately-routable deliverables** — do **not** run one mega-"Foundation" doc through the Design→Plan loop (that shape *is* the scope-permission trap it warns against):
- **(A) A posture & decisions memo** — the actual *set-now*: cloud posture (§5), the stack Admission Protocol (§6), the two architecture principles, and the four next steps (§10 items 1–4). Short, doc-only, decision-oriented.
- **(B) A protocol-system + inbox-ingestion design** — §7–§8, a different concern with a different owner and risk profile, which the raw note itself treated as a separate gap.

The remaining sections (§1–§4, §9, §11) are the shared analysis both deliverables draw on.

---

## 1. Vision restatement — three continuing tracks, independent maturity

The product is **not** V1/V2/V3. It is three **layers that continue forever**, each maturing at its own rate:

- **T1 CORE** — blackjack domain truth, simulation, deterministic state, shoe/card lifecycle, legal actions, settlement, strategy truth. **Most mature today.**
- **T2 LEARNING** — two distinct sub-concerns that must not be conflated: **(2a) learning architecture** (subjects/units/steps/skills/attempts as *data*, not code) and **(2b) pedagogy** (how a learner experiences explain→observe→try→apply→retry→assess). **In progress — current phase.**
- **T3 VISUAL SHELL** — Reddit/Duolingo-grade UI and how the user actually *uses* it. **Not started.** Visual polish may defer; **presentation-readiness of the lower layers may not** — they must already expose enough semantic state for the shell to be built without rewrites.

The governing tension: *"the bigger it grows, the worse it gets."* We set seams that are expensive to retrofit, and **only** those. "Foundation" is never a license for speculative abstraction with no consumer.

---

## 2. The three tracks — scope and current maturity

| Track | Owns | Maturity | The one thing to protect |
|---|---|---|---|
| **T1 Core** (Rust) | Card/deck identity, seeded ordered shoe + single shuffle + penetration, rulesets + validation, legal actions, full round flow, exact-money settlement, round logs, ruleset-matched Basic Strategy oracle. 62 tests green, clippy clean. | **High.** No blackjack rule lives in the UI. | Cross-target determinism (native↔wasm32) and exact-money integrity — the **only** family with real failure evidence. |
| **T2a Learning architecture** (TS) | `Subject→Unit→LessonStep[]` as pure serializable data; engine-delegated grading; a validator that gates content-as-data. Adding a *unit* is already a data edit. | **Medium.** Adding a *subject* is **not** yet data-driven (Learn.tsx hardcodes the one subject). | Content stays data; correctness stays engine-authoritative (never re-derived in TS). |
| **T2b Pedagogy** (TS) | Lesson rhythm, decision-verdict *vs* hand-outcome separation (built + tested), feedback, assistance ladder, completion. | **Low–Medium.** The correct-decision-can-still-lose invariant is the strongest asset and is already enforced. | Verdict must never be derived from win/loss. |
| **T3 Visual Shell** | Panels, focus, animation, navigation, skill-tree, feedback layout. | **Not started.** Curriculum ids (`Skill.id`/`Unit.id`) + `AttemptRecord` shape (the expensive part) already exist and are serializable. | Components render view-models; they never compute totals/legality/strategy. |

---

## 3. The contracts between tracks

### 3.1 Core → Learning (the LIVE seam)
- **The interface already exists and is minimal:** one stateless `dispatch_json(&str)->String`, reached through the TS adapter layer chiefly via `engine.ts`; `situations.ts` now carries serializable preset data and does not parse raw JSON. The live boundary has eight commands, four response variants, a `{status: ok|error}` envelope, and two-tier errors (`CoreRuleError` recoverable vs `BridgeError` fatal). Neither layer re-derives domain truth; they carry engine facts across.
- **The rule to make explicit (not a new mechanism):** *Learning consumes engine facts — legality, totals, softness, bust, outcome, ruleset match — and never re-derives or re-decides them.* This is already true for grading (`hand_*` kinds call `describeHand`).
- **Where re-derivation must STOP — cite QA-017:** display hand totals are computed in TypeScript by `app/totals.ts` because engine `best_total` is reachable only via a separate `describe_hand` round-trip and is **not** attached to live `HandState`. That single implementation is consumed in two places — `learn/feedback.ts` *imports* `handTotal` from `app/totals`, it does not re-derive it — so this is **one** duplication of domain truth across the seam, not two. `totals.ts` self-declares *"the engine is right and this file is the bug."* **The seam to consume it already exists** (`describe_hand → HandFacts`); closing QA-017 is wiring + deletion, not new architecture.
- **Anti-drift is earned and real:** Rust-emitted golden fixtures + a compile-time-typed `contract.test.ts` catch renames; value-level fixtures catch semantic drift (the class that produced the money-truncation and RNG-width bugs). **Standing convention:** every new `CoreCommand`/`CoreResponse` variant ships *with* a golden fixture and a contract-test row. `CheckStrategyCompatibility` now follows that convention; future variants must do the same inside their own feature plans, not as separate foundation work.

### 3.2 Learning → Product/Shell (the RESERVED seam)

Roi's framing forbids hand-waving here: presentation-readiness of the lower layers **may not** defer. So this is a **semantic-surface audit**, not an assertion — it enumerates exactly what a Duolingo/Reddit-grade shell consumes and marks each present/absent against today's code:

| Shell needs to render… | Present in the data today? | Where / gap |
|---|---|---|
| Current objective (prompt/task) | **Yes** | `LessonStep` data |
| Correctness state of an attempt | **Yes** | grading result (engine-authoritative) |
| Progress toward a unit | **Yes** | stable `Skill.id`/`Unit.id`, `outcomes`, `requiredChecks` |
| Completion evidence | **Yes** | flat serializable `AttemptRecord` |
| Recoverable vs fatal error | **Yes** | two-tier `CoreRuleError` / `BridgeError` |
| Assistance-used state | **Partial** | assistance ladder exists; not surfaced as a first-class field |
| **Feedback-intent** (decision-verdict / outcome-verdict / reason, *separately*) | **Distinct in the data, but lost at the crossing** | collapsed to one `join('\n')` string at the boundary |
| **Lesson phase** (explain/try/feedback/…) | **Derivable, not explicit** | scattered booleans, no `phase` enum |

**The decision (not a deferral).** The bottom two rows are the only gaps, and the audit shows *why they are not readiness-blocking*: the underlying distinctions **already exist below the projection** — the decision-verdict and outcome-verdict are genuinely separate in the data before the join, and the phase transitions are real events the booleans already encode. Both lossy projections are therefore **additive TS-layer reshapes** (stop pre-joining → expose a small `FeedbackView`; collapse the booleans → a `LessonState.phase` enum) with **no Core rewrite implied**. That is what makes readiness genuinely hold: the semantic state is present; only its *projection* is currently flattened, and un-flattening is additive.

The one real readiness *guard* that follows: the two verdicts must stay **distinct in the data model** (not merely in the projection). If a future change ever collapsed them upstream, *that* would be a true readiness break — which is exactly why the already-built "verdict ≠ win/loss" invariant (§4 REJECTED) is load-bearing and must not be relaxed. Schedule the two reshapes at their first real consumer (the strategy-grading slice or T3 start), not "by default" — and record now that the pre-join is a lossy step to **undo**, not a model to rebuild.

Beyond these two, the concrete shell hooks already reserved: stable curriculum ids, the flat `AttemptRecord`, and (see §11 Q6) an addressable strategy chart if the next design exposes it as row/column data.

---

## 4. Foundations table

**Keep-now is a high bar:** concrete near-term consumer **AND** high retrofit cost **AND** not already handled. Under that bar, honestly, the "reserve an expensive seam" column is nearly empty — the seams already exist. What remains are (a) two doc/posture decisions Roi asked for, (b) work that *ships inside the already-approved next plan*, and (c) cheap evidenced hardening in the one pain family.

### SET-NOW (act in the current/next slice)

| Item | Track | Concrete consumer | Retrofit cost if skipped | Why now (not speculative) |
|---|---|---|---|---|
| **Reframe stack-boundaries.md into a Tool & Runtime Admission Protocol** (protocol-first; roster = "current answers," not law) | Stack | Roi's explicit stated need to drop the perceived 3-language lock — the requested capability itself is the consumer. **No committed cross-language tool is pending**: the approved strategy design assigns S17 verification to the *rules-researcher agent against a cited source*, not a Python generator, so this rests on the stated ask alone, not a speculative admission. | Low in code, but the *product need* (agility without anarchy) is unmet today | Doc-only, directly delivers a requested capability. See §6. |
| **Name the Core→Learning contract + apply "new wire message ⇒ fixture + row" to `CheckStrategyCompatibility`** | Protocol/Cross | The `CheckStrategyCompatibility` command + S17 ruleset in the **next approved plan** | The new verdict boundary ships unguarded; silent Rust↔TS drift returns | Convention already exists and is proven; this is a checklist line **in that plan**, not a new artifact. |
| **`Unit.profileId?: 'h17'\|'s17'` + validate rule** | Cross | The already-approved Strategy Profile Foundation plan | None if it ships with that plan; listed so T2a *owns* the learning half of the wire | Additive, approved, imminent. Ships **inside** the plan. |

### RESERVE-SEAM-ONLY (posture decisions — the seam already exists; we protect it, build nothing)

| Item | Track | What we reserve | Cost of losing the property |
|---|---|---|---|
| **State-authority posture:** client-authoritative now; keep the pure-reducer + serializable-state + transport-neutral `dispatch_json` property | Cross/Cloud | A short paragraph in `architecture.md` + a principle that no command may hold hidden/ambient session state | If a future command adds ambient state or a rule leaks into TS, the client→server authority move becomes a rewrite instead of a hosting swap. Property holds today; keeping it costs ~0. |
| **Cross-target determinism parity** (the one genuine *technical* guard worth scheduling) | Core | Run the existing golden vectors through the **real built wasm32 artifact** and assert byte-identity with native; extend the freshness guard to `Cargo.lock` + `build-wasm.sh` | This is the **only** family with real failure evidence (usize-width bug dealt a different shoe on wasm32 with native tests green; stale-WASM blocker QA-001/002). Cheap; closes known-open holes. |

> Note: this parity/freshness item is the one genuinely-earned *technical* entry in the table — small in size, real in evidence. Treat it as **scheduled hardening, not a standing seam**: it rides the next boundary-touching slice (the S17 `CoreCommand`), where the boundary is already open.

### DEFERRED (right call — named trigger, do nothing now)

| Item | Why deferred | Trigger that revives it |
|---|---|---|
| **Identity attaches at records, never inside `SessionState`** (record-shape principle) | *Demoted here from reserve:* there is **no identity anywhere in the app** and none this phase (no near-term consumer), and the retrofit is self-described as compiler-caught/cheap — it fails the keep-now bar on both counts. Keeping identity out of the reducer is a near-free byproduct, not a scheduled seam. | Whenever identity is first introduced — enforce it *then*, as a one-line rule (owner/tenant id on outer versioned records only). The *real* gate is the next row. |
| **Decide the stable identity KEY before the first durable `AttemptRecord` write** (the guard that actually matters) | This is the migration-avoiding gate, and it depends on an unanswered fork (open-question 3) — so it cannot be resolved now, only *wired* so persistence never outruns it. | Fires **with** persistence below; must be answered **before** the first durable write. |
| **Close QA-017 (best_total on the wire, retire `totals.ts`)** | Seam already exists; low retrofit; display-only, currently matches the engine | Fold in when Strategy Table Fundamentals adds total/soft/pair-reading call sites (do it opportunistically, not as foundation) |
| **Subject registry** | Retrofit is a few lines against an already-plural `Subject` contract | Ships **with** the second subject (Strategy Table Fundamentals) |
| **`strategy_action` grading command** | Grading deliberately kept off the wire until the first lesson defines the smallest API; seam (`AnswerRule→resolveAnswer→engine.ts`) already proven | First real Strategy Table Fundamentals lesson |
| **Structured decision-verdict + layered FeedbackView** | No near-term consumer; grading is out of scope of the live slice; blast radius is small and TS-only. *Distinct from the REJECTED invariant entry below:* the invariant already exists — this is only the additive **data reshape** (`boolean→verdict`, `string→FeedbackView`) that lifts §3.2's already-separate distinctions into the projection. | The strategy-grading cycle — record the measured surface as a breadcrumb in that design |
| **`LessonState.phase` enum; pedagogical `role` field; misconception/hint content** | Additive, cheap, no started consumer (the §3.2 phase-projection reshape) | T3 shell start / first strategy lesson defining a misconception |
| **Learning-progress persistence (reuse `LogSink` pattern)** | In-memory today; nothing to migrate; principle re-derivable for free from existing code | First "completion survives reload" feature — **but gated on the stable identity key being decided first (open-question 3). Do not write durable `AttemptRecord`s before that key is chosen, or you create the exact migration this doc exists to avoid.** |
| **Redacted client projection; async transport; schema-versioned exports** | Redaction has no consumer (single-user *benefits* from full-shoe replay); `CoreTransport` interface already isolates async; exports **already** carry `schema_version` | A graded/competitive server-authoritative mode / an actual server |
| **Exact rational (num/den) payout** | Only 3:2 ships; integer path already correct for it | First non-3:2 ruleset (e.g. 6:5) — checklist trigger recorded |

### REJECTED (deliberately NOT doing — with reason)

- **A runtime registry / count-budget / sprawl dashboard** — 3 runtimes, Python is one file, no DB. Zero sprawl to police; the per-tool justification *is* the control.
- **A universal lesson/exercise plugin framework** — a recorded non-goal; the closed union + local switches is correct YAGNI.
- **An i18n/RTL system** — no second-language consumer; ids are already separated from copy, so it is purely additive later.
- **A grand new "boundary/determinism/money protocol" document** — 3 of its 4 checks already exist as live mechanisms; the real gaps are 3 backlog one-liners, not a protocol.
- **A standing "decision-verdict orthogonal to outcome" foundation entry** — the invariant is already built, tested, and rule-stated; belongs in the future grading slice's acceptance test. *This rejects re-listing the already-built **invariant** as new foundation; it does not touch the DEFERRED **data reshape** above — the invariant exists now, the `FeedbackView`/verdict reshape is genuinely future work. Both are consistent: keep the invariant, defer the projection.*
- **Re-recording already-true posture as new seams** (pure-reducer note as novel work, `roundlog-schema-version`) — already handled.

---

## 5. Cloud posture (posture, not architecture)

> **DECISION (Roi, 2026-07-12).** Target = a **hosted, multi-user web app for individual learners (B2C)**, in the future. "Cloud" here means **auth (accounts / login) + progress persistence + cross-device sync** over a **client-authoritative** trainer — the game keeps running in the browser (WASM); a future rented server does **accounts + storage + hosting, not the game.** Hosting a client-side app later is essentially a static deploy plus a thin backend. **Server game-authority (anti-cheat / competitive leaderboards / certification) is deferred but reserved *for free*** by the deterministic pure-reducer engine (a server can replay+verify any session) — **trigger to revive: leaderboards or certified mastery.** **Pulled UP to reserve-now:** (1) decide the **stable identity/account key** before the first durable `AttemptRecord` write; (2) the **`ProgressStore` port** (mirroring `LogSink`, in-memory impl only); (3) **`schema_version`** on progress records — (2)+(3) also fix *"progress lost on reload"* today. **Not reserved (no B2C consumer):** server engine host, shoe-redaction, replay determinism-parity, and any org/tenant/`orgId` field.

**Recommended posture: stay client-side WASM, single-user, in-memory now. Treat the move to multi-user cloud as a later HOSTING decision, not an engine rewrite — because the engine is already a pure reducer the client fully owns.** Server authority later = run the identical compiled Rust behind an HTTP handler that *owns* `SessionState` instead of returning it.

**Seams to reserve NOW (all cheap, most already hold):**
1. **Protect the pure-reducer property** — no ambient/session-scoped mutable state in any command. (Structurally true today; guard it with a principle.)
2. **Decide the stable identity KEY before the first durable `AttemptRecord` write** (open-question 3) — this is the gate that actually prevents a migration. Keeping owner/tenant id on outer versioned records rather than inside `SessionState` is the near-free byproduct; the *key decision* is the part with teeth, so persistence never ships ahead of it (see §4 DEFERRED).
3. **Schedule cross-target determinism parity** — the one real technical guard; server-validate/replay postures are impossible without it, and it protects the *current* single-user build too.

**Explicitly NOT now (deferred with named triggers):** auth, accounts, tenancy, redacted client projection (single-user replay benefits from the full shoe), async transport coloring, a durable progress store. Each has a clear future trigger and a *low, additive* retrofit cost because the underlying state is already serializable and centralized.

**The real fork Roi must eventually call (see §11):** server **authority** (anti-cheat, authoritative money/leaderboards) vs server **persistence + sync** of a client-authoritative trainer. A stakes-free trainer may never need authority — which would make redaction and parity permanently deferrable and collapse "cloud" to *auth-at-the-edge + the existing `LogSink` pattern*.

---

## 6. Stack decision-protocol (replacing the 3-language "lock")

The lock is largely a **framing artifact**: `stack-boundaries.md` leads with a fixed Rust/TS/Python roster and buries a general Decision Rule that *already admits any tool via written justification.* Reframe, don't rebuild:

> **Tool & Runtime Admission Protocol.** Any tool, runtime, database, or service may be admitted when a written justification passes the gate:
> 1. the **task** it serves;
> 2. **alternatives** considered;
> 3. why the **simpler current path** no longer holds;
> 4. **how data crosses the boundary** — plain serializable state, no native/shared-memory coupling;
> 5. for any **compiled/transpiled/generated artifact** — a build-freshness guard;
> 6. for any **cross-target runtime** — determinism-parity evidence;
> 7. a one-line **exit criterion** (what would retire it).
>
> Default is **NO** new tool. The current Rust/TS/Python roster is *the answers this protocol has produced so far*, not the law; the 2026-07-07 decision is revisable under it.

Items 4–6 are the anti-regression teeth, each traceable to a real blocker (wasm32 RNG divergence; 3:2 money truncation; QA-001 stale WASM). **Single-source the gate** here; AGENTS.md's research-trigger points to it. This is a doc edit — zero code — and it is exactly the *agility without anarchy* Roi asked for. **We do not build a sprawl registry.**

---

## 7. Protocol SYSTEM

### 7.1 What a protocol IS here
A **named, reusable pre-commit gate for a recurring change-CLASS that has burned us or is expensively irreversible.** It is *not* the execution loop (the closed framework owns orient→plan→implement→verify→review). A protocol carries exactly four fields:

- **Trigger** — how you know the class applies (scope by change surface, via `git diff` since last-passed commit — reusing the QA scoping model).
- **Required checks / evidence.**
- **Gate** — what blocks, and where.
- **Attachment point** — which loop step it plugs into (Design / Review / Feature-QA).

### 7.2 Routing model (track × change-class × risk) — tiny by design
> Does the change cross an **authoritative→delivered boundary** (Rust↔WASM, native↔wasm32, core↔wire, sync↔async) **or** touch a **money/determinism** invariant? → **Boundary checklist.**
> Does it add or modify a **Unit / curriculum content-as-data**? → **Curriculum Validation checklist.**
> Is it folding `journal/raw/_inbox` material? → **Ingestion checklist.**
> Otherwise → **normal loop + code review, no protocol.**

Default is no protocol. This is the whole classifier — not the raw note's 8-question version.

### 7.3 Seed protocols (evidence-backed ONLY — all three mostly codify existing practice)
- **Boundary Change Checklist** — *names* the discipline that already exists (freshness guard, golden fixtures, contract test, integer money end-to-end) and closes its three known-open gaps: (a) freshness guard must watch `Cargo.lock` + `build-wasm.sh`; (b) a native↔wasm32 parity run over the real artifact; (c) revisit the `writePending` race when a truly async sink lands. Attaches at Review + Feature-QA. This is codification, not invention — the honest, minimal version of the rejected "grand protocol."
- **Curriculum / New-Unit Validation Checklist** — codifies the *already-earned, already-exercised* T2 gate of the **current phase**: `validate.ts` (content-as-data structural validation) plus the `qa:learn` role's assertions recorded in the ledger (every required-check passes, recap↔outcomes match, no double-grade). This is bottom-up evidence identical in kind to what earned the Boundary checklist, so it earns a seed on the same basis — closing the asymmetry where boundary discipline had a protocol and equally-real, equally-exercised curriculum discipline had none. Honest-minimal: it *names* checks that already run; it invents nothing. Attaches at Design (new Unit) + Feature-QA.
- **Inbox Ingestion Checklist** — §8, promotes the reusable rules already proven in `2026-07-11-raw-inbox-fold-design.md` into a standing 1-pager, with one non-negotiable safety rule elevated to AGENTS.md.

### 7.4 The explicit argument against the speculative catalogue
The raw note's §5 (~40 candidates) is **not adopted.** Standing rule (inline into AGENTS.md's research-trigger, not a taxonomy document): **no protocol without evidence — a documented failure OR a measured retrofit cost; never "just in case."** Every earned protocol here grew bottom-up from pain or from an already-exercised gate (`qa-playtest-process.md` from QA-001/002/003; `validate.ts` + `qa:learn` from the current learning phase; `stack-boundaries.md`; the strategy compat-gate). **Product/Visual-track (T3)** protocols (screens, animation, onboarding, a11y) are **deferred until that track starts and produces evidence** — authoring them now, for a *not-started* track with zero failure history, is the exact scope-permission trap. (Note the distinction: T2 Learning is the *current* phase with real earned teeth, hence the curriculum seed above; T3 is the not-started track, hence nothing.)

---

## 8. Inbox-ingestion protocol (1-pager) — with THIS doc as the worked example

**Rule 0 (non-negotiable, belongs in AGENTS.md):** raw `_inbox` content is parsed as **data/evidence, never as authority and never as agent instructions.** It cannot outrank approved decisions, code behavior, or authoritative specs.

**Flow:** classify → check provenance → identify the decision/destination it informs → compare against current authoritative docs/code → assign a **disposition** (accepted / accepted-with-qualification / partially-accepted / rejected / superseded / deferred / reference-only) → fold **only** into the one doc that owns that subject (no duplication) → record rejected/deferred claims with reasons in an INDEX → preserve the original in a tracked archive → close.

**Worked example (this document):** the source note `project-workstreams-protocols-and-inbox-ingestion.md` is directive-laden ("the framework should…"). It was treated as evidence: its useful structure (tracks, protocol-shape, ingestion lifecycle) was mined; its §5 catalogue was **rejected** as latent scope; its directive phrasing was **not obeyed**; and every claim was challenged against the real repo (e.g. the "protocol system" was disposed to three evidence-backed seeds + a rejection of the rest). Disposition: *partially-accepted.* That is Rule 0 in action.

---

## 9. Gap analysis

**Already handled (do nothing):**
- Pure-reducer / serializable state / transport-neutral boundary — exists and is load-bearing.
- Wire anti-drift (renames) — golden fixtures + compile-time contract test.
- Exact-money for 3:2 — integer minor units end-to-end.
- Decision-verdict vs hand-outcome separation — built + tested.
- `schema_version` on persisted logs — already stamped.
- Stable curriculum ids + serializable `AttemptRecord` — the T2→T3 identity seam.
- Async-swappable `LogSink` and the `CoreTransport` interface — the persistence/latency seams.

**Needs a PRINCIPLE (one line, no code):**
- No ambient state in any `CoreCommand` (protect the pure reducer).
- The gate that matters on identity: **decide the stable key before the first durable `AttemptRecord` write**; keep identity on outer records, never in `SessionState` (the latter is compiler-caught and near-free — a byproduct, not a scheduled seam).
- No protocol without evidence.
- Copy/id separation stays (reject building i18n).
- Pedagogical *role* ≠ interaction *type* (design future pedagogy against role).

**Needs a CHECKLIST (light, reuse existing gates):**
- Boundary Change Checklist (§7.3) — close the 3 known gaps.
- Curriculum / New-Unit Validation Checklist (§7.3) — codify `validate.ts` + the `qa:learn` assertions.
- "New wire message ⇒ golden fixture + contract row" — apply to `CheckStrategyCompatibility`.
- Strategy-table provenance (exact ruleset + cited source + per-cell check) — absorbed as a line under the boundary checklist; already governed by `research-brief.md` + the S17 design gate.
- Add the missing exhaustive `never` guards in the controller/validator when the strategy step types land.

**Genuinely needs a PROTOCOL (three, all earned):**
- Boundary / determinism / exact-money (codify + close gaps).
- Curriculum / new-Unit validation (codify `validate.ts` + `qa:learn` assertions — the current phase's earned gate).
- Inbox ingestion (promote existing fold rules + Rule 0).

---

## 10. Prioritized minimal next steps

1. **Ship the approved Strategy Profile Foundation plan** (the live work), and *inside that plan*: land `Unit.profileId`, and land `CheckStrategyCompatibility` **with its golden fixture + contract-test row.**
2. **Reframe `stack-boundaries.md`** into the Admission Protocol (doc-only; delivers Roi's agility ask). Point AGENTS.md's research-trigger at it.
3. **Write the posture principles** into `architecture.md`: client-authoritative cloud posture + pure-reducer rule + the identity-key gate (decide the stable key before any durable `AttemptRecord` write). A few sentences.
4. **Schedule the cheap pain-family hardening with the S17 boundary slice:** extend the freshness guard to `Cargo.lock` + `build-wasm.sh`, and add a native↔wasm32 parity run over the real artifact.
5. **Codify the three seed checklists** (boundary, curriculum, ingestion) as short 1-pagers; add Rule 0 + the "no protocol without evidence" line to AGENTS.md.
6. **Close QA-017 opportunistically** when Strategy Table Fundamentals first renders totals — not before.

Everything else in §4's DEFERRED/REJECTED columns stays untouched, by design. (Steps 2–5 are deliverable (A)/(B) from §0; step 1 is the live plan already approved.)

---

## 11. Open questions for Roi (the real forks needing your call)

1. **Cloud authority fork — RESOLVED (2026-07-12):** **persistence + sync** of a client-authoritative trainer (accounts + saved/synced progress; hosting is a future devops task). **Server game-authority deferred but reserved for free**, trigger = competitive leaderboards or certification. Cross-target parity and shoe-redaction stay deferred until that trigger fires.
2. **If authority eventually moves server-side:** server-computes-everything (fixes shoe leak, drops client determinism dependency) vs server-validates-client-replays (keeps client compute, hard-depends on native↔wasm parity)? Different primary seams.
3. **Identity anchor.** What is the stable key for learner progress once it persists, and must it exist before the first durable `AttemptRecord` is written (to avoid a migration)? *This is the gate the §4/§5 persistence deferral is wired to — persistence cannot ship ahead of your answer.*
4. **Multi-user shape — RESOLVED (2026-07-12):** B2C individuals, **flat per-user isolation**. No tenant/org dimension reserved (adding it later is a bounded change if B2B ever appears).
5. **Decision-verdict reshape timing.** Land the `boolean→verdict` + `string→FeedbackView` reshape as a standalone content-free refactor *before* the strategy lesson, or *inside* that slice? (Repo posture — grading stays off the wire until the lesson defines it — argues for inside.)
6. **Strategy chart as data.** Should the next design expose the hard/soft/pairs table as **row/column-addressable** data shared by both the grader and the future chart-open UI, or ship a scalar-only grader? Deciding now is free; splitting later is not.

---

## 12. Addendum — reconciliations from the three recovered lenses

The main synthesis above was built from 9 lenses; the **boundary-learning-product**, **cloud-crosscut**, and **inbox-ingestion** lenses errored in the run (structured-output field-drop) and were recovered / re-run separately. They **overwhelmingly confirm** the draft. Three points sharpen or diverge from it — recorded here for traceability rather than silently merged.

### 12.1 Boundary (Learning→Product): a real seam leak the audit missed — ADD a principle
The dedicated boundary lens found an actual boundary violation §3.2's semantic-surface audit did not flag: for `hand` steps the shell **dereferences the raw Core-owned `SessionState`** through a `session` field exposed on `LessonState` (`Lesson.tsx:67-84` reads `round.status` / `dealer.cards` / `hands` / `active_hand_index` and computes the hole-card `hideFrom` itself). So the shell **already inspects engine internals the boundary is meant to hide** — hand-render is coupled to Core `RoundState`/`HandState` shape, which has churned (the money + RNG bug family).
- **New principle (principle-only, ~0 cost, SET-NOW):** *Ratify `LessonState` as the sole Learning→Product surface — the shell reads only its semantics and never dereferences the raw `session` field to render.* Anything the shell needs about a hand becomes a Learning-owned field on `LessonState`.
- Added fork: keep `session` on `LessonState` as a documented, review-gated exception until the first shell consumer forces a hand-render projection, **or** remove it now (no V3 consumer yet → removing eagerly would itself be over-foundation). Recommend: keep + document the exception.

### 12.2 Cloud: progress-persistence PORT — draft says *defer*, cloud lens says *reserve the seam*
Two independent analyses diverged on exactly one item:
- The **draft** DEFERS learning-progress persistence ("in-memory today, nothing to migrate, port re-derivable for free, gated on the identity key").
- The **cloud lens** argues the `LessonController` currently *assumes transience* — it recomputes completion from in-memory `attempts` (`controller.ts:341`) — so adding durability later is a **controller rewrite, not a drop-in**, and recommends **defining a `ProgressStore` port now** (mirroring the async `LogSink`), shipping only the in-memory implementation.
- **Reconciliation:** both agree the *data* (`AttemptRecord`) is already serializable and that no durable write may occur before the identity key is decided (Q3). The only delta is whether to **define the port interface now**. That's cheap and prevents the controller rewrite — a mild strengthening: **define the `ProgressStore` port (seam) now, in-memory impl only; no durable writes until Q3 is answered.** Framing worth keeping: *"progress doesn't survive a page reload"* is a **local** gap that bites well before cloud does.

### 12.3 Inbox: use the project's PROVEN 5-label vocabulary, not a new 7-label set
§8 listed a 7-label disposition set drawn from the raw note. The dedicated inbox lens found the project **already uses exactly five combinable labels** in practice — **Accepted · Covered · Deferred · Rejected · Archived** — handling *partial acceptance by combining them* ("Accepted + Deferred"), with provenance via a tracked `docs/imports/<batch>/INDEX.md` row per source (needed because `journal/raw/` is gitignored).
- **Reconciliation:** replace §8's disposition list with the **proven 5 combinable labels** (more YAGNI-true, grounded in real precedent). Keep **Rule 0** (injection guard). Add the **INDEX-as-close-record** convention, and a lightweight **"processed, retained"** marker for owner-retained local-only items. The worked example, `history-data-analysis-2026-07-09.md`, was later moved into its tracked archive on 2026-07-15.
