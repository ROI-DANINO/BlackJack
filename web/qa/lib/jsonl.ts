// Shared JSONL parsing for the exported history artifact. Pure — no assertions.
// Lifted from breakit's oracle.ts so rules/flow/breakit all read the log the same way.

import type { LogLine, RoundLine, SessionHeader } from './types';

export interface ParseResult {
  records: LogLine[];
  errors: string[];
}

/** Split JSONL into records; every non-empty line must be exactly one valid JSON object. */
export function parseJsonl(text: string): ParseResult {
  const records: LogLine[] = [];
  const errors: string[] = [];
  const lines = text.split('\n');
  lines.forEach((line, i) => {
    if (line.trim() === '') return;
    let v: unknown;
    try {
      v = JSON.parse(line);
    } catch {
      errors.push(`line ${i + 1}: not valid JSON: ${line.slice(0, 80)}`);
      return;
    }
    if (!v || typeof v !== 'object' || typeof (v as { type?: unknown }).type !== 'string') {
      errors.push(`line ${i + 1}: record missing string 'type'`);
      return;
    }
    records.push(v as LogLine);
  });
  return { records, errors };
}

export const isHeader = (r: LogLine): r is SessionHeader => r.type === 'session_header';
export const isRound = (r: LogLine): r is RoundLine => r.type === 'round';

/** Convenience: parse + partition into headers and rounds (empty text → empty arrays). */
export function readLog(text: string): { records: LogLine[]; errors: string[]; headers: SessionHeader[]; rounds: RoundLine[] } {
  const { records, errors } = parseJsonl(text);
  return { records, errors, headers: records.filter(isHeader), rounds: records.filter(isRound) };
}
