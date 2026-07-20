# `research-plan` Skill — Design

> Design for a phase-neutral research-planning skill and its four-role agent set.
> Status: **DRAFT — awaiting approval.** Consumed by
> `docs/superpowers/plans/2026-07-20-research-plan-skill.md`.

## Problem

`writing-plans` is code-shaped. It optimizes against the failure mode of a *code* plan — ambiguity,
where an implementer cannot act because a step is underspecified. Research plans fail differently:
they fail by **unclosed loops**. A finding is recorded and never lands. A claim is verified and the
correction never reaches the artifact. A gate certifies a directory nobody wrote to.

Both the Phase 1 and Phase 2 audit plans independently invented the same missing structure —
scaffold → parallel dispatch → *separate* verify pass → gate — with no skill to inherit it from.
That retrofit cost has now been paid twice.

### Admission evidence

Per `AGENTS.md` ("No new protocol or process gate without evidence — a documented failure or a
measured retrofit cost; never 'just in case'"):

1. **Retrofit cost paid twice, independently** — the Phase 1 and Phase 2 plans each hand-rolled the
   same five primitives.
2. **A documented failure** — Phase 1's verifier corrections were never written into any of the six
   dossiers. No landing step existed and no check for it
   (`journal/memory/audit-corrections-never-landed.md`).
3. **A second documented failure** — the Phase 2 plan's own gate check, the check that exists to
   prevent defect (2), **passed on an empty directory** and self-matched on its own verdict legend.
   Broken in both directions (`journal/memory/guard-that-cannot-fail.md`).

## The core finding: the agents already specify a loop

The three existing role definitions are not three independent agents. Read as a set, they are a
**state machine whose transitions are written into their own text**:

| Source | Transition it specifies |
|---|---|
| `audit-verifier.md` | Must return a sufficiency verdict **and route the remedy**: "whether it needs collection at all, or whether the material is already inside a cited source and needs only editorial correction. These are different remedies." |
| `audit-verifier.md` | Has **no `Edit`** — "it judges, it never repairs." A correction it finds *must* hand off. |
| `audit-editor.md` | "Corrections must land **in the dossier itself**, not only in a verifier note. A defect recorded only in a verification record is still a defect in the dossier." |
| `audit-editor.md` | Cannot escalate: "Escalating to collection is the orchestrator's decision, not yours." |
| `audit-verifier.md` | "Do not append to the shared registers... the orchestrator assigns IDs and reconciles them centrally." A hard constraint on parallel dispatch. |

Phase 1's central defect is **exactly the missing edge in that machine**, and `audit-editor.md`
already names the rule that was violated. The intended usage is therefore *readable*, not
inventable — which is why this design did not require a brainstorm.

**This reframes the skill's job.** It is not "add five primitives to `writing-plans`." It is: make a
research plan structurally incapable of dispatching these roles without closing the loop they
already assume. The five primitives fall out as consequences.

## The loop, stated once

```
  produce ──▶ verify ──▶ SUFFICIENT ─────────────────────────▶ gate
  (collector    (verifier,     │
   or auditor)   fresh          └─ INSUFFICIENT + remedy route
                 instance)            │
                                      ├─ missing evidence ──▶ collector (new pass)
                                      └─ held but mishandled ─▶ editor  ──▶ LAND
                                                                            │
                                                              second verifier
                                                              confirms landing
                                                                            │
                                                                            ▼
                                                                          gate
```

Four invariants the skill enforces on any plan it writes:

- **I1 — No verdict without a landing.** Every raised correction has a task that writes it into the
  artifact, and a *separate* task that confirms it landed.
- **I2 — No self-verification.** No agent instance both produces and verifies the same unit; no
  instance both raises and lands its own correction.
- **I3 — Remedy is routed, not assumed.** The verifier names `collection` or `editorial`; the plan
  has a distinct task shape for each.
- **I4 — Shared state is orchestrator-owned.** Agents return rows; the orchestrator assigns IDs.

## The five primitives

Inherited from the retrofit analysis; each is a section the skill mandates and `writing-plans` has
no concept of.

| # | Primitive | Why `writing-plans` cannot supply it |
|---|---|---|
| P1 | **Role separation as a first-class constraint** | Code plans have one implementer role. |
| P2 | **Evidence/citation contract per unit** | Code plans verify by test, not by source retrieval. |
| P3 | **Verification pass by a *different* agent** | Code plans verify by running the code; identity of the runner is irrelevant. |
| P4 | **Landing step + landed-check** | A code fix *is* the landing; a research correction is not. |
| P5 | **Gate criteria with falsifiable procedures** | Code gates are test suites; research gates are prose unless forced otherwise. |

## Decisions

### D1 — Compose, do not fork

The skill inherits `writing-plans`' discipline by **reference**, not by copy: no placeholders,
Files/Interfaces, task right-sizing, self-review, the plan header. It adds only P1–P5. A parallel
full-size skill that drifts from its sibling is precisely the over-foundation this project names as
its top risk.

### D2 — Containment: static allowlist root

*Ruled by user, 2026-07-20.*

Today every role def hardcodes `journal/raw/_inbox/foundation-audit-p1/`. That is phase-coupled, and
it is what forced a sed-and-restart step into the Phase 2 plan.

The fix is **not** to move the path into the dispatch prompt. This repo already holds the lesson
that instruction does not constrain agents (`journal/memory/agent-capability-over-instruction.md` —
an agent pushed to a public remote despite an explicit read-only brief). Converting a structural
boundary into a prompt-supplied value reintroduces exactly that failure.

Instead: **the permanent root `journal/raw/_inbox/` stays hardcoded in every def; the dispatch
supplies only a subdirectory name beneath it.** The def reads:

> You may write **only** inside `journal/raw/_inbox/<run-dir>/`, where `<run-dir>` is the single
> directory name given in your dispatch. `<run-dir>` is a bare name — it contains no `/` and no
> `..`. If your dispatch supplies anything else, stop and report a `Blocker`.

This keeps the boundary structural (an agent can never be pointed outside the inbox tree) while
making the role phase-neutral. It does not become a *tool-enforced* boundary — no tool grant
expresses path scoping — and the plan must not describe it as one. It remains checked at the gate.

### D3 — The auditor is a program-integrity role

*Ruled by user, 2026-07-20.*

`audit-auditor` is the one role with no existing definition. It audits **the process, not the
evidence**: did corrections actually land, were role boundaries kept in separate hands, did gate
checks enumerate positively rather than test for absence. This is what Phase 1's one-off
program-integrity audit did, and it is the role that would have caught the corrections-never-landed
defect.

It is deliberately **not** the gate adjudicator. Merging "check the process" with "judge the
outcome" into one pair of hands defeats the separation the other three defs are built around.

Its capability boundary follows from that: it reads artifacts and process records and writes an
integrity record. It has **no `Edit`** (it never repairs) and **no `WebSearch`/`WebFetch`** (it does
not touch sources at all — it is not checking evidence). Tools: `Read`, `Write`, `Glob`, `Grep`.

### D4 — War stories stay, as named provenance

The role defs carry specific Phase 1 evidence (73 citations, "four of four sufficiency failures",
the fixed-effect `g=.05` catch, the corrigendum appended to an already-read PDF). Genericizing these
would gut the rules' force.

They stay, marked as provenance rather than as scope. A rule carrying its documented failure is this
repo's own admission standard — stripping the failure would leave a rule that could not be admitted
under `AGENTS.md`.

### D5 — Skill global, agent defs in-repo

The skill is White Lotus framework tooling and lives at `~/.claude/skills/research-plan/SKILL.md`,
alongside its sibling `writing-plans`.

The four role defs stay in-repo at `.claude/agents/`. The blackjack audit is their only consumer
today; they are tracked and reviewable in git there; and the phase-neutrality win of D2 is about
decoupling from a *phase*, not about cross-project reuse. Promoting them to `~/.claude/agents/`
is a later move that needs a second consumer as its evidence.

The skill therefore **documents the role contract** and requires the consuming plan to verify the
four defs are present before dispatch (see D6).

### D6 — Registry timing is a plan-level precondition

Claude Code reads its agent registry at session start
(`journal/memory/agent-registry-loads-at-session-start.md`). Phase 1 lost this exact bet.

Any plan the skill writes must therefore open with a task that (a) creates or edits every role def
it will dispatch, (b) runs the role lint, and (c) **ends the session**. Dispatch begins in a fresh
session. The skill states this as a hard ordering constraint, not advice.

### D7 — Gate checks are positive enumerations, fixture-tested

The mandated form: **enumerate what must exist and check each one**; never grep for the absence of a
failure token. A missing directory must fail, not pass.

Every gate check ships with four fixtures and must demonstrate the correct verdict on each:

| Fixture | Required verdict |
|---|---|
| `empty/` — no artifacts at all | **FAIL** (this is the defect that shipped twice) |
| `clean/` — all artifacts present, all resolved | **PASS** |
| `violating/` — artifacts present, one unresolved correction | **FAIL** |
| `retry/` — a superseded NOT-LANDED row plus a later LANDED row | **PASS** (must not deadlock) |

The `retry/` fixture exists because a design-time judge caught the Phase 2 gate deadlocking
permanently: verifiers never edit, so a superseded NOT-LANDED row survives forever.

## Deliverables

| Artifact | Responsibility |
|---|---|
| `~/.claude/skills/research-plan/SKILL.md` | The skill. P1–P5, I1–I4, the loop, the role contract, D6's ordering constraint. |
| `.claude/agents/audit-collector.md` | Collector, phase-neutral per D2. |
| `.claude/agents/audit-editor.md` | Editor, phase-neutral per D2. |
| `.claude/agents/audit-verifier.md` | Verifier, phase-neutral per D2. |
| `.claude/agents/audit-auditor.md` | **New.** Program-integrity auditor per D3. |
| `scripts/research-roles-lint.ts` | Validates all four defs against the role contract. The landed-check for the defs themselves. |
| `scripts/research-gate.ts` | Reference positive-enumeration gate check per D7. Takes an expected-artifact manifest + a run directory. |

## Non-scope

- **Phase 2 does not execute here.** This ships the skill and roles only.
- **No re-expression of the Phase 2 plan.** That is the next piece of work, and it is what will
  prove the skill earns its keep.
- **No fifth role.** Four are justified by Phase 1/2 evidence. A fifth needs a documented failure.
- **No product code changes.** Markdown and two scripts.
- **No promotion of role defs to global** (see D5).

## Open question for the user

**Q1 — Do the role defs keep the `audit-` name prefix?** They are becoming phase-neutral but remain
audit-domain roles, and renaming them to `research-*` would churn every reference in the Phase 1 and
Phase 2 plans for no functional gain. Recommendation: **keep `audit-*`**; the prefix names the
domain, and D2 already removed the coupling that mattered (the path).
