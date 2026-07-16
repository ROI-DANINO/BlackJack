import { spawn, type ChildProcess } from 'node:child_process';
import { execFile } from 'node:child_process';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import {
  chromium,
  firefox,
  webkit,
  type BrowserContext,
  type BrowserType,
} from 'playwright';
import type {
  BrowserId,
  BrowserSuiteResult,
  CandidateBrowserResult,
  CandidateId,
  GateResult,
  ResearchResultFile,
} from './src/contract';
import { GATE_NAMES } from './src/contract';

const execFileAsync = promisify(execFile);
const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const WEB_ROOT = resolve(CURRENT_DIR, '../..');
const REPO_ROOT = resolve(WEB_ROOT, '..');
const HARNESS_URL = 'http://127.0.0.1:4185/research/browser-storage/';
const RESULT_PATH = resolve(
  REPO_ROOT,
  'docs/superpowers/specs/evidence/2026-07-16-browser-storage/results.json',
);
const VALID_CANDIDATES: CandidateId[] = ['memory', 'local-storage', 'native-indexeddb', 'idb', 'dexie'];

type CliOptions = { candidate?: CandidateId; correctnessOnly: boolean };

function usageError(message: string): never {
  console.error(message);
  process.exit(2);
}

function parseArgs(args: string[]): CliOptions {
  const options: CliOptions = { correctnessOnly: false };
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === '--correctness-only') {
      options.correctnessOnly = true;
      continue;
    }
    if (argument === '--candidate') {
      const value = args[index + 1];
      if (value === undefined || !VALID_CANDIDATES.includes(value as CandidateId)) {
        usageError(`unknown candidate: ${value ?? '<missing>'}`);
      }
      options.candidate = value as CandidateId;
      index += 1;
      continue;
    }
    usageError(`unknown flag: ${argument}`);
  }
  return options;
}

async function waitForServer(url: string, child: ChildProcess): Promise<void> {
  const deadline = Date.now() + 30_000;
  let lastError = 'server did not respond';
  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error(`Vite exited early with code ${child.exitCode}`);
    try {
      const response = await fetch(url);
      if (response.ok) return;
      lastError = `HTTP ${response.status}`;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 100));
  }
  throw new Error(`Vite did not become ready: ${lastError}`);
}

async function stopChild(child: ChildProcess): Promise<void> {
  if (child.exitCode !== null || child.signalCode !== null) return;
  child.kill('SIGTERM');
  await Promise.race([
    new Promise<void>((resolveExit) => child.once('exit', () => resolveExit())),
    new Promise<void>((resolveWait) => setTimeout(resolveWait, 5_000)),
  ]);
  if (child.exitCode === null && child.signalCode === null) {
    child.kill('SIGKILL');
    await new Promise<void>((resolveExit) => child.once('exit', () => resolveExit()));
  }
}

async function packageVersion(packageJsonPath: string): Promise<string> {
  const parsed = JSON.parse(await readFile(packageJsonPath, 'utf8')) as { version: string };
  return parsed.version;
}

async function gitCommit(): Promise<string> {
  const { stdout } = await execFileAsync('git', ['rev-parse', 'HEAD'], { cwd: REPO_ROOT });
  return stdout.trim();
}

function queryFor(options: CliOptions, mode?: string): string {
  const query = new URLSearchParams();
  if (options.candidate !== undefined) query.set('candidate', options.candidate);
  if (options.correctnessOnly) query.set('correctnessOnly', '1');
  if (mode !== undefined) query.set('mode', mode);
  const serialized = query.toString();
  return serialized.length === 0 ? HARNESS_URL : `${HARNESS_URL}?${serialized}`;
}

async function evaluateHarnessPage(
  context: BrowserContext,
  url: string,
  barrier?: () => Promise<void>,
): Promise<BrowserSuiteResult> {
  const page = await context.newPage();
  try {
    await page.goto(url);
    if (barrier !== undefined) await page.exposeFunction('__researchConcurrencyBarrier', barrier);
    await page.waitForFunction(() => typeof window.__runBrowserStorageResearch === 'function');
    return await page.evaluate(() => window.__runBrowserStorageResearch());
  } finally {
    await page.close().catch(() => undefined);
  }
}

function onlyGate(result: BrowserSuiteResult): GateResult {
  const candidate = result.candidates[0];
  const gate = candidate?.gates[0];
  if (result.candidates.length !== 1 || candidate?.gates.length !== 1 || gate === undefined) {
    throw new Error('probe returned an invalid result shape');
  }
  return gate;
}

function onlyCandidate(result: BrowserSuiteResult): BrowserSuiteResult['candidates'][number] {
  const candidate = result.candidates[0];
  if (result.candidates.length !== 1 || candidate === undefined) {
    throw new Error('probe returned an invalid candidate shape');
  }
  return candidate;
}

