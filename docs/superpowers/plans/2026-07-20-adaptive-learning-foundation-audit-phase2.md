# Adaptive Learning Foundation Audit — Phase 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: use `subagent-driven-development` (recommended) or
> `executing-plans` to run this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for
> tracking.

**Status: DRAFT — awaiting user approval. Phase 2 has not begun.**

## Where Phase 2 sits — the P1–P6 program

Phase 2 is one step in a six-phase arc that carries a research foundation into a built learning
product. **P1–P3 do not build the product; they make it trustworthy and usable to *design*.** The
authoritative forward map is the charter's Phase map
(`docs/superpowers/specs/2026-07-17-adaptive-learning-foundation-audit-research.md`); this summary
exists so the plan is read in its destination, not in isolation.

| Phase | What it produces | Builds product? |
|---|---|---|
| **P1 — Evidence foundation** ✅ done | Verified evidence + transferable requirements for session structure; scaffolding; hints/feedback/mistakes/retries; retrieval, spacing, interleaving, cognitive load, mastery; accessibility; multiple choice; assemble-block activities; engine-backed hands; deterministic evidence & grading. **Do not reopen.** | No |
| **P2 — Load-bearing foundation audit** ◀ *this plan* | Per-decision verdicts (Preserve/Relabel/Revise/Replace/Remove) on the **decisions that materially affect the future learning product**. No cross-unit synthesis; no product edits. | No |
| **P3 — Research foundation & product-design inputs** | The charter's six deliverables **plus** a final **Product Design Inputs** bridge that translates approved conclusions into bounded inputs for P4. Does **not** design the curriculum or activity catalog. | No |
| **P4 — Learning product & activity blueprint** | Skill graph + prerequisites; learning outcomes for rules, hand reading, strategy, probability, EV, variance; an activity taxonomy; concrete logic/probability/statistics/engine-backed concepts; which activity measures which capability; per-activity evidence & mastery; session composition; interaction UX; the first vertical slice to build. **P4 owns curriculum and game/activity design — P1–P3 must not.** | Designs it |
| **P5 — Vertical-slice implementation & learning proof** | A small representative slice (2–3 areas, several activity types, real ProgressStore + mastery, deterministic + adaptive sessions, engine-backed play, basic UX) proven by real-player learning-integrity playtests. Proves the architecture teaches — not the full curriculum. | Builds a slice |
| **P6 — Product expansion & visual experience** | Full curriculum/activity catalog; legacy-lesson convergence where justified; onboarding/navigation; the complete visual system; animation, sound, responsive/mobile polish; hosted/multi-user prepared separately. Only after the slice passes. | Builds it out |

**Phase 2's whole job is to make P3–P4 possible without reopening P1.** It decides which existing
foundation claims a designer may lean on, which must be relabelled or revised first, and which must
be replaced or removed — nothing more.

---

**Goal:** Adversarially audit the **load-bearing** decisions in the project's existing
learning/pedagogy foundation — owned specs, decisions, and implemented learning behavior — and
return, for every audited **material** claim, one of **Preserve · Relabel · Revise · Replace ·
Remove**, reporting both what fails and what survives. Secondary wording, stale prose, and low-impact
documentation drift are logged as notes, **not** run through the multi-agent land/confirm loop.

**Architecture — proportional rigor.** SDD orchestration under the charter's Workflow B, **sized to
materiality**. Each audit unit gets **one auditor and one independent verifier by default**. The
heavier machinery fires only when earned: a **landing** pass runs only where the verifier raises a
**material** correction; every landed correction then gets an **independent landing confirmation** —
material by construction, and with extra scrutiny where it is also *disputed* (a `Remove`/`Replace`
the auditor contests) — so since only material defects are ever landed, every landing is confirmed; a
**collector** runs only to close a **specific named evidence gap**. A unit the
verifier clears is **done at verify** — there is no automatic audit→verify→fix→re-verify loop for a
clean unit. The orchestrator holds the baton, owns all shared registers, and never audits, corrects,
or verifies. A single gate-time `audit-auditor` (program-integrity) pass confirms corrections landed,
roles stayed separated, and the gate checks enumerate.

**Roles use the shipped four-role set — no new role, no session restart.** Earlier drafts assumed a
to-be-created `audit-auditor` as the *adversarial claim-auditor*; that name shipped instead as the
**program-integrity** role (no web, no Edit). Phase 2 therefore performs its claim-audit with
`audit-verifier` instances — whose mandate, *adversarially check claims against sources, no in-place
edit*, **is** the audit job — kept honest by **instance** separation (the verify instance is never
the audit instance). `audit-auditor` is reserved for the gate-time integrity pass. Because Task 0
creates or edits **no** role definition, the research-plan skill's session-restart ordering
constraint is **discharged**: the four roles already exist, phase-neutral and conformant on disk
(`node scripts/research-roles-lint.ts`), and the fresh execution session loads them at start.

**Tech Stack:** Markdown artifacts only. No product code is modified. Agent capability boundaries are
expressed as tool grants **where a tool grant can express them** — withholding `Bash` removes shell
and git; withholding `WebSearch` removes collection; withholding `Edit` removes in-place rewriting.
**Three** boundaries this plan depends on are **not** expressible as tool grants and must not be
described as if they were: *path* scoping of `Write`; *instance* separation of roles; and
*no-new-collection-inside-an-audit-pass* — the auditor is an `audit-verifier` instance that **retains
`WebSearch`**, so "judge existing evidence, don't collect" is a brief instruction, not a grant. The
first two are checked mechanically at the gate (Task G steps 1c, 2). The third is audit-time
discipline caught downstream by the V* verifier's citation re-check — a `Preserve`/`Revise` citation
that traces to neither a Phase 1 dossier nor a baseline source is a flag — which is agent-established,
not tool-enforced, and is named as such rather than dressed up as mechanical. (The shipped roles do
fail closed on a missing run directory — a real grant-level property, see Task 0.)

## PR #10 review corrections addressed

This revision folds in five corrections from the PR #10 review; inline `(finding N)` tags point back
to this list.

1. **Dual citation gate** — gate criterion 5 forbids **both** `UNVERIFIED` and `UNVERIFIABLE`
   citations under a `Preserve`/`Revise` (criterion 5 table row; gate step 1e; Q4 ruling).
2. **Manifests never self-hash** — every integrity-manifest command excludes `INTEGRITY-MANIFEST-*.md`
   (Task 0 step 6, Task L step 0, Task G step 3).
3. **Dynamic baseline SHA** — captured at run start into `RUN-MANIFEST.md` and read as `$BASE`; no
   hardcoded commit (Task 0 step 2, Task G step 2).
4. **Fail-closed roles** — the shipped role defs fail closed on a missing run directory; Task 0
   creates no `<phase>`-placeholder path (Dependencies §1, Task 0 step 1).
5. **Q1–Q5 resolved** — the open ambiguities are now binding rulings (see *Resolved rulings*).

<!-- wl:criteria -->
## Acceptance criteria (five elements)

1. **Complete** — every audit unit U1–U8 has an audit record and an independent verification record;
   every **material** correction raised has a landing record **and** an independent landing
   confirmation. A unit the verifier cleared needs neither and is complete at verify. No unit reaches
   the gate with a raised material correction unresolved.
2. **Proportionate** — only claims bearing on the eight load-bearing decision families (see *Audit
   focus*) receive a verdict and the verify/land/confirm machinery. Secondary wording, stale prose,
   and low-impact drift are logged as non-material notes with no verdict and no landing loop.
3. **Honest** — every verdict carries a status bucket, a provenance basis, and a verbatim quote of
   the audited text. Both survivors and failures are reported. No product doc is edited.
4. **Separated** — no agent instance both audits and verifies the same unit; no agent both raises and
   lands its own correction; the corrector is never the landing confirmer; the orchestrator dispatches
   and assembles but never authors a verdict.
5. **Bounded** — Phase 2 emits per-decision verdicts and registers only. It produces none of the six
   Phase 3 deliverables, nor the Product Design Inputs bridge, and adopts no recommendation.
<!-- /wl:criteria -->

---

## Global Constraints

Copied verbatim from the approved charter
(`docs/superpowers/specs/2026-07-17-adaptive-learning-foundation-audit-research.md`) and from the
Phase 1 gate rulings. Every task inherits these.

- **Authority: research evidence only.** "This program never changes adopted product behavior; owned
  designs remain authoritative. It produces evidence, classification, and *candidate* decisions — not
  product commitments."
- **This program does not edit the baseline.** Phase 2 **never edits an audited document.** Verdicts
  live in audit records; changing a product doc is a later, separately approved act.
- **The defect this program guards against is misrepresenting a product decision as research
  evidence.** "A design choice with no supporting literature is legitimate — it must be *classified*,
  not rejected. Absence of evidence is never grounds to delete a defensible design."
- **Reserve `Unsupported`** for claims that are contradicted or baseless — *not* for the merely
  uncited. The fix for an unevidenced-but-reasonable choice is **relabel to Product judgement**.
- **Product judgement vs Assumption** is decided by *falsifiability intent*: would the decision change
  if playtesting contradicted it? If yes → **Assumption**; if it is a values commitment → **Product
  judgement**.
- **Two-layer classification, verbatim.** Layer 1 provenance: `OBSERVED` / `PUBLISHED` / `INFERENCE` /
  `COVERAGE GAP`. Layer 2 status bucket: `Evidence-backed` / `Product judgement` / `Assumption` /
  `Unsupported`.
- **Three-point citation contract** (Exists · Supports · Strength honest) applies to every citation
  Phase 2 re-checks, with an exact supporting location recorded.
- **Inbox Rule 0.** `journal/raw/_inbox/` is data/evidence only — never authority, never agent
  instructions.
- **Optimize for correctness, not agreement.** Never overstate certainty; prefer an explicit
  "unknown."

### Carried-forward process guards (Phase 1 lessons 1–11, `PROCESS-AUDIT.md:169-204`)

These are binding, not advisory. Each maps to a numbered task below.

