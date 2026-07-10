# Get to Know Blackjack — First Guided Drill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the "Get to Know Blackjack" subject as 2–3 short micro-units that teach blackjack vocabulary, hand flow, and stakes through **targeted situations resolved on the real engine** — arranged openings over a real, composition-correct shuffled six-deck shoe, with reactive outcome feedback, a live tail, and an in-memory recap. No strategy grading.

**Architecture:** Add one bounded Rust command (`start_session_with_prefix`) that arranges a chosen *opening* on top of a real, correctly-composed, seed-shuffled six-deck shoe (removing one same-rank/suit real card per arranged card, so the shoe stays a true 312-card six-deck). All lesson logic — micro-units, situation selectors, copy, phase state machine — lives in new TypeScript under `web/src/drill/`, mirroring the existing `GameController` external-store pattern. A new `Drill` React view reuses `HandView`; `App.tsx` gains a minimal mode switch.

**Tech Stack:** Rust 2024 (`blackjack-core`, serde), wasm-bindgen → `web/src/bridge/wasm/`, TypeScript + React 18, Vitest + React Testing Library, Playwright QA harness.

## Global Constraints

- **Engine owns rules and shoe composition.** UI/drill TS never embed blackjack rules, compute legality, or manufacture an outcome. Every hand goes through `handleCommand` / `WasmTransport`. (spec §Architecture; `stack-boundaries.md`)
- **No fixed outcomes.** Situations arrange only the *opening*; downstream cards and the result come from the real shuffled shoe. Win/loss/push and "a strong total still loses" are explained in copy and named **reactively** when they occur — never rigged. (spec §Teaching mechanism, §Outcomes are taught honestly)
- **No oracle, grading, score, rank, or persistence in this subject.** Run state and recap are in memory only. (spec §Outcome, §Non-goals)
- **Shoe composition stays a true six-deck.** For each arranged opening card, remove one real card of the same rank+suit from the shuffled remainder, so total and per-rank/suit composition are unchanged (matters for later counting). (spec §Teaching mechanism)
- **Provenance.** Arranged opening cards are arranged-origin: `deck_id: "arranged"`, `card_id: "arranged-{index}-{rankSlug}-{suitSlug}"`. Remainder cards keep normal `deck-{n}` ids. Never silently substitute cards; an unavailable arranged card is a recoverable error. (spec §Teaching mechanism, §Safeguards)
- **Only legal actions selectable; block duplicate submission while a hand resolves.** A situation-setup failure offers a recoverable retry. (spec §Safeguards)
- **Live tail range is a maximum, not a quota:** 5–10 decisions with an explicit "Got it" control to the recap. (spec §Live tail)
- **Wire types are snake_case**, mirroring Rust serde; camelCase is forbidden and guarded by `web/src/bridge/contract.test.ts`.
- **Money is integer cents.** Bankroll `100000`, bet `2000`; bets must be even for the 3:2 payout (`session.rs:474`).
- **WASM is a build artifact.** After any Rust change, run `npm --prefix web run build:wasm`; `pretest`/`predev`/`prebuild` run `scripts/check-wasm-fresh.sh` and fail on a stale pkg. `web/src/bridge/wasm/` is **gitignored** (QA-001) — never `git add` it.
- **Engine-touching tests init via the shared helper.** Node's `fetch` cannot load the wasm `file:` URL, so the zero-arg `initCore()` fails under Vitest (node and jsdom). Every test that calls the real engine must `await initCoreForTest()` from `web/src/bridge/test-init.ts` (created in Task 3), which reads the wasm bytes with `fs` and passes them to `initCore(bytes)`. Add `!` non-null assertions on optional `cards[i]` / `round` / `logs` accesses so `tsc --noEmit` (run by `npm run build`) stays clean.
- **Conventions:** unstyled semantic HTML + ARIA roles (no CSS under `web/`), co-located `*.test.ts(x)`, `// @vitest-environment jsdom` per DOM test.

---

## File Structure

**Rust engine (`crates/blackjack-core/`)**
- `src/types.rs` — MODIFY: add `PresetCard`.
- `src/shoe.rs` — MODIFY: add `create_prefix_shoe`.
- `src/session.rs` — MODIFY: add `start_session_with_prefix`.
- `src/boundary.rs` — MODIFY: add `StartSessionWithPrefix` command + arm.
- `tests/prefix_shoe_tests.rs` — CREATE.

**WASM + bridge (`web/src/bridge/`)**
- `wasm/*` — REGENERATE via `build:wasm`.
- `types.ts` — MODIFY: add `PresetCard` + `start_session_with_prefix` command.
- `drill-transport.test.ts` — CREATE.

**Drill domain (`web/src/drill/`)**
- `unit.ts` — CREATE: `DrillUnit`, `Situation`, `LiveConfig`, `DrillDecisionRecord`, `DrillPhase`, `DrillState`.
- `situations.ts` — CREATE: topic→opening-prefix selectors with seed-driven variety.
- `situations.test.ts` — CREATE: engine-verify each selector yields its intended opening.
- `units.ts` — CREATE: the three micro-units (copy + situations + live config).
- `feedback.ts` — CREATE: reactive outcome/vocabulary copy builders.
- `feedback.test.ts` — CREATE.
- `controller.ts` — CREATE: `DrillController` state machine.
- `controller.test.ts` — CREATE.

**Drill UI (`web/src/app/`)**
- `useDrill.ts` — CREATE.
- `Drill.tsx` — CREATE (reuses `HandView`).
- `Drill.test.tsx` — CREATE.
- `App.tsx` — MODIFY: mode switch.
- `App.test.tsx` — CREATE.

**Drill QA (`web/`)**
- `src/breakit-hook.ts` — MODIFY: add `mountDrill`.
- `qa/drill/{run.ts,checks.ts,checks.test.ts}` — CREATE.
- `qa/run-all.ts` — MODIFY: register `drill`.
- `package.json` — MODIFY: add `qa:drill`.

---

## Task 1: Engine — `PresetCard` + composition-preserving `create_prefix_shoe`

**Files:**
- Modify: `crates/blackjack-core/src/types.rs` (after `Card`, `types.rs:30-38`)
- Modify: `crates/blackjack-core/src/shoe.rs` (reuse `rank_slug`/`suit_slug` at `shoe.rs:88-113`; reuse the deck-build loop pattern from `create_shoe:35-48` and `shuffle:80-86`)
- Test: `crates/blackjack-core/tests/prefix_shoe_tests.rs` (create)

**Interfaces:**
- Produces: `pub struct PresetCard { pub rank: Rank, pub suit: Suit }` (serde snake_case); `pub fn create_prefix_shoe(decks: u8, seed: &str, penetration_percent: u8, prefix: &[PresetCard]) -> Result<ShoeState, String>`.
- Consumes: `Card`, `Rank`, `Suit`, `ShoeState`, `SeededRng` (`rng.rs`), existing slugs.

**Semantics:** build a real `decks×52` shoe, shuffle with `SeededRng::new("{seed}:1")` (identical to `create_shoe`), then for each `prefix` card remove **one** shuffled card of the same rank+suit (error if none remain) and prepend a synthetic arranged-origin card in order. Result is still `decks×52` cards with identical per-rank/suit composition, `cursor: 0`, normal `penetration_index`.

- [ ] **Step 1: Write the failing test**

Create `crates/blackjack-core/tests/prefix_shoe_tests.rs`:

```rust
use blackjack_core::{PresetCard, Rank, Suit, create_prefix_shoe, deal_card};

fn preset(cards: &[(Rank, Suit)]) -> Vec<PresetCard> {
    cards.iter().map(|(rank, suit)| PresetCard { rank: rank.clone(), suit: suit.clone() }).collect()
}

#[test]
fn prefix_is_dealt_first_in_order_with_arranged_provenance() {
    let prefix = preset(&[(Rank::Eight, Suit::Spades), (Rank::Six, Suit::Diamonds), (Rank::Eight, Suit::Hearts)]);
    let mut shoe = create_prefix_shoe(6, "lesson:split", 75, &prefix).expect("builds");

    // Composition is still a true six-deck.
    assert_eq!(shoe.cards.len(), 312);

    let p1 = deal_card(&mut shoe).expect("p1");
    assert_eq!((p1.rank, p1.suit), (Rank::Eight, Suit::Spades));
    assert_eq!(p1.deck_id, "arranged");
    assert_eq!(p1.card_id, "arranged-0-8-spades");
    let d1 = deal_card(&mut shoe).expect("d1");
    assert_eq!((d1.rank, d1.suit), (Rank::Six, Suit::Diamonds));
    let p2 = deal_card(&mut shoe).expect("p2");
    assert_eq!((p2.rank, p2.suit), (Rank::Eight, Suit::Hearts));
    assert_eq!(p2.card_id, "arranged-2-8-hearts");
}

#[test]
fn per_rank_suit_composition_is_preserved() {
    let prefix = preset(&[(Rank::Ace, Suit::Spades)]);
    let shoe = create_prefix_shoe(6, "lesson:bj", 75, &prefix).expect("builds");
    // Exactly six ace-of-spades across the shoe (one arranged + five remaining real).
    let count = shoe.cards.iter().filter(|c| c.rank == Rank::Ace && c.suit == Suit::Spades).count();
    assert_eq!(count, 6);
    // Remainder is normal shoe origin.
    let real_left = shoe.cards.iter().filter(|c| c.deck_id != "arranged").count();
    assert_eq!(real_left, 311);
}

#[test]
fn unavailable_prefix_card_is_rejected() {
    // Seven copies of one exact card cannot exist in a six-deck shoe.
    let prefix = preset(&[
        (Rank::Ace, Suit::Spades), (Rank::Ace, Suit::Spades), (Rank::Ace, Suit::Spades),
        (Rank::Ace, Suit::Spades), (Rank::Ace, Suit::Spades), (Rank::Ace, Suit::Spades),
        (Rank::Ace, Suit::Spades),
    ]);
    let err = create_prefix_shoe(6, "lesson:x", 75, &prefix).expect_err("rejected");
    assert!(err.contains("unavailable"));
}

#[test]
fn empty_prefix_is_rejected() {
    let err = create_prefix_shoe(6, "lesson:x", 75, &[]).expect_err("rejected");
    assert!(err.contains("at least one card"));
}
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cargo test -p blackjack-core --test prefix_shoe_tests`
Expected: FAIL to compile — `PresetCard` / `create_prefix_shoe` undefined.

