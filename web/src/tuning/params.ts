// The single source of every invented constant the learning design runs on.
//
// WHY THIS FILE EXISTS. `assumption-register.md` A-07 says of every threshold, interval, evidence
// count, and session duration this product ships: "these are invented until measured", and "the
// archive holds no threshold constant". Constants of that kind must not be spelled inline at the
// site that uses them, because retuning them after a playtest would then mean hunting through
// reducers and components. They live here, they are versioned, and the version is stamped into
// every record and every playtest note so a number can always be traced back to the data it
// produced. Change a value, bump TUNING_PARAMS_VERSION, and old attempts stay distinguishable
// from new ones instead of silently mixing two calibrations.
//
// A SECOND THING IT DOES, DISCOVERED WHILE WRITING IT. Prose can ship a constant with no value:
// LDB-06 §6 names "a minimum rate of engineered tail events" and "a floor on the losing-run
// length" and sets neither, and LDB-04 §2.2 — already approved — names F5's minimum series length
// and calibration bar and sets neither. Four registered constants with no number. TypeScript
// cannot compile against "a minimum rate", so this module forces the omission into the open.
// Those four carry status 'invented-unset-in-spec' below; the values are this file's proposal,
// not a spec's decision.
//
// THE SCHEMA WAS ALREADY EXPECTING THIS. `progress/types.ts` carries `budget.presetId`,
// `reducerVersion`, and `curriculumVersion` — three fields whose purpose is to tag which constants
// produced which data. This module is the other half of those fields.

export const TUNING_PARAMS_VERSION = '2026-07-30.1';

export type SessionPresetId = 'short' | 'standard' | 'long';

export type SessionPreset = {
  /** Wall-clock target. A session closes at the END of the activity that crosses it (LDB-06 §4). */
  targetDurationMs: number;
  /** Activity cap. Same end-of-activity rule. */
  maxActivities: number;
};

export type TuningParams = {
  mastery: {
    /**
     * Weight per qualifying attempt, by assistance and table visibility (LDB-04 §1.1).
     * Pooled as ONE calibration target under A-07a: moving any weight changes what the
     * threshold means, so no weight is independently validatable.
     */
    weights: {
      unassistedHidden: number;
      unassistedOpen: number;
      retry: number;
      instruction: number;
      /** Incorrect, ungraded, or abandoned. Recorded, contributes nothing. */
      incorrect: number;
    };
    /** Summed weight at which a skill is mastered (LDB-04 §1.1). */
    threshold: number;
    /** Per-family weight ceilings (LDB-04 §2.1). F1 is bounded-option recognition; F2 is supporting-only. */
    familyCeilings: {
      f1Recognition: number;
      f2OrderedAssembly: number;
    };
    /**
     * F5 calibrated estimate is scored over a SERIES, never per attempt (LDB-04 §2.2).
     * Both values are unset in the approved spec — see the header note.
     */
    calibration: {
      /** Estimates required before a calibration score is computed at all. */
      minSeriesLength: number;
      /** Mean absolute error at or below which the series counts as calibrated. Estimates are 0..1. */
      maxMeanAbsoluteError: number;
    };
  };
  review: {
    /**
     * Days after a skill's most recent qualifying evidence before it becomes `Review due`
     * (LDB-04 §3). Filed under A-06a, which sits at LOW confidence: no study covers spacing
     * transfer to a blackjack-shaped decision rule, and the only product analogue has no
     * time-based decay at all.
     */
    horizonDays: number;
  };
  session: {
    /**
     * The three presets (LDB-06 §3, A-07b). They deliberately SPAN the A-08 conflict — Duolingo
     * "a few minutes" against Brilliant's recommended fifteen with a two-minute option — rather
     * than picking a side, so learner selection becomes the instrument A-08 already names.
     * Duration and cap are pooled as one target: raising one changes what the other means.
     */
    presets: Record<SessionPresetId, SessionPreset>;
    defaultPresetId: SessionPresetId;
  };
  pool: {
    /** Completed introduction activities before a category graduates out of first-exposure. One-way (LDB-06 §5.2). */
    firstExposureGraduationCount: number;
    /**
     * Minimum engineered tail encounters per session at or above `standard` size (LDB-06 §6).
     * Engineered, not organic: §1.2 [VERIFIED] shows experience-taught learners underweight rare
     * events across >70,000 choices. Unset in the spec — see the header note.
     */
    minEngineeredTailEventsPerSession: number;
    /**
     * Consecutive losing resolved hands under correct play that count as a `P4` measurement
     * (LDB-06 §6). A floor exists because a two-hand loss is not a run and would leave A-26
     * unfalsifiable. Unset in the spec — see the header note.
     */
    p4LosingRunFloor: number;
  };
};

