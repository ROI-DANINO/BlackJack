# Verification — Unit U8

SUFFICIENCY: INSUFFICIENT

Reason (one line): all 7 `Preserve` verdicts hold verbatim at their anchors and every supporting
citation is VERIFIED, but coverage of the five authority surfaces is short in two identifiable
places — the largest standing mandate block in `docs/specs/qa-playtest-process.md` (`:129-147`,
the Learning-integrity contract) received neither a verdict nor a note, and one live
authority-vs-authority status drift (`ROADMAP.md:43` vs `PROGRESS.md:53, :64-65`) survives against
the record's internal-consistency finding. Both remedies are **editorial** — every line needed is
inside the five files or the already-cited ledger; **no new collection is required.**

## Verdict spot-check — all 7 `Preserve` re-opened at their stated anchors

| Claim | Anchor re-opened | Quote verbatim? | Verdict holds? |
|----|----|----|----|
| K-U8-001 | design doc `:210` | Yes — "- No protocol without evidence." | Yes |
| K-U8-002 | design doc `:176`, `:177-179`; ledger `:34-36` | `:176` heading verbatim; `:177-179` text confirmed. **Exception:** the quoted "usize-width bug" + QA-001/002 trace is at `:92`, not `:177-179` (see C-U8-004) | Yes — substance intact |
| K-U8-003 | qa-playtest-process `:43-49`, `:6-8`; ROADMAP `:7-8`; ledger `:34-36` | Yes; ellipses elide "and adapted to the real V1 build;" and "then the PX agent iff…" — neither reverses meaning | Yes |
| K-U8-004 | design doc `:182`; ROADMAP `:35-36`; qa-playtest-process `:124` | Yes (bold markers dropped; an em-dash rendered as "…" — meaning preserved) | Yes |
| K-U8-005 | PROGRESS `:38-40`; decisions `:28`; arch-design `:613-616` | Yes — decisions.md:28 matches word for word | Yes |
| K-U8-006 | architecture `:71-79`; PROGRESS `:27-33`, `:64-65` | Yes | Yes |
| K-U8-007 | ROADMAP `:93-96`; PROGRESS `:34-37` | Yes | Yes — the two files do agree that STF is paused |

**Judgement on 7/7 `Preserve`: honest, not under-scrutiny — with an identified coverage shortfall.**
The evidence that decides it: every anchor I re-opened is real and verbatim; the second corroborating
sources are genuine primary documents that say what is claimed (`journal/decisions.md:28` is a
word-for-word match, not a paraphrase); and the QA-001/002/003 ledger rows are *verified* closed
findings from a real 2026-07-09 milestone run, not aspirational entries. That is the signature of
work actually done. What is missing is breadth, not honesty: two material items in files the record
already had open were never reached.

## Independent ruling — the "no protocol without evidence" test (design doc `:210`)

**Upheld: not breached.** I swept all five files for mandated protocols, gates, checklists, and
standing process requirements and traced each:

- Three seed protocols (`:176-179`): Boundary Change Checklist traces to real failure evidence in
  the same document — `:92` "the usize-width bug dealt a different shoe on wasm32 with native tests
  green; stale-WASM blocker QA-001/002" — and `:154` "wasm32 RNG divergence; 3:2 money truncation;
  QA-001 stale WASM". Curriculum checklist traces to an already-exercised gate (`validate.ts` +
  `qa:learn`, ledger `:19`). Ingestion checklist promotes already-proven fold rules.
- `journal/qa/ledger.md:34-36` **confirmed independently**: QA-001 "stale engine served silently"
  **verified** (2026-07-10); QA-002 "Mixed-rank ten-value pairs never offered Split (7/7)"
  **verified** (closed 2026-07-09); QA-003 duplicate round line **verified** (2026-07-10). All three
  are real, closed, documented failures. The examiner's characterisation is accurate.
- `architecture.md` mandates (`:19`, `:24`, `:51`, `:62`, `:87`, `:94`): each traces to an existing
  invariant, a documented failure (QA-001 for `:24`), or an approved decision (`decisions.md:24`,
  `:31`). None is a "just in case" gate.
