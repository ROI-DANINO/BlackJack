# Landing Confirmation — Unit U2

> Confirmer: audit landing-confirmer (Opus 4.8), 2026-07-22. Run dir: `foundation-audit-p2`.
> Landing claims under confirmation: `journal/raw/_inbox/foundation-audit-p2/landing/L-U2.md`.
> Artifact confirmed against: `journal/raw/_inbox/foundation-audit-p2/audit/U2-audit.md` (post-landing, 402 lines).
> Corrections as raised: `journal/raw/_inbox/foundation-audit-p2/verification/V-U2.md` (`C-U2-001`, `C-U2-002`).
> Before-image: `journal/raw/_inbox/foundation-audit-p2/.pre-landing-copy/U2-audit.md` (374 lines).
> **This record judges only. Nothing outside this file was written; no `Edit` tool was available or used.**

## Verdicts

| ID | Verdict | Anchor |
|----|----|----|
| C-U2-001 | LANDED | `audit/U2-audit.md:81` (corrected sentence), correction block `:84-93`, `LANDED` marker `:95` |
| C-U2-002 | LANDED | `audit/U2-audit.md:182` (`### K-U2-006` header bucket), correction block `:184-194`, corrected closing paragraph `:205-210`, `LANDED` marker `:212` |

---

## C-U2-001 — LANDED

**What the verifier asked** (`V-U2.md:60`): the sentence at `U2-audit.md:81` — "Every `DUO-*` source
is `PUBLISHED` at vendor-self-description grade" — is false of `DUO-006`, which the register types
verbatim as "Peer-reviewed operational study"; the defensible claim is *independence* (vendor-
**authored**), not source tier; the `K-U2-001` verdict is unaffected.

**What is on disk now.** `audit/U2-audit.md:80-82` reads:

> So: **no efficacy evidence held by this program supports "Duolingo-like ⇒ people learn better."**
> Every `DUO-*` source is vendor-authored, exactly as the dispatch warned;
> none is an independent efficacy finding, and none is about blackjack.

The before-image at `.pre-landing-copy/U2-audit.md:80-82` reads the same paragraph with the false
clause intact: "Every `DUO-*` source is `PUBLISHED` at vendor-self-description grade, exactly as the
dispatch warned;". The substitution is exactly the one asked for: tier claim → independence claim.
A `> **Correction (C-U2-001, editorial):**` block at `:84-93` quotes the original wrong sentence,
names the register location (`…product-activity-research.md:33`), gives the correct type verbatim,
states the surviving conclusion, and states that the `K-U2-001` verdict does not rest on the
corrected sentence. This is the substance the verifier asked for, not merely discussion of the topic.

**Retrieval reproduced — YES.** I opened
`docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md` myself (Read,
lines 24-37) rather than accepting the editor's report. Line 33, verbatim source-type cell:

> `| DUO-006 | [A Trainable Spaced Repetition Model for Language Learning](https://research.duolingo.com/papers/settles.acl16.pdf) | Burr Settles and Brendan Meeder / ACL | 2016 | Peer-reviewed operational study | ... |`