export const DEFAULT_TUNING_PARAMS: TuningParams = {
  mastery: {
    weights: {
      unassistedHidden: 1.0,
      unassistedOpen: 0.5,
      retry: 0.35,
      instruction: 0.15,
      incorrect: 0,
    },
    threshold: 3.0,
    familyCeilings: {
      f1Recognition: 0.5,
      f2OrderedAssembly: 0.5,
    },
    calibration: {
      minSeriesLength: 5,
      maxMeanAbsoluteError: 0.15,
    },
  },
  review: {
    horizonDays: 14,
  },
  session: {
    presets: {
      short: { targetDurationMs: 3 * 60_000, maxActivities: 5 },
      standard: { targetDurationMs: 8 * 60_000, maxActivities: 12 },
      long: { targetDurationMs: 15 * 60_000, maxActivities: 20 },
    },
    defaultPresetId: 'standard',
  },
  pool: {
    firstExposureGraduationCount: 1,
    minEngineeredTailEventsPerSession: 1,
    p4LosingRunFloor: 4,
  },
};

// --- Provenance ------------------------------------------------------------------------------
// Every tunable's warrant, so the dev panel can show WHAT KIND OF CLAIM a number is while you
// are changing it. A slider with no label invites treating an invented constant as a measured
// one, which is the exact overclaim A-07 exists to prevent.

export type ParamStatus =
  /** A product judgement with a value the spec actually states. Free to change. */
  | 'invented'
  /** Named as a constant by an approved or drafted spec that never gave it a value. */
  | 'invented-unset-in-spec'
  /** An explicit owner ruling. Changing it reopens a decision, not just a dial. */
  | 'owner-decision';

export type ParamProvenance = {
  /** Assumption Register row that owns this number. */
  register: string;
  /** The document that introduced it. */
  source: string;
  status: ParamStatus;
  /** Validation method the register names for it. */
  validation: string;
  note?: string;
};

/** Keyed by dotted path into TuningParams. Absent path ⇒ shown as unlabelled in the panel. */
export const PARAM_PROVENANCE: Record<string, ParamProvenance> = {
  'mastery.weights.unassistedHidden': {
    register: 'A-07a', source: 'LDB-04 §1.1', status: 'invented',
    validation: 'production telemetry — whether the threshold separates learners who retain, at matched attempt volume',
    note: 'Highest-weighted evidence there is: a played hand, unassisted, table hidden.',
  },
  'mastery.weights.unassistedOpen': {
    register: 'A-07a', source: 'LDB-04 §1.1', status: 'invented',
    validation: 'production telemetry — pooled with the whole weight table',
  },
  'mastery.weights.retry': {
    register: 'A-07a', source: 'LDB-04 §1.1', status: 'invented',
    validation: 'production telemetry — pooled with the whole weight table',
  },
  'mastery.weights.instruction': {
    register: 'A-07a', source: 'LDB-04 §1.1', status: 'invented',
    validation: 'production telemetry — pooled with the whole weight table',
  },
  'mastery.weights.incorrect': {
    register: 'A-07a', source: 'LDB-04 §1.1', status: 'owner-decision',
    validation: 'none — a wrong answer conferring mastery weight is a design error, not a calibration',
  },
  'mastery.threshold': {
    register: 'A-07a', source: 'LDB-04 §1.1', status: 'invented',
    validation: 'production telemetry — pooled with the weight table it defines',
    note: 'With the at-least-one-unassisted gate, cheapest mastery is three hidden-table unassisted items.',
  },
  'mastery.familyCeilings.f1Recognition': {
    register: 'A-07a', source: 'LDB-04 §2.1 (F1)', status: 'invented',
    validation: 'production telemetry',
    note: 'A bounded option set is never hidden-table unassisted in the sense the weight table means.',
  },
  'mastery.familyCeilings.f2OrderedAssembly': {
    register: 'A-07a', source: 'LDB-04 §2.1 (F2)', status: 'owner-decision',
    validation: 'none — F2 measures declarative sequence knowledge and A4 is behavioural',
    note: 'Supporting-only on A4. Letting F2 alone confer A4 reintroduces knowledge-for-behaviour substitution.',
  },
  'mastery.calibration.minSeriesLength': {
    register: 'A-07a', source: 'LDB-04 §2.2', status: 'invented-unset-in-spec',
    validation: 'production telemetry',
    note: 'The approved spec names this constant and never sets it. Value here is a proposal.',
  },
  'mastery.calibration.maxMeanAbsoluteError': {
    register: 'A-07a', source: 'LDB-04 §2.2', status: 'invented-unset-in-spec',
    validation: 'production telemetry',
    note: 'The approved spec names this constant and never sets it. Value here is a proposal.',
  },
  'review.horizonDays': {
    register: 'A-06a', source: 'LDB-04 §3', status: 'invented',
    validation: 'production telemetry over returning learners — which this product does not yet have',
    note: 'A-06 is LOW confidence: settled coverage gap, four independent confirmations no such study exists.',
  },
  'session.presets.short.targetDurationMs': {
    register: 'A-07b', source: 'LDB-06 §3', status: 'invented',
    validation: 'playtesting — learner-selected preset, completion and return rates recorded (A-08’s instrument)',
  },
  'session.presets.short.maxActivities': {
    register: 'A-07b', source: 'LDB-06 §3', status: 'invented',
    validation: 'playtesting — pooled with its duration; raising one changes what the other means',
  },
  'session.presets.standard.targetDurationMs': {
    register: 'A-07b', source: 'LDB-06 §3', status: 'invented',
    validation: 'playtesting — learner-selected preset, completion and return rates recorded',
  },
  'session.presets.standard.maxActivities': {
    register: 'A-07b', source: 'LDB-06 §3', status: 'invented',
    validation: 'playtesting — pooled with its duration',
  },
  'session.presets.long.targetDurationMs': {
    register: 'A-07b', source: 'LDB-06 §3', status: 'invented',
    validation: 'playtesting — learner-selected preset, completion and return rates recorded',
  },
  'session.presets.long.maxActivities': {
    register: 'A-07b', source: 'LDB-06 §3', status: 'invented',
    validation: 'playtesting — pooled with its duration',
  },
  'session.defaultPresetId': {
    register: 'A-07b', source: 'LDB-06 §2-3', status: 'invented',
    validation: 'playtesting — which preset a learner actually picks is the instrument',
  },
  'pool.firstExposureGraduationCount': {
    register: 'A-07c', source: 'LDB-06 §5.2', status: 'invented',
    validation: 'playtesting — P-3’s instrument, with a retention arm',
    note: 'Graduation is one-way; a category never returns to blocked.',
  },
  'pool.minEngineeredTailEventsPerSession': {
    register: 'A-07c', source: 'LDB-06 §6', status: 'invented-unset-in-spec',
    validation: 'playtesting — P-3’s instrument, with a retention arm',
    note: 'The draft names this constant and never sets it. Value here is a proposal.',
  },
  'pool.p4LosingRunFloor': {
    register: 'A-07c', source: 'LDB-06 §6', status: 'invented-unset-in-spec',
    validation: 'playtesting — makes A-26 falsifiable at all',
    note: 'The draft names this constant and never sets it. Value here is a proposal.',
  },
};

