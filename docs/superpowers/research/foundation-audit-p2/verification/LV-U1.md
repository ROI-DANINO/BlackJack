# Landing Confirmation — Unit U1

> Third instance. I did not raise `C-U1-001`–`C-U1-003` (an `audit-verifier` did, in
> `verification/V-U1.md`) and did not land them (an `audit-editor` did, recorded in
> `landing/L-U1.md`). Read-only: no `Edit`, no `Bash`. Run: foundation-audit-p2. Written 2026-07-22.
>
> Compared: `audit/U1-audit.md` (post-landing, 296 lines) against
> `.pre-landing-copy/U1-audit.md` (true pre-landing byte copy, 208 lines), against what
> `verification/V-U1.md` actually asked for, and against the primary anchors themselves. Every
> anchor named in the landed text was reopened in this pass; nothing is accepted on the landing
> record's word.

## Verdict rows

| C-U1-001 | LANDED | `audit/U1-audit.md:77-122` (struck negative + five-bullet correction, `LANDED` marker at `:122`); secondary in-cell amendment at `K-U1-010` (`:148`) |
| C-U1-002 | LANDED | `audit/U1-audit.md:164-197` (coverage-correction block after the **Counts** paragraph at `:159-162`, `LANDED` marker at `:197`) |
| C-U1-003 | LANDED | `audit/U1-audit.md:15-21` (quoting-convention correction, marker at `:21`) and `:154` (`K-U1-016` citation cell re-quoted in source order, marker at `:155`) |

## Check 1 — does the landed text honestly scope the failed retrieval?

**Ruling: yes. The landed text does not overclaim, and the restraint is real, not merely asserted
in the landing record.**

The editor reports it could not read `https://doi.org/10.1126/science.1152408` (redirect to
science.org, HTTP 403). What matters is the wording that landed. I read the whole of
`audit/U1-audit.md` looking for any claim of first-hand contact with that paper. There is none:

- The only place the 2008 paper's identity appears is `:104-106`, and it is stated as a
  bibliographic fact with a **document anchor**, not as a reading:
  "The baseline's `SCI-001` is a **different paper**: Karpicke, J.D. & Roediger, H.L. III (2008),
  "The Critical Importance of Retrieval for Learning," *Science* 319(5865), 966–968,
  DOI 10.1126/science.1152408 (`…-research.md:39`)."
