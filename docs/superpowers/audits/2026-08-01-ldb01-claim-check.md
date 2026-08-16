# Audit record — LDB-01 claim check (C1–C4)

> Status: RAW — data/evidence only, not authority (Inbox Rule 0).
> Role: adversarial claim-auditor (examiner, not verifier). A separate instance re-checks every verdict.
> Date: 2026-08-01  |  Run dir: `2026-08-01-ldb01-claim-check`
> Vocabulary per dispatch: C1, C2, C4 are factual reads of shipped code / the shipped table and carry
> **Supported / Refuted / Cannot verify**. C3 is a document-claim audit and carries the five-verdict
> vocabulary (Preserve / Relabel / Revise / Replace / Remove).
> Method note: all code-level results below were derived by **reading source**, not by executing it
> (no Bash in this role). Line numbers are from the files as read 2026-08-01.

## Summary table

| ID | Claim (as dispatched) | Verdict | Rests on |
|----|----|----|----|
| C1 | Shipped oracle returns Hit for hard 16 vs dealer 10 | **Supported** (both profiles; surrender not modelled) | `crates/blackjack-core/src/strategy.rs:33,74,187-194,206-213,224-233`; `crates/blackjack-core/src/types.rs:78-83` |
| C2 | Ten-heuristic disagrees with shipped table on a set of decisions incl. hard 16 vs 10 | **Supported** — 27 of 50 hard-12–16 cells per profile, identical in H17 and S17 | `crates/blackjack-core/src/strategy.rs:29-33,62-77` (rows 7–11 of both hard tables) |
| C3 | Bridge §1.8 accurately characterises its source | **Revise** — two of three assertions accurate; the comparator "than unaided play" and the mandated Q4/abstract-only caveat do not survive checking | bridge `:116-123`; `C7-probability-ev-variance.md:1617-1684`; `V-C7-topup.md:25,120-135` |
| C4 | Within phase-4 scope, every player decision is table-determined; no in-scope decision requires computing EV | **Supported, with one stated qualification** — insurance is ruleset-eliminated, not table-determined; surrender does not exist in the engine | `crates/blackjack-core/src/rules.rs:72-116`; `src/session.rs:101-104`; `src/types.rs:73,78-83`; `web/src/learn/engine.ts:30` |

Claims assessed: **4**. Routed to Non-material notes: **3**.

---

## C1 — hard 16 vs dealer 10 under the shipped oracle: **Supported**

Claim under audit (dispatch): *"Under the shipped basic-strategy oracle, hard 16 versus dealer upcard
10 returns Hit."*

The oracle is `basic_strategy_action` (`crates/blackjack-core/src/strategy.rs:140-180`). For a
non-pair hard total the path is `hard_move` (`strategy.rs:206-213`): total 16 maps to row
`16 - 5 = 11`. Dealer column for a ten-value upcard is 8 (`strategy.rs:187-194`, verbatim:
`10 => 8,`). Row 11 of both hard tables is, verbatim:

- `H17_HARD` row 11 (`strategy.rs:33`): `"SSSSSHHHHH"`
- `S17_HARD` row 11 (`strategy.rs:74`): `"SSSSSHHHHH"`

Index 8 of `"SSSSSHHHHH"` is `H`; `chart_move` maps `b'H' => ChartMove::Hit`
(`strategy.rs:224-233`) and `legal_action` maps `ChartMove::Hit => Action::Hit`
(`strategy.rs:235-261`). Hit is always in the legal set for a live, non-split-ace hand
(`rules.rs:99`). **Result: Hit, under both the h17 and s17 profiles.** The two hard tables differ
only at hard 11 vs Ace (`strategy.rs:28` `"DDDDDDDDDD"` vs `strategy.rs:69` `"DDDDDDDDDH"`), which
does not touch this cell. The test mirror agrees: `tests/strategy_tests.rs:30-31` carries the same
row 11 string, and `tests/strategy_tests.rs:6-17` fixes column 8 = `Rank::Ten`.

Composition caveat (stated, not a defect in the claim): a two-card 8,8 is also hard 16 and routes
through the pair table first — `H17_PAIRS`/`S17_PAIRS` row for 8s is `"PPPPPPPPPP"`
(`strategy.rs:56,97`), so 8,8 vs 10 returns Split when legal (`strategy.rs:162-171`). The claim as
written holds for hard 16 generally (e.g. 10+6); the pair-composition exception is the table's own
structure, not a counter-example to "hard 16 → Hit" as a hard-total row fact.

