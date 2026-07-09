# Free Play Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the 10-value split rule and add the smallest useful Free Play feedback polish: per-hand results and a visible insurance auto-decline notice.

**Architecture:** The Rust core remains the only owner of blackjack rules. The React UI reads existing session/log state through `GameController`; it does not compute blackjack outcomes or legal actions. Insurance stays auto-decline for this pass because the current ruleset and core expose only `insurance_auto_decline` plus `insurance_declined` logs, not a player insurance action.

**Tech Stack:** Rust 2024 core crate with `cargo test`; Vite + React + TypeScript with Vitest and Testing Library.

## Global Constraints

- Treat this as a training product, not gambling software.
- Do not fake card flow: build shoes, shuffle once, deal from the ordered shoe, and keep card origins traceable.
- TypeScript is the default for browser UI, interaction state, and lightweight app shell code.
- Keep the simulator core UI-independent; UI code should call engine APIs, not own blackjack rules.
- Default V1 storage is in-memory state.
- No new dependency for this polish pass.
- Do not implement player-taken insurance in this pass; current V1 rules say `insurance_auto_decline: true`, so this plan only surfaces the existing auto-decline behavior.

---

## File Structure

- Modify `crates/blackjack-core/src/rules.rs`: change the shared split eligibility check from equal rank to equal split value, so `10/J/Q/K` pairs are splittable.
- Modify `crates/blackjack-core/tests/rules_tests.rs`: add direct rule tests for 10-value splitting and non-pair rejection.
- Modify `crates/blackjack-core/tests/session_tests.rs`: add one session-level regression for the playtest case, proving `current_legal_actions` exposes `Split`.
- Modify `web/src/bridge/game.ts`: keep the latest resolved `HandOutcome[]` in `GameState`, and set an existing `notice` when the core logs `insurance_declined`.
- Modify `web/src/bridge/game.test.ts`: test that resolved outcomes and insurance notices survive the controller boundary.
- Modify `web/src/app/Table.tsx`: display each resolved hand's result next to the hand.
- Modify `web/src/app/Table.test.tsx`: test the rendered result and the existing status rendering for insurance notice.

No new files. No new abstractions. No full insurance action state machine.

---

### Task 1: Fix 10-Value Split Eligibility In The Core

**Files:**
- Modify: `crates/blackjack-core/src/rules.rs`
- Modify: `crates/blackjack-core/tests/rules_tests.rs`
- Modify: `crates/blackjack-core/tests/session_tests.rs`

**Interfaces:**
- Consumes: existing `legal_actions(hand: &HandState, ruleset: &Ruleset, hand_count: usize, bankroll_available: i32) -> Vec<Action>`.
- Produces: unchanged `legal_actions` signature; `Action::Split` is now present for any two cards with equal blackjack split value, including `Ten`, `Jack`, `Queen`, and `King`.

- [ ] **Step 1: Add direct failing rule tests**

Append these tests to `crates/blackjack-core/tests/rules_tests.rs`:

```rust
#[test]
fn allows_split_for_any_two_ten_value_cards() {
    let hand = HandState {
        cards: vec![card(Rank::Ten, "10c"), card(Rank::Queen, "qc")],
        wager: 25,
        is_complete: false,
        is_doubled: false,
        source: HandSource::Initial,
    };

    assert_eq!(
        legal_actions(&hand, &v1_h17_ruleset(), 1, 100),
        vec![Action::Hit, Action::Stand, Action::Double, Action::Split]
    );
}

#[test]
fn rejects_split_for_different_non_ten_values() {
    let hand = HandState {
        cards: vec![card(Rank::Eight, "8"), card(Rank::Nine, "9")],
        wager: 25,
        is_complete: false,
        is_doubled: false,
        source: HandSource::Initial,
    };

    assert_eq!(
        legal_actions(&hand, &v1_h17_ruleset(), 1, 100),
        vec![Action::Hit, Action::Stand, Action::Double]
    );
}
```

- [ ] **Step 2: Add the session-level regression**

Append this test to `crates/blackjack-core/tests/session_tests.rs`:

```rust
#[test]
fn ten_and_face_card_can_split_through_session_legal_actions() {
    let mut session = start_session("ten-face-split", 10_000, 10, None).expect("session");
    session.shoe.cards = vec![
        card("p1", Rank::Ten, Suit::Clubs),
        card("d1", Rank::Nine, Suit::Clubs),
        card("p2", Rank::Queen, Suit::Clubs),
        card("d2", Rank::King, Suit::Diamonds),
        card("split-1", Rank::Two, Suit::Hearts),
        card("split-2", Rank::Three, Suit::Spades),
    ];
    session.shoe.cursor = 0;
    session.shoe.penetration_index = usize::MAX;

    start_round(&mut session, None).expect("round");

    assert!(
        current_legal_actions(&session)
            .expect("legal")
            .contains(&Action::Split)
    );
}
```

- [ ] **Step 3: Run the focused tests and verify they fail**

Run:

```bash
cargo test -p blackjack-core allows_split_for_any_two_ten_value_cards
cargo test -p blackjack-core ten_and_face_card_can_split_through_session_legal_actions
```

Expected: both new split tests fail because `rules.rs` currently compares `hand.cards[0].rank == hand.cards[1].rank`.

- [ ] **Step 4: Implement the minimal shared rule fix**

In `crates/blackjack-core/src/rules.rs`, replace:

```rust
let is_pair = hand.cards.len() == 2 && hand.cards[0].rank == hand.cards[1].rank;
```

with:

```rust
let is_pair = hand.cards.len() == 2
    && rank_value(&hand.cards[0].rank) == rank_value(&hand.cards[1].rank);
```

- [ ] **Step 5: Run the focused tests and verify they pass**

Run:

```bash
cargo test -p blackjack-core allows_split_for_any_two_ten_value_cards
cargo test -p blackjack-core rejects_split_for_different_non_ten_values
cargo test -p blackjack-core ten_and_face_card_can_split_through_session_legal_actions
```

Expected: all three named test commands pass.

- [ ] **Step 6: Run the core suite**

Run:

```bash
cargo test -p blackjack-core
```

Expected: the full `blackjack-core` test suite passes.

- [ ] **Step 7: Commit**

Run:

```bash
git add crates/blackjack-core/src/rules.rs crates/blackjack-core/tests/rules_tests.rs crates/blackjack-core/tests/session_tests.rs
git commit -m "fix(core): allow splitting any two ten-value cards"
```

---

### Task 2: Carry Resolved Outcomes Through The Controller

**Files:**
- Modify: `web/src/bridge/game.ts`
- Modify: `web/src/bridge/game.test.ts`

**Interfaces:**
- Consumes: existing `RoundLog.outcomes: HandOutcome[]` from the Rust boundary.
- Produces: `GameState.lastOutcomes: HandOutcome[]`, cleared when a new round starts and set from the latest resolved log.

- [ ] **Step 1: Add a failing controller test for resolved outcomes**

In `web/src/bridge/game.test.ts`, update the type import:

```ts
import type { CoreTransport } from './transport';
import type { SessionState } from './types';
```

Append this test inside `describe('GameController', () => { ... })`:

```ts
it('keeps latest resolved hand outcomes in state for the table UI', async () => {
  const base = (round: SessionState['round'], logs: SessionState['logs'] = []): SessionState => ({
    seed: 's',
    ruleset: {
      id: 'v1', decks: 6, penetration_percent: 75, dealer_soft_17: 'hit', blackjack_payout: 1.5,
      max_split_hands: 4, double_after_split: true, resplit_aces: false,
      split_aces_receive_one_card: true, insurance_auto_decline: true,
    },
    shoe: { seed: 's', shoe_number: 1, cards: [], cursor: 0, discard: [], penetration_index: 234 },
    bankroll: 102000, default_bet: 2000, round, logs,
  });
  const resolvedRound: SessionState['round'] = {
    status: 'resolved', bet: 2000, active_hand_index: 0, dealer: { cards: [] },
    hands: [], dealt_cards: [], actions: [], bankroll_before: 100000,
  };
  const ok = (data: SessionState) => JSON.stringify({ status: 'ok', response: { type: 'session', data } });
  const fake: CoreTransport = {
    call(json: string): string {
      const cmd = JSON.parse(json);
      if (cmd.command === 'start_session') return ok(base(null));
      if (cmd.command === 'start_round') return ok(base(resolvedRound, [{
        seed: 's',
        ruleset: base(null).ruleset,
        shoe_number: 1,
        dealt_cards: [],
        actions: [],
        outcomes: [{ hand_index: 0, result: 'win', wager: 2000, delta: 2000 }],
        bankroll_before: 100000,
        bankroll_after: 102000,
        bankroll_delta: 2000,
        penetration_reached: false,
      }]));
      return '{"status":"ok","response":{"type":"actions","data":[]}}';
    },
  };
  const c = new GameController(fake, new MemorySink(), { now: () => 't' }, { next: () => 'sid' });

  await c.startSession('s', 100000, 2000);
  await c.startRound(2000);

  expect(c.getState().lastOutcomes).toEqual([{ hand_index: 0, result: 'win', wager: 2000, delta: 2000 }]);
});
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```bash
cd web
npm test -- src/bridge/game.test.ts -t "keeps latest resolved hand outcomes"
```

Expected: TypeScript or Vitest fails because `lastOutcomes` does not exist on `GameState`.

- [ ] **Step 3: Add `lastOutcomes` to controller state**

In `web/src/bridge/game.ts`, replace the import line with:

```ts
import type { Action, CliOutput, CoreCommand, HandOutcome, Ruleset, SessionState } from './types';
```

In `GameState`, add:

```ts
  lastOutcomes: HandOutcome[];   // latest resolved round outcomes for display
```

In the initial `state`, add:

```ts
    lastOutcomes: [],
```

In `startSession`, replace:

```ts
    this.set({ noteDraft: '', notice: null, canNote: false });
```

with:

```ts
    this.set({ noteDraft: '', notice: null, canNote: false, lastOutcomes: [] });
```

In `startRound`, replace:

```ts
    this.set({ notice: null });
```

with:

```ts
    this.set({ notice: null, lastOutcomes: [] });
```

In `applySession`, replace the whole method with:

```ts
  private async applySession(next: SessionState): Promise<void> {
    // We always send logs:[] onward, so next.logs holds only rounds resolved by THIS command.
    // Buffer the resolved round instead of writing it now, so a note typed after the hand
    // (attach-on-Deal) rides along when it flushes. At most one round resolves per command.
    let lastOutcomes = this.state.lastOutcomes;
    for (const log of next.logs) {
      if (this.pendingLine) await this.writePending(null); // defensive; never expected
      this.pendingLine = {
        type: 'round', schema_version: SCHEMA_VERSION, session_id: this.sessionId,
        round_index: this.roundIndex++, ts: this.clock.now(), note: null, ...log,
      };
      lastOutcomes = log.outcomes;
      this.set({ canNote: true });
    }
    this.set({ session: this.strip(next), lastOutcomes, lastError: null });
  }
```

- [ ] **Step 4: Run the focused controller test**

Run:

```bash
cd web
npm test -- src/bridge/game.test.ts -t "keeps latest resolved hand outcomes"
```

Expected: the focused test passes.

- [ ] **Step 5: Run all bridge controller tests**

Run:

```bash
cd web
npm test -- src/bridge/game.test.ts
```

Expected: all `GameController` tests pass.

- [ ] **Step 6: Commit**

Run:

```bash
git add web/src/bridge/game.ts web/src/bridge/game.test.ts
git commit -m "feat(web): retain latest hand outcomes for display"
```

---

### Task 3: Render Per-Hand Outcome Indicators

**Files:**
- Modify: `web/src/app/Table.tsx`
- Modify: `web/src/app/Table.test.tsx`

**Interfaces:**
- Consumes: `GameState.lastOutcomes: HandOutcome[]` from Task 2.
- Produces: a visible per-hand result string after round resolution, formatted as `Win (+$20.00)`, `Loss (-$20.00)`, `Push ($0.00)`, or `Blackjack (+$30.00)`.

- [ ] **Step 1: Add a failing UI test**

Append this fake transport and test to `web/src/app/Table.test.tsx`:

```tsx
class ResolvedTransport implements CoreTransport {
  call(json: string): string {
    const cmd = JSON.parse(json);
    const ruleset = { id: 'v1-modern-classic-h17-6d', decks: 6, penetration_percent: 75, dealer_soft_17: 'hit', blackjack_payout: 1.5, max_split_hands: 4, double_after_split: true, resplit_aces: false, split_aces_receive_one_card: true, insurance_auto_decline: true };
    const round = {
      status: 'resolved',
      bet: 2000,
      active_hand_index: 0,
      dealer: { cards: [{ card_id: 'd1', deck_id: 'deck-1', rank: 'nine', suit: 'clubs' }] },
      hands: [{ cards: [{ card_id: 'p1', deck_id: 'deck-1', rank: 'ten', suit: 'clubs' }, { card_id: 'p2', deck_id: 'deck-1', rank: 'queen', suit: 'clubs' }], wager: 2000, is_complete: true, is_doubled: false, source: 'initial' }],
      dealt_cards: [],
      actions: [],
      bankroll_before: 100000,
    };
    const session = {
      seed: 'free-play',
      ruleset,
      shoe: { seed: 'free-play', shoe_number: 1, cards: [], cursor: 0, discard: [], penetration_index: 234 },
      bankroll: 102000,
      default_bet: 2000,
      round: cmd.command === 'start_session' ? null : round,
      logs: cmd.command === 'start_round' ? [{
        seed: 'free-play',
        ruleset,
        shoe_number: 1,
        dealt_cards: [],
        actions: [],
        outcomes: [{ hand_index: 0, result: 'win', wager: 2000, delta: 2000 }],
        bankroll_before: 100000,
        bankroll_after: 102000,
        bankroll_delta: 2000,
        penetration_reached: false,
      }] : [],
    };
    return JSON.stringify({ status: 'ok', response: { type: 'session', data: session } });
  }
}

