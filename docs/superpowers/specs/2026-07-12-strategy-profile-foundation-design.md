# Strategy Profile Foundation

## Status

Approved design. This is the first, foundation-only slice of **Strategy Table Fundamentals**. It
does not author any strategy lesson content. It replaces the single hard-coded H17 Basic Strategy
chart with a small, engine-owned `StrategyProfile` abstraction carrying two *verified* profiles
(H17 and S17), each bound to a real, playable canonical ruleset, and it establishes an
engine-authoritative gate so that any future strategy lesson must prove its declared profile
matches the active session's ruleset before it may render or grade.

Two profiles exist in this slice for one reason: a single profile cannot prove the gate has teeth.
The second profile is the smallest artifact that lets us verify both the *match* and the
*mismatch* paths. This is not a generic multi-ruleset course platform, and must not grow into one.

## Product Outcome

No learner-visible change ships in this slice. What changes is the ground the next slice builds on:
the engine can answer, authoritatively, "which verified Basic Strategy table applies to this exact
ruleset, and does it match what this lesson claims to teach?" A strategy lesson that is honest
about its ruleset renders and grades; a lesson pointed at a session it was not verified against
refuses to render or grade and surfaces a fatal contract error instead of silently teaching the
wrong table.

This keeps the product a faithful trainer: we never grade a decision against a chart that does not
match the rules actually being played.

## Foundation Principle

The simulator core owns blackjack truth, including which strategy table is correct for a given
ruleset. The learning layer consumes that truth; it never re-derives or re-decides it. TypeScript
may carry a lesson's *declared* profile as typed curriculum data, but the authoritative
"does this profile match this session's ruleset" decision lives in Rust and is reached by
inspecting the session's canonical ruleset — never by trusting a name or an id string.

## Current State (inspected)

- `crates/blackjack-core/src/strategy.rs` — `basic_strategy_action` is hard-gated: it returns
  `Err` unless `ruleset.id == "v1-modern-classic-h17-6d"`. The H17 chart lives in three
  module-level string tables (`HARD`, `SOFT`, `PAIRS`).
- `crates/blackjack-core/src/rules.rs` — exactly one ruleset, `v1_h17_ruleset()`
  (`dealer_soft_17: Hit`). `dealer_must_hit` already honors `DealerSoft17::Stand`, so an S17
  ruleset is playable with no dealer changes.
- `crates/blackjack-core/src/boundary.rs` — no strategy command exists; `basic_strategy_action`
  is reachable only from Rust tests, never from the TS learning layer.
- `web/src/learn/types.ts` — `Unit`/`Subject`/`LessonStep` carry no ruleset or profile field. The
  learn engine (`engine.ts`) starts sessions with `ruleset: null` (Rust falls back to H17).
  `validate.ts` validates ids, outcomes, and recap coverage — nothing about strategy or rulesets.
- `crates/blackjack-core/tests/strategy_tests.rs` — verifies every source cell of the H17 chart
  and includes `rejects_an_unsupported_ruleset_id` (mutates the id, expects `Err`). Today's gate is
  exact id-string equality.

## The StrategyProfile Abstraction (Rust)

A `StrategyProfile` is a small enum in `strategy.rs`:

```
enum StrategyProfile { H17, S17 }
```

- Not a dynamic registry. Two known variants, exhaustive matching, no open-ended lookup — this is
  the YAGNI-correct shape for a two-profile world and keeps the abstraction from drifting toward a
  course platform.
- Each variant owns its three verified chart tables (`hard`, `soft`, `pairs`) via a method. The
  existing H17 constants move under the `H17` variant unchanged — no behavior change for the H17
  path.
- `basic_strategy_action` keeps its `&Ruleset` parameter but obtains its tables by resolving a
  profile from that ruleset (see next section) instead of the hard-coded id check. Rejection
  behavior is preserved — an unresolvable ruleset yields the same "unavailable" outcome as today —
  now generalized to two profiles.

## Two Canonical Rulesets

- `v1_h17_ruleset()` — unchanged. Id `v1-modern-classic-h17-6d`, `dealer_soft_17: Hit`.
- `v1_s17_ruleset()` — new. Id `v1-modern-classic-s17-6d`, identical to H17 in every field
  **except** `dealer_soft_17: Stand`. Genuinely playable: the dealer core already stands on soft 17
  when configured, so no dealer or session changes are required to deal and resolve S17 hands.

Both are 6 deck, DAS, no surrender.

## Resolution: Canonical Fingerprint, Not Id Trust

`resolve_profile(&Ruleset) -> Option<StrategyProfile>`:

- Resolves to `H17` only when the supplied `Ruleset` **exactly equals** the canonical
  `v1_h17_ruleset()` configuration; to `S17` only when it exactly equals the canonical
  `v1_s17_ruleset()` configuration; otherwise `None`.
- The match is exact equality against the whole canonical `Ruleset` value (full-struct equality —
  `Ruleset` already derives `PartialEq`), **not** the id alone. A ruleset carrying a known id but
  any differing field (e.g. the H17 id with `decks` or `double_after_split` changed) must **not**
  resolve — because the verified table was never proven correct for that altered configuration.
  Whole-value equality is deliberately stricter than "strategy-relevant fields only": it needs no
  judgement about which fields matter, and nothing that changed can slip through.
