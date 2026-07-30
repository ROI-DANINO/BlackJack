# Phase 2 Verdict Catalog — what the project's own claims are entitled to assert

Source archive: `docs/superpowers/research/foundation-audit-p2/`. This page is a navigation
index over it, not a replacement for it. Open the cited record before relying on a row.

**The structural fact that governed everything below, and what changed since.** Phase 2 itself
modified **zero product documents** (`P2-gate-summary.md:288`, verified against `04ad04c`): its 26
corrections landed in the *audit records*, not in the specs. That is a fact about Phase 2 and it
stands.

**It is no longer the current state.** A correction sweep on 2026-07-26 applied the verdicts to the
documents, and this page went on asserting they were all outstanding. Re-checked 2026-07-30 by
enumerating every `K-U*` marker present in `docs/specs/`, `docs/superpowers/specs/`,
`journal/decisions.md` and `web/src/`, and matching that set against the 31 verdicts below:

- **28 of 31 have landed** — every one whose locus is a document, each carrying a dated
  `(Relabel|Revise applied 2026-07-26, K-…)` marker at the point of the claim.
- **3 are outstanding, and they are exactly the three whose locus is code**: `K-U6-003`,
  `K-U6-005`, `K-U6-009`. A repo-wide search returns **no `K-U6-*` marker outside this archive**.
  The sweep was a document sweep and did not reach `web/src/`.

Per-verdict status is on the rows below. Do not read this section as clearance for the three that
remain: `K-U6-005` in particular is a live mislabel in shipped code, and `LDB-04` already owns it
("assistance is recorded only when assistance was actually delivered").

## The eight units

| Unit | Surface audited | Verdicts |
|---|---|---|
| U1 | `docs/specs/learning-mastery-and-scoring.md` (213 lines, 0 citations) | 18 claims — Preserve 13 · Relabel 5 |
| U2 | `docs/specs/product-vision.md` (102 lines, 0 citations) | 11 claims — Preserve 5 · Relabel 6 |
| U3 | `docs/superpowers/specs/2026-07-16-adaptive-ai-learning-architecture-design.md` (617 lines, 0 citations) | 13 claims — Preserve 10 · Relabel 1 · Revise 2 |
| U4 | `docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md` (the 24-source, 41-requirement baseline) | 18 claims — Preserve 13 · Relabel 2 · Revise 3 |
| U5 | learning-scope rows of `journal/decisions.md` | 17 claims — Preserve 16 · Relabel 1 |
| U6 | shipped code — `web/src/learn/**` + `web/src/progress/types.ts` | 9 claims — Preserve 6 · Relabel 2 · Revise 1 |
| U7 | four earlier learning designs (~802 lines, 0 citations in any) | 9 claims — Preserve 1 · Relabel 7 · Revise 1 |
| U8 | authority surfaces (`ROADMAP.md`, `PROGRESS.md`, foundation/tracks design, QA process, architecture) | 7 claims — all Preserve |

U7 scores worst (1 of 9 survives as written). U2 is next (5 of 11). U8 is the only all-clean
unit — but see `P2-unlanded-and-lost.md` §5N: its largest in-scope mandate block was never
examined and carries no verdict.

**Not reported anywhere the owner reads:** four of eight units were ruled **INSUFFICIENT** by
their own verifiers — U1 (`V-U1.md:11`), U3 (`V-U3.md:9`), U4 (`V-U4.md:9`), U8 (`V-U8.md:3`).
There is no gate criterion for sufficiency, so the finding never propagated.

---

## The 24 Relabel verdicts

A Relabel means the claim **stands** but its evidence level was demoted. These are the claims
that read as settled fact and are actually design bets or values choices.

**Status (re-checked 2026-07-30):** 22 of 24 landed on 2026-07-26, each as a dated parenthetical at
the claim itself. The **2 outstanding are both in the U6 sub-table below** — `K-U6-003` and
`K-U6-009`, both at code loci — and are marked there.

### `docs/specs/product-vision.md` — 6 (the most exposed document)

