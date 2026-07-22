# Landing Confirmation — Unit U7

> Third instance. I did not raise `C-U7-001`–`C-U7-003` (an `audit-verifier` did, in
> `verification/V-U7.md`) and did not land them (an `audit-editor` did, recorded in
> `landing/L-U7.md`). Read-only: no `Edit`, no `Bash`. Run: foundation-audit-p2. Written 2026-07-22.
>
> Compared: `audit/U7-audit.md` (post-landing, 248 content lines) against
> `.pre-landing-copy/U7-audit.md` (true pre-landing byte copy, 161 content lines), against what
> `verification/V-U7.md` actually asked for, and against the primary anchors themselves. Every
> anchor I report below was reopened by me this pass; nothing is accepted on the landing record's
> word, and nothing on the verifier's.

## Verdict rows

| C-U7-001 | LANDED | `audit/U7-audit.md:85-110` (recorded-finding block after the **Counts** line at `:78`; `LANDED` marker on its own line at `:110`); verdict row `K-U7-002` at `:69` byte-identical to the before-image. **Landed as a recorded finding, not as a resolution — see the ruling below; an adjudication remains outstanding.** |
| C-U7-002 | LANDED | `audit/U7-audit.md:168-192` (two survivor entries appended to "Examined and deliberately left alone", marker at `:194`); pointer item at `:112-116` with marker at `:118`. No verdict row added. |
| C-U7-003 | LANDED | `audit/U7-audit.md:196-214` ("Conflicts logged" rewritten: prior "None found" wording quoted in place at `:200-203`, conflict row at `:212`); marker at `:123`. |

## The judgement call — is `C-U7-001`'s recorded-finding landing faithful or incomplete?

**Ruling: faithful as a landing act, incomplete as a discharge of the correction.** The row verdict
is `LANDED` because `NOT-LANDED` and `ALTERED` both misdescribe what happened; but the correction is
**not** fully discharged and the gate must not read the row as closing U7.

Why `LANDED` rather than `NOT-LANDED`:

1. **The artifact changed materially at the correction's own locus.** The defect is now stated in
   `audit/U7-audit.md` itself, at the most-read position in the record (immediately under the
   **Counts** line), naming the row, quoting the wrongly-anchored sentence, quoting the sentence that
   actually carries the claim, and quoting the record's own genre-exclusion rule against itself. A
   reader of the record cannot now reach `K-U7-002` without meeting the finding. That is more than a
   note *about* the record; it is *in* the record.
