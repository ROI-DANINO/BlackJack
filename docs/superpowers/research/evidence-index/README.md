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
- ~~**Where a row says a correction is unapplied, the archive text is still wrong.** Cite the
  correction, not the dossier.~~ **Retired 2026-08-17: no row on these pages now claims an unapplied
  correction, and this instruction is what caused the Phase 3 rows to be read as a live defect list
  twenty-two days after they stopped being one. If a future row does claim one, do not act on the
  claim — open the archive and check, because both times this index has asserted it, it was wrong.**
- If a row and its archive disagree, **the archive wins and this page is the one to fix.**

## The pages

| File | What it indexes | Primary use |
|---|---|---|
| `P1-evidence-catalog.md` | All 96 findings across the six Phase 1 dossiers (C1–C6), with evidence labels, quality tiers, and sources. Plus: design-actionable findings, what the dossiers say is *not* known, the mastery-model question, and 12 cross-dossier conflicts. | Learning-mechanics claims — mastery models, spacing, interleaving, deliberate practice, comparable products. |
| `P3-evidence-catalog.md` | All 20 Phase 3 findings (F1–F20) on probability, EV, variance and risk; the ten ~~unapplied~~ **landed** corrections from `V-C7-topup.md` with exact replacement wording and the line each landed at; gap statuses G1–G6; and the Phase 3 → Phase 4 bridge in full. | Subject-matter claims, and the five playtest questions P-1…P-5. |
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
> settles them; ~~the P3 item, which is still open, is stated third.~~ **the P3 item is stated third.**
>
> This is the index being exactly the shape of error its own header warns about — *"if a row and
> its archive disagree, the archive wins and this page is the one to fix."* It disagreed for twenty
> days.
>
> **AMENDED 2026-08-17 at `LDB-10`.** This pass got item 3 wrong in the same edit. It called the P3
> item *"still open"* here and wrote *"still unapplied. This one is live."* as item 3's own heading —
> without checking `6da7e9f`, the very commit it had just named as the one that landed the Phase 1
> corrections. `6da7e9f` landed the Phase 3 ten as well.
> The diagnosis above was correct and complete, and it was not applied to the third item on its own
> list. That is this repository's recorded failure class — *a rule written in a pass does not fire on
> the pass that wrote it* — and it is now the second documented instance, after `LDB-06` D8. The
> mechanism that finally caught it was not a better rule; it was opening the target file.

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

~~**3. Phase 3's ten `V-C7-topup` corrections are still unapplied. This one is live.**~~
**3. Phase 3's ten `V-C7-topup` corrections are landed too. Nothing in this index is a live
correction defect.**

> **CORRECTED 2026-08-17 at `LDB-10`, and this one is the worst of the three.** The struck heading was
> written by the 2026-08-15 pass above — the pass that had just diagnosed this exact mechanism, named
> `96b0f05` and `6da7e9f` by hash, and written *"nobody came back to this page."* It then failed to
> ask whether `6da7e9f` — *"land every correction the audits raised **and never applied**"* — had also
> landed the Phase 3 ten. It had, in the same commit, seventeen minutes after `96b0f05` banked
> `P3-evidence-catalog.md`. **A correction pass repeated, in its own third item, the error it was
> written to fix in its first two.**
>
> **Checked positively 2026-08-17** against
> `docs/superpowers/research/foundation-audit-p3/collection/C7-probability-ev-variance.md`, by naming
> each correction's own replacement string and reading it at its own locus — all twelve loci for the
> ten corrections are enumerated with line numbers in `P3-evidence-catalog.md` §2. Counting check:
> `git show 96b0f05:<dossier>` returns **0** `LANDED C-C7T` markers; `6da7e9f` added **18**.
>
> Two further gaps that page recorded are closed in the same pass. Its `C-C7T-009` trap ("must not be
> applied verbatim") **was honoured** — the landing note at `:1757-1764` states it used the corrected
> `README.md:50-66` characterisation of Floyd, and the dossier text confirms it. Its byte-integrity
> gap for F1–F14, which it said "a shell can settle outright", **is settled**: each `#### Fn:` section
> hashed at `55f24aa` and again after the 2026-07-26 landing shows F1–F14 **identical** and exactly
> F15–F20 changed.

**What this does and does not change for product scope.** `P3-evidence-catalog.md:369` records the
ten as **net pessimism-correcting**, against `V-C7.md:190` — *"the dossier is systematically
pessimistic on trainability, and that pessimism is an artefact of where its search stopped, not of
the literature."* ~~Phase 4's blueprint was designed on the uncorrected version.~~ **It was not.** The
landing (2026-07-26) precedes every Phase 4 decision (`LDB-01`/`LDB-03` 2026-08-01, `LDB-04`
2026-08-03, `LDB-05` 2026-08-05, `LDB-09` 2026-08-15), so any card that opened the dossier read
corrected text. The residual exposure runs the other way and is narrow: a card that consulted the
**index** rather than the archive saw F15, F16, F17, F19 and F20 flagged ⛔ *"do not cite as
written"* when they were safe to cite, and may have declined evidence it was entitled to use.
Handed to `LDB-08`.

One further correction is owed at three loci that must land together — `A-16`'s *"than unaided
play"* comparator, in the register, in `2026-07-22-product-design-inputs.md:119`, and in
`P3-evidence-catalog.md:236`. It needs an independent re-check first, per `LDB-01` §5.3.

## What is deliberately not indexed

The `verification/`, `landing/`, and `remediation/` directories of Phases 1 and 2 are indexed only
for what they *lost* (the two `-unlanded-and-lost` pages). Their per-record content answers "was
the audit performed correctly", which is settled and approved, and is not a design input.

`scripts/fixtures/research-gate*/` holds test fixtures for the gate script, not evidence.
