# The Learning Design Blueprint — `LDB-08`

> **Status: reassembled 2026-08-22, awaiting owner approval.** This is phase 4's gate artifact. It
> assembles the approved decisions named in `LDB-08`'s `Depends on` — `LDB-01` through `LDB-06`, plus
> `LDB-09`, `LDB-10` and `LDB-11` — and names the phase-5 slice with the `P-` subset that slice must
> instrument. It also **cuts the Units**, which `2026-08-08-session-composition.md:522` assigned here
> — *"Where the Unit boundaries fall is `LDB-08`'s to cut"* — and which no earlier draft carried.
>
> **The 2026-08-22 reassembly.** `LDB-11` (approved 2026-08-22) joins the assembly: **74 → 91
> decisions**. It is not an append — three already-assembled decisions move with it (D14, D15, D16;
> see §13). The Unit cut is new (§14). Everything the reassembly changed is listed in §15, and the
> owner rulings behind it are recorded in `journal/decisions.md`. **Section numbers §0–§12 are
> unchanged on purpose**: §7.3 is cited by `LDB-11` §7 row 9 and by `ROADMAP.md`, so new material
> appends rather than renumbers.
>
> **Assembled against `[VERIFIED]` on bridge §1.4 and §1.6.** This is the card's named obligation and
> this line is the answer to it. The owner lifted both tags from `[DEFECTIVE-SOURCE]` at the `LDB-10`
> gate on 2026-08-17. **Verified first-hand for this assembly by opening the file, not by relaying the
> card:** `2026-07-22-product-design-inputs.md:120` and `:138` both print `[VERIFIED]` in the section
> headings, `:55-77` records the ruling and the declined `[REPAIRED]` fourth tag value, and
> `journal/decisions.md` carries it as Ruling 1 of three at that gate.
>
> **What this document is not.** It is not a re-decision. Every ruling below was approved at its own
> user-approval gate and is reproduced here with its evidence label, not re-argued. Where this
> assembly changed something, it is marked **[CHANGED AT ASSEMBLY]** and says what and why — there are
> **five**, all listed in §8, and **none of them moves a decision**. Two are corrections to claims that
> a prior gate had already been told about and approved past. The 2026-08-22 reassembly's own changes
> are listed separately in §15, under the same rule.

---

## 0. What this document decides, and what it does not

**Decides:** the phase-5 slice, the subset of `P-1`…`P-5` that slice must instrument, and — new on
2026-08-22 — **where the Unit boundaries fall and in what order the Units run** (§14). The cut is the
one thing here that is not a reproduction: `LDB-06` **D6**'s own text assigned it to this card while
deciding which Skills an entry goal may name — *"Where the Unit boundaries fall is `LDB-08`'s to cut
(`A-30`), so this decision states the rule and not the cut, and needs no edit when the levels are
drawn"* — `LDB-11` §9 and `LDB-07` §705 both put it out of scope pointing at
`A-30`, and no document drew it. Everything else assembled below was decided at its own gate.

**Does not decide:** interaction UX. That is `LDB-07`, which is a **sibling** of this card, not a
predecessor — both are unblocked by `LDB-06`, and `LDB-07` depends on `LDB-03`, `LDB-06` and `LDB-09`.
This blueprint is approvable without it. **Phase 4 is not**: `LDB-07` is ROADMAP deliverable 7, so the
phase exit needs both. Stated because the distinction has already gone wrong once — `LDB-08`'s
approval criterion originally demanded `LDB-07`'s decisions and was corrected on 2026-08-17.

**Does not decide** the visual system (phase 6), or any number this product has not measured on its
own data. Every threshold below is `[Assumption]` with a register row, or `[Product judgement]`.

**Also does not decide, and these are named because the Unit cut makes them look adjacent:** which
Skills a Unit Challenge tests (`LDB-11` D11 — coverage-complete over the Unit's gated Skills, and this
document only supplies the Units), and the Recommender's banding (`LDB-06` D14).

---

## 1. What is taught — the skill graph

`LDB-01`, approved 2026-08-01. Source: `2026-08-01-learning-outcomes-and-skill-graph.md` +
`2026-08-01-skill-graph.json`.

**18 Skills across 3 Subjects, with 4 Condition axes left open.**

| Subject | Skills | Count |
|---|---|---|
| `blackjack-foundations` | `card-values`, `hand-total`, `ace-value`, `bust`, `dealer-info`, `hit`, `stand`, `outcomes`, `wager-result`, `natural-blackjack`, `double`, `split` | 12 |
| `strategy-table-fundamentals` | `classify-hand`, `strategy-action`, `legal-fallback`, `variance-expectation`, `adherence-under-loss` | 5 |
| `rule-variation-literacy` | `read-rule-card` | 1 |

**Retired:** `goal`, `round-flow`, `split-hands`, `complete-round`.

> **A reading trap, resolved here rather than left for the next reader.** §8 of that spec is titled
> *"The shipped 16 Skills"* and says *"twelve survive"*, while the graph totals 18 and the board's
> approval record says 18. These do not conflict. **16** is what the *existing shipped code* declares
> (`web/src/learn/content/blackjack-basics.ts:14-29`); 12 of those survive as Subject A, and Subjects
> B and C contribute 6 more, for 18. Verified by counting the JSON: 12 + 5 + 1 = 18.

**The decisions, with labels:**

| # | Decision | Label |
|---|---|---|
| §1–2 | An outcome states an observable behaviour and names its grading authority; Conditions are deliberately absent from the outcome form | `[Product judgement]` |
| §3 | Prerequisites mean comprehension, not teaching order | `[Product judgement]` |
| §4 | The 7-stage hierarchy is **split, not adopted** — stages 4–7 become Conditions of performance, not content | `[Product judgement]`, retires `A-01` |
| §5.1 | Probability, EV and variance ship **only where they change a decision** — no maths Subject, no lesson unit | `[Evidence-backed]` on bridge §1.7 `[VERIFIED]` |
| §5.2 | **EV is not taught explicitly** — it gets no Skill and appears only as rationale in feedback copy | `[Product judgement]`, provisional on `P-2` / `A-14` |
| §5.3 | The false heuristic is an **explanatory frame, never a policy** | `[Product judgement]`, provisional on `P-4` / `A-16` |
| §5.4 | The phase-5 playtest subset is `P-1`, `P-3`, `P-5` | `[Product judgement]` — and see §6 below |
| §6 | Condition **cells are derived, not authored** | `[Product judgement]` |
| §7 | The graph ships as **data**, not code | `[Product judgement]` |
| §8 | **The shipped 16 Skills, restated** — 12 survive; four compounds lose their "explain" half, `complete-round` demotes to a Condition, `goal`/`round-flow`/`split-hands` are dropped. Ids kept wherever the referent survives | `[Product judgement]`, `[Evidence-backed]` on the shipped declaration |

---

## 2. Through which activities — the taxonomy

`LDB-03`, approved 2026-08-01, extended by `LDB-09` 2026-08-15. Sources:
`2026-08-01-activity-taxonomy-and-skill-mapping.md` + `2026-08-01-activity-taxonomy.json`.

**11 Activity types — 6 graded, 5 ungraded.** The individuating axis is **SHOWN × PRODUCED ×
WITHHELD**; the widget is deliberately *not* part of the taxonomy, which is why `LDB-07` can choose
interactions without reopening this.

| Type | Graded | `primaryFor` |
|---|---|---|
| `deal-and-decide` | yes | `hit`, `stand`, `double`, `split`, `classify-hand`, `strategy-action`, `legal-fallback`, `adherence-under-loss` (8) |
| `state-report` | yes | `card-values`, `hand-total`, `ace-value`, `bust`, `dealer-info`, `outcomes`, `wager-result`, `natural-blackjack` (8) |
| `rule-card-read` | yes | `read-rule-card` (1) |
| `predict-then-reveal` | yes | `variance-expectation` (1) — **no bar**, see `LDB-04` D12 |
| `policy-paint` | yes | — (secondary only) |
| `rule-contrast` | yes | — (secondary only; records its grade, **never surfaces a verdict**) |
| `hand-sort`, `estimate-and-check`, `procedure-order`, `principle-name`, `rule-battery` | **no** | — each declares a non-empty `rehearses` |

**Coverage: 18 of 18 Skills carry primary evidence; 11 of 11 types declare coverage or rehearsal.**
No Skill was found uncoverable, so nothing reported back to `LDB-01` — recorded as a **result**, not a
gap.