| ID | Locus | Claim | New label | Why |
|---|---|---|---|---|
| K-U2-001 | `:6` | "Build a Duolingo-like training game for learning blackjack and card counting." | **Product judgement** | Every `DUO-*` source held is vendor self-description. Ruled **not an empirical claim at all** — a genre/positioning commitment. Explicitly *not* Unsupported, *not* Remove. Propagates verbatim into `AGENTS.md`. |
| K-U2-002 | `:23` | "short learning loops, like Duolingo" | **Assumption** | Falsifiable — it sets session length. Duolingo "a few minutes" vs Brilliant "15 minutes"; the baseline logs this as an open conflict. |
| K-U2-003 | `:11-17` | The seven-rung skill ladder (Basic Strategy → … → advanced count systems) | **Product judgement + COVERAGE GAP** | No evidence held bears on it. Baseline: "COVERAGE GAP — Blackjack transfer and numeric calibration." |
| K-U2-006 | `:83-87` | The three-rung fading ladder (table open → table hidden → hidden at pace) | **Assumption** | The *principle* (fade assistance) is evidence-backed; the **specific rungs** are not. |
| K-U2-007 | `:74-75` | "Feedback judges the quality of a decision … never the hand result." | **Product judgement (Layer 1: COVERAGE GAP)** | Baseline rules on it by name: no reviewed source tests gambling outcome bias. Correct by game mathematics + product integrity — **not** a learning-science finding. |
| K-U2-010 | `:69-72` | "The game teaches execution first" / not a blackjack theorist | **Product judgement** | Held evidence runs mildly against — worked examples reduce novice load, a nuance the flat framing drops. |

### `docs/specs/learning-mastery-and-scoring.md` — 5

| ID | Locus | Claim | New label | Why |
|---|---|---|---|---|
| K-U1-003 | `:30-38` | The 7-stage skill order (game literacy → … → automaticity) | **Assumption** | "No dossier and no baseline source evaluates a prerequisite ordering for blackjack, or for any comparable situation→action rule domain." Khan's ladder is an existence proof that ladders ship, not that this ordering is correct. |
| K-U1-004 | `:38`, `:95` | "Automaticity … only after accuracy is stable" / "timed practice after accuracy is stable" | **Assumption** | **The weakest-evidence claim in the whole audit.** Its only blackjack-specific support is N=12, computer-controlled win probability, no split/double/insurance. Also a silent drift: the import said "after **mastery**"; this doc loosened it to "after accuracy is stable". |
| K-U1-014 | `:133-134` | "immediate correction for new concepts and delayed review for transfer" | **Assumption** | `SCI-005` runs against the immediate half: delayed was *slightly more effective*, and "clarity and consistency … more essential than the actual timing". Logged as CFL-004. |
| K-U1-016 | `:151-152`, `:162-165` | Chess-style internal rating alongside deterministic mastery gates | **Assumption** | Each half has a precedent; **the combination has none.** Hidden data dependency: education-Elo needs ~100 learners for usable item difficulty; Chess.com's item ratings are crowd-calibrated. |
| K-U1-017 | `:169`, `:173-176`, `:178`, `:184-185` | Four-tier error severity; response time and table pace as scoring factors | **Product judgement + COVERAGE GAP** | Nothing grades blackjack error severity. ALR-022 cuts the other way: record timing "without equating speed with ability". Logged dormant as CFL-005. |

### The four earlier learning designs — 7 (U7)

| ID | Locus | Claim | New label | Why |
|---|---|---|---|---|
| K-U7-001 | `2026-07-11-blackjack-basics-learning-foundation-design.md:65-66` | Nine units, "roughly two to four minutes" each | **Assumption** | ALR-027: "the research does not establish universal minutes." |
| K-U7-002 | same `:18-19` | Strategic correctness "begins with Strategy Table Fundamentals" | **Product judgement** | ALR-033 hands prerequisite choice to curriculum design. Mislabelled by omission, not wrong. |
| K-U7-003 | same `:68-111` | The specific nine-unit teaching order | **Assumption** | No citation for the order; ITS literature is consistent with but does not establish it. |
| K-U7-004 | `2026-07-15-strategy-table-fundamentals-lesson1-design.md:12-17` | Four choices "endorsed architecturally" by a Fable 5 subagent wearing two personas | **Product judgement** | **The agent-persona-as-evidence finding.** The code-check half is legitimate `OBSERVED`; "endorsed architecturally" presents a persona's opinion as evidentiary warrant. |
| K-U7-006 | same `:154-155` | A read-only skill decays if application is several lessons away | **Assumption** | The configuration is a COVERAGE GAP; no source measures it. |
| K-U7-007 | `2026-07-10-v2-learning-foundations-roadmap-design.md:18` | "Teach hit and stand first, then double and split." | **Assumption** | No source evidences this ordering. |
| K-U7-008 | same `:31-33` | Fixed subject unlock order; checkpoint auto-unlock | **Product judgement** | ALR-033 again; Khan is a comparable shipped alternative, not proof. |

