#!/usr/bin/env -S node
// ============================================================================
// DERIVED PORT — DO NOT PATCH HERE.
//
//   Source:  ~/Desktop/Projects/workspace/scripts/kanban.ts
//   Commit:  85a4fda536614394a0b458c9f261c20b63dbbfb1
//   Ported:  2026-07-18 (White Lotus initiation, step 3)
//
// The workspace copy is the master and owns the test suite. Fix bugs THERE,
// then regenerate this file — never patch it independently, or the four-family
// topology drifts. Everything below this header is a verbatim copy.
// ============================================================================

// Agent-kanban arranger — parse, validate, arrange, and select the next action for an
// `agent-kanban:v1` OR `agent-kanban:v2` marked tasks.md board. Dependency-free: only Node's
// built-in modules, run as `node scripts/kanban.ts <verb> [board-path] [phase-path]`.
//
// Verbs (READ path only — add/move/update/remove/node-* are WP5):
//   board (alias show)  Render PHASE/(MILESTONES)/lanes/BLOCKED/NEXT.
//   next                Print only the NEXT: block (the same selection, no full render).
//   validate            Parse + FULLY validate; silent + exit 0 on a valid board (a v2 board's
//                        degraded-render report — see below — is the one non-silent exit-0 case).
//                        `--drift` (bare boolean flag, either side of the positional paths): the
//                        reverse-drift probe (design spec §Reverse-drift) — report-only, exit 0.
//
// Two board formats are read here:
//   v1 (`<!-- agent-kanban:v1 -->`)  the original lanes-only board (other desks, e.g. blackjack).
//                                    `next` prints the light 3-line block: id, `-> `, load.
//   v2 (`<!-- agent-kanban:v2 -->`)  adds a `## Milestones` node section + the full 13-field card
//                                    schema, scoped to the active ROADMAP step (see the design spec
//                                    docs/specs/2026-07-16-agent-sdlc-kanban-design.md §board-format
//                                    / §card-schema / §movement / §selector). Read verbs accept
//                                    BOTH; the write path (WP5) requires v2. `next` on a v2 board
//                                    prints the full derived arc-in-context block: the milestone
//                                    goal line (walked `card.Milestone` → node → `Roadmap: step N`
//                                    → ROADMAP.md's Delivery-map entry, quoted live at render time —
//                                    never invented, degrades loudly on extraction failure), intent,
//                                    `-> `, load, DERIVED `unblocks:` (reverse `Depends on` over live
//                                    cards, render-time only, never stored), and `research:` state. A
//                                    `Research: needed` Ready card that would otherwise be next earns
//                                    a loud `GATE:` banner and is skipped, never silently.
//
// Board path defaults to journal/ops/tasks.md (cwd-relative) when omitted; phase path defaults to a
// sibling phase.md next to the board file when omitted. For a v2 board the phase file's
// `roadmap_step:` key is REQUIRED — every milestone node's `Roadmap:` is cross-checked against it.
//
// Exit codes (the spec's table): 0 success · 1 file error (missing/unreadable/bad invocation) ·
// 2 no agent-kanban marker (not a board) · 3 board invalid (a validation failure). Exit 4 (policy
// refusal) belongs to the write path (WP5) and is not implemented here.
// Errors: `ERROR: <what> (<locus>)` on stderr, nothing on stdout. Read-only throughout — it never
// writes to the board or any other file.

import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
  renameSync,
  unlinkSync,
  mkdirSync,
} from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

const VALID_LANES = ['Ready', 'Active', 'Verification', 'Done', 'Blocked'];
const VALID_TYPES = ['research', 'design', 'plan', 'build', 'fix', 'review', 'qa', 'docs', 'chore'];
const VALID_GATES = ['code-review', 'craft-gate', 'feature-qa', 'milestone-qa', 'user-approval', 'none'];
const NODE_STATUSES = ['active', 'shaped'];
const RENDER_LANES = ['Ready', 'Active', 'Verification', 'Done'];

// The one report-only note for a zero-`[active]`-node board (a legitimate between-milestones pause —
// e.g. the transient the /end close→activate protocol produces). Surfaced by `validate` and `next`;
// never a validation failure. Two-or-more `[active]` nodes are ALWAYS refused (hard wall).
const ZERO_ACTIVE_NOTE = 'no active milestone node — activate a shaped node before selecting work';

interface Card {
  id: string;
  title: string;
  lane: string;
  type: string;
  milestone: string; // v2 only
  intent: string; // v2 only
  depends: string;
  research: string; // v2 only (optional field)
  hasResearch: boolean; // whether the Research: line was present at all
  source: string; // v2 only
  outcome: string;
  next: string;
  load: string;
  gate: string;
  evidence: string; // v2 only
  updated: string;
  blockedBy: string;
  unblockWhen: string;
  // presence flags for v2 required-field validation
  present: Set<string>;
}

interface Node {
  id: string;
  title: string;
  status: string; // 'active' | 'shaped'
  roadmap: string;
  plan: string;
}

// BoardError carries an exit code + a fully-formed message. Parsing/validation throw it so the
// same validator can serve BOTH the read verbs (top-level catch → errorExit) AND the write path's
// pre/post-image checks (catch → clean up the temp file, then exit). Read-verb behaviour is
// identical to the pre-refactor `process.exit` form — the top-level catch reproduces it verbatim.
class BoardError extends Error {
  code: number;
  constructor(code: number, msg: string) {
    super(msg);
    this.code = code;
  }
}

function errorExit(code: number, msg: string): never {
  process.stderr.write(`ERROR: ${msg}\n`);
  process.exit(code);
}

// refuse(): a policy refusal — the board is valid but the requested write is illegal (exit 4).
function refuse(what: string, locus: string): never {
  throw new BoardError(4, `${what} (${locus})`);
}

// fail(): a validation failure — the (post-)image is an invalid board (exit 3); distinct from
// file-error (1), no-marker (2), and policy-refusal (4).
function fail(what: string, locus: string): never {
  throw new BoardError(3, `${what} (${locus})`);
}

function trimTrailing(s: string): string {
  return s.replace(/[ \t]+$/, '');
}

function trimBoth(s: string): string {
  return s.replace(/^[ \t]+/, '').replace(/[ \t]+$/, '');
}

function isIn(needle: string, hay: string[]): boolean {
  return hay.includes(needle);
}

// Load/Depends-on values are comma-separated lists; split, trim each, drop empties.
function splitList(raw: string): string[] {
  if (!raw) return [];
  return raw
    .split(',')
    .map((s) => trimBoth(s))
    .filter((s) => s.length > 0);
}

// A pointer value (Load item, Plan pointer) may carry a `§Section` anchor or trailing prose after
// the path — resolve only the leading path token.
function pointerPath(raw: string): string {
  const v = trimBoth(raw);
  // cut at the first space or section sign — the path is the leading token.
  const cut = v.search(/[ \t§]/);
  return cut === -1 ? v : v.slice(0, cut);
}

