# LDB-03 Independent Verification Record

> **Status: IN PROGRESS — written incrementally.** Every claim below is marked either with a
> terminal verdict or explicitly **NOT YET CHECKED**. An unmarked or absent claim has *not* been
> cleared. Absence of a verdict is not a pass.
>
> **Document under review:** `docs/superpowers/specs/2026-07-30-activity-taxonomy-and-capability-map.md`
> **Verifier role:** independent; did not author the document, did not collect the evidence.
> **Capability boundary:** read-only over product code and archive; no Bash, no Edit. This record is
> the only file written.
> **Scope limit, stated up front:** the underlying academic papers are not in this repo and are
> mostly paywalled. **I did not open any primary academic source.** Everything below tests (a) does
> the document faithfully represent the archive it cites, and (b) does the archive support what the
> document says it does.

---

## PRIORITY CLAIM — ALR-007–012

### P1. "ALR-007–012, the six requirements attached to Assemble Blocks, carry only an abstention in the Phase 2 audit — no verifier confirmed them." (§4, line 179-180)

**Verdict: PARTIALLY-CONFIRMED.** True in substance; the characterisation is imprecise, and the
imprecision runs *against* the document's own interest (it understates how un-assessed four of the
six are). No collection needed.

**Loci opened (I opened all of these; the author states he opened none of them):**
- `docs/superpowers/research/foundation-audit-p2/audit/U4-audit.md:156-199` (the landed audit record)
- `docs/superpowers/research/foundation-audit-p2/verification/V-U4.md:157-186` (the verification record)
- `docs/superpowers/research/foundation-audit-p2/verification/V-U4.md:194` (correction C-U4-003)
- `docs/superpowers/research/foundation-audit-p2/verification/LV-U4.md:15, :100-118` (landing verification)
- `docs/superpowers/research/evidence-index/P2-verdict-catalog.md:231` (what the author actually read)
- `docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md:155-192` (the requirements themselves)

**What holds.**

"The six requirements attached to Assemble Blocks" is exactly right. The audited unit's heading at
`…-research.md:155` is `### Assemble Blocks`, and ALR-007 (`:157`) through ALR-012 (`:187`) sit under
it — six, no more, no fewer.

"No verifier confirmed them" is accurate as a statement about verdicts. `U4-audit.md:166` reads
verbatim:

> **ALR-007 through ALR-012** (assemble blocks). Left unassessed.

and `U4-audit.md:197-198` reads verbatim:

> No verdict is manufactured for them here — issuing one is the examiner role's, not the
> landing editor's.

No `Preserve`, `Revise` or `Replace` verdict exists for any of the six. `LV-U4.md:100-102`
independently enumerates which requirements got verdict rows — ALR-001, -004, -005, -022, -036,
-037, -040 — and none of ALR-007–012 is among them. I checked that list positively rather than
relying on its absence.

**What the document misses, and it is material to precision (not to the conclusion).**

The archive does **not** leave the abstention standing as a single undifferentiated thing. The
verifier ruled the examiner's stated *reason* factually wrong for four of the six, and that ruling
landed. `V-U4.md:157-160` verbatim:

> ## Ruling on the ALR-007–ALR-012 abstention
>
> **Partially legitimate; the stated rationale is wrong and must be corrected — but no collection is
> required.**

`V-U4.md:166-173` verbatim:

> - ALR-007 (`:159`) — `DUO-002`, `BRI-001`, `SCI-004`, `SCI-009`: partly dependent; two of its four
>   sources were re-opened in this pass.
> - ALR-011 (`:183`) — `SCI-004`, `SCI-009`: genuinely dependent. Abstention legitimate.
> - ALR-008 (`:165`) — `DUO-004`, `TECH-001`, `TECH-002`: **names neither SCI-004 nor SCI-009.**
> - ALR-009 (`:171`) — `TECH-002` only: **TECH-002 was re-opened in this very pass** (K-U4-018).
> - ALR-010 (`:177`) — `TECH-001`, `TECH-002`: TECH-002 re-opened.
> - ALR-012 (`:189`) — `STD-001`, `STD-002`: **STD-001 was re-opened in this very pass**
>   (K-U4-015/016/017).