2. **Both retrievals were performed and reproduce.** This is not a paper landing (see Retrievals).
3. **The correction as written was under-determined.** `V-U7.md:199` offers two mutually exclusive
   resolutions and says "Do not do both," but designates **no default and no ranking**. An editor
   picking one would be selecting a verdict outcome on its own authority — the precise act the
   examiner/editor/confirmer split exists to prevent. Contrast `C-U7-002`, where the verifier itself
   supplied the minimum no-verdict-row remedy ("or, at minimum, as explicitly named left-alone items
   with a stated reason"); the editor took exactly that path there. The asymmetry in the editor's
   behaviour tracks an asymmetry in the corrections, not editorial convenience.
4. **No over-application.** The editor did not smuggle a verdict change in under cover of an
   annotation, and did not author replacement wording. The count line still reads "Relabel 7" because
   no verdict word changed — which is honest, not evasive.

Why it is nonetheless **incomplete**:

1. **The record now contradicts itself and the contradiction is machine-invisible.** `:78` asserts
   "Preserve 1, Relabel 7" without qualification, and `:69` still carries `K-U7-002 | Relabel` with a
   citation cell whose basis the same record now says "is not the text it cites" (`:102`). Any
   consumer that reads the verdict table or the Counts line — which is what a downstream phase and
   the run's own gate do — gets the verdict the record itself disowns. Prose does not reach a
   row-wise reader.
2. **One of the two resolutions was in fact available without adjudicating a verdict.** The editor's
   stated reason (`L-U7.md:28-31`) is that "Both would alter the verdict table." That is true of
   option A (drop the row → Relabel 6) but **not** of option B (keep `Relabel`, re-anchor the quote
   to `2026-07-11-…:18-19`). Option B changes a Claim-cell anchor, not a verdict word, not a row
   count, and not the Counts line — the preservation invariant `L-U7.md:9-11` states would survive it
   intact. So the justification given is broader than the facts support. I do **not** conclude the
   editor should have taken option B: choosing B over A is still a choice the verifier declined to
   make, and an editor that silently picks the "cheap" resolution is deciding the merits by cost.
   But the reasoning as recorded overstates the constraint.

**What would fully discharge `C-U7-001`.** One adjudication, by an agent with authority over verdicts
(the orchestrator, or a re-dispatched examiner — not an editor and not me), choosing exactly one of:

- **A.** Withdraw `K-U7-002` to a non-material note. Then the verdict-row count becomes **8** and the
  distribution **Preserve 1 / Relabel 6 / Revise 1**, and the Counts line at `:78`, the row block, and
  the citation-state row that maps `ALR-033` to `K-U7-002` (`:136`) must all be updated together; or
- **B.** Retain `Relabel` and re-anchor `K-U7-002`'s Claim cell to
  `2026-07-11-blackjack-basics-learning-foundation-design.md:18-19` ("They do not yet know which legal
  action is strategically correct; that begins with Strategy Table Fundamentals."). Then the count
  stays **9 / 1 / 7 / 1**, and the non-material note at `:239-241` (which folds `:60-61` into
  `K-U7-002`) should be checked for consistency with the new anchor.

Either way the recorded-finding block at `:85-110` should be retained, restated as resolved, so the
original error stays visible per the run's R24/R26 discipline. Until one of A or B lands, the
gate should carry `C-U7-001` as **landed-but-unadjudicated**, not as closed.

## Retrievals reproduced

I reopened the following myself. Every one matches the landing record's characterisation.

- **`C-U7-001`, anchor 1.** `docs/superpowers/specs/2026-07-11-blackjack-basics-learning-foundation-design.md:10-12`,
  verbatim: "This design covers the reusable learning runtime and its first subject, **Blackjack
  Basics**. Strategy Table Fundamentals follows in a separate design cycle after this feature passes
  scoped feature QA." Exact, at the stated lines.
- **`C-U7-001`, anchor 2.** Same file `:18-19`, verbatim: "They do not yet know which legal action is
  strategically correct; that begins with Strategy Table Fundamentals." Exact, at the stated lines.
- **`C-U7-002` (a), the ≈21% figure — re-derived independently, not copied.**
  `docs/superpowers/specs/2026-07-15-strategy-table-fundamentals-lesson1-design.md:109-111` reads
  verbatim: "An honest 6-deck deal produces a pair, a two-card soft hand, or a natural blackjack a
  meaningful fraction of the time (roughly one first-hand in five is not a plain hard total), and the
  product constitution forbids rigging the deal." My own arithmetic on a 312-card shoe: rank-pair
  23/311 = **7.40 %**; exactly-one-ace with a non-ten, non-ace partner
  2·(24/312)·(192/311) = **9.50 %**; natural 2·(24/312)·(96/311) = **4.75 %**; total **21.65 %**. The
  three classes are disjoint as partitioned (A-A sits in the pair term and is excluded from the soft
  term, so nothing is double-counted). The editor's ≈21.6 % reproduces; "roughly one first-hand in
  five" is sound.
- **`C-U7-002` (b), the `situations.ts` stiff-hands claim — the one the dispatch names.** Design text
  at `2026-07-15-…:123-125`, verbatim: "**all three arranged `OPENINGS.stiffHands` examples are
  Basic-Strategy STAND hands** — 16 vs dealer 6, 15 vs dealer 5, 16 vs dealer 4 — so the learner
  physically clicks Hit on 16-vs-6, the single most iconic Stand cell in the game." Product source
  `web/src/learn/situations.ts:31-35`, verbatim:

  ```
  stiffHands: [
    [C('ten', 'spades'), UP_SIX, C('six', 'hearts')],   // 16
    [C('king', 'clubs'), UP_FIVE, C('five', 'spades')], // 15
    [C('nine', 'hearts'), UP_FOUR, C('seven', 'diamonds')], // 16
  ],
  ```

  with `UP_SIX = C('six','diamonds')`, `UP_FIVE = C('five','clubs')`, `UP_FOUR = C('four','hearts')`
  at `:16-18`. So the three openings are 16 v 6, 15 v 5, 16 v 4 — all three Basic-Strategy Stand
  cells. And `web/src/learn/content/blackjack-basics.ts:252-260`: step `id: 'hit-hand'` carries
  `setup: { kind: 'arranged', openings: OPENINGS.stiffHands }` (`:258`) and
  `requestedAction: 'hit'` (`:259`), with `intro: 'This hand is a stiff total. Choose Hit to take one
  more card.'` (`:257`). The claim reproduces in full, including the "physically clicks Hit" step.
- **`C-U7-003`, Side A.** `docs/superpowers/specs/2026-07-10-v2-learning-foundations-roadmap-design.md:56-57`,
  verbatim: "6. After V2, expand Basic Strategy mastery gradually: hard totals, hard doubles, soft
  totals, pairs/splits, then mixed review." Exact, at the stated lines, as item 6 of "Build Sequence".
- **`C-U7-003`, Side B.** `docs/superpowers/research/foundation-audit-p1/dossiers/C2-its-actr-procedural.md:190-198`,
  F11. Confirmed at `:194-195`: "Q2 (randomized, counterbalanced classroom experiment)"; Rohrer, D.,
  Dedrick, R.F., & Burgess, K. (2014), *Psychonomic Bulletin & Review*; heading `:190` gives
  "grade-7 math, n=140" and "72% vs. 38% correct, d=1.05". Claimed strength at `:197`, verbatim:
  "The mean test scores were greater for material learned by interleaved practice rather than blocked
  practice (72 % vs. 38 %, d = 1.05)." Caveat at `:198`, verbatim: "a blackjack trainer's
  hand/upcard/action decision space is exactly this kind of 'choose the right strategy for this kind
  of problem' task rather than a single repeated skill. Domain is grade-7 math, not adult
  strategy-game/gambling-adjacent skill; that transfer is untested." Author list, year, journal,
  tier, n, both percentages and the effect size are all reported correctly in the landed row.

**No landing claim in `L-U7.md` rests on an unrecorded retrieval.** All three corrections are
`editorial` against in-repo sources; no `WebSearch`/`WebFetch` was needed and none is claimed.

## The conflict row (`C-U7-003`) — logged, not resolved

Both sides are verbatim at their anchors (above). The landed row's Status cell reads: "RECORDED —
unresolved. Carried in-unit as `K-U7-009 Revise`; logged here so a later phase does not re-derive it.
Register-row ID assignment is the orchestrator's, not this record's." That is a log, not a
resolution: it states no preferred sequencing, adopts neither side, and defers the register ID.

Two further checks on this section:

- The prior wording is **quoted in place** at `:200-203`, verbatim against
  `.pre-landing-copy/U7-audit.md:124-127`, so the original error stays visible rather than being
  back-filled.
- The salvaged half is correctly salvaged: `:206-208` retains the pre-image's true sub-claim ("no two
  audited documents contradict each other") and discards only the false inference (that carrying a
  tension as a verdict discharges the logging duty).
- **No prescription introduced.** Nothing in the new section states which sequence the project should
  adopt; the dossier caveat's own "that transfer is untested" is carried into the row.
- `registers/conflict-register.md` was not written by the landing pass, consistent with
  `L-U7.md:34-35`. The row is returned to the orchestrator below.

## Verdict-row survival

Counted by me on `audit/U7-audit.md`, pattern
`^\| *K-U7-[0-9]{3} *\| *(Preserve|Relabel|Revise|Replace|Remove) *\|`:

| Metric | Required | Counted | Result |
|----|----|----|----|
| Total verdict rows | 9 | **9** | PASS |
| `Preserve` | 1 | **1** (`K-U7-005`) | PASS |
| `Relabel` | 7 | **7** (`K-U7-001/002/003/004/006/007/008`) | PASS |
| `Revise` | 1 | **1** (`K-U7-009`) | PASS |
| `Replace` / `Remove` | 0 | **0** | PASS |

Rows sit at `:68-76`; IDs `K-U7-001`…`K-U7-009` are contiguous with no duplicates. A looser count of
lines beginning `| K-U7-NNN` also returns exactly **9**, so no row was split or mangled into a
non-matching form — the failure mode that destroyed two rows elsewhere in this run.

**Marker placement.** All four `LANDED` HTML-comment markers sit on their own lines, outside every
table: `:110`, `:118`, `:123`, `:194`. None is inside a table cell; none introduces a pipe character
into a row. I character-compared all nine verdict rows against the before-image (`:68-76` post vs
`:68-76` pre) — **byte-identical**, including `K-U7-002`.

## Change surface against the before-image

I read both files end to end and reconciled every section offset. The post-landing file differs from
`.pre-landing-copy/U7-audit.md` at exactly **three** sites, all three of them correction anchors:

| Site | Pre | Post | Explained by |
|----|----|----|----|
| New "Corrections landed from verification (V-U7)" section, inserted after the **Counts** line | — | `:80-124` | `C-U7-001`, `C-U7-002` pointer, `C-U7-003` pointer |
| Two survivor entries + preamble appended to "Examined and deliberately left alone" | — | `:168-194` | `C-U7-002` |
| "Conflicts logged" section rewritten | `:122-127` (6 lines) | `:196-214` (19 lines) | `C-U7-003` |

Offset reconciliation closes with no residue: pre `:1-78` → post `:1-78` (+0, byte-identical,
including the whole verdict table and the Counts line); pre `:80-84` → post `:126-130` (+46);
pre `:86` → post `:132` (+46); pre `:103` → post `:149` (+46); pre `:120` → post `:166` (+46);
pre `:122` → post `:196` (+74); pre `:129` → post `:216` (+87); pre `:139` → post `:226` (+87);
pre `:161` → post `:248` (+87). Every increment is accounted for by the table above.

**Nothing outside the correction anchors was altered.** Specifically byte-identical to the
before-image: the header block, the Format note, the agent-persona-as-evidence section, all nine
verdict rows, the **Counts** line, the "Zero `Remove` and zero `Replace`…" paragraph, the entire
"Citations re-verified" table, the five original "Examined and deliberately left alone" bullets, the
"Calibration — what 'good' looks like" section, and all four "Non-material notes". No `ALTERED`
finding.

## The four audited designs — unmodified

None of `2026-07-11-blackjack-basics-learning-foundation-design.md`,
`2026-07-15-strategy-table-fundamentals-lesson1-design.md`,
`2026-07-10-v2-learning-foundations-roadmap-design.md`, or
`2026-07-10-first-guided-drill-design.md` shows any sign of modification:

- Line counts are unchanged from what the audit record states at `:4-7` (384 / 197 / 79 / 142 as the
  record counts them; 383 / 196 / 78 / 141 newline-terminated lines as I count them — a consistent
  off-by-one convention across all four, not a size change in any one).
- Every anchor I reopened resolves at **exactly** its stated line number (`:10-12`, `:18-19`,
  `:109-111`, `:123-125`, `:56-57`). An insertion or deletion anywhere above those points would have
  shifted them. It did not.
- Nothing under `web/` was modified either: `situations.ts:16-18`, `:31-35` and
  `blackjack-basics.ts:252-260` all resolve at the line numbers both `V-U7.md` and `L-U7.md` cite.

I have no `Bash`, so I cannot inspect mtimes or `git status` and do not claim a negative from file
history. The above is positive evidence of content and offset stability, not an inspection of the
filesystem record.

## Overall

Three corrections `LANDED`, none `ALTERED`, none over-applied. The preservation invariant holds
(9 / 1 / 7 / 1 / 0 / 0). `C-U7-002` and `C-U7-003` are fully discharged. `C-U7-001` is landed as a
recorded finding and **carries a residual adjudication obligation** (option A or option B above)
before U7 can be called closed on that row.

## Noticed, not raised (for the orchestrator to route; deliberately un-numbered)

1. **Duplicate marker for `C-U7-002`.** The correction carries two `LANDED` markers (`:118` and
   `:194`) for one correction. Both are legitimate — one at the pointer, one at the substantive
   landing site — but a naive marker-counting gate would read four landings for three corrections.
   Cosmetic/tooling only.
2. **Marker line-range drift.** The `:118` marker names the survivors as "STF :107-116 and :118-125";
   the list entries at `:172` and `:183` head them as `:107-116` and `:118-126`. Both are correct
   readings of the section (`:126` is the last line of the paragraph); one-line cosmetic
   inconsistency.
3. **`L-U7.md:28-31` overstates its own constraint** — "Both would alter the verdict table" is true of
   the drop-the-row option and false of the re-anchor option. Recorded because it is the reasoning
   the gate will read, not because the outcome was wrong. See the ruling above.
4. **`V-U7.md` non-material notes remain unlanded** (the `K-U7-005`/`K-U7-006` anchor off-by-ones, the
   802-vs-798 line-count inconsistency, the `K-U7-003`/`K-U7-007` double-count observation, the
   scope-statement inconsistency about Build Sequence `:35-71` vs `K-U7-009` auditing `:56-57`, the
   `strategy.rs` split-legality nuance, and the `:76` no-prescription-boundary flag). Correctly
   unlanded — none was raised as a numbered correction. Noted only so a later reader does not read
   their absence as a landing failure. The scope-statement one interacts with `C-U7-001`'s option B,
   since both concern which sentence a row is anchored to; an adjudicator should see them together.
5. **Audit `:76` (`K-U7-009`) still reads "the honest wording should state that…"**, which `V-U7.md`
   flagged as sitting at the edge of the no-prescription boundary. Unchanged by the landing pass,
   correctly — it was a non-material note, not a correction. Flagged only because this unit is about
   curriculum sequencing and that is where a prescription would enter.

## Rows returned to the orchestrator (not written by me)

**Conflict register — one row, forwarded unchanged from `V-U7.md` and now also present in-record at
`audit/U7-audit.md:212`. ID assignment is the orchestrator's.**

| Conflict | Side A | Side B | Status |
|---|---|---|---|
| Curriculum sequencing: category-blocked-then-mixed vs. interleaved practice | Project design — `docs/superpowers/specs/2026-07-10-v2-learning-foundations-roadmap-design.md:56-57`: "After V2, expand Basic Strategy mastery gradually: hard totals, hard doubles, soft totals, pairs/splits, then mixed review." | Phase 1 archive — `docs/superpowers/research/foundation-audit-p1/dossiers/C2-its-actr-procedural.md:190-198` (F11, Rohrer, Dedrick & Burgess 2014, Q2 RCT, grade-7 math, n=140): interleaved 72% vs. blocked 38%, d=1.05; dossier caveat records the blackjack decision space as "exactly this kind of 'choose the right strategy for this kind of problem' task" while stating domain transfer is untested. | RECORDED — unresolved. Both sides re-verified verbatim by the landing confirmer. |

**Source-lead register — no rows.** No evidence gap surfaced in this confirmation pass; all three
corrections were editorial against sources already held, and all held sources reproduce.

**Residual obligation returned (not a new correction):** `C-U7-001` needs one adjudication (option A
or option B, §"What would fully discharge") by an agent with verdict authority. It is out of an
editor's scope and out of mine.

## Confirmer's own limits, stated

- No `Bash`, so no `git diff` and no mtime inspection. The before/after comparison is a full manual
  read of both files plus arithmetic reconciliation of every section offset — this detects any
  inserted or deleted line, and I additionally character-compared all nine verdict rows, the Counts
  line, and the quoted-in-place prior "Conflicts logged" wording. A same-length in-line substitution
  inside a prose block I read for content but did not character-compare would in principle escape.
- I did not re-litigate the three corrections' merits, and did not judge the nine underlying audit
  verdicts, except where the dispatch expressly asked me to rule on the `C-U7-001` landing mode.
- I raised no new correction and prescribed no curriculum sequence.
