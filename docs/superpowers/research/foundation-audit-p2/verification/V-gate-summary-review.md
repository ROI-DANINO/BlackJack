# Verification — Phase-3-boundary review of `P2-gate-summary.md`

> Independent Phase-3-boundary reviewer. I did not write `P2-gate-summary.md`, did not audit any
> unit, did not verify any citation, and did not edit any artifact. No `Bash`, no `Edit`. This file
> is the only write of this pass. Every figure below was recounted by me first-hand from the
> artifacts named; nothing is taken from the summary's own statement of it, and nothing is taken
> from `integrity/PROGRAM-INTEGRITY.md`'s quotation of an artifact where I could open the artifact
> myself. Run: foundation-audit-p2, 2026-07-22. Subject: `P2-gate-summary.md` only — I re-audited
> no unit, re-checked no verdict, and raise no correction against any audit record.

---

## VERDICT

| Part | Ruling |
|---|---|
| 1. Six `must not` bullets | **ONE BREACH** — bullet 1, at `:25-26`. Bullets 2, 3, 4, 5, 6: **clean**. |
| 2. Headline figures | **VERDICT COUNTS FULLY REPRODUCE. CORRECTION COUNT DOES NOT** — the headline `25` contradicts the summary's own per-unit list, which sums to **26**; one of the 26 is landed but **not independently confirmed**. |
| 3. Gate-status table honesty | **HONEST IN THE PESSIMISTIC DIRECTION, FLATTERING IN THREE PLACES** — criterion 3 overstates against the integrity record, criterion 11 drops a fifth area, and criteria 5/8 rest on a register that is **missing 16 of U5's 17 citation rows**. |
| Bonus: "Program findings" process/evidence line | **RESPECTED, item by item.** All five items are process. |

---

## Part 1 — the six `must not` bullets

### BREACH-1 — `P2-gate-summary.md:25-26` — violates bullet 1 (integration into a combined conclusion)

Verbatim:

> That last figure is itself a result: **the Phase 1 evidence base was adequate.** The failures this
> audit found were in the *use* of evidence already held, not in its absence.

**Why it breaches.** "The Phase 1 evidence base was adequate" is a conclusion about an object no
unit audited — the P1 archive as a whole — reached by aggregating the remedy-mode tally across all
eight units. It fails the one-sentence test cleanly: delete any unit's findings and the claim is no
longer supportable, because its warrant is precisely that *every* correction in *every* unit came
back `editorial`. The preceding sentence (`:21-23`, "All 25 remedy mode `editorial`; zero collection
was required anywhere in the phase") is a permitted tally. `:25-26` then explicitly converts that
tally into something else — the summary says so in its own words, "That last figure is **itself a
result**." That conversion is the act bullet 1 forbids; it is Phase 3 deliverable 2 (Research
Synthesis) in one sentence.

**It is also not fully warranted by the artifacts, which sharpens rather than softens the ruling.**
`verification/LV-U5.md:203-211` records an open sufficiency question of exactly this shape and
declines to resolve it:

> This is an orchestrator's call about whether U5's sufficiency verdict (`V-U5.md:7`, SUFFICIENT)
> wants a bounded editorial top-up from `C2`/`C4` — **material already in hand, `editorial` if
> pursued, not `collection`.**

A live, unresolved question about whether the evidence base was read sufficiently sits in a
confirmation record; the summary states the conclusion anyway.

**Consequential falsehood.** Because of BREACH-1, the summary's own closing self-certification at
`:268-271` — "It does not integrate findings across units" — is false as written.

