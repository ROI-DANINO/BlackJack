# Evidence Index — a navigation layer over the research archives

> Status: **index, not authority.** Every row here points at a record in an archive that already
> has authority. When a plan, spec, or kanban card cites a finding, it cites the finding's ID and
> its archive locus — this page only makes those findable.

## Read this before citing anything from here

This project's founding error class is **inherited citation**: a document describing a source
nobody reopened, then a second document trusting the first. It has collapsed on re-checking at
least three separate times, including once inside a correction pass whose whole purpose was to
prevent it.

An index is exactly the shape that error takes. So:

- **These pages were produced by read-only agents on 2026-07-26**, reading the archives and
  quoting them with `path:line`. They were not produced by reopening primary sources.
- **A row here is a pointer, never a warrant.** Before a claim goes into a spec, a plan, or
  learner-facing copy, open the archive record it names.
- **Where a row says a correction is unapplied, the archive text is still wrong.** Cite the
  correction, not the dossier.
- If a row and its archive disagree, **the archive wins and this page is the one to fix.**

## The pages

| File | What it indexes | Primary use |
|---|---|---|
| `P1-evidence-catalog.md` | All 96 findings across the six Phase 1 dossiers (C1–C6), with evidence labels, quality tiers, and sources. Plus: design-actionable findings, what the dossiers say is *not* known, the mastery-model question, and 12 cross-dossier conflicts. | Learning-mechanics claims — mastery models, spacing, interleaving, deliberate practice, comparable products. |
| `P3-evidence-catalog.md` | All 20 Phase 3 findings (F1–F20) on probability, EV, variance and risk; the **ten unapplied corrections** from `V-C7-topup.md` with exact replacement wording; gap statuses G1–G6; and the Phase 3 → Phase 4 bridge in full. | Subject-matter claims, and the five playtest questions P-1…P-5. |
| `activity-and-storage-catalog.md` | All 41 `ALR-` activity requirements with their backing sources; the 24-source register (`DUO-*`, `BRI-*`, `SCI-*`, `STD-*`, `TECH-*`) with independence flags; true WCAG levels per requirement; browser-storage results and the Tool & Runtime Admission Protocol. | Activity design, session composition, accessibility, storage decisions. |
| `P2-verdict-catalog.md` | What the project's *own* existing claims are entitled to assert: the 24 Relabels and 7 Revises in full, the shipped-code findings, the conflict register, and a decisive evidence-backed / product-judgement / assumption split. | **Read first when rewriting any spec or roadmap.** |
| `P1-unlanded-and-lost.md` | What Phase 1's process records hold that never reached the gate summary: 14 unlanded corrections, 12 unpropagated verifier rulings, the agent-authored search ban, and the dropped source leads. | Before trusting `P1-gate-summary.md` on any point. |
| `P2-unlanded-and-lost.md` | The same for Phase 2: the 16 orchestrator errors, the four INSUFFICIENT units, the gate-design defects, and the product inputs buried in process records. | Before trusting `P2-gate-summary.md` on any point. |

## Two things the index exists to keep visible

**1. `P1-gate-summary.md:411` states "Every Phase 1 correction landed and marked, on all six
cards." That is false.** At least fourteen verifier corrections across C1, C4 and C5 never
landed and are still absent from the promoted archive. The remediation landed the *second*
generation of corrections and left the first where it found them. `P1-unlanded-and-lost.md`
enumerates them.

**2. The single most product-consequential unlanded correction is C5's F4.** The dossier presents
it as evidence for *spacing*. The verifier established that the study held spacing **constant by
design** — "the degree of spacing was fixed" — and still roughly doubled accuracy (77% vs 38%,
d=1.21) on a rule-application task. It is **interleaving** evidence. The product lever is
*mix hand types within a session*, not *schedule reviews at expanding intervals*. Established
2026-07-19; never landed, never reported.

## What is deliberately not indexed

The `verification/`, `landing/`, and `remediation/` directories of Phases 1 and 2 are indexed only
for what they *lost* (the two `-unlanded-and-lost` pages). Their per-record content answers "was
the audit performed correctly", which is settled and approved, and is not a design input.

`scripts/fixtures/research-gate*/` holds test fixtures for the gate script, not evidence.
