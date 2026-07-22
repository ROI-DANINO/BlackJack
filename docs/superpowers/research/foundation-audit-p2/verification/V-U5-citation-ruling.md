# Verification — `CIT-U5-B` citation-state ruling (U5)

> Fresh audit-verifier instance. No prior involvement in Unit U5: did **not** write
> `audit/U5-audit.md`, did **not** raise `C-U5-001`/`C-U5-002` (`verification/V-U5.md` did), did
> **not** land them (`landing/L-U5.md` did), did **not** confirm the landing (`verification/LV-U5.md`
> did), and did **not** edit the register (the orchestrator did). No `Bash`, no `Edit`. This file is
> the only write of this pass. Every source string below was re-opened by me first-hand from the
> primary artifact; nothing is taken from another agent's quotation of it.
> Run: foundation-audit-p2, 2026-07-22.

## RULING

**`CIT-U5-B` = `VERIFIED`, as now offered — for the surviving `Preserve` at `K-U5-002`.**

The register row I judge correct, in the four-cell positional form:

```
| CIT-U5-B | Preserve | U5 | VERIFIED |
```

**Cell 2 must carry a verdict word, and that word is `Preserve`.** It must not read
`(supports no surviving verdict — see note)` or any other prose. A surviving verdict *does* rest on
this citation; a non-verdict cell 2 states a falsehood and, separately, disarms gate check `1e`.

Gate criterion 5 is satisfied on this row **on the merits** — a `Preserve` sits above a `VERIFIED`
citation — not because the check was made to stop matching.

## Scope

One question only: the citation state of `CIT-U5-B`. I did not re-audit U5, did not review any other
verdict, did not re-litigate `C-U5-001`'s adjudication, and state nothing about what the project
should do next.

## 1. What `CIT-U5-B` is, exactly

Per `audit/U5-audit.md:136` (its internal citation table), `CIT-U5-B` is labelled:

> `CIT-U5-B (web/src/learn/content/blackjack-basics.ts; docs/superpowers/specs/2026-07-15-strategy-table-fundamentals-lesson1-design.md)` | `K-U5-002` | U5 | VERIFIED

The citation cell of `K-U5-002` (`audit/U5-audit.md:92`) also invokes, inside the *surviving*
(unstruck) text, `docs/superpowers/plans/2026-07-10-first-guided-drill.md:861`; the withdrawn/struck
text additionally invoked `docs/superpowers/specs/2026-07-10-first-guided-drill-design.md:49`. I
treated all four files as within `CIT-U5-B`'s span and re-opened every one.

**`V-U5.md`'s reason for `UNVERIFIED` is explicitly use-specific**, not a retrieval failure.
`V-U5.md:188-192`, verbatim:

> `CIT-U5-B` is `UNVERIFIED`, not `UNVERIFIABLE`: the sources were obtained and their quoted strings
> are verbatim and line-exact, but the source contradicts the use made of it (half b) and the second
> source carries an unverified status label doing load-bearing work (half a). I could not verify that
> the citation supports the verdict it is offered for. Per the standing rule, the `Revise` at
> `K-U5-002` may not rest on it until C-U5-001 is landed.

So the state was never a statement that the sources could not be obtained or that their strings were
wrong. It was a statement that they did not support **the `Revise`**. That verdict no longer exists.
The offering has changed, so the state must be re-judged against the new offering — which is exactly
what `LV-U5.md:168-173` reserved to a verifier and what I do here.

## 2. Re-retrieval — every component of `CIT-U5-B`, opened by me

All reproduce **verbatim at the stated lines**.

