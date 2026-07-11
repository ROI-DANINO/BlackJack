# Blackjack Basics Learning Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the prototype guided drill with a reusable, engine-authoritative learning runtime and nine short Blackjack Basics units that prepare a complete beginner to play a full hand without strategy instruction.

**Architecture:** Rust exposes a small `describe_hand` query while retaining authority for sessions, legal actions, dealer play, wagers, and settlement. Typed TypeScript curriculum data drives a UI-independent `LessonController`; thin React views render its state, and a Learn QA role walks the complete subject through the browser. The runtime is deliberately reusable for Strategy Table Fundamentals but does not add persistence, mastery, skip tests, or V3 visual polish.

**Tech Stack:** Rust 2024 edition, serde, wasm-bindgen, TypeScript 5.5, React 18, Vitest, Testing Library, Playwright, Vite.

## Global Constraints

- Treat this as a training product, not gambling software.
- Do not fake card flow: arranged openings sit on a composition-correct shuffled shoe, all later cards come from that ordered shoe, and origins remain traceable.
- Rust owns scoring, soft/hard state, natural blackjack, legal actions, dealer behavior, wager changes, settlement, and later strategy recommendations.
- The browser owns typed curriculum and presentation; it must not independently grade rule-dependent answers.
- Learning correctness and hand outcome are separate facts.
- Units are two-to-four-minute mechanics-first lessons; visual polish, animation, course-map art, rewards, and coach/pet presentation are V3 work.
- Progress and attempt evidence remain in memory. All units are directly selectable in recommended order; prerequisites are recorded but not enforced.
- Do not add persistence, accounts, backend storage, XP, lives, mastery thresholds, skip tests, or a generic plugin/course-authoring framework.
- Free Play behavior must remain unchanged.
- Use TDD for every behavior change and preserve the generated-WASM freshness guard.
- Before feature QA, read `journal/qa/ledger.md`, scope by changed surfaces, and record the run and findings according to `docs/specs/qa-playtest-process.md`.

---

## File Structure

### Rust and bridge

- Modify `crates/blackjack-core/src/types.rs` — serializable `HandFacts` response.
- Modify `crates/blackjack-core/src/rules.rs` — one rank-scoring implementation shared by sessions and teaching queries.
- Modify `crates/blackjack-core/src/boundary.rs` — `describe_hand` command and `hand_facts` response.
- Modify `crates/blackjack-core/tests/boundary_tests.rs` — engine-boundary behavior.
- Modify `crates/blackjack-core/tests/golden_fixtures.rs` — stable hand-facts wire fixture.
- Create `crates/blackjack-core/tests/fixtures/response_hand_facts.json` — committed Rust wire truth.
- Modify `web/src/bridge/types.ts` and `web/src/bridge/validate.ts` — exact TypeScript wire mirror.
- Create `web/src/bridge/hand-facts-transport.test.ts` — real WASM contract test.

### Learning domain

- Create `web/src/learn/types.ts` — subject, unit, step, attempt, and controller-state contracts.
- Create `web/src/learn/validate.ts` and `validate.test.ts` — deterministic curriculum validation.
- Create `web/src/learn/engine.ts` and `engine.test.ts` — typed synchronous adapter over `CoreTransport`.
- Create `web/src/learn/controller.ts` and `controller.test.ts` — ordered-step state machine.
- Create `web/src/learn/situations.ts` and `situations.test.ts` — serializable arranged openings.
- Create `web/src/learn/content/blackjack-basics.ts` and `blackjack-basics.test.ts` — skills and nine units.

### React and QA

- Create `web/src/app/Learn.tsx`, `Lesson.tsx`, and `useLesson.ts`.
- Create `web/src/app/Learn.test.tsx` and `Lesson.test.tsx`.
- Modify `web/src/app/App.tsx` and `App.test.tsx` — subject/unit navigation.
- Modify `web/src/breakit-hook.ts` — replace the drill hook with a learning hook.
- Create `web/qa/learn/checks.ts`, `checks.test.ts`, and `run.ts`.
- Modify `web/qa/run-all.ts` and `web/package.json` — replace `qa:drill` with `qa:learn`.
- Delete obsolete `web/src/drill/`, `web/src/app/Drill.tsx`, `web/src/app/Drill.test.tsx`, `web/src/app/useDrill.ts`, `web/src/bridge/drill-transport.test.ts`, and `web/qa/drill/` only after replacement coverage passes.
- Modify `docs/superpowers/specs/2026-07-10-first-guided-drill-design.md` — mark the prototype spec superseded.
- Modify `journal/qa/ledger.md` and add the final `journal/qa/runs/2026-07-11-learn/` report through the QA runner.

---

### Task 1: Rust-owned hand facts

**Files:**
- Modify: `crates/blackjack-core/src/types.rs`
- Modify: `crates/blackjack-core/src/rules.rs`
- Modify: `crates/blackjack-core/src/boundary.rs`
- Modify: `crates/blackjack-core/tests/boundary_tests.rs`
- Modify: `crates/blackjack-core/tests/reshuffle_tests.rs`
- Modify: `crates/blackjack-core/tests/golden_fixtures.rs`
- Create: `crates/blackjack-core/tests/fixtures/response_hand_facts.json`

**Interfaces:**
- Consumes: existing `PresetCard`, `Rank`, `score_hand`, `CoreCommand`, and `CoreResponse`.
- Produces: `HandFacts { hard_total, best_total, is_soft, is_bust }`, `CoreCommand::DescribeHand { cards }`, and `CoreResponse::HandFacts(HandFacts)` serialized as `{"type":"hand_facts","data":...}`.

- [ ] **Step 1: Add a failing boundary test**

```rust
#[test]
fn describe_hand_command_returns_engine_owned_ace_facts() {
    let cards = vec![
        PresetCard { rank: Rank::Ace, suit: Suit::Spades },
        PresetCard { rank: Rank::Six, suit: Suit::Hearts },
    ];
    let response = handle_command(CoreCommand::DescribeHand { cards }).expect("hand facts");
    match response {
        CoreResponse::HandFacts(facts) => {
            assert_eq!(facts.hard_total, 7);
            assert_eq!(facts.best_total, 17);
            assert!(facts.is_soft);
            assert!(!facts.is_bust);
        }
        other => panic!("expected hand facts, got {other:?}"),
    }
}
```

