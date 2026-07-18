// qa:progress — run the 14 provider-neutral ProgressStore gates (design §11) against the REAL
// `idb` adapter in real browsers under Playwright. Chromium AND Firefox; expected 28/28
// (14 gates × 2 browsers) pass, 0 failures. Exits non-zero on ANY gate `fail`.
//
// WHY A BROWSER RUNNER. `web`'s Vitest environment is `node` (NOT jsdom) — no IndexedDB, no DOM —
// so the adapter cannot be gated under Vitest at all. This role builds `harness.ts` (the idb
// ContractSubject + the 14 gates as host-neutral data) with `vite build`, serves it over a REAL
// http origin (an opaque origin denies IndexedDB, so about:blank will not do), and drives it.
//
// GATE 7, TWO SHAPES (Option A). The in-page gate 7 races two `open()` connections in ONE page and
// stays uniform ProgressGate data. This runner ALSO drives a SEPARATE two-PAGE race on the same
// origin with NO runner-side mutex — two real pages, distinct attempts — recorded as additional
// multi-tab evidence, not as gate 7 itself.
//
// WEBKIT (plan Step 5). The host's Playwright WebKit targets Ubuntu libraries and cannot launch on
// this CachyOS/Arch ABI; recorded as an explicit coverage GAP in the report (not papered over).
// AL-R2 already proved idb 14/14 in WebKit via the pinned container; that path stays available.
//
// ADDITIVE-BY-DESIGN. Task 10 extends this runner with a measurement pass and Task 11 finalises
// report.md — the report JSON keys its browser rows and its two-page-race block separately from any
// future `measurements`, and the markdown sections are self-contained, so an additive pass fits
// without rewriting what is here.
//
// TASK 10 — SERIALIZED ENVELOPE BYTES (design §10). A MEASUREMENT pass, not a gate: the 14-gate
// table (design §11) stays the sole pass/fail authority (design-erratum ruling — byte tiers are
// measured, never gated, so no byte value may flip `passed`/the matrix/the exit code). Hosted in
// CHROMIUM ONLY (not duplicated in Firefox): `canonicalize()`'s output and idb's on-disk shape are
// provider-neutral to the design, this is a coarse cost measurement rather than a per-gate
// conformance matrix requiring cross-engine parity, and 10,000 sequential `appendAttempt` writes in
// a second real engine would roughly double this run's wall time for no additional evidence. A
// measurement failure (an unexpected append/export outcome) throws and fails the RUN loudly via the
// existing fatal-error path (`main().catch` → exit 2) — a DIFFERENT exit path from a gate failure
// (exit 1), so it never touches the matrix accounting either.

import { build } from 'vite';
import { chromium, firefox, type Browser, type BrowserContext, type Page } from 'playwright';
import { createServer, type Server } from 'node:http';
import { createReadStream, existsSync, mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { homedir, tmpdir } from 'node:os';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const WEB_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const REPO_ROOT = resolve(WEB_ROOT, '..');
const HARNESS_ENTRY = join(WEB_ROOT, 'qa', 'progress', 'harness.ts');
const REPORT_DIR = join(REPO_ROOT, 'journal', 'qa', 'runs', '2026-07-17-progressstore-cycle1');
const SPEC_LINK = 'docs/superpowers/specs/2026-07-17-progressstore-cycle1-design.md';
const PLAN_LINK = 'docs/superpowers/plans/2026-07-17-progressstore-cycle1.md';
const PORT = 4337;
const EXPECTED_GATES = 14;
const MEASUREMENT_TIERS = [20, 1000, 10000] as const;

type GateStatus = 'pass' | 'fail' | 'declared-unsupported';
type GateResult = { id: string; status: GateStatus; detail?: string };

interface TierMeasurement {
  tier: number;
  attempts: number;
  canonicalBytes: number;
  bytesPerAttempt: number;
  estimateBefore: number | null;
  estimateAfter: number | null;
  estimateDeltaBytes: number | null;
  note?: string;
}

interface RaceEvidence {
  ok: boolean;
  detail: string;
  a: { status: string; revision: number | null; attemptId: string };
  b: { status: string; revision: number | null; attemptId: string };
  readback: { attemptCount: number; revision: number | null; attemptIds: string[] };
}

interface BrowserRun {
  name: string;
  version: string;
  results: GateResult[];
  race: RaceEvidence;
  consoleErrors: string[];
  launchError?: string;
  measurements?: TierMeasurement[]; // Task 10 — only the browser passed `measure:true` populates this
}

function log(msg: string): void {
  process.stdout.write(`[qa:progress] ${msg}\n`);
}

function gitCommit(): string {
  try {
    return execSync('git rev-parse --short HEAD', { cwd: REPO_ROOT }).toString().trim();
  } catch {
    return 'unknown';
  }
}

// === Build the harness bundle =================================================================

async function buildHarness(outDir: string): Promise<void> {
  await build({
    configFile: false,
    root: WEB_ROOT,
    logLevel: 'warn',
    build: {
      outDir,
      emptyOutDir: true,
      minify: false,
      target: 'esnext',
      lib: { entry: HARNESS_ENTRY, formats: ['es'], fileName: () => 'harness.js' },
      // In lib mode Vite externalises package.json `dependencies` (which includes `idb`) by default.
      // Force EVERYTHING to bundle so the served page is self-contained and the browser never has to
      // resolve a bare 'idb' specifier.
      rollupOptions: { external: [] },
    },
  });
  const html = [
    '<!doctype html>',
    '<html lang="en"><head><meta charset="utf-8"><title>progress gates</title></head>',
    '<body><script type="module" src="./harness.js"></script></body></html>',
    '',
  ].join('\n');
  // Written AFTER the build (emptyOutDir would otherwise wipe it).
  writeFileSync(join(outDir, 'index.html'), html);
}

// === Static server (a real http origin) =======================================================

const CONTENT_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
};

