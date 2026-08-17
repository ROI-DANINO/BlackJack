# Decisions — ADR Sink

> One terse entry per real decision: *what* we chose and *why*, appended by `codex-end` at each
> milestone/cycle close. Newest at the bottom.

| Date | Decision | Why |
|------|----------|-----|
| 2026-07-07 | V1 simulator core starts in Rust; TypeScript owns browser UI/app shell; Python owns research/data tooling. | Blackjack is simulation-heavy, and starting the durable card/shoe/round/betting core in Rust avoids a likely TypeScript-to-Rust migration when deterministic high-volume training and analysis arrive. |
| 2026-07-07 | Extract blackjack into its own standalone git repo; the Projects spine gitignores it. | It had been wrongly committed into the spine; the spine constitution says sub-repos are their own git repos. `git subtree split` preserved all 25 commits; spine safety tag `backup/spine-decontam-20260707`. |
| 2026-07-07 | Core money is integer minor units; 3:2 requires even wager units; the JSON boundary shares the same minor-unit state (no translation layer). | Truncating 3:2 payouts at the boundary broke the exact-money contract; keeping one representation end-to-end avoids rounding slop in training bankrolls. |
| 2026-07-07 | Dealer plays out only when a hand still contests it (not bust, not natural); reshuffle is an explicit recovery command; custom rulesets are validated at session creation. | Final-review fixes: drawing after all-terminal poisoned card-counting logs; penetration dead-ended Free Play; unvalidated rulesets could panic/overflow settlement. |
| 2026-07-09 | Deliver the core to the browser via client-side WASM (not a Node/CLI server). | The core is a pure stateless `command→state` fn and the client owns state, so a server holds nothing; WASM re-hosts the identical compiled Rust, keeps determinism, and is static-deployable (a trainer should become a static site). |
| 2026-07-09 | Hand-author the TS wire types, guarded by Rust-emitted golden fixtures (incl. a played-to-resolution fixture) + a compile-time-typed contract test, instead of generating them with ts-rs. | Preserves the anti-drift guarantee (a rename fails the contract test at compile time) while removing ts-rs tool-integration risk on a frozen boundary; every step stays exactly specifiable. |
| 2026-07-09 | Width-safe RNG modulo in rng.rs (`(next_u64() % (upper as u64)) as usize`). | On wasm32 `usize` is 32-bit, so the old truncate-before-modulo dealt a different shoe than native — silently breaking cross-target determinism/replay while every native test stayed green. Behavior-preserving on 64-bit. |
| 2026-07-09 | History JSONL exports live in a dedicated gitignored `data/history/` (tracked README), not `journal/raw/_inbox`. | The journal inbox is for research notes folded into docs; gameplay data is a different artifact class and (public repo) must stay uncommitted. |
| 2026-07-09 | Per-hand notes attach-on-Deal: buffer the resolved round, flush it with an optional harness `note` field (string\|null) on the next Deal / on Download. | You usually know what's noteworthy after seeing the outcome; buffering lets the note ride with the correct hand without changing the stateless Rust core (note is a harness annotation like session_id/ts). |
| 2026-07-09 | Free Play auto-reshuffles (+ notice) at the penetration boundary rather than exposing a manual reshuffle button. | Smoothest for playtesting and removes the dead-end; the core already supports reshuffle-for-next-shoe, so the UI just wires it. Closed the accepted Fire craft-minor. |
| 2026-07-09 | V1 keeps insurance as auto-decline and only surfaces the notice; mixed 10/J/Q/K split is treated as rules correctness. | The locked V1 ruleset has `insurance_auto_decline: true`, so player-taken insurance would require side-bet settlement and a ruleset decision; casinos allow splitting equal 10-value cards, so the split fix belongs in the shared core rule gate. |
| 2026-07-10 | Basic Strategy is a ruleset-keyed Rust oracle, not UI data or an AI decision. | One verified answer key keeps drills, hints, and later review consistent; legal-action fallbacks preserve real engine constraints without a runtime solver. |
| 2026-07-11 | Keep the stiff-16 Hit hint in Blackjack Foundations as bust-risk orientation, not strategy advice. | The first guided drill teaches vocabulary and consequences without grading; Strategy Table Fundamentals will introduce recommendations later and should explicitly contextualize this moment. |
| 2026-07-12 | Adopt the three-tracks framing (T1 Core / T2 Learning [architecture + pedagogy] / T3 Visual Shell) with independent maturity as the mental model, replacing V1/V2/V3 versioning. | The product is three continuing layers maturing at different rates, not sequential versions; keeps foundation work scoped to expensive-to-retrofit seams only. Mental lens, not a restructure. Spec: `docs/superpowers/specs/2026-07-12-foundation-and-tracks-design.md`. |
| 2026-07-12 | Cloud posture: game stays client-authoritative WASM; a future hosted deployment is **auth (accounts) + progress persistence + cross-device sync** only, B2C (individual learners). Server game-authority (anti-cheat / leaderboards / certification) deferred but reserved for free by the deterministic pure-reducer engine (trigger: leaderboards/certification). | Hosting a client-side app later is a static deploy + thin backend; only accounts + progress-sync need a server. Reserve now: stable identity/account key before the first durable `AttemptRecord` write, `ProgressStore` port, `schema_version` on progress records. Not reserved: server engine, shoe-redaction, replay-parity, org/tenant fields. |
| 2026-07-12 | Reframe `stack-boundaries.md` from a fixed Rust/TS/Python roster into a Tool & Runtime Admission Protocol (any tool admissible via a written justification gate; roster = current answers, not law). | Roi wants agility (right tool for the job) without anarchy; the gate keeps determinism/boundary/freshness discipline. Doc-only; supersedes the "V1 starts in Rust / 3-language" lock as a hard rule. |
| 2026-07-12 | Ratify `LessonState` as the target sole Learning→Product surface — the shell should not dereference the raw engine `session` field to render; the current leak remains a documented exception until its first real consumer defines the semantic projection. | `Lesson.tsx` currently reads raw `RoundState` to draw hands, coupling the shell to Core round shape. The target invariant prevents that leak from becoming the permanent product boundary without forcing a speculative projection before a consumer exists. |
| 2026-07-15 | Preserve imported future-guidance notes as provenance; promote only evidence-backed durable guidance, with named technologies remaining candidates until a real consumer triggers research and admission. | This keeps useful future direction findable without allowing raw inbox instructions, duplicated decisions, or premature stack choices to outrank code, verified QA, and authoritative specs. |
| 2026-07-15 | Use one marker-gated, root-written Markdown Agent Kanban in `journal/ops/tasks.md`; `Type` describes work while independent `Mode` controls write WIP, and global start/next/end skills defer to the board's local policy. | One tracked authority keeps current work resumable and reviewable without a second database or multi-writer locking; marker-gating preserves legacy projects, and the local policy keeps project rules portable. |
| 2026-07-16 | Do not adopt Bun now — on any surface (installer, TS runner, `bun test`, bundler). Reserve it only as a named runtime candidate for the future backend slice, chosen via the Admission Protocol. | Fable-5 spike (branch `test-bun`): Bun works (full QA suite ran unmodified; 113/113 non-DOM tests drop-in) but fails the protocol today — no active consumer (STF-02/03/05 gain nothing) and the simpler path measurably still works (npm ci 4.8s; suite 19.3s; `qa:rules` 16.5s). `bun test` fails 100% of jsdom/RTL UI tests, which the not-yet-started T3 Visual Shell would multiply. Decisively, the serializable/provider-neutral boundaries mean adopting later costs ~the same as now — **no cost asymmetry**, so deferral is free. Cheap unrelated win captured instead: Node 26 native TS type-stripping can drop `tsx` once qa `.ts` relative imports get extensions. |
| 2026-07-16 | Build adaptive learning as stable, versioned curriculum plus dynamically composed sessions, with deterministic rules, grading, mastery, progression, validation, and fallback remaining authoritative; AI is a bounded planner and on-demand coach. | This preserves blackjack truth and reproducible progress while still adapting lesson order, phrasing, hints, and practice to the learner; the checkpoint-hybrid generation boundary limits token cost and latency locally and leaves a measurable path to later multi-user scaling. *(Assumption — the mechanism exists, but no measurement backs "limits token cost and latency"; the same design files token, latency, and cost as work still to be done. Relabelled 2026-07-26, `K-U5-008`.)* |
| 2026-07-16 | Treat adaptive learning as an umbrella plan family: operational Kanban reconciliation, three independent research tracks, then separately gated mechanics, AI-adapter, overlay, and convergence plans. | The areas have different evidence needs and can change independently; one mega-plan would couple product research, storage, AI/provider admission, mechanics, and rollout before their decisions are earned. |
| 2026-07-16 | Approve the first adaptive activity evidence set: three deterministic activity families, learner-bounded sessions, graded assistance/retry evidence, evidence-mode feedback, deterministic mastery/skip tests, and accessibility as a contract/feature-QA gate; defer numeric calibration and psychometric CAT. | The 24-source review supports these bounded mechanisms while exposing domain-transfer and calibration gaps; this preserves honest learner evidence and blackjack authority without copying competitor thresholds or proprietary systems. |
| 2026-07-16 | Admit `idb` 8.0.3 behind a provider-neutral `ProgressStore` for the first browser-local durable-progress slice; keep raw attempts authoritative, version the outer envelope, and require atomic idempotent revision-checked checkpoints plus explicit export/recovery/reset behavior. **The admission is conditional**: the implementation slice must install `idb` and measure its real production bundle delta, and a material unacceptable delta reverses the choice to native IndexedDB. | Native IndexedDB, `idb`, and Dexie each passed 42/42 scoped gates across Chromium, Firefox, and WebKit. `idb` keeps native IndexedDB semantics with less lifecycle/request plumbing and without Dexie's unused higher-level surface. The deferred performance run is non-blocking because no speed claim selected the candidate; retire to native IndexedDB for a dependency-free policy or reopen alternatives for a measured new consumer. The bundle-check condition is stated in the approved report (`docs/superpowers/specs/2026-07-16-adaptive-learning-browser-storage-research.md`: "to be installed and bundle-checked only when that implementation slice begins"; "The recommendation changes if … a production bundle check shows a material unacceptable delta") and was omitted from this row until 2026-07-17. |
| 2026-07-17 | Learner identity for browser-local progress is a **random opaque local key**, minted on first use, scoped to the application **origin and browser profile**, and described as **pseudonymous** — not anonymous, and not device-scoped. | Discharges the 2026-07-12 reserve-now gate (row above), which required the identity key *before* the first durable `AttemptRecord` write but was never itself recorded as a decision — leaving the semantics in no owned doc and three conflicting wordings in circulation. The substance is AL-R2's approved Identity and Privacy Boundary: browser-local storage is per-origin and per-profile and therefore **cannot** produce a device-scoped ID, and stable linkable local records are "at most pseudonymous in contexts where they can be related to a person". Three drifts are corrected, each different: the adaptive-learning design already treated the key "as pseudonymous rather than as personal identity" (its privacy substance was right) but called it a *device* ID — wrong scope — and a *UUID*, which over-specifies format; `ROADMAP.md` and `docs/specs/stack-boundaries.md` used bare "anonymous" with no qualifier, which is the actual privacy over-claim. Do not encode "device" into the schema, and do not let the format choice ride in the name. |
| 2026-07-17 | Scope AL-D1 to the design's **cycle-1 foundation** — the `ProgressStore` port, the versioned learner envelope and attempt record, and a provider-neutral contract suite proven **headless against fixtures** — instead of an end-to-end write/reload product slice. No learner data is written until a real consumer exists. | A seven-cluster research sweep found the card running one cycle ahead of its own `Source`: the design puts persistence *integration* in the cycle-3 two-unit overlay while cycle 1 is headless contracts; `ROADMAP.md:42` triggers local durable progress *from* the adaptive-mechanics proof; and the design's authority table assigns attempt production to a `SessionController` that does not exist, so a `LessonController`-driven write would need a temporary-adapter exemption. And today's `AttemptRecord` is not yet persistable: it carries no id, timestamp, schema version, or learner key, so the admitted "atomic idempotent revision-checked checkpoints" are unimplementable on it — two identical wrong answers on one step are byte-identical. (Correction, same day: an earlier draft of this row also claimed attempts were mastery-unusable because completion keys by `stepId`. That was wrong. `AttemptRecord.outcomeId` is already a validated foreign key into `Subject.skills` — `web/src/learn/validate.ts:51-55` requires every `unit.outcomes` entry to be a known skill id and `:70-75` requires every question step's `outcomeId` to be in `unit.outcomes` — so skill-grained evidence already exists and is merely misnamed, colliding with `engine.outcomes: HandOutcome[]` in the same record. The per-cell grammar `how-to-teach` demands is a Strategy Table Fundamentals concern, not a Foundations one.) Cycle 1 still honors the production-artifact redirect: the port, adapter, and contract suite are production code, not the research harness. `Learn.tsx` also confirms nothing is gated on completion today ("nothing is locked (V1 has no progress gating yet)"), so an end-to-end slice would persist a checkmark rather than progression — which `docs/specs/learning-mastery-and-scoring.md:209` warns against. |
| 2026-07-17 | Approve the cycle-1 `ProgressStore` design and its four rulings: (1) the `idb` bundle-delta threshold is **>5 KB gzipped ⇒ material ⇒ revert to native IndexedDB**, measured production-build with/without the import; (2) cycle 1 fixes the opaque `cellId` **field** and its stability contract while **curriculum owns the grammar**, and no real write happens until the catalog assigns stable injective cell ids; (3) **drop authored prose** (`prompt`/`feedback`) from the durable projection, keeping ids + replay identity; (4) **`appendAttempt` takes no `expectedRevision`** — the revision check moves to `commitSessionSummary`. | (1) `idb`'s whole admitted value is removing lifecycle plumbing, so a wrapper costing more than a few KB has lost its reason to exist. 5 KB is an *alarm* with ~3× headroom over `idb`'s expected size, not a tight budget — it fires when the library is not what we think it is, which is exactly what the reversal condition is for. (2) Strategy-table taxonomy belongs to curriculum, not to a persistence port; encoding it now would front-run the curriculum program and over-foundation the schema. The field must exist now because additive-only migration forbids re-keying later, and `cellId: null` is a *true value* for a Foundations attempt rather than a placeholder for an absent producer. (3) The reducer never needs prose, persisting AI-reworded prompts would put model output into durable storage against the design's retention constraint, and storing copy couples the progress schema to curriculum text edits. **Known limitation:** the export wrapper resolves copy from the *current* catalog, but attempts carry `catalogVersion` and old catalogs live in git rather than at runtime — so an export is approximately, not verbatim, faithful. Do not describe an export as a transcript. (4) **This is a deliberate, approved deviation from AL-R2's "may not weaken … revision conflict" floor.** Two approved pins conflict: appends commute, so a revision check on an append rejects a second tab's *genuine* evidence, violating the higher pin that raw attempts are the sole durable truth. AL-R2 licenses splitting operations; once `commitCheckpoint` splits into append + summary, the check belongs on the half that *replaces* derived state. IndexedDB serialises overlapping-scope `readwrite` transactions across same-origin connections, so the in-transaction read-modify-write of `meta.revision` is atomic across tabs and both tabs commit at distinct revisions — the same serialisation that produced AL-R2's "exactly one initial winner", yielding a sequence instead of a conflict. The mechanism is preserved where a lost update actually loses information. |
| 2026-07-17 | Canonical export of an **empty** ProgressStore namespace returns an explicit `{status:'empty'}`, distinct from `unavailable`/`'absent'`. Do not mint a learner key on a read. | Task 5 hit a gap the design left unpinned; the fake had shoehorned empty into `unavailable/'absent'`, conflating "you have no data yet" with "IndexedDB is unavailable in this browser" (`'absent'` stays reserved for the storage subsystem, §8.3). Minting a `learnerKey` to fill an export is a write on a read, which §6 forbids ("load() on an empty namespace mints NOTHING"). Now pinned by contract gate 1 and governing both fake and adapter, not left to the adapter to re-infer. Design §3.4/§12 register #9. |
| 2026-07-17 | An evidence-write (`appendAttempt`, `commitSessionSummary`) into a namespace physically **newer** than this build is refused with `NewerSchemaError`, never mapped to `STORAGE_UNAVAILABLE`. Applies to **every** write. | The storage subsystem is available; the store is intentionally unreadable/unwritable by this version, so `safeActions:['retry']` would loop a write that can never land until the app upgrades — `upgrade-app` is the honest safe action. The fake had shoehorned it into `STORAGE_UNAVAILABLE/'unknown'`. Reusing the existing `NewerSchemaError` (not a parallel type) keeps the surface minimal. Contract gate 14 proves refusal for both writes. Design §3.3/§8.4/§12 register #10. |
| 2026-07-17 | `commitSessionSummary` before any persisted attempt is a **no-op** (`{status:'no-evidence'}`): it mints no learner key, creates no namespace, writes no session record. | The learner key is minted only by the first `appendAttempt` inside that transaction (§6); a summary that mints would create a phantom zero-evidence session, exactly what §4.2 point 2 forbids. The fake had generalized minting to "first write of any kind". This is a recoverable no-op outcome, not an error. Contract gate 1. Design §3.4/§12 register #11. |
| 2026-07-17 | ProgressStore `reset` **clears all three object stores transactionally and preserves the database + schema version** — never `deleteDatabase`. Post-reset, `load()` is `empty` while `diagnose().detectedSchema` reports the surviving schema version (present-but-empty ≠ absent). | A store-clearing reset makes gate 10's "no residual records in *any* store" falsifiable — a reset that clears `attempts` but strands `sessions` is now representable and caught — and brings `assertNoStoredRecords`'s anti-vacuity guard (dead until now) to life on every gate-10 run. Not a relaxation of "no automatic reset, ever" [PINNED]: reset stays explicit and confirmation-gated; only the mechanism changed, and it also avoids `deleteDatabase`'s block-on-open-connections. Reconciles §3.5's "`detectedSchema: null` = absent" — `null` still means absent; a store-cleared namespace is present-but-empty. Design §3.5/§8.4/§12 register #12. |
| 2026-07-17 | The ProgressStore factory is a call-signature **interface** `OpenProgressStore`, not the design's `export declare function openProgressStore(...)`. | `declare` asserts an ambient runtime binding nothing in the plan supplies — Task 7 exports the real `openProgressStore` in `idb-store.ts`, so the `declare` would be a permanent phantom binding `tsc --noEmit` cannot catch (a consumer importing it typechecks cleanly, fails at link/call time). An interface is the honest expression of "the port's shape", is structurally identical to the design's signature, and satisfies boundary.test.ts's no-callback check. User-approved at review; recorded now with the Task 6.5 amendments. Rationale in `store.ts:59-71`; design §3.2/§12 register #13. |
| 2026-07-18 | Cut the agent kanban over from `agent-kanban:v1` to `v2` in one commit, port `scripts/kanban.ts` from workspace as a **derived port** (regenerate, never patch), and rename the desk's lifecycle command references from `codex-*` to `/wl-*`. Card IDs re-issue in dependency order (AL-01/R1/R2/D1/B1 → AL-01…AL-05). **Deferred:** renaming `docs/superpowers/` and folding the legacy `docs/plans|specs` pair — both ride on a later re-tune. | The CLI refuses writes to a v1 board (exit 4), so no coexistence window exists by design and a staged cutover was never available; 23 v1 archives plus a pre-mutation snapshot keep the full history, and the four dropped fields (`Mode`, `Owner`, `Workspace`, `Done when`) survive there. v2 buys milestone scoping — a card walks up to a numbered ROADMAP step through `Milestone` + `phase.md:roadmap_step`, so the board structurally cannot span future milestones — plus a single validated write path, which is what makes `Updated` trustworthy. The port exists because board steps silently no-op'd on this desk without a CLI; the workspace copy owns the test suite, so patching here would fork the four-family topology. `codex-*` needed no alias shim: no executable by those names has ever existed anywhere, so the rename is pure doc truing. Two plan assertions proved wrong under execution and are corrected in the record: (a) the two stale `phase.md` session pointers were **unrecoverable**, not drifted filenames — those sessions were authored in a parallel branch's working tree and `journal/ops/sessions/` is gitignored, so they crossed no merge and appear in no history; (b) archiving `/.superpowers/` was **not** the zero-git-effect local move the plan claimed — `journal/ops/archive/` is tracked, so the destination arrived unignored and a `git add -A` would have pushed 2.2M of private scratch to the public remote, now closed by its own ignore rule. |
| 2026-07-19 | Closed AL-05 with a **whole-cycle dual review on Fable** (wl-verify correctness + wl-judge craft over Tasks 1–11, plus the product vision as an explicit lens) rather than the default branch-scoped final review, then merged at `4a197b6`. | User-directed: Tasks 1–6 predated the Task-6.5 contract amendment, so a branch-only review could never check fake↔adapter agreement or the amendment's echo into older surfaces — and both reviewers caught exactly that class (a fake-only `meta.schemaVersion` rewrite; stale pre-correction comment echoes; the §10 "makes measuring it a gate" erratum, now register #14). Verdicts recorded raw: CONFORMS (0C/0I; no over- or under-foundation vs the vision docs) and PASS on judge cycle 3 within the N=3 ceiling. Fix model split held: Fable reviewed and assigned, sonnet applied. |

