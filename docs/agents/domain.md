# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the
codebase. **Layout: single-context** — one root glossary, one decision sink, no per-context split.

## Before exploring, read these

- **`CONTEXT.md`** at the repo root — the glossary. A glossary and nothing else, by its own
  statement: no design decisions, no implementation detail, no rationale. Terms land there the
  moment a naming collision is resolved.
- **`journal/docs-map.md`** — the authority map. It says, one line per doc surface, what that
  surface is authoritative for, and that if two docs disagree the one named there wins. Check it
  before treating any document as authoritative.
- **`journal/decisions.md`** — **this repo's ADR sink.** One terse entry per real decision — what
  was chosen and why — newest at the bottom. **There is no `docs/adr/`; do not create one.** A
  second decision sink would split the record this one exists to keep whole.
- **`docs/superpowers/specs/`** — approved designs, where current work lands. Each spec opens by
  stating what it decides *and what it does not*; read that section before assuming a spec owns a
  question.
- **`docs/superpowers/specs/assumption-register.md`** — every falsifiable belief the product runs
  on that evidence does not back, each with a named validation method. A design cites a row rather
  than restating the caveat.

If any of these don't exist, **proceed silently**. Don't flag their absence; don't suggest creating
them upfront. `/domain-modeling` creates them lazily when terms or decisions actually get resolved.

## Use the glossary's vocabulary

When your output names a domain concept (in an issue title, a refactor proposal, a hypothesis, a
test name), use the term as defined in `CONTEXT.md`. Don't drift to synonyms the glossary
explicitly retires.

If the concept you need isn't in the glossary yet, that's a signal — either you're inventing
language the project doesn't use (reconsider) or there's a real gap (note it for
`/domain-modeling`).

## Label every claim's evidence level

`AGENTS.md` requires this of every claim written into any document here, by anyone:
**Evidence-backed**, **Product judgement**, or **Assumption**. A product judgement is free to change
with a label. An **Assumption gets a row in `docs/superpowers/specs/assumption-register.md` with a
named validation method** — a caveat written in prose returns nobody to anything.

Two more rules from that section bear directly on how you read sources:

- **Never describe a source you did not open.** If you could not open it, say so.
- **Never let absence stand as proof.** Enumerate positively what you looked for and where. A check
  that can only fail when a record exists passes silently on a missing one.

## Flag decision conflicts

If your output contradicts an entry in `journal/decisions.md` or an approved spec, surface it
explicitly rather than silently overriding:

> _Contradicts the 2026-07-07 stack decision (Rust core / TypeScript shell) — but worth reopening
> because…_

Before republishing any authority document, run `scripts/check-doc-drift.sh`. It checks five pairs
of documents that have each already drifted apart once in silence.
