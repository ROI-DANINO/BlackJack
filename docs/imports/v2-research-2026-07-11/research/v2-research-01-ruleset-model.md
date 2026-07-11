# V2 Research 01 — Ruleset Model

> Research input, not a final implementation specification.

## Guardrails

- Preserve verified V1 behavior unless evidence justifies change.
- Treat rulesets as first-class data without attempting every blackjack variant now.
- Separate game legality, strategy truth, teaching content, curriculum, learner state, and UI.
- Mark claims as **Verified**, **Repository fact**, **Recommendation**, **Open question**, **Requires code inspection**, or **Deferred**.
- Do not update the roadmap from this document alone.

## Executive conclusion

**Recommendation:** keep one baseline table for early V2 practice, but make the product teach that blackjack is a family of table configurations. The baseline is a pedagogical starting point, not the definition of blackjack.

The engine should distinguish:

1. **Ruleset** — what the table permits and how rounds settle.
2. **Strategy profile** — optimal decisions for one exact supported ruleset or an explicitly documented equivalence class.
3. **Table profile** — learner-facing name, region/context, rule summary, warnings, and linked strategy profile.
4. **Training configuration** — chart visibility, feedback timing, targeted concepts, and exercise constraints.

## Repository facts

- `Ruleset` already contains decks, penetration, H17/S17, payout, split limits, DAS, resplitting aces, one-card split aces, and insurance behavior.
- V1 exposes one constructor: `v1-modern-classic-h17-6d`.
- Basic Strategy rejects every other ruleset id.
- Legal actions are engine-derived, which is the correct boundary.

## Rule taxonomy

### A. Rules that change legality or round flow

- double restrictions: any two cards vs selected totals; after split or not
- split limits and matching rule (same rank vs same value)
- resplit aces; hit split aces; double split aces
- surrender type and timing
- hole-card/peek protocol; European no-hole-card; original-bets-only treatment
- insurance/even-money availability
- dealer soft-17 behavior

These belong in the engine and tests.

### B. Rules that change settlement or EV

- blackjack payout (3:2, 6:5, 1:1)
- surrender settlement
- OBO vs all-bets-lost against dealer blackjack
- dealer-wins-ties variants
- special payouts or side bets

These belong in engine settlement. Some may not change ordinary hit/stand strategy but still materially affect table quality and teaching.

### C. Rules that change Basic Strategy

High-priority dimensions:

- deck count or deck-count band
- H17/S17
- DAS/no-DAS
- surrender availability and type
- hole-card/peek/OBO semantics
- double restrictions
- split and ace restrictions

A strategy profile must declare the exact dimensions it assumes. Never infer strategy compatibility from a friendly table name.

### D. Operational conditions, not Basic Strategy rules

- penetration and cut-card placement
- shuffle method, CSM/ASM/manual shoe
- number of seats and table pace
- minimum/maximum bet

These matter later for counting, realism, and UX, but should not be mixed into the Basic Strategy lookup key unless they actually alter strategy.

## Recommended baseline

**Recommendation:** retain the current 6-deck H17, DAS, 3:2, peek, no-surrender setup as the first executable baseline because it is already implemented and QA-tested. Do not present it as universal or uniquely correct.

Early lesson wording should say:

- “This table uses the training rules shown here.”
- “Other tables can differ; the app will teach you how to read those differences.”
- “Basic Strategy is matched to the active table rules.”

## Progressive ruleset curriculum

1. **Foundations:** actions, hand values, dealer upcard, outcomes, and the active table badge.
2. **Baseline Strategy:** use one verified chart without variation noise.
3. **Read the table:** teach H17/S17, payout, decks, DAS, surrender, and hole-card notation.
4. **Delta lessons:** show only the cells or behaviors changed by one rule dimension.
5. **Mixed-table practice:** learner identifies the active table and applies the matching profile.
6. **Table selection literacy:** distinguish strategy-affecting rules from rules that mainly affect house edge or counting.

## Minimum supported matrix

For V2, do not promise every combination. A disciplined first matrix could be:

- current 6D H17 DAS no-surrender peek 3:2 baseline
- 6D S17 DAS no-surrender peek 3:2 comparison profile
- one surrender-enabled profile after surrender is implemented

This provides two real strategy uses before generalizing the oracle registry too far.

## Data-shape direction

```text
RulesetDefinition
  id
  schema_version
  rules
  capabilities

StrategyProfile
  id
  ruleset_fingerprint
  source_provenance
  action_table_version
  supported_actions

TableProfile
  id
  display_name
  ruleset_id
  strategy_profile_id
  learner_summary
  warnings
```

Prefer a deterministic fingerprint over trusting a manually typed id. The fingerprint should include every field that can affect legality, settlement, or strategy.

## Validation requirements

- A strategy profile cannot load when its fingerprint differs from the active ruleset.
- Every exposed ruleset must either have a verified strategy profile or clearly disable strategy coaching.
- Fallback actions (`double else hit`, `double else stand`, surrender fallbacks) must be represented explicitly.
- Tests must compare profile recommendations with legal actions across all cells and relevant states.

## Deferred

- side-bet variants
- Spanish 21, Blackjack Switch, Push 22, and other nonstandard games
- composition-dependent strategy
- count-index deviations
- casino database or live table-rule catalog

## Sources for verification

- Wizard of Odds, Blackjack and strategy calculators: https://wizardofodds.com/games/blackjack/
- Wizard of Odds, rule variations and house-edge tools: https://wizardofodds.com/games/blackjack/calculator/
- Asad & Martin, *Basic Strategy for some Simplified Blackjack Variants* (2024): https://arxiv.org/abs/2407.08755
- Solowiej, *Finding Blackjack's Optimal Strategy in Real-time and Player's Expected Win* (2004): https://arxiv.org/abs/math/0412311

## Open questions for code inspection

- Which missing ruleset fields are already implicit in round flow?
- Does current settlement assume peek/all-bets behavior in a way that blocks ENHC/OBO?
- Is payout represented safely enough as `f32` for versioned contracts and exact settlement?
- Should strategy profiles be compiled Rust data, generated artifacts, or loaded validated data?