## 2026-07-20 — Phase 1 foundation audit: approved, with three program-rule amendments

**Chose:** approve Phase 1 with amendments 5–7 — (5) sufficiency top-ups are exempt from the initial
citation cap; (6) an additional bounded pass is permitted where the prior one was mis-scoped or the
missing evidence is already identified; (7) **editorial correction is a remedy distinct from
collection**.
**Why:** each rule had already bound during the Phase 1 run and caused a defect that could not be
discharged. The cap made C5's gap unfixable; the one-pass rule blocked C4's fix, which was a single
citation already in hand; and three cards carried defects needing no new evidence at all. Amendment 7
alone accounted for **7 of 12 remediation passes** and resolved three cards at **zero collection cost**.

**Chose:** treat C1's remaining INSUFFICIENT as an **approved, honest COVERAGE GAP**, not a blocker.
**Why:** the question survived three passes plus independent verifier searching. "We looked hard and it
isn't there" is a research result, and the mastery-model choice can proceed as a labelled Product
judgement or Assumption rather than waiting on evidence that does not exist.

**Chose:** land already-recorded corrections on C6 despite an instruction barring further work there.
**Why:** the instruction barred additional *collection*; the corrections had never been applied, so
landing them **is** preserving them. Ruled correct by the user at the gate.

