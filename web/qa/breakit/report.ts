// Breakit report assembly. Formats the attack results into a markdown body; delegates the shared
// header + file writing to ../lib/report. Owns NO logic about what passed (the oracle decided that).

import { writeRoleReport, type WrittenReport } from '../lib/report';
import type { RoleReport } from '../lib/types';
import type { AttackResult, RunReport } from './types';

const SPEC_LINK = 'docs/specs/2026-07-10-breakit-adversarial-harness.md';

export function buildReport(meta: Omit<RunReport, 'results' | 'passed'>, results: AttackResult[]): RunReport {
  return { ...meta, results, passed: results.every((r) => r.passed) && meta.prodHookAbsent };
}

function toBody(r: RunReport): string {
  const lines: string[] = [];
  const tick = (b: boolean) => (b ? 'PASS' : 'FAIL');
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
  return lines.join('\n');
}

export function writeReport(runsRoot: string, dateStamp: string, report: RunReport): WrittenReport {
  const role: RoleReport = {
    role: 'breakit',
    specLink: SPEC_LINK,
    title: 'Breakit run report',
    startedAt: report.startedAt,
    finishedAt: report.finishedAt,
    commit: report.commit,
    chromiumVersion: report.chromiumVersion,
    baseUrl: report.baseUrl,
    passed: report.passed,
    headerRows: [['Prod-build hook absent (tree-shaken)', report.prodHookAbsent ? 'PASS' : 'FAIL']],
    body: toBody(report),
    json: report,
  };
  return writeRoleReport(runsRoot, dateStamp, role);
}
