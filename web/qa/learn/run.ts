// Learn QA runner. Drives all nine Blackjack Basics units through the real app via the
// DEV-only window.__learn hook, asserting that arranged hands preserve provenance/composition,
// the live checkpoint returns to ordinary shuffled-shoe cards, every unit's declared required
// checks pass, and one injected wrong answer per unit recovers via retry(). Replaces the
// retired Guided Drill role (qa/drill/) now that the curriculum has moved to Learn.
// Writes runs/<date>-learn/report.{md,json}.
//
// Driver-loop note: two fixes on top of the design brief's Step-5 loop shape, both confirmed
// empirically (not by inspection alone) before being applied:
//
// 1. Advancing past an answered question. The brief's loop answers a question step's choices and
//    relies on falling through to the `else` branch to call continue() once a step resolves. That
//    works for hand steps (a resolved hand drops `legalActions` to [], so the hand condition goes
//    false and the loop falls through to continue()), but a question step's `type` never changes,
//    so with the loop exactly as given, a unit with two or more sequential required question
//    checks (e.g. Meet Blackjack: goal-check then face-value-check, no hand step between them)
//    parks forever re-submitting a no-op answer to the same already-answered question and never
//    reaches the next one. Confirmed by driving LessonController directly (bypassing the
//    browser) with the literal loop: it stalled at `goal-check` for the full 120-iteration guard.
//    Fix: once a question step is already `awaitingContinue`, call continue() instead of
//    re-entering the answer logic.
//
// 2. Driving all the way to recap, not stopping at `state.completed`. `completed` (per
//    LessonController.computeCompleted) goes true as soon as every *required* check has a
//    correct attempt — which, for several units, happens well before the unit's remaining
//    ungraded hand steps or recap. Breaking the guard loop on `state.completed` (as the brief's
//    snippet does) (a) skips playing hand steps that sit after the last required check — Hit and
//    Stand's hit-hand/stand-hand never run, since its lone required check (action-check) is
//    answered first — and (b) never reaches the recap step's "Return to units" button, so
//    `window.__learn` stays bound to the finished unit's controller and the *next* unit's title
//    button never renders (Learn only renders the unit list when no controller is mounted).
//    Confirmed by running qa:learn with the literal break-on-completed loop: it hung opening the
//    second unit ("Read Your Hand") for the full 30s Playwright timeout. Fix: keep driving
//    (question/hand/continue branching unchanged) until `state.step.type === 'recap'`, assert
//    `completed` is true there, then click "Return to units" before opening the next unit.
//
// Everything else — the injected wrong answer + retry, the hand action preference order
// (requestedAction, else stand, else first legal), and the 120-iteration guard budget per unit —
// is exactly the brief's shape.

import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import type { Page } from 'playwright';
import type { LearnHook } from '../../src/breakit-hook';
import type { Unit } from '../../src/learn/types';
import { BLACKJACK_BASICS } from '../../src/learn/content/blackjack-basics';
import { assertWasmFresh, startPreview } from '../lib/server';
import { attachRecorder, chromiumVersionOf, launchBrowser, type Recorder } from '../lib/browser';
import { checkConsole } from '../lib/invariants';
import { writeRoleReport } from '../lib/report';
import type { Invariant, RoleReport } from '../lib/types';
import {
  checkAllUnitsVisited,
  checkArrangedProvenance,
  checkComposition,
  checkLiveProvenance,
  checkNoDuplicateAttempts,
  checkRecapCoverage,
  checkRequiredChecksPassed,
  type AttemptSnapshot,
  type UnitCoverage,
} from './checks';

declare global {
  interface Window { __learn: LearnHook }
}

const WEB_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const REPO_ROOT = resolve(WEB_ROOT, '..');
const RUNS_ROOT = join(REPO_ROOT, 'journal', 'qa', 'runs');
const SPEC_LINK = 'docs/superpowers/specs/2026-07-11-blackjack-basics-learning-foundation-design.md';
const GUARD_LIMIT = 120;

interface DrivenUnit {
  coverage: UnitCoverage;
  invariants: Invariant[];
  arrangedHands: number;
  liveHands: number;
  stepCount: number;
}

function gitCommit(): string {
  try {
    return execSync('git rev-parse --short HEAD', { cwd: REPO_ROOT }).toString().trim();
  } catch {
    return 'unknown';
  }
}

function log(msg: string): void {
  process.stdout.write(`[qa:learn] ${msg}\n`);
}

// `window.__learn` is a single global reassigned in place each time a unit is opened (see
// mountLearn in breakit-hook.ts), and that reassignment is behind an async dynamic import — so
// `Boolean(window.__learn)` alone (the brief's literal wait) is trivially true from the SECOND
// unit onward even before the new controller has mounted, racing a stale read of the just-
// finished unit. Wait for the hook to actually reflect the unit we just opened instead.
async function waitForLearnHook(page: Page, unitId: string): Promise<void> {
  await page.waitForFunction(
    (id) => {
      const hook = (window as unknown as { __learn?: LearnHook }).__learn;
      return Boolean(hook) && hook.getState().unit.id === id;
    },
    unitId,
    { timeout: 15000 },
  );
}