// Load paths resolve against the repo root the board file lives in (so a board at
// journal/ops/tasks.md with `Load: docs/…` resolves from the repo root, not journal/ops/, and a
// board with `Load: .wl/…` still resolves even though .wl/ is gitignored). Falls back to the
// board's own directory when it isn't inside a git repo (the test fixtures).
function resolveBaseDir(boardDir: string): string {
  try {
    const out = execFileSync('git', ['-C', boardDir, 'rev-parse', '--show-toplevel'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (out) return out;
  } catch {
    // not a git repo (or git unavailable) — fall back below.
  }
  return boardDir;
}

function extractPhaseField(content: string, key: string): string {
  const re = new RegExp(`^${key}:[ \\t]*`);
  for (const line of content.split('\n')) {
    if (re.test(line)) {
      let val = line.replace(re, '');
      const quoted = val.match(/^"(.*)"$/);
      if (quoted) val = quoted[1];
      return trimTrailing(val);
    }
  }
  return '';
}

// Node IDs must be unique across the desk's history: scan the board's sibling `archive/` directory
// for a node heading `### <ID> ` in a `node-close` archive **fragment**. (The archive lives next to
// the board — journal/ops/archive/ beside journal/ops/tasks.md.) No archive dir → nothing to
// collide with.
//
// Full-board SNAPSHOTS are excluded. `/end`'s archive-before-mutate step copies the whole live
// `tasks.md` → `archive/tasks-<ts>.md`, which carries the `<!-- agent-kanban:vN -->` marker and every
// node CURRENTLY on the board. Those live nodes are not "archived history" — counting them would make
// a board's own node collide with its own backup, so the spec-mandated archive-before-mutate ordering
// (`/end` archives, then reconciles the board) would refuse every subsequent write. node-close
// fragments (`<ID>-<ts>.md`) are node blocks + Done cards with NO board marker; only they record a
// closed-node ID. So: any archive file bearing the board marker is a snapshot, and is skipped here.
function nodeIdInArchive(boardDir: string, id: string): boolean {
  const archiveDir = join(boardDir, 'archive');
  let entries: string[];
  try {
    if (!statSync(archiveDir).isDirectory()) return false;
    entries = readdirSync(archiveDir);
  } catch {
    return false;
  }
  const re = new RegExp(`^### ${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'm');
  const snapshotMarker = /^<!-- agent-kanban:v[0-9]+ -->/m;
  for (const name of entries) {
    if (!name.endsWith('.md')) continue;
    let text: string;
    try {
      text = readFileSync(join(archiveDir, name), 'utf8');
    } catch {
      continue;
    }
    // A full-board snapshot (marker-bearing) holds still-live nodes, not closed-node history — skip it.
    if (snapshotMarker.test(text)) continue;
    if (re.test(text)) return true;
  }
  return false;
}

interface ParsedBoard {
  version: number;
  cards: Card[];
  nodes: Node[];
  boardDir: string;
  baseDir: string;
  raw: string;
}

// ---- Step 1: parse + validate a board file into cards/nodes (throws BoardError 1/2/3 on failure) ----
// One node-active rule for ALL parse paths (read, card-write pre/post-image, node-write): MORE THAN
// ONE `[active]` node is a hard-wall failure (exit 3); EXACTLY ZERO is NOT a failure — it is a
// legitimate between-milestones pause reported (not refused) by `validate`/`next` via ZERO_ACTIVE_NOTE.
// This removes the old read/write asymmetry (an `activeMode` that made zero legal on writes but illegal
// on reads) that failed the gate.
function parseBoard(boardPath: string, phasePath: string | undefined): ParsedBoard {
  let isFile = false;
  try {
    isFile = statSync(boardPath).isFile();
  } catch {
    isFile = false;
  }
  if (!boardPath || !isFile) {
    throw new BoardError(1, `no board file given or file not found (${boardPath || '<none>'})`);
  }

  const boardDir = resolve(dirname(boardPath));
  const baseDir = resolveBaseDir(boardDir);

  const raw = readFileSync(boardPath, 'utf8');
  const lines = raw.split('\n');

  // ---- require the marker as the first non-empty line ----
  let firstLine = '';
  for (const line of lines) {
    if (line !== '') {
      firstLine = line;
      break;
    }
  }
  let version = 0;
  if (firstLine === '<!-- agent-kanban:v1 -->') version = 1;
  else if (firstLine === '<!-- agent-kanban:v2 -->') version = 2;
  else throw new BoardError(2, 'no agent-kanban marker (no board)');

  // ---- walk lines, building milestone/lane/card state ----
  const cards: Card[] = [];
  const nodes: Node[] = [];
  let curLane = '';
  let curIdx = -1;
  let inMilestones = false;
  let curNode = -1;

  for (const line of lines) {
    if (line.startsWith('## ')) {
      const name = trimTrailing(line.slice(3));
      if (version === 2 && name === 'Milestones') {
        inMilestones = true;
        curLane = '';
        curIdx = -1;
        curNode = -1;
        continue;
      }
      inMilestones = false;
      curNode = -1;
      if (!isIn(name, VALID_LANES)) fail(`unknown lane: ${name}`, 'lane');
      curLane = name;
      curIdx = -1;
    } else if (line.startsWith('### ')) {
      const rest = line.slice(4);
      if (inMilestones) {
        // ---- a milestone node: `### <ID> — <title> [active|shaped]` ----
        const statusMatch = rest.match(/\s*\[([^\]]*)\]\s*$/);
        if (!statusMatch) fail('node missing [active]/[shaped] status', trimTrailing(rest));
        const status = statusMatch[1];
        if (!isIn(status, NODE_STATUSES)) fail(`unknown node status: [${status}]`, trimTrailing(rest));
        const head = trimTrailing(rest.slice(0, statusMatch.index));
        if (!head.includes(' — ')) fail(`node heading missing ' — ' separator`, head);
        const idEnd = head.indexOf(' —');
        const titleStart = head.indexOf('— ');
        const id = trimTrailing(head.slice(0, idEnd));
        const title = head.slice(titleStart + 2);
        nodes.push({ id, title, status, roadmap: '', plan: '' });
        curNode = nodes.length - 1;
      } else {
        // ---- a card heading ----
        if (!rest.includes(' — ')) fail(`card heading missing ' — ' separator`, rest);
        const idEnd = rest.indexOf(' —');
        const titleStart = rest.indexOf('— ');
        const id = trimTrailing(rest.slice(0, idEnd));
        const title = rest.slice(titleStart + 2);
        if (curLane === '') fail('card appears before any lane heading', id);
        cards.push({
          id,
          title,
          lane: curLane,
          type: '',
          milestone: '',
          intent: '',
          depends: '',
          research: '',
          hasResearch: false,
          source: '',
          outcome: '',
          next: '',
          load: '',
          gate: '',
          evidence: '',
          updated: '',
          blockedBy: '',
          unblockWhen: '',
          present: new Set<string>(),
        });
        curIdx = cards.length - 1;
      }
    } else if (line.startsWith('- ') && line.includes(':')) {
      const field = line.slice(2);
      const colonIdx = field.indexOf(':');
      const key = trimTrailing(field.slice(0, colonIdx));
      const sepIdx = field.indexOf(': ');
      const val = trimBoth(sepIdx !== -1 ? field.slice(sepIdx + 2) : field.slice(colonIdx + 1));

      if (inMilestones && curNode >= 0) {
        const node = nodes[curNode];
        if (key === 'Roadmap') node.roadmap = val;
        else if (key === 'Plan') node.plan = val;
        continue;
      }
      if (curIdx < 0) continue;
      const card = cards[curIdx];
      card.present.add(key);
      switch (key) {
        case 'Type':
          card.type = val;
          break;
        case 'Milestone':
          card.milestone = val;
          break;
        case 'Intent':
          card.intent = val;
          break;
        case 'Depends on':
          card.depends = val;
          break;
        case 'Research':
          card.research = val;
          card.hasResearch = true;
          break;
        case 'Source':
          card.source = val;
          break;
        case 'Outcome':
          card.outcome = val;
          break;
        case 'Next':
          card.next = val;
          break;
        case 'Load':
          card.load = val;
          break;
        case 'Gate':
          card.gate = val;
          break;
        case 'Evidence':
          card.evidence = val;
          break;
        case 'Updated':
          card.updated = val;
          break;
        case 'Blocked by':
          card.blockedBy = val;
          break;
        case 'Unblock when':
          card.unblockWhen = val;
          break;
        default:
          break; // unrecognized field lines are ignored (forward-compat / prose tail)
      }
    }
  }

  validateCommon(cards, baseDir);
  if (version === 2) validateV2(cards, nodes, boardDir, baseDir, phasePath);

  return { version, cards, nodes, boardDir, baseDir, raw };
}