**Chose:** registers are orchestrator-owned — agents return rows, IDs are assigned centrally.
**Why:** Phase 1 produced duplicate IDs from concurrent appends, and this run caught a near-miss where
a *predicted* ID was relayed unchecked and would have written one card's content into another's rows.

**Chose:** publish the evidence to a dedicated branch, excluding session scratch.
**Why:** the archive is the reviewable product; `.wl/sdd/` is ephemeral. Replaced by a durable
`PROCESS-AUDIT.md` so the process survives without the scratch.

**New guards for Phase 2:** (a) an explicit **landing step** for verifier corrections plus a check that
they landed — Phase 1 had neither, and its corrections never reached any of the six dossiers;
(b) **material corrections must be checked against the primary source, not only against prior review
records** — a pass reading records alone propagated a verifier's mistake into a false statement about a
source, and passed every records-based check while doing it.

## 2026-07-21 — Phase 2 planned & approved: product-forward reframe, proportional rigor

**Chose:** reframe the research program from three research phases (collect / audit / synthesize) into
a **six-phase research→product arc (P1–P6)**: P3 gains a **Product Design Inputs** bridge, **P4 owns
curriculum and activity design**, P5 builds a vertical slice + learning proof, P6 expands. P1–P5
advance V2, P6 = V3. Written into plan + charter + ROADMAP.
**Why:** the research was drifting product-agnostic — the over-foundation risk the vision names as #1.
Ending the arc at a built slice keeps the foundation subordinate to the product it must serve, and
makes P1–P3's job explicit: make *designing* the product safe, not build it.

**Chose:** Phase 2 = a **proportional-rigor, load-bearing** audit (eight decision families), not a
sentence-level one — one auditor + one verifier per unit by default, land/confirm only on **material**
defects (~45 → ~24–31 dispatches). **APPROVED 2026-07-21**, executes next session.
**Why:** auditing every sentence of a foundation you already trust has diminishing returns; the value
is in the decisions a P4 designer will lean on.

**Chose:** Phase 2's **produce** role is a new **`audit-examiner`** (adversarial claim-auditor,
`WebFetch/Read/Write/Glob/Grep`, write-scoped to `audit/`), created in Task 0 → lint → **session
restart**; `audit-auditor` stays the program-integrity role; LV landing-confirmation records live under
`verification/`.
**Why:** the shipped `audit-verifier` is write-scoped to `verification/` and **cannot** produce
`audit/` records — a Fable conformance loop caught the overload as a def-violation (twice). A purpose-
built role also makes "no collection" grant-enforced (no `WebSearch`). Fable verdict: **ALIGNED**.

**Chose:** the P2 gate must **demonstrate every bespoke check on fixtures before dispatch** (Task 0
`1c-gate`, the D7 floor), and gained a new **`1-pre-b`** check — each audit record must carry ≥1 real
verdict row, not merely be non-empty.
**Why:** the review found a real hole — a non-empty **legend-only** record (verdicts as prose, none
assessed) passed every mechanical check; and "the gate is trusted" was asserted, never demonstrated.
`research-gate.ts` is a reference *shape*, not a runtime backstop (it never runs here and can't parse
the P2 layout).

**Chose (P1 fit-to-purpose, Fable):** treat P1 as a **mechanics** foundation, not a subject-matter
one — reusable for the mastery/adaptivity decision, but it holds **nothing** on teaching
probability/EV/variance/risk, and the activity/hints/accessibility evidence lives in **U4** (a P2
target, product-blog + inference grade), not the P1 archive. Do **not** reopen P1; U4 is P2's priority
unit (relabel honestly), and a **bounded P3 subject-matter top-up** is scheduled.
**Why:** P1 was scoped around learning mechanics before the reframe made probability/EV/risk
first-class *subjects*; a P4 designer must not inherit evidence that is not there.

## 2026-07-22 — Phase 2 approved; Phase 3 run lean and banked with known defects

**Chose:** approve the Phase 2 verdicts and close the phase; keep the P1–P6 sequence but drop the
multi-agent apparatus for Phase 3; fold the charter's seven P3 deliverables into one Product Design
Inputs bridge; stop the Phase 3 polish pass with ten specified corrections unapplied.
**Why:** P3 and P4 are *design* phases, not more auditing — skipping them would mean improvising the
curriculum, which is the hard part of a learning product. But the role-separated apparatus exists to
guard against fabricated citations, a risk new collection carries and translation-into-design does
not. Two phases had produced verdicts rather than product; the value of another polish round was below
the value of reaching Phase 4 with an honestly-labelled evidence base. The cost is recorded where it
cannot be missed: the archive README and the bridge both enumerate every unfixed defect and the one
known-missing study, and every bridge input is tagged verified / unverified / defective-source.

## 2026-07-22 — CFL-007 resolved: block to introduce, interleave to practise

**Chose:** a Basic Strategy category may be introduced in isolation so the concept lands; once
introduced, **all** practice and review draws from a mixed pool and the learner must classify the hand
before choosing an action. Mixed review is the steady state, not a final stage. The roadmap's
"hard totals → hard doubles → soft totals → pairs/splits, then mixed review" is revised accordingly in
Phase 4, which owns sequence design.
**Why:** the project's own held evidence has interleaved practice beating blocked 72% vs 38% (d=1.05)
on a choose-the-right-strategy task, and the mechanism the authors name — discrimination between
problem kinds — is exactly what basic strategy is. Blocked practice removes the discrimination step:
inside a block labelled "hard totals," classification is free. Full interleaving from lesson one was
rejected because the transfer (grade-7 maths → adult blackjack) is untested and removing the on-ramp
bets the beginner experience on it. Recorded as playtest item P-3; if learners handle full mixing,
widen it.

## 2026-07-25 — Graded Decision Practice design approved as-is

**Chose:** approve `docs/superpowers/specs/2026-07-23-graded-decision-practice-design.md` **as-is**,
unblocking its 11-task plan. Approved with the design's judgement calls explicitly in view: *16 vs 10*
stays in the launch pool; `confidence` is added now as a top-level schema field; the slice declares
only the `skillId` values its own pool needs; retention is uncapped; and a second progression concept
alongside the prototype's `requiredChecks` is accepted debt.
**Why:** the approval act itself was the gap. The plan cited the spec as "(approved, `d10e8d3`)", but
`d10e8d3` is the spec's **own authoring commit** — a circular citation, and no approval existed
anywhere: no `decisions.md` row, no session file after `2026-07-22T2203`. The design commit recorded
only four scoped owner rulings made *during* drafting, which is participation, not approval. Rather
than infer approval from a document's claim about itself — this program's founding error class — the
spec was read in full and ruled on. This row is now the approval; the spec header and the plan both
point here instead of at the authoring commit. One defect fixed at approval: the acceptance-criteria
block was labelled "four elements" but named Complete / Honest / Bounded / Answerable with no mapping;
the criteria text is unchanged and each now names the element it discharges (Fire / Water / Air /
Earth).

## 2026-07-25 — Phase 4 is design and mostly unbuilt; the motivation economy is an owner premise

**Chose:** treat the Graded Decision Practice approval as **one of Phase 4's eight deliverables, not
the end of Phase 4.** The seven undesigned ones — skill graph and prerequisites, learning outcomes,
activity taxonomy, which activity measures which capability, per-activity evidence and mastery rules,
session composition, interaction UX — remain open, and the approved spec defers them explicitly in
its §9. The board's `GD-01`–`GD-11` cards implement that one approved slice and are therefore
**P5-shaped execution work**, held in Ready and deliberately not started.
**Why:** after the board was shaped, the phase pointers had begun to read as "P4 approved, execute" —
which would have run an eleven-task build with no curriculum, progression, or session shape behind
it. The charter splits **P4 = Design** from **P5 = Build** (`ROADMAP.md:110-111`), and P4's gate is
"User approves the blueprint **and the slice to build**"
(`2026-07-17-adaptive-learning-foundation-audit-research.md:321`). One slice is approved; the
blueprint is not. Caught by the owner asking whether P4 was not a design phase.

**Chose:** the product's motivation system **is** an XP-and-chips economy, taken as an **owner
premise** for Phase 4 design rather than reopened as a question. Chips are **earned by completing
lessons and units** and are **spent only in Free Play**; learning activities never cost the learner
chips. The product is "learn to earn table time," never "buy chips to play." Playability and
learnability are **co-equal priorities that feed each other** — fun comes from competence at a
genuinely hard game, and competence is what the learning delivers — so the economy is an *instrument*
of that reciprocal loop, not the motivation itself.
**Why:** the constraint text does not forbid this, and a prior session reading of it as a ban was
wrong. `product-vision.md:27` forbids a product **"centered on** chips, bankroll, or casino fantasy";
`ROADMAP.md:76` puts **"chips-first** gameplay" out of V1 scope; `ROADMAP.md:130` lists "rank/XP
systems" among **V2** non-goals under a section that then says each V2 feature gets its own design
cycle when it becomes active; and V3's likely scope already names "progression, rank/mastery
presentation." None of that bans an economy — they fence chips-as-the-point and defer XP. Positively,
`product-vision.md:78` states motivation "should reward practice, comprehension, and improving
decision quality," which chips-earned-by-learning implements directly. The engine already carries the
mechanism: `bankroll` is first-class (`bankroll_before/after/delta`) and split/double legality is
already gated on `bankroll_available` (`rules.rs:92,103,111`); Free Play has an economy today with no
source for it.