The correction landed. `U4-audit.md:194-197` now reads verbatim:

> For **ALR-008, ALR-009, ALR-010 and ALR-012** the
> abstention stands **unexplained**: they were assessable from sources already in hand and simply
> were not assessed. This is recorded as an open coverage gap in this pass, not as a justified
> abstention.

So the archive's landed position is: **two** of the six (ALR-007, ALR-011) carry a *justified*
abstention; **four** carry an *unexplained coverage gap* which the archive explicitly refuses to
call a justified abstention. The document's flat "carry only an abstention" collapses that
distinction. Note the direction: the archive is *harsher* on those four than the document is. The
document's use of the claim — that F2's narrowed scope does not rest on unverified requirements — is
therefore supported at least as strongly as stated, and arguably more so.

**One qualifier on "no verifier confirmed them."** A verifier did open one of the six requirements'
underlying source and formed a favourable, expressly non-binding judgement about it.
`V-U4.md:177-180` verbatim:

> Having verified STD-001 myself I note ALR-012's
> elements (2.5.7 AA, 2.5.8 AA, 2.4.3/2.1.1 A) all sit at or below AA — so it very likely carries no
> AAA defect — but that is a judgement the audit role must make and record, not one I may substitute
> for it.

This does not make ALR-012 "confirmed" — the verifier explicitly declines to substitute a verdict —
but a reader of the document would not know that ALR-012's sources were re-opened and that the
verifier's own read of them ran favourable.

**Correction required (editorial; no collection).** Replace "carry **only an abstention** in the
Phase 2 audit — no verifier confirmed them" with wording that carries the landed distinction, e.g.:
*"carry no verdict in the Phase 2 audit. Two (ALR-007, ALR-011) carry a justified abstention; for the
other four the archive records an unexplained coverage gap — `U4-audit.md:194-197` — assessable from
sources already in hand and simply not assessed."* Every word needed is already in
`U4-audit.md` and `V-U4.md`; nothing needs collecting.

**Remedy route: `editorial`.**

---

## MISMATCHES FOUND SO FAR

### M1. "discrimination errors 46% vs 10%; 72% vs 38%, d=1.05" presented as one finding (§2 C-A, line 67-68; §4 line 157)

**Verdict: PARTIALLY-CONFIRMED.** Both figure pairs are real, verbatim in the archive, and correctly
directioned. They come from **two different experiments**, and the document's single parenthetical
reads as one.

**Loci opened:**
- `docs/superpowers/research/evidence-index/P2-verdict-catalog.md:192`
- `docs/superpowers/research/foundation-audit-p1/dossiers/C5-anki-spaced-repetition.md:130-165`
- `docs/superpowers/research/evidence-index/P1-evidence-catalog.md:78, :186`
- `docs/superpowers/research/foundation-audit-p1/remediation/C2-editorial-report.md:93`

The document reproduces `P2-verdict-catalog.md:192` faithfully. That line reads verbatim:

> **Interleaving improves discrimination; classification should be measured separately from action
> selection.** Discrimination errors 46% vs 10%; 72% vs 38%, d=1.05. … **The strongest asset in the
> corpus** — and CFL-007 says it points against the roadmap's sequencing.

So "the corpus's strongest asset" and both figures are the index's own words. But the two figures are
not one result:

- **46% vs 10%** is Taylor & Rohrer (2010), *Applied Cognitive Psychology* 24(6). Verbatim quote held
  at `C5-anki-spaced-repetition.md:144-146`: *"blocked practice and interleaved practice produced
  about the same number of fabrication errors (15% vs. 13%, respectively), but interleaving of
  practice dramatically reduced the frequency of discrimination errors (46% vs. 10%)."* That study's
  own accuracy pair is **77% vs 38%, d = 1.21** (`:142-143`), not 72/38.