// ---- Validation shared by v1 + v2 (unchanged from the v1 arranger) ----
function validateCommon(cards: Card[], baseDir: string): void {
  const n = cards.length;

  // duplicate IDs (the STF-04 class)
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (cards[i].id === cards[j].id) fail('duplicate ID', cards[i].id);
    }
  }

  const idSet = new Set(cards.map((c) => c.id));

  for (const card of cards) {
    const id = card.id;

    // Type in vocab
    if (!isIn(card.type, VALID_TYPES)) fail(`unknown Type: ${card.type}`, `${id}/Type`);

    // Load-path existence is deliberately NOT checked here. It is board×filesystem state — a
    // card's own work can delete a file its Load names, turning the board "invalid" with zero
    // board writes. As a parse-time wall it bricked every verb (read AND write) at rc=3 with no
    // CLI recovery path (field-proven by FT1-09, 2026-07-17). It is drift, reported report-only
    // by `validate` (see loadDriftNotes), never a validity gate.

    // Depends on: exists, not self (cycle check happens after this loop)
    if (card.depends && card.depends !== 'none') {
      for (const dep of splitList(card.depends)) {
        if (dep === id) fail(`self dependency: ${dep}`, `${id}/Depends on`);
        if (!idSet.has(dep)) fail(`unknown Depends on: ${dep}`, `${id}/Depends on`);
      }
    }

    // Blocked-lane cards must carry Blocked by + Unblock when
    if (card.lane === 'Blocked') {
      if (!card.blockedBy) fail('Blocked card missing Blocked by', `${id}/Blocked by`);
      if (!card.unblockWhen) fail('Blocked card missing Unblock when', `${id}/Unblock when`);
    }
  }

  // dependency-cycle check: DFS over the deps graph, one pass across all cards
  const byId = new Map(cards.map((c) => [c.id, c]));
  function depsOf(target: string): string[] {
    const c = byId.get(target);
    if (!c || !c.depends || c.depends === 'none') return [];
    return splitList(c.depends);
  }
  function dfsVisit(id: string, path: string[]): void {
    if (path.includes(id)) fail(`dependency cycle involving ${id}`, `${id}/Depends on`);
    for (const dep of depsOf(id)) {
      dfsVisit(dep, [...path, id]);
    }
  }
  for (const card of cards) {
    dfsVisit(card.id, []);
  }
}

const V2_REQUIRED_FIELDS = [
  'Type',
  'Milestone',
  'Intent',
  'Depends on',
  'Source',
  'Outcome',
  'Next',
  'Load',
  'Gate',
  'Evidence',
  'Updated',
];

// ---- v2-only validation: milestone nodes + the full card schema ----
function validateV2(
  cards: Card[],
  nodes: Node[],
  boardDir: string,
  baseDir: string,
  phasePath: string | undefined,
): void {
  // ---- resolve the active ROADMAP step from phase.md (REQUIRED for a v2 board) ----
  let phaseFile = phasePath;
  if (!phaseFile) {
    const sibling = join(boardDir, 'phase.md');
    if (existsSync(sibling)) phaseFile = sibling;
  }
  if (!phaseFile || !existsSync(phaseFile)) {
    fail('v2 board requires a phase.md with roadmap_step:', 'phase.md');
  }
  const phaseStepRaw = extractPhaseField(readFileSync(phaseFile, 'utf8'), 'roadmap_step');
  if (!phaseStepRaw) fail('phase.md has no roadmap_step: key (required for a v2 board)', 'phase.md/roadmap_step');
  // Take the FIRST integer run so a trailing `# comment` (whose text may contain digits, e.g. "v2")
  // never pollutes the step number.
  const phaseStepNum = (phaseStepRaw.match(/\d+/) ?? [''])[0];
  if (!phaseStepNum) fail(`phase.md roadmap_step has no numeric step: ${phaseStepRaw}`, 'phase.md/roadmap_step');

  // ---- node rules ----
  const nodeIds = new Set<string>();
  let activeCount = 0;
  for (const node of nodes) {
    if (nodeIds.has(node.id)) fail('duplicate milestone node ID', node.id);
    nodeIds.add(node.id);
    if (node.status === 'active') activeCount++;

    // Roadmap present and equal to phase.md's roadmap_step (no spanning future milestones)
    if (!node.roadmap) fail('milestone node missing Roadmap:', `${node.id}/Roadmap`);
    const nodeStepNum = (node.roadmap.match(/\d+/) ?? [''])[0];
    if (nodeStepNum !== phaseStepNum) {
      fail(
        `node Roadmap "${node.roadmap}" is not the active step (phase.md roadmap_step: ${phaseStepNum})`,
        `${node.id}/Roadmap`,
      );
    }

    // Plan present + resolvable (shaped *means* a Learn/Shape authority exists; active carries one too)
    if (!node.plan) fail('milestone node missing Plan:', `${node.id}/Plan`);
    if (!existsSync(join(baseDir, pointerPath(node.plan)))) {
      fail(`milestone node Plan does not resolve: ${node.plan}`, `${node.id}/Plan`);
    }

    // node IDs never reused across the desk's history
    if (nodeIdInArchive(boardDir, node.id)) {
      fail(`milestone node ID reused (present in archive/): ${node.id}`, node.id);
    }
  }
  // At most one [active] node: two-or-more is ALWAYS refused (hard wall); zero is a legitimate
  // between-milestones pause — reported (via ZERO_ACTIVE_NOTE by validate/next), never failed here.
  if (activeCount > 1) {
    fail(`at most one [active] milestone node allowed, found ${activeCount}`, 'Milestones');
  }

  const activeNodeIds = new Set(nodes.filter((n) => n.status === 'active').map((n) => n.id));
  const nodeById = new Map(nodes.map((n) => [n.id, n]));

  // ---- card rules ----
  for (const card of cards) {
    const id = card.id;

    // required fields present
    for (const f of V2_REQUIRED_FIELDS) {
      if (!card.present.has(f)) fail(`missing required field: ${f}`, `${id}/${f}`);
    }

    // Gate in vocab
    if (!isIn(card.gate, VALID_GATES)) fail(`unknown Gate: ${card.gate}`, `${id}/Gate`);

    // Milestone names a node that exists on the board
    if (!nodeById.has(card.milestone)) {
      fail(`Milestone names a non-existent node: ${card.milestone}`, `${id}/Milestone`);
    }

    // Research gate (optional field): value must be `needed` or `cleared — <pointer>`
    if (card.hasResearch) {
      const r = card.research;
      const cleared = r.match(/^cleared\s+—\s+(\S.*)$/);
      if (r !== 'needed' && !cleared) {
        fail(`malformed Research (expected "needed" or "cleared — <pointer>"): ${r}`, `${id}/Research`);
      }
      if (r === 'needed' && card.type === 'research') {
        fail('a Type: research card cannot itself be Research: needed', `${id}/Research`);
      }
    }

    // node scope: an Active card must belong to the [active] node (unshaped-future refusal)
    if (card.lane === 'Active' && !activeNodeIds.has(card.milestone)) {
      const node = nodeById.get(card.milestone);
      const st = node ? node.status : 'unknown';
      fail(`card in Active belongs to a non-active node (${card.milestone} is [${st}])`, `${id}/Milestone`);
    }
  }
}

// ---- Select: first Verification, else first Active, else first eligible Ready ----
// For v2, a Ready card is eligible only if its milestone node is [active] and its Research gate is
// not `needed` (the structural scope wall). v1 has no node scoping or research gate at all.
function selectNext(cards: Card[], activeNodeIds: Set<string> | null): Card | null {
  const doneIds = new Set(cards.filter((c) => c.lane === 'Done').map((c) => c.id));

  function depsSatisfied(raw: string): boolean {
    if (!raw || raw === 'none') return true;
    return splitList(raw).every((dep) => doneIds.has(dep));
  }
  function readyEligible(c: Card): boolean {
    if (!depsSatisfied(c.depends)) return false;
    if (activeNodeIds !== null) {
      if (!activeNodeIds.has(c.milestone)) return false;
      if (c.research === 'needed') return false;
    }
    return true;
  }

  for (const c of cards) if (c.lane === 'Verification') return c;
  for (const c of cards) if (c.lane === 'Active') return c;
  for (const c of cards) if (c.lane === 'Ready' && readyEligible(c)) return c;
  return null;
}

