// Oracle: the ONLY place breakit decides pass/fail. Composes the shared PURE invariant checks
// (../lib/invariants, ../lib/jsonl) into per-attack Invariant[] over an attack's Artifacts.
// The shared checks are unit-tested in oracle.test.ts against hand-built good/bad fixtures so the
// harness can be proven to actually detect breaks (guard against a no-op green harness).

import { parseJsonl } from '../lib/jsonl';
import {
  checkCards,
  checkConsole,
  checkDeterminism,
  checkHistory,
  checkMoney,
  checkSeedOnScreen,
  checkSeedsDistinct,
  checkSessionFlush,
} from '../lib/invariants';
import type { Artifacts, Invariant } from './types';

// Re-export the shared checks so existing importers keep one entry point.
export {
  parseJsonl,
  checkHistory,
  checkSessionFlush,
  checkMoney,
  checkCards,
  checkSeedOnScreen,
  checkSeedsDistinct,
  checkDeterminism,
  checkConsole,
};

/** Compose every applicable invariant for one attack's artifacts. */
export function evaluate(a: Artifacts): Invariant[] {
  const inv: Invariant[] = [];

  inv.push({
    name: 'attack completed without throwing',
    passed: !a.error,
    detail: a.error,
  });
  inv.push({
    name: 'no page crash',
    passed: !a.crashed,
    detail: a.crashed ? 'page crashed during attack' : undefined,
  });
  if (a.timedOutMs != null) {
    inv.push({ name: 'no hang (within per-attack timeout)', passed: false, detail: `timed out after ${a.timedOutMs}ms` });
  } else {
    inv.push({ name: 'no hang (within per-attack timeout)', passed: true });
  }

  inv.push(checkConsole(a.console));

  const texts = [a.jsonl, ...(a.extraJsonl ?? [])].filter((t) => t && t.trim() !== '');
  texts.forEach((t, i) => {
    const { records, errors } = parseJsonl(t);
    inv.push({
      name: `jsonl[${i}]: well-formed (one valid record per line)`,
      passed: errors.length === 0,
      detail: errors.length ? errors.slice(0, 5).join('; ') : undefined,
    });
    if (errors.length === 0) {
      inv.push(...checkHistory(records));
      inv.push(checkSessionFlush(records));
      inv.push(checkMoney(records));
      inv.push(checkCards(records));
      if (a.onScreenSeed) inv.push(checkSeedOnScreen(records, a.onScreenSeed));
    }
  });

  if (a.seeds && a.seeds.length >= 2) inv.push(checkSeedsDistinct(a.seeds));
  if (a.pairJsonl) inv.push(checkDeterminism(a.pairJsonl[0], a.pairJsonl[1]));
  if (a.freshDealWorks !== undefined) {
    inv.push({
      name: 'no stuck UI: a fresh Deal still resolves after the attack',
      passed: a.freshDealWorks,
      detail: a.freshDealWorks ? undefined : 'post-attack Deal did not resolve',
    });
  }

  return inv;
}