**Chose:** record the four problems the premise opens as **the design work itself**, not as settled:
(1) whether Free Play **returns** chips on a won hand — if it does, the loop self-funds and the
product rewards *outcome*, the exact thing the learning design decouples (§1.3, and P-1 is the
load-bearing playtest question); if it does not, Free Play stops being a real bankroll simulation,
against the vision's "training for a real table"; (2) whether "empty wallet → go learn" is a healthy
loop or a free-to-play energy gate, given `product-vision.md:79-80` forbids encouraging loss chasing
and punishing a learner for ending a session; (3) how XP (rewards showing up) stays separate from
mastery (computed from recorded decision evidence, bridge §3/§5) when §1.5 warns the *feeling* of
progress rises whether or not skill does — and which of the two gates content; (4) how the
reciprocity is designed for rather than assumed.
**Why:** the premise is the owner's to set and is now set. What is not settled is the system that
implements it without violating the four motivation prohibitions, and naming these as open keeps a
later session from mistaking the premise for a finished design.

## 2026-07-26 — Two rulings rescued from the ROADMAP rewrite

**Chose:** carry forward two design rulings that the layers-and-phases rewrite dropped without
replacement, so phase 4 inherits them as recorded decisions rather than folklore.

1. **Free Play's table may appear early, but active coaching and session reviews come after the
   teaching loop is proven.** Free Play stays an honest ordered shoe throughout. Binds `LDB-06`
   (session composition) and `LDB-03` (activity taxonomy).
2. **The strategy table stays user-toggleable.** No-table testing and realistic pace are later
   mastery work, not phase-4 or phase-5 scope. Binds `LDB-04` (evidence and mastery rules), whose
   mastery axis is table-open versus table-closed.

**Why:** both were in the previous `ROADMAP.md`'s V2 sequencing paragraph, which the rewrite
superseded in spirit and deleted in fact. An independent review caught the loss. Neither ruling
survives anywhere else, and a session-composition design that reinvents early coaching would have
nothing to stop it. Recorded here rather than re-inserted into ROADMAP because they are decisions,
not scope, and `journal/decisions.md` is the ADR sink.

## 2026-07-26 — Two commits closed as deliberately uncarded, and the drift window's blind spot

**Chose:** record `c09e2c6` and `e4c91d2` as **deliberately uncarded work**, and attach them to no
card. `kanban.ts`'s commit-drift probe flags both as "matches no card Evidence"; both flags are
correct and neither is repairable by attaching evidence.

- `c09e2c6` ("pave LDB-02, wire the tripwire, close the session") is a **board-write artifact**. It
  contains the write that produced the current board, so it is timestamped *after* the very
  `Updated:` values the drift window is anchored to (board written `02:37:23Z`, commit at
  `05:42:43+03:00`). It also touched `AGENTS.md`, `ROADMAP.md`, two specs and
  `scripts/check-doc-drift.sh`, so it is not `journal/`-only and misses the bookkeeping exemption.
  Any commit that lands a board write alongside authority-document edits will flag the same way.
- `e4c91d2` is a **verbatim derived-port regen** of `scripts/kanban.ts` from workspace `be2de4b`.
  Tooling sync, never card work.

**Why:** all eight LDB cards read `Evidence: pending` — nothing on this board has started. There is
no card either commit belongs to, and minting one to absorb them would put fabricated evidence in
the field the audit rules exist to protect. The honest disposition is a record, not a card.

**Chose:** record, as a known defect in the tooling rather than in this repo, that the commit-drift
window **anchors to the maximum card `Updated:` timestamp** (`kanban.ts:783-792`). The next board
write — starting `LDB-02` — moves that anchor to now, and both commits leave the window and stop
being reported.

**Why:** the drift clears itself whether or not anyone decided anything, and **genuinely** uncarded
feature work would disappear on exactly the same mechanism. That is this project's own
absence-as-proof failure class (`AGENTS.md` §Evidence discipline, rule 3) living inside the check
that is supposed to catch uncarded work. Not repaired here: `scripts/kanban.ts` is a derived port
and is never patched in this repo. Fix belongs upstream in the workspace desk.

**Chose:** treat the HIGH `stale-pointer` on `journal/memory/_fact.md:7` as a **linter false
positive** and silence it locally with the linter's own D9 code-span escape (backtick-wrapping the
`[[their-filename]]` placeholder).

**Why:** `_fact.md` is the memory **template stub**, not a memory fact; its placeholder link is
designed never to resolve. `check_links()` in `workspace/scripts/wl-lint.sh:78-94` iterates
`$MEM_DIR/*.md` and skips only `index.md`, so it lints the template every session. The real fix —
skipping `_*.md` stubs — is a workspace-desk change. `journal/memory/` is gitignored, so the local
edit is untracked and this entry is its only record.

## 2026-07-27 — The provenance enum takes a third value, by owner decision

**Chose:** the source-provenance vocabulary is **three** values, not two: `vendor-self-description`,
`independent`, and **`compensated-third-party`** — a publisher that is not the vendor, but discloses
payment from the companies it covers.

**Why:** the two-value enum in LDB-02's card was written before anyone knew the third case existed.
Then it did: a review site covering Yousician, which is not Yousician and is not disinterested
either. `independent` overstates it and `vendor-self-description` is simply false. Forcing the row
into either one destroys the single most decision-relevant fact about it, and a reader scanning the
provenance column would see a word that misdescribes the source.

**The owner's reasoning, and it governs:** keep information that helps the product; do not preserve
a two-value scheme just because a document said two. The enum existed to tell a reader how far to
trust a source. A third value serves that purpose better than a footnote does.

**What was actually wrong, and it was not the token.** The orchestrator adopted the third value
mid-pass **and simultaneously widened its own counted check to admit it**, then reported "0
undeclared provenance tokens" — a pass that existed only because the party being measured had moved
the threshold. A process audit caught it and rated it the run's most serious finding. The defect was
never the vocabulary; it was changing a predicate and grading against the changed version in the
same breath. This entry is the fix: the change is now a recorded decision rather than a silent one,
and `GATE.md` states which predicate it is measured against.

**Scope:** `compensated-third-party` is in use on one row (`U2-S13`). `independent` in units U1 and
U3 was assigned under the earlier two-value scheme and was **never checked for compensation** — so
the tokens are not comparable across units, and that limit is recorded in the archive rather than
quietly harmonised away.

---

## 2026-08-01 — `LDB-01`: learning outcomes and the skill graph

Six decisions from one grilling session. **All APPROVED by the owner on 2026-08-01** at the `LDB-01`
user-approval gate.
Spec: `docs/superpowers/specs/2026-08-01-learning-outcomes-and-skill-graph.md`.

**Canonical domain vocabulary, and a root `CONTEXT.md` to hold it.** Four words were in circulation
for one referent — `Skill`, `outcomeId`, `capabilities`, "learning target" — and the shipped durable
schema had already begun collapsing them (`progress/types.ts:79`). Canonical: **Skill** (the node),
**Learning outcome** (the sentence about it), **Condition of evidence**, **Subject**, **Decision
situation**, **Dealt-hand provenance**, **Cell**, **Classification**, **Grading authority**. The
glossary is a repo-wide surface because the collision spans docs, cards and code; putting it inside
one design spec would hide it from LDB-03 onward. Registered in `docs-map.md`; it holds no decision.

**A Cell is derived by construction, not an authored grammar.** The 2026-07-17 ProgressStore decision
left curriculum owing "stable injective cell ids" and blocked all real writes until they existed. A
Cell is a pure function of a Decision situation, and every input is already persisted
(`progress/types.ts:99-103`) — so the obligation is discharged by dissolving it. Stored as a cache
rather than derived on read, so an exported attempt log stays readable without a WASM oracle.
**Boundary stated with it:** a `cellId` says where evidence came from and is *not* a licence to drill
cells as items — `classification.md:128-130` holds that per-cell decomposition destroys the
whole-policy measurement.

**Decision situation is split from dealt-hand provenance.** Today `engine: AttemptEngineContext |
null` carries both, so "no dealt hand" loses the *situation* along with the traceability — and with
it the derivable Cell. Splitting them lets an activity pose a situation without dealing while the
Cell derives identically. Paired rule: an undealt prompt may name a hand *shape* but may never render
cards that did not come from a shoe. A shape-named prompt supplies the Classification for free, so it
may only serve outcomes flagged `classificationIncluded: false` — which is what makes bridge §4.3
enforceable per Skill instead of a slogan.

**The 7-stage hierarchy is split, not adopted; `A-01` is withdrawn rather than closed.** Stages 1–3
name content and are absorbed into the existing Subject partition; stages 4–7 name *conditions of
performance* and become four Condition axes — support, scope, ruleset, pace. Shipped code had already
half-made this move (`progress/types.ts:86-91`, and the owner's 2026-07-23 ruling that `tableOpen` is
the mastery axis). Only **support** is asserted as primary; scope, ruleset and pace are left unordered
for LDB-06, because asserting a four-step progression would have manufactured three assumptions with
nothing behind them. The axis set is explicitly open — counting will want a fifth. **Net new register
rows across the whole card: zero.**

**Probability, EV and variance ship only where they change a decision (`ROADMAP.md` deliverable 2
amended).** No fourth Subject and no lesson unit. The ground is §1.7 `[VERIFIED]`, the bridge's own
"single most important line for scoping": 198 students taught probability with gambling examples
showed better odds calculation six months later and **no change in gambling behaviour** — a standalone
maths Subject is that study's arm that failed. But §1.2 `[VERIFIED]` says experience-only learners
underweight the tail, so description still has to arrive: as a post-shoe debrief, a prediction
captured beforehand, and frequency framing in copy — results and stakes, never a teaching surface.
**EV gets no Skill at all** and appears only as rationale in feedback; `P-2` is declared out of the
phase-5 subset and `A-14` goes dormant. **Reopening condition recorded:** insurance is the one
in-scope decision the table does not cover, and it is absent only because `insurance_auto_decline:
true` removes it from the decision space — a config flag, not a law.

**The "assume the next card is a ten" heuristic is an explanatory frame, never a policy.** It may
explain why a dealer 6 busts; it never issues an action and is never a grading authority. Two
structural grounds, both established first-hand: it implies Stand where the shipped table says Hit on
**27 of 50 hard-12–16 cells** (identical H17/S17, including hard 16 vs 10 — the hand the approved
slice calls the most counterintuitive in basic strategy), and teaching it as policy would require a
second grading authority that bridge §5 and the slice design both forbid. `P-4` is declared out and
`A-16`'s validation method is rewritten to test the frame instead.
**A defect was found in the evidence and deliberately not fixed here:** bridge §1.8 claims the
heuristic beats *"unaided play"*, but the archive holds only the publisher abstract, which names **no
comparator** — and `P3-evidence-catalog.md:236` repeats the phrase. That correction needs an
independent re-check before landing in both files together; applying it on one agent's reading is
this repo's named inherited-error class. The decision above does not depend on it.

**The deliverable is a spec plus a serializable graph file.** `2026-08-01-skill-graph.json` is the
artifact phase 5 consumes. Prose plus a hand-transcription step is the exact failure `AGENTS.md`
records — corrections that landed in audit records and never reached the documents, 14 of them
surviving a pass built to certify they had. It also turns both approval criteria into fields a script
can check. Writing design data is not building: no UI, no behaviour, no engine change.