### The architecture design — 1 (U3)

| ID | Locus | Claim | New label | Why |
|---|---|---|---|---|
| K-U3-007 | `2026-07-16-adaptive-ai-learning-architecture-design.md:410-411` | Mastery becomes `Review due` rather than losing history as retention ages | **Assumption** | Spacing transfer to a blackjack-shaped decision rule is a **settled** coverage gap. The only product analogue (Khan) has **no time-based decay** at all. |

### The evidence baseline itself — 2 (U4)

| ID | Locus | Claim | New label | Why |
|---|---|---|---|---|
| K-U4-003 | ALR-001, `:121` | Multiple choice tagged `PUBLISHED/INFERENCE` to `DUO-001`, `BRI-001`, `SCI-001` | **Product judgement** | **None of the three sources speaks to format validity.** The `PUBLISHED` half is unearned. This is the requirement that governs 100% of shipped mastery evidence. |
| K-U4-005 | ALR-005, `:145-146` | Immediate canonical correction during acquisition, tagged to `SCI-005` | **Assumption** | The source reports **delayed** feedback as slightly *more* effective. The configure-by-mode half survives as inference; the immediate-by-default half is not derived from it. |

### Shipped code — 2 (U6) — **both OUTSTANDING**

Neither carries a marker at its locus. Verified 2026-07-30: a repo-wide search for `K-U6-` returns
nothing outside this archive.

| ID | Locus | Claim | New label | Why | Status |
|---|---|---|---|---|---|
| K-U6-003 | `web/src/learn/validate.ts:65-66` | Required checks must be `question` steps | **Product judgement** | Filed as an authoring rule, it is actually **a pedagogical commitment about what counts as evidence**. Consequence: a played hand can never satisfy completion. | **OUTSTANDING** — and `LDB-04` is scoped to replace the commitment outright, so this may retire rather than land. |
| K-U6-009 | `web/src/learn/content/blackjack-basics.ts:290` | Recap copy "You can explain and use Hit." | **Product judgement** | Asserts learner capability and is **never conditioned on evidence** — a hand step advances to recap regardless of correctness. Reads as attestation; is coverage-summary copy. | **OUTSTANDING** — copy fix, no owner card. |

### Decision log — 1 (U5)

| ID | Locus | Claim | New label | Why |
|---|---|---|---|---|
| K-U5-008 | `journal/decisions.md:28` | The checkpoint-hybrid boundary "limits token cost and latency locally" | **Assumption** | The mechanism exists; **no measurement backs it.** The same design files token/latency/cost as work still to be done. |

---

## The 7 Revise verdicts

Wording must change. **6 of 7 applied 2026-07-26; 1 outstanding** — re-checked 2026-07-30 by opening
each locus. The outstanding one is the only Revise whose locus is code.