- Deferral is genuine at `:182` — T3/a11y protocols are withheld pending evidence.

**No un-evidenced mandate found in the five files.** However, the record never examined the one
block where such a mandate would most plausibly hide — `qa-playtest-process.md:129-147`, "its QA
**must** verify all of the following", six standing required checks. I traced it myself: it is
evidence-backed (already exercised, with per-row verdicts recorded at `journal/qa/ledger.md:25`
"Six-row learning-integrity contract mapped with explicit verdicts (2 PASS, 1 PASS-precondition,
3 N/A…)", and `PROGRESS.md:62` records "two dropped learning-integrity QA gates restored"). So the
conclusion is right; the demonstration is one section short. See C-U8-001.

## Independent verification of the no-drift negative

- **Confirmed at the stated anchors.** `ROADMAP.md:93-96` and `PROGRESS.md:34-37` agree that
  Strategy Table Fundamentals is paused pending the adaptive-mechanics contracts. K-U8-007 stands.
- **Confirmed:** `PROGRESS.md:27-33` and `docs/architecture.md:71-79` match on headless proof, no
  producer wired, no learner data written. K-U8-006 stands.
- **Overturned as a unit-wide negative.** Sweeping the five files for the same class surfaced two
  live contradictions the record did not reach — `ROADMAP.md:43` describing a completed card as the
  active slice (C-U8-002), and `qa-playtest-process.md:31-33 / :117-122` describing an activated QA
  role as parked (C-U8-003). The record's calibration section ("found internally consistent") is
  therefore broader than its evidence supports.

## Accessibility grep — reproduced

Grepped all five files for `WCAG`, `AAA`, `conformance`, plus `accessib`, `a11y`, `contrast`,
`keyboard`, `screen reader`, `aria`, `assistive`. **Result matches the examiner:** no `WCAG`, no
`AAA`, no `conformance`, no level language anywhere. The only hits are `ROADMAP.md:36` "accessible
feedback" (scope phrase, not-started track), `qa-playtest-process.md:124` "| Accessibility QA |
approaching real external playtests (V3) |", design doc `:182` "a11y" (deferred), and
`PROGRESS.md:43-46` (records that accessibility evidence areas and requirements were approved
elsewhere). No accessibility requirement is *stated* in these five files, so there is no
conformance level to omit here. The family-8 finding is sound. The `PROGRESS.md:43-46` pointer is a
source lead for whichever unit audits the 2026-07-16 product/activity research, not a U8 defect.

## Corrections raised

