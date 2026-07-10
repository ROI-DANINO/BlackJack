# V2 Basic Strategy Oracle

## Status

Approved research/design decision. This is the implementation boundary for the first V2 feature,
not its implementation plan.

## Outcome

The Rust engine owns one auditable Basic Strategy oracle for
`v1-modern-classic-h17-6d`. The UI, drills, hints, and future Free Play review ask that oracle;
none copies or reimplements its chart.

## Source and Scope

The canonical source is [BlackjackInfo's Basic Strategy Engine](https://www.blackjackinfo.com/blackjack-basic-strategy-engine/?das=yes&dbl=all&numdecks=6&peek=yes&soft17=h17&surr=no), captured on 2026-07-10 with:

- 6 decks; dealer hits soft 17; double on any first two cards; double after split;
  no surrender; dealer peek.
- The source chart uses hard totals, soft totals, and pairs. Its legend defines `D` as
  double-or-hit and `DS` as double-or-stand.
- Wizard of Odds is the independent rules/edge-case check, not a competing runtime source.

Basic Strategy is total-dependent and has no count deviations. Insurance, natural blackjacks,
resolved hands, and dealer turns have no oracle recommendation.

## Lookup Contract

Input is the current engine hand, dealer upcard, ruleset, and the engine's legal actions. Output
is one recommended legal action, or no recommendation outside a player decision.

1. Normalize dealer ten-value ranks to `10`.
2. For an exactly two-card pair, consult the pair row first. If it recommends Split and Split is
   legal, return Split. If it is unavailable, continue with the equivalent hard/soft total;
   the otherwise-unlisted soft 12 (`A,A`) falls back to Hit.
3. Otherwise classify the hand as soft or hard and consult that row. Three-or-more-card hands
   always take this path.
4. Apply source fallbacks: `D` becomes Hit if Double is unavailable; `DS` becomes Stand if Double
   is unavailable. A non-legal Split follows step 2's hard/soft fallback.
5. The returned action must be one of the engine's legal actions. A mismatch is a bug, never UI
   policy.

Ten-value pairs are recognized as pairs by the engine but their source row always says Stand;
mixed-rank ten-value pairs therefore also recommend Stand. Split-ace one-card restrictions remain
the existing engine's authority.

## Representation

Keep compact immutable chart constants and a small lookup function in the Rust core. Key tables by
ruleset ID; V1 has one table. A future supported ruleset adds another verified table and source
record, not a generic probability solver or a UI-owned chart.

## Verification

- Transcribe and test every source cell: hard totals, soft totals, and pairs.
- Test both source fallback forms and unavailable Split fallback.
- Cover dealer ten normalization, mixed ten-value pairs, split aces, DAS, max-split/bankroll
  restrictions, and non-two-card hands.
- Keep the existing simulator as the legal-action authority; oracle tests must assert that every
  returned recommendation is legal.

## Non-goals

- Surrender, card-counting deviations, composition-dependent play, or runtime strategy
  calculation.
- AI-generated strategy decisions. Future AI may explain an oracle decision, never supply one.
