#!/usr/bin/env node
// LDB-03 §11 — the approval criteria, as an actual re-runnable check.
//
// EXTENDED 2026-08-15 by LDB-09 (§14 criteria 1-3, 6-7). Checks 1, 2, 4 and 6 were widened and
// checks 7-8 added. The reason check 1 had to change is itself the point: LDB-09's five ungraded
// types have primaryFor AND secondaryFor both empty and would have FAILED check 1 as written, so
// the coverage clause admitting them is enforced here rather than asserted in prose.
//
// EXTENDED 2026-08-22 by LDB-11 (§5, approved at its gate). Checks 9-11 added, check 6's expected
// list widened by A-31/A-32. Check 9 reads the shape-legality DATA LDB-11 D14 moved into the JSON
// (`sessionShapes`, per-type `legalIn`) and recomputes it from RC-03's two clauses, so a type added
// without deciding its shape legality fails. Check 10 is LDB-11 D2 made mechanical: the declaration
// record's fields never reach a Mastery, meter, Recommender or difficulty computation. Check 11 is
// the recomputation that caught LDB-11 D5's own miscomputed table: every Skill carrying a bar has a
// primaryFor type that can run in a proving-run.
//
// The spec asserted "each is a script check ... all six of which passed on 2026-08-01" while no
// script existed. That is the shape AGENTS.md's third evidence rule forbids: a claim whose absent
// verifier reads as a pass. So every check below enumerates POSITIVELY what it looked for and
// where, and prints those findings on success as well as on failure. A silent PASS proves nothing.
//
//   node scripts/check-ldb03-taxonomy.js     # exits 0 if all eleven pass, 1 otherwise
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
const UX  = read('2026-08-22-interaction-ux.md');

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
  // LDB-11 (2026-08-22): A-31, A-32. LDB-07 (2026-08-22): A-33, A-34, A-35 — session-shape naming,
  // the change of kind at the bar, and reveal-without-verdict. A-21 stays under `cited`: D12 ships the
  // brush ungraded, so it makes no measurement claim and does not spend the row.
  // A-17a is a SUB-ROW of A-17 and is listed under `cited`, not
  // `new` — it is not a net-new id, the same convention A-07a..e follow.
  const expectedNew = ['A-23', 'A-26', 'A-27', 'A-28', 'A-31', 'A-32', 'A-33', 'A-34', 'A-35'];
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

// 9. Shape legality — LDB-11 D14, enforcing LDB-06 RC-03 UNAMENDED over the three shapes LDB-11 D16
//    leaves the model with. `Challenge` is a structure and never appears in a legality set. Each
//    type's declared `legalIn` is RECOMPUTED here from its provenance (clause 1) and whether it has
//    any primaryFor (clause 2: a type yielding no window-eligible evidence is legal in exactly
//    {coached-session}); a missing or disagreeing legalIn fails.
{
  const ss = T.sessionShapes || {};
  const shapes = ss.values || [];
  const modes = ss.provenanceModes || {};
  const expectedShapes = ['coached-session', 'closing-run', 'proving-run'];
  const shapesOk = shapes.length === 3 && expectedShapes.every(x => shapes.includes(x))
    && shapes.every(x => Array.isArray(modes[x]) && modes[x].length > 0);
  const viol = [];
  const rows = [];
  for (const t of types) {
    const computed = shapes.filter(sh =>
      t.provenance.some(m => (modes[sh] || []).includes(m))          // clause 1
      && (t.primaryFor.length > 0 || sh === 'coached-session'));      // clause 2
    const declared = t.legalIn;
    if (!Array.isArray(declared)) { viol.push(`${t.id}: no legalIn`); rows.push(`${t.id}=MISSING`); continue; }
    const same = declared.length === computed.length && computed.every(x => declared.includes(x));
    if (!same) viol.push(`${t.id}: declared [${declared.join(',')}] != computed [${computed.join(',')}]`);
    if (t.primaryFor.length === 0 && !(declared.length === 1 && declared[0] === 'coached-session'))
      viol.push(`${t.id}: yields no window-eligible evidence yet legal outside coached-session`);
    rows.push(`${t.id}=[${declared.join(',')}]`);
  }
  const challengeLeak = types.filter(t => (t.legalIn || []).some(x => /challenge/i.test(x))).map(t => t.id);
  if (challengeLeak.length) viol.push(`Challenge appears as a shape on: ${challengeLeak.join(', ')}`);
  const coachedOnly = types.filter(t => (t.legalIn || []).length === 1 && t.legalIn[0] === 'coached-session').length;
  const provingLegal = types.filter(t => (t.legalIn || []).includes('proving-run')).map(t => t.id);
  check('9 shape legality (RC-03 unamended over 3 shapes)', shapesOk && viol.length === 0,
    `shapes=[${shapes.join(', ')}] (expect [${expectedShapes.join(', ')}]); ` +
    `modes=${JSON.stringify(modes)}; ${types.length} types: ${rows.join(', ')}; ` +
    `coached-only=${coachedOnly}; proving-run-legal=[${provingLegal.join(', ')}]; ` +
    `violations=[${viol.join(' | ') || 'none'}]`);
}

