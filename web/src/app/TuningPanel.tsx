// Dev-only tuning panel: change any invented constant mid-session and feel the difference
// immediately, instead of stopping to edit a file and restart.
//
// EVERY DIAL IS LABELLED WITH WHAT KIND OF CLAIM IT IS. A slider with no provenance invites
// treating an invented constant as a measured one, which is the exact overclaim A-07 exists to
// prevent — "the archive holds no threshold constant". So each row shows its register row and
// whether the number is a product judgement, an owner ruling, or one of the four a spec named and
// never set.
//
// Overrides persist to localStorage and are stamped onto every note taken while they are in force,
// so a note saying "this drags" can always be traced to the numbers that produced it.

import { useSyncExternalStore } from 'react';
import {
  DEFAULT_TUNING_PARAMS,
  PARAM_PROVENANCE,
  TUNING_PARAMS_VERSION,
  listParamLeaves,
  readParamPath,
  type ParamStatus,
  type SessionPresetId,
} from '../tuning/params';
import { tuning } from '../tuning/store';

const STATUS_LABEL: Record<ParamStatus, string> = {
  invented: 'invented — product judgement',
  'invented-unset-in-spec': 'INVENTED, and the spec never set it — this value is a proposal',
  'owner-decision': 'owner decision — changing it reopens a ruling',
};

const SECTION_TITLE: Record<string, string> = {
  mastery: 'Mastery (LDB-04)',
  review: 'Review horizon (LDB-04 §3)',
  session: 'Session size (LDB-06 §3)',
  pool: 'Pool composition and rare-event dosage (LDB-06 §5-6)',
};

const PRESET_IDS: SessionPresetId[] = ['short', 'standard', 'long'];

export function TuningPanel() {
  useSyncExternalStore(tuning.subscribe, tuning.getRevision, tuning.getRevision);
  const params = tuning.params();
  const overrides = tuning.getOverrides();
  const leaves = listParamLeaves(params);
  const sections = [...new Set(leaves.map((leaf) => leaf.path.split('.')[0]!))];

  return (
    <details>
      <summary>
        Tuning — {Object.keys(overrides).length === 0
          ? `stock values (${TUNING_PARAMS_VERSION})`
          : `${Object.keys(overrides).length} override(s) active`}
      </summary>
      <p>
        <small>
          Every number here is invented until this product measures it. Changes apply immediately,
          persist across reloads, and are stamped onto every note you take.
        </small>
      </p>
      <button onClick={() => tuning.clearAll()} disabled={Object.keys(overrides).length === 0}>
        Reset all to stock
      </button>

      {sections.map((section) => (
        <section key={section}>
          <h3>{SECTION_TITLE[section] ?? section}</h3>
          <ul>
            {leaves.filter((leaf) => leaf.path.startsWith(`${section}.`) || leaf.path === section).map((leaf) => (
              <Row key={leaf.path} path={leaf.path} value={leaf.value} overridden={leaf.path in overrides} />
            ))}
          </ul>
        </section>
      ))}
    </details>
  );
}

function Row({ path, value, overridden }: { path: string; value: number | string; overridden: boolean }) {
  const meta = PARAM_PROVENANCE[path];
  const isDuration = path.endsWith('Ms') && typeof value === 'number';
  const isPresetId = path === 'session.defaultPresetId';

  return (
    <li>
      <label>
        <code>{path.split('.').slice(1).join('.') || path}</code>{' '}
        {isPresetId ? (
          <select value={String(value)} onChange={(e) => tuning.setOverride(path, e.target.value)}>
            {PRESET_IDS.map((id) => <option key={id} value={id}>{id}</option>)}
          </select>
        ) : isDuration ? (
          <>
            <input
              type="number"
              step="0.5"
              min="0"
              value={(value as number) / 60_000}
              onChange={(e) => {
                const minutes = Number(e.target.value);
                if (Number.isFinite(minutes) && minutes >= 0) tuning.setOverride(path, Math.round(minutes * 60_000));
              }}
            />{' '}
            min
          </>
        ) : (
          <input
            type="number"
            step="any"
            value={value as number}
            onChange={(e) => {
              const next = Number(e.target.value);
              if (Number.isFinite(next)) tuning.setOverride(path, next);
            }}
          />
        )}
      </label>{' '}
      {overridden && (
        <button onClick={() => tuning.clearOverride(path)}>
          reset (stock: {formatStock(path)})
        </button>
      )}
      {meta && (
        <div>
          <small>
            {meta.register} · {STATUS_LABEL[meta.status]} · {meta.source}
            {meta.note ? ` — ${meta.note}` : ''}
            <br />
            validation: {meta.validation}
          </small>
        </div>
      )}
    </li>
  );
}

function formatStock(path: string): string {
  // Reads the DEFAULTS, not the effective params, so the button says what resetting returns to.
  const stock = readParamPath(DEFAULT_TUNING_PARAMS, path);
  if (typeof stock === 'number' && path.endsWith('Ms')) return `${stock / 60_000} min`;
  return String(stock ?? '');
}
