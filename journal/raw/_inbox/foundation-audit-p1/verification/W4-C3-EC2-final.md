# Verification Record: W4 — C3-EC2 (final pre-gate verification of the C3 follow-on editorial pass)

> Verifier: Claude (Opus 4.8, 1M) — **W4**, a fresh independent verifier. **NOT** the collector, **NOT**
> C3-FP, **NOT** V3, **NOT** V3b, **NOT** V3c, **NOT** C3-EC, **NOT** C3-EC2. | Date: 2026-07-20
> Scope: one pass — `C3-EC2`, the second editorial correction pass on the C3 dossier, executing V3c's
> corrections C-1 through C-5. **No collection. No scope expansion. C3's SUFFICIENT verdict is not
> reopened.**
> Method: every load-bearing claim re-retrieved from the primary sources and read directly. Nothing
> below is taken on the corrector's word, and nothing is taken on V3c's word either.

## VERDICT: **PASS**

C3-EC2 is a sound pass. All five corrections match their sources, all five landed in the dossier, no
unrelated text or conclusion was changed, and the bucket/tier/caveat/sufficiency statements remain
honest. **I found no defects in this pass.** I record that as a result, not as a clean bill of health
— see "What I did to make 'nothing wrong' mean something" below.

---

## Sources independently retrieved by W4

| Source | Route | Result |
|---|---|---|
| Ericsson & Harwell (2019), *Front. Psychol.* 10:2396 | Frontiers full text, two separate fetches with different section prompts | **Obtained** |
| Macnamara, Hambrick & Oswald (2014) + **2018 Corrigendum** | `gwern.net/doc/psychology/2014-macnamara.pdf`, corrigendum read as **PDF page images**, pp. 1202–1204 incl. both parts of Table 1 | **Obtained** |
| Hambrick et al. (2014), *Intelligence* 45, 34–45 | `gwern.net/doc/psychology/2014-hambrick.pdf`, **journal p. 38 read as a page image** | **Obtained** |
| Ericsson, Krampe & Tesch-Römer (1993) | `gwern.net/doc/psychology/1993-ericsson.pdf`, **journal p. 379 read as a page image** | **Obtained** |
| Hambrick, Macnamara & Oswald (2020), *Front. Psychol.* 11:1134 | Frontiers PDF, **printed pp. 9–10 read as page images** | **Obtained** |
| `registers/source-lead-register.md` | live file | **Read in full** |
| `remediation/C3-editorial-report.md` (the prior pass) | live file | **Read** (register-proposal section) |
| Ericsson (2014), *Intelligence* 45, 81–103 | not attempted — quarantined by V3c through four routes; see F5 below | **UNVERIFIABLE (inherited)** |

Reading the corrigendum, Hambrick 2014 p. 38, EKT 1993 p. 379 and Hambrick 2020 pp. 9–10 **as page
images rather than as extracted text** matters: it is what let me confirm printed pagination
independently, which V3c explicitly could not do for the 2020 article.

---

## Question 1 — Does every claimed correction match the source or the prior ruling?

### C-1 — F7's "stitched fragment" note struck. **RULING: the note WAS a manufactured defect. Striking it is CORRECT.**

This is the one that mattered in both directions, so I verified it from Ericsson & Harwell (2019)
directly, in two independent fetches with differently-worded prompts to guard against a single
summarisation artefact. Both returned the same structure:

- **Abstract**, verbatim: *"Their definition of 'deliberate practice' differs significantly from the
  original definition of deliberate practice and will henceforth be referred to as **structured
  practice**."* — This is a **different sentence** from the one the C3-EC note claimed was located
  there.
- **Body**, section *"Differences in the Two Definitions of Deliberate Practice by Ericsson et al.
  (1993) and Macnamara et al. (2014, 2016)"*, verbatim: *"To avoid confusion between our original
  definition of deliberate practice and the definition of deliberate practice presented by Macnamara,
  Hambrick, and their colleagues, we will refer to their definition as **structured practice**, which
  is consistent with a terminology proposed by Hüttermann et al. (2014)."*
