# `research-plan` Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: use `subagent-driven-development` (recommended) or
> `executing-plans` to run this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for
> tracking.

**Status: DRAFT — awaiting user approval.**

**Goal:** Ship a phase-neutral `research-plan` skill and its four-role agent set, so a research plan
cannot dispatch those roles without closing the produce → verify → land → confirm loop the roles
already assume.

**Architecture:** Two executable checks land first and act as the tests for everything after them —
`research-roles-lint.ts` validates the four role definitions against a hardcoded role contract, and
`research-gate.ts` is the reference positive-enumeration gate check, proven against nine fixtures
including the empty-directory case that shipped broken twice. The three existing role defs are then
made phase-neutral (static allowlist root, dispatch supplies only a subdirectory name), a new
program-integrity `audit-auditor` role is added, and the skill itself is written last so it can
reference the concrete artifacts by path.

**Tech Stack:** TypeScript executed directly by Node (type-stripping), matching `scripts/kanban.ts`.
Markdown for the skill and role definitions. No test framework at repo root — fixture tests are
explicit runs with asserted exit codes, matching existing repo practice.

<!-- wl:criteria -->
## Acceptance criteria (four elements)

1. **Complete** — all four role defs exist and pass the role lint; the gate script returns the
   required verdict on all nine fixtures; the skill exists and names P1–P5, I1–I4, and the D6
   ordering constraint.
2. **Honest** — the plan does not describe path scoping or instance separation as tool-enforced.
   Both are dispatch discipline checked at the gate, and the artifacts say so.
3. **Separated** — the role contract keeps produce, verify, land, and confirm in different hands;
   no def grants a capability that would let one role perform another's job.
4. **Bounded** — this ships the skill and roles only. Phase 2 does not execute, and the Phase 2 plan
   is not re-expressed here.
<!-- /wl:criteria -->

---

## Global Constraints

From `docs/superpowers/specs/2026-07-20-research-plan-skill-design.md` and `AGENTS.md`. Every task
inherits these.

- **Compose, do not fork** (D1). The skill inherits `writing-plans`' discipline by reference — no
  placeholders, Files/Interfaces, right-sizing, self-review — and adds only P1–P5.
- **Containment is a static allowlist root** (D2). `journal/raw/_inbox/` stays hardcoded in every
  def; the dispatch supplies only a bare subdirectory name. Never move the root into the prompt.
- **Path scoping and instance separation are NOT tool-enforced.** No tool grant expresses them. They
  are dispatch discipline, checked at the gate. Do not write copy that implies otherwise.
- **The auditor audits process, not evidence** (D3). No `WebSearch`, no `WebFetch`, no `Edit`.
- **War stories stay as named provenance** (D4). Do not genericize the Phase 1 specifics out of the
  role defs; a rule carrying its documented failure is this repo's admission standard.
- **Skill global, role defs in-repo** (D5). `~/.claude/skills/research-plan/SKILL.md`;
  `.claude/agents/*.md`.
- **Gate checks enumerate positively** (D7). Never grep for the absence of a failure token. A
  missing directory must FAIL.
- **No fifth role.** Four are justified by Phase 1/2 evidence.
- **No product code changes.** Markdown and two scripts only.
- **Role defs keep the `audit-` prefix** (spec Q1, pending user confirmation). If the user rules
  otherwise, rename in Task 2 before the lint contract is written to disk.

---

## File Structure

| File | Responsibility |
|---|---|
| `scripts/research-roles-lint.ts` | Validates the four role defs against the role contract. Positively enumerates the four expected roles — a missing def fails. |
| `scripts/research-gate.ts` | Reference positive-enumeration gate check. Takes a manifest + a root; verifies per-unit artifacts and correction landing. |
| `scripts/fixtures/research-gate/manifest.json` | Shared one-unit manifest driving every fixture that does not carry its own. |
| `scripts/fixtures/research-gate/{empty,clean,violating,retry,malformed-corrections,unit-traversal,symlink-escape,gfm-escape,non-terminal-verdict}/` | The nine D7 fixtures (`unit-traversal/` carries its own `manifest.json`; `symlink-escape/run` is a committed relative symlink). |
| `.claude/agents/audit-collector.md` | Collector role, phase-neutral. |
| `.claude/agents/audit-editor.md` | Editor role, phase-neutral. |
| `.claude/agents/audit-verifier.md` | Verifier role, phase-neutral. |
| `.claude/agents/audit-auditor.md` | **New.** Program-integrity auditor. |
| `~/.claude/skills/research-plan/SKILL.md` | The skill. |

---

## Tasks

### Task 1: The role-contract lint

The lint lands before the defs it checks, so the defs have a failing test to satisfy.

**Files:**
- Create: `scripts/research-roles-lint.ts`

**Interfaces:**
- Produces: CLI `node scripts/research-roles-lint.ts [agentsDir]`, default `agentsDir` =
  `.claude/agents`. Exit `0` = PASS, `3` = contract violated, `2` = usage error.
- Produces: the role contract itself — the four role names and their exact tool grants — consumed by
  Tasks 2 and 3.

- [ ] **Step 1: Confirm the lint does not yet exist**

Run: `test ! -e scripts/research-roles-lint.ts && echo ABSENT`
Expected: `ABSENT`

- [ ] **Step 2: Write the lint**

Create `scripts/research-roles-lint.ts`:

```ts
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
}

console.log(`research-roles-lint: ${checks} checks over ${CONTRACT.length} roles in ${agentsDir}`);
if (failures.length > 0) {
  for (const f of failures) console.error(`ERROR: ${f}`);
  console.error(`FAIL: ${failures.length} of ${checks} checks failed`);
  process.exit(3);
}
console.log("PASS: role contract satisfied");
```

- [ ] **Step 3: Run it against the current defs, confirm it fails**

Run: `node scripts/research-roles-lint.ts; echo "EXIT=$?"`

Expected, verbatim (this output was confirmed empirically while writing this plan — the tool-grant
checks already pass, so only the path and the missing role fail):

