#!/usr/bin/env node
// Reference gate check for research plans.
//
// POSITIVE ENUMERATION ONLY: this walks the units the manifest declares and requires each
// artifact to be present and terminal. It never greps for the absence of a failure token —
// that is the defect this script exists to prevent (a missing directory must FAIL, not pass).
//
// Canonical corrections.md shape: scripts/fixtures/research-gate/TEMPLATE-corrections.md
//
// Four class rules govern every check in this file. Each is ONE shared mechanism applied
// to every artifact the gate reads — audit.md, verification.md, corrections.md,
// landing-confirmation.md — never a per-artifact copy:
//   1. Signal lines: in EVERY artifact, a line that carries a terminal signal but which
//      the parser cannot place is a FAILURE, never a skip. In audit.md/verification.md
//      that is any line-start VERDICT:/SUFFICIENCY: candidate that is not exactly
//      "FIELD: <value>" with a value from the closed set (terminalValue). In
//      corrections.md it is any line the table grammar cannot place plus any out-of-table
//      line carrying correction state or a terminal keyword (parseCorrections). In
//      landing-confirmation.md, whole-file equality makes every line load-bearing by
//      construction.
//   2. Multiplicity: audit.md and verification.md must each carry EXACTLY ONE conforming
//      terminal line. Zero is an unassessed unit; more than one is the founding defect —
//      a legend of possible outcomes self-matching the gate — and unlike "last one wins",
//      multiplicity cannot be gamed by ordering. (Correction rows instead use
//      last-row-wins per ID, because that ledger is append-only — verifiers cannot edit.
//      A retry must repeat the description verbatim; a changed description is a different
//      correction and needs a different ID.)
//   3. Containment: EVERY filesystem path derived from manifest input must be proven to
//      resolve inside the root the gate was handed — lexically after resolve() AND
//      physically after realpath of its deepest existing ancestor. KNOWN LIMITS, stated
//      rather than overclaimed: realpath does not see HARDLINKS (a hardlink inside root
//      to an outside inode still reads the outside content), and there is a TOCTOU window
//      between the containment proof and the read. Neither is defended: this is a local
//      gate over a git checkout, not a sandbox against a concurrently mutating attacker.
//   4. Reads: an artifact that exists but cannot be read (a directory where a file was
//      expected, a permission error) is a gate FAILURE for that unit; the loop continues
//      and every remaining unit is still checked. Declared exits are exactly
//      {0 = PASS, 2 = usage error, 3 = gate FAIL} — never an uncaught crash.
//
// DELIBERATE non-check: the gate requires that a VERDICT from the taxonomy was reached;
// what the value means downstream (Preserve vs Remove) is a later-phase concern, not an
// oversight here.
import { readFileSync, existsSync, realpathSync } from "node:fs";
import { dirname, resolve, sep } from "node:path";

type Manifest = { runDir: string; units: string[] };

// Closed sets. A gate that accepts any non-empty token cannot fail on a typo.
const VERDICTS = ["Preserve", "Relabel", "Revise", "Replace", "Remove"];
const SUFFICIENCIES = ["SUFFICIENT", "INSUFFICIENT"];

const CORRECTION_HEADER = /^\|\s*ID\s*\|\s*Correction\s*\|\s*State\s*\|\s*$/;
const CORRECTION_SEPARATOR = /^\|(?:\s*:?-+:?\s*\|){3}\s*$/;
// The description cell accepts the standard GFM escape \| for a literal pipe.
const CORRECTION_ROW = /^\|\s*(C\d+)\s*\|((?:\\.|[^|\\])*)\|\s*(LANDED|NOT-LANDED)\s*\|\s*$/;
// Rule 1's candidate net: any line that LOOKS like it opens a terminal field is a signal
// line and must be placed by the parser or fail. Deliberately wider than the conforming
// grammar — an indented or oddly spaced "VERDICT :" still reads as a verdict to a human.
const SIGNAL_LINE = /^[ \t]*(VERDICT|SUFFICIENCY)[ \t]*:/;
// A correction-state token anywhere in an out-of-table line is a smuggled correction.
// LANDED is a substring of NOT-LANDED, so one test covers both states.
const CORRECTION_SIGNAL = /LANDED/;

