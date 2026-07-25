# Graded Decision Practice — Phase 4 first slice

> **Status: APPROVED 2026-07-25** (owner, as-is; recorded in `journal/decisions.md`). Phase 4 of
> the adaptive-learning arc, bounded to one activity type. Designs from
> `docs/superpowers/specs/2026-07-22-product-design-inputs.md` without reopening Phases 1–3.
>
> **Authority:** this document owns the graded-decision activity, its evidence record, and its
> practice pool. It does **not** own the skill graph, the activity taxonomy, session composition,
> or any curriculum sequence — those remain Phase 4 work, deliberately deferred (§9).

## 1. Why this slice, and why it is this small

Phase 4 as chartered spans the skill graph, learning outcomes across six domains, the activity
taxonomy, evidence and mastery rules, session composition, interaction UX, and a first slice. That
is four independent subsystems. This design takes **one activity, thin but complete** — reaching
from the strategy oracle all the way to a durable record — and defers the rest until a working
example exists to design them against.

The reason is a pattern this repo has now produced twice:

| Built, verified, QA-passed | Consumers |
|---|---|
| `basic_strategy_action` (`crates/blackjack-core/src/strategy.rs:140`) | none — called only by its own tests, not exposed over the wire |
| `ProgressStore` + versioned envelope | none — imported only by a QA harness |

Both are correct. Neither is wired to anything. A taxonomy or skill graph designed now would be the
third artifact of that kind. This slice instead ends with a learner making a decision the product
can actually grade, and wires both orphans in the process.

### What the product cannot do today

`HandStep` has exactly two modes (`web/src/learn/controller.ts:213`):

- `requestedAction` set → `correct = (action === requestedAction)`. The lesson names the action and
  checks compliance. This measures obedience, not decision-making.
- `live` → `correct = null`. Ungraded play.

**Neither grades a free decision.** The third mode — deal a hand, let the learner choose, grade
against the verified oracle — does not exist, and it is the product.

### Scope note on the existing `learn/` module

The shipped lesson layer is a **prototype placeholder** (owner, 2026-07-23) and is not a constraint
on this design. It stays running and untouched — not to protect it, but to keep something playable
and to give the P5 playtest a comparison. Nothing is deleted on a prediction. This design therefore
does **not** extend `Unit` / `LessonStep`, and defines its own shapes.

## 2. What this slice must answer

Two of the five playtest questions from the bridge spec §6, chosen because both are *structural*
rather than content — they constrain architecture without dragging curriculum work in:

- **P-3** — does mixed practice help this audience, or overwhelm beginners? Requires a mixed pool.
- **P-5** — does confidence rise faster than skill? Requires accuracy and confidence to be
  comparable **across sittings**, which is what forces durable evidence.

**P-1** (can decision-not-outcome separation be taught?) is *not* built here, but its hook is. Once
the confidence instrument exists, adding "was that a good decision?" after a hand that was right and
lost is a second prompt on an instrument already built. Design the hook; leave it unused.

## 2b. Product constraints (owner, 2026-07-23)

These are **product judgement, not evidence-backed** — recorded as such per bridge §5. They bind the
design anyway.

1. **The learning path must not be steep.** The learner should understand what is being asked and
   why. Confusion is a failure of the design, not of the learner.
2. **It must not be frustrating.**
3. **It is a game. It has to be fun.** Not a quiz with a card table drawn behind it.
4. **Prerequisite: this activity assumes table literacy.** It is only meaningful once the learner
   knows a strategy table exists and can read it. In any sequence, this drill sits *after* table
   introduction — it is practice, not first exposure. Sequencing itself belongs to the deferred
   curriculum work; this states the dependency so that work cannot forget it.
5. **Mastery means deciding correctly *without* the table.** Table-open is assisted; table-closed is
   independent. This is the project's real progress axis, and §5 records it per attempt.

### How this resolves the hardest hand

*16 vs dealer 10* is the most counterintuitive call in basic strategy and the most demoralising: you
hit correctly, you bust, and it feels like punishment for obedience. Constraints 1–3 would seem to
argue for removing it; §6 argues it is the single most necessary hand in the pool.

**Both are satisfied, because the frustration comes from the *outcome*, not the *decision*.** This
product already separates those two facts everywhere (`controller.ts:210,217`), and this activity
shows them apart by design (§4, step 6). The hand stays in — and its feedback must carry the
separation loudly: *you played that correctly; this hand loses more often than it wins, and that is
not your mistake.* That moment is not a frustration to be designed away. It is the clearest teaching
opportunity the product has, and it is precisely where P-1 later gets measured.