- **72% vs 38%, d=1.05** is Rohrer, Dedrick & Burgess (2014), grade-7 maths, n=140
  (`P1-evidence-catalog.md:78`). Independently re-verified in Phase 1 remediation:
  `C2-editorial-report.md:93` records *"Abstract verbatim including "(72 % vs. 38 %, d = 1.05)""*.

Direction is right both times: interleaving *reduced* discrimination errors from 46% to 10%, so §4's
arrow form "46% → 10%" is correct.

**Correction required (editorial; no collection).** Either attribute the two figures to their two
experiments, or drop one. Both dossier records are already in the repo.
**Remedy route: `editorial`.**

### M2. U3-6's rejection omits the source's own non-significance statement (§5 rejected table, line 235)

**Verdict: PARTIALLY-CONFIRMED.** The figures are verbatim-correct. The archive row the document
says it read carries a qualifier that reverses the strength of the stated ground.

The document says U3-6 is *"Rejected on its own evidence — the freer widget performed **worse**
against the external criterion (r = .243 n.s. vs .551 p<.05; interrater 0.81 vs 0.92)."*

The figures match `classification.md:136-137` verbatim. But `run/U3/audit.md:22` — which the
document's own preamble says it read *"rather than from summary"* — states verbatim:

> Correlation with the teacher's achievement ranking was only .243 and non-significant for C vs .551
> (p < .05) for the more constrained S, though **"the two correlations do not differ significantly,
> z = 1.44, p > 0.05"** (p.15).

The source itself says the two correlations do not differ significantly. "Performed worse against the
external criterion" is therefore stronger than the source supports. The rejection survives on its
other stated grounds (largest build, lowest priority, and no evidence the freer widget is better),
and the archive at `run/U3/audit.md:75-77` records an independent meta-analytic result running the
same direction — so this is a qualifier, not a reversal.

**Correction required (editorial; no collection).** Add the z = 1.44, p > 0.05 non-significance to
the U3-6 row, or soften "performed worse" to "did not perform better".
**Remedy route: `editorial`.**

---

## FIGURES AND QUOTES — verdicts so far

| # | Claim | Verdict | Locus opened |
|---|---|---|---|
| 1 | "46% vs 10%" / "72% vs 38%, d=1.05" | **PARTIALLY-CONFIRMED** — see M1 | `P2-verdict-catalog.md:192`; `C5-anki-spaced-repetition.md:142-146`; `C2-editorial-report.md:93` |
| 2 | "r = 0.81" written short answer vs MC, "k = 52" | **CONFIRMED as archive fact; NOT USED by the document** | see below |
| 3 | "p = 0.93" / "73.3% vs 73.5%" and its stated limit | **CONFIRMED as archive fact; NOT USED by the document** | see below |
| 4 | U3-6 "r = .243 n.s. vs .551 p<.05; interrater 0.81 vs 0.92" | **PARTIALLY-CONFIRMED** — see M2 | `classification.md:136-137`; `run/U3/audit.md:22` |
| 5 | Kornell & Bjork 78/78 | **CONFIRMED** | `run/U3/audit.md:33`; `classification.md:158-160`; `FOR-LDB-03.md:38-40` |
| 6 | U3-5 quote "The two forms of instruction would have looked the same…" | **CONFIRMED** | `run/U3/audit.md:21`; `classification.md:118-119` |
| 7 | U3-7 "distractors that must be left unused" | **CONFIRMED, with an attribution note** | `run/U3/audit.md:23` |
| 8 | U3-4 "demonstrably orthogonal to answer correctness" | **CONFIRMED** | `classification.md:121-124`; `run/U3/audit.md:20` |
| 9 | A-10 "Very low — likely to be retired rather than validated" | **CONFIRMED** | `assumption-register.md:58` |
| 10 | K-U4-003 / "none of the three sources speaks to format validity" | **NOT YET CHECKED** (partially: see A-10 below) | — |
| 11 | crate-wide `expected_value\|expectimax\|monte-carlo` = zero | **CONFIRMED** | Grep over `/home/user/BlackJack/crates` |
| 12 | Code loci `validate.ts:65-66`, `controller.ts:123`, `blackjack-basics.ts:290` | **CONFIRMED / CONFIRMED / NOT CITED BY THE DOCUMENT** | see below |