// ---- v2 selection: same order (Verification -> Active -> first eligible Ready), but a
// `Research: needed` Ready card that would OTHERWISE be next is never selected AND never skipped
// silently — it earns a loud GATE banner (one per such card encountered, in lane order) and
// selection continues to the next eligible Ready card, or falls through to NEXT: (none) with the
// banner(s) standing as the reason.
function selectNextV2(cards: Card[], activeNodeIds: Set<string>): { selected: Card | null; gateBanners: string[] } {
  const doneIds = new Set(cards.filter((c) => c.lane === 'Done').map((c) => c.id));
  function depsSatisfied(raw: string): boolean {
    if (!raw || raw === 'none') return true;
    return splitList(raw).every((dep) => doneIds.has(dep));
  }

  for (const c of cards) if (c.lane === 'Verification') return { selected: c, gateBanners: [] };
  for (const c of cards) if (c.lane === 'Active') return { selected: c, gateBanners: [] };

  const gateBanners: string[] = [];
  for (const c of cards) {
    if (c.lane !== 'Ready') continue;
    if (!depsSatisfied(c.depends)) continue;
    if (!activeNodeIds.has(c.milestone)) continue;
    if (c.research === 'needed') {
      gateBanners.push(`GATE: ${c.id} needs research — add a research card or clear with evidence before it can start`);
      continue;
    }
    return { selected: c, gateBanners };
  }
  return { selected: null, gateBanners };
}

// ---- ROADMAP.md goal-line extraction (render-time only; never invented) ----
// Walks the Delivery-map numbered entry for step N (`N. [ ] **Title** — sentence…`, possibly
// continued on indented following lines), strips the checkbox/numbering/bold markup, and returns
// its first sentence. Returns null (never throws) when ROADMAP.md is missing or the step has no
// extractable entry — the caller degrades loudly instead of inventing a goal line.
function extractRoadmapGoalLine(baseDir: string, stepNum: string): string | null {
  const roadmapPath = join(baseDir, 'ROADMAP.md');
  if (!existsSync(roadmapPath)) return null;
  let lines: string[];
  try {
    lines = readFileSync(roadmapPath, 'utf8').split('\n');
  } catch {
    return null;
  }

  const startRe = new RegExp(`^${stepNum}\\.\\s*\\[[^\\]]*\\]\\s*(.*)$`);
  let idx = -1;
  let firstPart = '';
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(startRe);
    if (m) {
      idx = i;
      firstPart = m[1];
      break;
    }
  }
  if (idx === -1) return null;

  // continuation: indented lines immediately following, until a blank line or a new list item.
  const parts = [firstPart];
  for (let i = idx + 1; i < lines.length; i++) {
    const line = lines[i];
    if (trimBoth(line) === '') break;
    if (/^\s/.test(line) && !/^\s*\d+[a-z]?\.\s/.test(line)) {
      parts.push(trimBoth(line));
    } else {
      break;
    }
  }

  let text = parts.join(' ').replace(/\s+/g, ' ').trim();
  text = text.replace(/\*\*/g, ''); // strip markdown bold
  if (!text) return null;
  const sentence = text.match(/^(.*?\.)(\s|$)/);
  const result = (sentence ? sentence[1] : text).trim();
  return result || null;
}

// ---- v2 rendering: the milestone goal-line + full arc-in-context block ----
function renderMilestoneLine(node: Node, baseDir: string): string {
  const stepNum = (node.roadmap.match(/\d+/) ?? [''])[0];
  const goal = extractRoadmapGoalLine(baseDir, stepNum);
  const goalText = goal ? `"${goal}"` : `(goal line unavailable — read ROADMAP.md step ${stepNum})`;
  return `  milestone: ${node.id} — ${node.title} → ROADMAP step ${stepNum}: ${goalText}`;
}

function renderArcBlock(sel: Card, cards: Card[], nodes: Node[], baseDir: string): string[] {
  const node = nodes.find((n) => n.id === sel.milestone);
  const milestoneLine = node
    ? renderMilestoneLine(node, baseDir)
    : `  milestone: ${sel.milestone} — (unknown node)`;
  // unblocks: reverse `Depends on` over ALL live cards, derived at render time — never stored.
  const unblocks = cards.filter((c) => splitList(c.depends).includes(sel.id)).map((c) => c.id);
  const researchLine = sel.hasResearch ? sel.research : '—';
  return [
    `NEXT: ${sel.id} — ${sel.title}`,
    milestoneLine,
    `  intent: ${sel.intent}`,
    `  -> ${sel.next}`,
    `  load: ${sel.load}`,
    `  unblocks: ${unblocks.length ? unblocks.join(', ') : '—'}`,
    `  research: ${researchLine}`,
  ];
}

// ---- NEXT: block — v1 keeps its light 3-line form; v2 renders the full derived arc ----
function nextBlockLines(parsed: ParsedBoard, activeNodeIds: Set<string> | null): string[] {
  const { cards, nodes, version, baseDir } = parsed;
  if (version !== 2) {
    const sel = selectNext(cards, activeNodeIds);
    if (sel) {
      return [`NEXT: ${sel.id}`, `  -> ${sel.next}`, `  load: ${sel.load}`];
    }
    return ['NEXT: (none)'];
  }

  // Zero [active] nodes (a legitimate between-milestones pause) → no work is selectable; emit
  // NEXT: (none) with the standing note instead of scanning cards (spec §The selector + derived arc).
  if (!activeNodeIds || activeNodeIds.size === 0) {
    return ['NEXT: (none)', `  note: ${ZERO_ACTIVE_NOTE}`];
  }

  const { selected, gateBanners } = selectNextV2(cards, activeNodeIds);
  const out: string[] = [...gateBanners];
  if (selected) {
    out.push(...renderArcBlock(selected, cards, nodes, baseDir));
  } else {
    out.push('NEXT: (none)');
  }
  return out;
}

// ---- validate's goal-line report: non-fatal (board schema is otherwise valid) but never silent
// about a degraded render — one WARN line per distinct unresolvable Roadmap step across all nodes.
function checkRoadmapIntegrity(nodes: Node[], baseDir: string): string[] {
  const warnings: string[] = [];
  const seen = new Set<string>();
  for (const node of nodes) {
    const stepNum = (node.roadmap.match(/\d+/) ?? [''])[0];
    if (!stepNum || seen.has(stepNum)) continue;
    seen.add(stepNum);
    if (extractRoadmapGoalLine(baseDir, stepNum) === null) {
      warnings.push(`WARN: goal line unavailable — read ROADMAP.md step ${stepNum}`);
    }
  }
  return warnings;
}

// ---- validate --drift: reverse-drift probe (WP7, spec §Reverse-drift) ----
// Report-only, never throws, never affects the exit code: take commits since the newest card
// `Updated:` timestamp, drop any whose diff touches ONLY journal/, .wl/, or blog/ (bookkeeping,
// via `git diff-tree` path filters — deterministic), and flag every remaining commit whose short
// hash appears in no card `Evidence:`. Honest limitation (spec, unchanged by this code): every
// board write refreshes `Updated:`, so a write after an unauthorized commit moves the window PAST
// it — this catches only drift committed since the last board write, never archaeology.
const DRIFT_EXEMPT_PREFIXES = ['journal/', '.wl/', 'blog/'];

// Load-path drift: unresolved Load: paths, reported by `validate` for every board version —
// report-only (exit stays 0), like the standing-exception notes. Never a parse-time wall; see the
// comment in validateCommon for the FT1-09 field-proof that moved it here.
function loadDriftNotes(parsed: ParsedBoard): string[] {
  const notes: string[] = [];
  for (const card of parsed.cards) {
    for (const p of splitList(card.load)) {
      if (!existsSync(join(parsed.baseDir, pointerPath(p)))) {
        notes.push(`note: unresolved Load path — ${card.id}/Load: ${p}`);
      }
    }
  }
  return notes;
}