**Surrender: not modelled at all.** Enumerated positively: the `Action` enum is exactly
`{Hit, Stand, Double, Split}` (`crates/blackjack-core/src/types.rs:78-83`); the chart alphabet is
exactly `H/S/D/X/P` (`strategy.rs:224-233`, with `X` = double-else-stand, not surrender);
`legal_actions` (`rules.rs:72-116`) can never emit a surrender; and a case-insensitive search for
`surrender` across `crates/` returns **zero** occurrences (the only hits for the combined
`surrender|insurance` pattern were all insurance lines). There is no strategy row, action variant,
or ruleset field for surrender anywhere in the shipped core.

## C2 — the ten-heuristic disagreement set, derived from the shipped table: **Supported**

Claim under audit (dispatch): *"The heuristic 'assume the next card is a ten' disagrees with the
shipped strategy table on a material set of player decisions, including hard 16 vs 10."* Heuristic
per dispatch: implies Stand for any hard total T ≥ 12 (T + 10 busts).

Shipped hard rows for totals 12–16 (identical strings in `H17_HARD` and `S17_HARD`,
`strategy.rs:29-33` and `strategy.rs:70-74`; columns are dealer 2,3,4,5,6,7,8,9,10,A):

| Total | Row (verbatim) | Table says Hit vs | Heuristic says | Disagreement cells |
|---|---|---|---|---|
| 12 | `"HHSSSHHHHH"` | 2, 3, 7, 8, 9, 10, A | Stand | 7 |
| 13 | `"SSSSSHHHHH"` | 7, 8, 9, 10, A | Stand | 5 |
| 14 | `"SSSSSHHHHH"` | 7, 8, 9, 10, A | Stand | 5 |
| 15 | `"SSSSSHHHHH"` | 7, 8, 9, 10, A | Stand | 5 |
| 16 | `"SSSSSHHHHH"` | 7, 8, 9, 10, A | Stand | 5 |

**Count: 27 of the 50 hard-12–16 cells per profile — table says Hit where the heuristic implies
Stand — and the set is identical under H17 and S17** (the profile difference sits at hard 11 vs A,
outside this range). **Hard 16 vs 10 is among them** (row 11, column 8 = `H`, per C1). No Double
appears in rows 12–16, so Hit-vs-Stand is the only disagreement type in this range.

Bounds stated so the count is not over-read: (a) the enumeration is of the **hard-total table**;
two-card pair compositions of these totals (6,6 / 7,7 / 8,8) route through the pair rows first
(`strategy.rs:52-56,93-97`), where the shipped action can be Split rather than Hit; (b) the
heuristic definition applied is exactly the dispatch's (Stand for T ≥ 12), and I derived nothing
beyond it. The word "material" in the claim is a characterisation, not a countable fact; what the
enumeration establishes is that the set is large (27/50, including the highest-frequency stiff-hand
decisions) and includes the named cell.

## C3 — "Bridge section 1.8 accurately characterises its source": **Revise**

Claim under audit, verbatim (`docs/superpowers/specs/2026-07-22-product-design-inputs.md:116-123`):

> `### 1.8 Blackjack players use a false heuristic that outperforms nothing-at-all [VERIFIED]`
> `The only on-domain source in the dossier: casino blackjack players use a transparently false`
> `heuristic — *assume the next card is a ten* — which is far easier to learn than optimal strategy and`
> `is associated with better expected returns than unaided play. The paper further contends that`
> `inferring EV from subjective probability may be "both uncommon and non-normative" even in blackjack.`

### (a) Is the source itself present in the repo, or only a description of it?

**Neither the paper nor any full text is present; the archive holds the publisher abstract, verbatim,
plus verification of that abstract.** The source is Bennis, W.M. (2025), *Mind & Society* 24(2),
275–301, DOI 10.1007/s11299-025-00346-9, held as F20 in
`docs/superpowers/research/foundation-audit-p3/collection/C7-probability-ev-variance.md:1617-1684`.
Its access line is explicit (`:1636`): "**ABSTRACT-LEVEL ONLY — full text NOT obtained.**" A glob for
`**/*.pdf` across the repo returns **no files**; the only repo holdings mentioning this DOI are the
C7 collection, `V-C7-topup.md`, `C7-topup-report.md`, and the two evidence-index catalogs. So: more
than a mere description — a verbatim primary-abstract copy — but strictly less than the source.

### (b) Does any verification record show someone opened it first-hand?

