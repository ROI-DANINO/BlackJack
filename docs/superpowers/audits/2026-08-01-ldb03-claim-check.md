# Verification record — LDB-03 eight-claim check

- **Run:** 2026-08-01-ldb03-claim-check
- **Verifier:** independent (did not collect the evidence, did not write the dossier; repairs nothing)
- **Target:** `docs/superpowers/specs/2026-08-01-activity-taxonomy-and-skill-mapping.md` (+ `2026-08-01-activity-taxonomy.json`)
- **Scope:** the eight claims named in the dispatch, and nothing else. No approval/rejection of the
  design is expressed or implied. No sufficiency verdict was requested by the dispatch ("check EIGHT
  load-bearing claims ... and nothing else"); none is issued.
- **Date:** 2026-08-01

Every source below was opened by this verifier this session. Nothing was accepted on the spec's or
an audit's say-so where the underlying source was reachable; two claims (C4, C5) were additionally
checked against the *original* external sources, not just the in-repo audit rows, because the
inherited-error class is this repo's founding defect.

---

## C1 — the engine claim — **CONFIRMED (all five clauses), one minor example-string defect**

**What I looked for, and where:** `crates/blackjack-core/src/shoe.rs` read at lines 1–60 (Card
construction, `create_shoe`), 62–136 (`create_prefix_shoe`), 138–159 (`deal_card`, `shuffle`),
164–189 (`rank_slug`, `suit_slug`). Callers checked: `crates/blackjack-core/src/session.rs:50`
(`create_prefix_shoe(ruleset.decks, ...)`), `crates/blackjack-core/src/rules.rs:17` (`decks: 6` in
the v1 ruleset), `crates/blackjack-core/tests/prefix_shoe_tests.rs:23,42,71,77` (all call with 6).

**Clause-by-clause:**

- **(a) real shuffled six-deck shoe — CONFIRMED.** Lines 82–97 build `decks * 52` cards with
  construction identical to `create_shoe` (same RANKS × SUITS loops, same id format), then
  `shuffle(&mut remainder, seed, 1)` — the same seeded Fisher–Yates used for organic shoes
  (lines 156–159). The function is deck-count-parameterised, not hard-coded to six; "six-deck" is
  accurate for every shipped call site (v1 ruleset `decks: 6`, all tests pass 6) and for the doc
  comment (line 62). Not a defect; noted for precision.
- **(b) same rank AND suit replacement, composition unchanged — CONFIRMED, of the code itself, not
  only the doc comment.** Line 104: `position(|c| c.rank == spec.rank && c.suit == spec.suit)` —
  the match is on both rank and suit. Line 112 removes exactly that card from the shuffled
  remainder; lines 113–122 push a synthetic card of the same rank and suit. One out, one in, per
  arranged card: total, per-rank, and per-suit multisets are unchanged. A prefix card unavailable in
  the shoe is a hard error (lines 105–111), so composition cannot silently drift.
- **(c) `deck_id: "arranged"`, ids `arranged-{index}-{rank}-{suit}` — format CONFIRMED, example
  string DEFECTIVE.** Lines 113–122: `card_id: format!("arranged-{index}-{}-{}", rank_slug(..),
  suit_slug(..))`, `deck_id: "arranged"`. **But** `rank_slug(Rank::Ten)` returns `"10"`, not
  `"ten"` (shoe.rs:175). The engine produces `arranged-0-10-hearts`; it never produces the spec's
  example `arranged-0-ten-hearts`. Same for the organic example `deck-3-ten-hearts` →
  actually `deck-3-10-hearts`. Face cards would be `J`/`Q`/`K`, ace `A`.
- **(d) organic ids `deck-{n}-{rank}-{suit}` — CONFIRMED.** Lines 84–93: `deck_id = "deck-{deck}"`,
  `card_id = "{deck_id}-{rank_slug}-{suit_slug}"`.
- **(e) provenance readable from ids alone, no new stored field — CONFIRMED.** `card_id` prefixes
  `arranged-` and `deck-` are disjoint; `Card` carries only `card_id, deck_id, rank, suit` and
  `ShoeState` only `seed, shoe_number, cards, cursor, discard, penetration_index` (lines 52–59,
  128–135). No provenance field exists or is needed.

**Correction required (minor):** spec §5, `2026-08-01-activity-taxonomy-and-skill-mapping.md:150-151`
— replace the example ids `arranged-0-ten-hearts` / `deck-3-ten-hearts` with the ids the code
actually emits: `arranged-0-10-hearts` / `deck-3-10-hearts`. Remedy: **editorial**; no collection.

---

## C2 — the claim that overturns U2 — **CONFIRMED**

**What I looked for, and where:** `docs/superpowers/research/activity-pattern-catalog/run/U2/audit.md`
line 80 (the word-bank rejected-candidate row) and line 81 (the Brilliant equation-tiles row), read
in full, against spec §3 (lines 75–79) and §3.2 (lines 99–102).

**What the source actually says (line 80, verbatim):** "**Borderline rejection, flagged for the
verifier.** Read literally, the learner does not 'select one of a presented finite option set' —
they select and order several. Rejected anyway because every element is supplied on screen and the
target is one arrangement of the supplied bank, so nothing is generated from scratch; and because
the dispatch explicitly steers past this format."

- Spec quote 1 — *"every element is supplied on screen and the target is one arrangement of the
  supplied bank, so nothing is generated from scratch"* — **character-identical** to the source.
- Spec quote 2 — *"Borderline … Rejected anyway … because the dispatch explicitly steers past this
  format"* — all three fragments verbatim; both elisions are marked with ellipses; the elided
  material ("rejection, flagged for the verifier"; "because every element ...; and") does not change
  meaning.
- **Characterisation judgment: fair.** The row's own operative measurement rationale is "nothing is
  generated from scratch" — calling that a *generation-from-scratch test* is an accurate name, and
  the row concedes the literal MCQ test ("Read literally...") did not reject the format. The spec's
  "half of that reason is dispatch scope" matches the row's two-reason structure joined by "and
  because". The spec's ground for overturning — that the recorded reason is part measurement, part
  process scope — is what line 80 says.

**Minor note (non-blocking):** spec line 79 quotes the equation-tiles row as *"on the same
rationale, for consistency"*; source line 81 reads "Rejected on the same rationale **as the Duolingo
word bank**, for consistency." The middle clause is elided *without* an ellipsis inside quotation
marks. Meaning is unchanged (the spec's sentence names Brilliant and the word-bank context), but
this is the same unmarked-elision class the U2 audit itself corrected twice (its C7, C10).
Recommended editorial fix at spec line 79: add an ellipsis or quote in full.

---

## C3 — the other side of the boundary — **CONFIRMED (one minor overstatement noted)**

**What I looked for, and where:** `run/U3/audit.md` line 23 (row U3-7) and line 18 (row U3-2), plus
the collector note at lines 69–71, against spec §3 (lines 80–83).

- *"the response is a permutation and subset over the fragment pool, not selection of one option
  from a presented set"* — **verbatim** from U3-7's Qualification cell (line 23). The "not-one-of-N"
  name is a fair label for that test.
- **Distractors:** U3-7's "What the learner does" cell reads "Given a scrambled set of solution
  fragments, **some of which may be** distractors that must be left unused". The spec asserts "Its
  pool **contains** distractors that must be left unused" — a flat "contains" where the source says
  "may be". The bolded fragment "distractors that must be left unused" is verbatim; the frame
  overstates an optional feature as a constant one. The §3.1 ruling does not hinge on distractors
  (it hinges on the order not being in the pool), so this is non-blocking. Recommended fix at spec
  line 82: "may contain distractors".
- **U3-2's word bank lesson-wide, not per-item — CONFIRMED.** Line 18: "a list of all key terms from
  the whole lesson is available as an aid, but no per-item option set is offered" and "the word bank
  spans the entire lesson rather than being a per-item option set". Collector note lines 69–71
  independently confirms this is the row the collector was least confident in — consistent with the
  spec treating it as a live boundary case.

---

## C4 — the numbers behind not requiring production — **CONFIRMED, first-hand from the original paper**

**What I looked for, and where:** `run/U3/audit.md` line 18 (row U3-2), **and** the original source
U3-S2, Roediger, Agarwal, McDaniel & McDermott (2011), fetched from
`https://pdf.retrievalpractice.org/guide/Roediger_Agarwal_etal_2011_JEPA.pdf` and read as rendered
PDF pages 389–391 this session — because a direction reversal here would invert the spec's §4
argument, and the inherited-error class demands the primary source, not the audit's copy.

**What the paper actually says (p.390, read as a rendered page):**

- "Performance was generally poorer for the short answer test by 6–7% because of the requirement to
  produce rather than recognize correct answers." — the spec's **6–7% lower on matched items** is
  confirmed.
- "Multiple-choice performance at the end of the semester following a short answer chapter exam (the
  second pair of rows of Table 6) was similar for **tested (70%) and nontested (73%)** items, which
  was **not reliable and obviously was opposite the predicted direction of effect, F = 1.50**." —
  **direction confirmed: tested = 70%, nontested = 73%**, exactly as the spec has it. Table 6
  corroborates: End-of-Semester (Chapter SA) means Tested .70 (.21), Nontested .73 (.18). No
  reversal.
- Quote fidelity: the spec's quotation "not reliable and obviously was opposite the predicted
  direction," drops the leading "was" (mid-sentence splice, acceptable) and the trailing "of effect"
  (trailing truncation, meaning unchanged). Not a defect.
- Nuance for the record, not a defect: the delayed 70/73 comparison is *multiple-choice* performance
  on the semester exam following a short-answer chapter exam; the spec's phrasing ("on the delayed
  end-of-semester exam the tested group ran 70% vs 73%") is consistent with this.

---

## C5 — the U1-3 quote — **DEFECTIVE (minor): quote truncated without ellipsis; both audit-history claims CONFIRMED**

**What I looked for, and where:** `run/U1/audit.md` line 145 (row U1-3) and line 185 (U1-S9 source
row), **and** the U1-S9 deck itself — the local copy recorded in the audit
(`.../7399fb2a.../webfetch-1785040410936-g41x32.pdf`), PDF page 11 (printed slide number 10,
"Three Relative Calibration Ranges"), opened first-hand this session as a rendered page.

**What the slide actually says (verbatim, first-hand):** "Individuals scoring between 17 and 19 on
range tests are not just better at trivia.  They are simply willing to use wider ranges.  Generally
about 2 to 10 times wider **than the people scoring far below average.**"

**What the spec prints (lines 284–285):** the quote ends *"Generally about 2 to 10 times wider."* —
the final clause "than the people scoring far below average" is dropped, with **no ellipsis**, and a
period inside the quotation marks presents the truncated fragment as the complete final sentence.
Meaning is not reversed — but the comparator that gives "2 to 10 times wider" its reference class is
gone, and this is the exact defect class (unmarked truncation inside a verbatim quote) that Phase 1
and the U2 audit's own corrections (C7, C10) established as reportable.

**Correction required:** spec line 285 — restore the tail: *"... Generally about 2 to 10 times wider
than the people scoring far below average."*, or mark the elision with an ellipsis. Remedy:
**editorial**; the full sentence is confirmed at source and also carried verbatim in
`run/U1/audit.md:145`.

**The other two C5 sub-claims, both CONFIRMED against `run/U1/audit.md:145`:**

- **Withdrawal on 2026-07-26:** the row states "(U1-S10 relays the same finding from the same
  originator, so it is **not** corroboration — corrected 2026-07-26)" and "the earlier word
  'independently' is withdrawn, because this is not a second measurement (corrected 2026-07-26...)
  ... The 11-of-20 figure therefore rests on one source, not two, and this pattern has no
  independent corroboration."