function checkReverseDrift(parsed: ParsedBoard): string[] {
  const { cards, baseDir } = parsed;
  // Edge case 1 (reconciliation fixture): no live cards → no newest Updated: to anchor the
  // window. Report, never scan all history.
  if (cards.length === 0) return ['no live cards — drift window unavailable'];

  let sinceMs = -Infinity;
  for (const c of cards) {
    const t = Date.parse(c.updated);
    if (!Number.isNaN(t) && t > sinceMs) sinceMs = t;
  }
  if (sinceMs === -Infinity) return ['no card Updated: timestamp — drift window unavailable'];
  // Pass a full ISO instant (not the raw card text) to `--since`: a bare `YYYY-MM-DD` (no
  // time-of-day, e.g. `Updated: 2026-07-16`) is a real git approxidate trap — git anchors it to
  // END of that day, not the start, silently hiding every same-day commit from the window.
  const sinceIso = new Date(sinceMs).toISOString();

  let log: string;
  try {
    log = execFileSync(
      'git',
      ['-C', baseDir, 'log', '--no-merges', `--since=${sinceIso}`, '--abbrev=7', '--format=%h%x1f%s', 'HEAD'],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
    );
  } catch {
    return []; // not a git repo (or no commits yet) — nothing to probe; stays report-only.
  }

  const evidenceBlob = cards.map((c) => c.evidence).join('\n');
  const out: string[] = [];
  for (const line of log.split('\n')) {
    if (!line) continue;
    const sep = line.indexOf('\x1f');
    const hash = line.slice(0, sep);
    const subject = line.slice(sep + 1);

    let files: string[];
    try {
      files = execFileSync(
        'git',
        ['-C', baseDir, 'diff-tree', '--no-commit-id', '--name-only', '-r', '--root', hash],
        { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
      )
        .split('\n')
        .filter((f) => f.length > 0);
    } catch {
      continue; // unreadable commit — skip rather than fail a report-only probe.
    }
    // "Drop commits whose diff touches ONLY journal/, .wl/, or blog/" — a commit with NO changed
    // files (an edge diff-tree can't resolve) is not "only bookkeeping"; it stays and gets checked.
    const bookkeepingOnly = files.length > 0 && files.every((f) => DRIFT_EXEMPT_PREFIXES.some((p) => f.startsWith(p)));
    if (bookkeepingOnly) continue;
    if (!evidenceBlob.includes(hash)) out.push(`DRIFT: commit ${hash} "${subject}" matches no card Evidence`);
  }
  return out;
}

// ---- Render: PHASE + (MILESTONES) + lanes + BLOCKED + NEXT ----
function renderBoard(parsed: ParsedBoard, phasePathArg: string | undefined): string {
  const { cards, nodes, version, boardDir } = parsed;
  const out: string[] = [];

  // Resolve phase.md: explicit arg, else sibling to the board file, else PHASE: (unknown).
  let phaseFile = phasePathArg;
  if (!phaseFile) {
    const sibling = join(boardDir, 'phase.md');
    if (existsSync(sibling)) phaseFile = sibling;
  }

  let phaseVal = '';
  let subPhaseVal = '';
  if (phaseFile && existsSync(phaseFile)) {
    const content = readFileSync(phaseFile, 'utf8');
    phaseVal = extractPhaseField(content, 'phase');
    subPhaseVal = extractPhaseField(content, 'sub_phase');
  }

  if (phaseVal) {
    out.push(`PHASE: ${phaseVal}/${subPhaseVal}`);
  } else {
    out.push('PHASE: (unknown)');
  }
  out.push('');

  // v2: a light milestone listing (the full ROADMAP-goal-line arc renders on the NEXT: block below,
  // via nextBlockLines/renderArcBlock — the MILESTONES section itself stays a plain id/title/status
  // roll call).
  if (version === 2) {
    out.push('MILESTONES:');
    for (const node of nodes) {
      out.push(`  ${node.id} — ${node.title} [${node.status}]`);
    }
    out.push('');
  }

  for (const lane of RENDER_LANES) {
    out.push(`${lane}:`);
    for (const c of cards) {
      if (c.lane === lane) out.push(`  ${c.id} — ${c.title}`);
    }
    out.push('');
  }

  out.push('BLOCKED:');
  for (const c of cards) {
    if (c.lane === 'Blocked') {
      out.push(`  ${c.id} — ${c.title}`);
      out.push(`    Unblock when: ${c.unblockWhen}`);
    }
  }
  out.push('');

  const activeNodeIds =
    version === 2 ? new Set(nodes.filter((n) => n.status === 'active').map((n) => n.id)) : null;
  out.push(...nextBlockLines(parsed, activeNodeIds));

  return out.join('\n') + '\n';
}

// ============================================================================
// WP5 — the validated write path (card verbs + node verbs).
//
// Every write verb runs ONE pipeline (spec §"The validated write path"):
//   1. parse + validate the PRE-image — a corrupt board refuses ALL writes (exit 3); never write on
//      top of corruption.
//   2. apply the mutation as a TEXT SURGERY on the raw lines (relocating/editing exactly the target
//      block) — a duplicate is unrepresentable in a relocation; the rest of the file, including the
//      prose tail below the board, is preserved byte-for-byte.
//   3. validate the POST-image (a full re-parse of the candidate) — a policy refusal (exit 4) or a
//      structural failure (exit 3) throws BEFORE the disk is touched.
//   4. write atomically — a temp file in the board's own directory + rename (single-writer
//      crash-safety) — stamp `Updated:` on the touched card, then print the resulting NEXT: block.
//
// A refused write throws before the rename, so the on-disk board is byte-identical (the temp file is
// unlinked). Only the Active-cap accepts `--override <reason>`; the 3-started cap, dependency rules,
// duplicate IDs, node scoping, and Done-terminality are hard walls with no override.
// ============================================================================

function isoNow(): string {
  return new Date().toISOString();
}
function today(): string {
  return new Date().toISOString().slice(0, 10);
}
function pad2(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

interface RawCard {
  id: string;
  title: string;
  lane: string;
  start: number;
  end: number;
}
interface RawNode {
  id: string;
  title: string;
  status: string;
  start: number;
  end: number;
}

// The field name of a `- <Field>: <value>` line, or null for any other line.
function fieldNameOf(line: string): string | null {
  if (!line.startsWith('- ')) return null;
  const body = line.slice(2);
  const c = body.indexOf(':');
  return c === -1 ? null : trimTrailing(body.slice(0, c));
}

// Scan raw lines into card + node blocks with their [start,end) line ranges and owning lane/section.
// A block is a `### …` heading + the contiguous `- Field:` lines under it (cards/nodes never carry a
// blank line mid-body — the block ends at the first non-field line), mirroring parseBoard's walk.
function scanRaw(lines: string[]): { cards: RawCard[]; nodes: RawNode[] } {
  const cards: RawCard[] = [];
  const nodes: RawNode[] = [];
  let curLane = '';
  let inMilestones = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('## ')) {
      const name = trimTrailing(line.slice(3));
      inMilestones = name === 'Milestones';
      curLane = inMilestones ? '' : isIn(name, VALID_LANES) ? name : '';
    } else if (line.startsWith('### ')) {
      let end = i + 1;
      while (end < lines.length && lines[end].startsWith('- ')) end++;
      const rest = line.slice(4);
      if (inMilestones) {
        const statusMatch = rest.match(/\s*\[([^\]]*)\]\s*$/);
        const status = statusMatch ? statusMatch[1] : '';
        const head = statusMatch ? trimTrailing(rest.slice(0, statusMatch.index)) : trimTrailing(rest);
        const idEnd = head.indexOf(' —');
        const id = idEnd === -1 ? head : trimTrailing(head.slice(0, idEnd));
        const title = idEnd === -1 ? '' : head.slice(head.indexOf('— ') + 2);
        nodes.push({ id, title, status, start: i, end });
      } else {
        const idEnd = rest.indexOf(' —');
        const id = idEnd === -1 ? trimTrailing(rest) : trimTrailing(rest.slice(0, idEnd));
        const title = idEnd === -1 ? '' : rest.slice(rest.indexOf('— ') + 2);
        cards.push({ id, title, lane: curLane, start: i, end });
      }
    }
  }
  return { cards, nodes };
}

// A block is an array [heading, field-line, field-line, …]. These operate on that isolated array so
// the caller can splice the whole block back in one move (index-shift-safe).
function setFieldArr(block: string[], field: string, value: string): void {
  for (let i = 1; i < block.length; i++) {
    if (fieldNameOf(block[i]) === field) {
      block[i] = `- ${field}: ${value}`;
      return;
    }
  }
  block.push(`- ${field}: ${value}`);
}
function removeFieldArr(block: string[], field: string): void {
  for (let i = block.length - 1; i >= 1; i--) {
    if (fieldNameOf(block[i]) === field) block.splice(i, 1);
  }
}
function laneHeadingIdx(lines: string[], lane: string): number {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('## ') && trimTrailing(lines[i].slice(3)) === lane) return i;
  }
  return -1;
}