**Remedy route: `editorial`.** Delete the sentence, or reduce it to the tally it rests on (e.g. "All
25 corrections were remedy mode `editorial`; no unit required new collection"). No collection, no
new source, no re-audit. One sentence, one file.

### Considered and ruled NOT a breach — recorded so a later pass does not re-raise them

I examined each of the following specifically because it is the shape a breach takes, and I am
recording the negative rulings with reasons rather than leaving silence.

1. **`:16-19` — "Nothing in the audited foundation was found contradicted or baseless — every defect
   located was a labelling, precision, or coverage defect."** This is the closest call in the
   document and I rule it **permitted enumeration**. Under the Phase 2 verdict legend, `Remove`
   *means* a claim with no support or one its source refutes and `Replace` *means* a claim that is
   wrong but whose subject still needs an answer (`verification/V-U5-citation-ruling.md` reproduces
   the legend reasoning at `LV-U5.md:26-30`). "Zero `Remove`, zero `Replace`" and "nothing
   contradicted or baseless" are therefore the same proposition in two vocabularies, and restating a
   tally in words is enumeration, not synthesis. Flagged as the tightest line in the document; no
   change required.

2. **`:152-153` ("the phase's strongest evidence-grounded finding"), `:178-179` ("The most
   product-consequential is `CFL-007` … the one place this audit found held evidence pointing
   against a decision already written into the roadmap"), `:108` ("The phase's only verdict change"),
   `:162` ("The only all-clean unit").** These are **cross-unit superlatives**, and they do
   mechanically require other units to assert. I nonetheless rule them **permitted**: each is a
   ranking-by-enumeration over a list the summary is entitled to enumerate, each is pointer-shaped,
   and none resolves a tension or draws a substantive conclusion from the combination. The permission
   is explicit — "cross-unit *tensions as pointers* to the conflict register" — and `:181` discharges
   the boundary in terms: "**Resolution belongs to a later phase; sequence design belongs to a later
   phase still.**" I looked hard for a should-statement in the `CFL-007` paragraph (`:176-181`) and
   there is none; the paragraph names the tension, names the register, and refuses.

3. **`:132` — U6's "no live document claims a richer mastery model as current."** Ruled **not a
   breach**, and this is a genuine acquittal rather than a pass. The sentence looks cross-unit (it
   ranges over documents that are other units' objects) but its warrant is entirely inside U6's own
   verification. `verification/V-U6.md:76-92` is the U6 verifier's **own** positive sweep — it opens
   `…adaptive-ai-learning-architecture-design.md`, `journal/decisions.md:30`/`:33`, `ROADMAP.md`,
   `docs/specs/product-vision.md:3` first-hand and concludes at `:93`: *"Nothing live claims that the
   shipped code delivers more than one-shot completion."* Delete U1, U2 and U8's findings and the
   sentence stands unchanged. It passes the one-sentence test. It is also not a should-statement: it
   reports what documents say, not what the project ought to do.

4. **Bullet 2 (should-statements) — clean.** I read every sentence for an imperative or a
   project-directed "should". The nearest approaches are `:202` ("A verdict-row preservation check
   did not exist and was needed") and `:258-262` (two gate-design defects). Both are about *this
   audit program's own gate*, not about the blackjack product or its roadmap, and the dispatch's
   carve-out for process observations covers them. `:172` is the model case in the other direction —
   "**Recorded, not repaired**: reconciling those documents is a separately-scheduled act outside
   this program's charter."

5. **Bullet 3 (design inputs) — clean.** No sentence converts a finding into a product requirement,
   parameter, sequence, or interface. U6's `:126-128` (declarative-only mastery evidence, completion
   gates nothing) stops at description.

6. **Bullet 4 (Phase 3 decision vocabulary) — clean, and I checked the collision.** "Reconsider"
   does not occur. "Confirm"/"confirmed" occurs only in the landing-confirmation and
   verbatim-confirmation senses (`:21`, `:112`, `:148`, `:238`), never as a decision on a claim.
   Every occurrence of `Revise` and `Remove` — `:4`, `:14`, `:16`, `:33`, `:54`, `:74`, `:88`, `:107`,
   `:122`, `:137`, `:143`, `:153`, `:241` — is the Phase 2 verdict word, used in a tally, a legend, a
   verdict report, or the gate criterion. No occurrence carries the Phase 3 decision sense. `:4`
   pre-empts the collision explicitly.

7. **Bullet 5 (replacement content) — vacuous and confirmed.** I recounted `Replace` myself: **zero**
   across all eight audit records (see Part 2). No replacement content is authored anywhere.

8. **Bullet 6 (reads as though documents were reconciled) — clean.** `:122` "**No code was
   modified.**"; `:172` "Recorded, not repaired"; `:244` criterion 7. Nothing reads as reconciliation.

---

## Part 2 — factual accuracy of the headline figures

### Method

I ran the dispatch's row pattern `^\| *K-U<n>-[0-9]{3} *\| *(Preserve|Relabel|Revise|Replace|Remove) *\|`
over `audit/U1-audit.md` … `audit/U8-audit.md` myself and tallied the matched verdict words. I did
not take any count from the summary, from `registers/dispatch-ledger.md`, or from
`integrity/PROGRAM-INTEGRITY.md`.

### Verdict counts — REPRODUCE EXACTLY

| Unit | Rows | Preserve | Relabel | Revise | Replace | Remove | Summary says | Match |
|---|---|---|---|---|---|---|---|---|
| U1 | 18 | 13 | 5 | 0 | 0 | 0 | 13 / 5 (`:53`) | **yes** |
| U2 | 11 | 5 | 6 | 0 | 0 | 0 | 5 / 6 (`:74`) | **yes** |
| U3 | 13 | 10 | 1 | 2 | 0 | 0 | 10 / 1 / 2 (`:88`) | **yes** |
| U4 | 18 | 13 | 2 | 3 | 0 | 0 | 13 / 2 / 3 (`:33`) | **yes** |
| U5 | 17 | 16 | 1 | 0 | 0 | 0 | 16 / 1 (`:107`) | **yes** |
| U6 | 9 | 6 | 2 | 1 | 0 | 0 | 6 / 2 / 1 (`:122`) | **yes** |
| U7 | 9 | 1 | 7 | 1 | 0 | 0 | 1 / 7 / 1 (`:143`) | **yes** |
| U8 | 7 | 7 | 0 | 0 | 0 | 0 | 7 (`:162`) | **yes** |
| **Total** | **102** | **71** | **24** | **7** | **0** | **0** | **102 / 71 / 24 / 7 / 0 / 0** (`:14`) | **yes** |

**`OE-011` is fully repaired in this artifact.** The headline `102` is correct, the distribution is
correct, and every per-unit figure is correct. The wrong `104` survives only in
`registers/dispatch-ledger.md:150` and `RESUME-STATE.md`, which the summary discloses at `:211-215`
as historical rather than repeating. **Zero `Remove` and zero `Replace` (`:16`) is confirmed
independently by my own enumeration** — no row in any of the eight records carries either word.

### Correction count — DOES NOT REPRODUCE

**The summary's per-unit correction counts sum to 26, not the 25 it states at `:21` and `:238`.**

| Unit | Summary states | My count of raised IDs |
|---|---|---|
| U4 (`:33`) | 4 | 4 (`LV-U4.md:13-16`) |
| U1 (`:53`) | 3 | 3 (`LV-U1.md:15-17`) |
| U2 (`:74`) | 2 | 2 (`LV-U2.md:14-15`) |
| U3 (`:88`) | 5 | 5 (`LV-U3.md:14-18`) |
| U5 (`:107`) | **3** (incl. one post-ruling) | **3** — `C-U5-001`, `C-U5-002`, **`C-U5-003`** |
| U6 (`:122`) | 2 | 2 (`LV-U6.md:8-9`) |
| U7 (`:143`) | 3 + 1 adjudication | 3 (`LV-U7.md:15-17`) + `C-U7-001-adj` |
| U8 (`:162`) | 4 | 4 (`LV-U8.md:12-15`) |
| **Sum** | **26** | **26** |

`C-U5-003` exists and is landed. `audit/U5-audit.md:177`, verbatim:

> `<!-- LANDED C-U5-003 (V-U5-citation-ruling, editorial): marks the CIT-U5-B row of the internal
> citation table (:136) as examiner-assigned, not verifier-assigned; the coincident VERIFIED value
> is unchanged; authoritative state is the verifier's ruling in registers/citation-state-register.md
> and verification/V-U5-citation-ruling.md. -->`

It answers the second correction returned by `verification/V-U5-citation-ruling.md:192`
("`audit/U5-audit.md:136` — the `VERIFIED` in the internal citation table is examiner-assigned
(self-verified) and coincidentally correct. Its provenance should be marked … **Material** only
because a self-verified state cell is the precise defect the separate-verifier contract exists to
prevent"), whose raiser explicitly types it **material** and remedy **editorial**.

**Two distinct defects follow, and they need separating:**

- **DEFECT-2a — the total is 25 where the artifacts and the summary's own list say 26.** `:21`
  ("25 material corrections"), `:22` ("All 25"), and `:238` ("25/25 landed and confirmed") are each
  one short. This is the *same class* as `OE-011`: a program total that no downstream role
  re-derives. It is smaller in magnitude and it runs in the opposite (understating) direction, but
  the mechanism is identical and it appears in the artifact written *after* `OE-011` was disclosed.

- **DEFECT-2b — `C-U5-003` is landed but NOT independently confirmed, so "raised, landed, and
  independently confirmed" (`:21`) and "25/25 landed and confirmed" (`:238`) are not true of the
  full set.** I grepped the entire run directory for `C-U5-003`: it appears in exactly two places —
  `audit/U5-audit.md:177` (the landing marker) and `landing/L-U5.md:14` (the landing record). **No
  `verification/LV-*` record carries a `| C-U5-003 | LANDED |` row.** `verification/LV-U5.md:11-12`
  predates it and covers `C-U5-001`/`C-U5-002` only. The confirming third-instance layer, which is
  the whole anti-fabrication mechanism, has not run on this correction. Note that
  `integrity/PROGRAM-INTEGRITY.md` Area 1 ("**SOUND** — all 25 present … and independently
  confirmed") was written *before* `C-U5-003` existed, so its `SOUND` does not cover it either.

  *Bounding this honestly:* `C-U5-003` is an annotation of provenance that changes no verdict and no
  citation value, and the landed text at `audit/U5-audit.md:167-176` reads faithfully to the
  ruling's request on my reading. The defect is in the **claim of universal confirmation**, not in
  the landing. Two remedies are available and they are different acts: correct the summary's wording
  to state 26 raised / 26 landed / 25 confirmed with `C-U5-003` named as the exception
  (**editorial**), or dispatch a confirmer for `C-U5-003` and then state 26/26/26 (**a new
  dispatch**, not an editorial fix). I record which is which and do not choose between them; that is
  the orchestrator's call.

- **Related, recorded not raised:** the *first* correction returned by
  `verification/V-U5-citation-ruling.md:191` (the `registers/citation-state-register.md:87` row fix)
  was landed by the orchestrator into the register and carries **no `C-` ID at all**. It is
  therefore in no count in either direction. Consistent with G6 (registers are orchestrator-owned
  and not editor-landed), so I do not call it a defect — but a reader reconciling "corrections
  raised" against "verifier returns" will find one return unaccounted for, and the summary could say
  so in a clause.

### Remedy mode — REPRODUCES

I read the Remedy cell of every `Corrections raised` table in `verification/V-U1.md` … `V-U8.md` and
`V-U5-citation-ruling.md`. **Every one reads `editorial`. A grep for a `collection` remedy cell
across all of `verification/` returns zero matches.** `:22` ("All 25 remedy mode `editorial`; zero
collection was required anywhere in the phase") is **correct**, and remains correct at 26 —
`C-U5-003`'s remedy is typed `editorial` at `V-U5-citation-ruling.md:192`.

### Other figures spot-checked

| Summary claim | Ruling |
|---|---|
| `:23` "No correction rests in `NOT-LANDED` or `ALTERED`" | **Reproduces.** No `NOT-LANDED`/`ALTERED` verdict in any `LV-*` record. |
| `:208` "Thirteen … (`OE-001`…`OE-013`)" | **Reproduces.** `registers/orchestrator-errors.md` carries exactly `OE-001`–`OE-013` plus four `AD-` rows. |
| `:224` "a rendering defect in 9 places" | **Reproduces**, and is the *corrected* figure — `OE-007` itself still says 8; the integrity pass found 9 (`PROGRAM-INTEGRITY.md:340-348`). Credit where due: the summary carries the corrected number, not its own register's stale one. |
| `:212` "`OE-012` … Thirteen dispatches unlogged" | Consistent with `OE-012` (rows 30-42). The integrity record said "at minimum nine"; 13 is the larger, self-adverse figure. **No flattery here.** |
| `:228` "**five** of my errors share one mechanism" | **Understates.** `PROGRAM-INTEGRITY.md:418-419` counts **six** (four disclosed + MISS-1 + `OE-007`'s stale count). Error runs *against* the author. Non-material; note only. |
| `:230` "**six** ad-hoc checks I improvised were faulty" | **Does not cleanly reproduce.** From the registers I can positively enumerate five: `OE-003`'s uninspected grep, `OE-006`'s always-fails `awk` pipe, `OE-006`'s wrong-cwd `sha256sum -c`, `OE-008`'s string-compared line numbers, `OE-011`'s silently-failed `bc`. A sixth is not identifiable in `registers/orchestrator-errors.md`. Either name the sixth or write five. Minor, but it is an orchestrator-authored count with no downstream re-deriver — precisely the class this run has already been caught on twice. |
| `:230` "every fixture-proven gate check behaved correctly on every run" | **Sound as stated**, and supported by `OE-008`'s own text. Note it coexists with criterion 3's `1b` being *unproven* — unproven is not misbehaving, so there is no contradiction. |
| `:116-119` U5 scope note ("`R12`…`R30`" absent; "6 prose ADRs" wrong; one then two) | **Reproduces** against `OE-002`. |

---

## Part 3 — honesty of the gate-status table

**Overall ruling: the table is candid and in several rows self-adverse beyond what the record
requires. It is not performing contrition — the pessimism is load-bearing, not decorative. But it
flatters in three specific, checkable places, one of them material.**

### What is honest, stated plainly so the ruling is two-sided

- **Criterion 3 `NOT PROVEN`** is a real self-inflicted red mark, and `:250-256` reproduces the
  integrity auditor's sharper objection in the auditor's own terms rather than the orchestrator's
  softer one: "an orchestrator-written ledger agreeing with orchestrator-written records is
  self-consistency, not corroboration" tracks `PROGRAM-INTEGRITY.md:145-147`.
- **`:258-262` volunteers two gate-design defects** that no criterion asked for, and `:260` names
  the orchestrator's own edit as "the existence proof". That is the opposite of flattery.
- **The three misses the auditor found in the disclosure (`PROGRAM-INTEGRITY.md:363-402`) are all
  now covered.** MISS-1 → `OE-011`; MISS-2 → `OE-012`; MISS-3 → `OE-013`. The minor `OE-007` stale
  count is also carried corrected at `:224`. **Checked one by one; nothing the auditor found about
  the disclosure is omitted.**
- **`:228-230`** volunteers the structural finding about the orchestrator role. Not required by any
  criterion.

### FLAG-1 (material) — criteria 5 and 8 rest on a citation register that is missing 16 of U5's 17 rows

`registers/citation-state-register.md` carries **exactly one** U5 row — `CIT-U5-B` at `:87`. But
`verification/V-U5.md:170-186` returned **seventeen** rows: `CIT-U5-A`, `CIT-U5-B`, `CIT-U5-C` …
`CIT-U5-P`, with `CIT-U5-G` appearing twice. Sixteen of them were never appended. The register's own
comment at `:188-190` states the intention and the condition:

> U5's remaining 16 citation rows are VERIFIED per V-U5 but are held pending the C-U5-001 landing,
> since that correction changes which verdict some of them support and a citation-state row is
> meaningless without a settled verdict to attach to. **They are appended after confirmation.**

`C-U5-001` landed and was confirmed (`LV-U5.md:11`) on 2026-07-21/22. **The rows were never
appended.** By the register's own header (`:14-17`), this is not cosmetic:

> Gate criterion 5 forbids either an UNVERIFIED or an UNVERIFIABLE citation beneath a Preserve or
> Revise verdict; **without a positively-recorded row here, that criterion names a state no artifact
> records and cannot be checked.**

So criterion 5's "**PASS, on the merits**" (`:242`) is proven for `CIT-U5-B` and **unchecked for the
other sixteen U5 citations**, and criterion 8's "Registers **complete** and orchestrator-owned"
(`:245`) asserts a completeness the register does not have. I verified this is U5-specific and not a
general reporting convention: U1's register rows (`:56-57`, two) match `V-U1.md:155-156` exactly, so
the register does carry every row a verifier returned for other units.

This is the **guard-that-cannot-fail shape one level out** — `1e` greps a register for a forbidden
pairing, and a row that is absent cannot match. Nothing in this run detected it: the integrity
pass's Area 4 checked `K-`, `C-`, `CFL-` and `SL-` ID density but not citation-register
completeness against verifier returns, and no gate check reconciles returned rows to written rows.

**Remedy route: `editorial` for the summary** (criterion 5 and criterion 8 must state the gap; on
the recorded evidence the honest reading is "PASS on the merits for `CIT-U5-B`; **not checkable** for
U5's remaining 16 citations, whose verifier-returned rows are absent from the register"). Appending
the 16 rows to the register is a **separate orchestrator act** on shared state and is not this
summary's fix — but until it happens, the summary must not print an unqualified PASS on 5 or an
unqualified "complete" on 8. I record this as the one finding in this review that I would call
material to the gate.

### FLAG-2 — criterion 3 claims "proven" for the logged rows; the auditor declined to grant that

`:255-256` states: "**proven** for the contemporaneously-logged audit/verify/landing passes,
**attested-but-late** for the landing confirmations." `PROGRAM-INTEGRITY.md:156-158` says the
opposite about the first half:

> Given that this ledger is the sole evidence for gate criterion 3 and it has already been wrong
> once, **criterion 3 should be treated as attested rather than proven, even for the rows that are
> logged.**

The summary's split ("proven / attested-but-late") is the formulation in
`registers/dispatch-ledger.md:85-88` — which is orchestrator-written — not the auditor's. The
auditor's reason is `OE-009`: the same ledger was already found to carry three shifted handles, and
the handles that shifted were rows 27-29, "**precisely the separation-bearing ones**". The summary
cites `OE-009`'s compounding effect nowhere in the criterion-3 paragraph, though `OE-012`'s register
entry does carry it. **This is an overstatement in the flattering direction on a criterion the
summary is otherwise commendably hard on.** Remedy: `editorial` — say "attested throughout; proven
nowhere", or state the auditor's ruling and the orchestrator's disagreement side by side.

### FLAG-3 — criterion 11's "2 areas sound, 2 unsound" drops the fifth area

`integrity/PROGRAM-INTEGRITY.md:15-21` records **five** areas, not four:

| Area | Auditor's finding |
|---|---|
| 1. Did corrections land? | **SOUND** |
| 2. Roles in separate hands? | **UNSOUND (NOT-PROVEN)** |
| 3. Do the gate checks check? | **UNSOUND** |
| 4. Shared state orchestrator-owned, IDs unique/dense? | **SOUND** |
| 5. Self-disclosure (`orchestrator-errors.md`) | **PARTIALLY SOUND** |

The area the summary's tally omits is **the one that judges the summary's own author's
disclosure**. The omission is almost certainly a rounding of a three-valued result into a
two-valued cell rather than a concealment — the substance of Area 5 is disclosed at `:206-230` and
its three misses are all closed. But "2 sound, 2 unsound" is not what the record says, and the
missing cell is the self-interested one. Remedy: `editorial` — "**2 sound · 2 unsound · 1 partially
sound** (self-disclosure; its three named misses now closed as `OE-011`–`OE-013`)".

### FLAG-4 (minor) — criterion 5 and `OE-013` never use the auditor's terminal word

The dispatch asks specifically whether the criterion-5 entry reflects that the orchestrator's edit
was judged "**EVADED, not satisfied**". **It does not.** `:242` reads "PASS, on the merits — after a
verifier overruled me", and `:220-221` reads "gate check `1e` stopped failing as a result. A fresh
verifier has since ruled; its ruling supersedes my edit." Both are true and neither is evasive about
the mechanism, but neither states that an independent auditor's terminal finding on the edit was
that the criterion had been **evaded**. That word is in `registers/orchestrator-errors.md:31`
(`OE-013`'s own "How it surfaced" cell) and in `integrity/PROGRAM-INTEGRITY.md:220-221` and
`verification/V-U5-citation-ruling.md:147-148`; the summary is the one artifact in the chain that
drops it.

**On the other half of the question, the summary is accurate.** I read
`verification/V-U5-citation-ruling.md` in full and the "on the merits" characterisation is correct
and correctly attributed: the ruling is by a fresh instance with no prior U5 involvement (`:3-9`), it
re-opened all four component sources first-hand (`:59-96`), and it rules at `:13` "`CIT-U5-B` =
`VERIFIED`, as now offered" with `:25-26` stating "Gate criterion 5 is satisfied on this row **on the
merits** … **not because the check was made to stop matching.**" The summary's `:242` wording tracks
the ruling's own words. The ruling also went *for* the orchestrator on the fact while going against
it on the process (`:162-166`), and the summary reports the process half at `:220-221` rather than
only the vindication. **This is honest reporting with one word missing.** Remedy: `editorial` — add
the auditor's finding to the `OE-013` bullet or the criterion-5 cell.

### FLAG-5 (minor, recorded not pressed) — criterion 9's PASS is unqualified

`:246` "Integrity manifests reconcile — **PASS** — only the two registers I own moved."
`PROGRAM-INTEGRITY.md:453-457` records that hash reconciliation was the one thing the auditor could
not check at all, resting on the orchestrator's own `sha256sum -c` — the same command `OE-006`
records failing twice before succeeding. I do **not** call this dishonest: the orchestrator ran it,
criterion 9 is orchestrator-checkable by design, and the auditor "neither confirms nor disputes it".
Recorded only so the gate reader knows criterion 9 has no second pair of eyes, exactly as criterion 8
is flagged `ATTESTED`. If anything, criterion 9 deserves the same `ATTESTED` marking criterion 8
already carries.

---

## Ruling: does "Program findings" stay on the process side of the line?

**Yes — item by item.** The section is `:185-202`. The permitted category is observations about how
the program ran; the forbidden one is integrating claims about the evidence.

| Item | Subject | Ruling |
|---|---|---|
| 1 (`:187-190`) | Yield of the mandatory-retrieval rule; three editor-catches-verifier instances | **Process.** Its objects are program roles and program records (a miscounted enumeration, an anchor range, an invented emphasis), not audited claims. Corroborated at `orchestrator-errors.md:39` (`AD-003`), `:43` (`AD-001`). |
| 2 (`:191-192`) | Four ellipsis/emphasis/paraphrase instances, each caught downstream | **Process.** All four (`AD-003`, `AD-004`, `AD-001`, the `V-U1` anchor imprecision) are defects in *verification and landing records*, not in audited documents. No audited claim is characterised. |
| 3 (`:193-195`) | A confirmation returning a report and writing no artifact | **Process.** `AD-002`. |
| 4 (`:196-199`) | Four editors killed; snapshot detects but cannot restore | **Process.** |
| 5 (`:200-202`) | Missing verdict-row preservation check | **Process**, and specifically about the gate's own design (`PROGRAM-INTEGRITY.md:207-214`). |

**No item in this section makes or aggregates a claim about the audited evidence.** The line the
dispatch drew is respected. I note in passing that items 1 and 2 count instances *across* units —
that is enumeration of program events, which is exactly the permitted form, and I rule it clean
rather than stretching bullet 1 to reach it.

---

## Corrections required

Every row is remedy route **`editorial`** — each is fixed from artifacts already in hand, by editing
`P2-gate-summary.md` alone. **No collection is required and no re-audit is required.** The one item
that may need a *dispatch* rather than an edit is called out in its own row.

| # | Locus in `P2-gate-summary.md` | Required correction | Route |
|---|---|---|---|
| GS-1 | `:25-26` | **BREACH of `must not` bullet 1.** Delete "That last figure is itself a result: **the Phase 1 evidence base was adequate.** The failures this audit found were in the *use* of evidence already held, not in its absence." — or reduce it to the tally it rests on. Also correct `:268-271`, whose "It does not integrate findings across units" is false while `:25-26` stands. | `editorial` |
| GS-2 | `:21`, `:22`, `:238` | Correction total is **26 raised and landed**, not 25. The summary's own per-unit list (`:33`, `:53`, `:74`, `:88`, `:107`, `:122`, `:143`, `:162`) sums to 26. `C-U5-003` is the uncounted one (`audit/U5-audit.md:177`; raised at `V-U5-citation-ruling.md:192`). | `editorial` |
| GS-3 | `:21`, `:238` | "raised, landed, and independently confirmed" / "25/25 landed and confirmed" is not true of `C-U5-003`: **no `LV-*` record carries a `LANDED` row for it** (grep of the whole run directory returns only the landing marker and `L-U5.md:14`). State 26 raised / 26 landed / **25 confirmed**, naming the exception. *Alternative remedy, and it is a different act:* dispatch a landing-confirmer for `C-U5-003` and then state 26/26/26. Orchestrator's choice; the editorial fix is available immediately. | `editorial` (or **new dispatch**) |
| GS-4 | `:242`, `:245` | **Material.** Criterion 5 must not print an unqualified PASS and criterion 8 must not print "complete": `registers/citation-state-register.md` holds **1 of the 17 citation rows `V-U5.md:170-186` returned**, so criterion 5 is unchecked for U5's other 16 citations and, by the register's own header at `:14-17`, "cannot be checked". Appending the rows is a separate orchestrator act on shared state. | `editorial` (summary); register append is a separate act |
| GS-5 | `:255-256` | Criterion 3's "**proven** for the contemporaneously-logged … passes" contradicts `PROGRAM-INTEGRITY.md:156-158` ("**attested rather than proven, even for the rows that are logged**", because `OE-009` already put wrong handles in the separation-bearing rows). Adopt the auditor's ruling or state both. | `editorial` |
| GS-6 | `:248` | Criterion 11 must read **2 sound · 2 unsound · 1 partially sound**. `PROGRAM-INTEGRITY.md:15-21` records five areas; the omitted fifth is Area 5, self-disclosure. | `editorial` |
| GS-7 | `:220-221` or `:242` | Add the integrity pass's terminal word on the `1e` edit — "**EVADED, not satisfied**" (`PROGRAM-INTEGRITY.md:220-221`; `orchestrator-errors.md:31`; `V-U5-citation-ruling.md:147-148`). The summary is the only artifact in the chain that omits it. | `editorial` |
| GS-8 | `:230` | "six ad-hoc checks I improvised were faulty" — only five are enumerable from `registers/orchestrator-errors.md` (`OE-003` grep; `OE-006` `awk` pipe; `OE-006` wrong-cwd `sha256sum -c`; `OE-008` string-compared line numbers; `OE-011` silent `bc`). Name the sixth or write five. | `editorial` |

## Non-material notes (not gated, no correction opened)

1. `:228` says "**five** of my errors share one mechanism"; `PROGRAM-INTEGRITY.md:418-419` counts
   **six**. The summary understates against itself. No action sought.
2. `:246` criterion 9 carries an unqualified PASS on a reconciliation no independent role could
   check (`PROGRAM-INTEGRITY.md:453-457`). Marking it `ATTESTED`, as criterion 8 already is, would be
   more consistent. Below the materiality bar; recorded only.
3. The two corrections returned by `V-U5-citation-ruling.md:191-192` were handled asymmetrically —
   `:192` became `C-U5-003`, `:191` was landed into the register with no ID. Consistent with G6; a
   one-clause note in the summary would close the reconciliation gap for a reader. Not a defect.
4. `:16-19` is the tightest permitted line in the document (see Part 1, negative ruling 1). Recorded
   so a later pass does not re-raise it as a breach, and so the ruling is on the record if it does.

## Register rows returned for the orchestrator to ID and reconcile

**Not appended by me.** I edited no register.

Proposed for `registers/orchestrator-errors.md`:

| Proposed | Artifact / locus | Finding |
|---|---|---|
| OE-next | `P2-gate-summary.md:21`, `:22`, `:238` | Correction total reported as 25; artifacts and the summary's own per-unit list give **26** (`C-U5-003` uncounted). One of the 26 (`C-U5-003`) is landed but carries **no landing-confirmation row in any `LV-*` record**, so "landed and independently confirmed" is not true of the full set. Same copied-forward-total class as `OE-011`, in the artifact written after `OE-011` was disclosed. |
| OE-next | `registers/citation-state-register.md` vs `verification/V-U5.md:170-186` | **16 of U5's 17 verifier-returned citation-state rows were never appended** to the register, though `:188-190` committed to appending them "after confirmation" and confirmation occurred. Gate criterion 5 is therefore unchecked for those 16 citations, per the register's own header at `:14-17`. Undetected by the gate (no check reconciles returned rows against written rows) and by the program-integrity pass (Area 4 checked ID density, not completeness). |
| OE-next (minor) | `P2-gate-summary.md:230` | "six ad-hoc checks I improvised were faulty" — five are enumerable from the error register; a sixth is not identifiable. |

Proposed as a check-integrity note (no register named for it):

| Locus | Finding |
|---|---|
| `run-p2-gate-checks.sh` / `registers/citation-state-register.md` | No check reconciles the citation-state rows a verifier **returned** against the rows the orchestrator **wrote**. An omitted row cannot match `1e`'s forbidden pairing, so omission silently converts a checkable criterion into an unchecked one — the guard-that-cannot-fail shape, one level out from the cell-2 vocabulary defect already recorded. |

No conflict-register or source-lead-register rows are returned by this pass.

---

## Confirmation of my own deliverable

This file was written to
`journal/raw/_inbox/foundation-audit-p2/verification/V-gate-summary-review.md` and **re-read from
disk with `Read` after writing, before returning**. It is the only file this pass wrote. Nothing
else — no audit record, no verification record, no landing record, no register, no product file,
and not `P2-gate-summary.md` itself — was modified.
