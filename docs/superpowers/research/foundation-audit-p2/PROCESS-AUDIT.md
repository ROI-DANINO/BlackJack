# Process Audit — Phase 2, Adaptive Learning Foundation Audit

> **What this is.** Task G step 5: how Phase 2 was executed, what its process got right, what it got
> wrong, and the methodological lessons Phase 3 inherits. It audits **execution**, not evidence — no
> verdict here revisits any audited claim.
>
> **Written by the orchestrator**, 2026-07-22, after user approval of the verdicts. It is therefore
> self-reported on exactly the points where self-report is weakest, and says so at each one. The
> independent counterpart is `integrity/PROGRAM-INTEGRITY.md`, written by an `audit-auditor` that had
> no shell and no web access; **where the two disagree, that record wins.**

---

## How the run was structured

Eight audit units (`U1`–`U8`), each passing through four hands that were never the same instance:

1. **Audit** — an `audit-examiner` reads the unit's target document or code and assigns a verdict per
   claim (`Preserve` / `Relabel` / `Revise` / `Replace` / `Remove`). Cannot collect sources, cannot
   edit anything it audits.
2. **Verify** — a fresh `audit-verifier` adversarially re-checks the audit record against the actual
   sources, and raises corrections. It judges; it never repairs.
3. **Land** — an `audit-editor` writes each material correction into the artifact it targets, at its
   anchor, leaving superseded wording visible.
4. **Confirm** — a third instance opens the artifact and confirms the correction is really there.

Then a program-integrity pass over the process records, and two independent boundary reviews of the
gate summary itself.

**Approximately 45 dispatches over two days.** Output: 102 claim verdicts, 26 corrections, 0 product
changes.

---

## What the process got right

**The landing loop closed.** This is the headline, because Phase 1's central defect was that its
corrections were recorded and returned as text and *never written into any dossier*. Phase 2 added an
explicit landing step and an independent confirmation of each landing. Result: all 26 corrections are
present in their target artifacts, marked at their anchors, superseded wording struck rather than
deleted, each confirmed by an instance that did not perform it. Zero `NOT-LANDED`, zero `ALTERED`.
The program-integrity pass rated this area **SOUND** and checked substance at four loci, not just the
presence of markers.

**Separation caught real defects, repeatedly, and in a direction nobody designed for.** The
mandatory-retrieval rule — *reopen the source, never transcribe a fact from another agent's record* —
was the highest-yield check in the program. All three of its catches ran **editor-catching-verifier**:
a miscounted enumeration, an anchor-range imprecision, and an invented bold emphasis inside a
quotation. The design anticipated verifiers catching auditors. It did not anticipate the reverse, and
the reverse is where the value was.

**Four instances of the ellipsis / emphasis / paraphrase family were found, and every one was caught
by the role reading downstream of the one that wrote it — never by its author.** Self-review does not
catch this class. Only a different pair of eyes on the same source does.

**Anti-pessimism held.** Zero `Replace` and zero `Remove` across 102 claims is the kind of result a
badly-incentivised audit converts into manufactured findings. Each of the eight verifiers was asked
separately whether zero was the *honest* number for its unit; all eight ruled it honest, on the
record. Several audit records explicitly state they looked for a defect at a locus and found none.

**Every fixture-proven gate check behaved correctly on every run.** The checks built against
empty / clean / violating / retry fixtures before dispatch did their job without exception.

---

## What the process got wrong

**The gate cannot fail on a row that does not exist.** `OE-014`: 16 of U5's 17 citation rows were
never appended to the citation register. Criterion 5 was therefore uncheckable for those 16 — and
check `1e` **passed anyway**, because `1e` tests the rows *present* in the register, never that the
rows present match the rows *returned by verifiers*. A register with one row passes as readily as one
with seventeen.

This is the same absence-as-proof family as Phase 1's scan-piped-into-`head` and the empty-directory
gate that certified a missing landing directory clean — one level up. The plan was written to close
that class and closed only the instance. It was found by a boundary reviewer dispatched to check a
*different artifact*; not by the mechanical gate, not by the program-integrity pass, not by the
orchestrator.

**Two further gate-design defects, independent of anyone's conduct.** `1e`'s second cell has no
enforced vocabulary, so arbitrary prose there silently disarms the check without altering any
recorded state — and no fixture covers it. `1b` has never been observed to FAIL on any fixture, so it
is unproven by the very standard the plan sets for itself.

**The ad-hoc checks were faulty; the fixture-proven ones were not.** Every check the orchestrator
improvised mid-run was at some point wrong. Every check built against fixtures before dispatch
behaved. That contrast is the run's clearest methodological signal.

**The mandatory-retrieval rule binds every agent role and does not bind the orchestrator.** The
orchestrator's transcription errors share one mechanism — copying a fact without reopening the source
— which is precisely the inherited-error class this program exists to prevent, committed by the party
running it. Sixteen orchestrator errors are enumerated in `registers/orchestrator-errors.md`; that
register is authoritative and this document is not. The worst three:

- **`OE-011`** — a headline total of 104 reported six times. It is 102. The sum was attempted once
  with a command that failed silently and printed nothing, and the wrong figure was then quoted
  repeatedly **without noticing no answer had ever arrived.** No artifact was affected; every
  per-unit figure was always correct. The reason the final numbers should be believed is that an
  independent reviewer recounted every one of them against the audit records.
- **`OE-012`** — the dispatch ledger was abandoned at row 29, exactly where the
  landing-confirmation separation constraint became load-bearing. Thirteen dispatches unlogged,
  reconstructed after the fact. Reconstructed is not contemporaneous.