**If playtests show it demoralises rather than teaches, that is a finding, not a bug** — and it is
recoverable, because the pool is data.

## 3. Ownership and the boundary

One new wire command through the existing stateless `dispatch_json` door. No new language, runtime,
database, or boundary — **the Tool & Runtime Admission Protocol does not fire.**

```
{ command: 'strategy_action', session: SessionState, hand_index: number }
      → { type: 'strategy_action', data: Action | null }
```

**TypeScript sends the session and a hand index — not cards, total, softness, or legal actions.**
Rust derives all of it and calls the existing `basic_strategy_action`, which already takes
`legal_actions` and therefore can never name an action the simulator has not permitted. The learn
layer cannot regrade a rule (bridge §5) *by construction*, not by discipline.

`data: null` means **this hand has no decision** — natural, bust, or complete. The function already
returns `Ok(None)` for exactly those cases, so the activity gets its skip signal for free.

This is wire-changing, so the slice carries the overdue `web/scripts/check-wasm-fresh.sh` fix
(`Cargo.lock` and `build-wasm.sh` are currently invisible to it; PROGRESS records two missed slices).

## 4. One attempt

The order is load-bearing; step 4 is placed where it is specifically to defeat outcome bias.

```
1. DEAL        real shoe, arranged opening drawn from a mixed pool
2. CLASSIFY    "what kind of hand is this?"   hard 16 / soft 16 / pair of 8s
3. DECIDE      learner picks freely from legal actions — nothing suggested
4. CONFIDENCE  "how sure are you?"  ← BEFORE any result is shown
5. REVEAL      oracle's action vs the learner's → correct or not
6. PLAY OUT    hand resolves; outcome shown SEPARATELY from the grade
```

**Classification is a required graded step** (bridge §4.3). The prototype tells the learner a hand
is a soft total and then asks what to do — which means it is not measuring the skill. Real play
requires noticing *this is a hard 16, not a soft 16* first. Without a graded classification step,
mixing categories is decoration.

**Confidence is captured pre-reveal.** Asked afterwards, it measures how the learner feels about the
*result* — outcome bias contaminating the very instrument built to detect it.

**The outcome is shown, and shown apart.** A hand where the decision was right and the hand lost is
where the product's core commitment is either taught or not. This slice displays the separation; it
does not yet measure whether the learner internalises it (that is P-1).

Attempts where the oracle returns `null` are re-dealt and record nothing.

## 5. Evidence model

> **CORRECTED 2026-07-23, before implementation.** This section originally specified a new
> `DecisionAttempt` type. **That was wrong: the record already exists.** `web/src/progress/types.ts`
> defines `ProgressAttempt`, and it already carries almost everything specified below — including the
> two fields this design treated as novel. Defining a parallel type would have produced a *third*
> record shape for the same evidence. The corrected design is: **this slice produces
> `ProgressAttempt` values.** The original field list is kept below only as the requirements it must
> satisfy.
>
> This is the same error the slice exists to fix — designing a shape without checking what was
> already built — caught here by reading the code before planning rather than after.

**The durable record is `ProgressAttempt`** (`web/src/progress/types.ts`), already designed,
type-tested, and covered by the 14-gate contract suite. What it already provides:

| Requirement | Already in `ProgressAttempt` |
|---|---|
| skill id, renamed from `outcomeId` | `evidence.skillId` — *"Today's `outcomeId`, renamed"* |
| table open vs closed | `tableVisibility: 'open' \| 'hidden' \| 'not-applicable'` |
| graded by the oracle, profile pinned | `gradedBy: { authority: 'oracle', profileId }` |
| decision correct / incorrect | `disposition` — a union that also expresses *ungraded* and *abandoned* |
| hand outcome, never an input | `engine.outcomes` |
| identity & ordering | `attemptId`, `committedAtRevision`, `learnerKey`, `sessionId`, `occurredAt` |
| honest assistance | `assistance` |
| shoe traceability | `engine.seed`, `playerCardIds`, `dealerUpcardId`, `legalActions` |

Two notes on fit:

