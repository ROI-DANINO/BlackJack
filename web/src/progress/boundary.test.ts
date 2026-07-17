// The module-boundary tests for progress/ (design §3.1, §9.1). These are structural checks over
// SOURCE TEXT, not behavior tests — they prove the port's SHAPE enforces the constraints that make
// an `idb` reversal (§2.1) and an async-caller-over-sync-transaction (§9) survivable:
//
//   (a) only progress/idb-store.ts may import the 'idb' package (design §3.1's file table; the
//       single-import rule is "enforced by a test, not by convention").
//   (b) no file in progress/ may import from '../learn/' (design §3.1 — the durable attempt is a
//       different type from learn/types.ts's in-memory AttemptRecord; importing it would couple
//       progress storage to lesson-authoring churn).
//   (c) store.ts's source contains no `=> Promise` token sequence and no `AsyncIterable` token —
//       one textual SHAPE of a design §9.1 violation (an arrow-typed callback parameter/property
//       whose return type is literally written `Promise<...>`), not the rule itself. It is a
//       token lint, not a structural proof: it cannot detect a sync callback
//       (`(fn: () => void) => Promise<X>`), a callback type reached through an alias
//       (`type Cb = () => Promise<X>` used as a parameter type), an `Iterable`, or a
//       `ReadableStream`. §9.1's real enforcement is the port's TYPES — method-signature syntax
//       for the six operations, a call-signature interface for the factory — which make the
//       forbidden shape awkward to write by accident; this check only catches the case where
//       someone writes it anyway with the exact `=>` + `Promise` token sequence.
//
// No jsdom pragma: the Vitest environment here is 'node' (web/vite.config.ts), and this file reads
// its own directory off disk with node:fs — that works under 'node', not under a DOM shim.
//
// This test intentionally runs BEFORE store.ts (and idb-store.ts) exist. At that point (a) and (b)
// are checks over whatever files ARE present and pass trivially — there is nothing yet that could
// violate them — while (c) fails with ENOENT because store.ts is missing. That is the expected
// "fail for the right reason" state, not a defect in the test: see task-3-report.md.

import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const PROGRESS_DIR = dirname(fileURLToPath(import.meta.url));

/**
 * Every `.ts` file physically present in progress/ right now, recursively — so a future nested
 * file (e.g. `progress/adapters/idb-store.ts`, `progress/internal/*.ts`) is not invisible to
 * checks (a)/(b). Paths are relative to `PROGRESS_DIR` with forward slashes (e.g. `store.ts`,
 * `adapters/idb-store.ts'), matching how `read()` and the `idb-store.ts` exemption below compare.
 */
function progressFiles(): string[] {
  return readdirSync(PROGRESS_DIR, { withFileTypes: true, recursive: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.ts'))
    .map((entry) => join(relative(PROGRESS_DIR, entry.parentPath), entry.name).split(sep).join('/'));
}

/**
 * Strips `//` line comments and `/* *\/` block comments. Used for two things ONLY: (c)'s
 * `=> Promise` / `AsyncIterable` token search (the token can appear anywhere on a line, so it
 * cannot be anchored to statement position) and (a)'s DYNAMIC `import('idb')` sub-check (real
 * usage — `const x = await import('idb')` — does not begin its line either, so it can't be told
 * apart from a comment mentioning the same syntax by position alone). (a)'s static import/require
 * forms and all of (b) do NOT go through this function; they test raw, un-stripped source with
 * line-anchored regexes instead (`IDB_STATIC_IMPORT`, `LEARN_IMPORT` below), specifically to avoid
 * this function's failure mode.
 *
 * That failure mode is one-directional and silent: every assertion built on `read()` is negative
 * (`.not.toMatch`, `.toBe(false)`), so over-stripping can only make a check PASS when it should
 * fail — it can never make one fail spuriously. `.replace(/\/\/.*$/gm, '')` strips to end-of-line
 * unconditionally, so a `//` inside a string literal (e.g. a `'https://...'` URL) truncates
 * whatever real code follows it on that line. `.replace(/\/\*[\s\S]*?\*\//g, '')` will strip
 * everything between a `/*` substring living inside one string literal and a `*\/` substring
 * living inside a LATER, unrelated string literal — including any real code physically between
 * them. Either way, a genuine violation can be erased before the regex ever sees it, and the check
 * goes green having proven nothing.
 *
 * Verified safe against the files present at authoring (store.ts, boundary.test.ts, canonical.ts,
 * canonical.test.ts, fixtures.ts, types.ts, types.test.ts) — none relies on `//` inside a string
 * literal or on `/*`/`*\/` split across separate string literals. That is a property of THOSE
 * files, not a property of this function: re-verify it against any new file (fake-store.ts,
 * idb-store.ts, ...) before trusting (c) or (a)'s dynamic-import sub-check against it.
 */
function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
}

function readRaw(file: string): string {
  return readFileSync(join(PROGRESS_DIR, file), 'utf8');
}

function read(file: string): string {
  return stripComments(readRaw(file));
}

// A real static `idb` import/re-export/require begins its own line (module syntax requires it —
// this repo has zero comment lines starting with `import`/`export`/`require(`, verified at
// authoring), so this is tested against RAW source: nothing for `stripComments` to over-reach
// into, and no self-reference risk from prose describing the pattern.
const IDB_STATIC_IMPORT =
  /^\s*(?:import|export)\b[^\n]*\bfrom\s+['"]idb['"]|^\s*(?:const|let|var)\b[^\n]*\brequire\(\s*['"]idb['"]\s*\)|^\s*require\(\s*['"]idb['"]\s*\)/m;

