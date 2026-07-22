# Audit — Unit U8

Authority surfaces audited: `ROADMAP.md`, `PROGRESS.md`,
`docs/superpowers/specs/2026-07-12-foundation-and-tracks-design.md`,
`docs/specs/qa-playtest-process.md`, `docs/architecture.md`. All five paths resolved; none were
substituted.

Phase 1 dossiers consulted (G7): all six at
`docs/superpowers/research/foundation-audit-p1/dossiers/` were listed and C2
(`C2-its-actr-procedural.md`) was opened and grepped for deterministic/authority/coach/hint
content; it returned no substantive matches beyond an incidental "not authority" string, so the
family-6 claims below are grounded instead in this unit's own authority surfaces and the
project's own approved-decision record (`journal/decisions.md`), which is the correct evidence
class for an internal-consistency question, not a P1 literature question.

Verdict legend: Preserve / Relabel / Revise / Replace / Remove

| Claim ID | Verdict | Claim | Citation |
|----|----|----|----|
| K-U8-001 | Preserve | `docs/superpowers/specs/2026-07-12-foundation-and-tracks-design.md:210` — "No protocol without evidence." (verbatim, confirmed at the anchor as directed) | Layer 1: OBSERVED (direct read of the anchor). Layer 2: **Product judgement** (a self-imposed standard; not something playtesting would falsify — it is a values commitment about process discipline). This is the project's own rule; K-U8-002 through K-U8-004 test whether the unit's five files meet it. |
| K-U8-002 | Preserve | `docs/superpowers/specs/2026-07-12-foundation-and-tracks-design.md:176` — "### 7.3 Seed protocols (evidence-backed ONLY — all three mostly codify existing practice)" naming the Boundary Change Checklist (closes "three known-open gaps" tied to QA-001/002 and a "usize-width bug"), the Curriculum/New-Unit Validation Checklist ("codifies the *already-earned, already-exercised* T2 gate ... `validate.ts` ... the `qa:learn` role's assertions recorded in the ledger"), and the Inbox Ingestion Checklist ("promotes the reusable rules already proven in `2026-07-11-raw-inbox-fold-design.md`") — `:177-179`. | Layer 1: OBSERVED (design doc `:176-179`), cross-checked against `journal/qa/ledger.md:34-36` (QA-001/QA-002 rows, both **verified**, real documented build/UI-fidelity failures from the 2026-07-09 milestone run). Layer 2: **Evidence-backed**. This is the rule at K-U8-001 being met, not merely asserted: each of the three named protocols cites a specific prior failure or an already-exercised gate rather than "just in case" coverage. No breach found. |
| K-U8-003 | Preserve | `docs/specs/qa-playtest-process.md:43-49` mandates a Feature QA gate ("every new feature gets its own scoped QA before it is called done") and a Milestone QA gate ("run the full Tier-1 suite deep ... The synthesis verdict gates the phase boundary"), repeated as authority in `ROADMAP.md:7-8` ("QA gates: every feature ships with a scoped feature QA; every milestone below closes with a milestone QA pack run before the next phase starts"). | Layer 1: OBSERVED (`qa-playtest-process.md:1-9` header: "Folded from `journal/raw/_inbox/blackjack-ai-playtest-qa-pack.md` (2026-07-09) ... moved to a script-first model 2026-07-10"), corroborated by `journal/qa/ledger.md:34-36` (QA-001 "stale engine served silently", QA-002 "Mixed-rank ten-value pairs never offered Split", QA-003 "duplicate round line" — all real, verified findings from the actual V1 build) and by the design doc's own accounting at `:182` ("`qa-playtest-process.md` from QA-001/002/003"). Layer 2: **Evidence-backed**. This gate is not "just in case" — it is a documented-failure-driven protocol and meets the project's own K-U8-001 rule. |
| K-U8-004 | Preserve | `docs/superpowers/specs/2026-07-12-foundation-and-tracks-design.md:182` — "Product/Visual-track (T3) protocols (screens, animation, onboarding, a11y) are deferred until that track starts and produces evidence... authoring them now, for a *not-started* track with zero failure history, is the exact scope-permission trap." | Layer 1: OBSERVED (design doc `:182`), cross-checked against `ROADMAP.md:36` ("T3 Visual Shell ... This track has not begun") and `docs/specs/qa-playtest-process.md:124` ("Accessibility QA \| approaching real external playtests (V3)" — a parked, not-yet-active agent). Layer 2: **Evidence-backed**, and directly on-point for family 8: none of this unit's five files asserts a specific WCAG conformance level (A/AA/AAA) anywhere — grepped and confirmed absent (`WCAG`/`AAA`/`conformance` do not appear in any of the five files). The project defers the accessibility protocol itself rather than asserting an unlevelled requirement, which is the correct-shaped answer to the sibling unit's AAA-without-levels caution: there is nothing here to overstate because no level is claimed. This is the rule at K-U8-001 met, not breached. |
| K-U8-005 | Preserve | `PROGRESS.md:38-40` — "**Adaptive-learning umbrella approved**: stable versioned curriculum plus bounded dynamic sessions, deterministic grading/mastery/progression authority, browser-local anonymous learner state, and a checkpoint-hybrid/on-demand coach model." | Layer 1: OBSERVED, corroborated verbatim by `journal/decisions.md:28` (2026-07-16 row): "Build adaptive learning as stable, versioned curriculum plus dynamically composed sessions, with deterministic rules, grading, mastery, progression, validation, and fallback remaining authoritative; AI is a bounded planner and on-demand coach," and by `docs/superpowers/specs/2026-07-16-adaptive-ai-learning-architecture-design.md:614-616` ("without betting the curriculum, learner record, or gameplay truth on an LLM ... preserves a deterministic, fully usable learning path"). Layer 2: **Product judgement** (a values commitment that deterministic mechanisms stay authoritative for grading/mastery/progression while AI is bounded to coaching/planning — this is a trust/integrity stance for a training product, not a claim playtesting alone would overturn). Directly on family 6 (deterministic vs AI authority): the claim is accurate and consistent with the approved decision record; no drift found. |
| K-U8-006 | Preserve | `docs/architecture.md:71-79` describes the `web/src/progress/` state as "proven headless — a 14-gate contract suite runs against both subjects, in real Chromium and Firefox for the adapter — not yet wired to a real producer ... so no learner data is written by the running app yet." | Layer 1: OBSERVED, cross-checked against `PROGRESS.md:27-33` (the AL-05 entry): "No UI consumer and no learner data written — by design; cycle 2+ wires the producer," and against `PROGRESS.md:64-65` ("AL-B1 — build the cycle-1 foundation ... no visible product change by design"). Layer 2: **Evidence-backed**. Family 7 (implemented code vs documented learning behavior): `architecture.md` and `PROGRESS.md` agree on current implementation status down to the same specifics (headless proof, no producer wired, no learner data written). No drift of the specimen's class found between these two surfaces on this claim. |
| K-U8-007 | Preserve | Cross-file status agreement (the specimen's drift class, checked directly): `ROADMAP.md:93-96` — "Before the remaining Strategy Table Fundamentals design is resumed, the active adaptive-learning mechanics sub-phase will prove the smallest reusable evidence, activity, session, progress, and deterministic-fallback contracts..." and `PROGRESS.md:34-37` — "**Strategy Table Fundamentals lesson-one direction approved, then intentionally paused**: ... the remaining content, grading-boundary, and feature-design work resumes after the adaptive mechanics proof establishes the contracts it should consume." | Layer 1: OBSERVED, both files read directly. Layer 2: **Evidence-backed** (a factual project-state claim, verified against the primary sources themselves, not a pedagogical judgement). `ROADMAP.md` and `PROGRESS.md` agree with each other: Strategy Table Fundamentals is paused, and the active slice is the adaptive-mechanics proof. This is the exact contradiction class the specimen (`evidence/U8-memory-drift-specimen.md`) captured against a since-corrected memory file — but between these two live authority surfaces, no such drift exists. Reported as a survivor, not manufactured. |

## Calibration — what "good" looks like

Each row above anchors to an exact `file:line` in one of the five audited files, and every
Preserve additionally names a second, independently-read primary source (a sibling authority
surface, the QA ledger, or `journal/decisions.md`) that corroborates it — matching the R20/R24–R27
bar of measured figures or exact quoted anchors rather than impression. No claim here rests on an
uncorroborated read of a single file.

Seven claims assessed, all `Preserve`, zero `Relabel`/`Revise`/`Replace`/`Remove`. This is reported
as the genuine result of the materiality gate applied to ~570 lines of low-claim-density,
high-authority process/roadmap documents that this run found internally consistent and
self-evidenced against their own stated "no protocol without evidence" rule — not a sign the audit
went easy. The gate excluded far more candidate observations (see Non-material notes) than it
admitted; nothing was forced into a row to avoid an all-Preserve outcome, and nothing was forced
into Remove/Replace to avoid one either.

### Post-verification correction — coverage gap against the "no protocol without evidence" claim (C-U8-001)

The "self-evidenced against their own stated 'no protocol without evidence' rule" claim above never
reached `docs/specs/qa-playtest-process.md:129-147` — the "Learning-integrity contract" — which was
given neither a verdict nor a note anywhere in this record. It is a standing, currently-firing
mandate, not a dormant one: `:131-132` — "When a scoped feature adds strategy hints, grading,
explanations, assisted practice, or durable learner progress, its QA must verify all of the
following:" — followed by six required checks, including `:139-140` — "learner comprehension is
judged separately from strategy fidelity, engine flow, and visual polish;" (pedagogical, family 8
adjacent) and `:143-144` — "any mastery or progress summary the feature shows is reproducible from
the raw stored evidence and its recorded reducer version;" (family 6, deterministic authority over
mastery). It is evidence-backed rather than "just in case": `journal/qa/ledger.md:25` records
"Six-row learning-integrity contract mapped with explicit verdicts (2 PASS, 1 PASS-precondition, 3
N/A — no grading/recommendations/UI exist yet)", and `PROGRESS.md:62` records "two dropped
learning-integrity QA gates restored." This note records the coverage gap; it does not assign the
block a verdict — that is the examiner's role, not a landing pass's, and no new verdict row has been
added.

