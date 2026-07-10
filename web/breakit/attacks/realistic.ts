// Realistic attacks (1–7): UI-only abuse — real clicks, spam, grind, refresh, multi-tab.
// Each PRODUCES artifacts; the oracle decides pass/fail.

import { join } from 'node:path';
import type { Browser } from 'playwright';
import type { Artifacts } from '../types';
import { attachRecorder } from '../browser';
import {
  runAttack, startSessionUi, readSeed, playRoundUi, captureDownload, captureDownloads,
  clickDownload, clickNewSession, type AttackCtx,
} from './helpers';

type Factory = (browser: Browser, baseUrl: string, runDir: string) => Promise<Artifacts>;

/** Click a labelled button N times synchronously within one frame (before React re-renders). */
async function sameTickClicks(ctx: AttackCtx, label: string, n: number): Promise<void> {
  await ctx.page.evaluate(
    ({ label, n }) => {
      const b = [...document.querySelectorAll('button')].find((x) => x.textContent === label);
      for (let i = 0; i < n; i++) b?.click();
    },
    { label, n },
  );
}

/** Stand out any live round, then play `extra` fresh rounds via the UI. */
async function settleAndPlay(ctx: AttackCtx, extra: number): Promise<void> {
  await playRoundUi(ctx.page); // stands out whatever is live and returns at resolution
  for (let i = 0; i < extra; i++) await playRoundUi(ctx.page);
}

// 1. Same-tick / parallel Deal clicks.
const dealSpam: Factory = (browser, baseUrl, runDir) =>
  runAttack({
    browser, baseUrl, name: '1-deal-spam', kind: 'realistic', downloadDir: join(runDir, '1-deal-spam'),
    body: async (ctx): Promise<Partial<Artifacts>> => {
      await startSessionUi(ctx.page);
      const onScreenSeed = await readSeed(ctx.page);
      await sameTickClicks(ctx, 'Deal', 6);
      await ctx.page.waitForTimeout(300);
      await settleAndPlay(ctx, 2);
      const jsonl = await captureDownload(ctx.page, () => clickDownload(ctx.page));
      const freshDealWorks = await playRoundUi(ctx.page);
      return { jsonl, onScreenSeed, freshDealWorks, repro: 'start → 6 same-tick Deal clicks → stand out → 2 rounds → download' };
    },
  });

// 2. Download-history spam (double/triple-click, same tick).
const downloadSpam: Factory = (browser, baseUrl, runDir) =>
  runAttack({
    browser, baseUrl, name: '2-download-spam', kind: 'realistic', downloadDir: join(runDir, '2-download-spam'),
    body: async (ctx): Promise<Partial<Artifacts>> => {
      await startSessionUi(ctx.page);
      await playRoundUi(ctx.page); // one resolved round now buffered awaiting flush
      const texts = await captureDownloads(ctx.page, () => sameTickClicks(ctx, 'Download history', 3));
      const [jsonl, ...extraJsonl] = texts.length ? texts : [''];
      const freshDealWorks = await playRoundUi(ctx.page);
      return { jsonl, extraJsonl, freshDealWorks, repro: 'start → 1 round (buffered) → 3 same-tick Download clicks' };
    },
  });

// 3. New-session spam, incl. New-session immediately after resolve without dealing (QA-007).
const newSessionSpam: Factory = (browser, baseUrl, runDir) =>
  runAttack({
    browser, baseUrl, name: '3-new-session-spam', kind: 'realistic', downloadDir: join(runDir, '3-new-session-spam'),
    body: async (ctx): Promise<Partial<Artifacts>> => {
      const seeds: string[] = [];
      await startSessionUi(ctx.page);
      seeds.push(await readSeed(ctx.page));
      await playRoundUi(ctx.page); // resolved round buffered — New session must flush it under the OLD id
      for (let i = 0; i < 3; i++) {
        await clickNewSession(ctx.page);
        await ctx.page.getByText(/Bankroll:/).waitFor({ timeout: 10000 });
        seeds.push(await readSeed(ctx.page));
      }
      const onScreenSeed = seeds[seeds.length - 1];
      const jsonl = await captureDownload(ctx.page, () => clickDownload(ctx.page));
      return { jsonl, seeds, onScreenSeed, repro: 'start → 1 round (buffered) → New session ×3 → download; assert flush order + seed changes' };
    },
  });