**32 catalog patterns disposed:** 3 adopted-as-type, 10 adopted-as-parameter, 4 no-target, 15
rejected. **19 unadopted patterns re-verdicted for play** by `LDB-09`: 6 admitted → 5 types, 1
admitted as a parameter, 2 reported forward, 10 declined.

| # | Decision | Label |
|---|---|---|
| §2 | Individuation is SHOWN × PRODUCED × WITHHELD | `[Product judgement]` |
| §3.1 | The **pool ruling** — a supplied pool is cosmetic when it discloses part of what is measured, substantive when the measured target is not in it | `[Product judgement]` |
| §4 | The **recognition ban bites on the stimulus**, not the response | `[Product judgement]` |
| §5 | Provenance has three states (`organic` / `arranged` / `authored`) and costs **zero schema delta** | `[Evidence-backed]` on the shipped schema |
| §6 | The six graded Activity types | `[Product judgement]` |
| §6.1 | `classify-hand` is a **sub-response inside `deal-and-decide`**, not a type | `[Product judgement]` |
| §7 | All **32 catalog patterns disposed** — 3 adopted-as-type, 10 adopted-as-parameter, 4 no-target, 15 rejected | `[Product judgement]` |
| §8 | `predict-then-reveal` produces **one number** | `[Product judgement]` |
| `LDB-09` D1 | A type may grade nothing if it declares what it `rehearses` | `[Product judgement]` |
| `LDB-09` D2 | Five ungraded types, **ranked by cost, not capped by count** | `[Product judgement]` |
| `LDB-09` D3 | `rule-contrast` gains a `probe` parameter — U2-6 is a parameter, not a type | `[Product judgement]` |
| `LDB-09` D4 | All 19 unadopted patterns ruled for play | `[Product judgement]`, `[Evidence-backed]` on the quotations |
| `LDB-09` D5 | All eight `state-report` Skills **keep their Skill and their Mastery bar** — neither horn the card offered was taken | `[Product judgement]`, `[Evidence-backed]` — owner ruling 2026-08-15 |
| `LDB-09` D6 | Hand-total disclosure is a **new Condition** (`totalsDisclosure`) — `tableVisibility` does not cover it | `[Evidence-backed]`, `[Product judgement]` |
| `LDB-09` D7 | `state-report` evidence is produced **in situ** during play, riding `LDB-06` D2's capture mechanism | `[Product judgement]` |
| `LDB-09` D8 | Ungraded activities are **recorded, never window-eligible**, and cost no schema change | `[Evidence-backed]`, `[Product judgement]` |
| `LDB-09` D9 | **`LDB-01` is not amended** — all 18 Skills and all 17 bars stand. Stated positively, as a result | `[Evidence-backed]` |
| `LDB-09` D10 | The play verdicts make **`A-18` closable** — five ungraded types now exist; `hand-sort` is the cheapest instrument and carries the first attempt | `[Product judgement]` on routing, `[Evidence-backed]` on the row's method |
| `LDB-09` D11 | Whether ungraded activities consume the session bound is `LDB-06`'s — **and must be asked** | `[Product judgement]` — asked, and answered at `LDB-06` D7 (§4) |

**Two deliberate absences, recorded as results:** the word-bank versus Parsons boundary is ruled and
then attaches to no Skill; and no Skill was found uncoverable.

> **[MOVED BY `LDB-11`, 2026-08-22]** `LDB-11` **D14** puts **session-shape legality into the taxonomy
> data** — `2026-08-01-activity-taxonomy.json` now carries legality over **three** shapes, not two, and
> `scripts/check-ldb03-taxonomy.js` gained checks 9–11 to enforce it. The 11 types and their
> `primaryFor`/`rehearses` sets above are **unchanged**; what changed is that where a type may legally
> appear is now data rather than prose. Stated here so a reader of §2 is not working from a two-shape
> world. See §13.

---

## 3. Measured by what evidence — mastery

`LDB-04`, approved 2026-08-03. Source: `2026-08-03-evidence-and-mastery-rules.md`.

**A Skill is mastered at 8 of the last 10 table-closed presentations, scored on first response, with
at least one organic presentation where the Skill includes Classification.** Two constants total. No
weight table, no decay constant, no per-family rule.

