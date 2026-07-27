# Activity-Pattern Catalog — LDB-02 evidence archive

> **STATUS: UNGATED SNAPSHOT, NOT APPROVED, NOT ASSEMBLED.** Banked for durability, not because the
> pass is finished. Read this whole section before citing anything here.

## What this is

The raw evidence archive for card **LDB-02** — interactive learning-activity patterns that are
neither a dealt hand nor a multiple-choice question, which is the entire format vocabulary the
product currently holds.

Three collection units, each carrying its own `audit.md` (patterns, rejected candidates, source
register), `verification.md`, `corrections.md`, and `landing-confirmation.md`:

- **U1** — trainers for other decide-under-uncertainty domains (poker, forecasting, calibration,
  medical, aviation, chess).
- **U2** — mainstream learning apps' non-MCQ formats.
- **U3** — independent literature on interactive exercise and assessment formats.

## What is done

- Collection, two rounds of independent verification per unit, top-up collection, and landing.
- **82 corrections landed, every one independently confirmed** by an agent that neither raised nor
  applied it — but see the limit below: **the confirmers' quoted evidence is not in this archive.**
- `scripts/research-gate.ts` **PASSES** (exit 0) over all three units.
- Counted checks at snapshot time: **32 pattern rows** across **29 distinct product/source strings**,
  **50 source rows**, **9 UNREACHABLE and cited by nothing**, **0 blank cells**, **0 malformed
  access dates**, and **0 provenance tokens outside the enum — measured against the three-value
  scheme adopted by owner decision on 2026-07-27** (`journal/decisions.md`), which added
  `compensated-third-party` for a publisher that is neither the vendor nor disinterested.
  The earlier version of this line reported zero against a scheme the orchestrator had widened
  **silently and in the same breath as grading itself against it** — a process audit rated that the
  run's most serious finding. The vocabulary was never the problem; the unrecorded predicate change
  was. Commands, predicates and exit codes are in `GATE.md`.

## What is NOT done — do not read past this

- **No process audit has run.** Nobody has yet checked that role separation held throughout.
- **No global IDs.** Patterns still carry unit-local handles (`U1-3`, `U2-14`). There is no
  assembled `patterns.md` or `sources.md`.
- **No ranking.** The four intended axes — evidence standing, provenance, substantive-vs-cosmetic,
  buildability — are not applied.
- **Not approved.** The card's gate is user approval and it has not been given.
- **The distinct-product count above is inflated.** It counts naming variants as separate products
  (e.g. three Duolingo app strings). Normalisation is an assembly step that has not run.

## What a process audit found — three blockers, all in the orchestrator's hands

An auditor with no web access and no shell, deliberately unable to check the evidence, audited the
process. Nine findings; its record is at `run/../integrity/PROCESS-AUDIT.md` in the working inbox.
Three block:

1. **A predicate was widened by the party being measured.** ~~Open.~~ **Resolved 2026-07-27 by owner
   decision:** the enum is three values, recorded in `journal/decisions.md`. The token stays because
   it carries information a two-value scheme destroys. What was wrong was never the vocabulary — it
   was widening a check and grading against the widened version without recording either.
2. **`GATE.md` did not exist.** An exit code and six counted figures were reported with no recorded
   command or predicate. Written 2026-07-27; the G7 provenance check is recorded there as failing.
3. **`landing-evidence.md` was never created for any unit.** The plan specified it to carry the
   confirmers' quotes. 82 confirmations rest on three one-word `CONFIRMED` files, and **the gate
   deliberately does not read that file, so no check can see its absence** — absence-as-proof in a
   position nothing was watching. The quoted evidence exists only in session transcripts, which are
   not part of this archive.

The auditor's own summary: *the machinery that checks agents held; nothing checks the orchestrator.*
Every open finding concerns the assembler, not a delegated role.

## Known limits, stated rather than discovered later

- **U2 has zero reachable sources labelled `independent`.** 19 of 22 are vendor self-description,
  one is a compensated third-party publisher, and both remaining independents are unreachable. Its
  `Measures well` cells are `Product judgement` throughout, correctly.
- **U1's entire independent base is a single document**, and that document is a **compilation**
  citing NASA/FAA/CAA primaries — **none of which this archive holds**. Three of its nine patterns
  rest on it.
- **U3 carries the real evidentiary weight.** Its sources are peer-reviewed and independently
  funded, and it is the only unit that can ground a `Measures poorly` claim independently.
- A provenance token `compensated-third-party` was added for U2 only. **`independent` in U1 and U3
  was assigned under a two-token scheme and was never checked for compensation.**
- Three offered corrections were recorded and deliberately not landed: a marginal qualifying clause,
  a conventional citation-marker elision, and a loose folio pair inside dated history. Each is
  described in the unit's own notes.
- One item of pre-emptive keyword coverage is complete-minus-one; the outstanding string is
  identified in U2's notes.

## The finding that governs how this catalog should be used

Changing the **input widget** buys little. Changing **what is asked** buys a lot.

Identical key-feature items scored 73.3% vs 73.5% between a long-menu and a free-text answer format
(p = 0.93); written short answer tracks multiple-choice at r = 0.81 while other open-ended formats
diverge at r = 0.51. And one source states it outright: *"not the answer format itself, but the
stimulus set by the question … influences the results."*

So this is not a list of formats to adopt. It is a tool for separating **cosmetic** format change
from **substantive**. A downstream consumer that reads it as "these formats measure differently" is
misreading it — U1's own unit-level caveat says plainly that nothing in it evidences that changing
format alone changes what a learner learns.

## What is in this archive

| File | What it holds |
|---|---|
| `run/U*/audit.md` | The evidence. Patterns, rejected candidates with their failing test, and the source register with access dates and provenance. **This is the primary record — verify any claim against it.** |
| `run/U*/verification.md` | Two independent verification passes per unit, and their sufficiency verdicts. |
| `run/U*/corrections.md` | The correction ledgers. 82 IDs, each appearing twice — raised, then landed. |
| `run/U*/landing-confirmation.md` | One word each. See the limit above: the confirmers' quoted evidence is **not** in this archive. |
| `classification.md` | **Every pattern classified substantive or cosmetic**, the six rows that carry the catalog's evidentiary weight, and five ways a reader could be misled. Read this before using the catalog. |
| `GATE.md` | Every gate command, predicate, count and exit code — including what the gate does *not* establish. |
| `integrity/PROCESS-AUDIT.md` | An audit of the process rather than the evidence, by an agent with no web access and no shell. Nine findings, three blocking, all in the orchestrator's hands. |

## Citation rule

Cite a pattern from here **and verify it against `run/<unit>/audit.md`**, which carries the source
register, the access dates, the provenance labels, and each pattern's own qualification argument.
This README is a pointer, never a warrant.
