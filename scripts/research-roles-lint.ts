#!/usr/bin/env node
// Role-contract lint for the research-plan role set.
// Positively enumerates the four required roles: a missing definition FAILS.
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

type Role = { name: string; tools: string[] };

// The role contract. Tool grants are exact and ordered.
const CONTRACT: Role[] = [
  { name: "audit-collector", tools: ["WebSearch", "WebFetch", "Read", "Write", "Edit", "Glob", "Grep"] },
  { name: "audit-editor",    tools: ["WebFetch", "Read", "Write", "Edit", "Glob", "Grep"] },
  { name: "audit-verifier",  tools: ["WebSearch", "WebFetch", "Read", "Write", "Glob", "Grep"] },
  { name: "audit-auditor",   tools: ["Read", "Write", "Glob", "Grep"] },
];

const ALLOWLIST_ROOT = "journal/raw/_inbox/<run-dir>/";
// Any concrete segment under the inbox root is phase coupling. `<run-dir>` cannot match:
// `<` is not in the character class.
const PHASE_COUPLED = /journal\/raw\/_inbox\/[A-Za-z0-9._-]+\//g;

const agentsDir = process.argv[2] ?? ".claude/agents";

const failures: string[] = [];
let checks = 0;
function check(ok: boolean, msg: string): void {
  checks++;
  if (!ok) failures.push(msg);
}

for (const role of CONTRACT) {
  const path = join(agentsDir, `${role.name}.md`);
  if (!existsSync(path)) {
    check(false, `${role.name}: definition missing at ${path}`);
    continue;
  }
  const src = readFileSync(path, "utf8");
  const fm = /^---\n([\s\S]*?)\n---/.exec(src);
  if (!fm) {
    check(false, `${role.name}: no YAML frontmatter`);
    continue;
  }
  const front = fm[1];
  const body = src.slice(fm[0].length);

  const nameLine = /^name:\s*(.+)$/m.exec(front);
  check(nameLine?.[1].trim() === role.name, `${role.name}: frontmatter name must equal "${role.name}"`);

  const descLine = /^description:\s*(.+)$/m.exec(front);
  check((descLine?.[1].trim().length ?? 0) > 0, `${role.name}: description missing or empty`);

  const toolsLine = /^tools:\s*(.+)$/m.exec(front);
  const tools = toolsLine ? toolsLine[1].split(",").map((t) => t.trim()).filter(Boolean) : [];
  check(
    JSON.stringify(tools) === JSON.stringify(role.tools),
    `${role.name}: tools must be exactly [${role.tools.join(", ")}], got [${tools.join(", ")}]`,
  );
  check(!tools.includes("Bash"), `${role.name}: must not grant Bash`);

  check(body.includes(ALLOWLIST_ROOT), `${role.name}: must state the allowlist root ${ALLOWLIST_ROOT}`);

  const coupled = body.match(PHASE_COUPLED);
  check(coupled === null, `${role.name}: phase-coupled path(s) present: ${coupled?.join(", ")}`);
}

console.log(`research-roles-lint: ${checks} checks over ${CONTRACT.length} roles in ${agentsDir}`);
if (failures.length > 0) {
  for (const f of failures) console.error(`ERROR: ${f}`);
  console.error(`FAIL: ${failures.length} of ${checks} checks failed`);
  process.exit(3);
}
console.log("PASS: role contract satisfied");
