# Verification — Unit U6

SUFFICIENCY: SUFFICIENT

Every claim in `audit/U6-audit.md` was re-checked by independently opening the primary artifact
(the code, the specs, the plan, the P1 dossier) — not by reading the audit record's
characterisation. Nine well-formed verdict rows are present; no verdict rests on an
`UNVERIFIED`/`UNVERIFIABLE` citation; the unit's central negative result survives scrutiny.
Two material corrections are raised (both editorial); neither changes a verdict.

## Verdict-row count — the 8-vs-9 discrepancy, resolved

I counted the record's verdict table (`audit/U6-audit.md:44-52`) row by row:

| Row | Claim | Verdict |
|----|----|----|
| :44 | K-U6-001 | Preserve |
| :45 | K-U6-002 | Preserve |
| :46 | K-U6-003 | Relabel |
| :47 | K-U6-004 | Preserve |
| :48 | K-U6-005 | Revise |
| :49 | K-U6-006 | Preserve |
| :50 | K-U6-007 | Preserve |
| :51 | K-U6-008 | Preserve |
| :52 | K-U6-009 | Preserve→**no**; Relabel |

**Nine rows, all well-formed** (ID, verdict, claim, citation in every row).
Distribution: **Preserve 6, Relabel 2 (K-U6-003, K-U6-009), Revise 1 (K-U6-005), Replace 0,
Remove 0.**

The orchestrator's mechanical tally is correct. The examiner's return summary is *not* a
fabrication of the summary step: the record itself states the wrong distribution at `:54`
("Preserve 5 … (9 rows)" — 5+2+1 = 8 ≠ the 9 rows the same sentence claims). The record is
internally inconsistent *in that one line only*; the nine rows above are authoritative and are
what everything downstream should read. Raised as C-U6-002.

## Mandatory calibration — Remove/Replace defect-real answers

**The record carries ZERO `Remove` and ZERO `Replace` verdicts, so no `DEFECT-REAL` answer is
required.** Recorded explicitly per the dispatch.

**Is zero honest here?** Yes. I looked specifically for a killable claim and found none. A
`Remove` requires a claim that is baseless or contradicted; a `Replace` requires a claim whose
content must be substituted. Every one of the nine claims is a statement about what the shipped
code does, each anchored to a line I opened and read, and each of those lines says what the record
says it says. There is no candidate for `Remove` in this unit because the unit's subject matter is
code, and code either contains the line or it does not. Zero is the arithmetically correct answer,
not a soft one.

## Ruling on the central judgement — is `K-U6-001` really a `Preserve`?

**Yes. `Preserve` is correct, and the restraint is the right call.** I tried to break it and could
not.

1. **The one-line mastery model is verbatim and complete.** `web/src/learn/controller.ts:361` is
   exactly:
   `    return this.unit.requiredChecks.every((id) => attempts.some((a) => a.stepId === id && a.correct === true));`
   `computeCompleted` is called from exactly two sites (`:249`, `:306`) and is the only completion
   computation in `web/`. A repo-wide grep for `.completed` / `completed:` returns only
   `learn/controller.ts`, `learn/types.ts:53`, `learn/controller.test.ts`, and
   `web/qa/learn/run.ts:211-212, :23, :26`. No decay, no repetition count, no spacing, no
   confidence, and no assisted/independent split reaches it — `assistance` is recorded on the
   attempt (`:297`, `:218`, `:238`) and read by nothing in the mastery path.

2. **The parked banner exists and says what the record says.** `docs/specs/learning-mastery-and-scoring.md:3`
   (the record cites `:2-3`; `:2` is blank) reads verbatim:
   `> Status: parked for V2+. Not a V1 implementation requirement unless the active milestone says so.`