- [ ] **Step 3: Add `PresetCard` to `types.rs`** (after `types.rs:38`)

```rust
/// A card specified for an arranged opening. The engine synthesizes arranged-origin
/// ids from the index and removes one same-rank/suit real card so composition is preserved.
#[derive(Clone, Debug, Deserialize, PartialEq, Serialize)]
#[serde(rename_all = "snake_case")]
pub struct PresetCard {
    pub rank: Rank,
    pub suit: Suit,
}
```

- [ ] **Step 4: Add `create_prefix_shoe` to `shoe.rs`**

Update imports at `shoe.rs:2`:

```rust
use crate::{Card, PresetCard, Rank, ShoeState, Suit};
```

Insert after `create_shoe` (after `shoe.rs:60`):

```rust
/// Build a real, shuffled six-deck shoe with a chosen opening arranged on top.
/// The opening is honest: each arranged card replaces one shuffled card of the SAME
/// rank+suit, so total and per-rank/suit composition are unchanged. Arranged cards
/// carry arranged-origin ids; the remainder keeps normal shoe ids.
pub fn create_prefix_shoe(
    decks: u8,
    seed: &str,
    penetration_percent: u8,
    prefix: &[PresetCard],
) -> Result<ShoeState, String> {
    if prefix.is_empty() {
        return Err("prefix must contain at least one card".to_string());
    }
    if decks == 0 {
        return Err("decks must be positive".to_string());
    }
    if penetration_percent == 0 || penetration_percent > 100 {
        return Err("penetration_percent must be 1..=100".to_string());
    }

    // Real, shuffled six-deck (identical construction to create_shoe).
    let mut remainder = Vec::with_capacity(decks as usize * 52);
    for deck in 1..=decks {
        let deck_id = format!("deck-{deck}");
        for suit in SUITS.iter() {
            for rank in RANKS.iter() {
                remainder.push(Card {
                    card_id: format!("{deck_id}-{}-{}", rank_slug(rank), suit_slug(suit)),
                    deck_id: deck_id.clone(),
                    rank: rank.clone(),
                    suit: suit.clone(),
                });
            }
        }
    }
    shuffle(&mut remainder, seed, 1);

    // Pull one same-rank/suit real card per arranged card; prepend synthetic arranged cards.
    let mut arranged = Vec::with_capacity(prefix.len());
    for (index, spec) in prefix.iter().enumerate() {
        let position = remainder
            .iter()
            .position(|c| c.rank == spec.rank && c.suit == spec.suit)
            .ok_or_else(|| {
                format!("prefix card {}-{} unavailable in shoe", rank_slug(&spec.rank), suit_slug(&spec.suit))
            })?;
        remainder.remove(position);
        arranged.push(Card {
            card_id: format!("arranged-{index}-{}-{}", rank_slug(&spec.rank), suit_slug(&spec.suit)),
            deck_id: "arranged".to_string(),
            rank: spec.rank.clone(),
            suit: spec.suit.clone(),
        });
    }

    let mut cards = arranged;
    cards.extend(remainder);
    let penetration_index = cards.len() * usize::from(penetration_percent) / 100;
    Ok(ShoeState {
        seed: seed.to_string(),
        shoe_number: 1,
        cards,
        cursor: 0,
        discard: Vec::new(),
        penetration_index,
    })
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cargo test -p blackjack-core --test prefix_shoe_tests`
Expected: PASS (4 tests).

- [ ] **Step 6: Commit**

```bash
git add crates/blackjack-core/src/types.rs crates/blackjack-core/src/shoe.rs crates/blackjack-core/tests/prefix_shoe_tests.rs
git commit -m "feat(core): composition-preserving arranged-opening shoe (create_prefix_shoe)"
```

---

## Task 2: Engine — `start_session_with_prefix` + `StartSessionWithPrefix` command

**Files:**
- Modify: `crates/blackjack-core/src/session.rs` (add public fn; `validate_ruleset`/`validate_bet` exist at `session.rs:448-478`)
- Modify: `crates/blackjack-core/src/boundary.rs`
- Test: `crates/blackjack-core/tests/prefix_shoe_tests.rs` (extend)

**Interfaces:**
- Consumes: `PresetCard`, `create_prefix_shoe` (Task 1); `validate_ruleset`, `validate_bet`, `v1_h17_ruleset`.
- Produces: `pub fn start_session_with_prefix(seed: &str, bankroll: i32, default_bet: i32, ruleset: Option<Ruleset>, prefix: Vec<PresetCard>) -> Result<SessionState, String>`; command tag `"start_session_with_prefix"` with fields `{ seed, bankroll, default_bet, ruleset, prefix }`.

- [ ] **Step 1: Write the failing test (append)**

```rust
use blackjack_core::{
    Action, CoreCommand, RoundStatus, apply_action, current_legal_actions, dispatch_json,
    start_round, start_session_with_prefix,
};

#[test]
fn arranged_pair_opening_offers_split_and_resolves_for_real() {
    // Player 8♠, 8♥ against dealer 6♦ up. Downstream is real shuffled cards.
    let prefix = preset(&[(Rank::Eight, Suit::Spades), (Rank::Six, Suit::Diamonds), (Rank::Eight, Suit::Hearts)]);
    let mut session =
        start_session_with_prefix("lesson:split", 100_000, 2_000, None, prefix).expect("session");
    start_round(&mut session, None).expect("deals");

    let round = session.round.as_ref().expect("round");
    assert_eq!(round.status, RoundStatus::PlayerTurn);
    assert_eq!(round.hands[0].cards[0].deck_id, "arranged"); // provenance
    let legal = current_legal_actions(&session).expect("legal");
    assert!(legal.contains(&Action::Split)); // the situation is set up
}

#[test]
fn arranged_natural_blackjack_resolves_without_a_decision() {
    // Player A♠ + K♥ vs dealer 6♦ up -> natural, settles on deal (no player decision).
    let prefix = preset(&[(Rank::Ace, Suit::Spades), (Rank::Six, Suit::Diamonds), (Rank::King, Suit::Hearts)]);
    let mut session =
        start_session_with_prefix("lesson:bj", 100_000, 2_000, None, prefix).expect("session");
    start_round(&mut session, None).expect("deals");
    assert_eq!(session.round.as_ref().unwrap().status, RoundStatus::Resolved);
    let log = session.logs.last().expect("logged");
    assert_eq!(log.outcomes[0].result, blackjack_core::OutcomeResult::Blackjack);
}

#[test]
fn start_session_with_prefix_dispatches_over_json() {
    let command = CoreCommand::StartSessionWithPrefix {
        seed: "lesson:bj".to_string(), bankroll: 100_000, default_bet: 2_000, ruleset: None,
        prefix: preset(&[(Rank::Ace, Suit::Spades), (Rank::Six, Suit::Diamonds), (Rank::King, Suit::Hearts)]),
    };
    let json = serde_json::to_string(&command).expect("serializes");
    assert!(json.contains("\"command\":\"start_session_with_prefix\""));
    let out = dispatch_json(&json);
    assert!(out.contains("\"status\":\"ok\""));
    assert!(out.contains("\"deck_id\":\"arranged\""));
}
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cargo test -p blackjack-core --test prefix_shoe_tests`
Expected: FAIL — `start_session_with_prefix` and `CoreCommand::StartSessionWithPrefix` undefined.

- [ ] **Step 3: Add `start_session_with_prefix` to `session.rs`**

Update imports at `session.rs:1-6` to add `PresetCard, create_prefix_shoe`:

```rust
use crate::{
    Action, ActionLog, Card, DealerState, HandOutcome, HandSource, HandState, LoggedAction,
    OutcomeResult, PresetCard, RoundLog, RoundState, RoundStatus, Ruleset, SessionState,
    create_prefix_shoe, create_shoe, deal_card, dealer_must_hit, discard_cards, legal_actions,
    needs_shuffle, score_hand, v1_h17_ruleset,
};
```

Insert after `start_session` (after `session.rs:32`):

