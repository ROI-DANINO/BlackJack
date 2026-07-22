# Verification — Unit U<n>

<!-- FILL-IN SKELETON — audit-verifier writes this at verification/V-U<n>.md.
     Replace every <n> with the unit number (1-8). -->

SUFFICIENCY: <SUFFICIENT|INSUFFICIENT>

<!-- SUFFICIENT — the audit record's claims and citations are complete enough to gate. A unit
       can be SUFFICIENT and still carry material corrections below — sufficiency and
       correction status are different axes; do not conflate them.
     INSUFFICIENT — state why in one line immediately below this field (e.g. no claims were
       assessed yet; a mandatory DEFECT-REAL answer is still outstanding; a citation could not
       be checked). -->

## Mandatory calibration — Remove/Replace defect-real answers

<!-- REQUIRED whenever the audit record carries ANY Remove or Replace verdict (G5, the
     anti-pessimism rule — Remove/Replace are the manufactured-defect-prone verdicts). One row
     per such claim, ID first cell, the DEFECT-REAL answer second cell — Task G step 1d
     enumerates every audit-record Remove/Replace `K-U<n>-NNN` and requires a matching row here
     (scoped as `K-U<n>-NNN ... | DEFECT-REAL`); a Remove/Replace claim with no row here fails
     the gate. Delete this whole section only if the audit record carries zero Remove/Replace
     verdicts for this unit. -->

| Claim ID | Answer | Note |
|----|----|----|
| K-U<n>-NNN | DEFECT-REAL: <YES\|NO> | <reasoning — is the claim actually contradicted/baseless, or is this a manufactured defect a Preserve/Relabel/Revise would fix instead?> |

## Corrections raised

<!-- MATERIAL defects ONLY (G1) — a correction that changes a quotation, figure, attribution,
     tier, independence judgement, or the basis of a verdict. Mechanical/cosmetic items
     (formatting, anchors, ID hygiene) do NOT belong here — log those in "Non-material notes"
     below instead; they get no ID, no landing loop, no gate check.
     IDs are unit-local (`C-U<n>-NNN`), assigned by the verifier — NOT shared-register IDs
     (G6 governs the three orchestrator-owned registers, not these per-unit correction IDs).
     If there are no material corrections, DELETE this table and write instead:
     "No corrections raised against this record." — that is the common case: the unit is
     CLEARED at verify with no landing, no confirmation, no re-verify pass. -->

| ID | Correction | Remedy |
|----|----|----|
| C-U<n>-NNN | <precisely what is wrong> | <editorial \| requires audit-editor to reopen the primary source (G9)> |

## Non-material notes (mechanical / cosmetic — not gated)

<!-- Un-numbered. Formatting nits, anchor-style inconsistencies, ID hygiene, phrasing polish —
     the materiality-gate sink at this pass. Never promoted to a numbered correction unless
     actually material; never landed, never confirmed, never read by a Task G gate check. -->

(none)

<!-- NOTE: the retry/confirmation record (verification/LV-U<n>.md) is a DIFFERENT shape,
     written by a third instance after landing — see landing-record-template.md, which covers
     both the landing record (landing/L-U<n>.md) and this landing-confirmation shape together. -->