- The *"Macnamara et al. (2014, p. 1608, italics added) introduced their definition of 'deliberate
  practice, which Ericsson et al. **defined** as engagement in structured activities created
  specifically to improve performance in a domain.'"* half sits in the **same section**, in the
  **immediately preceding paragraph**. My second fetch returned both paragraphs consecutively.

So: **the two halves of the dossier's quote are adjacent paragraphs of one body section, and the
`(p. 5)` cite is correct for both.** The C3-EC note asserted the second half was in the abstract and
that the cite was "therefore wrong for the second half." That assertion is **false**. There was no
citation defect. C3-EC2's strike is right, and V3c's C-1 ruling is right.

My independent finding on distance ("adjacent paragraphs") is consistent with — and slightly tighter
than — V3c's offset arithmetic (~1,000 chars, same section) that C3-EC2 relayed.

**On the pessimism-pattern record:** ✅ **CONFIRMED RECORDED, NOT QUIETLY DELETED.** Dossier F7 keeps
the wrong note **struck through and visible**, followed by a `[SUPERSEDED — C3-EC2]` block that states
the root cause verbatim: *"The C3-EC editor attached the abstract's location to the body's sentence
without re-checking, manufacturing a citation defect that was never there — an error in the
**pessimistic** direction, in a pass explicitly briefed about pessimism drift. Recorded rather than
deleted because it is the program's third caught instance of an agent finding a problem that did not
exist."* The report carries the same finding at program level. This is the correct handling: the
instance is preserved as evidence that **briefing alone does not correct the bias**, which is a
program-level fact worth more than the instance.

✅ **Note (1) — the F3/F7 attribution reversal — is explicitly marked unaffected and stands.** I
confirmed it survives intact in the dossier and was not collaterally damaged by the strike.

### C-2 — F10's ranking counter-examples narrowed. **VERIFIED EXACT, all figures and all three characterisations.**

Read directly from the 2018 Corrigendum, Table 1 (continued), p. 1203:

| Model | Domain | Originally reported | Corrected |
|---|---|---|---|
| **Solitary + excluding team sports** (p. 1615) | games / music / **sports** | 23 / 23 / **28** | 22 / 25 / **21** |
| **Solitary only** (p. 1615) | games / music / **sports** | 23 / 23 / **22** | 22 / 25 / **18** |
| **Excluding team sports** (pp. 1612, 1615) | games / music / sports | 26 / 21 / 19 | 24 / 23 / 16 |

- **KEPT case ✅ CORRECT.** Solitary + excluding team sports: sports at **28%** is **sole top**
  (games 23, music 23); after correction **21%** is **sole bottom** (games 22, music 25). A genuine,
  decisive ranking counter-example that establishes the point on its own. Exactly as claimed.
- **RECAST case (a) ✅ CORRECT.** Solitary model: sports **22%** against games **23%** and music
  **23%** — sports was **already the lowest**. It **cannot** have moved "from joint-top to bottom."
  The real ranking event is games and music separating from a 23/23 tie. C3-EC2's claim that the
  solitary model was never joint-top is **accurate**.
- **RECAST case (b) ✅ CORRECT.** Excluding team sports: games > music > sports **before (26/21/19)
  and after (24/23/16)** — **no ranking change at all**. (I also checked education 4→5 and
  professions <1→1 in this panel; both sit below sports in both versions, so the full ranking is
  likewise unchanged.) Not a counter-example to a ranking claim.
- **Surviving claim ✅ ACCURATE.** "Every domain's ranking unchanged" is true of the **main model**
  only, and the unqualified "every" was not accurate. The narrowed correction preserves the substance
  while shedding the two mischaracterisations. Superseded wording is struck, not deleted.

### C-3 — F9's three body "(p. 8)" cites reconciled to p. 9. **VERIFIED — and upgraded from relayed to independently confirmed.**

V3c explicitly did **not** re-paginate the 2020 Frontiers article and flagged the pagination as
relayed from V3b. I read the PDF's **printed page 9** directly. All four items sit on printed p. 9:

- *"This raises the important question of whether, by using a lower reliability value, they
  overcorrected the correlation between purposeful/deliberate practice and performance, and thus
  overestimated the variance shared between the two variables"* — **p. 9** ✅