```rust
/// Start a session whose shoe has a chosen opening arranged on top of a real,
/// composition-correct shuffled six-deck shoe (see `create_prefix_shoe`). Rules,
/// bet, and bankroll validation match `start_session`. Used by guided-drill situations.
pub fn start_session_with_prefix(
    seed: &str,
    bankroll: i32,
    default_bet: i32,
    ruleset: Option<Ruleset>,
    prefix: Vec<PresetCard>,
) -> Result<SessionState, String> {
    if bankroll < 0 {
        return Err("bankroll must be non-negative".to_string());
    }
    let ruleset = ruleset.unwrap_or_else(v1_h17_ruleset);
    validate_ruleset(&ruleset)?;
    validate_bet(default_bet, "default_bet", &ruleset)?;
    let shoe = create_prefix_shoe(ruleset.decks, seed, ruleset.penetration_percent, &prefix)?;

    Ok(SessionState {
        seed: seed.to_string(),
        ruleset,
        shoe,
        bankroll,
        default_bet,
        round: None,
        logs: Vec::new(),
    })
}
```

- [ ] **Step 4: Add the command to `boundary.rs`**

Update imports at `boundary.rs:1-4`:

```rust
use crate::{
    Action, PresetCard, Ruleset, SessionState, apply_action, current_legal_actions, reshuffle_shoe,
    start_round, start_session, start_session_with_prefix,
};
```

Add the variant after `StartSession { .. }` (after `boundary.rs:15`):

```rust
    StartSessionWithPrefix {
        seed: String,
        bankroll: i32,
        default_bet: i32,
        ruleset: Option<Ruleset>,
        prefix: Vec<PresetCard>,
    },
```

Add the arm after the `StartSession` arm (after `boundary.rs:47`):

```rust
        CoreCommand::StartSessionWithPrefix {
            seed,
            bankroll,
            default_bet,
            ruleset,
            prefix,
        } => start_session_with_prefix(&seed, bankroll, default_bet, ruleset, prefix)
            .map(|session| CoreResponse::Session(Box::new(session))),
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cargo test -p blackjack-core --test prefix_shoe_tests`
Expected: PASS (7 tests). Then full crate:
Run: `cargo test -p blackjack-core`
Expected: PASS (no regressions).

- [ ] **Step 6: Commit**

```bash
git add crates/blackjack-core/src/session.rs crates/blackjack-core/src/boundary.rs crates/blackjack-core/tests/prefix_shoe_tests.rs
git commit -m "feat(core): start_session_with_prefix command for arranged openings"
```

---

## Task 3: Rebuild WASM + extend bridge types

**Files:**
- Regenerate: `web/src/bridge/wasm/*`
- Modify: `web/src/bridge/types.ts`
- Test: `web/src/bridge/drill-transport.test.ts` (create)

**Interfaces:**
- Produces (TS): `export type PresetCard = { rank: Rank; suit: Suit }`; `CoreCommand` gains `{ command: 'start_session_with_prefix'; seed: string; bankroll: number; default_bet: number; ruleset: Ruleset | null; prefix: PresetCard[] }`.

- [ ] **Step 1: Rebuild the WASM package**

Run: `npm --prefix web run build:wasm`
Expected: succeeds; `handleCommand` signature unchanged (JSON in/out). Do NOT `git add` the regenerated `web/src/bridge/wasm/` — it is gitignored (QA-001); the freshness guard ties it to the Rust sources.

- [ ] **Step 1b: Create the shared test-init helper**

Create `web/src/bridge/test-init.ts` (every engine-touching test uses this):

```ts
import { readFileSync } from 'node:fs';
import initCore from './wasm/blackjack_core';

let ready: Promise<unknown> | null = null;

/** Init the WASM core for Vitest (node/jsdom): Node's fetch can't load the wasm
 *  file: URL, so read the bytes and pass them to initCore(). Memoized per process. */
export function initCoreForTest(): Promise<unknown> {
  if (!ready) {
    ready = Promise.resolve(initCore(readFileSync(new URL('./wasm/blackjack_core_bg.wasm', import.meta.url))));
  }
  return ready;
}
```

- [ ] **Step 2: Write the failing test**

Create `web/src/bridge/drill-transport.test.ts`:

```ts
import { beforeAll, describe, expect, it } from 'vitest';
import { WasmTransport } from './core-client';
import { parseCliOutput } from './validate';
import { initCoreForTest } from './test-init';
import type { CoreCommand, PresetCard } from './types';

beforeAll(async () => { await initCoreForTest(); });

describe('start_session_with_prefix transport', () => {
  it('arranges an opening and preserves six-deck composition', () => {
    const prefix: PresetCard[] = [
      { rank: 'eight', suit: 'spades' },
      { rank: 'six', suit: 'diamonds' },
      { rank: 'eight', suit: 'hearts' },
    ];
    const command: CoreCommand = {
      command: 'start_session_with_prefix',
      seed: 'lesson:split', bankroll: 100000, default_bet: 2000, ruleset: null, prefix,
    };
    const out = parseCliOutput(new WasmTransport().call(JSON.stringify(command)));
    if (out.status !== 'ok' || out.response.type !== 'session') throw new Error('expected session');
    const session = out.response.data;
    expect(session.shoe.cards).toHaveLength(312);
    expect(session.shoe.cards[0]!.deck_id).toBe('arranged');
    expect(session.shoe.cards[0]!.card_id).toBe('arranged-0-8-spades');
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm --prefix web run test -- src/bridge/drill-transport.test.ts`
Expected: FAIL — `PresetCard` unexported; `'start_session_with_prefix'` not assignable to `CoreCommand`.

- [ ] **Step 4: Extend `web/src/bridge/types.ts`**

Add after `Card` (after `types.ts:8`):

```ts
export type PresetCard = { rank: Rank; suit: Suit };
```

Add to the `CoreCommand` union (at `types.ts:63-69`), after the `start_session` member:

```ts
  | {
      command: 'start_session_with_prefix';
      seed: string;
      bankroll: number;
      default_bet: number;
      ruleset: Ruleset | null;
      prefix: PresetCard[];
    }
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm --prefix web run test -- src/bridge/drill-transport.test.ts`
Expected: PASS. Confirm the wire contract still holds:
Run: `npm --prefix web run test -- src/bridge/contract.test.ts`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add web/src/bridge/types.ts web/src/bridge/test-init.ts web/src/bridge/drill-transport.test.ts
git commit -m "feat(bridge): expose start_session_with_prefix + PresetCard; add test-init helper"
```

---

## Task 4: Drill domain types (`web/src/drill/unit.ts`)

**Files:**
- Create: `web/src/drill/unit.ts`

**Interfaces:**
- Produces: `DrillPhase`, `Situation`, `SituationBuilder`, `LiveConfig`, `DrillUnit`, `DrillDecisionRecord`, `DrillState`.
- Consumes: `Action`, `PresetCard`, `SessionState`, `HandOutcome` from `../bridge/types`.

- [ ] **Step 1: Write the types module**

Create `web/src/drill/unit.ts`:

```ts
import type { Action, HandOutcome, PresetCard, SessionState } from '../bridge/types';

/** Produces an opening prefix; `seq` varies the cards across repetitions. */
export type SituationBuilder = (seq: number) => PresetCard[];

/**
 * One guided teaching moment. The prefix sets up an OPENING (e.g. a pair, an eleven,
 * a natural blackjack); the hand then resolves for real. `hint` is optional gentle
 * guidance; when omitted the learner freely chooses from the legal actions.
 */
export type Situation = {
  id: string;
  topic: string;
  intro: string;
  build: SituationBuilder;
  hint?: Action; // if set, the UI highlights this action but does not force it
  teach: string;
};

export type LiveConfig = { intro: string; minHands: number; maxHands: number };

export type DrillUnit = {
  id: string;
  title: string;
  goal: string;
  situations: Situation[];
  live: LiveConfig;
};

export type DrillPhase = 'situation' | 'live_intro' | 'live' | 'recap';

/** One in-memory record per resolved decision context, kept only for the recap. */
export type DrillDecisionRecord = {
  phase: 'situation' | 'live';
  unitId: string;
  topic: string;
  situationId: string | null;
  playerCardIds: string[];
  dealerUpcardId: string | null;
  legalActions: Action[];
  actionsTaken: Action[];
  outcomes: HandOutcome[];
  feedback: string[];
};

export type DrillState = {
  phase: DrillPhase;
  unit: DrillUnit;
  situationIndex: number;
  session: SessionState | null;
  legalActions: Action[];
  hint: Action | null;
  prompt: string | null;
  feedback: string[];
  awaitingContinue: boolean;
  liveHandsPlayed: number;
  records: DrillDecisionRecord[];
  error: string | null;
  fatal: string | null;
  busy: boolean;
};
```

- [ ] **Step 2: Verify it compiles**

Run: `npm --prefix web run test -- --run src/drill/unit`
Expected: "No test files found" with no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add web/src/drill/unit.ts
git commit -m "feat(drill): unit and drill-state types"
```

---

## Task 5: Situation selectors (`web/src/drill/situations.ts`) — engine-verified

