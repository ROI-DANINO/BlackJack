# Phase 1 Process Audit — Adaptive Learning Foundation Audit

> How Phase 1 and its remediation were actually executed: dispatch structure, what went wrong,
> and the methodological lessons worth carrying into Phase 2.
>
> **Scope: process only.** The research findings live in the dossiers, verification records, and
> `P1-gate-summary.md`. This document exists because the session working notes (`.wl/sdd/`) are
> ephemeral scratch and do not belong in durable project history — but the *process* they recorded
> does. Nothing here is authoritative over a dossier or a verification record.

---

## 1. Dispatch structure

**Phase 1 (2026-07-19):** 26 dispatches under manual subagent-driven development — no Workflow, no
autonomous orchestration, by explicit instruction. Six collection cards (C1–C6), six verifications
(V1–V6), six focused sufficiency passes, five re-verifications.

**Remediation (2026-07-20):** 12 remediation passes — **5 collection, 7 editorial** — plus 5
independent verifications, 1 program-integrity audit, and a final 6-pass verification wave.

### Roles as capability boundaries, not instructions

Three restricted agent types were authored (`.claude/agents/`) after Phase 1 found that written
prohibitions did not constrain agents:

| Role | Tools | What the boundary prevents |
|---|---|---|
| `audit-collector` | WebSearch, WebFetch, Read, Write, Edit, Glob, Grep | **No Bash** → no git, no product code |
| `audit-editor` | WebFetch, Read, Write, Edit, Glob, Grep | **No Bash, no WebSearch** → structurally cannot collect |
| `audit-verifier` | WebSearch, WebFetch, Read, Write, Glob, Grep | **No Bash, no Edit** → cannot repair what it judges |

**They did not load.** Claude Code reads its agent registry at session start, so types created
mid-session are not dispatchable. Remediation therefore ran on a general-purpose agent with the
prohibitions carried as *instructions* plus hash-based **detection** — a knowingly weaker posture,
recorded as such rather than presented as equivalent. **Phase 2 should start a session with these
types already on disk.** They exist and are valid; only mid-session registration failed.

### Parallelism and the shared-state fix

Repairs ran in parallel across cards (separate dossier files, no write conflict) and each card's
verification chained behind its own repair. The one genuinely shared surface — the two registers —
was the known hazard: Phase 1 produced duplicate IDs from concurrent agent appends.

**Fix: agents return register rows as text; the orchestrator assigns IDs and writes them centrally.**
This is what made parallel dispatch safe, and it caught a real collision (§3).

---

## 2. Verification waves

| Wave | Passes | Outcome |
|---|---|---|
| Phase 1 | V1–V6 + 6 focused + 5 re-verifications | 73/73 citations terminal, 0 fabricated; all six dossiers INSUFFICIENT on first review |
| Remediation | V1d, V2c, V3c, V4c, V5c + program-integrity audit | Sufficiency 2/6 → 5/6; the "corrections never applied" finding |
| Final | W1–W6 over the six unverified remediation passes | Gate condition for approval |

**Every verification used a fresh instance, and no agent verified its own work.** Several verifiers
deliberately used a *different retrieval instrument* than the pass under review — `curl` +
`pdftotext` + local string matching against a collector's WebFetch, or a different host for the same
PDF — so that an extraction artifact in one route would not be reproduced by the other.

---

## 3. What went wrong

### The central defect: corrections were never applied

Phase 1's verifiers recorded corrections and returned them as text. **No pass was ever chartered to
write them into the dossiers, and none did.** This held for **all six cards**, not the two where it
was first noticed.

Established three ways, decisively by a **correction-marker census**: across all six pre-remediation
dossiers there were **10 in-place correction markers, and not one was attributed to a verifier** —
every one named a collector focused pass (each permitted a single edit responsive to a *sufficiency*
finding) or a published corrigendum.

**The gate verdicts were reached against dossiers that did not carry their own corrections.**

### The register ID near-miss

A pass proposed register updates using IDs **#28 and #29**, relayed from a *predicted* ID a verifier
had written before central reconciliation assigned one. **Both IDs belonged to a different card.**
Executing them would have written one card's content into another's rows.