it('shows the resolved outcome beside the hand', async () => {
  const c = new GameController(new ResolvedTransport(), new MemorySink(), { now: () => 't' }, { next: () => 'sid' });
  render(<Table controller={c} />);
  await fireEvent.click(screen.getByRole('button', { name: /start session/i }));
  await fireEvent.click(screen.getByRole('button', { name: /deal/i }));

  expect(await screen.findByText(/Win \(\+\$20\.00\)/)).toBeTruthy();
});
```

- [ ] **Step 2: Run the focused UI test and verify it fails**

Run:

```bash
cd web
npm test -- src/app/Table.test.tsx -t "shows the resolved outcome"
```

Expected: the test fails because the table does not render outcomes.

- [ ] **Step 3: Render outcomes in `Table.tsx`**

In `web/src/app/Table.tsx`, replace:

```tsx
import type { GameController } from '../bridge/game';
```

with:

```tsx
import type { GameController } from '../bridge/game';
import type { HandOutcome } from '../bridge/types';
```

Add these helpers below the imports:

```tsx
const RESULT_LABEL: Record<HandOutcome['result'], string> = {
  win: 'Win',
  loss: 'Loss',
  push: 'Push',
  blackjack: 'Blackjack',
};

function formatOutcome(outcome: HandOutcome): string {
  const dollars = `$${(Math.abs(outcome.delta) / 100).toFixed(2)}`;
  const signed = outcome.delta > 0 ? `+${dollars}` : outcome.delta < 0 ? `-${dollars}` : dollars;
  return `${RESULT_LABEL[outcome.result]} (${signed})`;
}
```

Inside `Table`, after:

```tsx
  const round = s.round;
```

add:

```tsx
  const outcomesByHand = new Map(state.lastOutcomes.map((outcome) => [outcome.hand_index, outcome]));
```

Replace:

```tsx
      {round ? round.hands.map((h, i) => <HandView key={i} label={`Hand ${i + 1}`} cards={h.cards} />) : null}
```

with:

```tsx
      {round ? round.hands.map((h, i) => {
        const outcome = outcomesByHand.get(i);
        return (
          <div key={i}>
            <HandView label={`Hand ${i + 1}`} cards={h.cards} />
            {outcome ? <span>{formatOutcome(outcome)}</span> : null}
          </div>
        );
      }) : null}
