# Product Design Inputs — the Phase 3 → Phase 4 bridge

> **Status: the handoff artifact.** Phase 4 designs the curriculum, the skill graph, and the activity
> catalog *from this document*, without reopening Phases 1–3.
>
> **What this is.** The charter's seven Phase 3 deliverables, folded into one document rather than
> authored as seven — a deliberate, user-approved deviation recorded here so it is a visible choice.
> Evidence Summary, Research Synthesis, Project Implications, Gap Map, Assumption Register, and
> Decision Candidates appear below as sections; Product Design Inputs is the whole.
>
> **What this is not.** Not a curriculum, not an activity design, not a sequence. Every line below is
> a *constraint on* or *input to* design. Where it says "the evidence does not settle this," that is
> the finding, and Phase 4 must design knowing it.

**Evidence base:** `docs/superpowers/research/foundation-audit-p1/` (mechanics: mastery, adaptivity,
spacing, deliberate practice, blackjack trainability) and
`docs/superpowers/research/foundation-audit-p3/` (subject matter: probability, EV, variance, risk).
**Verdicts on existing claims:** `docs/superpowers/research/foundation-audit-p2/`.

---

## 0. Read this before using anything below

The Phase 3 dossier carries **known, recorded, unfixed defects.** The polish pass was deliberately
stopped (user decision, 2026-07-22) in favour of reaching design. What that costs you, precisely:

- Three of six top-up findings were rated `DEFECTIVE` by an independent verifier, with ten
  corrections specified and **not applied**. Authoritative list:
  `docs/superpowers/research/foundation-audit-p3/verification/V-C7-topup.md`.
