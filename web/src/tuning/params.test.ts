import { describe, it, expect } from 'vitest';
import {
  DEFAULT_TUNING_PARAMS,
  PARAM_PROVENANCE,
  TUNING_PARAMS_VERSION,
  listParamLeaves,
  readParamPath,
  writeParamPath,
} from './params';
import { TuningStore } from './store';

describe('tuning params', () => {
  it('carries the constants the approved specs actually state', () => {
    const p = DEFAULT_TUNING_PARAMS;
    expect(p.mastery.weights.unassistedHidden).toBe(1.0);   // LDB-04 §1.1
    expect(p.mastery.weights.unassistedOpen).toBe(0.5);
    expect(p.mastery.weights.retry).toBe(0.35);
    expect(p.mastery.weights.instruction).toBe(0.15);
    expect(p.mastery.threshold).toBe(3.0);
    expect(p.review.horizonDays).toBe(14);                  // LDB-04 §3
    expect(p.session.presets.short).toEqual({ targetDurationMs: 180_000, maxActivities: 5 });   // LDB-06 §3
    expect(p.session.presets.standard).toEqual({ targetDurationMs: 480_000, maxActivities: 12 });
    expect(p.session.presets.long).toEqual({ targetDurationMs: 900_000, maxActivities: 20 });
    expect(p.pool.firstExposureGraduationCount).toBe(1);    // LDB-06 §5.2
  });

  it('gives every leaf a value — including the four the specs named and never set', () => {
    // The point of the module: prose can ship "a minimum rate" with no number, code cannot.
    for (const leaf of listParamLeaves()) {
      expect(leaf.value, `${leaf.path} has no value`).not.toBeUndefined();
      if (typeof leaf.value === 'number') expect(Number.isFinite(leaf.value)).toBe(true);
    }
    const unset = Object.entries(PARAM_PROVENANCE)
      .filter(([, meta]) => meta.status === 'invented-unset-in-spec')
      .map(([path]) => path);
    expect(unset).toEqual([
      'mastery.calibration.minSeriesLength',
      'mastery.calibration.maxMeanAbsoluteError',
      'pool.minEngineeredTailEventsPerSession',
      'pool.p4LosingRunFloor',
    ]);
    for (const path of unset) expect(readParamPath(DEFAULT_TUNING_PARAMS, path)).not.toBeUndefined();
  });

  it('labels every tunable leaf with its register row, so no number reads as measured', () => {
    // Enumerated positively: assert each leaf HAS provenance rather than that none is missing.
    const missing = listParamLeaves().map((l) => l.path).filter((path) => !(path in PARAM_PROVENANCE));
    expect(missing).toEqual([]);
    for (const meta of Object.values(PARAM_PROVENANCE)) {
      expect(meta.register).toMatch(/^A-\d+[a-z]?$/);
      expect(meta.validation.length).toBeGreaterThan(0);
    }
  });

  it('reads and writes leaves by dotted path, refusing unknown paths and type changes', () => {
    const target = JSON.parse(JSON.stringify(DEFAULT_TUNING_PARAMS));
    expect(writeParamPath(target, 'mastery.threshold', 2.5)).toBe(true);
    expect(readParamPath(target, 'mastery.threshold')).toBe(2.5);
    expect(writeParamPath(target, 'mastery.nope', 1)).toBe(false);
    expect(writeParamPath(target, 'pool', 1)).toBe(false);                      // not a leaf
    expect(writeParamPath(target, 'mastery.threshold', 'three')).toBe(false);   // type change refused
    expect(readParamPath(target, 'mastery.threshold')).toBe(2.5);
  });
});

describe('TuningStore', () => {
  it('applies overrides over the defaults without mutating them', () => {
    const store = new TuningStore({});
    expect(store.setOverride('session.presets.standard.maxActivities', 6)).toBe(true);
    expect(store.params().session.presets.standard.maxActivities).toBe(6);
    expect(DEFAULT_TUNING_PARAMS.session.presets.standard.maxActivities).toBe(12);
  });

  it('rejects an override that does not name an existing leaf of the same type', () => {
    const store = new TuningStore({});
    expect(store.setOverride('mastery.invented', 1)).toBe(false);
    expect(store.setOverride('mastery.threshold', 'high')).toBe(false);
    expect(store.getOverrides()).toEqual({});
  });

  it('stamps the version plus only what deviates, so an empty override map is positive evidence', () => {
    const store = new TuningStore({});
    expect(store.stamp()).toEqual({ version: TUNING_PARAMS_VERSION, overrides: {} });
    store.setOverride('review.horizonDays', 3);
    expect(store.stamp()).toEqual({ version: TUNING_PARAMS_VERSION, overrides: { 'review.horizonDays': 3 } });
  });

  it('drops a stored override whose path no longer exists instead of throwing', () => {
    const store = new TuningStore({ 'mastery.removedLastYear': 9 });
    expect(() => store.params()).not.toThrow();
    expect(store.params().mastery.threshold).toBe(3.0);
  });

  it('notifies subscribers and clears back to stock', () => {
    const store = new TuningStore({});
    let calls = 0;
    store.subscribe(() => { calls += 1; });
    store.setOverride('mastery.threshold', 1);
    expect(calls).toBe(1);
    store.clearOverride('mastery.threshold');
    expect(calls).toBe(2);
    expect(store.params().mastery.threshold).toBe(3.0);
    store.setOverride('mastery.threshold', 1);
    store.clearAll();
    expect(store.getOverrides()).toEqual({});
  });
});
