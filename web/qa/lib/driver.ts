// Shared play driver over the DEV-only window.__breakit hook. Role-agnostic: it knows how to
// drive a session and snapshot engine state, holds a basic-strategy-ish heuristic, and tracks
// situation coverage. It makes NO assertions — rules/flow own those. The heuristic and the
// coverage tracker are pure and independently unit-testable.

import type { Page } from 'playwright';
import type { Action, ActionLog, Card, HandOutcome, HandState, Rank, RoundStatus } from '../../src/bridge/types';
import type { BreakitHook } from '../../src/breakit-hook';
import { handTotal } from '../../src/app/totals';

// The DEV-only hook as seen inside the browser (shared shape across the whole QA suite).
declare global {
  interface Window { __breakit: BreakitHook }
}

// --- serializable engine snapshot (a subset of GameState, flattened for page.evaluate) ---

export interface RoundSnapshot {
  status: RoundStatus;
  bet: number;
  active_hand_index: number;
  dealer: Card[];
  hands: HandState[];
  actions: ActionLog[];
}

export interface GameSnapshot {
  phase: string;
  legalActions: Action[];
  notice: string | null;
  lastError: string | null;
  fatalMessage: string | null;
  canNote: boolean;
  noteDraft: string;
  lastOutcomes: HandOutcome[];
  bankroll: number | null;
  seed: string | null;
  shoeNumber: number | null;
  defaultBet: number | null;
  round: RoundSnapshot | null;
}

/** Read the whole GameState in one round-trip and flatten it to a plain snapshot. */
async function readSnapshot(page: Page): Promise<GameSnapshot> {
  return page.evaluate(() => {
    const st = window.__breakit.getState();
    const s = st.session;
    const r = s?.round ?? null;
    return {
      phase: st.phase,
      legalActions: st.legalActions,
      notice: st.notice,
      lastError: st.lastError,
      fatalMessage: st.fatalMessage,
      canNote: st.canNote,
      noteDraft: st.noteDraft,
      lastOutcomes: st.lastOutcomes,
      bankroll: s?.bankroll ?? null,
      seed: s?.seed ?? null,
      shoeNumber: s?.shoe?.shoe_number ?? null,
      defaultBet: s?.default_bet ?? null,
      round: r
        ? {
            status: r.status,
            bet: r.bet,
            active_hand_index: r.active_hand_index,
            dealer: r.dealer.cards,
            hands: r.hands,
            actions: r.actions,
          }
        : null,
    } as GameSnapshot;
  });
}

export class Driver {
  constructor(public readonly page: Page) {}

  async waitForHook(): Promise<void> {
    await this.page.waitForFunction(() => Boolean((window as unknown as { __breakit?: unknown }).__breakit), null, {
      timeout: 15000,
    });
  }

  startSession(seed?: string, bankroll?: number, bet?: number): Promise<void> {
    return this.page.evaluate(
      (a) => window.__breakit.startSession(a.seed, a.bankroll, a.bet),
      { seed, bankroll, bet },
    );
  }

  newSession(): Promise<void> {
    return this.page.evaluate(() => window.__breakit.newSession());
  }

  deal(): Promise<void> {
    return this.page.evaluate(() => window.__breakit.deal());
  }

  act(action: Action): Promise<void> {
    return this.page.evaluate((a) => window.__breakit.act(a), action);
  }

  setNote(text: string): Promise<void> {
    return this.page.evaluate((t) => window.__breakit.setNote(t), text);
  }

  downloadText(): Promise<string> {
    return this.page.evaluate(() => window.__breakit.downloadText());
  }

  freshSeed(): Promise<string> {
    return this.page.evaluate(() => window.__breakit.freshSeed());
  }

  snapshot(): Promise<GameSnapshot> {
    return readSnapshot(this.page);
  }
}

// --- basic-strategy-ish heuristic (pure) ---