- **Two of those defects run pessimistic** — the dossier understates its own evidence (a quote
  truncated just before the sample size the paper does print; a review glossed as having "no
  controlled experiments" when it cites two).
- **One known-missing study**: Floyd, Whelan & Meyers (2006), PMID 16536667 — a randomised
  controlled trial of instruction on irrational gambling beliefs, positive on beliefs *and* play. It
  is not in the dossier. It bears on §2.5.
- Sufficiency stands at **G1 closed; G2 closed; G3 evidenced-absence; G4, G5, G6 open.**

**Rule for Phase 4:** anything below marked `[VERIFIED]` was independently checked against the opened
source. Anything marked `[UNVERIFIED]` or `[DEFECTIVE-SOURCE]` must not be leaned on without
reopening the source first. Do not inherit — that is this program's founding error class.

---

## 1. Confirmed learning principles

Evidence-backed and independently verified. These constrain design.

### 1.1 Interleaving is the practice structure `[VERIFIED]`
Interleaved practice on *different kinds of problems* beat blocked practice 72% vs 38% (d=1.05) on a
choose-the-right-strategy task, and the benefit held even when the kinds were superficially
dissimilar. The mechanism the authors name is what matters here: it improves **discrimination between
kinds of problems** and **strengthens the association between each kind and its strategy.**

Basic strategy is exactly that task. The hard part is not "what do I do with hard 16" — it is
noticing this is a hard 16 and not a soft 16 or a pair of 8s. **Blocked practice removes the
discrimination step entirely:** inside a block labelled "hard totals," classification is free.

*Transfer caveat, stated: grade-7 mathematics, n=140. Adult blackjack transfer is untested.*

### 1.2 Experience and description teach different things `[VERIFIED]`
Adults who learn a probability by **sampling outcomes** behave as if they *underweight* rare events;
adults given the same probability as a **stated description** behave as if they *overweight* them.
Robust across >70,000 choices, with a large moderator: the gap is ~20 points for risky-vs-safe
choices and nearly vanishes when both options are risky.

**This product teaches primarily by dealing hands — i.e. by experience.** Expect learners to
systematically underweight rare events: dealer 21s, long losing runs, the tail that makes variance
feel unfair. A trainer that only deals hands will produce players who under-respect the tail.

### 1.3 Outcome bias is large, robust, and survives knowing about it `[VERIFIED]`
Pre-registered replication, N=692: outcome bias reproduced at a **larger** effect than the original —
and was still present **among participants who had themselves stated that outcomes should not be
considered** when evaluating decisions.

**Telling learners "judge the decision, not the result" will not be sufficient.** They will agree
with you and keep doing it. See §2.1.

### 1.4 Simulation alone does not produce understanding `[DEFECTIVE-SOURCE — see §0]`
A three-cycle classroom programme found simulation software produced *disappointing* conceptual
gains; gains appeared only when the activity forced students to **confront their own prediction
against the simulated result.** The paper's own conclusion is that simulations do not guarantee
conceptual change.

**Design consequence: a "watch 10,000 hands play out" visualisation will not teach variance.** A
predict-then-reveal-then-reconcile loop might. Predict first, then show.

### 1.5 Practice raises confidence even when the outcome is uncontrollable `[VERIFIED]`
In a chance apparatus, a brief practice period significantly raised participants' confidence of
success on an outcome they could not influence. In a pure-chance card game, adults bet more against a
nervous-seeming opponent than a confident one.

**This is a hazard specific to what you are building.** A trainer that makes people feel more
skilled at blackjack is, on this evidence, doing something that happens whether or not their decisions
actually improved. Confidence gain is not a proxy for learning and must never be used as one.

### 1.6 Frequency formats help, with a firm ceiling `[DEFECTIVE-SOURCE — see §0]`
Presenting chance as natural frequencies ("3 of every 13 hands") beats probabilities — but roughly
**three quarters still fail** the target task, and about half quietly translate the frequencies back
into probabilities. In a sample *more* schooled than your users.

**Use frequency framing; do not expect it to carry the concept on its own.**

### 1.7 Teaching the maths does not by itself change play `[VERIFIED]`
198 university students taught probability theory *using gambling examples* showed superior odds
calculation and resistance to gambling fallacies six months later — and **no change in actual
gambling behaviour.**

**The single most important line in this document for scoping.** Knowledge gain and behaviour change
are separate outcomes, and this product's goal is the second one. Measure play, not quiz scores.

### 1.8 Blackjack players use a false heuristic that outperforms nothing-at-all `[VERIFIED]`
The only on-domain source in the dossier: casino blackjack players use a transparently false
heuristic — *assume the next card is a ten* — which is far easier to learn than optimal strategy and
is associated with better expected returns than unaided play. The paper further contends that
inferring EV from subjective probability may be "both uncommon and non-normative" even in blackjack.

**Take the pedagogical point seriously:** a cheap wrong model that improves play may beat a correct
model nobody internalises. That is a genuine design option, not a concession.

---

## 2. Unresolved product assumptions — what the evidence does *not* settle

These are the honest gaps. Phase 4 must design *knowing they are open*, and must not write them up as
evidence-backed.

### 2.1 Whether outcome-bias separation can be taught at all — **OPEN, and it is load-bearing**
`product-vision.md:74-75` commits this product to feedback that "judges the quality of a decision
against the active ruleset-matched strategy, never the hand result," and it is implemented
(`controller.ts:210,217`). The commitment is almost certainly right.

**There is no evidence in this project's possession that a learner can be trained to internalise it.**
Outcome bias is well demonstrated; correcting it is not. One dedicated intervention paper exists and
resisted retrieval at full-text level through four separate barriers; at abstract level it reports
that raising the salience of *intentions before outcomes are disclosed* helped — a sequencing idea
Phase 4 may use as a hypothesis, not as a finding.

**Route: playtest, not more research.** See §6.

### 2.2 Whether EV instruction transfers to choices — **EVIDENCED ABSENCE**
Not "we didn't look." Two independent agents, multiple query routes and hosts, found **no study**
measuring whether expected-value instruction improves in-game decisions. The nearest handbook review
suggests simple, familiar rules train well and predicts Bayes-like rules to be **poor** training
candidates.

**Do not schedule further collection on this.** Treat it as settled-empty and design around it.

### 2.3 Whether a debiasing *game* works for this product's concepts — **OPEN**
A single ~60-minute game reduced six cognitive biases by medium-to-large amounts persisting 8–12
weeks, and a follow-up found transfer to a real, unannounced decision weeks later (29% less likely to
choose the inferior solution). Encouraging for the *format*.

Three cautions, all verified: the design has **no untrained control arm** (game vs video only); the
**video beat the game** on bias *knowledge*; and **none of the six biases trained is outcome bias or
EV reasoning.** The follow-up shares authors with the original and evaluates the same game.

**Read it as: interactive format is a reasonable bet. Not as: this proves your game teaches.**

### 2.4 Correcting gambler's fallacy / hot-hand / illusion of control — **OPEN**
Prevalence is strongly established, including in the field (real casino patrons, own money).
Correction is thinly evidenced.

### 2.5 Randomness instruction — **OPEN, with a known-missing source**
See §0: Floyd et al. (2006) is a randomised controlled trial reporting positive effects on both
beliefs and play, and it is **not in the dossier**. Before Phase 4 designs anything resting on
"teaching randomness doesn't change behaviour," **open that paper.** It may well cut the other way.

---

## 3. Mastery and progression constraints

From the Phase 2 verdicts, verified against shipped code.

**What actually exists today:**
- Mastery is one line (`web/src/learn/controller.ts:361`): every required check answered correctly
  once, ever. No repetition, no decay, no spacing, no assisted-vs-independent distinction.
- `validate.ts:65-66` rejects any required check that is not a `question` step. **100% of shipped
  mastery evidence is declarative multiple-choice. A played hand can never satisfy completion.**
- Completion **gates nothing** (`Learn.tsx:4`).
- The durable-progress schema has **zero product consumers** — imported only by a QA harness.

**Constraints this places on Phase 4:**
1. **A mastery model that cannot ingest played-hand evidence is disqualified.** §1.7 says measure
   play, not quiz scores; the current shape structurally cannot.
2. The richer documented model (`learning-mastery-and-scoring.md`) is banner-marked "parked for V2+"
   and its stated ladder, hint ladder, spacing model and error-severity tiers are `Relabel`led as
   **product judgement, not evidence-backed**. Phase 4 may adopt them — as design choices, not as
   research conclusions.
3. **Confidence must not be a mastery signal** (§1.5).

---

## 4. Activity-evidence requirements

What an activity must produce for it to count as evidence of learning.

1. **Every activity declares which capability it measures**, and the measurement must be of *decision
   behaviour*, not recognition, wherever the capability is a decision (§1.7).
2. **Practice pools are mixed by default** (§1.1, and the CFL-007 ruling in §7). A blocked pool is
   permitted only for first exposure to a category, and must be declared as such.
3. **Classification must be a required step** wherever the real task requires it. If an activity tells
   the learner "this is a soft total," it is not measuring the skill.
4. **Predict-then-reveal for any distributional concept** (§1.4). A simulation that does not first
   capture a prediction is decoration.
5. **Assistance must be recorded honestly.** Phase 2 found the code labelling a bare retry as
   `'instruction'` when no instruction is delivered, and the mislabel propagating into a test that
   calls it "a hinted attempt." Any assistance level an activity records must correspond to
   assistance the learner actually received.
6. **Rare-event exposure must be deliberate** (§1.2). Experience-only learners underweight the tail;
   if the tail matters, the curriculum has to engineer encounters with it rather than wait for the
   shoe.

---

## 5. AI-authority boundaries

Carried from the architecture design and the Phase 2 verdicts.

- **Blackjack rules, legality, totals, dealer play, and outcomes are engine-owned.** The learn layer
  never regrades them. This is implemented and was verified in Phase 2; keep it.
- **Basic-strategy correctness is a deterministic oracle**, not a model judgement.
- **A model may not be the authority on whether a learner has mastered something.** Mastery is
  computed from recorded evidence.
- **An agent's endorsement is not evidence.** Phase 2 found a design justifying four choices because a
  subagent "endorsed them architecturally." Phase 4 must not repeat it: a code-check an agent
  performed is `OBSERVED`; an agent's opinion is not warrant.
- Numeric thresholds and retention intervals are **not** "research-calibrated" — the project's own
  baseline states optimal intervals cannot be copied into product configuration. Any constant Phase 4
  picks is a product judgement until calibrated against this product's own data.

---

## 6. Decisions that need playtesting rather than more research

These are settled as *unanswerable from literature*. Route them to the Phase 5 slice.

| # | Question | Why playtest |
|---|---|---|
| P-1 | Can learners be trained to evaluate their decisions independently of the hand result? | §2.1 — the one dedicated intervention is abstract-only; the commitment is already shipped. Measure it in-product. |
| P-2 | Does EV instruction change play? | §2.2 — evidenced absence. No further collection authorised. |
| P-3 | Does mixed practice help *this* audience, or overwhelm beginners? | §1.1's transfer to adult blackjack is untested. The CFL-007 ruling (§7) is a bet; instrument it. |
| P-4 | Does a false-but-cheap heuristic (§1.8) beat correct strategy for novices in practice? | Directly testable, and cheap. |
| P-5 | Does confidence rise faster than skill? | §1.5 says it will. Track both; if they diverge, the product is producing false confidence. |

---

## 7. Decision candidates — and one decision made

### CFL-007 — RESOLVED 2026-07-22 (user decision)

**Conflict:** `2026-07-10-v2-learning-foundations-roadmap-design.md:56-57` sequences Basic Strategy
mastery as "hard totals, hard doubles, soft totals, pairs/splits, **then** mixed review" — blocked
practice with mixing last. The project's own held evidence points the other way (§1.1).

**Resolution: block to introduce, interleave to practise.** A category may be introduced in isolation
so the concept lands. Once introduced, **all practice and review draws from a mixed pool**, and the
learner must classify the hand before choosing an action. Mixed review is not a final stage; it is the
steady state.

**Why not full interleaving from lesson one:** the interleaving result is grade-7 mathematics, n=140,
and transfer to adult blackjack is untested. Removing the on-ramp entirely bets the beginner
experience on that untested transfer, and a learner meeting a soft 17 before knowing what "soft" means
is simply confused. Recorded as `P-3` in §6 — if playtests show learners handle full mixing, widen it.

**Action for Phase 4:** revise `:56-57` to state the introduce-blocked / practise-mixed rule
explicitly. Sequence design belongs to Phase 4; this ruling constrains it.

### Open decision candidates for Phase 4
- Whether the curriculum teaches EV explicitly at all, given §2.2 and §1.8.
- Whether to adopt a deliberately simplified heuristic as a scaffold (§1.8) or teach correct strategy
  from the start.
- What replaces multiple-choice as mastery evidence (§3).
- Whether rare-event exposure is engineered or organic (§4.6).

---

## 8. Accessibility constraints

Carried from the approved activity baseline, with a Phase 2 correction applied: the reduced-motion
requirement rests on **WCAG 2.2 SC 2.3.3, which is Level AAA**, and was presented alongside AA and A
criteria with no level stated. Phase 4 must **state a target conformance level** before treating that
requirement set as one normative baseline. Reflow (1.4.10) and Text Spacing (1.4.12) are AA; Timing
Adjustable (2.2.1) is A.

The activity baseline's accessibility evidence is an honestly-recorded **coverage gap**, not a body of
findings. Treat it as product judgement.

---

## 9. What Phase 4 owns

The skill graph and prerequisites; learning outcomes for rules, hand reading, strategy, probability,
EV and variance; the activity taxonomy; which activity measures which capability; per-activity
evidence and mastery rules; session composition; interaction UX; and the first vertical slice to
build. **None of that is decided here.**
