# Review: the 2026-07-26 Repo Restructure — Sufficiency Verdict and Findings

**Date:** 2026-07-26
**Reviewer:** independent read-only pass (Fable 5), commissioned by the owner.
**Scope:** commits `96b0f05`, `6da7e9f`, `4203f88` on branch `claude/wl-start-ee6c56`, reviewed against the full repository state.
**Standard applied:** every quoted source was opened in full or at the cited locus. Where a claim of absence is made, the search performed is stated.

---

## Verdict

**Not yet.** Followed literally, the plan does not lead where it should without improvisation, and it does not stop the owner at the points where he needs something the plan does not contain. It fails the stated criterion at four specific places — and at three of them, drift of exactly the old kind has *already* re-formed in the twenty hours since the commits landed, with nothing tripping.

What is sound, and should be said first because it was the riskiest part: **Stage 2 is real.** Every one of the roughly thirty applied corrections sampled for this review (across six product documents, three Phase 1 dossiers, the Phase 3 dossier, and both gate summaries) was checked against its audit record. Every sampled edit was faithful — correct label, correct locus, original claim struck rather than deleted, verdict ID attached. The board validates cleanly. The code claims in the bridge and the verdict catalog were re-verified first-hand against `web/src/` and `crates/` and hold.

Where the path is not paved:

1. **The resume point does not know the work is finished.** The plan every fresh session is told to read first says `Status: in progress` and marks only Stage 1 done. A literal follower re-executes Stage 2, re-landing corrections onto documents that already carry them.
2. **The two external-information decision points the owner named are exactly the two the structure does not hold.** The one internet-research card (LDB-02) has no sufficiency criterion; the playtest questions P-1…P-5 appear on no card, bind no phase-5 exit criterion, and their only instrumentation spec lives inside a candidate design LDB-08 is explicitly permitted to replace.
3. **The Assumption Register mandated by three authorities does not exist**, and the document that claims to contain it does not contain it.
4. **Nothing trips when drift returns — demonstrated, not hypothesised.** `README.md` and `docs/architecture.md` currently declare a build slice "active" while the board says phase 4 is design-only; the rewritten `ROADMAP.md` contradicts the QA ledger on a condition the Phase 2 audit explicitly ordered reconciled "before republishing"; the charter still asserts a phase map the restructure silently dethroned.

The founding error class also has a foothold inside the artifact built to end it: one board card misstates a Phase 2 verdict label, three documents cite the flagship source one line off, and one card's design position rests on analysis that exists only in the "pointer layer, never a warrant" index.

None of this is the old mess at the old scale. All of it is the old mess at seed scale, and the owner asked to be stopped before seeds, not after harvests.

---

## Findings, most severe first

### F1 — README and architecture.md declare the retired build slice "active" — CONFIRMED

`README.md:62-63`: "Foundations and the Strategy Profile Foundation are complete, and Graded Decision Practice is the active learning slice (Strategy Table Fundamentals is paused)."

`docs/architecture.md:20-22`: "The next product step is Graded Decision Practice: a free-decision activity graded against the verified Basic Strategy oracle, wired to a durable learner record (11-task plan)."

Both lines were **written by** Stage 2 (`6da7e9f`) and made false by Stage 4 (`4203f88`), which retired the GD cards and made LDB the active milestone. `journal/ops/tasks.md:16` says `LDB — Learning Design Blueprint [active]`; LDB-08 says the GD design is a candidate to "Confirm or replace […] rather than inheriting it."

**Cost.** The design-phase/build-phase confusion — the specific failure the restructure exists to kill — reintroduced into two authority surfaces on the day of the fix. README is the repository's front door.

**Fix.** Reword both: phase 4 (design) is active; GD is the designed phase-5 candidate pending confirmation at LDB-08.

### F2 — The resume-point plan does not track its own completion — CONFIRMED

`docs/superpowers/plans/2026-07-26-repo-restructure.md:3-4`: "Status: **in progress, started 2026-07-26.** […] This plan is the resume point; a fresh session should read it before touching anything."

`:48` — "### Stage 1 — capture (done)" — the only stage carrying a completion mark. Stages 2, 3 and 4 carry none, though all three are complete. `journal/ops/phase.md:6` repeats the stale state.

