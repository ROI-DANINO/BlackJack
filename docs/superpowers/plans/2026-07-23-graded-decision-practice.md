# Graded Decision Practice Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: use `subagent-driven-development` (recommended) or
> `executing-plans` to run this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for
> tracking.

**Goal:** Ship one activity — a blackjack hand dealt from a real shoe where the learner classifies
it, decides freely, rates confidence, and is graded by the verified Rust basic-strategy oracle, with
every attempt persisted as durable evidence.

**Architecture:** One new stateless command (`strategy_action`) through the existing `dispatch_json`
door exposes `basic_strategy_action`, which has never been reachable from the browser. A
framework-free TypeScript controller owns the activity's state machine and grading flow; React only
renders it. Attempts are written as `ProgressAttempt` records through the existing `ProgressStore`
port — giving both orphaned foundations their first real consumer.

**Tech Stack:** Rust (blackjack-core) → wasm-bindgen → TypeScript/React 18 + Vite 5, Vitest 2,
Playwright, `idb` 8.0.3. No new language, runtime, database, or boundary — the Tool & Runtime
Admission Protocol does not fire.

**Spec:** `docs/superpowers/specs/2026-07-23-graded-decision-practice-design.md` — **approved as-is by
the owner 2026-07-25**, recorded in `journal/decisions.md`. (This line previously cited `d10e8d3` as
the approval; `d10e8d3` is the spec's own authoring commit, so that citation was circular — no
approval act existed at the time the plan was written.)

## Global Constraints

Copied from the spec. Every task inherits these.

- **No TypeScript fallback for a strategy answer, ever.** If the oracle does not answer, nothing is
  graded. A guessed grade would put blackjack truth in the UI layer.
- **No progress calculation may read `engine.outcomes` (hand result) or `confidence`.** Asserted by
  test, not convention.
- **Learning logic lives in plain TypeScript modules, never inside React components.** React renders
  and dispatches; it owns no rules and no grading.
- **The existing `web/src/learn/` prototype is not modified.** Not one line.
- **TypeScript never sends blackjack facts over the wire** — no totals, softness, or legal actions.
  It sends the session; Rust derives the rest.
- **Mastery is measured, never declared.** No thresholds, no gating, no unlocks, no "mastered" copy.
- **`assistance` is `'none'` throughout this slice**, because none is delivered. Recording a level
  that was never given is the Phase 2 defect being avoided.
- **Table ships closed** (`tableVisibility: 'hidden'`); the field is recorded from day one.
- Product constraints (spec §2b): not steep, not frustrating, fun. Copy must never blame the learner
  for a correct decision that lost.

---

## File Structure

**Rust**
- Modify `crates/blackjack-core/src/boundary.rs` — add `CoreCommand::StrategyAction` and
  `CoreResponse::StrategyAction`; derive hand/upcard/ruleset/legal-actions from the session.
- Modify `crates/blackjack-core/tests/strategy_tests.rs` — boundary-level tests for the new command.

**Bridge (wire contract)**
- Modify `web/src/bridge/types.ts` — one command variant, one response variant.
- Modify `web/src/bridge/validate.ts` — accept and guard `strategy_action`.
- Modify `web/src/bridge/core-client.ts` — expose the call.

**Practice activity (all framework-free)**
- Create `web/src/practice/pool.ts` — confusable-hand openings + skill ids. Data only.
- Create `web/src/practice/oracle.ts` — the only path to a strategy answer.
- Create `web/src/practice/attempt.ts` — builds `ProgressAttempt` drafts.
- Create `web/src/practice/controller.ts` — the state machine.
- Create `web/src/practice/boundary.test.ts` — the exclusion assertions.

**Progress**
- Modify `web/src/progress/types.ts` — add `confidence`.

**UI (thin)**
- Create `web/src/app/Practice.tsx` — renders controller state.
- Modify `web/src/app/App.tsx:8,12,36` — add the `practice` mode.

**Passengers**
- Modify `web/scripts/check-wasm-fresh.sh:12` — watch `Cargo.lock` and `build-wasm.sh`.
- Create `web/qa/practice/run.ts` + `web/package.json` script — feature QA.

---

### Task 1: Fix the WASM freshness guard

Independent of everything else and currently broken by omission — `Cargo.lock` and `build-wasm.sh`
are invisible to it, so a dependency bump or a build-script change ships a stale engine silently.
PROGRESS records it missing two slices. It goes first so every later task is guarded by it.

**Files:**
- Modify: `web/scripts/check-wasm-fresh.sh:12`

**Interfaces:**
- Consumes: nothing.
- Produces: nothing importable. Behavioural guarantee only — `npm run dev|build|test` fails if the
  wasm artifact is older than any Rust source, `Cargo.toml`, `Cargo.lock`, or `build-wasm.sh`.

- [ ] **Step 1: Write the failing test**

Create `web/scripts/check-wasm-fresh.test.sh`:

```bash
#!/usr/bin/env bash
# Proves the freshness guard sees Cargo.lock and build-wasm.sh, not just crate sources.
set -uo pipefail
cd "$(dirname "$0")/../.."
WASM=web/src/bridge/wasm/blackjack_core_bg.wasm
[[ -f "$WASM" ]] || { echo "SKIP: build wasm first"; exit 1; }

fail=0
for f in Cargo.lock web/scripts/build-wasm.sh; do
  touch "$f"
  if bash web/scripts/check-wasm-fresh.sh 2>/dev/null; then
    echo "FAIL: guard passed despite $f being newer than the wasm artifact"
    fail=1
  else
    echo "ok: guard caught $f"
  fi
done
touch "$WASM"   # restore freshness
exit $fail
```

- [ ] **Step 2: Run it, confirm the failure**

Run: `bash web/scripts/check-wasm-fresh.test.sh`
Expected: FAIL — "guard passed despite Cargo.lock being newer" and the same for `build-wasm.sh`.

