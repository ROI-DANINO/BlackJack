# Breakit run report

> Adversarial E2E abuse harness. Spec: `docs/specs/2026-07-10-breakit-adversarial-harness.md`.

- **Verdict:** PASS — no invariant broke
- Started: 2026-07-10T06:31:15.873Z
- Finished: 2026-07-10T06:31:52.643Z
- Commit: `7e4a710`
- Chromium: 149.0.7827.55
- Base URL: http://localhost:4319/
- Prod-build hook absent (tree-shaken): PASS

## Attacks

| # | Attack | Kind | Verdict | Failed invariants |
|---|--------|------|---------|-------------------|
| 1 | 1-deal-spam | realistic | PASS | 0 |
| 2 | 2-download-spam | realistic | PASS | 0 |
| 3 | 3-new-session-spam | realistic | PASS | 0 |
| 4 | 4-interleave | realistic | PASS | 0 |
| 5 | 5-grind | realistic | PASS | 0 |
| 6 | 6-refresh-mid-write | realistic | PASS | 0 |
| 7 | 7-two-tabs | realistic | PASS | 0 |
| 8 | 8-concurrent-calls | injected | PASS | 0 |
| 9 | 9-malformed-envelopes | injected | PASS | 0 |
| 10 | 10-note-injection | injected | PASS | 0 |
| 11 | 11-download-during-write | injected | PASS | 0 |
| 12 | 12-seed-determinism | injected | PASS | 0 |

## Details

### 1-deal-spam — PASS
- Repro: start → 6 same-tick Deal clicks → stand out → 2 rounds → download

- PASS — attack completed without throwing
- PASS — no page crash
- PASS — no hang (within per-attack timeout)
- PASS — robustness: no console errors or warnings
- PASS — jsonl[0]: well-formed (one valid record per line)
- PASS — history: exactly one session_header per session_id
- PASS — history: every round has a matching session_header
- PASS — history: no duplicate round_index within a session
- PASS — history: round_index strictly increasing per session
- PASS — session flush: rounds are contiguous under their header (QA-007 order)
- PASS — money conservation: bankroll chains and deltas balance
- PASS — card conservation: no card dealt twice within a shoe
- PASS — seed integrity: on-screen seed matches session_header.seed
- PASS — no stuck UI: a fresh Deal still resolves after the attack

### 2-download-spam — PASS
- Repro: start → 1 round (buffered) → 3 same-tick Download clicks

- PASS — attack completed without throwing
- PASS — no page crash
- PASS — no hang (within per-attack timeout)
- PASS — robustness: no console errors or warnings
- PASS — jsonl[0]: well-formed (one valid record per line)
- PASS — history: exactly one session_header per session_id
- PASS — history: every round has a matching session_header
- PASS — history: no duplicate round_index within a session
- PASS — history: round_index strictly increasing per session
- PASS — session flush: rounds are contiguous under their header (QA-007 order)
- PASS — money conservation: bankroll chains and deltas balance
- PASS — card conservation: no card dealt twice within a shoe
- PASS — jsonl[1]: well-formed (one valid record per line)
- PASS — history: exactly one session_header per session_id
- PASS — history: every round has a matching session_header
- PASS — history: no duplicate round_index within a session
- PASS — history: round_index strictly increasing per session
- PASS — session flush: rounds are contiguous under their header (QA-007 order)
- PASS — money conservation: bankroll chains and deltas balance
- PASS — card conservation: no card dealt twice within a shoe
- PASS — jsonl[2]: well-formed (one valid record per line)
- PASS — history: exactly one session_header per session_id
- PASS — history: every round has a matching session_header
- PASS — history: no duplicate round_index within a session
- PASS — history: round_index strictly increasing per session
- PASS — session flush: rounds are contiguous under their header (QA-007 order)
- PASS — money conservation: bankroll chains and deltas balance
- PASS — card conservation: no card dealt twice within a shoe
- PASS — no stuck UI: a fresh Deal still resolves after the attack

