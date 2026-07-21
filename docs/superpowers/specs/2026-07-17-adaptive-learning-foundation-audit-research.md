# Adaptive Learning Foundation Audit — Research Program

> Status: **APPROVED 2026-07-19** (drafted 2026-07-17, amended 2026-07-19 before approval).
> The phase map now runs **P1–P6** (research P1–P3 + product P4–P6); P2–P3 are detailed at their gate,
> P4–P6 are a forward map whose scope authority is `ROADMAP.md`.
>
> *2026-07-21 amendment (user-directed, DRAFT — pending approval with the Phase 2 plan revision):
> extended the phase map from P1–P3 to **P1–P6** to make the research→product direction explicit;
> added deliverable **7, Product Design Inputs**, as the bounded P3→P4 bridge; recorded that **P4 owns
> curriculum and activity design**. Phase 2 itself is re-scoped to a proportional-rigor, load-bearing
> audit in its own plan. These additions are DRAFT until approved alongside that plan.*
>
> *2026-07-19 amendments (pre-approval): added a Phase 1 depth budget; made UNVERIFIED a transient
> state with a defined resolution path and a no-UNVERIFIED-at-gate rule; gave the load-bearing
> mastery-model question an explicit non-blocking escape. Acceptance criteria updated to match.*
>
> *2026-07-19 amendment (post-approval, user-directed): added the **research sufficiency** rule — a
> second, independent axis (SUFFICIENT / INSUFFICIENT) judged per dossier by the verifier, because
> citation verification asks whether what is present is true and cannot ask whether it is enough.*
>
> *2026-07-20 amendments (user-approved at the Phase 1 gate, in response to §10 items 1–3 of the
> gate summary — each rule below bound during the Phase 1 run and caused a defect that could not be
> discharged): **(5)** sufficiency top-ups are exempt from the initial citation cap; **(6)** an
> additional focused pass is permitted where the previous pass was mis-scoped or the missing
> evidence is already identified; **(7)** editorial correction is added as a distinct remedy,
> separate from collection. Two factual errors in this charter were corrected at the same time —
> the halted-run dossiers and the Elo framing.*
>
> *Approval covers the charter and Phase 1 only. P2 and P3 remain gated — each is detailed and
> approved at its own boundary, per the phase map.*
> Scope: validate, verify, and expand the adaptive-learning research foundation; fill named evidence gaps.
> Authority: **research evidence only.** This program never changes adopted product behavior; owned
> designs remain authoritative. It produces evidence, classification, and *candidate* decisions — not
> product commitments.

## Mission

Build a research foundation future contributors can trust for years. The objective is **not** to
maximize evidence-backed decisions; it is to make the epistemic standing of every finding and
decision explicit and honest. This is a **validation and expansion** project, not a rewrite.

Three jobs:

1. **Fill genuine evidence gaps** — research only the currently uncovered topics (Workflow A).
2. **Verify existing claims** — every citation independently re-checked against a fixed contract.
3. **Challenge unsupported assumptions** — adversarially audit the existing foundation (Workflow B),
   and report both what fails *and* what survives scrutiny.

### Non-goals and failure definition

- **Not** a rewrite of the approved baseline; **not** a hunt to find flaws for their own sake.
- **The defect this program guards against is misrepresenting a product decision as research
  evidence.** A design choice with no supporting literature is legitimate — it must be *classified*,
  not rejected. Absence of evidence is never grounds to delete a defensible design.
- Do not optimize for agreement; optimize for correctness. Never overstate certainty. Prefer an
  explicit **"unknown"** over unsupported confidence.

## Relationship to the approved baseline

The approved evidence baseline is
[`2026-07-16-adaptive-learning-product-activity-research.md`](./2026-07-16-adaptive-learning-product-activity-research.md)
(24 sources, 41 `ALR-` requirements, adopt/reject/defer dispositions).

- **Extend and audit it; never duplicate it.** New collection targets only topics the baseline did
  not cover. The audit re-examines the baseline's own claims for citation drift and overstatement.
- **This program does not edit the baseline.** It layers a status classification on top (below) and
  emits *Decision Candidates*; any change to the baseline is a later, separately approved act.

## Classification system — two layers

Every important finding, claim, and decision carries **two labels on two different axes**. They
answer different questions and neither replaces the other.

### Layer 1 — Provenance label (basis of the evidence) — unchanged from the baseline

Reused verbatim so this program and the baseline stay comparable:

- **OBSERVED** — directly visible in a publicly accessible product flow, help page, demo, or screenshot.
- **PUBLISHED** — claimed or found in an attributable official source, primary study, standard, or
  authoritative review.
- **INFERENCE** — the project's reasoned interpretation or proposed application of the above.
- **COVERAGE GAP** — a required question for which adequate primary/official evidence was not found.

### Layer 2 — Status bucket (project-level epistemic standing) — canonical vocabulary

Used **verbatim** in every artifact this program produces (per the evidence-bucket taxonomy):

- **Evidence-backed** — supported by the literature.
- **Product judgement** — an intentional design choice not currently evidence-backed. Valid when
  labelled as such.
- **Assumption** — plausible, but requires future validation via playtesting or product data.
- **Unsupported** — actually contradicted or without defensible basis; should be reconsidered or removed.

### How the layers stack

The status bucket is the finding's **standing**; the provenance label(s) are the **basis** cited
beneath it. Example forms:

- `[Evidence-backed] — basis: PUBLISHED (SCI-001, §Results)`
- `[Product judgement] — basis: INFERENCE + project constraint; no supporting literature`
- `[Assumption] — basis: INFERENCE from COVERAGE GAP; validate via playtest`

Rules for assignment:

- **Reserve Unsupported** for claims that are contradicted or baseless — *not* for the merely
  uncited. The fix for an unevidenced-but-reasonable choice is **relabel to Product judgement**, not
  delete.
- **Product judgement vs Assumption** is decided by *falsifiability intent*: would the decision change
  if playtesting contradicted it? If yes → **Assumption**; if it is a values commitment that holds
  regardless → **Product judgement**.
- Auditing the baseline **does not alter its provenance labels**; it adds a status bucket and checks
  that the provenance honestly supports that bucket.

## Anti-fabrication verification contract

Anti-fabrication is the core risk. **No synthesis, confidence rating, or recommendation may rest on
an unverified citation.** Verification is performed by a **separate agent that did not collect the
source** — collection and verification never share an agent.

### The three-point contract

A citation is **VERIFIED** only when the independent verifier confirms all three:

1. **Exists** — the source resolves (live URL / valid DOI, or a real locatable publication) and its
   author, venue, and date match the claim.
2. **Supports** — the source actually states the claimed thing (not an adjacent claim, not the opposite).
3. **Strength honest** — the claim's strength matches the source (a correlational or meta-analytic
   finding is not cited as causal; a product blog or marketing page is not cited as a controlled study).

Every **VERIFIED** judgment **must record the exact supporting location** — page, section, table,
figure, paragraph, or a quoted passage where practical — so a future reader can re-check without
re-doing the search.

### Verification states

| State | Meaning | May feed synthesis / confidence / recommendations? |
|---|---|---|
| **VERIFIED** | All three points confirmed, with an exact supporting location recorded. | Yes |
| **UNVERIFIED** | Collected but not yet independently confirmed, or failed a point. | **No** — quarantined until resolved or downgraded (see below). |
| **UNVERIFIABLE** | Cannot be reached at all (paywall, dead link, source not locatable). | **No** — kept only in the source-lead register; never silently upgraded. |

- **UNVERIFIABLE** sources may remain in a **quarantine / source-lead register** as leads for future
  work, but they **must not contribute to synthesis, confidence, or recommendations** in any way.

#### Resolving UNVERIFIED — no permanent limbo

UNVERIFIED is a **transient** state, never a resting place. It is owned by the **verifier that
assigned it**, who must record *which* of the three points failed and why. Before the phase gate,
every UNVERIFIED citation is driven to a terminal state by one of exactly three moves:

- **One re-check pass**, by the same verifier, if the failure was mechanical (wrong URL, wrong
  edition, ambiguous location) → resolves to VERIFIED or continues below.
- **Downgrade the claim** to what the source actually supports, then re-verify the weakened claim
  → VERIFIED at reduced strength, with the downgrade noted in the Strength check field.
- **Drop the citation** — the claim loses that support and is re-bucketed accordingly (commonly to
  Product judgement or Assumption). If the source could not be reached at all, it goes to
  **UNVERIFIABLE** and the quarantine register.