- **`errorClass` already includes `'outcome-bias'`** — the taxonomy anticipated this activity.
- **Confidence is the one genuine gap.** No field exists for it, because P-5 was not in view when
  that schema was written. It is added as an optional top-level `confidence: number | null`, which
  is free right now: `schemaVersion` is 1, there are **zero persisted learners**, and no consumer
  exists. It goes top-level rather than inside the opaque `response` because it is a property of the
  *attempt*, not of the response content, and P-5 must be answerable without parsing activity-owned
  JSON.

The chosen action and the oracle's action go in `response` (activity-owned, per ALR-008); the
classification step is a separate `ProgressAttempt` with `kind: 'classification'`.

**Original requirement list, retained as the acceptance target:**

```
identity          attemptId, learnerKey, sessionId, occurredAt, schemaVersion
skillId           renamed from outcomeId
profileId         'h17' | 's17'  — pinned
engine facts      seed, playerCardIds, dealerUpcardId, legalActions
classification    asked, response, correct
decision          chosen, oracle, correct
confidence        1–5, captured pre-reveal
handOutcome       recorded. never an input.
tableOpen         strategy table visible? assisted vs independent
assistance        only what was actually delivered
```

**Identity fields.** Today's record has no id, timestamp, schema version, or learner key, so two
identical wrong answers are byte-identical and indistinguishable — the reason PROGRESS states it
cannot support the approved idempotent revision-checked checkpoints. These four fields close that.
`learnerKey` is the already-approved **pseudonymous browser-local** key (ROADMAP, need-activated
platform capabilities); this slice introduces no account, no identity provider, and no personal data.

**`profileId` is pinned.** Closes an open question in PROGRESS: without it, evidence gathered under a
future S17 profile is indistinguishable from H17 evidence, silently mixing two different correct
answers into one accuracy figure.

**Decision and result are separated structurally.** `decision.correct` and `handOutcome` are distinct
fields and nothing computing progress may read the second.

**Assistance is honest.** The prototype escalates `none → retry → instruction` on retry count alone
with no instruction delivered (`controller.ts:118-126`); Phase 2 caught that mislabel propagating
into a test describing it as "a hinted attempt." A level is recorded here only if it was delivered.

**Traceable to a real shoe.** Seed plus card ids reconstruct any attempt — the honest-card-flow
constraint holding at the evidence layer.

**Where `skillId` values come from, given the skill graph is deferred.** This slice does not invent a
taxonomy and does not wait for one. It declares **only the ids its own pool needs** — the three
classification categories and their decisions — as plain data alongside the pool, reusing an existing
id from the shipped 16-skill taxonomy wherever one already means the same thing. The ids are data, not
a graph: no prerequisites, no ordering, no hierarchy. When the taxonomy phase runs, it either adopts
these ids or maps them, and `schemaVersion` carries the migration. **This is the one place the slice
could quietly grow into the deferred work — it must not.**

**`tableOpen` is the assistance that matters, and it is the project's mastery axis** (owner,
2026-07-23; §2b.5). Bridge §3 lists what shipped mastery lacks, including *no assisted-vs-independent
distinction*. This is that distinction: deciding correctly with the table visible is assisted;
deciding correctly with it closed is the real thing. Recording it per attempt costs one boolean and
makes "the learner is good at this" expressible for the first time.

**This slice ships with the table closed by default**, so its evidence is independent-decision
evidence — the higher-value kind, and the kind P-5 needs to compare confidence against genuine skill.
The toggle and the rendered chart are the immediate next slice; the field exists now so that slice
adds a capability rather than a migration.

**`assistance` stays separate from `tableOpen` and is always `'none'` here.** No hints, no retries, no
instruction — a decision is made once and graded. The field exists because the record outlives this
slice; recording a level never delivered is exactly the Phase 2 defect this design avoids. An
always-`'none'` field that is *true* beats a richer field that lies.

### Session, retention, mastery

- **Session** = one contiguous run from opening the practice surface to leaving it, with an id.
  PROGRESS asks "what is a session?"; this answers it only as far as P-5 needs and no further.
- **Retention: keep everything.** ~800 B/attempt measured; 1,000 decisions is under a megabyte.
  PROGRESS records no authority to import a cap, so inventing one would be a guess.
- **Mastery: measure, do not declare** (owner decision, 2026-07-23). The learner sees their accuracy;
  the app never announces "mastered" and nothing unlocks. Bridge §5 states any threshold chosen today
  is product judgement, not research-calibrated — so P5 sets the bar from data rather than this
  document setting it from nothing.

