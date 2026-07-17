// The Vitest host for the 14 provider-neutral storage gates (design §11), run against the
// in-memory fake (progress/fake-store.ts).
//
// Design: docs/superpowers/specs/2026-07-17-progressstore-cycle1-design.md
//
// THIS FILE IS DELIBERATELY THIN. `contract.ts` holds the gates as host-neutral DATA precisely so
// that the same 14 run here under Vitest and, later, inside a real browser page against the `idb`
// adapter (Tasks 7-9). Anything asserted here that is not asserted there is a property the adapter
// is never held to — so the only things this file adds to `gate.run()` are the two that CANNOT be
// gate data:
//
//   1. The 12/2 SUMMARY (below). §11 and AL-R2 :162 record the in-memory baseline at 12/14, and
//      §8.3 names the two it fails: reload and concurrent tabs. A gate reports only its own status;
//      nothing inside `contract.ts` can notice that a future change quietly turned gate 2 or 7 from
//      'declared-unsupported' into 'pass'. That drift is the exact way this suite would become a
//      rubber stamp, so it is asserted here, by number and by name.
//   2. Gate 9's COMPILE-TIME half (bottom of file). Gates are runtime data and cannot assert `tsc`.
//      Handed over explicitly by contract.ts's gate-9 doc comment and .wl/sdd/task-4-report.md.
//
// No jsdom pragma: the Vitest environment here is 'node' (web/vite.config.ts). The fake needs no
// IndexedDB, which is the whole reason it exists — see fake-store.ts's header.

import { PROGRESS_STORE_GATES } from './contract';
import type { GateResult } from './contract';
import { createFakeSubject, openFakeProgressStore } from './fake-store';
import type { LearnerKey } from './types';

const subject = createFakeSubject();

/**
 * Every gate's result, collected as the per-gate `it()`s run so the summary block below can read
 * them. Vitest runs the tests in one file sequentially, in declaration order, unless they are
 * declared `.concurrent` — none here are — so every gate has reported by the time the summary
 * block runs. `expectedGateCount` below fails loudly rather than silently under-counting if that
 * ever stops being true.
 */
const results: GateResult[] = [];

function resultFor(id: string): GateResult {
  const result = results.find((entry) => entry.id === id);
  if (result === undefined) {
    throw new Error(`gate '${id}' did not report a result — the suite cannot summarise what did not run.`);
  }
  return result;
}

describe.each(PROGRESS_STORE_GATES)('gate $id ($label)', (gate) => {
  it('holds for the in-memory fake', async () => {
    const result = await gate.run(subject);
    results.push(result);
    // `detail` carries the assertion message a failing gate wrote, including contract.ts's
    // `GATE BUG: ` prefix when the gate's own body threw rather than the subject failing a check.
    expect(result.status, `${result.id}\n${result.detail ?? '(no detail)'}`).not.toBe('fail');
  });
});

describe('the fake reproduces AL-R2 :162\'s in-memory row (design §8.3, §11) rather than faking a green', () => {
  // §8.3: the in-memory baseline "fails exactly the two gates (reload, concurrent tabs) a degraded
  // mode openly does not offer". `not.toBe('fail')` above is satisfied by 'pass' just as happily as
  // by 'declared-unsupported' — these two name which answer is the honest one.
  it.each([
    ['reload-persistence', 'durable:false — an in-memory envelope does not survive a reload'],
    ['concurrent-appends', 'multiConnection:false — one module realm is not two tabs'],
  ])('gate %s is declared-unsupported, not pass (%s)', (id) => {
    const result = resultFor(id);
    expect(result.status, `${id} reported '${result.status}': ${result.detail ?? '(no detail)'}`).toBe(
      'declared-unsupported',
    );
    // A declared non-capability is not a skip (§11): the gate must say what it verified by
    // observation, not merely that it read a flag.
    expect(result.detail, `${id} declared a non-capability without a reason string`).toBeTruthy();
  });

  it('scores exactly 12 pass and 2 declared-unsupported across all 14 gates', () => {
    expect(results, 'every gate must have reported before the summary').toHaveLength(PROGRESS_STORE_GATES.length);
    const count = (status: GateResult['status']): number => results.filter((r) => r.status === status).length;
    expect(
      { pass: count('pass'), declaredUnsupported: count('declared-unsupported'), fail: count('fail') },
      `full results: ${results.map((r) => `${r.id}=${r.status}`).join(', ')}`,
    ).toEqual({ pass: 12, declaredUnsupported: 2, fail: 0 });
  });
});

describe('gate 9 — the compile-time half (design §3.4; handed over by contract.ts gate 9 / task-4-report.md)', () => {
  // contract.ts's gate 9 implements only the RUNTIME half (canonical export succeeds while data
  // exists; a stale expectedRevision → conflict). "reset without `acknowledged` does not type-check"
  // is a property of `tsc`, which a runtime gate cannot assert — so it lives here.
  //
  // An unused `@ts-expect-error` is itself a compile error, so each directive below fails
  // `tsc --noEmit` the moment the line under it starts compiling — i.e. the moment
  // `ResetConfirmation` stops forcing the two fields. Vitest does NOT typecheck; `npm --prefix web
  // run build` (tsc --noEmit && vite build) is what runs this assertion.
  it('reset() cannot be called without the acknowledgement literal AND a revision the caller looked up', async () => {
    const outcome = await openFakeProgressStore({
      namespace: 'progress-contract-reset-typecheck',
      schemaVersion: 1,
      mintLearnerKey: () => 'fake-learner-typecheck' as LearnerKey,
    });
    expect(outcome.status).toBe('open');
    if (outcome.status !== 'open') return;
    const store = outcome.store;

    // The POSITIVE control. If this line did not compile, the three directives below would be
    // "erroring" for some unrelated reason (a wrong method name, a store typed `any`, an import
    // that resolved to nothing) and would assert nothing about ResetConfirmation at all.
    void (() => store.reset({ acknowledged: 'reset-with-confirmation', expectedRevision: 1 }));
    void (() => store.reset({ acknowledged: 'reset-with-confirmation', expectedRevision: 'unloadable' }));

    // @ts-expect-error — `acknowledged: 'reset-with-confirmation'` is a literal, not producible by accident (§3.4).
    void (() => store.reset({ expectedRevision: 1 }));
    // @ts-expect-error — `expectedRevision` forces the caller to have LOOKED first (§3.4).
    void (() => store.reset({ acknowledged: 'reset-with-confirmation' }));
    // @ts-expect-error — a plausible-looking acknowledgement is not the literal; that is the entire point of a literal.
    void (() => store.reset({ acknowledged: 'yes', expectedRevision: 1 }));

    await store.close();
  });
});