function startServer(rootDir: string): Promise<{ baseUrl: string; server: Server }> {
  const server = createServer((req, res) => {
    const url = (req.url ?? '/').split('?')[0] ?? '/';
    if (url === '/favicon.ico') {
      res.writeHead(204);
      res.end();
      return;
    }
    const rel = url === '/' ? 'index.html' : url.replace(/^\/+/, '');
    const filePath = join(rootDir, rel);
    if (!filePath.startsWith(rootDir) || !existsSync(filePath)) {
      res.writeHead(404);
      res.end('not found');
      return;
    }
    res.writeHead(200, { 'content-type': CONTENT_TYPES[extname(filePath)] ?? 'application/octet-stream' });
    createReadStream(filePath).pipe(res);
  });
  return new Promise((resolveServer) => {
    server.listen(PORT, '127.0.0.1', () => resolveServer({ baseUrl: `http://127.0.0.1:${PORT}/`, server }));
  });
}

// === Browser launchers ========================================================================

function findChromium(): string | undefined {
  const candidates = [
    join(homedir(), '.cache/ms-playwright/chromium-1228/chrome-linux64/chrome'),
    join(homedir(), '.cache/ms-playwright/chromium-1223/chrome-linux64/chrome'),
    '/usr/bin/chromium',
  ];
  return candidates.find((p) => existsSync(p));
}

async function launchChromium(): Promise<Browser> {
  return chromium.launch({ headless: true, executablePath: findChromium() });
}

async function launchFirefox(): Promise<Browser> {
  // Playwright's bundled Firefox resolves automatically (no channel default to avoid, unlike Chrome).
  return firefox.launch({ headless: true });
}

// === Drive one browser ========================================================================