- [ ] **Step 2: Run the focused Rust test and verify the red state**

Run: `cargo test -p blackjack-core --test boundary_tests describe_hand_command_returns_engine_owned_ace_facts -- --exact`

Expected: compilation fails because `DescribeHand`, `HandFacts`, and `CoreResponse::HandFacts` do not exist.

- [ ] **Step 3: Implement one shared rank-scoring path**

Add to `types.rs`:

```rust
#[derive(Clone, Debug, Deserialize, Eq, PartialEq, Serialize)]
pub struct HandFacts {
    pub hard_total: u8,
    pub best_total: u8,
    pub is_soft: bool,
    pub is_bust: bool,
}
```

Refactor `rules.rs` so both card-bearing sessions and preset teaching cards call the same helper:

```rust
fn score_ranks<'a>(ranks: impl IntoIterator<Item = &'a Rank>, card_count: usize) -> HandScore {
    let ranks: Vec<Rank> = ranks.into_iter().cloned().collect();
    let hard_total = ranks.iter().map(rank_value).sum();
    let ace_count = ranks.iter().filter(|rank| **rank == Rank::Ace).count();
    let mut best_total = hard_total;
    let mut soft_aces = 0;
    for _ in 0..ace_count {
        if best_total + 10 <= 21 { best_total += 10; soft_aces += 1; }
    }
    HandScore {
        hard_total,
        best_total,
        is_soft: soft_aces > 0,
        is_blackjack: card_count == 2 && best_total == 21,
        is_bust: best_total > 21,
    }
}

pub fn score_hand(cards: &[Card]) -> HandScore {
    score_ranks(cards.iter().map(|card| &card.rank), cards.len())
}

pub fn describe_hand(cards: &[PresetCard]) -> HandFacts {
    let score = score_ranks(cards.iter().map(|card| &card.rank), cards.len());
    HandFacts {
        hard_total: score.hard_total,
        best_total: score.best_total,
        is_soft: score.is_soft,
        is_bust: score.is_bust,
    }
}
```

Add the command/response variants and dispatch arm in `boundary.rs`. Update every exhaustive
`CoreResponse` match in existing Rust tests with a `HandFacts(_)` wrong-response arm.

- [ ] **Step 4: Lock the wire response with a golden fixture**

Add a fixture test that dispatches:

```rust
let cmd = r#"{"command":"describe_hand","cards":[{"rank":"ace","suit":"spades"},{"rank":"six","suit":"hearts"}]}"#;
check_or_write("response_hand_facts.json", &dispatch_json(cmd));
```

Run: `UPDATE_FIXTURES=1 cargo test -p blackjack-core --test golden_fixtures response_hand_facts_fixture_is_stable -- --exact`

Expected: PASS and `response_hand_facts.json` contains `hard_total:7`, `best_total:17`, `is_soft:true`, and `is_bust:false`.

- [ ] **Step 5: Verify the Rust boundary and regression suite**

Run: `cargo test -p blackjack-core`

Expected: all Rust tests pass, including the new Ace facts test and existing scoring/session tests.

- [ ] **Step 6: Commit**

```bash
git add crates/blackjack-core/src/types.rs crates/blackjack-core/src/rules.rs crates/blackjack-core/src/boundary.rs crates/blackjack-core/tests/boundary_tests.rs crates/blackjack-core/tests/reshuffle_tests.rs crates/blackjack-core/tests/golden_fixtures.rs crates/blackjack-core/tests/fixtures/response_hand_facts.json
git commit -m "feat(core): expose engine-owned hand facts"
```

### Task 2: WASM and TypeScript hand-facts contract

**Files:**
- Modify: `web/src/bridge/types.ts`
- Modify: `web/src/bridge/validate.ts`
- Modify: `web/src/bridge/contract.test.ts`
- Create: `web/src/bridge/hand-facts-transport.test.ts`
- Regenerate ignored: `web/src/bridge/wasm/*`

**Interfaces:**
- Consumes: Task 1's `describe_hand` JSON command and `hand_facts` response.
- Produces: `HandFacts`, the matching `CoreCommand` and `CoreResponse` unions, and validated WASM transport behavior.

- [ ] **Step 1: Write failing TypeScript contract tests**

```ts
it('parses Rust hand facts', () => {
  const out = parseCliOutput(read('response_hand_facts.json'));
  if (out.status !== 'ok' || out.response.type !== 'hand_facts') throw new Error('shape');
  expect(out.response.data).toEqual({ hard_total: 7, best_total: 17, is_soft: true, is_bust: false });
});
```

In the real-WASM test, send a three-card Ace hand and expect hard 17, best 17, and `is_soft:false`.

- [ ] **Step 2: Run the tests and verify they fail before the bridge union changes**

Run: `npm --prefix web run test -- src/bridge/contract.test.ts src/bridge/hand-facts-transport.test.ts`

Expected: FAIL because `hand_facts` is rejected and the command is not typed.

- [ ] **Step 3: Extend the exact wire mirror and validator**

```ts
export interface HandFacts {
  hard_total: number;
  best_total: number;
  is_soft: boolean;
  is_bust: boolean;
}

// CoreCommand member
| { command: 'describe_hand'; cards: PresetCard[] }

// CoreResponse member
| { type: 'hand_facts'; data: HandFacts }
```

Change the validator response-discriminant check to accept `session`, `actions`, or `hand_facts`.

- [ ] **Step 4: Rebuild WASM and run focused tests**

Run: `npm --prefix web run build:wasm`

Expected: `wasm build complete -> web/src/bridge/wasm/`.

Run: `npm --prefix web run test -- src/bridge/contract.test.ts src/bridge/hand-facts-transport.test.ts`

Expected: both test files pass.

- [ ] **Step 5: Commit source changes only**

```bash
git add web/src/bridge/types.ts web/src/bridge/validate.ts web/src/bridge/contract.test.ts web/src/bridge/hand-facts-transport.test.ts
git commit -m "feat(web): mirror hand facts across WASM"
```

### Task 3: Typed curriculum contracts and validation

**Files:**
- Create: `web/src/learn/types.ts`
- Create: `web/src/learn/validate.ts`
- Create: `web/src/learn/validate.test.ts`