- **Provenance:** the row's Provenance cell reads "vendor-self-description / Product judgement";
  U1-S9's source row (line 185) is labelled vendor-self-description. The spec's "The deck's answer
  is procedural (an equivalent-bet test), not empirical" matches the row: "The deck's answer is
  procedural, not empirical: the equivalent-bet test is the device offered against arbitrary
  widening".
- Slide-numbering convention checked: the audit states the deck's printed numbers run one behind its
  PDF pages ("slide 11 here is printed '10'"); the rendered page I opened is PDF page 11, printed
  "10". The spec's "slide 11" follows the audit's stated convention. Consistent.

---

## C6 — the attribution question — **CONFIRMED, with the distinction stated precisely**

**What I looked for, and where:** `run/U3/audit.md` line 24 (row U3-8, Measures poorly cell) against
spec §8 (lines 293–295).

**The finding, precisely:** the sentence *"A raw score confounds item difficulty with skill, and
single items are near-useless."* is the **auditor's own topic-sentence gloss** — it opens U3-8's
Measures poorly cell *before* any page-cited Mellers quotation. It is not a sentence from Mellers
et al. (2014). The Mellers material quoted in the same cell supports it at two removes of strength:
the difficulty-confound half directly ("Because variability bears on question difficulty rather than
skill, we do not discuss it further", p.6; "removed selection effects by standardizing scores within
questions", p.4), and the single-items half only by worked example (the one close-call question
where trained teams averaged 1.44 vs untrained 1.31, p.9).