**Cost.** Followed literally, the next session re-runs Stage 2 against documents that already carry the corrections, producing double-annotation or conflicting edits.

**Fix.** Mark stages 2–4 done with commit hashes; flip the status line; point `phase.md`'s `plan:` at whatever governs phase 4 next.

### F3 — No Assumption Register exists; the document claiming to contain one does not — CONFIRMED

The mandate, `foundation-audit-p1/P1-gate-summary.md:252-253`: "decide on product reasoning, label it **Product judgement** or **Assumption**, and enter it in the Assumption Register with a named Validation Method."

The definition, `2026-07-17-adaptive-learning-foundation-audit-research.md:281-286`: a table `| Assumption | Evidence | Confidence | Validation Method |` where the method "must explicitly name the mode: **academic research · playtesting · production [telemetry]**".

The false containment claim, `2026-07-22-product-design-inputs.md:8-9`: "Evidence Summary, Research Synthesis, Project Implications, Gap Map, **Assumption Register**, and Decision Candidates appear below as sections".

The bridge was read in full. It contains no section titled or shaped like an Assumption Register — §2 lists unresolved assumptions with no validation-method column; only §6's five playtest rows name a method. Search: `grep -rin "assumption register"` returns ten hits, none of which *is* the register. No LDB card creates one. LDB-04 requires "Every threshold chosen is labelled a product judgement with a named validation method" — with nowhere for those labels to live.

**Cost.** Prose labels scattered through a blueprint return nobody to anything. When phase 5 data arrives, there will be no list of what to validate against it.

**Fix.** One file with the charter's four columns, seeded from `P2-verdict-catalog.md` §C, and a line in LDB-04's and LDB-08's Outcome requiring entries there.

### F4 — The playtest dependency is invisible where decisions are made — CONFIRMED

The five questions exist in three places. Search: `grep -n "P-[1-5]" journal/ops/tasks.md` — **zero hits**. No card cites them; no decision is marked provisional pending them, even where `P2-verdict-catalog.md` §C says the underlying beliefs need playtest data first. The mixed-practice default LDB-06 adopts is literally P-3 ("The CFL-007 ruling is a bet; instrument it").

`ROADMAP.md:139-140` sets phase 5's exit as "Real-player learning-integrity playtests pass" with no binding to P-1…P-5. The only instrumentation spec is in the GD candidate design (P-3 and P-5 built, P-1's hook, P-2 and P-4 not covered) — which LDB-08 licenses replacing. If it is replaced, the requirement silently vanishes.

**Fix.** Add the P-IDs each decision is provisional on to the affected cards; add to phase-5's exit criteria that a declared subset of P-1…P-5 is answered from recorded data, subset chosen at LDB-08.

### F5 — Citation integrity inside the LDB cards — CONFIRMED

All eight `Source:` fields were opened. Six are supported; two are not fully.

**The wrong label.** `journal/ops/tasks.md:110` (LDB-01): "The accepted Subject A/B/C spine and the 7-stage hierarchy are inputs, not answers: P2 relabelled both to **Assumption**." The 7-stage hierarchy is correct (K-U1-003, bucket Assumption). The subject spine is **wrong** — K-U7-008, bucket "**Product judgement**", and `P2-verdict-catalog.md:183` files "which subjects precede which" under §B Product judgements, not §C Assumptions. The distinction is the audit's central taxonomy: §B is free to change with a label, §C needs playtest data. The first design card of the new phase collapses it.

**The off-by-one.** LDB-02's Source, `ROADMAP.md:122`, and the restructure plan `:102` all cite `v2-research-03-course-and-source-audit.md:115`. Line 115 is "- claim provenance ledger"; the cited item is at **line 116**.

**The broken commitment.** `2026-07-26-repo-restructure.md:43-44`: "**Every card, phase, and roadmap entry cites its evidence by finding ID and archive locus.**" No card's `Source:` contains a finding ID. `phase.md:54` repeats the unmet commitment.

**Fix.** Correct LDB-01's Outcome; fix `:115`→`:116` in three places; add finding IDs or strike the commitment.

### F6 — The first move on resume is contested by three authorities — CONFIRMED

