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
// `<` is not in the character class. The trailing slash is OPTIONAL — a concrete run-dir
// mention is coupling whether or not it is slash-terminated (e.g. "...p1, which you should
// not need to touch" has no trailing slash but still names a concrete directory). A bare
// mention of the root with nothing after it still can't match: `+` requires at least one
// segment character.
const PHASE_COUPLED = /journal\/raw\/_inbox\/[A-Za-z0-9._-]+\/?/g;

// Program-SCOPE residue: text that states the operating parameters of one specific research
// program as if they were the role's identity. Neutral roles let the dispatch supply the program
// name and its parameters. Each pattern is PRECISE enough to catch scope residue without ever
// matching a legitimate war story — provenance keeps generic words ("Phase 1", "audit",
// "sufficiency"), so none of those are forbidden here. Scanned over the whole file (frontmatter
// description AND body). Each entry is a separately load-bearing check.
const SCOPE_RESIDUE: { pattern: RegExp; label: string }[] = [
  {
    pattern: /Adaptive Learning Foundation Audit/,
    label: "names a specific program (\"Adaptive Learning Foundation Audit\") as the role's identity — the program name is supplied at dispatch, not baked into the role",
  },
  {
    pattern: /Foundation-audit\b/,
    label: "frontmatter scopes the role to one program (\"Foundation-audit …\") — use the neutral \"Research-program …\" form",
  },
  {
    pattern: /program amendment \d/i,
    label: "cites a specific program's amendment number — describe the budget/exemption as dispatch-supplied instead",
  },
  {
    pattern: /_templates\/[^\s`]*\.md/,
    label: "hardcodes a program-specific template path (_templates/….md) that resolves to nothing in a fresh run — name the template the dispatch supplies instead",
  },
];

const rawArgs = process.argv.slice(2);
if (rawArgs.length > 1 || (rawArgs[0] !== undefined && rawArgs[0].startsWith("-"))) {
  console.error("usage: node scripts/research-roles-lint.ts [agentsDir]");
  process.exit(2);
}
const agentsDir = rawArgs[0] ?? ".claude/agents";

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

  // Program-scope residue. Each pattern is one check so a reintroduced instance flips exactly
  // one check — the enumeration is positive: every role must be provably free of every residue
  // class, not merely "no residue was found".
  for (const { pattern, label } of SCOPE_RESIDUE) {
    const hit = src.match(pattern);
    check(hit === null, `${role.name}: program-scope residue — ${label}: ${hit ? JSON.stringify(hit[0]) : ""}`);
  }
}

console.log(`research-roles-lint: ${checks} checks over ${CONTRACT.length} roles in ${agentsDir}`);
if (failures.length > 0) {
  for (const f of failures) console.error(`ERROR: ${f}`);
  console.error(`FAIL: ${failures.length} of ${checks} checks failed`);
  process.exit(3);
}
console.log("PASS: role contract satisfied");
