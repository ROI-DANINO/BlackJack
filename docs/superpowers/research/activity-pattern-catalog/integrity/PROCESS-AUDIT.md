# PROCESS AUDIT — LDB-02 activity-pattern catalog pass

> Role: `audit-auditor` / program-integrity. **Audits the process, not the evidence.**
> Date: 2026-07-27. Run: `2026-07-26-ldb-02-activity-patterns`.
> Status of this file: raw inbox data, not authority (Inbox Rule 0).

## Capability boundary, stated before any finding

No Bash, no WebSearch, no WebFetch, no Edit. Consequences that bound every verdict below:

- **I ran nothing.** I did not execute `scripts/research-gate.ts`, the G7/G8 shell counts, or any
  command. Every statement about what a check *would* return is a reading of source, labelled as
  such, never an observed result.
- **I opened no source.** Where a process question turns on what a source says, I stop and say so.
- **I inspected no dispatch transcript.** No dispatch ledger exists for this run (searched:
  `**/*dispatch*` — the only two hits are `journal/raw/_inbox/foundation-audit-p2/registers/dispatch-ledger.md`
  and its promoted copy, both from a different program). Question 2 is therefore answered from
  record headers only, and that limit is carried into the verdict rather than smoothed over.

### Path note

My write scope is `journal/raw/_inbox/<run-dir>/integrity/`, new files only. The dispatch asked for
`<run-dir>/PROCESS-AUDIT.md`. I wrote here instead; the path differs, the content is the record that
was asked for, and the gate does not read either path. Recorded rather than silently relocated.

---

## Artifacts examined, enumerated positively

| Path | What I read |
|---|---|
| `journal/raw/_inbox/2026-07-26-ldb-02-activity-patterns/manifest.json` | whole file (3 units) |
| `…/run/U1/{audit,verification,corrections,landing-confirmation}.md` | corrections + verification + confirmation in full; audit.md by targeted string search plus lines 1–145 read directly |
| `…/run/U2/{audit,verification,corrections,landing-confirmation}.md` | same method |
| `…/run/U3/{audit,verification,corrections,landing-confirmation}.md` | same method; audit.md lines 40–57 and 78–91 read directly |
| `docs/superpowers/research/activity-pattern-catalog/README.md` | whole file |
| `docs/superpowers/research/activity-pattern-catalog/run/**` | row counts only, against the inbox copies |
| `scripts/research-gate.ts` | whole file, 397 lines |
| `docs/superpowers/plans/2026-07-26-ldb-02-activity-pattern-catalog.md` | whole file, 1169 lines |
| `journal/ops/tasks.md:92-103` | the LDB-02 card |

**Files the plan names that do not exist anywhere** — searched by glob across both the inbox run
directory and the promoted archive:

- `run/U1/landing-evidence.md`, `run/U2/…`, `run/U3/…` — **absent, all three** (plan *File
  Structure*; Task LV Step 2).
- `GATE.md` — **absent from both** the inbox and
  `docs/superpowers/research/activity-pattern-catalog/` (plan Task G Step 5).
- `patterns.md`, `sources.md` — absent, and the README says so. Compliance, not a gap: Task S has
  not run.

---

## Q1 — Did every raised material correction reach its artifact?

**Verdict: LANDED for every ledger row I could test — 82 of 82 IDs located in the target `audit.md`.
The ledger convention held on the retry rule and failed once on append-only.**

### Ledger arithmetic, counted not estimated

`^\| C\d+ \|` rows, inbox and promoted archive, byte-for-byte identical counts:

| Unit | Ledger rows | Distinct IDs | ID range | Density |
|---|---|---|---|---|
| U1 | 72 | 36 | C1–C36 | dense |
| U2 | 62 | 31 | C1–C32 | **gap at C21** |
| U3 | 30 | 15 | C1–C15 | dense |
| **Total** | **164** | **82** | | |

82 IDs × 2 rows each = 164. The README's "82 corrections landed" is arithmetically exact.

### The retry convention — checked, held

Every one of the 82 IDs appears exactly twice: once `NOT-LANDED` (raised) and once `LANDED`
(confirmed), append-only, last-row-wins. I compared the description cell of each pair by direct
reading of all three ledgers. **All 82 pairs repeat the description verbatim.** No ID is reused with
a changed description, which is the failure mode the convention exists to prevent and which
`research-gate.ts` fails on at its `prev.desc !== desc` branch (line 291).

This matters more than it looks. The convention's whole purpose is that an unresolved correction
cannot be retired by appending a trivial row. It was not so retired anywhere in this run.

### Where each landing was found

I did not accept the ledger's `LANDED` token as evidence of anything. For each correction I searched
the target `audit.md` for the specific string the correction demanded, and recorded the line. A
sample of the loci, chosen to cover every correction class (quote repair, label change, provenance
change, scope narrowing, header recount, absence-claim retraction):

