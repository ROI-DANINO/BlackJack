# V2 Research Import Index

> Processed 2026-07-11. The tracked files preserve research provenance; they are not current
> sources of truth. One source is local-only and explicitly marked as unavailable in Git clones.
> Follow the destinations below and `journal/docs-map.md` for authoritative decisions.

## Disposition Labels

- **Accepted** — durable material was folded into an owned document.
- **Covered** — the repository already implemented or documented the useful material.
- **Rejected** — the claim conflicts with verified current behavior or accepted product scope.
- **Deferred** — potentially useful, but requires a future scoped research/design cycle.
- **Archived** — a provenance container retained without assigning one disposition to all members.

## Source Map

| Source | Disposition | Folded destination or interpretation |
|--------|-------------|--------------------------------------|
| `research/v2-research-01-ruleset-model.md` | Accepted + Deferred | Ruleset-sensitive provenance and future rule taxonomy fold into `docs/specs/research-brief.md`; registries, fingerprints, and a second profile remain deferred. |
| `research/v2-research-02-curriculum-and-pedagogy.md` | Accepted | Learning hierarchy, lookup sequence, exercise ladder, evidence, spacing, and feedback timing fold into `docs/specs/learning-mastery-and-scoring.md`. |
| `research/v2-research-03-course-and-source-audit.md` | Accepted + Rejected | Provenance discipline folds into `docs/specs/research-brief.md`; its warning about the imported S17 material is resolved by the verified H17 oracle. |
| `research/v2-research-04-content-and-data-architecture.md` | Deferred | Stable IDs, schemas, event models, and content directories wait for a concrete consumer; no generic course platform is introduced. |
| `research/v2-research-05-software-architecture.md` | Accepted + Deferred | Game/learning/presentation state ownership folds into `docs/architecture.md`; registries, contract expansion, event persistence, and a second profile remain deferred. |
| `research/v2-research-06-ux-foundations.md` | Accepted + Deferred | Decision-versus-outcome and responsible framing fold into `docs/specs/product-vision.md`; detailed UI states and visual work wait for their feature cycles. |
| `research/v2-research-07-validation-and-qa-strategy.md` | Accepted + Deferred | Learning-integrity expectations fold into `docs/specs/qa-playtest-process.md`; feature scenarios and new scripts wait for Strategy Table Fundamentals. |
| `research/v2-codebase-continuation-handoff.md` | Covered | The H17 oracle and first guided drill are shipped and feature-QA closed; its pre-implementation inspection tasks are obsolete. |
| `_inbox/history-data-analysis-2026-07-09.md` | Covered + Deferred (local-only) | Original is gitignored and unavailable in Git clones; it remains in `journal/raw/_inbox/` on the owner's workspace. Local JSONL history is implemented; player-visible versus shoe-true count semantics fold into `docs/specs/research-brief.md` for future counting research. |
| `course-bundle/files.zip` | Archived | Original transport bundle retained for provenance; its readable members are indexed separately below. |
| `course-bundle/how-to-teach.md` | Accepted + Rejected | Decision-versus-outcome, practice progression, misconception feedback, and spacing are folded; XP/leaderboards and dealer-bust-first sequencing are not accepted V2 decisions. |
| `course-bundle/unit-1-basics.md` | Covered + Rejected | Foundations concepts are covered by the shipped guided drill; S17 and resplit-ace assumptions do not match the locked H17 baseline. |
| `course-bundle/unit-2-basic-strategy.md` | Rejected + Deferred | The S17 chart and numerical claims are not authoritative; chart-navigation pedagogy remains input to the active Strategy Table Fundamentals design. |
| `course-bundle/rules-spec.md` | Rejected | Its S17 baseline, resplit-ace setting, and claimed house edge conflict with the locked ruleset and verified H17 oracle. |
| `course-bundle/roadmap.md` | Rejected + Deferred | It does not replace `ROADMAP.md`; timed mastery, card counting, deviations, advantage play, XP, and leaderboards remain outside V2. |

## Material Conflicts

- The current authority is the 6-deck H17, DAS, no-surrender, peek, 3:2 ruleset and its verified
  Rust-owned oracle. No S17 chart or exact numerical claim in this import is promoted.
- A source's internal `source of truth` label does not override `journal/docs-map.md`.
- Teaching dealer bust rates before chart navigation remains a design input, not an accepted lesson
  order.
- `Rejected` means incompatible with current verified truth or scope. `Deferred` means a future
  scoped cycle may reconsider the idea when it has a concrete consumer.