**Yes, twice, at abstract level; no one in the program has read the full text.**
`docs/superpowers/research/foundation-audit-p3/verification/V-C7-topup.md:25` rates F20 **VERIFIED**:
"YES — Springer article page, reached through the 303→`?error=cookies_not_supported` chain; abstract
served in two passes covering the whole text … Abstract quoted **in full and verbatim**, including
the (a)(b)(c) contentions." The verifier's opened-sources list (`V-C7-topup.md:298-300`) names the
Springer page (two queries), the Semantic Scholar record (abstract publisher-elided), and a RePEc
record ("returned a paraphrase — discarded, not used"). The collector likewise discarded its own
first tool-summarised extraction (`C7…:1636-1641`). Disambiguation so nobody conflates holdings: the
full 43-page PDF that verifier V6 downloaded (`foundation-audit-p1/dossiers/C6-blackjack-teachable.md:270-277`)
is **Bennis (2004)**, *Journal of Gambling Issues* — a different paper by the same author. No record
anywhere in the archive shows the 2025 paper's body opened.

### (c) Are the three assertions supported by what is held?

**Assertion 1 — players use the assume-a-ten heuristic: supported at abstract level.** Abstract,
verbatim (`C7…:1643-1646`): "Casino blackjack players learn a simple heuristic … The heuristic
assumes that all upcoming cards will be 10-value cards, even though that assumption is true fewer
than one in three times." "Transparently false" is the paper's own title language. Accurate — with
the standing qualification that this is the paper's claim from Q4 mixed-methods work, held at
abstract level.

**Assertion 2 — "far easier to learn … better expected returns than unaided play": partly
supported; the comparator is not in the held evidence.** Abstract, verbatim (`C7…:1646-1648`): "it
is easier to learn than the optimal strategy, the cost of using it is trivial, and its use is
associated with better expected returns." The abstract names **no comparator** for "better expected
returns"; "**than unaided play**" is the bridge's addition. F20's own prohibition list forbids
exactly this kind of specification (`C7…:1666-1670`, verbatim): "**What abstract-level access cannot
support, and no downstream work may claim from F20:** … how expected returns were computed, what the
association's magnitude or uncertainty is, whether any comparison to basic strategy was made …"
Since nobody in the program has read the analysis, no comparator — including "unaided play" — can be
evidence-backed from holdings. The same unsupported comparator is encoded in the section header
("outperforms **nothing-at-all**"). Secondarily, "**far** easier" intensifies the abstract's
"easier." This is not a contradiction (`Remove` does not apply); it is an over-specification needing
factual correction.

**Assertion 3 — the EV contention: supported and correctly hedged.** Abstract, verbatim
(`C7…:1653-1655`): "(b) even in a small-world domain where outcome likelihoods can be calculated and
monetary outcomes are unambiguous, using subjective probability to infer expected value may be both
uncommon and non-normative". The bridge's "The paper further contends" preserves the dossier's
recording of (b) as "the author's theoretical argument, not a measured result" (`C7…:1620-1621`).
Accurate.

**One further characterisation defect, material by the dossier's own instruction.** F20 states
(`C7…:1626-1629`): "**This is a D1 source at a low quality tier** … and the two properties must be
cited together." Bridge §1.8 cites neither — no Q4, no abstract-only, no single-author-association
caveat travels into the section, which sits under §1's banner "Evidence-backed and independently
verified" (`bridge:49-51`). The `[VERIFIED]` tag itself is defensible under §0's own definition
("independently checked against the opened source", `bridge:43-44` — the opened source being the
abstract, and V-C7-topup did verify it), so this is not a false tag; it is a mandated caveat that
was dropped in transit.

