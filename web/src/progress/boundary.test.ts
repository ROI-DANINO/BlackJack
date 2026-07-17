// The module-boundary tests for progress/ (design §3.1, §9.1). These are structural checks over
// SOURCE TEXT, not behavior tests — they prove the port's SHAPE enforces the constraints that make
// an `idb` reversal (§2.1) and an async-caller-over-sync-transaction (§9) survivable:
//
//   (a) only progress/idb-store.ts may import the 'idb' package (design §3.1's file table; the
//       single-import rule is "enforced by a test, not by convention").
//   (b) no file in progress/ may import from '../learn/' (design §3.1 — the durable attempt is a
//       different type from learn/types.ts's in-memory AttemptRecord; importing it would couple
//       progress storage to lesson-authoring churn).
//   (c) store.ts's source contains no arrow-typed callback parameter that returns a Promise, and
//       no AsyncIterable (design §9.1's no-callback rule, checked structurally rather than by
//       convention).
//
// No jsdom pragma: the Vitest environment here is 'node' (web/vite.config.ts), and this file reads
// its own directory off disk with node:fs — that works under 'node', not under a DOM shim.
//
// This test intentionally runs BEFORE store.ts (and idb-store.ts) exist. At that point (a) and (b)
// are checks over whatever files ARE present and pass trivially — there is nothing yet that could
// violate them — while (c) fails with ENOENT because store.ts is missing. That is the expected
// "fail for the right reason" state, not a defect in the test: see task-3-report.md.

import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const PROGRESS_DIR = dirname(fileURLToPath(import.meta.url));

/** Every `.ts` file physically present in progress/ right now (this file's own directory). */
function progressFiles(): string[] {
  return readdirSync(PROGRESS_DIR).filter((name) => name.endsWith('.ts'));
}

/**
 * Strips `//` line comments and `/* *\/` block comments so a comment that MENTIONS a forbidden
 * pattern (e.g. this very file's prose, which names '../learn/' and describes the callback shape
 * it is checking for) cannot itself trip the structural checks below. None of the files under
 * test rely on `//` appearing inside a string literal, so this is a safe, purely-textual strip.
 * Applied uniformly to every check in this file — not just (c) — because (a)/(b)'s own docstrings
 * above literally contain the substrings they check for (e.g. "import from '../learn/'"), and a
 * raw substring/regex match over an un-stripped file would flag its own explanatory comment. That
 * is exactly the self-referential trap the task called out for (c); it applies here too.
 */
function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
}

function read(file: string): string {
  return stripComments(readFileSync(join(PROGRESS_DIR, file), 'utf8'));
}

// A bare `idb` package import: `from 'idb'` / `from "idb"` / `require('idb')`. Anchored on the
// exact string "idb" between quotes so it does NOT match a relative import of a same-prefixed
// local module (e.g. `from './idb-store'`, `from './idb-helpers'`) — only the npm package name.
const IDB_IMPORT = /from\s+['"]idb['"]|require\(\s*['"]idb['"]\s*\)/;

// A relative import reaching into '../learn/' or '../learn' exactly (not e.g. '../learning-x').
const LEARN_IMPORT = /from\s+['"]\.\.\/learn(?:\/[^'"]*)?['"]/;

describe('module boundary — only idb-store.ts may import "idb" (design §3.1)', () => {
  it('no file other than idb-store.ts contains an idb import', () => {
    for (const file of progressFiles()) {
      if (file === 'idb-store.ts') continue;
      expect(IDB_IMPORT.test(read(file)), `${file} must not import 'idb'`).toBe(false);
    }
  });

  it('idb-store.ts, if present, is the file that imports idb', () => {
    // Deliberately does NOT assert idb-store.ts exists — it is a later task (7-8). If it is not
    // yet on disk this check is vacuous, which is expected at this point in the plan, not a defect.
    if (!progressFiles().includes('idb-store.ts')) return;
    expect(IDB_IMPORT.test(read('idb-store.ts'))).toBe(true);
  });
});

describe('module boundary — progress/ never imports web/src/learn/ (design §3.1)', () => {
  it('no file in progress/ imports from ../learn/', () => {
    for (const file of progressFiles()) {
      expect(LEARN_IMPORT.test(read(file)), `${file} must not import the learn module (../learn)`).toBe(false);
    }
  });
});

describe('store.ts has no callback-shaped operations (design §9.1)', () => {
  it('contains no arrow-typed parameter/property whose return type is Promise<...>', () => {
    // The design's own example of the forbidden shape is an arrow-typed property whose body is a
    // Promise type — the port declares its six operations with METHOD-SIGNATURE syntax instead
    // (`op(args): Promise<X>`), which never produces that token sequence.
    expect(read('store.ts')).not.toMatch(/=>\s*Promise\b/);
  });

  it('contains no AsyncIterable', () => {
    expect(read('store.ts')).not.toMatch(/AsyncIterable/);
  });
});
