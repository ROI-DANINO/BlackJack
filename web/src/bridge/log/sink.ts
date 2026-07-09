import type { RoundLog, Ruleset } from '../types';

export interface SessionHeader {
  type: 'session_header';
  schema_version: number;
  session_id: string;
  seed: string;
  started_at: string;
  starting_bankroll: number;
  default_bet: number;
  ruleset: Ruleset;
  harness_version: string;
}

/** A round line carries the RoundLog verbatim (flattened) plus harness-added fields. */
export type RoundLine = {
  type: 'round';
  schema_version: number;
  session_id: string;
  round_index: number;
  ts: string;
} & RoundLog;

export type LogLine = SessionHeader | RoundLine;

/**
 * Swappable history store. ASYNC on purpose: an IndexedDB/DB implementation drops in
 * later with zero round-loop changes. The persisted file stays lossless (no derived
 * count/strategy columns) — those are computed later in the Python analysis layer.
 */
export interface LogSink {
  write(line: LogLine): Promise<void>;
  flush(): Promise<void>;
  export(): Blob;
}
