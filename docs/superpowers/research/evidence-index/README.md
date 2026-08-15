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
| `P1-unlanded-and-lost.md` | What Phase 1's process records held that never reached the gate summary: 12 unpropagated verifier rulings, the agent-authored search ban, and the dropped source leads. **Its 14 unlanded corrections are landed** — see the correction note below; the rest of the page has not been re-checked and is dated 2026-07-26. | Before trusting `P1-gate-summary.md` on any point. |
| `P2-unlanded-and-lost.md` | The same for Phase 2: the 16 orchestrator errors, the four INSUFFICIENT units, the gate-design defects, and the product inputs buried in process records. | Before trusting `P2-gate-summary.md` on any point. |

## What this index exists to keep visible

> **CORRECTED 2026-08-15.** Items 1 and 2 below asserted, in the present tense, that fourteen
> Phase 1 corrections were still absent from the promoted archive. **That was true when this page
> was written and became false hours later.** `96b0f05` banked this index; `6da7e9f` — *"land every
> correction the audits raised and never applied"* — then landed them, on the same day, and nobody
> came back to this page. `96dad04` (2026-08-02) edited this directory to retire three other false
> claims and did not catch these two. Both statements are rewritten below with the check that
> settles them; the P3 item, which is still open, is stated third.
>
> This is the index being exactly the shape of error its own header warns about — *"if a row and
> its archive disagree, the archive wins and this page is the one to fix."* It disagreed for twenty
> days.

**1. Phase 1's corrections are landed. `P1-unlanded-and-lost.md` is a historical record, not a live
defect list.** `P1-gate-summary.md:411` (*"Every Phase 1 correction landed and marked, on all six
cards"*) was false when written and is now true of the archive, though by a later pass than the one
it credits.

**Checked positively 2026-08-15 against
`docs/superpowers/research/foundation-audit-p1/dossiers/`, by naming each correction's own string
and counting hits — not by looking for the absence of a problem:**

| Correction | String searched | Hits |
|---|---|---|
| C1 · V1-C5 / V1c-E — Knewton vendor disclosure | `Knewton` | 3 in `C1-knowledge-tracing.md` |
| C1 · V1-C6 — Pelánek's feasibility datum | `10 answers per student` | 2 in `C1-knowledge-tracing.md` |
| C4 · V4 — F6's "the one" mechanism | `unit tests and course challenges` | 1 in `C4-chesscom-khan.md` |
| C4 · V4 — F7's treatment and effect range | `KWiK`, `0.12–0.17` | 1 each in `C4-chesscom-khan.md` |
| C5 · V5 — F4's reframing | header at `C5-anki-spaced-repetition.md:128` | present, dated `C5-EC, 2026-07-26` |

**2. C5's F4 is interleaving evidence, not spacing evidence — and the dossier now says so.** The
study held spacing **constant by design** (*"the degree of spacing was fixed"*) and still roughly
doubled accuracy (77% vs 38%, d = 1.21) on a rule-application task. **The product lever is
*mix hand types within a session*, not *schedule reviews at expanding intervals*.** That reading is
still the most product-consequential thing in the Phase 1 archive; what has changed is that the
dossier carries it — `C5-anki-spaced-repetition.md:128` (the struck F4 header) and `:686`. Only the
claim that it *never landed* was stale.

**3. Phase 3's ten `V-C7-topup` corrections are still unapplied. This one is live.**
`P3-evidence-catalog.md:13`: `V-C7`'s ten *"were landed"*; `V-C7-topup`'s ten (`C-C7T-001…010`)
*"were never applied — that is the outstanding work item."* Findings marked ⛔ there must not be
cited as written. **They matter to product scope in one direction:** `:369` records that the ten are
**net pessimism-correcting**, against `V-C7.md:190` — *"the dossier is systematically pessimistic on
trainability, and that pessimism is an artefact of where its search stopped, not of the
literature."* Phase 4's blueprint was designed on the uncorrected version.

One further correction is owed at three loci that must land together — `A-16`'s *"than unaided
play"* comparator, in the register, in `2026-07-22-product-design-inputs.md:119`, and in
`P3-evidence-catalog.md:236`. It needs an independent re-check first, per `LDB-01` §5.3.

## What is deliberately not indexed

The `verification/`, `landing/`, and `remediation/` directories of Phases 1 and 2 are indexed only
for what they *lost* (the two `-unlanded-and-lost` pages). Their per-record content answers "was
the audit performed correctly", which is settled and approved, and is not a design input.

`scripts/fixtures/research-gate*/` holds test fixtures for the gate script, not evidence.