---

## 2026-08-01 — `LDB-03`: the activity taxonomy and the skill mapping

**The unit is a new node, not either inventory the project already holds.** An **Activity type** is a
question shape with its Skills and grading authority; the 32 catalog patterns are *sources* adopted
into or rejected from it. Making the taxonomy *be* the adopted patterns would have handed `LDB-06` a
session document that has to say "`U3-5`", and would inherit the vocabulary of `U2` — the one unit
with no reachable independent source.

**An Activity type is individuated by SHOWN × PRODUCED × WITHHELD.** Everything else is a parameter
with a declared range and a named owner card. This is taken from the research rather than from taste:
identical items scored 73.3% vs 73.5% across widgets (p = 0.93), construct-matched formats track at
r = 0.81, and formats that change *what is asked* diverge at r = 0.51. The cost is stated rather than
hidden — `U1-5` and `U1-6`, two of the design's most load-bearing sources, become parameters and not
types.

**The supplied-pool boundary, ruled once:** *a pool is cosmetic when it discloses any part of what is
being measured; substantive when the measured target is not in it.* The two units were reopened
first-hand and had applied **different tests** — `U2` a generation-from-scratch test, `U3` a
not-one-of-N test. `U2`'s is overturned, on the ground its own row records: the rejection was
*"borderline"* and half-decided by *"the dispatch explicitly steers past this format"*, which is a
process fact, not a measurement finding. The decisive consequence is that `U2`'s test also
disqualifies `U1-1`, the catalog's highest-value pattern, because the 169 cells are supplied on
screen. This ruling **disagrees with `classification.md`'s cosmetic call on `U3-7`**, and says so.

**The recognition ban bites on the stimulus, not the widget.** Showing Hit/Stand/Double/Split is not
recognition — a real table enumerates the action space too. Forcing production by hiding the actions
is *not* required, because the project's own evidence is against it: production scored 6–7% lower on
matched items and the delayed exam ran 70% tested vs 73% untested, *"opposite the predicted
direction"*, F = 1.50. **The consequence is recorded now rather than discovered in phase 5:**
`strategy-action`, `legal-fallback` and `adherence-under-loss` are all `classificationIncluded: true`,
so they may never be shape-named, so they must show cards, so those cards must come from a shoe. All
three are unmeasurable without real dealt hands.

**Provenance takes three values and costs no schema.** `create_prefix_shoe` (`shoe.rs:62`) already
builds composition-honest arranged openings whose card ids label themselves — `arranged-0-10-hearts`
against `deck-3-10-hearts`. Targeted rare-event practice is therefore buildable without faking card
flow. **Arranged counts as dealt evidence for a Skill; whether arranged-*only* evidence can reach
mastery is deliberately left to `LDB-04`**, because §1.1's interleaving result is a *discrimination*
result and a learner drilled on arranged hard-16s never had to notice one arise. That is `A-23`, the
card's only new register row.

**Coverage runs both directions, and a gap reports upward.** The card as written required only
activity → Skill. The reverse clause is added, but a Skill nothing can measure is a **finding against
`LDB-01`**, never a prompt to invent an activity — which is exactly how `LDB-01` disposed of `goal`
and `round-flow`. Checked by script: 18/18 Skills carry primary evidence across six types, 32/32
patterns carry a verdict, and no classification-supplying or posed-only type is primary for a
`classificationIncluded: true` Skill.

**Four verdicts, not two.** The card's adopt-or-reject binary cannot tell the truth about `U1-5`: the
design leans on it heavily and builds no activity from it. So: adopted-as-type (3),
adopted-as-parameter (10), not-adopted-no-target (4), rejected (15). The two conditionals resolved
from rulings already made — `U1-7` **rejected**, because reducing a shoe to its critical decisions
tells the learner which decisions are critical; `U2-11` **substantive but not adopted**, because no
Skill is a paced stream.

**The Parsons boundary is ruled and has nothing to attach to.** `U3-7` is reclassified *substantive*
by this card's own pool rule — and then not adopted, because `LDB-01` retired `round-flow` and
`complete-round`, so no Skill in the approved graph is an ordering. Ruling the boundary and building
nothing on it is the honest outcome; rejecting the format to dodge the question is not.

**Predict-then-reveal produces one number, chosen by the approved spec rather than by preference.**
`variance-expectation`'s outcome already says *"states how often they expect the event to occur"* — a
frequency. `U1-3`'s two-bound interval would have amended a spec approved the same day, and rests on
vendor-only provenance whose corroboration the audit withdrew, from an instrument that concedes high
scorers *"are simply willing to use wider ranges. Generally about 2 to 10 times wider than the people
scoring far below average."*

**One divergence from a source is recorded rather than smoothed.** `U3-4`'s construct is invention
whose value is orthogonal to correctness. `rule-contrast` grades the named differing rule anyway,
because an ungraded prompt produces no evidence — and keeps the source's caution by never surfacing
the verdict, which is `U1-5`'s surviving licence: issue no pass/fail verdict, not grade nothing.

## 2026-08-02 — A phase decision does not enter `main` as code ahead of its card's gate

**Chose:** discard the working, tested code on PR #11 rather than cherry-pick it, and make the rule
general: an unapproved card's decisions may not land in `main` as an implementation, however sound
the implementation is. Salvage the *findings* instead, as explicitly non-authoritative input to the
grill that will decide the card.

**Why:** PR #11's `web/src/tuning/params.ts` is a 314-line constants module whose comments cite
`LDB-04 §2.2` as *"already approved"* and draw values from `LDB-04 §1.1/§2.1/§2.2/§3` and
`LDB-06 §3/§5.2/§6`. Those sections exist only in two specs on that branch; on `main`, LDB-04 and
LDB-06 sit in Ready at `Evidence: pending`. Landing the module would have adopted both cards'
decisions in code while the salvage plan was simultaneously refusing to adopt them in prose — the
same failure that produced the incident, arriving through a different door. The cost is real and
was accepted knowingly: the code was tested and is now discarded, and re-deriving it after the gate
is the difference between phase 4 *making* a decision and phase 4 *ratifying* one already made.

**What this does not say.** It is not a rule against prototyping ahead of a gate — a prototype that
stays out of `main` answers a design question and is welcome. The line is landing on `main`, because
that is what turns an experiment into an inheritance no later session knows to question.

**Recorded because the failure mode is silent.** Without this, a later session finds working, tested
code on a dead branch and re-lands it as an obvious win. The mechanical half of the same incident —
the forked board — is now guarded by check 6 in `scripts/check-doc-drift.sh`; this half has no
mechanism and rests on the record.

---

## 2026-08-05 — LDB-05 approved: the motivation and chips economy

**Chose:** the economy design at `docs/superpowers/specs/2026-08-04-motivation-and-chips-economy.md`,
approved at the `user-approval` gate. **Chips are earned by winning or by learning; money never buys
chips; chips buy table time and nothing else.** The Wallet is unwalled and persists across sessions
and logouts. Tables are **tiered by stakes** — each tier a minimum bet and a buy-in range — so a
larger balance buys bigger swings, never an easier game. Free Play closes when the Wallet cannot cover
the lowest tier, and the only route back is learning. Three meters, never blended: chips, XP
(monotonic), and the player score (a rating that ingests oracle-graded Free Play decisions, so
standing moves with *how you played* and never with *what you won*).

**Why:** `E-1` was the load-bearing question and every route out of it looked like a trap — rewarding
outcome is the one thing the learning design decouples, but a table where winning does not pay is a
worse distortion, teaching that every hand loses. The trap dissolves at the **sink**, not the faucet:
winning may fund the wallet freely because a full wallet advances the learner on no axis. The
separation is enforced where the bias actually operates — in what moves standing and in what the
product celebrates — rather than by rigging the payouts.

**Three divergences were put individually.** (1) The premise's governing paragraph is amended —
*"learning **or winning** earns table time"* — and widened at the gate to cover all three of its
contradicted clauses rather than the one originally surfaced. (2) The practice-availability reversal
resolves to progressive section opening; both of the owner's contradictory statements travel to
`LDB-06` so the reversal stays visible. (3) The per-window practice cap was **dropped** — see the next
entry.

**Scope added at the gate rather than merely approved:** stake-tiered tables. Folded in because D3
would otherwise have shipped saying *"at zero chips"* when the rule is *below the lowest tier's minimum
buy-in* — a correction to what was being approved, not a future refinement.

**Register:** `A-07b` and `A-07c` filed as sub-rows, `A-24` added, `A-20` rewritten because
*"cosmetic"* became false under D1. `A-07d` and `A-25` were drafted and never filed — the cap they
covered no longer exists.

---

## 2026-08-05 — The per-window practice cap was dropped because it contradicted its own guarantee

**Chose:** no bound of any kind on what learning pays. `LDB-05` D5 is two rules — full rate for due
and new work, a trickle for already-mastered material that never reaches zero — and nothing caps the
total.

**Why:** the cap was defensible against the evidence and indefensible against the document it lived
in. Checked first-hand, a per-window cap breaches none of `product-vision.md:88-90`'s four
prohibitions and arguably serves the loss-chasing one. It is also genuinely *not* the Duolingo hearts
mechanic `how-to-teach.md:122` warns about, because hearts are debited **per mistake** and lock you out
**for being wrong**, while nothing in this economy is ever debited for a wrong answer. Both defences
held. What killed it was internal: D3 guarantees *"there is no reachable state in which a learner has
no way to earn"*, and D5's trickle was offered as *"what makes D3's guarantee true rather than
aspirational"* — then the cap bounded the trickle. A learner who was broke, had nothing due, and had
hit the window had no way to earn: exactly the state D3 declares unreachable. The document argued its
guarantee true and bounded the thing that made it true, three lines later.

**What this costs, stated rather than dropped:** user story 15 — *"I want a bound on how much I can
earn from practice in a given window, so that the product is not asking me to grind"* — is now unmet.
`LDB-06` may answer it in session shape; it may not reach back for a chip cap to do it.

**Recorded because the lesson generalises.** The cap survived its adversarial check against the
research and died to a two-line internal consistency read. A mechanism can pass every external test
and still contradict the guarantee written above it.

---

## 2026-08-05 — Free-tier gating by energy or error rate, and ads for lives or chips: DEFERRED, not approved

**Chose:** nothing. This records a stated future direction and the two things it collides with, so
that whoever designs it meets them at the start rather than discovering them late.

**The direction, as stated by the owner 2026-08-05:** *"for now, we dont need to cap the how many
learning session a player can have, but in the future we would need to cap it with like energy count
or error rate like in duolingo free subscription and the player would need to watch an ad to have more
lives to learn with or watch an ad to get some money."* A real and ordinary free-tier model. It is not
designed, not approved, and not scheduled.

