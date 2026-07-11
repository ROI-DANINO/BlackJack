// Guided Drill QA runner. Drives the Learn mode through the DEV-only window.__drill hook,
// asserting that arranged situations preserve provenance/composition and live practice returns
// to ordinary shuffled-shoe cards. Writes runs/<date>-drill/report.{md,json}.

import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import type { Page } from 'playwright';
import type { Action, Card, Rank } from '../../src/bridge/types';
import type { DrillHook } from '../../src/breakit-hook';
import { handTotal } from '../../src/app/totals';
import { UNITS } from '../../src/drill/units';
import { assertWasmFresh, startPreview } from '../lib/server';
import { attachRecorder, chromiumVersionOf, launchBrowser, type Recorder } from '../lib/browser';
import { checkConsole } from '../lib/invariants';
import { writeRoleReport } from '../lib/report';
import type { Invariant, RoleReport } from '../lib/types';
import { checkArrangedProvenance, checkComposition, checkLiveProvenance } from './checks';

declare global {
  interface Window { __drill: DrillHook }
}

const WEB_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const REPO_ROOT = resolve(WEB_ROOT, '..');
const RUNS_ROOT = join(REPO_ROOT, 'journal', 'qa', 'runs');
const SPEC_LINK = 'docs/superpowers/specs/2026-07-10-first-guided-drill-design.md';
const LIVE_HANDS_PER_UNIT = 3;

interface UnitCoverage {
  unitId: string;
  title: string;
  situationRecords: number;
  liveRecords: number;
  recapRows: number;
}

interface DrillSnapshot {
  phase: string;
  situationIndex: number;
  legalActions: Action[];
  hint: Action | null;
  awaitingContinue: boolean;
  liveHandsPlayed: number;
  recordsLength: number;
  roundStatus: string | null;
  dealerUpRank: Rank | null;
  activeHandCards: Card[];
  roundDealtCards: Card[];
  shoeCards: Card[];
}

function gitCommit(): string {
  try {
    return execSync('git rev-parse --short HEAD', { cwd: REPO_ROOT }).toString().trim();
  } catch {
    return 'unknown';
  }
}

function log(msg: string): void {
  process.stdout.write(`[qa:drill] ${msg}\n`);
}

async function waitForDrillHook(page: Page): Promise<void> {
  await page.waitForFunction(() => Boolean((window as unknown as { __drill?: unknown }).__drill), null, {
    timeout: 15000,
  });
}

async function snapshot(page: Page): Promise<DrillSnapshot> {
  return page.evaluate(() => {
    const st = window.__drill.getState();
    const round = st.session?.round ?? null;
    const active = round ? round.hands[round.active_hand_index] : null;
    return {
      phase: st.phase,
      situationIndex: st.situationIndex,
      legalActions: st.legalActions,
      hint: st.hint,
      awaitingContinue: st.awaitingContinue,
      liveHandsPlayed: st.liveHandsPlayed,
      recordsLength: st.records.length,
      roundStatus: round?.status ?? null,
      dealerUpRank: round?.dealer.cards[0]?.rank ?? null,
      activeHandCards: active?.cards ?? [],
      roundDealtCards: round?.dealt_cards ?? [],
      shoeCards: st.session?.shoe.cards ?? [],
    };
  });
}

function chooseAction(st: DrillSnapshot): Action {
  if (st.hint && st.legalActions.includes(st.hint)) return st.hint;
  if (st.legalActions.includes('split')) return 'split';
  const { total, soft } = handTotal(st.activeHandCards);
  if (st.legalActions.includes('double') && !soft && total >= 9 && total <= 11) return 'double';
  const wantsHit = soft ? total < 18 : total < 17;
  if (wantsHit && st.legalActions.includes('hit')) return 'hit';
  if (st.legalActions.includes('stand')) return 'stand';
  return st.legalActions[0] ?? 'stand';
}

async function playUntilContinue(page: Page, label: string): Promise<DrillSnapshot> {
  for (let guard = 0; guard < 80; guard++) {
    const st = await snapshot(page);
    if (st.awaitingContinue || st.phase === 'recap') return st;
    if (st.roundStatus !== 'player_turn') {
      await page.waitForTimeout(10);
      continue;
    }
    const action = chooseAction(st);
    await page.evaluate((a) => window.__drill.choose(a), action);
    await page.waitForTimeout(10);
  }
  throw new Error(`${label}: did not reach a continue point`);
}

async function openUnit(page: Page, title: string): Promise<void> {
  await page.getByRole('button', { name: 'Learn' }).click();
  await page.getByRole('button', { name: title }).click();
  await waitForDrillHook(page);
}

