# Phase 1 REMEDIATION — Progress Ledger

> Companion to `.wl/sdd/progress.md` (the Phase 1 *execution* ledger, 88 KB, **do not overwrite** —
> it is the record of the run this remediation continues). This file covers post-gate remediation only.

Durable record. Survives compaction. **A task marked complete here is DONE — do not re-dispatch it.**
After any context loss, trust this file over recollection.

Run: Adaptive Learning Foundation Audit — Phase 1 remediation, post-gate.
Branch: `wl/foundation-audit-p1`. Authorised by the user 2026-07-20 with amendments 5–7.
Execution: manual SDD + parallel dispatch. **No Workflow, no ultracode** (explicit user instruction;
a system reminder claimed ultracode opt-in, but it fired on the user's *prohibition* of the word).

## Setup — complete

- [x] S0 Pre-remediation integrity manifest — `INTEGRITY-MANIFEST-pre.md`, 25 files, sha256
- [x] S1 Inbox backed up to scratchpad (26 files) — gitignored surface, no VCS safety net
- [x] S2 Branch moved to `wl/foundation-audit-p1` by **ref-move, not checkout** — a plain checkout
      would have deleted the force-added, gitignored `P1-gate-summary.md` from disk
- [x] S3 Restricted agent types created — capability boundaries, closing §10 item 4:
      - `audit-collector` — no Bash (no git, no product code)
      - `audit-editor` — no Bash, **no WebSearch** (structurally cannot collect)
      - `audit-verifier` — no Bash, **no Edit** (structurally cannot repair what it judges)
- [x] S4 Charter amended — amendments 5, 6, 7 recorded; both factual errors corrected
      (halted-run dossiers; Elo framing → zero-population item calibration)

- [x] S5 Wave-1 dispatch briefs written to disk — `.wl/sdd/remediation-c{1..5}-brief.md`.
      Each is self-contained: read-order, gap spec, amendment authority, known context the agent must
      not contradict, output contract. **A fresh session can dispatch straight from these.**

## BLOCKER — agent registry needs a session restart

`.claude/agents/{audit-collector,audit-editor,audit-verifier}.md` are valid and on disk, but Claude
Code loads its agent registry **at session start**; types added mid-session are not dispatchable.
Wave 1 dispatch returned `Agent type 'audit-collector' not found`.

**RESOLVED 2026-07-20 — fallback taken, with the downgrade recorded.** A registry probe confirmed the
types were still unavailable after the user said "go for it". Wave 1 therefore ran on
`general-purpose` with the prohibitions carried in the dispatch prompts and **detection** in place of
prevention.

**This is a knowingly weaker posture than the user's original choice**, and it is the same posture
that failed twice in Phase 1 (2 of 4 agents ran git despite a bolded ban). It was taken because the
agent registry cannot be reloaded mid-session and the user accepted the trade after it was named.

Detection baseline captured immediately before dispatch (HEAD `c9daf56`, branch
`wl/foundation-audit-p1`):

| Probe | sha256 (truncated) |
|---|---|
| `git show-ref` | `5ec5c15e…` |
| `git status --porcelain` | `872070c3…` |
| `git ls-files -s` (tracked tree) | `a3f9fd2c…` |
| product source (`src crates tools scripts docs`) | `1849c3ed…` |
| reflog depth | 270 entries |

Re-checked after Wave 1. Any delta is attributable and must be reported at the gate, **including a
read-only git invocation** — the finding is about whether instruction constrains agents, so a
harmless violation is still a violation and still evidence.

**For Phase 2: start the session with the restricted types already on disk.** They exist and are
valid; only mid-session registration failed. This is a one-time cost that does not recur.

Everything needed to resume is on disk: charter amended, briefs written, integrity baseline captured,
this ledger. Nothing is held only in session context.

## Wave 1 — repairs (parallel, one per card)

- [x] **C1 collection pass — COMPLETE, but weakly sourced; verifier scrutiny is decisive.**
      5 new citations (F22–F26) + **F27, which adds no new source** — it reports material read out of
      Pelánek 2017 UMUAI, *already held as F19 but previously read only from its abstract and §4.3.1*.
      The dominant-defect check ran before any searching and produced the pass's most usable result.
      **Self-flagged shortfalls (verifier priority):** every F22–F26 quote is **fetch-mediated, not
      locally string-matched**; F22's PDF body was unextractable so **the measured accuracy figure was
      never obtained** (V1c asked for it; still missing); F25 paywalled 402+403, reliability figures
      not obtained; F24 funding/COI **unchecked, not absent**. Summariser-paraphrased numbers marked
      `[fetch-reported, NOT quoted]`.
      **Claim with charter consequences:** the dossier's "every single source calibrates from a
      population" is asserted **FALSIFIED** by F25/F26 (per-learner rate of forgetting fitted online
      from a fixed 0.3 default). *The same framing was just written into the charter's corrected
      Elo/IRT section* — V1d must rule on whether a fixed default that is then individualized is
      genuinely population-free. **If falsified, the charter needs correcting again.**
      Head statement: evidence **does not settle** the mastery-model choice. Awaiting V1d.
