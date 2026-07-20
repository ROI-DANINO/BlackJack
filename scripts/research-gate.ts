#!/usr/bin/env node
// Reference gate check for research plans.
// POSITIVE ENUMERATION ONLY: this walks the units the manifest declares and requires each
// artifact to be present and terminal. It never greps for the absence of a failure token —
// that is the defect this script exists to prevent (a missing directory must FAIL, not pass).
// The same rule governs parsing: a line that cannot be parsed is a FAILURE, never a line that
// is silently skipped. A dropped row is absence-as-proof wearing a regex.
import { readFileSync, existsSync } from "node:fs";
import { resolve, sep } from "node:path";

type Manifest = { runDir: string; units: string[] };

// Closed sets. A gate that accepts any non-empty token cannot fail on a typo.
const VERDICTS = ["Preserve", "Relabel", "Revise", "Replace", "Remove"];
const SUFFICIENCIES = ["SUFFICIENT", "INSUFFICIENT"];

const CORRECTION_HEADER = /^\|\s*ID\s*\|\s*Correction\s*\|\s*State\s*\|\s*$/;
const CORRECTION_SEPARATOR = /^\|(?:\s*:?-+:?\s*\|){3}\s*$/;
const CORRECTION_ROW = /^\|\s*(C\d+)\s*\|([^|]*)\|\s*(LANDED|NOT-LANDED)\s*\|\s*$/;

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
// canonical must-fail fixture can be made to pass by editing only the manifest.
const root = resolve(rootArg);
const runDir = resolve(root, manifest.runDir);
if (runDir !== root && !runDir.startsWith(root + sep)) {
  console.error(`ERROR: manifest runDir "${manifest.runDir}" resolves outside root ${root}`);
  console.error("GATE: FAIL (1 of 1 checks failed)");
  process.exit(3);
}

const failures: string[] = [];
let checks = 0;
function check(ok: boolean, msg: string): void {
  checks++;
  if (!ok) failures.push(msg);
}

// A gate over zero units is a gate that cannot fail.
check(manifest.units.length > 0, "manifest enumerates zero units — a gate over nothing cannot pass");
check(existsSync(runDir), `run directory missing: ${runDir}`);

for (const unit of manifest.units) {
  const unitDir = resolve(runDir, unit);

  const auditPath = resolve(unitDir, "audit.md");
  if (!existsSync(auditPath)) {
    check(false, `${unit}: audit.md missing`);
  } else {
    const verdict = readFileSync(auditPath, "utf8").match(/^VERDICT:\s*(\S+)\s*$/m);
    check(
      verdict !== null && VERDICTS.includes(verdict[1]),
      `${unit}: audit.md has no terminal VERDICT: line from {${VERDICTS.join(", ")}}` +
        (verdict ? ` (found "${verdict[1]}")` : ""),
    );
  }

  const verificationPath = resolve(unitDir, "verification.md");
  let sufficiency: string | null = null;
  if (!existsSync(verificationPath)) {
    check(false, `${unit}: verification.md missing`);
  } else {
    const m = readFileSync(verificationPath, "utf8").match(/^SUFFICIENCY:\s*(\S+)\s*$/m);
    const ok = m !== null && SUFFICIENCIES.includes(m[1]);
    check(ok, `${unit}: verification.md has no terminal SUFFICIENCY: line from {${SUFFICIENCIES.join(", ")}}`);
    if (ok) sufficiency = m![1];
  }

  const correctionsPath = resolve(unitDir, "corrections.md");
  const hasCorrections = existsSync(correctionsPath);

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
    const lines = readFileSync(correctionsPath, "utf8").split(/\r?\n/);
    // Enumerate every line that is trying to be a table row. Anything that looks like a row but
    // does not conform is a FAILURE — it must never be filtered out of existence.
    const tableLines = lines.filter((l) => l.trim().startsWith("|"));

    check(
      tableLines.length >= 3,
      `${unit}: corrections.md must contain a header row, a separator row, and at least one correction row (found ${tableLines.length} table line(s))`,
    );

    if (tableLines.length >= 3) {
      check(
        CORRECTION_HEADER.test(tableLines[0]),
        `${unit}: corrections.md header row is malformed, expected "| ID | Correction | State |": ${JSON.stringify(tableLines[0])}`,
      );
      check(
        CORRECTION_SEPARATOR.test(tableLines[1]),
        `${unit}: corrections.md separator row is malformed: ${JSON.stringify(tableLines[1])}`,
      );

      const terminal = new Map<string, string>();
      for (const line of tableLines.slice(2)) {
        const m = line.match(CORRECTION_ROW);
        if (m === null) {
          check(false, `${unit}: corrections.md has a non-conforming correction row: ${JSON.stringify(line)}`);
          continue;
        }
        // Retry path: a later row for the same ID supersedes an earlier one. Without this a
        // superseded NOT-LANDED row would deadlock the gate forever, because verifiers never edit.
        terminal.set(m[1], m[3]);
      }

      check(terminal.size > 0, `${unit}: corrections.md present but contains no correction rows`);
      for (const [id, state] of terminal) {
        check(state === "LANDED", `${unit}: correction ${id} is ${state}`);
      }
    }

    const confirmPath = resolve(unitDir, "landing-confirmation.md");
    if (!existsSync(confirmPath)) {
      check(false, `${unit}: corrections raised but landing-confirmation.md missing`);
    } else {
      // The whole file must be the confirmation. Matching CONFIRMED *somewhere* lets a file that
      // repudiates the landing pass on one stray line.
      check(
        readFileSync(confirmPath, "utf8").trim() === "CONFIRMED",
        `${unit}: landing-confirmation.md must contain exactly "CONFIRMED" and nothing else`,
      );
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