async function driveBrowser(
  name: string,
  launch: () => Promise<Browser>,
  baseUrl: string,
  measure: boolean,
): Promise<BrowserRun> {
  const consoleErrors: string[] = [];
  let browser: Browser | undefined;
  try {
    browser = await launch();
  } catch (error) {
    return {
      name,
      version: 'unavailable',
      results: [],
      race: emptyRace(`${name} failed to launch`),
      consoleErrors,
      launchError: (error as Error).message,
    };
  }
  const version = browser.version();
  const context: BrowserContext = await browser.newContext();
  const attach = (page: Page): void => {
    page.on('pageerror', (e) => consoleErrors.push(`pageerror: ${e.message}`));
    page.on('console', (m) => {
      if (m.type() === 'error') consoleErrors.push(`console.error: ${m.text()}`);
    });
  };

  try {
    const gatePage = await context.newPage();
    attach(gatePage);
    await gatePage.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await gatePage.waitForFunction(() => typeof window.__runProgressGates === 'function', undefined, { timeout: 30000 });
    const results = (await gatePage.evaluate(() => window.__runProgressGates())) as GateResult[];

    // Two-page race (Option A additional evidence). Two REAL pages, same origin, no runner mutex.
    const page1 = await context.newPage();
    const page2 = await context.newPage();
    attach(page1);
    attach(page2);
    await page1.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await page2.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await page1.waitForFunction(() => typeof window.__raceAppend === 'function', undefined, { timeout: 30000 });
    await page2.waitForFunction(() => typeof window.__raceAppend === 'function', undefined, { timeout: 30000 });
    await page1.evaluate(() => window.__raceReset());
    const [a, b] = await Promise.all([
      page1.evaluate(() => window.__raceAppend(1)),
      page2.evaluate(() => window.__raceAppend(2)),
    ]);
    const readback = await page1.evaluate(() => window.__raceReadback());
    const race = judgeRace(a, b, readback);

    // Task 10 — serialized envelope byte measurement (design §10), hosted in this browser only when
    // `measure` is set (see the Task 10 comment at the top of this file for why chromium-only). A
    // fresh page, same origin — never shares a page with the gates or the race, so nothing here can
    // perturb their evidence.
    let measurements: TierMeasurement[] | undefined;
    if (measure) {
      const measurePage = await context.newPage();
      attach(measurePage);
      await measurePage.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await measurePage.waitForFunction(() => typeof window.__measureEnvelopeBytes === 'function', undefined, { timeout: 30000 });
      measurements = (await measurePage.evaluate(
        (tiers) => window.__measureEnvelopeBytes([...tiers]),
        MEASUREMENT_TIERS,
      )) as TierMeasurement[];
    }

    return { name, version, results, race, consoleErrors, measurements };
  } finally {
    await browser.close().catch(() => {});
  }
}

function emptyRace(detail: string): RaceEvidence {
  return {
    ok: false,
    detail,
    a: { status: 'not-run', revision: null, attemptId: '' },
    b: { status: 'not-run', revision: null, attemptId: '' },
    readback: { attemptCount: -1, revision: null, attemptIds: [] },
  };
}

function judgeRace(
  a: RaceEvidence['a'],
  b: RaceEvidence['b'],
  readback: RaceEvidence['readback'],
): RaceEvidence {
  const problems: string[] = [];
  if (a.status !== 'committed') problems.push(`page 1 append returned '${a.status}' (must be committed — appends are unconditional, §2.4)`);
  if (b.status !== 'committed') problems.push(`page 2 append returned '${b.status}' (must be committed)`);
  if (a.revision !== null && b.revision !== null) {
    if (a.revision === b.revision) problems.push(`both pages committed at revision ${a.revision} — a lost update across two real tabs`);
    else if (Math.abs(a.revision - b.revision) !== 1) problems.push(`revisions ${a.revision}/${b.revision} are not consecutive`);
  }
  if (readback.attemptCount !== 2) problems.push(`reload sees ${readback.attemptCount} of 2 attempts`);
  if (new Set(readback.attemptIds).size !== readback.attemptIds.length) problems.push('reload sees duplicate attemptIds');
  const ok = problems.length === 0;
  const detail = ok
    ? `two real pages committed at consecutive revisions ${a.revision}/${b.revision}; reload sees both attempts [${readback.attemptIds.join(', ')}]`
    : problems.join('; ');
  return { ok, detail, a, b, readback };
}

// === Report ===================================================================================

function summarise(results: GateResult[]): { pass: number; fail: number; unsupported: number } {
  return {
    pass: results.filter((r) => r.status === 'pass').length,
    fail: results.filter((r) => r.status === 'fail').length,
    unsupported: results.filter((r) => r.status === 'declared-unsupported').length,
  };
}

