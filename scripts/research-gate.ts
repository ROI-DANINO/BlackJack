#!/usr/bin/env node
// Reference gate check for research plans.
// POSITIVE ENUMERATION ONLY: this walks the units the manifest declares and requires each
// artifact to be present and terminal. It never greps for the absence of a failure token —
// that is the defect this script exists to prevent (a missing directory must FAIL, not pass).
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

type Manifest = { runDir: string; units: string[] };

const manifestPath = process.argv[2];
const root = process.argv[3] ?? ".";
if (!manifestPath) {
  console.error("usage: node scripts/research-gate.ts <manifest.json> [root]");
  process.exit(2);
}

const manifest: Manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const runDir = join(root, manifest.runDir);

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
  const unitDir = join(runDir, unit);

  const auditPath = join(unitDir, "audit.md");
  if (!existsSync(auditPath)) {
    check(false, `${unit}: audit.md missing`);
  } else {
    check(/^VERDICT:\s*\S+/m.test(readFileSync(auditPath, "utf8")), `${unit}: audit.md has no VERDICT: line`);
  }

  const verificationPath = join(unitDir, "verification.md");
  if (!existsSync(verificationPath)) {
    check(false, `${unit}: verification.md missing`);
  } else {
    check(
      /^SUFFICIENCY:\s*(SUFFICIENT|INSUFFICIENT)\s*$/m.test(readFileSync(verificationPath, "utf8")),
      `${unit}: verification.md has no terminal SUFFICIENCY: line`,
    );
  }

  const correctionsPath = join(unitDir, "corrections.md");
  if (existsSync(correctionsPath)) {
    const rows = [
      ...readFileSync(correctionsPath, "utf8").matchAll(/^\|\s*(C\d+)\s*\|.*\|\s*(LANDED|NOT-LANDED)\s*\|/gm),
    ];
    // Retry path: a later row for the same ID supersedes an earlier one. Without this a
    // superseded NOT-LANDED row would deadlock the gate forever, because verifiers never edit.
    const terminal = new Map<string, string>();
    for (const row of rows) terminal.set(row[1], row[2]);

    check(terminal.size > 0, `${unit}: corrections.md present but contains no correction rows`);
    for (const [id, state] of terminal) {
      check(state === "LANDED", `${unit}: correction ${id} is ${state}`);
    }

    const confirmPath = join(unitDir, "landing-confirmation.md");
    if (!existsSync(confirmPath)) {
      check(false, `${unit}: corrections raised but landing-confirmation.md missing`);
    } else {
      check(
        /^CONFIRMED\s*$/m.test(readFileSync(confirmPath, "utf8")),
        `${unit}: landing-confirmation.md is not CONFIRMED`,
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