// Write the candidate atomically, gated by a FULL post-image re-parse (the same validator the read
// path runs). A validation failure unlinks the temp file and rethrows — the on-disk board is never
// touched. On success the temp file is renamed over the board and the parsed post-image is returned.
//
// `beforeRename` runs AFTER the post-image validates but BEFORE the board is committed (the rename).
// node-close uses it to persist the archive first, so a crash between the two leaves the node still on
// the board plus a harmless orphan archive — never lost Done-card evidence. If beforeRename throws, the
// temp is unlinked and the on-disk board is left byte-identical.
function writeCandidate(
  boardPath: string,
  phasePath: string | undefined,
  candidate: string,
  beforeRename?: (parsed: ParsedBoard) => void,
): ParsedBoard {
  const dir = dirname(resolve(boardPath));
  const tmp = join(dir, `.kanban.${process.pid}.${Date.now()}.tmp`);
  writeFileSync(tmp, candidate);
  let parsed: ParsedBoard;
  try {
    parsed = parseBoard(tmp, phasePath);
    if (beforeRename) beforeRename(parsed);
  } catch (e) {
    try {
      unlinkSync(tmp);
    } catch {
      /* best-effort cleanup */
    }
    throw e;
  }
  renameSync(tmp, boardPath);
  return parsed;
}

function printNext(parsed: ParsedBoard): void {
  const activeNodeIds =
    parsed.version === 2
      ? new Set(parsed.nodes.filter((n) => n.status === 'active').map((n) => n.id))
      : null;
  process.stdout.write(nextBlockLines(parsed, activeNodeIds).join('\n') + '\n');
}

function requireV2(parsed: ParsedBoard, verb: string): void {
  if (parsed.version !== 2) {
    refuse(`${verb}: write verbs require an agent-kanban:v2 board (this board is v${parsed.version})`, 'marker');
  }
}

// max card number within a node over live cards AND removal tombstones (never reissued). The node
// prefix is anchored so FT1 never matches FT12-… .
function maxCardNum(raw: string, cards: Card[], node: string): number {
  const esc = node.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  let max = 0;
  const liveRe = new RegExp(`^${esc}-(\\d+)$`);
  for (const c of cards) {
    const m = c.id.match(liveRe);
    if (m) max = Math.max(max, parseInt(m[1], 10));
  }
  const tombRe = new RegExp(`<!-- removed: ${esc}-(\\d+)\\b`, 'g');
  for (const m of raw.matchAll(tombRe)) max = Math.max(max, parseInt(m[1], 10));
  return max;
}

interface Flags {
  [k: string]: string | true;
}
function flagStr(flags: Flags, key: string): string | undefined {
  const v = flags[key];
  return typeof v === 'string' ? v : undefined;
}

// ---- add: a new card into Ready (CLI assigns the ID) ----------------------
function doAdd(boardPath: string, phasePath: string | undefined, flags: Flags): void {
  const pre = parseBoard(boardPath, phasePath);
  requireV2(pre, 'add');

  const body = readFileSync(0, 'utf8'); // stdin card body
  const bodyLines = body.split('\n');
  const headIdx = bodyLines.findIndex((l) => l.startsWith('### '));
  if (headIdx === -1) refuse(`add: stdin card body must start with a '### <title>' heading`, 'stdin');
  const title = trimTrailing(bodyLines[headIdx].slice(4));
  const fieldLines = bodyLines.slice(headIdx + 1).filter((l) => l.startsWith('- '));
  if (fieldLines.length === 0) refuse('add: stdin card body has no fields', 'stdin');

  const milestoneLine = fieldLines.find((l) => fieldNameOf(l) === 'Milestone');
  const node = milestoneLine ? trimBoth(milestoneLine.slice(milestoneLine.indexOf(':') + 1)) : '';
  if (!node) refuse('add: stdin card body has no Milestone field', 'stdin/Milestone');
  if (!pre.nodes.some((n) => n.id === node)) refuse(`add: milestone node does not exist: ${node}`, node);

  const id = `${node}-${pad2(maxCardNum(pre.raw, pre.cards, node) + 1)}`;

  const block = [`### ${id} — ${title}`, ...fieldLines];
  setFieldArr(block, 'Updated', isoNow());

  const lines = pre.raw.split('\n');
  const readyIdx = laneHeadingIdx(lines, 'Ready');
  if (readyIdx === -1) fail('board has no ## Ready lane', 'Ready');
  lines.splice(readyIdx + 1, 0, ...block);

  const parsed = writeCandidate(boardPath, phasePath, lines.join('\n'));
  printNext(parsed);
}

// ---- move: a policy-checked lane move --------------------------------------
const STARTED_LANES = new Set(['Active', 'Verification', 'Blocked']);
const LEGAL_MOVES: Record<string, string[]> = {
  Ready: ['Active'],
  Active: ['Verification', 'Blocked'],
  Verification: ['Done', 'Active', 'Blocked'],
  Blocked: ['Active', 'Verification'],
};

function doMove(boardPath: string, phasePath: string | undefined, id: string, target: string, flags: Flags): void {
  const pre = parseBoard(boardPath, phasePath);
  requireV2(pre, 'move');

  if (!isIn(target, VALID_LANES)) refuse(`move: unknown target lane: ${target}`, target);
  const card = pre.cards.find((c) => c.id === id);
  if (!card) refuse(`move: no such card: ${id}`, id);
  const src = card.lane;
  if (src === target) refuse(`move: card already in ${target}`, id);
  if (src === 'Done') refuse(`move: Done is terminal — ${id} cannot leave Done`, `${id}/lane`);
  if (!(LEGAL_MOVES[src] ?? []).includes(target)) refuse(`move: illegal transition ${src} → ${target}`, id);

  const evidenceFlag = flagStr(flags, 'evidence');
  const effectiveEvidence = evidenceFlag !== undefined ? evidenceFlag : card.evidence;
  const override = flagStr(flags, 'override');

  // ---- transition preconditions (policy refusals, exit 4) ----
  if (target === 'Active' && src === 'Ready') {
    const doneIds = new Set(pre.cards.filter((c) => c.lane === 'Done').map((c) => c.id));
    for (const dep of splitList(card.depends)) {
      if (dep !== 'none' && !doneIds.has(dep)) {
        refuse(`move: ${id} depends on ${dep} which is not Done`, `${id}/Depends on`);
      }
    }
    if (card.research === 'needed') refuse(`move: ${id} is Research: needed — clear the gate first`, `${id}/Research`);
    const activeNodeIds = new Set(pre.nodes.filter((n) => n.status === 'active').map((n) => n.id));
    if (!activeNodeIds.has(card.milestone)) {
      refuse(`move: ${id} belongs to node ${card.milestone} which is not [active]`, `${id}/Milestone`);
    }
  }
  if (target === 'Verification' && src === 'Active') {
    if (!effectiveEvidence || effectiveEvidence === 'pending') {
      refuse(`move: ${id} has no initial Evidence (still 'pending') — attach it via --evidence or update`, `${id}/Evidence`);
    }
  }
  if (target === 'Done') {
    if (!effectiveEvidence || effectiveEvidence === 'pending') {
      refuse(`move: ${id} has no final Evidence for Done — attach it via --evidence`, `${id}/Evidence`);
    }
  }
  if (target === 'Blocked') {
    if (flagStr(flags, 'blocked-by') === undefined || flagStr(flags, 'unblock-when') === undefined) {
      refuse(`move: →Blocked requires --blocked-by and --unblock-when`, id);
    }
  }

  // ---- WIP caps ----
  const curActive = pre.cards.filter((c) => c.lane === 'Active').length;
  const curStarted = pre.cards.filter((c) => STARTED_LANES.has(c.lane)).length;
  const srcStarted = STARTED_LANES.has(src);
  const tgtStarted = STARTED_LANES.has(target);
  if (tgtStarted && !srcStarted) {
    const postStarted = curStarted + 1;
    if (postStarted > 3) refuse(`move: WIP cap — ${postStarted} started (max 3); no override`, id);
  }
  if (target === 'Active') {
    const postActive = curActive + (src === 'Active' ? 0 : 1);
    if (postActive > 1 && override === undefined) {
      refuse(`move: WIP cap — ${postActive} in Active (max 1); pass --override "<reason>"`, id);
    }
  }

  // ---- text surgery: relocate the block, stamp Updated, apply evidence/blocker fields ----
  const lines = pre.raw.split('\n');
  const rc = scanRaw(lines).cards.find((c) => c.id === id)!;
  const block = lines.slice(rc.start, rc.end);
  setFieldArr(block, 'Updated', isoNow());
  if (evidenceFlag !== undefined) setFieldArr(block, 'Evidence', evidenceFlag);
  if (target === 'Blocked') {
    setFieldArr(block, 'Blocked by', flagStr(flags, 'blocked-by')!);
    setFieldArr(block, 'Unblock when', flagStr(flags, 'unblock-when')!);
  } else if (src === 'Blocked') {
    removeFieldArr(block, 'Blocked by');
    removeFieldArr(block, 'Unblock when');
  }
  lines.splice(rc.start, rc.end - rc.start);
  const laneIdx = laneHeadingIdx(lines, target);
  if (laneIdx === -1) fail(`board has no ## ${target} lane`, target);
  lines.splice(laneIdx + 1, 0, ...block);

  const parsed = writeCandidate(boardPath, phasePath, lines.join('\n'));
  if (target === 'Active' && curActive + (src === 'Active' ? 0 : 1) > 1 && override !== undefined) {
    // Active-cap override: reason to CLI output + (later) /end handoff — never onto the card.
    process.stdout.write(`OVERRIDE: Active-cap exceeded by design — ${override}\n`);
  }
  printNext(parsed);
}