**Does the spec mislead?** No — read carefully, it is accurate: it attributes the sentence to
*"U3-8's own Measures poorly cell"*, which is a cell of the audit table, and the quoted words are
verbatim from that cell. A hasty reader could still take it for Mellers's sentence, because the
bullet two lines up introduces U3-8 as "Mellers et al. (2014)". The phrasing is technically correct
and the constraint it carries to LDB-04 (aggregate before thresholding) is *conservative* relative
to the evidence, which is the safe direction. **Recommended (non-blocking):** "from the audit's own
gloss in U3-8's Measures poorly cell" would close the ambiguity entirely.

---

## C7 — the Skill split — **CONFIRMED**

**What I looked for, and where:** `docs/superpowers/specs/2026-08-01-skill-graph.json` read in full;
the rule's origin searched by grep for `classificationIncluded|shape-named` across all repo `.md`
files, then read at `2026-08-01-learning-outcomes-and-skill-graph.md:255-264` and
`journal/decisions.md:327-328, 402-403, 419`; `journal/tasks.md` hits at lines 39 and 96 noted.

- **(a) exactly 18 skills — CONFIRMED by enumeration:** blackjack-foundations (12): card-values,
  hand-total, ace-value, bust, dealer-info, hit, stand, outcomes, wager-result, natural-blackjack,
  double, split; strategy-table-fundamentals (5): classify-hand, strategy-action, legal-fallback,
  variance-expectation, adherence-under-loss; rule-variation-literacy (1): read-rule-card.
  12 + 5 + 1 = 18. (Four more ids sit under `retired`, correctly outside the skill list.)
