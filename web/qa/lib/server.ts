// Preview-server lifecycle. Owns process management ONLY — knows nothing about attacks/rules/flow.
//
// Flow: fail loudly if WASM is stale (reuse check-wasm-fresh.sh) → build an instrumented bundle
// (VITE_BREAKIT=1, so the __breakit hook survives) → serve it with `vite preview` (no HMR, a
// stable deterministic artifact). Returns the base URL and a teardown handle.
//
// PATH NOTE: this file now lives at web/qa/lib/, so WEB_ROOT must climb TWO directories (was
// web/breakit/ → '..'). Verified by actually running the suite, not by eyeballing.

import { spawn, spawnSync, type ChildProcess } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const WEB_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

export interface PreviewOptions {
  /** Vite --outDir for the built bundle (gitignored dist-* dir). */
  outDir: string;
  /** Preview server port (distinct per role so sequential runs never collide). */
  port: number;
  /** Extra build-time env; defaults to VITE_BREAKIT=1 so the hook survives for driving. */
  buildEnv?: Record<string, string>;
}

export interface PreviewHandle {
  baseUrl: string;
  outDir: string;
  stop: () => Promise<void>;
}

function run(cmd: string, args: string[], env: NodeJS.ProcessEnv = process.env): void {
  const r = spawnSync(cmd, args, { cwd: WEB_ROOT, stdio: 'inherit', env });
  if (r.status !== 0) throw new Error(`\`${cmd} ${args.join(' ')}\` failed (exit ${r.status ?? 'signal'})`);
}

/** Reuse the repo's staleness guard; the suite must refuse to run against a stale engine. */
export function assertWasmFresh(): void {
  run('bash', ['scripts/check-wasm-fresh.sh']);
}

/** Build a normal (no-flag) bundle into `dist-prodcheck` and assert the hook is absent from it. */
export function assertHookStrippedFromProdBuild(): { ok: boolean; detail: string } {
  const outDir = 'dist-prodcheck';
  const env = { ...process.env };
  delete env.VITE_BREAKIT;
  run('npx', ['vite', 'build', '--outDir', outDir], env);
  const grep = spawnSync('grep', ['-rl', '__breakit', outDir], { cwd: WEB_ROOT });
  // grep exit 0 => found (bad); exit 1 => not found (good).
  const ok = grep.status === 1;
  return { ok, detail: ok ? `no __breakit symbol in ${outDir}` : `__breakit LEAKED into ${outDir}` };
}

async function waitForServer(url: string, timeoutMs = 30000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error(`preview server did not come up at ${url} within ${timeoutMs}ms`);
}

/** Build the instrumented bundle and start `vite preview` serving it. */
export async function startPreview(opts: PreviewOptions): Promise<PreviewHandle> {
  const { outDir, port } = opts;
  const buildEnv = { ...process.env, ...(opts.buildEnv ?? { VITE_BREAKIT: '1' }) };
  run('npx', ['vite', 'build', '--outDir', outDir], buildEnv);

  const child: ChildProcess = spawn(
    'npx',
    ['vite', 'preview', '--outDir', outDir, '--port', String(port), '--strictPort'],
    { cwd: WEB_ROOT, stdio: ['ignore', 'inherit', 'inherit'], env: process.env },
  );

  const baseUrl = `http://localhost:${port}/`;
  await waitForServer(baseUrl);

  return {
    baseUrl,
    outDir,
    stop: () =>
      new Promise<void>((resolveStop) => {
        if (child.exitCode !== null || child.killed) return resolveStop();
        child.once('exit', () => resolveStop());
        child.kill('SIGTERM');
        setTimeout(() => {
          if (child.exitCode === null) child.kill('SIGKILL');
          resolveStop();
        }, 3000);
      }),
  };
}