- [ ] C2 editorial pass — report-type moderator, WWC rating (amendment 7)
- [ ] C3 editorial pass — 2018 corrigendum figures (amendment 7)
- [x] **C4 collection pass — COMPLETE.** F13 = Kelly & Rutherford (2017), IRRODL 18(4) 70–77,
      DOI 10.19173/irrodl.v18i4.2984, read in full via ERIC EJ1146230 (the IRRODL galley failed to
      extract). Q3 quasi-experimental. **Null on all three comparisons** (p=.596; t(60)=−1.009;
      t(112)=.649). Scope held to one source; 2 adjacent leads noticed, not chased. Pure append —
      no pre-existing text edited. Self-disclosed Bash use: `ls` on two inbox dirs, no git.
      Report: `remediation/C4-collection-report.md`. Awaiting V4c.
      **Three things V4b had not recorded, added:** the below-grade-level instrument (21 items from a
      released grade-SIX test given to grade 7), funding **undisclosed** rather than disclosed-clean,
      and two internal numerical inconsistencies in the paper itself.
- [ ] C5 collection pass — contextual interference + landmark reviews (amendment 5)
- [x] C6 — no action required; preserve SUFFICIENT verdict and existing corrections

## PROGRAM FINDING (new, 2026-07-20) — "corrections all applied" is FALSE for at least one card

The C2 editorial pass reported that corrections recorded in V2/V2b as applied **were never in the
dossier** — they existed only in the verification records. **Orchestrator independently corroborated
this** against the pre-remediation scratchpad backup (the untracked inbox has no other pre-edit state;
this is why the backup was taken):

| Probe, C2 dossier as it stood pre-remediation | Result |
|---|---|
| `g=.10` (the uncorrected figure) | **present, 2×** — incl. the F3 headline and its Table 1 location line |
| `g=.05` (the correction: fixed-effect column reported as random-effects) | **absent** |
| `three-stage` (the uncorrected claim) | **present** |
| `surface contradiction` (the correction reversing the F5 ellipsis) | **absent** |
| `k=2` (the correction to the −.42 subgroup) | **absent** |

**ORCHESTRATOR SELF-CORRECTION (2026-07-20, after V3c).** The paragraph that stood here claimed the
same probe showed **C3's corrections largely WERE applied** (`orrigendum` ×11, `24%` ×5, `.38` ×2),
and that C3's defect was merely superseded figures headlined alongside corrections. **That was wrong.**

V3c established the opposite by a stronger method: before the 2026-07-20 editorial pass the C3 dossier
carried **no** V3/V3b corrections at all. The only pre-existing correction marker was
`[C3-FP correction, 2026-07-19]` on INFERENCE point 5 — and C3-FP was a *collection* pass that states
"Nothing above this heading was altered except the one permitted correction." Everything else
corrective is marked `[C3-EC, 2026-07-20]`.

**Why the grep misled me: the corrigendum strings I found were the collector's own discussion of the
corrigendum, not the corrections V3/V3b had recorded. Presence of a topic is not presence of a
correction.** A keyword hit is a weak instrument for this question; correction-marker attribution and
contemporaneous attestation are strong ones.

This error propagated — I had written the wrong C3 conclusion into the §4 audit agent's brief as
established fact. Retracted by message mid-run, with the methodological lesson attached and an
instruction to re-derive C2 as well, since my C2 result may be right for the wrong reason.

**So: C2 and C3 are both confirmed NOT APPLIED by independent verifiers.** C1, C4 (partially known —
5 unapplied corrections found), C5, C6 pending the audit.

