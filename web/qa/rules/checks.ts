// Rules & Payout Fidelity — PURE per-round re-derivation. No page/IO here; these run over the
// engine-state RoundTrace (captured live via the hook) and the persisted JSONL, and INDEPENDENTLY
// recompute dealer H17 play, payout multipliers, and split-eligibility from the observed cards —
// then assert the engine + JSONL agree. Unit-tested against good AND deliberately-broken fixtures
// (bad-H17, wrong-payout, mis-offered-split) so the script can never go no-op-green.

import { handTotal } from '../../src/app/totals';
import type { Card, HandState, OutcomeResult } from '../../src/bridge/types';
import { isTenValue, sameRank, type RoundTrace } from '../lib/driver';
import type { Invariant, RoundLine } from '../lib/types';

const DEFAULT_BLACKJACK_PAYOUT = 1.5;

/** Blackjack delta, mirroring the core's blackjack_delta (integer cents). */
export function blackjackDelta(wager: number, payout = DEFAULT_BLACKJACK_PAYOUT): number {
  if (Math.abs(payout - 1.5) < 1e-6) return Math.trunc((wager * 3) / 2);
  return Math.round(wager * payout);
}

/** A natural is an INITIAL-source two-card 21 (a post-split 21 is not, per the core). */
export function isNaturalBlackjack(hand: HandState): boolean {
  return hand.source === 'initial' && hand.cards.length === 2 && handTotal(hand.cards).total === 21;
}

export interface DerivedOutcome {
  result: OutcomeResult;
  delta: number;
}

/**
 * Independently re-derive one hand's outcome from the observed final cards, mirroring the core's
 * settle order (natural → bust → win/dealer-bust → push → loss). `stake` is the at-risk amount
 * for the hand (base bet, doubled if the hand doubled).
 */
export function deriveHandOutcome(
  hand: HandState,
  dealerCards: Card[],
  stake: number,
  payout = DEFAULT_BLACKJACK_PAYOUT,
): DerivedOutcome {
  const score = handTotal(hand.cards);
  const dealer = handTotal(dealerCards);
  const playerNat = isNaturalBlackjack(hand);
  const dealerNat = dealerCards.length === 2 && dealer.total === 21;

  if (playerNat && !dealerNat) return { result: 'blackjack', delta: blackjackDelta(stake, payout) };
  if (score.total > 21) return { result: 'loss', delta: -stake };
  if (dealer.total > 21 || score.total > dealer.total) return { result: 'win', delta: stake };
  if (score.total === dealer.total) return { result: 'push', delta: 0 };
  return { result: 'loss', delta: -stake };
}

/** Payout fidelity: re-derive each hand outcome + wager scaling and compare to the engine outcome. */
export function checkPayouts(trace: RoundTrace, payout = DEFAULT_BLACKJACK_PAYOUT): Invariant[] {
  const out: Invariant[] = [];
  for (const o of trace.outcomes) {
    const hand = trace.finalHands[o.hand_index];
    if (!hand) {
      out.push({ name: `payout: round ${trace.roundIndex} hand ${o.hand_index} present in state`, passed: false, detail: 'outcome references a missing hand' });
      continue;
    }
    const stake = trace.bet * (hand.is_doubled ? 2 : 1);
    const exp = deriveHandOutcome(hand, trace.finalDealer, stake, payout);
    const ok = exp.result === o.result && exp.delta === o.delta;
    out.push({
      name: `payout: round ${trace.roundIndex} hand ${o.hand_index} result/delta`,
      passed: ok,
      detail: ok ? undefined : `re-derived ${exp.result}/${exp.delta} vs engine ${o.result}/${o.delta} (player ${handTotal(hand.cards).total} vs dealer ${handTotal(trace.finalDealer).total})`,
    });
    const wagerOk = o.wager === stake;
    out.push({
      name: `payout: round ${trace.roundIndex} hand ${o.hand_index} wager scaling`,
      passed: wagerOk,
      detail: wagerOk ? undefined : `wager ${o.wager} != bet ${trace.bet} × ${hand.is_doubled ? 2 : 1}`,
    });
  }
  return out;
}

