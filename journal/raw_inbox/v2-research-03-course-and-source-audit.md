# V2 Research 03 — Free Course and Source Audit

> Competitive curriculum audit. Do not copy course text or structure.

## Source hierarchy

1. Mathematical/analytical references for strategy and probabilities.
2. Independent calculators or implementations for cross-checking.
3. Training products and free courses for pedagogy, sequencing, and UX patterns.
4. Forums and anecdotes only for discovering misconceptions and real-table friction.

## Audited resources

### Wizard of Odds

URL: https://wizardofodds.com/games/blackjack/

**Best use:** primary practical reference for rule definitions, rule effects, strategy calculators, house-edge tools, and edge cases.

**Strengths:** ruleset sensitivity; explicit notation; calculators; broad advanced coverage.

**Weaknesses as a curriculum:** reference-heavy, dense, and not designed as a progressive interactive course.

**Product implication:** use for validation and provenance, not as the learner-facing sequence.

### BlackjackInfo — Blackjack School

URL: https://www.blackjackinfo.com/blackjack-school/

**Best use:** inspect long-form sequencing from basic play through advantage-play topics and identify prerequisite assumptions.

**Strengths:** lesson progression, exercises/homework style, practical terminology.

**Risks:** older material may assume specific rules, casino conditions, or counting practices. Every mathematical claim still needs independent validation.

### Blackjack Apprenticeship — free materials

URL: https://www.blackjackapprenticeship.com/how-to-count-cards/

**Best use:** training standards, drill decomposition, checkout mentality, transition from Basic Strategy to running count/true count.

**Strengths:** performance-oriented practice and real-table transfer.

**Risks:** optimized for aspiring advantage players rather than casual foundational learners; product funnel may compress nuance.

### QFIT / Casino Vérité ecosystem

URL: https://www.qfit.com/blackjack.htm

**Best use:** benchmark advanced configurability, rule profiles, drills, error reports, and realistic practice modes.

**Strengths:** deep table/rule configuration and serious-player simulation.

**Risks:** advanced scope is far beyond V2; do not imitate its configuration surface prematurely.

### Research papers

- Solowiej (2004): exact strategy computation for arbitrary deck composition — https://arxiv.org/abs/math/0412311
- Asad & Martin (2024): simplified variants and rule changes — https://arxiv.org/abs/2407.08755
- Alasti et al. (2026): curriculum introduction of blackjack actions for RL agents — https://arxiv.org/abs/2604.00076

The 2026 paper concerns machine learning agents, not human pedagogy. Its staged-action result is suggestive but not direct evidence for learner UX.

## Coverage matrix

| Topic | Existing V2 files | External coverage | Recommendation |
|---|---|---|---|
| Core rules and actions | strong | universal | retain, align to active ruleset |
| Soft/hard classification | strong | universal | make separately measurable |
| Basic Strategy chart | strong but S17-specific | strong | generate/verify by profile |
| Rule variation literacy | weak | strong in references/tools | add as staged subject |
| Chart fallback notation | partial | common in good charts | make explicit |
| Full-hand transfer | strong conceptually | trainers vary | vertical-slice requirement |
| Delayed feedback | mentioned | inconsistent | prototype both modes |
| Error taxonomy | partial misconceptions | often weak | product differentiator |
| Mastery/checkouts | conceptual | strongest in serious trainers | define evidence model |
| Table selection/payout literacy | limited | widely covered | later V2/V3 bridge |
| Surrender/ENHC/OBO | absent | important variation | model-ready; implement later |
| Responsible framing | strong | inconsistent | preserve |

## Blind spots found in current material

1. The learning files encode an S17 chart while the current executable game/oracle uses H17.
2. Source notes are document-level rather than claim-level.
3. Several numerical claims are approximate and drawn from mixed-quality secondary sites.
4. “Always” heuristics can become false when surrender, ENHC, composition-dependent play, or count deviations enter scope.
5. Rule notation and table-reading are not yet treated as independent skills.
6. A learner may memorize a chart without learning to verify the active table rules.
7. Mastery thresholds are proposed without observed user data.

## Recommended provenance policy

Every strategy artifact should include:

- exact ruleset fingerprint
- source name and retrieval/version date
- generation method
- independent cross-check source
- reviewer status
- known unsupported cases

Every numeric claim in learner content should link to a claim id in a research ledger. The app can display simplified prose while the repository retains exact provenance.

## What not to import from competitors

- casino-style reward loops that celebrate money won
- giant configuration screens before the learner understands rules
- one universal chart presented without assumptions
- counting content before Basic Strategy transfer is demonstrated
- unsupported promises that skill makes blackjack profitable

## Recommended next research artifacts

- strategy-source ledger by ruleset
- claim provenance ledger
- competitor exercise-pattern catalog
- user-test script for baseline and rule-delta lessons
