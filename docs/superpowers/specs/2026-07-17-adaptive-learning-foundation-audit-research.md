# Adaptive Learning Foundation Audit — Research Program

> Status: **APPROVED 2026-07-19** (drafted 2026-07-17, amended 2026-07-19 before approval).
> Phases 2–3 are named pointers, detailed at their gate.
>
> *2026-07-19 amendments (pre-approval): added a Phase 1 depth budget; made UNVERIFIED a transient
> state with a defined resolution path and a no-UNVERIFIED-at-gate rule; gave the load-bearing
> mastery-model question an explicit non-blocking escape. Acceptance criteria updated to match.*
>
> *2026-07-19 amendment (post-approval, user-directed): added the **research sufficiency** rule — a
> second, independent axis (SUFFICIENT / INSUFFICIENT) judged per dossier by the verifier, because
> citation verification asks whether what is present is true and cannot ask whether it is enough.*
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
- **Reuse of the halted run:** partial dossiers already on disk in `docs/superpowers/research/`
  (`act-r-procedural-skill.md`, `chess-com.md`, `deliberate-practice.md`, `00-baseline-claim-ledger.md`)
  are **untrusted leads only**. Every citation in them passes the *same* independent contract as newly
  collected evidence before it counts.

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

The focused pass is **one pass**. Its output is re-verified for citations, and the sufficiency
judgment is then re-made on the enlarged dossier.

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

## Deliverables (6)

All land in `docs/superpowers/specs/` under **research-evidence-only** authority. Each uses the
two-layer classification verbatim.

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

## Phase map

Execution engine: **SDD orchestration** — the orchestrating session holds the baton, dispatches
subagents, and **gates at every phase boundary**. No autonomous Workflow run; no phase begins until
the prior phase's output is reviewed.

| Phase | Workflow | Mode | Detail state | Gate |
|---|---|---|---|---|
| **P1** | A — collect & verify | SDD, parallel fan-out + separate verify pass | **Detailed below** | User reviews dossiers + verification before P2. |
| **P2** | B — adversarial audit | SDD, adversarial panel | Named pointer — detailed at its gate | User reviews audit verdicts before P3. |
| **P3** | Synthesis | Inline + review each deliverable | Named pointer — detailed at its gate | User reviews each of the 6 deliverables. |

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

- **Mastery rating model — Elo vs IRT/knowledge-tracing.** The mastery/scoring spec's "internal rating
  like chess" assumes a pairwise-comparison (Elo) system needing an opponent pool; a solo trainer vs a
  fixed item bank may instead need an IRT / knowledge-tracing ability estimate. Left open for the **C1
  (Knowledge Tracing)** and **C4 (Chess.com)** evidence to settle; a Decision Candidate in P3.

  **This question is load-bearing, and the program must not let it stall product work.** It gates a
  real design decision, so C1 and C4 carry an obligation the other cards do not: each must state at
  its dossier's head whether the evidence it found is **sufficient to settle the model choice**, and
  say so plainly if it is not.

  If either dossier comes back thin, the P1 gate does **not** hold the decision open indefinitely.
  The escape is the charter's own vocabulary: the mastery model is decided as a **Product judgement**
  or an **Assumption** — chosen on product reasoning, labelled honestly, and entered in the
  Assumption Register with *Validation Method* naming how it would later be tested. An unresolved
  research question is a reason to label a decision, never a reason to block one.
