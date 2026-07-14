# Strategy Profile Foundation Implementation Plan

> For agentic workers: REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

Goal: Add two verified canonical Basic Strategy profiles and refuse a profile-declared lesson whose active session does not exactly match its profile.

Architecture: Rust maps a complete canonical Ruleset to an exhaustive StrategyProfile enum and returns compatibility verdicts through the JSON boundary. TypeScript carries only a lesson declaration, asks Rust for the verdict, and uses the existing fatal lesson state. Current profile-less Blackjack Basics units retain ruleset: null behavior.

Tech Stack: Rust plus serde JSON/WASM; TypeScript plus Vitest; existing QA scripts.

## Global Constraints

- Only h17 and s17; no registry, third profile, generic rule inference, strategy action/grading command, lesson content, persistence, or app-shell work.
- Resolve only through whole-struct equality with v1_h17_ruleset() or v1_s17_ruleset(); id equality is invalid.
- Verify every S17 source cell for 6 decks, S17, double-any-two, DAS, no surrender, and peek before encoding it.
- Rust owns mapping and compatibility. TypeScript must not infer either from ids.
- Existing profile-less units keep their exact runtime behavior.
- Close with ledger-driven feature QA under docs/specs/qa-playtest-process.md.

---

## File structure

| File | Responsibility |
|---|---|
| docs/superpowers/specs/2026-07-12-strategy-profile-foundation-design.md | S17 provenance: source, date, rules, all rows, independent check, confirmed differences. |
| crates/blackjack-core/src/rules.rs | Canonical S17 ruleset. |
| crates/blackjack-core/src/strategy.rs | Profiles, whole-struct resolver, and profile-selected charts. |
| crates/blackjack-core/src/boundary.rs | Compatibility command and verdict. |
| crates/blackjack-core/tests/{strategy_tests,boundary_tests,rules_tests,golden_fixtures}.rs | Table, resolution, playability, and wire proof. |
| crates/blackjack-core/tests/fixtures/response_strategy_compatibility.json | Rust-generated golden response. |
| web/src/bridge/{types,validate,contract.test}.ts | Passive typed wire contract. |
| web/src/learn/{types,validate,engine,controller}.{ts,test.ts} | Profile declaration and fatal lifecycle gate. |
| journal/qa/{ledger.md,runs/2026-07-15-strategy-profile-foundation/report.md} | Feature-QA evidence. |

### Task 1: Verify and freeze the S17 source table

Files:
- Modify: docs/superpowers/specs/2026-07-12-strategy-profile-foundation-design.md
- Test: cited-source review and independent cross-check

Consumes: the approved canonical rule vector.

Produces: complete reviewed S17 transcription: 14 hard, 8 soft, 10 pair rows; dealer columns 2,3,4,5,6,7,8,9,T,A; engine codes H/S/D/X/P.

- [ ] Step 1: Open BlackjackInfo Basic Strategy Engine with numdecks=6, soft17=s17, dbl=all, das=yes, surr=no, and peek=yes. Confirm the heading shows six decks, S17, DAS, and no surrender; record final URL and capture date.
- [ ] Step 2: Transcribe all cells, including hard 5-8 and 18+, into engine codes. Compare every row against the independent source named by the prior oracle design. Resolve any discrepancy before code; never infer a cell from H17.
- [ ] Step 3: Replace the design open-provenance section with URL, date, exact rules, all rows, independent check, and complete confirmed H17-to-S17 difference set.
- [ ] Step 4: Run git diff --check and review the design diff. Expected: no missing row or unsupported hypothesis.
- [ ] Step 5: Commit with message: docs: verify S17 strategy table provenance.

### Task 2: Add canonical S17 rules and exact profile resolution

Files:
- Modify: crates/blackjack-core/src/rules.rs
- Modify: crates/blackjack-core/src/strategy.rs
- Modify: crates/blackjack-core/tests/strategy_tests.rs
- Modify: crates/blackjack-core/tests/rules_tests.rs

Consumes: verified profile ids and Ruleset PartialEq.

Produces: v1_s17_ruleset(), public StrategyProfile::H17/S17, and resolve_profile(&Ruleset) -> Option<StrategyProfile>.