**Verdict: Revise.** The section is basically right — the heuristic characterisation and the EV
contention match the held abstract verbatim, and the hedge on (b) survives — but to stand it needs:
(i) the comparator "than unaided play" (and the header's "outperforms nothing-at-all") corrected to
the abstract's uncomparatored "associated with better expected returns", per F20's prohibition list;
(ii) "far easier" → "easier"; (iii) the dossier-mandated pairing restored — Q4 tier and
abstract-level access cited together with the D1 relevance. Materiality: §1.8 feeds playtest
question P-4 (`bridge:263`) and two open Phase 4 decision candidates (`bridge:290-292`); the
comparator and the missing strength caveat are exactly the load-bearing parts. Drafting the
corrected text is the landing role's job, not mine.

## C4 — every in-scope decision table-determined; no EV computation required: **Supported, with one stated qualification**

Claim under audit (dispatch): *"Within phase-4 scope — rules, hand reading, strategy, probability,
EV and variance, with card counting explicitly out — every player decision is already determined by
the ruleset-matched basic-strategy table, so no in-scope decision requires the learner to compute
expected value."*

Scope premise verified against its sources: "learning outcomes for rules, hand reading, strategy,
probability, EV and variance" is verbatim at `bridge:313-314`; card counting is out per
`ROADMAP.md:241-242`, verbatim: "Not in scope now: full Basic Strategy memorization, no-table and
timed assessments, card counting instruction …".

**Coverage of the shipped decision space — complete.** Every legal-action set the engine can produce
is a subset of `{Hit, Stand, Double, Split}` (`rules.rs:72-116`; the enum has no other variants,
`types.rs:78-83`). The oracle maps every chart cell into that set with legality fallbacks
(Double→Hit / Double→Stand when Double is unavailable, Split falling through to hard/soft rows when
Split is unavailable — `strategy.rs:162-179,235-261`) and returns `None` only where no player
decision exists (empty legal set, completed/bust hand, initial natural — `strategy.rs:153-159`). So
for the two V1 rulesets, every state in which the learner has any choice has a table-determined
answer, and none requires the learner to compute EV.

**Insurance — the one qualification.** Insurance is not covered by the table; it is **removed from
the decision space by the ruleset**: `insurance_auto_decline: bool` (`types.rs:73`) is `true` in
`v1_h17_ruleset()` (`rules.rs:25`) and inherited by `v1_s17_ruleset()` (`rules.rs:29-34`); the engine
auto-declines and logs `LoggedAction::InsuranceDeclined` when the dealer shows an ace
(`session.rs:101-104`), and the learn module runs with the same flag (`web/src/learn/engine.ts:30`;
the web surface renders it as a notice, "Insurance auto-declined", `web/src/bridge/game.ts:116-117`).
So the claim's phrase "determined by the … table" is strictly inaccurate for insurance — it is
determined by the ruleset, not the table — but the claim's conclusion (**no in-scope decision
requires EV computation**) still holds, because the learner never faces the insurance decision at
all. If Phase 4 ever surfaces insurance as a teachable decision, the shipped table has no row for it.

**Surrender** — cannot be an in-scope undetermined decision because it does not exist anywhere in
the engine (see C1's positive enumeration).

**The bridge on insurance: silent.** Enumerated positively: a case-insensitive search of
`docs/superpowers/specs/2026-07-22-product-design-inputs.md` for `insurance|surrender|card
counting|counting` returns **zero** matches. The bridge neither includes nor excludes insurance from
phase-4 scope; the exclusion is enforced only in code (auto-decline) and by the ruleset flag.

**Boundary stated:** for any ruleset other than the two V1 rulesets, `resolve_profile` returns
`None` and the oracle errors (`strategy.rs:146-151`) — the claim holds exactly as far as its own
"ruleset-matched" scoping, no further.

---

## Non-material notes (no verdict, no landing loop)

1. **Bridge §1.8 "even in blackjack"** — a gloss on abstract contention (b), where blackjack is the
   case supporting the contention. Faithful enough in spirit; nobody would design differently over it.
2. **Bridge §1.8 "The only on-domain source in the dossier"** — accurate as scoped: F20 is "the only
   D1 *blackjack* item anywhere in this dossier" (`C7…:1626`). The Phase 1 C6 dossier holds other
   on-domain blackjack sources (e.g. Carlin & Robinson 2009), but the bridge sentence says "the
   dossier" (Phase 3's), so no defect.
3. **Propagation observation** (outside the audited document; recorded as data for whoever lands the
   C3 revision): `docs/superpowers/research/evidence-index/P3-evidence-catalog.md:236` reproduces the
   bridge's "than unaided play" wording in its §1.8 row. If the comparator is corrected in the bridge,
   the catalog row will need the same correction or the two documents drift.

## What I could not check and why

- **The full text of Bennis (2025).** Not held anywhere in the program (collector and verifier both
  abstract-level only; no PDF in the repo). Closing this requires *finding* full-text access, which
  is a collector's job — outside my capability boundary (no WebSearch), so I stopped there. Every
  C3 finding above is therefore relative to the held abstract, which is the archive's ceiling.
- **Runtime behaviour of the oracle.** No Bash in this role, so I could not execute
  `basic_strategy_action` or run `strategy_tests.rs`. C1/C2 results are static reads of the shipped
  constants and index arithmetic (`total-5` row mapping, `10 => 8` column mapping), cross-checked
  against the identical constants mirrored in the test file — but not machine-executed by me.
- **Whether "than unaided play" was ever grounded in something outside the repo** (e.g. a session
  transcript or a source opened and never recorded). I checked the repo holdings that Rule 1 allows
  me to treat as evidence; a claim grounded nowhere in the archive is, for this program's purposes,
  ungrounded — but I cannot rule out an unrecorded reading.
- **`journal/tasks.md:98-99`** matched the counting-scope grep but the matching lines were elided by
  the search tool as over-long and I did not reopen the board file; the scope premise was instead
  verified against `bridge:313-314` and `ROADMAP.md:241-242`, which suffice. Noted so the search is
  distinguishable from a claimed absence.
