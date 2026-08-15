#!/usr/bin/env node
// LDB-03 §11 — the approval criteria, as an actual re-runnable check.
//
// EXTENDED 2026-08-15 by LDB-09 (§14 criteria 1-3, 6-7). Checks 1, 2, 4 and 6 were widened and
// checks 7-8 added. The reason check 1 had to change is itself the point: LDB-09's five ungraded
// types have primaryFor AND secondaryFor both empty and would have FAILED check 1 as written, so
// the coverage clause admitting them is enforced here rather than asserted in prose.
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

// 1. Every Activity type declares Skill coverage OR a non-empty `rehearses` (LDB-09 D1).
//    Every rehearses id must resolve in the skill graph — "names the Skill it rehearses" is only
//    meaningful if the name is real.
{
  const reh = t => t.rehearses || [];
  const empty = types.filter(t => (t.primaryFor.length + t.secondaryFor.length + reh(t).length) === 0);
  const badReh = types.flatMap(t => reh(t).filter(id => !skillIds.has(id)).map(id => `${t.id}->${id}`));
  check('1 type->skill', empty.length === 0 && badReh.length === 0,
    `${types.length} types checked: ` +
    types.map(t => `${t.id}=${t.primaryFor.length}p/${t.secondaryFor.length}s/${reh(t).length}r`).join(', ') +
    `; empty=[${empty.map(t => t.id).join(', ') || 'none'}]` +
    `; unresolved-rehearses=[${badReh.join(', ') || 'none'}]`);
}

// 2. Every Skill maps to at least one Activity type that could produce PRIMARY evidence.
//    LDB-09 D1: `rehearses` contributes NOTHING here. A Skill named only in a rehearses list is
//    still uncovered — asserted explicitly so rehearsal can never be mistaken for coverage.
{
  const primaryCover = new Set(types.flatMap(t => t.primaryFor));
  const uncovered = skills.map(s => s.id).filter(id => !primaryCover.has(id));
  const unknown = [...primaryCover].filter(id => !skillIds.has(id));
  const rehearsed = new Set(types.flatMap(t => t.rehearses || []));
  const rehearsalOnly = [...rehearsed].filter(id => !primaryCover.has(id));
  check('2 skill->primary type', uncovered.length === 0 && unknown.length === 0,
    `${skills.length} skills; covered=${skills.length - uncovered.length}; ` +
    `uncovered=[${uncovered.join(', ') || 'none'}]; unknown-ids-in-taxonomy=[${unknown.join(', ') || 'none'}]; ` +
    `rehearsed-but-not-covered=[${rehearsalOnly.join(', ') || 'none'}] (rehearsal grants no coverage by design)`);
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
  // LDB-09: A-23 (LDB-03) plus A-26..A-28 (LDB-09). `A-25` must stay ABSENT — it was allocated to a
  // cap dropped at LDB-05 and is recorded as never filed; a reissue would collide with that record.
  const expectedNew = ['A-23', 'A-26', 'A-27', 'A-28'];
  const newMatches = d.new.length === expectedNew.length && expectedNew.every(id => d.new.includes(id));
  const a25Reissued = d.new.includes('A-25');
  const missingNew = d.new.filter(id => !rowPresent(id));
  const missingCited = d.cited.filter(id => !rowPresent(id));
  const ok = d.netNewRows === d.new.length && newMatches && !a25Reissued
    && missingNew.length === 0 && missingCited.length === 0;
  check('6 register delta', ok,
    `declared netNewRows=${d.netNewRows}, new=[${d.new.join(', ')}] (expect [${expectedNew.join(', ')}]); ` +
    `found in assumption-register.md: new=[${newPresent.join(', ') || 'none'}], ` +
    `cited=[${citedPresent.join(', ') || 'none'}] of declared cited [${d.cited.join(', ')}]; ` +
    `MISSING new=[${missingNew.join(', ') || 'none'}] cited=[${missingCited.join(', ') || 'none'}]; ` +
    `A-25-reissued=${a25Reissued}`);
}

// 7. Ungraded types are structurally ungraded — LDB-09 D1/D8. A type admitted for play must not
//    silently acquire evidence coverage in a later edit.
{
  const ungraded = types.filter(t => t.graded === false);
  const viol = [];
  for (const t of ungraded) {
    if (t.primaryFor.length) viol.push(`${t.id} has primaryFor`);
    if (t.secondaryFor.length) viol.push(`${t.id} has secondaryFor`);
    if (!(t.rehearses || []).length) viol.push(`${t.id} has no rehearses`);
    const g = t.gradedBy || [];
    if (!(g.length === 1 && g[0] === 'none')) viol.push(`${t.id} gradedBy=[${g.join(',')}] not [none]`);
    if (!t.register && !t.adoptedFrom) viol.push(`${t.id} names neither a register row nor a source row`);
  }
  check('7 ungraded type integrity', viol.length === 0,
    `${ungraded.length} ungraded types = [${ungraded.map(t => t.id).join(', ') || 'none'}]; ` +
    `graded types = [${types.filter(t => t.graded !== false).map(t => t.id).join(', ')}]; ` +
    `violations=[${viol.join(' | ') || 'none'}]`);
}

// 8. The play axis — LDB-09 D4. Exactly the 19 unadopted rows carry a play verdict, each with a
//    reason; no adopted row carries one; declared counts match computed.
{
  const pv = T.playVerdicts || {};
  const v = pv.verdicts || [];
  const unadopted = new Set(T.patternVerdicts
    .filter(p => p.verdict === 'rejected' || p.verdict === 'not-adopted-no-target')
    .map(p => p.id));
  const ids = v.map(p => p.id);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  const notUnadopted = ids.filter(id => !unadopted.has(id));
  const missing = [...unadopted].filter(id => !ids.includes(id));
  const noReason = v.filter(p => !p.reason || !p.reason.trim()).map(p => p.id);
  const noVerdict = v.filter(p => !p.play).map(p => p.id);
  const tally = {};
  v.forEach(p => tally[p.play] = (tally[p.play] || 0) + 1);
  const dec = pv.counts || {};
  const mismatch = Object.keys(tally).filter(k => tally[k] !== dec[k]);
  const ok = v.length === 19 && unadopted.size === 19 && !dupes.length && !notUnadopted.length
    && !missing.length && !noReason.length && !noVerdict.length && !mismatch.length
    && dec.total === v.length;
  check('8 play verdicts', ok,
    `n=${v.length} (expect 19); unadopted-in-taxonomy=${unadopted.size}; ` +
    `dupes=[${dupes.join(', ') || 'none'}]; ` +
    `carrying-a-play-verdict-but-not-unadopted=[${notUnadopted.join(', ') || 'none'}]; ` +
    `unadopted-with-no-play-verdict=[${missing.join(', ') || 'none'}]; ` +
    `missing-reason=[${noReason.join(', ') || 'none'}]; missing-verdict=[${noVerdict.join(', ') || 'none'}]; ` +
    `computed=${JSON.stringify(tally)}; declared=${JSON.stringify(dec)}; ` +
    `count-mismatch=[${mismatch.join(', ') || 'none'}]`);
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