**Interfaces:**
- Consumes: bridge `Action`, `HandOutcome`, `PresetCard`, and `SessionState`.
- Produces: `Subject`, `Unit`, `LessonStep`, `AttemptRecord`, `LessonState`, and `validateSubject(subject): string[]`.

- [ ] **Step 1: Write validator tests for the durable invariants**

```ts
it('rejects duplicate ids and completion checks that measure no declared outcome', () => {
  const broken: Subject = {
    id: 'broken',
    title: 'Broken',
    skills: [{ id: 'totals', title: 'Read totals' }, { id: 'totals', title: 'Again' }],
    units: [{
      id: 'basics', title: 'Basics', goal: 'Learn basics', prerequisites: [],
      outcomes: ['totals'], requiredChecks: ['missing-step'],
      steps: [{ id: 'intro', type: 'explain', title: 'Intro', body: 'Read the cards.' }],
    }],
  };
  expect(validateSubject(broken)).toEqual([
    'duplicate skill id: totals',
    'unit basics: required check missing-step does not exist',
  ]);
});
```

Also test duplicate unit/step IDs, unknown prerequisites/outcomes, empty units, a required check that
is not a question, an unsupported question outcome, and recap capabilities that omit or reference
anything other than the unit's declared outcomes.

- [ ] **Step 2: Run the validator test and verify the red state**

Run: `npm --prefix web run test -- src/learn/validate.test.ts`

Expected: FAIL because the learning contracts and validator do not exist.

- [ ] **Step 3: Define the small serializable lesson model**

```ts
export type Skill = { id: string; title: string };
export type Choice = { value: string; label: string };
export type AnswerRule =
  | { kind: 'literal'; value: string }
  | { kind: 'hand_total'; cards: PresetCard[] }
  | { kind: 'hand_softness'; cards: PresetCard[] }
  | { kind: 'hand_bust'; cards: PresetCard[] }
  | { kind: 'last_outcome'; handIndex: number }
  | { kind: 'last_wager'; handIndex: number }
  | { kind: 'last_bankroll_delta' }
  | { kind: 'last_hand_count' };

export type ExplainStep = { id: string; type: 'explain'; title: string; body: string; cards?: PresetCard[] };
export type QuestionStep = {
  id: string; type: 'question'; outcomeId: string; prompt: string; choices: Choice[];
  answer: AnswerRule; correct: string; incorrect: string;
};
export type HandStep = {
  id: string; type: 'hand'; outcomeId: string; title: string; intro: string;
  setup: { kind: 'arranged'; openings: PresetCard[][] } | { kind: 'live' };
  requestedAction?: Action; teach: string;
};
export type RecapStep = {
  id: string; type: 'recap'; title: string;
  capabilities: Array<{ outcomeId: string; text: string }>;
};
export type LessonStep = ExplainStep | QuestionStep | HandStep | RecapStep;

export type Unit = {
  id: string; title: string; goal: string; prerequisites: string[]; outcomes: string[];
  requiredChecks: string[]; steps: LessonStep[];
};
export type Subject = { id: string; title: string; skills: Skill[]; units: Unit[] };

export type Assistance = 'none' | 'retry' | 'instruction';
export type AttemptEngineContext = {
  seed: string; playerCardIds: string[]; dealerUpcardId: string | null;
  legalActions: Action[]; outcomes: HandOutcome[]; wager: number | null;
};
export type AttemptRecord = {
  subjectId: string; unitId: string; stepId: string; outcomeId: string;
  interaction: LessonStep['type']; prompt: string; response: string; correct: boolean | null;
  assistance: Assistance; engine: AttemptEngineContext | null; feedback: string;
};
export type LessonState = {
  subject: Subject; unit: Unit; stepIndex: number; step: LessonStep | null;
  session: SessionState | null; legalActions: Action[]; attempts: AttemptRecord[];
  feedback: string | null; awaitingContinue: boolean; completed: boolean;
  busy: boolean; error: string | null; fatal: string | null;
};
```

- [ ] **Step 4: Implement validation with deterministic error ordering**

Use Sets for IDs, walk units in declaration order, and return messages rather than throwing so
tests and startup failures can report every authoring error in one pass.

- [ ] **Step 5: Run focused tests and TypeScript build**

Run: `npm --prefix web run test -- src/learn/validate.test.ts`

Expected: all validator cases pass.

Run: `npm --prefix web run build`

Expected: TypeScript and Vite build pass with no curriculum runtime wired yet.

- [ ] **Step 6: Commit**

```bash
git add web/src/learn/types.ts web/src/learn/validate.ts web/src/learn/validate.test.ts
git commit -m "feat(learn): define validated curriculum contracts"
```

### Task 4: Engine adapter and knowledge-step controller

**Files:**
- Create: `web/src/learn/engine.ts`
- Create: `web/src/learn/engine.test.ts`
- Create: `web/src/learn/controller.ts`
- Create: `web/src/learn/controller.test.ts`

**Interfaces:**
- Consumes: Task 2 bridge contract and Task 3 lesson types.
- Produces: `LearnEngine.describeHand`, session/action methods, and `LessonController` methods `begin`, `answer`, `choose`, `continue`, `retry`, `getState`, and `subscribe`.
- Constructor: `new LessonController(engine, subject, unit, { seq, freshSeed })`, where `seq: () => number` and `freshSeed: () => string`.

- [ ] **Step 1: Write failing adapter tests**

```ts
it('returns typed hand facts and converts core errors to recoverable errors', () => {
  const engine = new LearnEngine(new WasmTransport());
  expect(engine.describeHand([{ rank: 'ace', suit: 'spades' }, { rank: 'six', suit: 'hearts' }]))
    .toEqual({ hard_total: 7, best_total: 17, is_soft: true, is_bust: false });
});
```

Add malformed-envelope and wrong-response-type cases with a fake `CoreTransport`.

- [ ] **Step 2: Write failing controller tests for explain and question steps**