- [ ] Step 1: Write failing tests: exact H17 resolves H17, exact S17 resolves S17, H17 with decks changed to eight resolves None, and H17 id changed resolves None. Assert S17 differs from H17 only in id and dealer_soft_17; a soft 17 does not hit under S17.
- [ ] Step 2: Run cargo test -p blackjack-core --test strategy_tests resolves_only_exact_canonical_rulesets -- --exact. Expected: compilation failure before the API exists.
- [ ] Step 3: Clone v1_h17_ruleset into v1_s17_ruleset changing only id to v1-modern-classic-s17-6d and dealer_soft_17 to Stand. Derive Clone, Copy, Debug, Eq, PartialEq, serde Deserialize, and serde Serialize on the snake-case StrategyProfile enum. Implement resolve_profile by comparison against complete canonical Ruleset values, returning None otherwise.
- [ ] Step 4: Run cargo test -p blackjack-core --test strategy_tests and cargo test -p blackjack-core --test rules_tests. Expected: PASS, including id and non-id alteration rejection.
- [ ] Step 5: Commit: feat(core): add canonical strategy profiles.

### Task 3: Select the verified chart by profile and prove every cell

Files:
- Modify: crates/blackjack-core/src/strategy.rs
- Modify: crates/blackjack-core/tests/strategy_tests.rs

Consumes: Task-1 S17 transcription and Task-2 resolver.

Produces: profile-selected lookup and exhaustive source-cell proof for both profiles.

- [ ] Step 1: Change test recommend() helper to receive a Ruleset. Run every hard, soft, and pair row against both canonical rulesets; retain natural-blackjack, no-action, split-21, ten-value, unavailable Double, and unavailable Split tests.
- [ ] Step 2: Run cargo test -p blackjack-core --test strategy_tests recommends_every_s17 -- --nocapture. Expected: fail because the current H17 id gate rejects S17.
- [ ] Step 3: Move the tables under an exhaustive StrategyProfile tables() match. Resolve first; if None, keep the present basic strategy unavailable error. Share chart parsing, pair fallback, and legal-action fallback. Encode the exact Task-1 rows, never a difference patch.
- [ ] Step 4: Run cargo test -p blackjack-core --test strategy_tests and cargo test -p blackjack-core. Expected: PASS, with 320 tested cells per profile.
- [ ] Step 5: Commit: feat(core): select basic strategy by verified profile.

### Task 4: Add Rust authoritative compatibility verdict

Files:
- Modify: crates/blackjack-core/src/boundary.rs
- Modify: crates/blackjack-core/tests/boundary_tests.rs
- Modify: crates/blackjack-core/tests/golden_fixtures.rs
- Create: crates/blackjack-core/tests/fixtures/response_strategy_compatibility.json

Consumes: StrategyProfile, resolve_profile, SessionState.ruleset.

Produces: check_strategy_compatibility command and compatible, profile_mismatch, unsupported_ruleset responses.

- [ ] Step 1: Write failing tests using canonical H17 session, canonical S17 session, and a valid altered-ruleset session. Assert all three response variants and an ok JSON envelope of type strategy_compatibility.
- [ ] Step 2: Add CoreCommand::CheckStrategyCompatibility { profile_id: StrategyProfile, session: SessionState }; add serde snake-case StrategyCompatibility. In handle_command, resolve session.ruleset: equal is compatible, other known profile is mismatch, None is unsupported. Do not accept a client ruleset or provide a resolver query.
- [ ] Step 3: Extend golden_fixtures.rs to generate a compatible response fixture from Rust, rather than hand authoring it.
- [ ] Step 4: Run cargo test -p blackjack-core --test boundary_tests and cargo test -p blackjack-core --test golden_fixtures. Expected: PASS.
- [ ] Step 5: Commit: feat(core): expose strategy compatibility verdict.

### Task 5: Make TypeScript a validated passive consumer

Files:
- Modify: web/src/bridge/types.ts
- Modify: web/src/bridge/validate.ts
- Modify: web/src/bridge/contract.test.ts

Consumes: Task-4 command, response, fixture.

Produces: StrategyProfileId h17/s17, StrategyCompatibility literals, and malformed verdict rejection.