**Collision 1 — ads for chips versus the premise's one absolute.** *"Money never buys chips"* is the
single non-negotiable in `2026-07-26-chips-xp-and-progression-economy.md`, and it survived the `LDB-05`
gate untouched. An ad is not literally money — but it is real-world value converting into chips, and
the product taking revenue for it. That is the absolute in substance if not in letter. It needs an
explicit ruling; the observation that "an ad is not money" does not settle it.

**Collision 2 — error-rate lives is the one mechanic the corpus warns about by name.**
`how-to-teach.md:122`: *"Punitive mechanics can backfire. Duolingo's 'hearts' (lose a heart per
mistake, get locked out) are criticized for creating anxiety around mistakes — and mistakes are how
people learn. In a decision trainer where wrong answers are the whole teaching mechanism, a
lock-you-out-for-errors system is especially counterproductive."* `LDB-05` argued its per-window cap
was *not* this mechanism precisely because nothing was debited for a wrong answer. An error-rate gate
**is** this mechanism, on its own trigger. An energy count that depletes with time rather than with
errors is a different and much weaker case.

**Why recorded now:** neither collision is a reason not to build it — Duolingo ships this profitably,
and a free tier is a real business need. They are reasons it must be decided **against** the evidence
rather than around it. This entry exists so that decision starts from the quote rather than
rediscovering it.

---

## 2026-08-15 — The pre-gate grill: twelve decisions on playability and change-agility

**Why this happened before a gate rather than at one.** The `LDB-06` gate was presented on
2026-08-14 and the owner **held it open** rather than ruling, to grill phase 4 on two things first:
is the design fun, and what is expensive to reverse if he dislikes it at the end of phase 6. The
session ran `grill-with-docs` on 2026-08-15 over the five approved LDB specs plus the `LDB-06` draft.
Twelve decisions. `LDB-06` is redrafted and **still unapproved**; its gate is where it was.

**The finding that drove most of it, verified against `2026-08-01-activity-taxonomy.json` rather
than recalled.** `LDB-02` was commissioned because *"every exercise format this project holds is a
dealt hand or a multiple-choice question."* It returned 32 patterns from 24 products. They were
disposed as 15 rejected, 10 adopted-as-parameter, 4 no-target, **3 adopted-as-type**. `primaryFor`
counts: `deal-and-decide` 8, `state-report` 8, `rule-card-read` 1, `predict-then-reveal` 1,
`policy-paint` 0, `rule-contrast` 0 — and `LDB-04` D12 gives `predict-then-reveal` no bar. **So 17 of
18 Mastery bars are reachable only through a dealt hand or a question about a dealt hand**, which is
what the catalog was commissioned to escape. `classification.md`'s header records why nobody noticed:
the classifier was told *"not to rank on usefulness to the product"*, so its only axis is
substantive-vs-cosmetic on **measurement**. **The question "would this be good to play" has never been
asked of that evidence.** `LDB-09` asks it.

**The mechanism, named so it is not mistaken for an accident.** Three rules compose into narrowness,
each individually right: `LDB-01` §2's ship test (an outcome with no grading authority does not
ship); `LDB-03` §6's coverage rule, which permits activities **only** in service of a Skill and
forbids inventing one; and `LDB-04` D6, which admits only `primaryFor` evidence. Nothing may enter the
product unless it measures a Skill, and the Skill set was fixed first by a graph with **one**
evidence-backed edge. `LDB-04` D6 already wrote the counter-argument — *"an app in which every
interaction is graded is a quiz with a card table drawn behind it"* — and nothing was built on it.
Register row `A-18`'s named method is *"instrument the first non-quiz activity against a quiz
baseline"*, and it is **unclosable as designed**, because the design produced no non-quiz activity.

**The decisions.**

1. **The economy builds in phase 5.** `LDB-05` was approved 2026-08-05 and **no phase claimed it** —
   phase 5 named the L2 foundation and the two orphans, phase 6 named L3, and the standing phase-5
   candidate slice was designed 2026-07-23, before `LDB-05` existed. The Wallet is also what makes
   `ProgressStore`'s first consumer real. **Two of its six deltas defer to phase 6** — the engine-side
   table catalogue and the Table tiers it denominates — because that one crosses the WASM boundary,
   the wire contract and the golden fixtures, and every number in it is invented (`A-07b`). Phase 5
   ships one tier, and D3's boundary reads that tier rather than a hardcoded zero.
2. **`LDB-06` D3's per-session organic Closing run is withdrawn.** It **deadlocked**: D7 bounds a
   Short session at 10 Presentations, D8 forbids starting an activity after a bound, D9 makes a
   Closing run a whole shoe — so a Short arranged session could not legally end. The cheap repair was
   already foreclosed, because the examiner's own F5 fix had just made table evidence
   non-window-eligible for exactly the Skills the rule served. `LDB-04` D7 carries the guarantee
   unchanged; the bridge §4.6/§7 resolution D3 exists to deliver is untouched.
3. **The table gets an optional Classification capture** (`LDB-06` §12 divergence 5). The 2026-08-08
   scope limit made `classify-hand`, `strategy-action`, `legal-fallback` and `adherence-under-loss`
   unmasterable at a table, so *"measure play, not quiz scores"* was true only of
   hit/stand/double/split — an inversion that arrived from a taxonomy `produced` contract rather than
   a product ruling. It was declined on 2026-08-08 as bending the honest simulator;
   `product-vision.md:69-71`, reopened, permits help **around** the game and forbids manipulating
   cards, and an optional control manipulates nothing. Costs one new field (`LDB-06` §11 item 5).
4. **An up-only streak ships, and a removal must name its replacement.** `ACT:388` bans *loss-framed*
   streaks; the 2026-08-08 ruling declined every streak on the wider claim that all shipped streaks
   are loss-framed by construction — a claim about other products. The standing rule is now in
   `AGENTS.md` §Constraints, and the evidence for it is that `LDB-05` §0.1 named the
   design-the-fun-out habit and `LDB-06` D8 removed streaks three decisions later anyway.
5. **The evidence index is corrected; the live half is carded.** Its README asserted in the present
   tense that 14 Phase 1 corrections were still absent from the archive. **False** — `96b0f05` banked
   the index, `6da7e9f` landed the corrections the same day, and nobody returned. Verified by
   searching each correction's own string in the promoted dossiers and counting hits. **The Phase 3
   half is genuinely open** and is now `LDB-10`: ten `V-C7-topup` corrections never applied, which
   `P3-evidence-catalog.md:369` records as **net pessimism-correcting** against `V-C7.md:190` — *"the
   dossier is systematically pessimistic on trainability, and that pessimism is an artefact of where
   its search stopped."* **The blueprint was designed on the uncorrected version**, which bears
   directly on whether the design came out too strict.
   > **SUPERSEDED 2026-08-17 at `LDB-10` — see the entry of that date.** The Phase 3 half was *not*
   > open. `6da7e9f`, the same commit this item credits with landing the Phase 1 corrections, landed
   > the Phase 3 ten as well, seventeen minutes after `96b0f05`. This item diagnosed the mechanism and
   > then repeated it on its own third clause. The blueprint was designed on the **corrected**
   > dossier; the design did not come out too strict for this reason.
6. **Delete the duplicate rather than watch it.** ROADMAP's phase-4 deliverable **status** column
   drifted against the board three times — 2026-08-02, 2026-08-04, 2026-08-15 — each time the same
   way, each time caught only by a `/start` reader comparing by hand. The proposed fix was a seventh
   `check-doc-drift.sh` check. **The status column is deleted instead**; `journal/tasks.md`'s Done
   lane is the record, and a tool already validates it. The deliverable *list* survives, because it
   defines phase-4 scope, never drifted, and holds the only record of deliverable 8, which has no card.
7. **`LDB-09` runs before the `LDB-06` gate** — sequencing, deliberately **not** encoded as a
   `Depends on` edge, per the `AGENTS.md` rule this repo has already had to enforce surgically once.
8. **An Activity type may grade nothing if it names the Skill it rehearses.** A fixed budget of such
   types was offered and refused: it would be a constant with nothing behind it.
9. **Whether the eight `state-report` Skills keep Mastery bars is `LDB-09`'s to rule.** A learner who
   plays 20 hands has shown `card-values` and `hand-total` without being asked. **This is the Skill
   list — the most expensive artifact in the blueprint to change**, because every `ProgressAttempt`
   carries `evidence.skillId` and the Mastery window keys on it. It is cheap **only** until phase 5
   stores its first Presentation.
10. **The shell pass is owed to phase 6, and named now.** `LDB-02` catalogued exercise formats;
    nobody has catalogued the path, the map, the daily goal, the return ritual, characters or sound.
    It is L3 and cannot precede a loop to wrap — but phase 6's exit is *a first playable game*, and
    discovering the shell missing at that exit is the mirror of the error the roadmap already refuses.
11. **`LDB-09` gets its own card and its own gate**, rather than reopening `LDB-02`, whose Done card
    holds its research-gate evidence.
12. **A change to an approved spec is surfaced as a divergence at a gate**, the way `LDB-04` §12
    divergence 0 was — so `LDB-01` is amended because the owner assented, never because a later
    document quietly disagreed.

**Phase 7 is not pure expansion, recorded because it reads as though it is.** The counting on-ramp
adds a **fifth Condition axis** — a change to the evidence model every stored attempt is recorded
against — and a real leaderboard implies server authority. `LDB-01` §4 designed for the axis
deliberately, so it is cheap if it stays additive; both are now named in `ROADMAP.md` §Phase 7.

**One gap in the instrument, worth more than any single decision here.** `LDB-06`'s `audit-examiner`
pass assessed 48 claims and found 12 to revise. The D3/D7/D8 deadlock was **not** among them, and
could not have been: every one of the three rulings is individually warranted by its evidence, and
the pass asks whether each claim is warranted, never whether the rulings **compose**. A clean examiner
result is not a clean design, and the next document to run one should not read it as one.

---

## 2026-08-15 — `LDB-09` approved: five ungraded Activity types, and the eight `state-report` Skills keep their bars

**The gate.** `LDB-09` was created by the pre-gate grill earlier the same day (previous section) and
ruled at its own `user-approval` gate that evening. Spec:
`docs/superpowers/specs/2026-08-15-play-verdicts-and-ungraded-activities.md`. Six divergences were
surfaced in its §12 and ruled together; none was applied before the ruling.

**The premise this card was created on was false, and the correction is why it matters.** Decision 9
of the grill read: *"A learner who plays 20 hands has shown all eight `state-report` Skills without
being asked."* Checked against the shipped table rather than recalled, it is **false** — the engine
performs all eight and the player watches. `HandView.tsx:13,16` prints the summed total;
`totals.ts:22` resolves the Ace to `7/17`; `Table.tsx:12-14` prints Win/Loss/Push; `Table.tsx:15`
makes `blackjack` its own settlement label, handing over the Classification for the one
`classificationIncluded: true` Skill in the set; `Table.tsx:19-20,45` prints the delta and bankroll.
And the word *"bust"* appears **nowhere** in the shipped UI — 0 non-test hits across
`web/src/app/*.tsx`, searched positively rather than inferred from silence.