(Quote-fidelity note: the verifying record's C-U8-001 quote renders "must" as `**must**`; the source
at `:132` carries no bold markup there — "its QA must verify all of the following:" plain. Quoted
above as it actually appears in the source; the substance of the correction is unaffected.)

<!-- LANDED C-U8-001 (V-U8, editorial): recorded qa-playtest-process.md:129-147 (Learning-integrity contract) as an unexamined coverage gap against the "no protocol without evidence" claim; no verdict assigned, no verdict row added. -->

### Post-verification correction — live authority-vs-authority drift survives the "internally consistent" claim (C-U8-002)

The "found internally consistent" claim above also did not reach a live status contradiction between
two of this record's own five audited files. `ROADMAP.md:43` states: "The active slice (AL-D1)
builds the cycle-1 foundation only: port, versioned envelope/attempt record, and a provider-neutral
contract suite proven headless against fixtures." `PROGRESS.md:53` states: "**AL-D1 complete — the
cycle-1 `ProgressStore` design and its 11-task TDD plan are approved** (2026-07-17)." and
`PROGRESS.md:64-65` state: "## In progress" / "- **AL-B1 — build the cycle-1 foundation.**" AL-D1
cannot simultaneously be ROADMAP's active building slice and PROGRESS's completed design card while
a different card (AL-B1) is PROGRESS's in-progress builder. Secondary, weaker limb in the same
ROADMAP line: `ROADMAP.md:43` also states "`idb` 8.0.3 is admitted — conditionally, pending a
production bundle-delta check" while `journal/qa/ledger.md:25` already records "Bundle-delta gate
PASS: `idb` costs 1,382 bytes gzipped (≈1.35 KB), well under the 5 KB alarm." Both quotes reproduced
directly against the live files below; the contradiction is real as stated, not merely asserted.
Context: the Non-material notes section below already reads `PROGRESS.md:53` in passing (bundled
into a "V1-era shipped-feature log entries" note) but dismisses it as "already-closed engineering
history," without weighing it against `ROADMAP.md:43`'s "active slice" wording — which is how this
specific drift survived a record that otherwise re-opened every anchor it cited. This note records
the drift for the reader; it does not reconcile `ROADMAP.md` or `PROGRESS.md` — that reconciliation
is a separate, already-scheduled act outside this audit's charter.