// 10. Confidence isolation — LDB-11 D2. The declaration record (D13) is write-only with respect to
//     Mastery, the three LDB-05 D7 meters, the Recommender and difficulty selection. Field names are
//     read from the LDB-11 spec's D13 table (so the check and the spec cannot drift apart), and the
//     forbidden loci are ENUMERATED: every non-test .ts under web/src/progress/ that computes one of
//     those things, and the three approved specs that define them. `target` and `outcome` are too
//     generic to grep and are excluded, said so, and covered by the record's other four names.
{
  const LDB11 = read('2026-08-19-challenge-and-unit-skip-test.md');
  const d13 = LDB11.split('### D13.')[1] || '';
  const fields = [...d13.matchAll(/^\| `([A-Za-z]+)` \|/gm)].map(m => m[1]);
  const distinctive = fields.filter(f => !['target', 'outcome'].includes(f));
  const fieldsOk = fields.length === 6 && distinctive.length === 4;
  const PROG = path.join(__dirname, '..', 'web', 'src', 'progress');
  const codeFiles = fs.existsSync(PROG)
    ? fs.readdirSync(PROG).filter(f => f.endsWith('.ts') && !f.endsWith('.test.ts')).map(f => path.join(PROG, f))
    : [];
  const computes = /mastery|meter|recommend|difficult/i;
  const codeLoci = codeFiles.filter(f => computes.test(fs.readFileSync(f, 'utf8')));
  const specLoci = ['2026-08-03-evidence-and-mastery-rules.md', '2026-08-04-motivation-and-chips-economy.md',
    '2026-08-08-session-composition.md'].map(f => path.join(SPECS, f));
  const hits = [];
  for (const f of [...codeLoci, ...specLoci]) {
    const txt = fs.readFileSync(f, 'utf8');
    for (const name of distinctive) {
      const n = (txt.match(new RegExp(`\\b${name}\\b`, 'g')) || []).length;
      if (n) hits.push(`${path.relative(path.join(__dirname, '..'), f)}:${name}x${n}`);
    }
  }
  check('10 confidence isolation (D2 mechanical)', fieldsOk && hits.length === 0,
    `D13 fields=[${fields.join(', ')}] (expect 6); grepped=[${distinctive.join(', ')}] ` +
    `(target/outcome excluded as generic); code loci scanned=[${codeLoci.map(f => path.basename(f)).join(', ') || 'none'}] ` +
    `of ${codeFiles.length} non-test files; spec loci scanned=${specLoci.length}; ` +
    `forbidden hits=[${hits.join(', ') || 'none'}]`);
}