| ID | Correction | Remedy |
|----|----|----|
| C-U8-001 | `docs/specs/qa-playtest-process.md:129-147` — the "Learning-integrity contract" — was neither given a verdict nor demoted to a note; it is absent from the record entirely. It is a **standing, currently-firing mandate**: ":131-132 — "When a scoped feature adds strategy hints, grading, explanations, assisted practice, or durable learner progress, its QA **must** verify all of the following:"" and it contains material claims in the audited families, notably ":143-144 — "any mastery or progress summary the feature shows is reproducible from the raw stored evidence and its recorded reducer version;"" (family 6, deterministic authority over mastery) and ":139-140 — "learner comprehension is judged separately from strategy fidelity, engine flow, and visual polish;"" (pedagogical). A designer builds differently depending on whether these six checks bind. Material because it changes what the record assessed. | editorial — the section, plus its corroboration at `journal/qa/ledger.md:25` and `PROGRESS.md:62`, is already in hand; no new collection |
| C-U8-002 | Live authority-vs-authority status drift of the specimen's class, missed. `ROADMAP.md:43` states: "The active slice (AL-D1) builds the cycle-1 foundation only: port, versioned envelope/attempt record, and a provider-neutral contract suite proven headless against fixtures." `PROGRESS.md:53` states: "**AL-D1 complete — the cycle-1 `ProgressStore` design and its 11-task TDD plan are approved** (2026-07-17)." and `PROGRESS.md:64-65` states: "## In progress" / "- **AL-B1 — build the cycle-1 foundation.**" AL-D1 cannot be both the active building slice and a completed design card. Secondary, weaker limb in the same ROADMAP line: "`idb` 8.0.3 is admitted — conditionally, pending a production bundle-delta check" against `journal/qa/ledger.md:25` "Bundle-delta gate PASS: `idb` costs 1,382 bytes gzipped (≈1.35 KB), well under the 5 KB alarm". Material: it is the exact drift class K-U8-007 was scoped to hunt, and it qualifies the record's internal-consistency finding. | editorial — both quotes are inside the five files; the ledger is already cited |
| C-U8-003 | The non-material note demoting `docs/specs/qa-playtest-process.md:117-127` asserts "each row is a future activation condition, not a standing requirement today". That is inaccurate for one row: ":122 — "\| Learning / Tutorial QA \| any learning, drill, or explanation layer exists (V2) \|"" — the trigger has **fired**. `PROGRESS.md:19` states "`qa:learn` now owns learning-path QA", and `journal/qa/ledger.md:19` records "`qa:learn` passed 9/9 units". Compounding it, the Tier-1 gate definition at `:31-33` enumerates "the `web/qa/` suite: `qa:rules` + `qa:flow` + `qa:breakit`" while `journal/qa/ledger.md:23` records "`npm --prefix web run qa` passed rules → flow → breakit → learn". Material: the demotion rests on a characterisation the sources contradict, and the affected text is a gate definition. | editorial — evidence present and mishandled |
| C-U8-004 | K-U8-002's claim cell attributes the quoted phrase ""usize-width bug"" and the QA-001/002 trace to the anchor `:177-179`. Neither appears there. `:177` reads in full: "- **Boundary Change Checklist** — *names* the discipline that already exists (freshness guard, golden fixtures, contract test, integer money end-to-end) and closes its three known-open gaps: (a) freshness guard must watch `Cargo.lock` + `build-wasm.sh`; (b) a native↔wasm32 parity run over the real artifact; (c) revisit the `writePending` race when a truly async sink lands." The quoted evidence is at `:92` — "usize-width bug dealt a different shoe on wasm32 with native tests green; stale-WASM blocker QA-001/002" — and `:154`. Material as a quote/anchor attribution under G9; the verdict's substance is unaffected and K-U8-002 stands. | editorial — correct anchor is in the same already-open file |

## Non-material notes (mechanical / cosmetic — not gated)

- K-U8-004 anchors the ROADMAP quote at `:36`; "T3 Visual Shell" is at `:35`. Range should read
  `:35-36`.
- K-U8-005's body anchors the arch-design quote at `:614-616`; "without betting the curriculum,"
  begins at `:613`. The proposed citation row's `:611-617` does contain it.
- K-U8-004 renders the em-dash at design doc `:182` as an ellipsis ("produces evidence... authoring
  them now"). Meaning preserved; not an inherited-ellipsis reversal.
- Bold/emphasis markers are silently dropped inside several "verbatim" quotes (`:176`, `:182`,
  `:38-40`). Consistent throughout and non-distorting.
- Observation, not a finding: `PROGRESS.md:27` records the cycle-1 ProgressStore foundation as
  shipped while `:65` lists "AL-B1 — build the cycle-1 foundation" as in progress. Internal to one
  file and plausibly reconcilable (AL-05 vs AL-B1 card scope); recorded for the reader, not raised.

## Phase-boundary rule check

1. **States what the project should now do** — none found. The record is uniformly descriptive.
   Closest approach is the non-material note at audit `:56-57` ("the two should not be conflated"),
   which instructs the *reader of the audit* on term senses, not the project on its work. Clean.
2. **Authors replacement content** — moot and confirmed: zero `Replace` verdicts, no drafted
   substitute text anywhere in the record.
3. **`Confirm / Revise / Reconsider / Remove` in a later phase's decision sense** — none. The
   legend at audit `:16` is the P2 audit vocabulary and all seven rows are `Preserve`.

## Mandatory calibration — Remove/Replace defect-real answers

Not applicable: the audit record carries zero `Remove` and zero `Replace` verdicts. All four of my
corrections are editorial and none reverses a verdict; I uphold all 7 `Preserve` rulings as stated.