async function getState(page: Page) {
  return page.evaluate(() => window.__learn.getState());
}

async function openUnit(page: Page, unit: Unit): Promise<void> {
  await page.getByRole('button', { name: 'Learn' }).click();
  await page.getByRole('button', { name: unit.title }).click();
  await waitForLearnHook(page, unit.id);
}

/** Drive one unit through the guarded loop all the way to its recap step, collecting attempts +
 *  arranged/live hand provenance invariants as they're encountered, then exit back to the unit
 *  list so the next unit's title button is clickable. Throws if the guard budget is exhausted
 *  without reaching recap — a hang, not a pass, must fail the run rather than being reported. */
async function driveUnit(page: Page, unit: Unit): Promise<DrivenUnit> {
  await openUnit(page, unit);
  log(`unit: ${unit.title}`);

  const invariants: Invariant[] = [];
  const snapshotted = new Set<string>();
  let arrangedHands = 0;
  let liveHands = 0;
  let injectedRetry = false;
  let guard = 0;
  let reachedRecap = false;

  for (; guard < GUARD_LIMIT; guard++) {
    const state = await getState(page);

    if (state.step?.type === 'recap') { reachedRecap = true; break; }

    // A resolved hand step's cards are only ever visible on the iteration it resolves; the
    // step's own type never changes, so record its provenance once here rather than trying to
    // catch it inline in the branch below (which mirrors the brief's shape verbatim).
    if (state.step?.type === 'hand' && state.awaitingContinue && !snapshotted.has(state.step.id)) {
      snapshotted.add(state.step.id);
      const round = state.session?.round;
      if (round) {
        const dealt = round.dealt_cards;
        if (state.step.setup.kind === 'arranged') {
          const prefixLength = state.step.setup.openings[0]!.length;
          invariants.push({
            ...checkArrangedProvenance(dealt.slice(0, prefixLength)),
            name: `${unit.id}/${state.step.id}: arranged opening is arranged-origin`,
          });
          arrangedHands++;
        } else {
          invariants.push({
            ...checkLiveProvenance(dealt),
            name: `${unit.id}/${state.step.id}: live checkpoint cards come from a shuffled shoe`,
          });
          liveHands++;
        }
        invariants.push({
          ...checkComposition(state.session!.shoe.cards),
          name: `${unit.id}/${state.step.id}: shoe is a true six-deck (312)`,
        });
      }
    }

    if (state.step?.type === 'question') {
      // A question already answered correctly (awaitingContinue) never changes type, so the
      // brief's loop would re-submit a no-op answer to it forever; advance instead. See the
      // file-header note for how this was confirmed against the controller directly.
      if (state.awaitingContinue) {
        await page.evaluate(() => window.__learn.continue());
        continue;
      }
      if (!injectedRetry && state.step.answer.kind === 'literal') {
        const correct = state.step.answer.value;
        const wrong = state.step.choices.find((choice) => choice.value !== correct)!;
        await page.evaluate((value) => window.__learn.answer(value), wrong.value);
        await page.evaluate(() => window.__learn.retry());
        injectedRetry = true;
      }
      for (const choice of state.step.choices) {
        await page.evaluate((value) => window.__learn.answer(value), choice.value);
        const after = await getState(page);
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

  if (!reachedRecap) {
    throw new Error(`${unit.id}: driver guard exhausted (${GUARD_LIMIT} iterations) before reaching recap`);
  }

  const final = await getState(page);
  if (final.fatal) throw new Error(`${unit.id}: controller reported fatal: ${final.fatal}`);
  invariants.push({
    name: `${unit.id}: reaches recap with every required check satisfied`,
    passed: final.completed === true,
    detail: final.completed ? undefined : `completed=${final.completed}`,
  });

  const attempts: AttemptSnapshot[] = final.attempts.map((a) => ({ stepId: a.stepId, correct: a.correct }));
  const coverage: UnitCoverage = { unitId: unit.id, requiredChecks: unit.requiredChecks, attempts };

  await page.getByRole('button', { name: 'Return to units' }).click();

  return { coverage, invariants, arrangedHands, liveHands, stepCount: unit.steps.length };
}

async function main(): Promise<number> {
  const startedAt = new Date().toISOString();
  const dateStamp = startedAt.slice(0, 10);

  log('checking WASM freshness...');
  assertWasmFresh();

  log('building instrumented bundle + starting vite preview...');
  const preview = await startPreview({ outDir: 'dist-qa-learn', port: 4325 });
  log(`  preview up at ${preview.baseUrl}`);

  const browser = await launchBrowser();
  const chromiumVersion = chromiumVersionOf(browser);
  log(`  chromium ${chromiumVersion}`);

  const context = await browser.newContext();
  await context.route('**/favicon.ico', (route) => route.fulfill({ status: 200, body: '' }));
  const rec: Recorder = { messages: [], crashed: false };
  const page = await context.newPage();
  attachRecorder(page, rec);

  const invariants: Invariant[] = [];
  const coverage: UnitCoverage[] = [];
  const perUnitSummary: Array<{ unit: Unit; stepCount: number; attempts: number; arrangedHands: number; liveHands: number }> = [];

  try {
    await page.goto(preview.baseUrl, { waitUntil: 'domcontentloaded' });
    for (const unit of BLACKJACK_BASICS.units) {
      const driven = await driveUnit(page, unit);
      coverage.push(driven.coverage);
      invariants.push(...driven.invariants);
      perUnitSummary.push({
        unit, stepCount: driven.stepCount, attempts: driven.coverage.attempts.length,
        arrangedHands: driven.arrangedHands, liveHands: driven.liveHands,
      });
    }
  } finally {
    await browser.close().catch(() => {});
    await preview.stop().catch(() => {});
  }

  invariants.push(checkAllUnitsVisited(coverage, BLACKJACK_BASICS.units.map((u) => u.id)));
  invariants.push(checkRequiredChecksPassed(coverage));
  invariants.push(checkNoDuplicateAttempts(coverage));
  invariants.push(checkRecapCoverage(BLACKJACK_BASICS.units));
  invariants.push(checkConsole(rec.messages));

  const failed = invariants.filter((i) => !i.passed);
  const passed = failed.length === 0;
  const finishedAt = new Date().toISOString();

  const totalArrangedHands = perUnitSummary.reduce((n, u) => n + u.arrangedHands, 0);
  const totalLiveHands = perUnitSummary.reduce((n, u) => n + u.liveHands, 0);

  const report: RoleReport = {
    role: 'learn',
    specLink: SPEC_LINK,
    title: 'Learn — Blackjack Basics',
    startedAt,
    finishedAt,
    commit: gitCommit(),
    chromiumVersion,
    baseUrl: preview.baseUrl,
    passed,
    headerRows: [
      ['Units completed', `${coverage.length}/${BLACKJACK_BASICS.units.length}`],
      ['Arranged hands played', String(totalArrangedHands)],
      ['Live checkpoint hands played', String(totalLiveHands)],
      ['Violations', String(failed.length)],
    ],
    body: renderBody(perUnitSummary, invariants),
    json: { passed, coverage, violations: failed },
  };
  const written = writeRoleReport(RUNS_ROOT, dateStamp, report);

  log(`units: ${coverage.length}/${BLACKJACK_BASICS.units.length}; violations: ${failed.length}`);
  for (const f of failed.slice(0, 20)) log(`  x ${f.name}${f.detail ? ` — ${f.detail}` : ''}`);
  log(`report written: ${written.mdPath}`);
  log(`VERDICT: ${passed ? 'PASS' : 'FAIL'}`);
  return passed ? 0 : 1;
}

function renderBody(
  perUnitSummary: Array<{ unit: Unit; stepCount: number; attempts: number; arrangedHands: number; liveHands: number }>,
  invariants: Invariant[],
): string {
  const failed = invariants.filter((i) => !i.passed);
  const lines: string[] = [];
  lines.push('## Coverage');
  lines.push('');
  for (const u of perUnitSummary) {
    lines.push(
      `- ${u.unit.title}: ${u.stepCount} steps, ${u.attempts} attempts, ` +
      `required checks [${u.unit.requiredChecks.join(', ')}], ${u.arrangedHands} arranged hands, ${u.liveHands} live hands.`,
    );
  }
  lines.push('');
  lines.push('## Checks');
  lines.push('');
  lines.push(`- Total assertions: **${invariants.length}**, failures: **${failed.length}**`);
  lines.push('');
  lines.push('### Violations');
  lines.push('');
  if (failed.length) {
    for (const f of failed) lines.push(`- FAIL — ${f.name}${f.detail ? ` — ${f.detail}` : ''}`);
  } else {
    lines.push(
      'None — every unit was visited, every declared required check passed, arranged/live ' +
      'provenance and six-deck composition held, no step was double-graded correct, recap ' +
      'capabilities match declared outcomes, and the browser console stayed clean.',
    );
  }
  lines.push('');
  return lines.join('\n');
}

main()
  .then((code) => process.exit(code))
  .catch((e) => {
    process.stderr.write(`[qa:learn] fatal: ${(e as Error).stack ?? (e as Error).message}\n`);
    process.exit(2);
  });
