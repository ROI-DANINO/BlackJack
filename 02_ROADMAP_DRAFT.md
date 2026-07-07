# Blackjack Training Game — Draft Roadmap

> Roadmap draft. Keep this high-level. Do not create tasks for every future phase upfront.

## Working structure preference

Use this hierarchy:

```text
Roadmap
  -> Versions: V1, V2, V3...
    -> Milestones
      -> Phases
        -> Tasks
```

Tasks should be written only for the current active phase. Future phases should stay as milestones or rough phase headings until the previous phase is completed and approved.

## V1 — Simulation Foundations

Goal: create the first working Free Play foundation.

V1 success condition:

> The user can play initial Free Play: one player vs dealer, using a real shoe, seeded shuffle, cut card / penetration, and a modern-classic casino ruleset.

### V1 scope

- Web app foundation, with mobile-responsive thinking.
- Free Play first, not polished lessons first.
- One active player vs dealer in UI.
- Engine structure supports multiple seats later.
- Real shoe creation from multiple decks.
- Deck IDs and card origin tracking.
- Seeded shuffle for reproducible sessions.
- Cut card / penetration.
- Configured modern casino ruleset.
- Basic round flow.
- Hit / stand first; double / split / surrender as rules require for the V1 ruleset.
- Dealer play rules.
- Round/session log for debug and future analytics.

### V1 non-goals

- Full learning path.
- Full Basic Strategy course.
- Card counting lessons.
- Simulated players acting in the UI.
- Leaderboard.
- Daily challenges.
- Polished casino visual design.
- Real-money, chips-first, bankroll-first gameplay.
- CSM/ASM simulation.

## V2 — Learning Foundations

Goal: add the first real learning system on top of the simulation.

Primary learning content:

- Basic Strategy path.
- Intro to running count.
- Optional count interface / manual tracking helper.

Likely V2 systems:

- Mastery tracking.
- Short Duolingo-like lessons.
- Hints.
- Feedback after mistakes.
- Basic Strategy drills.
- Rule-based scenario generation, not fixed hands.
- Session reports.
- Skill diagnosis.

Basic Strategy path should start with:

1. Use table correctly.
2. Play without table and without time pressure.
3. Play without table at realistic pace.

Categories:

- Hard hands.
- Soft hands.
- Pairs.
- Double.
- Surrender.
- Dealer upcard logic.

Basic Strategy should be broken down into categories but mixed gradually according to mastery, not only after all categories are finished.

## V3 — UX and Game Experience

Goal: make the product feel like a real, enjoyable training game.

Likely scope:

- Better visual design.
- Table UI.
- Mobile-first refinement.
- Progression map.
- Rank and mastery presentation.
- Game-feel polish.
- Better Free Play experience.
- Cleaner onboarding.
- Better hint/feedback panels.

After V3, continue adding advanced content one feature at a time.

## Post-V3 direction

Add topics incrementally:

- Running count mastery.
- True count.
- Multi-seat tables.
- Simulated players.
- Casino pace.
- Bet sizing / unit sizing.
- Count deviations.
- Advanced counting systems.
- Table rules variations.
- CSM/ASM and machine-buffer table variants.
- Leaderboards.
- Daily challenges.
- Shared daily shoe / daily drill.

Each major topic should get its own research, spec, and implementation plan when it becomes active.