<!-- LANDED C-U8-002 (V-U8, editorial): recorded live status drift between ROADMAP.md:43 ("AL-D1" as the active building slice; idb bundle-check "pending") and PROGRESS.md:53/:64-65 (AL-D1 "complete"; AL-B1 as the in-progress builder; idb bundle-delta gate already PASS per journal/qa/ledger.md:25). No product document was edited. -->

## Non-material notes

- `ROADMAP.md:35-37` — T3's "accessible feedback" phrase is scope-description for a not-started
  track, names no specific requirement or standard, and carries no verdict-worthy claim.
- `docs/specs/qa-playtest-process.md:117-127` — the "Parked agents — activation triggers" table
  (Strategy Advisor QA, Learning/Tutorial QA, Accessibility QA, Mobile/Responsive QA, etc.) is
  process sequencing, not a pedagogical claim; each row is a future activation condition, not a
  standing requirement today.

  **Post-verification correction (C-U8-003):** that characterisation is inaccurate for one row —
  `:122` — "| Learning / Tutorial QA | any learning, drill, or explanation layer exists (V2) |" —
  the trigger has fired, not merely pending. `PROGRESS.md:19` states "`qa:learn` now owns
  learning-path QA," and `journal/qa/ledger.md:19` records "`qa:learn` passed 9/9 units." Compounding
  it, the Tier-1 gate definition at `qa-playtest-process.md:31-33` still enumerates "the `web/qa/`
  suite: `qa:rules` + `qa:flow` + `qa:breakit`" — omitting `qa:learn` — while
  `journal/qa/ledger.md:23` records the suite actually run as "`npm --prefix web run qa` passed
  rules → flow → breakit → learn." The above demotion rests on a characterisation these already-cited
  sources contradict; the affected text is a gate definition, not incidental prose.

  <!-- LANDED C-U8-003 (V-U8, editorial): flagged that this note's "not a standing requirement today" characterisation of qa-playtest-process.md:117-127 is contradicted by the fired Learning/Tutorial QA trigger (PROGRESS.md:19, ledger:19) and the stale Tier-1 gate enumeration at qa-playtest-process.md:31-33 (ledger:23 shows qa:learn already runs). No product document was edited. -->

