# Adaptive Learning Foundation Audit — Phase 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: use `subagent-driven-development` (recommended) or
> `executing-plans` to run this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for
> tracking.

**Status: DRAFT — awaiting user approval. Phase 2 has not begun.**

**Goal:** Adversarially audit the project's existing learning/pedagogy foundation — owned specs,
decisions, and implemented learning behavior — and return, for every audited claim, one of
**Preserve · Relabel · Revise · Replace · Remove**, reporting both what fails and what survives.

**Architecture:** SDD orchestration under the approved charter's Workflow B. Eight audit units are
dispatched to `audit-auditor` agents in three waves; every audit record is independently checked by
an `audit-verifier`; verifier corrections are **landed** into the audit record by an `audit-editor`
and the landing is then **independently confirmed** by a second verifier. The orchestrator holds the
baton, owns all shared registers, and never audits, corrects, or verifies.

**Tech Stack:** Markdown artifacts only. No product code is modified. Agent capability boundaries are
expressed as tool grants **where a tool grant can express them** — withholding `Bash` removes shell
and git; withholding `WebSearch` removes collection; withholding `Edit` removes in-place rewriting.
Two boundaries this plan depends on are **not** expressible as tool grants and must not be described
as if they were: *path* scoping of `Write`, and *instance* separation of roles. Both are dispatch
discipline, and both are checked at the gate (Task G steps 1–2) rather than prevented at the tool
layer.

<!-- wl:criteria -->
## Acceptance criteria (four elements)

1. **Complete** — every audit unit U1–U8 has an audit record, a verification record, and (where
   corrections were raised) a landing record plus an independent landing confirmation. No unit
   reaches the gate with an unresolved correction.
2. **Honest** — every verdict carries a status bucket, a provenance basis, and a verbatim quote of
   the audited text. Both survivors and failures are reported. No product doc is edited.
3. **Separated** — no agent both audits and verifies the same unit; no agent both raises and lands
   its own correction; the orchestrator dispatches and assembles but never authors a verdict.
4. **Bounded** — Phase 2 emits verdicts and registers only. It produces none of the six Phase 3
   deliverables and adopts no recommendation.
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
| G4 | **Prefer capability boundaries to instructions — and load them at session start.** | Task 0 steps 1–3 (**requires session restart**) |
| G5 | **Briefing about a bias does not correct it** — pessimism drift needs a checking step. | Verifier brief: "is this defect real?" is a required question |
| G6 | **Own the shared state centrally** — agents return rows, orchestrator assigns IDs. | Task 0 step 5; all registers orchestrator-owned |
| G7 | **Read what you already hold, first.** | Auditor brief: cite the Phase 1 dossier before searching |
| G8 | **Route follow-up messages by dispatch order, not by ID prefix.** | Orchestrator dispatch ledger |
| G9 | **Check material corrections against the primary source, not only prior records.** A correction pass making material source claims with zero retrievals is "unverified by construction." | Task L* brief + LV* check |
| G10 | **Scope an extraction route to the job** (page-image vs `pdftotext`). | Auditor/verifier brief |
| G11 | **Verify the correctors, not just the collectors.** | Tasks LV1–LV8 exist precisely for this |

### Role boundaries (G4 — capability where possible, dispatch discipline where not)

| Role | Agent type | May do | May **not** do |
|---|---|---|---|
| **Auditor** | `audit-auditor` *(does not yet exist — Task 0)* | Read audited docs + Phase 1 dossiers; write an audit record | Edit any product doc; verify its own record |
| **Corrector** | `audit-editor` | Land a verifier's correction into the **audit record** | Raise the correction it lands; edit product docs; collect new sources |
| **Verifier** | `audit-verifier` | Re-check claims against primary sources; write a verification record | Edit any record — "it judges, it never repairs" |
| **Collector** | `audit-collector` | Fetch a named missing source under a bounded gap spec | Audit, verify, or land |
| **Orchestrator** | main session | Dispatch, assign register IDs, assemble the gate package | Author any verdict, correction, or verification |

**No agent audits and verifies the same unit. No agent lands a correction it raised.**

**Neither of these is a tool grant, and neither can be.** The table's *role* column is enforced by
agent type — an `audit-verifier` has no `Edit` and therefore cannot repair. But both sentences above
are **instance-level identity** properties: an agent type cannot know which instance wrote the file
it is reading, so no grant can stop the same instance being dispatched twice into different roles.
They hold only if the orchestrator dispatches them correctly. The dispatch ledger (G8) is therefore
the *evidence* for separation, not just a routing aid, and Task G step 1c checks it. A separation
claim made without reference to the ledger is unsupported.

