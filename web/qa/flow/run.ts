// State & Round Flow runner (qa:flow). Walks a session through every transition via window.__breakit
// while capturing combined DOM+engine snapshots at each state, then asserts control-surface
// legality, no stuck states, the active-hand indicator (QA-004), no stale leak into the next round,
// and the reshuffle notice appearing/clearing. Writes runs/<date>-flow/report.{md,json}; exits
// NON-ZERO on any break.

import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import type { Page } from 'playwright';
import { assertWasmFresh, startPreview } from '../lib/server';
import { launchBrowser, chromiumVersionOf, attachRecorder, type Recorder } from '../lib/browser';
import { Driver, basicStrategy } from '../lib/driver';
import { checkConsole } from '../lib/invariants';
import { writeRoleReport } from '../lib/report';
import type { Invariant, RoleReport } from '../lib/types';
import { checkFlow, type FlowSnapshot } from './checks';

const WEB_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const REPO_ROOT = resolve(WEB_ROOT, '..');
const RUNS_ROOT = join(REPO_ROOT, 'journal', 'qa', 'runs');
const SPEC_LINK = 'docs/specs/2026-07-10-qa-script-suite.md';

const START_BANKROLL = 100000;
const DEFAULT_BET = 2000;
const SEED = 'qa-flow-alpha';
const ROUNDS = 72; // long enough to cross ≥1 shoe reshuffle

function gitCommit(): string {
  try {
    return execSync('git rev-parse --short HEAD', { cwd: REPO_ROOT }).toString().trim();
  } catch {
    return 'unknown';
  }
}

function log(msg: string): void {
  process.stdout.write(`[qa:flow] ${msg}\n`);
}

