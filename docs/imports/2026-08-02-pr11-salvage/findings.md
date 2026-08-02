---
title: What PR #11 found that is worth keeping — two findings, re-verified on main
status: raw-research-input
created: 2026-08-02
source: PR #11, branch `claude/correct-work-rwm8me` @ `01c6974175fb328ea038656518f3b0830655e086`
author_context: findings extracted during the 2026-08-02 salvage; every claim below re-checked against the source
authority: non-authoritative
---

# Two findings salvaged from PR #11

PR #11 was closed rather than merged, and its code was **deliberately not landed** (see
`journal/decisions.md`, 2026-08-02). These two findings are the reason the branch was worth reading
anyway. Neither needs a line of code to survive.

**Every claim here was re-derived from the source on 2026-08-02.** Where the branch's own account
was wrong, the branch's account is quoted and corrected rather than silently fixed — that record is
itself the useful part.

---

## 1. A self-check that cannot fail on a missing value

**What the branch claimed.** `web/src/tuning/params.ts:12-17` states:

> "Prose can ship a constant with no value: LDB-06 §6 names 'a minimum rate of engineered tail
> events' and 'a floor on the losing-run length' and sets neither, and LDB-04 §2.2 — already
> approved — names F5's minimum series length and calibration bar and sets neither. Four registered
> constants with no number."

**What is actually true, checked against both specs.** The count is wrong: it is **two**, not four.

| Constant | Spec | Valued? |
|---|---|---|
| Minimum engineered tail events per session | LDB-06 §6 | **Yes — `1`** (`session-composition.md:202`) |
| `P4` losing-run floor | LDB-06 §6 | **Yes — `4` consecutive losing resolved hands** (`:205`) |
| F5 minimum series length | LDB-04 §2.2 | **No value stated** (`evidence-and-mastery-rules.md:169`) |
| F5 calibration bar | LDB-04 §2.2 | **No value stated** (`:169`) |

The two LDB-06 constants were unset and then **fixed during the 2026-07-30 session itself**, which
is why `params.ts` describes a state that no longer held by the time the branch was pushed.

**The finding worth keeping is not the count — it is the mechanism.** LDB-06 §6 says of its own
document, verbatim:

> "**Both numbers were absent from this document until 2026-07-30.** The section named two
> constants, defended them, and registered them without ever stating a value — and §8's self-check
> passed anyway, because it only checked that every number present had a register row, never that
> every registered constant had a number."

That is this project's **absence-as-proof** family, in a new location: a check whose only failure
mode requires the thing to be present. It is the same defect shape as the empty-directory gate and
the four gate checks named in `AGENTS.md`'s evidence discipline.

**Live input to LDB-04, not a decision.** Two of its own constants are named and unvalued in the
branch draft. Whatever LDB-04 rules on `main`, its self-check must run in both directions:
every number has a register row, **and** every registered constant has a number. Note that the
LDB-06 values `1` and `4` carry no evidence — that document calls them "proposals with no evidence
behind them, and they are the weakest content in this document."

---

## 2. The playtest-note mechanism has a precedent that already paid

**What the branch claimed.** `web/src/notes/types.ts:3-7` states that free play already has a
per-hand note that rides out on the round's JSONL line, and that "its first real use produced three
product findings in a sixteen-round session."

**Verified on `main`, first-hand.** `journal/ops/run-notes.md`, entry 2026-07-09, reads:

> "**Captured playtest feedback** (via the notes feature's first real use — 16-round session file):
> possible **split-legality gap** ('shouldnt 10♣ Q♣ be splitable?'), a **per-hand win/lose/push
> indicator** (asked twice), and an **insurance UI** request."

Three findings, one sixteen-round session. The claim holds exactly as stated.

**What the branch argued from it, which is the part worth carrying.** The existing mechanism has no
**anchor** — a note reading "this feels too long" cannot be interpreted later without knowing which
constants were live when it was written. The branch's proposal was to stamp each note with the
tuning-parameter version in force.

**Status: an argument for phase 5, not a phase-4 deliverable.** Phase 4 designs and builds nothing.
The reason it is recorded here is that the argument is only as good as the constants being
versioned at all — which is a question LDB-04 and LDB-06 decide first. If those cards land
thresholds, this becomes the instrument that makes them falsifiable; if they do not, it has nothing
to anchor to.

---

## What was deliberately NOT salvaged

- `web/src/tuning/` and `web/src/notes/` (the code) — 314 lines of constants citing LDB-04 and
  LDB-06 section numbers as approved. Landing them would adopt in code the decisions this repo has
  not made. See `journal/decisions.md`, 2026-08-02.
- Their UI consumers (`TuningPanel`, `NoteBar`, `NoteField`) and the `App`/`Learn`/`Lesson` wiring.
- The board and phase relocation to `journal/ops/`, and the `kanban.ts` / `check-doc-drift.sh`
  edits that follow from it — that relocation **is** the incident, now guarded by check 6 in
  `scripts/check-doc-drift.sh`.
- The deletion of `scripts/check-ldb03-taxonomy.js`, which `journal/phase.md` cites as live.
- `journal/qa/notes/README.md`, which documents an in-app export flow for a note bar that does not
  exist on `main`.

One item **was** salvaged into `main` rather than left here: the branch's QA-019, now in
`journal/qa/ledger.md`, re-verified and widened from the 1 instance the Phase 2 verdict names to
the 16 that exist.