const isStand = (total: number, soft: boolean): boolean => total <= 21 && (total >= 18 || (total === 17 && !soft));

/**
 * Dealer H17 correctness, re-derived from the observed dealer card sequence:
 *  - never draws after busting,
 *  - never hits a stand total (hard ≥17 / soft ≥18),
 *  - if the dealer was required to play out (a live non-natural player hand exists), the final
 *    holding must be terminal (bust, hard ≥17, or soft ≥18) — i.e. it did not stand early.
 */
export function checkDealerH17(trace: RoundTrace): Invariant {
  const dealer = trace.finalDealer;
  const violations: string[] = [];
  const n = dealer.length;

  const dealerMustPlay = trace.finalHands.some((h) => handTotal(h.cards).total <= 21 && !isNaturalBlackjack(h));

  for (let k = 2; k <= n; k++) {
    const { total, soft } = handTotal(dealer.slice(0, k));
    const busted = total > 21;
    if (k < n) {
      // The dealer drew another card after holding k cards.
      if (busted) violations.push(`drew after busting at ${total} (card ${k})`);
      else if (isStand(total, soft)) violations.push(`hit on a stand total ${total}${soft ? ' (soft)' : ''} (card ${k})`);
    } else if (dealerMustPlay && !busted && !isStand(total, soft)) {
      violations.push(`stood early on a must-hit total ${total}${soft ? ' (soft)' : ''}`);
    }
  }

  return {
    name: `dealer H17: round ${trace.roundIndex} dealer play is rule-correct`,
    passed: violations.length === 0,
    detail: violations.length ? violations.join('; ') : undefined,
  };
}

/** Split-eligibility: Split offered iff (same-rank pair) OR (two 10-value ranks). Both directions. */
export function checkSplitEligibility(trace: RoundTrace): Invariant {
  if (trace.autoResolved) {
    return { name: `split-eligibility: round ${trace.roundIndex}`, passed: true, detail: 'auto-resolved natural — no player decision' };
  }
  const [a, b] = trace.initialPlayerCards;
  const shouldOffer = !!a && !!b && (sameRank(a, b) || (isTenValue(a.rank) && isTenValue(b.rank)));
  const offered = trace.firstDecisionLegal.includes('split');
  const ok = shouldOffer === offered;
  return {
    name: `split-eligibility: round ${trace.roundIndex} offered iff eligible`,
    passed: ok,
    detail: ok ? undefined : `cards ${a?.rank}/${b?.rank}: eligible=${shouldOffer} but offered=${offered}`,
  };
}

/** Engine live outcomes must equal the persisted JSONL outcomes for the same round (source cross-check). */
export function checkTraceMatchesJsonl(trace: RoundTrace, round: RoundLine): Invariant {
  const eng = trace.outcomes;
  const js = round.outcomes;
  const diffs: string[] = [];
  if (eng.length !== js.length) diffs.push(`outcome count ${eng.length} vs JSONL ${js.length}`);
  const n = Math.min(eng.length, js.length);
  for (let i = 0; i < n; i++) {
    const e = eng[i]!;
    const j = js[i]!;
    if (e.result !== j.result || e.delta !== j.delta || e.wager !== j.wager) {
      diffs.push(`hand ${i}: engine ${e.result}/${e.delta}/${e.wager} vs JSONL ${j.result}/${j.delta}/${j.wager}`);
    }
  }
  return {
    name: `source cross-check: round ${trace.roundIndex} engine state matches JSONL`,
    passed: diffs.length === 0,
    detail: diffs.length ? diffs.join('; ') : undefined,
  };
}

/** All per-round rules checks for one traced round paired with its JSONL line. */
export function checkRound(trace: RoundTrace, round: RoundLine | undefined, payout = DEFAULT_BLACKJACK_PAYOUT): Invariant[] {
  const out: Invariant[] = [];
  out.push(...checkPayouts(trace, payout));
  out.push(checkDealerH17(trace));
  out.push(checkSplitEligibility(trace));
  if (round) out.push(checkTraceMatchesJsonl(trace, round));
  else out.push({ name: `source cross-check: round ${trace.roundIndex} has a JSONL line`, passed: false, detail: 'no JSONL round matched this trace index' });
  return out;
}
