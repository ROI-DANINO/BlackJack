# Learn — Blackjack Basics

> QA script-suite role `learn`. Spec: `docs/superpowers/specs/2026-07-11-blackjack-basics-learning-foundation-design.md`.

- **Verdict:** PASS
- Started: 2026-07-12T03:47:54.415Z
- Finished: 2026-07-12T03:48:05.597Z
- Commit: `7daf35c`
- Chromium: 149.0.7827.55
- Base URL: http://localhost:4325/
- Units completed: 9/9
- Arranged hands played: 6
- Live checkpoint hands played: 1
- Violations: 0

## Coverage

- Meet Blackjack: 4 steps, 3 attempts, required checks [goal-check, face-value-check], 0 arranged hands, 0 live hands.
- Read Your Hand: 5 steps, 3 attempts, required checks [soft-total-check, ace-adjust-check, bust-check], 0 arranged hands, 0 live hands.
- How a Round Works: 4 steps, 3 attempts, required checks [dealer-info-check, round-order-check], 0 arranged hands, 0 live hands.
- Hit and Stand: 6 steps, 5 attempts, required checks [action-check], 2 arranged hands, 0 live hands.
- Win, Lose, or Push: 5 steps, 4 attempts, required checks [outcome-check], 1 arranged hands, 0 live hands.
- Blackjack Is Special: 5 steps, 5 attempts, required checks [natural-check, payout-check], 1 arranged hands, 0 live hands.
- Double Down: 5 steps, 4 attempts, required checks [double-wager-check], 1 arranged hands, 0 live hands.
- Split a Pair: 5 steps, 4 attempts, required checks [split-count-check], 1 arranged hands, 0 live hands.
- Play a Full Round: 4 steps, 2 attempts, required checks [final-outcome-check], 0 arranged hands, 1 live hands.

## Checks

- Total assertions: **28**, failures: **0**

### Violations

None — every unit was visited, every declared required check passed, arranged/live provenance and six-deck composition held, no step was double-graded correct, recap capabilities match declared outcomes, and the browser console stayed clean.

