# U8 memory-drift specimen (Q5) — captured before correction

This is the U8 finding itself, preserved intact per Task 0 Step 5 (preserve first, correct
second). It is the verbatim stale text of `journal/memory/v2-learning-foundations-roadmap.md` as
it stood immediately before this run's correction, with that file's own line anchors, plus the
contradicting `ROADMAP.md` / `PROGRESS.md` locations read at the same time.

## Stale source — `journal/memory/v2-learning-foundations-roadmap.md` (pre-correction, verbatim)

Full file content, captured 2026-07-21, `updated: 2026-07-15` per its own frontmatter:

```
---
description: V2 retains two ordered subjects; Blackjack Foundations and Strategy Profiles are complete, Strategy Table Fundamentals is next.
tags: v2-learning-foundations, blackjack, roadmap, learning, strategy
updated: 2026-07-15
---

# V2 Learning Foundations roadmap

V2 is a roadmap, not a single implementation plan. It starts with Blackjack Foundations, then
Strategy Table Fundamentals. The course is ordered and replayable; table use stays available in
V2, while no-table/timed mastery is later. Blackjack Foundations and the H17/S17 Strategy Profile
Foundation are complete. The active task is designing the first learner-visible Strategy Table
Fundamentals lesson and the smallest engine-owned grading API it needs.

Free Play retains its ordered real shoe. Its table can appear early, but active coaching and
reviews wait until the teaching loop is proven. Each V2 feature receives a dedicated research or
design cycle before implementation.
```

**Line anchors (in the file above, 1-indexed):**
- `journal/memory/v2-learning-foundations-roadmap.md:2` — frontmatter `description:` field: "...
  Strategy Table Fundamentals is next." (implies immediately up next / uncontested succession)
- `journal/memory/v2-learning-foundations-roadmap.md:12-13` — body: "The active task is designing
  the first learner-visible Strategy Table Fundamentals lesson and the smallest engine-owned
  grading API it needs." (states it as the *current active task*, present tense, unconditional)

## Contradicting locations, read the same day

**`ROADMAP.md`:**
- `ROADMAP.md:32-34` — "The active slice is a small adaptive-learning mechanics proof over
  representative Blackjack Foundations units: establish the evidence/activity/progress contracts
  **before Strategy Table Fundamentals resumes against them**." (the active slice is the
  mechanics proof, not Strategy Table Fundamentals; the latter is explicitly gated to resume
  later)
- `ROADMAP.md:86-88` — the V2 delivery checklist still shows **`- [ ] Strategy Table
  Fundamentals`** — an open, unchecked item, teaching "hand classification and table
  navigation, then table-open guided practice and checkpoints" — not a completed or currently
  active item.
- `ROADMAP.md:93-96` — "**Before** the remaining Strategy Table Fundamentals design is resumed,
  the active adaptive-learning mechanics sub-phase will prove the smallest reusable evidence,
  activity, session, progress, and deterministic-fallback contracts against one or two existing
  Blackjack Foundations units." (explicit ordering: mechanics proof first, Strategy Table
  Fundamentals design resumes only after)

**`PROGRESS.md`:**
- `PROGRESS.md:34-37` — "**Strategy Table Fundamentals lesson-one direction approved, then
  intentionally paused**: its mechanics-first sequence and the Hit-on-16 continuity wording are
  recorded; the remaining content, grading-boundary, and feature-design work **resumes after the
  adaptive mechanics proof establishes the contracts it should consume**." — explicit,
  unambiguous: paused, not active.

## The drift

The memory file's frontmatter (line 2) and body (lines 12-13) both assert Strategy Table
Fundamentals is the *current active task*. `ROADMAP.md` and `PROGRESS.md`, read the same day,
both state the opposite: Strategy Table Fundamentals design work is **intentionally paused**,
and the actual active slice is the adaptive-learning mechanics proof, which must complete before
Strategy Table Fundamentals design resumes. An agent reading only the memory file during this
run would be misled about what is currently active — this is the drift Q5 exists to catch and
correct, and this specimen is kept intact (not edited) so that correcting the live memory file
does not destroy the evidence of what it said before the fix.

Recorded in `registers/source-lead-register.md` as `SL-001`.
