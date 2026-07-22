# Program-integrity record — run `foundation-audit-p2`

> Role: program-integrity auditor. I audit **process**, not evidence. No Bash, no web retrieval, no
> `Edit`. I opened **no cited source** and author **no verdict** on any audited claim. Written
> 2026-07-22. Baseline per `RUN-MANIFEST.md`: `04ad04c`.
>
> Everything below was checked by opening the named artifact at the named locus. Where a question
> could only be settled by opening a source, or by running a command, it is marked
> `OUT-OF-ROLE` / `cannot establish from process records` and left there.

---

## Summary of terminal states

| Area | Finding |
|---|---|
| 1. Did corrections land? | **SOUND** — all 25 present in their target artifacts, marked and independently confirmed |
| 2. Roles in separate hands? | **UNSOUND (NOT-PROVEN)** — the A/V/L layer is proven; the entire LV (landing-confirmer) layer is **unlogged** |
| 3. Do the gate checks check? | **UNSOUND** — check `1b` never demonstrated to FAIL; check `1e` cleared by an orchestrator edit to the artifact it reads; `1c` unimplemented |
| 4. Shared state orchestrator-owned, IDs unique/dense? | **SOUND** |
| 5. Self-disclosure (`orchestrator-errors.md`) | **PARTIALLY SOUND** — unusually complete and self-adverse, but **misses at least three** process failures visible in the artifacts |

---

## Area 1 — Did every material correction land in the artifact it targets?

**Finding: SOUND.**

This is the defect the program exists to prevent, and on this run it did not recur.

**Loci checked.**

1. *Raised set, enumerated from the verification records.* `verification/V-U1.md` … `V-U8.md` raise
   `C-U1-001..003`, `C-U2-001..002`, `C-U3-001..005`, `C-U4-001..004`, `C-U5-001..002`,
   `C-U6-001..002`, `C-U7-001..003`, `C-U8-001..004` = **25**, dense per unit, no gaps, no
   duplicates.
2. *Presence in the target artifact.* A grep for `LANDED C-U<n>-NNN` over `audit/U1-audit.md` …
   `audit/U8-audit.md` returns **all 25 correction IDs**, at 36 marker sites (several corrections
   land at more than one anchor: e.g. `C-U3-005` at `U3-audit.md:75, :80, :128, :151`). **No
   correction is present only in a verification or landing record.**