// 11. Every Challenge target is provable — LDB-11 D5/D11. Every Skill carrying a Mastery bar has at
//     least one primaryFor type whose provenance contains a mode a proving-run can run in. Found by
//     a human recomputing D5's table; this is that recomputation, run every time.
{
  const mb = T.masteryBar || {};
  const noBar = new Set(mb.withoutBar || []);
  const unknownNoBar = [...noBar].filter(id => !skillIds.has(id));
  const gated = skills.map(s => s.id).filter(id => !noBar.has(id));
  const provingModes = ((T.sessionShapes || {}).provenanceModes || {})['proving-run'] || [];
  const provable = new Set(types
    .filter(t => t.provenance.some(m => provingModes.includes(m)))
    .flatMap(t => t.primaryFor));
  const unprovable = gated.filter(id => !provable.has(id));
  const noBarUnprovable = [...noBar].filter(id => !provable.has(id));
  check('11 every Challenge target is provable', unknownNoBar.length === 0 && gated.length === 17 && unprovable.length === 0,
    `skills=${skills.length}; withoutBar=[${[...noBar].join(', ')}] (unknown ids=[${unknownNoBar.join(', ') || 'none'}]); ` +
    `gated=${gated.length} (expect 17); proving-run modes=[${provingModes.join(', ')}]; ` +
    `provable skills=${[...provable].filter(id => skillIds.has(id)).length}; ` +
    `gated-but-unprovable=[${unprovable.join(', ') || 'none'}]; ` +
    `no-bar-and-unprovable=[${noBarUnprovable.join(', ') || 'none'}] (the hole D11 closes)`);
}