```
research-roles-lint: 19 checks over 4 roles in .claude/agents
ERROR: audit-collector: must state the allowlist root journal/raw/_inbox/<run-dir>/
ERROR: audit-collector: phase-coupled path(s) present: journal/raw/_inbox/foundation-audit-p1/
ERROR: audit-editor: must state the allowlist root journal/raw/_inbox/<run-dir>/
ERROR: audit-editor: phase-coupled path(s) present: journal/raw/_inbox/foundation-audit-p1/
ERROR: audit-verifier: must state the allowlist root journal/raw/_inbox/<run-dir>/
ERROR: audit-verifier: phase-coupled path(s) present: journal/raw/_inbox/foundation-audit-p1/
ERROR: audit-auditor: definition missing at .claude/agents/audit-auditor.md
FAIL: 7 of 19 checks failed
EXIT=3
```

- [ ] **Step 4: Confirm the lint fails on an empty directory (D7 — it must not pass on nothing)**

```bash
mkdir -p /tmp/roles-empty && node scripts/research-roles-lint.ts /tmp/roles-empty; echo "EXIT=$?"
```
Expected: `EXIT=3`, four `definition missing` errors — one per contracted role.

- [ ] **Step 5: Commit**

```bash
git add scripts/research-roles-lint.ts
git commit -m "feat(research-plan): add role-contract lint for the four research roles"
```

---

### Task 2: Make the three existing role defs phase-neutral

**Files:**
- Modify: `.claude/agents/audit-collector.md`
- Modify: `.claude/agents/audit-editor.md`
- Modify: `.claude/agents/audit-verifier.md`

**Interfaces:**
- Consumes: the role contract from Task 1 — tool grants must match exactly.
- Produces: the allowlist-root paragraph, reused verbatim by Task 3's new role.

- [ ] **Step 1: Replace the write-scope sentence in each of the three defs**

In each file, replace the sentence naming `journal/raw/_inbox/foundation-audit-p1/` with this exact
paragraph. It appears verbatim in all four role defs.

```markdown
You may write **only** inside `journal/raw/_inbox/<run-dir>/`, where `<run-dir>` is the single
directory name given in your dispatch. `<run-dir>` is a bare name — it contains no `/` and no `..`.
If your dispatch supplies anything else, or supplies no run directory at all, stop and report a
`Blocker`. The inbox root is fixed here and is not something a dispatch can change. Never edit
product source, specs, plans, the charter, `docs/`, or anything outside that directory.
```

The three sentences being replaced are:
- `audit-collector.md`: "You may write **only** inside `journal/raw/_inbox/foundation-audit-p1/`. Never edit product source, specs, plans, the charter, `docs/`, or anything outside that inbox directory."
- `audit-editor.md`: "Write **only** inside `journal/raw/_inbox/foundation-audit-p1/`. Never touch product source, specs, plans, the charter, or anything outside that inbox."
- `audit-verifier.md`: "Write **only** new files under `journal/raw/_inbox/foundation-audit-p1/verification/`. Never touch product source, specs, plans, or the charter."

For `audit-verifier.md` only, append this sentence to the paragraph, preserving its narrower
verification-subdirectory scope:

```markdown
Within that directory you write **only new files** under `verification/`.
```

- [ ] **Step 2: Add the loop's routing contract to the verifier**

`audit-verifier.md` already requires a remedy route. Make the downstream handoff explicit by
appending this to the end of its "Axis 2 — research sufficiency" section:

```markdown
Your remedy route is a **dispatch instruction, not a note.** `collection` sends a collector after
new sources; `editorial` sends an editor to correct from sources already held. Every correction you
raise will be landed by a *different* agent and the landing independently confirmed by a *third*.
Phase 1 recorded corrections that were never landed in any dossier — your record is the input to
that loop, not the end of it.
```

- [ ] **Step 3: Run the lint, confirm the three roles now pass and only the auditor fails**

Run: `node scripts/research-roles-lint.ts; echo "EXIT=$?"`
Expected: `EXIT=3`, with exactly one error: `audit-auditor: definition missing at .claude/agents/audit-auditor.md`

- [ ] **Step 4: Confirm no phase-coupled path survives anywhere in the agent defs**

```bash
grep -rn 'foundation-audit-p1' .claude/agents/ ; echo "EXIT=$?"
```
Expected: `EXIT=1` (grep found no matches).

- [ ] **Step 5: Commit**

```bash
git add .claude/agents/audit-collector.md .claude/agents/audit-editor.md .claude/agents/audit-verifier.md
git commit -m "refactor(agents): make the three research roles phase-neutral via a static allowlist root"
```

---

### Task 3: The program-integrity auditor role

**Files:**
- Create: `.claude/agents/audit-auditor.md`

**Interfaces:**
- Consumes: the allowlist-root paragraph from Task 2 Step 1, verbatim.
- Consumes: the role contract from Task 1 — tools exactly `Read, Write, Glob, Grep`.
- Produces: the `audit-auditor` subagent type, dispatched by any plan the skill writes.

- [ ] **Step 1: Write the definition**

Create `.claude/agents/audit-auditor.md`:

```markdown
---
name: audit-auditor
description: Research-program PROGRAM-INTEGRITY role. Audits the process rather than the evidence — whether corrections actually landed, whether role boundaries were kept in separate hands, and whether gate checks enumerate positively rather than testing for absence. Reads artifacts and process records only; touches no sources, repairs nothing, has no shell.
tools: Read, Write, Glob, Grep
---

You are a **program-integrity auditor**. You do not check whether the research is right. You check
whether the **process that produced it did what it said it did**.

That distinction is the whole role. A dossier can be fully verified, every citation sound, and the
program still be broken — Phase 1 ended exactly there.

## Capability boundary (enforced, not requested)

- **No Bash** — no git, no history inspection, no product-code execution. Phase 1 found written
  prohibitions did not constrain agents: 2 of 4 focused passes ran git despite a bolded ban. The
  boundary is structural. Do not attempt to work around it.
- **No WebSearch and no WebFetch** — you never open a source. You are not checking evidence, and a
  source you retrieved would tempt you into a verifier's job.
- **No Edit** — you cannot modify an artifact. You report; repair is another role's hand.

You may write **only** inside `journal/raw/_inbox/<run-dir>/`, where `<run-dir>` is the single
directory name given in your dispatch. `<run-dir>` is a bare name — it contains no `/` and no `..`.
If your dispatch supplies anything else, or supplies no run directory at all, stop and report a
`Blocker`. The inbox root is fixed here and is not something a dispatch can change. Never edit
product source, specs, plans, the charter, `docs/`, or anything outside that directory.

Within that directory you write **only new files** under `integrity/`.

## What you audit

### 1. Did corrections land?

This is the defect you exist for. Phase 1's verifier corrections were recorded in verification
records and **never written into any of the six dossiers** — no landing step existed, and no check
for it. The original gate verdicts were reached against dossiers that did not carry their own
corrections.

For every correction raised in a verification record, open the artifact it targets and confirm the
change is **present in the artifact itself**. A correction recorded only in a verification record is
still a defect in the artifact. Report each as `LANDED` or `NOT-LANDED`, naming the artifact and the
locus you checked.

### 2. Were the roles kept in separate hands?

Path scoping and instance separation are **not** expressible as tool grants. They are dispatch
discipline, which means they are only as real as this check makes them.

Confirm from the dispatch ledger and the record headers that:
- no agent instance both produced and verified the same unit;
- no agent instance both raised a correction and landed it;
- the orchestrator dispatched and assembled but authored no verdict.

### 3. Do the gate checks actually check?

A check whose output cannot vary is untested. Two shipped in this program: a secret scan piped into
`head`, so the shell took `head`'s always-zero exit status; and a gate that grepped for the
*absence* of a failure token, so a missing directory certified the run clean.

For every gate check in scope, confirm it **positively enumerates** what must exist rather than
testing for the absence of a failure marker, and that it has been demonstrated to FAIL on an empty
input. If a check cannot be shown to fail on empty, report it as unproven regardless of how it
reads.

### 4. Did shared state stay orchestrator-owned?

Concurrent agent appends produced duplicate IDs in Phase 1. Confirm registers were written centrally
and that IDs are unique and densely assigned.

## Calibration — the pessimism trap

You are rewarded for finding problems. That is precisely the pressure that manufactures them. A
Phase 1 verifier caught this in the program itself: *"the two overstatements I found both run
pessimistic; zero kills here is not a clean bill of health."*

An integrity audit that finds the process sound is a **valid result**. Say so plainly. Do not
manufacture a procedural defect to justify your dispatch. Where a step was skipped for a recorded,
approved reason, that is compliance, not a violation — report it as such.

## The inherited-error trap — specific to your role

You read records. Records are where errors hide.

Phase 1 produced a correction pass that issued **zero retrievals**, worded its corrections from
verification records alone, and so propagated a verifier's mistake into a false statement about a
source. It passed every check that compares a claim to the records — because the records were the
error.

You cannot open sources, so you **cannot** adjudicate whether a claim about a source is true. Do not
try. When your process check turns on the content of a source, report it as
`OUT-OF-ROLE — needs a verifier` and stop. Naming the limit is the correct output; guessing past it
is the defect.

## Output

Write an integrity record as a new file under `journal/raw/_inbox/<run-dir>/integrity/`. For each of the
four areas above, give a finding with the artifact and locus you actually checked, and a terminal
state. Areas you examined and found sound get an explicit sound finding — silence is not a verdict.

**Do not append to the shared registers.** Return any register rows in your response; the
orchestrator assigns IDs and reconciles them centrally.

Return: `Card`, `Result`, `Evidence`, `Next`, `Files`, `Blocker`. Your final text is a data return to
an orchestrator, not a message to a human.
```

- [ ] **Step 2: Run the lint, confirm all four roles pass**

Run: `node scripts/research-roles-lint.ts; echo "EXIT=$?"`
Expected: `EXIT=0`, ending `PASS: role contract satisfied`

- [ ] **Step 3: Confirm the auditor grants no capability it must not have**

The lint asserts the exact tool list, but assert the three specific absences directly — these are
the boundaries the role's honesty depends on.

```bash
grep -n '^tools:' .claude/agents/audit-auditor.md
```
Expected: `tools: Read, Write, Glob, Grep` — no `Bash`, no `Edit`, no `WebSearch`, no `WebFetch`.

- [ ] **Step 4: Commit**

```bash
git add .claude/agents/audit-auditor.md
git commit -m "feat(agents): add audit-auditor, the program-integrity role"
```

---

### Task 4: The reference gate check and its nine fixtures

**Files:**
- Create: `scripts/research-gate.ts`
- Create: `scripts/fixtures/research-gate/manifest.json`
- Create: `scripts/fixtures/research-gate/empty/.gitkeep`
- Create: `scripts/fixtures/research-gate/clean/run/U1/audit.md`
- Create: `scripts/fixtures/research-gate/clean/run/U1/verification.md`
- Create: `scripts/fixtures/research-gate/violating/run/U1/audit.md`
- Create: `scripts/fixtures/research-gate/violating/run/U1/verification.md`
- Create: `scripts/fixtures/research-gate/violating/run/U1/corrections.md`
- Create: `scripts/fixtures/research-gate/retry/run/U1/audit.md`
- Create: `scripts/fixtures/research-gate/retry/run/U1/verification.md`
- Create: `scripts/fixtures/research-gate/retry/run/U1/corrections.md`
- Create: `scripts/fixtures/research-gate/retry/run/U1/landing-confirmation.md`
- Create: `scripts/fixtures/research-gate/malformed-corrections/run/U1/audit.md`
- Create: `scripts/fixtures/research-gate/malformed-corrections/run/U1/verification.md`
- Create: `scripts/fixtures/research-gate/malformed-corrections/run/U1/corrections.md`
- Create: `scripts/fixtures/research-gate/malformed-corrections/run/U1/landing-confirmation.md`
- Create: `scripts/fixtures/research-gate/unit-traversal/manifest.json`
- Create: `scripts/fixtures/research-gate/symlink-escape/run` (relative symlink → `../clean/run`)
- Create: `scripts/fixtures/research-gate/gfm-escape/run/U1/audit.md`
- Create: `scripts/fixtures/research-gate/gfm-escape/run/U1/verification.md`
- Create: `scripts/fixtures/research-gate/gfm-escape/run/U1/corrections.md`
- Create: `scripts/fixtures/research-gate/gfm-escape/run/U1/landing-confirmation.md`
- Create: `scripts/fixtures/research-gate/non-terminal-verdict/run/U1/audit.md`
- Create: `scripts/fixtures/research-gate/non-terminal-verdict/run/U1/verification.md`

**Interfaces:**
- Produces: CLI `node scripts/research-gate.ts <manifest.json> [root]`. Exit `0` = PASS, `3` = gate
  failed, `2` = usage error.
