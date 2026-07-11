# Raw Inbox Fold-In Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fold every current raw-inbox source into its authoritative documentation owner, preserve the originals in a tracked indexed archive, and leave `journal/raw/_inbox/` empty.

**Architecture:** Use a destination-led documentation pass. Existing owned docs receive only durable, current conclusions; the import archive retains original source context and an index records accepted, covered, rejected, and deferred material without becoming a new authority.

**Tech Stack:** Markdown, Git, POSIX shell utilities, `unzip`, `cmp`, `rg`.

## Global Constraints

- Documentation-only: do not change production code, schemas, tests, or runtime behavior.
- Preserve the accepted V2 scope and phase ordering; allow only small `ROADMAP.md` clarifications.
- Preserve original Markdown and ZIP inputs without content edits.
- The locked baseline remains 6-deck H17, DAS, no surrender, dealer peek, 3:2 blackjack, and 75% penetration.
- The verified Rust Basic Strategy oracle remains authoritative; do not promote the imported S17 chart or numerical claims.
- Distinguish rejected claims from deferred ideas in the archive index.
- Keep future task detail out of `journal/ops/tasks.md`.
- Do not add persistence, registries, fingerprints, event schemas, a second strategy profile, or generic learning infrastructure.
- Each documentation commit must pass `git diff --check` before commit.

---

## File Structure

### New archive

- `docs/imports/v2-research-2026-07-11/INDEX.md` — disposition and destination ledger for every imported source.
- `docs/imports/v2-research-2026-07-11/research/` — seven V2 research notes and the continuation handoff, moved unchanged.
- `docs/imports/v2-research-2026-07-11/course-bundle/files.zip` — original source bundle, moved unchanged.
- `docs/imports/v2-research-2026-07-11/course-bundle/{how-to-teach,unit-1-basics,unit-2-basic-strategy,rules-spec,roadmap}.md` — readable byte-matched ZIP members.
- `docs/imports/v2-research-2026-07-11/history/history-data-analysis-2026-07-09.md` — history analysis, moved unchanged.

### Existing owners

- `docs/specs/product-vision.md` — decision-versus-outcome and responsible-training principles.
- `docs/specs/learning-mastery-and-scoring.md` — learning hierarchy, lookup sequence, exercise ladder, evidence, spacing, and feedback timing.
- `ROADMAP.md` — two narrow wording clarifications only.
- `docs/specs/research-brief.md` — provenance policy and future rules/count research questions.
- `docs/architecture.md` — game, learning, and presentation state ownership.
- `docs/specs/qa-playtest-process.md` — learning-integrity contract for feature QA.
- `journal/docs-map.md` — tracked import archive registration.

---

### Task 1: Archive And Index Every Inbox Source

**Files:**
- Create: `docs/imports/v2-research-2026-07-11/INDEX.md`
- Create by move: `docs/imports/v2-research-2026-07-11/research/*.md`
- Create by move: `docs/imports/v2-research-2026-07-11/course-bundle/files.zip`
- Create by extraction: `docs/imports/v2-research-2026-07-11/course-bundle/*.md`
- Create by move: `docs/imports/v2-research-2026-07-11/history/history-data-analysis-2026-07-09.md`
- Remove by move: all files under `journal/raw/_inbox/`

**Interfaces:**
- Consumes: the ten current inbox files and the five Markdown members stored in `files.zip`.
- Produces: a readable tracked archive and one index row per imported source for later documentation tasks.

- [ ] **Step 1: Verify the source inventory and ZIP before moving anything**

Run:

```bash
test "$(find journal/raw/_inbox -maxdepth 1 -type f | wc -l)" -eq 10
unzip -t journal/raw/_inbox/files.zip
unzip -Z1 journal/raw/_inbox/files.zip
```

Expected: the file count is 10; `unzip -t` ends with `No errors detected`; the ZIP lists exactly
`how-to-teach.md`, `unit-1-basics.md`, `unit-2-basic-strategy.md`, `rules-spec.md`, and
`roadmap.md`.

- [ ] **Step 2: Create the archive and move original inputs unchanged**

Run:

```bash
mkdir -p docs/imports/v2-research-2026-07-11/research
mkdir -p docs/imports/v2-research-2026-07-11/course-bundle
mkdir -p docs/imports/v2-research-2026-07-11/history
git mv journal/raw/_inbox/v2-research-*.md docs/imports/v2-research-2026-07-11/research/
git mv journal/raw/_inbox/v2-codebase-continuation-handoff.md docs/imports/v2-research-2026-07-11/research/
git mv journal/raw/_inbox/history-data-analysis-2026-07-09.md docs/imports/v2-research-2026-07-11/history/
git mv journal/raw/_inbox/files.zip docs/imports/v2-research-2026-07-11/course-bundle/files.zip
unzip -j docs/imports/v2-research-2026-07-11/course-bundle/files.zip '*.md' -d docs/imports/v2-research-2026-07-11/course-bundle/
```

Expected: Git records the nine Markdown inputs and ZIP as moves; `unzip` creates five readable
Markdown files beside the ZIP.

- [ ] **Step 3: Verify every extracted member byte-for-byte**

Run:

```bash
for member in how-to-teach.md unit-1-basics.md unit-2-basic-strategy.md rules-spec.md roadmap.md; do
  unzip -p docs/imports/v2-research-2026-07-11/course-bundle/files.zip "$member" |
    cmp - "docs/imports/v2-research-2026-07-11/course-bundle/$member"
done
```

Expected: exit 0 with no output.

- [ ] **Step 4: Create the disposition index**

Create `docs/imports/v2-research-2026-07-11/INDEX.md` with exactly this content:

```markdown
# V2 Research Import Index

> Processed 2026-07-11. These files preserve research provenance; they are not current sources of
> truth. Follow the destination links below and `journal/docs-map.md` for authoritative decisions.

## Disposition Labels

- **Accepted** — durable material was folded into an owned document.
- **Covered** — the repository already implemented or documented the useful material.
- **Rejected** — the claim conflicts with verified current behavior or accepted product scope.
- **Deferred** — potentially useful, but requires a future scoped research/design cycle.

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
| `history/history-data-analysis-2026-07-09.md` | Covered + Deferred | Local JSONL history is implemented; player-visible versus shoe-true count semantics fold into `docs/specs/research-brief.md` for future counting research. |
| `course-bundle/files.zip` | Rejected + Archived | Original transport bundle retained for provenance; its readable members are indexed separately below. |
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
```

- [ ] **Step 5: Verify archive completeness and inbox clearance**

Run:

```bash
test -z "$(find journal/raw/_inbox -mindepth 1 -print -quit)"
test "$(find docs/imports/v2-research-2026-07-11/research -maxdepth 1 -type f | wc -l)" -eq 8
test "$(find docs/imports/v2-research-2026-07-11/course-bundle -maxdepth 1 -type f | wc -l)" -eq 6
test "$(find docs/imports/v2-research-2026-07-11/history -maxdepth 1 -type f | wc -l)" -eq 1
test "$(rg -c '^\| `(?:research|history|course-bundle)/' docs/imports/v2-research-2026-07-11/INDEX.md)" -eq 15
git diff --check
git status --short
```

Expected: all `test` commands exit 0; the index has 15 source rows; Git shows only archive moves,
five extracted Markdown additions, and `INDEX.md`.

- [ ] **Step 6: Commit the tracked archive**

Run:

```bash
git add -A journal/raw/_inbox docs/imports/v2-research-2026-07-11
git commit -m "docs: archive processed V2 research inputs"
```

Expected: one commit containing the archive/index and removal-by-move of every inbox source.

---

### Task 2: Fold Product And Learning Principles

**Files:**
- Modify: `docs/specs/product-vision.md:51`
- Modify: `docs/specs/learning-mastery-and-scoring.md:17`
- Modify: `ROADMAP.md:29`

**Interfaces:**
- Consumes: accepted pedagogy and responsible-design dispositions from Task 1's index.
- Produces: authoritative product and learning guidance used by the active Strategy Table Fundamentals design cycle.

- [ ] **Step 1: Add decision-quality and responsible-training principles to product vision**

Insert after the opening two paragraphs of `## Educational Philosophy` in
`docs/specs/product-vision.md`:

```markdown
Feedback judges the quality of a decision against the active ruleset-matched strategy, never the
hand result. A correct decision can lose and a poor decision can win; the product must show those
as separate facts so it teaches skill rather than superstition.

Motivation should reward practice, comprehension, and improving decision quality. It must not
celebrate money won, encourage loss chasing, imply guaranteed profit, or punish a learner for
ending a session.
```

- [ ] **Step 2: Add the reusable learning progression and table lookup sequence**

Insert after the final `## First Learning Path` paragraph (`Do not lock the entire long-term
mastery ladder yet.`) in `docs/specs/learning-mastery-and-scoring.md`:

```markdown
## Learning Target Progression

Build skills in this order:

1. Game literacy: understand totals, actions, dealer information, and outcomes.
2. Rule literacy: recognize the active table and its legal options.
3. Chart literacy: classify the hand and navigate the matching table.
4. Decision recall: choose the recommendation with progressively less support.
5. Procedural transfer: apply decisions through full evolving hands.
6. Ruleset transfer: notice when a changed rule changes the answer.
7. Automaticity: answer accurately at realistic pace only after accuracy is stable.

V2 concentrates on the first four stages and table-open transfer. Ruleset transfer, no-table
assessment, and timed automaticity remain later work.
```

Insert after the final `## Basic Strategy Categories` paragraph (`Do not wait until the end to
combine everything.`):

```markdown
## Classification And Table Navigation

For every lookup, identify the dealer upcard and classify the player's hand in this order:

1. pair;
2. soft total;
3. hard total.

Then find the matching player row and dealer column. Teach fallback notation only when the learner
understands that the engine's legal actions remain authoritative. Classification and row/column
navigation should be measurable separately from choosing the recommended action.
```

- [ ] **Step 3: Add the exercise ladder, evidence model, and spacing policy**

Insert after the final `## Drill Generation Principle` paragraph (`This allows targeted practice
without making the game feel fake.`) in `docs/specs/learning-mastery-and-scoring.md`:

```markdown
## Exercise Ladder

Reuse concepts across progressively harder formats:

1. recognition;
2. guided classification;
3. table-open decision;
4. table-hidden decision;
5. full evolving hand;
6. interleaved review;
7. timed practice after accuracy is stable.

Do not duplicate the same lesson as several prose variants. The exercise format changes while the
ruleset-matched strategy truth remains shared.

## Learning Evidence

Record decision quality independently from hand outcome. When a feature needs diagnosis, distinguish
at least hand-classification, dealer-column, illegal-action, strategy-recall, fallback-rule, and
outcome-bias errors. Assistance level and table visibility are part of the evidence.

One wrong tap is not enough to label a misconception. Infer a stable weakness only from repeated
evidence or an explicit reasoning prompt. Keep raw attempts available to the session controller;
derive summaries later when progression has a concrete need.

## Spacing And Interleaving

Repeat weak items sooner without trapping the learner in immediate repetition. Mix older and newer
concepts, then interleave hard, soft, and pair decisions so the learner must classify before acting.
Mastery evidence should eventually span more than one session; thresholds remain provisional until
observed practice data supports them.
```

Insert after the three help-mode subsections and before `## Hint System`:

```markdown
Immediate and delayed feedback are training configurations, not one global product mode. Use
immediate correction for new concepts and delayed review for transfer or assessment. Both modes
must preserve the decision state being evaluated and keep the decision verdict separate from the
resolved hand outcome.
```

- [ ] **Step 4: Make the two narrow roadmap clarifications**

Change the V2 exit criterion in `ROADMAP.md` to:

```markdown
- [ ] Learning foundations — exit criteria: a new player can learn the current table's legal
  actions, navigate the matching Basic Strategy table, and use it in guided practice with
  immediate or delayed feedback that keeps decision quality separate from hand outcome.
```

Replace the Later bullet `Table rules variations.` with:

```markdown
- Table-rule literacy and ruleset-matched strategy deltas.
```

- [ ] **Step 5: Verify scope and wording**

Run:

```bash
rg -n "decision quality|Learning Target Progression|Classification And Table Navigation|Exercise Ladder|Learning Evidence|Spacing And Interleaving|Table-rule literacy" ROADMAP.md docs/specs/product-vision.md docs/specs/learning-mastery-and-scoring.md
rg -n "6deck_S17|0\.44%|leaderboard|event schema|ruleset fingerprint" ROADMAP.md docs/specs/product-vision.md docs/specs/learning-mastery-and-scoring.md
git diff --check
git diff -- ROADMAP.md docs/specs/product-vision.md docs/specs/learning-mastery-and-scoring.md
```

Expected: the first command finds every new section; the second command finds no newly introduced
S17/numerical/architecture claims (the existing `leaderboards` roadmap non-goal/later item may still
appear); diff review shows only the exact approved additions and two roadmap wording changes.

- [ ] **Step 6: Commit product and learning synthesis**

Run:

```bash
git add ROADMAP.md docs/specs/product-vision.md docs/specs/learning-mastery-and-scoring.md
git commit -m "docs: fold V2 learning research into product guidance"
```