function renderMarkdown(payload: ReportPayload): string {
  const lines: string[] = [];
  lines.push('# ProgressStore cycle-1 — 14-gate conformance against the idb adapter');
  lines.push('');
  lines.push(`> QA script-suite role \`progress\`. Spec: \`${SPEC_LINK}\`. Plan: \`${PLAN_LINK}\`.`);
  lines.push('');
  lines.push(`- **Verdict:** ${payload.passed ? 'PASS' : 'FAIL'}`);
  lines.push(`- Started: ${payload.startedAt}`);
  lines.push(`- Finished: ${payload.finishedAt}`);
  lines.push(`- Commit: \`${payload.commit}\``);
  lines.push(`- Base URL: ${payload.baseUrl}`);
  lines.push(`- Gates per browser: ${EXPECTED_GATES} · Browsers: ${payload.browsers.map((b) => b.name).join(', ')}`);
  for (const b of payload.browsers) {
    const s = summarise(b.results);
    lines.push(`- ${b.name} (${b.version}): ${s.pass} pass / ${s.fail} fail / ${s.unsupported} declared-unsupported`);
  }
  lines.push(`- **Matrix total:** ${payload.matrixPass}/${payload.matrixTotal} pass`);
  lines.push('');

  lines.push('## Gate matrix (one row per browser × gate)');
  lines.push('');
  lines.push(`| Gate | ${payload.browsers.map((b) => b.name).join(' | ')} |`);
  lines.push(`|------|${payload.browsers.map(() => '------').join('|')}|`);
  for (const gate of payload.gateIds) {
    const cells = payload.browsers.map((b) => {
      const r = b.results.find((x) => x.id === gate);
      return r ? cellFor(r.status) : 'n/a';
    });
    lines.push(`| ${gate} | ${cells.join(' | ')} |`);
  }
  lines.push('');

  lines.push('## Two-page race — additional multi-tab evidence (Option A)');
  lines.push('');
  lines.push('The in-page gate 7 races two `open()` connections in one page. This is the SEPARATE two-PAGE');
  lines.push('race the runner drives on the same origin with no runner-side mutex — distinct pages, distinct');
  lines.push('attempts — recorded here as additional evidence for §2.4\'s unconditional `appendAttempt`.');
  lines.push('');
  for (const b of payload.browsers) {
    lines.push(`- **${b.name}:** ${b.race.ok ? 'PASS' : 'FAIL'} — ${b.race.detail}`);
  }
  lines.push('');

  const failures = payload.browsers.flatMap((b) =>
    b.results.filter((r) => r.status === 'fail').map((r) => ({ browser: b.name, r })),
  );
  lines.push('## Failures');
  lines.push('');
  if (failures.length === 0) {
    lines.push('None — all gates passed in every browser.');
  } else {
    for (const f of failures) lines.push(`- FAIL — ${f.browser}/${f.r.id}: ${f.r.detail ?? '(no detail)'}`);
  }
  lines.push('');

  const launchIssues = payload.browsers.filter((b) => b.launchError);
  if (launchIssues.length > 0) {
    lines.push('## Browser launch issues');
    lines.push('');
    for (const b of launchIssues) lines.push(`- ${b.name}: ${b.launchError}`);
    lines.push('');
  }

  lines.push('## WebKit coverage gap (plan Step 5)');
  lines.push('');
  lines.push('This run covers **Chromium and Firefox only**. WebKit is a NAMED GAP, not papered over: the');
  lines.push("host's Playwright WebKit build targets Ubuntu 24.04 libraries and cannot launch against this");
  lines.push('CachyOS/Arch ABI (AL-R2 `:141-145`). It is **non-blocking** — AL-R2 already proved `idb` 14/14 in');
  lines.push('WebKit via the pinned container `mcr.microsoft.com/playwright:v1.61.1-noble`, and that container');
  lines.push('path stays available if a WebKit-specific doubt ever arises. Nothing here is inherited from');
  lines.push("AL-R2's `idb` evidence — these 28 cells re-prove §5.1's three-store layout and §2.4's append");
  lines.push('deviation on THIS contract, in two engines.');
  lines.push('');

  lines.push('## Serialized envelope bytes — measured, not gated (design §10, Task 10)');
  lines.push('');
  lines.push('A MEASUREMENT pass, not a gate: the 14-gate matrix above (design §11) is the sole pass/fail');
  lines.push('authority (design-erratum ruling — byte tiers are measured, never gated). This turns design');
  lines.push('§10\'s "no cap" retention decision from an assumption into a measured claim. Each tier commits');
  lines.push('`makeAttemptTier(n)` one attempt at a time into a freshly namespaced, then destroyed, REAL idb');
  lines.push('store; canonical bytes come from the adapter\'s own `exportSnapshot({mode:\'canonical\'})` — the');
  lines.push('real committed record shape, round-tripped through IndexedDB — not drafts serialized in memory.');
  lines.push('');
  if (payload.measurements.browser === null) {
    lines.push(`No browser produced a measurement pass. ${payload.measurements.note}`);
    lines.push('');
  } else {
    lines.push(`Measured in **${payload.measurements.browser}** (see the Task 10 comment atop \`run.ts\` for why`);
    lines.push('this is chromium-only rather than duplicated across browsers).');
    lines.push('');
    lines.push('| Tier | Attempts | Canonical bytes | Bytes/attempt | Measured IDB usage delta |');
    lines.push('|------|----------|------------------|----------------|---------------------------|');
    for (const m of payload.measurements.tiers) {
      const delta = m.estimateDeltaBytes === null ? 'n/a (estimate() unsupported/errored)' : `${m.estimateDeltaBytes.toLocaleString()} bytes`;
      lines.push(`| ${m.tier.toLocaleString()} | ${m.attempts.toLocaleString()} | ${m.canonicalBytes.toLocaleString()} | ${m.bytesPerAttempt.toFixed(2)} | ${delta} |`);
    }
    lines.push('');
    lines.push('`navigator.storage.estimate()` is coarse/quantized in real browsers; a zero or non-monotonic');
    lines.push('delta across tiers is a genuine browser observation, recorded as reported — never smoothed or');
    lines.push('fabricated into a cleaner number.');
    lines.push('');
  }
  lines.push('**Conclusion, against design §10:** no cap is imposed. The measured cost is the table above —');
  lines.push('at the 10,000-attempt stress tier (AL-R2\'s own stress tier), the canonical envelope is the');
  lines.push('measured byte figure shown, not a guess. Three triggers, and only these three, would earn a');
  lines.push('bound: (1) `QUOTA_EXCEEDED` observed in real use (not synthesised); (2) the external-beta');
  lines.push('telemetry trigger firing (`docs/specs/research-brief.md:23`); (3) a measured `load()` latency');
  lines.push('problem. Any future bound must be an **export-first compaction** or an **explicit user');
  lines.push('action** — **never a silent delete** (design §10). This measurement pass does not itself');
  lines.push('trigger any of the three, and asserts no new bound.');
  lines.push('');
  return lines.join('\n');
}

