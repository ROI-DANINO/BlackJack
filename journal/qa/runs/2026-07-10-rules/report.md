# Rules & Payout Fidelity — QA script run

> QA script-suite role `rules`. Spec: `docs/specs/2026-07-10-qa-script-suite.md`.

- **Verdict:** PASS
- Started: 2026-07-10T12:02:35.076Z
- Finished: 2026-07-10T12:02:45.137Z
- Commit: `06266af`
- Chromium: 149.0.7827.55
- Base URL: http://localhost:4320/
- Rounds re-derived: 90
- Situations covered (≥2×): 12/12
- Coverage gaps: none
- Violations: 0

## Situation coverage

| Situation | Count | ≥2× |
|---|---|---|
| soft player hand | 16 | yes |
| player natural blackjack (3:2) | 3 | yes |
| dealer natural blackjack | 2 | yes |
| player bust | 24 | yes |
| dealer bust | 23 | yes |
| push | 6 | yes |
| same-rank split | 5 | yes |
| mixed ten-value split | 10 | yes |
| double | 17 | yes |
| double after split | 2 | yes |
| dealer-ace insurance note | 5 | yes |
| shoe reshuffle | 2 | yes |

Coverage gaps are reported, not failed: an unreachable situation on the deterministic shoe is expected. Gaps this run: 0.

## Checks

- Rounds independently re-derived (H17 + payout + split-eligibility): **90**
- Total assertions: **514**, failures: **0**

### Violations

None — every re-derivation matched the engine and the JSONL.

