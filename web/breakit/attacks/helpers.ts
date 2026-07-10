// Shared attack plumbing. Attacks drive the app and PRODUCE artifacts; they make no assertions.
// The oracle alone decides pass/fail.

import { readFileSync } from 'node:fs';
import type { Browser, BrowserContext, Download, Page } from 'playwright';
import { attachRecorder, newAttackContext, type Recorder } from '../browser';
import type { Artifacts, AttackKind } from '../types';

export interface AttackCtx {
  page: Page;
  context: BrowserContext;
  rec: Recorder;
  baseUrl: string;
}

const DEFAULT_TIMEOUT = 45000;

/**
 * Wrap one attack: fresh context + downloads dir, navigate, run the body under a timeout, and
 * fold crash/console/timeout/throw into the returned Artifacts. The body returns the
 * attack-specific fields (jsonl, seeds, …).
 */
export async function runAttack(opts: {
  browser: Browser;
  baseUrl: string;
  name: string;
  kind: AttackKind;
  downloadDir: string;
  timeoutMs?: number;
  body: (ctx: AttackCtx) => Promise<Partial<Artifacts>>;
}): Promise<Artifacts> {
  const { browser, baseUrl, name, kind, downloadDir, body } = opts;
  const timeoutMs = opts.timeoutMs ?? DEFAULT_TIMEOUT;
  const { context, rec } = await newAttackContext(browser, downloadDir);
  const page = await context.newPage();
  attachRecorder(page, rec);

  const base: Artifacts = { attack: name, kind, jsonl: '', console: rec.messages, timedOutMs: null };
  let timedOut = false;
  const timer = new Promise<'timeout'>((r) => setTimeout(() => { timedOut = true; r('timeout'); }, timeoutMs));

  try {
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    const result = await Promise.race([body({ page, context, rec, baseUrl }), timer]);
    if (result === 'timeout') {
      base.timedOutMs = timeoutMs;
    } else {
      Object.assign(base, result);
    }
  } catch (e) {
    base.error = (e as Error).message + ((e as Error).stack ? `\n${(e as Error).stack}` : '');
  } finally {
    base.crashed = rec.crashed;
    base.console = rec.messages;
    if (timedOut) base.timedOutMs = timeoutMs;
    await context.close().catch(() => {});
  }
  return base;
}

// --- UI helpers (realistic attacks: real clicks only) ---

const btn = (page: Page, name: string) => page.getByRole('button', { name, exact: true });

/** Navigate is done by runAttack; this clicks Start session and waits for the in-session view. */
export async function startSessionUi(page: Page): Promise<void> {
  await btn(page, 'Start session').click({ timeout: 15000 });
  await page.getByText(/Bankroll:/).waitFor({ timeout: 15000 });
}

export async function readSeed(page: Page): Promise<string> {
  const text = (await page.getByText(/Session seed:/).innerText()).trim();
  return text.replace(/^Session seed:\s*/, '');
}

export async function readBankroll(page: Page): Promise<number> {
  const text = (await page.getByText(/Bankroll:/).innerText()).trim();
  const m = text.match(/Bankroll:\s*\$([\d.]+)/);
  return m ? Math.round(parseFloat(m[1]!) * 100) : NaN;
}

const dealVisible = (page: Page) => btn(page, 'Deal').isVisible().catch(() => false);
const standVisible = (page: Page) => btn(page, 'Stand').isVisible().catch(() => false);

/** Deal one round via UI clicks and stand it out to resolution. Returns false if it got stuck. */
export async function playRoundUi(page: Page): Promise<boolean> {
  if (await dealVisible(page)) await btn(page, 'Deal').click().catch(() => {});
  for (let i = 0; i < 40; i++) {
    if (await standVisible(page)) {
      await btn(page, 'Stand').click().catch(() => {});
      continue;
    }
    if (await dealVisible(page)) return true; // resolved: Deal is back
    await page.waitForTimeout(30);
  }
  return dealVisible(page);
}

/** Capture the JSONL text from clicking Download history once. */
export async function captureDownload(page: Page, trigger: () => Promise<void>): Promise<string> {
  const [dl] = await Promise.all([page.waitForEvent('download', { timeout: 15000 }), trigger()]);
  return readDownload(dl);
}

async function readDownload(dl: Download): Promise<string> {
  const p = await dl.path();
  return p ? readFileSync(p, 'utf8') : '';
}

/** Collect every download that fires while `trigger` runs (download spam). */
export async function captureDownloads(page: Page, trigger: () => Promise<void>, settleMs = 800): Promise<string[]> {
  const downloads: Download[] = [];
  const handler = (dl: Download): void => { downloads.push(dl); };
  page.on('download', handler);
  await trigger();
  await page.waitForTimeout(settleMs);
  page.off('download', handler);
  return Promise.all(downloads.map(readDownload));
}

export const clickDownload = (page: Page) => btn(page, 'Download history').click({ timeout: 10000 });
export const clickNewSession = (page: Page) => btn(page, 'New session').click({ timeout: 10000 });
export const clickDeal = (page: Page) => btn(page, 'Deal').click({ timeout: 10000 });

// --- injected helpers (page.evaluate against window.__breakit) ---

/** Wait until the DEV hook has mounted. */
export async function waitForHook(page: Page): Promise<void> {
  await page.waitForFunction(() => Boolean((window as unknown as { __breakit?: unknown }).__breakit), null, {
    timeout: 15000,
  });
}
