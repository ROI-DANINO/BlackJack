// PURE shared invariant checks over the exported JSONL + console. Role-agnostic: these are the
// integrity properties that must hold for ANY session regardless of how it was driven (attacks,
// scripted basic strategy, flow walk). Lifted from breakit's oracle.ts. Unit-tested via
// qa/breakit/oracle.test.ts (and re-exercised by rules/flow fixtures) so no check can go no-op.

import { isHeader, isRound, parseJsonl } from './jsonl';
import type { ConsoleMessage, Invariant, LogLine } from './types';

/** History integrity: one header per session, rounds have a header, no dup/regressing round_index. */
export function checkHistory(records: LogLine[]): Invariant[] {
  const headers = records.filter(isHeader);
  const rounds = records.filter(isRound);
  const out: Invariant[] = [];

  const headerIds = new Set<string>();
  const dupHeaders: string[] = [];
  for (const h of headers) {
    if (headerIds.has(h.session_id)) dupHeaders.push(h.session_id);
    else headerIds.add(h.session_id);
  }
  out.push({
    name: 'history: exactly one session_header per session_id',
    passed: dupHeaders.length === 0,
    detail: dupHeaders.length ? `duplicate headers: ${dupHeaders.join(', ')}` : undefined,
  });

  const orphans = rounds.filter((r) => !headerIds.has(r.session_id));
  out.push({
    name: 'history: every round has a matching session_header',
    passed: orphans.length === 0,
    detail: orphans.length ? `${orphans.length} orphan round(s), e.g. session ${orphans[0]!.session_id}` : undefined,
  });

  // Per-session: no duplicate round_index, strictly increasing in file order.
  const bySession = new Map<string, number[]>();
  for (const r of rounds) {
    const arr = bySession.get(r.session_id) ?? [];
    arr.push(r.round_index);
    bySession.set(r.session_id, arr);
  }
  const dupIdx: string[] = [];
  const nonMono: string[] = [];
  for (const [sid, idx] of bySession) {
    const seen = new Set<number>();
    let prev = -Infinity;
    for (const i of idx) {
      if (seen.has(i)) dupIdx.push(`${sid}#${i}`);
      seen.add(i);
      if (i <= prev) nonMono.push(`${sid}: ${i} after ${prev}`);
      prev = i;
    }
  }
  out.push({
    name: 'history: no duplicate round_index within a session',
    passed: dupIdx.length === 0,
    detail: dupIdx.length ? `duplicates: ${dupIdx.slice(0, 5).join(', ')}` : undefined,
  });
  out.push({
    name: 'history: round_index strictly increasing per session',
    passed: nonMono.length === 0,
    detail: nonMono.length ? nonMono.slice(0, 5).join('; ') : undefined,
  });

  return out;
}

/**
 * Session flush (QA-007): rounds appear in contiguous blocks under their own header.
 * Walking the file in order, every round's session_id must equal the most recent header —
 * i.e. a prior session's buffered round is flushed BEFORE the next header, never after it.
 */
export function checkSessionFlush(records: LogLine[]): Invariant {
  let current: string | null = null;
  const misplaced: string[] = [];
  for (const r of records) {
    if (isHeader(r)) current = r.session_id;
    else if (isRound(r) && r.session_id !== current) {
      misplaced.push(`round ${r.session_id}#${r.round_index} under header ${current ?? '(none)'}`);
    }
  }
  return {
    name: 'session flush: rounds are contiguous under their header (QA-007 order)',
    passed: misplaced.length === 0,
    detail: misplaced.length ? misplaced.slice(0, 5).join('; ') : undefined,
  };
}

/** Money conservation: per session, bankroll chains cleanly and deltas equal Σ outcome deltas. */
export function checkMoney(records: LogLine[]): Invariant {
  const starting = new Map<string, number>();
  for (const h of records.filter(isHeader)) starting.set(h.session_id, h.starting_bankroll);

  const prevAfter = new Map<string, number>();
  const violations: string[] = [];
  for (const r of records) {
    if (!isRound(r)) continue;
    const sumDelta = r.outcomes.reduce((s, o) => s + o.delta, 0);
    if (r.bankroll_delta !== sumDelta) {
      violations.push(`${r.session_id}#${r.round_index}: bankroll_delta ${r.bankroll_delta} != Σoutcomes ${sumDelta}`);
    }
    if (r.bankroll_after !== r.bankroll_before + r.bankroll_delta) {
      violations.push(`${r.session_id}#${r.round_index}: after ${r.bankroll_after} != before ${r.bankroll_before} + delta ${r.bankroll_delta}`);
    }
    const expectedBefore = prevAfter.has(r.session_id)
      ? prevAfter.get(r.session_id)!
      : starting.get(r.session_id);
    if (expectedBefore !== undefined && r.bankroll_before !== expectedBefore) {
      violations.push(`${r.session_id}#${r.round_index}: bankroll_before ${r.bankroll_before} != expected ${expectedBefore}`);
    }
    prevAfter.set(r.session_id, r.bankroll_after);
  }
  return {
    name: 'money conservation: bankroll chains and deltas balance',
    passed: violations.length === 0,
    detail: violations.length ? violations.slice(0, 5).join('; ') : undefined,
  };
}