**A phase gate cannot pass with any citation still UNVERIFIED.** If a citation resists resolution
within the one re-check pass, it is dropped rather than carried — the register keeps it as a lead.
- **Reuse of the halted run — CORRECTED 2026-07-20.** This charter previously stated that partial
  dossiers from the halted run were on disk in `docs/superpowers/research/`
  (`act-r-procedural-skill.md`, `chess-com.md`, `deliberate-practice.md`, `00-baseline-claim-ledger.md`)
  and could be reused as untrusted leads. **That was factually wrong.** Those files exist nowhere —
  not in the working tree, not in any branch, and not in any commit. They were **unavailable and
  therefore could not be reused**, and no Phase 1 evidence derives from them. Phase 1 collected
  everything from scratch. Had any such file been found, it would have been an untrusted lead only,
  passing the same independent contract as newly collected evidence.

### Research sufficiency — a second, independent axis

**Citation verification alone is not enough.** A dossier may contain nothing but valid, VERIFIED
citations and still omit an important body of evidence. Verification asks *"is what is here true?"*
It cannot ask *"is what is here enough?"* — and a formally complete dossier is not therefore a
substantively complete one.

**The standard:** a dossier is **sufficiently researched** only when additional searching is unlikely
to materially change its conclusions.

If an independent verifier finds that **major evidence traditions, landmark sources, opposing
positions, or required sub-questions** are still missing, the verifier marks the dossier
**INSUFFICIENT** and returns it for **one focused collection pass**.

**The two judgments are recorded separately and never collapse into one another:**

| Axis | Values | Scope |
|---|---|---|
| **Citation state** | VERIFIED / UNVERIFIED / UNVERIFIABLE | Per citation — is this specific claim's source real and honestly used? |
| **Dossier sufficiency** | SUFFICIENT / INSUFFICIENT | Per dossier — is the body of evidence complete enough to conclude from? |

A dossier can be all-VERIFIED and still INSUFFICIENT; that is the exact case this rule exists to
catch. It can also be SUFFICIENT while carrying honest COVERAGE GAPs — a gap the collector *found and
named* is evidence of thorough searching, not of insufficiency. Insufficiency is about what was
**missed**, not about what was **searched for and honestly reported absent**.

**For an INSUFFICIENT dossier the verifier records:**

1. **what important evidence appears missing** — named traditions, landmark sources, or opposing
   positions, specifically enough to search for;
2. **why the omission could materially affect the findings** — which conclusion would move, and in
   which direction;
3. **the exact scope of the additional collection pass** — bounded, so the re-collection is targeted
   rather than an open re-run.

The focused pass is normally **one pass**. Its output is re-verified for citations, and the
sufficiency judgment is then re-made on the enlarged dossier.

#### Two remedies, not one *(amendment 7, 2026-07-20)*

Sufficiency has **two distinct failure modes**, and Phase 1 proved that giving them a single remedy
leaves real defects undischargeable. The verifier must name which one applies:

| Failure mode | Remedy | Agent role |
|---|---|---|
| **Evidence is missing** — a tradition, landmark source, or opposing position is genuinely absent from the dossier's sources | **Collection pass** — search for and cite the missing work | `audit-collector` |
| **Evidence is present but mishandled** — material inside an already-cited source was omitted, misread, overstated, or inaccurately described | **Editorial correction pass** — re-read the source and fix the prose | `audit-editor` |

**Do not dispatch a collector when the needed information is already inside a cited source.** This
was the program's dominant defect: four of four Phase 1 sufficiency failures traced to material
already in hand. Adding a citation is not a substitute for reading one.

An editorial correction must land **in the dossier itself**, not only in a verification record. A
defect recorded only by the verifier is still a defect in the dossier.

#### Bounded additional passes *(amendment 6, 2026-07-20)*

An **additional** focused pass beyond the first is permitted in exactly two circumstances:

1. the previous pass was **mis-scoped** — it searched for the wrong thing, so the gap was never
   actually addressed; or
2. the missing evidence is **already specifically identified** — the source is named, or already
   obtained and read, and only needs incorporating.

The justification must be **recorded** with the pass. The pass stays **bounded to the named gap**.
This is not an unlimited retry loop: a pass that simply failed to find anything is not grounds for
another, because "we looked hard and it isn't there" is a legitimate research result and must be
recorded as a COVERAGE GAP rather than re-run.

### Per-citation verification record (shape)

Each dossier ships a verification record per citation so the trail is auditable for years:

| Field | Content |
|---|---|
| Claim | The specific claim the citation supports. |
| Source | ID, title, authors, venue, date, URL/DOI. |
| State | VERIFIED / UNVERIFIED / UNVERIFIABLE. |
| Supporting location | Page / section / table / paragraph / quote (required for VERIFIED). |
| Strength check | Claimed strength vs source strength; note any downgrade. |
| Verifier | The agent/pass that verified (must differ from collector). |