function usage(msg: string): never {
  console.error(`usage error: ${msg}`);
  console.error("usage: node scripts/research-gate.ts <manifest.json> [root]");
  process.exit(2);
}

const manifestPath = process.argv[2];
const rootArg = process.argv[3] ?? ".";
if (!manifestPath) usage("no manifest path given");

let raw: string;
try {
  raw = readFileSync(manifestPath, "utf8");
} catch (err) {
  usage(`cannot read manifest ${manifestPath}: ${(err as Error).message}`);
}

let parsed: unknown;
try {
  parsed = JSON.parse(raw);
} catch (err) {
  usage(`manifest ${manifestPath} is not valid JSON: ${(err as Error).message}`);
}

// Validate the manifest shape positively: every required field must be present and of the
// declared type. A malformed manifest is a usage error (2), not a gate verdict (3).
if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
  usage("manifest must be a JSON object");
}
const obj = parsed as Record<string, unknown>;
if (typeof obj.runDir !== "string" || obj.runDir.length === 0) {
  usage('manifest must have a non-empty string "runDir"');
}
if (!Array.isArray(obj.units)) {
  usage('manifest must have an array "units"');
}
if (!obj.units.every((u) => typeof u === "string" && u.length > 0)) {
  usage('every entry in manifest "units" must be a non-empty string');
}
const manifest: Manifest = { runDir: obj.runDir, units: obj.units as string[] };

// A manifest must not be able to point the gate outside the root it was handed, or the
// canonical must-fail fixture can be made to pass by editing only the manifest. Root is
// canonicalized once; every manifest-derived path must then prove BOTH lexical containment
// (no ".." survives resolve) and physical containment (the realpath of its deepest existing
// ancestor stays under root — a symlink inside root pointing outside must fail HERE, not be
// followed by readFileSync later). Root itself is CLI input, so a root that cannot be
// canonicalized is a usage error (2), not a crash.
const rootAbs = resolve(rootArg);
let root: string;
try {
  root = existsSync(rootAbs) ? realpathSync(rootAbs) : rootAbs;
} catch (err) {
  usage(`cannot canonicalize root ${rootArg}: ${(err as Error).message}`);
}

function insideRoot(p: string): boolean {
  if (p !== root && !p.startsWith(root + sep)) return false;
  let probe = p;
  while (probe !== root && !existsSync(probe)) probe = dirname(probe);
  if (!existsSync(probe)) return true; // nothing on this branch exists yet — no link to follow
  try {
    const real = realpathSync(probe);
    return real === root || real.startsWith(root + sep);
  } catch {
    return false; // a path that cannot be canonicalized is not PROVEN inside — fail safe
  }
}

const runDir = resolve(root, manifest.runDir);
if (!insideRoot(runDir)) {
  console.error(`ERROR: manifest runDir "${manifest.runDir}" resolves outside root ${root}`);
  console.error("GATE: FAIL (1 of 1 checks failed)");
  process.exit(3);
}

const failures: string[] = [];
let checks = 0;
function check(ok: boolean, msg: string): boolean {
  checks++;
  if (!ok) failures.push(msg);
  return ok;
}

// Rule 4: readFileSync on a contained, existing path can still throw (EISDIR, EACCES).
// Every artifact read goes through here so an unreadable artifact is a per-unit gate
// failure (exit 3) and never an uncaught exit-1 crash that leaves later units unchecked.
function readArtifact(path: string, unit: string, name: string): string | null {
  try {
    return readFileSync(path, "utf8");
  } catch (err) {
    check(
      false,
      `${unit}: ${name} exists but cannot be read (${(err as Error).message}) — an unreadable artifact is a gate failure, never a crash`,
    );
    return null;
  }
}