```ts
it('records an incorrect retry and completes a required check after a correct answer', () => {
  const unit: Unit = {
    id: 'test', title: 'Test', goal: 'Answer once', prerequisites: [], outcomes: ['test-skill'],
    requiredChecks: ['check'],
    steps: [
      { id: 'intro', type: 'explain', title: 'Intro', body: 'Choose the answer.' },
      { id: 'check', type: 'question', outcomeId: 'test-skill', prompt: 'Pick right.',
        choices: [{ value: 'wrong', label: 'Wrong' }, { value: 'right', label: 'Right' }],
        answer: { kind: 'literal', value: 'right' }, correct: 'Yes.', incorrect: 'Try again.' },
      { id: 'recap', type: 'recap', title: 'Done', capabilities: ['Answered'] },
    ],
  };
  const subject: Subject = { id: 'test', title: 'Test', skills: [{ id: 'test-skill', title: 'Test' }], units: [unit] };
  const c = new LessonController(new LearnEngine(new WasmTransport()), subject, unit,
    { seq: () => 0, freshSeed: () => 'test-seed' });
  c.begin();
  c.continue(); // explanation -> question
  c.answer('wrong');
  expect(c.getState().attempts.at(-1)).toMatchObject({ correct: false, assistance: 'none' });
  c.retry();
  c.answer('right');
  expect(c.getState().attempts.at(-1)).toMatchObject({ correct: true, assistance: 'retry' });
  expect(c.getState().awaitingContinue).toBe(true);
});
```

Also cover literal answers, engine-owned total/softness/bust answers, feedback, subscriber emission,
duplicate answer blocking, and a fatal malformed transport reply.

- [ ] **Step 3: Run the focused tests and verify the red state**

Run: `npm --prefix web run test -- src/learn/engine.test.ts src/learn/controller.test.ts`

Expected: FAIL because `LearnEngine` and `LessonController` do not exist.

- [ ] **Step 4: Implement the adapter with response-type assertions**

```ts
describeHand(cards: PresetCard[]): HandFacts {
  const out = this.call({ command: 'describe_hand', cards });
  if (out.type !== 'hand_facts') throw new BridgeError(`expected hand_facts, got ${out.type}`);
  return out.data;
}
```

Keep raw JSON parsing in the adapter, not in curriculum or React.

- [ ] **Step 5: Implement ordered knowledge-step progression**

Resolve `literal` answers directly. Resolve `hand_total`, `hand_softness`, and `hand_bust` through
`LearnEngine.describeHand`. Resolve `last_outcome`, `last_wager`, `last_bankroll_delta`, and
`last_hand_count` from the stored engine session/log. A wrong response records feedback and enables
`retry`; it must not advance or reveal a different answer. A correct response records evidence and
enables Continue. Completion is derived only when every `requiredChecks` step has a correct attempt.

- [ ] **Step 6: Run focused tests and the web suite**

Run: `npm --prefix web run test -- src/learn/engine.test.ts src/learn/controller.test.ts`

Expected: focused tests pass.

Run: `npm --prefix web run test`

Expected: the complete existing web suite passes.

- [ ] **Step 7: Commit**

```bash
git add web/src/learn/engine.ts web/src/learn/engine.test.ts web/src/learn/controller.ts web/src/learn/controller.test.ts
git commit -m "feat(learn): add deterministic lesson controller"
```

### Task 5: Engine-backed hand steps and serializable situations

**Files:**
- Create: `web/src/learn/situations.ts`
- Create: `web/src/learn/situations.test.ts`
- Modify: `web/src/learn/engine.ts`
- Modify: `web/src/learn/controller.ts`
- Modify: `web/src/learn/controller.test.ts`

**Interfaces:**
- Consumes: existing prefix-session command, normal session commands, `HandStep`, and `LessonState`.
- Produces: `OPENINGS` data, deterministic opening selection, arranged/live hand execution, requested-action evidence, and last-outcome answer support.

- [ ] **Step 1: Write failing tests for serializable openings**

Define named arrays for readable totals, stiff hands, naturals, elevens, and pairs. Test each
opening through real WASM: prefix provenance is `arranged`, the shoe has 312 cards, and the intended
legal action or natural resolution is present.

```ts
expect(JSON.parse(JSON.stringify(OPENINGS))).toEqual(OPENINGS);
```

- [ ] **Step 2: Write failing controller tests for a requested action and a live hand**

Arrange 11, begin the hand step, choose Double, and assert one attempt records
`response:'double'`, `assistance:'instruction'`, the engine session, and feedback separately from
the resolved outcome. Add a test that choosing a different legal action remains valid play but does
not falsely record that Double was practiced. Add a live-hand test with shuffled rather than
arranged provenance.

- [ ] **Step 3: Run the focused tests and verify the red state**

Run: `npm --prefix web run test -- src/learn/situations.test.ts src/learn/controller.test.ts`

Expected: FAIL because hand steps are not implemented.

- [ ] **Step 4: Implement hand command methods in `LearnEngine`**

```ts
startArranged(seed: string, prefix: PresetCard[]): SessionState
startLive(seed: string): SessionState
startRound(session: SessionState): SessionState
legalActions(session: SessionState): Action[]
applyAction(session: SessionState, action: Action): SessionState
```

Use bankroll `100000` and default bet `2000`, matching existing Free Play/drill teaching sessions.

- [ ] **Step 5: Implement hand-step progression**

Select `openings[seq() % openings.length]` without functions in curriculum data. For arranged
steps, use a `lesson:<unit>:<step>` seed; for live steps use `freshSeed()`. Keep legal actions
engine-owned, continue multi-action and split hands until resolved, and derive feedback from the
round log plus the step's teaching copy. Resolve `last_outcome` questions from the last stored
engine log, never from authored totals.

- [ ] **Step 6: Verify the focused and full suites**

Run: `npm --prefix web run test -- src/learn/situations.test.ts src/learn/controller.test.ts`

Expected: all arranged/live controller tests pass.

Run: `cargo test -p blackjack-core && npm --prefix web run test`

Expected: both suites pass.

- [ ] **Step 7: Commit**

```bash
git add web/src/learn/situations.ts web/src/learn/situations.test.ts web/src/learn/engine.ts web/src/learn/controller.ts web/src/learn/controller.test.ts
git commit -m "feat(learn): run lessons through real engine hands"
```

### Task 6: Blackjack Basics curriculum — units 1 through 6

**Files:**
- Create: `web/src/learn/content/blackjack-basics.ts`
- Create: `web/src/learn/content/blackjack-basics.test.ts`

**Interfaces:**
- Consumes: validated curriculum contracts, hand-fact answer rules, and named openings.
- Produces: `BLACKJACK_BASICS: Subject` with its skill catalog and the first six complete units.