// --- Path helpers ----------------------------------------------------------------------------
// The panel and the override store address params by dotted path. Enumerating the tree rather
// than hand-listing the paths means a param added to TuningParams cannot be silently un-tunable.

export type ParamLeaf = { path: string; value: number | string };

function walk(node: unknown, prefix: string, out: ParamLeaf[]): void {
  if (typeof node === 'number' || typeof node === 'string') {
    out.push({ path: prefix, value: node });
    return;
  }
  if (node === null || typeof node !== 'object') return;
  for (const [key, child] of Object.entries(node as Record<string, unknown>)) {
    walk(child, prefix === '' ? key : `${prefix}.${key}`, out);
  }
}

/** Every tunable leaf in declaration order. */
export function listParamLeaves(params: TuningParams = DEFAULT_TUNING_PARAMS): ParamLeaf[] {
  const out: ParamLeaf[] = [];
  walk(params, '', out);
  return out;
}

export function readParamPath(params: TuningParams, path: string): number | string | undefined {
  let node: unknown = params;
  for (const key of path.split('.')) {
    if (node === null || typeof node !== 'object') return undefined;
    node = (node as Record<string, unknown>)[key];
  }
  return typeof node === 'number' || typeof node === 'string' ? node : undefined;
}

/** Mutates `target` in place. Returns false if the path does not resolve to an existing leaf. */
export function writeParamPath(target: TuningParams, path: string, value: number | string): boolean {
  const keys = path.split('.');
  const last = keys.pop();
  if (last === undefined) return false;
  let node: unknown = target;
  for (const key of keys) {
    if (node === null || typeof node !== 'object') return false;
    node = (node as Record<string, unknown>)[key];
  }
  if (node === null || typeof node !== 'object') return false;
  const holder = node as Record<string, unknown>;
  if (!(last in holder)) return false;
  const existing = holder[last];
  if (typeof existing !== typeof value) return false; // never let an override change a leaf's type
  holder[last] = value;
  return true;
}