| # | Decision | Label |
|---|---|---|
| D1 | One mastery state **per Skill**; the bar names a required Condition, and only `support` sets it | `[Product judgement]` |
| D2 | The bar is a **window proportion** (k of last n); the **display ratchets**, every other consumer reads the live window | `[Product judgement]` |
| D3 | The unit is the **presentation**, scored by its **first response** | `[Product judgement]` on `[Evidence-backed]` schema annotations |
| D4 | Consulting a resource is offered explicitly and keeps the presentation **out of the window** | `[Product judgement]` |
| D5 | Abandoned presentations are recorded and excluded — **not** counted as failures | `[Product judgement]` |
| D6 | Only `primaryFor` evidence enters the window | `[Evidence-backed]`, `[Product judgement]` |
| D7 | At least one **organic** presentation for Skills including Classification | `[Product judgement]`, `[Evidence-backed]` — `A-23` |
| D8 | Mastery **does not decay with time**; `Review due` is triggered by the window falling, never the calendar | `[Evidence-backed]`, `[Product judgement]` — `A-06` takes no sub-row |
| D9 | **Mastery locks nothing** — it drives a strong recommendation and gates no content | `[Evidence-backed]` |
| D10 | The criteria are **published** — rule and live count both | `[Product judgement]` |
| D11 | The six `LDB-03` parameter values owned here (the board's handoff named five; `space` was omitted) | — |
| D12 | `predict-then-reveal` scores a **signed error and carries no bar** | `[VERIFIED]` bridge §1.2, `[Product judgement]` |
| D13 | `k = 8`, `n = 10` | **`[Assumption]` — `A-07a`** |
| D14 | `K-U6-003` landed in corrected form | `[Evidence-backed]`, `[Product judgement]` |
| D15 | `K-U6-005` — both loci fixed, rename taken | `[Evidence-backed]` |

---

## 4. In what order — session composition

`LDB-06`, approved 2026-08-17. Source: `2026-08-08-session-composition.md`. **18 decisions.**

> **Carried forward, not hidden:** that spec's own header records that its 2026-08-17 repairs were
> written by the session that found the defects and are **not independently verified**. This assembly
> did not re-verify them either; it reproduces the decisions and their labels. Anyone treating D1–D18
> as independently checked would be wrong.

| # | Decision | Label |
|---|---|---|
| D1 | **Two session types, and only two** — a Learning session and a Table sitting | `[Product judgement]` |
| D2 | A Table sitting's decisions **enter the Mastery window** — 4 Skills by default, 8 on request | `[VERIFIED]`, `[Evidence-backed]`, `[Product judgement]` |
| D3 | **Engineered exposure teaches**; `LDB-04` D7's organic floor closes the claim | `[VERIFIED]`, `[Evidence-backed]`, `[Product judgement]` |
| D4 | Blocked vs mixed stated **per Activity type** — it bites on 3 of 11 | `[Evidence-backed]`, `[Product judgement]` |
| D5 | The three unordered Condition axes **stay unordered** | `[Product judgement]` |
| D6 | Entry: a named goal the learner may override, and **an activity on screen before any choice** | `[Product judgement]` |
| D7 | Size: three presets, bounded by **Presentation count**; minutes are an estimate, never enforced | `[Product judgement]` — diverges from `ALR-027`, owner-approved |
| D8 | Stopping: four exits; **the session never refuses to continue** | `[Product judgement]`, `[Evidence-backed]` |
| D9 | Two session shapes, with `feedbackTiming` and `segmentation` **bound together**, never toggled independently — **now three**, see the note below | `[Product judgement]`, `[Evidence-backed]` — **[AMENDED BY `LDB-11` D16]** |
| D10 | The app **never withdraws the strategy table**; the rule card is always available | `[Product judgement]` |
| D11 | `revealMode: play-it-out`; the sandbox is **deferred, not rejected** | `[Evidence-backed]`, `[Product judgement]` — **[CHANGED AT ASSEMBLY]**, see §8 |
| D12 | `region: named-region` | `[Product judgement]` |
| D13 | Practice opens **per Skill**, at one recorded Presentation | `[Product judgement]` |
| D14 | The Recommender's ordering is **fixed and published** | `[Product judgement]`, `[Evidence-backed]` |
| D15 | `pace: untimed` in v1; `timed` exists only as table character | `[Product judgement]` |
| D16 | The debrief: four contents and **one prohibition** | `[Evidence-backed]`, `[Product judgement]` |
| D17 | Committed Presentations persist; in-progress session state does **not** | `[Evidence-backed]`, `[Product judgement]` — diverges from `ALR-029`, owner-approved |
| D18 | First contact with a Skill is a **Tutorial**, and a Tutorial **never counts** | `[Product judgement]`, `[Evidence-backed]` — owner decision 2026-08-17 |

> **[AMENDED BY `LDB-11`, 2026-08-22]** D9's shape table gains a **third row: the Proving run**
> (`LDB-11` D16). The pairing rule is untouched — `feedbackTiming` and `segmentation` are still set
> together and never toggled independently — and `RC-03` is **unchanged**, which `LDB-11` §7 row 1
> states explicitly so a reader does not go hunting for an edit that was not made. The Closing run and
> the Proving run share both table-state and feedback timing, which is why `LDB-07` D6 has to name the
> shape at entry and why `A-33` exists. See §13.

**`LDB-09` D11 handed one question here, and it is ANSWERED — not open.** Do ungraded activities
consume the session bound? **They do** (owner decision 2026-08-17, recorded inside D7). The first horn
was taken: fun and evidence share one budget, and the cost is stated rather than left to be
discovered — *"three rounds of `hand-sort` in a Short session leave seven graded hands."*

> **The better outcome, worth reading back.** The question exposed an **existing false ground** rather
> than creating a problem. D7's 2026-08-08 draft justified counting by Presentation on the basis that
> bound and evidence are *"commensurable"* because both count Presentations. **That was already false
> when written** — an abandoned Presentation (`LDB-04` D5) and a chart-open Presentation (`LDB-04` D4)
> each consume the bound and fill no window. The Short preset now reads ***at most*** one Mastery
> window rather than exactly one.

**A debt carried into this assembly is itself mistaken, and is discharged here rather than passed on.**
The `LDB-06` checkpoint recorded that `LDB-09`'s ANSWERED note *"credits `LDB-06` D14 with deciding the
session mix when it is D7's Presentation bound that does."* **Checked against the source: the note is
right and the debt is wrong.** D7 decides the *bound*; D7's own text then assigns the *mix* to D14
verbatim — *"**D14's type-selection rule decides the mix rather than a cap**"* — on the ground that a
ceiling on the Unmeasured share would be a number with nothing behind it, which `A-07` forbids. Bound
and mix are two questions, and `LDB-09` attributed each correctly. **No amendment to `LDB-09` is owed
on this point.**

---

## 5. Why the learner comes back — the economy

`LDB-05`, approved 2026-08-05. Source: `2026-08-04-motivation-and-chips-economy.md`.

**Chips are earned by winning *or* learning; money never buys chips; chips buy table time and nothing
else; three meters are never blended.**

| # | Decision | Label |
|---|---|---|
| D1 | The wallet is **unwalled and persists**; no cap on winnings | `[Product judgement]`, `[Evidence-backed]` — `A-20` |
| D2 | Buy-in is a **real transfer** bounded by the table; cash-out returns everything | `[Product judgement]`, `[Evidence-backed]` |
| D3 | A wallet that cannot cover a seat is a **real setback**, and **learning is the only refill** | `[Product judgement]` |
| D4 | Practice is the **standing faucet**, bounded by coverage rather than quantity | `[Product judgement]` |
| D5 | Pay tier: **full rate, then trickle** | `[Product judgement]`, **`[Assumption]` `A-07c`** on the rates |
| D6 | Free Play **opens early**; mastery gates table *character*, not access | `[Product judgement]` |
| D7 | **Three meters, three jobs, never blended** | `[Evidence-backed]` |
| D8 | The link is a **rate coupling** — the rating scales XP earn rate | `[Product judgement]` |
| D9 | The rating ingests Free Play decisions, **graded by the oracle** — it moves with how you played, not what you won | `[Evidence-backed]` |
| D10 | The rating fits **per learner, online**, from a published default — no minimum population | `[Evidence-backed]`, `[Product judgement]` — `A-24` |
| D11 | The leaderboard is **deferred** — inherited from `CLOUD-06`, not decided here. **State changed by `LDB-11` D15**, which makes replay verification the declared target and gives the deferral a named precondition rather than an open end; D12's four prohibitions are **untouched**, and `LDB-11` §7 row 2 says so positively | `[Evidence-backed]` — **[AMENDED BY `LDB-11` D15]** |
| D12 | Four prohibitions on what this economy may **never** do | `[Evidence-backed]`, `[Product judgement]` |

**Stake constants are `[Assumption]` `A-07b`** — every number invented. Phase 5 ships **one tier**;
the table catalogue is deferred to phase 6 on reversal cost, because it lands in the Rust `Ruleset`
and crosses the WASM boundary, the JSON wire contract, and the golden fixtures.

---

## 6. The `P-` subset — stated as exclusions, not inherited as coverage

The five questions are settled as **unanswerable from literature** and routed to playtest.

| # | Question | Disposition |
|---|---|---|
| `P-1` | Can learners be trained to evaluate decisions independently of the hand result? | **IN** |
| `P-2` | Does EV instruction change play? | **OUT — deliberate exclusion** |
| `P-3` | Does mixed practice help this audience, or overwhelm beginners? | **IN** |
| `P-4` | Does a false-but-cheap heuristic beat correct strategy for novices? | **OUT — deliberate exclusion** |
| `P-5` | Does confidence rise faster than skill? | **IN** |

**`P-2` and `P-4` are excluded because they are unanswerable *by this product*, not because no slice
happened to cover them.** `P-2` has **no EV-instructed arm to measure**, because `LDB-01` §5.2 gives
EV no Skill at all. `P-4` has **no heuristic-policy arm**, because `LDB-01` §5.3 adopts the false
heuristic as an explanatory frame only. Recording them as exclusions is this card's named obligation
and this table discharges it.

**The declared subset is `P-1`, `P-3`, `P-5`.** `A-14` (EV) is **dormant with a reopening condition**:
if insurance is ever surfaced as teachable, that row wakes and `P-2` returns. `A-16` (the heuristic)
keeps its validation method unchanged.

---

## 7. The phase-5 slice

### 7.1 What the standing candidate actually is

`docs/superpowers/specs/2026-07-23-graded-decision-practice-design.md`, approved 2026-07-25 as ROADMAP
deliverable 8 — it predates the board and has no card.

**It is not a rival design that won a comparison. It is one parameterisation of one Activity type**:
`deal-and-decide`, with `feedbackTiming: deferred-to-debrief` and `scoringGranularity: binary`.
`LDB-03` established this and the blueprint states it rather than presenting the candidate as a
survivor. **Confirming it means confirming a parameter setting.**

**Three separate cards warned against confirming it by convergence, and none of them is independent
support:**

- `LDB-02`: `activity-pattern-catalog/buildability.md`'s build recommendation is **the same author's
  unreviewed judgement converging on the pre-existing plan**, and that file now says so.
- `LDB-01` §5.4: the candidate covering exactly `P-1`/`P-3`/`P-5` is **convergence, not
  confirmation** — and §5.4 applies that caution to its own reasoning.
- `LDB-03`: it is a parameter setting, so there was never a comparison to survive.

### 7.2 The core, and what grew around it

*Retitled 2026-08-22 (owner ruling). The earlier title — "Recommendation — confirm the
parameterisation, and state what phase 5 grew around it" — still described a phase whose growth was
three bullets long. It is now nine items, and ground 1 below ("genuinely no-engine-change") is a
claim about **one component**, not about phase 5. Restating rather than splitting into 5a/5b was
ruled deliberately: `P-5`'s instrument **is** the declaration record (§7.3), so a 5a without
Challenges would exit without instrumenting its own declared subset — the exact failure `ROADMAP.md`
§Phase 5's second exit clause exists to prevent.*

**Confirmed.** The `deal-and-decide` / `deferred-to-debrief` / `binary` parameterisation is the right
first slice, on grounds that do not depend on the convergence above:

1. **It is genuinely no-engine-change.** `LDB-02` verified this for the binary form (U1-5 plus the
   existing reveal). The EV-graded upgrade is **not** — and it is now **foreclosed** anyway, because
   `LDB-01` §5.2 gives EV no Skill. The Medium-to-Large costing `LDB-02` attached to it is retired.
2. **It wires both orphans** — the strategy oracle gets a `CoreCommand`, and `ProgressStore` gets its
   first product consumer.
3. **It reaches the densest part of the graph.** `deal-and-decide` is `primaryFor` **8 of 18 Skills**,
   more than any other type.

**But the slice as written on 2026-07-23 predates `LDB-01`, `LDB-03`, `LDB-04`, `LDB-05`, `LDB-06` and
`LDB-09`.** Phase 5's scope has grown around it, and inheriting the 2026-07-23 document as-is would
silently drop work that later cards assigned to phase 5:

- **The economy** (`LDB-05` deltas 1–4 and 6) — Wallet, buy-in and stack transfer, `Completion` and
  `Review due` paying, the practice trickle, XP and the Player score. Added to phase 5 by owner
  decision 2026-08-15 **because no phase had claimed it**. `LDB-05` D3 is unplayable without it.
- **Tutorials** (`LDB-06` D18, added at the 2026-08-17 gate) — first contact with a Skill is a
  Tutorial, and a Tutorial never counts. A slice that grades a learner's first-ever presentation
  violates this.
- **The `LDB-06` D9 shape pairing** — `feedbackTiming` and `segmentation` are set as a pair and never
  toggled independently. The candidate names only `feedbackTiming`.
- **The window predicate** — `LDB-06` §11 item 8, which carries the standing approval condition below.

**Added 2026-08-22, and this is what turns three bullets into nine.** Owner rulings of 2026-08-22,
recorded in `journal/decisions.md`:

- **The Skill Challenge and the declaration record** (`LDB-11` D13). Not optional scope: `P-5` is in
  the declared subset and the declaration record is its **only** instrument, so a phase 5 without it
  cannot meet the ROADMAP exit clause.
- **Units and the Unit Challenge** — the cut in §14, eight Units over all three Subjects.
- **Subject B's Units** specifically, because that is where the confirmed slice's Skills live.
- **Two Unmeasured Activity types, `hand-sort` and `rule-battery`**, built for Challenge warm-ups
  only. They do **not** appear in ordinary Learning sessions (owner ruling; §13 records the cost).
- **The Tutorial re-homing, then the retirement of `web/src/learn/content/blackjack-basics.ts`** —
  in that order, so there is never a moment with two live Unit structures (§14.4).

**Ground 1 restated honestly.** *"Genuinely no-engine-change"* remains true of the
`deal-and-decide` × `deferred-to-debrief` × `binary` parameterisation and is **not** true of phase 5
as a whole: `LDB-05` delta 5 puts a table tier into the Rust `Ruleset` — deferred to phase 6 on
reversal cost, but phase 5 still ships one tier and delta 6 reads it. The confirmation of the
parameterisation stands on all three original grounds; the phase around it does not inherit them.

### 7.3 What the slice must instrument — the phase-5 exit condition

Phase 5 **cannot exit** until, for each declared question, there is a **named field or pair of fields
recorded per attempt** and a **written query that would answer it** once enough data exists — the
instrument, not the verdict. *Reworded 2026-08-22 at the `LDB-11` gate (D3; §10 divergence 4,
approved with a tightening): the earlier wording — "without **answering** these from recorded attempt
data" — was unmeetable at n = 1 (`A-24`: this product has one user) or an invitation to read a
longitudinal curve off ten hands. The tightening: the query is **written** below, not described, so
a fields-exist claim cannot pass as instrumentation. The same rewording lands at `ROADMAP.md` §Phase 5.*

| Question | What must be recorded | Where it comes from |
|---|---|---|
| `P-1` | Decision correctness and hand outcome as **separate** fields per attempt, so agreement between them is measurable rather than assumed | `LDB-05` D9 already grades every decision by the oracle independently of the win; `LDB-05` D12 forbids leading with profit/loss |
| `P-3` | The `blocked` / `mixed` setting per Presentation, against first-response correctness | `LDB-06` D4 — it bites on 3 of 11 types, and `deal-and-decide` is one |
| `P-5` | The **declaration record** (`LDB-11` D13) — every learner-initiated Challenge request, with the Mastery window snapshot at that moment, alongside first-response correctness | `LDB-11` D1 (approved 2026-08-22): the **request** is the confidence signal. The product never asks a self-rating. *Rewritten 2026-08-22 — this row read "a **self-rated** confidence signal", which `LDB-11` D1 forbids.* |

**The queries, written (2026-08-22).** Field names are `web/src/progress/types.ts` `ProgressAttempt`
where the field exists today and `LDB-11` D13's declaration record where it does not; a name phase 5
must add is marked *(to add)*.

> **Re-verified first-hand at the 2026-08-22 reassembly by opening `web/src/progress/types.ts`, not
> by relaying this section.** Present: `attemptOrdinal` (`:73`), `AttemptDisposition` with `status`
> and `correct` (`:46-50`, `correct` existing **only** on the two `status: 'graded'` variants, so a
> query filtering on it must filter `status = 'graded'` first), `evidence.subjectId` (`:77`),
> `evidence.skillId` (`:79`), `engine.outcomes: HandOutcome[]` (`:60`).
> **Absent, enumerated positively rather than assumed:** `poolSetting`, `won`, `confidence` and
> `totalsDisclosure` each return **0** hits in that file. So `won` is genuinely derived and
> `poolSetting`'s *(to add)* is genuinely owed.
>
> **`evidence.unitId` already exists** (`:78`, inside the `evidence` block at `:76-80`). The durable attempt record has been Unit-aware since
> `ProgressStore` cycle 1; §14's cut **fills a field that is already there** rather than adding one.
> This is the single largest reason the cut costs less than it reads.

- **`P-1`** — over `ProgressAttempt` where `attemptOrdinal = 1` and `disposition.status = 'graded'`:
  group by `(disposition.correct, won)` where `won` is derived from `engine.outcomes`; report
  `P(correct | won)` against `P(correct | lost)`. The two rates should not differ; a gap is
  outcome-bias in the evidence, which `LDB-05` D9 says the oracle already prevents at grading time.
- **`P-3`** — over `ProgressAttempt` where `attemptOrdinal = 1`: group by `poolSetting` *(to add:
  `blocked | mixed`, per Presentation — `LDB-06` D4)* × `disposition.correct`; report first-response
  accuracy per setting, per `evidence.skillId`, over time.
- **`P-5`** — over the declaration record (`LDB-11` D13) where `initiatedBy = 'learner'`: for each
  declaration, `windowStateAtDeclaration` says whether the bar was met at that moment and `outcome`
  says whether the Challenge cleared. The series is `declaredAt` → (bar met?, cleared?); the
  divergence `P-5` asks about is the count of *asked while the bar was not met* against the count of
  *cleared* in the same window — confidence running ahead of, or behind, measured Mastery. Nothing
  here is self-rated: `LDB-11` D1 makes the request the signal.

> **`P-5`'s open item is CLOSED, and the rewrite the superseded note promised is done.** The two
> callouts that stood here — one saying this row read *self-rated confidence*, one saying phase 5
> must add a confidence capture or drop `P-5` — are **removed, not merely marked**, because
> `LDB-11` D1/D13 settled the question and a document that keeps a superseded instruction beside the
> settled one is how this repository's citation failures start. The resolution: the learner's
> **request** for a Challenge is the signal, the product never asks *"how confident are you?"*, and
> `LDB-11` D13's declaration record is the capture. `P-5` **stays in the declared subset**.
>
> **The cost of that instrument, recorded here and not only in the register.** `A-17a` states it
> plainly: *"this measures only learners who **act** on their confidence. A learner who feels ready
> and never asks is **invisible**."* `P-5` asks whether confidence outruns skill, and the
> silently-overconfident learner is precisely the population it is about. This is a **known blind
> spot in the instrument**, accepted on the owner ruling of 2026-08-22 rather than patched with a
> self-rating prompt that `LDB-11` D1, `LDB-05` D12 and `LDB-06` D16 all push against. It is written
> in §7.3 because §7.3 is what phase 5 reads; the register row alone would not have returned anyone
> to it.
>
> **One further gap the Unit cut created, recorded where the instrument lives.** A learner who
> clears `B3`'s Unit Challenge skips `variance-expectation` — it carries no bar (`LDB-04` D12), so
> the Challenge cannot cover it (§15 item 4). That Skill is where the variance framing is taught,
> and `P-1` — decision quality independent of outcome — leans on that framing. A `B3` skipper is
> therefore a weaker `P-1` subject, and the `P-1` query should be read with that in mind.

---

## 8. What this assembly changed — four items, no decision moved

Listed positively and in full, because *"a correction pass ends by checking that its corrections are
in the target file"*, and because absence must never stand as proof.

1. **`LDB-06` D11 relabelled** — `2026-08-08-session-composition.md`, D11's label sentence. It took
   `[Evidence-backed]` on bridge §1.4's `[DEFECTIVE-SOURCE]` status and declined to lean on §1.4
   *"beyond the predict-first shape"*. §1.4 now reads `[VERIFIED]`, and **that tag was stale the day
   the bridge was written** (`C-C7-007` is present at the original bank `55f24aa`), so the hedge was
   never load-bearing. **The ruling does not change** — predict-first is independently grounded by
   `LDB-04` D12 and the taxonomy's `revealMode` note. Superseded wording is quoted in place. This is
   the single relabel `LDB-10` reported forward.

2. **The `LDB-10` sweep completed, and it found no second case.** Scoped to the five index-flagged
   findings and the two bridge sections, **enumerated positively**: `F15`, `F16`, `F19` and `F20`
   appear in **no** Phase 4 spec at all; `F17` appears once, in bridge §1.6's own record. (A second
   `F17` at `2026-08-04-motivation-and-chips-economy.md:491` is a **different finding** — dossier C1,
   Groningen/van Rijn — sharing an ID across dossiers, and is a disclosure qualification, not a hedge.
   Out of scope, flagged so the collision is on record.) **Bridge §1.6 is hedged against nowhere.**