Selectors produce a 3-card opening prefix `[player1, dealerUp, player2]` (dealt order P,D,P,D; the dealer's second card and all draws stay real). `seq` rotates the exact cards so repetitions vary. The test runs each selector's prefix through the **real engine** and asserts the intended opening.

**Files:**
- Create: `web/src/drill/situations.ts`
- Test: `web/src/drill/situations.test.ts`

**Interfaces:**
- Produces: `pairOpening`, `elevenOpening`, `naturalBlackjackOpening`, `stiffSixteenOpening`, `readableTotalOpening` — each a `SituationBuilder`.

- [ ] **Step 1: Write the failing test**

Create `web/src/drill/situations.test.ts`:

```ts
import { beforeAll, describe, expect, it } from 'vitest';
import { initCoreForTest } from '../bridge/test-init';
import { WasmTransport } from '../bridge/core-client';
import { parseCliOutput } from '../bridge/validate';
import type { CoreCommand, PresetCard, SessionState } from '../bridge/types';
import { elevenOpening, naturalBlackjackOpening, pairOpening, stiffSixteenOpening } from './situations';

beforeAll(async () => { await initCoreForTest(); });
const transport = new WasmTransport();

function deal(prefix: PresetCard[]): SessionState {
  const start = parseCliOutput(transport.call(JSON.stringify({
    command: 'start_session_with_prefix', seed: 'sit-test', bankroll: 100000, default_bet: 2000, ruleset: null, prefix,
  } satisfies CoreCommand)));
  if (start.status !== 'ok' || start.response.type !== 'session') throw new Error('start');
  const round = parseCliOutput(transport.call(JSON.stringify({ command: 'start_round', session: start.response.data, bet: null } satisfies CoreCommand)));
  if (round.status !== 'ok' || round.response.type !== 'session') throw new Error('round');
  return round.response.data;
}
function legal(session: SessionState) {
  const out = parseCliOutput(transport.call(JSON.stringify({ command: 'legal_actions', session } satisfies CoreCommand)));
  if (out.status !== 'ok' || out.response.type !== 'actions') throw new Error('legal');
  return out.response.data;
}
const value = (rank: string) => (rank === 'ace' ? 11 : ['ten','jack','queen','king'].includes(rank) ? 10 : Number({two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9}[rank]));

describe('situation selectors set up the intended opening across seq variety', () => {
  for (let seq = 0; seq < 3; seq += 1) {
    it(`pairOpening(${seq}) is a splittable pair`, () => {
      const s = deal(pairOpening(seq));
      const [a, b] = s.round!.hands[0].cards;
      expect(value(a.rank)).toBe(value(b.rank));
      expect(legal(s)).toContain('split');
    });
    it(`elevenOpening(${seq}) totals 11 and can double`, () => {
      const s = deal(elevenOpening(seq));
      const [a, b] = s.round!.hands[0].cards;
      expect(value(a.rank) + value(b.rank)).toBe(11);
      expect(legal(s)).toContain('double');
    });
    it(`naturalBlackjackOpening(${seq}) is a natural`, () => {
      const s = deal(naturalBlackjackOpening(seq));
      // Natural resolves on deal.
      expect(s.round!.status).toBe('resolved');
      expect(s.logs.at(-1)!.outcomes[0].result).toBe('blackjack');
    });
    it(`stiffSixteenOpening(${seq}) totals 16`, () => {
      const s = deal(stiffSixteenOpening(seq));
      const [a, b] = s.round!.hands[0].cards;
      expect(value(a.rank) + value(b.rank)).toBe(16);
    });
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm --prefix web run test -- src/drill/situations.test.ts`
Expected: FAIL — `./situations` exports missing.

- [ ] **Step 3: Write `web/src/drill/situations.ts`**

```ts
import type { PresetCard } from '../bridge/types';
import type { SituationBuilder } from './unit';

const C = (rank: PresetCard['rank'], suit: PresetCard['suit']): PresetCard => ({ rank, suit });
// Dealer upcards that never make the dealer a natural (keeps setups clean); rotated by seq.
const DEALER_UPS: PresetCard[] = [C('six', 'diamonds'), C('five', 'clubs'), C('four', 'hearts'), C('seven', 'spades')];
const pick = <T,>(arr: T[], seq: number): T => arr[((seq % arr.length) + arr.length) % arr.length];

/** [player1, dealerUp, player2] — a splittable pair. */
export const pairOpening: SituationBuilder = (seq) => {
  const pairs: [PresetCard, PresetCard][] = [
    [C('eight', 'spades'), C('eight', 'hearts')],
    [C('nine', 'spades'), C('nine', 'diamonds')],
    [C('seven', 'clubs'), C('seven', 'hearts')],
  ];
  const [a, b] = pick(pairs, seq);
  return [a, pick(DEALER_UPS, seq), b];
};

/** [player1, dealerUp, player2] — totals eleven. */
export const elevenOpening: SituationBuilder = (seq) => {
  const combos: [PresetCard, PresetCard][] = [
    [C('six', 'spades'), C('five', 'hearts')],
    [C('seven', 'spades'), C('four', 'diamonds')],
    [C('eight', 'clubs'), C('three', 'hearts')],
  ];
  const [a, b] = pick(combos, seq);
  return [a, pick(DEALER_UPS, seq), b];
};

/** [player1, dealerUp, player2] — Ace + ten-value (a natural). */
export const naturalBlackjackOpening: SituationBuilder = (seq) => {
  const tens: PresetCard[] = [C('king', 'hearts'), C('queen', 'clubs'), C('ten', 'diamonds')];
  const aces: PresetCard[] = [C('ace', 'spades'), C('ace', 'clubs'), C('ace', 'hearts')];
  return [pick(aces, seq), pick(DEALER_UPS, seq), pick(tens, seq)];
};

/** [player1, dealerUp, player2] — a stiff sixteen. */
export const stiffSixteenOpening: SituationBuilder = (seq) => {
  const combos: [PresetCard, PresetCard][] = [
    [C('ten', 'spades'), C('six', 'hearts')],
    [C('king', 'clubs'), C('six', 'spades')],
    [C('nine', 'hearts'), C('seven', 'diamonds')],
  ];
  const [a, b] = pick(combos, seq);
  return [a, pick(DEALER_UPS, seq), b];
};

/** [player1, dealerUp, player2] — a plain readable total in the low teens. */
export const readableTotalOpening: SituationBuilder = (seq) => {
  const combos: [PresetCard, PresetCard][] = [
    [C('ten', 'spades'), C('two', 'hearts')],
    [C('nine', 'clubs'), C('three', 'diamonds')],
    [C('seven', 'spades'), C('five', 'hearts')],
  ];
  const [a, b] = pick(combos, seq);
  return [a, pick(DEALER_UPS, seq), b];
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm --prefix web run test -- src/drill/situations.test.ts`
Expected: PASS. If any selector fails (e.g. a chosen dealer up + arranged cards produce an unintended natural), adjust that selector's card lists — the engine is authoritative.

- [ ] **Step 5: Commit**

```bash
git add web/src/drill/situations.ts web/src/drill/situations.test.ts
git commit -m "feat(drill): engine-verified opening selectors with seed variety"
```

---

## Task 6: The three micro-units (`web/src/drill/units.ts`)

**Files:**
- Create: `web/src/drill/units.ts`
- Test: `web/src/drill/units.test.ts`

**Interfaces:**
- Consumes: `DrillUnit`, `Situation` (Task 4); the selectors (Task 5).
- Produces: `export const UNITS: DrillUnit[]` (length 3) and `export const FIRST_SUBJECT = { id, title, units: UNITS }`.

- [ ] **Step 1: Write the failing test**

Create `web/src/drill/units.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { UNITS } from './units';

describe('Get to Know Blackjack units', () => {
  it('has three short micro-units', () => {
    expect(UNITS).toHaveLength(3);
    expect(UNITS.map((u) => u.id)).toEqual(['reading-the-table', 'hit-stand-stakes', 'double-split']);
  });
  it('each unit has a small situation set and a 5–10 live tail', () => {
    for (const u of UNITS) {
      expect(u.situations.length).toBeGreaterThanOrEqual(1);
      expect(u.situations.length).toBeLessThanOrEqual(4);
      expect(u.live.minHands).toBe(5);
      expect(u.live.maxHands).toBe(10);
    }
  });
  it('teaches double and split only in the third unit', () => {
    const topics = UNITS[2].situations.map((s) => s.id);
    expect(topics).toContain('double');
    expect(topics).toContain('split');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm --prefix web run test -- src/drill/units.test.ts`
Expected: FAIL — `./units` has no export `UNITS`.

- [ ] **Step 3: Write `web/src/drill/units.ts`**

```ts
import type { DrillUnit } from './unit';
import { elevenOpening, naturalBlackjackOpening, pairOpening, readableTotalOpening, stiffSixteenOpening } from './situations';

const LIVE = { minHands: 5, maxHands: 10 } as const;

export const UNITS: DrillUnit[] = [
  {
    id: 'reading-the-table',
    title: 'Reading the table',
    goal: 'Read a hand total, and know what a natural blackjack is.',
    situations: [
      {
        id: 'read-total', topic: 'Hand totals',
        intro: 'Your total is the sum of your cards; an Ace counts as 11 unless that would bust. Read your hand, then stand to keep it.',
        build: readableTotalOpening,
        teach: 'That is your total. Higher is generally stronger, but the dealer still has to play.',
      },
      {
        id: 'natural-blackjack', topic: 'Blackjack',
        intro: 'An Ace with a ten-value card on your first two cards is a natural blackjack — an instant 21 that pays 3:2.',
        build: naturalBlackjackOpening,
        teach: 'A natural blackjack settles at once and pays 3:2. Reaching 21 later with more cards is still just 21, not a blackjack.',
      },
    ],
    live: { intro: "Now let's play a real shoe. Read each total; I'll name blackjacks as they come. Play 5–10 hands, or press “Got it” anytime.", ...LIVE },
  },
  {
    id: 'hit-stand-stakes',
    title: 'Hit, Stand, and the stakes',
    goal: 'Know what Hit and Stand do, and how win, loss, and push are decided.',
    situations: [
      {
        id: 'hit-or-stand', topic: 'Hit and Stand',
        intro: 'Hit takes another card; Stand keeps your total and passes to the dealer. You have a stiff 16 — try Hit and feel the bust risk.',
        build: stiffSixteenOpening, hint: 'hit',
        teach: 'Hitting can improve a hand or bust it (over 21 loses at once). Standing hands the turn to the dealer, who then plays by fixed rules.',
      },
    ],
    live: { intro: "Now let's play a real shoe. Hit or Stand as you like; I'll name each result — win, loss, or push — and how the dealer's hand decided it. 5–10 hands, or “Got it” anytime.", ...LIVE },
  },
  {
    id: 'double-split',
    title: 'Double and Split',
    goal: 'Know what Double and Split do to your bet and your hands.',
    situations: [
      {
        id: 'double', topic: 'Double',
        intro: 'Double doubles your bet and takes exactly one more card, then stands. You have 11 — a classic spot to try it.',
        build: elevenOpening, hint: 'double',
        teach: 'Doubling raises both the reward and the risk: a bigger bet, but only one more card.',
      },
      {
        id: 'split', topic: 'Split',
        intro: 'A pair can be split into two separate hands, each with its own bet, played and settled on its own. You have a pair — try splitting it.',
        build: pairOpening, hint: 'split',
        teach: 'Splitting makes two independent hands. Each is settled separately and each carries its own bet.',
      },
    ],
    live: { intro: "Now let's play a real shoe. Double or Split when they're offered; I'll name each hand's result. 5–10 hands, or “Got it” anytime.", ...LIVE },
  },
];

export const FIRST_SUBJECT = { id: 'get-to-know-blackjack', title: 'Get to Know Blackjack', units: UNITS };
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm --prefix web run test -- src/drill/units.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add web/src/drill/units.ts web/src/drill/units.test.ts
git commit -m "feat(drill): three Get-to-Know-Blackjack micro-units"
```

---

## Task 7: Reactive feedback (`web/src/drill/feedback.ts`)

**Files:**
- Create: `web/src/drill/feedback.ts`
- Test: `web/src/drill/feedback.test.ts`

**Interfaces:**
- Consumes: `Card`, `HandState`, `HandOutcome` from `../bridge/types`; `handTotal` from `../app/totals`.
- Produces: `formatCents(cents)`, `outcomeLine(hand, outcome, dealerCards)`, `roundFeedback(hands, outcomes, dealerCards)`.

(Identical intent to the reactive naming the spec requires: name result, distinguish natural vs later-21, bust vs comparison loss, push, doubled/split stakes.)

- [ ] **Step 1: Write the failing test**

Create `web/src/drill/feedback.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import type { Card, HandOutcome, HandState } from '../bridge/types';
import { formatCents, outcomeLine, roundFeedback } from './feedback';

const card = (rank: Card['rank'], suit: Card['suit'] = 'spades'): Card => ({ card_id: `x-${rank}-${suit}`, deck_id: 'x', rank, suit });
const hand = (cards: Card[], over: Partial<HandState> = {}): HandState => ({ cards, wager: 2000, is_complete: true, is_doubled: false, source: 'initial', ...over });

describe('reactive feedback', () => {
  it('formats cents', () => { expect(formatCents(3000)).toBe('$30.00'); });

  it('names a natural blackjack and 3:2', () => {
    const line = outcomeLine(hand([card('ace'), card('king')]), { hand_index: 0, result: 'blackjack', wager: 2000, delta: 3000 }, [card('nine'), card('seven', 'clubs')]);
    expect(line.toLowerCase()).toContain('blackjack');
    expect(line).toContain('3:2');
  });

  it('distinguishes a bust loss from a comparison loss', () => {
    const bust = outcomeLine(hand([card('ten'), card('ten', 'clubs'), card('nine')]), { hand_index: 0, result: 'loss', wager: 2000, delta: -2000 }, [card('ten'), card('seven')]);
    expect(bust.toLowerCase()).toContain('bust');
    const beaten = outcomeLine(hand([card('ten'), card('nine')]), { hand_index: 0, result: 'loss', wager: 2000, delta: -2000 }, [card('ten'), card('king')]);
    expect(beaten.toLowerCase()).toContain('dealer');
    expect(beaten.toLowerCase()).not.toContain('bust');
  });

  it('names a push, one line per hand', () => {
    const lines = roundFeedback([hand([card('ten'), card('nine')])], [{ hand_index: 0, result: 'push', wager: 2000, delta: 0 }], [card('ten'), card('nine', 'clubs')]);
    expect(lines).toHaveLength(1);
    expect(lines[0].toLowerCase()).toContain('push');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm --prefix web run test -- src/drill/feedback.test.ts`
Expected: FAIL — exports missing.

- [ ] **Step 3: Write `web/src/drill/feedback.ts`**

```ts
import type { Card, HandOutcome, HandState } from '../bridge/types';
import { handTotal } from '../app/totals';

export function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export function outcomeLine(hand: HandState, outcome: HandOutcome, dealerCards: Card[]): string {
  const player = handTotal(hand.cards).total;
  const dealer = handTotal(dealerCards).total;
  const amount = formatCents(Math.abs(outcome.delta));
  switch (outcome.result) {
    case 'blackjack':
      return `Natural blackjack — two cards to 21. Pays 3:2: +${amount}.`;
    case 'win': {
      const stake = hand.is_doubled ? ' (doubled stake)' : '';
      const why = dealer > 21 ? 'the dealer busted' : `your ${player} beat the dealer's ${dealer}`;
      return `Win — ${why}. +${amount}${stake}.`;
    }
    case 'push':
      return `Push — both sides had ${player}. Your bet comes back.`;
    case 'loss':
      return player > 21
        ? `Bust — your ${player} went over 21, so the hand is lost. −${amount}.`
        : `The dealer's ${dealer} beat your ${player} — a strong total can still lose. −${amount}.`;
  }
}