**U1** — `run/U1/audit.md`:
- C1 (withdraw "Neither point is made by either source") — **line 145**, withdrawn in place with the
  slide-34 and slide-11 quotations that replace it, and the withdrawn sentence preserved.
- C4 / C21 (U1-S10 is not independent corroboration) — **line 145**, "the earlier word
  'independently' is withdrawn", with U1-S10's self-attribution to Hubbard quoted.
- C5 ("skip questions" → flagging prior knowledge) — the offending string `skip questions` returns
  **zero matches**; `prior knowledge` at **lines 144, 180**.
- C7 (locus heading) — `Submit and score` at **line 177**.
- C8 (absence-as-proof on "untimed") — **line 143**, converted to a positively enumerated
  seven-section search that found nothing either way, claim withdrawn.
- C10 (0.32 / 0.18 split) — **lines 149, 191**.
- C11 (narrow to case-level structure) — `case-level`, `pathophysiolog` at **line 149**.
- C12 (U1-S15 provenance) — **lines 84, 149, 166**.
- C13 / C33 (stale header counts) — **lines 7–30**, recomputed by row count with what was counted
  and where stated inline.
- C15 (0.93 / 0,92 both nulls) — **lines 149, 167, 192**.
- C18 (10 records, practising clinicians) — **lines 149, 191**.
- C19 (co-author developed the platform) — **lines 190, 192**.
- C20 (unit-level premise caveat) — **lines 127–137**, as its own section.
- C23 (Europe PMC JATS) — **line 167**.
- C25 / C26 / C27 (reading-record truth) — **lines 56–77**.
- C29 / C30 / C34 / C35 (LOFT scoring, interruption licences, folio) — **lines 147, 151, 182**.
- C31 (compilation, not primary) — **lines 102–125**.
- C36 (SPOT absence claim enumerated) — **line 150**.

**U2** — `run/U2/audit.md`:
- C3 / C18 ("receptive exercises") — **lines 30, 37**.
- C4 (letter shape / handwriting claim) — **lines 64, 92**.
- C6 ("the written form and sound") — **lines 64, 92**.
- C7 ("or coordinate", "even likely") — **lines 67, 97**.
- C8 ("about what it finds") — **lines 71, 101**.
- C11 (Part 1 section 2) — **line 72**, with `weakness-targeting` on the same line.
- C14 (downgraded, landed as no-change) — `meta title` at **line 93**.
- C1 / C23 (provenance relabel, two loci) — **line 104** (register) and the pattern row's
  provenance cell.
- C29 / C32 (fading vs learner-chosen scaffolding, plus the near-miss strings) — **line 30**.
- C30 ("improving their likelihood to remember the correct idea") — **line 30**.
- C31 (superseded top-up passage) — **line 18**.

**U3** — `run/U3/audit.md`:
- C1 (label drop) / C2 (`F(1,35)`, N = 36) / C6 (six classroom sections) — **line 17**.
- C3 (the disputed cell) — **lines 78–85**, landed as `.20 (.15)` with the `.10` and the Ancient
  Egypt `.15` both enumerated and dismissed by name.
- C4 (`t(1053) = 2.23`) — **line 24**.
- C7 (Section 1 p.2 col.1) / C8 ("high quality", "extremely high quality") — **lines 23, 48**.
- C9 (intact-classrooms caveat) — **lines 20–21**.
- C10 (Rodriguez 0.67 over 67 studies, second-hand) — **lines 54–55, 134, 141, 145, 189**.
- C11 (Meta-Analyses C) — **lines 54, 105, 223**.
- C12 (0.81 → 0.80) — **lines 212, 218–219**.
- C14 (no longer an unchased lead) — **lines 86–89**.
- C15 (content-matched, not stem-equivalent) — **lines 86, 126, 199–204**.

**No correction's landing was unlocatable.** That is the finding this role exists for, and on this
pass it is a clean result. It is worth naming plainly: the defect that broke Phase 1 — corrections
recorded in a verification record and never written into the artifact — **did not recur here**. The
artifacts carry their own corrections, dated, with the superseded text preserved rather than
deleted.

### Where the convention did break — I-06

`run/U2/corrections.md:7`:

> **C21 is retired as a duplicate of C6** — same defect, same two occurrences. It is not listed below.

C21 was raised, then **removed from the ledger entirely** rather than retired by an appended row.
Consequences, stated positively:

- the ledger is no longer append-only: a raised ID left the table;
- the ID set is no longer dense (C1–C32 less C21 = 31);
- `research-gate.ts` cannot see it. Its `terminal` map (line 273) only ever holds IDs that appear as
  conforming rows, so an ID that is not a row is not adjudicated by anything.

The duplicate *identification* is traceable — `run/U2/corrections.md:4-5` attributes the duplicate
map to verifier 2. The *removal* is an assembly act. The correct shape was an appended row under
C21 repeating its description with a state, or a `LANDED` row recording the no-change, exactly as
U2 C14 and U3 C3 were handled when they were downgraded and disputed respectively. Those two show
the pass knew the right move; C21 got a different one.