// Rules 1 + 2 for audit.md and verification.md — one mechanism for both fields.
// Enumerates every candidate signal line (SIGNAL_LINE, wider than the grammar): a foreign
// field's line, a line the grammar cannot place, and a value outside the closed set are
// each failures. Exactly one conforming line is required; its value is returned.
function terminalValue(
  text: string,
  unit: string,
  artifact: string,
  field: string,
  allowed: string[],
): string | null {
  const conform = new RegExp(`^${field}:\\s*(\\S+)\\s*$`);
  const conforming: string[] = [];
  for (const line of text.split(/\r?\n/)) {
    const sig = line.match(SIGNAL_LINE);
    if (sig === null) continue;
    if (sig[1] !== field) {
      check(
        false,
        `${unit}: ${artifact} carries a ${sig[1]}: signal line, which does not belong in ${artifact}: ${JSON.stringify(line)}`,
      );
      continue;
    }
    const m = line.match(conform);
    if (m === null) {
      check(
        false,
        `${unit}: ${artifact} has a ${field}: line the parser cannot place — a terminal line must be exactly "${field}: <value>" and nothing else: ${JSON.stringify(line)}`,
      );
      continue;
    }
    if (!allowed.includes(m[1])) {
      check(
        false,
        `${unit}: ${artifact} ${field}: value is outside {${allowed.join(", ")}}: ${JSON.stringify(m[1])}`,
      );
      continue;
    }
    conforming.push(m[1]);
  }
  if (conforming.length === 0) {
    check(false, `${unit}: ${artifact} has no conforming terminal ${field}: line from {${allowed.join(", ")}}`);
    return null;
  }
  const single = check(
    conforming.length === 1,
    `${unit}: ${artifact} has ${conforming.length} conforming ${field}: lines — exactly one is required; a legend of possible outcomes must not be able to satisfy the gate`,
  );
  return single ? conforming[0] : null;
}

// Rule 1 for corrections.md: the file is prose plus EXACTLY ONE contiguous correction
// table (header row, separator row, then rows, ending at the first blank line). Prose
// outside the table — a title, a trailing note — is permitted and ignored, BUT any
// out-of-table line carrying a correction-state token or a terminal keyword is a smuggled
// signal and FAILS. Inside the table every line must be placed; failures name the actual
// offending line. Canonical shape: scripts/fixtures/research-gate/TEMPLATE-corrections.md
function parseCorrections(text: string, unit: string): void {
  const lines = text.split(/\r?\n/);
  const headerIdx = lines.findIndex((l) => CORRECTION_HEADER.test(l));
  let blockEnd = headerIdx;
  if (headerIdx !== -1) {
    while (blockEnd < lines.length && lines[blockEnd].trim().length > 0) blockEnd++;
  }

  for (let i = 0; i < lines.length; i++) {
    if (headerIdx !== -1 && i >= headerIdx && i < blockEnd) continue;
    const line = lines[i];
    if (line.trim().length === 0) continue;
    check(
      !CORRECTION_SIGNAL.test(line) && !SIGNAL_LINE.test(line),
      `${unit}: corrections.md carries a correction or terminal signal outside the correction table: ${JSON.stringify(line)}`,
    );
  }

  if (
    !check(
      headerIdx !== -1,
      `${unit}: corrections.md has no correction table — expected a "| ID | Correction | State |" header row (see scripts/fixtures/research-gate/TEMPLATE-corrections.md)`,
    )
  ) {
    return;
  }

  const block = lines.slice(headerIdx, blockEnd);
  check(
    block.length >= 3,
    `${unit}: corrections.md table must be one contiguous block: header row, separator row, and at least one correction row (found ${block.length} contiguous line(s))`,
  );
  if (block.length >= 2) {
    check(
      CORRECTION_SEPARATOR.test(block[1]),
      `${unit}: corrections.md separator row is malformed: ${JSON.stringify(block[1])}`,
    );
  }

  const terminal = new Map<string, { desc: string; state: string }>();
  let malformedRows = 0;
  for (const line of block.slice(2)) {
    const m = line.match(CORRECTION_ROW);
    if (m === null) {
      malformedRows++;
      check(false, `${unit}: corrections.md has a non-conforming correction row: ${JSON.stringify(line)}`);
      continue;
    }
    const id = m[1];
    const desc = m[2].trim();
    const state = m[3];
    const prev = terminal.get(id);
    if (prev !== undefined && prev.desc !== desc) {
      // ID reuse must be a genuine retry, or any unresolved correction could be retired
      // by appending a trivial row under the same ID.
      check(
        false,
        `${unit}: correction ${id} is reused with a different description — a retry must repeat the description verbatim; a different correction needs a different ID (${JSON.stringify(prev.desc)} vs ${JSON.stringify(desc)})`,
      );
      continue; // the earlier row keeps governing; a mismatched row cannot retire it
    }
    // Retry path: a later row for the same ID (same description) supersedes an earlier
    // one. Without this a superseded NOT-LANDED row would deadlock the gate forever,
    // because verifiers never edit.
    terminal.set(id, { desc, state });
  }

  if (block.length >= 3 && malformedRows === 0) {
    check(terminal.size > 0, `${unit}: corrections.md table contains no correction rows`);
  }
  for (const [id, { state }] of terminal) {
    check(state === "LANDED", `${unit}: correction ${id} is ${state}`);
  }
}