**Excluded from every progress calculation, enforced by test: `handOutcome` and `confidence`.**

## 6. The practice pool

**Built around confusable hands, not teaching categories.** Interleaving works by forcing
discrimination, so the pool makes discrimination hard deliberately:

| Hand | Classification | Correct play |
|---|---|---|
| 10 + 6 | hard 16 | Hit vs 10 |
| A + 5 | soft 16 | Hit — cannot bust |
| 8 + 8 | pair of 8s | Split |

Three hands that are all "16," three different right answers. Grouped by label, classification is
free; mixed, it is the skill.

**Dealer 10 and Ace are required.** `web/src/learn/situations.ts` restricts upcards to 4–7 so the
dealer can never hold a natural — right for narrating a lesson, wrong for a drill, because it removes
*16 vs 10*, the most counterintuitive call in basic strategy and the one most players get wrong. A
pool that avoids the hard cases measures nothing. Dealer naturals resolve with no decision, the
oracle returns `null`, and the hand is re-dealt unrecorded.

**Mixed by default** (CFL-007, resolved: block to introduce, interleave to practise). This is the
practice surface, so it is the mixed steady state. Selection is seeded for reproducibility, and
variants rotate so the pool cannot be learned by position.

## 7. Failure

- **Bridge/WASM failure, unsupported ruleset, or oracle error → fatal state, stated plainly.**
- **No TypeScript fallback for a strategy answer, ever.** A guessed grade would put blackjack truth
  in the UI layer. If the oracle did not answer, nothing is graded.
- **Storage failure → continue in memory and tell the learner it is not being saved.** Never a
  silent loss, never a faked success.

## 8. Proof

- New wire variant extends the existing evidence pattern — Rust-emitted golden fixtures, runtime
  validation, compile-time contract tests — as `stack-boundaries.md` requires of every new variant.
- Learning logic lives in **plain TypeScript modules, not React components**, so it is testable
  headless and survives a UI platform change (see `stack-boundaries.md`, banked mobile evidence).
- Storage proven by the 14-gate contract suite in **real browsers**. `fake-indexeddb` stays rejected:
  it would prove the multi-tab gate against a simulation, and that gate is the whole evidence for the
  approved `appendAttempt` deviation.
- **The production bundle delta is measured here**, discharging the still-conditional `idb` admission.
- **The two highest-value tests assert the exclusions:** no progress calculation reads `handOutcome`;
  none reads `confidence`.

<!-- wl:criteria -->
## Acceptance criteria (four elements)

> Element mapping added at approval (2026-07-25). The criteria themselves are unchanged from the
> authored design; only the element each one discharges is named, so the craft judge can measure
> against them.

1. **Complete — Fire** — a learner is dealt a hand from a real shoe, classifies it, chooses freely from
   legal actions, rates confidence before any reveal, and receives a grade computed by
   `basic_strategy_action` over the wire; the attempt persists through `ProgressStore` and is
   readable in a later session.
2. **Honest — Water** — decision-correctness is never derived from `handOutcome`; confidence never enters a
   progress figure; assistance is recorded only when delivered; no strategy answer is ever produced
   by TypeScript. Each is asserted by a test, not by convention.
3. **Bounded — Air** — one activity type. No skill graph, no activity taxonomy, no curriculum sequence, no
   mastery declaration, no gating or unlocks, and no change to the existing `learn/` prototype.
4. **Answerable — Earth** — the recorded evidence is sufficient to answer P-3 and P-5 from data alone,
   without further instrumentation.
<!-- /wl:criteria -->

## 9. Explicitly deferred

The skill graph and prerequisites; the activity taxonomy; learning outcomes for probability, EV and
variance; session composition; mastery thresholds and gating; retiring the `learn/` prototype; and
the P-1 self-report instrument (hook designed, unused).

**Named as the immediate next slice, not a vague later:** the strategy-table toggle and rendered
chart. `tableOpen` is recorded from day one (§5), so that slice adds a capability rather than
migrating a schema. It is what makes §2b.5's definition of mastery — right answers *without* the
table — directly measurable.

**Known accepted debt:** this introduces a second progression concept alongside the prototype's
`requiredChecks`. Accepted deliberately rather than pre-solved by a shared abstraction — building an
abstraction for two consumers when one exists is how the oracle and `ProgressStore` came to sit
unused. The taxonomy phase resolves it, with two real consumers to design against.