- [ ] **Step 3: Write the minimal implementation**

In `web/scripts/check-wasm-fresh.sh`, replace line 12:

```bash
NEWER=$(find crates/blackjack-core/src crates/blackjack-core/Cargo.toml \
             Cargo.lock web/scripts/build-wasm.sh \
             -type f -newer "$WASM" -print -quit)
```

- [ ] **Step 4: Run it, confirm the pass**

Run: `bash web/scripts/check-wasm-fresh.test.sh`
Expected: PASS — "ok: guard caught Cargo.lock", "ok: guard caught web/scripts/build-wasm.sh".

- [ ] **Step 5: Commit**

```bash
git add web/scripts/check-wasm-fresh.sh web/scripts/check-wasm-fresh.test.sh
git commit -m "fix(wasm-fresh): watch Cargo.lock and build-wasm.sh, with a test that proves it"
```

---

### Task 2: Expose the strategy oracle over the wire

`basic_strategy_action` is verified, QA-passed, and called by nothing but its own tests. This makes
it reachable. TypeScript sends **only the session** — not `hand_index` as the spec's §3 sketch
suggested, because `RoundState.active_hand_index` already names the hand and
`current_legal_actions` (`session.rs:143`) sets the precedent. This sends *less* over the wire, so
it strengthens the spec's rule rather than deviating from it.

**Files:**
- Modify: `crates/blackjack-core/src/boundary.rs:18-52` (command enum), `:56-62` (response enum),
  `:64-107` (handler)
- Test: `crates/blackjack-core/tests/strategy_tests.rs`

**Interfaces:**
- Consumes: `basic_strategy_action(&HandState, &Card, &Ruleset, &[Action]) -> Result<Option<Action>, String>`
  (`strategy.rs:140`); `current_legal_actions(&SessionState) -> Result<Vec<Action>, String>`.
- Produces: `CoreCommand::StrategyAction { session: SessionState }` →
  `CoreResponse::StrategyAction(Option<Action>)`, serialising as
  `{"type":"strategy_action","data":"hit"|"stand"|"double"|"split"|null}`.

- [ ] **Step 1: Write the failing test**

Append to `crates/blackjack-core/tests/strategy_tests.rs`:

```rust
use blackjack_core::{CoreCommand, CoreResponse, dispatch_json, start_session_with_prefix};

/// A hard 16 vs dealer 10 must return Hit — the decision most players get wrong.
#[test]
fn strategy_action_returns_hit_for_hard_16_vs_ten() {
    let prefix = vec![
        preset("ten", "spades"),   // player
        preset("ten", "hearts"),   // dealer up
        preset("six", "clubs"),    // player
    ];
    let mut session = start_session_with_prefix("t", 1000, 10, None, prefix).unwrap();
    blackjack_core::start_round(&mut session, None).unwrap();

    let response = blackjack_core::handle_command(CoreCommand::StrategyAction { session }).unwrap();
    assert_eq!(response, CoreResponse::StrategyAction(Some(blackjack_core::Action::Hit)));
}

/// No decision exists on a natural — the activity uses this as its re-deal signal.
#[test]
fn strategy_action_returns_none_for_a_natural() {
    let prefix = vec![
        preset("ace", "spades"),
        preset("six", "diamonds"),
        preset("king", "hearts"),
    ];
    let mut session = start_session_with_prefix("t", 1000, 10, None, prefix).unwrap();
    blackjack_core::start_round(&mut session, None).unwrap();

    let response = blackjack_core::handle_command(CoreCommand::StrategyAction { session }).unwrap();
    assert_eq!(response, CoreResponse::StrategyAction(None));
}

/// The JSON boundary shape the browser actually receives.
#[test]
fn strategy_action_serialises_over_dispatch_json() {
    let prefix = vec![
        preset("ten", "spades"),
        preset("ten", "hearts"),
        preset("six", "clubs"),
    ];
    let mut session = start_session_with_prefix("t", 1000, 10, None, prefix).unwrap();
    blackjack_core::start_round(&mut session, None).unwrap();

    let input = serde_json::to_string(&CoreCommand::StrategyAction { session }).unwrap();
    let out = dispatch_json(&input);
    assert!(out.contains(r#""type":"strategy_action""#), "got {out}");
    assert!(out.contains(r#""data":"hit""#), "got {out}");
}
```

Add this helper near the top of the file if one does not already exist:

```rust
fn preset(rank: &str, suit: &str) -> blackjack_core::PresetCard {
    serde_json::from_str(&format!(r#"{{"rank":"{rank}","suit":"{suit}"}}"#)).unwrap()
}
```

- [ ] **Step 2: Run it, confirm the failure**

Run: `cargo test -p blackjack-core --test strategy_tests strategy_action`
Expected: FAIL — compile error, `no variant named StrategyAction found for enum CoreCommand`.

- [ ] **Step 3: Write the minimal implementation**

In `crates/blackjack-core/src/boundary.rs`, add to `CoreCommand` (after `CheckStrategyCompatibility`):

```rust
    StrategyAction {
        session: SessionState,
    },
```

Add to `CoreResponse`:

```rust
    StrategyAction(Option<Action>),
```

Add to the `handle_command` match:

```rust
        CoreCommand::StrategyAction { session } => {
            let round = session
                .round
                .as_ref()
                .ok_or_else(|| "no active round".to_string())?;
            let hand = round
                .hands
                .get(round.active_hand_index)
                .ok_or_else(|| "active hand missing".to_string())?;
            let upcard = round
                .dealer
                .cards
                .first()
                .ok_or_else(|| "dealer has no upcard".to_string())?;
            let legal = current_legal_actions(&session)?;
            let action = basic_strategy_action(hand, upcard, &session.ruleset, &legal)?;
            Ok(CoreResponse::StrategyAction(action))
        }
```

Extend the `use crate::{...}` list at `boundary.rs:1-5` with `basic_strategy_action`.

