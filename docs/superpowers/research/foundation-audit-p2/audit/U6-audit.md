# Audit — Unit U6

Unit: **implemented learning behavior** — `web/src/learn/**` + `web/src/progress/types.ts`.
Read-only. No file outside this record was written, and no product code was changed.

Verdict legend: Preserve / Relabel / Revise / Replace / Remove

## Scope actually read (OBSERVED — the shipped artifact itself)

Verified by reading, not inherited:

| File | Lines confirmed by read | Dispatch figure | Match |
|---|---|---|---|
| `web/src/learn/controller.ts` | 379 | 379 | yes |
| `web/src/learn/engine.ts` | 131 | 131 | yes |
| `web/src/learn/validate.ts` | 101 | 101 | yes |
| `web/src/learn/situations.ts` | 54 | 54 | yes |
| `web/src/learn/feedback.ts` | 31 | 31 | yes |
| `web/src/learn/types.ts` | 55 | 55 | yes |
| `web/src/progress/types.ts` | 178 | 178 | yes |
| `web/src/learn/content/blackjack-basics.ts` | 625 | (plan: "624 L content") | off by one — see Non-material notes |

Shipped curriculum shape, counted from `web/src/learn/content/blackjack-basics.ts`: **9 units**
(`:613-623`), **18** `type: 'question'` steps, **14** `requiredChecks` entries across the nine
`requiredChecks:` declarations (`:38, :94, :173, :229, :303, :369, :434, :497, :564`).

## Phase 1 dossiers consulted (evidence input, NOT audit targets)

- `docs/superpowers/research/foundation-audit-p1/dossiers/C1-knowledge-tracing.md` — read the HEAD
  STATEMENT in full (`:45-121`).
- `docs/superpowers/research/foundation-audit-p1/dossiers/C5-anki-spaced-repetition.md` — read the
  finding index and F1 (`:41-63`).

Documented counterparts read as evidence (other units; not audited here):
`docs/specs/learning-mastery-and-scoring.md`, `docs/superpowers/specs/2026-07-16-adaptive-ai-learning-architecture-design.md`,
`journal/decisions.md:33-34` (R26/R27), `web/src/app/Learn.tsx`, `web/src/app/Lesson.tsx`.

---

## Verdicts