// --- helper: pull one markdown section, heading exclusive of the next same-or-higher heading ---
const section = (md, heading) => {
  const i = md.indexOf(heading);
  if (i < 0) return '';
  const depth = heading.match(/^#+/)[0].length;
  const rest = md.slice(i + heading.length);
  const m = rest.match(new RegExp(`\\n#{1,${depth}} `));
  return m ? rest.slice(0, m.index) : rest;
};

// 12. Discharge completeness — LDB-07 D20. Three clauses against the spec's Discharge table.
//     Earned by a documented failure, not written just in case: LDB-04 D11 reassigned `space` to
//     LDB-07 on 2026-08-03 and the JSON still read owner:"LDB-04" NINETEEN DAYS later (LDB-07 D21).
//     Nothing in this repository could have noticed. Clauses (a) and (b) would have.
{
  const disch = section(UX, '### Discharge');
  const rows = disch.split('\n').filter(l => /^\|\s*(H|P|C)\d+\s*\|/.test(l));
  const kind = k => rows.filter(r => new RegExp(`^\\|\\s*${k}\\d+\\s*\\|`).test(r));
  const cRows = kind('C'), pRows = kind('P'), hRows = kind('H');

  // (a) every Activity type has an operation-contract row
  const missingTypes = types.map(t => t.id)
    .filter(id => !cRows.some(r => r.includes('`' + id + '`')));

  // (b) every parameter carrying owner:"LDB-07" has a disposition row
  const owned = types.flatMap(t => (t.parameters || [])
    .filter(p => p.owner === 'LDB-07').map(p => `${t.id}.${p.id}`));
  const missingParams = owned
    .filter(q => !pRows.some(r => r.includes('`' + q.split('.')[1] + '`')));

  // (c) every "To LDB-07" handoff item is dispositioned, and every source spec is represented
  const SOURCES = ['LDB-04', 'LDB-05', 'LDB-06', 'LDB-09', 'LDB-11'];
  const sourcesSeen = SOURCES.filter(k2 => hRows.some(r => r.includes(k2)));
  const sourcesMissing = SOURCES.filter(k2 => !sourcesSeen.includes(k2));
  // and the source files must still carry the handoff they are being discharged against
  const HANDOFF_FILES = {
    'LDB-04': '2026-08-03-evidence-and-mastery-rules.md',
    'LDB-05': '2026-08-04-motivation-and-chips-economy.md',
    'LDB-06': '2026-08-08-session-composition.md',
    'LDB-09': '2026-08-15-play-verdicts-and-ungraded-activities.md',
    'LDB-11': '2026-08-19-challenge-and-unit-skip-test.md',
  };
  const lostAtSource = Object.entries(HANDOFF_FILES)
    .filter(([, f]) => !/LDB-07/.test(read(f))).map(([k2]) => k2);

  const DISPOSITIONS = ['answered', 'declined', 'forwarded'];
  const undisposed = rows.filter(r => !DISPOSITIONS.some(d => r.toLowerCase().includes(d)));

  const ok = rows.length > 0 && missingTypes.length === 0 && missingParams.length === 0
    && sourcesMissing.length === 0 && lostAtSource.length === 0
    && undisposed.length === 0 && hRows.length === 25;

  check('12 discharge completeness (LDB-07 D20)', ok,
    `rows=${rows.length} (C=${cRows.length} of ${types.length} types, P=${pRows.length} of ${owned.length} owned params, H=${hRows.length}, expect H=25); ` +
    `types missing a contract row=[${missingTypes.join(', ') || 'none'}]; ` +
    `owned params=[${owned.join(', ')}]; missing a disposition row=[${missingParams.join(', ') || 'none'}]; ` +
    `handoff sources represented=[${sourcesSeen.join(', ') || 'none'}] missing=[${sourcesMissing.join(', ') || 'none'}]; ` +
    `source files that no longer name LDB-07=[${lostAtSource.join(', ') || 'none'}]; ` +
    `rows with no disposition word=${undisposed.length}; ` +
    `limit, stated: the H count is DECLARED (25, enumerated by hand 2026-08-22), not derived — ` +
    `a sixth spec adding a new "To LDB-07" handoff is not detected here`);
}

// 13. WCAG mapping integrity — LDB-07 D3 / Testing Decisions. Earned by K-U4-016, which found
//     ALR-040 presenting an AAA criterion inside what read as an AA baseline; caught by a
//     verification pass rather than by design.
{
  const d3 = section(UX, '### D3. Target Level AA, with two named voluntary commitments');
  // the criterion -> level table: | 1.4.1 Use of Color | **A** |
  const levels = {};
  for (const m of d3.matchAll(/^\|\s*(\d\.\d+\.\d+)\s[^|]*\|\s*\*\*(A{1,3})\*\*\s*\|/gm)) levels[m[1]] = m[2];
  // the ALR mapping table: | ALR-036 | ... | rests-on cell carries `4.1.2 (A)` style citations
  const alrRows = d3.split('\n').filter(l => /^\|\s*ALR-0(3[6-9]|4[01])\b[^|]*\|/.test(l));
  const alrSeen = alrRows.map(r => r.match(/ALR-0\d\d/)[0]);
  const ALL = ['ALR-036', 'ALR-037', 'ALR-038', 'ALR-039', 'ALR-040', 'ALR-041'];
  const alrMissing = ALL.filter(a => !alrSeen.includes(a));

  const noSC = alrRows.filter(r => /no success criterion/i.test(r)).map(r => r.match(/ALR-0\d\d/)[0]);
  const voluntary = alrRows.filter(r => /voluntary, above baseline/i.test(r)).map(r => r.match(/ALR-0\d\d/)[0]);

  // every criterion cited in the mapping must appear in the level table, at the SAME level
  const cited = [], mismatched = [], uncited = [];
  for (const r of alrRows) {
    for (const m of r.matchAll(/(\d\.\d+\.\d+)\s*\((A{1,3})\)/g)) {
      cited.push(m[1]);
      if (!levels[m[1]]) uncited.push(m[1]);
      else if (levels[m[1]] !== m[2]) mismatched.push(`${m[1]}: mapping says ${m[2]}, table says ${levels[m[1]]}`);
    }
  }
  const ok = alrMissing.length === 0 && noSC.length === 1 && noSC[0] === 'ALR-041'
    && voluntary.length === 2 && voluntary.includes('ALR-039') && voluntary.includes('ALR-040')
    && uncited.length === 0 && mismatched.length === 0 && Object.keys(levels).length > 0;

  check('13 WCAG mapping integrity (LDB-07 D3)', ok,
    `criteria in D3 level table=${Object.keys(levels).length} ` +
    `(A=${Object.values(levels).filter(v => v === 'A').length}, ` +
    `AA=${Object.values(levels).filter(v => v === 'AA').length}, ` +
    `AAA=${Object.values(levels).filter(v => v === 'AAA').length}); ` +
    `ALR rows found=[${alrSeen.join(', ') || 'none'}] missing=[${alrMissing.join(', ') || 'none'}]; ` +
    `marked "no success criterion"=[${noSC.join(', ') || 'none'}] (expect exactly ALR-041); ` +
    `marked "voluntary, above baseline"=[${voluntary.join(', ') || 'none'}] (expect exactly ALR-039, ALR-040); ` +
    `criteria cited by the mapping=${cited.length}, absent from the level table=[${uncited.join(', ') || 'none'}], ` +
    `level disagreements=[${mismatched.join('; ') || 'none'}]`);
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
