# Audit — Unit U1

> Unit under audit: `docs/specs/learning-mastery-and-scoring.md` (213 lines, **0** citations —
> re-confirmed by reading the file end to end; no source, DOI, URL or author name appears anywhere
> in it). Examiner role only — verdicts are **not** self-verified; a separate agent re-checks every
> row, and must answer "is this defect real?" for every `Remove`/`Replace` (there are none here).
> Run: foundation-audit-p2. Written 2026-07-21.

Verdict legend: Preserve / Relabel / Revise / Replace / Remove

**Quoting convention.** U1 is a hard-wrapped document. Where a quoted claim spans two source lines,
the wrap is closed with a single space and the anchor names both lines (e.g. `:114-115`). No other
alteration is made.

**Correction landed 2026-07-22 (`C-U1-003`, editorial).** As first written, this paragraph ended
"no ellipsis is used anywhere in this record." That statement was **false** and is left visible
here rather than quietly back-filled (`journal/decisions.md` R24/R26): ellipses appear at
`K-U1-011`, at `K-U1-016`, and in the conflicts block. `K-U1-011`'s ellipsis faithfully reproduces
one present in the dossier's own text at `C2:197`; the conflicts-block ellipsis elides without
reordering; `K-U1-016`'s was material and has been repaired at that row (see below).
<!-- LANDED C-U1-003 (V-U1, editorial): the record's "no ellipsis is used anywhere" convention statement was false; corrected in place with the original wording preserved. -->


## What was read before any retrieval (G7)

Phase 1 dossiers consulted, from the approved archive `docs/superpowers/research/foundation-audit-p1/`:

- `dossiers/C3-deliberate-practice.md` — read lines 1–643 in full (the F1–F9 findings, the
  candidate-conflicts block, the INFERENCE synthesis and the coverage gaps). This is the dossier the
  dispatch named as governing the replication-disputed Ericsson entry.
- `dossiers/C5-anki-spaced-repetition.md` — F1–F8 read in full (`:41-240`); F9–F19 headings read.
  Evidence input for spacing, interleaving, task-complexity moderation, and discrimination errors.
- `dossiers/C2-its-actr-procedural.md` — F1–F12 read (`:83-222`). Evidence input for ITS
  effectiveness, ACT-R skill acquisition, spacing scheduling (F9/F10) and interleaving (F11).