- [ ] **Step 4: Run it, confirm the pass**

Run: `cargo test -p blackjack-core && cargo fmt --check && cargo clippy -- -D warnings`
Expected: PASS — all existing tests plus the three new ones; fmt and clippy clean.

- [ ] **Step 5: Commit**

```bash
git add crates/blackjack-core/src/boundary.rs crates/blackjack-core/tests/strategy_tests.rs
git commit -m "feat(core): expose basic_strategy_action as the strategy_action command"
```

---

### Task 3: Carry the command across the wire contract

**Files:**
- Modify: `web/src/bridge/types.ts:87` (command union), `:94` (response union)
- Modify: `web/src/bridge/validate.ts:24-32`
- Modify: `web/src/bridge/core-client.ts`
- Test: `web/src/bridge/validate.test.ts`

**Interfaces:**
- Consumes: Task 2's JSON shape.
- Produces: `CoreClient.strategyAction(session: SessionState): Action | null`.

- [ ] **Step 1: Write the failing test**

Append to `web/src/bridge/validate.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { validateEnvelope } from './validate';

describe('strategy_action envelope', () => {
  it('accepts a named action', () => {
    const out = validateEnvelope({ status: 'ok', response: { type: 'strategy_action', data: 'hit' } });
    expect(out).toEqual({ status: 'ok', response: { type: 'strategy_action', data: 'hit' } });
  });

  it('accepts null — the no-decision signal', () => {
    const out = validateEnvelope({ status: 'ok', response: { type: 'strategy_action', data: null } });
    expect(out.status).toBe('ok');
  });

  it('rejects an action the engine could never emit', () => {
    expect(() =>
      validateEnvelope({ status: 'ok', response: { type: 'strategy_action', data: 'surrender' } }),
    ).toThrow(/malformed strategy action/);
  });
});
```

- [ ] **Step 2: Run it, confirm the failure**

Run: `npm test -w web -- validate`
Expected: FAIL — "ok envelope has malformed response" on the first case, because `strategy_action`
is not an accepted response type.

- [ ] **Step 3: Write the minimal implementation**

`web/src/bridge/types.ts` — add to the command union (line 87 area):

```ts
  | { command: 'strategy_action'; session: SessionState };
```

and to the response union (line 94 area):

```ts
  | { type: 'strategy_action'; data: Action | null };
```

`web/src/bridge/validate.ts` — extend the type check at line 24 and add the guard:

```ts
    if (!r || (r.type !== 'session' && r.type !== 'actions' && r.type !== 'hand_facts'
      && r.type !== 'strategy_compatibility' && r.type !== 'strategy_action') || !('data' in r)) {
      throw new BridgeError('ok envelope has malformed response');
    }
    if (r.type === 'strategy_action'
      && r.data !== null
      && r.data !== 'hit' && r.data !== 'stand' && r.data !== 'double' && r.data !== 'split') {
      throw new BridgeError('malformed strategy action');
    }
```

`web/src/bridge/core-client.ts` — add the method, following the existing
`checkStrategyCompatibility` pattern:

```ts
  strategyAction(session: SessionState): Action | null {
    const out = this.call({ command: 'strategy_action', session });
    if (out.type !== 'strategy_action') {
      throw new BridgeError(`expected strategy_action, got ${out.type}`);
    }
    return out.data;
  }
```

- [ ] **Step 4: Run it, confirm the pass**

Run: `npm test -w web && npm run build -w web`
Expected: PASS — all web tests green; `tsc --noEmit` clean.

- [ ] **Step 5: Commit**

```bash
git add web/src/bridge/types.ts web/src/bridge/validate.ts web/src/bridge/core-client.ts web/src/bridge/validate.test.ts
git commit -m "feat(bridge): carry strategy_action across the wire contract"
```

---

### Task 4: Add `confidence` to the durable record

The one genuine gap in `ProgressAttempt`. Free now — `schemaVersion` is 1, there are zero persisted
learners, and no consumer exists. Top-level rather than inside the opaque `response`, because P-5
must be answerable without parsing activity-owned JSON.

**Files:**
- Modify: `web/src/progress/types.ts` (the `ProgressAttempt` type)
- Test: `web/src/progress/types.test.ts`

**Interfaces:**
- Produces: `ProgressAttempt.confidence: number | null`.

- [ ] **Step 1: Write the failing test**

Append to `web/src/progress/types.test.ts`:

```ts
import { describe, expectTypeOf, it } from 'vitest';
import type { ProgressAttempt } from './types';

describe('ProgressAttempt.confidence', () => {
  it('is an optional-by-null self-rating, not a mastery input', () => {
    expectTypeOf<ProgressAttempt['confidence']>().toEqualTypeOf<number | null>();
  });
});
```

- [ ] **Step 2: Run it, confirm the failure**

Run: `npm test -w web -- progress/types`
Expected: FAIL — `Property 'confidence' does not exist on type 'ProgressAttempt'`.

- [ ] **Step 3: Write the minimal implementation**

In `web/src/progress/types.ts`, inside `ProgressAttempt`, directly after the `assistance` /
`tableVisibility` / `presentation` group:

```ts
  // --- self-report (P-5). Captured BEFORE any result is revealed, so it rates the DECISION and not
  // the outcome. STORED ONLY. It is never an input to mastery, progression, or any accuracy figure:
  // §1.5 of the design inputs shows practice raises confidence even where outcomes are
  // uncontrollable, so treating it as evidence of skill would manufacture false confidence.
  // Enforced by web/src/practice/boundary.test.ts, not by convention.
  confidence: number | null; // 1–5, or null when not asked
```

- [ ] **Step 4: Run it, confirm the pass**

Run: `npm test -w web -- progress && npm run build -w web`
Expected: PASS — the type test passes and the existing contract/canonical/boundary suites stay green.

- [ ] **Step 5: Commit**