### 3-new-session-spam — PASS
- Repro: start → 1 round (buffered) → New session ×3 → download; assert flush order + seed changes

- PASS — attack completed without throwing
- PASS — no page crash
- PASS — no hang (within per-attack timeout)
- PASS — robustness: no console errors or warnings
- PASS — jsonl[0]: well-formed (one valid record per line)
- PASS — history: exactly one session_header per session_id
- PASS — history: every round has a matching session_header
- PASS — history: no duplicate round_index within a session
- PASS — history: round_index strictly increasing per session
- PASS — session flush: rounds are contiguous under their header (QA-007 order)
- PASS — money conservation: bankroll chains and deltas balance
- PASS — card conservation: no card dealt twice within a shoe
- PASS — seed integrity: on-screen seed matches session_header.seed
- PASS — seed integrity: New session changes the seed

### 4-interleave — PASS
- Repro: loop×4: round → same-tick Deal+Download → New session → download

- PASS — attack completed without throwing
- PASS — no page crash
- PASS — no hang (within per-attack timeout)
- PASS — robustness: no console errors or warnings
- PASS — jsonl[0]: well-formed (one valid record per line)
- PASS — history: exactly one session_header per session_id
- PASS — history: every round has a matching session_header
- PASS — history: no duplicate round_index within a session
- PASS — history: round_index strictly increasing per session
- PASS — session flush: rounds are contiguous under their header (QA-007 order)
- PASS — money conservation: bankroll chains and deltas balance
- PASS — card conservation: no card dealt twice within a shoe
- PASS — jsonl[1]: well-formed (one valid record per line)
- PASS — history: exactly one session_header per session_id
- PASS — history: every round has a matching session_header
- PASS — history: no duplicate round_index within a session
- PASS — history: round_index strictly increasing per session
- PASS — session flush: rounds are contiguous under their header (QA-007 order)
- PASS — money conservation: bankroll chains and deltas balance
- PASS — card conservation: no card dealt twice within a shoe
- PASS — jsonl[2]: well-formed (one valid record per line)
- PASS — history: exactly one session_header per session_id
- PASS — history: every round has a matching session_header
- PASS — history: no duplicate round_index within a session
- PASS — history: round_index strictly increasing per session
- PASS — session flush: rounds are contiguous under their header (QA-007 order)
- PASS — money conservation: bankroll chains and deltas balance
- PASS — card conservation: no card dealt twice within a shoe
- PASS — jsonl[3]: well-formed (one valid record per line)
- PASS — history: exactly one session_header per session_id
- PASS — history: every round has a matching session_header
- PASS — history: no duplicate round_index within a session
- PASS — history: round_index strictly increasing per session
- PASS — session flush: rounds are contiguous under their header (QA-007 order)
- PASS — money conservation: bankroll chains and deltas balance
- PASS — card conservation: no card dealt twice within a shoe
- PASS — jsonl[4]: well-formed (one valid record per line)
- PASS — history: exactly one session_header per session_id
- PASS — history: every round has a matching session_header
- PASS — history: no duplicate round_index within a session
- PASS — history: round_index strictly increasing per session
- PASS — session flush: rounds are contiguous under their header (QA-007 order)
- PASS — money conservation: bankroll chains and deltas balance
- PASS — card conservation: no card dealt twice within a shoe
- PASS — no stuck UI: a fresh Deal still resolves after the attack

### 5-grind — PASS
- Repro: grind 70 rounds (targets ≥1 shoe reshuffle) → download

- PASS — attack completed without throwing
- PASS — no page crash
- PASS — no hang (within per-attack timeout)
- PASS — robustness: no console errors or warnings
- PASS — jsonl[0]: well-formed (one valid record per line)
- PASS — history: exactly one session_header per session_id
- PASS — history: every round has a matching session_header
- PASS — history: no duplicate round_index within a session
- PASS — history: round_index strictly increasing per session
- PASS — session flush: rounds are contiguous under their header (QA-007 order)
- PASS — money conservation: bankroll chains and deltas balance
- PASS — card conservation: no card dealt twice within a shoe
- PASS — seed integrity: on-screen seed matches session_header.seed
- PASS — no stuck UI: a fresh Deal still resolves after the attack