**Severity: MEDIUM. Does not block approval** — the defect C21 named is landed under C6, so nothing
substantive is lost. It blocks any claim that the ledger convention held without exception.

### Materiality flags — I-08

`run/U1/corrections.md:84` reads: "**Material: C1, C2, C3, C4, C9, C10, C11, C12, C13, C20.**
Non-material: C5–C8, C14–C19, C21." That accounts for C1–C21. **C22–C36 — fifteen of U1's
thirty-six corrections — carry no materiality flag anywhere in the ledger or its notes.** U2
(`:76`, "Non-material: the remainder") and U3 (`:59-60`) are both complete.

Nothing escaped the loop as a result: all fifteen are `LANDED` and all fifteen were located above.
But the plan requires a materiality flag per finding, and for 42% of U1's ledger the record does not
carry one. **Severity: LOW. Does not block approval.**

---

## Q2 — Was role separation actually kept, in separate hands?

**Verdict: CONSISTENT WITH the contract on the produce/verify and correct/confirm axes, and
UNPROVABLE from the artifacts. The orchestrator axis FAILED — see Q5.**

### What I looked for, and where

The contract has four clauses. Three concern agent instances; the fourth concerns the orchestrator.

**(a) No agent both collects and verifies the same unit.** Evidence found:
- `run/U1/verification.md:3-4` — "Assembled by the orchestrator from rows returned by two
  independent `audit-verifier` instances. Neither collected this unit; the second is not a
  continuation of the first."
- `run/U2/verification.md:3-4` — "Neither collected this unit."
- `run/U3/verification.md:3-4` — identical to U1's, including the non-continuation clause.

