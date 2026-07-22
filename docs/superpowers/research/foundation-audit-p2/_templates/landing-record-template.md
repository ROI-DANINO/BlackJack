# Landing — Unit U<n>

<!-- FILL-IN SKELETON for landing/L-U<n>.md, written by an audit-editor — an instance that is
     NOT the verifier who raised the correction. Only units with at least one MATERIAL
     correction get a landing record at all; a unit CLEARED at verify (no material corrections)
     has neither this file nor a landing-confirmation. Every landed correction is material by
     construction — mechanical items were logged as non-material notes and never entered this
     loop, so every row below carries a retrieval. -->

<!-- BLOCKING PRECONDITION (G3): before the first audit-editor touches any audit record, the
     orchestrator snapshots the pre-landing audit/ tree:
       find journal/raw/_inbox/foundation-audit-p2/audit -type f \
         -not -name 'INTEGRITY-MANIFEST-*.md' -exec sha256sum {} \; \
         | sort -k2 > journal/raw/_inbox/foundation-audit-p2/INTEGRITY-MANIFEST-pre.md
     This is the before-image Task G step 3 reconciles against; without it, ALTERED is not
     falsifiable and an editor could change something nobody asked for undetected. -->

| Correction ID | Anchor landed at | Retrieval performed |
|----|----|----|
| C-U<n>-NNN | <audit/U<n>-audit.md:K-U<n>-NNN — where the correction now lives, and how it is marked in place> | <primary source reopened (G9): what was retrieved, from where, and what it showed> |

<!-- One row per correction the verification record raised for this unit. Correction ID first
     cell, matching verification/V-U<n>.md's `C-U<n>-NNN` exactly. The landed correction must
     also be visibly MARKED in place inside audit/U<n>-audit.md itself (not only described here)
     so a later reader can see it landed. A landing pass that issues zero retrievals while
     making a material source claim is rejected outright and re-dispatched — "unverified by
     construction." -->

---

# Landing confirmation — Unit U<n>

<!-- FILL-IN SKELETON for verification/LV-U<n>.md — despite the `LV-` handle and the
     `verification/` directory, this is the landing-CONFIRMATION shape, produced by a THIRD
     audit-verifier instance (instance C): different from the verifier that raised the
     correction (instance B) AND different from the audit-editor that landed it. Confirms each
     correction by opening audit/U<n>-audit.md itself — "presence of the topic is not presence
     of the correction," a keyword grep over the editor's own discussion is not a confirmation. -->

| ID | Verdict | Anchor |
|----|----|----|
| C-U<n>-NNN | <LANDED\|NOT-LANDED\|ALTERED> | <file:line / table-row anchor — what the reader actually finds there> |

<!-- One row per correction the verification record raised, INCLUDING every correction that
     landed cleanly — a correction with no row here fails the gate at Task G step 1a. Row form
     is load-bearing: `| C-U<n>-NNN | <verdict> | ... |`, ID first, verdict second — Task G
     steps 1a/1b read this row-wise so a real NOT-LANDED/ALTERED failure is never confused with
     this legend line.

     LANDED     — present, at the anchor, saying what was asked.
     NOT-LANDED — the correction is not present at the anchor.
     ALTERED    — something is present at the anchor but it does not say what was asked.
     For MATERIAL corrections, a landing claimed with no recorded retrieval is NOT-LANDED
     regardless of how correct its prose looks (LV* step 3).

     NOT-LANDED / ALTERED route back to a fresh audit-editor pass, ONCE — the loop is bounded to
     one retry. Supersession is a RENAME performed by the orchestrator, before the retry is
     dispatched, never an edit: this file is renamed to LV-U<n>-r1.md (the archived, permanent
     record that a correction failed once — a verifier "judges, it never repairs," so this row
     is never edited away), and the second confirmation writes a FRESH LV-U<n>.md covering EVERY
     correction the verification record raised, not only the ones that failed. Task G steps
     1a/1b read only the current LV-U<n>.md and skip the archived `-r1` file. A correction still
     failing after LV-U<n>-r1.md is escalated to the user at the gate, not re-dispatched a third
     time. -->
