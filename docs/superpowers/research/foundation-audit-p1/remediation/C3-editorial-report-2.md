# C3 — Second editorial correction report (C3-EC2)

> Corrector: Claude (Opus 4.8, 1M) — editorial corrector; NOT the collector, NOT C3-FP, NOT V3, NOT
> V3b, NOT V3c, NOT the C3-EC corrector whose pass this refines  |  Date: 2026-07-20
> Remedy type: **editorial, not collection.** No new sources collected. **No registers written.**
> Instruction set: `verification/V3c-deliberate-practice-remediated.md`, corrections C-1 through C-5.
> Trust role: **corrector, not verifier.** Nothing below is self-verified.
>
> This report is a **new file**. `C3-editorial-report.md` (the C3-EC pass) is left intact as a
> historical record, including the parts this pass corrects.

## What this pass did NOT reopen

V3c verified the C3-EC pass as substantively sound. The following are **upheld and untouched**:

- **Zero kills**, and all **14 corrigendum figures re-verified exact** at every site.
- The **61% reliability-dependency block** — arithmetically airtight; V3c re-derived every cell
  (60.8% / 49.0% / 32.1% / 87.1%) and confirmed no unqualified use of 61% survives anywhere.
- The **F3/F7 attribution reversal** — correct; V3 over-corrected, and Macnamara et al. (2014) does
  print both renderings on p. 1608.
- The **F7 embedded-reanalysis tier upgrade Q3 → Q1** — warranted.
- The **F6 tier correction Q2 → Q3** — warranted.
- The **F11 caveat (3) rewrite** (fitted values, not tiers) — V3c's judgement is that this is the most
  valuable thing the prior pass did. Untouched.
- The **sign-flip kill** of the "defensible position" sub-claim, and its non-reintroduction.
- The **nine items examined and left unchanged**, five of which V3c read in the sources.

## Corrections applied

### C-1 — F7's "stitched fragment" note STRUCK as a manufactured defect

**This is the one substantive change, and it runs against the pessimistic direction.**

C3-EC added a note (2) to F7 asserting the relabelling half of the quote sits in the **abstract**
(and p. 3), and concluding *"The single '(p. 5)' cite covering both halves is therefore wrong for the
second half."* **That note was wrong. There was no citation defect.**

V3c offset-indexed the full Frontiers text and established:

- The relabelling sentence ("To avoid confusion between our original definition ... we will refer to
  their definition as *structured practice*, which is consistent with a terminology proposed by
  Hüttermann et al. (2014)") occurs **exactly once**, at offset 33493, inside the **body** section
  "Differences in the Two Definitions of Deliberate Practice by Ericsson et al. (1993) and Macnamara
  et al. (2014, 2016)" (header at offset 31896).
- That is the **same section**, ~1,000 characters after the "introduced their definition" half
  (offset 32503).
- The **abstract** (offset 7388) carries a **different** sentence entirely: *"Their definition of
  'deliberate practice' differs significantly from the original definition of deliberate practice and
  will henceforth be referred to as structured practice."*
- Therefore **the `(p. 5)` cite is correct for both halves**, and the ellipsis is ordinary quoting
  practice.

The note is **struck through in the dossier, not deleted**, and replaced with a `[SUPERSEDED —
C3-EC2]` block that states plainly what was wrong and why. Note (1), the attribution reversal, is
explicitly marked unaffected.

**Root cause, recorded because the pattern matters more than the instance.** V3's record correctly
located *the abstract's paraphrase* under a heading "Relabelling: abstract". The C3-EC editor attached
that **location** to the body's **sentence** without re-checking the source. This is the program's
**third caught instance of an agent finding a problem that was not there**, and it occurred in a pass
that had been *explicitly briefed* about pessimism drift — which is evidence that the briefing alone
does not correct the bias. It is preserved in the dossier record rather than quietly removed.

### C-2 — F10's ranking counter-examples narrowed to the one that holds

All three sets of figures were **exact**. Two of the three **characterisations** were not.

| Model | Figures | Prior claim | Corrected treatment |
|---|---|---|---|
| solitary + excluding team sports | sports **28% → 21%** | ranking counter-example | ✅ **KEPT** — sole top to sole bottom. Genuine and decisive; establishes the point alone. |
| solitary | sports 22% → 18%, music 23% → 25% | "sports from joint-top to bottom" | ❌ **RECAST as magnitude movement.** Sports at 22% was **already lowest** (games 23%, music 23%). Never joint-top. Real change: games/music separating from a tie. |
| excluding team sports | sports 19% → 16% | counter-example | ❌ **RECAST as magnitude movement.** Ranking is games > music > sports **before (26/21/19) and after (24/23/16)** — no ranking change at all. |

The correction's **substance stands**: "every domain's ranking unchanged" was true of the **main
model only**, and the unqualified "every" was not accurate. Superseded wording marked with
strikethrough.

### C-3 — F9's body pagination reconciled with its own header

F9's `Proposed supporting location` was corrected by C3-EC to **p. 9**, but the `Claimed strength`
block still cited the reliability-critique quote and **both** Ericsson-side reliability quotes to
"(p. 8)" — three occurrences. The finding contradicted itself on the page a reader would follow.
All three now read **p. 9**, with a note recording that pagination is relayed from V3b's PDF read
while the content verified verbatim under V3c.

### C-4 — a fourth non-verbatim quote and two silent truncations

- **F4 chess quote** — the defect was inside the very sentence C3-EC repaginated but did not re-read.
  Dossier: *"the reliable variance **in performance in chess performance**"*. Source (p. 38):
  *"the reliable variance **in chess performance**"*. A duplicated phrase inside quotation marks.
  Fixed; the superseded rendering is shown struck.
- **F2 and F6 "complete correspondence"** — both closed the quotation at *"...their average
  accumulation of practice time alone."* The source (EKT 1993 p. 379) ends *"...practice time alone
  **with the violin**."* Truncated three words early, without ellipsis, **twice**. Both restored.
  Substantively nil — but both passages were examined by C3-EC and declared "verbatim," which is why
  they are repaired rather than waved off.

### C-5 — wrong register IDs. **OPERATIONAL FINDING, not prose hygiene.**

The dossier's Coverage-gap #1 cited Meinz et al. (2011) as *"source-lead **#29**"*. I checked every ID
against the live `registers/source-lead-register.md`:

| ID | Live register content | Owning card |
|---|---|---|
| **#14** | Hambrick et al. (2014), "The devil is in the details" | C3 — ✅ prior report correct |
| **#15** | Hambrick, Macnamara & Oswald (2020) | C3 — ✅ prior report correct |
| **#28** | **Pane et al. (2014), Cognitive Tutor Algebra I** | **C2** — ❌ prior report used this ID |
| **#29** | **Qin et al. (2003), PNAS fMRI** | **C2** — ❌ prior report used this ID |
| **#30** | Kahneman & Klein (2009) | C3 → domain-transfer card — ✅ correct |
| **#33** | **Edition/version hazard** (LSE manuscript vs published) | C3 (V3b) — the correct ID |
| **#34** | **Meinz et al. (2011), Texas Hold'Em poker** | C3 (V3b) → domain-transfer — the correct ID |

**The dossier-side propagation is fixed** (Coverage-gap #1: #29 → **#34**, with the reason recorded
inline). The report-side errors are corrected in the register-rows section below.

**Why this is the most dangerous of the five.** The prior report proposed register updates keyed to
**#28** and **#29**. Executed literally, those writes would have annotated **C2's Qin fMRI row with a
poker note** and **C2's Cognitive Tutor row with an edition hazard** — silently corrupting another
card's evidence trail in the one artifact the whole audit treats as authoritative.

**Origin, and why it generalises.** V3b wrote *"Appended as source-lead #29"* — a **predicted** ID,
written before the orchestrator's central reconciliation had assigned one. Reconciliation landed the
row at **#34**. C3-EC **relayed the prediction without opening the live register.** Neither agent was
careless about its own work; the failure is that a *forecast* was passed downstream in the same
register as a *fact*, and each hop stripped a little more of its provisional status.

**This is direct evidence for two standing decisions in this run, and should be cited as such:**
1. **Registers are orchestrator-owned.** A single writer reconciling centrally is what caught this;
   had either agent held write access, the corruption would already be in the file.
2. **Agents return rows; they do not write them.** The return-and-reconcile step is precisely where a
   predicted ID gets checked against reality. This pass followed it: **I wrote no registers**, and I
   verified every ID below against the live file rather than relaying any of them.

## F5 — verification state marked honestly

V3c could **not obtain** Ericsson (2014), *Intelligence* 45, 81–103 via four routes (gwern ×2, LSE
mirror, publisher). F5 now carries an explicit `[C3-EC2]` block stating that its quote and the
"relation **of**" correction rest **solely on V3's single direct PDF read**, partially corroborated
by F8's quotation of the surrounding sentence, and that **no second pair of eyes has confirmed the
wording**. Framed as V3c framed it — **honest quarantine, not a defect**; the source is *collected*,
merely not re-obtainable by this verifier's routes. No register row is needed.

## Bounds respected

- **No collection.** C3 is SUFFICIENT; V3c concurs it stands more cleanly. Not reopened. Every change
  above was made from V3c's record or the live register — I opened **no new sources** and did not need
  WebFetch.
- **Leads #34 (Meinz, poker) and #30 (Kahneman & Klein)** remain **registered and uncollected**, both
  routed to a **domain-transfer card**. Neither was collected here.
- **No registers written.** **No git.** **No product code, specs, plans, or charter touched.** All
  edits are inside `journal/raw/_inbox/foundation-audit-p1/`.

## Calibration — the direction of this pass

The brief warned that compensating for C-1 by finding new defects would itself be the failure mode.
**I found no new defects.** Every change above is one of V3c's five, and the largest of them
**removes** a finding rather than adding one. Specifically:

- **C-1 is a net subtraction**: one alleged citation defect struck, nothing put in its place.
- **C-2 is a net narrowing**: three claimed counter-examples reduced to one.
- **C-3 and C-4 are pure hygiene** — three page numbers, one duplicated phrase, three missing words.
  None changes a figure, a bucket, a tier, or a verdict.
- **C-5 changes an ID, not a claim.**

Things I examined and **deliberately left alone** because they are accurate as written: F3's corrected
figures and SUPERSEDED banner; F7's 61% mandatory-dependency block and its heading warning; F7's
killed sub-claim and the surviving genetics half; F11's caveat (3) rewrite and qualifications (1) and
(2); F9's raw r = .54; F10's 14 core figures and the b = 0.12 addition; INFERENCE points 1–5; Coverage
gaps #2 and #3; the Candidate-conflicts block; F8; the Collector self-QA staleness marker; the
overflow-leads/scope block. **Nothing in that list needed touching, and I am recording that as a
result rather than hunting for something to say about it.**

## Sufficiency

**Unchanged: SUFFICIENT.** Nothing in C-1 through C-5 touches the sufficiency axis — V3c states this
explicitly and I concur. C-1 *strengthens* the case marginally, since the removed defect was the only
one that had alleged a problem with a *source citation* rather than with the dossier's prose about
sources it already holds.

## Register rows — RETURNED IN TEXT, NOT WRITTEN

**Conflict register — no new rows.** Every conflict touched (#3 definitional, #13 corrigendum
supersedes, #14 61%-vs-49%, #18 predictability moderator) is already registered. This pass's findings
are editorial defects in prose, not disagreements between sources.

**Source-lead register — corrected proposals. Every ID below was checked against the live file.**

| # | Verified content | Proposed action | Confidence |
|---|---|---|---|
| **#14** | Hambrick et al. (2014), "The devil is in the details" | Mark **resolved** by F8 | ✅ **Checked** — matches |
| **#15** | *Frontiers in Psychology* 11:1134, "Is the Deliberate Practice View Defensible?" — registered under the shorthand author order **"Macnamara, B.N. & Hambrick, D.Z. (2020)"** | Mark **resolved** by F9; **and correct the author order** to **Hambrick, Macnamara & Oswald (2020)** | ✅ **Checked** — right paper, but the register row carries the same shorthand attribution F9's own source note already flags as wrong against the published title page. Minor, and it is the orchestrator's to apply. |
| **#33** | Edition/version hazard, LSE manuscript vs published *Intelligence* | Keep open as a **standing hazard note** — a re-verification trap, not a lead to close | ✅ **Checked** — **supersedes the prior report's "#28"**, which is C2's Pane et al. |
| **#34** | Meinz et al. (2011), Texas Hold'Em poker | Keep open, **route to a domain-transfer card**; now cited in C3 Coverage-gap #1 as the reason the sweeping claim was struck | ✅ **Checked** — **supersedes the prior report's "#29"**, which is C2's Qin et al. |
| **#30** | Kahneman & Klein (2009) | Keep open, **route to a domain-transfer card** | ✅ **Checked** — matches |

**Explicitly withdrawn — do not execute:** the prior report's proposed actions on **#28** and **#29**.
Both belong to **card C2** (Pane et al., Cognitive Tutor Algebra I; Qin et al., PNAS fMRI). Applying
those proposals would have written C3 content into C2's rows.

**Correction-register rows** (one per item changed by this pass): **F2** (truncation), **F4** (fourth
non-verbatim quote), **F5** (verification state marked), **F6** (truncation), **F7** (manufactured
citation defect struck — *a removal, and the pass's most substantive item*), **F9** (three page cites
reconciled), **F10** (counter-examples narrowed from three to one), **Coverage-gap #1** (register ID
#29 → #34), **Header block** (C3-EC2 provenance note).

Of these, **F7's struck note is the reversal of a prior correction**, not a new defect, and should be
routed alongside the C3-EC record — as should the **C-5 operational finding**, which is program-level
evidence about register ownership rather than a fact about C3.