/** Card conservation: within one shoe (session_id + shoe_number), no card instance dealt twice. */
export function checkCards(records: LogLine[]): Invariant {
  const seen = new Map<string, Set<string>>();
  const dups: string[] = [];
  for (const r of records) {
    if (!isRound(r)) continue;
    const key = `${r.session_id}#${r.shoe_number}`;
    const set = seen.get(key) ?? new Set<string>();
    for (const c of r.dealt_cards) {
      if (set.has(c.card_id)) dups.push(`${key}: ${c.card_id}`);
      set.add(c.card_id);
    }
    seen.set(key, set);
  }
  return {
    name: 'card conservation: no card dealt twice within a shoe',
    passed: dups.length === 0,
    detail: dups.length ? dups.slice(0, 5).join('; ') : undefined,
  };
}

/** Seed integrity: the on-screen seed equals the (current session's) header seed VALUE. */
export function checkSeedOnScreen(records: LogLine[], onScreenSeed: string): Invariant {
  const headers = records.filter(isHeader);
  const last = headers[headers.length - 1];
  return {
    name: 'seed integrity: on-screen seed matches session_header.seed',
    passed: !!last && last.seed === onScreenSeed,
    detail: last ? (last.seed === onScreenSeed ? undefined : `header ${last.seed} != on-screen ${onScreenSeed}`) : 'no session_header found',
  };
}

/** New session changes the seed: all captured seeds must be distinct. */
export function checkSeedsDistinct(seeds: string[]): Invariant {
  const uniq = new Set(seeds);
  return {
    name: 'seed integrity: New session changes the seed',
    passed: uniq.size === seeds.length,
    detail: uniq.size === seeds.length ? undefined : `repeated seed among ${seeds.join(', ')}`,
  };
}

/** Determinism: same seed ⇒ identical dealt-card sequence across two runs. */
export function checkDeterminism(a: string, b: string): Invariant {
  const seq = (text: string): { seed: string | null; cards: string[] } => {
    const { records } = parseJsonl(text);
    const header = records.find(isHeader) ?? null;
    const cards: string[] = [];
    for (const r of records) if (isRound(r)) for (const c of r.dealt_cards) cards.push(c.card_id);
    return { seed: header ? header.seed : null, cards };
  };
  const sa = seq(a);
  const sb = seq(b);
  const sameSeed = sa.seed !== null && sa.seed === sb.seed;
  const sameCards = sa.cards.length === sb.cards.length && sa.cards.every((c, i) => c === sb.cards[i]);
  return {
    name: 'seed integrity: same seed ⇒ identical shoe (determinism)',
    passed: sameSeed && sameCards,
    detail: !sameSeed
      ? `seeds differ or missing: ${sa.seed} vs ${sb.seed}`
      : sameCards
        ? undefined
        : `dealt-card sequences diverge (lens ${sa.cards.length} vs ${sb.cards.length})`,
  };
}

const BENIGN_CONSOLE = [/favicon\.ico/i, /Failed to load resource.*favicon/i];

/** No console errors or warnings (production build ⇒ StrictMode dev warnings are already gone). */
export function checkConsole(messages: ConsoleMessage[]): Invariant {
  const bad = messages.filter(
    (m) => (m.type === 'error' || m.type === 'warning') && !BENIGN_CONSOLE.some((re) => re.test(m.text)),
  );
  return {
    name: 'robustness: no console errors or warnings',
    passed: bad.length === 0,
    detail: bad.length ? bad.slice(0, 5).map((m) => `[${m.type}] ${m.text}`).join(' | ') : undefined,
  };
}

/** No page crash during the run. */
export function checkNoCrash(crashed: boolean): Invariant {
  return { name: 'robustness: no page crash', passed: !crashed, detail: crashed ? 'page crashed' : undefined };
}

/** No stuck UI: a fresh Deal still resolves after the run. */
export function checkFreshDealWorks(freshDealWorks: boolean): Invariant {
  return {
    name: 'no stuck UI: a fresh Deal still resolves',
    passed: freshDealWorks,
    detail: freshDealWorks ? undefined : 'post-run Deal did not resolve',
  };
}