```

- [ ] **Step 4: Run the focused UI test**

Run:

```bash
cd web
npm test -- src/app/Table.test.tsx -t "shows the resolved outcome"
```

Expected: the focused test passes.

- [ ] **Step 5: Run app tests**

Run:

```bash
cd web
npm test -- src/app/Table.test.tsx
```

Expected: all table tests pass.

- [ ] **Step 6: Commit**

Run:

```bash
git add web/src/app/Table.tsx web/src/app/Table.test.tsx
git commit -m "feat(web): show resolved hand outcomes"
```

---

### Task 4: Surface Existing Insurance Auto-Decline

**Files:**
- Modify: `web/src/bridge/game.ts`
- Modify: `web/src/bridge/game.test.ts`
- Modify: `web/src/app/Table.test.tsx`

**Interfaces:**
- Consumes: existing `RoundState.actions: ActionLog[]` entries with `action: 'insurance_declined'`.
- Produces: existing `GameState.notice: string | null` set to `Insurance auto-declined` when a dealt round includes that action. `Table.tsx` already renders `state.notice` in a status paragraph.

- [ ] **Step 1: Add a failing controller test**

Append this test inside `describe('GameController', () => { ... })` in `web/src/bridge/game.test.ts`:

```ts
it('sets a notice when insurance is auto-declined by the core', async () => {
  const ruleset = {
    id: 'v1', decks: 6, penetration_percent: 75, dealer_soft_17: 'hit' as const, blackjack_payout: 1.5,
    max_split_hands: 4, double_after_split: true, resplit_aces: false,
    split_aces_receive_one_card: true, insurance_auto_decline: true,
  };
  const round: SessionState['round'] = {
    status: 'player_turn',
    bet: 2000,
    active_hand_index: 0,
    dealer: { cards: [{ card_id: 'dealer-ace', deck_id: 'deck-1', rank: 'ace', suit: 'spades' }] },
    hands: [],
    dealt_cards: [],
    actions: [{ action: 'insurance_declined', hand_index: 0, card_id: null }],
    bankroll_before: 100000,
  };
  const session = (activeRound: SessionState['round']): SessionState => ({
    seed: 's',
    ruleset,
    shoe: { seed: 's', shoe_number: 1, cards: [], cursor: 0, discard: [], penetration_index: 234 },
    bankroll: 100000,
    default_bet: 2000,
    round: activeRound,
    logs: [],
  });
  const fake: CoreTransport = {
    call(json: string): string {
      const cmd = JSON.parse(json);
      const data = cmd.command === 'start_round' ? session(round) : session(null);
      return JSON.stringify({ status: 'ok', response: { type: 'session', data } });
    },
  };
  const c = new GameController(fake, new MemorySink(), { now: () => 't' }, { next: () => 'sid' });

  await c.startSession('s', 100000, 2000);
  await c.startRound(2000);

  expect(c.getState().notice).toBe('Insurance auto-declined');
});
```

- [ ] **Step 2: Run the focused controller test and verify it fails**

Run:

```bash
cd web
npm test -- src/bridge/game.test.ts -t "sets a notice when insurance is auto-declined"
```

Expected: the test fails because `notice` stays `null`.

- [ ] **Step 3: Set the notice from existing round actions**

In `web/src/bridge/game.ts`, in `applySession`, replace:

```ts
    this.set({ session: this.strip(next), lastOutcomes, lastError: null });
```

with:

```ts
    const notice = next.round?.actions.some((item) => item.action === 'insurance_declined')
      ? 'Insurance auto-declined'
      : this.state.notice;
    this.set({ session: this.strip(next), lastOutcomes, notice, lastError: null });
```

- [ ] **Step 4: Run the focused controller test**

Run:

```bash
cd web
npm test -- src/bridge/game.test.ts -t "sets a notice when insurance is auto-declined"
```

Expected: the focused test passes.

- [ ] **Step 5: Add a UI smoke test for the status text**

Append this test to `web/src/app/Table.test.tsx`:

```tsx
class InsuranceDeclinedTransport implements CoreTransport {
  call(json: string): string {
    const cmd = JSON.parse(json);
    const ruleset = { id: 'v1-modern-classic-h17-6d', decks: 6, penetration_percent: 75, dealer_soft_17: 'hit', blackjack_payout: 1.5, max_split_hands: 4, double_after_split: true, resplit_aces: false, split_aces_receive_one_card: true, insurance_auto_decline: true };
    const round = {
      status: 'player_turn',
      bet: 2000,
      active_hand_index: 0,
      dealer: { cards: [{ card_id: 'dealer-ace', deck_id: 'deck-1', rank: 'ace', suit: 'spades' }] },
      hands: [],
      dealt_cards: [],
      actions: [{ action: 'insurance_declined', hand_index: 0, card_id: null }],
      bankroll_before: 100000,
    };
    const session = {
      seed: 'free-play',
      ruleset,
      shoe: { seed: 'free-play', shoe_number: 1, cards: [], cursor: 0, discard: [], penetration_index: 234 },
      bankroll: 100000,
      default_bet: 2000,
      round: cmd.command === 'start_round' ? round : null,
      logs: [],
    };
    return JSON.stringify({ status: 'ok', response: { type: 'session', data: session } });
  }
}