```bash
git add web/src/progress/types.ts web/src/progress/types.test.ts
git commit -m "feat(progress): record decision confidence, stored and never scored"
```

---

### Task 5: The confusable-hand pool

Data only, mirroring `learn/situations.ts`'s deliberate no-functions rule so the pool stays
deep-equal under JSON round-trip. Grouped by *confusability*, not by teaching label: three hands
that are all "16" with three different right answers.

**Files:**
- Create: `web/src/practice/pool.ts`
- Test: `web/src/practice/pool.test.ts`

**Interfaces:**
- Produces: `PRACTICE_POOL: PracticeOpening[]` where
  `PracticeOpening = { id: string; skillId: string; classification: 'hard' | 'soft' | 'pair'; cards: PresetCard[] }`.
  `cards` is `[player-first, dealer-up, player-second]`, the ordering `situations.ts:1-4` documents.
- Produces: `CLASSIFICATION_CHOICES: readonly ['hard', 'soft', 'pair']`.

- [ ] **Step 1: Write the failing test**

Create `web/src/practice/pool.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { PRACTICE_POOL } from './pool';

describe('the practice pool', () => {
  it('is pure data — survives a JSON round trip unchanged', () => {
    expect(JSON.parse(JSON.stringify(PRACTICE_POOL))).toEqual(PRACTICE_POOL);
  });

  it('includes dealer ten and ace — the hard cases a drill must not avoid', () => {
    const upcards = PRACTICE_POOL.map((o) => o.cards[1]!.rank);
    expect(upcards).toContain('ten');
    expect(upcards).toContain('ace');
  });

  it('contains confusable sets — all three classifications appear', () => {
    const kinds = new Set(PRACTICE_POOL.map((o) => o.classification));
    expect(kinds).toEqual(new Set(['hard', 'soft', 'pair']));
  });

  it('has unique ids', () => {
    const ids = PRACTICE_POOL.map((o) => o.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
```

- [ ] **Step 2: Run it, confirm the failure**

Run: `npm test -w web -- practice/pool`
Expected: FAIL — `Failed to resolve import "./pool"`.

- [ ] **Step 3: Write the minimal implementation**

Create `web/src/practice/pool.ts`:

```ts
// Pure, serializable openings for graded decision practice. DATA ONLY — no functions here, so
// JSON.parse(JSON.stringify(PRACTICE_POOL)) deep-equals PRACTICE_POOL (the situations.ts:6-8 rule).
//
// Each opening is an ORDER for the top of a real, shuffled six-deck shoe:
// [player-first, dealer-up, player-second]. The hole card and every later card still come from the
// honest shuffled remainder.
//
// Grouped by CONFUSABILITY, not by teaching label (design §6): the three 16s below have three
// different correct plays, so classification cannot be skipped. Dealer ten and ace are present on
// purpose — a pool that avoids them removes 16-vs-10 and measures nothing.

import type { PresetCard } from '../bridge/types';

const C = (rank: PresetCard['rank'], suit: PresetCard['suit']): PresetCard => ({ rank, suit });

export const CLASSIFICATION_CHOICES = ['hard', 'soft', 'pair'] as const;
export type Classification = (typeof CLASSIFICATION_CHOICES)[number];

export type PracticeOpening = {
  id: string;
  skillId: string;
  classification: Classification;
  cards: PresetCard[];
};

export const PRACTICE_POOL: PracticeOpening[] = [
  // The confusable 16s — same total, three different right answers.
  { id: 'hard-16-vs-10', skillId: 'hard-totals', classification: 'hard',
    cards: [C('ten', 'spades'), C('ten', 'hearts'), C('six', 'clubs')] },
  { id: 'soft-16-vs-10', skillId: 'soft-totals', classification: 'soft',
    cards: [C('ace', 'spades'), C('ten', 'diamonds'), C('five', 'hearts')] },
  { id: 'pair-8s-vs-10', skillId: 'pairs', classification: 'pair',
    cards: [C('eight', 'spades'), C('ten', 'clubs'), C('eight', 'hearts')] },

  // The same three against an ace.
  { id: 'hard-16-vs-ace', skillId: 'hard-totals', classification: 'hard',
    cards: [C('nine', 'clubs'), C('ace', 'spades'), C('seven', 'diamonds')] },
  { id: 'soft-17-vs-ace', skillId: 'soft-totals', classification: 'soft',
    cards: [C('ace', 'clubs'), C('ace', 'hearts'), C('six', 'spades')] },
  { id: 'pair-9s-vs-ace', skillId: 'pairs', classification: 'pair',
    cards: [C('nine', 'spades'), C('ace', 'diamonds'), C('nine', 'hearts')] },

  // Weak upcards, so the pool is not uniformly punishing (design §2b).
  { id: 'hard-12-vs-6', skillId: 'hard-totals', classification: 'hard',
    cards: [C('ten', 'spades'), C('six', 'diamonds'), C('two', 'hearts')] },
  { id: 'soft-18-vs-6', skillId: 'soft-totals', classification: 'soft',
    cards: [C('ace', 'hearts'), C('six', 'clubs'), C('seven', 'spades')] },
  { id: 'pair-8s-vs-6', skillId: 'pairs', classification: 'pair',
    cards: [C('eight', 'clubs'), C('six', 'hearts'), C('eight', 'diamonds')] },
];
```

- [ ] **Step 4: Run it, confirm the pass**

Run: `npm test -w web -- practice/pool`
Expected: PASS — all four assertions.

- [ ] **Step 5: Commit**

```bash
git add web/src/practice/pool.ts web/src/practice/pool.test.ts
git commit -m "feat(practice): add the confusable-hand pool, dealer ten and ace included"
```

---

### Task 6: The attempt builder

Turns one completed decision into a `ProgressAttempt` draft. Isolated from the controller so the
record shape is testable without running a state machine.

