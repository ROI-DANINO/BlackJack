# Landing confirmation — Unit U5

> Third instance (audit-verifier, instance C). Did **not** write `audit/U5-audit.md`, did **not**
> raise `C-U5-001`/`C-U5-002` (`verification/V-U5.md` did), and did **not** land them
> (`landing/L-U5.md` did). No `Bash`, no `Edit`. This file is the only write of this pass.
> Every retrieval below was re-opened first-hand from the primary artifact; no state is taken
> from `L-U5.md`'s or `V-U5.md`'s quotation of it. Run: foundation-audit-p2, 2026-07-21.

| ID | Verdict | Anchor |
|----|----|----|
| C-U5-001 | LANDED | `audit/U5-audit.md:92` — the `K-U5-002` verdict row, verdict cell now `Preserve` (was `Revise` at `.pre-landing-copy/U5-audit.md:61`); withdrawn basis retained struck through inside the Citation cell; `<!-- LANDED C-U5-001 … -->` marker at `:93`. Consequential landings, each separately marked: Counts paragraph `:110-115` + marker `:116`; "two defects located" sentence `:118-124`; post-citation-table paragraph `:152-163` + marker `:164`; Calibration sentence `:201-205`. |
| C-U5-002 | LANDED | `audit/U5-audit.md:59-74` — the G7 bounding sentence (over-broad clause struck in place at `:60-61`, narrowed statement written at `:63-74`), marker at `:75`; plus the `C2`/`C3`/`C4`/`C5`/`C6` bullet extended at `:36-51`, which now states the archive's remaining content from reading. No verdict changed. |

## 1. The one inferential step — is `Preserve` the right word?

**Ruling: yes. The editor inferred correctly, and the inference is positively grounded in V-U5's own
text, not merely eliminative. No verifier needs to be sent back to name the word.** Flagged
prominently because a verdict changed on an inference, and that fact belongs at the gate.

`V-U5.md` does name the withdrawal and does not name the replacement word — the editor's disclosure
of this (`L-U5.md:43-44`) is accurate and was the right thing to surface. I tested the inference
against V-U5 directly.

**Why `Preserve` is entailed, word by word over the five-word legend (`audit/U5-audit.md:10`):**

- **`Remove` and `Replace` — excluded explicitly.** `V-U5.md:28-33`, covering all twelve in-scope
  rows including row 13: *"I re-opened all twelve rows and every cited source. Nothing in these rows
  is contradicted by its stated basis or baseless. … `Remove` would have required a claim with no
  support or one its source refutes; `Replace` would have required a claim that is wrong but whose
  subject still needs an answer. Neither shape is present."*
- **`Revise` — excluded.** `V-U5.md:191-192`: *"Per the standing rule, the `Revise` at `K-U5-002` may
  not rest on it"*; `:93-94`: *"the 2026-07-11 copy is **UNVERIFIABLE**, and a `Revise` on row 13 may
  not rest on it."* Half (b) is not merely unverified but affirmatively refuted by its own source
  (`V-U5.md:45`, reproduced by me below), so no repaired `Revise` can be re-founded on anything V-U5
  identifies.
- **`Relabel` — unsupported.** V-U5 discusses `Relabel` only for `K-U5-008` (`:117-122`) and makes no
  warrant-status finding about row 13. The editor's stated reason (defect lay in the audit's basis,
  not the decision's warrant status, `L-U5.md:39-41`) is consistent with V-U5 and adds nothing V-U5
  contradicts.
- **`Preserve` — affirmatively grounded, not just residual.** The load-bearing sentence is
  `V-U5.md:94-97`: *"The residue that *is* established and survives … is a fact about drift *since*
  the decision, not an overstatement *by* the decision."* That is the verifier stating, in its own
  words, that **no overstatement by row 13 is established** — which is precisely the `Preserve`
  criterion in this record's legend. `V-U5.md:86-87` adds the conditional *"which, if false, makes
  row 13 accurate exactly as written on 2026-07-11"*; I treat that as supporting, not dispositive,
  since it is conditional.

**The one sentence that could be read the other way, and why it does not change the ruling.**
`V-U5.md:45` ends: *"Fix the basis (both halves) before any verdict on row 13 stands."* Read
strictly, that is an instruction to repair the *basis*, and it could in principle be discharged by a
basis repair that leaves the verdict word open. Two things resolve it:

1. The gate requires a parsing verdict word in the row (a blank row drops out of enumeration), so
   "leave the word open" is not an available state.
2. The landing discharged **both** limbs, not one: the basis was in fact repaired in place
   (`audit/U5-audit.md:92` now states the withdrawal, the refuting quotation, and the surviving
   residue, each with a first-hand citation), *and* the word was set to the only word the other four
   exclusions leave and that `V-U5.md:94-97` positively supports.

**Calibration note, recorded against my own incentive to find a defect here.** I looked specifically
for a reading on which this was a step no editor should have taken, because that would have been the
more "findable" result. It is not available: with four of five words excluded by the verifier's own
text and the fifth positively supported by it, the editor exercised no discretion. The record is also
explicit that `Preserve` is residual rather than a fresh affirmative judgement about row 13
(`audit/U5-audit.md:92`, *"hence `Preserve`, as the residual verdict the verifier's finding leaves
standing; the landing editor substituted no judgement of its own"*), which is the correct and honest
handling of exactly this situation.

## 2. Verdict-row survival — counted first-hand

Regex `^\| *K-U5-[0-9]{3} *\| *(Preserve|Relabel|Revise|Replace|Remove) *\|` run by me over both files:

| File | Matching rows | Distribution |
|---|---|---|
| `.pre-landing-copy/U5-audit.md` | **17** | Preserve 15 / Relabel 1 / Revise 1 / Replace 0 / Remove 0 |
| `audit/U5-audit.md` (post-landing) | **17** | Preserve 16 / Relabel 1 / Revise 0 / Replace 0 / Remove 0 |

Rows `K-U5-001` … `K-U5-017` at `:91-108`, contiguous, none dropped, none added. `K-U5-002` at `:92`
parses with a valid verdict word (`Preserve`) and remains gate-enumerable. Count unchanged;
distribution changed exactly as expected. **Confirms `L-U5.md:16-21`.**

The record's own **Counts** paragraph was updated to match, with superseded figures **struck, not
deleted** — `audit/U5-audit.md:110-113`: *"**Preserve 16, Relabel 1, Revise 0, Replace 0, Remove 0.**
~~Superseded: "Preserve 15, Relabel 1, Revise 1, Replace 0, Remove 0."~~"*. Same pattern at
`:119-121` (the "two defects located" sentence), `:152-153` (the "No citation came back `UNVERIFIED`"
sentence) and `:202` (the Calibration clause). Supersession discipline holds throughout.

**Known cost, disclosed by the editor and confirmed by me:** the `<!-- LANDED C-U5-001 … -->` marker
at `:93` sits between table rows and splits the rendered verdict table in two, so
`K-U5-003`–`K-U5-017` render without a header. Line-wise gate enumeration is unaffected (17 rows
still match). Disclosed at `L-U5.md:74-81` rather than introduced silently; not charged as a defect.

## 3. Retrievals reproduced (representative sample, opened by me)

Both corrections are material, so a landing with no recorded retrieval would be `NOT-LANDED`. The
retrievals are recorded (`L-U5.md:12-13`) and the following reproduce **verbatim at the stated
lines**:

- **The affirmation the whole withdrawal turns on.**
  `docs/superpowers/specs/2026-07-15-strategy-table-fundamentals-lesson1-design.md:120-122`:
  *"Blackjack Foundations' Hit unit says "This hand is a stiff total. Choose Hit to take one more
  card" — a *mechanics* instruction (try the button), not a strategy claim, consistent with the
  subject's "mechanics-first literacy, no strategy language" charter."* Reproduces exactly. `:122-125`
  does locate the sharper contradiction in *"all three arranged `OPENINGS.stiffHands` examples are
  Basic-Strategy STAND hands"*; `:127-143` is the approved Path-A reconciliation; `:145-147` reads
  *"**Deferred write:** STF-04 is a read/research card…"*, confirming the one-string edit is deferred
  by design. All four anchors as characterised.
- `docs/superpowers/plans/2026-07-10-first-guided-drill.md:861`: *"Hit takes another card; Stand keeps
  your total and passes to the dealer. You have a stiff 16 — try Hit and feel the bust risk."*
  Verbatim; it is an `intro` field inside a 2026-07-10 plan artifact. Nothing on the page establishes
  "unshipped".
- `web/src/learn/content/blackjack-basics.ts:257` *"This hand is a stiff total. Choose Hit to take one
  more card."* and `:260` *"Hit adds one more card to your hand."* Verbatim. Today's shipped copy
  carries no bust-risk wording — the half of the audit's evidence that was correctly **preserved
  rather than struck**.
- `docs/superpowers/research/foundation-audit-p1/dossiers/C1-knowledge-tracing.md:278`: *"**No source
  directly evaluates a true solo-learner, zero-population, fixed-item-bank deployment** of BKT, PFA,
  or DKT — the exact shape this product needs."* Verbatim; `:279` is likewise scoped *"for any of the
  three models"*. C1's gap is scoped to three named mastery models, so the struck generalisation to
  the whole archive was genuinely unsupported — **C-U5-002 reproduces.**
- `C6-blackjack-teachable.md:36-39` and `C5-anki-spaced-repetition.md:22-24`, both quoted in the
  landed text, reproduce verbatim.

No retrieval I attempted failed. No claimed retrieval was found to be absent or misquoted.

## 4. The unprompted six-dossier enumeration

**Holds.** I enumerated `docs/superpowers/research/foundation-audit-p1/dossiers/` positively (by
content match on every file, not by an absence check) and found **exactly six**:
`C1-knowledge-tracing.md`, `C2-its-actr-procedural.md`, `C3-deliberate-practice.md`,
`C4-chesscom-khan.md`, `C5-anki-spaced-repetition.md`, `C6-blackjack-teachable.md`.

`C4-chesscom-khan.md:27` verbatim: *"Q2. Khan Academy's mastery mechanics — the mastery-level ladder,
how mastery is earned and lost."* Confirmed.

"`C2` and `C4` opened by neither examiner nor verifier" holds on the records: the examiner records
C2–C6 as not opened (`.pre-landing-copy/U5-audit.md:34-35`) and V-U5 claims only C3, C5 and C6
(`V-U5.md:59`, `:46`).

**In scope.** `C-U5-002`'s remedy (`V-U5.md:46`) requires that *"the archive's remaining content must
be stated from having been read rather than assumed"* — naming which dossiers remain unread, and what
`C4` covers, is directly responsive to that clause rather than an expansion of it. Recording it in
the landed text while explicitly **not** raising it as a new correction was the correct call for an
editor.

## 5. The `CIT-U5-B` gate dependency

**Substantively discharged in the audit record; NOT mechanically cleared. These are different things
and the gate check will still trip until the orchestrator acts.**

- **Substance.** The surviving `Preserve` at `K-U5-002` does not rest on either disputed half. V-U5's
  stated reason for `UNVERIFIED` (`:188-192`) is use-specific — *"the sources were obtained and their
  quoted strings are verbatim and line-exact, but the source contradicts the use made of it (half b)
  … I could not verify that the citation supports the verdict it is offered for."* The verdict it was
  offered for no longer exists. The `Preserve` is residual (no established defect), and the citations
  that survive in the row are used only to record drift-since-decision — a use V-U5 itself endorses
  and whose strings I reproduced first-hand above. So the risk the `UNVERIFIED` state protects against
  is gone.
- **Mechanics.** The `K-U5-002` row's Citation cell still opens `CIT-U5-B.`; the audit's own
  citation-state table still shows `CIT-U5-B … VERIFIED` (`audit/U5-audit.md:136`, examiner-assigned,
  deliberately left unedited); and the orchestrator-owned register still holds `UNVERIFIED`. A gate
  criterion 5 check that pairs verdict word to citation label to register state will therefore still
  read `Preserve` + `UNVERIFIED` and fail. **The verdict change alone does not clear it**, exactly as
  the dispatch anticipated.
- **Who may clear it.** Not the editor — it correctly declined to reassign a citation state
  (`L-U5.md:53-57`) and instead recorded the verifier's `UNVERIFIED` assignment in prose at
  `audit/U5-audit.md:154-163`, superseding the blanket "No citation came back `UNVERIFIED`" sentence.
  Not me — I judge, I do not repair, and I did not touch the register. The reassignment needs a
  verifier ruling on whether `CIT-U5-B` is `VERIFIED` *as now offered* (for a residual `Preserve`
  recording drift), and the material for that ruling is entirely in hand: V-U5 already found the
  strings verbatim and line-exact, and I independently reproduced `:120-122`, `:145-147`, `:861`,
  `:257` and `:260`. Routed to the orchestrator as an open state-reconciliation item, **not** as a
  landing defect.

## 6. Nothing unasked changed

I compared `audit/U5-audit.md` against `.pre-landing-copy/U5-audit.md` section by section. Six loci
changed, all of them named anchors of `C-U5-001` or `C-U5-002`:

| Pre-landing | Post-landing | Correction |
|---|---|---|
| `:34-35` (C2–C6 bullet, 2 lines) | `:34-51` | C-U5-002 |
| `:43-45` (bounding clause) | `:59-75` | C-U5-002 |
| `:61` (`K-U5-002` row, `Revise`) | `:92-93` (`Preserve`) | C-U5-001 |
| `:78-80` (Counts) | `:110-116` | C-U5-001 |
| `:82-84` ("two defects located") | `:118-124` | C-U5-001 |
| `:112-113` ("No citation came back `UNVERIFIED`") | `:152-164` | C-U5-001 |
| `:150-151` (Calibration clause) | `:201-205` | C-U5-001 |

Everything else is byte-for-byte unchanged on my read: header `:1-21`, Row-mapping check, Format
note, verdict rows `K-U5-001` and `K-U5-003`–`K-U5-017`, the full citation-state table `:133-150`
(including the untouched `CIT-U5-B … VERIFIED` cell), the "Every row that cites a document by path"
table, Conflicts logged, the Calibration paragraph's remainder, "Examined and deliberately left
alone", and all ten Non-material notes. **No `ALTERED` locus found.**

**`journal/decisions.md` — the audited object — is unmodified.** Confirmed within my capability
(no `Bash`/git): rows `:19`, `:20`, `:21` read exactly as the audit quotes them, the file contains
**zero** occurrences of `LANDED`, `C-U5-`, or `~~` (i.e. no landing marker and no strikethrough
anywhere), and the row/line mapping the audit depends on still resolves. No trace of an edit.

## 7. Noticed, not raised (for orchestrator routing — no correction opened)

1. **Residual sufficiency question the landing itself surfaced.** The landed text now states plainly
   that `C4` covers *"Khan Academy's mastery mechanics"* and was read by neither examiner nor
   verifier, while the same section still concludes *"The bounding remains valid for the reason C1
   gives within its scope"* (`audit/U5-audit.md:73-74`). Both statements are honest and coexist. But
   the bounding statement's subject is mastery/progression evidence, and unread archive material on
   exactly that subject is now on the record. This is an orchestrator's call about whether U5's
   sufficiency verdict (`V-U5.md:7`, SUFFICIENT) wants a bounded editorial top-up from `C2`/`C4` —
   **material already in hand, `editorial` if pursued, not `collection`.** I do not raise it: it is
   outside the two corrections I was sent to confirm, and the editor was right not to raise it either.
2. **A stale-but-true disclosure.** `audit/U5-audit.md:207-209` still lists *"the non-reading of
   dossiers C2–C6"* among the record's disclosed limitations. That remains accurate **about the
   examiner's own pass**, which is what the sentence is about, but a reader arriving from `:36-51`
   (where C3/C5/C6 are now recorded as read by the verifier) may find it jarring. Cosmetic; below any
   materiality bar; explicitly not a correction.
3. **Scope-respected observation on the withdrawal itself.** I was instructed not to re-litigate the
   adjudication behind `C-U5-001`, and I did not. For the record only: the STF source both affirms the
   wording is *"not a strategy claim"* (`:120-122`) **and** immediately continues *"But the
   contradiction is sharper than the wording alone suggests"* (`:122`), locating that contradiction in
   the arranged hands. V-U5's reading of this is the one I reproduced and I record no disagreement
   with its ruling; I note only that the passage carries both movements, which is visible in the
   landed text because the editor quoted the continuation as well as the affirmation. No action sought.
4. **`Glob` returned no files under `journal/raw/_inbox/` or the P1 dossier directory in this
   environment** (almost certainly ignore-file filtering). I therefore enumerated positively by
   content match instead of trusting an empty glob — the "guard that cannot fail" failure mode. Noted
   as a tooling observation for whoever writes the gate's enumeration step, not as a finding about U5.

## Confirmation of my own deliverable

This file was written to
`journal/raw/_inbox/foundation-audit-p2/verification/LV-U5.md` and **re-read from disk with `Read`
after writing**, before returning. It is the only file this pass wrote. Nothing else — no audit
record, no `journal/decisions.md`, no register — was modified.