## Workflows

### Workflow A — Evidence collection & verification (Phase 1)

Research only the uncovered topics; collect raw dossiers; then verify every citation under the
contract in a **separate pass**. No synthesis is built on unverified evidence.

### Workflow B — Adversarial audit (Phase 2)

Audit the existing foundation — especially older uncited pedagogy documents, unsupported or
overstated claims, outdated evidence, hidden assumptions, citation drift, and education myths. The
goal is **which conclusions survive scrutiny**, reporting both what fails and what remains valid. For
each audited item recommend one of: **Preserve · Relabel · Revise · Replace · Remove**. An
unsupported *product judgement* is not a defect — presenting judgement *as evidence* is.

## Deliverables (6 + the product-design bridge)

The six research deliverables land in `docs/superpowers/specs/` under **research-evidence-only**
authority; each uses the two-layer classification verbatim. The seventh, **Product Design Inputs**, is
the bounded P3→P4 handoff added 2026-07-21 (see below).

1. **Evidence Summary** — verified findings only, each with provenance + status bucket + supporting
   location. UNVERIFIED/UNVERIFIABLE items are listed separately and excluded from conclusions.
2. **Research Synthesis** — integrated conclusions, with **evidence**, **inference**, and
   **recommendation** kept visibly separate.
3. **Project Implications** — for every major finding: implications, tradeoffs, unknowns, and the
   affected project areas.
4. **Gap Map** — outstanding research questions, open problems, and future work (including topics that
   came back UNVERIFIABLE).
5. **Assumption Register** — one row per important assumption:

   | Assumption | Evidence | Confidence | Validation Method |
   |---|---|---|---|

   *Validation Method* must explicitly name the mode: **academic research · playtesting · production
   data · future experimentation**.
6. **Decision Candidates** — review every existing project decision and classify each as
   **Confirm · Revise · Reconsider · Remove**, with the reason. These are *candidates*; adoption is a
   separate approval.

**7. Product Design Inputs — the P3→P4 bridge.** *Added 2026-07-21.* Translates the approved research
conclusions into **bounded inputs** for the product-design phase (P4): confirmed learning principles;
unresolved product assumptions; mastery and progression constraints; session and adaptation
constraints; activity-evidence requirements; AI-authority boundaries; accessibility constraints; and
the decisions that need **playtesting rather than more research**. It is a handoff, not a design — it
**must not** author the curriculum or the activity catalog (that is P4). Its purpose is to make P4
possible without reopening P1–P3.

## Phase map

Execution engine: **SDD orchestration** — the orchestrating session holds the baton, dispatches
subagents, and **gates at every phase boundary**. No autonomous Workflow run; no phase begins until
the prior phase's output is reviewed.

**Research → product.** P1–P3 are the *research* program this charter governs: they establish a
**trustworthy, usable foundation for designing** the learning product — they do **not** build it.
P4–P6 are the *product* phases that consume that foundation; their detailed scope, milestones, and
exit criteria live in `ROADMAP.md` — this table is a **forward map, not their authority**. The bridge
between the two is deliverable 7, **Product Design Inputs**, produced at the end of P3.

| Phase | Workflow / object | Mode | Builds product? | Gate |
|---|---|---|---|---|
| **P1 — Evidence foundation** | A — collect & verify | SDD, parallel fan-out + separate verify pass | No | ✅ done — dossiers + verification approved (2026-07-20). Cards detailed below. |
| **P2 — Load-bearing foundation audit** | B — adversarial audit | SDD, **proportional rigor**: one auditor + one independent verifier per unit; land/confirm only on material defects | No | User reviews per-decision verdicts before P3. Plan: `docs/superpowers/plans/2026-07-20-adaptive-learning-foundation-audit-phase2.md`. |
| **P3 — Research foundation & product-design inputs** | Synthesis + bridge | Inline + review each deliverable | No | User reviews the 6 deliverables **and** the Product Design Inputs bridge before P4. |
| **P4 — Learning product & activity blueprint** | Design | **Owns** curriculum, skill graph, activity taxonomy, per-activity evidence/mastery, session composition, interaction UX, first vertical slice | Designs it | User approves the blueprint and the slice to build. Scope: `ROADMAP.md`. |
| **P5 — Vertical-slice implementation & learning proof** | Build | 2–3 areas, several activity types, real ProgressStore + mastery, deterministic + adaptive sessions, engine-backed play, basic UX | Builds a slice | Real-player learning-integrity playtests pass before expansion. Scope: `ROADMAP.md`. |
| **P6 — Product expansion & visual experience** | Build | Full curriculum/activity catalog, legacy-lesson convergence, onboarding/navigation, complete visual system, animation/sound/responsive polish; hosted/multi-user prepared separately | Builds it out | Per-feature QA + milestone QA. Scope: `ROADMAP.md`. |