3. *Substance, not just marker — spot-checked at four loci where the substance is independently
   checkable inside the artifacts:*
   - `audit/U6-audit.md:54-55` — the defective internal count is **actually rewritten** to
     "Preserve 6, Relabel 2, Revise 1 … (9 rows)", and the table at `:44-52` independently
     enumerates 6 Preserve. `C-U6-002` landed in substance.
   - `audit/U4-audit.md:159-162` — `C-U4-004` landed **with `AD-001`'s repair applied**: the text
     reads "The 13 requirements listed above" and the marker states the verifier's count of 14 was
     corrected to 13 because `ALR-022` has a row at `K-U4-013`. The editor landed the *corrected*
     figure, not the verifier's figure.
   - `audit/U3-audit.md:9-20` — the false "corrections landed" header written by the killed editor
     (ledger #18) is **corrected in-record and not erased**; the replacement is dated 2026-07-22 and
     the five markers now exist. The specific defect flagged in `RESUME-STATE.md:30-40` is closed at
     the artifact.
   - `audit/U5-audit.md:92-93` — `C-U5-001`'s verdict withdrawal is present in the row itself:
     `K-U5-002` now reads `Preserve`, the withdrawn `Revise` basis is retained struck-through rather
     than deleted, and the marker names the verifier's adjudicated authority as the source of the
     verdict change. The one pre-authorised verdict adjustment did not become a licence for others.
4. *Independent confirmation.* Each of the 25 carries a `| LANDED` row in a `verification/LV-U<n>.md`
   record (`LV-U1.md:15-17`, `LV-U2.md:14-15`, `LV-U3.md:14-18`, `LV-U4.md:13-16`, `LV-U5.md:11-12`,
   `LV-U6.md:8-9`, `LV-U7.md:15-17`, `LV-U8.md:12-15`), plus `C-U7-001-adj` in
   `LV-U7-adjudication.md:16`. **Zero `NOT-LANDED`, zero `ALTERED` anywhere.**
5. *Verdict-row preservation* (the invariant added after `OE-005`, which the designed gate does not
   contain): parsing verdict rows per unit are **U1 18 · U2 11 · U3 13 · U4 18 · U5 17 · U6 9 ·
   U7 9 · U8 7**, matching the pinned pre-landing counts exactly. `U4`'s `OE-005` damage is repaired
   — `K-U4-002` and `K-U4-008` parse again. No marker sits inside a table **row** anywhere in
   `audit/`.

**Caveat, stated rather than absorbed.** What I can establish is that the corrected text is present
at the anchor. Whether a landed correction says something *true about a cited source* is
`OUT-OF-ROLE — needs a verifier`. Three landings turn on source content in ways I did not and cannot
adjudicate: `C-U8-001` (see `AD-003`, invented bold emphasis inside a quotation), `C-U4-004`'s
requirement re-enumeration, and `C-U5-001`'s claim about what the source affirms.

---

## Area 2 — Were the roles kept in separate hands?

**Finding: UNSOUND — NOT-PROVEN for the landing-confirmation layer.** By the ledger's own rule,
stated at `registers/dispatch-ledger.md:6-8`, "unlogged ⇒ unproven ⇒ fail."

**Locus: `registers/dispatch-ledger.md`, rows 1–29, which is the ledger in its entirety.**

**2a. What IS proven.** For all eight units, the `V` handle differs from the `A` handle, and every
`L` handle differs from that unit's `V` handle, all logged:

| Unit | A | V | L handle(s), incl. killed | A≠V | L≠V |
|---|---|---|---|---|---|
| U1 | #3 `ac8d…10f` | #9 `abb6…4c2` | #23 `a981…32a` | yes | yes |
| U2 | #4 `a6ac…ca3` | #6 `aa60…82d` | #24 `a909…60b` | yes | yes |
| U3 | #5 `ad01…898` | #7 `ae4d…117` | #18 `aa4f…e99`, #22 `a471…b17` | yes | yes |
| U4 | #1 `a7c1…52f` | #2 `ab9b…6bc` | #17 `a949…235`, #21 `a8d2…93e` | yes | yes |
| U5 | #10 `aa8b…e39` | #14 `a7e4…fd8` | #19 `a5f4…596`, #26 `ae2f…501` | yes | yes |
| U6 | #8 `a608…bc2` | #13 `a103…890` | #25 `a177…6a7` | yes | yes |
| U7 | #11 `a7f3…65f` | #15 `a734…bba` | #27 `ac98…5ce` | yes | yes |
| U8 | #12 `aa1e…1cc` | #16 `ab3d…8b3` | #20 `a507…450`, #28 `a7f0…5a4` | yes | yes |

All 29 logged handles are pairwise distinct. Produce-vs-verify is additionally type-enforced
(`audit-examiner` vs `audit-verifier`). The four editors killed mid-flight (#17–#20) are correctly
carried as handles that touched their units, per the ledger's own instruction at `:71-73`. **That
part of the design worked and should be recorded as working.**

**2b. What is NOT proven — the gap.** The ledger **ends at row 29**, whose outcome is `VOID`. It
contains:

- **no row for any of the eight landing confirmations** that produced `verification/LV-U1.md` …
  `LV-U8.md` (including the LV-U2 re-dispatch to a fresh instance);
- **no row for the U7 adjudicating verifier** (`V-U7-adjudication.md`, which self-describes as
  "fourth instance") **or its confirmer** (`LV-U7-adjudication.md`, "fifth instance");
- **no rows for the L-U1/U3/U4/U5/U8 completions**, which are reported only in a free-text comment
  at `:63-73` — a comment which is itself stale, reading "**16 of 25 corrections landed**".

`registers/orchestrator-errors.md:27` (`OE-010`) refers to "**dispatch #38**". So the orchestrator's
own numbering reached at least 38 while the ledger records 29: **at minimum nine dispatches are
unlogged, and they are precisely the dispatches on which the LV separation constraint turns** — the
constraint the ledger at `:96-98` calls "still fully open."

**2c. What is partially recoverable, and why that is not a substitute.** Three LV handles survive in
prose written *elsewhere*: `aa67160a022372d66` (LV-U7, `registers/conflict-register.md:23`),
`a215c96ebed5ad39e` (LV-U2, `orchestrator-errors.md:37`), `adcbd051512cd4615` (LV-U5,
`citation-state-register.md:100`). Each is distinct from its unit's `A`, `V` and every `L` handle.
So for **U2, U5, U7** separation can be reconstructed. For **U1, U3, U4, U6, U8** — and for both
adjudication instances — **no handle appears anywhere in the run directory**, and the LV records do
not carry their own handles (I grepped all of `verification/` for a handle token: none present).
Their separation rests only on **first-person self-attestation** in the record headers
(`LV-U1.md:3`, `LV-U3.md`, `LV-U4.md:3`, `LV-U6.md:1`, `LV-U8.md:3`, `LV-U7-adjudication.md:3`,
each declaring "third instance … I did not raise / did not land"). That is evidence, and it is not
nothing — but the program itself declared the ledger the **sole** admissible evidence for this
criterion, and self-attestation is exactly what that rule exists to refuse.

**Terminal state: role separation for the LV layer is `NOT-PROVEN` on five of eight units and on
both adjudication instances.** What would settle it: the dispatch/return log for dispatches 30–38+,
which is outside my capability boundary.

**2d. Is the `OE-009` handle correction trustworthy? — adversarial assessment.**

The disclosure is honest about the stakes (`orchestrator-errors.md:25`: "a ledger with shifted
handles would have *proven* separation from wrong data"). On the substance:

- **The detection mechanism is real and independent of intent.** The shift surfaced because a
  completion notification logged as *the U2 confirmer* returned *a U7 landing report* — a
  role/content mismatch, not a judgement call. That mechanism works.
- **The correction cannot be corroborated from the artifacts.** I cross-checked all nine handles
  that appear in a second artifact (`conflict-register.md:15,17,19,21,23`;
  `citation-state-register.md:134,159`; `orchestrator-errors.md:12,17,33,37,39`) against their
  ledger rows: **all nine agree.** But every one of those artifacts is *also orchestrator-written*.
  Consistent transcription of a shifted handle would look identical. This is a self-consistency
  check, **not independent corroboration**, and I decline to present it as one.
- **The corrected rows are the load-bearing ones.** Rows 27–29 are L-U7, L-U8 and the LV-U2
  confirmer — i.e. the error landed exactly on the rows that carry U7's and U8's editor-separation
  claims. The claim "every handle in rows 1–29 has now been re-checked" is unfalsifiable from the
  artifacts: completion notifications are not recorded anywhere.

**What I can state:** the ledger is now internally consistent, the error class was self-detected by
a mechanism that does not depend on the erring party's care, and the disclosure is candid.
**What I cannot establish from process records:** that the corrected handles match the actual agent
instances. Only the raw dispatch/return transcript settles that. Given that this ledger is the sole
evidence for gate criterion 3 and it has already been wrong once, **criterion 3 should be treated as
attested rather than proven, even for the rows that are logged.**

---

## Area 3 — Do the gate checks positively enumerate, and can they fail?

**Finding: UNSOUND**, on three distinct counts. Loci: `scripts/fixtures/research-gate-p2/run-p2-gate-checks.sh`,
`scripts/fixtures/research-gate-p2/DEMO.md`, and `registers/citation-state-register.md:87-127`.

**3a. Enumeration shape, per check (read from the script, lines 38–113).**

| Check | Shape | Fails on empty input? | Demonstrated FAIL? |
|---|---|---|---|
| `1-pre` | **Positive** — asserts each `audit/U<n>-audit.md`, `verification/V-U<n>.md` and the register is non-empty, over a literal unit list | **YES** (`empty` fixture) | yes |
| `1-pre-b` | **Positive** — asserts ≥1 parsing verdict row per unit | **YES** | yes (`verdict-legend`) |
| `1a` | **Positive** — set-difference of raised `C-` IDs against `LANDED` `C-` IDs | no (both sides empty) | yes (`violating`) |
| `1b` | **Absence-of-failure-token** — greps for `NOT-LANDED`/`ALTERED` | no | **NO — never demonstrated** |
| `1d` | **Positive** — `comm -23` of Remove/Replace rows against `DEFECT-REAL` answers | no (empty expected set) | yes (`unanswered-remove`) |
| `1e` | **Absence-of-failure-token** — greps for `(Preserve\|Revise)` beside `UNVERIFIED\|UNVERIFIABLE` | no | yes (`citation-unverifiable`) |

Two findings follow.

**3b. `1b` is an unproven check.** `DEMO.md:5-7` states the standard itself: "each check must be
shown to produce its stated verdict on a real fixture … A check whose verdict was never observed is
asserted, not proven." In the proven matrix (`DEMO.md:39-48`) and the raw output (`:55-150`), **`1b`
prints `pass` on all eight fixtures and is the attributed cause of no failure.** The `retry`
fixture contains a `NOT-LANDED` — but in a *superseded* `LV-U1-r1.md`, so `1b` correctly ignores it
and passes. **There is no fixture on which `1b` has ever been observed to fail.** Its `FAIL` branch
is untested code guarding the single condition (a correction resting in a failed landing verdict)
that this program's founding defect would produce. By the program's own D7 standard this is
`UNPROVEN`, and I report it as such regardless of how correct it reads. *(Mitigating, and stated:
`1b`'s condition is currently empty — zero `NOT-LANDED`/`ALTERED` exist in the run — so nothing was
missed. The check is unproven, not shown wrong.)*

**3c. Four of six checks pass on an empty directory.** The `empty` fixture output (`DEMO.md:57-67`)
shows `1a`, `1b`, `1d`, `1e` all printing `pass` against no records at all. The composite gate does
fail, and it fails for the right reason (`1-pre`, `1-pre-b`), and the DEMO discloses this in its
"Attributed check" column rather than hiding it. So the founding scar — "an empty directory
certified clean" — **is closed at the composite level and open at the individual-check level.** The
non-vacuity of `1a`/`1b`/`1e` depends entirely on `1-pre` asserting the records exist, over a
**hardcoded literal unit list**. That coupling is real, undocumented as a dependency, and worth
recording: change the unit list and three checks silently become vacuous.

**3d. `1c` is not implemented and not demonstrated.** Honestly scoped out at `run-p2-gate-checks.sh:18-21`
and `DEMO.md:21-23` ("no expressible input in a static fixture"). That is compliance, not a
violation, and I record it as such. **But** it means gate criterion 3 has *neither* a mechanised
check *nor* complete evidence (Area 2), and those two gaps compound: the criterion most exposed to
dispatch discipline is the one with no automation and an incomplete ledger.

**3e. The row-count-preservation check was never built.** `RESUME-STATE.md:72-79` lists it as
**"Required before resuming any landing"** — "for each unit, the count of parsing verdict rows after
landing must equal the count before it." It does not exist in `run-p2-gate-checks.sh` and is not in
`DEMO.md`'s matrix. It survived only as an editor-brief instruction plus the orchestrator's manual
re-count. **I ran the equivalent enumeration myself and the invariant holds** (Area 1, item 5) — so
there is no damage. But a remedy declared mandatory after `OE-005` shipped as a habit rather than as
a check, and `OE-007`'s own lesson ("I fixed the reported instance instead of naming the property to
enforce") applies to it.

---

### 3f. The `1e` register edit — adversarial judgement

**Finding: the criterion was EVADED, not satisfied. `1e`'s green state on this row is not
trustworthy.**

I have read `registers/citation-state-register.md:89-127` in full and judged it against the other
artifacts. The note is candid, self-adverse, and correct on several points. It is also, on the
decisive point, **contradicted by the run's own records.**

**What is genuinely to the orchestrator's credit, and I will not deduct for it:**
- **The state cell did not change.** It still reads `UNVERIFIED` (`:87`). Nothing here claims a
  verification that did not happen. This is the honest half and it is the half that mattered most.
- The edit is **disclosed in place**, with the superseded reasoning retained verbatim (`:129-144`)
  rather than tidied, and the note explicitly invites this audit to examine it (`:120`).
- The run **held the check red on purpose** for a full day rather than writing `VERIFIED`
  (`RESUME-STATE.md:104-109`). That is real discipline and it is the reason there is anything
  honest to weigh here at all.

**Why it nonetheless fails.**

1. **The asserted fact is contradicted by the artifact.** Cell 2 now reads "(supports no surviving
   verdict — see note)". But `verification/LV-U5.md:159` — the confirming verifier, first-hand —
   states: "**The `K-U5-002` row's Citation cell still opens `CIT-U5-B`**". `audit/U5-audit.md:92`
   shows `K-U5-002` surviving as a `Preserve`, and its Citation cell does open `CIT-U5-B`. So there
   *is* a surviving verdict and it *does* cite this citation. What the withdrawal removed is the
   **disputed use**, not the citation's attachment to a verdict. Cell 2's new text is therefore not
   a correction of a false cell to a true one; it is a substitution of a different, contestable
   proposition — and the contestable part is exactly what makes the grep stop matching.

2. **The orchestrator performed the clearance that the confirming verifier said only a verifier
   could perform.** `LV-U5.md:161-173`, under the heading "**Who may clear it**", rules: not the
   editor, and "**Not me — I judge, I do not repair**"; "**The reassignment needs a verifier ruling
   on whether `CIT-U5-B` is `VERIFIED` as now offered** (for a residual `Preserve` recording
   drift), and **the material for that ruling is entirely in hand**." LV-U5 routed this to the
   orchestrator as an "open state-reconciliation item." The available remedy was one more verifier
   dispatch, with the material pre-assembled — the same remedy the run took without hesitation for
   the U7 under-determination (`V-U7-adjudication.md`) and for the voided LV-U2. **Here it was not
   taken.** The orchestrator resolved, by editing the register it owns, the one question its own
   confirmer had reserved to a verifier. The note's defence — "three separate agents put the
   withdrawal on the record before I touched this row" — is true about the *verdict withdrawal* and
   does not reach the *state reconciliation*, which is the thing the edit actually accomplished.

3. **The criterion is satisfied only by re-describing the row, not by resolving it.** Criterion 5
   forbids an `UNVERIFIED` citation beneath a `Preserve` or `Revise`. Post-edit, the row is beneath
   no verdict word — because the verdict word was removed from the cell. On the register's own
   declared semantics (`:6-17`: column 2 is "`<verdict it supports>`", read **positionally** by
   `1e`), the citation does still support `K-U5-002`'s `Preserve`. The check now passes because
   cell 2 holds prose.

4. **The edit demonstrates a general disarming mechanism, and it is untested.** `1e` matches only
   when cell 2 contains a verdict word. Cell 2 has no enforced enum — nothing checks it, unlike the
   state cell whose three legal spellings are declared at `:11-12`. **Any free text in cell 2
   disarms `1e` for that row**, permanently and silently. No `DEMO.md` fixture exercises a non-enum
   cell 2, so this configuration was never demonstrated. The only thing separating this instance
   from an undetectable evasion is the orchestrator's own disclosure — which is precisely the
   dependency a self-owned register was supposed not to have.

5. **Disclosed residue is still a defect in the deliverable.** `audit/U5-audit.md:136` still records
   `CIT-U5-B … VERIFIED` — examiner-assigned, explicitly **not upheld** by V-U5 (`V-U5.md:171`
   assigns `UNVERIFIED`), and left unedited on the correct principle that an editor may not write a
   verifier's state. The disclosure at `:122-126` is exactly right that this is real and reported
   rather than tidied. It remains true that the **promoted artifact carries a citation state no
   verifier assigned and one verifier contradicted**, while the register that `1e` reads carries a
   third description. Three artifacts, three different accounts of one citation.

**On whether `CIT-U5-B` in fact supports the residual `Preserve`:** that turns on what the source
says and what use the surviving row makes of it. `OUT-OF-ROLE — needs a verifier.` I judge only
that the register cell asserts something the audit record and the landing-confirmation record
contradict, and that the party asserting it is the party the check constrains.

---

## Area 4 — Did shared state stay orchestrator-owned, with unique, densely-assigned IDs?

**Finding: SOUND.**

**Loci: `registers/citation-state-register.md`, `conflict-register.md`, `source-lead-register.md`,
`dispatch-ledger.md`, and the eight `audit/U*-audit.md` verdict tables.**

- **`K-U<n>-NNN` IDs:** 102 rows across eight records, each unit numbered `001`…`N` **contiguously
  with no gaps and no duplicates** (U1 001–018, U2 001–011, U3 001–013, U4 001–018, U5 001–017,
  U6 001–009, U7 001–009, U8 001–007). Phase 1's concurrent-append duplicate-ID failure did **not**
  recur.
- **`C-U<n>-NNN` IDs:** 25, dense per unit, no duplicates.
- **`CFL-001`…`CFL-007`** and **`SL-001`**: dense, unique, orchestrator-assigned; each row names the
  proposing agent handle and, where applicable, the independently confirming handle
  (`conflict-register.md:15,17,19,21,23`). Agents proposed unit-local labels (`CONF-U2-A`,
  `CONF-U2-B`) and the orchestrator assigned the register IDs — the designed discipline, visible in
  the artifact.
- **No agent wrote a register.** The editors state so affirmatively and specifically:
  `L-U7.md:34-35` ("**No shared register written** … `registers/` was not touched"),
  `L-U7.md:60`, `L-U5.md:7`, `L-U5.md:53-54` ("the register was not edited by this pass"),
  `L-U2.md:28`, `L-U3.md:47`. `LV-U5.md:168` records the confirmer likewise declining. The strongest
  evidence is behavioural: **L-U5 had a direct incentive to clear `CIT-U5-B` and explicitly refused**,
  routing it upward instead. That is the boundary holding under pressure.
- **The citation register's provenance discipline held where it mattered:** `:158-168` records that
  U4's rows were written from the **verifier's** returned rows, not the examiner's proposal — and
  that had the examiner's proposal been taken, an unretrieved citation (`DUO-002`) would have
  entered shared state marked `VERIFIED`.

*Caveat within the sound finding:* attestation that a register was not written by an agent is
negative evidence from the agents themselves plus the orchestrator's own record. Confirming it
absolutely needs file-history inspection, which is outside my capability boundary. **Cannot fully
establish from process records**; nothing in the artifacts contradicts it.

---

## Area 5 — The orchestrator's self-disclosure

**Finding: PARTIALLY SOUND. Unusually complete and genuinely self-adverse — and incomplete in three
specific, checkable ways.**

**Locus: `registers/orchestrator-errors.md` (10 `OE-` entries, 4 `AD-` entries).**

**5a. What holds up.** I spot-checked the "no effect" claims that are checkable inside the
artifacts:

- `OE-005` — "contained at 2 rows": **verified closed.** `K-U4-002`/`K-U4-008` parse again; U4 is
  back to 18 rows. The claim that no other unit was struck holds — no marker sits inside a table row
  anywhere in `audit/`.
- `OE-007` — "no effect on the gate": **verified, with one stale figure.** I enumerated marker
  positions against verdict-row positions independently. Markers that interrupt a table mid-run:
  U1×1 (`:155`, between `K-U1-016` at `:154` and `K-U1-017` at `:156`), U3×5 (`:75, :76, :79, :80,
  :88`), U4×2 (`:49, :56`) — matching the disclosure — **plus U5×1 (`:93`, between `K-U5-002` at
  `:92` and `K-U5-003` at `:94`), which the disclosure does not count.** The true current total is
  **9, not 8**: `OE-007` was written when only U1–U4 had landed and was not re-derived after U5
  landed. U7 and U8 add none. The load-bearing claim — no effect on row counts or the gate — is
  **correct** (Area 1, item 5). The proportionality decision not to repair is recorded rather than
  presented as unnecessary, which is **compliance**. The stale count is minor in effect and is
  itself another instance of the pattern in 5c: a figure carried forward without re-derivation after
  the state changed.
- `OE-004` — the disclosure *corrects its own earlier entry in place* rather than rewriting it, and
  the underlying defect is landed as `C-U6-002` (verified at `audit/U6-audit.md:54-55`).
- `AD-001` — "the audit record is correct; the verification record carries the error": consistent
  with what landed (`U4-audit.md:162`). The `V-U4.md` count of 14 was **not** silently corrected —
  correct, since no role has write scope there.
- `OE-002`'s scope resolution is disclosed as a **defect in the approved plan**, not in an agent —
  and the skipped prose-ADR scope is justified on the plan's own non-scope rule. **Recorded as
  compliance, not violation.**

The register logs errors that cost nothing (`OE-001`, `OE-003`, `OE-006`, `OE-008`) and states
plainly that "it did no harm" is a finding about the error, not a reason to omit it (`:8`). Three of
the four `AD-` entries record an agent catching a **defect in the orchestrator's or a verifier's own
work**. This is a substantially better disclosure than the phase it is auditing.

**5b. What the disclosure MISSES.** Three process failures are visible in the artifacts and appear
nowhere in the register.

- **MISS-1 — the run's headline count is wrong, in three places, and undisclosed.**
  `dispatch-ledger.md:107-109` states, emphatically "mechanically tallied by the orchestrator from
  the records, not from agent summaries": "**U1 18 · U2 11 · U3 13 · U4 18 · U5 17 · U6 9 · U7 9 ·
  U8 7 = 104 claims assessed.** Verdicts: **Preserve 71 · Relabel 24 · Revise 9** · Replace 0 ·
  Remove 0."
  That per-unit list **sums to 102, not 104.** My own enumeration of the records:
  **102 verdict rows total — Preserve 71, Relabel 24, Revise 7, Replace 0, Remove 0.**
  Every *per-unit* count is right; the *total* is inflated by 2 and `Revise` is overstated by 2.
  (Pre-landing, `Revise` would have been 8, since `C-U5-001` turned `K-U5-002` from `Revise` to
  `Preserve` — so 9 was never right either.) The same wrong total is repeated at
  `RESUME-STATE.md:78` ("total **104**") and inside `OE-005` itself ("= 104").
  This matters beyond arithmetic: **`OE-004` is an entry about a miscounted verdict distribution,
  in which the orchestrator's corrective claim is that it tallies mechanically rather than trusting
  summaries.** The program-level tally it produced by that method is wrong in the same direction,
  and no downstream role re-counted it — the gate has no total-reconciliation check. `104` is the
  figure a gate summary and a promoted archive would carry forward.
  *Bounding this honestly: the zero-`Remove`/zero-`Replace` claim, on which gate step `1d`'s vacuous
  pass rests, is **correct** — I enumerated it independently. The error is in the total and in the
  `Revise` count only.*

- **MISS-2 — the dispatch ledger was abandoned at row 29 while dispatching continued.** Area 2.
  Nine-plus dispatches, including **every landing confirmation**, went unlogged in the artifact the
  ledger's own header calls "the ONLY record from which role separation can be checked". The
  register discloses `OE-009` (three handles *misassigned*) but not the larger fact that the ledger
  *stopped*. `OE-009`'s own reasoning — that a defective ledger lets step 1c "prove separation from
  wrong data" — applies with more force to an absent one: a missing row cannot even be checked.
  The ledger's landing-results comment (`:63-73`) is also stale at "**16 of 25 corrections landed**"
  when 25 landed.

- **MISS-3 — the `1e` clearance is disclosed in the citation register but not logged as an
  orchestrator action in the error register.** `orchestrator-errors.md` ends at `OE-010` and
  contains no entry for the 2026-07-22 `CIT-U5-B` edit. The long note at
  `citation-state-register.md:89-127` is a good-faith disclosure and I credit it — but it lives in
  the artifact it justifies, not in the register a gate summary reads for orchestrator conduct.
  Per Area 3f I judge that edit to be a criterion evasion; at minimum it is an orchestrator action
  on shared state, taken in place of a verifier ruling the confirming role reserved, and it belongs
  in the error register.

**5c. The asserted structural pattern.** The orchestrator claims at `OE-010` that its transcription
errors share one root cause — copying a fact without reopening the source — and that "the
mandatory-retrieval rule binds every agent role. It does not bind the orchestrator, and it shows."

**The artifacts support this, and MISS-1 strengthens it beyond what the register claims.**
`OE-001` (two paths copied, both wrong), `OE-003` (a grep's matches never inspected),
`OE-009` (handles transcribed by position without re-checking), `OE-010` (a cross-reference
mislocated by one file) are four instances of one mechanism. `OE-006` and `OE-008` are a second,
adjacent family the register also names: **three self-written checks never tested against a case
whose answer was known** — an always-fails `awk` pipe, a wrong-cwd `sha256sum -c`, and a
string-compare of line numbers. `OE-008` states the asymmetry itself: "the *designed* gate checks
were fixture-proven and have behaved correctly every time; every faulty check this run has been one
I improvised at the keyboard."

MISS-1 is a **fifth** instance of the first family — a figure carried forward into three artifacts
without re-derivation — and `OE-007`'s stale interleave count (5a) is a sixth. Both are the ones
that were **not** caught, because they are the ones no agent was positioned downstream of. Every
disclosed instance was caught by an agent reading downstream (`OE-003` by the A-U6 examiner,
`OE-004` by V-U6, `OE-010` by the adjudicator, `AD-001`/`AD-003` by landing editors, `AD-004` by the
LV-U2 confirmer). **The pattern is therefore sharper than stated: the orchestrator's errors are
caught exactly when a downstream role reads the artifact carrying them, and are missed exactly when
none does.** Orchestrator-authored totals, the dispatch ledger, and the registers have no downstream
reader in this design — and that is where all three misses in 5b sit. I record this as a supported
structural finding about *this run's* records. Whether it generalises is not mine to declare.

**5d. The voided landing confirmation (`AD-002`, ledger row 29).** **Handled correctly, and this
should be stated plainly.** The orchestrator verified the artifact's existence rather than adopting
a convincing return, found `verification/LV-U2.md` absent, recorded the pass **VOID**, and
re-dispatched to a fresh third instance. It declined to claim whether the `Write` failed or was
never issued ("I cannot determine and do not claim") — correct restraint. The re-run produced a real
`LV-U2.md`, which confirmed both corrections `LANDED` **and independently found `AD-004`**, a defect
the voided pass had not reported. The one residue: **row 29 is where the ledger stops**, so the
re-dispatch itself is unlogged (MISS-2).

---

## Items returned as `OUT-OF-ROLE — needs a verifier`

1. Whether `CIT-U5-B` verifies **as now offered** — i.e. whether it supports the residual `Preserve`
   at `K-U5-002` in its drift-recording use. `LV-U5.md:169-172` states the material is in hand and
   that a verifier ruling is what is required. This is the open item the register edit stood in for.
2. Whether the substance of any landed correction is true of its source — specifically `C-U8-001`
   (the `AD-003` emphasis question), `C-U4-004`'s requirement enumeration, and `C-U5-001`'s claim
   about what the audited source affirms.
3. Whether `V-U4.md`'s uncorrected count of 14 (`AD-001`) leaves any *other* figure in that record
   wrong. No role has write scope there; I only note the record still carries the error.

## Items I could not check at all (capability boundary, not a finding)

- **Hash reconciliation.** `INTEGRITY-MANIFEST-pre.md` / `-post.md` cannot be recomputed without
  Bash. The ALTERED/UNCHANGED reconciliation rests on the orchestrator's run of `sha256sum -c` —
  and `OE-006` records two failed attempts at exactly that command before the third succeeded. I
  neither confirm nor dispute it. What I *did* check independently is the semantic invariant the
  hashes cannot express: verdict-row preservation, which holds (Area 1, item 5).
- **Working-tree cleanliness / no product file touched** (gate criterion 7). Asserted at
  `RESUME-STATE.md:16-17` from `git status --porcelain`. No Bash; not independently checked.

## Register rows returned for the orchestrator to ID and reconcile

Not appended by me. Proposed for `registers/orchestrator-errors.md`:

| Proposed | Artifact / locus | Finding |
|---|---|---|
| OE-next | `dispatch-ledger.md:107-109`; `RESUME-STATE.md:78`; `OE-005` | Program totals wrong: per-unit list sums to **102**, recorded as **104**; actual distribution **Preserve 71 / Relabel 24 / Revise 7**, recorded as `Revise 9`. Zero Remove/Replace confirmed correct. Fifth instance of the copied-forward-figure class; uncaught because no downstream role re-counts. |
| OE-next | `dispatch-ledger.md`, rows 30+ absent | Ledger abandoned at row 29 while dispatching continued to at least #38 (per `OE-010`). All eight landing confirmations and both adjudication instances unlogged; LV separation `NOT-PROVEN` on U1, U3, U4, U6, U8. Landing-results comment stale at "16 of 25". |
| OE-next | `citation-state-register.md:87` | Orchestrator edited cell 2 of `CIT-U5-B`, clearing failing gate check `1e`, in place of the verifier ruling `LV-U5.md:161-173` reserved for that reconciliation. Disclosed in the register; not logged as an orchestrator action. |
| OE-next (minor) | `orchestrator-errors.md:22` (`OE-007`) | Interleaved-marker count stale: disclosed as 8 (U1×1, U3×5, U4×2); actual current count is 9 — `audit/U5-audit.md:93` added by a later landing and not re-derived. No effect on row counts or the gate. |

Proposed as check-integrity notes (no register named for them):

| Locus | Finding |
|---|---|
| `DEMO.md:39-48`; `run-p2-gate-checks.sh:80-88` | Gate check `1b` has no fixture on which it has been observed to FAIL. `UNPROVEN` by the program's own D7 standard. |
| `RESUME-STATE.md:72-79` vs `run-p2-gate-checks.sh` | The row-count-preservation check declared "required before resuming any landing" was never implemented. Invariant independently verified to hold; the check does not exist. |
| `citation-state-register.md`, column 2 | No enum enforced on the "verdict supported" cell; free text in it silently disarms `1e` for that row. No fixture covers this. |

---

*Written by the program-integrity auditor. No source was opened; no audited claim was adjudicated;
no artifact outside `integrity/` was written or edited.*