The editor's second retrieval claim on this correction — that no other `DUO-*` row carries that type
— also reproduces. Lines 28-32 type `DUO-001` "Official product and learning-method article",
`DUO-002` "Official product guide", `DUO-003` "Official research and product article", `DUO-004`
"Official engineering article", `DUO-005` "Official engineering and experimentation article". None is
peer-reviewed. `DUO-006`'s publisher/authors cell is "Burr Settles and Brendan Meeder / ACL", i.e.
vendor-authored (Duolingo Research) and peer-reviewed simultaneously — which is precisely why the
landed wording ("vendor-authored") is the accurate one and the original ("vendor-self-description
grade") was not.

**Verdict: `LANDED`.**

## C-U2-002 — LANDED

**What the verifier asked** (`V-U2.md:61`, and the ruling row at `V-U2.md:72`): `K-U2-006`'s Layer-2
bucket is wrong by the record's own declared falsifiability test; it must read **Assumption**, not
Product judgement; the baseline's ruling on the exact analogue supports this verbatim at
`…product-activity-research.md:89-90`; the `Relabel` verdict itself is unaffected.

**What is on disk now.** Header at `audit/U2-audit.md:182`:

> `### K-U2-006 — Relabel → **Assumption** (the specific three-stage ladder). Layer 1: `INFERENCE`.`

Before-image `.pre-landing-copy/U2-audit.md:169`:

> `### K-U2-006 — Relabel → **Product judgement** (the specific three-stage ladder). Layer 1: `INFERENCE`.`

The closing falsifiability paragraph was the second locus the verifier named. Before-image `:179-184`
ended "Because the audited sentence is the ladder, I call it **Product judgement** for the
ladder-as-design and flag the rung specification as the falsifiable part." Post-landing `:205-210`
now reads "...so the rungs are an **Assumption**. The commitment to fading *at all* is a Product
judgement resting on evidence, but the audited sentence (`:83-87`) is the rung sequence itself, not
the underlying commitment to fade, so the rung sequence's bucket governs this row: **Assumption**."
That is the verifier's own distinction (audited rung sequence vs. general fading principle) carried
into the record, not a keyword swap. A `> **Correction (C-U2-002, editorial):**` block at `:184-194`
preserves the original header and closing wording and states the ground.

**Retrieval reproduced — YES.** I opened the baseline myself (Read, lines 85-94). Lines 89-90,
verbatim:

> `- **Hint ladder:** worked examples and fading support graded assistance (`SCI-004`, `SCI-009`), but`
> `  the existing four-level ladder remains a project design rather than a research-derived sequence.`

This matches the editor's quoted retrieval word for word, including the "project design rather than a
research-derived sequence" ruling the correction turns on. The editor's second, in-file retrieval
claim also reproduces: `U2-audit.md:62-64` does declare the test ("would the decision change if
playtesting contradicted it? yes → Assumption; values commitment → Product judgement"), and the
before-image at `.pre-landing-copy/U2-audit.md:179-181` does contain the self-contradiction ("the
rungs are closer to an Assumption" one sentence before "I call it **Product judgement**").

**Verdict: `LANDED`.**

---

## Check 2 — did anything change that was not asked for?

**No. Insertion-only outside the two correction loci.** I read both files in full and reconciled them
line by line, tracking offsets:

| Span (before-image) | Span (post-landing) | Offset | Status |
|---|---|---|---|
| `:1-80` | `:1-80` | 0 | byte-identical |
| `:81` | `:81` | 0 | **C-U2-001 correction locus** (asked-for) |
| `:82-83` | `:82-83` | 0 | identical |
| — | `:84-96` | +13 | inserted: correction block, marker, blank lines (asked-for) |
| `:84-168` | `:97-181` | +13 | identical |
| `:169` | `:182` | +13 | **C-U2-002 header locus** (asked-for) |
| — | `:183-195` | +26 | inserted: correction block + blanks (asked-for) |
| `:170-178` | `:196-204` | +26 | identical |
| `:179-184` | `:205-210` | +26 | **C-U2-002 closing-paragraph locus** (asked-for) |
| — | `:211-213` | +28 | inserted: marker + blanks (asked-for) |
| `:185-373` | `:213-401` | +28 | identical |

The offsets close exactly (13 + 13 + 2 = 28, and 374 - 402 = -28), which is what an insertion-only
edit outside the two rewritten loci looks like. Everything downstream of `### K-U2-007` — the whole
Coverage section, the eleven citation-state rows, both logged conflicts, the Calibration section
(including its "5 of 11 verdicts are `Preserve`" anti-pessimism line), and all seven Non-material
notes — is unchanged. Nothing was added to, or removed from, the Verdicts table.

**No `ALTERED` locus found.**

## Check 3 — did the verdicts survive?

**Yes. Counted by me, not taken from `L-U2.md`.** Regex
`^\| *K-U2-[0-9]{3} *\| *(Preserve|Relabel|Revise|Replace|Remove) *\|` against
`audit/U2-audit.md` returns **exactly 11 matches**, at lines 44-54, one per claim `K-U2-001`
through `K-U2-011`, no gaps and no duplicates:

| Line | Row |
|---|---|
| 44 | `K-U2-001` Relabel |
| 45 | `K-U2-002` Relabel |
| 46 | `K-U2-003` Relabel |
| 47 | `K-U2-004` Preserve |
| 48 | `K-U2-005` Preserve |
| 49 | `K-U2-006` **Relabel** |
| 50 | `K-U2-007` Relabel |
| 51 | `K-U2-008` Preserve |
| 52 | `K-U2-009` Preserve |
| 53 | `K-U2-010` Relabel |
| 54 | `K-U2-011` Preserve |

**Distribution: 5 `Preserve`, 6 `Relabel`.** Required: 5 / 6. **Match.** Zero `Revise`, `Replace`,
`Remove`, as before landing.

`K-U2-006` at line 49 still reads `Relabel`. `C-U2-002` changed only its Layer-2 **bucket** label
inside the prose reasoning (Product judgement → Assumption), which is not a verdict word, exactly as
the correction was scoped. Line 49's fourth cell (`CIT-U2-06`) is also unchanged.

**Marker placement is clean.** Both `LANDED` markers are HTML comments on their own lines in prose
sections (`:95` under the `K-U2-001` reasoning, `:212` under the `K-U2-006` reasoning). Neither sits
in a table row or cell, so the failure mode that destroyed two verdict rows earlier in this run did
not recur here.

## Summary

Both corrections are present, at the anchors `L-U2.md` states, saying what `V-U2.md` asked. Both
material retrieval claims reproduce first-hand against the primary source. Nothing outside the two
correction loci changed. The verdict table survived intact at 11 rows, 5 `Preserve` / 6 `Relabel`.

**`C-U2-001`: LANDED. `C-U2-002`: LANDED.**

## Observed but not raised (routing only — no ID, not a correction)

Scope discipline: these are returned for the orchestrator to route, not numbered here.

1. **Spliced quotation inside `L-U2.md` itself** (not in the audit record). `L-U2.md:20-21` attributes
   to the verification record a single quoted instruction: `("Bucket is the whole remedy of a
   `Relabel`... The `K-U2-001` verdict is unaffected")`. Those two fragments come from **two
   different corrections** — "Bucket is the whole remedy of a `Relabel`" is in `C-U2-002`
   (`V-U2.md:61`); "**The K-U2-001 verdict is unaffected**" is in `C-U2-001` (`V-U2.md:60`) — joined
   by an ellipsis as though continuous. Nothing landed wrongly because of it, and the audit record is
   unaffected; but it is the ellipsis-splice pattern this program was built to catch, appearing in a
   landing record.
2. **Cosmetic, in the landed correction block.** `audit/U2-audit.md:88-89` renders the quoted
   in-record sentence as "The single peer-reviewed Duolingo source, `DUO-006`..." — a truncation with
   ellipsis of the sentence at `:77-78`. Verbatim as far as it goes; meaning unchanged.
3. `V-U2.md`'s own Non-material notes (its unnumbered list at `:198-225`) were, as designed, not part
   of the landing loop and are not landed. Recorded so a later pass does not read their absence as a
   missed landing.