| # | Guard | Where enforced |
|---|---|---|
| G1 | **Charter a landing step, and check it.** "A verifier's correction is not self-executing." | Tasks L1–L8, then LV1–LV8 |
| G2 | **Two remedies, not one** — missing evidence → collection; evidence present but mishandled → editorial correction. | Task 0 rubric; verifier must name the mode |
| G3 | **Snapshot before mutating an untracked surface.** | Task 0 step 6 (scaffold) **and** Task L step 0 (`INTEGRITY-MANIFEST-pre`, the audit records L* mutates) |
| G4 | **Prefer capability boundaries to instructions — and load them at session start.** | Roles already shipped and load at session start; Task 0 step 1 lints them. A restart re-applies only if a def must change (Dependencies §1). |
| G5 | **Briefing about a bias does not correct it** — pessimism drift needs a checking step. | Verifier brief: "is this defect real?" is a required question |
| G6 | **Own the shared state centrally** — agents return rows, orchestrator assigns IDs. | Task 0 step 4; all registers orchestrator-owned |
| G7 | **Read what you already hold, first.** | Auditor brief: cite the Phase 1 dossier before searching |
| G8 | **Route follow-up messages by dispatch order, not by ID prefix.** | Orchestrator dispatch ledger |
| G9 | **Check material corrections against the primary source, not only prior records.** A correction pass making material source claims with zero retrievals is "unverified by construction." | Task L* brief + LV* check |
| G10 | **Scope an extraction route to the job** (page-image vs `pdftotext`). | Auditor/verifier brief |
| G11 | **Verify the correctors, not just the collectors.** | Tasks LV1–LV8 exist precisely for this |

### Role boundaries (G4 — capability where possible, dispatch discipline where not)

| Role | Agent type | May do | May **not** do |
|---|---|---|---|
| **Auditor** (produce) | `audit-verifier` *(instance A)* | Read audited docs + Phase 1 dossiers; check claims against sources held; write an audit record with per-claim verdicts | Edit any product doc; verify its own audit record; collect new sources inside an audit pass |
| **Verifier** | `audit-verifier` *(instance B ≠ A)* | Independently re-check the audit record's claims against primary sources; write a verification record; raise material corrections; answer "is this defect real?" | Edit any record — "it judges, it never repairs"; verify a unit it audited |
| **Corrector** | `audit-editor` | Land a material correction into the **audit record**; reopen the primary source | Raise the correction it lands; edit product docs; collect new sources |
| **Confirmer** | `audit-verifier` *(instance C ≠ B, ≠ editor)* | Independently confirm a landed material correction; write the landing confirmation | Edit any record; confirm a correction it raised or landed |
| **Collector** | `audit-collector` | Fetch a named missing source under a bounded gap spec | Audit, verify, or land |
| **Program-integrity** | `audit-auditor` | At the gate: confirm corrections landed, roles stayed separated, gate checks enumerate positively | Open any source; author any verdict; edit any artifact |
| **Orchestrator** | main session | Dispatch, assign register IDs, assemble the gate package | Author any verdict, correction, or verification |

**Both the auditor and the verifier are `audit-verifier` instances; the guarantee is *instance*
separation, not a type difference.** The role that first assigns verdicts (auditor, instance A) and
the role that re-checks them (verifier, instance B) share a tool grant because the job is the same —
adversarially check claims against sources, write a record, never edit in place. What makes the
verify honest is that B is a *fresh* instance that did not produce A's record. `audit-auditor`, the
program-integrity role, is a genuinely different agent type and never touches a source.

**No instance audits and verifies the same unit. No agent lands a correction it raised. No agent
confirms a landing it performed.**

**None of these is a tool grant, and none can be.** A tool grant enforces one boundary here — an
`audit-verifier` and an `audit-auditor` both lack `Edit` and therefore cannot repair in place. But
the separation sentences above are **instance-level identity** properties, and they matter *most*
precisely because the auditor, verifier, and confirmer share the `audit-verifier` type: an agent type
cannot know which instance wrote the file it is reading, so no grant can stop the same instance being
dispatched twice into different roles. They hold only if the orchestrator dispatches them correctly.
The dispatch ledger (G8) is therefore the *evidence* for separation, not just a routing aid, and
Task G step 1c checks it. A separation claim made without reference to the ledger is unsupported.

---

## Scope

### Audit focus — the load-bearing decision families

Phase 2 audits the **decisions that materially affect the future learning product**, not every
sentence. Every unit's auditor works this priority list and demotes everything else:

1. **Mastery, scoring, reducer, and progression** assumptions.
2. **Session construction, adaptation, stopping, and review.**
3. **Activity types and the evidence each activity produces.**
4. **Hints, retries, feedback, and assisted-vs-independent evidence.**
5. **Curriculum and prerequisite boundaries.**
6. **Deterministic vs AI authority.**
7. **Implemented code vs documented learning behavior.**
8. **Accessibility requirements that constrain activity design.**

**Materiality gate (auditor brief, checked by the verifier).** A claim enters the
verdict-and-verify machinery **only if** it bears on one of the eight families above — i.e. a
designer in P4 would build differently depending on its answer. Secondary wording, stale prose, and
low-impact drift are logged as a one-line entry in the audit record's **Non-material notes** section
and receive **no** verdict, verification, landing, or confirmation. Demoting a load-bearing claim to
a note is a verifier-catchable defect; inflating a cosmetic nit into a full verdict is the opposite
defect and is reported the same way (anti-pessimism, G5). This filter is the mechanism behind the
"proportional rigor" architecture: it is what keeps the multi-agent loop off low-impact prose.

The eight units below are the **objects** audited; the eight families are the **lens**. Rough
mapping (a unit may touch several): U1 → families 1, 4, 5; U2 → 1, 5, 6; U3 → 1, 2, 6; U4 → all
(the evidence baseline); U5 → 1, 5, 6; U6 → 1, 3, 7; U7 → 5; U8 → 6, 8 and cross-cutting authority.

### In scope — 8 audit units

Ordered by dispatch wave. Line counts and citation counts were measured 2026-07-20 at the then-HEAD
`6def4b6`; the run's **baseline SHA is captured dynamically at Task 0** and used everywhere the audit
compares against baseline (see Dependencies and Task G step 2).

| Unit | Object | Size | Citations | Why in scope |
|---|---|---|---|---|
| **U4** | `docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md` | 474 L | **24 sources**, 41 `ALR-` reqs | The approved evidence baseline. Charter: "The audit re-examines the baseline's own claims for citation drift and overstatement." Also the **drift ruler** for U1–U3. |
| **U1** | `docs/specs/learning-mastery-and-scoring.md` | 213 L | **0** | Densest owned pedagogy doc; cited *by* others as binding; cites nothing. |
| **U2** | `docs/specs/product-vision.md` | 102 L | **0** | North star. The uncited "Duolingo-like" premise propagates repo-wide. |
| **U3** | `docs/superpowers/specs/2026-07-16-adaptive-ai-learning-architecture-design.md` | 617 L | **0 inline** | Encodes pedagogy into a deterministic reducer. Says "research-calibrated" at `:285` **and** `:412` with no research named. |
| **U5** | `journal/decisions.md` — learning-scope rows | 75 L (34 table rows + 6 prose ADRs) | mixed | Charter deliverable 6 reviews every existing decision. In-scope rows: R12, R13, R14, R17, R21, R22, R23, R25, R26, R27, P2, P6, **plus R18 and R30** (the two borderline rows the **Q3 ruling** admits). The other borderline rows — R9, R15, R24, R31 — are storage mechanics and **out of scope per Q3**. |
| **U6** | Implemented learning behavior: `web/src/learn/**` (464 L logic + 624 L content), `web/src/progress/types.ts` | ~1,100 L audited | 0 | Shipped behavior encodes pedagogical assumptions. Audited as **claims**, never modified. |
| **U7** | Earlier learning designs: `2026-07-11-blackjack-basics-learning-foundation-design.md`, `2026-07-15-strategy-table-fundamentals-lesson1-design.md`, `2026-07-10-v2-learning-foundations-roadmap-design.md`, `2026-07-10-first-guided-drill-design.md` | 798 L | 0 | Sequencing/atomicity claims; one uses agent-persona as evidence. |
| **U8** | Authority surfaces: `ROADMAP.md`, `PROGRESS.md`, `docs/superpowers/specs/2026-07-12-foundation-and-tracks-design.md`, `docs/specs/qa-playtest-process.md`, `docs/architecture.md` | ~570 L | 0 | Low claim density, high authority. `foundation-and-tracks-design.md:210` states "No protocol without evidence" — the sharpest internal-consistency lever available. |

### Non-scope — explicitly excluded

- **`docs/superpowers/research/foundation-audit-p1/**`** — Phase 1's approved evidence archive. It is
  Phase 2's *evidence input*, not an audit target. Re-auditing it would re-litigate an approved gate.
- **`docs/imports/**`** — provenance-only, non-authoritative by `journal/docs-map.md`. Audited **only
  as drift sources** (did an uncited claim leak upward into an owned doc?), never as commitments the
  project must defend. Imports cannot receive a verdict.
- **`journal/raw/**`** — gitignored inbox; Rule 0 data only.
- **Engineering / tooling / process decisions** — `journal/decisions.md` rows R1–R8, R10, R11, R16,
  R19, R20, R28, R29, R32, R33, R34, plus the four Q3-rejected borderline rows R9, R15, R24, R31, and
  prose ADRs P1, P3, P4, P5. Out of scope: they make no pedagogical claim (the four Q3-rejected rows
  are storage mechanics). (R20 and R24–R27 are retained as **positive controls** — see Task 0
  step 3.)
- **Product behavior.** No source file, test, spec, or decision is edited. U6 audits code as a
  claim-bearing artifact; it changes nothing.
- **The charter itself** (`2026-07-17-…-audit-research.md`) — governing input, not a target.
- **All six Phase 3 deliverables** — see "Phase 3 boundary" below.

### Dependencies