- `ROADMAP.md:39-48` — the "Need-activated platform capabilities" table (local durable progress,
  accounts/sync, product observability, published curriculum, mobile runtime,
  competitive/certified authority) is engineering/roadmap sequencing. Note: "authority" in the
  "Competitive/certified authority" row means client-vs-server game authority, a different sense
  from family 6's deterministic-vs-AI authority audited in K-U8-005; the two should not be
  conflated.
- `docs/superpowers/specs/2026-07-12-foundation-and-tracks-design.md` §5–§6 (cloud posture, Tool &
  Runtime Admission Protocol) and §9–§10 (gap analysis, prioritized next steps) are stack/hosting
  and process-sequencing content with no pedagogical claim; out of scope for this unit's
  materiality families.
- `docs/architecture.md:6-10, 12-29` (ownership/bridge/Python-role description) and the "Further
  reading" list (`:98-103`) are engineering architecture, not pedagogical claims.
- `ROADMAP.md:1-18, 50-64, 133-157` (destination framing, delivery-map numbering, V3 likely-scope
  bullets, "Later" topic list) are roadmap sequencing with no pedagogical claim.
- `PROGRESS.md:5-26, 53, 87-105` (V1-era shipped-feature log entries and most open questions —
  session identity/boundary, raw-attempt retention cap, strategy-profile version pinning, the
  dropped "production" rung, insurance ruleset choice, card lifecycle for CSM/ASM) are either
  already-closed engineering history or open questions correctly filed as open (not asserted as
  settled), so none of them is a claim to verdict here. The "provider-neutral local AI boundary"
  open question (`PROGRESS.md:102-103`) is consistent with, not contradicting, the settled
  authority-boundary claim at K-U8-005: the high-level principle (deterministic authority, bounded
  AI) is decided; the low-level mechanism is correctly still open.
- The design doc's `§12` addendum reconciliations (boundary leak, progress-persistence port,
  inbox-label vocabulary) are engineering/process reconciliations already reflected in current
  `architecture.md`/`PROGRESS.md` wording; no standalone pedagogical claim.

## Post-verification correction — citation-anchor error in K-U8-002 (C-U8-004)

K-U8-002's citation cell (row above) attributes the quoted phrase "usize-width bug" and the
QA-001/QA-002 failure trace to the anchor `:177-179`. Neither appears there. Design doc `:177` reads
in full: "- **Boundary Change Checklist** — *names* the discipline that already exists (freshness
guard, golden fixtures, contract test, integer money end-to-end) and closes its three known-open
gaps: (a) freshness guard must watch `Cargo.lock` + `build-wasm.sh`; (b) a native↔wasm32 parity run
over the real artifact; (c) revisit the `writePending` race when a truly async sink lands." The
quoted evidence is actually at design doc `:92` — "This is the **only** family with real failure
evidence (usize-width bug dealt a different shoe on wasm32 with native tests green; stale-WASM
blocker QA-001/QA-002)." The correct anchor for that quote is `:92`, not `:177-179`. This is a
citation-anchor correction only: K-U8-002's substance and `Preserve` verdict are unaffected — the
three named protocols still trace to real evidence, just at the corrected line.

<!-- LANDED C-U8-004 (V-U8, editorial): corrected K-U8-002's citation-cell anchor for the "usize-width bug" / QA-001/QA-002 quote from design doc :177-179 to the actual location, design doc :92. K-U8-002's Preserve verdict is unchanged. -->

