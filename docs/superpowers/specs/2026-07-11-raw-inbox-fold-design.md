# Raw Inbox Fold-In

## Status

Approved processing design. This pass folds durable material from `journal/raw/_inbox/` into
existing authoritative documentation, records meaningful rejected or superseded claims, and moves
the original sources into a tracked import archive. It changes documentation only.

## Outcome

Clear the raw inbox without losing source provenance or creating another competing source of truth.
Useful, current material moves into the document that already owns that subject. Original inputs
remain readable in a tracked archive, with an index that explains what was accepted, already
covered, rejected, or deferred.

The accepted V2 scope and phase ordering remain intact. `ROADMAP.md` may receive small
clarifications, but this pass does not reopen the V2 roadmap or add future task detail to the active
phase.

## Source Inventory

The pass covers every current inbox item:

- seven `v2-research-*` notes covering rulesets, pedagogy, source audit, content/data,
  architecture, UX, and QA;
- `v2-codebase-continuation-handoff.md`;
- `history-data-analysis-2026-07-09.md`;
- `files.zip` and its five Markdown members: `how-to-teach.md`, `unit-1-basics.md`,
  `unit-2-basic-strategy.md`, `rules-spec.md`, and `roadmap.md`.

## Destination Ownership

### Product vision

`docs/specs/product-vision.md` owns two durable product principles from the research:

- judge and teach decision quality independently from hand outcome; and
- keep responsible training framing visible rather than treating it as a disclaimer.

### Learning, mastery, and scoring

`docs/specs/learning-mastery-and-scoring.md` owns the reusable learning model:

- the progression from game and rule literacy through chart literacy, recall, transfer, and later
  automaticity;
- the pair, then soft, then hard hand-classification order used before a table lookup;
- the exercise ladder from recognition and guided lookup through hidden-table, full-hand,
  interleaved, and eventually timed practice;
- misconception-based feedback and evidence, without treating one wrong tap as a stable belief;
- spacing, interleaving, assistance context, and provisional mastery stages; and
- immediate versus delayed feedback as a training choice rather than one global policy.

This file remains directional. The fold does not invent mastery thresholds, persistence, or a
generic curriculum schema.

### Research brief

`docs/specs/research-brief.md` owns research policy and still-open future questions:

- strategy artifacts must state their exact ruleset, source provenance, and independent check;
- future rule-variation work must distinguish rules that affect legality, settlement, strategy,
  and operational table conditions;
- future counting research must distinguish shoe-true card order from cards visible to the player
  at each decision; and
- the obsolete open question about encoding the first chart is closed because the verified H17
  Rust oracle now exists.

### Architecture

`docs/architecture.md` receives only the durable state boundary:

- game state belongs to the engine;
- learning state belongs to the lesson/controller layer; and
- transient presentation state belongs to React.

The engine remains authoritative for legality and the strategy oracle. The learning layer may
evaluate and sequence decisions but may not recreate rules. Registry designs, fingerprints,
cross-language schemas, persistence, and a generic learning platform are not adopted by this pass.

### QA process

`docs/specs/qa-playtest-process.md` owns durable learning-integrity expectations:

- correct losing decisions remain correct and lucky wrong decisions remain wrong;
- advice must match the active ruleset oracle and always be legal;
- assistance and table visibility are observable when a feature uses them; and
- learner comprehension is judged separately from mathematical and flow correctness.

Exact Strategy Table Fundamentals scenarios and scripts belong in that feature's later design and
QA scope, not in this fold-in.

### Roadmap and manifest

`ROADMAP.md` may clarify that strategy feedback is independent from outcome and that rule-variation
literacy is later work. It must not add new V2 milestones, mastery systems, or implementation tasks.

`journal/docs-map.md` registers the tracked V2 research archive as an indexed import surface. The
archive does not become authoritative over the destination documents.

## Archive Shape

Create:

```text
docs/imports/v2-research-2026-07-11/
  INDEX.md
  research/
  course-bundle/
  history/
```

- `research/` contains the seven V2 research notes and the continuation handoff.
- `course-bundle/` contains the original ZIP plus its five extracted Markdown files so future
  readers do not need to unpack the archive.
- `history/` contains the history-data analysis.
- `INDEX.md` maps every source to accepted destinations, already-covered work, meaningful
  rejections, and deferred owners.

Original Markdown and ZIP inputs move without content edits. The index, not annotations inserted
into source files, records their processed status.

## Rejected And Superseded Claims

The archive index records these material conflicts without attempting a claim-by-claim audit:

- The course bundle's 6-deck S17 baseline, S17 strategy table, resplit-ace assumptions, and exact
  numerical claims are not promoted. The locked 6-deck H17 ruleset and verified H17 oracle are the
  current authority.
- A `source of truth` label inside an imported file does not override `journal/docs-map.md`.
- Teaching dealer bust rates before chart navigation remains an input to the active lesson design,
  not an accepted sequence decision.
- Ruleset registries and fingerprints, a second S17 profile, learning-event schemas, durable
  persistence, and generalized content infrastructure remain deferred until a concrete consumer
  justifies them.
- The continuation handoff's pre-oracle and pre-guided-drill inspection tasks are obsolete.
- The history analysis's JSONL capture recommendations are largely implemented. Its remaining
  player-visible count semantics stay as future counting research.
- XP, leaderboards, timed mastery, card counting, deviations, and advantage-play curriculum remain
  outside V2.

The index should distinguish `rejected` from `deferred`: rejected claims conflict with verified
current truth or product constraints; deferred ideas may be reconsidered in a future scoped cycle.

## Processing Flow

1. Create the archive directories and move each original input to its archive destination.
2. Validate the ZIP and extract its five Markdown members into `course-bundle/`.
3. Verify each extracted member matches the corresponding member stored in the ZIP.
4. Update the destination documents with concise additions that do not duplicate their existing
   text.
5. Write `INDEX.md` with one row per source, its disposition, destinations, and any short warning.
6. Confirm `journal/raw/_inbox/` has no remaining files.
7. Review the complete diff and commit the processing pass separately from this design commit.

If an archive move or ZIP extraction cannot be verified, stop before removing the corresponding
inbox input. No source is discarded merely because Git history contains an earlier version.

## Verification

- The ZIP passes an integrity test.
- Its five extracted Markdown files byte-match their ZIP members.
- Every source appears in `INDEX.md` exactly once, with a disposition and destination or reason.
- Every new Markdown link and docs-map target resolves.
- `journal/raw/_inbox/` is empty after processing.
- No unresolved placeholder remains in the new index or edited owned docs.
- Current authoritative docs do not present the imported S17 table or ruleset as the product
  baseline.
- The Git diff contains only the archive, index, mapped documentation updates, and inbox moves.

## Non-Goals

- Production code, schemas, tests, or runtime behavior.
- A new strategy profile, ruleset registry, event store, persistence layer, or content platform.
- Replacing the current Strategy Table Fundamentals design cycle.
- Re-verifying every external numerical or blackjack claim in the imported sources.
- Expanding V2 into mastery, timed play, card counting, or advantage play.
