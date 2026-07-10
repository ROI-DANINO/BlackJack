// Role-agnostic shared shapes for the QA script suite. No attack/flow/rules specifics leak in.
// Each role (breakit/rules/flow) owns its own extra shapes next to its checks.

import type { LogLine, RoundLine, SessionHeader } from '../../src/bridge/log/sink';

export type { LogLine, RoundLine, SessionHeader };

export interface ConsoleMessage {
  type: string; // 'error' | 'warning' | 'log' | ...
  text: string;
}

/** The atom every role's checks emit: one named assertion with a pass/fail and optional detail. */
export interface Invariant {
  name: string;
  passed: boolean;
  detail?: string;
}

/**
 * A finished role run, ready for report.ts. `body` is role-formatted markdown (the role owns how
 * it reads); `json` is the machine payload. `passed` is the gate verdict for the exit code.
 */
export interface RoleReport {
  role: string;      // 'breakit' | 'rules' | 'flow'
  specLink: string;  // docs/specs/… path shown in the report header
  title: string;
  startedAt: string;
  finishedAt: string;
  commit: string;
  chromiumVersion: string;
  baseUrl: string;
  passed: boolean;
  /** Extra header rows (role-specific, e.g. prod-hook-absence, coverage summary). */
  headerRows?: Array<[string, string]>;
  /** Role-formatted markdown body (sections below the shared header). */
  body: string;
  /** Machine payload dumped verbatim to report.json. */
  json: unknown;
}