- The abstract sentence that `V-U1.md:187-188` supplies verbatim ("Repeated studying after learning
  had no effect on delayed recall, but repeated testing produced a large positive effect.")
  **does not appear anywhere in the landed record.** This is the load-bearing observation: the
  easiest way to have overclaimed was to inherit the verifier's abstract quote and present it as
  the record's own. The editor declined to, and that is exactly the "unverified by construction"
  defect not happening.
- The scope sentence at `:84-85` — "all anchors reopened first-hand in the landing pass" — is
  accurate on its face: every anchor the block cites (`…curriculum-and-pedagogy.md:14`, `:62`,
  `:174`; U1 `:23`, `:35`, `:92`; `…-research.md:39`, `:74`, `:87-88`, `:141`, `:253`;
  `PROGRESS.md:97-99`) is a repo file, all twelve of which I reopened and found verbatim as landed.
  The DOI is not presented as one of those anchors.

I verified `…-research.md:39` myself. It reads, verbatim:

> `| SCI-001 | [The Critical Importance of Retrieval for Learning](https://doi.org/10.1126/science.1152408) | Jeffrey Karpicke and Henry Roediger / Science | 2008-02-15 | Primary experiment | Repeated retrieval and delayed recall for learned vocabulary | 2026-07-16 | University learners and paired vocabulary; does not determine product scheduling or mastery thresholds. |`

So the anchor carries title, author names, journal, date and DOI, and genuinely sustains the
identity claim the landed text rests on it.

One precision point, **observed, not raised as a correction** (see "Noticed, not raised" below):
`:39` does **not** carry the volume/issue/page detail "*Science* 319(5865), 966–968" that `:104-106`
attributes to it parenthetically. That detail came from `V-U1.md:185-186`. It is factually correct
(independently confirmed: Science 2008 Feb 15; 319(5865):966-968), so this is an anchor slightly
wider than the fact it cites, not a fabrication and not an overclaim of retrieval.

## Check 2 — 2006 vs 2008 attribution hazard

**Kept distinct. No conflation landed.**

`audit/U1-audit.md:102-110` states the stripped import reference as "Roediger & Karpicke (2006),
test-enhanced learning/retrieval practice." anchored at `…curriculum-and-pedagogy.md:174`, and then
`SCI-001` as "a **different paper**" with "Reversed author order, different year, different journal.
They are **not** interchangeable, and this record does not claim that `SCI-001` is the stripped
reference — only that the surviving U1 claim family has retrieval evidence in hand under `SCI-001`".

I confirmed the import line myself. `…curriculum-and-pedagogy.md:174` reads, verbatim:

> `- Roediger & Karpicke (2006), test-enhanced learning/retrieval practice.`

The landed claim is therefore the narrow, checkable one, and the explicit non-claim is stated in the
record rather than only in the landing memo.

## Check 3 — the retrieval-practice lineage, reproduced independently

I reproduced the lineage from the primary files, not from `V-U1.md` or `L-U1.md`.

- Import `…curriculum-and-pedagogy.md:14`, verbatim:
  `4. **Decision recall** — choose the recommended action with and without support.`
- Spec `docs/specs/learning-mastery-and-scoring.md:35`, verbatim:
  `4. Decision recall: choose the recommendation with progressively less support.`
- Spec `:23`: `2. Play correctly without the table and without time pressure.`
- Spec `:92`: `4. table-hidden decision;`

All four match the landed text exactly, including the quoted forms at `:88-93`. The lineage is real:
the import's rung 4 survives into the spec as rung 4, with "with and without support" folded to
"with progressively less support".

The dropped-rung claim at `:114-118` also checks out. Import `:62` reads
`5. production before buttons appear`; the spec's ladder at `:89-95` is recognition / guided
classification / table-open decision / table-hidden decision / full evolving hand / interleaved
review / timed practice — the production rung is absent. `PROGRESS.md:97-99` reads, verbatim:
"Was dropping the "production" rung — the learner names the play before seeing options — from the
exercise ladder in `learning-mastery-and-scoring.md:85-95` intentional? The fold added two rungs
and dropped that one without a recorded reason."

Baseline anchors carrying the retrieval evidence, all reopened and verbatim as landed:
`…-research.md:74` ("**INFERENCE:** require learners to produce independent first responses and
revisit retrieval after feedback; repeated viewing or answer-assisted retries are not equivalent
mastery evidence."), `:87-88` ("**Targeted repetition:** supported in principle by retrieval and
spacing evidence (`SCI-001`, `SCI-002`), but not by trapping learners in same-session answer
repetition."), `:141` ("assisted success can support learning but cannot satisfy an unassisted
mastery or skip-test requirement."), `:253` ("**INFERENCE:** retrieval evidence `SCI-001`").

The Bjork & Bjork half is upheld at `:111-113` rather than swept into the correction, which is what
`V-U1.md:69-73` explicitly asked ("This half of the record's negative is sound and I explicitly
decline to disturb it"). The strike-through preserves the original false sentence visibly at
`:77-79` rather than back-filling it, per the R24/R26 discipline the record itself invokes.

## Check 4 — verdict-row survival

Counted by me, on `audit/U1-audit.md`, pattern
`^\| *K-U1-[0-9]{3} *\| *(Preserve|Relabel|Revise|Replace|Remove) *\|`:

| Metric | Required | Counted | Result |
|----|----|----|----|
| Total verdict rows | 18 | **18** | PASS |
| `Preserve` | 13 | **13** | PASS |
| `Relabel` | 5 | **5** | PASS |
| `Revise` / `Replace` / `Remove` | 0 | **0** | PASS |

Row IDs `K-U1-001` … `K-U1-018` are all present and contiguous; none is duplicated. No row was
added, so `C-U1-002` landed as the honest coverage statement it was asked to be, **not** as a
nineteenth verdict — `:168-169` says so explicitly ("**no verdict is added, changed, or removed**")
and the count bears it out.

**Marker placement.** All four `LANDED` HTML-comment markers (`:21`, `:122`, `:155`, `:197`) sit on
their own lines. `:155` sits immediately **below** the `K-U1-016` row, not inside it — which is the
specific failure mode that destroyed two verdict rows elsewhere in this run. The two in-cell
amendments (`K-U1-010` at `:148`, `K-U1-016` at `:154`) are prose appended inside the final table
cell and do not introduce pipe characters that split a row; both rows still match the verdict
pattern.

## `C-U1-003` — quotation fidelity, checked against the source

`V-U1.md:51` asked for the verbatim, source-order passage. The landed `K-U1-016` cell (`:154`) now
reads: "These are fixed accuracy-percentage thresholds and pass/fail checks on mixed-skill
assessments — no rating, no confidence interval, no item-difficulty parameter, and no probability
estimate appears anywhere in this definition. This is a structurally different mechanism from every
model C1 examined (BKT, PFA, DKT, IRT, education-Elo)."

I opened `docs/superpowers/research/foundation-audit-p1/dossiers/C4-chesscom-khan.md:121`. It reads,
verbatim:

> `- Caveats: These are fixed accuracy-percentage thresholds and pass/fail checks on mixed-skill assessments — no rating, no confidence interval, no item-difficulty parameter, and no probability estimate appears anywhere in this definition. This is a structurally different mechanism from every model C1 examined (BKT, PFA, DKT, IRT, education-Elo).`

Character-for-character match on the quoted portion, correct clause order, "mechanism" restored, no
ellipsis. The defective prior rendering is kept visible in the same cell. The `K-U1-016` verdict
(`Relabel`) is unchanged.

The paired half at `:15-21` also lands: the false clause "no ellipsis is used anywhere in this
record" is quoted back, marked false, and the three ellipsis sites are enumerated
(`K-U1-011`, `K-U1-016`, conflicts block) exactly as `V-U1.md:247-251` described.

## `C-U1-002` — basis anchors checked

Every basis the landed block names at `:186-192` was reopened and is verbatim:
`…-research.md:59` ("**INFERENCE:** support a guided first encounter and fade assistance before
evidence is counted as independent mastery proof."); `:77` ("**INFERENCE:** begin with a canonical
worked state or nearly complete assembly, then fade blocks and hints; do not force the same scaffold
on demonstrated experts.", cited to `SCI-004`, `SCI-009`); and the rejected-option row at `:387`,
which rejects "Forced same-item retries until a correct answer appears" with rationale "It can erase
first-response evidence and substitute short-term repetition for later retrieval." on `SCI-001`,
`SCI-002`. The unassessed U1 text transcribed at `:173-179` matches
`docs/specs/learning-mastery-and-scoring.md:22-24`, `:35`, `:87`, `:89-95` verbatim.

This is the correction most exposed to "presence of the topic ≠ presence of the correction": a
keyword grep for "coverage" would have hit the pre-landing record too. It is not that. The block is
new (absent from `.pre-landing-copy/U1-audit.md`), it names the family, it names the unassessed
text, it names the in-hand basis, and it states why the omission mattered (`:166-167`: "that
omission is what let the false negative corrected above stand").

## Change surface against the before-image

I read both files end to end and reconciled every line-number offset. The post-landing file differs
from `.pre-landing-copy/U1-audit.md` at exactly **five** sites, all four of them correction anchors
plus one cosmetic artefact:

| Site | Pre | Post | Explained by |
|----|----|----|----|
| Quoting-convention clause + correction block | `:13` | `:13`, `:15-21` | `C-U1-003` |
| Drift-finding bullet | `:68-70` | `:77-122` | `C-U1-001` |
| `K-U1-010` citation cell (in-cell amendment) | `:96` | `:148` | `C-U1-001`, disclosed in `L-U1.md` |
| `K-U1-016` citation cell + marker | `:102` | `:154`, `:155` | `C-U1-003` |
| Coverage-correction block after **Counts** | — | `:164-197` | `C-U1-002` |

Offset reconciliation closes with no residue: pre `:15`→post `:24` (+9), pre `:71`→post `:123`
(+52), pre `:87`→post `:139` (+52), pre `:103`→post `:156` (+53), pre `:111`→post `:199` (+88), pre
`:124`→post `:212`, pre `:152`→post `:240`, pre `:179`→post `:267`, pre `:201`→post `:289` (all
+88). Every increment is accounted for by the table above. **Nothing outside the correction anchors
was altered.** In particular: all 18 verdict rows other than `K-U1-010` and `K-U1-016` are
byte-identical to the before-image; the **Counts** paragraph (`:159-162`) is byte-identical; the
Citation-state block, Conflicts block, Calibration block and Non-material notes are byte-identical.

Sole cosmetic deviation: post `:22-23` are two consecutive blank lines where the pre-image had one
(`:14`). Whitespace only; no gate consequence. Recorded for completeness, not raised.

## Scope compliance of the landing pass

`L-U1.md:32-36` claims only `audit/U1-audit.md` and `landing/L-U1.md` were written. I cannot inspect
the filesystem history (no `Bash`), so I do not confirm that negatively. What I can confirm: the
landed content is consistent with an editorial-only remedy — no new source appears in the record
that was not already cited by `audit/U1-audit.md` or `V-U1.md`, and no verdict moved.

## Overall

All three corrections **LANDED** faithfully. The preservation invariant holds (18 / 13 / 5 / 0 / 0
/ 0). No correction was over-applied into a verdict change; no new defect was introduced in the name
of fixing one; the 2006/2008 hazard was navigated correctly; and the one retrieval this pass could
not perform is disclosed rather than papered over.

## Noticed, not raised (for the orchestrator to route; deliberately un-numbered)

1. **Anchor slightly wider than the fact.** `audit/U1-audit.md:104-106` attributes "*Science*
   319(5865), 966–968" to `…-research.md:39`, which carries title/authors/journal/date/DOI but not
   volume, issue or pages. The detail is factually correct (independently confirmed) and originates
   in `V-U1.md:185-186`. Editorial precision only; the identity claim stands on `:39` without it.
2. **A `SCI-001` citation-state row is now arguably due.** `V-U1.md:190-192` withheld one because
   "it supports no verdict in the record as written", and the landed `C-U1-001` still assigns no
   verdict to the retrieval claim family — so `V-U1`'s condition is technically unmet. But `SCI-001`
   is now load-bearing prose in the record while the Citation-state table (`:203`) still lists only
   `SCI-005`. Whether that warrants a row is an orchestrator call, not mine; I raise no correction.
3. **Cosmetic double blank line** at `audit/U1-audit.md:22-23`, per above.
4. Items `V-U1.md` itself flagged and declined to number (added emphasis at `U1-audit.md:49-52`
   marked as the record's own, the `:52` anchor spanning `:130-131`, the wide `C6:250-257` range,
   the unreplicated Kornell & Bjork Experiment 2 at `C5:188-193`, SCI-005's Table 5 timing null)
   remain unlanded — correctly, since they were not raised as corrections. Noted only so a later
   reader does not read their absence as a landing failure.

## Confirmer's own limits, stated

- No `Bash`, so no `git diff`. The before/after comparison is a full manual read of both files plus
  arithmetic reconciliation of every section offset, which detects any inserted or deleted line but
  would in principle miss a same-length in-line substitution in a region I read but did not
  character-compare. I character-compared all 18 verdict rows, the **Counts** paragraph, and the
  Citation-state block; the remaining prose blocks were read in full for content identity.
- I did not attempt the science.org retrieval myself, because the question in scope is whether the
  landed *wording* overclaims, not whether the paper says what it says. I did independently confirm
  the 2008 bibliographic record via a secondary index to check the volume/page detail noted above.
- Per dispatch I did not re-litigate the corrections, did not judge the underlying verdicts, and
  raised nothing new.