// A dynamic `import('idb')` — real usage is NOT line-anchored (`const x = await import('idb')`),
// so this sub-check is tested against `read()`'s comment-stripped source instead; see
// `stripComments`'s docstring for the residual risk that carries.
const IDB_DYNAMIC_IMPORT = /import\(\s*['"]idb['"]\s*\)/;

function importsIdb(file: string): boolean {
  return IDB_STATIC_IMPORT.test(readRaw(file)) || IDB_DYNAMIC_IMPORT.test(read(file));
}

// A relative import/re-export reaching into '../learn/' or '../learn' exactly (not e.g.
// '../learning-x'). Anchored to statement start for the same reason as IDB_STATIC_IMPORT above —
// tested against RAW source, no `stripComments` involved, no self-reference risk.
const LEARN_IMPORT = /^\s*(?:import|export)\b[^\n]*\bfrom\s+['"]\.\.\/learn(?:\/[^'"]*)?['"]/m;

describe('module boundary — only idb-store.ts may import "idb" (design §3.1)', () => {
  it('no file other than idb-store.ts contains an idb import', () => {
    for (const file of progressFiles()) {
      if (file === 'idb-store.ts') continue;
      expect(importsIdb(file), `${file} must not import 'idb'`).toBe(false);
    }
  });

  it('idb-store.ts, if present, is the file that imports idb', () => {
    // Deliberately does NOT assert idb-store.ts exists — it is a later task (7-8). If it is not
    // yet on disk this check is vacuous, which is expected at this point in the plan, not a defect.
    if (!progressFiles().includes('idb-store.ts')) return;
    expect(importsIdb('idb-store.ts')).toBe(true);
  });
});

describe('module boundary — progress/ never imports web/src/learn/ (design §3.1)', () => {
  it('no file in progress/ imports from ../learn/', () => {
    for (const file of progressFiles()) {
      expect(LEARN_IMPORT.test(readRaw(file)), `${file} must not import the learn module (../learn)`).toBe(false);
    }
  });
});

describe('store.ts contains no `=> Promise` / `AsyncIterable` tokens (one shape of design §9.1)', () => {
  it('contains no arrow-typed parameter/property whose return type is literally Promise<...>', () => {
    // The design's own example of the forbidden shape is an arrow-typed property whose body is a
    // Promise type — the port declares its six operations with METHOD-SIGNATURE syntax instead
    // (`op(args): Promise<X>`), which never produces that token sequence. This is a textual proxy
    // for one shape of a §9.1 violation, not a structural proof of the rule itself — see the file
    // header for what it does and does not catch.
    expect(read('store.ts')).not.toMatch(/=>\s*Promise\b/);
  });

  it('contains no AsyncIterable', () => {
    expect(read('store.ts')).not.toMatch(/AsyncIterable/);
  });
});
