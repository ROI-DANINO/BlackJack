// State & Round Flow — PURE checks over captured DOM+engine snapshots. No page/IO here.
// Asserts control-surface legality at each state, no stuck states, the active-hand indicator
// (QA-004), no stale leak into the next round, and the shoe-reshuffle notice appearing once and
// clearing. Unit-tested against good AND deliberately-broken snapshots (stuck, leaked, missing
// indicator, illegal buttons) so the script can never go no-op-green.

import type { Action } from '../../src/bridge/types';
import type { Invariant } from '../lib/types';

export const RESHUFFLE_NOTICE = 'Shoe reshuffled — new shoe';
const ACTION_LABEL: Record<Action, string> = { hit: 'Hit', stand: 'Stand', double: 'Double', split: 'Split' };
const ACTION_BUTTONS = ['Hit', 'Stand', 'Double', 'Split'];
const ACTIONABLE = ['Start session', 'Deal', 'Hit', 'Stand', 'Double', 'Split'];

export interface FlowSnapshot {
  roundKey: number;                 // 0 = pre/idle; increments on each Deal
  label: string;                    // 'pre-session' | 'session-idle' | 'after-deal' | 'after-hit' | 'resolved' | …
  phase: string;                    // 'idle' | 'in_session' | 'fatal'
  status: 'none' | 'player_turn' | 'dealer_turn' | 'resolved';
  buttons: string[];                // visible button texts
  legalActions: Action[];           // engine legal actions at this snapshot
  handCount: number;
  activeHandIndex: number;          // engine active_hand_index (-1 if none)
  activeHandCardCount: number;      // # cards in the active hand
  activeMarkers: number;            // # DOM hand blocks with aria-current="true"
  noticeText: string | null;
  outcomeTexts: string[];           // rendered outcome spans (e.g. "Win (+$20.00)")
  noteInputPresent: boolean;
  shoeNumber: number | null;
}

const has = (snap: FlowSnapshot, label: string): boolean => snap.buttons.includes(label);

/** Control surface exactly matches the legal actions for the snapshot's state. */
export function checkControlSurface(snap: FlowSnapshot): Invariant {
  const v: string[] = [];
  const actionButtons = snap.buttons.filter((b) => ACTION_BUTTONS.includes(b));

  if (snap.phase === 'idle') {
    if (!has(snap, 'Start session')) v.push('idle: missing Start session');
    for (const b of [...ACTION_BUTTONS, 'Deal', 'Download history', 'New session']) {
      if (has(snap, b)) v.push(`idle: unexpected ${b}`);
    }
  } else if (snap.phase === 'in_session') {
    if (!has(snap, 'Download history')) v.push('in-session: missing Download history');
    if (!has(snap, 'New session')) v.push('in-session: missing New session');
    if (snap.status === 'player_turn') {
      const expected = snap.legalActions.map((a) => ACTION_LABEL[a]).sort();
      const got = [...actionButtons].sort();
      if (JSON.stringify(expected) !== JSON.stringify(got)) v.push(`player_turn: buttons ${JSON.stringify(got)} != legal ${JSON.stringify(expected)}`);
      if (has(snap, 'Deal')) v.push('player_turn: Deal offered mid-turn');
    } else {
      // resolved or no round: only Deal is actionable, no in-turn actions.
      if (!has(snap, 'Deal')) v.push(`${snap.status}: missing Deal`);
      if (actionButtons.length) v.push(`${snap.status}: stray action buttons ${JSON.stringify(actionButtons)}`);
    }
  }

  return { name: `control surface legal @ ${snap.label} [round ${snap.roundKey}]`, passed: v.length === 0, detail: v.length ? v.join('; ') : undefined };
}

/** No stuck state: every snapshot has at least one actionable control. */
export function checkNoStuck(snap: FlowSnapshot): Invariant {
  const ok = snap.buttons.some((b) => ACTIONABLE.includes(b));
  return { name: `no stuck state @ ${snap.label} [round ${snap.roundKey}]`, passed: ok, detail: ok ? undefined : `no actionable control; buttons=${JSON.stringify(snap.buttons)}` };
}

/**
 * Active-hand indicator (QA-004): rendered iff a multi-hand split turn is in progress.
 * Positive: during a >1-hand player_turn exactly one hand block is marked active.
 * Negative: single-hand or resolved snapshots carry NO active marker.
 */