Root cause: **each hop stripped the ID's provisional status** — forecast → relayed → about to be
executed as fact. The return-and-reconcile step is exactly where that forecast gets checked.

### Three manufactured defects

Agents found problems that were not there, three times across the program — including an invented
citation defect that a verifier had to reverse. **The most instructive occurred in a pass explicitly
briefed about pessimism drift.** Briefing about the bias did not prevent it.

### Two orchestrator errors, disclosed

1. **A misrouted message.** A mid-run correction was sent to the wrong agent — two parallel dispatches
   returned visually similar IDs and the prefix was pattern-matched instead of the dispatch order
   being re-checked. The receiving agent correctly declined to act outside its brief and flagged the
   routing problem, which is the only reason it surfaced. The intended recipient never received it and
   **reached the right answer independently.**
2. **A wrong inference from a weak instrument.** One card's corrections were reported as "largely
   applied" on the strength of a keyword grep. The hits were the collector's own *discussion* of a
   corrigendum, not the corrections. **Presence of a topic is not presence of a correction.** The
   error also propagated into a subsequent agent's brief before being retracted.

---

## 4. What worked

- **The anti-fabrication contract held under load.** 0 fabricated sources across the program. Two
  tooling fabrications were caught in flight: a fetch-summariser returned a **wholly invented venue**
  (wrong journal, volume, article number, author count) attached to a real DOI; and a fetch model
  **correctly declined to transcribe** a binary PDF rather than hallucinating its contents.
- **Verifiers pushed back against their own incentive.** One closed with *"I went looking for a scalp
  and there isn't one."* Another corrected a collector's *pessimistic* characterisation. One editorial
  pass found **five** corrections running in the dossier's favour, including one that reversed the
  program's ranking of a source's independence. Another **found no new defects and said so**, listing
  what it examined and left alone rather than padding findings.
- **The pre-remediation snapshot made the central finding checkable.** The inbox is untracked, so git
  could not answer "what did this file say before?" A byte-for-byte snapshot taken before any edit
  could. Phase 1 had recorded append-only integrity as *"unverifiable by construction"* — **it is
  verifiable if you snapshot first.**
- **Detection worked, this once.** 0 of 12 agents ran git, against Phase 1's 2-of-4 violation rate,
  with every self-disclosure corroborated by the hash probes.

---

## 5. Methodological lessons for Phase 2

1. **Charter a landing step, and check it.** A verifier's correction is not self-executing. Add an
   explicit apply-corrections pass and a verification that corrections landed. This is the single
   most important change.
2. **Two remedies, not one.** Missing evidence needs collection; evidence already held but misread
   needs editorial correction. Seven of twelve remediation passes were editorial, and three cards were
   resolved at **zero collection cost**.
3. **Snapshot before mutating an untracked surface.** Cheap, and it is the only thing that makes
   integrity claims falsifiable.
4. **Prefer capability boundaries to instructions** — and load them at session start. Specific
   prohibition plus announced detection outperformed a bolded ban here, but that is one run and does
   not overturn the finding that instruction is a weak constraint.
5. **Briefing about a bias does not correct it.** Pessimism drift needs a checking step — a verifier
   asking "is this defect real?" — not a warning in the prompt.
6. **Own the shared state centrally.** Agents return rows; the orchestrator assigns IDs. Never let a
   predicted identifier propagate as fact.
7. **Read what you already hold, first.** The program's dominant defect at every level was material
   already in hand going unread — four of four Phase 1 sufficiency failures, and then the corrections
   themselves. The highest-value finding of the remediation (a model family needing no
   population-fitted parameters) came from **re-reading a source already cited**, adding no citation
   at all.
8. **Route follow-up messages by dispatch order, not by ID prefix.** Parallel dispatches return
   visually similar identifiers.

---

## 6. Provenance

Derived from the session working ledger and dispatch briefs (`.wl/sdd/`, ephemeral, deliberately not
merged). The authoritative artifacts are the six dossiers, the verification records under
`verification/`, the two registers, `INTEGRITY-MANIFEST-pre.md` / `INTEGRITY-MANIFEST-post.md`, and
`P1-gate-summary.md`.