/** Read DOM control surface + engine state together, so what we assert is what the player sees. */
async function captureFlow(page: Page, roundKey: number, label: string): Promise<FlowSnapshot> {
  const raw = await page.evaluate(() => {
    const st = window.__breakit.getState();
    const r = st.session?.round ?? null;
    const buttons = [...document.querySelectorAll('button')].map((b) => (b.textContent ?? '').trim());
    const activeMarkers = document.querySelectorAll('[aria-current="true"]').length;
    const noticeEl = document.querySelector('p[role="status"]');
    const outcomeTexts = [...document.querySelectorAll('span')]
      .map((s) => (s.textContent ?? '').trim())
      .filter((t) => /^(Win|Loss|Push|Blackjack)\s*\(/.test(t));
    const noteInputPresent = !!document.querySelector('input[type="text"]');
    const active = r ? r.hands[r.active_hand_index] : undefined;
    return {
      phase: st.phase,
      status: (r ? r.status : 'none') as FlowSnapshot['status'],
      legalActions: st.legalActions,
      handCount: r ? r.hands.length : 0,
      activeHandIndex: r ? r.active_hand_index : -1,
      activeHandCardCount: active ? active.cards.length : 0,
      buttons,
      activeMarkers,
      noticeText: noticeEl ? noticeEl.textContent : null,
      outcomeTexts,
      noteInputPresent,
      shoeNumber: st.session?.shoe?.shoe_number ?? null,
    };
  });
  return { roundKey, label, ...raw };
}

async function main(): Promise<number> {
  const startedAt = new Date().toISOString();
  const dateStamp = startedAt.slice(0, 10);

  log('checking WASM freshness…');
  assertWasmFresh();

  log('building instrumented bundle + starting vite preview…');
  const preview = await startPreview({ outDir: 'dist-qa-flow', port: 4321 });
  log(`  preview up at ${preview.baseUrl}`);

  const browser = await launchBrowser();
  const chromiumVersion = chromiumVersionOf(browser);
  log(`  chromium ${chromiumVersion}`);

  const context = await browser.newContext();
  await context.route('**/favicon.ico', (route) => route.fulfill({ status: 200, body: '' }));
  const rec: Recorder = { messages: [], crashed: false };
  const page = await context.newPage();
  attachRecorder(page, rec);

  const snapshots: FlowSnapshot[] = [];
  let splitTurnsSeen = 0;
  let hitDoubleTested = false;

  try {
    await page.goto(preview.baseUrl, { waitUntil: 'domcontentloaded' });
    const driver = new Driver(page);
    await driver.waitForHook();

    snapshots.push(await captureFlow(page, 0, 'pre-session'));
    await driver.startSession(SEED, START_BANKROLL, DEFAULT_BET);
    await page.waitForTimeout(20);
    snapshots.push(await captureFlow(page, 0, 'session-idle'));

    for (let roundKey = 1; roundKey <= ROUNDS; roundKey++) {
      await driver.deal();
      await page.waitForTimeout(20);
      snapshots.push(await captureFlow(page, roundKey, 'after-deal'));

      let steps = 0;
      while (steps++ < 80) {
        const eng = await driver.snapshot();
        const round = eng.round;
        if (!round || round.status !== 'player_turn') break;
        const active = round.active_hand_index;
        const hand = round.hands[active]!;
        const legal = eng.legalActions;
        let action = basicStrategy(hand.cards, round.dealer[0]!.rank, legal);
        // Once, on a non-split doubleable hand, deliberately Hit to prove Double vanishes after.
        if (!hitDoubleTested && legal.includes('double') && !legal.includes('split') && hand.cards.length === 2) {
          action = 'hit';
          hitDoubleTested = true;
        }
        if (round.hands.length > 1) splitTurnsSeen++;
        await driver.act(action);
        await page.waitForTimeout(15);
        snapshots.push(await captureFlow(page, roundKey, `after-${action}`));
      }

      await page.waitForTimeout(15);
      snapshots.push(await captureFlow(page, roundKey, 'resolved'));
    }
  } finally {
    await browser.close().catch(() => {});
    await preview.stop().catch(() => {});
  }

  // --- evaluate ---
  const invariants: Invariant[] = checkFlow(snapshots);
  invariants.push(checkConsole(rec.messages));
  const reshuffles = new Set(snapshots.map((s) => s.shoeNumber).filter((n): n is number => n !== null)).size - 1;

  const failed = invariants.filter((i) => !i.passed);
  const passed = failed.length === 0;

  const finishedAt = new Date().toISOString();
  const body = renderBody(snapshots.length, splitTurnsSeen, hitDoubleTested, Math.max(0, reshuffles), invariants);
  const report: RoleReport = {
    role: 'flow', specLink: SPEC_LINK, title: 'State & Round Flow — QA script run',
    startedAt, finishedAt, commit: gitCommit(), chromiumVersion, baseUrl: preview.baseUrl, passed,
    headerRows: [
      ['Snapshots captured', String(snapshots.length)],
      ['Split-turn snapshots seen', String(splitTurnsSeen)],
      ['Hit→Double-gone exercised', hitDoubleTested ? 'yes' : 'GAP'],
      ['Shoe reshuffles observed', String(Math.max(0, reshuffles))],
      ['Violations', String(failed.length)],
    ],
    body,
    json: { passed, snapshots: snapshots.length, violations: failed },
  };
  const written = writeRoleReport(RUNS_ROOT, dateStamp, report);

  log(`snapshots: ${snapshots.length}; split-turn snaps: ${splitTurnsSeen}; reshuffles: ${Math.max(0, reshuffles)}; violations: ${failed.length}`);
  for (const f of failed.slice(0, 20)) log(`  ✗ ${f.name}${f.detail ? ` — ${f.detail}` : ''}`);
  log(`report written: ${written.mdPath}`);
  log(`VERDICT: ${passed ? 'PASS' : 'FAIL'}`);
  return passed ? 0 : 1;
}

function renderBody(snapCount: number, splitTurns: number, hitTested: boolean, reshuffles: number, invariants: Invariant[]): string {
  const tick = (b: boolean) => (b ? 'PASS' : 'FAIL');
  const failed = invariants.filter((i) => !i.passed);
  const lines: string[] = [];
  lines.push('## Coverage');
  lines.push('');
  lines.push(`- Snapshots captured across all transitions: **${snapCount}**`);
  lines.push(`- Multi-hand (split) player-turn snapshots: **${splitTurns}**`);
  lines.push(`- Hit→Double-gone deliberately exercised: **${hitTested ? 'yes' : 'no (gap)'}**`);
  lines.push(`- Shoe reshuffles observed: **${reshuffles}**`);
  lines.push('');
  lines.push('## Checks');
  lines.push('');
  lines.push(`- Total assertions: **${invariants.length}**, failures: **${failed.length}**`);
  lines.push('');
  lines.push('### Violations');
  lines.push('');
  if (failed.length) for (const f of failed) lines.push(`- ${tick(false)} — ${f.name}${f.detail ? ` — ${f.detail}` : ''}`);
  else lines.push('None — control surface, stuck-state, active-hand indicator, stale-leak, and reshuffle-notice checks all clean.');
  lines.push('');
  return lines.join('\n');
}

main()
  .then((code) => process.exit(code))
  .catch((e) => {
    process.stderr.write(`[qa:flow] fatal: ${(e as Error).stack ?? (e as Error).message}\n`);
    process.exit(2);
  });