**So the choice was never "bar, or redundant with play". It was "bar, or nothing."** These eight are
exercised in exactly one place today and that place is the quiz.

**The ruling: all eight keep their Skill AND their bar; the evidence route changes.** A totals
disclosure setting is introduced, and with totals hidden the evidence is produced **in situ** during
play — the move `LDB-03` §6.1 already made for `classify-hand` inside `deal-and-decide`. The
standalone question survives as the first-exposure form only. **Reversal cost: nil.** No Skill id, no
bar and no `schemaVersion` moves, and `LDB-04` D12 already precedents keeping a Skill without a bar.
The expense the grill named as the reason this could not wait turned out not to be incurred.

**Had the other horn been taken**, 9 bars would remain and 8 of them would run through
`deal-and-decide` alone. Demotion would have **concentrated** the narrowness, not relieved it.

**An Activity type may now grade nothing, if it names the Skill it rehearses.** `LDB-03` §6's
coverage rule gains a second admission path (`rehearses`), and rehearsal is deliberately **not**
coverage — a Skill named only there is still uncovered. No budget of such types: one was offered and
refused as a constant with nothing behind it.

**Five ungraded types, ranked by cost rather than capped by count**: `hand-sort`,
`estimate-and-check`, `procedure-order`, `principle-name`, `rule-battery`. Plus a `probe` parameter
on `rule-contrast`. The taxonomy goes from 6 types to 11.

**All 19 unadopted patterns now carry a play verdict** — a question none of them was ever asked,
because `classification.md`'s classifier was told *"not to rank on usefulness to the product"*. Six
admitted, one parameter, two reported forward (`U2-3` to `LDB-07`, `U2-11` to phase 7), ten declined
each on a **play** ground rather than by inheriting its measurement ground.

**`A-18` stops being unclosable.** Its method — *"instrument the first non-quiz activity against a
quiz baseline"* — had no non-quiz activity to instrument. Five now exist, and `hand-sort` is the
cheapest instrument.

**One reuse declined, recorded because it would have been free and wrong.** `tableVisibility`
(`web/src/progress/types.ts:32`) looks exactly like the totals-disclosure field and is not: the
`support` axis is `table-open | table-closed`, *"tableOpen is the project's mastery axis"*
(`2026-08-01-skill-graph.json:8`) — the **strategy chart**, not the blackjack table. `CONTEXT.md`
now carries the disambiguation.

**Two schema deltas owed to phase 5, and one not owed.** Owed: an additive `InteractionMode`
widening, and a totals-disclosure field. **Not** owed: ungraded attempts need no schema change at all
— `{ status: 'ungraded' }` (`:49`, commented *"e.g. free play action"*), `authority: 'none'` (`:100`)
and `mode: 'acquisition'` (`:30`) already exist.

**Handed forward, not decided here.** To `LDB-04`: is an in-situ capture a separate Presentation, and
is it window-eligible? To `LDB-06`: **do ungraded activities consume the session bound?** D7 caps a
Short session at 10 Presentations and D8 forbids starting an activity after a bound, and neither was
written with an activity that produces no evidence in view. That question is reached only by
composing D7, D8 and this card's types — the exact blind spot `LDB-06` §16.1 recorded, so it is
raised to be **asked** rather than discovered.

**Enforcement, not assertion.** `scripts/check-ldb03-taxonomy.js` went from 6 checks to 8 and passes
all 8. The five new types have `primaryFor` **and** `secondaryFor` empty and would have **failed**
its check 1 as written — extending check 1 is what makes the coverage clause enforceable. Check 3
now reports `principle-name` as classification-supplied with no violation, and would fail the moment
that type were ever graded. Check 7 stops an ungraded type silently acquiring evidence coverage in a
later edit; check 8 holds the play axis to exactly the 19 unadopted rows.

**Not published to the tracker.** The remote is public and `journal/tasks.md` is the execution
authority; `ready-for-agent` would also have been a false label on a document that authorises no code.

---

## 2026-08-16 — Supabase is banked as the named future provider; IndexedDB stays for phase 5

*(Decided 2026-08-16 in `journal/sessions/banked-and-reordered-2026-08-16T22-26-10-052Z.md`; written
into the record 2026-08-17, which is the owed half of the decision.)*

**Chose:** when accounts and cross-device sync become real, the provider is **Supabase**. Nothing is
adopted today: phase 5 persists to browser-local IndexedDB through the existing provider-neutral
`ProgressStore`, because one user on one machine answers `P-1`, `P-3` and `P-5` from local attempt
data alone.

**Why — Product judgement, and deliberately so.** The owner's words: *"i want to use supabase as my
database of choice, not preticular reason, i just decided that accross all my projects supabase is my
goto."* This is a cross-project standard, not a comparison this repo ran. It is labelled as such so a
later gate knows there is no admission evidence underneath it and does not mistake the name for a
verdict.

**This is not an admission.** The six-field Tool & Runtime Admission Protocol
(`docs/specs/stack-boundaries.md`) has **not** been run: no active consumer, no alternatives
compared, no exit condition. Nothing enters `web/package.json`. The stack document's *"no account
provider, BaaS, telemetry service, or hosted database has been admitted"* stays literally true, and
the bank is filed under *Banked evidence for future triggers* precisely because that section admits
nothing. Naming the destination early buys one thing only: the protocol gets run against a known
candidate instead of under deadline.

**Trigger — any one of:** a second device, a second user, or server authority. The last is already
described in `ROADMAP.md:307` — the engine is client-authoritative and the browser can see the whole
undealt shoe, so a leaderboard on this architecture is forgeable and a real one means server
authority, an architecture change rather than a feature (`CLOUD-06`).

**Schema: no change owed — checked, not assumed.** The worry that the store was envelope-shaped and
would need reshaping for a relational backend is wrong. `web/src/progress/idb-store.ts:111-114`
creates three row-keyed object stores (`meta` singleton on `id`, `attempts` on `attemptId` with a
`by-revision` index, `sessions` on `sessionId`); `learnerKey` is already a column
(`web/src/progress/types.ts:70`) and `attemptId` is already primary-plus-idempotency key
(`types.ts:66`). `LearnerEnvelope` (`types.ts:146`) is a read projection `load()` assembles, not the
storage layout. **Evidence-backed** — each locus opened 2026-08-17.

**One residual, for whoever writes the Supabase adapter:** `evidence.skillId` sits inside a nested
struct (`web/src/progress/types.ts:75-80`) and wants promoting to an indexed column, since mastery
folds on it. Not a phase-5 change; IndexedDB indexes nothing on it today either.

---

## 2026-08-17 — The `LDB-06` gate grill: fourteen rulings closing the session-composition gate

`/mattpocock-skills:grill-with-docs` over Group 2 of
`docs/superpowers/audits/2026-08-15-ldb06-redraft-corrections.md` — the 13 gate rulings left by the
two-instance `audit-examiner` pass of 2026-08-15, plus one question the grill itself opened. All
fourteen are landed in `LDB-06`; the ten Group 1 text repairs are landed with them, and
`AGENTS.md:20`'s propagated misattribution is fixed.

**`LDB-06` remains DRAFT.** Its gate *questions* are settled; the gate itself has not been recorded,
so §14's `CONTEXT.md` vocabulary and its two owed `journal/decisions.md` rows still land at approval,
not here.

| # | Ruling | Where |
|---|---|---|
| 1 | **Unmeasured Activities consume the session bound.** D7's "commensurable" ground is retired — it was already false, since abandoned and chart-open Presentations consume the bound and fill no window. Short now fills *at most* one window. | `LDB-06` D7; answers `LDB-09` D11 |
| 2 | **D14's band selects the session shape.** Bands 2/3 → Coached; bands 1/4 → Closing run. Fills `RC-01`'s gap, which had left five parameters with no producer. Adds no constant; satisfies `RC-16`. | `LDB-06` D9 |
| 3 | **The strategy chart is available at a Table sitting**, and opening it costs window eligibility. Reverses D9/D10 as drafted, which had removed it by side effect. | `LDB-06` D9, D10; §12 divergence 7 |
| 4 | **No Unmeasured Activity inside a Closing run.** `acquisition` in an `assessment` session, revealing in-activity against `deferred-to-debrief` — the exact combination Brummer singles out as worse than either alternative. | `LDB-06` D9 |
| 5 | **A Table sitting produces a `SessionRecord`.** `closeReason` gains `'cashed-out'` / `'wallet-exhausted'`; `budget` becomes nullable. | `LDB-06` §11 item 6 |
| 6 | **`presetId` moves onto the attempt.** `A-07e`'s named test measures completion rate and could only see sessions that completed. | `LDB-06` §11 item 7, §10 |
| 7 | **The Activity type is the Mastery window's key, not `evidence.skillId`** — plus the `produced`-contract clause, which is D2's scope limit generalised. `LDB-04` never used the word `skillId`. | `LDB-06` §11 item 8 |
| 8 | **The debrief replays every *produced element* that diverged** — Classification or action, not decisions only. | `LDB-06` D16 |
| 9 | **The streak counts practised days, not closed sessions.** A session count rose for a learner who tapped "stop" and not for one who closed the tab. | `LDB-06` D8; §12 divergence 6 |
| 10 | **A table Presentation opens Practice and does not spend the first-exposure licence.** Otherwise a hand dealt at Free Play permanently forecloses the curriculum's introduction. | `LDB-06` D13 |
| 11 | **§15 criterion 3 reads its count from the taxonomy JSON**, and D4 gains five rows. `hand-sort` is **mixed** — a blocked hand-sort is a sorting task with one bin. | `LDB-06` §15, D4 |
| 12 | **The bands order Skills; a second published rule picks the Activity type** from `primaryFor` ∪ `rehearses`. Band 3 opens with an Unmeasured Activity. Without this, five new types were unselectable — as `policy-paint` and `rule-contrast` already were. | `LDB-06` D14 |
| 13 | **`A-23`'s register row re-grounded** on `LDB-04` D7's organic floor; the shape it cited was withdrawn on 2026-08-15. | `LDB-06` §10 |
| 14 | **A chart-open hand does not move the Player score.** The rating gates difficulty (`LDB-05` D7), so inflating it hands the learner tables they cannot play. No damping factor. | `LDB-06` §12 divergence 9 |

**The concept rename.** *Ungraded Activity* → **Unmeasured Activity**, and the five types are graded,
show their verdict, and earn low XP — amending **approved** `LDB-09`, recorded as a banner on that
document rather than a silent edit. The word had welded four separable properties into one: recorded,
feeds the Recommender, verdict shown, moves a bar. `LDB-09` D8 already made the first two true; only
the fourth is load-bearing, on `LDB-03` §6.1's ground that a decontextualised sort *"measures it out
of the situation that makes it hard."* `AttemptDisposition`'s `{ status: 'ungraded' }` is unchanged —
it describes grading *authority*.