---

## Scope

### In scope — 8 audit units

Ordered by dispatch wave. Line counts and citation counts verified 2026-07-20 at `6def4b6`.

| Unit | Object | Size | Citations | Why in scope |
|---|---|---|---|---|
| **U4** | `docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md` | 474 L | **24 sources**, 41 `ALR-` reqs | The approved evidence baseline. Charter: "The audit re-examines the baseline's own claims for citation drift and overstatement." Also the **drift ruler** for U1–U3. |
| **U1** | `docs/specs/learning-mastery-and-scoring.md` | 213 L | **0** | Densest owned pedagogy doc; cited *by* others as binding; cites nothing. |
| **U2** | `docs/specs/product-vision.md` | 102 L | **0** | North star. The uncited "Duolingo-like" premise propagates repo-wide. |
| **U3** | `docs/superpowers/specs/2026-07-16-adaptive-ai-learning-architecture-design.md` | 617 L | **0 inline** | Encodes pedagogy into a deterministic reducer. Says "research-calibrated" at `:285` **and** `:412` with no research named. |
| **U5** | `journal/decisions.md` — learning-scope rows | 75 L (34 table rows + 6 prose ADRs) | mixed | Charter deliverable 6 reviews every existing decision. In-scope rows: R12, R13, R14, R17, R21, R22, R23, R25, R26, R27, P2, P6. Borderline: R9, R15, R18, R24, R30, R31. |
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
  R19, R20, R28, R29, R32, R33, R34 and prose ADRs P1, P3, P4, P5. Out of scope: they make no
  pedagogical claim. (R20 and R24–R27 are retained as **positive controls** — see Task 0 step 4.)
- **Product behavior.** No source file, test, spec, or decision is edited. U6 audits code as a
  claim-bearing artifact; it changes nothing.
- **The charter itself** (`2026-07-17-…-audit-research.md`) — governing input, not a target.
- **All six Phase 3 deliverables** — see "Phase 3 boundary" below.

### Dependencies

1. **Phase 1 archive must be readable at `6def4b6`** — it is the evidence base every `Evidence-backed`
   verdict must cite. Confirmed present, 59 files.
2. **`audit-auditor` agent type must exist before the execution session starts** (Task 0, G4).
3. **The three existing agent defs hardcode the Phase 1 path** and must be corrected first:
   `audit-verifier.md:18`, `audit-editor.md:27`, `audit-collector.md:17` all write to
   `journal/raw/_inbox/foundation-audit-p1/`.
4. **Session restart between Task 0 and Task A1.** Claude Code reads its agent registry at session
   start; Phase 1 lost this exact bet ("they failed to load mid-session").

### Ambiguities requiring a user ruling before dispatch

These are **not** resolved by this plan. Each changes the work materially.

| # | Ambiguity | Options | Plan's recommendation |
|---|---|---|---|
| **Q1** | **U6 (code) is not obviously in charter scope.** The charter's Workflow B says "existing foundation — especially older uncited pedagogy documents." Code is arguably a *document* of pedagogy, arguably out. | (a) audit U6 as planned; (b) drop U6 to Phase 3; (c) audit U6 read-only with verdicts restricted to `Relabel` | **(a).** The strongest finding available is in code: the entire shipped mastery model is one line (`controller.ts:361`), while `progress/types.ts` (178 L, in U6 scope) declares a durable-evidence vocabulary that no app code consumes — the module implementing it is imported only by `web/qa/progress/harness.ts`. A schema this deliberate with no reducer behind it is a pedagogical claim the docs do not make anywhere. Auditing docs while ignoring that is auditing the map, not the territory. |
| **Q2** | **The `Replace` verdict has no defined actor.** `Preserve/Relabel/Revise/Remove` are all recordable as candidates; `Replace` implies substitute content, which is authoring — arguably Phase 3. | (a) `Replace` = "recommend replacement, name the successor claim, do not write it"; (b) drop `Replace`; (c) allow drafting | **(a).** Keeps Phase 2 non-authoring while preserving the charter's five-verdict taxonomy verbatim. |
| **Q3** | **Borderline U5 rows** (R9, R15, R18, R24, R30, R31) touch learner-evidence semantics through the persistence seam but are engineering decisions. | (a) audit all six; (b) audit none; (c) audit only R18 + R30 | **(c).** R18 governs how learning evidence is admitted and R30 prevents phantom zero-evidence sessions; the other four are storage mechanics. Cheap to widen later; expensive to unwind scope creep. |
| **Q4** | **Does Phase 2 re-verify the 24 baseline sources, or only audit how they are *used*?** Full re-verification is ~24 × 3-point contract — a Phase-1-sized effort on already-approved-by-another-process material. | (a) audit usage only; (b) full re-verification; (c) re-verify only sources whose claims changed downstream | **(c).** Bounded, and targets the actual failure mode (drift), not the source register. Expect ~6–9 sources. |
| **Q5** | **Stale memory file.** `journal/memory/v2-learning-foundations-roadmap.md` (updated 2026-07-15) says the active task is Strategy Table Fundamentals; `ROADMAP.md:92-95` and `PROGRESS.md:34-37` record it as intentionally paused. | (a) fix now as prep; (b) audit-unit finding under U8; (c) leave | **(b).** It is a live instance of the drift class Phase 2 exists to find; fixing it silently would destroy the specimen. |