async function orchestrateReload(
  context: BrowserContext,
  options: CliOptions,
  candidate: CandidateId,
): Promise<GateResult> {
  const writer = onlyGate(await evaluateHarnessPage(
    context,
    queryFor({ ...options, candidate }, 'reload-write'),
  ));
  const reader = onlyGate(await evaluateHarnessPage(
    context,
    queryFor({ ...options, candidate }, 'reload-read'),
  ));
  return {
    gate: 'reload-round-trip',
    passed: writer.passed && reader.passed,
    evidenceKind: 'OBSERVED',
    detail: writer.passed ? reader.detail : `writer failed: ${writer.detail}`,
  };
}

async function orchestrateConcurrency(
  context: BrowserContext,
  options: CliOptions,
  candidate: CandidateId,
): Promise<GateResult> {
  let ready = 0;
  let release: (() => void) | undefined;
  const released = new Promise<void>((resolveRelease) => { release = resolveRelease; });
  const timeout = setTimeout(() => release?.(), 5_000);
  const barrier = async (): Promise<void> => {
    ready += 1;
    if (ready === 2) release?.();
    await released;
  };
  try {
    const [leftResult, rightResult] = await Promise.all([
      evaluateHarnessPage(context, queryFor({ ...options, candidate }, 'concurrent-a'), barrier),
      evaluateHarnessPage(context, queryFor({ ...options, candidate }, 'concurrent-b'), barrier),
    ]);
    const gates = [onlyGate(leftResult), onlyGate(rightResult)];
    const outcomes = gates.map((gate) => gate.detail).sort();
    const passed = gates.every((gate) => gate.passed)
      && outcomes[0] === 'outcome:revision-conflict'
      && outcomes[1] === 'outcome:winner';
    return {
      gate: 'concurrent-writers',
      passed,
      evidenceKind: 'OBSERVED',
      detail: passed ? 'two real pages produced exactly one winner' : outcomes.join(' | '),
    };
  } finally {
    clearTimeout(timeout);
  }
}

function replaceGate(
  candidate: Omit<CandidateBrowserResult, 'browser'>,
  replacement: GateResult,
): void {
  candidate.gates = candidate.gates.filter((gate) => gate.gate !== replacement.gate);
  candidate.gates.push(replacement);
}

async function runEngine(
  id: BrowserId,
  browserType: BrowserType,
  options: CliOptions,
): Promise<{
  browser: { id: BrowserId; version: string; userAgent: string };
  runs: CandidateBrowserResult[];
}> {
  const browser = await browserType.launch({ headless: true });
  try {
    const context = await browser.newContext();
    try {
      const metadataPage = await context.newPage();
      let userAgent: string;
      let result: BrowserSuiteResult;
      try {
        await metadataPage.goto(queryFor(options));
        await metadataPage.waitForFunction(() => typeof window.__runBrowserStorageResearch === 'function');
        userAgent = await metadataPage.evaluate(() => navigator.userAgent);
        result = await metadataPage.evaluate(() => window.__runBrowserStorageResearch());
      } finally {
        await metadataPage.close().catch(() => undefined);
      }
      for (const candidate of result.candidates) {
        replaceGate(candidate, await orchestrateReload(context, options, candidate.candidate));
        replaceGate(candidate, await orchestrateConcurrency(context, options, candidate.candidate));
        const correctnessPassed = candidate.gates.every((gate) => gate.passed);
        if (correctnessPassed && !options.correctnessOnly) {
          const measurement = onlyCandidate(await evaluateHarnessPage(
            context,
            queryFor({ ...options, candidate: candidate.candidate }, 'measurement'),
          ));
          if (measurement.gates.length !== 0 || measurement.timings.length !== 15) {
            throw new Error(`measurement matrix mismatch: ${candidate.candidate}`);
          }
          candidate.timings = measurement.timings;
          candidate.fixtureBytes = measurement.fixtureBytes;
          candidate.exportBytes = measurement.exportBytes;
        }
      }
      return {
        browser: { id, version: browser.version(), userAgent },
        runs: result.candidates.map((candidate) => ({ ...candidate, browser: id })),
      };
    } finally {
      await context.close().catch(() => undefined);
    }
  } finally {
    await browser.close().catch(() => undefined);
  }
}

function sortResult(result: ResearchResultFile): ResearchResultFile {
  const workloadOrder = { small: 0, medium: 1, stress: 2 } as const;
  const operationOrder = { open: 0, load: 1, commit: 2, export: 3, reset: 4 } as const;
  result.browsers.sort((left, right) => left.id.localeCompare(right.id));
  result.candidates.sort((left, right) => left.id.localeCompare(right.id));
  result.runs.sort((left, right) =>
    left.browser.localeCompare(right.browser) || left.candidate.localeCompare(right.candidate));
  for (const run of result.runs) {
    run.gates.sort((left, right) => left.gate.localeCompare(right.gate));
    run.timings.sort((left, right) =>
      workloadOrder[left.workload] - workloadOrder[right.workload]
      || operationOrder[left.operation] - operationOrder[right.operation]);
  }
  return result;
}