| Claim ID | Verdict | Claim | Citation |
|----|----|----|----|
| K-U6-001 | Preserve | The entire shipped mastery model is one line: `    return this.unit.requiredChecks.every((id) => attempts.some((a) => a.stepId === id && a.correct === true));` (`web/src/learn/controller.ts:361`) — mastery is "every required check answered correctly at least once, ever": no repetition count, no decay, no spacing, no confidence, no assisted/independent split. Nothing shipped claims more for it. | CIT-U6-01, CIT-U6-02, CIT-U6-03 |
| K-U6-002 | Preserve | Completion gates nothing in the product: `// as non-interactive metadata only — nothing is locked (V1 has no progress gating yet).` (`web/src/app/Learn.tsx:4`). `computeCompleted`'s result reaches `LessonState.completed` (`web/src/learn/types.ts:53`) and is read by no app file — only by tests and `web/qa/learn/run.ts:211`. | CIT-U6-02 |
| K-U6-003 | Relabel | A required check may only ever be a question step: `      } else if (step.type !== 'question') {` / `        messages.push(\`unit ${unit.id}: required check ${checkId} is not a question\`);` (`web/src/learn/validate.ts:65-66`). Consequence: 100% of shipped mastery evidence is declarative multiple-choice; a played hand can never satisfy completion. Filed in code as an authoring-validation rule; it is a **pedagogical commitment about what counts as evidence**. Relabel: (implied) Evidence-backed authoring invariant → **Product judgement**. | CIT-U6-04, CIT-U6-05 |
| K-U6-004 | Preserve | Decision quality is recorded independently of hand outcome: `   *  requestedAction — NOT whether the hand won.` (`web/src/learn/controller.ts:210`), implemented at `      correct: graded ? action === step.requestedAction : null,` (`:217`) with outcomes attached separately (`:245`). This faithfully implements the documented rule `Record decision quality independently from hand outcome.` (`docs/specs/learning-mastery-and-scoring.md:102`). Map matches territory. | CIT-U6-04, CIT-U6-06 |
| K-U6-005 | Revise | The escalation `    this.assistance = this.assistance === 'none' ? 'retry' : 'instruction';` (`web/src/learn/controller.ts:123`) labels the second-and-later retry as `'instruction'`, asserting that instruction was given. **Overstatement:** no instruction is delivered — `retry()` clears feedback (`      this.set({ feedback: null, error: null });`, `:125`) and the only affordance rendered is `          {showRetry && <button onClick={() => controller.retry()}>Retry</button>}` (`web/src/app/Lesson.tsx:61`); no hint ladder exists. Honest wording: the label records *retry depth*, not assistance received. (Contrast: the same value on a hand step, `      assistance: graded ? 'instruction' : 'none',` `:218`, **is** honest — the step text literally instructs, e.g. `      intro: 'This hand is a stiff total. Choose Hit to take one more card.',` `web/src/learn/content/blackjack-basics.ts:257`.) | CIT-U6-04, CIT-U6-07 |
| K-U6-006 | Preserve | `web/src/progress/types.ts:36-42` declares `export type ErrorClass =` / `  | 'hand-classification'` … `  | 'outcome-bias'; // mastery :102-104; "at least" → additive later`. Checked against its cited source: `distinguish` / `at least hand-classification, dealer-column, illegal-action, strategy-recall, fallback-rule, and outcome-bias errors.` (`docs/specs/learning-mastery-and-scoring.md:103-104`) — all six names transcribed exactly, in order. The vocabulary has no shipped producer, but the file declares that openly (`// The phantom rule (design §7): a \`null\` is allowed only when it is a real domain value, never` / `// as a placeholder for a producer that does not exist.`, `:6-7`). Honest forward scaffolding, correctly labelled. | CIT-U6-06, CIT-U6-08 |
| K-U6-007 | Preserve | The shipped app **never grades strategic (basic-strategy) correctness**. The only strategy-related command on the bridge is `  \| { command: 'check_strategy_compatibility'; profile_id: StrategyProfileId; session: SessionState };` (`web/src/bridge/types.ts:87`) — a ruleset-compatibility gate, not an action oracle. `pub fn basic_strategy_action(` exists at `crates/blackjack-core/src/strategy.rs:140` and its **only** callers are in `crates/blackjack-core/tests/strategy_tests.rs` (`:3, :140, :395, :409, :425, :443`). Curriculum reinforces this: `// strategy language — this is mechanics-first literacy, one concept per screen.` (`web/src/learn/content/blackjack-basics.ts:4`), enforced by `const STRATEGY_LANGUAGE = [/best move/i, /correct play/i, /basic strategy/i];` (`web/src/learn/content/blackjack-basics.test.ts:10`). | CIT-U6-09, CIT-U6-10, CIT-U6-05 |
| K-U6-008 | Preserve | Outside its own directory, `web/src/progress/**` is imported by **exactly one** file — `web/qa/progress/harness.ts`, at `:42, :48, :49, :50, :51, :52` (e.g. `import type { LearnerKey } from '../../src/progress/types';`, `:50`). No file under `web/src/app/**`, `web/src/learn/**`, or any other `web/src` path imports it. The durable-progress schema therefore has **zero product consumers**. | CIT-U6-11 |
| K-U6-009 | Relabel | Recap capability copy asserts learner capability directly: `        { outcomeId: 'hit', text: 'You can explain and use Hit.' },` (`web/src/learn/content/blackjack-basics.ts:290`). It is never conditioned on evidence — the validator checks only *curriculum coverage* of declared outcomes (`          messages.push(\`unit ${unit.id}: recap missing outcome: ${outcome}\`);`, `web/src/learn/validate.ts:94`), and a hand step advances to recap regardless of correctness (`      session, attempts, feedback, awaitingContinue: true, legalActions: [], error: null,`, `web/src/learn/controller.ts:248`, set on every resolved hand). Relabel: reads as an evidence-backed mastery attestation; it is structurally a **Product judgement** (curriculum-coverage summary copy). | CIT-U6-04, CIT-U6-05 |