### Approval decisions required from the user

1. **Approve Phase 2 beginning at all** — the charter gates it and `phase.md` records "Phase 2 must not
   begin without explicit user approval."
2. **Rule on Q1–Q5.**
3. **Approve creating `audit-auditor`** and editing the three existing agent definitions (Task 0) —
   these are the only file writes before the gate, and they are tooling, not product.
4. **Approve the wave structure and the ~45-dispatch budget** (see Economics).

---

## Verdict taxonomy

Every audited claim receives **exactly one** verdict, plus a Layer-2 status bucket and a Layer-1
provenance basis. Verdict and bucket are different axes and never substitute for one another.

| Verdict | Means | Typical bucket after audit | Guard |
|---|---|---|---|
| **Preserve** | The claim stands as written. | `Evidence-backed`, or a correctly-labelled `Product judgement` | Must cite the Phase 1 dossier or baseline source that supports it, with an exact location. |
| **Relabel** | The claim is fine; its *epistemic label* is wrong. | usually `Evidence-backed` → `Product judgement` / `Assumption` | **This is the default remedy for an uncited-but-reasonable claim.** Never escalate to Remove for want of a citation. |
| **Revise** | The claim overstates what its basis supports; weaken it. | `Evidence-backed` at reduced strength | Must name the *specific* overstatement and the honest wording. |
| **Replace** | The claim is wrong but the topic still needs a claim. | `Unsupported` → successor named | Per **Q2(a)**: name the successor claim; **do not author it**. |
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