/**
 * A simplified strategy that also maximizes coverage: split whenever the engine offers it (so
 * same-rank and mixed-ten-value splits both get exercised), double hard 9–11 and soft 17–18
 * (yielding double and double-after-split), otherwise hit toward 17 / soft 18 and stand.
 * It never invents an illegal action — it only ever returns something in `legal`.
 */
export function basicStrategy(cards: Card[], _dealerUp: Rank, legal: Action[]): Action {
  if (legal.length === 0) return 'stand';
  if (legal.includes('split')) return 'split';
  const { total, soft } = handTotal(cards);
  if (legal.includes('double')) {
    if (!soft && total >= 9 && total <= 11) return 'double';
    if (soft && total >= 17 && total <= 18) return 'double';
  }
  const wantHit = soft ? total < 18 : total < 17;
  if (wantHit && legal.includes('hit')) return 'hit';
  if (legal.includes('stand')) return 'stand';
  return legal[0]!;
}

// --- one traced round ---

export interface DecisionSnapshot {
  activeHandIndex: number;
  legalActions: Action[];
  activeHandCards: Card[];
  soft: boolean;
  chosen: Action;
}

export interface RoundTrace {
  roundIndex: number;
  seed: string;
  bet: number;
  autoResolved: boolean;        // resolved with no player decision (a natural)
  initialPlayerCards: Card[];   // hand 0's first two cards
  firstDecisionLegal: Action[]; // legalActions at the first player decision ([] if autoResolved)
  dealerUpRank: Rank;
  decisions: DecisionSnapshot[];
  finalHands: HandState[];
  finalDealer: Card[];
  outcomes: HandOutcome[];
  insuranceDeclined: boolean;
  reshuffled: boolean;          // shoe_number incremented on this deal
  notice: string | null;
}

/** Deal one round and play it to resolution with the heuristic, recording a full trace. */
export async function playRoundTraced(d: Driver, roundIndex: number): Promise<RoundTrace> {
  const pre = await d.snapshot();
  const shoeBefore = pre.shoeNumber ?? 0;

  await d.deal();
  let st = await d.snapshot();
  const round0 = st.round;
  if (!round0) throw new Error(`round ${roundIndex}: no round after deal (lastError=${st.lastError}, fatal=${st.fatalMessage})`);

  const seed = st.seed ?? '';
  const bet = round0.bet;
  const dealerUpRank = round0.dealer[0]!.rank;
  const initialPlayerCards = round0.hands[0]!.cards.slice(0, 2);
  const reshuffled = (st.shoeNumber ?? shoeBefore) > shoeBefore;
  const insuranceDeclined = round0.actions.some((a) => a.action === 'insurance_declined');
  const noticeAtDeal = st.notice;
  const autoResolved = round0.status !== 'player_turn';
  const firstDecisionLegal = autoResolved ? [] : st.legalActions.slice();

  const decisions: DecisionSnapshot[] = [];
  let guard = 0;
  while (st.round && st.round.status === 'player_turn' && guard++ < 80) {
    const round = st.round;
    const active = round.active_hand_index;
    const hand = round.hands[active]!;
    const legal = st.legalActions;
    const { soft } = handTotal(hand.cards);
    const chosen = basicStrategy(hand.cards, dealerUpRank, legal);
    decisions.push({ activeHandIndex: active, legalActions: legal.slice(), activeHandCards: hand.cards.slice(), soft, chosen });
    await d.act(chosen);
    st = await d.snapshot();
  }

  const finalRound = st.round;
  return {
    roundIndex,
    seed,
    bet,
    autoResolved,
    initialPlayerCards,
    firstDecisionLegal,
    dealerUpRank,
    decisions,
    finalHands: finalRound ? finalRound.hands : round0.hands,
    finalDealer: finalRound ? finalRound.dealer : round0.dealer,
    outcomes: st.lastOutcomes,
    insuranceDeclined,
    reshuffled,
    notice: noticeAtDeal,
  };
}

// --- situation-coverage tracking (pure) ---