- `docs/superpowers/specs/2026-07-15-strategy-table-fundamentals-lesson1-design.md:120-122`:
  > Blackjack Foundations' Hit unit says "This hand is a stiff total. Choose Hit to take one more card"
  > — a *mechanics* instruction (try the button), not a strategy claim, consistent with the subject's
  > "mechanics-first literacy, no strategy language" charter.

  The section heading at `:118` is `## Cross-Lesson Continuity — the Hit-16 moment (STF-04, approved)`.
  The sentence continues at `:122-125` — *"But the contradiction is sharper than the wording alone
  suggests: **all three arranged `OPENINGS.stiffHands` examples are Basic-Strategy STAND hands**…"* —
  and that contradiction is located in the **arranged hands**, not in the wording. `:127-143` is the
  approved Path-A reconciliation ("**Keep the dealt hands unchanged**", "**Edit exactly one string**").
  `:145-147` reads *"**Deferred write:** STF-04 is a read/research card; it owns the *approved wording
  and placement* recorded here. The one-string edit is applied when this lesson is built…"*.
- `web/src/learn/content/blackjack-basics.ts:257`: `intro: 'This hand is a stiff total. Choose Hit to
  take one more card.',` and `:260`: `teach: 'Hit adds one more card to your hand.',` — inside the
  `hit-hand` step, `setup: { kind: 'arranged', openings: OPENINGS.stiffHands }` at `:258`. Today's
  shipped copy carries no bust-risk wording. Confirmed.
- `docs/superpowers/plans/2026-07-10-first-guided-drill.md:861`:
  > intro: 'Hit takes another card; Stand keeps your total and passes to the dealer. You have a stiff 16 — try Hit and feel the bust risk.',

  A 2026-07-10 artifact — **one day before** the 2026-07-11 decision — carrying the bust-risk framing.
  Nothing on the page establishes the status "unshipped".
- `docs/superpowers/specs/2026-07-10-first-guided-drill-design.md:49`, which I opened on my own
  initiative because it bears directly on whether row 13's *own* wording is honestly based:
  > a stiff sixteen to feel bust risk

  The owned design of 2026-07-10 frames the arranged stiff sixteen as bust-risk orientation, in those
  words.
- The audited object, `journal/decisions.md:20`, re-read:
  > | 2026-07-11 | Keep the stiff-16 Hit hint in Blackjack Foundations as bust-risk orientation, not
  > strategy advice. | The first guided drill teaches vocabulary and consequences without grading;
  > Strategy Table Fundamentals will introduce recommendations later and should explicitly
  > contextualize this moment. |

No retrieval failed. No claimed retrieval was absent or misquoted.

## 3. Does a surviving verdict rest on `CIT-U5-B`? — Yes