Expected: one commit modifying exactly three files.

---

### Task 3: Fold Research, Architecture, QA, And Manifest Guidance

**Files:**
- Modify: `docs/specs/research-brief.md:11`
- Modify: `docs/architecture.md:12`
- Modify: `docs/specs/qa-playtest-process.md:117`
- Modify: `journal/docs-map.md:51`

**Interfaces:**
- Consumes: accepted provenance, architecture, count-semantics, and QA dispositions from Task 1.
- Produces: durable research/ownership/verification boundaries and a manifest pointer to the archive.

- [ ] **Step 1: Add provenance and future research boundaries**

Insert after the `### Basic Strategy Depends On Ruleset` research-anchor list and before
`### Modern Casino Default Hypothesis` in `docs/specs/research-brief.md`:

```markdown
### Strategy Provenance Policy

Every strategy artifact must identify the exact supported ruleset, source name and retrieval date,
encoding or generation method, independent cross-check, and known unsupported cases. A friendly
table name is not enough to establish compatibility. The Rust oracle and engine legal actions stay
authoritative at runtime.

For future rule-variation work, separate dimensions that change legality or flow, settlement,
Basic Strategy, and operational conditions such as penetration or shuffle method. Do not add a
ruleset/profile matrix until a second verified profile creates a concrete need.
```

Replace `## Open Questions` with:

```markdown
## Open Questions

- What exact card lifecycle model will support future CSM/ASM variants cleanly?
- For future counting training, how will each decision distinguish the physical shoe-true count
  from the player-perceived count that excludes an unseen dealer hole card until reveal?
- Which rule variation should become the second verified strategy profile when variation literacy
  becomes active?
```

- [ ] **Step 2: Clarify state ownership in architecture**

Insert before `## Simulation invariants` in `docs/architecture.md`:

```markdown
## Learning state

Learning features keep three responsibilities separate:

- engine game state owns cards, rules, legal actions, strategy truth, and outcomes;
- controller learning state owns the current objective, exercise sequence, submitted attempt, and
  feedback timing; and
- React presentation state owns panels, focus, animation, and expanded explanations.

The learning controller may ask the engine to evaluate and resolve a decision, but it does not
recreate legality or strategy. Transient presentation details do not enter engine or learning
records.
```

- [ ] **Step 3: Add the learning-integrity QA contract**

Insert after the parked-agent table in `docs/specs/qa-playtest-process.md`:

```markdown
### Learning-integrity contract

When a scoped feature adds strategy hints, grading, explanations, or assisted practice, its QA must
verify all of the following:

- a correct decision remains correct when the hand loses, and a wrong decision remains wrong when
  the hand wins;
- every recommendation comes from the active ruleset-matched oracle and is legal in the evaluated
  state;
- table visibility and assistance are observable when the feature uses them; and
- learner comprehension is judged separately from strategy fidelity, engine flow, and visual
  polish.

The feature design selects exact scenarios and decides whether these checks belong in a script or a
judgment pass. Results and findings still follow the ledger-driven process.
```

- [ ] **Step 4: Register the tracked import archive**

Insert after the initial-product-notes import row in `journal/docs-map.md`:

```markdown
| docs/imports/v2-research-2026-07-11/ | Indexed V2 research imports, dispositions, and folded destinations; not authoritative over owned docs. |
```

- [ ] **Step 5: Verify pointers, stale-question removal, and scope**

Run:

```bash
test -f docs/imports/v2-research-2026-07-11/INDEX.md
test -d docs/imports/v2-research-2026-07-11/research
test -d docs/imports/v2-research-2026-07-11/course-bundle
test -d docs/imports/v2-research-2026-07-11/history
! rg -n "How should the BlackjackInfo chart be encoded" docs/specs/research-brief.md
rg -n "Strategy Provenance Policy|player-perceived count|## Learning state|Learning-integrity contract|v2-research-2026-07-11" docs/specs/research-brief.md docs/architecture.md docs/specs/qa-playtest-process.md journal/docs-map.md
git diff --check
git diff -- docs/specs/research-brief.md docs/architecture.md docs/specs/qa-playtest-process.md journal/docs-map.md
```

Expected: all target paths exist; the obsolete oracle question is absent; every new section/pointer
is found; diff review shows no registry, persistence, schema, or second-profile implementation
decision.

- [ ] **Step 6: Commit research and process synthesis**

Run:

```bash
git add docs/specs/research-brief.md docs/architecture.md docs/specs/qa-playtest-process.md journal/docs-map.md
git commit -m "docs: fold V2 research into owned references"
```

Expected: one commit modifying exactly four files.

---

### Task 4: Run The Final Documentation Gate

**Files:**
- Verify only: `docs/imports/v2-research-2026-07-11/**`
- Verify only: `ROADMAP.md`
- Verify only: `docs/specs/product-vision.md`
- Verify only: `docs/specs/learning-mastery-and-scoring.md`
- Verify only: `docs/specs/research-brief.md`
- Verify only: `docs/architecture.md`
- Verify only: `docs/specs/qa-playtest-process.md`
- Verify only: `journal/docs-map.md`

**Interfaces:**
- Consumes: the three committed deliverables from Tasks 1–3.
- Produces: fresh evidence that the source archive, ownership map, and authoritative docs satisfy the approved design.

- [ ] **Step 1: Re-run archive integrity checks from committed state**

Run:

```bash
unzip -t docs/imports/v2-research-2026-07-11/course-bundle/files.zip
for member in how-to-teach.md unit-1-basics.md unit-2-basic-strategy.md rules-spec.md roadmap.md; do
  unzip -p docs/imports/v2-research-2026-07-11/course-bundle/files.zip "$member" |
    cmp - "docs/imports/v2-research-2026-07-11/course-bundle/$member"
done
test -z "$(find journal/raw/_inbox -mindepth 1 -print -quit)"
```

Expected: ZIP integrity passes, all five comparisons exit 0 without output, and the inbox is empty.

- [ ] **Step 2: Verify index coverage exactly once per source**

Run:

```bash
for source in \
  research/v2-research-01-ruleset-model.md \
  research/v2-research-02-curriculum-and-pedagogy.md \
  research/v2-research-03-course-and-source-audit.md \
  research/v2-research-04-content-and-data-architecture.md \
  research/v2-research-05-software-architecture.md \
  research/v2-research-06-ux-foundations.md \
  research/v2-research-07-validation-and-qa-strategy.md \
  research/v2-codebase-continuation-handoff.md \
  history/history-data-analysis-2026-07-09.md \
  course-bundle/files.zip \
  course-bundle/how-to-teach.md \
  course-bundle/unit-1-basics.md \
  course-bundle/unit-2-basic-strategy.md \
  course-bundle/rules-spec.md \
  course-bundle/roadmap.md; do
  test "$(rg -F -c "| \`$source\` |" docs/imports/v2-research-2026-07-11/INDEX.md)" -eq 1
done
```

Expected: exit 0 with no output.

- [ ] **Step 3: Verify authority and placeholder guardrails**

Run:

```bash
! rg -n "6deck_S17|house edge.*0\.44|dealer_hits_soft_17.*false" \
  ROADMAP.md \
  docs/specs/product-vision.md \
  docs/specs/learning-mastery-and-scoring.md \
  docs/specs/research-brief.md \
  docs/architecture.md \
  docs/specs/qa-playtest-process.md
unfinished_markers='T''BD|T''ODO|FIX''ME|PLACE''HOLDER|\?\?\?'
! rg -n "$unfinished_markers" \
  docs/imports/v2-research-2026-07-11/INDEX.md \
  ROADMAP.md \
  docs/specs/product-vision.md \
  docs/specs/learning-mastery-and-scoring.md \
  docs/specs/research-brief.md \
  docs/architecture.md \
  docs/specs/qa-playtest-process.md
```

Expected: both negated searches exit 0 with no output. Imported source bodies are deliberately
excluded because they preserve original claims unchanged.

- [ ] **Step 4: Verify manifest pointers and final Git state**

Run:

```bash
for path in \
  docs/imports/v2-research-2026-07-11 \
  docs/specs/product-vision.md \
  docs/specs/learning-mastery-and-scoring.md \
  docs/specs/research-brief.md \
  docs/specs/qa-playtest-process.md; do
  test -e "$path"
done
git diff HEAD~3 --check
git status --short
git log -3 --oneline
```

Expected: all targets exist; `git diff --check` exits 0; `git status --short` is empty; the last
three commits are the archive, product/learning synthesis, and research/process synthesis commits.

- [ ] **Step 5: Review the final change summary**

Run:

```bash
git diff --stat HEAD~3..HEAD
git diff --summary HEAD~3..HEAD
```

Expected: the summary contains only archive moves/additions and the seven mapped owned-document
surfaces. No production code, task file, QA ledger, or unrelated file appears.