**Files:**
- Create: `web/src/practice/attempt.ts`
- Test: `web/src/practice/attempt.test.ts`

**Interfaces:**
- Consumes: `ProgressAttemptDraft` (`progress/store.ts`), `PracticeOpening` (Task 5),
  `ProgressAttempt.confidence` (Task 4).
- Produces:
  `buildDecisionAttempt(input: DecisionAttemptInput): ProgressAttemptDraft` and
  `buildClassificationAttempt(input: ClassificationAttemptInput): ProgressAttemptDraft`.

- [ ] **Step 1: Write the failing test**

Create `web/src/practice/attempt.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { buildDecisionAttempt } from './attempt';
import type { LearnerKey } from '../progress/types';

const base = {
  attemptId: 'a1',
  learnerKey: 'lk1' as LearnerKey,
  sessionId: 's1',
  presentationId: 'p1',
  opening: { id: 'hard-16-vs-10', skillId: 'hard-totals', classification: 'hard' as const, cards: [] },
  chosen: 'stand' as const,
  oracle: 'hit' as const,
  confidence: 4,
  occurredAt: '2026-07-23T10:00:00.000Z',
  elapsedMs: 3200,
  profileId: 'h17' as const,
  engine: {
    seed: 'seed-1', playerCardIds: ['c1', 'c2'], dealerUpcardId: 'c3',
    legalActions: ['hit', 'stand'] as const, outcomes: [], wager: 10,
  },
};

describe('buildDecisionAttempt', () => {
  it('grades against the oracle, not the hand result', () => {
    const a = buildDecisionAttempt({ ...base });
    expect(a.disposition).toEqual({ status: 'graded', correct: false, errorClass: 'strategy-recall' });
    expect(a.gradedBy).toEqual({ authority: 'oracle', profileId: 'h17' });
  });

  it('marks a matching choice correct', () => {
    const a = buildDecisionAttempt({ ...base, chosen: 'hit' });
    expect(a.disposition).toEqual({ status: 'graded', correct: true });
  });

  it('records confidence and the closed table', () => {
    const a = buildDecisionAttempt({ ...base });
    expect(a.confidence).toBe(4);
    expect(a.tableVisibility).toBe('hidden');
  });

  it('never claims assistance it did not deliver', () => {
    expect(buildDecisionAttempt({ ...base }).assistance).toBe('none');
  });

  it('pins the strategy profile into the evidence', () => {
    expect(buildDecisionAttempt({ ...base, profileId: 's17' }).gradedBy.profileId).toBe('s17');
  });
});
```

- [ ] **Step 2: Run it, confirm the failure**

Run: `npm test -w web -- practice/attempt`
Expected: FAIL — `Failed to resolve import "./attempt"`.

- [ ] **Step 3: Write the minimal implementation**

Create `web/src/practice/attempt.ts`:

```ts
// Builds durable ProgressAttempt drafts from one completed practice decision.
//
// The record type is progress/types.ts's ProgressAttempt — NOT a new type. The durable schema
// already carries skillId, tableVisibility, gradedBy.authority='oracle', and a pinned profileId;
// defining a parallel shape would be a third record for the same evidence (design §5, corrected).

import type { Action, StrategyProfileId } from '../bridge/types';
import type { ProgressAttemptDraft } from '../progress/store';
import type { AttemptEngineContext, LearnerKey } from '../progress/types';
import type { Classification, PracticeOpening } from './pool';

const ACTIVITY = {
  activityId: 'graded-decision-practice',
  activityVersion: '1',
  catalogVersion: 'practice-1',
} as const;

const SUBJECT_ID = 'blackjack-strategy';
const UNIT_ID = 'graded-decision-practice';

export type DecisionAttemptInput = {
  attemptId: string;
  learnerKey: LearnerKey;
  sessionId: string;
  presentationId: string;
  opening: PracticeOpening;
  chosen: Action;
  oracle: Action;
  confidence: number | null;
  occurredAt: string;
  elapsedMs: number | null;
  profileId: StrategyProfileId;
  engine: AttemptEngineContext;
};

export function buildDecisionAttempt(input: DecisionAttemptInput): ProgressAttemptDraft {
  const correct = input.chosen === input.oracle;
  return {
    attemptId: input.attemptId,
    learnerKey: input.learnerKey,
    sessionId: input.sessionId,
    presentationId: input.presentationId,
    attemptOrdinal: 1, // no retries in this slice
    evidence: {
      subjectId: SUBJECT_ID, unitId: UNIT_ID,
      skillId: input.opening.skillId, cellId: input.opening.id,
    },
    kind: 'action',
    mode: 'assessment',
    interaction: 'engine-hand',
    difficultyBand: null,
    assistance: 'none',        // none is delivered; recording more would be a lie
    tableVisibility: 'hidden', // table ships closed this slice
    presentation: 'canonical',
    confidence: input.confidence,
    response: { chosen: input.chosen, oracle: input.oracle },
    disposition: correct
      ? { status: 'graded', correct: true }
      : { status: 'graded', correct: false, errorClass: 'strategy-recall' },
    gradedBy: { authority: 'oracle', profileId: input.profileId },
    engine: input.engine,
    activity: { ...ACTIVITY, seed: input.engine.seed, params: { openingId: input.opening.id } },
    occurredAt: input.occurredAt,
    elapsedMs: input.elapsedMs,
  };
}

export type ClassificationAttemptInput = Omit<
  DecisionAttemptInput, 'chosen' | 'oracle' | 'confidence'
> & { chosen: Classification };

export function buildClassificationAttempt(input: ClassificationAttemptInput): ProgressAttemptDraft {
  const correct = input.chosen === input.opening.classification;
  return {
    ...buildDecisionAttempt({
      ...input,
      chosen: 'hit', oracle: 'hit', confidence: null, // placeholders, overwritten below
    }),
    kind: 'classification',
    interaction: 'multiple-choice',
    confidence: null,
    response: { chosen: input.chosen, expected: input.opening.classification },
    disposition: correct
      ? { status: 'graded', correct: true }
      : { status: 'graded', correct: false, errorClass: 'hand-classification' },
  };
}
```

