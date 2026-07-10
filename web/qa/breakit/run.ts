// Breakit entrypoint: fail loudly on stale WASM → prove the prod build strips the hook → build +
// preview the instrumented bundle → launch chromium → run the attack battery → evaluate with the
// oracle → write the report → EXIT NON-ZERO on any break (milestone gating).

import { execSync } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { assertHookStrippedFromProdBuild, assertWasmFresh, startPreview } from '../lib/server';
import { launchBrowser, chromiumVersionOf } from '../lib/browser';
import { realisticAttacks } from './attacks/realistic';
import { injectedAttacks } from './attacks/injected';
import { evaluate } from './oracle';
import { buildReport, writeReport } from './report';
import type { Artifacts, AttackResult } from './types';

const WEB_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const REPO_ROOT = resolve(WEB_ROOT, '..');
const RUNS_ROOT = join(REPO_ROOT, 'journal', 'qa', 'runs');

function gitCommit(): string {
  try {
    return execSync('git rev-parse --short HEAD', { cwd: REPO_ROOT }).toString().trim();
  } catch {
    return 'unknown';
  }
}

function log(msg: string): void {
  process.stdout.write(`[breakit] ${msg}\n`);
}

async function main(): Promise<number> {
  const startedAt = new Date().toISOString();
  const dateStamp = startedAt.slice(0, 10);

  log('checking WASM freshness…');
  assertWasmFresh();

  log('asserting the __breakit hook is stripped from a normal production build…');
  const hookCheck = assertHookStrippedFromProdBuild();
  log(`  ${hookCheck.ok ? 'OK' : 'FAIL'}: ${hookCheck.detail}`);

  log('building instrumented bundle + starting vite preview…');
  const preview = await startPreview({ outDir: 'dist-breakit', port: 4319 });
  log(`  preview up at ${preview.baseUrl}`);

  const browser = await launchBrowser();
  const chromiumVersion = chromiumVersionOf(browser);
  log(`  chromium ${chromiumVersion}`);

  const runDir = mkdtempSync(join(tmpdir(), 'breakit-downloads-'));
  const results: AttackResult[] = [];

  try {
    const attacks = [...realisticAttacks, ...injectedAttacks];
    for (const attack of attacks) {
      const artifacts: Artifacts = await attack(browser, preview.baseUrl, runDir);
      const invariants = evaluate(artifacts);
      const passed = invariants.every((i) => i.passed);
      results.push({ attack: artifacts.attack, kind: artifacts.kind, passed, invariants, repro: artifacts.repro });
      const failed = invariants.filter((i) => !i.passed);
      log(`${passed ? 'PASS' : 'FAIL'}  ${artifacts.attack}${failed.length ? ` (${failed.length} broken)` : ''}`);
      for (const f of failed) log(`        ✗ ${f.name}${f.detail ? ` — ${f.detail}` : ''}`);
    }
  } finally {
    await browser.close().catch(() => {});
    await preview.stop().catch(() => {});
  }

  const finishedAt = new Date().toISOString();
  const report = buildReport(
    { startedAt, finishedAt, commit: gitCommit(), chromiumVersion, baseUrl: preview.baseUrl, prodHookAbsent: hookCheck.ok },
    results,
  );
  const written = writeReport(RUNS_ROOT, dateStamp, report);
  log(`report written: ${written.mdPath}`);
  log(`VERDICT: ${report.passed ? 'PASS' : 'FAIL'}`);
  return report.passed ? 0 : 1;
}

main()
  .then((code) => process.exit(code))
  .catch((e) => {
    process.stderr.write(`[breakit] fatal: ${(e as Error).stack ?? (e as Error).message}\n`);
    process.exit(2);
  });