- Produces: the artifact contract every research plan's units must satisfy —
  `<unit>/audit.md` with a `VERDICT:` line from {Preserve, Relabel, Revise, Replace, Remove},
  `<unit>/verification.md` with a terminal `SUFFICIENCY:` line, `<unit>/corrections.md` rows
  (required when SUFFICIENCY is INSUFFICIENT, otherwise optional), and
  `<unit>/landing-confirmation.md` containing exactly `CONFIRMED` when corrections exist.
  A malformed manifest is a usage error.
- Produces: three class rules the gate enforces everywhere they apply, not per-instance —
  (1) **containment**: every path derived from manifest input (`runDir`, each unit, and every
  per-unit artifact file) must resolve inside `root` *after symlink resolution*; any escape is a
  gate failure. (2) **terminality**: `VERDICT:` and `SUFFICIENCY:` are read from the LAST matching
  line, never the first. (3) **total row enumeration**: `corrections.md` is exactly the table —
  every non-blank line must be the header, the separator, or a conforming row; a line the parser
  cannot place (no leading pipe, look-alike pipe characters, comment-wrapped, fenced) is a failure,
  never a skip.

- [ ] **Step 1: Write the gate check**

Create `scripts/research-gate.ts`:

```ts
#!/usr/bin/env node
// Reference gate check for research plans.
// POSITIVE ENUMERATION ONLY: this walks the units the manifest declares and requires each
// artifact to be present and terminal. It never greps for the absence of a failure token —
// that is the defect this script exists to prevent (a missing directory must FAIL, not pass).
// Three class rules govern every check in this file:
//   1. Parsing: a line the parser cannot place is a FAILURE, never a line that is silently
//      skipped. A dropped row is absence-as-proof wearing a regex, and "dropped" includes
//      rows without leading pipes (still a table row in GFM) and pipe look-alike characters
//      (still a table row to a human reader).
//   2. Containment: EVERY filesystem path derived from manifest input must be proven to
//      resolve inside the root the gate was handed — after symlink resolution. resolve()
//      alone is a lexical answer to a physical question; realpath is the authority.
//   3. Terminality: where the contract says a value is terminal, the LAST occurrence
//      governs, never the first. First-match lets an early clean value mask a later
//      failing one.
import { readFileSync, existsSync, realpathSync } from "node:fs";
import { dirname, resolve, sep } from "node:path";

type Manifest = { runDir: string; units: string[] };

// Closed sets. A gate that accepts any non-empty token cannot fail on a typo.
const VERDICTS = ["Preserve", "Relabel", "Revise", "Replace", "Remove"];
const SUFFICIENCIES = ["SUFFICIENT", "INSUFFICIENT"];

const CORRECTION_HEADER = /^\|\s*ID\s*\|\s*Correction\s*\|\s*State\s*\|\s*$/;
const CORRECTION_SEPARATOR = /^\|(?:\s*:?-+:?\s*\|){3}\s*$/;
const CORRECTION_ROW = /^\|\s*(C\d+)\s*\|([^|]*)\|\s*(LANDED|NOT-LANDED)\s*\|\s*$/;
// Terminal fields carry /g so matchAll can walk every occurrence; the last one governs.
const VERDICT_LINE = /^VERDICT:\s*(\S+)\s*$/gm;
const SUFFICIENCY_LINE = /^SUFFICIENCY:\s*(\S+)\s*$/gm;

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
// followed by readFileSync later).
const rootAbs = resolve(rootArg);
const root = existsSync(rootAbs) ? realpathSync(rootAbs) : rootAbs;

function insideRoot(p: string): boolean {
  if (p !== root && !p.startsWith(root + sep)) return false;
  let probe = p;
  while (probe !== root && !existsSync(probe)) probe = dirname(probe);
  if (!existsSync(probe)) return true; // nothing on this branch exists yet — no link to follow
  const real = realpathSync(probe);
  return real === root || real.startsWith(root + sep);
}

// Rule 3: the LAST matching line is the terminal one. String.match() with /m returns the
// FIRST, which lets an early "SUFFICIENCY: SUFFICIENT" mask a terminal INSUFFICIENT below it.
function lastMatch(text: string, re: RegExp): RegExpMatchArray | null {
  let last: RegExpMatchArray | null = null;
  for (const m of text.matchAll(re)) last = m;
  return last;
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
      const verdict = lastMatch(readFileSync(auditPath, "utf8"), VERDICT_LINE);
      check(
        verdict !== null && VERDICTS.includes(verdict[1]),
        `${unit}: audit.md has no terminal VERDICT: line from {${VERDICTS.join(", ")}}` +
          (verdict ? ` (found "${verdict[1]}")` : ""),
      );
    }
  }

  let sufficiency: string | null = null;
  const verificationPath = resolve(unitDir, "verification.md");
  if (check(insideRoot(verificationPath), `${unit}: verification.md resolves outside root ${root}`)) {
    if (!existsSync(verificationPath)) {
      check(false, `${unit}: verification.md missing`);
    } else {
      const m = lastMatch(readFileSync(verificationPath, "utf8"), SUFFICIENCY_LINE);
      const ok = m !== null && SUFFICIENCIES.includes(m[1]);
      check(ok, `${unit}: verification.md has no terminal SUFFICIENCY: line from {${SUFFICIENCIES.join(", ")}}`);
      if (ok) sufficiency = m![1];
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
    const lines = readFileSync(correctionsPath, "utf8").split(/\r?\n/);
    // Rule 1: corrections.md is EXACTLY the table. Every non-blank line must be the header,
    // then the separator, then conforming correction rows — nothing else. There is no
    // category of "line the parser ignores": a row without leading pipes still renders as a
    // table row in GFM, a comment-wrapped or look-alike-pipe row still reads as one to a
    // human, so any line this parser cannot place is a FAILURE, never a skip.
    const rows = lines.filter((l) => l.trim().length > 0);

    check(
      rows.length >= 3,
      `${unit}: corrections.md must contain a header row, a separator row, and at least one correction row (found ${rows.length} non-blank line(s))`,
    );

    if (rows.length >= 3) {
      check(
        CORRECTION_HEADER.test(rows[0]),
        `${unit}: corrections.md header row is malformed, expected "| ID | Correction | State |": ${JSON.stringify(rows[0])}`,
      );
      check(
        CORRECTION_SEPARATOR.test(rows[1]),
        `${unit}: corrections.md separator row is malformed: ${JSON.stringify(rows[1])}`,
      );

      const terminal = new Map<string, string>();
      for (const line of rows.slice(2)) {
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
    if (check(insideRoot(confirmPath), `${unit}: landing-confirmation.md resolves outside root ${root}`)) {
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
}

console.log(`research-gate: ${checks} checks over ${manifest.units.length} unit(s) in ${runDir}`);
if (failures.length > 0) {
  for (const f of failures) console.error(`ERROR: ${f}`);
  console.error(`GATE: FAIL (${failures.length} of ${checks} checks failed)`);
  process.exit(3);
}
console.log("GATE: PASS");
```

