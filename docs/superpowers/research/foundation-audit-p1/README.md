# Foundation Audit — Phase 1 Evidence Archive

> **Status: APPROVED 2026-07-20.** Curated Phase 1 evidence for the Adaptive Learning Foundation
> Audit, promoted from the git-ignored inbox after the final verification wave passed.
>
> **Authority: research evidence only.** Nothing here changes adopted product behaviour. Owned
> designs remain authoritative. This archive produces evidence, classification, and *candidate*
> decisions — not product commitments.

## Start here

| File | What it is |
|---|---|
| **`P1-gate-summary.md`** | **Read this first.** Final verdicts, totals, corrections, coverage gaps, the Elo/IRT conclusion, and the approval. |
| `PROCESS-AUDIT.md` | How the audit was executed — dispatch structure, orchestrator errors, verification waves, lessons for Phase 2. |
| `INTEGRITY-MANIFEST-pre.md` / `-post.md` | Tamper-evidence: hashes before and after every remediation, plus repo-integrity probes. |

## Layout

- **`dossiers/`** — the six topic dossiers (C1–C6). The evidence itself.
- **`verification/`** — **27 records**. `V1`–`V6` (initial), `*b`/`*c`/`*d` (sufficiency and remediation),
  `W1`–`W8` (final wave). **Verification records are immutable** — where one was later found to
  contain an error, the correction is recorded in the *dossier*, never retro-edited into the record.
- **`registers/`** — conflict register (25 rows) and source-lead / quarantine register (47 rows).
  **No duplicate IDs.** Quarantined sources are future leads only and contribute nothing to synthesis.
- **`remediation/`** — per-pass reports. Preserved as historical records of what each pass claimed at
  the time; where a claim was later found false, a correction notice is **appended**, not rewritten.
- **`_templates/`** — dossier template, evidence-quality rubric (Q1–Q6), verification-record template.

## How to read a finding honestly

Every finding carries **two independent judgments** that never collapse into one another:

| Axis | Values | Asks |
|---|---|---|
| **Citation state** | VERIFIED / UNVERIFIABLE / DROPPED | Is this specific claim's source real and honestly used? |
| **Dossier sufficiency** | SUFFICIENT / INSUFFICIENT | Is the body of evidence complete enough to conclude from? |

A dossier can be all-VERIFIED and still INSUFFICIENT. In Phase 1, **all six were** on first review.

Findings also carry a **provenance label** (Evidence-backed / Product judgement / Assumption /
Unsupported) and a **quality tier** (Q1–Q6). Superseded text is **struck, not deleted**, with a dated
pass marker — so any reader can reconstruct what a claim said before it was corrected.

## Final state

**5 of 6 dossiers SUFFICIENT.** C1 stands INSUFFICIENT as an **approved, honest COVERAGE GAP** — the
question was searched deeply enough across three passes plus independent verifier searching, the
remaining uncertainty is precisely characterised, and it **must not trigger further collection**.

**0 fabricated sources** across the program. Two tooling fabrications were caught in flight and
rejected — a fetch-summariser that invented a whole venue, and a page-image read that dropped a word
across a column break.

## Two things a future reader should not miss

1. **The Phase 1 corrections had never been applied to the dossiers.** Not on some cards — on all six.
   Verifiers recorded corrections and returned them as text; no pass was ever chartered to write them
   in. The original gate verdicts were reached against dossiers that did not carry their own
   corrections. All are now landed and marked. **Phase 2 needs an explicit landing step and a check
   that it happened.**
2. **The mastery-model question is not settled by evidence, and that is a finding, not a failure.** The
   literature was genuinely searched. The correct next move is to decide on product reasoning and
   label it **Product judgement** or **Assumption**, with a named Validation Method in the Assumption
   Register. See `P1-gate-summary.md` §6.

## Provenance

Working copies live in the git-ignored inbox at `journal/raw/_inbox/foundation-audit-p1/`. This
archive is the tracked, curated copy. The charter governing the program is
`docs/superpowers/specs/2026-07-17-adaptive-learning-foundation-audit-research.md`.

**Phase 2 has not begun.**