3. **The banner's escape clause is closed.** The banner is conditional — "unless the active
   milestone says so" — so a parked doc *could* be re-armed by a live milestone. It is not.
   `journal/ops/phase.md:2-4` sets `phase: v2-learning-foundations`, `roadmap_step: 2`,
   `sub_phase: adaptive-learning-foundation-audit`; the active step (`:7`, `:50`) is the audit
   program itself, which explicitly forbids product edits. Nothing in the active milestone
   requires the mastery ladder.

4. **No live document asserts a richer mastery model as CURRENT.** I checked every candidate:
   - `docs/superpowers/specs/2026-07-16-adaptive-ai-learning-architecture-design.md` — the strongest
     candidate, and *not* parked (`:3`: "conversational design approved 2026-07-16; written-spec
     review pending"). It does describe a rich model (`:135` "Versioned deterministic mastery
     reducer"; `:136` "Unit completion, prerequisite gates, skip-test verdicts | Deterministic
     progression policy"). But it is uniformly forward-tensed: `:16` "The first proof is
     deliberately small"; `:101` "Research evidence feeds several focused implementation cycles";
     `:103-104` lists the "mastery reducer" inside the **Adaptive mechanics foundation** cycle
     still to be specced and planned. It claims a target architecture, never a shipped behaviour.
   - `journal/decisions.md:30` approves "graded assistance/retry evidence … deterministic
     mastery/skip tests" — an approved *evidence set for future adaptive activities*, and `:33`
     (same register) states the opposite of a current claim: "No learner data is written until a
     real consumer exists" and "`Learn.tsx` also confirms nothing is gated on completion today".
   - `ROADMAP.md` mentions mastery only as product direction (`:11`, `:31`, `:137`, `:142`) and at
     `:88` explicitly defers: "testing and realistic pace are later mastery work".
   - `docs/specs/product-vision.md:3` is "directional … not an implementation task list".

   **Nothing live claims that the shipped code delivers more than one-shot completion.** The map
   and the territory agree, because the map says it is a map of the future.

   Therefore the `Preserve` is not generosity — it is the honest reading. The easy, satisfying
   defect here ("the mastery model is too simple") is a *product* judgement about what to build,
   which this phase does not license, and the record correctly refused it while still stating the
   simplicity plainly and in full. **That restraint is a finding worth confirming, and I confirm
   it.**

## Ruling on `K-U6-005` — material, not a naming nit

**Material. The `Revise` stands.** I looked hard for over-calling here and the claim survives on
two independent grounds:

1. **The quoted facts are exact and the inference is tight.** `controller.ts:123` is verbatim
   `    this.assistance = this.assistance === 'none' ? 'retry' : 'instruction';`; `:125` is
   verbatim `      this.set({ feedback: null, error: null });`; `Lesson.tsx:61` is verbatim
   `          {showRetry && <button onClick={() => controller.retry()}>Retry</button>}` and is the
   only affordance rendered on a locked question. No hint/instruction surface exists in `web/`.
   The escalation therefore records retry depth (2nd+ retry) under a word that asserts assistance
   was delivered.

2. **The value is consumed in a way that would mislead — evidence the record did not cite.** The
   dispatch made materiality turn on whether anything consumes the `Assistance` value. It does:
   `web/src/progress/types.ts:35` mirrors the union BY VALUE into the durable schema
   (`export type Assistance = 'none' | 'retry' | 'instruction';`), `web/src/progress/canonical.ts:223`
   persists it into the canonical export (`assistance: attempt.assistance,`), and the durable
   schema's own test glosses the value exactly as the record fears —
   `web/src/progress/types.test.ts:109`: `it('accepts a hinted attempt (graded + assistance:instruction)', () => {`.
   A downstream reader (and the schema's own test author) reads `'instruction'` as *hinted*. That
   is assisted-vs-independent evidence semantics, and the only producer sets it after a bare Retry
   button. A designer building a mastery reducer on this vocabulary would build differently.

The record's contrast case is also correct and fairly stated: `:218`
`      assistance: graded ? 'instruction' : 'none',` is honest on a hand step, because
`blackjack-basics.ts:257` (`      intro: 'This hand is a stiff total. Choose Hit to take one more card.',`)
literally instructs. The record's self-correction at `:96-100` — abandoning the wider "unused
field" target for this narrower one — is the correct move, not an inflation.

## Independent confirmation of the two factual resolutions

**1. Basic-strategy grading — the examiner's correction of the plan is CONFIRMED.**
A repo-wide search for `basic_strategy_action` returns **zero occurrences anywhere under `web/`**.
Every product occurrence is Rust: definition at `crates/blackjack-core/src/strategy.rs:140`
(`pub fn basic_strategy_action(`); callers **only** at
`crates/blackjack-core/tests/strategy_tests.rs:3, :140, :395, :409, :425, :443` — the record's
enumeration is exact, with no caller it missed. The remaining hits are docs/plans and one gate
fixture (`scripts/fixtures/research-gate-p2/clean/verification/V-U1.md:11`), none of them product
code. The bridge's only strategy-bearing command is verbatim at `web/src/bridge/types.ts:87`:
`  | { command: 'check_strategy_compatibility'; profile_id: StrategyProfileId; session: SessionState };`
— a compatibility gate, not an action oracle. **The app never grades strategic correctness, and
the identifier is not a `web/` identifier.** Corroborated by curriculum: `blackjack-basics.ts:4`
(`// strategy language — this is mechanics-first literacy, one concept per screen.`) enforced by
`blackjack-basics.test.ts:10` (`const STRATEGY_LANGUAGE = [/best move/i, /correct play/i, /basic strategy/i];`).

**2. The progress import graph — the examiner is right and the orchestrator's brief was wrong;
CONFIRMED by my own enumeration.**
A specifier-scoped search across all of `web/` for imports naming `progress`
(`from '…progress…'` / dynamic `import('…progress…')`) returns exactly six lines, all in one file:
`web/qa/progress/harness.ts:42, :48, :49, :50, :51, :52`. No file under `web/src/app/**`,
`web/src/learn/**`, or any other `web/src` path outside `progress/` imports it. The two files that
made the orchestrator's grep return three are non-imports, and I read both:
- `web/qa/run-all.ts:16` — `  { name: 'progress', entry: 'qa/progress/run.ts' },` — a runner-entry
  **string literal**.
- `web/qa/progress/bundle-probe.ts:13` and `:24` — **comments** only; the file's sole import is
  `import { openDB, deleteDB, type IDBPDatabase } from 'idb';` (`:21`). Its own header states the
  reason (`:12-13`): "nothing in cycle 1 imports the real `progress/idb-store.ts` adapter (design
  §3.1) — there is no UI consumer yet".
**The durable-progress schema has zero product consumers.** `K-U6-008` is sound as written.

## Anchor / verbatim check (Axis 1, code as source)

Every quoted line was opened and compared character-for-character. All match:

| Anchor | Result |
|----|----|
| `controller.ts:361` | verbatim ✓ |
| `controller.ts:123`, `:125`, `:217`, `:218`, `:245`, `:248` | verbatim ✓ |
| `controller.ts:210` | verbatim as far as quoted, but the line continues (`… A requested-action step records assistance`); truncation unmarked — non-material note |
| `validate.ts:65-66`, `:94` | verbatim ✓ |
| `Learn.tsx:4` (and `:3-4` in CIT-U6-02) | verbatim ✓ |
| `Lesson.tsx:61` | verbatim ✓ |
| `learn/types.ts:53` | verbatim ✓ (`completed: boolean` declared there) |
| `progress/types.ts:6-7`, `:36-42` | verbatim ✓; all six `ErrorClass` names match the spec's order exactly |
| `learning-mastery-and-scoring.md:102`, `:103-104` | verbatim ✓ |
| `bridge/types.ts:87` | verbatim ✓ |
| `strategy.rs:140`; `strategy_tests.rs:3, :140, :395, :409, :425, :443` | verbatim ✓, enumeration complete |
| `qa/progress/harness.ts:42, :48-52` | verbatim ✓, enumeration complete |
| `qa/learn/run.ts:211` | verbatim ✓ |
| `blackjack-basics.ts:4`, `:257`, `:290`; `blackjack-basics.test.ts:10` | verbatim ✓ |
| `engine.ts:8-10`; `situations.ts:1-8`; `feedback.ts:25` | verbatim ✓ |
| `C1-knowledge-tracing.md:117-121` | verbatim ✓ ("The mastery-model choice remains a **Product judgement** informed by evidence, not an Evidence-backed decision.") |
| Counts: 9 units (`:613-623`), 18 `type: 'question'`, 14 `requiredChecks` entries across `:38, :94, :173, :229, :303, :369, :434, :497, :564` | independently recounted — all ✓ (2+3+2+1+1+2+1+1+1 = 14) |
| plan `:911` (CONFLICT-U6-A quote) | fragment is on the line, but the quotation drops the sentence's governing word "zero" from `:910` and thereby states the opposite of the plan — **C-U6-001** |

## Survivor spot-check (anti-under-calling)

I re-opened three of the five declared survivors and the four `Preserve` rows I had not otherwise
had to open, looking for a map/territory gap the examiner might have waved past:

- `engine.ts:8-10` — the "never computes or grades them" claim holds: every `resolveAnswer` branch
  for `hand_total` / `hand_softness` / `hand_bust` (`controller.ts:331-335`) delegates to
  `this.engine.describeHand(...)`; `last_*` branches read the stored log. Nothing is regraded in
  TypeScript. Sound.
- `situations.ts:1-8` — data-only openings on a real shoe with the honest-shoe caveat stated
  (`:3-4`). Sound; consistent with the AGENTS.md "do not fake card flow" constraint.
- `feedback.ts:25` — verbatim; it does reinforce the decision/outcome separation. Sound.
- `progress/types.ts:46-50` (`AttemptDisposition`, `{ status: 'abandoned' }`) — declared-but-unproduced
  and openly declared as such at `:6-9`. Correctly not treated as a false claim.

The six `Preserve` rows are honest restraint, not insufficient scrutiny: each asserts only what the
code demonstrably does, and the three that could have hidden an absence-as-proof failure
(K-U6-002, K-U6-007, K-U6-008) are positively enumerated — I reproduced all three enumerations
independently and found no member they omitted.

## Materiality-in-the-other-direction check (demoted items)

I re-read all six Non-material notes (`:147-162`). None demotes a load-bearing pedagogical
assumption: three are stale-comment observations inside a working file
(`controller.ts:294-296`, `:45-46`, `:319-321` — all confirmed stale and all confirmed harmless,
since `opts` is genuinely used at `:151`/`:158` and hand steps have shipped), one is a line-count
nit, one is an already-recorded naming collision (`journal/decisions.md:33`), and one is a
test-coverage-shape observation. Correct sink for all six.

## Phase-boundary rules

1. **"States what the project should now do"** — **no violation found.** I scanned all 163 lines.
   The nearest approaches are `:79-80` ("That is why K-U6-001 is a Preserve and not a Revise" — a
   verdict rationale) and `:100` ("Honest wording: the label records *retry depth*, not assistance
   received" — the corrected claim a `Revise` verdict is required to state, scoped to the audited
   artifact's own wording, not to project work). The specific live risk named in my dispatch — "the
   mastery model should track repetitions" — appears **nowhere**; the record explicitly declines
   that move at `:76-80`.
2. **Authoring replacement content for a `Replace`** — moot and confirmed: zero `Replace` rows.
3. **Later-phase decision-sense stamping (`Confirm/Revise/Reconsider/Remove`)** — **no violation.**
   The record declares the P2 verdict taxonomy at `:6` ("Verdict legend: Preserve / Relabel /
   Revise / Replace / Remove") and every use of `Revise` (`:48`, `:54`, `:80`) is in that sense.
   No `Confirm` or `Reconsider` appears anywhere.

## Rulings on the two proposed conflicts

- **CONFLICT-U6-A (plan vs repo, `basic_strategy_action`)** — **REAL, but mischaracterised in two
  ways** (both fixed by C-U6-001). Real: the P2 plan's U6 brief (`:903-912`) is scoped to `web/`
  and states the fact with no location, so an auditor searching the briefed scope finds nothing —
  the identifier is Rust-only. Mischaracterised: (a) the record's quotation drops "zero" and so
  reads as though the plan claimed the identifier *has* non-test callers; (b) the plan attributes
  **no file at all**, so "its file-scope attribution is not [correct]" overstates — the mismatch
  is an *implied scope*, not a stated wrong file. The record's substantive ruling ("the plan's
  conclusion is correct") is right. Recorded, not resolved.
- **CONFLICT-U6-B (plan vs repo, progress import graph)** — **REAL as a logged non-defect, and
  correctly characterised.** Independently reproduced above: the plan's wording is exactly right as
  to imports; the dispatch's alleged imprecision does not survive contact with the files. Logging
  a checked-and-cleared item is the right disposition, and it is correctly stated as "no defect
  found here". Recorded, not resolved.

## Corrections raised

| ID | Correction | Remedy |
|----|----|----|
| C-U6-001 | `audit/U6-audit.md:104-110` (CONFLICT-U6-A) misquotes the plan and misstates the mismatch. The record says the plan "states the identifier has \"non-test callers, so the app never grades strategic correctness\"". The plan's actual sentence spans `docs/superpowers/plans/2026-07-20-adaptive-learning-foundation-audit-phase2.md:910-911` and reads verbatim: `Verified adjacent facts the auditor should test rather than assume: `basic_strategy_action` has zero` / `non-test callers, so the app never grades strategic correctness;` — the truncation at the line break drops the governing word **zero** and inverts the plan's meaning. Second, the plan attributes **no file** to the identifier, so "its file-scope attribution is not [correct]" overstates: the real mismatch is that the U6 brief is `web/`-scoped (`:903`) while the identifier is Rust-only. The conflict itself is real; its wording must quote `:910-911` whole and describe the mismatch as implied scope rather than a stated wrong file. | editorial (both sources already in hand; no collection needed) |
| C-U6-002 | `audit/U6-audit.md:54` states "Verdict counts: **Preserve 5, Relabel 2, Revise 1, Replace 0, Remove 0** (9 rows)" — internally impossible (5+2+1 = 8) and wrong against the record's own table at `:44-52`, which carries **six** Preserve rows (K-U6-001, -002, -004, -006, -007, -008), two Relabel (K-U6-003, K-U6-009), one Revise (K-U6-005). Correct figure: **Preserve 6, Relabel 2, Revise 1, Replace 0, Remove 0 (9 rows)**. This figure propagated into the examiner's return summary and into a summary-vs-artifact discrepancy downstream. | editorial (the record's own table is the source; no collection needed) |

## Non-material notes (mechanical / cosmetic — not gated)

- `:47` quotes `controller.ts:210` as `   *  requestedAction — NOT whether the hand won.` The line
  continues `… A requested-action step records assistance` with no ellipsis marking the cut. The
  omitted remainder does not change the meaning (it in fact reinforces K-U6-005), so this is
  mechanical, but a truncated quote should carry an ellipsis.
- `:76` and CIT-U6-06 anchor the parked banner at `:2-3`; the banner is wholly on line `:3` (`:2`
  is blank). Anchor style only.
- `:25` anchors the nine units at `:613-623`; that range is the `units: [ … ],` block — the nine
  unit entries themselves are `:614-622`. The count (9) is right.
- The `625` vs plan's `624` line-count difference for `blackjack-basics.ts` is a trailing-newline
  counting convention (last content line is `};`). Both the record and the plan already treat it
  as cosmetic; nothing rides on it.
- **Nuance the record could have carried on K-U6-003** (strengthening context, not a defect): its
  "100% of shipped mastery evidence is declarative multiple-choice" is exactly right as to
  *interaction form*, but one required check —`final-outcome-check`,
  `web/src/learn/content/blackjack-basics.ts:584-594`, `answer: { kind: 'last_outcome', handIndex: 0 }` —
  is a multiple-choice question **about a real round the learner just played live**
  (`:574-582`, `setup: { kind: 'live' }`). "Declarative" understates that case slightly. The
  load-bearing half of the claim is unaffected and verified: a `hand` step can never be a required
  check (`validate.ts:65-66`), so a played *action* can never satisfy completion.
- **Supporting evidence the record did not cite for K-U6-005** (strengthens, does not alter):
  `web/src/progress/types.ts:35`, `web/src/progress/canonical.ts:223`, and
  `web/src/progress/types.test.ts:109` (`it('accepts a hinted attempt (graded + assistance:instruction)'`)
  show the `'instruction'` value being mirrored, persisted, and glossed as *hinted* downstream.
- CIT-U6-03's source (`C1-knowledge-tracing.md`) carries the P1 raw-collection banner at its `:3`;
  it sits in the approved, promoted P1 archive, so this is provenance labelling only, not a
  trust problem. The quoted passage at `:117-121` is verbatim.

## Citation states (verifier-assigned; returned as rows, no register written)

Every citation below was retrieved and read by me directly from the primary artifact in this repo.
No state rests on another agent's retrieval pass.

| CIT-U6-01 | Preserve | U6 | VERIFIED |
| CIT-U6-02 | Preserve | U6 | VERIFIED |
| CIT-U6-03 | Preserve | U6 | VERIFIED |
| CIT-U6-04 | Preserve | U6 | VERIFIED |
| CIT-U6-04 | Revise | U6 | VERIFIED |
| CIT-U6-04 | Relabel | U6 | VERIFIED |
| CIT-U6-05 | Relabel | U6 | VERIFIED |
| CIT-U6-05 | Preserve | U6 | VERIFIED |
| CIT-U6-06 | Preserve | U6 | VERIFIED |
| CIT-U6-07 | Revise | U6 | VERIFIED |
| CIT-U6-08 | Preserve | U6 | VERIFIED |
| CIT-U6-09 | Preserve | U6 | VERIFIED |
| CIT-U6-10 | Preserve | U6 | VERIFIED |
| CIT-U6-11 | Preserve | U6 | VERIFIED |

No `Preserve` or `Revise` verdict in this unit rests on an `UNVERIFIED` or `UNVERIFIABLE`
citation. Zero citations are `UNVERIFIABLE`: this unit's entire evidence base is in-repo.

## Sufficiency reasoning (Axis 2)

**SUFFICIENT.** The record engages the evidence that bears on its question:

- It read the artifact itself rather than inheriting the dispatch's figures, and it recounted the
  dispatch's own line figures (`:12-21`) — I re-verified the two figures that mattered.
- It engaged the **strongest counter-argument to its own conclusion** head-on: that a one-line
  mastery model on a Duolingo-like trainer must be a defect. It answered with the parked banner and
  declined the defect. I tested that answer against every live document that could re-arm the
  parked spec — the architecture design, the decision register, `ROADMAP.md`, `phase.md`,
  `product-vision.md` — and none claims a richer model as current.
- **Material inside sources already in hand that it failed to read** — the dominant Phase 1 defect
  class. I looked for it specifically and found only two items, both *supporting* its verdicts
  (the `progress/` consumption of `Assistance`, and the `last_outcome` nuance on required checks).
  Neither overturns a claim; both are logged as non-material notes so the record can absorb them
  if an editor is in the file anyway.
- It reported survivors and a self-correction, and it positively enumerated its three absence-shaped
  claims instead of reporting an empty grep — the "guard that cannot fail" failure mode is
  genuinely avoided, and I reproduced all three enumerations.

No collection is required for this unit. Both corrections are editorial.
