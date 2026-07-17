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
// (a) and (b) are checked by parsing each file with the TypeScript compiler API and comparing
// exact import/export/require module specifiers (`moduleSpecifiers` below) — not by regex over
// source text. A same-line regex approach was tried and reverted: it missed multi-line imports
// (this file's own store.ts formats its type import that way), `import 'idb'` side-effect
// imports, and `import x = require('idb')`. The AST does not have that failure mode because
// newlines, comments, and string literals elsewhere in the file are not import nodes.
//
// No jsdom pragma: the Vitest environment here is 'node' (web/vite.config.ts), and this file reads
// its own directory off disk with node:fs — that works under 'node', not under a DOM shim.
//
// This test intentionally runs BEFORE store.ts (and idb-store.ts) exist. At that point (a) and (b)
// are checks over whatever files ARE present and pass trivially — there is nothing yet that could
// violate them — while (c) fails with ENOENT because store.ts is missing. That is the expected
// "fail for the right reason" state, not a defect in the test: see task-3-report.md.

import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as ts from 'typescript';

const PROGRESS_DIR = dirname(fileURLToPath(import.meta.url));
const LEARN_DIR = join(PROGRESS_DIR, '..', 'learn');

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
 * Strips `//` line comments and `/* *\/` block comments. Used for ONLY (c)'s `=> Promise` /
 * `AsyncIterable` token search (the token can appear anywhere on a line, so it cannot be anchored
 * to statement position, and comments genuinely can contain the same token sequence). Checks (a)
 * and (b) no longer use this function at all — they parse the file with the TypeScript compiler
 * API instead (`moduleSpecifiers` below), which distinguishes real import/require/export nodes
 * from comments and string literals exactly, by construction, not by textual heuristic. That is
 * what closed the fix-cycle-1 regression: a line-anchored, same-line regex (`IDB_STATIC_IMPORT`,
 * `LEARN_IMPORT`) cannot see a multi-line `import {\n  x,\n} from '...'` — the parser does not
 * care about newlines.
 *
 * `stripComments`'s failure mode is one-directional and silent: every assertion built on `read()`
 * is negative (`.not.toMatch`), so over-stripping can only make a check PASS when it should fail —
 * it can never make one fail spuriously. `.replace(/\/\/.*$/gm, '')` strips to end-of-line
 * unconditionally, so a `//` inside a string literal (e.g. a `'https://...'` URL) truncates
 * whatever real code follows it on that line. `.replace(/\/\*[\s\S]*?\*\//g, '')` will strip
 * everything between a `/*` substring living inside one string literal and a `*\/` substring
 * living inside a LATER, unrelated string literal — including any real code physically between
 * them. Either way, a genuine violation can be erased before the regex ever sees it, and the check
 * goes green having proven nothing. Verified safe against store.ts (the only file (c) reads) at
 * authoring; re-verify before trusting (c) against a new file.
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

/**
 * Parses `file` with the TypeScript compiler API and returns every module specifier it imports,
 * re-exports, or requires — covering, by construction rather than by regex coverage:
 *   - `ImportDeclaration`: `import x from 'm'`, `import {a, b} from 'm'` (single- or multi-line,
 *     the parser does not care), `import type {...} from 'm'`, and side-effect `import 'm'` (an
 *     `ImportDeclaration` with no `importClause`).
 *   - `ExportDeclaration` with a `moduleSpecifier`: `export {a} from 'm'`, `export * from 'm'`.
 *   - `ImportEqualsDeclaration` whose reference is external: `import m = require('m')`.
 *   - dynamic `import('m')` (a `CallExpression` whose callee is the `import` keyword) and CJS
 *     `require('m')` (a `CallExpression` to the identifier `require`), wherever in the file they
 *     appear — not just at statement position.
 * Comments and string literals elsewhere in the file are not import/require nodes, so they can
 * never be mistaken for one; there is no comment-stripping step and no false-negative class from
 * one.
 */
function moduleSpecifiers(file: string): string[] {
  const sourceFile = ts.createSourceFile(file, readRaw(file), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const specifiers: string[] = [];

  function visit(node: ts.Node): void {
    if (ts.isImportDeclaration(node)) {
      if (ts.isStringLiteral(node.moduleSpecifier)) specifiers.push(node.moduleSpecifier.text);
    } else if (ts.isExportDeclaration(node)) {
      if (node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) specifiers.push(node.moduleSpecifier.text);
    } else if (ts.isImportEqualsDeclaration(node)) {
      const ref = node.moduleReference;
      if (ts.isExternalModuleReference(ref) && ts.isStringLiteral(ref.expression)) {
        specifiers.push(ref.expression.text);
      }
    } else if (ts.isCallExpression(node)) {
      const isDynamicImport = node.expression.kind === ts.SyntaxKind.ImportKeyword;
      const isRequireCall = ts.isIdentifier(node.expression) && node.expression.text === 'require';
      if (isDynamicImport || isRequireCall) {
        const arg = node.arguments[0];
        if (arg && ts.isStringLiteral(arg)) specifiers.push(arg.text);
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return specifiers;
}

// The 'idb' package is a bare specifier — an exact string match, no path resolution needed.
function importsIdb(file: string): boolean {
  return moduleSpecifiers(file).includes('idb');
}

// '../learn/...' is a RELATIVE specifier — resolved against the importing file's own directory
// (which varies with recursion depth: 'nested/probe.ts' must write '../../learn/...' to reach the
// same directory that 'store.ts' reaches via '../learn/...'), then compared against the actual
// learn/ directory on disk. This is exact for any nesting depth the recursive `progressFiles()`
// scan can produce, unlike a fixed '../learn' string prefix.
function importsLearn(file: string): boolean {
  const fileDir = join(PROGRESS_DIR, dirname(file));
  return moduleSpecifiers(file).some((specifier) => {
    if (!specifier.startsWith('.')) return false; // only relative specifiers can reach '../learn'
    const resolved = resolve(fileDir, specifier);
    return resolved === LEARN_DIR || resolved.startsWith(LEARN_DIR + sep);
  });
}

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
      expect(importsLearn(file), `${file} must not import the learn module (../learn)`).toBe(false);
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