**(b) No agent both raises and lands its own correction.** The three ledgers are headed "Assembled
by the orchestrator from rows returned by two independent verifier instances" and name which
verifier raised which range (U1: V1 → C1–C8, V2 → C9–C21; U2: V1 → C1–C15, V2 → C16–C28; U3: V1 →
C1–C9, V2 → C10–C15). The landing role is `audit-editor`, named at `run/U2/audit.md:104` ("editor,
U2-S20 re-opened"). No artifact shows a verifier performing an edit, and `audit-verifier` holds no
`Edit` grant per the plan's role table.

**(c) The corrector is never the landing confirmer.** `README.md:23-24` asserts every landing was
"independently confirmed by an agent that neither raised nor applied it." **I can find no artifact
that carries this evidence** — see I-03. The three `landing-confirmation.md` files each contain the
single word `CONFIRMED` and nothing else, which is exactly what the gate requires and exactly why
the plan mandated a sibling `landing-evidence.md` to hold the confirmer's quotes. That file does not
exist for any unit.

### The honest statement of what this proves

**Nothing.** Every sentence in (a) and (b) above is a self-description written by the orchestrator
into a file the orchestrator authored. There is no dispatch ledger, no per-agent header, no returned
row preserved anywhere. The artifacts are *consistent with* separation having held and are *not
evidence* that it did.

The plan says this outright (Global Constraints, *Tool-enforcement honesty*): instance separation
between produce and verify is **not tool-enforced**; it is dispatch discipline "checked at the
gate." I have now read the gate. **`research-gate.ts` contains no check of any kind on instance
separation** — it reads four files for shape and terminal tokens and knows nothing about who wrote
them. So the boundary the plan promised would be "checked at the gate" is checked nowhere, by
anything, in the entire program. That is not a violation; it is a gap between what the plan said the
gate does and what the gate does.

One data point cuts *for* separation and is worth recording because it is the kind of thing a
single-instance fake would not produce: `run/U2/verification.md:67-70` records a verifier
**refusing** its own orchestrator — "Declined rather than rubber-stamped: ten pending corrections
whose text the orchestrator had summarised rather than supplied. The verifier refused to certify
corrections it had not read, citing the absence-as-proof rule." And `run/U2/verification.md:35-36`
records a collector raising a correction **against its own dispatch brief**. Adversarial behaviour
toward the dispatching party is weak positive evidence of a separate hand. Weak, and I am not
upgrading it.

**Severity of the gap: MEDIUM. Does not block approval** on its own — the contract may well have
held. It blocks any *claim* that separation was verified, including README:23-24's "by an agent that
neither raised nor applied it," which is asserted and not evidenced.

---

## Q3 — Do the gate's checks enumerate positively?

**Verdict: `scripts/research-gate.ts` is SOUND. I name no check in it that could pass on a missing
file. The G7/G8 counts are UNPROVEN — not because they read badly, but because nothing in the record
shows they ran.**

### The script — read line by line, positively

Every path through the file that could reach `GATE: PASS` requires something to exist:

| Locus | Check | On missing input |
|---|---|---|
| `:318` | `check(manifest.units.length > 0, …)` | zero units **FAILS** — "a gate over nothing cannot pass" |
| `:319` | `check(existsSync(runDir), …)` | missing run dir **FAILS** |
| `:329-330` | `if (!existsSync(auditPath)) check(false, …)` | missing `audit.md` **FAILS** |
| `:340-341` | same for `verification.md` | **FAILS** |
| `:217-219` | `conforming.length === 0` → `check(false, …)` | an empty or verdict-less file **FAILS** |
| `:360-364` | `INSUFFICIENT` without `corrections.md` | **FAILS** |
| `:373-374` | corrections present, confirmation missing | **FAILS** |
| `:380-383` | `confirmation.trim() === "CONFIRMED"` | whole-file equality; prose or `CONFIRMED`+anything **FAILS** |
| `:312-313` | `check(state === "LANDED", …)` per ID | a surviving `NOT-LANDED` **FAILS** |
| `:163-172` | `readArtifact` | exists-but-unreadable is a **FAIL**, not a crash, and the loop continues |

There is no `||`-fallback, no grep-for-absence, no pipe whose exit status could mask the check's.
The script's own header comment (`:4-6`) states the rule and the script obeys it. Two further marks
of a check that was built to fail:

- **`:306-311`** removes a check *because it was proven unreachable* — "A check whose output cannot
  vary is this script's own founding-defect shape." A gate that deletes its own dead check is a gate
  someone actually reasoned about.
- **`:33-36`** states two limits rather than overclaiming: `realpath` does not see hardlinks, and
  there is a TOCTOU window. Neither is defended, and both are named.

I checked the one shape most likely to hide a soft pass: the description-cell smuggling net at
`:286-289`, which runs `CORRECTION_SIGNAL` and `SIGNAL_LINE` over every *conforming* row's
description, so a `LANDED` row cannot carry `| C2 | note: C9 remains NOT-LANDED | LANDED |` through.
It is present and it is applied to conforming rows, not only to prose.

### The one place a missing file yields a pass — structural, not a defect, not triggered here

`hasCorrections` (`:355`) is `false` when `corrections.md` does not exist. If a unit's
`SUFFICIENCY` is `SUFFICIENT` and no `corrections.md` was written, then **no** correction check and
**no** landing-confirmation check runs, and the unit passes on two files. That is deliberate — the
plan's *Artifact contract* makes both files conditional, for a stated reason. But it means the gate
cannot detect a `SUFFICIENT` unit that raised a material correction and never recorded it. The gate
has no way to know what was raised; only dispatch discipline covers that branch.

**Not triggered on this run.** All three units terminate `SUFFICIENCY: INSUFFICIENT`
(`run/U1/verification.md:61`, `run/U2/verification.md:82`, `run/U3/verification.md:68`), so
`corrections.md` was mandatory for all three, and all three carry one plus a `landing-confirmation.md`.
Recorded as the residual the program still carries, at **severity LOW**, blocking nothing.

### G7 / G8 — unproven, and this is the serious half of Q3

G7 and G8 are not in the script. They are shell counts in the plan (Task G Steps 2–3), run by the
orchestrator. The plan requires their output to be recorded in `GATE.md` (Task G Step 5: "the exact
commands run, the exit codes, every printed G7/G8 number… No claim in `GATE.md` that is not one of
those four things").

**`GATE.md` does not exist** — not in the inbox, not in the promoted archive. Therefore:

- no command is recorded, so no predicate can be checked;
- no exit code is recorded, so `README.md:25`'s "`scripts/research-gate.ts` **PASSES** (exit 0)" has
  no provenance in the archive;
- no printed number is recorded, so `README.md:26-28`'s six counted figures cannot be re-derived.

I cannot run the gate. **What I can say from source alone:** the plan's declared G7 provenance
predicate is `if ($6 != "vendor-self-description" && $6 != "independent") print`, and
`run/U2/audit.md:104` carries `compensated-third-party` in field 6 of a `| U2-S13 |` source row.
Under the declared predicate that count is ≥ 1, not 0. The README reports 0. See I-01.

Per the rule I was given — *if a check cannot be shown to fail on empty, report it as unproven
regardless of how it reads* — **G7 and G8 are UNPROVEN for this run.** The plan's Self-Review §2
records them being executed against a synthetic defective run and against an empty directory before
the plan was saved, which is real evidence about the *commands*; it is not evidence that they ran
here, or with which predicate.

**Severity: HIGH (I-02). Blocks approval** of the counted claims in the README.

---

## Q4 — Did any unit reach the gate below its declared floor?

**Verdict: NO. Every floor is met with margin, and the one count that is inflated is labelled
inflated by the archive itself. No padding found.**

Counted by row-prefix match across `run/U*/audit.md`:

| Unit | Floor | Pattern rows (`^\| U<n>-<k> \|`) | Source rows (`^\| U<n>-S<k> \|`) | Met |
|---|---|---|---|---|
| U1 | ≥ 3 patterns / ≥ 2 products | **9** | 16 (13 OPENED, 3 UNREACHABLE) | ✅ |
| U2 | ≥ 3 patterns / ≥ 3 products | **14** | 22 | ✅ |
| U3 | ≥ 3 findings / ≥ 2 independent sources | **9** | 12 (8 OPENED, 4 UNREACHABLE) | ✅ |
| **Card contract** | ≥ 8 patterns / ≥ 5 products | **32** | 50 | ✅ |

These match `README.md:26-28` exactly (32 pattern rows, 50 source rows). The promoted `run/` copies
return identical counts to the inbox originals, so no row was dropped at promotion.

**Distinct products.** U1's header (`run/U1/audit.md:7-20`) reports *both* readings rather than
picking one — "nine patterns across nine separately named products, programmes or instruments, drawn
from seven distinct product-or-document sources" — and then enumerates the seven by name. That is
the right shape. U2's ≥ 3 is met on any reading given 14 rows. **I did not independently enumerate
U2's or U3's distinct-product column**; stating that rather than implying I did.

**On padding — the specific thing I was asked to look for.** The opposite happened, in three places:

1. `README.md:38-39` — "**The distinct-product count above is inflated.** It counts naming variants
   as separate products (e.g. three Duolingo app strings)." The archive flags its own inflated
   number, unprompted, in the same section that reports it.
2. `README.md:43-45` — "**U2 has zero reachable sources labelled `independent`.**" A unit declaring
   its evidence base worthless for independence claims.
3. `README.md:46-48` — "**U1's entire independent base is a single document**, and that document is
   a **compilation**… Three of its nine patterns rest on it."

All three run against the pass's interest. Two of the three came from corrections landed *into* the
artifacts (U1 C31, U2 C1). This is the calibration behaviour the plan asked for, and it happened.

One deviation, disclosed rather than hidden: U3 "closed the gap by register note rather than pattern
row" (`run/U3/verification.md:32`) — its top-up added no pattern. The floor was already met at 9
without it, and the choice is stated. Compliance.

---

## Q5 — Did the orchestrator stay inside its role?

**Verdict: NO. Three breaches found, of which two are affirmative and documented in the artifacts by
the orchestrator itself. Four further orchestrator defects were raised by roles and closed; I record
them as caught, not as open violations.**

Criterion 4 of the plan: "the orchestrator dispatches, counts, and assembles but never authors a
finding or a verdict. Every judgement about evidence — including whether a non-reproduction stands
and whether two patterns are the same pattern — is routed to a role."

### I-01 — the orchestrator changed a schema the card fixed (HIGH, blocks)

`run/U2/corrections.md:94-97`:

> **C1's relabel adopts a new provenance token, `compensated-third-party`.** This is an orchestrator
> ruling. It applies to U2 only.

and the artifact it landed into, `run/U2/audit.md:104`:

> **`compensated-third-party` is a third provenance token adopted for U2 only**, by orchestrator
> ruling, because the two-value enum cannot express "third party that discloses compensation from
> reviewed companies".

Three separate things are wrong with this, and they compound:

1. **It is an orchestrator-authored ruling, self-labelled.** `run/U2/verification.md:61-65` records
   that "The verifier supplied a general rule and the orchestrator adopted a third token for this
   unit." A role supplied reasoning; the orchestrator made the decision. Criterion 4 routes the
   decision, not just the reasoning.
2. **It contradicts the card's verbatim contract.** `journal/ops/tasks.md:98`: "a source register
   records each source with its access date and whether it is **vendor self-description or
   independent**." The two-token enum is the card's, not the plan's convenience. An orchestrator
   cannot amend a card contract at assembly.
3. **It moves a gate threshold mid-run.** The plan's register schema says "Any third token fails the
   count," and G7 counts undeclared provenance tokens with threshold 0. The plan's Task G Step 1
   says: "fix the artifact, never the check." Here the check's admissible set was widened to fit the
   artifact.

And then `README.md:28` reports "**0 undeclared provenance tokens**" — a counted check reported
clean, when the thing that check exists to catch is present at `run/U2/audit.md:104` and disclosed
twenty-three lines further down the same README.

**In fairness, and it matters:** the substantive handling of the source is excellent. The disclosure
is quoted in full including the `sic`, both halves of the contradictory disclosure block are
preserved, the scope limit is stated ("Neither collector nor editor claims the Yousician review
specifically was paid for"), and the cross-unit contamination is stated ("`independent` in U1 and U3
… was **never checked for compensation**"). The *research* is more honest for the relabel. The
*process* is that an orchestrator rewrote a card-level enum and then reported the resulting count as
clean.

### I-04 — the orchestrator authored a ruling inside a correction row (MEDIUM)

`run/U1/corrections.md:73-74`, correction C33, description cell, verbatim:

> …**Orchestrator ruling on the counting question**: report both numbers explicitly rather than
> choosing one — 9 patterns across 9 named programmes, drawn from 7 distinct product or document
> sources, because LOFT and SPOT and LOE are three separately named programmes described in one
> guide.

Whether three programmes described in one document count as one product or three is precisely the
"are these the same pattern" class that criterion 4 names and routes to a fresh verifier (plan Task
S Step 1). It was decided at the orchestrator, written into a correction row, handed to an editor,
and landed into `run/U1/audit.md:7-20` where it is now the header's governing count.

The *outcome* is defensible — reporting both numbers is more honest than choosing one. The route is
not: a correction ledger is a channel for role findings, and an orchestrator ruling travelled down it
disguised as one.

**This finding is load-bearing for Q2.** It establishes, from the record and not by inference, that
the orchestrator did author judgement into an "assembled from returned rows" artifact. Once that is
established, no other unattributed judgement in those files can be presumed routed.

### I-05 — assembly is lossy, so no sentence in `verification.md` is traceable (MEDIUM)

The plan (Tasks V1–V3, Interfaces) requires the verifier to produce "a per-citation verdict list
(`VERIFIED` / `UNVERIFIABLE` / `DROPPED`)" and return **rows, not files**, which the orchestrator
then assembles.

**No per-citation verdict list survives in any of the three `verification.md` files.** What is there
is aggregate counts plus narrative:

- `run/U1/verification.md:33-35` — "30 new or changed citations checked. 26 `VERIFIED` clean, 3
  `VERIFIED` with a locus or strength defect, 1 `DROPPED`."
- `run/U2/verification.md:14-15` — "17 of 19 sources `VERIFIED`, 2 `UNVERIFIABLE`."
- `run/U3/verification.md:8-9` — "7 `VERIFIED`, 3 `UNVERIFIABLE`, 0 `DROPPED`."

The rows were compressed to counts at assembly and the originals are preserved nowhere. Everything
around them is narrative prose carrying substantive evidence judgement, unattributed. Examples I can
name:

- `run/U1/verification.md:43-48` — a four-sentence argument that the null result "does not show
  constructed-response converging on MCQ" because the comparator "is itself a generate-then-confirm
  production format." That is an evidence ruling. Whose words?
- `run/U1/corrections.md:91-97` — "**C10 is an upgrade, not a retraction.** The source's split shows
  the write-in half discriminating roughly twice as well as the constrained half…" and "**C11
  narrows a qualification; it does not remove one.**"
- `run/U2/corrections.md:99-101` — "**C15 does not threaten the card's premise; it strengthens it.**"

Each of these may be a verifier's returned words copied faithfully. I cannot tell, and neither can
any downstream reader, because the files declare themselves "assembled … from rows" and these are
not rows. Given I-04, the benefit of the doubt is not available.

### Orchestrator defects that roles caught — recorded as closed, not as violations

The dispatch named four. I confirm three in the artifacts and reach the limit of my role on the
fourth:

1. **Statistic relayed to the wrong product.** `run/U2/verification.md:35-36` — the top-up collector
   "Raised a correction **against its own dispatch**: a statistic the orchestrator's brief had
   relayed as bearing on one product in fact concerns a different one." Upheld first-hand at
   `:46-47`: "the statistic concerns Babbel learners, not Duolingo. The orchestrator's brief was
   wrong." **Caught by a role, verified at source, recorded.** This is the machinery working.
2. **A landed orchestrator correction produced a false claim.** `run/U1/audit.md:60-69` — "**⚠ The
   bolded 'so that source is now read in full' claim above was FALSE when written, and is corrected
   here rather than deleted**… It was true only of PDF pages 1–21. **U1-S6 is a 105-page
   document.**" C25 asserted the reading records could be updated; landing it produced a whole-source
   claim across an 84-page gap; C27 caught it and the tail-read pass closed it. **Caught, closed, and
   the false claim deliberately preserved** with the reason it is preserved. Exemplary handling of a
   real defect.
3. **Corrections summarised rather than supplied verbatim.** `run/U2/verification.md:67-70` — ten
   corrections were passed to a verifier as orchestrator summaries. The plan's Task L Step 1 is
   explicit: "The findings arrive **verbatim** as evidence. The orchestrator adds paths, provenance,
   and constraints only — never fix wording." The verifier refused to certify what it had not read;
   the text was supplied and positions returned. **Caught by the role, remedied.** This is the
   inherited-error class — wording a correction from a record instead of the thing itself — and it
   was stopped one step short of propagating.
4. **The gate verified through a `tail` pipe.** **OUT-OF-ROLE — I cannot check this.** I have no
   Bash and there is no `GATE.md`. Nothing in the record states the command that produced
   `README.md:25`'s "exit 0". I can only report that the exit-code claim is unsourced in the archive
   (I-02), which is the same repair either way.

### One dispute resolved by the wrong hand — I-07 (MEDIUM)

U3 C3 is a **verifier-versus-verifier** disagreement about a printed figure. `run/U3/corrections.md:44-49`
routes it to the editor: "Re-open Roediger… read the **Mean** column… and land whichever value the
source actually prints."

The plan's Task L Step 2 routes disputes to a **fresh `audit-verifier` instance**, on the stated
ground that the orchestrator "must not also decide whether its own finding stands." A disagreement
between two verifiers is at least as much a judgement as a `NOT_REPRODUCED`, and it was handed to
the corrector.

The landing itself is model work — `run/U3/audit.md:78-85` enumerates the `.10` (it is the *tested*
row's SD) and the coincidental Ancient Egypt `.15`, and lands `.20 (.15)` from a rendered page. But
note the outcome: it **reverses** the position `run/U3/verification.md:57-59` records verifier 2
taking ("C3 disputed and reversed… the dossier as written is correct"), and that verification record
still carries the overturned position with nothing marking it superseded. A reader of
`verification.md` alone would take away the wrong figure.

**Severity: MEDIUM. Does not block approval** — the artifact is right and enumerates why. It blocks
a claim that every evidence judgement was routed to a verifier.

---

## Q6 — Is the promoted snapshot's README honest?

**Verdict: SUBSTANTIALLY HONEST, with one overclaim and one unevidenced claim. The overclaim is the
most serious finding in this audit.**

### What the README gets right — checked, not assumed

| README claim | Locus | Check |
|---|---|---|
| "UNGATED SNAPSHOT, NOT APPROVED, NOT ASSEMBLED" | `:3-4` | ✅ `patterns.md`, `sources.md` absent from the archive; `journal/ops/tasks.md:102` reads `Evidence: pending`; `:101` `Gate: user-approval` |
| "**No process audit has run.**" | `:32` | ✅ true when written. This file is that audit. |
| "**No global IDs.** Patterns still carry unit-local handles" | `:33-34` | ✅ all 32 rows match `^\| U<n>-<k> \|` |
| "No ranking" | `:35-36` | ✅ no ranking artifact exists |
| "**The distinct-product count above is inflated.**" | `:38-39` | ✅ self-flagged, unprompted |
| "82 corrections landed" | `:23` | ✅ 164 rows / 2 = 82 IDs, counted |
| "32 pattern rows… 50 source rows" | `:26-28` | ✅ counted independently, exact |
| "U2 has zero reachable sources labelled `independent`" | `:43-45` | ✅ consistent with `run/U2/verification.md:76` |
| "U1's entire independent base is a single document… a **compilation**" | `:46-48` | ✅ landed at `run/U1/audit.md:102-125` (C31) |
| "A provenance token `compensated-third-party` was added for U2 only" | `:51-52` | ✅ disclosed, with the cross-unit caveat |
| "Three offered corrections were recorded and deliberately not landed" | `:53-55` | ✅ the shape of a recorded, reasoned skip — compliance, not violation |
| Citation rule: "verify it against `run/<unit>/audit.md`… This README is a pointer, never a warrant" | `:73-77` | ✅ the correct instruction |

That is a long list of things a dishonest README would not say. The "What is NOT done — do not read
past this" section is doing real work.

### The overclaim — I-01, restated as a README defect (HIGH, blocks)

`README.md:28`: "**0 undeclared provenance tokens**."

`run/U2/audit.md:104` carries `compensated-third-party` in a source row's Provenance field. Under
the plan's declared G7 predicate that number is not 0. The README then discloses the very token at
`:51-52`. The two lines cannot both be read straightforwardly: **either** the token is undeclared
and the count is wrong, **or** the token was declared by orchestrator ruling and the count is true
only under a predicate the plan did not authorise and no artifact records.

A downstream reader who reads "What is done" and stops — which is what that section is for — takes
away a clean provenance count. This is the most serious kind of finding available to me, because the
README is what a downstream reader trusts, and the defect is in the one section designed to be
trusted quickly.

**Repair is small:** state the count as "1 provenance token outside the card's two-value enum
(`compensated-third-party`, U2-S13), adopted by orchestrator ruling — see Known limits," and record
the predicate in a `GATE.md`.

### The unevidenced claim — I-03 (MEDIUM-HIGH, blocks that claim)

`README.md:23-24`: "**82 corrections landed, every one independently confirmed** by an agent that
neither raised nor applied it."

The landing half is true — I located all 82 (Q1). The **independently confirmed** half rests on
three files containing the single word `CONFIRMED`, and on nothing else. The plan created
`landing-evidence.md` precisely so that the confirmer's per-correction quotes and loci would exist
somewhere the gate's one-word contract could not swallow them:

> **`landing-confirmation.md` cannot hold the confirmer's evidence.** The confirmer's quoted
> per-correction rows go in a sibling `landing-evidence.md`… The evidence is not lost; it is just
> not in the file the gate reads.

**It is lost.** `landing-evidence.md` does not exist for U1, U2, or U3, in the inbox or the archive.
And because the gate deliberately does not read that file, **no check anywhere can notice its
absence** — the artifact designed to prevent absence-as-proof is itself absent, invisibly. That is
this repo's named scar in a new position.

Note what is *not* claimed here: I am not saying the confirmations did not happen. Several
corrections carry confirmer traces inside `audit.md` itself (`run/U1/audit.md:53-56` — "each page
below was read as a rendered page by an independent landing-confirmation pass"; C25's description
cites "an independent confirmer"). The confirmations plainly happened. What is missing is the record
of them, and with it any ability for a later reader to check one.

### `README.md:25` — "PASSES (exit 0)"

Unsourced in the archive; see I-02. No `GATE.md`, no recorded command, no recorded exit code. I
cannot run the gate and do not adjudicate the claim.

---

## Findings

| # | Finding | Severity | Blocks approval? |
|---|---|---|---|
| I-01 | Third provenance token `compensated-third-party` adopted by orchestrator ruling, against the card's verbatim two-value enum; `README.md:28` then reports "0 undeclared provenance tokens" | **HIGH** | **YES** — README claim + schema change |
| I-02 | No `GATE.md`. G7/G8 counts and the gate exit code have no recorded command, predicate, or output; **unproven** for this run | **HIGH** | **YES** — all counted claims |
| I-03 | `landing-evidence.md` absent for all three units; 82 confirmations rest on three one-word files, and no gate check can see the absence | **MED-HIGH** | **YES** — for README:23-24's "independently confirmed" only |
| I-04 | Orchestrator authored a substantive counting/identity ruling inside U1 C33's description cell; it landed into `run/U1/audit.md:7-20` | **MEDIUM** | No |
| I-05 | Assembly lossy: per-citation verdict rows compressed to counts; no sentence in any `verification.md` is traceable to a returned row | **MEDIUM** | No |
| I-06 | U2 C21 retired by omission from the ledger rather than by an appended row; append-only broken, ID set non-dense, gate blind to it | **MEDIUM** | No |
| I-07 | U3 C3, a verifier-vs-verifier dispute, adjudicated inside the landing pass rather than by a fresh verifier; `run/U3/verification.md:57-59` still carries the overturned position | **MEDIUM** | No |
| I-08 | U1 materiality flags cover C1–C21 only; C22–C36 unflagged | **LOW** | No |
| I-09 | Structural residual: a `SUFFICIENT` unit with an unrecorded material correction requires nothing of the gate. Not triggered — all three units are `INSUFFICIENT` | **LOW** | No |

### Sound findings — recorded explicitly, because silence is not a verdict

- **S-1 — Corrections landed.** All 82 located in the target `audit.md` at named loci. The Phase 1
  defect this role exists for **did not recur.**
- **S-2 — The retry convention held.** All 82 ID pairs repeat their description verbatim; no ID
  reused with a changed description; no unresolved correction retired by a trivial row.
- **S-3 — `scripts/research-gate.ts` enumerates positively.** No check in it can pass on a missing
  file. No `||` fallback, no absence-grep, no pipe masking an exit status. It deletes its own
  unreachable check and states its own limits.
- **S-4 — No floor missed, and nothing padded.** 9 / 14 / 9 patterns against floors of 3 / 3 / 3;
  32 against a contract of 8. The archive flags its own inflated product count.
- **S-5 — Second-hand evidence is labelled second-hand.** `run/U3/audit.md:55` records Rodriguez
  (2003) as `UNREACHABLE`, states "**nothing whatever is cited from this source**", confirms only
  bibliographic metadata against two first-hand documents, and labels the 0.67 figure "a second-hand
  report, labelled as such at the point of use." This is the founding error class refused explicitly.
- **S-6 — Superseded text preserved, not deleted.** U1's false "read in full" claim, U1-3's withdrawn
  "Neither point is made by either source", U3's superseded `.10` — all kept with the reason they are
  kept. A pass that deletes its mistakes cannot be audited; this one can be.

### Out-of-role — needs a verifier

- Whether the gate command's exit status was read through a `tail` pipe. No Bash, no `GATE.md`.
- Whether any claim in the artifacts misstates a source. I opened no source and did not try.
- Whether U3-S11 p.3 supports the Rodriguez 0.67 figure. Evidence question.
- Whether the corrections' *substance* was right. Not my role; I checked only that they arrived.

---

## Calibration note

I was told a clean result is a valid result, and I want to be explicit about where this pass is
clean, because the finding count above will read worse than the pass deserves.

The defect this role was created for — corrections raised, verified, approved, and never written
into the artifact — **did not happen here.** All 82 landed. I looked for the specific string each
correction demanded and found it, in the target file, dated, with the superseded text preserved. The
gate script is the best-shaped check in this repo's history: it cannot pass on a missing file, it
deleted its own dead check, and it names its own limits. Three separate roles pushed back on their
own dispatching orchestrator and were listened to.

The findings cluster in one place, and it is worth naming the pattern rather than the instances:
**every open finding is about the orchestrator's own hands** — a schema it changed, a ruling it
authored, rows it compressed, a ledger row it deleted, a record it did not write. The delegated
roles did their work and the machinery that checks *them* held. What has no check on it is the
assembler, and that is exactly where the defects are. That is not a coincidence; it is the shape the
program's incentives predict, and it is the thing to fix.

None of the open findings impugns the research. Two of the three blocking findings are repairs to a
README paragraph and a missing `GATE.md`; the third is a record that should be reconstructed or a
claim that should be softened.