```
A*  audit          → audit-auditor writes  audit/U<n>-audit.md
V*  verify         → audit-verifier writes verification/V-U<n>.md   (raises corrections; repairs nothing)
      │
      ├─ no corrections ─────────────────────────────► unit CLEARED
      │
L*  land           → audit-editor applies each correction INTO audit/U<n>-audit.md,
      │              marking each in place; writes landing/L-U<n>.md listing every
      │              correction + the anchor where it landed.
      │              For MATERIAL corrections it MUST reopen the primary source (G9)
      │              and record the retrieval; zero-retrieval material landings are rejected.
      │
LV* confirm landing → a SECOND, different audit-verifier opens audit/U<n>-audit.md and
                     confirms each correction is actually present. Writes landing/LV-U<n>.md
                     with a per-correction LANDED / NOT-LANDED / ALTERED verdict.
                     NOT-LANDED or ALTERED → back to L*, once (bounded); the first
                     confirmation is archived as LV-U<n>-r1.md and the retry writes
                     the current LV-U<n>.md (LV* step 4).
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
| 1 | Every unit U1–U8 has an audit record, a verification record, and — where corrections were raised — a landing record **and** an independent landing confirmation. | **Mechanical**, in two halves. Presence: Task G step **1-pre** asserts `audit/U<n>-audit.md` and `verification/V-U<n>.md` exist and are non-empty for all of U1–U8, and it runs **first** — without it every later enumeration is vacuous on a unit whose records were never written. Accounting: Task G step **1a** — every correction ID in `verification/` has a `LANDED` row in the current landing confirmation. |
| 2 | **Zero corrections in NOT-LANDED or ALTERED state.** | **Mechanical**, Task G step 1b (row-scoped, so the verdict legend cannot self-match). |
| 3 | No agent both audits and verifies a unit; no agent both raises and lands a correction. | **Mechanical read of recorded fact**, Task G step 1c: distinct agent handles per role in the dispatch ledger. Unlogged dispatch ⇒ unproven ⇒ fail. |
| 4 | Every `Remove` and `Replace` carries an independent verifier's written "is this defect real?" answer. | **Agent-established, mechanically accounted**: the answer is written by the V* verifier (V* step 2); Task G step **1d** enumerates the `Remove`/`Replace` claim IDs out of the audit records and requires a matching answered ID in `verification/`. The *substance* of the answer is the verifier's; only its existence is mechanical. |
| 5 | No citation used to support a `Preserve` or `Revise` is in `UNVERIFIED` state. | **Mechanical against `registers/citation-state-register.md`**, Task G step **1e** — see below. Uncheckable without that register, which is why it exists. |
| 6 | Both survivors and failures are reported per unit; no unit reports only failures without stating what it examined and left alone. | **Agent-established** at audit time (A* brief) and confirmed by the V* verifier for its unit. Not orchestrator self-attestation. |
| 7 | **No product document has been modified.** | **Mechanical**, Task G step 2 — working-tree diff **and** `git status --porcelain`, both against `6def4b6`. A commit-range diff cannot establish this. |
| 8 | Conflict, source-lead, and citation-state registers are complete and orchestrator-owned. | **Orchestrator self-attestation.** The orchestrator owns these registers, so no independent check exists; recorded as attested, not proven. |
| 9 | `INTEGRITY-MANIFEST-post.md` reconciles against `-scaffold.md` and `-pre.md`. | **Mechanical**, Task G step 3: hash comparison; every moved audit-record hash explained by a landed correction. |
| 10 | A `P2-gate-summary.md` states, per unit, what survived and what did not, discloses orchestrator errors, and breaches none of the five Phase 3 **must not** bullets. | **Independently reviewed**, Task G step 4a — an `audit-verifier` checks the boundary; the per-unit content and error disclosure remain orchestrator-attested. |

**Criterion 5 needs a register to be checkable at all.** Q4(c) bounds re-verification to sources whose
claims changed downstream (~6–9 expected). Each such citation gets a row in
`registers/citation-state-register.md` — citation ID, the verdict it supports, the unit, and its state
(`VERIFIED` / `UNVERIFIED` / `UNVERIFIABLE`) — assigned by the verifier that judged it, per the
charter's rule that UNVERIFIED is owned by the verifier that assigned it. The gate check is then a
read of that register against the `Preserve`/`Revise` verdicts, run as Task G step 1e. Without it,
criterion 5 names a state no Phase 2 artifact records.

**Three of ten rest wholly or partly on orchestrator attestation** (6, 8, 10). Criterion 4 no longer
does: step 1d accounts mechanically for the *existence* of every answer, leaving only the answer's
quality to the verifier who wrote it — which is agent-established, not self-attested. That is a known,
accepted weakness of a design whose orchestrator is also its assembler — it is written down here so a
reader knows which parts of the gate are proven and which are asserted, rather than discovering the
difference later.

---

## Expected artifacts

Working copies live in the **gitignored** inbox during the run; a curated archive is promoted at the
gate (the Phase 1 pattern).

```
journal/raw/_inbox/foundation-audit-p2/          # gitignored working area
  audit/U1-audit.md … U8-audit.md
  verification/V-U1.md … V-U8.md
  landing/L-U1.md … L-U8.md
  landing/LV-U1.md … LV-U8.md                    # current landing confirmation per unit
  landing/LV-U<n>-r1.md                          # only where a bounded retry occurred: the
                                                 #   superseded first confirmation, kept as evidence
  registers/conflict-register.md
  registers/source-lead-register.md
  registers/citation-state-register.md
  INTEGRITY-MANIFEST-scaffold.md                 # Task 0 step 6 — templates + registers
  INTEGRITY-MANIFEST-pre.md                      # Task L step 0 — audit records, pre-landing

docs/superpowers/research/foundation-audit-p2/   # TRACKED, promoted at the gate
  README.md
  P2-gate-summary.md
  PROCESS-AUDIT.md
  audit/  verification/  landing/  registers/
  INTEGRITY-MANIFEST-scaffold.md  INTEGRITY-MANIFEST-pre.md  INTEGRITY-MANIFEST-post.md
  _templates/
