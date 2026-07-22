# Landing confirmation — Unit U4

> Independent third-instance confirmation that the corrections raised in `verification/V-U4.md`
> were landed faithfully into `audit/U4-audit.md`, as claimed by `landing/L-U4.md`.
> Run: foundation-audit-p2. Written 2026-07-22.
> This confirmer did not raise these corrections and did not land them. It holds no edit capability
> over any audit, verification or landing record and modified nothing.

## Verdicts

| ID | Verdict | Anchor |
|----|----|----|
| C-U4-001 | LANDED | `audit/U4-audit.md:48` (K-U4-002 cell, "Basis corrected (C-U4-001)") + `:91-119` ("Correction landed — C-U4-001" passage under the citations table); marker `:49` |
| C-U4-002 | LANDED | `audit/U4-audit.md:55` (K-U4-008 cell, verbatim p.466 sentence + "Self-correction (C-U4-002)"); marker `:56` |
| C-U4-003 | LANDED | `audit/U4-audit.md:166-198` (ALR-007–ALR-012 bullet, "Correction landed — C-U4-003"); marker `:199` |
| C-U4-004 | LANDED | `audit/U4-audit.md:126-161` (section heading + opening + "Correction landed — C-U4-004"); marker `:162` |

## Ruling on the second-hand retrieval for C-U4-001 and C-U4-002

**Ruling: the retrieval requirement is satisfied, and both corrections are `LANDED` — but not because
the second-hand attribution in `L-U4.md` is accepted.** It is satisfied because this confirmer
reproduced both underlying retrievals first-hand, today, and both landed texts match the sources
exactly.

Stated as a rule so it is not over-read: a retrieval reported by an agent that no longer exists,
relayed by a later agent, is **not on its own** a satisfied retrieval requirement — it is an
unverified claim of the same kind the program exists to catch. What rescues these two is that the
facts are cheaply reproducible and were reproduced independently. Had either failed to reproduce,
the ruling would have been `NOT-LANDED`.

**C-U4-001 — reproduced in full.** Direct fetch of `https://blog.duolingo.com/guide-to-duolingo-practice-hub/`
(2026-07-22) returns the activity names and descriptions verbatim as landed:

- *Mistakes:* "Review previous mistakes, so they won't trip you up next time."
- *Words:* "Study recommended words to bolster your vocabulary."
- *Speak:* "Get comfortable speaking the language."
- *Listen:* "Hone your ear so you can follow along when people speak the language."
- plus *Stories*, *Radio*, *Adventures*.

Image caption, verbatim from my own retrieval: "A Duolingo exercise where the learner has to choose a
French vocabulary word in the left column and match it to the corresponding English word in the right
column." Every word of the landed passage at `audit/U4-audit.md:107-115` matches. The correction's
substance — striking the false "confirmed through the DUO-001/BRI-001 re-opening pass" basis and
replacing it with a real DUO-002 retrieval — is present, and the superseded text is preserved in the
record at `:94-97` rather than back-filled, as the program's self-correction pattern requires.

**C-U4-002 — reproduced in full.** The open-access version of record (DOI `10.1007/s10984-024-09501-4`;
Springer link redirects to an IdP, so retrieved from the University of Groningen repository copy at
`https://pure.rug.nl/ws/portalfiles/portal/1198610490/s10984-024-09501-4.pdf`) reads, on **page 466**,
under "Discussion → Context factors", verbatim:

> "With regard to feedback timing, both immediate and delayed feedback had significant and strong
> effects on improving learning performance, with delayed feedback being slightly more effective than
> immediate feedback. A combination of feedback timing approaches was ineffective. These findings
> indicate that clarity and consistency—as to whether participants receive immediate or delayed
> feedback—is more essential than the actual timing of the feedback."

The landed cell at `audit/U4-audit.md:55` carries the first sentence word-for-word, including the
"significant and strong effects on improving learning performance" clause and the delayed-slightly-
more-effective clause that the original paraphrase had erased. The superseded paraphrase
("Both immediate and delayed feedback showed significant effects") is preserved in-cell, not
back-filled. Also confirmed on the same page, incidentally supporting K-U4-009: "The summary effect
of 0.41 (SE=0.05) for the 116 interventions from 46 articles was moderate."

**What I could not reproduce.** Nothing material. I could not reach the Springer HTML version the
record names as its transcription surface (authentication redirect); I used the repository PDF of the
same DOI, which is the version of record's open-access deposit. The page number, section and wording
all match, so the substitution does not weaken the confirmation.

## Verdict-row survival

Counted directly against `audit/U4-audit.md` with the gate's own grammar
(`^\| *K-U4-[0-9]{3} *\| *(Preserve|Relabel|Revise|Replace|Remove) *\|`):

**18 rows**, IDs `K-U4-001`–`K-U4-018` contiguous, at lines 47–48, 50–55, 57–66.

