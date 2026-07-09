# V1 QA Remediation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the six findings from the 2026-07-09 V1 milestone QA (`journal/qa/ledger.md`) that gate the move to V2: the history-duplication race (QA-003), the stale-WASM build gap (QA-001), missing hand totals (QA-005), missing active-hand indicator (QA-004), the fixed session seed (QA-009), and the bankroll dead-end (QA-007).

**Architecture:** All fixes are on the web side (`web/`); the Rust core in `crates/` is untouched. QA-003 and QA-007 change `GameController` (`web/src/bridge/game.ts`); QA-001 adds a bash freshness guard wired into npm lifecycle hooks; QA-004/005/009 change the React components (`web/src/app/`), adding two tiny new modules (`totals.ts`, `seed.ts`).

**Tech Stack:** TypeScript (strict) + React 18 + Vite, tests with Vitest (+ @testing-library/react under jsdom for components), bash for the build guard. Some `game.test.ts` tests drive the real Rust CLI (`cargo build -p blackjack-core` runs in `beforeAll` — first run is slow, that's normal).

## Global Constraints

- All commands run from `web/` unless stated otherwise. Test commands: `npx vitest run <file>` for one file, `npm test` for the suite.
- Money is integer **cents** on the wire; UI displays `(cents / 100).toFixed(2)`.
- `web/src/bridge/types.ts` mirrors the Rust serde wire format **verbatim snake_case** and is guarded by `contract.test.ts` golden fixtures. Do NOT modify it or anything in `crates/` in this plan.
- The UI is intentionally unstyled plain React (styling is V3 scope). No CSS, no UI libraries — plain elements only, matching the existing components.
- Engine owns blackjack rules. Task 3 introduces a deliberate, documented exception: a **display-only** total calculator in the UI. The engine still adjudicates every outcome; the wire will carry engine-computed totals in V2 when strategy hints need them. Keep the exception scoped to `totals.ts`.
- Commit after every task. Message prefixes follow repo convention: `fix:`, `feat:`, `test:`, `chore:`, with scope `(web)` for web-side changes.
- Do not edit `journal/qa/ledger.md` until Task 7 — it is updated once, with the final commit hashes.

---

### Task 1: QA-003 (blocker) — fix the same-tick flush race that duplicates history rounds

A resolved round is buffered in `GameController.pendingLine` and flushed on the next Deal or on Download. `writePending()` nulls `pendingLine` only **after** `await this.sink.write(...)`, so two flushes triggered in the same tick (an impatient double-click on Deal or Download history) both pass the `if (!this.pendingLine)` guard and write the same round twice. Fix: claim the line synchronously before awaiting.

**Files:**
- Modify: `web/src/bridge/game.ts:122-126` (the `writePending` method)
- Test: `web/src/bridge/game.test.ts`

**Interfaces:**
- Consumes: existing `GameController`, `MemorySink` (has `.text(): string` and `.export(): Promise<Blob>`), the `make()`/`roundLines()` helpers already defined at the top of `game.test.ts`.
- Produces: no signature changes — behavior fix only.

- [ ] **Step 1: Write the failing tests**

Append inside the existing `describe('GameController', ...)` block in `web/src/bridge/game.test.ts`:

```ts
  it('writes the buffered round exactly once when two Downloads race in the same tick', async () => {
    const { c, sink } = make();
    await c.startSession('seed-a', 100000, 2000);
    await c.startRound(2000);
    let guard = 0;
    while (c.getState().session!.round?.status === 'player_turn' && guard++ < 20) await c.act('stand');
    expect(c.getState().session!.round!.status).toBe('resolved');
    // Same-tick double flush — an impatient double-click on "Download history".
    await Promise.all([c.downloadLog(), c.downloadLog()]);
    expect(roundLines(sink.text())).toHaveLength(1);
  });

  it('writes the buffered round exactly once when Deal and Download race in the same tick', async () => {
    const { c, sink } = make();
    await c.startSession('seed-a', 100000, 2000);
    await c.startRound(2000);
    let guard = 0;
    while (c.getState().session!.round?.status === 'player_turn' && guard++ < 20) await c.act('stand');
    await Promise.all([c.startRound(2000), c.downloadLog()]);
    // Round 0 must appear exactly once (round 1 may still be buffered — buffered ≠ written).
    const written = roundLines(sink.text()).map((l) => JSON.parse(l).round_index);
    expect(written.filter((i) => i === 0)).toHaveLength(1);
  });
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run src/bridge/game.test.ts -t 'exactly once'`
Expected: both new tests FAIL — `expected [...] to have a length of 1 but got 2` (the duplicate write).

- [ ] **Step 3: Fix `writePending` to claim before awaiting**

In `web/src/bridge/game.ts`, replace the whole `writePending` method (currently lines 122–126):

```ts
  private async writePending(note: string | null): Promise<void> {
    const line = this.pendingLine;
    if (!line) return;
    this.pendingLine = null; // claim synchronously: a same-tick second flush must see it taken (QA-003)
    await this.sink.write({ ...line, note });
  }
```

- [ ] **Step 4: Run the full bridge test file**

Run: `npx vitest run src/bridge/game.test.ts`
Expected: ALL tests PASS (the two new ones plus the ten existing).

- [ ] **Step 5: Commit**

```bash
git add src/bridge/game.ts src/bridge/game.test.ts
git commit -m "fix(web): claim buffered round before awaited write so same-tick double flush can't duplicate history (QA-003)"
```

---

### Task 2: QA-001 (major) — fail dev/build/test when the WASM artifact is stale

The browser engine is a gitignored artifact (`web/src/bridge/wasm/blackjack_core_bg.wasm`) produced by `npm run build:wasm`. Nothing ties it to the Rust sources, so `dev`/`build`/`test` happily run a stale engine — this is exactly how the split-10 fix silently missed the milestone QA build. Fix: a freshness check script wired as npm `pre` hooks; it fails fast with the command to run.

**Files:**
- Create: `web/scripts/check-wasm-fresh.sh`
- Modify: `web/package.json` (add `predev`, `prebuild`, `pretest` scripts)

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: `npm run dev` / `npm run build` / `npm test` now abort with exit 1 and the message `stale wasm: <file> is newer than <artifact> — run 'npm run build:wasm'` whenever any file under `crates/blackjack-core/src/` or `crates/blackjack-core/Cargo.toml` is newer than the artifact. Later tasks rely on `npm test` implying a fresh engine.

- [ ] **Step 1: Write the check script**

Create `web/scripts/check-wasm-fresh.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail
# Guard dev/build/test from silently running a stale engine (QA-001, run 2026-07-09-v1-milestone):
# the wasm artifact is gitignored, so nothing else ties it to the Rust core sources.
# npm runs this from web/; paths below are repo-root-relative, so cd there first (same as build-wasm.sh).
cd "$(dirname "$0")/../.."
WASM=web/src/bridge/wasm/blackjack_core_bg.wasm
if [[ ! -f "$WASM" ]]; then
  echo "wasm artifact missing: $WASM — run 'npm run build:wasm' (from web/)" >&2
  exit 1
fi
NEWER=$(find crates/blackjack-core/src crates/blackjack-core/Cargo.toml -type f -newer "$WASM" -print -quit)
if [[ -n "$NEWER" ]]; then
  echo "stale wasm: $NEWER is newer than $WASM — run 'npm run build:wasm' (from web/)" >&2
  exit 1
fi
```

Then: `chmod +x scripts/check-wasm-fresh.sh`

- [ ] **Step 2: Verify both script outcomes by hand**

```bash
bash scripts/check-wasm-fresh.sh && echo FRESH
```
Expected: `FRESH` (the artifact was rebuilt today, after the last core change).

```bash
touch ../crates/blackjack-core/src/lib.rs
bash scripts/check-wasm-fresh.sh; echo "exit=$?"
```
Expected: `stale wasm: crates/blackjack-core/src/lib.rs is newer than web/src/bridge/wasm/blackjack_core_bg.wasm — run 'npm run build:wasm' (from web/)` and `exit=1`.

- [ ] **Step 3: Wire the npm pre-hooks**

In `web/package.json`, replace the `"scripts"` block with:

```json
  "scripts": {
    "build:wasm": "bash scripts/build-wasm.sh",
    "predev": "bash scripts/check-wasm-fresh.sh",
    "dev": "vite",
    "prebuild": "bash scripts/check-wasm-fresh.sh",
    "build": "tsc --noEmit && vite build",
    "pretest": "bash scripts/check-wasm-fresh.sh",
    "test": "vitest run"
  },
```

(Note: npm pre-hooks match exact script names, so `build:wasm` is NOT guarded — intended, it's the fixer.)

- [ ] **Step 4: Verify the hook fires, then restore a genuinely fresh artifact**

```bash
npm test; echo "exit=$?"
```
Expected: the stale message from Step 2 and `exit=1` — vitest never starts (lib.rs is still newer from Step 2).

```bash
npm run build:wasm && npm test
```
Expected: `wasm build complete -> web/src/bridge/wasm/` then the full suite runs and PASSES (25 tests after Task 1).

- [ ] **Step 5: Commit**

```bash
git add scripts/check-wasm-fresh.sh package.json
git commit -m "chore(web): fail dev/build/test when the wasm artifact is older than the Rust core (QA-001)"
```

---

### Task 3: QA-005 (major) — display hand totals for player hands and the dealer

No total is shown anywhere; players do mental math on every decision. Add a display-only total calculator (`totals.ts` — see Global Constraints for why this deliberate rule-duplication is acceptable and scoped) and render totals in `HandView`: `Hand 1 (17):`, soft hands as `Hand 1 (7/17):`, hidden dealer hole card as `Dealer (10 + ?):`.

**Files:**
- Create: `web/src/app/totals.ts`
- Create: `web/src/app/totals.test.ts`
- Modify: `web/src/app/HandView.tsx`
- Test: `web/src/app/Table.test.tsx` (one new component-level test)

**Interfaces:**
- Consumes: `Card`, `Rank` from `../bridge/types`.
- Produces: `handTotal(cards: Card[]): { total: number; soft: boolean }` and `totalLabel(cards: Card[]): string` from `web/src/app/totals.ts`; `HandView` keeps props `{ label: string; cards: Card[]; hideFrom?: number }` (Task 4 adds `active`).

- [ ] **Step 1: Write the failing unit tests**

Create `web/src/app/totals.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { handTotal, totalLabel } from './totals';
import type { Card, Rank } from '../bridge/types';

let n = 0;
const card = (rank: Rank): Card => ({ card_id: `c${n++}`, deck_id: 'd1', rank, suit: 'spades' });
const hand = (...ranks: Rank[]) => ranks.map(card);

describe('handTotal', () => {
  it('sums hard hands', () => {
    expect(handTotal(hand('ten', 'seven'))).toEqual({ total: 17, soft: false });
    expect(handTotal(hand('queen', 'jack'))).toEqual({ total: 20, soft: false });
  });
  it('counts an ace as 11 while that does not bust (soft)', () => {
    expect(handTotal(hand('ace', 'six'))).toEqual({ total: 17, soft: true });
    expect(handTotal(hand('ace', 'ace'))).toEqual({ total: 12, soft: true });
  });
  it('demotes aces to 1 as needed (hard)', () => {
    expect(handTotal(hand('ace', 'six', 'ten'))).toEqual({ total: 17, soft: false });
    expect(handTotal(hand('ace', 'ace', 'ten'))).toEqual({ total: 12, soft: false });
  });
  it('reports bust totals as-is', () => {
    expect(handTotal(hand('ten', 'nine', 'five'))).toEqual({ total: 24, soft: false });
  });
});

describe('totalLabel', () => {
  it('renders hard totals plainly', () => expect(totalLabel(hand('ten', 'seven'))).toBe('17'));
  it('renders soft totals as low/high', () => {
    expect(totalLabel(hand('ace', 'six'))).toBe('7/17');
    expect(totalLabel(hand('ace', 'ace'))).toBe('2/12');
  });
  it('renders exactly 21 plainly even when soft (blackjack reads as 21, not 11/21)', () => {
    expect(totalLabel(hand('ace', 'king'))).toBe('21');
  });
  it('renders no label for an empty hand', () => expect(totalLabel([])).toBe(''));
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run src/app/totals.test.ts`
Expected: FAIL — `Cannot find module './totals'` (or equivalent resolve error).

- [ ] **Step 3: Implement `totals.ts`**

Create `web/src/app/totals.ts`:

```ts
import type { Card, Rank } from '../bridge/types';

// DISPLAY-ONLY totals. The engine adjudicates all outcomes; this exists so players
// don't do mental math (QA-005). If it ever disagrees with an engine outcome, the
// engine is right and this file is the bug. V2 should move totals onto the wire.
const VALUE: Record<Rank, number> = {
  ace: 11, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7,
  eight: 8, nine: 9, ten: 10, jack: 10, queen: 10, king: 10,
};

export function handTotal(cards: Card[]): { total: number; soft: boolean } {
  let total = 0, aces = 0;
  for (const c of cards) { total += VALUE[c.rank]; if (c.rank === 'ace') aces++; }
  while (total > 21 && aces > 0) { total -= 10; aces--; }
  return { total, soft: aces > 0 };
}

/** '17' for hard, '7/17' for soft; exactly 21 always reads plainly as '21'. */
export function totalLabel(cards: Card[]): string {
  if (cards.length === 0) return '';
  const { total, soft } = handTotal(cards);
  return soft && total !== 21 ? `${total - 10}/${total}` : `${total}`;
}
```

- [ ] **Step 4: Run the unit tests**

Run: `npx vitest run src/app/totals.test.ts`
Expected: PASS (8 tests).

- [ ] **Step 5: Write the failing component test**

In `web/src/app/Table.test.tsx`, add this transport class after `InsuranceDeclinedTransport` (before `describe('Table', ...)`):

```tsx
class PlayerTurnTransport implements CoreTransport {
  call(json: string): string {
    const cmd = JSON.parse(json);
    const ruleset = { id: 'v1-modern-classic-h17-6d', decks: 6, penetration_percent: 75, dealer_soft_17: 'hit', blackjack_payout: 1.5, max_split_hands: 4, double_after_split: true, resplit_aces: false, split_aces_receive_one_card: true, insurance_auto_decline: true };
    const round = {
      status: 'player_turn',
      bet: 2000,
      active_hand_index: 0,
      dealer: { cards: [{ card_id: 'd1', deck_id: 'deck-1', rank: 'nine', suit: 'clubs' }, { card_id: 'd2', deck_id: 'deck-1', rank: 'king', suit: 'hearts' }] },
      hands: [{ cards: [{ card_id: 'p1', deck_id: 'deck-1', rank: 'ten', suit: 'clubs' }, { card_id: 'p2', deck_id: 'deck-1', rank: 'seven', suit: 'hearts' }], wager: 2000, is_complete: false, is_doubled: false, source: 'initial' }],
      dealt_cards: [],
      actions: [],
      bankroll_before: 100000,
    };
    const session = {
      seed: 'free-play',
      ruleset,
      shoe: { seed: 'free-play', shoe_number: 1, cards: [], cursor: 0, discard: [], penetration_index: 234 },
      bankroll: 98000,
      default_bet: 2000,
      round: cmd.command === 'start_session' ? null : round,
      logs: [],
    };
    if (cmd.command === 'legal_actions') return '{"status":"ok","response":{"type":"actions","data":["hit","stand"]}}';
    return JSON.stringify({ status: 'ok', response: { type: 'session', data: session } });
  }
}
```

And this test inside `describe('Table', ...)`:

```tsx
  it('shows hand totals, hiding the dealer hole card from the total during the player turn', async () => {
    const c = new GameController(new PlayerTurnTransport(), new MemorySink(), { now: () => 't' }, { next: () => 'sid' });
    render(<Table controller={c} />);
    await fireEvent.click(screen.getByRole('button', { name: /start session/i }));
    await fireEvent.click(await screen.findByRole('button', { name: /deal/i }));

    expect(await screen.findByText(/Hand 1 \(17\)/)).toBeTruthy();
    expect(screen.getByText(/Dealer \(9 \+ \?\)/)).toBeTruthy();   // hole card hidden: 9 visible + ?
  });
```

- [ ] **Step 6: Run it to verify it fails**

Run: `npx vitest run src/app/Table.test.tsx -t 'hand totals'`
Expected: FAIL — `Unable to find an element with the text: /Hand 1 \(17\)/`.

- [ ] **Step 7: Render totals in HandView**

Replace `web/src/app/HandView.tsx` entirely:

```tsx
import type { Card } from '../bridge/types';
import { totalLabel } from './totals';

const RANK: Record<string, string> = {
  ace: 'A', two: '2', three: '3', four: '4', five: '5', six: '6', seven: '7',
  eight: '8', nine: '9', ten: '10', jack: 'J', queen: 'Q', king: 'K',
};
const SUIT: Record<string, string> = { clubs: '♣', diamonds: '♦', hearts: '♥', spades: '♠' };

export function HandView({ label, cards, hideFrom }: { label: string; cards: Card[]; hideFrom?: number }) {
  const visible = hideFrom === undefined ? cards : cards.slice(0, hideFrom);
  const hiddenCount = cards.length - visible.length;
  const totals = totalLabel(visible);   // total of what the player can SEE — never leaks the hole card
  return (
    <div>
      <strong>{label}{totals ? ` (${totals}${hiddenCount > 0 ? ' + ?' : ''})` : ''}:</strong>{' '}
      {cards.map((c, i) =>
        hideFrom !== undefined && i >= hideFrom
          ? <span key={c.card_id}>[??] </span>
          : <span key={c.card_id}>{RANK[c.rank]}{SUIT[c.suit]} </span>,
      )}
    </div>
  );
}
```

- [ ] **Step 8: Run the component tests**

Run: `npx vitest run src/app/Table.test.tsx`
Expected: ALL PASS — the 4 existing tests still pass (they match on `/bankroll/`, `/reload/`, `/Win .../`, `/insurance/`, none of which changed) plus the new one.

- [ ] **Step 9: Commit**

```bash
git add src/app/totals.ts src/app/totals.test.ts src/app/HandView.tsx src/app/Table.test.tsx
git commit -m "feat(web): show hand totals (soft as low/high, dealer hole card excluded) (QA-005)"
```

---

### Task 4: QA-004 (major) — mark the active hand during a split

`RoundState.active_hand_index` is on the wire but never rendered; during a split both hands look identical and the player can't tell which hand their click affects. Render a `← playing` marker (plus `aria-current`) on the active hand whenever there are multiple hands in a player turn.

**Files:**
- Modify: `web/src/app/HandView.tsx` (add `active` prop)
- Modify: `web/src/app/Table.tsx` (compute and pass `active`)
- Test: `web/src/app/Table.test.tsx`

**Interfaces:**
- Consumes: `totalLabel` from Task 3; `round.active_hand_index`, `round.status`, `round.hands` from the existing wire types.
- Produces: `HandView` props become `{ label: string; cards: Card[]; hideFrom?: number; active?: boolean }` — final shape, no further changes in this plan.

- [ ] **Step 1: Write the failing test**

In `web/src/app/Table.test.tsx`, add this transport (after `PlayerTurnTransport`):

```tsx
class SplitTurnTransport implements CoreTransport {
  call(json: string): string {
    const cmd = JSON.parse(json);
    const ruleset = { id: 'v1-modern-classic-h17-6d', decks: 6, penetration_percent: 75, dealer_soft_17: 'hit', blackjack_payout: 1.5, max_split_hands: 4, double_after_split: true, resplit_aces: false, split_aces_receive_one_card: true, insurance_auto_decline: true };
    const round = {
      status: 'player_turn',
      bet: 2000,
      active_hand_index: 1,   // hand 2 is being played
      dealer: { cards: [{ card_id: 'd1', deck_id: 'deck-1', rank: 'nine', suit: 'clubs' }, { card_id: 'd2', deck_id: 'deck-1', rank: 'king', suit: 'hearts' }] },
      hands: [
        { cards: [{ card_id: 'p1', deck_id: 'deck-1', rank: 'eight', suit: 'clubs' }, { card_id: 'p2', deck_id: 'deck-1', rank: 'three', suit: 'hearts' }], wager: 2000, is_complete: true, is_doubled: false, source: 'split' },
        { cards: [{ card_id: 'p3', deck_id: 'deck-1', rank: 'eight', suit: 'spades' }, { card_id: 'p4', deck_id: 'deck-1', rank: 'five', suit: 'diamonds' }], wager: 2000, is_complete: false, is_doubled: false, source: 'split' },
      ],
      dealt_cards: [],
      actions: [],
      bankroll_before: 100000,
    };
    const session = {
      seed: 'free-play',
      ruleset,
      shoe: { seed: 'free-play', shoe_number: 1, cards: [], cursor: 0, discard: [], penetration_index: 234 },
      bankroll: 96000,
      default_bet: 2000,
      round: cmd.command === 'start_session' ? null : round,
      logs: [],
    };
    if (cmd.command === 'legal_actions') return '{"status":"ok","response":{"type":"actions","data":["hit","stand"]}}';
    return JSON.stringify({ status: 'ok', response: { type: 'session', data: session } });
  }
}
```

And this test:

```tsx
  it('marks only the active hand during a split turn', async () => {
    const c = new GameController(new SplitTurnTransport(), new MemorySink(), { now: () => 't' }, { next: () => 'sid' });
    render(<Table controller={c} />);
    await fireEvent.click(screen.getByRole('button', { name: /start session/i }));
    await fireEvent.click(await screen.findByRole('button', { name: /deal/i }));

    expect(await screen.findAllByText(/playing/)).toHaveLength(1);
    expect(screen.getByText(/Hand 2/).parentElement!.textContent).toMatch(/playing/);
    expect(screen.getByText(/Hand 1/).parentElement!.textContent).not.toMatch(/playing/);
  });
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run src/app/Table.test.tsx -t 'active hand'`
Expected: FAIL — `Unable to find an element with the text: /playing/`.

- [ ] **Step 3: Implement the marker**

In `web/src/app/HandView.tsx`, change the component (imports and `RANK`/`SUIT` stay as in Task 3):

```tsx
export function HandView({ label, cards, hideFrom, active }: { label: string; cards: Card[]; hideFrom?: number; active?: boolean }) {
  const visible = hideFrom === undefined ? cards : cards.slice(0, hideFrom);
  const hiddenCount = cards.length - visible.length;
  const totals = totalLabel(visible);   // total of what the player can SEE — never leaks the hole card
  return (
    <div aria-current={active ? 'true' : undefined}>
      <strong>{label}{totals ? ` (${totals}${hiddenCount > 0 ? ' + ?' : ''})` : ''}:</strong>{' '}
      {cards.map((c, i) =>
        hideFrom !== undefined && i >= hideFrom
          ? <span key={c.card_id}>[??] </span>
          : <span key={c.card_id}>{RANK[c.rank]}{SUIT[c.suit]} </span>,
      )}
      {active ? <em>← playing</em> : null}
    </div>
  );
}
```

In `web/src/app/Table.tsx`, replace the player-hands block (currently `{round ? round.hands.map((h, i) => { ... }) : null}`):

```tsx
      {round ? round.hands.map((h, i) => {
        const outcome = outcomesByHand.get(i);
        const active = round.status === 'player_turn' && round.hands.length > 1 && i === round.active_hand_index;
        return (
          <div key={i}>
            <HandView label={`Hand ${i + 1}`} cards={h.cards} active={active} />
            {outcome ? <span>{formatOutcome(outcome)}</span> : null}
          </div>
        );
      }) : null}
```

- [ ] **Step 4: Run the component tests**

Run: `npx vitest run src/app/Table.test.tsx`
Expected: ALL PASS (6 tests).

- [ ] **Step 5: Commit**

```bash
git add src/app/HandView.tsx src/app/Table.tsx src/app/Table.test.tsx
git commit -m "feat(web): mark the active hand during split turns via active_hand_index (QA-004)"
```

---

### Task 5: QA-009 (decision → fix) — random per-session seed, visible in the UI

`Table.tsx` hardcodes `startSession('free-play', ...)`, so every session replays the byte-identical shoe. Decision recorded by the QA product review: random seed per session, logged for reproducibility. The seed already lands in the JSONL `session_header`; additionally display it in the UI so a player can quote it in a bug report.

**Files:**
- Create: `web/src/app/seed.ts`
- Create: `web/src/app/seed.test.ts`
- Modify: `web/src/app/Table.tsx`
- Test: `web/src/app/Table.test.tsx`

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: `freshSeed(): string` from `web/src/app/seed.ts` (format `fp-<a-z0-9>{1,10}`); Task 6 reuses it. `Table.tsx` gains module-level constants `START_BANKROLL = 100000` and `DEFAULT_BET = 2000` that Task 6 also uses.

- [ ] **Step 1: Write the failing unit test**

Create `web/src/app/seed.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { freshSeed } from './seed';

describe('freshSeed', () => {
  it('produces prefixed, url-safe seeds', () => {
    expect(freshSeed()).toMatch(/^fp-[a-z0-9]{1,10}$/);
  });
  it('produces distinct seeds per call', () => {
    const seeds = new Set(Array.from({ length: 50 }, freshSeed));
    expect(seeds.size).toBe(50);
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run src/app/seed.test.ts`
Expected: FAIL — cannot resolve `./seed`.

- [ ] **Step 3: Implement `seed.ts`**

Create `web/src/app/seed.ts`:

```ts
/** Fresh per-session seed so Free Play doesn't replay one fixed shoe (QA-009).
 *  Reproducibility is preserved: the seed is written to the JSONL session_header
 *  and shown in the UI, and the engine deals deterministically from any seed. */
export function freshSeed(): string {
  return `fp-${Math.random().toString(36).slice(2, 12)}`;
}
```

- [ ] **Step 4: Run the unit test**

Run: `npx vitest run src/app/seed.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 5: Write the failing component test**

In `web/src/app/Table.test.tsx`, add a recording transport (after `SplitTurnTransport`):

```tsx
class RecordingTransport implements CoreTransport {
  seeds: string[] = [];
  call(json: string): string {
    const cmd = JSON.parse(json);
    if (cmd.command === 'start_session') { this.seeds.push(cmd.seed); return SESSION; }
    if (cmd.command === 'legal_actions') return '{"status":"ok","response":{"type":"actions","data":[]}}';
    return SESSION;
  }
}
```

And this test:

```tsx
  it('starts each session with a fresh random seed and displays it', async () => {
    const t = new RecordingTransport();
    const c = new GameController(t, new MemorySink(), { now: () => 't' }, { next: () => 'sid' });
    render(<Table controller={c} />);
    await fireEvent.click(screen.getByRole('button', { name: /start session/i }));

    expect(t.seeds).toHaveLength(1);
    expect(t.seeds[0]).toMatch(/^fp-[a-z0-9]{1,10}$/);
    expect(await screen.findByText(/session seed/i)).toBeTruthy();
  });
```

(The fake `SESSION` echoes seed `free-play` back, so the display assertion checks the label, not the value — the value shown is whatever the engine echoes, which is correct behavior.)

- [ ] **Step 6: Run it to verify it fails**

Run: `npx vitest run src/app/Table.test.tsx -t 'fresh random seed'`
Expected: FAIL — `expected 'free-play' to match /^fp-[a-z0-9]{1,10}$/`.

- [ ] **Step 7: Use `freshSeed` in Table.tsx and display the session seed**

In `web/src/app/Table.tsx`:

Add to the imports:

```tsx
import { freshSeed } from './seed';
```

Add module-level constants directly under the imports (Task 6 reuses them):

```tsx
const START_BANKROLL = 100000; // cents
const DEFAULT_BET = 2000;      // cents
```

Replace the idle-phase block:

```tsx
  if (state.phase === 'idle') {
    return (
      <button onClick={() => void controller.startSession(freshSeed(), START_BANKROLL, DEFAULT_BET)}>
        Start session
      </button>
    );
  }
```

And directly under the bankroll line (`<p>Bankroll: ...</p>`), add:

```tsx
      <p><small>Session seed: {s.seed}</small></p>
```

- [ ] **Step 8: Run the component tests**

Run: `npx vitest run src/app/Table.test.tsx`
Expected: ALL PASS (7 tests).

- [ ] **Step 9: Commit**

```bash
git add src/app/seed.ts src/app/seed.test.ts src/app/Table.tsx src/app/Table.test.tsx
git commit -m "feat(web): random per-session seed, displayed and logged for reproducibility (QA-009)"
```

---

### Task 6: QA-007 (major) — "New session" control; no more bankroll dead-end

When bankroll drops below the bet, Deal is rejected and the only escape is a destructive page refresh. Add an always-available "New session" button. Also change `startSession` to **flush** (not drop) a buffered resolved round, so starting a new session preserves the last round of the old one in history.

**Files:**
- Modify: `web/src/bridge/game.ts:49-53` (`startSession` head)
- Modify: `web/src/app/Table.tsx`
- Test: `web/src/bridge/game.test.ts`, `web/src/app/Table.test.tsx`

**Interfaces:**
- Consumes: `freshSeed`, `START_BANKROLL`, `DEFAULT_BET` from Task 5; `writePending` fix from Task 1 (flush is race-safe); `make()`/`roundLines()` helpers in `game.test.ts`.
- Produces: no signature changes; `startSession` gains flush-first behavior.

- [ ] **Step 1: Write the failing controller test**

Append to `web/src/bridge/game.test.ts` inside the describe block:

```ts
  it('flushes the previous session\'s buffered round before starting a new session', async () => {
    const { c, sink } = make();
    await c.startSession('seed-a', 100000, 2000);
    await c.startRound(2000);
    let guard = 0;
    while (c.getState().session!.round?.status === 'player_turn' && guard++ < 20) await c.act('stand');
    expect(c.getState().session!.round!.status).toBe('resolved');

    await c.startSession('seed-b', 100000, 2000);   // rescue from a dead-end: must not lose the round
    const lines = sink.text().split('\n').filter(Boolean).map((l) => JSON.parse(l));
    expect(lines.map((l) => l.type)).toEqual(['session_header', 'round', 'session_header']);
    expect(lines[1].session_id).toBe('sid-0');       // the round belongs to the FIRST session
    expect(lines[2].session_id).toBe('sid-1');
  });
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run src/bridge/game.test.ts -t 'before starting a new session'`
Expected: FAIL — `expected [ 'session_header', 'session_header' ] to deeply equal [ 'session_header', 'round', 'session_header' ]` (the buffered round is dropped today).

- [ ] **Step 3: Flush instead of drop in `startSession`**

In `web/src/bridge/game.ts`, replace the first three statements of `startSession` (currently lines 50–52):

```ts
  async startSession(seed: string, bankroll: number, defaultBet: number, ruleset: Ruleset | null = null): Promise<void> {
    await this.flushPending(); // preserve a prior session's buffered round (+ its note) — QA-007 rescue must not lose history
    this.sessionId = this.ids.next();
    this.roundIndex = 0;
    this.set({ noteDraft: '', notice: null, canNote: false, lastOutcomes: [] });
```

(The rest of the method is unchanged. `pendingLine` carries its own `session_id` from buffer time, so flushing before the reassignment writes it under the correct old session.)

- [ ] **Step 4: Run the bridge tests**

Run: `npx vitest run src/bridge/game.test.ts`
Expected: ALL PASS (13 tests).

- [ ] **Step 5: Write the failing component test**

Append to `web/src/app/Table.test.tsx`:

```tsx
  it('offers a New session control that starts a fresh session with a fresh seed', async () => {
    const t = new RecordingTransport();
    const c = new GameController(t, new MemorySink(), { now: () => 't' }, { next: () => 'sid' });
    render(<Table controller={c} />);
    await fireEvent.click(screen.getByRole('button', { name: /start session/i }));
    await fireEvent.click(await screen.findByRole('button', { name: /new session/i }));

    expect(t.seeds).toHaveLength(2);
    expect(t.seeds[1]).toMatch(/^fp-[a-z0-9]{1,10}$/);
    expect(t.seeds[1]).not.toBe(t.seeds[0]);
  });
```

- [ ] **Step 6: Run it to verify it fails**

Run: `npx vitest run src/app/Table.test.tsx -t 'New session control'`
Expected: FAIL — `Unable to find an accessible element with the role "button" and name /new session/i`.

- [ ] **Step 7: Add the button**

In `web/src/app/Table.tsx`, directly after the `Download history` button (inside the same `<div>`), add:

```tsx
      <button onClick={() => void controller.startSession(freshSeed(), START_BANKROLL, DEFAULT_BET)}>
        New session
      </button>
```

- [ ] **Step 8: Run the component tests**

Run: `npx vitest run src/app/Table.test.tsx`
Expected: ALL PASS (8 tests).

- [ ] **Step 9: Commit**

```bash
git add src/bridge/game.ts src/bridge/game.test.ts src/app/Table.tsx src/app/Table.test.tsx
git commit -m "feat(web): New session control; startSession flushes the prior buffered round (QA-007)"
```

---

### Task 7: Full verification + ledger/tasks bookkeeping

**Files:**
- Modify: `journal/qa/ledger.md` (findings register statuses)
- Modify: `journal/ops/tasks.md` (check off remediation items)

**Interfaces:**
- Consumes: all prior tasks committed.
- Produces: a build where `npm test`/`npm run build` imply engine freshness, and a ledger that tells the next QA run exactly what to re-test.

- [ ] **Step 1: Run everything**

```bash
cd /home/roking/Desktop/Projects/blackjack && cargo test -p blackjack-core
cd web && npm test && npm run build
```
Expected: 55 Rust tests pass; the wasm freshness check passes; the web suite passes with 40 tests green (23 pre-existing + 17 added by Tasks 1–6), zero failures; `vite build` completes.

- [ ] **Step 2: Update the QA ledger findings register**

In `journal/qa/ledger.md`, set the Status column (keep every other column untouched):

- QA-001 → `fixed (<commit of Task 2>) — awaiting targeted re-test`
- QA-003 → `fixed (<commit of Task 1>) — awaiting targeted re-test`
- QA-004 → `fixed (<commit of Task 4>) — awaiting targeted re-test`
- QA-005 → `fixed (<commit of Task 3>) — awaiting targeted re-test`
- QA-007 → `fixed (<commit of Task 6>) — awaiting targeted re-test`
- QA-009 → `fixed (<commit of Task 5>) — random per-session seed, displayed + logged`

Use real short hashes from `git log --oneline -8`. Per the QA process, `fixed` is not closed: the next QA run gives each a targeted re-test and only then marks `verified`.

- [ ] **Step 3: Check off the remediation tasks**

In `journal/ops/tasks.md`, flip the six `- [ ]` remediation items (QA-001/003/004/005/007/009) to `- [x]`, leaving the final "Move to V2 Basic Strategy" item unchecked (it waits for `verified`).

- [ ] **Step 4: Commit**

```bash
git add journal/qa/ledger.md journal/ops/tasks.md
git commit -m "chore(qa): mark QA-001/003/004/005/007/009 fixed, pending targeted re-test"
```

- [ ] **Step 5: Hand off to QA**

Per `docs/specs/qa-playtest-process.md`, the fixes now need a scoped **feature QA** (targeted re-test of the six findings against the running app) before their ledger status moves to `verified` and V2 opens. That re-test is a QA run, not part of this implementation plan — request it after the plan lands.