```

---

## Branch and commit strategy

- **Branch:** `audit/p2-adversarial-foundation` (exists, at `6def4b6`, tracking origin).
- **Task 0 commit** — agent definitions only (`.claude/agents/`), before the session restart.
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

**Phase 2 produces verdicts. Phase 3 produces meaning.** The following are **Phase 3 deliverables and
are forbidden in Phase 2 output**, per the charter's "Deliverables (6)":

1. Evidence Summary · 2. Research Synthesis · 3. Project Implications · 4. Gap Map ·
5. Assumption Register · 6. Decision Candidates

Concretely, a Phase 2 artifact **must not**:

- integrate findings **across** units into a combined conclusion (that is deliverable 2);
- state what the project **should now do** (deliverable 3);
- classify a decision `Confirm / Revise / Reconsider / Remove` — that is deliverable 6's vocabulary
  and is **deliberately different** from Phase 2's `Preserve / Relabel / Revise / Replace / Remove`;
- author replacement content for anything it marks `Replace` (Q2);
- edit any audited document.

**The one-sentence test:** if a sentence would still make sense with every other unit's findings
deleted, it belongs in Phase 2; if it needs them, it is Phase 3.

The gate summary may **enumerate** per-unit results and flag cross-unit *tensions* for Phase 3 to
resolve — enumeration is not synthesis. A tension is logged to the conflict register as a pointer,
never resolved.

**Who enforces this.** The one-sentence test is a heuristic with no actor, and `P2-gate-summary.md`
is the artifact most likely to breach the boundary — it is the only Phase 2 output that ranges over
all eight units, and its sole author is the orchestrator, i.e. the same party being asked to
restrain itself. Self-restraint by the author of the highest-risk artifact is not enforcement. So the
gate summary is reviewed against the five **must not** bullets by an independent `audit-verifier`
before promotion (Task G step 4a). The verifier does not rewrite it — "it judges, it never repairs";
it returns per-breach line references and the orchestrator revises.

**Where that review does not reach.** Task G step 4a covers one artifact, and the argument for
concentrating on it — that the gate summary is the only Phase 2 output ranging over all eight units —
holds for the cross-unit synthesis bullet and only for it. Two bullets are breachable inside a single
audit record with no cross-unit reach: stating what the project should now do, and authoring
replacement content for a `Replace`. Those are checked per record by each unit's own verifier
(V* step 5), which is reading the record anyway. The remaining two need no separate actor: the
Phase 3 decision vocabulary is a whole-program classification, and "edit any audited document" is
caught mechanically by Task G step 2 against the working tree.

---

## File Structure

| File | Responsibility |
|---|---|
| `.claude/agents/audit-auditor.md` | **New.** Adversarial auditor role; read + write-audit-record only. |
| `.claude/agents/audit-{verifier,editor,collector}.md` | **Modify.** Repoint hardcoded `foundation-audit-p1` paths to a phase-neutral path. |
| `journal/raw/_inbox/foundation-audit-p2/_templates/audit-record-template.md` | Audit record shape. |
| `journal/raw/_inbox/foundation-audit-p2/_templates/verification-record-template.md` | Verification record shape. |
| `journal/raw/_inbox/foundation-audit-p2/_templates/landing-record-template.md` | **New in Phase 2.** Landing + landing-confirmation shape. |
| `journal/raw/_inbox/foundation-audit-p2/registers/*.md` | Orchestrator-owned shared state (G6). |

---

## Tasks

### Task 0: Prepare roles, templates, registers, and the integrity snapshot

**Files:**
- Create: `.claude/agents/audit-auditor.md`
- Modify: `.claude/agents/audit-verifier.md:18`, `audit-editor.md:27`, `audit-collector.md:17`
- Create: `journal/raw/_inbox/foundation-audit-p2/_templates/{audit-record,verification-record,landing-record}-template.md`
- Create: `journal/raw/_inbox/foundation-audit-p2/registers/{conflict-register,source-lead-register,citation-state-register}.md`
- Create: `journal/raw/_inbox/foundation-audit-p2/INTEGRITY-MANIFEST-scaffold.md`

**Interfaces:**
- Produces: the four agent types, loaded at session start; the record templates every later task fills.

- [ ] **Step 1: Write `audit-auditor.md`**

Frontmatter follows the existing three verbatim in shape:

```markdown
---
name: audit-auditor
description: Foundation-audit ADVERSARIAL AUDITOR role. Audits an existing project document or
  implemented behavior for uncited, overstated, outdated, or contradicted learning claims, and
  returns a per-claim verdict. Has no shell and cannot edit a file in place.
tools: WebFetch, Read, Write, Glob, Grep
---
```

**What the tool grant actually enforces.** No `Bash` — no shell, no git, no product code execution.
No `WebSearch` — an auditor judges existing claims against evidence already held; searching is the
collector's role. No `Edit` — it cannot revise an audited document in place. These are capability
boundaries, not requests (G4).

**What the tool grant does not enforce, stated plainly.** `Write` is not path-scoped by any tool
grant, and withholding `Edit` while granting `Write` does not prevent an agent clobbering an audited
document by writing over its path. The description above says "cannot edit in place" rather than
"cannot edit the audited artifact" because only the former is true of the grant.

Body must therefore state, as **instructions** the gate checks rather than boundaries the platform
holds: writes only under the `audit/` subdirectory of the run directory named in its brief; must
consult the Phase 1 dossier before any web retrieval (G7); must quote verbatim with `file:line`; must
report what it examined and left alone; `Remove` requires a contradiction, not an absence. The
backstop is Task G step 2, which reads the working tree and fails the gate on any write outside the
audit output paths.

- [ ] **Step 2: Repoint the three hardcoded Phase 1 paths to a phase-neutral placeholder**

```bash
sed -i 's#foundation-audit-p1#foundation-audit-<phase>#g' \
  .claude/agents/audit-verifier.md .claude/agents/audit-editor.md .claude/agents/audit-collector.md
```

**Neutral, not re-pinned.** Substituting `p2` for `p1` would leave Phase 3 with the identical defect
dependency 3 flags as blocking here — the same one-line-per-agent fix, rediscovered at the next phase
boundary. The agent definitions instead carry `foundation-audit-<phase>` and each dispatch brief
supplies the concrete run directory (`foundation-audit-p2` for this phase). The definitions state
that an agent writes only under the run directory named in its brief and nowhere else.

- [ ] **Step 3: Verify the edit landed and nothing else changed**

Run: `grep -rn 'foundation-audit-' .claude/agents/`
Expected: three hits, all `foundation-audit-<phase>`, at `audit-verifier.md:18`, `audit-editor.md:27`,
`audit-collector.md:17`.

Then run: `grep -rn 'foundation-audit-p[0-9]' .claude/agents/`
Expected: **no matches, exit 1** — no phase number survives anywhere in the agent definitions.

- [ ] **Step 4: Seed the positive-control list into the audit template**

`journal/decisions.md` rows **R20, R24, R25, R26, R27** cite doc paths, section numbers, line
numbers, or measured figures, and two self-correct prior errors in-record. They are the standard the
audit holds others to. The template's calibration field names them so an auditor can anchor
"good looks like this" without the orchestrator seasoning the finding.

- [ ] **Step 5: Create the three registers, orchestrator-owned (G6)**

`conflict-register.md`, `source-lead-register.md`, and `citation-state-register.md`.

Header must state verbatim: `Agents return rows. IDs are assigned by the orchestrator. An agent that
predicts an ID has made an error.` Seed the conflict register with the known `SCI-005` vs
`how-to-teach.md` feedback-timing conflict.

The **citation-state register** carries one row per citation Phase 2 re-checks under Q4(c), in this
column order, which Task G step 1e reads positionally:

`| <citation ID> | <verdict it supports> | <unit> | <state> |`

— four cells, `<state>` being exactly one of `VERIFIED` / `UNVERIFIED` / `UNVERIFIABLE`, recorded by
the verifier that judged it. Gate criterion 5 forbids an
`UNVERIFIED` citation beneath a `Preserve` or `Revise`; without this register that criterion names a
state no artifact records and cannot be checked. The column order is fixed because the check is
positional: a register that reorders its columns silently disarms step 1e.

- [ ] **Step 6: Snapshot the scaffold before mutating it (G3) — first of two snapshots**

```bash
find journal/raw/_inbox/foundation-audit-p2 -type f -exec sha256sum {} \; \
  | sort -k2 > journal/raw/_inbox/foundation-audit-p2/INTEGRITY-MANIFEST-scaffold.md
```

**What this snapshot does and does not cover.** At this point the directory holds only templates and
registers, so this manifest protects the *scaffold* — it proves the templates and register headers a
later run was working from were not quietly rewritten. It is **not** a before-image of any audit
record: every audit record is created later in A1–A8 and then deliberately mutated in place by L1–L8.
The snapshot that makes the `ALTERED` verdict falsifiable is the second one, taken in Task L step 0
after the audit records exist and before any editor touches them. Taking only this one would invert
Phase 1's ordering — there the snapshot preceded the mutation of already-existing dossiers — and
would leave the load-bearing surface unprotected.

- [ ] **Step 7: Commit the agent definitions only**

```bash
git add .claude/agents/
git commit -m "chore(audit): add audit-auditor role and repoint agent paths to phase 2"
```

- [ ] **Step 8: RESTART THE SESSION (G4) — blocking**

Claude Code reads its agent registry at session start. Phase 1 lost this exact bet: the restricted
types "failed to load mid-session." **Do not dispatch Task A1 in the same session as Task 0.**
Confirm after restart that `audit-auditor` appears in the available agent types before proceeding.

---

### Tasks A1–A8: Audit dispatches (three waves)

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

Brief must include, verbatim: the unit's path; the verdict taxonomy table; the anti-pessimism rule;
"read what you hold first"; the requirement to quote verbatim with `file:line`; and the instruction
to report survivors as well as failures. Per **Q4(c)**, U4's citation re-verification is bounded to
sources whose claims changed downstream.

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

- [ ] **Step 4: Each verifier marks every correction MATERIAL or MECHANICAL (G9)**

**Material** = changes a quotation, figure, attribution, tier, or independence judgement — anything
that is a claim about what a source says. **Mechanical** = formatting, anchors, ID hygiene. This flag
sets the landing requirement in Task L*.

- [ ] **Step 5: Each verifier checks its own unit's record against the two per-record Phase 3 bullets**

Three of the five **must not** bullets cannot be breached inside a single audit record: cross-unit
synthesis needs other units, the `Confirm/Revise/Reconsider/Remove` vocabulary is a whole-program
classification, and editing an audited document is caught mechanically by Task G step 2. Two **can**
be breached by one record on its own, with no cross-unit reach:

- **"state what the project should now do"** — a unit-local recommendation is Phase 3 deliverable 3
  arriving early;
- **"author replacement content for anything it marks `Replace`"** — per Q2(a) a `Replace` names its
  successor claim and stops. Drafting the successor is authoring.

The verifier returns these as line references, does not rewrite them, and the orchestrator routes them
to L* like any other correction. This adds no dispatch and no pass: the verifier already reads the
whole record to do its existing four duties. It exists because the alternative is what this plan
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
find journal/raw/_inbox/foundation-audit-p2/audit -type f -exec sha256sum {} \; \
  | sort -k2 > journal/raw/_inbox/foundation-audit-p2/INTEGRITY-MANIFEST-pre.md
```

This is the before-image of the surface L1–L8 deliberately mutate. Without it the `ALTERED` verdict
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

One row per correction: correction ID, MATERIAL/MECHANICAL, the anchor where it landed, and for
MATERIAL the retrieval performed.

---

### Tasks LV1–LV8: Independent landing confirmation (G1, G11)

**Files:**
- Create: `journal/raw/_inbox/foundation-audit-p2/landing/LV-U<n>.md`

**Interfaces:**
- Consumes: `audit/U<n>-audit.md` (post-landing) and `landing/L-U<n>.md`.
- Produces: the gate's blocking precondition.

- [ ] **Step 1: Dispatch a SECOND `audit-verifier` — not the one that raised the corrections**

"Verify the correctors, not just the collectors. A repair is a claim like any other."

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

**1e — no `UNVERIFIED` citation under a `Preserve` or `Revise` (criterion 5).** A positional read of
the register Task 0 step 5 builds for exactly this purpose:

```bash
grep -nE '^\|[^|]*\| *(Preserve|Revise) *\|[^|]*\| *UNVERIFIED *\|' \
  registers/citation-state-register.md
```

Expected: **no matches, exit 1.** Each match is a citation propping up a surviving claim that no
verifier could confirm. `UNVERIFIABLE` does not match `UNVERIFIED` and is not a failure — it is an
honest recorded outcome, and conflating the two would punish the verifier for saying "unknown." The
check depends on the register's fixed column order; if the register is empty because Q4(c) bounded
re-verification to zero citations, this passes truthfully — 1-pre has already established the register
itself exists.

- [ ] **Step 2: Verify gate criterion 7 — no product document modified**

**The working tree is the thing under test, not the commit history.** The plan commits nothing during
the audit run, so `HEAD` never moves past the Task 0 commit and a commit-range diff
(`6def4b6..HEAD`) is structurally blind to exactly the failure this check exists to catch: an agent
writing into a product doc in the working tree produces no entry in it at all. Diff the tree against
the baseline commit, and list untracked files separately — `git diff` does not see a new file.

```bash
git diff --stat 6def4b6 -- . ':(exclude).claude/agents' ':(exclude)docs/superpowers/plans'
git status --porcelain -- . ':(exclude).claude/agents' ':(exclude)docs/superpowers/plans'
```

Expected from both: empty, or paths confined to `docs/superpowers/research/foundation-audit-p2/`.
`git status --porcelain` is the one that catches an untracked file; the diff is the one that catches
an in-place edit. **Any other path is a gate failure**, not a rounding error.

Run this **before** the promotion commit in step 6, while the working tree still holds whatever the
run actually did.

- [ ] **Step 3: Write `INTEGRITY-MANIFEST-post.md` and reconcile against both earlier manifests**

Reconcile against `-scaffold.md` (templates and registers must be unchanged or changed only by the
orchestrator) and against `-pre.md` (every audit-record hash that moved must be explained by a
correction that landed at that anchor per its `L-U<n>.md`). An audit record whose hash changed with
no corresponding landed correction is an unexplained mutation and is reported, not absorbed.

- [ ] **Step 4: Write `P2-gate-summary.md`**

Per unit: what survived, what did not, verdict counts, corrections raised/landed/confirmed. Plus
program findings and **orchestrator errors, disclosed** — Phase 1 disclosed two, and that disclosure
is why they are known.

- [ ] **Step 4a: Independent Phase-3-boundary review of the gate summary — blocking**

Dispatch one `audit-verifier` against the drafted `P2-gate-summary.md` with the five **must not**
bullets from the Phase 3 boundary section as its checklist. It returns, per breach, the line and
which bullet it violates; it edits nothing. The orchestrator revises and re-submits until clean.
This is the only check on the **cross-unit synthesis** bullet — it exists because the artifact's
author is the party the boundary constrains, and the gate summary is the only output that ranges over
all eight units. It is not the only check on the boundary as a whole: the two per-record-breachable
bullets are checked per unit at V* step 5, and "edit any audited document" at Task G step 2.

- [ ] **Step 5: Write `PROCESS-AUDIT.md` with methodological lessons for Phase 3**

- [ ] **Step 6: Promote the curated archive and commit**

Copy curated files out of the gitignored inbox; **do not un-ignore `journal/raw/`**. Secret-scan
before committing, reading the exit code directly.

- [ ] **Step 7: STOP. Present to the user. Do not begin Phase 3.**

The charter gates P3 at its own boundary: "User reviews audit verdicts before P3."

---

## Economics (estimate)

| Stage | Dispatches |
|---|---|
| Audits A1–A8 | 8 |
| Verifications V1–V8 | 8 |
| Landings L1–L8 | ≤8 |
| Landing confirmations LV1–LV8 | ≤8 |
| Bounded extra passes | ≤8 |
| Collections (verifier-called only) | ~4 |
| Phase-3-boundary review of the gate summary (Task G step 4a) | 1 |
| **Total** | **~45** |

Phase 1 ran 12 remediation passes + 5 verifications + 9 final-wave records. Phase 2 is comparable,
with more of the budget spent on landing and confirmation — the steps Phase 1 lacked.

---

## Self-Review

1. **Charter coverage** — Workflow B ✓ (scope + taxonomy); five-verdict taxonomy ✓ (verbatim);
   two-layer classification ✓ (Global Constraints); three-point contract ✓ (Evidence requirements);
   amendments 5–7 ✓ (Stop conditions); "does not edit the baseline" ✓ (landing-target boundary);
   Phase 3 gate ✓ (explicit section + Task G step 7).
2. **User's four guards** — landing ✓ (L1–L8); independently verified ✓ (LV1–LV8); primary source for
   material corrections ✓ (L* step 3, LV* step 3); role separation — **not enforceable by tool
   grants**, since it is an instance-level property no agent type can hold. It rests on orchestrator
   dispatch discipline and is *checked* against the dispatch ledger at Task G step 1c. Recorded here
   as a guard with a gate check, not as a guard the platform prevents violating.
3. **Placeholder scan** — no TBDs. Q1–Q5 are *flagged open questions with recommendations*, not
   placeholders; each names its options and a default.
4. **Consistency** — verdict vocabulary (`Preserve/Relabel/Revise/Replace/Remove`) is kept
   deliberately distinct from Phase 3's decision vocabulary (`Confirm/Revise/Reconsider/Remove`); the
   overlap on `Revise`/`Remove` is called out in the Phase 3 boundary so the two are not conflated.
5. **Known weakness** — the ~45-dispatch estimate is extrapolated from Phase 1's shape, not measured.
   If W1+W2 run materially over, re-scope W3 rather than absorbing the overrun silently.