### Items 2 and 3 — the document does not make these claims, and that is a positive finding

I grepped the document under review for `0.81`, `0.93`, `73.3`, `k = 52`, `k=52`, `0.51`. **The only
hits are `0.81` and `0.92` inside the U3-6 interrater figures at line 235.** The document nowhere
cites the p = 0.93 null, the 73.3%/73.5% pair, r = 0.81, or k = 52.

This matters because `FOR-LDB-03.md:85-87` and `classification.md:150-153` name *"Quoting the
p = 0.93 null as production-vs-multiple-choice evidence"* as the **first of the five ways a
downstream consumer would be misread this archive**. The document avoids it entirely — it does not
lean on the null anywhere, and it does not rest the F1 demotion on format-comparison evidence (it
rests it on `A-10` and the LDB-01 outcome definitions). **The archive's headline trap was not walked
into.** I state this positively rather than as silence.

For the record, the archive's own figures — which I verified but which the document does not use:
`classification.md:19-24` gives 73.3% vs 73.5%, p = 0.93, with the limit stated inline *"(Read the
limit: long-menu is itself generate-then-confirm, so this compares two production formats. It
licenses "menu vs typing buys nothing" — nothing wider.)"*, and r = 0.81 / r = 0.51.
`classification.md:151` gives *"The load-bearing evidence is **r = 0.81, k = 52**."*
`run/U3/audit.md:209` gives *"written short answer k = 52, **r = 0.81**"*.

### Item 5 — Kornell & Bjork 78/78: CONFIRMED

Document C-E (line 93-95): *"Kornell & Bjork: 78% of learners performed better under spaced practice
and 78% rated massed practice as good or better."* Not presented as a verbatim quote (no quote
marks), and the paraphrase is faithful. The archive holds the source's own words at
`run/U3/audit.md:33`:

> "78% of the participants did better with spaced presentations than they did with massed
> presentations, but 78% of the participants said that massing was as good as or better than
> spacing" (p.588)

Attribution correct (Kornell & Bjork 2008, *Psychological Science* 19(6) 585-592, `U3-S3`, recorded
`OPENED` at `run/U3/audit.md:46`). The archive endorses exactly this use:
`run/U3/audit.md:33` calls it *"the strongest available caution against any in-app 'how well did that
go?' widget as a mastery signal"*, and `classification.md:158-161` pairs it with U2-9 exactly as the
document does. The document's "This is the sole reason `U2-9` is rejected below" matches
`FOR-LDB-03.md:37-42` constraint 1.

### Item 6 — U3-5 quote: CONFIRMED verbatim

Document §5 U3-5 row and §1/§3 usage rest on this. `run/U3/audit.md:21` holds it inside the
*Measures well* cell, attributed to p.161:

> p.161: "dynamic assessments can be sensitive to levels of understanding that we care about but that
> can be missed by summative assessments of problem solving. The two forms of instruction would have
> looked the same had we not included the resource item from which students could learn."

The document's shorter form — *"the sourced form saw what no other instrument could"* (line 208) — is
a fair gloss, and the document correctly registers the blackjack extension as `A-25` rather than
carrying it as evidence. That matches `FOR-LDB-03.md:49-52` constraint 3.

### Item 7 — U3-7 "distractors that must be left unused": CONFIRMED, with an attribution note

Document §4 line 143 and line 149-150: *"It is stated in U3-7's own description — "some of which may
be distractors that must be left unused.""*

`run/U3/audit.md:23`, the *What the learner does* cell of the U3-7 row, reads verbatim:

> Given a scrambled set of solution fragments, some of which may be distractors that must be left
> unused, drags them into a correct order to form a complete solution. Section 2.3: "Parsons problems
> are tasks where the user needs to construct a solution by placing fragments into a correct order."