- [ ] **Step 1: Write failing content-coverage tests**

```ts
expect(validateSubject(BLACKJACK_BASICS)).toEqual([]);
expect(BLACKJACK_BASICS.units.slice(0, 6).map((u) => u.id)).toEqual([
  'meet-blackjack', 'read-your-hand', 'round-flow', 'hit-and-stand',
  'win-lose-push', 'blackjack-is-special',
]);
for (const unit of BLACKJACK_BASICS.units.slice(0, 6)) {
  expect(unit.requiredChecks.length).toBeGreaterThan(0);
  expect(unit.steps.at(-1)?.type).toBe('recap');
}
```

Assert that no prompt contains strategy language such as `best move`, `correct play`, or
`basic strategy`, and that all hand-total/bust questions use engine answer rules.

- [ ] **Step 2: Run the content test and verify the red state**

Run: `npm --prefix web run test -- src/learn/content/blackjack-basics.test.ts`

Expected: FAIL because the subject does not exist.

- [ ] **Step 3: Declare the skill catalog and exact unit prerequisites**

Use these stable skill IDs:

```ts
const skills = [
  ['goal', 'Explain the goal of blackjack'],
  ['card-values', 'Recognize card values'],
  ['hand-total', 'Read a hand total'],
  ['ace-value', 'Use an Ace as 1 or 11'],
  ['bust', 'Recognize a bust'],
  ['round-flow', 'Follow a blackjack round'],
  ['dealer-info', 'Read dealer information'],
  ['hit', 'Explain and use Hit'],
  ['stand', 'Explain and use Stand'],
  ['outcomes', 'Recognize win, loss, and push'],
  ['wager-result', 'Follow the original wager'],
  ['natural-blackjack', 'Distinguish blackjack from ordinary 21'],
] as const;
```

Each unit depends only on skills introduced by earlier units. Keep prose to one concept per screen.

Lock the prerequisite/outcome graph to this declaration:

```ts
const unitGraph = [
  { id: 'meet-blackjack', prerequisites: [], outcomes: ['goal', 'card-values'] },
  { id: 'read-your-hand', prerequisites: ['card-values'], outcomes: ['hand-total', 'ace-value', 'bust'] },
  { id: 'round-flow', prerequisites: ['goal', 'hand-total'], outcomes: ['round-flow', 'dealer-info'] },
  { id: 'hit-and-stand', prerequisites: ['round-flow', 'hand-total', 'bust'], outcomes: ['hit', 'stand'] },
  { id: 'win-lose-push', prerequisites: ['round-flow', 'bust'], outcomes: ['outcomes', 'wager-result'] },
  { id: 'blackjack-is-special', prerequisites: ['hand-total', 'outcomes', 'wager-result'], outcomes: ['natural-blackjack'] },
] as const;
```

- [ ] **Step 4: Author units 1–3**

`Meet Blackjack` covers the goal, number cards, and face cards. `Read Your Hand` uses engine facts
for totals, Aces, and busts. `How a Round Works` teaches the opening deal, upcard/hole card, player
turn, forced dealer turn, and settlement order without asking for strategy.

- [ ] **Step 5: Author units 4–6**

`Hit and Stand` includes one requested Hit hand and one requested Stand hand. `Win, Lose, or Push`
uses completed engine sessions plus `last_outcome` checks and follows the original wager.
`Blackjack Is Special` compares a real natural resolution with an engine-scored ordinary 21 and
teaches the 3:2 payout. Its payout check uses `{ kind:'last_bankroll_delta' }`; with the fixed
`2000`-cent teaching wager, the natural's correct value is `'3000'`.

Use this minimum step inventory; additional explanation screens are allowed only when they keep one
concept per screen:

```ts
const requiredStepTypes = {
  'meet-blackjack': ['explain', 'question', 'question', 'recap'],
  'read-your-hand': ['explain', 'question', 'question', 'question', 'recap'],
  'round-flow': ['explain', 'question', 'question', 'recap'],
  'hit-and-stand': ['explain', 'question', 'hand', 'hand', 'question', 'recap'],
  'win-lose-push': ['explain', 'hand', 'question', 'question', 'recap'],
  'blackjack-is-special': ['explain', 'hand', 'question', 'question', 'recap'],
} as const;
```

Use these exact unhinted check facts and keep feedback concise:

| Unit | Check | Correct fact | Incorrect feedback |
|---|---|---|---|
| Meet Blackjack | `goal-check` | Beat the dealer without going over 21 | “You are playing against the dealer. Going over 21 loses immediately.” |
| Meet Blackjack | `face-value-check` | Queen = 10 | “Jacks, Queens, and Kings are all worth 10.” |
| Read Your Hand | `soft-total-check` | Ace + 6 = soft 17 | “The Ace can count as 11 here, so the best total is 17.” |
| Read Your Hand | `ace-adjust-check` | Ace + 6 + 10 = hard 17 | “Counting the Ace as 11 would bust, so it changes to 1.” |
| Read Your Hand | `bust-check` | 10 + 8 + 5 is a bust | “The total is 23; any total over 21 is a bust.” |
| How a Round Works | `dealer-info-check` | Only the dealer upcard is visible during the player turn | “The other dealer card stays hidden until the dealer’s turn.” |
| How a Round Works | `round-order-check` | Opening deal → player turn → dealer turn → settlement | “The player acts before the dealer reveals and completes the dealer hand.” |
| Hit and Stand | `action-check` | Hit takes a card; Stand ends the player turn | “Hit changes the hand with another card. Stand keeps it and passes play.” |
| Win, Lose, or Push | `outcome-check` | Value comes from `last_outcome` | “Compare the completed hands, including whether either side busted.” |
| Blackjack Is Special | `natural-check` | Ace + ten-value on the initial two cards is blackjack | “A later three-card 21 is 21, but it is not a natural blackjack.” |
| Blackjack Is Special | `payout-check` | A 2000-cent natural returns a +3000-cent delta | “Blackjack pays 3:2 under the active V1 ruleset.” |

- [ ] **Step 6: Run content, controller, and curriculum tests**

Run: `npm --prefix web run test -- src/learn/content/blackjack-basics.test.ts src/learn/validate.test.ts src/learn/controller.test.ts`

Expected: all tests pass, every required check maps to a declared outcome, and no strategy grading appears.

- [ ] **Step 7: Commit**