- **(b) CONFIRMED:** `strategy-action` (line 215), `legal-fallback` (line 230),
  `adherence-under-loss` (line 259) all carry `"classificationIncluded": true`.
- **(c) CONFIRMED:** `hit` (98), `stand` (111), `double` (166), `split` (181) all `false`.
- **(d) the 7-decision reading — defensible; I would re-sort nothing.** The seven (hit, stand,
  double, split, strategy-action, legal-fallback, adherence-under-loss) are exactly the Skills whose
  response is a legal table action. The two nearest boundary cases, checked deliberately:
  `classify-hand` (classificationIncluded: true) — its response is a category name (pair/soft/hard),
  not a legal action, so excluding it from "decisions" is right; `natural-blackjack`
  (classificationIncluded: true) — a stated predicate, not an action; also rightly excluded.
  `variance-expectation` produces a frequency, judged by catalog — not a decision. The spec's §4
  sentence "for all seven the response is a choice among ≤4 legal actions" holds for each.
- **The shape-named-prompt rule is inherited, not invented — CONFIRMED.**
  `2026-08-01-learning-outcomes-and-skill-graph.md:260-263`, verbatim: "A shape-named prompt
  ('soft 18 vs 9') supplies the Classification for free and may therefore only serve Skills whose
  Learning outcome has `classificationIncluded: false`." The same rule is recorded in
  `journal/decisions.md:327-328` ("A shape-named prompt supplies the Classification for free, so it
  may only serve outcomes flagged `classificationIncluded: false`") and its consequence chain —
  never shape-named → must show cards → cards from a shoe — at `journal/decisions.md:402-403`,
  which is the chain spec §4.1 restates. The spec is downstream of an approved LDB-01 rule.

---

## C8 — the interleaving figures — **DEFECTIVE (misplaced attribution; both figures real)**

**What I looked for, and where:**
`docs/superpowers/specs/2026-07-22-product-design-inputs.md` §1.1 read at lines 49–63 and the whole
file grepped for `72%`, `d=1.05`, `46`, `10%`, and `discrimination`;
`docs/superpowers/research/evidence-index/P2-verdict-catalog.md` §"Bottom line for re-planning" read
at lines 165–178; `docs/superpowers/specs/assumption-register.md` rows A-15 (line 63) and A-23
(line 71); spec §5 (lines 166–169) and §6.1 (lines 197–199); `2026-08-01-activity-taxonomy.json`
line 68 and `2026-08-01-skill-graph.json` line 206.

**What checks out:**

- "72% vs 38% (d=1.05)" **is** in product-design-inputs §1.1, line 54, `[VERIFIED]`-tagged, with the
  discrimination mechanism stated in prose (lines 56–57).
- "P2 Bottom line A.2" **resolves to a real record I opened:** `P2-verdict-catalog.md:170`, item
  **A.2**: "Interleaving improves discrimination; classification should be measured separately from
  action selection. Discrimination errors 46% vs 10%; 72% vs 38%, d=1.05." Spec §6.1's quotation
  *"classification should be measured separately from action selection"* is a verbatim substring.
- The JSON attributions (`activity-taxonomy.json:68`, `skill-graph.json:206`) credit both figure
  pairs to "P2 Bottom line A.2" — **correct as written there.**

**The defect:** "discrimination errors 46% vs 10%" appears **nowhere** in
`2026-07-22-product-design-inputs.md`. Positively enumerated: grep for `46` over the whole file
returns zero hits; grep for `discrimination` returns only lines 56 and 61 (mechanism prose, no
error figures); §1.1's only numbers are 72%, 38%, d=1.05, and n=140. Yet:

- **Spec §5, lines 167–169**, writes "§1.1's interleaving benefit is a **discrimination** benefit
  (72% vs 38%, d = 1.05; discrimination errors 46% vs 10%)" — attributing both pairs to §1.1.
- **Register row A-23** (`assumption-register.md:71`, a row this spec itself added) writes
  "`product-design-inputs` §1.1 `[VERIFIED]`: ... (72% vs 38%, d=1.05; discrimination errors 46% vs
  10%)" — same misattribution, and it borrows §1.1's `[VERIFIED]` tag for a figure §1.1 does not
  contain. (Row A-15, line 63, pre-existing, carries the same figure pair without a locus — outside
  my brief, noted below.)