export type Situation =
  | 'soft_hand'
  | 'player_natural'
  | 'dealer_natural'
  | 'player_bust'
  | 'dealer_bust'
  | 'push'
  | 'same_rank_split'
  | 'ten_value_split'
  | 'double'
  | 'double_after_split'
  | 'insurance_note'
  | 'shoe_reshuffle';

export const SITUATIONS: Array<{ id: Situation; label: string }> = [
  { id: 'soft_hand', label: 'soft player hand' },
  { id: 'player_natural', label: 'player natural blackjack (3:2)' },
  { id: 'dealer_natural', label: 'dealer natural blackjack' },
  { id: 'player_bust', label: 'player bust' },
  { id: 'dealer_bust', label: 'dealer bust' },
  { id: 'push', label: 'push' },
  { id: 'same_rank_split', label: 'same-rank split' },
  { id: 'ten_value_split', label: 'mixed ten-value split' },
  { id: 'double', label: 'double' },
  { id: 'double_after_split', label: 'double after split' },
  { id: 'insurance_note', label: 'dealer-ace insurance note' },
  { id: 'shoe_reshuffle', label: 'shoe reshuffle' },
];

const TEN_VALUE: ReadonlySet<Rank> = new Set<Rank>(['ten', 'jack', 'queen', 'king']);
export const isTenValue = (r: Rank): boolean => TEN_VALUE.has(r);
export const sameRank = (a: Card, b: Card): boolean => a.rank === b.rank;

/** Map one traced round to the checklist situations it exercised. Pure. */
export function situationsOf(t: RoundTrace): Situation[] {
  const out = new Set<Situation>();

  // soft hands: any decision on a soft hand, or a soft initial hand.
  if (t.decisions.some((d) => d.soft)) out.add('soft_hand');
  if (handTotal(t.initialPlayerCards).soft) out.add('soft_hand');

  for (const o of t.outcomes) {
    if (o.result === 'blackjack') out.add('player_natural');
    if (o.result === 'push') out.add('push');
  }

  if (t.finalDealer.length >= 2 && handTotal(t.finalDealer.slice(0, 2)).total === 21) out.add('dealer_natural');
  if (handTotal(t.finalDealer).total > 21) out.add('dealer_bust');
  if (t.finalHands.some((h) => handTotal(h.cards).total > 21)) out.add('player_bust');

  const wasSplit = t.finalHands.length > 1;
  if (wasSplit) {
    const [a, b] = t.initialPlayerCards;
    if (a && b) {
      if (sameRank(a, b)) out.add('same_rank_split');
      else if (isTenValue(a.rank) && isTenValue(b.rank)) out.add('ten_value_split');
    }
  }

  if (t.finalHands.some((h) => h.is_doubled)) out.add('double');
  if (t.finalHands.some((h) => h.is_doubled && h.source === 'split')) out.add('double_after_split');

  if (t.dealerUpRank === 'ace' || t.insuranceDeclined) out.add('insurance_note');
  if (t.reshuffled) out.add('shoe_reshuffle');

  return [...out];
}

export class CoverageTracker {
  private readonly counts = new Map<Situation, number>();

  constructor() {
    for (const s of SITUATIONS) this.counts.set(s.id, 0);
  }

  record(labels: Situation[]): void {
    for (const l of labels) this.counts.set(l, (this.counts.get(l) ?? 0) + 1);
  }

  recordTrace(t: RoundTrace): void {
    this.record(situationsOf(t));
  }

  count(s: Situation): number {
    return this.counts.get(s) ?? 0;
  }

  /** Situations not yet seen at least `min` times. */
  unmet(min = 2): Situation[] {
    return SITUATIONS.filter((s) => this.count(s.id) < min).map((s) => s.id);
  }

  met(min = 2): boolean {
    return this.unmet(min).length === 0;
  }

  summary(min = 2): Array<{ id: Situation; label: string; count: number; met: boolean }> {
    return SITUATIONS.map((s) => ({ id: s.id, label: s.label, count: this.count(s.id), met: this.count(s.id) >= min }));
  }
}