3. **A stale line anchor fixed, and it is evidence for the check that was not built.** The bridge's
   *"What this releases"* note cited `2026-08-08-session-composition.md:801-805` — **a superseded
   anchor, quoted here as history and deliberately not updated** — for `LDB-06` D11.
   That anchor was **correct when written** (`63c35a4`) and stale by the end of the same day as the
   spec grew — D11's label sentence now sits ~120 lines lower. It is re-cited **by decision, not by
   line**. `check-doc-drift.sh` has no line-anchor check and **passed clean over it, 8 of 8**. That is
   a measured retrofit cost, which is what `AGENTS.md`'s evidence bar asks of a new check.

4. **[CHANGED AT ASSEMBLY] A load-bearing count was wrong, and it is corrected in two live
   documents.** The premise that founded `LDB-09` and `LDB-10` read **"17 of 18 Mastery bars are
   reachable only through `deal-and-decide` or `state-report`"**. It is **16 of the 17**:
   - The **union is 16, not 17** — the two types are `primaryFor` 8 Skills each and the sets are
     disjoint. Computed from `2026-08-01-activity-taxonomy.json`, which returns **16 at every commit**
     of that file, including `702ad8d` (2026-08-01) and `4cf146a` (2026-08-15). It was never 17.
   - There are **17 bars, not 18** — `variance-expectation` carries **no bar** (`LDB-04` D12).
   - **`LDB-09` already carried the right numbers in its own D9**: *"All 18 Skills stand, all 17 bars
     stand."* The document contradicted itself.

   **The finding is not weakened — 16/17 is 94%, against the 94% claimed — and no decision in either
   card moves.** What failed is a **verification claim**: the session record asserts the number was
   *"verified against `2026-08-01-activity-taxonomy.json` rather than recalled"*, and re-deriving it
   from that file returns 16. Corrected at `2026-08-15-play-verdicts-and-ungraded-activities.md:129`
   and `ROADMAP.md:147`. Left alone as historical records true-as-believed when written:
   `journal/tasks.md:79`, `journal/log.md:60`, and the session file.