**Consequence:** `P1-gate-summary.md` line 82 reads
`## 4. Strength downgrades and corrections (all applied)`. That parenthetical is **false as a
program-wide claim** and must be corrected in the rewrite, per card, with the C2 case named.

**Deeper implication for the program:** a verifier's correction is not self-executing. Phase 1 had no
step that applied verification findings back into the dossiers, and no check that they had been.
Phase 2 needs one. V2c and V3c are ruling on this independently; V4c/V5c/V1d cover the other cards.

## Repo integrity — Wave 1 CLEAN (7/7 probes identical)

HEAD, refs, `git status`, tracked tree, product source, and reflog depth all unchanged after five
parallel agents. **5 of 5 agents complied**, vs Phase 1's 2-of-4 violation rate. Each self-disclosed
its Bash use (`ls`, `grep`, `tail`, and — C2 — `curl` + `pdftotext` on already-cited PDFs); the hashes
corroborate every disclosure. Specific prohibitions + announced detection measurably outperformed a
bolded ban, though this is one run and does not overturn the capability-over-instruction finding.

## Wave 2 — independent verification (parallel, one per repaired card)

- [ ] V1d · [ ] V2c · [ ] V3c · [x] **V4c** · [ ] V5c

**V4c — F13 VERIFIED · C4 SUFFICIENT.** No kills, no quarantine, no downgrades. Retrieved by a
*different instrument* than the collector (`curl`+`pdftotext`, recomputed in Python, not eyeballed).
All 5 quotes verbatim, all 7 statistics exact and from the claimed table/model, all 11 page
attributions correct — "a standard the earlier passes on this card did not meet." Q3 warranted; the
collector declined the more flattering Q2. Funding sweep: 14 disclosure terms across 8 pages, zero
hits — **"undisclosed rather than disclosed-clean" upheld as the correct, weaker recording**.
Both internal inconsistencies confirmed *by computation*, one stronger than claimed (Table 1
reconciles with itself, localising the error to the narrative). Bias-direction reasoning sound and
better supported than the collector knew (p.72 records a prior null by the same advocate).
**5 minor defects D1–D5; one runs PESSIMISTIC** — the "low-ceiling instrument" claim is contradicted
by the paper's own Shapiro-Wilk normality and ~72% means.
Divergence rulings: append-only substitution **acceptable**; header stale **and the collector's
replacement figure also wrong** — correct is **13 findings / 15 distinct sources**, which puts C4
**exactly at the hard source cap**.
→ Triggered a bounded C4 editorial fix pass (append-only lifted, **no collection**).

- [ ] C4-EC editorial fix — applies 3 recorded-but-unapplied corrections + D1–D5 + header counts

**V1d — all 6 citations terminal, 0 kills, C1 still INSUFFICIENT but the remedy is EDITORIAL.**
Verifier used `curl`+`pdftotext`+local Python string matching — every HIT/MISS a literal substring
test, not fetch-mediated. 20 of 22 quotes verbatim. **It obtained F22's PDF body — the thing the
collector could not get and V1c had asked for.**

**CHARTER RULING (the one I asked for): "everything calibrates from a population" is NOT falsified.**
The collector overstated it. F24's Methods says the 0.3 default is what "previous studies have shown
to be a reasonable average across materials and learners" — **population-derived by the source's own
admission**. Population-*light*, not population-free. My scepticism when flagging this to the user
("a fixed default may itself encode population-derived information") was correct.
→ **Charter narrowed, not retracted** (done, orchestrator). Collector's real contribution preserved:
the requirement can shrink from tens of thousands of learners to **a single published constant**.

