# Blackjack Training Game — Product Vision

> Working context draft for Codex. This is intentionally directional, not a locked product spec.

## Core idea

Build a Duolingo-like training game for learning blackjack and card counting.

This is not a gambling app and not a casual blackjack toy. The long-term goal is to train a player to think and act like a realistic casino blackjack player:

1. Play Basic Strategy almost without mistakes.
2. Track the table and understand the shoe.
3. Learn running count.
4. Learn true count.
5. Apply count-aware decisions.
6. Handle multiple seats, faster pace, and real casino-like cognitive load.
7. Later: bet sizing, table selection, advanced count systems, casino rule variations, CSM/ASM table variants.

## Product feel

The product should eventually feel like:

- a fun, light, approachable training game;
- short learning loops, like Duolingo;
- precise and serious under the hood;
- realistic enough that the user feels like they are training for a real table;
- not an academic simulator with boring UI;
- not a gambling product centered on chips, bankroll, or casino fantasy.

Important: V1 is more technical because it builds the foundations, but the project must not drift into a dry debugging tool. The long-term vision is a fun learning game with strong simulation accuracy.

## Main modes

### Learning path

Short, focused units. Each unit trains a specific skill, but learning should happen through gameplay decisions rather than long lectures.

Learning loop:

```text
short drill -> decision -> feedback -> weakness detection -> targeted repetition -> mastery gate
```

### Free Play

A real table mode where the user can simply sit and play.

Free Play should not manipulate cards for lesson purposes. Cards come from the actual shoe. The learning layer helps around the game through optional table access, hints, count tools, and post-session feedback.

## Educational philosophy

The game teaches execution first.

The goal is not to make the player a blackjack theorist. Explanations should be short and useful, serving correct play and long-term mastery.

Basic Strategy should be learned in small chunks but tested in realistic mixtures. The player should gradually move from:

1. playing with the table open;
2. playing without the table but without time pressure;
3. playing without the table at realistic table pace.

## What makes this different

The simulation must respect the logic of real blackjack:

- a shoe is created before play;
- decks have IDs;
- cards have traceable origins;
- cards are shuffled once into a sequence;
- cards are dealt from that sequence;
- cards are not generated randomly one by one;
- cut card / penetration matters;
- session logs can be replayed and debugged.

This matters because blackjack and card counting are statistical. The game must not fake the table.
