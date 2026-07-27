# For LDB-03 — start here

> A thin entry point over the LDB-02 archive. It replaces nothing: every claim below is traceable to
> a file in this directory, and those files hold far more than this page does. Read this to know
> where to look, not instead of looking.

## The one sentence that should change how you choose

**Do not pick activities by asking "is this multiple choice?" Pick by asking "does the question
change?"**

Swapping the input widget over the same stimulus buys close to nothing — identical items scored
73.3% vs 73.5% between a menu and free text, and written short answer tracks multiple-choice at
r = 0.81. Formats that change *what is being asked* diverge at r = 0.51. One source says it outright:
*"not the answer format itself, but the stimulus set by the question … influences the results."*

The catalog is a tool for making that cut. **`classification.md` has already made it for all 32
patterns.**

## What you are actually choosing from

Not 32 rows. The archive splits three ways:

| | Count | What it means for you |
|---|---|---|
| **Independent + Evidence-backed + substantive** | **6** | `U3-1`, `U3-3`, `U3-4`, `U3-5`, `U3-6`, `U3-8`. Lean on these without re-deriving them. |
| Substantive, weaker standing | 15 | Real format changes with support weaker than the six above. **Read the row's own label — do not assume vendor self-description:** `U1-5`, `U1-8` and `U1-9` are `Evidence-backed` and `independent`, discounted only because all three rest on one compilation. Citing "vendor self-description" as their adopt/reject reason would be a false reason. |
| Cosmetic | 9 | Widget changes over an unchanged question. Cheap to build, and the research says they buy little. |
| Conditional | 2 | `U1-7`, `U1-9` — each resolves by a design decision, not by more research. Determinants are in `classification.md`. |

**Evidence standing does not track the substantive/cosmetic axis.** The two best-evidenced rows in
the entire catalog — `U3-2` and `U3-7` — are both **cosmetic**. Do not use "well-sourced" as a proxy
for "worth building."

## Three constraints the research produced — these bind your design, not just your reading

**1. Do not use learner self-rating as a mastery signal.**
`U2-9` proposes exactly that widget, and `U3`'s own evidence contradicts it: 78% of learners
performed better under spaced practice, and 78% rated massed practice as good or better. **The
learner does not know what worked.** Mastery must be computed from recorded decision evidence, never
from a "how well did that go?" control.

**2. "No jeopardy" is an aspiration the source literature does not itself hold.**
The aviation guide this catalog draws on asserts no-jeopardy training in one chapter, denies the
concept exists in another, and ships a per-individual graded assessment form with a signature line.
What survives is narrower and still useful: **issue no pass/fail verdict in the debrief** — not
"grade nothing." See `run/U1/audit.md`, `U1-5`.

**3. Format change alone is not evidence of measurement change.**
`U1`'s own unit-level caveat says it plainly: *nothing in that unit evidences that changing the
format alone changes what a learner learns.* If a design's rationale is "this format measures X
better," that rationale needs its own support.

## One inconsistency to resolve before you inherit it

**`U2` rejected word-bank tile assembly. `U3` admitted Parsons-style fragment assembly.** These are
the same interaction — a supplied pool, one target arrangement. Each unit is defensible in isolation
and they contradict each other when read together.

Whichever way you rule, rule once and record it. Do not let the two tables sit next to each other in
a downstream document with the boundary drawn differently on each page.

## Where to start building

`buildability.md` tiers every substantive pattern against what this codebase already has. Its
recommendation, and mine:

**`U1-5` + `U1-6` in its binary form.** Suppress per-hand verdicts across a whole shoe, then return
a correct/not-correct review at the end. **⚠ Corrected 2026-07-27:** the *EV-graded* version of
`U1-6` is **not** a no-engine-change build — there is no EV machinery anywhere in `blackjack-core`
and the oracle returns an action, not a number. The binary version needs no engine change; they
compose into one mode, and
between them they exercise the product's stated differentiator — grade the decision, never the
outcome — more directly than anything else in the catalog. They also wire both known orphans: the
review needs the **strategy oracle** (built), the session record needs **`ProgressStore`** (built,
unwired).

The larger bet worth taking is **`U1-1`**, whole-policy range painting — the only pattern that tests
whether a learner holds a *policy* rather than memorised cells.

## Five ways to misread this archive

Listed in full in `classification.md`. The two that would bite hardest:

- **Quoting the p = 0.93 null as production-vs-multiple-choice evidence.** Its comparator is itself a
  production format. The load-bearing figure is r = 0.81. And the same source runs the *other* way on
  item discrimination — 0.32 write-in vs 0.18 select-from-list.
- **Classifying from the "candidate blackjack capability" column.** Three rows have a substantive
  analogue proposed over a cosmetic sourced pattern. That column is a suggestion, not a finding.

## What this archive does not establish

- **`U2` has no reachable independent source.** Its `Measures well` cells are product judgement
  throughout, correctly.
- **`U1`'s entire independent base is one document**, itself a compilation whose primaries this
  archive does not hold. Three of its nine patterns rest on it.
- **The confirmers' quoted evidence is filed at `run/U*/landing-evidence.md`** — 165 KB across eight
  passes, **recovered from session transcripts on 2026-07-27** after a process audit found the files
  had never been written during the pass. The words are the confirmers' own; the filing is post-hoc.
- **Provenance tokens are not comparable across units.** `independent` in U1 and U3 was never
  checked for compensation.

## Reading order

1. **This page** — the cut, the constraints, the six rows.
2. **`classification.md`** — every pattern classified, and the five misreadings.
3. **`buildability.md`** — tiers against this codebase. Product judgement, not research.
4. **`run/U*/audit.md`** — the evidence. **Verify anything you intend to build on, here.**
5. **`GATE.md`** and **`integrity/PROCESS-AUDIT.md`** — what was checked, and what was not.