- `dossiers/C4-chesscom-khan.md` — F1–F7 read (`:83-144`). Evidence input for rating-vs-mastery
  mechanism design (Chess.com Glicko puzzle rating; Khan's deterministic five-level ladder).
- `dossiers/C6-blackjack-teachable.md` — F4 read in full (`:216-257`); F1–F9 headings read. The only
  blackjack-specific time-pressure evidence the program holds.
- `dossiers/C1-knowledge-tracing.md` — all 29 finding headings read; F8 (`:244`) inspected for the
  population-data requirement of Elo-family rating.

Baseline consulted as evidence (itself under audit as U4, so its labels are not treated as settled):
`docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md` — source table
`:39-48`, the "Existing project directions cross-check" block `:85-100`, requirements ALR-004/005/017/
018/022/032/034/035, and the conflict register `:430-442`.

Drift source read as provenance only (never a verdict target, per `journal/docs-map.md`):
`docs/imports/v2-research-2026-07-11/research/v2-research-02-curriculum-and-pedagogy.md:1-186`
(**note**: the dispatch's path `…/course-bundle/v2-research-02-curriculum-and-pedagogy.md` does not
exist; the file is under `…/research/`. The five references are at `:174-178` as stated) and
`docs/imports/v2-research-2026-07-11/course-bundle/how-to-teach.md:105`.

## Format note (bears on how "Relabel" is applied here)

U1 carries **no epistemic labels at all** — neither Layer-1 provenance (`OBSERVED` / `PUBLISHED` /
`INFERENCE` / `COVERAGE GAP`) nor Layer-2 status buckets. Its implied status comes from two places:
its own header (`:3`, "parked for V2+"), and the fact that downstream owned specs cite it in
requirement voice — `docs/superpowers/specs/2026-07-17-progressstore-cycle1-design.md:34`
("`learning-mastery-and-scoring.md:56-66` **requires** classification and row/column navigation to be
measurable separately from choosing the action") and `:130`
("`learning-mastery-and-scoring.md:107`; ALR-033) — **forbids** destroying evidence"). A `Relabel`
below therefore means: *this claim reads, and is consumed downstream, as a settled requirement, but
its real basis is a falsifiable design bet (Assumption) or a values commitment (Product judgement).*

## The drift finding the dispatch asked for, stated up front

Five references were stripped between the import (`…curriculum-and-pedagogy.md:174-178`) and U1. On
the evidence held, **the stripping did not leave the surviving claims baseless, and it did not carry
an over-strong claim upward**. Specifically:

- **Cepeda et al. 2006** — its descendant (U1's `## Spacing And Interleaving`, `:110-115`) is
  supported by `C5-anki-spaced-repetition.md:41-63` (F1) and by the baseline's own cross-check at
  `…-research.md:87-88`. U1 additionally hedges its thresholds (`:114-115`), which is exactly the
  caution `C5:84-106` (F3, Donovan & Radosevich: complex-task d = 0.11/0.07) demands.
- **Kornell & Bjork 2008** — collected as `C5:165-193` (F6); U1's interleaving claim is in fact
  better supported by `C5:108-134` (F4, Taylor & Rohrer) and `C2:190-198` (F11, Rohrer et al.).
- **Roediger & Karpicke 2006** and **Bjork & Bjork** — ~~no explicit descendant claim survives into
  U1 at all. There is nothing to be baseless: U1 states no testing-effect claim and no
  desirable-difficulties claim.~~ **SUPERSEDED as to the retrieval-practice half; see the correction
  immediately below.**

  **Correction landed 2026-07-22 (`C-U1-001`, editorial).** The struck sentence above was this
  record's strongest negative and it is **false in its retrieval-practice half**. The error is left
  visible rather than back-filled (`journal/decisions.md` R24/R26). What is actually the case, all
  anchors reopened first-hand in the landing pass:

  - **A retrieval-practice descendant does survive into U1, with textual lineage from the import.**
    The import reads, verbatim, "4. **Decision recall** — choose the recommended action with and
    without support." (`…curriculum-and-pedagogy.md:14`); U1 reads, verbatim, "4. Decision recall:
    choose the recommendation with progressively less support."
    (`docs/specs/learning-mastery-and-scoring.md:35`). The same unaided-recall commitment recurs at
    U1 `:23` ("2. Play correctly without the table and without time pressure.") and U1 `:92`
    ("4. table-hidden decision;").
  - **The project's own baseline attaches retrieval evidence to exactly those claims.**
    `…-research.md:74` (`SCI-001`, verbatim): "**INFERENCE:** require learners to produce independent
    first responses and revisit retrieval after feedback; repeated viewing or answer-assisted retries
    are not equivalent mastery evidence." Also `:87-88` "**Targeted repetition:** supported in
    principle by retrieval and spacing evidence (`SCI-001`, `SCI-002`)…" (quoted at `K-U1-010`, where
    this record credited the strength to Cepeda alone and dropped the retrieval half); `:141`
    (ALR-004) "assisted success can support learning but cannot satisfy an unassisted mastery or
    skip-test requirement."; `:253` (ALR-022) "**INFERENCE:** retrieval evidence `SCI-001`".
  - **Attribution, stated precisely so the fix does not introduce a new error.** The stripped import
    reference is "Roediger & Karpicke (2006), test-enhanced learning/retrieval practice."
    (`…curriculum-and-pedagogy.md:174`). The baseline's `SCI-001` is a **different paper**: Karpicke,
    J.D. & Roediger, H.L. III (2008), "The Critical Importance of Retrieval for Learning," *Science*
    319(5865), 966–968, DOI 10.1126/science.1152408 (`…-research.md:39`). Reversed author order,
    different year, different journal. They are **not** interchangeable, and this record does not
    claim that `SCI-001` is the stripped reference — only that the surviving U1 claim family has
    retrieval evidence in hand under `SCI-001`, so the citation loss did leave a live claim whose
    basis was never checked in this record.
  - **The Bjork & Bjork half of the struck sentence stands.** U1 orders formats from easier to harder
    and withdraws support, but nowhere asserts the desirable-difficulty claim proper (a manipulation
    that depresses acquisition performance while improving long-term retention). No correction there.
  - **Related, and now on the record:** the import's rung 5, "5. production before buttons appear"
    (`…curriculum-and-pedagogy.md:62`) — the purest retrieval rung in the import — was **dropped** in
    the fold; that omission is already an open question at `PROGRESS.md:97-99` ("Was dropping the
    'production' rung — the learner names the play before seeing options — from the exercise ladder in
    `learning-mastery-and-scoring.md:85-95` intentional?").

  No verdict changes as a result of this correction; the affected claim family had no verdict row to
  change (see `C-U1-002` landing after the counts).
<!-- LANDED C-U1-001 (V-U1, editorial): the "no Roediger & Karpicke descendant survives" negative was false in its retrieval half; original struck and kept visible, surviving claim family and its baseline retrieval evidence recorded, 2006-vs-2008 attribution separated, Bjork & Bjork half upheld. -->
- **Ericsson et al. 1993** (the replication-disputed entry) — its descendant is U1's short-loop
  mechanism (`:8-12`). Checked against C3 as instructed: what U1 inherited is the part of Ericsson
  that **survives** the dispute (`C3:445-450`, the feedback-immediacy/corrective-repetition
  mechanism, "asserted or conceded by **both** camps"), **not** the part that does not (`C3:451-455`,
  the magnitude/"complete correspondence" claim; `C3:263` F6's non-replication). U1 makes no
  hours-accumulation claim, no magnitude claim, and no 10,000-hour claim. The citation loss here is a
  provenance defect, not a substance defect.

Where the citation loss *did* leave exposure is narrower and is captured in the five `Relabel` rows
below: the seven-stage progression, the accuracy-before-speed gate, the immediate-for-acquisition
feedback default, the chess-style internal rating, and the four-tier error severity.

## Verdicts

| Claim ID | Verdict | Claim | Citation |
|----|----|----|----|
| K-U1-001 | Preserve | "> Status: parked for V2+. Not a V1 implementation requirement unless the active milestone says so." (`docs/specs/learning-mastery-and-scoring.md:3`) | Holds as written, including under the strongest counter-example: `docs/superpowers/specs/2026-07-17-progressstore-cycle1-design.md:34` consumes `:56-66` in requirement voice inside an **active** cycle-1 design, which is precisely the case the clause "unless the active milestone says so" admits. Recorded as a row rather than a note because it is the claim that decides whether every other row below is load-bearing: it is, and the escape clause is currently exercised. |
| K-U1-002 | Preserve | "Learning should happen through short loops:" … "short unit -> decision -> feedback -> targeted repetition -> mastery update" (`docs/specs/learning-mastery-and-scoring.md:8`, `:11`) | `docs/superpowers/research/foundation-audit-p1/dossiers/C3-deliberate-practice.md:445-450`: "**Feedback immediacy and corrective repetition are the load-bearing mechanism, not raw hours accumulation** — this is Ericsson et al.'s (1993) own original definitional core (F1), and it is exactly the piece Ericsson & Harwell (2019) argue Macnamara et al.'s broader 'structured practice' operationalization drops (F7). A drill trainer that supplies immediate, specific, corrective feedback at a task difficulty matched to the learner is invoking the mechanism neither side disputes". Primary strength at `C3:68-71` (Ericsson et al. 1993, p. 367, verbatim in-dossier). This is the exact claim family the dispute leaves standing; U1 claims no magnitude, so it does not reach the contested part. Bucket: `Evidence-backed`. |
| K-U1-003 | Relabel | "Build skills in this order:" followed by "1. Game literacy… 2. Rule literacy… 3. Chart literacy… 4. Decision recall… 5. Procedural transfer… 6. Ruleset transfer… 7. Automaticity: answer accurately at realistic pace only after accuracy is stable." (`docs/specs/learning-mastery-and-scoring.md:30-38`) | No dossier and no baseline source evaluates a prerequisite ordering for blackjack, or for any comparable situation→action rule domain. The nearest held evidence is `C4-chesscom-khan.md:113-121` (F4), which **observes** Khan Academy's five-level ladder as official product documentation (tier "Q5 (official product documentation)", `C4:117`) — an existence proof that ladders ship, not evidence that this ordering is correct. Baseline `…-research.md:98-100` says the parallel case out loud: "strict prerequisite selection and skip-test coverage remain deterministic project policy requiring proof-specific validation." The ordering is defensible and nothing contradicts it; it is falsifiable by playtesting (a learner cohort could succeed with a different order), so the honest bucket is **Assumption**, not an unlabelled requirement. Relabel, explicitly **not** Remove — absence of literature is not grounds to delete a defensible design. |
| K-U1-004 | Relabel | "Automaticity: answer accurately at realistic pace only after accuracy is stable." (`docs/specs/learning-mastery-and-scoring.md:38`), restated as "7. timed practice after accuracy is stable." (`:95`) | The only blackjack-specific time-pressure evidence the program holds is `C6-blackjack-teachable.md:216-257` (F4, Phillips & Amrhein 1989), and the dossier's own corrected entry disqualifies it from carrying this rule: N=12 (`C6:230-231`), the source hedges twice — "The results **suggested** that deviations from optimal play can **in part** be understood…" (`C6:241-244`) — and `C6:250-257` records that "The computer simulation of Blackjack used **simplified rules (no splitting, doubling down, insurance, etc.)**, and **the probability of winning was controlled by the computer**", which V6 "judges … more severe than the N=12 the dossier did disclose." Nothing in C2/C5 addresses accuracy-before-speed sequencing. Bucket: **Assumption** (a speed/accuracy sequencing bet that playtest data could overturn). Drift note carried here rather than as its own row: the import reads "8. timed practice after mastery" (`…curriculum-and-pedagogy.md:65`); U1 changed the gate to "after accuracy is stable", a *different* and looser gate. The change is already an open question at `PROGRESS.md:98` and is not adjudicated here. |
| K-U1-005 | Preserve | "Teach in chunks, then mix according to mastery. Do not wait until the end to combine everything." (`docs/specs/learning-mastery-and-scoring.md:53-54`) | Baseline `docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md:91-92`: "**Interleaving:** supported for discrimination after foundational practice (`SCI-003`); the evidence does not justify mixing every activity from first exposure." U1's two sentences are that finding in both directions — chunk first (do not mix from first exposure), then mix (do not defer mixing to the end). Underlying primary strength at `C5-anki-spaced-repetition.md:120-126` and `C2-its-actr-procedural.md:197`. Bucket: `Evidence-backed`. A survivor. |
| K-U1-006 | Preserve | "For every lookup, identify the dealer upcard and classify the player's hand in this order:" … "1. pair;" "2. soft total;" "3. hard total." … "Classification and row/column navigation should be measurable separately from choosing the recommended action." (`docs/specs/learning-mastery-and-scoring.md:58`, `:60-62`, `:65-66`) | This is the U1 line an active spec consumes as a requirement (`2026-07-17-progressstore-cycle1-design.md:34`), so it is the highest-stakes row here — and it has a real basis. `C5-anki-spaced-repetition.md:120-126` (Taylor & Rohrer 2010, tier "Q2 (controlled experiment)" at `C5:115`): "blocked practice and interleaved practice produced about the same number of fabrication errors (15% vs. 13%, respectively), but interleaving of practice dramatically reduced the frequency of discrimination errors (46% vs. 10%)", with the dossier's own transfer note at `C5:130-134`: "the task structure (situation → select correct action from a small fixed set) is structurally close to basic-strategy play." Measuring classification separately from action selection is exactly the split that finding makes visible. Domain-transfer caveat travels with it (`C5:127-134`: school geometry, not a decision under uncertainty). Bucket: `Evidence-backed`, at the strength the source actually supports. |
| K-U1-007 | Preserve | "Prefer rule-based scenario generation over fixed scripted hands." … "This allows targeted practice without making the game feel fake." (`docs/specs/learning-mastery-and-scoring.md:69`, `:83`) | The claim states its own rationale, and that rationale is product-facing ("without making the game feel fake"), not research-derived — so no evidence label is implied and none is needed. It is also consistent with the repo constraint at `AGENTS.md` ("Do not fake card flow: build shoes, shuffle once, deal from the ordered shoe, and keep card origins traceable"). Bucket: `Product judgement`, correctly presented as one. Preserved as written; a Relabel here would be manufacturing a defect out of a claim that already labels itself. |
| K-U1-008 | Preserve | "Record decision quality independently from hand outcome." (`docs/specs/learning-mastery-and-scoring.md:102`) | Baseline `…-research.md:95-97` states the epistemic position exactly: "**Decision/outcome separation:** no reviewed learning-product or study source directly tests gambling outcome bias. Keeping decision quality independent from hand outcome remains an approved blackjack training constraint, not a newly inferred research finding." Restated as a declared gap at ALR-016 (`…-research.md:215`): "**COVERAGE GAP:** no competitor study directly tests blackjack outcome bias." Bucket: `Product judgement` + `COVERAGE GAP`, and U1 is *more* honest than its own upstream here — the import labelled the same claim "**Verified design principle**" (`…curriculum-and-pedagogy.md:7`); U1 dropped that unearned word. Drift in the honest direction, recorded because the program only ever records it in the other direction. |
| K-U1-009 | Preserve | "One wrong tap is not enough to label a misconception. Infer a stable weakness only from repeated evidence or an explicit reasoning prompt." (`docs/specs/learning-mastery-and-scoring.md:106-107`), with "Assistance level and table visibility are part of the evidence." (`:104`) | Baseline ALR-032 (`…-research.md:313`): "**ALR-032 — Reduce mastery deterministically from repeated, diverse evidence across sessions and assistance levels.**" and ALR-004's limitation (`…-research.md:141`): "assisted success can support learning but cannot satisfy an unassisted mastery or skip-test requirement." U1's claim is the same commitment, stated for the evidence-capture side rather than the reducer side. Bucket: `Product judgement` (a measurement-validity commitment), consistent with how the baseline itself carries it. |
| K-U1-010 | Preserve | "Repeat weak items sooner without trapping the learner in immediate repetition." (`docs/specs/learning-mastery-and-scoring.md:112`) | Baseline `…-research.md:87-88`: "**Targeted repetition:** supported in principle by retrieval and spacing evidence (`SCI-001`, `SCI-002`), but not by trapping learners in same-session answer repetition." The match is near-verbatim in both halves. Underlying strength: `C5-anki-spaced-repetition.md:54-60` (Cepeda et al. 2006, tier Q1 at `C5:48`) — "Only 12 of 271 comparisons of massed and spaced performance showed no effect or a negative effect from spacing" — with `C5:61-63`'s scope limit (verbal-memory material only) intact. Bucket: `Evidence-backed`, correctly unquantified. **Corrected 2026-07-22 under `C-U1-001`:** as first written this row credited the quoted baseline sentence's strength to Cepeda (`SCI-002`) alone and dropped its retrieval half; the baseline sentence names **both** `SCI-001` (Karpicke & Roediger 2008, retrieval) and `SCI-002`, and the retrieval half is part of this row's basis. Verdict unchanged. |
| K-U1-011 | Preserve | "Mix older and newer concepts, then interleave hard, soft, and pair decisions so the learner must classify before acting." (`docs/specs/learning-mastery-and-scoring.md:112-113`) | `C2-its-actr-procedural.md:197` (Rohrer, Dedrick & Burgess 2014, tier "Q2 (randomized, counterbalanced classroom experiment)" at `C2:194`): "The mean test scores were greater for material learned by interleaved practice rather than blocked practice (72 % vs. 38 %, d = 1.05). This interleaving effect was observed even though the different kinds of problems were superficially dissimilar from each other… We conclude that interleaving improves mathematics learning not only by improving discrimination between different kinds of problems, but also by strengthening the association between each kind of problem and its corresponding strategy." Plus `C5:120-126`. The clause "so the learner must classify before acting" is precisely the discrimination mechanism both sources name. Transfer caveat stands (`C2:198`: "Domain is grade-7 math… that transfer is untested"). Bucket: `Evidence-backed`; U1 states no effect size, so it does not inherit one it cannot carry. |
| K-U1-012 | Preserve | "Mastery evidence should eventually span more than one session; thresholds remain provisional until observed practice data supports them." (`docs/specs/learning-mastery-and-scoring.md:114-115`) | Baseline `…-research.md:93-94`: "**Evidence across sessions:** spacing and mastery findings support repeated evidence over time (`SCI-002`, `SCI-006`), while exact counts, intervals, and decay rules remain coverage gaps." And the baseline's own rejected-option row (`…-research.md:389`): "Fixed numeric mastery thresholds copied from studies or competitors | Defer until wider curriculum research | … Effects support general mechanisms, not blackjack-specific counts, intervals, or cut scores." U1 declares its thresholds provisional *in the sentence itself*. This is the row that shows the doc is not uniformly unhedged, and it is the calibration bar the other mastery claims should have met. |
| K-U1-013 | Preserve | "Immediate and delayed feedback are training configurations, not one global product mode." (`docs/specs/learning-mastery-and-scoring.md:133`) | `SCI-005` re-opened 2026-07-21 (Brummer, de Boer, Mouw & Strijbos 2024, *Learning Environments Research*, DOI 10.1007/s10984-024-09501-4), Discussion, verbatim: "With regard to feedback timing, both immediate and delayed feedback had significant and strong effects on improving learning performance, with delayed feedback being slightly more effective than immediate feedback." Refusing a single global mode is exactly what "no universal timing winner" licenses; the baseline records the same limitation at `…-research.md:43` ("do not support one universal timing rule"). Bucket: `Evidence-backed`. Faithfully folded from the import (`…curriculum-and-pedagogy.md:108`: "The roadmap should not choose one global feedback mode. Feedback timing is a training configuration."). |
| K-U1-014 | Relabel | "Use immediate correction for new concepts and delayed review for transfer or assessment." (`docs/specs/learning-mastery-and-scoring.md:133-134`) | `SCI-005` re-opened 2026-07-21 gives the average direction **against** the immediate half: "delayed feedback being slightly more effective than immediate feedback", and, on the pattern U1 actually prescribes: "A combination of feedback timing approaches was ineffective. These findings indicate that clarity and consistency—as to whether participants receive immediate or delayed feedback—is more essential than the actual timing of the feedback." A mode-scoped split is not the same construct as within-condition mixing, so this is **tension, not contradiction** — hence Relabel and not Remove/Replace. The acquisition-vs-assessment split is not derivable from the source and is falsifiable by playtest, so the honest bucket is **Assumption**. Conflict logged, not resolved — see "Conflicts logged" below. |
| K-U1-015 | Preserve | "Hints should be graded, not just answer-first." … "Example ladder:" (`docs/specs/learning-mastery-and-scoring.md:139`, `:141`) | Baseline `…-research.md:89-90`: "**Hint ladder:** worked examples and fading support graded assistance (`SCI-004`, `SCI-009`), but the existing four-level ladder remains a project design rather than a research-derived sequence." The *principle* (graded, not answer-first) is the supported half; the *four rungs* are the unsupported half — and U1 already introduces them as an "Example ladder", i.e. as illustration, not specification. The claim as written therefore does not outrun its basis, and the label a Relabel would impose is already present in the wording. Preserve. |
| K-U1-016 | Relabel | "Use a mix:" … "- internal rating like chess;" … "Unlocks = mastery gates" / "Difficulty = rating adjusted" / "Progress identity = rank + rating" / "Diagnosis = skill breakdown" (`docs/specs/learning-mastery-and-scoring.md:151-152`, `:162-165`) | The two halves each have a documented *existence* precedent, and the combination has none. `C4-chesscom-khan.md:90` (F1, tier Q5 official product documentation at `C4:87`): "The new Puzzle ratings use the same Glicko-style rating logic as your chess games (blitz, rapid, etc.)" — and `C4:121` records, verbatim and in source order: "These are fixed accuracy-percentage thresholds and pass/fail checks on mixed-skill assessments — no rating, no confidence interval, no item-difficulty parameter, and no probability estimate appears anywhere in this definition. This is a structurally different mechanism from every model C1 examined (BKT, PFA, DKT, IRT, education-Elo)." (**Corrected 2026-07-22 under `C-U1-003`:** as first written this row rendered that passage as "structurally different from every model C1 examined… no rating, no confidence interval, no item-difficulty parameter, and no probability estimate appears anywhere in this definition." — which reversed the order of the two clauses across an unmarked ellipsis and compressed "a structurally different **mechanism** from" to "structurally different from". Substance and verdict are unaffected; the defect was quotation fidelity in a record that declared it used no ellipsis.) No held source evaluates running a rating for difficulty *alongside* deterministic mastery gates. There is also an unstated dependency: `C1-knowledge-tracing.md:244` (F8) records that Elo-family rating "needs 'at least 100 students' to get good item-difficulty estimates", and `C4:101` records Chess.com's item ratings are crowd-calibrated ("its rating is determined by who is able to solve it"), i.e. population-derived. The design is defensible and uncontradicted, but it is a falsifiable bet whose feasibility turns on data the product does not yet have: bucket **Assumption**. |
<!-- LANDED C-U1-003 (V-U1, editorial): the C4:121 quotation in this row was reordered across an unmarked ellipsis; replaced with the verbatim source-order text, original rendering kept visible. Verdict unchanged. -->
| K-U1-017 | Relabel | "Do not score all mistakes equally." with "- Minor error." "- Medium error." "- Major error." "- Critical error." and "Factors later:" including "- response time;" "- table pace;" (`docs/specs/learning-mastery-and-scoring.md:169`, `:173-176`, `:178`, `:184-185`) | No dossier and no baseline source grades blackjack error severity or validates a severity-weighted score; the baseline's only adjacent requirement cuts the other way on one named factor — ALR-022 (`…-research.md:251`): "Record the first response, final response, correctness or ungraded status, assistance level, timing, and error classification **without equating speed with ability**." Severity weighting is a values commitment about what the product should punish (an EV-cost ordering is a blackjack-math question this program has not collected), so the bucket is **Product judgement**, with a `COVERAGE GAP` on the severity ordering itself. U1's own "Factors later" hedge (`:178`) means the response-time factor is deferred rather than adopted, so this is a labelling defect, not a live contradiction with ALR-022. |
| K-U1-018 | Preserve | "It never decides rules, legal actions, round outcomes, or Basic Strategy; the engine and strategy oracle remain authoritative." (`docs/specs/learning-mastery-and-scoring.md:206-207`) | Baseline ALR-035 verification clause (`…-research.md:334`): "canonical help is always available; any enriched help records intent, facts, assistance level, validation result, and fallback; **coaching cannot submit or grade a response**", and `…-research.md:407`: the skip test "uses deterministic, unassisted, coverage-complete rules and makes no psychometric-adaptivity claim." Also consistent with the repo constraint "Keep the simulator core UI-independent; UI code should call engine APIs, not own blackjack rules" (`AGENTS.md`). Bucket: `Product judgement`, correctly stated as an authority boundary rather than an empirical finding. Deterministic-vs-AI authority (family 6) is the one family where U1's uncited status costs it nothing, because the claim is constitutional, not empirical. |

**Counts.** 18 claims assessed: **Preserve 13**, **Relabel 5**, **Revise 0**, **Replace 0**,
**Remove 0**. Zero `Remove`/`Replace` is a substantive result, not an omission: nothing in U1 is
contradicted by evidence the project holds. Every failure found is an epistemic-label failure, which
is the failure mode the citation stripping would be expected to produce.

**Coverage correction landed 2026-07-22 (`C-U1-002`, editorial).** The counts line above reports "18
claims assessed" without stating coverage, and the coverage is **not complete in the way the record
implied**. A live U1 claim family — **progressive withdrawal of support** — was never assessed as a
claim, and that omission is what let the false negative corrected above stand. This is recorded as a
gap in the record's own coverage; **no verdict is added, changed, or removed**, and the counts above
remain 18 / Preserve 13 / Relabel 5 / Revise 0 / Replace 0 / Remove 0.

What went unassessed, verbatim and reopened first-hand in the landing pass:

- `docs/specs/learning-mastery-and-scoring.md:22-24` — "1. Play correctly with the table open."
  "2. Play correctly without the table and without time pressure." "3. Play correctly without the
  table at realistic table pace."
- `:35` — "4. Decision recall: choose the recommendation with progressively less support."
- `:87`, `:89-95` — "Reuse concepts across progressively harder formats:" … "1. recognition;"
  "2. guided classification;" "3. table-open decision;" "4. table-hidden decision;" "5. full evolving
  hand;" "6. interleaved review;" "7. timed practice after accuracy is stable."

Where the record did touch this material it touched something else: `K-U1-003` assesses the
*ordering* of `:30-38`; `K-U1-004` assesses only rung 7 of the exercise ladder; the non-material
notes treat the ladder only as a rung-*count* drift. The substantive content — fading support before
evidence counts as independent — was assessed nowhere.

Basis that was already in hand and unused, all in sources this record consulted:
`…-research.md:59` "**INFERENCE:** support a guided first encounter and fade assistance before
evidence is counted as independent mastery proof."; `:77` (`SCI-004`, `SCI-009`) "**INFERENCE:**
begin with a canonical worked state or nearly complete assembly, then fade blocks and hints; do not
force the same scaffold on demonstrated experts."; and the rejected-option row at `:387`, which
rejects "Forced same-item retries until a correct answer appears" on `SCI-001`, `SCI-002` because
"It can erase first-response evidence and substitute short-term repetition for later retrieval."

Assigning a verdict to this family is outside an editorial landing pass; it is recorded here as an
unassessed family so a later reader does not mistake the 18 rows for full coverage of U1's
load-bearing claims.
<!-- LANDED C-U1-002 (V-U1, editorial): recorded that U1's progressive-withdrawal-of-support claim family was never assessed, with the unassessed text and the in-hand basis named; no verdict added or changed. -->

## Citation state

| Citation ID | Verdict it supports | Unit | State |
|----|----|----|----|
| SCI-005 | K-U1-013 (Preserve), K-U1-014 (Relabel) | U1 | VERIFIED |

`SCI-005` was re-opened directly on 2026-07-21 (three redirect hops from
`https://link.springer.com/article/10.1007/s10984-024-09501-4`) and both quoted sentences were read
in the article's Discussion. No `Preserve` or `Revise` in this record rests on an `UNVERIFIED` or
`UNVERIFIABLE` citation. All other Preserve rows rest on Phase 1 dossier findings, whose citation
state was established and corrected by the P1 verification/remediation passes and is not re-judged
here.

## Conflicts logged (recorded, not resolved)

**Feedback timing — three positions, all held by the project simultaneously.** Logged against
K-U1-014.

1. Import position: "**Immediate and corrective.** Right after each decision, not batched. Immediate
   correction is where misconceptions actually get fixed."
   (`docs/imports/v2-research-2026-07-11/course-bundle/how-to-teach.md:105`).
2. Baseline/meta-analytic position: "delayed feedback being slightly more effective than immediate
   feedback" and "A combination of feedback timing approaches was ineffective… clarity and
   consistency… is more essential than the actual timing of the feedback" (`SCI-005`, re-opened
   2026-07-21; carried in the baseline at `…-research.md:43` and `:434-438`).
3. Definitional position: "The subjects should receive immediate informative feedback and knowledge
   of results of their performance." (Ericsson et al. 1993 p. 367, quoted verbatim at
   `docs/superpowers/research/foundation-audit-p1/dossiers/C3-deliberate-practice.md:68-69`) — which
   the dossier itself tiers as "Q4 (the theoretical-framework/definitional portion of the paper — a
   normative synthesis, not itself an experiment)" (`C3:60-61`), i.e. a *definition of the construct*,
   not a timing experiment.

U1's own position (`:133-134`) is a fourth, mode-scoped variant. It is **not** adjudicated here.
Recorded observation only: U1 sits closer to position 2 than the import does — it declined to inherit
`how-to-teach.md:105`'s unhedged claim — which is drift away from over-strength.

**Second, minor:** U1 lists "response time" and "table pace" as future scoring factors (`:184-185`)
while baseline ALR-022 (`…-research.md:251`) requires error recording "without equating speed with
ability." Not a live contradiction (U1 defers these under "Factors later:", `:178`); logged so it is
not discovered later as a surprise.

## Calibration — what "good" looks like

The bar is `journal/decisions.md` rows R20, R24, R25, R26, R27: an exact doc path plus section/line,
or a measured figure — and in R24/R26, a self-correction kept visible inside the record rather than
quietly back-filled. Against that bar:

- Every row above carries a `file:line` anchor on both the audited claim and its basis, and every
  `Evidence-backed` Preserve carries a page/section or a measured figure inside the quoted dossier
  passage (e.g. K-U1-011's "72 % vs. 38 %, d = 1.05"; K-U1-006's "46% vs. 10%"; K-U1-010's "12 of
  271 comparisons").
- **Self-corrections kept visible in this record** (R24/R26 discipline): (a) the dispatch's dossier
  path `docs/superpowers/research/foundation-audit-p1/C3-deliberate-practice.md` and import path
  `…/course-bundle/v2-research-02-curriculum-and-pedagogy.md` are both wrong — the real paths are
  `…/foundation-audit-p1/dossiers/C3-…` and `…/v2-research-2026-07-11/research/v2-research-02-…`;
  stated rather than silently substituted. (b) An initial reading treated K-U1-014 as a candidate
  `Revise` on strength grounds; it was moved to `Relabel` once it was clear U1 states no strength at
  all, so the defect is the label, not the wording. (c) An initial reading treated the K-U1-001
  status line as non-material; it was promoted to a row because it decides whether the rest of the
  audit is load-bearing.
- **Where the bar is not met, said plainly:** K-U1-017's bucket rests on the *absence* of any held
  source on error severity. That is a `COVERAGE GAP`, and closing it would require collection this
  role cannot do. Bounded gap spec, for a collector on a verifier's call: *does any published source
  grade the instructional cost of situation→action rule errors by severity tier (as opposed to
  binary correct/incorrect), in any rule-application domain?* Bound: one focused pass, ≤4 citations,
  no walk into the general error-analysis literature. "We looked hard and it isn't there" is the
  expected and acceptable answer.

## Non-material notes

*Un-numbered, no verdict, no landing loop. Two kinds of item are routed here: (a) content outside
U1's assigned decision families (1, 4, 5), which belongs to another unit's audit and is recorded only
so a later reader knows it was seen and deliberately left alone; (b) cosmetic or mechanical
observations.*

- **Left alone — belongs to another unit's families.** `## Simulated Players Later` (`:190-201`,
  explicitly "Not V1 active implementation"); the storage/retrieval sentences in `## Future AI Coach`
  (`:209-212`, "browser-local storage is enough before accounts, sync, or analytics justify a server
  database" and "Use explicit retrieval of small, tagged, verified curriculum facts first—not vector
  RAG") — these are stack/storage decisions already owned by `journal/decisions.md` R24/R27 and are
  not re-litigated here; `## Help Modes`' three mode bullet lists (`:118-131`), which are session-
  construction (family 2); "In Free Play, the game should not manipulate cards for lesson purposes."
  (`:14-15`), which restates the `AGENTS.md` card-flow constraint. Nothing examined in these sections
  contradicted anything in the Phase 1 archive.
- **Left alone — no load-bearing consequence.** "Do not lock the entire long-term mastery ladder
  yet." (`:26`) — a scoping instruction, not a claim. "V2 concentrates on the first four stages and
  table-open transfer." (`:40-41`) — a milestone-scope statement whose correctness is owned by
  `ROADMAP.md`, not by this doc. "Do not duplicate the same lesson as several prose variants."
  (`:97-98`) — an authoring-hygiene instruction folded verbatim in substance from
  `…curriculum-and-pedagogy.md:67`.
- **Cosmetic / mechanical.** The title says "Future Design Notes" while downstream specs consume the
  file as a requirement source; this is a naming mismatch only — the substantive version of the point
  is K-U1-001 and is assessed there, not here. The `## Basic Strategy Categories` list (`:44-51`)
  mixes hand classes (hard/soft/pairs) with actions (double/surrender) and one information source
  (dealer upcard logic) in a single flat list; no decision turns on the list's internal taxonomy.
  U1's exercise ladder has 7 rungs against the import's 8 (`…curriculum-and-pedagogy.md:56-65`); the
  substantive half of that drift (the timed-practice gate) is assessed at K-U1-004, and the remaining
  rung difference is already an open question at `PROGRESS.md:98`.
