// Browser lifecycle. Owns Chromium / contexts / download dirs ONLY — knows nothing about
// invariants. Launches Playwright's bundled chromium via an explicit executablePath so we never
// depend on the broken Google-Chrome channel default (see memory env-playwright-mcp-broken).

import { chromium, type Browser, type BrowserContext, type ConsoleMessage as PwConsole, type Page } from 'playwright';
import { existsSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import type { ConsoleMessage } from './types';

function findChromium(): string | undefined {
  const candidates = [
    join(homedir(), '.cache/ms-playwright/chromium-1228/chrome-linux64/chrome'),
    join(homedir(), '.cache/ms-playwright/chromium-1223/chrome-linux64/chrome'),
    '/usr/bin/chromium',
  ];
  return candidates.find((p) => existsSync(p));
}

export async function launchBrowser(): Promise<Browser> {
  const executablePath = findChromium();
  return chromium.launch({ headless: true, executablePath });
}

export interface Recorder {
  messages: ConsoleMessage[];
  crashed: boolean;
}

/** Record console/pageerror/crash from a page onto the recorder. Safe to call once per page. */
export function attachRecorder(page: Page, rec: Recorder): void {
  page.on('console', (m: PwConsole) => rec.messages.push({ type: m.type(), text: m.text() }));
  page.on('pageerror', (e) => rec.messages.push({ type: 'error', text: `pageerror: ${e.message}` }));
  page.on('crash', () => {
    rec.crashed = true;
  });
}

/**
 * A fresh context per attack with its own downloads dir so JSONL artifacts never collide.
 * A favicon route is stubbed so a 404 doesn't masquerade as a console error. Extra tabs opened
 * later are auto-recorded via the context 'page' event; the main page is attached explicitly by
 * the caller (newPage() does not reliably emit that event).
 */
export async function newAttackContext(
  browser: Browser,
  downloadDir: string,
): Promise<{ context: BrowserContext; rec: Recorder }> {
  mkdirSync(downloadDir, { recursive: true });
  const context = await browser.newContext({ acceptDownloads: true });
  await context.route('**/favicon.ico', (route) => route.fulfill({ status: 200, body: '' }));

  const rec: Recorder = { messages: [], crashed: false };
  context.on('page', (page) => attachRecorder(page, rec));
  return { context, rec };
}

export const chromiumVersionOf = (browser: Browser): string => browser.version();