**Three F24 defects:** a **spliced quote** that doesn't exist as a sentence (clause from Discussion
grafted onto General Discussion, no ellipsis) — the one place quote discipline failed; **COI located**
where the collector had flagged it unchecked (licensed to Noordhoff Publishers, "partially funded by
these license fees") so F24 is **not** independent corroboration; and an **omitted null** (Experiment
1's delayed recall found no difference — the 7.3pp is in-session only).

**F22's recovered numbers weaken the dossier's story:** Spearman .633–.673 aggregate, .732 best,
.252–.847 range — and **below pooled human judgement (.70) and below an existing automated method
(.76)**. The dossier carried only the abstract's favourable half. Relative scale only; absolute
agreement unexamined.

**Independence defect:** F17/F24/F25/F26 are **one lab (Groningen), one system (SlimStampen), one
commercial lineage** — four citations on C1's central question, and the dossier nowhere said so.

**Two gaps ruled SETTLED COVERAGE GAPs — do not re-run** (small fixed expert-authored bank;
strategy/card-game domain). Survived three passes plus the verifier's own searching.
F25 body UNVERIFIABLE (blocked 3 routes); abstract VERIFIED.
→ Triggered C1-EC editorial repair pass (no collection).

- [x] **C1-EC editorial repair — COMPLETE.** All 7 repairs landed in place, IDs preserved, superseded
      text struck. No collection. **Headline reversal done at all three sites** where the "falsified"
      claim lived (HEAD STATEMENT ¶3, Sufficiency Statement, F25 caveat) → **population-*light*, not
      population-free**; the collector's real contribution (requirement shrinks to a single published
      constant) preserved and credited, not deleted.
      F22 gained its measured figures **and** the §4.1 counterweight (below human .70 and below an
      existing automated method .76) + relative-scale-only limit; silent truncation repaired.
      F24: spliced quote struck (**the real sentence is scoped to Experiment 2 — a scope the splice
      dropped**), COI recorded (Noordhoff licence fees, so **not** independent corroboration), Exp 1
      delayed-recall null added.
      Lab-independence disclosure added (F17/F24/F25/F26 = one lab, one system, one commercial lineage).
      Two settled COVERAGE GAPs recorded; F25 body UNVERIFIABLE with a binding no-claim-rests-on-it note.
      **Calibration ran both ways:** 3 findings left unchanged as accurate; **2 upgrades in the
      collector's favour** — F23's population chain is *longer* than claimed, and F22's truncation had
      dropped text that *favoured* the product's case.
      *Stale note in its report:* it stated the charter still carries the uncorrected "falsified" claim.
      It does not — the orchestrator had already narrowed it (charter line ~395 verified). No action.

- [ ] C1-W Wauters et al. (2012) — single-source collection, V1d's "one lead that would move a
      conclusion"; also F27's uncollected primary, which is part of why F27 sits at Q4

- [x] **C4-EC editorial fix — COMPLETE.** All 3 recorded-but-unapplied corrections applied in place,
      all 5 V4c defects, header + 3 in-body counts reconciled. 4 findings changed, 9 examined and left
      unchanged. **Zero sources added, zero WebFetch calls** — every corrected claim was already quoted
      verbatim inside V4/V4b/V4c, so no re-read was needed. 26 dated `C4-ED` markers; superseded text
      struck, not deleted. Final: **13 findings / 15 distinct sources — AT THE HARD CAP**, recorded in
      three places. **Found 2 FURTHER unapplied corrections** (F11 paraphrase-as-quotation; F10
      supporting-location) — the systemic defect was worse on C4 than V4c had found.
      **Five corrections ran in the dossier's FAVOUR**, incl. the pessimistic D4, and F12 resolving
      **clean** on funding — making F12 the *strongest* of the three C4-FP sources on independence,
      not the weakest. That reversal matters: the program had it exactly backwards.

- [x] **V5c — ALL FOUR VERIFIED · C5 SUFFICIENT · zero kills, zero downgrades, zero corrections.**
      The first C5 pass to come through entirely clean. Verifier used a *stronger* route than the
      collector (`curl`+`pdftotext`+`grep -F`, mastheads from Crossref before opening any PDF; F16
      cross-checked on a different host). **The F17 fabrication is confirmed real** — wrong venue,
      volume, article number and author count — and **no fabricated detail survives anywhere in the
      dossier**. Both "read in full" claims V5b had marked unreadable are true.
      Checked the F19 *completeness* question by reading sections the dossier does not quote: the
      unquoted studies are declarative and **support** the framing. **The dominant defect did not
      occur here.** Its own four literature-API searches found no decision-rule spacing study
      (Europe PMC returned 0 hits) — a **fourth** independent confirmation; gap not re-penalised.
      Verified append-only by content comparison: 21 prior-verified strings across F1–F15 present
      verbatim and unaltered; the single front-matter edit is exactly as declared.
      **Calibration note, verbatim:** *"I went looking for a scalp and there isn't one."* It records
      that the collector made two non-obvious conservative calls (F19's Q4; naming F18's g=0.74 as
      bias-corrected) that a less careful pass would have gotten wrong **in the direction of unearned
      strength**.