- Tuffiash et al. (2007) *"self-report practice estimates repeatedly from experts in sports and music
  have reported test-retest reliabilities at or above 0.80"* — **p. 9** ✅
- Ericsson (2012) *"...collected reliability of cumulated life-time practice at different test
  occasions in large samples has typically been found to range between 0.7 and 0.8"* — **p. 9** ✅
- *"...the corrected correlation of performance with deliberate practice is rc = 0.70, indicating that
  deliberate practice explains 49% of the reliable between-person variance in performance (rather than
  61%)"* — **p. 9** ✅
- **Table 3** — **printed p. 10** ✅, matching F9's corrected header.

The C3-EC2 fix (p. 8 → p. 9, three occurrences) is **correct**, F9's header is **correct**, and the
finding no longer contradicts itself. The dossier's inline note that pagination is relayed while
content was verified under V3c is honest as written; on my read the pagination is now **directly
confirmed** as well.

**Bonus confirmation from the same page image:** Table 3's three panels and the full sensitivity grid
are exactly as F9 and F7 describe — combined r = .54 (k = 14), purposeful r = .51 (k = 6), deliberate
r = .56 (k = 8); grid minimum **32.1%** (purposeful panel, .90/.90) and maximum **87.1%** (deliberate
panel, .60/.60); **60.8%** in the combined panel at rxx = .60/ryy = .80; **49.0%** in the
deliberate-only panel at .80/.80; and **36.0%** confirmed as the *first panel's* minimum only. The
"panel subtlety" caveat and the 32.1–87.1% range both hold.

### C-4 — one non-verbatim quote and two silent truncations. **ALL THREE VERIFIED GENUINELY VERBATIM NOW.**