Distribution counted by hand: **Preserve 13** (001, 002, 006, 007, 008, 009, 010, 011, 012, 014, 015,
017, 018), **Relabel 2** (003, 005), **Revise 3** (004, 013, 016), Replace 0, Remove 0. This matches
the required 13/2/3 and the record's own "Counts" line at `:68`.

**`K-U4-002` and `K-U4-008` are correctly restored.** Both now read `| K-U4-002 | Preserve | …` and
`| K-U4-008 | Preserve | …` and both parse under the gate grammar. The damage is directly visible in
`.pre-landing-copy/U4-audit.md:48` and `:54`, where the `LANDED` marker sits **inside the verdict
cell** ahead of the word `Preserve`, taking both rows out of the grammar (parsing count 16, not 18).
The repair moved each marker to its own line immediately below the row (`audit/U4-audit.md:49`, `:56`)
and left the verdict word and both cell bodies otherwise unchanged — I compared the claim and citation
cell text of both rows between the two files and found no substantive difference beyond the marker's
position and its added "Marker relocated out of the verdict cell by this pass" clause. **No verdict
was changed.**

## Independent count of the omitted requirements — the editor is right; the verification record is wrong

I enumerated the audited unit's `ALR-` headings myself: **41 headings**, `ALR-001` at
`docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md:119` through
`ALR-041` at `:369`, contiguous with no gaps or duplicates.

Cross-checked against every requirement given a verdict row or a left-alone statement in
`audit/U4-audit.md`:

- Verdict rows cover ALR-001 (K-U4-003), ALR-004 (K-U4-004), ALR-005 (K-U4-005), **ALR-022
  (K-U4-013)**, ALR-036 (K-U4-017), ALR-037 (K-U4-015), ALR-040 (K-U4-016).
- Left-alone statements cover ALR-007–ALR-012, ALR-013–ALR-019, ALR-026–ALR-031, ALR-032, ALR-033.

Requirements with **neither**: ALR-002, ALR-003, ALR-006, ALR-020, ALR-021, ALR-023, ALR-024, ALR-025,
ALR-034, ALR-035, ALR-038, ALR-039, ALR-041 — **13**.

`V-U4.md`'s C-U4-004 lists "ALR-002, ALR-003, ALR-006, ALR-020–ALR-025, ALR-034, ALR-035, ALR-038,
ALR-039 and ALR-041" — fourteen, because the range `ALR-020–ALR-025` sweeps in **ALR-022**. ALR-022
demonstrably has a verdict row: `audit/U4-audit.md:61` is `| K-U4-013 | Revise | "Evidence:
**INFERENCE:** retrieval evidence \`SCI-001\`; **PROJECT CONSTRAINT:** approved attempt envelope and
current \`AttemptRecord\` seam." (ALR-022, \`…-research.md:253\`)`, and `:253` sits inside the ALR-022
block whose heading is at `:251`.

**Confirmed on my own enumeration: the correct figure is 13.** The editor's divergence from the
verification record was correct, and it recorded the divergence openly at `audit/U4-audit.md:149-153`
rather than silently. `verification/V-U4.md`'s C-U4-004 carries an off-by-one defect on this point;
the audit record is now the more accurate of the two. Nothing else in C-U4-004 is affected — the
coverage claim was genuinely over-broad and the narrowing landed.

## Limits imposed by the damaged before-image

`.pre-landing-copy/U4-audit.md` is **post-damage**: it already contains the first (killed) editor's
landings of C-U4-001 and C-U4-002, including the two in-cell markers. It is therefore not a true
pre-landing image for this unit, and the genuine original is unrecoverable (the run directory is
gitignored). Consequences I state rather than paper over:

1. For **C-U4-003** and **C-U4-004** the before-image is sound and my confirmation is strong: the
   pre-copy at `:124-133` carries the original heading, the original opening line, and the original
   SCI-004/SCI-009 abstention rationale verbatim, and the post-landing file preserves each of those
   texts as quoted "as first written" blocks. The correction is demonstrably a correction, not a
   rewrite.
2. For **C-U4-001** and **C-U4-002** I cannot show the pre-correction state of the two cells from any
   artifact — only the record's own in-place preservation of the superseded text. My confidence rests
   instead on independent reproduction of the sources (above), which is a stronger basis than a diff
   would have been for the substantive question, and a weaker one for the question of whether
   *anything else* in those cells was altered. On that narrower question I record an honest
   **unknown**: I compared the pre-copy and post file line by line and found no change to any other
   row, section or note, but the pre-copy cannot testify about edits the killed editor made before it
   was taken.
3. I therefore treated neither difference-from nor identity-with the pre-copy as dispositive, per the
   dispatch. This limitation is on the program's record already; nothing here resolves it.

## Scope note

I did not re-litigate whether the four corrections were correctly raised (that is `V-U4.md`'s
judgement), and I raise no new corrections here. Two residual observations that are **not** raised as
corrections are returned to the orchestrator for routing rather than recorded as findings.