Verdict counts: **Preserve 6, Relabel 2, Revise 1, Replace 0, Remove 0** (9 rows).
<!-- LANDED C-U6-002 (V-U6, editorial): corrected the internal verdict-count summary from "Preserve 5" (5+2+1=8, impossible against the 9 rows above and internally inconsistent with the sentence's own "(9 rows)") to "Preserve 6" (K-U6-001, -002, -004, -006, -007, -008 = 6), matching the table at :44-52. -->


---

## Survivors — examined and deliberately left alone

Reported explicitly, per the anti-pessimism rule. Each of these was read looking for a
map/territory gap and did **not** yield one:

- **`web/src/learn/engine.ts:8-10`** — `// or wrong-typed reply stays fatal (BridgeError). All blackjack rules — legality,` / `// totals, dealer play, wager, and outcome — live in the engine; this adapter never` / `// computes or grades them.` Checked against every `resolveAnswer` branch
  (`controller.ts:325-353`): `hand_total`, `hand_softness`, `hand_bust` all delegate to
  `this.engine.describeHand(...)`; nothing is regraded in TypeScript. Deterministic-authority
  claim (family 6) holds as written. No verdict assigned — the claim is sound.
- **`web/src/learn/situations.ts:1-8`** — arranged openings are ordered prefixes on a real shuffled
  shoe, data-only, with the honest-shoe caveat stated. Consistent with the AGENTS.md "do not fake
  card flow" constraint. Sound.
- **`web/src/learn/feedback.ts:25`** — `        : \`The dealer's ${dealer} beat your ${player} — a strong total can still lose. −${amount}.\`;`
  Teaching copy that actively reinforces the decision/outcome separation of K-U6-004. Sound.
- **`web/src/progress/types.ts:46-50`** (`AttemptDisposition`, including `{ status: 'abandoned' }`)
  — declared-but-unproduced, and openly declared as such. Not treated as a false claim; per the
  dispatch's own guard, code that implements nothing is not evidence of a false claim unless
  something asserts otherwise. Nothing asserts otherwise. Sound.
- **`docs/specs/learning-mastery-and-scoring.md:2-3`** — `> Status: parked for V2+. Not a V1 implementation requirement unless the active milestone says so.`
  This is the single most important negative result in this unit: the rich documented mastery
  ladder, hint ladder, spacing/interleaving, and error-severity model **do not claim** to be
  implemented, so the shipped one-line model does **not** contradict them. That is why K-U6-001 is
  a Preserve and not a Revise.

## Calibration — what "good" looks like

Held to the `journal/decisions.md` positive controls named in the template (R20, R24, R25, R26,
R27). Every row above carries a `file:line` anchor and a verbatim quotation of the code or prose it
rests on; three rows (K-U6-002, K-U6-007, K-U6-008) rest on positively-enumerated call/import
graphs rather than on an absence claim — the "guard that cannot fail" failure mode is specifically
avoided by naming every importer and every caller found, not by reporting that a grep was empty.

Two dispatch-supplied figures were **not** carried forward unchecked, per the Phase 1 lesson:

1. The `basic_strategy_action` attribution — checked and **corrected** (see K-U6-007 and Conflicts).
2. The `web/src/progress/**` import statement — checked and **found precise as to imports**
   (see K-U6-008 and Conflicts); the wider textual matches are not imports.

Self-correction in-record, in the R24/R26 style: an earlier draft of this audit was going to treat
the unused `assistance` field as the overstatement. That was the wrong target — the field is
recorded honestly on hand steps (`controller.ts:218`), and its being unread is licensed forward
scaffolding. The actual overstatement is narrower and is what K-U6-005 names: the *word*
`'instruction'` applied to a retry during which no instruction is delivered.

## Conflicts logged (recorded, not resolved; returned for the orchestrator-owned register)

**CONFLICT-U6-A — plan vs. repo, on `basic_strategy_action`'s location.**
`docs/superpowers/plans/2026-07-20-adaptive-learning-foundation-audit-phase2.md:910-911` states,
verbatim (the sentence spans a line break after "zero"): "Verified adjacent facts the auditor should
test rather than assume: `basic_strategy_action` has zero non-test callers, so the app never grades
strategic correctness". **Correction (C-U6-001):** an earlier draft of this row quoted only the
fragment "has ... non-test callers, so the app never grades strategic correctness" with the governing
word **zero** dropped at the line break, which read as though the plan claimed the identifier *has*
non-test callers — the opposite of what the plan actually says. Repo state: the identifier does
**not** occur anywhere in `web/` at all; it is a Rust function,
`crates/blackjack-core/src/strategy.rs:140`, whose only callers are
`crates/blackjack-core/tests/strategy_tests.rs`. **The plan's conclusion is correct.**
**Correction (C-U6-001):** an earlier draft of this row also said "its file-scope attribution is not
[correct]" — that overstates, because the plan attributes **no file** to the identifier at all. The
actual mismatch is that the U6 brief is `web/`-scoped (`:903`) while the identifier is Rust-only: an
implied-scope gap, not a stated-wrong-file error. The plan is a different unit's artifact — recorded,
not corrected here.
<!-- LANDED C-U6-001 (V-U6, editorial): requoted plan :910-911 in full (restoring "zero", which the prior quotation dropped across the line break and which inverted the plan's meaning) and corrected "its file-scope attribution is not [correct]" to state the plan attributes no file at all — the real mismatch is the U6 brief's implied web/-scope vs. the identifier being Rust-only. -->


**CONFLICT-U6-B — plan wording vs. repo, on the progress import graph.**
The plan states `web/src/progress/**` is "imported only by `web/qa/progress/harness.ts`, not by app
code." Checked: **as to imports this is exactly right.** `web/qa/run-all.ts:16` contains
`  { name: 'progress', entry: 'qa/progress/run.ts' },` — a runner-entry *string*, not an import;
`web/qa/progress/bundle-probe.ts:13, :24` mention `progress/idb-store.ts` in *comments* only, and
its own imports are `vite`/`idb`-side, never `../../src/progress/*`. Recorded so the imprecision
alleged in the dispatch is not propagated as a defect: no defect found here.

## Citation-state rows (returned as rows; no register written)

| Citation ID | Source | Verdict it supports | Unit | State |
|----|----|----|----|----|
| CIT-U6-01 | `web/src/learn/controller.ts:361` | K-U6-001 | U6 | VERIFIED |
| CIT-U6-02 | `web/src/app/Learn.tsx:3-4`; `journal/decisions.md:33` | K-U6-001, K-U6-002 | U6 | VERIFIED |
| CIT-U6-03 | `docs/superpowers/research/foundation-audit-p1/dossiers/C1-knowledge-tracing.md:117-121` | K-U6-001 | U6 | VERIFIED |
| CIT-U6-04 | `web/src/learn/controller.ts:123, :125, :210, :217, :218, :245, :248` | K-U6-004, K-U6-005, K-U6-009 | U6 | VERIFIED |
| CIT-U6-05 | `web/src/learn/validate.ts:65-66, :94`; `web/src/learn/content/blackjack-basics.ts:4, :257, :290` | K-U6-003, K-U6-007, K-U6-009 | U6 | VERIFIED |
| CIT-U6-06 | `docs/specs/learning-mastery-and-scoring.md:2-3, :102-104` | K-U6-004, K-U6-006 | U6 | VERIFIED |
| CIT-U6-07 | `web/src/app/Lesson.tsx:61` | K-U6-005 | U6 | VERIFIED |
| CIT-U6-08 | `web/src/progress/types.ts:6-7, :36-42` | K-U6-006 | U6 | VERIFIED |
| CIT-U6-09 | `web/src/bridge/types.ts:87` | K-U6-007 | U6 | VERIFIED |
| CIT-U6-10 | `crates/blackjack-core/src/strategy.rs:140`; `crates/blackjack-core/tests/strategy_tests.rs:3, :140, :395, :409, :425, :443` | K-U6-007 | U6 | VERIFIED |
| CIT-U6-11 | `web/qa/progress/harness.ts:42, :48, :49, :50, :51, :52` | K-U6-008 | U6 | VERIFIED |

No `Preserve` or `Revise` row above rests on an `UNVERIFIED` or `UNVERIFIABLE` citation.

## Coverage gaps

None opened. Every question this unit was dispatched to answer was answerable from artifacts
already in the repo; no new source was needed and none was sought.

## Non-material notes

<!-- No verdicts. No landing loop. Not corrections. -->

- Line-count nit: `web/src/learn/content/blackjack-basics.ts` is **625** lines, not the "624 L
  content" the P2 plan's U6 row (`:260`) states. Cosmetic; the plan's figure may have counted a
  different file set (the directory also holds `blackjack-basics.test.ts`). Nobody would build
  differently on this.
- `web/src/learn/controller.ts:294-296` carries a comment describing hand steps as "a later task"
  that has since shipped — stale but harmless prose inside a working file.
- `web/src/learn/controller.ts:45-46` says `opts` "is accepted to match the constructor contract
  shared with the later hand-step task; the explain/question/recap progression built here does not
  need it" — likewise stale; `opts` is now used at `:151` and `:158`.
- `web/src/learn/controller.ts:319-321` says `last_*` rules are "always false until a hand step
  (a later task) populates `state.session`" — the parenthetical is stale for the same reason.
- Naming collision noted (already known and recorded in `journal/decisions.md:33`):
  `AttemptRecord.outcomeId` (a skill id) vs `AttemptEngineContext.outcomes` (`HandOutcome[]`) in the
  same record. Engineering hygiene, no pedagogical content.
- `web/src/learn/feedback.ts` has no test file of its own in the unit's directory listing; the
  strings are exercised through `controller.test.ts`. Coverage-shape observation only.
