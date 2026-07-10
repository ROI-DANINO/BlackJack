// Report assembly. Formats results; owns NO logic about what passed (the oracle decided that).

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { AttackResult, RunReport } from './types';

export function buildReport(meta: Omit<RunReport, 'results' | 'passed'>, results: AttackResult[]): RunReport {
  return { ...meta, results, passed: results.every((r) => r.passed) && meta.prodHookAbsent };
}

function toMarkdown(r: RunReport): string {
  const lines: string[] = [];
  const tick = (b: boolean) => (b ? 'PASS' : 'FAIL');
  lines.push('# Breakit run report');
  lines.push('');
  lines.push(`> Adversarial E2E abuse harness. Spec: \`docs/specs/2026-07-10-breakit-adversarial-harness.md\`.`);
  lines.push('');
  lines.push(`- **Verdict:** ${r.passed ? 'PASS — no invariant broke' : 'FAIL — see breaks below'}`);
  lines.push(`- Started: ${r.startedAt}`);
  lines.push(`- Finished: ${r.finishedAt}`);
  lines.push(`- Commit: \`${r.commit}\``);
  lines.push(`- Chromium: ${r.chromiumVersion}`);
  lines.push(`- Base URL: ${r.baseUrl}`);
  lines.push(`- Prod-build hook absent (tree-shaken): ${tick(r.prodHookAbsent)}`);
  lines.push('');
  lines.push('## Attacks');
  lines.push('');
  lines.push('| # | Attack | Kind | Verdict | Failed invariants |');
  lines.push('|---|--------|------|---------|-------------------|');
  r.results.forEach((a, i) => {
    const failed = a.invariants.filter((iv) => !iv.passed).length;
    lines.push(`| ${i + 1} | ${a.attack} | ${a.kind} | ${tick(a.passed)} | ${failed} |`);
  });
  lines.push('');
  lines.push('## Details');
  for (const a of r.results) {
    lines.push('');
    lines.push(`### ${a.attack} — ${tick(a.passed)}`);
    if (a.repro) lines.push(`- Repro: ${a.repro}`);
    lines.push('');
    for (const iv of a.invariants) {
      lines.push(`- ${tick(iv.passed)} — ${iv.name}${iv.detail ? ` — ${iv.detail}` : ''}`);
    }
  }
  lines.push('');
  return lines.join('\n');
}

export interface WrittenReport {
  dir: string;
  mdPath: string;
  jsonPath: string;
}

export function writeReport(runsRoot: string, dateStamp: string, report: RunReport): WrittenReport {
  const dir = join(runsRoot, `${dateStamp}-breakit`);
  mkdirSync(dir, { recursive: true });
  const mdPath = join(dir, 'report.md');
  const jsonPath = join(dir, 'report.json');
  writeFileSync(mdPath, toMarkdown(report));
  writeFileSync(jsonPath, JSON.stringify(report, null, 2));
  return { dir, mdPath, jsonPath };
}
