// Rules & Payout Fidelity runner (qa:rules). Drives a scripted basic-strategy-ish session (or a
// few) via window.__breakit until the situation checklist is each seen ≥2×, INDEPENDENTLY
// re-derives dealer H17 / payouts / split-eligibility per round, cross-checks engine state ↔ JSONL,
// runs the shared integrity invariants, writes runs/<date>-rules/report.{md,json}, and exits
// NON-ZERO on any violation. Coverage gaps are reported, never ground out.

import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { assertWasmFresh, startPreview } from '../lib/server';
import { launchBrowser, chromiumVersionOf, attachRecorder, type Recorder } from '../lib/browser';
import { Driver, CoverageTracker, playRoundTraced, type RoundTrace } from '../lib/driver';
import { checkCards, checkConsole, checkHistory, checkMoney, checkSessionFlush } from '../lib/invariants';
import { isRound, readLog } from '../lib/jsonl';
import { writeRoleReport } from '../lib/report';
import type { Invariant, RoleReport, RoundLine } from '../lib/types';
import { checkRound } from './checks';

const WEB_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const REPO_ROOT = resolve(WEB_ROOT, '..');
const RUNS_ROOT = join(REPO_ROOT, 'journal', 'qa', 'runs');
const SPEC_LINK = 'docs/specs/2026-07-10-qa-script-suite.md';

const START_BANKROLL = 100000;
const DEFAULT_BET = 2000;
// A long first session guarantees ≥2 shoe reshuffles; extra fixed seeds mop up any rare situation.
const SESSIONS: Array<{ seed: string; maxRounds: number }> = [
  { seed: 'qa-rules-alpha', maxRounds: 140 },
  { seed: 'qa-rules-bravo', maxRounds: 90 },
  { seed: 'qa-rules-charlie', maxRounds: 90 },
];

function gitCommit(): string {
  try {
    return execSync('git rev-parse --short HEAD', { cwd: REPO_ROOT }).toString().trim();
  } catch {
    return 'unknown';
  }
}

function log(msg: string): void {
  process.stdout.write(`[qa:rules] ${msg}\n`);
}

interface SessionTraces {
  seed: string;
  traces: RoundTrace[];
}

/** Group JSONL rounds into per-session blocks in file order (mirrors the play order). */
function sessionBlocks(records: RoundLine[]): RoundLine[][] {
  const blocks: RoundLine[][] = [];
  let currentSid: string | null = null;
  for (const r of records) {
    if (r.session_id !== currentSid) {
      blocks.push([]);
      currentSid = r.session_id;
    }
    blocks[blocks.length - 1]!.push(r);
  }
  return blocks;
}