- No generic rule-dimension matching in this slice. We do not attempt to infer a table from a novel
  combination of rule fields. Unknown or altered configurations are simply unsupported, exactly as
  an unverified ruleset is refused today.

This makes "the profile matches the ruleset" mean "this is one of the exact configurations we have
verified a table for" — the honest, minimal generalization of the current single-ruleset gate.

## Engine Boundary: An Authoritative Compatibility Verdict

One new `CoreCommand`, a compatibility *check* (not a resolution query that TS interprets):

```
CheckStrategyCompatibility { profile_id, session }
```

- Rust reads the active session's canonical ruleset, resolves it via `resolve_profile`, compares
  the result to the lesson-declared `profile_id`, and returns an explicit verdict:
  - `compatible` — the session's ruleset resolves to a verified profile equal to `profile_id`;
  - `profile_mismatch` — the ruleset resolves to a verified profile, but not `profile_id`;
  - `unsupported_ruleset` — the ruleset resolves to no verified profile.
- The authoritative equality/mapping decision is entirely Rust's. TS supplies the typed
  `profile_id` and the session and consumes the verdict; it performs no mapping and no equality
  check of its own.
- No `strategy_action` / grading command in this slice. Grading stays off the wire and is added
  only when the first actual Strategy Table Fundamentals lesson defines the smallest grading API it
  needs.

`profile_id` is a stable typed identifier (`h17`, `s17`) shared as the wire contract between the
curriculum and the engine.

## Lesson Lifecycle Gate (TS Learning Layer)

- `Unit` gains an optional, typed `profileId?: 'h17' | 's17'` — curriculum data only.
- `validate.ts` checks that any declared `profileId` is a known profile identifier. It does **not**
  map profiles to rulesets or judge compatibility — that authority stays in Rust.
- Lifecycle for a unit that declares a `profileId`:
  1. select unit;
  2. start an **explicit-ruleset** session (the unit's session is started with the concrete ruleset
     it intends, not `null`);
  3. call `CheckStrategyCompatibility { profileId, session }` against that active session;
  4. only on a `compatible` verdict is the unit exposed as renderable/gradable;
  5. on `profile_mismatch` or `unsupported_ruleset`, the unit does not render or grade — it surfaces
     a fatal contract error, reusing the existing `LessonState.fatal` channel used for
     missing-contract failures.
- Units that declare no `profileId` (all current Blackjack Basics units) are unaffected and keep
  starting sessions exactly as they do now.

## S17 Table Provenance (Open Until Verified)

The S17 chart cells are **hypotheses until verified**. Before the S17 profile becomes a default,
the rules-researcher agent verifies the complete S17 table — every hard, soft, and pair cell —
against a cited source for the **exact** canonical configuration: 6 deck, DAS, no surrender, dealer
stands on soft 17. Provenance is recorded alongside the H17 chart's provenance.

Expected differences from H17, stated as hypotheses for the researcher to confirm or correct (the
engine has no surrender, so surrender-only differences do not apply):

- Hard 11 vs Ace: H17 Double → S17 Hit.
- Soft 19 (A,8) vs 6: H17 Double (stand fallback) → S17 Stand.

The researcher confirms the full differing-cell set; these two are not assumed complete.

## Verification

### Engine
- Every cell of **both** the H17 and S17 tables is verified against source (extend the existing
  per-cell source-table tests in `strategy_tests.rs` to cover S17); S17 provenance recorded.
- `resolve_profile` returns `H17` for the exact canonical H17 ruleset, `S17` for the exact
  canonical S17 ruleset, and `None` for: any other id, and — critically — a known id whose
  strategy-relevant fields have been modified. This replaces/extends
  `rejects_an_unsupported_ruleset_id`.
- `CheckStrategyCompatibility` returns `compatible`, `profile_mismatch`, and `unsupported_ruleset`
  for the three corresponding session/profile combinations.
- All existing strategy, dealer, and session tests stay green; the H17 path behavior is unchanged.

### Curriculum and gate
- `validate.ts` flags a unit declaring an unknown `profileId`.
- A unit declaring `s17` against an H17 session is refused: it does not render or grade and raises a
  fatal contract error. The matching declaration renders. Both directions are tested end to end
  through the boundary.
- No current (profile-less) unit changes behavior.

## Non-goals

- Authoring any Strategy Table Fundamentals lesson content.
- Exposing `strategy_action` or any grading over the boundary in this slice.
- Generic rule-dimension inference or any ruleset beyond the two canonical configurations.
- A dynamic profile registry or any multi-ruleset "course platform" abstraction.
- Persisted progress, checkpoints, or UI/table-toggle work — later slices.

## Next Design Boundary

The first real Strategy Table Fundamentals lesson (hand classification and table navigation, then
table-open guided practice) is designed in a separate cycle. That cycle defines the smallest
`strategy_action` grading API the actual lesson needs and puts it on the wire — building directly on
the profile abstraction, the canonical rulesets, and the compatibility gate established here. The
Hit-on-16 orientation moment is revisited there.
