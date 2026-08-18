# The Learning Design Blueprint — `LDB-08`

> **Status: assembled, awaiting owner approval.** This is phase 4's gate artifact. It assembles the
> eight approved decisions named in `LDB-08`'s `Depends on` — `LDB-01` through `LDB-06`, plus `LDB-09`
> and `LDB-10` — and names the phase-5 slice with the `P-` subset that slice must instrument.
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
> a prior gate had already been told about and approved past.

---

## 0. What this document decides, and what it does not

**Decides:** the phase-5 slice, and the subset of `P-1`…`P-5` that slice must instrument. Nothing else
here is new.

**Does not decide:** interaction UX. That is `LDB-07`, which is a **sibling** of this card, not a
predecessor — both are unblocked by `LDB-06`, and `LDB-07` depends on `LDB-03`, `LDB-06` and `LDB-09`.
This blueprint is approvable without it. **Phase 4 is not**: `LDB-07` is ROADMAP deliverable 7, so the
phase exit needs both. Stated because the distinction has already gone wrong once — `LDB-08`'s
approval criterion originally demanded `LDB-07`'s decisions and was corrected on 2026-08-17.

**Does not decide** the visual system (phase 6), or any number this product has not measured on its
own data. Every threshold below is `[Assumption]` with a register row, or `[Product judgement]`.

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
| D9 | Two session shapes, with `feedbackTiming` and `segmentation` **bound together**, never toggled independently | `[Product judgement]`, `[Evidence-backed]` |
| D10 | The app **never withdraws the strategy table**; the rule card is always available | `[Product judgement]` |
| D11 | `revealMode: play-it-out`; the sandbox is **deferred, not rejected** | `[Evidence-backed]`, `[Product judgement]` — **[CHANGED AT ASSEMBLY]**, see §8 |
| D12 | `region: named-region` | `[Product judgement]` |
| D13 | Practice opens **per Skill**, at one recorded Presentation | `[Product judgement]` |
| D14 | The Recommender's ordering is **fixed and published** | `[Product judgement]`, `[Evidence-backed]` |
| D15 | `pace: untimed` in v1; `timed` exists only as table character | `[Product judgement]` |
| D16 | The debrief: four contents and **one prohibition** | `[Evidence-backed]`, `[Product judgement]` |
| D17 | Committed Presentations persist; in-progress session state does **not** | `[Evidence-backed]`, `[Product judgement]` — diverges from `ALR-029`, owner-approved |
| D18 | First contact with a Skill is a **Tutorial**, and a Tutorial **never counts** | `[Product judgement]`, `[Evidence-backed]` — owner decision 2026-08-17 |

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
| D11 | The leaderboard is **deferred** — inherited from `CLOUD-06`, not decided here | `[Evidence-backed]` |
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

### 7.2 Recommendation — **confirm the parameterisation, and state what phase 5 grew around it**

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

### 7.3 What the slice must instrument — the phase-5 exit condition

Phase 5 **cannot exit** without answering these from **recorded attempt data**, not impression.

| Question | What must be recorded | Where it comes from |
|---|---|---|
| `P-1` | Decision correctness and hand outcome as **separate** fields per attempt, so agreement between them is measurable rather than assumed | `LDB-05` D9 already grades every decision by the oracle independently of the win; `LDB-05` D12 forbids leading with profit/loss |
| `P-3` | The `blocked` / `mixed` setting per Presentation, against first-response correctness | `LDB-06` D4 — it bites on 3 of 11 types, and `deal-and-decide` is one |
| `P-5` | A **self-rated confidence** signal captured alongside first-response correctness, so the two curves can diverge | `P-5`'s own statement: *"Track both; if they diverge, the product is producing false confidence"* |

> **`P-5` is the one that needs a deliberate addition, and this is the sharpest thing in this
> document.** `P-1` and `P-3` fall out of fields the design already records. **`P-5` does not** — no
> approved decision captures a confidence signal, and `LDB-05` D7's three meters are all performance
> meters. Phase 5 must add a confidence capture or **`P-5` cannot be answered and must be dropped from
> the declared subset.** Raised here rather than discovered in phase 5, and it is an owner call —
> see §9.

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
   *"What this releases"* note cited `2026-08-08-session-composition.md:801-805` for `LDB-06` D11.
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

## 9. Open items the owner must rule on

1. **`P-5`'s confidence capture** (§7.3). Add a confidence signal to the slice, or drop `P-5` from the
   declared subset. **No approved decision captures one today.** This is the only item that changes
   what phase 5 builds.
2. **A line-anchor check in `check-doc-drift.sh`** (§8 item 3). Deliberately not built at the `LDB-10`
   gate; §8 item 3 is now the documented failure its evidence bar requires — an anchor that was
   correct when written, stale the same day, and passed clean by 8 of 8 checks.
3. **Whether the register cross-check earns a ninth check** (§8 item 5). The inward direction — every
   cited `A-NN` against the register — found a two-row gap that a gate had already waived, and it is
   nine lines of script. Same evidence bar, now met.

## 10. Small debts, carried not dropped

- **`journal/milestone.md`'s `spec:` field** cites `2026-08-01-learning-outcomes-and-skill-graph.md +
  .json`. No such `.json` exists — the file is `2026-08-01-skill-graph.json`.
- **Two `LDB-09` taxonomy-JSON edits** and **`LDB-01`'s five schema deltas** (§10 of that spec) remain
  owed to phase 5. Neither blocks assembly; both were declared non-blockers by their own cards.
- **The bridge §1.8 / `P3-evidence-catalog.md:236` comparator correction** needs an independent
  re-check and must land in **both files together**. Not a blocker on assembly, per `LDB-01`.

---

## 11. Approval criteria — checkable

1. **Every decision from the eight `Depends on` cards appears with its label.** §1 (`LDB-01`, 10
   rows), §2 (`LDB-03` 8 + `LDB-09` **11**), §3 (`LDB-04`, 15), §4 (`LDB-06`, 18), §5 (`LDB-05`, 12)
   — **74 decisions**. `LDB-02` is research and contributes the catalog, not decisions; `LDB-10` is
   research and contributes the corrections in §8.
2. **The register has no unowned row, and no owned assumption is missing a row.** **Both directions
   checked mechanically, because one direction is the check that cannot fail.**
   - *Outward:* **34 rows**, every live one naming a validation method with a declared mode. The three
     that name no mode are exactly `A-01` (struck), `A-10` (retired, as its own row predicted) and
     `A-14` (dormant, reopening condition stated, original method held).
   - *Inward:* every `A-NN` identifier cited in any spec or `ROADMAP.md` cross-checked against the
     register. **Two are absent and both are accounted for**: `A-07d` and `A-25` are recorded at
     `assumption-register.md:86-91` as drafted-then-dropped and deliberately never filed. This
     direction is what caught `A-07e`/`A-07f` — §8 item 5.
3. **The named slice's instrumentation covers the declared subset.** §7.3 — with `P-5` flagged as
   **not yet covered by any approved decision**, which is §9 item 1 and is why this criterion is not
   yet fully met.
4. **Assembled against `[VERIFIED]` on bridge §1.4 and §1.6**, verified first-hand — header, §8.
5. **`P-2` and `P-4` recorded as deliberate exclusions**, with the reason each is unanswerable by
   this product — §6.

## 12. Standing condition on approval, inherited from the `LDB-06` gate

**Phase 5's first task implements `LDB-06` §11 item 8's window predicate as tests, one clause per
test.** It has **failed completeness four times** and gained a **sixth clause** at that gate. This is
not a suggestion; it is a condition attached to `LDB-06`'s approval and it survives into phase 5.