The quoted phrase is exact. **Attribution note, in the document's favour:** the phrase is the
*catalog row's* own descriptive wording, not a quotation from Ericson et al. — the source quote that
follows it in the same cell does not mention distractors. The document says *"U3-7's own
description"*, which is correct for the catalog row. By contrast `assumption-register.md:77` (A-28)
says *"`U3-7`'s **source** describes distractors"*, which is the looser wording. **The document is
more accurate than the register here.** No correction to the document.

### Item 8 — U3-4 orthogonality: CONFIRMED

`classification.md:121-124` verbatim:

> **U3-4 (contrasting-cases invention)** — its value is demonstrably orthogonal to answer
> correctness: *"the students in the inventing condition did not generate a correct standardizing
> procedure during instruction, yet they were more prepared to learn the procedure."* If scoring the
> answer is the wrong signal, no selection widget asks the same question.

The document's §5 U3-4 row uses both halves nearly word for word. The underlying quote is held at
`run/U3/audit.md:20` attributed to Schwartz & Martin (2004) p.161. The document's *"**Do not grade
the invented rule** — that is the point of the pattern"* is supported by the same cell's
*"Scoring the invented answer for correctness is a bad signal — the answers are usually wrong."*

### Item 9 — A-10: CONFIRMED verbatim

`assumption-register.md:58` reads verbatim:

> | A-10 | Multiple choice is a valid format for mastery evidence. `K-U4-003` | **None of the three
> sources cited for it addresses format validity.** This assumption currently governs 100% of shipped
> mastery evidence, and the bridge separately rules that a mastery model which cannot ingest
> played-hand evidence is disqualified. | Very low — likely to be retired rather than validated |
> **playtesting**, but the live plan is replacement: `LDB-04` decides what replaces multiple choice. |

Both the confidence string *"Very low — likely to be retired rather than validated"* and the
"none of the three sources" clause are exact. The document also correctly reproduces the "100% of
shipped mastery evidence" figure from this row.

### Item 11 — crate-wide search: CONFIRMED, and the search space is non-empty

Document §5 (line 221): *"`strategy.rs` is a lookup returning an action and a crate-wide search for
`expected_value\|expectimax\|monte-carlo` returns zero matches."*

I ran the search myself, case-insensitively and with the underscore variant, over
`/home/user/BlackJack/crates`: pattern `expected_value|expectimax|monte-carlo|monte_carlo|MonteCarlo`
→ **no matches found**.

**Anti-vacuity check, because a zero result over an empty directory would also return zero:** I
enumerated the search space first. `crates/` holds **24 `.rs` files** (`crates/blackjack-core/src/`:
boundary, rng, shoe, strategy, lib, main, rules, session, wasm, types; plus 14 test files). The
directory is non-empty and the zero is real.

`crates/blackjack-core/src/strategy.rs:21-45` confirms the "lookup returning an action" half: the
tables are string constants of action letters (`const H17_HARD: [&str; 14] = ["HHHHHHHHHH", …]`,
`const H17_SOFT: [&str; 8] = […]`). No numeric value is computed.

### Item 12 — the three code loci

**`validate.ts:65-66` — CONFIRMED, but under-cited.** Lines 65-66 read:

```
      } else if (step.type !== 'question') {
        messages.push(`unit ${unit.id}: required check ${checkId} is not a question`);
```

The document's claim is *"Multiple Choice currently governs 100% of shipped mastery evidence
(`validate.ts:65-66`)"*. That conclusion is **true**, but it needs a three-link chain and only the
middle link is cited:
1. `validate.ts:61-67` — every `requiredChecks` entry must be a step of `type === 'question'`.
2. `types.ts:19-22` — `QuestionStep` mandates `choices: Choice[]`; it is a multiple-choice construct
   by type.
3. `controller.ts:361` — completion is `this.unit.requiredChecks.every((id) => attempts.some((a) =>
   a.stepId === id && a.correct === true))`, i.e. `requiredChecks` *is* the mastery computation.

I verified all three. The claim stands. Optional editorial improvement: cite `types.ts:20` and
`controller.ts:361` alongside. Not a defect in the conclusion.