- **F4 chess quote.** Hambrick et al. (2014), journal **p. 38**, §3.2 "Discussion of chess reanalyses",
  read as a page image, verbatim: *"On average, deliberate practice explained 34% of the reliable
  variance **in chess performance**, leaving 66% unexplained and potentially explainable by other
  factors."* The phrase appears **once**. The dossier now reads "in chess performance"; the duplicated
  "in performance in chess performance" is struck. ✅ **CORRECT.** (The same page image also confirms
  F4's caveat: *"Even assuming a low level of reliability (rxx = .60), deliberate practice left a very
  large proportion of the variance in chess performance unexplained (54.7%)"*.)
- **F2 and F6 "with the violin."** EKT (1993), journal **p. 379**, read as a page image, verbatim:
  *"Hence, there is complete correspondence between the skill level of the groups and their average
  accumulation of practice time alone **with the violin**."* Both F2 and F6 now carry the three
  restored words. ✅ **CORRECT in both places.**
- While on that page image I also re-checked the rest of F2's quote against source: *"7,410 hr ...
  reliably different from 5,301 hr ... F(1, 27) = 4.59, p < .05 ... music teachers, who had accumulated
  3,420 hr of practice by age 18, F(1, 27) = 11.86, p < .01."* ✅ **Verbatim exact.**

### C-5 — Coverage-gap #1's register ID #29 → #34. **VERIFIED, and the operational danger was REAL.**

I checked every ID myself against the live `registers/source-lead-register.md`:

| ID | Live register content | Owning card | C3-EC2's claim |
|---|---|---|---|
| #14 | Hambrick et al. (2014), "The devil is in the details" | C3 | ✅ correct |
| #15 | Macnamara, B.N. & Hambrick, D.Z. (2020), "Is the Deliberate Practice View Defensible?" | C3 | ✅ correct — **and the register row does carry the shorthand author order** the report flags; the published order is Hambrick, Macnamara & Oswald |
| **#28** | **Pane et al. (2014), Cognitive Tutor Algebra I at Scale** | **C2 (V2b)** | ✅ correct |
| **#29** | **Qin et al. (2003), PNAS fMRI** | **C2 (V2b)** | ✅ correct |
| #30 | Kahneman & Klein (2009) | C3 (V3b) → domain-transfer | ✅ correct |
| **#33** | **Version/edition hazard** (LSE accepted manuscript vs published *Intelligence*) | C3 (V3b) | ✅ correct |
| **#34** | **Meinz et al. (2011), Texas Hold'Em poker** | C3 (V3b) → domain-transfer | ✅ correct |

**The danger was real, and I verified it at the source rather than accepting the report's account.**
I read the prior pass's `remediation/C3-editorial-report.md` register-proposal table directly. Lines
117–118 propose:

- `#28 | Keep open as a standing hazard note | The edition hazard (LSE accepted manuscript vs published article)…`
- `#29 | Keep open, route to a domain-transfer card | Meinz et al. (2011), poker…`

Executed literally against the live register, those two writes would have annotated **C2's Pane et al.
Cognitive Tutor row with an edition hazard** and **C2's Qin et al. PNAS fMRI row with a poker note** —
silently corrupting another card's evidence trail in the artifact the audit treats as authoritative.
✅ **C3-EC2's characterisation is exact, and its explicit withdrawal of those two proposals is the
right remedy.**

**Root-cause account ✅ CONFIRMED at the source.** V3b's predicted "#29" is visible in the chain;
central reconciliation landed the Meinz row at **#34** and the hazard at **#33**. The generalisable
failure — *a forecast passed downstream in the same register as a fact, each hop stripping its
provisional status* — is correctly stated, and the two standing decisions it is offered as evidence
for (registers are orchestrator-owned; agents return rows rather than writing them) are genuinely
supported by this instance: single-writer reconciliation is what caught it.

✅ **C3-EC2 wrote no registers.** I confirmed the live register carries no C3-EC2 edits.

---

## Question 2 — Did the corrections actually LAND in the dossier?

Checked in the **dossier text**, not against the report's claim. **All five landed.**

| Correction | Dossier site | State |
|---|---|---|
| C-1 F7 note struck | F7, `~ll. 352–371` | ✅ Struck-through + `[SUPERSEDED — C3-EC2]` block + root cause + third-instance pattern; note (1) explicitly preserved |
| C-2 F10 narrowed | F10 caveats, `~ll. 719–731` | ✅ One kept case, two recast as magnitude movements, prior wording struck |
| C-3 F9 pagination | F9, `~ll. 644–654` | ✅ All three now p. 9, header consistent, ground noted |
| C-4 F4 / F2 / F6 | `~ll. 205–209`, `~l. 103`, `~l. 286` | ✅ All three restored |
| C-5 register ID | Coverage-gap #1, `~ll. 520–525` | ✅ `~~#29~~ → #34` with reason recorded inline |
| F5 quarantine block | F5, `~ll. 249–256` | ✅ Present |
| C3-EC2 provenance | Header block, `~ll. 20–32` | ✅ Present, names all five and flags C-1's direction |

**Residual-string sweep.** I grepped the dossier for the pre-correction strings (`p. 8)`, `#29`,
`#28`, `practice time alone.`, `in performance in chess`). Every surviving hit is **inside correction
prose describing the superseded state** — none is a live uncorrected claim. The one apparent hit at
F4 (*"variance in performance in chess and music"*) is a **different and correct** source sentence
from p. 41, not a residue.

---

## Question 3 — Was any unrelated text or conclusion changed?

**No.** I re-read the full dossier and confirmed every item V3c upheld is present and intact:

- F3's corrected figures and `SUPERSEDED` banner — intact, and I re-verified all of them against the
  corrigendum Table 1 page image myself (r .35→**.38**, variance 12→**14%**, I² 84.90→**88.54**,
  Q(4) 49.09→**36.61**, games 26→**24**, music 21→**23**, sports 18→**20**, education 4→**5**,
  professions <1→**1%**, r̄ .05/p=.62 → **.09/p=.377**).
- F7's 61% mandatory-dependency block, its heading warning, the sign-flip kill, and the surviving
  genetics concession — all intact and unweakened.
- F7's tier upgrade Q3 → Q1 and F6's tier correction Q2 → Q3 — both intact.
- F11's caveat (3) rewrite (fitted values, not tiers) and qualifications (1) and (2) — intact and
  untouched, exactly as V3c asked.
- The F3/F7 attribution reversal — intact.
- Coverage gaps #2 and #3, the Candidate-conflicts block, the collector self-QA staleness marker, the
  overflow-leads/scope block, the C3-FP register-updates section — all intact.

**No conclusion moved.** C-1 removes a defect; C-2 narrows a claim; C-3, C-4 and C-5 change page
numbers, three words, one duplicated phrase and one ID. **No figure, bucket, tier, caveat, or verdict
changed anywhere in the dossier.**

---

## Question 4 — Are bucket, tier, caveat, and sufficiency still honest?

**Yes, all four.**

- **Buckets.** Unchanged and correct. F7's killed sub-claim remains re-bucketed **Unsupported** and did
  not creep back. INFERENCE remains **Product judgement**. The predictability→blackjack mapping remains
  **analogy, not measurement**.
- **Tiers.** Unchanged. F7 paper Q4 / embedded reanalysis Q1; F6 Q3; F3 and F11 Q1; F10 Q1. I checked
  the two-level F7 treatment against the source's own method description (a random-effects
  meta-analysis on 14 independent effect sizes via Comprehensive Meta Analysis v3.3) — the split is
  warranted.