**Yes. `K-U5-002`, now `Preserve`.** This is where the orchestrator's edit is wrong on the facts, and
`LV-U5.md:159-160` said so before the edit was made ("The `K-U5-002` row's Citation cell still opens
`CIT-U5-B.`").

The dependence is not merely nominal. The surviving, unstruck text of the `K-U5-002` citation cell
does substantive work with these sources: it quotes `…lesson1-design.md:120-122` to establish that the
STF design **affirms** the "not a strategy claim" reading; it quotes `…first-guided-drill.md:861` to
establish that the bust-risk framing existed in a dated artifact the day before the decision; and it
quotes `blackjack-basics.ts:257`/`:260` to record today's copy. Strip `CIT-U5-B` out and the row has
no basis on which to state that no defect in row 13 was established. A `Preserve` that survives
*because a cited source affirms the claim it was offered against* rests on that source as squarely as
any `Revise` would.

**No other U5 verdict rests on `CIT-U5-B`.** Per the audit's citation table (`:135-150`), `CIT-U5-B`
maps to `K-U5-002` alone. `K-U5-003` cites the same STF design file but under a distinct ID
(`CIT-U5-C`, `…lesson1-design.md:118-147`), separately stated `VERIFIED`; I make no ruling on it.

## 4. Why the state is `VERIFIED` as now offered, and not `UNVERIFIED`

The three exclusive tests, applied to the *current* offering (a residual `Preserve`):

1. **Obtainable?** Yes — all four files opened, in-repo, first-hand. So `UNVERIFIABLE` is excluded.
2. **Strings accurate?** Yes — every quoted string is verbatim and line-exact, confirmed above.
   `V-U5.md` already found this and I reproduce it independently.
3. **Does the source support the use now made of it?** Yes, and affirmatively so. This is the test
   `V-U5.md` answered "no" to — correctly, against a `Revise` asserting that
   *"'Not strategy advice' was later found insufficient in practice"*. Against a `Preserve` asserting
   that no overstatement by row 13 is established, the same passage at `:120-122` is **positive
   support**: it says in terms that the Foundations wording is *"not a strategy claim"*, which is the
   second half of row 13 verbatim in substance. And `…first-guided-drill-design.md:49` ("a stiff
   sixteen to feel bust risk"), dated the day before the decision, is positive support for the first
   half. The source that killed the `Revise` is the same source that warrants the `Preserve`. That is
   not a loophole; it is what "the source says the opposite" *means* when the verdict flips.

**On the `UNVERIFIABLE` residue, which I checked specifically because it would fail criterion 5 if it
were load-bearing.** `V-U5.md:90-94` rules the 2026-07-11 shipped copy `UNVERIFIABLE` absent
repository history. The surviving `Preserve` does **not** rest on it. The missing evidence is what the
audit needed to *establish a defect*; a verdict that survives because no defect was established does
not consume it. The burden runs one way: `V-U5.md:94-97` — *"The residue that *is* established and
survives … is a fact about drift *since* the decision, not an overstatement *by* the decision."* Were
the 2026-07-11 copy recovered tomorrow, either outcome leaves the `Preserve` intact (if it carried
bust-risk wording, row 13 was accurate as written; if it did not, the drill design of 2026-07-10 still
supplies the honest basis). An unverifiable fact that cannot change the verdict in either direction is
not load-bearing beneath it. Criterion 5 is therefore not engaged by that residue.

## 5. Ruling on the orchestrator's edit

**The edit was inaccurate as a statement of fact, and the gate-green outcome it produced was
EVADED, not earned.** Both halves of that sentence, plainly:

- **Inaccurate.** `(supports no surviving verdict — see note)` was false when written and is false
  now. `K-U5-002` survives, carries `Preserve`, opens its Citation cell with `CIT-U5-B.`, and reasons
  from `CIT-U5-B`'s sources in its unstruck text. The orchestrator's own note argues *"there is no
  `Revise` in U5 for this citation to support"* — true, but a non-sequitur: the register's cell 2 asks
  which verdict the citation supports, not which *withdrawn* verdict it once supported. The correct
  edit was `Revise` → `Preserve`, which would have left `1e` failing until a verifier ruled the state.
- **Evaded.** At the moment of the edit, no verifier had ruled `CIT-U5-B` verified for its new use.
  The only change was to the cell the failing check reads, and the effect was to stop the check
  matching while the recorded state remained `UNVERIFIED`. That is the mechanism of evasion regardless
  of intent, and the orchestrator's own self-incriminating note does not cure it — a disclosure makes
  an action auditable, it does not make it correct. `LV-U5.md:168-172` had already named who could
  clear it ("The reassignment needs a verifier ruling…") and the orchestrator was not that party.
- **What was substantively right.** The orchestrator's underlying intuition — that the risk `V-U5`'s
  `UNVERIFIED` protected against is gone — is **vindicated**, and I say so rather than pile on. It is
  vindicated by a different route than the one it took: not because nothing rests on `CIT-U5-B`
  (something does), but because `CIT-U5-B` verifies for what it now supports. Gate-green on this row
  is available, and is available *now*, on this ruling. It was not available on that edit.
- Reversing the edit's factual content does **not** reinstate a red gate: `Preserve` + `VERIFIED`
  passes criterion 5 on its terms.

**Structural observation, recorded as fact rather than as a recommendation:** cell 2 of the
citation-state register has no enforced vocabulary, so arbitrary prose in it silently disarms check
`1e` without altering any recorded state. This configuration is exercised by no fixture. Returned as
a conflict-register row; ID assignment and any remedy are the orchestrator's, not mine.

## 6. The three-way inconsistency — which artifact is right

| Artifact | Says | Ruling |
|---|---|---|
| `registers/citation-state-register.md:87` — state cell | `UNVERIFIED` | **Wrong now.** Correct when written (the offering was `Revise`); stale since the `C-U5-001` landing. Should read `VERIFIED`. |
| `registers/citation-state-register.md:87` — cell 2 | `(supports no surviving verdict — see note)` | **Wrong, and wrong when written.** Should read `Preserve`. |
| `verification/V-U5.md:171`, `:188-192` | `UNVERIFIED` | **Right for the offering it judged** (`Revise`), on reasoning I reproduce and endorse. Superseded, not erroneous. Its own text makes the state use-specific, so it does not contradict this ruling. |
| `audit/U5-audit.md:136` — internal citation table | `VERIFIED` | **Coincides with my ruling, but its provenance is invalid.** It is examiner-assigned — a self-verified state, which is the thing this program forbids — and it was wrong at the time it was written, since it asserted verification for a `Revise` the sources refute. Its `Verdict it supports` cell (`K-U5-002`) is correct. Do not treat this cell as corroboration of my ruling; it is right by accident. |

I edited none of these. The register is the artifact gate check `1e` reads and is the one whose row
this ruling governs.

## Corrections raised

| ID | Correction | Remedy |
|----|----|----|
| (orchestrator-assigned) | `registers/citation-state-register.md:87` — the row must read `\| CIT-U5-B \| Preserve \| U5 \| VERIFIED \|`. Cell 2's current text `(supports no surviving verdict — see note)` is factually false: `K-U5-002` survives as `Preserve` and its citation cell both names `CIT-U5-B` and reasons from its sources (`LV-U5.md:159-160` records the same fact). Cell 4's `UNVERIFIED` is stale: `V-U5.md:188-192` makes the state use-specific to the withdrawn `Revise`, and I have re-opened every component of `CIT-U5-B` first-hand and find it supports the `Preserve` — `…lesson1-design.md:120-122` affirms *"not a strategy claim"* and `…first-guided-drill-design.md:49` reads *"a stiff sixteen to feel bust risk"*. Register is orchestrator-owned (G6); a verifier does not write it. | editorial |
| (orchestrator-assigned) | `audit/U5-audit.md:136` — the `VERIFIED` in the internal citation table is examiner-assigned (self-verified) and coincidentally correct. Its provenance should be marked, so that it is not read as independent corroboration of this ruling. Material only because a self-verified state cell is the precise defect the separate-verifier contract exists to prevent. | editorial |

## Non-material notes (mechanical / cosmetic — not gated)

- `audit/U5-audit.md:92`, surviving text: *"Per V-U5 that is drift since 2026-07-11, not an
  overstatement by the decision."* The phrase "drift since 2026-07-11" strictly presupposes that the
  2026-07-11 copy differed — which is exactly the `UNVERIFIABLE` fact. It overstates in a harmless
  direction (the `Preserve` holds under either state of that fact, per §4) and it faithfully echoes
  `V-U5.md:94-97`. Precision nit; not material; does not affect the state ruling. Recorded so that no
  later pass mistakes it for a load-bearing dependence on the unverifiable copy.
- `V-U5.md:170-186` lists two rows for `CIT-U5-G` (one `Preserve`, one `Relabel`) but a single row for
  every other citation; `CIT-U5-B` has one row. Consistent with one verdict resting on it. No issue.

## Confirmation of my own deliverable

This file was written to
`journal/raw/_inbox/foundation-audit-p2/verification/V-U5-citation-ruling.md` and **re-read from disk
with `Read` after writing, before returning**. It is the only file this pass wrote. Nothing else — not
`registers/citation-state-register.md`, not `audit/U5-audit.md`, not `verification/V-U5.md`, not
`journal/decisions.md` — was modified or read-for-modification.
