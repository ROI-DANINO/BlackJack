// Shared shapes for the breakit adversarial harness.
// Attacks produce Artifacts (no assertions); the oracle turns Artifacts into Invariants.

import type { LogLine, RoundLine, SessionHeader } from '../src/bridge/log/sink';

export type { LogLine, RoundLine, SessionHeader };

export type AttackKind = 'realistic' | 'injected';

export interface ConsoleMessage {
  type: string; // 'error' | 'warning' | 'log' | ...
  text: string;
}

/**
 * Raw output of one attack. An attack drives the app and records what happened;
 * it makes NO pass/fail decision — that is the oracle's sole job.
 */
export interface Artifacts {
  attack: string;
  kind: AttackKind;
  /** Primary downloaded/exported JSONL text ('' if the attack produced none). */
  jsonl: string;
  /** Additional JSONL captures (e.g. download spam produced several files). */
  extraJsonl?: string[];
  console: ConsoleMessage[];
  /** On-screen "Session seed: …" value captured from the DOM, if the attack read it. */
  onScreenSeed?: string;
  /** Two or more seeds captured across New-session calls (attack 3). */
  seeds?: string[];
  /** A pair of JSONL texts produced from the SAME seed (determinism attack). */
  pairJsonl?: [string, string];
  /** Whether a fresh Deal still resolves after the attack (stuck-UI probe). */
  freshDealWorks?: boolean;
  /** True if the page crashed during the attack. */
  crashed?: boolean;
  /** Non-null if the attack exceeded its per-attack timeout (ms). */
  timedOutMs?: number | null;
  /** Set if the attack body threw. */
  error?: string;
  /** Free-form repro breadcrumbs for the report. */
  repro?: string;
}

export interface Invariant {
  name: string;
  passed: boolean;
  detail?: string;
}

export interface AttackResult {
  attack: string;
  kind: AttackKind;
  passed: boolean;
  invariants: Invariant[];
  repro?: string;
}

export interface RunReport {
  startedAt: string;
  finishedAt: string;
  commit: string;
  chromiumVersion: string;
  baseUrl: string;
  prodHookAbsent: boolean;
  results: AttackResult[];
  passed: boolean;
}
