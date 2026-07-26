# Learning, Mastery, and Scoring — Future Design Notes

> Status: active for V2 — cited as binding design authority in `journal/ops/phase.md`
> (`phase: v2-learning-foundations`) and in `PROGRESS.md`'s open questions. The former "parked for
> V2+" framing is stale now that the project is in V2; not a V1 implementation requirement.

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

## Learning Target Progression

Build skills in this order:

1. Game literacy: understand totals, actions, dealer information, and outcomes.
2. Rule literacy: recognize the active table and its legal options.
3. Chart literacy: classify the hand and navigate the matching table.
4. Decision recall: choose the recommendation with progressively less support.
5. Procedural transfer: apply decisions through full evolving hands.
6. Ruleset transfer: notice when a changed rule changes the answer.
7. Automaticity: answer accurately at realistic pace only after accuracy is stable. *(Assumption —
   the only blackjack-specific support is N=12, computer-controlled, rigged win probability, with no
   split/double/insurance; also loosens the source import's "after mastery" to "after accuracy is
   stable"; audited 2026-07-26, K-U1-004.)*

*(Assumption — no dossier or baseline source evaluates a prerequisite ordering for blackjack, or any
comparable situation-to-action rule domain; Khan's ladder is an existence proof that ladders ship,
not that this ordering is correct; audited 2026-07-26, K-U1-003.)*

V2 concentrates on the first four stages and table-open transfer. Ruleset transfer, no-table
assessment, and timed automaticity remain later work.

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

## Classification And Table Navigation

For every lookup, identify the dealer upcard and classify the player's hand in this order:

1. pair;
2. soft total;
3. hard total.

Then find the matching player row and dealer column. Teach fallback notation only when the learner
understands that the engine's legal actions remain authoritative. Classification and row/column
navigation should be measurable separately from choosing the recommended action.

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

## Exercise Ladder

Reuse concepts across progressively harder formats:

1. recognition;
2. guided classification;
3. table-open decision;
4. table-hidden decision;
5. full evolving hand;
6. interleaved review;
7. timed practice after accuracy is stable. *(Assumption — same weak-evidence claim as Learning
   Target Progression above: N=12, computer-controlled win probability, no split/double/insurance;
   audited 2026-07-26, K-U1-004.)*

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

Immediate and delayed feedback are training configurations, not one global product mode. Use
immediate correction for new concepts and delayed review for transfer or assessment. *(Assumption —
SCI-005 runs against the immediate half: delayed feedback was slightly more effective, and
clarity/consistency mattered more than exact timing; audited 2026-07-26, K-U1-014.)* Both modes
must preserve the decision state being evaluated and keep the decision verdict separate from the
resolved hand outcome.

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

*(Assumption — each half has a precedent but the combination has none; education-Elo needs roughly
100 learners for usable item difficulty, and Chess.com's item ratings are crowd-calibrated; audited
2026-07-26, K-U1-016.)*

## Error Severity
Do not score all mistakes equally.

Examples:

- Minor error.
- Medium error.
- Major error.
- Critical error.

*(Product judgement + COVERAGE GAP — nothing grades blackjack error severity by these tiers;
audited 2026-07-26, K-U1-017.)*

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

*(Product judgement + COVERAGE GAP — response time and table pace as scoring factors run against
ALR-022's "without equating speed with ability"; audited 2026-07-26, K-U1-017.)*

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