```bash
git add web/src/learn/content/blackjack-basics.ts web/src/learn/content/blackjack-basics.test.ts
git commit -m "feat(learn): teach core blackjack literacy"
```

### Task 7: Blackjack Basics curriculum — Double, Split, and checkpoint

**Files:**
- Modify: `web/src/learn/content/blackjack-basics.ts`
- Modify: `web/src/learn/content/blackjack-basics.test.ts`
- Modify: `web/src/learn/controller.test.ts`

**Interfaces:**
- Consumes: Tasks 5–6 hand steps and existing engine wager/outcome logs.
- Produces: complete nine-unit `BLACKJACK_BASICS` subject and full-subject completion evidence.

- [ ] **Step 1: Extend the failing coverage test to all nine units**

```ts
expect(BLACKJACK_BASICS.units.map((u) => u.id)).toEqual([
  'meet-blackjack', 'read-your-hand', 'round-flow', 'hit-and-stand',
  'win-lose-push', 'blackjack-is-special', 'double', 'split', 'complete-round',
]);
```

Add assertions that Double requests `double`, Split requests `split`, and the checkpoint contains a
`live` hand with no requested action and no strategy answer rule.

- [ ] **Step 2: Run the focused test and verify it fails for the missing units**

Run: `npm --prefix web run test -- src/learn/content/blackjack-basics.test.ts`

Expected: FAIL because units 7–9 are absent.

- [ ] **Step 3: Add stable skills for actions and independent wagers**

```ts
['double', 'Explain and use Double'],
['split', 'Explain and use Split'],
['split-hands', 'Follow separately played split hands'],
['complete-round', 'Complete and explain a full round'],
```

Extend the unit graph exactly:

```ts
{ id: 'double', prerequisites: ['hit', 'stand', 'wager-result'], outcomes: ['double'] },
{ id: 'split', prerequisites: ['round-flow', 'wager-result'], outcomes: ['split', 'split-hands'] },
{ id: 'complete-round', prerequisites: [
  'goal', 'hand-total', 'dealer-info', 'hit', 'stand', 'outcomes',
  'wager-result', 'natural-blackjack', 'double', 'split', 'split-hands',
], outcomes: ['complete-round'] },
```

- [ ] **Step 4: Author the final three units**

Double must show the equal extra wager, exactly one card, and automatic Stand. Split must show legal
availability, two hand states, separate wagers, active-hand progression, and separate outcomes.
The checkpoint uses a fresh real shoe, minimal labels, free legal choices, and a final outcome
question. It passes on operational completion and outcome comprehension, never on oracle agreement.

Use these required step shapes:

```ts
const finalStepTypes = {
  double: ['explain', 'question', 'hand', 'question', 'recap'],
  split: ['explain', 'question', 'hand', 'question', 'recap'],
  'complete-round': ['explain', 'hand', 'question', 'recap'],
} as const;
```

The post-Double question uses `{ kind:'last_wager', handIndex:0 }`; the Split check uses
`{ kind:'last_hand_count' }`; the final checkpoint uses `{ kind:'last_outcome', handIndex:0 }`.
Choices contain the exact wire-compatible values (`'4000'`, `'2'`, and
`'win' | 'loss' | 'push' | 'blackjack'`) while labels remain beginner-friendly.

Use this exact check copy:

| Unit | Prompt | Correct feedback | Incorrect feedback |
|---|---|---|---|
| Double | “After doubling a $20 wager, what wager is now on this hand?” | “Right — Double adds another $20, so $40 is at stake.” | “Double adds an equal wager; it does not merely change the number of cards.” |
| Split | “How many player hands are being played after this Split?” | “Right — the pair became two separately played hands.” | “Split creates two hands, each with its own wager and result.” |
| Complete round | “How did the completed hand settle?” | “Right — that matches the engine’s settled result.” | “Check for a bust first, then compare the completed player and dealer hands.” |

- [ ] **Step 5: Add an end-to-end controller test for every unit**

Walk each unit with deterministic choice answers and engine actions, assert it reaches its recap,
all required checks have a correct attempt, and
`recap.capabilities.map((capability) => capability.outcomeId)` equals the unit outcomes.

- [ ] **Step 6: Run the complete learning-domain suite**

Run: `npm --prefix web run test -- src/learn`

Expected: all learning-domain tests pass for nine units.

- [ ] **Step 7: Commit**

```bash
git add web/src/learn/content/blackjack-basics.ts web/src/learn/content/blackjack-basics.test.ts web/src/learn/controller.test.ts
git commit -m "feat(learn): complete blackjack basics curriculum"
```

### Task 8: Thin reusable lesson UI

**Files:**
- Create: `web/src/app/useLesson.ts`
- Create: `web/src/app/Lesson.tsx`
- Create: `web/src/app/Lesson.test.tsx`

**Interfaces:**
- Consumes: `LessonController`, `LessonState`, `HandView`, and bridge `Action`.
- Produces: `useLesson(controller)` and `<Lesson controller onExit />`.

- [ ] **Step 1: Write failing renderer tests**

Cover explanation/Continue, a question with accessible buttons, incorrect feedback/Retry, correct
feedback/Continue, an engine hand with only legal action buttons, a fatal alert, a recap containing
capabilities rather than outcome rows, and Return to units.

```tsx
expect(screen.getByRole('heading', { name: 'Read Your Hand' })).toBeTruthy();
fireEvent.click(screen.getByRole('button', { name: '17' }));
expect(screen.getByRole('status').textContent).toMatch(/ace can count as 11/i);
```

- [ ] **Step 2: Run the UI test and verify the red state**

Run: `npm --prefix web run test -- src/app/Lesson.test.tsx`

Expected: FAIL because the hook and view do not exist.

- [ ] **Step 3: Implement the external-store hook**

```ts
export function useLesson(controller: LessonController): LessonState {
  return useSyncExternalStore(controller.subscribe, controller.getState, controller.getState);
}
```

- [ ] **Step 4: Implement an exhaustive plain renderer**

Use a `switch (state.step.type)` with a `never` default. Render semantic headings, paragraphs,
buttons, `role="status"` feedback, and `role="alert"` errors. Reuse `HandView` for hand steps. Do not
add CSS, animation, images, drag/drop, rewards, or custom layout infrastructure.

