# Product Vision — Playful Blackjack Learning

> Status: owner-approved direction, 2026-09-05. Product judgement; the intended learning and engagement effects require playtesting.

## Core idea

An attractive, approachable game that teaches blackjack and statistical thinking through play.
Duolingo and Brilliant are experience references: short approachable encounters, experimentation,
useful feedback and satisfying progress. They are not proof that our activities work.

Learning blackjack includes understanding its rules and actions, improving decisions, and exploring
probability, expected value and variance. Statistical understanding is also a goal in its own right.
Card counting and casino-like cognitive load belong to later expansion.

## Three connected experiences

- **Learning path:** interactive lessons and challenges, with concise explanations where useful.
  Completing learning sincerely earns base chips, with a possible performance bonus.
- **Free Play:** accurate blackjack with persistent chips that can be won, lost and exhausted.
  Lessons and challenges offer a way to earn more. Money does not buy chips.
- **Practice table:** always-available table play with temporary session chips and optional feedback.
  It has no effect on Wallet, XP, Player score, Mastery or Recommender.

The practice table is distinct from learning Practice over already-covered material.
The economy must not be the only reason a learner tolerates a lesson; test that risk explicitly.

## First experience

A beginner should want to spend about ten minutes and leave with an orientation to the rules and
basic actions. This is not a promise of mastery in ten minutes. Attractive presentation belongs in
this first experience, not behind completion of the whole learning backend.

Start by testing one small activity, then compose a coherent opening connecting learning and table
play. A successful isolated puzzle is not a successful ten-minute experience.

## Teaching and feedback

Use exploration, construction, prediction and decisions when they serve the learning outcome.
Not every useful explanation needs to become a replayable mini-game. Activities can teach inside
ordinary lessons; they are not restricted to assessment warm-ups.

Distinguish completion, conceptual understanding and playing skill. An end-of-unit challenge should
fit its content. A statistical prediction and a real dealt-hand decision can require different
assessment formats; neither is automatically evidence of mastery.

Keep decision quality separate from hand outcome: a sound decision may lose and a poor one may win.
Feedback must be understandable without color alone; respect reduced-motion needs. Engine-owned
rules and totals remain authoritative, not AI-generated judgements.

## Simulation and platform

Free Play and Practice table deal from an honest ordered shoe with traceable card identities,
ruleset-aware legal actions and settlement. Puzzles may use explicitly arranged cards, but never
pretend the learner can select future cards in real blackjack. Keep simulation UI-independent.

Web first. Mobile, accounts, sync and multiplayer remain need-activated future capabilities subject
to the existing stack admission requirements.

## Current design

The decision delta, superseded scope, three horizons and first activity candidate live in
`docs/superpowers/specs/2026-09-05-playful-learning-direction.md`.
`ROADMAP.md` owns delivery order; `journal/tasks.md` owns current execution.