The board selector returns `LDB-02`. `ROADMAP.md:132` states the order beginning with outcomes and skill graph (LDB-01). `journal/ops/phase.md:54` instructs shaping a board that already exists, then LDB-01. The lifecycle engine resolves board-first (`wl-lifecycle.ts:393`), a precedence the restructure plan lists as deferred and left live on the paved path.

Related: LDB-06 depends only on LDB-03 and LDB-04, so session composition may be offered before the economy, against ROADMAP's stated order.

### F7 — The rewritten ROADMAP repeats a claim the audit ordered reconciled, and inflates a test count — CONFIRMED

`P2-verdict-catalog.md:203` (§D): "Reconcile `ROADMAP.md:43` against `PROGRESS.md`, the stale `idb` 'pending' note, and the Tier-1 suite enumeration **before republishing**."

`ROADMAP.md:215` still says two conditions remain including "the production bundle-delta measurement". The QA ledger records it PASS at 1,382 bytes gzipped. The reconciling nuance — the measurement used a throwaway probe because no real adapter existed — appears nowhere in ROADMAP.

`ROADMAP.md:37`: "~100 Rust tests". Counted: `grep -rn "#\[test\]" crates` → **80**. `PROGRESS.md:25` says 80. The ledger records that an inflated count has been corrected before ("The earlier 92-test report was corrected after a fresh recount on 2026-07-15"). The suspicion that layer states were written from agent reports rather than the code is confirmed in this instance; every other L1/L2/L3 state claim checked did hold.

### F8 — The evidence index authors analysis that exists in no archive — CONFIRMED

`evidence-index/README.md:19-20`: "**A row here is a pointer, never a warrant.**"

But `activity-and-storage-catalog.md:173` maps ALR-039 to specific WCAG criteria including "3.1.5 Reading Level (**AAA**)", and `:190` concludes "Choosing **AA + two named above-baseline commitments** is the honest framing". Searches across `foundation-audit-p2/` and the ACT baseline: no hits for any of those criteria. This mapping exists in no archive; ALR-039 is on the audit's never-examined list. Card LDB-07 adopts the conclusion nearly verbatim while citing bridge §8, which contains none of it.

Same pattern: `P3-evidence-catalog.md:313-317`'s instrumentation column has no source in the bridge, whose §6 has two columns.

**Cost.** The founding error's exact shape, one generation in. The facts are probably right and externally checkable — but uncheckable *by the project's own rule*, because there is no archive record to open.

**Fix.** Promote the content into an owned spec with the sources opened first-hand, or mark those rows "index-original, unverified — reopen before relying."

### F9 — LDB-02 re-enters research without the machinery built after research last burned the project — CONFIRMED

The dependency *is* stated: LDB-02's Next says "survey how comparable trainers structure non-quiz practice." What is missing is everything that made P1–P3 survivable: no sufficiency criterion, no source register, no verification requirement, no invocation of the research-plan skill the repo itself points to. The card's `Gate: user-approval` and `Evidence: pending` are the whole contract.

**Cost.** Competitor-survey research is precisely where inherited citation breeds — vendor self-description, unopened marketing pages. The mess's research phase began the same way.

### F10 — The charter still asserts the dethroned phase map — CONFIRMED

`2026-07-17-adaptive-learning-foundation-audit-research.md:312-314` still says "`phase.md`'s `roadmap_step: 2` (V2) is correct through P5." `phase.md:3` now reads `roadmap_step: 4`. The old ROADMAP named the charter the phase-map authority; the new ROADMAP never mentions it (`grep -in charter ROADMAP.md` — zero hits). The authority was silently dethroned and not edited.

Inside ROADMAP the token collision is live: `:66` "Roughly 90 of the 96 **Phase 1** findings" (research-P1) sits 25 lines from `:91` "1. [x] **Simulation foundations**" (delivery phase 1). No sentence maps the audit P-numbers onto the delivery phases.

### F11 — Cards have no acceptance criterion — CONFIRMED

The v1 board archive shows what was lost with `Done when`: "`Verification -> Done` requires demonstrable `Done when` satisfaction". In v2, every LDB card's Outcome is a description and its `Gate: user-approval` is a judgement with no stated basis. For a design phase owner approval is the right gate; the defect is that no card states what the owner should check before approving. The last approval-without-criteria produced the GD board he had to retire.

**Fix.** End each Outcome with one falsifiable "Approvable when:" sentence. No tooling needed.

