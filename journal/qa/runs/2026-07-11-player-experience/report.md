# Player Experience — Get to Know Blackjack Feature QA

> Judgment pass for the first guided drill. Scope: all three micro-units from situation setup
> through three live hands and recap. Mechanical rules/provenance assertions are covered by
> `runs/2026-07-11-{rules,flow,breakit,drill}/`.

- **Verdict:** PASS-with-reservations
- Commit: `44606e2`
- Browser walkthrough: local Vite dev server at `http://127.0.0.1:5173/BlackJack/`
- Units completed: Reading the table; Hit, Stand, and the stakes; Double and Split
- New findings: `QA-015` found, fixed, and verified in this run

## Judgment

The drill is playable and short. Each unit starts with a concrete table state, resolves through
real engine actions, then switches to a short live tail and recap. The copy is direct enough for a
new player to understand totals, blackjack, Hit/Stand, Double, Split, win/loss/push language, and
stake movement without introducing strategy grading.

The outcomes are honest: the arranged cards create only the opening, while hit cards, dealer play,
and final results come from the shoe. The UI does not present a score, rank, oracle, EV, or strategy
table.

## Reviewed Decision

The Hit-on-16 teaching choice is accepted for this orientation unit. The copy explicitly frames it
as feeling bust risk, not as Basic Strategy advice, and the subject does not grade correctness. This
should be revisited before strategy-table teaching appears so the later strategy layer can correct
or contextualize it.

## Finding Fixed During Run

- `QA-015`: after the Split situation resolved, the drill still displayed `← playing` beside the
  second hand while the screen was already in feedback/Continue state. Fixed by gating the active
  marker on `round.status === 'player_turn'`, matching Free Play. Verified with
  `src/app/Drill.test.tsx` and the final full `npm --prefix web run qa` pass.

## Reservations

Existing V3 polish reservation remains: the UI is still intentionally unstyled and reads more like
a functional harness than a finished training game (`QA-014`). No new blocker remains for this
feature.