- [ ] **Step 4: Run it, confirm the pass**

Run: `npm test -w web -- practice/attempt && npm run build -w web`
Expected: PASS — five assertions green, `tsc --noEmit` clean.

- [ ] **Step 5: Commit**

```bash
git add web/src/practice/attempt.ts web/src/practice/attempt.test.ts
git commit -m "feat(practice): build ProgressAttempt drafts from graded decisions"
```

---

### Task 7: The practice controller

The state machine, framework-free. React must be able to render it without owning any of it.

**Files:**
- Create: `web/src/practice/controller.ts`
- Test: `web/src/practice/controller.test.ts`

**Interfaces:**
- Consumes: `CoreClient.strategyAction` (Task 3), `PRACTICE_POOL` (Task 5),
  `buildDecisionAttempt` / `buildClassificationAttempt` (Task 6), `ProgressStore.appendAttempt`.
- Produces: `PracticeController` with `getState()`, `subscribe(fn)`, `start()`, `classify(c)`,
  `decide(a)`, `rateConfidence(n)`, `next()`; and
  `PracticeState = { phase: 'idle'|'classify'|'decide'|'confidence'|'reveal'|'resolved'|'fatal'; ... }`.

- [ ] **Step 1: Write the failing test**

Create `web/src/practice/controller.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { PracticeController } from './controller';
import { makeStubDeps } from './test-support';

describe('the practice loop order', () => {
  it('asks for classification before the decision', async () => {
    const c = new PracticeController(makeStubDeps({ oracle: 'hit' }));
    await c.start();
    expect(c.getState().phase).toBe('classify');
  });

  it('asks for confidence BEFORE revealing the grade', async () => {
    const c = new PracticeController(makeStubDeps({ oracle: 'hit' }));
    await c.start();
    c.classify('hard');
    c.decide('stand');
    expect(c.getState().phase).toBe('confidence');
    expect(c.getState().revealed).toBe(false);
  });

  it('reveals only after confidence is recorded', async () => {
    const c = new PracticeController(makeStubDeps({ oracle: 'hit' }));
    await c.start();
    c.classify('hard'); c.decide('stand'); await c.rateConfidence(4);
    const s = c.getState();
    expect(s.phase).toBe('reveal');
    expect(s.decisionCorrect).toBe(false);
    expect(s.oracleAction).toBe('hit');
  });
});

describe('failure is loud', () => {
  it('goes fatal when the oracle errors — it never guesses a grade', async () => {
    const c = new PracticeController(makeStubDeps({ oracleThrows: true }));
    await c.start();
    expect(c.getState().phase).toBe('fatal');
    expect(c.getState().oracleAction).toBeNull();
  });

  it('re-deals without recording when the hand has no decision', async () => {
    const deps = makeStubDeps({ oracle: null, thenOracle: 'hit' });
    const c = new PracticeController(deps);
    await c.start();
    expect(c.getState().phase).toBe('classify');
    expect(deps.appended).toHaveLength(0);
  });

  it('keeps playing and says so when storage fails', async () => {
    const deps = makeStubDeps({ oracle: 'hit', storageFails: true });
    const c = new PracticeController(deps);
    await c.start();
    c.classify('hard'); c.decide('hit'); await c.rateConfidence(3);
    expect(c.getState().phase).toBe('reveal');
    expect(c.getState().notice).toMatch(/not being saved/i);
  });
});

describe('evidence', () => {
  it('records two attempts per hand — classification and decision', async () => {
    const deps = makeStubDeps({ oracle: 'hit' });
    const c = new PracticeController(deps);
    await c.start();
    c.classify('hard'); c.decide('hit'); await c.rateConfidence(5);
    expect(deps.appended.map((a) => a.kind)).toEqual(['classification', 'action']);
  });
});
```

Create `web/src/practice/test-support.ts` alongside it with a stub `CoreClient`, an in-memory
`appendAttempt` that pushes to `deps.appended`, a fixed clock, and a seeded id minter. Model it on
`web/src/progress/fixtures.ts`, which already provides deterministic learner keys and drafts.

- [ ] **Step 2: Run it, confirm the failure**

Run: `npm test -w web -- practice/controller`
Expected: FAIL — `Failed to resolve import "./controller"`.

- [ ] **Step 3: Write the minimal implementation**

Create `web/src/practice/controller.ts` implementing the phase machine
`idle → classify → decide → confidence → reveal → resolved`, with these rules:

```ts
// The graded-decision practice state machine. FRAMEWORK-FREE by constraint: React renders this and
// dispatches into it, and owns none of it.
//
// Order is load-bearing (design §4): confidence is captured BEFORE the reveal, so it rates the
// DECISION and not the outcome. Reversing these two lines silently destroys the P-5 instrument.
```

- `start()` — draw an opening from the pool (seeded, rotating so position cannot be learned), start
  an arranged round, then call `strategyAction`. If it returns `null`, re-deal and record nothing.
  If it throws, go to `phase: 'fatal'` and set `oracleAction: null`.
- `classify(c)` — record a classification attempt, advance to `decide`. Never reveal correctness yet.
- `decide(a)` — store the chosen action, advance to `confidence`. `revealed` stays `false`.
- `rateConfidence(n)` — build the decision attempt, append both attempts, then advance to `reveal`
  and set `revealed: true`. If `appendAttempt` rejects, set
  `notice: 'Your progress is not being saved.'` and continue — never throw away the session, never
  fake success.
- `next()` — play the hand out, expose `handOutcome` on the state for display only, then `start()`
  again.
- **No method on this class reads `handOutcome` or `confidence` when deciding anything.**

- [ ] **Step 4: Run it, confirm the pass**