// A gate over zero units is a gate that cannot fail.
check(manifest.units.length > 0, "manifest enumerates zero units — a gate over nothing cannot pass");
check(existsSync(runDir), `run directory missing: ${runDir}`);

for (const unit of manifest.units) {
  const unitDir = resolve(runDir, unit);
  if (!check(insideRoot(unitDir), `${unit}: unit path resolves outside root ${root}`)) {
    continue; // never read through an escaping path
  }

  const auditPath = resolve(unitDir, "audit.md");
  if (check(insideRoot(auditPath), `${unit}: audit.md resolves outside root ${root}`)) {
    if (!existsSync(auditPath)) {
      check(false, `${unit}: audit.md missing`);
    } else {
      const text = readArtifact(auditPath, unit, "audit.md");
      if (text !== null) terminalValue(text, unit, "audit.md", "VERDICT", VERDICTS);
    }
  }

  let sufficiency: string | null = null;
  const verificationPath = resolve(unitDir, "verification.md");
  if (check(insideRoot(verificationPath), `${unit}: verification.md resolves outside root ${root}`)) {
    if (!existsSync(verificationPath)) {
      check(false, `${unit}: verification.md missing`);
    } else {
      const text = readArtifact(verificationPath, unit, "verification.md");
      if (text !== null) {
        sufficiency = terminalValue(text, unit, "verification.md", "SUFFICIENCY", SUFFICIENCIES);
      }
    }
  }

  const correctionsPath = resolve(unitDir, "corrections.md");
  const correctionsContained = check(
    insideRoot(correctionsPath),
    `${unit}: corrections.md resolves outside root ${root}`,
  );
  const hasCorrections = correctionsContained && existsSync(correctionsPath);

  // An INSUFFICIENT verdict means the verifier raised a problem, so the loop must have closed.
  // Accepting INSUFFICIENT with nothing recorded would make it a terminal state that passes
  // unconditionally.
  if (sufficiency === "INSUFFICIENT") {
    check(
      hasCorrections,
      `${unit}: SUFFICIENCY is INSUFFICIENT but corrections.md is missing — an insufficient verdict must be closed by landed corrections`,
    );
  }

  if (hasCorrections) {
    const text = readArtifact(correctionsPath, unit, "corrections.md");
    if (text !== null) parseCorrections(text, unit);

    const confirmPath = resolve(unitDir, "landing-confirmation.md");
    if (check(insideRoot(confirmPath), `${unit}: landing-confirmation.md resolves outside root ${root}`)) {
      if (!existsSync(confirmPath)) {
        check(false, `${unit}: corrections raised but landing-confirmation.md missing`);
      } else {
        // The whole file must be the confirmation. Matching CONFIRMED *somewhere* lets a file
        // that repudiates the landing pass on one stray line.
        const confirmation = readArtifact(confirmPath, unit, "landing-confirmation.md");
        if (confirmation !== null) {
          check(
            confirmation.trim() === "CONFIRMED",
            `${unit}: landing-confirmation.md must contain exactly "CONFIRMED" and nothing else`,
          );
        }
      }
    }
  }
}

console.log(`research-gate: ${checks} checks over ${manifest.units.length} unit(s) in ${runDir}`);
if (failures.length > 0) {
  for (const f of failures) console.error(`ERROR: ${f}`);
  console.error(`GATE: FAIL (${failures.length} of ${checks} checks failed)`);
  process.exit(3);
}
console.log("GATE: PASS");