### F12 — No tripwire exists for any signature of the old drift — CONFIRMED

What the machinery checks: schema, lanes, ID uniqueness, `Roadmap:` = `roadmap_step`, `Plan:` resolves, single active node. What it does not: `Source:` at all, card claims against cited documents, README/PROGRESS/architecture against the board, gate summaries against their own records, corrections raised vs landed. CI contains only `pages.yml` — no validation runs automatically.

F1, F7 and F10 all formed *after* the restructure's own fixes and are all invisible to the machinery. The next mess has the same detection latency as the last.

**Fix.** A read-only script or standing `/wl-start` checklist that greps the five known drift pairs. The pairs are known precisely because each has now failed once.

### F13 — The Tier-1 QA enumeration was fixed for `qa:learn` and re-broken for `qa:progress` — CONFIRMED

`qa-playtest-process.md:33-34` as corrected lists four roles. `web/qa/run-all.ts:12-16` runs five — `rules, flow, breakit, learn, progress` — and the ledger confirms all five. The correction closed the named instance and committed the identical gap for the role added since. Small in itself; large as a signal that the process fixes instances, not classes.

### F14 — PROGRESS.md was not rewritten while remaining the declared authority for "in progress now" — CONFIRMED

`docs-map.md:47` crowns PROGRESS for "What is done / in progress now", under the rule "If two docs disagree, the one named here wins."

Its In-progress section contains no mention of phase 4, the LDB board, the restructure, or the evidence index. It routes work to a phase that no longer exists, and urges the freshness fix "should stop waiting" while ROADMAP assigns it as a phase-5 passenger. Stage 2 deleted PROGRESS's internal contradiction and stopped there.

### F15 — The banner fix introduced a new false citation — CONFIRMED

`learning-mastery-and-scoring.md:3-5` as rewritten: "Status: active for V2 — cited as binding design authority in `journal/ops/phase.md`". That file does not cite this document anywhere (`grep -n "learning-mastery" journal/ops/phase.md` — zero hits). It also overshoots the audit's ruling, which holds the doc's ladders as relabelled product judgement Phase 4 *may adopt*. And `docs-map.md:65` still reads "Future V2+ …", which by docs-map's supremacy rule overrules the new banner.

**Cost.** The corrections pass — mandate "no new judgement" — manufactured one new inaccurate citation while landing thirty-one accurate ones.

### F16 — Decomposition gaps — CONFIRMED