| ID | Locus | Required change | Status |
|---|---|---|---|
| K-U3-001 | `…architecture-design.md:285` | "Exact values are research-calibrated configuration" — the overstatement is the **present-tense participle**. Say the values are configuration **to be calibrated by** the named gates, not already calibrated. | **APPLIED** — now reads "configuration to be calibrated … and not already calibrated", marked `K-U3-001`. |
| K-U3-002 | `…architecture-design.md:412` | "versioned, research-calibrated curriculum/reducer policy" → "versioned policy whose values are **assumptions pending calibration**". The more consequential of the two — it governs the reducer. | **APPLIED** — at `:416`, verbatim to the required wording. |
| K-U4-004 | ALR-004, `:139` | **Drop "existing … attempt-record project contracts" from the evidence basis.** `AttemptRecord` has one `response` field and a scalar `assistance` — the existing contract is **the gap this requirement addresses, not evidence for it.** | **APPLIED** — evidence basis now `SCI-001/004/009` only, marked `K-U4-004`. |
| K-U4-013 | ALR-022, `:253` | **Strike "and current `AttemptRecord` seam"**; keep "approved attempt envelope." Four of six items ALR-022 names are absent from the seam it cites. | **APPLIED** — marked `K-U4-013`. |
| K-U4-016 | ALR-040, `:363-365` | **Mark the reduced-motion element as resting on a Level AAA criterion** (SC 2.3.3). Reflow (1.4.10) and Text Spacing (1.4.12) are AA; Timing Adjustable (2.2.1) is A. U4 states no conformance level anywhere. | **APPLIED** — all four criteria now carry levels. Note `LDB-07` still owes the *target* conformance level, which is a separate obligation. |
| K-U6-005 | `web/src/learn/controller.ts:123` | The `'instruction'` label **records retry depth, not assistance received.** No instruction is delivered; `retry()` clears feedback and the only affordance is a Retry button. **No hint ladder exists.** The mislabel propagates into a test that calls it "a hinted attempt." | **OUTSTANDING** — `controller.ts:123` still reads `this.assistance = this.assistance === 'none' ? 'retry' : 'instruction'`, and the doc comment above it still says "escalating assistance". `LDB-04` owns the fix. |
| K-U7-009 | `2026-07-10-v2-learning-foundations-roadmap-design.md:56-57` | State that **the closest analogous evidence favours introducing mixed practice earlier**, and that this is an open design question, not settled sequencing. Held at Revise not Replace only because domain transfer is untested. This is CFL-007. | **APPLIED** — now reads "Category-blocked-then-mixed is one candidate order, not a settled one", with the interleaving evidence cited. |

---

## U6 — what the shipped learn code actually does

The single most useful unit, because it measures reality rather than prose.

- **The entire shipped mastery model is one line** (`web/src/learn/controller.ts:361`): every required
  check answered correctly at least once, ever. No repetition, no decay, no spacing, no
  assisted/independent split.
- **100% of shipped mastery evidence is declarative multiple-choice** (`validate.ts:65-66`).
  A played hand can never satisfy completion. *(Slightly overstated — see
  `P2-unlanded-and-lost.md` §7.10: `final-outcome-check` is a multiple-choice question about a
  real live round.)*
- **Completion gates nothing.** `computeCompleted`'s result is read by no app file — only tests
  and the QA harness.
- **The app never grades basic-strategy correctness.** `basic_strategy_action` exists and its only
  callers are Rust tests. The curriculum enforces mechanics-only with a test-enforced banned-phrase
  list (`/best move/i`, `/correct play/i`, `/basic strategy/i`).
- **The durable-progress schema has zero product consumers** — imported outside its own directory
  by exactly one file, a QA harness.
- **Decision/outcome separation is genuinely implemented** (`controller.ts:210`). Map matches
  territory here.

This unit was `Preserve`d, and a verifier tried to break it and could not: the richer documented
model is banner-marked "parked for V2+", so the one-line model contradicts nothing. **The specs
never claimed to be implemented.**

---

## Conflict register — all 7 OPEN

| ID | Conflict | Note |
|---|---|---|
| CFL-001 | Feedback timing, three-way: import's unhedged "immediate correction" vs `SCI-005`'s delayed-slightly-better vs Ericsson's *definitional* immediacy | superseded at U1 by CFL-004 |
| CFL-002 | Session length — `product-vision.md:23` names one pole of a Duolingo-vs-Brilliant conflict the baseline already logs | |
| CFL-003 | Mastery-progression external validation | Both agents agree this is a **standing caution on a model yet to be chosen, not a contradiction** |
| CFL-004 | Feedback timing, **four positions**, all re-verified verbatim. **Addendum: `SCI-005`'s own meta-regression found feedback timing did not contribute significantly.** | |
| CFL-005 | Speed as evidence — U1's scoring factors vs ALR-022's "without equating speed with ability" | dormant; U1's factors sit under a "Factors later:" deferral |
| CFL-006 | Learner-identity wording — "at most pseudonymous" vs bare "anonymous". A privacy over-claim, still live | |
| **CFL-007** | **Curriculum sequencing.** Roadmap says blocked-then-mixed; held evidence (Rohrer, Dedrick & Burgess 2014, Q2 RCT, n=140) shows **interleaved 72% vs blocked 38%, d=1.05** on a directly analogous task. Domain transfer untested. | **The register's own note calls this the single most product-consequential row** — the one place the project's held evidence points against a decision already written into the roadmap. Resolved 2026-07-22 by owner ruling: *block to introduce, interleave to practise.* The `:56-57` revision **landed on 2026-07-26** — this row asserted it was still unapplied until 2026-07-30, when the target was reopened and found corrected. The conflict itself stays OPEN because `P-3` has not been run: the ruling is a bet on untested domain transfer (`A-15`), not a settled sequencing finding. |