Run: `npm test -w web -- practice && npm run build -w web`
Expected: PASS — all seven controller assertions plus Tasks 5–6 still green.

- [ ] **Step 5: Commit**

```bash
git add web/src/practice/controller.ts web/src/practice/controller.test.ts web/src/practice/test-support.ts
git commit -m "feat(practice): add the framework-free decision controller"
```

---

### Task 8: The exclusion boundary test

The two highest-value assertions in the slice, and the reason they are a separate task: a reviewer
could approve the controller and still reject these. `web/src/progress/boundary.test.ts` is the
precedent — it checks module boundaries structurally over source text rather than by convention.

**Files:**
- Create: `web/src/practice/boundary.test.ts`

**Interfaces:**
- Consumes: the compiled source text of `web/src/practice/*.ts`.
- Produces: nothing importable.

- [ ] **Step 1: Write the failing test**

Create `web/src/practice/boundary.test.ts`:

```ts
// Structural guards, in the spirit of progress/boundary.test.ts. These express the product's two
// core commitments as mechanism rather than intention:
//   1. a hand's RESULT may never influence whether a decision was good;
//   2. how sure a learner felt may never make them look more skilled.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (f: string) => readFileSync(new URL(f, import.meta.url), 'utf8');
const stripComments = (s: string) =>
  s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

describe('outcome may never grade a decision', () => {
  it('attempt.ts derives disposition only from chosen vs oracle', () => {
    const src = stripComments(read('./attempt.ts'));
    const disposition = src.slice(src.indexOf('const correct ='), src.indexOf('gradedBy'));
    expect(disposition).not.toMatch(/outcomes/);
    expect(disposition).not.toMatch(/handOutcome/);
    expect(disposition).not.toMatch(/confidence/);
  });

  it('no practice module branches on engine.outcomes', () => {
    for (const f of ['./attempt.ts', './controller.ts', './pool.ts']) {
      const src = stripComments(read(f));
      expect(src, `${f} branches on the hand result`).not.toMatch(/if\s*\([^)]*outcomes/);
    }
  });
});

describe('confidence may never score', () => {
  it('is written to the record and read by nothing', () => {
    const src = stripComments(read('./controller.ts'));
    expect(src).not.toMatch(/if\s*\([^)]*confidence/);
    expect(src).not.toMatch(/confidence\s*[><]=?/);
  });
});
```

- [ ] **Step 2: Run it, confirm the failure**

Temporarily add `if (input.engine.outcomes.length > 0) { /* ... */ }` to `attempt.ts` and run:
`npm test -w web -- practice/boundary`
Expected: FAIL — "attempt.ts branches on the hand result". **Remove the temporary line.**

- [ ] **Step 3: Write the minimal implementation**

No implementation — Tasks 6 and 7 already satisfy these. This step is confirming the guard **can**
fail (Step 2) so it is not a test that passes vacuously. A guard that cannot fail is the defect
recorded in `guard-that-cannot-fail`; proving the failure mode is the whole point of this task.

- [ ] **Step 4: Run it, confirm the pass**

Run: `npm test -w web -- practice/boundary`
Expected: PASS — with the temporary line removed.

- [ ] **Step 5: Commit**

```bash
git add web/src/practice/boundary.test.ts
git commit -m "test(practice): assert outcome and confidence can never score a decision"
```

---

### Task 9: The practice surface

Thin by constraint. It renders `PracticeState` and dispatches; it decides nothing.

**Files:**
- Create: `web/src/app/Practice.tsx`
- Modify: `web/src/app/App.tsx:8` (the `Mode` union), `:12`, `:33-38` (nav + render)
- Test: `web/src/app/Practice.test.tsx`

**Interfaces:**
- Consumes: `PracticeController` (Task 7).
- Produces: `<Practice />`.

- [ ] **Step 1: Write the failing test**

Create `web/src/app/Practice.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Practice } from './Practice';

describe('<Practice />', () => {
  it('shows the classification question first, and no strategy answer', async () => {
    render(<Practice />);
    expect(await screen.findByRole('group', { name: /what kind of hand/i })).toBeTruthy();
    expect(screen.queryByText(/correct play/i)).toBeNull();
  });

  it('never blames the learner for a correct decision that lost', async () => {
    // Copy guard for the 16-vs-10 moment (design §2b): a correct play that loses must read as
    // variance, not as the learner's mistake.
    const src = (await import('node:fs')).readFileSync(
      new URL('./Practice.tsx', import.meta.url), 'utf8');
    expect(src).not.toMatch(/you (lost|failed|should have)/i);
  });
});
```

- [ ] **Step 2: Run it, confirm the failure**

Run: `npm test -w web -- Practice`
Expected: FAIL — `Failed to resolve import "./Practice"`.

- [ ] **Step 3: Write the minimal implementation**

Create `web/src/app/Practice.tsx` — a `useSyncExternalStore` over `controller.subscribe` /
`controller.getState`, rendering one section per phase:

- `classify` — a `role="group"` labelled "What kind of hand is this?" with the three choices.
- `decide` — the legal actions as buttons. **No recommendation is shown.**
- `confidence` — a 1–5 rating. Nothing about correctness is on screen yet.
- `reveal` — the learner's action, the oracle's action, and correct/incorrect. When the decision was
  right and the hand lost, the copy must say so plainly: *"Correct play. This hand loses more often
  than it wins — that is the maths, not your mistake."*
- `fatal` — state the failure; offer no grade.

Then in `App.tsx`: extend `type Mode = 'free_play' | 'learn' | 'practice'`, add the nav button, and
render `{mode === 'practice' && <Practice />}`.

- [ ] **Step 4: Run it, confirm the pass**

Run: `npm test -w web && npm run build -w web`
Expected: PASS — whole suite green, `tsc --noEmit` clean.

- [ ] **Step 5: Commit**