- [ ] **Step 2: Create the shared manifest**

Create `scripts/fixtures/research-gate/manifest.json`:

```json
{
  "runDir": "run",
  "units": ["U1"]
}
```

- [ ] **Step 3: Build the `empty` fixture and confirm it FAILS**

This is the case that shipped broken twice.

```bash
mkdir -p scripts/fixtures/research-gate/empty && touch scripts/fixtures/research-gate/empty/.gitkeep
node scripts/research-gate.ts scripts/fixtures/research-gate/manifest.json scripts/fixtures/research-gate/empty; echo "EXIT=$?"
```
Expected: `EXIT=3`, with `ERROR: run directory missing:` and `ERROR: U1: audit.md missing`

- [ ] **Step 4: Build the `clean` fixture and confirm it PASSES**

```bash
mkdir -p scripts/fixtures/research-gate/clean/run/U1
printf 'VERDICT: Preserve\n' > scripts/fixtures/research-gate/clean/run/U1/audit.md
printf 'SUFFICIENCY: SUFFICIENT\n' > scripts/fixtures/research-gate/clean/run/U1/verification.md
node scripts/research-gate.ts scripts/fixtures/research-gate/manifest.json scripts/fixtures/research-gate/clean; echo "EXIT=$?"
```
Expected: `EXIT=0`, ending `GATE: PASS`

- [ ] **Step 5: Build the `violating` fixture and confirm it FAILS**

```bash
mkdir -p scripts/fixtures/research-gate/violating/run/U1
printf 'VERDICT: Revise\n' > scripts/fixtures/research-gate/violating/run/U1/audit.md
printf 'SUFFICIENCY: INSUFFICIENT\n' > scripts/fixtures/research-gate/violating/run/U1/verification.md
cat > scripts/fixtures/research-gate/violating/run/U1/corrections.md <<'EOF'
| ID | Correction | State |
|----|------------|-------|
| C1 | overstated effect size | NOT-LANDED |
EOF
node scripts/research-gate.ts scripts/fixtures/research-gate/manifest.json scripts/fixtures/research-gate/violating; echo "EXIT=$?"
```
Expected: `EXIT=3`, with `ERROR: U1: correction C1 is NOT-LANDED` and `ERROR: U1: corrections raised but landing-confirmation.md missing`

- [ ] **Step 6: Build the `retry` fixture and confirm it PASSES**

A superseded `NOT-LANDED` row must not deadlock the gate.

```bash
mkdir -p scripts/fixtures/research-gate/retry/run/U1
printf 'VERDICT: Revise\n' > scripts/fixtures/research-gate/retry/run/U1/audit.md
printf 'SUFFICIENCY: INSUFFICIENT\n' > scripts/fixtures/research-gate/retry/run/U1/verification.md
cat > scripts/fixtures/research-gate/retry/run/U1/corrections.md <<'EOF'
| ID | Correction | State |
|----|------------|-------|
| C1 | overstated effect size | NOT-LANDED |
| C1 | overstated effect size (landed on retry) | LANDED |
EOF
printf 'CONFIRMED\n' > scripts/fixtures/research-gate/retry/run/U1/landing-confirmation.md
node scripts/research-gate.ts scripts/fixtures/research-gate/manifest.json scripts/fixtures/research-gate/retry; echo "EXIT=$?"
```
Expected: `EXIT=0`, ending `GATE: PASS`

- [ ] **Step 7: Build the `malformed-corrections` fixture and confirm it FAILS**

A row that cannot be parsed must FAIL, not vanish. This is the absence-as-proof case in the
parser itself.

```bash
mkdir -p scripts/fixtures/research-gate/malformed-corrections/run/U1
printf 'VERDICT: Revise\n' > scripts/fixtures/research-gate/malformed-corrections/run/U1/audit.md
printf 'SUFFICIENCY: INSUFFICIENT\n' > scripts/fixtures/research-gate/malformed-corrections/run/U1/verification.md
cat > scripts/fixtures/research-gate/malformed-corrections/run/U1/corrections.md <<'EOF'
| ID | Correction | State |
|----|------------|-------|
| C1 | overstated effect size | LANDED |
| C2 | unresolved, written in a shape the gate must not silently drop | PENDING |
EOF
printf 'CONFIRMED\n' > scripts/fixtures/research-gate/malformed-corrections/run/U1/landing-confirmation.md
node scripts/research-gate.ts scripts/fixtures/research-gate/manifest.json scripts/fixtures/research-gate/malformed-corrections; echo "EXIT=$?"
```
Expected: `EXIT=3`, with `ERROR: U1: corrections.md has a non-conforming correction row:`

- [ ] **Step 8: Build the `unit-traversal` fixture and confirm it FAILS**

A manifest must not be able to point a *unit* outside root either — `runDir` alone guarded is the
instance, not the class. This fixture carries its own manifest.

```bash
mkdir -p scripts/fixtures/research-gate/unit-traversal
printf '{\n  "runDir": ".",\n  "units": ["../clean/run/U1"]\n}\n' > scripts/fixtures/research-gate/unit-traversal/manifest.json
node scripts/research-gate.ts scripts/fixtures/research-gate/unit-traversal/manifest.json scripts/fixtures/research-gate/unit-traversal; echo "EXIT=$?"
```
Expected: `EXIT=3`, with `ERROR: ../clean/run/U1: unit path resolves outside root`

- [ ] **Step 9: Build the `symlink-escape` fixture and confirm it FAILS**

A lexical prefix test is not containment when the threat model includes symlinks. The symlink is
relative (`../clean/run`) and committed to git, so it survives checkout on any POSIX system.

```bash
mkdir -p scripts/fixtures/research-gate/symlink-escape
ln -sfn ../clean/run scripts/fixtures/research-gate/symlink-escape/run
node scripts/research-gate.ts scripts/fixtures/research-gate/manifest.json scripts/fixtures/research-gate/symlink-escape; echo "EXIT=$?"
```
Expected: `EXIT=3`, with `ERROR: manifest runDir "run" resolves outside root`