async function driveUnit(page: Page, unitIndex: number, invariants: Invariant[]): Promise<UnitCoverage> {
  const unit = UNITS[unitIndex]!;
  await openUnit(page, unit.title);
  log(`unit: ${unit.title}`);

  const situationCount = unit.situations.length;
  for (let i = 0; i < situationCount; i++) {
    const before = await snapshot(page);
    const expectedPrefixLength = unit.situations[i]!.build(0).length;
    const leading = before.shoeCards.slice(0, expectedPrefixLength);
    invariants.push({
      name: `${unit.id}/${unit.situations[i]!.id}: arranged prefix has expected length`,
      passed: leading.length === expectedPrefixLength && before.shoeCards[expectedPrefixLength]?.deck_id !== 'arranged',
      detail: `expected=${expectedPrefixLength}; actual=${leading.length}`,
    });
    invariants.push({
      ...checkArrangedProvenance(leading),
      name: `${unit.id}/${unit.situations[i]!.id}: arranged opening is arranged-origin`,
    });
    invariants.push({
      ...checkComposition(before.shoeCards),
      name: `${unit.id}/${unit.situations[i]!.id}: shoe is a true six-deck (312)`,
    });

    await playUntilContinue(page, `${unit.id}/${unit.situations[i]!.id}`);
    await page.evaluate(() => window.__drill.next());
    await page.waitForTimeout(20);
  }

  const intro = await snapshot(page);
  invariants.push({
    name: `${unit.id}: reaches live intro after situations`,
    passed: intro.phase === 'live_intro',
    detail: `phase=${intro.phase}`,
  });

  await page.evaluate(() => window.__drill.beginLive());
  await page.waitForTimeout(20);
  for (let i = 0; i < LIVE_HANDS_PER_UNIT; i++) {
    const done = await playUntilContinue(page, `${unit.id}/live-${i + 1}`);
    invariants.push({
      ...checkLiveProvenance(done.roundDealtCards),
      name: `${unit.id}/live-${i + 1}: live cards come from a shuffled shoe`,
    });
    if (i < LIVE_HANDS_PER_UNIT - 1) {
      await page.evaluate(() => window.__drill.next());
      await page.waitForTimeout(20);
    }
  }

  await page.evaluate(() => window.__drill.finish());
  await page.waitForTimeout(20);
  const recap = await snapshot(page);
  const recapRows = await page.locator('section li').count();
  const expectedRecords = situationCount + LIVE_HANDS_PER_UNIT;
  invariants.push({
    name: `${unit.id}: recap contains every situation and live hand`,
    passed: recap.phase === 'recap' && recap.recordsLength === expectedRecords && recapRows === expectedRecords,
    detail: `phase=${recap.phase}; records=${recap.recordsLength}; rows=${recapRows}; expected=${expectedRecords}`,
  });

  return {
    unitId: unit.id,
    title: unit.title,
    situationRecords: situationCount,
    liveRecords: LIVE_HANDS_PER_UNIT,
    recapRows,
  };
}

async function main(): Promise<number> {
  const startedAt = new Date().toISOString();
  const dateStamp = startedAt.slice(0, 10);

  log('checking WASM freshness...');
  assertWasmFresh();

  log('building instrumented bundle + starting vite preview...');
  const preview = await startPreview({ outDir: 'dist-qa-drill', port: 4324 });
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

  try {
    await page.goto(preview.baseUrl, { waitUntil: 'domcontentloaded' });
    for (let i = 0; i < UNITS.length; i++) {
      coverage.push(await driveUnit(page, i, invariants));
    }
  } finally {
    await browser.close().catch(() => {});
    await preview.stop().catch(() => {});
  }

  invariants.push(checkConsole(rec.messages));
  const failed = invariants.filter((i) => !i.passed);
  const passed = failed.length === 0;
  const finishedAt = new Date().toISOString();

  const report: RoleReport = {
    role: 'drill',
    specLink: SPEC_LINK,
    title: 'Guided Drill — Get to Know Blackjack',
    startedAt,
    finishedAt,
    commit: gitCommit(),
    chromiumVersion,
    baseUrl: preview.baseUrl,
    passed,
    headerRows: [
      ['Units completed', `${coverage.length}/${UNITS.length}`],
      ['Situation records', String(coverage.reduce((n, c) => n + c.situationRecords, 0))],
      ['Live records', String(coverage.reduce((n, c) => n + c.liveRecords, 0))],
      ['Violations', String(failed.length)],
    ],
    body: renderBody(coverage, invariants),
    json: { passed, coverage, violations: failed },
  };
  const written = writeRoleReport(RUNS_ROOT, dateStamp, report);

  log(`units: ${coverage.length}/${UNITS.length}; violations: ${failed.length}`);
  for (const f of failed.slice(0, 20)) log(`  x ${f.name}${f.detail ? ` — ${f.detail}` : ''}`);
  log(`report written: ${written.mdPath}`);
  log(`VERDICT: ${passed ? 'PASS' : 'FAIL'}`);
  return passed ? 0 : 1;
}

function renderBody(coverage: UnitCoverage[], invariants: Invariant[]): string {
  const failed = invariants.filter((i) => !i.passed);
  const lines: string[] = [];
  lines.push('## Coverage');
  lines.push('');
  for (const unit of coverage) {
    lines.push(`- ${unit.title}: ${unit.situationRecords} arranged situations, ${unit.liveRecords} live hands, ${unit.recapRows} recap rows.`);
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
    lines.push('None — arranged provenance, six-deck composition, live-card provenance, recaps, and browser console all clean.');
  }
  lines.push('');
  return lines.join('\n');
}

main()
  .then((code) => process.exit(code))
  .catch((e) => {
    process.stderr.write(`[qa:drill] fatal: ${(e as Error).stack ?? (e as Error).message}\n`);
    process.exit(2);
  });