```bash
git add web/src/app/Practice.tsx web/src/app/Practice.test.tsx web/src/app/App.tsx
git commit -m "feat(app): add the practice surface"
```

---

### Task 10: Measure the production bundle delta

`idb`'s admission is **conditional** on this measurement, and a material unacceptable delta reverses
the choice to native IndexedDB (`stack-boundaries.md`). This slice is the first with a real
consumer, so the obligation lands here. Measure **after** Task 9, because only then does anything
actually import `idb` — measuring earlier tree-shakes to zero and makes the check decorative.

**Files:**
- Create: `web/scripts/measure-bundle-delta.sh`
- Modify: `docs/specs/stack-boundaries.md` (record the result)

**Interfaces:**
- Produces: a recorded byte delta and a pass/reverse verdict.

- [ ] **Step 1: Write the failing test**

Create `web/scripts/measure-bundle-delta.sh`:

```bash
#!/usr/bin/env bash
# The idb admission is conditional on this number (stack-boundaries.md).
set -euo pipefail
cd "$(dirname "$0")/.."
npm run build >/dev/null 2>&1
WITH=$(find dist/assets -name '*.js' -exec cat {} + | wc -c)
echo "production JS with idb: ${WITH} bytes"
echo "Record this in docs/specs/stack-boundaries.md against the pre-idb baseline."
[[ "$WITH" -gt 0 ]] || { echo "FAIL: no bundle produced"; exit 1; }
```

- [ ] **Step 2: Run it, confirm the failure**

Run: `bash web/scripts/measure-bundle-delta.sh`
Expected: FAIL on first run if `dist/` is absent or the build errors; otherwise it prints the byte
count. A `0` byte count is the real failure this guards.

- [ ] **Step 3: Write the minimal implementation**

Capture the pre-`idb` baseline by building with the store import stubbed out, then record both
numbers and the delta in `stack-boundaries.md` under "Storage and hosted services", replacing the
stale "not installed or implemented yet" sentence. State the verdict explicitly: **admission
confirmed** or **reversed to native IndexedDB**.

- [ ] **Step 4: Run it, confirm the pass**

Run: `bash web/scripts/measure-bundle-delta.sh`
Expected: PASS — a non-zero byte count printed, and the delta written into the spec.

- [ ] **Step 5: Commit**

```bash
git add web/scripts/measure-bundle-delta.sh docs/specs/stack-boundaries.md
git commit -m "chore(stack): measure the idb production bundle delta and discharge the condition"
```

---

### Task 11: Feature QA and the ledger

Per `AGENTS.md`, every feature closes with its own scoped feature QA before it is called done, and
QA is ledger-driven.

**Files:**
- Create: `web/qa/practice/run.ts`
- Modify: `web/package.json` (add `"qa:practice": "tsx qa/practice/run.ts"`)
- Modify: `journal/qa/ledger.md`
- Create: `journal/qa/runs/2026-07-23-practice/` (the run report)

**Interfaces:**
- Consumes: the shipped surface.
- Produces: a ledger row (area × last-passed commit) and a findings register entry.

- [ ] **Step 1: Write the failing test**

Create `web/qa/practice/run.ts` following `web/qa/learn/run.ts`'s structure, driving real Chromium
via Playwright through: a full hand, an oracle-`null` re-deal, a storage-failure path, and a reload
proving an attempt persisted across sessions.

- [ ] **Step 2: Run it, confirm the failure**

Run: `npm run qa:practice -w web`
Expected: FAIL before the ledger row exists / on the first genuine defect found.

- [ ] **Step 3: Write the minimal implementation**

Fix whatever the run surfaces. Read `journal/qa/ledger.md` first to scope: deep-test the new
practice area, smoke-test proven areas (free play, rules, flow).

- [ ] **Step 4: Run it, confirm the pass**

Run: `npm run qa -w web && cargo test -p blackjack-core`
Expected: PASS — full QA pack plus the Rust suite.

- [ ] **Step 5: Commit**

```bash
git add web/qa/practice/run.ts web/package.json journal/qa/ledger.md journal/qa/runs/
git commit -m "test(qa): add the graded-decision practice feature QA and record the run"
```

---

## Self-Review

**Spec coverage.** §3 boundary → Tasks 2–3. §4 attempt loop → Task 7 (order asserted). §5 evidence
model → Tasks 4, 6. §6 pool → Task 5. §7 failure → Task 7. §8 proof → Tasks 8, 10, 11. §2b product
constraints → Task 9's copy guard. Acceptance criterion 4 (P-3/P-5 answerable from data) is carried
by Task 4's `confidence` plus Task 6's `skillId`/`cellId`.

**Deviations from the spec, both recorded deliberately:**
1. **Task 2 drops `hand_index`** from the command. `RoundState.active_hand_index` already names the
   hand, so TypeScript sends strictly less — this strengthens the spec's own rule rather than
   weakening it.
2. **`DecisionAttempt` is not created.** `ProgressAttempt` already exists and already carries
   `skillId`, `tableVisibility`, and `gradedBy.profileId`. The spec's §5 has been corrected in place.

**Known gap, deliberately left:** `evidence.subjectId` / `unitId` use practice-local constants
(`'blackjack-strategy'`, `'graded-decision-practice'`) and the skill ids (`hard-totals`,
`soft-totals`, `pairs`) are declared in `pool.ts`. This is the spec's §5 note about ids being flat
data with no graph. The taxonomy phase adopts or maps them, and `schemaVersion` carries the
migration.

**Type consistency checked:** `Action` is `'hit' | 'stand' | 'double' | 'split'` in both
`bridge/types.ts:31` and `types.rs:78-83`; `StrategyProfileId` is `'h17' | 's17'`;
`ProgressAttemptDraft` is `Omit<ProgressAttempt, 'committedAtRevision'>` from `progress/store.ts`;
`errorClass` values used (`'strategy-recall'`, `'hand-classification'`) both exist in the
`ErrorClass` union.
