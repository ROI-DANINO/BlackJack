// Role-parameterized report writer. Owns the shared header + directory naming
// (runs/<date>-<role>/report.{md,json}) + file writing. Each role passes its own formatted
// markdown body and JSON payload; report.ts decides nothing about pass/fail.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { RoleReport } from './types';

function header(r: RoleReport): string {
  const tick = (b: boolean) => (b ? 'PASS' : 'FAIL');
  const lines: string[] = [];
  lines.push(`# ${r.title}`);
  lines.push('');
  lines.push(`> QA script-suite role \`${r.role}\`. Spec: \`${r.specLink}\`.`);
  lines.push('');
  lines.push(`- **Verdict:** ${r.passed ? 'PASS' : 'FAIL'}`);
  lines.push(`- Started: ${r.startedAt}`);
  lines.push(`- Finished: ${r.finishedAt}`);
  lines.push(`- Commit: \`${r.commit}\``);
  lines.push(`- Chromium: ${r.chromiumVersion}`);
  lines.push(`- Base URL: ${r.baseUrl}`);
  for (const [k, v] of r.headerRows ?? []) lines.push(`- ${k}: ${v}`);
  lines.push('');
  return lines.join('\n');
}

export interface WrittenReport {
  dir: string;
  mdPath: string;
  jsonPath: string;
}

/** Write runs/<date>-<role>/report.md (header + role body) and report.json (role payload). */
export function writeRoleReport(runsRoot: string, dateStamp: string, report: RoleReport): WrittenReport {
  const dir = join(runsRoot, `${dateStamp}-${report.role}`);
  mkdirSync(dir, { recursive: true });
  const mdPath = join(dir, 'report.md');
  const jsonPath = join(dir, 'report.json');
  writeFileSync(mdPath, `${header(report)}\n${report.body}\n`);
  writeFileSync(jsonPath, JSON.stringify(report.json, null, 2));
  return { dir, mdPath, jsonPath };
}