- **`OE-013`** — the orchestrator performed a register reconciliation a confirmer had explicitly
  reserved for a verifier, and check `1e` stopped failing as a result. The program-integrity pass
  judged this **"EVADED, not satisfied."** A fresh verifier was then dispatched, ruled the citation
  genuinely `VERIFIED`, and that ruling supersedes the edit — so the criterion passes on the merits,
  but the route there was not clean.

**A landing confirmation returned a complete report and wrote no artifact.** Voided and re-run. In
this program an unwritten confirmation is a non-event — the founding lesson of Phase 1, recurring
inside the role built to catch it.

**Four editors were killed mid-flight by an API limit.** The pre-landing snapshot detected the damage:
two records mutated, one carrying a **false "corrections landed" header written before any landing
occurred.** A digest snapshot detects but cannot restore, and the run directory is gitignored, so the
true originals of two records are unrecoverable. A byte copy was taken for the remainder — that is
the fix, and it should be the default from the start of any future run.

**A verdict-row preservation check did not exist and was needed.** An editor destroyed two verdict
rows by placing a marker inside a table cell. Check `1-pre-b` would not have caught it: it asserts
each record has *at least one* verdict row, not that rows **survive landing**. The invariant is
"row counts match the pinned pre-landing counts," and it was added by the integrity pass, not by the
gate.

---

## Gate status at approval

| # | Criterion | Status |
|---|---|---|
| 1 | Records + landings complete | PASS — 26/26 landed and confirmed |
| 2 | Zero `NOT-LANDED` / `ALTERED` | PASS |
| 3 | Role separation | **NOT PROVEN** — attested throughout, attested-late for landing confirmations |
| 4 | Every `Remove`/`Replace` answered | PASS, vacuously — none assigned |
| 5 | No unverified citation under a survivor | PASS on the merits, after a verifier overruled the orchestrator |
| 6 | Survivors and failures both reported | PASS |
| 7 | No product document modified | PASS — verified against `04ad04c` |
| 8 | Registers complete and orchestrator-owned | ATTESTED (self-attestation by design) |
| 9 | Integrity manifests reconcile | PASS |
| 10 | Gate summary within the Phase 3 boundary | PASS — two independent boundary reviews |
| 11 | Program-integrity pass | 2 sound · 2 unsound · 1 partially sound |

**Criterion 3 in plain terms:** the dispatch ledger is the sole evidence for role separation, and it
is orchestrator-written. An orchestrator-written ledger agreeing with orchestrator-written records is
self-consistency, not corroboration — true even for the rows logged on time. Being contemporaneous
makes a record timely, not corroborated. The word "proven" is withdrawn for all passes.

**A note on counts.** `PROGRAM-INTEGRITY.md` enumerates **25** corrections; the final figure is
**26**. The difference is `C-U5-003`, raised by the citation ruling and landed after the integrity
pass had read the directory. Both records are correct as of when they were written. This document
does not assert a count of the orchestrator's own errors: an earlier draft gave figures that an
independent reviewer could not reproduce, with the error count *understating* against the integrity
record. `registers/orchestrator-errors.md` is the enumeration.

**Approval.** The user reviewed the per-decision verdicts on 2026-07-22 and approved. The two unclean
criteria and the three gate-design defects were disclosed before approval, not after.

---

## Lessons Phase 3 inherits

1. **Enumerate positively, and always include the completeness direction.** A check that a set's
   members are well-formed is not a check that the set is complete. `OE-014` is the reference case:
   every row present was valid, and 16 rows were missing. Phase 3 needs a check that the rows
   *present* match the rows *returned*, not merely that present rows pass.
2. **Fixture-prove every check before it guards anything.** Improvised checks failed; fixture-proven
   checks did not. A check that has never been observed to FAIL is untested, and `1b` still hasn't
   been.
3. **Bind the orchestrator by the rules it binds agents with.** The mandatory-retrieval rule was the
   program's highest-yield check and it did not apply to the party that produced the run's
   inherited-error defects. Phase 3 should make the orchestrator's own factual claims subject to a
   reopen-the-source requirement, or route them through an agent that is.
4. **Byte-copy before mutating an untracked surface, not just digest it.** Digests detect; copies
   restore. Two records are permanently unrecoverable because only a digest existed.
5. **Keep the dispatch ledger contemporaneous or drop the claim it supports.** A reconstructed ledger
   cannot prove separation. If Phase 3 wants role separation *proven* rather than attested, the
   ledger must be written by something other than the orchestrator — or separation must be
   established from artifact evidence that does not depend on it.
6. **Proportion the machinery to the risk.** Phase 2's apparatus exists because evidence work invites
   fabricated citations. Phase 3's design work does not carry that risk in the same way. The
   bounded probability/EV/variance/risk collection genuinely needs the role separation; translating
   held conclusions into design inputs does not. Roughly 45 dispatches produced verdicts rather than
   product, and the single most actionable finding (`CFL-007`) was an hour's work for a careful
   reader. **Run Phase 3 lean.**
7. **Carry these four findings forward as product input, not as audit residue** — they are what the
   phase actually bought:
   - the shipped mastery model is one line (`controller.ts:361`), and `validate.ts` restricts
     required checks to question steps, so 100% of mastery evidence is declarative multiple-choice
     and completion gates nothing;
   - **`CFL-007`** — the roadmap's blocked sequencing runs against the project's own held
     interleaving evidence (72% vs 38%, d=1.05 on a directly analogous task), unresolved by design;
   - agent-persona-as-evidence found in one design and confirmed absent from the other three;
   - the retry label `'instruction'` asserts assistance that no hint system delivers, and the
     mislabel propagates downstream.