### 6-refresh-mid-write — PASS
- Repro: start → 1 round buffered → reload → fresh session plays cleanly (integrity of post-reload session)

- PASS — attack completed without throwing
- PASS — no page crash
- PASS — no hang (within per-attack timeout)
- PASS — robustness: no console errors or warnings
- PASS — jsonl[0]: well-formed (one valid record per line)
- PASS — history: exactly one session_header per session_id
- PASS — history: every round has a matching session_header
- PASS — history: no duplicate round_index within a session
- PASS — history: round_index strictly increasing per session
- PASS — session flush: rounds are contiguous under their header (QA-007 order)
- PASS — money conservation: bankroll chains and deltas balance
- PASS — card conservation: no card dealt twice within a shoe
- PASS — seed integrity: on-screen seed matches session_header.seed
- PASS — no stuck UI: a fresh Deal still resolves after the attack

### 7-two-tabs — PASS
- Repro: two tabs start sessions and play 3 interleaved rounds each; each tab exports independently

- PASS — attack completed without throwing
- PASS — no page crash
- PASS — no hang (within per-attack timeout)
- PASS — robustness: no console errors or warnings
- PASS — jsonl[0]: well-formed (one valid record per line)
- PASS — history: exactly one session_header per session_id
- PASS — history: every round has a matching session_header
- PASS — history: no duplicate round_index within a session
- PASS — history: round_index strictly increasing per session
- PASS — session flush: rounds are contiguous under their header (QA-007 order)
- PASS — money conservation: bankroll chains and deltas balance
- PASS — card conservation: no card dealt twice within a shoe
- PASS — jsonl[1]: well-formed (one valid record per line)
- PASS — history: exactly one session_header per session_id
- PASS — history: every round has a matching session_header
- PASS — history: no duplicate round_index within a session
- PASS — history: round_index strictly increasing per session
- PASS — session flush: rounds are contiguous under their header (QA-007 order)
- PASS — money conservation: bankroll chains and deltas balance
- PASS — card conservation: no card dealt twice within a shoe

### 8-concurrent-calls — PASS
- Repro: two un-awaited deal()/act() in one tick; assert history stays consistent

- PASS — attack completed without throwing
- PASS — no page crash
- PASS — no hang (within per-attack timeout)
- PASS — robustness: no console errors or warnings
- PASS — jsonl[0]: well-formed (one valid record per line)
- PASS — history: exactly one session_header per session_id
- PASS — history: every round has a matching session_header
- PASS — history: no duplicate round_index within a session
- PASS — history: round_index strictly increasing per session
- PASS — session flush: rounds are contiguous under their header (QA-007 order)
- PASS — money conservation: bankroll chains and deltas balance
- PASS — card conservation: no card dealt twice within a shoe
- PASS — no stuck UI: a fresh Deal still resolves after the attack

### 9-malformed-envelopes — PASS
- Repro: illegal/out-of-turn/empty actions + raw malformed core envelopes → then a clean round

- PASS — attack completed without throwing
- PASS — no page crash
- PASS — no hang (within per-attack timeout)
- PASS — robustness: no console errors or warnings
- PASS — jsonl[0]: well-formed (one valid record per line)
- PASS — history: exactly one session_header per session_id
- PASS — history: every round has a matching session_header
- PASS — history: no duplicate round_index within a session
- PASS — history: round_index strictly increasing per session
- PASS — session flush: rounds are contiguous under their header (QA-007 order)
- PASS — money conservation: bankroll chains and deltas balance
- PASS — card conservation: no card dealt twice within a shoe
- PASS — no stuck UI: a fresh Deal still resolves after the attack

### 10-note-injection — PASS
- Repro: inject newlines/control-chars/fake-record/20k-char notes; assert JSONL stays one valid record per line