async function writeResult(result: ResearchResultFile): Promise<void> {
  await mkdir(dirname(RESULT_PATH), { recursive: true });
  const temporary = `${RESULT_PATH}.tmp`;
  await writeFile(temporary, `${JSON.stringify(sortResult(result), null, 2)}\n`, 'utf8');
  await rename(temporary, RESULT_PATH);
}

function validateMatrix(result: ResearchResultFile): void {
  const expectedBrowsers: BrowserId[] = ['chromium', 'firefox', 'webkit'];
  const expectedCandidates = result.candidates.map((candidate) => candidate.id).sort();
  const actualBrowsers = result.browsers.map((browser) => browser.id).sort();
  if (JSON.stringify(actualBrowsers) !== JSON.stringify(expectedBrowsers)) {
    throw new Error(`browser matrix mismatch: ${actualBrowsers.join(',')}`);
  }

  const seenPairs = new Set<string>();
  const expectedGates = [...GATE_NAMES].sort();
  for (const run of result.runs) {
    const pair = `${run.browser}/${run.candidate}`;
    if (seenPairs.has(pair)) throw new Error(`duplicate matrix row: ${pair}`);
    seenPairs.add(pair);
    const gates = run.gates.map((gate) => gate.gate).sort();
    if (new Set(gates).size !== GATE_NAMES.length || JSON.stringify(gates) !== JSON.stringify(expectedGates)) {
      throw new Error(`gate matrix mismatch: ${pair}`);
    }
  }

  const expectedPairs = expectedBrowsers.flatMap((browser) =>
    expectedCandidates.map((candidate) => `${browser}/${candidate}`)).sort();
  if (JSON.stringify([...seenPairs].sort()) !== JSON.stringify(expectedPairs)) {
    throw new Error('browser/candidate matrix has missing rows');
  }
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  const vite = spawn(
    resolve(WEB_ROOT, 'node_modules/.bin/vite'),
    ['--base', '/', '--host', '127.0.0.1', '--port', '4185', '--strictPort'],
    { cwd: WEB_ROOT, stdio: ['ignore', 'pipe', 'pipe'] },
  );
  let viteOutput = '';
  vite.stdout?.on('data', (chunk: Buffer) => { viteOutput += chunk.toString(); });
  vite.stderr?.on('data', (chunk: Buffer) => { viteOutput += chunk.toString(); });

  try {
    await waitForServer(HARNESS_URL, vite);
    const engines: Array<[BrowserId, BrowserType]> = [
      ['chromium', chromium],
      ['firefox', firefox],
      ['webkit', webkit],
    ];
    const browserRecords: ResearchResultFile['browsers'] = [];
    const runs: CandidateBrowserResult[] = [];
    for (const [id, browserType] of engines) {
      const engineResult = await runEngine(id, browserType, options);
      browserRecords.push(engineResult.browser);
      runs.push(...engineResult.runs);
    }

    const selectedCandidates = options.candidate === undefined ? VALID_CANDIDATES : [options.candidate];
    const idbVersion = await packageVersion(resolve(CURRENT_DIR, 'node_modules/idb/package.json'));
    const dexieVersion = await packageVersion(resolve(CURRENT_DIR, 'node_modules/dexie/package.json'));
    if (idbVersion !== '8.0.3' || dexieVersion !== '4.4.4') {
      throw new Error(`wrapper pin mismatch: idb=${idbVersion} dexie=${dexieVersion}`);
    }
    const result: ResearchResultFile = {
      schemaVersion: 1,
      generatedAtUtc: new Date().toISOString(),
      commit: await gitCommit(),
      nodeVersion: process.version,
      packages: {
        idb: idbVersion,
        dexie: dexieVersion,
        playwright: await packageVersion(resolve(WEB_ROOT, 'node_modules/playwright/package.json')),
      },
      browsers: browserRecords,
      candidates: selectedCandidates.map((id) => ({
        id,
        role: id === 'memory' || id === 'local-storage' ? 'baseline' : 'full-benchmark',
      })),
      runs,
    };
    validateMatrix(result);
    await writeResult(result);

    const failures = runs.flatMap((run) =>
      run.gates.filter((gate) => !gate.passed).map((gate) => `${run.browser}/${run.candidate}/${gate.gate}: ${gate.detail}`));
    for (const failure of failures) console.error(`FAIL ${failure}`);
    const fullCandidateFailure = runs.some((run) =>
      run.candidate !== 'memory'
      && run.candidate !== 'local-storage'
      && run.gates.some((gate) => !gate.passed));
    if (fullCandidateFailure) process.exitCode = 1;
  } catch (error) {
    if (viteOutput.trim().length > 0) console.error(viteOutput.trim());
    throw error;
  } finally {
    await stopChild(vite);
  }
}

await main();