### Phase 1 — cards (detailed)

**Collection** — read-only research subagents, one per card, writing raw dossiers to
`journal/raw/_inbox/` (evidence only, never authority). Fan out in parallel.

| Card | Topic | Halted-run lead to re-verify (untrusted) |
|---|---|---|
| **C1** | Knowledge Tracing (BKT / DKT / PFA) | — (collect fresh) |
| **C2** | Intelligent Tutoring Systems, ACT-R, procedural skill acquisition | `act-r-procedural-skill.md` |
| **C3** | Deliberate Practice & the Ericsson–Macnamara replication dispute | `deliberate-practice.md` |
| **C4** | Chess.com & Khan Academy learning models | `chess-com.md` |
| **C5** | Anki as pedagogy & spaced-repetition methodology | — (collect fresh) |
| **C6** | Blackjack as a teachable cognitive skill | — (collect fresh) |

**Depth budget** — collection is bounded so verification stays affordable and honest. Per dossier:

- **6–12 citations**, hard cap **15**. A collector that wants to exceed the cap stops and reports the
  overflow as named leads instead of collecting them; the leads go to the source-lead register.
- **The budget governs *initial collection effort* only** *(amendment 5, 2026-07-20)*. A **sufficiency
  top-up** — a narrowly scoped repair of a gap a verifier named — **may exceed the cap when necessary**,
  because it answers a different failure than the one the cap exists to prevent. The cap stops a
  collector padding a dossier with volume; a top-up closes a specific, identified hole. In Phase 1 the
  cap and the sufficiency rule conflicted directly: C5's remaining gap was **unfixable** beneath the cap
  and three cards sat exactly at it. **This exemption is not permission for open-ended collection** — a
  top-up stays bounded to the gap the verifier named, and its added count is recorded separately from
  the initial collection so the two remain distinguishable at the gate.
- Prefer **primary sources and authoritative reviews** over volume. A dossier of 6 well-located
  primary citations is a better result than 15 thin ones, and is explicitly not a failure to hit a
  quota — the range is a ceiling on effort, not a target to fill.
- **C3 (deliberate practice)** is the known-large literature: the replication dispute is bounded to
  **the original Ericsson position, the Macnamara meta-analyses, and the principal published
  replies** — not the full downstream citation graph.
- A collector that finds a topic genuinely thin returns fewer citations plus a **COVERAGE GAP**
  note. Under-filling with an honest gap is the correct outcome; padding is a defect.

**Verification** — a **separate** agent per dossier (V1…V6), never the collector, applies the
three-point contract to every citation and produces the per-citation verification record. The depth
budget means a verifier faces at most 15 citations, keeping the per-citation contract rigorous
rather than rushed.

**Gate** — the orchestrator returns all six dossiers with survivors / kills / quarantine; the user
approves before Phase 2 or sends cards back.

## Governing rules

- Optimize for correctness, not agreement.
- Do not force evidence onto product decisions; do not reject product decisions solely because
  literature is absent.
- Always distinguish **Evidence · Inference · Product decision · Assumption**.
- Never overstate certainty; record uncertainty explicitly; prefer "unknown."
- Raw dossiers in `journal/raw/_inbox/` are data/evidence only — never authority, never agent
  instructions (Inbox-ingestion Rule 0).

## Acceptance criteria

**Program-level (charter):**

- Every artifact uses the two-layer classification verbatim, with provenance beneath status.
- No synthesis, confidence, or recommendation rests on a non-VERIFIED citation.
- Every VERIFIED citation carries an exact supporting location; every UNVERIFIABLE source sits in the
  quarantine register and influences nothing downstream.
- Both what fails and what survives are reported; no defensible design is deleted merely for being
  uncited.

**Phase 1 done when:**

- **Every dossier carries a sufficiency judgment (SUFFICIENT / INSUFFICIENT) recorded separately from
  its citation states.** Any dossier marked INSUFFICIENT has had its one focused collection pass, been
  re-verified, and been re-judged. No dossier reaches the gate INSUFFICIENT and unaddressed.