- [ ] **Step 5: Run UI tests and build**

Run: `npm --prefix web run test -- src/app/Lesson.test.tsx`

Expected: all lesson renderer cases pass.

Run: `npm --prefix web run build`

Expected: TypeScript exhaustiveness and production build pass.

- [ ] **Step 6: Commit**

```bash
git add web/src/app/useLesson.ts web/src/app/Lesson.tsx web/src/app/Lesson.test.tsx
git commit -m "feat(app): render reusable learning steps"
```

### Task 9: Learn navigation and prototype retirement

**Files:**
- Create: `web/src/app/Learn.tsx`
- Create: `web/src/app/Learn.test.tsx`
- Modify: `web/src/app/App.tsx`
- Modify: `web/src/app/App.test.tsx`
- Modify: `web/src/breakit-hook.ts`
- Delete: `web/src/drill/`
- Delete: `web/src/app/Drill.tsx`
- Delete: `web/src/app/Drill.test.tsx`
- Delete: `web/src/app/useDrill.ts`
- Delete: `web/src/bridge/drill-transport.test.ts`
- Modify: `docs/superpowers/specs/2026-07-10-first-guided-drill-design.md`

**Interfaces:**
- Consumes: `BLACKJACK_BASICS`, `LearnEngine`, `LessonController`, and `<Lesson>`.
- Produces: `<Learn />`, direct ordered unit selection/replay, and dev-only `window.__learn` hook.

- [ ] **Step 1: Write failing navigation tests**

Assert Learn shows `Blackjack Basics`, all nine units in order, any unit can be selected directly,
Return to units works, a completed unit can be replayed, and switching to Free Play does not alter
Free Play startup behavior.

- [ ] **Step 2: Run navigation tests and verify the red state**

Run: `npm --prefix web run test -- src/app/Learn.test.tsx src/app/App.test.tsx`

Expected: FAIL because the app still renders the flat prototype units.

- [ ] **Step 3: Implement Learn as the subject/unit owner**

Keep selected unit and controller in React state. Construct one `LearnEngine(new WasmTransport())`
and a fresh `LessonController` per opened unit. Render every unit as selectable; show prerequisites
as metadata only and do not lock anything.

```tsx
export function Learn() {
  const [controller, setController] = useState<LessonController | null>(null);
  const open = (unit: Unit) => {
    const next = new LessonController(
      new LearnEngine(new WasmTransport()), BLACKJACK_BASICS, unit,
      { seq: (() => { let value = 0; return () => value++; })(), freshSeed },
    );
    next.begin();
    setController(next);
    if (import.meta.env.DEV || import.meta.env.VITE_BREAKIT) {
      void import('../breakit-hook').then((module) => module.mountLearn(next));
    }
  };
  if (controller) return <Lesson controller={controller} onExit={() => setController(null)} />;
  return <section><h1>{BLACKJACK_BASICS.title}</h1><ul>{BLACKJACK_BASICS.units.map((unit) =>
    <li key={unit.id}><button onClick={() => open(unit)}>{unit.title}</button> — {unit.goal}</li>
  )}</ul></section>;
}
```

- [ ] **Step 4: Replace the drill QA hook**

Expose only `getState`, `answer`, `choose`, `continue`, `retry`, and `version:'learn-hook-1'` through
`mountLearn(controller)`. Retain dynamic dev-only import/tree-shaking behavior.

```ts
export interface LearnHook {
  getState: () => ReturnType<LessonController['getState']>;
  answer: (value: string) => void;
  choose: (action: string) => void;
  continue: () => void;
  retry: () => void;
  version: 'learn-hook-1';
}
```

- [ ] **Step 5: Delete prototype files after replacement tests pass**

Mark the old guided-drill design status as `Superseded by` the new design spec. Remove old imports,
tests, and files only after `rg 'DrillController|__drill|src/drill' web/src` returns no matches.

- [ ] **Step 6: Run full web verification**

Run: `npm --prefix web run test`

Expected: all web tests pass with the old drill suite removed and new Learn coverage present.

Run: `npm --prefix web run build`

Expected: production build passes and dev-only learning hooks are tree-shaken from it.

- [ ] **Step 7: Commit**

```bash
git add -A web/src docs/superpowers/specs/2026-07-10-first-guided-drill-design.md
git commit -m "feat(app): replace guided drill with learning path"
```

### Task 10: Learn browser QA role

**Files:**
- Create: `web/qa/learn/checks.ts`
- Create: `web/qa/learn/checks.test.ts`
- Create: `web/qa/learn/run.ts`
- Modify: `web/qa/run-all.ts`
- Modify: `web/package.json`
- Delete: `web/qa/drill/`

**Interfaces:**
- Consumes: `window.__learn`, `BLACKJACK_BASICS`, QA report helpers, and existing provenance checks.
- Produces: `npm run qa:learn`, report role `learn`, and the aggregate `npm run qa` gate.

- [ ] **Step 1: Write failing pure QA-check tests**

Cover all nine units visited, every declared required check passed, every arranged hand beginning
with arranged-origin cards, every live checkpoint card using normal deck IDs, 312-card composition,
no duplicate attempts, and recap capabilities matching unit outcomes.

- [ ] **Step 2: Run the check tests and verify the red state**

Run: `npm --prefix web run test -- qa/learn/checks.test.ts`

Expected: FAIL because the Learn QA role does not exist.

- [ ] **Step 3: Implement a deterministic browser driver**

Drive each unit through semantic UI controls or `window.__learn`; answer one selected question
incorrectly before retrying to prove recovery; complete every required check; play every arranged
hand; and finish the live checkpoint. Collect unit ID, step count, attempt count, required checks,
arranged hands, and live hands.

- [ ] **Step 4: Preserve and rename the Tier-1 gate**

Set `package.json` to `"qa:learn": "tsx qa/learn/run.ts"`. Replace the aggregate role with
`{ name: 'learn', entry: 'qa/learn/run.ts' }`. Delete `qa:drill` only in the same commit so the
aggregate gate never has a missing role.

- [ ] **Step 5: Run deterministic QA checks and the browser role**

Run: `npm --prefix web run test -- qa/learn/checks.test.ts`

Expected: pure checks pass.

Run: `npm --prefix web run qa:learn`