it('shows when insurance is auto-declined', async () => {
  const c = new GameController(new InsuranceDeclinedTransport(), new MemorySink(), { now: () => 't' }, { next: () => 'sid' });
  render(<Table controller={c} />);
  await fireEvent.click(screen.getByRole('button', { name: /start session/i }));
  await fireEvent.click(screen.getByRole('button', { name: /deal/i }));

  expect(await screen.findByText(/insurance auto-declined/i)).toBeTruthy();
});
```

- [ ] **Step 6: Run web tests**

Run:

```bash
cd web
npm test
```

Expected: all web tests pass.

- [ ] **Step 7: Commit**

Run:

```bash
git add web/src/bridge/game.ts web/src/bridge/game.test.ts web/src/app/Table.test.tsx
git commit -m "feat(web): surface auto-declined insurance"
```

---

### Task 5: Final Verification And Phase Notes

**Files:**
- Modify: `journal/ops/tasks.md`
- Modify: `PROGRESS.md`

**Interfaces:**
- Consumes: all commits from Tasks 1-4.
- Produces: current phase notes that say the V1 polish pass handled the split gap, outcome indicator, and auto-decline insurance visibility.

- [ ] **Step 1: Run full verification**

Run:

```bash
cargo test -p blackjack-core
cd web
npm test
npm run build
```

Expected: Rust tests pass, web tests pass, and the web production build completes.

- [ ] **Step 2: Update `journal/ops/tasks.md`**

Replace the Active section with:

```markdown
## Active - phase boundary: V1 Free Play skeleton complete -> decide direction
V1 Free Play exit criteria are met (craft gate PASS). The scoped Free Play polish pass fixed the
split-legality gap and made resolved outcomes plus auto-declined insurance visible in the UI.

- [ ] **Decide the next phase**: move to V2 Basic Strategy, unless a fresh playtest exposes a
      small V1 blocker.
```

Keep the existing Done sections below it.

- [ ] **Step 3: Update `PROGRESS.md`**

Under `## Done`, add this bullet:

```markdown
- **V1 Free Play polish scoped and shipped**: any two 10-value cards can split through the shared core legal-action rule; the table shows per-hand win/loss/push/blackjack outcomes after resolution; dealer-ace insurance auto-decline is visible instead of silent.
```

Under `## Open questions`, remove these bullets if present:

```markdown
- **Split legality (investigate first - possible bug)**: player expected to split two different 10-value cards (10♣/Q♣) and it wasn't offered. Does the core split rule require equal *rank* or equal *value*? Standard casinos allow splitting any two 10-value cards.
- Per-hand win/lose/push outcome indicator, and an insurance take/decline UI - captured playtest requests.
```

Add this bullet if the product still wants true insurance decisions:

```markdown
- Should a later ruleset support player-taken insurance, or should V1/V2 keep training auto-decline?
```

- [ ] **Step 4: Commit docs**

Run:

```bash
git add journal/ops/tasks.md PROGRESS.md
git commit -m "docs: record V1 Free Play polish pass"
```

---

## Self-Review Notes

- Spec coverage: split bug is fixed at the shared rule gate, outcome indicator uses existing `RoundLog.outcomes`, and insurance visibility uses existing `insurance_declined` logs.
- Placeholder scan: no empty implementation slots; each task has exact file paths, code snippets, commands, and expected results.
- Type consistency: `GameState.lastOutcomes` uses existing `HandOutcome`; UI consumes the same field; no Rust boundary shape changes.
- Deliberate skip: full player insurance take/decline is not in this pass because it requires new core actions, side-bet wagers, payout settlement, and more tests. Add it when the ruleset changes from `insurance_auto_decline: true`.