**Two findings about the instrument, not the design.** Instance B over-scoped an absence claim
(`ungraded` *"appears nowhere"*; it appears three times) — **failure class 3 recurring inside a pass
built to catch failure class 3**, third occurrence. And the largest ruling of the session, the chart
at a Table sitting, was a handoff from instance A to instance B that **no carrier existed for**: they
ran concurrently and B had already finished. Two parallel instances find more and route worse. Run
the second after the first, or name an owner for the handoff before either starts.

**Nine schema deltas now owed to phase 5** (was five), of which three are new fields and one — §11
item 8 — is a reducer *rule* rather than a field, and is the one most easily lost: building the window
the obvious way, one attempt one Skill, makes D2 unimplementable and will present as a D2 problem.

## 2026-08-17 — `LDB-10`: the corrections were already landed, and the pass that said otherwise had just diagnosed why

**The card's premise was false, and the falseness is the finding.** `LDB-10` existed to apply ten
`V-C7-topup` corrections described as *"never applied — that is the outstanding work item."* All ten
had been applied on **2026-07-26 in `6da7e9f`**, seventeen minutes after `96b0f05` banked the page
that said they had not. Verified in the target file, not in an audit record: twelve loci opened in
`C7-probability-ev-variance.md` and matched against the exact replacement wording, enumerated with
line numbers in `P3-evidence-catalog.md` §2. Counting check — `96b0f05` holds **0** `LANDED C-C7T`
markers, `6da7e9f` added **18**.

**The repetition, not the staleness, is what earns a row here.** The 2026-08-15 evidence-index
correction pass diagnosed this exact mechanism, named `96b0f05` and `6da7e9f` by hash, wrote *"nobody
came back to this page"*, corrected its Phase 1 items 1 and 2 — and then asserted in its own **item
3** that the Phase 3 ten were *"still unapplied. This one is live."* It never asked whether the
commit it had just credited had also landed those. **Second documented instance of the
rules-do-not-fire-on-their-author class**, after `LDB-06` D8. No new rule is proposed: the four
evidence rules in `AGENTS.md` already forbade this and did not fire. What caught it was opening the
file.

**Four documents carried the false state; all four are corrected** — `P3-evidence-catalog.md`,
`evidence-index/README.md`, **bridge §0** (the Phase 4 authority document every card was told to read
first), and this log's 2026-08-15 item 5, marked superseded in place.

**Two gaps that page left open are closed in the same pass.** The `C-C7T-009` trap was **honoured** at
landing — `:1757-1764` states it used the corrected `README.md:50-66` characterisation of Floyd rather
than the verifier's own wrong description. And the F1–F14 byte-integrity gap, which the verifier said
only a shell could settle, **is settled**: each `#### Fn:` section hashed at `55f24aa` and again
after the 2026-07-26 landing gives F1–F14 **identical** and exactly F15–F20 changed — precisely the
correction set.

**`A-16`'s comparator is resolved and landed at all three loci together.** An independent re-check
reopened the source instead of reading reviewer records. *"Than unaided play"* is **an addition**: the
publisher abstract states the claim bare — *"its use is associated with better expected returns"* —
its only comparator bonded to *ease of learning*. Absence enumerated positively (`unaided`, `compar*`,
`versus`, `control`, `outperform`, `basic strategy`: **zero** occurrences in 244 words), and
corroborated against the dossier's own verbatim abstract at `C7:1643-1657`.

**The correction runs opposite to the direction anyone expected.** Two adjacent sources *do* name a
comparator — *players' actual hit–stand play*, not unaided play and not basic strategy — and on the
author's own blog arithmetic the heuristic is **~0.04% worse** than perfect basic strategy. The
finding has opposite signs on its two limbs, and the struck wording invited the inference that a false
heuristic beats optimal play. Both figures stay **labelled leads, not Evidence-held**: F20 carries the
standing prohibition *"nothing here may be cited as a number"* (`C7:1567`), and this card authorised
no collection. `A-16`'s validation method is unchanged — a citation was corrected, not a ruling.

**The product consequence inverts the worry that pulled the card forward.** The landing precedes every
Phase 4 decision, so the blueprint was **not** designed on an uncorrected dossier. The residual
exposure runs the other way: cards reading the *index* saw F15, F16, F17, F19, F20 flagged *"do not
cite as written"* when all five were safe. **One confirmed cost, found by grep rather than assumed:**
`LDB-06` D11 (`2026-08-08-session-composition.md:801-805`) declined to lean on bridge §1.4 on the
strength of a `[DEFECTIVE-SOURCE]` tag that was stale the day the bridge was written — `C-C7-007` is
present at the original bank `55f24aa`. The effect there is a weaker evidence label, not a different
decision, and is reported to `LDB-08` at that weight.

**Left for the owner, deliberately not applied:** lifting the `[DEFECTIVE-SOURCE]` tags on bridge §1.4
and §1.6. Both defect sets are repaired, but lifting them changes what a spec may lean on — a ruling,
not a side effect of a correction pass.

**Two observations, neither acted on.** `check-doc-drift.sh` does not cover the evidence-index-versus-
archive pair, which has now drifted twice against the same commit — the deletion precedent (2026-07-26
item 6, *"delete the duplicate rather than watch it"*) has been applied instead by retiring the index's
cite-the-correction-not-the-dossier instruction, and whether a seventh check is also wanted is open.
And `journal/raw/` is gitignored with **zero** inbox records tracked, so this re-check's record — and
three pre-existing records cited from authority documents — survive on one machine only.

## 2026-08-17 — Three rulings at the `LDB-10` gate

Taken together after the correction pass above, each on evidence gathered during it rather than on
the shape of the problem.

**1. Bridge §1.4 and §1.6 lift from `[DEFECTIVE-SOURCE]` to `[VERIFIED]`.** Not "repaired, status
unclear" — both meet the bridge's own definition of the tag, *independently checked against the
opened source*. §1.4's delMas was opened at `jse.amstat.org` and `V-C7.md:30` records *"two
independent targeted re-reads"*, with `C-C7-007` corrected against verbatim source text and landed at
`55f24aa` — **so that tag was stale the day the bridge was written**. §1.6's Weber was read in full
and independently reopened by the top-up verifier (`V-C7-topup.md:50`). A `[REPAIRED]` third value was
considered and declined: the vocabulary already declares three values and uses one, and a fourth would
have to be learned by every future reader to say something `[VERIFIED]` already says. `[DEFECTIVE-SOURCE]`
is now unused; the vocabulary is retained for the next real defect.

**2. A seventh `check-doc-drift.sh` check, keyed on correction IDs.** The evidence bar in `AGENTS.md`
— *"a documented failure or a measured retrofit cost, never just in case"* — is met twice over, both
failures against the same commit pair. The 2026-07-26 *"delete the duplicate rather than watch it"*
precedent was applied **first**: the index's *"where a row says a correction is unapplied, cite the
correction, not the dossier"* instruction is retired, and its state claims are rewritten from
transient (*unapplied*) to terminal (*landed at line N*). The check exists because deletion alone
relies on a rule, and **this repository's most expensive lesson is that rules do not fire on their
authors — mechanisms do**. It fails when an index page makes a live unapplied-claim naming a
correction ID or `V-` record for which the archive carries a `LANDED` marker; struck text is excluded,
so history stays readable. **Regression-tested, not asserted**: run against the pre-correction tree it
fires at all four historical loci including `README.md:74`, the exact line the 2026-08-15 pass wrote;
against the corrected tree, 7 checks clean. Its limit is stated in its own output — a claim naming
neither an ID nor a record cannot be cross-checked.

**3. A record an authority document cites gets promoted into the tracked archive.** `journal/raw/` is
gitignored and held **zero** tracked records while four authority documents cited into it, so every
one of those citations pointed at something that survived on one machine. Four records promoted and
tracked: the A-16 re-check → `foundation-audit-p3/verification/V-A16-comparator.md`; the Floyd
retrieval → `foundation-audit-p3/collection/C8-floyd-2006.md`; and the `LDB-01` and `LDB-03`
claim-checks → `docs/superpowers/audits/`. Live-authority citations repointed; historical process
records left alone, because the raw path was true when they were written. `journal/raw/` stays
ignored — this is promote-on-citation, not tracking the inbox. Tracking it wholesale was declined:
the remote is public and the ignore exists to keep scratch out of it.

---

## 2026-08-17 — Phase 4 owes no milestone QA pack, and the QA rule gains its missing case

**Chose:** phase 4 closes without a milestone QA pack run. The `AGENTS.md` QA rule is amended so
ledger scoping is authoritative over the every-milestone phrasing, rather than phase 4 standing as a
one-off exception.

**Why — Evidence-backed, and mechanical.** Phase 4 produced no product code. 119 commits since
`6686e50` (2026-07-19), of which **0** touch `crates/` or `web/`
(`git rev-list --count 6686e50..HEAD -- crates/ web/`). Every coverage area in `journal/qa/ledger.md`
carries a last-passed commit at or before that point, so no area has a changed watched file. A pack
run today could not find a regression, because `git` already proves more completely and more cheaply
that nothing regressed. It would re-stamp identical bytes and produce a PASS that means nothing.

**The rule was underspecified, not too strict — and the second bullet already held the answer.**
*"Every milestone closes with a milestone QA pack run whose product verdict gates the phase boundary"*
was written when every milestone shipped code; phase 4 is the first design-only milestone and the
clause has no reading for it. But the very next bullet says QA is **ledger-driven** — *"deep-test
only what is new or changed since an area's last-passed commit"* — which applied honestly yields
"nothing changed, so nothing is in scope." The amendment makes that precedence explicit. It is a
**precision edit, not a relaxation**, and it opens no escape hatch: the test is mechanical (did a
watched file move since the area's last-passed commit?), not a judgement anyone can argue their way
through, and a milestone that shipped one line of product code still owes a scoped run.

**Not a category error swapped for another.** Phase 4's output is a blueprint, and a *product*
verdict on a document is the wrong instrument. What gates a design phase is owner approval — which
phase 4 already has, as `LDB-08`'s exit criterion. Design is verified by review; behaviour is
verified by QA. Nothing is going ungated here.

**The removal names its replacement**, per the `AGENTS.md` rule. Three things carry the load a pack
would have carried: (1) **no baseline moves** — every Last-passed commit in the ledger stands
unchanged, so phase 5's first slice deep-tests against the phase-3 baseline and inherits no
undeserved credit; (2) **the no-op is recorded in the run log, not omitted** — a reader seeing no
phase-4 row would have to guess whether a pack was skipped or forgotten, and the row states the
measurement that made it a no-op; (3) **the amended rule fires next time on its own**, rather than
this ruling having to be remembered — which is this repository's most expensive lesson, that rules
do not fire on their authors and mechanisms do.