Expected: PASS; 9/9 units, all required checks, arranged/live provenance, composition, retry,
recap, accessibility-critical controls, and console cleanliness pass. The runner writes
`journal/qa/runs/2026-07-11-learn/report.md` and `.json`.

Use this driver loop shape, with a guard that fails rather than hanging:

```ts
for (const unit of BLACKJACK_BASICS.units) {
  await openUnit(page, unit.title);
  let injectedRetry = false;
  for (let guard = 0; guard < 120; guard++) {
    const state = await page.evaluate(() => window.__learn.getState());
    if (state.completed) break;
    if (state.step?.type === 'question') {
      if (!injectedRetry && state.step.answer.kind === 'literal') {
        const correct = state.step.answer.value;
        const wrong = state.step.choices.find((choice) => choice.value !== correct)!;
        await page.evaluate((value) => window.__learn.answer(value), wrong.value);
        await page.evaluate(() => window.__learn.retry());
        injectedRetry = true;
      }
      for (const choice of state.step.choices) {
        await page.evaluate((value) => window.__learn.answer(value), choice.value);
        const after = await page.evaluate(() => window.__learn.getState());
        if (after.awaitingContinue) break;
        await page.evaluate(() => window.__learn.retry());
        injectedRetry = true;
      }
    } else if (state.step?.type === 'hand' && state.legalActions.length) {
      const action = state.step.requestedAction && state.legalActions.includes(state.step.requestedAction)
        ? state.step.requestedAction
        : state.legalActions.includes('stand') ? 'stand' : state.legalActions[0]!;
      await page.evaluate((value) => window.__learn.choose(value), action);
    } else {
      await page.evaluate(() => window.__learn.continue());
    }
  }
  const final = await page.evaluate(() => window.__learn.getState());
  coverage.push({ unitId: unit.id, completed: final.completed, attempts: final.attempts.length });
}
```

- [ ] **Step 6: Commit**

```bash
git add -A web/qa web/package.json journal/qa/runs
git commit -m "test(qa): cover blackjack basics learning path"
```

### Task 11: Feature QA, ledger reconciliation, and final verification

**Files:**
- Modify: `journal/qa/ledger.md`
- Modify only if findings require fixes: changed source/test files from Tasks 1–10
- Add through QA runner: `journal/qa/runs/2026-07-11-learn/report.md`
- Add through QA runner: `journal/qa/runs/2026-07-11-learn/report.json`

**Interfaces:**
- Consumes: the complete feature, QA process, and current ledger coverage.
- Produces: a recorded feature-QA verdict and a clean implementation branch ready for review.

- [ ] **Step 1: Read the QA ledger before scoping**

Read `journal/qa/ledger.md` and `docs/specs/qa-playtest-process.md`. Deep-test the new hand-facts
boundary, all learning-domain/UI/QA surfaces, and the prototype removal. Smoke-test proven Free
Play, rules, flow, history, robustness, and oracle behavior.

- [ ] **Step 2: Run deterministic gates from a fresh state**

Run: `cargo fmt --all -- --check`

Expected: exit 0.

Run: `cargo test -p blackjack-core`

Expected: all Rust tests pass.

Run: `cargo clippy -p blackjack-core --all-targets --all-features -- -D warnings`

Expected: exit 0 with no warnings.

Run: `npm --prefix web run test`

Expected: all web and QA-check tests pass.

Run: `npm --prefix web run build`

Expected: TypeScript and production build pass with fresh WASM.

Run: `npm --prefix web run qa`

Expected: rules, flow, breakit, and learn roles all PASS.

- [ ] **Step 3: Run the required Player Experience pass**

Play all nine units as a complete beginner. Judge concept order, copy clarity, retry behavior,
action/outcome separation, complete-round readiness, navigation, and functional accessibility.
Do not fail the feature for absent V3 animation, illustration, rewards, or visual polish.

- [ ] **Step 4: Fix and re-run any finding before recording PASS**

For each finding, add a regression test first, reproduce the failure, implement the smallest fix,
and rerun the focused test plus the affected QA role. Do not record PASS while a product-blocking
finding remains open.

- [ ] **Step 5: Update the ledger with exact coverage**

Replace or supersede the `Guided drill learning loop` row with `Blackjack Basics learning system`,
the tested commit, the Learn surfaces, the `qa:learn` report ID, and PASS/FAIL. Record every new
finding in the findings register with status and evidence.

- [ ] **Step 6: Run final repository checks**

Run: `rg 'DrillController|__drill|qa:drill|web/qa/drill|web/src/drill' web docs/superpowers/specs/2026-07-10-first-guided-drill-design.md journal/qa/ledger.md`

Expected: no live-code or active-QA references; only the old spec's explicit superseded-history wording may remain.

Run: `git diff --check`

Expected: no whitespace errors.

Run: `git status --short`

Expected: only intended ledger/report/finding-fix files are modified.

- [ ] **Step 7: Commit the QA verdict**

```bash
git add journal/qa/ledger.md journal/qa/runs web crates/blackjack-core
git commit -m "test(qa): close blackjack basics feature"
```

## Spec Coverage Map

- Product outcome and complete-beginner boundary: Tasks 6–9.
- Nine-unit curriculum and two-to-four-minute lesson rhythm: Tasks 6–7.
- Explicit skills, prerequisites, outcomes, checks, and future skip-test inputs: Tasks 3, 6, and 7.
- Engine-owned scoring, session facts, legal actions, card flow, and settlement: Tasks 1, 2, 4, and 5.
- Serializable curriculum and deterministic state machine: Tasks 3–5.
- Attempt evidence, retries, completion, recap, and error behavior: Tasks 3–5 and 8.
- Plain mechanics-first React presentation and direct unit access: Tasks 8–9.
- Prototype migration and Free Play preservation: Task 9.
- Browser QA, ledger-driven feature QA, and Player Experience judgment: Tasks 10–11.
- Strategy Table Fundamentals, persistence, skip tests, mastery, generic infrastructure, and V3
  visuals remain excluded by Global Constraints and Task 11's final scope audit.

## Execution Notes

- Use an isolated worktree at execution time if the current checkout contains unrelated work.
- Do not start Strategy Table Fundamentals inside this plan. Its design begins only after this
  feature's recorded PASS verdict.
- Review each task's diff before moving to the next commit. A failed task gate blocks dependent
  tasks; do not accumulate failures for the final QA task.