- [ ] **Step 10: Build the `gfm-escape` fixture and confirm it FAILS**

GFM does not require leading/trailing pipes on data rows, and Unicode look-alike pipes render as
table delimiters to a human. Neither shape may be invisible to the parser.

```bash
mkdir -p scripts/fixtures/research-gate/gfm-escape/run/U1
printf 'VERDICT: Revise\n' > scripts/fixtures/research-gate/gfm-escape/run/U1/audit.md
printf 'SUFFICIENCY: INSUFFICIENT\n' > scripts/fixtures/research-gate/gfm-escape/run/U1/verification.md
printf 'CONFIRMED\n' > scripts/fixtures/research-gate/gfm-escape/run/U1/landing-confirmation.md
cat > scripts/fixtures/research-gate/gfm-escape/run/U1/corrections.md <<'EOF'
| ID | Correction | State |
|----|------------|-------|
| C1 | trivial typo | LANDED |
C2 | fabricated citation, unresolved | NOT-LANDED
｜ C3 ｜ unresolved, look-alike pipes ｜ NOT-LANDED ｜
EOF
node scripts/research-gate.ts scripts/fixtures/research-gate/manifest.json scripts/fixtures/research-gate/gfm-escape; echo "EXIT=$?"
```
Expected: `EXIT=3`, with two `ERROR: U1: corrections.md has a non-conforming correction row:` lines
(one for the pipeless `C2` row, one for the look-alike-pipe `C3` row)

- [ ] **Step 11: Build the `non-terminal-verdict` fixture and confirm it FAILS**

Where the contract says a value is terminal, the last occurrence governs — a first-match read lets
an early clean value mask a later failing one.

```bash
mkdir -p scripts/fixtures/research-gate/non-terminal-verdict/run/U1
cat > scripts/fixtures/research-gate/non-terminal-verdict/run/U1/audit.md <<'EOF'
VERDICT: Preserve

Reopened after the correction pass:
VERDICT: Withdrawn
EOF
cat > scripts/fixtures/research-gate/non-terminal-verdict/run/U1/verification.md <<'EOF'
SUFFICIENCY: SUFFICIENT

On review of the corrections:
SUFFICIENCY: INSUFFICIENT
EOF
node scripts/research-gate.ts scripts/fixtures/research-gate/manifest.json scripts/fixtures/research-gate/non-terminal-verdict; echo "EXIT=$?"
```
Expected: `EXIT=3`, with `ERROR: U1: audit.md has no terminal VERDICT: line from {Preserve, Relabel, Revise, Replace, Remove} (found "Withdrawn")` and `ERROR: U1: SUFFICIENCY is INSUFFICIENT but corrections.md is missing — an insufficient verdict must be closed by landed corrections`

- [ ] **Step 12: Confirm a zero-unit manifest cannot pass**

```bash
printf '{"runDir":"run","units":[]}\n' > /tmp/zero-manifest.json
node scripts/research-gate.ts /tmp/zero-manifest.json scripts/fixtures/research-gate/clean; echo "EXIT=$?"
```
Expected: `EXIT=3`, with `ERROR: manifest enumerates zero units — a gate over nothing cannot pass`

- [ ] **Step 13: Commit**

```bash
git add scripts/research-gate.ts scripts/fixtures/research-gate/
git commit -m "feat(research-plan): add positive-enumeration gate check with its nine fixtures"
```

---

### Task 5: The skill

Written last so it references the concrete artifacts by path.

**Files:**
- Create: `~/.claude/skills/research-plan/SKILL.md`

**Interfaces:**
- Consumes: the four role defs (Tasks 2–3), `scripts/research-roles-lint.ts` (Task 1),
  `scripts/research-gate.ts` (Task 4).
- Produces: the `research-plan` skill, invoked via `Skill("research-plan")`.

- [ ] **Step 1: Write the skill**

Create `~/.claude/skills/research-plan/SKILL.md`:

````markdown
---
name: research-plan
description: "🪷 Use when a research or audit program needs an execution plan — evidence gathering, citation verification, sufficiency judgement — rather than a code implementation plan. Composes on writing-plans; adds role separation, an evidence contract, separate-agent verification, a landing step, and falsifiable gate criteria."
---

<!-- wl:skill
  conformant: true
  kind: composed
  home: first-party
  composes: writing-plans
-->

# Research Plan — a research question becomes a dispatchable, closable program

**Arc position:** **Shape** (Learn → Shape → Make → Reflect). Sibling to `writing-plans`, which it
composes rather than replaces.

## When this instead of `writing-plans`

`writing-plans` optimizes against the failure mode of a *code* plan: ambiguity, where an implementer
cannot act because a step is underspecified.

Research plans fail differently. They fail by **unclosed loops** — a finding is recorded and never
lands; a claim is verified and the correction never reaches the artifact; a gate certifies a
directory nobody wrote to. Every one of those has happened in this repo.

Use `research-plan` when the deliverable is evidence and judgement. Use `writing-plans` when the
deliverable is code.

## Inherit, don't restate

**Everything in `writing-plans` applies unchanged** — the plan header, File Structure, Task
Right-Sizing, No Placeholders, Self-Review, Save and Hand Off. Read that skill and follow it. This
skill adds five sections it has no concept of and changes nothing else.

## The loop every research plan must close

```
  produce ──▶ verify ──▶ SUFFICIENT ─────────────────────────▶ gate
  (collector    (verifier,     │
   or auditor)   fresh          └─ INSUFFICIENT + remedy route
                 instance)            │
                                      ├─ missing evidence ──▶ collector (new pass)
                                      └─ held but mishandled ─▶ editor  ──▶ LAND
                                                                            │
                                                              second verifier
                                                              confirms landing
                                                                            │
                                                                            ▼
                                                                          gate
```

Four invariants. A plan that violates one is not ready to dispatch.

- **I1 — No verdict without a landing.** Every raised correction gets a task that writes it into the
  artifact and a *separate* task that confirms it landed.
- **I2 — No self-verification.** No agent instance both produces and verifies the same unit; none
  both raises and lands its own correction.
- **I3 — Remedy is routed, not assumed.** The verifier names `collection` or `editorial`; the plan
  carries a distinct task shape for each.
- **I4 — Shared state is orchestrator-owned.** Agents return rows; the orchestrator assigns IDs.
  Concurrent appends produced duplicate IDs once already.