1. **The four research roles must be present and conformant** — `audit-verifier`, `audit-editor`,
   `audit-collector`, `audit-auditor` in `.claude/agents/`, verified green by
   `node scripts/research-roles-lint.ts`. They already exist, phase-neutral (a static
   `journal/raw/_inbox/` allowlist root with a bare run-dir supplied per dispatch), and **fail closed
   on a missing or non-bare run directory** (each def: "supplies no run directory at all → stop and
   report a `Blocker`"). Task 0 creates or edits **none** of them, so no mid-plan session restart is
   required — the fresh execution session loads them at start. *(If a role def ever must change, the
   research-plan skill's create→lint→restart ordering constraint re-applies.)*
2. **Phase 1 archive must be readable at the captured baseline** — it is the evidence base every
   `Evidence-backed` verdict must cite (`docs/superpowers/research/foundation-audit-p1/`, 59 files).
3. **Baseline SHA captured dynamically at run start.** Task 0 records `BASE=$(git rev-parse HEAD)`
   into the run manifest; every "modified since baseline" and "readable at baseline" check reads that
   recorded `$BASE`, never a hardcoded commit. A pinned SHA rots the moment the branch advances.

### Resolved rulings (Q1–Q5) — decided by the user 2026-07-21

These were open ambiguities in the prior draft; the user has now ruled. Each is binding on dispatch.

| # | Question | **Ruling** |
|---|---|---|
| **Q1** | Is implemented learning code (U6) an audit unit? | **Audit U6 as a read-only, claim-bearing artifact.** Code is read and audited *as claims* — nothing in `web/src/**` is modified. The full verdict vocabulary applies. The strongest single finding available lives here: the entire shipped mastery model is one line (`controller.ts:361`), while `progress/types.ts` declares a durable-evidence vocabulary no app code consumes (imported only by `web/qa/progress/harness.ts`). Auditing docs while ignoring that audits the map, not the territory. |
| **Q2** | What does the `Replace` verdict authorise? | **`Replace` names the required successor claim but does not author replacement content.** Naming the successor is Phase 2; drafting it is Phase 4. Keeps Phase 2 non-authoring while preserving the charter's five-verdict taxonomy verbatim. |
| **Q3** | Which borderline U5 rows are in scope? | **Only R18 and R30.** R18 governs how learning evidence is admitted; R30 prevents phantom zero-evidence sessions — both bear on family 1 (mastery/progression). R9, R15, R24, R31 are storage mechanics and stay out. Cheap to widen later; expensive to unwind scope creep. |
| **Q4** | Re-verify the 24 baseline sources, or only audit their use? | **Re-verify only sources whose downstream use materially changed** (drift), **applying the corrected citation gate** (criterion 5 below: neither `UNVERIFIED` nor `UNVERIFIABLE` may support a `Preserve` or `Revise`). Bounded to the actual failure mode; expect ~6–9 sources. |
| **Q5** | Handle the stale memory file (`journal/memory/v2-learning-foundations-roadmap.md`, updated 2026-07-15, says Strategy Table Fundamentals is active while `ROADMAP.md` / `PROGRESS.md` record it paused). | **Preserve the drift as evidence, then correct the operational memory *before* audit dispatches.** The stale text is captured verbatim into the run as a U8 drift specimen (so the finding is not destroyed), and only then is the live memory file corrected — so agents reading memory during the run are not misled by a known-false pointer. Both acts happen in Task 0, before any audit dispatch. *(Memory lives under the gitignored `journal/memory/` private surface; correcting it is not a product-doc edit.)* |

### Approval decisions still required from the user

1. **Approve Phase 2 beginning at all** — the charter gates it and `phase.md` records "Phase 2 must not
   begin without explicit user approval." This plan remains a **DRAFT** until then.
2. **Approve the Task 0 prep writes** — verifying the roles, capturing the baseline SHA, seeding
   templates/registers, and the Q5 memory correction. These are the only writes before the gate, and
   none touches a product document. *(Q1–Q5 are now resolved above; no separate ruling is pending.)*
3. **Approve the wave structure and the reduced ~24–31-dispatch budget** (see Economics).

---

## Verdict taxonomy

Every audited claim receives **exactly one** verdict, plus a Layer-2 status bucket and a Layer-1
provenance basis. Verdict and bucket are different axes and never substitute for one another.

| Verdict | Means | Typical bucket after audit | Guard |
|---|---|---|---|
| **Preserve** | The claim stands as written. | `Evidence-backed`, or a correctly-labelled `Product judgement` | Must cite the Phase 1 dossier or baseline source that supports it, with an exact location. |
| **Relabel** | The claim is fine; its *epistemic label* is wrong. | usually `Evidence-backed` → `Product judgement` / `Assumption` | **This is the default remedy for an uncited-but-reasonable claim.** Never escalate to Remove for want of a citation. |
| **Revise** | The claim overstates what its basis supports; weaken it. | `Evidence-backed` at reduced strength | Must name the *specific* overstatement and the honest wording. |
| **Replace** | The claim is wrong but the topic still needs a claim. | `Unsupported` → successor named | Per the **Q2 ruling**: name the successor claim; **do not author it** (drafting is P4). |
| **Remove** | The claim is contradicted or baseless and nothing should stand in its place. | `Unsupported` | Reserved for contradicted/baseless only. A `Remove` on a merely-uncited claim is a **defect** and the verifier must reject it. |

**Anti-pessimism rule (G5).** `Remove` and `Replace` are the manufactured-defect-prone verdicts —
three of four Phase 1 manufactured defects came from correction/verification passes. Every `Remove`
and `Replace` requires an independent verifier to answer, in writing, **"is this defect real?"**
A `Preserve` verdict with reasoning is a valid, expected, and non-failing result; a wave returning
zero `Preserve` verdicts is itself a calibration signal the orchestrator must flag.

**Claim ID form is load-bearing.** Every audited claim occupies one table row in the audit record,
opening `| K-U<n>-NNN | <verdict> | …` — the ID first, the verdict in the next cell. IDs are
unit-local and assigned by the auditor; this does not cross G6, which governs the shared *registers*
the orchestrator owns, and a unit's audit record is the only place its `K-` IDs appear. The form is
what lets Task G step 1d enumerate the `Remove`/`Replace` verdicts and match each to a verifier's
answer. A verdict recorded in free prose is invisible to that enumeration and is returned to the
auditor. The verifier's answer (V* step 2) is recorded row-wise against the same ID —
`| K-U<n>-NNN | DEFECT-REAL: YES|NO | <reasoning> |` — so the match is on the ID, never on prose
proximity.

---

## Evidence and citation requirements

Binding on every audit record.

1. **Verbatim quotation.** Every audited claim is quoted **verbatim** with a `file:line` anchor.
   Paraphrase is a defect — Phase 1 caught three paraphrases presented as verbatim, and one
   inherited ellipsis that reversed an author's meaning.
2. **Basis before verdict.** No verdict without a stated Layer-1 basis. `Evidence-backed` requires an
   exact supporting location (page / section / table / paragraph) in a Phase 1 dossier or a baseline
   source.
3. **Read what you hold first (G7).** Before any web search, the auditor must state which Phase 1
   dossier(s) it consulted. Phase 1's dominant defect at every level was material already in hand
   going unread — four of four sufficiency failures.
4. **No new collection inside an audit pass.** If evidence is genuinely missing, the auditor records a
   `COVERAGE GAP` and a bounded gap spec; only `audit-collector` collects, only on a verifier's call.
5. **Primary source for material claims (G9).** Any claim about *what a source says* requires
   reopening that source. A pass making material source claims with zero retrievals is unverified by
   construction.
6. **Conflicts are recorded, not resolved.** Phase 2 logs conflicts to the register; resolution is
   Phase 3. Known live conflict to seed the register: `how-to-teach.md` ("Immediate correction is
   where misconceptions actually get fixed") vs baseline `SCI-005` ("delayed feedback was slightly
   stronger on average").

---

## Correction and re-verification workflow (G1, G9, G11)

**This is the workflow Phase 1 did not have.** Its absence was Phase 1's central defect: verifiers
recorded corrections, returned them as text, and no pass was ever chartered to write them in — so
gate verdicts were reached against dossiers that did not carry their own corrections.

**Corrections are material defects only.** The verifier raises a *numbered correction* (`C-U<n>-NNN`)
**only** for a material defect — one that changes a quotation, figure, attribution, tier,
independence judgement, or the basis of a verdict. Mechanical and cosmetic observations (formatting,
anchors, ID hygiene) go in a **Non-material notes** list, un-numbered, and are **not landed, not
confirmed, not gated**. This is the proportional-rigor rule in mechanism: every correction that
exists is worth landing and confirming, because only material defects ever become corrections.

```
A*  audit          → audit-verifier (instance A) writes audit/U<n>-audit.md (per-claim verdicts)
V*  verify         → audit-verifier (instance B ≠ A) writes verification/V-U<n>.md
      │                (raises MATERIAL corrections only; logs mechanical nits as notes; repairs nothing)
      │
      ├─ no material corrections ───────────────────► unit CLEARED at verify
      │                (no land, no confirm, no re-verify — this is the common case)
      │
L*  land           → audit-editor applies each material correction INTO audit/U<n>-audit.md,
      │              marking each in place; writes landing/L-U<n>.md listing every
      │              correction + the anchor where it landed.
      │              It MUST reopen the primary source (G9) and record the retrieval;
      │              zero-retrieval material landings are rejected.
      │
LV* confirm landing → a THIRD instance (audit-verifier, instance C ≠ B, ≠ editor) opens
                     audit/U<n>-audit.md and confirms each correction is actually present.
                     Writes landing/LV-U<n>.md with a per-correction LANDED / NOT-LANDED / ALTERED
                     verdict. NOT-LANDED or ALTERED → back to L*, once (bounded); the first
                     confirmation is archived as LV-U<n>-r1.md and the retry writes the
                     current LV-U<n>.md (LV* step 4).
```

**Landing target — the boundary that differs from Phase 1.** Corrections land into the **audit
record**, never into the audited product document. Phase 1 landed corrections into dossiers because
the dossier was the program's own artifact; here the audited object is an owned product doc the
charter forbids this program to edit. Confusing the two would turn an audit into an unapproved
rewrite.

**A unit cannot reach the gate with a correction in NOT-LANDED or ALTERED state.** This is the check
Phase 1 lacked.

---

## Stop conditions and bounded extra passes

Carried from charter amendments 5–7 and Phase 1's rulings.

- **One focused pass is the norm.** A second pass on the same unit is permitted **only** when
  (1) the previous pass was **mis-scoped**, or (2) the missing item is **already specifically
  identified**. The justification is recorded with the pass.
- **"We looked hard and it isn't there" is a result, not a failure.** It is recorded as a
  `COVERAGE GAP` and **must not** trigger another pass. Phase 1's C1 was approved in exactly this
  state.
- **Landing loop is bounded to one retry** (L* → LV* → L* → LV*). A correction still NOT-LANDED after
  the second attempt is escalated to the user at the gate, never silently dropped. The retry's
  confirmation supersedes the first by name, not by edit (LV* step 4) — the superseded record is
  archived as `LV-U<n>-r1.md`, since otherwise a correctly remediated unit could never clear gate
  step 1b.
- **Hard ceiling: 3 passes per unit** (audit + verify + at most one bounded extra), excluding the
  landing loop. Exceeding it stops the unit and surfaces it.
- **No unbounded search.** An auditor may not open a topic the unit does not contain. Scope creep
  from a named claim into the general literature ends the pass.
- **Orchestrator stop.** If two or more units return manufactured defects (verifier-reversed), the
  orchestrator halts the wave and reports calibration failure rather than continuing.

---

## Gate criteria

Phase 2 passes its gate only when **all** hold. Each criterion names **who or what establishes it**,
because a criterion with no procedure is an intention, not a gate. Where the check is an agent or a
human read rather than a command, that is stated plainly rather than dressed as mechanical proof.

| # | Criterion | How it is established |
|---|---|---|
| 1 | Every unit U1–U8 has an audit record, a verification record, and — where a **material** correction was raised — a landing record **and** an independent landing confirmation. (A unit cleared at verify has neither, correctly.) | **Mechanical**, in two halves. Presence: Task G step **1-pre** asserts `audit/U<n>-audit.md` and `verification/V-U<n>.md` exist and are non-empty for all of U1–U8, and it runs **first** — without it every later enumeration is vacuous on a unit whose records were never written. Accounting: Task G step **1a** — every correction ID in `verification/` has a `LANDED` row in the current landing confirmation. |
| 2 | **Zero corrections in NOT-LANDED or ALTERED state.** | **Mechanical**, Task G step 1b (row-scoped, so the verdict legend cannot self-match). |
| 3 | No agent both audits and verifies a unit; no agent both raises and lands a correction. | **Mechanical read of recorded fact**, Task G step 1c: distinct agent handles per role in the dispatch ledger. Unlogged dispatch ⇒ unproven ⇒ fail. |
| 4 | Every `Remove` and `Replace` carries an independent verifier's written "is this defect real?" answer. | **Agent-established, mechanically accounted**: the answer is written by the V* verifier (V* step 2); Task G step **1d** enumerates the `Remove`/`Replace` claim IDs out of the audit records and requires a matching answered ID in `verification/`. The *substance* of the answer is the verifier's; only its existence is mechanical. |
| 5 | No citation used to support a `Preserve` or `Revise` is in `UNVERIFIED` **or `UNVERIFIABLE`** state. | **Mechanical against `registers/citation-state-register.md`**, Task G step **1e** — see below. Uncheckable without that register, which is why it exists. |
| 6 | Both survivors and failures are reported per unit; no unit reports only failures without stating what it examined and left alone. | **Agent-established** at audit time (A* brief) and confirmed by the V* verifier for its unit. Not orchestrator self-attestation. |
| 7 | **No product document has been modified.** | **Mechanical**, Task G step 2 — working-tree diff **and** `git status --porcelain`, both against the dynamically-captured baseline `$BASE` (Task 0 step 2). A commit-range diff cannot establish this. |
| 8 | Conflict, source-lead, and citation-state registers are complete and orchestrator-owned. | **Orchestrator self-attestation.** The orchestrator owns these registers, so no independent check exists; recorded as attested, not proven. |
| 9 | `INTEGRITY-MANIFEST-post.md` reconciles against `-scaffold.md` and `-pre.md`. | **Mechanical**, Task G step 3: hash comparison; every moved audit-record hash explained by a landed correction. |
| 10 | A `P2-gate-summary.md` states, per unit, what survived and what did not, discloses orchestrator errors, and breaches none of the six Phase 3 **must not** bullets. | **Independently reviewed**, Task G step 4a — an `audit-verifier` checks the boundary; the per-unit content and error disclosure remain orchestrator-attested. |
| 11 | A **program-integrity** pass confirms material corrections landed, roles stayed separated in the dispatch ledger, and every gate check enumerates positively (not absence-of-a-token). | **Agent-established**, Task G step **4b** — one `audit-auditor` (no web, no Edit) audits the *process*, not the evidence, and returns a sound/unsound finding per area. It is the role built for exactly the defect class this program fears; its record is promoted with the run. |

**Criterion 5 needs a register to be checkable at all.** The Q4 ruling bounds re-verification to
sources whose downstream use materially changed (~6–9 expected). Each such citation gets a row in
`registers/citation-state-register.md` — citation ID, the verdict it supports, the unit, and its state
(`VERIFIED` / `UNVERIFIED` / `UNVERIFIABLE`) — assigned by the verifier that judged it, per the
charter's rule that a non-terminal state is owned by the verifier that assigned it. The gate check is
then a read of that register against the `Preserve`/`Revise` verdicts, run as Task G step 1e. Per the
Q4 ruling it forbids a `Preserve` or `Revise` resting on **either** an `UNVERIFIED` **or an
`UNVERIFIABLE`** citation: a surviving claim may lean only on a citation a verifier actually
confirmed. `VERIFIED` is the only permissible support; `UNVERIFIABLE` is an honest recorded outcome
but not a foundation a survivor may stand on. Without this register, criterion 5 names a state no
Phase 2 artifact records.

**Two of eleven rest wholly or partly on orchestrator attestation** (8, 10). Criteria 4 and 6 do
**not**: step 1d accounts mechanically for the *existence* of every `Remove`/`Replace` answer, and
criterion 6 is agent-established (survivors-and-failures reported at audit time, confirmed by the V*
verifier for the unit). What remains asserted is the *quality* of those agent judgements and the
per-unit content of the gate summary — agent-established, not orchestrator self-attestation. That is a
known, accepted weakness of a design whose orchestrator is also its assembler — it is written down
here so a reader knows which parts of the gate are proven and which are asserted, rather than
discovering the difference later.

---

## Expected artifacts

Working copies live in the **gitignored** inbox during the run; a curated archive is promoted at the
gate (the Phase 1 pattern).

Landing artifacts (`landing/`) exist only for units with a material correction; a unit cleared at
verify has an audit record and a verification record and nothing more.

```
journal/raw/_inbox/foundation-audit-p2/          # gitignored working area
  RUN-MANIFEST.md                                # Task 0 step 2 — captured baseline SHA + run-dir
  evidence/U8-memory-drift-specimen.md           # Task 0 step 5 — Q5 drift preserved before correction
  audit/U1-audit.md … U8-audit.md
  verification/V-U1.md … V-U8.md
  landing/L-U<n>.md                              # only for units with a material correction
  landing/LV-U<n>.md                             # current landing confirmation, material corrections only
  landing/LV-U<n>-r1.md                          # only where a bounded retry occurred: the
                                                 #   superseded first confirmation, kept as evidence
  integrity/…                                    # Task G step 4b — audit-auditor program-integrity record
  registers/conflict-register.md
  registers/source-lead-register.md
  registers/citation-state-register.md
  INTEGRITY-MANIFEST-scaffold.md                 # Task 0 step 6 — templates + registers + manifest
  INTEGRITY-MANIFEST-pre.md                      # Task L step 0 — audit records, pre-landing

docs/superpowers/research/foundation-audit-p2/   # TRACKED, promoted at the gate
  README.md
  P2-gate-summary.md
  PROCESS-AUDIT.md
  RUN-MANIFEST.md
  audit/  verification/  landing/  registers/  evidence/  integrity/
  INTEGRITY-MANIFEST-scaffold.md  INTEGRITY-MANIFEST-pre.md  INTEGRITY-MANIFEST-post.md
  _templates/
```

---

## Branch and commit strategy

- **Branch:** `audit/p2-adversarial-foundation` (exists, tracking origin). The baseline SHA is
  whatever `git rev-parse HEAD` returns at run start (Task 0 step 2), not a pinned commit.
- **No Task 0 commit.** Task 0 creates or edits no agent definition and writes only to gitignored
  surfaces, so nothing tracked changes and there is nothing to commit (and no session restart).
- **No commits during the audit run.** Working artifacts are gitignored; committing mid-run would
  publish unverified verdicts.
- **Gate commit** — promote the curated archive in one commit after the gate criteria pass.
- **Secret scan before every commit**, per `modules.secret_scan`. **Run the grep and read its exit
  code directly — never pipe it into `head`.** A prior session's scan reported a false clean because
  the pipeline took `head`'s always-zero exit status; a check whose output never varies is untested.
- **Private surfaces stay ignored.** `journal/raw/` is gitignored and must remain so; the promotion
  step copies curated files out rather than un-ignoring the inbox.
- **The remote is public.** Do not push until the gate passes and the user approves, per `push: false`.
- **PR to `main`** only after user approval, following the Phase 1 precedent (PR #9).

---

## Phase 3 boundary — explicit

**Phase 2 produces verdicts. Phase 3 produces meaning; Phase 4 designs the product.** The following are
**Phase 3 deliverables and are forbidden in Phase 2 output**, per the charter's six deliverables plus
the **Product Design Inputs** bridge the charter now adds:

1. Evidence Summary · 2. Research Synthesis · 3. Project Implications · 4. Gap Map ·
5. Assumption Register · 6. Decision Candidates · **7. Product Design Inputs** (the P3→P4 bridge:
   confirmed learning principles, unresolved product assumptions, mastery/progression constraints,
   session/adaptation constraints, activity-evidence requirements, AI-authority boundaries,
   accessibility constraints, and the decisions that need playtesting rather than more research).

Concretely, a Phase 2 artifact **must not**:

- integrate findings **across** units into a combined conclusion (that is deliverable 2);
- state what the project **should now do** (deliverable 3);
- translate conclusions into design inputs for the product (that is deliverable 7, Product Design
  Inputs — and even that bridge stops short of designing the curriculum or activity catalog);
- classify a decision `Confirm / Revise / Reconsider / Remove` — that is deliverable 6's vocabulary
  and is **deliberately different** from Phase 2's `Preserve / Relabel / Revise / Replace / Remove`;
- author replacement content for anything it marks `Replace` (Q2) — **naming a successor claim is
  Phase 2; drafting it is Phase 4**, which owns curriculum and game/activity design;
- edit any audited document.

**Where the arc goes next (so no one mistakes a verdict for a design).** P3 turns these verdicts into
the seven deliverables above — the Product Design Inputs bridge being the artifact that makes P4
possible *without reopening P1–P3*. **P4 owns the curriculum, the activity taxonomy, the skill graph,
and every concrete game/activity design.** A Phase 2 record that starts designing an activity, naming
a curriculum sequence, or specifying replacement content has jumped two phases.

**The one-sentence test:** if a sentence would still make sense with every other unit's findings
deleted, it belongs in Phase 2; if it needs them, it is Phase 3.

The gate summary may **enumerate** per-unit results and flag cross-unit *tensions* for Phase 3 to
resolve — enumeration is not synthesis. A tension is logged to the conflict register as a pointer,
never resolved.

**Who enforces this.** The one-sentence test is a heuristic with no actor, and `P2-gate-summary.md`
is the artifact most likely to breach the boundary — it is the only Phase 2 output that ranges over
all eight units, and its sole author is the orchestrator, i.e. the same party being asked to
restrain itself. Self-restraint by the author of the highest-risk artifact is not enforcement. So the
gate summary is reviewed against the six **must not** bullets by an independent `audit-verifier`
before promotion (Task G step 4a). The verifier does not rewrite it — "it judges, it never repairs";
it returns per-breach line references and the orchestrator revises.

**Where that review does not reach.** Task G step 4a covers one artifact, and the argument for
concentrating on it — that the gate summary is the only Phase 2 output ranging over all eight units —
holds for the two **cross-unit** bullets and only for them: cross-unit synthesis, and translating
conclusions into Product Design Inputs (deliverable 7), both of which need the whole picture the gate
summary alone ranges over. **Three** more bullets are breachable inside a single audit record with no
cross-unit reach: stating what the project should now do; authoring replacement content for a
`Replace`; and stamping a decision row with the Phase 3 `Confirm/Revise/Reconsider/Remove` vocabulary
— a single U5 record can do that locally, so it is not, as an earlier draft claimed, a whole-program
classification beyond a single record's reach. All three are checked per record by each unit's own
verifier (V* step 5), which is reading the record anyway. The remaining bullet needs no separate
actor: "edit any audited document" is caught mechanically by Task G step 2 against the working tree.

---

## File Structure

| File | Responsibility |
|---|---|
| `.claude/agents/audit-{verifier,editor,collector,auditor}.md` | **Already shipped — verify only.** The four phase-neutral, fail-closed roles. Task 0 runs the lint; it edits none of them. |
| `journal/raw/_inbox/foundation-audit-p2/RUN-MANIFEST.md` | **New.** Records the baseline SHA (`$BASE`) captured at run start plus the run-dir name. |
| `journal/raw/_inbox/foundation-audit-p2/_templates/audit-record-template.md` | Audit record shape, incl. a **Non-material notes** section (materiality-gate sink). |
| `journal/raw/_inbox/foundation-audit-p2/_templates/verification-record-template.md` | Verification record shape (marks each correction MATERIAL; mechanical items go to notes). |
| `journal/raw/_inbox/foundation-audit-p2/_templates/landing-record-template.md` | Landing + landing-confirmation shape. |
| `journal/raw/_inbox/foundation-audit-p2/registers/*.md` | Orchestrator-owned shared state (G6). |
| `journal/raw/_inbox/foundation-audit-p2/evidence/U8-memory-drift-specimen.md` | **New (Q5).** Verbatim capture of the stale memory before it is corrected. |

---

## Tasks

### Task 0: Verify roles, capture the baseline, seed scaffolding, preserve-and-correct the memory drift

No role definition is created or edited here — the four roles already ship phase-neutral and
fail-closed. Task 0 is prep only: it proves the roles, pins the baseline, builds the templates and
registers, and discharges the Q5 memory ruling. **Because it edits no agent definition, no session
restart is required** (Dependencies §1).

**Files:**
- Verify (no edit): the four `.claude/agents/audit-*.md` roles
- Create: `journal/raw/_inbox/foundation-audit-p2/RUN-MANIFEST.md`
- Create: `journal/raw/_inbox/foundation-audit-p2/_templates/{audit-record,verification-record,landing-record}-template.md`
- Create: `journal/raw/_inbox/foundation-audit-p2/registers/{conflict-register,source-lead-register,citation-state-register}.md`
- Create: `journal/raw/_inbox/foundation-audit-p2/evidence/U8-memory-drift-specimen.md`
- Create: `journal/raw/_inbox/foundation-audit-p2/INTEGRITY-MANIFEST-scaffold.md`
- Correct (gitignored, non-product): `journal/memory/v2-learning-foundations-roadmap.md`

**Interfaces:**
- Produces: a proven role set, a pinned baseline, the record templates every later task fills, and a
  memory file that no longer misleads a dispatched agent.

- [ ] **Step 1: Prove the four roles are present and conformant (no edit)**

Run: `node scripts/research-roles-lint.ts`
Expected: green — all four defs present and conformant. Confirm the four types (`audit-verifier`,
`audit-editor`, `audit-collector`, `audit-auditor`) appear in the session's available agent types. If
the lint fails or a type is missing, **STOP**: a role def would need changing, which re-triggers the
create→lint→**restart** ordering constraint (Dependencies §1) before any dispatch.

**Do not create an `audit-auditor` adversarial-auditor role.** That name is the shipped
program-integrity role. Phase 2's claim-audit is performed by `audit-verifier` instances (see
*Architecture* and *Role boundaries*). No `sed`, no repoint, no new role — the defs already carry a
static `journal/raw/_inbox/` allowlist root and fail closed on a missing run directory, so the
`<phase>`-placeholder hazard the prior draft introduced does not arise.

- [ ] **Step 2: Capture the baseline SHA dynamically and record it (finding 3)**

```bash
BASE=$(git rev-parse HEAD)
mkdir -p journal/raw/_inbox/foundation-audit-p2
printf '# Run manifest\n\nbaseline_sha: %s\nrun_dir: foundation-audit-p2\ncaptured: run start\n' \
  "$BASE" > journal/raw/_inbox/foundation-audit-p2/RUN-MANIFEST.md
```

Every later "modified since baseline" / "readable at baseline" check reads `baseline_sha` from this
file — never a literal commit. Capturing at run start is the whole point: the branch advances, and a
pinned SHA (the prior draft's `6def4b6`) would silently compare against the wrong tree.

- [ ] **Step 3: Seed the positive-control list and the Non-material notes sink into the audit template**

`journal/decisions.md` rows **R20, R24, R25, R26, R27** cite doc paths, section numbers, line
numbers, or measured figures, and two self-correct prior errors in-record. They are the standard the
audit holds others to. The template's calibration field names them so an auditor can anchor
"good looks like this" without the orchestrator seasoning the finding. The template also carries the
**Non-material notes** section — the sink for demoted cosmetic observations (materiality gate); items
there get no verdict and no landing loop.

- [ ] **Step 4: Create the three registers, orchestrator-owned (G6)**

`conflict-register.md`, `source-lead-register.md`, and `citation-state-register.md`.

Header must state verbatim: `Agents return rows. IDs are assigned by the orchestrator. An agent that
predicts an ID has made an error.` Seed the conflict register with the known `SCI-005` vs
`how-to-teach.md` feedback-timing conflict.

The **citation-state register** carries one row per citation Phase 2 re-checks under the Q4 ruling, in
this column order, which Task G step 1e reads positionally:

`| <citation ID> | <verdict it supports> | <unit> | <state> |`

— four cells, `<state>` being exactly one of `VERIFIED` / `UNVERIFIED` / `UNVERIFIABLE`. The state is
**judged by the verifier and returned as a row; the orchestrator writes it into the register** — the
verifier never edits the shared register directly (G6, and this register is orchestrator-owned like
the other two). Gate criterion 5 forbids **either** an `UNVERIFIED` **or an `UNVERIFIABLE`** citation
beneath a `Preserve` or `Revise`; without this register that criterion names a state no artifact
records and cannot be checked. The column order is fixed because the check is
positional: a register that reorders its columns silently disarms step 1e.

- [ ] **Step 5: Preserve the memory drift as evidence, then correct the operational memory (Q5) — ordered, blocking**

The order is load-bearing: **preserve first, correct second.**

1. Copy the stale text **verbatim** from `journal/memory/v2-learning-foundations-roadmap.md` into
   `.../evidence/U8-memory-drift-specimen.md`, with the file's own line anchors and the contradicting
   `ROADMAP.md` / `PROGRESS.md` locations. This is the U8 drift specimen — the very finding Phase 2
   exists to catch, kept intact so correcting the live file does not destroy it.
2. **Then** correct `journal/memory/v2-learning-foundations-roadmap.md` so it no longer says Strategy
   Table Fundamentals is the active task, bringing it into line with `ROADMAP.md` / `PROGRESS.md`.
   Agents read memory during the run; a known-false pointer left live would mislead them.

`journal/memory/` is a gitignored private surface (manifest `private:`), so this correction is **not**
a product-doc edit and does not touch criterion 7. Record the specimen path in the source-lead register.

- [ ] **Step 6: Snapshot the scaffold before mutating it (G3) — first of two snapshots (finding 2)**

```bash
find journal/raw/_inbox/foundation-audit-p2 -type f \
  -not -name 'INTEGRITY-MANIFEST-*.md' -exec sha256sum {} \; \
  | sort -k2 > journal/raw/_inbox/foundation-audit-p2/INTEGRITY-MANIFEST-scaffold.md
```

**The `-not -name 'INTEGRITY-MANIFEST-*.md'` exclusion is not optional.** The `>` redirection creates
the manifest file before `find` finishes walking, so without the exclusion `find` hashes the manifest
*it is currently writing* — a self-reference whose recorded hash can never match the file's final
content, breaking every later reconciliation. Every integrity-manifest command in this plan (here,
Task L step 0, Task G step 3) carries the same exclusion for the same reason.

**What this snapshot does and does not cover.** At this point the directory holds only templates,
registers, the run manifest, and the drift specimen, so this manifest protects the *scaffold* — it
proves the templates and register headers a later run was working from were not quietly rewritten. It
is **not** a before-image of any audit record: every audit record is created later in A1–A8 and then
deliberately mutated in place by any L1–L8 landing. The snapshot that makes the `ALTERED` verdict
falsifiable is the second one, taken in Task L step 0 after the audit records exist and before any
editor touches them. Taking only this one would invert Phase 1's ordering — there the snapshot
preceded the mutation of already-existing dossiers — and would leave the load-bearing surface
unprotected.

- [ ] **Step 7: Commit nothing yet**

Task 0 writes only to the gitignored inbox and the gitignored memory surface — **nothing tracked
changes**, so there is nothing to commit before the gate. (The prior draft committed agent-def edits
here; there are none now — the roles already shipped.) The promotion commit at Task G step 6 is the
first and only commit of the run.

---

### Tasks A1–A8: Audit dispatches (three waves)

Each audit is an `audit-verifier` instance in its **produce** role (see *Role boundaries*), briefed
to audit one unit's load-bearing claims and assign verdicts. The independent verify pass (V1–V8) is a
**different** `audit-verifier` instance.

**Files:**
- Create: `journal/raw/_inbox/foundation-audit-p2/audit/U<n>-audit.md`

**Interfaces:**
- Consumes: Task 0 templates; the Phase 1 archive at `docs/superpowers/research/foundation-audit-p1/`.
- Produces: one audit record per unit, consumed by V1–V8.

**Wave ordering** — the baseline is audited first because it is the ruler every later unit is
measured against.

| Wave | Units | Model | Rationale |
|---|---|---|---|
| **W1** | U4 | opus | The 24-source baseline. Establishes what the verified evidence actually supports before any uncited doc is judged against it. |
| **W2** | U1, U2, U3 | opus | The three uncited pedagogy cores. Parallel — no shared state. |
| **W3** | U5, U6, U7, U8 | U5/U6 opus, U7/U8 sonnet | Decisions, code, and secondary docs. |

Four concurrent dispatches is the ceiling; iroh's guidance is to re-decompose beyond five.

- [ ] **Step 1: Dispatch W1 (U4) and wait**

Brief must include, verbatim: the unit's path; the **materiality gate** (only claims bearing on the
eight decision families get a verdict; everything else goes to Non-material notes); the verdict
taxonomy table; the anti-pessimism rule; "read what you hold first"; the requirement to quote verbatim
with `file:line`; the run-dir name (`foundation-audit-p2`) so the fail-closed write scope resolves;
and the instruction to report survivors as well as failures. Per the **Q4 ruling**, U4's citation
re-verification is bounded to sources whose downstream use materially changed, and any citation it
leaves `UNVERIFIED` or `UNVERIFIABLE` may not support a `Preserve` or `Revise` (criterion 5).

- [ ] **Step 2: Orchestrator assigns register IDs from W1's returned rows (G6)**

Agents return rows without IDs. Assign centrally. Never relay a predicted ID.

- [ ] **Step 3: Dispatch W2 (U1, U2, U3) in parallel, one message**

Seed each with the confirmed drift anchors:
- **U1** — the upstream `v2-research-02-curriculum-and-pedagogy.md:174-178` carries five references
  (Roediger & Karpicke 2006; Cepeda et al. 2006; Kornell & Bjork 2008; Bjork & Bjork; Ericsson et al.
  1993). Its owned descendant carries **zero** (verified: `grep -c` returns 0). Audit whether each
  surviving claim still has a basis. Note Ericsson 1993 is the replication-disputed entry and Phase 1
  dossier **C3** covers exactly that dispute.
- **U2** — the uncited "Duolingo-like" premise; Phase 1 dossier **C4** covers Chess.com/Khan learning
  models and the baseline's `DUO-*` sources cover Duolingo's own published method.
- **U3** — `research-calibrated` appears at **`:285` and `:412`**; verify whether any research is
  named at either site.

- [ ] **Step 4: Dispatch W3 (U5, U6, U7, U8) in parallel, one message**

**U6 brief must state**: audit code as a claim-bearing artifact; change nothing; the shipped mastery
model is `web/src/learn/controller.ts:361`:

```ts
return this.unit.requiredChecks.every((id) => attempts.some((a) => a.stepId === id && a.correct === true));
```

Verified adjacent facts the auditor should test rather than assume: `basic_strategy_action` has zero
non-test callers, so the app never grades strategic correctness; `web/src/progress/**` is imported
only by `web/qa/progress/harness.ts`, not by app code.

- [ ] **Step 5: Record the dispatch ledger (G8)**

Log each dispatch's order, unit, role (`A` / `V` / `L` / `LV`), and agent handle. Route every
follow-up by **dispatch order, not by ID prefix** — Phase 1 misrouted a correction because parallel
dispatches return visually similar identifiers.

The ledger runs for the whole phase, not just this task: **every** V*, L*, and LV* dispatch is
appended as it happens. It is the only record from which role separation can be checked at the gate
(Task G step 1c), so a dispatch that goes unlogged makes its unit's separation unprovable.

---

### Tasks V1–V8: Verification dispatches

**Files:**
- Create: `journal/raw/_inbox/foundation-audit-p2/verification/V-U<n>.md`

**Interfaces:**
- Consumes: `audit/U<n>-audit.md`.
- Produces: corrections consumed by L1–L8.

- [ ] **Step 1: Dispatch one `audit-verifier` per completed audit record**

**The verifier must not be the agent that audited the unit.** Verification starts as soon as a unit's
audit record lands — do not wait for the whole wave (pipeline, not barrier).

- [ ] **Step 2: Each verifier answers the mandatory calibration question (G5)**

For **every** `Remove` and `Replace` verdict, in writing: **"Is this defect real?"** Briefing an agent
about pessimism drift does not prevent it — Phase 1 proved a pass explicitly briefed on the trap
manufactured a defect anyway. Only a checking step catches it.

- [ ] **Step 3: Each verifier names the remedy mode for every correction (G2)**

Either **evidence missing** → collection, or **evidence present but mishandled** → editorial
correction. "Do not dispatch a collector when the needed information is already inside a cited
source" — four of four Phase 1 sufficiency failures traced to material already in hand.

- [ ] **Step 4: Only material defects become numbered corrections; mechanical items are notes (G9, proportional rigor)**

**Material** = changes a quotation, figure, attribution, tier, independence judgement, or the basis of
a verdict — anything that is a claim about what a source says or that a designer would build
differently for. **A material defect gets a numbered correction (`C-U<n>-NNN`), which is landed and
independently confirmed.** **Mechanical** items — formatting, anchors, ID hygiene — get a one-line
entry in the verification record's non-material notes; they are **not** numbered, **not** landed, and
**not** gated. This is the mechanism that keeps the land/confirm loop off low-impact drift: a
correction exists only where it is worth landing. A verifier that finds only mechanical issues clears
the unit (a clean-at-verify result is valid — anti-pessimism, G5); a verifier that demotes a genuinely
material defect to a note has made a catchable error.

- [ ] **Step 5: Each verifier checks its own unit's record against the two per-record Phase 3 bullets**

Three of the six **must not** bullets are not V* step 5's job: cross-unit synthesis and translating
conclusions into Product Design Inputs (deliverable 7) both need other units and are checked at the
gate summary (Task G step 4a), and editing an audited document is caught mechanically (Task G step 2).
The other **three** can be breached by a single record on its own, so the verifier checks all three
per record:

- **"state what the project should now do"** — a unit-local recommendation is Phase 3 deliverable 3
  arriving early;
- **"author replacement content for anything it marks `Replace`"** — per the Q2 ruling a `Replace`
  names its successor claim and stops. Drafting the successor is authoring (that is P4's job);
- **"stamp a decision row with the Phase 3 `Confirm/Revise/Reconsider/Remove` vocabulary"** — a single
  U5 record can classify a decision in Phase 3's decision vocabulary, which is deliberately distinct
  from Phase 2's `Preserve/Relabel/Revise/Replace/Remove`. Gate step 1d enumerates only `Remove`/
  `Replace`, so the Phase 3 words would otherwise pass unchecked; the verifier catches them here.

The verifier returns these as line references, does not rewrite them, and the orchestrator routes them
to L* like any other correction. This adds no dispatch and no pass: the verifier already reads the
whole record to do its existing duties. It exists because the alternative is what this plan
refuses elsewhere — a boundary that lives only as an instruction in a brief, with nothing that checks
it.

**Correction ID form is load-bearing.** Every correction carries an orchestrator-assigned ID in the
form `C-U<n>-NNN` (e.g. `C-U3-001`), one per row. Task G step 1a derives the gate's correction set by
enumerating these IDs out of the verification records; an unnumbered or free-prose correction is
invisible to the gate and is returned to the verifier.

---

### Tasks L1–L8: Landing passes — **the step Phase 1 did not have** (G1)

**Files:**
- Create: `journal/raw/_inbox/foundation-audit-p2/INTEGRITY-MANIFEST-pre.md` (step 0, before any edit)
- Modify: `journal/raw/_inbox/foundation-audit-p2/audit/U<n>-audit.md` (in place, marked)
- Create: `journal/raw/_inbox/foundation-audit-p2/landing/L-U<n>.md`

**Interfaces:**
- Consumes: `verification/V-U<n>.md`.
- Produces: an audit record that actually carries its corrections; a landing record for LV*.

- [ ] **Step 0: Snapshot the audit records before any editor touches them (G3) — blocking**

Run **after** every audit record exists and **before** the first `audit-editor` is dispatched:

```bash
find journal/raw/_inbox/foundation-audit-p2/audit -type f \
  -not -name 'INTEGRITY-MANIFEST-*.md' -exec sha256sum {} \; \
  | sort -k2 > journal/raw/_inbox/foundation-audit-p2/INTEGRITY-MANIFEST-pre.md
```

The output lands in the parent directory, not the `audit/` tree this `find` walks, so it is already
outside its own scan; the `-not -name` guard is kept anyway so every integrity-manifest command in
the plan reads identically and none can regress into hashing its own output. This is the before-image
of the surface any L1–L8 landing deliberately mutates. Without it the `ALTERED` verdict
is not falsifiable: LV* can confirm the corrections it was told about are present, but nothing shows
whether the editor also changed something it was never asked to change. Task G step 3 reconciles the
post-manifest against this file, and any audit-record hash that moved without a correction landing at
that anchor is an unexplained mutation the orchestrator must surface.

- [ ] **Step 1: Dispatch an `audit-editor` per unit with corrections**

**The editor must not be the agent that raised the correction.** Skip units the verifier cleared.

- [ ] **Step 2: Land each correction in place, marked**

Every landed correction is marked at its anchor so a later reader can see it landed — Phase 1's
evidence that corrections had finally landed was "10 in-place correction markers across six
dossiers."

- [ ] **Step 3: For every MATERIAL correction, reopen the primary source (G9) — blocking**

The editor **must** issue a retrieval and record it. Reading verification records alone is
sufficient for mechanical work and **insufficient for any claim about what a source says**. A
landing pass that issues **zero retrievals while making material source claims is rejected outright**
and re-dispatched — it is "unverified by construction," and this is the guard against the
inherited-error class that no other check in the program can catch.

- [ ] **Step 4: Write the landing record**

One row per correction: correction ID, the anchor where it landed, and the retrieval performed. Every
landed correction is material by construction — mechanical items were logged as non-material notes and
never entered this loop — so every landing row carries a retrieval.

---

### Tasks LV1–LV8: Independent landing confirmation (G1, G11)

**Files:**
- Create: `journal/raw/_inbox/foundation-audit-p2/landing/LV-U<n>.md`

**Interfaces:**
- Consumes: `audit/U<n>-audit.md` (post-landing) and `landing/L-U<n>.md`.
- Produces: the gate's blocking precondition.

- [ ] **Step 1: Dispatch a THIRD `audit-verifier` instance — not the raiser, not the editor**

The confirmer (instance C) must differ from **both** the verifier that raised the correction (instance
B) and the `audit-editor` that landed it. "Verify the correctors, not just the collectors. A repair is
a claim like any other." Instance separation is dispatch discipline, recorded in the ledger and checked
at Task G step 1c.

- [ ] **Step 2: Confirm each correction against the audit record itself**

Open `audit/U<n>-audit.md` and check the correction is **present, at the stated anchor, and says what
the verifier asked**. Verdict per correction: `LANDED` / `NOT-LANDED` / `ALTERED`.

One table row per correction, ID first, verdict in the next cell —
`| C-U<n>-NNN | LANDED | <anchor> |` — so Task G step 1 can read verdicts row-wise and distinguish a
real failure from this legend. Every correction the verification record raised gets a row, including
the ones that landed cleanly; a correction with no row fails the gate at step 1a.

**Presence of the topic is not presence of the correction.** Phase 1's orchestrator reported C3's
corrections as "largely applied" from a keyword grep; the hits were the collector's own discussion of
a corrigendum, not the corrections. That was wrong, and a grep cannot make this call.

- [ ] **Step 3: For MATERIAL corrections, confirm the retrieval actually happened**

A landing record claiming a material correction with no recorded retrieval is `NOT-LANDED`
regardless of how correct its prose looks.

- [ ] **Step 4: Route failures back once, then escalate — and supersede the failed confirmation**

`NOT-LANDED` / `ALTERED` → back to L*, **once**. Still failing → escalate to the user at the gate.
Never silently drop.

**Supersession is a rename, performed by the orchestrator, before the retry is dispatched.** A
verifier "judges, it never repairs," so the first confirmation's `NOT-LANDED` row is permanent — no
later pass edits it. If it stayed in place under the name the gate reads, a unit that failed once and
was then correctly remediated would fail gate step 1b forever, and the only way past the gate would be
to override it by hand. So: the orchestrator renames `LV-U<n>.md` to `LV-U<n>-r1.md`, then dispatches
the second confirmation, which writes a fresh `LV-U<n>.md` covering **every** correction the
verification record raised — not only the ones that failed.

`LV-U<n>.md` is therefore always the current confirmation and `LV-U<n>-r1.md` always the superseded
one. Gate step 1a/1b read `LV-U[1-8].md` and skip the archive. The archive is kept, not deleted: it is
the evidence that a correction failed once, it is promoted with the rest of the run, and the gate
summary reports the retry. Nothing is rewritten to make the record look clean — the failed
confirmation is preserved under a name that says what it is.

A **third** confirmation is not a naming question. The loop is bounded to one retry; a correction
still failing after `LV-U<n>-r1.md` is escalated to the user at the gate, not re-dispatched.

---

### Task G: Assemble the Phase 2 gate package

**Files:**
- Create: `journal/raw/_inbox/foundation-audit-p2/INTEGRITY-MANIFEST-post.md`
- Create: `docs/superpowers/research/foundation-audit-p2/**` (promoted archive)
- Create: `docs/superpowers/research/foundation-audit-p2/{P2-gate-summary,PROCESS-AUDIT,README}.md`

- [ ] **Step 1: Verify gate criteria 1, 2, 3, 4, and 5 mechanically — positive enumeration, not absence-of-a-token**

**The check must be able to fail, and must be able to pass.** An absence-of-a-token grep certifies an
empty or missing `landing/` directory as clean — it tests for the presence of a failure marker, never
for the presence of a confirmation. That is the same class as the `head`-pipe defect below: the
`head`-pipe was the symptom, absence-as-proof is the disease. Every correction raised must be
positively accounted for.

**Every sub-check below runs from the run directory.** Enter it once, at the top of the step:

```bash
cd journal/raw/_inbox/foundation-audit-p2
```

All paths in 1-pre through 1e are relative to that directory. A sub-check written against a
repo-relative path would, in this shell, name a directory that does not exist — `grep` then exits 2
with zero matches, which reads as clean to anyone checking only for output. That is the same defect
this step exists to prevent, arriving through the working directory instead of through a pipe.

**1-pre — the records exist at all (criterion 1, presence half). Blocking; run before 1a and 1d.**
Every enumeration below derives its expected set *from* these records, so a unit whose record was
never written contributes nothing to either side of a diff and passes silently. Presence is therefore
checked first and independently:

```bash
{ for n in 1 2 3 4 5 6 7 8; do
    for f in "audit/U$n-audit.md" "verification/V-U$n.md"; do
      [ -s "$f" ] || echo "MISSING $f"
    done
  done
  [ -s registers/citation-state-register.md ] || echo "MISSING registers/citation-state-register.md"
} | grep .
```

Expected: **no output, exit 1.** Any `MISSING` line is a gate failure: `-s` fails an absent file and
an empty one alike, so a record that was created but never written is caught too. Landing records are
deliberately *not* in this list — a unit the verifier cleared correctly has none; their accounting is
1a's job, which derives from the verification records this check has just proven exist.

**1a — every raised correction has a `LANDED` confirmation (criterion 1).** Derive the correction set
from the verification records and require a matching row in the *current* landing confirmations:

```bash
diff \
  <(grep -rhoE 'C-U[0-9]+-[0-9]{3}' verification/ | sort -u) \
  <(grep -rhoE --include='LV-U[1-8].md' 'C-U[0-9]+-[0-9]{3}[^|]*\| *LANDED' landing/ \
    | grep -oE 'C-U[0-9]+-[0-9]{3}' | sort -u)
```

Expected: **empty output, exit 0.** A `<` line is a correction that was raised and never confirmed
landed — including the case where `LV-U<n>.md` was never written at all. A `>` line is a confirmation
for a correction no verifier raised. Both are gate failures. Correction IDs are orchestrator-assigned
in the `C-U<n>-NNN` form (G6) precisely so this enumeration is possible. `\| *LANDED` does not match a
`| NOT-LANDED` cell — the anchor is the cell boundary, and `[^|]*` cannot cross one — so a failed
verdict never counts as a confirmation here. `--include` restricts the read to current confirmations;
see the supersession rule under 1b.

**1b — no correction rests in a failed verdict (criterion 2).** Scope the match to verdict *rows*, not
to any occurrence of the token, and to the *current* confirmation, not to superseded ones:

```bash
grep -rnE --include='LV-U[1-8].md' 'C-U[0-9]+-[0-9]{3}[^|]*\| *(NOT-LANDED|ALTERED)' landing/
```

Expected: **no matches, exit 1.** Two scopings, each load-bearing:

- *Row-scoped.* A bare `grep -rn 'NOT-LANDED\|ALTERED'` cannot be used: LV* step 2 requires each
  record to carry the legend `LANDED / NOT-LANDED / ALTERED`, so the legend self-matches and a
  fully-clean run reports failure.
- *Current-record-scoped.* The landing loop is bounded to one retry, and a verifier "judges, it never
  repairs" — so the first confirmation's `NOT-LANDED` row is never edited away by the remediation
  that fixes it. Without scoping, a unit that failed once and was then correctly remediated could
  never clear this check, and the predictable outcome at the gate is a hand-waved override of the one
  check Phase 1 lacked. The supersession rule (LV* step 4) keeps `LV-U<n>.md` as the current
  confirmation and archives the superseded one as `LV-U<n>-r1.md`; the `LV-U[1-8].md` include pattern
  reads the former and skips the latter. The archived record is retained as evidence and is read by a
  human at the gate, never by this check.

**Read the exit codes directly; do not pipe into `head`.** 1-pre, 1a and 1b are complementary —
1-pre catches the record that was never written, 1a the missing confirmation, 1b the recorded
failure. None alone is sufficient.

**1c — role separation actually held (criterion 3).** Read the dispatch ledger and confirm, per unit:
the `V-U<n>` agent handle differs from the `A-U<n>` handle; the `L-U<n>` handle differs from the
`V-U<n>` handle; and the `LV-U<n>` handle differs from both the `V-U<n>` and `L-U<n>` handles. Any
repeat is a gate failure and the affected record is re-run with a fresh agent. This is a read of
recorded fact, not a self-attestation: if the ledger does not record a distinct handle for every one
of these dispatches, separation is **unproven** and the gate does not pass on the orchestrator's
recollection.

**1d — every `Remove` and `Replace` was answered (criterion 4).** This is the G5 anti-pessimism
guard, and it is the criterion most worth a mechanical account: three of four Phase 1 manufactured
defects came out of correction and verification passes, not audits. Enumerate the pessimistic
verdicts from the audit records and require an answered ID in the verification records:

```bash
comm -23 \
  <(grep -rhoE 'K-U[0-9]+-[0-9]{3}[^|]*\| *(Remove|Replace)' audit/ \
    | grep -oE 'K-U[0-9]+-[0-9]{3}' | sort -u) \
  <(grep -rhoE 'K-U[0-9]+-[0-9]{3}[^|]*\| *DEFECT-REAL' verification/ \
    | grep -oE 'K-U[0-9]+-[0-9]{3}' | sort -u) | grep .
```

Expected: **no output, exit 1.** Each line printed is a `Remove` or `Replace` with no verifier answer
against its ID — a gate failure. `comm -23` is one-directional on purpose: an answer recorded against
a claim that ended up `Preserve` is harmless, a pessimistic verdict with no answer is not. This
establishes only that an answer **exists**; whether the answer is any good is the verifier's judgement
and is not claimed here as proof.

**1e — no `UNVERIFIED` *or* `UNVERIFIABLE` citation under a `Preserve` or `Revise` (criterion 5,
Q4 ruling; finding 1).** A positional read of the register Task 0 step 4 builds for exactly this purpose:

```bash
grep -nE '^\|[^|]*\| *(Preserve|Revise) *\|[^|]*\| *(UNVERIFIED|UNVERIFIABLE) *\|' \
  registers/citation-state-register.md
```

Expected: **no matches, exit 1.** Each match is a surviving claim (`Preserve`/`Revise`) resting on a
citation a verifier did **not** confirm — `UNVERIFIED` (not yet checked) or `UNVERIFIABLE` (checked,
could not be obtained). The Q4 ruling forbids **both**: only a `VERIFIED` citation may support a
survivor. `UNVERIFIABLE` remains an honest recorded outcome elsewhere — a claim may still be
`Relabel`led to Product judgement or carried as an Assumption — but it may not prop up a claim the
audit lets stand as evidence-backed. The two states are anchored by the `( … | … )` alternation so a
`VERIFIED` cell never matches. The check depends on the register's fixed column order; if the register
is empty because the Q4 ruling bounded re-verification to zero citations, this passes truthfully —
1-pre has already established the register itself exists.

- [ ] **Step 2: Verify gate criterion 7 — no product document modified (finding 3: dynamic baseline)**

**The working tree is the thing under test, not the commit history.** The run commits nothing until
promotion, so `HEAD` never moves and a commit-range diff is structurally blind to exactly the failure
this check exists to catch: an agent writing into a product doc in the working tree produces no commit
at all. Diff the tree against the **captured baseline**, and list untracked files separately —
`git diff` does not see a new file.

**Return to the repo root first.** Step 1 ends inside `journal/raw/_inbox/foundation-audit-p2`; if
this check ran from there, `git diff -- .` would scope to a *gitignored* directory and read clean no
matter what a run wrote elsewhere — the exact cwd hazard the plan warns about at step 1. Re-anchor
explicitly:

```bash
cd "$(git rev-parse --show-toplevel)"
BASE=$(grep -oE '^baseline_sha: .*' journal/raw/_inbox/foundation-audit-p2/RUN-MANIFEST.md \
  | awk '{print $2}')
git diff --stat "$BASE" -- .
git status --porcelain
```

`$BASE` is read from the run manifest Task 0 pinned — **never a hardcoded commit** — so the check
stays correct as the branch advances. Expected from both: empty, or paths confined to
`docs/superpowers/research/foundation-audit-p2/` (the promoted archive). Everything else the run
writes lives under the gitignored `journal/raw/` and `journal/memory/`, which `git status --porcelain`
does not surface; `git status` is the one that catches an untracked *tracked-path* file, the diff the
one that catches an in-place edit. **Any tracked path outside the promoted archive is a gate
failure**, not a rounding error.

Run this **before** the promotion commit in step 6, while the working tree still holds whatever the
run actually did.

- [ ] **Step 3: Write `INTEGRITY-MANIFEST-post.md` and reconcile against both earlier manifests (finding 2)**

```bash
find journal/raw/_inbox/foundation-audit-p2 -type f \
  -not -name 'INTEGRITY-MANIFEST-*.md' -exec sha256sum {} \; \
  | sort -k2 > journal/raw/_inbox/foundation-audit-p2/INTEGRITY-MANIFEST-post.md
```

The `-not -name 'INTEGRITY-MANIFEST-*.md'` exclusion is the same guard as Task 0 step 6 and Task L
step 0: the three manifests never hash one another or themselves, so the reconciliation compares only
the artifacts they exist to protect. Reconcile the post-manifest against `-scaffold.md` (templates and
registers must be unchanged or changed only by the orchestrator) and against `-pre.md` (every
audit-record hash that moved must be explained by a correction that landed at that anchor per its
`L-U<n>.md`). An audit record whose hash changed with no corresponding landed correction is an
unexplained mutation and is reported, not absorbed.

- [ ] **Step 4: Write `P2-gate-summary.md`**

Per unit: what survived, what did not, verdict counts, corrections raised/landed/confirmed. Plus
program findings and **orchestrator errors, disclosed** — Phase 1 disclosed two, and that disclosure
is why they are known.

- [ ] **Step 4a: Independent Phase-3-boundary review of the gate summary — blocking**

Dispatch one `audit-verifier` against the drafted `P2-gate-summary.md` with the six **must not**
bullets from the Phase 3 boundary section as its checklist. It returns, per breach, the line and
which bullet it violates; it edits nothing. The orchestrator revises and re-submits, **bounded to two
review rounds**; a summary still breaching after the second round is escalated to the user at the gate
rather than re-dispatched (the Economics row books the typical single pass; a second is the ceiling).
This is the only check on the **cross-unit synthesis** bullet — it exists because the artifact's
author is the party the boundary constrains, and the gate summary is the only output that ranges over
all eight units. It is not the only check on the boundary as a whole: the two per-record-breachable
bullets are checked per unit at V* step 5, and "edit any audited document" at Task G step 2.

- [ ] **Step 4b: Program-integrity audit (criterion 11) — blocking**

Dispatch **one** `audit-auditor` (program-integrity: no web, no Edit) against the run's process
records, not its evidence. It audits four things and returns a sound/unsound finding per area with the
locus it checked: (1) every material correction landed in the artifact it targets; (2) roles stayed in
separate hands per the dispatch ledger — no instance both audited and verified a unit, none both
raised and landed a correction, none confirmed a landing it performed; (3) every gate check above
positively enumerates and has been shown to fail on empty (not absence-of-a-token); (4) shared state
stayed orchestrator-owned with unique, densely-assigned IDs. It **cannot** open a source, so any
finding that turns on what a source says it returns as `OUT-OF-ROLE — needs a verifier` rather than
guessing. A sound process is a valid result it must state plainly (anti-pessimism). This is the role
built for the exact defect class this program fears; its record is promoted with the run.

- [ ] **Step 5: Write `PROCESS-AUDIT.md` with methodological lessons for Phase 3**

- [ ] **Step 6: Promote the curated archive and commit**

Copy curated files out of the gitignored inbox; **do not un-ignore `journal/raw/`**. Secret-scan
before committing, reading the exit code directly.

- [ ] **Step 7: STOP. Present to the user. Do not begin Phase 3.**

The charter gates P3 at its own boundary: "User reviews per-decision verdicts before P3."

---

## Economics (estimate)

Sized by proportional rigor: only material defects trigger landing and confirmation, so the land/
confirm rows are conditional, not per-unit.

| Stage | Dispatches | Note |
|---|---|---|
| Audits A1–A8 | 8 | one `audit-verifier` (produce) per unit |
| Verifications V1–V8 | 8 | one fresh `audit-verifier` per unit |
| Landings L (material defects only) | ~2–4 | fires only where a verifier raises a material correction |
| Landing confirmations LV | ~2–4 | one fresh `audit-verifier` per landed unit (all landed corrections are material) |
| Bounded extra passes | ≤3 | mis-scope / already-identified-gap only |
| Collections (verifier-called, named gap only) | ~2 | closes a specific evidence gap |
| Phase-3-boundary review of the gate summary (step 4a) | 1 | `audit-verifier` |
| Program-integrity audit (step 4b) | 1 | `audit-auditor` |
| **Total** | **~24–31** | typically ~24; as low as ~18 if every unit clears at verify; down from ~45 |

The reduction from ~45 is the whole point of proportional rigor: clean units stop at verify, and the
land→confirm machinery runs only where a material defect earns it. Phase 1 ran 12 remediation passes +
5 verifications + a 9-record final wave; Phase 2 spends far less because most units are expected to
clear at verify, and the budget that remains is concentrated on the material corrections that matter.
If W1+W2 surface more material defects than expected, re-scope W3 rather than absorbing the overrun.

---

## Self-Review

Runs `writing-plans`' three checks, then the four `research-plan` additions (loop closure, role fit,
gate falsifiability, tool-enforcement honesty).

1. **Charter coverage** — Workflow B ✓ (scope + taxonomy); five-verdict taxonomy ✓ (verbatim);
   two-layer classification ✓ (Global Constraints); three-point contract ✓ (Evidence requirements);
   amendments 5–7 ✓ (Stop conditions); "does not edit the baseline" ✓ (landing-target boundary);
   Phase 3 gate ✓ (explicit section + Task G step 7); the added **Product Design Inputs** bridge and
   P4 ownership ✓ (Phase 3 boundary; charter Phase map).
2. **User's four guards** — landing ✓ (L*, material corrections only); independently verified ✓ (LV*,
   a third instance); primary source for material corrections ✓ (L* step 3, LV* step 3); role
   separation — **not enforceable by tool grants**, since it is an instance-level property no agent
   type can hold (and the auditor/verifier/confirmer share the `audit-verifier` type). It rests on
   orchestrator dispatch discipline, is *checked* against the dispatch ledger at Task G step 1c, and
   is independently re-audited by the program-integrity pass (step 4b).
3. **Loop closure (research-plan I1)** — every unit has a produce (A*) and an independent verify (V*)
   by a different instance; every **material** correction has a land (L*) and a landing confirmation
   (LV*) by a third. A clean unit correctly has no landing artifacts — proportional rigor, not a gap.
4. **Role fit (research-plan)** — no task asks a role past its grant. `audit-editor` (no `WebSearch`)
   never collects; `audit-verifier` (no `Edit`) never repairs; `audit-auditor` (no web) never opens a
   source, and its OUT-OF-ROLE escape hatch is stated (step 4b). The one reconciliation — using
   `audit-verifier` to *produce* the audit — is within its grant and mandate and is flagged, not
   hidden.
5. **Gate falsifiability (research-plan I5 / P5)** — every criterion names a failing input: crit 1
   fails on a missing record (1-pre) or an unlanded correction (1a); crit 2 on a NOT-LANDED row (1b);
   crit 3 on a repeated handle (1c); crit 4 on an unanswered Remove/Replace (1d); crit 5 on an
   `UNVERIFIED`/`UNVERIFIABLE` citation under a survivor (1e); crit 7 on any tracked path outside the
   archive (step 2). No absence-of-a-token check remains; the manifests exclude themselves (finding 2).
6. **Tool-enforcement honesty** — the plan states plainly that *path* scoping of `Write` and
   *instance* separation are **not** tool-enforced; both are dispatch discipline checked at the gate.
   The roles' fail-closed-on-missing-run-dir behavior is a real grant-level property and is named as
   such (finding 4).
7. **Resolved, not placeholder** — Q1–Q5 are **resolved rulings** (user, 2026-07-21), not open
   questions; each is binding on dispatch. No TBDs remain.
8. **Consistency** — verdict vocabulary (`Preserve/Relabel/Revise/Replace/Remove`) is kept distinct
   from Phase 3's decision vocabulary (`Confirm/Revise/Reconsider/Remove`); the overlap on
   `Revise`/`Remove` is called out in the Phase 3 boundary so the two are not conflated.
9. **Known weakness** — the ~24–31-dispatch estimate assumes most units clear at verify; it is
   extrapolated, not measured. If W1+W2 surface more material defects than expected, re-scope W3
   rather than absorbing the overrun silently.
