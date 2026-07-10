# Learning, Mastery, and Scoring — Future Design Notes

> Status: parked for V2+. Not a V1 implementation requirement unless the active milestone says so.

## Main Learning Direction
The game is a training app with gameplay, not a textbook course.

Learning should happen through short loops:

```text
short unit -> decision -> feedback -> targeted repetition -> mastery update
```

Free Play is separate from structured learning. In Free Play, the game should not manipulate
cards for lesson purposes.

## First Learning Path
Initial path: Basic Strategy almost without mistakes.

Mastery ladder idea:

1. Play correctly with the table open.
2. Play correctly without the table and without time pressure.
3. Play correctly without the table at realistic table pace.

Do not lock the entire long-term mastery ladder yet.

## Basic Strategy Categories
Break Basic Strategy into categories:

- Hard hands.
- Soft hands.
- Pairs.
- Double.
- Surrender.
- Dealer upcard logic.

Teach in chunks, then mix according to mastery. Do not wait until the end to combine
everything.

## Drill Generation Principle
Prefer rule-based scenario generation over fixed scripted hands.

Bad:

```text
Always deal the exact same 16 vs 10 hand.
```

Better:

```text
Generate situations matching "hard 12-16 vs dealer 2-6", with changing actual cards.
```

This allows targeted practice without making the game feel fake.

## Help Modes
### Assisted Mode
- Can stop after mistakes.
- Gives immediate explanation.
- Good for first exposure.

### Strict Training Mode
- Does not stop the hand.
- Gives analysis after the round/session.
- Good for serious practice.

### Casino Mode / Free Play
- No automatic interruption.
- Hints only if requested.
- Session report after play.

## Hint System
Hints should be graded, not just answer-first.

Example ladder:

1. Directional hint: "Check whether this is hard or soft."
2. Table-location hint: "Look at hard totals against dealer 6."
3. Explanation: "Dealer 6 is weak, so forcing the dealer to act is often correct."
4. Direct answer: "Stand."

In Free Play, hints should be requested explicitly.

## Rating and Mastery
Use a mix:

- internal rating like chess;
- visible rank/level;
- mastery by skill;
- unlocks based primarily on mastery;
- difficulty adjusted by rating.

Working rule:

```text
Unlocks = mastery gates
Difficulty = rating adjusted
Progress identity = rank + rating
Diagnosis = skill breakdown
```

## Error Severity
Do not score all mistakes equally.

Examples:

- Minor error.
- Medium error.
- Major error.
- Critical error.

Factors later:

- correctness;
- severity;
- use of table;
- use of hints;
- response time;
- table pace;
- shoe/table difficulty;
- count accuracy;
- true count accuracy.

## Simulated Players Later
Not V1 active implementation.

Future simulated players should affect card flow and count load, not act like characters.

They should have hidden weakness profiles rather than pure random error percentages.

Table difficulty stars should represent overall tracking difficulty, not "how good the other
players are."

High difficulty can include chaotic or mistake-prone players because they increase cognitive
load and make card flow less predictable.

## Future AI Coach

AI is a calm, expert coach-companion: it explains, encourages, summarizes patterns, and selects
the next useful practice from approved curriculum facts. It never decides rules, legal actions,
round outcomes, or Basic Strategy; the engine and strategy oracle remain authoritative.

Start with session-only context. Add durable learner state only when scoring/progression needs it;
browser-local storage is enough before accounts, sync, or analytics justify a server database.
Use explicit retrieval of small, tagged, verified curriculum facts first—not vector RAG. Revisit
semantic retrieval only when the trusted source corpus becomes too large for deliberate selection.
Future personas may vary tone, never instructional truth.