- [x] **V2c — 13/13 corrections VERIFIED, C2 SUFFICIENT, all 3 departures from V2b UPHELD**, all 4
      left-unchanged findings independently confirmed accurate. **4 new corrections required (1 material).**

      **HEADLINE CONFIRMED on three routes: the V2/V2b corrections were genuinely ABSENT** (not
      reworded). Decisive is V2b's own contemporaneous attestation, written 30 min after V2 filed:
      *"Every figure, quote and tier that V2 recorded for F1–F11 still reads identically in the current
      dossier, including the specific values V2 corrected (Ma Table 1, Anderson's 'two major stages,'
      the F5 elision). The struck-through coverage-gap bullet is the only visible edit."*

      **R1 (MATERIAL) — the irony.** The prior C2 editorial pass **correctly faulted V2b** for
      reporting `Sample size` as robust while missing that it fails random effects — **then reproduced
      that exact omission on the moderator it elevated itself.** `Report type` does **not** replicate in
      the adjusted analysis: Table 3 Qb .69 p=.407 fixed / 1.98 p=.160 random, peer-reviewed estimate
      **reversing to −.04**. The dossier headlines it and instructs readers not to quote effect sizes
      without it. Same defect twice, from opposite directions.
      **R2** — Plano's −0.66 is a **Grubbs-winsorized substitute for −1.57** (authors attribute to
      baseline non-equivalence); explains why the k=2 arithmetic could not be reconstructed, and cuts
      **against** pessimism.
      Departure 1 upheld in conclusion but **partly wrong in reasoning** — a blank printed cell is not
      proof of exclusion, and V2b's Plano+Smith n-weighting *does* compute to −0.4455.
      Vendor-authorship holds **5/5**. Editor's `curl`+`pdftotext` route **strengthens** confidence —
      every claimed-verbatim quote re-derived character-exact.
      → Triggered C2-EC2 follow-on editorial pass.

- [x] **C2-EC2 follow-on editorial — COMPLETE.** All 4 corrections + departure-1 reasoning applied.
      Zero new citations, still 15/15. Re-derived both material corrections **from the primary source
      rather than adopting V2c** — WebFetch returned the PDF as binary and the fetch model correctly
      **declined to transcribe it**, so the agent read the typeset pages as images.
      **R1 confirmed** (Table 3 p.980: Qb .69 p=.407 fixed / 1.98 p=.160 random; peer-reviewed k=6
      fixed g=**−.04**; adjusted set k=17 vs unadjusted k=26). **R2 confirmed** verbatim.
      **It corrected V2c itself:** V2c quoted the Grubbs reset as "its *next* nearest neighbor"; the
      printed text reads "its nearest neighbor" — "next nearest" is the paper's wording for a
      *different* reset. Immaterial, but the dossier now uses the printed wording.
      **R1 had propagated to FOUR sites**, not one — forward pointer, F12 headline, F12 extraction
      block, conflict #27. The forward pointer was the material one: a reader-facing instruction
      ("don't quote an effect size without this moderator") resting on a non-replicating result.
      **R4 recorded but deliberately NOT applied** — it is a defect in the *first* report, which is
      protected as a historical record; correction written into report 2 instead. Correct call, and
      consistent with the C4 report ruling.
      Departure 1: C2-EC had refuted **Biesinger+Plano** (+0.062) while V2b claimed **Plano+Smith**
      (−0.4455) — it tested the wrong pairing. Conclusion retained, both faulty strands struck.

## ORCHESTRATOR ERROR — misrouted correction message

I sent the C3 retraction + §4-audit guidance to **agent `afbfc6585d283cc6b`, the C2 follow-on editor**,
when it was intended for **`af5d825e866d2bced`, the §4 audit**. I misread two similar agent IDs from a
parallel dispatch. The C2 editor correctly **declined to act** on instructions outside its brief and
flagged the routing problem back to me — good agent behaviour, and the only reason the error surfaced.

**The §4 audit therefore never received my retraction.** It re-derived C3 independently anyway and
reached PARTIAL *with the sharper attribution my message would have supplied* — it caught my error
without being told. Fortunate, not by design.

