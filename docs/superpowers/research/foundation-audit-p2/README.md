# Foundation Audit — Phase 2 Verdict Archive

> **Status: APPROVED 2026-07-22.** Curated Phase 2 output for the Adaptive Learning Foundation
> Audit, promoted from the git-ignored inbox after the user reviewed the per-decision verdicts.
>
> **Authority: verdicts only.** Phase 2 assessed what the project's existing learning claims are
> entitled to assert. It changed no product document and no product code, and it deliberately states
> no recommendation. Owned designs remain authoritative.

## Start here

| File | What it is |
|---|---|
| **`P2-gate-summary.md`** | **Read this first.** Per-unit results, the 26 corrections, conflicts logged, gate status, and the orchestrator's disclosed errors. |
| `PROCESS-AUDIT.md` | How the run was executed — what the process caught, what it missed, and the lessons Phase 3 inherits. |
| `integrity/PROGRAM-INTEGRITY.md` | Independent process audit by an agent with no shell and no web access. **Where it disagrees with `PROCESS-AUDIT.md`, this record wins.** |
| `INTEGRITY-MANIFEST-*.md` | Tamper-evidence: digests at scaffold, pre-landing, and post-landing. |

## The result in one line

**102 claims across 8 units: `Preserve` 71 · `Relabel` 24 · `Revise` 7 · `Replace` 0 · `Remove` 0.**
Nothing in the audited foundation was found contradicted or baseless; every defect located was a
**labelling, precision, or coverage** defect. 26 corrections, all remedy mode `editorial` — zero
collection was required anywhere in the phase.

## Layout

- **`audit/`** — the eight audit records (`U1`–`U8`). The verdicts themselves, one table row per claim.
- **`verification/`** — independent re-checks (`V-U*`), landing confirmations (`LV-U*`), one
  adjudication, a citation ruling, and two boundary reviews of the gate summary. **Verification
  records are immutable**; where one was later found wrong, the correction lands in the *audit*
  record, never retro-edited into the verification record.
- **`landing/`** — per-unit landing records (`L-U*`): what each correction changed, and where.
- **`registers/`** — citation state, conflicts (`CFL-001`–`CFL-007`), source leads, the dispatch
  ledger, and the orchestrator's own error register (`OE-001`–`OE-016`, `AD-001`–`AD-004`).
- **`integrity/`** — the program-integrity record.
- **`evidence/`** — specimens captured during the run.
- **`_templates/`** — the audit, verification, and landing record templates.

## Reading a verdict

| Verdict | Means |
|---|---|
| `Preserve` | Examined; stands as written. |
| `Relabel` | The claim is fine; its **evidence label** was too strong — usually "Evidence-backed" where it is really a Product judgement or an Assumption. |
| `Revise` | The **wording** asserts more than its source supports. Needs narrowing, not deleting. |
| `Replace` | Wrong, but the topic still needs a claim. **None assigned this phase.** |
| `Remove` | Baseless and unnecessary. **None assigned this phase.** |

A `Relabel` is not a demotion of the idea. `product-vision.md:6` ("Duolingo-like") was ruled **not an
empirical claim at all** — a genre and values commitment, `Relabel → Product judgement`, explicitly
*not* `Unsupported`.

## Four findings a reader should not miss

1. **The shipped mastery model is one line.** `web/src/learn/controller.ts:361` — every required
   check answered correctly once, ever. `validate.ts:65-66` rejects any required check that is not a
   `question` step, so **100% of shipped mastery evidence is declarative multiple-choice**: a played
   hand can never satisfy completion. Completion gates nothing. Correctly `Preserve`d — the richer
   spec is banner-marked "parked for V2+" and a verifier tried to break that and could not.
2. **`CFL-007` — the roadmap sequences against the project's own evidence.** "Hard totals → hard
   doubles → soft totals → pairs → then mixed review" is **blocked** practice; the most directly
   relevant citation the dossiers hold found **interleaved** practice beat blocked at 72% vs 38%,
   d=1.05 on a closely analogous task. Held at `Revise`, not `Replace`, because domain transfer is
   untested. **Logged and deliberately unresolved** — resolution belongs to Phase 3, sequence design
   to Phase 4.
3. **Agent-persona-as-evidence, found.** One design justifies four choices by reporting that a
   subagent "endorsed [them] architecturally." The code-check half is legitimate `OBSERVED`
   verification; the endorsement half presents a persona's opinion as evidentiary warrant. The other
   three files were swept and carry nothing similar.
4. **A spec asserts assistance that does not exist.** `controller.ts:123` labels a second retry
   `'instruction'` while `retry()` clears feedback and the only affordance is a Retry button. No hint
   ladder exists. The value is consumed downstream and glossed in a test as "a hinted attempt".

## Two things that are honestly not clean

**Criterion 3 (role separation) is attested, not proven.** The dispatch ledger is the sole evidence
for separation, it was abandoned at row 29 — exactly where the landing-confirmation constraint became
load-bearing — and reconstructed afterward. An orchestrator-written ledger agreeing with
orchestrator-written records is self-consistency, not corroboration.

**Criterion 5 passes on the merits, but the route was not clean.** The orchestrator edited the
register the check reads; the program-integrity pass judged that "EVADED, not satisfied." A fresh
verifier then ruled the citation genuinely `VERIFIED`, and that ruling supersedes the edit.

Three gate-design defects remain open for Phase 3 hardening, all of the **absence-as-proof** family:
`1e` cannot fail on a row that does not exist (`OE-014` — it passed while 16 of U5's 17 citation rows
were missing); `1e`'s second cell has no enforced vocabulary, so free prose silently disarms it; and
`1b` has never been observed to FAIL on any fixture.

## Where the arc goes next

**Phase 3** turns these verdicts into meaning — Evidence Summary, Research Synthesis, Project
Implications, Gap Map, Assumption Register, Decision Candidates, and the **Product Design Inputs**
bridge — plus a bounded top-up collection on **teaching probability, EV, variance, and risk
intuition**, which the Phase 1 archive holds nothing on. **Phase 4** owns the curriculum, the skill
graph, and every concrete activity design. Nothing here is a design.