**Correction required:** in `2026-08-01-activity-taxonomy-and-skill-mapping.md:168` and
`docs/superpowers/specs/assumption-register.md:71`, attribute "discrimination errors 46% vs 10%" to
**P2 Bottom line A.2** (`docs/superpowers/research/evidence-index/P2-verdict-catalog.md:170`) rather
than to product-design-inputs §1.1, or split the parenthetical so each figure carries its own locus.
The substance survives intact — the figure exists, in a record graded "Genuinely evidence-backed —
may be asserted" — only the pointer is wrong. Remedy: **editorial**; no collection.

---

## Verdict table

| Claim | Verdict | Corrections required |
|---|---|---|
| C1 — engine / `create_prefix_shoe` | **CONFIRMED** (all 5 clauses) | minor: example ids `ten` → `10` (spec §5, lines 150–151) |
| C2 — U2 word-bank quotes + characterisation | **CONFIRMED** | none required; recommended: mark elision in "on the same rationale ... for consistency" (line 79) |
| C3 — U3-7 / U3-2 boundary | **CONFIRMED** | none required; recommended: "contains distractors" → "may contain distractors" (line 82) |
| C4 — Roediger 6–7% / 70 vs 73 / F=1.50 | **CONFIRMED** (first-hand from the paper, p.390) | none |
| C5 — Hubbard slide 11 + withdrawal + provenance | **DEFECTIVE (minor)** | restore "than the people scoring far below average." or add ellipsis (line 285); other two sub-claims confirmed |
| C6 — "raw score confounds..." attribution | **CONFIRMED** | none required; the sentence is the auditor's gloss, and the spec attributes it to the cell, which is accurate |
| C7 — skill graph 18/7 split + inherited rule | **CONFIRMED** | none |
| C8 — interleaving figures | **DEFECTIVE** | re-point "46% vs 10%" from §1.1 to P2 Bottom line A.2, in spec line 168 **and** register row A-23 (line 71) |

All required corrections are **editorial** — every underlying source is already held and was opened;
no collection pass is needed for any of them.

## Claims I could not open, and why

**None.** All eight claims were checked against sources opened first-hand this session, including
the two external primaries: Roediger et al. (2011) full text (fetched from the audit's recorded
URL, pages 389–391 read as rendered pages) and the Hubbard Module-1 deck (the audit's recorded
local copy, PDF page 11 read as a rendered page).

## Things I noticed that were not in my brief

1. **The dispatch's own rendering of the C5 quote differs from the file.** The dispatch quoted the
   spec as including "than the people scoring far below average." — the spec on disk (line 285) does
   not include it. The truncation is in the file; the dispatch text appears to have been written
   from the source sentence rather than the spec's. Worth knowing when reconciling this record.
2. **Register row A-15** (`assumption-register.md:63`, pre-existing, not written by LDB-03) carries
   the same "discrimination errors 46% → 10%" figure with no locus. If the C8 correction lands, A-15
   could take the same P2-A.2 pointer in the same editorial pass — one file, one line.
3. **Spec §5 cites `shoe.rs:62`** — line 62 is the doc comment; the function signature is line 66.
   Immaterial (the comment is part of the item), noted only for completeness.
4. Incidentally verified while in the files, all sound: spec §2's "73.3% vs 73.5% (p = 0.93)"
   matches U1-7's cell (`run/U1/audit.md:149`, sourced to U1-S16's Abstract); "r = 0.81 / r = 0.51"
   matches RN-1 §3(d) (`run/U3/audit.md:209-213`, Table 5 figures); the §2 stimulus quote matches
   `run/U1/audit.md:130-131` with the parenthetical properly elided by a marked ellipsis; and the
   §7.3 Kornell & Bjork 78%/78% figures match `run/U3/audit.md:33`.