async function main(): Promise<number> {
  const startedAt = new Date().toISOString();
  const dateStamp = startedAt.slice(0, 10);

  log('checking WASM freshness…');
  assertWasmFresh();

  log('building instrumented bundle + starting vite preview…');
  const preview = await startPreview({ outDir: 'dist-qa-rules', port: 4320 });
  log(`  preview up at ${preview.baseUrl}`);

  const browser = await launchBrowser();
  const chromiumVersion = chromiumVersionOf(browser);
  log(`  chromium ${chromiumVersion}`);

  const context = await browser.newContext();
  await context.route('**/favicon.ico', (route) => route.fulfill({ status: 200, body: '' }));
  const rec: Recorder = { messages: [], crashed: false };
  const page = await context.newPage();
  attachRecorder(page, rec);

  const tracker = new CoverageTracker();
  const sessions: SessionTraces[] = [];
  let jsonl = '';

  try {
    await page.goto(preview.baseUrl, { waitUntil: 'domcontentloaded' });
    const driver = new Driver(page);
    await driver.waitForHook();

    for (const plan of SESSIONS) {
      await driver.startSession(plan.seed, START_BANKROLL, DEFAULT_BET);
      const traces: RoundTrace[] = [];
      for (let i = 0; i < plan.maxRounds; i++) {
        const trace = await playRoundTraced(driver, i);
        tracker.recordTrace(trace);
        traces.push(trace);
        if (tracker.met(2) && i >= 30) break; // keep going long enough for reshuffles, then stop when covered
      }
      sessions.push({ seed: plan.seed, traces });
      log(`  session ${plan.seed}: ${traces.length} rounds (coverage met: ${tracker.met(2)})`);
      if (tracker.met(2)) break;
    }

    jsonl = await driver.downloadText();
  } finally {
    await browser.close().catch(() => {});
    await preview.stop().catch(() => {});
  }

  // --- evaluate ---
  const invariants: Invariant[] = [];
  const { records, errors, headers, rounds } = readLog(jsonl);

  invariants.push({
    name: 'jsonl: well-formed (one valid record per line)',
    passed: errors.length === 0,
    detail: errors.length ? errors.slice(0, 5).join('; ') : undefined,
  });
  invariants.push(...checkHistory(records));
  invariants.push(checkSessionFlush(records));
  invariants.push(checkMoney(records));
  invariants.push(checkCards(records));
  invariants.push(checkConsole(rec.messages));

  const blocks = sessionBlocks(rounds.filter(isRound));
  // Seed integrity: each played session's header seed must equal what we asked for.
  sessions.forEach((s, i) => {
    const header = headers[i];
    const ok = !!header && header.seed === s.seed;
    invariants.push({
      name: `seed integrity: session ${i} header seed matches requested`,
      passed: ok,
      detail: ok ? undefined : `requested ${s.seed}, header ${header?.seed ?? '(missing)'}`,
    });
  });

  // Per-round independent re-derivation, matched to the JSONL round by (session block, round_index).
  let roundsChecked = 0;
  sessions.forEach((s, si) => {
    const block = blocks[si] ?? [];
    const byIndex = new Map<number, RoundLine>(block.map((r) => [r.round_index, r]));
    const payout = block[0]?.ruleset.blackjack_payout ?? 1.5;
    for (const trace of s.traces) {
      invariants.push(...checkRound(trace, byIndex.get(trace.roundIndex), payout));
      roundsChecked++;
    }
  });

  const coverage = tracker.summary(2);
  const gaps = coverage.filter((c) => !c.met);
  const failed = invariants.filter((i) => !i.passed);
  const passed = failed.length === 0;

  // --- report ---
  const body = renderBody(coverage, roundsChecked, gaps.length, invariants);
  const finishedAt = new Date().toISOString();
  const report: RoleReport = {
    role: 'rules', specLink: SPEC_LINK, title: 'Rules & Payout Fidelity — QA script run',
    startedAt, finishedAt, commit: gitCommit(), chromiumVersion, baseUrl: preview.baseUrl, passed,
    headerRows: [
      ['Rounds re-derived', String(roundsChecked)],
      ['Situations covered (≥2×)', `${coverage.length - gaps.length}/${coverage.length}`],
      ['Coverage gaps', gaps.length ? gaps.map((g) => g.label).join(', ') : 'none'],
      ['Violations', String(failed.length)],
    ],
    body,
    json: { passed, roundsChecked, coverage, violations: failed },
  };
  const written = writeRoleReport(RUNS_ROOT, dateStamp, report);

  log('coverage summary:');
  for (const c of coverage) log(`  ${c.met ? '✓' : '·'} ${c.label}: ${c.count}`);
  log(`rounds re-derived: ${roundsChecked}; coverage gaps: ${gaps.length}; violations: ${failed.length}`);
  for (const f of failed.slice(0, 20)) log(`  ✗ ${f.name}${f.detail ? ` — ${f.detail}` : ''}`);
  log(`report written: ${written.mdPath}`);
  log(`VERDICT: ${passed ? 'PASS' : 'FAIL'}`);
  return passed ? 0 : 1;
}

function renderBody(
  coverage: ReturnType<CoverageTracker['summary']>,
  roundsChecked: number,
  gaps: number,
  invariants: Invariant[],
): string {
  const tick = (b: boolean) => (b ? 'PASS' : 'FAIL');
  const lines: string[] = [];
  lines.push('## Situation coverage');
  lines.push('');
  lines.push('| Situation | Count | ≥2× |');
  lines.push('|---|---|---|');
  for (const c of coverage) lines.push(`| ${c.label} | ${c.count} | ${c.met ? 'yes' : 'GAP'} |`);
  lines.push('');
  lines.push(`Coverage gaps are reported, not failed: an unreachable situation on the deterministic shoe is expected. Gaps this run: ${gaps}.`);
  lines.push('');
  lines.push('## Checks');
  lines.push('');
  lines.push(`- Rounds independently re-derived (H17 + payout + split-eligibility): **${roundsChecked}**`);
  lines.push(`- Total assertions: **${invariants.length}**, failures: **${invariants.filter((i) => !i.passed).length}**`);
  lines.push('');
  const failed = invariants.filter((i) => !i.passed);
  if (failed.length) {
    lines.push('### Violations');
    lines.push('');
    for (const f of failed) lines.push(`- ${tick(false)} — ${f.name}${f.detail ? ` — ${f.detail}` : ''}`);
  } else {
    lines.push('### Violations');
    lines.push('');
    lines.push('None — every re-derivation matched the engine and the JSONL.');
  }
  lines.push('');
  return lines.join('\n');
}

main()
  .then((code) => process.exit(code))
  .catch((e) => {
    process.stderr.write(`[qa:rules] fatal: ${(e as Error).stack ?? (e as Error).message}\n`);
    process.exit(2);
  });