// 4. Interleave Deal + Download + New-session in one tight loop.
const interleave: Factory = (browser, baseUrl, runDir) =>
  runAttack({
    browser, baseUrl, name: '4-interleave', kind: 'realistic', downloadDir: join(runDir, '4-interleave'),
    body: async (ctx): Promise<Partial<Artifacts>> => {
      await startSessionUi(ctx.page);
      const collected: string[] = [];
      for (let i = 0; i < 4; i++) {
        await playRoundUi(ctx.page); // resolved round buffered
        // Same-tick Deal + Download race (the QA-003 sibling), capturing whatever downloads fire.
        const texts = await captureDownloads(ctx.page, async () => {
          await ctx.page.evaluate(() => {
            const buttons = [...document.querySelectorAll('button')];
            buttons.find((x) => x.textContent === 'Download history')?.click();
            buttons.find((x) => x.textContent === 'Deal')?.click();
          });
        });
        collected.push(...texts);
      }
      await clickNewSession(ctx.page);
      await ctx.page.getByText(/Bankroll:/).waitFor({ timeout: 10000 });
      const jsonl = await captureDownload(ctx.page, () => clickDownload(ctx.page));
      const freshDealWorks = await playRoundUi(ctx.page);
      return { jsonl, extraJsonl: collected, freshDealWorks, repro: 'loop×4: round → same-tick Deal+Download → New session → download' };
    },
  });

// 5. Long grind across a shoe reshuffle.
const grind: Factory = (browser, baseUrl, runDir) =>
  runAttack({
    browser, baseUrl, name: '5-grind', kind: 'realistic', downloadDir: join(runDir, '5-grind'), timeoutMs: 240000,
    body: async (ctx): Promise<Partial<Artifacts>> => {
      await startSessionUi(ctx.page);
      const onScreenSeed = await readSeed(ctx.page);
      let played = 0;
      for (let i = 0; i < 70; i++) {
        const ok = await playRoundUi(ctx.page);
        if (!ok) break;
        played++;
      }
      const jsonl = await captureDownload(ctx.page, () => clickDownload(ctx.page));
      const freshDealWorks = await playRoundUi(ctx.page);
      return { jsonl, onScreenSeed, freshDealWorks, repro: `grind ${played} rounds (targets ≥1 shoe reshuffle) → download` };
    },
  });

// 6. Refresh mid-write (reload right after a round buffers, before it is written).
const refreshMidWrite: Factory = (browser, baseUrl, runDir) =>
  runAttack({
    browser, baseUrl, name: '6-refresh-mid-write', kind: 'realistic', downloadDir: join(runDir, '6-refresh-mid-write'),
    body: async (ctx): Promise<Partial<Artifacts>> => {
      await startSessionUi(ctx.page);
      await playRoundUi(ctx.page); // round buffered but not yet written
      await ctx.page.reload({ waitUntil: 'domcontentloaded' }); // wipes in-memory session (QA-008 accepted)
      // The app must recover cleanly: a fresh session works end-to-end.
      await startSessionUi(ctx.page);
      const onScreenSeed = await readSeed(ctx.page);
      await playRoundUi(ctx.page);
      const jsonl = await captureDownload(ctx.page, () => clickDownload(ctx.page));
      const freshDealWorks = await playRoundUi(ctx.page);
      return { jsonl, onScreenSeed, freshDealWorks, repro: 'start → 1 round buffered → reload → fresh session plays cleanly (integrity of post-reload session)' };
    },
  });

// 7. Two tabs on the same origin acting concurrently.
const twoTabs: Factory = (browser, baseUrl, runDir) =>
  runAttack({
    browser, baseUrl, name: '7-two-tabs', kind: 'realistic', downloadDir: join(runDir, '7-two-tabs'),
    body: async (ctx): Promise<Partial<Artifacts>> => {
      const page2 = await ctx.context.newPage();
      attachRecorder(page2, ctx.rec);
      await page2.goto(ctx.baseUrl, { waitUntil: 'domcontentloaded' });
      await startSessionUi(ctx.page);
      await startSessionUi(page2);
      // Interleave activity across both tabs.
      for (let i = 0; i < 3; i++) {
        await Promise.all([playRoundUi(ctx.page), playRoundUi(page2)]);
      }
      const jsonl = await captureDownload(ctx.page, () => clickDownload(ctx.page));
      const jsonl2 = await captureDownload(page2, () => clickDownload(page2));
      await page2.close();
      return { jsonl, extraJsonl: [jsonl2], repro: 'two tabs start sessions and play 3 interleaved rounds each; each tab exports independently' };
    },
  });

export const realisticAttacks: Factory[] = [
  dealSpam, downloadSpam, newSessionSpam, interleave, grind, refreshMidWrite, twoTabs,
];