// ---- update: edit one whitelisted field ------------------------------------
const UPDATABLE_FIELDS = ['Intent', 'Depends on', 'Research', 'Source', 'Outcome', 'Next', 'Load', 'Gate', 'Evidence'];
const IMMUTABLE_FIELDS = ['Type', 'Milestone', 'ID'];

function doUpdate(boardPath: string, phasePath: string | undefined, id: string, field: string, value: string): void {
  const pre = parseBoard(boardPath, phasePath);
  requireV2(pre, 'update');

  if (IMMUTABLE_FIELDS.includes(field)) refuse(`update: field ${field} is immutable (use remove + add)`, `${id}/${field}`);
  if (!UPDATABLE_FIELDS.includes(field)) refuse(`update: field not updatable: ${field}`, `${id}/${field}`);
  const card = pre.cards.find((c) => c.id === id);
  if (!card) refuse(`update: no such card: ${id}`, id);

  const lines = pre.raw.split('\n');
  const rc = scanRaw(lines).cards.find((c) => c.id === id)!;
  const block = lines.slice(rc.start, rc.end);
  setFieldArr(block, field, value);
  setFieldArr(block, 'Updated', isoNow());
  lines.splice(rc.start, rc.end - rc.start, ...block);

  const parsed = writeCandidate(boardPath, phasePath, lines.join('\n'));
  printNext(parsed);
}

// ---- remove: dangling-dep-protected delete + foot tombstone ----------------
function doRemove(boardPath: string, phasePath: string | undefined, id: string, flags: Flags): void {
  const reason = flagStr(flags, 'reason');
  if (!reason) refuse('remove: --reason <text> required', id);
  const pre = parseBoard(boardPath, phasePath);
  requireV2(pre, 'remove');

  const card = pre.cards.find((c) => c.id === id);
  if (!card) refuse(`remove: no such card: ${id}`, id);
  for (const c of pre.cards) {
    if (c.id !== id && splitList(c.depends).includes(id)) {
      refuse(`remove: ${c.id} still depends on ${id}`, `${c.id}/Depends on`);
    }
  }

  const lines = pre.raw.split('\n');
  const rc = scanRaw(lines).cards.find((c) => c.id === id)!;
  lines.splice(rc.start, rc.end - rc.start);
  let text = lines.join('\n');
  if (!text.endsWith('\n')) text += '\n';
  text += `<!-- removed: ${id} — ${reason} (${today()}) -->\n`;

  const parsed = writeCandidate(boardPath, phasePath, text);
  printNext(parsed);
}

// ---- node-add: a new [shaped] milestone node -------------------------------
function doNodeAdd(boardPath: string, phasePath: string | undefined, id: string, title: string, flags: Flags): void {
  const roadmap = flagStr(flags, 'roadmap');
  const plan = flagStr(flags, 'plan');
  if (!roadmap) refuse('node-add: --roadmap <N> required', id);
  if (!plan) refuse('node-add: --plan <ptr> required', id);
  const pre = parseBoard(boardPath, phasePath);
  requireV2(pre, 'node-add');
  if (pre.nodes.some((n) => n.id === id)) refuse(`node-add: node ${id} already exists`, id);

  const roadmapVal = /^step\b/.test(roadmap) ? roadmap : `step ${roadmap}`;
  const block = [`### ${id} — ${title} [shaped]`, `- Roadmap: ${roadmapVal}`, `- Plan: ${plan}`];

  const lines = pre.raw.split('\n');
  const msIdx = laneHeadingIdx(lines, 'Milestones');
  if (msIdx === -1) fail('board has no ## Milestones section', 'Milestones');
  // insert before the first ## lane heading after Milestones (append to the node section).
  let insertAt = lines.length;
  for (let i = msIdx + 1; i < lines.length; i++) {
    if (lines[i].startsWith('## ')) {
      insertAt = i;
      break;
    }
  }
  lines.splice(insertAt, 0, ...block);

  const parsed = writeCandidate(boardPath, phasePath, lines.join('\n'));
  printNext(parsed);
}

// ---- node-activate: flip [shaped] → [active]; refuse a SECOND [active] (at-most-one hard wall) --
function doNodeActivate(boardPath: string, phasePath: string | undefined, id: string): void {
  const pre = parseBoard(boardPath, phasePath);
  requireV2(pre, 'node-activate');
  const node = pre.nodes.find((n) => n.id === id);
  if (!node) refuse(`node-activate: no such node: ${id}`, id);
  if (node.status === 'active') refuse(`node-activate: node ${id} is already [active]`, id);
  if (node.status !== 'shaped') refuse(`node-activate: node ${id} is not [shaped]`, id);
  const other = pre.nodes.find((n) => n.status === 'active' && n.id !== id);
  if (other) refuse(`node-activate: activating ${id} would create a second [active] node (${other.id} is already [active])`, id);

  const lines = pre.raw.split('\n');
  const rn = scanRaw(lines).nodes.find((n) => n.id === id)!;
  lines[rn.start] = lines[rn.start].replace(/\[shaped\]/, '[active]');

  const parsed = writeCandidate(boardPath, phasePath, lines.join('\n'));
  printNext(parsed);
}

// ---- node-update: edit a node's Roadmap/Plan pointer -----------------------
function doNodeUpdate(boardPath: string, phasePath: string | undefined, id: string, field: string, value: string): void {
  const pre = parseBoard(boardPath, phasePath);
  requireV2(pre, 'node-update');
  if (field !== 'Roadmap' && field !== 'Plan') refuse(`node-update: field must be Roadmap or Plan (got ${field})`, id);
  const node = pre.nodes.find((n) => n.id === id);
  if (!node) refuse(`node-update: no such node: ${id}`, id);
  const val = field === 'Roadmap' && !/^step\b/.test(value) ? `step ${value}` : value;

  const lines = pre.raw.split('\n');
  const rn = scanRaw(lines).nodes.find((n) => n.id === id)!;
  const block = lines.slice(rn.start, rn.end);
  setFieldArr(block, field, val);
  lines.splice(rn.start, rn.end - rn.start, ...block);

  const parsed = writeCandidate(boardPath, phasePath, lines.join('\n'));
  printNext(parsed);
}