Two further tensions recorded outside the register, both still live:
- `ROADMAP.md:43` calls AL-D1 "the active slice" while `PROGRESS.md:53` records it complete;
  the `idb` bundle-delta check is called "pending" while the QA ledger records it PASS.
- `docs/specs/qa-playtest-process.md:31-33` still enumerates Tier-1 as `qa:rules`+`qa:flow`+`qa:breakit`,
  omitting `qa:learn`, which already runs; and `:122` still lists Learning/Tutorial QA as *parked*
  when its trigger has fired.

---

## Bottom line for re-planning

### A. Genuinely evidence-backed — may be asserted

1. **Chunk first, then interleave.** "When tested 1 week later, performance was vastly superior after mixed practice." Caveat: narrow maths domain, blackjack transfer is a coverage gap.
2. **Interleaving improves discrimination; classification should be measured separately from action selection.** Discrimination errors 46% vs 10%; 72% vs 38%, d=1.05. The dossier's own note: the task structure (situation → select correct action from a small fixed set) is structurally close to basic-strategy play. **The strongest asset in the corpus — and CFL-007 says it points against the roadmap's sequencing.**
3. **Short loop with immediate corrective feedback and targeted repetition — mechanism level only.** The part of Ericsson both camps concede. Claim no magnitude, no hours.
4. **Repeat weak items sooner, without same-session answer repetition.** "Only 12 of 271 comparisons … showed no effect or a negative effect from spacing."
5. **Feedback timing is a configuration, not one global mode.** Refusing a single global mode is what the evidence licenses; *which* mode goes where is not.
6. **Non-color-alone feedback.** WCAG 2.2 SC 1.4.1, Level A, reopened first-hand. The strongest-provenance claim in the audit.
7. **Fade assistance before counting evidence as independent — the principle only.**
8. **Ordered-shoe integrity.** Domain mathematics plus an approved requirement.
9. **"No protocol without evidence" — the project actually meets it.** U8 swept for un-evidenced mandates and found none.

### B. Product judgements — free to change, just label them

The "Duolingo-like" premise itself · the seven-step vision ladder · decision/outcome separation
(correct by game mathematics, not by learning science) · "execution first, not a theorist" ·
four-tier error severity · which subjects precede which · deterministic authority over AI ·
questions-only as mastery evidence · the recap capability copy · rule-based scenario generation.

### C. Assumptions — falsifiable, untested, need playtest data first

The skill order · accuracy-before-speed (support is N=12 with rigged outcomes) ·
immediate-for-acquisition/delayed-for-transfer (source runs the other way) · the specific fading
and hint rungs · chess rating alongside mastery gates (hidden ~100-learner dependency) · mastery
decaying to `Review due` · **every threshold, interval, evidence count and session duration** ·
"short loops" as a session length · skill decay from delayed application · the checkpoint-hybrid
cost claim · **multiple choice as a valid mastery format** · two-to-four-minute units.

### D. Do not repeat in a rewritten ROADMAP

- Never write **"research-calibrated"**. No calibration exists; it is the exact word both U3 Revises attack.
- Never cite `AttemptRecord` as evidence for attempt recording — it is the gap those requirements address.
- Never present reduced-motion at the same level as reflow/text-spacing. **State a target WCAG conformance level.**
- Never cite a subagent or persona review as warrant.
- Never claim the app has a hint ladder, graded assistance, or a richer mastery model.
- Never write "anonymous" for learner state — the ruling is **"at most pseudonymous"**.
- Reconcile `ROADMAP.md:43` against `PROGRESS.md:53`/`:64-65`, the stale `idb` "pending" note, and the Tier-1 suite enumeration before republishing.

### E. Coverage caveats that bound what may be leaned on

- **U1's progressive-withdrawal-of-support claim family was never assessed.** The 18 verdicts are not full coverage of that document.
- **13 of the 41 ALR requirements were never examined**: ALR-002, -003, -006, -020, -021, -023, -024, -025, -034, -035, -038, -039, -041. Silence about them is not clearance.
- Six more (ALR-007–012) carry only an abstention, and `SCI-004`/`SCI-009` — the sources under the worked-examples requirement — **were never opened by anyone in the entire phase.**