**Two lessons:** (1) parallel dispatches return visually similar IDs; route follow-ups by re-reading
the dispatch order, not by pattern-matching the prefix. (2) The C2 editor did answer the one part
that touched it, first-hand: **every** correction marker in the C2 dossier is attributed to `C2-FP` or
`C2-EC` — no post-V2 landing pass exists. Route 3 confirmed independently of V2c. **So my C2 grep was
right, but — as I suspected — for the wrong reason.**
- [x] **§4 PROGRAM-INTEGRITY AUDIT — COMPLETE. THE LARGEST FINDING OF THE PROGRAM.**

      **"(all applied)" is false for ALL SIX cards. The defect is structural, not per-card:
      THERE WAS NEVER A LANDING PASS IN THE PROGRAM AT ALL.** The V1–V6 records recorded corrections
      and returned them as text; **no pass was ever chartered to write them into the dossiers.**
      C2 and C4 were not two bad apples — they were the two cards where someone happened to look.

      **Decisive instrument (Route 3, marker census).** Across all six pre-remediation dossiers:
      **10 in-place correction markers, and not one is attributed to a verifier.**
      `C2-FP ×1 · C3-FP ×1 · C4-FP ×2 · C5-FP ×2 · C6-FP ×3 · the 2018 Corrigendum ×2`
      Every marker names a **collector** focused pass (each permitted exactly one in-place edit,
      responsive to an Axis-2 *sufficiency* finding) or a published corrigendum. **Zero name V1–V6.
      The Axis-1 correction lists had no route into the dossiers.**

      | Card | Verdict | Confidence |
      |---|---|---|
      | C1 | **NOT APPLIED** — all six of V1's corrections; only dossier with *zero* markers | very high |
      | C2 | **NOT APPLIED** | very high |
      | C3 | **PARTIAL / MISLEADING** — corrigendum present as an *appended finding* (F10) while **F3 still headlines the superseded figures unmarked**; V3's own F1–F7 corrections not applied | very high |
      | C4 | **NOT APPLIED** | very high |
      | C5 | **NOT APPLIED** — and its two `C5-FP` markers answer an Axis-2 item, **not** V5's Axis-1 corrections | very high |
      | C6 | **NOT APPLIED** — byte-identical snapshot↔live; V6b attests F1–F6 unaltered | very high |

      **My earlier C3 call was wrong in the right direction but wrong in substance** — PARTIAL is right,
      but *not* because V3's corrections landed. They did not. The corrigendum content arrived as a
      collection result.

      **Two consequences the auditor escalated (orchestrator/user calls):**
      1. **The gate verdicts were reached against dossiers that do not carry their own corrections.**
         C1's Q2/Q3→Q4 downgrade was flagged **load-bearing for a product decision** — its 100-student
         floor is *still presented as a measured bound* rather than the expert judgement V1 ruled it.
         **C1's verdict may need revisiting.**
      2. **C6 was the least-corrected card in the set while carrying a passing verdict** — corrections
         unapplied, *and* excluded from remediation by instruction.
      → **C6-EC landing pass dispatched.** Rationale: the user's C6 instruction barred additional
         *collection* and said to preserve its "existing corrections" — but those corrections were
         never applied, so landing them *is* preserving them. Editorial remedy, amendment 7. Verdict
         explicitly preserved; the agent must report a Blocker rather than silently change it.

- [x] **C3-EC2 follow-on editorial — COMPLETE.** All five of V3c's corrections landed, superseded text
      struck, IDs preserved. **C-1 is a net subtraction:** F7's "stitched fragment" note struck as a
      **manufactured defect**, root cause recorded — the prior editor attached the abstract's
      *location* to the body's *sentence* without re-checking. Logged in-dossier as the program's
      **third** caught instance of an agent finding a problem that wasn't there — *and it happened in a
      pass explicitly briefed about pessimism drift, which is evidence the briefing alone does not
      correct the bias.*
      C-2 narrowed F10 to the one genuine ranking counter-example (sports was never "joint-top").
      C-3/C-4 hygiene. C-5: `#29 → #34` corrected in-dossier.
      **C-5 confirms the register near-miss was worse than stated:** #28 and #29 both belong to **C2**
      (Pane et al.; Qin et al. fMRI). Executing the prior report's proposals **would have written C3
      content into C2's rows.** Root cause, program-level: V3b wrote a *predicted* ID before central
      reconciliation assigned one, and C3-EC relayed it unchecked — **each hop stripped its provisional
      status.** Direct evidence for orchestrator-owned registers.
      F5 now carries an honest-quarantine block (Ericsson 2014 unobtainable by four routes).
      **Calibration: found NO new defects and said so** — listed the ~15 items examined and left alone
      as a result rather than padding them into findings. Sufficiency unchanged: **SUFFICIENT**.