function cellFor(status: GateStatus): string {
  switch (status) {
    case 'pass':
      return 'pass';
    case 'fail':
      return '**FAIL**';
    case 'declared-unsupported':
      return 'declared-unsupported';
  }
}

interface MeasurementBlock {
  browser: string | null; // which browser hosted the measurement; null if none ran it
  tiers: TierMeasurement[];
  note: string;
}

interface ReportPayload {
  role: 'progress';
  spec: string;
  plan: string;
  startedAt: string;
  finishedAt: string;
  commit: string;
  baseUrl: string;
  gateIds: string[];
  browsers: BrowserRun[];
  matrixTotal: number;
  matrixPass: number;
  passed: boolean;
  webkitGap: { covered: boolean; reason: string; alternative: string };
  // Task 10 (design §10). Keyed SEPARATELY from `browsers`/the race block, by design (see the
  // ADDITIVE-BY-DESIGN comment at the top of this file) — a MEASUREMENT, never a factor in `passed`.
  measurements: MeasurementBlock;
}

// === Main =====================================================================================

async function main(): Promise<number> {
  const startedAt = new Date().toISOString();
  const tempDir = mkdtempSync(join(tmpdir(), 'progress-gates-'));
  log(`temp bundle dir: ${tempDir}`);

  log('building harness.ts with vite build...');
  await buildHarness(tempDir);

  const { baseUrl, server } = await startServer(tempDir);
  log(`serving on ${baseUrl}`);

  const browsers: BrowserRun[] = [];
  try {
    for (const [name, launch, measure] of [
      ['chromium', launchChromium, true],
      ['firefox', launchFirefox, false],
    ] as const) {
      log(`──────── ${name}${measure ? ' (+ byte measurement)' : ''} ────────`);
      const run = await driveBrowser(name, launch, baseUrl, measure);
      if (run.launchError) log(`  ${name} launch FAILED: ${run.launchError}`);
      else {
        const s = summarise(run.results);
        log(`  ${name} ${run.version}: ${s.pass} pass / ${s.fail} fail / ${s.unsupported} unsupported; race ${run.race.ok ? 'PASS' : 'FAIL'}`);
        for (const r of run.results.filter((x) => x.status === 'fail')) log(`    x ${r.id}: ${r.detail ?? ''}`);
        if (run.measurements) {
          for (const m of run.measurements) {
            log(`    measured tier ${m.attempts}: ${m.canonicalBytes} bytes (${m.bytesPerAttempt.toFixed(1)}/attempt), estimate delta ${m.estimateDeltaBytes ?? 'n/a'}`);
          }
        }
      }
      browsers.push(run);
    }
  } finally {
    await new Promise<void>((r) => server.close(() => r()));
    rmSync(tempDir, { recursive: true, force: true });
  }

  const ranBrowsers = browsers.filter((b) => !b.launchError);
  const gateIds = ranBrowsers[0]?.results.map((r) => r.id) ?? [];
  const matrixTotal = ranBrowsers.reduce((n, b) => n + b.results.length, 0);
  const matrixPass = ranBrowsers.reduce((n, b) => n + b.results.filter((r) => r.status === 'pass').length, 0);

  // A run is a PASS only if: both browsers launched and ran, every gate reported the full set of 14,
  // no gate FAILED, and both two-page races held. `declared-unsupported` must NOT appear for the idb
  // subject (it declares durable+multiConnection, so gates 2 and 7 RUN).
  const anyFail = ranBrowsers.some((b) => b.results.some((r) => r.status === 'fail'));
  const anyUnsupported = ranBrowsers.some((b) => b.results.some((r) => r.status === 'declared-unsupported'));
  const anyRaceFail = ranBrowsers.some((b) => !b.race.ok);
  const bothRan = browsers.length === 2 && browsers.every((b) => !b.launchError);
  const fullCounts = ranBrowsers.every((b) => b.results.length === EXPECTED_GATES);
  const passed = bothRan && fullCounts && !anyFail && !anyUnsupported && !anyRaceFail;

  // Task 10 — deliberately NOT an input to `passed` above (design-erratum ruling: §11's 14-gate
  // table is the sole pass/fail authority; byte tiers are measured, never gated).
  const measuredBrowser = browsers.find((b) => b.measurements);
  const measurements: MeasurementBlock = measuredBrowser
    ? { browser: measuredBrowser.name, tiers: measuredBrowser.measurements ?? [], note: 'measured against the real committed idb store; see design §10' }
    : { browser: null, tiers: [], note: 'no browser produced a measurement pass (see launch issues, if any)' };

  const finishedAt = new Date().toISOString();
  const payload: ReportPayload = {
    role: 'progress',
    spec: SPEC_LINK,
    plan: PLAN_LINK,
    startedAt,
    finishedAt,
    commit: gitCommit(),
    baseUrl,
    gateIds,
    browsers,
    matrixTotal,
    matrixPass,
    passed,
    webkitGap: {
      covered: false,
      reason: "host Playwright WebKit targets Ubuntu 24.04 libs; cannot launch on CachyOS/Arch ABI (AL-R2 :141-145)",
      alternative: 'AL-R2 proved idb 14/14 in WebKit via mcr.microsoft.com/playwright:v1.61.1-noble; container path available',
    },
    measurements,
  };

  writeFileSync(join(REPORT_DIR, 'report.md'), `${renderMarkdown(payload).replace(/\s+$/, '')}\n`);
  writeFileSync(join(REPORT_DIR, 'report.json'), `${JSON.stringify(payload, null, 2)}\n`);
  log(`report written: ${join(REPORT_DIR, 'report.md')}`);

  log(`MATRIX: ${matrixPass}/${matrixTotal} pass`);
  log(`VERDICT: ${passed ? 'PASS' : 'FAIL'}`);
  return passed ? 0 : 1;
}

// Ensure the run dir exists WITHOUT clobbering its siblings (bundle-delta.md from Task 6 lives here;
// Task 10/11 will add more). recursive mkdir is a no-op when it already exists.
mkdirSync(REPORT_DIR, { recursive: true });

main()
  .then((code) => process.exit(code))
  .catch((error) => {
    process.stderr.write(`[qa:progress] fatal: ${(error as Error).stack ?? (error as Error).message}\n`);
    process.exit(2);
  });