- PASS — attack completed without throwing
- PASS — no page crash
- PASS — no hang (within per-attack timeout)
- PASS — robustness: no console errors or warnings
- PASS — jsonl[0]: well-formed (one valid record per line)
- PASS — history: exactly one session_header per session_id
- PASS — history: every round has a matching session_header
- PASS — history: no duplicate round_index within a session
- PASS — history: round_index strictly increasing per session
- PASS — session flush: rounds are contiguous under their header (QA-007 order)
- PASS — money conservation: bankroll chains and deltas balance
- PASS — card conservation: no card dealt twice within a shoe

### 11-download-during-write — PASS
- Repro: loop×4: resolve round (buffered) → same-tick deal()+downloadText() race → assert no dup/lost line

- PASS — attack completed without throwing
- PASS — no page crash
- PASS — no hang (within per-attack timeout)
- PASS — robustness: no console errors or warnings
- PASS — jsonl[0]: well-formed (one valid record per line)
- PASS — history: exactly one session_header per session_id
- PASS — history: every round has a matching session_header
- PASS — history: no duplicate round_index within a session
- PASS — history: round_index strictly increasing per session
- PASS — session flush: rounds are contiguous under their header (QA-007 order)
- PASS — money conservation: bankroll chains and deltas balance
- PASS — card conservation: no card dealt twice within a shoe
- PASS — jsonl[1]: well-formed (one valid record per line)
- PASS — history: exactly one session_header per session_id
- PASS — history: every round has a matching session_header
- PASS — history: no duplicate round_index within a session
- PASS — history: round_index strictly increasing per session
- PASS — session flush: rounds are contiguous under their header (QA-007 order)
- PASS — money conservation: bankroll chains and deltas balance
- PASS — card conservation: no card dealt twice within a shoe
- PASS — jsonl[2]: well-formed (one valid record per line)
- PASS — history: exactly one session_header per session_id
- PASS — history: every round has a matching session_header
- PASS — history: no duplicate round_index within a session
- PASS — history: round_index strictly increasing per session
- PASS — session flush: rounds are contiguous under their header (QA-007 order)
- PASS — money conservation: bankroll chains and deltas balance
- PASS — card conservation: no card dealt twice within a shoe
- PASS — jsonl[3]: well-formed (one valid record per line)
- PASS — history: exactly one session_header per session_id
- PASS — history: every round has a matching session_header
- PASS — history: no duplicate round_index within a session
- PASS — history: round_index strictly increasing per session
- PASS — session flush: rounds are contiguous under their header (QA-007 order)
- PASS — money conservation: bankroll chains and deltas balance
- PASS — card conservation: no card dealt twice within a shoe
- PASS — jsonl[4]: well-formed (one valid record per line)
- PASS — history: exactly one session_header per session_id
- PASS — history: every round has a matching session_header
- PASS — history: no duplicate round_index within a session
- PASS — history: round_index strictly increasing per session
- PASS — session flush: rounds are contiguous under their header (QA-007 order)
- PASS — money conservation: bankroll chains and deltas balance
- PASS — card conservation: no card dealt twice within a shoe

### 12-seed-determinism — PASS
- Repro: two fresh sessions, same fixed seed + same actions → dealt-card sequences must be identical

- PASS — attack completed without throwing
- PASS — no page crash
- PASS — no hang (within per-attack timeout)
- PASS — robustness: no console errors or warnings
- PASS — jsonl[0]: well-formed (one valid record per line)
- PASS — history: exactly one session_header per session_id
- PASS — history: every round has a matching session_header
- PASS — history: no duplicate round_index within a session
- PASS — history: round_index strictly increasing per session
- PASS — session flush: rounds are contiguous under their header (QA-007 order)
- PASS — money conservation: bankroll chains and deltas balance
- PASS — card conservation: no card dealt twice within a shoe
- PASS — seed integrity: same seed ⇒ identical shoe (determinism)
