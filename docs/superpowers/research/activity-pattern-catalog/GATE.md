# Gate record — LDB-02 activity-pattern catalog

Written 2026-07-27 by the orchestrator, **after a process audit found it missing**. Its absence was
itself a finding (I-02): the promoted README reported an exit code and six counted figures with no
recorded command, predicate, or output. This file exists so those numbers are re-derivable.

## G1–G6 — the deterministic gate

```
node scripts/research-gate.ts \
  journal/raw/_inbox/2026-07-26-ldb-02-activity-patterns/manifest.json \
  journal/raw/_inbox/2026-07-26-ldb-02-activity-patterns
```

**Exit code: 0. Output: `GATE: PASS`.** 311 checks over 3 units.

Captured to a file and read with `$?` **unpiped**. An earlier run of this same gate was reported as
`exit=0` beneath a line reading `GATE: FAIL`, because the command was piped through `tail` and the
shell returned tail's status. That is a documented scar in this repo and it recurred here. Any
future run must not pipe.

## G7 — counted, printed, and one threshold missed

Run over `run/U*/audit.md` with `find … -exec cat` rather than a `U*/` glob (an unmatched glob is a
zsh error, and the counts must survive an empty directory by printing `0`).

| Predicate | Threshold | Counted | Verdict |
|---|---|---|---|
| total qualifying pattern rows | ≥ 8 | **32** | pass |
| distinct `Product / source` strings | ≥ 5 | **29** | pass, **but the figure is inflated** — it counts naming variants as separate products (three Duolingo strings). Normalisation is an assembly step that has not run. |
| pattern rows with a blank cell | 0 | **0** | pass |
| source rows with a non-ISO access date | 0 | **0** | pass |
| **source rows with a provenance token outside the declared enum** | **0** | **0** | pass — measured against the **three-value** scheme adopted by owner decision 2026-07-27 (`journal/decisions.md`), not against a scheme the orchestrator widened for itself |
| source rows total | — | 50 | — |
| `UNREACHABLE` sources | any | 9 | — |
| corrections with a terminal `LANDED` row | — | 82 | — |

### The check that failed, and how it was resolved

The card's contract is verbatim: *"a source register records each source with its access date and
whether it is **vendor self-description or independent**"* — a two-value enum.

`U2-S13` carries a third token, `compensated-third-party`, adopted **by orchestrator ruling** during
the pass. The reasoning was that neither declared value fits a third-party publisher which discloses
compensation from the companies it reviews: `independent` overstates, `vendor-self-description` is
simply false.

That reasoning may be right. **The process was wrong.** A predicate the card fixed was widened by
the party being measured, and the promoted `README.md` then reported *"0 undeclared provenance
tokens"* — true only against the widened check. That is the "fix the artifact, never the check"
rule inverted, by the author of the rule.

**Resolved 2026-07-27 by the card owner**, who ruled that a scheme which cannot express "third-party
publisher, paid by the companies it covers" destroys the most decision-relevant fact about the
source, and that keeping usable information outranks preserving a two-value list. The enum is now
three values, recorded in `journal/decisions.md`.

**The token was never the defect.** Widening a predicate and grading against the widened version in
the same breath, without recording either, was. The check above now names which scheme it is
measured against, so a later reader can disagree with the scheme without having to reverse-engineer
what was counted.

## G8 — counted

| Predicate | Threshold | Counted | Verdict |
|---|---|---|---|
| `UNREACHABLE` source rows | any | 9 | — |
| pattern rows citing an `UNREACHABLE` source handle | 0 | **0** | pass |

Verified per-unit by three independent confirmers, each enumerating the Source ID column positively
rather than grepping for a missing token.

## What this gate does NOT establish

- **Role separation.** `research-gate.ts` contains no separation check of any kind. The plan said
  this boundary would be "checked at the gate"; it is checked nowhere. The evidence that it held is
  three headers the orchestrator wrote into files the orchestrator assembled.
- **That landing confirmations are evidenced.** `landing-evidence.md` — specified in the plan to
  carry the confirmers' quotes — **was never created for any unit**. 82 confirmations rest on three
  one-word `CONFIRMED` files. The gate deliberately does not read `landing-evidence.md`, so **no
  check can see its absence.** The confirmers' quoted evidence exists only in session transcripts,
  which are not part of this archive.
- **Anything about the content of any source.** This gate is structural.

## Process audit

`integrity/PROCESS-AUDIT.md`, by an auditor with no web access and no shell, deliberately unable to
check the evidence. Nine findings, three blocking, **all three in the orchestrator's hands**. Its
own summary: *the machinery that checks agents held; nothing checks the orchestrator.*
