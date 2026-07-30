// Live tuning overrides — the "change it while you are testing" half of the params module.
//
// Overrides are keyed by dotted path and held OUTSIDE the defaults, never merged into them. That
// separation is what makes the stamp cheap and honest: a record carries the params version plus
// only what deviates from it, so a note reading `{version: '2026-07-30.1', overrides: {}}` is
// positive evidence the session ran on stock values rather than an absence of information.
//
// Persisted to localStorage so a page reload during a playtest does not silently reset the
// numbers you are in the middle of feeling out. Storage failures are non-fatal by design: a
// tuning panel must never be able to break the app it is tuning.

import {
  DEFAULT_TUNING_PARAMS,
  TUNING_PARAMS_VERSION,
  writeParamPath,
  type TuningParams,
} from './params';

const STORAGE_KEY = 'blackjack.tuning.overrides.v1';

export type ParamOverrides = Record<string, number | string>;

/** What gets stamped onto every note and every durable record. */
export type ParamsStamp = {
  version: string;
  /** Only the paths that deviate from the defaults. Empty object = stock values. */
  overrides: ParamOverrides;
};

function deepClone(params: TuningParams): TuningParams {
  return JSON.parse(JSON.stringify(params)) as TuningParams;
}

function readStorage(): ParamOverrides {
  try {
    const raw = globalThis.localStorage?.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    const out: ParamOverrides = {};
    for (const [path, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof value === 'number' || typeof value === 'string') out[path] = value;
    }
    return out;
  } catch {
    return {}; // unavailable or corrupt storage falls back to stock values
  }
}

function writeStorage(overrides: ParamOverrides): void {
  try {
    if (Object.keys(overrides).length === 0) globalThis.localStorage?.removeItem(STORAGE_KEY);
    else globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(overrides));
  } catch {
    // Non-fatal: the session keeps the in-memory overrides, they just will not survive a reload.
  }
}

export class TuningStore {
  private overrides: ParamOverrides;
  private listeners = new Set<() => void>();
  private cached: TuningParams | null = null;
  /** Monotonic; `params()` may allocate, so useSyncExternalStore subscribes to this instead. */
  private revision = 0;

  constructor(initial: ParamOverrides = readStorage()) {
    this.overrides = { ...initial };
  }

  subscribe = (fn: () => void): (() => void) => {
    this.listeners.add(fn);
    return () => { this.listeners.delete(fn); };
  };

  /** Defaults with every valid override applied. Cached until an override changes. */
  params = (): TuningParams => {
    if (this.cached) return this.cached;
    const next = deepClone(DEFAULT_TUNING_PARAMS);
    for (const [path, value] of Object.entries(this.overrides)) {
      writeParamPath(next, path, value); // silently drops a path that no longer exists
    }
    this.cached = next;
    return next;
  };

  getOverrides = (): ParamOverrides => ({ ...this.overrides });

  /** Rejects a path that does not resolve to an existing leaf of the same type. */
  setOverride = (path: string, value: number | string): boolean => {
    const probe = deepClone(DEFAULT_TUNING_PARAMS);
    if (!writeParamPath(probe, path, value)) return false;
    this.overrides = { ...this.overrides, [path]: value };
    this.invalidate();
    return true;
  };

  clearOverride = (path: string): void => {
    if (!(path in this.overrides)) return;
    const next = { ...this.overrides };
    delete next[path];
    this.overrides = next;
    this.invalidate();
  };

  clearAll = (): void => {
    if (Object.keys(this.overrides).length === 0) return;
    this.overrides = {};
    this.invalidate();
  };

  /** The provenance record that travels with notes and durable rows. */
  stamp = (): ParamsStamp => ({ version: TUNING_PARAMS_VERSION, overrides: this.getOverrides() });

  getRevision = (): number => this.revision;

  private invalidate(): void {
    this.cached = null;
    this.revision += 1;
    writeStorage(this.overrides);
    for (const fn of this.listeners) fn();
  }
}

/** App-wide instance. Tests construct their own TuningStore rather than touching this one. */
export const tuning = new TuningStore();
