// qa:all — run the scriptable QA roles sequentially (rules → flow → breakit → drill), each in its own
// process (its own build + preview + chromium), aggregate the verdict, and EXIT NON-ZERO if any
// role fails. This is the milestone Tier-1 gate.

import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const WEB_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const ROLES: Array<{ name: string; entry: string }> = [
  { name: 'rules', entry: 'qa/rules/run.ts' },
  { name: 'flow', entry: 'qa/flow/run.ts' },
  { name: 'breakit', entry: 'qa/breakit/run.ts' },
  { name: 'drill', entry: 'qa/drill/run.ts' },
];

function log(msg: string): void {
  process.stdout.write(`[qa] ${msg}\n`);
}

const results: Array<{ name: string; code: number }> = [];
for (const role of ROLES) {
  log(`──────── running qa:${role.name} ────────`);
  const r = spawnSync('npx', ['tsx', role.entry], { cwd: WEB_ROOT, stdio: 'inherit', env: process.env });
  const code = r.status ?? (r.signal ? 1 : 2);
  results.push({ name: role.name, code });
  log(`qa:${role.name} exited ${code}`);
}

log('──────── aggregate ────────');
for (const r of results) log(`  ${r.code === 0 ? 'PASS' : 'FAIL'}  qa:${r.name} (exit ${r.code})`);
const anyFailed = results.some((r) => r.code !== 0);
log(`VERDICT: ${anyFailed ? 'FAIL' : 'PASS'}`);
process.exit(anyFailed ? 1 : 0);