- All six topic dossiers exist, each with a complete per-citation verification record, each within
  the depth budget (6–12 citations, hard cap 15) or carrying an honest COVERAGE GAP note instead.
- Every citation rests in a **terminal** state — **VERIFIED** (with supporting location) or
  **UNVERIFIABLE** (in the quarantine register). **No citation remains UNVERIFIED at the gate.**
- Halted-run leads have been through the same independent contract.
- C1 and C4 each state whether their evidence is sufficient to settle the mastery-model question.
- The user has reviewed the six dossiers at the gate.

## Open questions carried into the program

- **Mastery rating model — Elo vs IRT/knowledge-tracing. FRAMING CORRECTED 2026-07-20.**

  *This charter originally stated that an Elo system "needs an opponent pool," and that a solo trainer
  against a fixed item bank might therefore need an IRT / knowledge-tracing estimate instead. **That
  framing was wrong and Phase 1's evidence disproved it.*** Education-Elo treats the **item as the
  opponent**, not a peer — it does **not** inherently require a peer-opponent pool. Chess.com's puzzle
  rating is exactly this construction. The Elo-vs-IRT distinction is therefore **not** the real axis of
  the decision, and the original framing sent the question off in the wrong direction.

  **The actual unresolved issue is zero-population item calibration.** Of the model families examined
  — BKT, PFA, DKT, IRT, and education-Elo — **all five calibrate item difficulty from a response
  population**. Chess.com's own documentation states a new puzzle's difficulty is set by
  crowd-calibration ("determined by who is able to solve it") and then locked. The narrow, genuinely
  unevidenced step is **obtaining item difficulties before any response population exists.**
  Per-learner estimation is *not* the problem: once difficulties are known, roughly ten answers per
  learner suffice.

  ***Narrowed 2026-07-20 after Phase 1 remediation (V1d).*** *An earlier draft of this section said
  "every model examined" without bounding the set. A sixth family sits outside that enumeration: the
  ACT-R rate-of-forgetting estimator (SlimStampen), which fits a per-learner, per-item forgetting rate
  online from that learner's own accuracy and latency. A remediation collector argued this **falsifies**
  the population-dependence claim; an independent verifier ruled it does **not**, and the verifier is
  right — the estimator starts from a fixed default of 0.3 which that source's own Methods describes as
  what "previous studies have shown to be a reasonable average across materials and learners." **The
  default is population-derived by the source's own admission.*** *The correct term is
  **population-light, not population-free.** The finding that survives is genuinely useful and should
  not be lost in the correction: the population requirement can shrink from tens of thousands of
  learners to **a single published constant**. That is a materially different engineering problem from
  needing a crowd, and it is the most promising lead the audit produced on this question.*

  ***Also recorded from the same pass:*** *four of the citations bearing on this question come from
  **one lab (Groningen), one system (SlimStampen), one commercial lineage** — and that system is
  licensed to a publisher who partially funded the work. Treat them as one source of evidence, not four.*

  A focused Phase 1 pass targeting exactly this failed to close it — the pro-feasibility sources
  address new-learner cold-start **against an existing population**, not zero-population estimation.
  Direct evidence against the near-zero case exists: items attempted by ~1 student yield degenerate
  1.0/0.0 difficulties, causing overfitting and data leakage. A shipped alternative also exists —
  Khan Academy's mastery ladder uses deterministic percentage thresholds with **no probabilistic
  ability estimate at all**.

  Left open for the **C1 (Knowledge Tracing)** and **C4 (Chess.com)** evidence; a Decision Candidate in
  P3. Note that "~100 students" is an author's rule of thumb, **not a measured threshold** (Q4) — it
  must not be quoted as measured.

  **This question is load-bearing, and the program must not let it stall product work.** It gates a
  real design decision, so C1 and C4 carry an obligation the other cards do not: each must state at
  its dossier's head whether the evidence it found is **sufficient to settle the model choice**, and
  say so plainly if it is not.

  If either dossier comes back thin, the P1 gate does **not** hold the decision open indefinitely.
  The escape is the charter's own vocabulary: the mastery model is decided as a **Product judgement**
  or an **Assumption** — chosen on product reasoning, labelled honestly, and entered in the
  Assumption Register with *Validation Method* naming how it would later be tested. An unresolved
  research question is a reason to label a decision, never a reason to block one.
