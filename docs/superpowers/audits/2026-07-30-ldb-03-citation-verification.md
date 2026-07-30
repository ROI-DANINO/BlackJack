# LDB-03 Citation Verification — the re-run of a lost pass

> **Provenance.** The `audit-verifier` run dispatched 2026-07-30 to check these claims was sent to a
> write path outside its enforced scope, finished its analysis, and died at a write it could never
> perform. Its findings are unrecoverable. This record is the **orchestrator re-running that half by
> hand** after the agent route was abandoned.
>
> **Standing, stated plainly: this is not independent verification.** The author of the audited
> document performed these checks. It closes a *mechanical* gap — do the quoted figures and loci say
> what the document says — and it does **not** substitute for a second hand on judgement. The
> judgement half was done independently and is at
> `2026-07-30-ldb-03-claim-examination.md`, which returned eleven non-Preserve verdicts.

Document verified: `docs/superpowers/specs/2026-07-30-activity-taxonomy-and-capability-map.md`
Archive checked against: `docs/superpowers/research/activity-pattern-catalog/` (`run/U1|U2|U3/audit.md`,
`classification.md`), `docs/superpowers/research/evidence-index/P2-verdict-catalog.md`,
`docs/superpowers/specs/2026-07-22-product-design-inputs.md`,
`docs/superpowers/specs/assumption-register.md`, `web/src/learn/`, `crates/`.

## Result: 12 of 12 confirmed, 0 refuted, 0 could-not-check

| # | Claim | Verdict | What the archive actually says |
|---|---|---|---|
| 1 | Discrimination errors `46% vs 10%`; `72% vs 38%`; `d=1.05` | **CONFIRMED** | All three present verbatim (also rendered `46% → 10%` and `46%→10%` in places) |
| 2 | `r = 0.81`, `k = 52` | **CONFIRMED** | Both present |
| 3 | `p = 0.93`, `73.3% vs 73.5%` | **CONFIRMED** | Both present |
| 4 | U3-6 `r = .243` n.s. vs `.551` p<.05; interrater `0.81 vs 0.92` | **CONFIRMED** | All present |
| 5 | Kornell & Bjork 78/78 | **CONFIRMED** | "78% of the participants did better with spaced presentations…"; "78% of the participants said that massing was as good as or better than spacing" |
| 6 | U3-5 "…would have looked the same had we not included the resource item…" | **CONFIRMED** | Present verbatim in `run/U3/audit.md` |
| 7 | U3-7 "some of which may be distractors that must be left unused" | **CONFIRMED** | Present verbatim. **This is the load-bearing quote for §4's condition 2** |
| 8 | U3-4's value orthogonal to answer correctness | **CONFIRMED** | "did not generate a correct standardizing procedure during instruction, yet they were more prepared to learn…" |
| 9 | `A-10` "Very low — likely to be retired rather than validated" | **CONFIRMED** | Verbatim in the register |
| 10 | `K-U4-003` "None of the three sources speaks to format validity" | **CONFIRMED** | Verbatim in `P2-verdict-catalog.md` |
| 11 | No EV machinery in `blackjack-core` | **CONFIRMED** — see the guard below | `expected_value|expectimax|monte-carlo` → **0 hits** |
| 12 | `validate.ts:65-66`, `controller.ts:123`, `blackjack-basics.ts:290` | **CONFIRMED** | All three read as the document describes; `controller.ts:123` still carries the `K-U6-005` mislabel |

## Counts, verified by enumeration rather than by reading the claim

- **32** distinct pattern ids in §5 — and **32** distinct ids in `classification.md`, so the set
  matches the archive's rather than merely totalling 32.
- Adopted table **15** rows (+ `U2-6`, `U2-14` in prose = 17 adopted); not-adopted table **16** rows,
  reconciling to 11 outright + 5 split/conditional/deferred. **17 + 11 + 4 = 32** holds.
- All **18** LDB-01 outcome ids present in §3.

## Two notes that change how a reader should use this

**The anti-vacuity guard on claim 11, because a zero is not a finding.** `grep` over a missing
directory returns zero and reads as a pass — the defect this repo names third (*never let absence stand
as proof*). Before accepting the 0, I confirmed `crates/` exists with **24 `.rs` files** and that a
positive control, `basic_strategy`, returns **7 hits**. The zero is therefore a measurement, not a
silence.

**Claims 2 and 3 were never at risk in this document.** They were on the check list because the author
cited them *in conversation*. The document cites `p = 0.93`, `r = 0.81` and `73.3%` **nowhere at all** —
those figures live in the LDB-02 archive and in `FOR-LDB-03.md`. So the specific hazard flagged at
dispatch (misstating the `p = 0.93` null's limit, whose comparator is itself a production format) does
not arise in the deliverable. The figures were confirmed anyway, since the conversational use rested on
them.

## What this does and does not close

**Closes:** every quoted figure, quotation, code locus and count in the document.

**Does not close:** anything requiring judgement, and anything requiring a second hand. Also unchanged:
the underlying academic papers are not in this repo and are mostly paywalled — this pass verifies
*document-to-archive* fidelity and *archive-supports-what-is-claimed-of-it*, never the papers
themselves. Where the archive is the sole warrant, the document's own labels and the Assumption Register
carry that, not this record.
