# Chips, XP, and Progression Economy — Captured Premise

> Status: **owner premise, captured 2026-07-26. Not a design, not a research conclusion.**
> This document records the motivation model the owner stated, in his words, so the open
> questions survive until the economy is actually designed. Nothing here is approved to build.

## Why this document exists

The economy is one of Phase 4's design deliverables. It has been discussed twice and recorded
only as fragments — a premise line in `journal/decisions.md` (2026-07-25) and a `next:` pointer
in `journal/ops/phase.md`. This file holds the whole statement in one place so the design cycle
starts from the owner's actual model rather than reconstructing it.

Evidence posture, stated once: **the entire model below is product judgement.** No phase of the
research program collected evidence on gamification, motivation, streaks, XP, or difficulty
curves. Phase 2 ruled the project's "Duolingo-like" premise itself to be a genre and values
commitment, not an empirical claim (`docs/superpowers/research/foundation-audit-p2/audit/U2-audit.md`).
Nothing in this file may be written up as evidence-backed.

## The model, as stated

**Onboarding.** A player who registers and completes the first tutorial receives a fixed chip
amount for Free Play. The amount is the same for every new player.

**Persistence.** The wallet persists across sessions. If the player closes the browser and
returns the next day, the product remembers where they are in the learning path, their player
score, their ability level, and their chip balance.

**Player score.** A chess-style rating. The owner designed this early in the project; it survives
in `docs/specs/learning-mastery-and-scoring.md:152-165` as: internal rating like chess, visible
rank/level, mastery per skill, unlocks driven primarily by mastery, difficulty adjusted by rating.

**XP and the leaderboard.** Progressing through learning stages earns XP toward a leaderboard.
The owner's current position is that XP should be linked directly to the player score.

**Chip rewards.** Alongside XP, completing learning work grants chips — amount scaled by
difficulty, or by answer quality, or both. The per-lesson and per-unit amounts are undecided.

**Unlocking Free Play.** Free Play tables open when the player has chips *and* has reached the
level that grants table access. Which score or which completed unit grants access is undecided.

**At the table.** Once unlocked, the player plays as much as they want under the table rules.
There is no cap on winnings.

**The framing that governs all of it.** Chip quantity does not really affect anything. The
purpose of chips is realism — the texture of a real table — not stake, pressure, or reward for
winning. Learning earns table time; money never buys chips.

## Open questions

Numbered so they can be cited from a task card.

- **E-1 — Does a won hand return chips to the wallet?** The stated model has no cap on winnings,
  which means the wallet grows from outcomes. The learning design decouples decision quality from
  hand outcome deliberately and at every level. The mitigation already present in the model is
  that chips buy nothing and unlock nothing once Free Play is open, so a win advances the learner
  on no axis. Whether a purely cosmetic reward for winning still teaches outcome bias is
  **playtest question P-1**, not a question literature can answer.
- **E-2 — What happens at an empty wallet?** Undecided. Options range from a real setback
  (Free Play closes until more learning is done) to an automatic top-up. This is the
  "is running out a setback or a quick top-up" question recorded in `journal/ops/phase.md`.
- **E-3 — Chips per lesson and per unit.** Undecided. Note the standing constraint that no
  numeric constant in this product is research-calibrated; any figure chosen is a product
  judgement until measured on this product's own data.
- **E-4 — The gate for Free Play access.** Which player score, or which completed unit, opens
  the tables.
- **E-5 — XP and player score linked directly.** These behave oppositely: XP accumulates and
  never decreases; a rating rises and falls with performance. Linking them directly requires
  either that XP can decrease, or that the score cannot — and the second makes it not a rating.
  The relationship has to be chosen explicitly.
- **E-6 — Rating with too few players.** A chess-style rating calibrates item difficulty from a
  response population; Chess.com sets a new puzzle's difficulty by observing who solves it, and
  the education-Elo literature puts usable item calibration around ~100 learners. The owner's
  stated direction is a fallback scoring mode below roughly 25 users, decided when the mechanism
  is built. Phase 1 found the population requirement shrinks rather than vanishes: a per-learner,
  per-item parameter can be fitted online from a single learner's own responses starting from one
  published constant. That is the path to evaluate — not copying Chess.com's seeding.
- **E-7 — Leaderboard versus client authority.** The engine is client-authoritative and the
  browser can see the entire undealt shoe in every response. A leaderboard on that architecture
  is trivially forgeable. `CLOUD-06` already defers leaderboards pending anti-cheat authority.
  A real leaderboard implies server authority, which is an architecture change rather than a
  feature.

## Constraints this design must satisfy

Carried from documents that already have authority, so the economy design does not have to
rediscover them.

- Motivation must reward practice, comprehension, and improving decision quality. It must not
  celebrate money won, encourage loss chasing, imply guaranteed profit, or punish a learner for
  ending a session (`docs/specs/product-vision.md:78-80`).
- The product is not centred on chips, bankroll, or casino fantasy (`docs/specs/product-vision.md:27`).
  The stated model is compatible with this: chips are earned by learning, buy nothing, and are
  never purchased with money.
- No loss-framed streaks, leagues, or penalties for ending a session
  (`docs/superpowers/specs/2026-07-16-adaptive-learning-product-activity-research.md:388`).
- Punitive mechanics are counterproductive in a trainer where wrong answers are the teaching
  mechanism (`docs/imports/v2-research-2026-07-11/course-bundle/how-to-teach.md:120`).
- Streaks are a non-binding progression idea, not an approved mechanic
  (`docs/imports/2026-07-15-v2-future-guidance/INDEX.md`, CLOUD-02).
- Bankroll and learning score stay visually distinct; a lucky wrong decision must not receive the
  same celebration as a correct one (`docs/imports/v2-research-2026-07-11/research/v2-research-06-ux-foundations.md:87,135-142`).
- Confidence must never be used as a mastery signal
  (`docs/superpowers/specs/2026-07-22-product-design-inputs.md:210`).

## What this unblocks

Everything the model requires to persist — wallet, learning position, player score, ability
level — is what `web/src/progress/` was built to hold and has never been connected to. That
module currently has no product consumer outside its own QA harness. This document is the
missing consumer specification for it.