5. **[CHANGED AT ASSEMBLY] Two register rows `LDB-06` declared filed did not exist, and they are now
   landed.** `LDB-06` D7 states *"Filed as one pooled sub-row, **`A-07e`**"* and its §10 specifies
   both `A-07e` (the three session-size presets) and `A-07f` (the Recommender's 3-Presentation
   separation gap) as **net new rows**. **Neither was ever written into `assumption-register.md`.**

   This was **known and not fixed**: an examiner recorded it on 2026-08-15 — *"`A-07e` and `A-07f` do
   not exist in the register yet. Grep … returns zero hits"* — and the 2026-08-17 gate run recorded
   approval criterion 2 as **"PASS with a caveat — specified in §10 with methods; not cross-checked
   against `assumption-register.md`."** `LDB-06` was then approved. **A criterion that passes on a
   caveat is a criterion that did not pass**, and this is the repository's own most expensive failure
   class — *corrections do not execute themselves* — operating on the register built to end it.

   Both rows are now landed, transcribed from `LDB-06` §10 with their declared modes and named first
   tests intact, including `A-07e`'s ⚠ blocked-until-`RC-07` qualification. The register goes from 32
   rows to **34**.

   **How it was found, because the method matters more than the row.** My first pass at criterion 2
   parsed the register and reported *"32 rows, all owned"* — **true, and blind**, because a check that
   walks existing rows can only fail when a row exists. That is precisely the defect `AGENTS.md`
   names: *"a check that can only fail when a record exists passes silently on a missing one."* The
   check that found it runs the **inverse** direction — every `A-NN` cited anywhere in any spec,
   cross-checked against the register — and it is what §11 criterion 2 now asserts.

---

## 9. Open items the owner must rule on — **ALL THREE CLOSED 2026-08-22**

Kept in place rather than deleted, each with its ruling, because a section that silently empties
leaves a reader unable to tell "ruled" from "never asked".

1. **`P-5`'s confidence capture** (§7.3). **CLOSED — `P-5` stays in the declared subset**, captured by
   `LDB-11` D13's declaration record; the product never asks a self-rating. `A-17a`'s blind spot —
   a learner who feels ready and never asks is invisible — is **accepted and recorded in §7.3**, not
   patched. This was the only item that changed what phase 5 builds, and it did: the Skill Challenge
   and the declaration record are now phase-5 scope (§7.2).
2. **A line-anchor check in `check-doc-drift.sh`** (§8 item 3). **CLOSED — built.** Check 10. Fails on
   drift, exit 1.
3. **The register cross-check** (§8 item 5). **CLOSED — built.** Check 9, the inward direction. Fails
   on drift, exit 1.

**Both checks fail rather than report**, ruled deliberately: `check-doc-drift.sh` had no
reporting-only check, and a guard that exits 0 is the *"check that cannot fail"* shape this
repository has already paid for. The narrower option — banning line-range citations outright — was
**declined**: `AGENTS.md`'s evidence bar asks for a documented failure per gate, and there is one for
*stale anchors*, not one for *line citations as a practice*.

**No item opened in their place.** The Unit cut (§14) was not an open item — it was an assignment
this card had been carrying unrecorded since `LDB-06` D6.

## 10. Small debts, carried not dropped