- **Caveats.** The load-bearing ones are strengthened, not softened. The 61% dependency still travels
  with the number at every site. F11's "there are no bands, there is a slope" still forbids slotting
  blackjack into a predictability tier.
- **Sufficiency: SUFFICIENT, unchanged. I concur.** None of C-1 through C-5 touches the sufficiency
  axis; every one resolves inside a source the dossier already holds. C3-EC2's claim that C-1
  *marginally strengthens* the case is fair — the struck note was the only alleged problem with a
  **source citation** rather than with the dossier's prose, and it turned out not to exist.

### F5's honest quarantine

✅ **Correctly framed, and no conclusion rests on F5's unread body.** The dossier's `[C3-EC2]` block
states plainly that F5's quote and the "relation **of**" correction rest **solely on V3's single
direct PDF read**, that Ericsson (2014) was unobtainable by V3c through four routes, that it is
**partially corroborated** by F8's quotation of the surrounding sentence, and that **no second pair of
eyes has confirmed the wording**. That is honest quarantine in the register the audit's own contract
prescribes — the source is *collected*, merely not re-obtainable — not a defect, and not a kill.

I traced what depends on F5: it supplies a **concession-plus-methodological-objection** that the
Candidate-conflicts block and INFERENCE point 1 use only for the proposition *both sides agree the raw
correlation is real* — a proposition independently carried by F3, F4 and F7. **F8 answers F5's
objection and is itself verified.** No dossier conclusion is load-bearing on F5's unread body.
Agreeing with C3-EC2 that no register row is needed.

---

## The calibration claim — spot-checks of the ~15 items examined and left alone

C3-EC2 reports finding **no new defects** and lists ~15 items it examined and left alone. An editor
that finds nothing is either well-calibrated or lazy. I spot-checked **seven** of those items in the
**primary sources**, not in the dossier:

| Item left alone | My check | Verdict |
|---|---|---|
| **F10's 14 core figures** | Read the corrigendum Table 1 (both parts) as page images; re-derived every cell | ✅ **All exact.** Correct to leave |
| **F10's b = 0.12 addition** | Corrigendum Table 1 continuation, p. 1203 | ✅ `Q(1) = 11.32, b = 0.12, T² = .05` — exact, and absent from the pre-C3-EC entry as claimed |
| **F9's raw r = .54** | Hambrick 2020 p. 9 + Table 3 p. 10 | ✅ r = .54 (k = 14) is the combined-panel input and is uncontested by either side. Correct to leave |
| **F7's 61% block** | Table 3 page image + arithmetic | ✅ 60.8 / 49.0 / 32.1 / 87.1 all re-derived and confirmed against the printed grid |
| **F7's genetics concession** | E&H abstract | ✅ Verbatim: *"genetic effects have so far accounted for remarkably small amounts of variance – with exception of genetic influences of height and body size"* |
| **F7's strict-subset domain figures** | E&H body | ✅ Verbatim: *"games (r = 0.50, k = 5), music (r = 0.71, k = 3), and sports (r = 0.58, k = 5)"* — supports INFERENCE point 4's corrected `r ≈ .49–.50` |
| **F11's caveat (3) structural argument** | Corrigendum Table 1 | ✅ Predictability is `Q(1)` with a slope `b`; domain is `Q(4)`. The categorical-vs-continuous distinction is visible in the corrigendum itself. Correct to leave |