- [ ] Step 1: Add failing fixture test for an ok strategy_compatibility compatible response. Add negative data maybe test that must throw BridgeError.
- [ ] Step 2: Add the command using profile_id/session and response union. Extend parseCliOutput so the response is accepted only when data is compatible, profile_mismatch, or unsupported_ruleset. Do not add any TS ruleset-to-profile helper.
- [ ] Step 3: Run npm --prefix web run test -- bridge/contract.test.ts and npm --prefix web run test. Expected: PASS.
- [ ] Step 4: Commit: feat(web): carry strategy compatibility verdict.

### Task 6: Gate declared-profile lessons before render

Files:
- Modify: web/src/learn/types.ts
- Modify: web/src/learn/validate.ts
- Modify: web/src/learn/engine.ts
- Modify: web/src/learn/controller.ts
- Modify: web/src/learn/validate.test.ts
- Modify: web/src/learn/engine.test.ts
- Modify: web/src/learn/controller.test.ts
- Modify: web/src/learn/content/blackjack-basics.test.ts

Consumes: Task-5 bridge literals and verdict.

Produces: optional Unit.profileId, authoring validation, explicit canonical session setup, fatal no-render mismatch/unsupported path.

- [ ] Step 1: Add failing tests: invalid runtime profile declaration reports unit basics: unknown strategy profile: bad; matching H17 reaches step zero; declared S17 against explicit H17 gives fatal and null step; altered known-id ruleset gives unsupported fatal; profile-less Blackjack Basics starts with ruleset null and remains playable.
- [ ] Step 2: Add profileId?: StrategyProfileId to Unit; validate literal membership only.
- [ ] Step 3: Preserve startArranged/startLive defaults. Add adapter methods whose explicit profile argument selects a closed canonical Ruleset payload for every declared-profile arranged or live session, plus checkStrategyCompatibility(profileId, session), returning Rust’s verdict unchanged.
- [ ] Step 4: At begin(), profile-less keeps enterStep(0). A declared profile starts one explicit probe session, checks compatibility, and enters step zero only when compatible. Every later hand-step session for that unit uses the same explicit profile argument. Mismatch and unsupported set an actionable LessonState.fatal before any step, legal action, render, or grading path. Reuse fatal; do not change current curriculum content.
- [ ] Step 5: Run npm --prefix web run test -- learn/validate.test.ts learn/engine.test.ts learn/controller.test.ts learn/content/blackjack-basics.test.ts and npm --prefix web run test. Expected: PASS.
- [ ] Step 6: Commit: feat(learn): gate profile-declared lessons by ruleset.

### Task 7: Close scoped feature QA and reconcile ledger

Files:
- Create: journal/qa/runs/2026-07-15-strategy-profile-foundation/report.md
- Modify: journal/qa/ledger.md

Consumes: final code and deterministic evidence.

Produces: scoped PASS/FAIL verdict, coverage commit references, triaged findings.

- [ ] Step 1: Compare git diff 8952828..HEAD for crates, web/src/learn, and web/src/bridge. Deep-test engine, UI/wire, and Blackjack Basics learning; smoke-test proven payment/flow. Skip PX unless web/src/app changes.
- [ ] Step 2: Run cargo fmt --all -- --check; cargo clippy -p blackjack-core -- -D warnings; cargo test -p blackjack-core; npm --prefix web run test; npm --prefix web run qa. Expected: all zero. If Rust makes the WASM freshness guard fail, run npm --prefix web run build:wasm then rerun the blocked check.
- [ ] Step 3: Using actual WASM transport, record compatible to renderable, mismatch to pre-render fatal, unsupported to pre-render fatal, and profile-less Basics still playable.
- [ ] Step 4: Write commands, SHA, deep/smoke scope, focused evidence, findings, and verdict. Update changed ledger rows to final passing commit; create QA-NNN only for a real finding.
- [ ] Step 5: Commit: test(qa): close strategy profile foundation.

## Plan self-review

- Tasks 1-3 cover provenance, both canonical rulesets, exact resolution, and source cells.
- Tasks 4-6 preserve Rust authority across the wire and exercise compatible, mismatch, unsupported, and profile-less paths.
- Task 7 closes ledger-driven feature QA.
- No task creates a generic platform, grading, curriculum content, persistence, or shell changes.
- The sole pre-code gate is the deliberate S17 source verification required by the approved design.