// ---- node-close: archive a node + its Done cards off the live board --------
function doNodeClose(boardPath: string, phasePath: string | undefined, id: string): void {
  const pre = parseBoard(boardPath, phasePath);
  requireV2(pre, 'node-close');
  const node = pre.nodes.find((n) => n.id === id);
  if (!node) refuse(`node-close: no such node: ${id}`, id);
  const own = pre.cards.filter((c) => c.milestone === id);
  const nonDone = own.find((c) => c.lane !== 'Done');
  if (nonDone) refuse(`node-close: node ${id} has non-Done card ${nonDone.id} — resolve it first`, nonDone.id);

  const lines = pre.raw.split('\n');
  const scan = scanRaw(lines);
  const rn = scan.nodes.find((n) => n.id === id)!;
  const doneBlocks = scan.cards.filter((c) => own.some((o) => o.id === c.id));

  // archive content: the node block + its Done cards (so the ID stays unique-vs-archive forever).
  const archiveLines: string[] = [];
  archiveLines.push(...lines.slice(rn.start, rn.end));
  for (const b of doneBlocks) archiveLines.push(...lines.slice(b.start, b.end));

  // remove node + Done-card blocks from the live board, highest line index first (index-shift-safe).
  const removals = [rn, ...doneBlocks].sort((a, b) => b.start - a.start);
  for (const r of removals) lines.splice(r.start, r.end - r.start);

  // Crash-atomic ordering (spec §Command integration / node-close): persist the archive BEFORE the
  // board rename, inside writeCandidate's beforeRename hook — so it runs only after the post-image
  // validates, yet before the Done cards leave the live board. A crash between the archive write and
  // the rename therefore leaves the node + its Done cards STILL on the board plus a harmless orphan
  // archive (recovery: delete the orphan, retry) — the worst case never LOSES Done-card evidence.
  const parsed = writeCandidate(boardPath, phasePath, lines.join('\n'), (post) => {
    const archiveDir = join(post.boardDir, 'archive');
    try {
      mkdirSync(archiveDir, { recursive: true });
    } catch {
      /* dir may exist */
    }
    const stamp = isoNow().replace(/[:.]/g, '-');
    writeFileSync(join(archiveDir, `${id}-${stamp}.md`), archiveLines.join('\n') + '\n');
  });

  printNext(parsed);
}

const READ_VERBS = ['board', 'show', 'next', 'validate'];
const WRITE_VERBS = ['add', 'move', 'update', 'remove', 'node-add', 'node-activate', 'node-update', 'node-close'];

function main(): void {
  const rawArgv = process.argv.slice(2);
  const verb = rawArgv[0] ?? '';

  // `--drift` (validate only) is a bare boolean flag with no value — strip it out before the
  // generic `--key value` parser below runs, so it can appear before OR after the positional
  // board/phase paths without ever being swallowed as an ordinary flag's value (the loop below
  // treats any non-`--` token right after a flag as that flag's value, which would otherwise eat
  // the board path).
  let driftRequested = false;
  const argv = rawArgv.filter((a, i) => {
    if (i === 0) return true; // keep the verb
    if (a === '--drift') {
      driftRequested = true;
      return false;
    }
    return true;
  });

  // Split the rest into positionals + `--key value` flags (a bare `--flag` is boolean-true).
  const pos: string[] = [];
  const flags: Flags = {};
  for (let i = 1; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next !== undefined && !next.startsWith('--')) {
        flags[key] = next;
        i++;
      } else {
        flags[key] = true;
      }
    } else {
      pos.push(a);
    }
  }

  if (!READ_VERBS.includes(verb) && !WRITE_VERBS.includes(verb)) {
    errorExit(1, `unknown verb (${verb || '<none>'}) — expected ${[...READ_VERBS, ...WRITE_VERBS].join('|')}`);
  }

  const DEFAULT_BOARD = 'journal/ops/tasks.md';
  const isRead = READ_VERBS.includes(verb);
  // Read verbs keep their positional [board] [phase] form; --board/--phase override. Write verbs use
  // the flags only (their positionals are verb arguments).
  const boardPath = flagStr(flags, 'board') ?? (isRead ? pos[0] : undefined) ?? DEFAULT_BOARD;
  const phasePath = flagStr(flags, 'phase') ?? (isRead ? pos[1] : undefined);

  try {
    if (isRead) {
      const parsed = parseBoard(boardPath, phasePath);
      if (verb === 'validate') {
        // Load-path drift notes fire for BOTH versions — the check lives outside validateCommon
        // (report-only) because board×filesystem state must never brick a parse (FT1-09).
        for (const note of loadDriftNotes(parsed)) {
          process.stdout.write(note + '\n');
        }
        if (parsed.version === 2) {
          for (const w of checkRoadmapIntegrity(parsed.nodes, parsed.baseDir)) {
            process.stdout.write(w + '\n');
          }
          // Zero [active] nodes → report the between-milestones note (report-only, exit stays 0).
          if (!parsed.nodes.some((n) => n.status === 'active')) {
            process.stdout.write(`note: ${ZERO_ACTIVE_NOTE}\n`);
          }
          // Standing Active-cap exception: a board legitimately carrying >1 Active card (via a prior
          // `move --override`) is structurally valid but re-surfaced here report-only, naming the
          // started cards — no card mutation, no stored reason (spec §Lane/movement/WIP).
          const activeCards = parsed.cards.filter((c) => c.lane === 'Active');
          if (activeCards.length > 1) {
            process.stdout.write(
              `note: standing Active-cap exception — ${activeCards.length} cards in Active (${activeCards
                .map((c) => c.id)
                .join(', ')}); expected 1 (a prior --override)\n`,
            );
          }
          // Standing WIP exception: a board carrying >3 started cards (Active+Verification+Blocked)
          // is a POLICY breach, not structural corruption — every card is well-formed — so it is
          // surfaced report-only (exit stays 0), never exit-3. An exit-3 would DEADLOCK a hand-edited
          // over-WIP board: its pre-image parse would fail on every write, so you could not even
          // `move` a card out of a started lane to recover. The move-time 3-started hard wall in
          // doMove is the enforcement; this mirrors the Active-cap surfacing above (spec §Lane/movement/WIP).
          const startedCards = parsed.cards.filter((c) => STARTED_LANES.has(c.lane));
          if (startedCards.length > 3) {
            process.stdout.write(
              `note: standing WIP exception — ${startedCards.length} cards started (max 3): ${startedCards
                .map((c) => c.id)
                .join(', ')} — reduce started work (move a card to Done or back to Ready)\n`,
            );
          }
        }
        if (driftRequested) {
          for (const line of checkReverseDrift(parsed)) {
            process.stdout.write(line + '\n');
          }
        }
      } else if (verb === 'next') {
        const activeNodeIds =
          parsed.version === 2
            ? new Set(parsed.nodes.filter((n) => n.status === 'active').map((n) => n.id))
            : null;
        process.stdout.write(nextBlockLines(parsed, activeNodeIds).join('\n') + '\n');
      } else {
        process.stdout.write(renderBoard(parsed, phasePath));
      }
    } else {
      switch (verb) {
        case 'add':
          doAdd(boardPath, phasePath, flags);
          break;
        case 'move':
          if (!pos[0] || !pos[1]) errorExit(1, 'move requires <ID> <lane>');
          doMove(boardPath, phasePath, pos[0], pos[1], flags);
          break;
        case 'update':
          if (!pos[0] || !pos[1] || pos[2] === undefined) errorExit(1, 'update requires <ID> <Field> <value>');
          doUpdate(boardPath, phasePath, pos[0], pos[1], pos.slice(2).join(' '));
          break;
        case 'remove':
          if (!pos[0]) errorExit(1, 'remove requires <ID>');
          doRemove(boardPath, phasePath, pos[0], flags);
          break;
        case 'node-add':
          if (!pos[0] || pos[1] === undefined) errorExit(1, 'node-add requires <ID> <title>');
          doNodeAdd(boardPath, phasePath, pos[0], pos.slice(1).join(' '), flags);
          break;
        case 'node-activate':
          if (!pos[0]) errorExit(1, 'node-activate requires <ID>');
          doNodeActivate(boardPath, phasePath, pos[0]);
          break;
        case 'node-update':
          if (!pos[0] || !pos[1] || pos[2] === undefined) errorExit(1, 'node-update requires <ID> <Roadmap|Plan> <value>');
          doNodeUpdate(boardPath, phasePath, pos[0], pos[1], pos.slice(2).join(' '));
          break;
        case 'node-close':
          if (!pos[0]) errorExit(1, 'node-close requires <ID>');
          doNodeClose(boardPath, phasePath, pos[0]);
          break;
      }
    }
  } catch (e) {
    if (e instanceof BoardError) errorExit(e.code, e.message);
    throw e;
  }
  process.exit(0);
}

main();