**I1 is not hypothetical.** A research program in this repo reached its gate with verifier
corrections recorded in verification records and written into **none** of its six dossiers. No
landing step existed and no check for it.

## P1 — Role separation as a first-class constraint

Four roles, defined in `.claude/agents/`. Their capability boundaries are the point; do not dispatch
a general-purpose agent to do their jobs.

| Role | Tools | Does | Cannot |
|---|---|---|---|
| `audit-collector` | WebSearch, WebFetch, Read, Write, Edit, Glob, Grep | Adds new cited findings under a bounded gap | No shell/git |
| `audit-editor` | WebFetch, Read, Write, Edit, Glob, Grep | Corrects from sources already cited | **No WebSearch** — cannot collect |
| `audit-verifier` | WebSearch, WebFetch, Read, Write, Glob, Grep | Judges citations and sufficiency; routes remedy | **No Edit** — cannot repair |
| `audit-auditor` | Read, Write, Glob, Grep | Audits the *process*: did corrections land, were roles separated, do gate checks enumerate | **No web, no Edit** — never touches sources |

**Verify the roles are loaded before planning dispatch:**

```bash
node scripts/research-roles-lint.ts
```

**Two boundaries are NOT tool-enforced.** No tool grant expresses *path scoping* of `Write` or
*instance separation* of roles. Both are dispatch discipline, checked at the gate. Never write plan
copy that implies the tool layer prevents them — the honesty of the whole program rests on this
distinction.

**Write scope is a static allowlist root.** Every role hardcodes `journal/raw/_inbox/`; the dispatch
supplies only a bare subdirectory name beneath it. Do not move the root into the dispatch prompt —
instruction does not constrain agents, and this repo has the scar to prove it.

## P2 — An evidence contract per unit

Every audit unit declares, in the plan, before dispatch:

- **The question** the unit answers, in one sentence.
- **The citation contract** — three points, each checked: the source **exists**, it **supports** the
  claim, and the **strength is honest**. Record an exact supporting location, not just a source.
- **The classification scheme**, verbatim, so units cannot drift apart.
- **The budget** — how many sources, and the named gap that bounds the search.

Two rules that survived contact with reality and belong in every unit's brief:

- **Read what you already hold, first.** The dominant defect across an entire audit program was not
  fabrication — it was failing to read collected sources. Four of four sufficiency failures traced
  to material already in hand.
- **Absence of evidence is not grounds to delete a defensible design.** An unevidenced but
  reasonable choice gets **relabelled**, not rejected.

## P3 — A verification pass by a different agent

Every unit gets an `audit-verifier` dispatch that is a **fresh instance** — not the producer, not a
continuation of the producer's context. Independence is the entire value.

The verifier returns two *separate* judgements, and the plan must keep them separate:

1. **Citation verification** — per citation: `VERIFIED` / `UNVERIFIABLE` / `DROPPED`.
2. **Research sufficiency** — `SUFFICIENT` / `INSUFFICIENT`.

These come apart. A program has already had all six dossiers pass citation verification and **all
six be INSUFFICIENT**. Verified citations that miss the important evidence are still a failed unit.

On `INSUFFICIENT` the verifier must name the remedy — `collection` or `editorial` — because they
have different task shapes downstream (I3).

**Calibration is a required step, not a disposition.** Briefing an agent about pessimism bias does
not correct it. The brief must carry an explicit question — *"is this defect real?"* — and the plan
must accept "found nothing" as a valid result.

## P4 — A landing step, and a landed-check

The step whose absence broke a program.

- **Land.** An `audit-editor` writes each correction **into the artifact itself**. A defect recorded
  only in a verification record is still a defect in the artifact.
- **Confirm.** A *second* verifier independently confirms the landing. The corrector is not the
  confirmer.
- **Check materially.** A correction pass that rewords from verification records alone, issuing zero
  source retrievals, is unverified by construction — and it propagates the verifier's own mistakes.
  Material corrections are checked against the primary source, not against prior records.
- **Retries must not deadlock.** Verifiers cannot edit, so a superseded `NOT-LANDED` row lives
  forever. The landing ledger is append-only and **the last row for an ID wins**.

## P5 — Gate criteria with falsifiable procedures

**Every gate check positively enumerates what must exist.** Never grep for the absence of a failure
token. A missing directory must FAIL.

This has shipped broken twice in one repo: a secret scan piped into `head` (the shell took `head`'s
always-zero exit status, so the check could never fail), and a gate that certified an empty
directory clean. A check whose output cannot vary is untested.

Use `scripts/research-gate.ts` or write a check in its shape. **Every gate check must demonstrate
the correct verdict on nine fixtures before the plan is approved:**

| Fixture | Required verdict |
|---|---|
| `empty` — no artifacts at all | **FAIL** |
| `clean` — all artifacts present and resolved | **PASS** |
| `violating` — one unresolved correction | **FAIL** |
| `retry` — a superseded NOT-LANDED row plus a later LANDED row | **PASS** |
| `malformed-corrections` — a correction row the parser cannot parse | **FAIL** |
| `unit-traversal` — a manifest unit that resolves outside root | **FAIL** |
| `symlink-escape` — a runDir symlink that resolves outside root | **FAIL** |
| `gfm-escape` — a pipeless GFM row and a look-alike-pipe row | **FAIL** |
| `non-terminal-verdict` — early clean VERDICT/SUFFICIENCY masking a later terminal one | **FAIL** |

Reference fixtures live in `scripts/fixtures/research-gate/`.

## The ordering constraint — read before you sequence anything

Claude Code reads its agent registry **at session start**. A role definition created or edited
mid-session is not loaded and cannot be dispatched. A program lost this exact bet once already.

So every plan this skill writes opens with a task that:

1. creates or edits every role definition it will dispatch,
2. runs `node scripts/research-roles-lint.ts` to green, and
3. **ends the session.**

Dispatch begins in a **fresh** session. This is a hard ordering constraint, not advice — put it in
the plan as Task 0 and say plainly that execution stops there.

## Self-Review — additions

Run `writing-plans`' three checks, then these four:

4. **Loop closure** — walk every unit. Does each have a produce task, a verify task by a different
   instance, a landing task, and a landing-confirmation task? Any unit missing one violates I1.
5. **Role fit** — does any task ask a role to do something its tool grant forbids? An editor asked
   to find a new source has no `WebSearch`; the plan is wrong, not the agent.