- [x] **C6-EC landing pass — COMPLETE. C6's SUFFICIENT verdict SURVIVES.** All V6 (F1–F6) and V6b
      (F7–F9) corrections landed in place; 28 `[C6-EC, 2026-07-20]` markers, superseded text struck,
      all 9 finding IDs intact. Zero WebFetch calls, zero new sources — pure landing pass.
      **State on arrival confirmed the audit's diagnosis exactly:** `44%` ×3, `16%` ×3 live in the
      text, `Assumption` once in the whole file, `one-tailed` at zero hits.
      **F2** statistics DROPPED and re-bucketed Evidence-backed→**Assumption**; the "three converging
      independent summaries" claim replaced with the one-blog-plus-echo reality. **F4** "suggested"
      and "in part" both restored + simplified-rules/computer-controlled-win-probability caveat.
      **F7** "realistic table pace" struck. **F8** "in an actual casino" struck. Candidate-conflicts
      section was still carrying the dropped figures as a **live conflict** — now dissolved.
      **V6b's loose end resolved without git:** the disputed F6 phrase **never existed in the dossier**
      — V6 was loosely paraphrasing the *source*, not quoting the dossier. F6 was never altered; V6's
      quotation was imprecise. The real defect was a different one (an omitted clause), now fixed.
      **Restraint where the recorded correction did not apply:** F8's "authentic casino outcomes" for
      **Experiment II** is genuinely supported — only Experiment III's setting was overstated, so
      correcting both would have been mechanical over-application. And V6 dropped a *claim element* in
      F2, not the citation; killing the citation would have **overstated V6's own finding**. Q3's
      coverage gap left untouched, as V6 verified it honest.
      **Verdict reasoning (sound):** V6b issued SUFFICIENT *already knowing* its own downgrades —
      it wrote "Q2: acquisition and speed answered at n=4 (with my downgrade on 'realistic table
      pace')". The corrections were **priced into the verdict when it was made**; landing them changes
      the text, not the judgement.

      **⚠ PRODUCT CONSEQUENCE flagged upward — belongs in the gate summary §8.** Post-correction,
      C6's Q3 sub-question rests on **F1 alone** for the passive-error direction, with **no precise
      magnitude supported by anything** in the dossier. This is honest thin evidence, not a defect —
      but it is **thinner than the uncorrected dossier implied**, and it directly constrains any
      curriculum weighting of "which basic-strategy errors matter most." The Phase 1 gate summary
      currently lists the ~62%-accuracy/~80%-confidence finding as "the most directly actionable
      finding for curriculum weighting"; that framing needs revisiting against this.

## Orchestrator rulings made this run

1. **C4 collection report: annotate, do not rewrite.** Its false back-page claim (D1) is corrected in
   the dossier; the report is preserved with a correction notice appended at the point of use.
   Rewriting a pass report would destroy the evidence trail that let the program detect the error —
   but an uncorrected false claim in an untracked file is exactly how the C2 defect propagated.
2. **Charter narrowed, not retracted** (see V1d above).

## Wave 3 — gate assembly

- [ ] Reconcile Conflict Register + Source-Lead Register (central, orchestrator-owned)
- [ ] Post-remediation integrity manifest + change ledger
- [ ] Rewrite `P1-gate-summary.md`
- [ ] State readiness verdict; **STOP at the user gate. Phase 2 must not begin.**

## Design decisions carried into this run

1. **Registers are orchestrator-owned.** Phase 1 hit duplicate IDs from concurrent agent appends.
   Agents now *return* register rows; the orchestrator assigns IDs and writes them centrally. This
   is what makes Wave 1 safe to parallelise.
2. **Parallel repairs are safe here** — each card owns a separate dossier file. SDD's
   no-parallel-implementers rule exists to prevent file conflict; that hazard is absent.
3. **No agent may run git or touch product code** — enforced by toolset, not by instruction.
   Phase 1 proved instruction alone does not hold (2 of 4 passes ran git despite a bolded ban).
4. **Repair and verification roles are held by different agent types**, not merely different
   instances — the verifier structurally cannot edit what it judges.