export function checkActiveHandIndicator(snap: FlowSnapshot): Invariant {
  const splitTurn = snap.status === 'player_turn' && snap.handCount > 1;
  const ok = splitTurn ? snap.activeMarkers === 1 : snap.activeMarkers === 0;
  return {
    name: `active-hand indicator @ ${snap.label} [round ${snap.roundKey}]`,
    passed: ok,
    detail: ok ? undefined : splitTurn
      ? `split turn should mark exactly one active hand, found ${snap.activeMarkers}`
      : `non-split/resolved state should have no active marker, found ${snap.activeMarkers}`,
  };
}

/** Double/Split must vanish once the active hand is no longer a fresh 2-card hand. */
export function checkNoDoubleSplitAfterHit(snap: FlowSnapshot): Invariant {
  if (snap.status !== 'player_turn' || snap.activeHandCardCount <= 2) {
    return { name: `double/split gated @ ${snap.label} [round ${snap.roundKey}]`, passed: true };
  }
  const stray = snap.buttons.filter((b) => b === 'Double' || b === 'Split');
  return {
    name: `double/split gone after hit @ ${snap.label} [round ${snap.roundKey}]`,
    passed: stray.length === 0,
    detail: stray.length ? `hand has ${snap.activeHandCardCount} cards but still offers ${JSON.stringify(stray)}` : undefined,
  };
}

/** No stale leak: the first player-turn snapshot of a fresh round shows no prior outcome / note field. */
export function checkNoStaleLeak(afterDeal: FlowSnapshot): Invariant {
  if (afterDeal.status !== 'player_turn') {
    return { name: `no stale leak @ ${afterDeal.label} [round ${afterDeal.roundKey}]`, passed: true, detail: 'auto-resolved; leak checked by control surface' };
  }
  const v: string[] = [];
  if (afterDeal.outcomeTexts.length) v.push(`leftover outcome text ${JSON.stringify(afterDeal.outcomeTexts)}`);
  if (afterDeal.noteInputPresent) v.push('note input leaked into a fresh player turn');
  return { name: `no stale leak into fresh round @ round ${afterDeal.roundKey}`, passed: v.length === 0, detail: v.length ? v.join('; ') : undefined };
}

/**
 * Reshuffle notice appears once and clears: on every after-deal snapshot whose shoe incremented,
 * the reshuffle notice must show; and it must NOT persist into a later round with the same shoe.
 * Requires ≥1 observed reshuffle to make a positive assertion (else it's a reported gap).
 */
export function checkReshuffleNotice(afterDeals: FlowSnapshot[]): Invariant {
  const v: string[] = [];
  let observed = 0;
  let prevShoe: number | null = null;
  for (const s of afterDeals) {
    const incremented = prevShoe !== null && s.shoeNumber !== null && s.shoeNumber > prevShoe;
    const showsReshuffle = (s.noticeText ?? '').includes(RESHUFFLE_NOTICE);
    if (incremented) {
      observed++;
      if (!showsReshuffle) v.push(`round ${s.roundKey}: shoe went ${prevShoe}→${s.shoeNumber} but no reshuffle notice`);
    } else if (showsReshuffle) {
      v.push(`round ${s.roundKey}: reshuffle notice shown without a shoe increment (stale/leaked)`);
    }
    if (s.shoeNumber !== null) prevShoe = s.shoeNumber;
  }
  return {
    name: 'reshuffle notice appears once per reshuffle and clears',
    passed: v.length === 0,
    detail: v.length ? v.join('; ') : observed === 0 ? 'GAP: no shoe reshuffle observed this run' : `verified across ${observed} reshuffle(s)`,
  };
}

/** Run all per-snapshot + transition checks over an ordered snapshot list. */
export function checkFlow(snapshots: FlowSnapshot[]): Invariant[] {
  const out: Invariant[] = [];
  for (const s of snapshots) {
    out.push(checkControlSurface(s));
    out.push(checkNoStuck(s));
    out.push(checkActiveHandIndicator(s));
    out.push(checkNoDoubleSplitAfterHit(s));
  }
  for (const s of snapshots.filter((x) => x.label === 'after-deal')) out.push(checkNoStaleLeak(s));
  out.push(checkReshuffleNotice(snapshots.filter((x) => x.label === 'after-deal')));
  return out;
}