**Assessment: well-calibrated, not lazy.** Everything I spot-checked is accurate as written, and the
two items with the most product weight — F11's qualifications (1) and (2) — are honest **in both
directions**, guarding against the overstatement that practice fails in stochastic domains as
explicitly as against the opposite. Leaving them alone was the right call; touching them would have
made them worse.

I read seven of the ~15 in the sources precisely so that C3-EC2's "no new defects" would mean
something. It does.

### One observation, explicitly NOT a finding against this pass

F9 renders the Ericsson (2012) quote as *"the collected reliability of cumulated life-time
practice…"* where the printed source reads *"[t]he collected reliability of cumulated life-time
practice…"* — i.e. the source's own bracketed case-change is dropped. This is **pre-existing**, was
not introduced or touched by C3-EC2, is substantively nil, and does not alter the quote's content. I
record it for completeness and explicitly decline to charge it against this pass. Flagging it as a
C3-EC2 defect would be exactly the manufactured-defect move C-1 exists to punish.

---

## Kills
**None.** No claim lost its support in this verification.

## Reversals / upgrades
- **C-3 upgraded from RELAYED to INDEPENDENTLY VERIFIED.** V3c could verify F9's content but not its
  pagination. I read the printed pages and confirm p. 9 for all four items and p. 10 for Table 3.
- **No reversals.** Nothing C3-EC2 did requires undoing.

## Conflicts surfaced
**None.** I concur with C3-EC2 and V3c: every conflict touched (#3, #13, #14, #18) is already
registered, and this pass's items are editorial, not disagreements between sources.

## Register rows — RETURNED IN TEXT, NOT WRITTEN
**I wrote no registers.**

- **Source-lead register — no new rows.** I independently confirm C3-EC2's corrected proposals: #14
  and #15 → mark **resolved** (by F8 and F9 respectively); #33 keep open as a **standing hazard note**;
  #34 and #30 keep open, **route to a domain-transfer card**. I also confirm its **withdrawal of the
  prior report's #28 and #29 proposals** — both are card **C2**'s rows and must not be written.
- **One row-level amendment, orchestrator's to apply:** register row **#15** carries the shorthand
  author order *"Macnamara, B.N. & Hambrick, D.Z. (2020)"*; the published order is **Hambrick,
  Macnamara & Oswald (2020)**, as F9's own source note already flags from the title page. C3-EC2
  proposed this and it is **correct** — I verified the register row's wording directly.
- **Conflict register — no new rows.**

---

## Summary judgement

C3-EC2 executed five corrections, all five correct, all five landed, none over-reaching. Its hardest
task was **C-1 — removing a finding rather than adding one** — and it got that right, verified it from
the source, preserved the wrong note visibly rather than deleting it, diagnosed the root cause, and
recorded the instance as the program's third caught manufactured defect *in a pass that had itself
been briefed about pessimism drift*. That last point is the most valuable thing in the pass: it is
direct evidence that **briefing an agent about pessimism bias does not, on its own, correct it** —
which argues for the structural remedy (independent verification in separate hands) over the
instructional one. C-5's operational finding is the second most valuable: I confirmed at the source
that executing the prior pass's proposals would have corrupted card C2's register rows, and that
single-writer reconciliation is what caught it.

The pass claims no new defects and lists what it left alone. I checked seven of those in the primary
sources. The claim holds.

**PASS.** C3 remains **SUFFICIENT**. No blocker to the Phase 1 gate arises from this pass.

---

## Bounds respected
- **No git.** **No Bash beyond two read-only `grep`/`wc` calls on inbox audit files** — no repo state
  inspected or modified.
- **No dossier edits.** This is a verification record only.
- **Nothing written outside** `journal/raw/_inbox/foundation-audit-p1/verification/`.
- **No build, test, or install commands.** No product code, specs, plans or charter touched.
- **No collection.** No new sources added to any dossier; every source above was retrieved solely to
  verify an existing claim.
