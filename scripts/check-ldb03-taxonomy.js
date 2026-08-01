#!/usr/bin/env node
// LDB-03 §11 — the six approval criteria, as an actual re-runnable check.
//
// The spec asserted "each is a script check ... all six of which passed on 2026-08-01" while no
// script existed. That is the shape AGENTS.md's third evidence rule forbids: a claim whose absent
// verifier reads as a pass. So every check below enumerates POSITIVELY what it looked for and
// where, and prints those findings on success as well as on failure. A silent PASS proves nothing.
//
//   node scripts/check-ldb03-taxonomy.js     # exits 0 if all six pass, 1 otherwise
//
// Sources of truth: 2026-08-01-activity-taxonomy.json is authoritative over its prose spec
// (spec §0), 2026-08-01-skill-graph.json is authoritative for the Skills (LDB-01, approved).
const fs = require('fs');
const path = require('path');

const SPECS = path.join(__dirname, '..', 'docs', 'superpowers', 'specs');
const read = f => fs.readFileSync(path.join(SPECS, f), 'utf8');
const T = JSON.parse(read('2026-08-01-activity-taxonomy.json'));
const G = JSON.parse(read('2026-08-01-skill-graph.json'));
const MD = read('2026-08-01-activity-taxonomy-and-skill-mapping.md');
const REG = read('assumption-register.md');

let pass = 0, fail = 0;
const check = (name, ok, detail) => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}\n      ${detail}`);
  ok ? pass++ : fail++;
};

const types = T.activityTypes;
const skills = G.skills;
const skillIds = new Set(skills.map(s => s.id));

// 1. Every Activity type maps to at least one Skill.
{
  const empty = types.filter(t => (t.primaryFor.length + t.secondaryFor.length) === 0);
  check('1 type->skill', empty.length === 0,
    `${types.length} types checked: ` +
    types.map(t => `${t.id}=${t.primaryFor.length}p/${t.secondaryFor.length}s`).join(', ') +
    `; empty=[${empty.map(t => t.id).join(', ') || 'none'}]`);
}

// 2. Every Skill maps to at least one Activity type that could produce PRIMARY evidence.
{
  const primaryCover = new Set(types.flatMap(t => t.primaryFor));
  const uncovered = skills.map(s => s.id).filter(id => !primaryCover.has(id));
  const unknown = [...primaryCover].filter(id => !skillIds.has(id));
  check('2 skill->primary type', uncovered.length === 0 && unknown.length === 0,
    `${skills.length} skills; covered=${skills.length - uncovered.length}; ` +
    `uncovered=[${uncovered.join(', ') || 'none'}]; unknown-ids-in-taxonomy=[${unknown.join(', ') || 'none'}]`);
}

// 3. No Skill that is a decision is measured only by recognition (spec §4).
{
  const decisions = skills.filter(s => s.outcome.classificationIncluded === true).map(s => s.id);
  const supplied = types.filter(t => t.classificationSupplied);
  const posedOnly = types.filter(t => t.provenance.length === 1 && t.provenance[0] === 'posed');
  const viol = [];
  for (const t of types) {
    for (const sid of t.primaryFor) {
      if (!decisions.includes(sid)) continue;
      if (t.classificationSupplied === true) viol.push(`${t.id} classificationSupplied primary for ${sid}`);
      if (posedOnly.includes(t)) viol.push(`${t.id} posed-only primary for ${sid}`);
    }
  }
  check('3 recognition ban', viol.length === 0,
    `decision skills (classificationIncluded:true) = [${decisions.join(', ')}]; ` +
    `classificationSupplied types = [${supplied.map(t => t.id).join(', ') || 'none'}]; ` +
    `posed-only types = [${posedOnly.map(t => t.id).join(', ') || 'none'}]; ` +
    `violations=[${viol.join(' | ') || 'none'}]`);
}

// 4. Every one of the 32 patterns carries a verdict and a reason; no dupes; counts match the tally.
{
  const v = T.patternVerdicts;
  const ids = v.map(p => p.id);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  const noReason = v.filter(p => !p.reason || !p.reason.trim()).map(p => p.id);
  const noVerdict = v.filter(p => !p.verdict).map(p => p.id);
  const tally = {};
  v.forEach(p => tally[p.verdict] = (tally[p.verdict] || 0) + 1);
  const declared = T.verdictCounts;
  const mismatch = Object.keys(tally).filter(k => tally[k] !== declared[k]);
  const totalOk = declared.total === v.length && v.length === 32;
  check('4 pattern verdicts',
    dupes.length === 0 && !noReason.length && !noVerdict.length && !mismatch.length && totalOk,
    `n=${v.length} (expect 32); dupes=[${dupes.join(', ') || 'none'}]; ` +
    `missing-reason=[${noReason.join(', ') || 'none'}]; missing-verdict=[${noVerdict.join(', ') || 'none'}]; ` +
    `computed=${JSON.stringify(tally)}; declared=${JSON.stringify(declared)}; ` +
    `count-mismatch=[${mismatch.join(', ') || 'none'}]`);
}

// 5. The word-bank vs Parsons boundary is ruled once, in writing — with what it overturns named.
{
  const hasRule = /### 3\.1 The ruling/.test(MD);
  const hasOverturns = /### 3\.2 What the ruling overturns/.test(MD);
  const p = T.poolRule || {};
  const inJson = !!(p.statement && p.overturns && p.disagreesWith && (p.rules || []).length === 4);
  check('5 pool ruling', hasRule && hasOverturns && inJson,
    `md §3.1=${hasRule}; md §3.2=${hasOverturns}; ` +
    `json.poolRule statement=${!!p.statement} overturns=${!!p.overturns} ` +
    `disagreesWith=${!!p.disagreesWith} cases=${(p.rules || []).length}/4` +
    (p.statement ? ` -> "${p.statement.slice(0, 80)}..."` : ''));
}

// 6. Net new register rows are stated AND actually present in the register — enumerated, not assumed.
{
  const d = T.registerDelta;
  const rowPresent = id => new RegExp(`\\b${id}\\b`).test(REG);
  const newPresent = d.new.filter(rowPresent);
  const citedPresent = d.cited.filter(rowPresent);
  const ok = d.netNewRows === d.new.length && d.new.length === 1 && d.new[0] === 'A-23'
    && newPresent.length === d.new.length && citedPresent.length === d.cited.length;
  check('6 register delta', ok,
    `declared netNewRows=${d.netNewRows}, new=[${d.new.join(', ')}]; ` +
    `found in assumption-register.md: new=[${newPresent.join(', ') || 'none'}], ` +
    `cited=[${citedPresent.join(', ') || 'none'}] of declared cited [${d.cited.join(', ')}]`);
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
