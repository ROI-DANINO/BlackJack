# Audit — Unit U<n>

<!-- FILL-IN SKELETON — audit-examiner writes this at audit/U<n>-audit.md.
     Replace every <n> with the unit number (1-8). One table row per audited (load-bearing)
     claim. Claims that are not load-bearing do not get a row at all — they go to
     "Non-material notes" below (materiality gate: only load-bearing claims get a verdict). -->

Verdict legend: Preserve / Relabel / Revise / Replace / Remove

<!-- Preserve — the claim stands as written. Must cite the exact Phase 1 dossier / baseline
       location that supports it.
     Relabel  — the claim is fine; its epistemic label (bucket) is wrong. This is the DEFAULT
       remedy for an uncited-but-reasonable claim — never escalate straight to Remove for want
       of a citation.
     Revise   — the claim overstates what its basis supports. Name the specific overstatement
       and the honest wording.
     Replace  — the claim is wrong but the topic still needs a claim. Name the successor claim;
       do NOT author it (drafting is a later phase, P4).
     Remove   — the claim is contradicted or baseless and nothing should stand in its place.
       Reserved for contradicted/baseless only — a Remove on a merely-uncited claim is itself a
       defect the verifier must reject.
     Remove and Replace are the manufactured-defect-prone verdicts (G5, anti-pessimism rule):
     each one REQUIRES an independent verifier's written "is this defect real?" answer
     (DEFECT-REAL: YES/NO, in verification-record-template.md) before it can pass the gate
     (Task G step 1d). A wave that returns zero Preserve verdicts is itself a calibration
     signal the orchestrator must flag, not a clean sweep. -->

| Claim ID | Verdict | Claim | Citation |
|----|----|----|----|
| K-U<n>-001 | <Preserve\|Relabel\|Revise\|Replace\|Remove> | <claim quoted VERBATIM, with a `file:line` anchor — paraphrase is itself a defect> | <CIT-NNN> |

<!-- Add one row per assessed claim: K-U<n>-002, K-U<n>-003, ...
     Claim ID form is load-bearing: `| K-U<n>-NNN | <verdict> | ... |` — ID first cell, verdict
     second cell, exactly as Task G step 1-pre-b's positive row check scopes it
     (`^\| *K-U<n>-[0-9]{3} *\| *(Preserve|Relabel|Revise|Replace|Remove) *\|`). A verdict
     recorded only in prose is invisible to that check and is returned to the auditor.
     IDs are unit-local, assigned by the auditor (not a shared register — G6 governs the three
     orchestrator-owned registers, not these per-unit claim IDs). -->

## Calibration — what "good" looks like

<!-- Anchor the standard before writing a single verdict, so the finding is anchored by the
     auditor's own citation discipline, not by the orchestrator seasoning it after the fact.
     journal/decisions.md rows R20, R24, R25, R26, and R27 are the positive-control decisions
     this audit is held to. Each cites an exact doc path, section/line number, or a measured
     figure; two of the five (R24, R26) visibly self-correct a prior error inside the same
     record rather than quietly fixing it. Concretely:

       - R20 (2026-07-16, "Do not adopt Bun now") — grounds its verdict in measured figures
         (npm ci 4.8s; suite 19.3s; qa:rules 16.5s; 113/113 non-DOM tests green), not impression.
       - R24 (2026-07-16, "Admit `idb` 8.0.3 ...") — quotes an exact line from
         `docs/superpowers/specs/2026-07-16-adaptive-learning-browser-storage-research.md` and
         cites 42/42 scoped-gate figures, AND self-corrects in-record: the row states the
         bundle-check condition "was omitted from this row until 2026-07-17" instead of quietly
         back-filling it.
       - R25 (2026-07-17, "Learner identity ... pseudonymous") — names and quotes AL-R2's
         approved Identity and Privacy Boundary verbatim, and names the exact drifted doc
         locations it corrects (`ROADMAP.md`, `docs/specs/stack-boundaries.md`).
       - R26 (2026-07-17, "Scope AL-D1 to ... cycle-1 foundation") — cites exact file:line
         anchors (`ROADMAP.md:42`; `web/src/learn/validate.ts:51-55`, `:70-75`), AND
         self-corrects in-record: "an earlier draft of this row also claimed attempts were
         mastery-unusable ... That was wrong" — the error and its correction both stay visible.
       - R27 (2026-07-17, "Approve the cycle-1 ProgressStore design ...") — grounds each of its
         four rulings in a measured figure or a named mechanism (the 5 KB bundle-delta alarm;
         IndexedDB's overlapping-scope readwrite serialisation) rather than assertion.

     An auditor verdict that cannot point to a comparably exact anchor (doc path + section/line,
     or a measured figure) has not met this bar. -->

## Non-material notes

<!-- The materiality-gate sink. Demoted cosmetic/mechanical observations — formatting, ID
     hygiene, phrasing nits, anchor style — go here, UN-numbered. Items placed here get NO
     verdict and enter NO landing loop: they are not corrections, are never landed, are never
     confirmed, and no Task G gate check reads this section. If a note turns out to be material
     on reflection, it does not belong here — promote it to a verdict row above, or flag it to
     the verifier as a correction candidate. -->

(none for this unit)