6. **Gate falsifiability** — can you state, for each gate criterion, the input that makes it fail?
   A criterion with no failing input is not a criterion.
7. **Tool-enforcement honesty** — search the plan for copy implying the tool layer prevents path
   escape or instance reuse. It does not. Fix the copy.

## Save and Hand Off

Save to the plans directory named in `journal/docs-map.md`. Then hand off exactly as `writing-plans`
does — `subagent-driven-development`, `executing-plans`, or back to `iroh`.

Add one line to the handoff, because it is the difference between a plan that runs and one that
silently no-ops:

> **Task 0 ends the session.** Execution resumes in a fresh session so the agent registry loads the
> role definitions.
````

- [ ] **Step 2: Confirm the skill is discoverable**

```bash
test -f ~/.claude/skills/research-plan/SKILL.md && head -4 ~/.claude/skills/research-plan/SKILL.md
```
Expected: the frontmatter block with `name: research-plan`

- [ ] **Step 3: Confirm every path the skill names actually resolves**

```bash
for p in scripts/research-roles-lint.ts scripts/research-gate.ts scripts/fixtures/research-gate \
         .claude/agents/audit-collector.md .claude/agents/audit-editor.md \
         .claude/agents/audit-verifier.md .claude/agents/audit-auditor.md; do
  test -e "$p" && echo "OK   $p" || echo "MISS $p"
done
```
Expected: seven `OK` lines, zero `MISS`.

- [ ] **Step 4: Run the tool-enforcement honesty check on the skill itself (Self-Review item 7)**

```bash
grep -n 'tool layer\|tool-enforced\|NOT tool-enforced\|not tool-enforced' ~/.claude/skills/research-plan/SKILL.md
```
Expected: at least one hit, in the P1 section, stating the boundaries are **not** tool-enforced.

- [ ] **Step 5: Commit the in-repo side**

The skill lives outside the repo and is not committed here. Record its existence in the docs map.

Add this row to the table in `journal/docs-map.md`:

```markdown
| ~/.claude/skills/research-plan/SKILL.md | The research-planning skill: role contract, the produce→verify→land→confirm loop, and gate falsifiability rules. Global, not in-repo. |
```

```bash
git add journal/docs-map.md
git commit -m "docs(map): register the research-plan skill as a source of truth"
```

---

### Task 6: Whole-set verification

**Files:**
- No new files. Verification only.

**Interfaces:**
- Consumes: every artifact from Tasks 1–5.

- [ ] **Step 1: Run both checks green from a clean tree**

```bash
git status --short
node scripts/research-roles-lint.ts; echo "LINT=$?"
node scripts/research-gate.ts scripts/fixtures/research-gate/manifest.json scripts/fixtures/research-gate/clean; echo "GATE=$?"
```
Expected: empty status, `LINT=0`, `GATE=0`

- [ ] **Step 2: Re-run all nine gate fixtures in one pass and assert the verdict vector**

A fixture that carries its own `manifest.json` (currently only `unit-traversal`) is run with it;
every other fixture uses the shared manifest.

```bash
for f in empty clean violating retry malformed-corrections unit-traversal symlink-escape gfm-escape non-terminal-verdict; do
  m=scripts/fixtures/research-gate/$f/manifest.json
  [ -f "$m" ] || m=scripts/fixtures/research-gate/manifest.json
  node scripts/research-gate.ts "$m" scripts/fixtures/research-gate/$f > /dev/null 2>&1
  echo "$f=$?"
done
```
Expected exactly: `empty=3`, `clean=0`, `violating=3`, `retry=0`, `malformed-corrections=3`,
`unit-traversal=3`, `symlink-escape=3`, `gfm-escape=3`, `non-terminal-verdict=3`

- [ ] **Step 3: Confirm no phase coupling survives**

```bash
grep -rn 'foundation-audit-p1\|foundation-audit-p2' .claude/agents/ ~/.claude/skills/research-plan/; echo "EXIT=$?"
```
Expected: `EXIT=1` (no matches).

- [ ] **Step 4: Dispatch `wl-verify` against the change set**

Record `BASE` before Task 1 begins; the review range is `BASE..HEAD`. Dispatch `wl-verify`
(Agent tool, `subagent_type: wl-verify`, model `opus`) with that range and this plan's path.
Expected: correctness and spec-conformance gaps only; resolve any before declaring done.

- [ ] **Step 5: Commit any fixes and stop**

```bash
git add -A && git commit -m "fix(research-plan): resolve wl-verify findings"
```

Execution ends here. **Do not begin Phase 2** — re-expressing the Phase 2 plan through this skill is
the next, separately approved piece of work.

---

## Self-Review

Run against `docs/superpowers/specs/2026-07-20-research-plan-skill-design.md`.

1. **Spec coverage** — D1 → Task 5 "Inherit, don't restate". D2 → Task 2 Step 1 + lint check.
   D3 → Task 3. D4 → Task 3 (war stories retained verbatim). D5 → Task 5 (global skill) + Task 5
   Step 5 (docs-map row). D6 → Task 5 "The ordering constraint". D7 → Task 4 (nine fixtures).
   P1–P5 → Task 5 sections. I1–I4 → Task 5 "The loop". Deliverables table → File Structure. **No
   gaps.**
2. **Placeholder scan** — every step carries its actual command or file content; no "TBD", no
   "similar to Task N", no code step without a code block. **Clean.**
3. **Type consistency** — role names identical across the lint contract, the defs, and the skill
   table (`audit-collector`, `audit-editor`, `audit-verifier`, `audit-auditor`). Tool grants
   identical between the lint's `CONTRACT` and the skill's P1 table. Artifact filenames identical
   between `research-gate.ts`, the fixtures, and P4. **Consistent.**
4. **Loop closure** — this plan builds the machinery, it does not run a research program, so I1
   applies to the plans this skill *writes*, not to this plan. Enforced via Self-Review item 4 in
   the skill.
5. **Gate falsifiability** — every check in Tasks 1, 4, and 6 names the input that makes it fail;
   the lint and the gate are each demonstrated failing on empty before being accepted.

## Open question carried from the spec

**Q1 — Do the role defs keep the `audit-` prefix?** Recommendation: **keep it.** Renaming to
`research-*` would churn every reference in the Phase 1 and Phase 2 plans for no functional gain,
and D2 already removed the coupling that mattered. If the user rules otherwise, rename in Task 2
before Task 1's contract is written to disk.