**`controller.ts:123` — CONFIRMED exactly.** Line 123 reads:

```
    this.assistance = this.assistance === 'none' ? 'retry' : 'instruction';
```

The document's C-D says this *"labels a second bare retry `'instruction'` when no instruction exists
and no hint ladder is built"*. Correct on inspection: `retry()` (lines 120-126) takes no argument and
delivers nothing — it sets the label and unlocks (`this.locked = false`). A second call therefore
records `assistance: 'instruction'` with no instruction having been delivered. `types.ts:40` confirms
`Assistance = 'none' | 'retry' | 'instruction'` is the whole ladder.

**`blackjack-basics.ts:290` — the document does not cite it.** I grepped the document under review
for `blackjack-basics`, `.ts:`, `strategy.rs`, `controller.ts`, `validate.ts`. The only code
citations in the entire document are `validate.ts:65-66` (line 26), `controller.ts:123` (line 89) and
`strategy.rs` (line 221). There is **no** `blackjack-basics.ts:290` citation. For completeness I read
the line anyway: it is `{ outcomeId: 'hit', text: 'You can explain and use Hit.' },` — a recap
capability entry, unrelated to any claim in the document. **Recorded as not-cited rather than as
either a pass or a failure.**

---

## COUNTS — NOT YET WRITTEN UP (verification in progress)

- §5 32 distinct pattern ids — **CHECKED, verdict pending write-up**
- §5 17 adopted / 11 rejected outright / 4 other — **CHECKED, verdict pending write-up**
- §5 rejected table = 16 rows and its reconciliation — **CHECKED, verdict pending write-up**
- §3 all 18 LDB-01 outcomes, ids matching LDB-01 — **IN PROGRESS**
- §6 claim 1 family→outcome mapping vs §3 — **NOT YET CHECKED**

## KNOWN DEFECTS NOT INHERITED — NOT YET CHECKED

- U1-5 / U1-8 / U1-9 not rejected as "vendor self-description" — **NOT YET CHECKED**
- Classification from the sourced pattern, U2-3/U2-11/U2-13 marked ⚠ — **NOT YET CHECKED**
- No adoption resting on "this format measures X better" — **NOT YET CHECKED**

## OTHER CLAIMS — NOT YET CHECKED

- §0 "41 `ALR-*` requirements attached" to the three families — **PRELIMINARY CONCERN, see below**
- §2 C-B provenance / `[DEFECTIVE-SOURCE]` honesty — **NOT YET CHECKED**
- §2 C-C aviation-guide "no jeopardy" corrected reading — **NOT YET CHECKED**
- §4 word-bank / Parsons ruling internal consistency — **NOT YET CHECKED**
- Register rows A-04, A-07, A-21, A-22, A-24, A-25, A-26, A-28 exist — **CONFIRMED, all eight
  located in `assumption-register.md` at :52, :55, :69, :70, :72, :73, :74, :77**

### Preliminary concern (not yet a verdict): §0's "41 ALR-* requirements"

Document §0 line 19-21: *"The approved activity evidence set of 2026-07-16 (`journal/decisions.md:30`)
admitted **three deterministic activity families** — Multiple Choice, Assemble Blocks,
Engine-Backed Hand — with 41 `ALR-*` requirements attached."*

`journal/decisions.md:30` does say *"three deterministic activity families"*. It does **not** name
them and does **not** mention 41 requirements. Separately, only **19** of the 41 are attached to the
three families: `…-research.md` headings are `### Multiple Choice` (ALR-001–006), `### Assemble
Blocks` (ALR-007–012), `### Engine-Backed Hand` (ALR-013–019), then `### Shared Activity
Requirements` (ALR-020–025), `### Session, Hint, Review, and Skip-Test Requirements` (ALR-026–035)
and `### Accessibility Requirements` (ALR-036–041). Verdict deferred pending a read of the decision
row in full context.

---

## POSITIVE SEARCH LOG — NOT YET WRITTEN

Will enumerate everything searched for and where, including what was looked for and not found.