export function roundFeedback(hands: HandState[], outcomes: HandOutcome[], dealerCards: Card[]): string[] {
  return outcomes.map((outcome) => outcomeLine(hands[outcome.hand_index], outcome, dealerCards));
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm --prefix web run test -- src/drill/feedback.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add web/src/drill/feedback.ts web/src/drill/feedback.test.ts
git commit -m "feat(drill): reactive outcome feedback builders"
```

---

## Task 8: `DrillController` state machine (`web/src/drill/controller.ts`)

**Files:**
- Create: `web/src/drill/controller.ts`
- Test: `web/src/drill/controller.test.ts`

**Interfaces:**
- Consumes: `CoreTransport` (`../bridge/transport`), `parseCliOutput`/`BridgeError` (`../bridge/validate`), `CoreCommand`/`SessionState`/`Action` (`../bridge/types`), `DrillUnit`/`DrillState`/`DrillDecisionRecord`/`Situation` (`./unit`), `roundFeedback` (`./feedback`).
- Produces: `export class DrillController` with `constructor(transport: CoreTransport, unit: DrillUnit, freshSeed: () => string, seq?: () => number)`, and methods `getState`, `subscribe`, `begin`, `choose(action)`, `next`, `beginLive`, `finish`, `retry`.

**Behavioral contract (encode as tests):**
1. `begin()` → phase `situation`, situation 0 set up via `start_session_with_prefix` + `start_round`; `legalActions` populated; `hint` = the situation's hint (or null); player cards are arranged-origin.
2. A no-decision situation (natural blackjack) deals to `resolved` → `awaitingContinue`, feedback + `teach` shown.
3. `choose()` applies a legal action through the engine; while `busy`, a second call is ignored.
4. After the last situation, `next()` → `live_intro`; `beginLive()` → `start_session(freshSeed())` + `start_round`, phase `live`, all legal actions offered, no hint, cards are `deck-*`.
5. In live, on resolve → `liveHandsPlayed`++, reactive feedback; `next()` deals again; at `maxHands`, `next()` → `recap`; `finish()` → `recap` anytime.
6. One `DrillDecisionRecord` per resolved context.
7. Malformed core → `fatal`; rule error → `error` (recoverable) + `retry()` re-sets up the situation.

- [ ] **Step 1: Write the failing test**

Create `web/src/drill/controller.test.ts`:

```ts
import { beforeAll, describe, expect, it } from 'vitest';
import { initCoreForTest } from '../bridge/test-init';
import { WasmTransport } from '../bridge/core-client';
import { UNITS } from './units';
import { DrillController } from './controller';

beforeAll(async () => { await initCoreForTest(); });
let n = 0;
const make = (unitIndex = 2) => new DrillController(new WasmTransport(), UNITS[unitIndex], () => `d-${(n += 1)}`, () => 0);

describe('DrillController', () => {
  it('sets up the first situation with arranged provenance and a hint', () => {
    const c = make(2); // double-split unit, first situation = double (hint: 'double')
    c.begin();
    const s = c.getState();
    expect(s.phase).toBe('situation');
    expect(s.session!.round!.hands[0].cards[0].deck_id).toBe('arranged');
    expect(s.legalActions).toContain('double');
    expect(s.hint).toBe('double');
  });

  it('ignores a second choose() while busy', () => {
    const c = make(2);
    c.begin();
    c.choose('double');
    c.choose('double'); // hand already resolving/resolved; must be a no-op, no error
    expect(c.getState().fatal).toBeNull();
  });

  it('reaches a fresh live shoe after the situations and records live hands', () => {
    const c = make(0); // reading-the-table
    c.begin();
    // walk situations: read-total (choose stand), natural-blackjack (no decision -> continue)
    // Implementer: drive choose/next along real engine responses to reach live_intro, then:
    // c.next() until phase === 'live_intro'; c.beginLive();
    // expect(c.getState().phase).toBe('live');
    // expect(c.getState().session!.shoe.cards[0].deck_id).toMatch(/^deck-/);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm --prefix web run test -- src/drill/controller.test.ts`
Expected: FAIL — `DrillController` undefined.

- [ ] **Step 3: Write `web/src/drill/controller.ts`**

```ts
import type { Action, CoreCommand, SessionState } from '../bridge/types';
import { BridgeError, parseCliOutput } from '../bridge/validate';
import type { CoreTransport } from '../bridge/transport';
import type { DrillDecisionRecord, DrillState, DrillUnit, Situation } from './unit';
import { roundFeedback } from './feedback';

const BANKROLL = 100000;
const BET = 2000;

export class DrillController {
  private state: DrillState;
  private listeners = new Set<() => void>();
  private seqCounter = 0;

  constructor(
    private readonly transport: CoreTransport,
    unit: DrillUnit,
    private readonly freshSeed: () => string,
    private readonly seq: () => number = () => (this.seqCounter += 1),
  ) {
    this.state = {
      phase: 'situation', unit, situationIndex: 0, session: null, legalActions: [],
      hint: null, prompt: null, feedback: [], awaitingContinue: false, liveHandsPlayed: 0,
      records: [], error: null, fatal: null, busy: false,
    };
  }

  getState = (): DrillState => this.state;
  subscribe = (fn: () => void): (() => void) => { this.listeners.add(fn); return () => this.listeners.delete(fn); };

  begin = (): void => this.loadSituation(0);

  choose = (action: Action): void => {
    if (this.state.busy || (this.state.phase !== 'situation' && this.state.phase !== 'live')) return;
    const round = this.state.session?.round;
    if (!round || round.status !== 'player_turn' || !this.state.legalActions.includes(action)) return;
    this.run(() => {
      const next = this.command({ command: 'apply_action', session: this.state.session!, action });
      if (next) this.afterAction(next as SessionState);
    });
  };

  next = (): void => {
    if (this.state.busy) return;
    if (this.state.phase === 'situation') {
      const i = this.state.situationIndex + 1;
      if (i < this.state.unit.situations.length) this.loadSituation(i);
      else this.set({ phase: 'live_intro', awaitingContinue: false, prompt: this.state.unit.live.intro, feedback: [] });
    } else if (this.state.phase === 'live') {
      if (this.state.liveHandsPlayed >= this.state.unit.live.maxHands) this.set({ phase: 'recap', awaitingContinue: false });
      else this.dealLiveHand();
    }
  };

  beginLive = (): void => {
    if (this.state.busy) return;
    this.run(() => {
      const started = this.command({ command: 'start_session', seed: this.freshSeed(), bankroll: BANKROLL, default_bet: BET, ruleset: null });
      if (!started) return;
      this.set({ phase: 'live', session: started as SessionState, liveHandsPlayed: 0, feedback: [], awaitingContinue: false, hint: null });
      this.dealLiveHand();
    });
  };

  finish = (): void => { if (!this.state.busy) this.set({ phase: 'recap', awaitingContinue: false, prompt: null }); };
  retry = (): void => { if (!this.state.busy) this.loadSituation(this.state.situationIndex); };

  // ---- internals ----

  private loadSituation(index: number): void {
    this.run(() => {
      const situation = this.state.unit.situations[index];
      const prefix = situation.build(this.seq());
      const started = this.command({ command: 'start_session_with_prefix', seed: `lesson:${situation.id}`, bankroll: BANKROLL, default_bet: BET, ruleset: null, prefix });
      if (!started) { this.set({ error: `Could not set up “${situation.topic}.” Try again.` }); return; }
      const dealt = this.command({ command: 'start_round', session: started as SessionState, bet: null });
      if (!dealt) { this.set({ error: `Could not deal “${situation.topic}.” Try again.` }); return; }
      const session = dealt as SessionState;
      this.set({ phase: 'situation', situationIndex: index, session, error: null, feedback: [], awaitingContinue: false });
      if (session.round!.status === 'resolved') { this.resolveSituation(situation, session); return; }
      this.set({ legalActions: this.legal(session), hint: situation.hint ?? null, prompt: situation.intro });
    });
  }

  private afterAction(session: SessionState): void {
    if (this.state.phase === 'situation') {
      const situation = this.state.unit.situations[this.state.situationIndex];
      if (session.round?.status === 'resolved') { this.set({ session }); this.resolveSituation(situation, session); }
      else this.set({ session, legalActions: this.legal(session) });
      return;
    }
    if (session.round?.status === 'resolved') { this.set({ session }); this.resolveLive(session); }
    else this.set({ session, legalActions: this.legal(session) });
  }

  private resolveSituation(situation: Situation, session: SessionState): void {
    const r = session.round!;
    const lines = [...roundFeedback(r.hands, session.logs.at(-1)!.outcomes, r.dealer.cards), situation.teach];
    this.record('situation', situation, session, lines);
    this.set({ feedback: lines, awaitingContinue: true, hint: null, legalActions: [], prompt: null });
  }

  private dealLiveHand(): void {
    this.run(() => {
      const dealt = this.command({ command: 'start_round', session: this.state.session!, bet: null });
      if (!dealt) return;
      const session = dealt as SessionState;
      if (session.round?.status === 'resolved') { this.set({ session }); this.resolveLive(session); }
      else this.set({ session, legalActions: this.legal(session), feedback: [], awaitingContinue: false, prompt: null });
    });
  }

  private resolveLive(session: SessionState): void {
    const r = session.round!;
    const lines = roundFeedback(r.hands, session.logs.at(-1)!.outcomes, r.dealer.cards);
    this.record('live', null, session, lines);
    this.set({ feedback: lines, awaitingContinue: true, legalActions: [], liveHandsPlayed: this.state.liveHandsPlayed + 1 });
  }

  private record(phase: 'situation' | 'live', situation: Situation | null, session: SessionState, feedback: string[]): void {
    const r = session.round!;
    const log = session.logs.at(-1)!;
    this.state.records.push({
      phase, unitId: this.state.unit.id, topic: situation?.topic ?? 'Live practice', situationId: situation?.id ?? null,
      playerCardIds: r.hands.flatMap((h) => h.cards.map((c) => c.card_id)),
      dealerUpcardId: r.dealer.cards[0]?.card_id ?? null,
      legalActions: this.state.legalActions,
      actionsTaken: log.actions.filter((a) => a.action !== 'insurance_declined').map((a) => a.action as Action),
      outcomes: log.outcomes, feedback,
    });
  }

  private legal(session: SessionState): Action[] {
    if (session.round?.status !== 'player_turn') return [];
    return (this.command({ command: 'legal_actions', session }) as Action[] | null) ?? [];
  }

  /** Returns SessionState (or Action[] for legal_actions), or null on error. */
  private command(cmd: CoreCommand): SessionState | Action[] | null {
    let raw: string;
    try { raw = this.transport.call(JSON.stringify(cmd)); }
    catch (e) { this.set({ fatal: `transport failure: ${(e as Error).message}` }); return null; }
    let out;
    try { out = parseCliOutput(raw); }
    catch (e) { if (e instanceof BridgeError) { this.set({ fatal: e.message }); return null; } throw e; }
    if (out.status === 'error') { this.set({ error: out.message }); return null; }
    return out.response.data as SessionState | Action[];
  }

  private run(work: () => void): void {
    this.set({ busy: true });
    try { work(); } finally { this.state = { ...this.state, busy: false }; this.emit(); }
  }
  private set(patch: Partial<DrillState>): void { this.state = { ...this.state, ...patch }; this.emit(); }
  private emit(): void { for (const fn of this.listeners) fn(); }
}
```

- [ ] **Step 4: Flesh out and run the controller test**

Complete the walk-through assertions from Step 1 against the real controller (drive `choose`/`next` along real engine responses). Cover: arranged-vs-`deck-*` provenance across the transition, hint present in situations / absent in live, no-decision natural path, busy guard, live hand counting, `finish()` → recap, one record per decision.
Run: `npm --prefix web run test -- src/drill/controller.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add web/src/drill/controller.ts web/src/drill/controller.test.ts
git commit -m "feat(drill): DrillController situation+live state machine"
```

---

## Task 9: Drill view + unit progression (`web/src/app/Drill.tsx`, `useDrill.ts`)

**Files:**
- Create: `web/src/app/useDrill.ts`, `web/src/app/Drill.tsx`
- Test: `web/src/app/Drill.test.tsx`

**Interfaces:**
- Consumes: `DrillController` (`../drill/controller`), `DrillState` (`../drill/unit`), `HandView` (`./HandView`), `useSyncExternalStore`.
- Produces: `useDrill(controller)`; `Drill({ controller })`.

**Render contract (tests):** situation shows `prompt`, dealer `HandView` (`hideFrom={1}` during `player_turn`), player hands, and the legal-action buttons — the `hint` action marked (e.g. `aria-keyshortcuts` or a "(suggested)" suffix), all disabled while `busy`. `awaitingContinue` shows `feedback` (role `status`) + "Continue" → `next()`. `live_intro` shows the transition + "Start real shoe" → `beginLive()`. `live` shows legal actions + a persistent "Got it" → `finish()`. `recap` lists records; `error` shows message + "Try again" → `retry()`; `fatal` → role `alert`.

- [ ] **Step 1: Write `useDrill.ts`**

```ts
import { useSyncExternalStore } from 'react';
import type { DrillController } from '../drill/controller';
import type { DrillState } from '../drill/unit';

export function useDrill(controller: DrillController): DrillState {
  return useSyncExternalStore(controller.subscribe, controller.getState, controller.getState);
}
```

- [ ] **Step 2: Write the failing test**

Create `web/src/app/Drill.test.tsx`:

```tsx
// @vitest-environment jsdom
import { beforeAll, describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { initCoreForTest } from '../bridge/test-init';
import { WasmTransport } from '../bridge/core-client';
import { UNITS } from '../drill/units';
import { DrillController } from '../drill/controller';
import { Drill } from './Drill';

beforeAll(async () => { await initCoreForTest(); });
let n = 0;

describe('Drill view', () => {
  it('shows the situation prompt and its legal actions', () => {
    const c = new DrillController(new WasmTransport(), UNITS[2], () => `d-${(n += 1)}`, () => 0);
    render(<Drill controller={c} />);
    c.begin(); // double situation
    expect(screen.getByRole('button', { name: /double/i })).toBeTruthy();
  });

  it('shows feedback + Continue after a resolved hand', () => {
    const c = new DrillController(new WasmTransport(), UNITS[2], () => `d-${(n += 1)}`, () => 0);
    render(<Drill controller={c} />);
    c.begin();
    fireEvent.click(screen.getByRole('button', { name: /double/i })); // one card, resolves
    expect(screen.getByRole('button', { name: /continue/i })).toBeTruthy();
    expect(screen.getAllByRole('status').length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm --prefix web run test -- src/app/Drill.test.tsx`
Expected: FAIL — `./Drill` has no export `Drill`.

- [ ] **Step 4: Write `web/src/app/Drill.tsx`**

```tsx
import type { Action } from '../bridge/types';
import type { DrillController } from '../drill/controller';
import { HandView } from './HandView';
import { useDrill } from './useDrill';

const LABELS: Record<Action, string> = { hit: 'Hit', stand: 'Stand', double: 'Double', split: 'Split' };

export function Drill({ controller }: { controller: DrillController }) {
  const state = useDrill(controller);
  if (state.fatal) return <div role="alert">Something went wrong: {state.fatal}</div>;

  if (state.phase === 'recap') {
    return (
      <section>
        <h2>Recap — {state.unit.title}</h2>
        <ul>{state.records.map((r, i) => <li key={i}>{r.topic}: {r.outcomes.map((o) => o.result).join(', ')}</li>)}</ul>
        <p>{state.unit.goal}</p>
      </section>
    );
  }
  if (state.phase === 'live_intro') {
    return <section><p role="status">{state.prompt}</p><button onClick={() => controller.beginLive()}>Start real shoe</button></section>;
  }

  const round = state.session?.round ?? null;
  const hideFrom = round?.status === 'player_turn' ? 1 : undefined;
  return (
    <section>
      <h2>{state.unit.title}</h2>
      {state.error && <p role="status">{state.error} <button onClick={() => controller.retry()}>Try again</button></p>}
      {state.prompt && !state.awaitingContinue && <p>{state.prompt}</p>}
      {round && (
        <>
          <HandView label="Dealer" cards={round.dealer.cards} hideFrom={hideFrom} />
          {round.hands.map((h, i) => (
            <HandView key={i} label={`Hand ${i + 1}`} cards={h.cards} active={round.hands.length > 1 && i === round.active_hand_index} />
          ))}
        </>
      )}
      {state.awaitingContinue ? (
        <>
          {state.feedback.map((line, i) => <p role="status" key={i}>{line}</p>)}
          <button onClick={() => controller.next()}>Continue</button>
        </>
      ) : (
        <div>
          {state.legalActions.map((a) => (
            <button key={a} disabled={state.busy} onClick={() => controller.choose(a)}>
              {LABELS[a]}{state.hint === a ? ' (suggested)' : ''}
            </button>
          ))}
        </div>
      )}
      {state.phase === 'live' && <button onClick={() => controller.finish()}>Got it</button>}
    </section>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm --prefix web run test -- src/app/Drill.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 6: Commit**

```bash
git add web/src/app/useDrill.ts web/src/app/Drill.tsx web/src/app/Drill.test.tsx
git commit -m "feat(drill): drill view with situation/live/recap states"
```

---

## Task 10: Mode switch + unit picker in `App.tsx`

**Files:**
- Modify: `web/src/app/App.tsx`
- Test: `web/src/app/App.test.tsx` (create)

**Interfaces:**
- Consumes: `Drill`, `DrillController`, `UNITS` (`../drill/units`), existing `Table`/`GameController`/`freshSeed`.
- Produces: a Free Play ↔ drill switch; in drill mode, a small unit picker (the three micro-units). Each selected unit gets a fresh `DrillController` (begun on select).

- [ ] **Step 1: Write the failing test**

Create `web/src/app/App.test.tsx`:

```tsx
// @vitest-environment jsdom
import { beforeAll, describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { initCoreForTest } from '../bridge/test-init';
import { App } from './App';

beforeAll(async () => { await initCoreForTest(); });

describe('App', () => {
  it('defaults to Free Play and can open a drill unit', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /free play/i })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /learn/i }));
    fireEvent.click(screen.getByRole('button', { name: /reading the table/i }));
    expect(screen.getByRole('heading', { name: /reading the table/i })).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm --prefix web run test -- src/app/App.test.tsx`
Expected: FAIL — no "Learn" / unit buttons.

- [ ] **Step 3: Rewrite `web/src/app/App.tsx`**

```tsx
import { useRef, useState } from 'react';
import { WasmTransport } from '../bridge/core-client';
import { MemorySink } from '../bridge/log/memory-sink';
import { GameController } from '../bridge/game';
import { DrillController } from '../drill/controller';
import { UNITS } from '../drill/units';
import { freshSeed } from './seed';
import { Table } from './Table';
import { Drill } from './Drill';

type Mode = 'free_play' | 'learn';

export function App() {
  const game = useRef<GameController | null>(null);
  const [mode, setMode] = useState<Mode>('free_play');
  const [drill, setDrill] = useState<DrillController | null>(null);

  if (!game.current) {
    game.current = new GameController(
      new WasmTransport(), new MemorySink(),
      { now: () => new Date().toISOString() },
      { next: () => `${new Date().toISOString()}-${Math.random().toString(36).slice(2, 8)}` },
    );
    if (import.meta.env.DEV || import.meta.env.VITE_BREAKIT) {
      void import('../breakit-hook').then((m) => m.mountBreakit(game.current!));
    }
  }

  function openUnit(index: number) {
    const c = new DrillController(new WasmTransport(), UNITS[index], freshSeed);
    c.begin();
    if (import.meta.env.DEV || import.meta.env.VITE_BREAKIT) {
      void import('../breakit-hook').then((m) => m.mountDrill?.(c));
    }
    setDrill(c);
  }

  return (
    <main>
      <nav>
        <button aria-pressed={mode === 'free_play'} onClick={() => setMode('free_play')}>Free Play</button>
        <button aria-pressed={mode === 'learn'} onClick={() => { setMode('learn'); setDrill(null); }}>Learn</button>
      </nav>

      {mode === 'free_play' && (<><h1>Blackjack Free Play</h1><Table controller={game.current} /></>)}

      {mode === 'learn' && !drill && (
        <section>
          <h1>Get to Know Blackjack</h1>
          <ul>{UNITS.map((u, i) => (
            <li key={u.id}><button onClick={() => openUnit(i)}>{u.title}</button> — {u.goal}</li>
          ))}</ul>
        </section>
      )}

      {mode === 'learn' && drill && <Drill controller={drill} />}
    </main>
  );
}
```

- [ ] **Step 4: Run test + full suite**

Run: `npm --prefix web run test -- src/app/App.test.tsx` → Expected: PASS.
Run: `npm --prefix web run test` → Expected: PASS (all suites; existing `Table.test.tsx` unaffected).

- [ ] **Step 5: Commit**

```bash
git add web/src/app/App.tsx web/src/app/App.test.tsx
git commit -m "feat(app): Learn mode with three-unit picker beside Free Play"
```

---

## Task 11: Browser QA drill role (`qa/drill/`)

**Files:**
- Modify: `web/src/breakit-hook.ts` (add `mountDrill`)
- Create: `web/qa/drill/{checks.ts,checks.test.ts,run.ts}`
- Modify: `web/qa/run-all.ts`, `web/package.json`

**Interfaces:**
- Consumes: `DrillController`; QA libs `startPreview`, `launchBrowser`, `writeRoleReport`, `Invariant`/`RoleReport` (`qa/lib/*`) — mirror `qa/flow/run.ts` for wiring.
- Produces: `export function mountDrill(controller: DrillController): void` (`window.__drill`); pure `checkArrangedProvenance`, `checkLiveProvenance`, `checkComposition`.

- [ ] **Step 1: Write the failing pure-check test**

Create `web/qa/drill/checks.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { checkArrangedProvenance, checkComposition, checkLiveProvenance } from './checks';

describe('drill checks', () => {
  it('flags a leading card that is not arranged-origin', () => {
    expect(checkArrangedProvenance([{ deck_id: 'arranged' }] as any).passed).toBe(true);
    expect(checkArrangedProvenance([{ deck_id: 'deck-1' }] as any).passed).toBe(false);
  });
  it('requires live cards from a shuffled deck', () => {
    expect(checkLiveProvenance([{ deck_id: 'deck-3' }] as any).passed).toBe(true);
    expect(checkLiveProvenance([{ deck_id: 'arranged' }] as any).passed).toBe(false);
  });
  it('requires a true six-deck composition', () => {
    expect(checkComposition(Array(312).fill({}) as any).passed).toBe(true);
    expect(checkComposition(Array(300).fill({}) as any).passed).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm --prefix web run test -- qa/drill/checks.test.ts`
Expected: FAIL — `./checks` missing.

- [ ] **Step 3: Write `web/qa/drill/checks.ts`**

```ts
import type { Card } from '../../src/bridge/types';
import type { Invariant } from '../lib/types';

export function checkArrangedProvenance(leadingCards: Card[]): Invariant {
  const bad = leadingCards.filter((c) => c.deck_id !== 'arranged');
  return { name: 'arranged opening is arranged-origin', passed: bad.length === 0, detail: bad.length ? `${bad.length} non-arranged` : undefined };
}
export function checkLiveProvenance(cards: Card[]): Invariant {
  const bad = cards.filter((c) => !c.deck_id.startsWith('deck-'));
  return { name: 'live cards come from a shuffled shoe', passed: bad.length === 0, detail: bad.length ? `${bad.length} non-shoe` : undefined };
}
export function checkComposition(cards: Card[]): Invariant {
  return { name: 'shoe is a true six-deck (312)', passed: cards.length === 312, detail: `len=${cards.length}` };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm --prefix web run test -- qa/drill/checks.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Add `mountDrill` + write `qa/drill/run.ts`**

Add to `web/src/breakit-hook.ts`:

```ts
import type { DrillController } from './drill/controller';

export function mountDrill(controller: DrillController): void {
  (globalThis as unknown as { __drill?: unknown }).__drill = {
    getState: () => controller.getState(),
    begin: () => controller.begin(),
    choose: (a: string) => controller.choose(a as never),
    next: () => controller.next(),
    beginLive: () => controller.beginLive(),
    finish: () => controller.finish(),
    version: 'drill-hook-1',
  };
}
```

Write `web/qa/drill/run.ts` by copying `web/qa/flow/run.ts`'s browser scaffolding (preview server, chromium launch, `writeRoleReport`), replacing the driving logic: for each of the three units, walk its situations via `window.__drill` — collect the leading arranged cards and assert `checkArrangedProvenance` + `checkComposition` on `getState().session.shoe.cards`; then `beginLive()`, play 3 hands asserting `checkLiveProvenance`; `finish()`; assert the recap lists the expected records. Emit via `writeRoleReport(RUNS_ROOT, dateStamp, report)`; role `'drill'`, title `'Guided Drill — Get to Know Blackjack'`, `specLink` to the design spec.

> Read `qa/flow/run.ts` and `qa/lib/{server,browser,report,types}.ts` first; reuse their exact exported signatures. Do not invent new lib APIs.

- [ ] **Step 6: Register the role + script**

In `web/qa/run-all.ts` `ROLES`, add: `{ role: 'drill', entry: 'qa/drill/run.ts' },`
In `web/package.json` scripts, add: `"qa:drill": "tsx qa/drill/run.ts",`

- [ ] **Step 7: Run the drill QA role**

Run: `npm --prefix web run qa:drill`
Expected: exits 0; writes `journal/qa/runs/<date>-drill/report.{md,json}`, all invariants passed.

- [ ] **Step 8: Commit**

```bash
git add web/src/breakit-hook.ts web/qa/drill web/qa/run-all.ts web/package.json
git commit -m "test(qa): drill QA role with provenance + composition checks"
```

---

## Task 12: Feature QA playtest + ledger entry

**Files:** Modify `journal/qa/ledger.md`; reference `docs/specs/qa-playtest-process.md`.

- [ ] **Step 1: Scope from the ledger.** Read `journal/qa/ledger.md`; deep-test the new drill/engine surfaces, smoke-test unchanged Free Play (same engine path). Record the scope.
- [ ] **Step 2: Deterministic gate.**
  Run: `cargo test -p blackjack-core` → PASS.
  Run: `npm --prefix web run test` → PASS.
  Run: `npm --prefix web run qa` → `rules → flow → breakit → drill` all exit 0.
- [ ] **Step 3: Player Experience judgment pass** (required — changes `web/src/app/`). Drive all three units end-to-end (situations → live → "Got it" → recap) per `docs/specs/qa-playtest-process.md`; judge clarity, honesty about outcomes-vs-decisions, absence of any strategy grading, and whether the micro-units feel short. Capture findings.
- [ ] **Step 4: Record the run** (areas, depth, verdict, findings, commits) in `journal/qa/ledger.md`; update each area's last-passed commit.
- [ ] **Step 5: Commit.**

```bash
git add journal/qa/ledger.md journal/qa/runs
git commit -m "qa: feature QA for Get to Know Blackjack drill (ledger + run)"
```

---

## Self-Review

**1. Spec coverage** (spec section → task):
- Micro-unit structure (3 units) → Tasks 6, 10.
- Teaching mechanism: arranged opening over real composition-correct shuffled shoe → Tasks 1–2 (engine), 5 (selectors), 3 (bridge). Composition preservation is explicitly tested (Task 1 Step 1).
- Card variety across repetitions → Task 5 (`seq`-rotated selectors, tested for seq 0–2).
- Outcomes taught reactively, not rigged → Tasks 7 (`feedback.ts`), 8 (reactive resolve), 6 (copy). No task forces an outcome; selectors set openings only.
- Live tail + explicit transition + "Got it" → Task 8 (`beginLive`/`finish`), 9 (UI).
- Feedback and tone (natural vs later-21, bust vs comparison loss, push, doubled/split stake, no %/EV/table) → Tasks 7, 6.
- Architecture & recorded state (engine authority; in-memory `DrillDecisionRecord` incl. provenance) → Tasks 4, 8.
- Safeguards (only legal actions; duplicate-submit block; no-decision natural; recoverable setup failure) → Task 8 (`busy` guard, no-decision path, `error`+`retry`), 9 (disabled buttons, "Try again").
- Verification & QA (engine prefix tests; situation setups; legal filtering; natural vs 21; transition; recap; duplicate-submit; recoverable failure; browser QA; ledger; PE pass) → Tasks 1–2, 5–8, 11, 12.
- Non-goals (no table/grading/oracle/%/persistence; no general category library) → enforced by Global Constraints; Task 5 builds only the openings the units use.

**2. Placeholder scan:** No "TBD"/"add error handling"/"similar to Task N". Two directed-completion notes (Task 8 & 11 test/harness fleshing against a named template with concrete new code supplied) are not blanks. All card lists, copy, signatures concrete.

**3. Type consistency:** `PresetCard` (rank/suit) identical across `types.rs`, `types.ts`, `unit.ts`, `situations.ts`. Command tag `start_session_with_prefix` + field `prefix` match across Rust boundary, TS `CoreCommand`, controller, selectors' test. `DrillController` methods (`begin/choose/next/beginLive/finish/retry`) match Tasks 8, 9, 11. `DrillState` fields used by `Drill.tsx` (`hint`, `awaitingContinue`, `feedback`, `legalActions`, `busy`, `records`, `prompt`) all declared in Task 4. `SituationBuilder` signature `(seq) => PresetCard[]` matches Tasks 4, 5, 6.

## Execution Handoff

**Plan complete and saved to `docs/superpowers/plans/2026-07-10-first-guided-drill.md`. Two execution options:**

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

**Which approach?**