Two bridge open-decisions have no card owner: "Whether the curriculum teaches EV explicitly at all" (and LDB-01's Outcome silently presumes yes) and "Whether to adopt a deliberately simplified heuristic as a scaffold". A third, rare-event exposure, is listed open in the bridge's §7 while its §4.6 states it as a requirement — the bridge contradicts itself, and LDB-06 inherited one side without flagging it.

Otherwise the decomposition is sound: all ten ROADMAP deliverables are covered, the dependency spine matches the stated rationale, and LDB-08's "one approved slice is not a blueprint" correctly refuses the shortcut that ended the last phase.

### F17 — What the ROADMAP rewrite lost

Mostly deliberate and net-positive. Recoverable losses: the charter-authority sentence (dropped without updating the charter); the backend candidate list in the accounts row; the V2 "build the learning loop in this order" paragraph, whose Free-Play-coaching-comes-last ruling now survives nowhere explicit; and "The table remains user-toggleable; no-table testing and realistic pace are later mastery work."

### F18 — Minor mechanical residue

The active milestone's `Plan:` points at the restructure plan, which contains no phase-4 execution guidance. The eleven `<!-- removed: GD-… -->` tombstones sit under `## Blocked` — legal, mildly misleading. Board validation, `roadmap_step` agreement, docs-map rows and ID-burn bookkeeping all check out; no surviving `Roadmap: step 2` outside archives.

---

## Disposition of the five suspected gaps

- **A** — Confirmed with a correction: the external dependency *is* stated; what is missing is sufficiency, verification, and protocol (F9).
- **B** — Confirmed and sharpened: also unbinds phase 5's exit (F4).
- **C** — Confirmed, worse than suspected: the bridge *claims* to contain the register (F3).
- **D** — Confirmed; v1 had both the field and the transition that consumed it, v2 lost both (F11).
- **E** — Confirmed by demonstration: three fresh drifts already live, none flagged (F12, F1, F7, F10).

## Verified sound

Stage 2 sample, all faithful to their audit records: K-U2-001/002/003/006/007/010; K-U1-003/004/014/016/017; K-U3-001/002/007; K-U4-003/004/005/013/016; K-U5-008; K-U7-004/006/007/008/009; C5 F3/F4/F13–F15; C7 top-up C-C7T-001/003/004, and 009 correctly landed from the corrected Floyd record with the re-inheritance caution; `P1-gate-summary.md:411` struck with the fourteen enumerated. The four deliberately-unapplied code verdicts are carried forward as stated.

ROADMAP layer claims re-verified first-hand: no CSS anywhere under `web/`; two-value `useState` navigation; `CoreCommand` has no strategy-advice variant while `basic_strategy_action` exists; no `surrender` token in core sources; no wasm32-target test; the freshness guard watches only `src` + `Cargo.toml`; mastery is one line; "nothing is locked"; ledger corroborates 28/28 and QA-014 open.

## Sources not opened

Primary research papers — outside the repo; claims about them checked only against the project's archive records. Not re-performed: the corpus-wide "essentially nothing" sweep behind LDB-02 (the two named seeds were opened and exist as described); "90 of 96 P1 findings"; "Three Phase 1 findings touch L3". No build or test suite was executed; test counts come from source grep plus the ledger.

## The shortest path to "yes"

In order: F2 (mark the plan done), F1 (two sentences), F3 (create the register), F4 (P-IDs onto cards and into phase-5's exit), F5 (one label, one line number, one commitment), F14 (fifteen lines of PROGRESS). That set converts the verdict: the corrections are already trustworthy, the board is already valid, and the remaining failures are all documents disagreeing about state — the one class of failure this project has proven it cannot afford to leave undetected.

---

## Disclosure added 2026-08-02, by a later pass — not part of the original review

> This section was appended during the PR #11 salvage. **The body above is left exactly as written
> on 2026-07-26.** It is a dated, signed record of what one reviewer concluded on one day, and
> rewriting it in place would destroy the evidence that the reviewer miscounted — which is the
> useful part, not the number.

**The claim.** The "Verified sound" section (`:181`) ends: *"The four deliberately-unapplied code
verdicts are carried forward as stated."*

**There are three, not four.** Re-derived first-hand on 2026-08-02:

- Every non-`Preserve` verdict was enumerated directly from the eight audit records in
  `foundation-audit-p2/audit/U*-audit.md` — 24 `Relabel` + 7 `Revise` = **31**, out of 102 claims.
- Each of the 31 loci was then read. Exactly **three** have a code locus: `K-U6-003`
  (`web/src/learn/validate.ts`), `K-U6-005` (`web/src/learn/controller.ts`), `K-U6-009`
  (`web/src/learn/content/blackjack-basics.ts`). The other 28 all have document loci.
- This agrees with the archive's own arithmetic: `landing/L-U6.md:5` records U6 as "Preserve 6,
  Relabel 2, Revise 1" by direct enumeration, and U6 is the only unit whose surface is shipped code.
- Verdicts from other units that *mention* code paths — `K-U5-005/011/013`, `K-U8-002/006`,
  `K-U6-001/002/004/006/008` — are all `Preserve` and carry nothing to apply, so none of them is a
  fourth unapplied verdict.

**What this disclosure does not establish.** "Verdict" is Phase 2's vocabulary (Phase 1 uses
"finding", `C-*`), so the sentence was read as Phase-2-scoped. **Phase 1 findings at code loci were
not enumerated.** If the original sentence was meant to span both phases, this correction does not
reach it, and that enumeration is still owed.

**Why it matters beyond the digit.** The miscount sits in the section certifying *other* work
accurate. This project's documented failure mode is a reviewer's record being trusted without the
underlying source being reopened; a wrong count inside a "Verified sound" list is exactly the shape
that gets inherited. Per-verdict status now lives on the rows of
`docs/superpowers/research/evidence-index/P2-verdict-catalog.md`, and each of the three has a named
owner: `K-U6-003` and `K-U6-005` on `LDB-04`, `K-U6-009` as `QA-019` in `journal/qa/ledger.md`.