- ~~**`journal/milestone.md`'s `spec:` field** cites `2026-08-01-learning-outcomes-and-skill-graph.md +
  .json`. No such `.json` exists — the file is `2026-08-01-skill-graph.json`.~~ **GONE as of
  2026-08-22 — and not because anyone fixed it.** The `spec:` field was rewritten at a later
  checkpoint to point at `LDB-07`, `LDB-08` and `LDB-11`, and the bad citation left with the text
  that carried it. Verified positively rather than assumed: `grep -n "learning-outcomes-and-skill-graph"
  journal/milestone.md` returns **0** hits. Recorded this way rather than struck as *fixed*, because
  a debt that expires when its host paragraph is rewritten was never discharged — nobody checked it,
  and the same debt in a longer-lived paragraph would still be open.
- **Two `LDB-09` taxonomy-JSON edits** and **`LDB-01`'s five schema deltas** (§10 of that spec) remain
  owed to phase 5. Neither blocks assembly; both were declared non-blockers by their own cards.
- **The bridge §1.8 / `P3-evidence-catalog.md:236` comparator correction** needs an independent
  re-check and must land in **both files together**. Not a blocker on assembly, per `LDB-01`.

---

## 11. Approval criteria — checkable

1. **Every decision from the `Depends on` cards appears with its label.** §1 (`LDB-01`, 10 rows),
   §2 (`LDB-03` 8 + `LDB-09` **11**), §3 (`LDB-04`, 15), §4 (`LDB-06`, 18), §5 (`LDB-05`, 12),
   §13 (`LDB-11`, **17**) — **91 decisions**. `LDB-02` is research and contributes the catalog, not
   decisions; `LDB-10` is research and contributes the corrections in §8.

   *Corrected 2026-08-22 (owner-ruled, as an approval-criterion edit at a user-approval gate).* This
   read *"the **eight** cards named in `Depends on` — `LDB-01` through `LDB-06` plus `LDB-09` and
   `LDB-10`"*, and **`Depends on` now lists nine**: `LDB-11` was added when it was carded and the
   criterion did not move with it. The 2026-08-17 correction that produced the eight-card wording
   claimed it *"cannot go stale without `Depends on` going stale with it"* — that claim was wrong, and
   this is the drift it did not prevent. The criterion no longer states a count of cards, only that
   the set matches `Depends on`, so the same failure cannot recur.

   **`LDB-07` is deliberately NOT in the set.** It is a sibling (§0) and remains one, even though it
   forwards two owned parameters here by name (§13.1). Receiving an input is not a dependency, it is
   already approved so an edge would gate nothing, and ROADMAP deliverable 7 stands on its own at the
   phase-4 gate. Owner ruling of 2026-08-22, taking the option the card's own correction note offers
   in preference to the other.
2. **The register has no unowned row, and no owned assumption is missing a row.** **Both directions
   checked mechanically, because one direction is the check that cannot fail.**
   - *Outward:* **34 rows**, every live one naming a validation method with a declared mode. The three
     that name no mode are exactly `A-01` (struck), `A-10` (retired, as its own row predicted) and
     `A-14` (dormant, reopening condition stated, original method held).
   - *Inward:* every `A-NN` identifier cited in any spec or `ROADMAP.md` cross-checked against the
     register. **Two are absent and both are accounted for**: `A-07d` and `A-25` are recorded at
     `assumption-register.md:86-91` as drafted-then-dropped and deliberately never filed. This
     direction is what caught `A-07e`/`A-07f` — §8 item 5.
3. **The named slice's instrumentation covers the declared subset.** §7.3 — **now fully met.**
   `P-1` and `P-3` fall out of fields the design already records (`attemptOrdinal`, `disposition`,
   `engine.outcomes`, plus `poolSetting` *(to add)*); `P-5` is covered by `LDB-11` D13's declaration
   record. The blocker recorded here on 2026-08-19 — *"`P-5` not yet covered by any approved
   decision"* — was removed by `LDB-11`'s approval on 2026-08-22, not by this document.
4. **Assembled against `[VERIFIED]` on bridge §1.4 and §1.6**, verified first-hand — header, §8.
5. **`P-2` and `P-4` recorded as deliberate exclusions**, with the reason each is unanswerable by
   this product — §6.
6. **The Unit cut is drawn, prerequisite-closure verified edge by edge, and its order chosen against
   a stated alternative** — §14. Added 2026-08-22 with the assignment it discharges (`LDB-06` D6).
7. **Every mutation `LDB-11` makes to an already-assembled decision is marked in place**, not only
   listed — §2, §4 D9, §5 D11, and §13's closing note. Three, enumerated positively.

## 12. Standing condition on approval, inherited from the `LDB-06` gate

**Phase 5's first task implements `LDB-06` §11 item 8's window predicate as tests, one clause per
test.** It has **failed completeness four times** and gained a **sixth clause** at that gate. This is
not a suggestion; it is a condition attached to `LDB-06`'s approval and it survives into phase 5.

---

## 13. The Challenge and the Unit skip-test — `LDB-11`

`LDB-11`, approved 2026-08-22. Source: `2026-08-19-challenge-and-unit-skip-test.md`. **17 decisions.**
Added to this assembly on 2026-08-22; `LDB-11` was added to `LDB-08`'s `Depends on` when it was
carded, and this section is what criterion 1 reads for it.

**A Challenge is a learner's claim on material ahead of them, tested: a Coached warm-up followed by a
Proving run over the claimed material.** One mechanic, two scopes — Skill and Unit.

| # | Decision | Label |
|---|---|---|
| D1 | The **request** for a Challenge is the confidence signal; the product never asks a self-rating | `[Product judgement]` — `A-17a` |
| D2 | Confidence is **recorded and never used** — it drives nothing, it is evidence for `P-5` only | `[Product judgement]` |
| D3 | Phase 5 owes **the instrument, not the verdict** — a named field and a written query, not an answer | `[Product judgement]` — reworded the phase-5 exit condition in **two** files, §7.3 here and `ROADMAP.md` |
| D4 | Both learner and product may start a Challenge; **only the learner-initiated one is a signal** (`initiatedBy`) | `[Product judgement]` |
| D5 | The proof is **dealt hands**; the warm-up is **not evidence** | `[Product judgement]` |
| D6 | Challenge hands are `arranged` in provenance and **mixed** in pool | `[Product judgement]`, `[Evidence-backed]` on the provenance schema |
| D7 | Difficulty comes from the **Player score**; rank does not exist | `[Product judgement]` — harder-cell difficulty deferred |
| D8 | Variation is **deterministic, not adaptive** | `[Product judgement]` |
| D9 | A Skill never met **may** be Challenged; the **Tutorial runs first** | `[Product judgement]` — composes with `LDB-06` D18 |
| D10 | **Not clearing a Challenge costs nothing** | `[Product judgement]` — consistent with `LDB-04` D9's *mastery locks nothing* |
| D11 | **One mechanic, two scopes** — Skill Challenge and Unit Challenge; a Unit Challenge is coverage-complete over every **gated** Skill in the Unit (`ALR-034`) | `[Product judgement]` — `A-32` |
| D12 | The term is **Challenge** — four `CONTEXT.md` entries, and `test` goes in the *Avoid* list | `[Product judgement]` |
| D13 | **[NEW]** The **declaration record** — `initiatedBy`, `declaredAt`, `windowStateAtDeclaration`, `outcome` | `[Product judgement]` — this is `P-5`'s only instrument |
| D14 | **[NEW]** Session-shape legality moves **into the taxonomy data**, over three shapes | `[Product judgement]` — amends §2 |
| D15 | **[NEW]** `LDB-05` D11 changes state — replay verification is the declared target | `[Product judgement]` — amends §5 |
| D16 | **[NEW]** A Challenge is a **structure**; the Proving run is a **third session shape** | `[Product judgement]` — amends §4 D9 |
| D17 | **[NEW]** The warm-up holds **Unmeasured Activities only** — it holds no dealt hands, so it cannot hand the Proving run its answers | `[Product judgement]` — `A-31` |

**Three of the 74 already-assembled decisions move**, which is why this is a reassembly and not an
append: D14 amends §2, D15 amends §5's D11 row, D16 amends §4's D9 row. Each is marked in place.

### 13.1 What phase 5 builds of this, and what it costs

Owner rulings of 2026-08-22, recorded in `journal/decisions.md`.

**Built in phase 5:** the **Skill Challenge**, the **declaration record** (D13), and the **Unit
Challenge** over the Units cut in §14.

**Unmeasured Activities live only inside Challenge warm-ups.** They do **not** appear in ordinary
Learning sessions. Two types ship: **`hand-sort`** (rehearses `classify-hand`) and **`rule-battery`**
(rehearses `strategy-action`, `read-rule-card`). `estimate-and-check`, `procedure-order` and
`principle-name` do **not** ship in phase 5.

**The cost of shipping two rather than five, computed from `2026-08-01-activity-taxonomy.json` rather
than recalled.** `LDB-11` D17 publishes that *"for 12 of the 17 gated Skills the warm-up rehearses
nothing relevant and is ceremony only."* That number is over **all five** ungraded types, whose
`rehearses` sets union to 6 Skills — `classify-hand`, `variance-expectation`, `dealer-info`,
`strategy-action`, `outcomes`, `read-rule-card` — of which `variance-expectation` carries no bar, so
5 are gated and 17 − 5 = 12. **The derivation reproduces D17's published number exactly**, which is
the check that the method is right.

With only `hand-sort` and `rule-battery`, the union is **3 gated Skills** — `classify-hand`,
`strategy-action`, `read-rule-card` — so the warm-up is ceremony for **14 of 17**.

> **`A-31`'s risk is larger under this ruling than the number `LDB-11` published.** That row already
> says *"Low, and the direction of the risk is known: it may buy nothing"*, with Brummer et al.'s
> mixed-feedback-timing result cutting against it. 14-of-17 is the honest figure for what phase 5
> actually ships, and `A-31`'s playtest — clear-rate and request-rate with the warm-up against
> without — is unchanged and still the way to settle it. Recorded as a **cost of an owner ruling**,
> not as an objection to it.

> **`A-18` does not close in phase 5, and `LDB-09` D10 expected it to.** That row's validation method
> reads *"instrument the first non-quiz activity **against a quiz baseline**"*. A `hand-sort` that
> exists only inside a Challenge warm-up has no quiz baseline running beside it. `A-18` therefore
> **stays open**, and D10's expectation that it becomes closable is superseded by the warm-up-only
> ruling. Said positively here because a row that quietly fails to close is exactly the kind of
> forwarded obligation this project has lost twice.

**Two forwarded parameters are answered by not shipping their types.** `LDB-07` forwarded `subject`
(`estimate-and-check`) and `procedure` (`procedure-order`) here **by name**, on the ground that
*"which quantity ships follows the phase-5 slice's Skill subset, not the interaction."* Neither type
is in the phase-5 subset, so **both stay `unset`** and forward again to whichever phase builds them.
`principle-name`'s `groupSize` was forwarded to phase 5 rather than here and is unaffected — that
type does not ship either. `rule-battery` owes nothing: its `assembly` parameter is already pinned to
`fixed-parts` in the taxonomy JSON, with the free-text form recorded as rejected for needing a rule
language and a parser.

---

## 14. In what order, part two — the Unit cut

**New here. Nothing below is a reproduction.** `LDB-06` D6 assigned this cut to `LDB-08`
(`2026-08-08-session-composition.md:522`) while deciding which Skills an entry goal may name;
`LDB-11` §9 and `LDB-07` §705 both placed it out of scope, each pointing at `A-30`; `A-30` records it
as *"a sequencing choice, not a Prerequisite claim"*. No document drew it. This section draws it.

Owner rulings of 2026-08-22. Evidence label for the whole section: **`[Product judgement]`**, riding
`A-30`. No new register row — `A-30` already registers the ordering-and-locking assumption, and a
specific cut is a product judgement, which the register's own rule says is free to change with a
label rather than owed a row.

### 14.1 The principle — Units are prerequisite-closed

**A Unit is prerequisite-closed: every Skill in it depends only on Skills in that Unit or an earlier
one.** Two things follow, and they are why this principle rather than another:

1. `A-30`'s *"advance one step at a time"* means something concrete — a learner never meets a Skill
   whose comprehension prerequisite is still ahead of them.
2. A Unit Challenge (`LDB-11` D11) is coverage-complete over a group that is actually learnable
   together, rather than over an arbitrary bag.

**`LDB-01` §3 survives intact.** Prerequisites still mean **comprehension, not teaching order**. The
order below is a product judgement *laid over* the prerequisite graph, not derived from it — the
graph constrains which orders are legal and does not pick one. Two legal orders were compared and one
was chosen on product grounds (§14.3).

`CONTEXT.md`'s **Unit** entry constrains the cut: *"a named group of Skills inside one Subject."* A
Unit may not span Subjects.

### 14.2 The cut — 8 Units, 18 Skills, 17 gated

Computed from `2026-08-01-skill-graph.json`, over all 18 prerequisite edges.

| Unit | Title | Skills | Count |
|---|---|---|---|
| `A1` | Cards and Totals | `card-values`, `hand-total`, `ace-value`, `bust` | 4 |
| `A2` | Taking a Card | `hit`, `stand`, `dealer-info` | 3 |
| `A3` | How a Hand Settles | `outcomes`, `wager-result`, `natural-blackjack` | 3 |
| `A4` | The Extra Wagers | `double`, `split` | 2 |
| `B1` | Reading the Situation | `classify-hand` | 1 |
| `B2` | Playing the Chart | `strategy-action`, `legal-fallback` | 2 |
| `B3` | Holding the Line | `variance-expectation` *(no bar)*, `adherence-under-loss` | 2 |
| `C1` | Reading the Rule Card | `read-rule-card` | 1 |

**18 Skills, 17 gated** — `variance-expectation` carries no Mastery bar (`LDB-04` D12), which is the
same 18/17 split §8 item 4 corrected the `LDB-09` premise to.

**Closure verified edge by edge**, not asserted: `card-values`, `hit` and `stand` have no
prerequisites; `hand-total`←`card-values`(A1); `ace-value`,`bust`←`hand-total`(A1);
`dealer-info`←`card-values`(A1); `outcomes`←`hand-total`(A1); `wager-result`←`outcomes`(A3);
`natural-blackjack`←`hand-total`(A1); `double`←`wager-result`(A3);
`split`←`card-values`(A1)+`wager-result`(A3); `classify-hand`←`hand-total`+`ace-value`+`card-values`
(all A1); `strategy-action`←`classify-hand`(B1)+`dealer-info`(A2);
`legal-fallback`←`strategy-action`(B2); `variance-expectation`←`outcomes`(A3);
`adherence-under-loss`←`strategy-action`(B2)+`outcomes`(A3);
`read-rule-card`←`double`+`split`(A4). **No Skill depends on anything in a later Unit under the order
in §14.3.**

### 14.3 The order — interleaved, not subject-blocked

```
A1  A2  │  B1  B2  │  A3  A4  │  B3  │  C1
```

Both this and the subject-blocked alternative (`A1 A2 A3 A4 │ B1 B2 B3 │ C1`) are **fully
prerequisite-closed** — each was checked against all 18 edges — so the graph does not decide this and
it is purely a product call.

**Chosen because the strategy chart appears at Unit 4 of 8 rather than Unit 6 of 8.** The confirmed
phase-5 slice is `deal-and-decide`, which is `primaryFor` `strategy-action`, `classify-hand` and
`legal-fallback` — all Subject B. Under the subject-blocked order the slice's own Skills sit behind
six Units of gate, and a learner walks 12 foundations Skills before touching the thing this product
is about.

**The cost, stated rather than discovered.** A learner meets `strategy-action` **before**
`outcomes`, `wager-result`, `double` and `split`, so the chart they first learn covers hit and stand
only and **grows twice** — once at `A3`, once at `A4`. This is content sequencing, not a correctness
problem: `legal-fallback` already exists as the Skill for *"the charted action is not available"*, and
`LDB-01` §3's ruling means an unmet Skill later in the graph is not a comprehension gap in an earlier
one. Authoring the chart in three widening passes is real work and it lands in phase 5.

### 14.4 What happens to the shipped nine Units

`web/src/learn/content/blackjack-basics.ts` ships **nine** Units built on the pre-`LDB-01` Skill list.
They are superseded. Read first-hand at `:32`–`:613` rather than relayed:

| # | Shipped Unit | `outcomes` | After `LDB-01`'s retirements |
|---|---|---|---|
| 1 | `meet-blackjack` | `goal`✗, `card-values` | 1 Skill |
| 2 | `read-your-hand` | `hand-total`, `ace-value`, `bust` | 3 |
| 3 | `round-flow` | `round-flow`✗, `dealer-info` | 1 |
| 4 | `hit-and-stand` | `hit`, `stand` | 2 |
| 5 | `win-lose-push` | `outcomes`, `wager-result` | 2 |
| 6 | `blackjack-is-special` | `natural-blackjack` | 1 |
| 7 | `double` | `double` | 1 |
| 8 | `split` | `split`, `split-hands`✗ | 1 |
| 9 | `complete-round` | `complete-round`✗ | **0 — empties out** |

✗ = retired by `LDB-01` (`goal`, `round-flow`, `split-hands`, `complete-round`). The 12 survivors are
exactly Subject A, which is an independent check that `LDB-01`'s retirement list and the shipped
content agree.

**Unit 9 could not have survived even an inherit-the-shipped-nine cut.** `complete-round` demoted to a
Condition (`LDB-01` §8), leaving the Unit with **zero** gated Skills — and a Unit Challenge that is
coverage-complete over the empty set is vacuous, clearable by doing nothing.

**Disposition, in this order** (owner ruling: *"a then b"*):

1. **Re-home the lesson content as Tutorials.** The authored `LessonStep` sequences — intro, check,
   recap — keep their Skill association and lose their Unit container, becoming `LDB-06` D18 Tutorial
   content. D18 requires Tutorial content for first contact with **every** Skill, which phase 5 would
   otherwise have to author from nothing, and `CONTEXT.md`'s Tutorial entry already describes exactly
   this shape.
2. **Then retire `web/src/learn/content/blackjack-basics.ts`.** In that order, so there is never a
   moment with two live Unit structures — the duplicate-record shape the owner ruled against when the
   ROADMAP status column was deleted rather than watched.

### 14.5 One hole the cut creates, ruled rather than left

**`B3`'s Unit Challenge proves one of its two Skills.** `LDB-11` D11 makes a Unit Challenge
coverage-complete over every **gated** Skill; `variance-expectation` carries no bar, so clearing `B3`
proves `adherence-under-loss` alone and skips `variance-expectation` entirely.

It cannot be relocated — `variance-expectation` depends on `outcomes` (Subject A, `A3`), but
`CONTEXT.md` requires a Unit to sit inside one Subject.

**Ruled: accept.** `LDB-04` D12 withheld that bar deliberately, scoring a signed error instead, so
nothing provable is being bypassed — and `LDB-04` D9's *mastery locks nothing* is the same principle
one level up. Widening D11 to cover ungated Skills would require inventing a pass/fail for a Skill
D12 deliberately gave none. **The cost is carried in §7.3**: a `B3` skipper never meets the variance
framing that `P-1` leans on.

### 14.6 What this costs in schema, and what it does not

**`evidence.unitId` already exists** in `ProgressAttempt` (`web/src/progress/types.ts:78`), read
first-hand. The durable attempt record has been Unit-aware since `ProgressStore` cycle 1, so the cut
**fills a field that is already there**. This is the single largest reason the cut is cheaper than it
reads.

**One schema delta is owed, declared not specified** — joining `LDB-01`'s five and `LDB-09`'s two:

> **`Unit` loses `steps`, `requiredChecks` and `profileId`; `Subject.units` becomes a Skill
> grouping.** `web/src/learn/types.ts:34-38` declares `Unit = { id, title, goal, prerequisites,
> outcomes, requiredChecks, steps, profileId? }` — a **lesson container**, whose `steps` are exactly
> the content §14.4 moves out to Tutorials. The domain `Unit` after this cut is a named group of
> Skills that locks, with no lesson content in it. Same word, two objects, and the code's one has to
> give.

The fields are named rather than left as *"a shape change"* on purpose: a delta with no named fields
is the kind of forwarded obligation this repository has already lost track of twice. **Units ship as
data**, following `LDB-01` §7's *"the graph ships as data, not code"* — the same shape as
`skill-graph.json` and `activity-taxonomy.json`.

**`CONTEXT.md` needs no edit.** Its **Unit** entry — *"a named group of Skills inside one Subject that
a learner clears as a whole … ordered and they lock"* — is true of this cut without rewording, and
the cut itself is not glossary material. Checked, not assumed.

**Phase 4 builds no product code.** Both §14.4 steps and the schema delta are **phase-5 tasks this
document specifies**, not phase-4 edits. This also keeps `AGENTS.md`'s milestone-QA scoping reading
the same way it did for phase 4's other commits: no watched file under `web/` or `crates/` moves.

---

## 15. What the 2026-08-22 reassembly changed

Same rule as §8: listed positively and in full, because *"a correction pass ends by checking that its
corrections are in the target file"*, and because absence must never stand as proof. **Seven items. One
of them moves decisions** — item 1 — and it says so rather than hiding behind the §8 formula.

1. **`LDB-11` joined the assembly: 74 → 91 decisions** (§13). **Three already-assembled decisions
   move with it**, each marked in place rather than only listed here: D14 amends §2 (shape legality
   becomes taxonomy data, over three shapes), D15 amends §5's D11 row (the leaderboard deferral gains
   a named precondition), D16 amends §4's D9 row (the Proving run is a third session shape). This is
   the one place this document's *"none of them moves a decision"* formula does not hold, and the
   reason is that `LDB-11` was approved at its own gate on 2026-08-22 — these are its rulings landing
   here, not this assembly re-deciding anything.

2. **§7.3's `P-5` row was rewritten and its two superseded callouts REMOVED, not marked.** The row
   read *"a **self-rated** confidence signal"*, which `LDB-11` D1 forbids. The callouts said phase 5
   must add a confidence capture or drop `P-5`, and one of them already carried a dated *superseded*
   note pointing here. Deleting rather than striking is deliberate: a settled instruction sitting
   beside its superseded twin is how this repository's citation failures begin. `A-17a`'s blind spot
   moved **into §7.3**, because §7.3 is what phase 5 reads and a register row alone returns nobody to
   anything.

3. **The Unit cut was drawn** (§14) — 8 Units, prerequisite-closed, interleaved order, the shipped
   nine superseded with their content re-homed as Tutorials before the file is retired. **This was
   never an open item; it was an unrecorded assignment.** `LDB-06` D6 assigned it to this card on
   2026-08-17 and the `LDB-08` card's Outcome never carried it, so it survived four gates unnoticed.
   The card is corrected in the same pass.

4. **[CHANGED AT REASSEMBLY] A `B3` Unit Challenge covers one of its two Skills, and the hole is
   ruled rather than left** (§14.5). `variance-expectation` has no bar, so `LDB-11` D11's
   coverage-complete-over-gated-Skills cannot reach it. Accepted, with the `P-1` cost recorded in
   §7.3.

5. **[CHANGED AT REASSEMBLY] `LDB-11` D17's "12 of the 17" is right for five types and wrong for what
   phase 5 ships** (§13.1). Shipping only `hand-sort` and `rule-battery` makes the warm-up ceremony
   for **14 of 17** gated Skills. The five-type derivation reproduces D17's 12 exactly, which is what
   establishes the method before the two-type number is trusted. **`A-31`'s risk is larger than the
   number its own card published**, and **`A-18` does not close in phase 5** — its method needs a
   quiz baseline that a warm-up-only activity does not have, so `LDB-09` D10's expectation is
   superseded. Neither is an objection to the ruling; both are its cost.

6. **Four line anchors in §7.3 were re-verified first-hand against `web/src/progress/types.ts`, and
   three of the four were wrong when written.** `AttemptDisposition` was cited `:46-49` and is
   `:46-50` (the cut-off line is the `abandoned` variant); `evidence.subjectId`/`skillId` were cited
   as a block `:76-82` and are `:77` and `:79`; `engine.outcomes` was cited `:55-61` and is `:60`.
   Corrected in the same session that wrote them, and **before** check 10 shipped — which is the
   point: §8 item 3's documented failure was a stale anchor passing 8 of 8 checks, and this is the
   same failure caught by hand one commit before the check existed to catch it. Also confirmed
   positively: `poolSetting`, `won`, `confidence` and `totalsDisclosure` return **0** hits in that
   file, so §7.3's *(to add)* markers are genuinely owed; and **`evidence.unitId` already exists**
   (`:78`), which is why §14's cut fills a field rather than adding one.

7. **[CHANGED AT REASSEMBLY] Five stale line anchors were repaired, four of them found by the new
   check on the day it shipped, and one repair was itself wrong.** Two pre-existing
   (`chips-xp → product-design-inputs`, `LDB-11 → this document`); three into `journal/tasks.md`,
   which is the sharper class — **no anchor into the board may ever be a line number**, because
   `scripts/kanban.ts` rewrites the whole file on every lane move, so those are now cited by card
   and field. The wrong repair matters more than the four right ones: check 10 reported a range's
   **start line** had moved, the anchor was updated to follow it, and the thing the range actually
   pointed at was 34 lines further on. It is now cited **by content**. Two limits were added to the
   check's own output as a result — a range's start is not the range, and the check reports movement,
   never that an anchor was correct to begin with.

**Two new checks shipped with this reassembly**, discharging §9 items 2 and 3: `check-doc-drift.sh`
goes from **8 to 10**. Check 9 is the register cross-check in the inward direction — every `A-NN`
cited in any spec or `ROADMAP.md`, against the register — which is the direction that caught
`A-07e`/`A-07f`. Check 10 is the line-anchor check. Both exit 1 on drift.
